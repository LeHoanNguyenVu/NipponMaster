package com.nihongo.api.common.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * Service quản lý JWT Blacklist trên Redis.
 * Khi người dùng đăng xuất, token sẽ được thêm vào blacklist
 * và tự động hết hạn sau thời gian TTL của token.
 *
 * Graceful: Nếu Redis không khả dụng, blacklist sẽ không hoạt động
 * nhưng ứng dụng vẫn chạy bình thường (token hết hạn tự nhiên theo TTL JWT).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtBlacklistService {

    private static final String BLACKLIST_PREFIX = "jwt:blacklist:";

    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * Thêm token vào blacklist với TTL tự động hết hạn.
     * @param token JWT token cần vô hiệu hóa
     * @param expirationMs thời gian còn lại (ms) trước khi token hết hạn tự nhiên
     */
    public void blacklistToken(String token, long expirationMs) {
        try {
            String key = BLACKLIST_PREFIX + token;
            redisTemplate.opsForValue().set(key, "blacklisted", expirationMs, TimeUnit.MILLISECONDS);
            log.info("🔒 Token đã được thêm vào blacklist, hết hạn sau {}ms", expirationMs);
        } catch (Exception e) {
            log.warn("⚠️ Không thể blacklist token (Redis có thể không khả dụng): {}", e.getMessage());
        }
    }

    /**
     * Kiểm tra token có nằm trong blacklist không.
     * @return true nếu token đã bị vô hiệu hóa
     */
    public boolean isBlacklisted(String token) {
        try {
            String key = BLACKLIST_PREFIX + token;
            return Boolean.TRUE.equals(redisTemplate.hasKey(key));
        } catch (Exception e) {
            log.warn("⚠️ Không thể kiểm tra blacklist (Redis có thể không khả dụng): {}", e.getMessage());
            return false; // Mặc định cho phép nếu Redis lỗi
        }
    }
}
