package com.nihongo.api.modules.subscription.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.subscription.dto.AdminSubscriptionPlanDTO;
import com.nihongo.api.modules.subscription.dto.SubscriptionPlanResponse;
import com.nihongo.api.modules.subscription.dto.SubscriptionResponse;
import com.nihongo.api.modules.subscription.service.AdminSubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/subscriptions")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Subscriptions", description = "API Quản lý Gói học và Doanh thu cho Admin")
public class AdminSubscriptionController {

    private final AdminSubscriptionService adminSubscriptionService;

    @GetMapping("/plans")
    @Operation(summary = "Lấy tất cả các gói học (bao gồm cả gói bị ẩn)")
    public ResponseEntity<ApiResponse<List<SubscriptionPlanResponse>>> getAllPlansAdmin() {
        return ResponseEntity.ok(ApiResponse.ok(
                "Danh sách gói học (Admin)", adminSubscriptionService.getAllPlansAdmin()));
    }

    @PostMapping("/plans")
    @Operation(summary = "Tạo mới gói dịch vụ")
    public ResponseEntity<ApiResponse<SubscriptionPlanResponse>> createPlan(
            @Valid @RequestBody AdminSubscriptionPlanDTO.CreatePlanRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(
                "Tạo gói học thành công", adminSubscriptionService.createPlan(request)));
    }

    @PutMapping("/plans/{id}")
    @Operation(summary = "Cập nhật thông tin gói dịch vụ")
    public ResponseEntity<ApiResponse<SubscriptionPlanResponse>> updatePlan(
            @PathVariable Long id,
            @Valid @RequestBody AdminSubscriptionPlanDTO.CreatePlanRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Cập nhật gói học thành công", adminSubscriptionService.updatePlan(id, request)));
    }

    @PatchMapping("/plans/{id}/status")
    @Operation(summary = "Bật/Tắt ẩn gói dịch vụ")
    public ResponseEntity<ApiResponse<SubscriptionPlanResponse>> togglePlanStatus(
            @PathVariable Long id,
            @RequestParam(required = false) Boolean isActive) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Cập nhật trạng thái gói học thành công", adminSubscriptionService.togglePlanStatus(id, isActive)));
    }

    @DeleteMapping("/plans/{id}")
    @Operation(summary = "Xóa gói dịch vụ")
    public ResponseEntity<ApiResponse<Void>> deletePlan(@PathVariable Long id) {
        adminSubscriptionService.deletePlan(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa gói học thành công", null));
    }

    @PostMapping("/grant-vip")
    @Operation(summary = "Cấp quyền VIP thủ công cho học viên theo email")
    public ResponseEntity<ApiResponse<SubscriptionResponse>> grantVipManual(
            @Valid @RequestBody AdminSubscriptionPlanDTO.GrantVipRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Cấp quyền VIP thành công", adminSubscriptionService.grantVipManual(request)));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Lấy chỉ số thống kê doanh thu và lượt đăng ký VIP")
    public ResponseEntity<ApiResponse<AdminSubscriptionPlanDTO.AnalyticsResponse>> getAnalytics() {
        return ResponseEntity.ok(ApiResponse.ok(
                "Thống kê doanh thu", adminSubscriptionService.getAnalytics()));
    }
}
