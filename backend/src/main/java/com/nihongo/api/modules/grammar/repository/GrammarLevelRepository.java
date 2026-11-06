package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarLevel;
import org.springframework.data.jpa.repository.JpaRepository;
public interface GrammarLevelRepository extends JpaRepository<GrammarLevel, String> {
}

