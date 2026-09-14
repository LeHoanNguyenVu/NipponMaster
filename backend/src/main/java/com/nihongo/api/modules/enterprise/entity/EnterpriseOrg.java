package com.nihongo.api.modules.enterprise.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity đại diện cho Tổ chức/Trường học B2B.
 */
@Entity
@Table(name = "enterprise_orgs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseOrg extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "max_seats", nullable = false)
    @Builder.Default
    private Integer maxSeats = 100;

    @Column(name = "active_seats", nullable = false)
    @Builder.Default
    private Integer activeSeats = 0;

    @Column(name = "contact_email", length = 100)
    private String contactEmail;

    @Column(name = "contact_phone", length = 30)
    private String contactPhone;

    @Column(name = "valid_until")
    private LocalDateTime validUntil;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
