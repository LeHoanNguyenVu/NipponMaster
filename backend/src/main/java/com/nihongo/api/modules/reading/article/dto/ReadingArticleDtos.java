package com.nihongo.api.modules.reading.article.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

/**
 * DTOs cho module Luyện Đọc Báo Nhật (Phase 1 Ingest & Admin Review).
 */
public final class ReadingArticleDtos {

    private ReadingArticleDtos() {
    }

    public record RssSourceConfig(
            String code,
            String displayName,
            String url,
            String licenseType,
            String defaultCategory,
            String expectedCharset
    ) {
    }

    public record RssItem(
            String sourceCode,
            String sourceLicense,
            String defaultCategory,
            String title,
            String description,
            String link,
            OffsetDateTime publishedAt
    ) {
        public String combinedRawText() {
            String t = title == null ? "" : title.trim();
            String d = description == null ? "" : description.trim();
            return (t + " " + d).trim();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TokenDto {
        private String s;   // surface
        private String r;   // reading (hiragana)
        private String l;   // lemma / base form
        private String pos; // part of speech (e.g. 名詞,固有名詞)
        private String lv;  // JLPT level (populated in Phase 2)
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SentenceDto {
        private int idx;
        private String text;
        private String translationVi;
        private List<TokenDto> tokens;
        private String audioUrl;
        private Integer durationMs;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class KeyVocabDto {
        private String word;
        private String reading;
        private String meaningVi;
        private String jlptLevel;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FactsExtractionResult {
        private List<String> facts;
        private String category;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeneratedArticleDto {
        private String titleJa;
        private String titleVi;
        private List<SentenceDto> sentences;
        private List<KeyVocabDto> keyVocab;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminVersionSummaryDto {
        private Long id;
        private String jlptLevel;
        private String titleJa;
        private String titleVi;
        private int charCount;
        private String computedLevel;
        private Map<String, Object> levelMetrics;
        private String voiceName;
        private String audioStatus;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminArticleSummaryDto {
        private Long id;
        private String sourceName;
        private String sourceLicense;
        private String sourceUrl;
        private String sourceTitle; // Chỉ hiển thị cho Admin đối chiếu, không bao giờ lộ ra API học viên
        private OffsetDateTime sourcePublishedAt;
        private String category;
        private List<String> facts;
        private String status;
        private OffsetDateTime createdAt;
        private OffsetDateTime publishedAt;
        private List<AdminVersionSummaryDto> versions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IngestReportDto {
        private int fetchedItems;
        private int skippedDuplicates;
        private int createdArticles;
        private int createdVersions;
        private int failedItems;
        private List<String> errors;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AudioGenerationResultDto {
        private Long versionId;
        private Long articleId;
        private String jlptLevel;
        private String voiceName;
        private String audioStatus;
        private int totalSentences;
        private int readySentences;
        private int failedSentences;
        private long totalDurationMs;
    }

    // --- Public Student API DTOs (Tuyệt đối KHÔNG bao gồm sourceTitle gốc!) ---

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadingArticleCardDto {
        private Long versionId;
        private Long articleId;
        private String jlptLevel;
        private String computedLevel;
        private String category;
        private String titleJa;
        private String titleVi;
        private int charCount;
        private int estimatedMinutes;
        private String voiceName;
        private String audioStatus;
        private String sourceName;
        private String sourceLicense;
        private OffsetDateTime publishedAt;
        private boolean completed;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadingArticleListResponse {
        private List<ReadingArticleCardDto> items;
        private int page;
        private int size;
        private long totalItems;
        private int totalPages;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OtherLevelLinkDto {
        private Long versionId;
        private String jlptLevel;
        private String titleJa;
        private String audioStatus;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadingVersionDetailDto {
        private Long versionId;
        private Long articleId;
        private String jlptLevel;
        private String computedLevel;
        private String category;
        private String titleJa;
        private String titleVi;
        private int charCount;
        private int estimatedMinutes;
        private String voiceName;
        private String audioStatus;
        private String sourceName;
        private String sourceLicense;
        private String sourceUrl;
        private OffsetDateTime publishedAt;
        private List<SentenceDto> sentences;
        private List<KeyVocabDto> keyVocab;
        private List<OtherLevelLinkDto> otherLevels;
        private boolean completed;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompleteReadingRequest {
        private Integer readingSeconds;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompleteReadingResponse {
        private Long versionId;
        private boolean completed;
        private int totalCompleted;
    }
}
