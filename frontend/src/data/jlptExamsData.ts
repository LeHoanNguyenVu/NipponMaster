export * from '../screens/exams/types';
export {
  EXAM_CATALOG,
  getAllCatalogExams as getJlptExamPapers,
  getAllCatalogExams,
  getExamById,
} from '../screens/exams/data';
import { getAllCatalogExams } from '../screens/exams/data';

export const JLPT_EXAM_PAPERS = getAllCatalogExams();

