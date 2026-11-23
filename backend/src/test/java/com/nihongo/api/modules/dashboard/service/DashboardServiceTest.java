package com.nihongo.api.modules.dashboard.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.dashboard.dto.DashboardStatsResponse;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private KanjiRepository kanjiRepository;
    @Mock
    private GrammarRepository grammarRepository;
    @Mock
    private ReadingArticleRepository readingArticleRepository;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    void getStats_returnsRealReadingProgressFromDatabase() {
        User user = new User();
        user.setId(7L);
        user.setJlptLevel(User.JlptLevel.N5);
        user.setTargetLevel(User.JlptLevel.N3);

        when(userRepository.findById(7L)).thenReturn(Optional.of(user));
        when(kanjiRepository.countByJlptLevel(User.JlptLevel.N5)).thenReturn(80L);
        when(grammarRepository.countByJlptLevel(User.JlptLevel.N5)).thenReturn(40L);
        when(readingArticleRepository.countCompletedByUser(7L)).thenReturn(2L);
        when(readingArticleRepository.countPublishedVersions()).thenReturn(9L);

        DashboardStatsResponse res = dashboardService.getStats(7L);

        assertEquals("N5", res.getJlptLevel());
        assertEquals(2L, res.getReadingCompleted());
        assertEquals(9L, res.getReadingTotal());
        verify(readingArticleRepository).countCompletedByUser(7L);
        verify(readingArticleRepository).countPublishedVersions();
    }

    @Test
    void getStats_unauthenticatedUserHasZeroReadingCompleted() {
        when(kanjiRepository.countByJlptLevel(User.JlptLevel.STARTER)).thenReturn(0L);
        when(grammarRepository.countByJlptLevel(User.JlptLevel.STARTER)).thenReturn(0L);
        when(readingArticleRepository.countPublishedVersions()).thenReturn(3L);

        DashboardStatsResponse res = dashboardService.getStats(null);

        assertEquals(0L, res.getReadingCompleted());
        assertEquals(3L, res.getReadingTotal());
        verify(readingArticleRepository, never()).countCompletedByUser(any());
    }
}
