package com.nihongo.api.modules.ai;

import com.nihongo.api.modules.ai.assistant.service.GeminiChatClient;
import com.nihongo.api.modules.ai.assistant.service.SenseiPromptBuilder;
import com.nihongo.api.modules.ai.core.AiMetricsService;
import com.nihongo.api.modules.ai.core.AiRateLimitException;
import com.nihongo.api.modules.ai.core.AiRateLimiter;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResponse;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResult;
import com.nihongo.api.modules.ai.rag.service.KnowledgeSearchService;
import com.nihongo.api.modules.ai.rag.service.RagEvaluationService;
import com.nihongo.api.modules.translator.service.FastGeminiTranslator;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Integration Test (Phase 7): Dùng HttpServer nội bộ giả lập Gemini REST & SSE endpoints
 * để kiểm chứng FastGeminiTranslator, GeminiChatClient, Fallback 429, RateLimiter, Metrics và RAG Eval.
 */
class AiEndToEndIntegrationTest {

    private static HttpServer mockGeminiServer;
    private static String baseUrl;
    private static final AtomicInteger primaryHits = new AtomicInteger(0);

    @BeforeAll
    static void startMockServer() throws Exception {
        mockGeminiServer = HttpServer.create(new InetSocketAddress(0), 0);

        // Giả lập model-primary: lần đầu trả 429 để kiểm chứng fallback
        mockGeminiServer.createContext("/v1beta/models/model-primary:generateContent", exchange -> {
            primaryHits.incrementAndGet();
            byte[] err = "{\"error\":{\"code\":429,\"message\":\"Rate limited\"}}".getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(429, err.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(err);
            }
        });

        // Giả lập model-fallback: trả kết quả JSON thành công
        mockGeminiServer.createContext("/v1beta/models/model-fallback:generateContent", exchange -> {
            byte[] ok = """
                    {"candidates":[{"content":{"parts":[{"text":"Xin chào tiếng Nhật"}]}}]}
                    """.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, ok.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(ok);
            }
        });

        // Giả lập SSE streamGenerateContent
        mockGeminiServer.createContext("/v1beta/models/model-fallback:streamGenerateContent", exchange -> {
            String sse = """
                    data: {"candidates":[{"content":{"parts":[{"text":"Xin "}]}}]}

                    data: {"candidates":[{"content":{"parts":[{"text":"chào!"}]}}]}

                    """;
            byte[] bytes = sse.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "text/event-stream");
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        });

        mockGeminiServer.start();
        baseUrl = "http://localhost:" + mockGeminiServer.getAddress().getPort() + "/v1beta/models/";
    }

    @AfterAll
    static void stopMockServer() {
        if (mockGeminiServer != null) {
            mockGeminiServer.stop(0);
        }
    }

    @Test
    void testFastGeminiTranslator_fallbacksOn429AndStreamsSse() {
        FastGeminiTranslator translator = new FastGeminiTranslator();
        ReflectionTestUtils.setField(translator, "apiKey", "test-key");
        ReflectionTestUtils.setField(translator, "modelsConfig", "model-primary,model-fallback");
        translator.setBaseUrlForTest(baseUrl);

        String translated = translator.translate("こんにちは", "ja", "vi");
        assertEquals("Xin chào tiếng Nhật", translated);
        assertTrue(primaryHits.get() >= 1);

        List<String> chunks = new ArrayList<>();
        String streamed = translator.translateStream("こんにちは", "ja", "vi", chunks::add);
        assertEquals("Xin chào!", streamed);
        assertEquals(List.of("Xin ", "chào!"), chunks);
    }

    @Test
    void testGeminiChatClient_streamsMultiTurnSse() {
        GeminiChatClient client = new GeminiChatClient();
        ReflectionTestUtils.setField(client, "apiKey", "test-key");
        ReflectionTestUtils.setField(client, "modelsConfig", "model-fallback");
        client.setBaseUrlForTest(baseUrl);

        List<String> chunks = new ArrayList<>();
        String reply = client.streamChat(
                "System instruction",
                List.of(Map.of("role", "user", "parts", List.of(Map.of("text", "Chào Sensei")))),
                chunks::add);

        assertEquals("Xin chào!", reply);
        assertEquals(2, chunks.size());

        SenseiPromptBuilder pb = new SenseiPromptBuilder();
        String enSys = pb.buildSystemInstruction("N3", "- Profile", null, "en");
        assertTrue(enSys.contains("ALWAYS respond in English"));
        assertTrue(SenseiPromptBuilder.getInjectionRefusal("en").contains("Sorry, I am **Sensei AI**"));
    }

    @Test
    void testRateLimiter_enforcesTranslateAndChatLimits() {
        AiRateLimiter limiter = new AiRateLimiter();
        limiter.setLimitsForTest(2, 3);

        limiter.consumeTranslateLlm("user:1");
        limiter.consumeTranslateLlm("user:1");
        assertThrows(AiRateLimitException.class, () -> limiter.consumeTranslateLlm("user:1"));
        // User khác không bị ảnh hưởng
        assertDoesNotThrow(() -> limiter.consumeTranslateLlm("user:2"));

        assertEquals(2, limiter.consumeChatTurn(10L).remainingToday());
        assertEquals(1, limiter.consumeChatTurn(10L).remainingToday());
        assertEquals(0, limiter.consumeChatTurn(10L).remainingToday());
        assertThrows(AiRateLimitException.class, () -> limiter.consumeChatTurn(10L));
    }

    @Test
    void testMetricsService_computesHitRateAndPercentiles() {
        AiMetricsService metrics = new AiMetricsService();
        metrics.recordTranslate("CACHE", 2);
        metrics.recordTranslate("DICTIONARY", 18);
        metrics.recordTranslate("AI", 850);
        metrics.recordTranslate("AI", 920);
        metrics.recordChat(true, false, 1100);
        metrics.recordChat(false, false, 900);

        AiMetricsService.AiMetricsSnapshot snap = metrics.getSnapshot();
        assertEquals(4, snap.getTranslateTotal());
        assertEquals(50.0, snap.getTranslateCacheOrDictHitRatePercent());
        assertTrue(snap.getTranslateP95Ms() >= snap.getTranslateP50Ms());
        assertEquals(2, snap.getChatTotal());
        assertEquals(50.0, snap.getChatRagHitRatePercent());
    }

    @Test
    void testRagEvaluationService_30BenchmarkCases() {
        KnowledgeSearchService searchService = mock(KnowledgeSearchService.class);
        when(searchService.search(anyString(), any(), eq(5))).thenAnswer(inv -> {
            String q = inv.getArgument(0);
            String matchedContent = q; // giả lập truy xuất khớp nội dung câu hỏi
            return SearchResponse.builder()
                    .query(q)
                    .latencyMs(18)
                    .results(List.of(SearchResult.builder()
                            .id(1L)
                            .title(matchedContent)
                            .content(matchedContent)
                            .score(0.88)
                            .build()))
                    .build();
        });

        RagEvaluationService eval = new RagEvaluationService(searchService);
        RagEvaluationService.BenchmarkReport report = eval.evaluateAll();

        assertEquals(30, report.getTotalQueries());
        assertEquals(30, report.getPassedQueries());
        assertEquals(100.0, report.getAccuracyPercent());
        assertEquals(18L, report.getAvgLatencyMs());
    }
}

