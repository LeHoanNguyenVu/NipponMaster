package com.nihongo.api.modules.teacher.dto;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TeacherContentDTO {

    // ===== VOCABULARY DTOs =====
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateVocabularyRequest {
        @NotBlank(message = "Từ vựng không được để trống")
        private String word;

        @NotBlank(message = "Cách đọc (hiragana/katakana) không được để trống")
        private String reading;

        @NotBlank(message = "Ý nghĩa không được để trống")
        private String meaning;

        private String exampleSentence;
        private String exampleMeaning;

        @NotNull(message = "Cấp độ JLPT không được để trống")
        private User.JlptLevel jlptLevel;

        private Vocabulary.WordType wordType;
        private String topic;
    }

    // ===== KANJI DTOs =====
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateKanjiRequest {
        @NotBlank(message = "Chữ Hán Kanji không được để trống")
        private String character;

        @NotBlank(message = "Ý nghĩa Hán Việt / Tiếng Việt không được để trống")
        private String meaning;

        private String onReading;
        private String kunReading;

        @NotNull(message = "Số nét vẽ không được để trống")
        private Integer strokeCount;

        private String radical;
        private String relatedWords;

        @NotNull(message = "Cấp độ JLPT không được để trống")
        private User.JlptLevel jlptLevel;
    }

    // ===== GRAMMAR DTOs =====
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateGrammarRequest {
        @NotBlank(message = "Tiêu đề cấu trúc ngữ pháp không được để trống")
        private String title;

        @NotBlank(message = "Cấu trúc kết hợp không được để trống")
        private String structure;

        @NotBlank(message = "Ý nghĩa / Cách dùng không được để trống")
        private String meaning;

        private String usageNotes;
        private String exampleSentences;

        @NotNull(message = "Cấp độ JLPT không được để trống")
        private User.JlptLevel jlptLevel;
    }
}
