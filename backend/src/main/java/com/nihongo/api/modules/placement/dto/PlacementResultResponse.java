package com.nihongo.api.modules.placement.dto;

import com.nihongo.api.modules.auth.entity.User.JlptLevel;
import com.nihongo.api.modules.placement.entity.PlacementQuestion.Section;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * DTO trả về kết quả bài thi sau khi nộp bài:
 * điểm số, đề xuất level, nhận xét, và chi tiết đáp án từng câu.
 */
@Data
@Builder
public class PlacementResultResponse {

    private Long resultId;

    /** Level bài test vừa làm. */
    private JlptLevel targetLevel;

    /** Số câu đúng. */
    private int score;

    /** Tổng số câu. */
    private int totalQuestions;

    /** % điểm (0.0 - 100.0). */
    private double scorePercent;

    /** Level được đề xuất cho học viên. */
    private JlptLevel recommendedLevel;

    /** Nhận xét đánh giá tổng quan. */
    private String overallFeedback;

    /** Đề xuất hành động (ví dụ: "Đăng ký học N4 ngay!", "Thử sức với N3!"). */
    private String actionSuggestion;

    /** Tóm tắt chẩn đoán kỹ năng. */
    private String diagnosticSummary;

    /** Lý do cụ thể vì sao hạ/giữ/tăng level. */
    private String levelDropReason;

    /** Level bài test đề xuất làm lại nếu muốn đo lại chính xác. */
    private JlptLevel recommendedTestLevel;

    /**
     * Điểm từng phần: VOCAB, GRAMMAR, READING.
     * Ví dụ: {"VOCAB": {"correct": 4, "total": 6}, ...}
     */
    private Map<Section, SectionScore> sectionScores;

    /** Chi tiết từng câu hỏi kèm đáp án và giải thích. */
    private List<QuestionReviewDto> questionReviews;

    private LocalDateTime completedAt;

    @Data
    @Builder
    public static class SectionScore {
        private int correct;
        private int total;
        private double percent;
    }

    @Data
    @Builder
    public static class QuestionReviewDto {
        private Long questionId;
        private Section section;
        private String questionText;
        private List<String> options;
        /** Đáp án học viên chọn (0-3), -1 nếu bỏ trống. */
        private int chosenOption;
        /** Đáp án đúng (0-3). */
        private int correctOption;
        private boolean isCorrect;
        /** Giải thích chi tiết lý do đáp án đúng. */
        private String explanation;
    }
}
