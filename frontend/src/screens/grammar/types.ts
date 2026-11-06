import type {
  GrammarLessonSummaryDto,
  GrammarLessonDetailDto,
  GrammarDiscussionDto,
  GrammarQuizItem,
  GrammarTimestampItem,
  GrammarCheatsheetItem,
  GrammarQuizSubmitResponse
} from '../../api/grammarApi';

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface LightboxMedia {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

export interface ResumePromptData {
  lessonId: number;
  timeSec: number;
  timeStr: string;
  lessonTitle?: string;
}

// Bảng xếp hạng thứ bậc cấp độ JLPT
export const LEVEL_RANK: Record<string, number> = {
  STARTER: 1,
  N5: 1,
  N4: 2,
  N3: 3,
  N2: 4,
  N1: 5,
};

export const EMOJI_LIST = [
  '🎌', '🌸', '💡', '❓', '✍️', '👏', '💯', '📚', '✨', 'JP',
  '🗾', '🍙', '🍵', '👍', '🔥', '🎯', '⭐', '🎉', '🙏', '😊'
];

// Fallback dữ liệu N5 Bài 1 khi backend chưa sẵn sàng
export const FALLBACK_N5_LESSON_1: GrammarLessonDetailDto = {
  id: 1,
  levelCode: 'N5',
  lessonNumber: 1,
  partNumber: 1,
  sortOrder: 1,
  titleVi: 'Khẳng định, Phủ định, Nghi vấn & Trợ từ chủ đề [は・も・の]',
  titleJa: '第1課：～は～です・～じゃありません・～ですか・～も・～の',
  videoId: 'YBI4nM5HC4c',
  durationStr: '1:54:38',
  durationSec: 6878,
  isUnlocked: true,
  isPassed: false,
  highestScore: 0,
  starsEarned: 0,
  timestamps: [
    { id: 1, timeSec: 15, timeStr: '00:15', title: 'Tổng quan bài 1 & Đại từ xưng hô', pattern: 'わたし・あなた・あの人', summary: 'Giới thiệu bản thân và cách gọi người khác lịch sự', sortOrder: 1 },
    { id: 2, timeSec: 90, timeStr: '01:30', title: 'Mẫu 1: Câu khẳng định danh từ', pattern: 'N1 は N2 です', summary: 'N1 là N2 (Trợ từ は phát âm là WA)', sortOrder: 2 },
    { id: 3, timeSec: 320, timeStr: '05:20', title: 'Mẫu 2: Câu phủ định danh từ', pattern: 'N1 は N2 じゃ / ではありません', summary: 'N1 không phải là N2 (じゃありません thân mật hơn ではありません)', sortOrder: 3 },
    { id: 4, timeSec: 580, timeStr: '09:40', title: 'Mẫu 3: Câu hỏi nghi vấn Có/Không', pattern: 'Câu + か', summary: 'Hỏi xác nhận thông tin, trả lời はい hoặc いいえ', sortOrder: 4 },
    { id: 5, timeSec: 810, timeStr: '13:30', title: 'Mẫu 4: Trợ từ đồng nhất "Cũng"', pattern: 'N も N です', summary: 'Thay thế trợ từ は khi đối tượng có cùng đặc điểm', sortOrder: 5 },
    { id: 6, timeSec: 990, timeStr: '16:30', title: 'Mẫu 5: Trợ từ sở hữu & Thuộc về', pattern: 'N1 の N2', summary: 'N2 thuộc về N1 hoặc giải thích bổ nghĩa cho N1', sortOrder: 6 }
  ],
  cheatsheets: [
    {
      id: 1,
      pattern: 'N1 は N2 です',
      badge: 'Căn bản ★',
      meaning: 'N1 là N2',
      structure: 'Danh từ 1 + は + Danh từ 2 + です',
      nuance: 'Trợ từ [は] luôn phát âm là [wa] khi đóng vai trò trợ từ chủ ngữ, không đọc là [ha].',
      examples: [
        { ja: 'わたしは マイケル です。', furigana: 'わたしは マイケル です。', vi: 'Tôi là Michael.' },
        { ja: 'サントスさんは ブラジル人 です。', furigana: 'サントスさんは ブラジルじん です。', vi: 'Anh Santos là người Brazil.' }
      ],
      sortOrder: 1
    },
    {
      id: 2,
      pattern: 'N1 は N2 じゃ／ではありません',
      badge: 'Phủ định',
      meaning: 'N1 không phải là N2',
      structure: 'Danh từ 1 + は + Danh từ 2 + じゃ／ではありません',
      nuance: '[じゃありません] thường dùng trong hội thoại hàng ngày. [ではありません] trang trọng hơn, dùng trong bài thi JLPT hoặc văn bản viết.',
      examples: [
        { ja: 'サントスさんは 学生じゃ ありません。', furigana: 'サントスさんは がくせいじゃ ありません。', vi: 'Anh Santos không phải là sinh viên.' }
      ],
      sortOrder: 2
    },
    {
      id: 3,
      pattern: 'Câu + か',
      badge: 'Nghi vấn',
      meaning: '... phải không? / ... có phải không?',
      structure: 'Câu khẳng định + か？',
      nuance: 'Cuối câu nghi vấn lên giọng nhẹ ở từ [か]. Trả lời câu hỏi nghi vấn Có/Không luôn bắt đầu bằng [はい] hoặc [いいえ].',
      examples: [
        { ja: 'ミラーさんは アメリカ人ですか。…はい、アメリカ人です。', furigana: 'ミラーさんは アメリカじんですか。…はい、アメリカじんです。', vi: 'Anh Miller có phải người Mỹ không? ... Vâng, là người Mỹ.' }
      ],
      sortOrder: 3
    }
  ],
  quizzes: [
    {
      id: 1,
      quizType: 'STAR',
      prompt: 'Sắp xếp các từ để hoàn thiện câu và chọn từ nằm ở vị trí ngôi sao [★]:',
      leftSentence: 'わたし',
      rightSentence: 'マイク・ミラーです。',
      starIndex: 0,
      fragments: [
        { id: 'f1', text: 'は' },
        { id: 'f2', text: 'アメリカ' },
        { id: 'f3', text: 'から' },
        { id: 'f4', text: '来ました' }
      ],
      correctAnswer: 'は',
      explanation: 'Thứ tự đúng: わたし [は] [アメリカ] [から] [来ました] マイク・ミラーです。(Vị trí sao số 1 là は).',
      sortOrder: 1
    },
    {
      id: 2,
      quizType: 'MCQ',
      prompt: 'Chọn trợ từ thích hợp điền vào chỗ trống: サントスさん _____ ブラジル人です。',
      options: ['が', 'は', 'を', 'に'],
      correctAnswer: 'は',
      explanation: 'Trợ từ [は] biểu thị chủ đề của câu: Anh Santos là người Brazil.',
      sortOrder: 2
    },
    {
      id: 3,
      quizType: 'MCQ',
      prompt: 'Dạng phủ định trang trọng của「です」dùng trong bài thi JLPT là gì?',
      options: ['ではありません', 'じゃありません', 'でした', 'くありません'],
      correctAnswer: 'ではありません',
      explanation: '[ではありません] là cách phủ định trang trọng tiêu chuẩn trong văn viết và bài thi.',
      sortOrder: 3
    }
  ]
};

export type {
  GrammarLessonSummaryDto,
  GrammarLessonDetailDto,
  GrammarDiscussionDto,
  GrammarQuizItem,
  GrammarTimestampItem,
  GrammarCheatsheetItem,
  GrammarQuizSubmitResponse
};

