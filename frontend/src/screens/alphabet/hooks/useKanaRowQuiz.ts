import { useState, useCallback, useRef } from 'react';
import type { KanaChar } from '../../../data/kanaData';
import {
  HIRAGANA_SEION,
  HIRAGANA_DAKUON,
  HIRAGANA_HANDAKUON,
  HIRAGANA_YOON,
  KATAKANA_SEION,
  KATAKANA_DAKUON,
  KATAKANA_HANDAKUON,
  KATAKANA_YOON,
  speakJapanese,
} from '../../../data/kanaData';
import type { KanaType } from '../types';

export function useKanaRowQuiz() {
  const [rowQuizChars, setRowQuizChars] = useState<KanaChar[]>([]);
  const [rowQuizIdx, setRowQuizIdx] = useState(0);
  const [rowQuizInput, setRowQuizInput] = useState('');
  const [rowQuizResult, setRowQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [rowQuizScore, setRowQuizScore] = useState(0);
  const [rowQuizDone, setRowQuizDone] = useState(false);
  const [rowQuizWrongList, setRowQuizWrongList] = useState<KanaChar[]>([]);
  const [rowQuizElapsed, setRowQuizElapsed] = useState(0);

  const startTimeRef = useRef<number>(0);

  const startRowQuiz = useCallback((targetRow: string | null, kanaType: KanaType) => {
    if (!targetRow) return false;
    const pool = kanaType === 'hiragana'
      ? [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON, ...HIRAGANA_YOON]
      : [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON, ...KATAKANA_YOON];
    const chars = pool.filter((c) => c.row === targetRow);
    if (chars.length === 0) return false;

    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    setRowQuizChars(shuffled);
    setRowQuizIdx(0);
    setRowQuizInput('');
    setRowQuizResult(null);
    setRowQuizScore(0);
    setRowQuizDone(false);
    setRowQuizWrongList([]);
    setRowQuizElapsed(0);
    startTimeRef.current = Date.now();
    return true;
  }, []);

  const checkRowQuizAnswer = useCallback(
    (onLearnedRow?: () => void) => {
      if (rowQuizDone || rowQuizResult !== null) return;
      const current = rowQuizChars[rowQuizIdx];
      if (!current) return;
      const isCorrect = rowQuizInput.trim().toLowerCase() === current.romaji.toLowerCase();
      setRowQuizResult(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) {
        setRowQuizScore((s) => s + 1);
        speakJapanese(current.char);
      } else {
        setRowQuizWrongList((prev) => [...prev, current]);
      }

      setTimeout(() => {
        if (rowQuizIdx + 1 >= rowQuizChars.length) {
          setRowQuizDone(true);
          const elapsedSec = Math.round((Date.now() - startTimeRef.current) / 1000);
          setRowQuizElapsed(elapsedSec);
          if (onLearnedRow) {
            onLearnedRow();
          }
        } else {
          setRowQuizIdx((i) => i + 1);
          setRowQuizInput('');
          setRowQuizResult(null);
        }
      }, 1100);
    },
    [rowQuizDone, rowQuizResult, rowQuizChars, rowQuizIdx, rowQuizInput]
  );

  return {
    rowQuizChars,
    rowQuizIdx,
    rowQuizInput,
    setRowQuizInput,
    rowQuizResult,
    rowQuizScore,
    rowQuizDone,
    rowQuizWrongList,
    rowQuizElapsed,
    startRowQuiz,
    checkRowQuizAnswer,
  };
}

