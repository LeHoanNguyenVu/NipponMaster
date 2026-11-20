package com.nihongo.api.modules.reading.article.service;

import com.atilika.kuromoji.ipadic.Token;
import com.atilika.kuromoji.ipadic.Tokenizer;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.TokenDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Bọc Kuromoji IPADIC để tách câu và tách từ tiếng Nhật kèm cách đọc Hiragana, lemma và từ loại.
 * Kuromoji Tokenizer là thread-safe sau khi khởi tạo (~1.4 ms/bài 800 ký tự).
 */
@Component
public class JapaneseTokenizer {

    private final Tokenizer tokenizer = new Tokenizer();

    /**
     * Tách đoạn văn tiếng Nhật thành từng câu theo dấu kết thúc câu 。！？
     */
    public List<String> splitSentences(String text) {
        if (text == null || text.isBlank()) {
            return List.of();
        }
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int quoteDepth = 0;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c == '\r' || c == '\n') {
                flushIfNotBlank(current, result);
                continue;
            }
            if (c == '「' || c == '『') {
                quoteDepth++;
            } else if ((c == '」' || c == '』') && quoteDepth > 0) {
                quoteDepth--;
            }
            current.append(c);
            if (quoteDepth == 0 && (c == '。' || c == '！' || c == '？')) {
                flushIfNotBlank(current, result);
            }
        }
        flushIfNotBlank(current, result);
        return result;
    }

    /**
     * Tách 1 câu thành danh sách token {s, r(hiragana), l(lemma), pos, lv(null)}.
     */
    public List<TokenDto> tokenize(String sentence) {
        if (sentence == null || sentence.isBlank()) {
            return List.of();
        }
        List<Token> raw = tokenizer.tokenize(sentence);
        List<TokenDto> out = new ArrayList<>(raw.size());
        for (Token tk : raw) {
            String surface = tk.getSurface();
            String readingRaw = tk.getReading();
            String readingHira = (readingRaw == null || "*".equals(readingRaw))
                    ? katakanaToHiragana(surface)
                    : katakanaToHiragana(readingRaw);

            String base = tk.getBaseForm();
            String lemma = (base == null || "*".equals(base)) ? surface : base;

            String pos1 = tk.getPartOfSpeechLevel1();
            String pos2 = tk.getPartOfSpeechLevel2();
            String pos = (pos2 != null && !"*".equals(pos2)) ? pos1 + "," + pos2 : pos1;

            out.add(TokenDto.builder()
                    .s(surface)
                    .r(readingHira)
                    .l(lemma)
                    .pos(pos)
                    .lv(null)
                    .build());
        }
        return out;
    }

    public static String katakanaToHiragana(String input) {
        if (input == null || input.isEmpty()) return "";
        StringBuilder sb = new StringBuilder(input.length());
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= '\u30A1' && c <= '\u30F6') {
                sb.append((char) (c - 0x60));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private void flushIfNotBlank(StringBuilder sb, List<String> out) {
        String s = sb.toString().trim();
        if (!s.isEmpty()) {
            out.add(s);
        }
        sb.setLength(0);
    }
}
