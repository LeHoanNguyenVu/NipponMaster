package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.kanji.entity.KanjiChapterVocab;
import com.nihongo.api.modules.kanji.repository.KanjiChapterVocabRepository;
import com.nihongo.api.modules.translator.dto.FastTranslateResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FastTranslationServiceTest {

    @Mock
    private FastGeminiTranslator gemini;

    @Mock
    private KanjiChapterVocabRepository vocabRepository;

    private FastTranslationService service;

    @BeforeEach
    void setUp() {
        service = new FastTranslationService(gemini, vocabRepository);
    }

    @Test
    void testLanguageDetector() {
        assertEquals("ja", LanguageDetector.detect("こんにちは"));
        assertEquals("ja", LanguageDetector.detect("日本語の勉強"));
        assertEquals("vi", LanguageDetector.detect("Hôm nay trời rất đẹp"));
        assertEquals("vi", LanguageDetector.detect("Tôi đang học tiếng Nhật"));
        assertEquals("en", LanguageDetector.detect("Hello world this is a test"));
    }

    @Test
    void testDictionaryLookup_hitsBeforeAI() {
        KanjiChapterVocab mockVocab = new KanjiChapterVocab();
        mockVocab.setWord("先生");
        mockVocab.setMeaningVi("Thầy cô, giáo viên");

        when(vocabRepository.findFirstByWord("先生")).thenReturn(Optional.of(mockVocab));

        FastTranslateResponse res = service.translate("先生", "ja", "vi");

        assertNotNull(res);
        assertEquals("DICTIONARY", res.getSource());
        assertEquals("Thầy cô, giáo viên", res.getTranslatedText());
        verify(gemini, never()).translate(anyString(), anyString(), anyString());
    }

    @Test
    void testAICallAndCaching() {
        when(vocabRepository.findFirstByWord(anyString())).thenReturn(Optional.empty());
        when(vocabRepository.findFirstByReading(anyString())).thenReturn(Optional.empty());
        when(gemini.translate("これはペンです", "ja", "vi")).thenReturn("Đây là cái bút.");

        // Lần 1: Gọi AI
        FastTranslateResponse res1 = service.translate("これはペンです", "ja", "vi");
        assertNotNull(res1);
        assertEquals("AI", res1.getSource());
        assertEquals("Đây là cái bút.", res1.getTranslatedText());
        verify(gemini, times(1)).translate("これはペンです", "ja", "vi");

        // Lần 2: Phải trúng cache (<1ms) và không gọi lại AI
        FastTranslateResponse res2 = service.translate("これはペンです", "ja", "vi");
        assertNotNull(res2);
        assertEquals("CACHE", res2.getSource());
        assertEquals("Đây là cái bút.", res2.getTranslatedText());
        verify(gemini, times(1)).translate("これはペンです", "ja", "vi"); // Vẫn là 1 lần duy nhất
    }

    @Test
    void testStreamCallback() {
        when(vocabRepository.findFirstByWord(anyString())).thenReturn(Optional.empty());
        when(vocabRepository.findFirstByReading(anyString())).thenReturn(Optional.empty());

        doAnswer(invocation -> {
            java.util.function.Consumer<String> consumer = invocation.getArgument(3);
            consumer.accept("Xin ");
            consumer.accept("chào");
            return "Xin chào";
        }).when(gemini).translateStream(eq("こんにちは"), eq("ja"), eq("vi"), any());

        List<String> chunks = new ArrayList<>();
        FastTranslateResponse res = service.translateStream("こんにちは", "ja", "vi", chunks::add);

        assertNotNull(res);
        assertEquals("AI", res.getSource());
        assertEquals("Xin chào", res.getTranslatedText());
        assertEquals(List.of("Xin ", "chào"), chunks);
    }
}

