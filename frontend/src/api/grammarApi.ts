import axiosClient from './axiosClient';

export interface GrammarLevelDto {
  levelCode: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  curriculumName: string;
  totalLessons: number;
  description: string;
  unlockedCount: number;
  passedCount: number;
}

export interface GrammarLessonSummaryDto {
  id: number;
  levelCode: string;
  lessonNumber: number;
  partNumber: number;
  sortOrder: number;
  titleVi: string;
  titleJa: string;
  videoId: string;
  durationStr: string;
  durationSec: number;
  isUnlocked: boolean;
  isPassed: boolean;
  highestScore: number;
  starsEarned: number;
  lastWatchSec?: number;
  lastWatchTimeStr?: string;
}

export interface GrammarTimestampItem {
  id: number;
  timeSec: number;
  timeStr: string;
  pattern: string;
  title: string;
  summary?: string;
  sortOrder: number;
}

export interface GrammarCheatsheetItem {
  id: number;
  pattern: string;
  badge?: string;
  meaning: string;
  structure: string;
  nuance?: string;
  examples?: Array<{
    ja: string;
    furigana?: string;
    vi: string;
  }>;
  sortOrder: number;
}

export interface StarFragment {
  id: string;
  text: string;
}

export interface GrammarQuizItem {
  id: number;
  quizType: 'MCQ' | 'STAR';
  prompt: string;
  leftSentence?: string;
  rightSentence?: string;
  starIndex?: number;
  fragments?: StarFragment[];
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  sortOrder: number;
}

export interface GrammarLessonDetailDto {
  id: number;
  levelCode: string;
  lessonNumber: number;
  partNumber: number;
  sortOrder: number;
  titleVi: string;
  titleJa: string;
  videoId: string;
  durationStr: string;
  durationSec: number;
  isUnlocked: boolean;
  isPassed: boolean;
  highestScore: number;
  starsEarned: number;
  lastWatchSec?: number;
  lastWatchTimeStr?: string;
  timestamps: GrammarTimestampItem[];
  cheatsheets: GrammarCheatsheetItem[];
  quizzes: GrammarQuizItem[];
}

export interface GrammarQuizSubmitResponse {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
  starsEarned: number;
  nextLessonId?: number;
  unlockedNextLesson: boolean;
}

export interface GrammarDiscussionDto {
  id: number;
  authorId?: number;
  authorName: string;
  authorLevel?: string;
  role: 'teacher' | 'student';
  isSensei: boolean;
  avatarBg: string;
  avatarLetter: string;
  timeAgo: string;
  createdAt?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  helpfulCount: number;
  replies: GrammarDiscussionDto[];
}

export const grammarApi = {
  getLevels: async (): Promise<GrammarLevelDto[]> => {
    const res: any = await axiosClient.get('/grammar-lessons/levels');
    return res?.data ?? res ?? [];
  },

  getLessonsByLevel: async (levelCode: string): Promise<GrammarLessonSummaryDto[]> => {
    const res: any = await axiosClient.get(`/grammar-lessons/levels/${levelCode}`);
    return res?.data ?? res ?? [];
  },

  getLessonDetail: async (lessonId: number): Promise<GrammarLessonDetailDto> => {
    const res: any = await axiosClient.get(`/grammar-lessons/${lessonId}`);
    return res?.data ?? res;
  },

  submitQuiz: async (lessonId: number, answers: Record<number, string>): Promise<GrammarQuizSubmitResponse> => {
    const res: any = await axiosClient.post(`/grammar-lessons/${lessonId}/submit-quiz`, { answers });
    return res?.data ?? res;
  },

  getDiscussions: async (lessonId: number): Promise<GrammarDiscussionDto[]> => {
    const res: any = await axiosClient.get(`/grammar-lessons/${lessonId}/discussions`);
    return res?.data ?? res ?? [];
  },

  createDiscussion: async (
    lessonId: number,
    data: { content: string; imageUrl?: string; videoUrl?: string; replyToId?: number }
  ): Promise<GrammarDiscussionDto> => {
    const res: any = await axiosClient.post(`/grammar-lessons/${lessonId}/discussions`, data);
    return res?.data ?? res;
  },

  toggleHelpful: async (discussionId: number): Promise<void> => {
    await axiosClient.post(`/grammar-lessons/discussions/${discussionId}/helpful`);
  },

  deleteDiscussion: async (discussionId: number): Promise<void> => {
    await axiosClient.delete(`/grammar-lessons/discussions/${discussionId}`);
  },

  saveWatchProgress: async (lessonId: number, timeSec: number, timeStr: string): Promise<void> => {
    await axiosClient.post(`/grammar-lessons/${lessonId}/watch-progress`, { timeSec, timeStr });
  },

  uploadDiscussionMedia: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res: any = await axiosClient.post('/grammar-lessons/discussions/upload-media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res?.data ?? res;
  },
};

