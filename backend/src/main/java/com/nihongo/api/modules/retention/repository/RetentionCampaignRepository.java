package com.nihongo.api.modules.retention.repository;

import com.nihongo.api.modules.retention.entity.RetentionCampaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RetentionCampaignRepository extends JpaRepository<RetentionCampaign, Long> {

    Optional<RetentionCampaign> findByTriggerType(RetentionCampaign.TriggerType triggerType);
}
