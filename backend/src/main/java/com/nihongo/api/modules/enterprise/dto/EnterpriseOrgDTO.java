package com.nihongo.api.modules.enterprise.dto;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class EnterpriseOrgDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateOrgRequest {
        @NotBlank(message = "Tên tổ chức không được để trống")
        private String name;

        @NotBlank(message = "Mã tổ chức không được để trống")
        private String code;

        private String logoUrl;

        @NotNull(message = "Số ghế tối đa không được để trống")
        @Min(value = 1, message = "Số ghế tối thiểu là 1")
        private Integer maxSeats;

        private String contactEmail;
        private String contactPhone;
        private Integer durationDays;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentImportItem {
        private String email;
        private String fullName;
        private User.JlptLevel targetLevel;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BulkImportRequest {
        private List<StudentImportItem> students;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BulkImportResponse {
        private int successCount;
        private int totalRequested;
        private List<String> importedEmails;
        private List<String> failedEmails;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EnterpriseOrgResponse {
        private Long id;
        private String name;
        private String code;
        private String logoUrl;
        private Integer maxSeats;
        private Integer activeSeats;
        private String contactEmail;
        private String contactPhone;
        private LocalDateTime validUntil;
        private Boolean isActive;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnalyticsResponse {
        private long totalOrgsCount;
        private long totalSeatsAllocated;
        private long totalActiveStudents;
        private double avgCompletionRate;
    }
}
