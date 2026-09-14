package com.nihongo.api.modules.security.dto;

import com.nihongo.api.modules.security.entity.AntiCheatLog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class AntiCheatDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CheatLogResponse {
        private Long id;
        private Long userId;
        private String username;
        private String ipAddress;
        private AntiCheatLog.ActivityType activityType;
        private String activityTypeName;
        private Integer confidenceScore;
        private String detailReason;
        private AntiCheatLog.ActionTaken actionTaken;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SecurityOverviewResponse {
        private long totalThreatsDetected;
        private long flaggedUsersCount;
        private long suspendedUsersCount;
        private int systemSecurityScore; // e.g. 98/100
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResolveActionRequest {
        private AntiCheatLog.ActionTaken action;
    }
}
