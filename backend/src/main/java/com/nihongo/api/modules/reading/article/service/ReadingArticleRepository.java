package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${reading.retention.days:7}")
    private int retentionDays = 7;

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
        return listArticlesForAdmin(status, null, limit);
    }

    public List<AdminArticleSummaryDto> listArticlesForAdmin(String status, Boolean needsReviewOnly, int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 100));
        boolean filterStatus = status != null && !status.isBlank() && !"ALL".equalsIgnoreCase(status);
        boolean filterNeedsReview = Boolean.TRUE.equals(needsReviewOnly);

        StringBuilder sql = new StringBuilder("""
                SELECT a.id, a.source_name, a.source_license, a.source_url, a.source_title,
                       a.source_published_at, a.category, a.facts::text AS facts_json, a.status,
                       a.cover_image_url, a.cover_image_credit, a.cover_image_source,
                       a.created_at, a.published_at
                FROM reading_articles a
                WHERE 1=1
                """);
        List<Object> params = new ArrayList<>();
        if (filterStatus) {
            sql.append(" AND a.status = ?");
            params.add(status.trim().toUpperCase(Locale.ROOT));
        }
        if (filterNeedsReview) {
            sql.append(" AND EXISTS (SELECT 1 FROM reading_article_versions v WHERE v.article_id = a.id AND (v.level_metrics->>'needsReview') = 'true')");
        }
        sql.append(" ORDER BY a.created_at DESC LIMIT ?");
        params.add(safeLimit);

        List<AdminArticleSummaryDto> articles = jdbc.query(sql.toString(), (rs, i) -> mapArticleRow(rs), params.toArray());

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
                    "UPDATE reading_articles SET status = 'PUBLISHED', published_at = COALESCE(published_at, NOW()) WHERE id = ?",
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
                       source_published_at, category, facts::text AS facts_json, status,
                       cover_image_url, cover_image_credit, cover_image_source,
                       created_at, published_at
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

    public record VersionClassificationRow(
            Long id,
            String jlptLevel,
            List<SentenceDto> sentences,
            List<KeyVocabDto> keyVocab,
            Map<String, Object> existingMetrics
    ) {
    }

    public List<VersionClassificationRow> findVersionsForClassification(Long articleId) {
        return jdbc.query("""
                SELECT id, jlpt_level, sentences::text AS sentences_json, key_vocab::text AS kv_json, level_metrics::text AS metrics_json
                FROM reading_article_versions
                WHERE article_id = ?
                ORDER BY id ASC
                """,
                (rs, i) -> new VersionClassificationRow(
                        rs.getLong("id"),
                        rs.getString("jlpt_level"),
                        fromJsonSentences(rs.getString("sentences_json")),
                        fromJsonKeyVocab(rs.getString("kv_json")),
                        fromJsonMap(rs.getString("metrics_json"))
                ),
                articleId
        );
    }

    public void updateVersionClassification(
            Long versionId,
            List<SentenceDto> tokenizedSentences,
            String computedLevel,
            Map<String, Object> levelMetrics
    ) {
        jdbc.update("""
                UPDATE reading_article_versions
                SET sentences = ?::jsonb, computed_level = ?, level_metrics = ?::jsonb
                WHERE id = ?
                """,
                toJson(tokenizedSentences),
                computedLevel,
                toJson(levelMetrics),
                versionId
        );
    }

    public record VersionAudioRow(
            Long id,
            Long articleId,
            String jlptLevel,
            String voiceName,
            String audioStatus,
            List<SentenceDto> sentences
    ) {
    }

    public VersionAudioRow findVersionForAudio(Long versionId) {
        List<VersionAudioRow> list = jdbc.query("""
                SELECT id, article_id, jlpt_level, voice_name, audio_status, sentences::text AS sentences_json
                FROM reading_article_versions
                WHERE id = ?
                """,
                (rs, i) -> new VersionAudioRow(
                        rs.getLong("id"),
                        rs.getLong("article_id"),
                        rs.getString("jlpt_level"),
                        rs.getString("voice_name"),
                        rs.getString("audio_status"),
                        fromJsonSentences(rs.getString("sentences_json"))
                ),
                versionId
        );
        if (list.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy phiên bản bài đọc id=" + versionId);
        }
        return list.get(0);
    }

    public List<Long> findVersionIdsByArticleId(Long articleId) {
        return jdbc.queryForList(
                "SELECT id FROM reading_article_versions WHERE article_id = ? ORDER BY id ASC",
                Long.class,
                articleId
        );
    }

    public void updateVersionAudio(Long versionId, List<SentenceDto> sentences, String voiceName, String audioStatus) {
        jdbc.update("""
                UPDATE reading_article_versions
                SET sentences = ?::jsonb, voice_name = ?, audio_status = ?
                WHERE id = ?
                """,
                toJson(sentences),
                voiceName,
                audioStatus,
                versionId
        );
    }

    public void updateArticleCoverImage(Long articleId, String coverImageUrl, String coverImageCredit, String coverImageSource) {
        int updated = jdbc.update("""
                UPDATE reading_articles
                SET cover_image_url = ?, cover_image_credit = ?, cover_image_source = ?
                WHERE id = ?
                """,
                coverImageUrl,
                coverImageCredit,
                coverImageSource,
                articleId
        );
        if (updated == 0) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc id=" + articleId);
        }
    }

    public List<Long> findArticleIdsWithoutCoverImage(int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 50));
        return jdbc.queryForList("""
                SELECT id FROM reading_articles
                WHERE (cover_image_url IS NULL OR BTRIM(cover_image_url) = '')
                  AND status IN ('PUBLISHED', 'REVIEW')
                ORDER BY created_at DESC
                LIMIT ?
                """,
                Long.class,
                safeLimit
        );
    }

    // --- Public Student Queries (CHỈ trả bài PUBLISHED, KHÔNG trả source_title) ---

    public ReadingArticleListResponse findPublishedArticles(Long userId, String level, String category, int page, int size) {
        StringBuilder where = new StringBuilder(
                " WHERE a.status = 'PUBLISHED' AND COALESCE(a.published_at, a.created_at) >= NOW() - make_interval(days => ?) "
        );
        List<Object> filterParams = new ArrayList<>();
        filterParams.add(Math.max(1, retentionDays));
        if (level != null && !level.isBlank()) {
            where.append(" AND v.jlpt_level = ? ");
            filterParams.add(level);
        }
        if (category != null && !category.isBlank()) {
            where.append(" AND a.category = ? ");
            filterParams.add(category);
        }

        Long totalObj = jdbc.queryForObject(
                "SELECT COUNT(1) FROM reading_article_versions v JOIN reading_articles a ON v.article_id = a.id " + where,
                Long.class,
                filterParams.toArray()
        );
        long total = totalObj != null ? totalObj : 0L;

        List<Object> queryParams = new ArrayList<>();
        queryParams.add(userId != null ? userId : -1L);
        queryParams.addAll(filterParams);
        queryParams.add(size);
        queryParams.add((long) page * size);

        List<ReadingArticleCardDto> items = jdbc.query("""
                SELECT v.id AS version_id, v.article_id, v.jlpt_level, v.computed_level, a.category,
                       v.title_ja, v.title_vi, v.char_count, v.voice_name, v.audio_status,
                       a.source_name, a.source_license, a.cover_image_url, a.cover_image_credit, a.published_at,
                       (urp.version_id IS NOT NULL) AS completed
                FROM reading_article_versions v
                JOIN reading_articles a ON v.article_id = a.id
                LEFT JOIN user_reading_progress urp ON urp.version_id = v.id AND urp.user_id = ?
                """ + where + """
                ORDER BY a.published_at DESC NULLS LAST, v.id DESC
                LIMIT ? OFFSET ?
                """,
                (rs, i) -> {
                    int chars = rs.getInt("char_count");
                    return ReadingArticleCardDto.builder()
                            .versionId(rs.getLong("version_id"))
                            .articleId(rs.getLong("article_id"))
                            .jlptLevel(rs.getString("jlpt_level"))
                            .computedLevel(rs.getString("computed_level"))
                            .category(rs.getString("category"))
                            .titleJa(rs.getString("title_ja"))
                            .titleVi(rs.getString("title_vi"))
                            .charCount(chars)
                            .estimatedMinutes(Math.max(1, (int) Math.ceil(chars / 180.0)))
                            .voiceName(rs.getString("voice_name"))
                            .audioStatus(rs.getString("audio_status"))
                            .sourceName(rs.getString("source_name"))
                            .sourceLicense(rs.getString("source_license"))
                            .coverImageUrl(rs.getString("cover_image_url"))
                            .coverImageCredit(rs.getString("cover_image_credit"))
                            .publishedAt(toOffset(rs.getTimestamp("published_at")))
                            .completed(rs.getBoolean("completed"))
                            .build();
                },
                queryParams.toArray()
        );

        int totalPages = total == 0 ? 0 : (int) Math.ceil((double) total / size);
        return ReadingArticleListResponse.builder()
                .items(items)
                .page(page)
                .size(size)
                .totalItems(total)
                .totalPages(totalPages)
                .build();
    }

    public ReadingVersionDetailDto findPublishedVersionDetail(Long versionId, Long userId) {
        return findVersionDetailInternal(versionId, userId, true);
    }

    /**
     * Xem trước chi tiết phiên bản bài đọc dành riêng cho Admin (xem được cả bài REVIEW/REJECTED trước khi duyệt).
     */
    public ReadingVersionDetailDto findVersionDetailForAdmin(Long versionId) {
        return findVersionDetailInternal(versionId, -1L, false);
    }

    private ReadingVersionDetailDto findVersionDetailInternal(Long versionId, Long userId, boolean publishedOnly) {
        String statusClause = publishedOnly
                ? " AND a.status = 'PUBLISHED' AND COALESCE(a.published_at, a.created_at) >= NOW() - make_interval(days => ?) "
                : "";
        List<Object> args = new ArrayList<>();
        args.add(userId != null ? userId : -1L);
        args.add(versionId);
        if (publishedOnly) {
            args.add(Math.max(1, retentionDays));
        }
        List<ReadingVersionDetailDto> list = jdbc.query("""
                SELECT v.id AS version_id, v.article_id, v.jlpt_level, v.computed_level, a.category,
                       v.title_ja, v.title_vi, v.char_count, v.voice_name, v.audio_status,
                       a.source_name, a.source_license, a.source_url, a.cover_image_url, a.cover_image_credit, a.published_at,
                       v.sentences::text AS sentences_json, v.key_vocab::text AS kv_json,
                       (urp.version_id IS NOT NULL) AS completed
                FROM reading_article_versions v
                JOIN reading_articles a ON v.article_id = a.id
                LEFT JOIN user_reading_progress urp ON urp.version_id = v.id AND urp.user_id = ?
                WHERE v.id = ? """ + statusClause,
                (rs, i) -> {
                    int chars = rs.getInt("char_count");
                    return ReadingVersionDetailDto.builder()
                            .versionId(rs.getLong("version_id"))
                            .articleId(rs.getLong("article_id"))
                            .jlptLevel(rs.getString("jlpt_level"))
                            .computedLevel(rs.getString("computed_level"))
                            .category(rs.getString("category"))
                            .titleJa(rs.getString("title_ja"))
                            .titleVi(rs.getString("title_vi"))
                            .charCount(chars)
                            .estimatedMinutes(Math.max(1, (int) Math.ceil(chars / 180.0)))
                            .voiceName(rs.getString("voice_name"))
                            .audioStatus(rs.getString("audio_status"))
                            .sourceName(rs.getString("source_name"))
                            .sourceLicense(rs.getString("source_license"))
                            .sourceUrl(rs.getString("source_url"))
                            .coverImageUrl(rs.getString("cover_image_url"))
                            .coverImageCredit(rs.getString("cover_image_credit"))
                            .publishedAt(toOffset(rs.getTimestamp("published_at")))
                            .sentences(fromJsonSentences(rs.getString("sentences_json")))
                            .keyVocab(fromJsonKeyVocab(rs.getString("kv_json")))
                            .completed(rs.getBoolean("completed"))
                            .build();
                },
                args.toArray()
        );

        if (list.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc đã xuất bản id=" + versionId);
        }

        ReadingVersionDetailDto detail = list.get(0);
        List<OtherLevelLinkDto> siblings = jdbc.query("""
                SELECT v.id AS version_id, v.jlpt_level, v.title_ja, v.audio_status
                FROM reading_article_versions v
                JOIN reading_articles a ON v.article_id = a.id
                WHERE v.article_id = ? AND a.status = 'PUBLISHED'
                ORDER BY CASE v.jlpt_level
                    WHEN 'N5' THEN 1 WHEN 'N4' THEN 2 WHEN 'N3' THEN 3 WHEN 'N2' THEN 4 WHEN 'N1' THEN 5 ELSE 9 END
                """,
                (rs, i) -> OtherLevelLinkDto.builder()
                        .versionId(rs.getLong("version_id"))
                        .jlptLevel(rs.getString("jlpt_level"))
                        .titleJa(rs.getString("title_ja"))
                        .audioStatus(rs.getString("audio_status"))
                        .build(),
                detail.getArticleId()
        );
        detail.setOtherLevels(siblings);
        return detail;
    }

    public boolean isPublishedVersion(Long versionId) {
        Integer cnt = jdbc.queryForObject("""
                SELECT COUNT(1)
                FROM reading_article_versions v
                JOIN reading_articles a ON v.article_id = a.id
                WHERE v.id = ? AND a.status = 'PUBLISHED'
                """,
                Integer.class,
                versionId
        );
        return cnt != null && cnt > 0;
    }

    public int markVersionCompleted(Long userId, Long versionId, Integer readingSeconds) {
        Integer safeSecs = readingSeconds == null ? null : Math.max(0, Math.min(readingSeconds, 7200));
        jdbc.update("""
                INSERT INTO user_reading_progress (user_id, version_id, reading_seconds)
                VALUES (?, ?, ?)
                ON CONFLICT (user_id, version_id) DO UPDATE SET
                    completed_at = NOW(),
                    reading_seconds = COALESCE(EXCLUDED.reading_seconds, user_reading_progress.reading_seconds)
                """,
                userId, versionId, safeSecs
        );
        return (int) countCompletedByUser(userId);
    }

    public long countCompletedByUser(Long userId) {
        if (userId == null) return 0L;
        Long cnt = jdbc.queryForObject("""
                SELECT COUNT(1)
                FROM user_reading_progress urp
                JOIN reading_article_versions v ON v.id = urp.version_id
                JOIN reading_articles a ON a.id = v.article_id
                WHERE urp.user_id = ?
                  AND a.status = 'PUBLISHED'
                  AND COALESCE(a.published_at, a.created_at) >= NOW() - make_interval(days => ?)
                """,
                Long.class,
                userId,
                Math.max(1, retentionDays)
        );
        return cnt != null ? cnt : 0L;
    }

    public long countPublishedVersions() {
        Long cnt = jdbc.queryForObject("""
                SELECT COUNT(1)
                FROM reading_article_versions v
                JOIN reading_articles a ON a.id = v.article_id
                WHERE a.status = 'PUBLISHED'
                  AND COALESCE(a.published_at, a.created_at) >= NOW() - make_interval(days => ?)
                """,
                Long.class,
                Math.max(1, retentionDays)
        );
        return cnt != null ? cnt : 0L;
    }

    /**
     * Xóa các bài báo cũ quá số ngày lưu trữ (mặc định 7 ngày) để trang báo luôn giữ tin tức mới.
     * shortcut: file WAV cũ trên Supabase Storage sẽ dọn bằng lifecycle policy bucket thay vì gọi delete từng file.
     */
    public int deleteExpiredArticles(int days) {
        int safeDays = Math.max(1, days);
        return jdbc.update("""
                DELETE FROM reading_articles
                WHERE COALESCE(published_at, created_at) < NOW() - make_interval(days => ?)
                """,
                safeDays
        );
    }

    /**
     * Tìm bài đọc gợi ý hôm nay: bài PUBLISHED mới nhất (trong vòng 7 ngày) đúng level học viên mà chưa đọc.
     */
    public ReadingArticleCardDto findRecommendedUnreadForUser(Long userId, String preferredLevel) {
        Long safeUserId = userId != null ? userId : -1L;
        String normLevel = preferredLevel != null ? preferredLevel.trim().toUpperCase(Locale.ROOT) : "";
        List<ReadingArticleCardDto> rows = jdbc.query("""
                SELECT v.id AS version_id, v.article_id, v.jlpt_level, v.computed_level, a.category,
                       v.title_ja, v.title_vi, v.char_count, v.voice_name, v.audio_status,
                       a.source_name, a.source_license, a.cover_image_url, a.cover_image_credit, a.published_at,
                       FALSE AS completed
                FROM reading_article_versions v
                JOIN reading_articles a ON v.article_id = a.id
                LEFT JOIN user_reading_progress urp ON urp.version_id = v.id AND urp.user_id = ?
                WHERE a.status = 'PUBLISHED'
                  AND COALESCE(a.published_at, a.created_at) >= NOW() - make_interval(days => ?)
                  AND urp.version_id IS NULL
                ORDER BY (CASE WHEN v.jlpt_level = ? THEN 0 ELSE 1 END) ASC,
                         a.published_at DESC NULLS LAST,
                         v.id DESC
                LIMIT 1
                """,
                (rs, i) -> {
                    int chars = rs.getInt("char_count");
                    return ReadingArticleCardDto.builder()
                            .versionId(rs.getLong("version_id"))
                            .articleId(rs.getLong("article_id"))
                            .jlptLevel(rs.getString("jlpt_level"))
                            .computedLevel(rs.getString("computed_level"))
                            .category(rs.getString("category"))
                            .titleJa(rs.getString("title_ja"))
                            .titleVi(rs.getString("title_vi"))
                            .charCount(chars)
                            .estimatedMinutes(Math.max(1, (int) Math.ceil(chars / 180.0)))
                            .voiceName(rs.getString("voice_name"))
                            .audioStatus(rs.getString("audio_status"))
                            .sourceName(rs.getString("source_name"))
                            .sourceLicense(rs.getString("source_license"))
                            .coverImageUrl(rs.getString("cover_image_url"))
                            .coverImageCredit(rs.getString("cover_image_credit"))
                            .publishedAt(toOffset(rs.getTimestamp("published_at")))
                            .completed(false)
                            .build();
                },
                safeUserId, Math.max(1, retentionDays), normLevel
        );
        return rows.isEmpty() ? null : rows.get(0);
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
                .coverImageUrl(rs.getString("cover_image_url"))
                .coverImageCredit(rs.getString("cover_image_credit"))
                .coverImageSource(rs.getString("cover_image_source"))
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

    private List<SentenceDto> fromJsonSentences(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return List.of();
        }
    }

    private List<KeyVocabDto> fromJsonKeyVocab(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return List.of();
        }
    }
}
