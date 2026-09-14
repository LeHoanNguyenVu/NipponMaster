package com.nihongo.api.modules.dashboard.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.dashboard.dto.DashboardStatsResponse;
import com.nihongo.api.modules.flashcard.entity.Flashcard;
import com.nihongo.api.modules.flashcard.repository.FlashcardRepository;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarRepository grammarRepository;
    private final FlashcardRepository flashcardRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats(Long userId) {
        // Lấy thông tin người dùng và Level mục tiêu
        Optional<User> userOpt = (userId != null) ? userRepository.findById(userId) : Optional.empty();
        User.JlptLevel level = User.JlptLevel.N5;
        String levelStr = "N5";
        String targetLevelStr = "N5";

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getJlptLevel() != null) {
                level = user.getJlptLevel();
                levelStr = level.name();
            }
            if (user.getTargetLevel() != null) {
                targetLevelStr = user.getTargetLevel().name();
                try {
                    level = User.JlptLevel.valueOf(targetLevelStr);
                    levelStr = targetLevelStr;
                } catch (Exception ignored) {}
            }
        }

        // Tính tổng số lượng theo Level JLPT thực tế của người dùng
        long dbVocabCount = vocabularyRepository.countByJlptLevel(level);
        long dbKanjiCount = kanjiRepository.countByJlptLevel(level);
        long dbGrammarCount = grammarRepository.countByJlptLevel(level);

        // Chuẩn hóa số lượng theo tiêu chuẩn JLPT từng cấp độ nếu dữ liệu mẫu đang nạp dần
        long vocabTotal = dbVocabCount > 0 ? dbVocabCount : getStandardVocabTotal(levelStr);
        long kanjiTotal = dbKanjiCount > 0 ? dbKanjiCount : getStandardKanjiTotal(levelStr);
        long grammarTotal = dbGrammarCount > 0 ? dbGrammarCount : getStandardGrammarTotal(levelStr);

        long vocabLearned = (userId != null) ? flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.VOCABULARY) : 0;
        long kanjiLearned = (userId != null) ? flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.KANJI) : 0;
        long grammarLearned = (userId != null) ? flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.GRAMMAR) : 0;

        LocalDateTime now = LocalDateTime.now();
        List<Flashcard> allDueCards = (userId != null) ? flashcardRepository.findDueCards(userId, now) : List.of();
        int dueCardCount = allDueCards.size();

        // Lấy tối đa 5 thẻ cần ôn gấp
        List<Flashcard> dueCardsLimit = allDueCards.stream()
                .limit(5)
                .collect(Collectors.toList());

        // Tính streak
        int streak = (userId != null) ? calculateStreak(userId) : 0;

        // Tính toán XP và thời lượng học ước tính hôm nay
        int todayXp = Math.max(50, (int) (vocabLearned * 10 + kanjiLearned * 15 + (streak > 0 ? 50 : 0)));
        int weeklyStudyMinutes = Math.max(30, streak * 25 + (int) ((vocabLearned + kanjiLearned) * 2));

        return DashboardStatsResponse.builder()
                .jlptLevel(levelStr)
                .targetLevel(targetLevelStr)
                .vocabLearned(vocabLearned)
                .vocabTotal(vocabTotal)
                .kanjiLearned(kanjiLearned)
                .kanjiTotal(kanjiTotal)
                .grammarLearned(grammarLearned)
                .grammarTotal(grammarTotal)
                .listeningCompleted(0)
                .listeningTotal(200)
                .battleWins(0)
                .battleTotal(0)
                .weeklyStudyMinutes(weeklyStudyMinutes)
                .todayXp(todayXp)
                .dueCardCount(dueCardCount)
                .dueCards(dueCardsLimit)
                .streakDays(streak)
                .build();
    }

    private long getStandardVocabTotal(String level) {
        return switch (level.toUpperCase()) {
            case "N4" -> 1500;
            case "N3" -> 3500;
            case "N2" -> 6000;
            case "N1" -> 10000;
            default -> 800; // N5 & Starter
        };
    }

    private long getStandardKanjiTotal(String level) {
        return switch (level.toUpperCase()) {
            case "N4" -> 300;
            case "N3" -> 650;
            case "N2" -> 1000;
            case "N1" -> 2000;
            default -> 100; // N5 & Starter
        };
    }

    private long getStandardGrammarTotal(String level) {
        return switch (level.toUpperCase()) {
            case "N4" -> 150;
            case "N3" -> 200;
            case "N2" -> 300;
            case "N1" -> 400;
            default -> 80; // N5 & Starter
        };
    }

    private int calculateStreak(Long userId) {
        List<LocalDateTime> reviewTimes = flashcardRepository.findReviewDatesByUserId(userId);
        if (reviewTimes == null || reviewTimes.isEmpty()) {
            return 0;
        }

        // Chuyển thành LocalDate và sắp xếp giảm dần
        Set<LocalDate> dates = reviewTimes.stream()
                .map(LocalDateTime::toLocalDate)
                .collect(Collectors.toCollection(() -> new TreeSet<>((d1, d2) -> d2.compareTo(d1))));

        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        // Nếu hôm nay và hôm qua đều không học, streak = 0
        if (!dates.contains(today) && !dates.contains(yesterday)) {
            return 0;
        }

        int streak = 0;
        LocalDate current = dates.contains(today) ? today : yesterday;

        while (dates.contains(current)) {
            streak++;
            current = current.minusDays(1);
        }

        return streak;
    }
}
