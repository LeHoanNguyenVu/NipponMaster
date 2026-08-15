package com.nihongo.api.modules.retention.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.retention.dto.RetentionCampaignDTO;
import com.nihongo.api.modules.retention.service.RetentionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/retention")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Retention Automation", description = "Tự động hóa giữ chân học viên & Khôi phục học viên bỏ dở")
public class AdminRetentionController {

    private final RetentionService retentionService;

    @GetMapping("/campaigns")
    @Operation(summary = "Lấy danh sách các chiến dịch chăm sóc học viên tự động")
    public ResponseEntity<ApiResponse<List<RetentionCampaignDTO.CampaignResponse>>> getAllCampaigns() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách chiến dịch thành công", retentionService.getAllCampaigns()));
    }

    @PutMapping("/campaigns/{id}/status")
    @Operation(summary = "Bật/Tắt trạng thái hoạt động của chiến dịch")
    public ResponseEntity<ApiResponse<RetentionCampaignDTO.CampaignResponse>> toggleStatus(
            @PathVariable Long id, @RequestParam boolean active) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái chiến dịch thành công", retentionService.toggleCampaignStatus(id, active)));
    }

    @PostMapping("/campaigns/{id}/execute")
    @Operation(summary = "Nút kích hoạt thủ công chạy ngay tức thì chiến dịch quét học viên bỏ dở")
    public ResponseEntity<ApiResponse<RetentionCampaignDTO.RunCampaignResponse>> executeNow(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Kích hoạt chiến dịch thành công", retentionService.executeCampaignNow(id)));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Lấy báo cáo tổng quan chỉ số Re-engagement học viên")
    public ResponseEntity<ApiResponse<RetentionCampaignDTO.RetentionAnalyticsResponse>> getAnalytics() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy báo cáo retention thành công", retentionService.getRetentionAnalytics()));
    }
}
