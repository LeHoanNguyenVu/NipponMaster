package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import com.nihongo.api.modules.translator.dto.TranslateResponse.WordAnalysis;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class TranslationServiceImpl implements TranslationService {

    private final GeminiClient geminiClient;
    private final TranslationCache translationCache;
    private final KanjiRepository kanjiRepository;

    // Bộ dịch cục bộ cho các câu thông dụng cơ bản phòng khi mất mạng hoàn toàn
    private static final Map<String, String> FALLBACK_JA_TO_VI = new HashMap<>();
    private static final Map<String, String> FALLBACK_VI_TO_JA = new HashMap<>();
    private static final Map<String, String> FALLBACK_EN_TO_JA = new HashMap<>();

    static {
        // Nhật -> Việt
        FALLBACK_JA_TO_VI.put("毎日ご飯を食べます。", "Mỗi ngày tôi đều ăn cơm.");
        FALLBACK_JA_TO_VI.put("毎日ご飯を食べます", "Mỗi ngày tôi đều ăn cơm.");
        FALLBACK_JA_TO_VI.put("水を飲みます。", "Tôi uống nước.");
        FALLBACK_JA_TO_VI.put("水を飲みます", "Tôi uống nước.");
        FALLBACK_JA_TO_VI.put("学校に行きます。", "Tôi đi đến trường.");
        FALLBACK_JA_TO_VI.put("学校に行きます", "Tôi đi đến trường.");
        FALLBACK_JA_TO_VI.put("先生はやさしいです。", "Thầy cô giáo rất hiền từ.");
        FALLBACK_JA_TO_VI.put("先生はやさしいです", "Thầy cô giáo rất hiền từ.");
        FALLBACK_JA_TO_VI.put("お元気ですか。", "Bạn có khỏe không?");
        FALLBACK_JA_TO_VI.put("お元気ですか", "Bạn có khỏe không?");
        FALLBACK_JA_TO_VI.put("こんにちは", "Xin chào");
        FALLBACK_JA_TO_VI.put("ありがとう", "Cảm ơn bạn");
        FALLBACK_JA_TO_VI.put("さようなら", "Tạm biệt");

        // Việt -> Nhật
        FALLBACK_VI_TO_JA.put("Mỗi ngày tôi đều ăn cơm.", "毎日ご飯を食べます。");
        FALLBACK_VI_TO_JA.put("Mỗi ngày tôi đều ăn cơm", "毎日ご飯を食べます。");
        FALLBACK_VI_TO_JA.put("Tôi uống nước.", "水を飲みます。");
        FALLBACK_VI_TO_JA.put("Tôi uống nước", "水を飲みます。");
        FALLBACK_VI_TO_JA.put("Tôi đi đến trường.", "学校に行きます。");
        FALLBACK_VI_TO_JA.put("Tôi đi đến trường", "学校に行きます。");
        FALLBACK_VI_TO_JA.put("Thầy cô giáo rất hiền từ.", "先生はやさしいです。");
        FALLBACK_VI_TO_JA.put("Thầy cô giáo rất hiền từ", "先生はやさしいです。");
        FALLBACK_VI_TO_JA.put("Bạn có khỏe không?", "お元気ですか。");
        FALLBACK_VI_TO_JA.put("Bạn có khỏe không", "お元気ですか。");
        FALLBACK_VI_TO_JA.put("Xin chào", "こんにちは");
        FALLBACK_VI_TO_JA.put("Cảm ơn bạn", "ありがとう");
        FALLBACK_VI_TO_JA.put("Tạm biệt", "さようなら");

        // Anh -> Nhật
        FALLBACK_EN_TO_JA.put("I eat rice every day.", "毎日ご飯を食べます。");
        FALLBACK_EN_TO_JA.put("I go to school.", "学校に行きます。");
        FALLBACK_EN_TO_JA.put("The teacher is kind.", "先生はやさしいです。");
        FALLBACK_EN_TO_JA.put("How are you?", "お元気ですか。");
        FALLBACK_EN_TO_JA.put("Hello", "こんにちは");
        FALLBACK_EN_TO_JA.put("Thank you", "ありがとう");
        FALLBACK_EN_TO_JA.put("Goodbye", "さようなら");
    }

    @Override
    public TranslateResponse translate(TranslateRequest request) {
        if (request == null || request.getText() == null || request.getText().trim().isEmpty()) {
            return TranslateResponse.builder()
                    .originalText("")
                    .translatedText("")
                    .sourceLang(request != null ? request.getSourceLang() : "ja")
                    .targetLang(request != null ? request.getTargetLang() : "vi")
                    .words(Collections.emptyList())
                    .build();
        }

        String text = request.getText().trim();
        String sourceLang = request.getSourceLang() != null ? request.getSourceLang().trim().toLowerCase() : "ja";
        String targetLang = request.getTargetLang() != null ? request.getTargetLang().trim().toLowerCase() : "vi";

        log.info("🤖 NipponMaster Translate: '{}' ({} -> {})", text, sourceLang, targetLang);

        // 1. Kiểm tra Cache bộ nhớ đệm (phản hồi 0ms, tiết kiệm quota)
        TranslateResponse cached = translationCache.get(sourceLang, targetLang, text);
        if (cached != null) {
            return cached;
        }

        // 2. Gọi Gemini AI để dịch thuật & phân tích sâu toàn diện
        TranslateResponse geminiResult = geminiClient.translate(text, sourceLang, targetLang);
        if (geminiResult != null && geminiResult.getTranslatedText() != null && !geminiResult.getTranslatedText().isBlank()) {
            // Lưu vào cache cho các lần gọi sau
            translationCache.put(sourceLang, targetLang, text, geminiResult);
            return geminiResult;
        }

        // 3. Fallback dự phòng khi mất kết nối AI hoặc quota tạm thời đầy
        log.warn("⚠️ Không nhận được kết quả từ Gemini AI, sử dụng fallback dự phòng cho: [{}]", text);
        return handleFallback(text, sourceLang, targetLang);
    }

    private TranslateResponse handleFallback(String text, String sourceLang, String targetLang) {
        String translatedText = null;

        if ("ja".equals(sourceLang) && "vi".equals(targetLang)) {
            translatedText = lookupFallback(FALLBACK_JA_TO_VI, text);
        } else if ("vi".equals(sourceLang) && "ja".equals(targetLang)) {
            translatedText = lookupFallback(FALLBACK_VI_TO_JA, text);
        } else if ("en".equals(sourceLang) && "ja".equals(targetLang)) {
            translatedText = lookupFallback(FALLBACK_EN_TO_JA, text);
        }

        if (translatedText == null) {
            translatedText = "[Bản dịch dự phòng] " + text;
        }

        // Phân tích Kanji cơ bản trong fallback mode
        String japaneseText = "ja".equals(sourceLang) ? text : ("ja".equals(targetLang) ? translatedText : null);
        List<WordAnalysis> matchedWords = new ArrayList<>();
        String pronunciationHtml = null;

        if (japaneseText != null && !japaneseText.isEmpty()) {
            pronunciationHtml = generateBasicFurigana(japaneseText, matchedWords);
        }

        return TranslateResponse.builder()
                .originalText(text)
                .translatedText(translatedText)
                .sourceLang(sourceLang)
                .targetLang(targetLang)
                .pronunciation(pronunciationHtml)
                .words(matchedWords)
                .grammarNotes("Hệ thống đang hoạt động ở chế độ dự phòng do kết nối AI tạm thời gián đoạn.")
                .detectedLevel(null)
                .build();
    }

    private String lookupFallback(Map<String, String> map, String text) {
        String res = map.get(text);
        if (res != null) return res;

        // Thử tìm với hoặc không có dấu chấm
        String alt = text.endsWith("。") ? text.substring(0, text.length() - 1) :
                (text.endsWith(".") ? text.substring(0, text.length() - 1) : text + "。");
        return map.get(alt);
    }

    private String generateBasicFurigana(String japaneseText, List<WordAnalysis> matchedWords) {
        try {
            // Tìm các Kanji xuất hiện trong câu (chỉ tìm trong tập ký tự thực tế xuất hiện)
            Set<Character> kanjiInText = new HashSet<>();
            for (char c : japaneseText.toCharArray()) {
                if (c >= '\u4e00' && c <= '\u9faf') {
                    kanjiInText.add(c);
                }
            }

            if (kanjiInText.isEmpty()) {
                return japaneseText;
            }

            for (Character c : kanjiInText) {
                Optional<Kanji> opt = kanjiRepository.findByCharacter(String.valueOf(c));
                opt.ifPresent(k -> {
                    String reading = (k.getOnReading() != null && !k.getOnReading().isBlank())
                            ? k.getOnReading()
                            : (k.getKunReading() != null ? k.getKunReading() : "");
                    matchedWords.add(WordAnalysis.builder()
                            .word(k.getCharacter())
                            .reading(reading)
                            .meaning(k.getMeaning())
                            .partOfSpeech("KANJI")
                            .sinoVietnamese(k.getHanViet())
                            .build());
                });
            }

            String temp = japaneseText;
            for (WordAnalysis w : matchedWords) {
                if (w.getWord() != null && !w.getReading().isBlank()) {
                    temp = temp.replace(w.getWord(),
                            String.format("<ruby>%s<rt>%s</rt></ruby>", w.getWord(), w.getReading()));
                }
            }
            return temp;
        } catch (Exception e) {
            log.debug("Lỗi khi sinh basic furigana: {}", e.getMessage());
            return japaneseText;
        }
    }
}
