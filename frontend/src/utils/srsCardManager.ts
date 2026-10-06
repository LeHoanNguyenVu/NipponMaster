// srsCardManager.ts — Quản lý Spaced Repetition (SRS) & Bốc 10 Thẻ Mới Mỗi Ngày
// Thuật toán: Dễ (+7 ngày), Thường (+3 ngày), Khó (+1 ngày)

import type { FlashcardItem } from '../data/flashcardMnemonics';
import { INITIAL_FALLBACK_CARDS, STANDARD_KANJI_INFO, SMART_MNEMONIC_REGISTRY } from '../data/flashcardMnemonics';

export type SrsDifficulty = 'easy' | 'medium' | 'hard';

export interface CardSrsRecord {
  cardKey: string;           // Kanji hoặc Kana làm khóa duy nhất
  nextReviewDate: string;    // YYYY-MM-DD
  lastReviewedDate: string;  // YYYY-MM-DD
  intervalDays: number;      // 7 (dễ), 3 (thường), 1 (khó)
  difficulty: SrsDifficulty;
  repetitions: number;       // Số lần đã ôn tập
}

const SRS_STORAGE_KEY = 'nippon_card_srs_records_v1';

// Lấy ngày hiện tại YYYY-MM-DD
export const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Cộng thêm N ngày vào dateStr (YYYY-MM-DD)
export const addDaysToDateString = (dateStr: string, days: number): string => {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return dateStr;
  }
};

// Đọc toàn bộ bản ghi SRS từ localStorage
export const loadSrsRecords = (): Record<string, CardSrsRecord> => {
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

// Lưu bản ghi SRS vào localStorage
export const saveSrsRecords = (records: Record<string, CardSrsRecord>): void => {
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(records));
  } catch {}
};

// Xây dựng kho thẻ mở rộng (Master Card Deck 60+ thẻ)
export const buildMasterCardPool = (): FlashcardItem[] => {
  const cardMap = new Map<string, FlashcardItem>();

  // 1. Thêm bộ thẻ khởi tạo
  for (const c of INITIAL_FALLBACK_CARDS) {
    const key = c.kanji || c.kana;
    if (key && !cardMap.has(key)) {
      cardMap.set(key, c);
    }
  }

  // 2. Bổ sung từ STANDARD_KANJI_INFO
  const kanjiEntries = Object.entries(STANDARD_KANJI_INFO);
  for (const [kanji, info] of kanjiEntries) {
    if (!cardMap.has(kanji)) {
      cardMap.set(kanji, {
        kanji,
        kana: info.kana,
        romaji: info.romaji,
        hanViet: kanji,
        meaning: `Từ vựng / Chữ Hán ${kanji} (${info.kana})`,
        strokeCount: 4,
        strokeGuide: 'Nét bút thuận quy chuẩn',
        exampleJp: `これは「${kanji}」です。`,
        exampleRomaji: `Kore wa '${info.romaji}' desu.`,
        exampleVi: `Đây là chữ ${kanji}.`,
        jlptLevel: 'N5',
      });
    }
  }

  // 3. Bổ sung từ SMART_MNEMONIC_REGISTRY (Hiragana)
  const kanaEntries = Object.entries(SMART_MNEMONIC_REGISTRY);
  for (const [kana, mnem] of kanaEntries) {
    if (!cardMap.has(kana)) {
      cardMap.set(kana, {
        kanji: kana,
        kana: kana,
        romaji: kana,
        hanViet: `Hiragana ${kana}`,
        meaning: `Ký tự ${kana} trong bảng chữ cái Hiragana`,
        strokeCount: 3,
        strokeGuide: 'Viết mềm mại theo thứ tự nét chuẩn',
        exampleJp: `${kana}から始まります。`,
        exampleRomaji: `${kana} kara hajimarimasu.`,
        exampleVi: `Bắt đầu từ chữ ${kana}.`,
        imageUrl: mnem.imageUrl,
        mnemonicTitle: mnem.mnemonicTitle,
        mnemonicHint: mnem.mnemonicHint,
        mnemonicIcon: mnem.mnemonicIcon,
        jlptLevel: 'STARTER',
      });
    }
  }

  return Array.from(cardMap.values());
};

