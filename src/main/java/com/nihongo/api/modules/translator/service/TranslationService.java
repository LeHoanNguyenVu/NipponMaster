package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;

/**
 * Interface cho dịch vụ dịch thuật.
 * Có thể implement bằng Google Translate API, Gemini AI, hoặc DeepL.
 * Tách interface giúp dễ dàng chuyển đổi giữa các provider.
 */
public interface TranslationService {

    TranslateResponse translate(TranslateRequest request);
}
