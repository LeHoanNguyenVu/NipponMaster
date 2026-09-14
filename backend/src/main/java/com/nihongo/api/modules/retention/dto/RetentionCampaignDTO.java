package com.nihongo.api.modules.retention.dto;

import com.nihongo.api.modules.retention.entity.RetentionCampaign;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class RetentionCampaignDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CampaignResponse {
        private Long id;
        private String name;
        private RetentionCampaign.TriggerType triggerType;
        private String emailSubject;
        private String emailTemplateBody;
        private Integer sentCount;
        private Integer convertedCount;
        private Boolean isActive;
        private LocalDateTime lastRunAt;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RunCampaignResponse {
        private Long campaignId;
        private String campaignName;
        private int scannedInactiveCount;
        private int emailSentCount;
        private String message;
        private List<String> targetStudentEmails;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RetentionAnalyticsResponse {
        private long totalEmailsSent;
        private long totalStudentsReengaged;
        private double reengagementConversionRate; // e.g. 34.2%
        private int activeCampaignsCount;
    }
}
