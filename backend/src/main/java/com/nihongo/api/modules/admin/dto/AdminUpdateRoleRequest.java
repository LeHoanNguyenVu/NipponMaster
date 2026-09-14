package com.nihongo.api.modules.admin.dto;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdminUpdateRoleRequest {
    @NotNull(message = "Role không được để trống")
    private User.Role role;
}
