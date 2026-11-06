package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.UserGrammarProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface UserGrammarProgressRepository extends JpaRepository<UserGrammarProgress, Long> {

    List<UserGrammarProgress> findByUserIdAndLesson_Level_LevelCode(Long userId, String levelCode);

    Optional<UserGrammarProgress> findByUserIdAndLesson_Id(Long userId, Long lessonId);
}

