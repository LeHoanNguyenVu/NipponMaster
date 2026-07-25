package com.nihongo.api.modules.teacher.dto;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateClassroomRequest {
    @NotBlank(message = "Tên lớp học không được để trống")
    private String name;

    private String description;

    private User.JlptLevel level = User.JlptLevel.N5;

    private Integer maxStudents = 50;
}
