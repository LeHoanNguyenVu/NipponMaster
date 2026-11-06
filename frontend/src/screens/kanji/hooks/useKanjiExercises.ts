import { useState, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { chapterDetailCache } from './useKanjiChapterDetail';
import type { ChapterDetailResponse, SubmitResult, TestHistoryItem } from '../types';

interface UseKanjiExercisesProps {
  selectedChapterId: number;
  selectedLevel: string;
  chapterDetail: ChapterDetailResponse | null;
  onRefreshRoadmap?: (level: string) => Promise<void>;
}

export function useKanjiExercises({
  selectedChapterId,
  selectedLevel,
  chapterDetail,
  onRefreshRoadmap,
}: UseKanjiExercisesProps) {
  // Context sentence interactive states
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<number, string>>({});

  // Test states
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [submittingTest, setSubmittingTest] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [showResultCard, setShowResultCard] = useState<boolean>(false);
  const [showSakuraCelebration, setShowSakuraCelebration] = useState<boolean>(false);
  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>(() => {
    if (!selectedChapterId) return [];
    try {
      const savedHistory = localStorage.getItem(`kanji_test_history_${selectedChapterId}`);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      return [];
    }
  });
  const [showHistoryDropdown, setShowHistoryDropdown] = useState<boolean>(false);

  // Sync test history on chapter change
  const [prevChapId, setPrevChapId] = useState(selectedChapterId);
  if (prevChapId !== selectedChapterId) {
    setPrevChapId(selectedChapterId);
    if (!selectedChapterId) {
      setTestHistory([]);
    } else {
      try {
        const savedHistory = localStorage.getItem(`kanji_test_history_${selectedChapterId}`);
        setTestHistory(savedHistory ? JSON.parse(savedHistory) : []);
      } catch {
        setTestHistory([]);
      }
    }
  }

  const resetExerciseStates = useCallback(() => {
    setSubmitResult(null);
    setShowResultCard(false);
    setTestAnswers({});
    setReadingAnswers({});
    setWritingAnswers({});
    setShowHistoryDropdown(false);
  }, []);

  const handleSubmitReviewTest = async () => {
    chapterDetailCache.clear();
    if (!chapterDetail) return;
    const allExercises = [
      ...(chapterDetail.readingExercises || []),
      ...(chapterDetail.writingExercises || []),
    ];

    if (allExercises.length === 0) return;

    let correctCount = 0;
    allExercises.forEach((ex) => {
      if (testAnswers[ex.id] === ex.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = allExercises.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    try {
      setSubmittingTest(true);
      const res = await axiosClient.post(
        `/kanji/${selectedLevel.toLowerCase()}/chapters/${selectedChapterId}/submit`,
        {
          score: calculatedScore,
          totalQuestions,
          correctCount,
          answers: testAnswers,
        }
      );

      const result: SubmitResult =
        (res as { data?: SubmitResult })?.data ?? (res as unknown as SubmitResult);
      if (result) {
        setSubmitResult(result);
        setShowResultCard(true);

        if (result.isPassed || calculatedScore >= 85) {
          setShowSakuraCelebration(true);
        }

        const newHistoryItem: TestHistoryItem = {
          id: Date.now().toString(),
          date: new Date().toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          score: calculatedScore,
          correctCount,
          totalQuestions,
          isPassed: calculatedScore >= 85,
          answers: { ...testAnswers },
        };
        const nextHistory = [newHistoryItem, ...testHistory];
        setTestHistory(nextHistory);
        try {
          localStorage.setItem(`kanji_test_history_${selectedChapterId}`, JSON.stringify(nextHistory));
        } catch { /* ignore */ }

        if (onRefreshRoadmap) {
          onRefreshRoadmap(selectedLevel);
        }
      }
    } catch (err) {
      console.error('Failed to submit test:', err);
    } finally {
      setSubmittingTest(false);
    }
  };

  const handleReviewPastAttempt = (attempt: TestHistoryItem) => {
    setTestAnswers(attempt.answers);
    setSubmitResult({
      score: attempt.score,
      isPassed: attempt.isPassed,
      unlockedNextChapter: false,
      message: attempt.isPassed
        ? `Lần thi (${attempt.date}): Xuất sắc đạt ${attempt.score}% (${attempt.correctCount}/${attempt.totalQuestions} câu đúng).`
        : `Lần thi (${attempt.date}): Đạt ${attempt.score}% (${attempt.correctCount}/${attempt.totalQuestions} câu đúng).`,
    });
    setShowResultCard(true);
    setShowHistoryDropdown(false);
  };

  return {
    readingAnswers,
    setReadingAnswers,
    writingAnswers,
    setWritingAnswers,
    testAnswers,
    setTestAnswers,
    submittingTest,
    submitResult,
    setSubmitResult,
    showResultCard,
    setShowResultCard,
    showSakuraCelebration,
    setShowSakuraCelebration,
    testHistory,
    showHistoryDropdown,
    setShowHistoryDropdown,
    resetExerciseStates,
    handleSubmitReviewTest,
    handleReviewPastAttempt,
  };
}

