package com.nihongo.api.modules.flashcard.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.flashcard.entity.Flashcard;
import com.nihongo.api.modules.flashcard.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService flashcardService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<PageResponse<Flashcard>>> getByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(flashcardService.getByUser(userId, pageable)));
    }

    @GetMapping("/user/{userId}/due")
    public ResponseEntity<ApiResponse<List<Flashcard>>> getDueCards(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("Danh sách thẻ cần ôn tập", flashcardService.getDueCards(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Flashcard>> create(@RequestBody Flashcard flashcard) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo flashcard thành công", flashcardService.create(flashcard)));
    }

    @PostMapping("/{id}/review")
    public ResponseEntity<ApiResponse<Flashcard>> review(
            @PathVariable Long id,
            @RequestParam int quality) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật tiến trình ôn tập", flashcardService.review(id, quality)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        flashcardService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa flashcard thành công", null));
    }
}
