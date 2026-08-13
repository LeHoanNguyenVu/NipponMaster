package com.nihongo.api.modules.subscription.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.subscription.dto.AdminSubscriptionPlanDTO;
import com.nihongo.api.modules.subscription.dto.SubscriptionPlanResponse;
import com.nihongo.api.modules.subscription.dto.SubscriptionResponse;
import com.nihongo.api.modules.subscription.entity.Subscription;
import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import com.nihongo.api.modules.subscription.repository.SubscriptionPlanRepository;
import com.nihongo.api.modules.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminSubscriptionServiceImpl implements AdminSubscriptionService {

    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SubscriptionPlanResponse> getAllPlansAdmin() {
        return planRepository.findAllByOrderByPriceAsc()
                .stream()
                .map(SubscriptionPlanResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SubscriptionPlanResponse createPlan(AdminSubscriptionPlanDTO.CreatePlanRequest request) {
        String featureText = request.getFeatures() != null
                ? String.join("\n", request.getFeatures())
                : "";

        SubscriptionPlan plan = SubscriptionPlan.builder()
                .name(request.getName())
                .description(request.getDescription())
                .planType(request.getPlanType())
                .jlptLevel(request.getJlptLevel())
                .price(request.getPrice())
                .currency(request.getCurrency() != null ? request.getCurrency() : "VND")
                .durationDays(request.getDurationDays() != null ? request.getDurationDays() : 365)
                .isActive(true)
                .badge(request.getBadge())
                .features(featureText)
                .build();

        SubscriptionPlan saved = planRepository.save(plan);
        return SubscriptionPlanResponse.from(saved);
    }

    @Override
    @Transactional
    public SubscriptionPlanResponse updatePlan(Long id, AdminSubscriptionPlanDTO.CreatePlanRequest request) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gói dịch vụ", id));

        plan.setName(request.getName());
        plan.setDescription(request.getDescription());
        plan.setPlanType(request.getPlanType());
        plan.setJlptLevel(request.getJlptLevel());
        plan.setPrice(request.getPrice());
        if (request.getCurrency() != null) plan.setCurrency(request.getCurrency());
        if (request.getDurationDays() != null) plan.setDurationDays(request.getDurationDays());
        plan.setBadge(request.getBadge());
        if (request.getFeatures() != null) {
            plan.setFeatures(String.join("\n", request.getFeatures()));
        }

        SubscriptionPlan saved = planRepository.save(plan);
        return SubscriptionPlanResponse.from(saved);
    }

    @Override
    @Transactional
    public SubscriptionPlanResponse togglePlanStatus(Long id, Boolean isActive) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gói dịch vụ", id));

        plan.setIsActive(isActive != null ? isActive : !plan.getIsActive());
        SubscriptionPlan saved = planRepository.save(plan);
        return SubscriptionPlanResponse.from(saved);
    }

    @Override
    @Transactional
    public void deletePlan(Long id) {
        if (!planRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gói dịch vụ", id);
        }
        planRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SubscriptionResponse grantVipManual(AdminSubscriptionPlanDTO.GrantVipRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy học viên với email = " + request.getEmail()));

        SubscriptionPlan plan;
        if (request.getPlanId() != null) {
            plan = planRepository.findById(request.getPlanId())
                    .orElseThrow(() -> new ResourceNotFoundException("Gói dịch vụ", request.getPlanId()));
        } else {
            plan = planRepository.findByPlanType(SubscriptionPlan.PlanType.FULL_BUNDLE)
                    .stream().findFirst()
                    .orElseGet(() -> planRepository.findAll().stream().findFirst()
                            .orElseThrow(() -> new RuntimeException("Chưa có gói dịch vụ nào trong hệ thống!")));
        }

        int durationDays = request.getCustomDurationDays() != null && request.getCustomDurationDays() > 0
                ? request.getCustomDurationDays()
                : (plan.getDurationDays() != null ? plan.getDurationDays() : 365);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusDays(durationDays);

        Subscription subscription = Subscription.builder()
                .userId(user.getId())
                .plan(plan)
                .status(Subscription.SubscriptionStatus.ACTIVE)
                .paymentProvider("ADMIN_GRANT")
                .amount(plan.getPrice() != null ? plan.getPrice() : 0L)
                .currency(plan.getCurrency() != null ? plan.getCurrency() : "VND")
                .startDate(now)
                .endDate(endDate)
                .build();

        Subscription saved = subscriptionRepository.save(subscription);
        return SubscriptionResponse.from(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminSubscriptionPlanDTO.AnalyticsResponse getAnalytics() {
        List<SubscriptionPlan> allPlans = planRepository.findAll();
        List<Subscription> allSubs = subscriptionRepository.findAll();

        long totalRevenue = allSubs.stream()
                .mapToLong(s -> s.getAmount() != null ? s.getAmount() : 0L)
                .sum();

        long activeVipCount = subscriptionRepository.countActiveSubscriptions();
        long totalSubsCount = allSubs.size();

        String topSelling = allPlans.isEmpty() ? "Chưa có" : allPlans.get(0).getName();

        return AdminSubscriptionPlanDTO.AnalyticsResponse.builder()
                .totalRevenue(totalRevenue)
                .totalSubscriptions(totalSubsCount)
                .activeVipCount(activeVipCount)
                .topSellingPlan(topSelling)
                .totalPlansCount((long) allPlans.size())
                .build();
    }
}
