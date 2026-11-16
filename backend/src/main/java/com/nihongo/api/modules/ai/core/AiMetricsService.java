package com.nihongo.api.modules.ai.core;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.concurrent.atomic.LongAdder;

/**
 * Thu thập chỉ số vận hành (Telemetry) cho toàn bộ Module AI:
 * - Tỷ lệ Cache Hit / Dictionary Hit / AI Call của Dịch nhanh
 * - Độ trễ p50 / p95 của Dịch nhanh & Sensei AI Chat
 * - Số lượt lỗi hoặc chạm Rate Limit
 */
@Component
public class AiMetricsService {

    private static final int SAMPLE_WINDOW = 500;

    private final LongAdder translateTotal = new LongAdder();
    private final LongAdder translateCacheHits = new LongAdder();
    private final LongAdder translateDictHits = new LongAdder();
    private final LongAdder translateAiCalls = new LongAdder();
    private final LongAdder translateFallbacks = new LongAdder();
    private final LongAdder translateRateLimited = new LongAdder();

    private final LongAdder chatTotal = new LongAdder();
    private final LongAdder chatRagHits = new LongAdder();
    private final LongAdder chatErrors = new LongAdder();
    private final LongAdder chatRateLimited = new LongAdder();

    private final LongAdder upstream429Count = new LongAdder();
    private volatile String lastUpstream429At = null;

    private final Deque<Long> translateLatencies = new ArrayDeque<>(SAMPLE_WINDOW);
    private final Deque<Long> chatLatencies = new ArrayDeque<>(SAMPLE_WINDOW);

    public void recordTranslate(String source, long latencyMs) {
        translateTotal.increment();
        switch (source == null ? "" : source) {
            case "CACHE" -> translateCacheHits.increment();
            case "DICTIONARY" -> translateDictHits.increment();
            case "AI" -> translateAiCalls.increment();
            default -> translateFallbacks.increment();
        }
        addLatency(translateLatencies, latencyMs);
    }

    public void recordTranslateRateLimited() {
        translateRateLimited.increment();
    }

    public void recordChat(boolean ragMatched, boolean error, long latencyMs) {
        chatTotal.increment();
        if (ragMatched) chatRagHits.increment();
        if (error) chatErrors.increment();
        addLatency(chatLatencies, latencyMs);
    }

    public void recordChatRateLimited() {
        chatRateLimited.increment();
    }

    public void recordUpstream429() {
        upstream429Count.increment();
        lastUpstream429At = Instant.now().toString();
    }

    public AiMetricsSnapshot getSnapshot() {
        long tTotal = translateTotal.sum();
        long tCache = translateCacheHits.sum();
        long tDict = translateDictHits.sum();
        double cacheRate = tTotal == 0 ? 0.0 : Math.round(((tCache + tDict) * 1000.0 / tTotal)) / 10.0;

        long cTotal = chatTotal.sum();
        long cRag = chatRagHits.sum();
        double ragRate = cTotal == 0 ? 0.0 : Math.round((cRag * 1000.0 / cTotal)) / 10.0;

        long[] tPerc = percentiles(translateLatencies);
        long[] cPerc = percentiles(chatLatencies);

        return AiMetricsSnapshot.builder()
                .translateTotal(tTotal)
                .translateCacheHits(tCache)
                .translateDictHits(tDict)
                .translateAiCalls(translateAiCalls.sum())
                .translateFallbacks(translateFallbacks.sum())
                .translateRateLimited(translateRateLimited.sum())
                .translateCacheOrDictHitRatePercent(cacheRate)
                .translateP50Ms(tPerc[0])
                .translateP95Ms(tPerc[1])
                .chatTotal(cTotal)
                .chatRagHits(cRag)
                .chatRagHitRatePercent(ragRate)
                .chatErrors(chatErrors.sum())
                .chatRateLimited(chatRateLimited.sum())
                .chatP50Ms(cPerc[0])
                .chatP95Ms(cPerc[1])
                .upstream429Count(upstream429Count.sum())
                .lastUpstream429At(lastUpstream429At)
                .build();
    }

    private void addLatency(Deque<Long> deque, long ms) {
        synchronized (deque) {
            if (deque.size() >= SAMPLE_WINDOW) {
                deque.pollFirst();
            }
            deque.addLast(Math.max(0L, ms));
        }
    }

    private long[] percentiles(Deque<Long> deque) {
        long[] arr;
        synchronized (deque) {
            if (deque.isEmpty()) return new long[]{0L, 0L};
            arr = new long[deque.size()];
            int idx = 0;
            for (Long v : deque) arr[idx++] = v;
        }
        Arrays.sort(arr);
        long p50 = arr[(int) Math.floor(0.50 * (arr.length - 1))];
        long p95 = arr[(int) Math.floor(0.95 * (arr.length - 1))];
        return new long[]{p50, p95};
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiMetricsSnapshot {
        private long translateTotal;
        private long translateCacheHits;
        private long translateDictHits;
        private long translateAiCalls;
        private long translateFallbacks;
        private long translateRateLimited;
        private double translateCacheOrDictHitRatePercent;
        private long translateP50Ms;
        private long translateP95Ms;

        private long chatTotal;
        private long chatRagHits;
        private double chatRagHitRatePercent;
        private long chatErrors;
        private long chatRateLimited;
        private long chatP50Ms;
        private long chatP95Ms;

        private long upstream429Count;
        private String lastUpstream429At;
    }
}

