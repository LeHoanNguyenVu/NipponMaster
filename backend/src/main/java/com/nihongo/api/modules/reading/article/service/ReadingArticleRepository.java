package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.*;

/**
 * Repository JDBC cho bảng reading_articles và reading_article_versions (tối ưu cột JSONB theo chuẩn AiSavedCardService).
 */
@Repository
@RequiredArgsConstructor
public class ReadingArticleRepository {

    private final JdbcTemplate jdbc;
    private final ObjectMapper objectMapper;

    public boolean existsBySourceUrl(String sourceUrl) {
        Integer cnt = jdbc.queryForObject(
                "SELECT COUNT(1) FROM reading_articles WHERE source_url = ?",
                Integer.class,
                sourceUrl
        );
        return cnt != null && cnt > 0;
    }

    public record VersionInsertPayload(
            String jlptLevel,
            String titleJa,
            String titleVi,
            List<SentenceDto> sentences,
            List<KeyVocabDto> keyVocab,
            int charCount,
            String computedLevel,
            Map<String, Object> levelMetrics,
            String voiceName
    ) {
    }

    /**
     * Lưu nguyên tử 1 bài đọc (trạng thái REVIEW) cùng toàn bộ phiên bản JLPT trong 1 transaction ngắn (không giữ connection khi gọi Gemini).
     */
    @Transactional
    public Long saveArticleWithVersions(
            String sourceName,
            String sourceLicense,
            String sourceUrl,
            String sourceTitle,
            OffsetDateTime sourcePublishedAt,
            String category,
            List<String> facts,
            List<VersionInsertPayload> versions
    ) {
        Long articleId = insertArticle(sourceName, sourceLicense, sourceUrl, sourceTitle, sourcePublishedAt, category, facts);
        for (VersionInsertPayload v : versions) {
            insertVersion(
                    articleId,
                    v.jlptLevel(),
                    v.titleJa(),
                    v.titleVi(),
                    v.sentences(),
                    v.keyVocab(),
                    v.charCount(),
                    v.computedLevel(),
                    v.levelMetrics(),
                    v.voiceName()
            );
        }
        return articleId;
    }

    public Long insertArticle(
            String sourceName,
            String sourceLicense,
            String sourceUrl,
            String sourceTitle,
            OffsetDateTime sourcePublishedAt,
            String category,
            List<String> facts
    ) {
        String factsJson = toJson(facts);
        Timestamp pubTs = sourcePublishedAt != null ? Timestamp.from(sourcePublishedAt.toInstant()) : null;
        return jdbc.queryForObject("""
                INSERT INTO reading_articles
                    (source_name, source_license, source_url, source_title, source_published_at, category, facts, status)
                VALUES (?, ?, ?, ?, ?, ?, ?::jsonb, 'REVIEW')
                RETURNING id
                """,
                Long.class,
                sourceName, sourceLicense, sourceUrl, sourceTitle, pubTs, category, factsJson
        );
    }

    public Long insertVersion(
            Long articleId,
            String jlptLevel,
            String titleJa,
            String titleVi,
            List<SentenceDto> sentences,
            List<KeyVocabDto> keyVocab,
            int charCount,
            String computedLevel,
            Map<String, Object> levelMetrics,
            String voiceName
    ) {
        String sentencesJson = toJson(sentences);
        String keyVocabJson = toJson(keyVocab != null ? keyVocab : List.of());
        String metricsJson = levelMetrics != null ? toJson(levelMetrics) : null;
        return jdbc.queryForObject("""
                INSERT INTO reading_article_versions
                    (article_id, jlpt_level, title_ja, title_vi, sentences, key_vocab, char_count,
                     computed_level, level_metrics, voice_name, audio_status)
                VALUES (?, ?, ?, ?, ?::jsonb, ?::jsonb, ?, ?, ?::jsonb, ?, 'PENDING')
                RETURNING id
                """,
                Long.class,
                articleId, jlptLevel, titleJa, titleVi, sentencesJson, keyVocabJson, charCount,
                computedLevel, metricsJson, voiceName
        );
    }

