/**
 * numbersData.ts — Dữ liệu tĩnh Số Đếm, Đơn Vị Đếm (có Bảng Biến Âm 1-10) và Thời Gian
 */

export interface NumberItem {
  value: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  irregularNote?: string;
}

export interface CounterMutation {
  count: number;
  japanese: string;
  romaji: string;
  isIrregular: boolean; // Biến âm hay đọc bình thường
}

export interface CounterUnit {
  id: string;
  kanji: string;
  reading: string;
  usedFor: string;
  exampleSentence: string;
  exampleMeaning: string;
  mutations: CounterMutation[]; // Bảng đếm 1-10
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTab: 'numbers' | 'counters' | 'time'; // Tab chứa kiến thức này để review
}

// ══════════════════════════════════════════════════════
// 1. SỐ ĐẾM CƠ BẢN (BASIC NUMBERS)
// ══════════════════════════════════════════════════════

export const BASIC_NUMBERS: NumberItem[] = [
  { value: 0, kanji: '零 / ゼロ', hiragana: 'ぜろ / れい', romaji: 'zero / rei' },
  { value: 1, kanji: '一', hiragana: 'いち', romaji: 'ichi' },
  { value: 2, kanji: '二', hiragana: 'に', romaji: 'ni' },
  { value: 3, kanji: '三', hiragana: 'さん', romaji: 'san' },
  { value: 4, kanji: '四', hiragana: 'よん / し', romaji: 'yon / shi', irregularNote: 'Thường đọc là よん (yon), đọc là し (shi) trong 4月, 4時' },
  { value: 5, kanji: '五', hiragana: 'ご', romaji: 'go' },
  { value: 6, kanji: '六', hiragana: 'ろく', romaji: 'roku' },
  { value: 7, kanji: '七', hiragana: 'なな / しち', romaji: 'nana / shichi', irregularNote: 'Thường đọc là なな (nana), đọc là しち (shichi) trong 7月, 7時' },
  { value: 8, kanji: '八', hiragana: 'はち', romaji: 'hachi' },
  { value: 9, kanji: '九', hiragana: 'きゅう / く', romaji: 'kyuu / ku', irregularNote: 'Thường đọc là きゅう (kyuu), đọc là く (ku) trong 9月, 9時' },
  { value: 10, kanji: '十', hiragana: 'じゅう', romaji: 'juu' },
  { value: 100, kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', irregularNote: '300 = さんびゃく, 600 = ろっぴゃく, 800 = はっぴゃく' },
  { value: 1000, kanji: '千', hiragana: 'せん', romaji: 'sen', irregularNote: '3000 = さんぜん, 8000 = はっせん' },
  { value: 10000, kanji: '万', hiragana: 'まん', romaji: 'man', irregularNote: 'Tiếng Nhật đếm theo hàng 4 số 0 (1万 = 10.000)' },
];

// ══════════════════════════════════════════════════════
// 2. ĐƠN VỊ ĐẾM KÈM BẢNG BIẾN ÂM 1-10 (COUNTERS WITH MUTATIONS)
// ══════════════════════════════════════════════════════

export const COUNTERS: CounterUnit[] = [
  {
    id: 'ko',
    kanji: '個',
    reading: 'こ (ko)',
    usedFor: 'Đồ vật nhỏ, tròn (quả táo, cái bánh, quả trứng...)',
    exampleSentence: 'りんごを三個買いました。',
    exampleMeaning: 'Tôi đã mua 3 quả táo.',
    mutations: [
      { count: 1, japanese: 'いっこ', romaji: 'ikko', isIrregular: true },
      { count: 2, japanese: 'にこ', romaji: 'niko', isIrregular: false },
      { count: 3, japanese: 'さんこ', romaji: 'sanko', isIrregular: false },
      { count: 4, japanese: 'よんこ', romaji: 'yonko', isIrregular: false },
      { count: 5, japanese: 'ごこ', romaji: 'goko', isIrregular: false },
      { count: 6, japanese: 'ろっこ', romaji: 'rokko', isIrregular: true },
      { count: 7, japanese: 'ななこ', romaji: 'nanako', isIrregular: false },
      { count: 8, japanese: 'はっこ', romaji: 'hakko', isIrregular: true },
      { count: 9, japanese: 'きゅうこ', romaji: 'kyuuko', isIrregular: false },
      { count: 10, japanese: 'じゅっこ / じっこ', romaji: 'jukko', isIrregular: true },
    ]
  },
  {
    id: 'mai',
    kanji: '枚',
    reading: 'まい (mai)',
    usedFor: 'Đồ vật mỏng, phẳng (tờ giấy, chiếc áo, con tem, chiếc đĩa...)',
    exampleSentence: '切手を二枚ください。',
    exampleMeaning: 'Cho tôi xin 2 con tem.',
    mutations: [
      { count: 1, japanese: 'いちまい', romaji: 'ichimai', isIrregular: false },
      { count: 2, japanese: 'にまい', romaji: 'nimai', isIrregular: false },
      { count: 3, japanese: 'さんまい', romaji: 'sanmai', isIrregular: false },
      { count: 4, japanese: 'よんまい', romaji: 'yonmai', isIrregular: false },
      { count: 5, japanese: 'ごまい', romaji: 'gomai', isIrregular: false },
      { count: 6, japanese: 'ろくまい', romaji: 'rokumai', isIrregular: false },
      { count: 7, japanese: 'ななまい', romaji: 'nanamai', isIrregular: false },
      { count: 8, japanese: 'はちまい', romaji: 'hachimai', isIrregular: false },
      { count: 9, japanese: 'きゅうまい', romaji: 'kyuumai', isIrregular: false },
      { count: 10, japanese: 'じゅうまい', romaji: 'juumai', isIrregular: false },
    ]
  },
  {
    id: 'hiki',
    kanji: '匹',
    reading: 'ひき (hiki)',
    usedFor: 'Động vật nhỏ (con mèo, con chó, con cá, con côn trùng...)',
    exampleSentence: '猫が三匹います。',
    exampleMeaning: 'Có 3 con mèo.',
    mutations: [
      { count: 1, japanese: 'いっぴき', romaji: 'ippiki', isIrregular: true },
      { count: 2, japanese: 'にひき', romaji: 'nihiki', isIrregular: false },
      { count: 3, japanese: 'さんびき', romaji: 'sanbiki', isIrregular: true },
      { count: 4, japanese: 'よんひき', romaji: 'yonhiki', isIrregular: false },
      { count: 5, japanese: 'ごひき', romaji: 'gohiki', isIrregular: false },
      { count: 6, japanese: 'ろっぴき', romaji: 'roppiki', isIrregular: true },
      { count: 7, japanese: 'ななひき', romaji: 'nanahiki', isIrregular: false },
      { count: 8, japanese: 'はっぴき', romaji: 'happiki', isIrregular: true },
      { count: 9, japanese: 'きゅうひき', romaji: 'kyuuhiki', isIrregular: false },
      { count: 10, japanese: 'じゅっぴき', romaji: 'juppiki', isIrregular: true },
    ]
  },
  {
    id: 'hon',
    kanji: '本',
    reading: 'ほん (hon)',
    usedFor: 'Đồ vật hình trụ, dài (bút, chai nước, chiếc dù, cái cây...)',
    exampleSentence: 'ペンを三本買いました。',
    exampleMeaning: 'Tôi đã mua 3 cây bút.',
    mutations: [
      { count: 1, japanese: '一本 (いっぽん)', romaji: 'ippon', isIrregular: true },
      { count: 2, japanese: '二本 (にほん)', romaji: 'nihon', isIrregular: false },
      { count: 3, japanese: '三本 (さんぼん)', romaji: 'sanbon', isIrregular: true },
      { count: 4, japanese: '四本 (よんほん)', romaji: 'yonhon', isIrregular: false },
      { count: 5, japanese: '五本 (ごほん)', romaji: 'gohon', isIrregular: false },
      { count: 6, japanese: '六本 (ろっぽん)', romaji: 'roppon', isIrregular: true },
      { count: 7, japanese: '七本 (ななほん)', romaji: 'nanahon', isIrregular: false },
      { count: 8, japanese: '八本 (はっぽん)', romaji: 'happon', isIrregular: true },
      { count: 9, japanese: '九本 (きゅうほん)', romaji: 'kyuuhon', isIrregular: false },
      { count: 10, japanese: '十本 (じゅっぽん)', romaji: 'juppon', isIrregular: true },
    ]
  },
  {
    id: 'nin',
    kanji: '人',
    reading: 'にん (nin)',
    usedFor: 'Đếm người (chú ý 1 người và 2 người là từ thuần Nhật đặc biệt)',
    exampleSentence: '家族は四人です。',
    exampleMeaning: 'Gia đình tôi có 4 người.',
    mutations: [
      { count: 1, japanese: '一人 (ひとり)', romaji: 'hitori', isIrregular: true },
      { count: 2, japanese: '二人 (ふたり)', romaji: 'futari', isIrregular: true },
      { count: 3, japanese: '三人 (さんにん)', romaji: 'sannin', isIrregular: false },
      { count: 4, japanese: '四人 (よにん)', romaji: 'yonin', isIrregular: true },
      { count: 5, japanese: '五人 (ごにん)', romaji: 'gonin', isIrregular: false },
      { count: 6, japanese: '六人 (ろくにん)', romaji: 'rokunin', isIrregular: false },
      { count: 7, japanese: '七人 (しちにん / ななにん)', romaji: 'shichinin', isIrregular: false },
      { count: 8, japanese: '八人 (はちにん)', romaji: 'hachinin', isIrregular: false },
      { count: 9, japanese: '九人 (くにん / きゅうにん)', romaji: 'kunin', isIrregular: true },
      { count: 10, japanese: '十人 (じゅうにん)', romaji: 'juunin', isIrregular: false },
    ]
  },
  {
    id: 'dai',
    kanji: '台',
    reading: 'だい (dai)',
    usedFor: 'Xe cộ, máy móc, thiết bị điện tử (ô tô, máy tính, TV...)',
    exampleSentence: '車が一台あります。',
    exampleMeaning: 'Có 1 chiếc ô tô.',
    mutations: [
      { count: 1, japanese: 'いちだい', romaji: 'ichidai', isIrregular: false },
      { count: 2, japanese: 'にだい', romaji: 'nidai', isIrregular: false },
      { count: 3, japanese: 'さんだい', romaji: 'sandai', isIrregular: false },
      { count: 4, japanese: 'よんだい', romaji: 'yondai', isIrregular: false },
      { count: 5, japanese: 'ごだい', romaji: 'godai', isIrregular: false },
      { count: 6, japanese: 'ろくだい', romaji: 'rokudai', isIrregular: false },
      { count: 7, japanese: 'ななだい', romaji: 'nanadai', isIrregular: false },
      { count: 8, japanese: 'はちだい', romaji: 'hachidai', isIrregular: false },
      { count: 9, japanese: 'きゅうだい', romaji: 'kyuudai', isIrregular: false },
      { count: 10, japanese: 'じゅうだい', romaji: 'juudai', isIrregular: false },
    ]
  },
  {
    id: 'satsu',
    kanji: '冊',
    reading: 'さつ (satsu)',
    usedFor: 'Đếm sách, vở, tạp chí, từ điển...',
    exampleSentence: '本を二冊読みました。',
    exampleMeaning: 'Tôi đã đọc 2 quyển sách.',
    mutations: [
      { count: 1, japanese: 'いっさつ', romaji: 'issatsu', isIrregular: true },
      { count: 2, japanese: 'にさつ', romaji: 'nisatsu', isIrregular: false },
      { count: 3, japanese: 'さんさつ', romaji: 'sansatsu', isIrregular: false },
      { count: 4, japanese: 'よんさつ', romaji: 'yonsatsu', isIrregular: false },
      { count: 5, japanese: 'ごさつ', romaji: 'gosatsu', isIrregular: false },
      { count: 6, japanese: 'ろくさつ', romaji: 'rokusatsu', isIrregular: false },
      { count: 7, japanese: 'ななさつ', romaji: 'nanasatsu', isIrregular: false },
      { count: 8, japanese: 'はっさつ', romaji: 'hassatsu', isIrregular: true },
      { count: 9, japanese: 'きゅうさつ', romaji: 'kyuusatsu', isIrregular: false },
      { count: 10, japanese: 'じゅっさつ', romaji: 'jussatsu', isIrregular: true },
    ]
  },
];

// ══════════════════════════════════════════════════════
// 3. THỜI GIAN (HOURS, MINUTES, DAYS, MONTHS)
// ══════════════════════════════════════════════════════

export const HOURS_DATA = [
  { hour: 1, kanji: '一時', hiragana: 'いちじ', romaji: 'ichiji' },
  { hour: 2, kanji: '二時', hiragana: 'にじ', romaji: 'niji' },
  { hour: 3, kanji: '三時', hiragana: 'さんじ', romaji: 'sanji' },
  { hour: 4, kanji: '四時', hiragana: 'よじ', romaji: 'yoji', isIrregular: true, note: 'Bất quy tắc: Đọc là よじ (yoji), KHÔNG đọc yonji' },
  { hour: 5, kanji: '五時', hiragana: 'ごじ', romaji: 'goji' },
  { hour: 6, kanji: '六時', hiragana: 'ろくじ', romaji: 'rokuji' },
  { hour: 7, kanji: '七時', hiragana: 'しちじ', romaji: 'shichiji', isIrregular: true, note: 'Bất quy tắc: Đọc là しちじ (shichiji), KHÔNG đọc nanaji' },
  { hour: 8, kanji: '八時', hiragana: 'はちじ', romaji: 'hachiji' },
  { hour: 9, kanji: '九時', hiragana: 'くじ', romaji: 'kuji', isIrregular: true, note: 'Bất quy tắc: Đọc là くじ (kuji), KHÔNG đọc kyuuji' },
  { hour: 10, kanji: '十時', hiragana: 'じゅうじ', romaji: 'juuji' },
  { hour: 11, kanji: '十一時', hiragana: 'じゅういちじ', romaji: 'juuichiji' },
  { hour: 12, kanji: '十二時', hiragana: 'じゅうにじ', romaji: 'juuniji' },
];

export const MINUTES_SPECIAL = [
  { min: 1, kanji: '一分', hiragana: 'いっぷん', romaji: 'ippun', isIrregular: true },
  { min: 2, kanji: '二分', hiragana: 'にふん', romaji: 'nifun', isIrregular: false },
  { min: 3, kanji: '三分', hiragana: 'さんぷん', romaji: 'sanpun', isIrregular: true },
  { min: 4, kanji: '四分', hiragana: 'よんぷん', romaji: 'yonpun', isIrregular: true },
  { min: 5, kanji: '五分', hiragana: 'ごふん', romaji: 'gofun', isIrregular: false },
  { min: 6, kanji: '六分', hiragana: 'ろっぷん', romaji: 'roppun', isIrregular: true },
  { min: 7, kanji: '七分', hiragana: 'ななふん', romaji: 'nanafun', isIrregular: false },
  { min: 8, kanji: '八分', hiragana: 'はっぷん', romaji: 'happun', isIrregular: true },
  { min: 9, kanji: '九分', hiragana: 'きゅうふん', romaji: 'kyuufun', isIrregular: false },
  { min: 10, kanji: '十分', hiragana: 'じゅっぷん / じっぷん', romaji: 'juppun', isIrregular: true },
  { min: 15, kanji: '十五分', hiragana: 'じゅうごふん', romaji: 'juugofun', isIrregular: false },
  { min: 30, kanji: '三十分 / 半', hiragana: 'さんじゅっぷん / はん', romaji: 'sanjuppun / han', isIrregular: true },
];

export const DAYS_OF_WEEK = [
  { kanji: '月曜日', hiragana: 'げつようび', romaji: 'getsuyoubi', meaning: 'Thứ Hai (Nguyệt - Mặt Trăng)' },
  { kanji: '火曜日', hiragana: 'かようび', romaji: 'kayoubi', meaning: 'Thứ Ba (Hỏa - Lửa)' },
  { kanji: '水曜日', hiragana: 'すいようび', romaji: 'suiyoubi', meaning: 'Thứ Tư (Thủy - Nước)' },
  { kanji: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', meaning: 'Thứ Năm (Mộc - Cây)' },
  { kanji: '金曜日', hiragana: 'きんようび', romaji: 'kinyoubi', meaning: 'Thứ Sáu (Kim - Vàng)' },
  { kanji: '土曜日', hiragana: 'どようび', romaji: 'doyoubi', meaning: 'Thứ Bảy (Thổ - Đất)' },
  { kanji: '日曜日', hiragana: 'にちようび', romaji: 'nichiyoubi', meaning: 'Chủ Nhật (Nhật - Mặt Trời)' },
];

// ══════════════════════════════════════════════════════
// 4. QUIZ CHƯƠNG 2
// ══════════════════════════════════════════════════════

export const NUMBERS_CHAPTER_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Số 4時 (4 giờ) trong tiếng Nhật được đọc chuẩn là gì?',
    audioText: '四時',
    options: ['よんじ (yonji)', 'よじ (yoji)', 'しじ (shiji)', 'よんとき (yontoki)'],
    correctIndex: 1,
    explanation: '4時 là trường hợp bất quy tắc, bắt buộc đọc là よじ (yoji).',
    targetTab: 'time',
  },
  {
    id: 2,
    question: 'Để đếm 3 con mèo (động vật nhỏ), bạn dùng từ nào?',
    audioText: '三匹',
    options: ['さんひき (sanhiki)', 'さんぴき (sanpiki)', 'さんびき (sanbiki)', 'みっつ (mittsu)'],
    correctIndex: 2,
    explanation: 'Với đơn vị 匹 (hiki), khi đi sau số 3 (さん) sẽ bị biến âm thành さんびき (sanbiki).',
    targetTab: 'counters',
  },
  {
    id: 3,
    question: 'Số 9000 trong tiếng Nhật được viết và đọc là gì?',
    audioText: '九千',
    options: ['くせん (kusen)', 'きゅうせん (kyuusen)', 'きゅうぜん (kyuuzen)', 'くぜん (kuzen)'],
    correctIndex: 1,
    explanation: '9000 đọc là きゅうせん (kyuusen).',
    targetTab: 'numbers',
  },
  {
    id: 4,
    question: 'Từ "一人" (1 người) được phát âm chuẩn như thế nào?',
    audioText: '一人',
    options: ['いちにん (ichinin)', 'いちひと (ichihito)', 'ひとり (hitori)', 'ひとつ (hitotsu)'],
    correctIndex: 2,
    explanation: '1 người (一人) là từ thuần Nhật đặc biệt đọc là ひとり (hitori).',
    targetTab: 'counters',
  },
  {
    id: 5,
    question: '9時 (9 giờ) đọc là gì?',
    audioText: '九時',
    options: ['きゅうじ (kyuuji)', 'くじ (kuji)', 'こじ (koji)', 'きゅうとき (kyuutoki)'],
    correctIndex: 1,
    explanation: '9時 là biến âm bất quy tắc, đọc là くじ (kuji).',
    targetTab: 'time',
  },
  {
    id: 6,
    question: 'Đơn vị đếm 枚 (まい) dùng để đếm loại đồ vật nào?',
    options: ['Con vật nhỏ', 'Đồ vật hình trụ dài', 'Đồ vật mỏng, phẳng (giấy, áo, con tem)', 'Xe cộ máy móc'],
    correctIndex: 2,
    explanation: '枚 (mai) chuyên dùng cho vật mỏng, phẳng như tờ giấy, chiếc áo, đĩa CD.',
    targetTab: 'counters',
  },
  {
    id: 7,
    question: 'Thứ Tư (Thủy - Nước) trong tiếng Nhật là gì?',
    audioText: '水曜日',
    options: ['かようび (kayoubi)', 'すいようび (suiyoubi)', 'もくようび (mokuyoubi)', 'きんようび (kinyoubi)'],
    correctIndex: 1,
    explanation: 'Thứ Tư là 水曜日 (すいようび - sui-youbi).',
    targetTab: 'time',
  },
  {
    id: 8,
    question: '1分 (1 phút) được đọc là gì?',
    audioText: '一分',
    options: ['いちふん (ichifun)', 'いっぷん (ippun)', 'いちぷん (ichipun)', 'ひとふん (hitofun)'],
    correctIndex: 1,
    explanation: '1分 bị biến âm thành いっぷん (ippun).',
    targetTab: 'time',
  },
  {
    id: 9,
    question: 'Đoạn thoại: "切手を____枚ください" (Cho tôi 2 con tem). Điền từ thích hợp:',
    audioText: '二枚',
    options: ['ふたり (futari)', 'にこ (niko)', 'にまい (nimai)', 'にほん (nihon)'],
    correctIndex: 2,
    explanation: 'Con tem (切手) là vật phẳng nên đếm bằng 枚 (mai) -> 二枚 (nimai).',
    targetTab: 'counters',
  },
  {
    id: 10,
    question: 'Chữ Số 10.000 (Một vạn) trong tiếng Nhật là gì?',
    audioText: '一万',
    options: ['じゅうせん (juusen)', 'いちせん (ichisen)', 'いちまん (ichiman)', 'ひゃくせん (hyakusen)'],
    correctIndex: 2,
    explanation: '10.000 là 一万 (いちまん - ichiman).',
    targetTab: 'numbers',
  },
];
