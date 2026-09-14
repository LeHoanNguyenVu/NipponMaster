package com.nihongo.api.modules.payment.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.payment.service.PaymentService;
import com.nihongo.api.modules.subscription.dto.CreateCheckoutRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller xử lý thanh toán và webhook từ cổng thanh toán.
 */
@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Thanh toán và mua gói học")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout")
    @Operation(summary = "Tạo checkout session (cần JWT)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createCheckout(
            @AuthenticationPrincipal Long userId,
            @Valid @RequestBody CreateCheckoutRequest request) {

        Map<String, Object> result = paymentService.createCheckout(userId, request.getPlanId());
        return ResponseEntity.ok(ApiResponse.ok("Tạo checkout thành công", result));
    }

    @PostMapping("/webhook")
    @Operation(summary = "Webhook callback từ cổng thanh toán (public)")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String signature) {

        paymentService.handleWebhook(payload, signature);
        return ResponseEntity.ok("OK");
    }
}
