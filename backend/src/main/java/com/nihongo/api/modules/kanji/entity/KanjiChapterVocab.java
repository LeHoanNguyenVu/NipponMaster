package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity từ vựng ứng dụng xuất hiện trong từng chương Kanji Master.
 */
@Entity
@Table(name = "kanji_chapter_vocab")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiChapterVocab extends BaseEntity {

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    /** Từ vựng viết bằng Kanji, ví dụ: 一人, 二時 */
    @Column(nullable = false, length = 100)
    private String word;

    /** Cách đọc Hiragana, ví dụ: ひとり, にじ */
    @Column(nullable = false, length = 100)
    private String reading;

    /** Phiên âm Romaji */
    @Column(length = 100)
    private String romaji;

    /** Ý nghĩa tiếng Việt */
    @Column(name = "meaning_vi", nullable = false, length = 255)
    private String meaningVi;

    /** Ý nghĩa tiếng Anh */
    @Column(name = "meaning_en", length = 255)
    private String meaningEn;

    /** Thứ tự hiển thị */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
