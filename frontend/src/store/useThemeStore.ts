/**
 * useThemeStore.ts — Multi-Theme Engine
 * Manages global theme state (Default, Sakura, Cyberpunk, Washi Gold, Dark OLED).
 * Persists theme selection to localStorage.
 * Applies CSS class to document root to toggle color palettes defined in index.css.
 */
import { create } from 'zustand';

export type ThemeId = 'default' | 'sakura' | 'cyberpunk' | 'washi_gold' | 'dark';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  nameJP: string;
  emoji: string;
  description: string;
  price: number; // Coins to unlock (0 = free)
  preview: {
    bg: string;
    accent: string;
    text: string;
  };
}

export const THEME_CATALOG: ThemeDefinition[] = [
  {
    id: 'default',
    name: 'Mặc Định (Washi Paper)',
    nameJP: 'デフォルト',
    emoji: '📜',
    description: 'Phong cách giấy Washi truyền thống Nhật Bản ấm áp.',
    price: 0,
    preview: { bg: '#f7f5f0', accent: '#c01538', text: '#231815' },
  },
  {
    id: 'sakura',
    name: 'Sakura Pink (Hoa Anh Đào)',
    nameJP: 'さくらピンク',
    emoji: '🌸',
    description: 'Màu hồng sakura mộng mơ, nhẹ nhàng và tinh tế.',
    price: 500,
    preview: { bg: '#fff0f5', accent: '#e91e8c', text: '#2d1524' },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Tokyo (Đêm Neon)',
    nameJP: 'サイバーパンク東京',
    emoji: '🏙️',
    description: 'Theme tối neon tím xanh huyền ảo phong cách Tokyo ban đêm.',
    price: 1000,
    preview: { bg: '#0a0a14', accent: '#00f0ff', text: '#e0e0ff' },
  },
  {
    id: 'washi_gold',
    name: 'Traditional Washi Gold (Hoàng Gia)',
    nameJP: '和紙ゴールド',
    emoji: '⛩️',
    description: 'Phong cách hoàng gia vàng kim truyền thống trang nghiêm.',
    price: 1500,
    preview: { bg: '#faf6e8', accent: '#b8860b', text: '#2a1f00' },
  },
  {
    id: 'dark',
    name: 'Dark Mode OLED',
    nameJP: 'ダークモード',
    emoji: '🌙',
    description: 'Chế độ tối chuẩn OLED với màu đen sâu bảo vệ mắt.',
    price: 300,
    preview: { bg: '#0a0a0a', accent: '#ff6b6b', text: '#f0f0f0' },
  },
];

interface ThemeState {
  activeTheme: ThemeId;
  unlockedThemes: ThemeId[];
  setTheme: (id: ThemeId) => void;
  unlockTheme: (id: ThemeId) => void;
  isThemeUnlocked: (id: ThemeId) => boolean;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  // Load from localStorage
  const saved = localStorage.getItem('nippon_theme') || 'default';
  const unlockedRaw = localStorage.getItem('nippon_unlocked_themes');
  const unlocked: ThemeId[] = unlockedRaw ? JSON.parse(unlockedRaw) : ['default'];

  // Apply theme class on initial load
  applyThemeClass(saved as ThemeId);

  return {
    activeTheme: saved as ThemeId,
    unlockedThemes: unlocked,
    setTheme: (id: ThemeId) => {
      applyThemeClass(id);
      localStorage.setItem('nippon_theme', id);
      set({ activeTheme: id });
    },
    unlockTheme: (id: ThemeId) => {
      const current = get().unlockedThemes;
      if (!current.includes(id)) {
        const updated = [...current, id];
        localStorage.setItem('nippon_unlocked_themes', JSON.stringify(updated));
        set({ unlockedThemes: updated });
      }
    },
    isThemeUnlocked: (id: ThemeId) => {
      return get().unlockedThemes.includes(id);
    },
  };
});

function applyThemeClass(id: ThemeId) {
  const root = document.documentElement;
  // Remove all theme classes
  root.classList.remove('theme-default', 'theme-sakura', 'theme-cyberpunk', 'theme-washi-gold', 'theme-dark');
  // Apply new one
  root.classList.add(`theme-${id.replace('_', '-')}`);
}
