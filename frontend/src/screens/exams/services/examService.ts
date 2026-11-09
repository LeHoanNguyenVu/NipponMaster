import axiosClient from '../../../api/axiosClient';
import type { ExamAttemptSummary, ExamComment } from '../types';

const ATTEMPTS_KEY_PREFIX = 'nippon_jlpt_attempts_';
const COMMENTS_KEY_PREFIX = 'nippon_jlpt_comments_';

export function getLocalExamAttempts(examId: string): ExamAttemptSummary[] {
  try {
    const key = `${ATTEMPTS_KEY_PREFIX}${examId}`;
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);

    // Check fallback legacy store
    const legacyRaw = localStorage.getItem('nippon_jlpt_exam_attempts_v1');
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      if (parsed[examId]) return [parsed[examId]];
    }
  } catch {
    // Ignore parse error
  }
  return [];
}

export async function fetchExamAttempts(examId: string, userId?: string | number): Promise<ExamAttemptSummary[]> {
  const localList = getLocalExamAttempts(examId);
  try {
    if (userId) {
      const res = await axiosClient.get(`/exams/history?userId=${userId}`);
      const data = (res as { data?: { content?: unknown[] } })?.data?.content || (res as { content?: unknown[] })?.content;
      if (Array.isArray(data) && data.length > 0) {
        // Map backend ExamResult to ExamAttemptSummary if available
        const records = data as Array<Record<string, unknown>>;
        const remoteList: ExamAttemptSummary[] = records
          .filter((item) => String(item.examId || (item.exam as Record<string, unknown>)?.id) === examId)
          .map((item) => ({
            examId,
            completedAt: (item.createdAt as string) || new Date().toISOString(),
            vocabScore: Number(item.vocabScore || 0),
            grammarReadingScore: Number(item.grammarReadingScore || 0),
            listeningScore: Number(item.listeningScore || 0),
            totalScore: Number(item.score || 0),
            passed: Boolean(item.passed),
            correctCount: Number(item.correctCount || 0),
            totalQuestions: Number(item.totalQuestions || 89),
            userAnswers: item.userAnswers ? JSON.parse(item.userAnswers as string) : {},
          }));
        if (remoteList.length > 0) {
          return remoteList;
        }
      }
    }
  } catch {
    // Fall back to local synchronized storage
  }

  return localList;
}

export async function submitExamAttempt(
  summary: ExamAttemptSummary,
  userId?: string | number
): Promise<void> {
  // 1. Save to local real-time attempts store
  try {
    const key = `${ATTEMPTS_KEY_PREFIX}${summary.examId}`;
    const raw = localStorage.getItem(key);
    const list: ExamAttemptSummary[] = raw ? JSON.parse(raw) : [];
    list.unshift(summary);
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Ignore storage quota
  }

  // 2. Sync to Backend & Supabase Database
  try {
    if (userId) {
      await axiosClient.post(`/exams/${summary.examId}/submit`, {
        examId: summary.examId,
        userId,
        score: summary.totalScore,
        totalScore: 180,
        correctCount: summary.correctCount,
        totalQuestions: summary.totalQuestions,
        vocabScore: summary.vocabScore,
        grammarReadingScore: summary.grammarReadingScore,
        listeningScore: summary.listeningScore,
        passed: summary.passed,
        userAnswers: JSON.stringify(summary.userAnswers),
      });
    }
  } catch {
    // Backend sync background attempt
  }
}

export function fetchExamComments(examId: string): ExamComment[] {
  try {
    const key = `${COMMENTS_KEY_PREFIX}${examId}`;
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore parse error
  }
  return [];
}

export function saveExamComment(comment: ExamComment): ExamComment[] {
  try {
    const key = `${COMMENTS_KEY_PREFIX}${comment.examId}`;
    const raw = localStorage.getItem(key);
    const list: ExamComment[] = raw ? JSON.parse(raw) : [];
    const updated = [comment, ...list];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch {
    return [comment];
  }
}

export function likeExamComment(examId: string, commentId: string): ExamComment[] {
  try {
    const key = `${COMMENTS_KEY_PREFIX}${examId}`;
    const raw = localStorage.getItem(key);
    const list: ExamComment[] = raw ? JSON.parse(raw) : [];
    const updated = list.map((c) => {
      if (c.id === commentId) {
        const nextLiked = !c.userLiked;
        return {
          ...c,
          userLiked: nextLiked,
          likes: Math.max(0, (c.likes || 0) + (nextLiked ? 1 : -1)),
        };
      }
      return c;
    });
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function replyExamComment(
  examId: string,
  commentId: string,
  reply: import('../types').ExamCommentReply
): ExamComment[] {
  try {
    const key = `${COMMENTS_KEY_PREFIX}${examId}`;
    const raw = localStorage.getItem(key);
    const list: ExamComment[] = raw ? JSON.parse(raw) : [];
    const updated = list.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), reply],
        };
      }
      return c;
    });
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteExamComment(
  examId: string,
  commentId: string,
  isReply = false,
  parentId?: string
): ExamComment[] {
  try {
    const key = `${COMMENTS_KEY_PREFIX}${examId}`;
    const raw = localStorage.getItem(key);
    const list: ExamComment[] = raw ? JSON.parse(raw) : [];
    let updated: ExamComment[] = [];

    if (isReply && parentId) {
      updated = list.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: (c.replies || []).filter((r) => r.id !== commentId),
          };
        }
        return c;
      });
    } else {
      updated = list.filter((c) => c.id !== commentId);
    }

    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getExamLiveStats(examId: string) {
  let localAttemptsCount = 0;
  let localCommentsCount = 0;
  try {
    const rawAtt = localStorage.getItem(`${ATTEMPTS_KEY_PREFIX}${examId}`);
    if (rawAtt) localAttemptsCount = JSON.parse(rawAtt).length;
    const rawCom = localStorage.getItem(`${COMMENTS_KEY_PREFIX}${examId}`);
    if (rawCom) {
      const parsed: ExamComment[] = JSON.parse(rawCom);
      // Count both root comments and replies
      localCommentsCount = parsed.reduce(
        (sum, item) => sum + 1 + (item.replies?.length || 0),
        0
      );
    }
  } catch {
    // Ignore parse error
  }

  return {
    totalAttempts: localAttemptsCount,
    commentCount: localCommentsCount,
  };
}
