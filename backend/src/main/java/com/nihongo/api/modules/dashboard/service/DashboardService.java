package com.nihongo.api.modules.dashboard.service;

import com.nihongo.api.modules.dashboard.dto.DashboardStatsResponse;
import com.nihongo.api.modules.flashcard.entity.Flashcard;
import com.nihongo.api.modules.flashcard.repository.FlashcardRepository;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarRepository grammarRepository;
    private final FlashcardRepository flashcardRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats(Long userId) {
        long vocabTotal = vocabularyRepository.count();
        long kanjiTotal = kanjiRepository.count();
        long grammarTotal = grammarRepository.count();

        long vocabLearned = flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.VOCABULARY);
        long kanjiLearned = flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.KANJI);
        long grammarLearned = flashcardRepository.countByUserIdAndCardType(userId, Flashcard.CardType.GRAMMAR);

        LocalDateTime now = LocalDateTime.now();
        List<Flashcard> allDueCards = flashcardRepository.findDueCards(userId, now);
        int dueCardCount = allDueCards.size();

        // Lấy tối đa 5 thẻ cần ôn gấp
        List<Flashcard> dueCardsLimit = allDueCards.stream()
                .limit(5)
                .collect(Collectors.toList());

        // Tính streak
        int streak = calculateStreak(userId);

        return DashboardStatsResponse.builder()
                .vocabLearned(vocabLearned)
                .vocabTotal(vocabTotal)
                .kanjiLearned(kanjiLearned)
                .kanjiTotal(kanjiTotal)
                .grammarLearned(grammarLearned)
                .grammarTotal(grammarTotal)
                .dueCardCount(dueCardCount)
                .dueCards(dueCardsLimit)
                .streakDays(streak)
                .build();
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
