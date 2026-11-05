package com.nihongo.api.modules.grammar.dto;

import lombok.*;

public class GrammarWatchProgressDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private Integer timeSec;
        private String timeStr;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long lessonId;
        private Integer lastWatchSec;
        private String lastWatchTimeStr;
    }
}

