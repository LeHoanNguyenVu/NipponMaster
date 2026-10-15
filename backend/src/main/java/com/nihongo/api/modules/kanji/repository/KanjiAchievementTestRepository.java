package com.nihongo.api.modules.kanji.repository;

import com.nihongo.api.modules.kanji.entity.KanjiAchievementTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface KanjiAchievementTestRepository extends JpaRepository<KanjiAchievementTest, Long> {

    List<KanjiAchievementTest> findAllByOrderByStageAsc();

    Optional<KanjiAchievementTest> findByStage(Integer stage);
}
