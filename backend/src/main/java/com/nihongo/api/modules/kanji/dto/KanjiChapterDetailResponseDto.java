package com.nihongo.api.modules.kanji.dto;

import com.nihongo.api.modules.kanji.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiChapterDetailResponseDto {
    private KanjiChapter chapter;
    private List<Kanji> kanjis;
    private List<KanjiChapterVocab> vocabularies;
    private List<KanjiExercise> readingExercises;
    private List<KanjiExercise> writingExercises;
    private List<KanjiMinigame> minigames;
    private UserKanjiProgress userProgress;
}
