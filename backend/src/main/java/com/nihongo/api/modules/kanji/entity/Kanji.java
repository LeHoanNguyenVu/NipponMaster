package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity Kanji (chữ Hán Nhật).
 * Lưu trữ: ký tự, âm On/Kun, âm Hán Việt, nghĩa, số nét, hướng dẫn nét viết, bộ thủ, câu ví dụ, trình độ JLPT.
 */
@Entity
@Table(name = "kanjis")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Kanji extends BaseEntity {

    /** Ký tự Kanji, ví dụ: 食 */
    @Column(nullable = false, length = 10)
    private String character;

    /** Âm ON (âm Hán Nhật), ví dụ: ショク */
    @Column(name = "on_reading", length = 200)
    private String onReading;

    /** Âm KUN (âm thuần Nhật), ví dụ: た.べる */
    @Column(name = "kun_reading", length = 200)
    private String kunReading;

    /** Phiên âm Romaji */
    @Column(length = 100)
    private String romaji;

    /** Âm Hán Việt, ví dụ: THỰC */
    @Column(name = "han_viet", length = 100)
    private String hanViet;

    /** Nghĩa tiếng Việt */
    @Column(nullable = false, length = 500)
    private String meaning;

    /** Số nét viết */
    @Column(name = "stroke_count")
    private Integer strokeCount;

    /** Hướng dẫn thứ tự nét viết */
    @Column(name = "stroke_guide", length = 500)
    private String strokeGuide;

    /** Bộ thủ (radical), ví dụ: 食 */
    @Column(length = 50)
    private String radical;

    /** Các từ vựng liên quan, ví dụ: 食べる、食事、食堂 */
    @Column(name = "related_words", columnDefinition = "TEXT")
    private String relatedWords;

    /** Câu ví dụ tiếng Nhật */
    @Column(name = "example_sentence", length = 1000)
    private String exampleSentence;

    /** Phiên âm Romaji của câu ví dụ */
    @Column(name = "example_romaji", length = 1000)
    private String exampleRomaji;

    /** Dịch nghĩa câu ví dụ */
    @Column(name = "example_meaning", length = 1000)
    private String exampleMeaning;

    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private User.JlptLevel jlptLevel;
}
