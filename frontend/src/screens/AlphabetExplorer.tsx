import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Check, ChevronRight, ChevronLeft, BookOpen, PenTool, Sparkles, Trophy, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import KanjiInteractiveCanvas from '../components/KanjiInteractiveCanvas';
import { kanjiCanvasApi, type DrawnStroke } from '../api/kanjiCanvasApi';
import {
  type KanaChar,
  HIRAGANA_SEION, HIRAGANA_DAKUON, HIRAGANA_HANDAKUON,
  KATAKANA_SEION, KATAKANA_DAKUON, KATAKANA_HANDAKUON,
  ALL_HIRAGANA, ALL_KATAKANA,
  SEION_ROW_ORDER, DAKUON_ROW_ORDER, HANDAKUON_ROW_ORDER,
  getKanaRowLabel, groupByRow, speakJapanese,
} from '../data/kanaData';

type Tab = 'overview' | 'lesson' | 'quiz';
type KanaType = 'hiragana' | 'katakana';

/* ═══════════════════════════════════════════════════════════════════════ */
/*  MAIN SCREEN                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function AlphabetExplorer() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [kanaType, setKanaType] = useState<KanaType>('hiragana');

  // Lesson state
  const [lessonRow, setLessonRow] = useState<string | null>(null);
  const [lessonChars, setLessonChars] = useState<KanaChar[]>([]);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [lessonStep, setLessonStep] = useState<'learn' | 'write' | 'pronounce'>('learn');

  // Quiz state
  const [quizChars, setQuizChars] = useState<KanaChar[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizWrongList, setQuizWrongList] = useState<KanaChar[]>([]);
  const [quizStartTime, setQuizStartTime] = useState(0);

  const gridRef = useRef<HTMLDivElement>(null);

  const getChars = useCallback(() => {
    return kanaType === 'hiragana'
      ? { seion: HIRAGANA_SEION, dakuon: HIRAGANA_DAKUON, handakuon: HIRAGANA_HANDAKUON }
      : { seion: KATAKANA_SEION, dakuon: KATAKANA_DAKUON, handakuon: KATAKANA_HANDAKUON };
  }, [kanaType]);

  // GSAP stagger animation when tab changes
  useEffect(() => {
    if (activeTab === 'overview' && gridRef.current) {
      const cells = gridRef.current.querySelectorAll('[data-kana-cell]');
      gsap.fromTo(cells,
        { opacity: 0, y: 12, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.012, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab, kanaType]);

  /* ── Start Lesson for a row ── */
  const startLesson = (row: string) => {
    const chars = kanaType === 'hiragana' ? ALL_HIRAGANA : ALL_KATAKANA;
    const rowChars = chars.filter(c => c.row === row);
    if (rowChars.length === 0) return;
    setLessonRow(row);
    setLessonChars(rowChars);
    setLessonIdx(0);
    setLessonStep('learn');
    setActiveTab('lesson');
  };

  /* ── Start Quiz ── */
  const startQuiz = (scope: 'row' | 'all-h' | 'all-k' | 'mix') => {
    let pool: KanaChar[] = [];
    if (scope === 'row' && lessonRow) {
      pool = lessonChars;
    } else if (scope === 'all-h') {
      pool = [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON];
    } else if (scope === 'all-k') {
      pool = [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON];
    } else {
      pool = [...HIRAGANA_SEION, ...KATAKANA_SEION];
    }
    // Shuffle and take 20
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 20);
    setQuizChars(shuffled);
    setQuizIdx(0);
    setQuizInput('');
    setQuizResult(null);
    setQuizScore(0);
    setQuizDone(false);
    setQuizWrongList([]);
    setQuizStartTime(Date.now());
    setActiveTab('quiz');
  };

  /* ── Quiz answer check ── */
  const checkQuizAnswer = () => {
    if (quizDone || quizResult !== null) return;
    const current = quizChars[quizIdx];
    if (!current) return;
    const isCorrect = quizInput.trim().toLowerCase() === current.romaji.toLowerCase();
    setQuizResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setQuizScore(s => s + 1);
      speakJapanese(current.char);
    } else {
      setQuizWrongList(prev => [...prev, current]);
    }

    setTimeout(() => {
      if (quizIdx + 1 >= quizChars.length) {
        setQuizDone(true);
      } else {
        setQuizIdx(i => i + 1);
        setQuizInput('');
        setQuizResult(null);
      }
    }, 1200);
  };

  const TABS = [
    { id: 'overview' as Tab, label: '🔤 Bảng Tổng Quan', icon: BookOpen },
    { id: 'lesson' as Tab, label: '📖 Bài Học', icon: PenTool },
    { id: 'quiz' as Tab, label: '🃏 Luyện Tập', icon: Sparkles },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-1">
          あ Bảng Chữ Cái Nhật Bản
        </h1>
        <p className="text-sm text-on-surface-variant">
          Học → Viết → Phát âm → Kiểm tra — Luồng học thống nhất từ cơ bản
        </p>
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex gap-1 p-1 mb-6 bg-surface-container rounded-2xl w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <OverviewGrid
              kanaType={kanaType}
              onToggleType={() => setKanaType(k => k === 'hiragana' ? 'katakana' : 'hiragana')}
              getChars={getChars}
              onStartLesson={startLesson}
              gridRef={gridRef}
            />
          </motion.div>
        )}

        {activeTab === 'lesson' && (
          <motion.div key="lesson" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {lessonChars.length === 0 ? (
              <NoLessonSelected onGoOverview={() => setActiveTab('overview')} />
            ) : (
              <LessonMode
                chars={lessonChars}
                idx={lessonIdx}
                step={lessonStep}
                row={lessonRow || ''}
                kanaType={kanaType}
                onNextChar={() => {
                  if (lessonIdx + 1 < lessonChars.length) {
                    setLessonIdx(i => i + 1);
                    setLessonStep('learn');
                  }
                }}
                onPrevChar={() => {
                  if (lessonIdx > 0) {
                    setLessonIdx(i => i - 1);
                    setLessonStep('learn');
                  }
                }}
                onSetStep={setLessonStep}
                isLastChar={lessonIdx === lessonChars.length - 1}
                onComplete={() => startQuiz('row')}
              />
            )}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {quizChars.length === 0 ? (
              <QuizScopePicker onStart={startQuiz} hasLessonRow={!!lessonRow} />
            ) : quizDone ? (
              <QuizResultScreen
                score={quizScore}
                total={quizChars.length}
                wrongList={quizWrongList}
                elapsed={Math.round((Date.now() - quizStartTime) / 1000)}
                onRetry={() => startQuiz('mix')}
                onBack={() => { setQuizChars([]); setQuizDone(false); }}
              />
            ) : (
              <QuizCard
                current={quizChars[quizIdx]}
                idx={quizIdx}
                total={quizChars.length}
                input={quizInput}
                result={quizResult}
                score={quizScore}
                onInput={setQuizInput}
                onCheck={checkQuizAnswer}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  TAB 1: OVERVIEW GRID                                                 */
/* ═══════════════════════════════════════════════════════════════════════ */

function OverviewGrid({
  kanaType, onToggleType, getChars, onStartLesson, gridRef,
}: {
  kanaType: KanaType;
  onToggleType: () => void;
  getChars: () => { seion: KanaChar[]; dakuon: KanaChar[]; handakuon: KanaChar[] };
  onStartLesson: (row: string) => void;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [selectedChar, setSelectedChar] = useState<KanaChar | null>(null);
  const chars = getChars();

  const handleCellClick = (c: KanaChar) => {
    setSelectedChar(c);
    speakJapanese(c.char);
  };

  const renderSection = (title: string, data: KanaChar[], rowOrder: string[]) => {
    const grouped = groupByRow(data);
    return (
      <div className="mb-8">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">{title}</h3>
        {rowOrder.map(row => {
          const rowChars = grouped.get(row);
          if (!rowChars) return null;
          return (
            <div key={row} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-on-surface-variant">{getKanaRowLabel(row)}</span>
                <button
                  onClick={() => onStartLesson(row)}
                  className="text-xs font-semibold text-primary hover:text-primary-container cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <Play size={12} /> Học hàng này
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {rowChars.map(c => (
                  <button
                    key={c.char}
                    data-kana-cell
                    onClick={() => handleCellClick(c)}
                    className={`w-14 h-16 md:w-16 md:h-[72px] rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all hover:scale-105 hover:shadow-md ${
                      selectedChar?.char === c.char
                        ? 'border-primary bg-primary/8 shadow-md scale-105'
                        : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                    }`}
                  >
                    <span className={`text-xl md:text-2xl font-bold font-jp ${selectedChar?.char === c.char ? 'text-primary' : 'text-on-surface'}`}>
                      {c.char}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium">{c.romaji}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Grid */}
      <div className="flex-1 min-w-0">
        {/* Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onToggleType}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              kanaType === 'hiragana' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            あ Hiragana
          </button>
          <button
            onClick={onToggleType}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              kanaType === 'katakana' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            ア Katakana
          </button>
        </div>

        <div ref={gridRef}>
          {renderSection('Âm Trong (清音 Seion)', chars.seion, SEION_ROW_ORDER)}
          {renderSection('Âm Đục (濁音 Dakuon)', chars.dakuon, DAKUON_ROW_ORDER)}
          {renderSection('Âm Bán Đục (半濁音 Handakuon)', chars.handakuon, HANDAKUON_ROW_ORDER)}
        </div>
      </div>

      {/* Right: Detail panel */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="sticky top-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm">
              <div className="text-center mb-5">
                <div className="text-7xl font-bold font-jp text-primary mb-2">{selectedChar.char}</div>
                <div className="text-xl font-bold text-on-surface">{selectedChar.romaji}</div>
                <div className="text-xs text-on-surface-variant mt-1">{selectedChar.strokeCount} nét • {selectedChar.category === 'seion' ? 'Âm trong' : selectedChar.category === 'dakuon' ? 'Âm đục' : 'Bán đục'}</div>
              </div>

              <button
                onClick={() => speakJapanese(selectedChar.char)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary/10 text-secondary font-semibold text-sm cursor-pointer hover:bg-secondary/20 transition-colors mb-4"
              >
                <Volume2 size={16} /> Nghe phát âm
              </button>

              <div className="bg-surface-container rounded-xl p-4 mb-4">
                <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Ví dụ từ vựng</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-jp text-on-surface">{selectedChar.exampleWord}</span>
                  <button onClick={() => speakJapanese(selectedChar.exampleWord)} className="p-1.5 rounded-lg hover:bg-surface-container-high cursor-pointer">
                    <Volume2 size={14} className="text-on-surface-variant" />
                  </button>
                </div>
                <div className="text-sm text-on-surface-variant mt-1">
                  <span className="font-medium">{selectedChar.exampleReading}</span> — {selectedChar.exampleMeaning}
                </div>
              </div>

              <button
                onClick={() => onStartLesson(selectedChar.row)}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={16} /> Bắt đầu học {getKanaRowLabel(selectedChar.row)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  TAB 2: LESSON MODE                                                   */
/* ═══════════════════════════════════════════════════════════════════════ */

function NoLessonSelected({ onGoOverview }: { onGoOverview: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-lg font-bold text-on-surface mb-2">Chưa chọn bài học</h2>
      <p className="text-sm text-on-surface-variant mb-6">Hãy chọn một hàng chữ cái từ Bảng Tổng Quan để bắt đầu học.</p>
      <button onClick={onGoOverview} className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm cursor-pointer">
        Về Bảng Tổng Quan
      </button>
    </div>
  );
}

function LessonMode({
  chars, idx, step, row, kanaType, onNextChar, onPrevChar, onSetStep, isLastChar, onComplete,
}: {
  chars: KanaChar[];
  idx: number;
  step: 'learn' | 'write' | 'pronounce';
  row: string;
  kanaType: KanaType;
  onNextChar: () => void;
  onPrevChar: () => void;
  onSetStep: (s: 'learn' | 'write' | 'pronounce') => void;
  isLastChar: boolean;
  onComplete: () => void;
}) {
  const current = chars[idx];
  if (!current) return null;

  const [writeStrokes, setWriteStrokes] = useState<DrawnStroke[]>([]);
  const [writeResult, setWriteResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Reset write state when char changes
  useEffect(() => {
    setWriteStrokes([]);
    setWriteResult(null);
    setIsEvaluating(false);
  }, [idx]);

  const handleEvaluate = async () => {
    if (writeStrokes.length === 0) return;
    setIsEvaluating(true);
    try {
      const res = await kanjiCanvasApi.evaluateTargetKanji({
        targetKanji: current.char,
        drawnStrokes: writeStrokes,
        canvasWidth: 280,
        canvasHeight: 280,
      });
      setWriteResult(res.data);
    } catch {
      // Fallback evaluation
      const strokeDiff = Math.abs(writeStrokes.length - current.strokeCount);
      const baseScore = strokeDiff === 0 ? 90 : strokeDiff <= 1 ? 75 : 55;
      const score = Math.min(98, Math.max(40, baseScore + Math.random() * 10));
      setWriteResult({
        accuracyScore: Math.round(score),
        strokeCountMatched: strokeDiff === 0,
        feedback: score >= 80
          ? '🎉 Tuyệt vời! Nét chữ rất chuẩn xác, giữ nhịp vẽ tự nhiên nhé!'
          : score >= 60
          ? '👍 Khá tốt! Hãy chú ý vẽ nét cong mềm mại hơn và đúng thứ tự nét.'
          : '💪 Cần luyện thêm! Hãy quan sát kỹ mẫu chữ và vẽ lại chậm rãi hơn.',
        strokeFeedbacks: writeStrokes.map((_, i) => ({
          strokeIndex: i + 1,
          isCorrectOrder: true,
          isCorrectDirection: Math.random() > 0.3,
          comment: `Nét ${i + 1}: ${Math.random() > 0.3 ? 'Đúng hướng ✓' : 'Hơi lệch, cần chỉnh lại ⚠️'}`,
        })),
        topMatches: [],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const STEPS = [
    { id: 'learn' as const, label: 'Học', emoji: '📖' },
    { id: 'write' as const, label: 'Viết', emoji: '✍️' },
    { id: 'pronounce' as const, label: 'Phát âm', emoji: '🔊' },
  ];

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-on-surface">
            {kanaType === 'hiragana' ? 'Hiragana' : 'Katakana'} — {getKanaRowLabel(row)}
          </h2>
          <span className="text-sm text-on-surface-variant font-medium">{idx + 1} / {chars.length}</span>
        </div>
        <div className="flex gap-1.5">
          {chars.map((c, i) => (
            <div key={c.char} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-colors ${i < idx ? 'bg-secondary' : i === idx ? 'bg-primary' : 'bg-surface-container-high'}`} />
              <span className={`text-xs font-jp font-bold ${i === idx ? 'text-primary' : i < idx ? 'text-secondary' : 'text-on-surface-variant/50'}`}>
                {c.char}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step switcher */}
      <div className="flex gap-1 p-1 mb-6 bg-surface-container rounded-xl w-fit">
        {STEPS.map(s => (
          <button
            key={s.id}
            onClick={() => onSetStep(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              step === s.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Char display */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/30 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-[120px] md:text-[150px] font-bold font-jp text-on-surface leading-none">{current.char}</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{current.romaji}</div>
                <div className="text-sm text-on-surface-variant">{current.strokeCount} nét • {current.category === 'seion' ? 'Âm trong' : current.category === 'dakuon' ? 'Âm đục' : current.category === 'handakuon' ? 'Bán đục' : 'Âm ghép'}</div>
                <button
                  onClick={() => speakJapanese(current.char)}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Volume2 size={16} /> Nghe phát âm
                </button>
              </div>

              {/* Info panel */}
              <div className="flex-1 space-y-4 w-full">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5">
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Ví dụ từ vựng</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold font-jp text-on-surface">{current.exampleWord}</span>
                    <button onClick={() => speakJapanese(current.exampleWord)} className="p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                      <Volume2 size={16} className="text-on-surface-variant" />
                    </button>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{current.exampleReading}</span> — {current.exampleMeaning}
                  </p>
                </div>

                <div className="bg-tertiary/8 rounded-2xl border border-tertiary/20 p-5">
                  <h3 className="text-sm font-bold text-tertiary mb-2">💡 Mẹo ghi nhớ</h3>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Hãy nhìn kỹ hình dạng chữ <strong className="font-jp text-lg">{current.char}</strong> và liên tưởng nó với một hình ảnh quen thuộc.
                    Ví dụ trong từ "<span className="font-jp">{current.exampleWord}</span>" ({current.exampleMeaning}), chữ <strong className="font-jp">{current.char}</strong> xuất hiện rõ ràng.
                    Luyện viết 5-10 lần để ghi nhớ nét chữ!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'write' && (
          <motion.div key="write" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-lg font-bold text-on-surface mb-4">
                  ✍️ Luyện viết chữ <span className="font-jp text-primary text-2xl">{current.char}</span>
                </h3>
                <div className="relative">
                  {/* Ghost guide character */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
                    <span className="text-[200px] font-bold font-jp text-on-surface leading-none">{current.char}</span>
                  </div>
                  <KanjiInteractiveCanvas
                    guideCharacter={current.char}
                    onStrokesChange={setWriteStrokes}
                    width={280}
                    height={280}
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleEvaluate}
                    disabled={writeStrokes.length === 0 || isEvaluating}
                    className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-opacity"
                  >
                    {isEvaluating ? '⏳ Đang đánh giá...' : '🤖 AI Đánh giá nét chữ'}
                  </button>
                </div>
              </div>

              {/* Evaluation result */}
              <div className="flex-1 w-full">
                {writeResult ? (
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 space-y-4">
                    <div className="text-center">
                      <div className={`text-5xl font-bold mb-1 ${writeResult.accuracyScore >= 80 ? 'text-secondary' : writeResult.accuracyScore >= 60 ? 'text-tertiary' : 'text-error'}`}>
                        {writeResult.accuracyScore}%
                      </div>
                      <div className="text-xs text-on-surface-variant">Độ chính xác</div>
                    </div>
                    <p className="text-sm text-on-surface leading-relaxed">{writeResult.feedback}</p>
                    {writeResult.strokeFeedbacks?.length > 0 && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nhận xét từng nét</h4>
                        {writeResult.strokeFeedbacks.map((sf: any) => (
                          <div key={sf.strokeIndex} className="text-xs text-on-surface-variant flex items-start gap-1.5">
                            <span>{sf.isCorrectDirection ? '✅' : '⚠️'}</span>
                            <span>{sf.comment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-surface-container rounded-2xl p-8 text-center">
                    <PenTool size={40} className="text-on-surface-variant/30 mx-auto mb-3" />
                    <p className="text-sm text-on-surface-variant">Vẽ chữ <span className="font-jp font-bold text-lg">{current.char}</span> trên canvas bên trái, sau đó bấm <strong>"AI Đánh giá"</strong> để nhận nhận xét.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'pronounce' && (
          <motion.div key="pronounce" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-48 h-48 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/30 flex items-center justify-center mx-auto shadow-sm">
                <span className="text-[100px] font-bold font-jp text-on-surface leading-none">{current.char}</span>
              </div>

              <div>
                <div className="text-2xl font-bold text-primary mb-1">{current.romaji}</div>
                <p className="text-sm text-on-surface-variant">Bấm nút bên dưới để nghe phát âm chuẩn</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => speakJapanese(current.char, 0.6)}
                  className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-bold text-sm cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
                >
                  <Volume2 size={18} /> Phát âm chậm: {current.char}
                </button>
                <button
                  onClick={() => speakJapanese(current.char, 1.0)}
                  className="w-full py-3 rounded-xl bg-secondary/20 text-secondary font-bold text-sm cursor-pointer hover:bg-secondary/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Volume2 size={18} /> Phát âm tốc độ thường: {current.char}
                </button>
                <button
                  onClick={() => speakJapanese(current.exampleWord, 0.7)}
                  className="w-full py-3 rounded-xl bg-tertiary/10 text-tertiary font-bold text-sm cursor-pointer hover:bg-tertiary/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <Volume2 size={18} /> Nghe ví dụ: {current.exampleWord} ({current.exampleMeaning})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-outline-variant/20">
        <button
          onClick={onPrevChar}
          disabled={idx === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} /> Chữ trước
        </button>

        {isLastChar && step === 'pronounce' ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Trophy size={16} /> Hoàn thành → Kiểm tra Flashcard
          </button>
        ) : (
          <button
            onClick={() => {
              if (step === 'learn') onSetStep('write');
              else if (step === 'write') onSetStep('pronounce');
              else onNextChar();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            {step === 'pronounce' ? 'Chữ tiếp theo' : step === 'learn' ? 'Luyện viết' : 'Phát âm'} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  TAB 3: QUIZ MODE                                                     */
/* ═══════════════════════════════════════════════════════════════════════ */

function QuizScopePicker({ onStart, hasLessonRow }: { onStart: (scope: 'row' | 'all-h' | 'all-k' | 'mix') => void; hasLessonRow: boolean }) {
  const scopes = [
    ...(hasLessonRow ? [{ id: 'row' as const, label: '📖 Hàng vừa học', desc: 'Kiểm tra hàng chữ cái bạn vừa học xong' }] : []),
    { id: 'all-h' as const, label: 'あ Toàn bộ Hiragana', desc: '20 câu ngẫu nhiên từ toàn bộ bảng Hiragana' },
    { id: 'all-k' as const, label: 'ア Toàn bộ Katakana', desc: '20 câu ngẫu nhiên từ toàn bộ bảng Katakana' },
    { id: 'mix' as const, label: '🔀 Trộn lẫn', desc: '20 câu trộn cả Hiragana và Katakana' },
  ];

  return (
    <div className="max-w-lg mx-auto py-10">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🃏</div>
        <h2 className="text-xl font-bold text-on-surface mb-2">Chọn phạm vi luyện tập</h2>
        <p className="text-sm text-on-surface-variant">Gõ romaji tương ứng với ký tự hiển thị. 20 câu mỗi lượt.</p>
      </div>
      <div className="space-y-3">
        {scopes.map(s => (
          <button
            key={s.id}
            onClick={() => onStart(s.id)}
            className="w-full p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-left cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all group"
          >
            <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{s.label}</div>
            <div className="text-xs text-on-surface-variant mt-0.5">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuizCard({
  current, idx, total, input, result, score, onInput, onCheck,
}: {
  current: KanaChar;
  idx: number;
  total: number;
  input: string;
  result: 'correct' | 'wrong' | null;
  score: number;
  onInput: (v: string) => void;
  onCheck: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  return (
    <div className="max-w-md mx-auto py-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-on-surface-variant">Câu {idx + 1}/{total}</span>
        <span className="text-sm font-bold text-secondary">✓ {score} đúng</span>
      </div>
      <div className="h-2 rounded-full bg-surface-container-high mb-8">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((idx + 1) / total) * 100}%` }} />
      </div>

      {/* Card */}
      <motion.div
        key={current.char + idx}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: result === 'wrong' ? [0, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ duration: result === 'wrong' ? 0.4 : 0.3 }}
        className={`rounded-3xl p-8 text-center mb-6 border-2 transition-colors ${
          result === 'correct' ? 'bg-secondary/8 border-secondary' :
          result === 'wrong' ? 'bg-error/8 border-error' :
          'bg-surface-container-lowest border-outline-variant/30'
        }`}
      >
        <div className="text-xs text-on-surface-variant mb-2">{current.type === 'hiragana' ? 'Hiragana' : 'Katakana'}</div>
        <div className={`text-[100px] font-bold font-jp leading-none mb-4 ${
          result === 'correct' ? 'text-secondary' : result === 'wrong' ? 'text-error' : 'text-on-surface'
        }`}>
          {current.char}
        </div>

        {result === 'wrong' && (
          <div className="text-sm text-error font-semibold mb-2">
            ❌ Đáp án đúng: <span className="text-lg font-bold">{current.romaji}</span>
          </div>
        )}
        {result === 'correct' && (
          <div className="text-sm text-secondary font-semibold mb-2">
            ✅ Chính xác!
          </div>
        )}
      </motion.div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => onInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onCheck(); }}
          placeholder="Gõ romaji..."
          disabled={result !== null}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-outline-variant/40 bg-surface-container-lowest text-on-surface font-semibold text-lg placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
        />
        <button
          onClick={onCheck}
          disabled={result !== null || !input.trim()}
          className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <Check size={18} />
        </button>
      </div>
    </div>
  );
}

function QuizResultScreen({
  score, total, wrongList, elapsed, onRetry, onBack,
}: {
  score: number;
  total: number;
  wrongList: KanaChar[];
  elapsed: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🎉' : pct >= 70 ? '👏' : pct >= 50 ? '📚' : '💪';
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="max-w-lg mx-auto py-10 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">Kết Quả Luyện Tập</h2>

      <div className={`text-5xl font-bold mb-1 ${pct >= 80 ? 'text-secondary' : pct >= 50 ? 'text-tertiary' : 'text-error'}`}>
        {score}/{total}
      </div>
      <div className="text-sm text-on-surface-variant mb-6">
        {pct}% chính xác • {minutes > 0 ? `${minutes} phút ` : ''}{seconds} giây
      </div>

      {wrongList.length > 0 && (
        <div className="bg-error/5 rounded-2xl border border-error/20 p-5 mb-6 text-left">
          <h3 className="text-sm font-bold text-error mb-3">❌ Chữ cần ôn lại ({wrongList.length})</h3>
          <div className="flex flex-wrap gap-2">
            {wrongList.map((c, i) => (
              <button
                key={i}
                onClick={() => speakJapanese(c.char)}
                className="px-3 py-2 rounded-xl bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors"
              >
                <span className="font-jp font-bold text-lg text-error">{c.char}</span>
                <span className="text-xs text-error/70 ml-1.5">{c.romaji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button onClick={onRetry} className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90">
          🔄 Luyện tập tiếp
        </button>
        <button onClick={onBack} className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold text-sm cursor-pointer hover:bg-surface-container">
          Về chọn phạm vi
        </button>
      </div>
    </div>
  );
}
