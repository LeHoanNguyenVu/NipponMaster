package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.TokenDto;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JapaneseTokenizerTest {

    private final JapaneseTokenizer tokenizer = new JapaneseTokenizer();

    @Test
    void splitSentences_handlesJapanesePunctuationAndQuotes() {
        String text = "東京で新しい電車が走ります。「とても便利です！」と田中さんは言いました。料金はいくらですか？";
        List<String> sentences = tokenizer.splitSentences(text);

        assertEquals(3, sentences.size());
        assertEquals("東京で新しい電車が走ります。", sentences.get(0));
        assertEquals("「とても便利です！」と田中さんは言いました。", sentences.get(1));
        assertEquals("料金はいくらですか？", sentences.get(2));
    }

    @Test
    void tokenize_threeSampleSentences_withNumbersKatakanaAndProperNouns() {
        // Câu 1: Tên riêng + số
        List<TokenDto> t1 = tokenizer.tokenize("東京で2026年11月に新しいイベントが開かれました。");
        assertTrue(t1.stream().anyMatch(t -> "東京".equals(t.getS()) && "とうきょう".equals(t.getR()) && t.getPos().contains("固有名詞")));
        assertTrue(t1.stream().anyMatch(t -> "2026".equals(t.getS()) && t.getPos().contains("数")));
        assertTrue(t1.stream().anyMatch(t -> "開か".equals(t.getS()) && "開く".equals(t.getL())));

        // Câu 2: Katakana (IPADIC tách ス-マート-フォン hoặc nhận từ Katakana phổ biến như インターネット / アイスクリーム)
        List<TokenDto> t2 = tokenizer.tokenize("インターネットでアイスクリームを買う人が増えています。");
        assertTrue(t2.stream().anyMatch(t -> "インターネット".equals(t.getS()) && "いんたーねっと".equals(t.getR())));
        assertTrue(t2.stream().anyMatch(t -> "アイスクリーム".equals(t.getS()) && "あいすくりーむ".equals(t.getR())));
        assertTrue(t2.stream().anyMatch(t -> "増え".equals(t.getS()) && "増える".equals(t.getL())));

        // Câu 3: Tên riêng tổ chức + động từ chia
        List<TokenDto> t3 = tokenizer.tokenize("日本政府は省エネ対策を発表した。");
        assertTrue(t3.stream().anyMatch(t -> "日本".equals(t.getS()) && t.getPos().contains("固有名詞")));
        assertTrue(t3.stream().anyMatch(t -> "発表".equals(t.getS()) && "はっぴょう".equals(t.getR())));
    }
}
