package com.nihongo.api.modules.reading.article.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AdminArticleSummaryDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.IngestReportDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository;
import com.nihongo.api.modules.reading.article.service.ReadingIngestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoint quản trị Module Luyện Đọc Báo Nhật:
 * - Chạy tay pipeline ingest (bảo vệ bằng quyền ADMIN để tránh lạm dụng quota Gemini/TTS).
 * - Xem danh sách bài chờ duyệt (REVIEW) và duyệt xuất bản (PUBLISHED) hoặc từ chối (REJECTED).
 */
@RestController
@RequestMapping("/api/v1/admin/reading")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminReadingController {

    private final ReadingIngestService ingestService;
    private final ReadingArticleRepository repository;

    @PostMapping("/ingest")
    public ResponseEntity<ApiResponse<IngestReportDto>> triggerIngest(
            @RequestParam(required = false) Integer maxEvents,
            @RequestParam(required = false) String source
    ) {
        IngestReportDto report = ingestService.runIngest(maxEvents, source);
        return ResponseEntity.ok(ApiResponse.ok("Chạy pipeline ingest bài đọc hoàn tất", report));
    }

    @GetMapping("/articles")
    public ResponseEntity<ApiResponse<List<AdminArticleSummaryDto>>> listArticles(
            @RequestParam(defaultValue = "REVIEW") String status,
            @RequestParam(defaultValue = "20") int limit
    ) {
        List<AdminArticleSummaryDto> articles = repository.listArticlesForAdmin(status, limit);
        return ResponseEntity.ok(ApiResponse.ok("Danh sách bài đọc quản trị", articles));
    }

    @PostMapping("/articles/{id}/publish")
    public ResponseEntity<ApiResponse<AdminArticleSummaryDto>> publishArticle(@PathVariable Long id) {
        AdminArticleSummaryDto updated = repository.updateArticleStatus(id, "PUBLISHED");
        return ResponseEntity.ok(ApiResponse.ok("Đã xuất bản bài đọc", updated));
    }

    @PostMapping("/articles/{id}/reject")
    public ResponseEntity<ApiResponse<AdminArticleSummaryDto>> rejectArticle(@PathVariable Long id) {
        AdminArticleSummaryDto updated = repository.updateArticleStatus(id, "REJECTED");
        return ResponseEntity.ok(ApiResponse.ok("Đã từ chối bài đọc", updated));
    }
}
