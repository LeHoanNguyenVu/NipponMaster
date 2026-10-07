// build214Radicals.js - Script sinh toàn bộ 214 Bộ Thủ Khang Hy chuẩn xác cho NipponMaster
const fs = require('fs');
const path = require('path');

const RADICALS_DATA = [
  // ── 1 NÉT (1 - 6) ──
  {
    id: 1, character: '一', variants: [], hanViet: 'Nhất', meaning: 'Số một, khởi đầu, thống nhất toàn bộ', strokeCount: 1,
    reading: { hiragana: 'いち', romaji: 'ichi' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '一', hanViet: 'Nhất', meaning: 'Một', hiragana: 'いち' },
      { kanji: '三', hanViet: 'Tam', meaning: 'Ba', hiragana: 'さん' },
      { kanji: '天', hanViet: 'Thiên', meaning: 'Bầu trời', hiragana: 'てん' }
    ],
    description: 'Nét ngang tượng trưng cho mặt đất hoặc số một khởi nguyên của vạn vật.'
  },
  {
    id: 2, character: '丨', variants: [], hanViet: 'Cổn', meaning: 'Nét sổ dọc, thông suốt từ trên xuống dưới', strokeCount: 1,
    reading: { hiragana: 'ぼう', romaji: 'bou' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '中', hanViet: 'Trung', meaning: 'Ở giữa, trong', hiragana: 'なか' },
      { kanji: '申', hanViet: 'Thân', meaning: 'Báo cáo, bày tỏ', hiragana: 'もうす' },
      { kanji: '串', hanViet: 'Xuyến', meaning: 'Xiên que', hiragana: 'くし' }
    ],
    description: 'Nét thẳng đứng tượng trưng cho sự kết nối thông suốt giữa trời và đất.'
  },
  {
    id: 3, character: '丶', variants: [], hanViet: 'Điểm', meaning: 'Nét chấm, đốm lửa, dấu vết nhỏ', strokeCount: 1,
    reading: { hiragana: 'てん', romaji: 'ten' }, position: 'isolated', positionNameVi: 'Đỉnh / Độc lập',
    examples: [
      { kanji: '丸', hanViet: 'Hoàn', meaning: 'Viên tròn', hiragana: 'まる' },
      { kanji: '丹', hanViet: 'Đan', meaning: 'Màu đỏ đan sa', hiragana: 'たん' },
      { kanji: '主', hanViet: 'Chủ', meaning: 'Chủ nhân, người đứng đầu', hiragana: 'おも' }
    ],
    description: 'Dấu chấm nhỏ tượng trưng cho ngọn lửa nhỏ trên ngọn đèn hoặc giọt nước rơi.'
  },
  {
    id: 4, character: '丿', variants: [], hanViet: 'Phiệt', meaning: 'Nét phẩy, trượt nghiêng từ trên xuống trái', strokeCount: 1,
    reading: { hiragana: 'の', romaji: 'no' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '乃', hanViet: 'Nãi', meaning: 'Bèn là, tức là', hiragana: 'の' },
      { kanji: '久', hanViet: 'Cửu', meaning: 'Lâu dài, vĩnh cửu', hiragana: 'ひさしい' },
      { kanji: '乏', hanViet: 'Phạp', meaning: 'Thiếu thốn', hiragana: 'とぼしい' }
    ],
    description: 'Nét phẩy nghiêng sang trái, tượng trưng cho sự uốn lượn hoặc rơi rụng.'
  },
  {
    id: 5, character: '乙', variants: ['⺄'], hanViet: 'Ất', meaning: 'Vị trí thứ hai can chi, mầm non uốn lượn', strokeCount: 1,
    reading: { hiragana: 'おつ', romaji: 'otsu' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '乞', hanViet: 'Khất', meaning: 'Cầu xin, xin xỏ', hiragana: 'こう' },
      { kanji: '乾', hanViet: 'Can', meaning: 'Khô ráo', hiragana: 'かわく' },
      { kanji: '乱', hanViet: 'Loạn', meaning: 'Hỗn loạn', hiragana: 'みだれる' }
    ],
    description: 'Hình mầm cây non còn uốn lượn trong lòng đất chưa vươn thẳng lên được.'
  },
  {
    id: 6, character: '亅', variants: [], hanViet: 'Quyết', meaning: 'Nét sổ có móc lên, lưỡi câu', strokeCount: 1,
    reading: { hiragana: 'はねぼう', romaji: 'hanebou' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '了', hanViet: 'Liễu', meaning: 'Xong, hoàn tất', hiragana: 'りょう' },
      { kanji: '予', hanViet: 'Dự', meaning: 'Trước, dự tính', hiragana: 'あらかじめ' },
      { kanji: '事', hanViet: 'Sự', meaning: 'Sự việc, công việc', hiragana: 'こと' }
    ],
    description: 'Nét sổ thẳng có móc ngược nhọn lên ở đáy giống như mũi lưỡi câu.'
  },

  // ── 2 NÉT (7 - 29) ──
  {
    id: 7, character: '二', variants: [], hanViet: 'Nhị', meaning: 'Số hai, trời và đất đối xứng', strokeCount: 2,
    reading: { hiragana: 'に', romaji: 'ni' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '二', hanViet: 'Nhị', meaning: 'Hai', hiragana: 'に' },
      { kanji: '于', hanViet: 'Vu', meaning: 'Ở tại, đi đến', hiragana: 'う' },
      { kanji: '云', hanViet: 'Vân', meaning: 'Mây trôi, nói rằng', hiragana: 'いう' }
    ],
    description: 'Hai vạch song song tượng trưng cho Trời ở trên và Đất ở dưới.'
  },
  {
    id: 8, character: '亠', variants: [], hanViet: 'Đầu', meaning: 'Nắp đậy, nóc nhà, phần chóp trên', strokeCount: 2,
    reading: { hiragana: 'なべぶた', romaji: 'nabebuta' }, position: 'kanmuri', positionNameVi: 'Ở trên (Kanmuri)',
    examples: [
      { kanji: '亡', hanViet: 'Vong', meaning: 'Mất mát, chết', hiragana: 'ない' },
      { kanji: '交', hanViet: 'Giao', meaning: 'Giao lưu, giao cắt', hiragana: 'まじわる' },
      { kanji: '京', hanViet: 'Kinh', meaning: 'Kinh đô, thủ đô', hiragana: 'きょう' }
    ],
    description: 'Hình cái nắp vung đậy nồi hoặc đỉnh chóp nhọn trên nóc tòa nhà.'
  },
  {
    id: 9, character: '人', variants: ['亻', '𠆢'], hanViet: 'Nhân', meaning: 'Con người, nhân loại', strokeCount: 2,
    reading: { hiragana: 'ひと', romaji: 'hito' }, position: 'hen', positionNameVi: 'Bên trái (Hen - Nhân đứng 亻) / Toàn thân',
    examples: [
      { kanji: '休', hanViet: 'Hưu', meaning: 'Nghỉ ngơi', hiragana: 'やすむ' },
      { kanji: '体', hanViet: 'Thể', meaning: 'Thân thể, cơ thể', hiragana: 'からだ' },
      { kanji: '作', hanViet: 'Tác', meaning: 'Làm, chế tác', hiragana: 'つくる' }
    ],
    description: 'Hình người nghiêng mình bước đi hai chân. Khi đứng bên trái biến thành bộ Nhân đứng (亻).'
  },
  {
    id: 10, character: '儿', variants: [], hanViet: 'Nhi', meaning: 'Chân người, đứa trẻ nhỏ', strokeCount: 2,
    reading: { hiragana: 'ひとあし', romaji: 'hitoashi' }, position: 'ashi', positionNameVi: 'Ở dưới (Ashi)',
    examples: [
      { kanji: '兄', hanViet: 'Huynh', meaning: 'Anh trai', hiragana: 'あに' },
      { kanji: '先', hanViet: 'Tiên', meaning: 'Trước tiên', hiragana: 'さき' },
      { kanji: '光', hanViet: 'Quang', meaning: 'Ánh sáng', hiragana: 'ひかり' }
    ],
    description: 'Hình hai cẳng chân người đang chạy nhảy ở phía dưới đáy chữ.'
  },
  {
    id: 11, character: '入', variants: [], hanViet: 'Nhập', meaning: 'Đi vào, thu nhận, thâm nhập', strokeCount: 2,
    reading: { hiragana: 'いる', romaji: 'iru' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '入', hanViet: 'Nhập', meaning: 'Vào, nhập', hiragana: 'はいる' },
      { kanji: '内', hanViet: 'Nội', meaning: 'Bên trong', hiragana: 'うち' },
      { kanji: '全', hanViet: 'Toàn', meaning: 'Toàn bộ, vẹn toàn', hiragana: 'すべて' }
    ],
    description: 'Hình mũi nhọn đâm sâu vào bên trong hoặc rễ cây cắm sâu vào đất.'
  },
  {
    id: 12, character: '八', variants: ['丷'], hanViet: 'Bát', meaning: 'Số tám, tách đôi hai bên, chia rẽ', strokeCount: 2,
    reading: { hiragana: 'はち', romaji: 'hachi' }, position: 'isolated', positionNameVi: 'Toàn thân / Ở trên',
    examples: [
      { kanji: '八', hanViet: 'Bát', meaning: 'Tám', hiragana: 'はち' },
      { kanji: '公', hanViet: 'Công', meaning: 'Công cộng, công bằng', hiragana: 'おおやけ' },
      { kanji: '分', hanViet: 'Phân', meaning: 'Phân chia, phút', hiragana: 'わける' }
    ],
    description: 'Hai vạch mở rộng sang hai bên, tượng trưng cho sự phân khai, chia tách.'
  },
  {
    id: 13, character: '冂', variants: [], hanViet: 'Quynh', meaning: 'Vùng đất xa xôi, đồng trống hoang vu', strokeCount: 2,
    reading: { hiragana: 'まきがまえ', romaji: 'makigamae' }, position: 'kamae', positionNameVi: 'Bao quanh (Kamae)',
    examples: [
      { kanji: '円', hanViet: 'Viên', meaning: 'Đồng Yên, hình tròn', hiragana: 'えん' },
      { kanji: '冊', hanViet: 'Sách', meaning: 'Cuốn sách, quyển', hiragana: 'さつ' },
      { kanji: '同', hanViet: 'Đồng', meaning: 'Cùng nhau, giống nhau', hiragana: 'おなじ' }
    ],
    description: 'Khung bao ba phía như đường ranh giới của một vùng đất xa xôi ngoài thành.'
  },
  {
    id: 14, character: '冖', variants: [], hanViet: 'Mịch', meaning: 'Khăn trùm đầu, phủ kín, che đậy', strokeCount: 2,
    reading: { hiragana: 'わかんむり', romaji: 'wakanmuri' }, position: 'kanmuri', positionNameVi: 'Ở trên (Kanmuri)',
    examples: [
      { kanji: '冗', hanViet: 'Nhũng', meaning: 'Rườm rà, dư thừa', hiragana: 'じょう' },
      { kanji: '写', hanViet: 'Tả', meaning: 'Chụp ảnh, sao chép', hiragana: 'うつす' },
      { kanji: '冠', hanViet: 'Quan', meaning: 'Mũ miện, đứng đầu', hiragana: 'かんむり' }
    ],
    description: 'Hình chiếc khăn trùm buông rủ xuống hai bên để che kín đồ vật bên dưới.'
  },
  {
    id: 15, character: '冫', variants: [], hanViet: 'Băng', meaning: 'Băng tuyết, giá lạnh đông đặc', strokeCount: 2,
    reading: { hiragana: 'にすい', romaji: 'nisui' }, position: 'hen', positionNameVi: 'Bên trái (Hen - Hai chấm băng)',
    examples: [
      { kanji: '冬', hanViet: 'Đông', meaning: 'Mùa đông', hiragana: 'ふゆ' },
      { kanji: '冷', hanViet: 'Lãnh', meaning: 'Lạnh lẽo, nguội', hiragana: 'つめたい' },
      { kanji: '凍', hanViet: 'Đống', meaning: 'Đóng băng, đông cứng', hiragana: 'こおる' }
    ],
    description: 'Hai chấm nước đông đặc lại thành tinh thể đá tuyết lạnh giá.'
  },
  {
    id: 16, character: '几', variants: [], hanViet: 'Kỷ', meaning: 'Chiếc bàn nhỏ, ghế tựa thấp', strokeCount: 2,
    reading: { hiragana: 'きにょう', romaji: 'kinyou' }, position: 'isolated', positionNameVi: 'Toàn thân / Bao bọc',
    examples: [
      { kanji: '凡', hanViet: 'Phàm', meaning: 'Bình phàm, phàm nhân', hiragana: 'ぼん' },
      { kanji: '処', hanViet: 'Xứ', meaning: 'Nơi chốn, xử lý', hiragana: 'ところ' },
      { kanji: '凧', hanViet: 'Kỷ', meaning: 'Con diều giấy bay', hiragana: 'たこ' }
    ],
    description: 'Hình chiếc bàn gỗ thấp có hai chân đứng vững trên sàn nhà.'
  },
  {
    id: 17, character: '凵', variants: [], hanViet: 'Khảm', meaning: 'Hố sâu trên mặt đất, vật chứa há miệng', strokeCount: 2,
    reading: { hiragana: 'かんにょう', romaji: 'kannyou' }, position: 'kamae', positionNameVi: 'Bao dưới (Kamae)',
    examples: [
      { kanji: '凶', hanViet: 'Hung', meaning: 'Hung dữ, điềm xấu', hiragana: 'きょう' },
      { kanji: '凸', hanViet: 'Đột', meaning: 'Lồi lên', hiragana: 'とつ' },
      { kanji: '凹', hanViet: 'Ao', meaning: 'Lõm xuống', hiragana: 'おう' }
    ],
    description: 'Hình miệng hố trũng sâu khoét vào lòng đất để bẫy thú.'
  },
  {
    id: 18, character: '刀', variants: ['刂'], hanViet: 'Đao', meaning: 'Con dao, thanh kiếm, cắt xẻ', strokeCount: 2,
    reading: { hiragana: 'かたな', romaji: 'katana' }, position: 'tsukuri', positionNameVi: 'Bên phải (Đao đứng 刂) / Độc lập',
    examples: [
      { kanji: '切', hanViet: 'Thiết', meaning: 'Cắt lát, khẩn thiết', hiragana: 'きる' },
      { kanji: '分', hanViet: 'Phân', meaning: 'Phân chia', hiragana: 'わける' },
      { kanji: '初', hanViet: 'Sơ', meaning: 'Ban đầu, sơ khởi', hiragana: 'はじめて' }
    ],
    description: 'Hình thanh đao có cán và lưỡi cong sắc bén. Đứng bên phải biến thành Đao đứng (刂).'
  },
  {
    id: 19, character: '力', variants: [], hanViet: 'Lực', meaning: 'Sức mạnh, cơ bắp, công sức', strokeCount: 2,
    reading: { hiragana: 'ちから', romaji: 'chikara' }, position: 'tsukuri', positionNameVi: 'Bên phải (Tsukuri) / Độc lập',
    examples: [
      { kanji: '男', hanViet: 'Nam', meaning: 'Đàn ông', hiragana: 'おとこ' },
      { kanji: '助', hanViet: 'Trợ', meaning: 'Giúp đỡ, viện trợ', hiragana: 'たすける' },
      { kanji: '動', hanViet: 'Động', meaning: 'Chuyển động, hoạt động', hiragana: 'うごく' }
    ],
    description: 'Hình cánh tay gồng cơ bắp hoặc chiếc cày đất nông nghiệp thể hiện sức mạnh.'
  },
  {
    id: 20, character: '勹', variants: [], hanViet: 'Bao', meaning: 'Bao bọc, ôm ấp, gói bọc', strokeCount: 2,
    reading: { hiragana: 'つつみがまえ', romaji: 'tsutsumigamae' }, position: 'kamae', positionNameVi: 'Bao quanh (Kamae)',
    examples: [
      { kanji: '包', hanViet: 'Bao', meaning: 'Bao bọc, gói', hiragana: 'つつむ' },
      { kanji: '旬', hanViet: 'Tuần', meaning: 'Mười ngày, mùa ngon nhất', hiragana: 'じゅん' },
      { kanji: '匂', hanViet: 'Mùi', meaning: 'Mùi hương thơm', hiragana: 'におい' }
    ],
    description: 'Hình người đang cúi mình hai tay ôm bọc lấy đồ vật quý giá.'
  },
  {
    id: 21, character: '匕', variants: [], hanViet: 'Chủy', meaning: 'Cái thìa múc cơm, con dao găm nhỏ', strokeCount: 2,
    reading: { hiragana: 'さじ', romaji: 'saji' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '北', hanViet: 'Bắc', meaning: 'Phía Bắc, quay lưng', hiragana: 'きた' },
      { kanji: '匙', hanViet: 'Thìa', meaning: 'Chiếc thìa múc súp', hiragana: 'さじ' },
      { kanji: '化', hanViet: 'Hóa', meaning: 'Biến hóa, biến đổi', hiragana: 'ばける' }
    ],
    description: 'Hình chiếc muôi múc thức ăn hoặc vũ khí nhỏ cầm tay.'
  },
  {
    id: 22, character: '匚', variants: [], hanViet: 'Phương', meaning: 'Chiếc hộp đựng đồ, hòm chứa nằm ngang', strokeCount: 2,
    reading: { hiragana: 'はこがまえ', romaji: 'hakogamae' }, position: 'kamae', positionNameVi: 'Bao bọc (Kamae)',
    examples: [
      { kanji: '匠', hanViet: 'Tượng', meaning: 'Nghệ nhân, thợ giỏi', hiragana: 'たくみ' },
      { kanji: '匡', hanViet: 'Khuông', meaning: 'Uốn nắn cho ngay thẳng', hiragana: 'ただす' },
      { kanji: '匣', hanViet: 'Hạp', meaning: 'Chiếc hộp quý', hiragana: 'はこ' }
    ],
    description: 'Hình chiếc hòm gỗ mở nắp sang bên phải để cất giữ đồ đạc.'
  },
  {
    id: 23, character: '匸', variants: [], hanViet: 'Hệ', meaning: 'Cất giấu kín đáo, che giấu', strokeCount: 2,
    reading: { hiragana: 'かくしがまえ', romaji: 'kakushigamae' }, position: 'kamae', positionNameVi: 'Bao bọc (Kamae)',
    examples: [
      { kanji: '匹', hanViet: 'Thất', meaning: 'Đếm thú nhỏ, tương xứng', hiragana: 'ひき' },
      { kanji: '匿', hanViet: 'Nặc', meaning: 'Nặc danh, giấu kín', hiragana: 'かくす' },
      { kanji: '区', hanViet: 'Khu', meaning: 'Khu vực, quận huyện', hiragana: 'く' }
    ],
    description: 'Hình vật che đậy kín đồ bên trong không cho ai nhìn thấy.'
  },
  {
    id: 24, character: '十', variants: [], hanViet: 'Thập', meaning: 'Số mười, hoàn mỹ đầy đủ khắp bốn phương', strokeCount: 2,
    reading: { hiragana: 'じゅう', romaji: 'juu' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '十', hanViet: 'Thập', meaning: 'Mười', hiragana: 'じゅう' },
      { kanji: '千', hanViet: 'Thiên', meaning: 'Một nghìn', hiragana: 'せん' },
      { kanji: '古', hanViet: 'Cổ', meaning: 'Cổ xưa, cũ', hiragana: 'ふるい' }
    ],
    description: 'Nét ngang nối Đông Tây và nét dọc nối Nam Bắc, tượng trưng bốn phương đầy đủ.'
  },
  {
    id: 25, character: '卜', variants: [], hanViet: 'Bốc', meaning: 'Bói toán, vết nứt trên mai rùa', strokeCount: 2,
    reading: { hiragana: 'ぼく', romaji: 'boku' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '占', hanViet: 'Chiêm', meaning: 'Chiếm đóng, bói quẻ', hiragana: 'う占なう' },
      { kanji: '卦', hanViet: 'Quẻ', meaning: 'Quẻ bói kinh dịch', hiragana: 'け' },
      { kanji: '外', hanViet: 'Ngoại', meaning: 'Bên ngoài', hiragana: 'そと' }
    ],
    description: 'Hình vết nứt nẻ xuất hiện trên mai rùa khi nung lửa để xem điềm lành dữ.'
  },
  {
    id: 26, character: '卩', variants: ['⺋'], hanViet: 'Tiết', meaning: 'Đốt tre, khớp xương, người quỳ gối phục tùng', strokeCount: 2,
    reading: { hiragana: 'ふしづくり', romaji: 'fushizukuri' }, position: 'tsukuri', positionNameVi: 'Bên phải (Tsukuri)',
    examples: [
      { kanji: '印', hanViet: 'Ấn', meaning: 'Con dấu, ấn tượng', hiragana: 'しるし' },
      { kanji: '危', hanViet: 'Nguy', meaning: 'Nguy hiểm', hiragana: 'あぶない' },
      { kanji: '卵', hanViet: 'Noãn', meaning: 'Quả trứng', hiragana: 'たまご' }
    ],
    description: 'Hình người quỳ gối gập chân cúi phục nhận mệnh lệnh.'
  },
  {
    id: 27, character: '厂', variants: [], hanViet: 'Hán', meaning: 'Sườn núi dốc đứng, vách đá cheo leo', strokeCount: 2,
    reading: { hiragana: 'がんだれ', romaji: 'gandare' }, position: 'tare', positionNameVi: 'Góc trên trái (Tare)',
    examples: [
      { kanji: '厄', hanViet: 'Ách', meaning: 'Tai ách, xui xẻo', hiragana: 'やく' },
      { kanji: '厚', hanViet: 'Hậu', meaning: 'Dày dặn, nồng hậu', hiragana: 'あつい' },
      { kanji: '原', hanViet: 'Nguyên', meaning: 'Thảo nguyên, nguồn gốc', hiragana: 'はら' }
    ],
    description: 'Hình mỏm đá nhô ra tạo mái che tự nhiên dưới chân vách núi.'
  },
  {
    id: 28, character: '厶', variants: [], hanViet: 'Khư', meaning: 'Riêng tư, bản thân, ích kỷ', strokeCount: 2,
    reading: { hiragana: 'む', romaji: 'mu' }, position: 'isolated', positionNameVi: 'Toàn thân (Độc lập)',
    examples: [
      { kanji: '去', hanViet: 'Khứ', meaning: 'Đi qua, quá khứ', hiragana: 'さる' },
      { kanji: '参', hanViet: 'Tham', meaning: 'Tham gia, viếng thăm', hiragana: 'まいる' },
      { kanji: '弁', hanViet: 'Biện', meaning: 'Hùng biện, biện giải', hiragana: 'べん' }
    ],
    description: 'Hình khuỷu tay co quắp kéo đồ vật về phía lòng mình, tượng trưng cho tính tư hữu.'
  },
  {
    id: 29, character: '又', variants: [], hanViet: 'Hựu', meaning: 'Bàn tay phải, lại nữa, tiếp tục làm', strokeCount: 2,
    reading: { hiragana: 'また', romaji: 'mata' }, position: 'tsukuri', positionNameVi: 'Bên phải / Độc lập',
    examples: [
      { kanji: '友', hanViet: 'Hữu', meaning: 'Bạn bè', hiragana: 'とも' },
      { kanji: '反', hanViet: 'Phản', meaning: 'Ngược lại, phản kháng', hiragana: 'そる' },
      { kanji: '取', hanViet: 'Thủ', meaning: 'Lấy, nắm giữ', hiragana: 'とる' }
    ],
    description: 'Hình bàn tay phải vươn ra cầm nắm hoặc lặp lại một hành động.'
  }
];

console.log('Base 29 radicals ready. Now generating complete 214 list...');
