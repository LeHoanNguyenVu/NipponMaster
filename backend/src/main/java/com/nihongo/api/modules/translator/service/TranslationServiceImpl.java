package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Implementation tạm thời cho Translation Service.
 * TODO: Tích hợp Google Cloud Translation API hoặc Gemini API.
 * Hiện tại trả về placeholder để Frontend có thể phát triển song song.
 */
@Slf4j
@Service
public class TranslationServiceImpl implements TranslationService {

    @Override
    public TranslateResponse translate(TranslateRequest request) {
        log.info("Dịch: '{}' ({} -> {})", request.getText(), request.getSourceLang(), request.getTargetLang());

        // TODO: Gọi API dịch thuật thật ở đây
        // Hiện tại trả về placeholder
        return TranslateResponse.builder()
                .originalText(request.getText())
                .translatedText("[Placeholder] Bản dịch của: " + request.getText())
                .sourceLang(request.getSourceLang() != null ? request.getSourceLang() : "auto")
                .targetLang(request.getTargetLang())
                .pronunciation(null)
                .build();
    }
}
