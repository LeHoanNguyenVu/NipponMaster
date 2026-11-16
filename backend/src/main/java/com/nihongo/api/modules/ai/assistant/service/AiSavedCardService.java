package com.nihongo.api.modules.ai.assistant.service;

import com.nihongo.api.modules.ai.assistant.dto.ChatDtos.QuickSaveCardRequest;
import com.nihongo.api.modules.ai.assistant.dto.ChatDtos.SavedCardDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

/**
 * Lưu nhanh từ vựng/Kanji từ câu trả lời Sensei AI vào sổ tay Flashcard cá nhân (1 click).
 * Tự động bổ sung cách đọc & nghĩa từ kho từ vựng/Kanji nội bộ nếu học viên chỉ bôi đen chữ Nhật.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AiSavedCardService {

    private final JdbcTemplate jdbc;

    public SavedCardDto saveCard(Long userId, QuickSaveCardRequest req) {
        String word = req.getWord().trim();
        String reading = req.getReading() != null ? req.getReading().trim() : "";
        String meaning = req.getMeaning() != null ? req.getMeaning().trim() : "";
        String level = req.getJlptLevel() != null ? req.getJlptLevel().trim().toUpperCase() : null;

        // Tự bổ sung nghĩa/cách đọc từ bảng vocabularies / kanji_chapter_vocab / kanjis nếu chưa có
        if (reading.isBlank() || meaning.isBlank()) {
            EnrichedInfo info = lookupWordInfo(word);
            if (reading.isBlank() && info.reading != null) reading = info.reading;
            if (meaning.isBlank() && info.meaning != null) meaning = info.meaning;
            if ((level == null || level.isBlank()) && info.level != null) level = info.level;
        }

        return jdbc.queryForObject("""
                INSERT INTO ai_saved_cards (user_id, word, reading, meaning, jlpt_level)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT (user_id, word) DO UPDATE SET
                    reading = COALESCE(NULLIF(EXCLUDED.reading, ''), ai_saved_cards.reading),
                    meaning = COALESCE(NULLIF(EXCLUDED.meaning, ''), ai_saved_cards.meaning),
                    jlpt_level = COALESCE(EXCLUDED.jlpt_level, ai_saved_cards.jlpt_level)
                RETURNING id, word, reading, meaning, jlpt_level, created_at
                """,
                (rs, i) -> SavedCardDto.builder()
                        .id(rs.getLong("id"))
                        .word(rs.getString("word"))
                        .reading(rs.getString("reading"))
                        .meaning(rs.getString("meaning"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .build(),
                userId, word, reading, meaning, level);
    }

    public List<SavedCardDto> listCards(Long userId) {
        return jdbc.query("""
                SELECT id, word, reading, meaning, jlpt_level, created_at
                FROM ai_saved_cards
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 100
                """,
                (rs, i) -> SavedCardDto.builder()
                        .id(rs.getLong("id"))
                        .word(rs.getString("word"))
                        .reading(rs.getString("reading"))
                        .meaning(rs.getString("meaning"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .createdAt(toOffset(rs.getTimestamp("created_at")))
                        .build(),
                userId);
    }

    public void deleteCard(Long userId, Long cardId) {
        jdbc.update("DELETE FROM ai_saved_cards WHERE id = ? AND user_id = ?", cardId, userId);
    }

    private record EnrichedInfo(String reading, String meaning, String level) {}

    private EnrichedInfo lookupWordInfo(String word) {
        try {
            List<EnrichedInfo> vocab = jdbc.query(
                    "SELECT reading, meaning, jlpt_level FROM vocabularies WHERE word = ? LIMIT 1",
                    (rs, i) -> new EnrichedInfo(rs.getString("reading"), rs.getString("meaning"), rs.getString("jlpt_level")),
                    word);
            if (!vocab.isEmpty()) return vocab.get(0);

            List<EnrichedInfo> kcv = jdbc.query("""
                    SELECT kcv.reading, kcv.meaning_vi, kc.jlpt_level
                    FROM kanji_chapter_vocab kcv
                    JOIN kanji_chapters kc ON kc.id = kcv.chapter_id
                    WHERE kcv.word = ? LIMIT 1
                    """,
                    (rs, i) -> new EnrichedInfo(rs.getString("reading"), rs.getString("meaning_vi"), rs.getString("jlpt_level")),
                    word);
            if (!kcv.isEmpty()) return kcv.get(0);

            if (word.length() == 1) {
                List<EnrichedInfo> kanji = jdbc.query(
                        "SELECT COALESCE(NULLIF(kun_reading,''), on_reading) AS rd, meaning, jlpt_level FROM kanjis WHERE character = ? LIMIT 1",
                        (rs, i) -> new EnrichedInfo(rs.getString("rd"), rs.getString("meaning"), rs.getString("jlpt_level")),
                        word);
                if (!kanji.isEmpty()) return kanji.get(0);
            }
        } catch (Exception e) {
            log.debug("Lookup word info failed: {}", e.getMessage());
        }
        return new EnrichedInfo(null, null, null);
    }

    private OffsetDateTime toOffset(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }
}
