/**
 * kanjiRadicalsData.ts — Dữ liệu tĩnh 35+ Bộ Thủ Kanji Tượng Hình Nền Tảng N5/N4
 * Đầy đủ: Hình tượng hình, Nghĩa đa chiều (>=2 nghĩa), Luyện viết AI, Mẹo nhớ ghép chữ.
 */

export interface DerivedKanji {
  kanji: string;
  reading: string;
  meaning: string;
  breakdownStory: string;
}

export type RadicalCategory = 'nature' | 'human' | 'object';

export const RADICAL_CATEGORIES: { id: RadicalCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả', icon: '🔍' },
  { id: 'nature', label: 'Tự Nhiên', icon: '🌿' },
  { id: 'human', label: 'Con Người & Cơ Thể', icon: '👤' },
  { id: 'object', label: 'Đồ Vật & Xây Dựng', icon: '🏠' },
];

export interface RadicalItem {
  id: string;
  symbol: string;
  strokeCount: number;
  reading: string;
  primaryMeaning: string;
  secondaryMeanings: string[];
  category: RadicalCategory;    // Phân loại chủ đề
  pictogramSymbol: string;      // Icon / Ký tự biểu tượng tượng hình
  pictogramDesc: string;        // Mô tả hình dáng thực tế
  explanation: string;         // Giải thích nghĩa chi tiết
  mnemonicStory: string;        // Mẹo nhớ
  derivedKanjis: DerivedKanji[];// Các chữ Kanji N5 phát triển từ bộ này
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTab: 'pictogram' | 'writing' | 'mnemonics';
}

// ══════════════════════════════════════════════════════
// 1. DANH SÁCH 35+ BỘ THỦ KANJI TƯỢNG HÌNH NỀN TẢNG
// ══════════════════════════════════════════════════════

