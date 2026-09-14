package com.nihongo.api.modules.admin.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdminUpdateStatusRequest {
    @NotNull(message = "Trạng thái isActive không được để trống")
    private Boolean isActive;
}
