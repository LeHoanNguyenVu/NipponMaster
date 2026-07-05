package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarRepository extends JpaRepository<Grammar, Long> {

    Page<Grammar> findByJlptLevel(User.JlptLevel level, Pageable pageable);

    @Query("SELECT g FROM Grammar g WHERE " +
            "LOWER(g.pattern) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(g.meaning) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Grammar> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT g FROM Grammar g WHERE " +
            "(:level IS NULL OR g.jlptLevel = :level) AND " +
            "(:keyword IS NULL OR :keyword = '' OR " +
            "LOWER(g.pattern) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(g.meaning) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(g.structure) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Grammar> searchWithFilters(
            @Param("keyword") String keyword,
            @Param("level") User.JlptLevel level,
            Pageable pageable);
}