export const ESSENTIAL_RADICALS: RadicalItem[] = [
  {
    id: 'nichi',
    symbol: '日',
    strokeCount: 4,
    reading: 'NHẬT / ひ (hi) / ニチ (nichi)',
    primaryMeaning: 'Mặt Trời',
    secondaryMeanings: ['Ngày (thời gian)', 'Nhật Bản (đất nước)', 'Ánh sáng / Ban ngày'],
    category: 'nature',
    pictogramSymbol: '☀️',
    pictogramDesc: 'Vòng tròn mặt trời chiếu sáng với vạch ngang ở giữa đại diện cho luồng ánh sáng phát ra.',
    explanation: 'Bộ Nhật là một trong những bộ thủ tượng hình cổ xưa nhất. Vốn vẽ hình mặt trời tròn có chấm ở giữa. Khi dùng làm bộ thủ ghép, nó thường mang ý nghĩa liên quan đến thời gian, ban ngày hoặc mặt trời.',
    mnemonicStory: 'Mặt trời tròn hình chữ nhật, ở giữa có vạch ánh sáng chiếu qua.',
    derivedKanjis: [
      { kanji: '明', reading: 'めい (mei) / あかるい (akarui)', meaning: 'Sáng sủa', breakdownStory: 'Ghép từ 日 (Mặt trời) + 月 (Mặt trăng). Cả Mặt trời và Mặt trăng cùng chiếu sáng thì rất "Sáng sủa".' },
      { kanji: '時', reading: 'じ (ji) / とき (toki)', meaning: 'Thời gian / Giờ', breakdownStory: 'Ghép từ 日 (Mặt trời = thời gian) + 寺 (Chùa). Ngày xưa người ta nhìn mặt trời và tiếng chuông chùa để biết giờ.' },
      { kanji: '休', reading: 'きゅう (kyuu) / やすむ (yasumu)', meaning: 'Nghỉ ngơi', breakdownStory: 'Ghép từ 人 (Con người) đứng tựa vào 木 (Gốc cây) dưới ánh mặt trời để "Nghỉ ngơi".' },
    ]
  },
  {
    id: 'getsu',
    symbol: '月',
    strokeCount: 4,
    reading: 'NGUYỆT / つき (tsuki) / ゲツ (getsu)',
    primaryMeaning: 'Mặt Trăng',
    secondaryMeanings: ['Tháng (thời gian)', 'Cơ thể / Thịt (khi làm bộ Nhục ⺜)'],
    category: 'nature',
    pictogramSymbol: '🌙',
    pictogramDesc: 'Hình dáng vầng trăng khuyết với hai vạch mây mờ che ngang.',
    explanation: 'Bộ Nguyệt tượng hình vầng trăng khuyết. Có 2 tầng nghĩa chính: Chỉ mặt trăng/tháng (thời gian) và khi đứng bên trái chữ Hán nó đóng vai trò bộ Nhục (⺜) đại diện cho các bộ phận cơ thể con người (như 胃 - dạ dày, 腹 - bụng).',
    mnemonicStory: 'Vầng trăng khuyết soi sáng bầu trời ban đêm.',
    derivedKanjis: [
      { kanji: '朝', reading: 'あさ (asa) / チョウ', meaning: 'Buổi sáng', breakdownStory: 'Có bộ 月 (Nguyệt) chỉ khoảnh khắc mặt trăng vừa lặn xuống nhường chỗ cho buổi sáng.' },
      { kanji: '服', reading: 'ふく (fuku)', meaning: 'Quần áo', breakdownStory: 'Có bộ 月 (Nhục - cơ thể), quần áo là thứ mặc lên cơ thể con người.' },
    ]
  },
  {
    id: 'moku',
    symbol: '木',
    strokeCount: 4,
    reading: 'MỘC / き (ki) / モク (moku)',
    primaryMeaning: 'Cây cối',
    secondaryMeanings: ['Gỗ / Đồ gỗ', 'Thứ Tám (Mộc star)'],
    category: 'nature',
    pictogramSymbol: '🌳',
    pictogramDesc: 'Hình ảnh thân cây đứng thẳng với cành lá xòe ra ở trên và rễ cây cắm sâu xuống đất ở dưới.',
    explanation: 'Bộ Mộc miêu tả một cái cây toàn vẹn: nét dọc là thân cây, nét ngang là cành, 2 nét phẩy mát là rễ cây. Xuất hiện trong hầu hết các từ chỉ thực vật, rừng rậm hoặc đồ dùng làm bằng gỗ.',
    mnemonicStory: 'Thân cây thẳng đứng, cành lá vươn lên, rễ cắm sâu xuống đất.',
    derivedKanjis: [
      { kanji: '林', reading: 'はやし (hayashi)', meaning: 'Rừng nhỏ (Lâm)', breakdownStory: 'Ghép từ 2 cây 木 + 木 đứng cạnh nhau tạo thành cánh rừng nhỏ.' },
      { kanji: '森', reading: 'もり (mori)', meaning: 'Rừng rậm (Sâm)', breakdownStory: 'Ghép từ 3 cây 木 + 木 + 木 chất chồng lên nhau tạo thành rừng rậm nguyên sinh.' },
      { kanji: '本', reading: 'ほん (hon)', meaning: 'Sách / Nguồn gốc (Bản)', breakdownStory: 'Thêm một gạch ngang ở gốc cây 木 để chỉ "Gốc rễ / Nguồn gốc". Chữ Hán của Sách.' },
    ]
  },
  {
    id: 'sui',
    symbol: '水',
    strokeCount: 4,
    reading: 'THỦY / みず (mizu) / スイ (sui)',
    primaryMeaning: 'Nước',
    secondaryMeanings: ['Chất lỏng', 'Thứ Tư (Thủy star)', 'Dòng chảy (khi biến thành bộ Ba Chấm Thủy 氵)'],
    category: 'nature',
    pictogramSymbol: '💧',
    pictogramDesc: 'Dòng nước chảy xiết ở giữa với các giọt nước bắn tung tóe xung quanh.',
    explanation: 'Bộ Thủy vẽ hình dòng nước chảy. Khi đứng độc lập viết là 水. Khi đứng bên trái chữ Hán biến thể thành **Bộ Ba Chấm Thủy (氵)** xuất hiện trong vô số từ liên quan đến nước và chất lỏng (như 海 - biển, 池 - ao, 洗 - rửa).',
    mnemonicStory: 'Dòng sông chảy chính giữa, hai bên là vô số giọt nước bắn tung.',
    derivedKanjis: [
      { kanji: '海', reading: 'うみ (umi) / カイ', meaning: 'Biển (Hải)', breakdownStory: 'Có bộ 氵 (Ba chấm thủy) chỉ vùng nước rộng lớn bao la.' },
      { kanji: '泳', reading: 'およぐ (oyogu) / エイ', meaning: 'Bơi lội (Vịnh)', breakdownStory: 'Có bộ 氵 (Nước), con người vận động trong nước là hành động Bơi.' },
    ]
  },
  {
    id: 'ka',
    symbol: '火',
    strokeCount: 4,
    reading: 'HỎA / ひ (hi) / カ (ka)',
    primaryMeaning: 'Ngọn Lửa',
    secondaryMeanings: ['Cháy / Nóng', 'Thứ Ba (Hỏa star)', 'Hỏa táng (bộ Bốn Đốm Lửa 灬 ở dưới)'],
    category: 'nature',
    pictogramSymbol: '🔥',
    pictogramDesc: 'Ngọn lửa bốc cháy bùng bùng với các tàn lửa bắn ra xung quanh.',
    explanation: 'Bộ Hỏa tượng hình ngọn lửa đang bốc cháy. Khi nằm bên dưới chữ Hán, nó biến đổi thành **Bộ Bốn Đốm Lửa (灬)** còn gọi là bộ Hỏa chấm (ví dụ: 点 - điểm, 魚 - cá nướng trên lửa).',
    mnemonicStory: 'Thanh củi bùng cháy ở giữa, hai bên tàn lửa đỏ rực bốc lên.',
    derivedKanjis: [
      { kanji: '炎', reading: 'ほのお (honoo)', meaning: 'Ngọn lửa lớn (Viêm)', breakdownStory: 'Ghép từ 2 ngọn lửa 火 + 火 xếp chồng lên nhau thành ngọn lửa bùng cháy dữ dội.' },
      { kanji: '秋', reading: 'あき (aki)', meaning: 'Mùa thu (Thu)', breakdownStory: 'Ghép từ 禾 (Lúa chín vàng) + 火 (Lửa đỏ mây thu).' },
    ]
  },
  {
    id: 'do',
    symbol: '土',
    strokeCount: 3,
    reading: 'THỔ / つち (tsuchi) / ド (do)',
    primaryMeaning: 'Đất mầm',
    secondaryMeanings: ['Thổ dưỡng / Đất đai', 'Thứ Bảy (Thổ star)', 'Địa điểm / Xây dựng'],
    category: 'nature',
    pictogramSymbol: '🌱',
    pictogramDesc: 'Mầm cây nhỏ nhú lên từ mặt đất nâu mỡ màu.',
    explanation: 'Bộ Thổ vẽ mầm cây mọc lên trên mặt đất. Nét ngang dưới là mặt đất, nét dọc và ngang trên là mầm cây. Liên quan đến đất đai, xây dựng, gạch đá.',
    mnemonicStory: 'Mặt đất ngang phía dưới, mầm cây chữ thập mọc vươn lên.',
    derivedKanjis: [
      { kanji: '地', reading: 'ち (chi) / じ (ji)', meaning: 'Trái đất / Đất đai (Địa)', breakdownStory: 'Có bộ 土 (Thổ) chỉ mặt đất chúng ta đang đi.' },
      { kanji: '城', reading: 'しろ (shiro) / ジョウ', meaning: 'Lâu đài / Tòa thành (Thành)', breakdownStory: 'Có bộ 土 (Thổ), thành lũy ngày xưa đắp bằng đất.' },
    ]
  },
  {
    id: 'jin',
    symbol: '人',
    strokeCount: 2,
    reading: 'NHÂN / ひと (hito) / ジン (jin)',
    primaryMeaning: 'Con Người',
    secondaryMeanings: ['Nhân loại', 'Người nước... (bộ Đứng 亻 bên trái)'],
    category: 'human',
    pictogramSymbol: '🧍',
    pictogramDesc: 'Hình ảnh con người đang bước đi với 2 chân sải bước vững chãi.',
    explanation: 'Bộ Nhân tượng hình người đứng nghiêng đang sải bước. Khi làm bộ bên trái chữ Hán biến thành **Bộ Nhân Đứng (亻)** (như 他 - người khác, 休 - nghỉ ngơi, 体 - cơ thể).',
    mnemonicStory: 'Hai chân người bước đi nghiêng nghiêng đứng vững.',
    derivedKanjis: [
      { kanji: '体', reading: 'からだ (karada) / タイ', meaning: 'Cơ thể (Thể)', breakdownStory: 'Có bộ 亻 (Nhân đứng) chỉ thân thể con người.' },
      { kanji: '作', reading: 'つくる (tsukuru) / サク', meaning: 'Chế tạo / Làm (Tác)', breakdownStory: 'Có bộ 亻 (Nhân đứng), con người dùng tay làm ra sản phẩm.' },
    ]
  },
  {
    id: 'kou',
    symbol: '口',
    strokeCount: 3,
    reading: 'KHẨU / くち (kuchi) / コウ (kou)',
    primaryMeaning: 'Cái Miệng',
    secondaryMeanings: ['Cổng / Cửa vào (bật/tắt)', 'Lời nói / Ngôn ngữ', 'Cửa khẩu'],
    category: 'human',
    pictogramSymbol: '👄',
    pictogramDesc: 'Hình ô vuông miêu tả cái miệng mở ra khi nói chuyện hoặc ăn uống.',
    explanation: 'Bộ Khẩu hình ô vuông tượng hình cái miệng mở. Xuất hiện trong các từ liên quan đến lời nói, ăn uống, kêu la hoặc cửa ra vào (入口 - lối vào, 出口 - lối ra).',
    mnemonicStory: 'Ô vuông hình cái miệng mở ra nói chuyện.',
    derivedKanjis: [
      { kanji: '言', reading: 'いう (iu) / ゲン', meaning: 'Nói (Ngôn)', breakdownStory: 'Bên dưới có bộ 口 (Khẩu - miệng phát ra lời nói).' },
      { kanji: '名', reading: 'な (na) / メイ', meaning: 'Tên tuổi (Danh)', breakdownStory: 'Ghép từ 夕 (Buổi tối) + 口 (Miệng). Ban đêm tối trời phải xướng tên bằng miệng để nhận ra nhau.' },
    ]
  },
  {
    id: 'jo',
    symbol: '女',
    strokeCount: 3,
    reading: 'NỮ / おんな (onna) / ジョ (jo)',
    primaryMeaning: 'Phụ Nữ',
    secondaryMeanings: ['Con gái / Con nữ', 'Vẻ đẹp / Quý phái'],
    category: 'human',
    pictogramSymbol: '👩',
    pictogramDesc: 'Hình ảnh người phụ nữ đang ngồi khoanh tay quỳ gối quý phái thời cổ đại.',
    explanation: 'Bộ Nữ miêu tả hình ảnh người phụ nữ. Xuất hiện trong các chữ chỉ phái nữ (好 - yêu thích, 妹 - em gái, 姉 - chị gái, 妻 - vợ).',
    mnemonicStory: 'Dáng người phụ nữ quỳ gối dịu dàng khéo léo.',
    derivedKanjis: [
      { kanji: '好', reading: 'すき (suki) / コウ', meaning: 'Yêu thích (Hảo)', breakdownStory: 'Ghép từ 女 (Phụ nữ/Mẹ) + 子 (Đứa con). Mẹ ôm con là hình ảnh vô cùng Đáng yêu & Yêu thích.' },
      { kanji: '安', reading: 'やすい (yasui) / アン', meaning: 'An toàn / Rẻ (An)', breakdownStory: 'Ghép từ 宀 (Mái nhà) + 女 (Phụ nữ). Phụ nữ ở trong nhà thì rất An toàn.' },
    ]
  },
  {
    id: 'yama',
    symbol: '山',
    strokeCount: 3,
    reading: 'SƠN / やま (yama) / サン (san)',
    primaryMeaning: 'Ngọn Núi',
    secondaryMeanings: ['Sơn hà / Phân núi', 'Cao lớn / Hùng vĩ'],
    category: 'nature',
    pictogramSymbol: '⛰️',
    pictogramDesc: 'Ba ngọn núi nhấp nhô với đỉnh núi cao nhất đứng chót vót ở giữa.',
    explanation: 'Bộ Sơn vẽ 3 đỉnh núi nhấp nhô. Nét giữa cao nhất đại diện ngọn núi chính, 2 nét hai bên là hai ngọn núi phụ.',
    mnemonicStory: 'Ba ngọn núi nhấp nhô, đỉnh giữa cao chót vót.',
    derivedKanjis: [
      { kanji: '岩', reading: 'いわ (iwa) / ガン', meaning: 'Hòn đá lớn / Nham thạch', breakdownStory: 'Ghép từ 山 (Núi) + 石 (Đá). Đá ở trên ngọn núi là Đá tảng lớn.' },
    ]
  },
];

