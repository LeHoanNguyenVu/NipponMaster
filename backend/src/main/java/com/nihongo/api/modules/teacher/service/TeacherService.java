package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.teacher.dto.*;
import com.nihongo.api.modules.teacher.entity.Classroom;
import com.nihongo.api.modules.teacher.entity.ClassroomStudent;
import com.nihongo.api.modules.teacher.repository.ClassroomRepository;
import com.nihongo.api.modules.teacher.repository.ClassroomStudentRepository;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeacherService {

    private final ClassroomRepository classroomRepository;
    private final ClassroomStudentRepository classroomStudentRepository;
    private final UserRepository userRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarRepository grammarRepository;

    @Transactional(readOnly = true)
    public TeacherStatsResponse getTeacherStats(Long teacherId) {
        long totalClasses = classroomRepository.countByTeacherId(teacherId);
        long totalStudents = classroomStudentRepository.countTotalStudentsForTeacher(teacherId);
        long vocabCount = vocabularyRepository.count();
        long kanjiCount = kanjiRepository.count();
        long grammarCount = grammarRepository.count();
        long totalLessons = vocabCount + kanjiCount + grammarCount;

        return TeacherStatsResponse.builder()
                .totalClasses(totalClasses > 0 ? totalClasses : 2) // Default baseline for teacher demo
                .totalStudents(totalStudents > 0 ? totalStudents : 48)
                .lessonsCreated(totalLessons)
                .averageRating(4.8)
                .teachingHours(120)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ClassroomResponse> getTeacherClasses(Long teacherId) {
        List<Classroom> classrooms = classroomRepository.findByTeacherIdOrderByCreatedAtDesc(teacherId);
        return classrooms.stream()
                .map(c -> {
                    long count = classroomStudentRepository.countByClassroomId(c.getId());
                    return ClassroomResponse.from(c, count);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public ClassroomResponse createClassroom(Long teacherId, CreateClassroomRequest request) {
        String joinCode = generateUniqueJoinCode(request.getLevel());

        Classroom classroom = Classroom.builder()
                .name(request.getName())
                .description(request.getDescription())
                .level(request.getLevel() != null ? request.getLevel() : User.JlptLevel.N5)
                .teacherId(teacherId)
                .joinCode(joinCode)
                .maxStudents(request.getMaxStudents() != null ? request.getMaxStudents() : 50)
                .isActive(true)
                .build();

        Classroom saved = classroomRepository.save(classroom);
        log.info("Teacher {} created classroom '{}' with join code {}", teacherId, saved.getName(), saved.getJoinCode());
        return ClassroomResponse.from(saved, 0);
    }

    @Transactional(readOnly = true)
    public List<ClassroomStudentResponse> getStudentsInClass(Long classroomId) {
        List<ClassroomStudent> relations = classroomStudentRepository.findByClassroomIdOrderByJoinedAtDesc(classroomId);
        return relations.stream()
                .map(cs -> {
                    User student = userRepository.findById(cs.getStudentId()).orElse(null);
                    return ClassroomStudentResponse.builder()
                            .id(cs.getId())
                            .studentId(cs.getStudentId())
                            .studentName(student != null ? student.getFullName() : "Học viên #" + cs.getStudentId())
                            .studentEmail(student != null ? student.getEmail() : "student" + cs.getStudentId() + "@nihongo.com")
                            .jlptLevel(student != null && student.getJlptLevel() != null ? student.getJlptLevel().name() : "N5")
                            .joinedAt(cs.getJoinedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public ClassroomStudentResponse addStudentToClass(Long teacherId, Long classroomId, String email) {
        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException("Lớp học", classroomId));

        if (!classroom.getTeacherId().equals(teacherId)) {
            throw new BusinessException("Bạn không có quyền quản lý lớp học này");
        }

        User student = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("Học viên với email " + email, 0L));

        if (classroomStudentRepository.existsByClassroomIdAndStudentId(classroomId, student.getId())) {
            throw new BusinessException("Học viên này đã có trong lớp học");
        }

        ClassroomStudent cs = ClassroomStudent.builder()
                .classroomId(classroomId)
                .studentId(student.getId())
                .build();

        ClassroomStudent saved = classroomStudentRepository.save(cs);
        log.info("Added student {} to classroom {}", student.getEmail(), classroom.getName());

        return ClassroomStudentResponse.builder()
                .id(saved.getId())
                .studentId(student.getId())
                .studentName(student.getFullName())
                .studentEmail(student.getEmail())
                .jlptLevel(student.getJlptLevel() != null ? student.getJlptLevel().name() : "N5")
                .joinedAt(saved.getJoinedAt())
                .build();
    }

    private String generateUniqueJoinCode(User.JlptLevel level) {
        String prefix = "CLASS-" + (level != null ? level.name() : "N5") + "-";
        Random random = new Random();
        String code;
        do {
            code = prefix + (1000 + random.nextInt(9000));
        } while (classroomRepository.existsByJoinCode(code));
        return code;
    }
}
