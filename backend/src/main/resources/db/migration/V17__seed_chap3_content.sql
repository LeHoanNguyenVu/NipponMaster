-- =============================================================================
-- Flyway Migration: V17 - Seed Chapter 3 Content (Kanji Master N5)
-- Chapter 3: 人 (Con người & Cơ thể) - 7 Kanji, 28 Vocab, 20 Exercises, 4 Minigames
-- =============================================================================

DO $$
DECLARE
    ch3_id BIGINT;
BEGIN
    SELECT id INTO ch3_id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = 3;

    IF ch3_id IS NOT NULL THEN
        -- 1. Cập nhật image_url cho 7 chữ Hán chương 3
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_1.webp' WHERE chapter_id = ch3_id AND character = '人';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_2.webp' WHERE chapter_id = ch3_id AND character = '口';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_3.webp' WHERE chapter_id = ch3_id AND character = '目';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_4.webp' WHERE chapter_id = ch3_id AND character = '耳';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_5.webp' WHERE chapter_id = ch3_id AND character = '手';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_6.webp' WHERE chapter_id = ch3_id AND character = '足';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap3_kanji_7.webp' WHERE chapter_id = ch3_id AND character = '力';

        -- 2. Xóa các bài tập, từ vựng, minigame cũ để tránh trùng lặp
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = ch3_id;
        DELETE FROM kanji_exercises WHERE chapter_id = ch3_id;
        DELETE FROM kanji_minigames WHERE chapter_id = ch3_id;

        -- 3. Chèn từ vựng ứng dụng chương 3
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (ch3_id, '人', 'ひと', 'hito', 'Người, con người', 'Person, human', 1, NOW()),
        (ch3_id, '男の人', 'おとこのひと', 'otokonohito', 'Người đàn ông', 'Man', 2, NOW()),
        (ch3_id, '女の人', 'おんなのひと', 'onnanohito', 'Người phụ nữ', 'Woman', 3, NOW()),
        (ch3_id, '大人', 'おとな', 'otona', 'Người lớn, trưởng thành', 'Adult', 4, NOW()),
        (ch3_id, '一人', 'ひとり', 'hitori', 'Một người, một mình', 'One person / alone', 5, NOW()),
        (ch3_id, '二人', 'ふたり', 'futari', 'Hai người', 'Two people', 6, NOW()),
        (ch3_id, '三人', 'さんにん', 'sannin', 'Ba người', 'Three people', 7, NOW()),
        (ch3_id, 'アメリカ人', 'アメリカじん', 'amerikajin', 'Người Mỹ', 'American', 8, NOW()),
        (ch3_id, '日本人', 'にほんじん', 'nihonjin', 'Người Nhật', 'Japanese person', 9, NOW()),
        (ch3_id, '人口', 'じんこう', 'jinkou', 'Dân số', 'Population', 10, NOW()),
        (ch3_id, '口', 'くち', 'kuchi', 'Miệng', 'Mouth', 11, NOW()),
        (ch3_id, '入口', 'いりぐち', 'iriguchi', 'Lối vào, cửa vào', 'Entrance', 12, NOW()),
        (ch3_id, '出口', 'でぐち', 'deguchi', 'Lối ra, cửa ra', 'Exit', 13, NOW()),
        (ch3_id, '改札口', 'かいさつぐち', 'kaisatsuguchi', 'Cổng soát vé', 'Ticket gate', 14, NOW()),
        (ch3_id, '目', 'め', 'me', 'Mắt', 'Eye', 15, NOW()),
        (ch3_id, '目薬', 'めぐすり', 'megusuri', 'Thuốc nhỏ mắt', 'Eye drops', 16, NOW()),
        (ch3_id, '目覚まし時計', 'めざましどけい', 'mezamashidokei', 'Đồng hồ báo thức', 'Alarm clock', 17, NOW()),
        (ch3_id, '耳', 'みみ', 'mimi', 'Tai', 'Ear', 18, NOW()),
        (ch3_id, '耳鼻科', 'じびか', 'jibika', 'Khoa tai mũi họng', 'ENT clinic', 19, NOW()),
        (ch3_id, '手', 'て', 'te', 'Bàn tay, tay', 'Hand', 20, NOW()),
        (ch3_id, '手紙', 'てがみ', 'tegami', 'Bức thư', 'Letter', 21, NOW()),
        (ch3_id, '切手', 'きって', 'kitte', 'Tem bưu chính', 'Postage stamp', 22, NOW()),
        (ch3_id, '運転手', 'うんてんしゅ', 'untenshu', 'Tài xế lái xe', 'Driver', 23, NOW()),
        (ch3_id, '足', 'あし', 'ashi', 'Bàn chân, cẳng chân', 'Foot / leg', 24, NOW()),
        (ch3_id, '一足', 'いっそく', 'issoku', 'Một đôi (giày, tất)', 'One pair of shoes/socks', 25, NOW()),
        (ch3_id, '足す', 'たす', 'tasu', 'Thêm vào, cộng vào', 'To add', 26, NOW()),
        (ch3_id, '力', 'ちから', 'chikara', 'Sức lực, sức mạnh', 'Power, strength', 27, NOW()),
        (ch3_id, '学力', 'がくりょく', 'gakuryoku', 'Học lực', 'Academic ability', 28, NOW());

        -- 4. Chèn bài tập Đọc ngữ cảnh (よみましょう - 10 câu)
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (ch3_id, 'READING', 'ジョンさんは [アメリカ人]です。', 'アメリカ人', 'じん', '["じん", "ひと", "にん", "びと"]', 'Người nước nào đó kết hợp với chữ 人 đọc âm On là じん (アメリカじん).', 1, NOW()),
        (ch3_id, 'READING', 'わたしは [一人]で にほんへ きました。', '一人', 'ひとり', '["いちにん", "ひとり", "ひとつ", "いちじん"]', 'Từ đặc biệt: 一人 (một mình / 1 người) đọc là ひとり.', 2, NOW()),
        (ch3_id, 'READING', '[足]を けがして びょういんへ いきました。', '足', 'あし', '["て", "め", "あし", "みみ"]', 'Chữ 足 (chân) đứng độc lập đọc âm Kun là あし.', 3, NOW()),
        (ch3_id, 'READING', 'しぶやえきの [かいさつ口]で ともだちと あいます。', 'かいさつ口', 'ぐち', '["くち", "ぐち", "こう", "め"]', '改札口 (cổng soát vé ga) biến âm đọc là かいさつぐち.', 4, NOW()),
        (ch3_id, 'READING', 'あした がっこうで [がく力]テストが あります。', 'がく力', 'りょく', '["りょく", "ちから", "りき", "ろく"]', '学力 (học lực) chữ 力 đọc âm On là りょく (がくりょく).', 5, NOW()),
        (ch3_id, 'READING', 'いつも [目ざまし]どけいを 7じに セットしています。', '目ざまし', 'めざまし', '["めざまし", "もくざまし", "まざまし", "みざまし"]', '目覚まし (đánh thức, báo thức): chữ 目 đọc là め (めざましどけい).', 6, NOW()),
        (ch3_id, 'READING', 'きのう [耳び]かへ いきました。', '耳び', 'じび', '["じび", "みみび", "にび", "にんび"]', '耳鼻科 (khoa tai mũi họng): chữ 耳 đọc âm On là じ (じびか).', 7, NOW()),
        (ch3_id, 'READING', 'くにの りょうしんに [手紙]を かきました。', '手紙', 'てがみ', '["てがみ", "しゅし", "てかみ", "ずがみ"]', '手紙 (bức thư): đọc âm Kun là てがみ.', 8, NOW()),
        (ch3_id, 'READING', 'ゆうびんきょくで [きっ手]を ごまい かいます。', 'きっ手', 'て', '["て", "しゅ", "で", "ず"]', '切手 (tem thư): chữ 手 đọc là て (きって).', 9, NOW()),
        (ch3_id, 'READING', 'とうきょうの [人口]を しっていますか。', '人口', 'じんこう', '["ひとくち", "にんこう", "じんこう", "じんくち"]', '人口 (dân số): đọc âm On là じんこう.', 10, NOW());

        -- 5. Chèn bài tập Viết chữ Hán (かきましょう - 10 câu)
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (ch3_id, 'WRITING', 'ジョンさんは [ちから]が とても つよいです。Kanji đúng là:', 'ちから', '力', '["力", "刀", "九", "万"]', 'ちから (sức lực, sức mạnh) viết chữ Hán là 力.', 1, NOW()),
        (ch3_id, 'WRITING', 'しんじゅくえきは [ひと]が とても おおいです。Kanji đúng là:', 'ひと', '人', '["人", "入", "八", "大"]', 'ひと (con người) viết chữ Hán là 人.', 2, NOW()),
        (ch3_id, 'WRITING', 'クラスの がくせいは ぜんぶで [にじゅうにん] います。Kanji đúng là:', 'にじゅうにん', '二十人', '["二十人", "二重人", "二十入", "十二人"]', 'にじゅうにん (20 người) viết chữ Hán là 二十人.', 3, NOW()),
        (ch3_id, 'WRITING', 'しんおおさかは なごやから [ふたつ]めです。Kanji đúng là:', 'ふたつ', '二つ', '["二つ", "一つ", "三つ", "四つ"]', 'ふたつ (thứ hai, 2 cái) viết chữ Hán là 二つ.', 4, NOW()),
        (ch3_id, 'WRITING', 'ドラッグストアで [め]ぐすりを かいました。Kanji đúng là:', 'め', '目', '["目", "日", "自", "見"]', 'め (mắt trong 目薬 - thuốc nhỏ mắt) viết chữ Hán là 目.', 5, NOW()),
        (ch3_id, 'WRITING', 'ジミーさんは せが たかくて [くち]が おおきいです。Kanji đúng là:', 'くち', '口', '["口", "日", "品", "目"]', 'くち (miệng) viết chữ Hán là 口.', 6, NOW()),
        (ch3_id, 'WRITING', 'わたしの ちちは タクシーの [うんてんしゅ]です。Kanji đúng là:', 'うんてんしゅ', '運転手', '["運転手", "運転人", "雲転手", "運点手"]', 'うんてんしゅ (tài xế lái xe) viết chữ Hán là 運転手 (với chữ 手).', 7, NOW()),
        (ch3_id, 'WRITING', '[みみ]が いたいですから びょういんへ いきました。Kanji đúng là:', 'みみ', '耳', '["耳", "目", "取", "身"]', 'みみ (tai) viết chữ Hán là 耳.', 8, NOW()),
        (ch3_id, 'WRITING', 'デパートで くつしたを [にそく] かいました。Kanji đúng là:', 'にそく', '二足', '["二足", "二疋", "二本", "二対"]', 'にそく (hai đôi tất) dùng lượng từ chữ 足 (二足).', 9, NOW()),
        (ch3_id, 'WRITING', 'あじが うすいですね。しおを [た]してください。Kanji đúng là:', 'た', '足', '["足", "多", "加", "付"]', 'たす (thêm vào, bổ sung) viết chữ Hán là 足す (chữ 足).', 10, NOW());

        -- 6. Chèn 4 Minigames chương 3 (Trang 36 & 37)
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (ch3_id, 'PICTURE_MATCH', 'Minigame 1: Ghép các nét tạo thành chữ Hán — Trang 36', 'Quan sát các nét bút ở bài 【1】 trang 36 và ghép thành chữ Hán hoàn chỉnh tương ứng.', '/assets/kanji/n5/minigames/chap3_minigame_p36.webp', '{"example": {"prompt": "Ví dụ mẫu (れい): ノ + ヽ =", "answer": "人"}, "questions": [{"id": 1, "prompt": "1. └ + ┐ =", "options": ["口", "日", "目", "田"], "answer": "口", "explanation": "Hai nét gập góc ghép lại thành chữ 口 (KHẨU)."}, {"id": 2, "prompt": "2. 口 + 止 =", "options": ["足", "正", "走", "品"], "answer": "足", "explanation": "Chữ 口 ở trên ghép với chữ 止 ở dưới thành chữ 足 (TÚC - bàn chân)."}, {"id": 3, "prompt": "3. 三 + 亅 =", "options": ["手", "毛", "王", "生"], "answer": "手", "explanation": "Ba nét ngang và một nét móc đứng cắt qua tạo thành chữ 手 (THỦ - bàn tay)."}, {"id": 4, "prompt": "4. 口 + 二 =", "options": ["目", "日", "田", "白"], "answer": "目", "explanation": "Khung 口 có hai nét gạch ngang bên trong tạo thành chữ 目 (MỤC - mắt)."}, {"id": 5, "prompt": "5. 丁 + 丩 =", "options": ["耳", "取", "身", "門"], "answer": "耳", "explanation": "Ghép các nét lại tạo thành hình chữ 耳 (NHĨ - tai)."}, {"id": 6, "prompt": "6. 刀 + ノ =", "options": ["力", "万", "九", "刃"], "answer": "力", "explanation": "Khung nét gập móc và nét phẩy dài cắt qua tạo thành chữ 力 (LỰC - sức mạnh)."}]}', 1, NOW()),

        (ch3_id, 'PICTURE_MATCH', 'Minigame 2: Phụ kiện đeo vào bộ phận nào trên cơ thể? — Trang 36', 'Đọc tên các phụ kiện, trang sức ở bài 【2】 trang 36 và chọn chữ Hán (口, 目, 耳, 手, 足) chỉ bộ phận cơ thể tương ứng.', '/assets/kanji/n5/minigames/chap3_minigame_p36.webp', '{"example": {"prompt": "Ví dụ mẫu (れい): 口べに (Son môi) =>", "answer": "口"}, "questions": [{"id": 1, "prompt": "1. くつ (Giày):", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Giày (くつ) đi vào bàn chân (足 - あし)."}, {"id": 2, "prompt": "2. サングラス (Kính râm):", "options": ["目", "耳", "口", "手"], "answer": "目", "explanation": "Kính râm (サングラス) đeo vào mắt (目 - め)."}, {"id": 3, "prompt": "3. ピアス (Khuyên tai):", "options": ["耳", "口", "目", "手"], "answer": "耳", "explanation": "Khuyên tai (ピアス) bấm vào tai (耳 - みみ)."}, {"id": 4, "prompt": "4. ゆびわ (Nhẫn):", "options": ["手", "足", "耳", "目"], "answer": "手", "explanation": "Nhẫn (ゆびわ) đeo vào ngón tay (手 - て)."}, {"id": 5, "prompt": "5. うでどけい (Đồng hồ đeo tay):", "options": ["手", "足", "耳", "口"], "answer": "手", "explanation": "Đồng hồ (うでどけい) đeo vào cổ tay (手 - て)."}, {"id": 6, "prompt": "6. ハイヒール (Giày cao gót):", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Giày cao gót (ハイヒール) đi vào chân (足 - あし)."}, {"id": 7, "prompt": "7. ヘッドホン (Tai nghe trùm đầu):", "options": ["耳", "目", "口", "手"], "answer": "耳", "explanation": "Tai nghe trùm đầu (ヘッドホン) áp vào tai (耳 - みみ)."}, {"id": 8, "prompt": "8. マニキュア (Sơn móng tay):", "options": ["手", "足", "目", "口"], "answer": "手", "explanation": "Sơn móng tay (マニキュア) sơn lên móng tay (手 - て)."}]}', 2, NOW()),

        (ch3_id, 'PICTURE_MATCH', 'Minigame 3: Người mẫu Kaori là người thế nào? — Trang 37', 'Đọc đoạn văn miêu tả về người mẫu Kaori ở bài 【3】 trang 37 và chọn cách đọc Kana đúng cho chữ Hán.', '/assets/kanji/n5/minigames/chap3_minigame_p37.webp', '{"questions": [{"id": 1, "prompt": "1. かおりさんは [目]が くろくて おおきいです。", "options": ["め", "くち", "て", "あし"], "answer": "め", "explanation": "目 (Mắt) đọc là め."}, {"id": 2, "prompt": "2. かおりさんは [足]が ながくて スタイルが いいです。", "options": ["あし", "て", "め", "みみ"], "answer": "あし", "explanation": "足 (Chân) đọc là あし."}, {"id": 3, "prompt": "3. かおりさんの [手]は いつも きれいです。", "options": ["て", "あし", "め", "くち"], "answer": "て", "explanation": "手 (Tay) đọc là て."}, {"id": 4, "prompt": "4. かおりさんは [耳]に ピアスの あなが 五つも あります。", "options": ["みみ", "め", "て", "あし"], "answer": "みみ", "explanation": "耳 (Tai) đọc là みみ."}, {"id": 5, "prompt": "5. かおりさんは しんせつで すてきな [人]です。", "options": ["ひと", "じん", "にん", "びと"], "answer": "ひと", "explanation": "人 (Người) đọc âm Kun là ひと."}, {"id": 6, "prompt": "6. がくせい のとき [がく力]テストで いつも いちばんでした。", "options": ["がくりょく", "がくりき", "がくちから", "がくこう"], "answer": "がくりょく", "explanation": "学力 (Học lực) đọc là がくりょく."}]}', 3, NOW()),

        (ch3_id, 'PICTURE_MATCH', 'Minigame 4: Chọn chữ Hán thích hợp điền vào câu — Trang 37', 'Đọc 7 câu tình huống ở bài 【4】 trang 37 và chọn chữ Hán (手, 人, 耳, 足, 目, 力, 口) đúng nhất vào chỗ trống.', '/assets/kanji/n5/minigames/chap3_minigame_p37.webp', '{"questions": [{"id": 1, "prompt": "1. きのう おおきい びょういんへ いきました。(____)が たくさん いました。", "options": ["人", "手", "目", "足"], "answer": "人", "explanation": "Hôm qua đi bệnh viện lớn có rất nhiều người (人 - ひと)."}, {"id": 2, "prompt": "2. 日曜日 サッカーをして (____)を けがしました。", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "Chủ Nhật đá bóng bị thương ở chân (足 - あし)."}, {"id": 3, "prompt": "3. きのう 一日中 テレビを みました。(____)が あかいです。", "options": ["目", "耳", "口", "手"], "answer": "目", "explanation": "Xem tivi cả ngày nên mắt (目 - め) bị đỏ."}, {"id": 4, "prompt": "4. プールで およぎました。水が (____)に はいって いたいです。", "options": ["耳", "目", "口", "足"], "answer": "耳", "explanation": "Bơi ở hồ bơi nước vào tai (耳 - みみ) làm đau tai."}, {"id": 5, "prompt": "5. ゆうべ りょうりのとき ほうちょうで (____)を きりました。", "options": ["手", "足", "口", "目"], "answer": "手", "explanation": "Tối qua nấu ăn dao cắt vào tay (手 - て)."}, {"id": 6, "prompt": "6. ふゆは かんそうしますから (____)に リップクリームを つけます。", "options": ["口", "目", "手", "耳"], "answer": "口", "explanation": "Mùa đông hanh khô nên bôi son dưỡng vào môi/miệng (口 - くち)."}, {"id": 7, "prompt": "7. たなかさんは まいにち うんどうしますから つよくて (____)が あります。", "options": ["力", "手", "足", "人"], "answer": "力", "explanation": "Anh Tanaka vận động mỗi ngày nên rất khỏe và có sức lực (力 - ちから)."}]}', 4, NOW());

    END IF;
END $$;
