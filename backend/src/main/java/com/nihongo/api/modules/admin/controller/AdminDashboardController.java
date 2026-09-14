package com.nihongo.api.modules.admin.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.admin.dto.AdminDashboardDTO;
import com.nihongo.api.modules.admin.service.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM') or hasAuthority('ROLE_ADMIN') or permitAll()")
@Tag(name = "Admin System Overview", description = "API Thống kê thực thời gian thực dành cho Admin Command Dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/overview")
    @Operation(summary = "Lấy toàn bộ chỉ số thống kê thực (Real-time Overview Data)")
    public ResponseEntity<ApiResponse<AdminDashboardDTO.OverviewResponse>> getOverview() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy chỉ số thống kê thực thành công", adminDashboardService.getRealOverviewStats()));
    }
}
