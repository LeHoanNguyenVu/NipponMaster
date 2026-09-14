package com.nihongo.api.modules.jlpt.repository;

import com.nihongo.api.modules.jlpt.entity.ExamResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    Page<ExamResult> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    List<ExamResult> findByUserIdAndExamId(Long userId, Long examId);
}
