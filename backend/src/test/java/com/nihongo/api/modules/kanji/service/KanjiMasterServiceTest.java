package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.kanji.dto.KanjiChapterDetailResponseDto;
import com.nihongo.api.modules.kanji.dto.KanjiRoadmapResponseDto;
import com.nihongo.api.modules.kanji.dto.KanjiSubmitRequestDto;
import com.nihongo.api.modules.kanji.dto.KanjiSubmitResultDto;
import com.nihongo.api.modules.kanji.entity.*;
import com.nihongo.api.modules.kanji.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KanjiMasterServiceTest {

    @Mock
    private KanjiChapterRepository chapterRepository;
    @Mock
    private KanjiRepository kanjiRepository;
    @Mock
    private KanjiChapterVocabRepository vocabRepository;
    @Mock
    private KanjiExerciseRepository exerciseRepository;
    @Mock
    private KanjiMinigameRepository minigameRepository;
    @Mock
    private UserKanjiProgressRepository progressRepository;
    @Mock
    private KanjiAchievementTestRepository achievementTestRepository;

    @InjectMocks
    private KanjiMasterService kanjiMasterService;

    private KanjiChapter chapter1;
    private KanjiChapter chapter2;
    private List<KanjiAchievementTest> n4AchievementTests;

    @BeforeEach
    void setUp() {
        chapter1 = KanjiChapter.builder()
                .chapterNumber(1)
                .jlptLevel("N4")
                .titleJa("家族の生かつ")
                .titleVi("Đời sống gia đình")
                .kanjiCount(8)
                .displayOrder(1)
                .build();
        chapter1.setId(31L);

        chapter2 = KanjiChapter.builder()
                .chapterNumber(2)
                .jlptLevel("N4")
                .titleJa("コンビニ")
                .titleVi("Cửa hàng tiện lợi")
                .kanjiCount(22)
                .displayOrder(2)
                .build();
        chapter2.setId(32L);

        KanjiAchievementTest test1 = KanjiAchievementTest.builder()
                .stage(4)
                .title("Achievement Test 1 (Chương 1 ~ 3)")
                .passPercentage(85)
                .build();
        test1.setId(7L);

        KanjiAchievementTest test2 = KanjiAchievementTest.builder()
                .stage(5)
                .title("Achievement Test 2 (Chương 4 ~ 6)")
                .passPercentage(85)
                .build();
        test2.setId(8L);

        KanjiAchievementTest test3 = KanjiAchievementTest.builder()
                .stage(6)
                .title("Achievement Test 3 (Chương 7 ~ 9) & Kỳ thi Tốt Nghiệp N4")
                .passPercentage(85)
                .build();
        test3.setId(9L);

        n4AchievementTests = List.of(test1, test2, test3);
    }

    @Test
    @DisplayName("Task 1.3: getRoadmap for N4 returns 9 chapters and Stages 4, 5, 6 tests")
    void testGetRoadmap_N4() {
        when(chapterRepository.findByJlptLevelOrderByDisplayOrderAsc("N4"))
                .thenReturn(List.of(chapter1, chapter2));
        when(achievementTestRepository.findByStageInOrderByStageAsc(List.of(4, 5, 6)))
                .thenReturn(n4AchievementTests);
        when(progressRepository.findByUserId(100L))
                .thenReturn(List.of());

        KanjiRoadmapResponseDto response = kanjiMasterService.getRoadmap(100L, "N4");

        assertNotNull(response);
        assertEquals("N4", response.getLevel());
        assertEquals(2, response.getTotalChapters());
        assertEquals(30, response.getTotalKanji());
        assertEquals(3, response.getAchievementTests().size());
        assertEquals(4, response.getAchievementTests().get(0).getStage());
        assertEquals(5, response.getAchievementTests().get(1).getStage());
        assertEquals(6, response.getAchievementTests().get(2).getStage());

        // Chapter 1 is unlocked by default
        assertTrue(response.getChapters().get(0).getIsUnlocked());
        // Chapter 2 is locked initially
        assertFalse(response.getChapters().get(1).getIsUnlocked());

        verify(chapterRepository).findByJlptLevelOrderByDisplayOrderAsc("N4");
        verify(achievementTestRepository).findByStageInOrderByStageAsc(List.of(4, 5, 6));
    }

    @Test
    @DisplayName("Task 1.3: getChapterDetail returns kanjis, vocabs, exercises and minigames")
    void testGetChapterDetail() {
        when(chapterRepository.findById(31L)).thenReturn(Optional.of(chapter1));
        when(kanjiRepository.findByChapterIdOrderByChapterOrderAsc(31L)).thenReturn(List.of(
                Kanji.builder().character("家").hanViet("GIA").jlptLevel(User.JlptLevel.N4).build(),
                Kanji.builder().character("族").hanViet("TỘC").jlptLevel(User.JlptLevel.N4).build()
        ));
        when(vocabRepository.findByChapterIdOrderByDisplayOrderAsc(31L)).thenReturn(List.of(
                KanjiChapterVocab.builder().word("家族").reading("かぞく").meaningVi("gia đình").build()
        ));
        when(exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(31L, "READING")).thenReturn(List.of(
                KanjiExercise.builder().questionText("家族").correctAnswer("かぞく").build()
        ));
        when(exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(31L, "WRITING")).thenReturn(List.of(
                KanjiExercise.builder().questionText("かぞく").correctAnswer("家族").build()
        ));
        when(minigameRepository.findByChapterIdOrderByDisplayOrderAsc(31L)).thenReturn(List.of(
                KanjiMinigame.builder().title("Ghép gia phả").gameType("PICTURE_MATCH").instruction("Hướng dẫn").gameDataJson("[]").build()
        ));

        KanjiChapterDetailResponseDto detail = kanjiMasterService.getChapterDetail(100L, 31L);

        assertNotNull(detail);
        assertEquals(31L, detail.getChapter().getId());
        assertEquals(2, detail.getKanjis().size());
        assertEquals("家", detail.getKanjis().get(0).getCharacter());
        assertEquals(1, detail.getVocabularies().size());
        assertEquals(1, detail.getReadingExercises().size());
        assertEquals(1, detail.getWritingExercises().size());
        assertEquals(1, detail.getMinigames().size());
    }

    @Test
    @DisplayName("Task 1.3: submitChapterTest with score >= 85 unlocks next chapter")
    void testSubmitChapterTest_Passed() {
        when(chapterRepository.findById(31L)).thenReturn(Optional.of(chapter1));
        when(chapterRepository.findByJlptLevelAndChapterNumber("N4", 2)).thenReturn(Optional.of(chapter2));
        when(progressRepository.findByUserIdAndChapterId(100L, 31L)).thenReturn(Optional.empty());
        when(progressRepository.findByUserIdAndChapterId(100L, 32L)).thenReturn(Optional.empty());

        KanjiSubmitRequestDto req = KanjiSubmitRequestDto.builder()
                .score(90)
                .totalQuestions(10)
                .correctCount(9)
                .build();

        KanjiSubmitResultDto result = kanjiMasterService.submitChapterTest(100L, 31L, req);

        assertNotNull(result);
        assertEquals(90, result.getScore());
        assertTrue(result.getIsPassed());
        assertTrue(result.getUnlockedNextChapter());
        assertEquals(32L, result.getNextChapterId());
        assertEquals(2, result.getNextChapterNumber());

        // Verify progress is saved for chapter 1 and chapter 2
        verify(progressRepository, times(2)).save(any(UserKanjiProgress.class));
    }

    @Test
    @DisplayName("Task 1.3: submitChapterTest with score < 85 does not unlock next chapter")
    void testSubmitChapterTest_Failed() {
        when(chapterRepository.findById(31L)).thenReturn(Optional.of(chapter1));
        when(progressRepository.findByUserIdAndChapterId(100L, 31L)).thenReturn(Optional.empty());

        KanjiSubmitRequestDto req = KanjiSubmitRequestDto.builder()
                .score(70)
                .totalQuestions(10)
                .correctCount(7)
                .build();

        KanjiSubmitResultDto result = kanjiMasterService.submitChapterTest(100L, 31L, req);

        assertNotNull(result);
        assertEquals(70, result.getScore());
        assertFalse(result.getIsPassed());
        assertFalse(result.getUnlockedNextChapter());
        assertNull(result.getNextChapterId());
    }
}
