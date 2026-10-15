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
    # 1. Get Chapter 1 ID
    cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = 1;")
    ch1_id = cur.fetchone()[0]
    print(f"Chapter 1 ID: {ch1_id}")

    # 2. Clear existing exercises/vocab/minigames for Chapter 1 to ensure clean seed
    cur.execute("DELETE FROM kanji_chapter_vocab WHERE chapter_id = %s;", (ch1_id,))
    cur.execute("DELETE FROM kanji_exercises WHERE chapter_id = %s;", (ch1_id,))
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch1_id,))

    # 3. Seed Chapter 1 Vocabularies
    vocab_data = [
        ("一つ", "ひとつ", "hitotsu", "Một cái (đồ vật)", "One (thing)", 1),
        ("一人", "ひとり", "hitori", "Một người, đơn độc", "One person, alone", 2),
        ("二つ", "ふたつ", "futatsu", "Hai cái (đồ vật)", "Two (things)", 3),
        ("二人", "ふたり", "futari", "Hai người", "Two people", 4),
        ("三つ", "みっつ", "mittsu", "Ba cái (đồ vật)", "Three (things)", 5),
        ("三人", "さんにん", "sannin", "Ba người", "Three people", 6),
        ("四つ", "よっつ", "yottsu", "Bốn cái (đồ vật)", "Four (things)", 7),
        ("四人", "よにん", "yonin", "Bốn người", "Four people", 8),
        ("五つ", "いつつ", "itsutsu", "Năm cái (đồ vật)", "Five (things)", 9),
        ("五人", "ごにん", "gonin", "Năm người", "Five people", 10),
        ("六つ", "むっつ", "muttsu", "Sáu cái (đồ vật)", "Six (things)", 11),
        ("六人", "ろくにん", "rokunin", "Sáu người", "Six people", 12),
        ("七つ", "ななつ", "nanatsu", "Bảy cái (đồ vật)", "Seven (things)", 13),
        ("七人", "しちにん / ななにん", "shichinin", "Bảy người", "Seven people", 14),
        ("八つ", "やっつ", "yattsu", "Tám cái (đồ vật)", "Eight (things)", 15),
        ("八人", "はちにん", "hachinin", "Tám người", "Eight people", 16),
        ("九つ", "ここのつ", "kokonotsu", "Chín cái (đồ vật)", "Nine (things)", 17),
        ("九人", "きゅうにん", "kyuunin", "Chín người", "Nine people", 18),
        ("十", "とお", "too", "Mười cái (đồ vật)", "Ten (things)", 19),
        ("十人", "じゅうにん", "juunin", "Mười người", "Ten people", 20),
        ("百", "ひゃく", "hyaku", "Một trăm", "Hundred", 21),
        ("千", "せん", "sen", "Một nghìn", "Thousand", 22),
        ("一万", "いちまん", "ichiman", "Mười nghìn (1 vạn)", "Ten thousand", 23),
        ("百円", "ひゃくえん", "hyakuen", "100 Yên", "100 Yen", 24),
        ("千円", "せんえん", "sen-en", "1.000 Yên", "1,000 Yen", 25),
        ("一万円", "いちまんえん", "ichiman-en", "10.000 Yên", "10,000 Yen", 26),
    ]

    for v in vocab_data:
        cur.execute("""
            INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, v[0], v[1], v[2], v[3], v[4], v[5]))
    print(f"Seeded {len(vocab_data)} vocabularies for Chapter 1.")

    # 4. Seed Chapter 1 Exercises
    # 10 câu đọc (よみましょう) chuẩn trang 11-13 & ふくしゅう
    reading_exercises = [
        ("りんごを [一つ] ください。", "一つ", "ひとつ", ["ふたつ", "ひとつ", "みっつ", "よっつ"], "Đếm đồ vật: 1 cái là ひとつ (一つ).", 1),
        ("教室に 学生が [一人] います。", "一人", "ひとり", ["いちにん", "ふたり", "ひとり", "さんにん"], "Đếm 1 người là ひとり (一人), không đọc là いちにん.", 2),
        ("みかんを [二つ] 買いました。", "二つ", "ふたつ", ["ひとつ", "みっつ", "いつつ", "ふたつ"], "Đếm 2 cái là ふたつ (二つ).", 3),
        ("田中さんと 鈴木さんの [二人] で 行きます。", "二人", "ふたり", ["ふたり", "ににん", "ひとり", "よにん"], "Đếm 2 người là ふたり (二人), không đọc là ににん.", 4),
        ("ケーキを [三つ] 食べました。", "三つ", "みっつ", ["むっつ", "みっつ", "やっつ", "いつつ"], "Đếm 3 cái là みっつ (三つ).", 5),
        ("部屋に [四人] の 友達が います。", "四人", "よにん", ["しにん", "よんにん", "さんにん", "よにん"], "Đếm 4 người đọc là よにん (四人).", 6),
        ("この ペンは [百円] です。", "百円", "ひゃくえん", ["せんえん", "ひゃくえん", "いちまんえん", "じゅうえん"], "100 Yên đọc là ひゃくえん (百円).", 7),
        ("シャツの 値段は [三千円] でした。", "三千円", "さんぜんえん", ["さんぜんえん", "さんせんえん", "さんびゃくえん", "さんまんえん"], "3000 Yên biến âm đọc là さんぜんえん (三千円).", 8),
        ("財布に [一万円] あります。", "一万円", "いちまんえん", ["せんえん", "ひゃくえん", "いちまんえん", "じゅうまんえん"], "10.000 Yên đọc là いちまんえん (一万円).", 9),
        ("本を [六つ] 並べました。", "六つ", "むっつ", ["みっつ", "やっつ", "ななつ", "むっつ"], "Đếm 6 cái là むっつ (六つ).", 10),
    ]

    for ex in reading_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'READING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    # 10 câu viết (かきましょう) chuẩn trang 14-17 & ふくしゅう
    writing_exercises = [
        ("パンを [ひとつ] 買いました。Kanji đúng là:", "ひとつ", "一つ", ["二つ", "一つ", "三つ", "十"], "ひとつ tương ứng với chữ Hán 一つ.", 1),
        ("鈴木さんは [ふたり] の 子供が います。Kanji đúng là:", "ふたり", "二人", ["一人", "三人", "二人", "四人"], "ふたり (2 người) viết chữ Hán là 二人.", 2),
        ("机の上に ノートが [みっつ] あります。Kanji đúng là:", "みっつ", "三つ", ["三つ", "六つ", "八つ", "五つ"], "みっつ (3 cái) viết chữ Hán là 三つ.", 3),
        ("家族は [よにん] です。Kanji đúng là:", "よにん", "四人", ["三人", "五人", "六人", "四人"], "よにん (4 người) viết chữ Hán là 四人.", 4),
        ("箱の中に 卵が [いつつ] あります。Kanji đúng là:", "いつつ", "五つ", ["六つ", "五つ", "七つ", "八つ"], "いつつ (5 cái) viết chữ Hán là 五つ.", 5),
        ("コーヒーは [ひゃく] 円です。Kanji đúng là:", "ひゃく", "百", ["千", "万", "百", "円"], "ひゃく (100) viết chữ Hán là 百.", 6),
        ("この 辞書は [さんぜん] 円です。Kanji đúng là:", "さんぜん", "三千", ["三千", "三百", "三万", "三十"], "さんぜん (3000) viết chữ Hán là 三千.", 7),
        ("日本円で [いちまん] 円 払いました。Kanji đúng là:", "いちまん", "一万", ["千", "百", "十", "一万"], "いちまん (1 vạn = 10.000) viết chữ Hán là 一万.", 8),
        ("時計の 値段は 八千 [えん] です。Kanji đúng là:", "えん", "円", ["百", "円", "千", "万"], "えん (tiền Yên Nhật) viết chữ Hán là 円.", 9),
        ("友達が [ろくにん] 集まりました。Kanji đúng là:", "ろくにん", "六人", ["八人", "七人", "六人", "九人"], "ろくにん (6 người) viết chữ Hán là 六人.", 10),
    ]

    for ex in writing_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'WRITING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    print(f"Seeded {len(reading_exercises)} reading exercises and {len(writing_exercises)} writing exercises for Chapter 1.")

    # 5. Seed Chapter 1 Minigames (P.20 & P.21 - Cropped authentic images)
    minigames = [
        {
            "game_type": "ORDERING",
            "title": "Minigame 1: Sắp xếp chữ số tăng dần (<) — Trang 20",
            "instruction": "Kéo hoặc chọn các chữ số Kanji sau để xếp theo thứ tự giá trị tăng dần từ bé đến lớn theo bài tập 【1】 trang 20.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_part1.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ (れい): 八, 三, 四", "formula": "三 < 四 < 八"},
                "questions": [
                    {"id": 1, "prompt": "Câu 1: 九, 二, 七", "items": ["九", "二", "七"], "formula": "二 < 七 < 九", "correct_order": ["二", "七", "九"]},
                    {"id": 2, "prompt": "Câu 2: 五, 八, 六", "items": ["五", "八", "六"], "formula": "五 < 六 < 八", "correct_order": ["五", "六", "八"]},
                    {"id": 3, "prompt": "Câu 3: 万, 千, 百", "items": ["万", "千", "百"], "formula": "百 < 千 < 万", "correct_order": ["百", "千", "万"]}
                ]
            }
        },
        {
            "game_type": "COUNTING",
            "title": "Minigame 2: Đếm đồ vật trong tranh & Viết cách đọc — Trang 20",
            "instruction": "Quan sát hình vẽ các đồ vật trong bài tập 【2】 trang 20, chọn chữ Kanji và cách đọc tương ứng cho từng hình.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_part2.webp",
            "display_order": 2,
            "data": {
                "example": {"item": "Ví dụ (れい): 3 người", "kanji": "三人", "reading": "さんにん"},
                "questions": [
                    {"id": 1, "item": "1. 6 cây bút chì (えんぴつ)", "counter": "ぽん", "options": ["六本 (ろっぽん)", "五本 (ごほん)", "七本 (ななほん)"], "answer": "六本 (ろっぽん)"},
                    {"id": 2, "item": "2. 4 máy vi tính (パソコン)", "counter": "だい", "options": ["四台 (よんだい)", "三台 (さんだい)", "五台 (ごだい)"], "answer": "四台 (よんだい)"},
                    {"id": 3, "item": "3. 5 cái áo sơ mi (シャツ)", "counter": "まい", "options": ["五枚 (ごまい)", "六枚 (ろくまい)", "四枚 (よんまい)"], "answer": "五枚 (ごまい)"},
                    {"id": 4, "item": "4. 8 quả táo (りんご)", "counter": "つ", "options": ["八つ (やっつ)", "七つ (ななつ)", "九つ (ここのつ)"], "answer": "八つ (やっつ)"},
                    {"id": 5, "item": "5. 7 cuốn sách (ほん)", "counter": "さつ", "options": ["七冊 (ななさつ)", "八冊 (はっさつ)", "六冊 (ろくさつ)"], "answer": "七冊 (ななさつ)"}
                ]
            }
        },
        {
            "game_type": "CALCULATION",
            "title": "Minigame 3: Tính tổng tiền mua sắm (あわせて いくらですか) — Trang 21",
            "instruction": "Tính tổng chi phí khi mua các món đồ trong bài tập 【3】 trang 21 và chọn số tiền viết bằng chữ Hán.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_part3.webp",
            "display_order": 3,
            "data": {
                "example": {"items": "Ví dụ (れい): Tシャツ ¥1,000 + かばん ¥2,500 = ¥3,500", "answer": "三千五百円"},
                "problems": [
                    {"id": 1, "items": "1. シャープペン (¥200) + ノート (¥480) = 680円", "answer": "六百八十円", "options": ["六百八十円", "五百八十円", "七百八十円"]},
                    {"id": 2, "items": "2. ハンバーガー (¥300) + ジュース (¥170) = 470円", "answer": "四百七十円", "options": ["四百七十円", "五百七十円", "三百七十円"]},
                    {"id": 3, "items": "3. でんしじしょ (¥30,000) + でんち (¥105) = 30,105円", "answer": "三万百五円", "options": ["三万百五円", "三万千五円", "三万五円"]},
                    {"id": 4, "items": "4. マンション (¥50,000,000) + くるま (¥2,000,000) = 52,000,000円", "answer": "五千二百万円", "options": ["五千二百万円", "五千三百万", "四千二百万円"]},
                    {"id": 5, "items": "5. パン (¥500) + ワイン (¥1,780) = 2,280円", "answer": "二千二百八十円", "options": ["二千二百八十円", "二千三百八十円", "二千百八十円"]}
                ]
            }
        },
        {
            "game_type": "POSTCARD_FILL",
            "title": "Minigame 4: Điền số nhà, tầng lầu & mã bưu điện vào bưu thiếp — Trang 21",
            "instruction": "Nhìn bức tranh bưu thiếp gửi cho bạn Suzuki Takashi trong bài tập 【4】 trang 21, chọn các con số Kanji thích hợp vào các ô trống.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_part4.webp",
            "display_order": 4,
            "data": {
                "example": {"label": "Ví dụ (れい): アークビル [3かい]", "answer": "三かい (三階)"},
                "sections": [
                    {"id": 1, "label": "① Mã bưu điện (郵便番号): 100-1000", "prompt": "100-1000", "answer": "一〇〇-一〇〇〇", "options": ["一〇〇-一〇〇〇", "一〇五-〇〇一四", "一〇〇-〇〇〇一"]},
                    {"id": 2, "label": "② Địa chỉ Shibuya: とうきょうと しぶやく にししぶや [2-14-9]", "prompt": "2-14-9", "answer": "二-十四-九", "options": ["二-十四-九", "三-十四-九", "二-十五-八"]},
                    {"id": 3, "label": "③ Địa chỉ Shinjuku: しんじゅくく しんじゅくきた [6-17-18]", "prompt": "6-17-18", "answer": "六-十七-十八", "options": ["六-十七-十八", "七-十七-十八", "六-十六-十八"]},
                    {"id": 4, "label": "④ Tòa nhà ARCハイツ [503号室]", "prompt": "Phòng số 503", "answer": "五〇三", "options": ["五〇三", "四〇三", "五〇二"]}
                ]
            }
        }
    ]

    for mg in minigames:
        cur.execute("""
            INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, mg["game_type"], mg["title"], mg["instruction"], mg["image_url"], json.dumps(mg["data"], ensure_ascii=False), mg["display_order"]))

    print(f"Seeded {len(minigames)} minigames for Chapter 1.")

    conn.commit()
    print("Chapter 1 comprehensive content seeded successfully!")

except Exception as e:
    conn.rollback()
    print("Error seeding Chapter 1 content:", e)
    sys.exit(1)
finally:
    cur.close()
    conn.close()
