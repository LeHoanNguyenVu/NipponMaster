// Duolingo-style Infinite Streak Manager

export interface StreakState {
  currentStreak: number;
  lastCheckInDate: string | null;
  checkedInToday: boolean;
  todayReviewedCards: number[]; // Danh sách index các thẻ (0-9) đã xem hôm nay
  todayGoalCards: number; // Mặc định 10 thẻ
  streakHistory: string[]; // Mảng các ngày YYYY-MM-DD đã điểm danh
}

const STREAK_STORAGE_KEY = 'nippon_duolingo_streak_v1';

// Lấy ngày hiện tại YYYY-MM-DD (local timezone)
export const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Tính khoảng cách giữa 2 ngày YYYY-MM-DD (d1 - d2)
export const getDayDifference = (d1Str: string, d2Str: string): number => {
  try {
    const d1 = new Date(d1Str + 'T00:00:00');
    const d2 = new Date(d2Str + 'T00:00:00');
    const diffTime = d1.getTime() - d2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
};

// Đọc và kiểm tra trạng thái Streak hiện tại
export const loadStreakState = (): StreakState => {
  const today = getTodayDateString();
  const defaultState: StreakState = {
    currentStreak: 0,
    lastCheckInDate: null,
    checkedInToday: false,
    todayReviewedCards: [],
    todayGoalCards: 10,
    streakHistory: [],
  };

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    const lastCheckIn = parsed.lastCheckInDate || null;
    let currentStreak = typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0;
    const streakHistory: string[] = Array.isArray(parsed.streakHistory) ? parsed.streakHistory : [];

    // Kiểm tra tính liên tục của chuỗi Streak:
    let checkedInToday = false;
    if (lastCheckIn) {
      const diff = getDayDifference(today, lastCheckIn);
      if (diff === 0) {
        // Đã điểm danh hôm nay
        checkedInToday = true;
      } else if (diff === 1) {
        // Lần điểm danh gần nhất là hôm qua -> Chuỗi còn nguyên vẹn, hôm nay chưa điểm danh
        checkedInToday = false;
      } else if (diff > 1) {
        // Đã quên điểm danh từ 1 ngày trở lên -> MẤT STREAK! Reset về 0
        currentStreak = 0;
        checkedInToday = false;
      }
    }

    // Đọc số thẻ đã học hôm nay (chỉ giữ thẻ của ngày hôm nay)
    const savedTodayCardsKey = `nippon_cards_reviewed_${today}`;
    let todayReviewedCards: number[] = [];
    try {
      const rawCards = localStorage.getItem(savedTodayCardsKey);
      if (rawCards) {
        todayReviewedCards = JSON.parse(rawCards);
      }
    } catch {}

    const state: StreakState = {
      currentStreak,
      lastCheckInDate: lastCheckIn,
      checkedInToday,
      todayReviewedCards,
      todayGoalCards: 10,
      streakHistory,
    };

    saveStreakState(state);
    return state;
  } catch {
    return defaultState;
  }
};

// Lưu trạng thái Streak vào localStorage
export const saveStreakState = (state: StreakState): void => {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify({
      currentStreak: state.currentStreak,
      lastCheckInDate: state.lastCheckInDate,
      streakHistory: state.streakHistory,
    }));

    const today = getTodayDateString();
    localStorage.setItem(`nippon_cards_reviewed_${today}`, JSON.stringify(state.todayReviewedCards));
  } catch {}
};

// Ghi nhận người dùng đã xem 1 thẻ flashcard (cardIndex 0-9)
// Trả về { justCheckedIn: boolean, state: StreakState }
export const recordFlashcardReviewed = (cardIndex: number): { justCheckedIn: boolean; state: StreakState } => {
  const state = loadStreakState();
  const today = getTodayDateString();

  // Thêm cardIndex vào mảng các thẻ hôm nay nếu chưa có
  if (!state.todayReviewedCards.includes(cardIndex)) {
    state.todayReviewedCards.push(cardIndex);
  }

  let justCheckedIn = false;

  // Điều kiện: Hoàn thành tối thiểu 10 thẻ hôm nay mới được tính điểm danh!
  if (state.todayReviewedCards.length >= state.todayGoalCards && !state.checkedInToday) {
    // Kích hoạt điểm danh:
    state.checkedInToday = true;
    state.currentStreak += 1;
    state.lastCheckInDate = today;
    if (!state.streakHistory.includes(today)) {
      state.streakHistory.push(today);
    }
    justCheckedIn = true;
  }

  saveStreakState(state);
  return { justCheckedIn, state };
};

// Lấy danh sách 7 ngày trong tuần hiện tại (Thứ 2 đến Chủ Nhật) kèm trạng thái đã điểm danh
export const getCurrentWeekDays = (streakHistory: string[]) => {
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 là Chủ nhật, 1 là Thứ 2, ...
  const distanceToMonday = (currentDayOfWeek + 6) % 7; // Số ngày từ Thứ 2 tuần này

  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMonday);

  const labels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const todayStr = getTodayDateString();

  return labels.map((label, idx) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + idx);

    const year = dayDate.getFullYear();
    const month = String(dayDate.getMonth() + 1).padStart(2, '0');
    const day = String(dayDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const isToday = dateStr === todayStr;
    const isCheckedIn = streakHistory.includes(dateStr);

    return {
      label,
      dateStr,
      isToday,
      active: isCheckedIn,
    };
  });
};
