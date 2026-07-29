package com.nihongo.api.modules.subscription.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.subscription.entity.Subscription;
import com.nihongo.api.modules.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service kiểm tra quyền truy cập nội dung theo gói đã mua.
 * Được inject vào các Service khác (VocabularyService, KanjiService...) để filter kết quả.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ContentAccessService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    /** Số items preview tối đa cho user chưa mua gói */
    public static final int PREVIEW_LIMIT = 5;

    /**
     * Kiểm tra user có full access vào level cụ thể không.
     *
     * @param userId ID user (nullable — null = anonymous/guest)
     * @param level  JLPT level cần kiểm tra
     * @return true nếu user có quyền truy cập đầy đủ
     */
    @Transactional(readOnly = true)
    public boolean hasFullAccess(Long userId, User.JlptLevel level) {
        if (userId == null) return false;

        // Admin / Teacher luôn có full access
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && isPrivilegedRole(user.getRole())) {
            return true;
        }

        // Kiểm tra trọn gói
        if (subscriptionRepository.hasActiveFullBundle(userId)) {
            return true;
        }

        // Kiểm tra gói level
        return subscriptionRepository.hasActiveLevelSubscription(userId, level);
    }

    /**
     * Kiểm tra user có bất kỳ subscription active nào không.
     */
    @Transactional(readOnly = true)
    public boolean hasAnyActiveSubscription(Long userId) {
        if (userId == null) return false;

        User user = userRepository.findById(userId).orElse(null);
        if (user != null && isPrivilegedRole(user.getRole())) {
            return true;
        }

        List<Subscription> active = subscriptionRepository.findActiveByUserId(userId);
        return !active.isEmpty();
    }

    /**
     * Tính số lượng items tối đa mà user được xem.
     * -1 = không giới hạn (full access).
     */
    @Transactional(readOnly = true)
    public int getItemLimit(Long userId, User.JlptLevel level) {
        if (hasFullAccess(userId, level)) {
            return -1; // Unlimited
        }
        return PREVIEW_LIMIT;
    }

    private boolean isPrivilegedRole(User.Role role) {
        return role == User.Role.ADMIN || role == User.Role.TEACHER;
    }
}
