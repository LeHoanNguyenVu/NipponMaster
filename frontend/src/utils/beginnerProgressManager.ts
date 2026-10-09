import { getChapter1RealMaxScore } from '../data/quizBankData';
import { useAuthStore } from '../store/useAuthStore';

export interface ChapterProgressInfo {
  completed: boolean;
  bestScore: number;
  unlocked: boolean;
}

export interface ChapterProgressMap {
  [chapterId: string]: ChapterProgressInfo;
}

export const UNLOCK_THRESHOLD = 85;

/**
 * Lấy tiền tố định danh người dùng (User Scope) để cô lập tiến độ giữa các tài khoản khác nhau trên cùng trình duyệt.
 */
export function getUserScope(): string {
  try {
    const user = useAuthStore.getState().user;
    if (user?.email) return `u_${user.email.toLowerCase()}_`;
    if (user?.id) return `u_${user.id}_`;
  } catch {}
  return '';
}

/**
 * Lưu điểm số bài test của từng chương theo tài khoản người dùng hiện tại
 */
export function saveChapterScore(chapterNum: number, score: number): void {
  const scope = getUserScope();
  if (scope) {
    const scopedKey = `${scope}ch_${chapterNum}_score`;
    const prev = Number(localStorage.getItem(scopedKey) || 0);
    localStorage.setItem(scopedKey, Math.max(prev, score).toString());
  }
}

/**
 * Lấy điểm số bài test của từng chương theo tài khoản người dùng hiện tại.
 * Tài khoản mới luôn bắt đầu từ 0%, không kế thừa dữ liệu từ tài khoản khác.
 */
export function getChapterScore(chapterNum: number): number {
  const scope = getUserScope();
  if (scope) {
    const scopedKey = `${scope}ch_${chapterNum}_score`;
    const scopedVal = localStorage.getItem(scopedKey);
    if (scopedVal !== null) {
      return Math.min(100, Math.max(0, Number(scopedVal)));
    }
  }
  return 0;
}

/**
 * Tính toán tiến độ tuần tự nghiêm ngặt của 5 chương Nhập Môn.
 */
export function computeStrictCourseProgress(): ChapterProgressMap {
  const c1Score = getChapterScore(1);
  const c2Score = getChapterScore(2);
  const c3Score = getChapterScore(3);
  const c4Score = getChapterScore(4);
  const c5Score = getChapterScore(5);

  const c1Unlocked = true;
  const c1Completed = c1Score >= UNLOCK_THRESHOLD;

  const c2Unlocked = c1Completed;
  const c2Completed = c2Unlocked && c2Score >= UNLOCK_THRESHOLD;

  const c3Unlocked = c2Completed;
  const c3Completed = c3Unlocked && c3Score >= UNLOCK_THRESHOLD;

  const c4Unlocked = c3Completed;
  const c4Completed = c4Unlocked && c4Score >= UNLOCK_THRESHOLD;

  const c5Unlocked = c4Completed;
  const c5Completed = c5Unlocked && c5Score >= UNLOCK_THRESHOLD;

  return {
    'chapter-1': { completed: c1Completed, bestScore: c1Score, unlocked: c1Unlocked },
    'chapter-2': { completed: c2Completed, bestScore: c2Score, unlocked: c2Unlocked },
    'chapter-3': { completed: c3Completed, bestScore: c3Score, unlocked: c3Unlocked },
    'chapter-4': { completed: c4Completed, bestScore: c4Score, unlocked: c4Unlocked },
    'chapter-5': { completed: c5Completed, bestScore: c5Score, unlocked: c5Unlocked },
  };
}

/**
 * Kiểm tra xem tài khoản hiện tại đã hoàn thành và tốt nghiệp cả 5 chương Nhập Môn chưa
 */
export function isBeginnerGraduated(): boolean {
  const progress = computeStrictCourseProgress();
  return Boolean(
    progress['chapter-1']?.completed &&
    progress['chapter-2']?.completed &&
    progress['chapter-3']?.completed &&
    progress['chapter-4']?.completed &&
    progress['chapter-5']?.completed
  );
}

/**
 * Lấy tổng kết tiến độ 5 chương Nhập môn của tài khoản hiện tại
 */
export function getBeginnerCourseSummary() {
  const progress = computeStrictCourseProgress();
  const list = Object.values(progress);
  const completedCount = list.filter((c) => c.completed).length;
  const totalCount = 5;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isGraduated = isBeginnerGraduated();
  return { completedCount, totalCount, percent, isGraduated };
}
