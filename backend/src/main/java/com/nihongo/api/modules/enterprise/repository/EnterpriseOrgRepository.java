package com.nihongo.api.modules.enterprise.repository;

import com.nihongo.api.modules.enterprise.entity.EnterpriseOrg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnterpriseOrgRepository extends JpaRepository<EnterpriseOrg, Long> {

    Optional<EnterpriseOrg> findByCode(String code);

    boolean existsByCode(String code);
}
