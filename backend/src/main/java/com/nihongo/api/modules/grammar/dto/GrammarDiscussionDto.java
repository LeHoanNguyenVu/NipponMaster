package com.nihongo.api.modules.grammar.dto;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarDiscussionDto {
    private Long id;
    private Long authorId;
    private String authorName;
    private String authorLevel;
    private String role; // 'teacher' | 'student'
    private Boolean isSensei;
    private String avatarBg;
    private String avatarLetter;
    private String timeAgo;
    private OffsetDateTime createdAt;
    private String content;
    private String imageUrl;
    private String videoUrl;
    private Integer helpfulCount;
    private List<GrammarDiscussionDto> replies;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        private String content;
        private String imageUrl;
        private String videoUrl;
        private Long replyToId;
    }
}

