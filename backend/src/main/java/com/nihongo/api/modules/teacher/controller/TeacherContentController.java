package com.nihongo.api.modules.teacher.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.teacher.dto.TeacherContentDTO.*;
import com.nihongo.api.modules.teacher.service.TeacherContentService;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/teacher/content")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
@Tag(name = "Teacher Content Studio", description = "Quản lý bài học Từ vựng, Kanji, Ngữ pháp cho Giảng viên")
public class TeacherContentController {

    private final TeacherContentService teacherContentService;

    // ===== VOCABULARY ENDPOINTS =====

    @PostMapping("/vocabulary")
    @Operation(summary = "Tạo mới Từ vựng (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Vocabulary>> createVocabulary(@Valid @RequestBody CreateVocabularyRequest request) {
        Vocabulary vocabulary = teacherContentService.createVocabulary(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo từ vựng thành công", vocabulary));
    }

    @PutMapping("/vocabulary/{id}")
    @Operation(summary = "Cập nhật Từ vựng (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Vocabulary>> updateVocabulary(
            @PathVariable Long id,
            @Valid @RequestBody CreateVocabularyRequest request) {
        Vocabulary vocabulary = teacherContentService.updateVocabulary(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật từ vựng thành công", vocabulary));
    }

    @DeleteMapping("/vocabulary/{id}")
    @Operation(summary = "Xóa Từ vựng (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Void>> deleteVocabulary(@PathVariable Long id) {
        teacherContentService.deleteVocabulary(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa từ vựng thành công", null));
    }

    // ===== KANJI ENDPOINTS =====

    @PostMapping("/kanji")
    @Operation(summary = "Tạo mới Hán Tự Kanji (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Kanji>> createKanji(@Valid @RequestBody CreateKanjiRequest request) {
        Kanji kanji = teacherContentService.createKanji(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo Kanji thành công", kanji));
    }

    @PutMapping("/kanji/{id}")
    @Operation(summary = "Cập nhật Hán Tự Kanji (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Kanji>> updateKanji(
            @PathVariable Long id,
            @Valid @RequestBody CreateKanjiRequest request) {
        Kanji kanji = teacherContentService.updateKanji(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật Kanji thành công", kanji));
    }

    @DeleteMapping("/kanji/{id}")
    @Operation(summary = "Xóa Hán Tự Kanji (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Void>> deleteKanji(@PathVariable Long id) {
        teacherContentService.deleteKanji(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa Kanji thành công", null));
    }

    // ===== GRAMMAR ENDPOINTS =====

    @PostMapping("/grammar")
    @Operation(summary = "Tạo mới Ngữ pháp (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Grammar>> createGrammar(@Valid @RequestBody CreateGrammarRequest request) {
        Grammar grammar = teacherContentService.createGrammar(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo ngữ pháp thành công", grammar));
    }

    @PutMapping("/grammar/{id}")
    @Operation(summary = "Cập nhật Ngữ pháp (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Grammar>> updateGrammar(
            @PathVariable Long id,
            @Valid @RequestBody CreateGrammarRequest request) {
        Grammar grammar = teacherContentService.updateGrammar(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật ngữ pháp thành công", grammar));
    }

    @DeleteMapping("/grammar/{id}")
    @Operation(summary = "Xóa Ngữ pháp (Role TEACHER/ADMIN)")
    public ResponseEntity<ApiResponse<Void>> deleteGrammar(@PathVariable Long id) {
        teacherContentService.deleteGrammar(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa ngữ pháp thành công", null));
    }
}
