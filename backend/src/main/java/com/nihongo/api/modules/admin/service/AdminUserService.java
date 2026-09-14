package com.nihongo.api.modules.admin.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.admin.dto.AdminUserDTO;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public PageResponse<AdminUserDTO> getUsers(User.Role role, Boolean isActive, String search, Pageable pageable) {
        Specification<User> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (role != null) {
                predicates.add(cb.equal(root.get("role"), role));
            }
            if (isActive != null) {
                predicates.add(cb.equal(root.get("isActive"), isActive));
            }
            if (search != null && !search.trim().isEmpty()) {
                String keyword = "%" + search.trim().toLowerCase() + "%";
                Predicate emailLike = cb.like(cb.lower(root.get("email")), keyword);
                Predicate nameLike = cb.like(cb.lower(root.get("fullName")), keyword);
                predicates.add(cb.or(emailLike, nameLike));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<User> page = userRepository.findAll(spec, pageable);
        return PageResponse.from(page.map(AdminUserDTO::fromEntity));
    }

    @Transactional(readOnly = true)
    public AdminUserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", id));
        return AdminUserDTO.fromEntity(user);
    }

    @Transactional
    public AdminUserDTO updateUserStatus(Long id, Boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", id));
        user.setIsActive(isActive);
        User saved = userRepository.save(user);
        log.info("Admin cập nhật trạng thái user ID={}: isActive={}", id, isActive);
        return AdminUserDTO.fromEntity(saved);
    }

    @Transactional
    public AdminUserDTO updateUserRole(Long id, User.Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", id));
        user.setRole(role);
        User saved = userRepository.save(user);
        log.info("Admin cập nhật role user ID={}: newRole={}", id, role);
        return AdminUserDTO.fromEntity(saved);
    }

    @Transactional
    public void resetUserPassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", id));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info("Admin đặt lại mật khẩu thành công cho user ID={}", id);
    }

    @Transactional
    public void bulkUpdateStatus(List<Long> userIds, Boolean isActive) {
        List<User> users = userRepository.findAllById(userIds);
        users.forEach(u -> u.setIsActive(isActive));
        userRepository.saveAll(users);
        log.info("Admin cập nhật hàng loạt trạng thái cho {} users: isActive={}", users.size(), isActive);
    }
}
