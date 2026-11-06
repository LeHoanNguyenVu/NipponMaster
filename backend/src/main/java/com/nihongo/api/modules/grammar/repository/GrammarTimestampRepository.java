package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface GrammarTimestampRepository extends JpaRepository<GrammarTimestamp, Long> {
    List<GrammarTimestamp> findByLessonIdOrderBySortOrderAsc(Long lessonId);
}

