import { LayoutDashboard, Languages, Shapes, BookOpen, Layers, Target, BookType, Play } from 'lucide-react';
import { ScreenType } from '../App';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
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
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">K</div>
          <span className="text-xl font-bold text-primary tracking-tight">KotobaSensei</span>
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-container text-primary shadow-sm scale-95'
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

      <div className="mt-auto p-6">
        <button 
          onClick={() => onNavigate('flashcards')}
          className="w-full py-3 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Play size={16} />
          Study Now
        </button>
      </div>
    </nav>
  );
}
