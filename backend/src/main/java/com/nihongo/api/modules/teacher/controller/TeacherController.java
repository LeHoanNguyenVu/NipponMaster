package com.nihongo.api.modules.teacher.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.teacher.dto.*;
import com.nihongo.api.modules.teacher.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teacher")
@RequiredArgsConstructor
@Tag(name = "Teacher Space", description = "Quản lý bài học, lớp học và học viên cho Giảng viên")
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/stats")
    @Operation(summary = "Lấy thống kê của giảng viên (cần JWT role TEACHER)")
    public ResponseEntity<ApiResponse<TeacherStatsResponse>> getStats(@AuthenticationPrincipal Long teacherId) {
        return ResponseEntity.ok(ApiResponse.ok("Thống kê giảng viên", teacherService.getTeacherStats(teacherId)));
    }

    @GetMapping("/classes")
    @Operation(summary = "Danh sách lớp học của giảng viên")
    public ResponseEntity<ApiResponse<List<ClassroomResponse>>> getTeacherClasses(@AuthenticationPrincipal Long teacherId) {
        return ResponseEntity.ok(ApiResponse.ok("Danh sách lớp học", teacherService.getTeacherClasses(teacherId)));
    }

    @PostMapping("/classes")
    @Operation(summary = "Tạo lớp học mới")
    public ResponseEntity<ApiResponse<ClassroomResponse>> createClassroom(
            @AuthenticationPrincipal Long teacherId,
            @Valid @RequestBody CreateClassroomRequest request) {
        ClassroomResponse response = teacherService.createClassroom(teacherId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo lớp học thành công", response));
    }

    @GetMapping("/classes/{classroomId}/students")
    @Operation(summary = "Danh sách học viên trong lớp")
    public ResponseEntity<ApiResponse<List<ClassroomStudentResponse>>> getStudentsInClass(
            @PathVariable Long classroomId) {
        return ResponseEntity.ok(ApiResponse.ok("Danh sách học viên", teacherService.getStudentsInClass(classroomId)));
    }

    @PostMapping("/classes/{classroomId}/students")
    @Operation(summary = "Thêm học viên vào lớp bằng email")
    public ResponseEntity<ApiResponse<ClassroomStudentResponse>> addStudentToClass(
            @AuthenticationPrincipal Long teacherId,
            @PathVariable Long classroomId,
            @Valid @RequestBody AddStudentRequest request) {
        ClassroomStudentResponse response = teacherService.addStudentToClass(teacherId, classroomId, request.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Thêm học viên thành công", response));
    }
}
