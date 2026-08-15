package com.nihongo.api.modules.enterprise.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.enterprise.dto.EnterpriseOrgDTO;
import com.nihongo.api.modules.enterprise.service.AdminEnterpriseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/enterprise")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Enterprise B2B", description = "Quản lý Tổ chức B2B, Trường học & Bulk Import Sinh viên")
public class AdminEnterpriseController {

    private final AdminEnterpriseService enterpriseService;

    @GetMapping("/orgs")
    @Operation(summary = "Lấy danh sách Tổ chức/Trường học B2B")
    public ResponseEntity<ApiResponse<List<EnterpriseOrgDTO.EnterpriseOrgResponse>>> getAllOrgs() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách tổ chức thành công", enterpriseService.getAllOrgs()));
    }

    @PostMapping("/orgs")
    @Operation(summary = "Tạo mới Tổ chức/Trường học B2B")
    public ResponseEntity<ApiResponse<EnterpriseOrgDTO.EnterpriseOrgResponse>> createOrg(
            @Valid @RequestBody EnterpriseOrgDTO.CreateOrgRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Tạo tổ chức B2B thành công", enterpriseService.createOrg(request)));
    }

    @PutMapping("/orgs/{id}")
    @Operation(summary = "Cập nhật thông tin Tổ chức B2B")
    public ResponseEntity<ApiResponse<EnterpriseOrgDTO.EnterpriseOrgResponse>> updateOrg(
            @PathVariable Long id,
            @Valid @RequestBody EnterpriseOrgDTO.CreateOrgRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật tổ chức B2B thành công", enterpriseService.updateOrg(id, request)));
    }

    @DeleteMapping("/orgs/{id}")
    @Operation(summary = "Xóa Tổ chức B2B")
    public ResponseEntity<ApiResponse<Void>> deleteOrg(@PathVariable Long id) {
        enterpriseService.deleteOrg(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa tổ chức B2B thành công", null));
    }

    @PostMapping("/orgs/{id}/bulk-import")
    @Operation(summary = "Import hàng loạt danh sách sinh viên cho Tổ chức B2B")
    public ResponseEntity<ApiResponse<EnterpriseOrgDTO.BulkImportResponse>> bulkImport(
            @PathVariable Long id,
            @RequestBody EnterpriseOrgDTO.BulkImportRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Import sinh viên thành công", enterpriseService.bulkImportStudents(id, request)));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Lấy báo cáo tổng quan B2B Enterprise")
    public ResponseEntity<ApiResponse<EnterpriseOrgDTO.AnalyticsResponse>> getAnalytics() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy báo cáo B2B thành công", enterpriseService.getEnterpriseAnalytics()));
    }
}
