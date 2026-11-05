package com.nihongo.api.modules.grammar.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLessonSummaryDto {
    private Long id;
    private String levelCode;
    private Integer lessonNumber;
    private Integer partNumber;
    private Integer sortOrder;
    private String titleVi;
    private String titleJa;
    private String videoId;
    private String durationStr;
    private Integer durationSec;
    private Boolean isUnlocked;
    private Boolean isPassed;
    private Integer highestScore;
    private Integer starsEarned;
    private Integer lastWatchSec;
    private String lastWatchTimeStr;
}

