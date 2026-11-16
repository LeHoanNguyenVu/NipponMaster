package com.nihongo.api.modules.ai.rag.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Client gọi Gemini Embedding API (miễn phí Free Tier).
 * Dùng cố định `gemini-embedding-001` (768 chiều) để đồng nhất không gian vector.
 * - Hỗ trợ nạp nhiều API key (phân cách bằng dấu phẩy) để tự xoay vòng khi hết hạn ngạch ngày.
 * - `embedQuery`: phản hồi nhanh (fail-fast khi 429 để không làm chậm chat, fallback về keyword/FTS).
 * - `batchEmbedDocuments`: tự chờ hồi quota theo phút khi gặp 429 tạm thời, và fail-fast/ngắt ngay khi chạm giới hạn ngày (Daily Quota).
 */
@Slf4j
@Component
public class GeminiEmbeddingClient {

    public static class DailyQuotaExceededException extends RuntimeException {
        public DailyQuotaExceededException(String message) {
            super(message);
        }
    }

    private static final String BASE = "https://generativelanguage.googleapis.com/v1beta/";

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final AtomicInteger currentKeyIndex = new AtomicInteger(0);

    @Value("${gemini.embedding.model:models/gemini-embedding-001}")
    private String embeddingModel;

    @Value("${gemini.embedding.dimension:768}")
    private int dimension;

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient http = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    public boolean isConfigured() {
        return !getApiKeys().isEmpty();
    }

