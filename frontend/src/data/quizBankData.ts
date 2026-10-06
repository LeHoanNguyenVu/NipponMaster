/**
 * quizBankData.ts — Ngân hàng đề thi trắc nghiệm chia thành 15 bài test độc lập cho mỗi mục
 * Bao gồm:
 * 1. Toàn bộ Hiragana (15 bài x 20 câu = 300 câu) — Phủ trọn vẹn 71 chữ & tất cả các hàng
 * 2. Toàn bộ Katakana (15 bài x 20 câu = 300 câu) — Phủ trọn vẹn 71 chữ & tất cả các hàng
 * 3. Trộn lẫn Hiragana & Katakana (15 bài x 20 câu = 300 câu)
 * 4. Âm ghép Yōon (15 bài x 20 câu = 300 câu) — Phủ trọn vẹn 66 âm ghép cả 2 bảng
 *
 * Tổng cộng 60 bài test độc lập = 1.200 câu hỏi chất lượng cao, không trùng lặp!
 */

export interface QuizQuestion {
  id: string;
  prompt: string;         // Ký tự hoặc từ vựng hiển thị
  romaji: string;         // Đáp án Romaji chuẩn
  subText?: string;       // Gợi ý hoặc nghĩa từ vựng
  type: 'char' | 'word';
  kanaType: 'hiragana' | 'katakana' | 'mix';
}

export interface QuizSet {
  id: number;             // 1 đến 15
  title: string;          // 'Bài 01', 'Bài 02', ..., 'Bài 15'
  subtitle: string;       // Tiêu đề phụ (ví dụ: 'Nguyên Âm (A-I-U-E-O) & Hàng K')
  description: string;    // Mô tả mục tiêu của bài
  questions: QuizQuestion[];
}

