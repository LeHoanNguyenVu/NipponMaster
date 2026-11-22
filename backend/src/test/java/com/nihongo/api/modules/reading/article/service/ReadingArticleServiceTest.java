package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReadingArticleServiceTest {

    @Mock
    private ReadingArticleRepository repository;

    @InjectMocks
    private ReadingArticleService service;

    @Test
    void listPublishedArticles_normalizesValidFiltersAndDelegates() {
        ReadingArticleListResponse mockRes = ReadingArticleListResponse.builder()
                .items(List.of(ReadingArticleCardDto.builder()
                        .versionId(1L).articleId(1L).jlptLevel("N3").category("LIFE").titleJa("テスト").build()))
                .page(0).size(12).totalItems(1).totalPages(1)
                .build();
        when(repository.findPublishedArticles(10L, "N3", "LIFE", 0, 12)).thenReturn(mockRes);

        ReadingArticleListResponse res = service.listPublishedArticles(10L, "n3", "life", 0, 12);

        assertEquals(1, res.getItems().size());
        verify(repository).findPublishedArticles(10L, "N3", "LIFE", 0, 12);
    }

    @Test
    void listPublishedArticles_rejectsInvalidLevelCategoryOrOversizedPage() {
        assertThrows(BusinessException.class, () -> service.listPublishedArticles(10L, "N6", null, 0, 12));
        assertThrows(BusinessException.class, () -> service.listPublishedArticles(10L, "N3", "INVALID_CAT", 0, 12));
        assertThrows(BusinessException.class, () -> service.listPublishedArticles(10L, "N3", null, 0, 51));
        assertThrows(BusinessException.class, () -> service.listPublishedArticles(10L, "N3", null, -1, 12));
    }

    @Test
    void completeVersion_nonPublishedThrowsNotFound() {
        when(repository.isPublishedVersion(99L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> service.completeVersion(99L, 10L, 120));
        verify(repository, never()).markVersionCompleted(any(), any(), any());
    }

    @Test
    void completeVersion_publishedMarksCompletedAndReturnsTotal() {
        when(repository.isPublishedVersion(1L)).thenReturn(true);
        when(repository.markVersionCompleted(10L, 1L, 95)).thenReturn(4);

        CompleteReadingResponse res = service.completeVersion(1L, 10L, 95);

        assertTrue(res.isCompleted());
        assertEquals(4, res.getTotalCompleted());
    }
}
