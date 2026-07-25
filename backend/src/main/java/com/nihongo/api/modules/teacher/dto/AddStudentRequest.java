package com.nihongo.api.modules.teacher.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddStudentRequest {
    @NotBlank(message = "Email học viên không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
}
