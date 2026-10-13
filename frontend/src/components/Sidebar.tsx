import { useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Shapes, BookOpen, Target, BookType, 
  CreditCard, X, GraduationCap, Headphones, Lock 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ScreenType } from '../App';
import { useAuthStore } from '../store/useAuthStore';
import { isBeginnerGraduated } from '../utils/beginnerProgressManager';
import gsap from 'gsap';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation(['sidebar', 'common']);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { user } = useAuthStore();
  const rawLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
  const isStarter = rawLevel === 'STARTER' && !isBeginnerGraduated();

  const allNavItems = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'beginner', icon: GraduationCap },
    { id: 'kanji', icon: Shapes },
    { id: 'grammar', icon: BookOpen },
    { id: 'exams', icon: Target },
    { id: 'translation', icon: BookType },
    { id: 'listening', icon: Headphones },
    { id: 'pricing', icon: CreditCard },
  ];

  // Ở level Nhập Môn: Chỉ hiện đúng 4 mục (Dashboard, Nhập Môn, Dịch, Gói học).
  // Khi lên N5: Hiển thị đầy đủ toàn bộ 8 module!
  const navItems = isStarter
    ? allNavItems.filter((item) => ['dashboard', 'beginner', 'translation', 'pricing'].includes(item.id))
    : allNavItems;

  // GSAP animation for active item transitions
  useEffect(() => {
    const activeBtn = buttonRefs.current[currentScreen];
    if (activeBtn) {
      gsap.fromTo(activeBtn,
        { scale: 0.96, x: -2 },
        { scale: 1, x: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
      );

      const icon = activeBtn.querySelector('svg');
      if (icon) {
        gsap.fromTo(icon,
          { scale: 0.85 },
          { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    }
  }, [currentScreen]);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/55 z-40 md:hidden transition-opacity duration-300 backdrop-blur-xs"
        />
      )}

      {/* Sidebar container */}
      <nav className={`w-64 flex-shrink-0 bg-surface-container-low border-r border-outline-variant/60 flex flex-col z-50
        fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            {/* Editorial Brand Header */}
            <div className="flex items-center justify-between gap-2 mb-7 pb-4 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center font-bold text-base font-serif shadow-flat select-none"
                  style={{ borderRadius: '2px' }}
                >
                  日
                </div>
                <div>
                  <span className="text-lg font-bold text-primary tracking-tight font-serif block leading-none">
                    {t('sidebar:brand')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-outline font-serif">
                    Editorial Washi
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                aria-label="Close menu"
                className="p-1.5 hover:bg-surface-container-high text-on-surface-variant md:hidden cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Nav list with Washi active indicator (left red rule) */}
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentScreen === item.id;
                const Icon = item.icon;
                const label = t(`sidebar:modules.${item.id}`);
                return (
                  <li key={item.id}>
                    <button
                      ref={(el) => {
                        buttonRefs.current[item.id] = el;
                      }}
                      onClick={() => {
                        onNavigate(item.id as ScreenType);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-serif transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary shadow-2xs'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-l-4 border-transparent'
                      }`}
                      style={{ borderRadius: '1px' }}
                    >
                      <Icon size={17} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                      <span className="truncate">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Level Lock Card */}
            {isStarter && (
              <div 
                className="mt-6 p-3.5 bg-surface-container/60 border border-outline-variant/40 text-xs text-on-surface-variant space-y-1.5 font-serif shadow-2xs"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-primary">
                  <Lock size={13} />
                  <span>{t('sidebar:lockedNotice.title')}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-on-surface-variant/90">
                  {t('sidebar:lockedNotice.desc')}
                </p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-outline-variant/40 text-[10px] text-outline font-serif flex items-center justify-between">
            <span>NipponMaster v2.0</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 inline-block" style={{ borderRadius: '1px' }} />
          </div>
        </div>
      </nav>
    </>
  );
}
