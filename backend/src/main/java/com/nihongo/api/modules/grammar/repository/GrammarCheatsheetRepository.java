package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarCheatsheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface GrammarCheatsheetRepository extends JpaRepository<GrammarCheatsheet, Long> {
    List<GrammarCheatsheet> findByLessonIdOrderBySortOrderAsc(Long lessonId);
}

