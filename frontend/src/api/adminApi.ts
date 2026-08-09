import axiosClient from './axiosClient';

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'STUDENT' | 'TEACHER' | 'GUEST' | 'USER';
  jlptLevel?: string;
  targetLevel?: string;
  isActive: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserFilterPayload {
  role?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  size?: number;
}

export const adminApi = {
  getUsers: async (params?: AdminUserFilterPayload): Promise<{ content: AdminUser[]; totalElements: number; totalPages: number }> => {
    const res = await axiosClient.get<any, any>('/admin/users', { params });
    const pageData = res.data ?? res;
    return {
      content: pageData.content || pageData,
      totalElements: pageData.totalElements || pageData.length || 0,
      totalPages: pageData.totalPages || 1,
    };
  },

  getUserById: async (id: number): Promise<AdminUser> => {
    const res = await axiosClient.get<any, any>(`/admin/users/${id}`);
    return res.data ?? res;
  },

  updateUserStatus: async (id: number, isActive: boolean): Promise<AdminUser> => {
    const res = await axiosClient.put<any, any>(`/admin/users/${id}/status`, { isActive });
    return res.data ?? res;
  },

  updateUserRole: async (id: number, role: string): Promise<AdminUser> => {
    const res = await axiosClient.put<any, any>(`/admin/users/${id}/role`, { role });
    return res.data ?? res;
  },

  resetPassword: async (id: number, newPassword: string): Promise<void> => {
    await axiosClient.post(`/admin/users/${id}/reset-password`, { newPassword });
  },

  bulkUpdateStatus: async (userIds: number[], isActive: boolean): Promise<void> => {
    await axiosClient.put('/admin/users/bulk-status', { userIds, isActive });
  },
};
