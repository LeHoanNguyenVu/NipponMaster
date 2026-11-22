package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.KeyVocabDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.SentenceDto;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.TokenDto;
import com.nihongo.api.modules.reading.article.service.JlptLexiconService.GrammarPatternEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Bộ phân loại và kiểm định cấp độ JLPT (N5=1 .. N1=5) kết hợp 4 tín hiệu định lượng + ý kiến thứ hai từ LLM:
 * 1. Độ phủ từ vựng (bỏ qua tên riêng, số, trợ từ, ký hiệu, từ có trong key_vocab)
 * 2. Độ phủ Kanji (bỏ qua Kanji thuộc tên riêng hoặc key_vocab)
 * 3. Ngữ pháp (so khớp mẫu ngữ pháp đặc trưng N4-N1)
 * 4. Độ dài câu trung bình
 * 5. Ý kiến thứ hai từ LLM (lệch >= 2 cấp -> needsReview = true)
 */
@Component
@RequiredArgsConstructor
public class JlptLevelClassifier {

    private static final Set<String> IGNORED_POS1 = Set.of("記号", "助詞", "助動詞", "フィラー", "接頭詞", "その他");
    private static final Set<String> IGNORED_POS2 = Set.of("固有名詞", "数", "代名詞", "接尾", "非自立", "特殊", "サ変接続");

    private final JlptLexiconService lexicon;
    private final JapaneseTokenizer tokenizer;

    @Value("${reading.level.vocab-coverage:0.84}")
    private double vocabCoverageThreshold = 0.84;

    @Value("${reading.level.kanji-coverage:0.84}")
    private double kanjiCoverageThreshold = 0.84;

    @Value("${reading.level.sent-len-n5:22}")
    private double sentLenN5 = 22.0;

    @Value("${reading.level.sent-len-n4:30}")
    private double sentLenN4 = 30.0;

    @Value("${reading.level.sent-len-n3:41}")
    private double sentLenN3 = 41.0;

    @Value("${reading.level.sent-len-n2:53}")
    private double sentLenN2 = 53.0;

    /**
     * Phân loại trực tiếp 1 đoạn văn thuần (dùng cho nguồn mở hoặc hiệu chuẩn calibration).
     */
    public ClassificationResult classifyRawText(String text, List<KeyVocabDto> keyVocab, String targetLevel, String llmLevel) {
        List<String> split = tokenizer.splitSentences(text);
        List<SentenceDto> sentences = new ArrayList<>(split.size());
        int idx = 0;
        for (String s : split) {
            sentences.add(SentenceDto.builder()
                    .idx(idx++)
                    .text(s)
                    .tokens(tokenizer.tokenize(s))
                    .build());
        }
        return classifySentences(sentences, keyVocab, targetLevel, llmLevel);
    }

