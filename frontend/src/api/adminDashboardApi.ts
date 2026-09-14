import axiosClient from './axiosClient';

export interface JlptLevelStat {
  level: string;
  count: number;
  percent: number;
}

export interface MonthlyRevenueStat {
  month: string;
  revenueMillionVnd: number;
  students: number;
}

export interface ActivityLogItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  timeAgo: string;
}

export interface AdminOverviewData {
  totalUsers: number;
  vipStudentsCount: number;
  teacherCount: number;
  cumulativeRevenue: number;
  b2bOrgsCount: number;
  b2bTotalSeats: number;
  b2bUsedSeats: number;
  securityHealthScore: number;
  jlptDistribution: JlptLevelStat[];
  monthlyRevenueList: MonthlyRevenueStat[];
  activityLogs: ActivityLogItem[];
  cpuUsagePercent: number;
  jvmMemoryUsedMb: number;
  jvmMemoryTotalMb: number;
  activeDbConnections: number;
  apiLatencyMs: number;
}

export const adminDashboardApi = {
  getOverview: async (): Promise<AdminOverviewData> => {
    const res: any = await axiosClient.get('/admin/dashboard/overview');
    // axiosClient interceptor returns response.data (ApiResponse { success, message, data })
    return res.data ? res.data : res;
  },
};
