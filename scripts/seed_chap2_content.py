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
    # 1. Get Chapter 2 ID
    cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = 2;")
    ch2_row = cur.fetchone()
    if not ch2_row:
        raise Exception("Chapter 2 not found!")
    ch2_id = ch2_row[0]
    print(f"Chapter 2 ID: {ch2_id}")

    # 2. Clear existing exercises/vocab/minigames for Chapter 2
    cur.execute("DELETE FROM kanji_chapter_vocab WHERE chapter_id = %s;", (ch2_id,))
    cur.execute("DELETE FROM kanji_exercises WHERE chapter_id = %s;", (ch2_id,))
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch2_id,))

    # 3. Update kanjis image_url for Chapter 2's 8 kanjis to point to authentic mnemonic crops
    # 8 kanjis in Chapter 2: 月, 火, 水, 木, 金, 土, 日, 年
    cur.execute("""
        SELECT id, character, chapter_order 
        FROM kanjis 
        WHERE chapter_id = %s 
        ORDER BY chapter_order;
    """, (ch2_id,))
    kanji_rows = cur.fetchall()
    for idx, k in enumerate(kanji_rows, 1):
        cur.execute("""
            UPDATE kanjis 
            SET image_url = %s 
            WHERE id = %s;
        """, (f"/assets/kanji/n5/illustrations/chap2_kanji_{idx}.webp", k[0]))
    print(f"Updated image_url for {len(kanji_rows)} kanjis in Chapter 2.")

    # 4. Seed Chapter 2 Vocabularies
    vocab_data = [
        ("月曜日", "げつようび", "getsuyoubi", "Thứ Hai", "Monday", 1),
        ("火曜日", "かようび", "kayoubi", "Thứ Ba", "Tuesday", 2),
        ("水曜日", "すいようび", "suiyoubi", "Thứ Tư", "Wednesday", 3),
        ("木曜日", "もくようび", "mokuyoubi", "Thứ Năm", "Thursday", 4),
        ("金曜日", "きんようび", "kin-youbi", "Thứ Sáu", "Friday", 5),
        ("土曜日", "どようび", "doyoubi", "Thứ Bảy", "Saturday", 6),
        ("日曜日", "にちようび", "nichiyoubi", "Chủ Nhật", "Sunday", 7),
        ("一月", "いちがつ", "ichigatsu", "Tháng 1", "January", 8),
        ("二月", "にがつ", "nigatsu", "Tháng 2", "February", 9),
        ("三月", "さんがつ", "sangatsu", "Tháng 3", "March", 10),
        ("四月", "しがつ", "shigatsu", "Tháng 4", "April", 11),
        ("五月", "ごがつ", "gogatsu", "Tháng 5", "May", 12),
        ("六月", "ろくがつ", "rokugatsu", "Tháng 6", "June", 13),
        ("七月", "しちがつ", "shichigatsu", "Tháng 7", "July", 14),
        ("八月", "はちがつ", "hachigatsu", "Tháng 8", "August", 15),
        ("九月", "くがつ", "kugatsu", "Tháng 9", "September", 16),
        ("十月", "じゅうがつ", "juugatsu", "Tháng 10", "October", 17),
        ("十一月", "じゅういちがつ", "juuichigatsu", "Tháng 11", "November", 18),
        ("十二月", "じゅうにがつ", "juunigatsu", "Tháng 12", "December", 19),
        ("一日", "ついたち", "tsuitachi", "Ngày mồng 1", "1st day of the month", 20),
        ("二日", "ふつか", "futsuka", "Ngày 2 (hoặc 2 ngày)", "2nd day / 2 days", 21),
        ("三日", "みっか", "mikka", "Ngày 3 (hoặc 3 ngày)", "3rd day / 3 days", 22),
        ("四日", "よっか", "yokka", "Ngày 4 (hoặc 4 ngày)", "4th day / 4 days", 23),
        ("五日", "いつか", "itsuka", "Ngày 5 (hoặc 5 ngày)", "5th day / 5 days", 24),
        ("今日", "きょう", "kyou", "Hôm nay", "Today", 25),
        ("今年", "ことし", "kotoshi", "Năm nay", "This year", 26),
        ("去年", "きょねん", "kyonen", "Năm ngoái", "Last year", 27),
        ("来年", "らいねん", "rainen", "Năm sau", "Next year", 28),
        ("お金", "おかね", "okane", "Tiền bạc", "Money", 29),
        ("水", "みず", "mizu", "Nước uống / Dòng nước", "Water", 30),
    ]

    for v in vocab_data:
        cur.execute("""
            INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch2_id, v[0], v[1], v[2], v[3], v[4], v[5]))
    print(f"Seeded {len(vocab_data)} vocabularies for Chapter 2.")

    # 5. Seed Chapter 2 Exercises (Page 27 of Textbook)
    # 10 câu đọc (よみましょう)
    reading_exercises = [
        ("[3年]まえに にほんへ きました。", "3年", "さんねん", ["よねん", "さんねん", "ごねん", "にねん"], "Đếm số năm: 3 năm đọc là さんねん (3年).", 1),
        ("つめたい [水]が のみたいです。", "水", "みず", ["き", "ひ", "みず", "かね"], "Từ đơn 水 (nước) đọc âm Kun là みず.", 2),
        ("ここに せい[年月日]を かいてください。", "年月日", "ねんがっぴ", ["ねんがっぴ", "としつきひ", "ねんつきひ", "としがっぴ"], "生年月日 (ngày tháng năm sinh) đọc là せいねんがっぴ.", 3),
        ("やましたさんは [1か月]まえに けっこんしました。", "1か月", "いっかげつ", ["いちがつ", "ひと月", "いっかげつ", "ひとつき"], "Đếm thời lượng 1 tháng đọc là いっかげつ (1か月).", 4),
        ("[らい月] ともだちが にほんへ あそびに きます。", "らい月", "らいげつ", ["こんげつ", "きょげつ", "まいげつ", "らいげつ"], "らい月 (tháng sau) viết là 来月, đọc là らいげつ.", 5),
        ("いま [お金]が ぜんぜん ありません。", "お金", "おかね", ["おみず", "おかね", "おき", "おひ"], "Tiền bạc đọc là おかね (お金).", 6),
        ("[今日]は うちで ゆっくり やすみます。", "今日", "きょう", ["あした", "きのう", "きょう", "あさって"], "今日 (hôm nay) là từ đặc biệt đọc là きょう.", 7),
        ("こどもに [木]の おもちゃを プレゼントしました。", "木", "き", ["き", "ひ", "みず", "つち"], "Chữ 木 (cây, gỗ) đứng một mình đọc là き.", 8),
        ("まいしゅう [火曜日]に かいわの れんしゅうをします。", "火曜日", "かようび", ["すいようび", "きんようび", "かようび", "げつようび"], "Thứ Ba đọc là かようび (火曜日).", 9),
        ("五月五日は こどもの[日]です。", "日", "ひ", ["び", "か", "にち", "ひ"], "こどもの日 (Ngày của trẻ em): chữ 日 đọc là ひ.", 10),
    ]

    for ex in reading_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'READING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch2_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    # 10 câu viết (かきましょう)
    writing_exercises = [
        ("いつか [つき]へ いきたいです。Kanji đúng là:", "つき", "月", ["日", "月", "火", "水"], "つき (mặt trăng) viết chữ Hán là 月.", 1),
        ("[げんきん]で とけいを かいます。Kanji đúng là:", "げんきん", "現金", ["現金", "原金", "源金", "言金"], "げんきん (tiền mặt) viết chữ Hán là 現金.", 2),
        ("こうえんに さくらの[き]が たくさん あります。Kanji đúng là:", "き", "木", ["本", "林", "木", "森"], "き (cây cối) viết chữ Hán là 木.", 3),
        ("[きょねん] はじめて にほんへ きました。Kanji đúng là:", "きょねん", "去年", ["来年", "今年", "毎月", "去年"], "きょねん (năm ngoái) viết chữ Hán là 去年.", 4),
        ("たばこに [ひ]を つけます。Kanji đúng là:", "ひ", "火", ["水", "火", "金", "土"], "ひ (lửa) viết chữ Hán là 火.", 5),
        ("なかやまさんの [とし]は 二十五さいです。Kanji đúng là:", "とし", "年", ["歳", "年", "月", "日"], "とし (tuổi, năm) tương ứng chữ Hán là 年.", 6),
        ("せんしゅうの [すいようび]に ほんを かりました。Kanji đúng là:", "すいようび", "水曜日", ["木曜日", "火曜日", "金曜日", "水曜日"], "すいようび (thứ Tư) viết là 水曜日.", 7),
        ("[どようび]に ともだちと えいがを みに いきます。Kanji đúng là:", "どようび", "土曜日", ["土曜日", "日曜日", "月曜日", "木曜日"], "どようび (thứ Bảy) viết là 土曜日.", 8),
        ("[じゅうにがつ]に くにへ かえります。Kanji đúng là:", "じゅうにがつ", "十二月", ["十一月", "十二月", "十月", "二月"], "じゅうにがつ (tháng 12) viết là 十二月.", 9),
        ("あしたは [きんようび]です。テストが あります。Kanji đúng là:", "きんようび", "金曜日", ["銀曜日", "火曜日", "金曜日", "土曜日"], "きんようび (thứ Sáu) viết là 金曜日.", 10),
    ]

    for ex in writing_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'WRITING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch2_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    print(f"Seeded 20 exercises for Chapter 2.")

    # 6. Seed Chapter 2 Minigames (P.28 & P.29)
    minigames = [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: Đoán tháng theo sự kiện lễ hội — Trang 28",
            "instruction": "Quan sát các bức tranh sự kiện ở bài 【1】 trang 28 và chọn tháng (四月, 六月, 十一月, 十二月) tương ứng.",
            "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p28.webp",
            "display_order": 1,
            "game_data_json": json.dumps({
                "questions": [
                    {
                        "id": 1,
                        "prompt": "1. つゆ (Mùa mưa Nhật Bản, hoa cẩm tú cầu & ốc sên):",
                        "options": ["四月 (しがつ)", "六月 (ろくがつ)", "八月 (はちがつ)", "十二月 (じゅうにがつ)"],
                        "answer": "六月 (ろくがつ)",
                        "explanation": "Mùa mưa (つゆ) ở Nhật Bản thường diễn ra vào tháng 6 (六月)."
                    },
                    {
                        "id": 2,
                        "prompt": "2. 七五三 (Lễ hội Shichi-Go-San cho trẻ em 3, 5, 7 tuổi tại đền thần):",
                        "options": ["三月 (さんがつ)", "七月 (しちがつ)", "十一月 (じゅういちがつ)", "五月 (ごがつ)"],
                        "answer": "十一月 (じゅういちがつ)",
                        "explanation": "Lễ hội Shichi-Go-San (七五三) được tổ chức vào ngày 15 tháng 11 (十一月)."
                    },
                    {
                        "id": 3,
                        "prompt": "3. クリスマス (Lễ Giáng sinh - Ông già Noel chui ống khói):",
                        "options": ["十月 (じゅうがつ)", "十一月 (じゅういちがつ)", "十二月 (じゅうにがつ)", "一月 (いちがつ)"],
                        "answer": "十二月 (じゅうにがつ)",
                        "explanation": "Giáng sinh (クリスマス) diễn ra vào tháng 12 (十二月)."
                    }
                ]
            }, ensure_ascii=False)
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: Ngày & Tháng lễ hội truyền thống — Trang 28",
            "instruction": "Nhìn tranh gợi ý bài 【2】 trang 28 để nhận diện ngày tháng diễn ra các ngày hội Nhật Bản.",
            "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p28.webp",
            "display_order": 2,
            "game_data_json": json.dumps({
                "questions": [
                    {
                        "id": 1,
                        "prompt": "1. ひなまつり (Lễ hội búp bê Hina Matsuri - Mar.):",
                        "options": ["三月三日 (さんがつ みっか)", "三月一日 (さんがつ ついたち)", "五月五日 (ごがつ いつか)", "七月七日 (しちがつ なのか)"],
                        "answer": "三月三日 (さんがつ みっか)",
                        "explanation": "Lễ hội Hina Matsuri diễn ra vào ngày 3 tháng 3 (三月三日)."
                    },
                    {
                        "id": 2,
                        "prompt": "2. こどものひ (Ngày thiếu nhi, treo cờ cá chép Koinobori - May):",
                        "options": ["五月一日 (ごがつ ついたち)", "五月五日 (ごがつ いつか)", "四月四日 (しがつ よっか)", "六月六日 (ろくがつ むいか)"],
                        "answer": "五月五日 (ごがつ いつか)",
                        "explanation": "Ngày của bé こどもの日 là ngày 5 tháng 5 (五月五日)."
                    },
                    {
                        "id": 3,
                        "prompt": "3. たなばた (Lễ Thất tịch ngắm sao Tanabata - Jul.):",
                        "options": ["七月七日 (しちがつ なのか)", "七月三日 (しちがつ みっか)", "八月八日 (はちがつ ようか)", "九月九日 (くがつ ここのか)"],
                        "answer": "七月七日 (しちがつ なのか)",
                        "explanation": "Lễ Thất tịch Tanabata diễn ra vào ngày 7 tháng 7 (七月七日)."
                    }
                ]
            }, ensure_ascii=False)
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 3: Điền lịch biểu & Lịch làm việc tháng 9 — Trang 29",
            "instruction": "Dựa vào tờ lịch tháng 9 (9月) ở bài 【3】 trang 29 để trả lời các câu hỏi về thứ trong tuần và sự kiện.",
            "image_url": "/assets/kanji/n5/minigames/chap2_minigame_p29.webp",
            "display_order": 3,
            "game_data_json": json.dumps({
                "questions": [
                    {
                        "id": 1,
                        "prompt": "Thứ tự các thứ trong tuần ① ~ ⑥ từ cột sau 日 (Chủ Nhật):",
                        "options": ["月・火・水・木・金・土", "火・水・木・金・土・月", "月・水・火・木・金・土", "日・月・火・水・木・金"],
                        "answer": "月・火・水・木・金・土",
                        "explanation": "Lịch Nhật Bản bắt đầu từ Chủ Nhật (日), sau đó lần lượt là 月 (T2), 火 (T3), 水 (T4), 木 (T5), 金 (T6), 土 (T7)."
                    },
                    {
                        "id": 2,
                        "prompt": "⑦ Tờ lịch này là tháng mấy (なんがつですか)?",
                        "options": ["八月 (はちがつ)", "九月 (くがつ)", "十月 (じゅうがつ)", "七月 (しちがつ)"],
                        "answer": "九月 (くがつ)",
                        "explanation": "Tiêu đề tờ lịch ghi rõ 9月, đọc là くがつ."
                    },
                    {
                        "id": 3,
                        "prompt": "⑧ たんじょうび (Ngày sinh nhật) là ngày nào, thứ mấy?",
                        "options": ["二十日・火曜日 (はつか・かようび)", "十九日・月曜日 (じゅうくにち・げつようび)", "二十一日・水曜日 (にじゅういちにち・すいようび)", "二十日・水曜日 (はつか・すいようび)"],
                        "answer": "二十日・火曜日 (はつか・かようび)",
                        "explanation": "Trên lịch ghi 'たんじょうび' ở ô số 20 nằm dưới cột thứ 3 (火曜日), ngày 20 đọc là はつか."
                    },
                    {
                        "id": 4,
                        "prompt": "⑨ テスト (Bài kiểm tra) là ngày nào, thứ mấy?",
                        "options": ["十六日・金曜日 (じゅうろくにち・きんようび)", "十五日・木曜日 (じゅうごにち・もくようび)", "十七日・土曜日 (じゅうななにち・どようび)", "十六日・木曜日 (じゅうろくにち・もくようび)"],
                        "answer": "十六日・金曜日 (じゅうろくにち・きんようび)",
                        "explanation": "Ô ghi chữ 'テスト' ở ngày 16 (じゅうろくにち) thuộc cột thứ Sáu (金曜日)."
                    }
                ]
            }, ensure_ascii=False)
        }
    ]

    for mg in minigames:
        cur.execute("""
            INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch2_id, mg["game_type"], mg["title"], mg["instruction"], mg["image_url"], mg["game_data_json"], mg["display_order"]))

    print(f"Seeded {len(minigames)} minigames for Chapter 2.")

    conn.commit()
    print("Chapter 2 seeding completed successfully!")

except Exception as e:
    conn.rollback()
    print(f"Error seeding Chapter 2: {e}")
finally:
    cur.close()
    conn.close()
