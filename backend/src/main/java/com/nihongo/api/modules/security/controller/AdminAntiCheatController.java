package com.nihongo.api.modules.security.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.security.dto.AntiCheatDTO;
import com.nihongo.api.modules.security.service.AntiCheatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/anti-cheat")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Anti-Cheat & Security Console", description = "Giám sát an ninh mạng, phát hiện gian lận & chặn Hack Bot")
public class AdminAntiCheatController {

    private final AntiCheatService antiCheatService;

    @GetMapping("/logs")
    @Operation(summary = "Lấy danh sách nhật ký vi phạm gian lận mới nhất")
    public ResponseEntity<ApiResponse<List<AntiCheatDTO.CheatLogResponse>>> getLogs() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy nhật ký an ninh thành công", antiCheatService.getRecentLogs()));
    }

    @GetMapping("/overview")
    @Operation(summary = "Lấy chỉ số tổng quan hệ thống an ninh")
    public ResponseEntity<ApiResponse<AntiCheatDTO.SecurityOverviewResponse>> getOverview() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy tổng quan an ninh thành công", antiCheatService.getSecurityOverview()));
    }

    @PostMapping("/logs/{id}/action")
    @Operation(summary = "Xử lý hành động đối với tài khoản nghi vấn (Cảnh cáo, Khóa tài khoản, Bỏ qua)")
    public ResponseEntity<ApiResponse<AntiCheatDTO.CheatLogResponse>> takeAction(
            @PathVariable Long id,
            @Valid @RequestBody AntiCheatDTO.ResolveActionRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật xử lý an ninh thành công", antiCheatService.takeAction(id, request)));
    }
}
