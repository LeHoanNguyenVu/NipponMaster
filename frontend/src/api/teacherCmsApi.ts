import axiosClient from './axiosClient';

export interface CreateVocabularyPayload {
  word: string;
  reading: string;
  meaning: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  wordType?: string;
  topic?: string;
}

export interface CreateKanjiPayload {
  character: string;
  meaning: string;
  onReading?: string;
  kunReading?: string;
  strokeCount: number;
  radical?: string;
  relatedWords?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface CreateGrammarPayload {
  title: string;
  structure: string;
  meaning: string;
  usageNotes?: string;
  exampleSentences?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface AnalyticsOverviewData {
  totalClassrooms: number;
  totalStudents: number;
  averageClassScore: number;
  atRiskStudentCount: number;
  scoreDistribution: Record<string, number>;
  recentActivities: {
    studentName: string;
    classroomName: string;
    examTitle: string;
    score: number;
    submittedAt: string;
  }[];
}

export interface GradebookStudentItem {
  studentId: number;
  fullName: string;
  email: string;
  classroomId: number;
  classroomName: string;
  latestExamScore: number;
  completedLessonsPercent: number;
  atRiskWarning: boolean;
  lastActiveAt: string;
}

export interface ClassroomGradebookData {
  classroomId: number;
  classroomName: string;
  joinCode: string;
  jlptLevel: string;
  totalStudents: number;
  classAverageScore: number;
  highestScore: number;
  lowestScore: number;
  students: GradebookStudentItem[];
}

export const teacherCmsApi = {
  // Vocabulary CMS
  createVocabulary: (payload: CreateVocabularyPayload) =>
    axiosClient.post('/teacher/content/vocabulary', payload),
  updateVocabulary: (id: number, payload: CreateVocabularyPayload) =>
    axiosClient.put(`/teacher/content/vocabulary/${id}`, payload),
  deleteVocabulary: (id: number) =>
    axiosClient.delete(`/teacher/content/vocabulary/${id}`),

  // Kanji CMS
  createKanji: (payload: CreateKanjiPayload) =>
    axiosClient.post('/teacher/content/kanji', payload),
  updateKanji: (id: number, payload: CreateKanjiPayload) =>
    axiosClient.put(`/teacher/content/kanji/${id}`, payload),
  deleteKanji: (id: number) =>
    axiosClient.delete(`/teacher/content/kanji/${id}`),

  // Grammar CMS
  createGrammar: (payload: CreateGrammarPayload) =>
    axiosClient.post('/teacher/content/grammar', payload),
  updateGrammar: (id: number, payload: CreateGrammarPayload) =>
    axiosClient.put(`/teacher/content/grammar/${id}`, payload),
  deleteGrammar: (id: number) =>
    axiosClient.delete(`/teacher/content/grammar/${id}`),

  // Analytics & Gradebook
  getAnalyticsOverview: () =>
    axiosClient.get('/teacher/analytics/overview'),
  getClassroomGradebook: (classroomId: number) =>
    axiosClient.get(`/teacher/analytics/classes/${classroomId}/gradebook`),
  exportGradebookCsvUrl: (classroomId: number) =>
    `${axiosClient.defaults.baseURL || '/api/v1'}/teacher/analytics/classes/${classroomId}/export`,
};
