package com.nihongo.api.modules.ai.rag.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Mô hình đại diện cho 1 mảnh kiến thức (chunk) trong kho tri thức RAG
 * và kết quả tìm kiếm Hybrid Search.
 */
public final class KnowledgeChunk {

    private KnowledgeChunk() {}

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private String sourceType;   // VOCAB, KANJI, KANJI_VOCAB, GRAMMAR, GRAMMAR_LESSON, EXAM_QUESTION, FAQ
        private long sourceId;
        private String jlptLevel;    // N5..N1, STARTER, ALL
        private String title;
        private String content;
        private String contentHash;
        private String metadataJson; // JSON string cho route, chapterId, ...
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchResult {
        private Long id;
        private String sourceType;
        private Long sourceId;
        private String jlptLevel;
        private String title;
        private String content;
        private String metadataJson;
        private double score;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchResponse {
        private String query;
        private String levelFilter;
        private long latencyMs;
        private java.util.List<SearchResult> results;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SyncReport {
        private int totalScanned;
        private int skippedUnchanged;
        private int newlyEmbedded;
        private int failedBatches;
        private long durationMs;
        private Map<String, Integer> syncedByType;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatsResponse {
        private boolean pgvectorEnabled;
        private boolean syncRunning;
        private long totalChunks;
        private long embeddedChunks;
        private Map<String, Long> countBySourceType;
    }
}
