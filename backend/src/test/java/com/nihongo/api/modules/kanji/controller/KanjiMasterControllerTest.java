package com.nihongo.api.modules.kanji.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.kanji.dto.KanjiChapterDetailResponseDto;
import com.nihongo.api.modules.kanji.dto.KanjiRoadmapResponseDto;
import com.nihongo.api.modules.kanji.dto.KanjiSubmitRequestDto;
import com.nihongo.api.modules.kanji.dto.KanjiSubmitResultDto;
import com.nihongo.api.modules.kanji.entity.KanjiChapter;
import com.nihongo.api.modules.kanji.service.KanjiMasterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class KanjiMasterControllerTest {

    private MockMvc mockMvc;

    @Mock
    private KanjiMasterService kanjiMasterService;

    @InjectMocks
    private KanjiMasterController kanjiMasterController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(kanjiMasterController).build();
    }

    @Test
    @DisplayName("GET /api/v1/kanji/n4/roadmap returns roadmap for N4")
    void testGetRoadmap_N4() throws Exception {
        KanjiRoadmapResponseDto mockRoadmap = KanjiRoadmapResponseDto.builder()
                .level("N4")
                .totalChapters(9)
                .totalKanji(199)
                .completedChapters(0)
                .learnedKanji(0)
                .chapters(List.of())
                .achievementTests(List.of())
                .build();

        when(kanjiMasterService.getRoadmap(any(), eq("N4"))).thenReturn(mockRoadmap);

        mockMvc.perform(get("/api/v1/kanji/n4/roadmap")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.level").value("N4"))
                .andExpect(jsonPath("$.data.totalChapters").value(9))
                .andExpect(jsonPath("$.data.totalKanji").value(199));

        verify(kanjiMasterService).getRoadmap(any(), eq("N4"));
    }

    @Test
    @DisplayName("GET /api/v1/kanji/n4/chapters/31 returns chapter 31 detail")
    void testGetChapterDetail_N4() throws Exception {
        KanjiChapter chapter = KanjiChapter.builder()
                .chapterNumber(1)
                .jlptLevel("N4")
                .titleJa("家族の生かつ")
                .titleVi("Đời sống gia đình")
                .kanjiCount(8)
                .build();
        chapter.setId(31L);

        KanjiChapterDetailResponseDto mockDetail = KanjiChapterDetailResponseDto.builder()
                .chapter(chapter)
                .kanjis(List.of())
                .vocabularies(List.of())
                .readingExercises(List.of())
                .writingExercises(List.of())
                .minigames(List.of())
                .build();

        when(kanjiMasterService.getChapterDetail(any(), eq(31L))).thenReturn(mockDetail);

        mockMvc.perform(get("/api/v1/kanji/n4/chapters/31")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.chapter.id").value(31))
                .andExpect(jsonPath("$.data.chapter.titleJa").value("家族の生かつ"));

        verify(kanjiMasterService).getChapterDetail(any(), eq(31L));
    }

    @Test
    @DisplayName("POST /api/v1/kanji/n4/chapters/31/submit returns graded score and unlock status")
    void testSubmitChapterTest_N4() throws Exception {
        KanjiSubmitRequestDto req = KanjiSubmitRequestDto.builder()
                .score(90)
                .totalQuestions(10)
                .correctCount(9)
                .build();

        KanjiSubmitResultDto mockResult = KanjiSubmitResultDto.builder()
                .score(90)
                .isPassed(true)
                .unlockedNextChapter(true)
                .nextChapterId(32L)
                .nextChapterNumber(2)
                .message("Xuất sắc! Bạn đạt 90% (Đạt chuẩn ≥ 85%). Đã mở khóa Chương 2!")
                .build();

        when(kanjiMasterService.submitChapterTest(any(), eq(31L), any(KanjiSubmitRequestDto.class)))
                .thenReturn(mockResult);

        mockMvc.perform(post("/api/v1/kanji/n4/chapters/31/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.score").value(90))
                .andExpect(jsonPath("$.data.isPassed").value(true))
                .andExpect(jsonPath("$.data.unlockedNextChapter").value(true))
                .andExpect(jsonPath("$.data.nextChapterId").value(32));

        verify(kanjiMasterService).submitChapterTest(any(), eq(31L), any(KanjiSubmitRequestDto.class));
    }
}
