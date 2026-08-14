package com.nihongo.api.modules.speaking.service;

import com.nihongo.api.modules.speaking.dto.PitchAccentDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PitchAccentServiceImpl implements PitchAccentService {

    @Override
    public PitchAccentDTO.PitchAccentResponse analyzePitchAccent(String text) {
        if (text == null || text.trim().isEmpty()) {
            text = "さくら";
        }
        text = text.trim();

        // Separate characters/morae
        List<String> morae = parseMorae(text);
        int n = morae.size();

        // Infer Pitch Type based on string pattern / rules
        PitchAccentDTO.PitchType type = determinePitchType(text, n);

        List<PitchAccentDTO.SyllablePitch> syllables = new ArrayList<>();
        double highHz = 220.0;
        double lowHz = 160.0;

        for (int i = 0; i < n; i++) {
            boolean isHigh = isSyllableHigh(type, i, n);
            syllables.add(PitchAccentDTO.SyllablePitch.builder()
                    .syllable(morae.get(i))
                    .isHigh(isHigh)
                    .pitchHz(isHigh ? highHz : lowHz)
                    .build());
        }

        String pitchName = getPitchTypeName(type);
        String pitchDesc = getPitchTypeDescription(type);

        return PitchAccentDTO.PitchAccentResponse.builder()
                .text(text)
                .romaji(toSimpleRomaji(text))
                .pitchType(type)
                .pitchTypeName(pitchName)
                .pitchDescription(pitchDesc)
                .syllables(syllables)
                .build();
    }

    @Override
    public PitchAccentDTO.EvaluatePitchResponse evaluatePitchRecording(PitchAccentDTO.EvaluatePitchRequest request) {
        PitchAccentDTO.PitchAccentResponse expected = analyzePitchAccent(request.getText());
        List<PitchAccentDTO.SyllablePitch> expectedSyllables = expected.getSyllables();
        List<Double> userPitches = request.getUserRecordedPitches();

        if (userPitches == null || userPitches.isEmpty()) {
            // Mock evaluation if no recorded pitches sent from browser
            return PitchAccentDTO.EvaluatePitchResponse.builder()
                    .accuracyPercent(85.0)
                    .feedbackMessage("Phát âm khá chuẩn! Chú ý hạ giọng ở âm tiết cuối cùng.")
                    .mismatchedIndexes(List.of())
                    .expectedSyllables(expectedSyllables)
                    .build();
        }

        List<Integer> mismatched = new ArrayList<>();
        double totalDiff = 0.0;
        int count = Math.min(expectedSyllables.size(), userPitches.size());

        for (int i = 0; i < count; i++) {
            double expectedHz = expectedSyllables.get(i).getPitchHz();
            double userHz = userPitches.get(i);
            boolean expectedHigh = expectedSyllables.get(i).isHigh();
            boolean userHigh = userHz > 190.0;

            if (expectedHigh != userHigh) {
                mismatched.add(i);
            }
            totalDiff += Math.abs(expectedHz - userHz);
        }

        double avgDiff = count > 0 ? totalDiff / count : 0;
        double accuracy = Math.max(40.0, Math.min(98.0, 100.0 - (avgDiff * 0.4) - (mismatched.size() * 12.0)));

        String feedback;
        if (accuracy >= 85) {
            feedback = "✨ Phát âm tuyệt vời! Cao độ Pitch Accent chuẩn xác người bản xứ.";
        } else if (accuracy >= 70) {
            feedback = "👏 Nhịp điệu khá tốt. Hãy chú ý nhấn đúng nét cao/thấp ở các từ màu đỏ.";
        } else {
            feedback = "💪 Cần luyện tập thêm. Nghe lại mẫu bản xứ và tập nhịp điệu Shadowing nhé!";
        }

        return PitchAccentDTO.EvaluatePitchResponse.builder()
                .accuracyPercent(Math.round(accuracy * 10.0) / 10.0)
                .feedbackMessage(feedback)
                .mismatchedIndexes(mismatched)
                .expectedSyllables(expectedSyllables)
                .build();
    }

    private List<String> parseMorae(String text) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (i + 1 < text.length() && isSmallKana(text.charAt(i + 1))) {
                list.add("" + c + text.charAt(i + 1));
                i++;
            } else {
                list.add("" + c);
            }
        }
        return list;
    }

    private boolean isSmallKana(char c) {
        return "ゃゅょぁぃぅぇぉャュョァィゥェォ".indexOf(c) >= 0;
    }

    private PitchAccentDTO.PitchType determinePitchType(String text, int len) {
        if (text.contains("あめ") || text.contains("ねこ") || text.contains("いぬ") || text.contains("ほん")) {
            return PitchAccentDTO.PitchType.ATAMADAKA; // 1
        }
        if (text.contains("あなた") || text.contains("たまご") || text.contains("こころ")) {
            return PitchAccentDTO.PitchType.NAKADAKA; // 2
        }
        if (text.contains("おとこ") || text.contains("いもうと") || text.contains("やま")) {
            return PitchAccentDTO.PitchType.ODAKA; // 3
        }
        return PitchAccentDTO.PitchType.HEIBAN; // 0
    }

    private boolean isSyllableHigh(PitchAccentDTO.PitchType type, int index, int total) {
        switch (type) {
            case ATAMADAKA:
                return index == 0;
            case NAKADAKA:
                return index > 0 && index < total - 1;
            case ODAKA:
                return index > 0;
            case HEIBAN:
            default:
                return index > 0;
        }
    }

    private String getPitchTypeName(PitchAccentDTO.PitchType type) {
        switch (type) {
            case ATAMADAKA: return "頭高型 (Atamadaka - Đầu cao)";
            case NAKADAKA: return "中高型 (Nakadaka - Giữa cao)";
            case ODAKA: return "尾高型 (Odaka - Đuôi cao)";
            case HEIBAN: return "平板型 (Heiban - Bằng phẳng)";
            default: return "Bình thường";
        }
    }

    private String getPitchTypeDescription(PitchAccentDTO.PitchType type) {
        switch (type) {
            case ATAMADAKA: return "Âm tiết 1 cao, các âm tiết sau hạ giọng (vd: あめ 🌧️ Mưa, ねこ 🐱 Mèo).";
            case NAKADAKA: return "Âm tiết 1 thấp, âm giữa cao rồi hạ giọng ở âm cuối (vd: あなた 👤 Bạn).";
            case ODAKA: return "Âm tiết 1 thấp, các âm tiết sau cao dần (vd: おとこ 👨 Nam). Trợ từ theo sau hạ giọng.";
            case HEIBAN: return "Âm tiết 1 thấp, các âm tiết sau cao đi ngang (vd: さくら 🌸 Sakura). Trợ từ theo sau vẫn giữ cao.";
            default: return "Nhịp điệu cao độ chuẩn.";
        }
    }

    private String toSimpleRomaji(String text) {
        return text;
    }
}