    /**
     * Phân loại danh sách câu đã (hoặc chưa) tokenize; đồng thời gán cấp độ JLPT `lv` lên từng token cho tính năng Smart Furigana.
     */
    public ClassificationResult classifySentences(
            List<SentenceDto> sentences,
            List<KeyVocabDto> keyVocab,
            String targetLevel,
            String llmLevel
    ) {
        Set<String> keyVocabSet = new HashSet<>();
        if (keyVocab != null) {
            for (KeyVocabDto kv : keyVocab) {
                if (kv.getWord() != null && !kv.getWord().isBlank()) {
                    keyVocabSet.add(kv.getWord().trim());
                }
            }
        }

        int targetRank = JlptLexiconService.levelToRank(targetLevel);
        int[] vocabKnown = new int[6];
        int vocabTotal = 0;
        int[] kanjiKnown = new int[6];
        int kanjiTotal = 0;

        Set<String> outOfListWords = new LinkedHashSet<>();
        Set<String> harderThanTargetWords = new LinkedHashSet<>();
        StringBuilder fullText = new StringBuilder();
        int totalSentenceChars = 0;

        for (SentenceDto s : sentences) {
            String text = s.getText() == null ? "" : s.getText().trim();
            if (text.isEmpty()) continue;
            fullText.append(text);
            totalSentenceChars += text.length();

            List<TokenDto> tokens = s.getTokens();
            if (tokens == null || tokens.isEmpty()) {
                tokens = tokenizer.tokenize(text);
                s.setTokens(tokens);
            }

            // Đánh dấu những chữ Kanji nằm trong keyVocab hoặc tên riêng để không làm tăng ảo cấp độ
            Set<Integer> maskedCharIndices = findKeyVocabSpans(text, keyVocabSet);

            int cursor = 0;
            for (TokenDto tk : tokens) {
                String surface = tk.getS() == null ? "" : tk.getS();
                int startPos = text.indexOf(surface, cursor);
                if (startPos >= 0) {
                    cursor = startPos + surface.length();
                }

                String pos = tk.getPos() == null ? "" : tk.getPos();
                String[] posParts = pos.split(",");
                String pos1 = posParts.length > 0 ? posParts[0] : "";
                String pos2 = posParts.length > 1 ? posParts[1] : "";

                boolean isProperNoun = "固有名詞".equals(pos2);
                boolean isNumber = "数".equals(pos2);
                boolean isKeyVocab = keyVocabSet.contains(surface)
                        || (tk.getL() != null && keyVocabSet.contains(tk.getL()))
                        || isSpanMasked(startPos, surface.length(), maskedCharIndices);

                // Tính độ phủ Kanji (bỏ qua Kanji trong tên riêng & key_vocab)
                if (!isProperNoun && !isKeyVocab) {
                    int maxKanjiInToken = 0;
                    for (int i = 0; i < surface.length(); i++) {
                        char ch = surface.charAt(i);
                        if (isKanji(ch)) {
                            kanjiTotal++;
                            Integer kr = lexicon.lookupKanjiRank(ch);
                            int resolved = (kr != null) ? kr : 5;
                            for (int l = resolved; l <= 5; l++) kanjiKnown[l]++;
                            if (resolved > maxKanjiInToken) maxKanjiInToken = resolved;
                        }
                    }
                    if (maxKanjiInToken > 0 && tk.getLv() == null) {
                        tk.setLv(JlptLexiconService.rankToLevel(maxKanjiInToken));
                    }
                }

                // Bỏ qua các loại từ chức năng, tên riêng, số, ký tự ASCII/dấu câu, từ đã giải nghĩa trong key_vocab
                if (isProperNoun || isNumber || isKeyVocab || IGNORED_POS1.contains(pos1) || !containsJapanese(surface)) {
                    continue;
                }
                if (IGNORED_POS2.contains(pos2) && !"サ変接続".equals(pos2)) {
                    continue;
                }
                if (surface.length() == 1 && isHiragana(surface.charAt(0))) {
                    continue;
                }

                Integer vRank = lexicon.lookupVocabRank(tk.getL(), surface, tk.getR());
                if (vRank != null) {
                    tk.setLv(JlptLexiconService.rankToLevel(vRank));
                    vocabTotal++;
                    for (int l = vRank; l <= 5; l++) vocabKnown[l]++;
                    if (targetRank > 0 && vRank > targetRank) {
                        harderThanTargetWords.add(tk.getL() != null ? tk.getL() : surface);
                    }
                } else {
                    // Nếu là từ chứa Kanji đã có trong bảng Kanji JLPT thì ước lượng theo Kanji cao nhất
                    Integer fallbackKanjiRank = estimateFromKanjiChars(surface);
                    if (fallbackKanjiRank != null) {
                        vocabTotal++;
                        tk.setLv(JlptLexiconService.rankToLevel(fallbackKanjiRank));
                        for (int l = fallbackKanjiRank; l <= 5; l++) vocabKnown[l]++;
                        if (targetRank > 0 && fallbackKanjiRank > targetRank) {
                            harderThanTargetWords.add(surface);
                        }
                    } else if (isAllHiragana(surface)) {
                        // Từ thuần Hiragana bị tách lẻ bởi IPADIC (thường là văn bản N5/N4) -> không đẩy lên N1
                        tk.setLv("N5");
                    } else if (isAllKatakana(surface)) {
                        // Từ ngoại lai Katakana không có trong danh sách JLPT (ví dụ ラーメン, アプリ) -> mặc định N4, không đẩy lên N1
                        tk.setLv("N4");
                        vocabTotal++;
                        for (int l = 2; l <= 5; l++) vocabKnown[l]++;
                    } else {
                        vocabTotal++;
                        outOfListWords.add(tk.getL() != null ? tk.getL() : surface);
                        if (targetRank > 0 && targetRank < 5) {
                            harderThanTargetWords.add(tk.getL() != null ? tk.getL() : surface);
                        }
                    }
                }
            }
        }

        Map<String, Double> vocabCoverage = buildCoverageMap(vocabKnown, vocabTotal);
        Map<String, Double> kanjiCoverage = buildCoverageMap(kanjiKnown, kanjiTotal);

        // Tính level từ vựng trên tổng số từ nhận diện được (tránh 1-2 từ OOV kéo bài N5/N4 thẳng lên N1)
        int vocabDenom = vocabKnown[5] > 0 ? vocabKnown[5] : vocabTotal;
        int vocabLevel = findLevelByCoverage(vocabKnown, vocabDenom, vocabCoverageThreshold);
        int kanjiLevel = (kanjiTotal == 0) ? 1 : findLevelByCoverage(kanjiKnown, kanjiTotal, kanjiCoverageThreshold);

        List<GrammarPatternEntry> matchedGrammars = lexicon.matchGrammarPatterns(fullText.toString());
        int grammarMaxRank = 1;
        for (GrammarPatternEntry gp : matchedGrammars) {
            if (gp.levelRank() > grammarMaxRank) grammarMaxRank = gp.levelRank();
        }

        double avgSentenceLen = sentences.isEmpty() ? 0.0 : (double) totalSentenceChars / sentences.size();
        int sentenceLevel = scoreSentenceLength(avgSentenceLen);

        // Công thức kết hợp (Phase 2.2 + hiệu chuẩn cân bằng 4 tín hiệu trên 100 đoạn văn JLPT):
        // Kết hợp từ vựng (trọng số cao nhất), Kanji, độ dài câu và mẫu ngữ pháp để tránh 1 tín hiệu nhiễu đẩy lệch toàn bài.
        double weighted = 0.45 * vocabLevel + 0.25 * kanjiLevel + 0.20 * sentenceLevel + 0.10 * grammarMaxRank;
        int base = (int) Math.round(weighted);
        // Ràng buộc an toàn: không thấp hơn vocabLevel - 1 và tăng +1 nếu ngữ pháp/câu vượt trội rõ rệt
        if (grammarMaxRank >= base + 2) {
            base = Math.min(grammarMaxRank, base + 1);
        }
        if (sentenceLevel > base + 1) {
            base = Math.min(5, base + 1);
        }
        // Bảo vệ N1: nếu tỉ lệ chữ/từ N1 cao (kanji N2 cov < 0.93 hoặc vocab N2 cov < 0.80) và câu dài -> N1
        double vocabN2Cov = vocabDenom == 0 ? 1.0 : (double) vocabKnown[4] / vocabDenom;
        if (vocabN2Cov < 0.80 && sentenceLevel >= 4) {
            base = 5;
        }
        base = Math.max(1, Math.min(5, base));

        String computedLevel = JlptLexiconService.rankToLevel(base);
        int llmRank = JlptLexiconService.levelToRank(llmLevel);
        boolean llmDisagrees = llmRank > 0 && Math.abs(base - llmRank) >= 2;
        boolean targetDisagrees = targetRank > 0 && Math.abs(base - targetRank) >= 2;
        boolean needsReview = llmDisagrees || targetDisagrees;

        return new ClassificationResult(
                computedLevel,
                base,
                JlptLexiconService.rankToLevel(vocabLevel),
                JlptLexiconService.rankToLevel(kanjiLevel),
                JlptLexiconService.rankToLevel(grammarMaxRank),
                JlptLexiconService.rankToLevel(sentenceLevel),
                Math.round(avgSentenceLen * 10.0) / 10.0,
                vocabCoverage,
                kanjiCoverage,
                new ArrayList<>(outOfListWords),
                new ArrayList<>(harderThanTargetWords),
                llmLevel,
                needsReview
        );
    }

