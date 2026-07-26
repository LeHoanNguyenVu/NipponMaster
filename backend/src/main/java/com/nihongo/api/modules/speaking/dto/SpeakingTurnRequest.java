package com.nihongo.api.modules.speaking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpeakingTurnRequest {
    private String scenarioId;
    private String userMessage;
    private List<ConversationEntry> conversationHistory;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConversationEntry {
        private String role; // "user" or "ai"
        private String message;
    }
}
