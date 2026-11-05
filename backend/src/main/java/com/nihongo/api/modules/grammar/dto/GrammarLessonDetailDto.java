package com.nihongo.api.modules.grammar.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLessonDetailDto {
    private Long id;
    private String levelCode;
    private Integer lessonNumber;
    private Integer partNumber;
    private Integer sortOrder;
    private String titleVi;
    private String titleJa;
    private String videoId;
    private String durationStr;
    private Integer durationSec;

    // Tiến độ người dùng
    private Boolean isUnlocked;
    private Boolean isPassed;
    private Integer highestScore;
    private Integer starsEarned;
    private Integer lastWatchSec;
    private String lastWatchTimeStr;

    // 3 Tab nội dung
    private List<TimestampItemDto> timestamps;
    private List<CheatsheetItemDto> cheatsheets;
    private List<QuizItemDto> quizzes;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimestampItemDto {
        private Long id;
        private Integer timeSec;
        private String timeStr;
        private String pattern;
        private String title;
        private String summary;
        private Integer sortOrder;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CheatsheetItemDto {
        private Long id;
        private String pattern;
        private String badge;
        private String meaning;
        private String structure;
        private String nuance;
        private Object examples; // parsed from JSON
        private Integer sortOrder;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizItemDto {
        private Long id;
        private String quizType; // 'MCQ' | 'STAR'
        private String prompt;
        private String leftSentence;
        private String rightSentence;
        private Integer starIndex;
        private Object fragments; // parsed from JSON
        private Object options;   // parsed from JSON
        private String correctAnswer;
        private String explanation;
        private Integer sortOrder;
    }
}

