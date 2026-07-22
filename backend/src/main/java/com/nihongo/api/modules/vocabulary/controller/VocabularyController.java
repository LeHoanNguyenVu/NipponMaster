package com.nihongo.api.modules.vocabulary.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.subscription.service.ContentAccessService;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;
    private final ContentAccessService contentAccessService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAll(
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<Vocabulary> page = vocabularyService.getAll(pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, null)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vocabulary>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(vocabularyService.getById(id)));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<Vocabulary> page = vocabularyService.getByLevel(level, pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, level)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Map<String, Object>>> search(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) User.JlptLevel level,
            @RequestParam(required = false) Vocabulary.WordType wordType,
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 9) Pageable pageable) {
        PageResponse<Vocabulary> page = vocabularyService.searchWithFilters(keyword, level, wordType, pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, level)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Vocabulary>> create(@RequestBody Vocabulary vocabulary) {
        Vocabulary created = vocabularyService.create(vocabulary);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Tạo từ vựng thành công", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Vocabulary>> update(
            @PathVariable Long id, @RequestBody Vocabulary vocabulary) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thành công", vocabularyService.update(id, vocabulary)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        vocabularyService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa từ vựng thành công", null));
    }

    /**
     * Wrap response với thông tin giới hạn truy cập.
     * accessRestricted = true nếu user chưa mua gói cho level đang xem.
     */
    private Map<String, Object> wrapWithAccess(PageResponse<Vocabulary> page, Long userId, User.JlptLevel level) {
        Map<String, Object> result = new HashMap<>();
        result.put("page", page);

        if (level != null) {
            boolean hasAccess = contentAccessService.hasFullAccess(userId, level);
            result.put("accessRestricted", !hasAccess);
            result.put("previewLimit", hasAccess ? -1 : ContentAccessService.PREVIEW_LIMIT);
        } else {
            result.put("accessRestricted", false);
            result.put("previewLimit", -1);
        }

        return result;
    }
}

