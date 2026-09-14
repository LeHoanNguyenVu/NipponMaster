/**
 * basicGrammarData.ts — Dữ liệu tĩnh Cấu Trúc Ngữ Pháp Nhập Môn & Đề Thi Tốt Nghiệp 5 Chương
 */

export interface GrammarExample {
  japanese: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  audioText: string;
}

export interface GrammarPattern {
  id: string;
  title: string;
  pattern: string;
  explanation: string;
  structureDiagram: string;
  usageNotes: string[];
  examples: GrammarExample[];
}

export interface GraduationQuizQuestion {
  id: number;
  chapterSource: 'Chương 1 (Kana)' | 'Chương 2 (Số & Thời gian)' | 'Chương 3 (Aisatsu)' | 'Chương 4 (Bộ thủ)' | 'Chương 5 (Ngữ pháp)';
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTab: 'patterns' | 'tenses';
}

// ══════════════════════════════════════════════════════
// 1. CẤU TRÚC NGỮ PHÁP CĂN BẢN
// ══════════════════════════════════════════════════════

export const GRAMMAR_PATTERNS: GrammarPattern[] = [
  {
    id: 'pattern_1',
    title: 'Câu Khẳng Định & Phủ Định Với Danh Từ',
    pattern: 'N1 は N2 です / ではありません',
    explanation: 'Dùng để giới thiệu tên, quốc tịch, nghề nghiệp hoặc miêu tả bản chất của danh từ N1. Trợ từ は đọc là "wa", đánh dấu N1 là chủ đề của câu. です (desu) đặt ở cuối câu thể hiện thái độ lịch sự.',
    structureDiagram: '[Chủ ngữ N1] + は (wa) + [Vị ngữ N2] + です (desu) / ではありません',
    usageNotes: [
      'Trợ từ は viết là chữ HA (は) nhưng bắt buộc đọc là WA.',
      'Phủ định lịch sự: N2 ではありません (dewa arimasen). trong giao tiếp thân mật dùng じゃありません (jaa arimasen).'
    ],
    examples: [
      { japanese: 'わたしは たなかです。', hiragana: 'わたしは たなかです。', romaji: 'watashi wa tanaka desu.', meaning: 'Tôi là Tanaka.', audioText: '私は田中です' },
      { japanese: 'わたしは がくせいです。', hiragana: 'わたしは がくせいです。', romaji: 'watashi wa gakusei desu.', meaning: 'Tôi là học sinh.', audioText: '私は学生です' },
      { japanese: 'マイクさんは せんせいではありません。', hiragana: 'マイクさんは せんせいではありません。', romaji: 'maiku-san wa sensei dewa arimasen.', meaning: 'Anh Mike không phải là giáo viên.', audioText: 'マイクさんは先生ではありません' },
    ]
  },
  {
    id: 'pattern_2',
    title: 'Câu Hỏi Nghi Vấn (Có / Không)',
    pattern: 'N1 は N2 ですか',
    explanation: 'Chỉ cần thêm trợ từ か (ka) vào cuối câu khẳng định để biến thành câu hỏi. Khi trả lời, dùng はい (Hai = Vâng/Đúng) hoặc いいえ (Iie = Không/Sai).',
    structureDiagram: '[Câu khẳng định] + か (ka) ?',
    usageNotes: [
      'Trong tiếng Nhật không cần dùng dấu hỏi (?), trợ từ か ở cuối câu đã đảm nhận vai trò hỏi.',
      'Khi nói, nâng giọng lên nhẹ ở trợ từ か cuối câu.'
    ],
    examples: [
      { japanese: 'あなた は がくせい ですか。', hiragana: 'あなた は がくせい ですか。', romaji: 'anata wa gakusei desu ka.', meaning: 'Bạn có phải là học sinh không?', audioText: 'あなたは学生ですか' },
      { japanese: 'はい、がくせい です。', hiragana: 'はい、がくせい です。', romaji: 'hai, gakusei desu.', meaning: 'Vâng, tôi là học sinh.', audioText: 'はい、学生です' },
      { japanese: 'いいえ、がくせい ではありません。', hiragana: 'いいえ、がくせい ではありません。', romaji: 'iie, gakusei dewa arimasen.', meaning: 'Không, tôi không phải là học sinh.', audioText: 'いいえ、学生ではありません' },
    ]
  },
  {
    id: 'pattern_3',
    title: 'Trợ Từ Sở Hữu & Thuộc Tính 「の」',
    pattern: 'N1 の N2',
    explanation: 'Trợ từ の (no) nối 2 danh từ với nhau. N1 bổ nghĩa cho N2. Dùng để thể hiện sự sở hữu (N2 của N1), xuất xứ hoặc tổ chức thuộc về (N2 thuộc N1).',
    structureDiagram: '[Chủ sở hữu N1] + の (no) + [Vật sở hữu N2]',
    usageNotes: [
      'Dịch ngược từ phải sang trái: "N2 của N1".',
      'Ví dụ: わたしの ほん = Sách (N2) của Tôi (N1).'
    ],
    examples: [
      { japanese: 'これは わたしの 本です。', hiragana: 'これは わたしの ほんです。', romaji: 'kore wa watashi no hon desu.', meaning: 'Đây là quyển sách của tôi.', audioText: 'これは私の本です' },
      { japanese: 'たなかさんは にほんごの せんせいです。', hiragana: 'たなかさんは にほんごの せんせいです。', romaji: 'tanaka-san wa nihongo no sensei desu.', meaning: 'Thầy Tanaka là giáo viên tiếng Nhật.', audioText: '田中さんは日本語の先生です' },
    ]
  },
  {
    id: 'pattern_4',
    title: 'Từ Chỉ Định Chỉ Vật (Chỉ Định Từ)',
    pattern: 'これ / それ / あれ / どれ',
    explanation: 'Dùng để chỉ đồ vật dựa theo khoảng cách tới người nói và người nghe:',
    structureDiagram: 'これ (Gần người nói) | それ (Gần người nghe) | あれ (Xa cả hai) | どれ (Cái nào - câu hỏi)',
    usageNotes: [
      'これ (kore): Vật ở gần người nói.',
      'それ (sore): Vật ở gần người nghe.',
      'あれ (are): Vật ở xa cả người nói lẫn người nghe.',
      'この / その / あの + Danh từ: khi đi liền trước danh từ (ví dụ: この本 = Quyển sách này).'
    ],
    examples: [
      { japanese: 'これは なんですか。', hiragana: 'これは なんですか。', romaji: 'kore wa nan desu ka.', meaning: 'Cái này là cái gì?', audioText: 'これは何ですか' },
      { japanese: 'それは ペンです。', hiragana: 'それは ペンです。', romaji: 'sore wa pen desu.', meaning: 'Cái đó là cây bút.', audioText: 'それはペンです' },
      { japanese: 'この かばんは わたしのです。', hiragana: 'この かばんは わたしのです。', romaji: 'kono kaban wa watashi no desu.', meaning: 'Chiếc cặp này là của tôi.', audioText: 'この鞄は私のです' },
    ]
  },
];

