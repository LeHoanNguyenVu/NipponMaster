package com.nihongo.api.modules.jlpt.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.jlpt.entity.Exam;
import com.nihongo.api.modules.jlpt.entity.ExamResult;
import com.nihongo.api.modules.jlpt.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Exam>>> getAll(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(examService.getPublishedExams(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Exam>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(examService.getById(id)));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<PageResponse<Exam>>> getByLevel(
            @PathVariable User.JlptLevel level,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(examService.getByLevel(level, pageable)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Exam>> create(@RequestBody Exam exam) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo đề thi thành công", examService.create(exam)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Exam>> update(@PathVariable Long id, @RequestBody Exam exam) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật đề thi thành công", examService.update(id, exam)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        examService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa đề thi thành công", null));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<ExamResult>> submit(
            @PathVariable Long id,
            @RequestBody ExamResult result) {
        return ResponseEntity.ok(ApiResponse.ok("Nộp bài thành công", examService.submitExam(result)));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<PageResponse<ExamResult>>> getHistory(
            @RequestParam Long userId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(examService.getUserHistory(userId, pageable)));
    }
}
