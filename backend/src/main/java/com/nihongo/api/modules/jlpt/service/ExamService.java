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
    private final com.nihongo.api.modules.leaderboard.service.LeaderboardService leaderboardService;

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
        if (exam.getQuestions() != null) {
            exam.getQuestions().forEach(q -> q.setExam(exam));
        }
        Exam saved = examRepository.save(exam);
        log.info("Tạo đề thi mới: {} (level={}, questions={})", saved.getTitle(), saved.getJlptLevel(), saved.getQuestions().size());
        return saved;
    }

    @Transactional
    public Exam update(Long id, Exam updatedExam) {
        Exam existing = getById(id);
        existing.setTitle(updatedExam.getTitle());
        existing.setDescription(updatedExam.getDescription());
        existing.setJlptLevel(updatedExam.getJlptLevel());
        existing.setExamType(updatedExam.getExamType());
        existing.setDurationMinutes(updatedExam.getDurationMinutes());
        existing.setTotalScore(updatedExam.getTotalScore());
        existing.setIsPublished(updatedExam.getIsPublished());
        existing.setIsShuffleQuestions(updatedExam.getIsShuffleQuestions());
        existing.setIsShuffleOptions(updatedExam.getIsShuffleOptions());

        if (updatedExam.getQuestions() != null) {
            existing.getQuestions().clear();
            updatedExam.getQuestions().forEach(q -> {
                q.setExam(existing);
                existing.getQuestions().add(q);
            });
        }

        Exam saved = examRepository.save(existing);
        log.info("Cập nhật đề thi ID={}: {} (questions={})", id, saved.getTitle(), saved.getQuestions().size());
        return saved;
    }

    @Transactional
    public void delete(Long id) {
        Exam existing = getById(id);
        examRepository.delete(existing);
        log.info("Xóa đề thi ID={}", id);
    }

    @Transactional
    public ExamResult submitExam(ExamResult result) {
        ExamResult saved = examResultRepository.save(result);
        
        // Cộng điểm thi vào bảng xếp hạng
        if (saved.getScore() != null && saved.getScore() > 0) {
            leaderboardService.addScore(saved.getUser().getId(), saved.getScore().doubleValue());
        }

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
