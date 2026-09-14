package com.nihongo.api.modules.sentence.controller;

import com.nihongo.api.modules.sentence.dto.SentenceAnalyzeRequest;
import com.nihongo.api.modules.sentence.dto.SentenceAnalyzeResponse;
import com.nihongo.api.modules.sentence.service.SentenceAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sentence-breakdown")
@RequiredArgsConstructor
public class SentenceAnalyzerController {

    private final SentenceAnalyzerService sentenceAnalyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<SentenceAnalyzeResponse> analyzeSentence(@RequestBody SentenceAnalyzeRequest request) {
        SentenceAnalyzeResponse response = sentenceAnalyzerService.analyzeSentence(request);
        return ResponseEntity.ok(response);
    }
}
