package com.nihongo.api.modules.translator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Kết quả dịch nhanh (không kèm phân tích sâu). */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FastTranslateResponse {
    private String originalText;
    private String translatedText;
    private String sourceLang;
    private String targetLang;
    /** CACHE | DICTIONARY | AI | FALLBACK */
    private String source;
    private long latencyMs;
}

