package com.nihongo.api.modules.subscription.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.subscription.dto.*;
import com.nihongo.api.modules.subscription.entity.Subscription;
import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import com.nihongo.api.modules.subscription.repository.SubscriptionPlanRepository;
import com.nihongo.api.modules.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service quản lý gói học và đăng ký gói.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    /**
     * Lấy danh sách tất cả gói học đang active.
     */
    @Transactional(readOnly = true)
    public List<SubscriptionPlanResponse> getAvailablePlans() {
        return planRepository.findByIsActiveTrueOrderByPriceAsc()
                .stream()
                .map(SubscriptionPlanResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * Lấy danh sách gói đã mua của user.
     */
    @Transactional(readOnly = true)
    public List<SubscriptionResponse> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(SubscriptionResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * Kiểm tra user có quyền truy cập level cụ thể không.
     */
    @Transactional(readOnly = true)
    public boolean hasAccessToLevel(Long userId, User.JlptLevel level) {
        if (userId == null) return false;

        // Kiểm tra role: Admin/Teacher có full access
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && (user.getRole() == User.Role.ADMIN || user.getRole() == User.Role.TEACHER)) {
            return true;
        }

        // Kiểm tra có trọn gói active
        if (subscriptionRepository.hasActiveFullBundle(userId)) {
            return true;
        }

        // Kiểm tra có gói level tương ứng
        return subscriptionRepository.hasActiveLevelSubscription(userId, level);
    }

    /**
     * Lấy thông tin quyền truy cập nội dung.
     */
    @Transactional(readOnly = true)
    public AccessInfoResponse getAccessInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", userId));

        // Admin/Teacher → full access
        if (user.getRole() == User.Role.ADMIN || user.getRole() == User.Role.TEACHER) {
            return AccessInfoResponse.builder()
                    .subscriptionStatus("ACTIVE")
                    .hasFullAccess(true)
                    .accessibleLevels(List.of("N5", "N4", "N3", "N2", "N1"))
                    .previewLimit(0)
                    .build();
        }

        List<Subscription> activeSubs = subscriptionRepository.findActiveByUserId(userId);

        if (activeSubs.isEmpty()) {
            return AccessInfoResponse.builder()
                    .subscriptionStatus("NONE")
                    .hasFullAccess(false)
                    .accessibleLevels(List.of())
                    .previewLimit(5)
                    .build();
        }

        // Collect accessible levels
        boolean hasFullBundle = activeSubs.stream()
                .anyMatch(s -> s.getPlan().getPlanType() == SubscriptionPlan.PlanType.FULL_BUNDLE);

        if (hasFullBundle) {
            return AccessInfoResponse.builder()
                    .subscriptionStatus("ACTIVE")
                    .hasFullAccess(true)
                    .accessibleLevels(List.of("N5", "N4", "N3", "N2", "N1"))
                    .previewLimit(0)
                    .build();
        }

        List<String> levels = activeSubs.stream()
                .filter(s -> s.getPlan().getJlptLevel() != null)
                .map(s -> s.getPlan().getJlptLevel().name())
                .distinct()
                .collect(Collectors.toList());

        return AccessInfoResponse.builder()
                .subscriptionStatus("ACTIVE")
                .hasFullAccess(false)
                .accessibleLevels(levels)
                .previewLimit(5)
                .build();
    }

    /**
     * Tạo subscription sau thanh toán thành công (mock mode).
     * Trong production, method này sẽ được gọi từ Stripe webhook.
     */
    @Transactional
    public SubscriptionResponse createSubscription(Long userId, Long planId) {
        SubscriptionPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Gói học", planId));

        if (!plan.getIsActive()) {
            throw new BusinessException("Gói học này hiện không khả dụng");
        }

        // Kiểm tra xem user đã mua gói này chưa (active)
        if (plan.getPlanType() == SubscriptionPlan.PlanType.SINGLE_LEVEL) {
            boolean alreadyOwned = subscriptionRepository
                    .hasActiveLevelSubscription(userId, plan.getJlptLevel());
            if (alreadyOwned) {
                throw new BusinessException("Bạn đã sở hữu gói " + plan.getJlptLevel().name() + " rồi!");
            }
        } else {
            boolean alreadyOwned = subscriptionRepository.hasActiveFullBundle(userId);
            if (alreadyOwned) {
                throw new BusinessException("Bạn đã sở hữu gói Trọn bộ rồi!");
            }
        }

        LocalDateTime now = LocalDateTime.now();
        Subscription subscription = Subscription.builder()
                .userId(userId)
                .plan(plan)
                .status(Subscription.SubscriptionStatus.ACTIVE)
                .paymentProvider("MOCK")
                .paymentId("MOCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .amount(plan.getPrice())
                .currency(plan.getCurrency())
                .startDate(now)
                .endDate(now.plusDays(plan.getDurationDays()))
                .build();

        Subscription saved = subscriptionRepository.save(subscription);
        log.info("Tạo subscription thành công cho user {} — gói: {} ({})",
                userId, plan.getName(), plan.getJlptLevel());

        return SubscriptionResponse.from(saved);
    }

    /**
     * Lấy trạng thái subscription tổng quát của user (cho UserResponse).
     */
    @Transactional(readOnly = true)
    public String getSubscriptionStatus(Long userId) {
        List<Subscription> activeSubs = subscriptionRepository.findActiveByUserId(userId);
        if (!activeSubs.isEmpty()) return "ACTIVE";

        List<Subscription> allSubs = subscriptionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        if (!allSubs.isEmpty()) return "EXPIRED";

        return "NONE";
    }

    /**
     * Lấy trạng thái tài khoản dùng thử và hạn mức xem thử trong ngày.
     */
    @Transactional(readOnly = true)
    public TrialStatusResponse getTrialStatus(Long userId) {
        if (userId == null) {
            return TrialStatusResponse.builder()
                    .isTrial(true)
                    .dailyVocabLimit(5)
                    .dailyKanjiLimit(1)
                    .dailyGrammarLimit(1)
                    .dailyVocabUsed(0)
                    .dailyKanjiUsed(0)
                    .dailyGrammarUsed(0)
                    .subscriptionRequired(true)
                    .message("Tài khoản Khách tham quan: Được xem thử tối đa 5 từ vựng & 1 Hán tự/Ngữ pháp mỗi ngày.")
                    .build();
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user != null && (user.getRole() == User.Role.ADMIN || user.getRole() == User.Role.TEACHER)) {
            return TrialStatusResponse.builder()
                    .isTrial(false)
                    .dailyVocabLimit(-1)
                    .dailyKanjiLimit(-1)
                    .dailyGrammarLimit(-1)
                    .dailyVocabUsed(0)
                    .dailyKanjiUsed(0)
                    .dailyGrammarUsed(0)
                    .subscriptionRequired(false)
                    .message("Tài khoản Giảng viên / Quản trị viên: Không giới hạn quyền truy cập.")
                    .build();
        }

        boolean hasActiveSub = subscriptionRepository.findActiveByUserId(userId).size() > 0;
        if (hasActiveSub) {
            return TrialStatusResponse.builder()
                    .isTrial(false)
                    .dailyVocabLimit(-1)
                    .dailyKanjiLimit(-1)
                    .dailyGrammarLimit(-1)
                    .dailyVocabUsed(0)
                    .dailyKanjiUsed(0)
                    .dailyGrammarUsed(0)
                    .subscriptionRequired(false)
                    .message("Đã kích hoạt gói học Premium thành công!")
                    .build();
        }

        return TrialStatusResponse.builder()
                .isTrial(true)
                .dailyVocabLimit(5)
                .dailyKanjiLimit(1)
                .dailyGrammarLimit(1)
                .dailyVocabUsed(2)
                .dailyKanjiUsed(0)
                .dailyGrammarUsed(0)
                .subscriptionRequired(true)
                .message("Bạn đang dùng thử miễn phí. Nâng cấp gói học để mở khóa không giới hạn!")
                .build();
    }
}

