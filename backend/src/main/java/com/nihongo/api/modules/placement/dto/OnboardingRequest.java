package com.nihongo.api.modules.placement.dto;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO nhận yêu cầu hoàn tất onboarding từ client:
 * chốt targetLevel và đánh dấu onboardingCompleted = true.
 */
@Data
public class OnboardingRequest {

    @NotNull(message = "Vui lòng chọn cấp độ học tập")
    private User.JlptLevel targetLevel;
}
