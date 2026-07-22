package com.nihongo.api.modules.subscription.dto;

import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import lombok.Builder;
import lombok.Data;

import java.util.Arrays;
import java.util.List;

/**
 * DTO trả về thông tin gói học cho Frontend.
 */
@Data
@Builder
public class SubscriptionPlanResponse {

    private Long id;
    private String name;
    private String description;
    private String planType;
    private String jlptLevel;
    private Long price;
    private String currency;
    private Integer durationDays;
    private String badge;
    private List<String> features;

    public static SubscriptionPlanResponse from(SubscriptionPlan plan) {
        List<String> featureList = plan.getFeatures() != null
                ? Arrays.asList(plan.getFeatures().split("\n"))
                : List.of();

        return SubscriptionPlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .description(plan.getDescription())
                .planType(plan.getPlanType().name())
                .jlptLevel(plan.getJlptLevel() != null ? plan.getJlptLevel().name() : null)
                .price(plan.getPrice())
                .currency(plan.getCurrency())
                .durationDays(plan.getDurationDays())
                .badge(plan.getBadge())
                .features(featureList)
                .build();
    }
}
