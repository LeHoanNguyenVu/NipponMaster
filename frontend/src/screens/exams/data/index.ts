import type { JLPTExamPaper, JLPTLevelKey } from '../types';
import { EXAM_CATALOG } from './catalog';
import { EXAM_N5_2011_07 } from './n5_2011_07';
import { N4_2011_07_EXAM } from './n4_2011_07';
import { N3_2022_07_EXAM } from './n3_2022_07';
import { N2_2019_12_EXAM } from './n2_2019_12';
import { N1_2019_07_EXAM } from './n1_2019_07';

export { EXAM_CATALOG } from './catalog';

const FULL_EXAMS_REGISTRY: Record<string, JLPTExamPaper> = {
  'jlpt-n5-2011-07': EXAM_N5_2011_07,
  'jlpt-n4-2011-07': N4_2011_07_EXAM,
  'jlpt-n3-2022-07': N3_2022_07_EXAM,
  'jlpt-n2-2019-12': N2_2019_12_EXAM,
  'jlpt-n1-2019-07': N1_2019_07_EXAM,
};

const LEVEL_FALLBACK_EXAMS: Record<JLPTLevelKey, JLPTExamPaper> = {
  N5: EXAM_N5_2011_07,
  N4: N4_2011_07_EXAM,
  N3: N3_2022_07_EXAM,
  N2: N2_2019_12_EXAM,
  N1: N1_2019_07_EXAM,
};

export function getExamById(id: string): JLPTExamPaper | null {
  const full = FULL_EXAMS_REGISTRY[id];
  if (full) return full;
  const meta = EXAM_CATALOG.find((m) => m.id === id);
  if (!meta) return null;
  const fallback = LEVEL_FALLBACK_EXAMS[meta.level];
  if (!fallback) return null;
  return {
    ...fallback,
    ...meta,
    sections: fallback.sections,
  };
}

export function getAllCatalogExams(): JLPTExamPaper[] {
  return EXAM_CATALOG.map((meta) => {
    const full = FULL_EXAMS_REGISTRY[meta.id];
    if (full) return full;
    const fallback = LEVEL_FALLBACK_EXAMS[meta.level];
    if (fallback) {
      return {
        ...fallback,
        ...meta,
        sections: fallback.sections,
      };
    }
    return {
      ...meta,
      sections: [],
    };
  });
}
