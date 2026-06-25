package com.nihongo.api.modules.grammar.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity mẫu ngữ pháp tiếng Nhật.
 * Lưu trữ: cấu trúc, cách dùng, ví dụ, trình độ JLPT.
 */
@Entity
@Table(name = "grammars")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Grammar extends BaseEntity {

    /** Tên mẫu ngữ pháp, ví dụ: ～てから */
    @Column(nullable = false, length = 200)
    private String pattern;

    /** Cấu trúc sử dụng, ví dụ: V-て + から */
    @Column(nullable = false, length = 500)
    private String structure;

    /** Giải thích nghĩa tiếng Việt */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String meaning;

    /** Ví dụ câu tiếng Nhật */
    @Column(name = "example_sentence", columnDefinition = "TEXT")
    private String exampleSentence;

    /** Nghĩa của câu ví dụ */
    @Column(name = "example_meaning", columnDefinition = "TEXT")
    private String exampleMeaning;

    /** Ghi chú thêm (cách phân biệt với mẫu tương tự...) */
    @Column(columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private User.JlptLevel jlptLevel;
}
