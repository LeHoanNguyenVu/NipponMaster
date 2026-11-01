// srsCardManager.ts — Quản lý Spaced Repetition (SRS) & Bốc 10 Thẻ Mới Mỗi Ngày Theo Trọng Số Cấp Độ JLPT
// Thuật toán SRS: Dễ (+7 ngày), Thường (+3 ngày), Khó (+1 ngày)
// Tỉ lệ phân bổ bộ thẻ theo cấp độ:
// - STARTER: 100% STARTER
// - N5: 100% N5
// - N4: 80% N4, 20% N5
// - N3: 80% N3, 15% N4, 5% N5
// - N2: 80% N2, 12% N3, 5% N4, 3% N5
// - N1: 80% N1, 10% N2, 5% N3, 3% N4, 2% N5

import type { FlashcardItem } from '../data/flashcardMnemonics';
import {
  INITIAL_FALLBACK_CARDS,
  N4_FALLBACK_CARDS,
  N3_FALLBACK_CARDS,
  N2_FALLBACK_CARDS,
  N1_FALLBACK_CARDS,
  STANDARD_KANJI_INFO,
  SMART_MNEMONIC_REGISTRY,
} from '../data/flashcardMnemonics';
import { getUserScope } from './userScope';

export type SrsDifficulty = 'easy' | 'medium' | 'hard';

export interface CardSrsRecord {
  cardKey: string;           // Kanji hoặc Kana làm khóa duy nhất
  nextReviewDate: string;    // YYYY-MM-DD
  lastReviewedDate: string;  // YYYY-MM-DD
  intervalDays: number;      // 7 (dễ), 3 (thường), 1 (khó)
  difficulty: SrsDifficulty;
  repetitions: number;       // Số lần đã ôn tập
}

export interface LevelRatioConfig {
  level: string;
  weight: number;
}

export const JLPT_DECK_RATIOS: Record<string, LevelRatioConfig[]> = {
  STARTER: [{ level: 'STARTER', weight: 1.0 }],
  N5: [{ level: 'N5', weight: 1.0 }],
  N4: [
    { level: 'N4', weight: 0.80 },
    { level: 'N5', weight: 0.20 },
  ],
  N3: [
    { level: 'N3', weight: 0.80 },
    { level: 'N4', weight: 0.15 },
    { level: 'N5', weight: 0.05 },
  ],
  N2: [
    { level: 'N2', weight: 0.80 },
    { level: 'N3', weight: 0.12 },
    { level: 'N4', weight: 0.05 },
    { level: 'N5', weight: 0.03 },
  ],
  N1: [
    { level: 'N1', weight: 0.80 },
    { level: 'N2', weight: 0.10 },
    { level: 'N3', weight: 0.05 },
    { level: 'N4', weight: 0.03 },
    { level: 'N5', weight: 0.02 },
  ],
};

const getSrsStorageKey = (): string => `${getUserScope()}nippon_card_srs_records_v1`;

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
    const raw = localStorage.getItem(getSrsStorageKey());
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

// Lưu bản ghi SRS vào localStorage
export const saveSrsRecords = (records: Record<string, CardSrsRecord>): void => {
  try {
    localStorage.setItem(getSrsStorageKey(), JSON.stringify(records));
  } catch {}
};

