package com.nihongo.api.modules.placement.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity lưu lịch sử kết quả bài Placement Test của từng học viên.
 * Dùng để xem lại lịch sử thi và theo dõi tiến bộ theo thời gian.
 */
@Entity
@Table(name = "placement_results")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlacementResult extends BaseEntity {

    /**
     * Học viên thực hiện bài test.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Cấp độ JLPT học viên đã chọn test (N5, N4, N3, N2, N1).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "target_level", nullable = false, length = 5)
    private User.JlptLevel targetLevel;

    /**
     * Số câu trả lời đúng.
     */
    @Column(nullable = false)
    private Integer score;

    /**
     * Tổng số câu hỏi của bài test.
     */
    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    /**
     * Phần trăm điểm (score / totalQuestions * 100).
     */
    @Column(name = "score_percent", nullable = false)
    private Double scorePercent;

    /**
     * Level đề xuất cho học viên dựa trên kết quả:
     * - < 50%: lùi 1 bậc
     * - 50-80%: giữ nguyên level vừa test
     * - > 80%: giữ nguyên hoặc thử level cao hơn
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "recommended_level", length = 5)
    private User.JlptLevel recommendedLevel;

    /**
     * Nhận xét đánh giá chung bằng tiếng Việt.
     */
    @Column(name = "overall_feedback", columnDefinition = "TEXT")
    private String overallFeedback;

    /**
     * Điểm từng phần thi dạng JSON: {"VOCAB": 4, "GRAMMAR": 3, "READING": 2}
     */
    @Column(name = "section_scores_json", columnDefinition = "TEXT")
    private String sectionScoresJson;

    /**
     * Đáp án chi tiết học viên đã chọn dạng JSON:
     * [{"questionId": 1, "chosen": 2, "correct": 1, "isCorrect": false}, ...]
     */
    @Column(name = "answers_json", columnDefinition = "TEXT")
    private String answersJson;
}
