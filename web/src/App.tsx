import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './screens/Dashboard';
import Vocabulary from './screens/Vocabulary';
import Exams from './screens/Exams';
import Flashcards from './screens/Flashcards';
import gsap from 'gsap';

export type ScreenType = 'dashboard' | 'vocabulary' | 'kanji' | 'grammar' | 'flashcards' | 'exams' | 'translation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      // Fade in and slide up transition when screen changes
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [currentScreen]);

  if (currentScreen === 'flashcards') {
    return <Flashcards onExit={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-sans">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && <Dashboard onStartStudy={() => setCurrentScreen('flashcards')} />}
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
