package com.nihongo.api.modules.subscription.repository;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findByUserIdAndStatus(Long userId, Subscription.SubscriptionStatus status);

    List<Subscription> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Subscription s " +
           "WHERE s.userId = :userId AND s.status = 'ACTIVE' AND s.plan.planType = 'FULL_BUNDLE'")
    boolean hasActiveFullBundle(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Subscription s " +
           "WHERE s.userId = :userId AND s.status = 'ACTIVE' AND s.plan.jlptLevel = :level")
    boolean hasActiveLevelSubscription(@Param("userId") Long userId, @Param("level") User.JlptLevel level);

    @Query("SELECT s FROM Subscription s WHERE s.userId = :userId AND s.status = 'ACTIVE'")
    List<Subscription> findActiveByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.status = 'ACTIVE'")
    long countActiveSubscriptions();
}
