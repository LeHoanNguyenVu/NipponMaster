package com.nihongo.api.modules.flashcard.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.flashcard.entity.Flashcard;
import com.nihongo.api.modules.flashcard.repository.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;

    @Transactional(readOnly = true)
    public PageResponse<Flashcard> getByUser(Long userId, Pageable pageable) {
        return PageResponse.from(flashcardRepository.findByUserId(userId, pageable));
    }

    @Transactional(readOnly = true)
    public List<Flashcard> getDueCards(Long userId) {
        return flashcardRepository.findDueCards(userId, LocalDateTime.now());
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
            // Trả lời đúng
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
