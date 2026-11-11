package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TranslationServiceTest {

    @Mock
    private GeminiClient geminiClient;

    @Mock
    private KanjiRepository kanjiRepository;

    private TranslationCache translationCache;
    private TranslationService translationService;

    @BeforeEach
    void setUp() {
        translationCache = new TranslationCache();
        translationService = new TranslationServiceImpl(geminiClient, translationCache, kanjiRepository);
    }

    @Test
    void testTranslate_callsGeminiAndCachesResult() {
        TranslateRequest req = new TranslateRequest();
        req.setText("こんにちは");
        req.setSourceLang("ja");
        req.setTargetLang("vi");

        TranslateResponse mockGemini = TranslateResponse.builder()
                .originalText("こんにちは")
                .translatedText("Xin chào")
                .sourceLang("ja")
                .targetLang("vi")
                .pronunciation("こんにちは")
                .words(List.of())
                .build();

        when(geminiClient.translate("こんにちは", "ja", "vi")).thenReturn(mockGemini);

        // Lần 1: Gọi Gemini
        TranslateResponse res1 = translationService.translate(req);
        assertNotNull(res1);
        assertEquals("Xin chào", res1.getTranslatedText());
        verify(geminiClient, times(1)).translate("こんにちは", "ja", "vi");

        // Lần 2: Phải lấy từ Cache (Gemini không bị gọi lại)
        TranslateResponse res2 = translationService.translate(req);
        assertNotNull(res2);
        assertEquals("Xin chào", res2.getTranslatedText());
        verify(geminiClient, times(1)).translate("こんにちは", "ja", "vi"); // Vẫn là 1 lần
    }

    @Test
    void testTranslate_emptyInput_returnsEmptyResponseWithoutCallingGemini() {
        TranslateRequest req = new TranslateRequest();
        req.setText("   ");

        TranslateResponse res = translationService.translate(req);
        assertNotNull(res);
        assertEquals("", res.getTranslatedText());
        verify(geminiClient, never()).translate(anyString(), anyString(), anyString());
    }

    @Test
    void testTranslate_geminiFails_usesFallbackDictionary() {
        TranslateRequest req = new TranslateRequest();
        req.setText("ありがとう");
        req.setSourceLang("ja");
        req.setTargetLang("vi");

        when(geminiClient.translate("ありがとう", "ja", "vi")).thenReturn(null);

        TranslateResponse res = translationService.translate(req);
        assertNotNull(res);
        assertEquals("Cảm ơn bạn", res.getTranslatedText());
    }
}

