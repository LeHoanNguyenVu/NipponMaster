package com.nihongo.api.modules.teacher.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đại diện cho Lớp học do Giảng viên (Teacher) tạo và quản lý.
 */
@Entity
@Table(name = "classrooms")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Classroom extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private User.JlptLevel level = User.JlptLevel.N5;

    @Column(name = "teacher_id", nullable = false)
    private Long teacherId;

    /**
     * Mã ngẫu nhiên duy nhất dùng để học viên nhập vào đăng ký lớp (ví dụ: CLASS-N5-8912)
     */
    @Column(name = "join_code", nullable = false, unique = true, length = 50)
    private String joinCode;

    @Column(name = "max_students")
    @Builder.Default
    private Integer maxStudents = 50;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
