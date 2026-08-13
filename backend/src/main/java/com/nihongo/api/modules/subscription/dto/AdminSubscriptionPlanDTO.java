package com.nihongo.api.modules.subscription.dto;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class AdminSubscriptionPlanDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreatePlanRequest {
        @NotBlank(message = "Tên gói không được để trống")
        private String name;

        private String description;

        @NotNull(message = "Loại gói không được để trống")
        private SubscriptionPlan.PlanType planType;

        private User.JlptLevel jlptLevel;

        @NotNull(message = "Giá tiền không được để trống")
        @Min(value = 0, message = "Giá tiền không hợp lệ")
        private Long price;

        @Builder.Default
        private String currency = "VND";

        @NotNull(message = "Thời hạn không được để trống")
        @Min(value = 1, message = "Thời hạn ít nhất 1 ngày")
        private Integer durationDays;

        private String badge;

        private List<String> features;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GrantVipRequest {
        @NotBlank(message = "Email không được để trống")
        private String email;

        private Long planId;

        @Min(value = 1, message = "Số ngày cấp ít nhất là 1 ngày")
        private Integer customDurationDays;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnalyticsResponse {
        private Long totalRevenue;
        private Long totalSubscriptions;
        private Long activeVipCount;
        private String topSellingPlan;
        private Long totalPlansCount;
    }
}
