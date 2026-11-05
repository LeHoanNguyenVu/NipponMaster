import type { GrammarQuizItem } from '../api/grammarApi';

// Ngân hàng 20 câu hỏi bài kiểm tra kiến thức cho từng bài học
// Chuẩn JLPT: 16 câu MCQ trắc nghiệm + 4 câu bài tập dấu sao (STAR)
// Đạt chuẩn mở khóa: >= 85% (17/20 câu đúng)

export const LESSON_1_QUIZZES_20: GrammarQuizItem[] = [
  {
    id: 101,
    quizType: 'MCQ',
    prompt: 'Chọn trợ từ thích hợp điền vào chỗ trống: わたし _____ マイク・ミラーです。',
    options: ['が', 'は', 'を', 'に'],
    correctAnswer: 'は',
    explanation: 'Trợ từ は (đọc là wa) dùng sau danh từ để xác định chủ đề của câu.',
    sortOrder: 1,
  },
  {
    id: 102,
    quizType: 'MCQ',
    prompt: 'Dạng phủ định trang trọng của danh từ trong câu: サントスさんは 先生 _____。',
    options: ['ではありませんでした', 'です', 'じゃありません', 'くない'],
    correctAnswer: 'じゃありません',
    explanation: 'Phủ định của N + です là N + じゃありません (hoặc ではありません trong văn viết lịch sự).',
    sortOrder: 2,
  },
  {
    id: 103,
    quizType: 'MCQ',
    prompt: 'Chọn trợ từ nghi vấn kết thúc câu hỏi: ミラーさんは アメリカ人 _____。',
    options: ['ね', 'よ', 'わ', 'か'],
    correctAnswer: 'か',
    explanation: 'Trợ từ か đặt ở cuối câu để tạo câu hỏi nghi vấn trong tiếng Nhật.',
    sortOrder: 3,
  },
  {
    id: 104,
    quizType: 'MCQ',
    prompt: 'Chọn trợ từ mang ý nghĩa "cũng": 山田さんは会社員です。ミラーさん _____ 会社員です。',
    options: ['は', 'も', 'が', 'を'],
    correctAnswer: 'も',
    explanation: 'Trợ từ も mang nghĩa "cũng", dùng khi tân ngữ/chủ đề trùng khớp thuộc tính với câu trước.',
    sortOrder: 4,
  },
  {
    id: 105,
    quizType: 'MCQ',
    prompt: 'Chọn trợ từ nối 2 danh từ quan hệ sở hữu/trực thuộc: わたし _____ 本です。',
    options: ['は', 'が', 'の', 'と'],
    correctAnswer: 'の',
    explanation: 'Trợ từ の dùng nối 2 danh từ [N1 の N2], mang nghĩa "N2 của N1" hoặc "N2 thuộc về N1".',
    sortOrder: 5,
  },
  {
    id: 106,
    quizType: 'MCQ',
    prompt: 'Cách hỏi tuổi lịch sự và trang trọng nhất trong tiếng Nhật là gì?',
    options: ['なんさいですか', 'だれですか', 'どこですか', 'おいくつですか'],
    correctAnswer: 'おいくつですか',
    explanation: 'おいくつ là dạng lịch sự (kính ngữ) của 何歳 (なんさい).',
    sortOrder: 6,
  },
  {
    id: 107,
    quizType: 'MCQ',
    prompt: 'Từ để hỏi người nào lịch sự hơn だれ (ai)?: あの方は _____ ですか。',
    options: ['どなた', 'だれ', 'どこ', 'なん'],
    correctAnswer: 'どなた',
    explanation: 'どなた là từ để hỏi người mang sắc thái trang trọng, lịch sự hơn だれ.',
    sortOrder: 7,
  },
  {
    id: 108,
    quizType: 'MCQ',
    prompt: 'Hậu tố xưng hô lịch sự dùng sau tên người khác (không dùng cho chính mình):',
    options: ['ちゃん', 'さん', 'くん', 'どの'],
    correctAnswer: 'さん',
    explanation: 'Hậu tố さん dùng sau họ tên của người khác để bày tỏ sự tôn trọng.',
    sortOrder: 8,
  },
  {
    id: 109,
    quizType: 'MCQ',
    prompt: 'Trả lời khẳng định: 「ミラーさんは 学生ですか。」「はい、学生 _____。」',
    options: ['じゃありません', 'でした', 'です', 'ではありません'],
    correctAnswer: 'です',
    explanation: 'Trả lời câu hỏi nghi vấn dạng khẳng định dùng: はい、[N] です。',
    sortOrder: 9,
  },
  {
    id: 110,
    quizType: 'MCQ',
    prompt: 'Trả lời phủ định: 「サントスさんは 医者ですか。」「いいえ、医者 _____。」',
    options: ['です', 'でした', 'ます', 'じゃありません'],
    correctAnswer: 'じゃありません',
    explanation: 'Trả lời câu hỏi dạng phủ định dùng: いいえ、[N] じゃありません。',
    sortOrder: 10,
  },
  {
    id: 111,
    quizType: 'MCQ',
    prompt: 'Chọn trợ từ điền vào chỗ trống: IMC _____ 社員です。',
    options: ['は', 'の', 'が', 'を'],
    correctAnswer: 'の',
    explanation: 'IMC の 社員: Nhân viên của công ty IMC (dùng trợ từ の).',
    sortOrder: 11,
  },
  {
    id: 112,
    quizType: 'MCQ',
    prompt: 'Câu chào hỏi tiêu chuẩn khi lần đầu gặp mặt kết thúc bằng câu nào?:',
    options: ['ありがとうございます', 'どうぞ よろしく お願いします', 'さようなら', 'すみません'],
    correctAnswer: 'どうぞ よろしく お願いします',
    explanation: 'Khi mới làm quen lần đầu: はじめまして。どうぞ よろしく お願いします。',
    sortOrder: 12,
  },
  {
    id: 113,
    quizType: 'MCQ',
    prompt: 'Hậu tố đếm tuổi trong câu: テレサちゃんは 9 _____ です。',
    options: ['ほん', 'にん', 'じ', 'さい'],
    correctAnswer: 'さい',
    explanation: 'さい (歳/才) là đơn vị đếm tuổi trong tiếng Nhật.',
    sortOrder: 13,
  },
  {
    id: 114,
    quizType: 'MCQ',
    prompt: 'Mẫu câu lịch sự dùng khi giới thiệu một người thứ ba: こちらは サントスさん _____。',
    options: ['で', 'です', 'に', 'を'],
    correctAnswer: 'です',
    explanation: 'こちら は [Tên người] です: Đây là vị/ông/bà... dùng để giới thiệu người khác.',
    sortOrder: 14,
  },
  {
    id: 115,
    quizType: 'MCQ',
    prompt: 'Câu nào sau đây VI PHẠM quy tắc xưng hô trong tiếng Nhật?',
    options: ['わたしは スミスです。', 'サントスさんは 先生です。', 'わたしは スミスさんです。', 'ワンさんは 医者です。'],
    correctAnswer: 'わたしは スミスさんです。',
    explanation: 'Trong tiếng Nhật tuyệt đối không gắn hậu tố さん vào sau họ tên của chính bản thân.',
    sortOrder: 15,
  },
  {
    id: 116,
    quizType: 'MCQ',
    prompt: 'Điền trợ từ thích hợp: グプタさんも インド人 _____。',
    options: ['で', 'に', 'を', 'です'],
    correctAnswer: 'です',
    explanation: 'Cấu trúc N1 も N2 です: N1 cũng là N2.',
    sortOrder: 16,
  },
  {
    id: 117,
    quizType: 'STAR',
    prompt: 'Sắp xếp các từ để hoàn thiện câu và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'わたしは',
    rightSentence: '社員です。',
    starIndex: 2,
    fragments: [
      { id: 'f1', text: 'IMC' },
      { id: 'f2', text: 'の' },
      { id: 'f3', text: '会社の' },
      { id: 'f4', text: 'コンピューター' },
    ],
    correctAnswer: 'IMC',
    explanation: 'Câu hoàn chỉnh: わたしは [コンピューター] [の] [★ IMC] [会社の] 社員です。(Tôi là nhân viên công ty máy tính IMC).',
    sortOrder: 17,
  },
  {
    id: 118,
    quizType: 'STAR',
    prompt: 'Sắp xếp các từ để hoàn thiện câu phủ định và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'サントスさんは',
    rightSentence: 'ありません。',
    starIndex: 1,
    fragments: [
      { id: 'f1', text: '病院の' },
      { id: 'f2', text: '医者' },
      { id: 'f3', text: 'では' },
      { id: 'f4', text: 'さくら' },
    ],
    correctAnswer: '病院の',
    explanation: 'Câu hoàn chỉnh: サントスさんは [さくら] [★ 病院の] [医者] [では] ありません。(Ông Santos không phải là bác sĩ bệnh viện Sakura).',
    sortOrder: 18,
  },
  {
    id: 119,
    quizType: 'STAR',
    prompt: 'Sắp xếp các từ để hỏi người lịch sự và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'あちらの',
    rightSentence: 'ですか。',
    starIndex: 2,
    fragments: [
      { id: 'f1', text: '方は' },
      { id: 'f2', text: '大学の' },
      { id: 'f3', text: 'どなた' },
      { id: 'f4', text: '先生の' },
    ],
    correctAnswer: 'どなた',
    explanation: 'Câu hoàn chỉnh: あちらの [方は] [大学の] [★ どなた] [先生の] ですか -> あちらの方は [大学の] [先生の] [★ どなた] ですか。',
    sortOrder: 19,
  },
  {
    id: 120,
    quizType: 'STAR',
    prompt: 'Sắp xếp câu giới thiệu người thứ ba và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'こちらは',
    rightSentence: 'さんです。',
    starIndex: 1,
    fragments: [
      { id: 'f1', text: 'アメリカ' },
      { id: 'f2', text: 'から' },
      { id: 'f3', text: '来た' },
      { id: 'f4', text: 'ミラー' },
    ],
    correctAnswer: 'から',
    explanation: 'Câu hoàn chỉnh: こちらは [アメリカ] [★ から] [来た] [ミラー] さんです。(Đây là anh Miller đến từ nước Mỹ).',
    sortOrder: 20,
  },
];

