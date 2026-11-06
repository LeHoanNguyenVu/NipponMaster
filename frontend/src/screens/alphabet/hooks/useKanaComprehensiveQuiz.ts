import { useState, useCallback, useRef } from 'react';
import type { QuizSet, QuizQuestion, SavedQuizScores } from '../../../data/quizBankData';
import {
  getQuizSetsByScope,
  loadSavedQuizScores,
  saveQuizScore,
} from '../../../data/quizBankData';
import { speakJapanese } from '../../../data/kanaData';
import { saveChapterScore } from '../../../utils/beginnerProgressManager';
import type { CompScopeType } from '../types';

export function useKanaComprehensiveQuiz() {
  const [compScope, setCompScope] = useState<CompScopeType | null>(null);
  const [selectedQuizSet, setSelectedQuizSet] = useState<QuizSet | null>(null);
  const [savedScores, setSavedScores] = useState<SavedQuizScores>({});
  const [compIdx, setCompIdx] = useState(0);
  const [compInput, setCompInput] = useState('');
  const [compResult, setCompResult] = useState<'correct' | 'wrong' | null>(null);
  const [compScore, setCompScore] = useState(0);
  const [compDone, setCompDone] = useState(false);
  const [compWrongList, setCompWrongList] = useState<QuizQuestion[]>([]);
  const [compElapsed, setCompElapsed] = useState(0);

  const startTimeRef = useRef<number>(0);

  const refreshScores = useCallback(() => {
    setSavedScores(loadSavedQuizScores());
  }, []);

  const startQuizSet = useCallback((quizSet: QuizSet) => {
    setSelectedQuizSet(quizSet);
    setCompIdx(0);
    setCompInput('');
    setCompResult(null);
    setCompScore(0);
    setCompDone(false);
    setCompWrongList([]);
    setCompElapsed(0);
    startTimeRef.current = Date.now();
  }, []);

  const handleNextQuizSet = useCallback(() => {
    if (!compScope || !selectedQuizSet) return;
    const allSets = getQuizSetsByScope(compScope);
    const currentIndex = allSets.findIndex((s) => s.id === selectedQuizSet.id);
    if (currentIndex >= 0 && currentIndex + 1 < allSets.length) {
      startQuizSet(allSets[currentIndex + 1]);
    } else {
      setSelectedQuizSet(null);
    }
  }, [compScope, selectedQuizSet, startQuizSet]);

  const checkCompQuizAnswer = useCallback(
    (onChapterComplete?: (chapterId: string, scorePercent: number) => void) => {
      if (compDone || compResult !== null || !selectedQuizSet) return;
      const current = selectedQuizSet.questions[compIdx];
      if (!current) return;
      const isCorrect = compInput.trim().toLowerCase() === current.romaji.toLowerCase();
      setCompResult(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) {
        setCompScore((s) => s + 1);
        speakJapanese(current.prompt);
      } else {
        setCompWrongList((prev) => [...prev, current]);
      }

      setTimeout(() => {
        if (compIdx + 1 >= selectedQuizSet.questions.length) {
          setCompDone(true);
          const elapsedSec = Math.round((Date.now() - startTimeRef.current) / 1000);
          setCompElapsed(elapsedSec);

          const finalScore = isCorrect ? compScore + 1 : compScore;
          const totalQ = selectedQuizSet.questions.length;
          const pct = Math.round((finalScore / totalQ) * 100);

          if (compScope) {
            saveQuizScore(compScope, selectedQuizSet.id, finalScore, totalQ);
            setSavedScores(loadSavedQuizScores());
          }
          saveChapterScore(1, pct);
          if (onChapterComplete) {
            onChapterComplete('chapter-1', pct);
          }
        } else {
          setCompIdx((i) => i + 1);
          setCompInput('');
          setCompResult(null);
        }
      }, 1100);
    },
    [compDone, compResult, selectedQuizSet, compIdx, compInput, compScore, compScope]
  );

  return {
    compScope,
    setCompScope,
    selectedQuizSet,
    setSelectedQuizSet,
    savedScores,
    refreshScores,
    compIdx,
    compInput,
    setCompInput,
    compResult,
    compScore,
    compDone,
    compWrongList,
    compElapsed,
    startQuizSet,
    handleNextQuizSet,
    checkCompQuizAnswer,
  };
}

