import { useState } from 'react';
import { Volume2, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  GREETINGS, PRONOUNS, HONORIFIC_SUFFIXES, AISATSU_CHAPTER_QUIZ
} from '../../data/aisatsuData';
import { speakJapanese } from '../../data/kanaData';
import { saveChapterScore } from '../../utils/beginnerProgressManager';

interface AisatsuPhrasesProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export default function AisatsuPhrases({ onChapterComplete }: AisatsuPhrasesProps) {
  const { t } = useTranslation(['beginner', 'common']);
  const [activeTab, setActiveTab] = useState<'greetings' | 'pronouns' | 'honorifics' | 'test'>('greetings');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const filteredGreetings = filterCategory === 'all'
    ? GREETINGS
    : GREETINGS.filter(g => g.category === filterCategory);

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = AISATSU_CHAPTER_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore(s => s + 1);
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < AISATSU_CHAPTER_QUIZ.length) {
      setQuizIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score;
      const pct = Math.round((finalScore / AISATSU_CHAPTER_QUIZ.length) * 100);
      try {
        saveChapterScore(3, pct);
      } catch {}
      if (onChapterComplete) {
        onChapterComplete('chapter-3', pct);
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizDone(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-serif">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>{t('beginner:aisatsu.badge')}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-serif">
          {t('beginner:aisatsu.title')}
        </h1>
        <p className="text-sm text-on-surface-variant mt-1 font-serif">
          {t('beginner:aisatsu.subtitle')}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3 font-serif">
        {[
          { id: 'greetings', label: t('beginner:aisatsu.tabs.greetings') },
          { id: 'pronouns', label: t('beginner:aisatsu.tabs.pronouns') },
          { id: 'honorifics', label: t('beginner:aisatsu.tabs.honorifics') },
          { id: 'test', label: t('beginner:aisatsu.tabs.test') },
        ].map(tTab => (
          <button
            key={tTab.id}
            onClick={() => setActiveTab(tTab.id as any)}
            className={`px-4 py-2 text-sm font-semibold transition-all cursor-pointer font-serif ${
              activeTab === tTab.id
                ? 'bg-primary text-on-primary shadow-sm scale-102'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
            style={{ borderRadius: '2px' }}
          >
            {tTab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* TAB 1: CHÀO HỎI (GREETINGS) */}
        {activeTab === 'greetings' && (
          <motion.div key="greetings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 font-serif">
              {[
                { id: 'all', label: t('beginner:aisatsu.filters.all') },
                { id: 'daily', label: t('beginner:aisatsu.filters.daily') },
                { id: 'farewell', label: t('beginner:aisatsu.filters.farewell') },
                { id: 'gratitude', label: t('beginner:aisatsu.filters.gratitude') },
                { id: 'meal', label: t('beginner:aisatsu.filters.meal') },
                { id: 'home', label: t('beginner:aisatsu.filters.home') },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors font-serif ${
                    filterCategory === c.id
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Greetings Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGreetings.map(g => (
                <div
                  key={g.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        g.formality === 'Formal' ? 'bg-primary/10 text-primary' :
                        g.formality === 'Casual' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {g.formality === 'Formal' ? 'Lịch sự' : g.formality === 'Casual' ? 'Thân mật' : 'Trung tính'}
                      </span>
                      <button
                        onClick={() => speakJapanese(g.japanese)}
                        className="p-1.5 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    <div className="text-xl md:text-2xl font-bold font-jp text-on-surface leading-tight">
                      {g.japanese}
                    </div>
                    <div className="text-xs font-medium text-primary">{g.romaji}</div>
                  </div>

                  <div className="border-t border-outline-variant/20 pt-3 space-y-1">
                    <div className="text-sm font-bold text-on-surface">{g.meaning}</div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">💡 {g.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ĐẠI TỪ XƯNG HÔ */}
        {activeTab === 'pronouns' && (
          <motion.div key="pronouns" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRONOUNS.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => speakJapanese(p.japanese)}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 hover:border-primary/40 cursor-pointer transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xl font-bold font-jp text-primary">{p.japanese}</span>
                      <span className="text-xs text-on-surface-variant ml-2">({p.hiragana} - {p.romaji})</span>
                    </div>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                      {p.formality}
                    </span>
                  </div>

                  <div className="text-base font-bold text-on-surface">{p.meaning}</div>

                  <div className="bg-surface-container rounded-xl p-3 text-xs text-on-surface-variant space-y-1">
                    <div>👤 <strong>Dùng bởi:</strong> {p.usedBy}</div>
                    <div>📌 <strong>Ngữ cảnh:</strong> {p.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: HẬU TỐ KÍNH NGỮ */}
        {activeTab === 'honorifics' && (
          <motion.div key="honorifics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HONORIFIC_SUFFIXES.map(h => (
                <div
                  key={h.suffix}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-jp text-primary">{h.suffix}</span>
                    <span className="text-xs font-semibold text-on-surface-variant font-mono">{h.reading}</span>
                  </div>

                  <div className="text-sm font-bold text-on-surface">{h.meaning}</div>
                  <p className="text-xs text-on-surface-variant">📌 {h.usedFor}</p>

                  <div className="bg-surface-container rounded-xl p-3 text-xs">
                    <div className="text-on-surface-variant font-bold text-[10px] uppercase">Ví dụ mẫu</div>
                    <div className="font-jp text-sm font-bold text-secondary mt-0.5">{h.example}</div>
                    <div className="text-on-surface-variant">{h.exampleMeaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: BÀI TEST CHƯƠNG 3 */}
        {activeTab === 'test' && (
          <motion.div key="test" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-6">
            {!quizDone ? (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4 font-serif">
                  <span>{t('beginner:aisatsu.questionCount', { current: quizIdx + 1, total: AISATSU_CHAPTER_QUIZ.length })}</span>
                  <span className="text-secondary font-bold">{t('beginner:aisatsu.scoreLabel')} {score}</span>
                </div>

                {/* Question */}
                <div className="space-y-3 font-serif">
                  <h3 className="text-lg font-bold text-on-surface leading-relaxed">
                    {AISATSU_CHAPTER_QUIZ[quizIdx].question}
                  </h3>
                  {AISATSU_CHAPTER_QUIZ[quizIdx].audioText && (
                    <button
                      onClick={() => speakJapanese(AISATSU_CHAPTER_QUIZ[quizIdx].audioText!)}
                      className="px-3 py-1.5 bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors font-serif"
                      style={{ borderRadius: '2px' }}
                    >
                      <Volume2 size={14} /> <span>Audio</span>
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5 font-serif">
                  {AISATSU_CHAPTER_QUIZ[quizIdx].options.map((opt, idx) => {
                    let btnStyle = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
                    if (isAnswered) {
                      if (idx === AISATSU_CHAPTER_QUIZ[quizIdx].correctIndex) {
                        btnStyle = 'bg-secondary/15 border-secondary text-secondary font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-crimson-500/15 border-crimson-500 text-crimson-600 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 border text-left text-sm transition-all cursor-pointer flex items-center justify-between font-serif ${btnStyle}`}
                        style={{ borderRadius: '2px' }}
                      >
                        <span>{opt}</span>
                        {isAnswered && idx === AISATSU_CHAPTER_QUIZ[quizIdx].correctIndex && <Check size={18} className="text-secondary" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-4 bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1 font-serif" style={{ borderRadius: '2px' }}>
                    <div className="font-bold text-primary">💡 {t('common:labels.explanation', 'Giải thích')}:</div>
                    <p>{AISATSU_CHAPTER_QUIZ[quizIdx].explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2 font-serif"
                    style={{ borderRadius: '2px' }}
                  >
                    <span>{quizIdx + 1 < AISATSU_CHAPTER_QUIZ.length ? t('beginner:aisatsu.nextBtn') : t('beginner:aisatsu.finishBtn')}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="bg-surface-container-lowest border border-outline-variant/30 p-8 text-center space-y-6 shadow-sm font-serif" style={{ borderRadius: '2px' }}>
                <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl font-bold" style={{ borderRadius: '2px' }}>
                  {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100) >= 85 ? '🎉' : '💪'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-on-surface font-serif">{t('beginner:aisatsu.testTitle')}</h2>
                  <div className="text-4xl font-extrabold text-primary my-2 font-mono">
                    {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100)}%
                  </div>
                  <p className="text-sm text-on-surface-variant font-serif">
                    {score} / {AISATSU_CHAPTER_QUIZ.length}
                  </p>
                </div>

                {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100) >= 85 ? (
                  <div className="p-4 bg-secondary/10 text-secondary text-sm font-semibold font-serif" style={{ borderRadius: '2px' }}>
                    {t('beginner:aisatsu.congrats')}
                  </div>
                ) : (
                  <div className="p-4 bg-crimson-500/10 text-crimson-600 text-sm font-semibold font-serif" style={{ borderRadius: '2px' }}>
                    {t('beginner:aisatsu.tryAgain')}
                  </div>
                )}

                <div className="flex gap-3 pt-4 font-serif">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex-1 py-3 bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-sm cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-2 font-serif"
                    style={{ borderRadius: '2px' }}
                  >
                    <RotateCcw size={16} /> {t('beginner:aisatsu.retakeBtn')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
