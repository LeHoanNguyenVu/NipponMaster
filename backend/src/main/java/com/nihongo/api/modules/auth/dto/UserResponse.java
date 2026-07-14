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
        String roleStr = user.getRole() == User.Role.USER ? User.Role.STUDENT.name() : user.getRole().name();
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .jlptLevel(user.getJlptLevel() != null ? user.getJlptLevel().name() : null)
                .role(roleStr)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
