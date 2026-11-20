package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import com.nihongo.api.modules.reading.article.service.CopyrightGuardService.CopyrightCheckResult;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionInsertPayload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.*;

/**
 * Pipeline Ingest bài đọc:
 * RSS (whitelist) -> dedup source_url -> trích facts tiếng Việt -> sinh bài gốc theo từng cấp độ
 * -> kiểm tra chống sao chép (< 10% 8-gram) -> tách từ Kuromoji -> random giọng Kore/Puck -> lưu DB (REVIEW).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReadingIngestService {

    private static final List<String> VOICES = List.of("Kore", "Puck");
    private static final int MAX_EVENTS_HARD_CAP = 10;

    private final ReadingRssClient rssClient;
    private final ReadingContentGenerator contentGenerator;
    private final JapaneseTokenizer tokenizer;
    private final CopyrightGuardService copyrightGuard;
    private final ReadingArticleRepository repository;

    private final SecureRandom random = new SecureRandom();

    @Value("${reading.ingest.max-events-per-run:5}")
    private int defaultMaxEvents = 5;

    @Value("${reading.ingest.target-levels:N5,N3,N1}")
    private String targetLevelsConfig = "N5,N3,N1";

    public IngestReportDto runIngest(Integer maxEventsOverride, String sourceFilter) {
        int maxEvents = maxEventsOverride != null
                ? Math.max(1, Math.min(maxEventsOverride, MAX_EVENTS_HARD_CAP))
                : Math.max(1, Math.min(defaultMaxEvents, MAX_EVENTS_HARD_CAP));

        List<String> targetLevels = parseTargetLevels();
        List<RssItem> feedItems = rssClient.fetchEnabledFeeds(sourceFilter, 6);

        int fetched = feedItems.size();
        int skippedDuplicates = 0;
        int createdArticles = 0;
        int createdVersions = 0;
        int failed = 0;
        List<String> errors = new ArrayList<>();

        for (RssItem item : feedItems) {
            if (createdArticles >= maxEvents) {
                break;
            }
            if (repository.existsBySourceUrl(item.link())) {
                skippedDuplicates++;
                continue;
            }
            try {
                int versionsSaved = ingestSingleEvent(item, targetLevels);
                if (versionsSaved > 0) {
                    createdArticles++;
                    createdVersions += versionsSaved;
                } else {
                    failed++;
                    errors.add(item.sourceCode() + ": không có phiên bản nào vượt qua kiểm định bản quyền");
                }
            } catch (Exception e) {
                failed++;
                String msg = item.sourceCode() + " [" + item.link() + "]: " + e.getMessage();
                errors.add(msg);
                log.warn("Lỗi ingest sự kiện {}: {}", item.sourceCode(), e.getMessage());
            }
        }

        log.info("Reading ingest hoàn tất: fetched={}, skippedDup={}, createdArticles={}, createdVersions={}, failed={}",
                fetched, skippedDuplicates, createdArticles, createdVersions, failed);

        return IngestReportDto.builder()
                .fetchedItems(fetched)
                .skippedDuplicates(skippedDuplicates)
                .createdArticles(createdArticles)
                .createdVersions(createdVersions)
                .failedItems(failed)
                .errors(errors)
                .build();
    }

    protected int ingestSingleEvent(RssItem item, List<String> targetLevels) {
        // Bước 1: Facts Firewall (chỉ trích sự kiện khách quan bằng tiếng Việt)
        FactsExtractionResult extracted = contentGenerator.extractFacts(item);

        // Random 50/50 1 giọng cho toàn bộ bài (Kore = Nữ, Puck = Nam)
        String voiceName = VOICES.get(random.nextInt(VOICES.size()));
        String rawRssForCopyrightCheck = item.combinedRawText();

        List<VersionInsertPayload> prepared = new ArrayList<>();
        for (String level : targetLevels) {
            VersionInsertPayload v = generateAndVerifyVersion(extracted.getFacts(), level, rawRssForCopyrightCheck, voiceName);
            if (v != null) {
                prepared.add(v);
            }
        }

        if (prepared.isEmpty()) {
            return 0;
        }

        repository.saveArticleWithVersions(
                item.sourceCode(),
                item.sourceLicense(),
                item.link(),
                item.title(),
                item.publishedAt(),
                extracted.getCategory(),
                extracted.getFacts(),
                prepared
        );
        return prepared.size();
    }

    private VersionInsertPayload generateAndVerifyVersion(List<String> facts, String targetLevel, String rawRss, String voiceName) {
        String feedback = null;
        for (int attempt = 1; attempt <= 2; attempt++) {
            GeneratedArticleDto generated = contentGenerator.generateArticleForLevel(facts, targetLevel, feedback);
            String fullJaText = joinSentenceTexts(generated.getSentences());
            CopyrightCheckResult check = copyrightGuard.evaluate(fullJaText, rawRss);

            if (check.passed()) {
                // Tokenize từng câu bằng Kuromoji
                int charCount = 0;
                for (SentenceDto s : generated.getSentences()) {
                    s.setTokens(tokenizer.tokenize(s.getText()));
                    charCount += s.getText().length();
                }
                Map<String, Object> metrics = new LinkedHashMap<>();
                metrics.put("ngramOverlap8", Math.round(check.ngramOverlap8() * 10000.0) / 10000.0);
                metrics.put("longestCommonSubstring", check.longestCommonSubstring());
                metrics.put("copyrightPassed", true);
                metrics.put("needsReview", false);
                return new VersionInsertPayload(
                        targetLevel,
                        generated.getTitleJa(),
                        generated.getTitleVi(),
                        generated.getSentences(),
                        generated.getKeyVocab(),
                        charCount,
                        null, // computed_level sẽ được bộ phân loại Phase 2 tính
                        metrics,
                        voiceName
                );
            }

            log.warn("Phiên bản [{}] vượt ngưỡng trùng lặp 8-gram ({}% >= {}%), thử viết lại lần {}",
                    targetLevel,
                    String.format("%.1f", check.ngramOverlap8() * 100.0),
                    String.format("%.1f", check.threshold() * 100.0),
                    attempt);
            feedback = "Bản nháp trước còn diễn đạt hơi gần tin gốc. Hãy viết lại hoàn toàn bằng cấu trúc câu và cách diễn đạt mới tự nhiên hơn.";
        }
        log.warn("Bỏ qua phiên bản [{}] sau 2 lần vẫn không đạt kiểm định chống sao chép", targetLevel);
        return null;
    }

    private String joinSentenceTexts(List<SentenceDto> sentences) {
        StringBuilder sb = new StringBuilder();
        for (SentenceDto s : sentences) {
            if (s.getText() != null) sb.append(s.getText());
        }
        return sb.toString();
    }

    private List<String> parseTargetLevels() {
        String cfg = (targetLevelsConfig == null || targetLevelsConfig.isBlank()) ? "N5,N3,N1" : targetLevelsConfig;
        List<String> valid = List.of("N5", "N4", "N3", "N2", "N1");
        List<String> out = new ArrayList<>();
        for (String token : cfg.split(",")) {
            String lv = token.trim().toUpperCase(Locale.ROOT);
            if (valid.contains(lv) && !out.contains(lv)) {
                out.add(lv);
            }
        }
        return out.isEmpty() ? List.of("N5", "N3", "N1") : out;
    }
}
