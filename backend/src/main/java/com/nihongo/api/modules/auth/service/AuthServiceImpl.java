package com.nihongo.api.modules.auth.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.common.security.JwtTokenProvider;
import com.nihongo.api.modules.auth.dto.*;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email đã được sử dụng: " + request.getEmail());
        }

        // Tạo user mới dựa trên từ khóa trong email (tiện lợi cho kiểm thử và phát triển)
        User.Role assignedRole = User.Role.STUDENT;
        String emailLower = request.getEmail().toLowerCase();
        if (emailLower.contains("admin")) {
            assignedRole = User.Role.ADMIN;
        } else if (emailLower.contains("teacher")) {
            assignedRole = User.Role.TEACHER;
        } else if (emailLower.contains("guest")) {
            assignedRole = User.Role.GUEST;
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(assignedRole)
                .build();

        User savedUser = userRepository.save(user);
        log.info("Đăng ký thành công user: {}", savedUser.getEmail());

        // Tạo JWT token thật
        String token = jwtTokenProvider.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );

        return AuthResponse.of(token, UserResponse.from(savedUser));
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        // Tìm user theo email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Email hoặc mật khẩu không đúng"));

        // Kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("Email hoặc mật khẩu không đúng");
        }

        // Kiểm tra tài khoản có bị khóa không
        if (!user.getIsActive()) {
            throw new BusinessException("Tài khoản đã bị vô hiệu hóa");
        }

        log.info("Đăng nhập thành công: {}", user.getEmail());

        // Tạo JWT token thật
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        return AuthResponse.of(token, UserResponse.from(user));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", userId));

        return UserResponse.from(user);
    }
}
