package com.nihongo.api.modules.placement.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity lưu trữ câu hỏi của bài Placement Test (Bài kiểm tra đánh giá trình độ JLPT).
 * Mỗi câu thuộc về một cấp độ (N5-N1) và một phần thi cụ thể (VOCAB, GRAMMAR, READING).
 */
@Entity
@Table(name = "placement_questions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlacementQuestion extends BaseEntity {

    /**
     * Cấp độ JLPT của câu hỏi này (N5, N4, N3, N2, N1).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private User.JlptLevel level;

    /**
     * Phần thi: VOCAB (Từ vựng & Kanji), GRAMMAR (Ngữ pháp), READING (Đọc hiểu).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Section section;

    /**
     * Nội dung câu hỏi.
     */
    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    /**
     * 4 lựa chọn, lưu dạng JSON Array: ["A. ...", "B. ...", "C. ...", "D. ..."]
     */
    @Column(name = "options_json", nullable = false, columnDefinition = "TEXT")
    private String optionsJson;

    /**
     * Đáp án đúng (0=A, 1=B, 2=C, 3=D).
     */
    @Column(name = "correct_option", nullable = false)
    private Integer correctOption;

    /**
     * Giải thích lý do chọn đáp án đúng (hiển thị sau khi nộp bài).
     */
    @Column(columnDefinition = "TEXT")
    private String explanation;

    /**
     * Thứ tự hiển thị trong bài test.
     */
    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    public enum Section {
        VOCAB,   // Từ vựng & Chữ Hán
        GRAMMAR, // Ngữ pháp & Cấu trúc câu
        READING  // Đọc hiểu
    }
}
