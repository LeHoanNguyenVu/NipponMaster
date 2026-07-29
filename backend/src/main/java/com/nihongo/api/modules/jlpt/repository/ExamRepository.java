package com.nihongo.api.modules.jlpt.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.jlpt.entity.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ExamRepository extends JpaRepository<Exam, Long> {

    Page<Exam> findByJlptLevel(User.JlptLevel level, Pageable pageable);

    Page<Exam> findByExamType(Exam.ExamType type, Pageable pageable);

    Page<Exam> findByJlptLevelAndExamType(User.JlptLevel level, Exam.ExamType type, Pageable pageable);

    Page<Exam> findByIsPublishedTrue(Pageable pageable);
}
