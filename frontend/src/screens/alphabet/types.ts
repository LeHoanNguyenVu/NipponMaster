import type { KanaChar } from '../../data/kanaData';
import type { QuizSet, QuizQuestion, SavedQuizScores } from '../../data/quizBankData';

export type Tab = 'overview' | 'lesson' | 'quiz' | 'practice_all';
export type KanaType = 'hiragana' | 'katakana';
export type CompScopeType = 'all-h' | 'all-k' | 'mix' | 'yoon';
export type LessonStep = 'learn' | 'write' | 'pronounce';

export interface AlphabetExplorerProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export interface OverviewGridProps {
  kanaType: KanaType;
  onToggleType: () => void;
  getChars: () => {
    seion: KanaChar[];
    dakuon: KanaChar[];
    handakuon: KanaChar[];
    yoon: KanaChar[];
  };
  onStartLesson: (row: string) => void;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

export interface LessonModeProps {
  chars: KanaChar[];
  idx: number;
  step: LessonStep;
  row: string;
  kanaType: KanaType;
  onNextChar: () => void;
  onPrevChar: () => void;
  onSetStep: (s: LessonStep) => void;
  isLastChar: boolean;
  onComplete: () => void;
}

export interface RowQuizResultScreenProps {
  score: number;
  total: number;
  wrongList: KanaChar[];
  elapsed: number;
  rowLabel: string;
  onRetry: () => void;
  onNextRow: () => void;
  hasNextRow: boolean;
}

export interface QuizCardProps {
  current: KanaChar;
  idx: number;
  total: number;
  input: string;
  result: 'correct' | 'wrong' | null;
  score: number;
  onInput: (v: string) => void;
  onCheck: () => void;
}

export interface CompQuizQuestionCardProps {
  current: QuizQuestion;
  idx: number;
  total: number;
  input: string;
  result: 'correct' | 'wrong' | null;
  score: number;
  onInput: (v: string) => void;
  onCheck: () => void;
}

export interface ComprehensiveResultScreenProps {
  quizSet: QuizSet;
  score: number;
  total: number;
  wrongList: QuizQuestion[];
  elapsed: number;
  onRetry: () => void;
  onNextSet: () => void;
  hasNextSet: boolean;
  onBackToSets: () => void;
}

export interface QuizSetsGridProps {
  scope: CompScopeType;
  savedScores: SavedQuizScores;
  onSelectSet: (set: QuizSet) => void;
  onBackToScopes: () => void;
}

export interface ComprehensiveScopePickerProps {
  onSelectScope: (scope: CompScopeType) => void;
}

