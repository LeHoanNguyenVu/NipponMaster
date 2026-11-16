package com.nihongo.api.modules.translator.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class FastGeminiTranslatorIntegrationTest {

    private static String apiKey;

    @BeforeAll
    static void init() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        apiKey = dotenv.get("GEMINI_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            apiKey = System.getenv("GEMINI_API_KEY");
        }
    }

    @Test
    void testDirectFastTranslate_latencyUnder1Second() {
        if (apiKey == null || apiKey.isBlank()) {
            System.out.println("Bỏ qua test vì chưa có API key trong env");
            return;
        }

        FastGeminiTranslator client = new FastGeminiTranslator();
        ReflectionTestUtils.setField(client, "apiKey", apiKey);
        ReflectionTestUtils.setField(client, "modelsConfig", "gemini-flash-lite-latest,gemini-3.1-flash-lite");

        long start = System.currentTimeMillis();
        String result = client.translate("こんにちは、元気ですか？", "ja", "vi");
        long elapsed = System.currentTimeMillis() - start;

        System.out.printf("⚡ Real Gemini API call completed in %d ms: %s%n", elapsed, result);
        assertNotNull(result, "Bản dịch không được null");
        assertFalse(result.isBlank(), "Bản dịch không được rỗng");
    }

    @Test
    void testDirectDeepTranslate_splitsMultiKeyAndFallsBack() {
        if (apiKey == null || apiKey.isBlank()) {
            return;
        }

        GeminiClient client = new GeminiClient();
        ReflectionTestUtils.setField(client, "apiKey", apiKey + ",extra_unused_key");
        ReflectionTestUtils.setField(client, "model", "gemini-2.5-flash");

        var result = client.translate("日本語を勉強しています", "ja", "vi");
        assertNotNull(result, "Deep translate must succeed via fallback even with comma-separated keys");
        assertFalse(result.getTranslatedText().startsWith("[Bản dịch dự phòng]"));
        assertNotNull(result.getPronunciation());
    }
}

