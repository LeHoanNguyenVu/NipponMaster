import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Languages, Palette, Shield, Check, 
  Sparkles, Globe, CloudCheck, Eye
} from 'lucide-react';
import { useSettingsStore, type SupportedLanguage, type FuriganaDisplayMode } from '../store/useSettingsStore';
import { useThemeStore, THEME_CATALOG } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'language' | 'theme' | 'account';
}

export default function SettingsModal({ isOpen, onClose, defaultTab = 'language' }: SettingsModalProps) {
  const { t } = useTranslation(['settings', 'common']);
  const { language, setLanguage, furiganaMode, setFuriganaMode, isSyncing } = useSettingsStore();
  const { activeTheme, setTheme } = useThemeStore();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'language' | 'theme' | 'account'>(defaultTab);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectLanguage = async (newLang: SupportedLanguage) => {
    await setLanguage(newLang);
    setSuccessToast(t('settings:saveSuccess'));
    setTimeout(() => {
      setSuccessToast(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 md:p-6 animate-fade-in">
      <div 
        className="bg-surface-container-lowest border-2 border-outline-variant/80 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-flat overflow-hidden"
        style={{ borderRadius: '2px' }}
      >
        {/* Editorial Top Bar / Hanko Style Header */}
        <div className="px-5 py-4 border-b border-outline-variant/60 flex items-center justify-between bg-surface-container-low/40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-6 bg-primary inline-block flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-bold text-on-surface font-serif tracking-tight">
                  {t('settings:title')}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 border border-primary/40 text-primary">
                  Washi 2.0
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-serif">
                {t('settings:subtitle')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label={t('common:actions.close')}
            className="p-1.5 border border-outline-variant/60 hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation (Editorial Clean Rule Underlines) */}
        <div className="flex border-b border-outline-variant/50 bg-surface-container-low/20 px-5 gap-6 text-xs font-serif font-bold">
          <button
            onClick={() => setActiveTab('language')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'language'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Languages size={15} />
            <span>{t('settings:tabs.language')}</span>
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'theme'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Palette size={15} />
            <span>{t('settings:tabs.theme')}</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Shield size={15} />
            <span>{t('settings:tabs.account')}</span>
          </button>
        </div>

        {/* Toast Notification */}
        {successToast && (
          <div className="mx-5 mt-3 p-2.5 bg-primary/10 border-l-4 border-primary text-primary text-xs font-serif font-bold flex items-center justify-between animate-fade-in">
            <span className="flex items-center gap-2">
              <Check size={14} /> {successToast}
            </span>
            <span className="text-[10px] opacity-75">Auto-saved</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-on-surface">
          {/* TAB 1: NGÔN NGỮ & KIỂU CHỮ */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              {/* Section 1: Language Selection Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold font-serif text-on-surface flex items-center gap-2">
                      <Globe size={15} className="text-primary" />
                      <span>{t('settings:languageSection.title')}</span>
                    </h4>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      {t('settings:languageSection.description')}
                    </p>
                  </div>
                  {isSyncing && (
                    <span className="text-[10px] text-primary flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Syncing...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* Option 1: Tiếng Việt */}
                  <div
                    onClick={() => handleSelectLanguage('vi')}
                    className={`relative p-4 border transition-all cursor-pointer text-left ${
                      language === 'vi'
                        ? 'border-primary bg-primary/5 shadow-flat ring-1 ring-primary'
                        : 'border-outline-variant/70 hover:border-outline hover:bg-surface-container-low/40'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl select-none" role="img" aria-label="Vietnam">🇻🇳</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold font-serif text-on-surface">
                              {t('settings:languageSection.options.vi.name')}
                            </p>
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 border border-outline-variant/60 text-outline">
                              {t('settings:languageSection.options.vi.tag')}
                            </span>
                          </div>
                          <p className="text-[11px] text-primary font-bold font-serif mt-0.5">
                            {t('settings:languageSection.options.vi.fontName')}
                          </p>
                        </div>
                      </div>
                      {language === 'vi' && (
                        <div className="w-5 h-5 bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                          <Check size={13} />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-serif mt-2.5 leading-snug">
                      {t('settings:languageSection.options.vi.description')}
                    </p>
                  </div>

                  {/* Option 2: English */}
                  <div
                    onClick={() => handleSelectLanguage('en')}
                    className={`relative p-4 border transition-all cursor-pointer text-left ${
                      language === 'en'
                        ? 'border-primary bg-primary/5 shadow-flat ring-1 ring-primary'
                        : 'border-outline-variant/70 hover:border-outline hover:bg-surface-container-low/40'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl select-none" role="img" aria-label="English">🇬🇧</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold font-serif text-on-surface">
                              {t('settings:languageSection.options.en.name')}
                            </p>
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 border border-outline-variant/60 text-outline">
                              {t('settings:languageSection.options.en.tag')}
                            </span>
                          </div>
                          <p className="text-[11px] text-primary font-bold font-serif mt-0.5">
                            {t('settings:languageSection.options.en.fontName')}
                          </p>
                        </div>
                      </div>
                      {language === 'en' && (
                        <div className="w-5 h-5 bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                          <Check size={13} />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-serif mt-2.5 leading-snug">
                      {t('settings:languageSection.options.en.description')}
                    </p>
                  </div>
                </div>

                {/* Cloud Sync Status Note */}
                <div className="p-2.5 bg-surface-container-low border border-outline-variant/40 flex items-center gap-2 text-[11px] text-on-surface-variant font-serif">
                  <CloudCheck size={15} className="text-emerald-600 flex-shrink-0" />
                  <span>{t('settings:languageSection.syncNotice')}</span>
                </div>
              </div>

              {/* Section 2: Live Typography Specimen Box */}
              <div className="space-y-2.5 pt-2 border-t border-outline-variant/40">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-serif text-outline flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-600" />
                    <span>{t('settings:typographySection.title')}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-outline">
                    lang="{language}" · {language === 'vi' ? 'Times New Roman' : 'Georgia'} + Noto Serif JP
                  </span>
                </div>

                <div 
                  className="p-4 bg-surface-container-low/60 border border-outline-variant/80 space-y-3 shadow-inner"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                      {t('settings:typographySection.latinLabel')}
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-on-surface font-serif italic">
                      {t('settings:typographySection.latinSample')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/30 space-y-1">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                      {t('settings:typographySection.japaneseLabel')}
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-on-surface font-serif">
                      {t('settings:typographySection.japaneseSample')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Furigana Settings */}
              <div className="space-y-2.5 pt-2 border-t border-outline-variant/40">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-serif text-outline flex items-center gap-1.5">
                    <Eye size={14} className="text-indigo-600" />
                    <span>{t('settings:furiganaSection.title')}</span>
                  </h4>
                  <p className="text-[11px] text-on-surface-variant font-serif">
                    {t('settings:furiganaSection.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {(['always', 'hover', 'hide'] as FuriganaDisplayMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFuriganaMode(mode)}
                      className={`p-2.5 border text-left text-xs font-serif transition-all cursor-pointer ${
                        furiganaMode === mode
                          ? 'border-primary bg-primary/10 font-bold text-primary shadow-flat'
                          : 'border-outline-variant/50 hover:bg-surface-container-low text-on-surface'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{t(`settings:furiganaSection.${mode}`)}</span>
                        {furiganaMode === mode && <Check size={13} className="text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GIAO DIỆN & MÀU SẮC */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-serif text-on-surface">
                  {t('settings:themeSection.title', t('settings:tabs.theme'))}
                </h4>
                <p className="text-[11px] text-on-surface-variant font-serif">
                  {t('settings:themeSection.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {THEME_CATALOG.map((theme) => {
                  const isSelected = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`p-3.5 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-flat ring-1 ring-primary'
                          : 'border-outline-variant/60 bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl select-none">{theme.emoji}</span>
                        <div>
                          <p className="font-bold text-xs font-serif">{theme.name}</p>
                          <p className="text-[10px] text-outline font-serif">{theme.description}</p>
                        </div>
                      </div>
                      {isSelected && <Check size={16} className="text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TÀI KHOẢN & BẢO MẬT */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low border border-outline-variant/60 space-y-2" style={{ borderRadius: '2px' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider font-serif text-outline">
                  {t('settings:accountSection.accountDetails')}
                </h4>
                <div className="text-xs font-serif space-y-1.5 text-on-surface">
                  <p>• {t('settings:accountSection.fullName')}: <strong>{user?.fullName || user?.username || t('settings:accountSection.studentFallback')}</strong></p>
                  <p>• {t('settings:accountSection.email')}: <strong>{user?.email || 'student@nipponmaster.com'}</strong></p>
                  <p>• {t('settings:accountSection.role')}: <span className="uppercase font-bold text-primary font-mono">{user?.role || 'STUDENT'}</span></p>
                  <p>• {t('settings:accountSection.jlptLevel')}: <strong>{user?.jlptLevel || 'STARTER'}</strong></p>
                  <p>• {t('settings:accountSection.savedLanguage')}: <span className="font-mono text-emerald-600 font-bold">{language.toUpperCase()}</span></p>
                </div>
              </div>

              {/* Session & Security Info */}
              <div className="p-4 bg-surface-container-low border border-outline-variant/60 space-y-2.5" style={{ borderRadius: '2px' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider font-serif text-outline flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-600" />
                  <span>{t('settings:accountSection.securityTitle')}</span>
                </h4>
                <div className="text-xs font-serif space-y-1.5 text-on-surface">
                  <p>• {t('settings:accountSection.browser')}: <strong>{typeof navigator !== 'undefined' && navigator.userAgent.includes('Chrome') ? 'Google Chrome' : 'Web Browser'}</strong></p>
                  <p>• {t('settings:accountSection.os')}: <strong>{typeof navigator !== 'undefined' ? (navigator.platform || 'Windows / macOS') : 'Windows'}</strong></p>
                  <p>• {t('settings:accountSection.sessionStatus')}: <span className="text-emerald-600 font-bold font-mono">{t('settings:accountSection.sessionActive')}</span></p>
                  <p>• {t('settings:accountSection.encryption')}: <span className="text-indigo-600 font-semibold font-mono">{t('settings:accountSection.encryptionValue')}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-outline-variant/60 bg-surface-container-low/40 flex items-center justify-between">
          <span className="text-[11px] text-outline font-serif">
            NipponMaster Editorial Architecture © 2026
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary text-xs font-serif font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-flat"
            style={{ borderRadius: '2px' }}
          >
            {t('common:actions.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
