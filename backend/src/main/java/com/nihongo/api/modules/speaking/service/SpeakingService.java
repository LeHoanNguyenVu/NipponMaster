package com.nihongo.api.modules.speaking.service;

import com.nihongo.api.modules.speaking.dto.*;

import java.util.List;

public interface SpeakingService {
    List<SpeakingScenarioResponse> getScenarios();
    SpeakingScenarioResponse startScenario(SpeakingScenarioRequest request);
    SpeakingTurnResponse processTurn(SpeakingTurnRequest request);
}
