package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.modules.kanji.dto.KanjiRecognizeRequest;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeRequest.DrawnStroke;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeRequest.PointDto;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeResponse;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeResponse.MatchedKanji;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeResponse.StrokeFeedback;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class KanjiCanvasServiceImpl implements KanjiCanvasService {

    private final KanjiRepository kanjiRepository;

    @Override
    public KanjiRecognizeResponse recognizeDrawnKanji(KanjiRecognizeRequest request) {
        List<DrawnStroke> strokes = request.getDrawnStrokes();
        int drawnStrokeCount = (strokes != null) ? strokes.size() : 0;

        if (drawnStrokeCount == 0) {
            return KanjiRecognizeResponse.builder()
                    .accuracyScore(0)
                    .strokeCountMatched(false)
                    .feedback("Vui lòng vẽ ít nhất một nét chữ Kanji lên bảng canvas.")
                    .strokeFeedbacks(List.of())
                    .topMatches(List.of())
                    .build();
        }

        // Lấy danh sách Kanji từ DB/Redis Cache có số nét xấp xỉ số nét vừa vẽ (Tối ưu truy vấn & Cache)
        int minStrokes = Math.max(1, drawnStrokeCount - 2);
        int maxStrokes = drawnStrokeCount + 3;

        List<Kanji> candidates = getCandidatesByStrokeRange(minStrokes, maxStrokes);

        if (candidates.isEmpty()) {
            candidates = kanjiRepository.findAll(PageRequest.of(0, 30)).getContent();
        }

        // Tính điểm phần trăm trùng khớp (Confidence) cho từng candidate
        List<MatchedKanji> matches = new ArrayList<>();
        for (Kanji candidate : candidates) {
            double confidence = calculateMatchConfidence(candidate, strokes, request.getCanvasWidth(), request.getCanvasHeight());
            matches.add(MatchedKanji.builder()
                    .character(candidate.getCharacter())
                    .meaning(candidate.getMeaning())
                    .onReading(candidate.getOnReading() != null ? candidate.getOnReading() : "")
                    .kunReading(candidate.getKunReading() != null ? candidate.getKunReading() : "")
                    .strokeCount(candidate.getStrokeCount() != null ? candidate.getStrokeCount() : 0)
                    .jlptLevel(candidate.getJlptLevel() != null ? candidate.getJlptLevel().name() : "N5")
                    .confidencePercent(Math.round(confidence * 10.0) / 10.0)
                    .build());
        }

        // Sắp xếp giảm dần theo confidence
        matches.sort((a, b) -> Double.compare(b.getConfidencePercent(), a.getConfidencePercent()));

        List<MatchedKanji> topMatches = matches.stream().limit(5).collect(Collectors.toList());
        int overallScore = topMatches.isEmpty() ? 0 : (int) Math.round(topMatches.get(0).getConfidencePercent());

        String feedback = buildOcrFeedback(drawnStrokeCount, topMatches);

        return KanjiRecognizeResponse.builder()
                .accuracyScore(overallScore)
                .strokeCountMatched(true)
                .feedback(feedback)
                .strokeFeedbacks(generateGenericStrokeFeedbacks(strokes))
                .topMatches(topMatches)
                .build();
    }

    @Override
    public KanjiRecognizeResponse evaluateTargetKanji(KanjiRecognizeRequest request) {
        String targetChar = request.getTargetKanji();
        List<DrawnStroke> drawnStrokes = request.getDrawnStrokes();
        int drawnCount = (drawnStrokes != null) ? drawnStrokes.size() : 0;

        Optional<Kanji> targetOpt = (targetChar != null && !targetChar.isEmpty())
                ? kanjiRepository.findByCharacter(targetChar)
                : Optional.empty();

        int expectedStrokes = targetOpt.map(Kanji::getStrokeCount).orElse(0);

        // Fallback expected stroke count based on character unicode / kana map
        if (expectedStrokes == 0 && targetChar != null && !targetChar.isEmpty()) {
            expectedStrokes = estimateExpectedStrokes(targetChar);
        }

        boolean strokeCountMatched = (drawnCount == expectedStrokes);

        List<StrokeFeedback> feedbacks = new ArrayList<>();
        double totalStrokeScore = 0.0;
        boolean hasAnySevereIssue = false;

        for (int i = 0; i < drawnCount; i++) {
            DrawnStroke stroke = drawnStrokes.get(i);
            boolean correctOrder = (i < expectedStrokes);

            // Detailed Stroke Analysis: Direction, Smoothness, Wiggle distortion, Turning angles
            StrokeQualityQuality quality = analyzeStrokeQuality(stroke);
            boolean correctDir = quality.isCorrectDirection && quality.isSmooth;

            double strokeScore = 1.0;
            List<String> issues = new ArrayList<>();

            if (!correctOrder) {
                strokeScore -= 0.50;
                issues.add("thừa nét so với mẫu");
                hasAnySevereIssue = true;
            }
            if (!quality.isCorrectDirection) {
                strokeScore -= 0.45;
                issues.add("hướng vẽ ngược/lệch");
                hasAnySevereIssue = true;
            }
            if (quality.isDistorted) {
                strokeScore -= 0.55;
                issues.add("nét vẽ bị méo mó/thừa nhánh");
                hasAnySevereIssue = true;
            } else if (!quality.isSmooth) {
                strokeScore -= 0.30;
                issues.add("nét vẽ bị rung lắc");
            }

            strokeScore = Math.max(0.05, strokeScore);
            totalStrokeScore += strokeScore;

            String comment;
            if (issues.isEmpty()) {
                comment = String.format("Nét thứ %d: đúng thứ tự, đường nét vẽ đẹp và chuẩn xác.", i + 1);
            } else {
                comment = String.format("Nét thứ %d: ⚠️ %s.", i + 1, String.join(", ", issues));
            }

            feedbacks.add(StrokeFeedback.builder()
                    .strokeIndex(i + 1)
                    .isCorrectOrder(correctOrder)
                    .isCorrectDirection(correctDir)
                    .comment(comment)
                    .build());
        }

        // Ultra-Strict Stroke Count Penalty Multiplier
        double countMultiplier = 1.0;
        if (expectedStrokes > 0) {
            int diff = Math.abs(drawnCount - expectedStrokes);
            if (diff == 1) {
                countMultiplier = 0.50; // 50% penalty for stroke count mismatch
                hasAnySevereIssue = true;
            } else if (diff >= 2) {
                countMultiplier = 0.25; // 75% penalty for heavy stroke count mismatch
                hasAnySevereIssue = true;
            }
        }

        int maxStrokesCount = Math.max(drawnCount, expectedStrokes);
        double strokeQualityAvg = maxStrokesCount > 0 ? totalStrokeScore / maxStrokesCount : 0.0;
        int rawScore = (int) Math.round(strokeQualityAvg * countMultiplier * 100);

        // Cap maximum score if there are severe issues (extra stroke, distortion, wrong direction)
        int overallScore = rawScore;
        if (hasAnySevereIssue && overallScore > 35) {
            overallScore = Math.min(overallScore, 35);
        }

        // Strict Score Classification
        String feedbackMsg;
        if (overallScore >= 90) {
            feedbackMsg = "🎉 Xuất sắc! Nét vẽ sắc sảo, đúng thứ tự và vị trí rất chuẩn xác.";
        } else if (overallScore >= 75) {
            feedbackMsg = "👍 Đạt yêu cầu! Hình chữ khá tốt, hãy chú ý uốn mượt các nét vẽ hơn nữa nhé.";
        } else if (overallScore >= 45) {
            feedbackMsg = "⚠️ Cần rèn thêm! Nét vẽ còn bị méo hoặc chưa đúng tỷ lệ khuôn chữ.";
        } else {
            feedbackMsg = "❌ Chưa đạt yêu cầu! Nét vẽ bị sai nét, méo nét hoặc thừa/thiếu nét nghiêm trọng.";
        }

        final int finalOverallScore = overallScore;

        MatchedKanji targetMatched = targetOpt.map(k -> MatchedKanji.builder()
                .character(k.getCharacter())
                .meaning(k.getMeaning())
                .onReading(k.getOnReading() != null ? k.getOnReading() : "")
                .kunReading(k.getKunReading() != null ? k.getKunReading() : "")
                .strokeCount(k.getStrokeCount() != null ? k.getStrokeCount() : 0)
                .jlptLevel(k.getJlptLevel() != null ? k.getJlptLevel().name() : "N5")
                .confidencePercent(finalOverallScore)
                .build()).orElse(null);

        List<MatchedKanji> topMatches = targetMatched != null ? List.of(targetMatched) : List.of();

        return KanjiRecognizeResponse.builder()
                .accuracyScore(overallScore)
                .strokeCountMatched(strokeCountMatched)
                .feedback(feedbackMsg)
                .strokeFeedbacks(feedbacks)
                .topMatches(topMatches)
                .build();
    }

    // ===== Private Helper Methods =====

    private double calculateMatchConfidence(Kanji candidate, List<DrawnStroke> strokes, Integer w, Integer h) {
        int drawnCount = strokes.size();
        int expectedCount = candidate.getStrokeCount() != null ? candidate.getStrokeCount() : 5;

        // Điểm thưởng / phạt theo số nét
        int strokeDiff = Math.abs(drawnCount - expectedCount);
        double strokeScore = Math.max(0.2, 1.0 - (strokeDiff * 0.25));

        // Analysing bounding box and aspect ratio
        double aspectScore = analyzeAspectRatio(strokes);

        // Vector directional score
        double vectorScore = analyzeVectorPlausibility(strokes);

        double totalConfidence = (strokeScore * 0.45 + aspectScore * 0.25 + vectorScore * 0.30) * 100.0;
        return Math.min(98.5, Math.max(45.0, totalConfidence));
    }

    private double analyzeAspectRatio(List<DrawnStroke> strokes) {
        double minX = Double.MAX_VALUE, maxX = Double.MIN_VALUE;
        double minY = Double.MAX_VALUE, maxY = Double.MIN_VALUE;

        for (DrawnStroke s : strokes) {
            if (s.getPoints() == null) continue;
            for (PointDto p : s.getPoints()) {
                minX = Math.min(minX, p.getX());
                maxX = Math.max(maxX, p.getX());
                minY = Math.min(minY, p.getY());
                maxY = Math.max(maxY, p.getY());
            }
        }

        double width = maxX - minX;
        double height = maxY - minY;

        if (height <= 0 || width <= 0) return 0.5;
        double ratio = width / height;

        // Kanji characters are generally square-ish (ratio 0.75 - 1.25)
        if (ratio >= 0.7 && ratio <= 1.3) return 0.95;
        if (ratio >= 0.5 && ratio <= 1.6) return 0.75;
        return 0.5;
    }

    private double analyzeVectorPlausibility(List<DrawnStroke> strokes) {
        if (strokes.isEmpty()) return 0.5;
        int validDirectionCount = 0;
        for (DrawnStroke stroke : strokes) {
            if (analyzeStrokeDirection(stroke)) {
                validDirectionCount++;
            }
        }
        return (double) validDirectionCount / strokes.size();
    }

    private static class StrokeQualityQuality {
        boolean isCorrectDirection;
        boolean isSmooth;
        boolean isDistorted;
    }

    private StrokeQualityQuality analyzeStrokeQuality(DrawnStroke stroke) {
        StrokeQualityQuality res = new StrokeQualityQuality();
        res.isCorrectDirection = true;
        res.isSmooth = true;
        res.isDistorted = false;

        if (stroke == null || stroke.getPoints() == null || stroke.getPoints().size() < 2) {
            return res;
        }

        List<PointDto> points = stroke.getPoints();
        PointDto start = points.get(0);
        PointDto end = points.get(points.size() - 1);

        double dx = end.getX() - start.getX();
        double dy = end.getY() - start.getY();
        double euclidean = Math.sqrt(dx * dx + dy * dy);

        // 1. Calculate cumulative path length and turning angle sum
        double totalPathLength = 0;
        double totalTurnAngleDegree = 0;

        for (int i = 1; i < points.size(); i++) {
            double pdx = points.get(i).getX() - points.get(i - 1).getX();
            double pdy = points.get(i).getY() - points.get(i - 1).getY();
            totalPathLength += Math.sqrt(pdx * pdx + pdy * pdy);

            if (i > 1) {
                double prevDx = points.get(i - 1).getX() - points.get(i - 2).getX();
                double prevDy = points.get(i - 1).getY() - points.get(i - 2).getY();
                double angle1 = Math.atan2(prevDy, prevDx);
                double angle2 = Math.atan2(pdy, pdx);
                double diff = Math.abs(Math.toDegrees(angle2 - angle1));
                if (diff > 180) diff = 360 - diff;
                totalTurnAngleDegree += diff;
            }
        }

        // 2. Check stroke Wiggle / Distortion Ratio & Sharp Corner Branches
        if (euclidean > 5) {
            double wiggleRatio = totalPathLength / euclidean;
            if (wiggleRatio > 1.45 || totalTurnAngleDegree > 75.0) {
                res.isDistorted = true;
                res.isSmooth = false;
            } else if (wiggleRatio > 1.25 || totalTurnAngleDegree > 45.0) {
                res.isSmooth = false;
            }
        } else if (totalPathLength > 20) {
            // Drawn back and forth over a tiny spot
            res.isDistorted = true;
            res.isSmooth = false;
        }

        // 3. Strict Direction Analysis (Top-to-Bottom / Left-to-Right)
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < -10) {
                res.isCorrectDirection = false;
            }
        } else {
            if (dy < -10) {
                res.isCorrectDirection = false;
            }
        }

        return res;
    }

    private int estimateExpectedStrokes(String character) {
        if (character == null || character.isEmpty()) return 1;
        Map<String, Integer> kanaStrokes = Map.ofEntries(
            Map.entry("あ", 3), Map.entry("い", 2), Map.entry("う", 2), Map.entry("え", 2), Map.entry("お", 3),
            Map.entry("か", 3), Map.entry("き", 4), Map.entry("く", 1), Map.entry("け", 3), Map.entry("こ", 2),
            Map.entry("さ", 3), Map.entry("し", 1), Map.entry("す", 2), Map.entry("せ", 3), Map.entry("そ", 1),
            Map.entry("た", 4), Map.entry("ち", 2), Map.entry("つ", 1), Map.entry("て", 1), Map.entry("と", 2),
            Map.entry("な", 4), Map.entry("に", 3), Map.entry("ぬ", 2), Map.entry("ね", 2), Map.entry("の", 1),
            Map.entry("は", 3), Map.entry("ひ", 1), Map.entry("ふ", 4), Map.entry("へ", 1), Map.entry("ほ", 4),
            Map.entry("ま", 3), Map.entry("み", 2), Map.entry("む", 3), Map.entry("め", 2), Map.entry("も", 3),
            Map.entry("や", 3), Map.entry("ゆ", 2), Map.entry("よ", 2),
            Map.entry("ら", 2), Map.entry("り", 2), Map.entry("る", 1), Map.entry("れ", 2), Map.entry("ろ", 1),
            Map.entry("わ", 2), Map.entry("を", 3), Map.entry("ん", 1),
            Map.entry("ア", 2), Map.entry("イ", 2), Map.entry("ウ", 3), Map.entry("エ", 3), Map.entry("オ", 3)
        );
        return kanaStrokes.getOrDefault(character, 3);
    }

    private boolean analyzeStrokeDirection(DrawnStroke stroke) {
        if (stroke == null || stroke.getPoints() == null || stroke.getPoints().size() < 2) {
            return true;
        }

        List<PointDto> points = stroke.getPoints();
        PointDto start = points.get(0);
        PointDto end = points.get(points.size() - 1);

        double dx = end.getX() - start.getX();
        double dy = end.getY() - start.getY();

        // Standard Japanese stroke directions: Top-to-Bottom (dy > 0), Left-to-Right (dx > 0)
        boolean isTopToBottom = (dy >= -15);
        boolean isLeftToRight = (dx >= -15);

        return isTopToBottom || isLeftToRight;
    }

    private List<StrokeFeedback> generateGenericStrokeFeedbacks(List<DrawnStroke> strokes) {
        List<StrokeFeedback> feedbacks = new ArrayList<>();
        for (int i = 0; i < strokes.size(); i++) {
            boolean dir = analyzeStrokeDirection(strokes.get(i));
            feedbacks.add(StrokeFeedback.builder()
                    .strokeIndex(i + 1)
                    .isCorrectOrder(true)
                    .isCorrectDirection(dir)
                    .comment(String.format("Nét %d: Hướng vẽ %s", i + 1, dir ? "đạt yêu cầu" : "cần chú ý"))
                    .build());
        }
        return feedbacks;
    }

    private String buildOcrFeedback(int strokeCount, List<MatchedKanji> topMatches) {
        if (topMatches.isEmpty()) {
            return "Chưa nhận diện được nét vẽ. Bạn hãy thử lại nhé!";
        }
        MatchedKanji best = topMatches.get(0);
        return String.format("AI Nhận diện chữ [%s] (%s) với độ chính xác %.1f%% (%d nét).",
                best.getCharacter(), best.getMeaning(), best.getConfidencePercent(), strokeCount);
    }

    /**
     * Lấy danh sách Kanji theo dải số nét và cache bằng Redis.
     */
    @Cacheable(value = "kanjis", key = "'ocr_stroke_' + #minStrokes + '_' + #maxStrokes")
    public List<Kanji> getCandidatesByStrokeRange(int minStrokes, int maxStrokes) {
        log.info("🔍 Cache MISS — Truy vấn Database lấy Kanji từ {} đến {} nét", minStrokes, maxStrokes);
        return kanjiRepository.findByStrokeCountBetween(minStrokes, maxStrokes);
    }
}
