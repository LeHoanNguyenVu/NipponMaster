package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.kanji.dto.*;
import com.nihongo.api.modules.kanji.entity.*;
import com.nihongo.api.modules.kanji.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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

    /**
     * Lấy lộ trình 15 chương Kanji cùng tiến độ và trạng thái khóa của học viên.
     */
    @Transactional(readOnly = true)
    public KanjiRoadmapResponseDto getRoadmap(Long userId, String level) {
        String targetLevel = (level != null && !level.isBlank()) ? level.toUpperCase() : "N5";
        List<KanjiChapter> chapters = chapterRepository.findByJlptLevelOrderByDisplayOrderAsc(targetLevel);

        Map<Long, UserKanjiProgress> progressMap = new HashMap<>();
        if (userId != null) {
            List<UserKanjiProgress> progressList = progressRepository.findByUserId(userId);
            for (UserKanjiProgress p : progressList) {
                progressMap.put(p.getChapterId(), p);
            }
        }

        int completedChapters = 0;
        int learnedKanji = 0;
        int totalKanji = 0;

        List<KanjiRoadmapChapterDto> chapterDtos = new ArrayList<>();
        for (KanjiChapter ch : chapters) {
            totalKanji += ch.getKanjiCount();
            UserKanjiProgress prog = progressMap.get(ch.getId());

            // Chương 1 luôn mở khóa mặc định
            boolean isUnlocked = (ch.getChapterNumber() == 1) || (prog != null && Boolean.TRUE.equals(prog.getIsUnlocked()));
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

        List<KanjiAchievementTest> achievementTests = achievementTestRepository.findAllByOrderByStageAsc();

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
        KanjiChapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter", chapterId));

        List<Kanji> kanjis = kanjiRepository.findByChapterIdOrderByChapterOrderAsc(chapterId);
        List<KanjiChapterVocab> vocabularies = vocabRepository.findByChapterIdOrderByDisplayOrderAsc(chapterId);
        List<KanjiExercise> readingExercises = exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(chapterId, "READING");
        List<KanjiExercise> writingExercises = exerciseRepository.findByChapterIdAndExerciseTypeOrderByDisplayOrderAsc(chapterId, "WRITING");
        List<KanjiMinigame> minigames = minigameRepository.findByChapterIdOrderByDisplayOrderAsc(chapterId);

        UserKanjiProgress userProgress = null;
        if (userId != null) {
            userProgress = progressRepository.findByUserIdAndChapterId(userId, chapterId).orElse(null);
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
        KanjiChapter currentChapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("KanjiChapter", chapterId));

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
            UserKanjiProgress progress = progressRepository.findByUserIdAndChapterId(userId, chapterId)
                    .orElseGet(() -> UserKanjiProgress.builder()
                            .userId(userId)
                            .chapterId(chapterId)
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
