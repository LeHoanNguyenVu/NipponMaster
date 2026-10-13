import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import locales
import viCommon from '../locales/vi/common.json';
import viSettings from '../locales/vi/settings.json';
import viTopbar from '../locales/vi/topbar.json';
import viSidebar from '../locales/vi/sidebar.json';
import viDashboard from '../locales/vi/dashboard.json';
import viBeginner from '../locales/vi/beginner.json';
import viKanji from '../locales/vi/kanji.json';
import viGrammar from '../locales/vi/grammar.json';
import viExams from '../locales/vi/exams.json';
import viTranslation from '../locales/vi/translation.json';
import viListening from '../locales/vi/listening.json';
import viPricing from '../locales/vi/pricing.json';
import viOnboarding from '../locales/vi/onboarding.json';
import viAuth from '../locales/vi/auth.json';

import enCommon from '../locales/en/common.json';
import enSettings from '../locales/en/settings.json';
import enTopbar from '../locales/en/topbar.json';
import enSidebar from '../locales/en/sidebar.json';
import enDashboard from '../locales/en/dashboard.json';
import enBeginner from '../locales/en/beginner.json';
import enKanji from '../locales/en/kanji.json';
import enGrammar from '../locales/en/grammar.json';
import enExams from '../locales/en/exams.json';
import enTranslation from '../locales/en/translation.json';
import enListening from '../locales/en/listening.json';
import enPricing from '../locales/en/pricing.json';
import enOnboarding from '../locales/en/onboarding.json';
import enAuth from '../locales/en/auth.json';

export const defaultNS = 'common';
export const resources = {
  vi: {
    common: viCommon,
    settings: viSettings,
    topbar: viTopbar,
    sidebar: viSidebar,
    dashboard: viDashboard,
    beginner: viBeginner,
    kanji: viKanji,
    grammar: viGrammar,
    exams: viExams,
    translation: viTranslation,
    listening: viListening,
    pricing: viPricing,
    onboarding: viOnboarding,
    auth: viAuth,
  },
  en: {
    common: enCommon,
    settings: enSettings,
    topbar: enTopbar,
    sidebar: enSidebar,
    dashboard: enDashboard,
    beginner: enBeginner,
    kanji: enKanji,
    grammar: enGrammar,
    exams: enExams,
    translation: enTranslation,
    listening: enListening,
    pricing: enPricing,
    onboarding: enOnboarding,
    auth: enAuth,
  },
} as const;

export type SupportedLanguage = 'vi' | 'en';

const syncHtmlLangAttribute = (lang: string) => {
  const normalized = lang.startsWith('en') ? 'en' : 'vi';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalized;
    document.title = normalized === 'en'
      ? 'NipponMaster - Smart Japanese Learning Platform N5 - N1'
      : 'NipponMaster - Hệ Thống Học Tiếng Nhật N5 - N1 Thông Minh';
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    defaultNS,
    ns: [
      'common',
      'settings',
      'topbar',
      'sidebar',
      'dashboard',
      'beginner',
      'kanji',
      'grammar',
      'exams',
      'translation',
      'listening',
      'pricing',
      'onboarding',
      'auth',
    ],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'nippon_preferred_language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Apply initial <html lang="...">
syncHtmlLangAttribute(i18n.language || 'vi');

// Listen to language changes and keep <html lang="..."> updated
i18n.on('languageChanged', (lang) => {
  syncHtmlLangAttribute(lang);
});

export default i18n;