// ══════════════════════════════════════════════════════
// 2. ĐỀ THI TỐT NGHIỆP NHẬP MÔN (20 CÂU TỔNG HỢP 5 CHƯƠNG)
// ══════════════════════════════════════════════════════

export const GRAMMAR_GRADUATION_QUIZ: GraduationQuizQuestion[] = [
  // Chương 1
  {
    id: 1,
    chapterSource: 'Chương 1 (Kana)',
    question: 'Ký tự Hiragana "あ" phát âm romaji tương ứng là gì?',
    audioText: 'あ',
    options: ['i', 'a', 'u', 'o'],
    correctIndex: 1,
    explanation: 'Ký tự Hiragana あ phát âm là a.',
    targetTab: 'patterns',
  },
  {
    id: 2,
    chapterSource: 'Chương 1 (Kana)',
    question: 'Katakana của chữ "Ka" được viết như thế nào?',
    audioText: 'カ',
    options: ['カ', 'キ', 'ク', 'ケ'],
    correctIndex: 0,
    explanation: 'Katakana của Ka là カ.',
    targetTab: 'patterns',
  },

  // Chương 2
  {
    id: 3,
    chapterSource: 'Chương 2 (Số & Thời gian)',
    question: 'Số 4時 (4 giờ) đọc chuẩn là gì?',
    audioText: '四時',
    options: ['よんじ (yonji)', 'よじ (yoji)', 'しじ (shiji)', 'よんとき (yontoki)'],
    correctIndex: 1,
    explanation: '4時 là trường hợp biến âm bắt buộc đọc là よじ (yoji).',
    targetTab: 'tenses',
  },
  {
    id: 4,
    chapterSource: 'Chương 2 (Số & Thời gian)',
    question: 'Đếm 3 con mèo (động vật nhỏ), bạn dùng cụm từ biến âm nào?',
    audioText: '三匹',
    options: ['さんひき (sanhiki)', 'さんびき (sanbiki)', 'さんぴき (sanpiki)', 'みっつ (mittsu)'],
    correctIndex: 1,
    explanation: 'Đơn vị 匹 (hiki) đi sau số 3 (さん) biến âm thành さんびき (sanbiki).',
    targetTab: 'tenses',
  },

  // Chương 3
  {
    id: 5,
    chapterSource: 'Chương 3 (Aisatsu)',
    question: 'Trước khi chắp tay ăn cơm, người Nhật nói câu gì?',
    audioText: 'いただきます',
    options: ['ごちそうさまでした (gochisousama)', 'いただきます (itadakimasu)', 'すみません (sumimasen)', 'ただいま (tadaima)'],
    correctIndex: 1,
    explanation: 'Trước khi ăn cơm, người Nhật luôn nói いただきます (itadakimasu).',
    targetTab: 'patterns',
  },
  {
    id: 6,
    chapterSource: 'Chương 3 (Aisatsu)',
    question: 'Nam giới nói chuyện thân mật với bạn bè có thể xưng là gì?',
    options: ['私 (watakushi)', '俺 (ore)', 'あなた (anata)', '彼女 (kanojo)'],
    correctIndex: 1,
    explanation: 'Nam giới dùng 俺 (ore) khi nói chuyện suồng sã/thân mật với bạn bè.',
    targetTab: 'patterns',
  },

  // Chương 4
  {
    id: 7,
    chapterSource: 'Chương 4 (Bộ thủ)',
    question: 'Chữ "休" (Nghỉ ngơi) được ghép từ 2 bộ thủ tượng hình nào?',
    audioText: '休',
    options: ['日 (Mặt trời) + 月 (Mặt trăng)', '人 (Người) + 木 (Gốc cây)', '女 (Phụ nữ) + 子 (Đứa con)', '山 (Núi) + 石 (Đá)'],
    correctIndex: 1,
    explanation: 'Chữ 休 ghép từ 人 (Người) đứng tựa vào 木 (Gốc cây) để Nghỉ ngơi.',
    targetTab: 'patterns',
  },
  {
    id: 8,
    chapterSource: 'Chương 4 (Bộ thủ)',
    question: 'Bộ Thủy (水) khi làm bộ bên trái chữ Hán biến thành dạng nào?',
    audioText: '水',
    options: ['Bộ Ba chấm thủy (氵)', 'Bộ Nhân đứng (亻)', 'Bộ Bốn đốm lửa (灬)', 'Bộ Nhục (⺜)'],
    correctIndex: 0,
    explanation: 'Bộ Thủy biến đổi thành Bộ Ba chấm thủy (氵) như trong 海 (biển).',
    targetTab: 'patterns',
  },

  // Chương 5
  {
    id: 9,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Điền trợ từ thích hợp: "わたし ____ がくせいです" (Tôi là học sinh).',
    audioText: '私は学生です',
    options: ['が (ga)', 'は (wa)', 'の (no)', 'に (ni)'],
    correctIndex: 1,
    explanation: 'Trợ từ は (đọc là wa) đánh dấu chủ đề của câu.',
    targetTab: 'patterns',
  },
  {
    id: 10,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Phủ định lịch sự của "がくせいです" (Tôi là học sinh) là gì?',
    audioText: '学生ではありません',
    options: [
      'がくせい でした (gakusei deshita)',
      'がくせい ではありません (gakusei dewa arimasen)',
      'がくせい ですか (gakusei desu ka)',
      'がくせい のです (gakusei no desu)'
    ],
    correctIndex: 1,
    explanation: 'Phủ định của です là ではありません (dewa arimasen).',
    targetTab: 'tenses',
  },
  {
    id: 11,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Để nói "Sách của tôi", bạn dùng trợ từ nào nối 2 danh từ?',
    audioText: '私の本',
    options: ['は (wa)', 'の (no)', 'も (mo)', 'と (to)'],
    correctIndex: 1,
    explanation: 'Trợ từ の nối 2 danh từ thể hiện sự sở hữu: わたしの 本 (Sách của tôi).',
    targetTab: 'patterns',
  },
  {
    id: 12,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Khi chỉ đồ vật ở gần người nghe, bạn dùng chỉ định từ nào?',
    audioText: 'それ',
    options: ['これ (kore)', 'それ (sore)', 'あれ (are)', 'どれ (dore)'],
    correctIndex: 1,
    explanation: 'これ (gần người nói), それ (gần người nghe), あれ (xa cả hai).',
    targetTab: 'patterns',
  },
];
