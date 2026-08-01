import axiosClient from './axiosClient';

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type Section = 'VOCAB' | 'GRAMMAR' | 'READING';

export interface PlacementQuestion {
  id: number;
  section: Section;
  questionText: string;
  options: string[];
  displayOrder: number;
}

export interface PlacementTestData {
  level: JlptLevel;
  timeLimitMinutes: number;
  totalQuestions: number;
  questions: PlacementQuestion[];
}

export interface AnswerItem {
  questionId: number;
  chosenOption: number;
}

export interface SectionScore {
  correct: number;
  total: number;
  percent: number;
}

export interface QuestionReview {
  questionId: number;
  section: Section;
  questionText: string;
  options: string[];
  chosenOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation: string;
}

export interface PlacementResult {
  resultId: number;
  targetLevel: JlptLevel;
  score: number;
  totalQuestions: number;
  scorePercent: number;
  recommendedLevel: JlptLevel;
  overallFeedback: string;
  actionSuggestion: string;
  diagnosticSummary?: string;
  levelDropReason?: string;
  recommendedTestLevel?: JlptLevel;
  sectionScores: Record<Section, SectionScore>;
  questionReviews: QuestionReview[];
  completedAt: string;
}

export const placementApi = {
  /** Lấy bộ đề thi theo level */
  getQuestions: async (level: JlptLevel): Promise<PlacementTestData> => {
    const res = await axiosClient.get<any, any>(`/placement-test/questions?level=${level}`);
    return (res && res.data) ? res.data : res;
  },

  /** Nộp bài và nhận kết quả */
  submitTest: async (level: JlptLevel, answers: AnswerItem[]): Promise<PlacementResult> => {
    const res = await axiosClient.post<any, any>('/placement-test/submit', { level, answers });
    return (res && res.data) ? res.data : res;
  },
};
