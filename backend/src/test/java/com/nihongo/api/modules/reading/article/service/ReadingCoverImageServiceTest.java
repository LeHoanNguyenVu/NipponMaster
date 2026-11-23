package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.storage.StorageService;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AdminArticleSummaryDto;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReadingCoverImageServiceTest {

    @Test
    void resolveHybridCoverImage_cascadesGeminiThenPexelsThenWikimedia() {
        ReadingArticleRepository repo = mock(ReadingArticleRepository.class);
        StorageService storage = mock(StorageService.class);
        ObjectMapper mapper = new ObjectMapper();

        ReadingCoverImageService geminiWins = new ReadingCoverImageService(repo, storage, mapper) {
            @Override
            protected CoverImageResult tryGenerateWithGemini(Long articleId, String category, List<String> facts) {
                return new CoverImageResult("https://cdn.example.com/a1.jpg", "AI", "GEMINI");
            }

            @Override
            protected CoverImageResult tryFetchFromPexels(Long articleId, String category, List<String> facts) {
                fail("Không được gọi Pexels khi Gemini đã thành công");
                return null;
            }

            @Override
            protected CoverImageResult tryFetchFromWikimedia(Long articleId, String category, List<String> facts) {
                fail("Không được gọi Wikimedia khi Gemini đã thành công");
                return null;
            }
        };
        assertEquals("GEMINI", geminiWins.resolveHybridCoverImage(1L, "SOCIETY", List.of("Họp báo")).source());

        ReadingCoverImageService pexelsFallback = new ReadingCoverImageService(repo, storage, mapper) {
            @Override
            protected CoverImageResult tryGenerateWithGemini(Long articleId, String category, List<String> facts) {
                return null;
            }

            @Override
            protected CoverImageResult tryFetchFromPexels(Long articleId, String category, List<String> facts) {
                return new CoverImageResult("https://images.pexels.com/photos/123/p.jpeg", "Photo by A / Pexels", "PEXELS");
            }

            @Override
            protected CoverImageResult tryFetchFromWikimedia(Long articleId, String category, List<String> facts) {
                fail("Không được gọi Wikimedia khi Pexels đã thành công");
                return null;
            }
        };
        assertEquals("PEXELS", pexelsFallback.resolveHybridCoverImage(1L, "SOCIETY", List.of("Họp báo")).source());

        ReadingCoverImageService wikimediaFallback = new ReadingCoverImageService(repo, storage, mapper) {
            @Override
            protected CoverImageResult tryGenerateWithGemini(Long articleId, String category, List<String> facts) {
                return null;
            }

            @Override
            protected CoverImageResult tryFetchFromPexels(Long articleId, String category, List<String> facts) {
                return null;
            }

            @Override
            protected CoverImageResult tryFetchFromWikimedia(Long articleId, String category, List<String> facts) {
                return new CoverImageResult("https://upload.wikimedia.org/wikipedia/commons/a/a1/Tokyo.jpg", "Photo: A (CC BY-SA 4.0) · Wikimedia", "WIKIMEDIA");
            }
        };
        assertEquals("WIKIMEDIA", wikimediaFallback.resolveHybridCoverImage(1L, "SOCIETY", List.of("Họp báo")).source());
    }

    @Test
    void isAllowedOpenLicense_onlyPermitsOpenCommercialLicenses() {
        assertTrue(ReadingCoverImageService.isAllowedOpenLicense("CC0"));
        assertTrue(ReadingCoverImageService.isAllowedOpenLicense("Public domain"));
        assertTrue(ReadingCoverImageService.isAllowedOpenLicense("CC BY 4.0"));
        assertTrue(ReadingCoverImageService.isAllowedOpenLicense("CC BY-SA 3.0"));
        assertFalse(ReadingCoverImageService.isAllowedOpenLicense("CC BY-NC 4.0"));
        assertFalse(ReadingCoverImageService.isAllowedOpenLicense("All rights reserved"));
        assertFalse(ReadingCoverImageService.isAllowedOpenLicense("Fair use"));
    }

    @Test
    void isSafePublicHttpsImageUrl_rejectsLocalhostPrivateIpsAndNonHttps() {
        assertTrue(ReadingCoverImageService.isSafePublicHttpsImageUrl("https://images.pexels.com/photos/1/test.jpg"));
        assertFalse(ReadingCoverImageService.isSafePublicHttpsImageUrl("http://images.pexels.com/photos/1/test.jpg"));
        assertFalse(ReadingCoverImageService.isSafePublicHttpsImageUrl("javascript:alert(1)"));
        assertFalse(ReadingCoverImageService.isSafePublicHttpsImageUrl("https://localhost:8088/a.png"));
        assertFalse(ReadingCoverImageService.isSafePublicHttpsImageUrl("https://127.0.0.1/a.png"));
        assertFalse(ReadingCoverImageService.isSafePublicHttpsImageUrl("https://169.254.169.254/latest/meta-data"));
    }

    @Test
    void setManualCoverImage_rejectsUnsafeUrlAndAllowsClearing() {
        ReadingArticleRepository repo = mock(ReadingArticleRepository.class);
        StorageService storage = mock(StorageService.class);
        ReadingCoverImageService svc = new ReadingCoverImageService(repo, storage, new ObjectMapper());
        when(repo.findAdminArticleById(5L)).thenReturn(AdminArticleSummaryDto.builder().id(5L).build());

        assertThrows(BusinessException.class, () -> svc.setManualCoverImage(5L, "http://evil.example.com/a.jpg", null));

        svc.setManualCoverImage(5L, "", null);
        verify(repo).updateArticleCoverImage(5L, null, null, null);
    }

    @Test
    void buildQueries_andPrompt_respectTopicAndSafety() {
        assertTrue(ReadingCoverImageService.buildPexelsQuery("SOCIETY", List.of("Bộ trưởng tổ chức họp báo")).contains("government"));
        assertTrue(ReadingCoverImageService.buildWikimediaQuery("SOCIETY", List.of("Bộ trưởng tổ chức họp báo")).contains("Kasumigaseki"));
        assertTrue(ReadingCoverImageService.buildWikimediaQuery("SOCIETY", List.of("Ngân hàng tủy xương Nhật Bản")).contains("hospital"));
        assertDoesNotThrow(() -> ReadingCoverImageService.buildWikimediaSearchUri("Kasumigaseki Central Government Building Tokyo"));
        String prompt = ReadingCoverImageService.buildEditorialImagePrompt("SOCIETY", List.of("Ngân hàng tủy xương Nhật Bản"));
        assertTrue(prompt.contains("STRICTLY NO readable text"));
        assertTrue(prompt.contains("NEVER depict the recognizable face"));
    }
}
