package com.nihongo.api.modules.jlpt.repository;

import com.nihongo.api.modules.jlpt.entity.ExamResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    Page<ExamResult> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    List<ExamResult> findByUserIdAndExamId(Long userId, Long examId);
}
