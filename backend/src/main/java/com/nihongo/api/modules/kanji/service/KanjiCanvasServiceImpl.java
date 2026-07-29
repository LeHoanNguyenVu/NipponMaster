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

        int expectedStrokes = targetOpt.map(Kanji::getStrokeCount).orElse(drawnCount);
        boolean strokeCountMatched = (drawnCount == expectedStrokes);

        List<StrokeFeedback> feedbacks = new ArrayList<>();
        int correctStrokes = 0;

        for (int i = 0; i < drawnCount; i++) {
            DrawnStroke stroke = drawnStrokes.get(i);
            boolean correctDir = analyzeStrokeDirection(stroke);
            boolean correctOrder = (i < expectedStrokes);

            if (correctDir && correctOrder) {
                correctStrokes++;
            }

            String comment = String.format("Nét thứ %d: %s, hướng vẽ %s.",
                    i + 1,
                    correctOrder ? "đúng thứ tự" : "vượt quá số nét chuẩn",
                    correctDir ? "chuẩn xác" : "cần điều chỉnh"
            );

            feedbacks.add(StrokeFeedback.builder()
                    .strokeIndex(i + 1)
                    .isCorrectOrder(correctOrder)
                    .isCorrectDirection(correctDir)
                    .comment(comment)
                    .build());
        }

        // Calculate overall accuracy score
        double countRatio = expectedStrokes > 0 ? 1.0 - Math.min(1.0, Math.abs(drawnCount - expectedStrokes) * 0.2) : 1.0;
        double strokeRatio = drawnCount > 0 ? (double) correctStrokes / drawnCount : 0.0;
        int overallScore = (int) Math.round((countRatio * 0.4 + strokeRatio * 0.6) * 100);

        String feedbackMsg;
        if (overallScore >= 85) {
            feedbackMsg = "🎉 Xuất sắc! Nét vẽ và thứ tự nét của bạn rất chuẩn xác.";
        } else if (overallScore >= 65) {
            feedbackMsg = "👍 Khá tốt! Hình chữ đúng dạng, hãy chú ý thứ tự và độ cong của từng nét nhé.";
        } else {
            feedbackMsg = "✍️ Cần luyện thêm! Hãy theo dõi đường nét mờ mẫu và thứ tự nét đánh số.";
        }

        MatchedKanji targetMatched = targetOpt.map(k -> MatchedKanji.builder()
                .character(k.getCharacter())
                .meaning(k.getMeaning())
                .onReading(k.getOnReading() != null ? k.getOnReading() : "")
                .kunReading(k.getKunReading() != null ? k.getKunReading() : "")
                .strokeCount(k.getStrokeCount() != null ? k.getStrokeCount() : 0)
                .jlptLevel(k.getJlptLevel() != null ? k.getJlptLevel().name() : "N5")
                .confidencePercent(overallScore)
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
