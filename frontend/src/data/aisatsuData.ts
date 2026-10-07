/**
 * aisatsuData.ts — Dữ liệu tĩnh Chào Hỏi (Aisatsu), Đại Từ Xưng Hô & Hậu Tố Kính Ngữ
 */

export interface GreetingItem {
  id: string;
  japanese: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  context: string;
  formality: 'Formal' | 'Casual' | 'Neutral';
  category: 'daily' | 'farewell' | 'gratitude' | 'meal' | 'home';
}

export interface PronounItem {
  japanese: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  usedBy: string;
  formality: string;
  note: string;
}

export interface HonorificItem {
  suffix: string;
  reading: string;
  meaning: string;
  usedFor: string;
  example: string;
  exampleMeaning: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTab: 'greetings' | 'pronouns' | 'honorifics'; // Tab để review khi sai
}

// ══════════════════════════════════════════════════════
// 1. MẪU CÂU CHÀO HỎI (AISATSU)
// ══════════════════════════════════════════════════════

export const GREETINGS: GreetingItem[] = [
  // Hàng ngày
  { id: 'morn_f', japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: 'Chào buổi sáng (Lịch sự)', context: 'Dùng với cấp trên, thầy cô, người lớn tuổi hoặc đồng nghiệp vào buổi sáng.', formality: 'Formal', category: 'daily' },
  { id: 'morn_c', japanese: 'おはよう', hiragana: 'おはよう', romaji: 'ohayou', meaning: 'Chào buổi sáng (Thân mật)', context: 'Dùng với bạn bè, người thân, đồng nghiệp thân thiết.', formality: 'Casual', category: 'daily' },
  { id: 'noon', japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'konnichiwa', meaning: 'Xin chào (Buổi trưa/chiều)', context: 'Chào chung từ khoảng 10h sáng đến khi trời tối.', formality: 'Neutral', category: 'daily' },
  { id: 'night', japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'konbanwa', meaning: 'Chào buổi tối', context: 'Chào khi gặp nhau vào buổi tối (sau khi trời tối).', formality: 'Formal', category: 'daily' },
  { id: 'sleep_f', japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'oyasuminasai', meaning: 'Chúc ngủ ngon (Lịch sự)', context: 'Nói trước khi đi ngủ với người lớn hoặc trong nhà.', formality: 'Formal', category: 'daily' },
  { id: 'sleep_c', japanese: 'おやすみ', hiragana: 'おやすみ', romaji: 'oyasumi', meaning: 'Chúc ngủ ngon (Thân mật)', context: 'Nói với bạn bè, trẻ em trước khi đi ngủ.', formality: 'Casual', category: 'daily' },

  // Tạm biệt & Gặp lại
  { id: 'bye_f', japanese: 'さようなら', hiragana: 'さようなら', romaji: 'sayounara', meaning: 'Tạm biệt (Trang trọng/Lâu ngày mới gặp lại)', context: 'Ít dùng hàng ngày, dùng khi tạm biệt thời gian dài.', formality: 'Formal', category: 'farewell' },
  { id: 'bye_c', japanese: 'じゃあ、また', hiragana: 'じゃあ、また', romaji: 'jaa, mata', meaning: 'Hẹn gặp lại nhé', context: 'Dùng rất phổ biến giữa bạn bè khi chia tay nhau.', formality: 'Casual', category: 'farewell' },
  { id: 'work_bye', japanese: 'おつかれさまでした', hiragana: 'おつかれさまでした', romaji: 'otsukaresama deshita', meaning: 'Anh/chị đã vất vả rồi (Chào ra về ở công ty)', context: 'Nói với đồng nghiệp khi kết thúc ca làm việc hoặc ra về.', formality: 'Formal', category: 'farewell' },

  // Cảm ơn & Xin lỗi
  { id: 'thanks_f', japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: 'Xin cảm ơn rất nhiều', context: 'Cảm ơn lịch sự với người khác.', formality: 'Formal', category: 'gratitude' },
  { id: 'thanks_c', japanese: 'ありがとう', hiragana: 'ありがとう', romaji: 'arigatou', meaning: 'Cảm ơn nhé', context: 'Cảm ơn thân mật với bạn bè.', formality: 'Casual', category: 'gratitude' },
  { id: 'sorry_f', japanese: 'すみません', hiragana: 'すみません', romaji: 'sumimasen', meaning: 'Xin lỗi / Xin phép / Cảm ơn nhẹ', context: 'Dùng để xin lỗi nhẹ, gọi phục vụ bàn, hoặc cảm ơn ai đó đã cất công giúp.', formality: 'Formal', category: 'gratitude' },
  { id: 'sorry_c', japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'gomen nasai', meaning: 'Xin lỗi (Thành thật)', context: 'Dùng xin lỗi người thân, bạn bè khi mắc lỗi.', formality: 'Neutral', category: 'gratitude' },

  // Bữa ăn
  { id: 'eat_before', japanese: 'いただきます', hiragana: 'いただきます', romaji: 'itadakimasu', meaning: 'Tôi xin phép dùng bữa', context: 'Nói trước khi bắt đầu ăn cơm (chắp hai tay).', formality: 'Neutral', category: 'meal' },
  { id: 'eat_after', japanese: 'ごちそうさまでした', hiragana: 'ごちそうさまでした', romaji: 'gochisousama deshita', meaning: 'Cảm ơn vì bữa ăn ngon', context: 'Nói sau khi ăn xong để thể hiện lòng biết ơn.', formality: 'Formal', category: 'meal' },

  // Đi & Về nhà
  { id: 'leave', japanese: 'いってきます', hiragana: 'いってきます', romaji: 'ittekimasu', meaning: 'Tôi đi đây / Cháu đi học đây', context: 'Người rời khỏi nhà nói với người ở lại.', formality: 'Neutral', category: 'home' },
  { id: 'stay', japanese: 'いってらっしゃい', hiragana: 'いってらっしゃい', romaji: 'itterasshai', meaning: 'Đi nhé / Đi cẩn thận nhé', context: 'Người ở lại nhà nói với người sắp đi ra ngoài.', formality: 'Neutral', category: 'home' },
  { id: 'return', japanese: 'ただいま', hiragana: 'ただいま', romaji: 'tadaima', meaning: 'Tôi đã về rồi đây', context: 'Người vừa về đến nhà nói khi bước vào cửa.', formality: 'Neutral', category: 'home' },
  { id: 'welcome_home', japanese: 'おかえりなさい', hiragana: 'おかえりなさい', romaji: 'okaerinasai', meaning: 'Mừng anh/chị đã về nhà', context: 'Người ở nhà đáp lại khi nghe người khác nói ただいま.', formality: 'Neutral', category: 'home' },
];

