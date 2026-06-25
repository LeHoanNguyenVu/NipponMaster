package com.nihongo.api.modules.vocabulary.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity từ vựng tiếng Nhật.
 * Lưu trữ: từ gốc (kanji), cách đọc (hiragana), nghĩa, ví dụ, trình độ JLPT.
 */
@Entity
@Table(name = "vocabularies")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vocabulary extends BaseEntity {

    /** Từ viết bằng Kanji, ví dụ: 食べる */
    @Column(nullable = false, length = 100)
    private String word;

    /** Cách đọc bằng Hiragana, ví dụ: たべる */
    @Column(nullable = false, length = 100)
    private String reading;

    /** Nghĩa tiếng Việt */
    @Column(nullable = false, length = 500)
    private String meaning;

    /** Ví dụ câu bằng tiếng Nhật */
    @Column(name = "example_sentence", length = 1000)
    private String exampleSentence;

    /** Nghĩa của câu ví dụ */
    @Column(name = "example_meaning", length = 1000)
    private String exampleMeaning;

    /** Trình độ JLPT: N5 -> N1 */
    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private User.JlptLevel jlptLevel;

    /** Loại từ: NOUN, VERB, ADJECTIVE, ADVERB, PARTICLE... */
    @Enumerated(EnumType.STRING)
    @Column(name = "word_type")
    private WordType wordType;

    /** Chủ đề: DAILY_LIFE, TRAVEL, BUSINESS... */
    @Column(length = 100)
    private String topic;

    public enum WordType {
        NOUN, VERB, I_ADJECTIVE, NA_ADJECTIVE, ADVERB, PARTICLE, CONJUNCTION, COUNTER, EXPRESSION
    }
}
