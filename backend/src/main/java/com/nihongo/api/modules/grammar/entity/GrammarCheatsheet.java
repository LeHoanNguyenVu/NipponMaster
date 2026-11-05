package com.nihongo.api.modules.grammar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grammar_cheatsheets")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarCheatsheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @Column(nullable = false, length = 150)
    private String pattern;

    @Column(length = 50)
    private String badge;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String meaning;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String structure;

    @Column(columnDefinition = "TEXT")
    private String nuance;

    @Column(name = "examples_json", columnDefinition = "jsonb")
    private String examplesJson;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}

