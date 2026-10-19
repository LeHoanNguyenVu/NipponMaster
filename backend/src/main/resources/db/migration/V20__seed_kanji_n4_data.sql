-- =============================================================================
-- Flyway Migration: V20 - Seed 100% Authentic Kanji Master N4 Full Dataset
-- 9 Chapters, 192 Kanjis, Chapter Vocab, Exercises, Minigames & Tests
-- =============================================================================

-- 1. SEED 9 CHƯƠNG KANJI MASTER N4
INSERT INTO kanji_chapters (chapter_number, jlpt_level, title_ja, title_vi, title_en, kanji_count, display_order, illustration_url, description) VALUES
(1, 'N4', '家族の生かつ', 'Đời sống gia đình & Thói quen', 'Family Life & Habits', 8, 1, '/assets/kanji/n4/illustrations/chap1_sub1_full.webp', '8 chữ Hán về các mối quan hệ gia đình ruột thịt và nuôi dạy con cái: 家, 族, 兄, 弟, 姉, 妹, 私, 育.'),
(2, 'N4', 'コンビニ', 'Cửa hàng tiện lợi Conbini & Nhịp sống 24h', 'Convenience Store & 24h Life', 22, 2, '/assets/kanji/n4/illustrations/chap2_sub1_full.webp', '22 chữ Hán về thanh toán quầy thu ngân, thiết bị dịch vụ trong cửa hàng và mốc thời gian ngày đêm: 店, 客, 親, 切, 売, 当, 品, 便, 利, 使, 銀, 白, 黒, 紙, 朝, 晩, 昼, 夜, 前, 後, 午, 早.'),
(3, 'N4', 'おくり物', 'Quà tặng, Bưu phẩm & Địa chỉ hành chính', 'Gifts, Delivery & Addresses', 23, 3, '/assets/kanji/n4/illustrations/chap3_sub1_full.webp', '23 chữ Hán về dịch vụ chuyển phát nhanh bưu kiện, bì thư bưu điện và hệ thống tỉnh thành quận huyện: 荷, 送, 宅, 急, 速, 遅, 重, 軽, 住, 所, 様, 主, 番, 地, 号, 京, 都, 道, 府, 県, 市, 区, 村.'),
(4, 'N4', 'デート', 'Hẹn hò, Đời sống vợ chồng & Thời trang', 'Dating, Marriage & Fashion', 23, 4, '/assets/kanji/n4/illustrations/chap4_sub1_full.webp', '23 chữ Hán về lịch trình giải trí hẹn hò rạp phim, kỷ niệm hôn nhân và trang phục thời trang dạo phố: 毎, 週, 映, 画, 図, 館, 公, 園, 夫, 妻, 特, 思, 料, 理, 有, 洋, 服, 衣, 短, 毛, 糸, 玉, 光.'),
(5, 'N4', '町', 'Phố xá, Nhà ga & Y tế bệnh viện', 'Town, Railway Station & Healthcare', 24, 5, '/assets/kanji/n4/illustrations/chap5_sub1_full.webp', '24 chữ Hán về hệ thống giao thông đường sắt, ngã tư đèn tín hiệu và khám chữa bệnh tại bệnh viện: 駅, 鉄, 乗, 降, 開, 閉, 発, 着, 交, 通, 台, 止, 色, 赤, 黄, 青, 病, 院, 医, 科, 薬, 待, 合, 計.'),
(6, 'N4', '学生', 'Đời sống sinh viên & Ẩm thực đường phố', 'Student Life & Gourmet Dining', 22, 6, '/assets/kanji/n4/illustrations/chap6_sub1_full.webp', '22 chữ Hán về đề tài nghiên cứu đại học, giao lưu tiệc tùng sinh viên và thưởng thức tiệm mì Ramen: 研, 究, 語, 文, 英, 化, 数, 心, 若, 集, 知, 酒, 歌, 声, 楽, 味, 油, 太, 細, 皿, 飯, 麦.'),
(7, 'N4', '春夏秋冬', 'Bốn mùa, Dự báo thời tiết & Du ngoạn', 'Four Seasons, Weather & Travel', 23, 7, '/assets/kanji/n4/illustrations/chap7_sub1_full.webp', '23 chữ Hán về các mùa trong năm, hiện tượng thiên nhiên thời tiết mưa nắng tuyết bão và du lịch ngắm cảnh: 春, 夏, 秋, 冬, 空, 星, 雲, 去, 天, 晴, 雪, 風, 強, 弱, 暑, 寒, 旅, 持, 世, 界, 写, 真, 船.'),
(8, 'N4', '学校', 'Trường học, Thi cử & Xã hội học', 'School, Exams & Social Studies', 24, 8, '/assets/kanji/n4/illustrations/chap8_sub1_full.webp', '24 chữ Hán về học tập chữ Hán, câu hỏi bài tập, đề thi trắc nghiệm và kiến thức lịch sử chính trị kinh tế: 勉, 漢, 宿, 題, 質, 問, 教, 室, 試, 験, 答, 考, 正, 丸, 不, 同, 政, 治, 経, 済, 歴, 史, 国, 王.'),
(9, 'N4', '休みのひ', 'Ngày nghỉ dã ngoại & Khám phá làng quê', 'Holidays, Sports & Countryside', 24, 9, '/assets/kanji/n4/illustrations/chap9_sub1_full.webp', '24 chữ Hán về rèn luyện thể thao bơi lội, cảnh quan thiên nhiên hồ vịnh và động vật đời sống thôn dã: 運, 動, 練, 習, 走, 歩, 泳, 才, 自, 然, 草, 原, 湖, 谷, 海, 辺, 里, 野, 奥, 池, 虫, 羽, 鳴, 馬.')
ON CONFLICT (jlpt_level, chapter_number) DO UPDATE SET
    title_ja = EXCLUDED.title_ja,
    title_vi = EXCLUDED.title_vi,
    title_en = EXCLUDED.title_en,
    kanji_count = EXCLUDED.kanji_count,
    display_order = EXCLUDED.display_order,
    illustration_url = EXCLUDED.illustration_url,
    description = EXCLUDED.description;

-- 2. SEED 192 KANJIS LEVEL N4
DO $$
DECLARE
    v_ch1_id BIGINT; v_ch2_id BIGINT; v_ch3_id BIGINT;
    v_ch4_id BIGINT; v_ch5_id BIGINT; v_ch6_id BIGINT;
    v_ch7_id BIGINT; v_ch8_id BIGINT; v_ch9_id BIGINT;
