-- =============================================================================
-- Flyway Migration: V18 - Seed Chapter 4 Content (Kanji Master N5)
-- Chapter 4: しぜん-1 (Tự nhiên 1) - 7 Kanji, 26 Vocab, 20 Exercises, 4 Minigames
-- =============================================================================

DO $$
DECLARE
    ch4_id BIGINT;
BEGIN
    SELECT id INTO ch4_id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = 4;

    IF ch4_id IS NOT NULL THEN
        -- 1. Cập nhật image_url cho 7 chữ Hán chương 4
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_1.webp' WHERE chapter_id = ch4_id AND character = '山';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_2.webp' WHERE chapter_id = ch4_id AND character = '川';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_3.webp' WHERE chapter_id = ch4_id AND character = '田';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_4.webp' WHERE chapter_id = ch4_id AND character = '石';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_5.webp' WHERE chapter_id = ch4_id AND character = '花';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_6.webp' WHERE chapter_id = ch4_id AND character = '竹';
        UPDATE kanjis SET image_url = '/assets/kanji/n5/illustrations/chap4_kanji_7.webp' WHERE chapter_id = ch4_id AND character = '雨';

        -- 2. Xóa các bài tập, từ vựng, minigame cũ để tránh trùng lặp
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = ch4_id;
        DELETE FROM kanji_exercises WHERE chapter_id = ch4_id;
        DELETE FROM kanji_minigames WHERE chapter_id = ch4_id;

        -- 3. Chèn từ vựng ứng dụng chương 4
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (ch4_id, '山', 'やま', 'yama', 'Ngọn núi', 'Mountain', 1, NOW()),
        (ch4_id, '富士山', 'ふじさん', 'fujisan', 'Núi Phú Sĩ', 'Mt. Fuji', 2, NOW()),
        (ch4_id, '登山', 'とざん', 'tozan', 'Leo núi', 'Mountain climbing', 3, NOW()),
        (ch4_id, '山道', 'やまみち', 'yamamichi', 'Đường núi', 'Mountain trail', 4, NOW()),
        (ch4_id, '川', 'かわ', 'kawa', 'Dòng sông', 'River', 5, NOW()),
        (ch4_id, '小川', 'おがわ', 'ogawa', 'Dòng suối nhỏ', 'Stream, creek', 6, NOW()),
        (ch4_id, 'ナイル川', 'ナイルがわ', 'nairugawa', 'Sông Nile', 'Nile River', 7, NOW()),
        (ch4_id, '田', 'た', 'ta', 'Ruộng lúa', 'Rice field', 8, NOW()),
        (ch4_id, '田んぼ', 'たんぼ', 'tanbo', 'Ruộng lúa, cánh đồng', 'Paddy field', 9, NOW()),
        (ch4_id, '水田', 'すいでん', 'suiden', 'Ruộng lúa nước', 'Wet paddy', 10, NOW()),
        (ch4_id, '油田', 'ゆでん', 'yuden', 'Mỏ dầu', 'Oil field', 11, NOW()),
        (ch4_id, '石', 'いし', 'ishi', 'Hòn đá, viên đá', 'Stone, rock', 12, NOW()),
        (ch4_id, '小石', 'こいし', 'koishi', 'Viên sỏi, đá cuội', 'Pebble', 13, NOW()),
        (ch4_id, '化石', 'かせき', 'kaseki', 'Hóa thạch', 'Fossil', 14, NOW()),
        (ch4_id, '宝石', 'ほうせき', 'houseki', 'Đá quý', 'Jewelry, gem', 15, NOW()),
        (ch4_id, '花', 'はな', 'hana', 'Bông hoa', 'Flower', 16, NOW()),
        (ch4_id, '花火', 'はなび', 'hanabi', 'Pháo hoa', 'Fireworks', 17, NOW()),
        (ch4_id, '花見', 'はなみ', 'hanami', 'Ngắm hoa anh đào', 'Cherry blossom viewing', 18, NOW()),
        (ch4_id, '花束', 'はなたば', 'hanataba', 'Bó hoa', 'Bouquet', 19, NOW()),
        (ch4_id, '花瓶', 'かびん', 'kabin', 'Bình cắm hoa', 'Vase', 20, NOW()),
        (ch4_id, '竹', 'たけ', 'take', 'Cây tre, trúc', 'Bamboo', 21, NOW()),
        (ch4_id, '竹の子', 'たけのこ', 'takenoko', 'Búp măng tre', 'Bamboo shoot', 22, NOW()),
        (ch4_id, '竹林', 'ちくりん', 'chikurin', 'Rừng tre, rừng trúc', 'Bamboo grove', 23, NOW()),
        (ch4_id, '雨', 'あめ', 'ame', 'Cơn mưa', 'Rain', 24, NOW()),
        (ch4_id, '大雨', 'おおあめ', 'ooame', 'Mưa rào lớn', 'Heavy rain', 25, NOW()),
        (ch4_id, '雨水', 'あまみず', 'amamizu', 'Nước mưa', 'Rainwater', 26, NOW());

        -- 4. Chèn bài tập Đọc ngữ cảnh (よみましょう - 10 câu)
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (ch4_id, 'READING', 'あぶないですから [石]を なげてはいけません。', '石', 'いし', '["いし", "いわ", "すな", "つち"]', 'Chữ 石 đứng độc lập đọc âm Kun là いし (hòn đá).', 1, NOW()),
        (ch4_id, 'READING', 'まいにち [山の手]せんで がっこうへ いきます。', '山の手', 'やまのて', '["やまのて", "さんのて", "やまて", "やまのしゅ"]', 'Tuyến tàu vành đai nổi tiếng Tokyo: 山の手線 (やまのてせん).', 2, NOW()),
        (ch4_id, 'READING', '[水田]で こめを つくります。', '水田', 'すいでん', '["すいだ", "みずた", "すいでん", "みずでん"]', '水田 (ruộng lúa nước): đọc âm On là すいでん.', 3, NOW()),
        (ch4_id, 'READING', 'このクラスの たんにんは [川口]せんです。', '川口', 'かわぐち', '["かわぐち", "かわくち", "せんぐち", "せんこう"]', 'Họ phổ biến ở Nhật: 川口 đọc là かわぐち.', 4, NOW()),
        (ch4_id, 'READING', 'にほんで いちばん ながい[川]は どこに ありますか。', '川', 'かわ', '["かわ", "がわ", "せん", "やま"]', 'Chữ 川 (con sông) đứng độc lập đọc âm Kun là かわ.', 5, NOW()),
        (ch4_id, 'READING', 'にほんは [山]が おおい くにです。', '山', 'やま', '["やま", "さん", "かわ", "もり"]', 'Chữ 山 (núi non) đứng độc lập đọc âm Kun là やま.', 6, NOW()),
        (ch4_id, 'READING', 'ダイヤモンドや ルビーなどの [ほう石]は たかいです。', 'ほう石', 'せき', '["せき", "いし", "こく", "しゃく"]', '宝石 (đá quý): chữ 石 đọc âm On là せき (ほうせき).', 7, NOW()),
        (ch4_id, 'READING', '[花びん]を テーブルの うえに おきました。', '花びん', 'か', '["か", "はな", "け", "ばな"]', '花瓶 (bình cắm hoa): chữ 花 đọc âm On là か (かびん).', 8, NOW()),
        (ch4_id, 'READING', 'はるは [竹のこ]が おいしいです。', '竹のこ', 'たけ', '["たけ", "ちく", "ささ", "きのこ"]', '竹の子 (măng tre): chữ 竹 đọc là たけ (たけのこ).', 9, NOW()),
        (ch4_id, 'READING', 'にほんは 6がつに [雨]が たくさん ふります。', '雨', 'あめ', '["あめ", "あま", "う", "ゆき"]', 'Chữ 雨 (cơn mưa) đứng độc lập đọc âm Kun là あめ.', 10, NOW());

        -- 5. Chèn bài tập Viết chữ Hán (かきましょう - 10 câu)
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (ch4_id, 'WRITING', 'ことしの なつやすみは [ふじ]さんへ いきたいです。Kanji đúng là:', 'ふじ', '富士', '["富士", "富土", "冨士", "付士"]', 'ふじさん viết chữ Hán là 富士山.', 1, NOW()),
        (ch4_id, 'WRITING', '[やまだ]さんは ハンサムで すてきな 人です。Kanji đúng là:', 'やまだ', '山田', '["山田", "山多", "止田", "出田"]', 'やまだ (Yamada) ghép từ chữ 山 và chữ 田.', 2, NOW()),
        (ch4_id, 'WRITING', '[たんぼ]に カエルや かもが います。Kanji đúng là:', 'たんぼ', '田', '["田", "由", "甲", "申"]', 'たんぼ (ruộng lúa) chữ Hán là 田 (田んぼ).', 3, NOW()),
        (ch4_id, 'WRITING', 'まいあさ ベランダの [はな]に 水を やります。Kanji đúng là:', 'はな', '花', '["花", "華", "化", "草"]', 'はな (bông hoa) viết chữ Hán là 花.', 4, NOW()),
        (ch4_id, 'WRITING', 'かわで きれいな [こいし]を ひろいました。Kanji đúng là:', 'こいし', '小石', '["小石", "少石", "古石", "子石"]', 'こいし (viên sỏi, đá cuội nhỏ) viết là 小石.', 5, NOW()),
        (ch4_id, 'WRITING', 'ははのひに カーネーションの [はなたば]を あげました。Kanji đúng là:', 'はなたば', '花束', '["花束", "華束", "花東", "草束"]', 'はなたば (bó hoa tươi) viết là 花束.', 6, NOW()),
        (ch4_id, 'WRITING', 'なつやすみに [はなび]を みに いきます。Kanji đúng là:', 'はなび', '花火', '["花火", "華火", "花日", "草火"]', 'はなび (pháo hoa mùa hè) viết là 花火.', 7, NOW()),
        (ch4_id, 'WRITING', 'きれいな [かわ]で こどもが あそんでいます。Kanji đúng là:', 'かわ', '川', '["川", "州", "三", "山"]', 'かわ (dòng sông) viết chữ Hán là 川.', 8, NOW()),
        (ch4_id, 'WRITING', 'うちの ちかくの やまに [ちくりん]が あります。Kanji đúng là:', 'ちくりん', '竹林', '["竹林", "竹森", "竹木", "竿林"]', 'ちくりん (rừng tre, rừng trúc) viết là 竹林.', 9, NOW()),
        (ch4_id, 'WRITING', 'たいふうで [おおあめ]が たくさん ふりました。Kanji đúng là:', 'おおあめ', '大雨', '["大雨", "太雨", "多雨", "大雪"]', 'おおあめ (mưa to dữ dội) viết chữ Hán là 大雨.', 10, NOW());

        -- 6. Chèn 4 Minigames chương 4 (Trang 44 & 45)
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (ch4_id, 'PICTURE_MATCH', 'Minigame 1: Nhìn hình đoán chữ Hán tự nhiên — Trang 44', 'Quan sát tranh vẽ phong cảnh thiên nhiên ở bài 【1】 trang 44 và chọn chữ Hán (山, 竹, 川, 石, 雨) tương ứng.', '/assets/kanji/n5/minigames/chap4_minigame_p44.webp', '{"example": {"prompt": "Ví dụ mẫu (れい): Ruộng lúa =>", "answer": "田"}, "questions": [{"id": 1, "prompt": "1. Hình vẽ ba ngọn núi nhấp nhô:", "options": ["山", "川", "田", "石"], "answer": "山", "explanation": "Ba ngọn núi nhấp nhô tượng hình cho chữ 山 (SƠN)."}, {"id": 2, "prompt": "2. Hình vẽ bụi tre xanh:", "options": ["竹", "花", "木", "林"], "answer": "竹", "explanation": "Các đốt tre và nhánh lá tượng hình cho chữ 竹 (TRÚC)."}, {"id": 3, "prompt": "3. Hình vẽ dòng sông uốn khúc:", "options": ["川", "山", "雨", "水"], "answer": "川", "explanation": "Dòng nước sông chảy uốn lượn tượng hình cho chữ 川 (XUYÊN)."}, {"id": 4, "prompt": "4. Hình vẽ những tảng đá lớn:", "options": ["石", "田", "土", "山"], "answer": "石", "explanation": "Khối đá dưới vách núi tượng hình cho chữ 石 (THẠCH)."}, {"id": 5, "prompt": "5. Hình vẽ đám mây đang đổ hạt mưa:", "options": ["雨", "水", "雪", "天"], "answer": "雨", "explanation": "Đám mây với những giọt nước mưa rơi xuống tượng hình cho chữ 雨 (VŨ)."}]}', 1, NOW()),

        (ch4_id, 'PICTURE_MATCH', 'Minigame 2: Thêm nét hoàn thiện chữ Hán — Trang 44', 'Quan sát các nét phác thảo ở bài 【2】 trang 44 và chọn chữ Hán hoàn chỉnh tương ứng với cách đọc.', '/assets/kanji/n5/minigames/chap4_minigame_p44.webp', '{"example": {"prompt": "Ví dụ mẫu (れい): ひと =>", "answer": "人"}, "questions": [{"id": 1, "prompt": "1. Cách đọc: やま (Nét 山 dang dở) =>", "options": ["山", "出", "止", "上"], "answer": "山", "explanation": "やま là chữ 山 (SƠN - Núi)."}, {"id": 2, "prompt": "2. Cách đọc: かわ (Nét 丿 dòng sông) =>", "options": ["川", "三", "州", "水"], "answer": "川", "explanation": "かわ là chữ 川 (XUYÊN - Sông)."}, {"id": 3, "prompt": "3. Cách đọc: て (Nét 三 ba nét ngang) =>", "options": ["手", "毛", "王", "生"], "answer": "手", "explanation": "て là chữ 手 (THỦ - Tay)."}, {"id": 4, "prompt": "4. Cách đọc: いし (Nét 厂 vách đá) =>", "options": ["石", "右", "左", "反"], "answer": "石", "explanation": "いし là chữ 石 (THẠCH - Đá)."}, {"id": 5, "prompt": "5. Cách đọc: た (Nét 皿 ruộng nước) =>", "options": ["田", "四", "目", "白"], "answer": "田", "explanation": "た là chữ 田 (ĐIỀN - Ruộng)."}, {"id": 6, "prompt": "6. Cách đọc: あし (Nét ロ bàn chân) =>", "options": ["足", "定", "是", "走"], "answer": "足", "explanation": "あし là chữ 足 (TÚC - Chân)."}, {"id": 7, "prompt": "7. Cách đọc: たけ (Nét ケ lá tre) =>", "options": ["竹", "行", "年", "生"], "answer": "竹", "explanation": "たけ là chữ 竹 (TRÚC - Tre)."}, {"id": 8, "prompt": "8. Cách đọc: あめ (Nét 冂 bầu trời) =>", "options": ["雨", "両", "西", "円"], "answer": "雨", "explanation": "あめ là chữ 雨 (VŨ - Mưa)."}]}', 2, NOW()),

        (ch4_id, 'PICTURE_MATCH', 'Minigame 3: Tên người Nhật Bản — Trang 45', 'Quan sát bức tranh bữa tiệc ngoài trời ở bài 【3】 trang 45 và ghép tên người Nhật viết bằng chữ Hán.', '/assets/kanji/n5/minigames/chap4_minigame_p45.webp', '{"questions": [{"id": 1, "prompt": "1. [やまだ] さんは アイスクリームを たべています。", "options": ["山田", "山多", "止田", "出田"], "answer": "山田", "explanation": "やまだ viết chữ Hán là 山田."}, {"id": 2, "prompt": "2. [かわだ] さんは コップを もっています。", "options": ["川田", "河田", "川多", "三田"], "answer": "川田", "explanation": "かわだ viết chữ Hán là 川田."}, {"id": 3, "prompt": "3. [いしだ] さんは おどっています。", "options": ["石田", "石多", "岩田", "右田"], "answer": "石田", "explanation": "いしだ viết chữ Hán là 石田."}, {"id": 4, "prompt": "4. [いしかわ] さんは ジュースを のんでいます。", "options": ["石川", "石河", "右川", "岩川"], "answer": "石川", "explanation": "いしかわ viết chữ Hán là 石川."}, {"id": 5, "prompt": "5. [たけやま] さんは しゃしんを とっています。", "options": ["竹山", "竹出", "笹山", "竹三"], "answer": "竹山", "explanation": "たけやま viết chữ Hán là 竹山."}, {"id": 6, "prompt": "6. [やまかわ] さんは うたを うたっています。", "options": ["山川", "山河", "出川", "三川"], "answer": "山川", "explanation": "やまかわ viết chữ Hán là 山川."}]}', 3, NOW()),

        (ch4_id, 'PICTURE_MATCH', 'Minigame 4: Đọc đoạn văn dã ngoại thiên nhiên — Trang 45', 'Đọc đoạn văn kể về chuyến leo núi ngày Chủ Nhật ở bài 【4】 trang 45 và điền cách đọc hoặc chữ Hán đúng.', '/assets/kanji/n5/minigames/chap4_minigame_p45.webp', '{"questions": [{"id": 1, "prompt": "1. [日曜日] ともだちと いっしょに 山へ いきました。", "options": ["にち", "ひ", "び", "か"], "answer": "にち", "explanation": "日曜日 (Chủ Nhật): chữ 日 đầu tiên đọc là にち."}, {"id": 2, "prompt": "2. ともだちと いっしょに [山]へ いきました。", "options": ["やま", "さん", "かわ", "もり"], "answer": "やま", "explanation": "山 (ngọn núi) đọc âm Kun là やま."}, {"id": 3, "prompt": "3. [土曜日]は 雨でしたが、日曜日 はれでした。", "options": ["ど", "つち", "とう", "と"], "answer": "ど", "explanation": "土曜日 (thứ Bảy): chữ 土 đọc là ど."}, {"id": 4, "prompt": "4. 土曜日は [雨]でしたが、日曜日 はれでした。", "options": ["あめ", "ゆき", "あま", "う"], "answer": "あめ", "explanation": "雨 (mưa) đọc là あめ."}, {"id": 5, "prompt": "5. 山には [はな]が たくさん さいていました。Kanji là:", "options": ["花", "華", "草", "化"], "answer": "花", "explanation": "はな (hoa) viết chữ Hán là 花."}, {"id": 6, "prompt": "6. [川]の ちかくで おべんとうを たべました。", "options": ["かわ", "がわ", "せん", "やま"], "answer": "かわ", "explanation": "川 (dòng sông) đọc là かわ."}, {"id": 7, "prompt": "7. それから [みず]あそびを しました。Kanji là:", "options": ["水", "氷", "川", "雨"], "answer": "水", "explanation": "みず (nước) viết chữ Hán là 水."}, {"id": 8, "prompt": "8. たくさん あるきましたから [あし]が つかれました。Kanji là:", "options": ["足", "手", "目", "耳"], "answer": "足", "explanation": "あし (chân) viết chữ Hán là 足."}]}', 4, NOW());

    END IF;
END $$;
