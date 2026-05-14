package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity Kanji (chữ Hán Nhật).
 * Lưu trữ: ký tự, âm On/Kun, nghĩa, số nét, bộ thủ, trình độ JLPT.
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

    /** Âm ON (âm Hán Việt), ví dụ: ショク */
    @Column(name = "on_reading", length = 200)
    private String onReading;

    /** Âm KUN (âm thuần Nhật), ví dụ: た.べる */
    @Column(name = "kun_reading", length = 200)
    private String kunReading;

    /** Nghĩa tiếng Việt */
    @Column(nullable = false, length = 500)
    private String meaning;

    /** Số nét viết */
    @Column(name = "stroke_count")
    private Integer strokeCount;

    /** Bộ thủ (radical), ví dụ: 食 */
    @Column(length = 50)
    private String radical;

    /** Các từ vựng liên quan, ví dụ: 食べる、食事、食堂 */
    @Column(name = "related_words", columnDefinition = "TEXT")
    private String relatedWords;

    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private User.JlptLevel jlptLevel;
}
