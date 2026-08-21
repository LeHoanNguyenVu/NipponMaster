package com.nihongo.api.modules.listening.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.listening.dto.ListeningScenarioDTO.*;
import com.nihongo.api.modules.listening.service.ListeningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listening")
@RequiredArgsConstructor
public class ListeningController {

    private final ListeningService listeningService;

    @GetMapping("/scenarios")
    public ResponseEntity<ApiResponse<List<ScenarioSummary>>> getScenarios(
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword) {
        List<ScenarioSummary> scenarios = listeningService.getScenarios(level, category, keyword);
        return ResponseEntity.ok(ApiResponse.ok("Danh sách kịch bản luyện nghe", scenarios));
    }

    @GetMapping("/scenarios/{id}")
    public ResponseEntity<ApiResponse<ScenarioDetail>> getScenarioDetail(@PathVariable String id) {
        ScenarioDetail detail = listeningService.getScenarioDetail(id);
        return ResponseEntity.ok(ApiResponse.ok("Chi tiết kịch bản luyện nghe", detail));
    }

    @PostMapping("/submit-session")
    public ResponseEntity<ApiResponse<SubmitResponse>> submitSession(@RequestBody SubmitRequest request) {
        SubmitResponse response = listeningService.submitSession(request);
        return ResponseEntity.ok(ApiResponse.ok("Nộp kết quả bài nghe thành công", response));
    }
}
