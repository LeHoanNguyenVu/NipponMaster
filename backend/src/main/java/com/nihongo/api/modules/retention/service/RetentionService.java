package com.nihongo.api.modules.retention.service;

import com.nihongo.api.modules.retention.dto.RetentionCampaignDTO;

import java.util.List;

public interface RetentionService {

    List<RetentionCampaignDTO.CampaignResponse> getAllCampaigns();

    RetentionCampaignDTO.CampaignResponse toggleCampaignStatus(Long id, boolean active);

    RetentionCampaignDTO.RunCampaignResponse executeCampaignNow(Long campaignId);

    RetentionCampaignDTO.RetentionAnalyticsResponse getRetentionAnalytics();
}
