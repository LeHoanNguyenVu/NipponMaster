package com.nihongo.api.modules.kanji.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.kanji.dto.*;
import com.nihongo.api.modules.kanji.service.KanjiMasterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kanji")
@RequiredArgsConstructor
@Tag(name = "Kanji Master", description = "Các API lộ trình học Kanji Master N5, chi tiết chương và chấm điểm mở khóa")
public class KanjiMasterController {

    private final KanjiMasterService kanjiMasterService;

    private String resolveLevel(String level, jakarta.servlet.http.HttpServletRequest request) {
        if (level != null && !level.isBlank()) {
            return level.toUpperCase();
        }
        if (request != null && request.getRequestURI() != null) {
            String uri = request.getRequestURI().toUpperCase();
            if (uri.contains("/N4/") || uri.endsWith("/N4")) {
                return "N4";
            } else if (uri.contains("/N5/") || uri.endsWith("/N5")) {
                return "N5";
            }
        }
        return null;
    }

    /**
     * Lấy lộ trình Kanji theo cấp độ (Mặc định N5, gồm 15 chương; N4 gồm 9 chương).
     */
    @GetMapping({"/n4/roadmap", "/n5/roadmap", "/{level}/roadmap", "/roadmap"})
    @Operation(summary = "Lộ trình học Kanji", description = "Lấy danh sách các chương, tiến độ thực tế và trạng thái mở khóa của học viên")
    public ResponseEntity<ApiResponse<KanjiRoadmapResponseDto>> getRoadmap(
            @PathVariable(required = false) String level,
            jakarta.servlet.http.HttpServletRequest request,
            @AuthenticationPrincipal Long userId) {
        String targetLevel = resolveLevel(level, request);
        if (targetLevel == null) {
            targetLevel = "N5";
        }
        return ResponseEntity.ok(ApiResponse.ok(kanjiMasterService.getRoadmap(userId, targetLevel)));
    }

    /**
     * Lấy chi tiết nội dung chương (Chữ Hán, từ vựng, câu ngữ cảnh, minigame).
     */
    @GetMapping({"/n4/chapters/{chapterId}", "/n5/chapters/{chapterId}", "/{level}/chapters/{chapterId}", "/chapters/{chapterId}"})
    @Operation(summary = "Chi tiết chương Kanji", description = "Lấy dữ liệu 4 thẻ học: Chữ Hán, Câu ngữ cảnh đọc/viết, Minigame và bài ôn tập")
    public ResponseEntity<ApiResponse<KanjiChapterDetailResponseDto>> getChapterDetail(
            @PathVariable(required = false) String level,
            @PathVariable Long chapterId,
            jakarta.servlet.http.HttpServletRequest request,
            @AuthenticationPrincipal Long userId) {
        String targetLevel = resolveLevel(level, request);
        return ResponseEntity.ok(ApiResponse.ok(kanjiMasterService.getChapterDetail(userId, chapterId, targetLevel)));
    }

    /**
     * Nộp bài kiểm tra ôn tập chương (ふくしゅう) hoặc minigame để tính điểm thật và tự động mở khóa chương tiếp theo.
     */
    @PostMapping({"/n4/chapters/{chapterId}/submit", "/n5/chapters/{chapterId}/submit", "/{level}/chapters/{chapterId}/submit", "/chapters/{chapterId}/submit"})
    @Operation(summary = "Nộp bài kiểm tra chương", description = "Chấm điểm và tự động mở khóa chương sau nếu đạt điểm >= 85%")
    public ResponseEntity<ApiResponse<KanjiSubmitResultDto>> submitChapterTest(
            @PathVariable(required = false) String level,
            @PathVariable Long chapterId,
            jakarta.servlet.http.HttpServletRequest request,
            @AuthenticationPrincipal Long userId,
            @RequestBody KanjiSubmitRequestDto requestBody) {
        String targetLevel = resolveLevel(level, request);
        return ResponseEntity.ok(ApiResponse.ok(kanjiMasterService.submitChapterTest(userId, chapterId, requestBody, targetLevel)));
    }
}
