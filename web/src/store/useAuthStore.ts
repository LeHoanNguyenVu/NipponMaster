import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export interface User {
  id: number;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  jlptLevel: string;
  role: string;
  createdAt: string;
}

interface AuthResponseData {
  accessToken: string;
  tokenType: string;
  user: User;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<User>;
  register: (fullName: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  fetchCurrentUser: () => Promise<User | null>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Load initial state from LocalStorage
  const savedToken = localStorage.getItem('nippon_token');
  let savedUser: User | null = null;
  
  try {
    const userStr = localStorage.getItem('nippon_user');
    if (userStr) savedUser = JSON.parse(userStr);
  } catch (e) {
    localStorage.removeItem('nippon_user');
  }

  return {
    user: savedUser,
    token: savedToken,
    isAuthenticated: !!savedToken && !!savedUser,
    isLoading: false,
    error: null,

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axiosClient.post<any, ApiResponse<AuthResponseData>>(
          '/auth/login',
          { email, password }
        );

        const { accessToken, user } = response.data;

        // Persist to LocalStorage
        localStorage.setItem('nippon_token', accessToken);
        localStorage.setItem('nippon_user', JSON.stringify(user));

        set({
          user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      } catch (err: any) {
        const errMsg = err.message || 'Đăng nhập thất bại';
        set({ error: errMsg, isLoading: false });
        throw new Error(errMsg);
      }
    },

    register: async (fullName, email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axiosClient.post<any, ApiResponse<AuthResponseData>>(
          '/auth/register',
          { fullName, email, password }
        );

        const { accessToken, user } = response.data;

        // Persist to LocalStorage
        localStorage.setItem('nippon_token', accessToken);
        localStorage.setItem('nippon_user', JSON.stringify(user));

        set({
          user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      } catch (err: any) {
        const errMsg = err.message || 'Đăng ký thất bại';
        set({ error: errMsg, isLoading: false });
        throw new Error(errMsg);
      }
    },

    logout: () => {
      localStorage.removeItem('nippon_token');
      localStorage.removeItem('nippon_user');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    },

    fetchCurrentUser: async () => {
      const { token } = get();
      if (!token) return null;

      set({ isLoading: true });
      try {
        const response = await axiosClient.get<any, ApiResponse<User>>('/auth/me');
        const user = response.data;

        localStorage.setItem('nippon_user', JSON.stringify(user));
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      } catch (err) {
        // Token is invalid/expired
        get().logout();
        set({ isLoading: false });
        return null;
      }
    },

    clearError: () => set({ error: null }),
  };
});
