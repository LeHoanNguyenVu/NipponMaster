package com.nihongo.api.modules.security.repository;

import com.nihongo.api.modules.security.entity.AntiCheatLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AntiCheatLogRepository extends JpaRepository<AntiCheatLog, Long> {

    List<AntiCheatLog> findTop50ByOrderByCreatedAtDesc();

    long countByActionTaken(AntiCheatLog.ActionTaken actionTaken);
}
