package com.nihongo.api.modules.subscription.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * DTO trả về danh sách level user được phép truy cập.
 */
@Data
@Builder
public class AccessInfoResponse {

    private String subscriptionStatus; // NONE, ACTIVE, EXPIRED
    private boolean hasFullAccess;
    private List<String> accessibleLevels;
    private int previewLimit; // Số items được xem preview khi chưa mua gói
}
