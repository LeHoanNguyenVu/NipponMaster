package com.nihongo.api.modules.teacher.repository;

import com.nihongo.api.modules.teacher.entity.ClassroomStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomStudentRepository extends JpaRepository<ClassroomStudent, Long> {

    List<ClassroomStudent> findByClassroomIdOrderByJoinedAtDesc(Long classroomId);

    boolean existsByClassroomIdAndStudentId(Long classroomId, Long studentId);

    long countByClassroomId(Long classroomId);

    @Query("SELECT COUNT(cs) FROM ClassroomStudent cs WHERE cs.classroomId IN (SELECT c.id FROM Classroom c WHERE c.teacherId = :teacherId)")
    long countTotalStudentsForTeacher(@Param("teacherId") Long teacherId);
}
