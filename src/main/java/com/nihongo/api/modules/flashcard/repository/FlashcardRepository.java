package com.nihongo.api.modules.flashcard.repository;

import com.nihongo.api.modules.flashcard.entity.Flashcard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {

    Page<Flashcard> findByUserId(Long userId, Pageable pageable);

    /** Lấy các thẻ cần ôn tập (đã đến hạn review) */
    @Query("SELECT f FROM Flashcard f WHERE f.user.id = :userId " +
            "AND (f.nextReviewAt IS NULL OR f.nextReviewAt <= :now) " +
            "ORDER BY f.nextReviewAt ASC")
    List<Flashcard> findDueCards(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    long countByUserId(Long userId);
}
