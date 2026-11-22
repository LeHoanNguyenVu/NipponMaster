package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.KeyVocabDto;
import com.nihongo.api.modules.reading.article.service.JlptLevelClassifier.ClassificationResult;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JlptLevelClassifierTest {

    private static JlptLevelClassifier classifier;

    @BeforeAll
    static void setUp() {
        JlptLexiconService lexicon = new JlptLexiconService();
        JapaneseTokenizer tokenizer = new JapaneseTokenizer();
        classifier = new JlptLevelClassifier(lexicon, tokenizer);
    }

    @Test
    void classify_fiveFixedSamplePassages_withinOneLevel() {
        Map<String, String> samples = Map.of(
                "N5", "わたしはまいにちあさ七じにおきます。パンとたまごをたべます。でんしゃでがっこうへいきます。ともだちとはなします。",
                "N4", "わたしは去年から日本語の勉強を始めました。毎日練習して少しずつ読めるようになりました。来年、日本へ旅行に行く予定です。",
                "N3", "最近、環境問題への関心が高まったおかげで、買い物の際にマイバッグを持参する人が増えています。一方で、使い捨てプラスチックを減らす工夫も求められています。",
                "N2", "少子高齢化が急速に進行する日本において、労働力不足の解消は喫緊の課題となっている。技術導入に伴う初期投資の負担や人材育成の遅れなど、解決すべき問題も山積している。",
                "N1", "金融政策の正常化をめぐる議論が活発化する中、中央銀行は物価安定の目標達成と景気への下押し圧力の回避という極めて繊細な舵取りを余儀なくされている。市場との対話のあり方そのものが改めて問い直されている。"
        );

        samples.forEach((expected, text) -> {
            ClassificationResult res = classifier.classifyRawText(text, List.of(), expected, null);
            int expectedRank = JlptLexiconService.levelToRank(expected);
            int diff = Math.abs(res.computedRank() - expectedRank);
            assertTrue(diff <= 1,
                    "Expected " + expected + " (±1), got " + res.computedLevel()
                            + " [vocab=" + res.vocabLevel() + ", kanji=" + res.kanjiLevel()
                            + ", grammar=" + res.grammarMax() + ", avgLen=" + res.avgSentenceLen() + "]");
        });
    }

    @Test
    void classify_properNounsAndNumbers_doNotInflateLevel() {
        String baseText = "きのう、ともだちとえきへいきました。おいしいごはんをたべました。とてもたのしかったです。";
        String withProperNounsAndNumbers = "きのう、山田太郎さんと東京の渋谷へいきました。1250円のおいしいごはんをたべました。2026年もとてもたのしかったです。";

        ClassificationResult r1 = classifier.classifyRawText(baseText, List.of(), "N5", null);
        ClassificationResult r2 = classifier.classifyRawText(withProperNounsAndNumbers, List.of(), "N5", null);

        assertEquals(r1.vocabLevel(), r2.vocabLevel(),
                "Proper nouns & numbers must not inflate vocabLevel (oov=" + r2.outOfListWords() + ", harder=" + r2.harderThanTargetWords() + ")");
        assertEquals(r1.kanjiLevel(), r2.kanjiLevel(), "Proper nouns & numbers must not inflate kanjiLevel");
        assertEquals(r1.computedLevel(), r2.computedLevel(),
                "Proper nouns & numbers must not inflate computedLevel: base=" + r1.computedLevel() + ", withPN=" + r2.computedLevel());
    }

    @Test
    void classify_outOfListWordsInKeyVocab_areIgnored() {
        String text = "きょうは線状降水帯がきました。あめがたくさんふりました。いえにいました。あんぜんでした。";

        ClassificationResult withoutKeyVocab = classifier.classifyRawText(text, List.of(), "N5", null);
        ClassificationResult withKeyVocab = classifier.classifyRawText(
                text,
                List.of(KeyVocabDto.builder().word("線状降水帯").reading("せんじょうこうすいたい").meaningVi("Dải mây mưa tuyến tính").jlptLevel("N1").build()),
                "N5",
                null
        );

        assertTrue(withKeyVocab.computedRank() <= withoutKeyVocab.computedRank());
        assertEquals("N5", withKeyVocab.computedLevel(),
                "When 線状降水帯 is in keyVocab, simple N5 text should stay N5 (was " + withKeyVocab.computedLevel() + ")");
    }

    @Test
    void classify_llmSecondOpinionDivergence_setsNeedsReview() {
        String n5Text = "わたしはまいにちがっこうへいきます。ともだちとほんをよみます。たのしいです。";
        ClassificationResult agreed = classifier.classifyRawText(n5Text, List.of(), "N5", "N5");
        ClassificationResult disagreed = classifier.classifyRawText(n5Text, List.of(), "N5", "N2");

        assertFalse(agreed.needsReview());
        assertTrue(disagreed.needsReview());
        assertEquals("N2", disagreed.toMetricsMap().get("llmLevel"));
    }

    @Test
    void calibrationCorpus_100Passages_meetsAccuracyTargets() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream in = getClass().getResourceAsStream("/reading/calibration_corpus.json");
        assertNotNull(in, "Missing calibration_corpus.json");
        List<Map<String, String>> corpus = mapper.readValue(in, new TypeReference<>() {});
        assertTrue(corpus.size() >= 90, "Calibration corpus should have ~100 passages");

        int[][] confusion = new int[6][6]; // [actual][predicted]
        int exact = 0;
        int within1 = 0;

        for (Map<String, String> item : corpus) {
            String expected = item.get("level");
            String text = item.get("text");
            int actualRank = JlptLexiconService.levelToRank(expected);
            ClassificationResult res = classifier.classifyRawText(text, List.of(), expected, null);
            int predRank = res.computedRank();

            confusion[actualRank][predRank]++;
            if (actualRank == predRank) exact++;
            if (Math.abs(actualRank - predRank) <= 1) within1++;
        }

        double exactPct = 100.0 * exact / corpus.size();
        double within1Pct = 100.0 * within1 / corpus.size();

        StringBuilder matrix = new StringBuilder("\n=== JLPT CLASSIFIER CALIBRATION CONFUSION MATRIX (N=" + corpus.size() + ") ===\n");
        matrix.append("Actual\\Pred |  N5 |  N4 |  N3 |  N2 |  N1\n");
        for (int a = 1; a <= 5; a++) {
            matrix.append(String.format("     %s     |", JlptLexiconService.rankToLevel(a)));
            for (int p = 1; p <= 5; p++) {
                matrix.append(String.format(" %3d |", confusion[a][p]));
            }
            matrix.append('\n');
        }
        matrix.append(String.format("Exact match : %d/%d (%.1f%%) [target >= 60%%]\n", exact, corpus.size(), exactPct));
        matrix.append(String.format("Within +-1  : %d/%d (%.1f%%) [target >= 90%%]\n", within1, corpus.size(), within1Pct));
        System.out.println(matrix);

        assertTrue(exactPct >= 60.0, "Exact match " + exactPct + "% < 60%:\n" + matrix);
        assertTrue(within1Pct >= 90.0, "Within ±1 " + within1Pct + "% < 90%:\n" + matrix);
    }
}
