package com.nihongo.api.modules.teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class TeacherAnalyticsDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnalyticsOverviewResponse {
        private int totalClassrooms;
        private int totalStudents;
        private double averageClassScore;
        private int atRiskStudentCount;
        private Map<String, Integer> scoreDistribution; // e.g. "90-100": 5, "75-89": 12...
        private List<RecentActivityItem> recentActivities;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentActivityItem {
        private String studentName;
        private String classroomName;
        private String examTitle;
        private double score;
        private LocalDateTime submittedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GradebookStudentItem {
        private Long studentId;
        private String fullName;
        private String email;
        private Long classroomId;
        private String classroomName;
        private Double latestExamScore;
        private Integer completedLessonsPercent;
        private Boolean atRiskWarning;
        private LocalDateTime lastActiveAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClassroomGradebookResponse {
        private Long classroomId;
        private String classroomName;
        private String joinCode;
        private String jlptLevel;
        private int totalStudents;
        private double classAverageScore;
        private double highestScore;
        private double lowestScore;
        private List<GradebookStudentItem> students;
    }
}
