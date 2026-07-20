package com.nihongo.api.modules.auth.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đại diện cho người dùng trong hệ thống.
 * Lưu trữ thông tin đăng nhập, hồ sơ cá nhân và trình độ tiếng Nhật.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    /**
     * Trình độ JLPT hiện tại: N5, N4, N3, N2, N1
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level")
    @Builder.Default
    private JlptLevel jlptLevel = JlptLevel.N5;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.GUEST;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    /**
     * Trình độ JLPT mục tiêu mà học viên đăng ký học (N5-N1).
     * Được chốt sau khi hoàn tất luồng Onboarding.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "target_level")
    private JlptLevel targetLevel;

    /**
     * Đánh dấu học viên đã hoàn thành bước Onboarding chưa.
     * false = lần đầu đăng nhập, cần đi qua Onboarding Hub.
     */
    @Column(name = "onboarding_completed")
    @Builder.Default
    private Boolean onboardingCompleted = false;

    public enum Role {
        ADMIN, STUDENT, TEACHER, GUEST, USER
    }

    public enum JlptLevel {
        N5, N4, N3, N2, N1
    }
}