    public List<String> getApiKeys() {
        if (apiKey == null || apiKey.isBlank()) return List.of();
        return Arrays.stream(apiKey.split("[,;\\s]+"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    public String getActiveApiKey() {
        List<String> keys = getApiKeys();
        if (keys.isEmpty()) return "";
        int idx = Math.abs(currentKeyIndex.get()) % keys.size();
        return keys.get(idx);
    }

    public boolean rotateToNextKey() {
        List<String> keys = getApiKeys();
        if (keys.size() <= 1) return false;
        int next = currentKeyIndex.incrementAndGet();
        int activeIdx = Math.abs(next) % keys.size();
        log.warn("🔄 Chuyển sang API Key dự phòng số {}/{}", activeIdx + 1, keys.size());
        return true;
    }

    public static boolean isDailyQuotaExceeded(String body) {
        if (body == null || body.isBlank()) return false;
        String lower = body.toLowerCase();
        return lower.contains("per day limit exceeded")
                || lower.contains("requestsperday")
                || (lower.contains("limit: 1000") && lower.contains("day"))
                || (lower.contains("retry in") && lower.contains("70000s"));
    }

    /** Tạo embedding cho câu hỏi tìm kiếm của người dùng (RETRIEVAL_QUERY) — fail-fast để giữ độ trễ thấp. */
    public float[] embedQuery(String text) {
        if (!isConfigured() || text == null || text.isBlank()) return null;
        try {
            Map<String, Object> body = Map.of(
                    "model", embeddingModel,
                    "content", Map.of("parts", List.of(Map.of("text", text.trim()))),
                    "taskType", "RETRIEVAL_QUERY",
                    "outputDimensionality", dimension
            );
            String jsonBody = mapper.writeValueAsString(body);
            String url = BASE + embeddingModel + ":embedContent?key=" + getActiveApiKey();
            HttpResponse<String> res = sendOnce(url, jsonBody, Duration.ofSeconds(5));
            if (res.statusCode() != 200) {
                if (isDailyQuotaExceeded(res.body()) && rotateToNextKey()) {
                    String retryUrl = BASE + embeddingModel + ":embedContent?key=" + getActiveApiKey();
                    res = sendOnce(retryUrl, jsonBody, Duration.ofSeconds(5));
                }
                if (res.statusCode() != 200) {
                    log.warn("embedQuery HTTP {} (fallback sang FTS/Keyword)", res.statusCode());
                    return null;
                }
            }
            return parseEmbeddingArray(mapper.readTree(res.body()).path("embedding").path("values"));
        } catch (Exception e) {
            log.warn("embedQuery error: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Tạo embedding theo lô cho tài liệu RAG (RETRIEVAL_DOCUMENT).
     * Chịu tải Free Tier RPM/TPM bằng retry backoff khi gặp 429 tạm thời,
     * tự động xoay API key khi một key hết hạn ngạch ngày hoặc fail-fast khi hết toàn bộ keys.
     */
    public List<float[]> batchEmbedDocuments(List<KnowledgeChunk.Item> items) {
        if (!isConfigured() || items == null || items.isEmpty()) return null;
        try {
            List<Map<String, Object>> requests = new ArrayList<>(items.size());
            for (KnowledgeChunk.Item item : items) {
                String safeTitle = item.getTitle() != null && item.getTitle().length() > 150
                        ? item.getTitle().substring(0, 150)
                        : (item.getTitle() == null ? "" : item.getTitle());
                requests.add(Map.of(
                        "model", embeddingModel,
                        "content", Map.of("parts", List.of(Map.of("text", item.getContent()))),
                        "taskType", "RETRIEVAL_DOCUMENT",
                        "title", safeTitle,
                        "outputDimensionality", dimension
                ));
            }
            Map<String, Object> body = Map.of("requests", requests);
            String jsonBody = mapper.writeValueAsString(body);

            List<String> keys = getApiKeys();
            int totalKeys = Math.max(1, keys.size());
            HttpResponse<String> res = null;

            for (int k = 0; k < totalKeys; k++) {
                String url = BASE + embeddingModel + ":batchEmbedContents?key=" + getActiveApiKey();
                res = sendBatchWithRateLimitBackoff(url, jsonBody);

                if (res != null && res.statusCode() == 200) {
                    break;
                }

                if (res != null && res.statusCode() == 401) {
                    log.warn("⚠️ API Key trả về 401 Unauthorized. Tự động chuyển sang key dự phòng tiếp theo...");
                    rotateToNextKey();
                    continue;
                }

                if (res != null && isDailyQuotaExceeded(res.body())) {
                    if (rotateToNextKey()) {
                        log.info("Chuyển API key do hết hạn ngạch ngày...");
                        continue;
                    } else {
                        log.error("🛑 Gemini Embedding API đã hết hạn mức trong ngày (Daily Quota 1.000 requests/ngày).");
                        throw new DailyQuotaExceededException("Hạn mức embedding miễn phí trong ngày (1.000 requests/ngày) của Google Gemini API đã hết. Hãy đợi Google reset vào ngày mai hoặc bổ sung thêm API key dự phòng.");
                    }
                }

                // Nếu gặp HTTP 429 (vượt ngưỡng 15 RPM tạm thời), tự động xoay sang key kế tiếp ngay lập tức
                if (res != null && res.statusCode() == 429) {
                    if (rotateToNextKey()) {
                        log.info("Key hiện tại chạm ngưỡng RPM, chuyển sang key dự phòng để chạy tiếp ngay...");
                        continue;
                    }
                }
            }

            if (res == null || res.statusCode() != 200) {
                log.warn("batchEmbedDocuments thất bại: HTTP {} - {}",
                        res == null ? -1 : res.statusCode(),
                        res == null ? "" : abbreviate(res.body()));
                return null;
            }

            JsonNode embeddingsNode = mapper.readTree(res.body()).path("embeddings");
            if (!embeddingsNode.isArray() || embeddingsNode.size() != items.size()) {
                log.warn("Số lượng embedding trả về không khớp: expected={}, actual={}",
                        items.size(), embeddingsNode.size());
                return null;
            }

            List<float[]> vectors = new ArrayList<>(items.size());
            for (JsonNode emb : embeddingsNode) {
                vectors.add(parseEmbeddingArray(emb.path("values")));
            }
            return vectors;
        } catch (DailyQuotaExceededException dqe) {
            throw dqe;
        } catch (Exception e) {
            log.error("Lỗi batchEmbedDocuments: {}", e.getMessage());
            return null;
        }
    }

    /** Chuyển float[] thành chuỗi literal chuẩn pgvector: "[0.123,-0.456,...]". */
    public static String toVectorLiteral(float[] vec) {
        if (vec == null || vec.length == 0) return null;
        StringBuilder sb = new StringBuilder(vec.length * 10);
        sb.append('[');
        for (int i = 0; i < vec.length; i++) {
            if (i > 0) sb.append(',');
            sb.append(vec[i]);
        }
        sb.append(']');
        return sb.toString();
    }

    private HttpResponse<String> sendOnce(String url, String jsonBody, Duration timeout) throws Exception {
        HttpRequest req = HttpRequest.newBuilder(URI.create(url))
                .header("Content-Type", "application/json; charset=utf-8")
                .timeout(timeout)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                .build();
        return http.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private HttpResponse<String> sendBatchWithRateLimitBackoff(String url, String jsonBody) throws Exception {
        long[] backoffsMs = {0L, 62_000L, 65_000L};
        HttpResponse<String> lastRes = null;
        for (int attempt = 0; attempt < backoffsMs.length; attempt++) {
            if (backoffsMs[attempt] > 0) {
                Thread.sleep(backoffsMs[attempt]);
            }
            lastRes = sendOnce(url, jsonBody, Duration.ofSeconds(30));
            if (lastRes.statusCode() == 200) return lastRes;

            // Nếu gặp lỗi 401 Unauthorized (key sai), ngắt ngay không chờ backoff
            if (lastRes.statusCode() == 401) {
                log.warn("⚠️ Gemini Embedding API trả về 401 Unauthorized.");
                return lastRes;
            }

            // Nếu gặp lỗi daily quota, ngắt ngay lập tức, không chờ hồi 60s
            if (isDailyQuotaExceeded(lastRes.body())) {
                log.warn("🛑 Gemini Embedding API báo hết hạn mức ngày (Daily Quota). Dừng chờ hồi phút.");
                return lastRes;
            }

            if (lastRes.statusCode() != 429 && lastRes.statusCode() < 500) return lastRes;
            log.warn("Gemini Batch Embedding HTTP {} (lần {}/{}), chờ hồi quota theo phút...",
                    lastRes.statusCode(), attempt + 1, backoffsMs.length);
        }
        return lastRes;
    }

    private float[] parseEmbeddingArray(JsonNode valuesNode) {
        if (!valuesNode.isArray() || valuesNode.isEmpty()) return null;
        float[] vec = new float[valuesNode.size()];
        for (int i = 0; i < valuesNode.size(); i++) {
            vec[i] = (float) valuesNode.get(i).asDouble();
        }
        return vec;
    }

    private String abbreviate(String s) {
        return s == null ? "" : (s.length() > 300 ? s.substring(0, 300) + "..." : s);
    }
}
