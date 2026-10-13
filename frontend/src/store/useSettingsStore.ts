import { create } from 'zustand';
import i18n, { type SupportedLanguage } from '../i18n';
import axiosClient from '../api/axiosClient';

export type { SupportedLanguage };
export type FuriganaDisplayMode = 'always' | 'hover' | 'hide';

interface SettingsState {
  language: SupportedLanguage;
  furiganaMode: FuriganaDisplayMode;
  isSyncing: boolean;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  setFuriganaMode: (mode: FuriganaDisplayMode) => void;
  syncFromServer: (serverLang?: string) => void;
}

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'vi';
  const stored = localStorage.getItem('nippon_preferred_language');
  if (stored === 'en' || stored === 'vi') return stored;
  const browserLang = navigator.language?.toLowerCase() || '';
  return browserLang.startsWith('en') ? 'en' : 'vi';
};

const getInitialFurigana = (): FuriganaDisplayMode => {
  if (typeof window === 'undefined') return 'always';
  const stored = localStorage.getItem('nippon_furigana_mode') as FuriganaDisplayMode;
  return stored || 'always';
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  language: getInitialLanguage(),
  furiganaMode: getInitialFurigana(),
  isSyncing: false,

  setLanguage: async (lang: SupportedLanguage) => {
    const current = get().language;
    if (current === lang) return;

    set({ language: lang });
    localStorage.setItem('nippon_preferred_language', lang);
    await i18n.changeLanguage(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }

    // Attempt cloud sync if token exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      set({ isSyncing: true });
      try {
        await axiosClient.patch('/auth/preferences', { preferredLanguage: lang });
      } catch (err) {
        console.warn('Could not sync preferred language to server:', err);
      } finally {
        set({ isSyncing: false });
      }
    }
  },

  setFuriganaMode: (mode: FuriganaDisplayMode) => {
    set({ furiganaMode: mode });
    localStorage.setItem('nippon_furigana_mode', mode);
  },

  syncFromServer: (serverLang?: string) => {
    if (!serverLang) return;
    const normalized = serverLang.trim().toLowerCase() === 'en' ? 'en' : 'vi';
    const current = get().language;
    if (current !== normalized) {
      set({ language: normalized });
      localStorage.setItem('nippon_preferred_language', normalized);
      i18n.changeLanguage(normalized);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = normalized;
      }
    }
  },
}));
