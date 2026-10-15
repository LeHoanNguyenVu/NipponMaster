package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiChapterVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KanjiChapterVocabRepository extends JpaRepository<KanjiChapterVocab, Long> {

    List<KanjiChapterVocab> findByChapterIdOrderByDisplayOrderAsc(Long chapterId);
}
