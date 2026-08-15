package com.nihongo.api.modules.security.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.security.dto.AntiCheatDTO;
import com.nihongo.api.modules.security.entity.AntiCheatLog;
import com.nihongo.api.modules.security.repository.AntiCheatLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AntiCheatServiceImpl implements AntiCheatService {

    private final AntiCheatLogRepository antiCheatLogRepository;
    private final UserRepository userRepository;

    @jakarta.annotation.PostConstruct
    public void purgeSampleLogs() {
        if (antiCheatLogRepository.count() > 0) {
            antiCheatLogRepository.deleteAll();
            log.info("🧹 Purged sample anti-cheat logs from database table anti_cheat_logs.");
        }
    }

    @Override
    public List<AntiCheatDTO.CheatLogResponse> getRecentLogs() {
        List<AntiCheatLog> logs = antiCheatLogRepository.findTop50ByOrderByCreatedAtDesc();
        return logs.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public AntiCheatDTO.SecurityOverviewResponse getSecurityOverview() {
        long total = antiCheatLogRepository.count();
        long flagged = antiCheatLogRepository.countByActionTaken(AntiCheatLog.ActionTaken.FLAGGED);
        long suspended = antiCheatLogRepository.countByActionTaken(AntiCheatLog.ActionTaken.ACCOUNT_SUSPENDED);

        return AntiCheatDTO.SecurityOverviewResponse.builder()
                .totalThreatsDetected(total)
                .flaggedUsersCount(flagged)
                .suspendedUsersCount(suspended)
                .systemSecurityScore(total == 0 ? 100 : Math.max(70, (int) (100 - (flagged * 5 + suspended * 10))))
                .build();
    }

    @Override
    @Transactional
    public AntiCheatDTO.CheatLogResponse takeAction(Long logId, AntiCheatDTO.ResolveActionRequest request) {
        AntiCheatLog logEntry = antiCheatLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("AntiCheatLog", logId));

        logEntry.setActionTaken(request.getAction());
        antiCheatLogRepository.save(logEntry);

        if (request.getAction() == AntiCheatLog.ActionTaken.ACCOUNT_SUSPENDED && logEntry.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(logEntry.getUserId());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setIsActive(false);
                userRepository.save(user);
                log.warn("Tài khoản {} (ID={}) bị tạm khóa do phát hiện gian lận!", user.getEmail(), user.getId());
            }
        }

        return mapToResponse(logEntry);
    }

    @Override
    @Transactional
    public void recordSuspiciousActivity(Long userId, String username, String ipAddress,
                                          AntiCheatLog.ActivityType type, int confidenceScore, String reason) {
        AntiCheatLog logEntry = AntiCheatLog.builder()
                .userId(userId)
                .username(username)
                .ipAddress(ipAddress != null ? ipAddress : "127.0.0.1")
                .activityType(type)
                .confidenceScore(confidenceScore)
                .detailReason(reason)
                .actionTaken(confidenceScore >= 90 ? AntiCheatLog.ActionTaken.FLAGGED : AntiCheatLog.ActionTaken.WARNING_SENT)
                .build();

        antiCheatLogRepository.save(logEntry);
        log.warn("🚨 [ANTI-CHEAT ALERT] Detected {} by user={} (score={}%): {}", type, username, confidenceScore, reason);
    }

    private AntiCheatDTO.CheatLogResponse mapToResponse(AntiCheatLog log) {
        return AntiCheatDTO.CheatLogResponse.builder()
                .id(log.getId())
                .userId(log.getUserId())
                .username(log.getUsername())
                .ipAddress(log.getIpAddress())
                .activityType(log.getActivityType())
                .activityTypeName(getActivityTypeName(log.getActivityType()))
                .confidenceScore(log.getConfidenceScore())
                .detailReason(log.getDetailReason())
                .actionTaken(log.getActionTaken())
                .createdAt(log.getCreatedAt())
                .build();
    }

    private String getActivityTypeName(AntiCheatLog.ActivityType type) {
        if (type == null) return "Không xác định";
        return switch (type) {
            case IMPOSSIBLE_SPEED -> "⚡ Tốc độ siêu nhiên (<0.3s)";
            case BOT_TYPING_PATTERN -> "🤖 Mẫu gõ phím Bot tự động";
            case RATE_LIMIT_EXCEEDED -> "🚫 Spam API vượt giới hạn";
            case SCRIPT_USER_AGENT -> "🌐 User-Agent bất thường của Script";
        };
    }
}
