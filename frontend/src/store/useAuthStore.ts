import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  streak?: number;
  jlptLevel?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<void>;
  register: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  changeUserRole: (newRole: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const payload = {
        email: credentials.email || credentials.username || credentials.usernameOrEmail,
        password: credentials.password
      };
      const response = await axiosClient.post<any, any>('/auth/login', payload);
      const data = response.data;
      const token = data.accessToken;
      const user = {
        ...data.user,
        username: data.user.fullName || data.user.email,
        role: data.user.role?.toLowerCase()
      };
      
      localStorage.setItem('token', token);
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
      });
      throw err;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.post<any, any>('/auth/register', credentials);
      const data = response.data;
      const token = data.accessToken;
      const user = {
        ...data.user,
        username: data.user.fullName || data.user.email,
        role: data.user.role?.toLowerCase()
      };

      localStorage.setItem('token', token);
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.',
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (err) {
      // Nếu API logout thất bại (ví dụ token hết hạn), vẫn tiếp tục xóa local
      console.warn('Backend logout failed, clearing local session anyway');
    }
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  fetchMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get<any, any>('/auth/me');
      const data = response.data;
      const user = {
        ...data,
        username: data.fullName || data.email,
        role: data.role?.toLowerCase()
      };
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  changeUserRole: async (newRole: string) => {
    try {
      const response = await axiosClient.put<any, any>(`/dashboard/change-role?role=${newRole.toUpperCase()}`);
      const data = response.data.data ?? response.data;
      const user = {
        ...data,
        username: data.fullName || data.email,
        role: data.role?.toLowerCase()
      };
      set({ user });
    } catch (err: any) {
      console.error('Failed to change user role:', err);
    }
  },

  clearError: () => set({ error: null }),
}));
