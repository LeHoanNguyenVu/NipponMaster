package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.service.CopyrightGuardService.CopyrightCheckResult;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CopyrightGuardServiceTest {

    private final CopyrightGuardService guard = new CopyrightGuardService();

    @Test
    void evaluate_copiedArticle_isRejected() {
        String source = "東京都内の鉄道会社は20日、消費電力を従来より20％削減できる新型電車の運行を始めました。利用者からも好評です。";
        String copied = "東京都内の鉄道会社は20日、消費電力を従来より20％削減できる新型電車の運行を始めました。";

        CopyrightCheckResult res = guard.evaluate(copied, source);

        assertFalse(res.passed());
        assertTrue(res.ngramOverlap8() >= 0.90);
        assertTrue(res.longestCommonSubstring() > 30);
    }

    @Test
    void evaluate_originalRewrittenArticle_passes() {
        String source = "物価高 アイスは値上げ 居酒屋やピザ店は低価格で 農家は悲鳴 家庭で消費するモノやサービスの値動きをみる消費者物価指数が上昇しました。";
        String original = "十月の日本の食べ物の値段は去年より二・二％上がりました。大きな会社はアイスの値段を高くしました。でもピザのお店は安くしています。今、農家の人はとても困っています。";

        CopyrightCheckResult res = guard.evaluate(original, source);

        assertTrue(res.passed());
        assertTrue(res.ngramOverlap8() < 0.10);
    }
}
