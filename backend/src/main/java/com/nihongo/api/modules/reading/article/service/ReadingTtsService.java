package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.storage.StorageService;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AudioGenerationResultDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.SentenceDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionAudioRow;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Pipeline sinh audio từng câu bằng Gemini 2.5 Flash TTS (gemini-2.5-flash-preview-tts):
 * - Dùng 1 trong 2 giọng phát thanh viên đã chốt: Kore (Nữ) hoặc Puck (Nam).
 * - Đóng gói PCM 24kHz 16-bit mono -> file WAV hợp lệ, tính durationMs.
 * - Upload lên Supabase bucket reading-audio tại articles/{articleId}/{jlptLevel}/{idx}.wav.
 * - Bền bỉ với lỗi cục bộ: nếu 1 câu lỗi vẫn lưu các câu thành công (audio_status = FAILED);
 *   chạy lại (force=false) chỉ sinh bù các câu thiếu audioUrl.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReadingTtsService {

    private static final String GEMINI_TTS_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";
    private static final String NEWS_ANCHOR_PREFIX = "ニュースキャスターのように、自然で聞き取りやすい日本語で読んでください: ";
    private static final Set<String> VALID_VOICES = Set.of("Kore", "Puck");
    private static final int PCM_SAMPLE_RATE = 24000;
    private static final int PCM_CHANNELS = 1;
    private static final int PCM_BITS_PER_SAMPLE = 16;

    private final ReadingArticleRepository repository;
    private final StorageService storageService;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key:}")
    private String apiKeyConfig;

    @Value("${reading.audio.bucket:reading-audio}")
    private String audioBucket = "reading-audio";

    @Value("${reading.audio.tts-model:gemini-2.5-flash-preview-tts}")
    private String ttsModel = "gemini-2.5-flash-preview-tts";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    private final ExecutorService asyncExecutor = Executors.newFixedThreadPool(2, r -> {
        Thread t = new Thread(r, "reading-tts-worker");
        t.setDaemon(true);
        return t;
    });

    @PreDestroy
    public void shutdown() {
        asyncExecutor.shutdownNow();
    }

    /**
     * Kích hoạt sinh audio bất đồng bộ cho toàn bộ phiên bản của bài đọc sau khi Admin bấm publish.
     */
    public void generateAudioForArticleAsync(Long articleId) {
        List<Long> versionIds = repository.findVersionIdsByArticleId(articleId);
        if (versionIds.isEmpty()) return;
        asyncExecutor.submit(() -> {
            for (Long versionId : versionIds) {
                try {
                    AudioGenerationResultDto res = generateAudioForVersion(versionId, null, false);
                    log.info("Auto-TTS sau publish hoàn tất: articleId={}, versionId={}, level={}, voice={}, status={} ({}/{})",
                            articleId, versionId, res.getJlptLevel(), res.getVoiceName(),
                            res.getAudioStatus(), res.getReadySentences(), res.getTotalSentences());
                } catch (Exception e) {
                    log.warn("Auto-TTS sau publish lỗi cho versionId={}: {}", versionId, e.getMessage());
                }
            }
        });
    }

    /**
     * Sinh (hoặc sinh bù các câu thiếu) audio từng câu cho 1 phiên bản bài đọc.
     *
     * @param versionId     ID phiên bản bài đọc
     * @param voiceOverride Tùy chọn đổi giọng ("Kore" hoặc "Puck"); nếu đổi giọng sẽ buộc sinh lại toàn bộ câu để đồng nhất
     * @param force         true = sinh lại toàn bộ câu; false = bỏ qua câu đã có audioUrl
     */
    public AudioGenerationResultDto generateAudioForVersion(Long versionId, String voiceOverride, boolean force) {
        VersionAudioRow version = repository.findVersionForAudio(versionId);
        String voice = resolveVoice(voiceOverride, version.voiceName());
        boolean voiceChanged = voiceOverride != null && !voiceOverride.isBlank() && !voice.equals(version.voiceName());
        boolean regenerateAll = force || voiceChanged;

        List<SentenceDto> sentences = new ArrayList<>(version.sentences());
        int readyCount = 0;
        int failedCount = 0;
        long totalDurationMs = 0;

        for (int i = 0; i < sentences.size(); i++) {
            SentenceDto s = sentences.get(i);
            int idx = s.getIdx();

            if (!regenerateAll && s.getAudioUrl() != null && !s.getAudioUrl().isBlank()) {
                readyCount++;
                totalDurationMs += (s.getDurationMs() != null ? s.getDurationMs() : 0);
                continue;
            }

            try {
                SynthesizedAudio audio = synthesizeSentenceAudio(s.getText(), voice);
                String storagePath = buildStoragePath(version.articleId(), version.jlptLevel(), idx);
                String publicUrl = storageService.uploadPublicFile(audioBucket, storagePath, audio.wavBytes(), "audio/wav");

                s.setAudioUrl(publicUrl);
                s.setDurationMs(audio.durationMs());
                readyCount++;
                totalDurationMs += audio.durationMs();
            } catch (Exception e) {
                failedCount++;
                log.warn("TTS thất bại cho versionId={} sentence idx={}: {}", versionId, idx, e.getMessage());
            }
        }

        String finalStatus = (failedCount == 0 && !sentences.isEmpty()) ? "READY" : "FAILED";
        repository.updateVersionAudio(versionId, sentences, voice, finalStatus);

        return AudioGenerationResultDto.builder()
                .versionId(versionId)
                .articleId(version.articleId())
                .jlptLevel(version.jlptLevel())
                .voiceName(voice)
                .audioStatus(finalStatus)
                .totalSentences(sentences.size())
                .readySentences(readyCount)
                .failedSentences(failedCount)
                .totalDurationMs(totalDurationMs)
                .build();
    }

    public static String buildStoragePath(Long articleId, String jlptLevel, int sentenceIdx) {
        String safeLevel = jlptLevel == null ? "N3" : jlptLevel.trim().toUpperCase(Locale.ROOT);
        return String.format("articles/%d/%s/%d.wav", articleId, safeLevel, sentenceIdx);
    }

    protected SynthesizedAudio synthesizeSentenceAudio(String sentenceText, String voiceName) throws IOException {
        if (sentenceText == null || sentenceText.isBlank()) {
            throw new IllegalArgumentException("Câu cần đọc TTS không được rỗng");
        }
        List<String> keys = getApiKeys();
        if (keys.isEmpty()) {
            throw new IllegalStateException("Chưa cấu hình GEMINI_API_KEY cho ReadingTtsService");
        }

        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", NEWS_ANCHOR_PREFIX + sentenceText.trim()))
                )),
                "generationConfig", Map.of(
                        "responseModalities", List.of("AUDIO"),
                        "speechConfig", Map.of(
                                "voiceConfig", Map.of(
                                        "prebuiltVoiceConfig", Map.of("voiceName", voiceName)
                                )
                        )
                )
        );
        String payloadJson = objectMapper.writeValueAsString(body);
        String lastError = "unknown";

        for (int attempt = 1; attempt <= 2; attempt++) {
            for (String key : keys) {
                try {
                    String url = String.format(GEMINI_TTS_URL_TEMPLATE, ttsModel, key);
                    HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                            .header("Content-Type", "application/json; charset=utf-8")
                            .timeout(Duration.ofSeconds(45))
                            .POST(HttpRequest.BodyPublishers.ofString(payloadJson, StandardCharsets.UTF_8))
                            .build();

                    HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                    if (response.statusCode() == 200) {
                        return extractAudioFromGeminiResponse(response.body());
                    }
                    lastError = "HTTP " + response.statusCode();
                    log.warn("Gemini TTS [voice={}, attempt={}] trả về HTTP {}", voiceName, attempt, response.statusCode());
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new IOException("Bị gián đoạn khi gọi Gemini TTS", ie);
                } catch (Exception e) {
                    lastError = e.getMessage();
                    log.warn("Gemini TTS lỗi [voice={}, attempt={}]: {}", voiceName, attempt, e.getMessage());
                }
            }
            if (attempt < 2) {
                try {
                    Thread.sleep(1500L * attempt);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new IOException("Bị gián đoạn khi backoff Gemini TTS", ie);
                }
            }
        }
        throw new IOException("Không thể sinh audio từ Gemini TTS sau khi xoay vòng key (" + lastError + ")");
    }

    private SynthesizedAudio extractAudioFromGeminiResponse(String responseBody) throws IOException {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode parts = root.path("candidates").path(0).path("content").path("parts");
        if (!parts.isArray() || parts.isEmpty()) {
            throw new IOException("Phản hồi Gemini TTS không có audio parts");
        }
        JsonNode inline = parts.get(0).path("inlineData");
        String b64 = inline.path("data").asText("");
        String mime = inline.path("mimeType").asText("audio/L16;codec=pcm;rate=24000");
        if (b64.isBlank()) {
            throw new IOException("Phản hồi Gemini TTS thiếu inlineData.data");
        }

        byte[] raw = Base64.getDecoder().decode(b64);
        if (mime.toLowerCase(Locale.ROOT).contains("l16") || mime.toLowerCase(Locale.ROOT).contains("pcm")) {
            byte[] wav = pcmToWav(raw, PCM_SAMPLE_RATE, PCM_CHANNELS, PCM_BITS_PER_SAMPLE);
            int durationMs = calculatePcmDurationMs(raw.length, PCM_SAMPLE_RATE, PCM_CHANNELS, PCM_BITS_PER_SAMPLE);
            return new SynthesizedAudio(wav, durationMs);
        }
        // Trường hợp model trả sẵn định dạng WAV/container
        int fallbackDurationMs = Math.max(500, calculatePcmDurationMs(Math.max(0, raw.length - 44), PCM_SAMPLE_RATE, PCM_CHANNELS, PCM_BITS_PER_SAMPLE));
        return new SynthesizedAudio(raw, fallbackDurationMs);
    }

    public static byte[] pcmToWav(byte[] pcmBytes, int sampleRate, int channels, int bitsPerSample) throws IOException {
        int byteRate = sampleRate * channels * bitsPerSample / 8;
        int blockAlign = channels * bitsPerSample / 8;
        int dataSize = pcmBytes.length;

        ByteBuffer header = ByteBuffer.allocate(44).order(ByteOrder.LITTLE_ENDIAN);
        header.put("RIFF".getBytes(StandardCharsets.US_ASCII));
        header.putInt(36 + dataSize);
        header.put("WAVE".getBytes(StandardCharsets.US_ASCII));
        header.put("fmt ".getBytes(StandardCharsets.US_ASCII));
        header.putInt(16); // PCM chunk size
        header.putShort((short) 1); // PCM format
        header.putShort((short) channels);
        header.putInt(sampleRate);
        header.putInt(byteRate);
        header.putShort((short) blockAlign);
        header.putShort((short) bitsPerSample);
        header.put("data".getBytes(StandardCharsets.US_ASCII));
        header.putInt(dataSize);

        ByteArrayOutputStream out = new ByteArrayOutputStream(44 + dataSize);
        out.write(header.array());
        out.write(pcmBytes);
        return out.toByteArray();
    }

    public static int calculatePcmDurationMs(int pcmByteLength, int sampleRate, int channels, int bitsPerSample) {
        int bytesPerSecond = sampleRate * channels * (bitsPerSample / 8);
        if (bytesPerSecond <= 0 || pcmByteLength <= 0) return 0;
        return (int) ((pcmByteLength * 1000L) / bytesPerSecond);
    }

    private String resolveVoice(String overrideVoice, String existingVoice) {
        if (overrideVoice != null && !overrideVoice.isBlank()) {
            String clean = overrideVoice.trim();
            if (!VALID_VOICES.contains(clean)) {
                throw new IllegalArgumentException("Giọng TTS không hợp lệ (chỉ chấp nhận Kore hoặc Puck): " + clean);
            }
            return clean;
        }
        if (existingVoice != null && VALID_VOICES.contains(existingVoice.trim())) {
            return existingVoice.trim();
        }
        return "Kore";
    }

    private List<String> getApiKeys() {
        if (apiKeyConfig == null || apiKeyConfig.isBlank()) return List.of();
        return Arrays.stream(apiKeyConfig.split("[,;\\s]+"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    public record SynthesizedAudio(byte[] wavBytes, int durationMs) {
    }
}
