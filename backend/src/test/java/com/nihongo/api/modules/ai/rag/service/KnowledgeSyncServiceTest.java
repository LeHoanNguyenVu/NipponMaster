package com.nihongo.api.modules.ai.rag.service;

import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KnowledgeSyncServiceTest {

    @Mock
    private JdbcTemplate jdbc;

    @Mock
    private KnowledgeChunkBuilder chunkBuilder;

    @Mock
    private GeminiEmbeddingClient embeddingClient;

    @Test
    void testToVectorLiteral() {
        String literal = GeminiEmbeddingClient.toVectorLiteral(new float[]{0.1f, -0.25f, 0.5f});
        assertEquals("[0.1,-0.25,0.5]", literal);
        assertNull(GeminiEmbeddingClient.toVectorLiteral(null));
        assertNull(GeminiEmbeddingClient.toVectorLiteral(new float[0]));
    }

    @Test
    void testIncrementalSync_skipsUnchangedAndEmbedsOnlyNew() {
        KnowledgeChunk.Item unchanged = KnowledgeChunk.Item.builder()
                .sourceType("FAQ")
                .sourceId(1L)
                .jlptLevel("ALL")
                .title("FAQ 1")
                .content("Nội dung cũ")
                .contentHash("hash_unchanged")
                .metadataJson("{}")
                .build();

        KnowledgeChunk.Item changed = KnowledgeChunk.Item.builder()
                .sourceType("KANJI")
                .sourceId(99L)
                .jlptLevel("N5")
                .title("Kanji 日")
                .content("Chữ Kanji Nhật")
                .contentHash("hash_new")
                .metadataJson("{}")
                .build();

        when(chunkBuilder.buildAll()).thenReturn(List.of(unchanged, changed));
        doAnswer(inv -> {
            RowCallbackHandler rch = inv.getArgument(1);
            var rs = mock(java.sql.ResultSet.class);
            when(rs.getString("source_type")).thenReturn("FAQ");
            when(rs.getLong("source_id")).thenReturn(1L);
            when(rs.getString("content_hash")).thenReturn("hash_unchanged");
            rch.processRow(rs);
            return null;
        }).when(jdbc).query(contains("SELECT source_type, source_id, content_hash"), any(RowCallbackHandler.class));

        when(embeddingClient.batchEmbedDocuments(List.of(changed)))
                .thenReturn(List.of(new float[]{0.1f, 0.2f}));

        KnowledgeSyncService service = new KnowledgeSyncService(jdbc, chunkBuilder, embeddingClient);
        KnowledgeChunk.SyncReport report = service.sync(null);

        assertEquals(2, report.getTotalScanned());
        assertEquals(1, report.getSkippedUnchanged());
        assertEquals(1, report.getNewlyEmbedded());
        assertEquals(0, report.getFailedBatches());
        verify(embeddingClient, times(1)).batchEmbedDocuments(List.of(changed));
        verify(jdbc, times(1)).batchUpdate(contains("INSERT INTO knowledge_chunks"), anyList());
    }

    @Test
    void testDailyQuotaExceeded_breaksGracefully() {
        KnowledgeChunk.Item item = KnowledgeChunk.Item.builder()
                .sourceType("KANJI")
                .sourceId(101L)
                .content("Nội dung mới")
                .contentHash("hash_quota_test")
                .build();

        when(chunkBuilder.buildAll()).thenReturn(List.of(item));
        when(embeddingClient.batchEmbedDocuments(anyList()))
                .thenThrow(new GeminiEmbeddingClient.DailyQuotaExceededException("Quota exceeded"));

        KnowledgeSyncService service = new KnowledgeSyncService(jdbc, chunkBuilder, embeddingClient);
        KnowledgeChunk.SyncReport report = service.sync(null);

        assertEquals(1, report.getTotalScanned());
        assertEquals(0, report.getNewlyEmbedded());
        assertFalse(service.isSyncRunning());
    }

    @Test
    void testIsDailyQuotaExceeded_patterns() {
        assertTrue(GeminiEmbeddingClient.isDailyQuotaExceeded("Embed content requests per day limit exceeded on Free Tier."));
        assertTrue(GeminiEmbeddingClient.isDailyQuotaExceeded("EmbedContentRequestsPerDayPerUserPerProjectPerModel-FreeTier"));
        assertTrue(GeminiEmbeddingClient.isDailyQuotaExceeded("You exceeded your current quota... please retry in 70000s"));
        assertFalse(GeminiEmbeddingClient.isDailyQuotaExceeded("Rate limit 15 RPM exceeded, please retry in 2s"));
        assertFalse(GeminiEmbeddingClient.isDailyQuotaExceeded(null));
    }

    @Test
    void testBuildFaqChunks_deterministicHash() {
        KnowledgeChunkBuilder builder = new KnowledgeChunkBuilder(jdbc);
        List<KnowledgeChunk.Item> faqs = builder.buildFaqChunks();
        assertFalse(faqs.isEmpty());
        for (KnowledgeChunk.Item item : faqs) {
            assertEquals("FAQ", item.getSourceType());
            assertNotNull(item.getContentHash());
            assertEquals(64, item.getContentHash().length());
        }
    }
}

