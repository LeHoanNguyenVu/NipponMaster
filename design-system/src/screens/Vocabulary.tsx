import { useState } from 'react';
import { Search, PlusCircle, CheckCircle2, Volume2, BookOpen, X } from 'lucide-react';

const vocabData = [
  { id: 1, kanji: '準備', kana: 'じゅんび', meaning: 'Preparation / Setup', type: 'Verb (Suru)', level: 'N3', inSrs: true },
  { id: 2, kanji: '環境', kana: 'かんきょう', meaning: 'Environment', type: 'Noun', level: 'N3', inSrs: false },
  { id: 3, kanji: '複雑', kana: 'ふくざつ', meaning: 'Complex, Complicated', type: 'Adj-na', level: 'N3', inSrs: false },
  { id: 4, kanji: '比べる', kana: 'くらべる', meaning: 'To compare', type: 'Verb', level: 'N3', inSrs: false },
];

export default function Vocabulary() {
  const [selectedWord, setSelectedWord] = useState<typeof vocabData[0] | null>(vocabData[0]);

  return (
    <div className="flex h-full relative overflow-hidden animate-in fade-in duration-500">
      <div className={`flex-1 p-6 md:p-8 overflow-y-auto transition-all duration-300 ${selectedWord ? 'md:pr-[380px]' : ''}`}>
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-on-surface mb-2">Vocabulary Library</h1>
              <p className="text-lg text-on-surface-variant">Explore and manage your Japanese vocabulary. N3 Focus.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-surface-container-lowest p-2 rounded-xl shadow-sm border border-outline-variant">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
                <input
                  type="text"
                  placeholder="Search Kanji, Hiragana, or Vietnamese..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline-variant rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2 px-2 pb-2 md:pb-0 overflow-x-auto w-full md:w-auto no-scrollbar">
                {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                  <button key={lvl} className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${lvl === 'N3' ? 'bg-primary-container text-primary border-primary font-bold shadow-sm' : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {vocabData.map(word => {
              const isSelected = selectedWord?.id === word.id;
              return (
                <div 
                  key={word.id}
                  onClick={() => setSelectedWord(word)}
                  className={`group relative bg-surface-container-lowest rounded-2xl p-5 flex flex-col justify-between shadow-sm cursor-pointer transition-all transform hover:-translate-y-1 ${isSelected ? 'border-2 border-primary scale-[1.02] shadow-md' : 'border border-outline-variant hover:shadow-md'}`}
                >
                  <button className={`absolute top-4 right-4 transition-colors z-10 ${word.inSrs ? 'text-primary' : 'text-outline hover:text-primary'}`}>
                    {word.inSrs ? <CheckCircle2 size={24} className="fill-current text-white bg-primary rounded-full" /> : <PlusCircle size={24} />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">{word.type}</span>
                      {word.level === 'N3' && <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold uppercase tracking-wider">N3</span>}
                    </div>
                    <div className="text-5xl font-jp text-on-surface mb-2 font-medium">{word.kanji}</div>
                    <div className="text-base text-on-surface-variant">{word.kana}</div>
                  </div>
                  <div className={`mt-6 pt-4 border-t transition-colors ${isSelected ? 'border-outline-variant/30' : 'border-outline-variant/30 group-hover:border-primary/30'}`}>
                    <p className="text-lg font-medium text-on-surface">{word.meaning}</p>
                    <p className="text-sm text-on-surface-variant mt-1">Vietnamese meaning here</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      <aside className={`fixed md:absolute top-0 md:top-0 right-0 h-full w-[360px] bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-40 transform transition-transform duration-300 flex flex-col overflow-y-auto ${selectedWord ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedWord && (
          <>
            <div className="sticky top-0 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen size={20} />
                <span className="text-sm font-bold text-on-surface uppercase tracking-wide">Word Details</span>
              </div>
              <button 
                onClick={() => setSelectedWord(null)}
                className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface text-xs font-bold uppercase tracking-widest border border-outline-variant">{selectedWord.type}</span>
                  <span className="px-3 py-1 rounded-full bg-primary-container text-primary text-xs font-bold uppercase tracking-widest">{selectedWord.level}</span>
                </div>
                <h2 className="text-6xl font-jp font-medium text-on-background leading-tight mb-2">{selectedWord.kanji}</h2>
                <p className="text-xl text-on-surface-variant">{selectedWord.kana}</p>
                <p className="text-lg text-primary mt-3 font-medium">{selectedWord.meaning}</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-on-secondary rounded-xl text-sm font-bold shadow-sm hover:bg-secondary/90 transition-colors">
                  <CheckCircle2 size={18} />
                  In SRS Deck
                </button>
                <button className="p-3 border border-outline-variant text-on-surface rounded-xl hover:bg-surface-variant transition-colors">
                  <Volume2 size={20} />
                </button>
              </div>

              <div className="h-px w-full bg-outline-variant/30"></div>

              <div>
                <h3 className="text-xs text-on-surface-variant uppercase font-semibold tracking-widest mb-4">Kanji Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex gap-4 p-3 rounded-xl border border-outline-variant/50 bg-surface">
                    <div className="text-3xl font-jp text-on-surface flex-shrink-0 w-12 text-center">準</div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase mb-1">Semi-, correspond to</p>
                      <div className="flex gap-2">
                        <span className="text-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface">ジュン</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl border border-outline-variant/50 bg-surface">
                    <div className="text-3xl font-jp text-on-surface flex-shrink-0 w-12 text-center">備</div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase mb-1">Equip, provision</p>
                      <div className="flex gap-2">
                        <span className="text-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface">ビ</span>
                        <span className="text-sm border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">そな.える</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-on-surface-variant uppercase font-semibold tracking-widest mb-4">Example Sentences</h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-lg text-on-surface mb-2 leading-relaxed">
                      会議の<span className="text-primary font-bold">{selectedWord.kanji}</span>ができました。
                    </p>
                    <p className="text-base text-on-surface-variant mb-1">
                      かいぎの<span className="text-primary font-medium">{selectedWord.kana}</span>ができました。
                    </p>
                    <p className="text-sm text-outline italic">The preparations for the meeting are complete.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
