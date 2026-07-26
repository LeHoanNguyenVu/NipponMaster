package com.nihongo.api.modules.speaking.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.speaking.dto.*;
import com.nihongo.api.modules.speaking.service.SpeakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/speaking")
@RequiredArgsConstructor
public class SpeakingController {

    private final SpeakingService speakingService;

    @GetMapping("/scenarios")
    public ResponseEntity<ApiResponse<List<SpeakingScenarioResponse>>> getScenarios() {
        List<SpeakingScenarioResponse> scenarios = speakingService.getScenarios();
        return ResponseEntity.ok(ApiResponse.ok("Danh sách kịch bản hội thoại", scenarios));
    }

    @PostMapping("/start")
    public ResponseEntity<ApiResponse<SpeakingScenarioResponse>> startScenario(
            @RequestBody SpeakingScenarioRequest request) {
        SpeakingScenarioResponse response = speakingService.startScenario(request);
        return ResponseEntity.ok(ApiResponse.ok("Bắt đầu kịch bản thành công", response));
    }

    @PostMapping("/turn")
    public ResponseEntity<ApiResponse<SpeakingTurnResponse>> processTurn(
            @RequestBody SpeakingTurnRequest request) {
        SpeakingTurnResponse response = speakingService.processTurn(request);
        return ResponseEntity.ok(ApiResponse.ok("Xử lý lượt nói thành công", response));
    }
}
