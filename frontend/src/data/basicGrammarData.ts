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
  // Chương 1 (Kana)
  {
    id: 1,
    chapterSource: 'Chương 1 (Kana)',
    question: 'Ký tự Hiragana "あ" có phát âm romaji tương ứng là gì?',
    audioText: 'あ',
    options: ['a', 'i', 'u', 'o'],
    correctIndex: 0,
    explanation: 'Ký tự Hiragana あ phát âm chuẩn là âm /a/.',
    targetTab: 'patterns',
  },
  {
    id: 2,
    chapterSource: 'Chương 1 (Kana)',
    question: 'Katakana của chữ "Ka" được viết như thế nào?',
    audioText: 'カ',
    options: ['カ', 'キ', 'ク', 'ケ'],
    correctIndex: 0,
    explanation: 'Katakana của Ka là カ (lấy từ bộ Lực 力 trong Hán tự).',
    targetTab: 'patterns',
  },

  // Chương 2 (Số & Thời gian)
  {
    id: 3,
    chapterSource: 'Chương 2 (Số & Thời gian)',
    question: 'Số 4時 (4 giờ) trong tiếng Nhật đọc chuẩn xác là gì?',
    audioText: '四時',
    options: ['よんじ (yonji)', 'しじ (shiji)', 'よじ (yoji)', 'よんとき (yontoki)'],
    correctIndex: 2,
    explanation: '4時 là trường hợp biến âm bất quy tắc bắt buộc đọc là よじ (yoji).',
    targetTab: 'tenses',
  },
  {
    id: 4,
    chapterSource: 'Chương 2 (Số & Thời gian)',
    question: 'Để đếm 3 con mèo (động vật nhỏ), bạn dùng cụm từ biến âm nào?',
    audioText: '三匹',
    options: ['さんひき (sanhiki)', 'さんびき (sanbiki)', 'さんぴき (sanpiki)', 'みっつ (mittsu)'],
    correctIndex: 1,
    explanation: 'Đơn vị 匹 (hiki) đi sau số 3 (さん) biến âm thành さんびき (sanbiki).',
    targetTab: 'tenses',
  },

  // Chương 3 (Chào hỏi & Xưng hô)
  {
    id: 5,
    chapterSource: 'Chương 3 (Aisatsu)',
    question: 'Trước khi chắp tay bắt đầu dùng bữa ăn cơm, người Nhật nói câu gì?',
    audioText: 'いただきます',
    options: ['ごちそうさまでした (gochisousama)', 'ただいま (tadaima)', 'すみません (sumimasen)', 'いただきます (itadakimasu)'],
    correctIndex: 3,
    explanation: 'Trước khi ăn cơm, người Nhật luôn chắp tay nói いただきます (itadakimasu).',
    targetTab: 'patterns',
  },
  {
    id: 6,
    chapterSource: 'Chương 3 (Aisatsu)',
    question: 'Nam giới nói chuyện thân mật, suồng sã với bạn bè thân có thể xưng hô bằng đại từ nào?',
    audioText: '俺',
    options: ['私 (watakushi)', 'あなた (anata)', '俺 (ore)', '彼女 (kanojo)'],
    correctIndex: 2,
    explanation: 'Nam giới dùng 俺 (ore) khi nói chuyện suồng sã, thân thiết giữa bạn bè.',
    targetTab: 'patterns',
  },

  // Chương 4 (Bộ thủ Kanji)
  {
    id: 7,
    chapterSource: 'Chương 4 (Bộ thủ)',
    question: 'Chữ "休" (Nghỉ ngơi) được ghép từ 2 bộ thủ tượng hình nào?',
    audioText: '休',
    options: ['日 (Mặt trời) + 月 (Mặt trăng)', '人 (Con người) + 木 (Gốc cây)', '女 (Phụ nữ) + 子 (Đứa con)', '山 (Núi) + 石 (Đá)'],
    correctIndex: 1,
    explanation: 'Chữ 休 ghép từ 人 (Người) đứng tựa vào 木 (Gốc cây) dưới bóng râm để Nghỉ ngơi.',
    targetTab: 'patterns',
  },
  {
    id: 8,
    chapterSource: 'Chương 4 (Bộ thủ)',
    question: 'Bộ Thủy (水 - Nước) khi làm bộ bên trái chữ Hán biến đổi thành dạng nào?',
    audioText: '水',
    options: ['Bộ Ba chấm thủy (氵)', 'Bộ Nhân đứng (亻)', 'Bộ Bốn đốm lửa (灬)', 'Bộ Nhục (⺜)'],
    correctIndex: 0,
    explanation: 'Bộ Thủy biến đổi thành Bộ Ba chấm thủy (氵) như trong 海 (biển), 泳 (bơi lội).',
    targetTab: 'patterns',
  },

  // Chương 5 (Cấu trúc câu & Ngữ pháp)
  {
    id: 9,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Điền trợ từ thích hợp vào chỗ trống: "わたし ____ がくせいです" (Tôi là học sinh).',
    audioText: '私は学生です',
    options: ['が (ga)', 'の (no)', 'に (ni)', 'は (wa)'],
    correctIndex: 3,
    explanation: 'Trợ từ は (viết là ha nhưng phát âm là wa) đóng vai trò đánh dấu chủ đề câu.',
    targetTab: 'patterns',
  },
  {
    id: 10,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Dạng phủ định lịch sự của "がくせいです" (Tôi là học sinh) trong tiếng Nhật là gì?',
    audioText: '学生ではありません',
    options: [
      'がくせい でした (gakusei deshita)',
      'がくせい ではありません (gakusei dewa arimasen)',
      'がくせい ですか (gakusei desu ka)',
      'がくせい のです (gakusei no desu)'
    ],
    correctIndex: 1,
    explanation: 'Phủ định hiện tại của danh từ + です là [Danh từ] + ではありません (dewa arimasen).',
    targetTab: 'tenses',
  },
  {
    id: 11,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Để diễn đạt cụm từ sở hữu "Sách của tôi" (わたしの ほん), bạn dùng trợ từ nào liên kết 2 danh từ?',
    audioText: '私の本',
    options: ['は (wa)', 'も (mo)', 'の (no)', 'と (to)'],
    correctIndex: 2,
    explanation: 'Trợ từ の nối Danh từ 1 với Danh từ 2 để biểu thị quan hệ sở hữu hoặc thuộc tính (N1 の N2).',
    targetTab: 'patterns',
  },
  {
    id: 12,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Khi muốn chỉ một đồ vật ở vị trí gần người nghe (đối phương), bạn dùng chỉ định từ nào?',
    audioText: 'それ',
    options: ['これ (kore)', 'あれ (are)', 'どれ (dore)', 'それ (sore)'],
    correctIndex: 3,
    explanation: 'Quy tắc Ko-So-A-Do: これ (gần người nói), それ (gần người nghe), あれ (xa cả hai bên).',
    targetTab: 'patterns',
  },
  {
    id: 13,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Trợ từ "も" (mo) mang ý nghĩa ngữ pháp gì trong câu?',
    audioText: '私も学生です',
    options: [
      'Đánh dấu tân ngữ bị tác động trực tiếp',
      'Mang nghĩa "Cũng", dùng thay thế cho trợ từ は khi cùng chung đặc tính với đối tượng đã nhắc trước đó',
      'Đánh dấu phương hướng và thời gian cụ thể',
      'Dùng để kết thúc câu hỏi nghi vấn'
    ],
    correctIndex: 1,
    explanation: 'Trợ từ も nghĩa là "Cũng". Ví dụ: 田中さんも 学生です (Anh Tanaka cũng là học sinh).',
    targetTab: 'patterns',
  },
  {
    id: 14,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Để biến một câu trần thuật lịch sự sang câu hỏi nghi vấn (Ví dụ: "Bạn là học sinh phải không?"), bạn thêm gì vào cuối câu?',
    audioText: '学生ですか',
    options: ['Thêm trợ từ か (ka) vào cuối câu', 'Thêm trợ từ ね (ne)', 'Thêm trợ từ よ (yo)', 'Đảo ngược vị trí chủ ngữ và vị ngữ'],
    correctIndex: 0,
    explanation: 'Trong tiếng Nhật, chỉ cần thêm trợ từ か vào cuối câu lịch sự (〜ですか) là thành câu hỏi nghi vấn, không cần đảo trật tự từ.',
    targetTab: 'patterns',
  },
  {
    id: 15,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Quá khứ khẳng định của です trong câu danh từ là gì? (Ví dụ: "Hôm qua là Chủ nhật").',
    audioText: '日曜日でした',
    options: ['であります (de arimasu)', 'ではありません (dewa arimasen)', 'でした (deshita)', 'でしたか (deshita ka)'],
    correctIndex: 2,
    explanation: 'Quá khứ khẳng định của です là でした (deshita). Ví dụ: きのうは 日曜日でした (Hôm qua là chủ nhật).',
    targetTab: 'tenses',
  },
  {
    id: 16,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Dạng quá khứ phủ định lịch sự của [Danh từ + です] là gì? (Ví dụ: "Hôm qua không phải là ngày nghỉ").',
    audioText: '休みではありませんでした',
    options: [
      'ではありません (dewa arimasen)',
      'でした (deshita)',
      'くないでした (kunaideshita)',
      'ではありませんでした (dewa arimasen deshita)'
    ],
    correctIndex: 3,
    explanation: 'Quá khứ phủ định của です là ではありませんでした (dewa arimasen deshita).',
    targetTab: 'tenses',
  },
  {
    id: 17,
    chapterSource: 'Chương 5 (Ngữ pháp)',
    question: 'Phân biệt chính xác bộ từ chỉ nơi chốn "ここ (koko) - そこ (soko) - あそこ (asoko) - どこ (doko)":',
    audioText: 'ここ',
    options: [
      'ここ (chỗ này/gần người nói) - そこ (chỗ đó/gần người nghe) - あそこ (chỗ đằng kia/xa cả hai) - どこ (ở đâu/hỏi)',
      'ここ (chỗ xa) - そこ (chỗ gần) - あそこ (chỗ hỏi) - どこ (chỗ này)',
      'Cả 4 từ đều dùng để chỉ thời gian trong ngày',
      'Đây là 4 đại từ xưng hô tôn kính dành cho khách hàng'
    ],
    correctIndex: 0,
    explanation: 'Hệ thống chỉ vị trí: ここ (gần tôi), そこ (gần bạn), あそこ (xa cả hai), どこ (ở đâu).',
    targetTab: 'patterns',
  },
  {
    id: 18,
    chapterSource: 'Chương 1 (Kana)',
    question: 'Âm ngắt (Sokuon) trong tiếng Nhật biểu thị sự ngưng đọng ngắt 1 nhịp, được viết bằng chữ gì thu nhỏ lại?',
    audioText: 'ちょっと',
    options: ['Chữ "い" viết nhỏ', 'Chữ "ん" viết nhỏ', 'Chữ "っ" (tsu nhỏ) trong Hiragana hoặc "ッ" trong Katakana', 'Chữ "よ" viết nhỏ'],
    correctIndex: 2,
    explanation: 'Âm ngắt được biểu thị bằng chữ っ (tsu nhỏ), nhân đôi phụ âm đi sau và dừng hơi 1 nhịp khi phát âm.',
    targetTab: 'patterns',
  },
  {
    id: 19,
    chapterSource: 'Chương 2 (Số & Thời gian)',
    question: 'Để hỏi tuổi của người lớn tuổi, cấp trên hoặc đối tác một cách trang trọng, lịch sự nhất, bạn dùng câu hỏi nào?',
    audioText: 'おいくつですか',
    options: ['なんさいですか (nansai desu ka?)', 'おいくつですか (oikutsu desu ka?)', 'だれですか (dare desu ka?)', 'いくらですか (ikura desu ka?)'],
    correctIndex: 1,
    explanation: 'なんさいですか dùng cho người bằng hoặc nhỏ tuổi hơn. Với người lớn tuổi hơn và đối tác khách hàng, bắt buộc dùng おいくつですか.',
    targetTab: 'tenses',
  },
  {
    id: 20,
    chapterSource: 'Chương 3 (Aisatsu)',
    question: 'Khi lần đầu tiên gặp gỡ một ai đó và chuẩn bị tự giới thiệu bản thân mình, câu chào mở đầu kinh điển là gì?',
    audioText: 'はじめまして',
    options: ['こんにちは (konnichiwa)', 'さようなら (sayounara)', 'おやすみなさい (oyasuminasai)', 'はじめまして (hajimemashite)'],
    correctIndex: 3,
    explanation: 'はじめまして (Hajimemashite) nghĩa là "Rất hân hạnh được gặp bạn lần đầu", bắt nguồn từ 初めて (lần đầu tiên).',
    targetTab: 'patterns',
  },
];
