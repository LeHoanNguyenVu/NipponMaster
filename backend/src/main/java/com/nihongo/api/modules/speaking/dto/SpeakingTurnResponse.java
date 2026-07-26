package com.nihongo.api.modules.speaking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakingTurnResponse {
    private String aiReply;
    private String aiReplyReading;
    private String aiReplyMeaning;
    private List<CorrectionItem> corrections;
    private ScoreBreakdown score;
    private List<String> suggestedNextPhrases;
    private boolean conversationComplete;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CorrectionItem {
        private String original;
        private String corrected;
        private String explanation;
        private String type; // "grammar", "vocabulary", "pronunciation"
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreBreakdown {
        private int pronunciation;  // 0-100
        private int grammar;        // 0-100
        private int vocabulary;     // 0-100
        private int overall;        // 0-100
        private String feedback;
    }
}