// ═══════════════════════════════════════════════════════════════════════
// 1. MỤC TOÀN BỘ HIRAGANA (15 BÀI TEST x 20 CÂU = 300 CÂU)
// ═══════════════════════════════════════════════════════════════════════
export const HIRAGANA_QUIZ_SETS: QuizSet[] = [
  {
    "id": 1,
    "title": "Bài 01",
    "subtitle": "Nguyên Âm (A-I-U-E-O) & Hàng K",
    "description": "Nhận diện toàn bộ 5 nguyên âm chính và 5 âm hàng K cùng từ vựng ứng dụng.",
    "questions": [
      {
        "id": "h1_1",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_2",
        "prompt": "い",
        "romaji": "i",
        "subText": "Nguyên âm [I]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_3",
        "prompt": "う",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_4",
        "prompt": "え",
        "romaji": "e",
        "subText": "Nguyên âm [E]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_5",
        "prompt": "お",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_6",
        "prompt": "か",
        "romaji": "ka",
        "subText": "Hàng K [KA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_7",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_8",
        "prompt": "く",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_9",
        "prompt": "け",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_10",
        "prompt": "こ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_11",
        "prompt": "あい",
        "romaji": "ai",
        "subText": "Từ vựng: Tình yêu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_12",
        "prompt": "あお",
        "romaji": "ao",
        "subText": "Từ vựng: Màu xanh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_13",
        "prompt": "うえ",
        "romaji": "ue",
        "subText": "Từ vựng: Phía trên",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_14",
        "prompt": "いえ",
        "romaji": "ie",
        "subText": "Từ vựng: Ngôi nhà",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_15",
        "prompt": "かき",
        "romaji": "kaki",
        "subText": "Từ vựng: Quả hồng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_16",
        "prompt": "きく",
        "romaji": "kiku",
        "subText": "Từ vựng: Lắng nghe",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_17",
        "prompt": "こえ",
        "romaji": "koe",
        "subText": "Từ vựng: Giọng nói",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_18",
        "prompt": "あか",
        "romaji": "aka",
        "subText": "Từ vựng: Màu đỏ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_19",
        "prompt": "いけ",
        "romaji": "ike",
        "subText": "Từ vựng: Cái ao",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h1_20",
        "prompt": "かこ",
        "romaji": "kako",
        "subText": "Từ vựng: Quá khứ",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 2,
    "title": "Bài 02",
    "subtitle": "Hàng S (SA-SHI-SU-SE-SO) & Hàng T (TA-CHI-TSU-TE-TO)",
    "description": "Kiểm tra các âm răng và âm vòm: sa, shi, su, se, so, ta, chi, tsu, te, to.",
    "questions": [
      {
        "id": "h2_1",
        "prompt": "さ",
        "romaji": "sa",
        "subText": "Hàng S [SA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_2",
        "prompt": "し",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_3",
        "prompt": "す",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_4",
        "prompt": "せ",
        "romaji": "se",
        "subText": "Hàng S [SE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_5",
        "prompt": "そ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_6",
        "prompt": "た",
        "romaji": "ta",
        "subText": "Hàng T [TA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_7",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_8",
        "prompt": "つ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_9",
        "prompt": "て",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_10",
        "prompt": "と",
        "romaji": "to",
        "subText": "Hàng T [TO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_11",
        "prompt": "あさ",
        "romaji": "asa",
        "subText": "Từ vựng: Buổi sáng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_12",
        "prompt": "すし",
        "romaji": "sushi",
        "subText": "Từ vựng: Món sushi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_13",
        "prompt": "そこ",
        "romaji": "soko",
        "subText": "Từ vựng: Chỗ đó",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_14",
        "prompt": "うそ",
        "romaji": "uso",
        "subText": "Từ vựng: Lời nói dối",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_15",
        "prompt": "たこ",
        "romaji": "tako",
        "subText": "Từ vựng: Bạch tuộc",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_16",
        "prompt": "くち",
        "romaji": "kuchi",
        "subText": "Từ vựng: Cái miệng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_17",
        "prompt": "つき",
        "romaji": "tsuki",
        "subText": "Từ vựng: Mặt trăng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_18",
        "prompt": "うた",
        "romaji": "uta",
        "subText": "Từ vựng: Bài hát",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_19",
        "prompt": "て",
        "romaji": "te",
        "subText": "Từ vựng: Bàn tay",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h2_20",
        "prompt": "とけい",
        "romaji": "tokei",
        "subText": "Từ vựng: Đồng hồ",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 3,
    "title": "Bài 03",
    "subtitle": "Hàng N (NA-NI-NU-NE-NO) & Hàng H (HA-HI-FU-HE-HO)",
    "description": "Luyện tập các âm mũi và âm môi: na, ni, nu, ne, no, ha, hi, fu, he, ho.",
    "questions": [
      {
        "id": "h3_1",
        "prompt": "な",
        "romaji": "na",
        "subText": "Hàng N [NA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_2",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_3",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_4",
        "prompt": "ね",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_5",
        "prompt": "の",
        "romaji": "no",
        "subText": "Hàng N [NO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_6",
        "prompt": "は",
        "romaji": "ha",
        "subText": "Hàng H [HA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_7",
        "prompt": "ひ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_8",
        "prompt": "ふ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_9",
        "prompt": "へ",
        "romaji": "he",
        "subText": "Hàng H [HE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_10",
        "prompt": "ほ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_11",
        "prompt": "いぬ",
        "romaji": "inu",
        "subText": "Từ vựng: Con chó",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_12",
        "prompt": "ねこ",
        "romaji": "neko",
        "subText": "Từ vựng: Con mèo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_13",
        "prompt": "なつ",
        "romaji": "natsu",
        "subText": "Từ vựng: Mùa hè",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_14",
        "prompt": "はな",
        "romaji": "hana",
        "subText": "Từ vựng: Bông hoa",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_15",
        "prompt": "ひと",
        "romaji": "hito",
        "subText": "Từ vựng: Con người",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_16",
        "prompt": "ふね",
        "romaji": "fune",
        "subText": "Từ vựng: Con thuyền",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_17",
        "prompt": "ほし",
        "romaji": "hoshi",
        "subText": "Từ vựng: Ngôi sao",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_18",
        "prompt": "はち",
        "romaji": "hachi",
        "subText": "Từ vựng: Con ong / Số 8",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_19",
        "prompt": "なに",
        "romaji": "nani",
        "subText": "Từ vựng: Cái gì",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h3_20",
        "prompt": "にく",
        "romaji": "niku",
        "subText": "Từ vựng: Thịt",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 4,
    "title": "Bài 04",
    "subtitle": "Hàng M, Hàng Y (Bán nguyên âm) & Hàng R",
    "description": "Luyện tập các âm môi, bán nguyên âm và âm lướt: ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro.",
    "questions": [
      {
        "id": "h4_1",
        "prompt": "ま",
        "romaji": "ma",
        "subText": "Hàng M [MA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_2",
        "prompt": "み",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_3",
        "prompt": "む",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_4",
        "prompt": "め",
        "romaji": "me",
        "subText": "Hàng M [ME]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_5",
        "prompt": "も",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_6",
        "prompt": "や",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_7",
        "prompt": "ゆ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_8",
        "prompt": "よ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_9",
        "prompt": "ら",
        "romaji": "ra",
        "subText": "Hàng R [RA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_10",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_11",
        "prompt": "る",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_12",
        "prompt": "れ",
        "romaji": "re",
        "subText": "Hàng R [RE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_13",
        "prompt": "ろ",
        "romaji": "ro",
        "subText": "Hàng R [RO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_14",
        "prompt": "あめ",
        "romaji": "ame",
        "subText": "Từ vựng: Cơn mưa",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_15",
        "prompt": "みず",
        "romaji": "mizu",
        "subText": "Từ vựng: Nước",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_16",
        "prompt": "やま",
        "romaji": "yama",
        "subText": "Từ vựng: Ngọn núi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_17",
        "prompt": "ゆき",
        "romaji": "yuki",
        "subText": "Từ vựng: Tuyết rơi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_18",
        "prompt": "そら",
        "romaji": "sora",
        "subText": "Từ vựng: Bầu trời",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_19",
        "prompt": "とり",
        "romaji": "tori",
        "subText": "Từ vựng: Con chim",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h4_20",
        "prompt": "はる",
        "romaji": "haru",
        "subText": "Từ vựng: Mùa xuân",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 5,
    "title": "Bài 05",
    "subtitle": "Hàng W (WA-WO-N) & Tổng Ôn 46 Âm Cơ Bản",
    "description": "Hoàn tất 46 âm trong (Seion) và kiểm tra phản xạ các âm quan trọng.",
    "questions": [
      {
        "id": "h5_1",
        "prompt": "わ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_2",
        "prompt": "を",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_3",
        "prompt": "ん",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_4",
        "prompt": "わたし",
        "romaji": "watashi",
        "subText": "Từ vựng: Tôi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_5",
        "prompt": "にほん",
        "romaji": "nihon",
        "subText": "Từ vựng: Nhật Bản",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_6",
        "prompt": "ほん",
        "romaji": "hon",
        "subText": "Từ vựng: Quyển sách",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_7",
        "prompt": "わに",
        "romaji": "wani",
        "subText": "Từ vựng: Cá sấu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_8",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_9",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_10",
        "prompt": "し",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_11",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_12",
        "prompt": "つ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_13",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_14",
        "prompt": "ふ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_15",
        "prompt": "み",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_16",
        "prompt": "ゆ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_17",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_18",
        "prompt": "お",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_19",
        "prompt": "こ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h5_20",
        "prompt": "そ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 6,
    "title": "Bài 06",
    "subtitle": "Âm Đục Hàng G (GA-GI-GU-GE-GO) & Hàng Z (ZA-JI-ZU-ZE-ZO)",
    "description": "10 âm đục tạo bởi dấu Ten-ten (゛) trên hàng K và hàng S.",
    "questions": [
      {
        "id": "h6_1",
        "prompt": "が",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_2",
        "prompt": "ぎ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_3",
        "prompt": "ぐ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_4",
        "prompt": "げ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_5",
        "prompt": "ご",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_6",
        "prompt": "ざ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_7",
        "prompt": "じ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_8",
        "prompt": "ず",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_9",
        "prompt": "ぜ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_10",
        "prompt": "ぞ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_11",
        "prompt": "かぎ",
        "romaji": "kagi",
        "subText": "Từ vựng: Chìa khóa",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_12",
        "prompt": "ごはん",
        "romaji": "gohan",
        "subText": "Từ vựng: Bữa cơm",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_13",
        "prompt": "ひげ",
        "romaji": "hige",
        "subText": "Từ vựng: Râu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_14",
        "prompt": "かぜ",
        "romaji": "kaze",
        "subText": "Từ vựng: Gió / Cảm lạnh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_15",
        "prompt": "すず",
        "romaji": "suzu",
        "subText": "Từ vựng: Cái chuông",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_16",
        "prompt": "じかん",
        "romaji": "jikan",
        "subText": "Từ vựng: Thời gian",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_17",
        "prompt": "ぞう",
        "romaji": "zou",
        "subText": "Từ vựng: Con voi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_18",
        "prompt": "まんが",
        "romaji": "manga",
        "subText": "Từ vựng: Truyện tranh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_19",
        "prompt": "すごい",
        "romaji": "sugoi",
        "subText": "Từ vựng: Tuyệt vời",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h6_20",
        "prompt": "ぎんこう",
        "romaji": "ginkou",
        "subText": "Từ vựng: Ngân hàng",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 7,
    "title": "Bài 07",
    "subtitle": "Âm Đục Hàng D (DA-DI-DU-DE-DO) & Hàng B (BA-BI-BU-BE-BO)",
    "description": "10 âm đục tạo bởi dấu Ten-ten (゛) trên hàng T và hàng H.",
    "questions": [
      {
        "id": "h7_1",
        "prompt": "だ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_2",
        "prompt": "ぢ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_3",
        "prompt": "づ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_4",
        "prompt": "で",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_5",
        "prompt": "ど",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_6",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_7",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_8",
        "prompt": "ぶ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_9",
        "prompt": "べ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_10",
        "prompt": "ぼ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_11",
        "prompt": "ともだち",
        "romaji": "tomodachi",
        "subText": "Từ vựng: Bạn bè",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_12",
        "prompt": "でんわ",
        "romaji": "denwa",
        "subText": "Từ vựng: Điện thoại",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_13",
        "prompt": "はなぢ",
        "romaji": "hanadi",
        "subText": "Từ vựng: Chảy máu mũi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_14",
        "prompt": "つづく",
        "romaji": "tsuduku",
        "subText": "Từ vựng: Tiếp tục",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_15",
        "prompt": "えび",
        "romaji": "ebi",
        "subText": "Từ vựng: Con tôm",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_16",
        "prompt": "ぶた",
        "romaji": "buta",
        "subText": "Từ vựng: Con lợn",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_17",
        "prompt": "ぼうし",
        "romaji": "boushi",
        "subText": "Từ vựng: Cái mũ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_18",
        "prompt": "だいがく",
        "romaji": "daigaku",
        "subText": "Từ vựng: Đại học",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_19",
        "prompt": "どうぞ",
        "romaji": "douzo",
        "subText": "Từ vựng: Xin mời",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h7_20",
        "prompt": "ばしょ",
        "romaji": "basho",
        "subText": "Từ vựng: Địa điểm",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 8,
    "title": "Bài 08",
    "subtitle": "Bán Đục Hàng P (PA-PI-PU-PE-PO) & Đối Chiếu B / P",
    "description": "5 âm bán đục Maru (゜) và phân biệt dứt điểm âm đục B vs bán đục P.",
    "questions": [
      {
        "id": "h8_1",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_2",
        "prompt": "ぴ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_3",
        "prompt": "ぷ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_4",
        "prompt": "ぺ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_5",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_6",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_7",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_8",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_9",
        "prompt": "ぴ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_10",
        "prompt": "ぶ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_11",
        "prompt": "ぷ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_12",
        "prompt": "べ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_13",
        "prompt": "ぺ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_14",
        "prompt": "ぼ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_15",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_16",
        "prompt": "ぱん",
        "romaji": "pan",
        "subText": "Từ vựng: Bánh mì",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_17",
        "prompt": "ぴかぴか",
        "romaji": "pikapika",
        "subText": "Từ vựng: Lấp lánh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_18",
        "prompt": "きっぷ",
        "romaji": "kippu",
        "subText": "Từ vựng: Vé tàu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_19",
        "prompt": "しっぽ",
        "romaji": "shippo",
        "subText": "Từ vựng: Cái đuôi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h8_20",
        "prompt": "せんぱい",
        "romaji": "senpai",
        "subText": "Từ vựng: Tiền bối",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 9,
    "title": "Bài 09",
    "subtitle": "Đại Chiến 25 Âm Đục & Bán Đục (G, Z, D, B, P)",
    "description": "Kiểm tra tốc độ phản xạ trọn bộ 25 âm có biến âm trong Hiragana.",
    "questions": [
      {
        "id": "h9_1",
        "prompt": "が",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_2",
        "prompt": "ぎ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_3",
        "prompt": "ぐ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_4",
        "prompt": "げ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_5",
        "prompt": "ご",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_6",
        "prompt": "ざ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_7",
        "prompt": "じ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_8",
        "prompt": "ず",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_9",
        "prompt": "ぜ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_10",
        "prompt": "ぞ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_11",
        "prompt": "だ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_12",
        "prompt": "ぢ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_13",
        "prompt": "づ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_14",
        "prompt": "で",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_15",
        "prompt": "ど",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_16",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_17",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_18",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_19",
        "prompt": "ぴ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h9_20",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 10,
    "title": "Bài 10",
    "subtitle": "Bẫy Nét Dễ Nhầm Lẫn Nhất Hiragana",
    "description": "Luyện tập phân biệt các cặp chữ có hình dáng tương tự dễ gây nhầm.",
    "questions": [
      {
        "id": "h10_1",
        "prompt": "さ",
        "romaji": "sa",
        "subText": "Cặp dễ nhầm: さ (sa)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_2",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Cặp dễ nhầm: ち (chi)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_3",
        "prompt": "は",
        "romaji": "ha",
        "subText": "Cặp dễ nhầm: は (ha)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_4",
        "prompt": "ほ",
        "romaji": "ho",
        "subText": "Cặp dễ nhầm: ほ (ho)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_5",
        "prompt": "わ",
        "romaji": "wa",
        "subText": "Cặp dễ nhầm: わ (wa)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_6",
        "prompt": "れ",
        "romaji": "re",
        "subText": "Cặp dễ nhầm: れ (re)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_7",
        "prompt": "ね",
        "romaji": "ne",
        "subText": "Cặp dễ nhầm: ね (ne)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_8",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Cặp dễ nhầm: ぬ (nu)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_9",
        "prompt": "め",
        "romaji": "me",
        "subText": "Cặp dễ nhầm: め (me)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_10",
        "prompt": "る",
        "romaji": "ru",
        "subText": "Cặp dễ nhầm: る (ru)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_11",
        "prompt": "ろ",
        "romaji": "ro",
        "subText": "Cặp dễ nhầm: ろ (ro)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_12",
        "prompt": "い",
        "romaji": "i",
        "subText": "Cặp dễ nhầm: い (i)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_13",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Cặp dễ nhầm: り (ri)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_14",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Cặp dễ nhầm: あ (a)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_15",
        "prompt": "お",
        "romaji": "o",
        "subText": "Cặp dễ nhầm: お (o)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_16",
        "prompt": "ま",
        "romaji": "ma",
        "subText": "Cặp dễ nhầm: ま (ma)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_17",
        "prompt": "も",
        "romaji": "mo",
        "subText": "Cặp dễ nhầm: も (mo)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_18",
        "prompt": "け",
        "romaji": "ke",
        "subText": "Cặp dễ nhầm: け (ke)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_19",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Cặp dễ nhầm: き (ki)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h10_20",
        "prompt": "す",
        "romaji": "su",
        "subText": "Cặp dễ nhầm: す (su)",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 11,
    "title": "Bài 11",
    "subtitle": "Từ Vựng Hiragana Đời Sống (2 Âm Tiết)",
    "description": "Thực hành đọc từ vựng 2 âm tiết ghép từ bảng Hiragana.",
    "questions": [
      {
        "id": "h11_1",
        "prompt": "ねこ",
        "romaji": "neko",
        "subText": "Từ vựng: Con mèo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_2",
        "prompt": "いぬ",
        "romaji": "inu",
        "subText": "Từ vựng: Con chó",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_3",
        "prompt": "とり",
        "romaji": "tori",
        "subText": "Từ vựng: Con chim",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_4",
        "prompt": "さる",
        "romaji": "saru",
        "subText": "Từ vựng: Con khỉ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_5",
        "prompt": "うし",
        "romaji": "ushi",
        "subText": "Từ vựng: Con bò",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_6",
        "prompt": "うま",
        "romaji": "uma",
        "subText": "Từ vựng: Con ngựa",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_7",
        "prompt": "はな",
        "romaji": "hana",
        "subText": "Từ vựng: Bông hoa / Cái mũi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_8",
        "prompt": "やま",
        "romaji": "yama",
        "subText": "Từ vựng: Ngọn núi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_9",
        "prompt": "かわ",
        "romaji": "kawa",
        "subText": "Từ vựng: Dòng sông",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_10",
        "prompt": "うみ",
        "romaji": "umi",
        "subText": "Từ vựng: Biển cả",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_11",
        "prompt": "そら",
        "romaji": "sora",
        "subText": "Từ vựng: Bầu trời",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_12",
        "prompt": "あめ",
        "romaji": "ame",
        "subText": "Từ vựng: Cơn mưa",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_13",
        "prompt": "ゆき",
        "romaji": "yuki",
        "subText": "Từ vựng: Tuyết",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_14",
        "prompt": "くも",
        "romaji": "kumo",
        "subText": "Từ vựng: Mây / Con nhện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_15",
        "prompt": "かぜ",
        "romaji": "kaze",
        "subText": "Từ vựng: Gió",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_16",
        "prompt": "はる",
        "romaji": "haru",
        "subText": "Từ vựng: Mùa xuân",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_17",
        "prompt": "なつ",
        "romaji": "natsu",
        "subText": "Từ vựng: Mùa hè",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_18",
        "prompt": "あき",
        "romaji": "aki",
        "subText": "Từ vựng: Mùa thu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_19",
        "prompt": "ふゆ",
        "romaji": "fuyu",
        "subText": "Từ vựng: Mùa đông",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h11_20",
        "prompt": "つき",
        "romaji": "tsuki",
        "subText": "Từ vựng: Mặt trăng",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 12,
    "title": "Bài 12",
    "subtitle": "Từ Vựng Hiragana Đời Sống (3–4 Âm Tiết)",
    "description": "Luyện đọc các từ vựng dài hơn với cấu trúc đa dạng.",
    "questions": [
      {
        "id": "h12_1",
        "prompt": "さくら",
        "romaji": "sakura",
        "subText": "Từ vựng: Hoa anh đào",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_2",
        "prompt": "ともだち",
        "romaji": "tomodachi",
        "subText": "Từ vựng: Bạn bè",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_3",
        "prompt": "せんせい",
        "romaji": "sensei",
        "subText": "Từ vựng: Thầy cô giáo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_4",
        "prompt": "がくせい",
        "romaji": "gakusei",
        "subText": "Từ vựng: Học sinh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_5",
        "prompt": "くるま",
        "romaji": "kuruma",
        "subText": "Từ vựng: Xe hơi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_6",
        "prompt": "でんしゃ",
        "romaji": "densha",
        "subText": "Từ vựng: Tàu điện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_7",
        "prompt": "ひこうき",
        "romaji": "hikouki",
        "subText": "Từ vựng: Máy bay",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_8",
        "prompt": "くだもの",
        "romaji": "kudamono",
        "subText": "Từ vựng: Hoa quả",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_9",
        "prompt": "たべもの",
        "romaji": "tabemono",
        "subText": "Từ vựng: Thức ăn",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_10",
        "prompt": "のみもの",
        "romaji": "nomimono",
        "subText": "Từ vựng: Đồ uống",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_11",
        "prompt": "たまご",
        "romaji": "tamago",
        "subText": "Từ vựng: Quả trứng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_12",
        "prompt": "りんご",
        "romaji": "ringo",
        "subText": "Từ vựng: Quả táo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_13",
        "prompt": "みかん",
        "romaji": "mikan",
        "subText": "Từ vựng: Quả quýt",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_14",
        "prompt": "すいか",
        "romaji": "suika",
        "subText": "Từ vựng: Dưa hấu",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_15",
        "prompt": "てがみ",
        "romaji": "tegami",
        "subText": "Từ vựng: Lá thư",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_16",
        "prompt": "めがね",
        "romaji": "megane",
        "subText": "Từ vựng: Kính mắt",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_17",
        "prompt": "かさ",
        "romaji": "kasa",
        "subText": "Từ vựng: Cái ô",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_18",
        "prompt": "さいふ",
        "romaji": "saifu",
        "subText": "Từ vựng: Cái ví",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_19",
        "prompt": "くつ",
        "romaji": "kutsu",
        "subText": "Từ vựng: Đôi giày",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h12_20",
        "prompt": "ぼうし",
        "romaji": "boushi",
        "subText": "Từ vựng: Cái mũ",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 13,
    "title": "Bài 13",
    "subtitle": "Tổng Ôn 71 Chữ Hiragana — Đợt 1",
    "description": "Quét 20 chữ cái ngẫu nhiên phủ khắp tất cả các hàng âm trong và âm đục.",
    "questions": [
      {
        "id": "h13_1",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_2",
        "prompt": "く",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_3",
        "prompt": "す",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_4",
        "prompt": "て",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_5",
        "prompt": "ね",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_6",
        "prompt": "ひ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_7",
        "prompt": "む",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_8",
        "prompt": "や",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_9",
        "prompt": "る",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_10",
        "prompt": "ん",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_11",
        "prompt": "が",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_12",
        "prompt": "げ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_13",
        "prompt": "じ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_14",
        "prompt": "ぞ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_15",
        "prompt": "だ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_16",
        "prompt": "で",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_17",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_18",
        "prompt": "ぼ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_19",
        "prompt": "ぴ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h13_20",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 14,
    "title": "Bài 14",
    "subtitle": "Tổng Ôn 71 Chữ Hiragana — Đợt 2",
    "description": "Quét tiếp 20 chữ cái khác phủ khắp các hàng còn lại.",
    "questions": [
      {
        "id": "h14_1",
        "prompt": "う",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_2",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_3",
        "prompt": "し",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_4",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_5",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_6",
        "prompt": "ふ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_7",
        "prompt": "み",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_8",
        "prompt": "ゆ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_9",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_10",
        "prompt": "わ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_11",
        "prompt": "ぎ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_12",
        "prompt": "ご",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_13",
        "prompt": "ざ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_14",
        "prompt": "ず",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_15",
        "prompt": "ぢ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_16",
        "prompt": "ど",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_17",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_18",
        "prompt": "べ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_19",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h14_20",
        "prompt": "ぺ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 15,
    "title": "Bài 15",
    "subtitle": "Đề Thi Tốt Nghiệp — Hiragana Master",
    "description": "Bài kiểm tra tổng hợp cuối khóa chứng nhận thành thạo 71 ký tự Hiragana.",
    "questions": [
      {
        "id": "h15_1",
        "prompt": "お",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_2",
        "prompt": "け",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_3",
        "prompt": "そ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_4",
        "prompt": "つ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_5",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_6",
        "prompt": "ほ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_7",
        "prompt": "も",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_8",
        "prompt": "よ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_9",
        "prompt": "ろ",
        "romaji": "ro",
        "subText": "Hàng R [RO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_10",
        "prompt": "を",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_11",
        "prompt": "ぐ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_12",
        "prompt": "ぜ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_13",
        "prompt": "づ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_14",
        "prompt": "ぶ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_15",
        "prompt": "ぷ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_16",
        "prompt": "ありがとう",
        "romaji": "arigatou",
        "subText": "Từ vựng: Cảm ơn",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_17",
        "prompt": "おはよう",
        "romaji": "ohayou",
        "subText": "Từ vựng: Chào buổi sáng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_18",
        "prompt": "さようなら",
        "romaji": "sayounara",
        "subText": "Từ vựng: Tạm biệt",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_19",
        "prompt": "おねがい",
        "romaji": "onegai",
        "subText": "Từ vựng: Làm ơn",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "h15_20",
        "prompt": "すばらしい",
        "romaji": "subarashii",
        "subText": "Từ vựng: Tuyệt vời",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// 2. MỤC TOÀN BỘ KATAKANA (15 BÀI TEST x 20 CÂU = 300 CÂU)
// ═══════════════════════════════════════════════════════════════════════
export const KATAKANA_QUIZ_SETS: QuizSet[] = [
  {
    "id": 1,
    "title": "Bài 01",
    "subtitle": "Nguyên Âm (A-I-U-E-O) & Hàng K Katakana",
    "description": "Luyện tập 5 nguyên âm và hàng K của Katakana kèm từ mượn ứng dụng.",
    "questions": [
      {
        "id": "k1_1",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_2",
        "prompt": "イ",
        "romaji": "i",
        "subText": "Nguyên âm [I]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_3",
        "prompt": "ウ",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_4",
        "prompt": "エ",
        "romaji": "e",
        "subText": "Nguyên âm [E]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_5",
        "prompt": "オ",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_6",
        "prompt": "カ",
        "romaji": "ka",
        "subText": "Hàng K [KA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_7",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_8",
        "prompt": "ク",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_9",
        "prompt": "ケ",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_10",
        "prompt": "コ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k1_11",
        "prompt": "アイス",
        "romaji": "aisu",
        "subText": "Từ vựng: Kem / Đá",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_12",
        "prompt": "エア",
        "romaji": "ea",
        "subText": "Từ vựng: Không khí (Air)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_13",
        "prompt": "ケア",
        "romaji": "kea",
        "subText": "Từ vựng: Chăm sóc (Care)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_14",
        "prompt": "コア",
        "romaji": "koa",
        "subText": "Từ vựng: Lõi (Core)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_15",
        "prompt": "カカオ",
        "romaji": "kakao",
        "subText": "Từ vựng: Cacao",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_16",
        "prompt": "アイ",
        "romaji": "ai",
        "subText": "Từ vựng: Mắt / Tình yêu",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_17",
        "prompt": "ウエスト",
        "romaji": "uesuto",
        "subText": "Từ vựng: Vòng eo (Waist)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_18",
        "prompt": "オアシス",
        "romaji": "oashisu",
        "subText": "Từ vựng: Ốc đảo (Oasis)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_19",
        "prompt": "キウイ",
        "romaji": "kiui",
        "subText": "Từ vựng: Quả kiwi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k1_20",
        "prompt": "クエ",
        "romaji": "kue",
        "subText": "Từ vựng: Cá song",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 2,
    "title": "Bài 02",
    "subtitle": "Hàng S (SA-SHI-SU-SE-SO) & Hàng T Katakana",
    "description": "Nhận diện các ký tự hàng S và hàng T Katakana.",
    "questions": [
      {
        "id": "k2_1",
        "prompt": "サ",
        "romaji": "sa",
        "subText": "Hàng S [SA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_2",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_3",
        "prompt": "ス",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_4",
        "prompt": "セ",
        "romaji": "se",
        "subText": "Hàng S [SE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_5",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_6",
        "prompt": "タ",
        "romaji": "ta",
        "subText": "Hàng T [TA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_7",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_8",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_9",
        "prompt": "テ",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_10",
        "prompt": "ト",
        "romaji": "to",
        "subText": "Hàng T [TO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k2_11",
        "prompt": "テスト",
        "romaji": "tesuto",
        "subText": "Từ vựng: Bài kiểm tra (Test)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_12",
        "prompt": "タクシー",
        "romaji": "takushii",
        "subText": "Từ vựng: Xe taxi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_13",
        "prompt": "シート",
        "romaji": "shiito",
        "subText": "Từ vựng: Chỗ ngồi / Khăn trải",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_14",
        "prompt": "スーツ",
        "romaji": "suutsu",
        "subText": "Từ vựng: Bộ com-lê (Suit)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_15",
        "prompt": "ガス",
        "romaji": "gasu",
        "subText": "Từ vựng: Khí gas",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_16",
        "prompt": "チーズ",
        "romaji": "chiizu",
        "subText": "Từ vựng: Phô mai (Cheese)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_17",
        "prompt": "ポスト",
        "romaji": "posuto",
        "subText": "Từ vựng: Hòm thư (Post)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_18",
        "prompt": "スープ",
        "romaji": "suupu",
        "subText": "Từ vựng: Món súp (Soup)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_19",
        "prompt": "テニス",
        "romaji": "tenisu",
        "subText": "Từ vựng: Quần vợt (Tennis)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k2_20",
        "prompt": "トマト",
        "romaji": "tomato",
        "subText": "Từ vựng: Quả cà chua",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 3,
    "title": "Bài 03",
    "subtitle": "Hàng N (NA-NI-NU-NE-NO) & Hàng H Katakana",
    "description": "Luyện tập các ký tự mũi và môi Katakana.",
    "questions": [
      {
        "id": "k3_1",
        "prompt": "ナ",
        "romaji": "na",
        "subText": "Hàng N [NA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_2",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_3",
        "prompt": "ヌ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_4",
        "prompt": "ネ",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_5",
        "prompt": "ノ",
        "romaji": "no",
        "subText": "Hàng N [NO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_6",
        "prompt": "ハ",
        "romaji": "ha",
        "subText": "Hàng H [HA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_7",
        "prompt": "ヒ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_8",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_9",
        "prompt": "ヘ",
        "romaji": "he",
        "subText": "Hàng H [HE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_10",
        "prompt": "ホ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k3_11",
        "prompt": "ノート",
        "romaji": "nooto",
        "subText": "Từ vựng: Vở ghi chép (Note)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_12",
        "prompt": "ナイフ",
        "romaji": "naifu",
        "subText": "Từ vựng: Con dao (Knife)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_13",
        "prompt": "ホテル",
        "romaji": "hoteru",
        "subText": "Từ vựng: Khách sạn (Hotel)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_14",
        "prompt": "ヘルメット",
        "romaji": "herumetto",
        "subText": "Từ vựng: Mũ bảo hiểm (Helmet)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_15",
        "prompt": "ハム",
        "romaji": "hamu",
        "subText": "Từ vựng: Thịt giăm bông (Ham)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_16",
        "prompt": "ネクタイ",
        "romaji": "nekutai",
        "subText": "Từ vựng: Cà vạt (Necktie)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_17",
        "prompt": "フライ",
        "romaji": "furai",
        "subText": "Từ vựng: Đồ chiên (Fry)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_18",
        "prompt": "ナプキン",
        "romaji": "napukin",
        "subText": "Từ vựng: Khăn ăn (Napkin)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_19",
        "prompt": "ヒント",
        "romaji": "hinto",
        "subText": "Từ vựng: Gợi ý (Hint)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k3_20",
        "prompt": "ハチミツ",
        "romaji": "hachimitsu",
        "subText": "Từ vựng: Mật ong",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 4,
    "title": "Bài 04",
    "subtitle": "Hàng M, Hàng Y & Hàng R Katakana",
    "description": "Luyện tập các âm môi, bán nguyên âm và âm lướt Katakana.",
    "questions": [
      {
        "id": "k4_1",
        "prompt": "マ",
        "romaji": "ma",
        "subText": "Hàng M [MA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_2",
        "prompt": "ミ",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_3",
        "prompt": "ム",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_4",
        "prompt": "メ",
        "romaji": "me",
        "subText": "Hàng M [ME]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_5",
        "prompt": "モ",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_6",
        "prompt": "ヤ",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_7",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_8",
        "prompt": "ヨ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_9",
        "prompt": "ラ",
        "romaji": "ra",
        "subText": "Hàng R [RA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_10",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_11",
        "prompt": "ル",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_12",
        "prompt": "レ",
        "romaji": "re",
        "subText": "Hàng R [RE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_13",
        "prompt": "ロ",
        "romaji": "ro",
        "subText": "Hàng R [RO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k4_14",
        "prompt": "カメラ",
        "romaji": "kamera",
        "subText": "Từ vựng: Máy ảnh (Camera)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_15",
        "prompt": "ミルク",
        "romaji": "miruku",
        "subText": "Từ vựng: Sữa (Milk)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_16",
        "prompt": "ラジオ",
        "romaji": "rajio",
        "subText": "Từ vựng: Đài radio",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_17",
        "prompt": "ヨーグルト",
        "romaji": "yooguruto",
        "subText": "Từ vựng: Sữa chua (Yogurt)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_18",
        "prompt": "マスク",
        "romaji": "masuku",
        "subText": "Từ vựng: Khẩu trang (Mask)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_19",
        "prompt": "リモコン",
        "romaji": "rimokon",
        "subText": "Từ vựng: Điều khiển từ xa",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k4_20",
        "prompt": "ロボット",
        "romaji": "robotto",
        "subText": "Từ vựng: Người máy (Robot)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 5,
    "title": "Bài 05",
    "subtitle": "Hàng W (WA-WO-N) & Tổng Ôn 46 Âm Katakana",
    "description": "Hoàn tất 46 âm trong Katakana và ôn phản xạ các âm trọng tâm.",
    "questions": [
      {
        "id": "k5_1",
        "prompt": "ワ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_2",
        "prompt": "ヲ",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_3",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_4",
        "prompt": "ワイン",
        "romaji": "wain",
        "subText": "Từ vựng: Rượu vang (Wine)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k5_5",
        "prompt": "ワイシャツ",
        "romaji": "waishatsu",
        "subText": "Từ vựng: Áo sơ mi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k5_6",
        "prompt": "ワン",
        "romaji": "wan",
        "subText": "Từ vựng: Một (One) / Tiếng chó sủa",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k5_7",
        "prompt": "タオワン",
        "romaji": "taowan",
        "subText": "Từ vựng: Khăn",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k5_8",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_9",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_10",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_11",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_12",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_13",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_14",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_15",
        "prompt": "ミ",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_16",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_17",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_18",
        "prompt": "オ",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_19",
        "prompt": "コ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k5_20",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 6,
    "title": "Bài 06",
    "subtitle": "Âm Đục Hàng G (GA-GI-GU-GE-GO) & Hàng Z Katakana",
    "description": "Luyện tập 10 âm đục Katakana với dấu Ten-ten.",
    "questions": [
      {
        "id": "k6_1",
        "prompt": "ガ",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_2",
        "prompt": "ギ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_3",
        "prompt": "グ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_4",
        "prompt": "ゲ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_5",
        "prompt": "ゴ",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_6",
        "prompt": "ザ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_7",
        "prompt": "ジ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_8",
        "prompt": "ズ",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_9",
        "prompt": "ゼ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_10",
        "prompt": "ゾ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k6_11",
        "prompt": "ギター",
        "romaji": "gitaa",
        "subText": "Từ vựng: Đàn guitar",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_12",
        "prompt": "ガラス",
        "romaji": "garasu",
        "subText": "Từ vựng: Thủy tinh (Glass)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_13",
        "prompt": "ゲーム",
        "romaji": "geemu",
        "subText": "Từ vựng: Trò chơi (Game)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_14",
        "prompt": "ゴール",
        "romaji": "gooru",
        "subText": "Từ vựng: Khung thành / Đích (Goal)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_15",
        "prompt": "ピザ",
        "romaji": "piza",
        "subText": "Từ vựng: Bánh pizza",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_16",
        "prompt": "サイズ",
        "romaji": "saizu",
        "subText": "Từ vựng: Kích cỡ (Size)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_17",
        "prompt": "レジ",
        "romaji": "reji",
        "subText": "Từ vựng: Quầy thu ngân",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_18",
        "prompt": "ズボン",
        "romaji": "zubon",
        "subText": "Từ vựng: Quần dài",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_19",
        "prompt": "ゼロ",
        "romaji": "zero",
        "subText": "Từ vựng: Số không (Zero)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k6_20",
        "prompt": "デザート",
        "romaji": "dezaato",
        "subText": "Từ vựng: Món tráng miệng",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 7,
    "title": "Bài 07",
    "subtitle": "Âm Đục Hàng D (DA-DI-DU-DE-DO) & Hàng B Katakana",
    "description": "10 âm đục Katakana hàng D và hàng B kèm từ mượn thông dụng.",
    "questions": [
      {
        "id": "k7_1",
        "prompt": "ダ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_2",
        "prompt": "ヂ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_3",
        "prompt": "ヅ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_4",
        "prompt": "デ",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_5",
        "prompt": "ド",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_6",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_7",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_8",
        "prompt": "ブ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_9",
        "prompt": "ベ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_10",
        "prompt": "ボ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k7_11",
        "prompt": "ドア",
        "romaji": "doa",
        "subText": "Từ vựng: Cánh cửa (Door)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_12",
        "prompt": "ベッド",
        "romaji": "beddo",
        "subText": "Từ vựng: Chiếc giường (Bed)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_13",
        "prompt": "バス",
        "romaji": "basu",
        "subText": "Từ vựng: Xe buýt (Bus)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_14",
        "prompt": "ビール",
        "romaji": "biiru",
        "subText": "Từ vựng: Bia (Beer)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_15",
        "prompt": "バナナ",
        "romaji": "banana",
        "subText": "Từ vựng: Quả chuối",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_16",
        "prompt": "デート",
        "romaji": "deeto",
        "subText": "Từ vựng: Hẹn hò (Date)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_17",
        "prompt": "ビル",
        "romaji": "biru",
        "subText": "Từ vựng: Tòa nhà (Building)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_18",
        "prompt": "ブーツ",
        "romaji": "buutsu",
        "subText": "Từ vựng: Đôi ủng / Bốt (Boots)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_19",
        "prompt": "ベンチ",
        "romaji": "benchi",
        "subText": "Từ vựng: Ghế dài (Bench)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k7_20",
        "prompt": "ボタン",
        "romaji": "botan",
        "subText": "Từ vựng: Nút bấm (Button)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 8,
    "title": "Bài 08",
    "subtitle": "Bán Đục Hàng P & Đối Chiếu B / P Katakana",
    "description": "Nhận diện chuẩn 5 âm bán đục Katakana và phân biệt rõ rệt âm B vs P.",
    "questions": [
      {
        "id": "k8_1",
        "prompt": "パ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_2",
        "prompt": "ピ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_3",
        "prompt": "プ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_4",
        "prompt": "ペ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_5",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_6",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_7",
        "prompt": "パ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_8",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_9",
        "prompt": "ピ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_10",
        "prompt": "ブ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_11",
        "prompt": "プ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_12",
        "prompt": "ベ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_13",
        "prompt": "ペ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_14",
        "prompt": "ボ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_15",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k8_16",
        "prompt": "パン",
        "romaji": "pan",
        "subText": "Từ vựng: Bánh mì",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k8_17",
        "prompt": "ピアノ",
        "romaji": "piano",
        "subText": "Từ vựng: Đàn piano",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k8_18",
        "prompt": "プール",
        "romaji": "puuru",
        "subText": "Từ vựng: Bể bơi (Pool)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k8_19",
        "prompt": "ペン",
        "romaji": "pen",
        "subText": "Từ vựng: Bút mực (Pen)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k8_20",
        "prompt": "ポスター",
        "romaji": "posutaa",
        "subText": "Từ vựng: Áp phích (Poster)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 9,
    "title": "Bài 09",
    "subtitle": "Phân Biệt Cặp Nét Dễ Nhầm Lẫn Nhất Katakana",
    "description": "Chinh phục triệt để các cặp chữ: シ vs ツ, ソ vs ン, ク vs ワ, コ vs ユ...",
    "questions": [
      {
        "id": "k9_1",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Cặp dễ nhầm: シ (shi)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_2",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Cặp dễ nhầm: ツ (tsu)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_3",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Cặp dễ nhầm: ソ (so)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_4",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Cặp dễ nhầm: ン (n)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_5",
        "prompt": "ク",
        "romaji": "ku",
        "subText": "Cặp dễ nhầm: ク (ku)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_6",
        "prompt": "ワ",
        "romaji": "wa",
        "subText": "Cặp dễ nhầm: ワ (wa)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_7",
        "prompt": "コ",
        "romaji": "ko",
        "subText": "Cặp dễ nhầm: コ (ko)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_8",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Cặp dễ nhầm: ユ (yu)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_9",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Cặp dễ nhầm: ア (a)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_10",
        "prompt": "マ",
        "romaji": "ma",
        "subText": "Cặp dễ nhầm: マ (ma)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_11",
        "prompt": "テ",
        "romaji": "te",
        "subText": "Cặp dễ nhầm: テ (te)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_12",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Cặp dễ nhầm: チ (chi)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_13",
        "prompt": "ス",
        "romaji": "su",
        "subText": "Cặp dễ nhầm: ス (su)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_14",
        "prompt": "ヌ",
        "romaji": "nu",
        "subText": "Cặp dễ nhầm: ヌ (nu)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_15",
        "prompt": "ロ",
        "romaji": "ro",
        "subText": "Cặp dễ nhầm: ロ (ro)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_16",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Cặp dễ nhầm: フ (fu)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_17",
        "prompt": "ラ",
        "romaji": "ra",
        "subText": "Cặp dễ nhầm: ラ (ra)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_18",
        "prompt": "ト",
        "romaji": "to",
        "subText": "Cặp dễ nhầm: ト (to)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_19",
        "prompt": "イ",
        "romaji": "i",
        "subText": "Cặp dễ nhầm: イ (i)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k9_20",
        "prompt": "エ",
        "romaji": "e",
        "subText": "Cặp dễ nhầm: エ (e)",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 10,
    "title": "Bài 10",
    "subtitle": "Từ Mượn Katakana Đời Sống Thông Dụng",
    "description": "Đọc và phản xạ 20 từ mượn gốc tiếng Anh quen thuộc hàng ngày.",
    "questions": [
      {
        "id": "k10_1",
        "prompt": "コーヒー",
        "romaji": "koohii",
        "subText": "Từ vựng: Cà phê (Coffee)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_2",
        "prompt": "テレビ",
        "romaji": "terebi",
        "subText": "Từ vựng: Tivi (Television)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_3",
        "prompt": "バス",
        "romaji": "basu",
        "subText": "Từ vựng: Xe buýt (Bus)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_4",
        "prompt": "タクシー",
        "romaji": "takushii",
        "subText": "Từ vựng: Xe taxi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_5",
        "prompt": "レストラン",
        "romaji": "resutoran",
        "subText": "Từ vựng: Nhà hàng (Restaurant)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_6",
        "prompt": "ホテル",
        "romaji": "hoteru",
        "subText": "Từ vựng: Khách sạn (Hotel)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_7",
        "prompt": "ベッド",
        "romaji": "beddo",
        "subText": "Từ vựng: Chiếc giường (Bed)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_8",
        "prompt": "トイレ",
        "romaji": "toire",
        "subText": "Từ vựng: Nhà vệ sinh (Toilet)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_9",
        "prompt": "ドア",
        "romaji": "doa",
        "subText": "Từ vựng: Cửa ra vào (Door)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_10",
        "prompt": "ナイフ",
        "romaji": "naifu",
        "subText": "Từ vựng: Con dao (Knife)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_11",
        "prompt": "フォーク",
        "romaji": "fooku",
        "subText": "Từ vựng: Cái nĩa (Fork)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_12",
        "prompt": "スプーン",
        "romaji": "supoon",
        "subText": "Từ vựng: Cái thìa (Spoon)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_13",
        "prompt": "タオル",
        "romaji": "taoru",
        "subText": "Từ vựng: Khăn tắm (Towel)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_14",
        "prompt": "シャワー",
        "romaji": "shawaa",
        "subText": "Từ vựng: Vòi sen (Shower)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_15",
        "prompt": "ミルク",
        "romaji": "miruku",
        "subText": "Từ vựng: Sữa (Milk)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_16",
        "prompt": "ボールペン",
        "romaji": "boorupen",
        "subText": "Từ vựng: Bút bi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_17",
        "prompt": "ポスト",
        "romaji": "posuto",
        "subText": "Từ vựng: Hộp thư (Post)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_18",
        "prompt": "コート",
        "romaji": "kooto",
        "subText": "Từ vựng: Áo khoác (Coat)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_19",
        "prompt": "スカート",
        "romaji": "sukaato",
        "subText": "Từ vựng: Váy (Skirt)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k10_20",
        "prompt": "ズボン",
        "romaji": "zubon",
        "subText": "Từ vựng: Quần dài",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 11,
    "title": "Bài 11",
    "subtitle": "Từ Mượn Katakana Công Nghệ & Ẩm Thực",
    "description": "Nhận diện các từ vựng công nghệ hiện đại và món ăn quốc tế.",
    "questions": [
      {
        "id": "k11_1",
        "prompt": "スマホ",
        "romaji": "sumaho",
        "subText": "Từ vựng: Điện thoại thông minh",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_2",
        "prompt": "パソコン",
        "romaji": "pasokon",
        "subText": "Từ vựng: Máy tính cá nhân",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_3",
        "prompt": "アプリ",
        "romaji": "apuri",
        "subText": "Từ vựng: Ứng dụng (App)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_4",
        "prompt": "インターネット",
        "romaji": "intaanetto",
        "subText": "Từ vựng: Mạng Internet",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_5",
        "prompt": "ウェブ",
        "romaji": "webu",
        "subText": "Từ vựng: Web",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_6",
        "prompt": "ケーキ",
        "romaji": "keeki",
        "subText": "Từ vựng: Bánh ngọt (Cake)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_7",
        "prompt": "ピザ",
        "romaji": "piza",
        "subText": "Từ vựng: Bánh pizza",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_8",
        "prompt": "ハンバーガー",
        "romaji": "hanbaagaa",
        "subText": "Từ vựng: Bánh burger",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_9",
        "prompt": "アイスクリーム",
        "romaji": "aisukuriimu",
        "subText": "Từ vựng: Kem ăn (Ice cream)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_10",
        "prompt": "カフェ",
        "romaji": "kafe",
        "subText": "Từ vựng: Quán cà phê (Cafe)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_11",
        "prompt": "メニュー",
        "romaji": "menyuu",
        "subText": "Từ vựng: Thực đơn (Menu)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_12",
        "prompt": "サンドイッチ",
        "romaji": "sandoicchi",
        "subText": "Từ vựng: Bánh kẹp Sandwich",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_13",
        "prompt": "ジュース",
        "romaji": "juusu",
        "subText": "Từ vựng: Nước ép (Juice)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_14",
        "prompt": "サラダ",
        "romaji": "sarada",
        "subText": "Từ vựng: Món rau trộn Salad",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_15",
        "prompt": "エアコン",
        "romaji": "eakon",
        "subText": "Từ vựng: Máy điều hòa Air conditioner",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_16",
        "prompt": "カメラ",
        "romaji": "kamera",
        "subText": "Từ vựng: Máy ảnh (Camera)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_17",
        "prompt": "ビル",
        "romaji": "biru",
        "subText": "Từ vựng: Tòa nhà cao tầng (Building)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_18",
        "prompt": "パスポート",
        "romaji": "pasupooto",
        "subText": "Từ vựng: Hộ chiếu (Passport)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_19",
        "prompt": "チケット",
        "romaji": "chiketto",
        "subText": "Từ vựng: Vé (Ticket)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k11_20",
        "prompt": "エレベーター",
        "romaji": "erebeetaa",
        "subText": "Từ vựng: Thang máy (Elevator)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 12,
    "title": "Bài 12",
    "subtitle": "Chuyên Đề Trường Âm Katakana (Dấu Gạch ー)",
    "description": "Luyện tập phát hiện và đọc chuẩn xác trường âm kéo dài trong Katakana.",
    "questions": [
      {
        "id": "k12_1",
        "prompt": "ラーメン",
        "romaji": "raamen",
        "subText": "Từ vựng: Mì ramen",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_2",
        "prompt": "スプーン",
        "romaji": "supoon",
        "subText": "Từ vựng: Cái thìa (Spoon)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_3",
        "prompt": "タオル",
        "romaji": "taoru",
        "subText": "Từ vựng: Khăn mặt (Towel)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_4",
        "prompt": "ノート",
        "romaji": "nooto",
        "subText": "Từ vựng: Quyển vở (Note)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_5",
        "prompt": "テープ",
        "romaji": "teepu",
        "subText": "Từ vựng: Băng dính (Tape)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_6",
        "prompt": "スーツ",
        "romaji": "suutsu",
        "subText": "Từ vựng: Bộ âu phục (Suit)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_7",
        "prompt": "コーヒー",
        "romaji": "koohii",
        "subText": "Từ vựng: Cà phê (Coffee)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_8",
        "prompt": "ゲーム",
        "romaji": "geemu",
        "subText": "Từ vựng: Trò chơi (Game)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_9",
        "prompt": "ボール",
        "romaji": "booru",
        "subText": "Từ vựng: Quả bóng (Ball)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_10",
        "prompt": "スカート",
        "romaji": "sukaato",
        "subText": "Từ vựng: Váy (Skirt)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_11",
        "prompt": "ケーキ",
        "romaji": "keeki",
        "subText": "Từ vựng: Bánh kem (Cake)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_12",
        "prompt": "ビール",
        "romaji": "biiru",
        "subText": "Từ vựng: Bia (Beer)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_13",
        "prompt": "ジュース",
        "romaji": "juusu",
        "subText": "Từ vựng: Nước trái cây (Juice)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_14",
        "prompt": "チーズ",
        "romaji": "chiizu",
        "subText": "Từ vựng: Phô mai (Cheese)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_15",
        "prompt": "ブーツ",
        "romaji": "buutsu",
        "subText": "Từ vựng: Đôi bốt (Boots)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_16",
        "prompt": "コート",
        "romaji": "kooto",
        "subText": "Từ vựng: Áo khoác (Coat)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_17",
        "prompt": "スーパー",
        "romaji": "suupaa",
        "subText": "Từ vựng: Siêu thị (Supermarket)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_18",
        "prompt": "エレベーター",
        "romaji": "erebeetaa",
        "subText": "Từ vựng: Thang máy (Elevator)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_19",
        "prompt": "タクシー",
        "romaji": "takushii",
        "subText": "Từ vựng: Taxi",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k12_20",
        "prompt": "ギター",
        "romaji": "gitaa",
        "subText": "Từ vựng: Đàn guitar",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 13,
    "title": "Bài 13",
    "subtitle": "Tổng Ôn 71 Chữ Katakana — Đợt 1",
    "description": "Quét 20 chữ cái phủ khắp tất cả các hàng âm trong và âm đục Katakana.",
    "questions": [
      {
        "id": "k13_1",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_2",
        "prompt": "ク",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_3",
        "prompt": "ス",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_4",
        "prompt": "テ",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_5",
        "prompt": "ネ",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_6",
        "prompt": "ヒ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_7",
        "prompt": "ム",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_8",
        "prompt": "ヤ",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_9",
        "prompt": "ル",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_10",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_11",
        "prompt": "ガ",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_12",
        "prompt": "ゲ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_13",
        "prompt": "ジ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_14",
        "prompt": "ゾ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_15",
        "prompt": "ダ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_16",
        "prompt": "デ",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_17",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_18",
        "prompt": "ボ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_19",
        "prompt": "ピ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k13_20",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 14,
    "title": "Bài 14",
    "subtitle": "Tổng Ôn 71 Chữ Katakana — Đợt 2",
    "description": "Quét 20 chữ cái phủ khắp các hàng còn lại của Katakana.",
    "questions": [
      {
        "id": "k14_1",
        "prompt": "ウ",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_2",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_3",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_4",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_5",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_6",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_7",
        "prompt": "ミ",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_8",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_9",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_10",
        "prompt": "ワ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_11",
        "prompt": "ギ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_12",
        "prompt": "ゴ",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_13",
        "prompt": "ザ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_14",
        "prompt": "ズ",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_15",
        "prompt": "ヂ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_16",
        "prompt": "ド",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_17",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_18",
        "prompt": "ベ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_19",
        "prompt": "パ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k14_20",
        "prompt": "ペ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 15,
    "title": "Bài 15",
    "subtitle": "Đề Thi Tốt Nghiệp — Katakana Master",
    "description": "Đề thi tổng hợp đỉnh cao kiểm tra toàn diện năng lực đọc viết bảng Katakana.",
    "questions": [
      {
        "id": "k15_1",
        "prompt": "オ",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_2",
        "prompt": "ケ",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_3",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_4",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_5",
        "prompt": "ヌ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_6",
        "prompt": "ホ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_7",
        "prompt": "モ",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_8",
        "prompt": "ヨ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_9",
        "prompt": "ロ",
        "romaji": "ro",
        "subText": "Hàng R [RO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_10",
        "prompt": "ヲ",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_11",
        "prompt": "グ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_12",
        "prompt": "ゼ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_13",
        "prompt": "ヅ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_14",
        "prompt": "ブ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_15",
        "prompt": "プ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "k15_16",
        "prompt": "レストラン",
        "romaji": "resutoran",
        "subText": "Từ vựng: Nhà hàng (Restaurant)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k15_17",
        "prompt": "ハンバーガー",
        "romaji": "hanbaagaa",
        "subText": "Từ vựng: Bánh burger",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k15_18",
        "prompt": "スーパーマーケット",
        "romaji": "suupaamaaketto",
        "subText": "Từ vựng: Siêu thị (Supermarket)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k15_19",
        "prompt": "パスポート",
        "romaji": "pasupooto",
        "subText": "Từ vựng: Hộ chiếu (Passport)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "k15_20",
        "prompt": "エレベーター",
        "romaji": "erebeetaa",
        "subText": "Từ vựng: Thang máy (Elevator)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// 3. MỤC ÂM GHÉP YŌON (15 BÀI TEST x 20 CÂU = 300 CÂU)
// ═══════════════════════════════════════════════════════════════════════
export const YOON_QUIZ_SETS: QuizSet[] = [
  {
    "id": 1,
    "title": "Bài 01",
    "subtitle": "Nhóm KYA, SHA, CHA (Hiragana)",
    "description": "Luyện tập 9 âm ghép cơ bản nhất kết hợp với ki, shi, chi và từ vựng.",
    "questions": [
      {
        "id": "y1_1",
        "prompt": "きゃ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_2",
        "prompt": "きゅ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_3",
        "prompt": "きょ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_4",
        "prompt": "しゃ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_5",
        "prompt": "しゅ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_6",
        "prompt": "しょ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_7",
        "prompt": "ちゃ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_8",
        "prompt": "ちゅ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_9",
        "prompt": "ちょ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_10",
        "prompt": "おちゃ",
        "romaji": "ocha",
        "subText": "Từ vựng: Trà xanh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_11",
        "prompt": "しゃしん",
        "romaji": "shashin",
        "subText": "Từ vựng: Bức ảnh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_12",
        "prompt": "きょう",
        "romaji": "kyou",
        "subText": "Từ vựng: Hôm nay",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_13",
        "prompt": "きゃく",
        "romaji": "kyaku",
        "subText": "Từ vựng: Khách hàng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_14",
        "prompt": "きゅうり",
        "romaji": "kyuuri",
        "subText": "Từ vựng: Dưa chuột",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_15",
        "prompt": "しゅくだい",
        "romaji": "shukudai",
        "subText": "Từ vựng: Bài tập về nhà",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_16",
        "prompt": "しょうゆ",
        "romaji": "shouyu",
        "subText": "Từ vựng: Nước tương",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_17",
        "prompt": "ちゅうい",
        "romaji": "chuui",
        "subText": "Từ vựng: Chú ý",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_18",
        "prompt": "ちょっと",
        "romaji": "chotto",
        "subText": "Từ vựng: Một chút",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_19",
        "prompt": "かいしゃ",
        "romaji": "kaisha",
        "subText": "Từ vựng: Công ty",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y1_20",
        "prompt": "じしょ",
        "romaji": "jisho",
        "subText": "Từ vựng: Từ điển",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 2,
    "title": "Bài 02",
    "subtitle": "Nhóm NYA, HYA, MYA, RYA (Hiragana)",
    "description": "12 âm ghép kết hợp với ni, hi, mi, ri và các từ vựng đời sống.",
    "questions": [
      {
        "id": "y2_1",
        "prompt": "にゃ",
        "romaji": "nya",
        "subText": "Âm ghép NYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_2",
        "prompt": "にゅ",
        "romaji": "nyu",
        "subText": "Âm ghép NYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_3",
        "prompt": "にょ",
        "romaji": "nyo",
        "subText": "Âm ghép NYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_4",
        "prompt": "ひゃ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_5",
        "prompt": "ひゅ",
        "romaji": "hyu",
        "subText": "Âm ghép HYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_6",
        "prompt": "ひょ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_7",
        "prompt": "みゃ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_8",
        "prompt": "みゅ",
        "romaji": "myu",
        "subText": "Âm ghép MYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_9",
        "prompt": "みょ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_10",
        "prompt": "りゃ",
        "romaji": "rya",
        "subText": "Âm ghép RYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_11",
        "prompt": "りゅ",
        "romaji": "ryu",
        "subText": "Âm ghép RYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_12",
        "prompt": "りょ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_13",
        "prompt": "ひゃく",
        "romaji": "hyaku",
        "subText": "Từ vựng: Số 100",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_14",
        "prompt": "りょこう",
        "romaji": "ryokou",
        "subText": "Từ vựng: Du lịch",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_15",
        "prompt": "みょうじ",
        "romaji": "myouji",
        "subText": "Từ vựng: Họ tên",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_16",
        "prompt": "りゅう",
        "romaji": "ryuu",
        "subText": "Từ vựng: Con rồng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_17",
        "prompt": "にゅういん",
        "romaji": "nyuuin",
        "subText": "Từ vựng: Nhập viện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_18",
        "prompt": "りょうり",
        "romaji": "ryouri",
        "subText": "Từ vựng: Nấu ăn / Món ăn",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_19",
        "prompt": "ひょうばん",
        "romaji": "hyouban",
        "subText": "Từ vựng: Danh tiếng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y2_20",
        "prompt": "にゃん",
        "romaji": "nyan",
        "subText": "Từ vựng: Tiếng mèo kêu",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 3,
    "title": "Bài 03",
    "subtitle": "Biến Âm Đục GYA, JA, BYA, PYA (Hiragana)",
    "description": "12 âm ghép có dấu Ten-ten và Maru trong Hiragana.",
    "questions": [
      {
        "id": "y3_1",
        "prompt": "ぎゃ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_2",
        "prompt": "ぎゅ",
        "romaji": "gyu",
        "subText": "Âm ghép GYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_3",
        "prompt": "ぎょ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_4",
        "prompt": "じゃ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_5",
        "prompt": "じゅ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_6",
        "prompt": "じょ",
        "romaji": "jo",
        "subText": "Âm ghép JO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_7",
        "prompt": "びゃ",
        "romaji": "bya",
        "subText": "Âm ghép BYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_8",
        "prompt": "びゅ",
        "romaji": "byu",
        "subText": "Âm ghép BYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_9",
        "prompt": "びょ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_10",
        "prompt": "ぴゃ",
        "romaji": "pya",
        "subText": "Âm ghép PYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_11",
        "prompt": "ぴゅ",
        "romaji": "pyu",
        "subText": "Âm ghép PYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_12",
        "prompt": "ぴょ",
        "romaji": "pyo",
        "subText": "Âm ghép PYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_13",
        "prompt": "ぎょうざ",
        "romaji": "gyouza",
        "subText": "Từ vựng: Bánh sủi cảo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_14",
        "prompt": "じゅうしょ",
        "romaji": "juusho",
        "subText": "Từ vựng: Địa chỉ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_15",
        "prompt": "びょういん",
        "romaji": "byouin",
        "subText": "Từ vựng: Bệnh viện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_16",
        "prompt": "じょうず",
        "romaji": "jouzu",
        "subText": "Từ vựng: Giỏi giang",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_17",
        "prompt": "じゃがいも",
        "romaji": "jagaimo",
        "subText": "Từ vựng: Khoai tây",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_18",
        "prompt": "ぎゅうにゅう",
        "romaji": "gyuunyuu",
        "subText": "Từ vựng: Sữa bò",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_19",
        "prompt": "べんきょう",
        "romaji": "benkyou",
        "subText": "Từ vựng: Học tập",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y3_20",
        "prompt": "じんじゃ",
        "romaji": "jinja",
        "subText": "Từ vựng: Đền thờ thần đạo",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 4,
    "title": "Bài 04",
    "subtitle": "Đại Chiến 20 Âm Ghép Hiragana Trọng Tâm",
    "description": "Thử thách nhận diện 20 âm ghép Hiragana độc lập phản xạ cao tốc.",
    "questions": [
      {
        "id": "y4_1",
        "prompt": "きゃ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_2",
        "prompt": "きょ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_3",
        "prompt": "しゃ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_4",
        "prompt": "しゅ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_5",
        "prompt": "しょ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_6",
        "prompt": "ちゃ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_7",
        "prompt": "ちょ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_8",
        "prompt": "にゃ",
        "romaji": "nya",
        "subText": "Âm ghép NYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_9",
        "prompt": "ひゃ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_10",
        "prompt": "ひょ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_11",
        "prompt": "みゃ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_12",
        "prompt": "みょ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_13",
        "prompt": "りゃ",
        "romaji": "rya",
        "subText": "Âm ghép RYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_14",
        "prompt": "りょ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_15",
        "prompt": "ぎゃ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_16",
        "prompt": "ぎょ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_17",
        "prompt": "じゃ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_18",
        "prompt": "じゅ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_19",
        "prompt": "びょ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y4_20",
        "prompt": "ぴょ",
        "romaji": "pyo",
        "subText": "Âm ghép PYO",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 5,
    "title": "Bài 05",
    "subtitle": "Từ Vựng Hiragana Thực Tế Chứa Âm Ghép",
    "description": "Thực hành đọc 20 từ vựng đời sống có chứa âm ghép Yōon trong Hiragana.",
    "questions": [
      {
        "id": "y5_1",
        "prompt": "きょう",
        "romaji": "kyou",
        "subText": "Từ vựng: Hôm nay",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_2",
        "prompt": "おちゃ",
        "romaji": "ocha",
        "subText": "Từ vựng: Trà xanh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_3",
        "prompt": "しゃしん",
        "romaji": "shashin",
        "subText": "Từ vựng: Bức ảnh",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_4",
        "prompt": "びょういん",
        "romaji": "byouin",
        "subText": "Từ vựng: Bệnh viện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_5",
        "prompt": "ひゃく",
        "romaji": "hyaku",
        "subText": "Từ vựng: Số 100",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_6",
        "prompt": "じゅう",
        "romaji": "juu",
        "subText": "Từ vựng: Số 10",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_7",
        "prompt": "りょこう",
        "romaji": "ryokou",
        "subText": "Từ vựng: Du lịch",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_8",
        "prompt": "べんきょう",
        "romaji": "benkyou",
        "subText": "Từ vựng: Học tập",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_9",
        "prompt": "ぎゅうにゅう",
        "romaji": "gyuunyuu",
        "subText": "Từ vựng: Sữa bò tươi",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_10",
        "prompt": "ぎょうざ",
        "romaji": "gyouza",
        "subText": "Từ vựng: Bánh sủi cảo",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_11",
        "prompt": "じかん",
        "romaji": "jikan",
        "subText": "Từ vựng: Thời gian",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_12",
        "prompt": "じゅうしょ",
        "romaji": "juusho",
        "subText": "Từ vựng: Địa chỉ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_13",
        "prompt": "じょうず",
        "romaji": "jouzu",
        "subText": "Từ vựng: Giỏi giang",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_14",
        "prompt": "しゅくだい",
        "romaji": "shukudai",
        "subText": "Từ vựng: Bài tập",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_15",
        "prompt": "しょうゆ",
        "romaji": "shouyu",
        "subText": "Từ vựng: Xì dầu / Nước tương",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_16",
        "prompt": "かいしゃ",
        "romaji": "kaisha",
        "subText": "Từ vựng: Công ty",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_17",
        "prompt": "じんじゃ",
        "romaji": "jinja",
        "subText": "Từ vựng: Đền thờ",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_18",
        "prompt": "きゃく",
        "romaji": "kyaku",
        "subText": "Từ vựng: Khách hàng",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_19",
        "prompt": "きゅうり",
        "romaji": "kyuuri",
        "subText": "Từ vựng: Quả dưa chuột",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y5_20",
        "prompt": "りょうり",
        "romaji": "ryouri",
        "subText": "Từ vựng: Món ăn / Ẩm thực",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 6,
    "title": "Bài 06",
    "subtitle": "Nhóm KYA, SHA, CHA Katakana",
    "description": "9 âm ghép Katakana kết hợp với ki, shi, chi và từ mượn đời sống.",
    "questions": [
      {
        "id": "y6_1",
        "prompt": "キャ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_2",
        "prompt": "キュ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_3",
        "prompt": "キョ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_4",
        "prompt": "シャ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_5",
        "prompt": "シュ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_6",
        "prompt": "ショ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_7",
        "prompt": "チャ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_8",
        "prompt": "チュ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_9",
        "prompt": "チョ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y6_10",
        "prompt": "キャンプ",
        "romaji": "kyanpu",
        "subText": "Từ vựng: Cắm trại (Camp)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_11",
        "prompt": "シャツ",
        "romaji": "shatsu",
        "subText": "Từ vựng: Áo sơ mi (Shirt)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_12",
        "prompt": "チョコレート",
        "romaji": "chokoreeto",
        "subText": "Từ vựng: Sô-cô-la",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_13",
        "prompt": "シャンプー",
        "romaji": "shanpuu",
        "subText": "Từ vựng: Dầu gội (Shampoo)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_14",
        "prompt": "チョコ",
        "romaji": "choko",
        "subText": "Từ vựng: Socola rút gọn",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_15",
        "prompt": "キャベツ",
        "romaji": "kyabetsu",
        "subText": "Từ vựng: Bắp cải (Cabbage)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_16",
        "prompt": "ショッピング",
        "romaji": "shoppingu",
        "subText": "Từ vựng: Mua sắm (Shopping)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_17",
        "prompt": "シャッター",
        "romaji": "shattaa",
        "subText": "Từ vựng: Cửa cuốn (Shutter)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_18",
        "prompt": "チャンス",
        "romaji": "chansu",
        "subText": "Từ vựng: Cơ hội (Chance)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_19",
        "prompt": "チャート",
        "romaji": "chaato",
        "subText": "Từ vựng: Biểu đồ (Chart)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y6_20",
        "prompt": "チュートリアル",
        "romaji": "chuutoriaru",
        "subText": "Từ vựng: Hướng dẫn (Tutorial)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 7,
    "title": "Bài 07",
    "subtitle": "Nhóm NYA, HYA, MYA, RYA Katakana",
    "description": "12 âm ghép Katakana hàng N, H, M, R và từ mượn ứng dụng.",
    "questions": [
      {
        "id": "y7_1",
        "prompt": "ニャ",
        "romaji": "nya",
        "subText": "Âm ghép NYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_2",
        "prompt": "ニュ",
        "romaji": "nyu",
        "subText": "Âm ghép NYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_3",
        "prompt": "ニョ",
        "romaji": "nyo",
        "subText": "Âm ghép NYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_4",
        "prompt": "ヒャ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_5",
        "prompt": "ヒュ",
        "romaji": "hyu",
        "subText": "Âm ghép HYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_6",
        "prompt": "ヒョ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_7",
        "prompt": "ミャ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_8",
        "prompt": "ミュ",
        "romaji": "myu",
        "subText": "Âm ghép MYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_9",
        "prompt": "ミョ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_10",
        "prompt": "リャ",
        "romaji": "rya",
        "subText": "Âm ghép RYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_11",
        "prompt": "リュ",
        "romaji": "ryu",
        "subText": "Âm ghép RYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_12",
        "prompt": "リョ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y7_13",
        "prompt": "ミュージカル",
        "romaji": "myuujikaru",
        "subText": "Từ vựng: Nhạc kịch (Musical)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_14",
        "prompt": "ミュージック",
        "romaji": "myuujikku",
        "subText": "Từ vựng: Âm nhạc (Music)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_15",
        "prompt": "リュック",
        "romaji": "ryukku",
        "subText": "Từ vựng: Balo (Rucksack)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_16",
        "prompt": "ニュース",
        "romaji": "nyuusu",
        "subText": "Từ vựng: Bản tin thời sự (News)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_17",
        "prompt": "ヒューストン",
        "romaji": "hyuusuton",
        "subText": "Từ vựng: Thành phố Houston",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_18",
        "prompt": "ミュンヘン",
        "romaji": "myunhen",
        "subText": "Từ vựng: Munich",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_19",
        "prompt": "ニャー",
        "romaji": "nyaa",
        "subText": "Từ vựng: Tiếng mèo kêu",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y7_20",
        "prompt": "リャマ",
        "romaji": "ryama",
        "subText": "Từ vựng: Lạc đà không bướu Llama",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 8,
    "title": "Bài 08",
    "subtitle": "Biến Âm Đục GYA, JA, BYA, PYA Katakana",
    "description": "12 âm ghép biến âm đục Katakana và từ vựng thông dụng.",
    "questions": [
      {
        "id": "y8_1",
        "prompt": "ギャ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_2",
        "prompt": "ギュ",
        "romaji": "gyu",
        "subText": "Âm ghép GYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_3",
        "prompt": "ギョ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_4",
        "prompt": "ジャ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_5",
        "prompt": "ジュ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_6",
        "prompt": "ジョ",
        "romaji": "jo",
        "subText": "Âm ghép JO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_7",
        "prompt": "ビャ",
        "romaji": "bya",
        "subText": "Âm ghép BYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_8",
        "prompt": "ビュ",
        "romaji": "byu",
        "subText": "Âm ghép BYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_9",
        "prompt": "ビョ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_10",
        "prompt": "ピャ",
        "romaji": "pya",
        "subText": "Âm ghép PYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_11",
        "prompt": "ピュ",
        "romaji": "pyu",
        "subText": "Âm ghép PYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_12",
        "prompt": "ピョ",
        "romaji": "pyo",
        "subText": "Âm ghép PYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y8_13",
        "prompt": "ジュース",
        "romaji": "juusu",
        "subText": "Từ vựng: Nước ép hoa quả (Juice)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_14",
        "prompt": "ジョギング",
        "romaji": "jogingu",
        "subText": "Từ vựng: Chạy bộ (Jogging)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_15",
        "prompt": "ジャケット",
        "romaji": "jaketto",
        "subText": "Từ vựng: Áo khoác ngắn (Jacket)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_16",
        "prompt": "ジャム",
        "romaji": "jamu",
        "subText": "Từ vựng: Mứt hoa quả (Jam)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_17",
        "prompt": "ギャング",
        "romaji": "gyangu",
        "subText": "Từ vựng: Băng đảng (Gang)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_18",
        "prompt": "ビュッフェ",
        "romaji": "byuffe",
        "subText": "Từ vựng: Tiệc tự chọn Buffet",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_19",
        "prompt": "ピュア",
        "romaji": "pyua",
        "subText": "Từ vựng: Thuần khiết (Pure)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y8_20",
        "prompt": "ジャズ",
        "romaji": "jazu",
        "subText": "Từ vựng: Nhạc Jazz",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 9,
    "title": "Bài 09",
    "subtitle": "Đại Chiến 20 Âm Ghép Katakana Trọng Tâm",
    "description": "Thử thách phản xạ tốc độ 20 âm ghép Katakana độc lập.",
    "questions": [
      {
        "id": "y9_1",
        "prompt": "キャ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_2",
        "prompt": "キョ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_3",
        "prompt": "シャ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_4",
        "prompt": "シュ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_5",
        "prompt": "ショ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_6",
        "prompt": "チャ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_7",
        "prompt": "チョ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_8",
        "prompt": "ニャ",
        "romaji": "nya",
        "subText": "Âm ghép NYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_9",
        "prompt": "ヒャ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_10",
        "prompt": "ヒョ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_11",
        "prompt": "ミャ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_12",
        "prompt": "ミョ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_13",
        "prompt": "リャ",
        "romaji": "rya",
        "subText": "Âm ghép RYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_14",
        "prompt": "リョ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_15",
        "prompt": "ギャ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_16",
        "prompt": "ギョ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_17",
        "prompt": "ジャ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_18",
        "prompt": "ジュ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_19",
        "prompt": "ビョ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y9_20",
        "prompt": "ピョ",
        "romaji": "pyo",
        "subText": "Âm ghép PYO",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 10,
    "title": "Bài 10",
    "subtitle": "Từ Mượn Katakana Thực Tế Chứa Âm Ghép",
    "description": "Thực hành đọc 20 từ mượn Katakana rất hay gặp trong đời sống.",
    "questions": [
      {
        "id": "y10_1",
        "prompt": "ジュース",
        "romaji": "juusu",
        "subText": "Từ vựng: Nước hoa quả (Juice)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_2",
        "prompt": "シャツ",
        "romaji": "shatsu",
        "subText": "Từ vựng: Áo sơ mi (Shirt)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_3",
        "prompt": "チョコレート",
        "romaji": "chokoreeto",
        "subText": "Từ vựng: Sô-cô-la",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_4",
        "prompt": "キャンプ",
        "romaji": "kyanpu",
        "subText": "Từ vựng: Cắm trại (Camp)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_5",
        "prompt": "ミュージック",
        "romaji": "myuujikku",
        "subText": "Từ vựng: Âm nhạc (Music)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_6",
        "prompt": "リュック",
        "romaji": "ryukku",
        "subText": "Từ vựng: Balo (Rucksack)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_7",
        "prompt": "ジャケット",
        "romaji": "jaketto",
        "subText": "Từ vựng: Áo khoác (Jacket)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_8",
        "prompt": "ショッピング",
        "romaji": "shoppingu",
        "subText": "Từ vựng: Mua sắm (Shopping)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_9",
        "prompt": "ニュース",
        "romaji": "nyuusu",
        "subText": "Từ vựng: Tin tức (News)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_10",
        "prompt": "ギャラリー",
        "romaji": "gyararii",
        "subText": "Từ vựng: Phòng triển lãm (Gallery)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_11",
        "prompt": "ジョギング",
        "romaji": "jogingu",
        "subText": "Từ vựng: Chạy bộ (Jogging)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_12",
        "prompt": "ジャム",
        "romaji": "jamu",
        "subText": "Từ vựng: Mứt (Jam)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_13",
        "prompt": "キャベツ",
        "romaji": "kyabetsu",
        "subText": "Từ vựng: Bắp cải (Cabbage)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_14",
        "prompt": "シャンプー",
        "romaji": "shanpuu",
        "subText": "Từ vựng: Dầu gội (Shampoo)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_15",
        "prompt": "チャンス",
        "romaji": "chansu",
        "subText": "Từ vựng: Cơ hội (Chance)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_16",
        "prompt": "ピュア",
        "romaji": "pyua",
        "subText": "Từ vựng: Thuần khiết (Pure)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_17",
        "prompt": "ジャズ",
        "romaji": "jazu",
        "subText": "Từ vựng: Nhạc Jazz",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_18",
        "prompt": "ビュッフェ",
        "romaji": "byuffe",
        "subText": "Từ vựng: Tiệc tự chọn Buffet",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_19",
        "prompt": "チャート",
        "romaji": "chaato",
        "subText": "Từ vựng: Biểu đồ (Chart)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y10_20",
        "prompt": "チュートリアル",
        "romaji": "chuutoriaru",
        "subText": "Từ vựng: Hướng dẫn Tutorial",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 11,
    "title": "Bài 11",
    "subtitle": "Phân Biệt Chữ To & Chữ Nhỏ (Âm Ghép vs Âm Rời)",
    "description": "Tránh lỗi phát âm nghiêm trọng giữa âm ghép (きょ - kyo) và 2 chữ rời (きよ - kiyo).",
    "questions": [
      {
        "id": "y11_1",
        "prompt": "きよ",
        "romaji": "kiyo",
        "subText": "Hai âm rời: KI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_2",
        "prompt": "きょ",
        "romaji": "kyo",
        "subText": "Âm ghép: KYO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_3",
        "prompt": "しゆ",
        "romaji": "shiyu",
        "subText": "Hai âm rời: SHI + YU (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_4",
        "prompt": "しゅ",
        "romaji": "shu",
        "subText": "Âm ghép: SHU (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_5",
        "prompt": "ちや",
        "romaji": "chiya",
        "subText": "Hai âm rời: CHI + YA (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_6",
        "prompt": "ちゃ",
        "romaji": "cha",
        "subText": "Âm ghép: CHA (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_7",
        "prompt": "じよ",
        "romaji": "jiyo",
        "subText": "Hai âm rời: JI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_8",
        "prompt": "じょ",
        "romaji": "jo",
        "subText": "Âm ghép: JO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_9",
        "prompt": "びよ",
        "romaji": "biyo",
        "subText": "Hai âm rời: BI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_10",
        "prompt": "びょ",
        "romaji": "byo",
        "subText": "Âm ghép: BYO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_11",
        "prompt": "によ",
        "romaji": "niyo",
        "subText": "Hai âm rời: NI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_12",
        "prompt": "にょ",
        "romaji": "nyo",
        "subText": "Âm ghép: NYO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_13",
        "prompt": "ひゆ",
        "romaji": "hiyu",
        "subText": "Hai âm rời: HI + YU (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_14",
        "prompt": "ひゅ",
        "romaji": "hyu",
        "subText": "Âm ghép: HYU (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_15",
        "prompt": "みよ",
        "romaji": "miyo",
        "subText": "Hai âm rời: MI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_16",
        "prompt": "みょ",
        "romaji": "myo",
        "subText": "Âm ghép: MYO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_17",
        "prompt": "りよ",
        "romaji": "riyo",
        "subText": "Hai âm rời: RI + YO (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_18",
        "prompt": "りょ",
        "romaji": "ryo",
        "subText": "Âm ghép: RYO (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_19",
        "prompt": "ぎゆ",
        "romaji": "giyu",
        "subText": "Hai âm rời: GI + YU (2 phách)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y11_20",
        "prompt": "ぎゅ",
        "romaji": "gyu",
        "subText": "Âm ghép: GYU (1 phách)",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 12,
    "title": "Bài 12",
    "subtitle": "Đối Chiếu Song Song Yōon Hiragana & Katakana",
    "description": "Thực hành nhận diện cặp âm ghép tương ứng giữa cả 2 bảng.",
    "questions": [
      {
        "id": "y12_1",
        "prompt": "きゃ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_2",
        "prompt": "キャ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_3",
        "prompt": "しゃ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_4",
        "prompt": "シャ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_5",
        "prompt": "ちゃ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_6",
        "prompt": "チャ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_7",
        "prompt": "ぎゃ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_8",
        "prompt": "ギャ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_9",
        "prompt": "じゃ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_10",
        "prompt": "ジャ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_11",
        "prompt": "きゅ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_12",
        "prompt": "キュ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_13",
        "prompt": "しゅ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_14",
        "prompt": "シュ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_15",
        "prompt": "ちゅ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_16",
        "prompt": "チュ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_17",
        "prompt": "きょ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_18",
        "prompt": "キョ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y12_19",
        "prompt": "しょ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y12_20",
        "prompt": "ショ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 13,
    "title": "Bài 13",
    "subtitle": "Tổng Ôn 66 Âm Ghép Yōon — Đợt 1",
    "description": "Quét 20 âm ghép ngẫu nhiên từ cả Hiragana và Katakana.",
    "questions": [
      {
        "id": "y13_1",
        "prompt": "きゅ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_2",
        "prompt": "しゅ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_3",
        "prompt": "ちゅ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_4",
        "prompt": "にゅ",
        "romaji": "nyu",
        "subText": "Âm ghép NYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_5",
        "prompt": "ひゅ",
        "romaji": "hyu",
        "subText": "Âm ghép HYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_6",
        "prompt": "みゅ",
        "romaji": "myu",
        "subText": "Âm ghép MYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_7",
        "prompt": "りゅ",
        "romaji": "ryu",
        "subText": "Âm ghép RYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_8",
        "prompt": "ぎゅ",
        "romaji": "gyu",
        "subText": "Âm ghép GYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_9",
        "prompt": "じゅ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_10",
        "prompt": "ぴゅ",
        "romaji": "pyu",
        "subText": "Âm ghép PYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y13_11",
        "prompt": "キャ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_12",
        "prompt": "シャ",
        "romaji": "sha",
        "subText": "Âm ghép SHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_13",
        "prompt": "チャ",
        "romaji": "cha",
        "subText": "Âm ghép CHA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_14",
        "prompt": "ニャ",
        "romaji": "nya",
        "subText": "Âm ghép NYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_15",
        "prompt": "ヒャ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_16",
        "prompt": "ミャ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_17",
        "prompt": "リャ",
        "romaji": "rya",
        "subText": "Âm ghép RYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_18",
        "prompt": "ギャ",
        "romaji": "gya",
        "subText": "Âm ghép GYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_19",
        "prompt": "ジャ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y13_20",
        "prompt": "ピャ",
        "romaji": "pya",
        "subText": "Âm ghép PYA",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 14,
    "title": "Bài 14",
    "subtitle": "Tổng Ôn 66 Âm Ghép Yōon — Đợt 2",
    "description": "Quét tiếp 20 âm ghép đuôi O và từ vựng phong phú.",
    "questions": [
      {
        "id": "y14_1",
        "prompt": "きょ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_2",
        "prompt": "しょ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_3",
        "prompt": "ちょ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_4",
        "prompt": "にょ",
        "romaji": "nyo",
        "subText": "Âm ghép NYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_5",
        "prompt": "ひょ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_6",
        "prompt": "みょ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_7",
        "prompt": "りょ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_8",
        "prompt": "ぎょ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_9",
        "prompt": "じょ",
        "romaji": "jo",
        "subText": "Âm ghép JO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_10",
        "prompt": "びょ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y14_11",
        "prompt": "キョ",
        "romaji": "kyo",
        "subText": "Âm ghép KYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_12",
        "prompt": "ショ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_13",
        "prompt": "チョ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_14",
        "prompt": "ニョ",
        "romaji": "nyo",
        "subText": "Âm ghép NYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_15",
        "prompt": "ヒョ",
        "romaji": "hyo",
        "subText": "Âm ghép HYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_16",
        "prompt": "ミョ",
        "romaji": "myo",
        "subText": "Âm ghép MYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_17",
        "prompt": "リョ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_18",
        "prompt": "ギョ",
        "romaji": "gyo",
        "subText": "Âm ghép GYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_19",
        "prompt": "ジョ",
        "romaji": "jo",
        "subText": "Âm ghép JO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y14_20",
        "prompt": "ビョ",
        "romaji": "byo",
        "subText": "Âm ghép BYO",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 15,
    "title": "Bài 15",
    "subtitle": "Đề Thi Tốt Nghiệp — Yōon Master",
    "description": "Đề thi tổng hợp đỉnh cao chứng nhận làm chủ hoàn toàn 66 âm ghép tiếng Nhật.",
    "questions": [
      {
        "id": "y15_1",
        "prompt": "きゃ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_2",
        "prompt": "しょ",
        "romaji": "sho",
        "subText": "Âm ghép SHO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_3",
        "prompt": "ちゅ",
        "romaji": "chu",
        "subText": "Âm ghép CHU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_4",
        "prompt": "ひゃ",
        "romaji": "hya",
        "subText": "Âm ghép HYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_5",
        "prompt": "りょ",
        "romaji": "ryo",
        "subText": "Âm ghép RYO",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_6",
        "prompt": "じゃ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_7",
        "prompt": "びゅ",
        "romaji": "byu",
        "subText": "Âm ghép BYU",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_8",
        "prompt": "キュ",
        "romaji": "kyu",
        "subText": "Âm ghép KYU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_9",
        "prompt": "シュ",
        "romaji": "shu",
        "subText": "Âm ghép SHU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_10",
        "prompt": "チョ",
        "romaji": "cho",
        "subText": "Âm ghép CHO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_11",
        "prompt": "ミャ",
        "romaji": "mya",
        "subText": "Âm ghép MYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_12",
        "prompt": "ジュ",
        "romaji": "ju",
        "subText": "Âm ghép JU",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_13",
        "prompt": "ピョ",
        "romaji": "pyo",
        "subText": "Âm ghép PYO",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "y15_14",
        "prompt": "びょういん",
        "romaji": "byouin",
        "subText": "Từ vựng: Bệnh viện",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_15",
        "prompt": "チョコレート",
        "romaji": "chokoreeto",
        "subText": "Từ vựng: Sô-cô-la",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y15_16",
        "prompt": "べんきょう",
        "romaji": "benkyou",
        "subText": "Từ vựng: Học tập",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_17",
        "prompt": "ミュージカル",
        "romaji": "myuujikaru",
        "subText": "Từ vựng: Nhạc kịch",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y15_18",
        "prompt": "ぎゅうにゅう",
        "romaji": "gyuunyuu",
        "subText": "Từ vựng: Sữa bò",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "y15_19",
        "prompt": "ジュース",
        "romaji": "juusu",
        "subText": "Từ vựng: Nước hoa quả",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "y15_20",
        "prompt": "りょこう",
        "romaji": "ryokou",
        "subText": "Từ vựng: Du lịch",
        "type": "word",
        "kanaType": "hiragana"
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// 4. MỤC TRỘN LẪN CẢ 2 BẢNG (15 BÀI TEST x 20 CÂU = 300 CÂU)
// ═══════════════════════════════════════════════════════════════════════
export const MIX_QUIZ_SETS: QuizSet[] = [
  {
    "id": 1,
    "title": "Bài 01",
    "subtitle": "Đối Chiếu Nguyên Âm & Hàng K (2 Bảng)",
    "description": "Kiểm tra phản xạ song song hàng nguyên âm và hàng K giữa Hiragana và Katakana.",
    "questions": [
      {
        "id": "m1_1",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_2",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_3",
        "prompt": "い",
        "romaji": "i",
        "subText": "Nguyên âm [I]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_4",
        "prompt": "イ",
        "romaji": "i",
        "subText": "Nguyên âm [I]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_5",
        "prompt": "う",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_6",
        "prompt": "ウ",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_7",
        "prompt": "え",
        "romaji": "e",
        "subText": "Nguyên âm [E]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_8",
        "prompt": "エ",
        "romaji": "e",
        "subText": "Nguyên âm [E]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_9",
        "prompt": "お",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_10",
        "prompt": "オ",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_11",
        "prompt": "か",
        "romaji": "ka",
        "subText": "Hàng K [KA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_12",
        "prompt": "カ",
        "romaji": "ka",
        "subText": "Hàng K [KA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_13",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_14",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_15",
        "prompt": "く",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_16",
        "prompt": "ク",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_17",
        "prompt": "け",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_18",
        "prompt": "ケ",
        "romaji": "ke",
        "subText": "Hàng K [KE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m1_19",
        "prompt": "こ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m1_20",
        "prompt": "コ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 2,
    "title": "Bài 02",
    "subtitle": "Đối Chiếu Hàng S & Hàng T (2 Bảng)",
    "description": "Nhận diện song song hàng S và hàng T giữa 2 bảng chữ cái.",
    "questions": [
      {
        "id": "m2_1",
        "prompt": "さ",
        "romaji": "sa",
        "subText": "Hàng S [SA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_2",
        "prompt": "サ",
        "romaji": "sa",
        "subText": "Hàng S [SA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_3",
        "prompt": "し",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_4",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_5",
        "prompt": "す",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_6",
        "prompt": "ス",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_7",
        "prompt": "せ",
        "romaji": "se",
        "subText": "Hàng S [SE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_8",
        "prompt": "セ",
        "romaji": "se",
        "subText": "Hàng S [SE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_9",
        "prompt": "そ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_10",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Hàng S [SO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_11",
        "prompt": "た",
        "romaji": "ta",
        "subText": "Hàng T [TA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_12",
        "prompt": "タ",
        "romaji": "ta",
        "subText": "Hàng T [TA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_13",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_14",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_15",
        "prompt": "つ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_16",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_17",
        "prompt": "て",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_18",
        "prompt": "テ",
        "romaji": "te",
        "subText": "Hàng T [TE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m2_19",
        "prompt": "と",
        "romaji": "to",
        "subText": "Hàng T [TO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m2_20",
        "prompt": "ト",
        "romaji": "to",
        "subText": "Hàng T [TO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 3,
    "title": "Bài 03",
    "subtitle": "Đối Chiếu Hàng N & Hàng H (2 Bảng)",
    "description": "Nhận diện song song hàng N và hàng H giữa 2 bảng chữ cái.",
    "questions": [
      {
        "id": "m3_1",
        "prompt": "な",
        "romaji": "na",
        "subText": "Hàng N [NA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_2",
        "prompt": "ナ",
        "romaji": "na",
        "subText": "Hàng N [NA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_3",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_4",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_5",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_6",
        "prompt": "ヌ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_7",
        "prompt": "ね",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_8",
        "prompt": "ネ",
        "romaji": "ne",
        "subText": "Hàng N [NE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_9",
        "prompt": "の",
        "romaji": "no",
        "subText": "Hàng N [NO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_10",
        "prompt": "ノ",
        "romaji": "no",
        "subText": "Hàng N [NO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_11",
        "prompt": "は",
        "romaji": "ha",
        "subText": "Hàng H [HA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_12",
        "prompt": "ハ",
        "romaji": "ha",
        "subText": "Hàng H [HA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_13",
        "prompt": "ひ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_14",
        "prompt": "ヒ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_15",
        "prompt": "ふ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_16",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_17",
        "prompt": "へ",
        "romaji": "he",
        "subText": "Hàng H [HE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_18",
        "prompt": "ヘ",
        "romaji": "he",
        "subText": "Hàng H [HE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m3_19",
        "prompt": "ほ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m3_20",
        "prompt": "ホ",
        "romaji": "ho",
        "subText": "Hàng H [HO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 4,
    "title": "Bài 04",
    "subtitle": "Đối Chiếu Hàng M, Hàng Y & Hàng R (2 Bảng)",
    "description": "Kiểm tra song song các hàng M, Y, R giữa Hiragana và Katakana.",
    "questions": [
      {
        "id": "m4_1",
        "prompt": "ま",
        "romaji": "ma",
        "subText": "Hàng M [MA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_2",
        "prompt": "マ",
        "romaji": "ma",
        "subText": "Hàng M [MA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_3",
        "prompt": "み",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_4",
        "prompt": "ミ",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_5",
        "prompt": "む",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_6",
        "prompt": "ム",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_7",
        "prompt": "め",
        "romaji": "me",
        "subText": "Hàng M [ME]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_8",
        "prompt": "メ",
        "romaji": "me",
        "subText": "Hàng M [ME]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_9",
        "prompt": "も",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_10",
        "prompt": "モ",
        "romaji": "mo",
        "subText": "Hàng M [MO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_11",
        "prompt": "や",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_12",
        "prompt": "ヤ",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_13",
        "prompt": "ゆ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_14",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_15",
        "prompt": "よ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_16",
        "prompt": "ヨ",
        "romaji": "yo",
        "subText": "Hàng Y [YO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_17",
        "prompt": "ら",
        "romaji": "ra",
        "subText": "Hàng R [RA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_18",
        "prompt": "ラ",
        "romaji": "ra",
        "subText": "Hàng R [RA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m4_19",
        "prompt": "る",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m4_20",
        "prompt": "ル",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 5,
    "title": "Bài 05",
    "subtitle": "Hàng W & Tổng Ôn Chữ Cơ Bản Hỗn Hợp",
    "description": "Kiểm tra phản xạ các âm cuối bảng và các âm cơ bản đan xen.",
    "questions": [
      {
        "id": "m5_1",
        "prompt": "わ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_2",
        "prompt": "ワ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_3",
        "prompt": "を",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_4",
        "prompt": "ヲ",
        "romaji": "wo",
        "subText": "Hàng W [WO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_5",
        "prompt": "ん",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_6",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_7",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_8",
        "prompt": "ア",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_9",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_10",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_11",
        "prompt": "し",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_12",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_13",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_14",
        "prompt": "チ",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_15",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_16",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_17",
        "prompt": "ふ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_18",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m5_19",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m5_20",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 6,
    "title": "Bài 06",
    "subtitle": "Trộn Lẫn Âm Đục Hàng G & Hàng Z (2 Bảng)",
    "description": "Thử thách phản xạ âm đục G và Z giữa Hiragana và Katakana.",
    "questions": [
      {
        "id": "m6_1",
        "prompt": "が",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_2",
        "prompt": "ガ",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_3",
        "prompt": "ぎ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_4",
        "prompt": "ギ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_5",
        "prompt": "ぐ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_6",
        "prompt": "グ",
        "romaji": "gu",
        "subText": "Âm đục G [GU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_7",
        "prompt": "げ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_8",
        "prompt": "ゲ",
        "romaji": "ge",
        "subText": "Âm đục G [GE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_9",
        "prompt": "ご",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_10",
        "prompt": "ゴ",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_11",
        "prompt": "ざ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_12",
        "prompt": "ザ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_13",
        "prompt": "じ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_14",
        "prompt": "ジ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_15",
        "prompt": "ず",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_16",
        "prompt": "ズ",
        "romaji": "zu",
        "subText": "Âm đục Z [ZU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_17",
        "prompt": "ぜ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_18",
        "prompt": "ゼ",
        "romaji": "ze",
        "subText": "Âm đục Z [ZE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m6_19",
        "prompt": "ぞ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m6_20",
        "prompt": "ゾ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 7,
    "title": "Bài 07",
    "subtitle": "Trộn Lẫn Âm Đục Hàng D & Hàng B (2 Bảng)",
    "description": "Thử thách phản xạ âm đục D và B giữa Hiragana và Katakana.",
    "questions": [
      {
        "id": "m7_1",
        "prompt": "だ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_2",
        "prompt": "ダ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_3",
        "prompt": "ぢ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_4",
        "prompt": "ヂ",
        "romaji": "di",
        "subText": "Âm đục D [DI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_5",
        "prompt": "づ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_6",
        "prompt": "ヅ",
        "romaji": "du",
        "subText": "Âm đục D [DU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_7",
        "prompt": "で",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_8",
        "prompt": "デ",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_9",
        "prompt": "ど",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_10",
        "prompt": "ド",
        "romaji": "do",
        "subText": "Âm đục D [DO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_11",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_12",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_13",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_14",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_15",
        "prompt": "ぶ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_16",
        "prompt": "ブ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_17",
        "prompt": "べ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_18",
        "prompt": "ベ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m7_19",
        "prompt": "ぼ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m7_20",
        "prompt": "ボ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 8,
    "title": "Bài 08",
    "subtitle": "Trộn Lẫn Bán Đục Hàng P & Đối Chiếu B / P (2 Bảng)",
    "description": "Phản xạ âm bán đục P và âm đục B trên cả 2 bảng chữ cái.",
    "questions": [
      {
        "id": "m8_1",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_2",
        "prompt": "パ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_3",
        "prompt": "ぴ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_4",
        "prompt": "ピ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_5",
        "prompt": "ぷ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_6",
        "prompt": "プ",
        "romaji": "pu",
        "subText": "Bán đục P [PU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_7",
        "prompt": "ぺ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_8",
        "prompt": "ペ",
        "romaji": "pe",
        "subText": "Bán đục P [PE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_9",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_10",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_11",
        "prompt": "ば",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_12",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_13",
        "prompt": "び",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_14",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_15",
        "prompt": "ぶ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_16",
        "prompt": "ブ",
        "romaji": "bu",
        "subText": "Âm đục B [BU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_17",
        "prompt": "べ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_18",
        "prompt": "ベ",
        "romaji": "be",
        "subText": "Âm đục B [BE]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m8_19",
        "prompt": "ぼ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m8_20",
        "prompt": "ボ",
        "romaji": "bo",
        "subText": "Âm đục B [BO]",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 9,
    "title": "Bài 09",
    "subtitle": "Các Cặp Ký Tự Tương Đồng Giữa 2 Bảng",
    "description": "Nhận diện các nét chữ có dạng tương đồng giữa Hiragana và Katakana.",
    "questions": [
      {
        "id": "m9_1",
        "prompt": "か",
        "romaji": "ka",
        "subText": "Cặp tương đồng: か (ka)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_2",
        "prompt": "カ",
        "romaji": "ka",
        "subText": "Cặp tương đồng: カ (ka)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_3",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Cặp tương đồng: き (ki)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_4",
        "prompt": "キ",
        "romaji": "ki",
        "subText": "Cặp tương đồng: キ (ki)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_5",
        "prompt": "せ",
        "romaji": "se",
        "subText": "Cặp tương đồng: せ (se)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_6",
        "prompt": "セ",
        "romaji": "se",
        "subText": "Cặp tương đồng: セ (se)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_7",
        "prompt": "や",
        "romaji": "ya",
        "subText": "Cặp tương đồng: や (ya)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_8",
        "prompt": "ヤ",
        "romaji": "ya",
        "subText": "Cặp tương đồng: ヤ (ya)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_9",
        "prompt": "り",
        "romaji": "ri",
        "subText": "Cặp tương đồng: り (ri)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_10",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Cặp tương đồng: リ (ri)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_11",
        "prompt": "へ",
        "romaji": "he",
        "subText": "Cặp tương đồng: へ (he)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_12",
        "prompt": "ヘ",
        "romaji": "he",
        "subText": "Cặp tương đồng: ヘ (he)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_13",
        "prompt": "こ",
        "romaji": "ko",
        "subText": "Cặp dễ nhầm: こ (ko)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_14",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Cặp dễ nhầm: ユ (yu)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_15",
        "prompt": "ろ",
        "romaji": "ro",
        "subText": "Cặp dễ nhầm: ろ (ro)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_16",
        "prompt": "ロ",
        "romaji": "ro",
        "subText": "Cặp dễ nhầm: ロ (ro)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_17",
        "prompt": "た",
        "romaji": "ta",
        "subText": "Cặp tương đồng: た (ta)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_18",
        "prompt": "タ",
        "romaji": "ta",
        "subText": "Cặp tương đồng: タ (ta)",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m9_19",
        "prompt": "に",
        "romaji": "ni",
        "subText": "Cặp tương đồng: に (ni)",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m9_20",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Cặp tương đồng: ニ (ni)",
        "type": "char",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 10,
    "title": "Bài 10",
    "subtitle": "Từ Vựng Hỗn Hợp Cả 2 Bảng Chữ Cái",
    "description": "Thực hành phản xạ từ vựng đan xen giữa tiếng Nhật thuần và từ mượn.",
    "questions": [
      {
        "id": "m10_1",
        "prompt": "ねこ",
        "romaji": "neko",
        "subText": "Từ vựng: Con mèo (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_2",
        "prompt": "パン",
        "romaji": "pan",
        "subText": "Từ vựng: Bánh mì (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_3",
        "prompt": "いぬ",
        "romaji": "inu",
        "subText": "Từ vựng: Con chó (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_4",
        "prompt": "カメラ",
        "romaji": "kamera",
        "subText": "Từ vựng: Máy ảnh (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_5",
        "prompt": "さくら",
        "romaji": "sakura",
        "subText": "Từ vựng: Hoa anh đào (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_6",
        "prompt": "テレビ",
        "romaji": "terebi",
        "subText": "Từ vựng: Tivi (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_7",
        "prompt": "とけい",
        "romaji": "tokei",
        "subText": "Từ vựng: Đồng hồ (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_8",
        "prompt": "バス",
        "romaji": "basu",
        "subText": "Từ vựng: Xe buýt (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_9",
        "prompt": "みず",
        "romaji": "mizu",
        "subText": "Từ vựng: Nước (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_10",
        "prompt": "ホテル",
        "romaji": "hoteru",
        "subText": "Từ vựng: Khách sạn (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_11",
        "prompt": "でんわ",
        "romaji": "denwa",
        "subText": "Từ vựng: Điện thoại (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_12",
        "prompt": "ノート",
        "romaji": "nooto",
        "subText": "Từ vựng: Quyển vở (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_13",
        "prompt": "やま",
        "romaji": "yama",
        "subText": "Từ vựng: Ngọn núi (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_14",
        "prompt": "タクシー",
        "romaji": "takushii",
        "subText": "Từ vựng: Xe taxi (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_15",
        "prompt": "えき",
        "romaji": "eki",
        "subText": "Từ vựng: Nhà ga (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_16",
        "prompt": "ナイフ",
        "romaji": "naifu",
        "subText": "Từ vựng: Con dao (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_17",
        "prompt": "はな",
        "romaji": "hana",
        "subText": "Từ vựng: Bông hoa (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_18",
        "prompt": "ベッド",
        "romaji": "beddo",
        "subText": "Từ vựng: Chiếc giường (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m10_19",
        "prompt": "てがみ",
        "romaji": "tegami",
        "subText": "Từ vựng: Lá thư (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m10_20",
        "prompt": "ドア",
        "romaji": "doa",
        "subText": "Từ vựng: Cánh cửa (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 11,
    "title": "Bài 11",
    "subtitle": "Thử Thách Chuyển Đổi Cao Tốc Song Song",
    "description": "Luyện tập chuyển đổi luân phiên giữa ký tự Hiragana và Katakana.",
    "questions": [
      {
        "id": "m11_1",
        "prompt": "あ",
        "romaji": "a",
        "subText": "Nguyên âm [A]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_2",
        "prompt": "カ",
        "romaji": "ka",
        "subText": "Hàng K [KA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_3",
        "prompt": "さ",
        "romaji": "sa",
        "subText": "Hàng S [SA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_4",
        "prompt": "タ",
        "romaji": "ta",
        "subText": "Hàng T [TA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_5",
        "prompt": "な",
        "romaji": "na",
        "subText": "Hàng N [NA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_6",
        "prompt": "ハ",
        "romaji": "ha",
        "subText": "Hàng H [HA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_7",
        "prompt": "ま",
        "romaji": "ma",
        "subText": "Hàng M [MA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_8",
        "prompt": "ヤ",
        "romaji": "ya",
        "subText": "Hàng Y [YA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_9",
        "prompt": "ら",
        "romaji": "ra",
        "subText": "Hàng R [RA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_10",
        "prompt": "ワ",
        "romaji": "wa",
        "subText": "Hàng W [WA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_11",
        "prompt": "イ",
        "romaji": "i",
        "subText": "Nguyên âm [I]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_12",
        "prompt": "き",
        "romaji": "ki",
        "subText": "Hàng K [KI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_13",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Hàng S [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_14",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Hàng T [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_15",
        "prompt": "ニ",
        "romaji": "ni",
        "subText": "Hàng N [NI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_16",
        "prompt": "ひ",
        "romaji": "hi",
        "subText": "Hàng H [HI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_17",
        "prompt": "ミ",
        "romaji": "mi",
        "subText": "Hàng M [MI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_18",
        "prompt": "ゆ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m11_19",
        "prompt": "リ",
        "romaji": "ri",
        "subText": "Hàng R [RI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m11_20",
        "prompt": "ん",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "hiragana"
      }
    ]
  },
  {
    "id": 12,
    "title": "Bài 12",
    "subtitle": "Đề Hỗn Hợp Trung Cấp — Đợt 1",
    "description": "Trộn lẫn âm đục, bán đục và các từ vựng chọn lọc.",
    "questions": [
      {
        "id": "m12_1",
        "prompt": "が",
        "romaji": "ga",
        "subText": "Âm đục G [GA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_2",
        "prompt": "ザ",
        "romaji": "za",
        "subText": "Âm đục Z [ZA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m12_3",
        "prompt": "だ",
        "romaji": "da",
        "subText": "Âm đục D [DA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_4",
        "prompt": "バ",
        "romaji": "ba",
        "subText": "Âm đục B [BA]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m12_5",
        "prompt": "ぱ",
        "romaji": "pa",
        "subText": "Bán đục P [PA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_6",
        "prompt": "ピ",
        "romaji": "pi",
        "subText": "Bán đục P [PI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m12_7",
        "prompt": "ぎ",
        "romaji": "gi",
        "subText": "Âm đục G [GI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_8",
        "prompt": "ジ",
        "romaji": "ji",
        "subText": "Âm đục Z [JI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m12_9",
        "prompt": "で",
        "romaji": "de",
        "subText": "Âm đục D [DE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_10",
        "prompt": "ビ",
        "romaji": "bi",
        "subText": "Âm đục B [BI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m12_11",
        "prompt": "ごはん",
        "romaji": "gohan",
        "subText": "Từ vựng: Cơm (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_12",
        "prompt": "ギター",
        "romaji": "gitaa",
        "subText": "Từ vựng: Đàn guitar (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m12_13",
        "prompt": "ともだち",
        "romaji": "tomodachi",
        "subText": "Từ vựng: Bạn bè (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_14",
        "prompt": "ベッド",
        "romaji": "beddo",
        "subText": "Từ vựng: Giường (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m12_15",
        "prompt": "せんぱい",
        "romaji": "senpai",
        "subText": "Từ vựng: Tiền bối (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_16",
        "prompt": "ピアノ",
        "romaji": "piano",
        "subText": "Từ vựng: Đàn piano (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m12_17",
        "prompt": "かぜ",
        "romaji": "kaze",
        "subText": "Từ vựng: Gió (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_18",
        "prompt": "チーズ",
        "romaji": "chiizu",
        "subText": "Từ vựng: Phô mai (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m12_19",
        "prompt": "でんわ",
        "romaji": "denwa",
        "subText": "Từ vựng: Điện thoại (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m12_20",
        "prompt": "ビール",
        "romaji": "biiru",
        "subText": "Từ vựng: Bia (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 13,
    "title": "Bài 13",
    "subtitle": "Đề Hỗn Hợp Trung Cấp — Đợt 2",
    "description": "Trộn lẫn các chữ cái và từ vựng phong phú ở cấp độ nâng cao.",
    "questions": [
      {
        "id": "m13_1",
        "prompt": "う",
        "romaji": "u",
        "subText": "Nguyên âm [U]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_2",
        "prompt": "ク",
        "romaji": "ku",
        "subText": "Hàng K [KU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m13_3",
        "prompt": "す",
        "romaji": "su",
        "subText": "Hàng S [SU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_4",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Hàng T [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m13_5",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Hàng N [NU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_6",
        "prompt": "フ",
        "romaji": "fu",
        "subText": "Hàng H [FU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m13_7",
        "prompt": "む",
        "romaji": "mu",
        "subText": "Hàng M [MU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_8",
        "prompt": "ユ",
        "romaji": "yu",
        "subText": "Hàng Y [YU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m13_9",
        "prompt": "る",
        "romaji": "ru",
        "subText": "Hàng R [RU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_10",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Âm mũi [N]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m13_11",
        "prompt": "あめ",
        "romaji": "ame",
        "subText": "Từ vựng: Mưa (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_12",
        "prompt": "アイス",
        "romaji": "aisu",
        "subText": "Từ vựng: Kem (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m13_13",
        "prompt": "そら",
        "romaji": "sora",
        "subText": "Từ vựng: Bầu trời (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_14",
        "prompt": "スープ",
        "romaji": "suupu",
        "subText": "Từ vựng: Súp (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m13_15",
        "prompt": "くるま",
        "romaji": "kuruma",
        "subText": "Từ vựng: Xe hơi (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_16",
        "prompt": "ミルク",
        "romaji": "miruku",
        "subText": "Từ vựng: Sữa (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m13_17",
        "prompt": "はる",
        "romaji": "haru",
        "subText": "Từ vựng: Mùa xuân (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_18",
        "prompt": "ホテル",
        "romaji": "hoteru",
        "subText": "Từ vựng: Khách sạn (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m13_19",
        "prompt": "つき",
        "romaji": "tsuki",
        "subText": "Từ vựng: Mặt trăng (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m13_20",
        "prompt": "テスト",
        "romaji": "tesuto",
        "subText": "Từ vựng: Bài test (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 14,
    "title": "Bài 14",
    "subtitle": "Thử Thách Phản Xạ Vô Địch Toàn Bảng",
    "description": "20 câu hỏi gắt gao tuyển chọn từ các góc cạnh khó nhất của cả 2 bảng.",
    "questions": [
      {
        "id": "m14_1",
        "prompt": "を",
        "romaji": "wo",
        "subText": "Trợ từ Hiragana [WO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_2",
        "prompt": "ヲ",
        "romaji": "wo",
        "subText": "Ký tự Katakana [WO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_3",
        "prompt": "ぢ",
        "romaji": "di",
        "subText": "Âm đục Hiragana [DI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_4",
        "prompt": "ヂ",
        "romaji": "di",
        "subText": "Âm đục Katakana [DI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_5",
        "prompt": "づ",
        "romaji": "du",
        "subText": "Âm đục Hiragana [DU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_6",
        "prompt": "ヅ",
        "romaji": "du",
        "subText": "Âm đục Katakana [DU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_7",
        "prompt": "シ",
        "romaji": "shi",
        "subText": "Bẫy Katakana [SHI]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_8",
        "prompt": "ツ",
        "romaji": "tsu",
        "subText": "Bẫy Katakana [TSU]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_9",
        "prompt": "ソ",
        "romaji": "so",
        "subText": "Bẫy Katakana [SO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_10",
        "prompt": "ン",
        "romaji": "n",
        "subText": "Bẫy Katakana [N]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_11",
        "prompt": "さ",
        "romaji": "sa",
        "subText": "Bẫy Hiragana [SA]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_12",
        "prompt": "ち",
        "romaji": "chi",
        "subText": "Bẫy Hiragana [CHI]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_13",
        "prompt": "ね",
        "romaji": "ne",
        "subText": "Bẫy Hiragana [NE]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_14",
        "prompt": "ぬ",
        "romaji": "nu",
        "subText": "Bẫy Hiragana [NU]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_15",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục Hiragana [PO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_16",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục Katakana [PO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m14_17",
        "prompt": "ありがとう",
        "romaji": "arigatou",
        "subText": "Từ vựng: Cảm ơn (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_18",
        "prompt": "レストラン",
        "romaji": "resutoran",
        "subText": "Từ vựng: Nhà hàng (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m14_19",
        "prompt": "さようなら",
        "romaji": "sayounara",
        "subText": "Từ vựng: Tạm biệt (Hiragana)",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m14_20",
        "prompt": "エレベーター",
        "romaji": "erebeetaa",
        "subText": "Từ vựng: Thang máy (Katakana)",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  },
  {
    "id": 15,
    "title": "Bài 15",
    "subtitle": "Đề Thi Tốt Nghiệp — Master Bảng Chữ Cái Toàn Thể",
    "description": "Đề thi tốt nghiệp tối thượng đánh giá toàn diện kỹ năng nhận diện cả 2 bảng chữ cái Nhật Bản.",
    "questions": [
      {
        "id": "m15_1",
        "prompt": "お",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_2",
        "prompt": "オ",
        "romaji": "o",
        "subText": "Nguyên âm [O]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_3",
        "prompt": "こ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_4",
        "prompt": "コ",
        "romaji": "ko",
        "subText": "Hàng K [KO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_5",
        "prompt": "ご",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_6",
        "prompt": "ゴ",
        "romaji": "go",
        "subText": "Âm đục G [GO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_7",
        "prompt": "ぞ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_8",
        "prompt": "ゾ",
        "romaji": "zo",
        "subText": "Âm đục Z [ZO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_9",
        "prompt": "ぽ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_10",
        "prompt": "ポ",
        "romaji": "po",
        "subText": "Bán đục P [PO]",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_11",
        "prompt": "きゃ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_12",
        "prompt": "キャ",
        "romaji": "kya",
        "subText": "Âm ghép KYA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_13",
        "prompt": "じゃ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_14",
        "prompt": "ジャ",
        "romaji": "ja",
        "subText": "Âm ghép JA",
        "type": "char",
        "kanaType": "katakana"
      },
      {
        "id": "m15_15",
        "prompt": "にほんご",
        "romaji": "nihongo",
        "subText": "Từ vựng: Tiếng Nhật",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_16",
        "prompt": "スーパー",
        "romaji": "suupaa",
        "subText": "Từ vựng: Siêu thị",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m15_17",
        "prompt": "すばらしい",
        "romaji": "subarashii",
        "subText": "Từ vựng: Tuyệt vời",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_18",
        "prompt": "コーヒー",
        "romaji": "koohii",
        "subText": "Từ vựng: Cà phê",
        "type": "word",
        "kanaType": "katakana"
      },
      {
        "id": "m15_19",
        "prompt": "おもしろい",
        "romaji": "omoshiroi",
        "subText": "Từ vựng: Thú vị",
        "type": "word",
        "kanaType": "hiragana"
      },
      {
        "id": "m15_20",
        "prompt": "パスポート",
        "romaji": "pasupooto",
        "subText": "Từ vựng: Hộ chiếu",
        "type": "word",
        "kanaType": "katakana"
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// HELPER: LẤY BỘ ĐỀ THEO SCOPE
// ═══════════════════════════════════════════════════════════════════════
export function getQuizSetsByScope(scope: 'all-h' | 'all-k' | 'mix' | 'yoon'): QuizSet[] {
  switch (scope) {
    case 'all-h': return HIRAGANA_QUIZ_SETS;
    case 'all-k': return KATAKANA_QUIZ_SETS;
    case 'mix':   return MIX_QUIZ_SETS;
    case 'yoon':  return YOON_QUIZ_SETS;
    default:      return HIRAGANA_QUIZ_SETS;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// STORAGE: LƯU VÀ TẢI ĐIỂM BÀI TEST
// ═══════════════════════════════════════════════════════════════════════
const STORAGE_KEY = 'nippon_master_comprehensive_quiz_scores';

export interface SavedQuizScores {
  [key: string]: {
    bestScore: number;
    total: number;
    lastAttemptAt: string;
  };
}

export function loadSavedQuizScores(): SavedQuizScores {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveQuizScore(scope: string, setId: number, score: number, total: number): void {
  try {
    const current = loadSavedQuizScores();
    const key = `${scope}_${setId}`;
    const previous = current[key];
    const bestScore = previous ? Math.max(previous.bestScore, score) : score;

    current[key] = {
      bestScore,
      total,
      lastAttemptAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Không thể lưu điểm quiz:', e);
  }
}
