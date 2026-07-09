package com.nihongo.api.modules.flashcard.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.flashcard.dto.StudySessionResponse;
import com.nihongo.api.modules.flashcard.entity.Flashcard;
import com.nihongo.api.modules.flashcard.repository.FlashcardRepository;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final UserRepository userRepository;
    private final com.nihongo.api.modules.leaderboard.service.LeaderboardService leaderboardService;

    /** Số thẻ từ vựng mới mỗi ngày */
    private static final int NEW_VOCAB_PER_DAY = 8;
    /** Số thẻ Kanji mới mỗi ngày */
    private static final int NEW_KANJI_PER_DAY = 4;

    @Transactional(readOnly = true)
    public PageResponse<Flashcard> getByUser(Long userId, Pageable pageable) {
        return PageResponse.from(flashcardRepository.findByUserId(userId, pageable));
    }

    @Transactional(readOnly = true)
    public List<Flashcard> getDueCards(Long userId) {
        return flashcardRepository.findDueCards(userId, LocalDateTime.now());
    }

    /**
     * Tạo phiên ôn tập kiểu Anki:
     * 1. Lấy tất cả thẻ đến hạn ôn tập (review cards)
     * 2. Tự động tạo thẻ mới từ Vocabulary + Kanji theo cấp JLPT của user
     * 3. Trộn lẫn và trả về
     */
    @Transactional
    public StudySessionResponse buildStudySession(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        User.JlptLevel level = user.getJlptLevel() != null ? user.getJlptLevel() : User.JlptLevel.N5;

        // 1. Lấy thẻ cần ôn tập
        List<Flashcard> reviewCards = flashcardRepository.findDueCards(userId, LocalDateTime.now());

        // 2. Kiểm tra số thẻ mới đã tạo hôm nay
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        long newCardsToday = flashcardRepository.countNewCardsToday(userId, startOfDay);
        int totalNewLimit = NEW_VOCAB_PER_DAY + NEW_KANJI_PER_DAY;
        int remainingNewSlots = Math.max(0, (int) (totalNewLimit - newCardsToday));

        List<Flashcard> newCards = new ArrayList<>();

        if (remainingNewSlots > 0) {
            // 3a. Tạo thẻ mới từ Vocabulary
            int vocabSlots = Math.min(NEW_VOCAB_PER_DAY, remainingNewSlots);
            List<Flashcard> newVocabCards = generateNewVocabCards(user, level, vocabSlots);
            newCards.addAll(newVocabCards);

            // 3b. Tạo thẻ mới từ Kanji
            int kanjiSlots = Math.min(NEW_KANJI_PER_DAY, remainingNewSlots - newVocabCards.size());
            if (kanjiSlots > 0) {
                List<Flashcard> newKanjiCards = generateNewKanjiCards(user, level, kanjiSlots);
                newCards.addAll(newKanjiCards);
            }

            log.info("Study session for user {}: {} review + {} new (vocab={}, kanji={})",
                    userId, reviewCards.size(), newCards.size(),
                    newVocabCards.size(), newCards.size() - newVocabCards.size());
        }

        // 4. Gộp: review trước, new sau, rồi trộn nhẹ
        List<Flashcard> allCards = new ArrayList<>();
        allCards.addAll(reviewCards);
        allCards.addAll(newCards);
        // Trộn để không bị nhàm chán
        Collections.shuffle(allCards);

        return StudySessionResponse.builder()
                .newCount(newCards.size())
                .reviewCount(reviewCards.size())
                .cards(allCards)
                .build();
    }

    /**
     * Tạo flashcard mới từ bảng Vocabulary.
     * Chỉ lấy từ chưa có flashcard tương ứng.
     */
    private List<Flashcard> generateNewVocabCards(User user, User.JlptLevel level, int limit) {
        // Lấy danh sách vocabulary ID đã tạo flashcard
        List<Long> existingIds = flashcardRepository.findSourceIdsByUserAndCardType(
                user.getId(), Flashcard.CardType.VOCABULARY);

        // Tìm vocabulary mới
        List<Vocabulary> newVocabs;
        if (existingIds.isEmpty()) {
            newVocabs = vocabularyRepository.findNewVocabulariesNoExclude(level, PageRequest.of(0, limit));
        } else {
            newVocabs = vocabularyRepository.findNewVocabularies(level, existingIds, PageRequest.of(0, limit));
        }

        // Chuyển đổi → Flashcard entity & lưu
        List<Flashcard> cards = new ArrayList<>();
        for (Vocabulary v : newVocabs) {
            Flashcard card = Flashcard.builder()
                    .user(user)
                    .front(v.getWord())
                    .back(v.getMeaning())
                    .reading(v.getReading())
                    .cardType(Flashcard.CardType.VOCABULARY)
                    .sourceId(v.getId())
                    .exampleSentence(v.getExampleSentence())
                    .exampleMeaning(v.getExampleMeaning())
                    .intervalDays(1)
                    .easeFactor(2.5)
                    .repetitionCount(0)
                    .nextReviewAt(LocalDateTime.now())
                    .build();
            cards.add(flashcardRepository.save(card));
        }
        return cards;
    }

    /**
     * Tạo flashcard mới từ bảng Kanji.
     */
    private List<Flashcard> generateNewKanjiCards(User user, User.JlptLevel level, int limit) {
        List<Long> existingIds = flashcardRepository.findSourceIdsByUserAndCardType(
                user.getId(), Flashcard.CardType.KANJI);

        List<Kanji> newKanjis;
        if (existingIds.isEmpty()) {
            newKanjis = kanjiRepository.findNewKanjisNoExclude(level, PageRequest.of(0, limit));
        } else {
            newKanjis = kanjiRepository.findNewKanjis(level, existingIds, PageRequest.of(0, limit));
        }

        List<Flashcard> cards = new ArrayList<>();
        for (Kanji k : newKanjis) {
            String reading = "";
            if (k.getKunReading() != null) reading += k.getKunReading();
            if (k.getOnReading() != null) reading += (reading.isEmpty() ? "" : " / ") + k.getOnReading();

            Flashcard card = Flashcard.builder()
                    .user(user)
                    .front(k.getCharacter())
                    .back(k.getMeaning())
                    .reading(reading)
                    .cardType(Flashcard.CardType.KANJI)
                    .sourceId(k.getId())
                    .exampleSentence(k.getRelatedWords())
                    .intervalDays(1)
                    .easeFactor(2.5)
                    .repetitionCount(0)
                    .nextReviewAt(LocalDateTime.now())
                    .build();
            cards.add(flashcardRepository.save(card));
        }
        return cards;
    }

    @Transactional
    public Flashcard create(Flashcard flashcard) {
        flashcard.setNextReviewAt(LocalDateTime.now());
        return flashcardRepository.save(flashcard);
    }

    /**
     * Cập nhật tiến trình SRS sau khi người dùng review thẻ.
     * Thuật toán SM-2 (SuperMemo 2):
     * - quality: 0-5 (0 = quên hoàn toàn, 5 = nhớ hoàn hảo)
     */
    @Transactional
    public Flashcard review(Long cardId, int quality) {
        Flashcard card = flashcardRepository.findById(cardId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard", cardId));

        if (quality >= 3) {
            // Trả lời đúng -> Cộng điểm bảng xếp hạng
            leaderboardService.addScore(card.getUser().getId(), quality * 10.0);

            if (card.getRepetitionCount() == 0) {
                card.setIntervalDays(1);
            } else if (card.getRepetitionCount() == 1) {
                card.setIntervalDays(6);
            } else {
                card.setIntervalDays((int) Math.round(card.getIntervalDays() * card.getEaseFactor()));
            }
            card.setRepetitionCount(card.getRepetitionCount() + 1);
        } else {
            // Trả lời sai -> reset
            card.setRepetitionCount(0);
            card.setIntervalDays(1);
        }

        // Cập nhật ease factor
        double newEase = card.getEaseFactor() + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        card.setEaseFactor(Math.max(1.3, newEase));

        // Đặt thời gian ôn tập tiếp theo
        card.setNextReviewAt(LocalDateTime.now().plusDays(card.getIntervalDays()));

        log.info("Review flashcard {}: quality={}, nextReview={}",
                cardId, quality, card.getNextReviewAt());

        return flashcardRepository.save(card);
    }

    @Transactional
    public void delete(Long id) {
        Flashcard existing = flashcardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard", id));
        flashcardRepository.delete(existing);
    }
}
