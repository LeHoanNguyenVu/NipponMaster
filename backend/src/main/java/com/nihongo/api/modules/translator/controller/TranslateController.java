package com.nihongo.api.modules.translator.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import com.nihongo.api.modules.translator.service.TranslationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/translate")
@RequiredArgsConstructor
public class TranslateController {

    private final TranslationService translationService;

    @PostMapping
    public ResponseEntity<ApiResponse<TranslateResponse>> translate(
            @Valid @RequestBody TranslateRequest request) {
        TranslateResponse response = translationService.translate(request);
        return ResponseEntity.ok(ApiResponse.ok("Dịch thành công", response));
    }
}
