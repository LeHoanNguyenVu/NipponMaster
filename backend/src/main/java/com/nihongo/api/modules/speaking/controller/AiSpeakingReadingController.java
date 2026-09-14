package com.nihongo.api.modules.speaking.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.reading.dto.SentenceBreakdownDTO;
import com.nihongo.api.modules.reading.service.SentenceBreakdownService;
import com.nihongo.api.modules.speaking.dto.PitchAccentDTO;
import com.nihongo.api.modules.speaking.service.PitchAccentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Speaking & Reading Studios", description = "API Pitch Accent Shadowing & JLPT Sentence Breakdown Studio")
public class AiSpeakingReadingController {

    private final PitchAccentService pitchAccentService;
    private final SentenceBreakdownService sentenceBreakdownService;

    @GetMapping("/speaking/pitch-accent")
    @Operation(summary = "Phân tích quy luật Pitch Accent của từ/câu tiếng Nhật")
    public ResponseEntity<ApiResponse<PitchAccentDTO.PitchAccentResponse>> getPitchAccent(
            @RequestParam(defaultValue = "さくら") String text) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Phân tích Pitch Accent thành công", pitchAccentService.analyzePitchAccent(text)));
    }

    @PostMapping("/speaking/evaluate-pitch")
    @Operation(summary = "AI Chấm điểm phát âm sóng âm giọng đọc học viên (Shadowing)")
    public ResponseEntity<ApiResponse<PitchAccentDTO.EvaluatePitchResponse>> evaluatePitch(
            @Valid @RequestBody PitchAccentDTO.EvaluatePitchRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Đánh giá phát âm thành công", pitchAccentService.evaluatePitchRecording(request)));
    }

    @PostMapping("/reading/sentence-breakdown")
    @Operation(summary = "AI Phân tích cú pháp bài đọc JLPT, chèn Furigana & tách Chủ/Vị ngữ")
    public ResponseEntity<ApiResponse<SentenceBreakdownDTO.BreakdownResponse>> breakdownSentence(
            @Valid @RequestBody SentenceBreakdownDTO.BreakdownRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Phân tích cú pháp câu thành công", sentenceBreakdownService.analyzeSentenceBreakdown(request)));
    }
}
