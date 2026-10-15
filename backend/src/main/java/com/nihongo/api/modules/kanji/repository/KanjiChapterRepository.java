package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface KanjiChapterRepository extends JpaRepository<KanjiChapter, Long> {

    List<KanjiChapter> findByJlptLevelOrderByDisplayOrderAsc(String jlptLevel);

    Optional<KanjiChapter> findByJlptLevelAndChapterNumber(String jlptLevel, Integer chapterNumber);
}
