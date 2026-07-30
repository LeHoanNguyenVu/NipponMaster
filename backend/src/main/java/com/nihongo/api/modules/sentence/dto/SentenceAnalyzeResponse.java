package com.nihongo.api.modules.sentence.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SentenceAnalyzeResponse {

    /** Câu gốc tiếng Nhật */
    private String originalSentence;

    /** Bản dịch tiếng Việt của toàn câu */
    private String translatedSentence;

    /** Chuỗi HTML Furigana Ruby annotation (<ruby>漢字<rt>かんじ</rt></ruby>) */
    private String furiganaRubyHtml;

    /** Danh sách từ vựng được phân tách thành từng khối */
    private List<TokenDto> tokens;

    /** Danh sách các cấu trúc ngữ pháp phát hiện trong câu */
    private List<MatchedGrammarDto> matchedGrammars;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TokenDto {
        private String surface;
        private String baseForm;
        private String reading;
        private String partOfSpeech; // NOUN, VERB_CONJUGATED, ADJECTIVE, PARTICLE, ADVERB, AUXILIARY...
        private String partOfSpeechLabel; // Danh từ, Động từ thể ます, Trợ từ, Tính từ...
        private String explanation;
        private String jlptLevel;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MatchedGrammarDto {
        private Long grammarId;
        private String pattern;
        private String structure;
        private String meaning;
        private String explanation;
        private String jlptLevel;
    }
}
