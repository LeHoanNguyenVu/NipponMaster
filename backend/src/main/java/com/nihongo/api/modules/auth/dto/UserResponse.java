package com.nihongo.api.modules.auth.dto;

import com.nihongo.api.modules.auth.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO trả về thông tin user cho Frontend.
 * KHÔNG bao giờ trả về password.
 */
@Data
@Builder
public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private String avatarUrl;
    private String jlptLevel;
    private String role;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .jlptLevel(user.getJlptLevel().name())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
