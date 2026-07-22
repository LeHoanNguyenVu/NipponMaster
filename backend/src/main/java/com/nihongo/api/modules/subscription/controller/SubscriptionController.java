package com.nihongo.api.modules.subscription.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.subscription.dto.*;
import com.nihongo.api.modules.subscription.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý gói học (subscription plans) và đơn mua gói.
 */
@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
@Tag(name = "Subscriptions", description = "Quản lý gói học và đăng ký gói")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping("/plans")
    @Operation(summary = "Lấy danh sách gói học (public)")
    public ResponseEntity<ApiResponse<List<SubscriptionPlanResponse>>> getPlans() {
        return ResponseEntity.ok(ApiResponse.ok(
                "Danh sách gói học", subscriptionService.getAvailablePlans()));
    }

    @GetMapping("/my")
    @Operation(summary = "Lấy danh sách gói đã mua của user (cần JWT)")
    public ResponseEntity<ApiResponse<List<SubscriptionResponse>>> getMySubscriptions(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Gói đã mua", subscriptionService.getUserSubscriptions(userId)));
    }

    @GetMapping("/access")
    @Operation(summary = "Lấy thông tin quyền truy cập nội dung (cần JWT)")
    public ResponseEntity<ApiResponse<AccessInfoResponse>> getAccessInfo(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Thông tin truy cập", subscriptionService.getAccessInfo(userId)));
    }
}
