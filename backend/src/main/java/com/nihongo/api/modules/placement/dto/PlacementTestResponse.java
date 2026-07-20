package com.nihongo.api.modules.placement.dto;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.placement.entity.PlacementQuestion;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * DTO trả về thông tin bài Placement Test theo level:
 * danh sách câu hỏi + thời gian làm bài (phút) tương ứng.
 */
@Data
@Builder
public class PlacementTestResponse {

    private User.JlptLevel level;

    /**
     * Thời gian làm bài (phút): N5=15, N4=20, N3=25, N2/N1=30.
     */
    private int timeLimitMinutes;

    private int totalQuestions;

    private List<QuestionDto> questions;

    @Data
    @Builder
    public static class QuestionDto {
        private Long id;
        private PlacementQuestion.Section section;
        private String questionText;
        /** Danh sách 4 đáp án A/B/C/D (không kèm đáp án đúng). */
        private List<String> options;
        private int displayOrder;
    }
}
