package com.nihongo.api.modules.kanji.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.service.KanjiService;
import com.nihongo.api.modules.subscription.service.ContentAccessService;
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
@RequestMapping("/api/v1/kanjis")
@RequiredArgsConstructor
public class KanjiController {

    private final KanjiService kanjiService;
    private final ContentAccessService contentAccessService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAll(
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<Kanji> page = kanjiService.getAll(pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, null)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Kanji>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(kanjiService.getById(id)));
    }

    @GetMapping("/char/{character}")
    public ResponseEntity<ApiResponse<Kanji>> getByCharacter(@PathVariable String character) {
        return ResponseEntity.ok(ApiResponse.ok(kanjiService.getByCharacter(character)));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<Kanji> page = kanjiService.getByLevel(level, pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, level)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Map<String, Object>>> search(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) User.JlptLevel level,
            @AuthenticationPrincipal Long userId,
            @PageableDefault(size = 9) Pageable pageable) {
        PageResponse<Kanji> page = kanjiService.searchWithFilters(keyword, level, pageable);
        return ResponseEntity.ok(ApiResponse.ok(wrapWithAccess(page, userId, level)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Kanji>> create(@RequestBody Kanji kanji) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo Kanji thành công", kanjiService.create(kanji)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        kanjiService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa Kanji thành công", null));
    }

    private Map<String, Object> wrapWithAccess(PageResponse<Kanji> page, Long userId, User.JlptLevel level) {
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

