import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  LayoutDashboard,
  Shapes,
  BookOpen,
  Newspaper,
  Target,
  BookType,
  CreditCard,
  X,
  GraduationCap,
  Lock,
  Bot,
  ChevronsRight,
  ChevronsLeft,
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

const SIDEBAR_COLLAPSED_KEY = 'nippon_sidebar_collapsed';

export default function Sidebar({ currentScreen, onNavigate, isOpen, onClose }: SidebarProps) {
  const { t, i18n } = useTranslation(['sidebar', 'common']);
  const isEn = (i18n.language || 'vi').startsWith('en');
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { user } = useAuthStore();
  const role = (user?.role || '').toLowerCase();
  const isAdmin = role === 'admin' || role === 'system';
  const isStaff = isAdmin || role === 'teacher';
  const rawLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
  const isStarter = !isStaff && rawLevel === 'STARTER' && !isBeginnerGraduated();

  // Mặc định thu gọn trên desktop (chỉ hiện icon + nút >> mở rộng) để ưu tiên diện tích nội dung
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (saved === 'false') return false;
    } catch {}
    return true;
  });

  const [hoveredTip, setHoveredTip] = useState<{ label: string; top: number; left: number } | null>(null);

  const toggleCollapsed = () => {
    setHoveredTip(null);
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {}
      return next;
    });
  };

  const allNavItems = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'beginner', icon: GraduationCap },
    { id: 'kanji', icon: Shapes },
    { id: 'grammar', icon: BookOpen },
    { id: 'reading', icon: Newspaper },
    { id: 'exams', icon: Target },
    { id: 'translation', icon: BookType },
    { id: 'sensei', icon: Bot },
    { id: 'pricing', icon: CreditCard },
  ];

  const navItems = isAdmin
    ? allNavItems.filter((item) => item.id !== 'beginner')
    : isStarter
      ? allNavItems.filter((item) => ['dashboard', 'beginner', 'translation', 'sensei', 'pricing'].includes(item.id))
      : allNavItems;

  // GSAP animation for active item transitions
  useEffect(() => {
    const activeBtn = buttonRefs.current[currentScreen];
    if (activeBtn) {
      gsap.fromTo(
        activeBtn,
        { scale: 0.96, x: -2 },
        { scale: 1, x: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
      );

      const icon = activeBtn.querySelector('svg');
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0.85 },
          { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    }
  }, [currentScreen]);

  // Mobile drawer luôn hiển thị đầy đủ chữ; desktop tuân theo trạng thái isCollapsed
  const desktopCollapsed = isCollapsed && !isOpen;

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
      <nav
        className={`flex-shrink-0 bg-surface-container-low border-r border-outline-variant/60 flex flex-col z-50
          fixed inset-y-0 left-0 transform transition-all duration-200 md:relative md:translate-x-0
          ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${desktopCollapsed ? 'md:w-[80px]' : 'md:w-64'}
        `}
      >
        <div
          className={`flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar ${
            desktopCollapsed ? 'px-2 py-3' : 'p-5'
          }`}
        >
          <div>
            {/* Editorial Brand Header + Desktop Collapse/Expand (>> / <<) Toggle */}
            <div
              className={`flex items-center mb-6 pb-4 border-b border-outline-variant/40 ${
                desktopCollapsed ? 'justify-center gap-1.5' : 'justify-between gap-2'
              }`}
            >
              <div className={`flex items-center ${desktopCollapsed ? 'shrink-0' : 'gap-2.5 min-w-0'}`}>
                <div
                  className={`${
                    desktopCollapsed ? 'w-7 h-7 text-sm' : 'w-8 h-8 text-base'
                  } shrink-0 bg-primary text-on-primary flex items-center justify-center font-bold font-serif shadow-flat select-none`}
                  style={{ borderRadius: '2px' }}
                >
                  日
                </div>
                {!desktopCollapsed && (
                  <div className="min-w-0">
                    <span className="text-lg font-bold text-primary tracking-tight font-serif block leading-none truncate">
                      {t('sidebar:brand')}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-outline font-serif block mt-0.5">
                      Editorial Washi
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop >> / << Toggle Button */}
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-label={
                  isCollapsed
                    ? isEn
                      ? 'Expand sidebar'
                      : 'Mở rộng thanh điều hướng'
                    : isEn
                      ? 'Collapse sidebar'
                      : 'Thu gọn thanh điều hướng'
                }
                title={
                  isCollapsed
                    ? isEn
                      ? 'Expand navigation'
                      : 'Mở rộng thanh điều hướng'
                    : isEn
                      ? 'Collapse navigation'
                      : 'Thu gọn thanh điều hướng'
                }
                className={`hidden md:inline-flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-surface transition-colors cursor-pointer shrink-0 border border-outline-variant/60 bg-surface/80 ${
                  desktopCollapsed ? 'w-6 h-7' : 'p-1.5'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {isCollapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={16} />}
              </button>

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="p-1.5 hover:bg-surface-container-high text-on-surface-variant md:hidden cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav list with Washi active indicator */}
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
                      type="button"
                      aria-label={label}
                      title={desktopCollapsed ? label : undefined}
                      onMouseEnter={(e) => {
                        if (!desktopCollapsed) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredTip({
                          label,
                          top: rect.top + rect.height / 2,
                          left: rect.right + 10,
                        });
                      }}
                      onMouseLeave={() => setHoveredTip(null)}
                      onFocus={(e) => {
                        if (!desktopCollapsed) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredTip({
                          label,
                          top: rect.top + rect.height / 2,
                          left: rect.right + 10,
                        });
                      }}
                      onBlur={() => setHoveredTip(null)}
                      onClick={() => {
                        setHoveredTip(null);
                        onNavigate(item.id as ScreenType);
                        onClose();
                      }}
                      className={`w-full flex items-center text-xs font-serif transition-all cursor-pointer ${
                        desktopCollapsed
                          ? 'justify-center px-0 py-2.5'
                          : 'gap-3 px-3.5 py-2.5'
                      } ${
                        isActive
                          ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary shadow-2xs'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-l-4 border-transparent'
                      }`}
                      style={{ borderRadius: '1px' }}
                    >
                      <Icon
                        size={18}
                        className={isActive ? 'text-primary shrink-0' : 'text-on-surface-variant shrink-0'}
                      />
                      {!desktopCollapsed && <span className="truncate">{label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Level Lock Card (chỉ hiện khi mở rộng) */}
            {isStarter && !desktopCollapsed && (
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
          <div
            className={`pt-4 border-t border-outline-variant/40 text-[10px] text-outline font-serif flex items-center ${
              desktopCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            {!desktopCollapsed && <span>NipponMaster v2.0</span>}
            <span
              className="w-1.5 h-1.5 bg-emerald-500 inline-block"
              style={{ borderRadius: '1px' }}
              title="NipponMaster v2.0"
            />
          </div>
        </div>
      </nav>

      {/* Portal Tooltip khi hover icon lúc Sidebar đang thu gọn (không bao giờ bị cắt bởi overflow) */}
      {desktopCollapsed &&
        hoveredTip &&
        createPortal(
          <div
            role="tooltip"
            style={{
              top: hoveredTip.top,
              left: hoveredTip.left,
              transform: 'translateY(-50%)',
              borderRadius: '2px',
            }}
            className="fixed z-[120] pointer-events-none px-2.5 py-1.5 bg-on-surface text-surface text-xs font-serif font-semibold shadow-lg whitespace-nowrap border border-outline-variant/20"
          >
            {hoveredTip.label}
          </div>,
          document.body
        )}
    </>
  );
}
