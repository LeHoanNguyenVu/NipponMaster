import { LayoutDashboard, Languages, Shapes, BookOpen, Layers, Target, BookType, Play, LogOut } from 'lucide-react';
import type { ScreenType } from '../App';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vocabulary', label: 'Vocabulary', icon: Languages },
    { id: 'kanji', label: 'Kanji', icon: Shapes },
    { id: 'grammar', label: 'Grammar', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'exams', label: 'Exams', icon: Target },
    { id: 'translation', label: 'Translation', icon: BookType },
  ];

  return (
    <nav className="w-64 flex-shrink-0 bg-surface-container-low border-r border-outline-variant flex flex-col hidden md:flex z-10">
      <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">日</div>
            <span className="text-xl font-bold text-primary tracking-tight">NipponMaster</span>
          </div>
          
          <div className="mb-6">
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Learning Path</div>
            <div className="text-sm text-on-surface font-medium">Current Level: N3</div>
          </div>

          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id as ScreenType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-container text-primary shadow-sm scale-95 font-bold'
                        : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-primary' : ''} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="p-6 border-t border-outline-variant/30 space-y-2">
        <button 
          onClick={() => onNavigate('flashcards')}
          className="w-full py-3 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play size={16} />
          Study Now
        </button>
        <button 
          onClick={onLogout}
          className="w-full py-2 border border-outline-variant text-on-surface-variant rounded-lg text-xs font-medium hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut size={14} />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
