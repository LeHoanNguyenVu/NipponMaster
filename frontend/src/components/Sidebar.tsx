import { useRef, useEffect } from 'react';
import { LayoutDashboard, Languages, Shapes, BookOpen, Layers, Target, BookType, CreditCard, X, Mic, GraduationCap, Swords, Trophy, Headphones } from 'lucide-react';
import type { ScreenType } from '../App';
import gsap from 'gsap';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, isOpen, onClose }: SidebarProps) {
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'beginner', label: 'Nhập Môn', icon: GraduationCap },
    { id: 'battle', label: 'Đấu Trường 1v1', icon: Swords },
    { id: 'vocabulary', label: 'Vocabulary', icon: Languages },
    { id: 'kanji', label: 'Kanji', icon: Shapes },
    { id: 'grammar', label: 'Grammar', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'exams', label: 'Exams', icon: Target },
    { id: 'translation', label: 'Translation', icon: BookType },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'listening', label: 'Luyện Nghe', icon: Headphones },
    { id: 'quests', label: 'Nhiệm Vụ & Store', icon: Trophy },
    { id: 'pricing', label: 'Gói học', icon: CreditCard },
  ];

  // GSAP animation for active item transitions
  useEffect(() => {
    const activeBtn = buttonRefs.current[currentScreen];
    if (activeBtn) {
      // Gentle spring bounce scale animation on active button
      gsap.fromTo(activeBtn,
        { scale: 0.92, y: 1 },
        { scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', overwrite: 'auto' }
      );

      // Cute tilt animation on the icon
      const icon = activeBtn.querySelector('svg');
      if (icon) {
        gsap.fromTo(icon,
          { rotate: -20, scale: 0.8 },
          { rotate: 0, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }
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
          className="fixed inset-0 bg-black/45 z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar container */}
      <nav className={`w-64 flex-shrink-0 bg-surface-container-low border-r border-outline-variant flex flex-col z-50
        fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            <div className="flex items-center justify-between gap-2 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">日</div>
                <span className="text-xl font-bold text-primary tracking-tight">NipponMaster</span>
              </div>
              <button 
                onClick={onClose}
                aria-label="Close menu"
                className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant md:hidden cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentScreen === item.id;
                const Icon = item.icon;
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-on-primary' : 'text-on-surface-variant'} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
