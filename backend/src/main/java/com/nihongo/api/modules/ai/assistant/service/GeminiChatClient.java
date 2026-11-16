package com.nihongo.api.modules.ai.assistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.core.AiMetricsService;
import lombok.extern.slf4j.Slf4j;
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
 * Gemini client cho hội thoại multi-turn của Trợ lý Sensei AI.
 * Hỗ trợ stream SSE theo thời gian thực và fallback tự động qua danh sách model Free Tier.
 */
@Slf4j
@Component
public class GeminiChatClient {

    private String apiBaseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.chat.models:gemini-flash-lite-latest,gemini-3.1-flash-lite,gemini-2.5-flash}")
    private String modelsConfig;

    @Autowired(required = false)
    private AiMetricsService metricsService;

    public void setBaseUrlForTest(String baseUrl) {
        this.apiBaseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    }

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient http = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(6))
            .build();

    public boolean isConfigured() {
        return !getPrimaryApiKey().isBlank();
    }

    public String getPrimaryApiKey() {
        if (apiKey == null || apiKey.isBlank()) return "";
        return apiKey.split("[,;\\s]+")[0].trim();
    }

    private List<String> getModels() {
        if (modelsConfig == null || modelsConfig.isBlank()) {
            return List.of("gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-2.5-flash");
        }
        return Arrays.stream(modelsConfig.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    public String streamChat(String systemInstruction, List<Map<String, Object>> contents, Consumer<String> onChunk) {
        if (!isConfigured()) return null;

        for (String model : getModels()) {
            try {
                long t0 = System.currentTimeMillis();
                HttpResponse<Stream<String>> res = http.send(
                        buildRequest(model, "streamGenerateContent", systemInstruction, contents),
                        HttpResponse.BodyHandlers.ofLines());

                if (res.statusCode() != 200) {
                    if (res.statusCode() == 429 && metricsService != null) metricsService.recordUpstream429();
                    log.warn("⚠️ Sensei stream HTTP {} [{}]", res.statusCode(), model);
                    res.body().close();
                    continue;
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
                        } catch (Exception ignored) {}
                    });
                }
                log.info("🤖 Sensei stream hoàn tất sau {} ms [{}]", System.currentTimeMillis() - t0, model);
                return full.toString().trim();
            } catch (Exception e) {
                log.warn("⚠️ Sensei stream error [{}]: {}", model, e.getMessage());
            }
        }
        return null;
    }

    public String chat(String systemInstruction, List<Map<String, Object>> contents) {
        if (!isConfigured()) return null;

        for (String model : getModels()) {
            try {
                long t0 = System.currentTimeMillis();
                HttpResponse<String> res = http.send(
                        buildRequest(model, "generateContent", systemInstruction, contents),
                        HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

                if (res.statusCode() == 200) {
                    String out = extractText(mapper.readTree(res.body()));
                    log.info("🤖 Sensei chat hoàn tất sau {} ms [{}]", System.currentTimeMillis() - t0, model);
                    return out == null ? null : out.trim();
                }
                if (res.statusCode() == 429 && metricsService != null) metricsService.recordUpstream429();
                log.warn("⚠️ Sensei chat HTTP {} [{}]: {}", res.statusCode(), model, abbreviate(res.body()));
            } catch (Exception e) {
                log.warn("⚠️ Sensei chat error [{}]: {}", model, e.getMessage());
            }
        }
        return null;
    }

    private HttpRequest buildRequest(String model, String method, String systemInstruction,
                                     List<Map<String, Object>> contents) throws Exception {
        String url = apiBaseUrl + model + ":" + method + "?key=" + getPrimaryApiKey()
                + ("streamGenerateContent".equals(method) ? "&alt=sse" : "");

        Map<String, Object> thinkingConfig = model.contains("lite") && !model.startsWith("gemini-2")
                ? Map.of("thinkingLevel", "minimal")
                : Map.of("thinkingBudget", 0);

        Map<String, Object> body = Map.of(
                "systemInstruction", Map.of("parts", List.of(Map.of("text", systemInstruction))),
                "contents", contents,
                "generationConfig", Map.of(
                        "temperature", 0.4,
                        "maxOutputTokens", 2048,
                        "thinkingConfig", thinkingConfig
                )
        );

        return HttpRequest.newBuilder(URI.create(url))
                .header("Content-Type", "application/json; charset=utf-8")
                .timeout(Duration.ofSeconds(30))
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body), StandardCharsets.UTF_8))
                .build();
    }

    private String extractText(JsonNode root) {
        JsonNode parts = root.path("candidates").path(0).path("content").path("parts");
        if (!parts.isArray()) return null;
        StringBuilder sb = new StringBuilder();
        for (JsonNode p : parts) sb.append(p.path("text").asText(""));
        return sb.toString();
    }

    private String abbreviate(String s) {
        return s == null ? "" : (s.length() > 300 ? s.substring(0, 300) + "..." : s);
    }
}

