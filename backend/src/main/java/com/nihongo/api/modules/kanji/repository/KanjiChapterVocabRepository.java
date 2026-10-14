package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiChapterVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiChapterVocabRepository extends JpaRepository<KanjiChapterVocab, Long> {

    List<KanjiChapterVocab> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);
}
