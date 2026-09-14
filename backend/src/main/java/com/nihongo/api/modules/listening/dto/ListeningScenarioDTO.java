package com.nihongo.api.modules.listening.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

public class ListeningScenarioDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScenarioSummary {
        private String id;
        private String title;
        private String titleJp;
        private String level; // N5, N4, N3, N2, N1
        private String category; // DINING, TRAVEL, WORK, HEALTH, SHOPPING, LIFE
        private int durationMin;
        private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED
        private String ambienceType; // KONBINI, RAMEN, STATION, CLINIC, OFFICE, CAFE, STREET
        private String characterName;
        private String characterRole;
        private String characterAvatar;
        private String description;
        private int keyVocabCount;
        private int totalTurns;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScenarioDetail {
        private ScenarioSummary summary;
        private String initialNodeId;
        private Map<String, DialogueNode> nodes;
        private List<KeyVocabulary> keyVocabularies;
        private List<String> grammarPoints;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DialogueNode {
        private String nodeId;
        private String speaker; // NPC, USER, ANNOUNCER
        private String speakerName;
        private String japaneseText;
        private String furiganaText;
        private String romajiText;
        private String vietnameseText;
        private String audioSpeedHint; // SLOW, NORMAL, FAST
        private String culturalNote;
        private List<DialogueOption> options;
        private ListeningQuiz quiz;
        private boolean isEnding;
        private String endingType; // SUCCESS, EXCELLENT, RETRY
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DialogueOption {
        private String optionId;
        private String japaneseText;
        private String romajiText;
        private String vietnameseText;
        private String nextNodeId;
        private String etiquetteRating; // PERFECT, POLITE, CASUAL, RUDE
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ListeningQuiz {
        private String quizId;
        private String questionJp;
        private String questionVi;
        private List<String> options;
        private int correctAnswerIndex;
        private String explanation;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class KeyVocabulary {
        private String word;
        private String reading;
        private String meaning;
        private String level;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubmitRequest {
        private String scenarioId;
        private List<String> visitedNodeIds;
        private int quizCorrectCount;
        private int quizTotalCount;
        private int etiquetteScoreTotal;
        private int durationSeconds;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubmitResponse {
        private String scenarioId;
        private int totalScore;
        private int listeningAccuracyPercent;
        private int etiquetteScorePercent;
        private int earnedXp;
        private int earnedCoins;
        private String performanceRank; // S, A, B, C
        private String badgeUnlocked;
        private String feedbackMessage;
    }
}
