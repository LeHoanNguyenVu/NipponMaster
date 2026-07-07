package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.translator.dto.TranslateRequest;
import com.nihongo.api.modules.translator.dto.TranslateResponse;
import com.nihongo.api.modules.translator.dto.TranslateResponse.WordAnalysis;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TranslationServiceImpl implements TranslationService {

    private final VocabularyRepository vocabularyRepository;
    private final RestTemplate restTemplate = createRestTemplateWithTimeout();

    private static RestTemplate createRestTemplateWithTimeout() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(2500);
        factory.setReadTimeout(2500);
        return new RestTemplate(factory);
    }

    // Bộ dịch cục bộ cho các câu thông dụng khi offline hoặc lỗi DNS mạng
    private static final Map<String, String> FALLBACK_JA_TO_VI = new HashMap<>();
    private static final Map<String, String> FALLBACK_VI_TO_JA = new HashMap<>();
    private static final Map<String, String> FALLBACK_EN_TO_JA = new HashMap<>();

    static {
        // Nhật -> Việt
        FALLBACK_JA_TO_VI.put("毎日ご飯を食べます。", "Mỗi ngày tôi đều ăn cơm.");
        FALLBACK_JA_TO_VI.put("毎日ご飯を食べます", "Mỗi ngày tôi đều ăn cơm.");
        FALLBACK_JA_TO_VI.put("水を飲みます。", "Tôi uống nước.");
        FALLBACK_JA_TO_VI.put("水を飲みます", "Tôi uống nước.");
        FALLBACK_JA_TO_VI.put("テレビを見ます。", "Tôi xem tivi.");
        FALLBACK_JA_TO_VI.put("テレビを見ます", "Tôi xem tivi.");
        FALLBACK_JA_TO_VI.put("音楽を聞きます。", "Tôi nghe nhạc.");
        FALLBACK_JA_TO_VI.put("音楽を聞きます", "Tôi nghe nhạc.");
        FALLBACK_JA_TO_VI.put("本を読みます。", "Tôi đọc sách.");
        FALLBACK_JA_TO_VI.put("本を読みます", "Tôi đọc sách.");
        FALLBACK_JA_TO_VI.put("手紙を書きます。", "Tôi viết thư.");
        FALLBACK_JA_TO_VI.put("手紙を書きます", "Tôi viết thư.");
        FALLBACK_JA_TO_VI.put("日本語を話します。", "Tôi nói tiếng Nhật.");
        FALLBACK_JA_TO_VI.put("日本語を話します", "Tôi nói tiếng Nhật.");
        FALLBACK_JA_TO_VI.put("本を買います。", "Tôi mua sách.");
        FALLBACK_JA_TO_VI.put("本を買います", "Tôi mua sách.");
        FALLBACK_JA_TO_VI.put("学校に行きます。", "Tôi đi đến trường.");
        FALLBACK_JA_TO_VI.put("学校に行きます", "Tôi đi đến trường.");
        FALLBACK_JA_TO_VI.put("先生はやさしいです。", "Thầy cô giáo rất hiền từ.");
        FALLBACK_JA_TO_VI.put("先生はやさしいです", "Thầy cô giáo rất hiền từ.");
        FALLBACK_JA_TO_VI.put("私はい学生です。", "Tôi là học sinh/sinh viên.");
        FALLBACK_JA_TO_VI.put("私は学生です", "Tôi là học sinh/sinh viên.");
        FALLBACK_JA_TO_VI.put("友達と遊びます。", "Tôi đi chơi với bạn.");
        FALLBACK_JA_TO_VI.put("友達と遊びます", "Tôi đi chơi với bạn.");
        FALLBACK_JA_TO_VI.put("大きい犬がいます。", "Có một con chó lớn.");
        FALLBACK_JA_TO_VI.put("大きい犬がいます", "Có một con chó lớn.");
        FALLBACK_JA_TO_VI.put("小さい猫がいます。", "Có một con mèo nhỏ.");
        FALLBACK_JA_TO_VI.put("小さい猫がいます", "Có một con mèo nhỏ.");
        FALLBACK_JA_TO_VI.put("新しい車を買いました。", "Tôi đã mua một chiếc xe hơi mới.");
        FALLBACK_JA_TO_VI.put("新しい車を買いました", "Tôi đã mua một chiếc xe hơi mới.");
        FALLBACK_JA_TO_VI.put("古い家に住んでいます。", "Tôi đang sống trong một ngôi nhà cũ.");
        FALLBACK_JA_TO_VI.put("古い家に住んでいます", "Tôi đang sống trong một ngôi nhà cũ.");
        FALLBACK_JA_TO_VI.put("この花はきれいです。", "Bông hoa này thật đẹp.");
        FALLBACK_JA_TO_VI.put("この花はきれいです", "Bông hoa này thật đẹp.");
        FALLBACK_JA_TO_VI.put("お元気ですか。", "Bạn có khỏe không?");
        FALLBACK_JA_TO_VI.put("お元気ですか", "Bạn có khỏe không?");
        FALLBACK_JA_TO_VI.put("今日は暑いです。", "Hôm nay trời nóng nực.");
        FALLBACK_JA_TO_VI.put("今日は暑いです", "Hôm nay trời nóng nực.");
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
        FALLBACK_EN_TO_JA.put("I eat rice every day", "毎日ご飯を食べます。");
        FALLBACK_EN_TO_JA.put("I drink water.", "水を飲みます。");
        FALLBACK_EN_TO_JA.put("I drink water", "水を飲みます。");
        FALLBACK_EN_TO_JA.put("I go to school.", "学校に行きます。");
        FALLBACK_EN_TO_JA.put("I go to school", "学校に行きます。");
        FALLBACK_EN_TO_JA.put("The teacher is kind.", "先生はやさしいです。");
        FALLBACK_EN_TO_JA.put("The teacher is kind", "先生はやさしいです。");
        FALLBACK_EN_TO_JA.put("How are you?", "お元気ですか。");
        FALLBACK_EN_TO_JA.put("How are you", "お元気ですか。");
        FALLBACK_EN_TO_JA.put("Hello", "こんにちは");
        FALLBACK_EN_TO_JA.put("Thank you", "ありがとう");
        FALLBACK_EN_TO_JA.put("Goodbye", "さようなら");
    }

    @Override
    public TranslateResponse translate(TranslateRequest request) {
        String text = request.getText().trim();
        String sourceLang = request.getSourceLang() != null ? request.getSourceLang() : "ja";
        String targetLang = request.getTargetLang();
        log.info("Dịch thuật AI: '{}' ({} -> {})", text, sourceLang, targetLang);

        // 1. Tra cứu từ điển cục bộ trước (tối ưu tốc độ & độ chính xác cho câu mẫu học tập)
        String translatedText = null;
        if ("ja".equals(sourceLang) && "vi".equals(targetLang)) {
            translatedText = FALLBACK_JA_TO_VI.get(text);
            if (translatedText == null) {
                // Thử tìm không có dấu chấm cuối câu
                String key = text.endsWith("。") ? text.substring(0, text.length() - 1) : text + "。";
                translatedText = FALLBACK_JA_TO_VI.get(key);
            }
        } else if ("vi".equals(sourceLang) && "ja".equals(targetLang)) {
            translatedText = FALLBACK_VI_TO_JA.get(text);
            if (translatedText == null) {
                String key = text.endsWith(".") ? text.substring(0, text.length() - 1) : text + ".";
                translatedText = FALLBACK_VI_TO_JA.get(key);
            }
        } else if ("en".equals(sourceLang) && "ja".equals(targetLang)) {
            translatedText = FALLBACK_EN_TO_JA.get(text);
            if (translatedText == null) {
                String key = text.endsWith(".") ? text.substring(0, text.length() - 1) : text + ".";
                translatedText = FALLBACK_EN_TO_JA.get(key);
            }
        }

        // 2. Gọi API ngoài nếu không tìm thấy trong từ điển cục bộ
        if (translatedText == null || translatedText.isEmpty()) {
            try {
                String langPair = sourceLang + "|" + targetLang;
                String url = "https://api.mymemory.translated.net/get?q={q}&langpair={langpair}";

                Map<String, Object> response = restTemplate.getForObject(url, Map.class, text, langPair);
                if (response != null && response.containsKey("responseData")) {
                    Map<String, Object> responseData = (Map<String, Object>) response.get("responseData");
                    if (responseData != null && responseData.containsKey("translatedText")) {
                        translatedText = (String) responseData.get("translatedText");
                        // Loại bỏ các thông báo rác từ MyMemory nếu có
                        if (translatedText.contains("MYMEMORY WARNING")) {
                            translatedText = null;
                        }
                    }
                }
            } catch (Exception e) {
                log.warn("Không thể kết nối API MyMemory: {}. Sử dụng bản dịch mẫu.", e.getMessage());
            }
        }

        // 3. Fallback cuối cùng
        if (translatedText == null || translatedText.isEmpty()) {
            translatedText = "[Bản dịch mẫu] " + text;
        }

        // 2. Phân tích từ vựng & Sinh Furigana dựa trên dữ liệu database
        // Xác định câu tiếng Nhật (nếu nguồn là ja, phân tích câu nguồn; nếu đích là ja, phân tích câu đích)
        String japaneseText = null;
        if ("ja".equals(sourceLang)) {
            japaneseText = text;
        } else if ("ja".equals(targetLang)) {
            japaneseText = translatedText;
        }

        List<WordAnalysis> matchedWords = new ArrayList<>();
        String pronunciationHtml = null;

        if (japaneseText != null && !japaneseText.isEmpty()) {
            List<Vocabulary> allVocab = vocabularyRepository.findAll();
            Set<Long> matchedIds = new HashSet<>();

            // Tìm kiếm các từ khớp (bao gồm khớp chính xác và khớp theo thân từ)
            for (Vocabulary v : allVocab) {
                boolean isMatch = false;
                String word = v.getWord();

                if (japaneseText.contains(word)) {
                    isMatch = true;
                } else if (word.length() > 1) {
                    // Hỗ trợ chia thì/thể đơn giản (ví dụ: 食べる -> 食べます, stem là 食べ)
                    String stem = word.substring(0, word.length() - 1);
                    if (containsKanji(stem) && japaneseText.contains(stem)) {
                        isMatch = true;
                    }
                }

                if (isMatch && !matchedIds.contains(v.getId())) {
                    matchedIds.add(v.getId());
                    matchedWords.add(WordAnalysis.builder()
                            .word(v.getWord())
                            .reading(v.getReading())
                            .meaning(v.getMeaning())
                            .partOfSpeech(v.getWordType() != null ? v.getWordType().name() : "OTHER")
                            .build());
                }
            }

            // 3. Tạo chuỗi Furigana bằng thẻ ruby
            pronunciationHtml = generateFuriganaHtml(japaneseText, matchedWords);
        }

        return TranslateResponse.builder()
                .originalText(text)
                .translatedText(translatedText)
                .sourceLang(sourceLang)
                .targetLang(targetLang)
                .pronunciation(pronunciationHtml)
                .words(matchedWords)
                .build();
    }

    private String generateFuriganaHtml(String text, List<WordAnalysis> matchedWords) {
        // Sắp xếp từ dài nhất trước để tránh thay thế con
        List<WordAnalysis> sortedWords = new ArrayList<>(matchedWords);
        sortedWords.sort((w1, w2) -> Integer.compare(w2.getWord().length(), w1.getWord().length()));

        String tempText = text;
        List<String> replacements = new ArrayList<>();

        for (WordAnalysis w : sortedWords) {
            String word = w.getWord();
            if (containsKanji(word)) {
                String rubyTag = String.format("<ruby>%s<rt>%s</rt></ruby>", word, w.getReading());
                
                // Thay thế từ trong câu bằng mã placeholder để không bị chồng chéo
                int index = replacements.size();
                replacements.add(rubyTag);
                tempText = tempText.replace(word, String.format("##REPLACE_%d##", index));
            }
        }

        // Trả lại các mã ruby vào vị trí placeholder ban đầu
        for (int i = 0; i < replacements.size(); i++) {
            tempText = tempText.replace(String.format("##REPLACE_%d##", i), replacements.get(i));
        }

        return tempText;
    }

    private static boolean containsKanji(String str) {
        if (str == null) return false;
        for (char c : str.toCharArray()) {
            if (c >= '\u4e00' && c <= '\u9faf') {
                return true;
            }
        }
        return false;
    }
}
