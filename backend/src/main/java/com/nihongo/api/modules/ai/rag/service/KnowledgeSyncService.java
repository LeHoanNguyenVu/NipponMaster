package com.nihongo.api.modules.ai.rag.service;

import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Đồng bộ dữ liệu từ PostgreSQL vào bảng vector `knowledge_chunks`.
 * Hỗ trợ đồng bộ tăng dần (chỉ tạo embedding khi dữ liệu mới hoặc thay đổi content_hash)
 * để tiết kiệm tối đa quota Free Tier của Gemini API.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class KnowledgeSyncService {

    private static final int BATCH_SIZE = 20;
    private static final long BATCH_DELAY_MS = 4200L;

    private final JdbcTemplate jdbc;
    private final KnowledgeChunkBuilder chunkBuilder;
    private final GeminiEmbeddingClient embeddingClient;

    private final AtomicBoolean syncRunning = new AtomicBoolean(false);
    private final AtomicBoolean cancelRequested = new AtomicBoolean(false);

    public boolean isSyncRunning() {
        return syncRunning.get();
    }

    /** Yêu cầu dừng tiến trình đồng bộ RAG an toàn sau batch hiện tại. */
    public boolean stopSync() {
        if (syncRunning.get()) {
            cancelRequested.set(true);
            log.info("🛑 Đã nhận yêu cầu dừng đồng bộ RAG thủ công.");
            return true;
        }
        return false;
    }

    /** Đồng bộ toàn bộ hoặc theo một loại nguồn cụ thể (vd: VOCAB, KANJI, GRAMMAR_LESSON...). */
    public KnowledgeChunk.SyncReport sync(String sourceType) {
        if (!syncRunning.compareAndSet(false, true)) {
            throw new IllegalStateException("Quá trình đồng bộ RAG đang chạy, vui lòng đợi hoàn tất.");
        }
        cancelRequested.set(false);
        long start = System.currentTimeMillis();
        try {
            List<KnowledgeChunk.Item> candidates = (sourceType == null || sourceType.isBlank())
                    ? chunkBuilder.buildAll()
                    : chunkBuilder.buildByType(sourceType);

            Map<String, String> existingHashes = loadExistingHashes();
            List<KnowledgeChunk.Item> toEmbed = new ArrayList<>();
            int skipped = 0;

            for (KnowledgeChunk.Item item : candidates) {
                String key = item.getSourceType() + ":" + item.getSourceId();
                String oldHash = existingHashes.get(key);
                if (item.getContentHash().equals(oldHash)) {
                    skipped++;
                } else {
                    toEmbed.add(item);
                }
            }

            log.info("🔄 RAG Sync bắt đầu: tổng={}, không đổi={}, cần tạo embedding={}",
                    candidates.size(), skipped, toEmbed.size());

            int newlyEmbedded = 0;
            int failedBatches = 0;
            int consecutiveFailures = 0;
            Map<String, Integer> syncedByType = new LinkedHashMap<>();

            for (int i = 0; i < toEmbed.size(); i += BATCH_SIZE) {
                if (cancelRequested.get()) {
                    log.warn("🛑 RAG Sync dừng theo yêu cầu thủ công tại chunk {}/{}", i, toEmbed.size());
                    break;
                }

                List<KnowledgeChunk.Item> batch = toEmbed.subList(i, Math.min(i + BATCH_SIZE, toEmbed.size()));
                List<float[]> vectors;
                try {
                    vectors = embeddingClient.batchEmbedDocuments(batch);
                } catch (GeminiEmbeddingClient.DailyQuotaExceededException dqe) {
                    log.error("🛑 Dừng tiến trình RAG Sync do hết hạn ngạch ngày: {}", dqe.getMessage());
                    break;
                }

                if (vectors == null || vectors.size() != batch.size()) {
                    failedBatches++;
                    consecutiveFailures++;
                    log.warn("⚠️ Bỏ qua batch [{}-{}] do gọi Embedding API thất bại (lỗi liên tiếp: {})",
                            i, i + batch.size(), consecutiveFailures);
                    if (consecutiveFailures >= 5) {
                        log.error("🛑 Đã gặp 5 batch thất bại liên tiếp. Dừng tiến trình sync để bảo toàn dữ liệu.");
                        break;
                    }
                } else {
                    consecutiveFailures = 0;
                    upsertBatch(batch, vectors);
                    newlyEmbedded += batch.size();
                    for (KnowledgeChunk.Item item : batch) {
                        syncedByType.merge(item.getSourceType(), 1, Integer::sum);
                    }
                    if (newlyEmbedded % 250 == 0 || i + BATCH_SIZE >= toEmbed.size()) {
                        log.info("✅ RAG Sync tiến độ: {}/{} chunks", newlyEmbedded, toEmbed.size());
                    }
                }

                if (i + BATCH_SIZE < toEmbed.size()) {
                    try {
                        Thread.sleep(BATCH_DELAY_MS);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }

            long duration = System.currentTimeMillis() - start;
            log.info("🏁 RAG Sync hoàn tất trong {} ms (mới/cập nhật: {}, lỗi batch: {})",
                    duration, newlyEmbedded, failedBatches);

            return KnowledgeChunk.SyncReport.builder()
                    .totalScanned(candidates.size())
                    .skippedUnchanged(skipped)
                    .newlyEmbedded(newlyEmbedded)
                    .failedBatches(failedBatches)
                    .durationMs(duration)
                    .syncedByType(syncedByType)
                    .build();
        } finally {
            syncRunning.set(false);
        }
    }

    /** Đồng bộ tăng dần 1 bản ghi duy nhất khi admin thêm/sửa nội dung. */
    public boolean upsertSingle(KnowledgeChunk.Item item) {
        if (item == null || !embeddingClient.isConfigured()) return false;
        List<float[]> vectors = embeddingClient.batchEmbedDocuments(List.of(item));
        if (vectors == null || vectors.isEmpty() || vectors.get(0) == null) return false;
        upsertBatch(List.of(item), vectors);
        return true;
    }

    /** Xóa chunk khi bản ghi nguồn bị xóa. */
    public void deleteSingle(String sourceType, long sourceId) {
        jdbc.update("DELETE FROM knowledge_chunks WHERE source_type = ? AND source_id = ?", sourceType, sourceId);
    }

    public KnowledgeChunk.StatsResponse getStats() {
        boolean pgvector = false;
        try {
            Integer extCount = jdbc.queryForObject(
                    "SELECT COUNT(*) FROM pg_extension WHERE extname = 'vector'", Integer.class);
            pgvector = extCount != null && extCount > 0;
        } catch (Exception ignored) {}

        Long total = jdbc.queryForObject("SELECT COUNT(*) FROM knowledge_chunks", Long.class);
        Long embedded = jdbc.queryForObject("SELECT COUNT(*) FROM knowledge_chunks WHERE embedding IS NOT NULL", Long.class);

        Map<String, Long> byType = new LinkedHashMap<>();
        jdbc.query("SELECT source_type, COUNT(*) AS cnt FROM knowledge_chunks GROUP BY source_type ORDER BY source_type",
                rs -> {
                    byType.put(rs.getString("source_type"), rs.getLong("cnt"));
                });

        return KnowledgeChunk.StatsResponse.builder()
                .pgvectorEnabled(pgvector)
                .syncRunning(syncRunning.get())
                .totalChunks(total != null ? total : 0L)
                .embeddedChunks(embedded != null ? embedded : 0L)
                .countBySourceType(byType)
                .build();
    }

    // -------------------------------------------------------------------------

    private Map<String, String> loadExistingHashes() {
        Map<String, String> map = new HashMap<>();
        jdbc.query("SELECT source_type, source_id, content_hash FROM knowledge_chunks WHERE embedding IS NOT NULL",
                rs -> {
                    String key = rs.getString("source_type") + ":" + rs.getLong("source_id");
                    map.put(key, rs.getString("content_hash"));
                });
        return map;
    }

    private void upsertBatch(List<KnowledgeChunk.Item> items, List<float[]> vectors) {
        String sql = """
                INSERT INTO knowledge_chunks
                    (source_type, source_id, jlpt_level, title, content, content_hash, embedding, metadata, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?::vector, ?::jsonb, CURRENT_TIMESTAMP)
                ON CONFLICT (source_type, source_id) DO UPDATE SET
                    jlpt_level = EXCLUDED.jlpt_level,
                    title = EXCLUDED.title,
                    content = EXCLUDED.content,
                    content_hash = EXCLUDED.content_hash,
                    embedding = EXCLUDED.embedding,
                    metadata = EXCLUDED.metadata,
                    updated_at = CURRENT_TIMESTAMP
                """;

        List<Object[]> batchArgs = new ArrayList<>(items.size());
        for (int i = 0; i < items.size(); i++) {
            KnowledgeChunk.Item item = items.get(i);
            String vecLiteral = GeminiEmbeddingClient.toVectorLiteral(vectors.get(i));
            if (vecLiteral == null) continue;
            batchArgs.add(new Object[]{
                    item.getSourceType(),
                    item.getSourceId(),
                    item.getJlptLevel(),
                    item.getTitle(),
                    item.getContent(),
                    item.getContentHash(),
                    vecLiteral,
                    item.getMetadataJson()
            });
        }
        jdbc.batchUpdate(sql, batchArgs);
    }
}
