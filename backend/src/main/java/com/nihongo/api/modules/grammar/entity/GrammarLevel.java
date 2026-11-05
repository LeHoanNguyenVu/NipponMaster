package com.nihongo.api.modules.grammar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grammar_levels")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLevel {

    @Id
    @Column(name = "level_code", length = 10)
    private String levelCode; // 'N5', 'N4', 'N3', 'N2', 'N1'

    @Column(name = "curriculum_name", nullable = false, length = 100)
    private String curriculumName;

    @Column(name = "total_lessons", nullable = false)
    private Integer totalLessons;

    @Column(columnDefinition = "TEXT")
    private String description;
}