// ══════════════════════════════════════════════════════
// 2. ĐẠI TỪ XƯNG HÔ (PRONOUNS)
// ══════════════════════════════════════════════════════

export const PRONOUNS: PronounItem[] = [
  { japanese: '私', hiragana: 'わたし', romaji: 'watashi', meaning: 'Tôi (Trung tính)', usedBy: 'Cả Nam & Nữ', formality: 'Lịch sự / Trung tính', note: 'Đại từ an toàn nhất, dùng trong giao tiếp hằng ngày và công việc.' },
  { japanese: '私', hiragana: 'わたくし', romaji: 'watakushi', meaning: 'Tôi (Rất trang trọng)', usedBy: 'Cả Nam & Nữ', formality: 'Rất trang trọng', note: 'Dùng trong bài phát biểu, phỏng vấn, gặp đối tác kinh doanh.' },
  { japanese: '僕', hiragana: 'ぼく', romaji: 'boku', meaning: 'Tôi / Tớ (Nam giới)', usedBy: 'Nam giới (Trẻ em & Thanh niên)', formality: 'Thân mật / Khiêm tốn', note: 'Tạo cảm giác nhẹ nhàng, lịch sự khi nói chuyện với bạn bè, đồng nghiệp.' },
  { japanese: '俺', hiragana: 'おれ', romaji: 'ore', meaning: 'Tôi / Tớ / Tao (Nam giới)', usedBy: 'Nam giới', formality: 'Suồng sã / Thân thiết', note: 'KHÔNG dùng với người lớn hoặc trong công việc. Chỉ dùng với bạn thân.' },
  { japanese: 'あなた', hiragana: 'あなた', romaji: 'anata', meaning: 'Bạn / Anh / Chị', usedBy: 'Cả Nam & Nữ', formality: 'Trung tính', note: 'Hạn chế dùng trực tiếp với người đối diện; người Nhật thường gọi thẳng [Tên + さん].' },
  { japanese: '彼', hiragana: 'かれ', romaji: 'kare', meaning: 'Anh ấy / Bạn trai', usedBy: 'Cả Nam & Nữ', formality: 'Trung tính', note: 'Chỉ ngôi thứ 3 số ít nam.' },
  { japanese: '彼女', hiragana: 'かのじょ', romaji: 'kanojo', meaning: 'Cô ấy / Bạn gái', usedBy: 'Cả Nam & Nữ', formality: 'Trung tính', note: 'Chỉ ngôi thứ 3 số ít nữ.' },
];

