import axiosClient from './axiosClient';

export interface TeacherStats {
  totalClasses: number;
  totalStudents: number;
  lessonsCreated: number;
  averageRating: number;
  teachingHours: number;
}

export interface Classroom {
  id: number;
  name: string;
  description: string;
  level: string;
  teacherId: number;
  joinCode: string;
  maxStudents: number;
  studentCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface ClassroomStudent {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  jlptLevel: string;
  joinedAt: string;
}

export interface CreateClassroomPayload {
  name: string;
  description?: string;
  level?: string;
  maxStudents?: number;
}

export interface ExamQuestionPayload {
  id?: number;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  score?: number;
  orderIndex?: number;
}

export interface ExamPayload {
  id?: number;
  title: string;
  description?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  examType: 'VOCABULARY' | 'GRAMMAR' | 'READING' | 'LISTENING' | 'FULL';
  durationMinutes: number;
  totalScore?: number;
  isPublished?: boolean;
  isShuffleQuestions?: boolean;
  isShuffleOptions?: boolean;
  questions?: ExamQuestionPayload[];
}

export const teacherApi = {
  getStats: async (): Promise<TeacherStats> => {
    const res = await axiosClient.get<any, any>('/teacher/stats');
    return res.data ?? res;
  },

  getClasses: async (): Promise<Classroom[]> => {
    const res = await axiosClient.get<any, any>('/teacher/classes');
    return res.data ?? res;
  },

  createClassroom: async (payload: CreateClassroomPayload): Promise<Classroom> => {
    const res = await axiosClient.post<any, any>('/teacher/classes', payload);
    return res.data ?? res;
  },

  getStudentsInClass: async (classroomId: number): Promise<ClassroomStudent[]> => {
    const res = await axiosClient.get<any, any>(`/teacher/classes/${classroomId}/students`);
    return res.data ?? res;
  },

  addStudentToClass: async (classroomId: number, email: string): Promise<ClassroomStudent> => {
    const res = await axiosClient.post<any, any>(`/teacher/classes/${classroomId}/students`, { email });
    return res.data ?? res;
  },

  // Content Creation APIs
  createVocabulary: async (payload: any): Promise<any> => {
    const res = await axiosClient.post<any, any>('/vocabularies', payload);
    return res.data ?? res;
  },

  createKanji: async (payload: any): Promise<any> => {
    const res = await axiosClient.post<any, any>('/kanjis', payload);
    return res.data ?? res;
  },

  createGrammar: async (payload: any): Promise<any> => {
    const res = await axiosClient.post<any, any>('/grammars', payload);
    return res.data ?? res;
  },

  // JLPT Exam Builder APIs
  getExams: async (): Promise<ExamPayload[]> => {
    const res = await axiosClient.get<any, any>('/exams');
    const pageData = res.data ?? res;
    return pageData.content || pageData;
  },

  getExamById: async (id: number): Promise<ExamPayload> => {
    const res = await axiosClient.get<any, any>(`/exams/${id}`);
    return res.data ?? res;
  },

  createExam: async (payload: ExamPayload): Promise<ExamPayload> => {
    const res = await axiosClient.post<any, any>('/exams', payload);
    return res.data ?? res;
  },

  updateExam: async (id: number, payload: ExamPayload): Promise<ExamPayload> => {
    const res = await axiosClient.put<any, any>(`/exams/${id}`, payload);
    return res.data ?? res;
  },

  deleteExam: async (id: number): Promise<void> => {
    await axiosClient.delete(`/exams/${id}`);
  },
};
