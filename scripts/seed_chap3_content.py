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
    # 1. Lấy ID Chương 3
    cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = 3;")
    ch3_row = cur.fetchone()
    if not ch3_row:
        raise Exception("Chapter 3 not found in database!")
    ch3_id = ch3_row[0]
    print(f"Chapter 3 ID: {ch3_id}")

    # 2. Xóa dữ liệu cũ nếu có
    cur.execute("DELETE FROM kanji_chapter_vocab WHERE chapter_id = %s;", (ch3_id,))
    cur.execute("DELETE FROM kanji_exercises WHERE chapter_id = %s;", (ch3_id,))
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch3_id,))

    # 3. Cập nhật image_url cho 7 chữ Hán Chương 3: 人, 口, 目, 耳, 手, 足, 力
    # Theo thứ tự chapter_order: 1:人, 2:口, 3:目, 4:耳, 5:手, 6:足, 7:力
    cur.execute("""
        SELECT id, character, chapter_order 
        FROM kanjis 
        WHERE chapter_id = %s 
        ORDER BY chapter_order;
    """, (ch3_id,))
    kanji_rows = cur.fetchall()
    for idx, k in enumerate(kanji_rows, 1):
        img_url = f"/assets/kanji/n5/illustrations/chap3_kanji_{idx}.webp"
        cur.execute("""
            UPDATE kanjis 
            SET image_url = %s 
            WHERE id = %s;
        """, (img_url, k[0]))
        print(f"Updated image_url for {k[1]} (id={k[0]}, order={k[2]}): {img_url}")

    # 4. Seed Chapter 3 Vocabularies (28 từ vựng phong phú)
    vocab_data = [
        ("人", "ひと", "hito", "Người, con người", "Person, human", 1),
        ("男の人", "おとこのひと", "otokonohito", "Người đàn ông", "Man", 2),
        ("女の人", "おんなのひと", "onnanohito", "Người phụ nữ", "Woman", 3),
        ("大人", "おとな", "otona", "Người lớn, trưởng thành", "Adult", 4),
        ("一人", "ひとり", "hitori", "Một người, một mình", "One person / alone", 5),
        ("二人", "ふたり", "futari", "Hai người", "Two people", 6),
        ("三人", "さんにん", "sannin", "Ba người", "Three people", 7),
        ("アメリカ人", "アメリカじん", "amerikajin", "Người Mỹ", "American", 8),
        ("日本人", "にほんじん", "nihonjin", "Người Nhật", "Japanese person", 9),
        ("人口", "じんこう", "jinkou", "Dân số", "Population", 10),
        ("口", "くち", "kuchi", "Miệng", "Mouth", 11),
        ("入口", "いりぐち", "iriguchi", "Lối vào, cửa vào", "Entrance", 12),
        ("出口", "でぐち", "deguchi", "Lối ra, cửa ra", "Exit", 13),
        ("改札口", "かいさつぐち", "kaisatsuguchi", "Cổng soát vé", "Ticket gate", 14),
        ("目", "め", "me", "Mắt", "Eye", 15),
        ("目薬", "めぐすり", "megusuri", "Thuốc nhỏ mắt", "Eye drops", 16),
        ("目覚まし時計", "めざましどけい", "mezamashidokei", "Đồng hồ báo thức", "Alarm clock", 17),
        ("耳", "みみ", "mimi", "Tai", "Ear", 18),
        ("耳鼻科", "じびか", "jibika", "Khoa tai mũi họng", "ENT clinic", 19),
        ("手", "て", "te", "Bàn tay, tay", "Hand", 20),
        ("手紙", "てがみ", "tegami", "Bức thư", "Letter", 21),
        ("切手", "きって", "kitte", "Tem bưu chính", "Postage stamp", 22),
        ("運転手", "うんてんしゅ", "untenshu", "Tài xế lái xe", "Driver", 23),
        ("足", "あし", "ashi", "Bàn chân, cẳng chân", "Foot / leg", 24),
        ("一足", "いっそく", "issoku", "Một đôi (giày, tất)", "One pair of shoes/socks", 25),
        ("足す", "たす", "tasu", "Thêm vào, cộng vào", "To add", 26),
        ("力", "ちから", "chikara", "Sức lực, sức mạnh", "Power, strength", 27),
        ("学力", "がくりょく", "gakuryoku", "Học lực", "Academic ability", 28),
    ]

    for v in vocab_data:
        cur.execute("""
            INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch3_id, v[0], v[1], v[2], v[3], v[4], v[5]))
    print(f"Seeded {len(vocab_data)} vocabularies for Chapter 3.")

    # 5. Seed Chapter 3 Exercises (Trang 35 sách giáo trình: 10 câu đọc + 10 câu viết)
    reading_exercises = [
        ("ジョンさんは [アメリカ人]です。", "アメリカ人", "じん", ["じん", "ひと", "にん", "びと"], "Người nước nào đó kết hợp với chữ 人 đọc âm On là じん (アメリカじん).", 1),
        ("わたしは [一人]で にほんへ きました。", "一人", "ひとり", ["いちにん", "ひとり", "ひとつ", "いちじん"], "Từ đặc biệt: 一人 (một mình / 1 người) đọc là ひとり.", 2),
        ("[足]を けがして びょういんへ いきました。", "足", "あし", ["て", "め", "あし", "みみ"], "Chữ 足 (chân) đứng độc lập đọc âm Kun là あし.", 3),
        ("しぶやえきの [かいさつ口]で ともだちと あいます。", "かいさつ口", "ぐち", ["くち", "ぐち", "こう", "め"], "改札口 (cổng soát vé ga) biến âm đọc là かいさつぐち.", 4),
        ("あした がっこうで [がく力]テストが あります。", "がく力", "りょく", ["りょく", "ちから", "りき", "ろく"], "学力 (học lực) chữ 力 đọc âm On là りょく (がくりょく).", 5),
        ("いつも [目ざまし]どけいを 7じに セットしています。", "目ざまし", "めざまし", ["めざまし", "もくざまし", "まざまし", "みざまし"], "目覚まし (đánh thức, báo thức): chữ 目 đọc là め (めざましどけい).", 6),
        ("きのう [耳び]かへ いきました。", "耳び", "じび", ["じび", "みみび", "にび", "にんび"], "耳鼻科 (khoa tai mũi họng): chữ 耳 đọc âm On là じ (じびか).", 7),
        ("くにの りょうしんに [手紙]を かきました。", "手紙", "てがみ", ["てがみ", "しゅし", "てかみ", "ずがみ"], "手紙 (bức thư): đọc âm Kun là てがみ.", 8),
        ("ゆうびんきょくで [きっ手]を ごまい かいます。", "きっ手", "て", ["て", "しゅ", "で", "ず"], "切手 (tem thư): chữ 手 đọc là て (きって).", 9),
        ("とうきょうの [人口]を しっていますか。", "人口", "じんこう", ["ひとくち", "にんこう", "じんこう", "じんくち"], "人口 (dân số): đọc âm On là じんこう.", 10),
    ]

    for ex in reading_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'READING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch3_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    writing_exercises = [
        ("ジョンさんは [ちから]が とても つよいです。Kanji đúng là:", "ちから", "力", ["力", "刀", "九", "万"], "ちから (sức lực, sức mạnh) viết chữ Hán là 力.", 1),
        ("しんじゅくえきは [ひと]が とても おおいです。Kanji đúng là:", "ひと", "人", ["人", "入", "八", "大"], "ひと (con người) viết chữ Hán là 人.", 2),
        ("クラスの がくせいは ぜんぶで [にじゅうにん] います。Kanji đúng là:", "にじゅうにん", "二十人", ["二十人", "二重人", "二十入", "十二人"], "にじゅうにん (20 người) viết chữ Hán là 二十人.", 3),
        ("しんおおさかは なごやから [ふたつ]めです。Kanji đúng là:", "ふたつ", "二つ", ["二つ", "一つ", "三つ", "四つ"], "ふたつ (thứ hai, 2 cái) viết chữ Hán là 二つ.", 4),
        ("ドラッグストアで [め]ぐすりを かいました。Kanji đúng là:", "め", "目", ["目", "日", "自", "見"], "め (mắt trong 目薬 - thuốc nhỏ mắt) viết chữ Hán là 目.", 5),
        ("ジミーさんは せが たかくて [くち]が おおきいです。Kanji đúng là:", "くち", "口", ["口", "日", "品", "目"], "くち (miệng) viết chữ Hán là 口.", 6),
        ("わたしの ちちは タクシーの [うんてんしゅ]です。Kanji đúng là:", "うんてんしゅ", "運転手", ["運転手", "運転人", "雲転手", "運点手"], "うんてんしゅ (tài xế lái xe) viết chữ Hán là 運転手 (với chữ 手).", 7),
        ("[みみ]が いたいですから びょういんへ いきました。Kanji đúng là:", "みみ", "耳", ["耳", "目", "取", "身"], "みみ (tai) viết chữ Hán là 耳.", 8),
        ("デパートで くつしたを [にそく] かいました。Kanji đúng là:", "にそく", "二足", ["二足", "二疋", "二本", "二対"], "にそく (hai đôi tất) dùng lượng từ chữ 足 (二足).", 9),
        ("あじが うすいですね。しおを [た]してください。Kanji đúng là:", "た", "足", ["足", "多", "加", "付"], "たす (thêm vào, bổ sung) viết chữ Hán là 足す (chữ 足).", 10),
    ]

    for ex in writing_exercises:
        cur.execute("""
            INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at)
            VALUES (%s, 'WRITING', %s, %s, %s, %s, %s, %s, NOW());
        """, (ch3_id, ex[0], ex[1], ex[2], json.dumps(ex[3], ensure_ascii=False), ex[4], ex[5]))

    print(f"Seeded 20 exercises (10 reading + 10 writing) for Chapter 3.")

    # 6. Seed Chapter 3 Minigames (Trang 36 & 37)
    minigames = [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: Ghép các nét tạo thành chữ Hán — Trang 36",
            "instruction": "Quan sát các nét bút ở bài 【1】 trang 36 và ghép thành chữ Hán hoàn chỉnh tương ứng.",
            "image_url": "/assets/kanji/n5/minigames/chap3_minigame_p36.webp",
            "display_order": 1,
            "game_data_json": json.dumps({
                "example": { "prompt": "Ví dụ mẫu (れい): ノ + ヽ =", "answer": "人" },
                "questions": [
                    { "id": 1, "prompt": "1. └ + ┐ =", "options": ["口", "日", "目", "田"], "answer": "口", "explanation": "Hai nét gập góc ghép lại thành chữ 口 (KHẨU)." },
                    { "id": 2, "prompt": "2. 口 + 止 =", "options": ["足", "正", "走", "品"], "answer": "足", "explanation": "Chữ 口 ở trên ghép với chữ 止 ở dưới thành chữ 足 (TÚC - bàn chân)." },
                    { "id": 3, "prompt": "3. 三 + 亅 =", "options": ["手", "毛", "王", "生"], "answer": "手", "explanation": "Ba nét ngang và một nét móc đứng cắt qua tạo thành chữ 手 (THỦ - bàn tay)." },
                    { "id": 4, "prompt": "4. 口 + 二 =", "options": ["目", "日", "田", "白"], "answer": "目", "explanation": "Khung 口 có hai nét gạch ngang bên trong tạo thành chữ 目 (MỤC - mắt)." },
                    { "id": 5, "prompt": "5. 丁 + 丩 =", "options": ["耳", "取", "身", "門"], "answer": "耳", "explanation": "Ghép các nét lại tạo thành hình chữ 耳 (NHĨ - tai)." },
                    { "id": 6, "prompt": "6. 刀 + ノ =", "options": ["力", "万", "九", "刃"], "answer": "力", "explanation": "Khung nét gập móc và nét phẩy dài cắt qua tạo thành chữ 力 (LỰC - sức mạnh)." }
                ]
            }, ensure_ascii=False)
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: Phụ kiện đeo vào bộ phận nào trên cơ thể? — Trang 36",
            "instruction": "Đọc tên các phụ kiện, trang sức ở bài 【2】 trang 36 và chọn chữ Hán (口, 目, 耳, 手, 足) chỉ bộ phận cơ thể tương ứng.",
            "image_url": "/assets/kanji/n5/minigames/chap3_minigame_p36.webp",
            "display_order": 2,
            "game_data_json": json.dumps({
                "example": { "prompt": "Ví dụ mẫu (れい): 口べに (Son môi) =>", "answer": "口" },
                "questions": [
                    { "id": 1, "prompt": "1. くつ (Giày):", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Giày (くつ) đi vào bàn chân (足 - あし)." },
                    { "id": 2, "prompt": "2. サングラス (Kính râm):", "options": ["目", "耳", "口", "手"], "answer": "目", "explanation": "Kính râm (サングラス) đeo vào mắt (目 - め)." },
                    { "id": 3, "prompt": "3. ピアス (Khuyên tai):", "options": ["耳", "口", "目", "手"], "answer": "耳", "explanation": "Khuyên tai (ピアス) bấm vào tai (耳 - みみ)." },
                    { "id": 4, "prompt": "4. ゆびわ (Nhẫn):", "options": ["手", "足", "耳", "目"], "answer": "手", "explanation": "Nhẫn (ゆびわ) đeo vào ngón tay (手 - て)." },
                    { "id": 5, "prompt": "5. うでどけい (Đồng hồ đeo tay):", "options": ["手", "足", "耳", "口"], "answer": "手", "explanation": "Đồng hồ (うでどけい) đeo vào cổ tay (手 - て)." },
                    { "id": 6, "prompt": "6. ハイヒール (Giày cao gót):", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Giày cao gót (ハイヒール) đi vào chân (足 - あし)." },
                    { "id": 7, "prompt": "7. ヘッドホン (Tai nghe trùm đầu):", "options": ["耳", "目", "口", "手"], "answer": "耳", "explanation": "Tai nghe trùm đầu (ヘッドホン) áp vào tai (耳 - みみ)." },
                    { "id": 8, "prompt": "8. マニキュア (Sơn móng tay):", "options": ["手", "足", "目", "口"], "answer": "手", "explanation": "Sơn móng tay (マニキュア) sơn lên móng tay (手 - て)." }
                ]
            }, ensure_ascii=False)
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 3: Người mẫu Kaori là người thế nào? — Trang 37",
            "instruction": "Đọc đoạn văn miêu tả về người mẫu Kaori ở bài 【3】 trang 37 và chọn cách đọc Kana đúng cho chữ Hán.",
            "image_url": "/assets/kanji/n5/minigames/chap3_minigame_p37.webp",
            "display_order": 3,
            "game_data_json": json.dumps({
                "questions": [
                    { "id": 1, "prompt": "1. かおりさんは [目]が くろくて おおきいです。", "options": ["め", "くち", "て", "あし"], "answer": "め", "explanation": "目 (Mắt) đọc là め." },
                    { "id": 2, "prompt": "2. かおりさんは [足]が ながくて スタイルが いいです。", "options": ["あし", "て", "め", "みみ"], "answer": "あし", "explanation": "足 (Chân) đọc là あし." },
                    { "id": 3, "prompt": "3. かおりさんの [手]は いつも きれいです。", "options": ["て", "あし", "め", "くち"], "answer": "て", "explanation": "手 (Tay) đọc là て." },
                    { "id": 4, "prompt": "4. かおりさんは [耳]に ピアスの あなが 五つも あります。", "options": ["みみ", "め", "て", "あし"], "answer": "みみ", "explanation": "耳 (Tai) đọc là みみ." },
                    { "id": 5, "prompt": "5. かおりさんは しんせつで すてきな [人]です。", "options": ["ひと", "じん", "にん", "びと"], "answer": "ひと", "explanation": "人 (Người) đọc âm Kun là ひと." },
                    { "id": 6, "prompt": "6. がくせい のとき [がく力]テストで いつも いちばんでした。", "options": ["がくりょく", "がくりき", "がくちから", "がくこう"], "answer": "がくりょく", "explanation": "学力 (Học lực) đọc là がくりょく." }
                ]
            }, ensure_ascii=False)
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 4: Chọn chữ Hán thích hợp điền vào câu — Trang 37",
            "instruction": "Đọc 7 câu tình huống ở bài 【4】 trang 37 và chọn chữ Hán (手, 人, 耳, 足, 目, 力, 口) đúng nhất vào chỗ trống.",
            "image_url": "/assets/kanji/n5/minigames/chap3_minigame_p37.webp",
            "display_order": 4,
            "game_data_json": json.dumps({
                "questions": [
                    { "id": 1, "prompt": "1. きのう おおきい びょういんへ いきました。(____)が たくさん いました。", "options": ["人", "手", "目", "足"], "answer": "人", "explanation": "Hôm qua đi bệnh viện lớn có rất nhiều người (人 - ひと)." },
                    { "id": 2, "prompt": "2. 日曜日 サッカーをして (____)を けがしました。", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Chủ Nhật đá bóng bị thương ở chân (足 - あし)." },
                    { "id": 3, "prompt": "3. きのう 一日中 テレビを みました。(____)が あかいです。", "options": ["目", "耳", "口", "手"], "answer": "目", "explanation": "Xem tivi cả ngày nên mắt (目 - め) bị đỏ." },
                    { "id": 4, "prompt": "4. プールで およぎました。水が (____)に はいって いたいです。", "options": ["耳", "目", "口", "足"], "answer": "耳", "explanation": "Bơi ở hồ bơi nước vào tai (耳 - みみ) làm đau tai." },
                    { "id": 5, "prompt": "5. ゆうべ りょうりのとき ほうちょうで (____)を きりました。", "options": ["手", "足", "口", "目"], "answer": "手", "explanation": "Tối qua nấu ăn dao cắt vào tay (手 - て)." },
                    { "id": 6, "prompt": "6. ふゆは かんそうしますから (____)に リップクリームを つけます。", "options": ["口", "目", "手", "耳"], "answer": "口", "explanation": "Mùa đông hanh khô nên bôi son dưỡng vào môi/miệng (口 - くち)." },
                    { "id": 7, "prompt": "7. たなかさんは まいにち うんどうしますから つよくて (____)が あります。", "options": ["力", "手", "足", "人"], "answer": "力", "explanation": "Anh Tanaka vận động mỗi ngày nên rất khỏe và có sức lực (力 - ちから)." }
                ]
            }, ensure_ascii=False)
        }
    ]

    for g in minigames:
        cur.execute("""
            INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
        """, (ch3_id, g["game_type"], g["title"], g["instruction"], g["image_url"], g["game_data_json"], g["display_order"]))

    print(f"Seeded {len(minigames)} minigames for Chapter 3.")

    conn.commit()
    print("ALL CHAPTER 3 CONTENT COMMITTED SUCCESSFULLY!")

except Exception as e:
    conn.rollback()
    print(f"Error seeding chapter 3: {e}")
    raise
finally:
    cur.close()
    conn.close()
