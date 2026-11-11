package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.translator.dto.TranslateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory thread-safe cache cho kết quả dịch thuật.
 * Giúp tiết kiệm quota Free Tier của Gemini và phản hồi tức thì (< 1ms) cho các câu hỏi trùng lặp.
 */
@Slf4j
@Component
public class TranslationCache {

    private static final int MAX_ENTRIES = 2000;
    private static final long TTL_MILLIS = 24 * 60 * 60 * 1000L; // 24 giờ

    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();

    private record CacheEntry(TranslateResponse response, long timestamp) {
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > TTL_MILLIS;
        }
    }

    public TranslateResponse get(String sourceLang, String targetLang, String text) {
        String key = buildKey(sourceLang, targetLang, text);
        CacheEntry entry = cache.get(key);
        if (entry == null) {
            return null;
        }
        if (entry.isExpired()) {
            cache.remove(key);
            return null;
        }
        log.debug("🎯 Cache hit cho câu: [{}]", text);
        return entry.response();
    }

    public void put(String sourceLang, String targetLang, String text, TranslateResponse response) {
        if (response == null || text == null || text.isBlank()) {
            return;
        }

        // Tự động dọn dẹp nếu bộ nhớ đệm vượt quá giới hạn
        if (cache.size() >= MAX_ENTRIES) {
            evictExpiredOrOldest();
        }

        String key = buildKey(sourceLang, targetLang, text);
        cache.put(key, new CacheEntry(response, System.currentTimeMillis()));
    }

    private void evictExpiredOrOldest() {
        long now = System.currentTimeMillis();
        cache.entrySet().removeIf(e -> now - e.getValue().timestamp() > TTL_MILLIS);
        if (cache.size() >= MAX_ENTRIES) {
            // Xóa ngẫu nhiên 20% khi đầy để giải phóng bộ nhớ
            int count = 0;
            for (String key : cache.keySet()) {
                cache.remove(key);
                if (++count > MAX_ENTRIES / 5) break;
            }
        }
    }

    private String buildKey(String sourceLang, String targetLang, String text) {
        return (sourceLang + ":" + targetLang + ":" + text.trim().toLowerCase());
    }

    public int size() {
        return cache.size();
    }
}

