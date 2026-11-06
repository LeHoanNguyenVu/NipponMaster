import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  COUNTERS,
  REFLEX_PROMPTS,
  NUMBERS_CHAPTER_QUIZ,
  type CounterUnit,
} from '../../../data/numbersData';
import { speakJapanese } from '../../../data/kanaData';
import { saveChapterScore } from '../../../utils/beginnerProgressManager';
import type { TabType, NumbersAndTimeProps } from './types';
import NumbersTab from './tabs/NumbersTab';
import PeopleCountersTab from './tabs/PeopleCountersTab';
import DaysOfMonthTab from './tabs/DaysOfMonthTab';
import TimeAndHoursTab from './tabs/TimeAndHoursTab';
import NumberReflexGameTab from './tabs/NumberReflexGameTab';
import NumbersTestTab from './tabs/NumbersTestTab';

export default function NumbersAndTimeScreen({ onChapterComplete }: NumbersAndTimeProps) {
  const { t } = useTranslation(['beginner', 'common']);
  const [activeTab, setActiveTab] = useState<TabType>('numbers');
  const [selectedCounter, setSelectedCounter] = useState<CounterUnit>(COUNTERS[0]);

  // Calendar filter state
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'special'>('all');

  // Reflex Game State
  const [reflexIdx, setReflexIdx] = useState(0);
  const [reflexStreak, setReflexStreak] = useState(0);
  const [reflexSelected, setReflexSelected] = useState<string | null>(null);
  const [reflexFeedback, setReflexFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Chapter Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof NUMBERS_CHAPTER_QUIZ>([]);

  // Current reflex prompt & Shuffled options to guarantee equal 25% probability across A, B, C, D
  const currentPrompt = REFLEX_PROMPTS[reflexIdx];

  const shuffledReflexOptions = useMemo(() => {
    if (!currentPrompt) return [];
    const arr = [...currentPrompt.options];
    for (let i = arr.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentPrompt]);

  // Handle Reflex choice
  const handleReflexChoice = (optionReading: string) => {
    if (reflexFeedback !== null || !currentPrompt) return;
    const isCorrect = optionReading === currentPrompt.correctReading;
    setReflexSelected(optionReading);

    if (isCorrect) {
      setReflexFeedback('correct');
      setReflexStreak((s) => s + 1);
      speakJapanese(currentPrompt.correctReading);
      setTimeout(() => {
        setReflexFeedback(null);
        setReflexSelected(null);
        setReflexIdx((prev) => (prev + 1) % REFLEX_PROMPTS.length);
      }, 1000);
    } else {
      setReflexFeedback('wrong');
      setReflexStreak(0);
      setTimeout(() => {
        setReflexFeedback(null);
        setReflexSelected(null);
      }, 1300);
    }
  };

  const handleNextReflex = () => {
    setReflexFeedback(null);
    setReflexSelected(null);
    setReflexIdx((prev) => (prev + 1) % REFLEX_PROMPTS.length);
  };

  // Handle Quiz
  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = NUMBERS_CHAPTER_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore((s) => s + 1);
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    } else {
      setWrongQuestions((prev) => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < NUMBERS_CHAPTER_QUIZ.length) {
      setQuizIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score + (selectedOption === NUMBERS_CHAPTER_QUIZ[quizIdx].correctIndex ? 0 : 0);
      const pct = Math.round((finalScore / NUMBERS_CHAPTER_QUIZ.length) * 100);
      try {
        saveChapterScore(2, pct);
      } catch (err) {
        console.warn('Failed to save score:', err);
      }
      if (onChapterComplete) {
        onChapterComplete('chapter-2', pct);
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizDone(false);
    setWrongQuestions([]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-serif">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>{t('beginner:numbers.badge')}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-serif">
          {t('beginner:numbers.title')}
        </h1>
        <p className="text-sm text-on-surface-variant mt-1 max-w-3xl leading-relaxed font-serif">
          {t('beginner:numbers.subtitle')}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3 font-serif">
        {[
          { id: 'numbers', label: t('beginner:numbers.tabs.numbers') },
          { id: 'people_counters', label: t('beginner:numbers.tabs.people') },
          { id: 'days_of_month', label: t('beginner:numbers.tabs.calendar') },
          { id: 'time', label: t('beginner:numbers.tabs.time') },
          { id: 'reflex', label: t('beginner:numbers.tabs.reflex') },
          { id: 'test', label: t('beginner:numbers.tabs.test') },
        ].map((tTab) => (
          <button
            key={tTab.id}
            onClick={() => setActiveTab(tTab.id as Parameters<typeof setActiveTab>[0])}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer font-serif ${
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
        {activeTab === 'numbers' && (
          <motion.div
            key="numbers"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <NumbersTab />
          </motion.div>
        )}

        {activeTab === 'people_counters' && (
          <motion.div
            key="people_counters"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <PeopleCountersTab
              selectedCounter={selectedCounter}
              setSelectedCounter={setSelectedCounter}
            />
          </motion.div>
        )}

        {activeTab === 'days_of_month' && (
          <motion.div
            key="days_of_month"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <DaysOfMonthTab
              calendarFilter={calendarFilter}
              setCalendarFilter={setCalendarFilter}
            />
          </motion.div>
        )}

        {activeTab === 'time' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <TimeAndHoursTab />
          </motion.div>
        )}

        {activeTab === 'reflex' && (
          <motion.div
            key="reflex"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <NumberReflexGameTab
              reflexIdx={reflexIdx}
              reflexStreak={reflexStreak}
              reflexSelected={reflexSelected}
              reflexFeedback={reflexFeedback}
              shuffledReflexOptions={shuffledReflexOptions}
              handleReflexChoice={handleReflexChoice}
              handleNextReflex={handleNextReflex}
            />
          </motion.div>
        )}

        {activeTab === 'test' && (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <NumbersTestTab
              quizIdx={quizIdx}
              selectedOption={selectedOption}
              isAnswered={isAnswered}
              score={score}
              quizDone={quizDone}
              wrongQuestions={wrongQuestions}
              handleAnswerSelect={handleAnswerSelect}
              handleNextQuestion={handleNextQuestion}
              handleRestartQuiz={handleRestartQuiz}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

