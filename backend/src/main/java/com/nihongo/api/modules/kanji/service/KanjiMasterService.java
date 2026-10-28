package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.kanji.dto.*;
import com.nihongo.api.modules.kanji.entity.*;
import com.nihongo.api.modules.kanji.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KanjiMasterService {

    private final KanjiChapterRepository chapterRepository;
    private final KanjiRepository kanjiRepository;
    private final KanjiChapterVocabRepository vocabRepository;
    private final KanjiExerciseRepository exerciseRepository;
    private final KanjiMinigameRepository minigameRepository;
    private final UserKanjiProgressRepository progressRepository;
    private final KanjiAchievementTestRepository achievementTestRepository;
    private final UserRepository userRepository;

    /**
     * Lấy thứ hạng cấp độ JLPT để so sánh (STARTER: 0, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5).
     */
    private int getLevelRank(String levelStr) {
        if (levelStr == null || levelStr.isBlank()) return 0;
        return switch (levelStr.trim().toUpperCase()) {
            case "STARTER" -> 0;
            case "N5" -> 1;
            case "N4" -> 2;
            case "N3" -> 3;
            case "N2" -> 4;
            case "N1" -> 5;
            default -> 0;
        };
    }

    /**
     * Lấy lộ trình các chương Kanji cùng tiến độ và trạng thái khóa của học viên.
     */
    @Transactional(readOnly = true)
    public KanjiRoadmapResponseDto getRoadmap(Long userId, String level) {
        String targetLevel = (level != null && !level.isBlank()) ? level.toUpperCase() : "N5";
        List<KanjiChapter> chapters = chapterRepository.findByJlptLevelOrderByDisplayOrderAsc(targetLevel);

        Map<Long, UserKanjiProgress> progressMap = new HashMap<>();
        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
            List<UserKanjiProgress> progressList = progressRepository.findByUserId(userId);
            for (UserKanjiProgress p : progressList) {
                progressMap.put(p.getChapterId(), p);
            }
        }

        // Xác định cấp độ hiện tại của học viên
        int userRank = 0;
        if (user != null) {
            String uLevel = user.getJlptLevel() != null ? user.getJlptLevel().name() : null;
            if (uLevel == null && user.getTargetLevel() != null) {
                uLevel = user.getTargetLevel().name();
            }
            userRank = getLevelRank(uLevel);
        }
        int targetRank = getLevelRank(targetLevel);

        // Quy tắc mở khóa cấp tiến: Nếu học viên đang ở trình độ cao hơn (VD: User N4 xem N5),
        // thì toàn bộ các chương của cấp độ thấp hơn này đều tự động mở khóa để học viên thoải mái ôn tập.
        boolean isAllChaptersUnlocked = userRank > targetRank;

        int completedChapters = 0;
        int learnedKanji = 0;
        int totalKanji = 0;

        List<KanjiRoadmapChapterDto> chapterDtos = new ArrayList<>();
        for (KanjiChapter ch : chapters) {
            totalKanji += ch.getKanjiCount();
            UserKanjiProgress prog = progressMap.get(ch.getId());

            boolean isUnlocked = isAllChaptersUnlocked
                    || (ch.getChapterNumber() == 1)
                    || (prog != null && Boolean.TRUE.equals(prog.getIsUnlocked()));
            int highestScore = prog != null ? prog.getHighestScore() : 0;
            boolean isPassed = prog != null && Boolean.TRUE.equals(prog.getIsPassed());

            if (isPassed) {
                completedChapters++;
                learnedKanji += ch.getKanjiCount();
            }

            chapterDtos.add(KanjiRoadmapChapterDto.builder()
                    .id(ch.getId())
                    .chapterNumber(ch.getChapterNumber())
                    .jlptLevel(ch.getJlptLevel())
                    .titleJa(ch.getTitleJa())
                    .titleVi(ch.getTitleVi())
                    .titleEn(ch.getTitleEn())
                    .kanjiCount(ch.getKanjiCount())
                    .displayOrder(ch.getDisplayOrder())
                    .illustrationUrl(ch.getIllustrationUrl())
                    .description(ch.getDescription())
                    .isUnlocked(isUnlocked)
                    .highestScore(highestScore)
                    .isPassed(isPassed)
                    .build());
        }

        List<KanjiAchievementTest> achievementTests;
        if ("N2".equalsIgnoreCase(targetLevel)) {
            achievementTests = achievementTestRepository.findByStageInOrderByStageAsc(List.of(11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21));
        } else if ("N3".equalsIgnoreCase(targetLevel)) {
            achievementTests = achievementTestRepository.findByStageInOrderByStageAsc(List.of(7, 8, 9, 10));
        } else if ("N4".equalsIgnoreCase(targetLevel)) {
            achievementTests = achievementTestRepository.findByStageInOrderByStageAsc(List.of(4, 5, 6));
        } else if ("N5".equalsIgnoreCase(targetLevel)) {
            achievementTests = achievementTestRepository.findByStageInOrderByStageAsc(List.of(1, 2, 3));
        } else {
            achievementTests = achievementTestRepository.findAllByOrderByStageAsc();
        }

        return KanjiRoadmapResponseDto.builder()
                .level(targetLevel)
                .totalChapters(chapters.size())
                .completedChapters(completedChapters)
                .totalKanji(totalKanji)
                .learnedKanji(learnedKanji)
                .chapters(chapterDtos)
                .achievementTests(achievementTests)
                .build();
    }

    /**
     * Lấy chi tiết nội dung chương (Chữ Hán, từ vựng, câu đọc/viết, minigame) phục vụ 4 thẻ giao diện.
     */
    @Transactional(readOnly = true)
    public KanjiChapterDetailResponseDto getChapterDetail(Long userId, Long chapterId) {
        return getChapterDetail(userId, chapterId, null);
    }

    /**
     * Lấy chi tiết nội dung chương (Chữ Hán, từ vựng, câu đọc/viết, minigame) phục vụ 4 thẻ giao diện.
     * Có hỗ trợ tham số level để đảm bảo luôn tải đúng chương của cấp độ JLPT tương ứng (tránh race condition).
     */
    @Transactional(readOnly = true)
    public KanjiChapterDetailResponseDto getChapterDetail(Long userId, Long chapterId, String level) {
        KanjiChapter chapter = null;
        if (level != null && !level.isBlank()) {
            String normLevel = level.trim().toUpperCase();
            Optional<KanjiChapter> byId = chapterRepository.findById(chapterId);
            if (byId.isPresent() && byId.get().getJlptLevel().equalsIgnoreCase(normLevel)) {
                chapter = byId.get();
            } else {
                // Nếu chapterId truyền vào là số thứ tự chương (1..15) hoặc ID khác level, tìm theo (level, chapterNumber)
                chapter = chapterRepository.findByJlptLevelAndChapterNumber(normLevel, chapterId.intValue())
                        .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter for level " + normLevel + " and id/number " + chapterId));
            }
        } else {
            chapter = chapterRepository.findById(chapterId)
                    .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter", chapterId));
        }

        Long realChapterId = chapter.getId();
        List<Kanji> kanjis = kanjiRepository.findByChapterIdOrderByChapterOrderAsc(realChapterId);
        List<KanjiChapterVocab> vocabularies = vocabRepository.findByChapterIdOrderByDisplayOrderAsc(realChapterId);
        List<KanjiExercise> readingExercises = exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(realChapterId, "READING");
        List<KanjiExercise> writingExercises = exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(realChapterId, "WRITING");
        List<KanjiMinigame> minigames = minigameRepository.findByChapterIdOrderByDisplayOrderAsc(realChapterId);

        UserKanjiProgress userProgress = null;
        if (userId != null) {
            userProgress = progressRepository.findByUserIdAndChapterId(userId, realChapterId).orElse(null);
        }

        return KanjiChapterDetailResponseDto.builder()
                .chapter(chapter)
                .kanjis(kanjis)
                .vocabularies(vocabularies)
                .readingExercises(readingExercises)
                .writingExercises(writingExercises)
                .minigames(minigames)
                .userProgress(userProgress)
                .build();
    }

    /**
     * Chấm điểm bài kiểm tra chương (ふくしゅう) hoặc minigame, lưu điểm thật trên DB,
     * và tự động mở khóa chương kế tiếp khi đạt điểm >= 85%.
     */
    @Transactional
    public KanjiSubmitResultDto submitChapterTest(Long userId, Long chapterId, KanjiSubmitRequestDto request) {
        return submitChapterTest(userId, chapterId, request, null);
    }

    @Transactional
    public KanjiSubmitResultDto submitChapterTest(Long userId, Long chapterId, KanjiSubmitRequestDto request, String level) {
        KanjiChapter currentChapter = null;
        if (level != null && !level.isBlank()) {
            String normLevel = level.trim().toUpperCase();
            Optional<KanjiChapter> byId = chapterRepository.findById(chapterId);
            if (byId.isPresent() && byId.get().getJlptLevel().equalsIgnoreCase(normLevel)) {
                currentChapter = byId.get();
            } else {
                currentChapter = chapterRepository.findByJlptLevelAndChapterNumber(normLevel, chapterId.intValue())
                        .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter for level " + normLevel + " and id/number " + chapterId));
            }
        } else {
            currentChapter = chapterRepository.findById(chapterId)
                    .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter", chapterId));
        }

        Long realChapterId = currentChapter.getId();
        int score = request.getScore() != null ? request.getScore() : 0;
        if (request.getTotalQuestions() != null && request.getTotalQuestions() > 0 && request.getCorrectCount() != null) {
            score = Math.round(((float) request.getCorrectCount() / request.getTotalQuestions()) * 100);
        }

        boolean isPassed = score >= 85;
        boolean unlockedNextChapter = false;
        Long nextChapterId = null;
        Integer nextChapterNumber = null;
        String message;

        if (isPassed) {
            message = String.format("Xuất sắc! Bạn đạt %d%% (Đạt chuẩn ≥ 85%%).", score);
        } else {
            message = String.format("Bạn đạt %d%%. Cần đạt ≥ 85%% để mở khóa chương kế tiếp.", score);
        }

        if (userId != null) {
            UserKanjiProgress progress = progressRepository.findByUserIdAndChapterId(userId, realChapterId)
                    .orElseGet(() -> UserKanjiProgress.builder()
                            .userId(userId)
                            .chapterId(realChapterId)
                            .isUnlocked(true)
                            .highestScore(0)
                            .isPassed(false)
                            .build());

            progress.setIsUnlocked(true);
            int newHighest = Math.max(progress.getHighestScore() != null ? progress.getHighestScore() : 0, score);
            progress.setHighestScore(newHighest);
            if (isPassed) {
                progress.setIsPassed(true);
                progress.setCompletedAt(LocalDateTime.now());
            }
            progressRepository.save(progress);

            // Mở khóa chương kế tiếp nếu đạt >= 85%
            if (isPassed) {
                int nextNum = currentChapter.getChapterNumber() + 1;
                Optional<KanjiChapter> nextChapOpt = chapterRepository.findByJlptLevelAndChapterNumber(
                        currentChapter.getJlptLevel(), nextNum);

                if (nextChapOpt.isPresent()) {
                    KanjiChapter nextChap = nextChapOpt.get();
                    nextChapterId = nextChap.getId();
                    nextChapterNumber = nextChap.getChapterNumber();

                    UserKanjiProgress nextProgress = progressRepository.findByUserIdAndChapterId(userId, nextChap.getId())
                            .orElseGet(() -> UserKanjiProgress.builder()
                                    .userId(userId)
                                    .chapterId(nextChap.getId())
                                    .highestScore(0)
                                    .isPassed(false)
                                    .build());

                    nextProgress.setIsUnlocked(true);
                    progressRepository.save(nextProgress);
                    unlockedNextChapter = true;
                    message += String.format(" Đã mở khóa Chương %d: %s!", nextChapterNumber, nextChap.getTitleJa());
                } else {
                    message += " Chúc mừng bạn đã hoàn thành chương cuối cùng của cấp độ này!";
                }
            }
        } else {
            // Khách chưa đăng nhập: tính toán chương sau để UI biết
            if (isPassed) {
                int nextNum = currentChapter.getChapterNumber() + 1;
                Optional<KanjiChapter> nextChapOpt = chapterRepository.findByJlptLevelAndChapterNumber(
                        currentChapter.getJlptLevel(), nextNum);
                if (nextChapOpt.isPresent()) {
                    unlockedNextChapter = true;
                    nextChapterId = nextChapOpt.get().getId();
                    nextChapterNumber = nextChapOpt.get().getChapterNumber();
                }
            }
        }

        return KanjiSubmitResultDto.builder()
                .score(score)
                .isPassed(isPassed)
                .unlockedNextChapter(unlockedNextChapter)
                .nextChapterId(nextChapterId)
                .nextChapterNumber(nextChapterNumber)
                .message(message)
                .build();
    }
}
