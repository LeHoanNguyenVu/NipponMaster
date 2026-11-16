package com.nihongo.api.modules.ai.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Giới hạn tần suất sử dụng AI theo người dùng để bảo vệ hạn mức Gemini Free Tier:
 * - Dịch nhanh LLM: tối đa 30 lượt/phút (trúng Cache hoặc Từ điển không bị tính lượt).
 * - Sensei AI Chat: tối đa 50 tin nhắn/ngày/học viên (reset theo ngày giờ Việt Nam).
 */
@Slf4j
@Component
public class AiRateLimiter {

    private static final ZoneId VN_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    @Value("${ai.ratelimit.translate-per-minute:30}")
    private int translatePerMinuteLimit = 30;

    @Value("${ai.ratelimit.chat-per-day:50}")
    private int chatPerDayLimit = 50;

    private final Map<String, Deque<Long>> translateWindows = new ConcurrentHashMap<>();
    private final Map<Long, DailyCounter> chatDailyCounters = new ConcurrentHashMap<>();

    private static class DailyCounter {
        LocalDate date;
        int count;

        DailyCounter(LocalDate date, int count) {
            this.date = date;
            this.count = count;
        }
    }

    public record ChatQuotaInfo(int usedToday, int dailyLimit, int remainingToday) {}

    public void setLimitsForTest(int translatePerMin, int chatPerDay) {
        this.translatePerMinuteLimit = translatePerMin;
        this.chatPerDayLimit = chatPerDay;
    }

    /** Kiểm tra hạn mức gọi LLM dịch nhanh (30 lượt/phút). */
    public void consumeTranslateLlm(String clientKey) {
        String key = (clientKey == null || clientKey.isBlank()) ? "anonymous" : clientKey;
        long now = System.currentTimeMillis();
        long cutoff = now - 60_000L;

        if (translateWindows.size() > 5000) {
            translateWindows.entrySet().removeIf(e -> {
                synchronized (e.getValue()) {
                    return e.getValue().isEmpty() || e.getValue().peekLast() < cutoff;
                }
            });
        }

        Deque<Long> window = translateWindows.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (window) {
            while (!window.isEmpty() && window.peekFirst() < cutoff) {
                window.pollFirst();
            }
            if (window.size() >= translatePerMinuteLimit) {
                long waitSec = Math.max(1L, (window.peekFirst() + 60_000L - now + 999L) / 1000L);
                throw new AiRateLimitException(
                        String.format("Bạn đã dịch quá nhanh (%d lượt/phút). Vui lòng đợi %d giây rồi thử lại.",
                                translatePerMinuteLimit, waitSec),
                        waitSec);
            }
            window.addLast(now);
        }
    }

    /** Kiểm tra & trừ 1 lượt chat Sensei AI trong ngày của user. */
    public ChatQuotaInfo consumeChatTurn(Long userId) {
        if (userId == null) {
            return new ChatQuotaInfo(0, chatPerDayLimit, chatPerDayLimit);
        }
        LocalDate today = LocalDate.now(VN_ZONE);
        DailyCounter counter = chatDailyCounters.computeIfAbsent(userId, k -> new DailyCounter(today, 0));
        synchronized (counter) {
            if (!today.equals(counter.date)) {
                counter.date = today;
                counter.count = 0;
            }
            if (counter.count >= chatPerDayLimit) {
                throw new AiRateLimitException(
                        String.format("Bạn đã dùng hết %d lượt hỏi Sensei AI hôm nay. Lượt mới sẽ tự làm mới vào 00:00 ngày mai!",
                                chatPerDayLimit),
                        3600L);
            }
            counter.count++;
            return new ChatQuotaInfo(counter.count, chatPerDayLimit, Math.max(0, chatPerDayLimit - counter.count));
        }
    }

    public ChatQuotaInfo getChatQuota(Long userId) {
        if (userId == null) {
            return new ChatQuotaInfo(0, chatPerDayLimit, chatPerDayLimit);
        }
        LocalDate today = LocalDate.now(VN_ZONE);
        DailyCounter counter = chatDailyCounters.get(userId);
        if (counter == null || !today.equals(counter.date)) {
            return new ChatQuotaInfo(0, chatPerDayLimit, chatPerDayLimit);
        }
        synchronized (counter) {
            return new ChatQuotaInfo(counter.count, chatPerDayLimit, Math.max(0, chatPerDayLimit - counter.count));
        }
    }
}

