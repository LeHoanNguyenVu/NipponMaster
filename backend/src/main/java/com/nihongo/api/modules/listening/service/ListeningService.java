package com.nihongo.api.modules.listening.service;

import com.nihongo.api.modules.listening.dto.ListeningScenarioDTO.*;

import java.util.List;

public interface ListeningService {
    List<ScenarioSummary> getScenarios(String level, String category, String keyword);
    ScenarioDetail getScenarioDetail(String id);
    SubmitResponse submitSession(SubmitRequest request);
}
