import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import psycopg2

conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password="hnvuwww1234A",
    sslmode="require"
)
conn.autocommit = False
cur = conn.cursor()

try:
    print("=" * 70)
    print("SEEDING FULL AUTHENTIC MINIGAMES (CH 5 TO 15) ACCORDING TO OFFICIAL TEXTBOOK")
    print("=" * 70)

    # Dữ liệu chuẩn mực 100% từ 30 trang bài tập Minigame chính thức trong sách
    FULL_MINIGAMES = {
        # =========================================================================
        # CHƯƠNG 5: ばしょ (Trang 52, 53)
        # =========================================================================
        5: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 どんな かんじが できますか (Ghép nét tạo chữ Hán)",
                "instruction": "Quan sát các nét bút thành phần rời rạc trong tranh và suy luận xem chúng ghép lại thành chữ Hán nào.",
                "image_url": "/assets/kanji/n5/minigames/chap5_minigame_p52.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: 丨 + 一 + 一", "answer": "上"},
                    "questions": [
                        {"id": 1, "prompt": "1. 一 + 丨 + 丶", "options": ["下", "上", "十", "土"], "answer": "下", "explanation": "Nét ngang dài ở trên, nét sổ và nét chấm ở dưới tạo thành chữ 下 (HẠ - phía dưới)."},
                        {"id": 2, "prompt": "2. 丨 + 乛 + 一 + 丨", "options": ["中", "内", "口", "日"], "answer": "中", "explanation": "Hình chữ nhật có nét sổ dọc xuyên chính giữa tâm tạo thành chữ 中 (TRUNG - bên trong)."},
                        {"id": 3, "prompt": "3. 丿 + フ + 丶 + 丨 + 丶", "options": ["外", "多", "夕", "名"], "answer": "外", "explanation": "Bộ Tịch (夕) kết hợp với bộ Bặc (卜) tạo thành chữ 外 (NGOẠI - bên ngoài)."},
                        {"id": 4, "prompt": "4. 丿 + 一 + 丨 + 乛 + 一", "options": ["左", "右", "在", "友"], "answer": "左", "explanation": "Bộ Hoành phiệt kết hợp bộ Công (工) tạo thành chữ 左 (TẢ - bên trái)."},
                        {"id": 5, "prompt": "5. 丨 + 冂 + 丿 + 丶", "options": ["内", "肉", "円", "中"], "answer": "内", "explanation": "Bộ Quynh (冂) bao quanh nét phẩy và nét chấm tạo thành chữ 内 (NỘI - bên trong)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 えを みて かんじを かきましょう (Quan sát tranh căn phòng)",
                "instruction": "Quan sát vị trí các đồ vật và con vật trong bức tranh căn phòng rồi chọn chữ Hán chính xác điền vào ô trống.",
                "image_url": "/assets/kanji/n5/minigames/chap5_minigame_p53.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. テーブルの [ ? ] に [ ? ]びんが あります。", "options": ["上 / 花", "下 / 花", "中 / 木", "外 / 石"], "answer": "上 / 花", "explanation": "Trên mặt bàn có bình hoa: テーブルの上に花びんがあります。"},
                        {"id": 2, "prompt": "2. うちの [ ? ] に ねこが [ ? ]ひき います。", "options": ["外 / 二", "中 / 一", "上 / 三", "下 / 二"], "answer": "外 / 二", "explanation": "Bên ngoài bậu cửa sổ có 2 chú mèo: うちの外にねこが二ひきいます。"},
                        {"id": 3, "prompt": "3. ベッドの [ ? ] に いぬが [ ? ]ぴき います。", "options": ["上 / 一", "下 / 二", "中 / 一", "外 / 三"], "answer": "上 / 一", "explanation": "Trên giường có 1 chú chó đang nằm ngủ: ベッドの上にいぬが一ぴきいます。"},
                        {"id": 4, "prompt": "4. うちの [ ? ] に おんなのこが [ ? ] います。", "options": ["中 / 一人", "外 / 二人", "上 / 一人", "下 / 二人"], "answer": "中 / 一人", "explanation": "Trong nhà có 1 bé gái đang ôm gấu bông: うちの中におんなのこが一人います。"},
                        {"id": 5, "prompt": "5. へやの [ ? ] の いすの [ ? ] に くつが [ ? ]そく あります。", "options": ["中 / 下 / 一", "外 / 上 / 二", "中 / 上 / 一", "内 / 中 / 三"], "answer": "中 / 下 / 一", "explanation": "Dưới chân ghế trong phòng có 1 đôi giày: へやの中のいすの下にくつが一そくあります。"}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじを かきましょう (Đoạn văn 'Trường học của tôi')",
                "instruction": "Đọc bài văn ngắn giới thiệu về trường học và chọn chữ Hán tương ứng với các từ in đậm được đánh số.",
                "image_url": "/assets/kanji/n5/minigames/chap5_minigame_p53.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① かいだんで [あがり] ます (Đi lên bằng cầu thang)", "options": ["上", "下", "中", "出"], "answer": "上", "explanation": "あがります viết bằng chữ 上 (上がります)."},
                        {"id": 2, "prompt": "② がっこうの [なか] に じどうはんばいきが あります", "options": ["中", "内", "外", "間"], "answer": "中", "explanation": "なかに viết là 中に (bên trong)."},
                        {"id": 3, "prompt": "③ [みぎ] が [おとこのひと] の トイレです", "options": ["右 / 男の人", "左 / 女の人", "外 / 男の人", "上 / 人"], "answer": "右 / 男の人", "explanation": "みぎ viết là 右, おとこのひと viết là 男の人."},
                        {"id": 4, "prompt": "④ [ひだり] が [おんなのひと] の トイレです", "options": ["左 / 女の人", "右 / 男の人", "外 / 女の人", "下 / 人"], "answer": "左 / 女の人", "explanation": "ひだり viết là 左, おんなのひと viết là 女の人."},
                        {"id": 5, "prompt": "⑤ [こう] ないは きんえんです (Trong khuôn viên trường)", "options": ["校", "学", "高", "門"], "answer": "校", "explanation": "こうない viết là 校内 (trong trường)."},
                        {"id": 6, "prompt": "⑥ きょうしつの [そと] の ベランダで やすみます", "options": ["外", "中", "内", "下"], "answer": "外", "explanation": "そと viết là 外 (bên ngoài ban công)."},
                        {"id": 7, "prompt": "⑦ ベランダから [した] を みます。[ひと] が たくさん あるいています", "options": ["下 / 人", "上 / 男", "中 / 子", "外 / 友"], "answer": "下 / 人", "explanation": "した viết là 下, ひと viết là 人."},
                        {"id": 8, "prompt": "⑧ [いちにち] じゅう がっこうに います (Suốt cả ngày)", "options": ["一日", "毎日", "休日", "今日"], "answer": "一日", "explanation": "いちにち viết là 一日 (cả ngày)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 6: 学校-1 (Trang 62, 63)
        # =========================================================================
        6: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 がっこうの えを みて かんじを かきましょう (Quan sát sơ đồ trường học)",
                "instruction": "Quan sát bức tranh trường học và lớp học, chọn chữ Hán chuẩn xác tương ứng với các vị trí đánh số ① đến ⑥.",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p62.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "Vị trí ①: Ngôi trường chính nơi học sinh học tập", "options": ["学校", "学生", "高校", "大学"], "answer": "学校", "explanation": "Ngôi trường viết là 学校 (がっこう)."},
                        {"id": 2, "prompt": "Vị trí ②: Nhà thi đấu thể dục thể thao ([ ? ] いくかん)", "options": ["体", "休", "本", "生"], "answer": "体", "explanation": "たいいくかん viết là 体育館 (chữ 体 trong 体力, 体育)."},
                        {"id": 3, "prompt": "Vị trí ③: Học sinh nữ giơ tay phát biểu trong lớp", "options": ["学生", "先生", "先生方", "子供"], "answer": "学生", "explanation": "Học sinh/sinh viên viết là 学生 (がくせい)."},
                        {"id": 4, "prompt": "Vị trí ④: Học sinh nam đang chăm chú nghe giảng", "options": ["学生", "先生", "男子", "友だち"], "answer": "学生", "explanation": "Học sinh trong lớp học là 学生 (がくせい)."},
                        {"id": 5, "prompt": "Vị trí ⑤: Thư viện nhà trường ([ ? ] しょかん)", "options": ["図", "本", "校", "学"], "answer": "図", "explanation": "としょかん viết là 図書館 (thư viện)."},
                        {"id": 6, "prompt": "Vị trí ⑥: Giáo viên đang đứng giảng bài bên bảng đen", "options": ["先生", "学生", "校長", "大人"], "answer": "先生", "explanation": "Cô giáo giảng bài là 先生 (せんせい)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 おはなみの さくぶん (Đoạn văn ngắm hoa anh đào)",
                "instruction": "Đọc bài văn kỷ niệm ngắm hoa anh đào cùng thầy cô và bạn bè, chọn chữ Hán đúng cho các vị trí gạch chân.",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p62.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [せんげつ] アークアカデミーで おはなみを しました", "options": ["先月", "今月", "来月", "毎月"], "answer": "先月", "explanation": "せんげつ viết là 先月 (tháng trước)."},
                        {"id": 2, "prompt": "② お[はなみ] を しました", "options": ["花見", "月見", "見学", "花火"], "answer": "花見", "explanation": "おはなみ viết là お花見 (ngắm hoa anh đào)."},
                        {"id": 3, "prompt": "③ [せんせい] が [じゅうにん] いました", "options": ["先生 / 十人", "学生 / 二十人", "先月 / 八人", "先生 / 千人"], "answer": "先生 / 十人", "explanation": "せんせい là 先生, じゅうにん là 十人."},
                        {"id": 4, "prompt": "④ [がくせい] が [さんじゅうにん] いました", "options": ["学生 / 三十人", "先生 / 三人", "高校 / 三十人", "学校 / 三人"], "answer": "学生 / 三十人", "explanation": "がくせい là 学生, さんじゅうにん là 三十人."},
                        {"id": 5, "prompt": "⑤ [こうちょう] せんせいの いなりずしを たべました", "options": ["校長", "学校", "高校", "会長"], "answer": "校長", "explanation": "こうちょう là 校長 (thầy hiệu trưởng)."},
                        {"id": 6, "prompt": "⑥ [にほん] へ きて はじめて さくらを みました", "options": ["日本", "毎日", "休日", "本"], "answer": "日本", "explanation": "にほん viết là 日本 (Nhật Bản)."},
                        {"id": 7, "prompt": "⑦ とても たのしい [ひ] でした", "options": ["日", "月", "年", "時"], "answer": "日", "explanation": "ひ viết là 日 (ngày, một ngày vui vẻ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじの たしざんです (Phép cộng bộ thủ tạo chữ Kanji)",
                "instruction": "Ghép các bộ thủ được cộng lại với nhau để tạo thành từ vựng có nghĩa tương ứng trong hình.",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p63.webp",
                "display_order": 3,
                "data": {
                    "example": {"prompt": "れい: (木 + 交) + ちょう", "answer": "校ちょう (こうちょう)"},
                    "questions": [
                        {"id": 1, "prompt": "1. (夕 + 口) + まえ = [ ? ] まえ", "options": ["名まえ (なまえ)", "右まえ (みぎまえ)", "見まえ (みまえ)", "口まえ (くちまえ)"], "answer": "名まえ (なまえ)", "explanation": "夕 + 口 = chữ 名 (Danh trong 名前 - なまえ - tên họ)."},
                        {"id": 2, "prompt": "2. も + (宀 + 子) = も [ ? ]", "options": ["文字 (もじ)", "本 (ほん)", "名 (な)", "字 (あざ)"], "answer": "文字 (もじ)", "explanation": "宀 + 子 = chữ 字 (Tự trong 文字 - もじ - con chữ, ký tự)."},
                        {"id": 3, "prompt": "3. (亻 + 本) = [ ? ]", "options": ["体 (からだ)", "休 (やすみ)", "本 (ほん)", "林 (はやし)"], "answer": "体 (からだ)", "explanation": "Bộ Nhân đứng 亻 kết hợp với chữ 本 tạo thành chữ 体 (Thể - cơ thể, thân thể)."},
                        {"id": 4, "prompt": "4. (木 + 一) = [ ? ]", "options": ["本 (ほん)", "木 (き)", "休 (きゅう)", "林 (りん)"], "answer": "本 (ほん)", "explanation": "Chữ 木 gạch thêm nét ngang ở gốc rễ tạo thành chữ 本 (Bổn/Bản - gốc rễ, sách vở)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 7: 学校-2 (Trang 70, 71)
        # =========================================================================
        7: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 にゅうがくしきの さくぶん (Lễ khai giảng nhập học)",
                "instruction": "Đọc bài văn kể về ngày lễ khai giảng nhập học, điền chữ Hán tương ứng với các từ in đậm.",
                "image_url": "/assets/kanji/n5/minigames/chap7_minigame_p70.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [にゅうがく] しき でした (Lễ nhập học)", "options": ["入学", "大学", "見学", "休学"], "answer": "入学", "explanation": "にゅうがく viết là 入学 (Nhập học)."},
                        {"id": 2, "prompt": "② えきは とても [おおきい] です (Nhà ga rất to lớn)", "options": ["大きい", "小さい", "高い", "広い"], "answer": "大きい", "explanation": "おおきい viết là 大きい (to lớn)."},
                        {"id": 3, "prompt": "③ [でぐち] が わかりませんでした (Không biết lối ra ở đâu)", "options": ["出口", "入口", "門", "山口"], "answer": "出口", "explanation": "でぐち viết là 出口 (cửa ra, lối ra)."},
                        {"id": 4, "prompt": "④ [こうこうせい] に ききました (Hỏi một bạn học sinh cấp 3)", "options": ["高校生", "大学生", "先生", "小学生"], "answer": "高校生", "explanation": "こうこうせい viết là 高校生 (học sinh trung học phổ thông)."},
                        {"id": 5, "prompt": "⑤ きょうしつに [はいって] いすに すわりました", "options": ["入って", "出て", "立って", "行って"], "answer": "入って", "explanation": "はいって viết là 入って (bước vào trong lớp)."},
                        {"id": 6, "prompt": "⑥ たくさん はなしをして [ともだち] に なりました", "options": ["友だち", "先生", "人", "学生"], "answer": "友だち", "explanation": "ともだち viết là 友だち (trở thành bạn bè)."},
                        {"id": 7, "prompt": "⑦ [だいがく] に はいります (Sẽ học lên đại học)", "options": ["大学", "高校", "学校", "中学"], "answer": "大学", "explanation": "だいがく viết là 大学 (trường đại học)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 はんたいの かんじ (Cặp chữ Hán đối lập trái nghĩa)",
                "instruction": "Quan sát tranh minh họa các khái niệm đối lập và chọn chữ Hán trái nghĩa tương ứng.",
                "image_url": "/assets/kanji/n5/minigames/chap7_minigame_p71.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 上 (うえ) <=> 下 (した)", "answer": "下"},
                    "questions": [
                        {"id": 1, "prompt": "1. Con voi to lớn [ ? ] <=> Chú voi con 小 (ちいさい)", "options": ["大", "高", "長", "多"], "answer": "大", "explanation": "Đại (大 - to lớn) đối lập với Tiểu (小 - nhỏ bé)."},
                        {"id": 2, "prompt": "2. Trẻ em 子ども <=> Người lớn [ ? ]", "options": ["大人 (おとな)", "大生", "男の人", "大男"], "answer": "大人 (おとな)", "explanation": "子ども (trẻ em) đối lập với 大人 (người lớn)."},
                        {"id": 3, "prompt": "3. Cửa ra [ ? ] <=> Cửa vào 入り口 (いりぐち)", "options": ["出口 (でぐち)", "門 (もん)", "大口", "山口"], "answer": "出口 (でぐち)", "explanation": "出口 (lối ra) đối lập với 入り口 (lối vào)."},
                        {"id": 4, "prompt": "4. Dưa lưới 30,000 yên [ ? ] い <=> Táo 100 yên やすい", "options": ["高", "大", "長", "新"], "answer": "高", "explanation": "高い (đắt tiền) đối lập với やすい (rẻ tiền)."},
                        {"id": 5, "prompt": "5. Bước ra ngoài 出る <=> Bước vào trong [ ? ] る", "options": ["入", "立", "行", "来"], "answer": "入", "explanation": "出る (đi ra) đối lập với 入る (đi vào)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 8: かぞく (Trang 78, 79)
        # =========================================================================
        8: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 えを みて かんじを かきましょう (Bức tranh công viên gia đình)",
                "instruction": "Quan sát bức tranh toàn cảnh một ngày nắng đẹp tại công viên, chọn chữ Hán tương ứng với các số từ ① đến ⑩.",
                "image_url": "/assets/kanji/n5/minigames/chap8_minigame_p78.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Người bố dắt tay con", "answer": "お父さん (おとうさん)"},
                    "questions": [
                        {"id": 1, "prompt": "Số 1: Người mẹ dắt tay con nhỏ", "options": ["お母さん", "お姉さん", "女の人", "女の子"], "answer": "お母さん", "explanation": "Người mẹ là お母さん (お母さん)."},
                        {"id": 2, "prompt": "Số 2: Đứa con nhỏ đi giữa bố và mẹ", "options": ["子ども", "男の子", "女の子", "赤ちゃん"], "answer": "子ども", "explanation": "Đứa trẻ, con cái là 子ども (こども)."},
                        {"id": 3, "prompt": "Số 3: Người đàn ông ngồi đọc báo trên ghế đá", "options": ["男の人", "女の人", "お父さん", "先生"], "answer": "男の人", "explanation": "Người đàn ông là 男の人 (おとこのひと)."},
                        {"id": 4, "prompt": "Số 4: Người phụ nữ đi dạo bên bồn hoa", "options": ["女の人", "男の人", "お母さん", "女の子"], "answer": "女の人", "explanation": "Người phụ nữ là 女の人 (おんなのひと)."},
                        {"id": 5, "prompt": "Số 5: Cậu bé đang tung tăng chạy đuổi bắt chú cún", "options": ["男の子", "女の子", "子ども", "男子"], "answer": "男の子", "explanation": "Bé trai là 男の子 (おとこのこ)."},
                        {"id": 6, "prompt": "Số 6: Bé gái đang ngồi chơi xúc cát", "options": ["女の子", "男の子", "子ども", "女子"], "answer": "女の子", "explanation": "Bé gái là 女の子 (おんなのこ)."},
                        {"id": 7, "prompt": "Số 7: Nam sinh mặc đồng phục đi dạo", "options": ["男子学生", "女子学生", "高校生", "男の人"], "answer": "男子学生", "explanation": "Nam sinh là 男子学生 (だんしがくせい)."},
                        {"id": 8, "prompt": "Số 8: Nữ sinh mặc đồng phục đi cùng bạn", "options": ["女子学生", "男子学生", "高校生", "女の人"], "answer": "女子学生", "explanation": "Nữ sinh là 女子学生 (じょしがくせい)."},
                        {"id": 9, "prompt": "Số 9: Chú cún con đang vẫy đuôi", "options": ["犬", "鳥", "牛", "魚"], "answer": "犬", "explanation": "Con chó là 犬 (いぬ)."},
                        {"id": 10, "prompt": "Số 10: Chú chim bồ câu đậu trên cành cây", "options": ["鳥", "犬", "花", "木"], "answer": "鳥", "explanation": "Con chim là 鳥 (とり)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 えから できた かんじ (Hình vẽ tượng hình ra chữ Hán)",
                "instruction": "Nhìn tranh minh họa nguồn gốc tượng hình thời cổ đại và chọn chữ Hán chính xác.",
                "image_url": "/assets/kanji/n5/minigames/chap8_minigame_p79.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. Người cầm hai rìu đá bảo vệ gia đình = [ ? ]", "options": ["父", "母", "男", "力"], "answer": "父", "explanation": "Người cha cầm rìu đá quyền uy là chữ 父 (PHỤ)."},
                        {"id": 2, "prompt": "2. Đứa bé sơ sinh dang hai tay = [ ? ]", "options": ["子", "女", "人", "小"], "answer": "子", "explanation": "Đứa bé dang hai tay là chữ 子 (TỬ)."},
                        {"id": 3, "prompt": "3. Người phụ nữ quý phái khoanh tay khép nép = [ ? ]", "options": ["女", "母", "子", "友"], "answer": "女", "explanation": "Người phụ nữ hiền thục là chữ 女 (NỮ)."},
                        {"id": 4, "prompt": "4. Người mẹ quỳ bồng con bú mớm = [ ? ]", "options": ["母", "女", "父", "好"], "answer": "母", "explanation": "Người mẹ hiền từ là chữ 母 (MẪU)."},
                        {"id": 5, "prompt": "5. Ruộng lúa (田) + Sức lực (力) = [ ? ]", "options": ["男", "畑", "町", "校"], "answer": "男", "explanation": "Dùng sức trên đồng ruộng tạo nên chữ 男 (NAM)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 9: どうし-1 (Trang 86, 87)
        # =========================================================================
        9: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 どうしを えらびましょう (Chọn động từ thích hợp vào câu)",
                "instruction": "Quan sát tranh và ngữ cảnh giao tiếp, chọn động từ chữ Hán thích hợp điền vào câu.",
                "image_url": "/assets/kanji/n5/minigames/chap9_minigame_p86.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: [立] ってください (Xin mời đứng lên)", "answer": "立 (た)"},
                    "questions": [
                        {"id": 1, "prompt": "1. CDを [ ? ] きます (Nghe đĩa CD ca nhạc)", "options": ["聞", "見", "行", "来"], "answer": "聞", "explanation": "Nghe nhạc viết là 聞きます (ききます)."},
                        {"id": 2, "prompt": "2. アニメを [ ? ] ます (Xem phim hoạt hình)", "options": ["見", "聞", "立", "休"], "answer": "見", "explanation": "Xem hoạt hình viết là 見ます (みます)."},
                        {"id": 3, "prompt": "3. 日本へ [ ? ] ました (Đã đến Nhật Bản)", "options": ["来", "行", "帰", "見"], "answer": "来", "explanation": "Đến Nhật Bản viết là 来ました (きました)."},
                        {"id": 4, "prompt": "4. えいがかんへ [ ? ] きませんか (Cùng đi rạp chiếu phim không?)", "options": ["行", "来", "帰", "休"], "answer": "行", "explanation": "Đi đến rạp chiếu phim viết là 行きませんか (いきませんか)."},
                        {"id": 5, "prompt": "5. うちへ [ ? ] ります (Trở về nhà)", "options": ["帰", "行", "来", "立"], "answer": "帰", "explanation": "Về nhà viết là 帰ります (かえります)."},
                        {"id": 6, "prompt": "6. つかれましたね。すこし [ ? ] みませんか (Nghỉ một lát nhé?)", "options": ["休", "立", "見", "聞"], "answer": "休", "explanation": "Nghỉ ngơi viết là 休みませんか (やすみませんか)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 タイムスケジュール (Lịch trình sinh hoạt của 3 người bạn)",
                "instruction": "Dựa vào bảng thời gian biểu của Yo-san, Marin-san và Jake-san, xác định xem ai thực hiện các hoạt động sau.",
                "image_url": "/assets/kanji/n5/minigames/chap9_minigame_p87.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: あさ [しんぶん] を よみます (Đọc báo lúc 7:00)", "answer": "マリンさん"},
                    "questions": [
                        {"id": 1, "prompt": "1. まいにち 6じに うちへ [かえります] (Về nhà lúc 18:00)", "options": ["ジェイクさん", "ヨウさん", "マリンさん"], "answer": "ジェイクさん", "explanation": "Jake-san có lịch về nhà lúc 18:00: 18:00 うちへかえります."},
                        {"id": 2, "prompt": "2. あさ アルバイトに [いきます] (Đi làm thêm lúc 9:00)", "options": ["マリンさん", "ヨウさん", "ジェイクさん"], "answer": "マリンさん", "explanation": "Marin-san đi làm thêm lúc 9:00 sáng: 9:00 アルバイトへいきます."},
                        {"id": 3, "prompt": "3. テレビを [みます]。それから シャワーを あびます", "options": ["ジェイクさん", "ヨウさん", "マリンさん"], "answer": "ジェイクさん", "explanation": "Jake-san xem tivi lúc 20:00 rồi tắm lúc 22:00."},
                        {"id": 4, "prompt": "4. うちで おんがくを [ききます] (Nghe nhạc lúc 18:00)", "options": ["ヨウさん", "マリンさん", "ジェイクさん"], "answer": "ヨウさん", "explanation": "Yo-san nghe nhạc lúc 18:00: 18:00 おんがくをききます."},
                        {"id": 5, "prompt": "5. ごご 1じに がっこうへ [いきます] (Đến trường lúc 13:00)", "options": ["マリンさん", "ヨウさん", "ジェイクさん"], "answer": "マリンさん", "explanation": "Marin-san đến trường lúc 13:00: 13:00 がっこうへいきます."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 10: たべもの (Trang 94, 95)
        # =========================================================================
        10: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 かんじの まちがいさがし (Tìm lỗi sai trong chữ Hán)",
                "instruction": "Chữ Hán bên cạnh hình vẽ có một chi tiết bị viết sai. Hãy chọn chữ Hán chuẩn xác tương ứng với đồ ăn.",
                "image_url": "/assets/kanji/n5/minigames/chap10_minigame_p94.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Con bò 午 => Chữ đúng là gì?", "answer": "牛 (うし)"},
                    "questions": [
                        {"id": 1, "prompt": "1. Con cá: chữ vẽ thiếu nét chấm hỏa dưới đáy => Chữ đúng là gì?", "options": ["魚", "角", "亀", "鳥"], "answer": "魚", "explanation": "Con cá là chữ 魚 (NGƯ - さかな) với 4 nét chấm hỏa bên dưới."},
                        {"id": 2, "prompt": "2. Con sò/ốc: viết nhầm thành chữ 見 (Kiến) => Chữ đúng là gì?", "options": ["貝", "見", "目", "白"], "answer": "貝", "explanation": "Con sò/vỏ ốc là chữ 貝 (BỐI - かい)."},
                        {"id": 3, "prompt": "3. Bát cơm gạo trắng: viết nhầm thành chữ 采 => Chữ đúng là gì?", "options": ["米", "来", "木", "茶"], "answer": "米", "explanation": "Gạo là chữ 米 (MỄ - こめ)."},
                        {"id": 4, "prompt": "4. Tách trà xanh: viết nhầm bộ Mộc thành bộ Trúc => Chữ đúng là gì?", "options": ["茶", "草", "花", "菜"], "answer": "茶", "explanation": "Trà là chữ 茶 (TRÀ - おちゃ) với bộ Thảo trên đầu và bộ Mộc bên dưới."},
                        {"id": 5, "prompt": "5. Miếng thịt bò: viết nhầm thành chữ 内 (Nội) => Chữ đúng là gì?", "options": ["肉", "内", "円", "両"], "answer": "肉", "explanation": "Thịt là chữ 肉 (NHỤC - にく)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 だれの 子どもですか (Đứa bé là con của ai?)",
                "instruction": "Dựa vào gợi ý về giới tính và món ăn yêu thích của các ông bố bà mẹ, suy luận xem đứa bé số 1 đến 4 là con của ai.",
                "image_url": "/assets/kanji/n5/minigames/chap10_minigame_p95.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: Bé gái thích ăn thịt (肉)", "answer": "石田さん (いしださん)"},
                    "questions": [
                        {"id": 1, "prompt": "Bé 1: Bé gái thích uống trà xanh (お茶)", "options": ["山川さん", "山田さん", "竹中さん", "石川さん"], "answer": "山川さん", "explanation": "山川さん: わたしの子どもは女の子です。お茶が好きです。"},
                        {"id": 2, "prompt": "Bé 2: Bé trai thích ăn sò ốc (貝)", "options": ["石川さん", "田中さん", "竹中さん", "山田さん"], "answer": "石川さん", "explanation": "石川さん: わたしの子どもは男の子です。貝が好きです。"},
                        {"id": 3, "prompt": "Bé 3: Bé gái thích ăn cá (魚)", "options": ["山田さん", "山川さん", "石田さん", "田中さん"], "answer": "山田さん", "explanation": "山田さん: わたしの子どもは女の子です。魚が好きです。"},
                        {"id": 4, "prompt": "Bé 4: Bé trai thích ăn thịt (肉)", "options": ["田中さん", "竹中さん", "石田さん", "山川さん"], "answer": "田中さん", "explanation": "田中さん: わたしの子どもは男の子です。肉が好きです。"}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 11: しぜん-2 (Trang 104, 105)
        # =========================================================================
        11: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 えを みて かんじを かきましょう (Nhìn tranh đoán chữ Hán ghép)",
                "instruction": "Quan sát tranh các hiện tượng tự nhiên được tạo bởi sự kết hợp của nhiều yếu tố và chọn chữ Hán tương ứng.",
                "image_url": "/assets/kanji/n5/minigames/chap11_minigame_p104.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Mẹ bồng con yêu quý", "answer": "好 (すき)"},
                    "questions": [
                        {"id": 1, "prompt": "1. Ba cái cây hợp lại thành khu rừng rậm rạp", "options": ["森 (もり)", "林 (はやし)", "木 (き)", "本 (ほん)"], "answer": "森 (もり)", "explanation": "Ba cây 木 tạo thành chữ 森 (SÂM - khu rừng rậm)."},
                        {"id": 2, "prompt": "2. Hai cái cây đứng cạnh nhau tạo thành rặng cây", "options": ["林 (はやし)", "森 (もり)", "木 (き)", "竹 (たけ)"], "answer": "林 (はやし)", "explanation": "Hai cây 木 tạo thành chữ 林 (LÂM - rặng cây, rừng thưa)."},
                        {"id": 3, "prompt": "3. Lửa đốt trên ruộng đốt nương làm rẫy", "options": ["畑 (はたけ)", "田 (た)", "火 (ひ)", "林 (はやし)"], "answer": "畑 (はたけ)", "explanation": "Bộ Hỏa (火) ghép bộ Điền (田) tạo thành chữ 畑 (nương rẫy, ruộng khô)."},
                        {"id": 4, "prompt": "4. Ngọn núi bên trên mặt đá phẳng bên dưới", "options": ["岩 (いわ)", "山 (やま)", "石 (いし)", "田 (た)"], "answer": "岩 (いわ)", "explanation": "Núi 山 trên Đá 石 tạo thành chữ 岩 (NHAM - tảng đá lớn, vách đá)."},
                        {"id": 5, "prompt": "5. Mặt trời và mặt trăng cùng tỏa sáng", "options": ["明 (あかるい)", "暗 (くらい)", "日 (ひ)", "月 (つき)"], "answer": "明 (あかるい)", "explanation": "Nhật 日 và Nguyệt 月 cùng chiếu sáng tạo thành chữ 明 (MINH - sáng sủa)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 かんじの なかの かんじ (Bộ thủ A nằm trong chữ Hán B)",
                "instruction": "Xác định chữ Hán đơn A nằm bên trong chữ Hán phức tạp B.",
                "image_url": "/assets/kanji/n5/minigames/chap11_minigame_p105.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: Bộ Lực (力) có trong chữ nào?", "answer": "男 (NAM)"},
                    "questions": [
                        {"id": 1, "prompt": "1. Bộ Hỏa (火) nằm trong chữ nào?", "options": ["畑", "森", "暗", "岩"], "answer": "畑", "explanation": "Chữ 畑 gồm 火 (Hỏa) bên trái và 田 (Điền) bên phải."},
                        {"id": 2, "prompt": "2. Chữ Mộc (木) nằm trong chữ nào?", "options": ["森", "暗", "明", "岩"], "answer": "森", "explanation": "Chữ 森 gồm ba chữ 木 (Mộc) ghép lại."},
                        {"id": 3, "prompt": "3. Chữ Thạch (石) nằm trong chữ nào?", "options": ["岩", "畑", "森", "明"], "answer": "岩", "explanation": "Chữ 岩 gồm 山 ở trên và 石 ở dưới."},
                        {"id": 4, "prompt": "4. Chữ Âm (音) nằm trong chữ nào?", "options": ["暗", "明", "畑", "森"], "answer": "暗", "explanation": "Chữ 暗 gồm 日 ở trước và 音 ở sau (Ám - tối tăm)."},
                        {"id": 5, "prompt": "5. Chữ Nguyệt (月) nằm trong chữ nào?", "options": ["明", "暗", "岩", "男"], "answer": "明", "explanation": "Chữ 明 gồm 日 ở trước và 月 ở sau."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 12: どうし-2 (Trang 112, 113)
        # =========================================================================
        12: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 かんじの ぶひん (Ghép bộ phận tạo chữ Hán động từ)",
                "instruction": "Lấy các bộ phận trong khung để ghép với các nét cho sẵn, tạo thành chữ Hán chính xác trong câu.",
                "image_url": "/assets/kanji/n5/minigames/chap12_minigame_p112.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: でん[言] を おねがいします", "answer": "言 (伝言 - でんごん)"},
                    "questions": [
                        {"id": 1, "prompt": "1. [ ? ] み物は なにが いいですか (Đồ uống)", "options": ["飲", "食", "話", "買"], "answer": "飲", "explanation": "Đồ uống viết là 飲み物 (のみもの)."},
                        {"id": 2, "prompt": "2. でん [ ? ] を かけます (Gọi điện thoại)", "options": ["話", "言", "書", "読"], "answer": "話", "explanation": "Gọi điện thoại viết là 電話をかけます (でんわ)."},
                        {"id": 3, "prompt": "3. [ ? ] べに いきませんか (Đi ăn nhé?)", "options": ["食", "飲", "買", "見"], "answer": "食", "explanation": "Đi ăn viết là 食べに行きませんか (たべにいきませんか)."},
                        {"id": 4, "prompt": "4. じ [ ? ] で しらべます (Tra cứu bằng từ điển)", "options": ["書", "話", "言", "読"], "answer": "書", "explanation": "Từ điển viết là 辞書 (じしょ)."},
                        {"id": 5, "prompt": "5. スーパーで [ ? ] い物を します (Đi mua sắm)", "options": ["買", "食", "飲", "話"], "answer": "買", "explanation": "Mua sắm viết là 買い物 (かいもの)."},
                        {"id": 6, "prompt": "6. どく [ ? ] を します (Đọc sách)", "options": ["書", "話", "言", "読"], "answer": "書", "explanation": "Đọc sách viết là 読書 (どくしょ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 なにを していますか (Mọi người đang làm gì trong phòng khách?)",
                "instruction": "Quan sát bức tranh sinh hoạt phòng khách và chọn động từ mô tả chính xác hành động của từng người.",
                "image_url": "/assets/kanji/n5/minigames/chap12_minigame_p113.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. パットさんは 本を [ ? ] います (Cầm sách mở)", "options": ["読んで", "書いて", "見て", "買って"], "answer": "読んで", "explanation": "Pat đang đọc sách: 本を読んでいます (よんでいます)."},
                        {"id": 2, "prompt": "2. トムさんは でんわで [ ? ] います (Áp điện thoại vào tai)", "options": ["話して", "言って", "聞いて", "飲んで"], "answer": "話して", "explanation": "Tom đang nói chuyện điện thoại: 電話で話しています (はなしています)."},
                        {"id": 3, "prompt": "3. ロビンさんは ジュースを [ ? ] います (Bấm máy bán tự động)", "options": ["買って", "飲んで", "食べて", "話して"], "answer": "買って", "explanation": "Robin đang mua nước ở máy bán hàng: ジュースを買っています (かっています)."},
                        {"id": 4, "prompt": "4. マリーさんは 音がくを [ ? ] います (Đeo tai nghe nhắm mắt)", "options": ["聞いて", "話して", "読んで", "見て"], "answer": "聞いて", "explanation": "Marie đang nghe nhạc: 音楽を聞いています (きいています)."},
                        {"id": 5, "prompt": "5. ジムさんは おかしを [ ? ] います (Cầm gói bánh snack)", "options": ["食べて", "飲んで", "買って", "見て"], "answer": "食べて", "explanation": "Jim đang ăn bánh snack: お菓子を食べています (たべています)."},
                        {"id": 6, "prompt": "6. キャリーさんは お茶を [ ? ] います (Cầm ly trà đưa lên miệng)", "options": ["飲んで", "食べて", "買って", "話して"], "answer": "飲んで", "explanation": "Carrie đang uống tách trà: お茶を飲んでいます (のんでいます)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 13: 町 (Trang 120, 121)
        # =========================================================================
        13: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 のりものの クイズ (Câu đố về phương tiện giao thông)",
                "instruction": "Quan sát 3 loại phương tiện A (Tàu điện - 電車), B (Ô tô - 自動車), C (Xe đạp - 自転車) và chọn phương tiện đúng với từng câu miêu tả.",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p120.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: いちばん 大きい です (To lớn nhất)", "answer": "A (電車)"},
                    "questions": [
                        {"id": 1, "prompt": "1. 二つの タイヤで うごきます (Chạy bằng 2 bánh xe)", "options": ["C (自転車)", "A (電車)", "B (自動車)"], "answer": "C (自転車)", "explanation": "Chạy bằng 2 bánh xe là xe đạp (自転車 - じてんしゃ)."},
                        {"id": 2, "prompt": "2. 二人で のってはいけません (Không được chở 2 người)", "options": ["C (自転車)", "A (電車)", "B (自動車)"], "answer": "C (自転車)", "explanation": "Xe đạp ở Nhật luật cấm chở 2 người: C (自転車)."},
                        {"id": 3, "prompt": "3. 二十人 のることが できます (Chở được trên 20 người)", "options": ["A (電車)", "B (自動車)", "C (自転車)"], "answer": "A (電車)", "explanation": "Tàu điện chở được nhiều người cùng lúc: A (電車 - でんしゃ)."},
                        {"id": 4, "prompt": "4. ガソリンを つかいます (Sử dụng xăng dầu)", "options": ["B (自動車)", "A (電車)", "C (自転車)"], "answer": "B (自動車)", "explanation": "Ô tô chạy bằng xăng: B (自動車 - じどうしゃ)."},
                        {"id": 5, "prompt": "5. おさけを 飲んでも のることができます (Uống rượu say vẫn đi được)", "options": ["A (電車)", "B (自動車)", "C (自転車)"], "answer": "A (電車)", "explanation": "Hành khách uống rượu say vẫn được đi tàu điện: A (電車)."},
                        {"id": 6, "prompt": "6. 子どもも うんてんすることが できます (Trẻ em cũng tự lái được)", "options": ["C (自転車)", "A (電車)", "B (自動車)"], "answer": "C (自転車)", "explanation": "Trẻ con cũng tự đạp xe đạp được: C (自転車)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 かん字の けいさん (Phép toán đố chữ Kanji)",
                "instruction": "Thực hiện phép cộng/trừ các chữ Hán và nét bút để tạo ra chữ Hán hoàn chỉnh.",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p120.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 田 + 丁", "answer": "町 (まち)"},
                    "questions": [
                        {"id": 1, "prompt": "1. 土 + 寸 = [ ? ]", "options": ["寺", "町", "車", "東"], "answer": "寺", "explanation": "Bộ Thổ (土) + Thốn (寸) tạo thành chữ 寺 (TỰ - chùa)."},
                        {"id": 2, "prompt": "2. 二 + 日 + 丨 = [ ? ]", "options": ["車", "電", "東", "西"], "answer": "車", "explanation": "Nét ngang, chữ Nhật và nét sổ trục giữa tạo thành chữ 車 (XA - xe cộ)."},
                        {"id": 3, "prompt": "3. 西 - 一 = [ ? ]", "options": ["四", "口", "日", "目"], "answer": "四", "explanation": "Chữ 西 bỏ nét ngang trên đầu thành chữ 四 (TỨ - số 4)."},
                        {"id": 4, "prompt": "4. 雨 + 申 = [ ? ]", "options": ["電", "雪", "雲", "雷"], "answer": "電", "explanation": "Mưa 雨 kết hợp với sấm chớp 申 tạo thành chữ 電 (ĐIỆN)."},
                        {"id": 5, "prompt": "5. 十 + 冂 + (羊 - 一) = [ ? ]", "options": ["南", "東", "西", "北"], "answer": "南", "explanation": "Các bộ phận ghép lại tạo thành chữ 南 (NAM - hướng Nam)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 さくぶん: かまくらりょこう (Bài văn: Chuyến du lịch Kamakura)",
                "instruction": "Đọc bài văn kể về chuyến du lịch thị trấn cổ Kamakura của bạn Julia và chọn chữ Hán đúng.",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p121.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [せんげつ] の [やすみ] に ともだちと かまくらへ いきました", "options": ["先月 / 休み", "今月 / 毎日", "来月 / 休日", "先週 / 休み"], "answer": "先月 / 休み", "explanation": "せんげつ là 先月, やすみ là 休み."},
                        {"id": 2, "prompt": "② かまくらには ふるい [おてら] が たくさん あります", "options": ["お寺", "町", "高校", "学校"], "answer": "お寺", "explanation": "おてら là お寺 (ngôi chùa)."},
                        {"id": 3, "prompt": "③ [とうきょう] から [でんしゃ] で 1じかんでした", "options": ["東京 / 電車", "東 / 車", "町 / 自動車", "東京 / 自転車"], "answer": "東京 / 電車", "explanation": "とうきょう là 東京, でんしゃ là 電車."},
                        {"id": 4, "prompt": "④ えきで [じてんしゃ] を かりて いろいろな ばしょへ いきました", "options": ["自転車", "自動車", "電車", "車"], "answer": "自転車", "explanation": "じてんしゃ là 自転車 (xe đạp)."},
                        {"id": 5, "prompt": "⑤ [ゆうめい] な そばやで ひるごはんを [たべました]", "options": ["有名 / 食べました", "名 / 飲みました", "有名 / 買いました", "大名 / 行きました"], "answer": "有名 / 食べました", "explanation": "ゆうめい là 有名, たべました là 食べました."},
                        {"id": 6, "prompt": "⑥ ごはんを たべて うみへ いきました。きれいな [かい] を ひろいました", "options": ["貝", "魚", "石", "花"], "answer": "貝", "explanation": "かい là 貝 (vỏ sò, vỏ ốc)."},
                        {"id": 7, "prompt": "⑦ おみやげも [かって] [かえりました]", "options": ["買って / 帰りました", "食べて / 行きました", "飲んで / 来ました", "持って / 帰りました"], "answer": "買って / 帰りました", "explanation": "かって là 買って, かえりました là 帰りました."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 14: 時間 (Trang 128, 129)
        # =========================================================================
        14: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 ふじ山りょこうの パンフレット (Tờ rơi du lịch núi Phú Sĩ)",
                "instruction": "Đọc tờ rơi quảng cáo tour leo núi Phú Sĩ và chọn chữ Hán chính xác điền vào cuộc trò chuyện đặt chỗ qua điện thoại.",
                "image_url": "/assets/kanji/n5/minigames/chap14_minigame_p128.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. もしもし、田中さん [いま] はなしても いいですか", "options": ["今", "時", "何", "半"], "answer": "今", "explanation": "いま viết là 今 (hiện tại, bây giờ)."},
                        {"id": 2, "prompt": "2. はい、[なん] ですか", "options": ["何", "今", "時", "方"], "answer": "何", "explanation": "なん viết là 何 (chuyện gì vậy)."},
                        {"id": 3, "prompt": "3. 30にちは [なん] ようびですか", "options": ["何", "今", "時", "日"], "answer": "何", "explanation": "なんようび viết là 何曜日 (thứ mấy)."},
                        {"id": 4, "prompt": "4. [ど] ようびです (Thứ 7)", "options": ["土", "日", "月", "金"], "answer": "土", "explanation": "どようび viết là 土曜日 (thứ Bảy)."},
                        {"id": 5, "prompt": "5. [なんじ] の バスですか", "options": ["何時", "今時", "何分", "何日"], "answer": "何時", "explanation": "なんじ viết là 何時 (mấy giờ)."},
                        {"id": 6, "prompt": "6. 9じ [はん] です (9 giờ 30 phút)", "options": ["半", "分", "今", "時"], "answer": "半", "explanation": "はん viết là 半 (9:30 - rưỡi)."},
                        {"id": 7, "prompt": "7. [おとな] は 一人 7,500えんですよ", "options": ["大人", "高校生", "学生", "大男"], "answer": "大人", "explanation": "おとな viết là 大人 (người lớn)."},
                        {"id": 8, "prompt": "8. そうですね。[きょう] ARCツアーに [でんわ] して よやくします", "options": ["今日 / 電話", "毎日 / 電車", "今 / 会話", "休日 / 電話"], "answer": "今日 / 電話", "explanation": "きょう là 今日, でんわ là 電話."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 じかんの しつもん (Câu hỏi trắc nghiệm thời gian)",
                "instruction": "Đọc câu hỏi về các mốc thời gian và chọn cách đọc Romaji / Kanji chuẩn xác.",
                "image_url": "/assets/kanji/n5/minigames/chap14_minigame_p129.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. いつも [何時] に おきますか (Cách đọc chữ 何時)", "options": ["なんじ", "なにじ", "いつじ", "なんとき"], "answer": "なんじ", "explanation": "何時 đọc là なんじ (mấy giờ)."},
                        {"id": 2, "prompt": "2. しゅみは [何] ですか (Cách đọc chữ 何)", "options": ["なん", "なに", "いつ", "どう"], "answer": "なん", "explanation": "何ですか đọc là なんですか."},
                        {"id": 3, "prompt": "3. [今日] の ごご [時間] が ありますか", "options": ["きょう / じかん", "こんにち / とき", "いま / じかん", "きょう / とき"], "answer": "きょう / じかん", "explanation": "今日 là きょう, 時間 là じかん."},
                        {"id": 4, "prompt": "4. [今] いちばん [何] が ほしいですか", "options": ["いま / なに", "きょう / なん", "こん / なに", "いま / なん"], "answer": "いま / なに", "explanation": "今 là いま, 何が đọc là なにが."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 15: けいようし (Trang 136, 137)
        # =========================================================================
        15: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 ヒントを よんで かんじを かきましょう (Đọc gợi ý chọn tính từ)",
                "instruction": "Đọc tình huống và gợi ý bên cạnh bức tranh, chọn chữ Hán tính từ thích hợp điền vào câu.",
                "image_url": "/assets/kanji/n5/minigames/chap15_minigame_p136.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. あの レストランは おきゃくさんが [ ? ] ないですね。(ヒント: あまり 人が いません)", "options": ["少", "多", "安", "新"], "answer": "少", "explanation": "Ít khách viết là 少ない (すくない)."},
                        {"id": 2, "prompt": "2. しぶやは わかい 人が [ ? ] い まちです。(ヒント: たくさん 人が います)", "options": ["多", "少", "高", "長"], "answer": "多", "explanation": "Nhiều người viết là 多い (おおい)."},
                        {"id": 3, "prompt": "3. わたしの 車は [ ? ] しいです。(ヒント: 3日まえに 買いました)", "options": ["新", "古", "安", "長"], "answer": "新", "explanation": "Mới mua 3 ngày trước là xe mới: 新しい (あたらしい)."},
                        {"id": 4, "prompt": "4. わたしの とけいは とても [ ? ] いです。(ヒント: 10年まえに もらいました)", "options": ["古", "新", "安", "少"], "answer": "古", "explanation": "Đồng hồ từ 10 năm trước là đồng hồ cũ: 古い (ふるい)."},
                        {"id": 5, "prompt": "5. このりんごは とても [ ? ] かったです。(ヒント: 400円 => 200円でした)", "options": ["安", "高", "新", "少"], "answer": "安", "explanation": "Giảm còn 200 yên là rẻ: 安かった (やすかった)."},
                        {"id": 6, "prompt": "6. このゆびわは とても [ ? ] かったです。(ヒント: 500,000円)", "options": ["高", "安", "新", "長"], "answer": "高", "explanation": "Nhẫn kim cương 500,000 yên là đắt: 高かった (たかかった)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 トムさんの 子どもの さくぶん (Bài giới thiệu con gái của Tom)",
                "instruction": "Đọc bài giới thiệu về cô con gái Marie đáng yêu của Tom và chọn chữ Hán tương ứng.",
                "image_url": "/assets/kanji/n5/minigames/chap15_minigame_p137.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① わたしの [こども] の [なまえ] は マリーです", "options": ["子ども / 名前", "女の子 / 名", "学生 / 名前", "大人 / 名"], "answer": "子ども / 名前", "explanation": "こども là 子ども, なまえ là 名前."},
                        {"id": 2, "prompt": "② [ことし] 5さいです (Năm nay 5 tuổi)", "options": ["今年", "来年", "去年", "毎日"], "answer": "今年", "explanation": "ことし viết là 今年 (năm nay)."},
                        {"id": 3, "prompt": "③ かみが [ながくて] かわいい [おんなのこ] です", "options": ["長くて / 女の子", "古くて / 女の人", "高くて / 子ども", "多くて / 女の子"], "answer": "長くて / 女の子", "explanation": "ながくて là 長くて (tóc dài), おんなのこ là 女の子."},
                        {"id": 4, "prompt": "④ [すこし] せが [たかい] です (Hơi cao một chút)", "options": ["少し / 高い", "少ない / 長い", "多く / 大きい", "少し / 新しい"], "answer": "少し / 高い", "explanation": "すこし là 少し, たかい là 高い."},
                        {"id": 5, "prompt": "⑤ いつも [げんき] です (Lúc nào cũng khỏe khoắn vui vẻ)", "options": ["元気", "人気", "天気", "気分"], "answer": "元気", "explanation": "げんき viết là 元気 (khỏe khoắn, hoạt bát)."},
                        {"id": 6, "prompt": "⑥ わたしと つまは 少し [あんしん] しました (Chúng tôi đã an tâm hơn)", "options": ["安心", "安全", "安売り", "心情"], "answer": "安心", "explanation": "あんしん viết là 安心 (an tâm, nhẹ nhõm)."}
                    ]
                }
            }
        ]
    }

    # Thực hiện seed vào database
    for ch_num, games in FULL_MINIGAMES.items():
        cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch_num,))
        row = cur.fetchone()
        if not row:
            print(f"Chapter {ch_num} not found!")
            continue
        ch_id = row[0]

        # Xóa minigames cũ của chương này
        cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))

        for g in games:
            cur.execute("""
                INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
            """, (
                ch_id,
                g["game_type"],
                g["title"],
                g["instruction"],
                g["image_url"],
                json.dumps(g["data"], ensure_ascii=False),
                g["display_order"]
            ))

        print(f"Chapter {ch_num}: Successfully seeded {len(games)} authentic minigames!")

    conn.commit()
    print("=" * 70)
    print("ALL MINIGAMES FOR CHAPTERS 5 TO 15 FULLY COMMITTED!")
    print("=" * 70)

except Exception as e:
    conn.rollback()
    print(f"Error seeding minigames: {e}")
    raise
finally:
    cur.close()
    conn.close()
