package com.nihongo.api.modules.auth.service;

import com.nihongo.api.modules.auth.dto.*;

/**
 * Interface cho Auth Service.
 * Tách interface giúp dễ dàng viết unit test (mock) và thay đổi implementation.
 */
public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserResponse getCurrentUser(Long userId);
}
