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
public class SpeakingScenarioResponse {
    private String id;
    private String title;
    private String titleJp;
    private String description;
    private String icon;
    private String level;
    private String aiGreeting;
    private String aiGreetingReading;
    private List<String> suggestedPhrases;
}
