package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiExerciseRepository extends JpaRepository<KanjiExercise, Long> {

    List<KanjiExercise> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);

    List<KanjiExercise> findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(Long chapterId, String exerciseType);
}
