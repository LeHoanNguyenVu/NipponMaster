package com.nihongo.api.modules.ai.assistant.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.ai.assistant.dto.ChatDtos.*;
import com.nihongo.api.modules.ai.assistant.service.AiSavedCardService;
import com.nihongo.api.modules.ai.assistant.service.SenseiAssistantService;
import com.nihongo.api.modules.ai.core.AiRateLimiter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai/chat")
@RequiredArgsConstructor
public class SenseiChatController {

    private static final ExecutorService CHAT_STREAM_POOL = Executors.newCachedThreadPool();

    private final SenseiAssistantService assistantService;
    private final AiSavedCardService savedCardService;
    private final AiRateLimiter rateLimiter;

    @GetMapping("/quota")
    public ResponseEntity<ApiResponse<AiRateLimiter.ChatQuotaInfo>> getQuota(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("Hạn mức hỏi Sensei AI hôm nay", rateLimiter.getChatQuota(userId)));
    }

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<ChatSessionDto>> createSession(
            @AuthenticationPrincipal Long userId,
            @RequestBody(required = false) CreateSessionRequest req) {
        ChatSessionDto session = assistantService.createSession(userId, req);
        return ResponseEntity.ok(ApiResponse.ok("Đã tạo phiên trò chuyện mới", session));
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<ChatSessionDto>>> listSessions(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("Danh sách phiên trò chuyện", assistantService.listSessions(userId)));
    }

    @PatchMapping("/sessions/{id}")
    public ResponseEntity<ApiResponse<ChatSessionDto>> renameSession(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id,
            @Valid @RequestBody RenameSessionRequest req) {
        ChatSessionDto updated = assistantService.renameSession(userId, id, req.getTitle());
        return ResponseEntity.ok(ApiResponse.ok("Đã đổi tên phiên trò chuyện", updated));
    }

    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSession(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id) {
        assistantService.deleteSession(userId, id);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa phiên trò chuyện", null));
    }

    @GetMapping("/sessions/{id}/messages")
    public ResponseEntity<ApiResponse<List<ChatMessageDto>>> getMessages(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Lịch sử tin nhắn", assistantService.getMessages(userId, id)));
    }

    /**
     * Gửi câu hỏi tới Sensei AI và nhận phản hồi stream theo SSE.
     * Events:
     * - "sources": danh sách nguồn tri thức RAG trích dẫn
     * - "chunk": từng đoạn text trả lời { "text": "..." }
     * - "done": ChatMessageDto hoàn chỉnh đã lưu vào DB
     */
    @PostMapping(value = "/sessions/{id}/messages", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter sendMessageStream(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id,
            @Valid @RequestBody SendMessageRequest req) {

        SseEmitter emitter = new SseEmitter(60_000L);
        CHAT_STREAM_POOL.submit(() -> {
            try {
                ChatMessageDto saved = assistantService.sendMessageStream(
                        userId,
                        id,
                        req,
                        sources -> {
                            try {
                                emitter.send(SseEmitter.event().name("sources").data(sources));
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        },
                        chunk -> {
                            try {
                                emitter.send(SseEmitter.event().name("chunk").data(Map.of("text", chunk), MediaType.APPLICATION_JSON));
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        });
                emitter.send(SseEmitter.event().name("done").data(saved, MediaType.APPLICATION_JSON));
                emitter.complete();
            } catch (Exception e) {
                log.warn("Lỗi stream chat session #{}: {}", id, e.getMessage());
                try {
                    emitter.send(SseEmitter.event().name("error").data(Map.of("message", e.getMessage() == null ? "Lỗi hệ thống" : e.getMessage()), MediaType.APPLICATION_JSON));
                } catch (Exception ignored) {}
                emitter.complete();
            }
        });
        return emitter;
    }

    /** Endpoint đồng bộ (JSON thuần) phục vụ test nhanh hoặc client không dùng SSE. */
    @PostMapping("/sessions/{id}/messages/sync")
    public ResponseEntity<ApiResponse<ChatMessageDto>> sendMessageSync(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id,
            @Valid @RequestBody SendMessageRequest req) {
        ChatMessageDto saved = assistantService.sendMessageSync(userId, id, req);
        return ResponseEntity.ok(ApiResponse.ok("Trả lời thành công", saved));
    }

    // ---------------- Phase 6: Lưu nhanh Flashcard từ hội thoại ----------------

    @PostMapping("/flashcards")
    public ResponseEntity<ApiResponse<SavedCardDto>> saveFlashcard(
            @AuthenticationPrincipal Long userId,
            @Valid @RequestBody QuickSaveCardRequest req) {
        SavedCardDto saved = savedCardService.saveCard(userId, req);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu vào sổ tay Flashcard", saved));
    }

    @GetMapping("/flashcards")
    public ResponseEntity<ApiResponse<List<SavedCardDto>>> listSavedFlashcards(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("Sổ tay từ vựng Sensei AI", savedCardService.listCards(userId)));
    }

    @DeleteMapping("/flashcards/{cardId}")
    public ResponseEntity<ApiResponse<Void>> deleteSavedFlashcard(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long cardId) {
        savedCardService.deleteCard(userId, cardId);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa thẻ từ sổ tay", null));
    }
}

