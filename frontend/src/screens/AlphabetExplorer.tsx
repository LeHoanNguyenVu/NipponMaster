import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Check, ChevronRight, ChevronLeft, BookOpen, PenTool, Sparkles, Trophy, Play, RotateCcw, ArrowRight, Lightbulb, ArrowLeft, Award, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import KanjiInteractiveCanvas from '../components/KanjiInteractiveCanvas';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import {
  type KanaChar,
  HIRAGANA_SEION, HIRAGANA_DAKUON, HIRAGANA_HANDAKUON, HIRAGANA_YOON,
  KATAKANA_SEION, KATAKANA_DAKUON, KATAKANA_HANDAKUON, KATAKANA_YOON,
  SEION_ROW_ORDER, DAKUON_ROW_ORDER, HANDAKUON_ROW_ORDER, YOON_ROW_ORDER,
  EXTENDED_SOUND_RULES,
  getKanaRowLabel, groupByRow, speakJapanese, getNextRow,
} from '../data/kanaData';
import {
  type QuizSet,
  type QuizQuestion,
  getQuizSetsByScope,
  loadSavedQuizScores,
  saveQuizScore,
  type SavedQuizScores,
} from '../data/quizBankData';

type Tab = 'overview' | 'lesson' | 'quiz' | 'practice_all';
type KanaType = 'hiragana' | 'katakana';
type CompScopeType = 'all-h' | 'all-k' | 'mix' | 'yoon';

