package com.nihongo.api.modules.subscription.dto;

import com.nihongo.api.modules.subscription.entity.Subscription;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO trả về thông tin đơn mua gói của user.
 */
@Data
@Builder
public class SubscriptionResponse {

    private Long id;
    private Long planId;
    private String planName;
    private String planType;
    private String jlptLevel;
    private String status;
    private String paymentProvider;
    private String paymentId;
    private Long amount;
    private String currency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

    public static SubscriptionResponse from(Subscription sub) {
        return SubscriptionResponse.builder()
                .id(sub.getId())
                .planId(sub.getPlan().getId())
                .planName(sub.getPlan().getName())
                .planType(sub.getPlan().getPlanType().name())
                .jlptLevel(sub.getPlan().getJlptLevel() != null ? sub.getPlan().getJlptLevel().name() : "ALL")
                .status(sub.getStatus().name())
                .paymentProvider(sub.getPaymentProvider())
                .paymentId(sub.getPaymentId())
                .amount(sub.getAmount())
                .currency(sub.getCurrency())
                .startDate(sub.getStartDate())
                .endDate(sub.getEndDate())
                .createdAt(sub.getCreatedAt())
                .build();
    }
}
