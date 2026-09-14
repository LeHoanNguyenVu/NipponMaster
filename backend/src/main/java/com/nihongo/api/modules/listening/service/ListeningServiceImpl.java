package com.nihongo.api.modules.listening.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.listening.dto.ListeningScenarioDTO.*;
import com.nihongo.api.modules.listening.repository.ListeningDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ListeningServiceImpl implements ListeningService {

    private final ListeningDataRepository dataRepository;

    @Override
    public List<ScenarioSummary> getScenarios(String level, String category, String keyword) {
        return dataRepository.findAllSummaries().stream()
            .filter(s -> level == null || level.isEmpty() || level.equalsIgnoreCase("ALL") || s.getLevel().equalsIgnoreCase(level))
            .filter(s -> category == null || category.isEmpty() || category.equalsIgnoreCase("ALL") || s.getCategory().equalsIgnoreCase(category))
            .filter(s -> {
                if (keyword == null || keyword.trim().isEmpty()) return true;
                String q = keyword.trim().toLowerCase();
                return s.getTitle().toLowerCase().contains(q)
                    || s.getTitleJp().toLowerCase().contains(q)
                    || s.getDescription().toLowerCase().contains(q)
                    || s.getCharacterName().toLowerCase().contains(q);
            })
            .collect(Collectors.toList());
    }

    @Override
    public ScenarioDetail getScenarioDetail(String id) {
        return dataRepository.findDetailById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài nghe tình huống với id = " + id));
    }

    @Override
    public SubmitResponse submitSession(SubmitRequest request) {
        int quizCorrect = request.getQuizCorrectCount();
        int quizTotal = Math.max(1, request.getQuizTotalCount());
        int listeningAccuracy = (int) Math.round(((double) quizCorrect / quizTotal) * 100);

        int etiquetteScoreTotal = request.getEtiquetteScoreTotal();
        int visitedNodesCount = Math.max(1, request.getVisitedNodeIds() != null ? request.getVisitedNodeIds().size() : 1);
        int avgEtiquette = Math.min(100, etiquetteScoreTotal / visitedNodesCount);

        int totalScore = (int) Math.round((listeningAccuracy * 0.6) + (avgEtiquette * 0.4));

        String rank = totalScore >= 90 ? "S" : (totalScore >= 75 ? "A" : (totalScore >= 60 ? "B" : "C"));
        int earnedXp = Math.max(30, totalScore * 2);
        int earnedCoins = Math.max(15, totalScore / 2);

        String badge = null;
        if (totalScore >= 95) {
            badge = "Tai Nghe Bản Xứ Xuất Sắc 🎖️";
        } else if (totalScore >= 80) {
            badge = "Giao Tiếp Tự Nhiên 🌟";
        }

        String feedback = totalScore >= 85
            ? "Tuyệt vời! Bạn phản xạ nghe hiểu chuẩn xác và ứng xử rất đúng mực theo văn hóa Nhật."
            : (totalScore >= 65
                ? "Khá tốt! Bạn đã nắm bắt được các thông tin chính, hãy tiếp tục rèn luyện để tăng độ nhạy bén."
                : "Cần chú ý nghe kỹ hơn các chi tiết về thời gian, số lượng và câu hỏi của người đối thoại.");

        log.info("Listening Session submitted: scenarioId={}, totalScore={}, rank={}", request.getScenarioId(), totalScore, rank);

        return SubmitResponse.builder()
            .scenarioId(request.getScenarioId())
            .totalScore(totalScore)
            .listeningAccuracyPercent(listeningAccuracy)
            .etiquetteScorePercent(avgEtiquette)
            .earnedXp(earnedXp)
            .earnedCoins(earnedCoins)
            .performanceRank(rank)
            .badgeUnlocked(badge)
            .feedbackMessage(feedback)
            .build();
    }
}
