package com.nihongo.api.modules.vocabulary.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Vocabulary>>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(vocabularyService.getAll(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vocabulary>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(vocabularyService.getById(id)));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<PageResponse<Vocabulary>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(vocabularyService.getByLevel(level, pageable)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<Vocabulary>>> search(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) User.JlptLevel level,
            @RequestParam(required = false) Vocabulary.WordType wordType,
            @PageableDefault(size = 9) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(vocabularyService.searchWithFilters(keyword, level, wordType, pageable)));
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
}
