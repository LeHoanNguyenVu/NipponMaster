package com.nihongo.api.modules.auth.service;

import com.nihongo.api.modules.auth.dto.*;

/**
 * Interface cho Auth Service.
 * Tách interface giúp dễ dàng viết unit test (mock) và thay đổi implementation.
 */
public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse socialLogin(SocialLoginRequest request);

    UserResponse getCurrentUser(Long userId);

    void changePassword(Long userId, ChangePasswordRequest request);

    UserResponse updateAvatar(Long userId, String avatarUrl);

    void logout(String token);
}
