export type JLPTLevelKey = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type JLPTQuestionFormat = 'mcq' | 'star' | 'cloze' | 'reading' | 'listening';

export interface JLPTDialogueLine {
  speaker: 'M' | 'F' | 'N';
  speakerLabel: string;
  jp: string;
}

export interface JLPTQuestion {
  id: string;
  number: number;
  sectionId: 'vocab' | 'grammar_reading' | 'listening';
  mondaiNumber: number;
  mondaiTitleJp: string;
  mondaiTitleVi: string;
  format: JLPTQuestionFormat;
  promptJp: string;
  imageUrl?: string;
  starTokens?: string[];
  dialogue?: JLPTDialogueLine[];
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanationVi: string;
  pointWeight: number;
  // For cloze / passage grouping
  passageId?: string;
}

export interface JLPTReadingPassage {
  id: string;
  title?: string;
  contentJp: string;
  imageUrl?: string;
  questionIds: string[];
}

export interface JLPTMondaiGroup {
  mondaiNumber: number;
  titleJp: string;
  titleVi: string;
  instructionJp: string;
  instructionVi?: string;
  passages?: JLPTReadingPassage[];
}

export interface JLPTExamSection {
  id: 'vocab' | 'grammar_reading' | 'listening';
  titleJp: string;
  titleVi: string;
  shortTitleVi: string;
  durationMinutes: number;
  maxScore: number;
  minPassScore?: number;
  mondaiGroups: JLPTMondaiGroup[];
  questions: JLPTQuestion[];
}

export interface JLPTExamPaper {
  id: string;
  level: JLPTLevelKey;
  year: number;
  session: 'July' | 'December';
  sessionVi: string;
  title: string;
  subtitleVi?: string;
  totalMinutes: number;
  totalMaxScore: number;
  passScore: number;
  minLanguageReadingScore: number;
  minListeningScore: number;
  sectionCount: number;
  questionCount: number;
  totalAttempts: number;
  commentCount: number;
  hasInteractiveData: boolean;
  sourcePdfName?: string;
  tags: string[];
  sections: JLPTExamSection[];
}

export interface ExamAttemptSummary {
  examId: string;
  completedAt: string;
  vocabScore: number;
  grammarReadingScore: number;
  listeningScore: number;
  totalScore: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  userAnswers: Record<string, number>;
}

export interface ExamCommentReply {
  id: string;
  commentId: string;
  author: string;
  role?: 'teacher' | 'student';
  content: string;
  attachedImage?: string | null;
  attachedVideo?: string | null;
  createdAt: string;
}

export interface ExamComment {
  id: string;
  examId: string;
  userId?: string | number;
  author: string;
  role?: 'teacher' | 'student';
  level: string;
  content: string;
  attachedImage?: string | null;
  attachedVideo?: string | null;
  likes?: number;
  userLiked?: boolean;
  replies?: ExamCommentReply[];
  createdAt: string;
}

export interface LightboxMedia {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

export const EMOJI_LIST = [
  '🎌', '🌸', '💡', '❓', '✍️', '👏', '💯', '📚', '✨', 'JP',
  '🗾', '🍙', '🍵', '👍', '🔥', '🎯', '⭐', '🎉', '🙏', '😊',
];

export const JLPT_LEVEL_RANK: Record<JLPTLevelKey, number> = {
  N5: 1,
  N4: 2,
  N3: 3,
  N2: 4,
  N1: 5,
};

