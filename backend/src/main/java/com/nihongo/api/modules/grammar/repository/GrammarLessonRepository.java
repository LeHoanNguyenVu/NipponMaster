package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
public interface GrammarLessonRepository extends JpaRepository<GrammarLesson, Long> {

    List<GrammarLesson> findByLevel_LevelCodeAndIsActiveTrueOrderBySortOrderAsc(String levelCode);

    Optional<GrammarLesson> findByLevel_LevelCodeAndSortOrder(String levelCode, Integer sortOrder);

    @Query("SELECT l FROM GrammarLesson l WHERE l.level.levelCode = :levelCode AND l.sortOrder = :sortOrder + 1")
    Optional<GrammarLesson> findNextLesson(@Param("levelCode") String levelCode, @Param("sortOrder") Integer sortOrder);

    @Query("SELECT l FROM GrammarLesson l WHERE l.level.levelCode = :levelCode AND l.sortOrder = :sortOrder - 1")
    Optional<GrammarLesson> findPrevLesson(@Param("levelCode") String levelCode, @Param("sortOrder") Integer sortOrder);
}

