import type { CounterUnit } from '../../../data/numbersData';

export type TabType = 'numbers' | 'people_counters' | 'days_of_month' | 'time' | 'reflex' | 'test';

export interface NumbersAndTimeProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export interface DualReadingPlayerProps {
  hiragana: string;
  romaji: string;
  colorClass?: string;
}

export interface PeopleCountersTabProps {
  selectedCounter: CounterUnit;
  setSelectedCounter: (c: CounterUnit) => void;
}

export interface DaysOfMonthTabProps {
  calendarFilter: 'all' | 'special';
  setCalendarFilter: (f: 'all' | 'special') => void;
}

export interface NumberReflexGameTabProps {
  reflexIdx: number;
  reflexStreak: number;
  reflexSelected: string | null;
  reflexFeedback: 'correct' | 'wrong' | null;
  shuffledReflexOptions: Array<{ reading: string; romaji: string }>;
  handleReflexChoice: (optionReading: string) => void;
  handleNextReflex: () => void;
}

export interface NumbersTestTabProps {
  quizIdx: number;
  selectedOption: number | null;
  isAnswered: boolean;
  score: number;
  quizDone: boolean;
  wrongQuestions: Array<{
    question: string;
    targetTab?: string;
  }>;
  handleAnswerSelect: (idx: number) => void;
  handleNextQuestion: () => void;
  handleRestartQuiz: () => void;
  onNavigateTab: (tab: TabType) => void;
}

