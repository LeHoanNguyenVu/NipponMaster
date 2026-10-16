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
    print("=" * 60)
    print("SEEDING ALL REMAINING CHAPTERS (CH 5 TO 15) FOR KANJI MASTER N5")
    print("=" * 60)

    # 1. Update image_url for ALL kanjis in chapters 5 to 15
    for ch in range(5, 16):
        cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch,))
        row = cur.fetchone()
        if not row:
            print(f"Chapter {ch} not found!")
            continue
        ch_id = row[0]

        cur.execute("""
            SELECT id, character, chapter_order 
            FROM kanjis 
            WHERE chapter_id = %s 
            ORDER BY chapter_order;
        """, (ch_id,))
        kanjis = cur.fetchall()
        for idx, k in enumerate(kanjis, 1):
            img_url = f"/assets/kanji/n5/illustrations/chap{ch}_kanji_{idx}.webp"
            cur.execute("UPDATE kanjis SET image_url = %s WHERE id = %s;", (img_url, k[0]))
        print(f"Updated {len(kanjis)} kanji image_urls for Chapter {ch}.")

    # 2. Comprehensive data dictionary for Chapters 5 to 15
    CHAPTER_DATA = {
        5: {
            "title": "ばしょ",
            "vocabs": [
                ("上", "うえ", "ue", "Bên trên, phía trên", "Up, above", 1),
                ("下", "した", "shita", "Bên dưới, phía dưới", "Down, below", 2),
                ("年上", "としうえ", "toshiue", "Lớn tuổi hơn", "Older", 3),
                ("年下", "としした", "toshishita", "Nhỏ tuổi hơn", "Younger", 4),
                ("上下", "じょうげ", "jouge", "Trên dưới, lên xuống", "Up and down", 5),
                ("上がる", "あがる", "agaru", "Đi lên, tăng lên", "To go up", 6),
                ("下がる", "さがる", "sagaru", "Đi xuống, giảm xuống", "To go down", 7),
                ("左", "ひだり", "hidari", "Bên trái", "Left", 8),
                ("右", "みぎ", "migi", "Bên phải", "Right", 9),
                ("左右", "さゆう", "sayuu", "Trái phải", "Left and right", 10),
                ("右手", "みぎて", "migite", "Tay phải", "Right hand", 11),
                ("左手", "ひだりて", "hidarite", "Tay trái", "Left hand", 12),
                ("外", "そと", "soto", "Bên ngoài", "Outside", 13),
                ("外国", "がいこく", "gaikoku", "Nước ngoài", "Foreign country", 14),
                ("外国人", "がいこくじん", "gaikokujin", "Người nước ngoài", "Foreigner", 15),
                ("外出", "がいしゅつ", "gaishutsu", "Đi ra ngoài", "Going out", 16),
                ("内", "うち", "uchi", "Bên trong, nội bộ", "Inside", 17),
                ("国内", "こくない", "kokunai", "Trong nước", "Domestic", 18),
                ("中", "なか", "naka", "Ở giữa, bên trong", "Middle, inside", 19),
                ("一日中", "いちにちじゅう", "ichinichijuu", "Suốt cả ngày", "All day long", 20),
                ("中国", "ちゅうごく", "chuugoku", "Trung Quốc", "China", 21),
                ("中学", "ちゅうがく", "chuugaku", "Trường cấp 2", "Junior high school", 22),
            ],
            "reading": [
                ("おとうとは [年下]です。", "年下", "としした", ["としした", "としうえ", "ねんした", "ねんげ"], "年下 (nhỏ tuổi hơn) đọc là としした.", 1),
                ("かいだんで [上がって]ください。", "上がって", "あがって", ["あがって", "さがって", "のぼって", "はいって"], "上がって (đi lên tầng) đọc là あがって.", 2),
                ("つくえの [上に] なにが ありますか。", "上に", "うえに", ["うえに", "したに", "なかに", "そばに"], "上に (ở bên trên) đọc là うえに.", 3),
                ("二ばんホームに [下りの] でんしゃが きます。", "下りの", "くだりの", ["くだりの", "のぼりの", "さがるの", "したりの"], "下り (tàu xuôi / chiều về) đọc là くだり.", 4),
                ("わたしの しゅみは [水上]スキーです。", "水上", "すいじょう", ["すいじょう", "みずうえ", "すいうえ", "みずじょう"], "水上スキー (lướt ván nước): chữ 上 đọc là じょう (すいじょう).", 5),
                ("きょうは [一日中] あつかったです。", "一日中", "いちにちじゅう", ["いちにちじゅう", "ついたちちゅう", "いちにちなか", "ひじゅう"], "一日中 (suốt cả ngày) đọc là いちにちじゅう.", 6),
                ("[左右]を よく みて おうだんほどうを わたってください。", "左右", "さゆう", ["さゆう", "ひだりみぎ", "みぎひだり", "さこう"], "左右 (trái phải) đọc âm On là さゆう.", 7),
                ("やまぐちせんせいは いま [外出]しています。", "外出", "がいしゅつ", ["がいしゅつ", "そとで", "そとしゅつ", "がいしゅ"], "外出 (đi ra ngoài) đọc là がいしゅつ.", 8),
                ("まどの [内側]も よく ふいてください。", "内側", "うちがわ", ["うちがわ", "ないがわ", "そとがわ", "なかそば"], "内側 (phía bên trong) đọc là うちがわ.", 9),
                ("このかどを [右に] まがってください。", "右に", "みぎに", ["みぎに", "ひだりに", "うえに", "まえに"], "右に (rẽ bên phải) đọc là みぎに.", 10),
            ],
            "writing": [
                ("[としうえ]の 人と けっこんしたいです。Kanji là:", "としうえ", "年上", ["年上", "歳上", "年中", "年高"], "としうえ (người lớn tuổi hơn) viết là 年上.", 1),
                ("あついですから [そと]に でたくないです。Kanji là:", "そと", "外", ["外", "内", "中", "処"], "そと (bên ngoài) viết chữ Hán là 外.", 2),
                ("いすの [した]に ねこが います。Kanji là:", "した", "下", ["下", "上", "不", "正"], "した (bên dưới) viết chữ Hán là 下.", 3),
                ("せいせきが [さ]がりました。Kanji là:", "さ", "下", ["下", "降", "落", "少"], "さがる (giảm xuống, hạ xuống) viết là 下がる.", 4),
                ("つくえの [みぎ]がわに たってください。Kanji là:", "みぎ", "右", ["右", "左", "石", "若"], "みぎ (bên phải) viết chữ Hán là 右.", 5),
                ("わたしは [ひだり]ききです。Kanji là:", "ひだり", "左", ["左", "右", "在", "友"], "ひだり (bên trái) viết chữ Hán là 左.", 6),
                ("デパートで [じょうげ]セットを かいました。Kanji là:", "じょうげ", "上下", ["上下", "上中", "下上", "高低"], "じょうげ (trên dưới / bộ quần áo) viết là 上下.", 7),
                ("なつやすみに [こくない]を りょこうしました。Kanji là:", "こくない", "国内", ["国内", "国中", "国外", "国間"], "こくない (trong nước) viết là 国内.", 8),
                ("かばんの [なか]に 水が あります。Kanji là:", "なか", "中", ["中", "内", "央", "仲"], "なか (bên trong) viết chữ Hán là 中.", 9),
                ("やまだせんせいは いま [じゅぎょうちゅう]です。Kanji là:", "じゅぎょうちゅう", "授業中", ["授業中", "授業内", "授業間", "受業中"], "じゅぎょうちゅう (đang trong giờ học) dùng chữ 中.", 10),
            ],
            "minigame_title": "Minigame Chương 5: Xác định vị trí đồ vật & Nơi chốn",
            "minigame_img": "/assets/kanji/n5/minigames/chap5_minigame_p52.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Mũi tên chỉ hướng lên trên (↑):", "options": ["上", "下", "左", "右"], "answer": "上", "explanation": "Chữ 上 (THƯỢNG) biểu thị vị trí bên trên." },
                { "id": 2, "prompt": "2. Mũi tên chỉ hướng xuống dưới (↓):", "options": ["下", "上", "中", "外"], "answer": "下", "explanation": "Chữ 下 (HẠ) biểu thị vị trí bên dưới." },
                { "id": 3, "prompt": "3. Mũi tên chỉ sang bên trái (←):", "options": ["左", "右", "内", "中"], "answer": "左", "explanation": "Chữ 左 (TẢ) biểu thị phương hướng bên trái." },
                { "id": 4, "prompt": "4. Mũi tên chỉ sang bên phải (→):", "options": ["右", "左", "外", "上"], "answer": "右", "explanation": "Chữ 右 (HỮU) biểu thị phương hướng bên phải." },
                { "id": 5, "prompt": "5. Bên trong chiếc hộp kín (In):", "options": ["中", "外", "上", "下"], "answer": "中", "explanation": "Chữ 中 (TRUNG) chỉ vị trí bên trong, ở giữa." },
                { "id": 6, "prompt": "6. Bước ra ngoài trời mưa (Out):", "options": ["外", "内", "中", "右"], "answer": "外", "explanation": "Chữ 外 (NGOẠI) chỉ vị trí bên ngoài." }
            ]
        },
        6: {
            "title": "学校-1",
            "vocabs": [
                ("学校", "がっこう", "gakkou", "Trường học", "School", 1),
                ("学生", "がくせい", "gakusei", "Học sinh, sinh viên", "Student", 2),
                ("大学", "だいがく", "daigaku", "Trường đại học", "University", 3),
                ("高校", "こうこう", "koukou", "Trường cấp 3", "High school", 4),
                ("小学校", "しょうがっこう", "shougakkou", "Trường tiểu học", "Elementary school", 5),
                ("中学校", "ちゅうがっこう", "chuugakkou", "Trường trung học cơ sở", "Junior high school", 6),
                ("先生", "せんせい", "sensei", "Giáo viên, thầy cô", "Teacher", 7),
                ("先月", "せんげつ", "sengetsu", "Tháng trước", "Last month", 8),
                ("先週", "せんしゅう", "senshuu", "Tuần trước", "Last week", 9),
                ("生まれる", "うまれる", "umareru", "Sinh ra", "To be born", 10),
                ("誕生日", "たんじょうび", "tanjoubi", "Ngày sinh nhật", "Birthday", 11),
                ("名前", "なまえ", "namae", "Tên họ", "Name", 12),
                ("名字", "みょうじ", "myouji", "Họ (tên họ)", "Surname", 13),
                ("有名", "ゆうめい", "yuumei", "Nổi tiếng", "Famous", 14),
                ("漢字", "かんじ", "kanji", "Chữ Hán", "Kanji", 15),
                ("文字", "もじ", "moji", "Ký tự, văn tự", "Letter, character", 16),
                ("本", "ほん", "hon", "Sách", "Book", 17),
                ("日本", "にほん", "nihon", "Nhật Bản", "Japan", 18),
                ("日本語", "にほんご", "nihongo", "Tiếng Nhật", "Japanese language", 19),
                ("体", "からだ", "karada", "Cơ thể, thân thể", "Body", 20),
                ("体操", "たいそう", "taisou", "Thể dục", "Gymnastics", 21),
            ],
            "reading": [
                ("あした [学校]へ いきます。", "学校", "がっこう", ["がっこう", "がくこう", "がっつこう", "だいがく"], "学校 (trường học) đọc là がっこう.", 1),
                ("たなか[先生]は やさしいです。", "先生", "せんせい", ["せんせい", "せんじょう", "さきせい", "ぜんせい"], "先生 (thầy giáo) đọc là せんせい.", 2),
                ("わたしは [学生]です。", "学生", "がくせい", ["がくせい", "がくしょう", "がっせい", "がくせん"], "学生 (học sinh) đọc là がくせい.", 3),
                ("お[名前]は なんですか。", "名前", "なまえ", ["なまえ", "めいぜん", "みょうまえ", "なまえん"], "名前 (tên) đọc là なまえ.", 4),
                ("かんじの [漢字]を れんしゅうします。", "漢字", "かんじ", ["かんじ", "かんし", "からじ", "かんち"], "漢字 (chữ Hán) đọc là かんじ.", 5),
                ("この[本]は おもしろいです。", "本", "ほん", ["ほん", "ぼん", "ぽん", "もと"], "本 (quyển sách) đọc là ほん.", 6),
                ("[体]の ちょうしが いいです。", "体", "からだ", ["からだ", "たい", "てい", "しん"], "体 (cơ thể) đọc âm Kun là からだ.", 7),
                ("[大学]で べんきょうします。", "大学", "だいがく", ["だいがく", "おおがく", "たいがく", "だいがっこう"], "大学 (đại học) đọc là だいがく.", 8),
                ("[生年月日]を かいてください。", "生年月日", "せいねんがっぴ", ["せいねんがっぴ", "しょうねんがっぴ", "いきねんつきひ", "せいねんつきひ"], "生年月日 (ngày tháng năm sinh) đọc là せいねんがっぴ.", 9),
                ("[有名]な レストランへ いきました。", "有名", "ゆうめい", ["ゆうめい", "ありな", "うめい", "ゆうな"], "有名 (nổi tiếng) đọc là ゆうめい.", 10),
            ],
            "writing": [
                ("にほんの [がっこう]で まなびます。Kanji là:", "がっこう", "学校", ["学校", "学効", "学交", "楽校"], "がっこう viết là 学校.", 1),
                ("すずき[せんせい]に あいました。Kanji là:", "せんせい", "先生", ["先生", "先正", "前生", "仙生"], "せんせい viết là 先生.", 2),
                ("[がくせい]が たくさん います。Kanji là:", "がくせい", "学生", ["学生", "学正", "楽生", "校生"], "がくせい viết là 学生.", 3),
                ("[なまえ]を かいてください。Kanji là:", "なまえ", "名前", ["名前", "名全", "名先", "明前"], "なまえ viết là 名前.", 4),
                ("きれいな [じ]を かきます。Kanji là:", "じ", "字", ["字", "学", "子", "寺"], "じ (chữ viết) viết là 字.", 5),
                ("としょかんで [ほん]を よみます。Kanji là:", "ほん", "本", ["本", "木", "体", "休"], "ほん (sách) viết chữ Hán là 本.", 6),
                ("[からだ]に きを つけてください。Kanji là:", "からだ", "体", ["体", "休", "本", "木"], "からだ viết chữ Hán là 体.", 7),
                ("[だいがく]に はいります。Kanji là:", "だいがく", "大学", ["大学", "太学", "犬学", "大校"], "だいがく viết là 大学.", 8),
                ("[かんじ]の テストが あります。Kanji là:", "かんじ", "漢字", ["漢字", "漢寺", "漢事", "幹字"], "かんじ viết là 漢字.", 9),
                ("[たいそう]を します。Kanji là:", "たいそう", "体操", ["体操", "体そう", "大操", "身操"], "たいそう (thể dục) dùng chữ 体 (体操).", 10),
            ],
            "minigame_title": "Minigame Chương 6: Lớp học & Thẻ thông tin học sinh",
            "minigame_img": "/assets/kanji/n5/minigames/chap6_minigame_p62.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Nơi thầy cô giảng bài cho học trò:", "options": ["学校", "会社", "病院", "銀行"], "answer": "学校", "explanation": "学校 (GAKKOU) là trường học." },
                { "id": 2, "prompt": "2. Người đứng lớp truyền đạt tri thức:", "options": ["先生", "学生", "医者", "社員"], "answer": "先生", "explanation": "先生 (SENSEI) là người thầy, giáo viên." },
                { "id": 3, "prompt": "3. Vật để đọc có nhiều trang giấy:", "options": ["本", "体", "名", "字"], "answer": "本", "explanation": "本 (HON) là quyển sách." },
                { "id": 4, "prompt": "4. Thông tin để xưng hô nhận diện nhau:", "options": ["名前", "漢字", "学校", "生年"], "answer": "名前", "explanation": "名前 (NAMAE) là tên họ." }
            ]
        },
        7: {
            "title": "学校-2",
            "vocabs": [
                ("大きい", "おおきい", "ookii", "To lớn", "Big, large", 1),
                ("大学", "だいがく", "daigaku", "Trường đại học", "University", 2),
                ("大人", "おとな", "otona", "Người lớn", "Adult", 3),
                ("小さい", "ちいさい", "chiisai", "Nhỏ bé", "Small, little", 4),
                ("小川", "おがわ", "ogawa", "Con suối nhỏ", "Brook", 5),
                ("小学校", "しょうがっこう", "shougakkou", "Trường tiểu học", "Elementary school", 6),
                ("高い", "たかい", "takai", "Cao, đắt tiền", "High, expensive", 7),
                ("高校", "こうこう", "koukou", "Trường cấp 3", "High school", 8),
                ("円高", "えんだか", "endaka", "Đồng Yên tăng giá", "Strong yen", 9),
                ("友達", "ともだち", "tomodachi", "Bạn bè", "Friend", 10),
                ("友人", "ゆうじん", "yuujin", "Người bạn", "Friend", 11),
                ("入る", "はいる", "hairu", "Bước vào", "To enter", 12),
                ("入れる", "いれる", "ireru", "Cho vào, bỏ vào", "To put in", 13),
                ("入口", "いりぐち", "iriguchi", "Cổng vào", "Entrance", 14),
                ("入学", "にゅうがく", "nyuugaku", "Nhập học", "Entering school", 15),
                ("出る", "でる", "deru", "Đi ra, rời khỏi", "To exit", 16),
                ("出す", "だす", "dasu", "Lấy ra, nộp bài", "To take out", 17),
                ("出口", "でぐち", "deguchi", "Cổng ra", "Exit", 18),
                ("門", "もん", "mon", "Cổng lớn", "Gate", 19),
                ("専門", "せんもん", "senmon", "Chuyên ngành, chuyên môn", "Specialty", 20),
            ],
            "reading": [
                ("[大きい] いぬが います。", "大きい", "おおきい", ["おおきい", "だいきい", "たいきい", "ふとい"], "大きい (to lớn) đọc là おおきい.", 1),
                ("[小さい] ねこが かわいらしいです。", "小さい", "ちいさい", ["ちいさい", "しょうさい", "こさい", "すくない"], "小さい (nhỏ nhắn) đọc là ちいさい.", 2),
                ("このやまは とても [高い]です。", "高い", "たかい", ["たかい", "こうい", "ひろい", "ながい"], "高い (cao lớn) đọc là たかい.", 3),
                ("しんゆうの [友達]と あそびます。", "友達", "ともだち", ["ともだち", "ゆうだち", "ほうたち", "ともたち"], "友達 (bạn bè) đọc là ともだち.", 4),
                ("へやに [入って]ください。", "入って", "はいって", ["はいって", "いって", "でて", "たって"], "入って (bước vào) đọc là はいって.", 5),
                ("えきから [出て]きました。", "出て", "でて", ["でて", "だして", "はいって", "いって"], "出て (đi ra) đọc là でて.", 6),
                ("がっこうの [正門]で まちます。", "正門", "せいもん", ["せいもん", "しょうもん", "ただもん", "せいかど"], "正門 (cổng chính) đọc là せいもん.", 7),
                ("[高校生]に なりました。", "高校生", "こうこうせい", ["こうこうせい", "たかこうせい", "こうがくせい", "こうたかせい"], "高校生 (học sinh cấp 3) đọc là こうこうせい.", 8),
                ("[入り口]は あちらです。", "入り口", "いりぐち", ["いりぐち", "はいりくち", "にゅうこう", "いりこう"], "入り口 (cửa vào) đọc là いりぐち.", 9),
                ("[出口]は こちらです。", "出口", "でぐち", ["でぐち", "だしくち", "しゅつこう", "でこう"], "出口 (cửa ra) đọc là でぐち.", 10),
            ],
            "writing": [
                ("[おおきい] こえで はなします。Kanji là:", "おおきい", "大きい", ["大きい", "太い", "犬きい", "高きい"], "おおきい viết là 大きい.", 1),
                ("[ちいさい] こどもが います。Kanji là:", "ちいさい", "小さい", ["小さい", "少さい", "微さい", "短さい"], "ちいさい viết là 小さい.", 2),
                ("[たかい] ビルが あります。Kanji là:", "たかい", "高い", ["高い", "大い", "長い", "広かい"], "たかい viết là 高い.", 3),
                ("[ともだち]と りょこうします。Kanji là:", "ともだち", "友達", ["友達", "友立", "有達", "共達"], "ともだち viết là 友達.", 4),
                ("おふろに [はい]ります。Kanji là:", "はい", "入", ["入", "人", "八", "込"], "はいる (bước vào) viết chữ Hán là 入る.", 5),
                ("うちを [で]ます。Kanji là:", "で", "出", ["出", "山", "生", "去"], "でる (rời khỏi) viết chữ Hán là 出る.", 6),
                ("えきの [もん]を とおります。Kanji là:", "もん", "門", ["門", "問", "開", "閉"], "もん (cổng) viết chữ Hán là 門.", 7),
                ("[こうこう]へ いきます。Kanji là:", "こうこう", "高校", ["高校", "高好", "向校", "公校"], "こうこう (trường THPT) viết là 高校.", 8),
                ("[いりぐち]で チケットを みせます。Kanji là:", "いりぐち", "入口", ["入口", "人ロ", "八口", "進口"], "いりぐち viết là 入口.", 9),
                ("[でぐち]を さがします。Kanji là:", "でぐち", "出口", ["出口", "山口", "生口", "去口"], "でぐち viết là 出口.", 10),
            ],
            "minigame_title": "Minigame Chương 7: Lớn - Nhỏ & Cổng ra vào trường",
            "minigame_img": "/assets/kanji/n5/minigames/chap7_minigame_p70.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Trái nghĩa với 小さい (nhỏ):", "options": ["大きい", "高い", "長い", "太い"], "answer": "大きい", "explanation": "大きい (to lớn) đối lập với 小さい (nhỏ bé)." },
                { "id": 2, "prompt": "2. Trái nghĩa với 出る (đi ra):", "options": ["入る", "立つ", "休む", "行く"], "answer": "入る", "explanation": "入る (bước vào) đối lập với 出る (đi ra)." },
                { "id": 3, "prompt": "3. Cửa để đón khách vào tham quan:", "options": ["入口", "出口", "正門", "裏口"], "answer": "入口", "explanation": "入口 (cửa vào) đón khách vào." }
            ]
        },
        8: {
            "title": "かぞく",
            "vocabs": [
                ("父", "ちち", "chichi", "Bố (của mình)", "Father", 1),
                ("お父さん", "おとうさん", "otousan", "Bố (người khác / gọi tôn kính)", "Father", 2),
                ("母", "はは", "haha", "Mẹ (của mình)", "Mother", 3),
                ("お母さん", "おかあさん", "okaasan", "Mẹ (người khác / gọi tôn kính)", "Mother", 4),
                ("父母", "ふぼ", "fubo", "Bố mẹ, phụ mẫu", "Parents", 5),
                ("子ども", "こども", "kodomo", "Trẻ em, con cái", "Child, children", 6),
                ("男", "おとこ", "otoko", "Phái nam, đàn ông", "Male, man", 7),
                ("男の子", "おとこのこ", "otokonoko", "Bé trai", "Boy", 8),
                ("男の人", "おとこのひと", "otokonohito", "Người đàn ông", "Man", 9),
                ("女", "おんな", "onna", "Phái nữ, phụ nữ", "Female, woman", 10),
                ("女の子", "おんなのこ", "onnanoko", "Bé gái", "Girl", 11),
                ("女の人", "おんなのひと", "onnanohito", "Người phụ nữ", "Woman", 12),
                ("男女", "だんじょ", "danjo", "Nam nữ", "Men and women", 13),
                ("犬", "いぬ", "inu", "Con chó", "Dog", 14),
                ("子犬", "こいぬ", "koinu", "Chó con", "Puppy", 15),
                ("鳥", "とり", "tori", "Con chim, gia cầm", "Bird, poultry", 16),
                ("小鳥", "ことり", "kotori", "Chú chim nhỏ", "Little bird", 17),
                ("焼き鳥", "やきとり", "yakitori", "Thịt gà xiên nướng", "Grilled chicken skewer", 18),
            ],
            "reading": [
                ("わたしの [父]は かいしゃいんです。", "父", "ちち", ["ちち", "はは", "ふ", "おとう"], "Chữ 父 đứng một mình chỉ bố mình đọc là ちち.", 1),
                ("わたしの [母]は りょうりが じょうずです。", "母", "はは", ["はは", "ちち", "ぼ", "おかあ"], "Chữ 母 đứng một mình chỉ mẹ mình đọc là はは.", 2),
                ("[子ども]たちが こうえんで あそんでいます。", "子ども", "こども", ["こども", "しども", "こじん", "こたち"], "子ども (trẻ em) đọc là こども.", 3),
                ("あそこに [男の人]が います。", "男の人", "おとこのひと", ["おとこのひと", "なんのひと", "だんのひと", "おとこじん"], "男の人 (người đàn ông) đọc là おとこのひと.", 4),
                ("[女の子]が わらっています。", "女の子", "おんなのこ", ["おんなのこ", "じょのこ", "めすのこ", "おんなし"], "女の子 (bé gái) đọc là おんなのこ.", 5),
                ("かわいい [子犬]を かっています。", "子犬", "こいぬ", ["こいぬ", "しいぬ", "こけん", "しょうけん"], "子犬 (chó con) đọc là こいぬ.", 6),
                ("そらに [小鳥]が とんでいます。", "小鳥", "ことり", ["ことり", "しょうちょう", "こちょう", "ちいさいとり"], "小鳥 (chim nhỏ) đọc là ことり.", 7),
                ("[父母]に かんしゃの てがみを おくります。", "父母", "ふぼ", ["ふぼ", "ちちはは", "ふも", "ぶぼ"], "父母 (bố mẹ) đọc âm On là ふぼ.", 8),
                ("[男女]の なかよしグループです。", "男女", "だんじょ", ["だんじょ", "おとこおんな", "なんにょ", "だんにょ"], "男女 (nam nữ) đọc là だんじょ.", 9),
                ("いざかやで [焼き鳥]を たべました。", "焼き鳥", "やきとり", ["やきとり", "やきちょう", "しょうちょう", "やきどり"], "焼き鳥 (thịt gà nướng) đọc là やきとり.", 10),
            ],
            "writing": [
                ("[ちち]と キャッチボールを します。Kanji là:", "ちち", "父", ["父", "交", "文", "母"], "ちち (bố) viết chữ Hán là 父.", 1),
                ("[はは]の えがおが だいすきです。Kanji là:", "はは", "母", ["母", "毎", "父", "女"], "はは (mẹ) viết chữ Hán là 母.", 2),
                ("[こども]の ひに こいのぼりを かざります。Kanji là:", "こども", "子ども", ["子ども", "女子も", "小ども", "好ども"], "こども viết là 子ども.", 3),
                ("[おとこのこ]が げんきに はしります。Kanji là:", "おとこのこ", "男の子", ["男の子", "田の子", "力の子", "勇の子"], "おとこのこ viết là 男の子.", 4),
                ("[おんなのひと]が ピアノを ひきます。Kanji là:", "おんなのひと", "女の人", ["女の人", "好の人", "安の人", "如の人"], "おんなのひと viết là 女の人.", 5),
                ("[いぬ]が しっぽを ふっています。Kanji là:", "いぬ", "犬", ["犬", "太", "大", "天"], "いぬ (chó) viết chữ Hán là 犬 (thêm dấu chấm trên chữ 大).", 6),
                ("[とり]が えだに とまっています。Kanji là:", "とり", "鳥", ["鳥", "島", "烏", "鳴"], "とり (chim) viết chữ Hán là 鳥.", 7),
                ("[ふぼ]を たいせつにします。Kanji là:", "ふぼ", "父母", ["父母", "母父", "父女", "父毎"], "ふぼ viết là 父母.", 8),
                ("[だんじょ]びょうどうを まなびます。Kanji là:", "だんじょ", "男女", ["男女", "女男", "田女", "男子"], "だんじょ viết là 男女.", 9),
                ("[ことり]に えさを あげます。Kanji là:", "ことり", "小鳥", ["小鳥", "少鳥", "子鳥", "細鳥"], "ことり (chim nhỏ) viết là 小鳥.", 10),
            ],
            "minigame_title": "Minigame Chương 8: Gia đình thân thương & Thú cưng",
            "minigame_img": "/assets/kanji/n5/minigames/chap8_minigame_p78.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Người sinh thành và nuôi dưỡng cùng mẹ:", "options": ["父", "母", "兄", "弟"], "answer": "父", "explanation": "父 (CHICHI) là bố." },
                { "id": 2, "prompt": "2. Người phụ nữ sinh ra bạn:", "options": ["母", "父", "姉", "妹"], "answer": "母", "explanation": "母 (HAHA) là mẹ." },
                { "id": 3, "prompt": "3. Con vật nuôi trung thành hay sủa gâu gâu:", "options": ["犬", "鳥", "猫", "牛"], "answer": "犬", "explanation": "犬 (INU) là con chó." },
                { "id": 4, "prompt": "4. Loài động vật có lông vũ và biết bay:", "options": ["鳥", "犬", "魚", "虫"], "answer": "鳥", "explanation": "鳥 (TORI) là con chim." }
            ]
        },
        9: {
            "title": "どうし-1",
            "vocabs": [
                ("立つ", "たつ", "tatsu", "Đứng lên", "To stand", 1),
                ("休む", "やすむ", "yasumu", "Nghỉ ngơi", "To rest", 2),
                ("休み", "やすみ", "yasumi", "Ngày nghỉ", "Holiday, vacation", 3),
                ("休日", "きゅうじつ", "kyuujitsu", "Ngày nghỉ lễ", "Day off", 4),
                ("見る", "みる", "miru", "Nhìn, xem", "To see, look", 5),
                ("見せる", "みせる", "miseru", "Cho xem", "To show", 6),
                ("見学", "けんがく", "kengaku", "Tham quan học tập", "Study tour", 7),
                ("聞く", "きく", "kiku", "Nghe, hỏi", "To listen, ask", 8),
                ("新聞", "しんぶん", "shinbun", "Tờ báo", "Newspaper", 9),
                ("行く", "いく", "iku", "Đi tới", "To go", 10),
                ("旅行", "りょこう", "ryokou", "Du lịch", "Travel, trip", 11),
                ("来る", "くる", "kuru", "Đến tới", "To come", 12),
                ("来年", "らいねん", "rainen", "Năm sau", "Next year", 13),
                ("来月", "らいげつ", "raigetsu", "Tháng sau", "Next month", 14),
                ("帰る", "かえる", "kaeru", "Trở về (nhà, nước)", "To return", 15),
                ("帰国", "きこく", "kikoku", "Về nước", "Returning home country", 16),
            ],
            "reading": [
                ("せきから [立って]ください。", "立って", "たって", ["たって", "すわって", "やすんで", "いって"], "立って (hãy đứng lên) đọc là たって.", 1),
                ("きょうは かいしゃの [休み]です。", "休み", "やすみ", ["やすみ", "きゅうみ", "たてみ", "みずみ"], "休み (ngày nghỉ) đọc là やすみ.", 2),
                ("えいがを [見ます]。", "見ます", "みます", ["みます", "ききます", "いきます", "かえります"], "見ます (xem phim) đọc là みます.", 3),
                ("おんがくを [聞きます]。", "聞きます", "ききます", ["ききます", "みます", "いいます", "かきます"], "聞きます (nghe nhạc) đọc là ききます.", 4),
                ("あした とうきょうへ [行きます]。", "行きます", "いきます", ["いきます", "きます", "かえります", "おります"], "行きます (đi Tokyo) đọc là いきます.", 5),
                ("ともだちが うちへ [来ます]。", "来ます", "きます", ["きます", "いきます", "かえります", "みます"], "来ます (đến nhà) đọc là きます.", 6),
                ("ろくじに うちへ [帰ります]。", "帰ります", "かえります", ["かえります", "いきます", "きます", "やすみます"], "帰ります (về nhà) đọc là かえります.", 7),
                ("[休日]は なにを しますか。", "休日", "きゅうじつ", ["きゅうじつ", "やすみひ", "きゅうひ", "やすみび"], "休日 (ngày nghỉ) đọc là きゅうじつ.", 8),
                ("[来年] にほんへ りゅうがくします。", "来年", "らいねん", ["らいねん", "きねん", "こねん", "まいねん"], "来年 (năm sau) đọc là らいねん.", 9),
                ("こうじょうの [見学]を しました。", "見学", "けんがく", ["けんがく", "みかく", "みまなび", "けんこう"], "見学 (tham quan kiến tập) đọc là けんがく.", 10),
            ],
            "writing": [
                ("きりつのごうれいで [た]ちます。Kanji là:", "た", "立", ["立", "休", "位", "音"], "たつ (đứng lên) viết là 立つ.", 1),
                ("ベッドで ゆっくり [やす]みます。Kanji là:", "やす", "休", ["休", "体", "木", "本"], "やすむ (nghỉ ngơi) viết là 休む.", 2),
                ("アニメを [み]るのが すきです。Kanji là:", "み", "見", ["見", "貝", "目", "観"], "みる (xem, nhìn) viết là 見る.", 3),
                ("ラジオの ニュースを [き]きます。Kanji là:", "き", "聞", ["聞", "間", "門", "問"], "きく (nghe) viết là 聞く (chữ 耳 bên trong chữ 門).", 4),
                ("きょうとへ [い]きます。Kanji là:", "い", "行", ["行", "来", "走", "待"], "いく (đi) viết là 行く.", 5),
                ("あした せんせいが [き]ます。Kanji là:", "き", "来", ["来", "行", "未", "東"], "くる (đến) viết là 来る.", 6),
                ("くにへ [かえ]りたいです。Kanji là:", "かえ", "帰", ["帰", "反", "返", "復"], "かえる (trở về) viết là 帰る.", 7),
                ("[きゅうじつ]にしゅっきんします。Kanji là:", "きゅうじつ", "休日", ["休日", "体日", "休月", "木日"], "きゅうじつ viết là 休日.", 8),
                ("[らいげつ] はじめて にほんへ いきます。Kanji là:", "らいげつ", "来月", ["来月", "去月", "毎月", "今月"], "らいげつ viết là 来月.", 9),
                ("らいしゅう [きこく]します。Kanji là:", "きこく", "帰国", ["帰国", "去国", "返国", "入国"], "きこく (về nước) viết là 帰国.", 10),
            ],
            "minigame_title": "Minigame Chương 9: Hoạt động thường nhật trong ngày",
            "minigame_img": "/assets/kanji/n5/minigames/chap9_minigame_p86.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Hành động dùng đôi mắt để thưởng thức:", "options": ["見る", "聞く", "行く", "立つ"], "answer": "見る", "explanation": "見る (MIRU) là nhìn, xem." },
                { "id": 2, "prompt": "2. Hành động dùng đôi tai để cảm nhận âm thanh:", "options": ["聞く", "見る", "言う", "休む"], "answer": "聞く", "explanation": "聞く (KIKU) là lắng nghe." },
                { "id": 3, "prompt": "3. Kết thúc giờ làm việc để trở về tổ ấm:", "options": ["帰る", "行く", "来る", "立つ"], "answer": "帰る", "explanation": "帰る (KAERU) là trở về nhà." }
            ]
        },
        10: {
            "title": "たべもの",
            "vocabs": [
                ("米", "こめ", "kome", "Gạo, hạt cơm", "Rice", 1),
                ("お茶", "おちゃ", "ocha", "Trà xanh", "Green tea", 2),
                ("紅茶", "こうちゃ", "koucha", "Hồng trà", "Black tea", 3),
                ("茶色", "ちゃいろ", "chairo", "Màu nâu", "Brown", 4),
                ("牛", "うし", "ushi", "Con bò", "Cow", 5),
                ("牛肉", "ぎゅうにく", "gyuuniku", "Thịt bò", "Beef", 6),
                ("牛乳", "ぎゅうにゅう", "gyuunyuu", "Sữa bò tươi", "Milk", 7),
                ("肉", "にく", "niku", "Thịt", "Meat", 8),
                ("鳥肉", "とりにく", "toriniku", "Thịt gà", "Chicken", 9),
                ("魚", "さかな", "sakana", "Con cá", "Fish", 10),
                ("金魚", "きんぎょ", "kingyo", "Cá vàng", "Goldfish", 11),
                ("貝", "かい", "kai", "Con sò, hến, ốc", "Shellfish", 12),
                ("好き", "すき", "suki", "Yêu thích", "Like, favorite", 13),
                ("大好物", "だいこうぶつ", "daikoubutsu", "Món ăn cực kỳ yêu thích", "Favorite food", 14),
                ("物", "もの", "mono", "Đồ vật, vật chất", "Thing, object", 15),
                ("食べ物", "たべもの", "tabemono", "Đồ ăn", "Food", 16),
                ("飲み物", "のみもの", "nomimono", "Đồ uống", "Drink, beverage", 17),
                ("買い物", "かいもの", "kaimono", "Mua sắm", "Shopping", 18),
            ],
            "reading": [
                ("にほんの [お米]は とても おいしいです。", "お米", "おこめ", ["おこめ", "おまい", "おべい", "おこ"], "お米 (hạt gạo) đọc là おこめ.", 1),
                ("しょくごに あたたかい [お茶]を のみます。", "お茶", "おちゃ", ["おちゃ", "おさ", "おてぃ", "おちゃいろ"], "お茶 (trà) đọc là おちゃ.", 2),
                ("まいあさ [牛乳]を いっぱいのんでいます。", "牛乳", "ぎゅうにゅう", ["ぎゅうにゅう", "うしちち", "ぎゅうにゅ", "うしにゅう"], "牛乳 (sữa tươi) đọc là ぎゅうにゅう.", 3),
                ("スーパーで [牛肉]を かいました。", "牛肉", "ぎゅうにく", ["ぎゅうにく", "うしにく", "ぎゅうじし", "うしじし"], "牛肉 (thịt bò) đọc là ぎゅうにく.", 4),
                ("いけで [魚]が およいでいます。", "魚", "さかな", ["さかな", "ぎょ", "うお", "ざかな"], "魚 (con cá) đọc âm Kun là さかな.", 5),
                ("かいがんで きれいな [貝]を ひろいました。", "貝", "かい", ["かい", "ばい", "がい", "こ"], "貝 (con sò) đọc là かい.", 6),
                ("にほんりょうりが [大好き]です。", "大好き", "だいすき", ["だいすき", "たいすき", "おおすき", "だいこう"], "大好き (rất thích) đọc là だいすき.", 7),
                ("おいしい [食べ物]を たくさん たべました。", "食べ物", "たべもの", ["たべもの", "しょくぶつ", "たべぶつ", "しょくもの"], "食べ物 (thức ăn) đọc là たべもの.", 8),
                ("つめたい [飲み物]を ください。", "飲み物", "のみもの", ["のみもの", "いんぶつ", "のみぶつ", "いんもの"], "飲み物 (thức uống) đọc là のみもの.", 9),
                ("しゅうまつに デパートへ [買い物]に いきます。", "買い物", "かいもの", ["かいもの", "ばいぶつ", "かいぶつ", "ばいもの"], "買い物 (mua sắm) đọc là かいもの.", 10),
            ],
            "writing": [
                ("すいはんきで [こめ]を たきます。Kanji là:", "こめ", "米", ["米", "茶", "来", "木"], "こめ (gạo) viết chữ Hán là 米.", 1),
                ("きっさてんで [おちゃ]を のみます。Kanji là:", "おちゃ", "お茶", ["お茶", "お米", "お草", "お菓"], "おちゃ (trà) viết là お茶.", 2),
                ("すきやきには [ぎゅうにく]を つかいます。Kanji là:", "ぎゅうにく", "牛肉", ["牛肉", "牛内", "生肉", "午肉"], "ぎゅうにく viết là 牛肉.", 3),
                ("かわずしで [さかな]の すしを たべます。Kanji là:", "さかな", "魚", ["魚", "鳥", "貝", "漁"], "さかな (cá) viết chữ Hán là 魚.", 4),
                ("みそしるに [かい]を いれます。Kanji là:", "かい", "貝", ["貝", "見", "目", "具"], "かい (con sò) viết chữ Hán là 貝.", 5),
                ("わたしは りんごが [す]きです。Kanji là:", "す", "好", ["好", "安", "如", "妹"], "すき (thích) viết chữ Hán là 好き.", 6),
                ("にほんの [たべもの]は からだに いいです。Kanji là:", "たべもの", "食べ物", ["食べ物", "食へ物", "飲物", "喰物"], "たべもの viết là 食べ物.", 7),
                ("じどうはんばいきで [のみもの]を かいます。Kanji là:", "のみもの", "飲み物", ["飲み物", "飲物", "喫み物", "喰み物"], "のみもの viết là 飲み物.", 8),
                ("あした [かいもの]に いきます。Kanji là:", "かいもの", "買い物", ["買い物", "買物", "換い物", "貸い物"], "かいもの viết là 買い物.", 9),
                ("わたしの [こうぶつ]は ラーメンです。Kanji là:", "こうぶつ", "好物", ["好物", "愛物", "快物", "楽物"], "こうぶつ (món khoái khẩu) viết là 好物.", 10),
            ],
            "minigame_title": "Minigame Chương 10: Thực đơn món ngon Nhật Bản",
            "minigame_img": "/assets/kanji/n5/minigames/chap10_minigame_p94.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Lương thực chính nấu thành cơm dẻo:", "options": ["米", "茶", "魚", "肉"], "answer": "米", "explanation": "米 (KOME) là hạt gạo nấu thành cơm." },
                { "id": 2, "prompt": "2. Thức uống truyền thống màu xanh thơm mát:", "options": ["お茶", "牛乳", "お酒", "水"], "answer": "お茶", "explanation": "お茶 (OCHA) là trà xanh thanh mát." },
                { "id": 3, "prompt": "3. Món sashimi tươi sống làm từ loài bơi dưới nước:", "options": ["魚", "牛", "鳥", "米"], "answer": "魚", "explanation": "魚 (SAKANA) là con cá." }
            ]
        },
        11: {
            "title": "しぜん-2",
            "vocabs": [
                ("林", "はやし", "hayashi", "Rừng thưa", "Woods, grove", 1),
                ("小林", "こばやし", "kobayashi", "Rừng nhỏ / Họ Kobayashi", "Small grove / Kobayashi", 2),
                ("森", "もり", "mori", "Rừng rậm rạp", "Forest", 3),
                ("森林", "しんりん", "shinrin", "Rừng rú, lâm nghiệp", "Forestry", 4),
                ("畑", "はたけ", "hatake", "Ruộng hoa màu khô", "Field", 5),
                ("花畑", "はなばたけ", "hanabatake", "Cánh đồng hoa", "Flower garden", 6),
                ("岩", "いわ", "iwa", "Tảng đá lớn", "Rock, crag", 7),
                ("音", "おと", "oto", "Âm thanh, tiếng động", "Sound", 8),
                ("音楽", "おんがく", "ongaku", "Âm nhạc", "Music", 9),
                ("本音", "ほんね", "honne", "Lời nói thật lòng", "Real intention", 10),
                ("明るい", "あかるい", "akarui", "Sáng sủa, tươi sáng", "Bright, cheerful", 11),
                ("明日", "あした", "ashita", "Ngày mai", "Tomorrow", 12),
                ("暗い", "くらい", "kurai", "Tối tăm, u ám", "Dark, gloomy", 13),
            ],
            "reading": [
                ("やまの [小林]を あるきます。", "小林", "こばやし", ["こばやし", "しょうりん", "おばやし", "ちいさいもり"], "小林 (rừng thưa nhỏ) đọc là こばやし.", 1),
                ("ふかい [森]に どうぶつが います。", "森", "もり", ["もり", "はやし", "しん", "やま"], "森 (rừng rậm bạt ngàn) đọc là もり.", 2),
                ("そふは [畑]で やさいを つくります。", "畑", "はたけ", ["はたけ", "たけ", "た", "ばたけ"], "畑 (ruộng khô trồng rau) đọc là はたけ.", 3),
                ("おおきな [岩]が あります。", "岩", "いわ", ["いわ", "いし", "がん", "すな"], "岩 (tảng đá to) đọc là いわ.", 4),
                ("きれいな [音楽]が きこえます。", "音楽", "おんがく", ["おんがく", "おとらく", "おんらく", "ねがく"], "音楽 (âm nhạc) đọc là おんがく.", 5),
                ("このへやは [明るい]です。", "明るい", "あかるい", ["あかるい", "めいるい", "あかる", "ひろい"], "明るい (sáng sủa) đọc là あかるい.", 6),
                ("そとが [暗く]なりました。", "暗く", "くらく", ["くらく", "あかく", "あかるく", "くろく"], "暗く (trở nên tối tăm) đọc là くらく.", 7),
                ("[森林]を たいせつに まもります。", "森林", "しんりん", ["しんりん", "もりはやし", "しんり", "もりばやし"], "森林 (rừng sâu rừng rậm) đọc là しんりん.", 8),
                ("[明日の] よていを かくにんします。", "明日の", "あしたの", ["あしたの", "あすの", "みょうにちの", "あかるいの"], "明日 (ngày mai) đọc là あした.", 9),
                ("にほんごの [発音]を れんしゅうします。", "発音", "はつおん", ["はつおん", "はつおと", "はつね", "ほつおん"], "発音 (phát âm) chữ 音 đọc là おん (はつおん).", 10),
            ],
            "writing": [
                ("[はやし]の なかで とりのこえを ききます。Kanji là:", "はやし", "林", ["林", "森", "木", "枝"], "はやし (rừng thưa) gồm hai chữ 木: chữ 林.", 1),
                ("[もり]の なかは すずしいです。Kanji là:", "もり", "森", ["森", "林", "木", "葉"], "もり (rừng rậm) gồm ba chữ 木: chữ 森.", 2),
                ("[はたけ]で トマトを そだてます。Kanji là:", "はたけ", "畑", ["畑", "田", "火", "草"], "はたけ (ruộng hoa màu) chữ Hán là 畑.", 3),
                ("[いわ]の うえで やすみます。Kanji là:", "いわ", "岩", ["岩", "石", "山", "岸"], "いわ (tảng đá lớn) chữ Hán là 岩.", 4),
                ("ラジオの [おと]が ちいさいです。Kanji là:", "おと", "音", ["音", "暗", "日", "立"], "おと (âm thanh) chữ Hán là 音.", 5),
                ("でんきをつけて [あか]るくします。Kanji là:", "あか", "明", ["明", "暗", "日", "光"], "あかるい (sáng sủa) chữ Hán là 明るい.", 6),
                ("よるは みちが [くら]いです。Kanji là:", "くら", "暗", ["暗", "明", "黒", "夜"], "くらい (tối tăm) chữ Hán là 暗い.", 7),
                ("[おんがく]を きくのが しゅみです。Kanji là:", "おんがく", "音楽", ["音楽", "音学", "暗楽", "声楽"], "おんがく (âm nhạc) viết là 音楽.", 8),
                ("[あした]の あさはやい です。Kanji là:", "あした", "明日", ["明日", "明後日", "昨日", "今日"], "あした viết chữ Hán là 明日.", 9),
                ("[はなばたけ]へ ドライブに いきます。Kanji là:", "はなばたけ", "花畑", ["花畑", "華畑", "花田", "華田"], "はなばたけ (vườn hoa) viết là 花畑.", 10),
            ],
            "minigame_title": "Minigame Chương 11: Rừng cây bí ẩn & Ánh sáng thiên nhiên",
            "minigame_img": "/assets/kanji/n5/minigames/chap11_minigame_p104.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Hai cái cây đứng cạnh nhau thành rừng thưa:", "options": ["林", "森", "木", "本"], "answer": "林", "explanation": "Hai chữ 木 ghép lại thành chữ 林 (HAYASHI)." },
                { "id": 2, "prompt": "2. Ba cái cây xum xuê bạt ngàn thành rừng rậm:", "options": ["森", "林", "畑", "岩"], "answer": "森", "explanation": "Ba chữ 木 ghép lại thành chữ 森 (MORI)." },
                { "id": 3, "prompt": "3. Mặt trời (日) cùng Mặt trăng (月) tỏa sáng:", "options": ["明", "暗", "音", "森"], "answer": "明", "explanation": "Mặt trời và mặt trăng ghép lại thành chữ 明 (Sáng sủa)." }
            ]
        },
        12: {
            "title": "どうし-2",
            "vocabs": [
                ("言う", "いう", "iu", "Nói, bảo", "To say", 1),
                ("言葉", "ことば", "kotoba", "Từ ngữ, tiếng nói", "Word, language", 2),
                ("方言", "ほうげん", "hougen", "Tiếng địa phương", "Dialect", 3),
                ("書く", "かく", "kaku", "Viết, vẽ", "To write", 4),
                ("辞書", "じしょ", "jisho", "Từ điển", "Dictionary", 5),
                ("読書", "どくしょ", "dokusho", "Đọc sách", "Reading books", 6),
                ("読む", "よむ", "yomu", "Đọc", "To read", 7),
                ("話す", "はなす", "hanasu", "Nói chuyện, đàm thoại", "To speak", 8),
                ("話", "はなし", "hanashi", "Câu chuyện", "Story, talk", 9),
                ("電話", "でんわ", "denwa", "Điện thoại", "Telephone", 10),
                ("会話", "かいわ", "kaiwa", "Hội thoại", "Conversation", 11),
                ("食べる", "たべる", "taberu", "Ăn uống", "To eat", 12),
                ("食事", "しょくじ", "shokuji", "Bữa ăn", "Meal", 13),
                ("飲む", "のむ", "nomu", "Uống", "To drink", 14),
                ("買う", "かう", "kau", "Mua", "To buy", 15),
                ("買い物", "かいもの", "kaimono", "Mua sắm", "Shopping", 16),
            ],
            "reading": [
                ("にほんごで [言います]。", "言います", "いいます", ["いいます", "かきます", "よみます", "はなします"], "言います (nói) đọc là いいます.", 1),
                ("かぞくに てがみを [書きます]。", "書きます", "かきます", ["かきます", "よみます", "いいます", "ききます"], "書きます (viết thư) đọc là かきます.", 2),
                ("あさ しんぶんを [読みます]。", "読みます", "よみます", ["よみます", "かきます", "みます", "たべます"], "読みます (đọc báo) đọc là よみます.", 3),
                ("ともだちと たのしく [話します]。", "話します", "はなします", ["はなします", "いいます", "よみます", "あいます"], "話します (nói chuyện) đọc là はなします.", 4),
                ("あさごはんを [食べます]。", "食べます", "たべます", ["たべます", "のみます", "かいます", "みます"], "食べます (ăn sáng) đọc là たべます.", 5),
                ("おちゃを [飲みます]。", "飲みます", "のみます", ["のみます", "たべます", "すいます", "かいます"], "飲みます (uống trà) đọc là のみます.", 6),
                ("スーパーで パンを [買います]。", "買います", "かいます", ["かいます", "うります", "たべます", "もちます"], "買います (mua bánh) đọc là かいます.", 7),
                ("にほんごの [言葉]を おぼえます。", "言葉", "ことば", ["ことば", "げんよう", "いいは", "ことよう"], "言葉 (từ vựng, ngôn từ) đọc là ことば.", 8),
                ("しゅみは [読書]です。", "読書", "どくしょ", ["どくしょ", "よみほん", "とうしょ", "どくほん"], "読書 (đọc sách) đọc là どくしょ.", 9),
                ("ともだちに [電話]を かけます。", "電話", "でんわ", ["でんわ", "でんしゃ", "でんき", "でんわん"], "電話 (điện thoại) đọc là でんわ.", 10),
            ],
            "writing": [
                ("せんせいに [い]います。Kanji là:", "い", "言", ["言", "語", "話", "読"], "いう (nói) viết chữ Hán là 言う.", 1),
                ("ノートに [か]きます。Kanji là:", "か", "書", ["書", "画", "昼", "昼"], "かく (viết) viết chữ Hán là 書く.", 2),
                ("ほんを [よ]みます。Kanji là:", "よ", "読", ["読", "言", "語", "訳"], "よむ (đọc) viết chữ Hán là 読む.", 3),
                ("にほんごで [はな]します。Kanji là:", "はな", "話", ["話", "語", "言", "舌"], "はなす (nói chuyện) viết là 話す.", 4),
                ("すしを [た]べます。Kanji là:", "た", "食", ["食", "飲", "飯", "館"], "たべる (ăn) viết chữ Hán là 食べる.", 5),
                ("みずを [の]みます。Kanji là:", "の", "飲", ["飲", "食", "吸", "飯"], "のむ (uống) viết chữ Hán là 飲む.", 6),
                ("プレゼントを [か]います。Kanji là:", "か", "買", ["買", "売", "貝", "貸"], "かう (mua) viết chữ Hán là 買う.", 7),
                ("あたらしい [じしょ]を つかいます。Kanji là:", "じしょ", "辞書", ["辞書", "字書", "自書", "治書"], "じしょ (từ điển) viết là 辞書.", 8),
                ("[でんわ]に でます。Kanji là:", "でんわ", "電話", ["電話", "電言", "電話", "伝話"], "でんわ viết là 電話.", 9),
                ("レストランで [しょくじ]を します。Kanji là:", "しょくじ", "食事", ["食事", "食次", "食時", "食字"], "しょくじ (bữa ăn) viết là 食事.", 10),
            ],
            "minigame_title": "Minigame Chương 12: Động từ giao tiếp & Mua sắm",
            "minigame_img": "/assets/kanji/n5/minigames/chap12_minigame_p112.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Hành động cầm bút ghi chép lên giấy:", "options": ["書く", "読む", "話す", "言う"], "answer": "書く", "explanation": "書く (KAKU) là viết." },
                { "id": 2, "prompt": "2. Hành động dùng tiền đổi lấy món hàng yêu thích:", "options": ["買う", "売る", "食べる", "飲む"], "answer": "買う", "explanation": "買う (KAU) là mua sắm." },
                { "id": 3, "prompt": "3. Đưa đồ ăn vào miệng và thưởng thức vị ngon:", "options": ["食べる", "飲む", "見る", "言う"], "answer": "食べる", "explanation": "食べる (TABERU) là ăn." }
            ]
        },
        13: {
            "title": "町",
            "vocabs": [
                ("町", "まち", "machi", "Thị trấn, phố xá", "Town", 1),
                ("お寺", "おてら", "otera", "Chùa chiền", "Temple", 2),
                ("寺院", "じいん", "jiin", "Tu viện, chùa", "Temple", 3),
                ("電気", "でんき", "denki", "Điện, đèn điện", "Electricity", 4),
                ("電車", "でんしゃ", "densha", "Tàu điện", "Electric train", 5),
                ("電力", "でんりょく", "denryoku", "Điện lực", "Electric power", 6),
                ("車", "くるま", "kuruma", "Xe hơi, xe kéo", "Car, vehicle", 7),
                ("自動車", "じどうしゃ", "jidousha", "Ô tô", "Automobile", 8),
                ("東", "ひがし", "higashi", "Phía đông", "East", 9),
                ("東京", "とうきょう", "toukyou", "Tokyo", "Tokyo", 10),
                ("西", "にし", "nishi", "Phía tây", "West", 11),
                ("東西", "とうざい", "touzai", "Đông tây", "East and west", 12),
                ("南", "みなみ", "minami", "Phía nam", "South", 13),
                ("東南", "とうなん", "tounan", "Đông nam", "Southeast", 14),
                ("北", "きた", "kita", "Phía bắc", "North", 15),
                ("北海道", "ほっかいどう", "hokkaidou", "Hokkaido", "Hokkaido", 16),
                ("南北", "なんぼく", "nanboku", "Nam bắc", "South and north", 17),
            ],
            "reading": [
                ("しずかな [町]に すんでいます。", "町", "まち", ["まち", "ちょう", "てら", "むら"], "町 (thị trấn) đọc là まち.", 1),
                ("きょうとの [お寺]を みます。", "お寺", "おてら", ["おてら", "おじ", "おみや", "おじいん"], "お寺 (ngôi chùa) đọc là おてら.", 2),
                ("[電車]で つうきんします。", "電車", "でんしゃ", ["でんしゃ", "でんくるま", "でんき", "でんし"], "電車 (tàu điện) đọc là でんしゃ.", 3),
                ("あたらしい [車]を かいました。", "車", "くるま", ["くるま", "しゃ", "じ", "ば"], "車 (xe hơi) đọc là くるま.", 4),
                ("[東京]へ りょこうします。", "東京", "とうきょう", ["とうきょう", "ひがしきょう", "ひがしけい", "とうけい"], "東京 (Tokyo) đọc là とうきょう.", 5),
                ("えきの [西口]で まちあわせます。", "西口", "にしぐち", ["にしぐち", "せいぐち", "さいぐち", "にしこう"], "西口 (cửa tây) đọc là にしぐち.", 6),
                ("[南の] しまへ いきます。", "南の", "みなみの", ["みなみの", "なんの", "なんぽうの", "ひがしの"], "南 (phía nam) đọc là みなみ.", 7),
                ("[北海道]は ゆきが ふります。", "北海道", "ほっかいどう", ["ほっかいどう", "きたかいどう", "ほくかいどう", "ほくかいみち"], "北海道 đọc là ほっかいどう.", 8),
                ("へやの [電気]を けします。", "電気", "でんき", ["でんき", "でんち", "でんりょく", "でんこう"], "電気 (đèn điện) đọc là でんき.", 9),
                ("[東西南北]を かくにんします。", "東西南北", "とうざいなんぼく", ["とうざいなんぼく", "ひがしにしみなみきた", "とうさいなんほく", "とうぜいなんぼく"], "東西南北 (bốn phương đông tây nam bắc) đọc là とうざいなんぼく.", 10),
            ],
            "writing": [
                ("ふるい [まち]を さんぽします。Kanji là:", "まち", "町", ["町", "街", "村", "丁"], "まち viết là 町.", 1),
                ("ゆうめいな [てら]を まいります。Kanji là:", "てら", "寺", ["寺", "時", "持", "待"], "てら (chùa) viết là 寺.", 2),
                ("[でんしゃ]の きっぷを かいます。Kanji là:", "でんしゃ", "電車", ["電車", "雷車", "電東", "電行"], "でんしゃ viết là 電車.", 3),
                ("[くるま]を ちゅうしゃじょうに とめます。Kanji là:", "くるま", "車", ["車", "軍", "庫", "東"], "くるま viết chữ Hán là 車.", 4),
                ("[ひがし]から たいようが のぼります。Kanji là:", "ひがし", "東", ["東", "西", "南", "北"], "ひがし (hướng đông) viết là 東.", 5),
                ("[にし]に ゆうひが しずみます。Kanji là:", "にし", "西", ["西", "東", "北", "南"], "にし (hướng tây) viết là 西.", 6),
                ("[みなみ]のかぜが あたたかいです。Kanji là:", "みなみ", "南", ["南", "北", "西", "東"], "みなみ (hướng nam) viết là 南.", 7),
                ("[きた]の くには さむいです。Kanji là:", "きた", "北", ["北", "比", "背", "南"], "きた (hướng bắc) viết là 北.", 8),
                ("へやの [でんき]を つけます。Kanji là:", "でんき", "電気", ["電気", "雷気", "電氣", "電空"], "でんき (điện) viết là 電気.", 9),
                ("[とうきょう]えきで のりかえます。Kanji là:", "とうきょう", "東京", ["東京", "東都", "東県", "西京"], "とうきょう viết là 東京.", 10),
            ],
            "minigame_title": "Minigame Chương 13: La bàn phương hướng & Đường phố Tokyo",
            "minigame_img": "/assets/kanji/n5/minigames/chap13_minigame_p120.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Hướng mặt trời mọc mỗi buổi bình minh:", "options": ["東", "西", "南", "北"], "answer": "東", "explanation": "東 (HIGASHI) là hướng đông." },
                { "id": 2, "prompt": "2. Hướng mặt trời lặn mỗi buổi hoàng hôn:", "options": ["西", "東", "南", "北"], "answer": "西", "explanation": "西 (NISHI) là hướng tây." },
                { "id": 3, "prompt": "3. Phương tiện công cộng chạy trên đường ray bằng điện:", "options": ["電車", "車", "自転車", "飛行機"], "answer": "電車", "explanation": "電車 (DENSHA) là tàu điện." }
            ]
        },
        14: {
            "title": "時間",
            "vocabs": [
                ("時", "とき", "toki", "Khi, lúc", "Time, when", 1),
                ("時間", "じかん", "jikan", "Thời gian", "Time, hour", 2),
                ("時計", "とけい", "tokei", "Đồng hồ", "Clock, watch", 3),
                ("間", "あいだ", "aida", "Ở giữa, khoảng thời gian", "Between, interval", 4),
                ("間に合う", "まにあう", "maniau", "Kịp giờ", "To be in time", 5),
                ("人間", "にんげん", "ningen", "Con người, nhân loại", "Human being", 6),
                ("半分", "はんぶん", "hanbun", "Một nửa", "Half", 7),
                ("一時半", "いちじはん", "ichijihan", "1 giờ rưỡi", "1:30", 8),
                ("分", "ふん / ぷん", "fun", "Phút", "Minute", 9),
                ("分かる", "わかる", "wakaru", "Hiểu, nhận biết", "To understand", 10),
                ("今", "いま", "ima", "Bây giờ, hiện tại", "Now", 11),
                ("今日", "きょう", "kyou", "Hôm nay", "Today", 12),
                ("今月", "こんげつ", "kongetsu", "Tháng này", "This month", 13),
                ("今年", "ことし", "kotoshi", "Năm nay", "This year", 14),
                ("何", "なに / なん", "nani", "Cái gì", "What", 15),
                ("何時", "なんじ", "nanji", "Mấy giờ", "What time", 16),
                ("何人", "なんにん", "nannin", "Mấy người", "How many people", 17),
                ("夕方", "ゆうがた", "yuugata", "Hoàng hôn, chiều tối", "Evening", 18),
                ("夕食", "ゆうしょく", "yuushoku", "Bữa cơm tối", "Dinner", 19),
                ("方", "かた", "kata", "Người (kính ngữ), phương hướng", "Person, way", 20),
            ],
            "reading": [
                ("いま なん[時]ですか。", "時", "じ", ["じ", "とき", "かん", "ふん"], "何時 (mấy giờ): chữ 時 đọc là じ.", 1),
                ("まいあさ 1[時間] べんきょうします。", "時間", "じかん", ["じかん", "ときあいだ", "じあいだ", "じけん"], "時間 (thời gian / tiếng đồng hồ) đọc là じかん.", 2),
                ("2じ[半]に えきで あいましょう。", "半", "はん", ["はん", "なかば", "はんぶん", "ぶん"], "2時半 (2 giờ rưỡi) đọc là にじはん.", 3),
                ("10[分] やすみましょう。", "分", "ぷん", ["ぷん", "ふん", "ぶん", "ぶ"], "10分 (10 phút) đọc biến âm là じゅっぷん (ぷん).", 4),
                ("[今] なんじですか。", "今", "いま", ["いま", "こん", "きょう", "こ"], "今 (bây giờ) đọc là いま.", 5),
                ("これは [何]ですか。", "何", "なん", ["なん", "なに", "か", "どこ"], "何ですか (cái gì vậy) đọc là なんですか.", 6),
                ("[夕方] すずしくなりました。", "夕方", "ゆうがた", ["ゆうがた", "ゆうほう", "せきがた", "よるがた"], "夕方 (chiều tối) đọc là ゆうがた.", 7),
                ("あのかたの [方]へ あるきます。", "方", "ほう", ["ほう", "かた", "がた", "き"], "あの方へ (về phía hướng đó) đọc là ほう.", 8),
                ("[今年] にほんへ いきます。", "今年", "ことし", ["ことし", "こんねん", "いまねん", "きねん"], "今年 (năm nay) là từ đặc biệt đọc là ことし.", 9),
                ("かぞくと [夕食]を たべます。", "夕食", "ゆうしょく", ["ゆうしょく", "よるしょく", "せきしょく", "ばんしょく"], "夕食 (bữa cơm chiều tối) đọc là ゆうしょく.", 10),
            ],
            "writing": [
                ("[じかん]を まもります。Kanji là:", "じかん", "時間", ["時間", "時関", "時門", "事間"], "じかん viết là 時間.", 1),
                ("3じ[はん]に おわります。Kanji là:", "はん", "半", ["半", "判", "伴", "平"], "はん (rưỡi, nửa) viết chữ Hán là 半.", 2),
                ("ご[ふん] まってください。Kanji là:", "ふん", "分", ["分", "刀", "粉", "份"], "ふん (phút) viết chữ Hán là 分.", 3),
                ("[いま] なんじですか。Kanji là:", "いま", "今", ["今", "令", "合", "会"], "いま (bây giờ) viết chữ Hán là 今.", 4),
                ("あさごはんに [なに]を たべましたか。Kanji là:", "なに", "何", ["何", "荷", "可", "向"], "なに (cái gì) viết chữ Hán là 何.", 5),
                ("[ゆうがた] かいものに いきます。Kanji là:", "ゆうがた", "夕方", ["夕方", "多方", "夜方", "暮方"], "ゆうがた viết là 夕方.", 6),
                ("かんじの かき[かた]を おしえてください。Kanji là:", "かた", "方", ["方", "万", "力", "片"], "かた (cách làm) viết chữ Hán là 方.", 7),
                ("[なんじ]に おきますか。Kanji là:", "なんじ", "何時", ["何時", "何じ", "荷時", "幾時"], "なんじ viết là 何時.", 8),
                ("[きょう]は いい てんきです。Kanji là:", "きょう", "今日", ["今日", "今月", "今年", "金日"], "きょう viết là 今日.", 9),
                ("[はんぶん] こどもに あげました。Kanji là:", "はんぶん", "半分", ["半分", "半文", "判分", "伴分"], "はんぶん (một nửa) viết là 半分.", 10),
            ],
            "minigame_title": "Minigame Chương 14: Đồng hồ báo thức & Lịch trình biểu",
            "minigame_img": "/assets/kanji/n5/minigames/chap14_minigame_p128.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Kim ngắn đồng hồ chỉ 7, kim dài chỉ 12 (7:00):", "options": ["七時", "七分", "七時間", "七日"], "answer": "七時", "explanation": "七時 (SHICHI-JI) là đúng 7 giờ." },
                { "id": 2, "prompt": "2. Kim dài chỉ số 6 biểu thị một nửa tiếng đồng hồ (30 phút):", "options": ["半", "分", "時", "間"], "answer": "半", "explanation": "半 (HAN) chỉ nửa giờ (ví dụ: 7時半 - 7 giờ rưỡi)." },
                { "id": 3, "prompt": "3. Buổi hoàng hôn khi mặt trời dần lặn:", "options": ["夕方", "今日", "時間", "午前"], "answer": "夕方", "explanation": "夕方 (YUUGATA) là buổi xế chiều, hoàng hôn." }
            ]
        },
        15: {
            "title": "けいようし",
            "vocabs": [
                ("新しい", "あたらしい", "atarashii", "Mới mẻ", "New", 1),
                ("新年", "しんねん", "shinnen", "Năm mới", "New year", 2),
                ("新聞", "しんぶん", "shinbun", "Tờ báo", "Newspaper", 3),
                ("古い", "ふるい", "furui", "Cũ kỹ, cổ", "Old", 4),
                ("古本", "ふるほん", "furuhon", "Sách cũ", "Secondhand book", 5),
                ("長い", "ながい", "nagai", "Dài, lâu", "Long", 6),
                ("社長", "しゃちょう", "shachou", "Giám đốc công ty", "Company president", 7),
                ("校長", "こうちょう", "kouchou", "Hiệu trưởng", "Principal", 8),
                ("安い", "やすい", "yasui", "Rẻ tiền, an tâm", "Cheap, peaceful", 9),
                ("安心", "あんしん", "anshin", "Yên tâm", "Relief, peace of mind", 10),
                ("安全", "あんぜん", "anzen", "An toàn", "Safe, safety", 11),
                ("多い", "おおい", "ooi", "Nhiều", "Many, much", 12),
                ("多少", "たしょう", "tashou", "Ít nhiều, phần nào", "More or less", 13),
                ("少ない", "すくない", "sukunai", "Ít ỏi", "Few, little", 14),
                ("少し", "すこし", "sukoshi", "Một chút, một ít", "A little", 15),
                ("少年", "しょうねん", "shounen", "Thiếu niên", "Boy, youth", 16),
                ("少女", "しょうじょ", "shoujo", "Thiếu nữ", "Girl", 17),
                ("元", "もと", "moto", "Gốc rễ, nguyên bản", "Origin, former", 18),
                ("元気", "げんき", "genki", "Khỏe mạnh, tràn đầy sức sống", "Healthy, energetic", 19),
                ("気", "き", "ki", "Tinh thần, khí chất", "Spirit, mind", 20),
                ("天気", "てんき", "tenki", "Thời tiết", "Weather", 21),
                ("気持ち", "きもち", "kimochi", "Cảm giác, tâm trạng", "Feeling", 22),
            ],
            "reading": [
                ("[新しい] くるまを かいました。", "新しい", "あたらしい", ["あたらしい", "ふるい", "しんしい", "やすい"], "新しい (mới mẻ) đọc là あたらしい.", 1),
                ("[古い] ほんを リサイクルします。", "古い", "ふるい", ["ふるい", "こい", "あたらしい", "ながい"], "古い (cũ kỹ) đọc là ふるい.", 2),
                ("かみのけが [長い]です。", "長い", "ながい", ["ながい", "ちょうい", "みじかい", "おおい"], "長い (dài) đọc là ながい.", 3),
                ("このりんごは とても [安い]です。", "安い", "やすい", ["やすい", "あんい", "たかい", "ひろい"], "安い (rẻ) đọc là やすい.", 4),
                ("まちに ひとが [多い]です。", "多い", "おおい", ["おおい", "すくない", "たい", "すこし"], "多い (nhiều người) đọc là おおい.", 5),
                ("みずを [少し] ください。", "少し", "すこし", ["すこし", "すくない", "しょうし", "おおい"], "少し (một chút) đọc là すこし.", 6),
                ("おじいさんは いつも [元気]です。", "元気", "げんき", ["げんき", "がんき", "もとき", "げんけ"], "元気 (khỏe mạnh) đọc là げんき.", 7),
                ("まいあさ [新聞]を よみます。", "新聞", "しんぶん", ["しんぶん", "あたらしきき", "しんもん", "あたらしぶん"], "新聞 (tờ báo) đọc là しんぶん.", 8),
                ("かぞくの こえを きいて [安心]しました。", "安心", "あんしん", ["あんしん", "やすこころ", "あんじん", "やすしん"], "安心 (yên tâm) đọc là あんしん.", 9),
                ("きょうは いい [天気]です。", "天気", "てんき", ["てんき", "あめき", "てんけ", "そらき"], "天気 (thời tiết) đọc là てんき.", 10),
            ],
            "writing": [
                ("[あたら]しい スマホを かいました。Kanji là:", "あたら", "新", ["新", "親", "薪", "森"], "あたらしい (mới) viết là 新しい.", 1),
                ("[ふる]い おてらを けんがくします。Kanji là:", "ふる", "古", ["古", "右", "吉", "舌"], "ふるい (cũ, cổ kính) viết chữ Hán là 古い.", 2),
                ("[なが]い やすみを とります。Kanji là:", "なが", "長", ["長", "張", "髪", "帳"], "ながい (dài) viết chữ Hán là 長い.", 3),
                ("[やす]い レストランを みつけました。Kanji là:", "やす", "安", ["安", "案", "按", "宴"], "やすい (rẻ tiền) viết chữ Hán là 安い.", 4),
                ("くるまが [おお]くて こみます。Kanji là:", "おお", "多", ["多", "夕", "名", "移"], "おおい (nhiều) viết chữ Hán là 多い.", 5),
                ("[すこ]し つかれました。Kanji là:", "すこ", "少", ["少", "小", "抄", "省"], "すこし (một chút) viết chữ Hán là 少し.", 6),
                ("せんせい、お[げんき]ですか。Kanji là:", "げんき", "元気", ["元気", "源気", "原気", "言気"], "げんき viết là 元気.", 7),
                ("まいあさ [しんぶん]を はいたつします。Kanji là:", "しんぶん", "新聞", ["新聞", "親聞", "新門", "新問"], "しんぶん viết là 新聞.", 8),
                ("[あんぜん]だいいちで はたらきます。Kanji là:", "あんぜん", "安全", ["安全", "安前", "暗全", "按全"], "あんぜん (an toàn) viết là 安全.", 9),
                ("あしたの [てんき]よほうを みます。Kanji là:", "てんき", "天気", ["天気", "天汽", "天木", "天機"], "てんき (thời tiết) viết là 天気.", 10),
            ],
            "minigame_title": "Minigame Chương 15: Cặp tính từ tương phản & Lời chúc bình an",
            "minigame_img": "/assets/kanji/n5/minigames/chap15_minigame_p136.webp",
            "minigame_questions": [
                { "id": 1, "prompt": "1. Trái nghĩa với 古い (cũ kỹ):", "options": ["新しい", "高い", "長い", "多い"], "answer": "新しい", "explanation": "新しい (ATARASHII) là mới mẻ, đối lập với 古い (cũ kỹ)." },
                { "id": 2, "prompt": "2. Trái nghĩa với 高い (đắt đỏ):", "options": ["安い", "少ない", "古い", "新しい"], "answer": "安い", "explanation": "安い (YASUI) là rẻ tiền, phải chăng." },
                { "id": 3, "prompt": "3. Trạng thái cơ thể khỏe mạnh, tràn đầy sinh lực:", "options": ["元気", "安心", "天気", "気持ち"], "answer": "元気", "explanation": "元気 (GENKI) là khỏe mạnh, nhiều năng lượng." }
            ]
        }
    }

    # 3. Seed vocabs, exercises, and minigames for Chapters 5 to 15
    for ch, data in CHAPTER_DATA.items():
        cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch,))
        ch_id = cur.fetchone()[0]

        # Xóa dữ liệu cũ của chương
        cur.execute("DELETE FROM kanji_chapter_vocab WHERE chapter_id = %s;", (ch_id,))
        cur.execute("DELETE FROM kanji_exercises WHERE chapter_id = %s;", (ch_id,))
        cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))

        # Chèn Vocab
        for v in data["vocabs"]:
            cur.execute("""
                INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
            """, (ch_id, v[0], v[1], v[2], v[3], v[4], v[5]))

        # Chèn Reading exercises (10 câu)
        for ex in data["reading"]:
            cur.execute("""
                INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
                VALUES (%s, 'READING', %s, %s, %s, %s, %s, %s, NOW());
            """, (ch_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

        # Chèn Writing exercises (10 câu)
        for ex in data["writing"]:
            cur.execute("""
                INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
                VALUES (%s, 'WRITING', %s, %s, %s, %s, %s, %s, NOW());
            """, (ch_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

        # Chèn Minigames
        cur.execute("""
            INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
            VALUES (%s, 'PICTURE_MATCH', %s, %s, %s, %s, 1, NOW());
        """, (
            ch_id,
            data["minigame_title"],
            "Quan sát bức tranh bài tập trong giáo trình và lựa chọn câu trả lời chính xác nhất.",
            data["minigame_img"],
            json.dumps({"questions": data["minigame_questions"]}, ensure_ascii=False)
        ))

        print(f"Chapter {ch}: Seeded {len(data['vocabs'])} vocabs, 20 exercises (10 read + 10 write), and minigames.")

    conn.commit()
    print("=" * 60)
    print("ALL CHAPTERS 5 TO 15 COMMITTED AND FULLY POPULATED!")
    print("=" * 60)

except Exception as e:
    conn.rollback()
    print(f"Error seeding chapters 5 to 15: {e}")
    raise
finally:
    cur.close()
    conn.close()
