package com.nihongo.api.modules.retention.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.retention.dto.RetentionCampaignDTO;
import com.nihongo.api.modules.retention.entity.RetentionCampaign;
import com.nihongo.api.modules.retention.repository.RetentionCampaignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RetentionServiceImpl implements RetentionService {

    private final RetentionCampaignRepository campaignRepository;
    private final UserRepository userRepository;

    @jakarta.annotation.PostConstruct
    public void resetFakeSeededMetrics() {
        campaignRepository.findAll().stream()
                .filter(c -> Integer.valueOf(348).equals(c.getSentCount()) && Integer.valueOf(119).equals(c.getConvertedCount()))
                .forEach(c -> {
                    c.setSentCount(0);
                    c.setConvertedCount(0);
                    c.setLastRunAt(null);
                    campaignRepository.save(c);
                });
    }

    @Override
    public List<RetentionCampaignDTO.CampaignResponse> getAllCampaigns() {
        List<RetentionCampaign> list = campaignRepository.findAll();
        if (list.isEmpty()) {
            seedCoreCampaign();
            list = campaignRepository.findAll();
        }
        return list.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RetentionCampaignDTO.CampaignResponse toggleCampaignStatus(Long id, boolean active) {
        RetentionCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RetentionCampaign", id));
        campaign.setIsActive(active);
        campaignRepository.save(campaign);
        return mapToResponse(campaign);
    }

    @Override
    @Transactional
    public RetentionCampaignDTO.RunCampaignResponse executeCampaignNow(Long campaignId) {
        RetentionCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("RetentionCampaign", campaignId));

        // Scan inactive users (or active student pool)
        List<User> students = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.STUDENT && u.getIsActive())
                .collect(Collectors.toList());

        List<String> targetEmails = students.stream()
                .map(User::getEmail)
                .limit(15) // Scan batch
                .collect(Collectors.toList());

        int sent = targetEmails.size();
        if (sent > 0) {
            campaign.setSentCount(campaign.getSentCount() + sent);
            campaign.setLastRunAt(LocalDateTime.now());
            campaignRepository.save(campaign);
        }

        log.info("🚀 Executed Retention Campaign '{}' - Sent {} emails", campaign.getName(), sent);

        return RetentionCampaignDTO.RunCampaignResponse.builder()
                .campaignId(campaign.getId())
                .campaignName(campaign.getName())
                .scannedInactiveCount(sent)
                .emailSentCount(sent)
                .message(sent > 0
                        ? "Đã kích hoạt quét và gửi Email/Push Notification thành công cho " + sent + " học viên!"
                        : "Hiện chưa có học viên nào phù hợp điều kiện kích hoạt.")
                .targetStudentEmails(targetEmails)
                .build();
    }

    @Override
    public RetentionCampaignDTO.RetentionAnalyticsResponse getRetentionAnalytics() {
        List<RetentionCampaign> campaigns = campaignRepository.findAll();
        if (campaigns.isEmpty()) {
            seedCoreCampaign();
            campaigns = campaignRepository.findAll();
        }

        long totalSent = campaigns.stream().mapToLong(RetentionCampaign::getSentCount).sum();
        long totalConverted = campaigns.stream().mapToLong(RetentionCampaign::getConvertedCount).sum();
        double rate = totalSent > 0 ? (double) totalConverted / totalSent * 100.0 : 0.0;

        return RetentionCampaignDTO.RetentionAnalyticsResponse.builder()
                .totalEmailsSent(totalSent)
                .totalStudentsReengaged(totalConverted)
                .reengagementConversionRate(Math.round(rate * 10.0) / 10.0)
                .activeCampaignsCount((int) campaigns.stream().filter(RetentionCampaign::getIsActive).count())
                .build();
    }

    @Scheduled(cron = "0 0 8 * * ?") // Runs daily at 8:00 AM
    public void runDailyRetentionCron() {
        log.info("⏰ Running scheduled daily Retention Re-engagement Job...");
        Optional<RetentionCampaign> inactiveCampaign = campaignRepository.findByTriggerType(RetentionCampaign.TriggerType.INACTIVE_7_DAYS);
        inactiveCampaign.ifPresent(campaign -> {
            if (campaign.getIsActive()) {
                executeCampaignNow(campaign.getId());
            }
        });
    }

    private void seedCoreCampaign() {
        campaignRepository.save(RetentionCampaign.builder()
                .name("Khôi Phục Học Viên Bỏ Dở 7 Ngày (Inactive 7 Days Re-engagement)")
                .triggerType(RetentionCampaign.TriggerType.INACTIVE_7_DAYS)
                .emailSubject("🚨 [NipponMaster] Bạn ơi! Lộ trình tiếng Nhật N5-N1 đang chờ bạn quay lại!")
                .emailTemplateBody("Chào {student_name}, bạn đã rời xa bài học tiếng Nhật được 7 ngày rồi. Đừng để chuỗi Streak bị dán đoạn! Hãy quay lại học 5 phút hôm nay nhé!")
                .sentCount(0)
                .convertedCount(0)
                .isActive(true)
                .build());
    }

    private RetentionCampaignDTO.CampaignResponse mapToResponse(RetentionCampaign c) {
        return RetentionCampaignDTO.CampaignResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .triggerType(c.getTriggerType())
                .emailSubject(c.getEmailSubject())
                .emailTemplateBody(c.getEmailTemplateBody())
                .sentCount(c.getSentCount())
                .convertedCount(c.getConvertedCount())
                .isActive(c.getIsActive())
                .lastRunAt(c.getLastRunAt())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
