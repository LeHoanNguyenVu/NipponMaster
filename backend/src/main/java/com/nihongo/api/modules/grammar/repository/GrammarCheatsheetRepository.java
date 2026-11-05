package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarCheatsheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrammarCheatsheetRepository extends JpaRepository<GrammarCheatsheet, Long> {
    List<GrammarCheatsheet> findByLessonIdOrderBySortOrderAsc(Long lessonId);
}

