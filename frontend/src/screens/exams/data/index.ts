import type { JLPTExamPaper } from '../types';
import { EXAM_CATALOG } from './catalog';
import { EXAM_N5_2011_07 } from './n5_2011_07';

export { EXAM_CATALOG } from './catalog';

const FULL_EXAMS_REGISTRY: Record<string, JLPTExamPaper> = {
  'jlpt-n5-2011-07': EXAM_N5_2011_07,
};

export function getExamById(id: string): JLPTExamPaper | null {
  return FULL_EXAMS_REGISTRY[id] || null;
}

export function getAllCatalogExams(): JLPTExamPaper[] {
  return EXAM_CATALOG.map((meta) => {
    const full = FULL_EXAMS_REGISTRY[meta.id];
    if (full) return full;
    return {
      ...meta,
      sections: [],
    };
  });
}

