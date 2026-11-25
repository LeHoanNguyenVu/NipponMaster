package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.storage.StorageService;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AudioGenerationResultDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.SentenceDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionAudioRow;
import com.nihongo.api.modules.reading.article.service.ReadingTtsService.SynthesizedAudio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReadingTtsServiceTest {

    @Mock
    private ReadingArticleRepository repository;

    @Mock
    private StorageService storageService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void pcmToWav_producesValidRiffHeaderAndAccurateDuration() throws Exception {
        // 1 giây PCM 24kHz 16-bit mono = 48.000 bytes
        byte[] pcm = new byte[48000];
        byte[] wav = ReadingTtsService.pcmToWav(pcm, 24000, 1, 16);

        assertEquals(48044, wav.length);
        assertEquals("RIFF", new String(wav, 0, 4, StandardCharsets.US_ASCII));
        assertEquals("WAVE", new String(wav, 8, 4, StandardCharsets.US_ASCII));
        assertEquals(1000, ReadingTtsService.calculatePcmDurationMs(pcm.length, 24000, 1, 16));
        assertEquals("articles/42/N3/2.wav", ReadingTtsService.buildStoragePath(42L, "n3", 2));
    }

    @Test
    void generateAudioForVersion_uploadsExactPathsAndUpdatesJsonbToReady() throws Exception {
        ReadingTtsService service = new ReadingTtsService(repository, storageService, objectMapper) {
            @Override
            protected SynthesizedAudio synthesizeSentenceAudio(String sentenceText, String voiceName) {
                return new SynthesizedAudio(new byte[]{1, 2, 3, 4}, 2500);
            }
        };

        List<SentenceDto> sentences = List.of(
                SentenceDto.builder().idx(0).text("今日はいい天気です。").build(),
                SentenceDto.builder().idx(1).text("公園へ行きました。").build()
        );
        when(repository.findVersionForAudio(10L)).thenReturn(
                new VersionAudioRow(10L, 5L, "N5", "Kore", "PENDING", sentences)
        );
        when(storageService.uploadPublicFile(eq("reading-audio"), anyString(), any(byte[].class), eq("audio/wav")))
                .thenAnswer(inv -> "https://cdn.example/reading-audio/" + inv.getArgument(1));

        AudioGenerationResultDto res = service.generateAudioForVersion(10L, null, false);

        assertEquals("READY", res.getAudioStatus());
        assertEquals("Kore", res.getVoiceName());
        assertEquals(2, res.getReadySentences());
        assertEquals(0, res.getFailedSentences());
        assertEquals(5000L, res.getTotalDurationMs());

        verify(storageService).uploadPublicFile(eq("reading-audio"), eq("articles/5/N5/0.wav"), any(byte[].class), eq("audio/wav"));
        verify(storageService).uploadPublicFile(eq("reading-audio"), eq("articles/5/N5/1.wav"), any(byte[].class), eq("audio/wav"));

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<SentenceDto>> sentCaptor = ArgumentCaptor.forClass(List.class);
        verify(repository).updateVersionAudio(eq(10L), sentCaptor.capture(), eq("Kore"), eq("READY"));
        assertEquals("https://cdn.example/reading-audio/articles/5/N5/0.wav", sentCaptor.getValue().get(0).getAudioUrl());
        assertEquals(2500, sentCaptor.getValue().get(0).getDurationMs());
    }

    @Test
    void generateAudioForVersion_partialFailureSavesProgressAndRetryOnlyGeneratesMissing() throws Exception {
        AtomicInteger calls = new AtomicInteger(0);
        ReadingTtsService service = new ReadingTtsService(repository, storageService, objectMapper) {
            @Override
            protected SynthesizedAudio synthesizeSentenceAudio(String sentenceText, String voiceName) throws IOException {
                int c = calls.incrementAndGet();
                // Lần chạy 1: câu idx=1 bị lỗi TTS
                if (c == 2 && sentenceText.contains("二番目")) {
                    throw new IOException("Gemini 429 rate limited");
                }
                return new SynthesizedAudio(new byte[]{9, 8, 7}, 1800);
            }
        };

        List<SentenceDto> sentences = List.of(
                SentenceDto.builder().idx(0).text("一番目の文です。").build(),
                SentenceDto.builder().idx(1).text("二番目の文です。").build(),
                SentenceDto.builder().idx(2).text("三番目の文です。").build()
        );
        when(repository.findVersionForAudio(20L)).thenReturn(
                new VersionAudioRow(20L, 7L, "N3", "Puck", "PENDING", sentences)
        );
        when(storageService.uploadPublicFile(eq("reading-audio"), anyString(), any(byte[].class), eq("audio/wav")))
                .thenAnswer(inv -> "https://cdn.example/reading-audio/" + inv.getArgument(1));

        // Lần 1: câu 1 lỗi -> câu 0 và 2 vẫn lưu audioUrl, trạng thái FAILED
        AudioGenerationResultDto first = service.generateAudioForVersion(20L, null, false);
        assertEquals("FAILED", first.getAudioStatus());
        assertEquals(2, first.getReadySentences());
        assertEquals(1, first.getFailedSentences());
        assertNotNull(sentences.get(0).getAudioUrl());
        assertNull(sentences.get(1).getAudioUrl());
        assertNotNull(sentences.get(2).getAudioUrl());
        verify(repository).updateVersionAudio(eq(20L), anyList(), eq("Puck"), eq("FAILED"));
        assertEquals(3, calls.get());

        // Lần 2 (force=false): CHỈ sinh câu 1 còn thiếu -> tổng calls chỉ tăng thêm +1 (= 4) và chuyển READY
        AudioGenerationResultDto retry = service.generateAudioForVersion(20L, null, false);
        assertEquals("READY", retry.getAudioStatus());
        assertEquals(3, retry.getReadySentences());
        assertEquals(0, retry.getFailedSentences());
        assertEquals(4, calls.get(), "Retry phải bỏ qua 2 câu đã có audioUrl và chỉ gọi TTS 1 lần cho câu thiếu");
        assertNotNull(sentences.get(1).getAudioUrl());
        verify(repository).updateVersionAudio(eq(20L), anyList(), eq("Puck"), eq("READY"));
    }

    @Test
    void generateAudioForVersion_voiceOverrideValidatesAndRegeneratesAll() throws Exception {
        AtomicInteger calls = new AtomicInteger(0);
        ReadingTtsService service = new ReadingTtsService(repository, storageService, objectMapper) {
            @Override
            protected SynthesizedAudio synthesizeSentenceAudio(String sentenceText, String voiceName) {
                assertEquals("Kore", voiceName);
                calls.incrementAndGet();
                return new SynthesizedAudio(new byte[]{1, 2}, 1500);
            }
        };

        List<SentenceDto> sentences = List.of(
                SentenceDto.builder().idx(0).text("文一。").audioUrl("https://old/0.wav").durationMs(1200).build(),
                SentenceDto.builder().idx(1).text("文二。").audioUrl("https://old/1.wav").durationMs(1200).build()
        );
        when(repository.findVersionForAudio(30L)).thenReturn(
                new VersionAudioRow(30L, 9L, "N1", "Puck", "READY", sentences)
        );
        when(storageService.uploadPublicFile(eq("reading-audio"), anyString(), any(byte[].class), eq("audio/wav")))
                .thenAnswer(inv -> "https://cdn.example/reading-audio/" + inv.getArgument(1));

        // Đổi giọng từ Puck -> Kore bắt buộc sinh lại toàn bộ câu
        AudioGenerationResultDto res = service.generateAudioForVersion(30L, "Kore", false);
        assertEquals("Kore", res.getVoiceName());
        assertEquals("READY", res.getAudioStatus());
        assertEquals(2, calls.get());

        // Giọng không hợp lệ bị chặn
        assertThrows(IllegalArgumentException.class, () -> service.generateAudioForVersion(30L, "InvalidVoice", false));
    }

    @Test
    void parseTtsModels_andBuildPrompt_handlesGemini38WithoutDirectorPrefix() {
        List<String> models = ReadingTtsService.parseTtsModels("gemini-3.1-flash-tts-preview, gemini-3.8-flash-lite-tts");
        assertEquals(List.of("gemini-3.1-flash-tts-preview", "gemini-3.8-flash-lite-tts"), models);
        assertEquals("こんにちは。", ReadingTtsService.buildTtsPrompt("gemini-3.8-flash-lite-tts", "  こんにちは。 "));
        assertTrue(ReadingTtsService.buildTtsPrompt("gemini-3.1-flash-tts-preview", "こんにちは。").endsWith("こんにちは。"));
        assertTrue(ReadingTtsService.buildTtsPrompt("gemini-3.1-flash-tts-preview", "こんにちは。").length() > "こんにちは。".length());
    }
}
