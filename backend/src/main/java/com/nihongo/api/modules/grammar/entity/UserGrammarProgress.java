package com.nihongo.api.modules.grammar.entity;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "user_grammar_progress")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserGrammarProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private GrammarLesson lesson;

    @Column(name = "is_unlocked", nullable = false)
    private Boolean isUnlocked;

    @Column(name = "is_passed", nullable = false)
    private Boolean isPassed;

    @Column(name = "highest_score", nullable = false)
    private Integer highestScore;

    @Column(name = "stars_earned", nullable = false)
    private Integer starsEarned;

    @Column(name = "last_studied_at")
    private OffsetDateTime lastStudiedAt;

    @Column(name = "last_watch_sec")
    private Integer lastWatchSec;

    @Column(name = "last_watch_time_str")
    private String lastWatchTimeStr;
}

