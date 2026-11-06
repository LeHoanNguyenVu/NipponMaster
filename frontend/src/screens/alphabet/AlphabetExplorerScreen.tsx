import { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, PenTool, Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import {
  HIRAGANA_SEION,
  HIRAGANA_DAKUON,
  HIRAGANA_HANDAKUON,
  HIRAGANA_YOON,
  KATAKANA_SEION,
  KATAKANA_DAKUON,
  KATAKANA_HANDAKUON,
  KATAKANA_YOON,
  getKanaRowLabel,
  getNextRow,
} from '../../data/kanaData';
import {
  getLearnedKanaRows,
  markKanaRowLearned,
  getChapter1RealMaxScore,
  getChapter1CompletedQuizzesCount,
} from '../../data/quizBankData';
import { isUserAdvancedLevel } from '../../utils/beginnerProgressManager';
import { useAuthStore } from '../../store/useAuthStore';

import type { Tab, KanaType, AlphabetExplorerProps } from './types';
import { useKanaLesson } from './hooks/useKanaLesson';
import { useKanaRowQuiz } from './hooks/useKanaRowQuiz';
import { useKanaComprehensiveQuiz } from './hooks/useKanaComprehensiveQuiz';

import OverviewGrid from './components/OverviewGrid';
import LessonMode, { NoLessonSelected } from './components/LessonMode';
import {
  NoRowQuizSelected,
  RowQuizResultScreen,
  QuizCard,
} from './components/RowQuizMode';
import {
  ComprehensiveScopePicker,
  QuizSetsGrid,
  ComprehensiveResultScreen,
  CompQuizQuestionCard,
} from './components/ComprehensiveQuizMode';

export default function AlphabetExplorerScreen({ onChapterComplete }: AlphabetExplorerProps = {}) {
  const { t, i18n } = useTranslation(['beginner', 'common']);
  const currentLang = i18n.language || 'vi';
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [kanaType, setKanaType] = useState<KanaType>('hiragana');
  const [learnedRows, setLearnedRows] = useState<string[]>(() => getLearnedKanaRows());
  const gridRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthStore();
  const isAdvanced = isUserAdvancedLevel();
  const currentLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
  const realMaxScore = getChapter1RealMaxScore();
  const completedTestsCount = getChapter1CompletedQuizzesCount();

  // Custom Hooks
  const {
    lessonRow,
    lessonChars,
    lessonIdx,
    lessonStep,
    setLessonStep,
    startLesson: startLessonInternal,
    handleNextChar,
    handlePrevChar,
  } = useKanaLesson();

  const {
    rowQuizChars,
    rowQuizIdx,
    rowQuizInput,
    setRowQuizInput,
    rowQuizResult,
    rowQuizScore,
    rowQuizDone,
    rowQuizWrongList,
    rowQuizElapsed,
    startRowQuiz: startRowQuizInternal,
    checkRowQuizAnswer,
  } = useKanaRowQuiz();

  const {
    compScope,
    setCompScope,
    selectedQuizSet,
    setSelectedQuizSet,
    savedScores,
    refreshScores,
    compIdx,
    compInput,
    setCompInput,
    compResult,
    compScore,
    compDone,
    compWrongList,
    compElapsed,
    startQuizSet,
    handleNextQuizSet,
    checkCompQuizAnswer,
  } = useKanaComprehensiveQuiz();

  // Load saved scores and learned rows when activeTab changes
  useEffect(() => {
    refreshScores();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLearnedRows(getLearnedKanaRows());
  }, [activeTab, refreshScores]);

  const getChars = useCallback(() => {
    return kanaType === 'hiragana'
      ? { seion: HIRAGANA_SEION, dakuon: HIRAGANA_DAKUON, handakuon: HIRAGANA_HANDAKUON, yoon: HIRAGANA_YOON }
      : { seion: KATAKANA_SEION, dakuon: KATAKANA_DAKUON, handakuon: KATAKANA_HANDAKUON, yoon: KATAKANA_YOON };
  }, [kanaType]);

  // GSAP stagger animation when tab changes
  useEffect(() => {
    if (activeTab === 'overview' && gridRef.current) {
      const cells = gridRef.current.querySelectorAll('[data-kana-cell]');
      gsap.fromTo(
        cells,
        { opacity: 0, y: 12, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.01, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab, kanaType]);

  /* ── Start Lesson for a row ── */
  const startLesson = (row: string) => {
    if (startLessonInternal(row, kanaType)) {
      setActiveTab('lesson');
    }
  };

  /* ── Start Row Quiz ── */
  const startRowQuiz = (rowToQuiz?: string | null) => {
    const targetRow = rowToQuiz || lessonRow;
    if (startRowQuizInternal(targetRow, kanaType)) {
      setActiveTab('quiz');
    }
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

  const handleRowQuizCheck = () => {
    checkRowQuizAnswer(() => {
      if (lessonRow) {
        markKanaRowLearned(lessonRow);
        setLearnedRows(getLearnedKanaRows());
      }
    });
  };

  const TABS = [
    { id: 'overview' as Tab, label: t('beginner:alphabet.tabs.overview'), icon: BookOpen },
    { id: 'lesson' as Tab, label: t('beginner:alphabet.tabs.lesson'), icon: PenTool },
    { id: 'quiz' as Tab, label: t('beginner:alphabet.tabs.quiz'), icon: Sparkles },
    { id: 'practice_all' as Tab, label: t('beginner:alphabet.tabs.practice_all'), icon: Trophy },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-1 flex items-center gap-2 font-serif">
          <span className="font-jp text-primary">あ</span> {t('beginner:alphabet.headerTitle')}
        </h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {t('beginner:alphabet.headerSubtitle')}
        </p>
      </div>

      {/* ── Real Progress Indicator Banner for Chapter 1 ── */}
      <div
        className="mb-6 p-4 bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ borderRadius: '2px' }}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {t('beginner:alphabet.progressLabel')}
            </span>
            <span className="text-xs text-on-surface-variant">•</span>
            <span className="text-xs font-semibold text-on-surface">
              {t('beginner:alphabet.learnedRows', { count: learnedRows.length })}
            </span>
            <span className="text-xs text-on-surface-variant">•</span>
            <span className="text-xs font-semibold text-on-surface">
              {t('beginner:alphabet.completedTests', { count: completedTestsCount })}
            </span>
          </div>
          <div className="text-xs">
            {realMaxScore >= 85 ? (
              <span className="text-secondary font-bold flex items-center gap-1">
                {t('beginner:alphabet.passedScoreNote', { score: realMaxScore })}
              </span>
            ) : realMaxScore > 0 ? (
              <span className="text-primary font-bold flex items-center gap-1">
                {t('beginner:alphabet.currentScoreNote', { score: realMaxScore })}{' '}
                {isAdvanced && `— ${t('beginner:hub.unlocked', { level: currentLevel })}`}
              </span>
            ) : isAdvanced ? (
              <span className="text-secondary font-bold flex items-center gap-1">
                {t('beginner:alphabet.advancedUnlockedNote', { level: currentLevel })}
              </span>
            ) : (
              <span className="text-amber-800 dark:text-amber-400 font-medium flex items-center gap-1">
                {t('beginner:alphabet.lockedNote', { score: realMaxScore })}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar with 85% Marker */}
        <div className="w-full md:w-64 space-y-1 flex-shrink-0">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-on-surface-variant">{t('beginner:alphabet.highestScore')}</span>
            <span className={realMaxScore >= 85 ? 'text-secondary' : 'text-primary'}>
              {realMaxScore}% / 85%
            </span>
          </div>
          <div
            className="h-2 bg-surface-container-high overflow-hidden relative"
            style={{ borderRadius: '1px' }}
          >
            <div
              className={`h-full transition-all duration-500 ${
                realMaxScore >= 85 ? 'bg-secondary' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(100, realMaxScore)}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-500 z-10"
              style={{ left: '85%' }}
              title="85%"
            />
          </div>
        </div>
      </div>

      {/* ── Tab Bar (4 Thẻ) ── */}
      <div
        className="flex flex-wrap gap-1 p-1 mb-6 bg-surface-container border border-outline-variant/40 w-fit"
        style={{ borderRadius: '2px' }}
      >
        {TABS.map((tItem) => (
          <button
            key={tItem.id}
            onClick={() => setActiveTab(tItem.id)}
            className={`px-4 py-2 text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === tItem.id
                ? 'bg-primary text-on-primary shadow-flat-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
            style={{ borderRadius: '2px' }}
          >
            <tItem.icon size={16} />
            {tItem.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {/* TAB 1: BẢNG TỔNG QUAN */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <OverviewGrid
              kanaType={kanaType}
              onToggleType={() => setKanaType((k) => (k === 'hiragana' ? 'katakana' : 'hiragana'))}
              getChars={getChars}
              onStartLesson={startLesson}
              gridRef={gridRef}
            />
          </motion.div>
        )}

        {/* TAB 2: BÀI HỌC (THEO HÀNG) */}
        {activeTab === 'lesson' && (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {lessonChars.length === 0 ? (
              <NoLessonSelected onGoOverview={() => setActiveTab('overview')} />
            ) : (
              <LessonMode
                chars={lessonChars}
                idx={lessonIdx}
                step={lessonStep}
                row={lessonRow || ''}
                kanaType={kanaType}
                onNextChar={handleNextChar}
                onPrevChar={handlePrevChar}
                onSetStep={setLessonStep}
                isLastChar={lessonIdx === lessonChars.length - 1}
                onComplete={() => {
                  if (lessonRow) {
                    markKanaRowLearned(lessonRow);
                    setLearnedRows(getLearnedKanaRows());
                  }
                  startRowQuiz(lessonRow);
                }}
              />
            )}
          </motion.div>
        )}

        {/* TAB 3: LUYỆN TẬP (RIÊNG HÀNG VỪA HỌC) */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
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
                elapsed={rowQuizElapsed}
                rowLabel={
                  lessonRow
                    ? getKanaRowLabel(lessonRow, currentLang)
                    : currentLang === 'en'
                    ? 'Learned Row'
                    : 'Hàng vừa học'
                }
                onRetry={() => startRowQuiz(lessonRow)}
                onNextRow={handleNextRow}
                hasNextRow={!!(lessonRow && getNextRow(lessonRow))}
              />
            ) : (
              <div>
                <div className="max-w-md mx-auto mb-3 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                  <span>
                    🎯 {currentLang === 'en' ? 'Practice' : 'Luyện tập'}:{' '}
                    <strong className="text-primary">
                      {lessonRow ? getKanaRowLabel(lessonRow, currentLang) : ''}
                    </strong>
                  </span>
                  <span>
                    {currentLang === 'en' ? 'Question' : 'Câu'} {rowQuizIdx + 1}/
                    {rowQuizChars.length}
                  </span>
                </div>
                <QuizCard
                  current={rowQuizChars[rowQuizIdx]}
                  idx={rowQuizIdx}
                  total={rowQuizChars.length}
                  input={rowQuizInput}
                  result={rowQuizResult}
                  score={rowQuizScore}
                  onInput={setRowQuizInput}
                  onCheck={handleRowQuizCheck}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: LUYỆN TẬP TỔNG HỢP (HỆ THỐNG 15 ĐỀ THI ĐỘC LẬP / MỤC) */}
        {activeTab === 'practice_all' && (
          <motion.div
            key="practice_all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {!compScope ? (
              <ComprehensiveScopePicker
                onSelectScope={(scope) => {
                  setCompScope(scope);
                  setSelectedQuizSet(null);
                }}
              />
            ) : !selectedQuizSet ? (
              <QuizSetsGrid
                scope={compScope}
                savedScores={savedScores}
                onSelectSet={startQuizSet}
                onBackToScopes={() => setCompScope(null)}
              />
            ) : compDone ? (
              <ComprehensiveResultScreen
                quizSet={selectedQuizSet}
                score={compScore}
                total={selectedQuizSet.questions.length}
                wrongList={compWrongList}
                elapsed={compElapsed}
                onRetry={() => startQuizSet(selectedQuizSet)}
                onNextSet={handleNextQuizSet}
                hasNextSet={selectedQuizSet.id < 15}
                onBackToSets={() => {
                  setSelectedQuizSet(null);
                  refreshScores();
                }}
              />
            ) : (
              <div>
                <div className="max-w-md mx-auto mb-3 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Trophy size={14} className="text-primary" />
                    <span className="font-bold text-primary">{selectedQuizSet.title}:</span>
                    <span>{selectedQuizSet.subtitle}</span>
                  </span>
                  <span>
                    Câu {compIdx + 1}/{selectedQuizSet.questions.length}
                  </span>
                </div>
                <CompQuizQuestionCard
                  current={selectedQuizSet.questions[compIdx]}
                  idx={compIdx}
                  total={selectedQuizSet.questions.length}
                  input={compInput}
                  result={compResult}
                  score={compScore}
                  onInput={setCompInput}
                  onCheck={() => checkCompQuizAnswer(onChapterComplete)}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
