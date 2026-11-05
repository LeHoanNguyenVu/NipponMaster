package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrammarQuizRepository extends JpaRepository<GrammarQuiz, Long> {
    List<GrammarQuiz> findByLessonIdOrderBySortOrderAsc(Long lessonId);
}

