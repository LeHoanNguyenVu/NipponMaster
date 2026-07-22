package com.nihongo.api.modules.payment.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.subscription.dto.SubscriptionResponse;
import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import com.nihongo.api.modules.subscription.repository.SubscriptionPlanRepository;
import com.nihongo.api.modules.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Service xử lý thanh toán.
 *
 * Hiện tại chạy ở chế độ MOCK — thanh toán được xác nhận ngay lập tức
 * mà không cần cổng thanh toán bên ngoài.
 *
 * Khi tích hợp Stripe thật:
 * - createCheckout() sẽ tạo Stripe Checkout Session và trả về URL
 * - handleWebhook() sẽ xử lý Stripe webhook event checkout.session.completed
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionService subscriptionService;

    // TODO: Khi có Stripe keys, inject StripeClient ở đây
    // @Value("${stripe.api.key:}")
    // private String stripeApiKey;

    /**
     * Tạo checkout session.
     * Mock mode: tự động tạo subscription ngay lập tức.
     * Stripe mode: tạo Stripe Checkout Session, trả về redirect URL.
     *
     * @param userId ID user đang mua
     * @param planId ID gói muốn mua
     * @return Map chứa thông tin checkout (url hoặc subscription data)
     */
    @Transactional
    public Map<String, Object> createCheckout(Long userId, Long planId) {
        SubscriptionPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Gói học", planId));

        if (!plan.getIsActive()) {
            throw new BusinessException("Gói học này hiện không khả dụng");
        }

        log.info("Creating checkout for user {} — plan: {} ({})",
                userId, plan.getName(), plan.getJlptLevel());

        // ===== MOCK MODE: Tạo subscription trực tiếp =====
        // Trong production, thay bằng Stripe Checkout Session:
        //
        // SessionCreateParams params = SessionCreateParams.builder()
        //     .setMode(SessionCreateParams.Mode.PAYMENT)
        //     .setSuccessUrl("http://localhost:5173/#/payment-success")
        //     .setCancelUrl("http://localhost:5173/#/pricing")
        //     .addLineItem(SessionCreateParams.LineItem.builder()
        //         .setQuantity(1L)
        //         .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
        //             .setCurrency("vnd")
        //             .setUnitAmount(plan.getPrice())
        //             .setProductData(...)
        //             .build())
        //         .build())
        //     .putMetadata("userId", userId.toString())
        //     .putMetadata("planId", planId.toString())
        //     .build();
        // Session session = Session.create(params);
        // return Map.of("checkoutUrl", session.getUrl(), "sessionId", session.getId());

        SubscriptionResponse subscription = subscriptionService.createSubscription(userId, planId);

        return Map.of(
                "mode", "MOCK",
                "message", "Thanh toán mô phỏng thành công! Gói đã được kích hoạt.",
                "subscription", subscription
        );
    }

    /**
     * Xử lý webhook từ cổng thanh toán.
     * Mock mode: không cần xử lý.
     * Stripe mode: verify signature → parse event → kích hoạt subscription.
     */
    public void handleWebhook(String payload, String signature) {
        log.info("Received payment webhook (mock mode — no action needed)");

        // TODO: Stripe Webhook Handler
        // Stripe.apiKey = stripeApiKey;
        // Event event = Webhook.constructEvent(payload, signature, webhookSecret);
        // if ("checkout.session.completed".equals(event.getType())) {
        //     Session session = (Session) event.getDataObjectDeserializer().getObject().orElseThrow();
        //     Long userId = Long.parseLong(session.getMetadata().get("userId"));
        //     Long planId = Long.parseLong(session.getMetadata().get("planId"));
        //     subscriptionService.createSubscription(userId, planId);
        // }
    }
}
