package com.nihongo.api.modules.grammar.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLevelDto {
    private String levelCode;
    private String curriculumName;
    private Integer totalLessons;
    private String description;
    private Integer unlockedCount;
    private Integer passedCount;
}

