package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity bài tập câu ngữ cảnh: đọc câu (よみましょう) và viết chữ (かきましょう).
 */
@Entity
@Table(name = "kanji_exercises")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiExercise extends BaseEntity {

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    /** Loại bài tập: 'READING' (よみましょう) hoặc 'WRITING' (かきましょう) */
    @Column(name = "exercise_type", nullable = false, length = 20)
    private String exerciseType;

    /** Câu hỏi đầy đủ với từ gạch chân / đóng ngoặc */
    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    /** Từ mục tiêu cần nhận diện hoặc điền (ví dụ: 一人 hoặc ひとり) */
    @Column(name = "target_word", nullable = false, length = 100)
    private String targetWord;

    /** Đáp án chính xác */
    @Column(name = "correct_answer", nullable = false, length = 100)
    private String correctAnswer;

    /** Mảng các lựa chọn trắc nghiệm dạng JSON (ví dụ: ["ひとり", "ひとつ", "ふたり"]) */
    @Column(name = "options_json", columnDefinition = "TEXT")
    private String optionsJson;

    /** Lời giải thích / ngữ pháp chi tiết */
    @Column(columnDefinition = "TEXT")
    private String explanation;

    /** Thứ tự hiển thị trong bộ câu hỏi */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
