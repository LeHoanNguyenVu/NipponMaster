package com.nihongo.api.modules.ai.rag.service;

import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResponse;
import com.nihongo.api.modules.ai.rag.model.KnowledgeChunk.SearchResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Bộ đánh giá chất lượng truy xuất RAG (30 câu hỏi chuẩn N5→N1 + FAQ hệ thống).
 * Đo tỷ lệ tìm trúng nguồn (Hit@5) và độ trễ trung bình / p95.
 */
@Service
@RequiredArgsConstructor
public class RagEvaluationService {

    private final KnowledgeSearchService searchService;

    public record EvalCase(String query, String levelFilter, String expectedKeyword) {}

    public static final List<EvalCase> BENCHMARK_30 = List.of(
            // FAQ hệ thống (5)
            new EvalCase("Flashcard SRS ôn tập thế nào", null, "Flashcard"),
            new EvalCase("Cách luyện viết Kanji Master trên ứng dụng", null, "Kanji"),
            new EvalCase("Học ngữ pháp qua video và quiz xếp sao", null, "Ngữ pháp"),
            new EvalCase("Làm bài kiểm tra đầu vào Placement Test ở đâu", null, "Placement"),
            new EvalCase("Tính năng dịch thuật phân tích furigana", null, "Dịch"),
            // Ngữ pháp N5 -> N1 (10)
            new EvalCase("Trợ từ chủ đề は và câu khẳng định N5", "N5", "は"),
            new EvalCase("Cách chia thể て N5", "N5", "て"),
            new EvalCase("Phân biệt ので và から chỉ nguyên nhân", "N4", "から"),
            new EvalCase("Ngữ pháp thể khả năng N4", "N4", "Khả năng"),
            new EvalCase("Phân biệt ために và ように", "N3", "ため"),
            new EvalCase("Ngữ pháp ことにする và ことになる", "N3", "ことに"),
            new EvalCase("Cách dùng わけだ và わけではない", "N3", "わけ"),
            new EvalCase("Ngữ pháp にとって và に対して N2", "N2", "にとって"),
            new EvalCase("Mẫu câu にもかかわらず N2", "N2", "にもかかわらず"),
            new EvalCase("Cấu trúc ざるを得ない trang trọng", "N1", "ざるを得ない"),
            // Kanji N5 -> N1 (10)
            new EvalCase("Kanji mặt trời ngày 日", "N5", "日"),
            new EvalCase("Kanji mặt trăng tháng 月", "N5", "月"),
            new EvalCase("Kanji nước 水 âm On Kun", "N5", "水"),
            new EvalCase("Kanji quảng rộng lớn 広", "N4", "広"),
            new EvalCase("Kanji dương ánh nắng mặt trời 陽", "N3", "陽"),
            new EvalCase("Kanji khô ráo 乾", "N2", "乾"),
            new EvalCase("Kanji yết đăng lên 掲", "N1", "掲"),
            new EvalCase("Kanji trường học 学", "N5", "学"),
            new EvalCase("Kanji thời gian 時", "N5", "時"),
            new EvalCase("Kanji nói chuyện 話", "N5", "話"),
            // Từ vựng & Hiragana/Katakana (5)
            new EvalCase("Từ vựng giáo viên thầy cô 先生", null, "先生"),
            new EvalCase("Chữ cái Hiragana あ mẹo nhớ", "STARTER", "あ"),
            new EvalCase("Từ vựng cánh đồng hoa 花畑", "N5", "花畑"),
            new EvalCase("Từ vựng dậy sớm 早起き", "N3", "早起き"),
            new EvalCase("Từ vựng phòng ngủ 寝室", "N3", "寝室")
    );

    public BenchmarkReport evaluateAll() {
        List<CaseResult> details = new ArrayList<>(BENCHMARK_30.size());
        long[] latencies = new long[BENCHMARK_30.size()];
        int passed = 0;

        for (int i = 0; i < BENCHMARK_30.size(); i++) {
            EvalCase c = BENCHMARK_30.get(i);
            SearchResponse res = searchService.search(c.query(), c.levelFilter(), 5);
            long ms = res != null ? res.getLatencyMs() : 0L;
            latencies[i] = ms;

            List<SearchResult> hits = res != null && res.getResults() != null ? res.getResults() : List.of();
            String needle = c.expectedKeyword().toLowerCase();
            boolean hit = hits.stream().anyMatch(r ->
                    (r.getTitle() != null && r.getTitle().toLowerCase().contains(needle))
                            || (r.getContent() != null && r.getContent().toLowerCase().contains(needle)));

            if (hit) passed++;
            details.add(CaseResult.builder()
                    .query(c.query())
                    .expectedKeyword(c.expectedKeyword())
                    .passed(hit)
                    .latencyMs(ms)
                    .topTitle(hits.isEmpty() ? null : hits.get(0).getTitle())
                    .topScore(hits.isEmpty() ? 0.0 : hits.get(0).getScore())
                    .build());
        }

        long sum = 0;
        for (long l : latencies) sum += l;
        long avg = latencies.length == 0 ? 0 : sum / latencies.length;
        Arrays.sort(latencies);
        long p95 = latencies.length == 0 ? 0 : latencies[(int) Math.floor(0.95 * (latencies.length - 1))];
        double acc = BENCHMARK_30.isEmpty() ? 0.0 : Math.round((passed * 1000.0 / BENCHMARK_30.size())) / 10.0;

        return BenchmarkReport.builder()
                .totalQueries(BENCHMARK_30.size())
                .passedQueries(passed)
                .accuracyPercent(acc)
                .avgLatencyMs(avg)
                .p95LatencyMs(p95)
                .cases(details)
                .build();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BenchmarkReport {
        private int totalQueries;
        private int passedQueries;
        private double accuracyPercent;
        private long avgLatencyMs;
        private long p95LatencyMs;
        private List<CaseResult> cases;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CaseResult {
        private String query;
        private String expectedKeyword;
        private boolean passed;
        private long latencyMs;
        private String topTitle;
        private double topScore;
    }
}

