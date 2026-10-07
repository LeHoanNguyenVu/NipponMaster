/**
 * kanjiRadicals214.ts — Bộ dữ liệu chuẩn 214 Bộ Thủ Khang Hy (Kangxi Radicals - 康熙部首)
 * Đầy đủ từ Bộ 1 (Nhất 一) đến Bộ 214 (Dược 龠)
 * 
 * Mỗi bản ghi bao gồm:
 * - id: 1 - 214
 * - character: Ký tự bộ thủ gốc
 * - variants: Danh sách biến thể (ví dụ: 亻, 氵, 忄, 扌, 艹, v.v.)
 * - hanViet: Tên gọi Hán Việt chuẩn
 * - meaning: Ý nghĩa tiếng Việt cốt lõi
 * - strokeCount: Số nét viết (1 - 17 nét)
 * - reading: Phiên âm tiếng Nhật ({ hiragana, romaji })
 * - position: Vị trí bộ thủ trong chữ Hán (hen, tsukuri, kanmuri, ashi, kamae, tare, nyoo, isolated)
 * - positionNameVi: Tên phân loại vị trí bằng tiếng Việt
 * - examples: Mảng chữ Kanji ví dụ điển hình kèm Hán Việt và nghĩa
 * - description: Giải thích nguồn gốc tượng hình và mẹo ghi nhớ
 */

export type RadicalPosition =
  | 'hen'       // Bên trái (偏 - Hen)
  | 'tsukuri'   // Bên phải (旁 - Tsukuri)
  | 'kanmuri'   // Ở trên (冠 - Kanmuri)
  | 'ashi'      // Ở dưới (脚 - Ashi)
  | 'kamae'     // Bao quanh (構 - Kamae)
  | 'tare'      // Góc trên bên trái (垂 - Tare)
  | 'nyoo'      // Góc dưới bên trái (繞 - Nyoo)
  | 'isolated'; // Toàn thân / Độc lập (cả chữ là bộ thủ)

export interface RadicalExample {
  kanji: string;
  hanViet: string;
  meaning: string;
  hiragana?: string;
}

export interface Radical214 {
  id: number;
  character: string;
  variants: string[];
  hanViet: string;
  meaning: string;
  strokeCount: number;
  reading: {
    hiragana: string;
    romaji: string;
  };
  position: RadicalPosition;
  positionNameVi: string;
  examples: RadicalExample[];
  description?: string;
}

export const RADICAL_POSITIONS: { key: RadicalPosition; nameVi: string; nameJa: string }[] = [
  { key: 'hen', nameVi: 'Bên trái (Hen)', nameJa: '偏 (へん)' },
  { key: 'tsukuri', nameVi: 'Bên phải (Tsukuri)', nameJa: '旁 (つくり)' },
  { key: 'kanmuri', nameVi: 'Ở trên (Kanmuri)', nameJa: '冠 (かんむり)' },
  { key: 'ashi', nameVi: 'Ở dưới (Ashi)', nameJa: '脚 (あし)' },
  { key: 'kamae', nameVi: 'Bao quanh (Kamae)', nameJa: '構 (かまえ)' },
  { key: 'tare', nameVi: 'Góc trên trái (Tare)', nameJa: '垂 (たれ)' },
  { key: 'nyoo', nameVi: 'Góc dưới trái (Nyoo)', nameJa: '繞 (にょう)' },
  { key: 'isolated', nameVi: 'Toàn thân (Độc lập)', nameJa: '独体 (どくたい)' },
];

