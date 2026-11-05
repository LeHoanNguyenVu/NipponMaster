package com.nihongo.api.modules.grammar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grammar_timestamps")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarTimestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @Column(name = "time_sec", nullable = false)
    private Integer timeSec;

    @Column(name = "time_str", nullable = false, length = 20)
    private String timeStr;

    @Column(nullable = false, length = 150)
    private String pattern;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}

