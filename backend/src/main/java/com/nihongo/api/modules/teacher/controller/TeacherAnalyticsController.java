package com.nihongo.api.modules.teacher.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.teacher.dto.TeacherAnalyticsDTO.*;
import com.nihongo.api.modules.teacher.service.TeacherAnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/teacher/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
@Tag(name = "Teacher Analytics & Gradebook", description = "Dashboard thống kê phổ điểm và bảng điểm lớp học")
public class TeacherAnalyticsController {

    private final TeacherAnalyticsService teacherAnalyticsService;

    @GetMapping("/overview")
    @Operation(summary = "Lấy thống kê phổ điểm và chỉ số tổng quan của Giảng viên")
    public ResponseEntity<ApiResponse<AnalyticsOverviewResponse>> getOverview(@AuthenticationPrincipal Long teacherId) {
        return ResponseEntity.ok(ApiResponse.ok("Thống kê tổng quan", teacherAnalyticsService.getAnalyticsOverview(teacherId)));
    }

    @GetMapping("/classes/{classroomId}/gradebook")
    @Operation(summary = "Bảng điểm chi tiết của lớp học")
    public ResponseEntity<ApiResponse<ClassroomGradebookResponse>> getClassroomGradebook(
            @AuthenticationPrincipal Long teacherId,
            @PathVariable Long classroomId) {
        return ResponseEntity.ok(ApiResponse.ok("Bảng điểm lớp học", teacherAnalyticsService.getClassroomGradebook(teacherId, classroomId)));
    }

    @GetMapping("/classes/{classroomId}/export")
    @Operation(summary = "Xuất file CSV báo cáo điểm số sinh viên 1-Click")
    public ResponseEntity<byte[]> exportGradebookCsv(
            @AuthenticationPrincipal Long teacherId,
            @PathVariable Long classroomId) {
        String csvContent = teacherAnalyticsService.exportGradebookCsv(teacherId, classroomId);
        byte[] bytes = csvContent.getBytes(java.nio.charset.StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=gradebook_class_" + classroomId + ".csv")
                .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
                .body(bytes);
    }
}
