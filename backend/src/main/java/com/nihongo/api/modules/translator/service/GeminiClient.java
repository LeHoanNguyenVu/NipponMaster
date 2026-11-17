package com.nihongo.api.modules.translator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import com.nihongo.api.modules.translator.dto.TranslateResponse.WordAnalysis;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;

/**
 * Client kết nối trực tiếp với Google Gemini AI API.
 * Hỗ trợ ép kiểu JSON có cấu trúc (Structured Outputs) để lấy trọn gói:
 * - Bản dịch tự nhiên, chuẩn xác
 * - Phiên âm Furigana chuẩn HTML <ruby>
 * - Phân tích danh sách từ vựng & âm Hán Việt
 * - Ghi chú ngữ pháp & cấp độ JLPT
 */
@Slf4j
@Component
public class GeminiClient {

    private static final String GEMINI_API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.model:gemini-flash-lite-latest}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(6))
            .build();

    public TranslateResponse translate(String text, String sourceLang, String targetLang) {
        String primaryKey = apiKey == null ? "" : apiKey.split("[,;\\s]+")[0].trim();
        if (primaryKey.isBlank()) {
            log.warn("⚠️ Chưa cấu hình GEMINI_API_KEY trong hệ thống!");
            return null;
        }

        try {
            String prompt = buildPrompt(text, sourceLang, targetLang);
            String requestBodyJson = buildRequestBody(prompt);

            List<String> candidates = new ArrayList<>();
            if (model != null && !model.isBlank())
                candidates.add(model.trim());
            for (String fb : List.of("gemini-flash-lite-latest", "gemini-2.5-flash-lite",
                    "gemini-3.1-flash-lite-preview")) {
                if (!candidates.contains(fb))
                    candidates.add(fb);
            }

            for (String candidate : candidates) {
                String url = String.format(GEMINI_API_URL_TEMPLATE, candidate, primaryKey);
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(url))
                        .header("Content-Type", "application/json; charset=utf-8")
                        .timeout(Duration.ofSeconds(15))
                        .POST(HttpRequest.BodyPublishers.ofString(requestBodyJson, StandardCharsets.UTF_8))
                        .build();

                long startTime = System.currentTimeMillis();
                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                long elapsed = System.currentTimeMillis() - startTime;

                if (response.statusCode() == 200) {
                    log.info("✅ Gemini AI phản hồi thành công sau {} ms [model: {}]", elapsed, candidate);
                    return parseGeminiResponse(response.body(), text, sourceLang, targetLang);
                }
                log.warn("⚠️ Gemini API [{}] trả về HTTP {}: {} (thời gian: {} ms)",
                        candidate, response.statusCode(), response.body(), elapsed);
            }
            return null;

        } catch (Exception e) {
            log.error("❌ Lỗi ngoại lệ khi gọi Gemini AI: {}", e.getMessage(), e);
            return null;
        }
    }

    private String buildPrompt(String text, String sourceLang, String targetLang) {
        String sourceName = getLangName(sourceLang);
        String targetName = getLangName(targetLang);

        return """
                Bạn là hệ thống dịch thuật và phân tích ngôn ngữ học chuyên sâu tiếng Nhật cho ứng dụng NipponMaster.
                Hãy dịch đoạn văn bản sau và bóc tách dữ liệu theo định dạng JSON.

                [Yêu cầu dịch]
                - Ngôn ngữ nguồn: %s (%s)
                - Ngôn ngữ đích: %s (%s)
                - Nội dung cần dịch: "%s"

                [Nguyên tắc dịch]
                1. Bản dịch tiếng Việt/Nhật phải tự nhiên, chính xác, bảo toàn sắc thái trang trọng/thân mật và ngữ cảnh.
                2. Nếu văn bản gốc có tiếng Nhật:
                   - "pronunciation": Hãy tạo chuỗi HTML kèm thẻ <ruby>Hán tự<rt>furigana</rt></ruby> cho TẤT CẢ các từ chứa Kanji trong câu tiếng Nhật. Hiragana/Katakana đứng cạnh Kanji giữ nguyên không bọc ruby sai.
                   - "detectedLevel": Dự đoán cấp độ JLPT phù hợp nhất của câu (N5, N4, N3, N2, hoặc N1). Nếu không có tiếng Nhật, trả về null.
                   - "words": Bóc tách các từ vựng chính, kèm cách đọc (reading), nghĩa (meaning), từ loại (partOfSpeech), và âm Hán Việt (sinoVietnamese nếu là Kanji).
                   - "grammarNotes": Ghi chú ngắn gọn, súc tích về cấu trúc ngữ pháp quan trọng, trợ từ hoặc sắc thái câu để người học hiểu sâu hơn.
                3. Nếu văn bản nguồn là tiếng Việt hoặc Anh và dịch sang tiếng Nhật, áp dụng tương tự các yêu cầu trên cho câu tiếng Nhật đích.
                4. Trả về DUY NHẤT định dạng JSON chuẩn theo schema sau, không bọc markdown ```json:
                {
                  "translatedText": "bản dịch chính xác",
                  "pronunciation": "<ruby>Hán tự<rt>furigana</rt></ruby>...",
                  "detectedLevel": "N5|N4|N3|N2|N1|null",
                  "grammarNotes": "giải thích ngữ pháp nếu có",
                  "words": [
                    {
                      "word": "từ",
                      "reading": "cách đọc",
                      "meaning": "nghĩa tiếng Việt",
                      "partOfSpeech": "từ loại",
                      "sinoVietnamese": "âm Hán Việt"
                    }
                  ]
                }
                """
                .formatted(sourceName, sourceLang, targetName, targetLang, text);
    }

    private String buildRequestBody(String prompt) throws Exception {
        Map<String, Object> part = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(part));
        Map<String, Object> generationConfig = Map.of(
                "responseMimeType", "application/json");

        Map<String, Object> root = Map.of(
                "contents", List.of(content),
                "generationConfig", generationConfig);

        return objectMapper.writeValueAsString(root);
    }

    private TranslateResponse parseGeminiResponse(String responseJson, String originalText, String sourceLang,
            String targetLang) {
        try {
            JsonNode root = objectMapper.readTree(responseJson);
            JsonNode candidates = root.path("candidates");
            if (candidates.isEmpty()) {
                return null;
            }

            JsonNode textNode = candidates.get(0).path("content").path("parts").get(0).path("text");
            if (textNode.isMissingNode()) {
                return null;
            }

            String innerJson = textNode.asText().trim();
            // Xử lý trường hợp Gemini có bọc markdown ```json
            if (innerJson.startsWith("```json")) {
                innerJson = innerJson.substring(7);
            }
            if (innerJson.startsWith("```")) {
                innerJson = innerJson.substring(3);
            }
            if (innerJson.endsWith("```")) {
                innerJson = innerJson.substring(0, innerJson.length() - 3);
            }
            innerJson = innerJson.trim();

            JsonNode parsed = objectMapper.readTree(innerJson);

            String translatedText = parsed.path("translatedText").asText("");
            String pronunciation = parsed.hasNonNull("pronunciation") ? parsed.path("pronunciation").asText() : null;
            String grammarNotes = parsed.hasNonNull("grammarNotes") ? parsed.path("grammarNotes").asText() : null;
            String detectedLevel = parsed.hasNonNull("detectedLevel") ? parsed.path("detectedLevel").asText() : null;

            List<WordAnalysis> words = new ArrayList<>();
            JsonNode wordsNode = parsed.path("words");
            if (wordsNode.isArray()) {
                for (JsonNode w : wordsNode) {
                    words.add(WordAnalysis.builder()
                            .word(w.path("word").asText(""))
                            .reading(w.path("reading").asText(""))
                            .meaning(w.path("meaning").asText(""))
                            .partOfSpeech(w.path("partOfSpeech").asText(""))
                            .sinoVietnamese(w.path("sinoVietnamese").asText(null))
                            .build());
                }
            }

            return TranslateResponse.builder()
                    .originalText(originalText)
                    .translatedText(translatedText)
                    .sourceLang(sourceLang)
                    .targetLang(targetLang)
                    .pronunciation(pronunciation)
                    .words(words)
                    .grammarNotes(grammarNotes)
                    .detectedLevel(detectedLevel)
                    .build();

        } catch (Exception e) {
            log.error("❌ Không thể parse JSON từ phản hồi của Gemini: {}", e.getMessage(), e);
            return null;
        }
    }

    private String getLangName(String langCode) {
        if (langCode == null)
            return "Tiếng Nhật";
        return switch (langCode.toLowerCase()) {
            case "vi" -> "Tiếng Việt";
            case "en" -> "Tiếng Anh";
            case "ja" -> "Tiếng Nhật";
            default -> langCode;
        };
    }
}
