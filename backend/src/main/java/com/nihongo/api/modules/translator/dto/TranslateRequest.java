package com.nihongo.api.modules.translator.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TranslateRequest {

    @NotBlank(message = "Nội dung cần dịch không được để trống")
    private String text;

    /** Ngôn ngữ nguồn: vi, ja, en. Nếu để trống sẽ tự phát hiện. */
    private String sourceLang;

    /** Ngôn ngữ đích: vi, ja, en */
    @NotBlank(message = "Ngôn ngữ đích không được để trống")
    private String targetLang;
}
