package com.nihongo.api.modules.flashcard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardItemDto {
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
    private String imageUrl;
    private String mnemonicHint;
    private String mnemonicIcon;
    private String mnemonicTitle;
    private String jlptLevel;
}
