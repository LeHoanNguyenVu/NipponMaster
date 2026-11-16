import axiosClient from './axiosClient';

export interface RetentionCampaign {
  id: number;
  name: string;
  triggerType: 'INACTIVE_7_DAYS';
  emailSubject: string;
  emailTemplateBody: string;
  sentCount: number;
  convertedCount: number;
  isActive: boolean;
  lastRunAt?: string;
  createdAt: string;
}

export interface RunCampaignResponse {
  campaignId: number;
  campaignName: string;
  scannedInactiveCount: number;
  emailSentCount: number;
  message: string;
  targetStudentEmails: string[];
}

export interface RetentionAnalytics {
  totalEmailsSent: number;
  totalStudentsReengaged: number;
  reengagementConversionRate: number;
  activeCampaignsCount: number;
}

export const adminRetentionApi = {
  getCampaigns: async (): Promise<RetentionCampaign[]> => {
    const res: any = await axiosClient.get('/admin/retention/campaigns');
    const data = res?.data ?? res;
    return Array.isArray(data) ? data : [];
  },

  toggleStatus: async (id: number, active: boolean): Promise<RetentionCampaign> => {
    const res: any = await axiosClient.put(`/admin/retention/campaigns/${id}/status`, null, {
      params: { active },
    });
    return res?.data ?? res;
  },

  executeNow: async (id: number): Promise<RunCampaignResponse> => {
    const res: any = await axiosClient.post(`/admin/retention/campaigns/${id}/execute`);
    return res?.data ?? res;
  },

  getAnalytics: async (): Promise<RetentionAnalytics> => {
    const res: any = await axiosClient.get('/admin/retention/analytics');
    return res?.data ?? res;
  },
};
