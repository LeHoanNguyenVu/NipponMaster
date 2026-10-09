import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role?: string;
  streak?: number;
  jlptLevel?: string;
  targetLevel?: string;
  onboardingCompleted?: boolean;
  subscriptionStatus?: 'NONE' | 'ACTIVE' | 'EXPIRED';
}

interface SocialLoginData {
  provider: 'GOOGLE' | 'FACEBOOK';
  idToken: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: any, rememberDevice?: boolean) => Promise<void>;
  register: (credentials: any, rememberDevice?: boolean) => Promise<void>;
  loginWithSocial: (data: SocialLoginData, rememberDevice?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  changeUserRole: (newRole: string) => Promise<void>;
  clearError: () => void;
  completeOnboarding: (targetLevel: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  updateUserAvatar: (avatarUrl: string) => Promise<void>;
  updateUserLevel: (level: string) => Promise<void>;
}

export const clearUserLocalProgress = () => {
  const keysToRemove = [
    'nippon_user_level',
    'nippon_user_mode',
    'nippon_chapter_1_quiz_score',
    'nippon_chapter_2_quiz_score',
    'nippon_chapter_3_quiz_score',
    'nippon_chapter_4_quiz_score',
    'nippon_chapter_5_quiz_score',
    'beginner_course_progress',
    'nippon_student_stats_v3',
    'nippon_quick_cards_cache',
    'nippon_master_comprehensive_quiz_scores',
    'nippon_learned_kana_rows',
    'nippon_card_srs_records_v1',
  ];
  keysToRemove.forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {}
  });
};

const getStoredToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  isLoading: false,
  error: null,

  login: async (credentials, rememberDevice = true) => {
    set({ isLoading: true, error: null });
    try {
      const payload = {
        email: credentials.email || credentials.username || credentials.usernameOrEmail,
        password: credentials.password
      };
      const response = await axiosClient.post<any, any>('/auth/login', payload);
      const data = response?.data ?? response;
      const token = data.accessToken;
      const userEmail = data.user.email || data.user.username;
      const lastEmail = localStorage.getItem('nippon_current_user_email');
      if (lastEmail && lastEmail.toLowerCase() !== userEmail.toLowerCase()) {
        clearUserLocalProgress();
      }
      localStorage.setItem('nippon_current_user_email', userEmail.toLowerCase());

      const resolvedLevel = (data.user.jlptLevel || 'STARTER').toUpperCase();
      localStorage.setItem('nippon_user_level', resolvedLevel);

      const user = {
        ...data.user,
        username: data.user.fullName || data.user.email,
        role: data.user.role?.toLowerCase(),
        jlptLevel: resolvedLevel,
      };
      
      if (rememberDevice) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token');
      }

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

  register: async (credentials, rememberDevice = true) => {
    set({ isLoading: true, error: null });
    clearUserLocalProgress();
    try {
      const response = await axiosClient.post<any, any>('/auth/register', credentials);
      const data = response?.data ?? response;
      const token = data.accessToken;
      const userEmail = data.user.email || data.user.username;
      localStorage.setItem('nippon_current_user_email', userEmail.toLowerCase());
      localStorage.setItem('nippon_user_level', 'STARTER');

      const user = {
        ...data.user,
        username: data.user.fullName || data.user.email,
        role: data.user.role?.toLowerCase(),
        jlptLevel: 'STARTER',
      };

      if (rememberDevice) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token');
      }

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

  loginWithSocial: async (data: SocialLoginData, rememberDevice = true) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.post<any, any>('/auth/oauth2/login', data);
      const resData = response?.data ?? response;
      const token = resData.accessToken;
      const user = {
        ...resData.user,
        username: resData.user.fullName || resData.user.email,
        role: resData.user.role?.toLowerCase()
      };

      if (rememberDevice) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token');
      }

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
        error: err.message || 'Đăng nhập Social OAuth2 thất bại.',
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (err) {
      console.warn('Backend logout failed, clearing local session anyway');
    }
    clearUserLocalProgress();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('nippon_current_user_email');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  fetchMe: async () => {
    const token = getStoredToken();
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get<any, any>('/auth/me');
      const data = response?.data ?? response;
      const userEmail = data.email || data.username;
      const lastEmail = localStorage.getItem('nippon_current_user_email');
      if (lastEmail && lastEmail.toLowerCase() !== userEmail.toLowerCase()) {
        clearUserLocalProgress();
      }
      localStorage.setItem('nippon_current_user_email', userEmail.toLowerCase());

      const resolvedLevel = (data.jlptLevel || 'STARTER').toUpperCase();
      localStorage.setItem('nippon_user_level', resolvedLevel);

      const cachedAvatar = localStorage.getItem(`user_avatar_${data.email || data.id}`) || data.avatarUrl;
      const user = {
        ...data,
        avatarUrl: cachedAvatar || data.avatarUrl,
        username: data.fullName || data.email,
        role: data.role?.toLowerCase(),
        jlptLevel: resolvedLevel,
        targetLevel: data.targetLevel ?? null,
        onboardingCompleted: data.onboardingCompleted ?? true,
        subscriptionStatus: data.subscriptionStatus ?? 'NONE',
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

  completeOnboarding: async (targetLevel: string) => {
    try {
      await axiosClient.put('/users/me/onboarding', { targetLevel });
      const upperLevel = targetLevel.toUpperCase();
      localStorage.setItem('nippon_user_level', upperLevel);
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              targetLevel,
              jlptLevel: upperLevel,
              onboardingCompleted: true,
              role: 'student',
            }
          : null,
      }));
    } catch (err: any) {
      console.error('Onboarding completion failed:', err);
      throw err;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      await axiosClient.post('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
    } catch (err: any) {
      const msg = err?.message || err?.error || (typeof err === 'string' ? err : 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại.');
      throw new Error(msg);
    }
  },

  updateUserAvatar: async (avatarUrl: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, avatarUrl } : null,
    }));
    try {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        localStorage.setItem(`user_avatar_${currentUser.email || currentUser.id}`, avatarUrl);
      }
      localStorage.setItem('user_avatar_global', avatarUrl);
      await axiosClient.put('/auth/avatar', { avatarUrl });
    } catch (e) {
      console.error('Failed to sync avatar to backend:', e);
    }
  },

  updateUserLevel: async (level: string) => {
    const upper = level.toUpperCase();
    set((state) => ({
      user: state.user ? { ...state.user, jlptLevel: upper } : null,
    }));
    try {
      localStorage.setItem('nippon_user_level', upper);
      await axiosClient.put(`/dashboard/level?level=${upper}`);
    } catch (e) {
      console.warn('Failed to sync level to backend:', e);
    }
  },
}));