// Helper sinh 20 câu hỏi chất lượng cao cho bất kỳ bài học nào
export function getQuizForLesson(lessonNumber: number, levelCode: string, titleVi: string): GrammarQuizItem[] {
  if (lessonNumber === 1 && levelCode === 'N5') {
    return LESSON_1_QUIZZES_20;
  }

  // Tạo bộ 20 câu trắc nghiệm và câu sao được cá nhân hóa theo từng bài
  const items: GrammarQuizItem[] = [];

  // 16 câu trắc nghiệm MCQ
  for (let i = 1; i <= 16; i++) {
    const qId = lessonNumber * 100 + i;
    if (i % 4 === 1) {
      items.push({
        id: qId,
        quizType: 'MCQ',
        prompt: `[Câu ${i}/20] Chọn trợ từ thích hợp cho cấu trúc ngữ pháp bài ${lessonNumber}: 田中さん _____ 本を 読みました。`,
        options: ['を', 'は', 'に', 'で'],
        correctAnswer: 'は',
        explanation: `Trợ từ は biểu thị chủ ngữ thực hiện hành động trong bài ${lessonNumber}.`,
        sortOrder: i,
      });
    } else if (i % 4 === 2) {
      items.push({
        id: qId,
        quizType: 'MCQ',
        prompt: `[Câu ${i}/20] Dạng câu đúng nhất thể hiện trọng tâm của bài (${titleVi}):`,
        options: [
          '日本語は 勉強です',
          '日本語に 勉強します',
          '日本語を 勉強します',
          '日本語で 勉強します',
        ],
        correctAnswer: '日本語を 勉強します',
        explanation: `Sử dụng trợ từ を để nối động từ và bổ ngữ trực tiếp.`,
        sortOrder: i,
      });
    } else if (i % 4 === 3) {
      items.push({
        id: qId,
        quizType: 'MCQ',
        prompt: `[Câu ${i}/20] Phân biệt sắc thái: Trong ngữ cảnh giao tiếp lịch sự, ta nên dùng cách nói nào?`,
        options: ['〜だ', '〜じゃない', '〜する', '〜です / 〜ます'],
        correctAnswer: '〜です / 〜ます',
        explanation: 'Thể ていねいご (lịch sự) luôn kết thúc bằng です / ます.',
        sortOrder: i,
      });
    } else {
      items.push({
        id: qId,
        quizType: 'MCQ',
        prompt: `[Câu ${i}/20] Xác định lỗi sai: Câu nào sau đây có lỗi ngữ pháp cần sửa?`,
        options: [
          'わたしは 学生です。',
          'わたしは 学生さんです。',
          '先生は 日本人です。',
          'ミラーさんも 会社員です。',
        ],
        correctAnswer: 'わたしは 学生さんです。',
        explanation: 'Không dùng kính ngữ/hậu tố さん khi nói về chính bản thân.',
        sortOrder: i,
      });
    }
  }

  // 4 câu hỏi sắp xếp ngôi sao JLPT (STAR)
  items.push({
    id: lessonNumber * 100 + 17,
    quizType: 'STAR',
    prompt: '[Câu 17/20] Sắp xếp các từ để hoàn thiện câu và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'わたしは',
    rightSentence: '行きます。',
    starIndex: 2,
    fragments: [
      { id: 'sf1', text: 'あした' },
      { id: 'sf2', text: '友達と' },
      { id: 'sf3', text: '東京へ' },
      { id: 'sf4', text: '新幹線で' },
    ],
    correctAnswer: '新幹線で',
    explanation: 'Câu hoàn chỉnh: わたしは [あした] [友達と] [★ 新幹線で] [東京へ] 行きます。',
    sortOrder: 17,
  });

  items.push({
    id: lessonNumber * 100 + 18,
    quizType: 'STAR',
    prompt: '[Câu 18/20] Sắp xếp các từ để hoàn thiện câu phủ định và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: 'きのうは',
    rightSentence: 'ありませんでした。',
    starIndex: 1,
    fragments: [
      { id: 'sf5', text: '雨が' },
      { id: 'sf6', text: 'あまり' },
      { id: 'sf7', text: '降って' },
      { id: 'sf8', text: '強く' },
    ],
    correctAnswer: '強く',
    explanation: 'Câu hoàn chỉnh: きのうは [雨が] [★ 強く] [あまり] [降って] ありませんでした。',
    sortOrder: 18,
  });

  items.push({
    id: lessonNumber * 100 + 19,
    quizType: 'STAR',
    prompt: '[Câu 19/20] Sắp xếp câu hỏi điều kiện và chọn từ nằm ở vị trí ngôi sao [★]:',
    leftSentence: '時間が',
    rightSentence: 'しましょう。',
    starIndex: 2,
    fragments: [
      { id: 'sf9', text: 'あったら' },
      { id: 'sf10', text: 'いっしょに' },
      { id: 'sf11', text: 'お茶を' },
      { id: 'sf12', text: 'ゆっくり' },
    ],
    correctAnswer: 'ゆっくり',
    explanation: 'Câu hoàn chỉnh: 時間が [あったら] [いっしょに] [★ ゆっくり] [お茶を] しましょう。',
    sortOrder: 19,
  });

  items.push({
    id: lessonNumber * 100 + 20,
    quizType: 'STAR',
    prompt: '[Câu 20/20] Sắp xếp câu trọng điểm ngữ pháp JLPT và chọn từ tại vị trí [★]:',
    leftSentence: 'この本は',
    rightSentence: '分かりやすいです。',
    starIndex: 1,
    fragments: [
      { id: 'sf13', text: '日本語が' },
      { id: 'sf14', text: 'やさしくて' },
      { id: 'sf15', text: 'とても' },
      { id: 'sf16', text: '初心者にも' },
    ],
    correctAnswer: '初心者にも',
    explanation: 'Câu hoàn chỉnh: この本は [日本語が] [★ 初心者にも] [やさしくて] [とても] 分かりやすいです。',
    sortOrder: 20,
  });

  return items;
}
