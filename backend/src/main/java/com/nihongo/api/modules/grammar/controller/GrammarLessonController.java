package com.nihongo.api.modules.grammar.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.grammar.dto.*;
import com.nihongo.api.modules.grammar.service.GrammarLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grammar-lessons")
@RequiredArgsConstructor
public class GrammarLessonController {

    private final GrammarLessonService grammarLessonService;

    /**
     * Lấy danh sách 5 cấp độ ngữ pháp (N5..N1) kèm thống kê số bài đã mở khóa/đã đạt
     */
    @GetMapping("/levels")
    public ResponseEntity<ApiResponse<List<GrammarLevelDto>>> getLevels(
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(grammarLessonService.getLevels(userId)));
    }

    /**
     * Lấy danh sách bài học theo Cấp độ (N5, N4, N3, N2, N1) kèm trạng thái mở khóa & điểm
     */
    @GetMapping("/levels/{levelCode}")
    public ResponseEntity<ApiResponse<List<GrammarLessonSummaryDto>>> getLessonsByLevel(
            @PathVariable String levelCode,
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(grammarLessonService.getLessonsByLevel(levelCode.toUpperCase(), userId)));
    }

    /**
     * Lấy chi tiết bài học: video_id, 3 Tab (mốc thời gian, công thức cheatsheet, bài test trắc nghiệm & sao)
     */
    @GetMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<GrammarLessonDetailDto>> getLessonDetail(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(grammarLessonService.getLessonDetail(lessonId, userId)));
    }

    /**
     * Nộp bài kiểm tra cuối bài giảng: Chấm điểm tự động, nếu >= 85% sẽ tự động mở khóa bài học kế tiếp
     */
    @PostMapping("/{lessonId}/submit-quiz")
    public ResponseEntity<ApiResponse<GrammarQuizSubmitDto.Response>> submitQuiz(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal Long userId,
            @RequestBody GrammarQuizSubmitDto.Request request) {
        return ResponseEntity.ok(ApiResponse.ok("Chấm điểm bài test thành công", grammarLessonService.submitQuiz(lessonId, userId, request)));
    }

    /**
     * Lấy danh sách câu hỏi & bình luận thảo luận đa chiều (giảng viên + học viên)
     */
    @GetMapping("/{lessonId}/discussions")
    public ResponseEntity<ApiResponse<List<GrammarDiscussionDto>>> getDiscussions(
            @PathVariable Long lessonId) {
        return ResponseEntity.ok(ApiResponse.ok(grammarLessonService.getDiscussions(lessonId)));
    }

    /**
     * Đăng câu hỏi hoặc phản hồi đính kèm ảnh/video
     */
    @PostMapping("/{lessonId}/discussions")
    public ResponseEntity<ApiResponse<GrammarDiscussionDto>> createDiscussion(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal Long userId,
            @RequestBody GrammarDiscussionDto.CreateRequest request) {
        GrammarDiscussionDto created = grammarLessonService.createDiscussion(lessonId, userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Đăng thảo luận thành công", created));
    }

    /**
     * Thả tim / Hữu ích cho thảo luận
     */
    @PostMapping("/discussions/{discussionId}/helpful")
    public ResponseEntity<ApiResponse<Void>> toggleHelpful(
            @PathVariable Long discussionId) {
        grammarLessonService.toggleHelpful(discussionId);
        return ResponseEntity.ok(ApiResponse.ok("Cảm ơn đánh giá của bạn", null));
    }

    /**
     * Xóa bình luận thảo luận (User xóa của chính mình, Giáo viên/Admin có thể xóa mọi bài).
     * Khi xóa bình luận cha, toàn bộ phản hồi con tự động bị xóa theo (Cascade).
     */
    @DeleteMapping("/discussions/{discussionId}")
    public ResponseEntity<ApiResponse<Void>> deleteDiscussion(
            @PathVariable Long discussionId,
            @AuthenticationPrincipal Long userId) {
        grammarLessonService.deleteDiscussion(discussionId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa thảo luận thành công", null));
    }

    /**
     * Lưu tiến độ xem video dở dang (Watch Progress) lên Database để đồng bộ đa thiết bị
     */
    @PostMapping("/{lessonId}/watch-progress")
    public ResponseEntity<ApiResponse<Void>> updateWatchProgress(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal Long userId,
            @RequestBody GrammarWatchProgressDto.Request request) {
        grammarLessonService.updateWatchProgress(lessonId, userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu tiến độ xem video", null));
    }

    /**
     * Upload ảnh/video đính kèm thảo luận lên Supabase Storage CDN thực tế
     */
    @PostMapping(value = "/discussions/upload-media", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<java.util.Map<String, String>>> uploadDiscussionMedia(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        String url = grammarLessonService.uploadDiscussionMedia(file);
        return ResponseEntity.ok(ApiResponse.ok("Tải media lên thành công", java.util.Map.of("url", url)));
    }
}

