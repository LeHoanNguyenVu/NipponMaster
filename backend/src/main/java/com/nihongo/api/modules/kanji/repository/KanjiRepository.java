package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.kanji.entity.Kanji;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KanjiRepository extends JpaRepository<Kanji, Long> {

    Optional<Kanji> findByCharacter(String character);

    Page<Kanji> findByJlptLevel(User.JlptLevel level, Pageable pageable);

    Page<Kanji> findByRadical(String radical, Pageable pageable);

    @Query("SELECT k FROM Kanji k WHERE " +
            "k.character LIKE CONCAT('%', :keyword, '%') OR " +
            "LOWER(k.meaning) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "k.onReading LIKE CONCAT('%', :keyword, '%') OR " +
            "k.kunReading LIKE CONCAT('%', :keyword, '%')")
    Page<Kanji> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT k FROM Kanji k WHERE " +
            "(:level IS NULL OR k.jlptLevel = :level) AND " +
            "(:keyword = '' OR k.character LIKE CONCAT('%', :keyword, '%') OR " +
            "LOWER(k.meaning) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "k.onReading LIKE CONCAT('%', :keyword, '%') OR " +
            "k.kunReading LIKE CONCAT('%', :keyword, '%'))")
    Page<Kanji> searchWithFilters(
            @Param("keyword") String keyword,
            @Param("level") User.JlptLevel level,
            Pageable pageable);

    Page<Kanji> findByStrokeCount(Integer strokeCount, Pageable pageable);

    /** Lấy Kanji chưa có trong danh sách ID đã học, theo cấp JLPT */
    @Query("SELECT k FROM Kanji k WHERE k.jlptLevel = :level AND k.id NOT IN :excludeIds ORDER BY k.id ASC")
    List<Kanji> findNewKanjis(
            @Param("level") User.JlptLevel level,
            @Param("excludeIds") List<Long> excludeIds,
            Pageable pageable);

    /** Lấy Kanji chưa có flashcard nào (khi danh sách exclude rỗng) */
    @Query("SELECT k FROM Kanji k WHERE k.jlptLevel = :level ORDER BY k.id ASC")
    List<Kanji> findNewKanjisNoExclude(
            @Param("level") User.JlptLevel level,
            Pageable pageable);
}
