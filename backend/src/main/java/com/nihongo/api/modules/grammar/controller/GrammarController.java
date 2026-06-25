package com.nihongo.api.modules.grammar.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.service.GrammarService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/grammars")
@RequiredArgsConstructor
public class GrammarController {

    private final GrammarService grammarService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Grammar>>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(grammarService.getAll(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Grammar>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(grammarService.getById(id)));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<PageResponse<Grammar>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(grammarService.getByLevel(level, pageable)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<Grammar>>> search(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(grammarService.search(keyword, pageable)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Grammar>> create(@RequestBody Grammar grammar) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo ngữ pháp thành công", grammarService.create(grammar)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        grammarService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa ngữ pháp thành công", null));
    }
}
