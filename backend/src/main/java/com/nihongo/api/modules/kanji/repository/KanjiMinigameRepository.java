package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiMinigame;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KanjiMinigameRepository extends JpaRepository<KanjiMinigame, Long> {

    List<KanjiMinigame> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);
}
