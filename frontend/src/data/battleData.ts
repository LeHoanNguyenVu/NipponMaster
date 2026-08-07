/**
 * battleData.ts — Static data for JLPT Battle Arena 1v1
 * Question pools, Elo configuration, Bot AI opponents, and rank definitions.
 */

// ══════════════════════════════════════════════════════
// 1. ELO RANK SYSTEM
// ══════════════════════════════════════════════════════

export interface EloRank {
  id: string;
  label: string;
  labelJP: string;
  emoji: string;
  minElo: number;
  maxElo: number;
  color: string;
  bgGradient: string;
}

export const ELO_RANKS: EloRank[] = [
  { id: 'bronze', label: 'Đồng', labelJP: 'ブロンズ', emoji: '🥉', minElo: 0, maxElo: 999, color: '#cd7f32', bgGradient: 'from-amber-800/20 to-amber-600/10' },
  { id: 'silver', label: 'Bạc', labelJP: 'シルバー', emoji: '🥈', minElo: 1000, maxElo: 1299, color: '#a8a8a8', bgGradient: 'from-gray-400/20 to-gray-300/10' },
  { id: 'gold', label: 'Vàng', labelJP: 'ゴールド', emoji: '🥇', minElo: 1300, maxElo: 1599, color: '#c8a455', bgGradient: 'from-yellow-500/20 to-amber-400/10' },
  { id: 'platinum', label: 'Bạch Kim', labelJP: 'プラチナ', emoji: '💎', minElo: 1600, maxElo: 1899, color: '#73c2fb', bgGradient: 'from-cyan-400/20 to-sky-300/10' },
  { id: 'diamond', label: 'Kim Cương', labelJP: 'ダイヤモンド', emoji: '👑', minElo: 1900, maxElo: 9999, color: '#b042ff', bgGradient: 'from-purple-500/20 to-fuchsia-400/10' },
];

export function getRankForElo(elo: number): EloRank {
  return ELO_RANKS.find(r => elo >= r.minElo && elo <= r.maxElo) || ELO_RANKS[0];
}

export function calculateEloDelta(playerElo: number, opponentElo: number, won: boolean): number {
  const K = 32;
  const expected = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  const actual = won ? 1 : 0;
  return Math.round(K * (actual - expected));
}

// ══════════════════════════════════════════════════════
// 2. AI BOT OPPONENTS (Fallback when no real player found)
// ══════════════════════════════════════════════════════

export interface BotOpponent {
  name: string;
  avatar: string;
  elo: number;
  accuracy: number; // 0.0 - 1.0 chance to answer correctly
  avgResponseMs: number; // average response time in ms
}

export const BOT_OPPONENTS: BotOpponent[] = [
  { name: 'Sora AI', avatar: '🤖', elo: 850, accuracy: 0.55, avgResponseMs: 4500 },
  { name: 'Kenji Bot', avatar: '🧠', elo: 1050, accuracy: 0.65, avgResponseMs: 3800 },
  { name: 'Yuki Chan', avatar: '🌸', elo: 1250, accuracy: 0.72, avgResponseMs: 3200 },
  { name: 'Sensei AI', avatar: '👨‍🏫', elo: 1500, accuracy: 0.82, avgResponseMs: 2500 },
  { name: 'Sakura Master', avatar: '🏯', elo: 1800, accuracy: 0.90, avgResponseMs: 2000 },
];

export function selectBotForElo(playerElo: number): BotOpponent {
  // Find closest Elo bot
  let closest = BOT_OPPONENTS[0];
  let minDiff = Math.abs(playerElo - closest.elo);
  for (const bot of BOT_OPPONENTS) {
    const diff = Math.abs(playerElo - bot.elo);
    if (diff < minDiff) {
      closest = bot;
      minDiff = diff;
    }
  }
  return closest;
}

// ══════════════════════════════════════════════════════
// 3. BATTLE QUIZ QUESTION POOL (N5-N4 Mixed)
// ══════════════════════════════════════════════════════

export interface BattleQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  level: 'N5' | 'N4';
  category: 'vocab' | 'kanji' | 'grammar' | 'listening';
}

