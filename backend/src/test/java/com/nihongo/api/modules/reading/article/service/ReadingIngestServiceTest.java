package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionInsertPayload;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReadingIngestServiceTest {

    @Mock
    private ReadingRssClient rssClient;

    @Mock
    private ReadingContentGenerator contentGenerator;

    @Mock
    private ReadingArticleRepository repository;

    @Mock
    private ReadingCoverImageService coverImageService;

    @Mock
    private ReadingTtsService ttsService;

    private final JapaneseTokenizer tokenizer = new JapaneseTokenizer();
    private final CopyrightGuardService copyrightGuard = new CopyrightGuardService();
    private final JlptLexiconService lexicon = new JlptLexiconService();
    private final JlptLevelClassifier levelClassifier = new JlptLevelClassifier(lexicon, tokenizer);

    @Test
    void runIngest_generatesThreeLevelsTokenizesClassifiesAndSavesAsReview() {
        ReadingIngestService service = new ReadingIngestService(
                rssClient, contentGenerator, tokenizer, copyrightGuard, levelClassifier, repository, coverImageService, ttsService
        );

        RssItem dup = new RssItem("GOV_ONLINE", "PDL_1_0", "LIFE", "Old", "Old desc", "https://www.gov-online.go.jp/old.html", OffsetDateTime.now());
        RssItem fresh = new RssItem(
                "GOV_ONLINE", "PDL_1_0", "LIFE",
                "冬の省エネ対策について",
                "家庭で暖房の設定温度を見直す取り組みを紹介します。",
                "https://www.gov-online.go.jp/new.html",
                OffsetDateTime.now()
        );

        when(rssClient.fetchEnabledFeeds(null, 6)).thenReturn(List.of(dup, fresh));
        when(repository.existsBySourceUrl(dup.link())).thenReturn(true);
        when(repository.existsBySourceUrl(fresh.link())).thenReturn(false);

        when(contentGenerator.extractFacts(fresh)).thenReturn(FactsExtractionResult.builder()
                .facts(List.of("Chính phủ khuyến nghị tiết kiệm điện mùa đông.", "Các gia đình điều chỉnh nhiệt độ máy sưởi hợp lý."))
                .category("LIFE")
                .build());

        when(contentGenerator.generateArticleForLevel(anyList(), anyString(), any())).thenAnswer(inv -> {
            String lv = inv.getArgument(1);
            if ("N5".equals(lv)) {
                return GeneratedArticleDto.builder()
                        .titleJa("ふゆのでんき")
                        .titleVi("Điện mùa đông (N5)")
                        .sentences(List.of(
                                SentenceDto.builder().idx(0).text("ふゆはさむいです。").translationVi("Mùa đông lạnh.").build(),
                                SentenceDto.builder().idx(1).text("いえででんきをたくさんつかいます。").translationVi("Ở nhà dùng nhiều điện.").build(),
                                SentenceDto.builder().idx(2).text("すこしきをつけましょう。").translationVi("Hãy chú ý một chút.").build()
                        ))
                        .keyVocab(List.of())
                        .build();
            }
            return GeneratedArticleDto.builder()
                    .titleJa("冬の電気を大切にする方法（" + lv + "）")
                    .titleVi("Cách tiết kiệm điện mùa đông (" + lv + ")")
                    .sentences(List.of(
                            SentenceDto.builder().idx(0).text("冬は寒いので電気をたくさん使います。").translationVi("Mùa đông lạnh nên dùng nhiều điện.").build(),
                            SentenceDto.builder().idx(1).text("家でエアコンの温度に気をつけましょう。").translationVi("Hãy chú ý nhiệt độ điều hòa ở nhà.").build(),
                            SentenceDto.builder().idx(2).text("少しの工夫で毎月の料金が安くなります。").translationVi("Chỉ cần chút khéo léo sẽ giảm tiền điện hàng tháng.").build()
                    ))
                    .keyVocab(List.of(KeyVocabDto.builder().word("工夫").reading("くふう").meaningVi("Sự khéo léo").jlptLevel(lv).build()))
                    .build();
        });
        when(contentGenerator.assessJlptLevelSecondOpinion(anyString())).thenReturn("N3");
        when(repository.saveArticleWithVersions(any(), any(), any(), any(), any(), any(), anyList(), anyList())).thenReturn(42L);

        IngestReportDto report = service.runIngest(5, null);

        assertEquals(2, report.getFetchedItems());
        assertEquals(1, report.getSkippedDuplicates());
        assertEquals(1, report.getCreatedArticles());
        assertEquals(3, report.getCreatedVersions());
        assertEquals(0, report.getFailedItems());

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<VersionInsertPayload>> versionsCaptor = ArgumentCaptor.forClass(List.class);
        verify(repository).saveArticleWithVersions(
                eq("GOV_ONLINE"), eq("PDL_1_0"), eq(fresh.link()), eq(fresh.title()),
                eq(fresh.publishedAt()), eq("LIFE"), anyList(), versionsCaptor.capture()
        );
        verify(ttsService).generateAudioForArticleAsync(42L);

        List<VersionInsertPayload> savedVersions = versionsCaptor.getValue();
        assertEquals(3, savedVersions.size());
        String voice = savedVersions.get(0).voiceName();
        assertTrue("Kore".equals(voice) || "Puck".equals(voice));
        for (VersionInsertPayload v : savedVersions) {
            assertEquals(voice, v.voiceName());
            assertTrue(v.charCount() > 0);
            assertNotNull(v.computedLevel(), "Phase 2 must populate computed_level");
            assertNotNull(v.levelMetrics().get("coverage"));
            assertFalse(v.sentences().get(0).getTokens().isEmpty());
            assertEquals(Boolean.TRUE, v.levelMetrics().get("copyrightPassed"));
        }
    }

    @Test
    void runIngest_triggersRewriteWhenDraftIsTooHardForN5() {
        ReadingIngestService service = new ReadingIngestService(
                rssClient, contentGenerator, tokenizer, copyrightGuard, levelClassifier, repository, coverImageService, ttsService
        );

        RssItem item = new RssItem("GOV_ONLINE", "PDL_1_0", "LIFE", "省エネの案内", "冬の節電について", "https://www.gov-online.go.jp/rewrite.html", OffsetDateTime.now());
        when(rssClient.fetchEnabledFeeds("GOV_ONLINE", 6)).thenReturn(List.of(item));
        when(repository.existsBySourceUrl(item.link())).thenReturn(false);
        when(contentGenerator.extractFacts(item)).thenReturn(FactsExtractionResult.builder()
                .facts(List.of("Tiết kiệm điện mùa đông."))
                .category("LIFE")
                .build());

        // Lần 1 trả N1 cho target N5 -> kích hoạt viết lại; lần 2 trả N5 chuẩn
        when(contentGenerator.generateArticleForLevel(anyList(), eq("N5"), isNull())).thenReturn(
                GeneratedArticleDto.builder()
                        .titleJa("金融政策と電力")
                        .titleVi("Quá khó")
                        .sentences(List.of(
                                SentenceDto.builder().idx(0).text("金融政策の正常化をめぐる議論が活発化する中、極めて繊細な舵取りを余儀なくされている。").translationVi("...").build(),
                                SentenceDto.builder().idx(1).text("制度的規制の整備にとどまらず、批判的思考力の涵養が不可欠と言わざるを得ない。").translationVi("...").build(),
                                SentenceDto.builder().idx(2).text("地政学的リスクの顕在化によって転換期を迎えている。").translationVi("...").build()
                        ))
                        .keyVocab(List.of())
                        .build()
        );
        when(contentGenerator.generateArticleForLevel(anyList(), eq("N5"), argThat(fb -> fb != null && fb.contains("khó hơn mục tiêu N5")))).thenReturn(
                GeneratedArticleDto.builder()
                        .titleJa("ふゆのでんき")
                        .titleVi("Điện mùa đông")
                        .sentences(List.of(
                                SentenceDto.builder().idx(0).text("ふゆはさむいです。").translationVi("Mùa đông lạnh.").build(),
                                SentenceDto.builder().idx(1).text("いえででんきをつかいます。").translationVi("Ở nhà dùng điện.").build(),
                                SentenceDto.builder().idx(2).text("すこしだけつかいましょう。").translationVi("Hãy dùng ít thôi.").build()
                        ))
                        .keyVocab(List.of())
                        .build()
        );
        when(contentGenerator.generateArticleForLevel(anyList(), argThat(l -> !"N5".equals(l)), any())).thenReturn(
                GeneratedArticleDto.builder()
                        .titleJa("冬の省エネ")
                        .titleVi("Tiết kiệm điện")
                        .sentences(List.of(
                                SentenceDto.builder().idx(0).text("冬は電気の使用量が増えます。").translationVi("Mùa đông lượng điện tăng.").build(),
                                SentenceDto.builder().idx(1).text("暖房の設定温度を見直すことが大切です。").translationVi("Quan trọng là xem lại nhiệt độ sưởi.").build(),
                                SentenceDto.builder().idx(2).text("少しの工夫で光熱費を抑えられます。").translationVi("Chút khéo léo giúp giảm hóa đơn.").build()
                        ))
                        .keyVocab(List.of())
                        .build()
        );
        when(contentGenerator.assessJlptLevelSecondOpinion(anyString())).thenReturn("N5");
        when(repository.saveArticleWithVersions(any(), any(), any(), any(), any(), any(), anyList(), anyList())).thenReturn(99L);

        IngestReportDto report = service.runIngest(1, "GOV_ONLINE");

        assertEquals(1, report.getCreatedArticles());
        // Xác nhận N5 được gọi ít nhất 2 lần (lần 1 quá khó -> gọi viết lại kèm danh sách từ vượt cấp)
        verify(contentGenerator, times(1)).generateArticleForLevel(anyList(), eq("N5"), argThat(fb -> fb != null && fb.contains("khó hơn mục tiêu N5")));
    }

    @Test
    void runIngest_blocksCopiedVersionAfterRetry() {
        ReadingIngestService service = new ReadingIngestService(
                rssClient, contentGenerator, tokenizer, copyrightGuard, levelClassifier, repository, coverImageService, ttsService
        );

        String rssText = "東京都内の鉄道会社は20日、消費電力を従来より20％削減できる新型電車の運行を始めました。";
        RssItem item = new RssItem("NHK_TOP", "FACTS_ONLY", "SOCIETY", rssText, rssText, "https://www.nhk.or.jp/news/copy.html", OffsetDateTime.now());

        when(rssClient.fetchEnabledFeeds("NHK_TOP", 6)).thenReturn(List.of(item));
        when(repository.existsBySourceUrl(item.link())).thenReturn(false);
        when(contentGenerator.extractFacts(item)).thenReturn(FactsExtractionResult.builder()
                .facts(List.of("Công ty đường sắt Tokyo chạy tàu tiết kiệm 20% điện."))
                .category("SOCIETY")
                .build());

        when(contentGenerator.generateArticleForLevel(anyList(), anyString(), any())).thenReturn(
                GeneratedArticleDto.builder()
                        .titleJa("コピー")
                        .titleVi("Copy")
                        .sentences(List.of(
                                SentenceDto.builder().idx(0).text(rssText).translationVi("...").build(),
                                SentenceDto.builder().idx(1).text(rssText).translationVi("...").build(),
                                SentenceDto.builder().idx(2).text(rssText).translationVi("...").build()
                        ))
                        .keyVocab(List.of())
                        .build()
        );

        IngestReportDto report = service.runIngest(1, "NHK_TOP");

        assertEquals(0, report.getCreatedArticles());
        assertEquals(1, report.getFailedItems());
        verify(repository, never()).saveArticleWithVersions(any(), any(), any(), any(), any(), any(), anyList(), anyList());
    }
}
