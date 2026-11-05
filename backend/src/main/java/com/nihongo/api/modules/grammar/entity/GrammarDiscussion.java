package com.nihongo.api.modules.grammar.entity;

import com.nihongo.api.modules.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "grammar_discussions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarDiscussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "video_url", columnDefinition = "TEXT")
    private String videoUrl;

    @Column(name = "reply_to_id")
    private Long replyToId;

    @Column(name = "is_sensei", nullable = false)
    private Boolean isSensei;

    @Column(name = "helpful_count", nullable = false)
    private Integer helpfulCount;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}

