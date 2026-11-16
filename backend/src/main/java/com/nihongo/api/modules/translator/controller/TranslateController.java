package com.nihongo.api.modules.translator.controller;

import com.nihongo.api.common.dto.ApiResponse;
import com.nihongo.api.modules.ai.core.AiRateLimitException;
import com.nihongo.api.modules.translator.dto.FastTranslateResponse;
import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import com.nihongo.api.modules.translator.service.FastTranslationService;
import com.nihongo.api.modules.translator.service.TranslationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/v1/translate")
@RequiredArgsConstructor
public class TranslateController {

    private final TranslationService translationService;
    private final FastTranslationService fastTranslationService;

    private static final ExecutorService STREAM_POOL = Executors.newCachedThreadPool();

    /** Dịch + phân tích sâu (furigana, từ vựng, ngữ pháp) – chậm hơn. */
    @PostMapping
    public ResponseEntity<ApiResponse<TranslateResponse>> translate(
            @Valid @RequestBody TranslateRequest request) {
        TranslateResponse response = translationService.translate(request);
        return ResponseEntity.ok(ApiResponse.ok("Dịch thành công", response));
    }

    /** Dịch nhanh (cache → từ điển → Gemini Flash-Lite). */
    @PostMapping("/fast")
    public ResponseEntity<ApiResponse<FastTranslateResponse>> fast(
            @Valid @RequestBody TranslateRequest request,
            Authentication auth,
            HttpServletRequest httpReq) {
        String key = resolveClientKey(auth, httpReq);
        FastTranslateResponse res = fastTranslationService.translate(
                request.getText(), request.getSourceLang(), request.getTargetLang(), key);
        return ResponseEntity.ok(ApiResponse.ok("Dịch thành công", res));
    }

    /**
     * Dịch nhanh dạng stream (SSE).
     * Events: "chunk" (từng đoạn text) và "done" (FastTranslateResponse cuối cùng).
     */
    @GetMapping(value = "/stream", produces = "text/event-stream")
    public SseEmitter stream(@RequestParam String text,
                             @RequestParam(required = false) String sourceLang,
                             @RequestParam(required = false) String targetLang,
                             Authentication auth,
                             HttpServletRequest httpReq) {
        String key = resolveClientKey(auth, httpReq);
        SseEmitter emitter = new SseEmitter(20_000L);
        STREAM_POOL.submit(() -> {
            try {
                FastTranslateResponse res = fastTranslationService.translateStream(text, sourceLang, targetLang, key, chunk -> {
                    try {
                        emitter.send(SseEmitter.event().name("chunk").data(Map.of("text", chunk), MediaType.APPLICATION_JSON));
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
                emitter.send(SseEmitter.event().name("done").data(res, MediaType.APPLICATION_JSON));
                emitter.complete();
            } catch (AiRateLimitException e) {
                try {
                    emitter.send(SseEmitter.event().name("error").data(Map.of("message", e.getMessage()), MediaType.APPLICATION_JSON));
                } catch (Exception ignored) {}
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        return emitter;
    }

    private String resolveClientKey(Authentication auth, HttpServletRequest req) {
        if (auth != null && auth.getPrincipal() instanceof Long userId) {
            return "user:" + userId;
        }
        String ip = req != null ? req.getRemoteAddr() : "unknown";
        return "ip:" + ip;
    }
}
