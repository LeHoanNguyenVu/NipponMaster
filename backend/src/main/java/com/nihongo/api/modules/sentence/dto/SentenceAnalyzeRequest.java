package com.nihongo.api.modules.sentence.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SentenceAnalyzeRequest {

    /** Câu tiếng Nhật cần phân tích cú pháp */
    private String sentence;
}
