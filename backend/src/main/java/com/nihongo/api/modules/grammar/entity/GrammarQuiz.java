package com.nihongo.api.modules.grammar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grammar_quizzes")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @Column(name = "quiz_type", nullable = false, length = 20)
    private String quizType; // 'MCQ' hoặc 'STAR'

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "left_sentence", columnDefinition = "TEXT")
    private String leftSentence;

    @Column(name = "right_sentence", columnDefinition = "TEXT")
    private String rightSentence;

    @Column(name = "star_index")
    private Integer starIndex;

    @Column(name = "fragments_json", columnDefinition = "jsonb")
    private String fragmentsJson;

    @Column(name = "options_json", columnDefinition = "jsonb")
    private String optionsJson;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}

