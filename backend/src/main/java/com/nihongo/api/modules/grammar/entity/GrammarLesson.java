package com.nihongo.api.modules.grammar.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "grammar_lessons")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_code", nullable = false)
    private GrammarLevel level;

    @Column(name = "lesson_number", nullable = false)
    private Integer lessonNumber;

    @Column(name = "part_number", nullable = false)
    private Integer partNumber;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(name = "title_vi", nullable = false)
    private String titleVi;

    @Column(name = "title_ja", nullable = false)
    private String titleJa;

    @Column(name = "video_id", nullable = false, length = 100)
    private String videoId;

    @Column(name = "duration_str", nullable = false, length = 20)
    private String durationStr;

    @Column(name = "duration_sec", nullable = false)
    private Integer durationSec;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}

