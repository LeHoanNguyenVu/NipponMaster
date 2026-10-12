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
 * Kiểm tra xem người dùng hiện tại đã có trình độ N5 trở lên (đã tốt nghiệp Nhập Môn) hay chưa
 */
export function isUserAdvancedLevel(): boolean {
  try {
    const user = useAuthStore.getState().user;
    const level = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
    return level !== 'STARTER';
  } catch {
    return false;
  }
}

/**
 * Lấy tiền tố định danh người dùng (User Scope) để cô lập tiến độ giữa các tài khoản khác nhau trên cùng trình duyệt.
 */
export function getUserScope(): string {
  try {
    const user = useAuthStore.getState().user;
    if (user?.email) return `u_${user.email.toLowerCase()}_`;
    if (user?.id) return `u_${user.id}_`;
  } catch {}
  try {
    const storedEmail = localStorage.getItem('nippon_current_user_email');
    if (storedEmail) return `u_${storedEmail.toLowerCase()}_`;
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
  // Đồng thời lưu vào legacy key để đảm bảo tương thích ngược
  try {
    const legacyKey = chapterNum === 1
      ? 'nippon_chapter_1_quiz_score'
      : `nippon_chapter_${chapterNum}_quiz_score`;
    const legacyPrev = Number(localStorage.getItem(legacyKey) || 0);
    localStorage.setItem(legacyKey, Math.max(legacyPrev, score).toString());
  } catch {}
}

/**
 * Lấy điểm số bài test của từng chương theo tài khoản người dùng hiện tại.
 * Ưu tiên phục hồi điểm THỰC TẾ:
 * 1. Điểm lưu theo tài khoản scopedKey: `${scope}ch_${chapterNum}_score`
 * 2. Điểm lưu legacyKey: `nippon_chapter_${chapterNum}_quiz_score`
 * 3. Với Chương 1: Điểm thi thật từ ngân hàng đề thi tổng hợp
 * 4. Điểm unscoped: `ch_${chapterNum}_score`
 * 5. Quét toàn bộ localStorage tìm bất kỳ key nào lưu điểm thật của chương này
 * Tuyệt đối bảo toàn điểm thật của người dùng, không bao giờ ép lên 100%.
 */
export function getChapterScore(chapterNum: number): number {
  const scope = getUserScope();

  // 1. Kiểm tra scoped key hiện tại
  if (scope) {
    const scopedKey = `${scope}ch_${chapterNum}_score`;
    const scopedVal = localStorage.getItem(scopedKey);
    if (scopedVal !== null && !isNaN(Number(scopedVal)) && Number(scopedVal) > 0) {
      return Math.min(100, Math.max(0, Number(scopedVal)));
    }
  }

  // 2. Fallback legacy key nếu chưa migrate
  const legacyKey = chapterNum === 1
    ? 'nippon_chapter_1_quiz_score'
    : `nippon_chapter_${chapterNum}_quiz_score`;
  const legacyVal = localStorage.getItem(legacyKey);
  if (legacyVal !== null && !isNaN(Number(legacyVal)) && Number(legacyVal) > 0) {
    const score = Math.min(100, Math.max(0, Number(legacyVal)));
    if (scope) saveChapterScore(chapterNum, score);
    return score;
  }

  // 3. Với Chương 1, kiểm tra điểm thi thật từ ngân hàng đề thi tổng hợp
  if (chapterNum === 1) {
    const ch1Real = getChapter1RealMaxScore();
    if (ch1Real > 0) {
      if (scope) saveChapterScore(1, ch1Real);
      return ch1Real;
    }
  }

  // 4. Kiểm tra unscoped key ch_{chapterNum}_score
  const unscopedKey = `ch_${chapterNum}_score`;
  const unscopedVal = localStorage.getItem(unscopedKey);
  if (unscopedVal !== null && !isNaN(Number(unscopedVal)) && Number(unscopedVal) > 0) {
    const score = Math.min(100, Math.max(0, Number(unscopedVal)));
    if (scope) saveChapterScore(chapterNum, score);
    return score;
  }

  // 5. Quét toàn bộ localStorage để tìm bất kỳ key nào lưu điểm thật của chương này
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (
        key.endsWith(`ch_${chapterNum}_score`) ||
        key.includes(`chapter_${chapterNum}_quiz`) ||
        key === `chapter_${chapterNum}_score`
      ) {
        const val = Number(localStorage.getItem(key));
        if (!isNaN(val) && val > 0 && val <= 100) {
          if (scope) saveChapterScore(chapterNum, val);
          return val;
        }
      }
    }
  } catch {}

  // 6. Kiểm tra trong cache tiến độ cũ beginner_course_progress (nếu có lưu điểm thật trước đó < 100)
  try {
    const rawCourse = localStorage.getItem('beginner_course_progress');
    if (rawCourse) {
      const parsed = JSON.parse(rawCourse);
      const chData = parsed[`chapter-${chapterNum}`];
      if (chData && typeof chData.bestScore === 'number' && chData.bestScore > 0 && chData.bestScore < 100) {
        if (scope) saveChapterScore(chapterNum, chData.bestScore);
        return chData.bestScore;
      }
    }
  } catch {}

  return 0;
}

/**
 * Tính toán tiến độ của 5 chương Nhập Môn.
 * - Mở khóa: Học viên đã lên N5+ được mở khóa toàn bộ để tự do ôn tập.
 * - Điểm số: Luôn phản ánh ĐÚNG ĐIỂM THẬT mà học viên đã làm được (không fake 100%).
 */
export function computeStrictCourseProgress(): ChapterProgressMap {
  const isAdvanced = isUserAdvancedLevel();

  const c1Score = getChapterScore(1);
  const c2Score = getChapterScore(2);
  const c3Score = getChapterScore(3);
  const c4Score = getChapterScore(4);
  const c5Score = getChapterScore(5);

  const c1Unlocked = true;
  const c1Completed = isAdvanced || c1Score >= UNLOCK_THRESHOLD;

  const c2Unlocked = isAdvanced || c1Completed;
  const c2Completed = isAdvanced || (c2Unlocked && c2Score >= UNLOCK_THRESHOLD);

  const c3Unlocked = isAdvanced || c2Completed;
  const c3Completed = isAdvanced || (c3Unlocked && c3Score >= UNLOCK_THRESHOLD);

  const c4Unlocked = isAdvanced || c3Completed;
  const c4Completed = isAdvanced || (c4Unlocked && c4Score >= UNLOCK_THRESHOLD);

  const c5Unlocked = isAdvanced || c4Completed;
  const c5Completed = isAdvanced || (c5Unlocked && c5Score >= UNLOCK_THRESHOLD);

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
  if (isUserAdvancedLevel()) return true;

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
  const isAdvanced = isUserAdvancedLevel();
  if (isAdvanced) {
    return { completedCount: 5, totalCount: 5, percent: 100, isGraduated: true };
  }

  const progress = computeStrictCourseProgress();
  const list = Object.values(progress);
  const completedCount = list.filter((c) => c.completed).length;
  const totalCount = 5;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isGraduated = isBeginnerGraduated();
  return { completedCount, totalCount, percent, isGraduated };
}
