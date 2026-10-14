package com.nihongo.api.modules.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiSubmitResultDto {
    private Integer score;
    private Boolean isPassed;
    private Boolean unlockedNextChapter;
    private Long nextChapterId;
    private Integer nextChapterNumber;
    private String message;
}
