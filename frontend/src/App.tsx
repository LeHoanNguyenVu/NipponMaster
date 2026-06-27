import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardStudent from './screens/DashboardStudent';
import DashboardTeacher from './screens/DashboardTeacher';
import DashboardAdmin from './screens/DashboardAdmin';
import Vocabulary from './screens/Vocabulary';
import Exams from './screens/Exams';
import Flashcards from './screens/Flashcards';
import Auth from './screens/Auth';
import LandingPage from './screens/LandingPage';
import { useAuthStore } from './store/useAuthStore';
import gsap from 'gsap';

export type ScreenType = 'dashboard' | 'vocabulary' | 'kanji' | 'grammar' | 'flashcards' | 'exams' | 'translation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated, logout, user, fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // Support browser's back/forward buttons (hash navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/auth' || hash === '#auth') {
        setShowAuth(true);
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

  // Guest flow: Landing Page → Auth Screen → Dashboard
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

  if (currentScreen === 'flashcards') {
    return <Flashcards onExit={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-sans">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={logout}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && user?.role === 'teacher' && (
            <DashboardTeacher username={user?.username} />
          )}
          {currentScreen === 'dashboard' && (user?.role === 'system' || user?.role === 'admin') && (
            <DashboardAdmin username={user?.username} />
          )}
          {currentScreen === 'dashboard' && (!user?.role || user?.role === 'student') && (
            <DashboardStudent
              onStartStudy={() => setCurrentScreen('flashcards')}
              username={user?.username}
            />
          )}
          {currentScreen === 'vocabulary' && <Vocabulary />}
          {currentScreen === 'exams' && <Exams />}
          {currentScreen === 'kanji' && (
            <div className="p-8 text-center text-on-surface-variant font-medium">Kanji screen is under construction.</div>
          )}
          {currentScreen === 'grammar' && (
            <div className="p-8 text-center text-on-surface-variant font-medium">Grammar screen is under construction.</div>
          )}
          {currentScreen === 'translation' && (
            <div className="p-8 text-center text-on-surface-variant font-medium">Translation screen is under construction.</div>
          )}
        </main>
      </div>
    </div>
  );
}
