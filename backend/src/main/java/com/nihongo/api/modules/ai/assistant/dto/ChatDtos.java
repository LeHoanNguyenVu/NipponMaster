package com.nihongo.api.modules.ai.assistant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;

/**
 * Các DTO cho tính năng Trợ lý Sensei AI (Chat + RAG).
 */
public final class ChatDtos {

    private ChatDtos() {}

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateSessionRequest {
        @Size(max = 200)
        private String title;
        @Size(max = 16)
        private String jlptLevel;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RenameSessionRequest {
        @NotBlank(message = "Tiêu đề không được để trống")
        @Size(max = 200)
        private String title;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SendMessageRequest {
        @NotBlank(message = "Nội dung câu hỏi không được để trống")
        @Size(max = 4000, message = "Câu hỏi tối đa 4000 ký tự")
        private String message;

        /** Lọc cấp độ JLPT ưu tiên (N5..N1). Nếu bỏ trống sẽ dùng theo session/học viên. */
        private String levelFilter;

        /** Ngữ cảnh trang học viên đang mở (vd: tên bài ngữ pháp hoặc câu vừa làm sai). */
        @Size(max = 1000)
        private String pageContext;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SourceCitation {
        private Long chunkId;
        private String sourceType;
        private Long sourceId;
        private String title;
        private String jlptLevel;
        private String route;
        private double score;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatSessionDto {
        private Long id;
        private String title;
        private String jlptLevel;
        private String contextSummary;
        private String lastMessagePreview;
        private OffsetDateTime createdAt;
        private OffsetDateTime updatedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatMessageDto {
        private Long id;
        private Long sessionId;
        private String role; // USER | ASSISTANT
        private String content;
        private List<SourceCitation> sources;
        private OffsetDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuickSaveCardRequest {
        @NotBlank(message = "Từ vựng không được để trống")
        @Size(max = 150)
        private String word;
        @Size(max = 150)
        private String reading;
        @Size(max = 500)
        private String meaning;
        @Size(max = 16)
        private String jlptLevel;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SavedCardDto {
        private Long id;
        private String word;
        private String reading;
        private String meaning;
        private String jlptLevel;
        private OffsetDateTime createdAt;
    }
}

