package com.nihongo.api.common.config;

import org.springframework.context.annotation.Configuration;

/**
 * Cấu hình Jackson cho Spring Boot 4.x.
 * Lưu ý: Các cấu hình JSON được xử lý qua annotation trực tiếp trên DTO:
 * - @JsonInclude(NON_NULL) trên ApiResponse
 * - @JsonFormat trên các trường ngày tháng nếu cần
 */
@Configuration
public class JacksonConfig {
    // Cấu hình mặc định của Spring Boot 4.x đã đủ tốt.
    // Nếu cần tùy chỉnh thêm, thêm Bean ở đây.
}
