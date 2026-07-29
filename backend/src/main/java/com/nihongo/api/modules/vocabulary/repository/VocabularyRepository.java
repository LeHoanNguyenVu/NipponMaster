package com.nihongo.api.modules.vocabulary.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    Page<Vocabulary> findByJlptLevel(User.JlptLevel level, Pageable pageable);

    Page<Vocabulary> findByTopic(String topic, Pageable pageable);

    Page<Vocabulary> findByWordType(Vocabulary.WordType wordType, Pageable pageable);

    @Query("SELECT v FROM Vocabulary v WHERE " +
            "LOWER(v.word) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.reading) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.meaning) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Vocabulary> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT v FROM Vocabulary v WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR " +
            " LOWER(v.word) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(v.reading) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(v.meaning) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "(:level IS NULL OR v.jlptLevel = :level) AND " +
            "(:wordType IS NULL OR v.wordType = :wordType)")
    Page<Vocabulary> searchWithFilters(
            @Param("keyword") String keyword,
            @Param("level") User.JlptLevel level,
            @Param("wordType") Vocabulary.WordType wordType,
            Pageable pageable);

    List<Vocabulary> findByJlptLevelAndTopic(User.JlptLevel level, String topic);

    long countByJlptLevel(User.JlptLevel level);

    /** Lấy từ vựng chưa có trong danh sách ID đã học, theo cấp JLPT */
    @Query("SELECT v FROM Vocabulary v WHERE v.jlptLevel = :level AND v.id NOT IN :excludeIds ORDER BY v.id ASC")
    List<Vocabulary> findNewVocabularies(
            @Param("level") User.JlptLevel level,
            @Param("excludeIds") List<Long> excludeIds,
            Pageable pageable);

    /** Lấy từ vựng chưa có flashcard nào (khi danh sách exclude rỗng) */
    @Query("SELECT v FROM Vocabulary v WHERE v.jlptLevel = :level ORDER BY v.id ASC")
    List<Vocabulary> findNewVocabulariesNoExclude(
            @Param("level") User.JlptLevel level,
            Pageable pageable);
}
