package com.nihongo.api.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.cache.interceptor.SimpleCacheErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Cấu hình Redis cho caching dữ liệu tĩnh và lưu trữ JWT Blacklist.
 * Tự động xử lý lỗi kết nối Redis một cách graceful (không crash ứng dụng).
 */
@Slf4j
@Configuration
@EnableCaching
@SuppressWarnings("all")
public class RedisConfig implements CachingConfigurer {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory, ObjectMapper objectMapper) {
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);
        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory, ObjectMapper objectMapper) {
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

        // Cấu hình mặc định: TTL 30 phút
        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer))
                .disableCachingNullValues();

        // Cấu hình riêng cho từng cache
        Map<String, RedisCacheConfiguration> cacheConfigs = new HashMap<>();

        // Dữ liệu từ vựng/kanji/ngữ pháp ít thay đổi → cache 1 giờ
        RedisCacheConfiguration staticDataConfig = defaultConfig.entryTtl(Duration.ofHours(1));
        cacheConfigs.put("vocabularies", staticDataConfig);
        cacheConfigs.put("kanjis", staticDataConfig);
        cacheConfigs.put("grammars", staticDataConfig);
        cacheConfigs.put("sentence_analysis", staticDataConfig);

        // Leaderboard cập nhật thường xuyên hơn → cache 5 phút
        cacheConfigs.put("leaderboard", defaultConfig.entryTtl(Duration.ofMinutes(5)));

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(defaultConfig)
                .withInitialCacheConfigurations(cacheConfigs)
                .build();
    }

    /**
     * Xử lý lỗi Redis gracefully: khi Redis ngừng hoạt động,
     * ứng dụng vẫn tiếp tục chạy bình thường (bỏ qua cache, truy vấn trực tiếp DB).
     */
    @Override
    public CacheErrorHandler errorHandler() {
        return new SimpleCacheErrorHandler() {
            @Override
            public void handleCacheGetError(RuntimeException exception,
                    org.springframework.cache.Cache cache, Object key) {
                log.warn("⚠️ Redis cache GET lỗi (key={}): {} — tiếp tục không cache", key, exception.getMessage());
            }

            @Override
            public void handleCachePutError(RuntimeException exception,
                    org.springframework.cache.Cache cache, Object key, Object value) {
                log.warn("⚠️ Redis cache PUT lỗi (key={}): {} — bỏ qua ghi cache", key, exception.getMessage());
            }

            @Override
            public void handleCacheEvictError(RuntimeException exception,
                    org.springframework.cache.Cache cache, Object key) {
                log.warn("⚠️ Redis cache EVICT lỗi (key={}): {} — bỏ qua xóa cache", key, exception.getMessage());
            }

            @Override
            public void handleCacheClearError(RuntimeException exception,
                    org.springframework.cache.Cache cache) {
                log.warn("⚠️ Redis cache CLEAR lỗi: {} — bỏ qua xóa toàn bộ cache", exception.getMessage());
            }
        };
    }
}