    private int findLevelByCoverage(int[] known, int total, double threshold) {
        if (total == 0) return 1;
        for (int l = 1; l <= 5; l++) {
            double cov = (double) known[l] / total;
            if (cov >= threshold) return l;
        }
        return 5;
    }

    private int scoreSentenceLength(double avgLen) {
        if (avgLen <= sentLenN5) return 1;
        if (avgLen <= sentLenN4) return 2;
        if (avgLen <= sentLenN3) return 3;
        if (avgLen <= sentLenN2) return 4;
        return 5;
    }

    private Map<String, Double> buildCoverageMap(int[] known, int total) {
        Map<String, Double> map = new LinkedHashMap<>();
        for (int l = 1; l <= 5; l++) {
            double cov = total == 0 ? 1.0 : (double) known[l] / total;
            map.put(JlptLexiconService.rankToLevel(l), Math.round(cov * 1000.0) / 1000.0);
        }
        return map;
    }

    private Integer estimateFromKanjiChars(String surface) {
        int maxRank = 0;
        int kanjiCount = 0;
        for (int i = 0; i < surface.length(); i++) {
            char ch = surface.charAt(i);
            if (isKanji(ch)) {
                kanjiCount++;
                Integer kr = lexicon.lookupKanjiRank(ch);
                if (kr == null) return null;
                if (kr > maxRank) maxRank = kr;
            }
        }
        return kanjiCount > 0 ? maxRank : null;
    }

