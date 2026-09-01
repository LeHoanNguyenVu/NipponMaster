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

    /**
     * Lấy danh sách thẻ luyện trí nhớ nhanh ngẫu nhiên trực tiếp từ Supabase Database.
     * Tự động truy vấn từ bảng `vocabularies` & `kanjis` theo đúng Level của học viên.
     */
    @Transactional(readOnly = true)
    public List<com.nihongo.api.modules.flashcard.dto.QuickPracticeCardDto> getQuickPracticeCards(User.JlptLevel level, int limit) {
        User.JlptLevel targetLevel = (level != null) ? level : User.JlptLevel.STARTER;
        int fetchSize = Math.max(limit, 20);

        List<Vocabulary> vocabs = vocabularyRepository.findByJlptLevel(targetLevel, PageRequest.of(0, fetchSize)).getContent();
        List<Kanji> kanjis = kanjiRepository.findByJlptLevel(targetLevel, PageRequest.of(0, fetchSize)).getContent();

        List<com.nihongo.api.modules.flashcard.dto.QuickPracticeCardDto> result = new ArrayList<>();

        // Map Vocabularies
        for (Vocabulary v : vocabs) {
            String word = v.getWord();
            String reading = (v.getReading() != null && !v.getReading().isBlank()) ? v.getReading() : word;
            String meaning = (v.getMeaning() != null && !v.getMeaning().isBlank()) ? v.getMeaning() : "Từ vựng tiếng Nhật";

            String exJp = (v.getExampleSentence() != null && !v.getExampleSentence().isBlank())
                    ? v.getExampleSentence()
                    : (word + "を 使います。");
            String exRomaji = (v.getExampleRomaji() != null && !v.getExampleRomaji().isBlank())
                    ? v.getExampleRomaji()
                    : "";
            String exVi = (v.getExampleMeaning() != null && !v.getExampleMeaning().isBlank())
                    ? v.getExampleMeaning()
                    : ("Sử dụng " + meaning.toLowerCase() + " trong đời sống.");

            int strokes = (v.getStrokeCount() != null && v.getStrokeCount() > 0)
                    ? v.getStrokeCount()
                    : Math.max(1, word.length() * 3);

            String guide = (v.getStrokeGuide() != null && !v.getStrokeGuide().isBlank())
                    ? v.getStrokeGuide()
                    : "Quy tắc viết nét bút thuận chuẩn tiếng Nhật (từ trên xuống dưới, từ trái qua phải)";

            result.add(com.nihongo.api.modules.flashcard.dto.QuickPracticeCardDto.builder()
                    .id(v.getId())
                    .kanji(word)
                    .kana(reading)
                    .romaji(v.getRomaji() != null ? v.getRomaji() : "")
                    .hanViet(v.getHanViet() != null ? v.getHanViet() : "")
                    .meaning(meaning)
                    .strokeCount(strokes)
                    .strokeGuide(guide)
                    .exampleJp(exJp)
                    .exampleRomaji(exRomaji)
                    .exampleVi(exVi)
                    .level(targetLevel.name())
                    .cardType("VOCABULARY")
                    .imageUrl(v.getImageUrl())
                    .mnemonicHint(v.getMnemonicHint())
                    .mnemonicTitle(v.getMnemonicTitle())
                    .mnemonicIcon(v.getMnemonicIcon())
                    .build());
        }

        // Map Kanjis
        for (Kanji k : kanjis) {
            String charStr = k.getCharacter();
            // Lấy cách đọc chuẩn, loại bỏ các ký tự dấu chấm '・' hoặc phân tách phẩy để phát âm chuẩn 100%
            String rawReading = (k.getOnReading() != null && !k.getOnReading().isBlank())
                    ? k.getOnReading().split("[,/、]")[0].trim()
                    : (k.getKunReading() != null && !k.getKunReading().isBlank() ? k.getKunReading().split("[,/、]")[0].trim() : charStr);
            String reading = rawReading.replace("・", "").replace("·", "");
            String meaning = (k.getMeaning() != null && !k.getMeaning().isBlank()) ? k.getMeaning() : "Chữ Hán Kanji";

            String exJp = (k.getExampleSentence() != null && !k.getExampleSentence().isBlank())
                    ? k.getExampleSentence()
                    : (k.getRelatedWords() != null && !k.getRelatedWords().isBlank() ? k.getRelatedWords() : charStr + "の 漢字を勉強します。");
            String exRomaji = (k.getExampleRomaji() != null && !k.getExampleRomaji().isBlank())
                    ? k.getExampleRomaji()
                    : "";
            String exVi = (k.getExampleMeaning() != null && !k.getExampleMeaning().isBlank())
                    ? k.getExampleMeaning()
                    : ("Học chữ Hán mang ý nghĩa " + meaning.toLowerCase() + ".");

            int strokes = (k.getStrokeCount() != null && k.getStrokeCount() > 0)
                    ? k.getStrokeCount()
                    : 4;

            String guide = (k.getStrokeGuide() != null && !k.getStrokeGuide().isBlank())
                    ? k.getStrokeGuide()
                    : "Thứ tự nét viết chữ Hán chuẩn bút thuận";

            result.add(com.nihongo.api.modules.flashcard.dto.QuickPracticeCardDto.builder()
                    .id(k.getId())
                    .kanji(charStr)
                    .kana(reading)
                    .romaji(k.getRomaji() != null ? k.getRomaji() : "")
                    .hanViet(k.getHanViet() != null ? k.getHanViet() : "")
                    .meaning(meaning)
                    .strokeCount(strokes)
                    .strokeGuide(guide)
                    .exampleJp(exJp)
                    .exampleRomaji(exRomaji)
                    .exampleVi(exVi)
                    .level(targetLevel.name())
                    .cardType("KANJI")
                    .imageUrl(k.getImageUrl())
                    .mnemonicHint(k.getMnemonicHint())
                    .mnemonicTitle(k.getMnemonicTitle())
                    .mnemonicIcon(k.getMnemonicIcon())
                    .build());
        }

        Collections.shuffle(result);
        return result.stream().limit(limit).toList();
    }
}
