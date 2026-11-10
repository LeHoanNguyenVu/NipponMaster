import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import {
  JLPT_LEVEL_RANK,
  type ExamAttemptSummary,
  type JLPTExamPaper,
  type JLPTLevelKey,
} from '../../data/jlptExamsData';
import { ExamDetailView, type ExamStartConfig } from './components/ExamDetailView';
import { ExamLibraryView } from './components/ExamLibraryView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { submitExamAttempt } from './services/examService';

const STORAGE_KEY = 'nippon_jlpt_exam_attempts_v1';

function loadSavedAttempts(): Record<string, ExamAttemptSummary> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, ExamAttemptSummary>;
  } catch {
    return {};
  }
}

export default function ExamsScreen() {
  const { user } = useAuthStore();

  const rawLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N5').toUpperCase();
  const userLevel: JLPTLevelKey =
    rawLevel in JLPT_LEVEL_RANK ? (rawLevel as JLPTLevelKey) : 'N5';

  const isPrivilegedUser = user?.role === 'ADMIN' || user?.role === 'TEACHER';

  const [selectedDetailExam, setSelectedDetailExam] = useState<JLPTExamPaper | null>(null);
  const [activeSimulatorConfig, setActiveSimulatorConfig] = useState<ExamStartConfig | null>(null);
  const [reviewAttempt, setReviewAttempt] = useState<ExamAttemptSummary | null>(null);
  const [, setRecentAttempts] = useState<Record<string, ExamAttemptSummary>>(
    () => loadSavedAttempts()
  );

  const handleSelectExamDetail = (exam: JLPTExamPaper) => {
    setSelectedDetailExam(exam);
    setActiveSimulatorConfig(null);
    setReviewAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSimulator = (config: ExamStartConfig) => {
    setActiveSimulatorConfig(config);
    setReviewAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewAttempt = (attempt: ExamAttemptSummary) => {
    setReviewAttempt(attempt);
    setActiveSimulatorConfig({
      selectedSectionIds: ['vocab', 'grammar_reading', 'listening'],
      durationMinutes: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAttempt = (summary: ExamAttemptSummary) => {
    submitExamAttempt(summary, user?.id);
    setRecentAttempts((prev) => {
      const next = { ...prev, [summary.examId]: summary };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 space-y-6 font-sans">
      {selectedDetailExam && activeSimulatorConfig ? (
        <ExamSimulatorView
          exam={selectedDetailExam}
          startConfig={activeSimulatorConfig}
          initialAnswers={reviewAttempt?.userAnswers || {}}
          isReviewMode={Boolean(reviewAttempt)}
          onExit={() => {
            setActiveSimulatorConfig(null);
            setReviewAttempt(null);
          }}
          onSaveAttempt={handleSaveAttempt}
        />
      ) : selectedDetailExam ? (
        <ExamDetailView
          exam={selectedDetailExam}
          userId={user?.id}
          userLevel={userLevel}
          onBack={() => {
            setSelectedDetailExam(null);
            setReviewAttempt(null);
          }}
          onStartSimulator={handleStartSimulator}
          onReviewAttempt={handleReviewAttempt}
          onSelectExam={handleSelectExamDetail}
        />
      ) : (
        <ExamLibraryView
          userLevel={userLevel}
          isPrivilegedUser={isPrivilegedUser}
          onSelectExamDetail={handleSelectExamDetail}
        />
      )}
    </div>
  );
}