export const BATTLE_QUESTION_POOL: BattleQuestion[] = [
  // Vocabulary
  { id: 1, question: '「おはようございます」は何ですか？', options: ['Chào buổi sáng', 'Xin lỗi', 'Cảm ơn', 'Tạm biệt'], correctIndex: 0, level: 'N5', category: 'vocab' },
  { id: 2, question: '「すみません」は何ですか？', options: ['Cảm ơn', 'Tạm biệt', 'Xin lỗi / Xin phép', 'Chào buổi sáng'], correctIndex: 2, level: 'N5', category: 'vocab' },
  { id: 3, question: '「ありがとうございます」は何ですか？', options: ['Tạm biệt', 'Cảm ơn rất nhiều', 'Xin chào', 'Xin lỗi'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 4, question: '「さようなら」は何ですか？', options: ['Xin chào', 'Xin lỗi', 'Cảm ơn', 'Tạm biệt (lâu không gặp)'], correctIndex: 3, level: 'N5', category: 'vocab' },
  { id: 5, question: '「たべもの」は何ですか？', options: ['Đồ uống', 'Thức ăn', 'Quần áo', 'Phương tiện'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 6, question: '「がっこう」は何ですか？', options: ['Bệnh viện', 'Nhà hàng', 'Trường học', 'Công ty'], correctIndex: 2, level: 'N5', category: 'vocab' },
  { id: 7, question: '「でんしゃ」は何ですか？', options: ['Xe buýt', 'Tàu điện', 'Xe đạp', 'Máy bay'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 8, question: '「にほんご」は何ですか？', options: ['Người Nhật', 'Tiếng Nhật', 'Nước Nhật', 'Sách Nhật'], correctIndex: 1, level: 'N5', category: 'vocab' },

  // Kanji
  { id: 9, question: '漢字「山」の読み方は？', options: ['かわ (kawa)', 'やま (yama)', 'うみ (umi)', 'もり (mori)'], correctIndex: 1, level: 'N5', category: 'kanji' },
  { id: 10, question: '漢字「火」の意味は？', options: ['Nước', 'Đất', 'Ngọn lửa', 'Cây cối'], correctIndex: 2, level: 'N5', category: 'kanji' },
  { id: 11, question: '漢字「人」の読み方は？', options: ['ひと (hito)', 'き (ki)', 'つき (tsuki)', 'ひ (hi)'], correctIndex: 0, level: 'N5', category: 'kanji' },
  { id: 12, question: '漢字「日」の意味は？', options: ['Mặt trăng', 'Mặt trời / Ngày', 'Ngọn núi', 'Dòng sông'], correctIndex: 1, level: 'N5', category: 'kanji' },
  { id: 13, question: '漢字「水」の読み方は？', options: ['ひ (hi)', 'つち (tsuchi)', 'みず (mizu)', 'き (ki)'], correctIndex: 2, level: 'N5', category: 'kanji' },
  { id: 14, question: '「休」= 人 + 木 nghĩa là gì？', options: ['Chạy', 'Nghỉ ngơi', 'Đứng', 'Ăn'], correctIndex: 1, level: 'N5', category: 'kanji' },
  { id: 15, question: '漢字「月」có bao nhiêu nét？', options: ['2 nét', '3 nét', '4 nét', '5 nét'], correctIndex: 2, level: 'N5', category: 'kanji' },
  { id: 16, question: '「好」= 女 + 子 nghĩa là gì？', options: ['Xấu', 'Yêu thích', 'Ghét', 'Buồn'], correctIndex: 1, level: 'N5', category: 'kanji' },

  // Grammar
  { id: 17, question: '「わたしは＿＿です」— Điền từ phù hợp:', options: ['がくせい (học sinh)', 'たべます (ăn)', 'きれい (đẹp)', 'はやい (nhanh)'], correctIndex: 0, level: 'N5', category: 'grammar' },
  { id: 18, question: '「これは本＿＿。」— Điền trợ từ phù hợp:', options: ['を', 'は', 'です', 'に'], correctIndex: 2, level: 'N5', category: 'grammar' },
  { id: 19, question: '「私＿＿学生です。」— Điền trợ từ phù hợp:', options: ['を', 'は', 'に', 'で'], correctIndex: 1, level: 'N5', category: 'grammar' },
  { id: 20, question: '「田中さんは先生ではありません。」Nghĩa là gì?', options: ['Tanaka là giáo viên', 'Tanaka không phải giáo viên', 'Tanaka thích giáo viên', 'Tanaka muốn làm giáo viên'], correctIndex: 1, level: 'N5', category: 'grammar' },
  { id: 21, question: '「これは何ですか。」Nghĩa là gì?', options: ['Đây là sách', 'Cái kia là gì?', 'Đây là cái gì?', 'Đây là ai?'], correctIndex: 2, level: 'N5', category: 'grammar' },
  { id: 22, question: '「です」thể quá khứ lịch sự là gì？', options: ['でした', 'ました', 'ません', 'ではない'], correctIndex: 0, level: 'N5', category: 'grammar' },
  { id: 23, question: '「私の本」nghĩa là gì？', options: ['Sách của tôi', 'Tôi đọc sách', 'Sách tiếng Nhật', 'Mua sách'], correctIndex: 0, level: 'N5', category: 'grammar' },
  { id: 24, question: '「あれ」chỉ đối tượng ở đâu？', options: ['Gần người nói', 'Gần người nghe', 'Xa cả hai', 'Bên trong nhà'], correctIndex: 2, level: 'N5', category: 'grammar' },

  // Numbers / Counting
  { id: 25, question: '数字「七」の読み方は？', options: ['ろく (roku)', 'しち / なな (shichi / nana)', 'はち (hachi)', 'ご (go)'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 26, question: '「いち、に、さん、＿＿」— Số tiếp theo?', options: ['ご (5)', 'し / よん (4)', 'ろく (6)', 'なな (7)'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 27, question: '「ひゃく」nghĩa là bao nhiêu?', options: ['Mười (10)', 'Một trăm (100)', 'Một nghìn (1000)', 'Mười nghìn (10000)'], correctIndex: 1, level: 'N5', category: 'vocab' },
  { id: 28, question: '「三時半」nghĩa là mấy giờ?', options: ['2 giờ 30', '3 giờ 30', '4 giờ 30', '3 giờ'], correctIndex: 1, level: 'N5', category: 'vocab' },

  // N4 Questions (harder)
  { id: 29, question: '「食べたことがある」nghĩa là gì?', options: ['Sẽ ăn', 'Đang ăn', 'Đã từng ăn', 'Muốn ăn'], correctIndex: 2, level: 'N4', category: 'grammar' },
  { id: 30, question: '「てform」của「書く」là gì?', options: ['書いて', '書きて', '書して', '書って'], correctIndex: 0, level: 'N4', category: 'grammar' },
];

/**
 * Get N random questions shuffled from the pool.
 */
export function getRandomBattleQuestions(count: number = 10): BattleQuestion[] {
  const shuffled = [...BATTLE_QUESTION_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
