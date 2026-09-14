package com.nihongo.api.modules.subscription.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrialStatusResponse {
    private boolean isTrial;
    private int dailyVocabLimit;
    private int dailyKanjiLimit;
    private int dailyGrammarLimit;
    private int dailyVocabUsed;
    private int dailyKanjiUsed;
    private int dailyGrammarUsed;
    private boolean subscriptionRequired;
    private String message;
}
