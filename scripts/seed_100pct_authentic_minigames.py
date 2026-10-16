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
    print("=" * 80)
    print("SEEDING 100% COMPLETE & AUTHENTIC MINIGAMES (CH 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)")
    print("MATCHING 100% OF QUESTIONS IN THE OFFICIAL KANJI MASTER TEXTBOOK")
    print("=" * 80)

    # Dictionary containing all updated chapters
    AUTHENTIC_MINIGAMES = {
        # =========================================================================
        # CHƯƠNG 2: じかん-1 (Trang 28, 29)
        # =========================================================================
        2: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Đoán tháng theo sự kiện lễ hội — Trang 28",
                "instruction": "Quan sát các bức tranh sự kiện ở bài 【1】 trang 28 và chọn tháng (四月, 六月, 十一月, 十二月) tương ứng.",
                "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p28.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. つゆ (Mùa mưa Nhật Bản, hoa cẩm tú cầu & ốc sên):", "options": ["六月 (ろくがつ)", "四月 (しがつ)", "八月 (はちがつ)", "十二月 (じゅうにがつ)"], "answer": "六月 (ろくがつ)", "explanation": "Mùa mưa (つゆ) ở Nhật Bản diễn ra vào tháng 6 (六月)."},
                        {"id": 2, "prompt": "2. 七五三 (Lễ hội Shichi-Go-San cho trẻ em 3, 5, 7 tuổi tại đền thần):", "options": ["十一月 (じゅういちがつ)", "三月 (さんがつ)", "七月 (しちがつ)", "五月 (ごがつ)"], "answer": "十一月 (じゅういちがつ)", "explanation": "Lễ hội Shichi-Go-San (七五三) được tổ chức vào ngày 15 tháng 11 (十一月)."},
                        {"id": 3, "prompt": "3. クリスマス (Lễ Giáng sinh - Ông già Noel chui ống khói):", "options": ["十二月 (じゅうにがつ)", "十月 (じゅうがつ)", "十一月 (じゅういちがつ)", "一月 (いちがつ)"], "answer": "十二月 (じゅうにがつ)", "explanation": "Giáng sinh (クリスマス) diễn ra vào tháng 12 (十二月)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Ngày & Tháng lễ hội truyền thống — Trang 28",
                "instruction": "Nhìn tranh gợi ý bài 【2】 trang 28 để nhận diện ngày tháng diễn ra các ngày hội Nhật Bản.",
                "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p28.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. ひなまつり (Lễ hội búp bê Hina Matsuri - Mar.):", "options": ["三月三日 (さんがつ みっか)", "三月一日 (さんがつ ついたち)", "五月五日 (ごがつ いつか)", "七月七日 (しちがつ なのか)"], "answer": "三月三日 (さんがつ みっか)", "explanation": "Lễ hội Hina Matsuri diễn ra vào ngày 3 tháng 3 (三月三日)."},
                        {"id": 2, "prompt": "2. こどものひ (Ngày thiếu nhi, treo cờ cá chép Koinobori - May):", "options": ["五月五日 (ごがつ いつか)", "五月一日 (ごがつ ついたち)", "四月四日 (しがつ よっか)", "六月六日 (ろくがつ むいか)"], "answer": "五月五日 (ごがつ いつか)", "explanation": "Ngày của bé こどもの日 là ngày 5 tháng 5 (五月五日)."},
                        {"id": 3, "prompt": "3. たなばた (Lễ Thất tịch ngắm sao Tanabata - Jul.):", "options": ["七月七日 (しちがつ なのか)", "七月三日 (しちがつ みっか)", "八月八日 (はちがつ ようか)", "九月九日 (くがつ ここのか)"], "answer": "七月七日 (しちがつ なのか)", "explanation": "Lễ Thất tịch Tanabata diễn ra vào ngày 7 tháng 7 (七月七日)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 3: Điền lịch biểu & Lịch làm việc tháng 9 — Trang 29",
                "instruction": "Dựa vào tờ lịch tháng 9 (9月) ở bài 【3】 trang 29 để điền thứ và trả lời lịch trình tương ứng với đầy đủ 10 câu hỏi.",
                "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p29.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "Cột ① (đứng sau Chủ Nhật 日): Thứ Hai viết bằng chữ Hán là:", "options": ["月 (げつ)", "火 (か)", "水 (すい)", "木 (もく)"], "answer": "月 (げつ)", "explanation": "Thứ Hai là 月曜日, viết chữ Hán là 月."},
                        {"id": 2, "prompt": "Cột ②: Thứ Ba viết bằng chữ Hán là:", "options": ["火 (か)", "月 (げつ)", "水 (すい)", "金 (きん)"], "answer": "火 (か)", "explanation": "Thứ Ba là 火曜日, viết chữ Hán là 火."},
                        {"id": 3, "prompt": "Cột ③: Thứ Tư viết bằng chữ Hán là:", "options": ["水 (すい)", "木 (もく)", "金 (きん)", "土 (ど)"], "answer": "水 (すい)", "explanation": "Thứ Tư là 水曜日, viết chữ Hán là 水."},
                        {"id": 4, "prompt": "Cột ④: Thứ Năm viết bằng chữ Hán là:", "options": ["木 (もく)", "水 (すい)", "金 (きん)", "日 (にち)"], "answer": "木 (もく)", "explanation": "Thứ Năm là 木曜日, viết chữ Hán là 木."},
                        {"id": 5, "prompt": "Cột ⑤: Thứ Sáu viết bằng chữ Hán là:", "options": ["金 (きん)", "木 (もく)", "土 (ど)", "火 (か)"], "answer": "金 (きん)", "explanation": "Thứ Sáu là 金曜日, viết chữ Hán là 金."},
                        {"id": 6, "prompt": "Cột ⑥: Thứ Bảy viết bằng chữ Hán là:", "options": ["土 (ど)", "金 (きん)", "日 (にち)", "月 (げつ)"], "answer": "土 (ど)", "explanation": "Thứ Bảy là 土曜日, viết chữ Hán là 土."},
                        {"id": 7, "prompt": "⑦ なんがつですか (Tiêu đề tờ lịch là tháng mấy?):", "options": ["九月 (くがつ)", "八月 (はちがつ)", "七月 (しちがつ)", "十月 (じゅうがつ)"], "answer": "九月 (くがつ)", "explanation": "Tờ lịch ghi rõ 9月, đọc là 九月 (くがつ)."},
                        {"id": 8, "prompt": "⑧ たんじょうびは なんにちですか。なんようびですか (Sinh nhật ngày 20):", "options": ["二十日 (はつか) / 火曜日", "二十日 (にじゅうにち) / 月曜日", "十九日 (じゅうくにち) / 火曜日", "二十一日 (にじゅういちにち) / 水曜日"], "answer": "二十日 (はつか) / 火曜日", "explanation": "Ngày 20 là 二十日 (はつか), dóng lên cột ② là 火曜日 (かようび)."},
                        {"id": 9, "prompt": "⑨ テストは なんにちですか。なんようびですか (Bài kiểm tra ngày 16):", "options": ["十六日 (じゅうろくにち) / 金曜日", "十六日 (じゅうろくにち) / 土曜日", "十五日 (じゅうごにち) / 木曜日", "十七日 (じゅうななにち) / 土曜日"], "answer": "十六日 (じゅうろくにち) / 金曜日", "explanation": "Ngày 16 là 十六日 (じゅうろくにち), dóng lên cột ⑤ là 金曜日 (きんようび)."},
                        {"id": 10, "prompt": "⑩ たなかさんと しょくじに いきます。なんにちですか。なんようびですか (Đi ăn ngày 24):", "options": ["二十四日 (にじゅうよっか) / 土曜日", "二十四日 (にじゅうよんにち) / 金曜日", "二十五日 (にじゅうごにち) / 日曜日", "二十三日 (にじゅうさんにち) / 金曜日"], "answer": "二十四日 (にじゅうよっか) / 土曜日", "explanation": "Ngày 24 là 二十四日 (にじゅうよっか), dóng lên cột ⑥ là 土曜日 (どようび)."}
                    ]
                }
            }
        ],

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
                        {"id": 2, "prompt": "2. 丨 + 冂 + 一 + 丨", "options": ["中", "内", "口", "日"], "answer": "中", "explanation": "Hình chữ nhật có nét sổ dọc xuyên chính giữa tâm tạo thành chữ 中 (TRUNG - bên trong)."},
                        {"id": 3, "prompt": "3. 夕 + 卜", "options": ["外", "多", "夕", "名"], "answer": "外", "explanation": "Bộ Tịch (夕) kết hợp với bộ Bặc (卜) tạo thành chữ 外 (NGOẠI - bên ngoài)."},
                        {"id": 4, "prompt": "4. 一 + 丿 + 口", "options": ["右", "左", "石", "友"], "answer": "右", "explanation": "Nét ngang phiệt kết hợp bộ Khẩu (口) tạo thành chữ 右 (HỮU - bên phải). Theo đáp án sách: 4. 右."},
                        {"id": 5, "prompt": "5. 冂 + 人 (丿 + 丶)", "options": ["内", "肉", "円", "中"], "answer": "内", "explanation": "Bộ Quynh (冂) bao quanh nét phẩy và nét chấm tạo thành chữ 内 (NỘI - bên trong)."}
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
                        {"id": 5, "prompt": "5. へやの [ ? ] の いすの [ ? ] に くつが [ ? ] あります。", "options": ["中 / 下 / 一そく", "外 / 上 / 二そく", "中 / 上 / 一そく", "内 / 中 / 三そく"], "answer": "中 / 下 / 一そく", "explanation": "Dưới chân ghế trong phòng có 1 đôi giày: へやの中のいすの下にくつが一そくあります。"}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじを かきましょう (Đoạn văn 'Trường học của tôi')",
                "instruction": "Đọc bài văn ngắn giới thiệu về trường học và chọn chữ Hán tương ứng với đầy đủ 11 vị trí gạch chân từ ① đến ⑪.",
                "image_url": "/assets/kanji/n5/minigames/chap5_minigame_p53.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① がくせいは かいだんで [あがり] ます", "options": ["上がります", "下がります", "出ます", "入ります"], "answer": "上がります", "explanation": "あがります viết bằng chữ 上: 上がります (đi lên lầu)."},
                        {"id": 2, "prompt": "② がっこうの [なか] に じどうはんばいきが あります", "options": ["中", "内", "外", "間"], "answer": "中", "explanation": "なかに viết là 中に (bên trong)."},
                        {"id": 3, "prompt": "③ [みぎ] が おとこのひとの トイレです", "options": ["右", "左", "外", "上"], "answer": "右", "explanation": "みぎ viết là 右 (bên phải)."},
                        {"id": 4, "prompt": "④ みぎが おとこの [ひと] の トイレです", "options": ["人", "男", "子", "友"], "answer": "人", "explanation": "おとこのひと viết là 男の人 (người nam, đàn ông)."},
                        {"id": 5, "prompt": "⑤ [ひだり] が おんなのひとの トイレです", "options": ["左", "右", "外", "下"], "answer": "左", "explanation": "ひだり viết là 左 (bên trái)."},
                        {"id": 6, "prompt": "⑥ ひだりが おんなの [ひと] の トイレです", "options": ["人", "女", "子", "友"], "answer": "人", "explanation": "おんなのひと viết là 女の人 (người nữ, phụ nữ)."},
                        {"id": 7, "prompt": "⑦ こう [ない] は きんえんです (Trong khuôn viên trường)", "options": ["内", "中", "校", "外"], "answer": "内", "explanation": "こうない viết là 校内 (trong khuôn viên trường)."},
                        {"id": 8, "prompt": "⑧ きょうしつの [そと] の ベランダで やすみます", "options": ["外", "中", "内", "下"], "answer": "外", "explanation": "そと viết là 外 (bên ngoài ban công)."},
                        {"id": 9, "prompt": "⑨ ベランダから [した] を みます", "options": ["下", "上", "中", "外"], "answer": "下", "explanation": "した viết là 下 (phía dưới sân)."},
                        {"id": 10, "prompt": "⑩ [ひと] が たくさん あるいています", "options": ["人", "男", "女", "生"], "answer": "人", "explanation": "ひと viết là 人 (nhiều người đang đi lại)."},
                        {"id": 11, "prompt": "⑪ [いちにちじゅう] がっこうに います", "options": ["一日中", "毎日", "休日", "今週"], "answer": "一日中", "explanation": "いちにちじゅう viết là 一日中 (suốt cả một ngày)."}
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
                "instruction": "Quan sát bức tranh trường học và lớp học, chọn chữ Hán chuẩn xác tương ứng với đầy đủ 6 vị trí ① đến ⑥.",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p62.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "Vị trí ①: Toàn bộ tòa nhà trường học chính", "options": ["学校", "学生", "高校", "大学"], "answer": "学校", "explanation": "Ngôi trường viết là 学校 (がっこう)."},
                        {"id": 2, "prompt": "Vị trí ②: Nhà thi đấu thể dục thể thao ([ ? ] いくかん)", "options": ["体", "休", "本", "生"], "answer": "体", "explanation": "たいいくかん viết là 体育館 (chữ 体 trong 体力, 体育)."},
                        {"id": 3, "prompt": "Vị trí ③: Học sinh nữ giơ tay phát biểu trong lớp", "options": ["学生", "先生", "高校生", "子供"], "answer": "学生", "explanation": "Học sinh/sinh viên viết là 学生 (がくせい)."},
                        {"id": 4, "prompt": "Vị trí ④: Quyển sách giáo trình đặt trên bàn học", "options": ["本", "字", "手", "休"], "answer": "本", "explanation": "Quyển sách viết là 本 (ほん). Theo đáp án sách: ④ 本."},
                        {"id": 5, "prompt": "Vị trí ⑤: Chữ viết chữ Hán trên bảng đen (かん [ ? ])", "options": ["字", "本", "名", "文"], "answer": "字", "explanation": "Chữ Hán trên bảng viết là 漢字 (かんじ), chữ 字. Theo đáp án sách: ⑤ かん字."},
                        {"id": 6, "prompt": "Vị trí ⑥: Giáo viên đang đứng giảng bài bên bảng đen", "options": ["先生", "学生", "校長", "大人"], "answer": "先生", "explanation": "Cô giáo giảng bài là 先生 (せんせい)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 おはなみの さくぶん (Đoạn văn ngắm hoa anh đào)",
                "instruction": "Đọc bài văn ngắm hoa anh đào cùng thầy cô và bạn bè, chọn chữ Hán đúng cho đầy đủ 9 vị trí từ ① đến ⑨.",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p62.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [せんげつ] アークアカデミーで おはなみを しました", "options": ["先月", "今月", "来月", "毎月"], "answer": "先月", "explanation": "せんげつ viết là 先月 (tháng trước)."},
                        {"id": 2, "prompt": "② お [はな] みを しました", "options": ["花", "月", "見", "木"], "answer": "花", "explanation": "おはなみ viết là お花み (ngắm hoa anh đào)."},
                        {"id": 3, "prompt": "③ [せんせい] が じゅうにんと...", "options": ["先生", "学生", "校長", "先月"], "answer": "先生", "explanation": "せんせい viết là 先生 (thầy cô giáo)."},
                        {"id": 4, "prompt": "④ せんせいが [じゅうにん] と...", "options": ["十人", "三人", "二十人", "千人"], "answer": "十人", "explanation": "じゅうにん viết là 十人 (10 người)."},
                        {"id": 5, "prompt": "⑤ [がくせい] が さんじゅうにん いました", "options": ["学生", "先生", "高校生", "学校"], "answer": "学生", "explanation": "がくせい viết là 学生 (học sinh, học viên)."},
                        {"id": 6, "prompt": "⑥ がくせいが [さんじゅうにん] いました", "options": ["三十人", "三人", "十人", "三十"], "answer": "三十人", "explanation": "さんじゅうにん viết là 三十人 (30 người)."},
                        {"id": 7, "prompt": "⑦ [こう] ちょうせんせいの いなりずしを たべました", "options": ["校", "学", "高", "長"], "answer": "校", "explanation": "こうちょう viết là 校ちょう (thầy hiệu trưởng)."},
                        {"id": 8, "prompt": "⑧ [にほん] へ きて はじめて さくらを みました", "options": ["日本", "毎日", "休日", "本"], "answer": "日本", "explanation": "にほん viết là 日本 (Nhật Bản)."},
                        {"id": 9, "prompt": "⑨ とても たのしい [ひ] でした", "options": ["日", "月", "年", "時"], "answer": "日", "explanation": "ひ viết là 日 (ngày, một ngày vui vẻ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじの たしざんです (Phép cộng bộ thủ tạo chữ Kanji)",
                "instruction": "Ghép các bộ thủ theo công thức cộng trong sách để tạo thành từ vựng có nghĩa tương ứng (đầy đủ 6 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap6_minigame_p63.webp",
                "display_order": 3,
                "data": {
                    "example": {"prompt": "れい: (木 + 交) + ちょう", "answer": "校ちょう (こうちょう)"},
                    "questions": [
                        {"id": 1, "prompt": "1. (夕 + 口) + まえ = [ ? ] まえ ( [ ? ] まえ )", "options": ["名まえ (なまえ)", "右まえ (みぎまえ)", "見まえ (みまえ)", "口まえ (くちまえ)"], "answer": "名まえ (なまえ)", "explanation": "夕 + 口 = chữ 名 (Danh trong 名前 - なまえ - tên họ)."},
                        {"id": 2, "prompt": "2. も + (宀 + 子) = も [ ? ] ( も [ ? ] )", "options": ["も字 (もじ)", "も本 (もほん)", "も名 (もな)", "も体 (もたい)"], "answer": "も字 (もじ)", "explanation": "宀 + 子 = chữ 字 (Tự trong 文字/も字 - もじ - ký tự, con chữ)."},
                        {"id": 3, "prompt": "3. (丿 + 丨 + 木 + 一) + 力 = [ ? ] ( [ ? ] )", "options": ["体力 (たいりょく)", "休力 (きゅうりょく)", "本力 (ほんりき)", "体本 (たいほん)"], "answer": "体力 (たいりょく)", "explanation": "丿 + 丨 + 木 + 一 = 体 (Thể), cộng thêm 力 (Lực) = 体力 (たいりょく - thể lực). Theo đáp án sách: 3. 体力 (たいりょく)."},
                        {"id": 4, "prompt": "4. (口 + 一) + (木 + 一) = [ ? ] ( [ ? ] )", "options": ["日本 (にほん)", "白木 (しらき)", "目本 (めほん)", "田林 (たばやし)"], "answer": "日本 (にほん)", "explanation": "口 + 一 = 日, 木 + 一 = 本 -> Ghép lại thành 日本 (にほん - Nhật Bản). Theo đáp án sách: 4. 日本 (にほん)."},
                        {"id": 5, "prompt": "5. (ツ + 冖 + 子) + (丿 + 一 + 丨 + 一 + 一) = [ ? ] ( [ ? ] )", "options": ["学生 (がくせい)", "先生 (せんせい)", "学校 (がっこう)", "生徒 (せいと)"], "answer": "学生 (がくせい)", "explanation": "Vế 1: 学 (ツ + 冖 + 子), Vế 2: 生 (丿 + 一 + 丨 + 一 + 一) -> Tạo thành 学生 (がくせい - học sinh). Theo đáp án sách: 5. 学生 (がくせい)."},
                        {"id": 6, "prompt": "6. (丿 + 土 + 儿) + (丿 + 一 + 丨 + 一 + 一) = [ ? ] ( [ ? ] )", "options": ["先生 (せんせい)", "学生 (がくせい)", "校生 (こうせい)", "先輩 (せんぱい)"], "answer": "先生 (せんせい)", "explanation": "Vế 1: 先 (丿 + 土 + 儿), Vế 2: 生 (丿 + 一 + 丨 + 一 + 一) -> Tạo thành 先生 (せんせい - giáo viên). Theo đáp án sách: 6. 先生 (せんせい)."}
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
                "instruction": "Đọc bài văn kể về ngày lễ khai giảng nhập học, điền đầy đủ 20 chữ Hán tương ứng từ ① đến ⑳.",
                "image_url": "/assets/kanji/n5/minigames/chap7_minigame_p70.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [にゅうがく] しき でした (Lễ nhập học)", "options": ["入学", "大学", "見学", "休学"], "answer": "入学", "explanation": "にゅうがく viết là 入学 (Nhập học)."},
                        {"id": 2, "prompt": "② えきは とても [おお] きいですから (Nhà ga rất to lớn)", "options": ["大", "小", "高", "広"], "answer": "大", "explanation": "おおきい viết là 大きい, chữ 大."},
                        {"id": 3, "prompt": "③ [でぐち] が わかりませんでした (Không biết lối ra)", "options": ["出口", "入口", "門", "山口"], "answer": "出口", "explanation": "でぐち viết là 出口 (cửa ra, lối ra)."},
                        {"id": 4, "prompt": "④ [こうこうせい] に ききました (Hỏi học sinh cấp 3)", "options": ["高校生", "大学生", "先生", "小学生"], "answer": "高校生", "explanation": "こうこうせい viết là 高校生 (học sinh cấp 3)."},
                        {"id": 5, "prompt": "⑤ 5ふん あるいて [がっこう] に つきました", "options": ["学校", "高校", "大学", "校門"], "answer": "学校", "explanation": "がっこう viết là 学校 (ngôi trường)."},
                        {"id": 6, "prompt": "⑥ きょうしつに [はい] って いすに すわりました", "options": ["入", "出", "立", "行"], "answer": "入", "explanation": "はいって viết là 入って (bước vào trong lớp)."},
                        {"id": 7, "prompt": "⑦ となりの [おんなのひと] と はなしを しました", "options": ["女の人", "男の人", "友達", "先生"], "answer": "女の人", "explanation": "おんなのひと viết là 女の人 (người bạn nữ)."},
                        {"id": 8, "prompt": "⑧ [な] まえは エンさんです", "options": ["名", "字", "本", "目"], "answer": "名", "explanation": "なまえ viết là 名まえ (tên họ)."},
                        {"id": 9, "prompt": "⑨ エンさんは [こうこう] を そつぎょうして", "options": ["高校", "大学", "学校", "中学"], "answer": "高校", "explanation": "こうこう viết là 高校 (trường cấp 3)."},
                        {"id": 10, "prompt": "⑩ [にほん] へ きました", "options": ["日本", "本日", "休日", "毎日"], "answer": "日本", "explanation": "にほん viết là 日本 (Nhật Bản)."},
                        {"id": 11, "prompt": "⑪ わたしと エンさんは [とも] だちに なりました", "options": ["友", "有", "右", "同"], "answer": "友", "explanation": "ともだち viết là 友だち (bạn bè)."},
                        {"id": 12, "prompt": "⑫ アークアカデミーを そつぎょうして [だいがく] に はいります", "options": ["大学", "高校", "学校", "専門"], "answer": "大学", "explanation": "だいがく viết là 大学 (trường đại học)."},
                        {"id": 13, "prompt": "⑬ だいがくに [はい] ります", "options": ["入", "出", "行", "来"], "answer": "入", "explanation": "はいります viết là 入ります (nhập học, thi đỗ vào)."},
                        {"id": 14, "prompt": "⑭ わたしは [だいがく] いんに はいりたいです", "options": ["大学", "高校", "学校", "専門"], "answer": "大学", "explanation": "だいがくいん viết là 大学院 (viện cao học)."},
                        {"id": 15, "prompt": "⑮ だいがくいんに [はい] りたいです", "options": ["入", "出", "立", "学"], "answer": "入", "explanation": "はいりたい viết là 入りたい (muốn bước vào)."},
                        {"id": 16, "prompt": "⑯ まだ [せん] もんちしきが ありませんから", "options": ["門", "問", "間", "聞"], "answer": "門", "explanation": "せんもん viết là 専門 (chuyên môn)."},
                        {"id": 17, "prompt": "⑰ これから たくさん [ほん] を よまなければ なりません", "options": ["本", "体", "木", "休"], "answer": "本", "explanation": "ほん viết là 本 (sách vở)."},
                        {"id": 18, "prompt": "⑱ それから [にほん] ごの べんきょうと", "options": ["日本", "本日", "毎日", "本"], "answer": "日本", "explanation": "にほんご viết là 日本語 (tiếng Nhật)."},
                        {"id": 19, "prompt": "⑲ [にほん] ぶんかも まなびたいです", "options": ["日本", "本日", "東日", "休日"], "answer": "日本", "explanation": "にほんぶんか viết là 日本文化 (văn hóa Nhật)."},
                        {"id": 20, "prompt": "⑳ にほんぶんかも [まな] びたいです", "options": ["学", "校", "生", "習"], "answer": "学", "explanation": "まなびたい viết là 学びたい (muốn học hỏi, chữ 学 trong 学ぶ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 はんたいの かんじ (Cặp chữ Hán đối lập trái nghĩa)",
                "instruction": "Quan sát tranh minh họa đối lập và điền chữ Hán trái nghĩa tương ứng (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap7_minigame_p71.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 上 <=> 下 (Trên bàn <=> Dưới bàn)", "answer": "下"},
                    "questions": [
                        {"id": 1, "prompt": "1. [ ? ] <=> 小 (Voi mẹ to lớn <=> Voi con bé nhỏ)", "options": ["大", "高", "多", "長"], "answer": "大", "explanation": "Đại (大) đối lập với Tiểu (小)."},
                        {"id": 2, "prompt": "2. 子ども <=> [ ? ] (Trẻ em bé nhỏ <=> Người lớn)", "options": ["大人", "女の人", "男の人", "老人"], "answer": "大人", "explanation": "子ども (trẻ em) đối lập với 大人 (おとな - người lớn)."},
                        {"id": 3, "prompt": "3. [ ? ] <=> 入り口 (Lối ra mũi tên thoát <=> Lối vào)", "options": ["出口", "大口", "門", "窓口"], "answer": "出口", "explanation": "入り口 (lối vào) đối lập với 出口 (でぐち - lối ra)."},
                        {"id": 4, "prompt": "4. [ ? ] い <=> やすい (30,000 yên đắt đỏ <=> 100 yên giá rẻ)", "options": ["高", "大", "多", "新"], "answer": "高", "explanation": "やすい (rẻ) đối lập với 高い (たかい - đắt giá)."},
                        {"id": 5, "prompt": "5. 出る <=> [ ? ] る (Đi ra ngoài <=> Bước vào trong)", "options": ["入", "立", "来", "帰"], "answer": "入", "explanation": "出る (でる - đi ra) đối lập với 入る (はいる - đi vào)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 8: 人-2 (Trang 78, 79)
        # =========================================================================
        8: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 えを みて かんじを かきましょう (Bức tranh công viên gia đình)",
                "instruction": "Quan sát bức tranh công viên trang 78, chọn chữ Hán chính xác điền vào 10 ô trống tương ứng vị trí 1 đến 10.",
                "image_url": "/assets/kanji/n5/minigames/chap8_minigame_p78.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Vị trí [れい] (Người bố dắt tay con)", "answer": "お [父] さん"},
                    "questions": [
                        {"id": 1, "prompt": "1. Vị trí 1: お [ ? ] さん (Người mẹ dắt tay con đi chơi)", "options": ["母", "女", "父", "姉"], "answer": "母", "explanation": "Người mẹ là お母さん (おかあさん)."},
                        {"id": 2, "prompt": "2. Vị trí 2: [ ? ] ども (Em bé đi giữa bố và mẹ)", "options": ["子", "男", "女", "人"], "answer": "子", "explanation": "Đứa trẻ, con cái là 子ども (こども)."},
                        {"id": 3, "prompt": "3. Vị trí 3: [ ? ] の人 (Người đàn ông ngồi đọc báo trên ghế đá)", "options": ["男", "女", "父", "子"], "answer": "男", "explanation": "Người đàn ông là 男の人 (おとこのひと)."},
                        {"id": 4, "prompt": "4. Vị trí 4: [ ? ] の人 (Người phụ nữ mặc váy xách túi đi vào công viên)", "options": ["女", "母", "男", "子"], "answer": "女", "explanation": "Người phụ nữ là 女の人 (おんなのひと)."},
                        {"id": 5, "prompt": "5. Vị trí 5: 男の [ ? ] (Bé trai chạy tung tăng trên sân)", "options": ["子", "人", "生", "児"], "answer": "子", "explanation": "Bé trai là 男の子 (おとこのこ)."},
                        {"id": 6, "prompt": "6. Vị trí 6: 女の [ ? ] (Bé gái đang ngồi xúc cát)", "options": ["子", "人", "生", "児"], "answer": "子", "explanation": "Bé gái là 女の子 (おんなのこ)."},
                        {"id": 7, "prompt": "7. Vị trí 7: [ ? ] 学生 (Nam sinh trung học nắm tay bạn gái)", "options": ["男子", "男", "大学生", "先生"], "answer": "男子", "explanation": "Nam sinh viên/học sinh là 男子学生 (だんしがくせい)."},
                        {"id": 8, "prompt": "8. Vị trí 8: [ ? ] 学生 (Nữ sinh trung học nắm tay bạn trai)", "options": ["女子", "女", "高校生", "生徒"], "answer": "女子", "explanation": "Nữ sinh viên/học sinh là 女子学生 (じょしがくせい)."},
                        {"id": 9, "prompt": "9. Vị trí 9: [ ? ] (Chú chó chạy nô đùa bên cạnh bãi cát)", "options": ["犬", "鳥", "猫", "牛"], "answer": "犬", "explanation": "Con chó viết là 犬 (いぬ)."},
                        {"id": 10, "prompt": "10. Vị trí 10: [ ? ] (Hai chú chim bồ câu đậu trên cành cây)", "options": ["鳥", "犬", "魚", "花"], "answer": "鳥", "explanation": "Con chim viết là 鳥 (とり)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 えから できた かんじ (Hình vẽ tượng hình ra chữ Hán)",
                "instruction": "Quan sát hình vẽ tượng hình thời cổ đại ở trang 79 và chọn chữ Hán tương ứng (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap8_minigame_p79.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. Hình hai bàn tay cầm chiếc rìu đá chỉ quyền uy của người cha trong gia đình:", "options": ["父", "手", "石", "木"], "answer": "父", "explanation": "Chữ 父 (Phụ - cha) bắt nguồn từ hình bàn tay cầm rìu đá quyền uy."},
                        {"id": 2, "prompt": "2. Hình em bé sơ sinh quấn tã đang dang hai tay chào đời:", "options": ["子", "人", "生", "大"], "answer": "子", "explanation": "Chữ 子 (Tử - con trẻ) bắt nguồn từ hình dáng em bé sơ sinh."},
                        {"id": 3, "prompt": "3. Hình thiếu nữ mặc áo kimono quý phái khoanh tay duyên dáng:", "options": ["女", "母", "安", "好"], "answer": "女", "explanation": "Chữ 女 (Nữ - phụ nữ) tượng hình người phụ nữ khoanh tay trước ngực."},
                        {"id": 4, "prompt": "4. Hình người mẹ quỳ gối ôm ngực cho con thơ bú mớm tình mẫu tử:", "options": ["母", "女", "毎", "乳"], "answer": "母", "explanation": "Chữ 母 (Mẫu - người mẹ) bắt nguồn từ hình ảnh người mẹ quỳ cho con bú có 2 nét chấm tượng trưng hai bầu sữa."},
                        {"id": 5, "prompt": "5. Hình thửa ruộng (田) cộng với sức bắp tay cơ bắp (力) làm việc cày cấy:", "options": ["男", "力", "田", "勇"], "answer": "男", "explanation": "Điền 田 kết hợp với Lực 力 tạo thành chữ 男 (Nam - người đàn ông trụ cột)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 わたしの かぞく (Đoạn văn 'Gia đình của tôi')",
                "instruction": "Đọc bài văn tự sự giới thiệu gia đình ở trang 79, chọn chữ Hán đúng cho đầy đủ 13 vị trí từ ① đến ⑬.",
                "image_url": "/assets/kanji/n5/minigames/chap8_minigame_p79.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① わたしは [ごにん] かぞくです (Gia đình có 5 người)", "options": ["五人", "四人", "三人", "六人"], "answer": "五人", "explanation": "ごにん viết là 五人 (5 người)."},
                        {"id": 2, "prompt": "② [そふ] と ちちと ははと いぬの ポチです (Ông nội)", "options": ["そ父", "父", "祖父", "祖母"], "answer": "そ父", "explanation": "そふ viết chữ Hán trong bài là そ父 (ông nội)."},
                        {"id": 3, "prompt": "③ そふと [ちち] と ははと...", "options": ["父", "母", "兄", "弟"], "answer": "父", "explanation": "ちち viết là 父 (bố)."},
                        {"id": 4, "prompt": "④ そふと ちちと [はは] と...", "options": ["母", "女", "姉", "妹"], "answer": "母", "explanation": "はは viết là 母 (mẹ)."},
                        {"id": 5, "prompt": "⑤ [いぬ] の ポチです (Chú chó Pochi)", "options": ["犬", "鳥", "猫", "子"], "answer": "犬", "explanation": "いぬ viết là 犬 (chó)."},
                        {"id": 6, "prompt": "⑥ そふは [ななじゅうろくさい] ですが とても げんきです", "options": ["七十六さい", "六十七さい", "七十さい", "八十六さい"], "answer": "七十六さい", "explanation": "ななじゅうろくさい viết là 七十六さい (76 tuổi)."},
                        {"id": 7, "prompt": "⑦ ちちは [よんじゅうはっさい] です", "options": ["四十八さい", "八十四さい", "四十さい", "四十五さい"], "answer": "四十八さい", "explanation": "よんじゅうはっさい viết là 四十八さい (48 tuổi)."},
                        {"id": 8, "prompt": "⑧ [しょうがっこう] の せんせいです", "options": ["小学校", "中学校", "高校", "大学"], "answer": "小学校", "explanation": "しょうがっこう viết là 小学校 (trường tiểu học)."},
                        {"id": 9, "prompt": "⑨ しょうがっこうの [せんせい] です", "options": ["先生", "学生", "校長", "教員"], "answer": "先生", "explanation": "せんせい viết là 先生 (giáo viên)."},
                        {"id": 10, "prompt": "⑩ ははは [こうこう] の せんせいです", "options": ["高校", "大学", "小学校", "学校"], "answer": "高校", "explanation": "こうこう viết là 高校 (trường cấp 3)."},
                        {"id": 11, "prompt": "⑪ ポチは [2ねんまえ] うちへ きました", "options": ["2年まえ", "1年まえ", "3年まえ", "去年"], "answer": "2年まえ", "explanation": "2ねんまえ viết là 2年まえ (2 năm trước)."},
                        {"id": 12, "prompt": "⑫ わたしは [まいにち] ポチと かわへ さんぽに いきます", "options": ["まい日", "毎日", "休日", "今日"], "answer": "まい日", "explanation": "まいにち viết là まい日 (mỗi ngày)."},
                        {"id": 13, "prompt": "⑬ わたしは まいにち ポチと [かわ] へ さんぽに いきます", "options": ["川", "山", "海", "田"], "answer": "川", "explanation": "かわ viết là 川 (dòng sông)."}
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
                "instruction": "Chọn động từ thích hợp từ khung cho sẵn (立, 行, 見, 休, 来, 聞, 帰) điền vào 6 câu hỏi trang 86.",
                "image_url": "/assets/kanji/n5/minigames/chap9_minigame_p86.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: [ 立 ] ってください (た)", "answer": "立"},
                    "questions": [
                        {"id": 1, "prompt": "1. CDを [ ? ] きます。(Cách đọc: き)", "options": ["聞", "見", "行", "来"], "answer": "聞", "explanation": "Nghe CD dùng chữ 聞: 聞きます (ききます)."},
                        {"id": 2, "prompt": "2. アニメを [ ? ] ます。(Cách đọc: み)", "options": ["見", "聞", "行", "休"], "answer": "見", "explanation": "Xem anime dùng chữ 見: 見ます (みます)."},
                        {"id": 3, "prompt": "3. 日本へ [ ? ] ました。(Cách đọc: き)", "options": ["来", "行", "帰", "立"], "answer": "来", "explanation": "Đến Nhật Bản dùng chữ 来: 来ました (きました)."},
                        {"id": 4, "prompt": "4. えいがかんへ [ ? ] きませんか。(Cách đọc: い)", "options": ["行", "来", "帰", "見"], "answer": "行", "explanation": "Đi rạp chiếu phim dùng chữ 行: 行きませんか (いきませんか)."},
                        {"id": 5, "prompt": "5. うちへ [ ? ] ります。(Cách đọc: かえ)", "options": ["帰", "行", "来", "休"], "answer": "帰", "explanation": "Về nhà dùng chữ 帰: 帰ります (かえります)."},
                        {"id": 6, "prompt": "6. つかれましたね。すこし [ ? ] みませんか。(Cách đọc: やす)", "options": ["休", "見", "立", "帰"], "answer": "休", "explanation": "Nghỉ ngơi dùng chữ 休: 休みませんか (やすみませんか)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 タイムスケジュール (Lịch trình sinh hoạt của 3 người bạn)",
                "instruction": "Quan sát bảng thời gian biểu của Jake, Marin và You ở trang 87 để xác định ai làm hành động gì (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap9_minigame_p87.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: あさ しん聞を よみます (7:00 しんぶん)", "answer": "マリンさん"},
                    "questions": [
                        {"id": 1, "prompt": "1. まい日 6じ (18:00) に うちへ 帰ります (かえります):", "options": ["ジェイクさん", "マリンさん", "ヨウさん", "だれでもない"], "answer": "ジェイクさん", "explanation": "Thời gian biểu của Jake ghi: 18:00 うちへ かえります."},
                        {"id": 2, "prompt": "2. あさ (9:00) アルバイトに 行きます (いきます):", "options": ["マリンさん", "ジェイクさん", "ヨウさん", "三人とも"], "answer": "マリンさん", "explanation": "Thời gian biểu của Marin ghi: 9:00 アルバイトへ いきます."},
                        {"id": 3, "prompt": "3. テレビを 見ます (20:00)。それから シャワーを あびます (22:00):", "options": ["ジェイクさん", "マリンさん", "ヨウさん", "だれでもない"], "answer": "ジェイクさん", "explanation": "Jake ghi: 20:00 テレビをみます, 22:00 シャワーをあびます."},
                        {"id": 4, "prompt": "4. うちで おんがくを 聞きます (18:00 ききます):", "options": ["ヨウさん", "ジェイクさん", "マリンさん", "二人"], "answer": "ヨウさん", "explanation": "Thời gian biểu của You ghi: 18:00 おんがくを ききます."},
                        {"id": 5, "prompt": "5. ごご 1じ (13:00) に 学校へ 行きます (がっこうへ いきます):", "options": ["マリンさん", "ヨウさん", "ジェイクさん", "三人とも"], "answer": "マリンさん", "explanation": "Thời gian biểu của Marin ghi: 13:00 がっこうへ いきます."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじの けいさんです (Phép tính Kanji)",
                "instruction": "Ghép các bộ thủ được cộng lại thành chữ Hán tương ứng (đầy đủ 3 câu ở trang 87).",
                "image_url": "/assets/kanji/n5/minigames/chap9_minigame_p87.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. 刂 + ⺕ + 帀 = [ ? ]", "options": ["帰", "聞", "立", "行"], "answer": "帰", "explanation": "Bộ Đao bên phải + bộ Sơn lật ⺕ + bộ Bố 帀 tạo thành chữ 帰 (QUY - trở về)."},
                        {"id": 2, "prompt": "2. 門 + 耳 = [ ? ]", "options": ["聞", "間", "開", "問"], "answer": "聞", "explanation": "Bộ Môn 門 bên ngoài ghé tai 耳 vào nghe tạo thành chữ 聞 (VĂN - nghe, hỏi)."},
                        {"id": 3, "prompt": "3. 亠 + 丷 + 一 = [ ? ]", "options": ["立", "音", "辛", "文"], "answer": "立", "explanation": "Bộ Đầu 亠 + nét phẩy chấm 丷 + nét ngang 一 tạo thành chữ 立 (LẬP - đứng)."}
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
                "instruction": "Quan sát tranh thức ăn và sửa lại các chữ Hán bị viết sai nét thành chữ đúng (5 câu trang 94).",
                "image_url": "/assets/kanji/n5/minigames/chap10_minigame_p94.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Tranh con bò vẽ chữ 午 -> sửa thành:", "answer": "牛"},
                    "questions": [
                        {"id": 1, "prompt": "1. Tranh con cá vẽ chữ viết thiếu nét ở phần đuôi -> sửa thành:", "options": ["魚", "鳥", "貝", "角"], "answer": "魚", "explanation": "Chữ con cá đúng là 魚 (NGƯ - さかな)."},
                        {"id": 2, "prompt": "2. Tranh con sò viết nhầm thành chữ 見 -> sửa thành:", "options": ["貝", "見", "目", "頁"], "answer": "貝", "explanation": "Chữ con sò là 貝 (BỐI - かい), phần dưới là 2 nét phẩy chấm 八 thay vì 儿."},
                        {"id": 3, "prompt": "3. Tranh bát cơm trắng viết nhầm thành chữ 采 -> sửa thành:", "options": ["米", "采", "木", "来"], "answer": "米", "explanation": "Chữ hạt gạo, cơm là 米 (MỄ - こめ)."},
                        {"id": 4, "prompt": "4. Tranh ấm trà xanh viết nhầm thành chữ 筡 -> sửa thành:", "options": ["茶", "草", "葉", "菜"], "answer": "茶", "explanation": "Chữ trà là 茶 (TRÀ - おちゃ)."},
                        {"id": 5, "prompt": "5. Tranh miếng thịt bò viết nhầm thành chữ 内 -> sửa thành:", "options": ["肉", "内", "円", "用"], "answer": "肉", "explanation": "Chữ miếng thịt là 肉 (NHỤC - にく), bên trong có 2 chữ 人."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 だれの 子どもですか (Đứa bé là con của ai?)",
                "instruction": "Đọc lời thoại giới thiệu sở thích ăn uống của các phụ huynh trang 95 để ghép với 4 đứa trẻ trong tranh.",
                "image_url": "/assets/kanji/n5/minigames/chap10_minigame_p95.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: Bé gái tóc đuôi ngựa thích ăn thịt (肉)", "answer": "石田さん (いしださん)"},
                    "questions": [
                        {"id": 1, "prompt": "1. Bé gái buộc 2 bím tóc, thích uống trà xanh (お茶):", "options": ["山川さん", "石川さん", "山田さん", "田中さん"], "answer": "山川さん", "explanation": "Lời thoại Yamakawa: わたしの 子どもは 女の子です。お茶が 好きです。"},
                        {"id": 2, "prompt": "2. Bé trai đầu đinh, thích ăn sò biển (貝):", "options": ["石川さん", "田中さん", "山田さん", "竹中さん"], "answer": "石川さん", "explanation": "Lời thoại Ishikawa: わたしの 子どもは 男の子です。貝が 好きです。"},
                        {"id": 3, "prompt": "3. Bé gái tóc ngắn uốn, thích ăn cá (魚):", "options": ["山田さん", "山川さん", "石田さん", "田中さん"], "answer": "山田さん", "explanation": "Lời thoại Yamada: わたしの 子どもは 女の子です。魚が 好きです。"},
                        {"id": 4, "prompt": "4. Bé trai tóc vuốt lệch, thích ăn thịt (肉):", "options": ["田中さん", "竹中さん", "石川さん", "山川さん"], "answer": "田中さん", "explanation": "Lời thoại Tanaka: わたしの 子どもは 男の子です。肉が 好きです。"}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 よみましょう。そして こたえましょう (Đọc câu hỏi sở thích)",
                "instruction": "Đọc các câu hỏi hội thoại về món ăn và động vật yêu thích ở bài 【3】 trang 95, điền cách đọc đúng cho 7 vị trí ① đến ⑦.",
                "image_url": "/assets/kanji/n5/minigames/chap10_minigame_p95.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① A: [すき] な たべ物は なんですか", "options": ["すき", "たのし", "うれし", "よ"], "answer": "すき", "explanation": "好きな đọc là すきな (thích)."},
                        {"id": 2, "prompt": "② A: 好きな [たべもの] は なんですか", "options": ["たべもの", "のみもの", "かいもの", "くだもの"], "answer": "たべもの", "explanation": "食べ物 đọc là たべもの (đồ ăn, món ăn)."},
                        {"id": 3, "prompt": "③ A: [にく] と 魚と どちらが 好きですか", "options": ["にく", "うし", "とり", "ぶた"], "answer": "にく", "explanation": "肉 đọc là にく (thịt)."},
                        {"id": 4, "prompt": "④ A: 肉と [さかな] と どちらが 好きですか", "options": ["さかな", "かい", "うお", "えび"], "answer": "さかな", "explanation": "魚 đọc là さかな (cá)."},
                        {"id": 5, "prompt": "⑤ A: 肉と 魚と どちらが [すき] ですか", "options": ["すき", "きらい", "いい", "たか"], "answer": "すき", "explanation": "好き đọc là すき (thích hơn)."},
                        {"id": 6, "prompt": "⑥ A: [すき] な どう物は なんですか", "options": ["すき", "たのし", "おお", "ちい"], "answer": "すき", "explanation": "好きな đọc là すきな (yêu thích)."},
                        {"id": 7, "prompt": "⑦ A: 好きな [どうぶつ] は なんですか", "options": ["どうぶつ", "せいぶつ", "たべもの", "とり"], "answer": "どうぶつ", "explanation": "動物 đọc là どうぶつ (động vật)."}
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
                "title": "【1】 えを 見て、かんじを かきましょう (Nhìn tranh đoán chữ Hán ghép)",
                "instruction": "Quan sát các bức tranh thiên nhiên trang 104 và viết chữ Hán tương ứng (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap11_minigame_p104.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: Tranh người mẹ ôm con gái", "answer": "好"},
                    "questions": [
                        {"id": 1, "prompt": "1. Ba cái cây đứng cạnh nhau tạo thành cánh rừng rậm rạp:", "options": ["森", "林", "木", "畑"], "answer": "森", "explanation": "Ba cây 木 tạo thành chữ 森 (SÂM - rừng rậm もり)."},
                        {"id": 2, "prompt": "2. Hai cái cây đứng cạnh nhau tạo thành rặng cây, lùm cây nhỏ:", "options": ["林", "森", "本", "休"], "answer": "林", "explanation": "Hai cây 木 tạo thành chữ 林 (LÂM - rặng cây はやし)."},
                        {"id": 3, "prompt": "3. Đống lửa củi (火) đặt cạnh mảnh ruộng (田) đốt rơm rạ:", "options": ["畑", "田", "森", "炎"], "answer": "畑", "explanation": "Lửa 火 + Ruộng 田 tạo thành chữ 畑 (nương rẫy, ruộng cạn はたけ)."},
                        {"id": 4, "prompt": "4. Núi (山) đá (石) sừng sững:", "options": ["岩", "山", "石", "炭"], "answer": "岩", "explanation": "Núi 山 trên Đá 石 tạo thành chữ 岩 (NHAM - tảng đá lớn いわ)."},
                        {"id": 5, "prompt": "5. Mặt trời chiếu sáng ban ngày (日) và mặt trăng soi rọi ban đêm (月):", "options": ["明", "晴", "朝", "暗"], "answer": "明", "explanation": "Nhật 日 kết hợp Nguyệt 月 tạo thành chữ 明 (MINH - sáng sủa あかるい)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 かんじの なかの かんじ (Bộ thủ A nằm trong chữ Hán B)",
                "instruction": "Xác định chữ Hán ở hàng B chứa đựng thành phần bộ thủ của chữ Hán ở hàng A (5 câu trang 105).",
                "image_url": "/assets/kanji/n5/minigames/chap11_minigame_p105.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: Chữ A là 力 (Lực) -> nằm trong chữ B nào?", "answer": "男 (Nam)"},
                    "questions": [
                        {"id": 1, "prompt": "1. Chữ A là 火 (Hỏa) nằm trong chữ B nào?", "options": ["畑", "暗", "森", "岩"], "answer": "畑", "explanation": "Chữ 火 là bộ bên trái của chữ 畑 (ruộng rẫy)."},
                        {"id": 2, "prompt": "2. Chữ A là 木 (Mộc) nằm trong chữ B nào?", "options": ["森", "畑", "明", "男"], "answer": "森", "explanation": "Chữ 木 nhân 3 lần tạo thành chữ 森 (rừng rậm)."},
                        {"id": 3, "prompt": "3. Chữ A là 石 (Thạch) nằm trong chữ B nào?", "options": ["岩", "暗", "畑", "明"], "answer": "岩", "explanation": "Chữ 石 nằm ở nửa dưới của chữ 岩 (tảng đá lớn)."},
                        {"id": 4, "prompt": "4. Chữ A là 音 (Âm) nằm trong chữ B nào?", "options": ["暗", "明", "森", "畑"], "answer": "暗", "explanation": "Chữ 音 kết hợp với chữ 日 tạo thành chữ 暗 (ÁM - tối tăm くらい)."},
                        {"id": 5, "prompt": "5. Chữ A là 月 (Nguyệt) nằm trong chữ B nào?", "options": ["明", "暗", "岩", "森"], "answer": "明", "explanation": "Chữ 月 là bộ bên phải của chữ 明 (MINH - sáng tỏ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かんじを えらんで かきましょう (Điền chữ Hán vào câu)",
                "instruction": "Chọn từ thích hợp trong khung (畑, 林, 音, 明, 暗) điền vào 5 câu ở bài 【3】 trang 105.",
                "image_url": "/assets/kanji/n5/minigames/chap11_minigame_p105.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. わたしの しゅみは [ ? ] で やさいを つくる ことです。", "options": ["畑 (はたけ)", "林 (はやし)", "森 (もり)", "岩 (いわ)"], "answer": "畑 (はたけ)", "explanation": "Trồng rau trên nương rẫy: 畑で野菜をつくる."},
                        {"id": 2, "prompt": "2. 山田さんは [ ? ] ざんが とくいです。(Tính nhẩm giỏi)", "options": ["暗 (あん)", "明 (めい)", "音 (おん)", "林 (りん)"], "answer": "暗 (あん)", "explanation": "Tính nhẩm là 暗算 (あんざん), chữ 暗."},
                        {"id": 3, "prompt": "3. 外で 大きな [ ? ] が しました。(Âm thanh lớn)", "options": ["音 (おと)", "暗 (くら)", "明 (あか)", "畑 (はたけ)"], "answer": "音 (おと)", "explanation": "Tiếng động, âm thanh là 音 (おと)."},
                        {"id": 4, "prompt": "4. わたしは りょうりが じょうずで [ ? ] るい人と けっこんしたいです。(Vui vẻ, tươi sáng)", "options": ["明 (あか)", "暗 (くら)", "畑 (はたけ)", "林 (はやし)"], "answer": "明 (あか)", "explanation": "Người tươi sáng, hoạt bát là 明るい人 (あかるいひと)."},
                        {"id": 5, "prompt": "5. 学校の ちかくの [ ? ] で よく あそびました。(Lùm cây gần trường)", "options": ["林 (はやし)", "畑 (はたけ)", "音 (おと)", "暗 (くら)"], "answer": "林 (はやし)", "explanation": "Khu rừng nhỏ gần trường là 林 (はやし)."}
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
                "instruction": "Ghép các bộ thủ cho sẵn (母, 売, 日, 良, 舌, 食, 貝) để hoàn thiện chữ Hán trong 6 câu ở trang 112.",
                "image_url": "/assets/kanji/n5/minigames/chap12_minigame_p112.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: でん [ 言 ] を おねがいします", "answer": "言"},
                    "questions": [
                        {"id": 1, "prompt": "1. [ ? ] み物は なにが いいですか。(Ghép 欠 + 食)", "options": ["飲", "食", "話", "買"], "answer": "飲", "explanation": "Khuyết 欠 kết hợp Thực 食 tạo thành chữ 飲 (ẨM - 飲み物 のみもの)."},
                        {"id": 2, "prompt": "2. でん [ ? ] を かけます。(Ghép 舌 + 言)", "options": ["話", "言", "書", "読"], "answer": "話", "explanation": "Thiệt 舌 kết hợp Ngôn 言 tạo thành chữ 話 (THOẠI - 電話 でんわ)."},
                        {"id": 3, "prompt": "3. [ ? ] べに 行きませんか。(Ghép 良 + 食)", "options": ["食", "飲", "買", "読"], "answer": "食", "explanation": "Lương 良 kết hợp 食 tạo thành chữ 食 (THỰC - 食べに たべに)."},
                        {"id": 4, "prompt": "4. じ [ ? ] で しらべます。(Ghép 聿 + 日)", "options": ["書", "言", "話", "読"], "answer": "書", "explanation": "Duật 聿 kết hợp Nhật 日 tạo thành chữ 書 (THƯ - 辞書 じしょ)."},
                        {"id": 5, "prompt": "5. スーパーで [ ? ] い物を します。(Ghép 罒 + 貝)", "options": ["買", "賣", "見", "物"], "answer": "買", "explanation": "Võng 罒 kết hợp Bối 貝 tạo thành chữ 買 (MÃI - 買い物 かいもの)."},
                        {"id": 6, "prompt": "6. 音 [ ? ] を します。(Ghép 売 + 言)", "options": ["読", "話", "書", "語"], "answer": "読", "explanation": "Mại 売 kết hợp Ngôn 言 tạo thành chữ 読 (ĐỘC - 音読 おんどく)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 サリーさんの にっき (Nhật ký mua sắm của Sally)",
                "instruction": "Đọc bài nhật ký đi chơi của Sally ở trang 112, chọn chữ Hán/cách đọc đúng cho đầy đủ 15 vị trí ① đến ⑮.",
                "image_url": "/assets/kanji/n5/minigames/chap12_minigame_p112.webp",
                "display_order": 2,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① マリアさんと [かいもの] に いきました", "options": ["買い物", "買物", "食物", "読物"], "answer": "買い物", "explanation": "かいもの viết là 買い物 (mua sắm)."},
                        {"id": 2, "prompt": "② かいものに [いき] ました", "options": ["行きました", "来ました", "帰りました", "出ました"], "answer": "行きました", "explanation": "いきました viết là 行きました (đã đi)."},
                        {"id": 3, "prompt": "③ デパートで [にせんえん] の サンダルを かいました", "options": ["二千円", "二万円", "二万円円", "二千元"], "answer": "二千円", "explanation": "にせんえん viết là 二千円 (2,000 yên)."},
                        {"id": 4, "prompt": "④ サンダルを [かい] ました", "options": ["買いました", "売りました", "話しました", "書きました"], "answer": "買いました", "explanation": "かいました viết là 買いました (đã mua)."},
                        {"id": 5, "prompt": "⑤ [ゆうめい] な カレーやで ひるごはんを たべました", "options": ["ゆう名な", "有名", "名まえ", "有力な"], "answer": "ゆう名な", "explanation": "ゆうめいな viết là ゆう名な (nổi tiếng)."},
                        {"id": 6, "prompt": "⑥ ひるごはんを [たべ] ました", "options": ["食べました", "飲みました", "話しました", "買い増した"], "answer": "食べました", "explanation": "たべました viết là 食べました (đã ăn)."},
                        {"id": 7, "prompt": "⑦ みせに [ひと] が たくさん いました", "options": ["人", "男", "女", "子"], "answer": "人", "explanation": "ひと viết là 人 (nhiều người)."},
                        {"id": 8, "prompt": "⑧ [なまえ] を かいて まちました", "options": ["名まえ", "名前", "文字", "言葉"], "answer": "名まえ", "explanation": "なまえ viết là 名まえ (tên)."},
                        {"id": 9, "prompt": "⑨ なまえを [かい] て まちました", "options": ["書いて", "言って", "話して", "読んで"], "answer": "書いて", "explanation": "かいて viết là 書いて (viết tên)."},
                        {"id": 10, "prompt": "⑩ [さんじっぷん] まちましたが よかったです", "options": ["30分", "30時", "30日", "30円"], "answer": "30分", "explanation": "さんじっぷん viết là 30分 (30 phút)."},
                        {"id": 11, "prompt": "⑪ マリアさんも よかったですと [いい] ました", "options": ["言いました", "話しました", "書きました", "聞きました"], "answer": "言いました", "explanation": "いいました viết là 言いました (đã nói)."},
                        {"id": 12, "prompt": "⑫ カフェで [おちゃ] を のみました", "options": ["お茶", "水", "酒", "牛乳"], "answer": "お茶", "explanation": "おちゃ viết là お茶 (trà xanh)."},
                        {"id": 13, "prompt": "⑬ おちゃを [のみ] ました", "options": ["飲みました", "食べました", "買いました", "吸いました"], "answer": "飲みました", "explanation": "のみました viết là 飲みました (đã uống)."},
                        {"id": 14, "prompt": "⑭ 2じかん [はなし] ました", "options": ["話しました", "言いました", "読みました", "聞きました"], "answer": "話しました", "explanation": "はなしました viết là 話しました (nói chuyện 2 tiếng)."},
                        {"id": 15, "prompt": "⑮ たのしい [いちにち] でした", "options": ["一日", "毎日", "休日", "今日"], "answer": "一日", "explanation": "いちにち viết là 一日 (một ngày vui vẻ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 なにを していますか (Mọi người đang làm gì trong phòng khách?)",
                "instruction": "Quan sát tranh sinh hoạt phòng khách trang 113 và chọn chữ Hán động từ thể て điền vào 6 câu.",
                "image_url": "/assets/kanji/n5/minigames/chap12_minigame_p113.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. パットさんは 本を [ ? ] います。(Đang đọc sách)", "options": ["読んで (よんで)", "話して (はなして)", "書いて (かいて)", "見て (みて)"], "answer": "読んで (よんで)", "explanation": "Pat đang đọc sách: 本を読んでいます。"},
                        {"id": 2, "prompt": "2. トムさんは でんわで [ ? ] います。(Đang nói chuyện điện thoại)", "options": ["話して (はなして)", "言って (いって)", "聞いて (きいて)", "呼んで (よんで)"], "answer": "話して (はなして)", "explanation": "Tom đang nói chuyện qua điện thoại: でんわで話しています。"},
                        {"id": 3, "prompt": "3. ロビンさんは ジュースを [ ? ] います。(Đang mua nước ở máy bán hàng)", "options": ["買って (かって)", "飲んで (のんで)", "売って (うって)", "取って (とって)"], "answer": "買って (かって)", "explanation": "Robin đang mua nước tại cây bán tự động: ジュースを買っています。"},
                        {"id": 4, "prompt": "4. マリーさんは 音がくを [ ? ] います。(Đang đeo tai nghe nghe nhạc)", "options": ["聞いて (きいて)", "話して (はなして)", "読んで (よんで)", "見て (みて)"], "answer": "聞いて (きいて)", "explanation": "Marie đeo tai nghe thưởng thức âm nhạc: 音がくを聞いています。"},
                        {"id": 5, "prompt": "5. ジムさんは おかしを [ ? ] います。(Đang ăn bim bim)", "options": ["食べて (たべて)", "飲んで (のんで)", "買って (かって)", "作って (つくって)"], "answer": "食べて (たべて)", "explanation": "Jim ngồi ghế sofa ăn bánh kẹo: おかしを食べています。"},
                        {"id": 6, "prompt": "6. キャリーさんは お茶を [ ? ] います。(Đang uống tách trà)", "options": ["飲んで (のんで)", "食べて (たべて)", "買って (かって)", "注いで (そそいで)"], "answer": "飲んで (のんで)", "explanation": "Carrie đang nhâm nhi tách trà: お茶を飲んでいます。"}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 13: まち (Trang 120, 121)
        # =========================================================================
        13: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 のりものの クイズ (Câu đố về phương tiện giao thông)",
                "instruction": "Đọc đặc điểm 1 đến 6 ở trang 120 và chọn phương tiện tương ứng: A (電車), B (自動車), C (自転車).",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p120.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "れい: いちばん 大きいです (To lớn nhất)", "answer": "A (電車)"},
                    "questions": [
                        {"id": 1, "prompt": "1. 二つの タイヤで うごきます (Chạy chuyển động bằng 2 bánh xe)", "options": ["C (じてん車)", "A (電車)", "B (じどう車)", "D (飛行機)"], "answer": "C (じてん車)", "explanation": "Xe chạy bằng 2 bánh là xe đạp 自転車 (C)."},
                        {"id": 2, "prompt": "2. 二人で のってはいけません (Luật cấm đèo 2 người)", "options": ["C (じてん車)", "B (じどう車)", "A (電車)", "D (バス)"], "answer": "C (じてん車)", "explanation": "Ở Nhật Bản xe đạp thông thường cấm kẹp hai người (C)."},
                        {"id": 3, "prompt": "3. 二十人 のることが できます (Có thể chở trên 20 người cùng lúc)", "options": ["A (電車)", "B (じどう車)", "C (じてん車)", "D (タクシー)"], "answer": "A (電車)", "explanation": "Tàu điện chở được số lượng lớn hành khách trên 20 người (A)."},
                        {"id": 4, "prompt": "4. ガソリンを つかいます (Phương tiện dùng nhiên liệu xăng)", "options": ["B (じどう車)", "A (電車)", "C (じてん車)", "D (地下鉄)"], "answer": "B (じどう車)", "explanation": "Xe ô tô dùng xăng chạy động cơ đốt trong 自動車 (B)."},
                        {"id": 5, "prompt": "5. おさけを 飲んでも のることができます (Say rượu vẫn đi được)", "options": ["A (電車)", "B (じどう車)", "C (じてん車)", "D (バイク)"], "answer": "A (電車)", "explanation": "Người uống rượu có thể đi phương tiện công cộng như tàu điện (A)."},
                        {"id": 6, "prompt": "6. 子どもも うんてんすることが できます (Trẻ em cũng tự điều khiển lái được)", "options": ["C (じてん車)", "A (電車)", "B (じどう車)", "D (トラック)"], "answer": "C (じてん車)", "explanation": "Trẻ con có thể tự đạp xe đạp 自転車 (C)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 かん字の けいさん (Phép toán đố chữ Kanji)",
                "instruction": "Thực hiện các phép tính cộng/trừ bộ thủ chữ Hán trang 120 (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p120.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 田 + 丁 = 町", "answer": "町"},
                    "questions": [
                        {"id": 1, "prompt": "1. 土 + 寸 = [ ? ]", "options": ["寺", "時", "等", "持"], "answer": "寺", "explanation": "Thổ 土 kết hợp Thốn 寸 tạo thành chữ 寺 (TỰ - ngôi chùa おてら)."},
                        {"id": 2, "prompt": "2. 二 + 日 + 丨 = [ ? ]", "options": ["車", "東", "電", "重"], "answer": "車", "explanation": "Nét ngang 二 + Nhật 日 + sổ dọc xuyên tâm tạo thành chữ 車 (XA - xe cộ くるま)."},
                        {"id": 3, "prompt": "3. 酉 - 一 = [ ? ]", "options": ["西", "四", "酒", "配"], "answer": "西", "explanation": "Chữ Dậu 酉 bớt đi 1 nét ngang bên trong tạo thành chữ 西 (TÂY - hướng tây にし)."},
                        {"id": 4, "prompt": "4. 申 + 一 + 八 (hoặc 木 + 日) = [ ? ]", "options": ["東", "車", "重", "果"], "answer": "東", "explanation": "Mộc 木 kết hợp Nhật 日 tạo thành chữ 東 (ĐÔNG - hướng đông ひがし)."},
                        {"id": 5, "prompt": "5. 十 + 冂 + (羊 - 一) = [ ? ]", "options": ["南", "西", "北", "車"], "answer": "南", "explanation": "Thập 十 + Quynh 冂 + bộ Dương thiếu nét tạo thành chữ 南 (NAM - hướng nam みなみ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 さくぶん: かまくらりょこう (Bài văn: Chuyến du lịch Kamakura)",
                "instruction": "Đọc bài văn kể về chuyến đi chơi Kamakura của Julia trang 121, chọn chữ Hán đúng cho đầy đủ 18 câu từ ① đến ⑱.",
                "image_url": "/assets/kanji/n5/minigames/chap13_minigame_p121.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① [せんげつ] の やすみに かまくらへ いきました", "options": ["先月", "今月", "来月", "毎月"], "answer": "先月", "explanation": "せんげつ viết là 先月 (tháng trước)."},
                        {"id": 2, "prompt": "② せんげつの [やすみ] に かまくらへ いきました", "options": ["休み", "休", "体", "本"], "answer": "休み", "explanation": "やすみ viết là 休み (kỳ nghỉ)."},
                        {"id": 3, "prompt": "③ [ともだち] と かまくらへ いきました", "options": ["友だち", "友達", "先生", "人"], "answer": "友だち", "explanation": "ともだち viết là 友だち (bạn bè)."},
                        {"id": 4, "prompt": "④ かまくらへ [いき] ました", "options": ["行きました", "来ました", "帰りました", "出ました"], "answer": "行きました", "explanation": "いきました viết là 行きました (đã đi)."},
                        {"id": 5, "prompt": "⑤ かまくらには ふるい [おてら] が たくさん あります", "options": ["お寺", "寺", "神社", "町"], "answer": "お寺", "explanation": "おてら viết là お寺 (chùa chiền cổ kính)."},
                        {"id": 6, "prompt": "⑥ [とうきょう] から でんしゃで 1じかんでした", "options": ["東きょう", "東京", "西きょう", "北きょう"], "answer": "東きょう", "explanation": "とうきょう viết trong sách là 東きょう (chữ 東 trong 東京)."},
                        {"id": 7, "prompt": "⑦ とうきょうから [でんしゃ] で 1じかんでした", "options": ["電車", "車", "じてん車", "汽車"], "answer": "電車", "explanation": "でんしゃ viết là 電車 (tàu điện)."},
                        {"id": 8, "prompt": "⑧ かまくらえきで [じてんしゃ] を かりて いろいろな ばしょへ いきました", "options": ["じてん車", "自転車", "電車", "自動車"], "answer": "じてん車", "explanation": "じてんしゃ viết trong bài là じてん車 (xe đạp)."},
                        {"id": 9, "prompt": "⑨ おひるごはんは [ゆうめい] な そばやで そばを たべました", "options": ["ゆう名な", "有名", "名前", "有名な"], "answer": "ゆう名な", "explanation": "ゆうめいな viết là ゆう名な (nổi tiếng)."},
                        {"id": 10, "prompt": "⑩ そばを [たべ] ました", "options": ["食べました", "飲みました", "買いました", "見ました"], "answer": "食べました", "explanation": "たべました viết là 食べました (đã ăn)."},
                        {"id": 11, "prompt": "⑪ [ほん] で しらべて まえの ひに よやくしました", "options": ["本", "体", "言", "書"], "answer": "本", "explanation": "ほんで viết là 本で (tra cứu trong sách)."},
                        {"id": 12, "prompt": "⑫ まえの [ひ] に でんわで よやくしました", "options": ["日", "月", "年", "時"], "answer": "日", "explanation": "ひに viết là 日に (vào ngày hôm trước)."},
                        {"id": 13, "prompt": "⑬ まえの ひに [でんわ] で よやくしました", "options": ["電話", "手紙", "電車", "会話"], "answer": "電話", "explanation": "でんわ viết là 電話 (gọi điện thoại)."},
                        {"id": 14, "prompt": "⑭ ごはんを [たべ] て うみへ いきました", "options": ["食べて", "飲んで", "行って", "買って"], "answer": "食べて", "explanation": "たべて viết là 食べて (ăn xong đi ra biển)."},
                        {"id": 15, "prompt": "⑮ きれいな [かい] を ひろいました", "options": ["貝", "見", "魚", "石"], "answer": "貝", "explanation": "かい viết là 貝 (vỏ sò biển)."},
                        {"id": 16, "prompt": "⑯ おみやげも [かっ] て かえりました", "options": ["買って", "売って", "持って", "取って"], "answer": "買って", "explanation": "かって viết là 買って (mua quà lưu niệm)."},
                        {"id": 17, "prompt": "⑰ おみやげも かって [かえり] ました", "options": ["帰りました", "行きました", "来ました", "出ました"], "answer": "帰りました", "explanation": "かえりました viết là 帰りました (trở về)."},
                        {"id": 18, "prompt": "⑱ たのしい [いちにち] でした", "options": ["一日", "毎日", "休日", "今日"], "answer": "一日", "explanation": "いちにち viết là 一日 (một ngày trọn vẹn tuyệt vời)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 14: じかん-2 (Trang 128, 129)
        # =========================================================================
        14: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 ふじ山りょこうの パンフレット (Tờ rơi du lịch núi Phú Sĩ)",
                "instruction": "Dựa vào tờ rơi du lịch Phú Sĩ và hội thoại trang 128, điền đầy đủ chữ Hán đúng cho 9 vị trí ① đến ⑨.",
                "image_url": "/assets/kanji/n5/minigames/chap14_minigame_p128.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① あなた: もしもし、田中さん (いま) [ ? ] 話しても いいですか。", "options": ["今", "金", "令", "合"], "answer": "今", "explanation": "いま viết là chữ 今 (bây giờ)."},
                        {"id": 2, "prompt": "② 田中さん: はい、(なん) [ ? ] ですか。", "options": ["何", "荷", "河", "苛"], "answer": "何", "explanation": "なん viết là chữ 何 (cái gì)."},
                        {"id": 3, "prompt": "③ 田中さん: 30日は (なん) [ ? ] よう日ですか。", "options": ["何", "荷", "今", "幾"], "answer": "何", "explanation": "なんようび viết là 何曜日 (thứ mấy)."},
                        {"id": 4, "prompt": "④ あなた: [ ? ] よう日です。(Nhìn tờ rơi: 5月30日(土))", "options": ["土", "日", "月", "金"], "answer": "土", "explanation": "Tờ rơi ghi rõ (土) tức 土曜日 (thứ Bảy)."},
                        {"id": 5, "prompt": "⑤ 田中さん: (なんじ) [ ? ] の バスですか。", "options": ["何時", "日時", "幾時", "今時"], "answer": "何時", "explanation": "なんじ viết là chữ 何時 (mấy giờ)."},
                        {"id": 6, "prompt": "⑥ あなた: 9 [ ? ] です。(Nhìn tờ rơi: 9:30)", "options": ["時半", "分", "時間", "時"], "answer": "時半", "explanation": "9:30 nói bằng chữ Hán là 9時半 (chín rưỡi)."},
                        {"id": 7, "prompt": "⑦ あなた: (おとな) [ ? ] は 一人 7,500円ですよ。", "options": ["大人", "小人", "男の人", "女の人"], "answer": "大人", "explanation": "おとな viết là chữ 大人 (người lớn: 7,500 yên)."},
                        {"id": 8, "prompt": "⑧ あなた: そうですね。(きょう) [ ? ] ARCツアーに 電話します。", "options": ["今日", "今月", "今年", "毎日"], "answer": "今日", "explanation": "きょう viết là 今日 (hôm nay)."},
                        {"id": 9, "prompt": "⑨ あなた: ARCツアーに [ ? ] して よやくします。", "options": ["電話", "手紙", "電車", "会話"], "answer": "電話", "explanation": "でんわして viết là 電話して (gọi điện thoại đặt chỗ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 AとBを あわせて かん字を つくりましょう (Ghép bộ thủ A và B tạo chữ Hán)",
                "instruction": "Ghép các bộ thủ ở hộp A (日, 亻, 人, 門, 言, 八) với hộp B (売, ラ, 可, 刀, 寺, 日) để tạo thành chữ Hán thời gian (5 câu trang 129).",
                "image_url": "/assets/kanji/n5/minigames/chap14_minigame_p129.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 言 + 売", "answer": "読"},
                    "questions": [
                        {"id": 1, "prompt": "1. Ghép A: 日 + B: 寺 = [ ? ]", "options": ["時", "待", "持", "特"], "answer": "時", "explanation": "Nhật 日 + Tự 寺 tạo thành chữ 時 (THỜI - thời gian, giờ giấc じかん)."},
                        {"id": 2, "prompt": "2. Ghép A: 八 + B: 刀 = [ ? ]", "options": ["分", "切", "刃", "初"], "answer": "分", "explanation": "Bát 八 + Đao 刀 tạo thành chữ 分 (PHÂN - phút, phân chia ぷん)."},
                        {"id": 3, "prompt": "3. Ghép A: 人 + B: ラ = [ ? ]", "options": ["今", "令", "会", "合"], "answer": "今", "explanation": "Nhân 人 + ラ tạo thành chữ 今 (KIM - bây giờ いま)."},
                        {"id": 4, "prompt": "4. Ghép A: 門 + B: 日 = [ ? ]", "options": ["間", "問", "開", "聞"], "answer": "間", "explanation": "Môn 門 + Nhật 日 tạo thành chữ 間 (GIAN - khoảng thời gian あいだ)."},
                        {"id": 5, "prompt": "5. Ghép A: 亻 + B: 可 = [ ? ]", "options": ["何", "河", "荷", "歌"], "answer": "何", "explanation": "Nhân đứng 亻 + Khả 可 tạo thành chữ 何 (HÀ - cái gì, mấy なに)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 かん字の 読み方を 書きましょう (Cách đọc chữ Hán trong câu phỏng vấn)",
                "instruction": "Đọc các câu hỏi hội thoại bạn bè ở bài 【3】 trang 129 và chọn cách đọc Furigana chuẩn xác cho đầy đủ 6 chữ Hán gạch chân.",
                "image_url": "/assets/kanji/n5/minigames/chap14_minigame_p129.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① 友だち: いつも [何時] に おきますか。", "options": ["なんじ", "いつじ", "なんとき", "どき"], "answer": "なんじ", "explanation": "何時に đọc là なんじに (thức dậy lúc mấy giờ)."},
                        {"id": 2, "prompt": "② 友だち: しゅみは [何] ですか。", "options": ["なん", "なに", "どこ", "だれ"], "answer": "なん", "explanation": "何ですか đọc là なんですか (sở thích là gì)."},
                        {"id": 3, "prompt": "③ 友だち: [今日] の ごご 時間が ありますか。", "options": ["きょう", "こんにち", "いまひ", "きょうび"], "answer": "きょう", "explanation": "今日の đọc là きょうの (chiều ngày hôm nay)."},
                        {"id": 4, "prompt": "④ 友だち: 今日の ごご [時間] が ありますか。", "options": ["じかん", "ときま", "じま", "かんじ"], "answer": "じかん", "explanation": "時間が đọc là じかんが (có thời gian/rảnh không)."},
                        {"id": 5, "prompt": "⑤ 友だち: [今] いちばん 何が ほしいですか。", "options": ["いま", "こん", "きょう", "ほん"], "answer": "いま", "explanation": "今は đọc là いま (bây giờ)."},
                        {"id": 6, "prompt": "⑥ 友だち: 今 いちばん [何] が ほしいですか。", "options": ["なに", "なん", "どれ", "どちら"], "answer": "なに", "explanation": "何が đọc là なにが (muốn có thứ gì nhất)."}
                    ]
                }
            }
        ],

        # =========================================================================
        # CHƯƠNG 15: ようす (Trang 136, 137)
        # =========================================================================
        15: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "【1】 ヒントを よんで かんじを かきましょう (Đọc gợi ý chọn tính từ)",
                "instruction": "Đọc gợi ý tình huống tương ứng trong từng khung ở trang 136 và chọn tính từ chuẩn xác (6 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap15_minigame_p136.webp",
                "display_order": 1,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "1. あの レストランは おきゃくさんが [ ? ] ないですね。(ヒント: あまり 人が いません)", "options": ["少 (すく)", "多 (おお)", "新 (あたら)", "古 (ふる)"], "answer": "少 (すく)", "explanation": "Vắng khách, ít người: 少ない (すくない). Chữ 少."},
                        {"id": 2, "prompt": "2. しぶやは わかい 人が [ ? ] い まちです。(ヒント: たくさん 人が います)", "options": ["多 (おお)", "少 (すく)", "高 (たか)", "安 (やす)"], "answer": "多 (おお)", "explanation": "Nhiều người, đông đúc: 多い (おおい). Chữ 多."},
                        {"id": 3, "prompt": "3. わたしの 車は [ ? ] しいです。(ヒント: 3日まえに 買いました)", "options": ["新 (あたら)", "古 (ふる)", "安 (やす)", "高 (たか)"], "answer": "新 (あたら)", "explanation": "Xe mới mua 3 ngày trước: 新しい (あたらしい). Chữ 新."},
                        {"id": 4, "prompt": "4. わたしの とけいは とても [ ? ] いです。(ヒント: 10年まえに 友だちに もらいました)", "options": ["古 (ふる)", "新 (あたら)", "安 (やす)", "少 (すく)"], "answer": "古 (ふる)", "explanation": "Đồng hồ cũ được tặng 10 năm trước: 古い (ふるい). Chữ 古."},
                        {"id": 5, "prompt": "5. このりんごは とても [ ? ] かったです。(ヒント: スーパーで 200円でした)", "options": ["安 (やす)", "高 (たか)", "少 (すく)", "新 (あたら)"], "answer": "安 (やす)", "explanation": "Táo siêu thị giảm giá chỉ 200 yên rất rẻ: 安かった (やすかった). Chữ 安."},
                        {"id": 6, "prompt": "6. このゆびわは とても [ ? ] かったです。(ヒント: ボーナスで 買いました 500,000円)", "options": ["高 (たか)", "安 (やす)", "新 (あたら)", "多 (おお)"], "answer": "高 (たか)", "explanation": "Nhẫn kim cương 500,000 yên rất đắt: 高かった (たかかった). Chữ 高."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【2】 かん字を つくりましょう (Phép cộng bộ thủ tạo chữ Kanji)",
                "instruction": "Ghép các bộ thủ được cộng lại ở bài 【2】 trang 137 để tạo thành chữ Hán tính từ/trạng thái (5 câu).",
                "image_url": "/assets/kanji/n5/minigames/chap15_minigame_p137.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "れい: 日 + 月 -> 明", "answer": "明"},
                    "questions": [
                        {"id": 1, "prompt": "1. 宀 + 女 -> [ ? ]", "options": ["安", "字", "家", "好"], "answer": "安", "explanation": "Bộ Miên 宀 trên đầu người phụ nữ 女 tạo thành chữ 安 (AN - an toàn, rẻ やすい)."},
                        {"id": 2, "prompt": "2. 夕 + 夕 -> [ ? ]", "options": ["多", "名", "外", "夜"], "answer": "多", "explanation": "Hai bộ Tịch 夕 xếp chồng lên nhau tạo thành chữ 多 (ĐA - nhiều おおい)."},
                        {"id": 3, "prompt": "3. 小 + 丿 -> [ ? ]", "options": ["少", "小", "水", "不"], "answer": "少", "explanation": "Chữ Tiểu 小 thêm nét phẩy dài bên dưới tạo thành chữ 少 (THIỂU - ít すくない)."},
                        {"id": 4, "prompt": "4. 立 + 木 + 斤 -> [ ? ]", "options": ["新", "親", "析", "近"], "answer": "新", "explanation": "Chữ Lập 立 + Mộc 木 + Cân 斤 tạo thành chữ 新 (TÂN - mới あたらしい)."},
                        {"id": 5, "prompt": "5. 二 + 儿 -> [ ? ]", "options": ["元", "兄", "光", "先"], "answer": "元", "explanation": "Chữ Nhị 二 + Nhi 儿 tạo thành chữ 元 (NGUYÊN - nguồn gốc, khỏe mạnh げんき)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "【3】 トムさんの 子どもの さくぶん (Bài văn: Bố Tom kể về con gái Marie)",
                "instruction": "Đọc bài văn ngắn của bố Tom kể về cô con gái Marie ở trang 137, chọn chữ Hán/cách đọc đúng cho đầy đủ 15 vị trí từ ① đến ⑮.",
                "image_url": "/assets/kanji/n5/minigames/chap15_minigame_p137.webp",
                "display_order": 3,
                "data": {
                    "questions": [
                        {"id": 1, "prompt": "① わたしの [こども] の 名まえは マリーです", "options": ["子ども", "男の子", "女の子", "大人"], "answer": "子ども", "explanation": "こども viết là 子ども (con của tôi)."},
                        {"id": 2, "prompt": "② わたしの 子どもの [なまえ] は マリーです", "options": ["名まえ", "文字", "言葉", "名前"], "answer": "名まえ", "explanation": "なまえ viết là 名まえ (tên gọi)."},
                        {"id": 3, "prompt": "③ [ことし] 5さいです", "options": ["今年", "来年", "去年", "毎日"], "answer": "今年", "explanation": "ことし viết là 今年 (năm nay bé 5 tuổi)."},
                        {"id": 4, "prompt": "④ かみが [ながくて] かわいい 女の子です", "options": ["長くて", "短くて", "多くて", "高くて"], "answer": "長くて", "explanation": "ながくて viết là 長くて (mái tóc dài xinh xắn)."},
                        {"id": 5, "prompt": "⑤ かわいい [おんなのこ] です", "options": ["女の子", "男の子", "女の人", "子ども"], "answer": "女の子", "explanation": "おんなのこ viết là 女の子 (bé gái)."},
                        {"id": 6, "prompt": "⑥ [にほんじん] の 子どもより", "options": ["日本人", "外国人", "先生", "大人"], "answer": "日本人", "explanation": "にほんじん viết là 日本人 (người Nhật)."},
                        {"id": 7, "prompt": "⑦ 日本人の [こども] より", "options": ["子ども", "女子", "男子", "学生"], "answer": "子ども", "explanation": "こども viết là 子ども (trẻ em)."},
                        {"id": 8, "prompt": "⑧ [すこし] せが 高いです", "options": ["少し", "多く", "長く", "早く"], "answer": "少し", "explanation": "すこし viết là 少し (cao hơn một chút)."},
                        {"id": 9, "prompt": "⑨ 少し せが [たかい] です", "options": ["高い", "安い", "長い", "大きい"], "answer": "高い", "explanation": "たかい viết là 高い (dáng người cao)."},
                        {"id": 10, "prompt": "⑩ いつも [げんき] です", "options": ["元気", "天気", "気分", "安心"], "answer": "元気", "explanation": "げんき viết là 元気 (luôn vui tươi khỏe khoắn)."},
                        {"id": 11, "prompt": "⑪ きのう はじめて [にほんじん] の 友だちが うちへ きました", "options": ["日本人", "外国人", "大人", "先生"], "answer": "日本人", "explanation": "にほんじん viết là 日本人 (bạn người Nhật)."},
                        {"id": 12, "prompt": "⑫ 日本人の [ともだち] が うちへ きました", "options": ["友だち", "友達", "先生", "人"], "answer": "友だち", "explanation": "ともだち viết là 友だち (bạn bè)."},
                        {"id": 13, "prompt": "⑬ 友だちが うちへ あそびに [き] ました", "options": ["来ました", "行きました", "帰りました", "出ました"], "answer": "来ました", "explanation": "きました viết là 来ました (đến nhà chơi)."},
                        {"id": 14, "prompt": "⑭ マリーは 友だちと 日本語で [はなし] ていました", "options": ["話して", "言って", "読んで", "聞いて"], "answer": "話して", "explanation": "はなして viết là 話して (nói chuyện bằng tiếng Nhật)."},
                        {"id": 15, "prompt": "⑮ わたしと つまは 少し [あんしん] しました", "options": ["安心", "安全", "心配", "元気"], "answer": "安心", "explanation": "あんしん viết là 安心 (yên tâm, an lòng)."}
                    ]
                }
            }
        ]
    }

    # Execute DB update
    for chapter_num, games in AUTHENTIC_MINIGAMES.items():
        # Lấy chapter_id
        cur.execute("SELECT id FROM kanji_chapters WHERE chapter_number = %s;", (chapter_num,))
        ch_row = cur.fetchone()
        if not ch_row:
            print(f"ERROR: Chapter {chapter_num} not found in DB!")
            continue
        ch_id = ch_row[0]

        # Xóa các minigame cũ của chương này
        cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))

        # Chèn từng minigame chuẩn mới với 100% câu hỏi
        for g in games:
            game_json_str = json.dumps(g["data"], ensure_ascii=False)
            cur.execute("""
                INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
            """, (ch_id, g["game_type"], g["title"], g["instruction"], g["image_url"], game_json_str, g["display_order"]))

        total_qs = sum(len(g["data"]["questions"]) for g in games)
        print(f"✓ Chapter {chapter_num:2d}: Seeded {len(games)} games with {total_qs:2d} TOTAL QUESTIONS!")

    conn.commit()
    print("=" * 80)
    print("ALL MINIGAMES SUCCESSFULLY SEEDED WITH 100% QUESTIONS!")
    print("=" * 80)

except Exception as e:
    conn.rollback()
    print(f"FAILED: {e}")
    sys.exit(1)
finally:
    cur.close()
    conn.close()
