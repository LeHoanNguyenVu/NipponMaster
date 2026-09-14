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
public class KanjiRecognizeRequest {

    /** Chữ Kanji mục tiêu cần chấm điểm (nếu đang ở chế độ tập vẽ) */
    private String targetKanji;

    /** Danh sách các nét vẽ. Mỗi nét chứa danh sách các điểm (x, y) */
    private List<DrawnStroke> drawnStrokes;

    /** Kích thước canvas (width, height) */
    private Integer canvasWidth;
    private Integer canvasHeight;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DrawnStroke {
        private List<PointDto> points;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PointDto {
        private double x;
        private double y;
    }
}
