package com.nihongo.api.modules.sentence.service;

import com.nihongo.api.modules.sentence.dto.SentenceAnalyzeRequest;
import com.nihongo.api.modules.sentence.dto.SentenceAnalyzeResponse;

public interface SentenceAnalyzerService {

    /**
     * Phân tích cú pháp câu tiếng Nhật: phân tách từ vựng, tự động sinh Furigana
     * và khớp các cấu trúc ngữ pháp có trong database.
     */
    SentenceAnalyzeResponse analyzeSentence(SentenceAnalyzeRequest request);
}
