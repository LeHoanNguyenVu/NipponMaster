package com.nihongo.api.modules.placement.controller;

import com.nihongo.api.modules.placement.dto.OnboardingRequest;
import com.nihongo.api.modules.placement.service.PlacementTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller xử lý việc hoàn tất Onboarding cho học viên mới.
 * Chốt targetLevel và nâng role từ GUEST → STUDENT.
 */
@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
@Tag(name = "User Onboarding", description = "API hoàn tất onboarding và chốt level học tập của học viên")
public class UserOnboardingController {

    private final PlacementTestService placementTestService;

    /**
     * Hoàn tất onboarding: lưu targetLevel và đánh dấu onboardingCompleted = true.
     * Đồng thời nâng role GUEST → STUDENT.
     */
    @PutMapping("/onboarding")
    @Operation(summary = "Hoàn tất Onboarding học viên",
               description = "Chốt targetLevel, đánh dấu onboardingCompleted=true và nâng role GUEST→STUDENT",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, Object>> completeOnboarding(
            @Valid @RequestBody OnboardingRequest request) {
        placementTestService.completeOnboarding(request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Onboarding hoàn tất! Chào mừng bạn trở thành học viên NipponMaster.",
                "targetLevel", request.getTargetLevel().name()
        ));
    }
}