export const RADICAL_STROKE_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export const KANJI_RADICALS_214: Radical214[] = [
  {
    "id": 1,
    "character": "一",
    "variants": [],
    "hanViet": "Nhất",
    "meaning": "Số một, khởi đầu, thống nhất toàn bộ",
    "strokeCount": 1,
    "reading": {
      "hiragana": "いち",
      "romaji": "ichi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "一",
        "hanViet": "Nhất",
        "meaning": "Một",
        "hiragana": "いち"
      },
      {
        "kanji": "三",
        "hanViet": "Tam",
        "meaning": "Ba",
        "hiragana": "さん"
      },
      {
        "kanji": "天",
        "hanViet": "Thiên",
        "meaning": "Bầu trời",
        "hiragana": "てん"
      }
    ],
    "description": "Nét ngang tượng trưng cho mặt đất hoặc số một khởi nguyên của vạn vật."
  },
  {
    "id": 2,
    "character": "丨",
    "variants": [],
    "hanViet": "Cổn",
    "meaning": "Nét sổ dọc, thông suốt từ trên xuống dưới",
    "strokeCount": 1,
    "reading": {
      "hiragana": "ぼう",
      "romaji": "bou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "中",
        "hanViet": "Trung",
        "meaning": "Ở giữa, trong",
        "hiragana": "なか"
      },
      {
        "kanji": "申",
        "hanViet": "Thân",
        "meaning": "Báo cáo, bày tỏ",
        "hiragana": "もうす"
      },
      {
        "kanji": "串",
        "hanViet": "Xuyến",
        "meaning": "Xiên que",
        "hiragana": "くし"
      }
    ],
    "description": "Nét thẳng đứng tượng trưng cho sự kết nối thông suốt giữa trời và đất."
  },
  {
    "id": 3,
    "character": "丶",
    "variants": [],
    "hanViet": "Điểm",
    "meaning": "Nét chấm, đốm lửa, dấu vết nhỏ",
    "strokeCount": 1,
    "reading": {
      "hiragana": "てん",
      "romaji": "ten"
    },
    "position": "isolated",
    "positionNameVi": "Đỉnh / Độc lập",
    "examples": [
      {
        "kanji": "丸",
        "hanViet": "Hoàn",
        "meaning": "Viên tròn",
        "hiragana": "まる"
      },
      {
        "kanji": "丹",
        "hanViet": "Đan",
        "meaning": "Màu đỏ đan sa",
        "hiragana": "たん"
      },
      {
        "kanji": "主",
        "hanViet": "Chủ",
        "meaning": "Chủ nhân, người đứng đầu",
        "hiragana": "おも"
      }
    ],
    "description": "Dấu chấm nhỏ tượng trưng cho ngọn lửa nhỏ trên ngọn đèn hoặc giọt nước rơi."
  },
  {
    "id": 4,
    "character": "丿",
    "variants": [],
    "hanViet": "Phiệt",
    "meaning": "Nét phẩy, trượt nghiêng từ trên xuống trái",
    "strokeCount": 1,
    "reading": {
      "hiragana": "の",
      "romaji": "no"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "乃",
        "hanViet": "Nãi",
        "meaning": "Bèn là, tức là",
        "hiragana": "の"
      },
      {
        "kanji": "久",
        "hanViet": "Cửu",
        "meaning": "Lâu dài, vĩnh cửu",
        "hiragana": "ひさしい"
      },
      {
        "kanji": "乏",
        "hanViet": "Phạp",
        "meaning": "Thiếu thốn",
        "hiragana": "とぼしい"
      }
    ],
    "description": "Nét phẩy nghiêng sang trái, tượng trưng cho sự uốn lượn hoặc rơi rụng."
  },
  {
    "id": 5,
    "character": "乙",
    "variants": [
      "⺄"
    ],
    "hanViet": "Ất",
    "meaning": "Vị trí thứ hai can chi, mầm non uốn lượn",
    "strokeCount": 1,
    "reading": {
      "hiragana": "おつ",
      "romaji": "otsu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "乞",
        "hanViet": "Khất",
        "meaning": "Cầu xin, xin xỏ",
        "hiragana": "こう"
      },
      {
        "kanji": "乾",
        "hanViet": "Can",
        "meaning": "Khô ráo",
        "hiragana": "かわく"
      },
      {
        "kanji": "乱",
        "hanViet": "Loạn",
        "meaning": "Hỗn loạn",
        "hiragana": "みだれる"
      }
    ],
    "description": "Hình mầm cây non còn uốn lượn trong lòng đất chưa vươn thẳng lên được."
  },
  {
    "id": 6,
    "character": "亅",
    "variants": [],
    "hanViet": "Quyết",
    "meaning": "Nét sổ có móc lên, lưỡi câu",
    "strokeCount": 1,
    "reading": {
      "hiragana": "はねぼう",
      "romaji": "hanebou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "了",
        "hanViet": "Liễu",
        "meaning": "Xong, hoàn tất",
        "hiragana": "りょう"
      },
      {
        "kanji": "予",
        "hanViet": "Dự",
        "meaning": "Trước, dự tính",
        "hiragana": "あらかじめ"
      },
      {
        "kanji": "事",
        "hanViet": "Sự",
        "meaning": "Sự việc, công việc",
        "hiragana": "こと"
      }
    ],
    "description": "Nét sổ thẳng có móc ngược nhọn lên ở đáy giống như mũi lưỡi câu."
  },
  {
    "id": 7,
    "character": "二",
    "variants": [],
    "hanViet": "Nhị",
    "meaning": "Số hai, trời và đất đối xứng",
    "strokeCount": 2,
    "reading": {
      "hiragana": "に",
      "romaji": "ni"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "二",
        "hanViet": "Nhị",
        "meaning": "Hai",
        "hiragana": "に"
      },
      {
        "kanji": "于",
        "hanViet": "Vu",
        "meaning": "Ở tại, đi đến",
        "hiragana": "う"
      },
      {
        "kanji": "云",
        "hanViet": "Vân",
        "meaning": "Mây trôi, nói rằng",
        "hiragana": "いう"
      }
    ],
    "description": "Hai vạch song song tượng trưng cho Trời ở trên và Đất ở dưới."
  },
  {
    "id": 8,
    "character": "亠",
    "variants": [],
    "hanViet": "Đầu",
    "meaning": "Nắp đậy, nóc nhà, phần chóp trên",
    "strokeCount": 2,
    "reading": {
      "hiragana": "なべぶた",
      "romaji": "nabebuta"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "亡",
        "hanViet": "Vong",
        "meaning": "Mất mát, chết",
        "hiragana": "ない"
      },
      {
        "kanji": "交",
        "hanViet": "Giao",
        "meaning": "Giao lưu, giao cắt",
        "hiragana": "まじわる"
      },
      {
        "kanji": "京",
        "hanViet": "Kinh",
        "meaning": "Kinh đô, thủ đô",
        "hiragana": "きょう"
      }
    ],
    "description": "Hình cái nắp vung đậy nồi hoặc đỉnh chóp nhọn trên nóc tòa nhà."
  },
  {
    "id": 9,
    "character": "人",
    "variants": [
      "亻",
      "𠆢"
    ],
    "hanViet": "Nhân",
    "meaning": "Con người, nhân loại",
    "strokeCount": 2,
    "reading": {
      "hiragana": "ひと",
      "romaji": "hito"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen - Nhân đứng 亻) / Toàn thân",
    "examples": [
      {
        "kanji": "休",
        "hanViet": "Hưu",
        "meaning": "Nghỉ ngơi",
        "hiragana": "やすむ"
      },
      {
        "kanji": "体",
        "hanViet": "Thể",
        "meaning": "Thân thể, cơ thể",
        "hiragana": "からだ"
      },
      {
        "kanji": "作",
        "hanViet": "Tác",
        "meaning": "Làm, chế tác",
        "hiragana": "つくる"
      }
    ],
    "description": "Hình người nghiêng mình bước đi hai chân. Khi đứng bên trái biến thành bộ Nhân đứng (亻)."
  },
  {
    "id": 10,
    "character": "儿",
    "variants": [],
    "hanViet": "Nhi",
    "meaning": "Chân người, đứa trẻ nhỏ",
    "strokeCount": 2,
    "reading": {
      "hiragana": "ひとあし",
      "romaji": "hitoashi"
    },
    "position": "ashi",
    "positionNameVi": "Ở dưới (Ashi)",
    "examples": [
      {
        "kanji": "兄",
        "hanViet": "Huynh",
        "meaning": "Anh trai",
        "hiragana": "あに"
      },
      {
        "kanji": "先",
        "hanViet": "Tiên",
        "meaning": "Trước tiên",
        "hiragana": "さき"
      },
      {
        "kanji": "光",
        "hanViet": "Quang",
        "meaning": "Ánh sáng",
        "hiragana": "ひかり"
      }
    ],
    "description": "Hình hai cẳng chân người đang chạy nhảy ở phía dưới đáy chữ."
  },
  {
    "id": 11,
    "character": "入",
    "variants": [],
    "hanViet": "Nhập",
    "meaning": "Đi vào, thu nhận, thâm nhập",
    "strokeCount": 2,
    "reading": {
      "hiragana": "いる",
      "romaji": "iru"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "入",
        "hanViet": "Nhập",
        "meaning": "Vào, nhập",
        "hiragana": "はいる"
      },
      {
        "kanji": "内",
        "hanViet": "Nội",
        "meaning": "Bên trong",
        "hiragana": "うち"
      },
      {
        "kanji": "全",
        "hanViet": "Toàn",
        "meaning": "Toàn bộ, vẹn toàn",
        "hiragana": "すべて"
      }
    ],
    "description": "Hình mũi nhọn đâm sâu vào bên trong hoặc rễ cây cắm sâu vào đất."
  },
  {
    "id": 12,
    "character": "八",
    "variants": [
      "丷"
    ],
    "hanViet": "Bát",
    "meaning": "Số tám, tách đôi hai bên, chia rẽ",
    "strokeCount": 2,
    "reading": {
      "hiragana": "はち",
      "romaji": "hachi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "八",
        "hanViet": "Bát",
        "meaning": "Tám",
        "hiragana": "はち"
      },
      {
        "kanji": "公",
        "hanViet": "Công",
        "meaning": "Công cộng, công bằng",
        "hiragana": "おおやけ"
      },
      {
        "kanji": "分",
        "hanViet": "Phân",
        "meaning": "Phân chia, phút",
        "hiragana": "わける"
      }
    ],
    "description": "Hai vạch mở rộng sang hai bên, tượng trưng cho sự phân khai, chia tách."
  },
  {
    "id": 13,
    "character": "冂",
    "variants": [],
    "hanViet": "Quynh",
    "meaning": "Vùng đất xa xôi, đồng trống hoang vu",
    "strokeCount": 2,
    "reading": {
      "hiragana": "まきがまえ",
      "romaji": "makigamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh (Kamae)",
    "examples": [
      {
        "kanji": "円",
        "hanViet": "Viên",
        "meaning": "Đồng Yên, hình tròn",
        "hiragana": "えん"
      },
      {
        "kanji": "冊",
        "hanViet": "Sách",
        "meaning": "Cuốn sách, quyển",
        "hiragana": "さつ"
      },
      {
        "kanji": "同",
        "hanViet": "Đồng",
        "meaning": "Cùng nhau, giống nhau",
        "hiragana": "おなじ"
      }
    ],
    "description": "Khung bao ba phía như đường ranh giới của một vùng đất xa xôi ngoài thành."
  },
  {
    "id": 14,
    "character": "冖",
    "variants": [],
    "hanViet": "Mịch",
    "meaning": "Khăn trùm đầu, phủ kín, che đậy",
    "strokeCount": 2,
    "reading": {
      "hiragana": "わかんむり",
      "romaji": "wakanmuri"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "冗",
        "hanViet": "Nhũng",
        "meaning": "Rườm rà, dư thừa",
        "hiragana": "じょう"
      },
      {
        "kanji": "写",
        "hanViet": "Tả",
        "meaning": "Chụp ảnh, sao chép",
        "hiragana": "うつす"
      },
      {
        "kanji": "冠",
        "hanViet": "Quan",
        "meaning": "Mũ miện, đứng đầu",
        "hiragana": "かんむり"
      }
    ],
    "description": "Hình chiếc khăn trùm buông rủ xuống hai bên để che kín đồ vật bên dưới."
  },
  {
    "id": 15,
    "character": "冫",
    "variants": [],
    "hanViet": "Băng",
    "meaning": "Băng tuyết, giá lạnh đông đặc",
    "strokeCount": 2,
    "reading": {
      "hiragana": "にすい",
      "romaji": "nisui"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen - Hai chấm băng)",
    "examples": [
      {
        "kanji": "冬",
        "hanViet": "Đông",
        "meaning": "Mùa đông",
        "hiragana": "ふゆ"
      },
      {
        "kanji": "冷",
        "hanViet": "Lãnh",
        "meaning": "Lạnh lẽo, nguội",
        "hiragana": "つめたい"
      },
      {
        "kanji": "凍",
        "hanViet": "Đống",
        "meaning": "Đóng băng, đông cứng",
        "hiragana": "こおる"
      }
    ],
    "description": "Hai chấm nước đông đặc lại thành tinh thể đá tuyết lạnh giá."
  },
  {
    "id": 16,
    "character": "几",
    "variants": [],
    "hanViet": "Kỷ",
    "meaning": "Chiếc bàn nhỏ, ghế tựa thấp",
    "strokeCount": 2,
    "reading": {
      "hiragana": "きにょう",
      "romaji": "kinyou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bao bọc",
    "examples": [
      {
        "kanji": "凡",
        "hanViet": "Phàm",
        "meaning": "Bình phàm, phàm nhân",
        "hiragana": "ぼん"
      },
      {
        "kanji": "処",
        "hanViet": "Xứ",
        "meaning": "Nơi chốn, xử lý",
        "hiragana": "ところ"
      },
      {
        "kanji": "凧",
        "hanViet": "Kỷ",
        "meaning": "Con diều giấy bay",
        "hiragana": "たこ"
      }
    ],
    "description": "Hình chiếc bàn gỗ thấp có hai chân đứng vững trên sàn nhà."
  },
  {
    "id": 17,
    "character": "凵",
    "variants": [],
    "hanViet": "Khảm",
    "meaning": "Hố sâu trên mặt đất, vật chứa há miệng",
    "strokeCount": 2,
    "reading": {
      "hiragana": "かんにょう",
      "romaji": "kannyou"
    },
    "position": "kamae",
    "positionNameVi": "Bao dưới (Kamae)",
    "examples": [
      {
        "kanji": "凶",
        "hanViet": "Hung",
        "meaning": "Hung dữ, điềm xấu",
        "hiragana": "きょう"
      },
      {
        "kanji": "凸",
        "hanViet": "Đột",
        "meaning": "Lồi lên",
        "hiragana": "とつ"
      },
      {
        "kanji": "凹",
        "hanViet": "Ao",
        "meaning": "Lõm xuống",
        "hiragana": "おう"
      }
    ],
    "description": "Hình miệng hố trũng sâu khoét vào lòng đất để bẫy thú."
  },
  {
    "id": 18,
    "character": "刀",
    "variants": [
      "刂"
    ],
    "hanViet": "Đao",
    "meaning": "Con dao, thanh kiếm, cắt xẻ",
    "strokeCount": 2,
    "reading": {
      "hiragana": "かたな",
      "romaji": "katana"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Đao đứng 刂) / Độc lập",
    "examples": [
      {
        "kanji": "切",
        "hanViet": "Thiết",
        "meaning": "Cắt lát, khẩn thiết",
        "hiragana": "きる"
      },
      {
        "kanji": "分",
        "hanViet": "Phân",
        "meaning": "Phân chia",
        "hiragana": "わける"
      },
      {
        "kanji": "初",
        "hanViet": "Sơ",
        "meaning": "Ban đầu, sơ khởi",
        "hiragana": "はじめて"
      }
    ],
    "description": "Hình thanh đao có cán và lưỡi cong sắc bén. Đứng bên phải biến thành Đao đứng (刂)."
  },
  {
    "id": 19,
    "character": "力",
    "variants": [],
    "hanViet": "Lực",
    "meaning": "Sức mạnh, cơ bắp, công sức",
    "strokeCount": 2,
    "reading": {
      "hiragana": "ちから",
      "romaji": "chikara"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri) / Độc lập",
    "examples": [
      {
        "kanji": "男",
        "hanViet": "Nam",
        "meaning": "Đàn ông",
        "hiragana": "おとこ"
      },
      {
        "kanji": "助",
        "hanViet": "Trợ",
        "meaning": "Giúp đỡ, viện trợ",
        "hiragana": "たすける"
      },
      {
        "kanji": "動",
        "hanViet": "Động",
        "meaning": "Chuyển động, hoạt động",
        "hiragana": "うごく"
      }
    ],
    "description": "Hình cánh tay gồng cơ bắp hoặc chiếc cày đất nông nghiệp thể hiện sức mạnh."
  },
  {
    "id": 20,
    "character": "勹",
    "variants": [],
    "hanViet": "Bao",
    "meaning": "Bao bọc, ôm ấp, gói bọc",
    "strokeCount": 2,
    "reading": {
      "hiragana": "つつみがまえ",
      "romaji": "tsutsumigamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh (Kamae)",
    "examples": [
      {
        "kanji": "包",
        "hanViet": "Bao",
        "meaning": "Bao bọc, gói",
        "hiragana": "つつむ"
      },
      {
        "kanji": "旬",
        "hanViet": "Tuần",
        "meaning": "Mười ngày, mùa ngon nhất",
        "hiragana": "じゅん"
      },
      {
        "kanji": "匂",
        "hanViet": "Mùi",
        "meaning": "Mùi hương thơm",
        "hiragana": "におい"
      }
    ],
    "description": "Hình người đang cúi mình hai tay ôm bọc lấy đồ vật quý giá."
  },
  {
    "id": 21,
    "character": "匕",
    "variants": [],
    "hanViet": "Chủy",
    "meaning": "Cái thìa múc cơm, con dao găm nhỏ",
    "strokeCount": 2,
    "reading": {
      "hiragana": "さじ",
      "romaji": "saji"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "北",
        "hanViet": "Bắc",
        "meaning": "Phía Bắc, quay lưng",
        "hiragana": "きた"
      },
      {
        "kanji": "匙",
        "hanViet": "Thìa",
        "meaning": "Chiếc thìa múc súp",
        "hiragana": "さじ"
      },
      {
        "kanji": "化",
        "hanViet": "Hóa",
        "meaning": "Biến hóa, biến đổi",
        "hiragana": "ばける"
      }
    ],
    "description": "Hình chiếc muôi múc thức ăn hoặc vũ khí nhỏ cầm tay."
  },
  {
    "id": 22,
    "character": "匚",
    "variants": [],
    "hanViet": "Phương",
    "meaning": "Chiếc hộp đựng đồ, hòm chứa nằm ngang",
    "strokeCount": 2,
    "reading": {
      "hiragana": "はこがまえ",
      "romaji": "hakogamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao bọc (Kamae)",
    "examples": [
      {
        "kanji": "匠",
        "hanViet": "Tượng",
        "meaning": "Nghệ nhân, thợ giỏi",
        "hiragana": "たくみ"
      },
      {
        "kanji": "匡",
        "hanViet": "Khuông",
        "meaning": "Uốn nắn cho ngay thẳng",
        "hiragana": "ただす"
      },
      {
        "kanji": "匣",
        "hanViet": "Hạp",
        "meaning": "Chiếc hộp quý",
        "hiragana": "はこ"
      }
    ],
    "description": "Hình chiếc hòm gỗ mở nắp sang bên phải để cất giữ đồ đạc."
  },
  {
    "id": 23,
    "character": "匸",
    "variants": [],
    "hanViet": "Hệ",
    "meaning": "Cất giấu kín đáo, che giấu",
    "strokeCount": 2,
    "reading": {
      "hiragana": "かくしがまえ",
      "romaji": "kakushigamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao bọc (Kamae)",
    "examples": [
      {
        "kanji": "匹",
        "hanViet": "Thất",
        "meaning": "Đếm thú nhỏ, tương xứng",
        "hiragana": "ひき"
      },
      {
        "kanji": "匿",
        "hanViet": "Nặc",
        "meaning": "Nặc danh, giấu kín",
        "hiragana": "かくす"
      },
      {
        "kanji": "区",
        "hanViet": "Khu",
        "meaning": "Khu vực, quận huyện",
        "hiragana": "く"
      }
    ],
    "description": "Hình vật che đậy kín đồ bên trong không cho ai nhìn thấy."
  },
  {
    "id": 24,
    "character": "十",
    "variants": [],
    "hanViet": "Thập",
    "meaning": "Số mười, hoàn mỹ đầy đủ khắp bốn phương",
    "strokeCount": 2,
    "reading": {
      "hiragana": "じゅう",
      "romaji": "juu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "十",
        "hanViet": "Thập",
        "meaning": "Mười",
        "hiragana": "じゅう"
      },
      {
        "kanji": "千",
        "hanViet": "Thiên",
        "meaning": "Một nghìn",
        "hiragana": "せん"
      },
      {
        "kanji": "古",
        "hanViet": "Cổ",
        "meaning": "Cổ xưa, cũ",
        "hiragana": "ふるい"
      }
    ],
    "description": "Nét ngang nối Đông Tây và nét dọc nối Nam Bắc, tượng trưng bốn phương đầy đủ."
  },
  {
    "id": 25,
    "character": "卜",
    "variants": [],
    "hanViet": "Bốc",
    "meaning": "Bói toán, vết nứt trên mai rùa",
    "strokeCount": 2,
    "reading": {
      "hiragana": "ぼく",
      "romaji": "boku"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "占",
        "hanViet": "Chiêm",
        "meaning": "Chiếm đóng, bói quẻ",
        "hiragana": "う占なう"
      },
      {
        "kanji": "卦",
        "hanViet": "Quẻ",
        "meaning": "Quẻ bói kinh dịch",
        "hiragana": "け"
      },
      {
        "kanji": "外",
        "hanViet": "Ngoại",
        "meaning": "Bên ngoài",
        "hiragana": "そと"
      }
    ],
    "description": "Hình vết nứt nẻ xuất hiện trên mai rùa khi nung lửa để xem điềm lành dữ."
  },
  {
    "id": 26,
    "character": "卩",
    "variants": [
      "⺋"
    ],
    "hanViet": "Tiết",
    "meaning": "Đốt tre, khớp xương, người quỳ gối phục tùng",
    "strokeCount": 2,
    "reading": {
      "hiragana": "ふしづくり",
      "romaji": "fushizukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "印",
        "hanViet": "Ấn",
        "meaning": "Con dấu, ấn tượng",
        "hiragana": "しるし"
      },
      {
        "kanji": "危",
        "hanViet": "Nguy",
        "meaning": "Nguy hiểm",
        "hiragana": "あぶない"
      },
      {
        "kanji": "卵",
        "hanViet": "Noãn",
        "meaning": "Quả trứng",
        "hiragana": "たまご"
      }
    ],
    "description": "Hình người quỳ gối gập chân cúi phục nhận mệnh lệnh."
  },
  {
    "id": 27,
    "character": "厂",
    "variants": [],
    "hanViet": "Hán",
    "meaning": "Sườn núi dốc đứng, vách đá cheo leo",
    "strokeCount": 2,
    "reading": {
      "hiragana": "がんだれ",
      "romaji": "gandare"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare)",
    "examples": [
      {
        "kanji": "厄",
        "hanViet": "Ách",
        "meaning": "Tai ách, xui xẻo",
        "hiragana": "やく"
      },
      {
        "kanji": "厚",
        "hanViet": "Hậu",
        "meaning": "Dày dặn, nồng hậu",
        "hiragana": "あつい"
      },
      {
        "kanji": "原",
        "hanViet": "Nguyên",
        "meaning": "Thảo nguyên, nguồn gốc",
        "hiragana": "はら"
      }
    ],
    "description": "Hình mỏm đá nhô ra tạo mái che tự nhiên dưới chân vách núi."
  },
  {
    "id": 28,
    "character": "厶",
    "variants": [],
    "hanViet": "Khư",
    "meaning": "Riêng tư, bản thân, ích kỷ",
    "strokeCount": 2,
    "reading": {
      "hiragana": "む",
      "romaji": "mu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "去",
        "hanViet": "Khứ",
        "meaning": "Đi qua, quá khứ",
        "hiragana": "さる"
      },
      {
        "kanji": "参",
        "hanViet": "Tham",
        "meaning": "Tham gia, viếng thăm",
        "hiragana": "まいる"
      },
      {
        "kanji": "弁",
        "hanViet": "Biện",
        "meaning": "Hùng biện, biện giải",
        "hiragana": "べん"
      }
    ],
    "description": "Hình khuỷu tay co quắp kéo đồ vật về phía lòng mình, tượng trưng cho tính tư hữu."
  },
  {
    "id": 29,
    "character": "又",
    "variants": [],
    "hanViet": "Hựu",
    "meaning": "Bàn tay phải, lại nữa, tiếp tục làm",
    "strokeCount": 2,
    "reading": {
      "hiragana": "また",
      "romaji": "mata"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải / Độc lập",
    "examples": [
      {
        "kanji": "友",
        "hanViet": "Hữu",
        "meaning": "Bạn bè",
        "hiragana": "とも"
      },
      {
        "kanji": "反",
        "hanViet": "Phản",
        "meaning": "Ngược lại, phản kháng",
        "hiragana": "そる"
      },
      {
        "kanji": "取",
        "hanViet": "Thủ",
        "meaning": "Lấy, nắm giữ",
        "hiragana": "とる"
      }
    ],
    "description": "Hình bàn tay phải vươn ra cầm nắm hoặc lặp lại một hành động."
  },
  {
    "id": 30,
    "character": "口",
    "variants": [],
    "hanViet": "Khẩu",
    "meaning": "Cái miệng, ăn uống, lời nói, lối ra vào",
    "strokeCount": 3,
    "reading": {
      "hiragana": "くち",
      "romaji": "kuchi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen) / Độc lập",
    "examples": [
      {
        "kanji": "味",
        "hanViet": "Vị",
        "meaning": "Mùi vị, hương vị",
        "hiragana": "あじ"
      },
      {
        "kanji": "古",
        "hanViet": "Cổ",
        "meaning": "Cổ xưa, cũ",
        "hiragana": "ふるい"
      },
      {
        "kanji": "右",
        "hanViet": "Hữu",
        "meaning": "Bên phải",
        "hiragana": "みぎ"
      }
    ],
    "description": "Tượng hình ô vuông mở hình khuôn miệng con người."
  },
  {
    "id": 31,
    "character": "囗",
    "variants": [],
    "hanViet": "Vi",
    "meaning": "Vây quanh, bao bọc bốn phía kín mít",
    "strokeCount": 3,
    "reading": {
      "hiragana": "くにがまえ",
      "romaji": "kunigamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh hoàn toàn (Kamae)",
    "examples": [
      {
        "kanji": "四",
        "hanViet": "Tứ",
        "meaning": "Số bốn",
        "hiragana": "よん"
      },
      {
        "kanji": "国",
        "hanViet": "Quốc",
        "meaning": "Đất nước",
        "hiragana": "くに"
      },
      {
        "kanji": "団",
        "hanViet": "Đoàn",
        "meaning": "Đoàn thể, nhóm",
        "hiragana": "だん"
      }
    ],
    "description": "Hình tường thành bao bọc khép kín bốn phía xung quanh."
  },
  {
    "id": 32,
    "character": "土",
    "variants": [],
    "hanViet": "Thổ",
    "meaning": "Đất đai, thổ nhưỡng, mặt đất",
    "strokeCount": 3,
    "reading": {
      "hiragana": "つち",
      "romaji": "tsuchi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen - Thổ đứng) / Độc lập",
    "examples": [
      {
        "kanji": "地",
        "hanViet": "Địa",
        "meaning": "Đất đai, địa phương",
        "hiragana": "ち"
      },
      {
        "kanji": "坂",
        "hanViet": "Phản",
        "meaning": "Con dốc, sườn dốc",
        "hiragana": "さか"
      },
      {
        "kanji": "城",
        "hanViet": "Thành",
        "meaning": "Lâu đài, thành trì",
        "hiragana": "しろ"
      }
    ],
    "description": "Hình mầm cây trồi lên từ mặt đất, nét ngang đáy dài nhất."
  },
  {
    "id": 33,
    "character": "士",
    "variants": [],
    "hanViet": "Sĩ",
    "meaning": "Kẻ sĩ, quan lại, người có học thức",
    "strokeCount": 3,
    "reading": {
      "hiragana": "さむらい",
      "romaji": "samurai"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "壮",
        "hanViet": "Tráng",
        "meaning": "Tráng kiện, hùng vĩ",
        "hiragana": "そう"
      },
      {
        "kanji": "声",
        "hanViet": "Thanh",
        "meaning": "Âm thanh, tiếng nói",
        "hiragana": "こえ"
      },
      {
        "kanji": "売",
        "hanViet": "Mại",
        "meaning": "Bán hàng",
        "hiragana": "うる"
      }
    ],
    "description": "Hình người đàn ông vai rộng (nét ngang trên dài hơn nét đáy)."
  },
  {
    "id": 34,
    "character": "夂",
    "variants": [],
    "hanViet": "Trĩ",
    "meaning": "Đi chậm theo sau, đến muộn",
    "strokeCount": 3,
    "reading": {
      "hiragana": "ふゆがしら",
      "romaji": "fuyugashira"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "冬",
        "hanViet": "Đông",
        "meaning": "Mùa đông",
        "hiragana": "ふゆ"
      },
      {
        "kanji": "条",
        "hanViet": "Điều",
        "meaning": "Điều khoản, sợi dây",
        "hiragana": "じょう"
      },
      {
        "kanji": "各",
        "hanViet": "Các",
        "meaning": "Mỗi, từng cái",
        "hiragana": "おのおの"
      }
    ],
    "description": "Hình đôi bàn chân bước chậm chạp lẽo đẽo theo sau người khác."
  },
  {
    "id": 35,
    "character": "夊",
    "variants": [],
    "hanViet": "Tuy",
    "meaning": "Đi chậm chạp, lê bước chân",
    "strokeCount": 3,
    "reading": {
      "hiragana": "すいにょう",
      "romaji": "suinyou"
    },
    "position": "ashi",
    "positionNameVi": "Ở dưới (Ashi)",
    "examples": [
      {
        "kanji": "変",
        "hanViet": "Biến",
        "meaning": "Biến đổi, kỳ lạ",
        "hiragana": "かわる"
      },
      {
        "kanji": "夏",
        "hanViet": "Hạ",
        "meaning": "Mùa hè",
        "hiragana": "なつ"
      },
      {
        "kanji": "麦",
        "hanViet": "Mạch",
        "meaning": "Lúa mạch",
        "hiragana": "むぎ"
      }
    ],
    "description": "Hình đôi chân bước mệt mỏi, lê từng bước chậm trên đường."
  },
  {
    "id": 36,
    "character": "夕",
    "variants": [],
    "hanViet": "Tịch",
    "meaning": "Buổi chiều tà, hoàng hôn buông xuống",
    "strokeCount": 3,
    "reading": {
      "hiragana": "ゆうべ",
      "romaji": "yuube"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Độc lập",
    "examples": [
      {
        "kanji": "夕",
        "hanViet": "Tịch",
        "meaning": "Chiều tối",
        "hiragana": "ゆう"
      },
      {
        "kanji": "外",
        "hanViet": "Ngoại",
        "meaning": "Bên ngoài",
        "hiragana": "そと"
      },
      {
        "kanji": "夜",
        "hanViet": "Dạ",
        "meaning": "Ban đêm",
        "hiragana": "よる"
      }
    ],
    "description": "Hình vầng trăng khuyết mới hé lộ khi mặt trời vừa lặn lúc chập tối."
  },
  {
    "id": 37,
    "character": "大",
    "variants": [],
    "hanViet": "Đại",
    "meaning": "To lớn, vĩ đại, rộng lớn",
    "strokeCount": 3,
    "reading": {
      "hiragana": "だい",
      "romaji": "dai"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "大",
        "hanViet": "Đại",
        "meaning": "To lớn",
        "hiragana": "おおきい"
      },
      {
        "kanji": "天",
        "hanViet": "Thiên",
        "meaning": "Trời",
        "hiragana": "てん"
      },
      {
        "kanji": "太",
        "hanViet": "Thái",
        "meaning": "Béo tốt, dày dặn",
        "hiragana": "ふとい"
      }
    ],
    "description": "Hình người đứng dang rộng hai tay và hai chân hết cỡ để biểu thị sự to lớn."
  },
  {
    "id": 38,
    "character": "女",
    "variants": [],
    "hanViet": "Nữ",
    "meaning": "Phụ nữ, con gái, người mẹ",
    "strokeCount": 3,
    "reading": {
      "hiragana": "おんな",
      "romaji": "onna"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen - Nữ bàng) / Độc lập",
    "examples": [
      {
        "kanji": "好",
        "hanViet": "Hảo",
        "meaning": "Yêu thích",
        "hiragana": "すき"
      },
      {
        "kanji": "妹",
        "hanViet": "Muội",
        "meaning": "Em gái",
        "hiragana": "いもうと"
      },
      {
        "kanji": "姉",
        "hanViet": "Tỷ",
        "meaning": "Chị gái",
        "hiragana": "あね"
      }
    ],
    "description": "Hình người phụ nữ đoan trang đang quỳ gối bắt chéo tay duyên dáng."
  },
  {
    "id": 39,
    "character": "子",
    "variants": [],
    "hanViet": "Tử",
    "meaning": "Đứa con, trẻ nhỏ, mầm mống",
    "strokeCount": 3,
    "reading": {
      "hiragana": "こ",
      "romaji": "ko"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Độc lập",
    "examples": [
      {
        "kanji": "学",
        "hanViet": "Học",
        "meaning": "Học tập",
        "hiragana": "まなぶ"
      },
      {
        "kanji": "字",
        "hanViet": "Tự",
        "meaning": "Chữ viết",
        "hiragana": "じ"
      },
      {
        "kanji": "季",
        "hanViet": "Quý",
        "meaning": "Mùa trong năm",
        "hiragana": "き"
      }
    ],
    "description": "Hình đứa bé sơ sinh quấn tã vẫy hai cánh tay ngây thơ."
  },
  {
    "id": 40,
    "character": "宀",
    "variants": [],
    "hanViet": "Miên",
    "meaning": "Mái nhà che chở ấm cúng",
    "strokeCount": 3,
    "reading": {
      "hiragana": "うかんむり",
      "romaji": "ukanmuri"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "家",
        "hanViet": "Gia",
        "meaning": "Ngôi nhà, gia đình",
        "hiragana": "いえ"
      },
      {
        "kanji": "安",
        "hanViet": "An",
        "meaning": "Bình an, rẻ",
        "hiragana": "やすい"
      },
      {
        "kanji": "室",
        "hanViet": "Thất",
        "meaning": "Căn phòng",
        "hiragana": "しつ"
      }
    ],
    "description": "Hình mái nhà ngói có vách tường hai bên che mưa nắng ấm áp."
  },
  {
    "id": 41,
    "character": "寸",
    "variants": [],
    "hanViet": "Thốn",
    "meaning": "Tấc, gang tay, đơn vị đo cự ly nhỏ",
    "strokeCount": 3,
    "reading": {
      "hiragana": "すん",
      "romaji": "sun"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "寺",
        "hanViet": "Tự",
        "meaning": "Chùa chiền",
        "hiragana": "てら"
      },
      {
        "kanji": "封",
        "hanViet": "Phong",
        "meaning": "Niêm phong, phong bì",
        "hiragana": "ふう"
      },
      {
        "kanji": "射",
        "hanViet": "Xạ",
        "meaning": "Bắn tên, phát xạ",
        "hiragana": "いる"
      }
    ],
    "description": "Hình cổ tay có dấu chấm đánh dấu vị trí bắt mạch cự ly 1 tấc."
  },
  {
    "id": 42,
    "character": "小",
    "variants": [
      "⺌",
      "⺍"
    ],
    "hanViet": "Tiểu",
    "meaning": "Nhỏ bé, ít ỏi, tí hon",
    "strokeCount": 3,
    "reading": {
      "hiragana": "しょう",
      "romaji": "shou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "小",
        "hanViet": "Tiểu",
        "meaning": "Nhỏ bé",
        "hiragana": "ちいさい"
      },
      {
        "kanji": "少",
        "hanViet": "Thiểu",
        "meaning": "Ít ỏi",
        "hiragana": "すくない"
      },
      {
        "kanji": "光",
        "hanViet": "Quang",
        "meaning": "Ánh sáng",
        "hiragana": "ひかり"
      }
    ],
    "description": "Hình vật gì đó bị chẻ nhỏ thành các mảnh vụn li ti."
  },
  {
    "id": 43,
    "character": "尢",
    "variants": [
      "尣"
    ],
    "hanViet": "Uông",
    "meaning": "Chân què, còi cọc, yếu ớt",
    "strokeCount": 3,
    "reading": {
      "hiragana": "だいのまげあし",
      "romaji": "dainomageashi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "就",
        "hanViet": "Tựu",
        "meaning": "Đạt được, nhậm chức",
        "hiragana": "つく"
      },
      {
        "kanji": "尬",
        "hanViet": "Giới",
        "meaning": "Lúng túng, bối rối",
        "hiragana": "かい"
      },
      {
        "kanji": "尤",
        "hanViet": "Vưu",
        "meaning": "Đặc biệt, sai lầm",
        "hiragana": "もっとも"
      }
    ],
    "description": "Hình người một bên chân bị cong queo tật nguyền đi khập khiễng."
  },
  {
    "id": 44,
    "character": "尸",
    "variants": [],
    "hanViet": "Thi",
    "meaning": "Thân xác người ngồi, xác ướp, cơ thể",
    "strokeCount": 3,
    "reading": {
      "hiragana": "しかばね",
      "romaji": "shikabane"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare)",
    "examples": [
      {
        "kanji": "尺",
        "hanViet": "Xích",
        "meaning": "Thước đo",
        "hiragana": "しゃく"
      },
      {
        "kanji": "局",
        "hanViet": "Cục",
        "meaning": "Cục bộ, cơ quan",
        "hiragana": "きょく"
      },
      {
        "kanji": "屋",
        "hanViet": "Ốc",
        "meaning": "Mái nhà, cửa hàng",
        "hiragana": "や"
      }
    ],
    "description": "Hình người nằm hoặc ngồi khom lưng bất động như pho tượng."
  },
  {
    "id": 45,
    "character": "屮",
    "variants": [],
    "hanViet": "Triệt",
    "meaning": "Mầm cỏ non mới nhú lên khỏi đất",
    "strokeCount": 3,
    "reading": {
      "hiragana": "てつ",
      "romaji": "tetsu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "屯",
        "hanViet": "Đồn",
        "meaning": "Đóng quân, đồn trú",
        "hiragana": "とん"
      },
      {
        "kanji": "艸",
        "hanViet": "Thảo",
        "meaning": "Cỏ cây thảo mộc",
        "hiragana": "くさ"
      },
      {
        "kanji": "屈",
        "hanViet": "Khuất",
        "meaning": "Uốn cong, khuất phục",
        "hiragana": "かがむ"
      }
    ],
    "description": "Hình một búp mầm non vừa tách đất đâm chồi nhú lên."
  },
  {
    "id": 46,
    "character": "山",
    "variants": [],
    "hanViet": "Sơn",
    "meaning": "Núi non, ngọn núi ba đỉnh",
    "strokeCount": 3,
    "reading": {
      "hiragana": "やま",
      "romaji": "yama"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "山",
        "hanViet": "Sơn",
        "meaning": "Ngọn núi",
        "hiragana": "やま"
      },
      {
        "kanji": "岩",
        "hanViet": "Nham",
        "meaning": "Tảng đá lớn",
        "hiragana": "いわ"
      },
      {
        "kanji": "島",
        "hanViet": "Đảo",
        "meaning": "Hòn đảo",
        "hiragana": "しま"
      }
    ],
    "description": "Tượng hình ngọn núi hùng vĩ có 3 đỉnh nhô cao sừng sững."
  },
  {
    "id": 47,
    "character": "巛",
    "variants": [
      "川"
    ],
    "hanViet": "Xuyên",
    "meaning": "Dòng sông chảy xiết, con suối",
    "strokeCount": 3,
    "reading": {
      "hiragana": "かわ",
      "romaji": "kawa"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "川",
        "hanViet": "Xuyên",
        "meaning": "Dòng sông",
        "hiragana": "かわ"
      },
      {
        "kanji": "州",
        "hanViet": "Châu",
        "meaning": "Tiểu bang, cù lao",
        "hiragana": "しゅう"
      },
      {
        "kanji": "巡",
        "hanViet": "Tuần",
        "meaning": "Tuần tra, đi vòng quanh",
        "hiragana": "めぐる"
      }
    ],
    "description": "Hình ba dải nước uốn lượn chảy song song giữa hai bờ sông."
  },
  {
    "id": 48,
    "character": "工",
    "variants": [],
    "hanViet": "Công",
    "meaning": "Công cụ, thợ thủ công, công việc chế tạo",
    "strokeCount": 3,
    "reading": {
      "hiragana": "たくみ",
      "romaji": "takumi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "左",
        "hanViet": "Tả",
        "meaning": "Bên trái",
        "hiragana": "ひだり"
      },
      {
        "kanji": "巧",
        "hanViet": "Xảo",
        "meaning": "Khéo léo, tinh xảo",
        "hiragana": "たくみ"
      },
      {
        "kanji": "差",
        "hanViet": "Sai",
        "meaning": "Khác biệt, chênh lệch",
        "hiragana": "さ"
      }
    ],
    "description": "Hình chiếc thước vuông góc hoặc dụng cụ định hình của người thợ mộc xưa."
  },
  {
    "id": 49,
    "character": "己",
    "variants": [
      "已",
      "巳"
    ],
    "hanViet": "Kỷ",
    "meaning": "Bản thân mình, tự kỷ, sợi dây uốn lượn",
    "strokeCount": 3,
    "reading": {
      "hiragana": "おのれ",
      "romaji": "onore"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "己",
        "hanViet": "Kỷ",
        "meaning": "Chính mình",
        "hiragana": "おのれ"
      },
      {
        "kanji": "改",
        "hanViet": "Cải",
        "meaning": "Sửa đổi, cải cách",
        "hiragana": "あらためる"
      },
      {
        "kanji": "配",
        "hanViet": "Phối",
        "meaning": "Phân phát, phối hợp",
        "hiragana": "くばる"
      }
    ],
    "description": "Hình sợi dây thừng uốn lượn buộc lại hoặc dáng người cúi đầu tự ngẫm."
  },
  {
    "id": 50,
    "character": "巾",
    "variants": [],
    "hanViet": "Cân",
    "meaning": "Mảnh vải, khăn lau, tấm khăn vải rủ",
    "strokeCount": 3,
    "reading": {
      "hiragana": "はば",
      "romaji": "haba"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "布",
        "hanViet": "Bố",
        "meaning": "Vải vóc",
        "hiragana": "ぬの"
      },
      {
        "kanji": "市",
        "hanViet": "Thị",
        "meaning": "Thành phố, chợ buôn bán",
        "hiragana": "いち"
      },
      {
        "kanji": "希",
        "hanViet": "Hi",
        "meaning": "Hi vọng, hiếm hoi",
        "hiragana": "まれ"
      }
    ],
    "description": "Hình dải khăn vải buông rủ xuống từ chiếc giá treo đồ."
  },
  {
    "id": 51,
    "character": "干",
    "variants": [],
    "hanViet": "Can",
    "meaning": "Cái khiên che chắn, can dự, bờ sông khô",
    "strokeCount": 3,
    "reading": {
      "hiragana": "かん",
      "romaji": "kan"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "干",
        "hanViet": "Can",
        "meaning": "Phơi khô, can dự",
        "hiragana": "ほす"
      },
      {
        "kanji": "平",
        "hanViet": "Bình",
        "meaning": "Bình an, bằng phẳng",
        "hiragana": "たいら"
      },
      {
        "kanji": "年",
        "hanViet": "Niên",
        "meaning": "Năm, tuổi",
        "hiragana": "とし"
      }
    ],
    "description": "Hình chiếc mộc khiên gỗ dùng ngăn tên đạn của kẻ thù."
  },
  {
    "id": 52,
    "character": "幺",
    "variants": [],
    "hanViet": "Yêu",
    "meaning": "Nhỏ nhắn, non nớt, sợi tơ nhỏ",
    "strokeCount": 3,
    "reading": {
      "hiragana": "いとがしら",
      "romaji": "itogashira"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "幼",
        "hanViet": "Ấu",
        "meaning": "Thơ ấu, non nớt",
        "hiragana": "おさない"
      },
      {
        "kanji": "幻",
        "hanViet": "Huyễn",
        "meaning": "Ảo ảnh, huyễn hoặc",
        "hiragana": "まぼろし"
      },
      {
        "kanji": "幽",
        "hanViet": "U",
        "meaning": "U tối, u huyền",
        "hiragana": "ゆう"
      }
    ],
    "description": "Hình nửa sợi chỉ tơ tằm ngắn và mỏng mảnh."
  },
  {
    "id": 53,
    "character": "广",
    "variants": [],
    "hanViet": "Quảng",
    "meaning": "Mái nhà bên sườn núi, mái hiên rộng mở",
    "strokeCount": 3,
    "reading": {
      "hiragana": "まだれ",
      "romaji": "madare"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare)",
    "examples": [
      {
        "kanji": "広",
        "hanViet": "Quảng",
        "meaning": "Rộng lớn",
        "hiragana": "ひろい"
      },
      {
        "kanji": "床",
        "hanViet": "Sàng",
        "meaning": "Sàn nhà, giường",
        "hiragana": "ゆか"
      },
      {
        "kanji": "店",
        "hanViet": "Điếm",
        "meaning": "Cửa tiệm, quán",
        "hiragana": "みせ"
      }
    ],
    "description": "Hình ngôi nhà chỉ có mái và một bên vách tựa lưng vào vách núi."
  },
  {
    "id": 54,
    "character": "廴",
    "variants": [],
    "hanViet": "Dẫn",
    "meaning": "Bước chân dài, kéo dài đường đi",
    "strokeCount": 3,
    "reading": {
      "hiragana": "えんにょう",
      "romaji": "ennyou"
    },
    "position": "nyoo",
    "positionNameVi": "Góc dưới trái (Nyoo)",
    "examples": [
      {
        "kanji": "延",
        "hanViet": "Duyên",
        "meaning": "Kéo dài, trì hoãn",
        "hiragana": "のびる"
      },
      {
        "kanji": "廷",
        "hanViet": "Đình",
        "meaning": "Triều đình, pháp đình",
        "hiragana": "てい"
      },
      {
        "kanji": "建",
        "hanViet": "Kiến",
        "meaning": "Xây dựng",
        "hiragana": "たてる"
      }
    ],
    "description": "Hình bàn chân bước sải dài dạo bước trên con đường lớn."
  },
  {
    "id": 55,
    "character": "廾",
    "variants": [],
    "hanViet": "Củng",
    "meaning": "Hai tay chắp lại dâng đồ, cùng nhau",
    "strokeCount": 3,
    "reading": {
      "hiragana": "こまぬき",
      "romaji": "komanuki"
    },
    "position": "ashi",
    "positionNameVi": "Ở dưới (Ashi)",
    "examples": [
      {
        "kanji": "弁",
        "hanViet": "Biện",
        "meaning": "Biện hộ, van lơn",
        "hiragana": "べん"
      },
      {
        "kanji": "弊",
        "hanViet": "Tệ",
        "meaning": "Tệ hại, sai hỏng",
        "hiragana": "へい"
      },
      {
        "kanji": "弄",
        "hanViet": "Lộng",
        "meaning": "Đùa cợt, mân mê",
        "hiragana": "もてあそぶ"
      }
    ],
    "description": "Hình hai bàn tay chắp lại nâng niu cúng dường đồ vật lên trời."
  },
  {
    "id": 56,
    "character": "弋",
    "variants": [],
    "hanViet": "Dặc",
    "meaning": "Cái cọc gỗ, mũi tên có buộc dây săn bắn",
    "strokeCount": 3,
    "reading": {
      "hiragana": "しきがまえ",
      "romaji": "shikigamae"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "式",
        "hanViet": "Thức",
        "meaning": "Nghi thức, công thức",
        "hiragana": "しき"
      },
      {
        "kanji": "弐",
        "hanViet": "Nhị",
        "meaning": "Số hai (trang trọng)",
        "hiragana": "に"
      },
      {
        "kanji": "弑",
        "hanViet": "Thí",
        "meaning": "Giết cấp trên, phản nghịch",
        "hiragana": "しい"
      }
    ],
    "description": "Hình chiếc cọc nhọn cắm mốc hoặc mũi tên có dây kéo lại khi bắn chim."
  },
  {
    "id": 57,
    "character": "弓",
    "variants": [],
    "hanViet": "Cung",
    "meaning": "Cây cung bắn tên, uốn cong",
    "strokeCount": 3,
    "reading": {
      "hiragana": "ゆみ",
      "romaji": "yumi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen) / Toàn thân",
    "examples": [
      {
        "kanji": "弓",
        "hanViet": "Cung",
        "meaning": "Cây cung",
        "hiragana": "ゆみ"
      },
      {
        "kanji": "引",
        "hanViet": "Dẫn",
        "meaning": "Kéo, lôi",
        "hiragana": "ひく"
      },
      {
        "kanji": "強",
        "hanViet": "Cường",
        "meaning": "Mạnh mẽ",
        "hiragana": "つよい"
      }
    ],
    "description": "Hình cánh cung gỗ uốn cong có dây cung căng lực."
  },
  {
    "id": 58,
    "character": "彐",
    "variants": [
      "彑"
    ],
    "hanViet": "Kê",
    "meaning": "Đầu con heo rừng, mõm con lợn",
    "strokeCount": 3,
    "reading": {
      "hiragana": "けいがしら",
      "romaji": "keigashira"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "当",
        "hanViet": "Đương",
        "meaning": "Chính xác, trúng",
        "hiragana": "あたる"
      },
      {
        "kanji": "彙",
        "hanViet": "Vị",
        "meaning": "Từ vựng, gom góp",
        "hiragana": "い"
      },
      {
        "kanji": "彗",
        "hanViet": "Tuệ",
        "meaning": "Chổi quét, sao chổi",
        "hiragana": "すい"
      }
    ],
    "description": "Hình chiếc mõm nhọn của loài lợn rừng đang ủi đất tìm củ."
  },
  {
    "id": 59,
    "character": "彡",
    "variants": [],
    "hanViet": "Tam",
    "meaning": "Lông sam, chùm lông chim, hoa văn rực rỡ",
    "strokeCount": 3,
    "reading": {
      "hiragana": "さんづくり",
      "romaji": "sandzukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "形",
        "hanViet": "Hình",
        "meaning": "Hình dạng",
        "hiragana": "かたち"
      },
      {
        "kanji": "彩",
        "hanViet": "Thải",
        "meaning": "Sắc màu rực rỡ",
        "hiragana": "いろどる"
      },
      {
        "kanji": "影",
        "hanViet": "Ảnh",
        "meaning": "Bóng râm, hình bóng",
        "hiragana": "かげ"
      }
    ],
    "description": "Hình ba nét phất nhẹ tượng trưng cho chùm lông óng ả hoặc hoa văn đẹp."
  },
  {
    "id": 60,
    "character": "彳",
    "variants": [],
    "hanViet": "Xích",
    "meaning": "Bước chân trái, bước đi chậm rãi",
    "strokeCount": 3,
    "reading": {
      "hiragana": "ぎょうにんべん",
      "romaji": "gyouninben"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Xích bàng / Chim chích)",
    "examples": [
      {
        "kanji": "役",
        "hanViet": "Dịch",
        "meaning": "Vai trò, phục vụ",
        "hiragana": "やく"
      },
      {
        "kanji": "彼",
        "hanViet": "Bỉ",
        "meaning": "Anh ấy, đằng kia",
        "hiragana": "かれ"
      },
      {
        "kanji": "待",
        "hanViet": "Đãi",
        "meaning": "Chờ đợi",
        "hiragana": "まつ"
      }
    ],
    "description": "Nửa bên trái của chữ Hành (行), biểu thị hành động cất bước chân đi."
  },
  {
    "id": 61,
    "character": "心",
    "variants": [
      "忄",
      "⺗"
    ],
    "hanViet": "Tâm",
    "meaning": "Trái tim, tâm trí, cảm xúc, tâm hồn",
    "strokeCount": 4,
    "reading": {
      "hiragana": "こころ",
      "romaji": "kokoro"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Tâm đứng 忄) / Ở dưới (Tâm đáy 心)",
    "examples": [
      {
        "kanji": "情",
        "hanViet": "Tình",
        "meaning": "Tình cảm",
        "hiragana": "じょう"
      },
      {
        "kanji": "思",
        "hanViet": "Tư",
        "meaning": "Suy nghĩ, tưởng nhớ",
        "hiragana": "おもう"
      },
      {
        "kanji": "忙",
        "hanViet": "Mang",
        "meaning": "Bận rộn",
        "hiragana": "いそがしい"
      }
    ],
    "description": "Tượng hình trái tim có các tâm thất tâm nhĩ bơm máu và chứa đựng cảm xúc."
  },
  {
    "id": 62,
    "character": "戈",
    "variants": [],
    "hanViet": "Qua",
    "meaning": "Cây giáo mác dài, vũ khí chiến đấu",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ほこ",
      "romaji": "hoko"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "戊",
        "hanViet": "Mậu",
        "meaning": "Can Mậu",
        "hiragana": "ぼ"
      },
      {
        "kanji": "成",
        "hanViet": "Thành",
        "meaning": "Hoàn thành, trở thành",
        "hiragana": "なる"
      },
      {
        "kanji": "戦",
        "hanViet": "Chiến",
        "meaning": "Chiến tranh, đánh nhau",
        "hiragana": "たたかう"
      }
    ],
    "description": "Hình ngọn giáo có gắn lưỡi ngang nhọn dùng trong chiến trận cổ."
  },
  {
    "id": 63,
    "character": "戶",
    "variants": [
      "户",
      "戸"
    ],
    "hanViet": "Hộ",
    "meaning": "Cánh cửa đơn một cánh, hộ gia đình",
    "strokeCount": 4,
    "reading": {
      "hiragana": "と",
      "romaji": "to"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare)",
    "examples": [
      {
        "kanji": "房",
        "hanViet": "Phòng",
        "meaning": "Buồng ở, chùm",
        "hiragana": "ふさ"
      },
      {
        "kanji": "所",
        "hanViet": "Sở",
        "meaning": "Nơi chốn",
        "hiragana": "ところ"
      },
      {
        "kanji": "扇",
        "hanViet": "Phiến",
        "meaning": "Chiếc quạt xếp",
        "hiragana": "おうぎ"
      }
    ],
    "description": "Hình một nửa của bộ Môn (門) - cánh cửa gỗ đơn của gian nhà nhỏ."
  },
  {
    "id": 64,
    "character": "手",
    "variants": [
      "扌"
    ],
    "hanViet": "Thủ",
    "meaning": "Bàn tay, thao tác, hành động",
    "strokeCount": 4,
    "reading": {
      "hiragana": "て",
      "romaji": "te"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thủ gảy 扌) / Toàn thân",
    "examples": [
      {
        "kanji": "持",
        "hanViet": "Trì",
        "meaning": "Cầm, nắm, duy trì",
        "hiragana": "もつ"
      },
      {
        "kanji": "打",
        "hanViet": "Đả",
        "meaning": "Đánh, đập",
        "hiragana": "うつ"
      },
      {
        "kanji": "指",
        "hanViet": "Chỉ",
        "meaning": "Ngón tay, chỉ điểm",
        "hiragana": "ゆび"
      }
    ],
    "description": "Hình bàn tay có năm ngón xòe ra nắm bắt đồ vật."
  },
  {
    "id": 65,
    "character": "支",
    "variants": [],
    "hanViet": "Chi",
    "meaning": "Cành cây, chi nhánh, chống đỡ",
    "strokeCount": 4,
    "reading": {
      "hiragana": "しにょう",
      "romaji": "shinyou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên phải",
    "examples": [
      {
        "kanji": "支",
        "hanViet": "Chi",
        "meaning": "Chống đỡ, chi nhánh",
        "hiragana": "ささえる"
      },
      {
        "kanji": "枝",
        "hanViet": "Chi",
        "meaning": "Cành cây nhỏ",
        "hiragana": "えだ"
      },
      {
        "kanji": "鼓",
        "hanViet": "Cổ",
        "meaning": "Cái trống",
        "hiragana": "つづみ"
      }
    ],
    "description": "Hình bàn tay cầm một cành cây nhỏ chống đỡ đồ vật."
  },
  {
    "id": 66,
    "character": "攴",
    "variants": [
      "攵"
    ],
    "hanViet": "Phác",
    "meaning": "Đánh khẽ, gõ nhẹ, thúc đẩy hành động",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ぼくづくり",
      "romaji": "bokuzukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Phác khẽ 攵)",
    "examples": [
      {
        "kanji": "改",
        "hanViet": "Cải",
        "meaning": "Sửa đổi, cải tiến",
        "hiragana": "あらためる"
      },
      {
        "kanji": "放",
        "hanViet": "Phóng",
        "meaning": "Thả ra, giải phóng",
        "hiragana": "はなす"
      },
      {
        "kanji": "政",
        "hanViet": "Chính",
        "meaning": "Chính trị, chính sách",
        "hiragana": "せい"
      }
    ],
    "description": "Hình bàn tay cầm roi nhỏ khẽ gõ thúc đẩy làm việc đúng đắn."
  },
  {
    "id": 67,
    "character": "文",
    "variants": [],
    "hanViet": "Văn",
    "meaning": "Chữ nghĩa, văn chương, hoa văn đan dệt",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ぶん",
      "romaji": "bun"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "文",
        "hanViet": "Văn",
        "meaning": "Câu văn, chữ nghĩa",
        "hiragana": "ふみ"
      },
      {
        "kanji": "斉",
        "hanViet": "Tề",
        "meaning": "Đồng đều, chỉnh tề",
        "hiragana": "そろえる"
      },
      {
        "kanji": "斑",
        "hanViet": "Ban",
        "meaning": "Vết đốm lốm đốm",
        "hiragana": "ぶち"
      }
    ],
    "description": "Hình các đường nét hoa văn đan chéo xăm trên ngực người thời cổ."
  },
  {
    "id": 68,
    "character": "斗",
    "variants": [],
    "hanViet": "Đẩu",
    "meaning": "Cái gáo múc nước, đấu đong gạo, sao Bắc Đẩu",
    "strokeCount": 4,
    "reading": {
      "hiragana": "とます",
      "romaji": "tomasu"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "料",
        "hanViet": "Liệu",
        "meaning": "Nguyên liệu, phí tổn",
        "hiragana": "りょう"
      },
      {
        "kanji": "斜",
        "hanViet": "Tà",
        "meaning": "Nghiêng, dốc xiên",
        "hiragana": "ななめ"
      },
      {
        "kanji": "斛",
        "hanViet": "Hộc",
        "meaning": "Hộc đong mười đấu",
        "hiragana": "こく"
      }
    ],
    "description": "Hình chiếc muôi cán dài đong hạt thóc ngũ cốc."
  },
  {
    "id": 69,
    "character": "斤",
    "variants": [],
    "hanViet": "Cân",
    "meaning": "Chiếc rìu chặt cây, đơn vị cân lường",
    "strokeCount": 4,
    "reading": {
      "hiragana": "きん",
      "romaji": "kin"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải / Độc lập",
    "examples": [
      {
        "kanji": "斧",
        "hanViet": "Phủ",
        "meaning": "Cái rìu đốn cây",
        "hiragana": "おの"
      },
      {
        "kanji": "断",
        "hanViet": "Đoạn",
        "meaning": "Cắt đứt, quyết đoán",
        "hiragana": "ことわる"
      },
      {
        "kanji": "新",
        "hanViet": "Tân",
        "meaning": "Mới mẻ",
        "hiragana": "あたらしい"
      }
    ],
    "description": "Tượng hình chiếc rìu sắc bén có cán cầm chặt gỗ."
  },
  {
    "id": 70,
    "character": "方",
    "variants": [],
    "hanViet": "Phương",
    "meaning": "Phương hướng, cách thức, vuông vức",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ほう",
      "romaji": "hou"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "方",
        "hanViet": "Phương",
        "meaning": "Hướng đi, cách thức",
        "hiragana": "かた"
      },
      {
        "kanji": "旅",
        "hanViet": "Lữ",
        "meaning": "Du lịch, lữ hành",
        "hiragana": "たび"
      },
      {
        "kanji": "族",
        "hanViet": "Tộc",
        "meaning": "Gia tộc, chủng tộc",
        "hiragana": "ぞく"
      }
    ],
    "description": "Hình hai con thuyền ghép đôi mũi vuông song hành hoặc cây cày đất."
  },
  {
    "id": 71,
    "character": "无",
    "variants": [
      "旡"
    ],
    "hanViet": "Vô",
    "meaning": "Không có, hư không, thiếu thốn",
    "strokeCount": 4,
    "reading": {
      "hiragana": "なし",
      "romaji": "nashi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "既",
        "hanViet": "Ký",
        "meaning": "Đã xong, đã qua",
        "hiragana": "すでに"
      },
      {
        "kanji": "厩",
        "hanViet": "Cứu",
        "meaning": "Chuồng ngựa",
        "hiragana": "うまや"
      },
      {
        "kanji": "无",
        "hanViet": "Vô",
        "meaning": "Hư vô",
        "hiragana": "ぶ"
      }
    ],
    "description": "Hình người đang nghẹn ngào hụt hơi, không còn hơi thở."
  },
  {
    "id": 72,
    "character": "日",
    "variants": [],
    "hanViet": "Nhật",
    "meaning": "Mặt trời, ngày, thời gian, ban ngày",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ひ",
      "romaji": "hi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "明",
        "hanViet": "Minh",
        "meaning": "Sáng sủa",
        "hiragana": "あかるい"
      },
      {
        "kanji": "時",
        "hanViet": "Thời",
        "meaning": "Thời gian, giờ giấc",
        "hiragana": "とき"
      },
      {
        "kanji": "晴",
        "hanViet": "Tình",
        "meaning": "Trời quang đãng tạnh ráo",
        "hiragana": "はれる"
      }
    ],
    "description": "Hình mặt trời hình tròn có vệt chấm đen ở chính giữa tâm."
  },
  {
    "id": 73,
    "character": "曰",
    "variants": [],
    "hanViet": "Viết",
    "meaning": "Nói rằng, rằng là, thốt lên lời",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ひらび",
      "romaji": "hirabi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Khung dẹt",
    "examples": [
      {
        "kanji": "曲",
        "hanViet": "Khúc",
        "meaning": "Uốn cong, khúc ca",
        "hiragana": "まがる"
      },
      {
        "kanji": "更",
        "hanViet": "Canh",
        "meaning": "Thêm nữa, canh gác",
        "hiragana": "さらに"
      },
      {
        "kanji": "書",
        "hanViet": "Thư",
        "meaning": "Viết sách",
        "hiragana": "かく"
      }
    ],
    "description": "Hình cái miệng mở rộng (ngang bè ra) phát ra luồng hơi nói chuyện."
  },
  {
    "id": 74,
    "character": "月",
    "variants": [],
    "hanViet": "Nguyệt",
    "meaning": "Mặt trăng, tháng, ban đêm",
    "strokeCount": 4,
    "reading": {
      "hiragana": "つき",
      "romaji": "tsuki"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "朝",
        "hanViet": "Triều",
        "meaning": "Buổi sáng",
        "hiragana": "あさ"
      },
      {
        "kanji": "期",
        "hanViet": "Kỳ",
        "meaning": "Thời kỳ, kỳ hạn",
        "hiragana": "き"
      },
      {
        "kanji": "望",
        "hanViet": "Vọng",
        "meaning": "Ước vọng, trông ngóng",
        "hiragana": "のぞむ"
      }
    ],
    "description": "Hình vầng trăng khuyết lơ lửng soi sáng bầu trời đêm."
  },
  {
    "id": 75,
    "character": "木",
    "variants": [],
    "hanViet": "Mộc",
    "meaning": "Cây cối, gỗ, thực vật thân gỗ",
    "strokeCount": 4,
    "reading": {
      "hiragana": "き",
      "romaji": "ki"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Mộc đứng) / Toàn thân",
    "examples": [
      {
        "kanji": "本",
        "hanViet": "Bản",
        "meaning": "Gốc rễ, cuốn sách",
        "hiragana": "ほん"
      },
      {
        "kanji": "林",
        "hanViet": "Lâm",
        "meaning": "Rừng thưa",
        "hiragana": "はやし"
      },
      {
        "kanji": "森",
        "hanViet": "Sâm",
        "meaning": "Rừng rậm rạp",
        "hiragana": "もり"
      }
    ],
    "description": "Hình cây có cành lá vươn lên trên và rễ cắm sâu xuống đất."
  },
  {
    "id": 76,
    "character": "欠",
    "variants": [],
    "hanViet": "Khiếm",
    "meaning": "Há miệng ngáp, thiếu thốn, khiếm khuyết",
    "strokeCount": 4,
    "reading": {
      "hiragana": "あくび",
      "romaji": "akubi"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Khiếm ngáp)",
    "examples": [
      {
        "kanji": "次",
        "hanViet": "Thứ",
        "meaning": "Tiếp theo, lần tới",
        "hiragana": "つぎ"
      },
      {
        "kanji": "欲",
        "hanViet": "Dục",
        "meaning": "Ham muốn",
        "hiragana": "ほしい"
      },
      {
        "kanji": "歌",
        "hanViet": "Ca",
        "meaning": "Bài hát",
        "hiragana": "うた"
      }
    ],
    "description": "Hình người đang quỳ há to miệng hít sâu ngáp vì mệt mỏi."
  },
  {
    "id": 77,
    "character": "止",
    "variants": [],
    "hanViet": "Chỉ",
    "meaning": "Dừng lại, đình chỉ, đứng yên",
    "strokeCount": 4,
    "reading": {
      "hiragana": "とめる",
      "romaji": "tomeru"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "正",
        "hanViet": "Chính",
        "meaning": "Ngay thẳng, đúng đắn",
        "hiragana": "ただしい"
      },
      {
        "kanji": "歩",
        "hanViet": "Bộ",
        "meaning": "Đi bộ",
        "hiragana": "あるく"
      },
      {
        "kanji": "歴",
        "hanViet": "Lịch",
        "meaning": "Lịch sử, trải qua",
        "hiragana": "れき"
      }
    ],
    "description": "Hình bàn chân đặt vững trên mặt đất ngừng bước tiến."
  },
  {
    "id": 78,
    "character": "歹",
    "variants": [
      "歺"
    ],
    "hanViet": "Đãi",
    "meaning": "Mẩu xương tàn, chết chóc, tan rã",
    "strokeCount": 4,
    "reading": {
      "hiragana": "かばねへん",
      "romaji": "kabanehen"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Đãi bàng)",
    "examples": [
      {
        "kanji": "死",
        "hanViet": "Tử",
        "meaning": "Cái chết",
        "hiragana": "しぬ"
      },
      {
        "kanji": "殊",
        "hanViet": "Thù",
        "meaning": "Đặc thù, khác biệt",
        "hiragana": "こと"
      },
      {
        "kanji": "残",
        "hanViet": "Tàn",
        "meaning": "Còn sót lại, tàn nhẫn",
        "hiragana": "のこる"
      }
    ],
    "description": "Hình khúc xương người vỡ nát mục rữa tượng trưng cho cái chết."
  },
  {
    "id": 79,
    "character": "殳",
    "variants": [],
    "hanViet": "Thù",
    "meaning": "Binh khí gậy gỗ, ngọn giáo không có ngạnh",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ほこづくり",
      "romaji": "hokozukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "段",
        "hanViet": "Đoạn",
        "meaning": "Bậc thang, giai đoạn",
        "hiragana": "だん"
      },
      {
        "kanji": "殺",
        "hanViet": "Sát",
        "meaning": "Giết chóc",
        "hiragana": "ころす"
      },
      {
        "kanji": "殻",
        "hanViet": "Xác",
        "meaning": "Vỏ ốc, mai cứng",
        "hiragana": "から"
      }
    ],
    "description": "Hình bàn tay cầm cây gậy dài vung đánh trong chiến trận."
  },
  {
    "id": 80,
    "character": "毋",
    "variants": [
      "母"
    ],
    "hanViet": "Vô",
    "meaning": "Chớ, đừng, người mẹ hiền",
    "strokeCount": 4,
    "reading": {
      "hiragana": "なかれ",
      "romaji": "nakare"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "母",
        "hanViet": "Mẫu",
        "meaning": "Mẹ",
        "hiragana": "はは"
      },
      {
        "kanji": "毎",
        "hanViet": "Mỗi",
        "meaning": "Mỗi ngày, hàng ngày",
        "hiragana": "ごと"
      },
      {
        "kanji": "毒",
        "hanViet": "Độc",
        "meaning": "Chất độc",
        "hiragana": "どく"
      }
    ],
    "description": "Hình người phụ nữ có hai bầu vú cho con bú sữa mẹ."
  },
  {
    "id": 81,
    "character": "比",
    "variants": [],
    "hanViet": "Tỷ",
    "meaning": "So sánh, kề vai sát cánh, tỉ giảo",
    "strokeCount": 4,
    "reading": {
      "hiragana": "くらべる",
      "romaji": "kuraberu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "皆",
        "hanViet": "Giai",
        "meaning": "Tất cả mọi người",
        "hiragana": "みな"
      },
      {
        "kanji": "昆",
        "hanViet": "Côn",
        "meaning": "Côn trùng",
        "hiragana": "こん"
      },
      {
        "kanji": "批",
        "hanViet": "Phê",
        "meaning": "Phê bình, phán xét",
        "hiragana": "ひ"
      }
    ],
    "description": "Hình hai người đứng sát vai nhau cùng hướng để so bề cao thấp."
  },
  {
    "id": 82,
    "character": "毛",
    "variants": [],
    "hanViet": "Mao",
    "meaning": "Lông thú, sợi tóc, lông vũ",
    "strokeCount": 4,
    "reading": {
      "hiragana": "け",
      "romaji": "ke"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "毛",
        "hanViet": "Mao",
        "meaning": "Sợi lông, tóc",
        "hiragana": "け"
      },
      {
        "kanji": "毫",
        "hanViet": "Hào",
        "meaning": "Sợi lông nhỏ li ti",
        "hiragana": "ごう"
      },
      {
        "kanji": "尾",
        "hanViet": "Vĩ",
        "meaning": "Cái đuôi con vật",
        "hiragana": "お"
      }
    ],
    "description": "Hình những sợi lông mềm mại mọc uốn lượn trên da con vật."
  },
  {
    "id": 83,
    "character": "氏",
    "variants": [],
    "hanViet": "Thị",
    "meaning": "Dòng họ, thị tộc, dòng dõi tôn quý",
    "strokeCount": 4,
    "reading": {
      "hiragana": "うじ",
      "romaji": "uji"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "民",
        "hanViet": "Dân",
        "meaning": "Nhân dân",
        "hiragana": "たみ"
      },
      {
        "kanji": "紙",
        "hanViet": "Chỉ",
        "meaning": "Tờ giấy",
        "hiragana": "かみ"
      },
      {
        "kanji": "婚",
        "hanViet": "Hôn",
        "meaning": "Kết hôn",
        "hiragana": "こん"
      }
    ],
    "description": "Hình ngọn núi đá vững chãi hoặc chiếc thìa nghi lễ truyền đời của dòng họ."
  },
  {
    "id": 84,
    "character": "气",
    "variants": [],
    "hanViet": "Khí",
    "meaning": "Khí quyển, hơi nước bốc lên, mây trời",
    "strokeCount": 4,
    "reading": {
      "hiragana": "きがまえ",
      "romaji": "kigamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh (Kamae)",
    "examples": [
      {
        "kanji": "気",
        "hanViet": "Khí",
        "meaning": "Khí sắc, tinh thần",
        "hiragana": "き"
      },
      {
        "kanji": "汽",
        "hanViet": "Khí",
        "meaning": "Hơi nước tàu hỏa",
        "hiragana": "き"
      },
      {
        "kanji": "氛",
        "hanViet": "Phân",
        "meaning": "Bầu không khí u ám",
        "hiragana": "ふん"
      }
    ],
    "description": "Hình những làn mây hơi nước bốc lên cuộn tròn trên bầu trời."
  },
  {
    "id": 85,
    "character": "水",
    "variants": [
      "氵",
      "氺"
    ],
    "hanViet": "Thủy",
    "meaning": "Nước, chất lỏng, sông biển, dòng chảy",
    "strokeCount": 4,
    "reading": {
      "hiragana": "みず",
      "romaji": "mizu"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Ba chấm thủy 氵) / Toàn thân",
    "examples": [
      {
        "kanji": "海",
        "hanViet": "Hải",
        "meaning": "Biển cả",
        "hiragana": "うみ"
      },
      {
        "kanji": "泳",
        "hanViet": "Vịnh",
        "meaning": "Bơi lội",
        "hiragana": "およぐ"
      },
      {
        "kanji": "江",
        "hanViet": "Giang",
        "meaning": "Con sông lớn",
        "hiragana": "え"
      }
    ],
    "description": "Hình dòng nước tuôn chảy uốn lượn có các giọt nước bắn tung tóe."
  },
  {
    "id": 86,
    "character": "火",
    "variants": [
      "灬"
    ],
    "hanViet": "Hỏa",
    "meaning": "Ngọn lửa, sức nóng, nấu nướng, ánh sáng",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ひ",
      "romaji": "hi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hỏa đứng) / Ở dưới (Bốn đốm lửa 灬)",
    "examples": [
      {
        "kanji": "灯",
        "hanViet": "Đăng",
        "meaning": "Đèn chiếu sáng",
        "hiragana": "ひ"
      },
      {
        "kanji": "焼",
        "hanViet": "Thiêu",
        "meaning": "Nướng, đốt cháy",
        "hiragana": "やく"
      },
      {
        "kanji": "熱",
        "hanViet": "Nhiệt",
        "meaning": "Nóng, nhiệt tình",
        "hiragana": "あつい"
      }
    ],
    "description": "Hình ngọn lửa đang bùng cháy rực rỡ có các tia tàn lửa bay lên."
  },
  {
    "id": 87,
    "character": "爪",
    "variants": [
      "爫"
    ],
    "hanViet": "Trảo",
    "meaning": "Móng vuốt thú dữ, cào cấu",
    "strokeCount": 4,
    "reading": {
      "hiragana": "つめ",
      "romaji": "tsume"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri) / Toàn thân",
    "examples": [
      {
        "kanji": "争",
        "hanViet": "Tranh",
        "meaning": "Tranh chấp, cướp đoạt",
        "hiragana": "あらそう"
      },
      {
        "kanji": "妥",
        "hanViet": "Thỏa",
        "meaning": "Thỏa hiệp, ổn thỏa",
        "hiragana": "だ"
      },
      {
        "kanji": "受",
        "hanViet": "Thụ",
        "meaning": "Nhận lấy",
        "hiragana": "うける"
      }
    ],
    "description": "Hình bàn tay quặp xuống với những móng vuốt sắc nhọn chộp lấy mồi."
  },
  {
    "id": 88,
    "character": "父",
    "variants": [],
    "hanViet": "Phụ",
    "meaning": "Người cha, trụ cột gia đình",
    "strokeCount": 4,
    "reading": {
      "hiragana": "ちち",
      "romaji": "chichi"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên / Toàn thân",
    "examples": [
      {
        "kanji": "父",
        "hanViet": "Phụ",
        "meaning": "Người cha",
        "hiragana": "ちち"
      },
      {
        "kanji": "斧",
        "hanViet": "Phủ",
        "meaning": "Cái rìu",
        "hiragana": "おの"
      },
      {
        "kanji": "爹",
        "hanViet": "Đa",
        "meaning": "Cha già",
        "hiragana": "てて"
      }
    ],
    "description": "Hình bàn tay người cha giơ cây gậy gia pháp dạy dỗ con cái."
  },
  {
    "id": 89,
    "character": "爻",
    "variants": [],
    "hanViet": "Hào",
    "meaning": "Vạch quẻ Kinh Dịch, đan xen, giao thoa",
    "strokeCount": 4,
    "reading": {
      "hiragana": "こう",
      "romaji": "kou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "爽",
        "hanViet": "Sảng",
        "meaning": "Sảng khoái, trong trẻo",
        "hiragana": "さわやか"
      },
      {
        "kanji": "爾",
        "hanViet": "Nhĩ",
        "meaning": "Ngươi, mày",
        "hiragana": "なんじ"
      },
      {
        "kanji": "俎",
        "hanViet": "Trở",
        "meaning": "Cái thớt thái thịt",
        "hiragana": "まないた"
      }
    ],
    "description": "Hình các que bói tre đan chéo giao nhau tạo thành quẻ dịch."
  },
  {
    "id": 90,
    "character": "爿",
    "variants": [
      "丬"
    ],
    "hanViet": "Tường",
    "meaning": "Tấm ván xẻ dọc, chiếc giường nằm",
    "strokeCount": 4,
    "reading": {
      "hiragana": "しょうへん",
      "romaji": "shouhen"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hen)",
    "examples": [
      {
        "kanji": "牀",
        "hanViet": "Sàng",
        "meaning": "Chiếc giường ngủ",
        "hiragana": "とこ"
      },
      {
        "kanji": "牆",
        "hanViet": "Tường",
        "meaning": "Bức tường rào",
        "hiragana": "かき"
      },
      {
        "kanji": "壯",
        "hanViet": "Tráng",
        "meaning": "Khỏe khoắn, tráng kiện",
        "hiragana": "さかん"
      }
    ],
    "description": "Nửa bên trái của khúc gỗ xẻ đôi dựng đứng tạo vách phản."
  },
  {
    "id": 91,
    "character": "片",
    "variants": [],
    "hanViet": "Phiến",
    "meaning": "Mảnh gỗ mỏng, tấm danh thiếp, một bên",
    "strokeCount": 4,
    "reading": {
      "hiragana": "かた",
      "romaji": "kata"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "版",
        "hanViet": "Bản",
        "meaning": "Bản in, xuất bản",
        "hiragana": "はん"
      },
      {
        "kanji": "牌",
        "hanViet": "Bài",
        "meaning": "Thẻ bài, quân cờ",
        "hiragana": "はい"
      },
      {
        "kanji": "牒",
        "hanViet": "Điệp",
        "meaning": "Giấy tờ điệp văn",
        "hiragana": "ちょう"
      }
    ],
    "description": "Nửa bên phải của khúc gỗ chẻ mỏng, ngụ ý một nửa, mảnh vụn."
  },
  {
    "id": 92,
    "character": "牙",
    "variants": [],
    "hanViet": "Nha",
    "meaning": "Răng nanh, răng thú đan chéo",
    "strokeCount": 4,
    "reading": {
      "hiragana": "きば",
      "romaji": "kiba"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "牙",
        "hanViet": "Nha",
        "meaning": "Răng nanh",
        "hiragana": "きば"
      },
      {
        "kanji": "邪",
        "hanViet": "Tà",
        "meaning": "Gian tà, tà độc",
        "hiragana": "じゃ"
      },
      {
        "kanji": "雅",
        "hanViet": "Nhã",
        "meaning": "Tao nhã, thanh lịch",
        "hiragana": "みやび"
      }
    ],
    "description": "Hình hai chiếc răng nanh trên và dưới cài khớp vào nhau."
  },
  {
    "id": 93,
    "character": "牛",
    "variants": [
      "牜"
    ],
    "hanViet": "Ngưu",
    "meaning": "Con trâu, con bò, gia súc",
    "strokeCount": 4,
    "reading": {
      "hiragana": "うし",
      "romaji": "ushi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Ngưu đứng 牜) / Toàn thân",
    "examples": [
      {
        "kanji": "特",
        "hanViet": "Đặc",
        "meaning": "Đặc biệt",
        "hiragana": "とく"
      },
      {
        "kanji": "牧",
        "hanViet": "Mục",
        "meaning": "Chăn thả gia súc",
        "hiragana": "まき"
      },
      {
        "kanji": "物",
        "hanViet": "Vật",
        "meaning": "Đồ vật, sinh vật",
        "hiragana": "もの"
      }
    ],
    "description": "Hình đầu con trâu nhìn từ trên xuống có hai sừng và tai vểnh ra."
  },
  {
    "id": 94,
    "character": "犬",
    "variants": [
      "犭"
    ],
    "hanViet": "Khuyển",
    "meaning": "Con chó, thú săn bốn chân",
    "strokeCount": 4,
    "reading": {
      "hiragana": "いぬ",
      "romaji": "inu"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Khuyển đứng 犭) / Toàn thân",
    "examples": [
      {
        "kanji": "犯",
        "hanViet": "Phạm",
        "meaning": "Phạm tội, vi phạm",
        "hiragana": "おかす"
      },
      {
        "kanji": "狂",
        "hanViet": "Cuồng",
        "meaning": "Điên cuồng",
        "hiragana": "くるう"
      },
      {
        "kanji": "猫",
        "hanViet": "Miêu",
        "meaning": "Con mèo",
        "hiragana": "ねこ"
      }
    ],
    "description": "Hình con chó vẫy đuôi. Khi đứng bên trái viết thành Khuyển đứng (犭)."
  },
  {
    "id": 95,
    "character": "玄",
    "variants": [],
    "hanViet": "Huyền",
    "meaning": "Màu đen huyền bí, sâu thẳm xa xôi",
    "strokeCount": 5,
    "reading": {
      "hiragana": "げん",
      "romaji": "gen"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "玄",
        "hanViet": "Huyền",
        "meaning": "Huyền ảo, màu đen",
        "hiragana": "げん"
      },
      {
        "kanji": "畜",
        "hanViet": "Súc",
        "meaning": "Gia súc nuôi nấng",
        "hiragana": "ちく"
      },
      {
        "kanji": "率",
        "hanViet": "Suất",
        "meaning": "Tỷ lệ, dẫn đầu",
        "hiragana": "ひきいる"
      }
    ],
    "description": "Hình cuộn dây tơ nhuộm đen nhúng chìm trong nước sâu thẳm."
  },
  {
    "id": 96,
    "character": "玉",
    "variants": [
      "王"
    ],
    "hanViet": "Ngọc",
    "meaning": "Ngọc bích quý giá, châu báu, vua chúa",
    "strokeCount": 5,
    "reading": {
      "hiragana": "たま",
      "romaji": "tama"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Vương bàng 王) / Toàn thân",
    "examples": [
      {
        "kanji": "宝",
        "hanViet": "Bảo",
        "meaning": "Châu báu quý giá",
        "hiragana": "たから"
      },
      {
        "kanji": "珍",
        "hanViet": "Trân",
        "meaning": "Trân quý, hiếm lạ",
        "hiragana": "めずらしい"
      },
      {
        "kanji": "理",
        "hanViet": "Lý",
        "meaning": "Lý lẽ, mài giũa ngọc",
        "hiragana": "り"
      }
    ],
    "description": "Hình chuỗi ba viên ngọc xâu bằng sợi chỉ, thêm dấu chấm phân biệt chữ Vương."
  },
  {
    "id": 97,
    "character": "瓜",
    "variants": [],
    "hanViet": "Qua",
    "meaning": "Quả dưa, cây dây leo sai quả",
    "strokeCount": 5,
    "reading": {
      "hiragana": "うり",
      "romaji": "uri"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "瓢",
        "hanViet": "Phiêu",
        "meaning": "Bầu hồ lô",
        "hiragana": "ひさご"
      },
      {
        "kanji": "瓣",
        "hanViet": "Biện",
        "meaning": "Cánh hoa, múi quả",
        "hiragana": "べん"
      },
      {
        "kanji": "瓠",
        "hanViet": "Hồ",
        "meaning": "Quả bầu nậm",
        "hiragana": "こ"
      }
    ],
    "description": "Hình quả dưa tròn trịa lủng lẳng treo giữa hai nhánh dây leo."
  },
  {
    "id": 98,
    "character": "瓦",
    "variants": [],
    "hanViet": "Ngõa",
    "meaning": "Ngói lợp nhà, đồ đất nung qua lửa",
    "strokeCount": 5,
    "reading": {
      "hiragana": "かわら",
      "romaji": "kawara"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải / Độc lập",
    "examples": [
      {
        "kanji": "瓶",
        "hanViet": "Bình",
        "meaning": "Chiếc bình sứ",
        "hiragana": "びん"
      },
      {
        "kanji": "甑",
        "hanViet": "Chõ",
        "meaning": "Chõ hấp xôi",
        "hiragana": "こしき"
      },
      {
        "kanji": "瓷",
        "hanViet": "Từ",
        "meaning": "Đồ sành sứ men",
        "hiragana": "じ"
      }
    ],
    "description": "Hình hai viên ngói đất nung khớp vào nhau để lợp trên mái nhà."
  },
  {
    "id": 99,
    "character": "甘",
    "variants": [],
    "hanViet": "Cam",
    "meaning": "Vị ngọt ngào, cam tâm, ngon miệng",
    "strokeCount": 5,
    "reading": {
      "hiragana": "あまい",
      "romaji": "amai"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "甚",
        "hanViet": "Thậm",
        "meaning": "Thậm tệ, rất mực",
        "hiragana": "はなはだ"
      },
      {
        "kanji": "甜",
        "hanViet": "Điềm",
        "meaning": "Ngọt dịu",
        "hiragana": "てん"
      },
      {
        "kanji": "某",
        "hanViet": "Mỗ",
        "meaning": "Kẻ nọ, ai đó",
        "hiragana": "それがし"
      }
    ],
    "description": "Hình vật ngon ngọt đang ngậm trong miệng, giữ hương vị lại."
  },
  {
    "id": 100,
    "character": "生",
    "variants": [],
    "hanViet": "Sinh",
    "meaning": "Sinh sôi nảy nở, sự sống, sống sót",
    "strokeCount": 5,
    "reading": {
      "hiragana": "いきる",
      "romaji": "ikiru"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "産",
        "hanViet": "Sản",
        "meaning": "Sinh đẻ, sản xuất",
        "hiragana": "うむ"
      },
      {
        "kanji": "星",
        "hanViet": "Tinh",
        "meaning": "Ngôi sao",
        "hiragana": "ほし"
      },
      {
        "kanji": "甦",
        "hanViet": "Tô",
        "meaning": "Hồi sinh",
        "hiragana": "よみがえる"
      }
    ],
    "description": "Hình mầm cỏ đâm chồi vươn lên từ mặt đất tràn đầy sức sống."
  },
  {
    "id": 101,
    "character": "用",
    "variants": [],
    "hanViet": "Dụng",
    "meaning": "Sử dụng, dùng đến, công dụng hữu ích",
    "strokeCount": 5,
    "reading": {
      "hiragana": "もちいる",
      "romaji": "mochiiru"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "用",
        "hanViet": "Dụng",
        "meaning": "Sử dụng, việc cần",
        "hiragana": "よう"
      },
      {
        "kanji": "角",
        "hanViet": "Giác",
        "meaning": "Góc nhọn, sừng",
        "hiragana": "かど"
      },
      {
        "kanji": "備",
        "hanViet": "Bị",
        "meaning": "Chuẩn bị, trang bị",
        "hiragana": "そなえる"
      }
    ],
    "description": "Hình cái xô chậu múc nước làm việc hàng ngày."
  },
  {
    "id": 102,
    "character": "田",
    "variants": [],
    "hanViet": "Điền",
    "meaning": "Ruộng lúa, đồng ruộng phì nhiêu",
    "strokeCount": 5,
    "reading": {
      "hiragana": "た",
      "romaji": "ta"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "町",
        "hanViet": "Đinh",
        "meaning": "Thị trấn, khu phố",
        "hiragana": "まち"
      },
      {
        "kanji": "画",
        "hanViet": "Họa",
        "meaning": "Bức tranh, kế hoạch",
        "hiragana": "が"
      },
      {
        "kanji": "界",
        "hanViet": "Giới",
        "meaning": "Ranh giới, thế giới",
        "hiragana": "かい"
      }
    ],
    "description": "Hình mảnh ruộng chia làm bốn ô bờ nhỏ trồng lúa nước."
  },
  {
    "id": 103,
    "character": "疋",
    "variants": [
      "⺪"
    ],
    "hanViet": "Sơ",
    "meaning": "Bàn chân đi, cuộn vải sấp vải",
    "strokeCount": 5,
    "reading": {
      "hiragana": "ひき",
      "romaji": "hiki"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Dưới",
    "examples": [
      {
        "kanji": "疏",
        "hanViet": "Sơ",
        "meaning": "Khơi thông dòng chảy",
        "hiragana": "とおる"
      },
      {
        "kanji": "疑",
        "hanViet": "Nghi",
        "meaning": "Nghi ngờ",
        "hiragana": "うたがう"
      },
      {
        "kanji": "楚",
        "hanViet": "Sở",
        "meaning": "Nước Sở, rõ ràng",
        "hiragana": "そ"
      }
    ],
    "description": "Hình bàn chân bước đi đo chiều dài xấp vải cuộn."
  },
  {
    "id": 104,
    "character": "疒",
    "variants": [],
    "hanViet": "Nạch",
    "meaning": "Bệnh tật, đau ốm, nằm liệt giường",
    "strokeCount": 5,
    "reading": {
      "hiragana": "やまいだれ",
      "romaji": "yamaidare"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare - Nạch bàng)",
    "examples": [
      {
        "kanji": "病",
        "hanViet": "Bệnh",
        "meaning": "Ốm đau, bệnh tật",
        "hiragana": "びょう"
      },
      {
        "kanji": "痛",
        "hanViet": "Thống",
        "meaning": "Đau đớn",
        "hiragana": "いたい"
      },
      {
        "kanji": "疲",
        "hanViet": "Bì",
        "meaning": "Mệt mỏi",
        "hiragana": "つかれる"
      }
    ],
    "description": "Hình người bệnh đổ mồ hôi nằm nghiêng liệt trên chiếc giường tre."
  },
  {
    "id": 105,
    "character": "癶",
    "variants": [],
    "hanViet": "Bát",
    "meaning": "Hai chân đạp ngược ra ngoài, dậm bước",
    "strokeCount": 5,
    "reading": {
      "hiragana": "はつがしら",
      "romaji": "hatsugashira"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "発",
        "hanViet": "Phát",
        "meaning": "Phát xuất, khởi hành",
        "hiragana": "はつ"
      },
      {
        "kanji": "登",
        "hanViet": "Đăng",
        "meaning": "Leo núi, trèo lên",
        "hiragana": "のぼる"
      },
      {
        "kanji": "癸",
        "hanViet": "Quý",
        "meaning": "Can Quý",
        "hiragana": "みずのと"
      }
    ],
    "description": "Hình hai bàn chân dang rộng đạp đất leo dốc."
  },
  {
    "id": 106,
    "character": "白",
    "variants": [],
    "hanViet": "Bạch",
    "meaning": "Màu trắng, trong sáng, rõ ràng thuần khiết",
    "strokeCount": 5,
    "reading": {
      "hiragana": "しろ",
      "romaji": "shiro"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "白",
        "hanViet": "Bạch",
        "meaning": "Màu trắng",
        "hiragana": "しろい"
      },
      {
        "kanji": "百",
        "hanViet": "Bách",
        "meaning": "Một trăm",
        "hiragana": "ひゃく"
      },
      {
        "kanji": "的",
        "hanViet": "Đích",
        "meaning": "Mục đích, đích ngắm",
        "hiragana": "まと"
      }
    ],
    "description": "Hình hạt gạo xát sạch vỏ trắng ngần hoặc tia sáng mặt trời le lói."
  },
  {
    "id": 107,
    "character": "皮",
    "variants": [],
    "hanViet": "Bì",
    "meaning": "Da người, da thú lột ra, vỏ cây",
    "strokeCount": 5,
    "reading": {
      "hiragana": "かわ",
      "romaji": "kawa"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "皮",
        "hanViet": "Bì",
        "meaning": "Lớp da, vỏ quả",
        "hiragana": "かわ"
      },
      {
        "kanji": "波",
        "hanViet": "Ba",
        "meaning": "Làn sóng biển",
        "hiragana": "なみ"
      },
      {
        "kanji": "破",
        "hanViet": "Phá",
        "meaning": "Làm rách, phá vỡ",
        "hiragana": "やぶる"
      }
    ],
    "description": "Hình bàn tay cầm dao lột tấm da con thú ra khỏi thân."
  },
  {
    "id": 108,
    "character": "皿",
    "variants": [],
    "hanViet": "Mãnh",
    "meaning": "Bát đĩa, chén dĩa đựng thức ăn",
    "strokeCount": 5,
    "reading": {
      "hiragana": "さら",
      "romaji": "sara"
    },
    "position": "ashi",
    "positionNameVi": "Ở dưới (Ashi) / Toàn thân",
    "examples": [
      {
        "kanji": "盆",
        "hanViet": "Bồn",
        "meaning": "Cái mâm, chậu cảnh",
        "hiragana": "ぼん"
      },
      {
        "kanji": "盗",
        "hanViet": "Đạo",
        "meaning": "Ăn trộm, đạo tặc",
        "hiragana": "ぬすむ"
      },
      {
        "kanji": "盛",
        "hanViet": "Thịnh",
        "meaning": "Thịnh vượng, xới cơm",
        "hiragana": "さかん"
      }
    ],
    "description": "Hình chiếc đĩa lòng cạn đựng hoa quả thức ăn trên bàn."
  },
  {
    "id": 109,
    "character": "目",
    "variants": [
      "⺫"
    ],
    "hanViet": "Mục",
    "meaning": "Con mắt, cái nhìn, mục lục tiêu đề",
    "strokeCount": 5,
    "reading": {
      "hiragana": "め",
      "romaji": "me"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Mục bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "見",
        "hanViet": "Kiến",
        "meaning": "Trông thấy",
        "hiragana": "みる"
      },
      {
        "kanji": "相",
        "hanViet": "Tương",
        "meaning": "Tương trợ, thủ tướng",
        "hiragana": "あい"
      },
      {
        "kanji": "省",
        "hanViet": "Tỉnh",
        "meaning": "Xem xét lại, bộ ngành",
        "hiragana": "かえりみる"
      }
    ],
    "description": "Hình con mắt có hai con ngươi nhìn thẳng."
  },
  {
    "id": 110,
    "character": "矛",
    "variants": [],
    "hanViet": "Mâu",
    "meaning": "Cây giáo mâu đâm, mâu thuẫn đối kháng",
    "strokeCount": 5,
    "reading": {
      "hiragana": "ほこ",
      "romaji": "hoko"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "矛",
        "hanViet": "Mâu",
        "meaning": "Ngọn giáo mâu",
        "hiragana": "ほこ"
      },
      {
        "kanji": "柔",
        "hanViet": "Nhu",
        "meaning": "Mềm mại, nhu đạo",
        "hiragana": "やわらかい"
      },
      {
        "kanji": "務",
        "hanViet": "Vụ",
        "meaning": "Nhiệm vụ, chức vụ",
        "hiragana": "つとめる"
      }
    ],
    "description": "Hình cây giáo nhọn có ngạnh đâm thủng áo giáp kẻ địch."
  },
  {
    "id": 111,
    "character": "矢",
    "variants": [],
    "hanViet": "Thỉ",
    "meaning": "Mũi tên bắn, thẳng thắn ngay ngắn",
    "strokeCount": 5,
    "reading": {
      "hiragana": "や",
      "romaji": "ya"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thỉ bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "知",
        "hanViet": "Tri",
        "meaning": "Biết, tri thức",
        "hiragana": "しる"
      },
      {
        "kanji": "短",
        "hanViet": "Đoản",
        "meaning": "Ngắn ngủi",
        "hiragana": "みじかい"
      },
      {
        "kanji": "族",
        "hanViet": "Tộc",
        "meaning": "Gia tộc, bộ tộc",
        "hiragana": "ぞく"
      }
    ],
    "description": "Hình mũi tên có đầu nhọn và cánh lông vũ định hướng ở đuôi."
  },
  {
    "id": 112,
    "character": "石",
    "variants": [],
    "hanViet": "Thạch",
    "meaning": "Hòn đá, tảng đá, khoáng chất rắn rỏi",
    "strokeCount": 5,
    "reading": {
      "hiragana": "いし",
      "romaji": "ishi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thạch bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "岩",
        "hanViet": "Nham",
        "meaning": "Tảng đá lớn",
        "hiragana": "いわ"
      },
      {
        "kanji": "砂",
        "hanViet": "Sa",
        "meaning": "Hạt cát",
        "hiragana": "すな"
      },
      {
        "kanji": "研",
        "hanViet": "Nghiên",
        "meaning": "Nghiên cứu, mài đá",
        "hiragana": "とぐ"
      }
    ],
    "description": "Hình hòn đá rơi từ chân vách núi xuống đất."
  },
  {
    "id": 113,
    "character": "示",
    "variants": [
      "礻"
    ],
    "hanViet": "Thị",
    "meaning": "Thần linh, hiển thị điềm báo, tế lễ",
    "strokeCount": 5,
    "reading": {
      "hiragana": "しめす",
      "romaji": "shimesu"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thị đứng 礻) / Ở dưới",
    "examples": [
      {
        "kanji": "社",
        "hanViet": "Xã",
        "meaning": "Công ty, đền thần",
        "hiragana": "やしろ"
      },
      {
        "kanji": "神",
        "hanViet": "Thần",
        "meaning": "Thần linh",
        "hiragana": "かみ"
      },
      {
        "kanji": "福",
        "hanViet": "Phúc",
        "meaning": "Hạnh phúc, phúc lành",
        "hiragana": "ふく"
      }
    ],
    "description": "Hình bàn thờ tế thần để đồ cúng dâng lên trời cao."
  },
  {
    "id": 114,
    "character": "禸",
    "variants": [],
    "hanViet": "Nhựu",
    "meaning": "Vết chân con thú giẫm trên mặt đất",
    "strokeCount": 5,
    "reading": {
      "hiragana": "ぐうのあし",
      "romaji": "guunoashi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "禹",
        "hanViet": "Vũ",
        "meaning": "Vua Vũ thời cổ",
        "hiragana": "う"
      },
      {
        "kanji": "禺",
        "hanViet": "Ngu",
        "meaning": "Góc núi, vượn",
        "hiragana": "ぐ"
      },
      {
        "kanji": "禽",
        "hanViet": "Cầm",
        "meaning": "Chim chóc gia cầm",
        "hiragana": "とり"
      }
    ],
    "description": "Hình dấu vết móng chân thú rừng in sâu trên bùn đất."
  },
  {
    "id": 115,
    "character": "禾",
    "variants": [],
    "hanViet": "Hòa",
    "meaning": "Cây lúa trĩu bông, ngũ cốc lương thực",
    "strokeCount": 5,
    "reading": {
      "hiragana": "のぎへん",
      "romaji": "nogihen"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hòa bàng)",
    "examples": [
      {
        "kanji": "秋",
        "hanViet": "Thu",
        "meaning": "Mùa thu gặt lúa",
        "hiragana": "あき"
      },
      {
        "kanji": "私",
        "hanViet": "Tư",
        "meaning": "Tôi, riêng tư",
        "hiragana": "わたし"
      },
      {
        "kanji": "利",
        "hanViet": "Lợi",
        "meaning": "Lợi ích, sắc bén",
        "hiragana": "きく"
      }
    ],
    "description": "Hình cây lúa chín uốn cong trĩu nặng hạt thóc vàng."
  },
  {
    "id": 116,
    "character": "穴",
    "variants": [],
    "hanViet": "Huyệt",
    "meaning": "Hang động, lỗ hổng đào sâu dưới đất",
    "strokeCount": 5,
    "reading": {
      "hiragana": "あな",
      "romaji": "ana"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri - Huyệt đầu)",
    "examples": [
      {
        "kanji": "空",
        "hanViet": "Không",
        "meaning": "Bầu trời, trống rỗng",
        "hiragana": "そら"
      },
      {
        "kanji": "究",
        "hanViet": "Cứu",
        "meaning": "Nghiên cứu đến cùng",
        "hiragana": "きわめる"
      },
      {
        "kanji": "突",
        "hanViet": "Đột",
        "meaning": "Đột nhiên, đâm sầm",
        "hiragana": "つく"
      }
    ],
    "description": "Hình cửa hang khoét sâu vào sườn đồi làm nơi trú ẩn thời nguyên thủy."
  },
  {
    "id": 117,
    "character": "立",
    "variants": [],
    "hanViet": "Lập",
    "meaning": "Đứng thẳng, thành lập, đứng vững",
    "strokeCount": 5,
    "reading": {
      "hiragana": "たつ",
      "romaji": "tatsu"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Lập bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "立",
        "hanViet": "Lập",
        "meaning": "Đứng lên",
        "hiragana": "たつ"
      },
      {
        "kanji": "親",
        "hanViet": "Thân",
        "meaning": "Bố mẹ, thân thiết",
        "hiragana": "おや"
      },
      {
        "kanji": "音",
        "hanViet": "Âm",
        "meaning": "Âm thanh",
        "hiragana": "おと"
      }
    ],
    "description": "Hình người đứng vững chãi hai chân chạm mặt đất."
  },
  {
    "id": 118,
    "character": "竹",
    "variants": [
      "⺮"
    ],
    "hanViet": "Trúc",
    "meaning": "Cây tre, cây trúc rỗng ruột thẳng tắp",
    "strokeCount": 6,
    "reading": {
      "hiragana": "たけ",
      "romaji": "take"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Trúc đầu ⺮) / Toàn thân",
    "examples": [
      {
        "kanji": "笑",
        "hanViet": "Tiếu",
        "meaning": "Nụ cười",
        "hiragana": "わらう"
      },
      {
        "kanji": "筆",
        "hanViet": "Bút",
        "meaning": "Cây bút lông tre",
        "hiragana": "ふで"
      },
      {
        "kanji": "答",
        "hanViet": "Đáp",
        "meaning": "Trả lời",
        "hiragana": "こたえる"
      }
    ],
    "description": "Hình cành lá tre rủ xuống, lá trúc đung đưa trong gió."
  },
  {
    "id": 119,
    "character": "米",
    "variants": [],
    "hanViet": "Mễ",
    "meaning": "Hạt gạo, lúa gạo sau khi giã trắng",
    "strokeCount": 6,
    "reading": {
      "hiragana": "こめ",
      "romaji": "kome"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Mễ bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "料",
        "hanViet": "Liệu",
        "meaning": "Nguyên liệu",
        "hiragana": "りょう"
      },
      {
        "kanji": "粉",
        "hanViet": "Phấn",
        "meaning": "Bột mì, phấn mịn",
        "hiragana": "こな"
      },
      {
        "kanji": "精",
        "hanViet": "Tinh",
        "meaning": "Tinh túy, tinh thần",
        "hiragana": "せい"
      }
    ],
    "description": "Hình bông lúa tách ra thành từng hạt gạo tỏa ra bốn hướng."
  },
  {
    "id": 120,
    "character": "糸",
    "variants": [
      "糹"
    ],
    "hanViet": "Mịch",
    "meaning": "Sợi tơ, sợi chỉ, tơ tằm dệt vải",
    "strokeCount": 6,
    "reading": {
      "hiragana": "いと",
      "romaji": "ito"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Mịch bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "紙",
        "hanViet": "Chỉ",
        "meaning": "Tờ giấy",
        "hiragana": "かみ"
      },
      {
        "kanji": "線",
        "hanViet": "Tuyến",
        "meaning": "Đường kẻ, tuyến đường",
        "hiragana": "せん"
      },
      {
        "kanji": "結",
        "hanViet": "Kết",
        "meaning": "Buộc lại, kết nối",
        "hiragana": "むすぶ"
      }
    ],
    "description": "Hình cuộn tơ nhả sợi bện lại thành bó chỉ may vá."
  },
  {
    "id": 121,
    "character": "缶",
    "variants": [],
    "hanViet": "Phẫu",
    "meaning": "Đồ gốm sành miệng nhỏ, lon hộp đựng",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ほとぎ",
      "romaji": "hotogi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "缶",
        "hanViet": "Phẫu",
        "meaning": "Lon kim loại",
        "hiragana": "かん"
      },
      {
        "kanji": "缺",
        "hanViet": "Khuyết",
        "meaning": "Thiếu khuyết",
        "hiragana": "かける"
      },
      {
        "kanji": "缸",
        "hanViet": "Cương",
        "meaning": "Cái vại sành",
        "hiragana": "こう"
      }
    ],
    "description": "Hình chiếc chum gốm nung có nắp đậy kín giữ rượu và nước."
  },
  {
    "id": 122,
    "character": "网",
    "variants": [
      "⺲",
      "⺳",
      "罒"
    ],
    "hanViet": "Võng",
    "meaning": "Lưới đánh cá, mạng lưới bẫy bắt",
    "strokeCount": 6,
    "reading": {
      "hiragana": "あみがしら",
      "romaji": "amigashira"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Võng đầu 罒)",
    "examples": [
      {
        "kanji": "買",
        "hanViet": "Mãi",
        "meaning": "Mua sắm",
        "hiragana": "かう"
      },
      {
        "kanji": "罪",
        "hanViet": "Tội",
        "meaning": "Tội lỗi",
        "hiragana": "つみ"
      },
      {
        "kanji": "置",
        "hanViet": "Trí",
        "meaning": "Đặt để, bố trí",
        "hiragana": "おく"
      }
    ],
    "description": "Hình tấm lưới đan mắt cáo dùng săn thú và bắt cá."
  },
  {
    "id": 123,
    "character": "羊",
    "variants": [
      "⺶"
    ],
    "hanViet": "Dương",
    "meaning": "Con dê, con cừu hiền lành tốt đẹp",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ひつじ",
      "romaji": "hitsuji"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên / Bên trái",
    "examples": [
      {
        "kanji": "美",
        "hanViet": "Mỹ",
        "meaning": "Đẹp đẽ",
        "hiragana": "うつくしい"
      },
      {
        "kanji": "洋",
        "hanViet": "Dương",
        "meaning": "Đại dương, phương Tây",
        "hiragana": "よう"
      },
      {
        "kanji": "着",
        "hanViet": "Trước",
        "meaning": "Mặc áo, đến nơi",
        "hiragana": "きる"
      }
    ],
    "description": "Hình đầu con cừu có hai sừng cong hiền hòa tượng trưng cho cái đẹp."
  },
  {
    "id": 124,
    "character": "羽",
    "variants": [],
    "hanViet": "Vũ",
    "meaning": "Lông vũ, cánh chim bay lượn",
    "strokeCount": 6,
    "reading": {
      "hiragana": "はね",
      "romaji": "hane"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "習",
        "hanViet": "Tập",
        "meaning": "Luyện tập, học",
        "hiragana": "ならう"
      },
      {
        "kanji": "翼",
        "hanViet": "Dực",
        "meaning": "Đôi cánh",
        "hiragana": "つばさ"
      },
      {
        "kanji": "翌",
        "hanViet": "Dực",
        "meaning": "Hôm sau, ngày kế",
        "hiragana": "よく"
      }
    ],
    "description": "Hình hai chiếc cánh chim có lông vũ xòe ra tập bay."
  },
  {
    "id": 125,
    "character": "老",
    "variants": [
      "耂"
    ],
    "hanViet": "Lão",
    "meaning": "Người già, tuổi già, trường thọ",
    "strokeCount": 6,
    "reading": {
      "hiragana": "おい",
      "romaji": "oi"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Lão đầu 耂)",
    "examples": [
      {
        "kanji": "考",
        "hanViet": "Khảo",
        "meaning": "Suy nghĩ, khảo sát",
        "hiragana": "かんがえる"
      },
      {
        "kanji": "者",
        "hanViet": "Giả",
        "meaning": "Người làm việc",
        "hiragana": "もの"
      },
      {
        "kanji": "孝",
        "hanViet": "Hiếu",
        "meaning": "Hiếu thảo",
        "hiragana": "こう"
      }
    ],
    "description": "Hình cụ già râu tóc bạc phơ chống gậy bước đi chậm rãi."
  },
  {
    "id": 126,
    "character": "而",
    "variants": [],
    "hanViet": "Nhi",
    "meaning": "Râu dưới cằm, mà, lại còn, nối tiếp",
    "strokeCount": 6,
    "reading": {
      "hiragana": "しかして",
      "romaji": "shikashite"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "耐",
        "hanViet": "Nại",
        "meaning": "Nhẫn nại, chịu đựng",
        "hiragana": "たえる"
      },
      {
        "kanji": "耍",
        "hanViet": "Sỏa",
        "meaning": "Đùa giỡn, diễn trò",
        "hiragana": "しゃ"
      },
      {
        "kanji": "耑",
        "hanViet": "Chuyên",
        "meaning": "Mầm mống bắt đầu",
        "hiragana": "たん"
      }
    ],
    "description": "Hình chòm râu dài mềm mại rủ xuống dưới cằm người đàn ông."
  },
  {
    "id": 127,
    "character": "耒",
    "variants": [],
    "hanViet": "Lỗi",
    "meaning": "Cái cày bừa đất nông nghiệp, cày cấy",
    "strokeCount": 6,
    "reading": {
      "hiragana": "すきへん",
      "romaji": "sukihen"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Lỗi bàng)",
    "examples": [
      {
        "kanji": "耕",
        "hanViet": "Canh",
        "meaning": "Cày cấy ruộng nương",
        "hiragana": "たがやす"
      },
      {
        "kanji": "耗",
        "hanViet": "Hao",
        "meaning": "Hao tổn, tiêu hao",
        "hiragana": "もう"
      },
      {
        "kanji": "耦",
        "hanViet": "Ngẫu",
        "meaning": "Cùng cày ruộng đôi",
        "hiragana": "ぐう"
      }
    ],
    "description": "Hình chiếc cày đất bằng gỗ có răng bới lật đất trồng trọt."
  },
  {
    "id": 128,
    "character": "耳",
    "variants": [],
    "hanViet": "Nhĩ",
    "meaning": "Cái tai, thính giác, lắng nghe",
    "strokeCount": 6,
    "reading": {
      "hiragana": "みみ",
      "romaji": "mimi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Nhĩ bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "聞",
        "hanViet": "Văn",
        "meaning": "Nghe ngóng, hỏi",
        "hiragana": "きく"
      },
      {
        "kanji": "声",
        "hanViet": "Thanh",
        "meaning": "Tiếng nói",
        "hiragana": "こえ"
      },
      {
        "kanji": "職",
        "hanViet": "Chức",
        "meaning": "Nghề nghiệp, chức vụ",
        "hiragana": "しょく"
      }
    ],
    "description": "Hình vành tai con người có các nếp gấp đón nhận âm thanh."
  },
  {
    "id": 129,
    "character": "聿",
    "variants": [
      "⺻"
    ],
    "hanViet": "Duật",
    "meaning": "Cây bút lông viết chữ, ghi chép",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ふでづくり",
      "romaji": "fudezukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải / Toàn thân",
    "examples": [
      {
        "kanji": "書",
        "hanViet": "Thư",
        "meaning": "Viết, cuốn sách",
        "hiragana": "かく"
      },
      {
        "kanji": "津",
        "hanViet": "Tân",
        "meaning": "Bến đò, nước bọt",
        "hiragana": "つ"
      },
      {
        "kanji": "建",
        "hanViet": "Kiến",
        "meaning": "Xây dựng",
        "hiragana": "たてる"
      }
    ],
    "description": "Hình bàn tay cầm cây bút lông tre thẳng đứng chấm mực viết."
  },
  {
    "id": 130,
    "character": "肉",
    "variants": [
      "⺼"
    ],
    "hanViet": "Nhục",
    "meaning": "Miếng thịt, cơ bắp thân thể người",
    "strokeCount": 6,
    "reading": {
      "hiragana": "にく",
      "romaji": "niku"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Nguyệt nhục ⺼) / Toàn thân",
    "examples": [
      {
        "kanji": "肌",
        "hanViet": "Cơ",
        "meaning": "Làn da",
        "hiragana": "はだ"
      },
      {
        "kanji": "肩",
        "hanViet": "Kiên",
        "meaning": "Bờ vai",
        "hiragana": "かた"
      },
      {
        "kanji": "胸",
        "hanViet": "Hung",
        "meaning": "Lồng ngực",
        "hiragana": "むね"
      }
    ],
    "description": "Hình thớ thịt nạc có vân gân. Khi làm bộ bên trái viết giống chữ Nguyệt (⺼)."
  },
  {
    "id": 131,
    "character": "臣",
    "variants": [],
    "hanViet": "Thần",
    "meaning": "Bầy tôi, quan lại, thần dân cúi phục",
    "strokeCount": 6,
    "reading": {
      "hiragana": "しん",
      "romaji": "shin"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "臣",
        "hanViet": "Thần",
        "meaning": "Bầy tôi",
        "hiragana": "しん"
      },
      {
        "kanji": "蔵",
        "hanViet": "Tàng",
        "meaning": "Nhà kho cất giữ",
        "hiragana": "くら"
      },
      {
        "kanji": "臨",
        "hanViet": "Lâm",
        "meaning": "Đến nơi, đối diện",
        "hiragana": "のぞむ"
      }
    ],
    "description": "Hình con mắt cúi gằm xuống đất cung kính của bề tôi trước mặt vua."
  },
  {
    "id": 132,
    "character": "自",
    "variants": [],
    "hanViet": "Tự",
    "meaning": "Cái mũi, tự bản thân mình, bắt đầu từ",
    "strokeCount": 6,
    "reading": {
      "hiragana": "みずから",
      "romaji": "mizukara"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "自",
        "hanViet": "Tự",
        "meaning": "Tự mình",
        "hiragana": "じ"
      },
      {
        "kanji": "息",
        "hanViet": "Tức",
        "meaning": "Hơi thở, con trai",
        "hiragana": "いき"
      },
      {
        "kanji": "鼻",
        "hanViet": "Tị",
        "meaning": "Cái mũi",
        "hiragana": "はな"
      }
    ],
    "description": "Hình sống mũi người, thói quen trỏ ngón tay vào mũi khi nói về chính mình."
  },
  {
    "id": 133,
    "character": "至",
    "variants": [],
    "hanViet": "Chí",
    "meaning": "Đi đến nơi, tột cùng, đạt tới mốc",
    "strokeCount": 6,
    "reading": {
      "hiragana": "いたる",
      "romaji": "itaru"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "到",
        "hanViet": "Đáo",
        "meaning": "Đến nơi, chu đáo",
        "hiragana": "とう"
      },
      {
        "kanji": "致",
        "hanViet": "Trí",
        "meaning": "Dẫn đến, làm cho",
        "hiragana": "いたす"
      },
      {
        "kanji": "室",
        "hanViet": "Thất",
        "meaning": "Căn phòng",
        "hiragana": "しつ"
      }
    ],
    "description": "Hình mũi tên bắn cắm phập vào mặt đất đích đến."
  },
  {
    "id": 134,
    "character": "臼",
    "variants": [],
    "hanViet": "Cữu",
    "meaning": "Cái cối giã gạo bằng đá, giã nhuyễn",
    "strokeCount": 6,
    "reading": {
      "hiragana": "うす",
      "romaji": "usu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "舂",
        "hanViet": "Dung",
        "meaning": "Giã gạo",
        "hiragana": "つく"
      },
      {
        "kanji": "舅",
        "hanViet": "Cữu",
        "meaning": "Bố vợ, cậu ruột",
        "hiragana": "しゅうと"
      },
      {
        "kanji": "興",
        "hanViet": "Hưng",
        "meaning": "Hưng thịnh, hứng thú",
        "hiragana": "おこる"
      }
    ],
    "description": "Hình lòng cối giã gạo bằng đá có các vệt gờ nhám nghiền nát hạt."
  },
  {
    "id": 135,
    "character": "舌",
    "variants": [],
    "hanViet": "Thiệt",
    "meaning": "Cái lưỡi, nếm mùi vị, nói năng",
    "strokeCount": 6,
    "reading": {
      "hiragana": "した",
      "romaji": "shita"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thiệt bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "舌",
        "hanViet": "Thiệt",
        "meaning": "Cái lưỡi",
        "hiragana": "した"
      },
      {
        "kanji": "乱",
        "hanViet": "Loạn",
        "meaning": "Hỗn loạn",
        "hiragana": "みだれる"
      },
      {
        "kanji": "話",
        "hanViet": "Thoại",
        "meaning": "Nói chuyện",
        "hiragana": "はなす"
      }
    ],
    "description": "Hình chiếc lưỡi thè ra khỏi vòm miệng để nếm thức ăn."
  },
  {
    "id": 136,
    "character": "舛",
    "variants": [],
    "hanViet": "Suyễn",
    "meaning": "Hai chân bước ngược nhau, sai lệch",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ます",
      "romaji": "masu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân",
    "examples": [
      {
        "kanji": "舞",
        "hanViet": "Vũ",
        "meaning": "Múa, khiêu vũ",
        "hiragana": "まう"
      },
      {
        "kanji": "舜",
        "hanViet": "Thuấn",
        "meaning": "Vua Thuấn thời cổ",
        "hiragana": "しゅん"
      },
      {
        "kanji": "桀",
        "hanViet": "Kiệt",
        "meaning": "Vua Kiệt tàn bạo",
        "hiragana": "けつ"
      }
    ],
    "description": "Hình đôi bàn chân bước xoay ngược chiều tạo bước nhảy múa hoặc sai lệch."
  },
  {
    "id": 137,
    "character": "舟",
    "variants": [],
    "hanViet": "Chu",
    "meaning": "Con thuyền gỗ, ghe nan bơi sông",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ふね",
      "romaji": "fune"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Chu bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "船",
        "hanViet": "Thuyền",
        "meaning": "Tàu thuyền lớn",
        "hiragana": "ふね"
      },
      {
        "kanji": "航",
        "hanViet": "Hàng",
        "meaning": "Hàng hải, hàng không",
        "hiragana": "こう"
      },
      {
        "kanji": "般",
        "hanViet": "Bàn",
        "meaning": "Tổng thể, phổ biến",
        "hiragana": "はん"
      }
    ],
    "description": "Hình con thuyền độc mộc khoét từ thân cây có mái chèo."
  },
  {
    "id": 138,
    "character": "艮",
    "variants": [],
    "hanViet": "Cấn",
    "meaning": "Quẻ Cấn (núi), kiên định, dừng bước",
    "strokeCount": 6,
    "reading": {
      "hiragana": "うしとら",
      "romaji": "ushitora"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "良",
        "hanViet": "Lương",
        "meaning": "Tốt lành",
        "hiragana": "よい"
      },
      {
        "kanji": "銀",
        "hanViet": "Ngân",
        "meaning": "Bạc trắng",
        "hiragana": "ぎん"
      },
      {
        "kanji": "根",
        "hanViet": "Căn",
        "meaning": "Gốc rễ",
        "hiragana": "ね"
      }
    ],
    "description": "Hình người ngoái cổ quay đầu nhìn lại đầy kiên định."
  },
  {
    "id": 139,
    "character": "色",
    "variants": [],
    "hanViet": "Sắc",
    "meaning": "Màu sắc, sắc thái, vẻ mặt xúc cảm",
    "strokeCount": 6,
    "reading": {
      "hiragana": "いろ",
      "romaji": "iro"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "色",
        "hanViet": "Sắc",
        "meaning": "Màu sắc",
        "hiragana": "いろ"
      },
      {
        "kanji": "艶",
        "hanViet": "Diễm",
        "meaning": "Diễm lệ, bóng bẩy",
        "hiragana": "つや"
      },
      {
        "kanji": "絶",
        "hanViet": "Tuyệt",
        "meaning": "Tuyệt hảo, tuyệt đối",
        "hiragana": "たえる"
      }
    ],
    "description": "Hình hai người ôm nhau biểu lộ sắc mặt vui tươi thắm thiết."
  },
  {
    "id": 140,
    "character": "艸",
    "variants": [
      "艹"
    ],
    "hanViet": "Thảo",
    "meaning": "Cỏ cây, thảo mộc non xanh tươi",
    "strokeCount": 6,
    "reading": {
      "hiragana": "くさ",
      "romaji": "kusa"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Thảo đầu 艹)",
    "examples": [
      {
        "kanji": "花",
        "hanViet": "Hoa",
        "meaning": "Bông hoa",
        "hiragana": "はな"
      },
      {
        "kanji": "茶",
        "hanViet": "Trà",
        "meaning": "Cây trà, nước chè",
        "hiragana": "ちゃ"
      },
      {
        "kanji": "草",
        "hanViet": "Thảo",
        "meaning": "Cây cỏ",
        "hiragana": "くさ"
      }
    ],
    "description": "Hình hai khóm cỏ non đâm chồi vươn lên đón nắng."
  },
  {
    "id": 141,
    "character": "虍",
    "variants": [],
    "hanViet": "Hổ",
    "meaning": "Da hổ, vằn vện chúa sơn lâm oai phong",
    "strokeCount": 6,
    "reading": {
      "hiragana": "とらがしら",
      "romaji": "toragashira"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare - Hổ đầu)",
    "examples": [
      {
        "kanji": "虎",
        "hanViet": "Hổ",
        "meaning": "Con hổ",
        "hiragana": "とら"
      },
      {
        "kanji": "虚",
        "hanViet": "Hư",
        "meaning": "Hư không, trống rỗng",
        "hiragana": "むなしい"
      },
      {
        "kanji": "虜",
        "hanViet": "Lỗ",
        "meaning": "Tù binh, quyến rũ",
        "hiragana": "とりこ"
      }
    ],
    "description": "Hình đầu con hổ gầm thét có các sọc vằn oai phong lẫm liệt."
  },
  {
    "id": 142,
    "character": "虫",
    "variants": [],
    "hanViet": "Trùng",
    "meaning": "Sâu bọ, côn trùng, bò sát nhỏ",
    "strokeCount": 6,
    "reading": {
      "hiragana": "むし",
      "romaji": "mushi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Trùng bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "蚊",
        "hanViet": "Văn",
        "meaning": "Con muỗi",
        "hiragana": "か"
      },
      {
        "kanji": "蜂",
        "hanViet": "Phong",
        "meaning": "Con ong",
        "hiragana": "はち"
      },
      {
        "kanji": "蛍",
        "hanViet": "Huỳnh",
        "meaning": "Con đom đóm",
        "hiragana": "ほたる"
      }
    ],
    "description": "Hình con rắn hoặc loài sâu uốn khúc bò trườn trên mặt đất."
  },
  {
    "id": 143,
    "character": "血",
    "variants": [],
    "hanViet": "Huyết",
    "meaning": "Máu đỏ, huyết quản, huyết thống",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ち",
      "romaji": "chi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "血",
        "hanViet": "Huyết",
        "meaning": "Giọt máu",
        "hiragana": "ち"
      },
      {
        "kanji": "衆",
        "hanViet": "Chúng",
        "meaning": "Quần chúng, số đông",
        "hiragana": "しゅう"
      },
      {
        "kanji": "衄",
        "hanViet": "Nục",
        "meaning": "Chảy máu cam, thất bại",
        "hiragana": "じく"
      }
    ],
    "description": "Hình đĩa đựng giọt máu động vật tế lễ thần linh thời cổ."
  },
  {
    "id": 144,
    "character": "行",
    "variants": [],
    "hanViet": "Hành",
    "meaning": "Đi lại, thực hiện, ngã tư đường phố",
    "strokeCount": 6,
    "reading": {
      "hiragana": "いく",
      "romaji": "iku"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh hai bên (Hành bàng)",
    "examples": [
      {
        "kanji": "行",
        "hanViet": "Hành",
        "meaning": "Đi lại, tiến hành",
        "hiragana": "いく"
      },
      {
        "kanji": "術",
        "hanViet": "Thuật",
        "meaning": "Kỹ thuật, phép thuật",
        "hiragana": "じゅつ"
      },
      {
        "kanji": "街",
        "hanViet": "Nhai",
        "meaning": "Đường phố, phố xá",
        "hiragana": "まち"
      }
    ],
    "description": "Hình ngã tư đường lớn thông suốt bốn hướng xe cộ lại qua."
  },
  {
    "id": 145,
    "character": "衣",
    "variants": [
      "衤"
    ],
    "hanViet": "Y",
    "meaning": "Áo quần, xiêm y, trang phục mặc che thân",
    "strokeCount": 6,
    "reading": {
      "hiragana": "ころも",
      "romaji": "koromo"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Y đứng 衤) / Ở dưới",
    "examples": [
      {
        "kanji": "袋",
        "hanViet": "Đại",
        "meaning": "Cái túi, bao đựng",
        "hiragana": "ふくろ"
      },
      {
        "kanji": "袖",
        "hanViet": "Tụ",
        "meaning": "Tay áo",
        "hiragana": "そで"
      },
      {
        "kanji": "装",
        "hanViet": "Trang",
        "meaning": "Trang phục, trang bị",
        "hiragana": "よそおう"
      }
    ],
    "description": "Hình chiếc áo vạt chéo thời xưa che phủ từ cổ đến gót."
  },
  {
    "id": 146,
    "character": "襾",
    "variants": [
      "西",
      "覀"
    ],
    "hanViet": "Á",
    "meaning": "Nắp đậy che phủ, phía Tây mặt trời lặn",
    "strokeCount": 6,
    "reading": {
      "hiragana": "にし",
      "romaji": "nishi"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Kanmuri)",
    "examples": [
      {
        "kanji": "要",
        "hanViet": "Yếu",
        "meaning": "Quan trọng, cần thiết",
        "hiragana": "いる"
      },
      {
        "kanji": "票",
        "hanViet": "Phiếu",
        "meaning": "Lá phiếu",
        "hiragana": "ひょう"
      },
      {
        "kanji": "覆",
        "hanViet": "Phúc",
        "meaning": "Bao phủ, lật úp",
        "hiragana": "おおう"
      }
    ],
    "description": "Hình chiếc tổ chim mặt trời lặn vào nghỉ ngơi ở hướng Tây."
  },
  {
    "id": 147,
    "character": "見",
    "variants": [],
    "hanViet": "Kiến",
    "meaning": "Nhìn thấy, trông thấy, kiến thức hiểu biết",
    "strokeCount": 7,
    "reading": {
      "hiragana": "みる",
      "romaji": "miru"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải / Toàn thân",
    "examples": [
      {
        "kanji": "規",
        "hanViet": "Quy",
        "meaning": "Quy tắc, khuôn phép",
        "hiragana": "き"
      },
      {
        "kanji": "視",
        "hanViet": "Thị",
        "meaning": "Thị giác, quan sát",
        "hiragana": "し"
      },
      {
        "kanji": "親",
        "hanViet": "Thân",
        "meaning": "Bố mẹ ruột thịt",
        "hiragana": "おや"
      }
    ],
    "description": "Hình con mắt Mục (目) nằm trên đôi chân người Nhi (儿) mở rộng tầm nhìn."
  },
  {
    "id": 148,
    "character": "角",
    "variants": [],
    "hanViet": "Giác",
    "meaning": "Cái sừng thú, góc cạnh, tranh đấu",
    "strokeCount": 7,
    "reading": {
      "hiragana": "つの",
      "romaji": "tsuno"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "触",
        "hanViet": "Xúc",
        "meaning": "Chạm vào, tiếp xúc",
        "hiragana": "さわる"
      },
      {
        "kanji": "解",
        "hanViet": "Giải",
        "meaning": "Giải thích, cởi trói",
        "hiragana": "とく"
      },
      {
        "kanji": "隅",
        "hanViet": "Ngung",
        "meaning": "Góc phòng",
        "hiragana": "すみ"
      }
    ],
    "description": "Hình chiếc sừng trâu sừng hươu cứng nhọn có gân xoắn."
  },
  {
    "id": 149,
    "character": "言",
    "variants": [
      "訁"
    ],
    "hanViet": "Ngôn",
    "meaning": "Lời nói, ngôn ngữ, lời phát biểu",
    "strokeCount": 7,
    "reading": {
      "hiragana": "ことば",
      "romaji": "kotoba"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Ngôn bàng 訁) / Toàn thân",
    "examples": [
      {
        "kanji": "語",
        "hanViet": "Ngữ",
        "meaning": "Ngôn ngữ",
        "hiragana": "かたる"
      },
      {
        "kanji": "話",
        "hanViet": "Thoại",
        "meaning": "Nói chuyện",
        "hiragana": "はなす"
      },
      {
        "kanji": "読",
        "hanViet": "Độc",
        "meaning": "Đọc sách",
        "hiragana": "よむ"
      }
    ],
    "description": "Hình âm thanh phát ra từ khuôn miệng phát thành lời nói rõ ràng."
  },
  {
    "id": 150,
    "character": "谷",
    "variants": [],
    "hanViet": "Cốc",
    "meaning": "Thung lũng sâu, khe núi có dòng nước chảy",
    "strokeCount": 7,
    "reading": {
      "hiragana": "たに",
      "romaji": "tani"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "谷",
        "hanViet": "Cốc",
        "meaning": "Thung lũng",
        "hiragana": "たに"
      },
      {
        "kanji": "欲",
        "hanViet": "Dục",
        "meaning": "Lòng tham dục vọng",
        "hiragana": "ほしい"
      },
      {
        "kanji": "豁",
        "hanViet": "Khoát",
        "meaning": "Khoáng đạt, rộng rãi",
        "hiragana": "かつ"
      }
    ],
    "description": "Hình nước từ hai ngọn núi chảy dồn vào miệng khe thung lũng sâu."
  },
  {
    "id": 151,
    "character": "豆",
    "variants": [],
    "hanViet": "Đậu",
    "meaning": "Hạt đậu, cái chén đựng đồ cúng tế",
    "strokeCount": 7,
    "reading": {
      "hiragana": "まめ",
      "romaji": "mame"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "豆",
        "hanViet": "Đậu",
        "meaning": "Hạt đậu",
        "hiragana": "まめ"
      },
      {
        "kanji": "頭",
        "hanViet": "Đầu",
        "meaning": "Cái đầu",
        "hiragana": "あたま"
      },
      {
        "kanji": "豊",
        "hanViet": "Phong",
        "meaning": "Phong phú, giàu có",
        "hiragana": "ゆたか"
      }
    ],
    "description": "Hình chiếc chén cao chân có nắp đậy đựng thịt dâng cúng tế lễ."
  },
  {
    "id": 152,
    "character": "豕",
    "variants": [],
    "hanViet": "Thỉ",
    "meaning": "Con lợn, con heo béo tốt",
    "strokeCount": 7,
    "reading": {
      "hiragana": "いのこ",
      "romaji": "inoko"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "豚",
        "hanViet": "Đồn",
        "meaning": "Thịt lợn",
        "hiragana": "ぶた"
      },
      {
        "kanji": "象",
        "hanViet": "Tượng",
        "meaning": "Con voi, hiện tượng",
        "hiragana": "ぞう"
      },
      {
        "kanji": "豪",
        "hanViet": "Hào",
        "meaning": "Hào kiệt, hào hoa",
        "hiragana": "ごう"
      }
    ],
    "description": "Hình con lợn béo tròn có chân ngắn và cái đuôi quăn."
  },
  {
    "id": 153,
    "character": "豸",
    "variants": [],
    "hanViet": "Trĩ",
    "meaning": "Loài thú bò sát không chân, thú săn mồi",
    "strokeCount": 7,
    "reading": {
      "hiragana": "むじな",
      "romaji": "mujina"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Trĩ bàng)",
    "examples": [
      {
        "kanji": "貌",
        "hanViet": "Mạo",
        "meaning": "Dung mạo, vẻ ngoài",
        "hiragana": "かたち"
      },
      {
        "kanji": "豹",
        "hanViet": "Báo",
        "meaning": "Con báo đốm",
        "hiragana": "ひょう"
      },
      {
        "kanji": "豺",
        "hanViet": "Sài",
        "meaning": "Chó sói đỏ",
        "hiragana": "さい"
      }
    ],
    "description": "Hình con thú săn mồi đang uốn mình chuẩn bị vồ con mồi."
  },
  {
    "id": 154,
    "character": "貝",
    "variants": [],
    "hanViet": "Bối",
    "meaning": "Vỏ sò biển quý giá, tiền tệ, của cải tài bảo",
    "strokeCount": 7,
    "reading": {
      "hiragana": "かい",
      "romaji": "kai"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Bối bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "買",
        "hanViet": "Mãi",
        "meaning": "Mua sắm",
        "hiragana": "かう"
      },
      {
        "kanji": "貸",
        "hanViet": "Thải",
        "meaning": "Cho vay mượn",
        "hiragana": "かす"
      },
      {
        "kanji": "財",
        "hanViet": "Tài",
        "meaning": "Tiền tài, của cải",
        "hiragana": "ざい"
      }
    ],
    "description": "Hình con sò mở hai mảnh vỏ; thời cổ dùng vỏ sò quý làm tiền tệ trao đổi."
  },
  {
    "id": 155,
    "character": "赤",
    "variants": [],
    "hanViet": "Xích",
    "meaning": "Màu đỏ son, đỏ rực, tấm lòng chân thành",
    "strokeCount": 7,
    "reading": {
      "hiragana": "あか",
      "romaji": "aka"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "赤",
        "hanViet": "Xích",
        "meaning": "Màu đỏ",
        "hiragana": "あかい"
      },
      {
        "kanji": "赫",
        "hanViet": "Hách",
        "meaning": "Đỏ rực, hiển hách",
        "hiragana": "かく"
      },
      {
        "kanji": "赦",
        "hanViet": "Xá",
        "meaning": "Xá tội, tha thứ",
        "hiragana": "ゆるす"
      }
    ],
    "description": "Ghép từ Đại (người) và Hỏa (lửa): ánh lửa rực sáng soi rõ thân người đỏ rực."
  },
  {
    "id": 156,
    "character": "走",
    "variants": [],
    "hanViet": "Tẩu",
    "meaning": "Chạy nhanh, lao tới, tẩu thoát",
    "strokeCount": 7,
    "reading": {
      "hiragana": "はしる",
      "romaji": "hashiru"
    },
    "position": "nyoo",
    "positionNameVi": "Góc dưới trái (Tẩu bàng 走)",
    "examples": [
      {
        "kanji": "走",
        "hanViet": "Tẩu",
        "meaning": "Chạy",
        "hiragana": "はしる"
      },
      {
        "kanji": "起",
        "hanViet": "Khởi",
        "meaning": "Thức dậy, khởi đầu",
        "hiragana": "おきる"
      },
      {
        "kanji": "越",
        "hanViet": "Việt",
        "meaning": "Vượt qua, nước Việt",
        "hiragana": "こえる"
      }
    ],
    "description": "Hình người vung tay cong chân sải bước chạy hết tốc lực."
  },
  {
    "id": 157,
    "character": "足",
    "variants": [
      "⻊"
    ],
    "hanViet": "Túc",
    "meaning": "Bàn chân, bước chân, đầy đủ túc mãn",
    "strokeCount": 7,
    "reading": {
      "hiragana": "あし",
      "romaji": "ashi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Túc bàng ⻊) / Toàn thân",
    "examples": [
      {
        "kanji": "路",
        "hanViet": "Lộ",
        "meaning": "Con đường đi",
        "hiragana": "みち"
      },
      {
        "kanji": "踊",
        "hanViet": "Dũng",
        "meaning": "Nhảy múa vui vẻ",
        "hiragana": "おどる"
      },
      {
        "kanji": "踏",
        "hanViet": "Đạp",
        "meaning": "Giẫm đạp lên",
        "hiragana": "ふむ"
      }
    ],
    "description": "Hình cả cẳng chân và bàn chân người chạm vững mặt đất."
  },
  {
    "id": 158,
    "character": "身",
    "variants": [],
    "hanViet": "Thân",
    "meaning": "Thân thể con người, mình mẩy, bản thân",
    "strokeCount": 7,
    "reading": {
      "hiragana": "み",
      "romaji": "mi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thân bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "身",
        "hanViet": "Thân",
        "meaning": "Thân thể",
        "hiragana": "み"
      },
      {
        "kanji": "射",
        "hanViet": "Xạ",
        "meaning": "Bắn cung",
        "hiragana": "いる"
      },
      {
        "kanji": "謝",
        "hanViet": "Tạ",
        "meaning": "Cảm ơn, tạ lỗi",
        "hiragana": "あやまru"
      }
    ],
    "description": "Hình người phụ nữ nghiêng mình với chiếc bụng mang thai nhô ra."
  },
  {
    "id": 159,
    "character": "車",
    "variants": [],
    "hanViet": "Xa",
    "meaning": "Cỗ xe ngựa kéo, bánh xe lăn",
    "strokeCount": 7,
    "reading": {
      "hiragana": "くるま",
      "romaji": "kuruma"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Xa bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "車",
        "hanViet": "Xa",
        "meaning": "Xe hơi, xe kéo",
        "hiragana": "くるま"
      },
      {
        "kanji": "軍",
        "hanViet": "Quân",
        "meaning": "Quân đội, chiến xa",
        "hiragana": "ぐん"
      },
      {
        "kanji": "転",
        "hanViet": "Chuyển",
        "meaning": "Lăn bánh, chuyển đổi",
        "hiragana": "ころぶ"
      }
    ],
    "description": "Hình chiếc xe ngựa nhìn từ trên xuống có hai bánh xe và trục càng xe."
  },
  {
    "id": 160,
    "character": "辛",
    "variants": [],
    "hanViet": "Tân",
    "meaning": "Vị cay nồng, cay đắng, vất vả cực nhọc",
    "strokeCount": 7,
    "reading": {
      "hiragana": "からい",
      "romaji": "karai"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "辛",
        "hanViet": "Tân",
        "meaning": "Cay, đau đớn",
        "hiragana": "からい"
      },
      {
        "kanji": "辞",
        "hanViet": "Từ",
        "meaning": "Từ chức, từ ngữ",
        "hiragana": "やめる"
      },
      {
        "kanji": "辨",
        "hanViet": "Biện",
        "meaning": "Phân biện rõ ràng",
        "hiragana": "べん"
      }
    ],
    "description": "Hình con dao khắc hình phạt thích chữ vào mặt tội nhân, gây cay đắng xót xa."
  },
  {
    "id": 161,
    "character": "辰",
    "variants": [],
    "hanViet": "Thần",
    "meaning": "Ngày giờ, giờ Thìn (con rồng), sớm mai",
    "strokeCount": 7,
    "reading": {
      "hiragana": "たつ",
      "romaji": "tatsu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "農",
        "hanViet": "Nông",
        "meaning": "Nông nghiệp, làm ruộng",
        "hiragana": "のう"
      },
      {
        "kanji": "辱",
        "hanViet": "Nhục",
        "meaning": "Nhục nhã, sỉ nhục",
        "hiragana": "はずかしめる"
      },
      {
        "kanji": "蜃",
        "hanViet": "Thận",
        "meaning": "Con sò lớn thở mây",
        "hiragana": "しん"
      }
    ],
    "description": "Hình con sò hé miệng thò chân ra lúc thủy triều buổi sớm mai."
  },
  {
    "id": 162,
    "character": "辵",
    "variants": [
      "辶"
    ],
    "hanViet": "Sước",
    "meaning": "Bước chân đi trên đường, di chuyển, đi lại",
    "strokeCount": 7,
    "reading": {
      "hiragana": "しんにょう",
      "romaji": "shinnyou"
    },
    "position": "nyoo",
    "positionNameVi": "Góc dưới trái (Quai xước 辶)",
    "examples": [
      {
        "kanji": "道",
        "hanViet": "Đạo",
        "meaning": "Con đường, đạo lý",
        "hiragana": "みち"
      },
      {
        "kanji": "近",
        "hanViet": "Cận",
        "meaning": "Gần gũi",
        "hiragana": "ちかい"
      },
      {
        "kanji": "遠",
        "hanViet": "Viễn",
        "meaning": "Xa xôi",
        "hiragana": "とおい"
      }
    ],
    "description": "Hình bàn chân bước đi trên con đường ngã ba, tượng trưng cho hành trình di chuyển."
  },
  {
    "id": 163,
    "character": "邑",
    "variants": [
      "阝"
    ],
    "hanViet": "Ấp",
    "meaning": "Làng xóm, vùng đất phong, kinh thành",
    "strokeCount": 7,
    "reading": {
      "hiragana": "おおざと",
      "romaji": "oozato"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Ấp bàng 阝)",
    "examples": [
      {
        "kanji": "都",
        "hanViet": "Đô",
        "meaning": "Thủ đô, đô thị",
        "hiragana": "みやこ"
      },
      {
        "kanji": "部",
        "hanViet": "Bộ",
        "meaning": "Bộ phận, bộ ngành",
        "hiragana": "ぶ"
      },
      {
        "kanji": "郷",
        "hanViet": "Hương",
        "meaning": "Quê hương",
        "hiragana": "さと"
      }
    ],
    "description": "Hình khu đất có tường thành bao bọc và người quỳ bên dưới. Bên phải viết thành 阝."
  },
  {
    "id": 164,
    "character": "酉",
    "variants": [],
    "hanViet": "Dậu",
    "meaning": "Bình rượu ủ lên men, giờ Dậu (con gà)",
    "strokeCount": 7,
    "reading": {
      "hiragana": "とり",
      "romaji": "tori"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Dậu bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "酒",
        "hanViet": "Tửu",
        "meaning": "Rượu uống",
        "hiragana": "さけ"
      },
      {
        "kanji": "配",
        "hanViet": "Phối",
        "meaning": "Phân phát, kết đôi",
        "hiragana": "くばる"
      },
      {
        "kanji": "酸",
        "hanViet": "Toan",
        "meaning": "Chua, axit",
        "hiragana": "すい"
      }
    ],
    "description": "Hình chiếc vò sành có đáy nhọn dùng ủ rượu nho, rượu nếp lên men thơm nồng."
  },
  {
    "id": 165,
    "character": "釆",
    "variants": [],
    "hanViet": "Biện",
    "meaning": "Phân biệt, dấu móng chân thú xòe ra",
    "strokeCount": 7,
    "reading": {
      "hiragana": "のごめ",
      "romaji": "nogome"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "釈",
        "hanViet": "Thích",
        "meaning": "Giải thích, Thích Ca",
        "hiragana": "しゃく"
      },
      {
        "kanji": "番",
        "hanViet": "Phiên",
        "meaning": "Số thứ tự, phiên gác",
        "hiragana": "ばん"
      },
      {
        "kanji": "悉",
        "hanViet": "Tất",
        "meaning": "Tất cả, biết hết",
        "hiragana": "ことごとく"
      }
    ],
    "description": "Hình bàn chân thú xòe móng cào đất giúp thợ săn phân biệt dấu vết."
  },
  {
    "id": 166,
    "character": "里",
    "variants": [],
    "hanViet": "Lý",
    "meaning": "Làng xóm quê hương, dặm đường đo cự ly",
    "strokeCount": 7,
    "reading": {
      "hiragana": "さと",
      "romaji": "sato"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "重",
        "hanViet": "Trọng",
        "meaning": "Nặng nề, quan trọng",
        "hiragana": "おもい"
      },
      {
        "kanji": "野",
        "hanViet": "Dã",
        "meaning": "Cánh đồng hoang dã",
        "hiragana": "の"
      },
      {
        "kanji": "量",
        "hanViet": "Lượng",
        "meaning": "Đo lường, dung lượng",
        "hiragana": "はかる"
      }
    ],
    "description": "Ghép từ Điền (ruộng) + Thổ (đất): đất đai ruộng vườn nơi dân cư quần tụ lập làng."
  },
  {
    "id": 167,
    "character": "金",
    "variants": [
      "釒"
    ],
    "hanViet": "Kim",
    "meaning": "Kim loại, vàng bạc quý, tiền tài chuông đúc",
    "strokeCount": 8,
    "reading": {
      "hiragana": "かね",
      "romaji": "kane"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Kim bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "銀",
        "hanViet": "Ngân",
        "meaning": "Bạc trắng",
        "hiragana": "ぎん"
      },
      {
        "kanji": "鉄",
        "hanViet": "Thiết",
        "meaning": "Sắt thép",
        "hiragana": "てつ"
      },
      {
        "kanji": "針",
        "hanViet": "Châm",
        "meaning": "Cây kim may",
        "hiragana": "はり"
      }
    ],
    "description": "Hình quặng vàng kim loại sáng lấp lánh chôn sâu trong lòng đất được nung chảy."
  },
  {
    "id": 168,
    "character": "長",
    "variants": [
      "镸"
    ],
    "hanViet": "Trường",
    "meaning": "Dài lâu, trưởng thành, người đứng đầu",
    "strokeCount": 8,
    "reading": {
      "hiragana": "ながい",
      "romaji": "nagai"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "長",
        "hanViet": "Trường",
        "meaning": "Dài, thủ trưởng",
        "hiragana": "ながい"
      },
      {
        "kanji": "張",
        "hanViet": "Trương",
        "meaning": "Căng ra, giương cung",
        "hiragana": "はる"
      },
      {
        "kanji": "髪",
        "hanViet": "Phát",
        "meaning": "Mái tóc dài",
        "hiragana": "かみ"
      }
    ],
    "description": "Hình cụ già tóc dài tung bay trong gió cầm gậy chống dẫn dắt bộ tộc."
  },
  {
    "id": 169,
    "character": "門",
    "variants": [],
    "hanViet": "Môn",
    "meaning": "Hai cánh cổng lớn, cửa ngõ gia đình",
    "strokeCount": 8,
    "reading": {
      "hiragana": "もん",
      "romaji": "mon"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh (Môn bàng 門)",
    "examples": [
      {
        "kanji": "間",
        "hanViet": "Gian",
        "meaning": "Thời gian, khoảng trống",
        "hiragana": "あいだ"
      },
      {
        "kanji": "開",
        "hanViet": "Khai",
        "meaning": "Mở cửa",
        "hiragana": "あける"
      },
      {
        "kanji": "閉",
        "hanViet": "Bế",
        "meaning": "Đóng cửa",
        "hiragana": "しめる"
      }
    ],
    "description": "Tượng hình hai cánh cửa cổng lớn có bản lề hai bên mở đón khách."
  },
  {
    "id": 170,
    "character": "阜",
    "variants": [
      "阝"
    ],
    "hanViet": "Phụ",
    "meaning": "Gò đất cao, đồi núi đất bồi đắp",
    "strokeCount": 8,
    "reading": {
      "hiragana": "こざとへん",
      "romaji": "kozatohen"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Phụ bàng 阝)",
    "examples": [
      {
        "kanji": "防",
        "hanViet": "Phòng",
        "meaning": "Đề phòng, ngăn chặn",
        "hiragana": "ふせぐ"
      },
      {
        "kanji": "限",
        "hanViet": "Hạn",
        "meaning": "Giới hạn",
        "hiragana": "かぎる"
      },
      {
        "kanji": "院",
        "hanViet": "Viện",
        "meaning": "Bệnh viện, tu viện",
        "hiragana": "いん"
      }
    ],
    "description": "Hình các bậc thềm đất thoai thoải đắp cao thành gò đồi. Bên trái viết thành 阝."
  },
  {
    "id": 171,
    "character": "隶",
    "variants": [],
    "hanViet": "Đãi",
    "meaning": "Đi theo sau, bắt kịp, với tay chộp lấy",
    "strokeCount": 8,
    "reading": {
      "hiragana": "れいづくり",
      "romaji": "reidzukuri"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri)",
    "examples": [
      {
        "kanji": "隷",
        "hanViet": "Lệ",
        "meaning": "Nô lệ, phục tùng",
        "hiragana": "れい"
      },
      {
        "kanji": "逮",
        "hanViet": "Đãi",
        "meaning": "Bắt giữ tội phạm",
        "hiragana": "たい"
      },
      {
        "kanji": "康",
        "hanViet": "Khang",
        "meaning": "Khang kiện, an lành",
        "hiragana": "こう"
      }
    ],
    "description": "Hình bàn tay chộp tóm lấy đuôi con thú săn phía trước."
  },
  {
    "id": 172,
    "character": "隹",
    "variants": [],
    "hanViet": "Chuy",
    "meaning": "Con chim đuôi ngắn, gà rừng",
    "strokeCount": 8,
    "reading": {
      "hiragana": "ふるとり",
      "romaji": "furutori"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Tsukuri) / Ở trên",
    "examples": [
      {
        "kanji": "集",
        "hanViet": "Tập",
        "meaning": "Tụ tập, thu thập",
        "hiragana": "あつまる"
      },
      {
        "kanji": "進",
        "hanViet": "Tiến",
        "meaning": "Tiến bộ, đi lên",
        "hiragana": "すすむ"
      },
      {
        "kanji": "難",
        "hanViet": "Nan",
        "meaning": "Khó khăn, gian nan",
        "hiragana": "むずかしい"
      }
    ],
    "description": "Tượng hình con chim đậu trên cành có mỏ ngắn và đuôi cụt."
  },
  {
    "id": 173,
    "character": "雨",
    "variants": [
      "⻗"
    ],
    "hanViet": "Vũ",
    "meaning": "Cơn mưa rào, sấm sét mưa tuyết từ trời rơi",
    "strokeCount": 8,
    "reading": {
      "hiragana": "あめ",
      "romaji": "ame"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Vũ đầu ⻗)",
    "examples": [
      {
        "kanji": "雪",
        "hanViet": "Tuyết",
        "meaning": "Bông tuyết trắng",
        "hiragana": "ゆき"
      },
      {
        "kanji": "雲",
        "hanViet": "Vân",
        "meaning": "Đám mây bay",
        "hiragana": "くも"
      },
      {
        "kanji": "電",
        "hanViet": "Điện",
        "meaning": "Sấm chớp, dòng điện",
        "hiragana": "でん"
      }
    ],
    "description": "Hình bầu trời có đám mây ngưng đọng làm rơi bốn giọt mưa xuống đất."
  },
  {
    "id": 174,
    "character": "青",
    "variants": [],
    "hanViet": "Thanh",
    "meaning": "Màu xanh lá cây, xanh da trời, thanh xuân",
    "strokeCount": 8,
    "reading": {
      "hiragana": "あお",
      "romaji": "ao"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "静",
        "hanViet": "Tĩnh",
        "meaning": "Yên tĩnh, thanh tịnh",
        "hiragana": "しずか"
      },
      {
        "kanji": "清",
        "hanViet": "Thanh",
        "meaning": "Trong sạch, thanh khiết",
        "hiragana": "きよい"
      },
      {
        "kanji": "晴",
        "hanViet": "Tình",
        "meaning": "Trời nắng đẹp quang mây",
        "hiragana": "はれる"
      }
    ],
    "description": "Hình mầm non mới mọc xanh biếc kết hợp chất nhuộm màu xanh tươi mát."
  },
  {
    "id": 175,
    "character": "非",
    "variants": [],
    "hanViet": "Phi",
    "meaning": "Không phải, sai trái, trái ngược luân lý",
    "strokeCount": 8,
    "reading": {
      "hiragana": "あらず",
      "romaji": "arazu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "悲",
        "hanViet": "Bi",
        "meaning": "Bi thương, buồn bã",
        "hiragana": "かなしい"
      },
      {
        "kanji": "罪",
        "hanViet": "Tội",
        "meaning": "Tội lỗi",
        "hiragana": "つみ"
      },
      {
        "kanji": "扉",
        "hanViet": "Phi",
        "meaning": "Cánh cửa mở",
        "hiragana": "とびら"
      }
    ],
    "description": "Hình hai cánh chim xòe ra hai hướng đối nghịch nhau biểu thị sự bất đồng."
  },
  {
    "id": 176,
    "character": "面",
    "variants": [],
    "hanViet": "Diện",
    "meaning": "Khuôn mặt người, bề mặt phẳng, phương diện",
    "strokeCount": 9,
    "reading": {
      "hiragana": "めん",
      "romaji": "men"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "面",
        "hanViet": "Diện",
        "meaning": "Mặt, bề mặt",
        "hiragana": "おもて"
      },
      {
        "kanji": "面白",
        "hanViet": "Diện bạch",
        "meaning": "Thú vị, vui vẻ",
        "hiragana": "おもしろい"
      },
      {
        "kanji": "靥",
        "hanViet": "Yểm",
        "meaning": "Má lúm đồng tiền",
        "hiragana": "よう"
      }
    ],
    "description": "Hình vẽ đường viền khuôn mặt bao bọc lấy con mắt và sống mũi."
  },
  {
    "id": 177,
    "character": "革",
    "variants": [],
    "hanViet": "Cách",
    "meaning": "Tấm da thuộc đã cạo sạch lông, cải cách đổi mới",
    "strokeCount": 9,
    "reading": {
      "hiragana": "かわ",
      "romaji": "kawa"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Cách bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "靴",
        "hanViet": "Ngoa",
        "meaning": "Đôi giày da",
        "hiragana": "くつ"
      },
      {
        "kanji": "鞄",
        "hanViet": "Bạc",
        "meaning": "Chiếc cặp da, ba lô",
        "hiragana": "かばん"
      },
      {
        "kanji": "革",
        "hanViet": "Cách",
        "meaning": "Da thuộc, cải cách",
        "hiragana": "かわ"
      }
    ],
    "description": "Hình tấm da con thú được căng phẳng trên khung gỗ để phơi thuộc da."
  },
  {
    "id": 178,
    "character": "韋",
    "variants": [],
    "hanViet": "Vi",
    "meaning": "Da thuộc mềm dẻo dai, bao quanh vây bọc",
    "strokeCount": 9,
    "reading": {
      "hiragana": "なめしがわ",
      "romaji": "nameshigawa"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên phải",
    "examples": [
      {
        "kanji": "偉",
        "hanViet": "Vĩ",
        "meaning": "Vĩ đại, xuất chúng",
        "hiragana": "えらい"
      },
      {
        "kanji": "違",
        "hanViet": "Vi",
        "meaning": "Khác biệt, vi phạm",
        "hiragana": "ちがう"
      },
      {
        "kanji": "衛",
        "hanViet": "Vệ",
        "meaning": "Bảo vệ, vệ sinh",
        "hiragana": "えい"
      }
    ],
    "description": "Hình những bước chân lính tuần tra đi vòng quanh bảo vệ thành quách."
  },
  {
    "id": 179,
    "character": "韭",
    "variants": [],
    "hanViet": "Cửu",
    "meaning": "Cây rau hẹ cắt lá lại mọc, bền bỉ",
    "strokeCount": 9,
    "reading": {
      "hiragana": "にら",
      "romaji": "nira"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "韮",
        "hanViet": "Cửu",
        "meaning": "Rau hẹ thơm",
        "hiragana": "にら"
      },
      {
        "kanji": "韲",
        "hanViet": "Tễ",
        "meaning": "Gia vị rau băm nhuyễn",
        "hiragana": "せい"
      },
      {
        "kanji": "繊",
        "hanViet": "Tiêm",
        "meaning": "Mảnh dẻ, sợi tơ nhỏ",
        "hiragana": "せん"
      }
    ],
    "description": "Hình những bụi rau hẹ xanh mọc đều đặn trên luống đất."
  },
  {
    "id": 180,
    "character": "音",
    "variants": [],
    "hanViet": "Âm",
    "meaning": "Âm thanh, tiếng động, giai điệu ngân vang",
    "strokeCount": 9,
    "reading": {
      "hiragana": "おと",
      "romaji": "oto"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Âm bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "暗",
        "hanViet": "Ám",
        "meaning": "Tối tăm, u ám",
        "hiragana": "くらい"
      },
      {
        "kanji": "響",
        "hanViet": "Hưởng",
        "meaning": "Vang vọng, ảnh hưởng",
        "hiragana": "ひびく"
      },
      {
        "kanji": "韻",
        "hanViet": "Vận",
        "meaning": "Vần điệu thơ ca",
        "hiragana": "いん"
      }
    ],
    "description": "Hình lời nói phát ra từ miệng được ngậm lại thành giai điệu âm hưởng."
  },
  {
    "id": 181,
    "character": "頁",
    "variants": [],
    "hanViet": "Hiệp",
    "meaning": "Trang giấy sách, cái đầu người trang nghiêm",
    "strokeCount": 9,
    "reading": {
      "hiragana": "おおがい",
      "romaji": "oogai"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Hiệp bàng)",
    "examples": [
      {
        "kanji": "顔",
        "hanViet": "Nhan",
        "meaning": "Khuôn mặt",
        "hiragana": "かお"
      },
      {
        "kanji": "頭",
        "hanViet": "Đầu",
        "meaning": "Cái đầu",
        "hiragana": "あたま"
      },
      {
        "kanji": "題",
        "hanViet": "Đề",
        "meaning": "Tiêu đề, đề bài",
        "hiragana": "だい"
      }
    ],
    "description": "Hình con người nổi bật với phần đầu to trang nghiêm đang cúi chào."
  },
  {
    "id": 182,
    "character": "風",
    "variants": [],
    "hanViet": "Phong",
    "meaning": "Ngọn gió thổi, phong thái, phong tục tập quán",
    "strokeCount": 9,
    "reading": {
      "hiragana": "かぜ",
      "romaji": "kaze"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh (Phong bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "風",
        "hanViet": "Phong",
        "meaning": "Cơn gió",
        "hiragana": "かぜ"
      },
      {
        "kanji": "嵐",
        "hanViet": "Lam",
        "meaning": "Cơn bão tố sấm sét",
        "hiragana": "あらし"
      },
      {
        "kanji": "颱",
        "hanViet": "Thai",
        "meaning": "Bão nhiệt đới lớn",
        "hiragana": "たい"
      }
    ],
    "description": "Hình luồng gió cuốn mang theo các hạt bụi và côn trùng bay lượn."
  },
  {
    "id": 183,
    "character": "飛",
    "variants": [],
    "hanViet": "Phi",
    "meaning": "Bay lượn trên trời, cất cánh phi hành",
    "strokeCount": 9,
    "reading": {
      "hiragana": "とぶ",
      "romaji": "tobu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "飛",
        "hanViet": "Phi",
        "meaning": "Bay",
        "hiragana": "とぶ"
      },
      {
        "kanji": "翻",
        "hanViet": "Phiên",
        "meaning": "Bay lượn, dịch thuật",
        "hiragana": "ひるがえる"
      },
      {
        "kanji": "飜",
        "hanViet": "Phiên",
        "meaning": "Lật tung, bay lượn",
        "hiragana": "ほん"
      }
    ],
    "description": "Hình chú chim đang vỗ đôi cánh sải dài bay vút lên bầu trời."
  },
  {
    "id": 184,
    "character": "食",
    "variants": [
      "飠",
      "𩙿"
    ],
    "hanViet": "Thực",
    "meaning": "Ăn uống, thức ăn, lương thực ẩm thực",
    "strokeCount": 9,
    "reading": {
      "hiragana": "たべる",
      "romaji": "taberu"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Thực bàng 飠) / Toàn thân",
    "examples": [
      {
        "kanji": "飯",
        "hanViet": "Phạn",
        "meaning": "Cơm trắng",
        "hiragana": "めし"
      },
      {
        "kanji": "館",
        "hanViet": "Quán",
        "meaning": "Tòa nhà, hội quán",
        "hiragana": "かん"
      },
      {
        "kanji": "飲",
        "hanViet": "Ẩm",
        "meaning": "Uống nước",
        "hiragana": "のむ"
      }
    ],
    "description": "Hình chiếc vạc có nắp đậy thơm phức mùi thức ăn ngon lành."
  },
  {
    "id": 185,
    "character": "首",
    "variants": [],
    "hanViet": "Thủ",
    "meaning": "Cái đầu, chiếc cổ, người thủ lĩnh đứng đầu",
    "strokeCount": 9,
    "reading": {
      "hiragana": "くび",
      "romaji": "kubi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "首",
        "hanViet": "Thủ",
        "meaning": "Cổ họng, thủ tướng",
        "hiragana": "くび"
      },
      {
        "kanji": "道",
        "hanViet": "Đạo",
        "meaning": "Con đường giác ngộ",
        "hiragana": "みち"
      },
      {
        "kanji": "魁",
        "hanViet": "Khôi",
        "meaning": "Khôi ngô, đứng đầu",
        "hiragana": "さきがけ"
      }
    ],
    "description": "Hình cái đầu người có đôi mắt và búi tóc búi cao kiêu hãnh."
  },
  {
    "id": 186,
    "character": "香",
    "variants": [],
    "hanViet": "Hương",
    "meaning": "Hương thơm ngọt ngào, mùi thơm lúa chín",
    "strokeCount": 9,
    "reading": {
      "hiragana": "かおり",
      "romaji": "kaori"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở dưới",
    "examples": [
      {
        "kanji": "香",
        "hanViet": "Hương",
        "meaning": "Mùi hương thơm",
        "hiragana": "かおり"
      },
      {
        "kanji": "馨",
        "hanViet": "Hinh",
        "meaning": "Hương thơm lan xa",
        "hiragana": "かおる"
      },
      {
        "kanji": "馥",
        "hanViet": "Phức",
        "meaning": "Thơm phức ngào ngạt",
        "hiragana": "ふく"
      }
    ],
    "description": "Ghép từ Hòa (lúa chín) + Cam (ngọt): mùi thơm ngào ngạt ngọt ngào của mùa gặt."
  },
  {
    "id": 187,
    "character": "馬",
    "variants": [],
    "hanViet": "Mã",
    "meaning": "Con ngựa, chạy nhanh dũng mãnh",
    "strokeCount": 10,
    "reading": {
      "hiragana": "うま",
      "romaji": "uma"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Mã bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "駅",
        "hanViet": "Dịch",
        "meaning": "Nhà ga tàu, trạm ngựa",
        "hiragana": "えき"
      },
      {
        "kanji": "駐",
        "hanViet": "Trú",
        "meaning": "Đỗ xe, dừng chân trú ngụ",
        "hiragana": "ちゅう"
      },
      {
        "kanji": "騎",
        "hanViet": "Kỵ",
        "meaning": "Cưỡi ngựa, kỵ sĩ",
        "hiragana": "き"
      }
    ],
    "description": "Hình con ngựa có bờm dài tung bay và bốn vó phi nước đại."
  },
  {
    "id": 188,
    "character": "骨",
    "variants": [],
    "hanViet": "Cốt",
    "meaning": "Khung xương, xương cốt vững chắc",
    "strokeCount": 10,
    "reading": {
      "hiragana": "ほね",
      "romaji": "hone"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Cốt bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "体",
        "hanViet": "Thể",
        "meaning": "Thân thể",
        "hiragana": "からだ"
      },
      {
        "kanji": "髄",
        "hanViet": "Tủy",
        "meaning": "Tủy sống, cốt tủy",
        "hiragana": "ずい"
      },
      {
        "kanji": "骸",
        "hanViet": "Hài",
        "meaning": "Thi hài, xác tàn",
        "hiragana": "むくろ"
      }
    ],
    "description": "Hình các khớp xương kết nối lại nâng đỡ thân thể con người."
  },
  {
    "id": 189,
    "character": "高",
    "variants": [],
    "hanViet": "Cao",
    "meaning": "Chiều cao, tòa tháp cao vút sừng sững",
    "strokeCount": 10,
    "reading": {
      "hiragana": "たかい",
      "romaji": "takai"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "高",
        "hanViet": "Cao",
        "meaning": "Cao lớn, đắt đỏ",
        "hiragana": "たかい"
      },
      {
        "kanji": "豪",
        "hanViet": "Hào",
        "meaning": "Hào phú, hào sảng",
        "hiragana": "ごう"
      },
      {
        "kanji": "膏",
        "hanViet": "Cao",
        "meaning": "Cao dán mỡ thuốc",
        "hiragana": "こう"
      }
    ],
    "description": "Hình tòa lầu gác cao tầng nhiều tầng có mái che nhô lên bầu trời."
  },
  {
    "id": 190,
    "character": "髟",
    "variants": [],
    "hanViet": "Tiêu",
    "meaning": "Mái tóc dài buông xõa bồng bềnh",
    "strokeCount": 10,
    "reading": {
      "hiragana": "かみがしら",
      "romaji": "kamigashira"
    },
    "position": "kanmuri",
    "positionNameVi": "Ở trên (Tiêu đầu)",
    "examples": [
      {
        "kanji": "髪",
        "hanViet": "Phát",
        "meaning": "Sợi tóc",
        "hiragana": "かみ"
      },
      {
        "kanji": "髭",
        "hanViet": "Tì",
        "meaning": "Bộ râu mép",
        "hiragana": "ひげ"
      },
      {
        "kanji": "鬚",
        "hanViet": "Tu",
        "meaning": "Râu quai nón",
        "hiragana": "ひげ"
      }
    ],
    "description": "Hình mái tóc dài buông xõa mềm mại rủ xuống ngang vai."
  },
  {
    "id": 191,
    "character": "鬥",
    "variants": [],
    "hanViet": "Đấu",
    "meaning": "Đấu tranh, giao chiến, hai người đọ sức",
    "strokeCount": 10,
    "reading": {
      "hiragana": "とうがまえ",
      "romaji": "tougamae"
    },
    "position": "kamae",
    "positionNameVi": "Bao quanh hai bên",
    "examples": [
      {
        "kanji": "闘",
        "hanViet": "Đấu",
        "meaning": "Chiến đấu vật lộn",
        "hiragana": "たたかう"
      },
      {
        "kanji": "鬧",
        "hanViet": "Náo",
        "meaning": "Huyên náo, ồn ào",
        "hiragana": "とう"
      },
      {
        "kanji": "鬨",
        "hanViet": "Hống",
        "meaning": "Tiếng reo hò chiến thắng",
        "hiragana": "とき"
      }
    ],
    "description": "Hình hai người tóc tai túm lấy nhau vung nắm đấm đánh lộn."
  },
  {
    "id": 192,
    "character": "鬯",
    "variants": [],
    "hanViet": "Sưởng",
    "meaning": "Rượu cúng tế tỏa hương cỏ thơm uất kim",
    "strokeCount": 10,
    "reading": {
      "hiragana": "ちょう",
      "romaji": "chou"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "鬱",
        "hanViet": "Uất",
        "meaning": "U uất, trầm cảm dày đặc",
        "hiragana": "うつ"
      },
      {
        "kanji": "鬯",
        "hanViet": "Sưởng",
        "meaning": "Rượu cúng thơm",
        "hiragana": "ちょう"
      },
      {
        "kanji": "鬰",
        "hanViet": "Uất",
        "meaning": "Cây cối um tùm",
        "hiragana": "うつ"
      }
    ],
    "description": "Hình vò đựng rượu nếp ngâm thảo mộc dâng tế thần linh thơm ngát."
  },
  {
    "id": 193,
    "character": "鬲",
    "variants": [],
    "hanViet": "Cách",
    "meaning": "Cái nồi ba chân rỗng đáy nấu lễ tế",
    "strokeCount": 10,
    "reading": {
      "hiragana": "れき",
      "romaji": "reki"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "融",
        "hanViet": "Dung",
        "meaning": "Hòa tan, tài chính tín dụng",
        "hiragana": "とける"
      },
      {
        "kanji": "鬲",
        "hanViet": "Cách",
        "meaning": "Chiếc vạc gốm cổ",
        "hiragana": "れき"
      },
      {
        "kanji": "鬻",
        "hanViet": "Chúc",
        "meaning": "Nấu cháo nhừ, bán",
        "hiragana": "ひさぐ"
      }
    ],
    "description": "Hình chiếc vạc nấu bằng đất nung có ba chân rỗng để lửa sưởi nhanh sôi."
  },
  {
    "id": 194,
    "character": "鬼",
    "variants": [],
    "hanViet": "Quỷ",
    "meaning": "Con quỷ, linh hồn người chết, ma quái",
    "strokeCount": 10,
    "reading": {
      "hiragana": "おに",
      "romaji": "oni"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên phải",
    "examples": [
      {
        "kanji": "魂",
        "hanViet": "Hồn",
        "meaning": "Linh hồn",
        "hiragana": "たましい"
      },
      {
        "kanji": "魅",
        "hanViet": "Mị",
        "meaning": "Quyến rũ, ma mị",
        "hiragana": "み"
      },
      {
        "kanji": "魔",
        "hanViet": "Ma",
        "meaning": "Ma quỷ, ma thuật",
        "hiragana": "ま"
      }
    ],
    "description": "Hình người đeo mặt nạ quỷ đầu to gớm ghiếc bay lượn trong đêm."
  },
  {
    "id": 195,
    "character": "魚",
    "variants": [
      "⻥"
    ],
    "hanViet": "Ngư",
    "meaning": "Con cá bơi lội dưới nước, thủy sản",
    "strokeCount": 11,
    "reading": {
      "hiragana": "さかな",
      "romaji": "sakana"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Ngư bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "鮮",
        "hanViet": "Tiên",
        "meaning": "Tươi sống, Triều Tiên",
        "hiragana": "あざやか"
      },
      {
        "kanji": "鯨",
        "hanViet": "Kình",
        "meaning": "Cá voi khổng lồ",
        "hiragana": "くじら"
      },
      {
        "kanji": "鯉",
        "hanViet": "Lý",
        "meaning": "Cá chép vượt vũ môn",
        "hiragana": "こい"
      }
    ],
    "description": "Hình con cá có đầu nhọn, thân vảy lấp lánh và chiếc đuôi quẫy nước."
  },
  {
    "id": 196,
    "character": "鳥",
    "variants": [
      "⿃"
    ],
    "hanViet": "Điểu",
    "meaning": "Con chim có đuôi dài, loài lông vũ",
    "strokeCount": 11,
    "reading": {
      "hiragana": "とり",
      "romaji": "tori"
    },
    "position": "tsukuri",
    "positionNameVi": "Bên phải (Điểu bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "鳴",
        "hanViet": "Minh",
        "meaning": "Chim hót, kêu vang",
        "hiragana": "なく"
      },
      {
        "kanji": "島",
        "hanViet": "Đảo",
        "meaning": "Hòn đảo chim đậu",
        "hiragana": "しま"
      },
      {
        "kanji": "鳩",
        "hanViet": "Cưu",
        "meaning": "Chim bồ câu hòa bình",
        "hiragana": "はと"
      }
    ],
    "description": "Hình chú chim có mắt tròn, mỏ cong và bộ lông đuôi dài duyên dáng."
  },
  {
    "id": 197,
    "character": "鹵",
    "variants": [],
    "hanViet": "Lỗ",
    "meaning": "Đất mặn ven biển, muối mỏ tự nhiên",
    "strokeCount": 11,
    "reading": {
      "hiragana": "ろ",
      "romaji": "ro"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "鹹",
        "hanViet": "Hàm",
        "meaning": "Vị mặn mòi",
        "hiragana": "しおからい"
      },
      {
        "kanji": "鹸",
        "hanViet": "Kiềm",
        "meaning": "Chất kiềm xà phòng",
        "hiragana": "けん"
      },
      {
        "kanji": "鹵",
        "hanViet": "Lỗ",
        "meaning": "Muối mỏ tự nhiên",
        "hiragana": "しおち"
      }
    ],
    "description": "Hình bãi đất mặn ven biển kết tinh lại thành những hạt muối trắng."
  },
  {
    "id": 198,
    "character": "鹿",
    "variants": [],
    "hanViet": "Lộc",
    "meaning": "Con hươu, con nai sừng đẹp",
    "strokeCount": 11,
    "reading": {
      "hiragana": "しか",
      "romaji": "shika"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Ở trên",
    "examples": [
      {
        "kanji": "麗",
        "hanViet": "Lệ",
        "meaning": "Diễm lệ, xinh đẹp",
        "hiragana": "うるわしい"
      },
      {
        "kanji": "塵",
        "hanViet": "Trần",
        "meaning": "Bụi bặm trần gian",
        "hiragana": "ごみ"
      },
      {
        "kanji": "麓",
        "hanViet": "Lộc",
        "meaning": "Chân núi rừng rậm",
        "hiragana": "ふもと"
      }
    ],
    "description": "Hình con hươu sao có cặp sừng phân nhánh hùng vĩ và đôi chân nhanh nhẹn."
  },
  {
    "id": 199,
    "character": "麥",
    "variants": [
      "麦"
    ],
    "hanViet": "Mạch",
    "meaning": "Cây lúa mạch, lúa mì làm bánh",
    "strokeCount": 11,
    "reading": {
      "hiragana": "むぎ",
      "romaji": "mugi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "麺",
        "hanViet": "Miến",
        "meaning": "Sợi mì, miến ăn",
        "hiragana": "めん"
      },
      {
        "kanji": "麹",
        "hanViet": "Khúc",
        "meaning": "Men rượu lúa mì",
        "hiragana": "こうじ"
      },
      {
        "kanji": "麩",
        "hanViet": "Phu",
        "meaning": "Vỏ cám mì",
        "hiragana": "ふ"
      }
    ],
    "description": "Hình cây lúa mạch trĩu bông có râu hạt dài đung đưa trong gió."
  },
  {
    "id": 200,
    "character": "麻",
    "variants": [],
    "hanViet": "Ma",
    "meaning": "Cây gai dầu, sợi lanh dệt vải thô",
    "strokeCount": 11,
    "reading": {
      "hiragana": "あさ",
      "romaji": "asa"
    },
    "position": "tare",
    "positionNameVi": "Góc trên trái (Tare) / Toàn thân",
    "examples": [
      {
        "kanji": "摩",
        "hanViet": "Ma",
        "meaning": "Ma sát, xoa bóp",
        "hiragana": "する"
      },
      {
        "kanji": "磨",
        "hanViet": "Ma",
        "meaning": "Mài giũa ngọc",
        "hiragana": "みがく"
      },
      {
        "kanji": "魔",
        "hanViet": "Ma",
        "meaning": "Ma quỷ, mê muội",
        "hiragana": "ま"
      }
    ],
    "description": "Hình những bó cây gai phơi trong lều để bóc sợi tơ dệt bao bố."
  },
  {
    "id": 201,
    "character": "黃",
    "variants": [
      "黄"
    ],
    "hanViet": "Hoàng",
    "meaning": "Màu vàng đất phù sa, ánh kim rực rỡ",
    "strokeCount": 12,
    "reading": {
      "hiragana": "き",
      "romaji": "ki"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "黄",
        "hanViet": "Hoàng",
        "meaning": "Màu vàng",
        "hiragana": "きいろ"
      },
      {
        "kanji": "黄金",
        "hanViet": "Hoàng kim",
        "meaning": "Vàng quý giá",
        "hiragana": "おうごん"
      },
      {
        "kanji": "黌",
        "hanViet": "Hoàng",
        "meaning": "Trường học cổ",
        "hiragana": "こう"
      }
    ],
    "description": "Hình miếng ngọc bội màu vàng óng ánh người xưa đeo bên hông."
  },
  {
    "id": 202,
    "character": "黍",
    "variants": [],
    "hanViet": "Thử",
    "meaning": "Cây kê hạt nhỏ dính làm bánh rượu",
    "strokeCount": 12,
    "reading": {
      "hiragana": "きび",
      "romaji": "kibi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "黏",
        "hanViet": "Niêm",
        "meaning": "Dính dớp, keo sơn",
        "hiragana": "ねばる"
      },
      {
        "kanji": "黎",
        "hanViet": "Lê",
        "meaning": "Dân đen, sáng sớm",
        "hiragana": "れい"
      },
      {
        "kanji": "黍",
        "hanViet": "Thử",
        "meaning": "Hạt kê dẻo",
        "hiragana": "きび"
      }
    ],
    "description": "Hình bông kê chín nặng trĩu có chất dính tiết ra mùi thơm nồng."
  },
  {
    "id": 203,
    "character": "黑",
    "variants": [
      "黒"
    ],
    "hanViet": "Hắc",
    "meaning": "Màu đen tro bếp, bóng tối âm u",
    "strokeCount": 12,
    "reading": {
      "hiragana": "くろ",
      "romaji": "kuro"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Hắc bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "黒",
        "hanViet": "Hắc",
        "meaning": "Màu đen",
        "hiragana": "くろい"
      },
      {
        "kanji": "黙",
        "hanViet": "Mặc",
        "meaning": "Im lặng, trầm mặc",
        "hiragana": "だまる"
      },
      {
        "kanji": "墨",
        "hanViet": "Mặc",
        "meaning": "Mực tàu viết chữ",
        "hiragana": "すみ"
      }
    ],
    "description": "Hình ống khói bếp lò bốc muội than đen kịt bám đầy bồ hóng."
  },
  {
    "id": 204,
    "character": "黹",
    "variants": [],
    "hanViet": "Chỉ",
    "meaning": "Thêu thùa hoa văn bằng kim chỉ tinh xảo",
    "strokeCount": 12,
    "reading": {
      "hiragana": "ぬいとり",
      "romaji": "nuitori"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "黼",
        "hanViet": "Phủ",
        "meaning": "Áo thêu hình búa rìu",
        "hiragana": "ほ"
      },
      {
        "kanji": "黻",
        "hanViet": "Phất",
        "meaning": "Hoa văn chữ Á thêu",
        "hiragana": "ふつ"
      },
      {
        "kanji": "黹",
        "hanViet": "Chỉ",
        "meaning": "May vá thêu thùa",
        "hiragana": "ち"
      }
    ],
    "description": "Hình bàn tay cầm kim khâu luồn từng mũi chỉ thêu hoa văn lên áo."
  },
  {
    "id": 205,
    "character": "黽",
    "variants": [
      "黾"
    ],
    "hanViet": "Mãnh",
    "meaning": "Con ếch, loài lưỡng cư bơi lội",
    "strokeCount": 13,
    "reading": {
      "hiragana": "べん",
      "romaji": "ben"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "勉",
        "hanViet": "Miễn",
        "meaning": "Cố gắng, nỗ lực học",
        "hiragana": "つとめる"
      },
      {
        "kanji": "縄",
        "hanViet": "Thằng",
        "meaning": "Dây thừng bện",
        "hiragana": "なわ"
      },
      {
        "kanji": "鼈",
        "hanViet": "Biết",
        "meaning": "Con ba ba mai mềm",
        "hiragana": "すっぽん"
      }
    ],
    "description": "Hình con ếch to đầu bắp chân khỏe đang bật nhảy trên bùn lầy."
  },
  {
    "id": 206,
    "character": "鼎",
    "variants": [],
    "hanViet": "Đỉnh",
    "meaning": "Chiếc đỉnh đồng ba chân vững chắc quyền lực",
    "strokeCount": 13,
    "reading": {
      "hiragana": "かなえ",
      "romaji": "kanae"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "鼎",
        "hanViet": "Đỉnh",
        "meaning": "Chiếc đỉnh đồng ba chân",
        "hiragana": "かなえ"
      },
      {
        "kanji": "鼒",
        "hanViet": "Tuy",
        "meaning": "Cái đỉnh đồng miệng nhỏ",
        "hiragana": "さい"
      },
      {
        "kanji": "鼐",
        "hanViet": "Nãi",
        "meaning": "Cái đỉnh đồng lớn nhất",
        "hiragana": "だい"
      }
    ],
    "description": "Hình chiếc vạc đồng ba chân hai quai dùng tế lễ biểu tượng giang sơn vững bền."
  },
  {
    "id": 207,
    "character": "鼓",
    "variants": [],
    "hanViet": "Cổ",
    "meaning": "Cái trống da, gõ vang thúc giục cổ vũ",
    "strokeCount": 13,
    "reading": {
      "hiragana": "つづみ",
      "romaji": "tsudzumi"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân / Bên trái",
    "examples": [
      {
        "kanji": "鼓",
        "hanViet": "Cổ",
        "meaning": "Cái trống gõ",
        "hiragana": "つづみ"
      },
      {
        "kanji": "瞽",
        "hanViet": "Cổ",
        "meaning": "Người mù gảy đàn",
        "hiragana": "こ"
      },
      {
        "kanji": "鼕",
        "hanViet": "Đông",
        "meaning": "Tiếng trống trận thùng thùng",
        "hiragana": "とう"
      }
    ],
    "description": "Hình chiếc trống bọc da căng tròn và bàn tay cầm dùi gõ vang."
  },
  {
    "id": 208,
    "character": "鼠",
    "variants": [],
    "hanViet": "Thử",
    "meaning": "Con chuột gặm nhấm nhanh nhẹn lắt léo",
    "strokeCount": 13,
    "reading": {
      "hiragana": "ねずみ",
      "romaji": "nezumi"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "鼠",
        "hanViet": "Thử",
        "meaning": "Con chuột",
        "hiragana": "ねずみ"
      },
      {
        "kanji": "鼬",
        "hanViet": "Dữu",
        "meaning": "Con chồn nhỏ",
        "hiragana": "いたち"
      },
      {
        "kanji": "鼴",
        "hanViet": "Yển",
        "meaning": "Con chuột chũi đào đất",
        "hiragana": "もぐら"
      }
    ],
    "description": "Hình con chuột có mõm nhọn, hàm răng sắc cắn phá và chiếc đuôi dài."
  },
  {
    "id": 209,
    "character": "鼻",
    "variants": [],
    "hanViet": "Tị",
    "meaning": "Cái mũi hít thở, ngửi mùi hương",
    "strokeCount": 14,
    "reading": {
      "hiragana": "はな",
      "romaji": "hana"
    },
    "position": "hen",
    "positionNameVi": "Bên trái / Toàn thân",
    "examples": [
      {
        "kanji": "鼻",
        "hanViet": "Tị",
        "meaning": "Cái mũi",
        "hiragana": "はな"
      },
      {
        "kanji": "鼾",
        "hanViet": "Hãn",
        "meaning": "Ngáy to khi ngủ",
        "hiragana": "いびき"
      },
      {
        "kanji": "鼽",
        "hanViet": "Cừu",
        "meaning": "Nghẹt mũi tắc thở",
        "hiragana": "きゅう"
      }
    ],
    "description": "Hình sống mũi người với hai lỗ thở và đường khí vào phổi."
  },
  {
    "id": 210,
    "character": "齊",
    "variants": [
      "斉"
    ],
    "hanViet": "Tề",
    "meaning": "Ngay ngắn, ngang bằng phẳng phiu chỉnh tề",
    "strokeCount": 14,
    "reading": {
      "hiragana": "せい",
      "romaji": "sei"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "斉",
        "hanViet": "Tề",
        "meaning": "Chỉnh tề, đều đặn",
        "hiragana": "そろえる"
      },
      {
        "kanji": "齋",
        "hanViet": "Chay",
        "meaning": "Ăn chay niệm phật",
        "hiragana": "さい"
      },
      {
        "kanji": "齎",
        "hanViet": "Tê",
        "meaning": "Đem cho, mang đến",
        "hiragana": "もたらす"
      }
    ],
    "description": "Hình những bông lúa chín mọc đều tăm tắp ngang bằng ngọn nhau."
  },
  {
    "id": 211,
    "character": "齒",
    "variants": [
      "歯"
    ],
    "hanViet": "Xỉ",
    "meaning": "Hàm răng, nhai nghiền, tuổi tác đời người",
    "strokeCount": 15,
    "reading": {
      "hiragana": "は",
      "romaji": "ha"
    },
    "position": "hen",
    "positionNameVi": "Bên trái (Xỉ bàng) / Toàn thân",
    "examples": [
      {
        "kanji": "歯",
        "hanViet": "Xỉ",
        "meaning": "Cái răng",
        "hiragana": "は"
      },
      {
        "kanji": "齢",
        "hanViet": "Linh",
        "meaning": "Tuổi tác",
        "hiragana": "よわい"
      },
      {
        "kanji": "齟",
        "hanViet": "Trở",
        "meaning": "Bất hòa, cắn lệch răng",
        "hiragana": "そ"
      }
    ],
    "description": "Hình hai hàm răng đều tăm tắp khép lại bên trong khuôn miệng."
  },
  {
    "id": 212,
    "character": "龍",
    "variants": [
      "竜"
    ],
    "hanViet": "Long",
    "meaning": "Con rồng thần thoại uốn lượn uy nghi",
    "strokeCount": 16,
    "reading": {
      "hiragana": "りゅう",
      "romaji": "ryuu"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "竜",
        "hanViet": "Long",
        "meaning": "Con rồng",
        "hiragana": "たつ"
      },
      {
        "kanji": "襲",
        "hanViet": "Tập",
        "meaning": "Tập kích, kế thừa",
        "hiragana": "おそう"
      },
      {
        "kanji": "聾",
        "hanViet": "Lung",
        "meaning": "Điếc tai sấm sét",
        "hiragana": "つんぼ"
      }
    ],
    "description": "Hình con rồng thần uốn lượn mình vảy mây, đầu có sừng và miệng phun mưa gió."
  },
  {
    "id": 213,
    "character": "龜",
    "variants": [
      "亀"
    ],
    "hanViet": "Quy",
    "meaning": "Con rùa mai cứng trường thọ bất lão",
    "strokeCount": 16,
    "reading": {
      "hiragana": "かめ",
      "romaji": "kame"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "亀",
        "hanViet": "Quy",
        "meaning": "Con rùa",
        "hiragana": "かめ"
      },
      {
        "kanji": "鼈",
        "hanViet": "Biết",
        "meaning": "Con ba ba",
        "hiragana": "すっぽん"
      },
      {
        "kanji": "鬮",
        "hanViet": "Cưu",
        "meaning": "Rút thăm may rủi",
        "hiragana": "くじ"
      }
    ],
    "description": "Hình con rùa nhìn từ trên xuống có mai cứng vảy rùa, bốn chân và đuôi ngắn."
  },
  {
    "id": 214,
    "character": "龠",
    "variants": [],
    "hanViet": "Dược",
    "meaning": "Ống sáo trúc ba lỗ thổi lễ nhạc hòa bình",
    "strokeCount": 17,
    "reading": {
      "hiragana": "やく",
      "romaji": "yaku"
    },
    "position": "isolated",
    "positionNameVi": "Toàn thân (Độc lập)",
    "examples": [
      {
        "kanji": "龠",
        "hanViet": "Dược",
        "meaning": "Ống sáo cổ ba lỗ",
        "hiragana": "やく"
      },
      {
        "kanji": "龢",
        "hanViet": "Hòa",
        "meaning": "Hòa tấu êm dịu",
        "hiragana": "わ"
      },
      {
        "kanji": "籲",
        "hanViet": "Dụ",
        "meaning": "Kêu gọi van lơn",
        "hiragana": "ゆ"
      }
    ],
    "description": "Hình cây sáo trúc có ba lỗ thổi và các miệng sáo phát ra khúc nhạc trang nghiêm."
  }
];

