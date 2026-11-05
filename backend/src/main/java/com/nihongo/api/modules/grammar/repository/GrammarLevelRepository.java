package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarLevelRepository extends JpaRepository<GrammarLevel, String> {
}

