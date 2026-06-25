package com.nihongo.api.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Bật tính năng tự động ghi nhận thời gian tạo/cập nhật
 * cho tất cả Entity kế thừa BaseEntity.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}
