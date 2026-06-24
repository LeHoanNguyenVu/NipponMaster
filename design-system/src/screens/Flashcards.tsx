import { useState, useEffect } from 'react';
import { X, Settings, Volume2 } from 'lucide-react';

export default function Flashcards({ onExit }: { onExit: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
      if (isFlipped && ['1', '2', '3', '4'].includes(e.key)) {
        // Mock moving to next card
        setIsFlipped(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped]);

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans animate-in zoom-in-95 duration-300">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-transparent">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors">
            <X size={24} />
          </button>
          <span className="text-xl font-bold text-primary tracking-tight">KotobaSensei</span>
        </div>
        
        <div className="flex-1 max-w-md mx-6 hidden md:flex flex-col items-center">
          <div className="w-full flex justify-between text-sm font-medium text-on-surface-variant mb-1.5">
            <span>N3 Vocabulary Deck</span>
            <span>5 / 20</span>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        <div className="flex items-center">
          <button className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </nav>

      <main className="flex-1 pt-24 pb-12 px-4 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Flashcard */}
        <div className="w-full max-w-2xl perspective-1000 mb-8 h-[400px]">
          <div 
            className={`w-full h-full cursor-pointer preserve-3d transition-transform duration-500 relative ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-surface-container-lowest rounded-[2rem] shadow-sm border border-outline-variant flex flex-col items-center justify-center p-8 hover:shadow-md transition-shadow">
              <div className="absolute top-6 right-6 flex gap-2">
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">N3</span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">Noun</span>
              </div>
              <h2 className="text-7xl font-jp font-medium text-on-surface mb-8 tracking-widest">先生</h2>
              <p className="text-base text-on-surface-variant opacity-70">Tap or press Space to reveal</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-surface-container-lowest rounded-[2rem] shadow-md ring-2 ring-primary-fixed-dim flex flex-col items-center justify-center p-8">
              <button 
                className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors p-2.5 rounded-full hover:bg-surface-container-low"
                onClick={(e) => e.stopPropagation()}
              >
                <Volume2 size={24} />
              </button>
              
              <div className="flex flex-col items-center gap-2 mb-6">
                <span className="text-xl text-primary font-medium tracking-widest">せんせい</span>
                <h2 className="text-6xl font-jp font-bold text-on-surface leading-none">先生</h2>
              </div>
              
              <div className="w-16 border-t-2 border-surface-variant my-4 rounded-full"></div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-on-surface mb-2">Teacher; Master; Doctor</h3>
                <p className="text-base text-on-surface-variant max-w-sm mx-auto">Used to address someone in a position of authority or teaching.</p>
              </div>
              
              <div className="bg-surface-container-low/50 p-4 rounded-2xl w-full text-center max-w-md">
                <p className="text-lg text-on-surface mb-1">日本語の<span className="font-bold text-primary">先生</span>はとても優しいです。</p>
                <p className="text-sm text-on-surface-variant">The Japanese teacher is very kind.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`w-full max-w-2xl grid grid-cols-4 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <button className="flex flex-col items-center justify-center py-4 px-2 bg-surface-container-lowest border border-error/20 text-error rounded-2xl hover:bg-error/5 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group">
            <span className="text-sm font-bold mb-1">Quên</span>
            <span className="text-xs opacity-70 mb-2">&lt; 1m</span>
            <div className="px-2 py-0.5 bg-surface text-on-surface-variant rounded-md text-[10px] font-medium group-hover:bg-surface-container-lowest">1</div>
          </button>
          <button className="flex flex-col items-center justify-center py-4 px-2 bg-surface-container-lowest border border-tertiary/20 text-tertiary rounded-2xl hover:bg-tertiary/5 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group">
            <span className="text-sm font-bold mb-1">Khó</span>
            <span className="text-xs opacity-70 mb-2">5m</span>
            <div className="px-2 py-0.5 bg-surface text-on-surface-variant rounded-md text-[10px] font-medium group-hover:bg-surface-container-lowest">2</div>
          </button>
          <button className="flex flex-col items-center justify-center py-4 px-2 bg-surface-container-lowest border border-primary/20 text-primary rounded-2xl hover:bg-primary/5 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group">
            <span className="text-sm font-bold mb-1">Trung bình</span>
            <span className="text-xs opacity-70 mb-2">10m</span>
            <div className="px-2 py-0.5 bg-surface text-on-surface-variant rounded-md text-[10px] font-medium group-hover:bg-surface-container-lowest">3</div>
          </button>
          <button className="flex flex-col items-center justify-center py-4 px-2 bg-surface-container-lowest border border-secondary/20 text-secondary rounded-2xl hover:bg-secondary/5 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group">
            <span className="text-sm font-bold mb-1">Dễ</span>
            <span className="text-xs opacity-70 mb-2">4d</span>
            <div className="px-2 py-0.5 bg-surface text-on-surface-variant rounded-md text-[10px] font-medium group-hover:bg-surface-container-lowest">4</div>
          </button>
        </div>
      </main>
    </div>
  );
}
