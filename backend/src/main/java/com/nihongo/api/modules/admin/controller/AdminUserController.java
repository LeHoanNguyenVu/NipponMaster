package com.nihongo.api.modules.admin.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.admin.dto.AdminResetPasswordRequest;
import com.nihongo.api.modules.admin.dto.AdminUpdateRoleRequest;
import com.nihongo.api.modules.admin.dto.AdminUpdateStatusRequest;
import com.nihongo.api.modules.admin.dto.AdminUserDTO;
import com.nihongo.api.modules.admin.service.AdminUserService;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AdminUserDTO>>> getUsers(
            @RequestParam(required = false) User.Role role,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(adminUserService.getUsers(role, isActive, search, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminUserDTO>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(adminUserService.getUserById(id)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AdminUserDTO>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody AdminUpdateStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái tài khoản thành công",
                adminUserService.updateUserStatus(id, request.getIsActive())));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<ApiResponse<AdminUserDTO>> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody AdminUpdateRoleRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Phân quyền tài khoản thành công",
                adminUserService.updateUserRole(id, request.getRole())));
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @PathVariable Long id,
            @Valid @RequestBody AdminResetPasswordRequest request) {
        adminUserService.resetUserPassword(id, request.getNewPassword());
        return ResponseEntity.ok(ApiResponse.ok("Đặt lại mật khẩu thành công", null));
    }

    @PutMapping("/bulk-status")
    public ResponseEntity<ApiResponse<Void>> bulkStatus(@RequestBody BulkStatusRequest req) {
        adminUserService.bulkUpdateStatus(req.getUserIds(), req.getIsActive());
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật hàng loạt tài khoản thành công", null));
    }

    @Data
    public static class BulkStatusRequest {
        private List<Long> userIds;
        private Boolean isActive;
    }
}
