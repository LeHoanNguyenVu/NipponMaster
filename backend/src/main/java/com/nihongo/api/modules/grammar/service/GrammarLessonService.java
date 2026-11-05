package com.nihongo.api.modules.grammar.service;

import com.nihongo.api.modules.grammar.dto.*;

import java.util.List;

public interface GrammarLessonService {

    List<GrammarLevelDto> getLevels(Long userId);

    List<GrammarLessonSummaryDto> getLessonsByLevel(String levelCode, Long userId);

    GrammarLessonDetailDto getLessonDetail(Long lessonId, Long userId);

    GrammarQuizSubmitDto.Response submitQuiz(Long lessonId, Long userId, GrammarQuizSubmitDto.Request request);

    List<GrammarDiscussionDto> getDiscussions(Long lessonId);

    GrammarDiscussionDto createDiscussion(Long lessonId, Long userId, GrammarDiscussionDto.CreateRequest request);

    void toggleHelpful(Long discussionId);

    void updateWatchProgress(Long lessonId, Long userId, GrammarWatchProgressDto.Request request);

    void deleteDiscussion(Long discussionId, Long userId);

    String uploadDiscussionMedia(org.springframework.web.multipart.MultipartFile file);
}

