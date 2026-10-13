package com.nihongo.api.modules.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request cập nhật tùy chọn người dùng (ngôn ngữ, giao diện)")
public class UpdatePreferencesRequest {

    @Schema(description = "Mã ngôn ngữ giao diện ưa thích: 'vi' hoặc 'en'", example = "vi")
    private String preferredLanguage;
}
