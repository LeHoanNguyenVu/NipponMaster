package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface GrammarQuizRepository extends JpaRepository<GrammarQuiz, Long> {
    List<GrammarQuiz> findByLessonIdOrderBySortOrderAsc(Long lessonId);
}

