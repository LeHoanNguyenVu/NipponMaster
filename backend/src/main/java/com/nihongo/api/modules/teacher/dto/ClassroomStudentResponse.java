package com.nihongo.api.modules.teacher.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ClassroomStudentResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String jlptLevel;
    private LocalDateTime joinedAt;
}