BEGIN
    SELECT id INTO v_ch1_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 1;
    SELECT id INTO v_ch2_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 2;
    SELECT id INTO v_ch3_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 3;
    SELECT id INTO v_ch4_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 4;
    SELECT id INTO v_ch5_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 5;
    SELECT id INTO v_ch6_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 6;
    SELECT id INTO v_ch7_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 7;
    SELECT id INTO v_ch8_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 8;
    SELECT id INTO v_ch9_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 9;

    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('家', 'カ, ケ', 'いえ, や, うち', 'ie', 'GIA', 'Nhà ở, gia đình', 10, '宀 -> 豕', 'わたしの 家の ちかくに コンビニが あります。', 'Watashi no ie no chikaku ni konbini ga arimasu.', 'Gần nhà tôi có một cửa hàng tiện lợi.', 'N4', 'Mái nhà gia đình', 'Heo rừng sống dưới mái nhà che chở ấm cúng.', '🏠', v_ch1_id, 1, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('族', 'ゾク', '', 'zoku', 'TỘC', 'Gia tộc, bộ tộc, họ hàng', 11, '方 -> 矢', '山田さんは 何人 家族ですか。', 'Yamada-san wa nannin kazoku desu ka.', 'Gia đình anh Yamada có mấy người?', 'N4', 'Gia tộc mũi tên', 'Các thành viên trong tộc giương cờ và mũi tên đoàn kết.', '👨‍👩‍👧‍👦', v_ch1_id, 2, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('兄', 'ケイ, キョウ', 'あに', 'ani', 'HUYNH', 'Anh trai', 5, '口 -> 儿', 'あには アメリカに りゅう学しています。', 'Ani wa Amerika ni ryuugaku shiteimasu.', 'Anh trai tôi đang du học ở Mỹ.', 'N4', 'Anh cả trong nhà', 'Người anh trai miệng hô to điều hành việc nhà.', '👦', v_ch1_id, 3, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('弟', 'テイ, ダイ', 'おとうと', 'otouto', 'ĐỆ', 'Em trai', 7, '弓 -> 丨', 'おとうとは 今年 小学生に なりました。', 'Otouto wa kotoshi shougakusei ni narimashita.', 'Năm nay em trai tôi đã vào tiểu học.', 'N4', 'Cây cung em trai', 'Em trai buộc dải ruy băng vào cây cung đồ chơi.', '🧒', v_ch1_id, 4, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('姉', 'シ', 'あね', 'ane', 'TỶ', 'Chị gái', 8, '女 -> 市', '姉は けっこんして 名字が かわりました。', 'Ane wa kekkon shite myouji ga kawarimashita.', 'Chị gái kết hôn nên đã đổi họ.', 'N4', 'Chị gái đảm đang', 'Người phụ nữ đảm đang đi chợ thành thị mua đồ.', '👩', v_ch1_id, 5, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('妹', 'マイ', 'いもうと', 'imouto', 'MUỘI', 'Em gái', 8, '女 -> 未', '妹は おなかが すくと すぐ なきます。', 'Imouto wa onaka ga suku to sugu nakimasu.', 'Em gái hễ đói bụng là khóc ngay.', 'N4', 'Em gái nhỏ', 'Bé gái còn nhỏ chưa đến tuổi trưởng thành (Vị).', '👧', v_ch1_id, 6, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('私', 'シ', 'わたし, わたくし', 'watashi', 'TƯ', 'Tôi, bản thân, riêng tư', 7, '禾 -> 厶', '私は 家の にわで 花を 育てています。', 'Watashi wa ie no niwa de hana o sodateteimasu.', 'Tôi đang trồng hoa trong vườn nhà.', 'N4', 'Cây lúa của tôi', 'Cây lúa này thuộc về phần riêng của tôi.', '🙋‍♂️', v_ch1_id, 7, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('育', 'イク', 'そだ・つ, そだ・てる', 'soda', 'DỤC', 'Nuôi dạy, lớn lên, giáo dục', 8, '亠 -> 月', '山川さんは いなかで 育ちました。', 'Yamakawa-san wa inaka de sodachimashita.', 'Anh Yamakawa lớn lên ở vùng nông thôn.', 'N4', 'Nuôi nấng con cái', 'Đứa trẻ được đội nón nuôi dưỡng lớn khôn từng ngày.', '🌱', v_ch1_id, 8, '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('店', 'テン', 'みせ', 'mise', 'TIẾM', 'Cửa hàng, tiệm', 8, '广 -> 占', 'えきの まえに 新しい 店が できました。', 'Eki no mae ni atarashii mise ga dekimashita.', 'Trước ga tàu vừa mở một tiệm mới.', 'N4', 'Quán xá xem quẻ', 'Dưới mái hiên có tiệm bói xem chỉ tay.', '🏪', v_ch2_id, 1, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('客', 'キャク', '', 'kyaku', 'KHÁCH', 'Khách hàng, khách trọ', 9, '宀 -> 各', 'あのレストランは いつも お客さんが たくさんいます。', 'Ano resutoran wa itsumo okyaku-san ga takusan imasu.', 'Nhà hàng đó lúc nào cũng rất đông khách.', 'N4', 'Khách đến nhà', 'Mỗi vị khách bước vào dưới mái hiên nhà.', '👥', v_ch2_id, 2, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('親', 'シン', 'おや, した・しい', 'oya', 'THÂN', 'Cha mẹ, thân thiết', 16, '立 -> 木 -> 見', '一番 親しい 友だちが ひっこしてしまいました。', 'Ichiban shitashii tomodachi ga hikkoshite shimaimashita.', 'Người bạn thân nhất của tôi đã chuyển nhà đi rồi.', 'N4', 'Cha mẹ dõi theo', 'Cha mẹ đứng trên cây dõi mắt ngóng trông con về.', '👨‍👦', v_ch2_id, 3, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('切', 'セツ, サイ', 'き・る', 'ki', 'THIẾT', 'Cắt tỉa, khẩn thiết', 4, '七 -> 刀', '包丁で やさいを 切ります。', 'Houchou de yasai o kirimasu.', 'Dùng dao thái rau củ.', 'N4', 'Dùng dao cắt', 'Dùng cây dao sắc bén cắt đứt làm 7 phần.', '🔪', v_ch2_id, 4, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('売', 'バイ', 'う・る', 'u', 'MẠI', 'Bán, bán hàng', 7, '十 -> 冖 -> 儿', '新しい CDが 百万まい 売れました。', 'Atarashii CD ga hyakumanmai uremashita.', 'Đĩa CD mới đã bán được một triệu bản.', 'N4', 'Bán đồ thương mại', 'Đem sản phẩm bày bán cho mọi người đi đường.', '🏷️', v_ch2_id, 5, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('当', 'トウ', 'あ・たる', 'a', 'ĐƯƠNG', 'Trúng, đúng, đương thời', 6, '⺌ -> 彐', 'たからくじが 当たったら 何を したいですか。', 'Takarakuji ga atattara nani o shitai desu ka.', 'Nếu trúng vé số bạn muốn làm gì?', 'N4', 'Trúng đích ngay', 'Ba mũi tên cùng hướng trúng ngay vào tâm bia.', '🎯', v_ch2_id, 6, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('品', 'ヒン', 'しな', 'shina', 'PHẨM', 'Sản phẩm, phẩm cách', 9, '口 x 3', 'このスーパーは 品数が 多くて 有名です。', 'Kono suupaa wa shinakazu ga ookute yuumei desu.', 'Siêu thị này nổi tiếng vì chủng loại hàng hóa phong phú.', 'N4', 'Ba hộp sản phẩm', 'Ba chiếc hộp xếp cạnh nhau thành đống hàng phẩm chất tốt.', '📦', v_ch2_id, 7, '/assets/kanji/n4/illustrations/chap2_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('便', 'ベン, ビン', 'たよ・り', 'ben', 'TIỆN', 'Tiện lợi, bưu phẩm', 9, '亻 -> 更', 'コンビニは とても 便利です。', 'Konbini wa totemo benri desu.', 'Cửa hàng tiện lợi vô cùng thuận tiện.', 'N4', 'Tiện lợi cho người', 'Thay đổi cách làm để mang lại sự tiện lợi cho con người.', '📬', v_ch2_id, 8, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('利', 'リ', 'き・く', 'ri', 'LỢI', 'Lợi ích, thuận lợi', 7, '禾 -> 刂', 'パソコンを 利用して 勉強します。', 'Pasokon o riyou shite benkyou shimasu.', 'Sử dụng máy tính để học tập.', 'N4', 'Cắt lúa có lợi', 'Lưỡi dao cắt lúa mang lại mối lợi lộc vụ mùa.', '✨', v_ch2_id, 9, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('使', 'シ', 'つか・う', 'tsuka', 'SỬ', 'Sử dụng, sứ giả', 8, '亻 -> 吏', '銀行の ATMを 使います。', 'Ginkou no ATM o tsukaimasu.', 'Tôi dùng cây ATM của ngân hàng.', 'N4', 'Sứ giả thi hành', 'Người nhận lệnh của quan lại đi thi hành công việc.', '🛠️', v_ch2_id, 10, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('銀', 'ギン', 'しろがね', 'gin', 'NGÂN', 'Bạc, ngân hàng', 14, '金 -> 艮', '駅前に 銀行が あります。', 'Ekimae ni ginkou ga arimasu.', 'Trước ga tàu có một ngân hàng.', 'N4', 'Kim loại bạc sáng', 'Thứ kim loại quý giá chỉ đứng sau vàng.', '🏦', v_ch2_id, 11, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('白', 'ハク, ビャク', 'しろ, しろ・い', 'shiro', 'BẠCH', 'Màu trắng, sáng', 5, '丿 -> 日', '白い シャツを 買いました。', 'Shiroi shatsu o kaimashita.', 'Tôi đã mua một chiếc áo sơ mi trắng.', 'N4', 'Hạt gạo trắng phau', 'Mặt trời chiếu sáng rạng ngời một màu trắng tinh khiết.', '⚪', v_ch2_id, 12, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('黒', 'コク', 'くろ, くろ・い', 'kuro', 'HẮC', 'Màu đen, tối', 11, '里 -> 灬', '黒い ペンで 書いてください。', 'Kuroi pen de kaite kudasai.', 'Xin hãy viết bằng bút màu đen.', 'N4', 'Đống lửa đen ngòm', 'Mảnh đất bị đốt lửa hóa thành màu than đen.', '⚫', v_ch2_id, 13, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('紙', 'シ', 'かみ', 'kami', 'CHỈ', 'Giấy', 10, '糸 -> 氏', '手紙を 書いて 送ります。', 'Tegami o kaite okurimasu.', 'Tôi viết thư và gửi đi.', 'N4', 'Sợi tơ thành giấy', 'Các sợi tơ ép chặt phẳng lì tạo thành tờ giấy viết.', '📄', v_ch2_id, 14, '/assets/kanji/n4/illustrations/chap2_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('朝', 'チョウ', 'あさ', 'asa', 'TRIÊU', 'Buổi sáng', 12, '十 -> 日 -> 十 -> 月', '朝食は いつも パンと コーヒーです。', 'Choushoku wa itsumo pan to koohii desu.', 'Bữa sáng tôi luôn ăn bánh mì và cà phê.', 'N4', 'Bình minh buổi sáng', 'Mười ánh dương le lói mọc lên khi mặt trăng vừa lặn.', '🌅', v_ch2_id, 15, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('晩', 'バン', '', 'ban', 'VÃN', 'Buổi tối, hoàng hôn', 12, '日 -> 免', '今晩 9時から ドラマを 見ます。', 'Konban kuji kara dorama o mimasu.', 'Tối nay từ 9 giờ tôi sẽ xem phim truyền hình.', 'N4', 'Mặt trời lặn xế bóng', 'Mặt trời miễn nhiệm nhiệm vụ khi hoàng hôn buông xuống.', '🌃', v_ch2_id, 16, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('昼', 'チュウ', 'ひる', 'hiru', 'TRÚ', 'Buổi trưa, ban ngày', 9, '尺 -> 日', '昼食は ラーメンを 食べました。', 'Chuushoku wa raamen o tabemashita.', 'Bữa trưa tôi đã ăn mì ramen.', 'N4', 'Mặt trời chính ngọ', 'Vầng thái dương đứng bóng giữa ban trưa rực rỡ.', '☀️', v_ch2_id, 17, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('夜', 'ヤ', 'よ, よる', 'yoru', 'DẠ', 'Đêm, tối trời', 8, '亠 -> 夕', 'いつも 夜 10時に ねます。', 'Itsumo yoru juuji ni nemasu.', 'Tôi thường đi ngủ lúc 10 giờ đêm.', 'N4', 'Màn đêm che phủ', 'Dưới mái nhà khi trăng non hé lộ là đêm tối.', '🌙', v_ch2_id, 18, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('前', 'ゼン', 'まえ', 'mae', 'TIỀN', 'Phía trước, trước đây', 9, '䒑 -> 月 -> 刂', 'レジの 前に ならんでください。', 'Reji no mae ni narande kudasai.', 'Xin hãy xếp hàng phía trước quầy thu ngân.', 'N4', 'Tiến bước lên trước', 'Mang theo trăng và dao bước lên tuyến trước.', '⏩', v_ch2_id, 19, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('後', 'ゴ, コウ', 'のち, うし・ろ, あと', 'ushiro', 'HẬU', 'Phía sau, sau này', 9, '彳 -> 幺 -> 夂', 'アルバイトの 後 いっしょに 食事しましょう。', 'Arubaito no ato isshoni shokuji shimashou.', 'Sau khi làm thêm xong tụi mình cùng đi ăn nhé.', 'N4', 'Người đi sau cùng', 'Bước từng bước chậm chạp phía sau hàng ngũ.', '🔙', v_ch2_id, 20, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('午', 'ゴ', '', 'go', 'NGỌ', 'Giữa trưa, giờ ngọ', 4, '丿 -> 十', '午前 9時から 始まります。', 'Gozen kuji kara hajimarimasu.', 'Bắt đầu từ 9 giờ sáng.', 'N4', 'Cái chày giã ngọ', 'Kim đồng hồ chỉ thẳng đứng vào đúng 12 giờ trưa.', '🕛', v_ch2_id, 21, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('早', 'ソウ', 'はや・い', 'haya', 'TẢO', 'Sớm, nhanh chóng', 6, '日 -> 十', '今朝 5時に おきて ジョギングを しました。', 'Kesa goji ni okite jogingu o shimashita.', 'Sáng nay tôi thức dậy sớm lúc 5 giờ chạy bộ.', 'N4', 'Mặt trời lên sớm', 'Mười ánh sáng mặt trời vừa ló rạng vào sáng sớm.', '⏰', v_ch2_id, 22, '/assets/kanji/n4/illustrations/chap2_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('荷', 'カ', 'に', 'ni', 'HÀ', 'Hành lý, bưu kiện', 10, '艹 -> 何', '重い 荷物を 持って 歩きます。', 'Omoi nimotsu o motte arukimasu.', 'Xách hành lý nặng đi bộ.', 'N4', 'Cỏ phủ kiện hàng', 'Bó cỏ chở hàng hóa gì đó trên vai.', '🧳', v_ch3_id, 1, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('送', 'ソウ', 'おく・る', 'oku', 'TỐNG', 'Gửi đi, đưa tiễn', 9, '关 -> 辶', '荷物を 国へ 送りました。', 'Nimotsu o kuni e okurimashita.', 'Tôi đã gửi hành lý về nước.', 'N4', 'Đưa tiễn lên đường', 'Hai người cùng bước đi trên con đường đưa tiễn nhau.', '📤', v_ch3_id, 2, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宅', 'タク', '', 'taku', 'TRẠCH', 'Nhà riêng, chỗ ở', 6, '宀 -> 乇', '宅急便で 荷物が とどきました。', 'Takkyuubin de nimotsu ga todokimashita.', 'Bưu phẩm chuyển phát nhanh đã giao tới tận nhà.', 'N4', 'Nơi an cư lạc nghiệp', 'Mái nhà bình yên che chở cây mầm sinh sống.', '🏡', v_ch3_id, 3, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('急', 'キュウ', 'いそ・ぐ', 'iso', 'CẤP', 'Vội vã, khẩn cấp', 9, '⺈ -> 彐 -> 心', '急な ようじが できました。', 'Kyuu na youji ga dekimashita.', 'Tôi có việc đột xuất khẩn cấp.', 'N4', 'Trái tim hồi hộp', 'Trái tim đập thình thịch vội vã chạy cho kịp giờ.', '⚡', v_ch3_id, 4, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('速', 'ソク', 'はや・い', 'haya', 'TỐC', 'Nhanh, tốc độ', 10, '束 -> 辶', '速達で 書類を 出しました。', 'Sokutatsu de shorui o dashimashita.', 'Tôi gửi giấy tờ bằng thư chuyển phát nhanh hỏa tốc.', 'N4', 'Buộc bó chạy nhanh', 'Buộc gọn đồ đạc bước đi với tốc độ cao.', '🚀', v_ch3_id, 5, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('遅', 'チ', 'おく・れる, おそ・い', 'oso', 'TRÌ', 'Muộn màng, chậm trễ', 12, '尸 -> 羊 -> 辶', '電車が 10分 遅れました。', 'Densha ga juppun okuremashita.', 'Xe điện bị trễ 10 phút.', 'N4', 'Dắt cừu đi chậm', 'Dắt con cừu bước đi thong dong chậm chạp.', '🐢', v_ch3_id, 6, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('重', 'ジュウ, チョウ', 'おも・い, かさ・ねる', 'omo', 'TRỌNG', 'Nặng, quan trọng', 9, '丿 -> 里', 'この箱は とても 重いです。', 'Kono hako wa totemo omoi desu.', 'Chiếc thùng này rất nặng.', 'N4', 'Gánh nặng dặm xa', 'Gánh đồ đạc nặng đi qua một ngàn dặm đường làng.', '🏋️', v_ch3_id, 7, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('軽', 'ケイ', 'かる・い', 'karu', 'KHINH', 'Nhẹ, nhẹ nhàng', 12, '車 -> 𢀖', 'このカバンは 軽くて 持ちやすいです。', 'Kono kaban wa karukute mochiyasui desu.', 'Chiếc cặp này nhẹ và dễ cầm.', 'N4', 'Cỗ xe nhẹ tênh', 'Chiếc xe làm bằng sợi chỉ tơ nhẹ nhàng lướt nhanh.', '🪶', v_ch3_id, 8, '/assets/kanji/n4/illustrations/chap3_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('住', 'ジュウ', 'す・む', 'su', 'TRÚ', 'Sinh sống, cư trú', 7, '亻 -> 主', '東京の アパートに 住んでいます。', 'Toukyou no apaato ni sundeimasu.', 'Tôi đang sinh sống ở một căn hộ tại Tokyo.', 'N4', 'Người làm chủ nhà', 'Người làm chủ sinh sống định cư tại ngôi nhà.', '🏘️', v_ch3_id, 9, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('所', 'ショ', 'ところ', 'tokoro', 'SỞ', 'Nơi chốn, địa điểm', 8, '戸 -> 斤', '静かな 所へ 行きたいです。', 'Shizuka na tokoro e ikitai desu.', 'Tôi muốn đi đến một nơi yên tĩnh.', 'N4', 'Nơi mở cánh cửa', 'Dùng búa mở cánh cửa bước vào một nơi chốn mới.', '📍', v_ch3_id, 10, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('様', 'ヨウ', 'さま', 'sama', 'DẠNG', 'Ngài, quý ông/bà, hình dạng', 14, '木 -> 羊 -> 氺', '田中様から お電話が ありました。', 'Tanaka-sama kara odenwa ga arimashita.', 'Có cuộc gọi điện thoại từ ngài Tanaka.', 'N4', 'Kính cẩn xưng danh', 'Cây cối bên dòng suối tươi đẹp như quý ngài đức độ.', '👑', v_ch3_id, 11, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('主', 'シュ, ス', 'おも, ぬし', 'nushi', 'CHỦ', 'Chủ nhân, chủ yếu', 5, '丶 -> 王', 'アパートの 大家さんが 親切です。', 'Apaato no ooyasan ga shinsetsu desu.', 'Bác chủ nhà trọ rất thân thiện.', 'N4', 'Vị vua cầm đuốc', 'Đốm lửa trên đầu người đứng đầu làm chủ tất cả.', '🗝️', v_ch3_id, 12, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('番', 'バン', '', 'ban', 'PHIÊN', 'Số thứ tự, phiên trực', 12, '釆 -> 田', '電話番号を 教えてください。', 'Denwa bangou o oshiete kudasai.', 'Xin hãy cho tôi biết số điện thoại của bạn.', 'N4', 'Canh tác luân phiên', 'Đánh số thứ tự từng ô ruộng để luân phiên chăm bón.', '🔢', v_ch3_id, 13, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('地', 'チ, ジ', '', 'chi', 'ĐỊA', 'Đất đai, địa chỉ', 6, '土 -> 也', 'この 土地に 家を たてます。', 'Kono tochi ni ie o tatemasu.', 'Tôi xây nhà trên mảnh đất này.', 'N4', 'Mặt đất màu mỡ', 'Đất đai trải dài màu mỡ nâng đỡ vạn vật.', '🗺️', v_ch3_id, 14, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('号', 'ゴウ', '', 'gou', 'HIỆU', 'Số hiệu, phòng số', 5, '口 -> 丂', '101号室に すんでいます。', 'Ichi-maru-ichi goushitsu ni sundeimasu.', 'Tôi sống ở phòng số 101.', 'N4', 'Khẩu lệnh số hiệu', 'Miệng hô to số hiệu phòng trên bảng tên.', '🚪', v_ch3_id, 15, '/assets/kanji/n4/illustrations/chap3_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('京', 'キョウ, ケイ', '', 'kyou', 'KINH', 'Kinh đô, thủ đô', 8, '亠 -> 口 -> 小', '京都へ りょこうに 行きます。', 'Kyouto e ryokou ni ikimasu.', 'Tôi đi du lịch đến cố đô Kyoto.', 'N4', 'Cổng thành kinh đô', 'Tòa thành cao lớn nguy nga nơi kinh thành thủ phủ.', '🏯', v_ch3_id, 16, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('都', 'ト, ツ', 'みやこ', 'to', 'ĐÔ', 'Đô thị, thủ đô', 11, '者 -> 阝', '東京都には 23の 区が あります。', 'Toukyou-to ni wa nijuusan no ku ga arimasu.', 'Thủ đô Tokyo có 23 quận nội thành.', 'N4', 'Vùng đất kinh kỳ', 'Nơi đông đảo người dân tụ họp sinh sống phồn hoa.', '🏙️', v_ch3_id, 17, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('道', 'ドウ', 'みち', 'michi', 'ĐẠO', 'Con đường, đạo lý', 12, '首 -> 辶', 'この 道を まっすぐ 行ってください。', 'Kono michi o massugu itte kudasai.', 'Xin hãy đi thẳng theo con đường này.', 'N4', 'Dẫn đường tiến bước', 'Người thủ lĩnh dẫn đầu tiến bước trên con đường chân lý.', '🛣️', v_ch3_id, 18, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('府', 'フ', '', 'fu', 'PHỦ', 'Phủ (Osaka, Kyoto)', 8, '广 -> 付', '府が つく所は 大阪と 京都の ふたつです。', 'Fu ga tsuku tokoro wa Oosaka to Kyouto no futatsu desu.', 'Nơi mang danh Phủ tại Nhật có hai nơi là Osaka và Kyoto.', 'N4', 'Phủ quan lưu trữ', 'Kho tàng dưới mái hiên nhà quan lưu trữ hồ sơ bưu cục.', '🏛️', v_ch3_id, 19, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('県', 'ケン', '', 'ken', 'HUYỆN', 'Tỉnh (ở Nhật Bản)', 9, '目 -> 幺', 'あなたは 何県の 出しんですか。', 'Anata wa nanken no shusshin desu ka.', 'Bạn đến từ tỉnh nào của Nhật Bản?', 'N4', 'Cửa sổ quan sát tỉnh', 'Mắt dõi nhìn quản lý hành chính các vùng đất.', '🗾', v_ch3_id, 20, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('市', 'シ', 'いち', 'shi', 'THỊ', 'Thành phố, chợ', 5, '亠 -> 巾', '市役所で じゅうしょを へんこうします。', 'Shiyakusho de juusho o henkou shimasu.', 'Tôi đổi địa chỉ tại Tòa thị chính thành phố.', 'N4', 'Chợ búa phố xá', 'Tấm vải treo trước cửa chợ phiên buôn bán sầm uất.', '🏬', v_ch3_id, 21, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('区', 'ク', '', 'ku', 'KHU', 'Quận, khu vực', 4, '匚 -> 乂', '区内の 学校に 通っています。', 'Kunai no gakkou ni kayotteimasu.', 'Tôi đang theo học một trường trong quận.', 'N4', 'Khu vực ngăn nắp', 'Chiếc hộp có vách ngăn phân chia từng khu vực.', '🔲', v_ch3_id, 22, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('村', 'ソン', 'むら', 'mura', 'THÔN', 'Làng xóm, thôn dã', 7, '木 -> 寸', '私の むらには コンビニが ありません。', 'Watashi no mura ni wa konbini ga arimasen.', 'Ngôi làng quê của tôi không có cửa hàng tiện lợi nào.', 'N4', 'Làng quê rợp bóng cây', 'Những hàng cây trải dài từng tấc đất làng quê thanh bình.', '🏡', v_ch3_id, 23, '/assets/kanji/n4/illustrations/chap3_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('毎', 'マイ', '', 'mai', 'MỖI', 'Mỗi, hàng ngày', 6, '丿 -> 母', '毎週 日曜日に 映画を 見ます。', 'Maishuu nichiyoubi ni eiga o mimasu.', 'Mỗi tuần vào Chủ nhật tôi đều xem phim.', 'N4', 'Tình mẹ mỗi ngày', 'Mỗi ngày mẹ đều chăm sóc bảo bọc con ân cần.', '🗓️', v_ch4_id, 1, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('週', 'シュウ', '', 'shuu', 'CHU', 'Tuần lễ, chu kỳ', 11, '周 -> 辶', '来週の 月曜日に テストが あります。', 'Raishuu no getsuyoubi ni tesuto ga arimasu.', 'Thứ hai tuần sau sẽ có bài kiểm tra.', 'N4', 'Vòng tròn một tuần', 'Bước đi trọn vẹn một vòng tròn chu kỳ 7 ngày.', '📆', v_ch4_id, 2, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('映', 'エイ', 'うつ・る', 'utsu', 'ÁNH', 'Phản chiếu, chiếu phim', 9, '日 -> 央', '映画館で デートを しました。', 'Eigakan de deeto o shimashita.', 'Tôi đã đi hẹn hò ở rạp chiếu phim.', 'N4', 'Mặt trời chiếu rọi', 'Mặt trời chiếu rọi ngay chính giữa trung tâm màn ảnh.', '🎬', v_ch4_id, 3, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('画', 'ガ, カク', '', 'ga', 'HỌA', 'Bức tranh, kế hoạch', 8, '一 -> 由 -> 凵', 'すてきな 絵画を 見ました。', 'Suteki na kaiga o mimashita.', 'Tôi đã ngắm một bức họa rất tuyệt.', 'N4', 'Khung tranh vẽ', 'Bàn tay cầm cọ vẽ nên bức tranh rực rỡ trong khung hình.', '🖼️', v_ch4_id, 4, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('図', 'ズ, ト', 'はか・る', 'zu', 'ĐỒ', 'Bản đồ, sơ đồ', 7, '囗 -> 乂', '図書館で 本を かりて 読みました。', 'Toshokan de hon o karite yomimashita.', 'Tôi mượn sách ở thư viện về đọc.', 'N4', 'Bản vẽ trong khung', 'Bản vẽ địa đồ được đóng khung chữ nhật cẩn thận.', '📐', v_ch4_id, 5, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('館', 'カン', 'やかた', 'kan', 'QUÁN', 'Tòa nhà, hội quán', 16, '食 -> 官', '映画館の まえで 待ち合わせを します。', 'Eigakan no mae de machiawase o shimasu.', 'Tôi hẹn gặp nhau phía trước rạp chiếu phim.', 'N4', 'Nhà ăn quan lại', 'Tòa nhà bề thế nơi các quan khách ăn uống hội họp.', '🏛️', v_ch4_id, 6, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('公', 'コウ', 'おおやけ', 'kou', 'CÔNG', 'Công cộng, công chúng', 4, '八 -> 厶', '天気が いいので 公園を さんぽします。', 'Tenki ga ii node kouen o sanpo shimasu.', 'Trời đẹp nên tôi đi dạo ở công viên.', 'N4', 'Chia sẻ của công', 'Mở rộng chia đều cho mọi người trong cộng đồng.', '🌳', v_ch4_id, 7, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('園', 'エン', 'その', 'en', 'VIÊN', 'Vườn tược, hoa viên', 13, '囗 -> 袁', '動物園に パンダを 見に 行きました。', 'Doubutsuen ni panda o mi ni ikimashita.', 'Tôi đến sở thú xem gấu trúc.', 'N4', 'Khu vườn có tường rào', 'Khu vườn xanh mát được bao bọc bởi tường rào hoa viên.', '🌷', v_ch4_id, 8, '/assets/kanji/n4/illustrations/chap4_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('夫', 'フ, フウ', 'おっと', 'otto', 'PHU', 'Chồng, đàn ông trưởng thành', 4, '一 -> 大', '夫は 料理が とても 上手です。', 'Otto wa ryouri ga totemo jouzu desu.', 'Chồng tôi nấu ăn rất ngon.', 'N4', 'Người đàn ông đội trâm', 'Người đàn ông trưởng thành cài chiếc trâm trên đầu.', '🤵', v_ch4_id, 9, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('妻', 'サイ', 'つま', 'tsuma', 'THÊ', 'Vợ', 8, '一 -> 彐 -> 女', '妻に 花束を プレゼントしました。', 'Tsuma ni hanataba o purezento shimashita.', 'Tôi tặng vợ một bó hoa tươi.', 'N4', 'Bàn tay chăm sóc của vợ', 'Bàn tay người phụ nữ chăm lo thu vén gia đình.', '👰', v_ch4_id, 10, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('特', 'トク', '', 'toku', 'ĐẶC', 'Đặc biệt', 10, '牛 -> 寺', 'けっこんきねん日は 特別な 日です。', 'Kekkonkinembi wa tokubetsu na hi desu.', 'Ngày kỷ niệm ngày cưới là một ngày đặc biệt.', 'N4', 'Con trâu ở chùa', 'Con trâu đặc biệt được nuôi dưỡng tại ngôi chùa cổ.', '⭐', v_ch4_id, 11, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('思', 'シ', 'おも・う', 'omo', 'TƯ', 'Suy nghĩ, tưởng nhớ', 9, '田 -> 心', '友だちの ことを 思っています。', 'Tomodachi no koto o omotteimasu.', 'Tôi đang nghĩ về người bạn của mình.', 'N4', 'Trái tim hướng về đồng quê', 'Tâm trí và tấm lòng luôn hướng về cánh đồng quê hương.', '💭', v_ch4_id, 12, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('料', 'リョウ', '', 'ryou', 'LIỆU', 'Nguyên liệu, tài liệu, chi phí', 10, '米 -> 斗', '給料日なので レストランへ 行きます。', 'Kyuuryoubi nanode resutoran e ikimasu.', 'Vì là ngày nhận lương nên tôi đi nhà hàng ăn.', 'N4', 'Đo lường gạo ăn', 'Dùng cái đấu đo lường số gạo làm nguyên liệu nấu ăn.', '🍚', v_ch4_id, 13, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('理', 'リ', '', 'ri', 'LÝ', 'Lý lẽ, đạo lý, quản lý', 11, '王 -> 里', '日本料理が 大好きです。', 'Nihon ryouri ga daisuki desu.', 'Tôi rất thích món ăn Nhật Bản.', 'N4', 'Vua đo đạc đất đai', 'Vị vua xem xét các đường vân ngọc ngà và đạo lý bờ cõi.', '🥢', v_ch4_id, 14, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('有', 'ユウ', 'あ・る', 'yuu', 'HỮU', 'Có, sở hữu, danh tiếng', 6, '𠂇 -> 月', '有名な レストランを よやくしました。', 'Yuumei na resutoran o yoyaku shimashita.', 'Tôi đã đặt bàn ở một nhà hàng nổi tiếng.', 'N4', 'Bàn tay nắm thịt', 'Bàn tay nắm lấy miếng thịt tươi tượng trưng cho sự sở hữu.', '✨', v_ch4_id, 15, '/assets/kanji/n4/illustrations/chap4_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('洋', 'ヨウ', '', 'you', 'DƯƠNG', 'Đại dương, phương Tây', 9, '氵 -> 羊', 'デパートで 洋服を 買いました。', 'Depaato de youfuku o kaimashita.', 'Tôi mua âu phục ở trung tâm thương mại.', 'N4', 'Dê trên sóng nước', 'Con dê vượt biển đại dương mang văn hóa phương Tây đến.', '🌊', v_ch4_id, 16, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('服', 'フク', '', 'fuku', 'PHỤC', 'Trang phục, quần áo', 8, '月 -> 卩 -> 又', 'あたたかい 服を 着てください。', 'Atatakai fuku o kite kudasai.', 'Hãy mặc quần áo ấm vào nhé.', 'N4', 'Y phục che chở cơ thể', 'Tấm áo may vừa vặn ôm lấy thân thể con người.', '👗', v_ch4_id, 17, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('衣', 'イ', 'ころも', 'i', 'Y', 'Áo, y phục', 6, '亠 -> 𧘇', '衣服の 整理を しました。', 'Ifuku no seiri o shimashita.', 'Tôi đã dọn dẹp sắp xếp lại quần áo.', 'N4', 'Chiếc áo cổ trang', 'Hình dáng chiếc áo choàng có tay vạt rộng.', '🧥', v_ch4_id, 18, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('短', 'タン', 'みじか・い', 'mijika', 'ĐOẢN', 'Ngắn, ngắn ngủi', 12, '矢 -> 豆', '夏は 夜が 短いです。', 'Natsu wa yoru ga mijikai desu.', 'Mùa hè đêm thường rất ngắn.', 'N4', 'Mũi tên ngắn cạnh hạt đậu', 'Mũi tên ngắn đo độ dài so với đĩa đậu nhỏ.', '📏', v_ch4_id, 19, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('毛', 'モウ', 'け', 'ke', 'MAO', 'Lông, sợi len', 4, '丿 -> 一 -> 乚', '毛糸の セーターを 編みました。', 'Keito no seetaa o amimashita.', 'Tôi đã đan một chiếc áo len bằng sợi lông cừu.', 'N4', 'Sợi lông mềm mại', 'Hình dáng sợi lông thú uốn cong nhẹ nhàng.', '🧶', v_ch4_id, 20, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('糸', 'シ', 'いと', 'ito', 'MỊCH', 'Sợi chỉ, sợi tơ', 6, '幺 -> 小', '針に 糸を 通します。', 'Hari ni ito o tooshimasu.', 'Xâu sợi chỉ luồn qua lỗ kim.', 'N4', 'Cuộn tơ tằm', 'Từng sợi tơ mềm mại cuộn tròn thành cuộn chỉ dệt.', '🧵', v_ch4_id, 21, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('玉', 'ギョク', 'たま', 'tama', 'NGỌC', 'Hạt ngọc, viên tròn', 5, '王 -> 丶', 'ガラスの 水玉が きれいです。', 'Garasu no mizutama ga kirei desu.', 'Hạt nước thủy tinh tròn xoe lấp lánh tuyệt đẹp.', 'N4', 'Viên ngọc quý', 'Chữ Vương có thêm dấu chấm ngọc bội quý giá.', '🔮', v_ch4_id, 22, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('光', 'コウ', 'ひか・る, ひかり', 'hikari', 'QUANG', 'Ánh sáng, chiếu sáng', 6, '⺌ -> 兀', '太陽の 光が まぶしいです。', 'Taiyou no hikari ga mabushii desu.', 'Ánh sáng mặt trời chói lòa.', 'N4', 'Ngọn lửa tỏa sáng', 'Người nâng ngọn lửa trên đầu tỏa ánh hào quang rực rỡ.', '💡', v_ch4_id, 23, '/assets/kanji/n4/illustrations/chap4_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('駅', 'エキ', '', 'eki', 'DỊCH', 'Nhà ga tàu', 14, '馬 -> 尺', '駅の 改札口で 待ちます。', 'Eki no kaisatsuguchi de machimasu.', 'Tôi chờ ở cửa soát vé nhà ga.', 'N4', 'Trạm ngựa đổi ngựa', 'Trạm dừng chân nơi ngựa đón đưa hành khách đi lại.', '🚉', v_ch5_id, 1, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鉄', 'テツ', 'くろがね', 'tetsu', 'THIẾT', 'Sắt, đường sắt', 13, '金 -> 失', '地下鉄に 乗って 行きます。', 'Chikatetsu ni notte ikimasu.', 'Tôi đi bằng tàu điện ngầm.', 'N4', 'Kim loại sắt thép', 'Kim loại bền chắc không bao giờ mất đi giá trị.', '🛤️', v_ch5_id, 2, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('乗', 'ジョウ', 'の・る', 'no', 'THỪA', 'Lên xe, cưỡi', 9, '禾 -> 冖', '電車に 乗って 通勤します。', 'Densha ni notte tsuukin shimasu.', 'Tôi lên tàu điện đi làm mỗi ngày.', 'N4', 'Leo lên cỗ xe', 'Người đứng vững bước chân lên cỗ xe khởi hành.', '🚃', v_ch5_id, 3, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('降', 'コウ', 'お・りる, ふ・る', 'o', 'GIÁNG, HÀNG', 'Xuống xe, rơi xuống (mưa/tuyết)', 10, '阝 -> 夂', '次の 駅で 電車を 降ります。', 'Tsugi no eki de densha o orimasu.', 'Tôi sẽ xuống tàu ở ga tiếp theo.', 'N4', 'Bước chân xuống dốc', 'Bước chân men theo sườn đồi đi xuống bình nguyên.', '⬇️', v_ch5_id, 4, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('開', 'カイ', 'ひら・く, あ・く', 'hira', 'KHAI', 'Mở ra, khai mạc', 12, '門 -> 开', 'ドアが 開きます。', 'Doa ga akimasu.', 'Cửa xe tự động mở ra.', 'N4', 'Mở hai cánh cửa', 'Đôi tay đẩy then cài mở toang hai cánh cổng chào đón.', '🚪', v_ch5_id, 5, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('閉', 'ヘイ', 'と・じる, し・める', 'to', 'BẾ', 'Đóng lại, bế mạc', 11, '門 -> 才', 'ドアが 閉まります、ご注意ください。', 'Doa ga shimarimasu, gochuui kudasai.', 'Cửa đang đóng, xin quý khách chú ý.', 'N4', 'Đóng chặt then cửa', 'Cài then khóa then cổng thành bế quan kín mít.', '🔒', v_ch5_id, 6, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('発', 'ハツ, ホツ', '', 'hatsu', 'PHÁT', 'Xuất phát, phát triển', 9, '癶 -> 弓 -> 殳', '電車は 9時に 出発します。', 'Densha wa kuji ni shuppatsu shimasu.', 'Đoàn tàu sẽ xuất phát lúc 9 giờ.', 'N4', 'Bắn tên xuất phát', 'Bàn chân giẫm vững giương cung bắn phát súng lệnh.', '🚩', v_ch5_id, 7, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('着', 'チャク', 'つ・く, き・る', 'tsu', 'TRƯỚC', 'Đến nơi, mặc quần áo', 12, '羊 -> 目', '午後 2時に 東京に 到着しました。', 'Gogo niji ni Toukyou ni touchaku shimashita.', 'Tôi đã đến Tokyo lúc 2 giờ chiều.', 'N4', 'Áo len cừu đến nơi', 'Con cừu nhìn rõ điểm mốc và đặt chân đến nơi.', '🏁', v_ch5_id, 8, '/assets/kanji/n4/illustrations/chap5_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('交', 'コウ', 'まじ・わる', 'maji', 'GIAO', 'Giao nhau, giao thông, trao đổi', 6, '亠 -> 父', '大きな 交差点で 止まります。', 'Ookina kousaten de tomarimasu.', 'Tôi dừng lại ở ngã tư đường lớn.', 'N4', 'Chân bắt chéo giao nhau', 'Đôi chân bước vắt chéo qua nhau tạo thành giao lộ.', '🚦', v_ch5_id, 9, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('通', 'ツウ', 'とお・る, かよ・う', 'too', 'THÔNG', 'Đi qua, thông suốt, đi học/làm', 10, '甬 -> 辶', 'この 道を 通って 学校へ 行きます。', 'Kono michi o tootte gakkou e ikimasu.', 'Tôi đi qua con đường này để đến trường.', 'N4', 'Thông suốt con đường', 'Bước đi thông thoáng qua chiếc chuông cổng ngõ.', '🚶‍♂️', v_ch5_id, 10, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('台', 'ダイ, タイ', '', 'dai', 'ĐÀI', 'Cái bệ, máy móc (đơn vị xe cộ)', 5, '厶 -> 口', '車が 二台 とまっています。', 'Kuruma ga nidai tomatteimasu.', 'Có hai chiếc ô tô đang dừng đỗ.', 'N4', 'Cái bệ đặt đồ', 'Cái bệ cao vững chắc nâng đỡ vật dụng bên trên.', '🚗', v_ch5_id, 11, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('止', 'シ', 'と・まる, と・める', 'to', 'CHỈ', 'Dừng lại, đình chỉ', 4, '止', '赤信号で 車を 止めます。', 'Akashingou de kuruma o tomemasu.', 'Dừng xe khi gặp đèn đỏ.', 'N4', 'Bàn chân đứng yên', 'Bàn chân chạm đất ngừng hẳn lại không bước tiếp.', '🛑', v_ch5_id, 12, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('色', 'ショク, シキ', 'いろ', 'iro', 'SẮC', 'Màu sắc, sắc thái', 6, 'ク -> 巴', 'どんな 色が 好きですか。', 'Donna iro ga suki desu ka.', 'Bạn thích màu sắc nào?', 'N4', 'Sắc thái biểu cảm', 'Khuôn mặt biểu lộ sắc thái rạng rỡ phong phú.', '🎨', v_ch5_id, 13, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('赤', 'セキ', 'あか, あか・い', 'aka', 'XÍCH', 'Màu đỏ', 7, '土 -> 灬', '信号が 赤に なりました。', 'Shingou ga aka ni narimashita.', 'Đèn tín hiệu đã chuyển sang màu đỏ.', 'N4', 'Ngọn lửa đỏ rực', 'Đất bị nung nóng bởi ngọn lửa đỏ rực dưới đáy.', '🔴', v_ch5_id, 14, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('黄', 'コウ', 'き, こ', 'ki', 'HOÀNG', 'Màu vàng', 11, '廿 -> 一 -> 由 -> 八', '黄色い 傘を さして 歩きます。', 'Kiiroi kasa o sashite arukimasu.', 'Tôi che chiếc ô màu vàng đi bộ.', 'N4', 'Cánh đồng lúa vàng óng', 'Cánh đồng lúa chín vàng ươm dưới nắng trời thu.', '🟡', v_ch5_id, 15, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('青', 'セイ', 'あお, あお・い', 'ao', 'THANH', 'Màu xanh da trời, thanh xuân', 8, '龶 -> 月', '青信号に なったら わたりましょう。', 'Aoshingou ni nattara watarimashou.', 'Khi đèn chuyển sang xanh thì hãy qua đường nhé.', 'N4', 'Mầm xanh dưới trăng', 'Mầm non xanh biếc vươn lên dưới vầng trăng trong lành.', '🔵', v_ch5_id, 16, '/assets/kanji/n4/illustrations/chap5_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('病', 'ビョウ', 'や・む', 'byou', 'BỆNH', 'Bệnh tật, ốm đau', 10, '疒 -> 丙', '病気で 会社を 休みました。', 'Byouki de kaisha o yasumimashita.', 'Vì bị bệnh nên tôi đã nghỉ làm ở công ty.', 'N4', 'Nằm trên giường bệnh', 'Người bệnh nằm dưỡng thương trên chiếc giường y tế.', '🤒', v_ch5_id, 17, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('院', 'イン', '', 'in', 'VIỆN', 'Bệnh viện, viện sở', 10, '阝 -> 宀 -> 元', '病院へ 行って 診察を うけます。', 'Byouin e itte shinsatsu o ukemasu.', 'Tôi đến bệnh viện để bác sĩ khám.', 'N4', 'Tòa viện lớn', 'Tòa nhà kiên cố có tường rào bao quanh khám chữa bệnh.', '🏥', v_ch5_id, 18, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('医', 'イ', '', 'i', 'Y', 'Y học, bác sĩ', 7, '匚 -> 矢', '医者に みてもらいました。', 'Isha ni mitemoraimashita.', 'Tôi đã được bác sĩ thăm khám cẩn thận.', 'N4', 'Túi thuốc chữa bệnh', 'Chiếc tráp đựng dụng cụ y tế và thuốc cứu chữa bệnh nhân.', '🩺', v_ch5_id, 19, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('科', 'カ', '', 'ka', 'KHOA', 'Chuyên khoa, khoa học', 9, '禾 -> 斗', '内科で 風邪薬を もらいました。', 'Naika de kazegusuri o moraimashita.', 'Tôi đến khoa nội lấy thuốc cảm.', 'N4', 'Đo lường phân loại', 'Dùng cái đấu đo lường phân chia từng chuyên khoa nghiên cứu.', '🔬', v_ch5_id, 20, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('薬', 'ヤク', 'くすり', 'kusuri', 'DƯỢC', 'Thuốc men', 16, '艹 -> 楽', '食後に 薬を 飲んでください。', 'Shokugo ni kusuri o nonde kudasai.', 'Sau bữa ăn xin hãy uống thuốc.', 'N4', 'Cỏ mang lại niềm vui', 'Loài thảo mộc xua tan bệnh tật mang lại niềm vui cho cơ thể.', '💊', v_ch5_id, 21, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('待', 'タイ', 'ま・つ', 'ma', 'ĐÃI', 'Chờ đợi, thết đãi', 9, '彳 -> 寺', '待合室で 順番を 待ちます。', 'Machiaishitsu de junban o machimasu.', 'Tôi ngồi chờ đến lượt ở phòng chờ bệnh viện.', 'N4', 'Đứng chờ ở chùa', 'Bước chân thong thả đứng đợi người thân trước cổng chùa.', '⏳', v_ch5_id, 22, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('合', 'ゴウ', 'あ・う', 'a', 'HỢP', 'Phù hợp, hợp nhất', 6, '亼 -> 口', '友だちと 待ち合わせを します。', 'Tomodachi to machiawase o shimasu.', 'Tôi hẹn gặp mặt bạn bè.', 'N4', 'Đóng nắp vừa vặn', 'Chiếc nắp đậy khít khao vừa vặn chiếc hộp bên dưới.', '🤝', v_ch5_id, 23, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('計', 'ケイ', 'はか・る', 'haka', 'KẾ', 'Kế hoạch, tính toán, đo đạc', 9, '言 -> 十', '熱を 測る 体温計を 使います。', 'Netsu o hakaru taionkei o tsukaimasu.', 'Dùng nhiệt kế để đo nhiệt độ cơ thể.', 'N4', 'Nói ra tính toán', 'Lời nói tính toán cẩn thận từ một đến mười.', '📊', v_ch5_id, 24, '/assets/kanji/n4/illustrations/chap5_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('研', 'ケン', 'と・ぐ', 'to', 'NGHIÊN', 'Mài dũa, nghiên cứu', 9, '石 -> 开', '大学で 日本語を 研究しています。', 'Daigaku de nihongo o kenkyuu shiteimasu.', 'Tôi đang nghiên cứu tiếng Nhật ở trường đại học.', 'N4', 'Mài đá mở mang', 'Dùng hòn đá mài dũa mở rộng cánh cổng tri thức.', '🔍', v_ch6_id, 1, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('究', 'キュウ', 'きわ・める', 'kiwa', 'CỨU', 'Nghiên cứu đến cùng', 7, '穴 -> 九', '宇宙の なぞを 追究します。', 'Uchuu no nazo o tsuikyuu shimasu.', 'Truy tìm và nghiên cứu đến cùng bí ẩn của vũ trụ.', 'N4', 'Hang sâu số chín', 'Bò vào chín ngóc ngách của hang sâu để tìm tòi chân lý.', '🧪', v_ch6_id, 2, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('語', 'ゴ', 'かた・る', 'kata', 'NGỮ', 'Ngôn ngữ, kể chuyện', 14, '言 -> 五 -> 口', '日本語の 文法を 勉強します。', 'Nihongo no bunpou o benkyou shimasu.', 'Tôi học ngữ pháp tiếng Nhật.', 'N4', 'Năm người cùng nói', 'Lời nói của năm cái miệng cùng đàm đạo ngôn ngữ.', '🗣️', v_ch6_id, 3, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('文', 'ブン, モン', 'ふみ', 'bun', 'VĂN', 'Văn bản, câu văn, văn hóa', 4, '亠 -> 乂', '短い 作文を 書きました。', 'Mijikai sakubun o kakimashita.', 'Tôi đã viết một bài văn ngắn.', 'N4', 'Dấu ấn hoa văn', 'Đường nét giao nhau tạo thành ký tự và văn hóa.', '📝', v_ch6_id, 4, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('英', 'エイ', '', 'ei', 'ANH', 'Tinh anh, nước Anh', 8, '艹 -> 央', '英語の 論文を 読みます。', 'Eigo no ronbun o yomimasu.', 'Tôi đọc luận văn bằng tiếng Anh.', 'N4', 'Bông hoa tinh anh', 'Bông hoa nổi bật rạng rỡ ngay chính giữa vườn.', '🇬🇧', v_ch6_id, 5, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('化', 'カ, ケ', 'ば・ける', 'ba', 'HÓA', 'Biến hóa, hóa học', 4, '亻 -> 匕', '科学の 実験を します。', 'Kagaku no jikken o shimasu.', 'Tôi làm thí nghiệm khoa học.', 'N4', 'Người biến đổi', 'Con người ngồi quay lại biến đổi hình thái khác nhau.', '🧬', v_ch6_id, 6, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('数', 'スウ', 'かず, かぞ・える', 'kazu', 'SỐ', 'Con số, đếm số', 13, '米 -> 女 -> 攵', '学生の 数を 数えます。', 'Gakusei no kazu o kazoemasu.', 'Đếm số lượng học sinh trong lớp.', 'N4', 'Gõ gậy đếm gạo', 'Người phụ nữ dùng gậy gõ đếm từng hạt thóc.', '🔢', v_ch6_id, 7, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('心', 'シン', 'こころ', 'kokoro', 'TÂM', 'Trái tim, tấm lòng', 4, '心', '安心してください、大丈夫です。', 'Anshin shite kudasai, daijoubu desu.', 'Xin bạn yên tâm, mọi chuyện sẽ ổn thôi.', 'N4', 'Trái tim đập', 'Bốn giọt máu nuôi dưỡng buồng tim tràn đầy tình cảm.', '❤️', v_ch6_id, 8, '/assets/kanji/n4/illustrations/chap6_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('若', 'ジャク', 'わか・い', 'waka', 'NHƯỢC', 'Trẻ trung, tuổi trẻ', 8, '艹 -> 右', '若い 人たちが 集まります。', 'Wakai hitotachi ga atsumarimasu.', 'Những người trẻ tuổi tụ họp lại cùng nhau.', 'N4', 'Bàn tay vuốt tóc cỏ', 'Bàn tay người phụ nữ chải chuốt mái tóc thanh xuân.', '🌱', v_ch6_id, 9, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('集', 'シュウ', 'あつ・まる, あつ・める', 'atsu', 'TẬP', 'Tụ họp, tập hợp', 12, '隹 -> 木', 'みんなで 駅前に 集まりました。', 'Minna de ekimae ni atsumarimashita.', 'Mọi người tập trung trước ga xe lửa.', 'N4', 'Đàn chim trên cây', 'Đàn chim sà xuống đậu tập trung trên cành cây.', '🤝', v_ch6_id, 10, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('知', 'チ', 'し・る', 'shi', 'TRI', 'Biết, tri thức', 8, '矢 -> 口', 'その ニュースを 知っていますか。', 'Sono nyuusu o shitteimasu ka.', 'Bạn có biết tin tức đó không?', 'N4', 'Bắn tên mở mang hiểu biết', 'Mũi tên bay nhanh như lời nói hiểu biết từ miệng ra.', '💡', v_ch6_id, 11, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('酒', 'シュ', 'さけ, さか', 'sake', 'TỬU', 'Rượu, thức uống có cồn', 10, '氵 -> 酉', '日本の お酒を 飲みました。', 'Nihon no osake o nomimashita.', 'Tôi đã uống rượu Sake truyền thống của Nhật Bản.', 'N4', 'Bình rượu ủ lâu', 'Giọt nước cất trong vò rượu ủ men thơm nồng.', '🍶', v_ch6_id, 12, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('歌', 'カ', 'うた, うた・う', 'uta', 'CA', 'Bài hát, ca hát', 14, '哥 -> 欠', 'カラオケで 歌を 歌います。', 'Karaoke de uta o utaimasu.', 'Hát những bài ca vui vẻ tại quán karaoke.', 'N4', 'Miệng mở to ca hát', 'Miệng hát hai lần mở rộng hơi ca vang giai điệu.', '🎤', v_ch6_id, 13, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('声', 'セイ', 'こえ', 'koe', 'THANH', 'Tiếng nói, âm thanh', 7, '士 -> 尸', '大きな 声で あいさつします。', 'Ookina koe de aisatsu shimasu.', 'Chào hỏi lễ phép bằng giọng nói to rõ ràng.', 'N4', 'Âm vang người lính', 'Người lính lên tiếng dõng dạc truyền lệnh xa xôi.', '🔊', v_ch6_id, 14, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('楽', 'ラク, ガク', 'たの・しい', 'tano', 'LẠC, NHẠC', 'Âm nhạc, vui vẻ, thoải mái', 13, '白 -> 幺 -> 木', '音楽を 聞きながら 勉強します。', 'Ongaku o kikinagara benkyou shimasu.', 'Tôi vừa nghe nhạc vừa học bài.', 'N4', 'Nhạc cụ gỗ', 'Dây đàn căng trên giá gỗ gảy nên khúc ca vui tươi.', '🎵', v_ch6_id, 15, '/assets/kanji/n4/illustrations/chap6_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('味', 'ミ', 'あじ, あじ・わう', 'aji', 'VỊ', 'Hương vị, mùi vị', 8, '口 -> 未', 'この ラーメンは スープの 味が 深いです。', 'Kono raamen wa suupu no aji ga fukai desu.', 'Món mì ramen này có vị súp rất đậm đà.', 'N4', 'Miệng nếm vị chưa biết', 'Cái miệng nếm thử mùi vị thức ăn mới lạ.', '🍜', v_ch6_id, 16, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('油', 'ユ', 'あぶら', 'abura', 'DU', 'Dầu ăn, dầu mỡ', 8, '氵 -> 由', 'ごま油を 入れると おいしいです。', 'Gomaabura o ireru to oishii desu.', 'Cho thêm dầu mè vào thì rất thơm ngon.', 'N4', 'Dòng dầu trôi ra', 'Chất lỏng màu vàng sóng sánh trôi ra từ chiếc bình.', '🫒', v_ch6_id, 17, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('太', 'タイ', 'ふと・い', 'futo', 'THÁI', 'To béo, dày dặn', 4, '大 -> 丶', 'この店の ラーメンは めんが 太いです。', 'Kono mise no raamen wa men ga futoi desu.', 'Mì ramen quán này sợi rất to dày.', 'N4', 'Người lớn có chấm béo', 'Người to lớn có thêm điểm béo tròn phúng phính.', '🐘', v_ch6_id, 18, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('細', 'サイ', 'ほそ・い, こま・かい', 'hoso', 'TẾ', 'Mảnh mai, chi tiết, nhỏ bé', 11, '糸 -> 田', 'まりさんは うでが 細いのに 力が あります。', 'Mari-san wa ude ga hosoi noni chikara ga arimasu.', 'Bạn Mari dù cánh tay thon mảnh nhưng rất có lực.', 'N4', 'Sợi tơ chia ô nhỏ', 'Sợi chỉ tơ tằm dệt thành những mắt lưới tinh tế nhỏ nhắn.', '🧵', v_ch6_id, 19, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('皿', 'ベイ', 'さら', 'sara', 'MÃNH', 'Chiếc đĩa, dĩa đựng thức ăn', 5, '皿', 'とり皿に おかずを 分けます。', 'Torizara ni okazu o wakemasu.', 'Gắp thức ăn chia đều vào đĩa riêng.', 'N4', 'Chiếc đĩa đựng đồ', 'Chiếc đĩa trũng lòng vững vàng chứa thức ăn.', '🍽️', v_ch6_id, 20, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('飯', 'ハン', 'めし', 'han', 'PHẠN', 'Cơm, bữa ăn', 12, '飠 -> 反', 'ゆうはんに ご飯を 炊きます。', 'Yuuhan ni gohan o takimasu.', 'Tôi nấu cơm cho bữa tối gia đình.', 'N4', 'Thức ăn trở mình', 'Món cơm gạo dẻo thơm được đảo đều nóng hổi.', '🍚', v_ch6_id, 21, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('麦', 'バク', 'むぎ', 'mugi', 'MẠCH', 'Lúa mạch, lúa mì', 7, '龶 -> 夂', '小麦こで うどんを 作ります。', 'Komugiko de udon o tsukurimasu.', 'Làm mì udon từ bột lúa mì.', 'N4', 'Bông lúa mạch thu hoạch', 'Cây lúa mạch uốn mình đung đưa bước đi trong gió thu.', '🌾', v_ch6_id, 22, '/assets/kanji/n4/illustrations/chap6_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('春', 'シュン', 'はる', 'haru', 'XUÂN', 'Mùa xuân', 9, '三 -> 人 -> 日', '春に なって 桜が さきました。', 'Haru ni natte sakura ga sakimashita.', 'Mùa xuân đến hoa anh đào đã nở rộ.', 'N4', 'Mặt trời ấm áp', 'Ba người cùng ra đường phơi nắng ngày đầu xuân ấm áp.', '🌸', v_ch7_id, 1, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('夏', 'カ', 'なつ', 'natsu', 'HẠ', 'Mùa hè', 10, '一 -> 自 -> 夂', '夏休みは 海で およぎます。', 'Natsuyasumi wa umi de oyogimasu.', 'Nghỉ hè tôi đi bơi ở biển.', 'N4', 'Người đội nón mùa hè', 'Khuôn mặt người đội nón rộng vành bước đi dưới nắng hè.', '🏖️', v_ch7_id, 2, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('秋', 'シュウ', 'あき', 'aki', 'THU', 'Mùa thu', 9, '禾 -> 火', '秋の もみじが とても きれいです。', 'Aki no momiji ga totemo kirei desu.', 'Lá đỏ mùa thu đẹp ngút ngàn.', 'N4', 'Lúa chín đỏ rực', 'Bông lúa vàng óng như ngọn lửa bập bùng ngày thu.', '🍁', v_ch7_id, 3, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('冬', 'トウ', 'ふゆ', 'fuyu', 'ĐÔNG', 'Mùa đông', 5, '夂 -> 冫', '冬は 雪が たくさん ふります。', 'Fuyu wa yuki ga takusan furimasu.', 'Mùa đông tuyết rơi rất nhiều.', 'N4', 'Băng giá mùa đông', 'Bước chân dẫm lên hai giọt băng giá buốt của mùa đông.', '❄️', v_ch7_id, 4, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('空', 'クウ', 'そら, あ・く', 'sora', 'KHÔNG', 'Bầu trời, trống rỗng', 8, '穴 -> 工', '青空が 広がっています。', 'Aozora ga hirogatteimasu.', 'Bầu trời trong xanh trải rộng bao la.', 'N4', 'Mái vòm bầu trời', 'Bầu trời bao la như chiếc vòm mở ra công trường vũ trụ.', '☁️', v_ch7_id, 5, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('星', 'セイ', 'ほし', 'hoshi', 'TINH', 'Ngôi sao, thiên thể', 9, '日 -> 生', '夜空に 星が かがやいています。', 'Yozora ni hoshi ga kagayaiteimasu.', 'Những ngôi sao đang lấp lánh trên bầu trời đêm.', 'N4', 'Mặt trời sinh ra sao', 'Vầng thái dương sinh ra những vì sao nhỏ lung linh.', '⭐', v_ch7_id, 6, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('雲', 'ウン', 'くも', 'kumo', 'VÂN', 'Đám mây', 12, '雨 -> 云', '白い 雲が うかんでいます。', 'Shiroi kumo ga ukandeimasu.', 'Những đám mây trắng bồng bềnh trôi.', 'N4', 'Hạt mưa tích tụ thành mây', 'Hơi nước tích tụ trên cao biến thành những đám mây lững lờ.', '☁️', v_ch7_id, 7, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('去', 'キョ, コ', 'さ・る', 'sa', 'KHỨ', 'Đã qua, rời đi, quá khứ', 5, '土 -> 厶', '去年の 4月に 日本へ 来ました。', 'Kyonen no shigatsu ni Nihon e kimashita.', 'Tôi đến Nhật vào tháng 4 năm ngoái.', 'N4', 'Rời khỏi mảnh đất', 'Người rời khỏi mảnh đất quê nhà bước vào quá khứ.', '⏳', v_ch7_id, 8, '/assets/kanji/n4/illustrations/chap7_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('天', 'テン', 'あま', 'ten', 'THIÊN', 'Trời, bầu trời, thiên nhiên', 4, '一 -> 大', '明日の 天気は どうですか。', 'Ashita no tenki wa dou desu ka.', 'Thời tiết ngày mai thế nào?', 'N4', 'Bầu trời trên đầu người', 'Khoảng trời cao vút trải rộng trên đầu con người.', '🌤️', v_ch7_id, 9, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('晴', 'セイ', 'は・れる', 'ha', 'TÌNH', 'Nắng ráo, quang đãng', 12, '日 -> 青', '明日は 晴れたら ハイキングに 行きます。', 'Ashita wa haretara haikingu ni ikimasu.', 'Nếu mai trời nắng ráo tôi sẽ đi leo núi dã ngoại.', 'N4', 'Mặt trời và trời xanh', 'Mặt trời tỏa nắng chan hòa bên nền trời xanh biếc.', '☀️', v_ch7_id, 10, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('雪', 'セツ', 'ゆき', 'yuki', 'TUYẾT', 'Tuyết rơi', 11, '雨 -> 彐', '雪が つもったので 雪だるまを 作りました。', 'Yuki ga tsumotta node yukidaruma o tsukurimashita.', 'Tuyết rơi dày nên tôi đã đắp người tuyết.', 'N4', 'Mưa tuyết gom lại', 'Cơn mưa đông lạnh giá rơi xuống quét gom lại thành đống tuyết.', '☃️', v_ch7_id, 11, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('風', 'フウ', 'かぜ', 'kaze', 'PHONG', 'Gió, phong cách', 9, '几 -> 虫', '強い 風が ふいています。', 'Tsuyoi kaze ga fuiteimasu.', 'Gió đang thổi rất mạnh.', 'N4', 'Cơn gió thổi sâu bọ', 'Ngọn gió lùa mạnh đẩy những cánh bướm sâu bọ bay lượn.', '💨', v_ch7_id, 12, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('強', 'キョウ', 'つよ・い', 'tsuyo', 'CƯỜNG', 'Mạnh mẽ, kiên cường', 11, '弓 -> 厶 -> 虫', '台風で 風が つよくなりました。', 'Taifuu de kaze ga tsuyokunatta.', 'Gió thổi mạnh hơn do ảnh hưởng bão.', 'N4', 'Cung tên mạnh mẽ', 'Cây cung có sức mạnh bắn gục cả loài sâu bọ to lớn.', '💪', v_ch7_id, 13, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('弱', 'ジャク', 'よわ・い', 'yowa', 'NHƯỢC', 'Yếu ớt, giảm sút', 10, '弓 -> 冫 x 2', 'うでの 力が 弱いので 持てません。', 'Ude no chikara ga yowai node motemasen.', 'Cánh tay yếu ớt nên không xách nổi đồ.', 'N4', 'Hai cây cung gãy', 'Hai cánh cung non yếu bị gãy mất không còn sức bật.', '🥀', v_ch7_id, 14, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('暑', 'ショ', 'あつ・い', 'atsu', 'THỬ', 'Nóng bức (thời tiết)', 12, '日 -> 者', '暑い 日に 飲む ビールは おいしいです。', 'Atsui hi ni nomu biiru wa oishii desu.', 'Uống bia trong ngày hè oi bức thật tuyệt vời.', 'N4', 'Người đứng dưới nắng gắt', 'Mặt trời chiếu gay gắt lên người làm mồ hôi ướt đẫm.', '🥵', v_ch7_id, 15, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('寒', 'カン', 'さむ・い', 'samu', 'HÀN', 'Lạnh giá (thời tiết)', 12, '宀 -> 井 -> 冫', '冬の 朝は とても 寒いです。', 'Fuyu no asa wa totemo samui desu.', 'Buổi sáng mùa đông trời rất lạnh giá.', 'N4', 'Băng giá trong nhà', 'Dưới mái nhà có đống rơm và hai giọt băng buốt giá.', '🥶', v_ch7_id, 16, '/assets/kanji/n4/illustrations/chap7_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('旅', 'リョ', 'たび', 'tabi', 'LỮ', 'Du lịch, chuyến đi', 10, '方 -> 氏', '夏休みに 一人旅を する よていです。', 'Natsuyasumi ni hitoritabi o suru yotei desu.', 'Kỳ nghỉ hè tôi dự định đi du lịch một mình.', 'N4', 'Cờ lữ hành phấp phới', 'Đoàn người giương lá cờ lên đường đi thám hiểm du lịch.', '🎒', v_ch7_id, 17, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('持', 'ジ', 'も・つ', 'mo', 'TRÌ', 'Cầm, nắm, sở hữu', 9, '扌 -> 寺', 'パスポートを 持って 出かけます。', 'Pasupooto o motte dekakemasu.', 'Mang theo hộ chiếu khi ra ngoài.', 'N4', 'Bàn tay nắm chặt ở chùa', 'Bàn tay nắm giữ kỷ vật quý giá tại sân chùa.', '🤲', v_ch7_id, 18, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('世', 'セイ, セ', 'よ', 'yo', 'THẾ', 'Thế gian, thế giới, thời đại', 5, '一 -> 廿', 'インターネットで 買い物ができる 世の中です。', 'Intaanetto de kaimono ga dekiru yononaka desu.', 'Thế giới ngày nay có thể mua hàng qua Internet rất dễ dàng.', 'N4', 'Ba thế hệ ba mươi năm', 'Mỗi nhánh cây tượng trưng cho một thập kỷ nối tiếp nhau.', '🌐', v_ch7_id, 19, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('界', 'カイ', '', 'kai', 'GIỚI', 'Ranh giới, thế giới', 9, '田 -> 介', '世界一周の 船旅に 行きたいです。', 'Sekai isshuu no funatabi ni ikitai desu.', 'Tôi muốn đi chuyến du lịch bằng thuyền vòng quanh thế giới.', 'N4', 'Ranh giới thửa ruộng', 'Đường ranh giới phân định ngăn cách các mảnh ruộng.', '🗺️', v_ch7_id, 20, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('写', 'シャ', 'うつ・す', 'utsu', 'TẢ', 'Sao chép, chụp ảnh', 5, '冖 -> 与', '花の 写真を とるのが 好きです。', 'Hana no shashin o toru no ga suki desu.', 'Tôi thích chụp ảnh những bông hoa.', 'N4', 'Sao chép hình ảnh', 'Dưới mái khung kính ghi lại chính xác hình ảnh thực tế.', '📷', v_ch7_id, 21, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('真', 'シン', 'ま', 'shin', 'CHÂN', 'Chân thật, đúng đắn', 10, '十 -> 目 -> 八', 'しんじつを 話してください。', 'Shinjitsu o hanashite kudasai.', 'Xin hãy nói ra sự thật chân thực.', 'N4', 'Con mắt chân thật', 'Con mắt sáng nhìn rõ mười điều chân thật trên đời.', '💎', v_ch7_id, 22, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('船', 'セン', 'ふね, ふな', 'fune', 'THUYỀN', 'Con thuyền, tàu thủy', 11, '舟 -> 几 -> 口', '船に のって みずうみを 一周しました。', 'Fune ni notte mizuumi o isshuu shimashita.', 'Tôi đi thuyền dạo quanh hồ nước một vòng.', 'N4', 'Chiếc thuyền chở khách', 'Con thuyền có khoang buồng chở người lướt trên sóng nước.', '🚢', v_ch7_id, 23, '/assets/kanji/n4/illustrations/chap7_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勉', 'ベン', '', 'ben', 'MIỄN', 'Cố gắng, chăm chỉ, học tập', 10, '免 -> 力', '漢字の 勉強は とても 大切です。', 'Kanji no benkyou wa totemo taisetsu desu.', 'Việc học chữ Hán rất quan trọng.', 'N4', 'Dốc sức học tập', 'Nỗ lực dốc hết sức lực vượt qua khó khăn để thành tài.', '📖', v_ch8_id, 1, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('漢', 'カン', '', 'kan', 'HÁN', 'Chữ Hán, nhà Hán', 13, '氵 -> 廿 -> 口 -> 夫', '毎日 漢字を 五つ おぼえます。', 'Mainichi kanji o itsutsu oboemasu.', 'Mỗi ngày tôi học thuộc 5 chữ Hán.', 'N4', 'Dòng sông Hán thủy', 'Dòng nước Hán thủy nơi người anh hùng lập nên triều đại.', '🇨🇳', v_ch8_id, 2, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宿', 'シュク', 'やど', 'shuku', 'TÚC', 'Nhà trọ, bài tập về nhà', 11, '宀 -> 亻 -> 百', '今日の 宿題を すぐに 終わらせます。', 'Kyou no shukudai o sugu ni owarasemasu.', 'Tôi làm xong bài tập về nhà ngay lập tức.', 'N4', 'Trăm người ngụ cư', 'Mái nhà trọ che chở cho cả trăm vị khách dừng chân.', '🏨', v_ch8_id, 3, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('題', 'ダイ', '', 'dai', 'ĐỀ', 'Đề tài, câu hỏi, đề mục', 18, '是 -> 頁', 'テストの 問題を よく 読みます。', 'Tesuto no mondai o yoku yomimasu.', 'Đọc kỹ các câu hỏi trong đề thi.', 'N4', 'Đầu đề bài học', 'Tiêu đề trang sách chỉ ra đúng vấn đề cần nghiên cứu.', '📋', v_ch8_id, 4, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('質', 'シツ', '', 'shitsu', 'CHẤT', 'Bản chất, chất lượng, câu hỏi', 15, '斤 x 2 -> 貝', '先生に 質問を します。', 'Sensei ni shitsumon o shimasu.', 'Tôi đặt câu hỏi hỏi thầy giáo.', 'N4', 'Bảo vật chất lượng', 'Hai chiếc rìu thử thách bảo vật quý giá để kiểm định chất lượng.', '❓', v_ch8_id, 5, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('問', 'モン', 'と・う', 'to', 'VẤN', 'Hỏi han, vấn đề', 11, '門 -> 口', '分からない ことを 友だちに 問います。', 'Wakaranai koto o tomodachi ni toimasu.', 'Hỏi bạn bè những điều mình chưa rõ.', 'N4', 'Hỏi trước cổng nhà', 'Đến trước cổng mở miệng cất tiếng hỏi thăm người trong nhà.', '🗣️', v_ch8_id, 6, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('教', 'キョウ', 'おし・える', 'oshi', 'GIÁO', 'Dạy dỗ, giáo dục', 11, '孝 -> 攵', '日本語を 教える 先生に なりたいです。', 'Nihongo o oshieru sensei ni naritai desu.', 'Tôi muốn trở thành giáo viên dạy tiếng Nhật.', 'N4', 'Roi vọt dạy con thảo', 'Thầy giáo cầm roi gõ nhẹ chỉ bảo con trẻ lòng hiếu thuận.', '👩‍🏫', v_ch8_id, 7, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('室', 'シツ', 'むろ', 'shitsu', 'THẤT', 'Căn phòng, phòng học', 9, '宀 -> 至', '教室の まどを 開けます。', 'Kyoushitsu no mado o akemasu.', 'Mở cửa sổ phòng học cho thoáng khí.', 'N4', 'Bước chân vào phòng', 'Dưới mái nhà bước tới căn phòng ấm cúng.', '🏫', v_ch8_id, 8, '/assets/kanji/n4/illustrations/chap8_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('試', 'シ', 'こころ・みる, ため・す', 'tame', 'THÍ', 'Thử nghiệm, kỳ thi', 13, '言 -> 式', 'JLPTの 試験を うけます。', 'JLPT no shiken o ukemasu.', 'Tôi tham gia kỳ thi năng lực tiếng Nhật JLPT.', 'N4', 'Nói ra theo quy tắc thử thách', 'Dùng lời nói và quy chuẩn để thử thách năng lực bản thân.', '📝', v_ch8_id, 9, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('験', 'ケン', '', 'ken', 'NGHIỆM', 'Trải nghiệm, thí nghiệm, thi cử', 18, '馬 -> 僉', 'たくさん 練習して 経験を つみます。', 'Takusan renshuu shite keiken o tsumimasu.', 'Luyện tập nhiều để tích lũy kinh nghiệm.', 'N4', 'Ngựa kiểm nghiệm năng lực', 'Ngựa chạy đường trường kiểm nghiệm sự bền bỉ.', '🎖️', v_ch8_id, 10, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('答', 'トウ', 'こた・える, こたえ', 'kotae', 'ĐÁP', 'Trả lời, đáp án', 12, '竹 -> 合', '正しい 答えを えらんでください。', 'Tadashii kotae o erande kudasai.', 'Hãy chọn câu trả lời chính xác.', 'N4', 'Thẻ tre đáp lời', 'Thẻ tre ghép vừa vặn với câu hỏi đáp ứng đúng yêu cầu.', '✔️', v_ch8_id, 11, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('考', 'コウ', 'かんが・える', 'kanga', 'KHẢO', 'Suy nghĩ, khảo sát', 6, '耂 -> 丂', '将来の 進路を よく 考えます。', 'Shourai no shinro o yoku kangaemasu.', 'Tôi suy nghĩ kỹ càng về con đường tương lai.', 'N4', 'Người già trầm tư', 'Cụ già chống gậy trầm ngâm suy nghĩ suy xét sự đời.', '🤔', v_ch8_id, 12, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('正', 'セイ, ショウ', 'ただ・しい', 'tada', 'CHÍNH', 'Đúng đắn, chính xác', 5, '一 -> 止', '正しい 答えに 丸を つけます。', 'Tadashii kotae ni maru o tsukemasu.', 'Khoanh tròn vào câu trả lời đúng.', 'N4', 'Dừng lại ở điều đúng', 'Bước chân dừng lại kiên định trước một ranh giới chân lý.', '✅', v_ch8_id, 13, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('丸', 'ガン', 'まる, まる・い', 'maru', 'HOÀN', 'Hình tròn, viên tròn, điểm 100', 3, '丿 -> 乙 -> 丶', 'テストで ぜんぶ 丸を もらいました。', 'Tesuto de zenbu maru o moraimashita.', 'Tôi đạt toàn bộ dấu khoanh tròn đúng 100 điểm.', 'N4', 'Viên tròn hoàn chỉnh', 'Vòng tròn khép kín hoàn hảo chấm một nét trọn vẹn.', '⭕', v_ch8_id, 14, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('不', 'フ, ブ', '', 'fu', 'BẤT', 'Không, bất tiện, bất an', 4, '一 -> 𠂉 -> 丨', '電車が 止まって 不便に なりました。', 'Densha ga tomatte fuben ni narimashita.', 'Tàu dừng lại nên rất bất tiện.', 'N4', 'Mầm cây chưa trổ', 'Mầm cây dưới đất chưa vươn lên biểu thị sự chưa/không.', '❌', v_ch8_id, 15, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('同', 'ドウ', 'おな・じ', 'ona', 'ĐỒNG', 'Cùng nhau, giống nhau', 6, '冂 -> 一 -> 口', '友だちと 同じ 意見を 持っています。', 'Tomodachi to onaji iken o motteimasu.', 'Tôi có cùng ý kiến với bạn bè.', 'N4', 'Cùng chung một cổng', 'Mọi người trong cùng một mái nhà cùng chung tiếng nói.', '🤝', v_ch8_id, 16, '/assets/kanji/n4/illustrations/chap8_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('政', 'セイ', 'まつりごと', 'sei', 'CHÍNH', 'Chính trị, chính sách', 9, '正 -> 攵', '政治の ニュースを テレビで 見ます。', 'Seiji no nyuusu o terebi de mimasu.', 'Tôi xem tin tức thời sự chính trị trên truyền hình.', 'N4', 'Thực thi điều đúng', 'Dùng quyền hành thực thi những điều công chính trong xã hội.', '🏛️', v_ch8_id, 17, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('治', 'ジ, チ', 'おさ・める, なお・る', 'osa', 'TRỊ', 'Trị an, cai trị, chữa lành', 8, '氵 -> 台', '町が 平和に 治められています。', 'Machi ga heiwa ni osamerareteimasu.', 'Thành phố được trị an hòa bình yên ả.', 'N4', 'Dòng nước yên ả trên đài', 'Dòng nước êm ả dưới bệ đá mang lại sự ổn định bình trị.', '⚖️', v_ch8_id, 18, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('経', 'ケイ', 'へ・る', 'kei', 'KINH', 'Kinh tế, kinh qua, trải qua', 11, '糸 -> 𢀖', '経済の 本を 読んで 勉強します。', 'Keizai no hon o yonde benkyou shimasu.', 'Tôi đọc sách kinh tế để nâng cao kiến thức.', 'N4', 'Dệt sợi tơ kinh tuyến', 'Từng sợi chỉ tơ đan dệt nên mạng lưới kinh tế vững vàng.', '📈', v_ch8_id, 19, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('済', 'サイ', 'す・む', 'su', 'TẾ', 'Kinh tế, cứu tế, xong xuôi', 11, '氵 -> 斉', '宿題が ぜんぶ 済みました。', 'Shukudai ga zenbu sumimashita.', 'Bài tập đã được giải quyết xong xuôi hết.', 'N4', 'Dòng nước cứu giúp', 'Dòng nước thanh mát cứu giúp vạn vật qua cơn hoạn nạn.', '💰', v_ch8_id, 20, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('歴', 'レキ', '', 'reki', 'LỊCH', 'Lịch sử, lý lịch', 14, '厂 -> 林 -> 止', '日本の 歴史を 調べるのが 趣味です。', 'Nihon no rekishi o shiraberu no ga shuumi desu.', 'Sở thích của tôi là tìm hiểu lịch sử Nhật Bản.', 'N4', 'Rừng cây trải qua năm tháng', 'Dưới sườn núi rừng cây đứng sừng sững qua bao biến cố thời gian.', '📜', v_ch8_id, 21, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('史', 'シ', '', 'shi', 'SỬ', 'Lịch sử, ghi chép sử thư', 5, '口 -> 丨', '歴史の 博物館に 行きました。', 'Rekishi no hakubutsukan ni ikimashita.', 'Tôi đã đến bảo tàng lịch sử tham quan.', 'N4', 'Tay cầm bút chép sử', 'Bàn tay cầm bút ghi chép những sự kiện chân thực vào sử sách.', '🏺', v_ch8_id, 22, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('国', 'コク', 'くに', 'kuni', 'QUỐC', 'Đất nước, quốc gia', 8, '囗 -> 玉', '自分の 国の 文化を しょうかいします。', 'Jibun no kuni no bunka o shoukai shimasu.', 'Tôi giới thiệu văn hóa của đất nước mình.', 'N4', 'Ngọc quý trong biên cương', 'Viên ngọc quý được bảo bọc an toàn trong bốn bề biên cương.', '🎌', v_ch8_id, 23, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('王', 'オウ', '', 'ou', 'VƯƠNG', 'Vua, hoàng gia', 4, '王', '昔の 国の 王様は 強かったです。', 'Mukashi no kuni no ousama wa tsuyokatta desu.', 'Vị vua của đất nước ngày xưa rất hùng mạnh.', 'N4', 'Ba nét nối trời đất', 'Ba cõi trời đất người được liên kết thông suốt bởi vị vua.', '👑', v_ch8_id, 24, '/assets/kanji/n4/illustrations/chap8_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('運', 'ウン', 'はこ・ぶ', 'hako', 'VẬN', 'Vận động, vận chuyển, may mắn', 12, '軍 -> 辶', '毎朝 運動場を 走ります。', 'Maiasa undoujou o hashirimasu.', 'Mỗi sáng tôi đều chạy bộ quanh sân vận động.', 'N4', 'Xe quân sự lăn bánh', 'Đoàn xe chở binh lính tiến bước vận động trên đường trường.', '🏃‍♂️', v_ch9_id, 1, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('動', 'ドウ', 'うご・く', 'ugo', 'ĐỘNG', 'Chuyển động, hoạt động', 11, '重 -> 力', '体を 動かして リフレッシュします。', 'Karada o ugokashite rifuresshu shimasu.', 'Vận động cơ thể để tinh thần sảng khoái.', 'N4', 'Dốc sức nhấc vật nặng', 'Dùng toàn bộ sức mạnh để di chuyển khối vật nặng nề.', '🤸', v_ch9_id, 2, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('練', 'レン', 'ね・る', 'ne', 'LUYỆN', 'Rèn luyện, tập luyện', 14, '糸 -> 東', 'ピアノを 毎日 練習します。', 'Piano o mainichi renshuu shimasu.', 'Mỗi ngày tôi đều luyện tập đàn piano.', 'N4', 'Mài giũa sợi tơ phía Đông', 'Sợi tơ phương Đông được rèn luyện kéo sợi kỹ càng.', '🎹', v_ch9_id, 3, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('習', 'シュウ', 'なら・う', 'nara', 'TẬP', 'Học tập, tập quán', 11, '羽 -> 白', 'テニスを 習い 始めました。', 'Tenisu o narai hajimemashita.', 'Tôi đã bắt đầu đi học chơi quần vợt.', 'N4', 'Đôi cánh tập bay', 'Chim non dang rộng đôi cánh trắng tập vỗ cánh bay lên.', '🎾', v_ch9_id, 4, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('走', 'ソウ', 'はし・る', 'hashi', 'TẨU', 'Chạy bộ', 7, '土 -> 龰', '公園の まわりを 走ります。', 'Kouen no mawari o hashirimasu.', 'Tôi chạy bộ xung quanh công viên.', 'N4', 'Chân chạm đất chạy nhanh', 'Đôi chân bước thoăn thoắt trên nền đất phóng nhanh.', '🏃', v_ch9_id, 5, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('歩', 'ホ', 'ある・く', 'aru', 'BỘ', 'Đi bộ, từng bước', 8, '止 -> 少', 'えきまで 歩いて 10分です。', 'Eki made aruite juppun desu.', 'Đi bộ đến ga tàu mất khoảng 10 phút.', 'N4', 'Dừng rồi lại bước', 'Từng bước chân vững vàng nối tiếp nhau chậm rãi.', '🚶', v_ch9_id, 6, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泳', 'エイ', 'およ・ぐ', 'oyo', 'VỊNH', 'Bơi lội', 8, '氵 -> 永', 'プールで 500メートル 泳ぎました。', 'Puuru de gohyakumeetoru oyogimashita.', 'Tôi đã bơi 500 mét ở hồ bơi.', 'N4', 'Vùng vẫy trong dòng nước', 'Làn sóng nước bao quanh người bơi lội trường tồn dẻo dai.', '🏊', v_ch9_id, 7, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('才', 'サイ', '', 'sai', 'TÀI', 'Tài năng, tuổi (đếm tuổi)', 3, '十 -> 丿', 'かの女は 語学の 才能が あります。', 'Kanojo wa gogaku no sainou ga arimasu.', 'Cô ấy có tài năng thiên bẩm về ngôn ngữ.', 'N4', 'Mầm cây nhú lên', 'Chồi non nhú lên khỏi mặt đất tượng trưng cho tài năng thiên phú.', '🌟', v_ch9_id, 8, '/assets/kanji/n4/illustrations/chap9_sub1_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('自', 'ジ, シ', 'みずか・ら', 'mizuka', 'TỰ', 'Tự thân, tự mình', 6, '自', '自転車に 乗って 出かけます。', 'Jitensha ni notte dekakemasu.', 'Tôi tự mình đạp xe đạp dạo phố.', 'N4', 'Cái mũi chỉ bản thân', 'Chiếc mũi trên khuôn mặt đại diện cho cái tôi tự thân.', '🚲', v_ch9_id, 9, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('然', 'ゼン, ネン', '', 'zen', 'NHIÊN', 'Tự nhiên, quả nhiên', 12, '月 -> 犬 -> 灬', '豊かな 自然を 守りましょう。', 'Yutaka na shizen o mamorimashou.', 'Hãy chung tay bảo vệ thiên nhiên tươi đẹp.', 'N4', 'Thịt thú nướng tự nhiên', 'Thịt thú rừng nướng dưới ngọn lửa hòa quyện hương vị tự nhiên.', '🌿', v_ch9_id, 10, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('草', 'ソウ', 'くさ', 'kusa', 'THẢO', 'Cỏ cây, thảo mộc', 9, '艹 -> 早', '緑の 草が 生えています。', 'Midori no kusa ga haeteimasu.', 'Những ngọn cỏ xanh tươi đang mọc tốt tươi.', 'N4', 'Cỏ mọc sáng sớm', 'Lớp cỏ non vươn lên đón những tia nắng ban sớm.', '🌱', v_ch9_id, 11, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('原', 'ゲン', 'はら', 'hara', 'NGUYÊN', 'Thảo nguyên, nguồn gốc', 10, '厂 -> 泉', '広い 草原で 馬が 走っています。', 'Hiroi sougen de uma ga hashitteimasu.', 'Đàn ngựa đang phi nước đại trên thảo nguyên rộng lớn.', 'N4', 'Suối nguồn chân vách đá', 'Dòng suối trong veo bắt nguồn từ chân vách núi mở ra bình nguyên.', '🌾', v_ch9_id, 12, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('湖', 'コ', 'みずうみ', 'mizuumi', 'HỒ', 'Hồ nước', 12, '氵 -> 古 -> 月', '山の 近くの 湖で ボートに 乗ります。', 'Yama no chikaku no mizuumi de booto ni norimasu.', 'Đi thuyền chèo trên hồ nước gần chân núi.', 'N4', 'Nước hồ ngàn năm', 'Vùng nước cổ xưa soi bóng vầng trăng tròn tĩnh lặng.', '⛵', v_ch9_id, 13, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('谷', 'コク', 'たに', 'tani', 'CỐC', 'Thung lũng, hẻm núi', 7, '八 -> 人 -> 口', '深い 谷の 底を 川が 流れています。', 'Fukai tani no soko o kawa ga nagareteimasu.', 'Dòng sông uốn lượn chảy dưới đáy thung lũng sâu thẳm.', 'N4', 'Miệng thung lũng', 'Dòng nước từ hai sườn đồi đổ vào lòng thung lũng trũng.', '🏞️', v_ch9_id, 14, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('海', 'カイ', 'うみ', 'umi', 'HẢI', 'Biển cả, đại dương', 9, '氵 -> 毎', '夏休みに 海辺で 貝がらを ひろいました。', 'Natsuyasumi ni umibe de kaigara o hiroimashita.', 'Kỳ nghỉ hè tôi nhặt vỏ sò bên bờ biển.', 'N4', 'Dòng nước bao la của mẹ', 'Vùng nước bao la vô tận như tình mẹ che chở con.', '🌊', v_ch9_id, 15, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('辺', 'ヘン', 'あた・り, べ', 'atari', 'BIÊN', 'Bên cạnh, ven, bờ', 5, '刀 -> 辶', 'この 辺りは 静かで 住みやすいです。', 'Kono atari wa shizuka de sumiyasui desu.', 'Khu vực quanh đây rất yên tĩnh và dễ sống.', 'N4', 'Con đường ven biên', 'Lưỡi dao phân định bờ cõi bước đi ven đường bờ.', '🧭', v_ch9_id, 16, '/assets/kanji/n4/illustrations/chap9_sub2_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('里', 'リ', 'さと', 'sato', 'LÝ', 'Làng quê, dặm đường', 7, '田 -> 土', 'ふるさとの 里山を なつかしく 思います。', 'Furusato no satoyama o natsukashiku omomimasu.', 'Tôi hoài niệm nhớ về ngọn đồi làng quê thân thương.', 'N4', 'Ruộng đất làng quê', 'Mảnh ruộng trên nền đất màu mỡ nơi làng quê chôn rau cắt rốn.', '🌾', v_ch9_id, 17, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('野', 'ヤ', 'の', 'no', 'DÃ', 'Cánh đồng hoang, hoang dã', 11, '里 -> 予', '野原に きれいな 花が 咲いています。', 'Nohara ni kirei na hana ga saiteimasu.', 'Trên cánh đồng hoang những bông hoa dại nở rộ tuyệt đẹp.', 'N4', 'Đồng nội làng quê', 'Vùng đất làng quê ban tặng hoa cỏ hoang sơ rộng mở.', '🌼', v_ch9_id, 18, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('奥', 'オウ', 'おく', 'oku', 'ÁO', 'Sâu thẳm, phía trong cùng', 12, '宀 -> 米 -> 大', '山奥の 温泉宿に とまりました。', 'Yamaoku no onsenyado ni tomarimashita.', 'Tôi trọ lại tại một quán suối khoáng sâu trong lòng núi.', 'N4', 'Góc sâu trong nhà', 'Góc sâu kín đáo nhất dưới mái nhà cất giữ hạt gạo quý.', '🏔️', v_ch9_id, 19, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('池', 'チ', 'いけ', 'ike', 'TRÌ', 'Cái ao, hồ nhỏ', 6, '氵 -> 也', '公園の 小さな 池に こいが 泳いでいます。', 'Kouen no chiisana ike ni koi ga oyoideimasu.', 'Những chú cá chép bơi lội trong hồ nhỏ công viên.', 'N4', 'Ao nước bên bờ', 'Làn nước tĩnh lặng đọng lại thành chiếc ao xinh xắn.', '🐟', v_ch9_id, 20, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('虫', 'チュウ', 'むし', 'mushi', 'TRÙNG', 'Côn trùng, sâu bọ', 6, '中 -> 丶', 'めずらしい 昆虫を つかまえました。', 'Mezurashii konchuu o tsukamaemashita.', 'Tôi đã bắt được một con côn trùng hiếm gặp.', 'N4', 'Con sâu uốn mình', 'Chú sâu nhỏ đang cuộn mình bò trên lá cây.', '🐛', v_ch9_id, 21, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('羽', 'ウ', 'は, はね', 'hane', 'VŨ', 'Lông vũ, cánh chim (đếm chim)', 6, '习 x 2', 'カラスが 羽を ばさばさと はばたかせました。', 'Karasu ga hane o basabasa to habatakasemashita.', 'Chú quạ vỗ đôi cánh phần phật bay vút lên.', 'N4', 'Đôi cánh chim', 'Hai cánh chim xòe ra bay lượn tự do giữa bầu trời.', '🪶', v_ch9_id, 22, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鳴', 'メイ', 'な・く, な・る', 'na', 'MINH', 'Hót, kêu, reo vang', 14, '口 -> 鳥', '朝 庭で 小鳥が 美しく 鳴いています。', 'Asa niwa de kotori ga utsukushiku naiteimasu.', 'Buổi sáng đàn chim nhỏ hót véo von trong vườn.', 'N4', 'Tiếng chim hót', 'Cái miệng chú chim nhỏ cất tiếng reo hót rộn ràng.', '🐦', v_ch9_id, 23, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('馬', 'バ', 'うま', 'uma', 'MÃ', 'Con ngựa', 10, '馬', '友だちに さそわれて 乗馬を しました。', 'Tomodachi ni sasowarete jouba o shimashita.', 'Tôi được bạn bè rủ đi cưỡi ngựa.', 'N4', 'Chiếc bờm và bốn chân ngựa', 'Con ngựa dũng mãnh tung vó phi nhanh bờm bay trong gió.', '🐎', v_ch9_id, 24, '/assets/kanji/n4/illustrations/chap9_sub3_illus.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N4', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
END $$;

-- 3. SEED KANJI CHAPTER VOCABULARY
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '家族', 'かぞく', 'kazoku', 'Gia đình', 'Family', 1, NOW()),
        (v_ch_id, '兄弟', 'きょうだい', 'kyoudai', 'Anh em trong nhà', 'Brothers / Siblings', 2, NOW()),
        (v_ch_id, '姉妹', 'しまい', 'shimai', 'Chị em gái', 'Sisters', 3, NOW()),
        (v_ch_id, '両親', 'りょうしん', 'ryoushin', 'Bố mẹ', 'Parents', 4, NOW()),
        (v_ch_id, '育児', 'いくじ', 'ikuji', 'Chăm sóc và nuôi dạy con cái', 'Childcare', 5, NOW()),
        (v_ch_id, '私立', 'しりつ', 'shiritsu', 'Dân lập, tư thục', 'Private (school)', 6, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '店員', 'てんいん', 'ten-in', 'Nhân viên cửa hàng', 'Clerk / Shop assistant', 1, NOW()),
        (v_ch_id, 'お客さん', 'おきゃくさん', 'okyaku-san', 'Khách hàng', 'Customer / Guest', 2, NOW()),
        (v_ch_id, '親切', 'しんせつ', 'shinsetsu', 'Thân thiện, tốt bụng', 'Kind / Helpful', 3, NOW()),
        (v_ch_id, '売店', 'ばいてん', 'baiten', 'Quầy bán đồ, ki-ốt', 'Kiosk / Stall', 4, NOW()),
        (v_ch_id, 'お弁当', 'おべんとう', 'obentou', 'Cơm hộp Bento', 'Box lunch', 5, NOW()),
        (v_ch_id, '便利', 'べんり', 'benri', 'Tiện lợi, thuận tiện', 'Convenient', 6, NOW()),
        (v_ch_id, '朝食', 'ちょうしょく', 'choushoku', 'Bữa ăn sáng', 'Breakfast', 7, NOW()),
        (v_ch_id, '昼食', 'ちゅうしょく', 'chuushoku', 'Bữa ăn trưa', 'Lunch', 8, NOW()),
        (v_ch_id, '夜中', 'よなか', 'yonaka', 'Nửa đêm, lúc đêm khuya', 'Midnight', 9, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '荷物', 'にもつ', 'nimotsu', 'Bưu kiện, hành lý', 'Luggage / Package', 1, NOW()),
        (v_ch_id, '速達', 'そくたつ', 'sokutatsu', 'Chuyển phát nhanh', 'Express delivery', 2, NOW()),
        (v_ch_id, '宅急便', 'たっきゅうびん', 'takkyuubin', 'Dịch vụ giao hàng tận nhà', 'Home delivery service', 3, NOW()),
        (v_ch_id, '住所', 'じゅうしょ', 'juusho', 'Địa chỉ cư trú', 'Address', 4, NOW()),
        (v_ch_id, '番号', 'ばんごう', 'bangou', 'Số thứ tự, số hiệu', 'Number', 5, NOW()),
        (v_ch_id, '都道府県', 'とどうふけん', 'todoufuken', 'Các tỉnh thành phố Nhật Bản', 'Prefectures of Japan', 6, NOW()),
        (v_ch_id, '市役所', 'しやくしょ', 'shiyakusho', 'Tòa thị chính thành phố', 'City hall', 7, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '毎週', 'まいしゅう', 'maishuu', 'Mỗi tuần, hàng tuần', 'Every week', 1, NOW()),
        (v_ch_id, '映画館', 'えいがかん', 'eigakan', 'Rạp chiếu phim', 'Movie theater', 2, NOW()),
        (v_ch_id, '公園', 'こうえん', 'kouen', 'Công viên dạo mát', 'Park', 3, NOW()),
        (v_ch_id, '夫婦', 'ふうふ', 'fuufu', 'Vợ chồng', 'Married couple', 4, NOW()),
        (v_ch_id, '特別', 'とくべつ', 'tokubetsu', 'Đặc biệt', 'Special', 5, NOW()),
        (v_ch_id, '料理', 'りょうり', 'ryouri', 'Món ăn, nấu nướng', 'Cooking / Cuisine', 6, NOW()),
        (v_ch_id, '洋服', 'ようふく', 'youfuku', 'Quần áo âu phục', 'Western clothes', 7, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '駅員', 'えきいん', 'eki-in', 'Nhân viên nhà ga', 'Station staff', 1, NOW()),
        (v_ch_id, '地下鉄', 'ちかてつ', 'chikatetsu', 'Tàu điện ngầm', 'Subway / Metro', 2, NOW()),
        (v_ch_id, '交差点', 'こうさてん', 'kousaten', 'Ngã tư đường phố', 'Intersection', 3, NOW()),
        (v_ch_id, '信号', 'しんごう', 'shingou', 'Đèn tín hiệu giao thông', 'Traffic lights', 4, NOW()),
        (v_ch_id, '病院', 'びょういん', 'byouin', 'Bệnh viện', 'Hospital', 5, NOW()),
        (v_ch_id, '医師', 'いし', 'ishi', 'Bác sĩ', 'Doctor / Physician', 6, NOW()),
        (v_ch_id, '薬局', 'やっきょく', 'yakkyoku', 'Hiệu thuốc', 'Pharmacy', 7, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '研究', 'けんきゅう', 'kenkyuu', 'Nghiên cứu khoa học', 'Research', 1, NOW()),
        (v_ch_id, '英文', 'えいぶん', 'eibun', 'Câu văn tiếng Anh', 'English sentence', 2, NOW()),
        (v_ch_id, '若者', 'わかもの', 'wakamono', 'Giới trẻ, thanh niên', 'Young people', 3, NOW()),
        (v_ch_id, '合コン', 'ごうコン', 'goukon', 'Buổi gặp gỡ giao lưu sinh viên', 'Group blind date', 4, NOW()),
        (v_ch_id, '音楽', 'おんがく', 'ongaku', 'Âm nhạc', 'Music', 5, NOW()),
        (v_ch_id, '味見', 'あじみ', 'ajimi', 'Nếm thử mùi vị', 'Taste testing', 6, NOW()),
        (v_ch_id, '小麦粉', 'こむぎこ', 'komugiko', 'Bột mì', 'Wheat flour', 7, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '春夏秋冬', 'しゅんかしゅうとう', 'shunkashuutou', 'Bốn mùa xuân hạ thu đông', 'Four seasons', 1, NOW()),
        (v_ch_id, '青空', 'あおぞら', 'aozora', 'Bầu trời trong xanh', 'Blue sky', 2, NOW()),
        (v_ch_id, '晴天', 'せいてん', 'seiten', 'Thời tiết nắng đẹp', 'Fine weather', 3, NOW()),
        (v_ch_id, '台風', 'たいふう', 'taifuu', 'Cơn bão lớn', 'Typhoon', 4, NOW()),
        (v_ch_id, '旅行', 'りょこう', 'ryokou', 'Chuyến đi du lịch', 'Travel / Trip', 5, NOW()),
        (v_ch_id, '世界', 'せかい', 'sekai', 'Thế giới', 'World', 6, NOW()),
        (v_ch_id, '写真', 'しゃしん', 'shashin', 'Bức ảnh chụp', 'Photograph', 7, NOW()),
        (v_ch_id, '客船', 'きゃくせん', 'kyakusen', 'Tàu thủy chở khách', 'Passenger ship', 8, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '勉強', 'べんきょう', 'benkyou', 'Học tập', 'Study', 1, NOW()),
        (v_ch_id, '漢字', 'かんじ', 'kanji', 'Chữ Hán Kanji', 'Chinese characters', 2, NOW()),
        (v_ch_id, '宿題', 'しゅくだい', 'shukudai', 'Bài tập về nhà', 'Homework', 3, NOW()),
        (v_ch_id, '質問', 'しつもん', 'shitsumon', 'Câu hỏi thắc mắc', 'Question', 4, NOW()),
        (v_ch_id, '試験', 'しけん', 'shiken', 'Kỳ thi, bài kiểm tra', 'Examination', 5, NOW()),
        (v_ch_id, '正解', 'せいかい', 'seikai', 'Đáp án chính xác', 'Correct answer', 6, NOW()),
        (v_ch_id, '政治', 'せいじ', 'seiji', 'Chính trị', 'Politics', 7, NOW()),
        (v_ch_id, '経済', 'けいざい', 'keizai', 'Kinh tế học', 'Economics', 8, NOW()),
        (v_ch_id, '歴史', 'れきし', 'rekishi', 'Lịch sử', 'History', 9, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '運動', 'うんどう', 'undou', 'Vận động, thể dục thể thao', 'Exercise / Sports', 1, NOW()),
        (v_ch_id, '水泳', 'すいえい', 'suiei', 'Môn bơi lội', 'Swimming', 2, NOW()),
        (v_ch_id, '才能', 'さいのう', 'sainou', 'Tài năng thiên phú', 'Talent', 3, NOW()),
        (v_ch_id, '自然', 'しぜん', 'shizen', 'Thiên nhiên tươi đẹp', 'Nature', 4, NOW()),
        (v_ch_id, '草原', 'そうげん', 'sougen', 'Thảo nguyên bao la', 'Grassland', 5, NOW()),
        (v_ch_id, '田舎', 'いなか', 'inaka', 'Vùng nông thôn quê hương', 'Countryside', 6, NOW()),
        (v_ch_id, '乗馬', 'じょうば', 'jouba', 'Cưỡi ngựa thể thao', 'Horseback riding', 7, NOW());
    END IF;
END $$;

-- 4. SEED KANJI EXERCISES (READING & WRITING)
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '子どものころ よく 兄弟げんかを しました。', '兄弟', 'きょうだい', '["きょうだい", "けいだい", "おとうと", "あに"]', 'Chữ 兄 (HUYNH) + 弟 (ĐỆ) đọc là きょうだい (anh em).', 1, NOW()),
        (v_ch_id, 'READING', 'お兄さんは 何時に 帰ってきますか。', 'お兄さん', 'おにいさん', '["おにいさん", "おとうとさん", "おじさん", "おやさん"]', 'Chữ 兄 đọc Kun là あに, khi gọi tôn kính là おにいさん.', 2, NOW()),
        (v_ch_id, 'READING', '山川さんは いなかで 育ちました。', '育ちました', 'そだちました', '["そだちました", "たちました", "まちました", "もちました"]', 'Động từ 育つ đọc là そだつ (lớn lên, trưởng thành).', 3, NOW()),
        (v_ch_id, 'WRITING', 'あには アメリカに りゅう学しています。', 'あに', '兄', '["兄", "弟", "父", "私"]', 'Anh trai là chữ 兄 (HUYNH).', 4, NOW()),
        (v_ch_id, 'WRITING', 'おとうとは 今年 小学生に なりました。', 'おとうと', '弟', '["弟", "兄", "子", "男"]', 'Em trai là chữ 弟 (ĐỆ).', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', 'コンビニは 品数が 多くて とても 便利です。', '便利', 'べんり', '["べんり", "びんり", "てんり", "ゆうり"]', 'Chữ 便 (TIỆN) + 利 (LỢI) đọc là べんり.', 1, NOW()),
        (v_ch_id, 'READING', 'あしたの 朝食は いつも パンと コーヒーです。', '朝食', 'ちょうしょく', '["ちょうしょく", "あさしょく", "ちゅうしょく", "ゆうしょく"]', 'Chữ 朝 (TRIÊU) + 食 (THỰC) đọc âm On là ちょうしょく.', 2, NOW()),
        (v_ch_id, 'READING', '新しい CDが 百万まい 売れました。', '売れました', 'うれました', '["うれました", "かいました", "はらいました", "きれました"]', 'Động từ 売れる đọc là うれる (bán chạy, được bán ra).', 3, NOW()),
        (v_ch_id, 'WRITING', 'てんいんが ていねいに せつめいしてくれました。', 'てんいん', '店員', '["店員", "会社員", "会員", "役員"]', 'Nhân viên tiệm là 店 (TIẾM) + 員 (VIÊN) -> 店員.', 4, NOW()),
        (v_ch_id, 'WRITING', 'こんばん 9時から ドラマを 見ます。', 'こんばん', '今晩', '["今晩", "今朝", "今日", "今夜"]', 'Tối nay là 今 (KIM) + 晩 (VÃN) -> 今晩.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '速達で 書類を 送りました。', '速達', 'そくたつ', '["そくたつ", "はやたつ", "ちょうたつ", "きゅうたつ"]', 'Chữ 速 (TỐC) + 達 (ĐẠT) đọc là そくたつ (chuyển phát nhanh).', 1, NOW()),
        (v_ch_id, 'READING', '宅急便で 荷物が とどきました。', '宅急便', 'たっきゅうびん', '["たっきゅうびん", "たくきゅうべん", "いえきゅうびん", "やっきゅうびん"]', 'Dịch vụ giao hàng tận nhà đọc là たっきゅうびん.', 2, NOW()),
        (v_ch_id, 'READING', '京都は 古い お寺が たくさん あります。', '京都', 'きょうと', '["きょうと", "とうきょう", "みやこ", "けいと"]', 'Chữ 京 (KINH) + 都 (ĐÔ) đọc là きょうと.', 3, NOW()),
        (v_ch_id, 'WRITING', 'でんわばんごうを おしえてください。', 'ばんごう', '番号', '["番号", "号数", "地番", "順番"]', 'Số hiệu là 番 (PHIÊN) + 号 (HIỆU) -> 番号.', 4, NOW()),
        (v_ch_id, 'WRITING', '私の むらには コンビニが ありません。', 'むら', '村', '["村", "町", "市", "区"]', 'Thôn làng là chữ 村 (THÔN).', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '毎週 日曜日に 映画館へ 行きます。', '映画館', 'えいがかん', '["えいがかん", "えがかん", "ががかん", "ずしょかん"]', 'Chữ 映 (ÁNH) + 画 (HỌA) + 館 (QUÁN) đọc là えいがかん.', 1, NOW()),
        (v_ch_id, 'READING', 'けっこんきねん日は 特別な 日です。', '特別', 'とくべつ', '["とくべつ", "とくわけ", "とくぶん", "とくべん"]', 'Chữ 特 (ĐẶC) + 別 (BIỆT) đọc là とくべつ.', 2, NOW()),
        (v_ch_id, 'READING', 'デパートで 洋服を 買いました。', '洋服', 'ようふく', '["ようふく", "うみふく", "たいふく", "せいふく"]', 'Âu phục là chữ 洋 (DƯƠNG) + 服 (PHỤC) -> ようふく.', 3, NOW()),
        (v_ch_id, 'WRITING', 'てんきが いいので こうえんを さんぽします。', 'こうえん', '公園', '["公園", "庭園", "動物園", "遊園"]', 'Công viên là chữ 公 (CÔNG) + 園 (VIÊN) -> 公園.', 4, NOW()),
        (v_ch_id, 'WRITING', 'おっとは りょうりが とても 上手です。', 'おっと', '夫', '["夫", "妻", "父", "兄"]', 'Chồng là chữ 夫 (PHU), đọc Kun là おっと.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '地下鉄に 乗って 通勤します。', '地下鉄', 'ちかてつ', '["ちかてつ", "じかてつ", "ちげてつ", "ちかかね"]', 'Tàu điện ngầm là 地 (ĐỊA) + 下 (HẠ) + 鉄 (THIẾT) -> ちかてつ.', 1, NOW()),
        (v_ch_id, 'READING', '大きな 交差点で 止まります。', '交差点', 'こうさてん', '["こうさてん", "まじさてん", "こうさじょ", "こうさてい"]', 'Ngã tư đường phố là 交 (GIAO) + 差 (SAI) + 点 (ĐIỂM) -> こうさてん.', 2, NOW()),
        (v_ch_id, 'READING', '病院へ 行って 診察を うけます。', '病院', 'びょういん', '["びょういん", "やまいん", "びょうえん", "いいん"]', 'Bệnh viện là 病 (BỆNH) + 院 (VIỆN) -> びょういん.', 3, NOW()),
        (v_ch_id, 'WRITING', 'つぎの えきで でんしゃを おります。', 'えき', '駅', '["駅", "鉄", "道", "港"]', 'Nhà ga tàu là chữ 駅 (DỊCH).', 4, NOW()),
        (v_ch_id, 'WRITING', 'しょくごに くすりを のんでください。', 'くすり', '薬', '["薬", "草", "茶", "飯"]', 'Thuốc men là chữ 薬 (DƯỢC), đọc Kun là くすり.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '大学で 日本語を 研究しています。', '研究', 'けんきゅう', '["けんきゅう", "とぎゅう", "けんきゅ", "とぎゅ"]', 'Nghiên cứu là 研 (NGHIÊN) + 究 (CỨU) -> けんきゅう.', 1, NOW()),
        (v_ch_id, 'READING', '若い 人たちが カラオケに 集まりました。', '若者', 'わかもの', '["わかもの", "じゃくしゃ", "わかひと", "じゃくもの"]', 'Giới trẻ là chữ 若 (NHƯỢC) + 者 (GIẢ) -> わかもの.', 2, NOW()),
        (v_ch_id, 'READING', 'この ラーメンは スープの 味が 深いです。', '味', 'あじ', '["あじ", "み", "あじわい", "かおり"]', 'Hương vị là chữ 味 (VỊ), đọc Kun là あじ.', 3, NOW()),
        (v_ch_id, 'WRITING', 'おんがくを ききながら べんきょうします。', 'おんがく', '音楽', '["音楽", "声楽", "歌楽", "音響"]', 'Âm nhạc là 音 (ÂM) + 楽 (LẠC/NHẠC) -> 音楽.', 4, NOW()),
        (v_ch_id, 'WRITING', 'こむぎこで うどんを つくります。', 'こむぎこ', '小麦粉', '["小麦粉", "大麦粉", "米粉", "麦粉"]', 'Bột mì là 小 (TIỂU) + 麦 (MẠCH) + 粉 (PHẤN) -> 小麦粉.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '青空が 広がって 気持ちいいです。', '青空', 'あおぞら', '["あおぞら", "せいそう", "あおそら", "せいくう"]', 'Bầu trời xanh trong vắt là 青 (THANH) + 空 (KHÔNG) -> あおぞら.', 1, NOW()),
        (v_ch_id, 'READING', '明日は 晴れたら ハイキングに 行きます。', '晴れたら', 'はれたら', '["はれたら", "あけたら", "きれたら", "さめたら"]', 'Trời nắng đẹp là động từ 晴れる -> はれる.', 2, NOW()),
        (v_ch_id, 'READING', '世界一周の 船旅に 行きたいです。', '船旅', 'ふなたび', '["ふなたび", "せんりょ", "ふねりょ", "せんたび"]', 'Chuyến du ngoạn bằng tàu thuyền là 船 (THUYỀN) + 旅 (LỮ) -> ふなたび.', 3, NOW()),
        (v_ch_id, 'WRITING', 'なつやすみは うみで およぎます。', 'なつやすみ', '夏休み', '["夏休み", "春休み", "冬休み", "秋休み"]', 'Kỳ nghỉ hè là 夏 (HẠ) + 休み (HƯU) -> 夏休み.', 4, NOW()),
        (v_ch_id, 'WRITING', 'はなの しゃしんを とるのが すきです。', 'しゃしん', '写真', '["写真", "真写", "図面", "絵画"]', 'Bức ảnh chụp là 写 (TẢ) + 真 (CHÂN) -> 写真.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '漢字の 勉強は とても 大切です。', '勉強', 'べんきょう', '["べんきょう", "めんきょう", "べんこう", "つとめきょう"]', 'Học tập là 勉 (MIỄN) + 強 (CƯỜNG) -> べんきょう.', 1, NOW()),
        (v_ch_id, 'READING', '分からない ことを 先生に 質問します。', '質問', 'しつもん', '["しつもん", "しちもん", "しつとい", "ちつもん"]', 'Đặt câu hỏi là 質 (CHẤT) + 問 (VẤN) -> しつもん.', 2, NOW()),
        (v_ch_id, 'READING', '正しい 答えを えらんでください。', '答え', 'こたえ', '["こたえ", "とうえ", "とい", "こたえい"]', 'Câu trả lời, đáp án là 答え -> こたえ.', 3, NOW()),
        (v_ch_id, 'WRITING', 'きょうの しゅくだいを すぐに おわらせます。', 'しゅくだい', '宿題', '["宿題", "問題", "課題", "話題"]', 'Bài tập về nhà là 宿 (TÚC) + 題 (ĐỀ) -> 宿題.', 4, NOW()),
        (v_ch_id, 'WRITING', 'JLPTの しけんを うけます。', 'しけん', '試験', '["試験", "実験", "体験", "受験"]', 'Kỳ thi là 試 (THÍ) + 験 (NGHIỆM) -> 試験.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '毎朝 運動場を 走って 練習します。', '運動', 'うんどう', '["うんどう", "はこどう", "うんとう", "ぐんどう"]', 'Vận động thể thao là 運 (VẬN) + 動 (ĐỘNG) -> うんどう.', 1, NOW()),
        (v_ch_id, 'READING', '広い 草原で 馬が 走っています。', '草原', 'そうげん', '["そうげん", "くさはら", "くさばら", "そうはら"]', 'Thảo nguyên là 草 (THẢO) + 原 (NGUYÊN) -> そうげん.', 2, NOW()),
        (v_ch_id, 'READING', 'ふるさとの 里山を なつかしく 思います。', '里山', 'さとやま', '["さとやま", "りやま", "さとさん", "りさん"]', 'Ngọn đồi quê hương là 里 (LÝ) + 山 (SƠN) -> さとやま.', 3, NOW()),
        (v_ch_id, 'WRITING', 'プールで 500メートル およぎました。', 'およぎました', '泳ぎました', '["泳ぎました", "走りました", "歩きました", "渡りました"]', 'Bơi lội là động từ 泳ぐ (VỊNH) -> 泳ぎました.', 4, NOW()),
        (v_ch_id, 'WRITING', 'ゆたかな しぜんを まもりましょう。', 'しぜん', '自然', '["自然", "天然", "当然", "原然"]', 'Thiên nhiên là 自 (TỰ) + 然 (NHIÊN) -> 自然.', 5, NOW());
    END IF;
END $$;

-- 5. SEED KANJI MINIGAMES
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Ghép gia phả gia đình Tanaka', 'Nhìn tranh chân dung gia đình Tanaka và ghép đúng danh xưng chữ Hán (家, 族, 兄, 弟, 姉, 妹, 私).', '/assets/kanji/n4/minigames/chap1_family_tree.webp', '{"pairs": [{"kanji": "兄", "label": "Anh trai cả (sinh viên)", "slot": "top_left"}, {"kanji": "姉", "label": "Chị gái lớn (đã đi làm)", "slot": "top_right"}, {"kanji": "私", "label": "Tôi (nhân vật chính)", "slot": "mid_center"}, {"kanji": "弟", "label": "Em trai (học sinh cấp 2)", "slot": "mid_left"}, {"kanji": "妹", "label": "Em gái út (bé gái)", "slot": "bottom_center"}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 2: Nhật ký thời gian trong ngày', 'Sắp xếp các hoạt động trong ngày từ sáng sớm đến nửa đêm theo đúng thứ tự chữ Hán.', '/assets/kanji/n4/illustrations/chap1_sub1_illus.webp', '{"timeline": [{"order": 1, "text": "朝 早く 起きます (Sáng thức dậy sớm)", "kanji": "朝"}, {"order": 2, "text": "昼ご飯を 食べます (Ăn cơm trưa)", "kanji": "昼"}, {"order": 3, "text": "晩御飯を 作ります (Nấu bữa tối)", "kanji": "晩"}, {"order": 4, "text": "夜 10時に 寝ます (10h đêm đi ngủ)", "kanji": "夜"}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'CALCULATION', 'Minigame 1: Đọc hóa đơn tính tiền Conbini', 'Xem hóa đơn tính tiền mua sắm tại cửa hàng tiện lợi, tính tổng tiền và xác định tiền thừa.', '/assets/kanji/n4/minigames/chap2_conbini_register.webp', '{"receipt": {"items": [{"name": "お弁当 (Cơm hộp Bento)", "price": 550, "kanji": "当"}, {"name": "お茶 (Trà xanh)", "price": 150, "kanji": "品"}, {"name": "新聞 (Báo giấy)", "price": 120, "kanji": "紙"}], "paid": 1000, "correct_total": 820, "correct_change": 180}}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Lò vi sóng Conbini 24h', 'Chọn đúng nút điều khiển hâm nóng thức ăn và tính năng tiện ích trên lò vi sóng theo chữ Hán.', '/assets/kanji/n4/minigames/chap2_conbini_24hours.webp', '{"buttons": [{"kanji": "当", "label": "Hâm nóng cơm hộp (お弁当)", "icon": "🍱"}, {"kanji": "便", "label": "Chế độ tiện lợi nhanh", "icon": "⚡"}, {"kanji": "早", "label": "Rã đông cấp tốc", "icon": "⏱️"}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'POSTCARD_FILL', 'Minigame 1: Điền phiếu chuyển phát Takkyubin', 'Điền chính xác các mục thông tin trên phiếu gửi hàng bưu phẩm (Người nhận, Địa chỉ, Số phòng, Ngày giờ hẹn).', '/assets/kanji/n4/minigames/chap3_takkyubin_delivery.webp', '{"fields": [{"label": "お名前 (Tên người nhận)", "target": "様", "hint": "Gắn sau tên người nhận để thể hiện sự tôn kính"}, {"label": "ご住所 (Địa chỉ nhà)", "target": "所", "hint": "Chữ Hán chỉ nơi chốn cư trú"}, {"label": "部屋 (Số phòng)", "target": "号", "hint": "Chữ Hán số hiệu phòng trong chung cư"}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Bản đồ 47 tỉnh thành Nhật Bản', 'Nhìn bản đồ Nhật Bản và ghép đúng các cấp đơn vị hành chính (Đô, Đạo, Phủ, Huyện).', '/assets/kanji/n4/minigames/chap3_japan_prefectures.webp', '{"regions": [{"name": "Tokyo (Thủ đô)", "kanji": "都", "type": "東京都"}, {"name": "Hokkaido (Đạo)", "kanji": "道", "type": "北海道"}, {"name": "Osaka (Phủ)", "kanji": "府", "type": "大阪府"}, {"name": "Kanagawa (Tỉnh/Huyện)", "kanji": "県", "type": "神奈川県"}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 1: Lên lịch hẹn xem phim & dạo phố', 'Sắp xếp các bước chuẩn bị cho buổi hẹn hò cuối tuần từ rạp chiếu phim đến công viên.', '/assets/kanji/n4/minigames/chap4_date_appointment.webp', '{"steps": [{"order": 1, "text": "毎週の よていを かくにん (Kiểm tra lịch tuần)", "kanji": "週"}, {"order": 2, "text": "映画館の チケットを よやく (Đặt vé rạp chiếu phim)", "kanji": "映"}, {"order": 3, "text": "公園を ふたりで さんぽ (Dạo bước ở công viên)", "kanji": "園"}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Ga xe điện & Biển chỉ dẫn', 'Nhận diện các biển báo đường sắt tại nhà ga và chọn đúng cửa ra, sân ga tàu.', '/assets/kanji/n4/minigames/chap5_train_station.webp', '{"signs": [{"kanji": "駅", "label": "Nhà ga (えき)"}, {"kanji": "乗", "label": "Cửa lên tàu (乗車口)"}, {"kanji": "降", "label": "Cửa xuống tàu (降車口)"}, {"kanji": "止", "label": "Dừng lại (止まれ)"}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Thực đơn tiệm mì Ramen', 'Đọc thực đơn quán mì Ramen và chọn đúng tùy chọn sợi mì to/nhỏ và nước dùng béo/thanh.', '/assets/kanji/n4/minigames/chap6_ramen_counter.webp', '{"options": [{"kanji": "太", "label": "Sợi mì to dày (太麺)"}, {"kanji": "細", "label": "Sợi mì mảnh (細麺)"}, {"kanji": "油", "label": "Gia vị dầu mè thơm (ごま油)"}, {"kanji": "味", "label": "Nêm nếm hương vị đậm đà"}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Dự báo thời tiết bốn mùa', 'Ghép các biểu tượng dự báo thời tiết với các chữ Hán tương ứng.', '/assets/kanji/n4/minigames/chap7_weather_forecast.webp', '{"weather_icons": [{"kanji": "晴", "label": "Trời nắng quang đãng", "icon": "☀️"}, {"kanji": "雲", "label": "Nhiều mây râm mát", "icon": "☁️"}, {"kanji": "雪", "label": "Tuyết rơi mùa đông", "icon": "❄️"}, {"kanji": "風", "label": "Gió bão lớn", "icon": "💨"}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 1: Thời khóa biểu & Kế hoạch ôn thi', 'Sắp xếp các bước trong quy trình ôn tập kiểm tra tiếng Nhật.', '/assets/kanji/n4/minigames/chap8_study_classroom.webp', '{"schedule": [{"order": 1, "text": "漢字の 勉強を はじめる (Bắt đầu học chữ Hán)", "kanji": "漢"}, {"order": 2, "text": "宿題の 質問を 先生にする (Đặt câu hỏi bài tập về nhà)", "kanji": "質"}, {"order": 3, "text": "試験の 答えを かくにんする (Kiểm tra đáp án bài thi)", "kanji": "験"}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N4' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Thế vận hội thể thao & Thiên nhiên', 'Khám phá các môn thể thao dã ngoại bên bờ biển và núi đồi thôn quê.', '/assets/kanji/n4/minigames/chap9_sports_stadium.webp', '{"sports": [{"kanji": "走", "label": "Chạy bộ điền kinh (走る)"}, {"kanji": "泳", "label": "Bơi lội bãi biển (泳ぐ)"}, {"kanji": "歩", "label": "Đi bộ leo núi (歩く)"}, {"kanji": "馬", "label": "Cưỡi ngựa dã ngoại (乗馬)"}]}', 1, NOW());
    END IF;
END $$;

-- 6. SEED N4 ACHIEVEMENT TESTS (STAGES 4, 5, 6)
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(4, 'Achievement Test 1 (Chương 1 ~ 3)', 'Đề thi tổng hợp kiểm tra 53 chữ Hán từ Chương 1 đến Chương 3 (Đời sống gia đình, Cửa hàng tiện lợi 24h, Bưu phẩm quà tặng)', 85, '{"stage_level": "N4", "coverage": "Chương 1 ~ 3", "total_questions": 20, "questions": [{"q": "あには アメリカに りゅうがくしています。", "target": "あに", "answer": "兄", "options": ["兄", "弟", "父", "友"]}, {"q": "コンビニは 品数が 多くて とても 便利です。", "target": "便利", "answer": "べんり", "options": ["べんり", "びんり", "てんり", "ゆうり"]}, {"q": "宅急便で 荷物が とどきました。", "target": "宅急便", "answer": "たっきゅうびん", "options": ["たっきゅうびん", "たくきゅうべん", "いえきゅうびん", "やっきゅうびん"]}, {"q": "東京都には 23の 区が あります。", "target": "都", "answer": "と", "options": ["と", "つ", "みやこ", "きょう"]}, {"q": "あさ 5時に おきて ジョギングを しました。", "target": "あさ", "answer": "朝", "options": ["朝", "昼", "晩", "夜"]}]}', 4, NOW())
ON CONFLICT DO NOTHING;

INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(5, 'Achievement Test 2 (Chương 4 ~ 6)', 'Đề thi tổng hợp kiểm tra 69 chữ Hán từ Chương 4 đến Chương 6 (Hẹn hò rạp phim, Nhà ga giao thông, Đời sống sinh viên đại học)', 85, '{"stage_level": "N4", "coverage": "Chương 4 ~ 6", "total_questions": 20, "questions": [{"q": "毎週 日曜日に 映画館へ 行きます。", "target": "映画館", "answer": "えいがかん", "options": ["えいがかん", "えがかん", "ずしょかん", "びじゅつかん"]}, {"q": "地下鉄に 乗って 通勤します。", "target": "地下鉄", "answer": "ちかてつ", "options": ["ちかてつ", "じかてつ", "ちかかね", "ちかしゃ"]}, {"q": "大きな 交差点で 止まります。", "target": "交差点", "answer": "こうさてん", "options": ["こうさてん", "まじさてん", "こうさじょ", "こうさてい"]}, {"q": "大学で 日本語を 研究しています。", "target": "研究", "answer": "けんきゅう", "options": ["けんきゅう", "とぎゅう", "けんきゅ", "とぎゅ"]}, {"q": "病院へ 行って 診察を うけます。", "target": "病院", "answer": "びょういん", "options": ["びょういん", "やまいん", "びょうえん", "いいん"]}]}', 5, NOW())
ON CONFLICT DO NOTHING;

INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(6, 'Achievement Test 3 (Chương 7 ~ 9) & Kỳ thi Tốt Nghiệp N4', 'Kỳ thi Tốt Nghiệp Toàn Diện N4 bao quát 181+ chữ Hán, câu ngữ cảnh và minigame tình huống đời sống Nhật Bản', 85, '{"stage_level": "N4", "coverage": "Chương 1 ~ 9 Toàn Diện", "total_questions": 35, "questions": [{"q": "青空が 広がって 気持ちいいです。", "target": "青空", "answer": "あおぞら", "options": ["あおぞら", "せいそう", "あおそら", "せいくう"]}, {"q": "明日は 晴れたら ハイキングに 行きます。", "target": "晴れたら", "answer": "はれたら", "options": ["はれたら", "あけたら", "きれたら", "さめたら"]}, {"q": "漢字の 勉強は とても 大切です。", "target": "勉強", "answer": "べんきょう", "options": ["べんきょう", "めんきょう", "べんこう", "つとめきょう"]}, {"q": "毎朝 運動場を 走って 練習します。", "target": "運動", "answer": "うんどう", "options": ["うんどう", "はこどう", "うんとう", "ぐんどう"]}, {"q": "ふるさとの 里山を なつかしく 思います。", "target": "里山", "answer": "さとやま", "options": ["さとやま", "りやま", "さとさん", "りさん"]}]}', 6, NOW())
ON CONFLICT DO NOTHING;
