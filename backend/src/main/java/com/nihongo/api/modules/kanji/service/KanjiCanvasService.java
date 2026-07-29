package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.modules.kanji.dto.KanjiRecognizeRequest;
import com.nihongo.api.modules.kanji.dto.KanjiRecognizeResponse;

public interface KanjiCanvasService {

    /**
     * Nhận diện chữ Kanji vẽ tự do trên Canvas (OCR mode)
     */
    KanjiRecognizeResponse recognizeDrawnKanji(KanjiRecognizeRequest request);

    /**
     * Chấm điểm độ chuẩn xác nét vẽ và thứ tự nét của một Kanji mục tiêu (Practice mode)
     */
    KanjiRecognizeResponse evaluateTargetKanji(KanjiRecognizeRequest request);
}
