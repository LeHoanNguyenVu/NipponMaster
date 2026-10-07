// moduleProgressManager.ts — Quản lý & Tính toán Tiến độ Tích lũy Thực tế của 4 Module Cốt lõi
// Đảm bảo tính nhất quán, lưu trữ qua localStorage và đồng bộ hóa với backend khi có sẵn.

export interface SingleModuleProgress {
  key: 'beginner' | 'kanji' | 'grammar' | 'listening';
  title: string;
  subtitle: string;
  categoryTag: string;
  japaneseWatermark: string;
  actionText: string;
  iconType: 'text' | 'lucide';
  iconText?: string;
  iconName?: string;
  completed: number;
  total: number;
  percent: number;
  unitLabel: string;
  theme: {
    gradient: string;
    border: string;
    hoverBorder: string;
    iconBg: string;
    badgeBg: string;
    watermarkColor: string;
    progressGradient: string;
    accentText: string;
    actionBtn: string;
  };
}

export interface AllModulesProgress {
  beginner: SingleModuleProgress;
  kanji: SingleModuleProgress;
  grammar: SingleModuleProgress;
  listening: SingleModuleProgress;
  overallMasteryPercent: number;
}

// Storage keys
export const STORAGE_KEYS = {
  BEGINNER: 'beginner_course_progress',
  KANJI_RADICALS: 'kanji_radicals_learned',
  GRAMMAR_LESSONS: 'grammar_watched_lessons',
  LISTENING_SCENARIOS: 'listening_completed_scenarios',
};

// 1. Tính toán tiến độ Nhập Môn (5 chương cơ bản)
export const getBeginnerProgress = (): { completed: number; total: number; percent: number } => {
  const total = 5;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEGINNER);
    if (!raw) {
      // Mặc định ban đầu: Chưa hoàn thành chương nào -> 0/5 (0%)
      return { completed: 0, total, percent: 0 };
    }
    const parsed = JSON.parse(raw);
    const chapterIds = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5'];
    let completedCount = 0;
    for (const id of chapterIds) {
      if (parsed[id]?.completed) {
        completedCount++;
      }
    }
    const percent = Math.min(100, Math.round((completedCount / total) * 100));
    return { completed: completedCount, total, percent };
  } catch {
    return { completed: 0, total, percent: 0 };
  }
};

// 2. Tính toán tiến độ Kanji (214 Bộ Thủ Khang Hy)
export const getKanjiRadicalsProgress = (fallbackLearned = 0): { completed: number; total: number; percent: number } => {
  const total = 214;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.KANJI_RADICALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const completed = parsed.length;
        return {
          completed,
          total,
          percent: Math.min(100, Math.round((completed / total) * 100)),
        };
      }
    }
  } catch {}

  const completed = Math.min(total, Math.max(0, fallbackLearned));
  return {
    completed,
    total,
    percent: Math.min(100, Math.round((completed / total) * 100)),
  };
};

// 3. Tính toán tiến độ Ngữ Pháp (50 Bài Giảng Tuyển Chọn)
export const getGrammarProgress = (fallbackLearned = 0): { completed: number; total: number; percent: number } => {
  const total = 50;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GRAMMAR_LESSONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const completed = parsed.length;
        return {
          completed,
          total,
          percent: Math.min(100, Math.round((completed / total) * 100)),
        };
      }
    }
  } catch {}

  const completed = Math.min(total, Math.max(0, fallbackLearned));
  return {
    completed,
    total,
    percent: Math.min(100, Math.round((completed / total) * 100)),
  };
};

// 4. Tính toán tiến độ Luyện Nghe (20 Kịch Bản Hội Thoại Thực Tế)
export const getListeningProgress = (fallbackLearned = 0): { completed: number; total: number; percent: number } => {
  const total = 20;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LISTENING_SCENARIOS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const completed = parsed.length;
        return {
          completed,
          total,
          percent: Math.min(100, Math.round((completed / total) * 100)),
        };
      }
    }
  } catch {}

  const completed = Math.min(total, Math.max(0, fallbackLearned));
  return {
    completed,
    total,
    percent: Math.min(100, Math.round((completed / total) * 100)),
  };
};

