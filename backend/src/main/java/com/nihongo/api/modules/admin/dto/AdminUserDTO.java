package com.nihongo.api.modules.admin.dto;

import com.nihongo.api.modules.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDTO {
    private Long id;
    private String email;
    private String fullName;
    private String avatarUrl;
    private User.Role role;
    private User.JlptLevel jlptLevel;
    private User.JlptLevel targetLevel;
    private Boolean isActive;
    private Boolean onboardingCompleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static AdminUserDTO fromEntity(User user) {
        return AdminUserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .jlptLevel(user.getJlptLevel())
                .targetLevel(user.getTargetLevel())
                .isActive(user.getIsActive())
                .onboardingCompleted(user.getOnboardingCompleted())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
