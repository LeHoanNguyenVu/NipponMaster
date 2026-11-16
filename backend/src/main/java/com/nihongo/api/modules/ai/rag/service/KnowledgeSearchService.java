package com.nihongo.api.modules.ai.rag.service;

import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Tìm kiếm Hybrid Search cho RAG:
 * 1. Vector Similarity qua index HNSW (pgvector cosine distance).
 * 2. Exact / Keyword Match cho ký tự Kanji/từ khóa tiếng Nhật trong câu hỏi.
 * 3. Lọc ưu tiên theo cấp độ JLPT nếu học viên chỉ định.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class KnowledgeSearchService {

    // Chỉ bắt từ tiếng Nhật có >= 2 ký tự hoặc ít nhất 1 chữ Kanji đơn (tránh match nhầm 1 chữ kana như は, が vào mọi từ vựng)
    private static final Pattern JP_TOKEN_PATTERN =
            Pattern.compile("(?:[\\u4e00-\\u9fff][\\u3040-\\u30ff\\u4e00-\\u9fff]{0,11}|[\\u3040-\\u30ff\\u4e00-\\u9fff]{2,12})");

    private final JdbcTemplate jdbc;
    private final GeminiEmbeddingClient embeddingClient;

    public KnowledgeChunk.SearchResponse search(String query, String levelFilter, int topK) {
        long t0 = System.currentTimeMillis();
        int safeK = Math.min(Math.max(topK, 1), 20);
        String cleanQuery = query == null ? "" : query.trim();
        String normLevel = (levelFilter == null || levelFilter.isBlank() || "ALL".equalsIgnoreCase(levelFilter))
                ? null : levelFilter.trim().toUpperCase();

        if (cleanQuery.isEmpty()) {
            return KnowledgeChunk.SearchResponse.builder()
                    .query("")
                    .levelFilter(normLevel)
                    .latencyMs(0)
                    .results(List.of())
                    .build();
        }

        Map<Long, KnowledgeChunk.SearchResult> merged = new LinkedHashMap<>();

        // 1. Vector Search (HNSW)
        float[] vec = embeddingClient.embedQuery(cleanQuery);
        if (vec != null) {
            String vecLiteral = GeminiEmbeddingClient.toVectorLiteral(vec);
            List<KnowledgeChunk.SearchResult> vecHits = queryVectorCandidates(vecLiteral, normLevel, safeK * 3);
            for (KnowledgeChunk.SearchResult r : vecHits) {
                merged.put(r.getId(), r);
            }
        }

        // 2. Keyword / Japanese Exact Boost (chỉ chạy với Kanji hoặc từ >= 2 ký tự)
        List<String> jpTokens = extractJapaneseTokens(cleanQuery);
        for (String token : jpTokens) {
            List<KnowledgeChunk.SearchResult> kwHits = queryKeywordMatches(token, normLevel, 5);
            for (KnowledgeChunk.SearchResult hit : kwHits) {
                merged.merge(hit.getId(), hit, (existing, incoming) -> {
                    existing.setScore(Math.min(1.0, existing.getScore() + 0.12));
                    return existing;
                });
            }
        }

        // 3. Full-text boost cho từ khóa tiếng Việt / tiếng Anh
        List<KnowledgeChunk.SearchResult> ftsHits = queryFullTextMatches(cleanQuery, normLevel, 5);
        for (KnowledgeChunk.SearchResult hit : ftsHits) {
            merged.merge(hit.getId(), hit, (existing, incoming) -> {
                existing.setScore(Math.min(1.0, existing.getScore() + 0.08));
                return existing;
            });
        }

        List<KnowledgeChunk.SearchResult> sorted = merged.values().stream()
                .sorted(Comparator.comparingDouble(KnowledgeChunk.SearchResult::getScore).reversed())
                .limit(safeK)
                .toList();

        long elapsed = System.currentTimeMillis() - t0;
        log.info("🔍 RAG Search '{}' [level={}] -> {} kết quả trong {} ms", cleanQuery, normLevel, sorted.size(), elapsed);

        return KnowledgeChunk.SearchResponse.builder()
                .query(cleanQuery)
                .levelFilter(normLevel)
                .latencyMs(elapsed)
                .results(sorted)
                .build();
    }

    /** Thực thi Vector HNSW thuần (dùng cho benchmark hoặc khi đã có sẵn vector). */
    public List<KnowledgeChunk.SearchResult> queryVectorCandidates(String vecLiteral, String level, int limit) {
        String sql = level == null
                ? """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         1.0 - (embedding <=> ?::vector) AS score
                  FROM knowledge_chunks
                  WHERE embedding IS NOT NULL
                  ORDER BY embedding <=> ?::vector ASC
                  LIMIT ?
                  """
                : """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         1.0 - (embedding <=> ?::vector) AS score
                  FROM knowledge_chunks
                  WHERE embedding IS NOT NULL AND jlpt_level IN (?, 'ALL')
                  ORDER BY embedding <=> ?::vector ASC
                  LIMIT ?
                  """;

        return level == null
                ? jdbc.query(sql, (rs, i) -> mapRow(rs), vecLiteral, vecLiteral, limit)
                : jdbc.query(sql, (rs, i) -> mapRow(rs), vecLiteral, level, vecLiteral, limit);
    }

    private List<KnowledgeChunk.SearchResult> queryKeywordMatches(String token, String level, int limit) {
        String likePattern = "%" + token + "%";
        String sql = level == null
                ? """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         CASE WHEN title ILIKE ? THEN 0.68 ELSE 0.52 END AS score
                  FROM knowledge_chunks
                  WHERE title ILIKE ? OR content ILIKE ?
                  ORDER BY CASE WHEN title ILIKE ? THEN 0 ELSE 1 END, id
                  LIMIT ?
                  """
                : """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         CASE WHEN title ILIKE ? THEN 0.68 ELSE 0.52 END AS score
                  FROM knowledge_chunks
                  WHERE (title ILIKE ? OR content ILIKE ?) AND jlpt_level IN (?, 'ALL')
                  ORDER BY CASE WHEN title ILIKE ? THEN 0 ELSE 1 END, id
                  LIMIT ?
                  """;
        try {
            return level == null
                    ? jdbc.query(sql, (rs, i) -> mapRow(rs), likePattern, likePattern, likePattern, likePattern, limit)
                    : jdbc.query(sql, (rs, i) -> mapRow(rs), likePattern, likePattern, likePattern, level, likePattern, limit);
        } catch (Exception e) {
            log.debug("Keyword query failed: {}", e.getMessage());
            return List.of();
        }
    }

    private List<KnowledgeChunk.SearchResult> queryFullTextMatches(String query, String level, int limit) {
        String sql = level == null
                ? """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         0.65 AS score
                  FROM knowledge_chunks
                  WHERE to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, ''))
                        @@ plainto_tsquery('simple', ?)
                  LIMIT ?
                  """
                : """
                  SELECT id, source_type, source_id, jlpt_level, title, content, metadata::text AS metadata_json,
                         0.65 AS score
                  FROM knowledge_chunks
                  WHERE jlpt_level IN (?, 'ALL')
                    AND to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, ''))
                        @@ plainto_tsquery('simple', ?)
                  LIMIT ?
                  """;
        try {
            return level == null
                    ? jdbc.query(sql, (rs, i) -> mapRow(rs), query, limit)
                    : jdbc.query(sql, (rs, i) -> mapRow(rs), level, query, limit);
        } catch (Exception e) {
            log.debug("FTS query failed: {}", e.getMessage());
            return List.of();
        }
    }

    private List<String> extractJapaneseTokens(String text) {
        List<String> tokens = new ArrayList<>();
        Matcher m = JP_TOKEN_PATTERN.matcher(text);
        while (m.find() && tokens.size() < 3) {
            String tok = m.group().trim();
            if (!tok.isEmpty()) tokens.add(tok);
        }
        return tokens;
    }

    private KnowledgeChunk.SearchResult mapRow(java.sql.ResultSet rs) throws java.sql.SQLException {
        return KnowledgeChunk.SearchResult.builder()
                .id(rs.getLong("id"))
                .sourceType(rs.getString("source_type"))
                .sourceId(rs.getLong("source_id"))
                .jlptLevel(rs.getString("jlpt_level"))
                .title(rs.getString("title"))
                .content(rs.getString("content"))
                .metadataJson(rs.getString("metadata_json"))
                .score(rs.getDouble("score"))
                .build();
    }
}

