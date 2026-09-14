package com.nihongo.api.modules.leaderboard.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.leaderboard.dto.LeaderboardEntry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Service quản lý bảng xếp hạng học tập trên Redis Sorted Set.
 * Sử dụng ZADD / ZREVRANGE để xếp hạng người dùng theo điểm số thực tế.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private static final String LEADERBOARD_KEY = "leaderboard:study_score";

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;

    /**
     * Cập nhật (tăng) điểm học tập của người dùng.
     * Được gọi khi hoàn thành ôn tập flashcard, tạo thẻ mới, v.v.
     */
    public void addScore(Long userId, double points) {
        redisTemplate.opsForZSet().incrementScore(LEADERBOARD_KEY, userId.toString(), points);
        log.debug("📊 Cập nhật điểm leaderboard cho userId={}: +{}", userId, points);
    }

    /**
     * Lấy bảng xếp hạng top N người dùng có điểm cao nhất.
     */
    public List<LeaderboardEntry> getTopN(int n) {
        Set<ZSetOperations.TypedTuple<Object>> tuples =
                redisTemplate.opsForZSet().reverseRangeWithScores(LEADERBOARD_KEY, 0, n - 1);

        List<LeaderboardEntry> entries = new ArrayList<>();
        if (tuples == null) return entries;

        int rank = 1;
        for (ZSetOperations.TypedTuple<Object> tuple : tuples) {
            Long userId = Long.valueOf(tuple.getValue().toString());
            String fullName = userRepository.findById(userId)
                    .map(User::getFullName)
                    .orElse("Unknown User");

            entries.add(LeaderboardEntry.builder()
                    .rank(rank++)
                    .userId(userId)
                    .fullName(fullName)
                    .score(tuple.getScore() != null ? tuple.getScore() : 0)
                    .build());
        }

        return entries;
    }

    /**
     * Lấy thứ hạng của một người dùng cụ thể.
     * @return thứ hạng (1-indexed), hoặc -1 nếu chưa có trong bảng xếp hạng
     */
    public long getUserRank(Long userId) {
        Long rank = redisTemplate.opsForZSet().reverseRank(LEADERBOARD_KEY, userId.toString());
        return rank != null ? rank + 1 : -1;
    }

    /**
     * Lấy điểm của một người dùng cụ thể.
     */
    public double getUserScore(Long userId) {
        Double score = redisTemplate.opsForZSet().score(LEADERBOARD_KEY, userId.toString());
        return score != null ? score : 0;
    }
}