// ══════════════════════════════════════════════════════
// 3. HẬU TỐ KÍNH NGỮ (HONORIFIC SUFFIXES)
// ══════════════════════════════════════════════════════

export const HONORIFIC_SUFFIXES: HonorificItem[] = [
  { suffix: '〜さん', reading: '-san', meaning: 'Ông / Bà / Anh / Chị', usedFor: 'Mọi người (Lịch sự phổ biến nhất)', example: '田中さん (Tanaka-san)', exampleMeaning: 'Anh/Chị Tanaka' },
  { suffix: '〜様', reading: '-sama', meaning: 'Quý ông / Quý bà / Ngài', usedFor: 'Khách hàng, Thần thần, Người có vị thế cao', example: 'お客様 (Okyaku-sama)', exampleMeaning: 'Quý khách hàng' },
  { suffix: '〜君', reading: '-kun', meaning: 'Cậu / Bạn (Nam giới)', usedFor: 'Bạn nam cùng tuổi, nam cấp dưới, trẻ em nam', example: '太郎くん (Tarou-kun)', exampleMeaning: 'Cậu bé Tarou' },
  { suffix: '〜ちゃん', reading: '-chan', meaning: 'Bé / Em / Cụ (Thân mật, đáng yêu)', usedFor: 'Trẻ em, bạn nữ thân thiết, bé cún/mèo', example: '花子ちゃん (Hanako-chan)', exampleMeaning: 'Bé Hanako' },
  { suffix: '〜先生', reading: '-sensei', meaning: 'Thầy / Cô / Bác sĩ / Tác giả', usedFor: 'Giáo viên, Bác sĩ, Luật sư, Họa sĩ Manga', example: '山田先生 (Yamada-sensei)', exampleMeaning: 'Thầy/Cô Yamada' },
];

// ══════════════════════════════════════════════════════
// 4. QUIZ CHƯƠNG 3
// ══════════════════════════════════════════════════════

