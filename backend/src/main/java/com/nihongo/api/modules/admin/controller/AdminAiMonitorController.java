package com.nihongo.api.modules.admin.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.ai.core.AiMetricsService;
import com.nihongo.api.modules.ai.core.AiMetricsService.AiMetricsSnapshot;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.StatsResponse;
import com.nihongo.api.modules.ai.rag.service.KnowledgeSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** Endpoint giám sát hiệu năng Module AI & RAG cho trang Admin. */
@RestController
@RequestMapping("/api/v1/admin/ai")
@RequiredArgsConstructor
public class AdminAiMonitorController {

    private final AiMetricsService metricsService;
    private final KnowledgeSyncService syncService;

    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMetrics() {
        AiMetricsSnapshot metrics = metricsService.getSnapshot();
        StatsResponse ragStats = syncService.getStats();
        return ResponseEntity.ok(ApiResponse.ok("Thống kê hiệu năng AI & RAG", Map.of(
                "metrics", metrics,
                "ragStats", ragStats
        )));
    }
}

