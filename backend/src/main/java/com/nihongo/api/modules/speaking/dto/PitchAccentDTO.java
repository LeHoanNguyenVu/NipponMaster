package com.nihongo.api.modules.speaking.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class PitchAccentDTO {

    public enum PitchType {
        ATAMADAKA, // 頭高型 (Nốt 1 cao, sau thấp)
        NAKADAKA,  // 中高型 (Nốt 1 thấp, giữa cao, cuối thấp)
        ODAKA,     // 尾高型 (Nốt 1 thấp, các nốt sau cao)
        HEIBAN     // 平板型 (Nốt 1 thấp, đi bằng phẳng lên cao)
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SyllablePitch {
        private String syllable;
        private boolean isHigh;
        private double pitchHz;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PitchAccentResponse {
        private String text;
        private String romaji;
        private PitchType pitchType;
        private String pitchTypeName;
        private String pitchDescription;
        private List<SyllablePitch> syllables;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EvaluatePitchRequest {
        @NotBlank(message = "Văn bản mẫu không được để trống")
        private String text;

        private List<Double> userRecordedPitches;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EvaluatePitchResponse {
        private double accuracyPercent;
        private String feedbackMessage;
        private List<Integer> mismatchedIndexes;
        private List<SyllablePitch> expectedSyllables;
    }
}
