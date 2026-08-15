package com.nihongo.api.modules.security.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity lưu vết các hành vi vi phạm an ninh / gian lận thi cử.
 */
@Entity
@Table(name = "anti_cheat_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AntiCheatLog extends BaseEntity {

    @Column(name = "user_id")
    private Long userId;

    @Column(length = 100)
    private String username;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false)
    private ActivityType activityType;

    @Column(name = "confidence_score", nullable = false)
    private Integer confidenceScore; // 0 - 100%

    @Column(name = "detail_reason", length = 500)
    private String detailReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "action_taken", nullable = false)
    @Builder.Default
    private ActionTaken actionTaken = ActionTaken.FLAGGED;

    public enum ActivityType {
        IMPOSSIBLE_SPEED,     // Tốc độ siêu nhiên < 300ms
        RATE_LIMIT_EXCEEDED,  // Tấn công spam API > 30 req/phút
        BOT_TYPING_PATTERN,   // Mẫu gõ phím bot tự động
        SCRIPT_USER_AGENT     // User-Agent bất thường của script
    }

    public enum ActionTaken {
        FLAGGED,           // Cảnh báo nghi vấn
        WARNING_SENT,      // Đã gửi thông báo nhắc nhở
        ACCOUNT_SUSPENDED, // Khóa tài khoản
        RESOLVED_SAFE      // Đã xác minh an toàn
    }
}
