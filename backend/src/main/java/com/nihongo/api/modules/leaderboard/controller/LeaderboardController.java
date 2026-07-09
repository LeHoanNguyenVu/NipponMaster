package com.nihongo.api.modules.leaderboard.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.leaderboard.dto.LeaderboardEntry;
import com.nihongo.api.modules.leaderboard.service.LeaderboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller cung cấp API bảng xếp hạng học tập thời gian thực.
 */
@RestController
@RequestMapping("/api/v1/leaderboard")
@RequiredArgsConstructor
@Tag(name = "Leaderboard", description = "Bảng xếp hạng điểm học tập")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping("/top")
    @Operation(summary = "Lấy bảng xếp hạng top N người dùng")
    public ResponseEntity<ApiResponse<List<LeaderboardEntry>>> getTop(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(ApiResponse.ok("Bảng xếp hạng", leaderboardService.getTopN(limit)));
    }

    @GetMapping("/me")
    @Operation(summary = "Lấy thứ hạng và điểm của người dùng hiện tại")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMyRank(
            @AuthenticationPrincipal Long userId) {
        long rank = leaderboardService.getUserRank(userId);
        double score = leaderboardService.getUserScore(userId);
        Map<String, Object> result = Map.of(
                "rank", rank,
                "score", score
        );
        return ResponseEntity.ok(ApiResponse.ok("Thứ hạng của bạn", result));
    }
}
