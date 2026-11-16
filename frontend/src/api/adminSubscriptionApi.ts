import axiosClient from './axiosClient';

export interface SubscriptionPlanItem {
  id: number;
  name: string;
  description: string;
  planType: 'SINGLE_LEVEL' | 'FULL_BUNDLE';
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
  price: number;
  currency: string;
  durationDays: number;
  badge?: string;
  features: string[];
  isActive?: boolean;
}

export interface CreatePlanPayload {
  name: string;
  description?: string;
  planType: 'SINGLE_LEVEL' | 'FULL_BUNDLE';
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  price: number;
  currency?: string;
  durationDays: number;
  badge?: string;
  features?: string[];
}

export interface GrantVipPayload {
  email: string;
  planId?: number;
  customDurationDays?: number;
}

export interface AnalyticsResponse {
  totalRevenue: number;
  totalSubscriptions: number;
  activeVipCount: number;
  topSellingPlan: string;
  totalPlansCount: number;
}

export const adminSubscriptionApi = {
  getAllPlansAdmin: async (): Promise<SubscriptionPlanItem[]> => {
    const res: any = await axiosClient.get('/admin/subscriptions/plans');
    const data = res?.data ?? res;
    return Array.isArray(data) ? data : [];
  },

  createPlan: async (payload: CreatePlanPayload): Promise<SubscriptionPlanItem> => {
    const res: any = await axiosClient.post('/admin/subscriptions/plans', payload);
    return res?.data ?? res;
  },

  updatePlan: async (id: number, payload: CreatePlanPayload): Promise<SubscriptionPlanItem> => {
    const res: any = await axiosClient.put(`/admin/subscriptions/plans/${id}`, payload);
    return res?.data ?? res;
  },

  togglePlanStatus: async (id: number, isActive?: boolean): Promise<SubscriptionPlanItem> => {
    const res: any = await axiosClient.patch(`/admin/subscriptions/plans/${id}/status`, null, {
      params: isActive !== undefined ? { isActive } : {},
    });
    return res?.data ?? res;
  },

  deletePlan: async (id: number): Promise<void> => {
    await axiosClient.delete(`/admin/subscriptions/plans/${id}`);
  },

  grantVipManual: async (payload: GrantVipPayload): Promise<any> => {
    const res: any = await axiosClient.post('/admin/subscriptions/grant-vip', payload);
    return res?.data ?? res;
  },

  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const res: any = await axiosClient.get('/admin/subscriptions/analytics');
    return res?.data ?? res;
  },
};
