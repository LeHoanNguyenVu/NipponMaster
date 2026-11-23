package com.nihongo.api.modules.reading.article.controller;

import com.nihongo.api.common.security.JwtAuthenticationFilter;
import com.nihongo.api.common.security.JwtBlacklistService;
import com.nihongo.api.common.security.JwtTokenProvider;
import com.nihongo.api.common.security.SecurityConfig;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AudioGenerationResultDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.IngestReportDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository;
import com.nihongo.api.modules.reading.article.service.ReadingCoverImageService;
import com.nihongo.api.modules.reading.article.service.ReadingIngestService;
import com.nihongo.api.modules.reading.article.service.ReadingTtsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminReadingController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class})
class AdminReadingControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReadingIngestService ingestService;

    @MockitoBean
    private ReadingArticleRepository repository;

    @MockitoBean
    private ReadingTtsService ttsService;

    @MockitoBean
    private ReadingCoverImageService coverImageService;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private JwtBlacklistService jwtBlacklistService;

    @Test
    void ingest_withoutAuth_isRejected403() throws Exception {
        mockMvc.perform(post("/api/v1/admin/reading/ingest"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void ingest_asStudent_isForbidden403() throws Exception {
        mockMvc.perform(post("/api/v1/admin/reading/ingest"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "TEACHER")
    void listArticles_asTeacher_isForbidden403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/reading/articles"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void ingest_asAdmin_succeeds200() throws Exception {
        when(ingestService.runIngest(any(), any())).thenReturn(IngestReportDto.builder()
                .fetchedItems(3)
                .skippedDuplicates(0)
                .createdArticles(1)
                .createdVersions(3)
                .failedItems(0)
                .errors(List.of())
                .build());

        mockMvc.perform(post("/api/v1/admin/reading/ingest?maxEvents=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.createdArticles").value(1))
                .andExpect(jsonPath("$.data.createdVersions").value(3));
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void generateAudio_asStudent_isForbidden403() throws Exception {
        mockMvc.perform(post("/api/v1/admin/reading/versions/1/audio"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void generateAudio_asAdmin_succeeds200() throws Exception {
        when(ttsService.generateAudioForVersion(1L, null, false)).thenReturn(AudioGenerationResultDto.builder()
                .versionId(1L)
                .articleId(1L)
                .jlptLevel("N5")
                .voiceName("Kore")
                .audioStatus("READY")
                .totalSentences(5)
                .readySentences(5)
                .failedSentences(0)
                .totalDurationMs(15000L)
                .build());

        mockMvc.perform(post("/api/v1/admin/reading/versions/1/audio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.audioStatus").value("READY"))
                .andExpect(jsonPath("$.data.voiceName").value("Kore"));
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void generateCoverImage_asStudent_isForbidden403() throws Exception {
        mockMvc.perform(post("/api/v1/admin/reading/articles/1/cover-image"))
                .andExpect(status().isForbidden());
    }
}
