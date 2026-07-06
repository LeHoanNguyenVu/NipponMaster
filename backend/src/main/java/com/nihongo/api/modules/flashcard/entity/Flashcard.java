package com.nihongo.api.modules.flashcard.entity;

import com.nihongo.api.common.entity.BaseEntity;
import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity Flashcard cho hệ thống SRS (Spaced Repetition System).
 * Ghi nhớ tiến trình ôn tập của từng người dùng.
 */
@Entity
@Table(name = "flashcards")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Flashcard extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /** Mặt trước: từ tiếng Nhật */
    @Column(nullable = false, length = 500)
    private String front;

    /** Mặt sau: nghĩa tiếng Việt */
    @Column(nullable = false, length = 500)
    private String back;

    /** Cách đọc (reading) */
    @Column(length = 200)
    private String reading;

    /** Loại thẻ: VOCABULARY, KANJI, GRAMMAR */
    @Enumerated(EnumType.STRING)
    @Column(name = "card_type")
    private CardType cardType;

    /** ID nguồn gốc (vocabulary_id hoặc kanji_id) để tránh tạo trùng */
    @Column(name = "source_id")
    private Long sourceId;

    /** Câu ví dụ tiếng Nhật */
    @Column(name = "example_sentence", length = 1000)
    private String exampleSentence;

    /** Nghĩa câu ví dụ */
    @Column(name = "example_meaning", length = 1000)
    private String exampleMeaning;

    // --- SRS Fields ---

    /** Khoảng cách ôn tập hiện tại (ngày) */
    @Column(name = "interval_days")
    @Builder.Default
    private Integer intervalDays = 1;

    /** Hệ số dễ (ease factor), mặc định 2.5 */
    @Column(name = "ease_factor")
    @Builder.Default
    private Double easeFactor = 2.5;

    /** Số lần ôn tập liên tục đúng */
    @Column(name = "repetition_count")
    @Builder.Default
    private Integer repetitionCount = 0;

    /** Lần ôn tập tiếp theo */
    @Column(name = "next_review_at")
    private LocalDateTime nextReviewAt;

    public enum CardType {
        VOCABULARY, KANJI, GRAMMAR
    }
}
