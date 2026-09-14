package com.nihongo.api.modules.subscription.service;

import com.nihongo.api.modules.subscription.dto.AdminSubscriptionPlanDTO;
import com.nihongo.api.modules.subscription.dto.SubscriptionPlanResponse;
import com.nihongo.api.modules.subscription.dto.SubscriptionResponse;

import java.util.List;

public interface AdminSubscriptionService {

    List<SubscriptionPlanResponse> getAllPlansAdmin();

    SubscriptionPlanResponse createPlan(AdminSubscriptionPlanDTO.CreatePlanRequest request);

    SubscriptionPlanResponse updatePlan(Long id, AdminSubscriptionPlanDTO.CreatePlanRequest request);

    SubscriptionPlanResponse togglePlanStatus(Long id, Boolean isActive);

    void deletePlan(Long id);

    SubscriptionResponse grantVipManual(AdminSubscriptionPlanDTO.GrantVipRequest request);

    AdminSubscriptionPlanDTO.AnalyticsResponse getAnalytics();
}
