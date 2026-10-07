/**
 * numbersData.ts — Dữ liệu tĩnh Số Đếm, Đơn Vị Đếm (có Bảng Biến Âm 1-10), Đếm Người, Đếm Tuổi, 31 Ngày Trong Tháng & Thời Gian
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

export interface PeopleCountItem {
  count: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  isSpecial: boolean;
  note?: string;
}

export interface DayOfMonthItem {
  day: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  isSpecial: boolean;
  mnemonicNote?: string;
}

export interface AgeCountItem {
  age: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  isSpecial: boolean;
  culturalNote?: string;
}

export interface ReflexPrompt {
  id: string;
  category: 'time' | 'date' | 'people' | 'age' | 'counters';
  categoryLabel: string;
  promptDisplay: string;
  hint: string;
  correctReading: string;
  correctRomaji: string;
  options: { reading: string; romaji: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTab: 'numbers' | 'counters' | 'time' | 'people_age' | 'days_of_month'; // Tab chứa kiến thức này để review
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
  { value: 10000, kanji: '万', hiragana: 'まん', romaji: 'man', irregularNote: 'Tiếng Nhật đếm theo hàng 4 số 0 (1万 = 10.000, 10万 = 100.000)' },
];

// ══════════════════════════════════════════════════════
// 2. BẢNG ĐẾM TUỔI ĐẶC BIỆT (AGE COUNTER - HATACHI)
// ══════════════════════════════════════════════════════

export const AGE_DATA: AgeCountItem[] = [
  { age: 1, kanji: '一歳 / 一才', hiragana: 'いっさい', romaji: 'issai', isSpecial: true, culturalNote: 'Biến âm âm ngắt (sokuon): いち + さい -> いっさい' },
  { age: 2, kanji: '二歳', hiragana: 'にさい', romaji: 'nisai', isSpecial: false },
  { age: 3, kanji: '三歳', hiragana: 'さんさい', romaji: 'sansai', isSpecial: false },
  { age: 4, kanji: '四歳', hiragana: 'よんさい', romaji: 'yonsai', isSpecial: false },
  { age: 5, kanji: '五歳', hiragana: 'ごさい', romaji: 'gosai', isSpecial: false },
  { age: 6, kanji: '六歳', hiragana: 'ろくさい', romaji: 'rokusai', isSpecial: false },
  { age: 7, kanji: '七歳', hiragana: 'ななさい', romaji: 'nanasai', isSpecial: false },
  { age: 8, kanji: '八歳', hiragana: 'はっさい', romaji: 'hassai', isSpecial: true, culturalNote: 'Biến âm âm ngắt: はち + さい -> はっさい' },
  { age: 9, kanji: '九歳', hiragana: 'きゅうさい', romaji: 'kyuusai', isSpecial: false },
  { age: 10, kanji: '十歳', hiragana: 'じゅっさい / じっさい', romaji: 'jussai / jissai', isSpecial: true, culturalNote: 'Biến âm âm ngắt: じゅう + さい -> じゅっさい' },
  { age: 11, kanji: '十一歳', hiragana: 'じゅういっさい', romaji: 'juuissai', isSpecial: true },
  { age: 18, kanji: '十八歳', hiragana: 'じゅうはっさい', romaji: 'juuhassai', isSpecial: true },
  { age: 20, kanji: '二十歳', hiragana: 'はたち', romaji: 'hatachi', isSpecial: true, culturalNote: '🌟 BẤT QUY TẮC ĐẶC BIỆT NHẤT: Tuổi trưởng thành của Nhật Bản (Lễ 成人式). Tuyệt đối không đọc là にじゅっさい!' },
  { age: 30, kanji: '三十歳', hiragana: 'さんじゅっさい', romaji: 'sanjussai', isSpecial: true },
];

export const AGE_QUESTION_PHRASES = [
  { kanji: '何歳', hiragana: 'なんさい', romaji: 'nansai', meaning: 'Bao nhiêu tuổi? (Dùng hàng ngày, thân mật)' },
  { kanji: 'おいくつ', hiragana: 'おいくつ', romaji: 'oikutsu', meaning: 'Bác / Anh / Chị bao nhiêu tuổi ạ? (Kính ngữ trang trọng, lịch sự)' },
];

// ══════════════════════════════════════════════════════
// 3. BẢNG SỐ ĐẾM NGƯỜI ĐẶC BIỆT (PEOPLE COUNTER - HITORI, FUTARI, YONIN)
// ══════════════════════════════════════════════════════

export const PEOPLE_COUNTER_DATA: PeopleCountItem[] = [
  { count: 1, kanji: '一人', hiragana: 'ひとり', romaji: 'hitori', isSpecial: true, note: 'Từ thuần Nhật cổ đặc biệt, không dùng đuôi にん' },
  { count: 2, kanji: '二人', hiragana: 'ふたり', romaji: 'futari', isSpecial: true, note: 'Từ thuần Nhật cổ đặc biệt, không dùng đuôi にん' },
  { count: 3, kanji: '三人', hiragana: 'さんにん', romaji: 'sannin', isSpecial: false, note: 'Từ 3 người trở lên bắt đầu dùng số + にん (nin)' },
  { count: 4, kanji: '四人', hiragana: 'よにん', romaji: 'yonin', isSpecial: true, note: '⚠️ BẤT QUY TẮC: Bắt buộc đọc là よにん (yonin), cấm đọc yon-nin hay shi-nin!' },
  { count: 5, kanji: '五人', hiragana: 'ごにん', romaji: 'gonin', isSpecial: false },
  { count: 6, kanji: '六人', hiragana: 'ろくにん', romaji: 'rokunin', isSpecial: false },
  { count: 7, kanji: '七人', hiragana: 'しちにん / ななにん', romaji: 'shichinin / nananin', isSpecial: false, note: 'Có 2 cách đọc, thường dùng しちにん hơn' },
  { count: 8, kanji: '八人', hiragana: 'はちにん', romaji: 'hachinin', isSpecial: false },
  { count: 9, kanji: '九人', hiragana: 'くにん / きゅうにん', romaji: 'kunin / kyuunin', isSpecial: true, note: 'Ưu tiên đọc là くにん (kunin)' },
  { count: 10, kanji: '十人', hiragana: 'じゅうにん', romaji: 'juunin', isSpecial: false },
];

export const PEOPLE_SPECIAL_EXPRESSIONS = [
  { kanji: '何人', hiragana: 'なんにん', romaji: 'nannin', meaning: 'Mấy người? / Bao nhiêu người?' },
  { kanji: '一人ぼっち', hiragana: 'ひとりぼっち', romaji: 'hitoribocchi', meaning: 'Cô đơn một mình, lẻ loi' },
  { kanji: '二人きり', hiragana: 'ふたりきり', romaji: 'futarikiri', meaning: 'Chỉ có 2 người chúng ta' },
  { kanji: '大人数', hiragana: 'おおにんずう', romaji: 'ooninzuu', meaning: 'Số lượng đông người' },
  { kanji: '少人数', hiragana: 'しょうにんずう', romaji: 'shouninzuu', meaning: 'Nhóm ít người' },
];

// ══════════════════════════════════════════════════════
// 4. BẢNG NGÀY TRONG THÁNG (1 ĐẾN 31 NGÀY - TSUITACHI, FUTSUKA... HATSUKA)
// ══════════════════════════════════════════════════════

export const DAYS_OF_MONTH_DATA: DayOfMonthItem[] = [
  { day: 1, kanji: '一日', hiragana: 'ついたち', romaji: 'tsuitachi', isSpecial: true, mnemonicNote: '🌟 Bắt nguồn từ "tsukitachi" (mặt trăng bắt đầu mọc đầu tháng)' },
  { day: 2, kanji: '二日', hiragana: 'ふつか', romaji: 'futsuka', isSpecial: true, mnemonicNote: 'Âm thuần Nhật: futsu + ka' },
  { day: 3, kanji: '三日', hiragana: 'みっか', romaji: 'mikka', isSpecial: true, mnemonicNote: 'Âm ngắt: mi + kka' },
  { day: 4, kanji: '四日', hiragana: 'よっか', romaji: 'yokka', isSpecial: true, mnemonicNote: '⚠️ Âm ngắt sokuon: yokka (Dễ nhầm với mùng 8 youka!)' },
  { day: 5, kanji: '五日', hiragana: 'いつか', romaji: 'itsuka', isSpecial: true, mnemonicNote: 'Âm thuần Nhật: itsu + ka' },
  { day: 6, kanji: '六日', hiragana: 'むいか', romaji: 'muika', isSpecial: true, mnemonicNote: 'Âm thuần Nhật: mui + ka' },
  { day: 7, kanji: '七日', hiragana: 'なのか', romaji: 'nanoka', isSpecial: true, mnemonicNote: 'Âm thuần Nhật: nano + ka' },
  { day: 8, kanji: '八日', hiragana: 'ようか', romaji: 'youka', isSpecial: true, mnemonicNote: '⚠️ Trường âm: youka (kéo dài, phân biệt với mùng 4 yokka)' },
  { day: 9, kanji: '九日', hiragana: 'ここのか', romaji: 'kokonoka', isSpecial: true, mnemonicNote: 'Âm thuần Nhật: kokono + ka' },
  { day: 10, kanji: '十日', hiragana: 'とおか', romaji: 'tooka', isSpecial: true, mnemonicNote: 'Trường âm: to-o-ka' },
  { day: 11, kanji: '十一日', hiragana: 'じゅういちにち', romaji: 'juuichinichi', isSpecial: false },
  { day: 12, kanji: '十二日', hiragana: 'じゅうににち', romaji: 'juuninichi', isSpecial: false },
  { day: 13, kanji: '十三日', hiragana: 'じゅうさんにち', romaji: 'juusannichi', isSpecial: false },
  { day: 14, kanji: '十四日', hiragana: 'じゅうよっか', romaji: 'juuyokka', isSpecial: true, mnemonicNote: '⚠️ Đuôi mùng 4 bất quy tắc: juu + yokka (Không đọc juuyonnichi)' },
  { day: 15, kanji: '十五日', hiragana: 'じゅうごにち', romaji: 'juugonichi', isSpecial: false },
  { day: 16, kanji: '十六日', hiragana: 'じゅうろくにち', romaji: 'juurokunichi', isSpecial: false },
  { day: 17, kanji: '十七日', hiragana: 'じゅうしちにち / じゅうななにち', romaji: 'juushichinichi / juunananichi', isSpecial: false },
  { day: 18, kanji: '十八日', hiragana: 'じゅうはちにち', romaji: 'juuhachinichi', isSpecial: false },
  { day: 19, kanji: '十九日', hiragana: 'じゅうくにち', romaji: 'juukunichi', isSpecial: false },
  { day: 20, kanji: '二十日', hiragana: 'はつか', romaji: 'hatsuka', isSpecial: true, mnemonicNote: '🌟 BẤT QUY TẮC ĐẶC BIỆT: hatsuka (Tuyệt đối không đọc nijunichi)' },
  { day: 21, kanji: '二十一日', hiragana: 'にじゅういちにち', romaji: 'nijuuichinichi', isSpecial: false },
  { day: 22, kanji: '二十二日', hiragana: 'にじゅうににち', romaji: 'nijuuninichi', isSpecial: false },
  { day: 23, kanji: '二十三日', hiragana: 'にじゅうさんにち', romaji: 'nijuusannichi', isSpecial: false },
  { day: 24, kanji: '二十四日', hiragana: 'にじゅうよっか', romaji: 'nijuuyokka', isSpecial: true, mnemonicNote: '⚠️ Đuôi mùng 4 bất quy tắc: nijuu + yokka' },
  { day: 25, kanji: '二十五日', hiragana: 'にじゅうごにち', romaji: 'nijuugonichi', isSpecial: false },
  { day: 26, kanji: '二十六日', hiragana: 'にじゅうろくにち', romaji: 'nijuurokunichi', isSpecial: false },
  { day: 27, kanji: '二十七日', hiragana: 'にじゅうしちにち / にじゅうななにち', romaji: 'nijuushichinichi / nijuunananichi', isSpecial: false },
  { day: 28, kanji: '二十八日', hiragana: 'にじゅうはちにち', romaji: 'nijuuhachinichi', isSpecial: false },
  { day: 29, kanji: '二十九日', hiragana: 'にじゅうくにち', romaji: 'nijuukunichi', isSpecial: false },
  { day: 30, kanji: '三十日', hiragana: 'さんじゅうにち', romaji: 'sanjuunichi', isSpecial: false },
  { day: 31, kanji: '三十一日', hiragana: 'さんじゅういちにち', romaji: 'sanjuuichinichi', isSpecial: false },
];

// ══════════════════════════════════════════════════════
// 5. ĐƠN VỊ ĐẾM KÈM BẢNG BIẾN ÂM 1-10 (COUNTERS WITH MUTATIONS)
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
      { count: 10, japanese: 'じゅっこ / じっこ', romaji: 'jukko / jikko', isIrregular: true },
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
    usedFor: 'Đếm người (chú ý 1 người, 2 người và 4 người là bất quy tắc)',
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
// 6. THỜI GIAN (HOURS, MINUTES, DAYS OF WEEK)
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
  { min: 10, kanji: '十分', hiragana: 'じゅっぷん / じっぷん', romaji: 'juppun / jippun', isIrregular: true },
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
// 7. BÀI LUYỆN PHẢN XẠ NHANH (SPEED REFLEX FLASH PROMPTS)
// ══════════════════════════════════════════════════════

export const REFLEX_PROMPTS: ReflexPrompt[] = [
  {
    id: 'rf_1',
    category: 'time',
    categoryLabel: 'Giờ Giấc',
    promptDisplay: '04:00',
    hint: 'Bốn giờ đúng',
    correctReading: 'よじ',
    correctRomaji: 'yoji',
    options: [
      { reading: 'よんじ', romaji: 'yonji' },
      { reading: 'よじ', romaji: 'yoji' },
      { reading: 'しじ', romaji: 'shiji' },
      { reading: 'よんとき', romaji: 'yontoki' },
    ],
  },
  {
    id: 'rf_2',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 01',
    hint: 'Mùng một đầu tháng',
    correctReading: 'ついたち',
    correctRomaji: 'tsuitachi',
    options: [
      { reading: 'いちにち', romaji: 'ichinichi' },
      { reading: 'ひとつひ', romaji: 'hitotsuhi' },
      { reading: 'ついたち', romaji: 'tsuitachi' },
      { reading: 'ついた', romaji: 'tsuita' },
    ],
  },
  {
    id: 'rf_3',
    category: 'age',
    categoryLabel: 'Đếm Tuổi',
    promptDisplay: '20 Tuổi',
    hint: 'Tuổi trưởng thành của người Nhật',
    correctReading: 'はたち',
    correctRomaji: 'hatachi',
    options: [
      { reading: 'にじゅっさい', romaji: 'nijussai' },
      { reading: 'にじゅうさい', romaji: 'nijuusai' },
      { reading: 'にじっさい', romaji: 'nijissai' },
      { reading: 'はたち', romaji: 'hatachi' },
    ],
  },
  {
    id: 'rf_4',
    category: 'people',
    categoryLabel: 'Đếm Người',
    promptDisplay: '4 Người',
    hint: 'Số lượng 4 người trong phòng',
    correctReading: 'よにん',
    correctRomaji: 'yonin',
    options: [
      { reading: 'よにん', romaji: 'yonin' },
      { reading: 'よんにん', romaji: 'yonnin' },
      { reading: 'しにん', romaji: 'shinin' },
      { reading: 'よったり', romaji: 'yottari' },
    ],
  },
  {
    id: 'rf_5',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 20',
    hint: 'Ngày 20 trong tháng',
    correctReading: 'はつか',
    correctRomaji: 'hatsuka',
    options: [
      { reading: 'にじゅうにち', romaji: 'nijuunichi' },
      { reading: 'はつか', romaji: 'hatsuka' },
      { reading: 'ふつか', romaji: 'futsuka' },
      { reading: 'はっか', romaji: 'hakka' },
    ],
  },
  {
    id: 'rf_6',
    category: 'counters',
    categoryLabel: 'Đơn Vị Đếm',
    promptDisplay: '3 Con Mèo',
    hint: 'Động vật nhỏ (con mèo)',
    correctReading: 'さんびき',
    correctRomaji: 'sanbiki',
    options: [
      { reading: 'さんひき', romaji: 'sanhiki' },
      { reading: 'さんぴき', romaji: 'sanpiki' },
      { reading: 'さんびき', romaji: 'sanbiki' },
      { reading: 'みっぴき', romaji: 'mippiki' },
    ],
  },
  {
    id: 'rf_7',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 08',
    hint: 'Mùng tám (trường âm)',
    correctReading: 'ようか',
    correctRomaji: 'youka',
    options: [
      { reading: 'よっか', romaji: 'yokka' },
      { reading: 'はちにち', romaji: 'hachinichi' },
      { reading: 'やっか', romaji: 'yakka' },
      { reading: 'ようか', romaji: 'youka' },
    ],
  },
  {
    id: 'rf_8',
    category: 'time',
    categoryLabel: 'Giờ Giấc',
    promptDisplay: '09:00',
    hint: 'Chín giờ đúng',
    correctReading: 'くじ',
    correctRomaji: 'kuji',
    options: [
      { reading: 'きゅうじ', romaji: 'kyuuji' },
      { reading: 'くじ', romaji: 'kuji' },
      { reading: 'こじ', romaji: 'koji' },
      { reading: 'きゅうとき', romaji: 'kyuutoki' },
    ],
  },
  {
    id: 'rf_9',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 04',
    hint: 'Mùng bốn (âm ngắt)',
    correctReading: 'よっか',
    correctRomaji: 'yokka',
    options: [
      { reading: 'ようか', romaji: 'youka' },
      { reading: 'よんにち', romaji: 'yonnichi' },
      { reading: 'よっか', romaji: 'yokka' },
      { reading: 'しにち', romaji: 'shinichi' },
    ],
  },
  {
    id: 'rf_10',
    category: 'people',
    categoryLabel: 'Đếm Người',
    promptDisplay: '1 Người',
    hint: 'Một người cô đơn',
    correctReading: 'ひとり',
    correctRomaji: 'hitori',
    options: [
      { reading: 'いちにん', romaji: 'ichinin' },
      { reading: 'いちひと', romaji: 'ichihito' },
      { reading: 'ひとつ', romaji: 'hitotsu' },
      { reading: 'ひとり', romaji: 'hitori' },
    ],
  },
  {
    id: 'rf_11',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 14',
    hint: 'Ngày 14 trong tháng',
    correctReading: 'じゅうよっか',
    correctRomaji: 'juuyokka',
    options: [
      { reading: 'じゅうよんにち', romaji: 'juuyonnichi' },
      { reading: 'じゅうよっか', romaji: 'juuyokka' },
      { reading: 'じゅうしにち', romaji: 'juushinichi' },
      { reading: 'じゅうようか', romaji: 'juuyouka' },
    ],
  },
  {
    id: 'rf_12',
    category: 'time',
    categoryLabel: 'Giờ Giấc',
    promptDisplay: '07:00',
    hint: 'Bảy giờ sáng',
    correctReading: 'しちじ',
    correctRomaji: 'shichiji',
    options: [
      { reading: 'ななじ', romaji: 'nanaji' },
      { reading: 'しちとき', romaji: 'shichitoki' },
      { reading: 'しちじ', romaji: 'shichiji' },
      { reading: 'ななとき', romaji: 'nanatoki' },
    ],
  },
  {
    id: 'rf_13',
    category: 'counters',
    categoryLabel: 'Đơn Vị Đếm',
    promptDisplay: '1 Cây Bút',
    hint: 'Vật hình trụ, dài (bút)',
    correctReading: 'いっぽん',
    correctRomaji: 'ippon',
    options: [
      { reading: 'いちほん', romaji: 'ichihon' },
      { reading: 'いちぼん', romaji: 'ichibon' },
      { reading: 'ひとほん', romaji: 'hitohon' },
      { reading: 'いっぽん', romaji: 'ippon' },
    ],
  },
  {
    id: 'rf_14',
    category: 'age',
    categoryLabel: 'Đếm Tuổi',
    promptDisplay: '1 Tuổi',
    hint: 'Một tuổi (em bé)',
    correctReading: 'いっさい',
    correctRomaji: 'issai',
    options: [
      { reading: 'いちさい', romaji: 'ichisai' },
      { reading: 'いっさい', romaji: 'issai' },
      { reading: 'ひとさい', romaji: 'hitosai' },
      { reading: 'いっぽん', romaji: 'ippon' },
    ],
  },
  {
    id: 'rf_15',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 24',
    hint: 'Ngày 24 trong tháng',
    correctReading: 'にじゅうよっか',
    correctRomaji: 'nijuuyokka',
    options: [
      { reading: 'にじゅうよんにち', romaji: 'nijuuyonnichi' },
      { reading: 'にじゅうよっか', romaji: 'nijuuyokka' },
      { reading: 'にじゅうしにち', romaji: 'nijuushinichi' },
      { reading: 'にじゅうようか', romaji: 'nijuuyouka' },
    ],
  },
  {
    id: 'rf_16',
    category: 'time',
    categoryLabel: 'Giờ Giấc',
    promptDisplay: '01:30',
    hint: 'Một giờ ba mươi phút / Một giờ rưỡi',
    correctReading: 'いちじはん',
    correctRomaji: 'ichijihan',
    options: [
      { reading: 'いちじさんじゅっぷん', romaji: 'ichijisanjuppun' },
      { reading: 'ひとじはん', romaji: 'hitojihan' },
      { reading: 'いちじはん', romaji: 'ichijihan' },
      { reading: 'いちじはんぷん', romaji: 'ichijihanpun' },
    ],
  },
  {
    id: 'rf_17',
    category: 'time',
    categoryLabel: 'Giờ Giấc',
    promptDisplay: '10:10',
    hint: 'Mười giờ mười phút',
    correctReading: 'じゅうじじゅっぷん',
    correctRomaji: 'juujijuppun',
    options: [
      { reading: 'じゅうじじゅうふん', romaji: 'juujijuufun' },
      { reading: 'じゅうじじゅっぷん', romaji: 'juujijuppun' },
      { reading: 'とおじじゅっぷん', romaji: 'toojijuppun' },
      { reading: 'じゅうじじっぷん', romaji: 'juujijippun' },
    ],
  },
  {
    id: 'rf_18',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 02',
    hint: 'Mùng hai đầu tháng',
    correctReading: 'ふつか',
    correctRomaji: 'futsuka',
    options: [
      { reading: 'ににち', romaji: 'ninichi' },
      { reading: 'ふつか', romaji: 'futsuka' },
      { reading: 'みっか', romaji: 'mikka' },
      { reading: 'はつか', romaji: 'hatsuka' },
    ],
  },
  {
    id: 'rf_19',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 03',
    hint: 'Mùng ba đầu tháng',
    correctReading: 'みっか',
    correctRomaji: 'mikka',
    options: [
      { reading: 'さんにち', romaji: 'sannichi' },
      { reading: 'よっか', romaji: 'yokka' },
      { reading: 'みっか', romaji: 'mikka' },
      { reading: 'いつか', romaji: 'itsuka' },
    ],
  },
  {
    id: 'rf_20',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 05',
    hint: 'Mùng năm đầu tháng',
    correctReading: 'いつか',
    correctRomaji: 'itsuka',
    options: [
      { reading: 'いつか', romaji: 'itsuka' },
      { reading: 'ごにち', romaji: 'gonichi' },
      { reading: 'むいか', romaji: 'muika' },
      { reading: 'なのか', romaji: 'nanoka' },
    ],
  },
  {
    id: 'rf_21',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 06',
    hint: 'Mùng sáu đầu tháng',
    correctReading: 'むいか',
    correctRomaji: 'muika',
    options: [
      { reading: 'ろくにち', romaji: 'rokunichi' },
      { reading: 'いつか', romaji: 'itsuka' },
      { reading: 'むいか', romaji: 'muika' },
      { reading: 'ようか', romaji: 'youka' },
    ],
  },
  {
    id: 'rf_22',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 07',
    hint: 'Mùng bảy đầu tháng',
    correctReading: 'なのか',
    correctRomaji: 'nanoka',
    options: [
      { reading: 'ななにち', romaji: 'nananichi' },
      { reading: 'しちにち', romaji: 'shichinichi' },
      { reading: 'なのか', romaji: 'nanoka' },
      { reading: 'ここのか', romaji: 'kokonoka' },
    ],
  },
  {
    id: 'rf_23',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 09',
    hint: 'Mùng chín đầu tháng',
    correctReading: 'ここのか',
    correctRomaji: 'kokonoka',
    options: [
      { reading: 'きゅうにち', romaji: 'kyuunichi' },
      { reading: 'くにち', romaji: 'kunichi' },
      { reading: 'とおか', romaji: 'tooka' },
      { reading: 'ここのか', romaji: 'kokonoka' },
    ],
  },
  {
    id: 'rf_24',
    category: 'date',
    categoryLabel: 'Ngày Trong Tháng',
    promptDisplay: 'Ngày 10',
    hint: 'Mùng mười đầu tháng',
    correctReading: 'とおか',
    correctRomaji: 'tooka',
    options: [
      { reading: 'じゅうにち', romaji: 'juunichi' },
      { reading: 'とおか', romaji: 'tooka' },
      { reading: 'ようか', romaji: 'youka' },
      { reading: 'はつか', romaji: 'hatsuka' },
    ],
  },
  {
    id: 'rf_25',
    category: 'people',
    categoryLabel: 'Đếm Người',
    promptDisplay: '2 Người',
    hint: 'Đôi bạn thân',
    correctReading: 'ふたり',
    correctRomaji: 'futari',
    options: [
      { reading: 'ににん', romaji: 'ninin' },
      { reading: 'ふたり', romaji: 'futari' },
      { reading: 'にひと', romaji: 'nihito' },
      { reading: 'ふたつ', romaji: 'futatsu' },
    ],
  },
  {
    id: 'rf_26',
    category: 'age',
    categoryLabel: 'Đếm Tuổi',
    promptDisplay: '8 Tuổi',
    hint: 'Tám tuổi (học sinh tiểu học)',
    correctReading: 'はっさい',
    correctRomaji: 'hassai',
    options: [
      { reading: 'はちさい', romaji: 'hachisai' },
      { reading: 'はっさい', romaji: 'hassai' },
      { reading: 'やつさい', romaji: 'yatsusai' },
      { reading: 'はちさいの', romaji: 'hachisaino' },
    ],
  },
  {
    id: 'rf_27',
    category: 'age',
    categoryLabel: 'Đếm Tuổi',
    promptDisplay: '10 Tuổi',
    hint: 'Mười tuổi tròn',
    correctReading: 'じゅっさい',
    correctRomaji: 'jussai',
    options: [
      { reading: 'じゅうさい', romaji: 'juusai' },
      { reading: 'とおさい', romaji: 'toosai' },
      { reading: 'じゅっさい', romaji: 'jussai' },
      { reading: 'じゅんさい', romaji: 'junsai' },
    ],
  },
  {
    id: 'rf_28',
    category: 'counters',
    categoryLabel: 'Đơn Vị Đếm',
    promptDisplay: '2 Tờ Giấy',
    hint: 'Vật thể phẳng, mỏng (tờ giấy)',
    correctReading: 'にまい',
    correctRomaji: 'nimai',
    options: [
      { reading: 'にまい', romaji: 'nimai' },
      { reading: 'にこ', romaji: 'niko' },
      { reading: 'にほん', romaji: 'nihon' },
      { reading: 'ふたつ', romaji: 'futatsu' },
    ],
  },
  {
    id: 'rf_29',
    category: 'counters',
    categoryLabel: 'Đơn Vị Đếm',
    promptDisplay: '6 Chiếc Ô Tô',
    hint: 'Xe cộ, máy móc thiết bị',
    correctReading: 'ろくだい',
    correctRomaji: 'rokudai',
    options: [
      { reading: 'ろっこ', romaji: 'rokko' },
      { reading: 'ろくだい', romaji: 'rokudai' },
      { reading: 'ろくほん', romaji: 'rokuhon' },
      { reading: 'むつだい', romaji: 'mutsudai' },
    ],
  },
  {
    id: 'rf_30',
    category: 'counters',
    categoryLabel: 'Đơn Vị Đếm',
    promptDisplay: '1 Quyển Sách',
    hint: 'Sách, vở, tạp chí đóng tập',
    correctReading: 'いっさつ',
    correctRomaji: 'issatsu',
    options: [
      { reading: 'いちさつ', romaji: 'ichisatsu' },
      { reading: 'ひとさつ', romaji: 'hitosatsu' },
      { reading: 'いっこ', romaji: 'ikko' },
      { reading: 'いっさつ', romaji: 'issatsu' },
    ],
  },
];

// ══════════════════════════════════════════════════════
// 8. QUIZ CHƯƠNG 2 TOÀN DIỆN (20 CÂU HỎI TRẮC NGHIỆM CHUẨN)
// ══════════════════════════════════════════════════════

export const NUMBERS_CHAPTER_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Số 4時 (4 giờ) trong tiếng Nhật được đọc chuẩn là gì?',
    audioText: '四時',
    options: ['よじ (yoji)', 'よんじ (yonji)', 'しじ (shiji)', 'よんとき (yontoki)'],
    correctIndex: 0,
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
    options: ['いちにん (ichinin)', 'いちひと (ichihito)', 'ひとつ (hitotsu)', 'ひとり (hitori)'],
    correctIndex: 3,
    explanation: '1 người (一人) là từ thuần Nhật đặc biệt đọc là ひとり (hitori).',
    targetTab: 'people_age',
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
    options: ['すいようび (suiyoubi)', 'かようび (kayoubi)', 'もくようび (mokuyoubi)', 'きんようび (kinyoubi)'],
    correctIndex: 0,
    explanation: 'Thứ Tư là 水曜日 (すいようび - sui-youbi).',
    targetTab: 'time',
  },
  {
    id: 8,
    question: '1分 (1 phút) được đọc là gì?',
    audioText: '一分',
    options: ['いちふん (ichifun)', 'いちぷん (ichipun)', 'ひとふん (hitofun)', 'いっぷん (ippun)'],
    correctIndex: 3,
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
    options: ['じゅうせん (juusen)', 'いちせん (ichisen)', 'ひゃくせん (hyakusen)', 'いちまん (ichiman)'],
    correctIndex: 3,
    explanation: '10.000 là 一万 (いちまん - ichiman).',
    targetTab: 'numbers',
  },
  {
    id: 11,
    question: 'Người Nhật gọi 20 tuổi (tuổi trưởng thành) bằng từ đặc biệt nào?',
    audioText: '二十歳',
    options: ['にじゅっさい (nijussai)', 'はたち (hatachi)', 'にじゅうさい (nijuusai)', 'はつか (hatsuka)'],
    correctIndex: 1,
    explanation: '20 tuổi là mốc thành nhân (成人) ở Nhật và bắt buộc đọc là はたち (hatachi), không đọc nijussai.',
    targetTab: 'people_age',
  },
  {
    id: 12,
    question: 'Ngày mùng 1 đầu tháng (一日) trong tiếng Nhật phát âm là gì?',
    audioText: '一日',
    options: ['ついたち (tsuitachi)', 'いちにち (ichinichi)', 'ひとつひ (hitotsuhi)', 'ついた (tsuita)'],
    correctIndex: 0,
    explanation: 'Ngày 1 đầu tháng đọc là ついたち (tsuitachi). Từ いちにち (ichinichi) chỉ dùng khi đếm khoảng thời gian 1 ngày.',
    targetTab: 'days_of_month',
  },
  {
    id: 13,
    question: 'Phân biệt ngày 4 (四日) và ngày 8 (八日) trong tháng:',
    audioText: '八日',
    options: [
      'Ngày 4 là yokka (âm ngắt), Ngày 8 là youka (trường âm)',
      'Ngày 4 là youka (trường âm), Ngày 8 là yokka (âm ngắt)',
      'Cả hai đều đọc là yokka',
      'Ngày 4 là yonnichi, Ngày 8 là hachinichi'
    ],
    correctIndex: 0,
    explanation: '四日 (ngày 4) có âm ngắt đọc là よっか (yokka). 八日 (ngày 8) có trường âm đọc là ようか (youka).',
    targetTab: 'days_of_month',
  },
  {
    id: 14,
    question: 'Ngày 20 trong tháng (二十日) được phát âm chuẩn là gì?',
    audioText: '二十日',
    options: ['にじゅうにち (nijuunichi)', 'はつか (hatsuka)', 'はたち (hatachi)', 'ふつか (futsuka)'],
    correctIndex: 1,
    explanation: 'Ngày 20 trong tháng là はつか (hatsuka). Chú ý không nhầm với はたち (hatachi - 20 tuổi)!',
    targetTab: 'days_of_month',
  },
  {
    id: 15,
    question: 'Khi đếm "4 người" trong phòng, người Nhật nói là gì?',
    audioText: '四人',
    options: ['よんにん (yonnin)', 'しにん (shinin)', 'よったり (yottari)', 'よにん (yonin)'],
    correctIndex: 3,
    explanation: '4 người bắt buộc đọc là よにん (yonin). Tuyệt đối cấm đọc yonnin hay shinin.',
    targetTab: 'people_age',
  },
  {
    id: 16,
    question: 'Ngày 14 trong tháng (十四日) được đọc như thế nào?',
    audioText: '十四日',
    options: ['じゅうよんにち (juuyonnichi)', 'じゅうしにち (juushinichi)', 'じゅうよっか (juuyokka)', 'じゅうようか (juuyouka)'],
    correctIndex: 2,
    explanation: 'Ngày 14 giữ nguyên đuôi bất quy tắc của ngày mùng 4 -> じゅうよっか (juuyokka).',
    targetTab: 'days_of_month',
  },
  {
    id: 17,
    question: 'Đơn vị đếm 台 (だい - dai) được sử dụng để đếm những đối tượng nào?',
    audioText: '二台',
    options: [
      'Sách vở, tài liệu in ấn',
      'Xe cộ, máy móc thiết bị cơ khí điện tử (ô tô, xe máy, tivi, máy tính)',
      'Trang phục và áo quần mặc trên người',
      'Động vật kích thước nhỏ như chó, mèo, cá'
    ],
    correctIndex: 1,
    explanation: '台 (dai) là lượng từ chuyên dùng để đếm phương tiện giao thông và thiết bị máy móc, điện tử.',
    targetTab: 'counters',
  },
  {
    id: 18,
    question: 'Số 300 (三百) là trường hợp biến âm đặc biệt của hàng trăm. Cách đọc chuẩn xác là gì?',
    audioText: '三百',
    options: ['さんひゃく (sanhyaku)', 'さんぴゃく (sanpyaku)', 'さんびゃく (sanbyaku)', 'みっひゃく (mihhyaku)'],
    correctIndex: 2,
    explanation: 'Hàng trăm đi sau số 3 (さん) bị biến âm đục thành さんびゃく (sanbyaku). Tương tự 600 là roppyaku, 800 là happyaku.',
    targetTab: 'numbers',
  },
  {
    id: 19,
    question: 'Đơn vị đếm đồ vật hình trụ dài (chai nước, cây bút, cái cây) là 本 (ほん - hon). Khi đếm "3 chai nước" thì biến âm thành gì?',
    audioText: '三本',
    options: ['さんほん (sanhon)', 'さんぽん (sanpon)', 'みっほん (mihhon)', 'さんぼん (sanbon)'],
    correctIndex: 3,
    explanation: 'Số 3 kết hợp với 本 sẽ bị biến âm đục thành さんぼん (sanbon). Trong khi 1 chai là ippon, 6 chai là roppon.',
    targetTab: 'counters',
  },
  {
    id: 20,
    question: 'Ngày 24 trong tháng (二十四日) được phát âm chuẩn xác trong tiếng Nhật là gì?',
    audioText: '二十四日',
    options: ['にじゅうよっか (nijuuyokka)', 'にじゅうよんにち (nijuuyonnichi)', 'にじゅうしにち (nijuushinichi)', 'にじゅうようか (nijuuyouka)'],
    correctIndex: 0,
    explanation: 'Ngày 24 kết hợp số 20 (にじゅう) với biến âm của ngày 4 (よっか) tạo thành にじゅうよっか (nijuuyokka).',
    targetTab: 'days_of_month',
  },
];
