package com.nihongo.api.modules.admin.service;

import com.nihongo.api.modules.admin.dto.AdminDashboardDTO;

public interface AdminDashboardService {

    AdminDashboardDTO.OverviewResponse getRealOverviewStats();
}
