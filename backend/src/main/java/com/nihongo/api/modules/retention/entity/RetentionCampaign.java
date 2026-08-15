package com.nihongo.api.modules.retention.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity lưu trữ chiến dịch chăm sóc và giữ chân học viên tự động.
 */
@Entity
@Table(name = "retention_campaigns")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RetentionCampaign extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "trigger_type", nullable = false)
    private TriggerType triggerType;

    @Column(name = "email_subject", nullable = false, length = 200)
    private String emailSubject;

    @Column(name = "email_template_body", columnDefinition = "TEXT")
    private String emailTemplateBody;

    @Column(name = "sent_count", nullable = false)
    @Builder.Default
    private Integer sentCount = 0;

    @Column(name = "converted_count", nullable = false)
    @Builder.Default
    private Integer convertedCount = 0;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "last_run_at")
    private LocalDateTime lastRunAt;

    public enum TriggerType {
        INACTIVE_7_DAYS
    }
}
