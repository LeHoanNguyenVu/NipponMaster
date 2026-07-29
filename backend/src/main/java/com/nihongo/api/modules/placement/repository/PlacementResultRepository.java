package com.nihongo.api.modules.placement.repository;

import com.nihongo.api.modules.placement.entity.PlacementResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlacementResultRepository extends JpaRepository<PlacementResult, Long> {

    /**
     * Lấy toàn bộ lịch sử bài test của một học viên, mới nhất trước.
     */
    List<PlacementResult> findByUserIdOrderByCreatedAtDesc(Long userId);
}
