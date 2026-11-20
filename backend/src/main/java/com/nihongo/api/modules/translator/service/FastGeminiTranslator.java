package com.nihongo.api.modules.translator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.core.AiMetricsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Stream;

/**
 * Gemini client tối ưu cho DỊCH NHANH (Phase 1):
 * - Ưu tiên gemini-2.5-flash (tắt thinking, phản hồi ~800ms) &
 * gemini-flash-lite-latest.
 * - Hỗ trợ streaming SSE để giao diện nhận chữ đầu tiên sau ~300ms.
 * - Tự động fallback tuần tự qua danh sách model khi gặp bất kỳ lỗi gì (404,
 * 429, 5xx).
 */
@Slf4j
@Component
public class FastGeminiTranslator {

    private String apiBaseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.fast.models:gemini-flash-lite-latest,gemini-2.5-flash-lite,gemini-3.1-flash-lite-preview,gemini-2.5-flash}")
    private String modelsConfig;

    private final AiMetricsService metricsService;

    public FastGeminiTranslator() {
        this.metricsService = null;
    }

    @Autowired
    public FastGeminiTranslator(ObjectProvider<AiMetricsService> metricsServiceProvider) {
        this.metricsService = metricsServiceProvider.getIfAvailable();
    }

    public void setBaseUrlForTest(String baseUrl) {
        this.apiBaseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    }

    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * HttpClient dùng chung → giữ kết nối HTTP/2 keep-alive, tránh bắt tay TLS lặp
     * lại.
     */
    private final HttpClient http = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    public boolean isConfigured() {
        return !getPrimaryApiKey().isBlank();
    }

    public String getPrimaryApiKey() {
        if (apiKey == null || apiKey.isBlank())
            return "";
        return apiKey.split("[,;\\s]+")[0].trim();
    }

    private List<String> getModelList() {
        if (modelsConfig == null || modelsConfig.isBlank()) {
            return List.of("gemini-flash-lite-latest", "gemini-2.5-flash-lite", "gemini-3.1-flash-lite-preview",
                    "gemini-2.5-flash");
        }
        return Arrays.stream(modelsConfig.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    /** Dịch đồng bộ, trả về text thuần. Null nếu thất bại. */
    public String translate(String text, String src, String tgt) {
        if (!isConfigured()) {
            log.warn("⚠️ GEMINI_API_KEY chưa được cấu hình.");
            return null;
        }

        for (String model : getModelList()) {
            try {
                long t0 = System.currentTimeMillis();
                HttpResponse<String> res = http.send(
                        buildRequest(model, "generateContent", text, src, tgt),
                        HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

                if (res.statusCode() == 200) {
                    String out = extractText(mapper.readTree(res.body()));
                    log.info("⚡ Fast translate thành công trong {} ms [model: {}]", System.currentTimeMillis() - t0,
                            model);
                    return out == null ? null : out.trim();
                }

                if (res.statusCode() == 429 && metricsService != null) {
                    metricsService.recordUpstream429();
                }
                log.warn("⚠️ Model {} trả về HTTP {}: {}", model, res.statusCode(), abbreviate(res.body()));
                // Thử model dự phòng tiếp theo
            } catch (Exception e) {
                log.warn("⚠️ Lỗi khi gọi model {}: {}", model, e.getMessage());
            }
        }
        return null;
    }

    /**
     * Dịch dạng stream. Mỗi đoạn text mới được đẩy qua {@code onChunk}.
     * 
     * @return toàn bộ bản dịch đã ghép, hoặc null nếu thất bại.
     */
    public String translateStream(String text, String src, String tgt, Consumer<String> onChunk) {
        if (!isConfigured()) {
            log.warn("⚠️ GEMINI_API_KEY chưa được cấu hình.");
            return null;
        }

        for (String model : getModelList()) {
            try {
                HttpResponse<Stream<String>> res = http.send(
                        buildRequest(model, "streamGenerateContent", text, src, tgt),
                        HttpResponse.BodyHandlers.ofLines());

                if (res.statusCode() != 200) {
                    if (res.statusCode() == 429 && metricsService != null) {
                        metricsService.recordUpstream429();
                    }
                    log.warn("⚠️ Stream translate HTTP {} [{}]", res.statusCode(), model);
                    res.body().close();
                    continue; // Thử model tiếp theo
                }

                StringBuilder full = new StringBuilder();
                try (Stream<String> lines = res.body()) {
                    lines.filter(l -> l.startsWith("data:")).forEach(l -> {
                        try {
                            String chunk = extractText(mapper.readTree(l.substring(5).trim()));
                            if (chunk != null && !chunk.isEmpty()) {
                                full.append(chunk);
                                onChunk.accept(chunk);
                            }
                        } catch (Exception ignored) {
                            /* Bỏ qua dòng parse lỗi nhỏ */ }
                    });
                }
                return full.toString().trim();
            } catch (Exception e) {
                log.warn("⚠️ Stream translate error [{}]: {}", model, e.getMessage());
            }
        }
        return null;
    }

    private HttpRequest buildRequest(String model, String method, String text, String src, String tgt)
            throws Exception {
        String url = apiBaseUrl + model + ":" + method + "?key=" + getPrimaryApiKey()
                + ("streamGenerateContent".equals(method) ? "&alt=sse" : "");

        // Chỉ các model dòng Gemini 3 mới dùng thinkingLevel; Gemini 2.5 /
        // flash-lite-latest dùng thinkingBudget: 0
        Map<String, Object> thinkingConfig = model.startsWith("gemini-3")
                ? Map.of("thinkingLevel", "minimal")
                : Map.of("thinkingBudget", 0);

        Map<String, Object> body = Map.of(
                "systemInstruction", Map.of("parts", List.of(Map.of("text", systemPrompt(src, tgt)))),
                "contents", List.of(Map.of("role", "user", "parts", List.of(Map.of("text", text)))),
                "generationConfig", Map.of(
                        "temperature", 0.1,
                        "maxOutputTokens", 512,
                        "thinkingConfig", thinkingConfig));

        return HttpRequest.newBuilder(URI.create(url))
                .header("Content-Type", "application/json; charset=utf-8")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body), StandardCharsets.UTF_8))
                .build();
    }

    private String systemPrompt(String src, String tgt) {
        return "You are a professional translator. Translate the user's text from "
                + langName(src) + " to " + langName(tgt)
                + ". Keep meaning, tone (formal/casual) and formatting. "
                + "Output ONLY the translation, no explanations, no quotes.";
    }

    private String extractText(JsonNode root) {
        JsonNode parts = root.path("candidates").path(0).path("content").path("parts");
        if (!parts.isArray())
            return null;
        StringBuilder sb = new StringBuilder();
        for (JsonNode p : parts)
            sb.append(p.path("text").asText(""));
        return sb.toString();
    }

    private String abbreviate(String s) {
        return s == null ? "" : (s.length() > 300 ? s.substring(0, 300) + "..." : s);
    }

    private String langName(String code) {
        return switch (code == null ? "" : code) {
            case "vi" -> "Vietnamese";
            case "en" -> "English";
            case "ja" -> "Japanese";
            default -> code;
        };
    }
}
