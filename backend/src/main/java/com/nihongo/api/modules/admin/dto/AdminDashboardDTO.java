package com.nihongo.api.modules.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class AdminDashboardDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OverviewResponse {
        private long totalUsers;
        private long vipStudentsCount;
        private long teacherCount;
        private double cumulativeRevenue; // e.g., in VNĐ
        private long b2bOrgsCount;
        private long b2bTotalSeats;
        private long b2bUsedSeats;
        private int securityHealthScore;

        private List<JlptLevelStat> jlptDistribution;
        private List<MonthlyRevenueStat> monthlyRevenueList;
        private List<ActivityLogItem> activityLogs;

        // Dynamic System Server Telemetry
        private double cpuUsagePercent;
        private long jvmMemoryUsedMb;
        private long jvmMemoryTotalMb;
        private int activeDbConnections;
        private long apiLatencyMs;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JlptLevelStat {
        private String level; // N5, N4, N3, N2, N1
        private long count;
        private double percent;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyRevenueStat {
        private String month;
        private double revenueMillionVnd;
        private long students;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActivityLogItem {
        private Long id;
        private String type; // payment, b2b, exam, security
        private String title;
        private String desc;
        private String timeAgo;
    }
}
