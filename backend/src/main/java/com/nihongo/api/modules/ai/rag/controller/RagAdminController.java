package com.nihongo.api.modules.ai.rag.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk;
import com.nihongo.api.modules.ai.rag.service.KnowledgeSearchService;
import com.nihongo.api.modules.ai.rag.service.KnowledgeSyncService;
import com.nihongo.api.modules.ai.rag.service.RagEvaluationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai/rag")
@RequiredArgsConstructor
public class RagAdminController {

    private final KnowledgeSyncService syncService;
    private final KnowledgeSearchService searchService;
    private final RagEvaluationService evaluationService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<KnowledgeChunk.StatsResponse>> stats() {
        return ResponseEntity.ok(ApiResponse.ok("Thống kê kho tri thức RAG", syncService.getStats()));
    }

    @PostMapping("/sync")
    public ResponseEntity<ApiResponse<Object>> sync(
            @RequestParam(required = false) String sourceType,
            @RequestParam(defaultValue = "false") boolean async) {
        if (async) {
            if (syncService.isSyncRunning()) {
                return ResponseEntity.accepted().body(ApiResponse.ok(
                        "Quá trình đồng bộ RAG đang chạy nền.",
                        Map.of("syncRunning", true)));
            }
            CompletableFuture.runAsync(() -> {
                try {
                    syncService.sync(sourceType);
                } catch (Exception e) {
                    log.error("Lỗi đồng bộ RAG chạy nền: {}", e.getMessage(), e);
                }
            });
            return ResponseEntity.accepted().body(ApiResponse.ok(
                    "Đã khởi chạy đồng bộ RAG ở chế độ nền. Theo dõi qua /api/v1/ai/rag/stats.",
                    Map.of("syncRunning", true)));
        }

        KnowledgeChunk.SyncReport report = syncService.sync(sourceType);
        return ResponseEntity.ok(ApiResponse.ok("Đồng bộ tri thức RAG hoàn tất", report));
    }

    @PostMapping("/sync/stop")
    public ResponseEntity<ApiResponse<Object>> stopSync() {
        boolean stopped = syncService.stopSync();
        return ResponseEntity.ok(ApiResponse.ok(
                stopped ? "Đã gửi yêu cầu dừng đồng bộ RAG." : "Hiện không có tiến trình đồng bộ RAG nào đang chạy.",
                Map.of("stopped", stopped)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<KnowledgeChunk.SearchResponse>> search(
            @RequestParam String q,
            @RequestParam(required = false) String level,
            @RequestParam(defaultValue = "5") int topK) {
        KnowledgeChunk.SearchResponse response = searchService.search(q, level, topK);
        return ResponseEntity.ok(ApiResponse.ok("Tìm kiếm thành công", response));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<RagEvaluationService.BenchmarkReport>> evaluate() {
        return ResponseEntity.ok(ApiResponse.ok("Hoàn tất đánh giá bộ 30 câu chuẩn RAG", evaluationService.evaluateAll()));
    }
}
