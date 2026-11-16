package com.nihongo.api.modules.ai.assistant.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.assistant.dto.ChatDtos.*;
import com.nihongo.api.modules.ai.assistant.service.SenseiRetriever.RetrievalResult;
import com.nihongo.api.modules.ai.assistant.service.StudentLearningContextService.StudentProfileContext;
import com.nihongo.api.modules.ai.core.AiMetricsService;
import com.nihongo.api.modules.ai.core.AiRateLimitException;
import com.nihongo.api.modules.ai.core.AiRateLimiter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

/**
 * Điều phối toàn bộ luồng hội thoại Trợ lý Sensei AI (Phase 4 + Phase 6):
 * - Quản lý phiên chat (giới hạn tối đa 30 phiên gần nhất/user để tránh phình DB).
 * - Đọc đúng 8 tin nhắn gần nhất từ SQL + tự động tóm tắt hội thoại dài (> 12 tin).
 * - Cá nhân hóa prompt theo hồ sơ học tập (cấp độ, từ yếu, kết quả thi JLPT).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SenseiAssistantService {

    private static final String DEFAULT_TITLE = "Cuộc trò chuyện mới";
    private static final int MAX_SESSIONS_PER_USER = 30;
    private static final int RECENT_HISTORY_LIMIT = 8;

    private final JdbcTemplate jdbc;
    private final SenseiRetriever retriever;
    private final SenseiPromptBuilder promptBuilder;
    private final GeminiChatClient geminiChatClient;
    private final StudentLearningContextService studentContextService;
    private final AiRateLimiter rateLimiter;
    private final AiMetricsService metricsService;
    private final ObjectMapper mapper = new ObjectMapper();

    public ChatSessionDto createSession(Long userId, CreateSessionRequest req) {
        String title = (req != null && req.getTitle() != null && !req.getTitle().isBlank())
                ? req.getTitle().trim() : DEFAULT_TITLE;
        String level = (req != null && req.getJlptLevel() != null && !req.getJlptLevel().isBlank())
                ? req.getJlptLevel().trim().toUpperCase() : resolveUserLevel(userId);

        ChatSessionDto created = jdbc.queryForObject("""
                INSERT INTO chat_sessions (user_id, title, jlpt_level)
                VALUES (?, ?, ?)
                RETURNING id, title, jlpt_level, context_summary, created_at, updated_at
                """,
                (rs, i) -> ChatSessionDto.builder()
                        .id(rs.getLong("id"))
                        .title(rs.getString("title"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .contextSummary(rs.getString("context_summary"))
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .updatedAt(toOffset(rs.getTimestamp("updated_at")))
                        .build(),
                userId, title, level);

        enforceSessionCap(userId);
        return created;
    }

    public List<ChatSessionDto> listSessions(Long userId) {
        return jdbc.query("""
                SELECT s.id, s.title, s.jlpt_level, s.context_summary, s.created_at, s.updated_at,
                       (SELECT m.content FROM chat_messages m
                        WHERE m.session_id = s.id
                        ORDER BY m.created_at DESC, m.id DESC LIMIT 1) AS last_preview
                FROM chat_sessions s
                WHERE s.user_id = ?
                ORDER BY s.updated_at DESC
                LIMIT ?
                """,
                (rs, i) -> {
                    String preview = rs.getString("last_preview");
                    if (preview != null && preview.length() > 80) {
                        preview = preview.substring(0, 80) + "...";
                    }
                    return ChatSessionDto.builder()
                            .id(rs.getLong("id"))
                            .title(rs.getString("title"))
                            .jlptLevel(rs.getString("jlpt_level"))
                            .contextSummary(rs.getString("context_summary"))
                            .lastMessagePreview(preview)
                            .createdAt(toOffset(rs.getTimestamp("created_at")))
                            .updatedAt(toOffset(rs.getTimestamp("updated_at")))
                            .build();
                },
                userId, MAX_SESSIONS_PER_USER);
    }

    public ChatSessionDto renameSession(Long userId, Long sessionId, String newTitle) {
        List<ChatSessionDto> updated = jdbc.query("""
                UPDATE chat_sessions
                SET title = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ? AND user_id = ?
                RETURNING id, title, jlpt_level, context_summary, created_at, updated_at
                """,
                (rs, i) -> ChatSessionDto.builder()
                        .id(rs.getLong("id"))
                        .title(rs.getString("title"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .contextSummary(rs.getString("context_summary"))
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .updatedAt(toOffset(rs.getTimestamp("updated_at")))
                        .build(),
                newTitle.trim(), sessionId, userId);

        if (updated.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy cuộc trò chuyện hoặc bạn không có quyền sửa.");
        }
        return updated.get(0);
    }

    public void deleteSession(Long userId, Long sessionId) {
        int rows = jdbc.update("DELETE FROM chat_sessions WHERE id = ? AND user_id = ?", sessionId, userId);
        if (rows == 0) {
            throw new IllegalArgumentException("Không tìm thấy cuộc trò chuyện hoặc bạn không có quyền xóa.");
        }
    }

    public List<ChatMessageDto> getMessages(Long userId, Long sessionId) {
        ensureSessionOwned(userId, sessionId);
        return jdbc.query("""
                SELECT id, session_id, role, content, sources_json::text AS sources_text, created_at
                FROM chat_messages
                WHERE session_id = ?
                ORDER BY created_at ASC, id ASC
                """,
                (rs, i) -> mapMessageRow(rs),
                sessionId);
    }

    /**
     * Xử lý 1 lượt hỏi-đáp có RAG + Cá nhân hóa học viên + Streaming.
     */
    public ChatMessageDto sendMessageStream(
            Long userId,
            Long sessionId,
            SendMessageRequest req,
            Consumer<List<SourceCitation>> onSources,
            Consumer<String> onChunk) {

        long t0 = System.currentTimeMillis();
        ChatSessionDto session = ensureSessionOwned(userId, sessionId);
        String userText = req.getMessage().trim();

        // 0. Kiểm tra hạn mức chat ngày của học viên (Phase 7)
        try {
            rateLimiter.consumeChatTurn(userId);
        } catch (AiRateLimitException ex) {
            metricsService.recordChatRateLimited();
            throw ex;
        }

        // 1. Lấy đúng 8 tin nhắn gần nhất trực tiếp từ SQL (tối ưu I/O)
        List<ChatMessageDto> recentHistory = getRecentMessages(sessionId, RECENT_HISTORY_LIMIT);

        // 2. Lưu tin nhắn học viên & đặt tiêu đề tự động nếu là tin nhắn đầu
        saveMessage(sessionId, "USER", userText, List.of());
        if (DEFAULT_TITLE.equals(session.getTitle())) {
            String autoTitle = userText.length() > 48 ? userText.substring(0, 48) + "..." : userText;
            jdbc.update("UPDATE chat_sessions SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    autoTitle, sessionId);
        } else {
            jdbc.update("UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", sessionId);
        }

        // 3. Chặn prompt injection rõ ràng
        if (promptBuilder.isPromptInjectionAttempt(userText)) {
            String refusal = SenseiPromptBuilder.INJECTION_REFUSAL;
            onSources.accept(List.of());
            onChunk.accept(refusal);
            return saveMessage(sessionId, "ASSISTANT", refusal, List.of());
        }

        // 4. Nạp hồ sơ học tập cá nhân (Phase 6) + Truy xuất RAG Hybrid Search
        StudentProfileContext studentProfile = studentContextService.buildContext(userId);
        String effectiveLevel = (req.getLevelFilter() != null && !req.getLevelFilter().isBlank())
                ? req.getLevelFilter().trim().toUpperCase()
                : (session.getJlptLevel() != null && !session.getJlptLevel().isBlank()
                        ? session.getJlptLevel()
                        : studentProfile.targetLevel());

        RetrievalResult retrieval = retriever.retrieve(userText, effectiveLevel, req.getPageContext());
        onSources.accept(retrieval.citations());

        // 5. Lắp ráp System Instruction cá nhân hóa + Memory summary + History + RAG
        String sysPrompt = promptBuilder.buildSystemInstruction(
                effectiveLevel,
                studentProfile.summaryPromptBlock(),
                session.getContextSummary());
        List<Map<String, Object>> contents = promptBuilder.buildContents(
                recentHistory, userText, retrieval.chunks(), req.getPageContext());

        // 6. Stream từ Gemini AI
        String reply = geminiChatClient.streamChat(sysPrompt, contents, onChunk);
        boolean aiError = (reply == null || reply.isBlank());
        if (aiError) {
            reply = "Xin lỗi, Sensei AI đang tạm thời quá tải kết nối. Bạn vui lòng thử gửi lại câu hỏi sau vài giây nhé!";
            onChunk.accept(reply);
        }
        metricsService.recordChat(!retrieval.chunks().isEmpty(), aiError, System.currentTimeMillis() - t0);

        // 7. Lưu câu trả lời & kích hoạt tóm tắt nền nếu hội thoại dài (> 12 tin)
        ChatMessageDto saved = saveMessage(sessionId, "ASSISTANT", reply, retrieval.citations());
        maybeSummarizeHistoryAsync(sessionId, session.getContextSummary());
        return saved;
    }

    /** Bản đồng bộ không stream (tiện cho test/Swagger). */
    public ChatMessageDto sendMessageSync(Long userId, Long sessionId, SendMessageRequest req) {
        StringBuilder acc = new StringBuilder();
        return sendMessageStream(userId, sessionId, req, sources -> {}, acc::append);
    }

    // -------------------------------------------------------------------------

    private List<ChatMessageDto> getRecentMessages(Long sessionId, int limit) {
        List<ChatMessageDto> desc = jdbc.query("""
                SELECT id, session_id, role, content, sources_json::text AS sources_text, created_at
                FROM chat_messages
                WHERE session_id = ?
                ORDER BY created_at DESC, id DESC
                LIMIT ?
                """,
                (rs, i) -> mapMessageRow(rs),
                sessionId, limit);
        List<ChatMessageDto> asc = new ArrayList<>(desc);
        Collections.reverse(asc);
        return asc;
    }

    private void enforceSessionCap(Long userId) {
        try {
            jdbc.update("""
                    DELETE FROM chat_sessions
                    WHERE id IN (
                        SELECT id FROM chat_sessions
                        WHERE user_id = ?
                        ORDER BY updated_at DESC
                        OFFSET ?
                    )
                    """, userId, MAX_SESSIONS_PER_USER);
        } catch (Exception e) {
            log.debug("Không dọn được session vượt giới hạn user #{}: {}", userId, e.getMessage());
        }
    }

    private void maybeSummarizeHistoryAsync(Long sessionId, String previousSummary) {
        try {
            Integer count = jdbc.queryForObject(
                    "SELECT COUNT(*) FROM chat_messages WHERE session_id = ?", Integer.class, sessionId);
            if (count == null || count < 12 || count % 8 != 4) return;

            CompletableFuture.runAsync(() -> {
                try {
                    List<String> olderLines = jdbc.query("""
                            SELECT role, content FROM chat_messages
                            WHERE session_id = ?
                            ORDER BY created_at DESC, id DESC
                            OFFSET ? LIMIT 12
                            """,
                            (rs, i) -> rs.getString("role") + ": " + rs.getString("content"),
                            sessionId, RECENT_HISTORY_LIMIT);
                    if (olderLines.isEmpty()) return;
                    Collections.reverse(olderLines);

                    String prompt = (previousSummary != null && !previousSummary.isBlank()
                            ? "Tóm tắt trước đó:\n" + previousSummary + "\n\n" : "")
                            + "Các lượt trao đổi tiếp theo:\n" + String.join("\n", olderLines)
                            + "\n\nHãy tóm tắt ngắn gọn (tối đa 4 câu tiếng Việt) những ý chính học viên đã hỏi và Sensei đã giải đáp để giữ ngữ cảnh.";

                    String newSummary = geminiChatClient.chat(
                            "Bạn là trợ lý tóm tắt hội thoại ngắn gọn, súc tích.",
                            List.of(Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))));

                    if (newSummary != null && !newSummary.isBlank()) {
                        jdbc.update("UPDATE chat_sessions SET context_summary = ? WHERE id = ?",
                                newSummary.trim(), sessionId);
                    }
                } catch (Exception ex) {
                    log.debug("Tóm tắt lịch sử chat session #{} bỏ qua: {}", sessionId, ex.getMessage());
                }
            });
        } catch (Exception ignored) {}
    }

    private ChatSessionDto ensureSessionOwned(Long userId, Long sessionId) {
        List<ChatSessionDto> found = jdbc.query("""
                SELECT id, title, jlpt_level, context_summary, created_at, updated_at
                FROM chat_sessions
                WHERE id = ? AND user_id = ?
                """,
                (rs, i) -> ChatSessionDto.builder()
                        .id(rs.getLong("id"))
                        .title(rs.getString("title"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .contextSummary(rs.getString("context_summary"))
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .updatedAt(toOffset(rs.getTimestamp("updated_at")))
                        .build(),
                sessionId, userId);

        if (found.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy phiên chat #" + sessionId);
        }
        return found.get(0);
    }

    private ChatMessageDto saveMessage(Long sessionId, String role, String content, List<SourceCitation> sources) {
        String sourcesJson = "[]";
        try {
            sourcesJson = mapper.writeValueAsString(sources == null ? List.of() : sources);
        } catch (Exception ignored) {}

        return jdbc.queryForObject("""
                INSERT INTO chat_messages (session_id, role, content, sources_json)
                VALUES (?, ?, ?, ?::jsonb)
                RETURNING id, session_id, role, content, created_at
                """,
                (rs, i) -> ChatMessageDto.builder()
                        .id(rs.getLong("id"))
                        .sessionId(rs.getLong("session_id"))
                        .role(rs.getString("role"))
                        .content(rs.getString("content"))
                        .sources(sources == null ? List.of() : sources)
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .build(),
                sessionId, role, content, sourcesJson);
    }

    private ChatMessageDto mapMessageRow(java.sql.ResultSet rs) throws java.sql.SQLException {
        return ChatMessageDto.builder()
                .id(rs.getLong("id"))
                .sessionId(rs.getLong("session_id"))
                .role(rs.getString("role"))
                .content(rs.getString("content"))
                .sources(parseSources(rs.getString("sources_text")))
                .createdAt(toOffset(rs.getTimestamp("created_at")))
                .build();
    }

    private String resolveUserLevel(Long userId) {
        try {
            List<String> list = jdbc.query("SELECT jlpt_level FROM users WHERE id = ?",
                    (rs, i) -> rs.getString("jlpt_level"), userId);
            return list.isEmpty() ? null : list.get(0);
        } catch (Exception e) {
            return null;
        }
    }

    private List<SourceCitation> parseSources(String json) {
        if (json == null || json.isBlank()) return Collections.emptyList();
        try {
            return mapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    private OffsetDateTime toOffset(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }
}
