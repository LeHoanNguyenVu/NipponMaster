package com.nihongo.api.modules.auth.repository;

import com.nihongo.api.modules.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(User.Role role);

    long countByJlptLevel(User.JlptLevel jlptLevel);

    long countByJlptLevelIsNull();
}
