import { useState, useCallback } from 'react';
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
} from '../../../data/kanaData';
import type { KanaType, LessonStep } from '../types';

export function useKanaLesson() {
  const [lessonRow, setLessonRow] = useState<string | null>(null);
  const [lessonChars, setLessonChars] = useState<KanaChar[]>([]);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [lessonStep, setLessonStep] = useState<LessonStep>('learn');

  const startLesson = useCallback((row: string, kanaType: KanaType) => {
    const pool = kanaType === 'hiragana'
      ? [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON, ...HIRAGANA_YOON]
      : [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON, ...KATAKANA_YOON];
    const rowChars = pool.filter((c) => c.row === row);
    if (rowChars.length === 0) return false;

    setLessonRow(row);
    setLessonChars(rowChars);
    setLessonIdx(0);
    setLessonStep('learn');
    return true;
  }, []);

  const handleNextChar = useCallback(() => {
    if (lessonIdx + 1 < lessonChars.length) {
      setLessonIdx((i) => i + 1);
      setLessonStep('learn');
    }
  }, [lessonIdx, lessonChars.length]);

  const handlePrevChar = useCallback(() => {
    if (lessonIdx > 0) {
      setLessonIdx((i) => i - 1);
      setLessonStep('learn');
    }
  }, [lessonIdx]);

  return {
    lessonRow,
    setLessonRow,
    lessonChars,
    lessonIdx,
    lessonStep,
    setLessonStep,
    startLesson,
    handleNextChar,
    handlePrevChar,
  };
}