export const AISATSU_CHAPTER_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Khi vừa đi học hoặc đi làm về bước vào cửa nhà, bạn nói câu gì?',
    audioText: 'ただいま',
    options: ['いってきます (ittekimasu)', 'ただいま (tadaima)', 'おかえりなさい (okaerinasai)', 'いってらっしゃい (itterasshai)'],
    correctIndex: 1,
    explanation: 'Khi về đến nhà, người bước vào cửa nói "ただいま" (Tadaima = Tôi đã về rồi).',
    targetTab: 'greetings',
  },
  {
    id: 2,
    question: 'Trước khi chắp tay bắt đầu dùng bữa ăn cơm, người Nhật nói câu gì?',
    audioText: 'いただきます',
    options: ['いただきます (itadakimasu)', 'ごちそうさまでした (gochisousama)', 'すみません (sumimasen)', 'いってきます (ittekimasu)'],
    correctIndex: 0,
    explanation: 'Trước khi ăn cơm, người Nhật nói "いただきます" (Itadakimasu) để tỏ lòng biết ơn sự sống của nguyên liệu và người làm ra món ăn.',
    targetTab: 'greetings',
  },
  {
    id: 3,
    question: 'Đại từ xưng hô "僕" (boku) được sử dụng phù hợp nhất trong hoàn cảnh nào?',
    audioText: '僕',
    options: ['Dùng cho nữ giới khi họp công ty lớn', 'Dùng cho người lớn tuổi gọi cấp dưới', 'Dùng cho nam giới khi nói chuyện thân mật, lịch thiệp hoặc khiêm tốn', 'Dùng cho bất kỳ ai trong phỏng vấn tuyển dụng cấp cao'],
    correctIndex: 2,
    explanation: '僕 (boku) là đại từ xưng hô nhẹ nhàng, thân mật và khiêm tốn dành cho phái nam.',
    targetTab: 'pronouns',
  },
  {
    id: 4,
    question: 'Hậu tố kính ngữ nào dùng trang trọng nhất để tôn xưng khách hàng hoặc đối tác lớn?',
    audioText: 'お客様',
    options: ['〜さん (-san)', '〜ちゃん (-chan)', '〜様 (-sama)', '〜君 (-kun)'],
    correctIndex: 2,
    explanation: '〜様 (-sama) là hậu tố kính ngữ trang trọng nhất, điển hình như お客様 (Quý khách).',
    targetTab: 'honorifics',
  },
  {
    id: 5,
    question: 'Khi vô tình va chạm nhẹ vào ai đó trên tàu điện hoặc muốn gọi nhân viên phục vụ quán ăn, bạn nói câu gì?',
    audioText: 'すみません',
    options: ['ごちそうさまでした (gochisousama)', 'すみません (sumimasen)', 'おはよう (ohayou)', 'いただきます (itadakimasu)'],
    correctIndex: 1,
    explanation: 'すみません (sumimasen) vừa dùng để xin lỗi nhẹ, vừa dùng để gọi gây sự chú ý hoặc cảm ơn sự giúp đỡ nhỏ.',
    targetTab: 'greetings',
  },
  {
    id: 6,
    question: 'Khi kết thúc ca làm việc ra về ở công ty hoặc khi đồng nghiệp hoàn thành nhiệm vụ vất vả, bạn nói câu gì?',
    audioText: 'おつかれさまでした',
    options: ['おつかれさまでした (otsukaresama deshita)', 'ごめんなさい (gomen nasai)', 'いってらっしゃい (itterasshai)', 'さようなら (sayounara)'],
    correctIndex: 0,
    explanation: 'おつかれさまでした là câu chào văn hóa công sở Nhật Bản biểu thị sự ghi nhận nỗ lực làm việc vất vả của đối phương.',
    targetTab: 'greetings',
  },
  {
    id: 7,
    question: 'Hậu tố tôn kính "〜先生" (-sensei) được dùng cho những đối tượng nghề nghiệp nào?',
    audioText: '山田先生',
    options: ['Trẻ em dưới 6 tuổi', 'Bạn bè thân thiết cùng lớp', 'Khách hàng mua sắm tại siêu thị', 'Giáo viên, Bác sĩ, Luật sư, Tác giả / Họa sĩ truyện tranh'],
    correctIndex: 3,
    explanation: '先生 (-sensei) dùng tôn xưng những người thầy cô giáo, bác sĩ chữa bệnh, luật sư và tác giả nghệ thuật.',
    targetTab: 'honorifics',
  },
  {
    id: 8,
    question: 'Nam giới nói chuyện với bạn bè thân thiết cùng trang lứa có thể dùng đại từ xưng hô suồng sã, nam tính nào?',
    audioText: '俺',
    options: ['私 (watakushi)', 'あなた (anata)', '彼女 (kanojo)', '俺 (ore)'],
    correctIndex: 3,
    explanation: '俺 (ore) là đại từ xưng hô nam tính, thân mật và suồng sã giữa bạn bè thân hoặc với người dưới.',
    targetTab: 'pronouns',
  },
  {
    id: 9,
    question: 'Chào buổi sáng một cách lịch sự, trang trọng khi đến công ty hoặc trường học gặp cấp trên/thầy cô:',
    audioText: 'おはようございます',
    options: ['おはようございます (ohayou gozaimasu)', 'こんにちは (konnichiwa)', 'こんばんは (konbanwa)', 'おやすみなさい (oyasuminasai)'],
    correctIndex: 0,
    explanation: 'おはようございます (Ohayou gozaimasu) là lời chào buổi sáng trang trọng chuẩn mực.',
    targetTab: 'greetings',
  },
  {
    id: 10,
    question: 'Lời chào phổ biến dùng vào ban ngày (từ khoảng 10 giờ sáng đến trước khi trời tối) khi gặp người khác là gì?',
    audioText: 'こんにちは',
    options: ['おはよう (ohayou)', 'こんばんは (konbanwa)', 'こんにちは (konnichiwa)', 'さようなら (sayounara)'],
    correctIndex: 2,
    explanation: 'こんにちは (Konnichiwa) là câu chào ban ngày, tương đương "Chào buổi trưa / Chào bạn". Chữ "wa" ở cuối được viết bằng chữ は (ha).',
    targetTab: 'greetings',
  },
  {
    id: 11,
    question: 'Khi gặp gỡ ai đó vào buổi tối sau khi trời đã tắt nắng, câu chào phù hợp nhất là gì?',
    audioText: 'こんばんは',
    options: ['こんにちは (konnichiwa)', 'こんばんは (konbanwa)', 'おやすみなさい (oyasuminasai)', 'いただきます (itadakimasu)'],
    correctIndex: 1,
    explanation: 'こんばんは (Konbanwa) là câu chào buổi tối. Tương tự như Konnichiwa, âm "wa" ở cuối được viết bằng は.',
    targetTab: 'greetings',
  },
  {
    id: 12,
    question: 'Trước khi đi ngủ, bạn chúc người khác ngủ ngon một cách lịch sự bằng câu gì?',
    audioText: 'おやすみなさい',
    options: ['さようなら (sayounara)', 'ただいま (tadaima)', 'おつかれさま (otsukaresama)', 'おやすみなさい (oyasuminasai)'],
    correctIndex: 3,
    explanation: 'おやすみなさい (Oyasuminasai) là câu chúc ngủ ngon lịch sự. Nói thân mật với người trong nhà có thể rút gọn thành おやすみ (Oyasumi).',
    targetTab: 'greetings',
  },
  {
    id: 13,
    question: 'Sau khi dùng xong bữa cơm ngon miệng, để cảm ơn người chuẩn bị món ăn và tri ân bữa ăn, bạn nói câu gì?',
    audioText: 'ごちそうさまでした',
    options: ['ごちそうさまでした (gochisousama deshita)', 'いただきます (itadakimasu)', 'どういたしまして (dou itashimashite)', 'すみません (sumimasen)'],
    correctIndex: 0,
    explanation: 'ごちそうさまでした (Gochisousama deshita) mang nghĩa "Cảm ơn vì bữa ăn thịnh soạn", nói sau khi ăn xong.',
    targetTab: 'greetings',
  },
  {
    id: 14,
    question: 'Khi bước ra khỏi nhà đi làm, đi học, người chuẩn bị rời đi sẽ chào người ở lại trong nhà bằng câu gì?',
    audioText: 'いってきます',
    options: ['ただいま (tadaima)', 'おかえりなさい (okaerinasai)', 'いってきます (ittekimasu)', 'じゃあ、また (jaa, mata)'],
    correctIndex: 2,
    explanation: 'いってきます (Ittekimasu) nghĩa là "Tôi đi rồi sẽ về nhé", do người rời khỏi nhà nói.',
    targetTab: 'greetings',
  },
  {
    id: 15,
    question: 'Khi có người trong nhà nói "いってきます" bước ra cửa, người ở nhà sẽ đáp lại bằng câu chúc gì?',
    audioText: 'いってらっしゃい',
    options: ['おかえりなさい (okaerinasai)', 'ごめんなさい (gomen nasai)', 'ただいま (tadaima)', 'いってらっしゃい (itterasshai)'],
    correctIndex: 3,
    explanation: 'いってらっしゃい (Itterasshai) nghĩa là "Bạn đi rồi về bình an nhé!", do người ở nhà nói với người ra đi.',
    targetTab: 'greetings',
  },
  {
    id: 16,
    question: 'Khi người thân đi làm/học về và nói "ただいま" (Tadaima), người ở trong nhà sẽ đáp lại mừng họ về bằng câu gì?',
    audioText: 'おかえりなさい',
    options: ['いってらっしゃい (itterasshai)', 'おかえりなさい (okaerinasai)', 'おつかれさま (otsukaresama)', 'さようなら (sayounara)'],
    correctIndex: 1,
    explanation: 'おかえりなさい (Okaerinasai) nghĩa là "Mừng bạn đã về nhà!", dùng để đón người bước vào cửa.',
    targetTab: 'greetings',
  },
  {
    id: 17,
    question: 'Khi người khác cảm ơn bạn "ありがとうございます", câu đáp lại lịch sự "Không có chi / Không dám đâu" là gì?',
    audioText: 'どういたしまして',
    options: ['どういたしまして (dou itashimashite)', 'ごちそうさまでした (gochisousama deshita)', 'おやすみなさい (oyasuminasai)', 'いただきます (itadakimasu)'],
    correctIndex: 0,
    explanation: 'どういたしまして (Dou itashimashite) có nghĩa là "Không có chi / You are welcome".',
    targetTab: 'greetings',
  },
  {
    id: 18,
    question: 'Đại từ nhân xưng ngôi thứ nhất nào mang tính trang trọng tột bậc, dùng trong phỏng vấn tuyển dụng, tiếp khách và bài phát biểu kinh doanh?',
    audioText: '私',
    options: ['俺 (ore)', '僕 (boku)', '私 (わたくし - watakushi)', 'あたし (atashi)'],
    correctIndex: 2,
    explanation: '私 phát âm là "わたくし" (watakushi) là mức độ khiêm tốn, trang trọng cao nhất, phổ biến trong văn hóa doanh nghiệp Nhật Bản.',
    targetTab: 'pronouns',
  },
  {
    id: 19,
    question: 'Hậu tố xưng hô thân mật, ngọt ngào nào thường dùng cho trẻ em, bé gái hoặc thú cưng trong gia đình?',
    audioText: '花子ちゃん',
    options: ['〜様 (-sama)', '〜君 (-kun)', '〜先生 (-sensei)', '〜ちゃん (-chan)'],
    correctIndex: 3,
    explanation: '〜ちゃん (-chan) là hậu tố biểu thị sự dễ thương, trìu mến dành cho trẻ nhỏ, bé gái hoặc bạn bè cực thân.',
    targetTab: 'honorifics',
  },
  {
    id: 20,
    question: 'Khi bước vào phòng làm việc của cấp trên hoặc xin phép ra về trước đồng nghiệp tại công ty, bạn nên nói câu lịch sự nào?',
    audioText: '失礼します',
    options: ['さようなら (sayounara)', '失礼します (shitsurei shimasu)', 'じゃあね (jaa ne)', 'バイバイ (bai bai)'],
    correctIndex: 1,
    explanation: '失礼します (Shitsurei shimasu) nghĩa là "Tôi xin phép thất lễ / làm phiền". Khi ra về trước dùng お先に失礼します (Osaki ni shitsurei shimasu).',
    targetTab: 'greetings',
  },
];
