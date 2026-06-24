import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './screens/Dashboard';
import Vocabulary from './screens/Vocabulary';
import Exams from './screens/Exams';
import Flashcards from './screens/Flashcards';

export type ScreenType = 'dashboard' | 'vocabulary' | 'exams' | 'flashcards';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');

  if (currentScreen === 'flashcards') {
    return <Flashcards onExit={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-sans">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && <Dashboard onStartStudy={() => setCurrentScreen('flashcards')} />}
          {currentScreen === 'vocabulary' && <Vocabulary />}
          {currentScreen === 'exams' && <Exams />}
        </main>
      </div>
    </div>
  );
}
