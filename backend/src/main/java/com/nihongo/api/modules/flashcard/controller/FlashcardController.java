package com.nihongo.api.modules.flashcard.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.flashcard.dto.FlashcardItemDto;
import com.nihongo.api.modules.flashcard.service.FlashcardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcards")
@RequiredArgsConstructor
@Tag(name = "Flashcard", description = "Các API ôn tập Flashcard và Quick Practice SRS")
public class FlashcardController {

    private final FlashcardService flashcardService;

    @GetMapping({"/quick-practice", "/practice", ""})
    @Operation(summary = "Lấy danh sách Flashcard luyện tập nhanh", description = "Trả về danh sách thẻ học (Kanji, Romaji, Nghĩa, Mẹo nhớ) theo cấp độ JLPT")
    public ResponseEntity<ApiResponse<List<FlashcardItemDto>>> getQuickPracticeCards(
            @RequestParam(required = false, defaultValue = "N5") String level,
            @RequestParam(required = false, defaultValue = "30") Integer limit) {
        List<FlashcardItemDto> cards = flashcardService.getQuickPracticeCards(level, limit != null ? limit : 30);
        return ResponseEntity.ok(ApiResponse.ok(cards));
    }
}
