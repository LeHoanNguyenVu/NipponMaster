package com.nihongo.api.modules.security.service;

import com.nihongo.api.modules.security.dto.AntiCheatDTO;
import com.nihongo.api.modules.security.entity.AntiCheatLog;

import java.util.List;

public interface AntiCheatService {

    List<AntiCheatDTO.CheatLogResponse> getRecentLogs();

    AntiCheatDTO.SecurityOverviewResponse getSecurityOverview();

    AntiCheatDTO.CheatLogResponse takeAction(Long logId, AntiCheatDTO.ResolveActionRequest request);

    void recordSuspiciousActivity(Long userId, String username, String ipAddress,
                                  AntiCheatLog.ActivityType type, int confidenceScore, String reason);
}
