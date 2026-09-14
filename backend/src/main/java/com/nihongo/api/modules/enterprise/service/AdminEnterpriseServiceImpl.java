package com.nihongo.api.modules.enterprise.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
import com.nihongo.api.modules.enterprise.dto.EnterpriseOrgDTO;
import com.nihongo.api.modules.enterprise.entity.EnterpriseOrg;
import com.nihongo.api.modules.enterprise.repository.EnterpriseOrgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminEnterpriseServiceImpl implements AdminEnterpriseService {

    private final EnterpriseOrgRepository orgRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<EnterpriseOrgDTO.EnterpriseOrgResponse> getAllOrgs() {
        return orgRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EnterpriseOrgDTO.EnterpriseOrgResponse createOrg(EnterpriseOrgDTO.CreateOrgRequest request) {
        String code = request.getCode().trim().toUpperCase();
        if (orgRepository.existsByCode(code)) {
            throw new RuntimeException("Mã tổ chức/trường học '" + code + "' đã tồn tại trên hệ thống");
        }

        int durationDays = request.getDurationDays() != null && request.getDurationDays() > 0
                ? request.getDurationDays() : 365;

        EnterpriseOrg org = EnterpriseOrg.builder()
                .name(request.getName().trim())
                .code(code)
                .logoUrl(request.getLogoUrl())
                .maxSeats(request.getMaxSeats() != null ? request.getMaxSeats() : 100)
                .activeSeats(0)
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .validUntil(LocalDateTime.now().plusDays(durationDays))
                .isActive(true)
                .build();

        org = orgRepository.save(org);
        log.info("Tạo tổ chức B2B thành công: {} ({})", org.getName(), org.getCode());
        return mapToResponse(org);
    }

    @Override
    @Transactional
    public EnterpriseOrgDTO.EnterpriseOrgResponse updateOrg(Long id, EnterpriseOrgDTO.CreateOrgRequest request) {
        EnterpriseOrg org = orgRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EnterpriseOrg", id));

        org.setName(request.getName().trim());
        if (request.getMaxSeats() != null) {
            org.setMaxSeats(request.getMaxSeats());
        }
        if (request.getContactEmail() != null) {
            org.setContactEmail(request.getContactEmail());
        }
        if (request.getContactPhone() != null) {
            org.setContactPhone(request.getContactPhone());
        }
        if (request.getLogoUrl() != null) {
            org.setLogoUrl(request.getLogoUrl());
        }

        org = orgRepository.save(org);
        return mapToResponse(org);
    }

    @Override
    @Transactional
    public void deleteOrg(Long id) {
        EnterpriseOrg org = orgRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EnterpriseOrg", id));
        orgRepository.delete(org);
        log.info("Xóa tổ chức B2B id={}", id);
    }

    @Override
    @Transactional
    public EnterpriseOrgDTO.BulkImportResponse bulkImportStudents(Long orgId, EnterpriseOrgDTO.BulkImportRequest request) {
        EnterpriseOrg org = orgRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("EnterpriseOrg", orgId));

        List<EnterpriseOrgDTO.StudentImportItem> students = request.getStudents();
        if (students == null || students.isEmpty()) {
            return EnterpriseOrgDTO.BulkImportResponse.builder()
                    .successCount(0)
                    .totalRequested(0)
                    .importedEmails(List.of())
                    .failedEmails(List.of())
                    .build();
        }

        List<String> imported = new ArrayList<>();
        List<String> failed = new ArrayList<>();

        for (EnterpriseOrgDTO.StudentImportItem item : students) {
            if (item.getEmail() == null || item.getEmail().trim().isEmpty()) {
                continue;
            }
            String email = item.getEmail().trim().toLowerCase();

            try {
                Optional<User> existing = userRepository.findByEmail(email);
                if (existing.isPresent()) {
                    User user = existing.get();
                    user.setRole(User.Role.STUDENT);
                    userRepository.save(user);
                    imported.add(email);
                } else {
                    String username = email.split("@")[0] + "_" + (int)(Math.random() * 1000);
                    User newUser = User.builder()
                            .email(email)
                            .fullName(item.getFullName() != null ? item.getFullName() : username)
                            .password(passwordEncoder.encode("B2bNippon2026!"))
                            .targetLevel(item.getTargetLevel() != null ? item.getTargetLevel() : User.JlptLevel.N5)
                            .jlptLevel(User.JlptLevel.N5)
                            .role(User.Role.STUDENT)
                            .isActive(true)
                            .onboardingCompleted(true)
                            .build();

                    userRepository.save(newUser);
                    imported.add(email);
                }
            } catch (Exception e) {
                log.error("Import student error: {}", email, e);
                failed.add(email);
            }
        }

        org.setActiveSeats(org.getActiveSeats() + imported.size());
        orgRepository.save(org);

        return EnterpriseOrgDTO.BulkImportResponse.builder()
                .successCount(imported.size())
                .totalRequested(students.size())
                .importedEmails(imported)
                .failedEmails(failed)
                .build();
    }

    @Override
    public EnterpriseOrgDTO.AnalyticsResponse getEnterpriseAnalytics() {
        List<EnterpriseOrg> all = orgRepository.findAll();
        long totalOrgs = all.size();
        long totalSeats = all.stream().mapToLong(EnterpriseOrg::getMaxSeats).sum();
        long activeStudents = all.stream().mapToLong(EnterpriseOrg::getActiveSeats).sum();

        return EnterpriseOrgDTO.AnalyticsResponse.builder()
                .totalOrgsCount(totalOrgs)
                .totalSeatsAllocated(totalSeats)
                .totalActiveStudents(activeStudents)
                .avgCompletionRate(82.5)
                .build();
    }

    private EnterpriseOrgDTO.EnterpriseOrgResponse mapToResponse(EnterpriseOrg org) {
        return EnterpriseOrgDTO.EnterpriseOrgResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .code(org.getCode())
                .logoUrl(org.getLogoUrl())
                .maxSeats(org.getMaxSeats())
                .activeSeats(org.getActiveSeats())
                .contactEmail(org.getContactEmail())
                .contactPhone(org.getContactPhone())
                .validUntil(org.getValidUntil())
                .isActive(org.getIsActive())
                .createdAt(org.getCreatedAt())
                .build();
    }
}
