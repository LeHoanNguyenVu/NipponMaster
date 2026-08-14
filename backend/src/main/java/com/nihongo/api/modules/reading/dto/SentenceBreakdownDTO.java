package com.nihongo.api.modules.reading.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class SentenceBreakdownDTO {

    public enum SyntaxRole {
        SUBJECT,    // 主語 (Chủ ngữ - Blue)
        PREDICATE,  // 述語 (Vị ngữ - Red)
        COMPLEMENT, // 補語/助詞 (Bổ ngữ/Trợ từ - Yellow)
        OBJECT,     // 目的語 (Tân ngữ - Green)
        MODIFIER    // 修飾語 (Định ngữ/Trạng ngữ - Purple)
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BreakdownRequest {
        @NotBlank(message = "Nội dung bài đọc không được để trống")
        private String text;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SyntaxToken {
        private String surface;
        private String furigana;
        private String romaji;
        private String partOfSpeech; // Noun, Verb, Particle, Adjective...
        private SyntaxRole role;
        private String kanjiSinoVietnamese; // Âm Hán Việt
        private String meaning;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BreakdownResponse {
        private String originalText;
        private String formattedRubyHtml;
        private List<SyntaxToken> tokens;
        private String fullVietnameseTranslation;
        private String grammarNotes;
    }
}
