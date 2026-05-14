package com.nihongo.api.modules.kanji.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.service.KanjiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kanjis")
@RequiredArgsConstructor
public class KanjiController {

    private final KanjiService kanjiService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Kanji>>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(kanjiService.getAll(pageable)));
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
    public ResponseEntity<ApiResponse<PageResponse<Kanji>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(kanjiService.getByLevel(level, pageable)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<Kanji>>> search(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(kanjiService.search(keyword, pageable)));
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
}
