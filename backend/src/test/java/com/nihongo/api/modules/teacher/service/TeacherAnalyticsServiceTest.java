package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.teacher.dto.TeacherAnalyticsDTO.*;
import com.nihongo.api.modules.teacher.entity.Classroom;
import com.nihongo.api.modules.teacher.entity.ClassroomStudent;
import com.nihongo.api.modules.teacher.repository.ClassroomRepository;
import com.nihongo.api.modules.teacher.repository.ClassroomStudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherAnalyticsServiceTest {

    @Mock
    private ClassroomRepository classroomRepository;

    @Mock
    private ClassroomStudentRepository classroomStudentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TeacherAnalyticsServiceImpl teacherAnalyticsService;

    private Classroom classroom;
    private User student;

    @BeforeEach
    void setUp() {
        classroom = Classroom.builder()
                .name("Lớp N5 K48")
                .teacherId(1L)
                .joinCode("CLASS-N5-100")
                .level(User.JlptLevel.N5)
                .build();
        classroom.setId(10L);

        student = User.builder()
                .email("student@example.com")
                .fullName("Nguyen Van Student")
                .role(User.Role.STUDENT)
                .build();
        student.setId(100L);
    }

    @Test
    void testGetAnalyticsOverview_Success() {
        when(classroomRepository.findByTeacherId(1L)).thenReturn(List.of(classroom));
        when(classroomStudentRepository.findByClassroomId(10L))
                .thenReturn(List.of(ClassroomStudent.builder().classroomId(10L).studentId(100L).build()));
        when(userRepository.findById(100L)).thenReturn(Optional.of(student));

        AnalyticsOverviewResponse overview = teacherAnalyticsService.getAnalyticsOverview(1L);

        assertNotNull(overview);
        assertEquals(1, overview.getTotalClassrooms());
        assertEquals(1, overview.getTotalStudents());
        verify(classroomRepository, times(1)).findByTeacherId(1L);
    }

    @Test
    void testGetClassroomGradebook_Success() {
        when(classroomRepository.findById(10L)).thenReturn(Optional.of(classroom));
        when(classroomStudentRepository.findByClassroomId(10L))
                .thenReturn(List.of(ClassroomStudent.builder().classroomId(10L).studentId(100L).build()));
        when(userRepository.findById(100L)).thenReturn(Optional.of(student));

        ClassroomGradebookResponse response = teacherAnalyticsService.getClassroomGradebook(1L, 10L);

        assertNotNull(response);
        assertEquals("Lớp N5 K48", response.getClassroomName());
        assertEquals(1, response.getTotalStudents());
        assertFalse(response.getStudents().isEmpty());
        assertEquals("Nguyen Van Student", response.getStudents().get(0).getFullName());
    }

    @Test
    void testExportGradebookCsv_Success() {
        when(classroomRepository.findById(10L)).thenReturn(Optional.of(classroom));
        when(classroomStudentRepository.findByClassroomId(10L))
                .thenReturn(List.of(ClassroomStudent.builder().classroomId(10L).studentId(100L).build()));
        when(userRepository.findById(100L)).thenReturn(Optional.of(student));

        String csv = teacherAnalyticsService.exportGradebookCsv(1L, 10L);

        assertNotNull(csv);
        assertTrue(csv.contains("Nguyen Van Student"));
        assertTrue(csv.contains("student@example.com"));
    }
}
