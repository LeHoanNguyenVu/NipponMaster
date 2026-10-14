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
        ("りんごを [一つ] ください。", "一つ", "ひとつ", ["ひとつ", "ふたつ", "みっつ", "よっつ"], "Đếm đồ vật: 1 cái là ひとつ (一つ).", 1),
        ("教室に 学生が [一人] います。", "一人", "ひとり", ["ひとり", "いちにん", "ふたり", "さんにん"], "Đếm 1 người là ひとり (一人), không đọc là いちにん.", 2),
        ("みかんを [二つ] 買いました。", "二つ", "ふたつ", ["ふたつ", "ひとつ", "みっつ", "いつつ"], "Đếm 2 cái là ふたつ (二つ).", 3),
        ("田中さんと 鈴木さんの [二人] で 行きます。", "二人", "ふたり", ["ふたり", "ににん", "ひとり", "よにん"], "Đếm 2 người là ふたり (二人), không đọc là ににん.", 4),
        ("ケーキを [三つ] 食べました。", "三つ", "みっつ", ["みっつ", "むっつ", "やっつ", "いつつ"], "Đếm 3 cái là みっつ (三つ).", 5),
        ("部屋に [四人] の 友達が います。", "四人", "よにん", ["よにん", "しにん", "よんにん", "さんにん"], "Đếm 4 người đọc là よにん (四人).", 6),
        ("この ペンは [百円] です。", "百円", "ひゃくえん", ["ひゃくえん", "せんえん", "いちまんえん", "じゅうえん"], "100 Yên đọc là ひゃくえん (百円).", 7),
        ("シャツの 値段は [三千円] でした。", "三千円", "さんぜんえん", ["さんぜんえん", "さんせんえん", "さんびゃくえん", "さんまんえん"], "3000 Yên biến âm đọc là さんぜんえん (三千円).", 8),
        ("財布に [一万円] あります。", "一万円", "いちまんえん", ["いちまんえん", "せんえん", "ひゃくえん", "じゅうまんえん"], "10.000 Yên đọc là いちまんえん (一万円).", 9),
        ("本を [六つ] 並べました。", "六つ", "むっつ", ["むっつ", "みっつ", "やっつ", "ななつ"], "Đếm 6 cái là むっつ (六つ).", 10),
    ]

    for ex in reading_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'READING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    # 10 câu viết (かきましょう) chuẩn trang 14-17 & ふくしゅう
    writing_exercises = [
        ("パンを [ひとつ] 買いました。Kanji đúng là:", "ひとつ", "一つ", ["一つ", "二つ", "三つ", "十"], "ひとつ tương ứng với chữ Hán 一つ.", 1),
        ("鈴木さんは [ふたり] の 子供が います。Kanji đúng là:", "ふたり", "二人", ["二人", "一人", "三人", "四人"], "ふたり (2 người) viết chữ Hán là 二人.", 2),
        ("机の上に ノートが [みっつ] あります。Kanji đúng là:", "みっつ", "三つ", ["三つ", "六つ", "八つ", "五つ"], "みっつ (3 cái) viết chữ Hán là 三つ.", 3),
        ("家族は [よにん] です。Kanji đúng là:", "よにん", "四人", ["四人", "三人", "五人", "六人"], "よにん (4 người) viết chữ Hán là 四人.", 4),
        ("箱の中に 卵が [いつつ] あります。Kanji đúng là:", "いつつ", "五つ", ["五つ", "六つ", "七つ", "八つ"], "いつつ (5 cái) viết chữ Hán là 五つ.", 5),
        ("コーヒーは [ひゃく] 円です。Kanji đúng là:", "ひゃく", "百", ["百", "千", "万", "円"], "ひゃく (100) viết chữ Hán là 百.", 6),
        ("この 辞書は [さんぜん] 円です。Kanji đúng là:", "さんぜん", "三千", ["三千", "三百", "三万", "三十"], "さんぜん (3000) viết chữ Hán là 三千.", 7),
        ("日本円で [いちまん] 円 払いました。Kanji đúng là:", "いちまん", "一万", ["一万", "千", "百", "十"], "いちまん (1 vạn = 10.000) viết chữ Hán là 一万.", 8),
        ("時計の 値段は 八千 [えん] です。Kanji đúng là:", "えん", "円", ["円", "百", "千", "万"], "えん (tiền Yên Nhật) viết chữ Hán là 円.", 9),
        ("友達が [ろくにん] 集まりました。Kanji đúng là:", "ろくにん", "六人", ["六人", "八人", "七人", "九人"], "ろくにん (6 người) viết chữ Hán là 六人.", 10),
    ]

    for ex in writing_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'WRITING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch1_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    print(f"Seeded {len(reading_exercises)} reading exercises and {len(writing_exercises)} writing exercises for Chapter 1.")

    # 5. Seed Chapter 1 Minigames (P.20 & P.21)
    minigames = [
        {
            "game_type": "ORDERING",
            "title": "Minigame 1: Sắp xếp chữ số tăng dần (<)",
            "instruction": "Kéo hoặc chọn các chữ số Kanji sau để xếp theo thứ tự giá trị tăng dần từ bé đến lớn.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_p20.webp",
            "display_order": 1,
            "data": {
                "question": "Sắp xếp: 八, 三, 四",
                "items": ["八", "三", "四"],
                "correct_order": ["三", "四", "八"],
                "formula": "三 < 四 < 八"
            }
        },
        {
            "game_type": "COUNTING",
            "title": "Minigame 2: Đếm đồ vật trong tranh minh họa (Trang 20)",
            "instruction": "Quan sát bức tranh trang 20 và đếm số lượng từng loại đồ vật, chọn chữ Kanji số lượng chính xác.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_p20.webp",
            "display_order": 2,
            "data": {
                "questions": [
                    {"item": "Áo sơ mi (シャツ)", "options": ["二つ", "三つ", "四つ"], "answer": "三つ"},
                    {"item": "Bút chì (えんぴつ)", "options": ["五つ", "六つ", "七つ"], "answer": "五つ"},
                    {"item": "Quả táo (りんご)", "options": ["二つ", "四つ", "六つ"], "answer": "四つ"},
                    {"item": "Máy tính (パソコン)", "options": ["一つ", "二つ", "三つ"], "answer": "二つ"}
                ]
            }
        },
        {
            "game_type": "CALCULATION",
            "title": "Minigame 3: Tính tổng tiền mua sắm tại cửa hàng",
            "instruction": "Tính tổng chi phí khi mua các món đồ trong quầy và điền số tiền bằng chữ Kanji.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_p20.webp",
            "display_order": 3,
            "data": {
                "problems": [
                    {"items": "Áo thun (1,500円) + Cặp sách (3,500円)", "total": 5000, "answer": "五千円", "options": ["四千円", "五千円", "六千円"]},
                    {"items": "Hamburger (300円) + Nước ép cam (200円)", "total": 500, "answer": "五百円", "options": ["五百円", "六百円", "四百円"]}
                ]
            }
        },
        {
            "game_type": "POSTCARD_FILL",
            "title": "Minigame 4: Điền số nhà, tầng lầu và mã bưu điện vào bưu thiếp (Trang 21)",
            "instruction": "Nhìn bức tranh bưu thiếp trang 21 gửi cho bạn Yamada, chọn các con số Kanji thích hợp vào các ô trống.",
            "image_url": "/assets/kanji/n5/minigames/chap1_minigame_p21.webp",
            "display_order": 4,
            "data": {
                "sections": [
                    {"label": "Mã bưu điện (郵便番号)", "prompt": "〒105-0014: 1, 0, 5, 0, 0, 1, 4", "answer": "一〇五-〇〇一四"},
                    {"label": "Số tầng lầu (ビル)", "prompt": "Tòa nhà Sakura tầng 7", "answer": "七階", "options": ["五階", "六階", "七階"]},
                    {"label": "Số phòng (部屋番号)", "prompt": "Phòng số 302", "answer": "三〇二号室", "options": ["三〇二号室", "四〇二号室", "二〇一号室"]}
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
