package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiMinigame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiMinigameRepository extends JpaRepository<KanjiMinigame, Long> {

    List<KanjiMinigame> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);
}
