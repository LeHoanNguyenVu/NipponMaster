package com.nihongo.api.modules.placement.controller;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.placement.dto.PlacementResultResponse;
import com.nihongo.api.modules.placement.dto.PlacementSubmitRequest;
import com.nihongo.api.modules.placement.dto.PlacementTestResponse;
import com.nihongo.api.modules.placement.entity.PlacementResult;
import com.nihongo.api.modules.placement.service.PlacementTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller cung cấp API Placement Test theo cấp độ JLPT.
 */
@RestController
@RequestMapping("/api/v1/placement-test")
@RequiredArgsConstructor
@Tag(name = "Placement Test", description = "API bài kiểm tra đánh giá trình độ JLPT (N5-N1)")
public class PlacementTestController {

    private final PlacementTestService placementTestService;

    /**
     * Lấy bộ câu hỏi + thời gian làm bài theo cấp độ JLPT.
     * Endpoint PUBLIC — không cần JWT để xem trước cấu trúc đề thi,
     * nhưng để SUBMIT phải đăng nhập.
     */
    @GetMapping("/questions")
    @Operation(summary = "Lấy bộ đề thi theo level JLPT",
               description = "Trả về danh sách câu hỏi và thời gian giới hạn theo cấp độ N5/N4/N3/N2/N1")
    public ResponseEntity<PlacementTestResponse> getQuestions(
            @RequestParam User.JlptLevel level) {
        return ResponseEntity.ok(placementTestService.getQuestions(level));
    }

    /**
     * Nộp bài và nhận kết quả chấm điểm + giải thích từng câu.
     */
    @PostMapping("/submit")
    @Operation(summary = "Nộp bài và nhận kết quả Placement Test",
               description = "Chấm điểm tự động, đề xuất level phù hợp và trả về giải thích chi tiết từng câu",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<PlacementResultResponse> submitTest(
            @Valid @RequestBody PlacementSubmitRequest request) {
        return ResponseEntity.ok(placementTestService.submitTest(request));
    }

    /**
     * Xem lịch sử các lần thi Placement Test của học viên hiện tại.
     */
    @GetMapping("/history")
    @Operation(summary = "Xem lịch sử bài Placement Test",
               description = "Trả về danh sách các bài test đã thực hiện, mới nhất trước",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<PlacementResult>> getHistory() {
        return ResponseEntity.ok(placementTestService.getHistory());
    }
}
