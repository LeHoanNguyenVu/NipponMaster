package com.nihongo.api.modules.translator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TranslateResponse {

    private String originalText;
    private String translatedText;
    private String sourceLang;
    private String targetLang;

    /** Phiên âm (romaji hoặc hiragana nếu dịch sang tiếng Nhật) */
    private String pronunciation;

    /** Danh sách từ vựng phân tích từ câu */
    private List<WordAnalysis> words;

    /** Ghi chú ngữ pháp và sắc thái do AI phân tích */
    private String grammarNotes;

    /** Cấp độ JLPT ước tính của câu (N5, N4, N3, N2, N1) hoặc null */
    private String detectedLevel;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WordAnalysis {
        private String word;
        private String reading;
        private String meaning;
        private String partOfSpeech;
        /** Âm Hán Việt (nếu là chữ Hán) */
        private String sinoVietnamese;
    }
}
