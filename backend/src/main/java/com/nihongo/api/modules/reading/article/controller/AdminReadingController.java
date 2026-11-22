package com.nihongo.api.modules.reading.article.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AdminArticleSummaryDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AudioGenerationResultDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.IngestReportDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository;
import com.nihongo.api.modules.reading.article.service.ReadingIngestService;
import com.nihongo.api.modules.reading.article.service.ReadingTtsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoint quản trị Module Luyện Đọc Báo Nhật:
 * - Chạy tay pipeline ingest (bảo vệ bằng quyền ADMIN để tránh lạm dụng quota Gemini/TTS).
 * - Xem danh sách bài chờ duyệt (REVIEW), duyệt xuất bản (PUBLISHED -> tự sinh audio TTS) hoặc từ chối (REJECTED).
 * - Sinh / sinh lại audio TTS cho từng phiên bản bài đọc (có thể đổi giọng Kore/Puck).
 */
@RestController
@RequestMapping("/api/v1/admin/reading")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminReadingController {

    private final ReadingIngestService ingestService;
    private final ReadingArticleRepository repository;
    private final ReadingTtsService ttsService;

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
            @RequestParam(required = false) Boolean needsReview,
            @RequestParam(defaultValue = "20") int limit
    ) {
        List<AdminArticleSummaryDto> articles = repository.listArticlesForAdmin(status, needsReview, limit);
        return ResponseEntity.ok(ApiResponse.ok("Danh sách bài đọc quản trị", articles));
    }

    @PostMapping("/articles/{id}/publish")
    public ResponseEntity<ApiResponse<AdminArticleSummaryDto>> publishArticle(
            @PathVariable Long id,
            @RequestParam(defaultValue = "true") boolean generateAudio
    ) {
        AdminArticleSummaryDto updated = repository.updateArticleStatus(id, "PUBLISHED");
        if (generateAudio) {
            ttsService.generateAudioForArticleAsync(id);
        }
        return ResponseEntity.ok(ApiResponse.ok("Đã xuất bản bài đọc", updated));
    }

    @PostMapping("/articles/{id}/reject")
    public ResponseEntity<ApiResponse<AdminArticleSummaryDto>> rejectArticle(@PathVariable Long id) {
        AdminArticleSummaryDto updated = repository.updateArticleStatus(id, "REJECTED");
        return ResponseEntity.ok(ApiResponse.ok("Đã từ chối bài đọc", updated));
    }

    @PostMapping("/articles/{id}/reclassify")
    public ResponseEntity<ApiResponse<AdminArticleSummaryDto>> reclassifyArticle(@PathVariable Long id) {
        AdminArticleSummaryDto updated = ingestService.reclassifyArticle(id);
        return ResponseEntity.ok(ApiResponse.ok("Đã phân loại lại cấp độ JLPT cho bài đọc", updated));
    }

    @PostMapping("/versions/{id}/audio")
    public ResponseEntity<ApiResponse<AudioGenerationResultDto>> generateVersionAudio(
            @PathVariable Long id,
            @RequestParam(required = false) String voice,
            @RequestParam(defaultValue = "false") boolean force
    ) {
        AudioGenerationResultDto result = ttsService.generateAudioForVersion(id, voice, force);
        return ResponseEntity.ok(ApiResponse.ok("Xử lý sinh audio TTS hoàn tất", result));
    }
}
