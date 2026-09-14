package com.nihongo.api.modules.teacher.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeacherStatsResponse {
    private long totalClasses;
    private long totalStudents;
    private long lessonsCreated;
    private double averageRating;
    private int teachingHours;
}
