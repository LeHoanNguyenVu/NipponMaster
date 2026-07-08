package com.nihongo.api.modules.dashboard.dto;

import com.nihongo.api.modules.flashcard.entity.Flashcard;
import lombok.Builder;
import lombok.Data;
import java.util.List;

/**
 * DTO chứa thông tin thống kê tiến trình học tập cho Dashboard.
 */
@Data
@Builder
public class DashboardStatsResponse {
    private long vocabLearned;
    private long vocabTotal;
    private long kanjiLearned;
    private long kanjiTotal;
    private long grammarLearned;
    private long grammarTotal;
    private int dueCardCount;
    private int streakDays;
    private List<Flashcard> dueCards;
}
