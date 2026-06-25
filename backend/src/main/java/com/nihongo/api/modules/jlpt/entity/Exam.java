package com.nihongo.api.modules.jlpt.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Entity đề thi JLPT.
 * Mỗi đề thi chứa nhiều câu hỏi (Question).
 */
@Entity
@Table(name = "exams")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exam extends BaseEntity {

    @Column(nullable = false, length = 300)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private User.JlptLevel jlptLevel;

    /** Loại đề: VOCABULARY, GRAMMAR, READING, LISTENING, FULL */
    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type", nullable = false)
    private ExamType examType;

    /** Thời gian làm bài (phút) */
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    /** Tổng điểm tối đa */
    @Column(name = "total_score")
    private Integer totalScore;

    @Column(name = "is_published")
    @Builder.Default
    private Boolean isPublished = false;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();

    public enum ExamType {
        VOCABULARY, GRAMMAR, READING, LISTENING, FULL
    }
}
