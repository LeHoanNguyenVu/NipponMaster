package com.nihongo.api.modules.flashcard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO dữ liệu thẻ luyện trí nhớ nhanh được truy vấn động từ Supabase PostgreSQL.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuickPracticeCardDto {
    private Long id;
    private String kanji;
    private String kana;
    private String romaji;
    private String hanViet;
    private String meaning;
    private Integer strokeCount;
    private String strokeGuide;
    private String exampleJp;
    private String exampleRomaji;
    private String exampleVi;
    private String level;
    private String cardType;
}
