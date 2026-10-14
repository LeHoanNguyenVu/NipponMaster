package com.nihongo.api.modules.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiSubmitRequestDto {
    private Integer score;
    private Integer totalQuestions;
    private Integer correctCount;
    private Map<String, String> answers;
}
