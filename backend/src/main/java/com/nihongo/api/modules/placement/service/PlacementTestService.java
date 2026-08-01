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
        try {
            User currentUser = getCurrentUser();
            User.JlptLevel level = request.getLevel();

            // 1. Lấy tất cả câu hỏi của level này từ DB
            Map<Long, PlacementQuestion> questionMap = questionRepository
                    .findByLevelOrderByDisplayOrderAsc(level)
                    .stream()
                    .collect(Collectors.toMap(q -> q.getId(), q -> q, (existing, replacement) -> existing));

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

            // 4. Xác định level đề xuất & nhận xét chẩn đoán thông minh
            User.JlptLevel recommendedLevel = computeRecommendedLevel(level, scorePercent, sectionCounters);
            String overallFeedback = buildFeedback(level, scorePercent, recommendedLevel);
            String actionSuggestion = buildActionSuggestion(level, scorePercent, recommendedLevel);
            String diagnosticSummary = buildDiagnosticSummary(sectionCounters);
            String levelDropReason = buildLevelDropReason(level, scorePercent, recommendedLevel, sectionCounters);
            User.JlptLevel recommendedTestLevel = computeRecommendedTestLevel(level, recommendedLevel);

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

            log.info("✅ User [{}] hoàn thành Placement Test {} — Điểm: {}/{} ({}%) → Đề xuất: {}",
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
                    .diagnosticSummary(diagnosticSummary)
                    .levelDropReason(levelDropReason)
                    .recommendedTestLevel(recommendedTestLevel)
                    .sectionScores(sectionScores)
                    .questionReviews(reviews)
                    .completedAt(LocalDateTime.now())
                    .build();
        } catch (Exception e) {
            log.error("💥 LỖI SUBMIT PLACEMENT TEST: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi khi chấm bài Placement Test: " + e.getMessage(), e);
        }
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
    // PRIVATE HELPERS - SMART DIAGNOSIS ALGORITHM
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Thuật toán Chẩn đoán Đa chiều (Multi-Factor Diagnostic Placement Algorithm):
     * - >= 80%: Đạt chuẩn level.
     * - 65% - 79%: Giữ nguyên level nếu từ vựng/ngữ pháp vững (chỉ sai ít câu nâng cao).
     * - 40% - 64%: Lùi 1 bậc (Level - 1).
     * - 20% - 39%: Lùi 2 bậc (Level - 2, ví dụ N1 -> N3).
     * - < 20%: Hổng nặng gốc từ vựng/ngữ pháp (như 1/15 câu). Đề xuất học N4/N5.
     */
    private User.JlptLevel computeRecommendedLevel(User.JlptLevel tested, double scorePercent, Map<PlacementQuestion.Section, int[]> sectionCounters) {
        if (tested == null) return User.JlptLevel.N5;
        if (scorePercent >= 80.0) {
            return tested;
        } else if (scorePercent >= 65.0) {
            int[] vocab = sectionCounters != null ? sectionCounters.get(PlacementQuestion.Section.VOCAB) : null;
            int[] grammar = sectionCounters != null ? sectionCounters.get(PlacementQuestion.Section.GRAMMAR) : null;
            double vocabPct = (vocab != null && vocab.length > 1 && vocab[1] > 0) ? (double) vocab[0] / vocab[1] * 100 : 100;
            double grammarPct = (grammar != null && grammar.length > 1 && grammar[1] > 0) ? (double) grammar[0] / grammar[1] * 100 : 100;
            if (vocabPct >= 60.0 && grammarPct >= 60.0) {
                return tested;
            }
            return dropLevel(tested, 1);
        } else if (scorePercent >= 40.0) {
            return dropLevel(tested, 1);
        } else if (scorePercent >= 20.0) {
            return dropLevel(tested, 2);
        } else {
            return switch (tested) {
                case N1, N2, N3 -> User.JlptLevel.N4;
                default -> User.JlptLevel.N5;
            };
        }
    }

    private User.JlptLevel dropLevel(User.JlptLevel current, int steps) {
        if (current == null) return User.JlptLevel.N5;
        User.JlptLevel level = current;
        for (int i = 0; i < steps; i++) {
            level = switch (level) {
                case N1 -> User.JlptLevel.N2;
                case N2 -> User.JlptLevel.N3;
                case N3 -> User.JlptLevel.N4;
                case N4 -> User.JlptLevel.N5;
                case N5 -> User.JlptLevel.N5;
            };
        }
        return level;
    }

    private String buildDiagnosticSummary(Map<PlacementQuestion.Section, int[]> sectionCounters) {
        if (sectionCounters == null || sectionCounters.isEmpty()) {
            return "Kỹ năng làm bài tương đối đồng đều.";
        }
        List<String> weakSections = new ArrayList<>();

        sectionCounters.forEach((section, counts) -> {
            if (section != null && counts != null && counts.length > 1 && counts[1] > 0) {
                double pct = (double) counts[0] / counts[1] * 100;
                String name = switch (section) {
                    case VOCAB -> "Từ vựng & Kanji";
                    case GRAMMAR -> "Ngữ pháp";
                    case READING -> "Đọc hiểu";
                };
                if (pct < 50.0) {
                    weakSections.add(String.format("%s (%d/%d câu đúng)", name, counts[0], counts[1]));
                }
            }
        });

        if (weakSections.isEmpty()) {
            return "Kỹ năng làm bài tương đối đồng đều, nắm khá vững các phần thi.";
        }
        return "Cần tập trung củng cố: " + String.join(", ", weakSections) + ".";
    }

    private String buildLevelDropReason(User.JlptLevel tested, double scorePercent, User.JlptLevel recommended, Map<PlacementQuestion.Section, int[]> sectionCounters) {
        if (tested == null || recommended == null) return "";
        if (tested == User.JlptLevel.N5 && scorePercent < 40.0) {
            return String.format(
                    "Do kết quả bài test N5 của bạn chỉ đạt %.1f%%, hệ thống chẩn đoán bạn bị hổng nặng nền tảng tiếng Nhật nhập môn. Bạn nên học lại từ cơ bản (50 Bảng chữ cái Hiragana/Katakana, Số đếm, Thời gian & Câu chào hỏi) để xây lại gốc chắc chắn.",
                    scorePercent);
        }
        if (scorePercent < 20.0) {
            return String.format(
                    "Do kết quả bài test %s của bạn đạt dưới 20%% (chỉ đạt %.1f%%), hệ thống chẩn đoán bạn bị hổng nền tảng kiến thức nghiêm trọng (mắc lỗi ở cả những câu hỏi từ vựng & ngữ pháp căn bản). Vì vậy, hệ thống đề xuất bạn bắt đầu học từ trình độ %s thay vì lùi 1 bậc về %s để xây dựng lại gốc chắc chắn.",
                    tested.name(), scorePercent, recommended.name(), dropLevel(tested, 1).name());
        } else if (scorePercent < 40.0) {
            return String.format(
                    "Kết quả bài test %s đạt %.1f%% cho thấy bạn gặp nhiều khó khăn ở cả 3 phần thi. Hệ thống đề xuất lùi 2 cấp độ về trình độ %s để bù đắp hổng kiến thức.",
                    tested.name(), scorePercent, recommended.name());
        } else if (scorePercent < 65.0) {
            return String.format(
                    "Bạn đạt %.1f%% ở bài test %s. Mức điểm này cho thấy bạn có tiềm năng nhưng cần lùi 1 cấp độ về %s để luyện tập nhuần nhuyễn trước khi chinh phục %s.",
                    scorePercent, tested.name(), recommended.name(), tested.name());
        } else if (scorePercent < 80.0 && tested == recommended) {
            return String.format(
                    "Bạn đạt %.1f%% ở bài test %s và làm tốt phần kiến thức căn bản. Hệ thống đề xuất bạn học ngay trình độ %s nhưng hãy chú ý ôn luyện các câu đọc hiểu/ngữ pháp bị sai.",
                    scorePercent, tested.name(), tested.name());
        } else {
            return String.format(
                    "Bạn đạt kết quả xuất sắc %.1f%% ở bài test %s. Bạn hoàn toàn đủ năng lực chinh phục trình độ %s!",
                    scorePercent, tested.name(), recommended.name());
        }
    }

    private User.JlptLevel computeRecommendedTestLevel(User.JlptLevel tested, User.JlptLevel recommended) {
        if (recommended != tested) {
            return recommended;
        }
        return getHigherLevel(tested) != null ? getHigherLevel(tested) : tested;
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
        } else if (scorePercent >= 65.0) {
            return String.format(
                    "📚 Khá tốt! Bạn đạt %.1f%% ở trình độ %s. Bạn nắm phần lớn kiến thức căn bản. " +
                    "Chúng tôi đề xuất bạn tiếp tục nâng cao ở trình độ %s.",
                    scorePercent, levelName, recommended.name());
        } else if (scorePercent >= 40.0) {
            return String.format(
                    "💪 Cần củng cố thêm! Bạn đạt %.1f%% ở trình độ %s. " +
                    "Hệ thống đề xuất bạn học ở trình độ %s để luyện tập kỹ càng trước khi nâng bậc.",
                    scorePercent, levelName, recommended.name());
        } else {
            return String.format(
                    "⚠️ Hổng nền tảng! Bạn đạt %.1f%% ở bài test %s. " +
                    "Nền tảng kiến thức cấp độ này chưa đạt yêu cầu. " +
                    "Hệ thống đề xuất bạn xây dựng lại nền tảng từ trình độ %s nhé!",
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
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Phiên đăng nhập không hợp lệ hoặc đã hết hạn.");
        }

        Object principal = auth.getPrincipal();
        if (principal instanceof Long userId) {
            return userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + userId));
        } else if (principal instanceof Number number) {
            return userRepository.findById(number.longValue())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + number.longValue()));
        }

        String identifier = auth.getName();
        try {
            Long userId = Long.parseLong(identifier);
            return userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + userId));
        } catch (NumberFormatException e) {
            return userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + identifier));
        }
    }
}
