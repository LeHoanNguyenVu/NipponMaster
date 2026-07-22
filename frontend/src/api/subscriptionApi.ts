import axiosClient from './axiosClient';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  planType: 'SINGLE_LEVEL' | 'FULL_BUNDLE';
  jlptLevel: string | null;
  price: number;
  currency: string;
  durationDays: number;
  badge: string | null;
  features: string[];
}

export interface UserSubscription {
  id: number;
  planId: number;
  planName: string;
  planType: string;
  jlptLevel: string;
  status: string;
  paymentProvider: string;
  paymentId: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface AccessInfo {
  subscriptionStatus: 'NONE' | 'ACTIVE' | 'EXPIRED';
  hasFullAccess: boolean;
  accessibleLevels: string[];
  previewLimit: number;
}

export const subscriptionApi = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    const res = await axiosClient.get<any, any>('/subscriptions/plans');
    return res.data ?? res;
  },

  getMySubscriptions: async (): Promise<UserSubscription[]> => {
    const res = await axiosClient.get<any, any>('/subscriptions/my');
    return res.data ?? res;
  },

  getAccessInfo: async (): Promise<AccessInfo> => {
    const res = await axiosClient.get<any, any>('/subscriptions/access');
    return res.data ?? res;
  },

  createCheckout: async (planId: number): Promise<any> => {
    const res = await axiosClient.post<any, any>('/payments/checkout', { planId });
    return res.data ?? res;
  },
};
