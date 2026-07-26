package com.nihongo.api.modules.speaking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpeakingScenarioRequest {
    private String scenarioId;
    private String level; // N5, N4, N3, N2, N1
}
