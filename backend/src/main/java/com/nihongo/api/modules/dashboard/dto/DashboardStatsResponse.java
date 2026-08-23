package com.nihongo.api.modules.dashboard.dto;

import com.nihongo.api.modules.flashcard.entity.Flashcard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO chứa thông tin thống kê tiến trình học tập chuẩn xác cho Dashboard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private String jlptLevel;
    private String targetLevel;
    private long vocabLearned;
    private long vocabTotal;
    private long kanjiLearned;
    private long kanjiTotal;
    private long grammarLearned;
    private long grammarTotal;
    private int listeningCompleted;
    private int listeningTotal;
    private int battleWins;
    private int battleTotal;
    private int weeklyStudyMinutes;
    private int todayXp;
    private int dueCardCount;
    private int streakDays;
    private List<Flashcard> dueCards;
}
