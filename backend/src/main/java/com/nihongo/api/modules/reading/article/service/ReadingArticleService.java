package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Set;

/**
 * Service phục vụ API đọc báo công khai cho học viên (chỉ trả bài PUBLISHED, validate tham số chặt).
 */
@Service
@RequiredArgsConstructor
public class ReadingArticleService {

    private static final Set<String> VALID_LEVELS = Set.of("N5", "N4", "N3", "N2", "N1");
    private static final Set<String> VALID_CATEGORIES = Set.of(
            "SOCIETY", "LIFE", "ECONOMY", "SCI_TECH", "SPORTS", "CULTURE", "WEATHER"
    );
    private static final int MAX_PAGE_SIZE = 50;

    private final ReadingArticleRepository repository;

    public ReadingArticleListResponse listPublishedArticles(
            Long userId,
            String level,
            String category,
            int page,
            int size
    ) {
        if (page < 0) {
            throw new BusinessException("Tham số page phải >= 0");
        }
        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new BusinessException("Tham số size phải nằm trong khoảng 1.." + MAX_PAGE_SIZE);
        }

        String normalizedLevel = null;
        if (level != null && !level.isBlank() && !"ALL".equalsIgnoreCase(level.trim())) {
            normalizedLevel = level.trim().toUpperCase(Locale.ROOT);
            if (!VALID_LEVELS.contains(normalizedLevel)) {
                throw new BusinessException("Cấp độ JLPT không hợp lệ: " + level);
            }
        }

        String normalizedCategory = null;
        if (category != null && !category.isBlank() && !"ALL".equalsIgnoreCase(category.trim())) {
            normalizedCategory = category.trim().toUpperCase(Locale.ROOT);
            if (!VALID_CATEGORIES.contains(normalizedCategory)) {
                throw new BusinessException("Danh mục chủ đề không hợp lệ: " + category);
            }
        }

        return repository.findPublishedArticles(userId, normalizedLevel, normalizedCategory, page, size);
    }

    public ReadingVersionDetailDto getPublishedVersion(Long versionId, Long userId) {
        return repository.findPublishedVersionDetail(versionId, userId);
    }

    public CompleteReadingResponse completeVersion(Long versionId, Long userId, Integer readingSeconds) {
        if (userId == null) {
            throw new BusinessException("Yêu cầu đăng nhập để lưu tiến độ đọc");
        }
        if (!repository.isPublishedVersion(versionId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc đã xuất bản id=" + versionId);
        }
        int totalCompleted = repository.markVersionCompleted(userId, versionId, readingSeconds);
        return CompleteReadingResponse.builder()
                .versionId(versionId)
                .completed(true)
                .totalCompleted(totalCompleted)
                .build();
    }
}
