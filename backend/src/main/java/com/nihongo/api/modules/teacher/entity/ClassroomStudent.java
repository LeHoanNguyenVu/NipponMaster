package com.nihongo.api.modules.teacher.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity liên kết Học viên vào Lớp học.
 */
@Entity
@Table(name = "classroom_students", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"classroom_id", "student_id"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomStudent extends BaseEntity {

    @Column(name = "classroom_id", nullable = false)
    private Long classroomId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "joined_at", nullable = false)
    @Builder.Default
    private LocalDateTime joinedAt = LocalDateTime.now();
}