// ══════════════════════════════════════════════════════
// HELPER UTILITIES
// ══════════════════════════════════════════════════════

/** Lấy bộ thủ theo ID (1 - 214) */
export function getRadicalById(id: number): Radical214 | undefined {
  return KANJI_RADICALS_214.find(r => r.id === id);
}

/** Lọc bộ thủ theo số nét viết */
export function filterRadicalsByStroke(strokeCount: number): Radical214[] {
  return KANJI_RADICALS_214.filter(r => r.strokeCount === strokeCount);
}

/** Lọc bộ thủ theo vị trí trong chữ Hán */
export function filterRadicalsByPosition(position: RadicalPosition): Radical214[] {
  return KANJI_RADICALS_214.filter(r => r.position === position);
}

/** Xóa dấu tiếng Việt phục vụ tìm kiếm mềm */
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/** Tìm kiếm đa năng theo chữ Hán, biến thể, tên Hán Việt, nghĩa, Romaji */
export function searchRadicals(query: string): Radical214[] {
  if (!query || !query.trim()) return KANJI_RADICALS_214;
  const cleanQuery = removeVietnameseTones(query.trim());
  const rawQuery = query.trim().toLowerCase();

  return KANJI_RADICALS_214.filter(r => {
    // 1. Khớp chữ Hán hoặc biến thể
    if (r.character.includes(rawQuery)) return true;
    if (r.variants.some(v => v.includes(rawQuery))) return true;

    // 2. Khớp Hán Việt (có dấu hoặc không dấu)
    const cleanHanViet = removeVietnameseTones(r.hanViet);
    if (cleanHanViet.includes(cleanQuery)) return true;

    // 3. Khớp nghĩa tiếng Việt
    const cleanMeaning = removeVietnameseTones(r.meaning);
    if (cleanMeaning.includes(cleanQuery)) return true;

    // 4. Khớp romaji hoặc hiragana
    if (r.reading.romaji.toLowerCase().includes(rawQuery)) return true;
    if (r.reading.hiragana.includes(rawQuery)) return true;

    // 5. Khớp chữ Kanji ví dụ
    if (r.examples.some(ex => ex.kanji.includes(rawQuery) || removeVietnameseTones(ex.hanViet).includes(cleanQuery))) {
      return true;
    }

    return false;
  });
}

/** Random ngẫu nhiên N bộ thủ (phục vụ quiz) */
export function getRandomRadicals(count: number, excludeIds: number[] = []): Radical214[] {
  const pool = KANJI_RADICALS_214.filter(r => !excludeIds.includes(r.id));
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
