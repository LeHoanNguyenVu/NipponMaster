package com.nihongo.api.modules.grammar.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.common.storage.StorageService;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.grammar.dto.*;
import com.nihongo.api.modules.grammar.entity.*;
import com.nihongo.api.modules.grammar.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GrammarLessonServiceImpl implements GrammarLessonService {

    private final GrammarLevelRepository levelRepository;
    private final GrammarLessonRepository lessonRepository;
    private final GrammarTimestampRepository timestampRepository;
    private final GrammarCheatsheetRepository cheatsheetRepository;
    private final GrammarQuizRepository quizRepository;
    private final GrammarDiscussionRepository discussionRepository;
    private final UserGrammarProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional(readOnly = true)
    public List<GrammarLevelDto> getLevels(Long userId) {
        List<GrammarLevel> levels = levelRepository.findAll();
        // Sắp xếp thứ tự chuẩn N5, N4, N3, N2, N1
        List<String> order = List.of("N5", "N4", "N3", "N2", "N1");
        levels.sort(Comparator.comparingInt(l -> {
            int idx = order.indexOf(l.getLevelCode());
            return idx != -1 ? idx : 99;
        }));

        return levels.stream().map(level -> {
            int unlockedCount = 1; // Bài 1 luôn mở mặc định
            int passedCount = 0;

            if (userId != null) {
                List<UserGrammarProgress> progresses = progressRepository.findByUserIdAndLesson_Level_LevelCode(userId, level.getLevelCode());
                unlockedCount = (int) progresses.stream().filter(UserGrammarProgress::getIsUnlocked).count();
                if (unlockedCount == 0) unlockedCount = 1;
                passedCount = (int) progresses.stream().filter(UserGrammarProgress::getIsPassed).count();
            }

            return GrammarLevelDto.builder()
                    .levelCode(level.getLevelCode())
                    .curriculumName(level.getCurriculumName())
                    .totalLessons(level.getTotalLessons())
                    .description(level.getDescription())
                    .unlockedCount(unlockedCount)
                    .passedCount(passedCount)
                    .build();
        }).collect(Collectors.toList());
    }

    private int getLevelRank(String levelCode) {
        if (levelCode == null) return 1;
        switch (levelCode.trim().toUpperCase()) {
            case "N1": return 5;
            case "N2": return 4;
            case "N3": return 3;
            case "N4": return 2;
            case "N5":
            case "STARTER":
            default: return 1;
        }
    }

    private boolean canAccessLevel(String targetLevel, Long userId) {
        if (userId == null) {
            return "N5".equalsIgnoreCase(targetLevel) || "STARTER".equalsIgnoreCase(targetLevel);
        }
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return "N5".equalsIgnoreCase(targetLevel);
        }
        if (user.getRole() == User.Role.ADMIN || user.getRole() == User.Role.TEACHER) {
            return true;
        }
        String userLevelStr = user.getJlptLevel() != null ? user.getJlptLevel().name() : (user.getTargetLevel() != null ? user.getTargetLevel().name() : "N5");
        int userRank = getLevelRank(userLevelStr);
        int targetRank = getLevelRank(targetLevel);
        return userRank >= targetRank;
    }

    private boolean isTeacherOrAdmin(Long userId) {
        if (userId == null) return false;
        return userRepository.findById(userId)
                .map(u -> u.getRole() == User.Role.ADMIN || u.getRole() == User.Role.TEACHER)
                .orElse(false);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrammarLessonSummaryDto> getLessonsByLevel(String levelCode, Long userId) {
        if (!canAccessLevel(levelCode, userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Tài khoản của bạn không có quyền truy cập giáo trình " + levelCode + ". Cần cấp độ " + levelCode + " trở lên!");
        }

        List<GrammarLesson> lessons = lessonRepository.findByLevel_LevelCodeAndIsActiveTrueOrderBySortOrderAsc(levelCode);

        Map<Long, UserGrammarProgress> progressMap = new HashMap<>();
        if (userId != null) {
            List<UserGrammarProgress> progresses = progressRepository.findByUserIdAndLesson_Level_LevelCode(userId, levelCode);
            for (UserGrammarProgress p : progresses) {
                if (p.getLesson() != null) {
                    progressMap.put(p.getLesson().getId(), p);
                }
            }
        }

        boolean isStaff = isTeacherOrAdmin(userId);
        boolean prevLessonPassed = false;
        List<GrammarLessonSummaryDto> result = new ArrayList<>();

        for (int i = 0; i < lessons.size(); i++) {
            GrammarLesson lesson = lessons.get(i);
            UserGrammarProgress prog = progressMap.get(lesson.getId());
            boolean isPassed = prog != null && Boolean.TRUE.equals(prog.getIsPassed());
            int highestScore = prog != null && prog.getHighestScore() != null ? prog.getHighestScore() : 0;
            int starsEarned = prog != null && prog.getStarsEarned() != null ? prog.getStarsEarned() : 0;
            int lastWatchSec = prog != null && prog.getLastWatchSec() != null ? prog.getLastWatchSec() : 0;
            String lastWatchTimeStr = prog != null && prog.getLastWatchTimeStr() != null ? prog.getLastWatchTimeStr() : "0:00";

            // Bài 1 luôn mở cho tất cả học viên.
            // Giáo viên/Admin luôn mở toàn bộ.
            // Học viên mở khóa khi bài liền trước đã thi đạt (>= 85%) hoặc đã được mở trong DB.
            boolean isUnlocked = isStaff || (lesson.getSortOrder() <= 1) ||
                    (prog != null && Boolean.TRUE.equals(prog.getIsUnlocked())) ||
                    prevLessonPassed;

            prevLessonPassed = isPassed;

            result.add(GrammarLessonSummaryDto.builder()
                    .id(lesson.getId())
                    .levelCode(lesson.getLevel().getLevelCode())
                    .lessonNumber(lesson.getLessonNumber())
                    .partNumber(lesson.getPartNumber())
                    .sortOrder(lesson.getSortOrder())
                    .titleVi(lesson.getTitleVi())
                    .titleJa(lesson.getTitleJa())
                    .videoId(lesson.getVideoId())
                    .durationStr(lesson.getDurationStr())
                    .durationSec(lesson.getDurationSec())
                    .isUnlocked(isUnlocked)
                    .isPassed(isPassed)
                    .highestScore(highestScore)
                    .starsEarned(starsEarned)
                    .lastWatchSec(lastWatchSec)
                    .lastWatchTimeStr(lastWatchTimeStr)
                    .build());
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public GrammarLessonDetailDto getLessonDetail(Long lessonId, Long userId) {
        GrammarLesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học ngữ pháp ID: " + lessonId));

        if (!canAccessLevel(lesson.getLevel().getLevelCode(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Tài khoản của bạn không có quyền truy cập bài học thuộc giáo trình " + lesson.getLevel().getLevelCode());
        }

        boolean isStaff = isTeacherOrAdmin(userId);
        boolean isUnlocked = isStaff || (lesson.getSortOrder() <= 1);
        boolean isPassed = false;
        int highestScore = 0;
        int starsEarned = 0;
        int lastWatchSec = 0;
        String lastWatchTimeStr = "0:00";

        if (userId != null) {
            Optional<UserGrammarProgress> progOpt = progressRepository.findByUserIdAndLesson_Id(userId, lessonId);
            if (progOpt.isPresent()) {
                UserGrammarProgress prog = progOpt.get();
                isUnlocked = isUnlocked || Boolean.TRUE.equals(prog.getIsUnlocked());
                isPassed = Boolean.TRUE.equals(prog.getIsPassed());
                highestScore = prog.getHighestScore() != null ? prog.getHighestScore() : 0;
                starsEarned = prog.getStarsEarned() != null ? prog.getStarsEarned() : 0;
                lastWatchSec = prog.getLastWatchSec() != null ? prog.getLastWatchSec() : 0;
                lastWatchTimeStr = prog.getLastWatchTimeStr() != null ? prog.getLastWatchTimeStr() : "0:00";
            } else if (!isUnlocked) {
                Optional<GrammarLesson> prevOpt = lessonRepository.findPrevLesson(lesson.getLevel().getLevelCode(), lesson.getSortOrder());
                if (prevOpt.isPresent()) {
                    Optional<UserGrammarProgress> prevProg = progressRepository.findByUserIdAndLesson_Id(userId, prevOpt.get().getId());
                    if (prevProg.isPresent() && Boolean.TRUE.equals(prevProg.get().getIsPassed())) {
                        isUnlocked = true;
                    }
                }
            }
        }

        // 1. Timestamps
        List<GrammarTimestamp> timestamps = timestampRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        List<GrammarLessonDetailDto.TimestampItemDto> timestampDtos = timestamps.stream().map(t ->
                GrammarLessonDetailDto.TimestampItemDto.builder()
                        .id(t.getId())
                        .timeSec(t.getTimeSec())
                        .timeStr(t.getTimeStr())
                        .pattern(t.getPattern())
                        .title(t.getTitle())
                        .summary(t.getSummary())
                        .sortOrder(t.getSortOrder())
                        .build()
        ).collect(Collectors.toList());

        // 2. Cheatsheets
        List<GrammarCheatsheet> cheatsheets = cheatsheetRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        List<GrammarLessonDetailDto.CheatsheetItemDto> cheatsheetDtos = cheatsheets.stream().map(c ->
                GrammarLessonDetailDto.CheatsheetItemDto.builder()
                        .id(c.getId())
                        .pattern(c.getPattern())
                        .badge(c.getBadge())
                        .meaning(c.getMeaning())
                        .structure(c.getStructure())
                        .nuance(c.getNuance())
                        .examples(parseJsonSafely(c.getExamplesJson()))
                        .sortOrder(c.getSortOrder())
                        .build()
        ).collect(Collectors.toList());

        // 3. Quizzes
        List<GrammarQuiz> quizzes = quizRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        List<GrammarLessonDetailDto.QuizItemDto> quizDtos = quizzes.stream().map(q ->
                GrammarLessonDetailDto.QuizItemDto.builder()
                        .id(q.getId())
                        .quizType(q.getQuizType())
                        .prompt(q.getPrompt())
                        .leftSentence(q.getLeftSentence())
                        .rightSentence(q.getRightSentence())
                        .starIndex(q.getStarIndex())
                        .fragments(parseJsonSafely(q.getFragmentsJson()))
                        .options(parseJsonSafely(q.getOptionsJson()))
                        .correctAnswer(q.getCorrectAnswer())
                        .explanation(q.getExplanation())
                        .sortOrder(q.getSortOrder())
                        .build()
        ).collect(Collectors.toList());

        return GrammarLessonDetailDto.builder()
                .id(lesson.getId())
                .levelCode(lesson.getLevel().getLevelCode())
                .lessonNumber(lesson.getLessonNumber())
                .partNumber(lesson.getPartNumber())
                .sortOrder(lesson.getSortOrder())
                .titleVi(lesson.getTitleVi())
                .titleJa(lesson.getTitleJa())
                .videoId(lesson.getVideoId())
                .durationStr(lesson.getDurationStr())
                .durationSec(lesson.getDurationSec())
                .isUnlocked(isUnlocked)
                .isPassed(isPassed)
                .highestScore(highestScore)
                .starsEarned(starsEarned)
                .lastWatchSec(lastWatchSec)
                .lastWatchTimeStr(lastWatchTimeStr)
                .timestamps(timestampDtos)
                .cheatsheets(cheatsheetDtos)
                .quizzes(quizDtos)
                .build();
    }

    @Override
    @Transactional
    public GrammarQuizSubmitDto.Response submitQuiz(Long lessonId, Long userId, GrammarQuizSubmitDto.Request request) {
        GrammarLesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học ngữ pháp ID: " + lessonId));

        List<GrammarQuiz> quizzes = quizRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        int totalQuestions = quizzes.size();
        if (totalQuestions == 0) {
            return GrammarQuizSubmitDto.Response.builder()
                    .score(100)
                    .passed(true)
                    .totalQuestions(0)
                    .correctCount(0)
                    .starsEarned(3)
                    .unlockedNextLesson(false)
                    .build();
        }

        Map<Long, String> userAnswers = request != null && request.getAnswers() != null ? request.getAnswers() : Collections.emptyMap();
        int correctCount = 0;
        for (GrammarQuiz quiz : quizzes) {
            String ans = userAnswers.get(quiz.getId());
            if (ans != null && ans.trim().equalsIgnoreCase(quiz.getCorrectAnswer().trim())) {
                correctCount++;
            }
        }

        int score = (int) Math.round(((double) correctCount / totalQuestions) * 100);
        boolean passed = score >= 85;

        int starsEarned = 0;
        if (score == 100) starsEarned = 3;
        else if (score >= 90) starsEarned = 2;
        else if (score >= 85) starsEarned = 1;

        Long nextLessonId = null;
        boolean unlockedNext = false;

        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng ID: " + userId));

            UserGrammarProgress progress = progressRepository.findByUserIdAndLesson_Id(userId, lessonId)
                    .orElseGet(() -> UserGrammarProgress.builder()
                            .user(user)
                            .lesson(lesson)
                            .isUnlocked(true)
                            .isPassed(false)
                            .highestScore(0)
                            .starsEarned(0)
                            .build());

            progress.setIsUnlocked(true);
            if (passed) {
                progress.setIsPassed(true);
            }
            progress.setHighestScore(Math.max(progress.getHighestScore(), score));
            progress.setStarsEarned(Math.max(progress.getStarsEarned(), starsEarned));
            progress.setLastStudiedAt(OffsetDateTime.now());
            progressRepository.save(progress);

            // Mở khóa bài tiếp theo nếu đạt >= 85%
            if (passed) {
                Optional<GrammarLesson> nextLessonOpt = lessonRepository.findNextLesson(lesson.getLevel().getLevelCode(), lesson.getSortOrder());
                if (nextLessonOpt.isPresent()) {
                    GrammarLesson nextLesson = nextLessonOpt.get();
                    nextLessonId = nextLesson.getId();

                    UserGrammarProgress nextProg = progressRepository.findByUserIdAndLesson_Id(userId, nextLesson.getId())
                            .orElseGet(() -> UserGrammarProgress.builder()
                                    .user(user)
                                    .lesson(nextLesson)
                                    .isUnlocked(true)
                                    .isPassed(false)
                                    .highestScore(0)
                                    .starsEarned(0)
                                    .build());
                    nextProg.setIsUnlocked(true);
                    progressRepository.save(nextProg);
                    unlockedNext = true;
                }
            }
        }

        return GrammarQuizSubmitDto.Response.builder()
                .score(score)
                .passed(passed)
                .totalQuestions(totalQuestions)
                .correctCount(correctCount)
                .starsEarned(starsEarned)
                .nextLessonId(nextLessonId)
                .unlockedNextLesson(unlockedNext)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrammarDiscussionDto> getDiscussions(Long lessonId) {
        // Tối ưu hóa: Lấy toàn bộ thảo luận & câu trả lời trong 1 truy vấn duy nhất (giảm 50% độ trễ DB)
        List<GrammarDiscussion> all = discussionRepository.findAllByLessonIdWithUser(lessonId);
        if (all.isEmpty()) {
            return Collections.emptyList();
        }

        List<GrammarDiscussion> mains = new ArrayList<>();
        Map<Long, List<GrammarDiscussion>> replyMap = new HashMap<>();

        for (GrammarDiscussion d : all) {
            if (d.getReplyToId() == null) {
                mains.add(d);
            } else {
                replyMap.computeIfAbsent(d.getReplyToId(), k -> new ArrayList<>()).add(d);
            }
        }

        // Câu hỏi chính mới nhất lên đầu
        mains.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));

        return mains.stream().map(m -> {
            List<GrammarDiscussion> subList = replyMap.getOrDefault(m.getId(), Collections.emptyList());
            List<GrammarDiscussionDto> subDtos = subList.stream()
                    .map(this::mapToDiscussionDto)
                    .collect(Collectors.toList());

            GrammarDiscussionDto dto = mapToDiscussionDto(m);
            dto.setReplies(subDtos);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GrammarDiscussionDto createDiscussion(Long lessonId, Long userId, GrammarDiscussionDto.CreateRequest request) {
        if (request == null || request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Nội dung thảo luận không được để trống");
        }

        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }
        if (user == null) {
            // Lấy user đầu tiên hoặc fallback
            user = userRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản người dùng"));
        }

        boolean isSensei = user.getRole() == User.Role.TEACHER || user.getRole() == User.Role.ADMIN;

        GrammarDiscussion discussion = GrammarDiscussion.builder()
                .lessonId(lessonId)
                .user(user)
                .content(request.getContent().trim())
                .imageUrl(request.getImageUrl())
                .videoUrl(request.getVideoUrl())
                .replyToId(request.getReplyToId())
                .isSensei(isSensei)
                .helpfulCount(0)
                .createdAt(OffsetDateTime.now())
                .build();

        GrammarDiscussion saved = discussionRepository.save(discussion);
        GrammarDiscussionDto dto = mapToDiscussionDto(saved);
        dto.setReplies(new ArrayList<>());
        return dto;
    }

    @Override
    @Transactional
    public void toggleHelpful(Long discussionId) {
        GrammarDiscussion disc = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thảo luận ID: " + discussionId));
        disc.setHelpfulCount(disc.getHelpfulCount() + 1);
        discussionRepository.save(disc);
    }

    @Override
    @Transactional
    public void updateWatchProgress(Long lessonId, Long userId, GrammarWatchProgressDto.Request request) {
        if (userId == null || request == null) return;

        GrammarLesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học ngữ pháp ID: " + lessonId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng ID: " + userId));

        UserGrammarProgress progress = progressRepository.findByUserIdAndLesson_Id(userId, lessonId)
                .orElseGet(() -> UserGrammarProgress.builder()
                        .user(user)
                        .lesson(lesson)
                        .isUnlocked(true)
                        .isPassed(false)
                        .highestScore(0)
                        .starsEarned(0)
                        .build());

        if (request.getTimeSec() != null && request.getTimeSec() >= 0) {
            progress.setLastWatchSec(request.getTimeSec());
        }
        if (request.getTimeStr() != null && !request.getTimeStr().isBlank()) {
            progress.setLastWatchTimeStr(request.getTimeStr().trim());
        }
        progress.setLastStudiedAt(OffsetDateTime.now());
        progressRepository.save(progress);
    }

    @Override
    @Transactional
    public void deleteDiscussion(Long discussionId, Long userId) {
        GrammarDiscussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thảo luận ID: " + discussionId));

        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            boolean isOwner = user != null && discussion.getUser() != null && discussion.getUser().getId().equals(user.getId());
            boolean isTeacherOrAdmin = user != null && (user.getRole() == User.Role.TEACHER || user.getRole() == User.Role.ADMIN);

            if (!isOwner && !isTeacherOrAdmin) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền xóa bình luận này");
            }
        }

        // Xóa comment. Ràng buộc FOREIGN KEY ON DELETE CASCADE trong PostgreSQL sẽ tự động xóa sạch các câu trả lời con
        discussionRepository.delete(discussion);
    }

    @Override
    public String uploadDiscussionMedia(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File tải lên không được để trống");
        }
        String originalFilename = file.getOriginalFilename();
        String ext = "jpg";
        if (originalFilename != null && originalFilename.contains(".")) {
            ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }
        String safeName = UUID.randomUUID().toString() + "." + ext;
        String path = "grammar-discussions/" + safeName;
        try {
            return storageService.uploadPublicFile("kanji-assets", path, file);
        } catch (Exception e) {
            log.error("Lỗi upload media thảo luận lên Supabase Storage: {}", e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Không thể tải file lên Cloud Storage: " + e.getMessage());
        }
    }

    private GrammarDiscussionDto mapToDiscussionDto(GrammarDiscussion d) {
        User u = d.getUser();
        String name = u != null ? u.getFullName() : "Học viên ẩn danh";
        String roleStr = (d.getIsSensei() || (u != null && (u.getRole() == User.Role.TEACHER || u.getRole() == User.Role.ADMIN))) ? "teacher" : "student";
        String letter = name.length() > 0 ? name.substring(0, 1).toUpperCase() : "U";

        // Cấp độ JLPT hiện tại của tác giả (N5..N1)
        String levelStr = "N5";
        if (u != null) {
            if (u.getJlptLevel() != null && u.getJlptLevel() != User.JlptLevel.STARTER) {
                levelStr = u.getJlptLevel().name();
            } else if (u.getTargetLevel() != null && u.getTargetLevel() != User.JlptLevel.STARTER) {
                levelStr = u.getTargetLevel().name();
            } else if (u.getJlptLevel() != null) {
                levelStr = u.getJlptLevel().name();
            }
        }

        // Màu avatar tương tự UI Facebook
        String[] colors = {"bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600", "bg-rose-600"};
        int hash = Math.abs(name.hashCode());
        String bg = colors[hash % colors.length];

        return GrammarDiscussionDto.builder()
                .id(d.getId())
                .authorId(u != null ? u.getId() : null)
                .authorName(name)
                .authorLevel(levelStr)
                .role(roleStr)
                .isSensei(d.getIsSensei())
                .avatarBg(bg)
                .avatarLetter(letter)
                .timeAgo(formatTimeAgo(d.getCreatedAt()))
                .createdAt(d.getCreatedAt())
                .content(d.getContent())
                .imageUrl(d.getImageUrl())
                .videoUrl(d.getVideoUrl())
                .helpfulCount(d.getHelpfulCount())
                .replies(new ArrayList<>())
                .build();
    }

    private String formatTimeAgo(OffsetDateTime time) {
        if (time == null) return "Vừa xong";
        Duration d = Duration.between(time, OffsetDateTime.now());
        long seconds = d.getSeconds();
        if (seconds < 60) return "Vừa xong";
        long minutes = seconds / 60;
        if (minutes < 60) return minutes + " phút trước";
        long hours = minutes / 60;
        if (hours < 24) return hours + " giờ trước";
        long days = hours / 24;
        return days + " ngày trước";
    }

    private Object parseJsonSafely(String json) {
        if (json == null || json.trim().isEmpty()) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            log.warn("Lỗi parse JSON: {}", e.getMessage());
            return Collections.emptyList();
        }
    }
}

