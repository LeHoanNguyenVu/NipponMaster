import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardStudent from './screens/DashboardStudent';
import DashboardTeacher from './screens/DashboardTeacher';
import DashboardAdmin from './screens/DashboardAdmin';
import DashboardGuest from './screens/DashboardGuest';
import Vocabulary from './screens/Vocabulary';
import Exams from './screens/Exams';
import Flashcards from './screens/Flashcards';
import Auth from './screens/Auth';
import LandingPage from './screens/LandingPage';
import Kanji from './screens/Kanji';
import Grammar from './screens/Grammar';
import Translation from './screens/Translation';
import OnboardingScreen from './screens/OnboardingScreen';
import Pricing from './screens/Pricing';
import SpeakingStudio from './screens/SpeakingStudio';
import BeginnerCourseHub from './screens/BeginnerCourseHub';
import JLPTBattleArena from './screens/JLPTBattleArena';
import QuestsAndShop from './screens/QuestsAndShop';
import { useAuthStore } from './store/useAuthStore';
import gsap from 'gsap';

export type ScreenType = 'dashboard' | 'vocabulary' | 'kanji' | 'grammar' | 'flashcards' | 'exams' | 'translation' | 'pricing' | 'speaking' | 'beginner' | 'battle' | 'quests';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated, logout, user, fetchMe } = useAuthStore();

  // Configure GSAP globally for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(100);
      } else {
        gsap.globalTimeline.timeScale(1);
      }
    };
    
    handleMotionChange(mediaQuery);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // Support browser's back/forward buttons (hash navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/auth' || hash === '#auth') {
        setShowAuth(true);
      } else if (hash === '#/pricing' || hash === '#pricing') {
        setShowAuth(false);
        setCurrentScreen('pricing');
      } else {
        setShowAuth(false);
      }
    };

    // Run once on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [currentScreen]);

  // Guest flow: Landing Page → Auth Screen → Onboarding (if new) → Dashboard
  if (!isAuthenticated) {
    if (showAuth) {
      return (
        <Auth 
          onAuthSuccess={() => {
            window.location.hash = '';
            setCurrentScreen('dashboard');
          }} 
          onBack={() => {
            window.location.hash = '';
          }}
        />
      );
    }
    return <LandingPage onNavigateAuth={() => { window.location.hash = '#/auth'; }} />;
  }

  // Onboarding flow: New student who hasn't completed onboarding yet
  if (isAuthenticated && user && user.onboardingCompleted === false) {
    return (
      <OnboardingScreen
        onDone={() => {
          fetchMe();
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  if (currentScreen === 'flashcards') {
    return <Flashcards onExit={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-sans">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && user?.role === 'teacher' && (
            <DashboardTeacher username={user?.username} />
          )}
          {currentScreen === 'dashboard' && (user?.role === 'system' || user?.role === 'admin') && (
            <DashboardAdmin username={user?.username} />
          )}
          {currentScreen === 'dashboard' && user?.role === 'guest' && (
            <DashboardGuest />
          )}
          {currentScreen === 'dashboard' && (!user?.role || user?.role === 'student') && (
            <DashboardStudent
              onStartStudy={() => setCurrentScreen('flashcards')}
              username={user?.username}
            />
          )}
          {currentScreen === 'vocabulary' && <Vocabulary />}
          {currentScreen === 'exams' && <Exams />}
          {currentScreen === 'kanji' && <Kanji />}
          {currentScreen === 'grammar' && <Grammar />}
          {currentScreen === 'translation' && <Translation />}
          {currentScreen === 'pricing' && <Pricing />}
          {currentScreen === 'speaking' && <SpeakingStudio />}
          {currentScreen === 'beginner' && <BeginnerCourseHub />}
          {currentScreen === 'battle' && <JLPTBattleArena />}
          {currentScreen === 'quests' && <QuestsAndShop />}
        </main>
      </div>
    </div>
  );
}
