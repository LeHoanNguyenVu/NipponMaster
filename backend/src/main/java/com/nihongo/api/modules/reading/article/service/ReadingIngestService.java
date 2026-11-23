package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.*;
import com.nihongo.api.modules.reading.article.service.CopyrightGuardService.CopyrightCheckResult;
import com.nihongo.api.modules.reading.article.service.JlptLevelClassifier.ClassificationResult;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionInsertPayload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Pipeline Ingest bài đọc:
 * RSS (whitelist) -> dedup source_url -> trích facts tiếng Việt -> sinh bài gốc theo từng cấp độ
 * -> kiểm tra chống sao chép (< 10% 8-gram) -> tách từ Kuromoji -> chấm cấp độ JLPT (viết lại tối đa 2 lần nếu lệch cấp)
 * -> ý kiến thứ hai LLM -> random giọng Kore/Puck -> lưu DB (REVIEW).
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
    private final JlptLevelClassifier levelClassifier;
    private final ReadingArticleRepository repository;
    private final ReadingCoverImageService coverImageService;

    private final SecureRandom random = new SecureRandom();
    private final AtomicBoolean ingestRunning = new AtomicBoolean(false);

    @Value("${reading.ingest.max-events-per-run:5}")
    private int defaultMaxEvents = 5;

    @Value("${reading.ingest.target-levels:N5,N3,N1}")
    private String targetLevelsConfig = "N5,N3,N1";

    @Value("${reading.level.llm-second-opinion-enabled:true}")
    private boolean llmSecondOpinionEnabled = true;

    public IngestReportDto runIngest(Integer maxEventsOverride, String sourceFilter) {
        if (!ingestRunning.compareAndSet(false, true)) {
            return IngestReportDto.builder()
                    .errors(List.of("Pipeline ingest đang chạy ở tiến trình khác, vui lòng thử lại sau."))
                    .build();
        }
        try {
            return executeIngest(maxEventsOverride, sourceFilter);
        } finally {
            ingestRunning.set(false);
        }
    }

    private IngestReportDto executeIngest(Integer maxEventsOverride, String sourceFilter) {
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

        Long articleId = repository.saveArticleWithVersions(
                item.sourceCode(),
                item.sourceLicense(),
                item.link(),
                item.title(),
                item.publishedAt(),
                extracted.getCategory(),
                extracted.getFacts(),
                prepared
        );
        coverImageService.generateAndSaveSilently(articleId, extracted.getCategory(), extracted.getFacts());
        return prepared.size();
    }

    private VersionInsertPayload generateAndVerifyVersion(List<String> facts, String targetLevel, String rawRss, String voiceName) {
        int targetRank = JlptLexiconService.levelToRank(targetLevel);
        String feedback = null;

        GeneratedArticleDto lastPassedCopyArticle = null;
        CopyrightCheckResult lastPassedCopyCheck = null;
        ClassificationResult lastClassification = null;

        // Vòng lặp "viết – kiểm tra bản quyền – chấm cấp độ – viết lại" (tối đa 3 lượt: 1 gốc + 2 lần viết lại)
        for (int attempt = 1; attempt <= 3; attempt++) {
            GeneratedArticleDto generated = contentGenerator.generateArticleForLevel(facts, targetLevel, feedback);
            String titleJa = generated.getTitleJa() != null ? generated.getTitleJa() : "";
            String fullJaText = titleJa + " " + joinSentenceTexts(generated.getSentences());
            CopyrightCheckResult copyCheck = copyrightGuard.evaluate(fullJaText, rawRss);

            if (!copyCheck.passed()) {
                log.warn("Phiên bản [{}] vượt ngưỡng bản quyền (8-gram={}%, lcs={}), thử viết lại lần {}",
                        targetLevel,
                        String.format("%.1f", copyCheck.ngramOverlap8() * 100.0),
                        copyCheck.longestCommonSubstring(),
                        attempt);
                feedback = "Bản nháp trước còn diễn đạt hơi gần tin gốc (kể cả tiêu đề). Hãy viết lại hoàn toàn bằng cấu trúc câu và cách diễn đạt mới tự nhiên hơn.";
                continue;
            }

            // Tokenize từng câu bằng Kuromoji
            for (SentenceDto s : generated.getSentences()) {
                s.setTokens(tokenizer.tokenize(s.getText()));
            }

            // Chấm cấp độ JLPT bằng bộ phân loại Phase 2 (đồng thời gán lv cho từng token)
            ClassificationResult classification = levelClassifier.classifySentences(
                    generated.getSentences(), generated.getKeyVocab(), targetLevel, null
            );

            // Chỉ cập nhật bản lưu tốt nhất (ưu tiên gần targetRank nhất và không vượt cấp)
            if (isBetterDraft(classification, lastClassification, targetRank)) {
                lastPassedCopyArticle = generated;
                lastPassedCopyCheck = copyCheck;
                lastClassification = classification;
            }

            boolean tooHard = targetRank > 0 && classification.computedRank() > targetRank;
            boolean tooEasy = targetRank > 0 && (targetRank - classification.computedRank()) > 1;
            if (!tooHard && !tooEasy) {
                break;
            }

            if (attempt < 3) {
                if (tooHard) {
                    List<String> problemWords = new ArrayList<>();
                    problemWords.addAll(classification.harderThanTargetWords());
                    for (String oov : classification.outOfListWords()) {
                        if (!problemWords.contains(oov)) problemWords.add(oov);
                    }
                    List<String> sampleWords = problemWords.size() > 12 ? problemWords.subList(0, 12) : problemWords;
                    log.info("Phiên bản [{}] bị chấm lệch cấp ({} vs mục tiêu {}), gửi yêu cầu viết lại lần {} (từ vượt cấp: {})",
                            targetLevel, classification.computedLevel(), targetLevel, attempt, sampleWords);
                    feedback = "Bản nháp trước bị chấm ở mức " + classification.computedLevel()
                            + " (khó hơn mục tiêu " + targetLevel + "). "
                            + "Hãy thay thế các từ/Kanji vượt cấp sau bằng từ đơn giản hơn phù hợp " + targetLevel
                            + " (hoặc đưa từ thời sự bắt buộc vào keyVocab): " + String.join("、", sampleWords)
                            + ". Giữ câu ngắn gọn đúng độ dài chuẩn " + targetLevel + ".";
                } else {
                    log.info("Phiên bản [{}] bị chấm quá dễ ({} vs mục tiêu {}), gửi yêu cầu nâng văn phong lần {}",
                            targetLevel, classification.computedLevel(), targetLevel, attempt);
                    feedback = "Bản nháp trước bị chấm ở mức " + classification.computedLevel()
                            + " (dễ hơn mục tiêu " + targetLevel + "). "
                            + "Hãy nâng cấp văn phong báo chí, từ vựng và cấu trúc ngữ pháp trang trọng hơn cho sát chuẩn "
                            + targetLevel + ".";
                }
            }
        }

        if (lastPassedCopyArticle == null || lastPassedCopyCheck == null || lastClassification == null) {
            log.warn("Bỏ qua phiên bản [{}] sau 3 lần thử không vượt qua kiểm định bản quyền", targetLevel);
            return null;
        }

        String finalFullText = joinSentenceTexts(lastPassedCopyArticle.getSentences());
        String llmLevel = llmSecondOpinionEnabled
                ? contentGenerator.assessJlptLevelSecondOpinion(finalFullText)
                : null;

        // Tính lại final metrics kèm ý kiến thứ hai LLM
        ClassificationResult finalClass = levelClassifier.classifySentences(
                lastPassedCopyArticle.getSentences(), lastPassedCopyArticle.getKeyVocab(), targetLevel, llmLevel
        );

        int charCount = 0;
        for (SentenceDto s : lastPassedCopyArticle.getSentences()) {
            if (s.getText() != null) charCount += s.getText().length();
        }

        boolean stillMismatchedAfterRetries = targetRank > 0 && finalClass.computedRank() > targetRank;
        boolean needsReview = finalClass.needsReview() || stillMismatchedAfterRetries;

        Map<String, Object> metrics = new LinkedHashMap<>(finalClass.toMetricsMap());
        metrics.put("ngramOverlap8", Math.round(lastPassedCopyCheck.ngramOverlap8() * 10000.0) / 10000.0);
        metrics.put("longestCommonSubstring", lastPassedCopyCheck.longestCommonSubstring());
        metrics.put("copyrightPassed", true);
        metrics.put("needsReview", needsReview);

        return new VersionInsertPayload(
                targetLevel,
                lastPassedCopyArticle.getTitleJa(),
                lastPassedCopyArticle.getTitleVi(),
                lastPassedCopyArticle.getSentences(),
                lastPassedCopyArticle.getKeyVocab(),
                charCount,
                finalClass.computedLevel(),
                metrics,
                voiceName
        );
    }

    private boolean isBetterDraft(ClassificationResult candidate, ClassificationResult currentBest, int targetRank) {
        if (currentBest == null) return true;
        if (targetRank <= 0) return true;
        int candDist = Math.abs(candidate.computedRank() - targetRank);
        int bestDist = Math.abs(currentBest.computedRank() - targetRank);
        if (candDist != bestDist) return candDist < bestDist;
        return candidate.computedRank() <= targetRank && currentBest.computedRank() > targetRank;
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

    /**
     * Chấm lại cấp độ JLPT + token lv + level_metrics cho bài đọc đã lưu (dùng cho bài sinh ở Phase 1 hoặc sau khi chỉnh ngưỡng).
     */
    public AdminArticleSummaryDto reclassifyArticle(Long articleId) {
        AdminArticleSummaryDto existing = repository.findAdminArticleById(articleId);
        List<ReadingArticleRepository.VersionClassificationRow> versions = repository.findVersionsForClassification(articleId);
        for (ReadingArticleRepository.VersionClassificationRow row : versions) {
            List<SentenceDto> sentences = row.sentences();
            String fullText = joinSentenceTexts(sentences);
            String llmLevel = llmSecondOpinionEnabled
                    ? contentGenerator.assessJlptLevelSecondOpinion(fullText)
                    : null;
            ClassificationResult res = levelClassifier.classifySentences(sentences, row.keyVocab(), row.jlptLevel(), llmLevel);
            Map<String, Object> merged = new LinkedHashMap<>();
            if (row.existingMetrics() != null) {
                merged.putAll(row.existingMetrics());
            }
            merged.putAll(res.toMetricsMap());
            repository.updateVersionClassification(row.id(), sentences, res.computedLevel(), merged);
        }
        return repository.findAdminArticleById(existing.getId());
    }
}
