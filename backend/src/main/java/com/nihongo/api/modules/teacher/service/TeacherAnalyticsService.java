package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.modules.teacher.dto.TeacherAnalyticsDTO.*;

public interface TeacherAnalyticsService {
    AnalyticsOverviewResponse getAnalyticsOverview(Long teacherId);
    ClassroomGradebookResponse getClassroomGradebook(Long teacherId, Long classroomId);
    String exportGradebookCsv(Long teacherId, Long classroomId);
}
