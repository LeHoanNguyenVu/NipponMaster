package com.nihongo.api.modules.kanji.dto;

import com.nihongo.api.modules.kanji.entity.KanjiAchievementTest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiRoadmapResponseDto {
    private String level;
    private Integer totalChapters;
    private Integer completedChapters;
    private Integer totalKanji;
    private Integer learnedKanji;
    private List<KanjiRoadmapChapterDto> chapters;
    private List<KanjiAchievementTest> achievementTests;
}
