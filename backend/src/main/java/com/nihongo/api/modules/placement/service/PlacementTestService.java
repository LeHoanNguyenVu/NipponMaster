package com.nihongo.api.modules.placement.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.placement.dto.OnboardingRequest;
import com.nihongo.api.modules.placement.dto.PlacementResultResponse;
import com.nihongo.api.modules.placement.dto.PlacementSubmitRequest;
import com.nihongo.api.modules.placement.dto.PlacementTestResponse;
import com.nihongo.api.modules.placement.entity.PlacementQuestion;
import com.nihongo.api.modules.placement.entity.PlacementResult;
import com.nihongo.api.modules.placement.repository.PlacementQuestionRepository;
import com.nihongo.api.modules.placement.repository.PlacementResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlacementTestService {

    private final PlacementQuestionRepository questionRepository;
    private final PlacementResultRepository resultRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    /**
     * Thời gian làm bài (phút) theo từng cấp độ JLPT.
     */
    private static final Map<User.JlptLevel, Integer> TIME_LIMIT_MAP = Map.of(
            User.JlptLevel.N5, 15,
            User.JlptLevel.N4, 20,
            User.JlptLevel.N3, 25,
            User.JlptLevel.N2, 30,
            User.JlptLevel.N1, 30
    );

    // ─────────────────────────────────────────────────────────────────────────
    // GET QUESTIONS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Lấy bộ câu hỏi Placement Test theo cấp độ, kèm thời gian làm bài.
     * Đáp án đúng KHÔNG được trả về phía client.
     */
    public PlacementTestResponse getQuestions(User.JlptLevel level) {
        List<PlacementQuestion> questions = questionRepository.findByLevelOrderByDisplayOrderAsc(level);

        List<PlacementTestResponse.QuestionDto> questionDtos = questions.stream()
                .map(q -> {
                    List<String> options = parseOptions(q.getOptionsJson());
                    return PlacementTestResponse.QuestionDto.builder()
                            .id(q.getId())
                            .section(q.getSection())
                            .questionText(q.getQuestionText())
                            .options(options)
                            .displayOrder(q.getDisplayOrder())
                            .build();
                })
                .collect(Collectors.toList());

        return PlacementTestResponse.builder()
                .level(level)
                .timeLimitMinutes(TIME_LIMIT_MAP.getOrDefault(level, 20))
                .totalQuestions(questionDtos.size())
                .questions(questionDtos)
                .build();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT & GRADE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Chấm điểm bài thi, tính đề xuất level và lưu kết quả vào DB.
     */
    @Transactional
    public PlacementResultResponse submitTest(PlacementSubmitRequest request) {
        User currentUser = getCurrentUser();
        User.JlptLevel level = request.getLevel();

        // 1. Lấy tất cả câu hỏi của level này từ DB
        Map<Long, PlacementQuestion> questionMap = questionRepository
                .findByLevelOrderByDisplayOrderAsc(level)
                .stream()
                .collect(Collectors.toMap(q -> q.getId(), q -> q));

        // 2. Chấm điểm từng câu
        int totalQuestions = questionMap.size();
        int totalCorrect = 0;
        Map<PlacementQuestion.Section, int[]> sectionCounters = new HashMap<>();

        List<PlacementResultResponse.QuestionReviewDto> reviews = new ArrayList<>();

        for (PlacementSubmitRequest.AnswerItem answer : request.getAnswers()) {
            PlacementQuestion question = questionMap.get(answer.getQuestionId());
            if (question == null) continue;

            boolean isCorrect = answer.getChosenOption() != null
                    && answer.getChosenOption().equals(question.getCorrectOption());
            if (isCorrect) totalCorrect++;

            // Cập nhật điểm từng section
            sectionCounters.computeIfAbsent(question.getSection(), k -> new int[]{0, 0});
            sectionCounters.get(question.getSection())[1]++; // total
            if (isCorrect) sectionCounters.get(question.getSection())[0]++; // correct

            // Build review DTO
            reviews.add(PlacementResultResponse.QuestionReviewDto.builder()
                    .questionId(question.getId())
                    .section(question.getSection())
                    .questionText(question.getQuestionText())
                    .options(parseOptions(question.getOptionsJson()))
                    .chosenOption(answer.getChosenOption() != null ? answer.getChosenOption() : -1)
                    .correctOption(question.getCorrectOption())
                    .isCorrect(isCorrect)
                    .explanation(question.getExplanation())
                    .build());
        }

        // 3. Tính % điểm
        double scorePercent = totalQuestions > 0
                ? Math.round((double) totalCorrect / totalQuestions * 1000.0) / 10.0
                : 0.0;

        // 4. Xác định level đề xuất & nhận xét
        User.JlptLevel recommendedLevel = computeRecommendedLevel(level, scorePercent);
        String overallFeedback = buildFeedback(level, scorePercent, recommendedLevel);
        String actionSuggestion = buildActionSuggestion(level, scorePercent, recommendedLevel);

        // 5. Build section scores map
        Map<PlacementQuestion.Section, PlacementResultResponse.SectionScore> sectionScores = new HashMap<>();
        sectionCounters.forEach((section, counts) -> {
            double pct = counts[1] > 0 ? Math.round((double) counts[0] / counts[1] * 1000.0) / 10.0 : 0.0;
            sectionScores.put(section, PlacementResultResponse.SectionScore.builder()
                    .correct(counts[0])
                    .total(counts[1])
                    .percent(pct)
                    .build());
        });

        // 6. Lưu kết quả vào DB
        PlacementResult savedResult = resultRepository.save(PlacementResult.builder()
                .user(currentUser)
                .targetLevel(level)
                .score(totalCorrect)
                .totalQuestions(totalQuestions)
                .scorePercent(scorePercent)
                .recommendedLevel(recommendedLevel)
                .overallFeedback(overallFeedback)
                .sectionScoresJson(toJson(sectionCounters))
                .answersJson(toJson(request.getAnswers()))
                .build());

        log.info("✅ User [{}] hoàn thành Placement Test {} — Điểm: {}/{}({:.1f}%) → Đề xuất: {}",
                currentUser.getEmail(), level, totalCorrect, totalQuestions, scorePercent, recommendedLevel);

        return PlacementResultResponse.builder()
                .resultId(savedResult.getId())
                .targetLevel(level)
                .score(totalCorrect)
                .totalQuestions(totalQuestions)
                .scorePercent(scorePercent)
                .recommendedLevel(recommendedLevel)
                .overallFeedback(overallFeedback)
                .actionSuggestion(actionSuggestion)
                .sectionScores(sectionScores)
                .questionReviews(reviews)
                .completedAt(LocalDateTime.now())
                .build();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ONBOARDING: Chốt level
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Cập nhật targetLevel và đánh dấu onboardingCompleted = true cho user hiện tại.
     */
    @Transactional
    public void completeOnboarding(OnboardingRequest request) {
        User currentUser = getCurrentUser();
        currentUser.setTargetLevel(request.getTargetLevel());
        currentUser.setOnboardingCompleted(true);
        // Đồng thời nâng role lên STUDENT nếu đang là GUEST
        if (currentUser.getRole() == User.Role.GUEST) {
            currentUser.setRole(User.Role.STUDENT);
        }
        userRepository.save(currentUser);
        log.info("✅ User [{}] hoàn tất Onboarding → Level: {} | Role: STUDENT",
                currentUser.getEmail(), request.getTargetLevel());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HISTORY
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Lấy danh sách lịch sử các bài test của user hiện tại.
     */
    public List<PlacementResult> getHistory() {
        User currentUser = getCurrentUser();
        return resultRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Tính level đề xuất theo quy tắc:
     * - < 50%: lùi 1 bậc (N5 thì giữ N5)
     * - 50-80%: giữ nguyên level vừa test
     * - > 80%: giữ nguyên (cân nhắc tăng level — do client quyết định)
     */
    private User.JlptLevel computeRecommendedLevel(User.JlptLevel tested, double scorePercent) {
        if (scorePercent < 50.0) {
            // Lùi 1 bậc: N5<N4<N3<N2<N1 (N5 là thấp nhất, không lùi thêm)
            return switch (tested) {
                case N4 -> User.JlptLevel.N5;
                case N3 -> User.JlptLevel.N4;
                case N2 -> User.JlptLevel.N3;
                case N1 -> User.JlptLevel.N2;
                default -> User.JlptLevel.N5; // N5 đã thấp nhất
            };
        } else {
            // 50% trở lên: giữ nguyên level vừa test
            return tested;
        }
    }

    /**
     * Sinh nhận xét đánh giá tổng quan bằng tiếng Việt.
     */
    private String buildFeedback(User.JlptLevel tested, double scorePercent, User.JlptLevel recommended) {
        String levelName = tested.name();
        if (scorePercent >= 80.0) {
            return String.format(
                    "🎉 Xuất sắc! Bạn đạt %.1f%% ở trình độ %s. Bạn đã nắm vững hầu hết kiến thức cấp độ này. " +
                    "Bạn hoàn toàn có thể học và thi %s hoặc thử thách bản thân ở trình độ cao hơn!",
                    scorePercent, levelName, levelName);
        } else if (scorePercent >= 50.0) {
            return String.format(
                    "📚 Khá tốt! Bạn đạt %.1f%% ở trình độ %s. Bạn đã nắm được phần lớn kiến thức, " +
                    "nhưng vẫn còn một số điểm cần củng cố thêm. Chúng tôi đề xuất bạn học ở trình độ %s.",
                    scorePercent, levelName, recommended.name());
        } else {
            return String.format(
                    "💪 Cần cố gắng thêm! Bạn đạt %.1f%% ở trình độ %s. " +
                    "Nền tảng kiến thức cấp độ này chưa thật sự vững chắc. " +
                    "Chúng tôi đề xuất bạn bắt đầu từ trình độ %s để xây dựng nền tảng tốt hơn nhé!",
                    scorePercent, levelName, recommended.name());
        }
    }

    /**
     * Sinh đề xuất hành động ngắn gọn.
     */
    private String buildActionSuggestion(User.JlptLevel tested, double scorePercent, User.JlptLevel recommended) {
        if (scorePercent >= 80.0) {
            User.JlptLevel higher = getHigherLevel(tested);
            if (higher != null) {
                return String.format("Đăng ký học %s ngay hoặc thử sức làm bài test %s!", tested.name(), higher.name());
            }
            return "Chúc mừng! Bạn đã đạt trình độ N1 — đỉnh cao của JLPT!";
        } else if (scorePercent >= 50.0) {
            return String.format("Đăng ký học %s để ôn luyện và củng cố kiến thức!", recommended.name());
        } else {
            return String.format("Học trình độ %s trước để có nền tảng vững chắc hơn nhé!", recommended.name());
        }
    }

    private User.JlptLevel getHigherLevel(User.JlptLevel current) {
        return switch (current) {
            case N5 -> User.JlptLevel.N4;
            case N4 -> User.JlptLevel.N3;
            case N3 -> User.JlptLevel.N2;
            case N2 -> User.JlptLevel.N1;
            default -> null;
        };
    }

    private List<String> parseOptions(String optionsJson) {
        try {
            return objectMapper.readValue(optionsJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            log.warn("Không parse được optionsJson: {}", optionsJson);
            return List.of();
        }
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + email));
    }
}
