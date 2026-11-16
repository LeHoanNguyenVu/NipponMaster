package com.nihongo.api.modules.ai.rag.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;

/**
 * Trích xuất dữ liệu từ tất cả các bảng kiến thức của Nippon Master
 * (Từ vựng, Kanji, Ngữ pháp, Đề thi JLPT, FAQ hệ thống) thành các chunk chuẩn hóa để index RAG.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class KnowledgeChunkBuilder {

    public static final String TYPE_VOCAB = "VOCAB";
    public static final String TYPE_KANJI = "KANJI";
    public static final String TYPE_KANJI_VOCAB = "KANJI_VOCAB";
    public static final String TYPE_GRAMMAR = "GRAMMAR";
    public static final String TYPE_GRAMMAR_LESSON = "GRAMMAR_LESSON";
    public static final String TYPE_EXAM_QUESTION = "EXAM_QUESTION";
    public static final String TYPE_FAQ = "FAQ";

    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper = new ObjectMapper();

    public List<KnowledgeChunk.Item> buildAll() {
        List<KnowledgeChunk.Item> all = new ArrayList<>();
        // Ưu tiên nạp các bảng tri thức cốt lõi (FAQ, Ngữ pháp, Từ vựng, Đề thi) trước để Sensei dùng được ngay
        all.addAll(buildFaqChunks());
        all.addAll(buildGrammarChunks());
        all.addAll(buildGrammarLessonChunks());
        all.addAll(buildVocabChunks());
        all.addAll(buildExamQuestionChunks());
        all.addAll(buildKanjiChunks());
        all.addAll(buildKanjiChapterVocabChunks());
        return all;
    }

    public List<KnowledgeChunk.Item> buildByType(String sourceType) {
        return switch (sourceType.toUpperCase()) {
            case TYPE_VOCAB -> buildVocabChunks();
            case TYPE_KANJI -> buildKanjiChunks();
            case TYPE_KANJI_VOCAB -> buildKanjiChapterVocabChunks();
            case TYPE_GRAMMAR -> buildGrammarChunks();
            case TYPE_GRAMMAR_LESSON -> buildGrammarLessonChunks();
            case TYPE_EXAM_QUESTION -> buildExamQuestionChunks();
            case TYPE_FAQ -> buildFaqChunks();
            default -> List.of();
        };
    }

    public List<KnowledgeChunk.Item> buildVocabChunks() {
        String sql = """
                SELECT id, word, reading, romaji, han_viet, meaning,
                       example_sentence, example_meaning, jlpt_level, word_type, topic, mnemonic_hint
                FROM vocabularies
                ORDER BY id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            String word = str(rs.getString("word"));
            String reading = str(rs.getString("reading"));
            String romaji = str(rs.getString("romaji"));
            String hanViet = str(rs.getString("han_viet"));
            String meaning = str(rs.getString("meaning"));
            String ex = str(rs.getString("example_sentence"));
            String exMean = str(rs.getString("example_meaning"));
            String level = normLevel(rs.getString("jlpt_level"));
            String wordType = str(rs.getString("word_type"));
            String topic = str(rs.getString("topic"));
            String mnemonic = str(rs.getString("mnemonic_hint"));

            String title = String.format("Từ vựng [%s] %s (%s)", level, word, reading);
            StringBuilder sb = new StringBuilder();
            sb.append("Từ vựng: ").append(word);
            if (!reading.isBlank()) sb.append(" (").append(reading).append(")");
            if (!romaji.isBlank()) sb.append(" [").append(romaji).append("]");
            sb.append("\nCấp độ JLPT: ").append(level);
            if (!wordType.isBlank()) sb.append(" | Loại: ").append(wordType);
            if (!topic.isBlank()) sb.append(" | Chủ đề: ").append(topic);
            if (!hanViet.isBlank()) sb.append("\nÂm Hán Việt: ").append(hanViet);
            sb.append("\nNghĩa: ").append(meaning);
            if (!ex.isBlank()) sb.append("\nVí dụ: ").append(ex).append(exMean.isBlank() ? "" : " — " + exMean);
            if (!mnemonic.isBlank()) sb.append("\nMẹo nhớ: ").append(mnemonic);

            return createItem(TYPE_VOCAB, id, level, title, sb.toString(),
                    Map.of("route", "/flashcards", "word", word, "reading", reading));
        });
    }

    public List<KnowledgeChunk.Item> buildKanjiChunks() {
        String sql = """
                SELECT id, character, on_reading, kun_reading, han_viet, meaning,
                       stroke_count, radical, related_words, example_sentence, example_meaning,
                       jlpt_level, chapter_id, mnemonic_hint
                FROM kanjis
                ORDER BY id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            String ch = str(rs.getString("character"));
            String on = str(rs.getString("on_reading"));
            String kun = str(rs.getString("kun_reading"));
            String hanViet = str(rs.getString("han_viet"));
            String meaning = str(rs.getString("meaning"));
            int strokes = rs.getInt("stroke_count");
            String radical = str(rs.getString("radical"));
            String related = str(rs.getString("related_words"));
            String ex = str(rs.getString("example_sentence"));
            String exMean = str(rs.getString("example_meaning"));
            String level = normLevel(rs.getString("jlpt_level"));
            long chapterId = rs.getLong("chapter_id");
            String mnemonic = str(rs.getString("mnemonic_hint"));

            String title = hanViet.isBlank()
                    ? String.format("Kanji %s (%s)", ch, level)
                    : String.format("Kanji %s [%s] (%s)", ch, hanViet, level);

            StringBuilder sb = new StringBuilder();
            sb.append("Chữ Kanji: ").append(ch);
            if (!hanViet.isBlank()) sb.append(" | Hán Việt: ").append(hanViet);
            sb.append(" | Cấp độ: ").append(level);
            if (strokes > 0) sb.append(" | Số nét: ").append(strokes);
            if (!radical.isBlank()) sb.append(" | Bộ thủ: ").append(radical);
            sb.append("\nNghĩa: ").append(meaning);
            if (!on.isBlank()) sb.append("\nÂm On: ").append(on);
            if (!kun.isBlank()) sb.append("\nÂm Kun: ").append(kun);
            if (!related.isBlank()) sb.append("\nTừ ghép tiêu biểu: ").append(related);
            if (!ex.isBlank()) sb.append("\nVí dụ: ").append(ex).append(exMean.isBlank() ? "" : " — " + exMean);
            if (!mnemonic.isBlank()) sb.append("\nMẹo ghi nhớ: ").append(mnemonic);

            Map<String, Object> meta = new LinkedHashMap<>();
            meta.put("route", chapterId > 0 ? "/kanji?chapterId=" + chapterId : "/kanji");
            meta.put("character", ch);
            if (chapterId > 0) meta.put("chapterId", chapterId);

            return createItem(TYPE_KANJI, id, level, title, sb.toString(), meta);
        });
    }

    public List<KnowledgeChunk.Item> buildKanjiChapterVocabChunks() {
        String sql = """
                SELECT kcv.id, kcv.chapter_id, kcv.word, kcv.reading, kcv.romaji,
                       kcv.meaning_vi, kcv.meaning_en, kc.jlpt_level, kc.title_vi, kc.chapter_number
                FROM kanji_chapter_vocab kcv
                JOIN kanji_chapters kc ON kc.id = kcv.chapter_id
                ORDER BY kcv.id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            long chapterId = rs.getLong("chapter_id");
            int chNum = rs.getInt("chapter_number");
            String word = str(rs.getString("word"));
            String reading = str(rs.getString("reading"));
            String romaji = str(rs.getString("romaji"));
            String meaningVi = str(rs.getString("meaning_vi"));
            String meaningEn = str(rs.getString("meaning_en"));
            String level = normLevel(rs.getString("jlpt_level"));
            String chTitle = str(rs.getString("title_vi"));

            String title = String.format("Từ ghép Kanji %s: %s (%s)", level, word, reading);
            StringBuilder sb = new StringBuilder();
            sb.append("Từ vựng Kanji: ").append(word)
              .append(" | Cách đọc: ").append(reading);
            if (!romaji.isBlank()) sb.append(" (").append(romaji).append(")");
            sb.append("\nNghĩa tiếng Việt: ").append(meaningVi);
            if (!meaningEn.isBlank()) sb.append(" | English: ").append(meaningEn);
            sb.append("\nThuộc giáo trình Kanji Master ").append(level)
              .append(" - Chương ").append(chNum).append(": ").append(chTitle);

            return createItem(TYPE_KANJI_VOCAB, id, level, title, sb.toString(),
                    Map.of("route", "/kanji?chapterId=" + chapterId, "word", word, "chapterId", chapterId));
        });
    }

    public List<KnowledgeChunk.Item> buildGrammarChunks() {
        String sql = """
                SELECT id, pattern, structure, meaning, example_sentence, example_meaning, notes, jlpt_level
                FROM grammars
                ORDER BY id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            String pattern = str(rs.getString("pattern"));
            String structure = str(rs.getString("structure"));
            String meaning = str(rs.getString("meaning"));
            String ex = str(rs.getString("example_sentence"));
            String exMean = str(rs.getString("example_meaning"));
            String notes = str(rs.getString("notes"));
            String level = normLevel(rs.getString("jlpt_level"));

            String title = String.format("Ngữ pháp %s: %s", level, pattern);
            StringBuilder sb = new StringBuilder();
            sb.append("Mẫu ngữ pháp: ").append(pattern).append(" (Cấp độ ").append(level).append(")");
            if (!structure.isBlank()) sb.append("\nCấu trúc: ").append(structure);
            sb.append("\nÝ nghĩa: ").append(meaning);
            if (!ex.isBlank()) sb.append("\nVí dụ: ").append(ex).append(exMean.isBlank() ? "" : " — " + exMean);
            if (!notes.isBlank()) sb.append("\nGhi chú: ").append(notes);

            return createItem(TYPE_GRAMMAR, id, level, title, sb.toString(),
                    Map.of("route", "/grammar", "pattern", pattern));
        });
    }

    public List<KnowledgeChunk.Item> buildGrammarLessonChunks() {
        // Gom các timestamp và cheatsheet theo từng bài giảng video để mỗi bài tạo 1 chunk giàu ngữ cảnh
        Map<Long, List<String>> timestampsByLesson = new HashMap<>();
        jdbc.query("""
                SELECT lesson_id, pattern, title, summary
                FROM grammar_timestamps
                ORDER BY lesson_id, sort_order, time_sec
                """, rs -> {
            long lid = rs.getLong("lesson_id");
            String pat = str(rs.getString("pattern"));
            String ttl = str(rs.getString("title"));
            String sum = str(rs.getString("summary"));
            if ("Mở đầu".equalsIgnoreCase(pat) && sum.isBlank()) return;
            String line = pat + (!ttl.isBlank() && !ttl.equals(pat) ? " (" + ttl + ")" : "")
                    + (!sum.isBlank() ? ": " + sum : "");
            timestampsByLesson.computeIfAbsent(lid, k -> new ArrayList<>()).add(line);
        });

        Map<Long, List<String>> cheatsheetsByLesson = new HashMap<>();
        jdbc.query("""
                SELECT lesson_id, pattern, structure, meaning, nuance
                FROM grammar_cheatsheets
                ORDER BY lesson_id, sort_order
                """, rs -> {
            long lid = rs.getLong("lesson_id");
            String pat = str(rs.getString("pattern"));
            String strct = str(rs.getString("structure"));
            String mean = str(rs.getString("meaning"));
            String nua = str(rs.getString("nuance"));
            String line = String.format("Công thức %s [%s]: %s%s",
                    pat, strct, mean, nua.isBlank() ? "" : " (Sắc thái: " + nua + ")");
            cheatsheetsByLesson.computeIfAbsent(lid, k -> new ArrayList<>()).add(line);
        });

        String sql = """
                SELECT id, level_code, lesson_number, title_vi, title_ja
                FROM grammar_lessons
                WHERE is_active = TRUE
                ORDER BY id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            String level = normLevel(rs.getString("level_code"));
            int num = rs.getInt("lesson_number");
            String titleVi = str(rs.getString("title_vi"));
            String titleJa = str(rs.getString("title_ja"));

            String title = String.format("Bài giảng Ngữ pháp %s - Bài %d: %s", level, num, titleVi);
            StringBuilder sb = new StringBuilder();
            sb.append(title);
            if (!titleJa.isBlank()) sb.append(" (").append(titleJa).append(")");

            List<String> sheets = cheatsheetsByLesson.getOrDefault(id, List.of());
            if (!sheets.isEmpty()) {
                sb.append("\nCông thức trọng tâm:\n- ").append(String.join("\n- ", sheets));
            }
            List<String> points = timestampsByLesson.getOrDefault(id, List.of());
            if (!points.isEmpty()) {
                sb.append("\nCác điểm ngữ pháp trong bài:\n- ").append(String.join("\n- ", points));
            }

            return createItem(TYPE_GRAMMAR_LESSON, id, level, title, sb.toString(),
                    Map.of("route", "/grammar?lessonId=" + id, "lessonId", id, "lessonNumber", num));
        });
    }

    public List<KnowledgeChunk.Item> buildExamQuestionChunks() {
        String sql = """
                SELECT q.id, q.exam_id, e.title AS exam_title, e.jlpt_level, q.section_id,
                       q.content, q.option_a, q.option_b, q.option_c, q.option_d,
                       q.correct_answer, q.explanation
                FROM questions q
                JOIN exams e ON e.id = q.exam_id
                ORDER BY q.id
                """;
        return jdbc.query(sql, (rs, rowNum) -> {
            long id = rs.getLong("id");
            long examId = rs.getLong("exam_id");
            String examTitle = str(rs.getString("exam_title"));
            String level = normLevel(rs.getString("jlpt_level"));
            String section = str(rs.getString("section_id"));
            String content = str(rs.getString("content"));
            String a = str(rs.getString("option_a"));
            String b = str(rs.getString("option_b"));
            String c = str(rs.getString("option_c"));
            String d = str(rs.getString("option_d"));
            String ans = str(rs.getString("correct_answer"));
            String exp = str(rs.getString("explanation"));

            String title = String.format("Câu hỏi JLPT %s - %s (#%d)", level, examTitle, id);
            StringBuilder sb = new StringBuilder();
            sb.append("Đề thi: ").append(examTitle).append(" (").append(level).append(" - ").append(section).append(")\n");
            sb.append("Câu hỏi: ").append(content).append("\n");
            sb.append("A. ").append(a).append(" | B. ").append(b)
              .append(" | C. ").append(c).append(" | D. ").append(d).append("\n");
            sb.append("Đáp án đúng: ").append(ans);
            if (!exp.isBlank()) sb.append("\nGiải thích: ").append(exp);

            return createItem(TYPE_EXAM_QUESTION, id, level, title, sb.toString(),
                    Map.of("route", "/exams/" + examId, "examId", examId));
        });
    }

    public List<KnowledgeChunk.Item> buildFaqChunks() {
        List<KnowledgeChunk.Item> faqs = new ArrayList<>();
        faqs.add(createItem(TYPE_FAQ, 1L, "ALL",
                "Hướng dẫn tính năng Flashcard SRS trên Nippon Master",
                "Flashcard SRS (Spaced Repetition System) trên Nippon Master giúp ôn tập từ vựng và Kanji theo thuật toán lặp lại ngắt quãng. "
                        + "Học viên vào mục Flashcards (/flashcards), chọn cấp độ N5 đến N1 hoặc luyện tập nhanh (Quick Practice), đánh dấu mức độ nhớ để hệ thống tự lên lịch ôn lại đúng thời điểm sắp quên.",
                Map.of("route", "/flashcards")));

        faqs.add(createItem(TYPE_FAQ, 2L, "ALL",
                "Hướng dẫn học Kanji Master & luyện viết nét chữ Hán",
                "Tính năng Kanji Master (/kanji) chia hơn 2.100 chữ Kanji từ N5 đến N1 thành các chương bài bản kèm âm On, âm Kun, âm Hán Việt, mẹo nhớ (mnemonic) và từ vựng ứng dụng. "
                        + "Học viên có thể luyện viết Kanji trực tiếp trên Canvas để hệ thống chấm nét và làm bài tập đọc/viết cuối mỗi chương.",
                Map.of("route", "/kanji")));

        faqs.add(createItem(TYPE_FAQ, 3L, "ALL",
                "Hướng dẫn học Ngữ pháp qua Video & làm Quiz xếp sao",
                "Mục Ngữ pháp (/grammar) cung cấp 130+ bài giảng video theo lộ trình N5–N1. Mỗi bài có mốc thời gian tua nhanh (timestamps) theo từng mẫu câu, bảng tóm tắt sắc thái (cheatsheet) và ngân hàng bài tập trắc nghiệm + xếp sao JLPT.",
                Map.of("route", "/grammar")));

        faqs.add(createItem(TYPE_FAQ, 4L, "ALL",
                "Hướng dẫn làm Đề thi thử JLPT & Kiểm tra đầu vào",
                "Học viên mới có thể làm bài Placement Test (/placement) để xác định trình độ hiện tại (Starter đến N1) và nhận lộ trình đề xuất. "
                        + "Trong mục Đề thi JLPT (/exams), hệ thống chấm điểm tự động theo cấu trúc thật (Từ vựng-Ngữ pháp, Đọc hiểu, Nghe hiểu) và lưu lịch sử phân tích điểm yếu.",
                Map.of("route", "/exams")));

        faqs.add(createItem(TYPE_FAQ, 5L, "ALL",
                "Hướng dẫn Dịch nhanh AI & Phân tích cú pháp câu",
                "Mục Dịch thuật (/translation) hỗ trợ dịch đa chiều Nhật–Việt–Anh theo thời gian thực như Google Dịch. "
                        + "Sau khi có bản dịch, học viên có thể bấm nút 'Phân tích chi tiết' để xem phiên âm Furigana, tách từng từ vựng kèm Hán Việt và giải thích sắc thái ngữ pháp.",
                Map.of("route", "/translation")));

        return faqs;
    }

    // -------------------------------------------------------------------------

    private KnowledgeChunk.Item createItem(String type, long id, String level, String title,
                                           String content, Map<String, Object> meta) {
        String safeTitle = title.length() > 290 ? title.substring(0, 290) : title;
        String metaJson = "{}";
        try {
            metaJson = mapper.writeValueAsString(meta);
        } catch (Exception ignored) {}

        return KnowledgeChunk.Item.builder()
                .sourceType(type)
                .sourceId(id)
                .jlptLevel(level)
                .title(safeTitle)
                .content(content)
                .contentHash(sha256(safeTitle + "\n" + level + "\n" + content))
                .metadataJson(metaJson)
                .build();
    }

    private String str(String v) {
        return v == null ? "" : v.trim();
    }

    private String normLevel(String lvl) {
        if (lvl == null || lvl.isBlank()) return "ALL";
        return lvl.trim().toUpperCase();
    }

    public static String sha256(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder(digest.length * 2);
            for (byte b : digest) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception e) {
            return Integer.toHexString(input.hashCode());
        }
    }
}

