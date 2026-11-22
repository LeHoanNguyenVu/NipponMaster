package com.nihongo.api.modules.reading.article.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import com.nihongo.api.modules.reading.article.service.ReadingArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * API Luyện Đọc Báo Nhật cho học viên (yêu cầu đăng nhập JWT, chỉ trả bài PUBLISHED).
 */
@RestController
@RequestMapping("/api/v1/reading")
@RequiredArgsConstructor
public class ReadingArticleController {

    private final ReadingArticleService readingService;

    @GetMapping("/articles")
    public ResponseEntity<ApiResponse<ReadingArticleListResponse>> listArticles(
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            Authentication authentication
    ) {
        Long userId = extractUserId(authentication);
        ReadingArticleListResponse res = readingService.listPublishedArticles(userId, level, category, page, size);
        return ResponseEntity.ok(ApiResponse.ok("Danh sách bài đọc", res));
    }

    @GetMapping("/versions/{id}")
    public ResponseEntity<ApiResponse<ReadingVersionDetailDto>> getVersionDetail(
            @PathVariable Long id,
            Authentication authentication
    ) {
        Long userId = extractUserId(authentication);
        ReadingVersionDetailDto detail = readingService.getPublishedVersion(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Chi tiết bài đọc", detail));
    }

    @PostMapping("/versions/{id}/complete")
    public ResponseEntity<ApiResponse<CompleteReadingResponse>> completeVersion(
            @PathVariable Long id,
            @RequestBody(required = false) CompleteReadingRequest body,
            Authentication authentication
    ) {
        Long userId = extractUserId(authentication);
        Integer seconds = body != null ? body.getReadingSeconds() : null;
        CompleteReadingResponse res = readingService.completeVersion(id, userId, seconds);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu tiến độ đọc bài", res));
    }

    private Long extractUserId(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) return null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof Long id) return id;
        try {
            return Long.parseLong(principal.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
