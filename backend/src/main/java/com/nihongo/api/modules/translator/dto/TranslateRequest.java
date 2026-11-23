package com.nihongo.api.modules.translator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TranslateRequest {

    @NotBlank(message = "Nội dung cần dịch không được để trống")
    @Size(max = 500, message = "Nội dung cần dịch tối đa 500 ký tự")
    private String text;

    /** Ngôn ngữ nguồn: vi, ja, en. Nếu để trống hoặc 'auto' sẽ tự phát hiện qua ký tự. */
    private String sourceLang;

    /** Ngôn ngữ đích: vi, ja, en. Nếu để trống sẽ tự đảo ngược (ja <-> vi). */
    private String targetLang;
}