// Thuật toán bốc 10 thẻ mỗi ngày:
// - Cố định 10 thẻ trong suốt ngày hôm nay (cache key daily_deck_YYYY-MM-DD).
// - Ưu tiên: Thẻ đến hạn ôn tập (nextReviewDate <= today).
// - Tiếp theo: Thẻ mới chưa từng học.
// - Tuyệt đối không chọn: Thẻ đã học mà chưa đến hạn (nextReviewDate > today).
export const getDaily10CardsDeck = (customCards?: FlashcardItem[], targetDate = getTodayDateString()): FlashcardItem[] => {
  const dailyDeckKey = `nippon_daily_deck_${targetDate}`;

  // Nếu hôm nay đã có bộ thẻ được bốc thì giữ nguyên cho học viên trong ngày
  try {
    const cached = localStorage.getItem(dailyDeckKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length === 10) {
        return parsed;
      }
    }
  } catch {}

  const masterPool = customCards && customCards.length >= 10 ? customCards : buildMasterCardPool();
  const srsRecords = loadSrsRecords();

  // 1. Thẻ đến hạn ôn tập hôm nay
  const dueCards: FlashcardItem[] = [];
  // 2. Thẻ mới tinh chưa từng học
  const newCards: FlashcardItem[] = [];
  // 3. Thẻ đang trong tương lai (nextReviewDate > targetDate) - Tạm bỏ qua
  const futureCards: FlashcardItem[] = [];

  for (const card of masterPool) {
    const key = card.kanji || card.kana;
    const record = srsRecords[key];

    if (!record) {
      newCards.push(card);
    } else if (record.nextReviewDate <= targetDate) {
      dueCards.push(card);
    } else {
      futureCards.push(card);
    }
  }

  // Shuffle thẻ mới theo ngày để mỗi ngày mới lại có thẻ mới khác nhau
  const seed = targetDate.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
  const shuffledNewCards = [...newCards].sort((a, b) => {
    const hashA = (a.kanji + targetDate).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const hashB = (b.kanji + targetDate).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return ((hashA + seed) % 23) - ((hashB + seed) % 23);
  });

  // Gom thẻ: Ưu tiên thẻ đến hạn trước, rồi bù thẻ mới
  let selected = [...dueCards, ...shuffledNewCards];

  // Nếu vẫn chưa đủ 10 thẻ (trường hợp học viên đã cày hết sạch kho), lấy thêm thẻ xa nhất
  if (selected.length < 10) {
    selected = [...selected, ...futureCards, ...masterPool];
  }

  // Lọc lấy 10 thẻ duy nhất
  const uniqueKeys = new Set<string>();
  const daily10: FlashcardItem[] = [];

  for (const card of selected) {
    const key = card.kanji || card.kana;
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      daily10.push(card);
    }
    if (daily10.length === 10) break;
  }

  // Lưu deck 10 thẻ hôm nay
  try {
    localStorage.setItem(dailyDeckKey, JSON.stringify(daily10));
  } catch {}

  return daily10;
};

// Ghi nhận đánh giá SRS cho một thẻ:
// - 'easy': +7 ngày
// - 'medium': +3 ngày
// - 'hard': +1 ngày
export const recordCardReviewSRS = (
  card: FlashcardItem,
  difficulty: SrsDifficulty,
  today = getTodayDateString()
): CardSrsRecord => {
  const key = card.kanji || card.kana;
  const intervalDays = difficulty === 'easy' ? 7 : difficulty === 'medium' ? 3 : 1;
  const nextReviewDate = addDaysToDateString(today, intervalDays);

  const srsRecords = loadSrsRecords();
  const prevRec = srsRecords[key];

  const record: CardSrsRecord = {
    cardKey: key,
    nextReviewDate,
    lastReviewedDate: today,
    intervalDays,
    difficulty,
    repetitions: (prevRec?.repetitions || 0) + 1,
  };

  srsRecords[key] = record;
  saveSrsRecords(srsRecords);

  return record;
};
