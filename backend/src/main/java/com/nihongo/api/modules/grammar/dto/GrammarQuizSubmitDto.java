package com.nihongo.api.modules.grammar.dto;

import lombok.*;
import java.util.Map;

public class GrammarQuizSubmitDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private Map<Long, String> answers; // quizId -> answer
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Integer score; // 0..100
        private Boolean passed; // score >= 85
        private Integer totalQuestions;
        private Integer correctCount;
        private Integer starsEarned;
        private Long nextLessonId;
        private Boolean unlockedNextLesson;
    }
}