/* ═══════════════════════════════════════════════════════════════════════ */
/*  MAIN SCREEN                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function AlphabetExplorer() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [kanaType, setKanaType] = useState<KanaType>('hiragana');

  // Lesson state (Tab 2)
  const [lessonRow, setLessonRow] = useState<string | null>(null);
  const [lessonChars, setLessonChars] = useState<KanaChar[]>([]);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [lessonStep, setLessonStep] = useState<'learn' | 'write' | 'pronounce'>('learn');

  // Row Quiz state (Tab 3: Luyện Tập theo hàng vừa học)
  const [rowQuizChars, setRowQuizChars] = useState<KanaChar[]>([]);
  const [rowQuizIdx, setRowQuizIdx] = useState(0);
  const [rowQuizInput, setRowQuizInput] = useState('');
  const [rowQuizResult, setRowQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [rowQuizScore, setRowQuizScore] = useState(0);
  const [rowQuizDone, setRowQuizDone] = useState(false);
  const [rowQuizWrongList, setRowQuizWrongList] = useState<KanaChar[]>([]);
  const [rowQuizStartTime, setRowQuizStartTime] = useState(0);

  // Comprehensive Quiz state (Tab 4: 15 Bài Test Độc Lập cho mỗi mục)
  const [compScope, setCompScope] = useState<CompScopeType | null>(null);
  const [selectedQuizSet, setSelectedQuizSet] = useState<QuizSet | null>(null);
  const [savedScores, setSavedScores] = useState<SavedQuizScores>({});
  const [compIdx, setCompIdx] = useState(0);
  const [compInput, setCompInput] = useState('');
  const [compResult, setCompResult] = useState<'correct' | 'wrong' | null>(null);
  const [compScore, setCompScore] = useState(0);
  const [compDone, setCompDone] = useState(false);
  const [compWrongList, setCompWrongList] = useState<QuizQuestion[]>([]);
  const [compStartTime, setCompStartTime] = useState(0);

  const gridRef = useRef<HTMLDivElement>(null);

  // Load saved scores when activeTab changes
  useEffect(() => {
    setSavedScores(loadSavedQuizScores());
  }, [activeTab]);

  const getChars = useCallback(() => {
    return kanaType === 'hiragana'
      ? { seion: HIRAGANA_SEION, dakuon: HIRAGANA_DAKUON, handakuon: HIRAGANA_HANDAKUON, yoon: HIRAGANA_YOON }
      : { seion: KATAKANA_SEION, dakuon: KATAKANA_DAKUON, handakuon: KATAKANA_HANDAKUON, yoon: KATAKANA_YOON };
  }, [kanaType]);

  // GSAP stagger animation when tab changes
  useEffect(() => {
    if (activeTab === 'overview' && gridRef.current) {
      const cells = gridRef.current.querySelectorAll('[data-kana-cell]');
      gsap.fromTo(cells,
        { opacity: 0, y: 12, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.01, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab, kanaType]);

  /* ── Start Lesson for a row ── */
  const startLesson = (row: string) => {
    const pool = kanaType === 'hiragana'
      ? [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON, ...HIRAGANA_YOON]
      : [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON, ...KATAKANA_YOON];
    const rowChars = pool.filter(c => c.row === row);
    if (rowChars.length === 0) return;
    setLessonRow(row);
    setLessonChars(rowChars);
    setLessonIdx(0);
    setLessonStep('learn');
    setActiveTab('lesson');
  };

  /* ── Start Row Quiz (kiểm tra riêng hàng vừa học) ── */
  const startRowQuiz = (rowToQuiz?: string | null) => {
    const targetRow = rowToQuiz || lessonRow;
    if (!targetRow) return;
    const pool = kanaType === 'hiragana'
      ? [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON, ...HIRAGANA_YOON]
      : [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON, ...KATAKANA_YOON];
    const chars = pool.filter(c => c.row === targetRow);
    if (chars.length === 0) return;

    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    setRowQuizChars(shuffled);
    setRowQuizIdx(0);
    setRowQuizInput('');
    setRowQuizResult(null);
    setRowQuizScore(0);
    setRowQuizDone(false);
    setRowQuizWrongList([]);
    setRowQuizStartTime(Date.now());
    setActiveTab('quiz');
  };

  /* ── Chuyển sang bài học hàng tiếp theo ── */
  const handleNextRow = () => {
    if (!lessonRow) return;
    const nextRow = getNextRow(lessonRow);
    if (nextRow) {
      startLesson(nextRow);
    } else {
      setActiveTab('practice_all');
    }
  };

  /* ── Row Quiz Answer Check ── */
  const checkRowQuizAnswer = () => {
    if (rowQuizDone || rowQuizResult !== null) return;
    const current = rowQuizChars[rowQuizIdx];
    if (!current) return;
    const isCorrect = rowQuizInput.trim().toLowerCase() === current.romaji.toLowerCase();
    setRowQuizResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setRowQuizScore(s => s + 1);
      speakJapanese(current.char);
    } else {
      setRowQuizWrongList(prev => [...prev, current]);
    }

    setTimeout(() => {
      if (rowQuizIdx + 1 >= rowQuizChars.length) {
        setRowQuizDone(true);
      } else {
        setRowQuizIdx(i => i + 1);
        setRowQuizInput('');
        setRowQuizResult(null);
      }
    }, 1100);
  };

  /* ── Bắt đầu một bài test cụ thể trong 15 bài ── */
  const startQuizSet = (quizSet: QuizSet) => {
    setSelectedQuizSet(quizSet);
    setCompIdx(0);
    setCompInput('');
    setCompResult(null);
    setCompScore(0);
    setCompDone(false);
    setCompWrongList([]);
    setCompStartTime(Date.now());
  };

  /* ── Chuyển sang bài test kế tiếp trong 15 bài ── */
  const handleNextQuizSet = () => {
    if (!compScope || !selectedQuizSet) return;
    const allSets = getQuizSetsByScope(compScope);
    const currentIndex = allSets.findIndex(s => s.id === selectedQuizSet.id);
    if (currentIndex >= 0 && currentIndex + 1 < allSets.length) {
      startQuizSet(allSets[currentIndex + 1]);
    } else {
      setSelectedQuizSet(null);
    }
  };

  /* ── Kiểm tra đáp án câu hỏi tổng hợp ── */
  const checkCompQuizAnswer = () => {
    if (compDone || compResult !== null || !selectedQuizSet) return;
    const current = selectedQuizSet.questions[compIdx];
    if (!current) return;
    const isCorrect = compInput.trim().toLowerCase() === current.romaji.toLowerCase();
    setCompResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setCompScore(s => s + 1);
      speakJapanese(current.prompt);
    } else {
      setCompWrongList(prev => [...prev, current]);
    }

    setTimeout(() => {
      if (compIdx + 1 >= selectedQuizSet.questions.length) {
        setCompDone(true);
        const finalScore = isCorrect ? compScore + 1 : compScore;
        if (compScope) {
          saveQuizScore(compScope, selectedQuizSet.id, finalScore, selectedQuizSet.questions.length);
          setSavedScores(loadSavedQuizScores());
        }
      } else {
        setCompIdx(i => i + 1);
        setCompInput('');
        setCompResult(null);
      }
    }, 1100);
  };

  const TABS = [
    { id: 'overview' as Tab, label: 'Bảng Tổng Quan', icon: BookOpen },
    { id: 'lesson' as Tab, label: 'Bài Học', icon: PenTool },
    { id: 'quiz' as Tab, label: 'Luyện Tập', icon: Sparkles },
    { id: 'practice_all' as Tab, label: 'Luyện Tập Tổng Hợp', icon: Trophy },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-1 flex items-center gap-2">
          <span>あ</span> Bảng Chữ Cái Nhật Bản
        </h1>
        <p className="text-sm text-on-surface-variant">
          Học → Viết → Phát âm → Kiểm tra — Luồng học tuần tự theo từng hàng và ngân hàng 15 đề thi độc lập không trùng lặp
        </p>
      </div>

      {/* ── Tab Bar (4 Thẻ) ── */}
      <div className="flex flex-wrap gap-1 p-1 mb-6 bg-surface-container rounded-2xl w-fit">
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
        {/* TAB 1: BẢNG TỔNG QUAN */}
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

        {/* TAB 2: BÀI HỌC (THEO HÀNG) */}
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
                onComplete={() => startRowQuiz(lessonRow)}
              />
            )}
          </motion.div>
        )}

        {/* TAB 3: LUYỆN TẬP (RIÊNG HÀNG VỪA HỌC) */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {rowQuizChars.length === 0 ? (
              <NoRowQuizSelected
                lessonRow={lessonRow}
                onStartCurrentRow={() => lessonRow && startRowQuiz(lessonRow)}
                onGoOverview={() => setActiveTab('overview')}
                onGoComprehensive={() => setActiveTab('practice_all')}
              />
            ) : rowQuizDone ? (
              <RowQuizResultScreen
                score={rowQuizScore}
                total={rowQuizChars.length}
                wrongList={rowQuizWrongList}
                elapsed={Math.round((Date.now() - rowQuizStartTime) / 1000)}
                rowLabel={lessonRow ? getKanaRowLabel(lessonRow) : 'Hàng vừa học'}
                onRetry={() => startRowQuiz(lessonRow)}
                onNextRow={handleNextRow}
                hasNextRow={!!(lessonRow && getNextRow(lessonRow))}
              />
            ) : (
              <div>
                <div className="max-w-md mx-auto mb-3 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                  <span>🎯 Luyện tập: <strong className="text-primary">{lessonRow ? getKanaRowLabel(lessonRow) : ''}</strong></span>
                  <span>Câu {rowQuizIdx + 1}/{rowQuizChars.length}</span>
                </div>
                <QuizCard
                  current={rowQuizChars[rowQuizIdx]}
                  idx={rowQuizIdx}
                  total={rowQuizChars.length}
                  input={rowQuizInput}
                  result={rowQuizResult}
                  score={rowQuizScore}
                  onInput={setRowQuizInput}
                  onCheck={checkRowQuizAnswer}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: LUYỆN TẬP TỔNG HỢP (HỆ THỐNG 15 ĐỀ THI ĐỘC LẬP / MỤC) */}
        {activeTab === 'practice_all' && (
          <motion.div key="practice_all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {!compScope ? (
              // 1. Màn hình chọn 1 trong 4 mục lớn
              <ComprehensiveScopePicker
                onSelectScope={scope => {
                  setCompScope(scope);
                  setSelectedQuizSet(null);
                }}
              />
            ) : !selectedQuizSet ? (
              // 2. Màn hình danh sách 15 bài test độc lập của mục đó
              <QuizSetsGrid
                scope={compScope}
                savedScores={savedScores}
                onSelectSet={startQuizSet}
                onBackToScopes={() => setCompScope(null)}
              />
            ) : compDone ? (
              // 3. Màn hình kết quả bài test
              <ComprehensiveResultScreen
                quizSet={selectedQuizSet}
                score={compScore}
                total={selectedQuizSet.questions.length}
                wrongList={compWrongList}
                elapsed={Math.round((Date.now() - compStartTime) / 1000)}
                onRetry={() => startQuizSet(selectedQuizSet)}
                onNextSet={handleNextQuizSet}
                hasNextSet={selectedQuizSet.id < 15}
                onBackToSets={() => {
                  setSelectedQuizSet(null);
                  setSavedScores(loadSavedQuizScores());
                }}
              />
            ) : (
              // 4. Màn hình làm bài câu hỏi trắc nghiệm
              <div>
                <div className="max-w-md mx-auto mb-3 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Trophy size={14} className="text-primary" />
                    <span className="font-bold text-primary">{selectedQuizSet.title}:</span>
                    <span>{selectedQuizSet.subtitle}</span>
                  </span>
                  <span>Câu {compIdx + 1}/{selectedQuizSet.questions.length}</span>
                </div>
                <CompQuizQuestionCard
                  current={selectedQuizSet.questions[compIdx]}
                  idx={compIdx}
                  total={selectedQuizSet.questions.length}
                  input={compInput}
                  result={compResult}
                  score={compScore}
                  onInput={setCompInput}
                  onCheck={checkCompQuizAnswer}
                />
              </div>
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
  getChars: () => { seion: KanaChar[]; dakuon: KanaChar[]; handakuon: KanaChar[]; yoon: KanaChar[] };
  onStartLesson: (row: string) => void;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [selectedChar, setSelectedChar] = useState<KanaChar | null>(null);
  const [activeRuleTab, setActiveRuleTab] = useState<string>('sokuon');
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
                  className="text-xs font-semibold text-primary hover:text-primary-container cursor-pointer flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-primary/10"
                >
                  <Play size={12} fill="currentColor" /> Bắt đầu
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

  const currentRule = EXTENDED_SOUND_RULES.find(r => r.id === activeRuleTab) || EXTENDED_SOUND_RULES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Grid + Sound Rules */}
      <div className="flex-1 min-w-0">
        {/* Toggle Hiragana / Katakana */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onToggleType}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              kanaType === 'hiragana' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            あ Hiragana
          </button>
          <button
            onClick={onToggleType}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              kanaType === 'katakana' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            ア Katakana
          </button>
        </div>

        {/* Kana Table Sections */}
        <div ref={gridRef}>
          {renderSection('1. Âm Trong (清音 Seion)', chars.seion, SEION_ROW_ORDER)}
          {renderSection('2. Âm Đục (濁音 Dakuon)', chars.dakuon, DAKUON_ROW_ORDER)}
          {renderSection('3. Âm Bán Đục (半濁音 Handakuon)', chars.handakuon, HANDAKUON_ROW_ORDER)}
          {renderSection('4. Âm Ghép (拗音 Yōon)', chars.yoon, YOON_ROW_ORDER)}
        </div>

        {/* ── BỔ SUNG QUY TẮC ÂM ĐỌC MỞ RỘNG ── */}
        <div className="mt-10 pt-8 border-t border-outline-variant/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={20} className="text-amber-500" />
            <h2 className="text-lg font-bold text-on-surface tracking-tight">
              5. Quy Tắc Âm Đọc Mở Rộng
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mb-5">
            Kiến thức nền tảng bắt buộc để phát âm chuẩn và nhận diện biến âm: Âm ngắt, Trường âm & Âm mũi.
          </p>

          {/* Rule Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {EXTENDED_SOUND_RULES.map(rule => (
              <button
                key={rule.id}
                onClick={() => setActiveRuleTab(rule.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRuleTab === rule.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span>{rule.badge}</span>
                <span>{rule.name}</span>
              </button>
            ))}
          </div>

          {/* Rule Detail Card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 md:p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                  <span>{currentRule.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-semibold">{currentRule.subtitle}</span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {currentRule.description}
                </p>
              </div>
            </div>

            {/* Formula box */}
            <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20 mb-4">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">Công thức ghi nhớ:</span>
              <span className="text-xs font-semibold text-on-surface font-mono">{currentRule.formula}</span>
            </div>

            {/* Notes */}
            <div className="space-y-1 mb-5">
              {currentRule.notes.map((n, i) => (
                <div key={i} className="text-xs text-on-surface-variant flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>

            {/* Examples grid */}
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                Ví dụ minh họa & Phát âm trực quan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentRule.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-jp text-on-surface">{ex.word}</span>
                        <span className="text-xs font-mono text-primary font-semibold">[{ex.romaji}]</span>
                      </div>
                      <button
                        onClick={() => speakJapanese(ex.word)}
                        className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white cursor-pointer transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium">
                      {ex.meaning}
                    </div>

                    {ex.contrastWith && (
                      <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
                        <div>
                          <span className="text-error font-semibold">Phân biệt: </span>
                          <span className="font-jp font-bold text-on-surface">{ex.contrastWith.word}</span> ({ex.contrastWith.romaji}) — {ex.contrastWith.meaning}
                        </div>
                        <button
                          onClick={() => speakJapanese(ex.contrastWith!.word)}
                          className="p-1 rounded hover:bg-surface-container-high cursor-pointer ml-1"
                          title="Nghe đối chiếu"
                        >
                          <Volume2 size={12} className="text-error" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Selected Char Detail Panel */}
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
                <div className="text-xs text-on-surface-variant mt-1">
                  {selectedChar.strokeCount} nét • {
                    selectedChar.category === 'seion' ? 'Âm trong' :
                    selectedChar.category === 'dakuon' ? 'Âm đục' :
                    selectedChar.category === 'handakuon' ? 'Bán đục' : 'Âm ghép'
                  }
                </div>
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
                <Play size={14} fill="currentColor" /> Bắt đầu học {getKanaRowLabel(selectedChar.row)}
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
    <div className="text-center py-20 max-w-md mx-auto">
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-lg font-bold text-on-surface mb-2">Chưa chọn hàng chữ cái</h2>
      <p className="text-sm text-on-surface-variant mb-6">Hãy chọn một hàng chữ cái từ Bảng Tổng Quan để bắt đầu học tuần tự.</p>
      <button onClick={onGoOverview} className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm cursor-pointer hover:opacity-90">
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

  const STEPS = [
    { id: 'learn' as const, label: 'Học', emoji: '📖' },
    { id: 'write' as const, label: 'Luyện viết', emoji: '✍️' },
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
              <div className="flex-1 flex flex-col items-center">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/30 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-[120px] md:text-[150px] font-bold font-jp text-on-surface leading-none">{current.char}</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{current.romaji}</div>
                <div className="text-sm text-on-surface-variant">
                  {current.strokeCount} nét • {
                    current.category === 'seion' ? 'Âm trong' :
                    current.category === 'dakuon' ? 'Âm đục' :
                    current.category === 'handakuon' ? 'Bán đục' : 'Âm ghép'
                  }
                </div>
                <button
                  onClick={() => speakJapanese(current.char)}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Volume2 size={16} /> Nghe phát âm
                </button>
              </div>

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
                    Luyện viết từ 3-5 lần để thành thạo thứ tự nét!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BƯỚC LUYỆN VIẾT — TỰ LUYỆN KÈM THỨ TỰ NÉT CHUẨN */}
        {step === 'write' && (
          <motion.div key="write" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Cột trái: Bảng vẽ Washi cho user tự luyện viết */}
              <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full max-w-[320px] mb-3">
                  <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                    <span>✍️ Luyện viết chữ</span>
                    <span className="font-jp text-primary text-2xl font-bold">{current.char}</span>
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {current.strokeCount} nét
                  </span>
                </div>

                <KanjiInteractiveCanvas
                  guideCharacter={current.char}
                  width={280}
                  height={280}
                />

                <p className="text-xs text-on-surface-variant text-center mt-3 max-w-xs">
                  Sử dụng thanh công cụ để <strong>Hoàn tác</strong>, <strong>Xóa bảng</strong> hoặc <strong>Ẩn/Hiện chữ mẫu</strong> để tự thử thách.
                </p>
              </div>

              {/* Cột phải: Hướng dẫn thứ tự nét trực quan & Mẹo luyện viết */}
              <div className="flex-1 w-full space-y-4">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                      <span>Thứ tự nét viết chuẩn</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-primary">
                      [{current.romaji}] • {current.strokeCount} nét
                    </span>
                  </div>

                  <div className="bg-surface-container/60 rounded-xl p-4 flex flex-col items-center justify-center">
                    <KanjiStrokeWriter
                      key={current.char}
                      character={current.char}
                      size={170}
                      showNumbers={true}
                      standalone={true}
                    />
                    <span className="text-[11px] text-on-surface-variant mt-2 text-center">
                      Bấm nút <span className="font-semibold text-primary">↺ Xem lại nét</span> để xem hoạt ảnh từng nét viết
                    </span>
                  </div>
                </div>

                <div className="bg-amber-500/8 rounded-2xl border border-amber-500/20 p-5 space-y-2.5">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb size={15} className="text-amber-600" />
                    <span>Phương pháp tự luyện viết:</span>
                  </div>
                  <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Quan sát số nét:</strong> Nhìn các số thứ tự màu sắc (1, 2, 3...) ở khung bên trên để biết nét nào đặt bút trước.
                    </li>
                    <li>
                      <strong>Tập viết theo mẫu:</strong> Đồ theo nét mờ trên bảng vẽ bên trái 3–5 lần cho tới khi quen tay.
                    </li>
                    <li>
                      <strong>Thử thách nhớ mặt chữ:</strong> Bấm nút <strong>"Ẩn mẫu"</strong> ở thanh công cụ để tự viết lại theo trí nhớ.
                    </li>
                    <li>
                      Khi đã quen tay và tự tin, bấm <strong>"Phát âm"</strong> bên dưới để hoàn thành bài học!
                    </li>
                  </ul>
                </div>
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
                <p className="text-sm text-on-surface-variant">Bấm các nút bên dưới để nghe phát âm chuẩn bản xứ</p>
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
                  <Volume2 size={18} /> Phát âm chuẩn: {current.char}
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles size={16} /> Hoàn thành hàng → Luyện tập
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
/*  TAB 3: ROW QUIZ (LUYỆN TẬP RIÊNG HÀNG VỪA HỌC)                      */
/* ═══════════════════════════════════════════════════════════════════════ */

function NoRowQuizSelected({
  lessonRow, onStartCurrentRow, onGoOverview, onGoComprehensive,
}: {
  lessonRow: string | null;
  onStartCurrentRow: () => void;
  onGoOverview: () => void;
  onGoComprehensive: () => void;
}) {
  return (
    <div className="text-center py-16 max-w-md mx-auto">
      <div className="text-5xl mb-4">✨</div>
      <h2 className="text-lg font-bold text-on-surface mb-2">Chưa có bài kiểm tra hàng</h2>
      <p className="text-sm text-on-surface-variant mb-6">
        Sau khi học xong một hàng ở thẻ <strong>"Bài Học"</strong>, hệ thống sẽ tự động đưa bạn đến đây để kiểm tra riêng hàng đó.
      </p>
      <div className="flex flex-col gap-2.5">
        {lessonRow && (
          <button onClick={onStartCurrentRow} className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90">
            Luyện tập ngay {getKanaRowLabel(lessonRow)}
          </button>
        )}
        <button onClick={onGoOverview} className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm cursor-pointer hover:bg-surface-container">
          Vào Bảng Tổng Quan chọn hàng học
        </button>
        <button onClick={onGoComprehensive} className="px-5 py-2.5 rounded-xl bg-surface-container text-primary font-semibold text-sm cursor-pointer hover:bg-surface-container-high">
          Chuyển sang Luyện Tập Tổng Hợp
        </button>
      </div>
    </div>
  );
}

function RowQuizResultScreen({
  score, total, wrongList, elapsed, rowLabel, onRetry, onNextRow, hasNextRow,
}: {
  score: number;
  total: number;
  wrongList: KanaChar[];
  elapsed: number;
  rowLabel: string;
  onRetry: () => void;
  onNextRow: () => void;
  hasNextRow: boolean;
}) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🎉' : pct >= 70 ? '👏' : pct >= 50 ? '📚' : '💪';
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="max-w-lg mx-auto py-10 text-center">
      <div className="text-6xl mb-3">{emoji}</div>
      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{rowLabel}</div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">Kết Quả Luyện Tập Hàng</h2>

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
                className="px-3 py-2 rounded-xl bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors flex items-center gap-1.5"
              >
                <span className="font-jp font-bold text-lg text-error">{c.char}</span>
                <span className="text-xs text-error/70 font-mono">{c.romaji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm cursor-pointer hover:bg-primary/8 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> Làm lại
        </button>

        <button
          onClick={onNextRow}
          className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
        >
          <span>{hasNextRow ? 'Bài tiếp theo' : 'Hoàn thành bảng → Tổng hợp'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  TAB 4: COMPREHENSIVE PRACTICE (15 BÀI TEST ĐỘC LẬP / MỤC)           */
/* ═══════════════════════════════════════════════════════════════════════ */

/* MÀN HÌNH 1: CHỌN MỤC LUYỆN TẬP */
function ComprehensiveScopePicker({
  onSelectScope,
}: {
  onSelectScope: (scope: CompScopeType) => void;
}) {
  const scopes: { id: CompScopeType; icon: string; title: string; subtitle: string; desc: string }[] = [
    {
      id: 'all-h',
      icon: 'あ',
      title: 'Toàn bộ Hiragana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Bao quát trọn vẹn 71 chữ cái Hiragana (Âm trong, Âm đục, Bán đục) và từ vựng ứng dụng.',
    },
    {
      id: 'all-k',
      icon: 'ア',
      title: 'Toàn bộ Katakana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Bao quát trọn vẹn 71 chữ cái Katakana, phân biệt nét dễ nhầm (シ/ツ, ソ/ン) và từ mượn.',
    },
    {
      id: 'mix',
      icon: '🔀',
      title: 'Trộn lẫn Hiragana & Katakana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Rèn luyện phản xạ chuyển đổi song song cả 2 bảng chữ cái một cách tức thì.',
    },
    {
      id: 'yoon',
      icon: '⭐',
      title: 'Âm ghép Yōon (Hiragana & Katakana)',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Chuyên đề 66 âm ghép kết hợp với ya, yu, yo nhỏ và hàng chục từ vựng đời sống thực tế.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🃏</div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Luyện Tập Tổng Hợp</h2>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Mỗi mục bao gồm <strong>15 bài trắc nghiệm độc lập</strong> (20 câu/bài) được phân bổ theo lộ trình kiến thức chuẩn, bao quát toàn diện các hàng âm và hoàn toàn không bị trùng lặp câu hỏi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scopes.map(s => (
          <button
            key={s.id}
            onClick={() => onSelectScope(s.id)}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-left cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-jp font-bold flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                  {s.icon}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                  15 Bài Test
                </span>
              </div>

              <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors text-base mb-1">
                {s.title}
              </h3>
              <p className="text-xs font-semibold text-primary mb-2">
                {s.subtitle}
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-bold text-primary">
              <span>Xem danh sách 15 bài</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* MÀN HÌNH 2: DANH SÁCH 15 BÀI TEST ĐỘC LẬP CỦA MỤC ĐÃ CHỌN */
function QuizSetsGrid({
  scope, savedScores, onSelectSet, onBackToScopes,
}: {
  scope: CompScopeType;
  savedScores: SavedQuizScores;
  onSelectSet: (set: QuizSet) => void;
  onBackToScopes: () => void;
}) {
  const quizSets = getQuizSetsByScope(scope);

  const scopeTitles: Record<CompScopeType, { title: string; icon: string }> = {
    'all-h': { title: 'Toàn Bộ Hiragana', icon: 'あ' },
    'all-k': { title: 'Toàn Bộ Katakana', icon: 'ア' },
    'mix': { title: 'Trộn Lẫn Cả 2 Bảng', icon: '🔀' },
    'yoon': { title: 'Âm Ghép Yōon', icon: '⭐' },
  };

  const currentInfo = scopeTitles[scope];

  // Tính số bài đã làm
  const completedCount = quizSets.filter(s => {
    const key = `${scope}_${s.id}`;
    return savedScores[key] !== undefined;
  }).length;

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-outline-variant/30">
        <button
          onClick={onBackToScopes}
          className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary cursor-pointer transition-colors w-fit px-3 py-1.5 rounded-xl hover:bg-surface-container"
        >
          <ArrowLeft size={16} /> Quay lại chọn mục khác
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-on-surface-variant">
            Tiến độ hoàn thành: <strong className="text-primary">{completedCount}/15 bài</strong>
          </div>
          <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2 mb-1">
          <span>{currentInfo.icon}</span>
          <span>15 Bài Trắc Nghiệm Độc Lập — {currentInfo.title}</span>
        </h2>
        <p className="text-xs text-on-surface-variant">
          Các bài test có nội dung câu hỏi hoàn toàn tách biệt, được chia nhỏ giúp bạn luyện tập tuần tự và nâng cao phản xạ.
        </p>
      </div>

      {/* Grid 15 bài test */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {quizSets.map(set => {
          const key = `${scope}_${set.id}`;
          const saved = savedScores[key];
          const isCompleted = saved !== undefined;
          const isPerfect = saved?.bestScore === set.questions.length;

          return (
            <div
              key={set.id}
              onClick={() => onSelectSet(set)}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold">
                    {set.title}
                  </span>

                  {isCompleted ? (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isPerfect ? 'bg-secondary/15 text-secondary' : 'bg-primary/10 text-primary'
                    }`}>
                      <Award size={12} /> {saved.bestScore}/{set.questions.length}
                    </span>
                  ) : (
                    <span className="text-[11px] text-on-surface-variant/60 font-medium">
                      Chưa làm
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors mb-1">
                  {set.subtitle}
                </h4>

                <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {set.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="text-[11px] text-on-surface-variant/70 font-medium">
                  {set.questions.length} câu hỏi
                </span>
                <span className="font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Làm bài <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* MÀN HÌNH 3: KẾT QUẢ BÀI TEST VỚI 3 NÚT ĐIỀU HƯỚNG */
function ComprehensiveResultScreen({
  quizSet, score, total, wrongList, elapsed, onRetry, onNextSet, hasNextSet, onBackToSets,
}: {
  quizSet: QuizSet;
  score: number;
  total: number;
  wrongList: QuizQuestion[];
  elapsed: number;
  onRetry: () => void;
  onNextSet: () => void;
  hasNextSet: boolean;
  onBackToSets: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 75 ? '🎉' : pct >= 50 ? '📚' : '💪';
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="max-w-lg mx-auto py-8 text-center">
      <div className="text-6xl mb-2">{emoji}</div>
      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{quizSet.title}: {quizSet.subtitle}</div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">Kết Quả Bài Kiểm Tra</h2>

      <div className={`text-5xl font-bold mb-1 ${pct >= 80 ? 'text-secondary' : pct >= 50 ? 'text-tertiary' : 'text-error'}`}>
        {score}/{total}
      </div>
      <div className="text-sm text-on-surface-variant mb-6">
        {pct}% chính xác • {minutes > 0 ? `${minutes} phút ` : ''}{seconds} giây
      </div>

      {wrongList.length > 0 && (
        <div className="bg-error/5 rounded-2xl border border-error/20 p-5 mb-6 text-left">
          <h3 className="text-sm font-bold text-error mb-3">❌ Câu cần xem lại ({wrongList.length})</h3>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {wrongList.map((q, i) => (
              <button
                key={i}
                onClick={() => speakJapanese(q.prompt)}
                className="px-3 py-2 rounded-xl bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors flex items-center gap-1.5"
              >
                <span className="font-jp font-bold text-lg text-error">{q.prompt}</span>
                <span className="text-xs text-error/70 font-mono">[{q.romaji}]</span>
                {q.subText && <span className="text-[10px] text-error/60">({q.subText})</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3 Nút tiện lợi: Làm lại, Bài tiếp theo, Danh sách 15 bài */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm cursor-pointer hover:bg-primary/8 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> Làm lại bài này
        </button>

        {hasNextSet ? (
          <button
            onClick={onNextSet}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 flex items-center gap-2 shadow-sm"
          >
            <span>Bài tiếp theo (Bài {String(quizSet.id + 1).padStart(2, '0')})</span>
            <ArrowRight size={16} />
          </button>
        ) : null}

        <button
          onClick={onBackToSets}
          className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold text-sm cursor-pointer hover:bg-surface-container flex items-center gap-2"
        >
          <ListChecks size={16} /> Danh sách 15 bài test
        </button>
      </div>
    </div>
  );
}

/* MÀN HÌNH 4: THẺ CÂU HỎI TRẮC NGHIỆM TỔNG HỢP */
function CompQuizQuestionCard({
  current, idx, total, input, result, score, onInput, onCheck,
}: {
  current: QuizQuestion;
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

  if (!current) return null;

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
        <span>Câu {idx + 1}/{total}</span>
        <span className="font-semibold text-secondary">✓ {score} đúng</span>
      </div>
      <div className="h-1.5 bg-surface-container rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 text-center shadow-sm mb-6">
        <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          {current.type === 'char' ? 'Nhận diện mặt chữ' : 'Từ vựng ứng dụng'}
        </div>

        {current.subText && (
          <div className="text-xs text-primary font-medium mb-3">
            {current.subText}
          </div>
        )}

        <div className="text-7xl md:text-8xl font-bold font-jp text-on-surface mb-6 leading-none">
          {current.prompt}
        </div>

        {/* Answer input */}
        <form onSubmit={e => { e.preventDefault(); onCheck(); }}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => onInput(e.target.value)}
              placeholder="Gõ phiên âm romaji..."
              disabled={result !== null}
              autoFocus
              className={`flex-1 px-4 py-3 rounded-xl text-center text-lg font-bold border-2 outline-none transition-all ${
                result === 'correct'
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : result === 'wrong'
                  ? 'border-error bg-error/10 text-error'
                  : 'border-outline-variant focus:border-primary'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || result !== null}
              className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <Check size={18} />
            </button>
          </div>
        </form>

        {/* Feedback message */}
        <AnimatePresence>
          {result === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-error font-medium"
            >
              Đáp án đúng: <span className="font-bold font-mono text-base">{current.romaji}</span>
            </motion.div>
          )}
          {result === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-secondary font-bold"
            >
              Chính xác! ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SHARED QUIZ CARD COMPONENT (CHO TAB 3 ROW QUIZ)                      */
/* ═══════════════════════════════════════════════════════════════════════ */

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

  if (!current) return null;

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
        <span>Câu {idx + 1}/{total}</span>
        <span className="font-semibold text-secondary">✓ {score} đúng</span>
      </div>
      <div className="h-1.5 bg-surface-container rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 text-center shadow-sm mb-6">
        <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
          {current.type === 'hiragana' ? 'Hiragana' : 'Katakana'}
        </div>
        <div className="text-8xl md:text-9xl font-bold font-jp text-on-surface mb-6 leading-none">
          {current.char}
        </div>

        {/* Answer input */}
        <form onSubmit={e => { e.preventDefault(); onCheck(); }}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => onInput(e.target.value)}
              placeholder="Gõ romaji..."
              disabled={result !== null}
              autoFocus
              className={`flex-1 px-4 py-3 rounded-xl text-center text-lg font-bold border-2 outline-none transition-all ${
                result === 'correct'
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : result === 'wrong'
                  ? 'border-error bg-error/10 text-error'
                  : 'border-outline-variant focus:border-primary'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || result !== null}
              className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <Check size={18} />
            </button>
          </div>
        </form>

        {/* Feedback message */}
        <AnimatePresence>
          {result === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-error font-medium"
            >
              Đáp án đúng: <span className="font-bold font-mono text-base">{current.romaji}</span>
            </motion.div>
          )}
          {result === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-secondary font-bold"
            >
              Chính xác! ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
