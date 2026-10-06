/**
 * kanaData.ts — Dữ liệu tĩnh toàn bộ bảng chữ cái Hiragana & Katakana
 * Tổ chức theo hàng (row) phục vụ chế độ Lesson.
 */

export interface KanaChar {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'seion' | 'dakuon' | 'handakuon' | 'yoon';
  row: string;
  strokeCount: number;
  exampleWord: string;
  exampleReading: string;
  exampleMeaning: string;
}

// ══════════════════════════════════════════════════════
// HIRAGANA — Âm trong (Seion) — 46 ký tự
// ══════════════════════════════════════════════════════

export const HIRAGANA_SEION: KanaChar[] = [
  // Hàng A (あ行)
  { char: 'あ', romaji: 'a',  type: 'hiragana', category: 'seion', row: 'a', strokeCount: 3, exampleWord: 'あめ', exampleReading: 'ame', exampleMeaning: 'Mưa' },
  { char: 'い', romaji: 'i',  type: 'hiragana', category: 'seion', row: 'a', strokeCount: 2, exampleWord: 'いぬ', exampleReading: 'inu', exampleMeaning: 'Con chó' },
  { char: 'う', romaji: 'u',  type: 'hiragana', category: 'seion', row: 'a', strokeCount: 2, exampleWord: 'うみ', exampleReading: 'umi', exampleMeaning: 'Biển' },
  { char: 'え', romaji: 'e',  type: 'hiragana', category: 'seion', row: 'a', strokeCount: 2, exampleWord: 'えき', exampleReading: 'eki', exampleMeaning: 'Ga tàu' },
  { char: 'お', romaji: 'o',  type: 'hiragana', category: 'seion', row: 'a', strokeCount: 3, exampleWord: 'おちゃ', exampleReading: 'ocha', exampleMeaning: 'Trà' },
  // Hàng KA (か行)
  { char: 'か', romaji: 'ka', type: 'hiragana', category: 'seion', row: 'ka', strokeCount: 3, exampleWord: 'かさ', exampleReading: 'kasa', exampleMeaning: 'Cái ô' },
  { char: 'き', romaji: 'ki', type: 'hiragana', category: 'seion', row: 'ka', strokeCount: 4, exampleWord: 'きって', exampleReading: 'kitte', exampleMeaning: 'Con tem' },
  { char: 'く', romaji: 'ku', type: 'hiragana', category: 'seion', row: 'ka', strokeCount: 1, exampleWord: 'くつ', exampleReading: 'kutsu', exampleMeaning: 'Giày' },
  { char: 'け', romaji: 'ke', type: 'hiragana', category: 'seion', row: 'ka', strokeCount: 3, exampleWord: 'けしゴム', exampleReading: 'keshigomu', exampleMeaning: 'Cục tẩy' },
  { char: 'こ', romaji: 'ko', type: 'hiragana', category: 'seion', row: 'ka', strokeCount: 2, exampleWord: 'こども', exampleReading: 'kodomo', exampleMeaning: 'Trẻ em' },
  // Hàng SA (さ行)
  { char: 'さ', romaji: 'sa', type: 'hiragana', category: 'seion', row: 'sa', strokeCount: 3, exampleWord: 'さくら', exampleReading: 'sakura', exampleMeaning: 'Hoa anh đào' },
  { char: 'し', romaji: 'shi', type: 'hiragana', category: 'seion', row: 'sa', strokeCount: 1, exampleWord: 'しお', exampleReading: 'shio', exampleMeaning: 'Muối' },
  { char: 'す', romaji: 'su', type: 'hiragana', category: 'seion', row: 'sa', strokeCount: 2, exampleWord: 'すし', exampleReading: 'sushi', exampleMeaning: 'Sushi' },
  { char: 'せ', romaji: 'se', type: 'hiragana', category: 'seion', row: 'sa', strokeCount: 3, exampleWord: 'せんせい', exampleReading: 'sensei', exampleMeaning: 'Giáo viên' },
  { char: 'そ', romaji: 'so', type: 'hiragana', category: 'seion', row: 'sa', strokeCount: 1, exampleWord: 'そら', exampleReading: 'sora', exampleMeaning: 'Bầu trời' },
  // Hàng TA (た行)
  { char: 'た', romaji: 'ta', type: 'hiragana', category: 'seion', row: 'ta', strokeCount: 4, exampleWord: 'たまご', exampleReading: 'tamago', exampleMeaning: 'Trứng' },
  { char: 'ち', romaji: 'chi', type: 'hiragana', category: 'seion', row: 'ta', strokeCount: 2, exampleWord: 'ちず', exampleReading: 'chizu', exampleMeaning: 'Bản đồ' },
  { char: 'つ', romaji: 'tsu', type: 'hiragana', category: 'seion', row: 'ta', strokeCount: 1, exampleWord: 'つき', exampleReading: 'tsuki', exampleMeaning: 'Mặt trăng' },
  { char: 'て', romaji: 'te', type: 'hiragana', category: 'seion', row: 'ta', strokeCount: 1, exampleWord: 'てがみ', exampleReading: 'tegami', exampleMeaning: 'Bức thư' },
  { char: 'と', romaji: 'to', type: 'hiragana', category: 'seion', row: 'ta', strokeCount: 2, exampleWord: 'とけい', exampleReading: 'tokei', exampleMeaning: 'Đồng hồ' },
  // Hàng NA (な行)
  { char: 'な', romaji: 'na', type: 'hiragana', category: 'seion', row: 'na', strokeCount: 4, exampleWord: 'なつ', exampleReading: 'natsu', exampleMeaning: 'Mùa hè' },
  { char: 'に', romaji: 'ni', type: 'hiragana', category: 'seion', row: 'na', strokeCount: 3, exampleWord: 'にほん', exampleReading: 'nihon', exampleMeaning: 'Nhật Bản' },
  { char: 'ぬ', romaji: 'nu', type: 'hiragana', category: 'seion', row: 'na', strokeCount: 2, exampleWord: 'ぬの', exampleReading: 'nuno', exampleMeaning: 'Vải' },
  { char: 'ね', romaji: 'ne', type: 'hiragana', category: 'seion', row: 'na', strokeCount: 2, exampleWord: 'ねこ', exampleReading: 'neko', exampleMeaning: 'Con mèo' },
  { char: 'の', romaji: 'no', type: 'hiragana', category: 'seion', row: 'na', strokeCount: 1, exampleWord: 'のり', exampleReading: 'nori', exampleMeaning: 'Rong biển' },
  // Hàng HA (は行)
  { char: 'は', romaji: 'ha', type: 'hiragana', category: 'seion', row: 'ha', strokeCount: 3, exampleWord: 'はな', exampleReading: 'hana', exampleMeaning: 'Hoa' },
  { char: 'ひ', romaji: 'hi', type: 'hiragana', category: 'seion', row: 'ha', strokeCount: 1, exampleWord: 'ひと', exampleReading: 'hito', exampleMeaning: 'Con người' },
  { char: 'ふ', romaji: 'fu', type: 'hiragana', category: 'seion', row: 'ha', strokeCount: 4, exampleWord: 'ふゆ', exampleReading: 'fuyu', exampleMeaning: 'Mùa đông' },
  { char: 'へ', romaji: 'he', type: 'hiragana', category: 'seion', row: 'ha', strokeCount: 1, exampleWord: 'へや', exampleReading: 'heya', exampleMeaning: 'Căn phòng' },
  { char: 'ほ', romaji: 'ho', type: 'hiragana', category: 'seion', row: 'ha', strokeCount: 4, exampleWord: 'ほし', exampleReading: 'hoshi', exampleMeaning: 'Ngôi sao' },
  // Hàng MA (ま行)
  { char: 'ま', romaji: 'ma', type: 'hiragana', category: 'seion', row: 'ma', strokeCount: 3, exampleWord: 'まど', exampleReading: 'mado', exampleMeaning: 'Cửa sổ' },
  { char: 'み', romaji: 'mi', type: 'hiragana', category: 'seion', row: 'ma', strokeCount: 2, exampleWord: 'みず', exampleReading: 'mizu', exampleMeaning: 'Nước' },
  { char: 'む', romaji: 'mu', type: 'hiragana', category: 'seion', row: 'ma', strokeCount: 3, exampleWord: 'むし', exampleReading: 'mushi', exampleMeaning: 'Côn trùng' },
  { char: 'め', romaji: 'me', type: 'hiragana', category: 'seion', row: 'ma', strokeCount: 2, exampleWord: 'めがね', exampleReading: 'megane', exampleMeaning: 'Kính mắt' },
  { char: 'も', romaji: 'mo', type: 'hiragana', category: 'seion', row: 'ma', strokeCount: 3, exampleWord: 'もの', exampleReading: 'mono', exampleMeaning: 'Đồ vật' },
  // Hàng YA (や行)
  { char: 'や', romaji: 'ya', type: 'hiragana', category: 'seion', row: 'ya', strokeCount: 3, exampleWord: 'やま', exampleReading: 'yama', exampleMeaning: 'Ngọn núi' },
  { char: 'ゆ', romaji: 'yu', type: 'hiragana', category: 'seion', row: 'ya', strokeCount: 2, exampleWord: 'ゆき', exampleReading: 'yuki', exampleMeaning: 'Tuyết' },
  { char: 'よ', romaji: 'yo', type: 'hiragana', category: 'seion', row: 'ya', strokeCount: 2, exampleWord: 'よる', exampleReading: 'yoru', exampleMeaning: 'Đêm' },
  // Hàng RA (ら行)
  { char: 'ら', romaji: 'ra', type: 'hiragana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'らいねん', exampleReading: 'rainen', exampleMeaning: 'Năm sau' },
  { char: 'り', romaji: 'ri', type: 'hiragana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'りんご', exampleReading: 'ringo', exampleMeaning: 'Quả táo' },
  { char: 'る', romaji: 'ru', type: 'hiragana', category: 'seion', row: 'ra', strokeCount: 1, exampleWord: 'るす', exampleReading: 'rusu', exampleMeaning: 'Vắng nhà' },
  { char: 'れ', romaji: 're', type: 'hiragana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'れきし', exampleReading: 'rekishi', exampleMeaning: 'Lịch sử' },
  { char: 'ろ', romaji: 'ro', type: 'hiragana', category: 'seion', row: 'ra', strokeCount: 1, exampleWord: 'ろく', exampleReading: 'roku', exampleMeaning: 'Số sáu' },
  // Hàng WA (わ行) + N
  { char: 'わ', romaji: 'wa', type: 'hiragana', category: 'seion', row: 'wa', strokeCount: 2, exampleWord: 'わたし', exampleReading: 'watashi', exampleMeaning: 'Tôi' },
  { char: 'を', romaji: 'wo', type: 'hiragana', category: 'seion', row: 'wa', strokeCount: 3, exampleWord: 'みずを', exampleReading: 'mizu wo', exampleMeaning: 'Nước (trợ từ)' },
  { char: 'ん', romaji: 'n',  type: 'hiragana', category: 'seion', row: 'wa', strokeCount: 1, exampleWord: 'にほん', exampleReading: 'nihon', exampleMeaning: 'Nhật Bản' },
];

// ══════════════════════════════════════════════════════
// HIRAGANA — Đắc âm (Dakuon) — 20 ký tự
// ══════════════════════════════════════════════════════

export const HIRAGANA_DAKUON: KanaChar[] = [
  // Hàng GA
  { char: 'が', romaji: 'ga', type: 'hiragana', category: 'dakuon', row: 'ga', strokeCount: 4, exampleWord: 'がっこう', exampleReading: 'gakkou', exampleMeaning: 'Trường học' },
  { char: 'ぎ', romaji: 'gi', type: 'hiragana', category: 'dakuon', row: 'ga', strokeCount: 5, exampleWord: 'ぎんこう', exampleReading: 'ginkou', exampleMeaning: 'Ngân hàng' },
  { char: 'ぐ', romaji: 'gu', type: 'hiragana', category: 'dakuon', row: 'ga', strokeCount: 2, exampleWord: 'ぐあい', exampleReading: 'guai', exampleMeaning: 'Tình trạng' },
  { char: 'げ', romaji: 'ge', type: 'hiragana', category: 'dakuon', row: 'ga', strokeCount: 4, exampleWord: 'げんき', exampleReading: 'genki', exampleMeaning: 'Khỏe mạnh' },
  { char: 'ご', romaji: 'go', type: 'hiragana', category: 'dakuon', row: 'ga', strokeCount: 3, exampleWord: 'ごはん', exampleReading: 'gohan', exampleMeaning: 'Cơm' },
  // Hàng ZA
  { char: 'ざ', romaji: 'za', type: 'hiragana', category: 'dakuon', row: 'za', strokeCount: 4, exampleWord: 'ざっし', exampleReading: 'zasshi', exampleMeaning: 'Tạp chí' },
  { char: 'じ', romaji: 'ji', type: 'hiragana', category: 'dakuon', row: 'za', strokeCount: 2, exampleWord: 'じかん', exampleReading: 'jikan', exampleMeaning: 'Thời gian' },
  { char: 'ず', romaji: 'zu', type: 'hiragana', category: 'dakuon', row: 'za', strokeCount: 3, exampleWord: 'すず', exampleReading: 'suzu', exampleMeaning: 'Chuông' },
  { char: 'ぜ', romaji: 'ze', type: 'hiragana', category: 'dakuon', row: 'za', strokeCount: 4, exampleWord: 'ぜんぶ', exampleReading: 'zenbu', exampleMeaning: 'Tất cả' },
  { char: 'ぞ', romaji: 'zo', type: 'hiragana', category: 'dakuon', row: 'za', strokeCount: 2, exampleWord: 'ぞう', exampleReading: 'zou', exampleMeaning: 'Con voi' },
  // Hàng DA
  { char: 'だ', romaji: 'da', type: 'hiragana', category: 'dakuon', row: 'da', strokeCount: 5, exampleWord: 'だいがく', exampleReading: 'daigaku', exampleMeaning: 'Đại học' },
  { char: 'ぢ', romaji: 'di', type: 'hiragana', category: 'dakuon', row: 'da', strokeCount: 3, exampleWord: 'はなぢ', exampleReading: 'hanadi', exampleMeaning: 'Chảy máu mũi' },
  { char: 'づ', romaji: 'du', type: 'hiragana', category: 'dakuon', row: 'da', strokeCount: 2, exampleWord: 'つづく', exampleReading: 'tsuduku', exampleMeaning: 'Tiếp tục' },
  { char: 'で', romaji: 'de', type: 'hiragana', category: 'dakuon', row: 'da', strokeCount: 2, exampleWord: 'でんわ', exampleReading: 'denwa', exampleMeaning: 'Điện thoại' },
  { char: 'ど', romaji: 'do', type: 'hiragana', category: 'dakuon', row: 'da', strokeCount: 3, exampleWord: 'どうぞ', exampleReading: 'douzo', exampleMeaning: 'Mời' },
  // Hàng BA
  { char: 'ば', romaji: 'ba', type: 'hiragana', category: 'dakuon', row: 'ba', strokeCount: 4, exampleWord: 'ばしょ', exampleReading: 'basho', exampleMeaning: 'Địa điểm' },
  { char: 'び', romaji: 'bi', type: 'hiragana', category: 'dakuon', row: 'ba', strokeCount: 2, exampleWord: 'びょういん', exampleReading: 'byouin', exampleMeaning: 'Bệnh viện' },
  { char: 'ぶ', romaji: 'bu', type: 'hiragana', category: 'dakuon', row: 'ba', strokeCount: 5, exampleWord: 'ぶんか', exampleReading: 'bunka', exampleMeaning: 'Văn hóa' },
  { char: 'べ', romaji: 'be', type: 'hiragana', category: 'dakuon', row: 'ba', strokeCount: 2, exampleWord: 'べんきょう', exampleReading: 'benkyou', exampleMeaning: 'Học tập' },
  { char: 'ぼ', romaji: 'bo', type: 'hiragana', category: 'dakuon', row: 'ba', strokeCount: 5, exampleWord: 'ぼうし', exampleReading: 'boushi', exampleMeaning: 'Cái mũ' },
];

// ══════════════════════════════════════════════════════
// HIRAGANA — Bán đục (Handakuon) — 5 ký tự
// ══════════════════════════════════════════════════════

export const HIRAGANA_HANDAKUON: KanaChar[] = [
  { char: 'ぱ', romaji: 'pa', type: 'hiragana', category: 'handakuon', row: 'pa', strokeCount: 4, exampleWord: 'ぱん', exampleReading: 'pan', exampleMeaning: 'Bánh mì' },
  { char: 'ぴ', romaji: 'pi', type: 'hiragana', category: 'handakuon', row: 'pa', strokeCount: 2, exampleWord: 'ぴかぴか', exampleReading: 'pikapika', exampleMeaning: 'Lấp lánh' },
  { char: 'ぷ', romaji: 'pu', type: 'hiragana', category: 'handakuon', row: 'pa', strokeCount: 5, exampleWord: 'ぷれぜんと', exampleReading: 'purezento', exampleMeaning: 'Quà tặng' },
  { char: 'ぺ', romaji: 'pe', type: 'hiragana', category: 'handakuon', row: 'pa', strokeCount: 2, exampleWord: 'ぺん', exampleReading: 'pen', exampleMeaning: 'Bút' },
  { char: 'ぽ', romaji: 'po', type: 'hiragana', category: 'handakuon', row: 'pa', strokeCount: 5, exampleWord: 'ぽけっと', exampleReading: 'poketto', exampleMeaning: 'Túi áo' },
];

// ══════════════════════════════════════════════════════
// HIRAGANA — Âm ghép (Yōon) — 33 ký tự
// ══════════════════════════════════════════════════════

export const HIRAGANA_YOON: KanaChar[] = [
  { char: 'きゃ', romaji: 'kya', type: 'hiragana', category: 'yoon', row: 'kya', strokeCount: 5, exampleWord: 'きゃく', exampleReading: 'kyaku', exampleMeaning: 'Khách' },
  { char: 'きゅ', romaji: 'kyu', type: 'hiragana', category: 'yoon', row: 'kya', strokeCount: 5, exampleWord: 'きゅうり', exampleReading: 'kyuuri', exampleMeaning: 'Dưa chuột' },
  { char: 'きょ', romaji: 'kyo', type: 'hiragana', category: 'yoon', row: 'kya', strokeCount: 5, exampleWord: 'きょう', exampleReading: 'kyou', exampleMeaning: 'Hôm nay' },
  { char: 'しゃ', romaji: 'sha', type: 'hiragana', category: 'yoon', row: 'sha', strokeCount: 2, exampleWord: 'しゃしん', exampleReading: 'shashin', exampleMeaning: 'Ảnh chụp' },
  { char: 'しゅ', romaji: 'shu', type: 'hiragana', category: 'yoon', row: 'sha', strokeCount: 2, exampleWord: 'しゅくだい', exampleReading: 'shukudai', exampleMeaning: 'Bài tập' },
  { char: 'しょ', romaji: 'sho', type: 'hiragana', category: 'yoon', row: 'sha', strokeCount: 2, exampleWord: 'しょうゆ', exampleReading: 'shouyu', exampleMeaning: 'Nước tương' },
  { char: 'ちゃ', romaji: 'cha', type: 'hiragana', category: 'yoon', row: 'cha', strokeCount: 3, exampleWord: 'おちゃ', exampleReading: 'ocha', exampleMeaning: 'Trà' },
  { char: 'ちゅ', romaji: 'chu', type: 'hiragana', category: 'yoon', row: 'cha', strokeCount: 3, exampleWord: 'ちゅうい', exampleReading: 'chuui', exampleMeaning: 'Chú ý' },
  { char: 'ちょ', romaji: 'cho', type: 'hiragana', category: 'yoon', row: 'cha', strokeCount: 3, exampleWord: 'ちょっと', exampleReading: 'chotto', exampleMeaning: 'Một chút' },
  { char: 'にゃ', romaji: 'nya', type: 'hiragana', category: 'yoon', row: 'nya', strokeCount: 4, exampleWord: 'にゃん', exampleReading: 'nyan', exampleMeaning: 'Meo meo' },
  { char: 'にゅ', romaji: 'nyu', type: 'hiragana', category: 'yoon', row: 'nya', strokeCount: 4, exampleWord: 'にゅういん', exampleReading: 'nyuuin', exampleMeaning: 'Nhập viện' },
  { char: 'にょ', romaji: 'nyo', type: 'hiragana', category: 'yoon', row: 'nya', strokeCount: 4, exampleWord: 'にょうぼう', exampleReading: 'nyoubou', exampleMeaning: 'Vợ' },
  { char: 'ひゃ', romaji: 'hya', type: 'hiragana', category: 'yoon', row: 'hya', strokeCount: 2, exampleWord: 'ひゃく', exampleReading: 'hyaku', exampleMeaning: 'Một trăm' },
  { char: 'ひゅ', romaji: 'hyu', type: 'hiragana', category: 'yoon', row: 'hya', strokeCount: 2, exampleWord: 'ひゅう', exampleReading: 'hyuu', exampleMeaning: 'Gió rít' },
  { char: 'ひょ', romaji: 'hyo', type: 'hiragana', category: 'yoon', row: 'hya', strokeCount: 2, exampleWord: 'ひょうばん', exampleReading: 'hyouban', exampleMeaning: 'Danh tiếng' },
  { char: 'みゃ', romaji: 'mya', type: 'hiragana', category: 'yoon', row: 'mya', strokeCount: 3, exampleWord: 'みゃく', exampleReading: 'myaku', exampleMeaning: 'Mạch' },
  { char: 'みゅ', romaji: 'myu', type: 'hiragana', category: 'yoon', row: 'mya', strokeCount: 3, exampleWord: 'みゅうじかる', exampleReading: 'myuujikaru', exampleMeaning: 'Nhạc kịch' },
  { char: 'みょ', romaji: 'myo', type: 'hiragana', category: 'yoon', row: 'mya', strokeCount: 3, exampleWord: 'みょうじ', exampleReading: 'myouji', exampleMeaning: 'Họ' },
  { char: 'りゃ', romaji: 'rya', type: 'hiragana', category: 'yoon', row: 'rya', strokeCount: 3, exampleWord: 'りゃく', exampleReading: 'ryaku', exampleMeaning: 'Lược bỏ' },
  { char: 'りゅ', romaji: 'ryu', type: 'hiragana', category: 'yoon', row: 'rya', strokeCount: 3, exampleWord: 'りゅう', exampleReading: 'ryuu', exampleMeaning: 'Rồng' },
  { char: 'りょ', romaji: 'ryo', type: 'hiragana', category: 'yoon', row: 'rya', strokeCount: 3, exampleWord: 'りょこう', exampleReading: 'ryokou', exampleMeaning: 'Du lịch' },
  { char: 'ぎゃ', romaji: 'gya', type: 'hiragana', category: 'yoon', row: 'gya', strokeCount: 6, exampleWord: 'ぎゃく', exampleReading: 'gyaku', exampleMeaning: 'Ngược lại' },
  { char: 'ぎゅ', romaji: 'gyu', type: 'hiragana', category: 'yoon', row: 'gya', strokeCount: 6, exampleWord: 'ぎゅうにゅう', exampleReading: 'gyuunyuu', exampleMeaning: 'Sữa bò' },
  { char: 'ぎょ', romaji: 'gyo', type: 'hiragana', category: 'yoon', row: 'gya', strokeCount: 6, exampleWord: 'ぎょうざ', exampleReading: 'gyouza', exampleMeaning: 'Há cảo' },
  { char: 'じゃ', romaji: 'ja', type: 'hiragana', category: 'yoon', row: 'ja', strokeCount: 3, exampleWord: 'じゃがいも', exampleReading: 'jagaimo', exampleMeaning: 'Khoai tây' },
  { char: 'じゅ', romaji: 'ju', type: 'hiragana', category: 'yoon', row: 'ja', strokeCount: 3, exampleWord: 'じゅうしょ', exampleReading: 'juusho', exampleMeaning: 'Địa chỉ' },
  { char: 'じょ', romaji: 'jo', type: 'hiragana', category: 'yoon', row: 'ja', strokeCount: 3, exampleWord: 'じょうず', exampleReading: 'jouzu', exampleMeaning: 'Giỏi' },
  { char: 'びゃ', romaji: 'bya', type: 'hiragana', category: 'yoon', row: 'bya', strokeCount: 3, exampleWord: 'びゃく', exampleReading: 'byaku', exampleMeaning: 'Trắng' },
  { char: 'びゅ', romaji: 'byu', type: 'hiragana', category: 'yoon', row: 'bya', strokeCount: 3, exampleWord: 'びゅう', exampleReading: 'byuu', exampleMeaning: 'View' },
  { char: 'びょ', romaji: 'byo', type: 'hiragana', category: 'yoon', row: 'bya', strokeCount: 3, exampleWord: 'びょういん', exampleReading: 'byouin', exampleMeaning: 'Bệnh viện' },
  { char: 'ぴゃ', romaji: 'pya', type: 'hiragana', category: 'yoon', row: 'pya', strokeCount: 3, exampleWord: 'ぴゃっ', exampleReading: 'pyaQ', exampleMeaning: 'Bắn nhanh' },
  { char: 'ぴゅ', romaji: 'pyu', type: 'hiragana', category: 'yoon', row: 'pya', strokeCount: 3, exampleWord: 'ぴゅうぴゅう', exampleReading: 'pyuupyuu', exampleMeaning: 'Gió hú' },
  { char: 'ぴょ', romaji: 'pyo', type: 'hiragana', category: 'yoon', row: 'pya', strokeCount: 3, exampleWord: 'ぴょん', exampleReading: 'pyon', exampleMeaning: 'Nhảy' },
];

// ══════════════════════════════════════════════════════
// KATAKANA — Âm trong (Seion) — 46 ký tự
// ══════════════════════════════════════════════════════

export const KATAKANA_SEION: KanaChar[] = [
  // Hàng A
  { char: 'ア', romaji: 'a',  type: 'katakana', category: 'seion', row: 'a', strokeCount: 2, exampleWord: 'アメリカ', exampleReading: 'amerika', exampleMeaning: 'Nước Mỹ' },
  { char: 'イ', romaji: 'i',  type: 'katakana', category: 'seion', row: 'a', strokeCount: 2, exampleWord: 'インド', exampleReading: 'indo', exampleMeaning: 'Ấn Độ' },
  { char: 'ウ', romaji: 'u',  type: 'katakana', category: 'seion', row: 'a', strokeCount: 3, exampleWord: 'ウイルス', exampleReading: 'uirusu', exampleMeaning: 'Virus' },
  { char: 'エ', romaji: 'e',  type: 'katakana', category: 'seion', row: 'a', strokeCount: 3, exampleWord: 'エレベーター', exampleReading: 'erebeetaa', exampleMeaning: 'Thang máy' },
  { char: 'オ', romaji: 'o',  type: 'katakana', category: 'seion', row: 'a', strokeCount: 3, exampleWord: 'オレンジ', exampleReading: 'orenji', exampleMeaning: 'Cam' },
  // Hàng KA
  { char: 'カ', romaji: 'ka', type: 'katakana', category: 'seion', row: 'ka', strokeCount: 2, exampleWord: 'カメラ', exampleReading: 'kamera', exampleMeaning: 'Máy ảnh' },
  { char: 'キ', romaji: 'ki', type: 'katakana', category: 'seion', row: 'ka', strokeCount: 3, exampleWord: 'キッチン', exampleReading: 'kicchin', exampleMeaning: 'Nhà bếp' },
  { char: 'ク', romaji: 'ku', type: 'katakana', category: 'seion', row: 'ka', strokeCount: 2, exampleWord: 'クラス', exampleReading: 'kurasu', exampleMeaning: 'Lớp học' },
  { char: 'ケ', romaji: 'ke', type: 'katakana', category: 'seion', row: 'ka', strokeCount: 3, exampleWord: 'ケーキ', exampleReading: 'keeki', exampleMeaning: 'Bánh ngọt' },
  { char: 'コ', romaji: 'ko', type: 'katakana', category: 'seion', row: 'ka', strokeCount: 2, exampleWord: 'コーヒー', exampleReading: 'koohii', exampleMeaning: 'Cà phê' },
  // Hàng SA
  { char: 'サ', romaji: 'sa', type: 'katakana', category: 'seion', row: 'sa', strokeCount: 3, exampleWord: 'サッカー', exampleReading: 'sakkaa', exampleMeaning: 'Bóng đá' },
  { char: 'シ', romaji: 'shi', type: 'katakana', category: 'seion', row: 'sa', strokeCount: 3, exampleWord: 'システム', exampleReading: 'shisutemu', exampleMeaning: 'Hệ thống' },
  { char: 'ス', romaji: 'su', type: 'katakana', category: 'seion', row: 'sa', strokeCount: 2, exampleWord: 'スポーツ', exampleReading: 'supootsu', exampleMeaning: 'Thể thao' },
  { char: 'セ', romaji: 'se', type: 'katakana', category: 'seion', row: 'sa', strokeCount: 2, exampleWord: 'セーター', exampleReading: 'seetaa', exampleMeaning: 'Áo len' },
  { char: 'ソ', romaji: 'so', type: 'katakana', category: 'seion', row: 'sa', strokeCount: 2, exampleWord: 'ソフト', exampleReading: 'sofuto', exampleMeaning: 'Phần mềm' },
  // Hàng TA
  { char: 'タ', romaji: 'ta', type: 'katakana', category: 'seion', row: 'ta', strokeCount: 3, exampleWord: 'タクシー', exampleReading: 'takushii', exampleMeaning: 'Taxi' },
  { char: 'チ', romaji: 'chi', type: 'katakana', category: 'seion', row: 'ta', strokeCount: 3, exampleWord: 'チョコレート', exampleReading: 'chokoreeto', exampleMeaning: 'Sô-cô-la' },
  { char: 'ツ', romaji: 'tsu', type: 'katakana', category: 'seion', row: 'ta', strokeCount: 3, exampleWord: 'ツアー', exampleReading: 'tsuaa', exampleMeaning: 'Tour du lịch' },
  { char: 'テ', romaji: 'te', type: 'katakana', category: 'seion', row: 'ta', strokeCount: 3, exampleWord: 'テレビ', exampleReading: 'terebi', exampleMeaning: 'Ti vi' },
  { char: 'ト', romaji: 'to', type: 'katakana', category: 'seion', row: 'ta', strokeCount: 2, exampleWord: 'トイレ', exampleReading: 'toire', exampleMeaning: 'Nhà vệ sinh' },
  // Hàng NA
  { char: 'ナ', romaji: 'na', type: 'katakana', category: 'seion', row: 'na', strokeCount: 2, exampleWord: 'ナイフ', exampleReading: 'naifu', exampleMeaning: 'Dao' },
  { char: 'ニ', romaji: 'ni', type: 'katakana', category: 'seion', row: 'na', strokeCount: 2, exampleWord: 'ニュース', exampleReading: 'nyuusu', exampleMeaning: 'Tin tức' },
  { char: 'ヌ', romaji: 'nu', type: 'katakana', category: 'seion', row: 'na', strokeCount: 2, exampleWord: 'ヌードル', exampleReading: 'nuudoru', exampleMeaning: 'Mì' },
  { char: 'ネ', romaji: 'ne', type: 'katakana', category: 'seion', row: 'na', strokeCount: 4, exampleWord: 'ネクタイ', exampleReading: 'nekutai', exampleMeaning: 'Cà vạt' },
  { char: 'ノ', romaji: 'no', type: 'katakana', category: 'seion', row: 'na', strokeCount: 1, exampleWord: 'ノート', exampleReading: 'nooto', exampleMeaning: 'Vở' },
  // Hàng HA
  { char: 'ハ', romaji: 'ha', type: 'katakana', category: 'seion', row: 'ha', strokeCount: 2, exampleWord: 'ハンバーガー', exampleReading: 'hanbaagaa', exampleMeaning: 'Hamburger' },
  { char: 'ヒ', romaji: 'hi', type: 'katakana', category: 'seion', row: 'ha', strokeCount: 2, exampleWord: 'ヒーロー', exampleReading: 'hiiroo', exampleMeaning: 'Anh hùng' },
  { char: 'フ', romaji: 'fu', type: 'katakana', category: 'seion', row: 'ha', strokeCount: 1, exampleWord: 'フランス', exampleReading: 'furansu', exampleMeaning: 'Nước Pháp' },
  { char: 'ヘ', romaji: 'he', type: 'katakana', category: 'seion', row: 'ha', strokeCount: 1, exampleWord: 'ヘリコプター', exampleReading: 'herikopoutaa', exampleMeaning: 'Trực thăng' },
  { char: 'ホ', romaji: 'ho', type: 'katakana', category: 'seion', row: 'ha', strokeCount: 4, exampleWord: 'ホテル', exampleReading: 'hoteru', exampleMeaning: 'Khách sạn' },
  // Hàng MA
  { char: 'マ', romaji: 'ma', type: 'katakana', category: 'seion', row: 'ma', strokeCount: 2, exampleWord: 'マンガ', exampleReading: 'manga', exampleMeaning: 'Truyện tranh' },
  { char: 'ミ', romaji: 'mi', type: 'katakana', category: 'seion', row: 'ma', strokeCount: 3, exampleWord: 'ミルク', exampleReading: 'miruku', exampleMeaning: 'Sữa' },
  { char: 'ム', romaji: 'mu', type: 'katakana', category: 'seion', row: 'ma', strokeCount: 2, exampleWord: 'ムービー', exampleReading: 'muubii', exampleMeaning: 'Phim' },
  { char: 'メ', romaji: 'me', type: 'katakana', category: 'seion', row: 'ma', strokeCount: 2, exampleWord: 'メニュー', exampleReading: 'menyuu', exampleMeaning: 'Thực đơn' },
  { char: 'モ', romaji: 'mo', type: 'katakana', category: 'seion', row: 'ma', strokeCount: 3, exampleWord: 'モバイル', exampleReading: 'mobairu', exampleMeaning: 'Di động' },
  // Hàng YA
  { char: 'ヤ', romaji: 'ya', type: 'katakana', category: 'seion', row: 'ya', strokeCount: 2, exampleWord: 'ヤクルト', exampleReading: 'yakuruto', exampleMeaning: 'Yakult' },
  { char: 'ユ', romaji: 'yu', type: 'katakana', category: 'seion', row: 'ya', strokeCount: 2, exampleWord: 'ユーチューブ', exampleReading: 'yuuchuubu', exampleMeaning: 'YouTube' },
  { char: 'ヨ', romaji: 'yo', type: 'katakana', category: 'seion', row: 'ya', strokeCount: 3, exampleWord: 'ヨーロッパ', exampleReading: 'yooroppa', exampleMeaning: 'Châu Âu' },
  // Hàng RA
  { char: 'ラ', romaji: 'ra', type: 'katakana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'ラーメン', exampleReading: 'raamen', exampleMeaning: 'Mì ramen' },
  { char: 'リ', romaji: 'ri', type: 'katakana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'リモコン', exampleReading: 'rimokon', exampleMeaning: 'Điều khiển' },
  { char: 'ル', romaji: 'ru', type: 'katakana', category: 'seion', row: 'ra', strokeCount: 2, exampleWord: 'ルール', exampleReading: 'ruuru', exampleMeaning: 'Luật lệ' },
  { char: 'レ', romaji: 're', type: 'katakana', category: 'seion', row: 'ra', strokeCount: 1, exampleWord: 'レストラン', exampleReading: 'resutoran', exampleMeaning: 'Nhà hàng' },
  { char: 'ロ', romaji: 'ro', type: 'katakana', category: 'seion', row: 'ra', strokeCount: 3, exampleWord: 'ロボット', exampleReading: 'robotto', exampleMeaning: 'Robot' },
  // Hàng WA + N
  { char: 'ワ', romaji: 'wa', type: 'katakana', category: 'seion', row: 'wa', strokeCount: 2, exampleWord: 'ワイン', exampleReading: 'wain', exampleMeaning: 'Rượu vang' },
  { char: 'ヲ', romaji: 'wo', type: 'katakana', category: 'seion', row: 'wa', strokeCount: 3, exampleWord: 'ヲタク', exampleReading: 'wotaku', exampleMeaning: 'Otaku' },
  { char: 'ン', romaji: 'n',  type: 'katakana', category: 'seion', row: 'wa', strokeCount: 2, exampleWord: 'パン', exampleReading: 'pan', exampleMeaning: 'Bánh mì' },
];

// ══════════════════════════════════════════════════════
// KATAKANA — Đắc âm (Dakuon) — 20 ký tự
// ══════════════════════════════════════════════════════

export const KATAKANA_DAKUON: KanaChar[] = [
  { char: 'ガ', romaji: 'ga', type: 'katakana', category: 'dakuon', row: 'ga', strokeCount: 3, exampleWord: 'ガス', exampleReading: 'gasu', exampleMeaning: 'Gas' },
  { char: 'ギ', romaji: 'gi', type: 'katakana', category: 'dakuon', row: 'ga', strokeCount: 4, exampleWord: 'ギター', exampleReading: 'gitaa', exampleMeaning: 'Guitar' },
  { char: 'グ', romaji: 'gu', type: 'katakana', category: 'dakuon', row: 'ga', strokeCount: 3, exampleWord: 'グループ', exampleReading: 'guruupu', exampleMeaning: 'Nhóm' },
  { char: 'ゲ', romaji: 'ge', type: 'katakana', category: 'dakuon', row: 'ga', strokeCount: 4, exampleWord: 'ゲーム', exampleReading: 'geemu', exampleMeaning: 'Trò chơi' },
  { char: 'ゴ', romaji: 'go', type: 'katakana', category: 'dakuon', row: 'ga', strokeCount: 3, exampleWord: 'ゴルフ', exampleReading: 'gorufu', exampleMeaning: 'Golf' },
  { char: 'ザ', romaji: 'za', type: 'katakana', category: 'dakuon', row: 'za', strokeCount: 4, exampleWord: 'ザック', exampleReading: 'zakku', exampleMeaning: 'Ba lô' },
  { char: 'ジ', romaji: 'ji', type: 'katakana', category: 'dakuon', row: 'za', strokeCount: 4, exampleWord: 'ジュース', exampleReading: 'juusu', exampleMeaning: 'Nước ép' },
  { char: 'ズ', romaji: 'zu', type: 'katakana', category: 'dakuon', row: 'za', strokeCount: 3, exampleWord: 'ズボン', exampleReading: 'zubon', exampleMeaning: 'Quần dài' },
  { char: 'ゼ', romaji: 'ze', type: 'katakana', category: 'dakuon', row: 'za', strokeCount: 3, exampleWord: 'ゼリー', exampleReading: 'zerii', exampleMeaning: 'Thạch' },
  { char: 'ゾ', romaji: 'zo', type: 'katakana', category: 'dakuon', row: 'za', strokeCount: 3, exampleWord: 'ゾーン', exampleReading: 'zoon', exampleMeaning: 'Khu vực' },
  { char: 'ダ', romaji: 'da', type: 'katakana', category: 'dakuon', row: 'da', strokeCount: 4, exampleWord: 'ダンス', exampleReading: 'dansu', exampleMeaning: 'Nhảy' },
  { char: 'ヂ', romaji: 'di', type: 'katakana', category: 'dakuon', row: 'da', strokeCount: 4, exampleWord: 'ヂスク', exampleReading: 'disuku', exampleMeaning: 'Đĩa' },
  { char: 'ヅ', romaji: 'du', type: 'katakana', category: 'dakuon', row: 'da', strokeCount: 4, exampleWord: 'ヅラ', exampleReading: 'dura', exampleMeaning: 'Tóc giả' },
  { char: 'デ', romaji: 'de', type: 'katakana', category: 'dakuon', row: 'da', strokeCount: 4, exampleWord: 'デパート', exampleReading: 'depaato', exampleMeaning: 'Cửa hàng bách hóa' },
  { char: 'ド', romaji: 'do', type: 'katakana', category: 'dakuon', row: 'da', strokeCount: 3, exampleWord: 'ドア', exampleReading: 'doa', exampleMeaning: 'Cửa' },
  { char: 'バ', romaji: 'ba', type: 'katakana', category: 'dakuon', row: 'ba', strokeCount: 3, exampleWord: 'バス', exampleReading: 'basu', exampleMeaning: 'Xe buýt' },
  { char: 'ビ', romaji: 'bi', type: 'katakana', category: 'dakuon', row: 'ba', strokeCount: 3, exampleWord: 'ビール', exampleReading: 'biiru', exampleMeaning: 'Bia' },
  { char: 'ブ', romaji: 'bu', type: 'katakana', category: 'dakuon', row: 'ba', strokeCount: 2, exampleWord: 'ブログ', exampleReading: 'burogu', exampleMeaning: 'Blog' },
  { char: 'ベ', romaji: 'be', type: 'katakana', category: 'dakuon', row: 'ba', strokeCount: 2, exampleWord: 'ベッド', exampleReading: 'beddo', exampleMeaning: 'Giường' },
  { char: 'ボ', romaji: 'bo', type: 'katakana', category: 'dakuon', row: 'ba', strokeCount: 5, exampleWord: 'ボタン', exampleReading: 'botan', exampleMeaning: 'Nút bấm' },
];

// ══════════════════════════════════════════════════════
// KATAKANA — Bán đục (Handakuon) — 5 ký tự
// ══════════════════════════════════════════════════════

export const KATAKANA_HANDAKUON: KanaChar[] = [
  { char: 'パ', romaji: 'pa', type: 'katakana', category: 'handakuon', row: 'pa', strokeCount: 3, exampleWord: 'パーティー', exampleReading: 'paatii', exampleMeaning: 'Tiệc' },
  { char: 'ピ', romaji: 'pi', type: 'katakana', category: 'handakuon', row: 'pa', strokeCount: 3, exampleWord: 'ピアノ', exampleReading: 'piano', exampleMeaning: 'Đàn piano' },
  { char: 'プ', romaji: 'pu', type: 'katakana', category: 'handakuon', row: 'pa', strokeCount: 2, exampleWord: 'プール', exampleReading: 'puuru', exampleMeaning: 'Hồ bơi' },
  { char: 'ペ', romaji: 'pe', type: 'katakana', category: 'handakuon', row: 'pa', strokeCount: 2, exampleWord: 'ペット', exampleReading: 'petto', exampleMeaning: 'Thú cưng' },
  { char: 'ポ', romaji: 'po', type: 'katakana', category: 'handakuon', row: 'pa', strokeCount: 5, exampleWord: 'ポスト', exampleReading: 'posuto', exampleMeaning: 'Hòm thư' },
];

// ══════════════════════════════════════════════════════
// KATAKANA — Âm ghép (Yōon) — 33 ký tự
// ══════════════════════════════════════════════════════

export const KATAKANA_YOON: KanaChar[] = [
  { char: 'キャ', romaji: 'kya', type: 'katakana', category: 'yoon', row: 'kya', strokeCount: 4, exampleWord: 'キャンプ', exampleReading: 'kyanpu', exampleMeaning: 'Cắm trại' },
  { char: 'キュ', romaji: 'kyu', type: 'katakana', category: 'yoon', row: 'kya', strokeCount: 4, exampleWord: 'キューブ', exampleReading: 'kyuubu', exampleMeaning: 'Khối lập phương' },
  { char: 'キョ', romaji: 'kyo', type: 'katakana', category: 'yoon', row: 'kya', strokeCount: 4, exampleWord: 'キロ', exampleReading: 'kiro', exampleMeaning: 'Kilomet' },
  { char: 'シャ', romaji: 'sha', type: 'katakana', category: 'yoon', row: 'sha', strokeCount: 4, exampleWord: 'シャツ', exampleReading: 'shatsu', exampleMeaning: 'Áo sơ mi' },
  { char: 'シュ', romaji: 'shu', type: 'katakana', category: 'yoon', row: 'sha', strokeCount: 4, exampleWord: 'シュークリーム', exampleReading: 'shuukuriimu', exampleMeaning: 'Bánh su kem' },
  { char: 'ショ', romaji: 'sho', type: 'katakana', category: 'yoon', row: 'sha', strokeCount: 4, exampleWord: 'シャンプー', exampleReading: 'shanpuu', exampleMeaning: 'Dầu gội' },
  { char: 'チャ', romaji: 'cha', type: 'katakana', category: 'yoon', row: 'cha', strokeCount: 4, exampleWord: 'チャンス', exampleReading: 'chansu', exampleMeaning: 'Cơ hội' },
  { char: 'チュ', romaji: 'chu', type: 'katakana', category: 'yoon', row: 'cha', strokeCount: 4, exampleWord: 'チューリップ', exampleReading: 'chuurippu', exampleMeaning: 'Hoa tulip' },
  { char: 'チョ', romaji: 'cho', type: 'katakana', category: 'yoon', row: 'cha', strokeCount: 4, exampleWord: 'チョコレート', exampleReading: 'chokoreeto', exampleMeaning: 'Sô-cô-la' },
  { char: 'ニャ', romaji: 'nya', type: 'katakana', category: 'yoon', row: 'nya', strokeCount: 3, exampleWord: 'ニャー', exampleReading: 'nyaa', exampleMeaning: 'Tiếng mèo kêu' },
  { char: 'ニュ', romaji: 'nyu', type: 'katakana', category: 'yoon', row: 'nya', strokeCount: 3, exampleWord: 'ニュース', exampleReading: 'nyuusu', exampleMeaning: 'Tin tức' },
  { char: 'ニョ', romaji: 'nyo', type: 'katakana', category: 'yoon', row: 'nya', strokeCount: 4, exampleWord: 'ニョッキ', exampleReading: 'nyokki', exampleMeaning: 'Món Gnocchi' },
  { char: 'ヒャ', romaji: 'hya', type: 'katakana', category: 'yoon', row: 'hya', strokeCount: 3, exampleWord: 'ヒャッハー', exampleReading: 'hyahhaa', exampleMeaning: 'Tiếng reo hò' },
  { char: 'ヒュ', romaji: 'hyu', type: 'katakana', category: 'yoon', row: 'hya', strokeCount: 3, exampleWord: 'ヒューズ', exampleReading: 'hyuuzu', exampleMeaning: 'Cầu chì' },
  { char: 'ヒョ', romaji: 'hyo', type: 'katakana', category: 'yoon', row: 'hya', strokeCount: 4, exampleWord: 'ヒョウ', exampleReading: 'hyou', exampleMeaning: 'Báo đốm' },
  { char: 'ミャ', romaji: 'mya', type: 'katakana', category: 'yoon', row: 'mya', strokeCount: 3, exampleWord: 'ミャンマー', exampleReading: 'myanmaa', exampleMeaning: 'Myanmar' },
  { char: 'ミュ', romaji: 'myu', type: 'katakana', category: 'yoon', row: 'mya', strokeCount: 3, exampleWord: 'ミュージアム', exampleReading: 'myuujiamu', exampleMeaning: 'Bảo tàng' },
  { char: 'ミョ', romaji: 'myo', type: 'katakana', category: 'yoon', row: 'mya', strokeCount: 4, exampleWord: 'ミョウバン', exampleReading: 'myouban', exampleMeaning: 'Phèn chua' },
  { char: 'リャ', romaji: 'rya', type: 'katakana', category: 'yoon', row: 'rya', strokeCount: 3, exampleWord: 'リャマ', exampleReading: 'ryama', exampleMeaning: 'Lạc đà không bướu' },
  { char: 'リュ', romaji: 'ryu', type: 'katakana', category: 'yoon', row: 'rya', strokeCount: 3, exampleWord: 'リュック', exampleReading: 'ryukku', exampleMeaning: 'Ba lô' },
  { char: 'リョ', romaji: 'ryo', type: 'katakana', category: 'yoon', row: 'rya', strokeCount: 4, exampleWord: 'リョーマ', exampleReading: 'ryooma', exampleMeaning: 'Tên Ryoma' },
  { char: 'ギャ', romaji: 'gya', type: 'katakana', category: 'yoon', row: 'gya', strokeCount: 4, exampleWord: 'ギャング', exampleReading: 'gyangu', exampleMeaning: 'Băng đảng' },
  { char: 'ギュ', romaji: 'gyu', type: 'katakana', category: 'yoon', row: 'gya', strokeCount: 4, exampleWord: 'ギュー', exampleReading: 'gyuu', exampleMeaning: 'Ôm chặt' },
  { char: 'ギョ', romaji: 'gyo', type: 'katakana', category: 'yoon', row: 'gya', strokeCount: 4, exampleWord: 'ギョーザ', exampleReading: 'gyooza', exampleMeaning: 'Há cảo' },
  { char: 'ジャ', romaji: 'ja', type: 'katakana', category: 'yoon', row: 'ja', strokeCount: 4, exampleWord: 'ジャケット', exampleReading: 'jaketto', exampleMeaning: 'Áo khoác' },
  { char: 'ジュ', romaji: 'ju', type: 'katakana', category: 'yoon', row: 'ja', strokeCount: 4, exampleWord: 'ジュース', exampleReading: 'juusu', exampleMeaning: 'Nước trái cây' },
  { char: 'ジョ', romaji: 'jo', type: 'katakana', category: 'yoon', row: 'ja', strokeCount: 4, exampleWord: 'ジョギング', exampleReading: 'jogingu', exampleMeaning: 'Chạy bộ' },
  { char: 'ビャ', romaji: 'bya', type: 'katakana', category: 'yoon', row: 'bya', strokeCount: 4, exampleWord: 'ビャクシン', exampleReading: 'byakushin', exampleMeaning: 'Cây tùng cối' },
  { char: 'ビュ', romaji: 'byu', type: 'katakana', category: 'yoon', row: 'bya', strokeCount: 4, exampleWord: 'ビュッフェ', exampleReading: 'byuffe', exampleMeaning: 'Tiệc buffet' },
  { char: 'ビョ', romaji: 'byo', type: 'katakana', category: 'yoon', row: 'bya', strokeCount: 5, exampleWord: 'ビョーク', exampleReading: 'byooku', exampleMeaning: 'Bjork' },
  { char: 'ピャ', romaji: 'pya', type: 'katakana', category: 'yoon', row: 'pya', strokeCount: 4, exampleWord: 'ピャー', exampleReading: 'pyaa', exampleMeaning: 'Tiếng kêu' },
  { char: 'ピュ', romaji: 'pyu', type: 'katakana', category: 'yoon', row: 'pya', strokeCount: 4, exampleWord: 'ピューレ', exampleReading: 'pyuure', exampleMeaning: 'Nước sốt nhuyễn' },
  { char: 'ピョ', romaji: 'pyo', type: 'katakana', category: 'yoon', row: 'pya', strokeCount: 5, exampleWord: 'ピョコピョコ', exampleReading: 'pyokopyoko', exampleMeaning: 'Lách chách' },
];

// ══════════════════════════════════════════════════════
// QUY TẮC ÂM ĐỌC MỞ RỘNG (Sokuon, Chōon, Hatsuon)
// ══════════════════════════════════════════════════════

export interface SoundRuleExample {
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  kanaType: 'hiragana' | 'katakana';
  contrastWith?: {
    word: string;
    reading: string;
    romaji: string;
    meaning: string;
  };
}

export interface SoundRule {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  formula: string;
  notes: string[];
  examples: SoundRuleExample[];
}

export const EXTENDED_SOUND_RULES: SoundRule[] = [
  {
    id: 'sokuon',
    name: '促音 (Âm Ngắt)',
    subtitle: 'Chữ っ (Hiragana) và ッ (Katakana) nhỏ',
    badge: 'っ / ッ',
    description: 'Âm ngắt được biểu thị bằng chữ tsu nhỏ (っ / ッ). Khi phát âm, ta ngắt luồng hơi khoảng 1 nhịp (1 phách) và gấp đôi phụ âm đứng ngay sau nó (k, s, t, p).',
    formula: 'Chữ cái + っ / ッ + Phụ âm (k, s, t, p) → Gấp đôi phụ âm',
    notes: [
      'っ / ッ nhỏ chỉ bằng khoảng 1/2 kích thước chữ bình thường.',
      'Chiếm độ dài đúng 1 phách phát âm (mora) dù không phát ra tiếng.',
      'Phát âm tương phản: "kite" (hãy đến) khác hoàn toàn "kitte" (con tem)!'
    ],
    examples: [
      {
        word: 'きって',
        reading: 'きって',
        romaji: 'kitte',
        meaning: 'Con tem',
        kanaType: 'hiragana',
        contrastWith: { word: 'きて', reading: 'きて', romaji: 'kite', meaning: 'Hãy đến (không có âm ngắt)' }
      },
      {
        word: 'ざっし',
        reading: 'ざっし',
        romaji: 'zasshi',
        meaning: 'Tạp chí',
        kanaType: 'hiragana'
      },
      {
        word: 'がっこう',
        reading: 'がっこう',
        romaji: 'gakkou',
        meaning: 'Trường học',
        kanaType: 'hiragana'
      },
      {
        word: 'きっぷ',
        reading: 'きっぷ',
        romaji: 'kippu',
        meaning: 'Vé xe/tàu',
        kanaType: 'hiragana'
      },
      {
        word: 'コップ',
        reading: 'コップ',
        romaji: 'koppu',
        meaning: 'Cái cốc / Ly nước',
        kanaType: 'katakana'
      },
      {
        word: 'サッカー',
        reading: 'サッカー',
        romaji: 'sakkaa',
        meaning: 'Môn bóng đá',
        kanaType: 'katakana'
      },
      {
        word: 'ベッド',
        reading: 'ベッド',
        romaji: 'beddo',
        meaning: 'Cái giường ngủ',
        kanaType: 'katakana'
      },
      {
        word: 'チケット',
        reading: 'チケット',
        romaji: 'chiketto',
        meaning: 'Vé vào cửa',
        kanaType: 'katakana'
      }
    ]
  },
  {
    id: 'choon',
    name: '長音 (Trường Âm)',
    subtitle: 'Kéo dài nguyên âm bằng 2 phách',
    badge: 'ー / Kép âm',
    description: 'Trường âm là những nguyên âm được kéo dài gấp đôi thời lượng thông thường (bằng 2 phách phát âm). Trong tiếng Nhật, kéo dài nguyên âm sẽ biến đổi nghĩa sang một từ hoàn toàn khác.',
    formula: 'Hiragana: Cột âm + Nguyên âm tương ứng | Katakana: Dấu gạch ngang dài ー',
    notes: [
      'Quy tắc Hiragana: Cột A (+あ), Cột I (+い), Cột U (+う), Cột E (+え hoặc +い), Cột O (+お hoặc +う).',
      'Đặc biệt lưu ý: Hàng O phần lớn cộng thêm う (ví dụ: おとうさん otousan, ひこうき hikouki).',
      'Trong Katakana: Mọi trường âm đều được biểu thị bằng dấu gạch ngang dài ー (Chōonpu).'
    ],
    examples: [
      {
        word: 'おかあさん',
        reading: 'おかあさん',
        romaji: 'okaasan',
        meaning: 'Mẹ (Cột A + あ)',
        kanaType: 'hiragana',
        contrastWith: { word: 'おばさん', reading: 'おばさん', romaji: 'obasan', meaning: 'Cô / dì (âm ngắn)' }
      },
      {
        word: 'おばあさん',
        reading: 'おばあさん',
        romaji: 'obaasan',
        meaning: 'Bà (Trường âm あ)',
        kanaType: 'hiragana',
        contrastWith: { word: 'おばさん', reading: 'おばさん', romaji: 'obasan', meaning: 'Cô / dì (âm ngắn)' }
      },
      {
        word: 'おにいさん',
        reading: 'おにいさん',
        romaji: 'oniisan',
        meaning: 'Anh trai (Cột I + い)',
        kanaType: 'hiragana'
      },
      {
        word: 'くうき',
        reading: 'くうき',
        romaji: 'kuuki',
        meaning: 'Không khí (Cột U + う)',
        kanaType: 'hiragana'
      },
      {
        word: 'せんせい',
        reading: 'せんせい',
        romaji: 'sensei',
        meaning: 'Thầy / Cô giáo (Cột E + い)',
        kanaType: 'hiragana'
      },
      {
        word: 'おとうさん',
        reading: 'おとうさん',
        romaji: 'otousan',
        meaning: 'Bố (Cột O + う)',
        kanaType: 'hiragana'
      },
      {
        word: 'コーヒー',
        reading: 'コーヒー',
        romaji: 'koohii',
        meaning: 'Cà phê (Katakana dấu ー)',
        kanaType: 'katakana'
      },
      {
        word: 'ケーキ',
        reading: 'ケーキ',
        romaji: 'keeki',
        meaning: 'Bánh ngọt (Katakana dấu ー)',
        kanaType: 'katakana'
      },
      {
        word: 'タクシー',
        reading: 'タクシー',
        romaji: 'takushii',
        meaning: 'Xe taxi (Katakana dấu ー)',
        kanaType: 'katakana'
      },
      {
        word: 'スーパー',
        reading: 'スーパー',
        romaji: 'suupaa',
        meaning: 'Siêu thị (Katakana dấu ー)',
        kanaType: 'katakana'
      }
    ]
  },
  {
    id: 'hatsuon',
    name: '撥音 (Âm Mũi)',
    subtitle: 'Chữ ん (Hiragana) và ン (Katakana)',
    badge: 'ん / ン',
    description: 'Chữ ん / ン là ký tự duy nhất trong tiếng Nhật là một phụ âm đứng riêng không kèm nguyên âm. Nó chiếm đúng 1 phách phát âm (mora) và biến âm tùy theo chữ cái đứng sau.',
    formula: 'ん / ン = 1 phách phát âm riêng biệt',
    notes: [
      'Đọc là [m] khi đứng trước các âm hàng p, b, m: てんぷら (tempura), さんぽ (sampo).',
      'Đọc là [ng] khi đứng trước k, g hoặc ở cuối câu: にほん (nihon), ぎんこう (ginkou).',
      'Đọc là [n] khi đứng trước t, d, n, r: おんな (onna), せんせい (sensei).'
    ],
    examples: [
      {
        word: 'にほん',
        reading: 'にほん',
        romaji: 'nihon',
        meaning: 'Nhật Bản',
        kanaType: 'hiragana'
      },
      {
        word: 'てんぷら',
        reading: 'てんぷら',
        romaji: 'tempura',
        meaning: 'Món Tempura (phát âm m)',
        kanaType: 'hiragana'
      },
      {
        word: 'ぎんこう',
        reading: 'ぎんこう',
        romaji: 'ginkou',
        meaning: 'Ngân hàng (phát âm ng)',
        kanaType: 'hiragana'
      },
      {
        word: 'パン',
        reading: 'パン',
        romaji: 'pan',
        meaning: 'Bánh mì (Katakana)',
        kanaType: 'katakana'
      }
    ]
  }
];

// ══════════════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════════════

/** Tất cả Hiragana cơ bản */
export const ALL_HIRAGANA = [...HIRAGANA_SEION, ...HIRAGANA_DAKUON, ...HIRAGANA_HANDAKUON];

/** Tất cả Katakana cơ bản */
export const ALL_KATAKANA = [...KATAKANA_SEION, ...KATAKANA_DAKUON, ...KATAKANA_HANDAKUON];

/** Tất cả chữ cái cơ bản */
export const ALL_KANA = [...ALL_HIRAGANA, ...ALL_KATAKANA];

/** Row labels tiếng Việt */
export const ROW_LABELS: Record<string, string> = {
  a: 'Hàng A (あ行 / ア行)',
  ka: 'Hàng KA (か行 / カ行)',
  sa: 'Hàng SA (さ行 / サ行)',
  ta: 'Hàng TA (た行 / タ行)',
  na: 'Hàng NA (な行 / ナ行)',
  ha: 'Hàng HA (は行 / ハ行)',
  ma: 'Hàng MA (ま行 / マ行)',
  ya: 'Hàng YA (や行 / ヤ行)',
  ra: 'Hàng RA (ら行 / ラ行)',
  wa: 'Hàng WA (わ行 / ワ行)',
  ga: 'Hàng GA (が行 / ガ行)',
  za: 'Hàng ZA (ざ行 / ザ行)',
  da: 'Hàng DA (だ行 / ダ行)',
  ba: 'Hàng BA (ば行 / バ行)',
  pa: 'Hàng PA (ぱ行 / パ行)',
  kya: 'Hàng KYA (きゃ行 / キャ行)',
  sha: 'Hàng SHA (しゃ行 / シャ行)',
  cha: 'Hàng CHA (ちゃ行 / チャ行)',
  nya: 'Hàng NYA (にゃ行 / ニャ行)',
  hya: 'Hàng HYA (ひゃ行 / ヒャ行)',
  mya: 'Hàng MYA (みゃ行 / ミャ行)',
  rya: 'Hàng RYA (りゃ行 / リャ行)',
  gya: 'Hàng GYA (ぎゃ行 / ギャ行)',
  ja: 'Hàng JA (じゃ行 / ジャ行)',
  bya: 'Hàng BYA (びゃ行 / ビャ行)',
  pya: 'Hàng PYA (ぴゃ行 / ピャ行)',
};

/** Thứ tự hàng cho Seion, Dakuon, Handakuon, Yoon */
export const SEION_ROW_ORDER = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'];
export const DAKUON_ROW_ORDER = ['ga', 'za', 'da', 'ba'];
export const HANDAKUON_ROW_ORDER = ['pa'];
export const YOON_ROW_ORDER = ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'bya', 'pya'];

/** Toàn bộ thứ tự học liên tục theo hàng từ cơ bản đến nâng cao */
export const ALL_ROW_ORDER = [
  ...SEION_ROW_ORDER,
  ...DAKUON_ROW_ORDER,
  ...HANDAKUON_ROW_ORDER,
  ...YOON_ROW_ORDER,
];

/** Lấy hàng tiếp theo của bảng chữ cái */
export function getNextRow(currentRow: string): string | null {
  const idx = ALL_ROW_ORDER.indexOf(currentRow);
  if (idx >= 0 && idx + 1 < ALL_ROW_ORDER.length) {
    return ALL_ROW_ORDER[idx + 1];
  }
  return null;
}

/** Lấy nhãn hàng */
export function getKanaRowLabel(row: string): string {
  return ROW_LABELS[row] || row;
}

/** Nhóm ký tự theo hàng */
export function groupByRow(chars: KanaChar[]): Map<string, KanaChar[]> {
  const map = new Map<string, KanaChar[]>();
  chars.forEach(c => {
    const arr = map.get(c.row) || [];
    arr.push(c);
    map.set(c.row, arr);
  });
  return map;
}

/** Phát âm tiếng Nhật bằng Web Speech API */
export function speakJapanese(text: string, rate = 0.8): void {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = 1;

  // Try to find a Japanese voice
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang.startsWith('ja'));
  if (jaVoice) utterance.voice = jaVoice;

  window.speechSynthesis.speak(utterance);
}