// Xây dựng kho thẻ mở rộng N5 & STARTER (Master Card Deck 60+ thẻ)
export const buildMasterCardPool = (): FlashcardItem[] => {
  const cardMap = new Map<string, FlashcardItem>();

  // 1. Thêm bộ thẻ khởi tạo
  for (const c of INITIAL_FALLBACK_CARDS) {
    const key = c.kanji || c.kana;
    if (key && !cardMap.has(key)) {
      cardMap.set(key, c);
    }
  }

  // 2. Bổ sung từ STANDARD_KANJI_INFO (N5)
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

  // 3. Bổ sung từ SMART_MNEMONIC_REGISTRY (Hiragana - STARTER)
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

// Lấy kho thẻ dự phòng bao hàm theo cấp độ (Cumulative Leveling)
export const getCumulativeFallbackCards = (levelKey = 'ALL'): FlashcardItem[] => {
  const lvl = (levelKey || 'N5').toUpperCase();
  const basePool = buildMasterCardPool();
  const starterCards = basePool.filter(c => (c.jlptLevel || 'STARTER').toUpperCase() === 'STARTER');
  // Với N5, các chữ Hán cơ bản trong INITIAL_FALLBACK_CARDS (木, 一, 本, 日, 月, 水, 火, 人, 山) cũng được gắn nhãn N5 khi dùng cho kho N5
  const n5KanjiFromStarter = INITIAL_FALLBACK_CARDS
    .filter(c => c.kanji !== 'あ')
    .map(c => ({ ...c, jlptLevel: 'N5' }));
  const n5OnlyCards = [
    ...n5KanjiFromStarter,
    ...basePool.filter(c => (c.jlptLevel || '').toUpperCase() === 'N5'),
  ];

  if (lvl === 'STARTER') {
    return starterCards;
  }
  if (lvl === 'N5') {
    return n5OnlyCards;
  }
  if (lvl === 'N4') {
    return [...N4_FALLBACK_CARDS, ...n5OnlyCards];
  }
  if (lvl === 'N3') {
    return [...N3_FALLBACK_CARDS, ...N4_FALLBACK_CARDS, ...n5OnlyCards];
  }
  if (lvl === 'N2') {
    return [...N2_FALLBACK_CARDS, ...N3_FALLBACK_CARDS, ...N4_FALLBACK_CARDS, ...n5OnlyCards];
  }
  if (lvl === 'N1') {
    return [...N1_FALLBACK_CARDS, ...N2_FALLBACK_CARDS, ...N3_FALLBACK_CARDS, ...N4_FALLBACK_CARDS, ...n5OnlyCards];
  }
  return [...N1_FALLBACK_CARDS, ...N2_FALLBACK_CARDS, ...N3_FALLBACK_CARDS, ...N4_FALLBACK_CARDS, ...n5OnlyCards];
};

// Xóa cache bộ thẻ trong ngày để bốc lại bộ thẻ mới
export const clearDailyDeckCache = (levelKey = 'ALL', targetDate = getTodayDateString()): void => {
  try {
    const norm = levelKey.toUpperCase();
    localStorage.removeItem(`${getUserScope()}nippon_daily_deck_${norm}_${targetDate}`);
    localStorage.removeItem(`${getUserScope()}nippon_daily_deck_v2_${norm}_${targetDate}`);
  } catch {}
};

// Xáo trộn mảng Fisher-Yates
const shuffleArray = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Tính số lượng thẻ cần bốc cho từng cấp độ trong bộ 10 thẻ theo đúng trọng số:
// - Phần nguyên Math.floor(deckSize * weight) luôn được đảm bảo cứng (VD: 8/10 thẻ cho level chính ở N4-N1, 10/10 ở N5).
// - Phần dư thập phân được phân bổ theo xác suất trọng số (stochastic rounding) để trung bình dài hạn khớp chính xác 100% tỉ lệ.
export const allocateSlotsByLevelRatio = (
  targetLevel: string,
  deckSize = 10
): Array<{ level: string; count: number }> => {
  const norm = (targetLevel || 'N5').toUpperCase();
  const ratios = JLPT_DECK_RATIOS[norm] || JLPT_DECK_RATIOS.N5;

  const exacts = ratios.map(r => ({
    level: r.level,
    base: Math.floor(deckSize * r.weight + 1e-9),
    remainder: Math.max(0, deckSize * r.weight - Math.floor(deckSize * r.weight + 1e-9)),
  }));

  let remainingSlots = deckSize - exacts.reduce((sum, item) => sum + item.base, 0);

  // Phân bổ các slot lẻ còn lại dựa trên trọng số phần dư (probabilistic remainder sampling)
  const availableRemainders = exacts.filter(e => e.remainder > 1e-6);
  while (remainingSlots > 0 && availableRemainders.length > 0) {
    const totalRem = availableRemainders.reduce((sum, item) => sum + item.remainder, 0);
    if (totalRem <= 0) {
      exacts[0].base += remainingSlots;
      break;
    }
    let rand = Math.random() * totalRem;
    let chosenIdx = 0;
    for (let i = 0; i < availableRemainders.length; i++) {
      rand -= availableRemainders[i].remainder;
      if (rand <= 0) {
        chosenIdx = i;
        break;
      }
    }
    const chosenLevel = availableRemainders[chosenIdx].level;
    const targetEntry = exacts.find(e => e.level === chosenLevel);
    if (targetEntry) {
      targetEntry.base += 1;
    }
    availableRemainders.splice(chosenIdx, 1);
    remainingSlots -= 1;
  }

  return exacts.map(e => ({ level: e.level, count: e.base }));
};

// Sắp xếp kho thẻ của 1 cấp độ theo thứ tự ưu tiên SRS:
// 1. Thẻ đến hạn ôn tập hôm nay (nextReviewDate <= targetDate)
// 2. Thẻ mới chưa từng học (đã xáo trộn ngẫu nhiên)
// 3. Thẻ ôn tập trong tương lai (đã xáo trộn ngẫu nhiên)
const prioritizeCardsBySrs = (
  pool: FlashcardItem[],
  srsRecords: Record<string, CardSrsRecord>,
  targetDate: string
): FlashcardItem[] => {
  const dueCards: FlashcardItem[] = [];
  const newCards: FlashcardItem[] = [];
  const futureCards: FlashcardItem[] = [];

  for (const card of pool) {
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

  return [
    ...shuffleArray(dueCards),
    ...shuffleArray(newCards),
    ...shuffleArray(futureCards),
  ];
};

// Thuật toán bốc 10 thẻ theo tỉ lệ cấp độ:
// - N5: 100% N5 (10 thẻ N5)
// - N4: 80% N4, 20% N5 (8 thẻ N4, 2 thẻ N5)
// - N3: 80% N3, 15% N4, 5% N5 (8 thẻ N3, 1-2 thẻ N4, 0-1 thẻ N5)
// - N2: 80% N2, 12% N3, 5% N4, 3% N5 (8 thẻ N2, 1-2 thẻ N3, 0-1 thẻ N4/N5)
// - N1: 80% N1, 10% N2, 5% N3, 3% N4, 2% N5 (8 thẻ N1, 1 thẻ N2, 1 thẻ N3/N4/N5)
export const getDaily10CardsDeck = (
  customCards?: FlashcardItem[],
  targetDate = getTodayDateString(),
  levelKey = 'ALL',
  forceRefresh = false
): FlashcardItem[] => {
  const normLevel = (levelKey && levelKey !== 'ALL' ? levelKey : 'N5').toUpperCase();
  const dailyDeckKey = `${getUserScope()}nippon_daily_deck_v2_${normLevel}_${targetDate}`;
  const expectedPrimaryMin = normLevel === 'N5' || normLevel === 'STARTER' ? 10 : 8;

  // Nếu không yêu cầu bốc mới, kiểm tra cache hôm nay và đảm bảo cache thỏa mãn đúng tỉ lệ >= 80% thẻ của cấp độ chính
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(dailyDeckKey);
      if (cached) {
        const parsed: FlashcardItem[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length === 10) {
          const primaryCount = parsed.filter(
            c => (c.jlptLevel || 'N5').toUpperCase() === normLevel
          ).length;
          if (primaryCount >= expectedPrimaryMin) {
            return parsed;
          }
        }
      }
    } catch {}
  }

  // Hợp nhất thẻ từ API (customCards) với kho thẻ dự phòng từng cấp độ để mọi cấp độ trong tỉ lệ đều có đủ dữ liệu
  const combinedMap = new Map<string, FlashcardItem>();
  if (customCards && customCards.length > 0) {
    for (const c of customCards) {
      const k = (c.kanji || c.kana || '').trim();
      const lvl = (c.jlptLevel || normLevel).toUpperCase();
      if (k && !combinedMap.has(`${lvl}:${k}`)) {
        combinedMap.set(`${lvl}:${k}`, { ...c, jlptLevel: lvl });
      }
    }
  }
  for (const c of getCumulativeFallbackCards(normLevel)) {
    const k = (c.kanji || c.kana || '').trim();
    const lvl = (c.jlptLevel || normLevel).toUpperCase();
    if (k && !combinedMap.has(`${lvl}:${k}`)) {
      combinedMap.set(`${lvl}:${k}`, { ...c, jlptLevel: lvl });
    }
  }

  const allCards = Array.from(combinedMap.values());
  const srsRecords = loadSrsRecords();

  // Gom nhóm thẻ theo từng cấp độ JLPT và sắp xếp theo độ ưu tiên SRS
  const cardsByLevel: Record<string, FlashcardItem[]> = {};
  for (const card of allCards) {
    const lvl = (card.jlptLevel || normLevel).toUpperCase();
    if (!cardsByLevel[lvl]) {
      cardsByLevel[lvl] = [];
    }
    cardsByLevel[lvl].push(card);
  }
  for (const lvl of Object.keys(cardsByLevel)) {
    cardsByLevel[lvl] = prioritizeCardsBySrs(cardsByLevel[lvl], srsRecords, targetDate);
  }

  // Phân bổ số lượng thẻ cho từng level theo đúng tỉ lệ
  const quotas = allocateSlotsByLevelRatio(normLevel, 10);
  const uniqueKeys = new Set<string>();
  const primarySelected: FlashcardItem[] = [];
  const lowerSelected: FlashcardItem[] = [];

  for (const { level, count } of quotas) {
    if (count <= 0) continue;
    const pool = cardsByLevel[level] || [];
    let picked = 0;
    for (const card of pool) {
      const key = card.kanji || card.kana;
      if (key && !uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        if (level === normLevel) {
          primarySelected.push(card);
        } else {
          lowerSelected.push(card);
        }
        picked++;
      }
      if (picked >= count) break;
    }
  }

  // Nếu bất kỳ cấp độ phụ nào thiếu thẻ, bù ưu tiên từ kho thẻ cấp độ chính (normLevel) trước
  const primaryPool = cardsByLevel[normLevel] || [];
  for (const card of primaryPool) {
    if (primarySelected.length + lowerSelected.length >= 10) break;
    const key = card.kanji || card.kana;
    if (key && !uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      primarySelected.push(card);
    }
  }

  // Nếu vẫn chưa đủ 10 thẻ, bù từ toàn bộ kho thẻ
  if (primarySelected.length + lowerSelected.length < 10) {
    for (const card of prioritizeCardsBySrs(allCards, srsRecords, targetDate)) {
      if (primarySelected.length + lowerSelected.length >= 10) break;
      const key = card.kanji || card.kana;
      if (key && !uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        lowerSelected.push(card);
      }
    }
  }

  // Đảm bảo thẻ đầu tiên (#1) luôn là thẻ thuộc cấp độ chính của người học,
  // 9 thẻ còn lại trộn đều giữa các thẻ cấp độ chính và thẻ ôn tập cấp dưới
  let daily10: FlashcardItem[];
  if (primarySelected.length > 0) {
    const firstCard = primarySelected[0];
    const restCards = shuffleArray([...primarySelected.slice(1), ...lowerSelected]);
    daily10 = [firstCard, ...restCards].slice(0, 10);
  } else {
    daily10 = shuffleArray([...lowerSelected]).slice(0, 10);
  }

  // Lưu deck 10 thẻ vào cache
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
