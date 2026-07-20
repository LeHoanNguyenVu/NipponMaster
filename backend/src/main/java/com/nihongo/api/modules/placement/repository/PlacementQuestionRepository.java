package com.nihongo.api.modules.placement.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.placement.entity.PlacementQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementQuestionRepository extends JpaRepository<PlacementQuestion, Long> {

    /**
     * Lấy toàn bộ câu hỏi theo level, sắp xếp theo displayOrder.
     */
    List<PlacementQuestion> findByLevelOrderByDisplayOrderAsc(User.JlptLevel level);

    /**
     * Lấy ngẫu nhiên N câu hỏi theo level (dùng khi bộ câu hỏi lớn).
     */
    @Query(value = "SELECT * FROM placement_questions WHERE level = :#{#level.name()} ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<PlacementQuestion> findRandomByLevel(User.JlptLevel level, int limit);

    /**
     * Đếm số câu hỏi theo level.
     */
    long countByLevel(User.JlptLevel level);
}
