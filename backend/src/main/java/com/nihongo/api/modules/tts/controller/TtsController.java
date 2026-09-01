package com.nihongo.api.modules.tts.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequestMapping("/api/v1/tts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TtsController {

    // Fast in-memory cache for audio bytes (stores up to ~1000 pronunciations)
    private static final Map<String, byte[]> AUDIO_CACHE = new ConcurrentHashMap<>();

    @GetMapping(produces = "audio/mpeg")
    public ResponseEntity<byte[]> getJapaneseTts(
            @RequestParam(required = false, defaultValue = "") String text,
            @RequestParam(required = false, defaultValue = "ja") String lang) {
        
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String cleanText = text.trim().replaceAll("[\\r\\n\\t]+", " ");
        if (cleanText.length() > 200) {
            cleanText = cleanText.substring(0, 200);
        }

        String cacheKey = lang + ":" + cleanText;
        byte[] cachedAudio = AUDIO_CACHE.get(cacheKey);
        if (cachedAudio != null) {
            return buildAudioResponse(cachedAudio);
        }

        try {
            byte[] audioBytes = fetchTtsAudio(cleanText, lang);
            if (audioBytes != null && audioBytes.length > 0) {
                if (AUDIO_CACHE.size() < 1000) {
                    AUDIO_CACHE.put(cacheKey, audioBytes);
                }
                return buildAudioResponse(audioBytes);
            }
        } catch (Exception e) {
            log.warn("Failed to fetch Google TTS audio for text: '{}': {}", cleanText, e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }

    private byte[] fetchTtsAudio(String text, String lang) throws Exception {
        String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
        String urlStr = String.format(
                "https://translate.google.com/translate_tts?ie=UTF-8&tl=%s&client=tw-ob&q=%s",
                lang, encodedText);

        URI uri = URI.create(urlStr);
        HttpURLConnection conn = (HttpURLConnection) uri.toURL().openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        conn.setRequestProperty("Accept", "audio/mpeg, audio/*;q=0.9, */*;q=0.8");
        conn.setRequestProperty("Referer", "https://translate.google.com/");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(7000);

        int status = conn.getResponseCode();
        if (status >= 200 && status < 300) {
            try (InputStream in = conn.getInputStream()) {
                return in.readAllBytes();
            }
        } else {
            log.warn("Google TTS responded with HTTP status {}", status);
            return null;
        }
    }

    private ResponseEntity<byte[]> buildAudioResponse(byte[] audioBytes) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("audio/mpeg"));
        headers.setCacheControl(CacheControl.maxAge(Duration.ofDays(7)).cachePublic());
        headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
        headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, OPTIONS");
        headers.setContentLength(audioBytes.length);

        return new ResponseEntity<>(audioBytes, headers, HttpStatus.OK);
    }
}
