package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KanjiExerciseRepository extends JpaRepository<KanjiExercise, Long> {

    List<KanjiExercise> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);

    List<KanjiExercise> findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(Long chapterId, String exerciseType);
}
