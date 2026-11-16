package com.nihongo.api.modules.ai.assistant.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Tổng hợp hồ sơ học tập cá nhân hóa của học viên (Phase 6) từ DB:
 * cấp độ mục tiêu, điểm yếu Kanji/Ngữ pháp, từ vựng đang ôn/lưu gần đây và kết quả thi JLPT gần nhất.
 * Tuyệt đối không đưa thông tin nhạy cảm (email, password, SĐT) vào prompt.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StudentLearningContextService {

    private final JdbcTemplate jdbc;

    public record StudentProfileContext(String targetLevel, String summaryPromptBlock) {}

    public StudentProfileContext buildContext(Long userId) {
        if (userId == null) {
            return new StudentProfileContext(null, "");
        }

        StringBuilder sb = new StringBuilder();
        String detectedLevel = null;

        // 1. Thông tin trình độ hiện tại & mục tiêu
        try {
            List<String[]> userInfo = jdbc.query(
                    "SELECT full_name, jlpt_level, target_level FROM users WHERE id = ?",
                    (rs, i) -> new String[]{
                            rs.getString("full_name"),
                            rs.getString("jlpt_level"),
                            rs.getString("target_level")
                    },
                    userId);
            if (!userInfo.isEmpty()) {
                String[] u = userInfo.get(0);
                String name = u[0] != null && !u[0].isBlank() ? firstName(u[0]) : "Học viên";
                String curLvl = u[1] != null ? u[1].trim().toUpperCase() : "N5";
                String tgtLvl = u[2] != null && !u[2].isBlank() ? u[2].trim().toUpperCase() : curLvl;
                detectedLevel = curLvl;
                sb.append(String.format("- Tên gọi: %s | Trình độ hiện tại: %s | Mục tiêu: %s\n",
                        name, curLvl, tgtLvl));
            }
        } catch (Exception e) {
            log.debug("Không đọc được profile user #{}: {}", userId, e.getMessage());
        }

        // 2. Kết quả thi JLPT gần nhất
        try {
            List<String> exams = jdbc.query("""
                    SELECT e.title, e.jlpt_level, r.score, r.total_score,
                           r.correct_count, r.total_questions, r.passed,
                           r.vocab_score, r.grammar_reading_score, r.listening_score
                    FROM exam_results r
                    JOIN exams e ON e.id = r.exam_id
                    WHERE r.user_id = ?
                    ORDER BY r.created_at DESC
                    LIMIT 3
                    """,
                    (rs, i) -> String.format(
                            "%s (%s): %d/%d điểm, đúng %d/%d câu (%s) [Từ vựng:%d, Ngữ pháp-Đọc:%d, Nghe:%d]",
                            rs.getString("title"),
                            rs.getString("jlpt_level"),
                            rs.getInt("score"),
                            rs.getInt("total_score"),
                            rs.getInt("correct_count"),
                            rs.getInt("total_questions"),
                            rs.getBoolean("passed") ? "Đạt" : "Chưa đạt",
                            rs.getInt("vocab_score"),
                            rs.getInt("grammar_reading_score"),
                            rs.getInt("listening_score")),
                    userId);
            if (!exams.isEmpty()) {
                sb.append("- Kết quả thi thử JLPT gần đây:\n  * ")
                  .append(String.join("\n  * ", exams))
                  .append('\n');
            }
        } catch (Exception e) {
            log.debug("Không đọc được exam_results user #{}: {}", userId, e.getMessage());
        }

        // 3. Chương Kanji còn yếu hoặc đang học dở
        try {
            List<String> weakKanji = jdbc.query("""
                    SELECT kc.jlpt_level, kc.chapter_number, kc.title_vi, p.highest_score
                    FROM user_kanji_progress p
                    JOIN kanji_chapters kc ON kc.id = p.chapter_id
                    WHERE p.user_id = ? AND (p.is_passed = FALSE OR p.highest_score < 75)
                    ORDER BY p.highest_score ASC, kc.chapter_number ASC
                    LIMIT 4
                    """,
                    (rs, i) -> String.format("%s Chương %d (%s - %d%%)",
                            rs.getString("jlpt_level"),
                            rs.getInt("chapter_number"),
                            rs.getString("title_vi"),
                            rs.getInt("highest_score")),
                    userId);
            if (!weakKanji.isEmpty()) {
                sb.append("- Chương Kanji cần củng cố: ").append(String.join("; ", weakKanji)).append('\n');
            }
        } catch (Exception e) {
            log.debug("Không đọc được user_kanji_progress: {}", e.getMessage());
        }

        // 4. Bài Ngữ pháp điểm chưa cao
        try {
            List<String> weakGrammar = jdbc.query("""
                    SELECT gl.level_code, gl.lesson_number, gl.title_vi, p.highest_score
                    FROM user_grammar_progress p
                    JOIN grammar_lessons gl ON gl.id = p.lesson_id
                    WHERE p.user_id = ? AND (p.is_passed = FALSE OR p.highest_score < 75)
                    ORDER BY p.highest_score ASC, gl.lesson_number ASC
                    LIMIT 4
                    """,
                    (rs, i) -> String.format("%s Bài %d (%s - %d%%)",
                            rs.getString("level_code"),
                            rs.getInt("lesson_number"),
                            rs.getString("title_vi"),
                            rs.getInt("highest_score")),
                    userId);
            if (!weakGrammar.isEmpty()) {
                sb.append("- Bài Ngữ pháp cần ôn lại: ").append(String.join("; ", weakGrammar)).append('\n');
            }
        } catch (Exception e) {
            log.debug("Không đọc được user_grammar_progress: {}", e.getMessage());
        }

        // 5. Từ vựng / Kanji hay quên (SRS easiness thấp hoặc từ vừa lưu qua Sensei)
        List<String> focusWords = new ArrayList<>();
        try {
            focusWords.addAll(jdbc.query("""
                    SELECT CASE WHEN f.card_type = 'KANJI' THEN k.character ELSE v.word END AS term,
                           CASE WHEN f.card_type = 'KANJI' THEN k.meaning ELSE v.meaning END AS mean
                    FROM flashcards f
                    LEFT JOIN kanjis k ON f.card_type = 'KANJI' AND k.id = f.item_id
                    LEFT JOIN vocabularies v ON f.card_type = 'VOCAB' AND v.id = f.item_id
                    WHERE f.user_id = ? AND (f.easiness_factor < 2.4 OR f.status = 'LEARNING')
                    ORDER BY f.easiness_factor ASC, f.next_review_date ASC
                    LIMIT 6
                    """,
                    (rs, i) -> {
                        String t = rs.getString("term");
                        String m = rs.getString("mean");
                        return t == null ? "" : (m == null ? t : t + " (" + m + ")");
                    },
                    userId));
        } catch (Exception ignored) {}

        try {
            focusWords.addAll(jdbc.query("""
                    SELECT word, meaning FROM ai_saved_cards
                    WHERE user_id = ?
                    ORDER BY created_at DESC
                    LIMIT 6
                    """,
                    (rs, i) -> {
                        String w = rs.getString("word");
                        String m = rs.getString("meaning");
                        return (m == null || m.isBlank()) ? w : w + " (" + m + ")";
                    },
                    userId));
        } catch (Exception ignored) {}

        List<String> cleanWords = focusWords.stream().filter(s -> s != null && !s.isBlank()).distinct().limit(8).toList();
        if (!cleanWords.isEmpty()) {
            sb.append("- Từ vựng/Kanji học viên hay ôn hoặc mới lưu: ").append(String.join(", ", cleanWords)).append('\n');
        }

        String summary = sb.isEmpty() ? "" : "[HỒ SƠ HỌC TẬP CÁ NHÂN CỦA HỌC VIÊN]\n" + sb;
        return new StudentProfileContext(detectedLevel, summary);
    }

    private String firstName(String fullName) {
        String trimmed = fullName.trim();
        int idx = trimmed.lastIndexOf(' ');
        return idx >= 0 && idx + 1 < trimmed.length() ? trimmed.substring(idx + 1) : trimmed;
    }
}

