package com.nihongo.api.modules.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiRecognizeResponse {

    /** Điểm tổng thể độ chuẩn xác (0 - 100%) */
    private int accuracyScore;

    /** Đã vẽ đúng số lượng nét chưa */
    private boolean strokeCountMatched;

    /** Nhận xét tổng quan bằng tiếng Việt */
    private String feedback;

    /** Chi tiết đánh giá từng nét */
    private List<StrokeFeedback> strokeFeedbacks;

    /** Kết quả OCR: Danh sách các chữ Kanji khớp nhất */
    private List<MatchedKanji> topMatches;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StrokeFeedback {
        private int strokeIndex;
        private boolean isCorrectOrder;
        private boolean isCorrectDirection;
        private String comment;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MatchedKanji {
        private String character;
        private String meaning;
        private String onReading;
        private String kunReading;
        private int strokeCount;
        private String jlptLevel;
        private double confidencePercent;
    }
}
