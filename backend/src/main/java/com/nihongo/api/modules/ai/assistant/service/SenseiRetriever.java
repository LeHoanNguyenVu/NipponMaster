package com.nihongo.api.modules.ai.assistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.ai.assistant.dto.ChatDtos.SourceCitation;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResponse;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResult;
import com.nihongo.api.modules.ai.rag.service.KnowledgeSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Bộ truy xuất ngữ cảnh RAG cho Sensei AI.
 * Chuyển câu hỏi (+ ngữ cảnh trang hiện tại) thành danh sách tri thức liên quan nhất
 * và trích xuất đường dẫn tham chiếu để người học bấm mở bài học tương ứng.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SenseiRetriever {

    private static final double MIN_SCORE_THRESHOLD = 0.38;
    private static final int DEFAULT_TOP_K = 5;

    private final KnowledgeSearchService searchService;
    private final ObjectMapper mapper = new ObjectMapper();

    public record RetrievalResult(List<SearchResult> chunks, List<SourceCitation> citations) {}

    public RetrievalResult retrieve(String userQuery, String levelFilter, String pageContext) {
        String searchInput = buildSearchQuery(userQuery, pageContext);
        SearchResponse response = searchService.search(searchInput, levelFilter, DEFAULT_TOP_K);

        List<SearchResult> filtered = new ArrayList<>();
        List<SourceCitation> citations = new ArrayList<>();

        if (response != null && response.getResults() != null) {
            for (SearchResult r : response.getResults()) {
                if (r.getScore() < MIN_SCORE_THRESHOLD) continue;
                filtered.add(r);
                citations.add(SourceCitation.builder()
                        .chunkId(r.getId())
                        .sourceType(r.getSourceType())
                        .sourceId(r.getSourceId())
                        .title(r.getTitle())
                        .jlptLevel(r.getJlptLevel())
                        .route(extractRoute(r.getMetadataJson(), r.getSourceType()))
                        .score(Math.round(r.getScore() * 1000.0) / 1000.0)
                        .build());
            }
        }
        return new RetrievalResult(filtered, citations);
    }

    private String buildSearchQuery(String userQuery, String pageContext) {
        String q = userQuery == null ? "" : userQuery.trim();
        if (pageContext != null && !pageContext.isBlank() && q.length() < 80) {
            return q + " (" + pageContext.trim() + ")";
        }
        return q;
    }

    private String extractRoute(String metadataJson, String sourceType) {
        if (metadataJson != null && !metadataJson.isBlank()) {
            try {
                JsonNode node = mapper.readTree(metadataJson);
                String route = node.path("route").asText("");
                if (!route.isBlank()) return route;
            } catch (Exception ignored) {}
        }
        return switch (sourceType == null ? "" : sourceType) {
            case "KANJI", "KANJI_VOCAB" -> "/kanji";
            case "GRAMMAR", "GRAMMAR_LESSON" -> "/grammar";
            case "VOCAB" -> "/flashcards";
            case "EXAM_QUESTION" -> "/exams";
            default -> "/";
        };
    }
}

