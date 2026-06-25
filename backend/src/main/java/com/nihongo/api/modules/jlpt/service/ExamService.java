package com.nihongo.api.modules.jlpt.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.jlpt.entity.Exam;
import com.nihongo.api.modules.jlpt.entity.ExamResult;
import com.nihongo.api.modules.jlpt.repository.ExamRepository;
import com.nihongo.api.modules.jlpt.repository.ExamResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final ExamResultRepository examResultRepository;

    @Transactional(readOnly = true)
    public PageResponse<Exam> getPublishedExams(Pageable pageable) {
        return PageResponse.from(examRepository.findByIsPublishedTrue(pageable));
    }

    @Transactional(readOnly = true)
    public Exam getById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Đề thi", id));
    }

    @Transactional(readOnly = true)
    public PageResponse<Exam> getByLevel(User.JlptLevel level, Pageable pageable) {
        return PageResponse.from(examRepository.findByJlptLevel(level, pageable));
    }

    @Transactional
    public Exam create(Exam exam) {
        Exam saved = examRepository.save(exam);
        log.info("Tạo đề thi mới: {} (level={})", saved.getTitle(), saved.getJlptLevel());
        return saved;
    }

    @Transactional
    public ExamResult submitExam(ExamResult result) {
        ExamResult saved = examResultRepository.save(result);
        log.info("Nộp bài thi: userId={}, examId={}, score={}/{}",
                saved.getUser().getId(), saved.getExam().getId(),
                saved.getScore(), saved.getTotalScore());
        return saved;
    }

    @Transactional(readOnly = true)
    public PageResponse<ExamResult> getUserHistory(Long userId, Pageable pageable) {
        return PageResponse.from(examResultRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable));
    }
}