    private Set<Integer> findKeyVocabSpans(String text, Set<String> keyVocabSet) {
        if (keyVocabSet.isEmpty()) return Set.of();
        Set<Integer> masked = new HashSet<>();
        for (String kv : keyVocabSet) {
            if (kv.length() < 2) continue;
            int idx = text.indexOf(kv);
            while (idx >= 0) {
                for (int i = idx; i < idx + kv.length(); i++) {
                    masked.add(i);
                }
                idx = text.indexOf(kv, idx + kv.length());
            }
        }
        return masked;
    }

    private boolean isSpanMasked(int start, int len, Set<Integer> masked) {
        if (start < 0 || masked.isEmpty()) return false;
        for (int i = start; i < start + len; i++) {
            if (masked.contains(i)) return true;
        }
        return false;
    }

    private boolean isKanji(char c) {
        return c >= '\u4E00' && c <= '\u9FFF';
    }

    private boolean isHiragana(char c) {
        return c >= '\u3040' && c <= '\u309F';
    }

    private boolean isAllHiragana(String s) {
        if (s == null || s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!isHiragana(c) && c != 'ー') return false;
        }
        return true;
    }

    private boolean containsJapanese(String s) {
        if (s == null || s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (isKanji(c) || isHiragana(c) || (c >= '\u30A0' && c <= '\u30FF')) return true;
        }
        return false;
    }

    private boolean isAllKatakana(String s) {
        if (s == null || s.length() < 2) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!((c >= '\u30A0' && c <= '\u30FF') || c == 'ー')) return false;
        }
        return true;
    }

    public record ClassificationResult(
            String computedLevel,
            int computedRank,
            String vocabLevel,
            String kanjiLevel,
            String grammarMax,
            String sentenceLevel,
            double avgSentenceLen,
            Map<String, Double> coverage,
            Map<String, Double> kanjiCoverage,
            List<String> outOfListWords,
            List<String> harderThanTargetWords,
            String llmLevel,
            boolean needsReview
    ) {
        public Map<String, Object> toMetricsMap() {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("coverage", coverage);
            m.put("kanjiCoverage", kanjiCoverage);
            m.put("vocabLevel", vocabLevel);
            m.put("kanjiLevel", kanjiLevel);
            m.put("grammarMax", grammarMax);
            m.put("sentenceLevel", sentenceLevel);
            m.put("avgSentenceLen", avgSentenceLen);
            m.put("outOfListWords", outOfListWords.size() > 15 ? outOfListWords.subList(0, 15) : outOfListWords);
            if (llmLevel != null) {
                m.put("llmLevel", llmLevel);
            }
            m.put("needsReview", needsReview);
            return m;
        }
    }
}
