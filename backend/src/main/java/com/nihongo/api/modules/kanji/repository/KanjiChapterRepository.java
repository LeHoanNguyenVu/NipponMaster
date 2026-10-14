package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KanjiChapterRepository extends JpaRepository<KanjiChapter, Long> {

    List<KanjiChapter> findByJlptLevelOrderByDisplayOrderAsc(String jlptLevel);

    Optional<KanjiChapter> findByJlptLevelAndChapterNumber(String jlptLevel, Integer chapterNumber);
}
