package com.nihongo.api.modules.grammar.repository;

import com.nihongo.api.modules.grammar.entity.GrammarDiscussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrammarDiscussionRepository extends JpaRepository<GrammarDiscussion, Long> {

    @Query("SELECT d FROM GrammarDiscussion d JOIN FETCH d.user WHERE d.lessonId = :lessonId AND d.replyToId IS NULL ORDER BY d.createdAt DESC")
    List<GrammarDiscussion> findMainDiscussionsByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT d FROM GrammarDiscussion d JOIN FETCH d.user WHERE d.replyToId IN :mainIds ORDER BY d.createdAt ASC")
    List<GrammarDiscussion> findRepliesByMainIds(@Param("mainIds") List<Long> mainIds);

    @Query("SELECT d FROM GrammarDiscussion d JOIN FETCH d.user WHERE d.lessonId = :lessonId ORDER BY d.createdAt ASC")
    List<GrammarDiscussion> findAllByLessonIdWithUser(@Param("lessonId") Long lessonId);
}

