package com.nihongo.api.modules.subscription.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO cho request tạo checkout / mua gói.
 */
@Data
public class CreateCheckoutRequest {

    @NotNull(message = "Plan ID không được để trống")
    private Long planId;
}
