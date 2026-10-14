package com.nihongo.api.modules.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiRoadmapChapterDto {
    private Long id;
    private Integer chapterNumber;
    private String jlptLevel;
    private String titleJa;
    private String titleVi;
    private String titleEn;
    private Integer kanjiCount;
    private Integer displayOrder;
    private String illustrationUrl;
    private String description;
    
    // User progress fields
    private Boolean isUnlocked;
    private Integer highestScore;
    private Boolean isPassed;
}
