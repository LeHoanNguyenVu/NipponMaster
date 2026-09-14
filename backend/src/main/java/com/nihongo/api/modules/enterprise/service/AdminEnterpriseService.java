package com.nihongo.api.modules.enterprise.service;

import com.nihongo.api.modules.enterprise.dto.EnterpriseOrgDTO;

import java.util.List;

public interface AdminEnterpriseService {

    List<EnterpriseOrgDTO.EnterpriseOrgResponse> getAllOrgs();

    EnterpriseOrgDTO.EnterpriseOrgResponse createOrg(EnterpriseOrgDTO.CreateOrgRequest request);

    EnterpriseOrgDTO.EnterpriseOrgResponse updateOrg(Long id, EnterpriseOrgDTO.CreateOrgRequest request);

    void deleteOrg(Long id);

    EnterpriseOrgDTO.BulkImportResponse bulkImportStudents(Long orgId, EnterpriseOrgDTO.BulkImportRequest request);

    EnterpriseOrgDTO.AnalyticsResponse getEnterpriseAnalytics();
}
