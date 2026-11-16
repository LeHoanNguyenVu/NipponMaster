package com.nihongo.api.modules.ai.core;

/** Ngoại lệ ném ra khi người dùng hoặc hệ thống chạm ngưỡng giới hạn lượt gọi AI. */
public class AiRateLimitException extends RuntimeException {
    private final long retryAfterSeconds;

    public AiRateLimitException(String message, long retryAfterSeconds) {
        super(message);
        this.retryAfterSeconds = retryAfterSeconds;
    }

    public long getRetryAfterSeconds() {
        return retryAfterSeconds;
    }
}

