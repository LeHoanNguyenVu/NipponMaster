package com.nihongo.api.modules.jlpt.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity lưu lịch sử thi của người dùng.
 * Mỗi lần làm bài thi sẽ tạo 1 bản ghi ExamResult.
 */
@Entity
@Table(name = "exam_results")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    /** Điểm đạt được */
    @Column(nullable = false)
    private Integer score;

    /** Tổng điểm tối đa */
    @Column(name = "total_score", nullable = false)
    private Integer totalScore;

    /** Số câu đúng */
    @Column(name = "correct_count", nullable = false)
    private Integer correctCount;

    /** Tổng số câu hỏi */
    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    /** Thời gian hoàn thành (giây) */
    @Column(name = "completion_time_seconds")
    private Integer completionTimeSeconds;

    /** Đáp án người dùng chọn, lưu dạng JSON: {"1":"A","2":"C",...} */
    @Column(name = "user_answers", columnDefinition = "TEXT")
    private String userAnswers;
}