// ══════════════════════════════════════════════════════
// 2. QUIZ CHƯƠNG 4
// ══════════════════════════════════════════════════════

export const RADICALS_CHAPTER_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Bộ thủ 日 (Nhật) tượng hình cho hình ảnh thực tế nào và có các tầng nghĩa nào?',
    audioText: '日',
    options: [
      'Ngọn núi 3 đỉnh — Nghĩa là Đất đai, Đá tảng',
      'Mặt trời — Nghĩa là Mặt trời, Ngày (thời gian) và Nhật Bản',
      'Dòng sông chảy — Nghĩa là Nước, Biển, Bơi lội',
      'Cái cây — Nghĩa là Gỗ, Rừng rậm'
    ],
    correctIndex: 1,
    explanation: 'Bộ 日 tượng hình Mặt trời chiếu sáng, mang các nghĩa: Mặt trời, Ngày và Nhật Bản.',
    targetTab: 'pictogram',
  },
  {
    id: 2,
    question: 'Chữ Hán "休" (Nghỉ ngơi) được ghép từ 2 bộ thủ nào?',
    audioText: '休',
    options: [
      '日 (Mặt trời) + 月 (Mặt trăng)',
      '人 (Con người) + 木 (Gốc cây)',
      '女 (Phụ nữ) + 子 (Đứa con)',
      '山 (Ngọn núi) + 石 (Hòn đá)'
    ],
    correctIndex: 1,
    explanation: 'Chữ 休 ghép từ 人 (Người) tựa vào 木 (Gốc cây) dưới bóng mát để Nghỉ ngơi.',
    targetTab: 'mnemonics',
  },
  {
    id: 3,
    question: 'Khi bộ Thủy (水 - Nước) đứng ở bên trái chữ Hán, nó biến đổi thành dạng bộ thủ nào?',
    audioText: '水',
    options: ['Bộ Nhân đứng (亻)', 'Bộ Ba chấm thủy (氵)', 'Bộ Bốn đốm lửa (灬)', 'Bộ Nhục (⺜)'],
    correctIndex: 1,
    explanation: 'Bộ Thủy đứng bên trái biến đổi thành Bộ Ba chấm thủy (氵) như trong 海 (biển), 泳 (bơi).',
    targetTab: 'pictogram',
  },
  {
    id: 4,
    question: 'Chữ "好" (Yêu thích) mang câu chuyện ghép bộ thủ nào vô cùng ý nghĩa?',
    audioText: '好',
    options: [
      'Hai cái cây đứng cạnh nhau thành rừng',
      'Người phụ nữ (女) bế đứa con (子) trên tay thể hiện tình yêu thương',
      'Mặt trời và mặt trăng cùng chiếu sáng',
      'Ba ngọn núi nhấp nhô hùng vĩ'
    ],
    correctIndex: 1,
    explanation: '好 ghép từ 女 (Mẹ) + 子 (Con), tình mẹ con là biểu tượng của sự Yêu thích & Đáng yêu.',
    targetTab: 'mnemonics',
  },
  {
    id: 5,
    question: 'Bộ thủ 口 (Khẩu) tượng hình ô vuông hình cái miệng. Nó xuất hiện trong từ nào chỉ lối ra vào?',
    audioText: '口',
    options: ['木 (Cây)', '入口 (Lối vào) / 出口 (Lối ra)', '日本 (Nhật Bản)', '休 (Nghỉ ngơi)'],
    correctIndex: 1,
    explanation: 'Bộ 口 (Khẩu) xuất hiện trong 入口 (Iriguchi - lối vào) và 出口 (Deguchi - lối ra).',
    targetTab: 'pictogram',
  },
];
