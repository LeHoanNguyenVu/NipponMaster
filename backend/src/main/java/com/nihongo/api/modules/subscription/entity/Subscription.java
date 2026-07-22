package com.nihongo.api.modules.subscription.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity đại diện cho đơn đặt mua gói học của người dùng.
 * Mỗi khi user thanh toán thành công 1 gói, 1 record Subscription được tạo.
 */
@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * Gói đã mua.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "plan_id", nullable = false)
    private SubscriptionPlan plan;

    /**
     * Trạng thái đơn hàng.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private SubscriptionStatus status = SubscriptionStatus.PENDING;

    /**
     * Nhà cung cấp thanh toán: STRIPE, VNPAY, MOMO, MOCK.
     */
    @Column(name = "payment_provider", length = 50)
    @Builder.Default
    private String paymentProvider = "MOCK";

    /**
     * ID giao dịch từ cổng thanh toán.
     */
    @Column(name = "payment_id", length = 255)
    private String paymentId;

    /**
     * Số tiền đã thanh toán.
     */
    @Column(nullable = false)
    private Long amount;

    @Column(length = 10, nullable = false)
    @Builder.Default
    private String currency = "VND";

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    public enum SubscriptionStatus {
        PENDING, ACTIVE, EXPIRED, CANCELLED
    }
}
