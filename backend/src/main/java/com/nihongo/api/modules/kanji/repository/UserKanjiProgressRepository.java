package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.UserKanjiProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserKanjiProgressRepository extends JpaRepository<UserKanjiProgress, Long> {

    List<UserKanjiProgress> findByUserId(Long userId);

    Optional<UserKanjiProgress> findByUserIdAndChapterId(Long userId, Long chapterId);
}
