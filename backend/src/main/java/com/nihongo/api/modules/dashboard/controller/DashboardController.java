package com.nihongo.api.modules.dashboard.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.dashboard.dto.DashboardStatsResponse;
import com.nihongo.api.modules.dashboard.service.DashboardService;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.auth.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Controller cung cấp API lấy thống kê học tập cho Dashboard và đổi role động.
 */
@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("Thống kê dashboard", dashboardService.getStats(userId)));
    }

    @PutMapping("/change-role")
    public ResponseEntity<ApiResponse<UserResponse>> changeRole(
            @AuthenticationPrincipal Long userId,
            @RequestParam User.Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));
        
        user.setRole(role);
        User savedUser = userRepository.save(user);
        
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật vai trò thành công", UserResponse.from(savedUser)));
    }
}
