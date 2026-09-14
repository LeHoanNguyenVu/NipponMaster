package com.nihongo.api.modules.teacher.repository;

import com.nihongo.api.modules.teacher.entity.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    List<Classroom> findByTeacherId(Long teacherId);
    List<Classroom> findByTeacherIdOrderByCreatedAtDesc(Long teacherId);

    Optional<Classroom> findByJoinCode(String joinCode);

    boolean existsByJoinCode(String joinCode);

    long countByTeacherId(Long teacherId);
}