// Tải toàn bộ tiến độ 4 Module kèm giao diện tokens cao cấp, giàu màu sắc
export const loadAllModulesProgress = (serverStats?: {
  kanjiLearned?: number;
  grammarLearned?: number;
  listeningCompleted?: number;
}): AllModulesProgress => {
  const beg = getBeginnerProgress();
  const kan = getKanjiRadicalsProgress(serverStats?.kanjiLearned ?? 0);
  const gra = getGrammarProgress(serverStats?.grammarLearned ?? 0);
  const lis = getListeningProgress(serverStats?.listeningCompleted ?? 0);

  const overallMasteryPercent = Math.round(
    (beg.percent + kan.percent + gra.percent + lis.percent) / 4
  );

  return {
    beginner: {
      key: 'beginner',
      title: 'Bảng Chữ Cái & Âm Đọc',
      subtitle: 'Hiragana, Katakana & Biến âm, số đếm',
      categoryTag: 'KHOÁ NHẬP MÔN',
      japaneseWatermark: 'あ',
      actionText: 'Học Nhập Môn',
      iconType: 'text',
      iconText: 'あ',
      completed: beg.completed,
      total: beg.total,
      percent: beg.percent,
      unitLabel: 'chương',
      theme: {
        gradient: 'from-emerald-500/15 via-emerald-500/5 to-surface-container-lowest dark:from-emerald-950/40 dark:via-emerald-900/15 dark:to-surface-container-lowest',
        border: 'border-emerald-500/35 dark:border-emerald-500/30',
        hoverBorder: 'hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/15',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
        watermarkColor: 'text-emerald-500/[0.08]',
        progressGradient: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-600 dark:text-emerald-400',
        actionBtn: 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500',
      },
    },
    kanji: {
      key: 'kanji',
      title: 'Chữ Hán & Bộ Thủ Gốc',
      subtitle: 'Mẹo nhớ tượng hình & quy tắc số nét',
      categoryTag: '214 BỘ THỦ KHANG HY',
      japaneseWatermark: '漢',
      actionText: 'Ôn Luyện Kanji',
      iconType: 'text',
      iconText: '漢',
      completed: kan.completed,
      total: kan.total,
      percent: kan.percent,
      unitLabel: 'bộ thủ',
      theme: {
        gradient: 'from-amber-500/15 via-orange-500/5 to-surface-container-lowest dark:from-amber-950/40 dark:via-orange-900/15 dark:to-surface-container-lowest',
        border: 'border-amber-500/35 dark:border-amber-500/30',
        hoverBorder: 'hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/15',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30',
        badgeBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30',
        watermarkColor: 'text-amber-500/[0.08]',
        progressGradient: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-600 dark:text-amber-400',
        actionBtn: 'bg-amber-500/10 hover:bg-amber-500 text-amber-700 dark:text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-500',
      },
    },
    grammar: {
      key: 'grammar',
      title: 'Ngữ Pháp Cốt Lõi',
      subtitle: 'Bài giảng tuyển chọn từ N5 đến N1',
      categoryTag: '50 VIDEO YOUTUBE',
      japaneseWatermark: '文',
      actionText: 'Xem Bài Giảng',
      iconType: 'lucide',
      iconName: 'BookOpen',
      completed: gra.completed,
      total: gra.total,
      percent: gra.percent,
      unitLabel: 'bài học',
      theme: {
        gradient: 'from-indigo-500/15 via-purple-500/5 to-surface-container-lowest dark:from-indigo-950/40 dark:via-purple-900/15 dark:to-surface-container-lowest',
        border: 'border-indigo-500/35 dark:border-indigo-500/30',
        hoverBorder: 'hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/15',
        iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30',
        badgeBg: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30',
        watermarkColor: 'text-indigo-500/[0.08]',
        progressGradient: 'from-indigo-500 to-purple-400',
        accentText: 'text-indigo-600 dark:text-indigo-400',
        actionBtn: 'bg-indigo-500/10 hover:bg-indigo-500 text-indigo-700 dark:text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-500',
      },
    },
    listening: {
      key: 'listening',
      title: 'Luyện Nghe & Shadowing',
      subtitle: 'Hội thoại sinh hoạt, nhà hàng, ga tàu',
      categoryTag: '20 TÌNH HUỐNG THỰC TẾ',
      japaneseWatermark: '聴',
      actionText: 'Luyện Nghe Ngay',
      iconType: 'lucide',
      iconName: 'Headphones',
      completed: lis.completed,
      total: lis.total,
      percent: lis.percent,
      unitLabel: 'bài nghe',
      theme: {
        gradient: 'from-sky-500/15 via-cyan-500/5 to-surface-container-lowest dark:from-sky-950/40 dark:via-cyan-900/15 dark:to-surface-container-lowest',
        border: 'border-sky-500/35 dark:border-sky-500/30',
        hoverBorder: 'hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/15',
        iconBg: 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/30',
        badgeBg: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30',
        watermarkColor: 'text-sky-500/[0.08]',
        progressGradient: 'from-sky-500 to-cyan-400',
        accentText: 'text-sky-600 dark:text-sky-400',
        actionBtn: 'bg-sky-500/10 hover:bg-sky-500 text-sky-700 dark:text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-500',
      },
    },
    overallMasteryPercent,
  };
};

// Helper để ghi nhận hoàn thành bộ thủ (Hữu ích khi test hoặc học)
export const recordRadicalLearned = (radicalId: string): number => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.KANJI_RADICALS);
    let list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(radicalId)) {
      list.push(radicalId);
      localStorage.setItem(STORAGE_KEYS.KANJI_RADICALS, JSON.stringify(list));
    }
    return list.length;
  } catch {
    return 0;
  }
};

// Helper để ghi nhận đã xem video ngữ pháp
export const recordGrammarWatched = (lessonId: string | number): number => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GRAMMAR_LESSONS);
    let list: string[] = raw ? JSON.parse(raw) : [];
    const strId = String(lessonId);
    if (!list.includes(strId)) {
      list.push(strId);
      localStorage.setItem(STORAGE_KEYS.GRAMMAR_LESSONS, JSON.stringify(list));
    }
    return list.length;
  } catch {
    return 0;
  }
};

// Helper để ghi nhận hoàn thành kịch bản nghe
export const recordListeningScenarioCompleted = (scenarioId: string): number => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LISTENING_SCENARIOS);
    let list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(scenarioId)) {
      list.push(scenarioId);
      localStorage.setItem(STORAGE_KEYS.LISTENING_SCENARIOS, JSON.stringify(list));
    }
    return list.length;
  } catch {
    return 0;
  }
};
