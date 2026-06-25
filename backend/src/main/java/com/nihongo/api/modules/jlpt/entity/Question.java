package com.nihongo.api.modules.jlpt.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity câu hỏi trong đề thi JLPT.
 * Hỗ trợ 4 đáp án (A, B, C, D) và đáp án đúng.
 */
@Entity
@Table(name = "questions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question extends BaseEntity {

    /** Nội dung câu hỏi */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /** Đáp án A */
    @Column(name = "option_a", nullable = false, length = 500)
    private String optionA;

    /** Đáp án B */
    @Column(name = "option_b", nullable = false, length = 500)
    private String optionB;

    /** Đáp án C */
    @Column(name = "option_c", nullable = false, length = 500)
    private String optionC;

    /** Đáp án D */
    @Column(name = "option_d", nullable = false, length = 500)
    private String optionD;

    /** Đáp án đúng: A, B, C, D */
    @Column(name = "correct_answer", nullable = false, length = 1)
    private String correctAnswer;

    /** Giải thích đáp án */
    @Column(columnDefinition = "TEXT")
    private String explanation;

    /** Điểm cho câu hỏi này */
    @Builder.Default
    private Integer score = 1;

    /** Thứ tự câu hỏi trong đề */
    @Column(name = "order_index")
    private Integer orderIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;
}
