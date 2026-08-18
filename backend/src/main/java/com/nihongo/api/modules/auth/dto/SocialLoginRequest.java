package com.nihongo.api.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO cho đăng nhập 1-Click qua Social OAuth2 (Google, Facebook).
 * Frontend gửi idToken hoặc accessToken từ OAuth2 Provider popup.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLoginRequest {

    /**
     * Nhà cung cấp OAuth2: GOOGLE hoặc FACEBOOK.
     */
    @NotBlank(message = "Provider không được để trống")
    private String provider;

    /**
     * ID Token (Google) hoặc Access Token (Facebook) nhận từ OAuth2 popup.
     */
    @NotBlank(message = "Token xác thực không được để trống")
    private String idToken;

    /**
     * Email người dùng trích xuất từ OAuth2 profile.
     */
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    /**
     * Họ tên đầy đủ từ OAuth2 profile.
     */
    private String fullName;

    /**
     * URL ảnh đại diện từ OAuth2 profile.
     */
    private String avatarUrl;
}
