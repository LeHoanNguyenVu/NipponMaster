package com.nihongo.api.modules.teacher.dto;

import com.nihongo.api.modules.teacher.entity.Classroom;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ClassroomResponse {
    private Long id;
    private String name;
    private String description;
    private String level;
    private Long teacherId;
    private String joinCode;
    private Integer maxStudents;
    private long studentCount;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public static ClassroomResponse from(Classroom classroom, long studentCount) {
        return ClassroomResponse.builder()
                .id(classroom.getId())
                .name(classroom.getName())
                .description(classroom.getDescription())
                .level(classroom.getLevel() != null ? classroom.getLevel().name() : "N5")
                .teacherId(classroom.getTeacherId())
                .joinCode(classroom.getJoinCode())
                .maxStudents(classroom.getMaxStudents())
                .studentCount(studentCount)
                .isActive(classroom.getIsActive())
                .createdAt(classroom.getCreatedAt())
                .build();
    }
}
