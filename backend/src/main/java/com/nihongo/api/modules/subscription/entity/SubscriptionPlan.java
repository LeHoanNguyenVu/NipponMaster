package com.nihongo.api.modules.subscription.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đại diện cho catalog các gói học có sẵn trong hệ thống.
 * Ví dụ: "Gói N5", "Gói N4", "Trọn gói N5-N1".
 */
@Entity
@Table(name = "subscription_plans")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    /**
     * Loại gói: SINGLE_LEVEL (mua lẻ 1 level) hoặc FULL_BUNDLE (trọn gói N5-N1).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_type", nullable = false)
    private PlanType planType;

    /**
     * Level JLPT mà gói này mở khóa.
     * Null nếu planType = FULL_BUNDLE (mở khóa tất cả).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level")
    private User.JlptLevel jlptLevel;

    /**
     * Giá gói (VND).
     */
    @Column(nullable = false)
    private Long price;

    @Column(length = 10, nullable = false)
    @Builder.Default
    private String currency = "VND";

    /**
     * Thời hạn gói tính theo ngày (365 = 1 năm).
     */
    @Column(name = "duration_days", nullable = false)
    @Builder.Default
    private Integer durationDays = 365;

    /**
     * Gói có đang hiển thị cho user mua không.
     */
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    /**
     * Badge hiển thị trên gói (ví dụ: "Best Value", "Popular").
     */
    @Column(length = 50)
    private String badge;

    /**
     * Danh sách tính năng chính (lưu dạng text, mỗi dòng 1 feature).
     */
    @Column(length = 2000)
    private String features;

    public enum PlanType {
        SINGLE_LEVEL, FULL_BUNDLE
    }
}