    public List<AdminArticleSummaryDto> listArticlesForAdmin(String status, int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 100));
        boolean filterStatus = status != null && !status.isBlank() && !"ALL".equalsIgnoreCase(status);

        List<AdminArticleSummaryDto> articles = filterStatus
                ? jdbc.query("""
                        SELECT id, source_name, source_license, source_url, source_title,
                               source_published_at, category, facts::text AS facts_json, status, created_at, published_at
                        FROM reading_articles
                        WHERE status = ?
                        ORDER BY created_at DESC
                        LIMIT ?
                        """, (rs, i) -> mapArticleRow(rs), status.trim().toUpperCase(Locale.ROOT), safeLimit)
                : jdbc.query("""
                        SELECT id, source_name, source_license, source_url, source_title,
                               source_published_at, category, facts::text AS facts_json, status, created_at, published_at
                        FROM reading_articles
                        ORDER BY created_at DESC
                        LIMIT ?
                        """, (rs, i) -> mapArticleRow(rs), safeLimit);

        if (articles.isEmpty()) {
            return articles;
        }

        Map<Long, List<AdminVersionSummaryDto>> versionsByArticle = new HashMap<>();
        String placeholders = String.join(",", Collections.nCopies(articles.size(), "?"));
        Object[] ids = articles.stream().map(AdminArticleSummaryDto::getId).toArray();

        jdbc.query("""
                SELECT id, article_id, jlpt_level, title_ja, title_vi, char_count,
                       computed_level, level_metrics::text AS metrics_json, voice_name, audio_status
                FROM reading_article_versions
                WHERE article_id IN (%s)
                ORDER BY jlpt_level DESC
                """.formatted(placeholders),
                rs -> {
                    Long artId = rs.getLong("article_id");
                    AdminVersionSummaryDto v = AdminVersionSummaryDto.builder()
                            .id(rs.getLong("id"))
                            .jlptLevel(rs.getString("jlpt_level"))
                            .titleJa(rs.getString("title_ja"))
                            .titleVi(rs.getString("title_vi"))
                            .charCount(rs.getInt("char_count"))
                            .computedLevel(rs.getString("computed_level"))
                            .levelMetrics(fromJsonMap(rs.getString("metrics_json")))
                            .voiceName(rs.getString("voice_name"))
                            .audioStatus(rs.getString("audio_status"))
                            .build();
                    versionsByArticle.computeIfAbsent(artId, k -> new ArrayList<>()).add(v);
                },
                ids
        );

        for (AdminArticleSummaryDto art : articles) {
            art.setVersions(versionsByArticle.getOrDefault(art.getId(), List.of()));
        }
        return articles;
    }

    public AdminArticleSummaryDto updateArticleStatus(Long articleId, String newStatus) {
        String normalized = newStatus.trim().toUpperCase(Locale.ROOT);
        int updated;
        if ("PUBLISHED".equals(normalized)) {
            updated = jdbc.update(
                    "UPDATE reading_articles SET status = 'PUBLISHED', published_at = NOW() WHERE id = ?",
                    articleId
            );
        } else if ("REJECTED".equals(normalized)) {
            updated = jdbc.update(
                    "UPDATE reading_articles SET status = 'REJECTED' WHERE id = ?",
                    articleId
            );
        } else {
            throw new IllegalArgumentException("Trạng thái không hợp lệ: " + newStatus);
        }

        if (updated == 0) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc id=" + articleId);
        }

        return findAdminArticleById(articleId);
    }

    public AdminArticleSummaryDto findAdminArticleById(Long articleId) {
        List<AdminArticleSummaryDto> list = jdbc.query("""
                SELECT id, source_name, source_license, source_url, source_title,
                       source_published_at, category, facts::text AS facts_json, status, created_at, published_at
                FROM reading_articles
                WHERE id = ?
                """, (rs, i) -> mapArticleRow(rs), articleId);
        if (list.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc id=" + articleId);
        }
        AdminArticleSummaryDto art = list.get(0);
        List<AdminVersionSummaryDto> versions = jdbc.query("""
                SELECT id, jlpt_level, title_ja, title_vi, char_count,
                       computed_level, level_metrics::text AS metrics_json, voice_name, audio_status
                FROM reading_article_versions
                WHERE article_id = ?
                ORDER BY jlpt_level DESC
                """,
                (rs, i) -> AdminVersionSummaryDto.builder()
                        .id(rs.getLong("id"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .titleJa(rs.getString("title_ja"))
                        .titleVi(rs.getString("title_vi"))
                        .charCount(rs.getInt("char_count"))
                        .computedLevel(rs.getString("computed_level"))
                        .levelMetrics(fromJsonMap(rs.getString("metrics_json")))
                        .voiceName(rs.getString("voice_name"))
                        .audioStatus(rs.getString("audio_status"))
                        .build(),
                articleId
        );
        art.setVersions(versions);
        return art;
    }

    private AdminArticleSummaryDto mapArticleRow(java.sql.ResultSet rs) throws java.sql.SQLException {
        return AdminArticleSummaryDto.builder()
                .id(rs.getLong("id"))
                .sourceName(rs.getString("source_name"))
                .sourceLicense(rs.getString("source_license"))
                .sourceUrl(rs.getString("source_url"))
                .sourceTitle(rs.getString("source_title"))
                .sourcePublishedAt(toOffset(rs.getTimestamp("source_published_at")))
                .category(rs.getString("category"))
                .facts(fromJsonList(rs.getString("facts_json")))
                .status(rs.getString("status"))
                .createdAt(toOffset(rs.getTimestamp("created_at")))
                .publishedAt(toOffset(rs.getTimestamp("published_at")))
                .build();
    }

    private OffsetDateTime toOffset(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new IllegalStateException("Lỗi serialize JSON", e);
        }
    }

    private List<String> fromJsonList(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return List.of();
        }
    }

    private Map<String, Object> fromJsonMap(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return null;
        }
    }
}
