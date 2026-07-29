package com.nihongo.api.modules.kanji.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeRequest;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeResponse;
import com.nihongo.api.modules.kanji.service.KanjiCanvasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kanjis/canvas")
@RequiredArgsConstructor
public class KanjiCanvasController {

    private final KanjiCanvasService kanjiCanvasService;

    @PostMapping("/recognize")
    public ResponseEntity<ApiResponse<KanjiRecognizeResponse>> recognizeDrawnKanji(
            @RequestBody KanjiRecognizeRequest request) {
        KanjiRecognizeResponse response = kanjiCanvasService.recognizeDrawnKanji(request);
        return ResponseEntity.ok(ApiResponse.ok("Nhận diện nét vẽ Kanji thành công", response));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<KanjiRecognizeResponse>> evaluateTargetKanji(
            @RequestBody KanjiRecognizeRequest request) {
        KanjiRecognizeResponse response = kanjiCanvasService.evaluateTargetKanji(request);
        return ResponseEntity.ok(ApiResponse.ok("Chấm điểm nét vẽ Kanji thành công", response));
    }
}
