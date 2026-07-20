package com.nihongo.api.modules.placement.dto;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * DTO nhận từ client khi học viên nộp bài Placement Test.
 */
@Data
public class PlacementSubmitRequest {

    @NotNull(message = "Vui lòng chọn cấp độ JLPT muốn test")
    private User.JlptLevel level;

    /**
     * Danh sách câu trả lời của học viên.
     */
    @NotEmpty(message = "Danh sách câu trả lời không được để trống")
    private List<AnswerItem> answers;

    @Data
    public static class AnswerItem {
        /** ID của câu hỏi. */
        @NotNull
        private Long questionId;

        /**
         * Lựa chọn học viên chọn (0=A, 1=B, 2=C, 3=D).
         * -1 nếu bỏ trống / không trả lời.
         */
        @NotNull
        private Integer chosenOption;
    }
}
