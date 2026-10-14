package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity lưu tiến độ học, điểm thi thật và trạng thái mở khóa của học viên theo từng chương.
 */
@Entity
@Table(name = "user_kanji_progress", uniqueConstraints = {
    @UniqueConstraint(name = "uq_user_kanji_progress", columnNames = {"user_id", "chapter_id"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserKanjiProgress extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    /** Trạng thái đã mở khóa để học hay chưa */
    @Column(name = "is_unlocked", nullable = false)
    @Builder.Default
    private Boolean isUnlocked = false;

    /** Điểm số cao nhất đạt được trong bài test ôn tập (0 - 100) */
    @Column(name = "highest_score", nullable = false)
    @Builder.Default
    private Integer highestScore = 0;

    /** Đã vượt qua chương (đạt điểm >= 85%) hay chưa */
    @Column(name = "is_passed", nullable = false)
    @Builder.Default
    private Boolean isPassed = false;

    /** Thời điểm vượt qua bài test */
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
