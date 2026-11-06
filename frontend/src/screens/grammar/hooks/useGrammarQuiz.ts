import { useState, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { grammarApi } from '../../../api/grammarApi';
import type { GrammarQuizItem, GrammarLessonSummaryDto } from '../types';

interface UseGrammarQuizProps {
  currentLessonId: number;
  fullQuizList: GrammarQuizItem[];
  starList: GrammarQuizItem[];
  setLessons: React.Dispatch<React.SetStateAction<GrammarLessonSummaryDto[]>>;
}

function shuffleDeterministic(array: string[], seed: number): string[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const s = Math.sin(seed + i * 31) * 10000;
    const rnd = s - Math.floor(s);
    const j = Math.floor(rnd * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function useGrammarQuiz({
  currentLessonId,
  fullQuizList,
  starList,
  setLessons,
}: UseGrammarQuizProps) {
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [starSlots, setStarSlots] = useState<Record<number, (string | null)[]>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState<boolean>(false);
  const [quizAttemptCount, setQuizAttemptCount] = useState<number>(0);

  // Reset quiz state khi đổi bài
  const resetQuizForNewLesson = useCallback(() => {
    setMcqAnswers({});
    setStarSlots({});
    setQuizSubmitted(false);
    setQuizScore(null);
  }, []);

  // Trộn ngẫu nhiên (Fisher-Yates Shuffle) các đáp án A, B, C, D cho 16 câu trắc nghiệm MCQ
  const shuffledOptionsMap = useMemo(() => {
    if (!fullQuizList || fullQuizList.length === 0) return {};
    const newMap: Record<number, string[]> = {};
    fullQuizList.forEach((q) => {
      if (q.quizType === 'MCQ' && Array.isArray(q.options) && q.options.length > 0) {
        newMap[q.id] = shuffleDeterministic(q.options, q.id + quizAttemptCount * 10007);
      }
    });
    return newMap;
  }, [fullQuizList, quizAttemptCount]);

  const handleSelectMcqAnswer = useCallback((qId: number, val: string) => {
    if (quizSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: val }));
  }, [quizSubmitted]);

  // Xử lý chọn mảnh từ ghép câu ngôi sao
  const handleSelectFragment = useCallback((qId: number, text: string) => {
    setStarSlots((prev) => {
      const current = prev[qId] || [null, null, null, null];
      const firstEmptyIndex = current.findIndex((slot) => slot === null);
      if (firstEmptyIndex !== -1) {
        const nextSlots = [...current];
        nextSlots[firstEmptyIndex] = text;
        return { ...prev, [qId]: nextSlots };
      }
      return prev;
    });
  }, []);

  const handleRemoveSlot = useCallback((qId: number, index: number) => {
    setStarSlots((prev) => {
      const current = prev[qId] || [null, null, null, null];
      const nextSlots = [...current];
      nextSlots[index] = null;
      return { ...prev, [qId]: nextSlots };
    });
  }, []);

  const handleResetStar = useCallback((qId: number) => {
    setStarSlots((prev) => ({
      ...prev,
      [qId]: [null, null, null, null],
    }));
  }, []);

  const handleResetTest = useCallback(() => {
    setQuizSubmitted(false);
    setQuizScore(null);
    setMcqAnswers({});
    setStarSlots({});
    setQuizAttemptCount((c) => c + 1);
  }, []);

  // Xử lý Nộp Bài Test 20 Câu & Đánh Giá chuẩn >= 85%
  const handleSubmitFullQuiz = useCallback(async () => {
    const answersPayload: Record<number, string> = { ...mcqAnswers };

    starList.forEach((q) => {
      const slots = starSlots[q.id] || [];
      const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
      const chosen = slots[starIdx];
      if (chosen) {
        answersPayload[q.id] = chosen;
      }
    });

    setIsSubmittingQuiz(true);
    try {
      const res = await grammarApi.submitQuiz(currentLessonId, answersPayload);
      setQuizSubmitted(true);
      setQuizScore(res.score);

      if (res.passed) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });

        setLessons((prev) => {
          const currentIdx = prev.findIndex((l) => l.id === currentLessonId);
          return prev.map((l, idx) => {
            if (l.id === currentLessonId) {
              return {
                ...l,
                isPassed: true,
                highestScore: Math.max(l.highestScore || 0, res.score),
              };
            }
            if (idx === currentIdx + 1 || (res.nextLessonId && l.id === res.nextLessonId)) {
              return { ...l, isUnlocked: true };
            }
            return l;
          });
        });
      }
    } catch (err) {
      console.warn('Lỗi khi nộp bài qua API, chấm điểm cục bộ:', err);
      let correct = 0;
      const total = fullQuizList.length;
      fullQuizList.forEach((q) => {
        if (q.quizType === 'MCQ') {
          if (mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim()) correct++;
        } else if (q.quizType === 'STAR') {
          const slots = starSlots[q.id] || [];
          const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
          if (slots[starIdx] === q.correctAnswer) correct++;
        }
      });

      const scoreCalc = total > 0 ? Math.round((correct / total) * 100) : 100;
      setQuizSubmitted(true);
      setQuizScore(scoreCalc);
      if (scoreCalc >= 85) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        setLessons((prev) => {
          const currentIdx = prev.findIndex((l) => l.id === currentLessonId);
          return prev.map((l, idx) => {
            if (l.id === currentLessonId) {
              return {
                ...l,
                isPassed: true,
                highestScore: Math.max(l.highestScore || 0, scoreCalc),
              };
            }
            if (idx === currentIdx + 1) {
              return { ...l, isUnlocked: true };
            }
            return l;
          });
        });
      }
    } finally {
      setIsSubmittingQuiz(false);
    }
  }, [currentLessonId, mcqAnswers, starSlots, starList, fullQuizList, setLessons]);

  const answeredCount = fullQuizList.reduce((acc, q) => {
    if (q.quizType === 'MCQ') {
      return acc + (mcqAnswers[q.id] ? 1 : 0);
    } else if (q.quizType === 'STAR') {
      const slots = starSlots[q.id] || [];
      return acc + (slots.filter(Boolean).length === 4 ? 1 : 0);
    }
    return acc;
  }, 0);

  const correctCount = fullQuizList.reduce((acc, q) => {
    if (q.quizType === 'MCQ') {
      return acc + (mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim() ? 1 : 0);
    } else if (q.quizType === 'STAR') {
      const slots = starSlots[q.id] || [];
      const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
      return acc + (slots[starIdx] === q.correctAnswer ? 1 : 0);
    }
    return acc;
  }, 0);

  return {
    mcqAnswers,
    setMcqAnswers,
    starSlots,
    setStarSlots,
    quizSubmitted,
    quizScore,
    isSubmittingQuiz,
    shuffledOptionsMap,
    answeredCount,
    correctCount,
    resetQuizForNewLesson,
    handleSelectMcqAnswer,
    handleSelectFragment,
    handleRemoveSlot,
    handleResetStar,
    handleResetTest,
    handleSubmitFullQuiz,
  };
}
