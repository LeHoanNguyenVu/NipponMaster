package com.nihongo.api.modules.reading.article.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

/**
 * Cổng kiểm tra chống sao chép văn bản (Originality Gate).
 * Đo tỉ lệ trùng lặp ký tự 8-gram và độ dài chuỗi con chung dài nhất giữa bài sinh ra với dữ liệu RSS gốc.
 */
@Component
public class CopyrightGuardService {

    public static final int DEFAULT_NGRAM = 8;

    @Value("${reading.copyright.max-8gram-overlap:0.10}")
    private double maxAllowedOverlap = 0.10;

    public CopyrightCheckResult evaluate(String generatedJaText, String originalRssRaw) {
        double overlap = calculateCharNGramOverlap(generatedJaText, originalRssRaw, DEFAULT_NGRAM);
        int lcs = calculateLongestCommonSubstring(generatedJaText, originalRssRaw);
        boolean passed = overlap < maxAllowedOverlap;
        return new CopyrightCheckResult(passed, overlap, lcs, maxAllowedOverlap);
    }

    public double calculateCharNGramOverlap(String generated, String source, int n) {
        String g = normalize(generated);
        String s = normalize(source);
        if (g.length() < n || s.length() < n) {
            return 0.0;
        }
        Set<String> srcGrams = new HashSet<>(Math.max(16, s.length() - n + 1));
        for (int i = 0; i <= s.length() - n; i++) {
            srcGrams.add(s.substring(i, i + n));
        }
        int total = g.length() - n + 1;
        int hits = 0;
        for (int i = 0; i < total; i++) {
            if (srcGrams.contains(g.substring(i, i + n))) {
                hits++;
            }
        }
        return (double) hits / total;
    }

    public int calculateLongestCommonSubstring(String a, String b) {
        String s1 = normalize(a);
        String s2 = normalize(b);
        if (s1.isEmpty() || s2.isEmpty()) return 0;

        int max = 0;
        int[] prev = new int[s2.length() + 1];
        int[] curr = new int[s2.length() + 1];
        for (int i = 1; i <= s1.length(); i++) {
            char c1 = s1.charAt(i - 1);
            for (int j = 1; j <= s2.length(); j++) {
                if (c1 == s2.charAt(j - 1)) {
                    curr[j] = prev[j - 1] + 1;
                    if (curr[j] > max) max = curr[j];
                } else {
                    curr[j] = 0;
                }
            }
            int[] tmp = prev;
            prev = curr;
            curr = tmp;
        }
        return max;
    }

    private String normalize(String input) {
        if (input == null) return "";
        return input.replaceAll("[\\s\\u3000。、！？「」『』（）()・….,:;!?\"'\\-]", "");
    }

    public record CopyrightCheckResult(
            boolean passed,
            double ngramOverlap8,
            int longestCommonSubstring,
            double threshold
    ) {
    }
}
