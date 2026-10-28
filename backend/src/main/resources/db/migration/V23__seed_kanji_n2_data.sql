-- =============================================================================
-- Flyway Migration: V23 - Seed 100% Authentic Kanji Master N2 Full Dataset
-- 18 Chapters (基本編 & 挑戦編), 505 Kanjis, Chapter Vocab, Exercises, Minigames & Tests
-- =============================================================================

-- 1. SEED 18 CHƯƠNG KANJI MASTER N2
INSERT INTO kanji_chapters (chapter_number, jlpt_level, title_ja, title_vi, title_en, kanji_count, display_order, illustration_url, description) VALUES
(1, 'N2', '生活-1', 'Đời sống, Quà tặng & Chuyển nhà', 'Daily Life 1: Gifts & Moving', 30, 1, '/assets/kanji/n2/illustrations/chap1_intro.webp', '30 chữ Hán về sinh hoạt thường nhật, quà tặng chuyển phát, nấu ăn, hợp đồng chuyển nhà, tạp chí và dọn dẹp: 配, 届, 渡, 券, 招, 贈, 含, 混, 溶, 汁, 丼, 盛, 契, 越, 貸, 仮, 証, 域, 雑, 誌, 刊, 並, 巻, 著, 居, 庭, 清, 掃, 整, 汚.'),
(2, 'N2', '町', 'Đô thị, Giao thông & Ngân hàng', 'Town: Transit, Industry & Banking', 30, 2, '/assets/kanji/n2/illustrations/chap2_intro.webp', '30 chữ Hán về giao thông đô thị, sản xuất xuất nhập khẩu, ngân hàng giao dịch tiền gửi, đổi tiền: 駐, 輪, 港, 到, 途, 過, 符, 停, 標, 普, 刻, 違, 漁, 輸, 製, 郵, 航, 融, 戻, 換, 払, 込, 両, 替, 照, 預, 札, 貨, 帳, 振.'),
(3, 'N2', '文化', 'Văn hóa, Hoa cỏ, Thời trang & Lịch sử', 'Culture, Flora, Fashion & History', 30, 3, '/assets/kanji/n2/illustrations/chap3_intro.webp', '30 chữ Hán về các loài hoa cây cảnh, tư thế trang phục, sắc thái vị giác, kịch nghệ, triển lãm và di tích lịch sử: 桜, 梅, 松, 杉, 美, 香, 脱, 掛, 姿, 勢, 柔, 軟, 固, 純, 快, 甘, 濃, 薄, 劇, 舞, 堂, 展, 宗, 恵, 宝, 城, 栄, 蔵, 昭, 士.'),
(4, 'N2', '健康-1', 'Sức khỏe, Cơ thể, Khám bệnh & Trị liệu', 'Health 1: Body, Examination & Treatment', 30, 4, '/assets/kanji/n2/illustrations/chap4_intro.webp', '30 chữ Hán về sinh mệnh cơ thể, lưng bụng ngực cơ bắp nội tạng, triệu chứng huyết áp và thủ thuật trị liệu y tế: 健, 康, 診, 療, 命, 異, 背, 腹, 肩, 腕, 胸, 腰, 脳, 臓, 胃, 筋, 骨, 節, 症, 状, 因, 況, 態, 圧, 傷, 処, 触, 針, 抜, 完.'),
(5, 'N2', '仕事', 'Thương trường, Tuyển dụng & Đánh giá', 'Work: Business, Recruitment & Evaluation', 30, 5, '/assets/kanji/n2/illustrations/chap5_intro.webp', '30 chữ Hán về đời sống công sở, tuyển dụng hồ sơ, phỏng vấn, khảo sát doanh nghiệp, đánh giá và cải thiện nghiệp vụ: 忙, 疲, 慣, 競, 養, 兼, 就, 従, 応, 筋, 課, 論, 採, 募, 履, 適, 般, 総, 企, 索, 依, 頼, 比, 較, 評, 価, 改, 善, 勤, 務.'),
(6, 'N2', '会社', 'Tài chính, Doanh nghiệp & Xuất bản', 'Company: Management, Finance & Publishing', 28, 6, '/assets/kanji/n2/illustrations/chap6_intro.webp', '28 chữ Hán về kinh doanh doanh nghiệp, cổ phiếu trái phiếu, doanh thu lợi nhuận, chiến lược mở rộng và xuất bản ấn phẩm: 営, 景, 資, 益, 株, 債, 販, 購, 値, 額, 財, 納, 増, 減, 損, 得, 拡, 縮, 略, 充, 加, 除, 余, 片, 裏, 幅, 版, 章.'),
(7, 'N2', 'ドラマ', 'Kịch tính, Cảm xúc & Tâm lý tình huống', 'Drama: Suspense, Romance & Psychology', 24, 7, '/assets/kanji/n2/illustrations/chap7_intro.webp', '24 chữ Hán về kịch tính hồi hộp, căng thẳng sợ hãi chia ly, ấn tượng lãng mạn, cám dỗ và số phận: 奪, 殺, 震, 迷, 暴, 恐, 緊, 張, 破, 割, 別, 離, 印, 象, 与, 齢, 箱, 際, 遊, 誘, 勧, 寄, 送, 占.'),
(8, 'N2', '人間関係-1', 'Quan hệ xã hội, Hợp tác & Kính ngữ 1', 'Interpersonal 1: Relationships, Teamwork & Keigo', 18, 8, '/assets/kanji/n2/illustrations/chap8_intro.webp', '18 chữ Hán về mối quan hệ xung quanh, tinh thần đồng đội giúp đỡ lẫn nhau và hệ thống kính ngữ - khiêm nhường ngữ cơ bản: 周, 囲, 協, 互, 共, 我, 皆, 緒, 援, 頼, 抱, 氏, 尊, 敬, 申, 参, 致, 御.'),
(9, 'N2', '自然-1', 'Địa hình ven biển, Vũ trụ & Môi trường', 'Nature 1: Terrain, Universe & Disasters', 24, 9, '/assets/kanji/n2/illustrations/chap9_intro.webp', '24 chữ Hán về bờ biển sông ngòi, nguồn nước khoáng, không gian vũ trụ Trái Đất, biến đổi môi trường và phòng chống thiên tai: 湾, 沖, 浜, 江, 層, 砂, 泉, 源, 浮, 沈, 井, 沢, 宇, 宙, 環, 境, 極, 昇, 災, 害, 震, 防, 影, 響.'),
(10, 'N2', '社会-1', 'Giáo dục, Pháp luật, An ninh & Chính trị', 'Society 1: Education, Law, Police & Politics', 36, 10, '/assets/kanji/n2/illustrations/chap10_intro.webp', '36 chữ Hán về giảng dạy học vị, điều lệnh pháp luật, cơ quan cảnh sát bắt giữ, bầu cử chính đảng và an ninh quốc phòng: 講, 義, 導, 専, 限, 修, 述, 将, 博, 策, 詩, 基, 条, 令, 司, 制, 省, 庁, 警, 察, 署, 捕, 守, 乱, 党, 民, 挙, 委, 権, 票, 攻, 撃, 爆, 討, 射, 武.'),
(11, 'N2', '生活-2', 'Nhà ở truyền thống, Bưu phẩm & Ẩm thực sâu', 'Daily Life 2: Housing, Mail, Seasonings & Traffic', 29, 11, '/assets/kanji/n2/illustrations/chap11_intro.webp', '29 chữ Hán về kiến trúc nhà ở Nhật (chiếu tatami, hành lang, ngõ xóm), thư từ phong bì, gia vị nêm nếm và ùn tắc giao thông: 畳, 床, 軒, 玄, 壁, 廊, 寮, 隣, 敷, 狭, 荘, 封, 筒, 歳, 宛, 菓, 詰, 瓶, 粒, 酢, 糖, 辛, 渋, 滞, 街, 往, 距, 灯, 専.'),
(12, 'N2', '働く', 'Công sở, Tính cách, Vẻ ngoài & Trang phục', 'Work 2: Office, Personality, Appearance & Fashion', 36, 12, '/assets/kanji/n2/illustrations/chap12_intro.webp', '36 chữ Hán về thiết bị văn phòng in ấn, từ ngữ biểu thị tính cách phẩm chất, chăm sóc diện mạo da tóc và thời trang giày mũ: 携, 即, 稼, 需, 拒, 厳, 刷, 枠, 縦, 斜, 端, 隅, 堅, 硬, 鋭, 鈍, 詳, 簡, 深, 頑, 勇, 賢, 偉, 珍, 肌, 粧, 髪, 脚, 華, 鏡, 帽, 傘, 革, 靴, 柄, 装.'),
(13, 'N2', '健康-2', 'Giấc ngủ, Sinh nở, Nhãn khoa & Dược phẩm', 'Health 2: Sleep, Childbirth, Medical Care & Medicine', 20, 13, '/assets/kanji/n2/illustrations/chap13_intro.webp', '20 chữ Hán về thói quen ngủ nghỉ, khói thuốc mỡ máu, thai sản sinh đôi nhịp mạch, khám mắt lưỡi và khử trùng thuốc trị liệu: 睡, 眠, 喫, 煙, 脂, 肪, 妊, 娠, 双, 誕, 脈, 拍, 看, 患, 視, 眼, 舌, 刺, 菌, 剤.'),
(14, 'N2', '自然-2', 'Hoa màu sắc, Động vật, Dòng nước & Mỏ khoáng', 'Nature 2: Flora, Fauna, Waters & Geology', 34, 14, '/assets/kanji/n2/illustrations/chap14_intro.webp', '34 chữ Hán về hoa lá héo tàn rực rỡ, sắc màu truyền thống, chăn nuôi thú cưng, thác nước đóng băng và khai khoáng quặng mỏ: 咲, 枯, 散, 飾, 菊, 枝, 紺, 紫, 紅, 灰, 鮮, 彩, 飼, 畜, 猫, 羊, 豚, 巣, 放, 牧, 滝, 沼, 滴, 凍, 瀬, 浄, 掘, 埋, 泥, 炭, 鉱, 銅, 穴, 洞.'),
(15, 'N2', '人間関係-2', 'Tiệc tùng, Bạn bè, Họ hàng & Kính ngữ sâu', 'Interpersonal 2: Banquets, Relations, Keigo & Etiquette', 38, 15, '/assets/kanji/n2/illustrations/chap15_intro.webp', '38 chữ Hán về mâu thuẫn khuyên giải, tiệc rượu thâu đêm, đồng nghiệp tiền bối, quan hệ ruột thịt và kính ngữ xã giao trang trọng: 殴, 叫, 怖, 嫌, 憎, 恥, 誤, 謝, 励, 冗, 提, 絶, 宴, 催, 渇, 酌, 泡, 吐, 騒, 延, 超, 更, 徹, 懐, 候, 僚, 輩, 誰, 偶, 孫, 祖, 似, 召, 拝, 了, 承, 伺, 頂.'),
(16, 'N2', '自然現象', 'Thiên tai, Sạt lở núi lửa & Thời tiết cực đoan', 'Natural Disasters, Extreme Weather & Climate', 18, 16, '/assets/kanji/n2/illustrations/chap16_intro.webp', '18 chữ Hán về thảm họa phá hủy đổ sập, núi lửa phun trào sóng thần, lũ lụt cuồng phong và thời tiết hanh khô ẩm ướt mát mẻ: 被, 壊, 傾, 崩, 噴, 炎, 洪, 潭, 波, 荒, 激, 吹, 乾, 燥, 湿, 涼, 宵, 嵐.'),
(17, 'N2', '社会-2', 'Nghệ thuật thơ ca, Tư pháp, Trật tự & Quân sự', 'Society 2: Arts, Justice, Crime & Defense', 35, 17, '/assets/kanji/n2/illustrations/chap17_intro.webp', '35 chữ Hán về thơ Haiku danh bạ thư tịch, nghệ thuật múa di tích, tội phạm điều tra xét xử, trật tự hiến pháp và vũ trang phòng vệ: 俳, 句, 詞, 覧, 簿, 塾, 踊, 像, 殿, 坊, 跡, 祈, 刑, 罰, 盗, 捜, 裁, 統, 衆, 秩, 序, 閣, 批, 敵, 砲, 領, 侵, 銃, 核, 護, 衛, 盟, 隊, 屈, 憲.'),
(18, 'N2', '地名', 'Địa danh Nhật Bản & Cách đọc quy ước', 'Place Names: Prefectures & Conventional Readings', 15, 18, '/assets/kanji/n2/illustrations/chap18_intro.webp', '15 chữ Hán xuất hiện trong địa danh các tỉnh thành Nhật Bản (Osaka, Saitama, Tochigi, Ibaraki, Gunma, v.v.) và cách đọc đặc biệt: 阪, 埼, 栃, 茨, 梨, 群, 鹿, 奈, 媛, 阜, 岡, 崎, 丘, 丁, 塚.')
ON CONFLICT (jlpt_level, chapter_number) DO UPDATE SET
    title_ja = EXCLUDED.title_ja,
    title_vi = EXCLUDED.title_vi,
    title_en = EXCLUDED.title_en,
    kanji_count = EXCLUDED.kanji_count,
    display_order = EXCLUDED.display_order,
    illustration_url = EXCLUDED.illustration_url,
    description = EXCLUDED.description;

-- 2. SEED 505 KANJIS LEVEL N2
DO $$
DECLARE
    v_ch1_id BIGINT; v_ch2_id BIGINT; v_ch3_id BIGINT; v_ch4_id BIGINT; v_ch5_id BIGINT; v_ch6_id BIGINT; v_ch7_id BIGINT; v_ch8_id BIGINT; v_ch9_id BIGINT; v_ch10_id BIGINT; v_ch11_id BIGINT; v_ch12_id BIGINT; v_ch13_id BIGINT; v_ch14_id BIGINT; v_ch15_id BIGINT; v_ch16_id BIGINT; v_ch17_id BIGINT; v_ch18_id BIGINT;
BEGIN
    SELECT id INTO v_ch1_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 1;
    SELECT id INTO v_ch2_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 2;
    SELECT id INTO v_ch3_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 3;
    SELECT id INTO v_ch4_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 4;
    SELECT id INTO v_ch5_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 5;
    SELECT id INTO v_ch6_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 6;
    SELECT id INTO v_ch7_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 7;
    SELECT id INTO v_ch8_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 8;
    SELECT id INTO v_ch9_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 9;
    SELECT id INTO v_ch10_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 10;
    SELECT id INTO v_ch11_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 11;
    SELECT id INTO v_ch12_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 12;
    SELECT id INTO v_ch13_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 13;
    SELECT id INTO v_ch14_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 14;
    SELECT id INTO v_ch15_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 15;
    SELECT id INTO v_ch16_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 16;
    SELECT id INTO v_ch17_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 17;
    SELECT id INTO v_ch18_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 18;

    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('配', 'ハイ', 'くば・る', 'kuba', 'PHỐI', 'Phân phát, bố trí', 10, '酉 -> 己', '荷物を 各家庭に 配達します。', 'Nimotsu o kaku katei ni haitatsushimasu.', 'Giao hàng đến từng gia đình.', 'N2', 'Chia rượu công bằng', 'Bình rượu chia đều cho mọi người.', '📦', v_ch1_id, 1, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('届', 'カイ', 'とど・く, とど・ける', 'todo', 'GIỚI', 'Đến nơi, trình báo', 8, '尸 -> 由', '手紙が 無事に 届きました。', 'Tegami ga buji ni todokimashita.', 'Lá thư đã được gửi đến nơi an toàn.', 'N2', 'Người đưa tin mang tin đến', 'Người mang tin tự do đến tận cửa nhà.', '📬', v_ch1_id, 2, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('渡', 'ト', 'わた・る, わた・す', 'wata', 'ĐỘ', 'Vượt qua, trao tay', 12, '氵 -> 度', '書類を 手渡しで 渡しました。', 'Shorui o tewatashi de watashimashita.', 'Trao tận tay tập tài liệu.', 'N2', 'Vượt dòng nước', 'Dòng nước chảy qua bao độ dặm đường.', '🤝', v_ch1_id, 3, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('券', 'ケン', '', 'ken', 'KHOÁN', 'Vé, phiếu chứng từ', 8, '龹 -> 刀', '電車の 乗車券を 買います。', 'Densha no joushaken o kaimasu.', 'Mua vé lên tàu điện.', 'N2', 'Cắt giấy thành phiếu', 'Dùng dao cắt tờ giấy thành vé chứng nhận.', '🎟️', v_ch1_id, 4, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('招', 'ショウ', 'まね・く', 'mane', 'CHIÊU', 'Mời gọi, chiêu đãi', 8, '扌 -> 召', '友人を 結婚式に 招待します。', 'Yuujin o kekkonshiki ni shoutaishimasu.', 'Mời bạn bè đến dự lễ cưới.', 'N2', 'Vẫy tay mời gọi', 'Bàn tay vẫy chào mời khách bước vào.', '👋', v_ch1_id, 5, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('贈', 'ゾウ, ソウ', 'おく・る', 'oku', 'TẶNG', 'Tặng thưởng, biếu quà', 18, '貝 -> 曽', 'お世話になった 方に 贈り物を 贈ります。', 'Osewa ni natta kata ni okurimono o okurimasu.', 'Tặng quà cho người đã giúp đỡ mình.', 'N2', 'Vỏ sò quý làm quà biếu', 'Tiền của vỏ sò quý gửi tặng ân nhân.', '🎁', v_ch1_id, 6, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('含', 'ガン', 'ふく・む, ふく・める', 'fuku', 'HÀM', 'Chứa đựng, bao hàm', 7, '今 -> 口', '消費税を 含む 金額を 表示します。', 'Shouhizei o fukumu kingaku o hyoujishimasu.', 'Hiển thị số tiền bao gồm thuế tiêu thụ.', 'N2', 'Ngậm trong miệng', 'Miệng đang ngậm giữ điều bí mật bên trong.', '📦', v_ch1_id, 7, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('混', 'コン', 'ま・じる, ま・ぜる, こ・む', 'ma', 'HỖN', 'Trộn lẫn, đông đúc', 11, '氵 -> 昆', '電車が 大変 混雑しています。', 'Densha ga taihen konzatsushiteimasu.', 'Tàu điện vô cùng đông đúc chật chội.', 'N2', 'Nước hòa lẫn muôn loài', 'Dòng nước hòa quyện tất cả vào nhau.', '👥', v_ch1_id, 8, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('溶', 'ヨウ', 'と・ける, と・かす', 'to', 'DUNG', 'Tan ra, hòa tan', 13, '氵 -> 容', '砂糖が お湯に 溶けました。', 'Satou ga oyu ni tokemashita.', 'Đường đã tan đều trong nước nóng.', 'N2', 'Nước dung hòa trong cốc', 'Dòng nước dung nạp chất hòa tan.', '☕', v_ch1_id, 9, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('汁', 'ジュウ', 'しる', 'shiru', 'TRẤP', 'Nước súp, nước ép', 5, '氵 -> 十', '温かい みそ汁を 飲みます。', 'Atatakai misoshiru o nomimasu.', 'Húp bát canh miso nóng hổi.', 'N2', 'Mười giọt nước cốt', 'Mười giọt nước cốt tạo nên vị ngọt đậm đà.', '🥣', v_ch1_id, 10, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('丼', 'トン', 'どんぶり', 'don', 'ĐẢM', 'Bát cơm to, tô Donburi', 5, '井 -> 丶', '昼ご飯に 牛丼を 注文しました。', 'Hirugohan ni gyuudon o chuumonshimashita.', 'Gọi món cơm bò Gyudon cho bữa trưa.', 'N2', 'Bát sâu có nhân giữa', 'Chiếc giếng hình vuông có viên ngọc thơm giữa lòng.', '🍚', v_ch1_id, 11, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('盛', 'セイ, ジョウ', 'も・る, さか・る, さか・ん', 'mo', 'THỊNH', 'Thịnh vượng, xới đầy', 11, '成 -> 皿', 'ご飯を 大盛りに してもらいました。', 'Gohan o oomori ni shitemoraimashita.', 'Xin một bát cơm xới thật đầy.', 'N2', 'Đĩa đầy thành công', 'Đĩa thức ăn chất đầy thể hiện sự hưng thịnh.', '🍲', v_ch1_id, 12, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('契', 'ケイ', 'ちぎ・る', 'chigi', 'KHẾ', 'Hợp đồng, khế ước', 9, '丰 -> 刀 -> 大', 'アパートの 賃貸契約を 結びました。', 'Apaato no chintaikeiyaku o musubimashita.', 'Ký kết hợp đồng thuê căn hộ.', 'N2', 'Khắc dao lớn làm chứng', 'Dùng dao khắc giao kèo lớn không đổi.', '📄', v_ch1_id, 13, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('越', 'エツ', 'こ・す, こ・える', 'ko', 'VIỆT', 'Vượt qua, dọn nhà', 12, '走 -> 戉', '来月 新しい 家に 引っ越します。', 'Raigetsu atarashii ie ni hikkoshimasu.', 'Tháng sau tôi chuyển sang nhà mới.', 'N2', 'Chạy vác rìu vượt qua', 'Cầm rìu mở đường vượt qua mọi giới hạn.', '🚚', v_ch1_id, 14, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貸', 'タイ', 'か・す', 'ka', 'THẢI', 'Cho vay, cho mượn', 12, '代 -> 貝', '部屋を 貸してくれる 大家さんを 探します。', 'Heya o kashitekureru ooyasan o sagashimasu.', 'Tìm chủ nhà cho thuê trọ tốt.', 'N2', 'Giao tiền tạm thời', 'Thay thế trao đổi tiền bạc tạm mượn.', '🔑', v_ch1_id, 15, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('仮', 'カ, ケ', 'かり', 'kari', 'GIẢ', 'Tạm thời, giả định', 6, '亻 -> 反', '仮免許を 取得して 練習します。', 'Karimenkyo o shutokushite renshuushimasu.', 'Lấy bằng lái tạm thời để luyện tập.', 'N2', 'Người đứng tạm thời', 'Người tạm nương tựa vào vách đá.', '⏳', v_ch1_id, 16, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('証', 'ショウ', '', 'shou', 'CHỨNG', 'Bằng chứng, chứng thực', 12, '言 -> 正', '身分証明書を 提示してください。', 'Mibunshoumeisho o teijishitekudasai.', 'Xin hãy xuất trình giấy tờ tùy thân chứng minh.', 'N2', 'Lời nói chân chính làm chứng', 'Lời lẽ ngay thẳng làm chứng cứ xác thực.', '🆔', v_ch1_id, 17, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('域', 'イキ', '', 'iki', 'VỰC', 'Khu vực, vùng miền', 11, '土 -> 或', 'この 地域は 静かで 住みやすいです。', 'Kono chiiki wa shizuka de sumiyasui desu.', 'Khu vực này rất yên tĩnh và dễ sống.', 'N2', 'Vùng đất có ranh giới', 'Khu đất có binh lính tuần tra ranh giới.', '🗺️', v_ch1_id, 18, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('雑', 'ザツ, ゾウ', 'まじ・る', 'zatsu', 'TẠP', 'Tạp chí, phức tạp', 14, '九 -> 木 -> 隹', '週刊の 雑誌を 毎週 買っています。', 'Shuukan no zasshi o maishuu katteimasu.', 'Mỗi tuần tôi đều mua một cuốn tạp chí tuần san.', 'N2', 'Cây có chín loài chim', 'Cây có nhiều loài chim tạo nên sự pha trộn muôn màu.', '📰', v_ch1_id, 19, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('誌', 'シ', '', 'shi', 'CHÍ', 'Ghi chép, tạp chí', 14, '言 -> 志', 'ファッション誌を 読んで 流行を 知ります。', 'Fasshonshi o yonde ryuukou o shirimasu.', 'Đọc tạp chí thời trang để nắm bắt xu hướng.', 'N2', 'Lời văn ghi chí hướng', 'Lời văn ghi chép lại hoài bão và thông tin.', '📚', v_ch1_id, 20, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('刊', 'カン', '', 'kan', 'SAN', 'Xuất bản, phát hành', 5, '干 -> 刂', '新しい 小説が 来週 刊行されます。', 'Atarashii shousetsu ga raishuu kankousaremasu.', 'Cuốn tiểu thuyết mới sẽ được phát hành tuần sau.', 'N2', 'Dao khắc bản in', 'Dùng dao khắc ván in xuất bản tác phẩm.', '🖨️', v_ch1_id, 21, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('並', 'ヘイ', 'なみ, なら・べる, なら・ぶ', 'nara', 'TỊNH', 'Xếp hàng, ngang bằng', 8, '䒑 -> 业', '机の 上に 本を 並べました。', 'Tsukue no ue ni hon o narabemashita.', 'Xếp những cuốn sách ngay ngắn trên bàn.', 'N2', 'Hai người cùng bước song hành', 'Hai người sánh vai đứng ngang hàng nhau.', '🚶‍♂️🚶‍♂️', v_ch1_id, 22, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('巻', 'カン', 'ま・く, まき', 'maki', 'QUYỂN', 'Cuốn sách, cuộn tròn', 9, '龹 -> 己', '全十巻の 漫画を 一気に 読みました。', 'Zenjukkan no manga o ikki ni yomimashita.', 'Đọc một mạch bộ truyện tranh trọn vẹn 10 tập.', 'N2', 'Cuộn lụa gập lại', 'Hai tay nâng cuộn sách lụa quý giá.', '📜', v_ch1_id, 23, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('著', 'チョ', 'あらわ・す, いちじる・しい', 'chou', 'TRỨ', 'Tác giả, nổi tiếng, viết sách', 11, '艹 -> 者', '有名な 学者が 書いた 著書を 読みます。', 'Yuumei na gakusha ga kaita chosho o yomimasu.', 'Đọc cuốn sách do học giả nổi tiếng biên soạn.', 'N2', 'Người tài hoa viết sách', 'Người tài viết nên tác phẩm xuất chúng.', '✍️', v_ch1_id, 24, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('居', 'キョ', 'い・る', 'i', 'CƯ', 'Sinh sống, chỗ ở', 8, '尸 -> 古', '家族と 一緒に 居間で テレビを 見ます。', 'Kazoku to issho ni ima de terebi o mimasu.', 'Cùng gia đình xem tivi ở phòng khách.', 'N2', 'Người ngồi trong phòng cổ', 'Người an cư trong gian phòng thân quen.', '🛋️', v_ch1_id, 25, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('庭', 'テイ', 'にわ', 'niwa', 'ĐÌNH', 'Sân vườn, gia đình', 10, '广 -> 廷', '庭に 綺麗な 花が 咲いています。', 'Niwa ni kirei na hana ga saiteimasu.', 'Những bông hoa đẹp đang nở rộ ngoài sân vườn.', 'N2', 'Sân vườn dưới mái đình', 'Khoảng sân rộng rãi trước thềm nhà.', '🏡', v_ch1_id, 26, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('清', 'セイ, ショウ', 'きよ・い, きよ・まる', 'kiyo', 'THANH', 'Trong sạch, thanh khiết', 11, '氵 -> 青', '清らかな 川の 水が 流れています。', 'Kiyoraka na kawa no mizu ga nagareteimasu.', 'Dòng nước sông trong vắt đang chảy êm đềm.', 'N2', 'Dòng nước trong xanh biếc', 'Dòng nước xanh mát trong lành không gợn bụi.', '💧', v_ch1_id, 27, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('掃', 'ソウ', 'は・く', 'ha', 'TẢO', 'Quét dọn, làm sạch', 11, '扌 -> 帚', 'ほうきで 部屋を 掃除します。', 'Houki de heya o soujishimasu.', 'Dùng chổi quét dọn sạch sẽ căn phòng.', 'N2', 'Tay cầm chổi quét', 'Bàn tay cầm chổi quét sạch bụi bặm.', '🧹', v_ch1_id, 28, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('整', 'セイ', 'ととの・える, ととの・う', 'totono', 'CHỈNH', 'Chỉnh tề, ngay ngắn', 16, '束 -> 攵 -> 正', '本棚を 整理して 部屋を 片付けます。', 'Hondana o seirishite heya o katadukemasu.', 'Chỉnh trang lại kệ sách và dọn dẹp phòng.', 'N2', 'Bó chặt ngay ngắn chỉnh chu', 'Buộc gọn gàng và điều chỉnh lại cho đúng vị trí.', '📐', v_ch1_id, 29, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('汚', 'オ', 'よご・す, よご・れる, きたな・い', 'kitana', 'Ô', 'Bẩn thỉu, ô nhiễm', 6, '氵 -> 亏', '服が 泥で 汚れてしまいました。', 'Fuku ga doro de yogoreteshimaimashita.', 'Quần áo bị lấm lem bùn đất bẩn.', 'N2', 'Dòng nước tù đọng', 'Dòng nước chảy cong queo tù đọng sinh bẩn đục.', '🧽', v_ch1_id, 30, '/assets/kanji/n2/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('駐', 'チュウ', '', 'chuu', 'TRÚ', 'Đỗ xe, dừng chân', 15, '馬 -> 主', '駅前の 駐輪場に 自転車を とめます。', 'Ekimae no chuurinjou ni jitensha o tomemasu.', 'Đỗ xe đạp ở bãi gửi xe trước ga.', 'N2', 'Ngựa đứng dừng bên chủ', 'Con ngựa dừng chân đứng đợi bên cạnh chủ nhân.', '🅿️', v_ch2_id, 1, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('輪', 'リン', 'わ', 'wa', 'LUÂN', 'Bánh xe, vòng tròn', 15, '車 -> 侖', '三輪車に 乗って 遊ぶ 子供。', 'Sanrinsha ni notte asobu kodomo.', 'Đứa trẻ vui chơi trên chiếc xe ba bánh.', 'N2', 'Bánh xe kết hợp nan hoa', 'Chiếc xe có bánh tròn lăn bánh nhịp nhàng.', '🚲', v_ch2_id, 2, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('港', 'コウ', 'みなと', 'minato', 'CẢNG', 'Bến cảng, cảng biển', 12, '氵 -> 巷', '貿易船が 港に 停泊しています。', 'Bouekisen ga minato ni teihakushiteimasu.', 'Tàu chở hàng thương mại đang neo đậu tại cảng.', 'N2', 'Cửa nước dẫn vào ngõ phố', 'Dòng nước mở lối cho thuyền bè cập bến.', '⚓', v_ch2_id, 3, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('到', 'トウ', '', 'tou', 'ĐÁO', 'Đến nơi, chu đáo', 8, '至 -> 刂', '予定の時間に 無事 到着しました。', 'Yotei no jikan ni buji touchakushimashita.', 'Đã đến nơi an toàn đúng giờ dự kiến.', 'N2', 'Đi tới đích bằng dao vạch', 'Đã đi tới đích cuối cùng trọn vẹn.', '🏁', v_ch2_id, 4, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('途', 'ト', '', 'to', 'ĐỒ', 'Giữa đường, hành trình', 10, '余 -> 辶', '学校へ 行く 途中で 友達に 会いました。', 'Gakkou e iku tochuu de tomodachi ni aimashita.', 'Tôi gặp bạn trên đường đến trường.', 'N2', 'Bước đi trên đường dài', 'Từng bước chân thong dong bước trên đường thiên lý.', '🛣️', v_ch2_id, 5, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('過', 'カ', 'す・ぎる, す・ごす, あやま・ち', 'su', 'QUÁ', 'Đi qua, quá mức, lỗi lầm', 12, '咼 -> 辶', '楽しい 週末を 家族と 過ごしました。', 'Tanoshii shuumatsu o kazoku to sugoshimashita.', 'Trải qua cuối tuần vui vẻ bên gia đình.', 'N2', 'Bước qua khung cửa thời gian', 'Bước chân lướt qua nhanh chóng từng chặng đời.', '⏱️', v_ch2_id, 6, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('符', 'フ', '', 'fu', 'PHÙ', 'Vé, ký hiệu, phù hiệu', 11, '竹 -> 付', '切符を 改札機に 通します。', 'Kippu o kaisatsuki ni tooshimasu.', 'Đưa vé qua cửa soát vé tự động.', 'N2', 'Thẻ tre gắn dấu hiệu', 'Thẻ tre đính kèm ký hiệu xác nhận.', '🎫', v_ch2_id, 7, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('停', 'テイ', 'と・まる, と・める', 'to', 'ĐÌNH', 'Dừng lại, đình chỉ', 11, '亻 -> 亭', 'バスが 停留所に 止まりました。', 'Basu ga teiryuujo ni tomarimashita.', 'Xe buýt đã dừng tại trạm đón trả khách.', 'N2', 'Người nghỉ ngơi bên lều quán', 'Lữ khách dừng chân nghỉ ngơi dưới mái đình ven đường.', '🛑', v_ch2_id, 8, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('標', 'ヒョウ', '', 'hyou', 'TIÊU', 'Biển báo, mục tiêu', 15, '木 -> 票', '道路の 交通標識を よく 見てください。', 'Douro no koutsuuhyoushiki o yoku mitekudasai.', 'Hãy quan sát kỹ biển báo giao thông trên đường.', 'N2', 'Cột gỗ cắm phiếu thông báo', 'Cột gỗ chỉ đường cắm biển mục tiêu rõ ràng.', '🚸', v_ch2_id, 9, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('普', 'フ', '', 'fu', 'PHỔ', 'Phổ biến, rộng khắp', 12, '並 -> 日', 'スマートフォンは 今や 普及しています。', 'Sumaatofon wa imaya fukyuushiteimasu.', 'Điện thoại thông minh ngày nay đã phổ cập rộng rãi.', 'N2', 'Ánh dương chiếu tỏa khắp muôn nơi', 'Mặt trời tỏa sáng bao trùm lên vạn vật bình đẳng.', '🌐', v_ch2_id, 10, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('刻', 'コク', 'きざ・む', 'kiza', 'KHẮC', 'Khắc ghi, thời khắc', 8, '亥 -> 刂', '時計の 針が 正確に 時を 刻みます。', 'Tokei no hari ga seikaku ni toki o kizamimasu.', 'Kim đồng hồ tích tắc khắc ghi thời gian chuẩn xác.', 'N2', 'Dùng dao chạm khắc từng nét', 'Dùng dao sắc khắc từng khoảnh khắc đáng nhớ.', '⏰', v_ch2_id, 11, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('違', 'イ', 'ちが・う, ちが・える', 'chiga', 'VI', 'Khác biệt, vi phạm, sai lệch', 13, '韋 -> 辶', '二つの 意見には 大きな 違いが あります。', 'Futatsu no iken ni wa ookina chigai ga arimasu.', 'Giữa hai ý kiến có sự khác biệt rất lớn.', 'N2', 'Bước đi sai hướng khác biệt', 'Bước chân đi trệch đường dẫn đến sai biệt.', '❌', v_ch2_id, 12, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('漁', 'ギョ, リョウ', '', 'gyo', 'NGƯ', 'Đánh cá, ngư nghiệp', 14, '氵 -> 魚', '港町で 漁業が 盛んに 行われています。', 'Minatomachi de gyogyou ga sakan ni okonawareteimasu.', 'Nghề đánh bắt cá phát triển mạnh ở thị trấn cảng.', 'N2', 'Kéo cá dưới nước', 'Dòng nước đầy ắp cá cho ngư dân đánh bắt.', '🐟', v_ch2_id, 13, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('輸', 'ユ', '', 'yu', 'THÂU', 'Vận chuyển, xuất nhập khẩu', 16, '車 -> 兪', '日本の 車が 世界中に 輸出されています。', 'Nihon no kuruma ga sekaijuu ni yushutsusareteimasu.', 'Xe hơi Nhật Bản được xuất khẩu ra khắp thế giới.', 'N2', 'Xe chuyên chở hàng qua sông', 'Chiếc xe chở đầy hàng hóa lưu thông buôn bán.', '🚢', v_ch2_id, 14, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('製', 'セイ', '', 'sei', 'CHẾ', 'Chế tạo, sản xuất', 14, '制 -> 衣', '日本製は 品質が 高いと 評価されています。', 'Nihonsei wa hinshitsu ga takai to hyoukasareteimasu.', 'Hàng chế tạo tại Nhật Bản được đánh giá cao về chất lượng.', 'N2', 'Cắt vải chế tạo trang phục', 'Quy chuẩn cắt may làm nên sản phẩm hoàn hảo.', '🏭', v_ch2_id, 15, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('郵', 'ユウ', '', 'yuu', 'BƯU', 'Bưu điện, gửi thư', 11, '垂 -> 阝', '書類を 郵便で 送信しました。', 'Shorui o yuubin de soushinshimashita.', 'Tôi đã gửi giấy tờ tài liệu qua đường bưu điện.', 'N2', 'Trạm bưu phát nơi thành thị', 'Trạm dừng gửi thư tín nơi bờ lũy thành trì.', '📮', v_ch2_id, 16, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('航', 'コウ', '', 'kou', 'HÀNG', 'Hàng không, vượt biển', 10, '舟 -> 亢', '飛行機が 太平洋上を 航行しています。', 'Hikouki ga taiheiyoujou o koukoushiteimasu.', 'Máy bay đang hành trình bay qua Thái Bình Dương.', 'N2', 'Con thuyền giương buồm vượt khơi', 'Chiếc thuyền vững chãi vượt sóng đại dương.', '✈️', v_ch2_id, 17, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('融', 'ユウ', 'と・ける', 'yuu', 'DUNG', 'Lưu thông, tài chính, dung hòa', 16, '鬲 -> 虫', '銀行から 事業資金の 融資を 受けます。', 'Ginkou kara jigyoushikin no yuushi o ukemasu.', 'Nhận khoản cho vay vốn kinh doanh từ ngân hàng.', 'N2', 'Hơi nóng bốc lên dung hòa', 'Nhiệt lượng tỏa hơi làm ấm áp lưu thông dòng tiền.', '💳', v_ch2_id, 18, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('戻', 'レイ', 'もど・る, もど・す', 'modo', 'LỆ', 'Quay lại, hoàn trả', 7, '戸 -> 大', '席に 戻って 仕事を 続けます。', 'Seki ni modotte shigoto o tsuzukemasu.', 'Quay trở lại chỗ ngồi và tiếp tục công việc.', 'N2', 'Cửa mở người lớn bước về', 'Mở cửa bước trở về ngôi nhà thân quen.', '↩️', v_ch2_id, 19, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('換', 'カン', 'か・える, か・わる', 'ka', 'HOÁN', 'Đổi chỗ, hoán đổi', 12, '扌 -> 奐', '部屋の 空気を 入れ換えます。', 'Heya no kuuki o irekaemasu.', 'Mở cửa để đổi mới không khí trong lành trong phòng.', 'N2', 'Bàn tay đổi vật rực rỡ', 'Bàn tay trao đổi những món đồ giá trị.', '🔄', v_ch2_id, 20, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('払', 'ヒツ', 'はら・う', 'hara', 'PHẤT', 'Thanh toán, phủi sạch', 5, '扌 -> 厶', 'レジで 代金を 支払います。', 'Reji de daikin o shiharaimasu.', 'Thanh toán tiền hàng tại quầy thu ngân.', 'N2', 'Tay phủi trả tiền sòng phẳng', 'Bàn tay vung nhẹ phủi sạch chi trả phân minh.', '💵', v_ch2_id, 21, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('込', '', 'こ・む, こ・める', 'ko', 'NHẬP', 'Đông đúc, dồn vào, gom vào', 5, '辶 -> 入', '心を 込めて 手紙を 書きました。', 'Kokoro o komete tegami o kakimashita.', 'Dồn trọn tâm huyết viết nên lá thư chân tình.', 'N2', 'Bước chân tiến sâu vào', 'Từng bước tiến sâu dồn hết tấm lòng vào công việc.', '📥', v_ch2_id, 22, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('両', 'リョウ', '', 'ryou', 'LƯỠNG', 'Cả hai, tiền xu cổ', 6, '一 -> 冂 -> 山', '両親に 感謝の 気持ちを 伝えます。', 'Ryoushin ni kansha no kimochi o tsutaemasu.', 'Bày tỏ lòng biết ơn sâu sắc đến cả cha lẫn mẹ.', 'N2', 'Chiếc cân đo hai phía cân xứng', 'Cán cân giữ thăng bằng cân xứng cho cả hai đầu.', '⚖️', v_ch2_id, 23, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('替', 'タイ', 'か・える, か・わる', 'ka', 'THẾ', 'Thay thế, đổi lấy', 12, '夫 -> 夫 -> 日', '古い 部品を 新しいものに 取り替えます。', 'Furui buhin o atarashii mono ni torikaemasu.', 'Thay thế phụ tùng cũ bằng linh kiện mới tinh.', 'N2', 'Hai người luân phiên dưới nắng', 'Hai trượng phu thay phiên nhau gánh vác việc nước.', '🔀', v_ch2_id, 24, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('照', 'ショウ', 'て・る, て・らす, て・れる', 'te', 'CHIẾU', 'Chiếu sáng, đối chiếu', 13, '昭 -> 灬', '月が 夜道を 明るく 照らしています。', 'Tsuki ga yomichi o akaruku terashiteimasu.', 'Ánh trăng chiếu sáng rực rỡ soi rọi lối đi đêm.', 'N2', 'Ánh sáng lửa rạng soi tỏ', 'Ánh lửa bừng sáng soi rọi tỏ tường vạn vật.', '🔦', v_ch2_id, 25, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('預', 'ヨ', 'あず・ける, あず・かる', 'azu', 'DỰ', 'Gửi tiền, trông giữ', 13, '予 -> 頁', '銀行に お金を 預けて 貯金します。', 'Ginkou ni okane o azukete chokinshimasu.', 'Gửi tiền vào ngân hàng để tiết kiệm sinh lời.', 'N2', 'Trao trước giấy tờ gửi gắm', 'Giao trang sổ sách tin cậy nhờ giữ giùm trước.', '🏦', v_ch2_id, 26, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('札', 'サツ', 'ふだ', 'fuda', 'TRÁT', 'Tờ tiền, thẻ bài', 5, '木 -> 乚', '千円札を くずして 小銭を 作ります。', 'Sen-ensatsu o kuzushite kozeni o tsukurimasu.', 'Đổi tờ tiền một nghìn Yên ra tiền lẻ.', 'N2', 'Thẻ gỗ viết tên trát lệnh', 'Tấm thẻ gỗ khắc chữ lưu hành thông tin.', '💴', v_ch2_id, 27, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貨', 'カ', '', 'ka', 'HÓA', 'Hàng hóa, tiền tệ', 11, '化 -> 貝', '硬貨を 投入口に 入れて 切符を 買います。', 'Kouka o tounyuukuchi ni irete kippu o kaimasu.', 'Bỏ đồng tiền xu vào khe để mua vé tàu.', 'N2', 'Vỏ sò biến hóa thành tiền tệ', 'Vỏ sò trao đổi mua bán hóa thành hàng hóa giá trị.', '💰', v_ch2_id, 28, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('帳', 'チョウ', '', 'chou', 'TRƯỚNG', 'Sổ sách, cuốn sổ', 11, '巾 -> 長', '毎月 銀行の 通帳を 記帳します。', 'Maitsuki ginkou no tsuuchou o kichoushimasu.', 'Mỗi tháng đều in cập nhật sổ tài khoản ngân hàng.', 'N2', 'Tấm vải dài ghi chép sổ sách', 'Cuộn vải dài ghi lại danh sách tiền nong.', '📒', v_ch2_id, 29, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('振', 'シン', 'ふ・る, ふ・るう', 'fu', 'CHẤN', 'Vung tay, rung lắc, chuyển khoản', 10, '扌 -> 辰', '友達の 口座に 生活費を 振り込みます。', 'Tomodachi no kouza ni seikatsuhi o furikomimasu.', 'Chuyển khoản sinh hoạt phí vào tài khoản của bạn.', 'N2', 'Tay vung chuyển động mạnh mẽ', 'Bàn tay vung mạnh khởi sắc mọi công việc.', '📱', v_ch2_id, 30, '/assets/kanji/n2/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('桜', 'オウ', 'さくら', 'sakura', 'ANH', 'Hoa anh đào', 10, '木 -> 爫 -> 女', '春になると 桜が 満開に なります。', 'Haru ni naru to sakura ga mankai ni narimasu.', 'Mùa xuân đến hoa anh đào nở rộ khắp nơi.', 'N2', 'Cây hoa người thiếu nữ say mê', 'Cây gỗ nở những đóa hoa thiếu nữ cài tóc.', '🌸', v_ch3_id, 1, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('梅', 'バイ', 'うめ', 'ume', 'MAI', 'Cây mai, quả mơ', 10, '木 -> 毎', '梅雨の 季節に 梅酒を つくります。', 'Tsuyu no kisetsu ni umeshu o tsukurimasu.', 'Vào mùa mưa ngâm một bình rượu mơ thơm nồng.', 'N2', 'Cây hoa mẹ yêu thích mỗi ngày', 'Mỗi ngày đều ngắm cây mơ đơm trái sum suê.', '🫐', v_ch3_id, 2, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('松', 'ショウ', 'まつ', 'matsu', 'TÙNG', 'Cây thông kiên cường', 8, '木 -> 公', '正月に 門松を 飾って 祝います。', 'Shougatsu ni kadomatsu o kazatte iwaimasu.', 'Ngày tết chưng cây thông Kadomatsu trước cổng mừng xuân.', 'N2', 'Cây thông của công chúng', 'Cây thông xanh tươi bền bỉ trước bão giông.', '🌲', v_ch3_id, 3, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('杉', 'サン', 'すぎ', 'sugi', 'SAM', 'Cây tuyết tùng sam', 7, '木 -> 彡', '日本の 山には 杉の 木が 多く 生えています。', 'Nihon no yama ni wa sugi no ki ga ooku haeteimasu.', 'Trên những cánh rừng núi Nhật Bản mọc rất nhiều cây sam.', 'N2', 'Cây lá nhọn ba nhánh sam', 'Thân cây cao vút tỏa cành lá vươn lên mây trời.', '🌲', v_ch3_id, 4, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('美', 'ビ', 'うつく・しい', 'utsuku', 'MỸ', 'Xinh đẹp, hoàn mỹ', 9, '羊 -> 大', '美術館で 素晴らしい 絵画を 鑑賞しました。', 'Bijutsukan de subarashii kaiga o kanshoushimashita.', 'Chiêm ngưỡng những bức tranh tuyệt mỹ tại bảo tàng mỹ thuật.', 'N2', 'Chú cừu to lớn tròn trịa', 'Con cừu to béo cân đối tượng trưng cho vẻ đẹp.', '✨', v_ch3_id, 5, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('香', 'コウ, キョウ', 'かお・る, かおり', 'kao', 'HƯƠNG', 'Hương thơm quyến rũ', 9, '禾 -> 日', '部屋に 甘い 香りが 漂っています。', 'Heya ni amai kaori ga tayoutteimasu.', 'Trong gian phòng thoang thoảng hương thơm ngọt ngào.', 'N2', 'Lúa phơi dưới nắng tỏa hương', 'Bông lúa chín phơi dưới ánh mặt trời dậy mùi thơm dịu.', '💐', v_ch3_id, 6, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('脱', 'ダツ', 'ぬ・ぐ, ぬ・げる', 'nu', 'THOÁT', 'Cởi bỏ, thoát khỏi', 11, '月 -> 兌', '玄関で 靴を 脱いで 上がります。', 'Genkan de kutsu o nuide agarimasu.', 'Cởi giày ở tiền sảnh rồi bước lên sàn nhà.', 'N2', 'Thân thể vui vẻ cởi bỏ ràng buộc', 'Thân hình thanh thản thoát khỏi xiềng xích gò bó.', '👟', v_ch3_id, 7, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('掛', 'カイ', 'か・ける, か・かる', 'ka', 'QUẢI', 'Treo lên, bắt đầu, gắn', 11, '扌 -> 卦', '壁に お気に入りの 絵を 掛けました。', 'Kabe ni okiiniiri no e o kakemashita.', 'Treo bức tranh yêu thích nhất lên tường.', 'N2', 'Tay quẻ bói treo lên', 'Bàn tay treo tấm quẻ bói cầu an lành.', '🖼️', v_ch3_id, 8, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('姿', 'シ', 'すがた', 'sugata', 'TƯ', 'Tư thế, dáng dấp', 9, '次 -> 女', '彼女の 浴衣姿は とても 素敵です。', 'Kanojo no yukatasugata wa totemo suteki desu.', 'Dáng dấp cô ấy trong bộ Yukata thật duyên dáng.', 'N2', 'Người phụ nữ dáng đẹp kế tiếp', 'Dáng vẻ yêu kiều thướt tha của người phụ nữ.', '💃', v_ch3_id, 9, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勢', 'セイ', 'いきお・い', 'ikio', 'THẾ', 'Khí thế, thế lực, sức mạnh', 13, '執 -> 力', 'チームは 勢いに 乗って 勝利を 収めました。', 'Chiimu wa ikioi ni notte shouri o osamemashita.', 'Đội bóng thừa thắng xông lên giành chiến thắng giòn giã.', 'N2', 'Sức mạnh cầm quyền uy vũ', 'Nắm giữ sức lực dũng mãnh tạo nên khí thế.', '⚡', v_ch3_id, 10, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('柔', 'ジュウ, ニュウ', 'やわ・らか, やわ・らかい', 'yawa', 'NHU', 'Mềm dẻo, nhu đạo Judo', 9, '矛 -> 木', '柔軟な 考え方で 問題を 解決します。', 'Juunan na kangaekata de mondai o kaiketsushimasu.', 'Giải quyết vấn đề bằng lối suy nghĩ linh hoạt mềm dẻo.', 'N2', 'Ngọn giáo uốn cong trên cây gỗ', 'Ngọn giáo dẻo dai uốn mình không gãy.', '🥋', v_ch3_id, 11, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('軟', 'ナン', 'やわ・らか, やわ・らかい', 'yawa', 'NHUYỄN', 'Mềm xốp, nhược điểm', 11, '車 -> 欠', '体が 軟らかい 人は ケガを しにくいです。', 'Karada ga yawarakai hito wa kega o shinikui desu.', 'Người có cơ thể mềm dẻo dẻo dai thì ít bị chấn thương.', 'N2', 'Xe thiếu trục lăn êm ái', 'Bánh xe mềm mại lướt êm ru trên đường.', '🧘', v_ch3_id, 12, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('固', 'コ', 'かた・まる, かた・める, かた・い', 'kata', 'CỐ', 'Kiên cố, đông cứng', 8, '囗 -> 古', '友情の 絆を 固く 誓い合いました。', 'Yuujou no kizuna o kataku chikaiaimashita.', 'Cùng thề gắn kết bền chặt tình bạn keo sơn.', 'N2', 'Bốn vách bao bọc chiếc thành cổ', 'Tường lũy kiên cố bao bọc vững bền di tích cổ.', '🧱', v_ch3_id, 13, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('純', 'ジュン', '', 'jun', 'THUẦN', 'Thuần khiết, mộc mạc', 10, '糸 -> 屯', '純粋な 心で 人に 接したいです。', 'Junsui na kokoro de hito ni sesshitai desu.', 'Muốn đối xử với mọi người bằng tấm lòng thuần khiết.', 'N2', 'Sợi tơ mộc mạc nguyên bản', 'Sợi tơ trời óng ả nguyên sơ chưa qua nhuộm màu.', '🤍', v_ch3_id, 14, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('快', 'カイ', 'こころよ・い', 'kokoroyo', 'KHOÁI', 'Khoái sảng, sảng khoái, vui tươi', 7, '忄 -> 夬', '朝の 散歩は とても 快いです。', 'Asa no sanpo wa totemo kokoroyoi desu.', 'Buổi đi dạo sớm mai mang lại cảm giác vô cùng thư thái.', 'N2', 'Trái tim cởi mở hân hoan', 'Tâm hồn thảnh thơi mở rộng đón niềm hoan hỷ.', '😊', v_ch3_id, 15, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('甘', 'カン', 'あま・い, あま・える', 'ama', 'CAM', 'Ngọt ngào, nuông chiều', 5, '甘', '甘い ケーキを 食べて 疲れを 癒やします。', 'Amai keeki o tabete tsukare o iyashimasu.', 'Ăn chiếc bánh ngọt ngào xua tan đi bao mệt mỏi.', 'N2', 'Miệng ngậm mật thơm', 'Miệng nếm giọt mật ngọt lịm tan chảy nơi đầu lưỡi.', '🍬', v_ch3_id, 16, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('濃', 'ノウ', 'こ・い', 'ko', 'NỒNG', 'Đậm đà, nồng nàn', 16, '氵 -> 農', '濃い お茶を いれて 目を 覚まします。', 'Koi ocha o irete me o samashimasu.', 'Pha ấm trà đậm đà đánh thức mọi giác quan.', 'N2', 'Nước nông mùa màng đậm sắc', 'Dòng nước tưới đẫm ruộng đồng xanh thẫm trĩu bông.', '🍵', v_ch3_id, 17, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('薄', 'ハク', 'うす・い, うす・める', 'usu', 'BẠC', 'Mỏng manh, nhạt nhẽo', 16, '艹 -> 溥', '味付けを 薄めにして 健康に 気を 配ります。', 'Ajitsuke o usumeni shite kenkou ni ki o kubarimasu.', 'Nêm vị nhạt thanh để giữ gìn sức khỏe dẻo dai.', 'N2', 'Cỏ mỏng manh ven sông', 'Lớp cỏ mỏng manh ven bờ nước cạn.', '📄', v_ch3_id, 18, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('劇', 'ゲキ', '', 'geki', 'KỊCH', 'Vở kịch, kịch tính', 15, '虚 -> 刂', '劇団の 舞台公演を 見に 行きました。', 'Gekidan no butaikouen o mi ni ikimashita.', 'Đến rạp thưởng thức buổi công diễn sân khấu của đoàn kịch.', 'N2', 'Cầm dao biểu diễn kịch tính', 'Vở diễn hào hùng đấu kiếm trên sân khấu lộng lẫy.', '🎭', v_ch3_id, 19, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('舞', 'ブ', 'ま・う, まい', 'mai', 'VŨ', 'Múa, khiêu vũ, bay lượn', 15, '舛 -> 𠂉', '伝統的な 日本舞踊を 習っています。', 'Dentouteki na nihonbuyou o naratteimasu.', 'Tôi đang theo học bộ môn múa truyền thống Nhật Bản.', 'N2', 'Hai chân xoay nhịp nhàng theo điệu múa', 'Đôi chân bước lướt bay bổng theo tiếng đàn ngân vang.', '💃', v_ch3_id, 20, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('堂', 'ドウ', '', 'dou', 'ĐƯỜNG', 'Hội trường, đại sảnh, ngôi chùa', 11, '尚 -> 土', '大学の 講堂で 入学式が 行われました。', 'Daigaku no koudou de nyuugakushiki ga okonawaremashita.', 'Lễ khai giảng diễn ra trang trọng tại giảng đường đại học.', 'N2', 'Ngôi nhà cao quý trên nền đất', 'Điện thờ cao quý sừng sững trên đất vững chãi.', '🏛️', v_ch3_id, 21, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('展', 'テン', '', 'ten', 'TRIỂN', 'Triển lãm, mở rộng', 10, '尸 -> 𧰨', '写真展に たくさんの 人が 訪れました。', 'Shashinten ni takusan no hito ga otozuremashita.', 'Rất nhiều du khách đã ghé thăm buổi triển lãm ảnh.', 'N2', 'Trải rộng tấm áo cho mọi người xem', 'Mở rộng bức tranh cuộn trưng bày cho muôn người ngắm.', '🖼️', v_ch3_id, 22, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宗', 'シュウ, ソウ', '', 'shuu', 'TÔNG', 'Tôn giáo, tông phái', 8, '宀 -> 示', '世界には 様々な 宗教が 存在します。', 'Sekai ni wa samazama na shuukyou ga sonzaishimasu.', 'Trên thế giới tồn tại rất nhiều tôn giáo đa dạng.', 'N2', 'Bàn thờ tổ tông dưới mái nhà', 'Dưới mái nhà tôn nghiêm đặt bài vị thờ cúng tổ tiên.', '⛩️', v_ch3_id, 23, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('恵', 'ケイ, エ', 'めぐ・む', 'megu', 'HUỆ', 'Ân huệ, ban ơn', 10, '十 -> 専 -> 心', '豊かな 自然の 恵みに 感謝します。', 'Yutaka na shizen no megumi ni kanshashimasu.', 'Biết ơn sâu sắc ân huệ hào phóng từ thiên nhiên ban tặng.', 'N2', 'Tấm lòng chan chứa mười điều lành', 'Trái tim nhân hậu ban phát điều lành cho vạn vật.', '🕊️', v_ch3_id, 24, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宝', 'ホウ', 'たから', 'takara', 'BẢO', 'Bảo vật, của báu', 8, '宀 -> 玉', '家族は 私にとって かけがえのない 宝物です。', 'Kazoku wa watashi ni totte kakegaenonai takaramono desu.', 'Gia đình là báu vật vô giá không gì thay thế được.', 'N2', 'Viên ngọc quý dưới mái nhà', 'Dưới mái ấm gia đình cất giữ viên ngọc quý rạng ngời.', '💎', v_ch3_id, 25, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('城', 'ジョウ', 'しろ', 'shiro', 'THÀNH', 'Lâu đài, thành lũy', 9, '土 -> 成', '大阪城は 歴史の ある 有名な 城です。', 'Oosakajou wa rekishi no aru yuumei na shiro desu.', 'Lâu đài Osaka là tòa thành cổ kính nổi tiếng ngàn năm.', 'N2', 'Đất đắp nên thành trì kiên cố', 'Đắp đất xây nên tòa thành uy nghi sừng sững.', '🏯', v_ch3_id, 26, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('栄', 'エイ', 'さか・える, は・え', 'saka', 'VINH', 'Phồn vinh, vinh quang', 9, '𤇾 -> 木', '商業都市として 大いに 繁栄しました。', 'Shougyoutoshi toshite ooi ni han-eishimashita.', 'Thành phố thương mại đã phồn vinh rực rỡ vượt bậc.', 'N2', 'Cây hoa nở rộ lấp lánh vinh quang', 'Ngọn đuốc hoa rực rỡ trên cây tươi tốt sum sê.', '🏆', v_ch3_id, 27, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('蔵', 'ゾウ', 'くら', 'kura', 'TÀNG', 'Nhà kho, tàng trữ', 17, '艹 -> 臧', '貴重な 古文書が 蔵の 中に 保管されています。', 'Kichou na komonjo ga kura no naka ni hokansareteimasu.', 'Những văn thư cổ quý báu được bảo tồn cẩn thận trong kho.', 'N2', 'Cất giấu bảo bọc dưới lớp cỏ', 'Kho chứa bảo bọc gìn giữ tài sản quý qua năm tháng.', '🏺', v_ch3_id, 28, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('昭', 'ショウ', '', 'shou', 'CHIÊU', 'Sáng sủa, thời kỳ Showa', 9, '日 -> 召', '昭和時代の レトロな 雰囲気が 好きです。', 'Shouwajidai no retoro na fun-iki ga suki desu.', 'Tôi yêu thích bầu không khí hoài cổ ấm áp thời kỳ Showa.', 'N2', 'Mặt trời chiếu sáng rạng rỡ', 'Ánh thái dương chói lọi triệu gọi ngày mới tươi sáng.', '☀️', v_ch3_id, 29, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('士', 'シ', '', 'shi', 'SĨ', 'Võ sĩ, tri thức, học sĩ', 3, '一 -> 十', '日本の 歴史を 彩った 武士たちの 物語。', 'Nihon no rekishi o irodotta bushitachi no monogatari.', 'Câu chuyện về những võ sĩ Samurai làm rạng danh lịch sử Nhật Bản.', 'N2', 'Người học rộng tài cao đứng thẳng', 'Kẻ trượng phu học từ một hiểu mười kiên định.', '⚔️', v_ch3_id, 30, '/assets/kanji/n2/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('健', 'ケン', 'すこ・やか', 'suko', 'KIỆN', 'Khỏe mạnh, tráng kiện', 11, '亻 -> 建', '健康な 体づくりの ために 運動します。', 'Kenkou na karadazukuri no tame ni undoushimasu.', 'Tập thể dục để xây dựng cơ thể khỏe mạnh.', 'N2', 'Người xây dựng thân thể khỏe mạnh', 'Con người kiến tạo nên sức khỏe tráng kiện.', '🏃', v_ch4_id, 1, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('康', 'コウ', '', 'kou', 'KHANG', 'Bình an, an khang', 11, '广 -> 隶', '健康診断を 定期的に 受けます。', 'Kenkoushindan o teikiteki ni ukemasu.', 'Khám sức khỏe định kỳ thường xuyên.', 'N2', 'Thân thể an khang dưới mái nhà', 'Dưới mái nhà luôn bình an khỏe mạnh.', '🩺', v_ch4_id, 2, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('診', 'シン', 'み・る', 'mi', 'CHẨN', 'Chẩn đoán, khám bệnh', 12, '言 -> 㐱', '医師に 体調を 診察してもらいます。', 'Ishi ni taichou o shinsatsushitemoraimasu.', 'Được bác sĩ thăm khám thể trạng kỹ lưỡng.', 'N2', 'Lời nói tế nhị chẩn đoán bệnh', 'Bác sĩ cẩn thận lắng nghe chẩn đoán.', '👨‍⚕️', v_ch4_id, 3, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('療', 'リョウ', '', 'ryou', 'LIỆU', 'Điều trị, chữa trị', 17, '疒 -> 寮', '病院で 専門的な 治療を 受けます。', 'Byouin de senmonteki na chiryou o ukemasu.', 'Tiếp nhận trị liệu chuyên khoa tại bệnh viện.', 'N2', 'Chữa lành bệnh tật trong viện', 'Trong phòng bệnh điều trị dứt điểm cơn đau.', '🏥', v_ch4_id, 4, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('命', 'メイ, ミョウ', 'いのち', 'inochi', 'MỆNH', 'Sinh mệnh, tính mạng', 8, '亼 -> 卩 -> 口', 'かけがえのない 命を 大切にします。', 'Kakegaenonai inochi o taisetsu ni shimasu.', 'Trân trọng sinh mệnh vô giá của mỗi con người.', 'N2', 'Mệnh lệnh từ trời trao sinh mạng', 'Mệnh lệnh tối cao ban trao hơi thở sự sống.', '💖', v_ch4_id, 5, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('異', 'イ', 'こと・なる', 'koto', 'DỊ', 'Khác biệt, dị thường', 11, '巳 -> 共', '体に 異常を 感じたら 休みましょう。', 'Karada ni ijou o kanjitara yasumimashou.', 'Khi cảm thấy cơ thể có dấu hiệu bất thường hãy nghỉ ngơi.', 'N2', 'Đeo mặt nạ khác thường', 'Chiếc mặt nạ dị biệt tạo vẻ khác thường.', '⚠️', v_ch4_id, 6, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('背', 'ハイ', 'せ, せい, そむ・く', 'se', 'BỐI', 'Lưng, chiều cao, phản bội', 9, '北 -> 月', '背筋を 伸ばして 姿勢を 正します。', 'Sebone o nobashite shisei o tadashimasu.', 'Ưỡn thẳng lưng chỉnh lại tư thế ngay ngắn.', 'N2', 'Hai người quay lưng về hướng bắc', 'Hai người tựa lưng vào nhau quay mặt về phương bắc.', '🧍', v_ch4_id, 7, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('腹', 'フク', 'はら', 'hara', 'PHÚC', 'Bụng, lòng dạ', 13, '月 -> 复', 'お腹が 空いて 力が 出ません。', 'Onaka ga suite chikara ga demasen.', 'Bụng đói cồn cào không còn sức lực.', 'N2', 'Thịt bụng phục hồi năng lượng', 'Thịt vùng bụng no nê phục hồi sinh khí.', '🥣', v_ch4_id, 8, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('肩', 'ケン', 'かた', 'kata', 'KIÊN', 'Bờ vai, bờ vai gánh vác', 8, '戸 -> 月', '長時間の デスクワークで 肩が こります。', 'Choujikan no desukuwaaku de kata ga korimasu.', 'Ngồi làm việc văn phòng lâu khiến vai bị đau mỏi.', 'N2', 'Cửa nhà đặt trên bờ vai', 'Đôi bờ vai vững chãi gánh vác việc gia đình.', '💪', v_ch4_id, 9, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('腕', 'ワン', 'うで', 'ude', 'OÃN', 'Cánh tay, tài nghệ', 12, '月 -> 宛', '料理の 腕前を 友達に 披露します。', 'Ryouri no udemae o tomodachi ni hiroushimasu.', 'Trổ tài nghệ nấu nướng thiết đãi bạn bè.', 'N2', 'Cánh tay khéo léo uốn lượn', 'Bắp thịt cánh tay dẻo dai thể hiện tài nghệ.', '🦾', v_ch4_id, 10, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('胸', 'キョウ', 'むね', 'mune', 'HUNG', 'Lồng ngực, tấm lòng', 10, '月 -> 匈', '感動で 胸が いっぱいに なりました。', 'Kandou de mune ga ippai ni narimashita.', 'Xúc động trào dâng nghẹn ngào lồng ngực.', 'N2', 'Lồng ngực ôm ấp yêu thương', 'Khoang ngực bảo bọc trái tim chân thành.', '🫀', v_ch4_id, 11, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('腰', 'ヨウ', 'こし', 'koshi', 'YÊU', 'Thắt lưng, hông', 13, '月 -> 要', '重いものを 持ち上げるときは 腰に 注意します。', 'Omoi mono o mochiageru toki wa koshi ni chuuishimasu.', 'Khi nâng vật nặng hãy cẩn thận giữ thắt lưng.', 'N2', 'Phần thịt cốt yếu trên cơ thể', 'Vùng thắt lưng là điểm cốt yếu nâng đỡ thân người.', '🏋️', v_ch4_id, 12, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('脳', 'ノウ', '', 'nou', 'NÃO', 'Bộ não, trí tuệ', 11, '月 -> 𡿺', '睡眠は 脳の 疲労を 回復させます。', 'Suimin wa nou no hirou o kaifukusasemasu.', 'Giấc ngủ giúp phục hồi những mệt mỏi của não bộ.', 'N2', 'Thịt đầu chứa nếp gấp tư duy', 'Phần não bộ chứa đựng trí tuệ tư duy thâm sâu.', '🧠', v_ch4_id, 13, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('臓', 'ゾウ', '', 'zou', 'TẠNG', 'Nội tạng, tạng phủ', 19, '月 -> 蔵', '内臓の 働きを 整える 食生活。', 'Naizou no hataraki o totonoeru shokuseikatsu.', 'Chế độ ăn uống giúp điều hòa hoạt động của nội tạng.', 'N2', 'Phần thịt tàng trữ bên trong', 'Kho tàng các cơ quan nội tạng nuôi dưỡng cơ thể.', '🫁', v_ch4_id, 14, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('胃', 'イ', '', 'i', 'VỊ', 'Dạ dày, bao tử', 9, '田 -> 月', 'ストレスで 胃が 痛むことが あります。', 'Sutoresu de i ga itamu koto ga arimasu.', 'Căng thẳng đôi khi khiến dạ dày bị đau thắt.', 'N2', 'Cánh đồng tiêu hóa thịt', 'Ruộng đồng tiêu hóa biến thức ăn thành dinh dưỡng.', '🍵', v_ch4_id, 15, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('筋', 'キン', 'すじ', 'suji', 'CÂN', 'Cơ bắp, đường gân, cốt truyện', 12, '竹 -> ⺼ -> 力', '筋力トレーニングを 毎日 欠かさず 行います。', 'Kinryoku toreeningu o mainichi kakasazu okonaimasu.', 'Tập luyện thể lực cơ bắp mỗi ngày không bỏ sót.', 'N2', 'Ống tre sinh sức mạnh cơ bắp', 'Sợi gân dẻo dai như cành tre truyền sức lực.', '💪', v_ch4_id, 16, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('骨', 'コツ', 'ほね', 'hone', 'CỐT', 'Xương cốt, cốt lõi', 10, '冎 -> 月', 'カルシウムを 摂って 骨を 強くします。', 'Karushiumu o totte hone o tsuyokushimasu.', 'Bổ sung canxi để xương cốt thêm chắc khỏe.', 'N2', 'Khung xương nâng đỡ thịt', 'Khung xương vững chắc định hình cơ thể sống.', '🦴', v_ch4_id, 17, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('節', 'セツ', 'ふし', 'fushi', 'TIẾT', 'Khớp xương, đốt tre, tiết chế', 13, '竹 -> 即', '関節の 痛みを 和らげる ストレッチ。', 'Kansetsu no itami o yawarageru sutoretchi.', 'Động tác kéo giãn làm dịu các cơn đau khớp xương.', 'N2', 'Đốt tre phân chia đều đặn', 'Đốt tre phân khúc tựa như các khớp nối xương cốt.', '🎋', v_ch4_id, 18, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('症', 'ショウ', '', 'shou', 'CHỨNG', 'Triệu chứng, bệnh chứng', 10, '疒 -> 正', '初期症状を 見逃さないことが 大切です。', 'Shokishoujou o minogasanai koto ga taisetsu desu.', 'Điều quan trọng là không được bỏ qua các triệu chứng ban đầu.', 'N2', 'Bệnh trạng bộc lộ chân chính', 'Cơn bệnh bộc lộ dấu hiệu đúng thực trạng.', '🤒', v_ch4_id, 19, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('状', 'ジョウ', '', 'jou', 'TRẠNG', 'Trạng thái, tình trạng', 7, '爿 -> 犬', '患者の 容態を 慎重に 観察します。', 'Kanja no youtai o shinchou ni kansatsushimasu.', 'Quan sát cẩn thận tình trạng bệnh của bệnh nhân.', 'N2', 'Chú chó nằm trên phản', 'Con chó nằm ngoan ngoãn trong tư thế tĩnh lặng.', '📋', v_ch4_id, 20, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('因', 'イン', 'よ・る', 'yo', 'NHÂN', 'Nguyên nhân, duyên cớ', 6, '囗 -> 大', '事故の 原因を 徹底的に 調査します。', 'Jiko no gen-in o tetteiteki ni chousashimasu.', 'Điều tra triệt để nguyên nhân vụ tai nạn.', 'N2', 'Con người nằm trong chiếu giới hạn', 'Con người an vị trong khuôn khổ tìm ra căn nguyên.', '🔍', v_ch4_id, 21, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('況', 'キョウ', '', 'kyou', 'HUỐNG', 'Tình huống, hoàn cảnh', 8, '氵 -> 兄', '現地の 状況を リアルタイムで 伝えます。', 'Genchi no joukyou o riarutaimu de tsutaemasu.', 'Truyền tải tình huống thực địa theo thời gian thực.', 'N2', 'Dòng nước người anh quan sát', 'Dòng nước biến chuyển thể hiện tình thế.', '📊', v_ch4_id, 22, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('態', 'タイ', '', 'tai', 'THÁI', 'Thái độ, hình thái', 14, '能 -> 心', '前向きな 態度で 治療に 専念します。', 'Maemuki na taido de chiryou ni sennenshimasu.', 'Tập trung điều trị với thái độ tích cực lạc quan.', 'N2', 'Năng lực xuất phát từ trái tim', 'Tâm thái an nhiên sinh ra năng lực vượt bệnh.', '🧘', v_ch4_id, 23, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('圧', 'アツ', '', 'atsu', 'ÁP', 'Áp lực, huyết áp', 5, '厂 -> 土 -> 丶', '血圧を 毎日 測って 記録します。', 'Ketsuatsu o mainichi hakatte kirokushimasu.', 'Đo và ghi lại chỉ số huyết áp mỗi ngày.', 'N2', 'Đất đè nén dưới vách đá', 'Khối đất lớn bị đè ép dưới vách núi chênh vênh.', '🩸', v_ch4_id, 24, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('傷', 'ショウ', 'きず, いた・む', 'kizu', 'THƯƠNG', 'Vết thương, tổn thương', 13, '亻 -> 昜', '転んで 膝に 軽い 傷を 負いました。', 'Koronde hiza ni karui kizu o oimashita.', 'Bị ngã xước nhẹ một vết thương ở đầu gối.', 'N2', 'Người phơi mình dưới nắng chói chịu thương', 'Người chịu tổn thương cần được che chở bảo bọc.', '🩹', v_ch4_id, 25, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('処', 'ショ', '', 'sho', 'XỨ', 'Xử trí, nơi chốn, xử phạt', 5, '夂 -> 几', '救急車が 来るまで 適切な 応急処置を します。', 'Kyuukyuusha ga kuru made tekisetsu na oukyuushochi o shimasu.', 'Tiến hành sơ cứu đúng cách trước khi xe cấp cứu đến.', 'N2', 'Bước đến ngồi ghế xử lý', 'Người dừng chân ngồi xuống bình tĩnh xử lý mọi việc.', '🚑', v_ch4_id, 26, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('触', 'ショク', 'さわ・る, ふ・れる', 'sawa', 'XÚC', 'Tiếp xúc, chạm vào', 13, '角 -> 虫', '美術品には 手を 触れないで ください。', 'Bijutsuhin ni wa te o furenaide kudasai.', 'Xin quý khách đừng chạm tay vào tác phẩm nghệ thuật.', 'N2', 'Sừng côn trùng cảm nhận va chạm', 'Chiếc sừng côn trùng tiếp xúc nhận biết môi trường.', '👆', v_ch4_id, 27, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('針', 'シン', 'はり', 'hari', 'CHÂM', 'Kim châm, phương châm', 10, '金 -> 十', '鍼灸院で 針治療を 受けて 体が 軽くなりました。', 'Shinkyuuin de harichiryou o ukete karada ga karukunarimashita.', 'Sau khi châm cứu tại phòng khám cơ thể cảm thấy nhẹ nhõm hẳn.', 'N2', 'Kim loại mũi nhọn chữ Thập', 'Mũi kim kim loại mười phân tinh xảo châm cứu.', '🪡', v_ch4_id, 28, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('抜', 'バツ', 'ぬ・く, ぬ・ける', 'nu', 'BẠT', 'Nhổ ra, rút bớt, vượt trội', 7, '扌 -> 友', '虫歯を 抜いて 痛みが 治まりました。', 'Mushiba o nuite itami ga osamarimashita.', 'Nhổ chiếc răng sâu cơn đau liền thuyên giảm.', 'N2', 'Bàn tay nắm chặt bạn nhổ lên', 'Bàn tay vững chãi rút bật chiếc gốc rễ.', '🦷', v_ch4_id, 29, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('完', 'カン', '', 'kan', 'HOÀN', 'Hoàn tất, hoàn mỹ', 7, '宀 -> 元', '準備が 完全に 整いました。', 'Junbi ga kanzen ni totonoimashita.', 'Mọi sự chuẩn bị đã hoàn tất trọn vẹn 100%.', 'N2', 'Mái nhà che chở nguyên vẹn', 'Dưới mái nhà mọi việc được chu toàn viên mãn.', '✅', v_ch4_id, 30, '/assets/kanji/n2/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('忙', 'ボウ', 'いそが・しい', 'isoga', 'MANG', 'Bận rộn', 6, '忄 -> 亡', '年末は 仕事が 非常に 忙しいです。', 'Nenmatsu wa shigoto ga hijou ni isogashii desu.', 'Dịp cuối năm công việc vô cùng bận rộn.', 'N2', 'Trái tim chết lặng vì bận rộn', 'Tâm trí bị cuốn đi trong bộn bề công việc.', '🏃‍♂️', v_ch5_id, 1, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('疲', 'ヒ', 'つか・れる', 'tsuka', 'BÌ', 'Mệt mỏi, kiệt sức', 10, '疒 -> 皮', '長時間の 会議で 精神的に 疲れました。', 'Choujikan no kaigi de seishinteki ni tsukaremashita.', 'Cuộc họp kéo dài khiến tinh thần mệt mỏi rã rời.', 'N2', 'Căn bệnh làm da dẻ hao mòn', 'Bệnh tật khiến làn da tiều tụy mệt mỏi.', '😮‍💨', v_ch5_id, 2, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('慣', 'カン', 'な・れる', 'na', 'QUÁN', 'Quen thuộc, tập quán', 14, '忄 -> 貫', '新しい 職場環境にも だいぶ 慣れました。', 'Atarashii shokubakankyou ni mo daibu naremashita.', 'Tôi đã khá quen thuộc với môi trường làm việc mới.', 'N2', 'Trái tim xuyên suốt thành thói quen', 'Tâm trí kiên trì xâu chuỗi tạo thành thói quen.', '🔁', v_ch5_id, 3, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('競', 'キョウ, ケイ', 'きそ・う', 'kiso', 'CẠNH', 'Cạnh tranh, ganh đua', 20, '立 -> 兄 -> 立 -> 兄', '二つの 企業が 市場シェアを 競い合います。', 'Futatsu no kigyou ga shijoushea o kisoiaimasu.', 'Hai doanh nghiệp cùng cạnh tranh thị phần gay gắt.', 'N2', 'Hai người cùng đứng so tài cao thấp', 'Hai đối thủ đứng thẳng cùng nhau thi đua tài năng.', '🏁', v_ch5_id, 4, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('養', 'ヨウ', 'やしな・う', 'yashina', 'DƯỠNG', 'Nuôi dưỡng, bồi bổ', 15, '羊 -> 食', '子供を 立派な 大人へと 育て養います。', 'Kodomo o rippa na otona e to sodateyashinaimasu.', 'Nuôi nấng con trẻ nên người trưởng thành ưu tú.', 'N2', 'Thức ăn nuôi dưỡng đàn cừu', 'Cung cấp thức ăn bổ dưỡng nuôi dưỡng muôn loài.', '🌱', v_ch5_id, 5, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('兼', 'ケン', 'か・ねる', 'kane', 'KIÊM', 'Kiêm nhiệm, kết hợp', 10, '兼', '彼は 社長と 営業部長を 兼任しています。', 'Kare wa shachou to eigyoubuchou o kenninshiteimasu.', 'Anh ấy kiêm nhiệm cả chức chủ tịch và trưởng phòng kinh doanh.', 'N2', 'Một tay gặt hai bó lúa', 'Một tay nắm trọn hai bó lúa kiêm toàn trọng trách.', '🤝', v_ch5_id, 6, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('就', 'シュウ, ジュ', 'つ・く', 'tsu', 'TỰU', 'Nhậm chức, đạt được, theo học', 12, '京 -> 尤', '希望の IT企業に 就職が 決まりました。', 'Kibou no aitiikigyou ni shuushoku ga kimarimashita.', 'Đã chính thức nhận việc tại công ty IT đúng nguyện vọng.', 'N2', 'Đến kinh đô lập nên đại nghiệp', 'Tiến về kinh đô gặt hái thành công sự nghiệp.', '💼', v_ch5_id, 7, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('従', 'ジュウ', 'したが・う', 'shitaga', 'TÙNG', 'Theo sau, tuân theo', 10, '彳 -> 龰', '社内規定に 従って 正しく 手続きを 行います。', 'Shanaikitei ni shitagatte tadashiku tetsuzuki o okonaimasu.', 'Tiến hành thủ tục đúng quy chuẩn theo quy định công ty.', 'N2', 'Bước chân theo người dẫn đường', 'Từng bước nối tiếp noi theo tấm gương người đi trước.', '👣', v_ch5_id, 8, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('応', 'オウ', 'こた・える', 'kota', 'ỨNG', 'Đáp ứng, phản ứng', 7, '广 -> 𠂉 -> 心', 'お客様の 要望に 柔軟に 対応します。', 'Okyakusama no youbou ni juunan ni taioushimasu.', 'Đáp ứng linh hoạt và chu đáo theo yêu cầu khách hàng.', 'N2', 'Trái tim đáp lại tiếng gọi dưới mái nhà', 'Tấm lòng chân thành phản hồi đáp ứng mong đợi.', '📞', v_ch5_id, 9, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('筋', 'キン', 'すじ', 'suji', 'CÂN', 'Nguyên tắc, mạch lạc, đường lối', 12, '竹 -> ⺼ -> 力', '筋の 通った 筋道を 立てて 提案します。', 'Suji no tootta sujimichi o tatete teianshimasu.', 'Đưa ra đề xuất có lập luận mạch lạc và chặt chẽ.', 'N2', 'Đường gân mạch lạc thông suốt', 'Mạch gân thông suốt dẫn dắt tư duy chuẩn mực.', '💡', v_ch5_id, 10, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('課', 'カ', '', 'ka', 'KHÓA', 'Phòng ban, bài học, áp đặt', 15, '言 -> 果', '営業第一課に 配属されることになりました。', 'Eigyoudaiikka ni haizokusareru koto ni narimashita.', 'Tôi được điều động phân công về Phòng Kinh doanh 1.', 'N2', 'Lời giao quả ngọt nhiệm vụ', 'Lời chỉ đạo giao phó kết quả công tác.', '📂', v_ch5_id, 11, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('論', 'ロン', '', 'ron', 'LUẬN', 'Thảo luận, lý luận, bài luận', 15, '言 -> 侖', '卒業論文の 執筆に 取り組んでいます。', 'Sotsugyouronbun no shippitsu ni torikundeimasu.', 'Đang tập trung dốc sức viết khóa luận tốt nghiệp.', 'N2', 'Lời nói có trật tự luận cứ', 'Ngôn từ chặt chẽ lập luận thuyết phục.', '📑', v_ch5_id, 12, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('採', 'サイ', 'と・る', 'to', 'THẢI', 'Tuyển chọn, thu hái', 11, '扌 -> 采', '優秀な 新入社員を 積極的に 採用します。', 'Yuushuu na shinnyuushain o sekkyokuteki ni saiyoushimasu.', 'Tích cực tuyển chọn những nhân viên mới xuất sắc.', 'N2', 'Bàn tay hái quả ngọt trên cây', 'Bàn tay chọn lựa hái những trái quả ngon nhất.', '🍇', v_ch5_id, 13, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('募', 'ボ', 'つの・る', 'tsuno', 'MỘ', 'Chiêu mộ, quyên góp', 12, '莫 -> 力', '新規プロジェクトの 参加者を 募集しています。', 'Shinki purojekuto no sankasha o boshuushiteimasu.', 'Đang chiêu mộ thành viên tham gia dự án mới.', 'N2', 'Dốc sức tìm kiếm nhân tài nơi cỏ nội', 'Dồn sức kêu gọi tuyển mộ người tài chung chí hướng.', '📢', v_ch5_id, 14, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('履', 'リ', 'は・く', 'ha', 'LÝ', 'Lý lịch, đi giày, thực hiện', 15, '尸 -> 復', '履歴書を 写真付きで 提出してください。', 'Rirekisho o shashintsuki de teishutsushitekudasai.', 'Vui lòng nộp bản sơ yếu lý lịch có dán ảnh kèm theo.', 'N2', 'Dấu chân bước qua năm tháng', 'Bước chân lặp lại ghi dấu hành trình kinh nghiệm sống.', '📜', v_ch5_id, 15, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('適', 'テキ', 'かな・う', 'kana', 'THÍCH', 'Thích hợp, phù hợp', 14, '啻 -> 辶', '自分の 適性に 合った 職業を 選びます。', 'Jibun no tekisei ni atta shokugyou o erabimasu.', 'Lựa chọn ngành nghề phù hợp với năng khiếu bản thân.', 'N2', 'Bước đi đến nơi chốn vừa vặn', 'Bước chân tìm đến bến đỗ thích hợp nhất.', '🎯', v_ch5_id, 16, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('般', 'ハン', '', 'han', 'BAN', 'Phổ biến, thông thường', 10, '舟 -> 殳', '一般的な 常識を 身につけることが 大切です。', 'Ippanteki na joushiki o minitsukeru koto ga taisetsu desu.', 'Trang bị kiến thức thường thức thông thường là rất cần thiết.', 'N2', 'Con thuyền xuôi chèo phổ thông', 'Mái chèo xoay thuyền lướt đi khắp sông nước bình dân.', '⛵', v_ch5_id, 17, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('総', 'ソウ', '', 'sou', 'TỔNG', 'Tổng thể, toàn bộ', 14, '糸 -> 𢛳', '全社員が 出席する 総会が 開催されます。', 'Zenshain ga shussekishuru soukai ga kaisaisaremasu.', 'Đại hội toàn thể với sự tham gia của toàn bộ nhân viên.', 'N2', 'Sợi chỉ thắt kết toàn bộ', 'Sợi tơ kết nối quy tụ mọi nhánh về một mối.', '🌐', v_ch5_id, 18, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('企', 'キ', 'くわだ・てる', 'kuwada', 'XÍ', 'Xí nghiệp, mưu tính', 6, '人 -> 止', '社会に 貢献する 優良企業を 目指します。', 'Shakai ni koukenshuru yuuryoukigyou o mezashimasu.', 'Hướng tới xây dựng doanh nghiệp uy tín cống hiến cho xã hội.', 'N2', 'Người kiễng chân trông xa mưu tính', 'Người đứng vững phóng tầm mắt quy hoạch tương lai.', '🏢', v_ch5_id, 19, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('索', 'サク', '', 'saku', 'TÁC', 'Tìm kiếm, dây thừng', 10, '十 -> 冖 -> 糸', 'より 効率的な 解決策を 模索します。', 'Yori kouritsuteki na kaiketsusaku o mosakushimasu.', 'Tìm kiếm thăm dò giải pháp tối ưu và hiệu quả hơn.', 'N2', 'Lần theo sợi dây tìm đường', 'Dò dẫm lần theo manh mối sợi dây cứu sinh.', '🔍', v_ch5_id, 20, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('依', 'イ, エ', '', 'i', 'Y', 'Ỷ lại, dựa dẫm, theo', 8, '亻 -> 衣', '専門家に 翻訳業務を 依頼しました。', 'Senmonka ni hon-yakugyoumu o iraishimashita.', 'Ủy thác nghiệp vụ dịch thuật cho chuyên gia.', 'N2', 'Người dựa vào tấm áo ấm', 'Người khoác tấm áo ấm nương tựa che chở.', '🤝', v_ch5_id, 21, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('頼', 'ライ', 'たの・む, たよ・る', 'tano', 'LẠI', 'Nhờ vả, tin cậy', 16, '束 -> 頁', '彼は 仲間から とても 頼りに されています。', 'Kare wa nakama kara totemo tayori ni sareteimasu.', 'Anh ấy là người được bạn bè đồng nghiệp hết sức tin cậy.', 'N2', 'Trang giấy buộc chặt niềm tin', 'Bó lúa kèm trang giấy giao kết đáng gửi gắm.', '🙏', v_ch5_id, 22, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('比', 'ヒ', 'くら・べる', 'kura', 'TỶ', 'So sánh, tỷ số', 4, '匕 -> 匕', '二つの プランの コストを 比較します。', 'Futatsu no puran no kosuto o hikakushimasu.', 'So sánh đối chiếu chi phí giữa hai phương án.', 'N2', 'Hai người đứng sát so đọ', 'Hai người đứng kề nhau đo lường so sánh.', '⚖️', v_ch5_id, 23, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('較', 'カク', '', 'kaku', 'GIÁC', 'So sánh, đối chiếu', 13, '車 -> 交', '前年と 比べて 業績が 改善しました。', 'Zennen to kurabete gyouseki ga kaizenshimashita.', 'So với năm ngoái thì hiệu quả kinh doanh đã tiến bộ rõ rệt.', 'N2', 'Giao điểm xe cộ so sánh', 'Hai cỗ xe giao nhau đối sánh tốc độ.', '📊', v_ch5_id, 24, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('評', 'ヒョウ', '', 'hyou', 'BÌNH', 'Bình luận, đánh giá', 12, '言 -> 平', '顧客から 高い 評価を いただきました。', 'Kokyaku kara takai hyouka o itadakimashita.', 'Nhận được đánh giá rất cao từ phía quý khách hàng.', 'N2', 'Lời nói bình đẳng phân minh', 'Lời nhận xét công tâm cân bằng không thiên vị.', '⭐', v_ch5_id, 25, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('価', 'カ', 'あたい', 'atai', 'GIÁ', 'Giá trị, định giá', 8, '亻 -> 賈', '商品の 価値を 正しく 見極めます。', 'Shouhin no kachi o tadashiku mikwamemasu.', 'Nhìn nhận và định giá chuẩn xác giá trị món hàng.', 'N2', 'Thương nhân định giá món đồ', 'Người buôn bán công định giá trị hàng hóa.', '🏷️', v_ch5_id, 26, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('改', 'カイ', 'あらた・める, あらた・まる', 'arata', 'CẢI', 'Cải cách, sửa đổi', 7, '己 -> 攵', '業務の プロセスを 改めて 効率化します。', 'Gyoumu no purosesu o aratamete kouritsukashimasu.', 'Cải tiến lại quy trình nghiệp vụ để nâng cao hiệu quả.', 'N2', 'Gõ roi sửa mình tiến bộ', 'Dùng roi sửa trị bản thân hướng tới điều tốt đẹp.', '🛠️', v_ch5_id, 27, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('善', 'ゼン', 'よ・い', 'yo', 'THIỆN', 'Thiện lương, hoàn thiện', 12, '羊 -> 䒑 -> 口', '職場環境の 改善を 図ります。', 'Shokubakankyou no kaizen o hakarimasu.', 'Lên kế hoạch cải thiện nâng cao môi trường làm việc.', 'N2', 'Chú cừu thốt lời thiện lành', 'Con cừu thốt lời lương thiện tạo điều lành.', '✨', v_ch5_id, 28, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勤', 'キン, ゴン', 'つと・める, つと・まる', 'tsuto', 'CẦN', 'Cần cù, làm việc', 12, '堇 -> 力', '大手商社に 十年間 勤務しています。', 'Oote shousha ni juunenkan kinmushiteimasu.', 'Đã làm việc cần mẫn suốt 10 năm tại tập đoàn thương mại lớn.', 'N2', 'Dốc sức cần cù đất đai', 'Dốc toàn lực cày cuốc cần cù gặt hái thành quả.', '💼', v_ch5_id, 29, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('務', 'ム', 'つと・める', 'tsuto', 'VỤ', 'Nhiệm vụ, chức vụ', 11, '敄 -> 力', '与えられた 義務と 責任を 果たします。', 'Ataerareta gimu to sekinin o hatashimasu.', 'Hoàn thành trọn vẹn nghĩa vụ và trách nhiệm được giao phó.', 'N2', 'Dốc sức thi hành quân vụ', 'Cầm mác dốc lòng hoàn thành nghĩa vụ nước nhà.', '📋', v_ch5_id, 30, '/assets/kanji/n2/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('営', 'エイ', 'いとな・む', 'itona', 'DOANH', 'Kinh doanh, quản trị', 12, '𤇾 -> 呂', '父は 小さな 会社を 経営しています。', 'Chichi wa chiisana kaisha o keieishiteimasu.', 'Cha tôi đang kinh doanh một công ty nhỏ.', 'N2', 'Đốt đuốc làm việc đêm', 'Thắp đèn lồng quản lý cơ nghiệp kinh doanh.', '🏢', v_ch6_id, 1, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('景', 'ケイ', '', 'kei', 'CẢNH', 'Cảnh sắc, kinh tế', 12, '日 -> 京', '景気が 回復して 消費が 増えています。', 'Keiki ga kaifukushite shouhi ga fueteimasu.', 'Tình hình kinh tế phục hồi khiến sức tiêu dùng tăng lên.', 'N2', 'Ánh nắng chiếu kinh đô', 'Mặt trời chiếu sáng cảnh sắc rực rỡ nơi kinh thành.', '📈', v_ch6_id, 2, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('資', 'シ', '', 'shi', 'TƯ', 'Tài sản, tư bản, nguồn vốn', 13, '次 -> 貝', '新規事業の ための 資金を 調達します。', 'Shinkijigyou no tame no shikin o choutatsushimasu.', 'Huy động nguồn vốn kinh phí cho dự án kinh doanh mới.', 'N2', 'Tiền bạc tích lũy lần lượt', 'Vỏ sò tiền tệ tích lũy thứ tự làm vốn liếng.', '💰', v_ch6_id, 3, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('益', 'エキ, ヤク', '', 'eki', 'ÍCH', 'Lợi ích, lợi nhuận', 10, '八 -> 皿', '今期の 営業利益は 過去最高を 記録しました。', 'Konki no eigyourieki wa kakosaikou o kirokushimashita.', 'Lợi nhuận kinh doanh kỳ này đạt mức kỷ lục lịch sử.', 'N2', 'Nước tràn trề trong đĩa', 'Nước đầy tràn trề trên đĩa mang lại lợi ích bội phần.', '💹', v_ch6_id, 4, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('株', 'シュ', 'かぶ', 'kabu', 'CHU', 'Cổ phiếu, gốc cây', 10, '木 -> 朱', '将来性の ある 企業の 株式を 購入します。', 'Shouraisei no aru kigyou no kabushiki o kounyuushimasu.', 'Mua cổ phiếu của doanh nghiệp có tiềm năng tương lai.', 'N2', 'Gốc cây đỏ son giá trị', 'Gốc cây vững chắc sinh sôi hoa trái lợi tức.', '📉', v_ch6_id, 5, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('債', 'サイ', '', 'sai', 'TRÁI', 'Khoản nợ, trái phiếu', 13, '亻 -> 責', '国債を 発行して 財源を 確保します。', 'Kokusai o hakkoushite zaigen o kakuho shimasu.', 'Phát hành trái phiếu chính phủ để bảo đảm nguồn thu.', 'N2', 'Người chịu trách nhiệm nợ', 'Người gánh vác trách nhiệm chi trả nợ nần.', '📜', v_ch6_id, 6, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('販', 'ハン', '', 'han', 'PHÁN', 'Bán hàng, buôn bán', 11, '貝 -> 反', '自社製品を オンラインで 販売します。', 'Jishaseihin o onrain de hanbaishimasu.', 'Bán sản phẩm của công ty mình qua mạng trực tuyến.', 'N2', 'Tiền bạc luân chuyển phản hồi', 'Vỏ sò tiền bạc luân phiên buôn bán trao đổi.', '🛍️', v_ch6_id, 7, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('購', 'コウ', '', 'kou', 'CẤU', 'Mua sắm, đặt mua', 17, '貝 -> 冓', '最新の パソコンを 購入しました。', 'Saishin no pasokon o kounyuushimashita.', 'Tôi đã mua chiếc máy vi tính đời mới nhất.', 'N2', 'Gom tiền kết cấu mua sắm', 'Gom vỏ sò tiền bạc đến chợ mua món đồ giá trị.', '🛒', v_ch6_id, 8, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('値', 'チ', 'ね, あたい', 'ne', 'TRỊ', 'Giá cả, giá trị', 10, '亻 -> 直', '品質に 見合った 値段で 提供します。', 'Hinshitsu ni miatta nedan de teikyoushimasu.', 'Cung cấp sản phẩm với giá cả tương xứng với chất lượng.', 'N2', 'Người thẳng thắn định giá', 'Người công minh đặt ra giá trị đúng đắn.', '🏷️', v_ch6_id, 9, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('額', 'ガク', 'ひたい', 'gaku', 'NGẠCH', 'Hạn mức, số tiền, vầng trán', 18, '客 -> 頁', '今月の 請求額を 確認してください。', 'Kongetsu no seikyuugaku o kakuninchitekudasai.', 'Vui lòng kiểm tra số tiền yêu cầu thanh toán tháng này.', 'N2', 'Trán khách ngẩng cao xem bảng số', 'Vầng trán trang nghiêm nhìn vào ngạch số tiền.', '💳', v_ch6_id, 10, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('財', 'ザイ, サイ', '', 'zai', 'TÀI', 'Tài chính, của cải', 10, '貝 -> 才', '国の 財政を 健全化する 取り組み。', 'Kuni no zaisei o kenzenkashuru torikumi.', 'Nỗ lực lành mạnh hóa nền tài chính quốc gia.', 'N2', 'Tiền bạc và tài năng', 'Tài năng kết hợp tiền của sinh ra tài sản phồn vinh.', '🏦', v_ch6_id, 11, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('納', 'ノウ, ナッ', 'おさ・める, おさ・まる', 'osa', 'NẠP', 'Nộp tiền, thu nạp', 10, '糸 -> 内', '期日までに 税金を 納めます。', 'Kijitsu made ni zeikin o osamemasu.', 'Nộp thuế đầy đủ trước ngày đến hạn.', 'N2', 'Sợi chỉ thu vào bên trong', 'Thu gom sợi tơ nạp vào kho cất giữ.', '📥', v_ch6_id, 12, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('増', 'ゾウ', 'ふ・える, ふ・やす, ま・す', 'fu', 'TĂNG', 'Gia tăng, tăng trưởng', 14, '土 -> 曽', '売上高が 前年比で 20％ 増えました。', 'Uriagekaka ga zennenhi de nijuupaa fuemashita.', 'Doanh thu đã tăng 20% so với cùng kỳ năm ngoái.', 'N2', 'Đất đắp thêm từng ngày', 'Khối đất đắp thêm tầng tầng lớp lớp tăng trưởng cao.', '📈', v_ch6_id, 13, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('減', 'ゲン', 'へ・る, へ・らす', 'he', 'GIẢM', 'Cắt giảm, suy giảm', 12, '氵 -> 咸', '無駄な コストを 削減する 方針です。', 'Muda na kosuto o sakugenshuru houshin desu.', 'Chủ trương cắt giảm triệt để những chi phí lãng phí.', 'N2', 'Nước vơi bớt cùng nhau', 'Dòng nước bị rút cạn hao hụt bớt đi.', '📉', v_ch6_id, 14, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('損', 'ソン', 'そこ・なう, そこ・ねる', 'soko', 'TỔN', 'Tổn thất, thua lỗ', 13, '扌 -> 員', '投資で 大きな 損害を 出してしまいました。', 'Toushi de ookina songai o dashiteshimaimashita.', 'Đầu tư thua lỗ dẫn đến tổn thất tài chính lớn.', 'N2', 'Tay làm rơi mất nhân lực', 'Bàn tay sơ suất làm rơi hao hụt mất mát của cải.', '💸', v_ch6_id, 15, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('得', 'トク', 'え・る, う・る', 'e', 'ĐẮC', 'Thu được, đắc lợi', 11, '彳 -> 旦 -> 寸', '経験から 多くの 教訓を 得ました。', 'Keiken kara ooku no kyoukun o emashita.', 'Gặt hái được nhiều bài học quý báu từ kinh nghiệm thực tiễn.', 'N2', 'Bước chân đón lấy ánh mặt trời', 'Từng bước đo lường đón lấy thành quả tốt lành.', '🎁', v_ch6_id, 16, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('拡', 'カク', '', 'kaku', 'KHUẾCH', 'Mở rộng quy mô', 11, '扌 -> 広', '事業規模を 海外へ 拡大します。', 'Jigyoukibo o kaigai e kakudaishimasu.', 'Mở rộng quy mô hoạt động kinh doanh ra thị trường nước ngoài.', 'N2', 'Bàn tay mở rộng không gian', 'Bàn tay vung rộng mở mang bờ cõi biên giới.', '🔍', v_ch6_id, 17, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('縮', 'シュク', 'ちぢ・む, ちぢ・める', 'chiji', 'SÚC', 'Co lại, thu hẹp', 17, '糸 -> 宿', '赤字部門の 規模を 縮小します。', 'Akajibumon no kibo o shukushoushimasu.', 'Thu hẹp quy mô của các bộ phận đang bị thua lỗ.', 'N2', 'Sợi chỉ thu nhỏ trong quán trọ', 'Sợi tơ co rút lại nằm gọn dưới mái hiên.', '🤏', v_ch6_id, 18, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('略', 'リャク', 'はぶ・く', 'ryaku', 'LƯỢC', 'Chiến lược, lược bỏ', 11, '田 -> 各', '企業の 成長戦略を 策定します。', 'Kigyou no seichousenryaku o sakuteishimasu.', 'Xây dựng chiến lược tăng trưởng bền vững cho doanh nghiệp.', 'N2', 'Chia ô ruộng lập mưu lược', 'Phân chia từng khoảnh ruộng định đoạt chiến lược.', '🗺️', v_ch6_id, 19, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('充', 'ジュウ', 'あ・てる', 'juu', 'SUNG', 'Sung túc, nạp đầy', 6, '亠 -> 厶 -> 儿', '余暇の 時間を 充実させます。', 'Yoka no jikan o juujitsusasemasu.', 'Làm cho thời gian rảnh rỗi thêm phong phú và sung túc.', 'N2', 'Đứa trẻ lớn khôn sung mãn', 'Đứa trẻ hấp thụ dinh dưỡng lớn bổng sung mãn.', '🔋', v_ch6_id, 20, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('加', 'カ', 'くわ・える, くわ・わる', 'kuwa', 'GIA', 'Thêm vào, tham gia', 5, '力 -> 口', '新しい 機能を システムに 追加します。', 'Atarashii kinou o shisutemu ni tsuikashimasu.', 'Bổ sung thêm tính năng mới vào hệ thống.', 'N2', 'Dùng sức cất lời tiếp sức', 'Dốc thêm sức lực và lời nói gia tăng sức mạnh.', '➕', v_ch6_id, 21, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('除', 'ジョ, ジ', 'のぞ・く', 'nozo', 'TRỪ', 'Trừ bỏ, loại bỏ', 10, '阝 -> 余', 'リストから 不要な 項目を 削除します。', 'Risuto kara fuyou na koumoku o sakujoshimasu.', 'Xóa bỏ các danh mục không cần thiết ra khỏi danh sách.', 'N2', 'Đồi bậc dọn sạch phần dư thừa', 'Bước lên bậc thềm dọn sạch rác thừa thải ra ngoài.', '❌', v_ch6_id, 22, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('余', 'ヨ', 'あま・る, あま・す', 'ama', 'DƯ', 'Dư thừa, thặng dư', 7, '人 -> 一 -> 八 -> 木', '予算に 余裕が できたので 設備を 更新します。', 'Yosan ni yoyuu ga dekita node setsubi o koushinshimasu.', 'Vì ngân sách còn dư dả nên nâng cấp thiết bị mới.', 'N2', 'Mái nhà che lúa dư dả', 'Nhà kho chứa thóc gạo dư thừa ăn muôn đời.', '🌾', v_ch6_id, 23, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('片', 'ヘン', 'かた', 'kata', 'PHIẾN', 'Một mảnh, một bên', 4, '片', '部屋の 散らかったものを 片付けます。', 'Heya no chirakattamono o katadukemasu.', 'Dọn dẹp gọn gàng đồ đạc bừa bộn trong phòng.', 'N2', 'Một nửa của tấm ván gỗ', 'Nửa mảnh ván gỗ xẻ đôi đơn chiếc.', '🧩', v_ch6_id, 24, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('裏', 'リ', 'うら', 'ura', 'LÝ', 'Mặt trái, phía sau', 13, '亠 -> 里 -> 𧘇', 'プリントの 裏面に メモを 取ります。', 'Purinto no uramen ni memo o torimasu.', 'Ghi chú vắn tắt vào mặt sau của tờ tài liệu in.', 'N2', 'Lớp lót bên trong tấm áo', 'Đường kim mũi chỉ giấu kín mặt trong tấm áo.', '🔄', v_ch6_id, 25, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('幅', 'フク', 'はば', 'haba', 'PHÚC', 'Bề rộng, phạm vi', 12, '巾 -> 畐', '道路の 幅を 広げる 工事が 行われています。', 'Douro no haba o hirogeru kouji ga okonawareteimasu.', 'Công trình mở rộng bề rộng mặt đường đang được thi công.', 'N2', 'Tấm vải cuộn đầy đặn rộng rãi', 'Cuộn vải dệt rộng thênh thang đủ may muôn áo.', '↔️', v_ch6_id, 26, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('版', 'ハン', '', 'han', 'BẢN', 'Bản in, xuất bản', 8, '片 -> 反', 'この 本の 改訂版が 発売されました。', 'Kono hon no kaiteiban ga hatsubaisaremashita.', 'Bản in sửa đổi mới của cuốn sách này vừa được mở bán.', 'N2', 'Mảnh ván khắc bản in sách', 'Mảnh ván gỗ được thợ khắc chữ in ấn sách.', '📖', v_ch6_id, 27, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('章', 'ショウ', '', 'shou', 'CHƯƠNG', 'Chương sách, huy hiệu', 11, '立 -> 早', '教科書の 第一章を 声に 出して 読みます。', 'Kyoukasho no daiisshou o koe ni dashite yomimasu.', 'Đọc to thành tiếng Chương 1 trong sách giáo khoa.', 'N2', 'Đứng thẳng dưới nắng khắc văn chương', 'Khắc ghi mười điều sáng tỏ thành chương mục huy hoàng.', '📑', v_ch6_id, 28, '/assets/kanji/n2/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('奪', 'ダツ', 'うば・う', 'uba', 'ĐOẠT', 'Đoạt lấy, cướp mất', 14, '大 -> 隹 -> 寸', '暴漢が 金品を 奪って 逃走しました。', 'Boukan ga kinpin o ubatte toushoushimashita.', 'Kẻ côn đồ cướp đoạt tiền của rồi tẩu thoát.', 'N2', 'Bàn tay lớn đoạt lấy chim trời', 'Bàn tay vung lên tóm đoạt lấy sinh mạng muôn loài.', '🦅', v_ch7_id, 1, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('殺', 'サツ, サイ', 'ころ・す', 'koro', 'SÁT', 'Sát hại, tiêu diệt', 10, '乂 -> 木 -> 殳', '映画の 主人公が 敵を 倒しました。', 'Eiga no shujinkou ga teki o taoshimashita.', 'Nhân vật chính trong phim đã hạ gục tiêu diệt kẻ thù.', 'N2', 'Cầm gậy đập cây trừ hại', 'Tay cầm binh khí đâm chém tiêu diệt mầm họa.', '🗡️', v_ch7_id, 2, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('震', 'シン', 'ふる・える, ふる・う', 'furu', 'CHẤN', 'Rung chuyển, động đất', 15, '雨 -> 辰', '恐怖で 声が 震えていました。', 'Kyoufu de koe ga furueteimashita.', 'Giọng nói run rẩy bần bật vì quá khiếp sợ.', 'N2', 'Mưa sấm rồng cựa quậy rung trời', 'Mưa giông sấm chớp làm mặt đất rung chuyển dữ dội.', '🌋', v_ch7_id, 3, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('迷', 'メイ', 'まよ・う', 'mayo', 'MÊ', 'Mê hoặc, lạc đường', 9, '米 -> 辶', '見知らぬ 街で 道に 迷ってしまいました。', 'Mishiranu machi de michi ni mayotteshimaimashita.', 'Tôi bị lạc đường giữa thành phố xa lạ.', 'N2', 'Hạt gạo vương vãi trên đường lạc lối', 'Theo dấu gạo rơi bước đi lúng túng mất phương hướng.', '❓', v_ch7_id, 4, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('暴', 'ボウ, バク', 'あば・れる, あば・く', 'aba', 'BẠO', 'Bạo lực, phơi bày', 15, '日 -> 共 -> 氺', '暴力を 振るうことは 決して 許されません。', 'Bouryoku o furuu koto wa kesshite yurusaremasen.', 'Hành vi sử dụng bạo lực tuyệt đối không thể tha thứ.', 'N2', 'Dưới nắng bàn tay cuồng nộ', 'Mặt trời phơi bày sự giận dữ cuồng phong bạo loạn.', '💥', v_ch7_id, 5, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('恐', 'キョウ', 'おそ・れる, おそ・ろしい', 'oso', 'KHỦNG', 'Khủng khiếp, sợ hãi', 10, '巩 -> 心', '暗闇の 奥に 恐怖を 感じました。', 'Kurayami no oku ni kyoufu o kanjimashita.', 'Cảm thấy nỗi sợ hãi tột cùng sâu trong bóng đêm tối tăm.', 'N2', 'Trái tim thắt lại vì hoảng sợ', 'Nắm chặt bàn tay mà lòng đầy âu lo khiếp đảm.', '😱', v_ch7_id, 6, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('緊', 'キン', '', 'kin', 'KHẨN', 'Khẩn cấp, siết chặt', 10, '臤 -> 糸', '緊迫した 空気が 会場に 漂っています。', 'Kimpaku shita kuuki ga kaijou ni tayoutteimasu.', 'Bầu không khí căng thẳng khẩn trương bao trùm cả khán phòng.', 'N2', 'Sợi dây siết chặt khẩn trương', 'Dây thừng kéo căng siết chặt báo động tình huống nguy cấp.', '🚨', v_ch7_id, 7, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('張', 'チョウ', 'は・る', 'ha', 'TRƯƠNG', 'Giương cung, căng thẳng', 11, '弓 -> 長', '緊張を 解すために 深呼吸を します。', 'Kinchou o hogusu tame ni shinkokyuu o shimasu.', 'Hít thở thật sâu để giải tỏa cơn hồi hộp căng thẳng.', 'N2', 'Cây cung kéo căng dây dài', 'Giương cây cung dài căng hết cỡ chuẩn bị bắn tên.', '🏹', v_ch7_id, 8, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('破', 'ハ', 'やぶ・る, やぶ・れる', 'yabu', 'PHÁ', 'Phá vỡ, rách rưới', 10, '石 -> 皮', '約束を 破ることは 信頼を 失います。', 'Yakusoku o yaburu koto wa shinrai o ushinaimasu.', 'Phá vỡ lời hứa sẽ đánh mất đi lòng tin của người khác.', 'N2', 'Tảng đá đập rách da', 'Tảng đá va đập xé rách lớp vỏ bảo bọc.', '💔', v_ch7_id, 9, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('割', 'カツ', 'わ・る, わ・れる, さ・く', 'wa', 'CÁT', 'Cắt đôi, phân chia, giảm giá', 12, '害 -> 刂', 'グラスが 床に 落ちて 割れました。', 'Gurasu ga yuka ni ochite waremashita.', 'Chiếc ly rơi xuống sàn nhà vỡ tan tành.', 'N2', 'Dùng dao cắt tan hiểm hại', 'Lưỡi dao vung cắt phân chia đồ vật làm nhiều mảnh.', '🔨', v_ch7_id, 10, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('別', 'ベツ', 'わか・れる', 'waka', 'BIỆT', 'Ly biệt, đặc biệt', 7, '另 -> 刂', '駅の ホームで 涙を 流して 別れました。', 'Eki no hoomu de namida o nagashite wakaremashita.', 'Gạt nước mắt nói lời chia tay trên sân ga tàu.', 'N2', 'Dùng dao cắt đứt duyên nợ', 'Lưỡi dao phân chia rẽ lối đôi người đôi ngả.', '👋', v_ch7_id, 11, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('離', 'リ', 'はな・れる, はな・す', 'hana', 'LY', 'Rời xa, tách rời', 18, '亠 -> 凶 -> 隹', '故郷を 遠く 離れて 一人暮らしを 始めます。', 'Kokyou o tooku hanarete hitorigurashi o hajimemasu.', 'Rời xa quê hương bắt đầu cuộc sống tự lập một mình.', 'N2', 'Chú chim bay xa rời tổ', 'Cánh chim vỗ cánh bay vút rời xa mảnh đất cằn cỗi.', '🕊️', v_ch7_id, 12, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('印', 'イン', 'しるし', 'shirushi', 'ẤN', 'Dấu ấn, in ấn, con dấu', 6, '⺕ -> 卩', '重要な 書類に 認印を 押します。', 'Juuyou na shorui ni mitomein o oshimasu.', 'Đóng dấu mộc xác nhận vào tập tài liệu quan trọng.', 'N2', 'Tay quỳ xuống đóng dấu ấn tín', 'Bàn tay ấn chiếc ngọc ấn lên trang giấy.', '🔖', v_ch7_id, 13, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('象', 'ショウ, ゾウ', '', 'shou', 'TƯỢNG', 'Hiện tượng, con voi', 12, '⺈ -> 彑 -> 豕', '初対面の 印象が とても 良かったです。', 'Shotaimen no inshou ga totemo yokatta desu.', 'Ấn tượng trong lần gặp gỡ đầu tiên rất tuyệt vời.', 'N2', 'Hình dáng chú voi to lớn', 'Hình bóng vĩ đại của con voi khắc họa dáng dấp.', '🐘', v_ch7_id, 14, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('与', 'ヨ', 'あた・える', 'ata', 'DỮ', 'Trao cho, ban tặng', 3, '一 -> 丂', '彼に 新しい チャンスを 与えます。', 'Kare ni atarashii chansu o ataemasu.', 'Trao cho anh ấy một cơ hội mới để thử sức.', 'N2', 'Hai tay nâng niu trao tặng', 'Đôi bàn tay nâng niu ban trao quà tặng chân thành.', '🤲', v_ch7_id, 15, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('齢', 'レイ', '', 'rei', 'LINH', 'Tuổi thọ, tuổi tác', 17, '歯 -> 令', '年齢に 関係なく 挑戦し 続けます。', 'Nenrei ni kankeinaku chousenshi tsuzukemasu.', 'Không màng đến tuổi tác vẫn tiếp tục theo đuổi thử thách.', 'N2', 'Bộ răng theo mệnh lệnh năm tháng', 'Hàm răng ghi dấu số tuổi đời người trải qua.', '🎂', v_ch7_id, 16, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('箱', 'ソウ', 'はこ', 'hako', 'TƯƠNG', 'Chiếc hộp, hòm thư', 15, '竹 -> 相', 'プレゼントを 綺麗な 箱に 入れます。', 'Purezento o kirei na hako ni iremasu.', 'Đặt món quà xinh xắn vào trong chiếc hộp trang trọng.', 'N2', 'Hộp tre đan tinh xảo tương trợ', 'Chiếc hộp bằng tre đan khéo cất giữ đồ quý.', '📦', v_ch7_id, 17, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('際', 'サイ', 'きわ', 'kiwa', 'TẾ', 'Dịp, giao tế, bờ cõi', 14, '阝 -> 祭', '日本に 来日した 際に 友達と 再会しました。', 'Nihon ni rainichishita sai ni tomodachi to saikaishimashita.', 'Vào dịp đến Nhật tôi đã hội ngộ lại với bạn bè xưa.', 'N2', 'Đứng bên bàn tế lễ trong dịp trọng đại', 'Lễ tế linh thiêng bên sườn núi ghi dấu thời khắc.', '🎉', v_ch7_id, 18, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('遊', 'ユウ', 'あそ・ぶ', 'aso', 'DU', 'Vui chơi, du ngoạn', 12, '方 -> 斿 -> 辶', '休日に テーマパークで 楽しく 遊ぶ。', 'Kyuujitsu ni teemapaaku de tanoshiku asobu.', 'Vui chơi thỏa thích tại công viên giải trí ngày nghỉ.', 'N2', 'Đứa trẻ tung tăng cờ phướn du hành', 'Dưới lá cờ thong dong dạo chơi khắp bốn phương.', '🎡', v_ch7_id, 19, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('誘', 'ユウ', 'さそ・う', 'saso', 'DỤ', 'Rủ rê, quyến rũ, dụ dỗ', 14, '言 -> 秀', '友達を 誘って 映画を 見に 行きました。', 'Tomodachi o sasotte eiga o mi ni ikimashita.', 'Rủ bạn cùng đi xem phim rạp.', 'N2', 'Lời nói tài hoa quyến rũ lòng người', 'Lời lẽ duyên dáng rủ rê mời mọc hấp dẫn.', '💌', v_ch7_id, 20, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勧', 'カン', 'すす・める', 'susu', 'KHUYẾN', 'Khuyên bảo, mời chào', 19, '雚 -> 力', '体に 良い 健康茶を 人に 勧めます。', 'Karada ni yoi kenkoucha o hito ni susumemasu.', 'Khuyên mọi người nên dùng trà thảo mộc tốt cho sức khỏe.', 'N2', 'Dốc sức hót như chim khuyên răn', 'Dốc lòng truyền đạt lời hay lẽ phải khuyên nhủ.', '🗣️', v_ch7_id, 21, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('寄', 'キ', 'よ・る, よ・せる', 'yo', 'KÍ', 'Ghé qua, gửi gắm, quyên góp', 11, '宀 -> 奇', '帰宅の 途中で スーパーに 立ち寄ります。', 'Kitaku no tochuu de suupaa ni tachiyorimasu.', 'Ghé tạt vào siêu thị trên đường đi làm về nhà.', 'N2', 'Dưới mái nhà có điều kỳ lạ ghé thăm', 'Dừng chân nương náu dưới mái hiên ghé qua.', '🏪', v_ch7_id, 22, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('送', 'ソウ', 'おく・る', 'oku', 'TỐNG', 'Tiễn biệt, gửi đi', 9, '关 -> 辶', '空港まで 友達を 車で 送りました。', 'Kuukou made tomodachi o kuruma de okurimashita.', 'Lái xe đưa tiễn bạn ra tận sân bay.', 'N2', 'Bước chân tiễn đưa trao gửi', 'Đôi bàn tay nâng niu tiễn bước người thân lên đường.', '🚗', v_ch7_id, 23, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('占', 'セン', 'うらな・う, し・める', 'uranau', 'CHIÊM', 'Bói toán, chiếm lĩnh', 5, '卜 -> 口', '市場の シェア 60％を 占めています。', 'Shijou no shea rokujuppaa o shimeteimasu.', 'Chiếm lĩnh tới 60% thị phần trên toàn thị trường.', 'N2', 'Bói quẻ truyền miệng phán truyền', 'Xem quẻ bói hỏi việc xem xét vận mệnh.', '🔮', v_ch7_id, 24, '/assets/kanji/n2/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('周', 'シュウ', 'まわ・り', 'mawa', 'CHU', 'Xung quanh, chu vi', 8, '冂 -> 吉', '学校の 周辺には 緑が 多く あります。', 'Gakkou no shuuhen ni wa midori ga ooku arimasu.', 'Xung quanh trường học có rất nhiều cây xanh bóng mát.', 'N2', 'Lời chúc tốt lành phủ khắp bốn phương', 'Vòng tròn chu toàn bao bọc điều cát tường.', '⭕', v_ch8_id, 1, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('囲', 'イ', 'かこ・む, かこ・う', 'kako', 'VI', 'Bao quanh, phạm vi', 7, '囗 -> 井', '美しい 自然に 囲まれた 静かな 村。', 'Utsukushii shizen ni kakomareta shizuka na mura.', 'Ngôi làng yên bình được bao bọc bởi thiên nhiên tươi đẹp.', 'N2', 'Tường thành bao bọc chiếc giếng làng', 'Tường lũy khép kín che chắn nguồn nước mát lành.', '🏞️', v_ch8_id, 2, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('協', 'キョウ', '', 'kyou', 'HIỆP', 'Hợp tác, chung sức', 8, '十 -> 力 -> 力 -> 力', 'みんなで 力を 合わせて 協力します。', 'Minna de chikara o awasete kyouryokushimasu.', 'Mọi người đồng lòng hợp sức cùng nhau hoàn thành nhiệm vụ.', 'N2', 'Ba người dốc sức mười phần', 'Ba nguồn sức lực chung tay hiệp lực tạo nên kỳ tích.', '🤝', v_ch8_id, 3, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('互', 'ゴ', 'たが・い', 'taga', 'HỖ', 'Tương hỗ, lẫn nhau', 4, '互', 'お互いを 尊重し合える 関係を 築きます。', 'Otagai o sonchoushiaeru kankei o kizukimasu.', 'Xây dựng mối quan hệ tôn trọng và thấu hiểu lẫn nhau.', 'N2', 'Hai đầu dây đan móc tương hỗ', 'Móc nối hai đầu gắn kết chặt chẽ bổ trợ nhau.', '🔗', v_ch8_id, 4, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('共', 'キョウ', 'とも', 'tomo', 'CỘNG', 'Chung, cùng nhau', 6, '卄 -> 八', '同じ 目的を 共有する 仲間たち。', 'Onaji mokuteki o kyouyuushuru nakamatachi.', 'Những người bạn cùng chí hướng chia sẻ chung một mục tiêu.', 'N2', 'Hai bàn tay nâng chén cùng nhau', 'Hai bàn tay nâng cao đồ vật cùng nhau chia sẻ.', '👥', v_ch8_id, 5, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('我', 'ガ', 'われ, わ・が', 'ware', 'NGÃ', 'Bản ngã, tôi, chúng ta', 7, '丿 -> 戈', '我が国の 伝統文化を 世界に 発信します。', 'Wagakuni no dentoubunka o sekai ni hasshinshimasu.', 'Quảng bá văn hóa truyền thống của nước ta ra toàn cầu.', 'N2', 'Cầm ngọn giáo bảo vệ cái tôi', 'Cầm cây giáo gìn giữ bản sắc và cái tôi kiên định.', '🙋', v_ch8_id, 6, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('皆', 'カイ', 'みな', 'mina', 'GIAI', 'Tất cả mọi người', 9, '比 -> 白', '皆さん、おはようございます。', 'Minasan, ohayougozaimasu.', 'Xin chào buổi sáng tất cả quý vị và các bạn.', 'N2', 'Mọi người cùng nhau tỏa sáng', 'Mọi người sánh vai đứng dưới ánh dương trong sáng.', '🧑‍🤝‍🧑', v_ch8_id, 7, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('緒', 'ショ, チョ', 'お', 'o', 'TỰ', 'Khởi đầu, đầu mối, cùng nhau', 14, '糸 -> 者', '友達と 一緒に 宿題を します。', 'Tomodachi to issho ni shukudai o shimasu.', 'Cùng bạn bè làm bài tập về nhà.', 'N2', 'Sợi chỉ xâu chuỗi mọi người', 'Sợi tơ kết nối mọi người cùng chung bước hành trình.', '🧵', v_ch8_id, 8, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('援', 'エン', '', 'en', 'VIỆN', 'Chi viện, cứu trợ, hỗ trợ', 12, '扌 -> 爰', '被災地へ 支援物資を 届けます。', 'Hisaichi e shienbusshi o todokemasu.', 'Vận chuyển hàng hóa cứu trợ đến khu vực bị thiên tai.', 'N2', 'Bàn tay kéo người thoát nạn', 'Bàn tay dang rộng chi viện cứu trợ đồng bào.', '🆘', v_ch8_id, 9, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('頼', 'ライ', 'たの・む, たよ・る', 'tano', 'LẠI', 'Trông cậy, nhờ vả', 16, '束 -> 頁', '困ったときは お互いに 頼り合います。', 'Komatta toki wa otagai ni tayoriaimasu.', 'Khi gặp khó khăn hãy nương tựa và giúp đỡ lẫn nhau.', 'N2', 'Gửi gắm trọn vẹn tập giấy', 'Buộc chặt bó tài liệu trang trọng gửi gắm niềm tin cậy.', '🤝', v_ch8_id, 10, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('抱', 'ホウ', 'だ・く, いだ・く, かか・える', 'da', 'BÃO', 'Ôm ấp, hoài bão', 8, '扌 -> 包', '大きな 夢と 抱負を 胸に 抱きます。', 'Ookina yume to houfu o mune ni idakimasu.', 'Ôm ấp trong lồng ngực những ước mơ và hoài bão lớn.', 'N2', 'Bàn tay ôm bọc lấy con thơ', 'Bàn tay vỗ về âu yếm chở che điều quý giá.', '🤗', v_ch8_id, 11, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('氏', 'シ', 'うじ', 'uji', 'THỊ', 'Dòng họ, ông/bà (lịch sự)', 4, '氏', '田中氏が 新しい 会長に 就任しました。', 'Tanakashi ga atarashii kaichou ni shuuninshimashita.', 'Ông Tanaka đã chính thức nhậm chức tân chủ tịch.', 'N2', 'Nhánh rễ cây gia tộc', 'Dòng tộc có cội nguồn rễ sâu vững chãi.', '📜', v_ch8_id, 12, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('尊', 'ソン', 'とうと・い, たっと・い', 'touto', 'TÔN', 'Tôn kính, quý giá', 12, '酋 -> 寸', '相手の 個性を 尊重する 姿勢が 大切です。', 'Aite no kosei o sonchoushuru shisei ga taisetsu desu.', 'Tư thế tôn trọng cá tính riêng của đối phương là rất quan trọng.', 'N2', 'Hai tay dâng bình rượu quý', 'Hai tay nâng niu chén rượu quý kính cẩn.', '🙏', v_ch8_id, 13, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('敬', 'ケイ', 'うやま・う', 'uyama', 'KÍNH', 'Kính trọng, kính ngữ', 12, '苟 -> 攵', '年長者を 敬い 礼儀正しく 接します。', 'Nenchousha o uyamai reigitadashiku sesshimasu.', 'Kính trọng người lớn tuổi và cư xử thật lễ độ.', 'N2', 'Gõ roi răn mình giữ lễ kính cẩn', 'Cẩn trọng trong từng hành vi cung kính người trên.', '🙇', v_ch8_id, 14, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('申', 'シン', 'もう・す', 'mou', 'THÂN', 'Nói (khiêm nhường), khai báo', 5, '申', '田中と 申します。どうぞ よろしく お願いします。', 'Tanaka to moushimasu. Douzo yoroshiku onegaishimasu.', 'Tôi tên là Tanaka. Rất mong được anh/chị giúp đỡ.', 'N2', 'Tia chớp vươn thẳng bày tỏ', 'Tia chớp vạch trời thẳng thắn bộc bạch lời khiêm nhường.', '🗣️', v_ch8_id, 15, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('参', 'サン', 'まい・る', 'mai', 'THAM', 'Tham gia, đến (khiêm nhường)', 8, '厶 -> 大 -> 彡', '明日 そちらへ 参ります。', 'Ashita sochira e mairimasu.', 'Ngày mai tôi xin phép được đến bên anh/chị.', 'N2', 'Ba vì sao soi đường tham dự', 'Bước đi theo ánh sao tham dự việc lớn.', '🚶‍♂️', v_ch8_id, 16, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('致', 'チ', 'いた・す', 'ita', 'TRÍ', 'Làm (khiêm nhường), đưa đến', 10, '至 -> 攵', '全力を 尽くして 対応いたします。', 'Zenryoku o tsukushite taiouitashimasu.', 'Tôi xin dốc hết sức mình để xử lý chu toàn.', 'N2', 'Bước đến đích dốc lòng hoàn thành', 'Bước chân chạm tới đích nỗ lực thi hành.', '🙇‍♂️', v_ch8_id, 17, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('御', 'ギョ, ゴ', 'おん, お', 'on', 'NGỰ', 'Kính ngữ (Ngự), điều khiển', 12, '彳 -> 卸', 'ご丁寧な 御礼の お手紙を いただきました。', 'Goteinei na orei no otegami o itadakimashita.', 'Tôi đã nhận được lá thư cảm ơn vô cùng ân cần chu đáo.', 'N2', 'Bước chân điều khiển xe ngựa vua', 'Từng bước đi trang trọng cung phụng hoàng cung.', '👑', v_ch8_id, 18, '/assets/kanji/n2/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('湾', 'ワン', '', 'wan', 'LOAN', 'Vịnh biển, eo biển', 12, '氵 -> 弯', '東京湾を 一周する クルーズ船。', 'Toukyouwan o isshuushuru kuruuzusen.', 'Du thuyền hành trình một vòng quanh Vịnh Tokyo.', 'N2', 'Dòng nước uốn cong thành vịnh', 'Dòng biển uốn cong che chắn bến cảng sóng êm.', '🌊', v_ch9_id, 1, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('沖', 'チュウ', 'おき', 'oki', 'TRÙNG', 'Ngoài khơi, xa bờ', 7, '氵 -> 中', '船は 沖合に 向かって 進んでいきます。', 'Fune wa okiai ni mukatte susundeikimasu.', 'Con thuyền đang tiến thẳng ra phía ngoài khơi xa.', 'N2', 'Dòng nước sâu giữa lòng biển', 'Dòng nước giữa biển khơi lộng gió.', '⛵', v_ch9_id, 2, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('浜', 'ヒン', 'はま', 'hama', 'BÀNH', 'Bờ biển, bãi biển', 10, '氵 -> 兵', '夕暮れの 砂浜を 静かに 散歩します。', 'Yuugure no sunahama o shizuka ni sanposhimasu.', 'Thong thả đi dạo trên bãi cát bờ biển lúc hoàng hôn.', 'N2', 'Người lính gác bên bờ nước', 'Dòng nước vỗ về bãi bờ nơi người lính tuần tra.', '🏖️', v_ch9_id, 3, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('江', 'コウ', 'え', 'e', 'GIANG', 'Dòng sông lớn, vịnh nhỏ', 6, '氵 -> 工', '江戸時代の 歴史と 文化を 学びます。', 'Edojidai no rekishi to bunka o manabimasu.', 'Tìm hiểu về lịch sử và văn hóa thời kỳ Edo rực rỡ.', 'N2', 'Công trình mở lối dẫn dòng nước', 'Dòng nước sông lớn chảy qua vùng đất công nghiệp.', '🏞️', v_ch9_id, 4, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('層', 'ソウ', '', 'sou', 'TẰNG', 'Tầng lớp, địa tầng', 14, '尸 -> 曽', '崖の 断面に 地層が くっきりと 見えます。', 'Gake no danmen ni chisou ga kukkiri to miemasu.', 'Trên mặt cắt vách đá nhìn thấy rõ các tầng địa chất xếp chồng.', 'N2', 'Ngôi nhà có nhiều tầng lớp chồng chất', 'Các tầng lớp đất đá tích tụ qua hàng triệu năm.', '🥞', v_ch9_id, 5, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('砂', 'サ, シャ', 'すな', 'suna', 'SA', 'Cát biển, hạt cát', 9, '石 -> 少', '砂漠の 砂は とても 細かいです。', 'Sabaku no suna wa totemo komakai desu.', 'Hạt cát sa mạc mịn màng vô cùng.', 'N2', 'Đá vụn nhỏ thành hạt cát', 'Tảng đá bị sóng gió bào mòn thành những hạt cát nhỏ bé.', '🏜️', v_ch9_id, 6, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泉', 'セン', 'いずみ', 'izumi', 'TUYỀN', 'Suối nước, suối nguồn', 9, '白 -> 水', '森の 奥から 清らかな 泉が 湧き出ています。', 'Mori no oku kara kiyoraka na izumi ga wakideteimasu.', 'Từ sâu trong cánh rừng con suối trong vắt tuôn trào.', 'N2', 'Dòng nước trắng tinh khiết', 'Dòng nước đầu nguồn tinh khiết sủi bọt trắng xóa.', '♨️', v_ch9_id, 7, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('源', 'ゲン', 'みなもと', 'minamoto', 'NGUYÊN', 'Nguồn cội, tài nguyên', 13, '氵 -> 原', '大きな 川の 源流を たどります。', 'Ookina kawa no genryuu o tadorimasu.', 'Lần theo dấu vết tìm về thượng nguồn của con sông lớn.', 'N2', 'Dòng nước từ trên cao nguyên', 'Dòng nước bắt nguồn từ cánh đồng cỏ cao nguyên bạt ngàn.', '💧', v_ch9_id, 8, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('浮', 'フ', 'う・く, う・かぶ', 'u', 'PHÙ', 'Nổi lơ lửng, trôi nổi', 10, '氵 -> 孚', '水面に 木の 葉が ぷかぷか 浮いています。', 'Suimen ni ki no ha ga pukapuka uiteimasu.', 'Chiếc lá cây đang bồng bềnh nổi lơ lửng trên mặt nước.', 'N2', 'Mẹ bế con nổi trên mặt nước', 'Dòng nước nâng đỡ con thuyền nổi êm đềm.', '🛟', v_ch9_id, 9, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('沈', 'チン', 'しず・む, しず・める', 'shizu', 'TRẦM', 'Chìm đắm, trầm lặng', 7, '氵 -> 冘', '夕日が 西の 空に ゆっくりと 沈みます。', 'Yuuhi ga nishi no sora ni yukkuri to shizumimasu.', 'Mặt trời lặn dần chìm dần nơi chân trời phía tây.', 'N2', 'Người mang gông chìm dưới nước', 'Trầm tích nặng nề chìm sâu xuống đáy nước tĩnh lặng.', '⚓', v_ch9_id, 10, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('井', 'セイ, ジョウ', 'い', 'i', 'TỈNH', 'Cái giếng nước', 4, '井', '昔の 人は 井戸から 水を 汲んでいました。', 'Mukashi no hito wa ido kara mizu o kundeimashita.', 'Người xưa múc nước ngọt mát lành từ giếng làng.', 'N2', 'Thành giếng vuông vức ghép gỗ', 'Bốn thanh gỗ ghép thành miệng giếng trữ nước ngọt.', '🪣', v_ch9_id, 11, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('沢', 'タク', 'さわ', 'sawa', 'TRẠCH', 'Đầm lầy, dòng suối nhỏ', 7, '氵 -> 尺', '山あいの 沢沿いに 道が 続いています。', 'Yamaai no sawazoi ni michi ga tsuiteimasu.', 'Con đường mòn uốn lượn ven theo khe suối nhỏ giữa hẻm núi.', 'N2', 'Dùng thước đo dòng nước đầm lầy', 'Dòng nước khe núi mang lại sự trù phú mát lành.', '🌿', v_ch9_id, 12, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宇', 'ウ', '', 'u', 'VŨ', 'Vũ trụ, không gian', 6, '宀 -> 于', '宇宙飛行士が 宇宙ステーションに 滞在します。', 'Uchuuhikoushi ga uchuusuteeshon ni taizaishimasu.', 'Phi hành gia lưu trú làm việc tại trạm vũ trụ không gian.', 'N2', 'Mái nhà bao la vô tận', 'Mái vòm vĩ đại bao trùm không gian vạn dặm.', '🚀', v_ch9_id, 13, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宙', 'チュウ', '', 'chuu', 'TRỤ', 'Thời gian vô tận, bầu trời', 8, '宀 -> 由', '夜空を 見上げると 無数の 星が 輝いています。', 'Yozora o miageru to musuu no hoshi ga kagayaiteimasu.', 'Ngước nhìn lên bầu trời đêm vô vàn vì sao lấp lánh.', 'N2', 'Dưới mái nhà thời gian tự do luân chuyển', 'Thời gian và không gian vĩnh hằng chuyển động nhịp nhàng.', '🌌', v_ch9_id, 14, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('環', 'カン', '', 'kan', 'HOÀN', 'Tuần hoàn, vòng xao', 17, '王 -> 睘', '地球の 自然環境を 保護する 活動。', 'Chikyuu no shizenkankyou o hogoshuru katsudou.', 'Hoạt động chung tay bảo vệ môi trường sinh thái Trái Đất.', 'N2', 'Viên ngọc tròn tuần hoàn', 'Chiếc vòng ngọc bích xoay vần nối kết khép kín.', '🔄', v_ch9_id, 15, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('境', 'キョウ, ケイ', 'さかい', 'sakai', 'CẢNH', 'Ranh giới, hoàn cảnh', 14, '土 -> 竟', '二つの 国の 国境を 列車で 越えます。', 'Futatsu no kuni no kokkyou o ressha de koemasu.', 'Chuyến tàu hỏa vượt qua biên giới ranh giới giữa hai quốc gia.', 'N2', 'Đất phân định ranh giới kết thúc', 'Vùng đất xác lập ranh giới phân định chủ quyền.', '🗺️', v_ch9_id, 16, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('極', 'キョク, ゴク', 'きわ・める, きわ・まる', 'kiwa', 'CỰC', 'Cực điểm, tột cùng, Bắc Cực', 12, '木 -> 亟', '南極大陸には ペンギンが 生息しています。', 'Nankyokutairiku ni wa pengin ga seisokushiteimasu.', 'Chim cánh cụt sinh sống bầy đàn tại lục địa Nam Cực.', 'N2', 'Cây cọc đóng nơi tận cùng trái đất', 'Cột mốc cắm ở điểm cực đỉnh cao nhất.', '🧭', v_ch9_id, 17, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('昇', 'ショウ', 'のぼ・る', 'nobo', 'THĂNG', 'Thăng tiến, bay lên cao', 8, '日 -> 升', '朝の 太陽が 東の 空から 昇ります。', 'Asa no taiyou ga higashi no sora kara noborimasu.', 'Vầng mặt trời rực rỡ buổi sớm mai nhô lên từ phía đông.', 'N2', 'Mặt trời dâng lên từng đấu', 'Ánh thái dương dâng cao từng nấc mang ngày mới.', '🌅', v_ch9_id, 18, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('災', 'サイ', 'わざわ・い', 'wazawa', 'TAI', 'Tai họa, thảm họa', 7, '巛 -> 火', '自然災害に 備えて 防災グッズを 準備します。', 'Shizensaigai ni sonaete bousaiguzzu o junbishimasu.', 'Chuẩn bị sẵn túi đồ phòng chống thiên tai để đề phòng thảm họa.', 'N2', 'Nước lũ cuốn theo ngọn lửa cháy', 'Lũ lụt dâng cao kết hợp lửa bốc cháy thành tai ương.', '🚨', v_ch9_id, 19, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('害', 'ガイ', '', 'gai', 'HẠI', 'Tổn hại, nguy hại', 10, '宀 -> 丰 -> 口', '環境破壊は 動植物に 深刻な 被害を 与えます。', 'Kankyouhakai wa doushokubutsu ni shinkoku na higai o ataemasu.', 'Phá hoại môi trường gây ra tổn hại nghiêm trọng cho muôn loài.', 'N2', 'Miệng nói hại người dưới mái nhà', 'Lời lẽ độc địa gây tổn thương dưới mái ấm.', '⚠️', v_ch9_id, 20, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('震', 'シン', 'ふる・える', 'furu', 'CHẤN', 'Động đất, chấn động', 15, '雨 -> 辰', '大きな 地震が 発生したときは 机の 下に 隠れます。', 'Ookina jishin ga hasseishita toki wa tsukue no shita ni kakuremasu.', 'Khi xảy ra trận động đất lớn hãy chui nấp dưới gầm bàn.', 'N2', 'Mưa giông sấm rung trời chuyển đất', 'Địa chấn rền vang rung chuyển cả mặt đất.', '🏚️', v_ch9_id, 21, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('防', 'ボウ', 'ふせ・ぐ', 'fuse', 'PHÒNG', 'Phòng ngự, đề phòng', 7, '阝 -> 方', '台風の 被害を 防ぐ ための 対策を 立てます。', 'Taifuu no higai o fusegu tame no taisaku o tatemasu.', 'Đề ra phương án phòng ngừa giảm thiểu thiệt hại do bão.', 'N2', 'Đắp đồi lũy phòng thủ bốn phương', 'Bờ thành che chắn bảo vệ nhân dân trước gió bão.', '🛡️', v_ch9_id, 22, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('影', 'エイ', 'かげ', 'kage', 'ẢNH', 'Bóng râm, bóng dáng, ảnh hưởng', 15, '景 -> 彡', '夕日に 照らされて 影が 長く 伸びています。', 'Yuuhi ni terasarete kage ga nagaku nobiteimasu.', 'Dưới ánh hoàng hôn bóng người ngả dài trên mặt đất.', 'N2', 'Cảnh sắc dưới nắng in vệt bóng', 'Ánh sáng rọi chiếu tạo nên những vệt bóng dài.', '👤', v_ch9_id, 23, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('響', 'キョウ', 'ひび・く', 'hibi', 'HƯỞNG', 'Âm vang, ảnh hưởng', 20, '郷 -> 音', '鐘の 音が 山々に 響き渡っています。', 'Kane no oto ga yamayama ni hibikiwatatteimasu.', 'Tiếng chuông ngân vang vọng truyền khắp núi rừng bao la.', 'N2', 'Âm thanh quê hương vang vọng', 'Tiếng đàn tiếng chuông quê nhà vang vọng khắp không gian.', '🔔', v_ch9_id, 24, '/assets/kanji/n2/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('講', 'コウ', '', 'kou', 'GIẢNG', 'Giảng dạy, bài giảng', 17, '言 -> 冓', '大学で 経済学の 講義を 聴講します。', 'Daigaku de keizaigaku no kougi o choukoushimasu.', 'Nghe bài giảng kinh tế học tại giảng đường đại học.', 'N2', 'Lời nói kết cấu chặt chẽ bài giảng', 'Ngôn từ giảng giải cấu trúc khúc chiết truyền tri thức.', '🎓', v_ch10_id, 1, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('義', 'ギ', '', 'gi', 'NGHĨA', 'Chính nghĩa, ý nghĩa', 13, '羊 -> 我', '正義感の 強い 人が 困った人を 助けます。', 'Seigikan no tsuyoi hito ga komatta hito o tasukemasu.', 'Người có tinh thần chính nghĩa cao đẹp luôn giúp đỡ kẻ yếu.', 'N2', 'Cầm ngọn giáo bảo vệ con cừu', 'Hy sinh bản thân bảo vệ công lý và chính nghĩa.', '⚖️', v_ch10_id, 2, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('導', 'ドウ', 'みちび・く', 'michi', 'ĐẠO', 'Dẫn dắt, chỉ đạo', 15, '道 -> 寸', '先生が 生徒を 正しい 方向へと 導きます。', 'Sensei ga seito o tadashii houkou e to michibikimasu.', 'Thầy giáo dẫn dắt học trò bước đi trên con đường đúng đắn.', 'N2', 'Đo bước chân trên đường dẫn lối', 'Bàn tay cầm thước dẫn đường mở lối soi sáng.', '🧭', v_ch10_id, 3, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('専', 'セン', 'もっぱ・ら', 'moppa', 'CHUYÊN', 'Chuyên môn, chuyên tâm', 9, '十 -> 冂 -> 一 -> 寸', '大学で 日本文学を 専門に 研究しています。', 'Daigaku de nihonbungaku o senmon ni kenkyuushiteimasu.', 'Nghiên cứu chuyên sâu về bộ môn văn học Nhật Bản tại đại học.', 'N2', 'Dồn mười tấc sức chuyên tâm', 'Tập trung toàn bộ tâm lực vào một lĩnh vực duy nhất.', '🔬', v_ch10_id, 4, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('限', 'ゲン', 'かぎ・る', 'kagi', 'HẠN', 'Giới hạn, hạn định', 9, '阝 -> 艮', '時間は 限られているので 計画的に 行動します。', 'Jikan wa kagirareteiru node keikakuteki ni koudoushimasu.', 'Thời gian là có hạn nên cần hành động có kế hoạch rõ ràng.', 'N2', 'Ngọn đồi ngoảnh lại ranh giới hạn', 'Bức tường biên giới xác lập giới hạn không được vượt.', '🛑', v_ch10_id, 5, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('修', 'シュウ, シュ', 'おさ・める', 'osa', 'TU', 'Tu sửa, tu nghiệp, học tập', 10, '亻 -> 攸 -> 彡', '海外で 研修を 受けて スキルを 磨きます。', 'Kaigai de kenshuu o ukete sukiru o migakimasu.', 'Tham gia khóa tu nghiệp nước ngoài để nâng cao kỹ năng.', 'N2', 'Người tắm gội sửa mình rạng rỡ', 'Con người trau dồi rèn luyện sửa đổi nhân cách sáng trong.', '✨', v_ch10_id, 6, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('述', 'ジュツ', 'の・べる', 'no', 'THUẬT', 'Tường thuật, bày tỏ', 8, '朮 -> 辶', '自分の 意見を 明確に 述べることが 大切です。', 'Jibun no iken o meikaku ni noberu koto ga taisetsu desu.', 'Điều cốt yếu là biết bày tỏ rõ ràng ý kiến của bản thân.', 'N2', 'Bước đi theo dấu vết trình thuật', 'Từng bước trình bày tường tận mọi ngọn ngành sự việc.', '🗣️', v_ch10_id, 7, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('将', 'ショウ', '', 'shou', 'TƯỚNG', 'Tương lai, tướng quân', 10, '爿 -> ⺼ -> 寸', '将来の 夢に 向かって 一歩ずつ 前進します。', 'Shourai no yume ni mukatte ippozutsu zenshinshimasu.', 'Từng bước vững chãi tiến về phía giấc mơ tương lai.', 'N2', 'Vị tướng cầm quyền chỉ huy', 'Tướng quân uy vũ cầm thước chỉ định bước tương lai.', '🎖️', v_ch10_id, 8, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('博', 'ハク, バク', '', 'haku', 'BÁC', 'Uyên bác, bác sĩ, bảo tàng', 12, '十 -> 甫 -> 寸', '彼は 幅広い 知識を 持つ 博士です。', 'Kare wa habahiroi chishiki o motsu hakase desu.', 'Ông ấy là vị tiến sĩ có học vấn vô cùng uyên bác.', 'N2', 'Bàn tay nắm trọn mười điều thông thái', 'Nắm vững kiến thức sâu rộng bao quát muôn loài.', '📚', v_ch10_id, 9, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('策', 'サク', '', 'saku', 'SÁCH', 'Chính sách, kế sách', 12, '竹 -> 朿', '少子化対策に 国を 挙げて 取り組みます。', 'Shoushikataisaku ni kuni o agete torikumimasu.', 'Toàn quốc chung tay thực thi các chính sách ứng phó già hóa.', 'N2', 'Thẻ tre ghi chép mưu lược', 'Bó thẻ tre khắc ghi mưu sách kế sách lược thao.', '📋', v_ch10_id, 10, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('詩', 'シ', '', 'shi', 'THI', 'Thơ ca, thi ca', 13, '言 -> 寺', '美しい 自然を 詠んだ 詩に 心が 洗われます。', 'Utsukushii shizen o yonda shi ni kokoro ga arawaremasu.', 'Tâm hồn được thanh lọc khi thưởng thức bài thơ vịnh thiên nhiên.', 'N2', 'Lời hay nơi cửa chùa thanh tịnh', 'Lời lẽ thanh tao nơi thiền môn hóa thành vần thơ.', '📜', v_ch10_id, 11, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('基', 'キ', 'もと, もとい', 'moto', 'CƠ', 'Cơ sở, nền tảng', 11, '其 -> 土', '基本を しっかりと 身につけることが 成功の 鍵です。', 'Kihon o shikkari to minitsukeru koto ga seikou no kagi desu.', 'Nắm chắc kiến thức nền tảng là chìa khóa mở lối thành công.', 'N2', 'Khung giỏ đặt trên nền đất', 'Nền móng vững chãi trên mặt đất nâng đỡ mọi công trình.', '🧱', v_ch10_id, 12, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('条', 'ジョウ', '', 'jou', 'ĐIỀU', 'Điều khoản, điều lệ', 7, '夂 -> 木', '平和条約を 締結して 友好関係を 築きます。', 'Heiwajouyaku o teiketsushite yuukoukankei o kizukimasu.', 'Ký kết hiệp ước hòa bình xây dựng tình bang giao hữu nghị.', 'N2', 'Cành cây uốn nhịp nhàng từng cành', 'Từng nhánh cây phân định rõ ràng như các điều khoản luật.', '📜', v_ch10_id, 13, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('令', 'レイ', '', 'rei', 'LỆNH', 'Mệnh lệnh, pháp lệnh', 5, '亼 -> 卩', '政府の 命令に 従って 行動します。', 'Seifu no meirei ni shitagatte koudoushimasu.', 'Hành động tuân thủ theo đúng pháp lệnh chỉ thị của chính phủ.', 'N2', 'Người quỳ gối đón nhận chỉ thị', 'Người bề dưới cung kính đón mệnh lệnh từ cấp trên.', '📜', v_ch10_id, 14, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('司', 'シ', '', 'shi', 'TI', 'Cai quản, tư pháp', 5, '刀 -> 一 -> 口', '裁判所は 司法権を 行使する 機関です。', 'Saibansho wa shihouken o koushishuru kikan desu.', 'Tòa án là cơ quan thực thi quyền lực tư pháp quốc gia.', 'N2', 'Cầm dao ra lệnh cai quản', 'Cất tiếng phán quyết nắm giữ quyền tài phán.', '⚖️', v_ch10_id, 15, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('制', 'セイ', '', 'sei', 'CHẾ', 'Chế độ, kiểm soát', 8, '牛 -> 冂 -> 刂', '新しい 評価制度を 導入します。', 'Atarashii hyoukaseido o dounyuushimasu.', 'Áp dụng đưa vào vận hành chế độ đánh giá mới.', 'N2', 'Dùng dao cắt tỉa theo khuôn khổ', 'Quy chuẩn cắt may rèn giũa đưa vào quy củ trật tự.', '📏', v_ch10_id, 16, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('省', 'セイ, ショウ', 'かえり・みる, はぶ・く', 'kaeri', 'TỈNH', 'Bộ (chính phủ), xem lại, tiết kiệm', 9, '少 -> 目', '文部科学省が 教育方針を 発表しました。', 'Monbukagakushou ga kyouikuhoushin o happyoushimashita.', 'Bộ Giáo dục Văn hóa Khoa học công bố phương châm giáo dục.', 'N2', 'Nheo mắt nhìn lại lỗi lầm', 'Mắt chăm chú nhìn kỹ để tự kiểm điểm sửa mình.', '🏛️', v_ch10_id, 17, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('庁', 'チョウ', '', 'chou', 'SẢNH', 'Cơ quan, cục, sảnh', 5, '广 -> 丁', '気象庁が 台風の 進路予想を 出しました。', 'Kishouchou ga taifuu no shinroyosou o dashimashita.', 'Cục Khí tượng đã phát đi bản tin dự báo đường đi của bão.', 'N2', 'Tòa sảnh đóng cọc trang nghiêm', 'Dưới mái hiên công sở xử lý công vụ triều đình.', '🏢', v_ch10_id, 18, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('警', 'ケイ', '', 'kei', 'CẢNH', 'Cảnh giác, cảnh sát', 19, '敬 -> 言', '警察官が 街の 安全を 守っています。', 'Keisatsukan ga machi no anzen o mamotteimasu.', 'Các chiến sĩ cảnh sát đang ngày đêm gìn giữ trật tự an toàn.', 'N2', 'Lời nói kính cẩn cảnh báo nghiêm', 'Lời cảnh báo đanh thép giữ gìn trật tự an ninh.', '👮', v_ch10_id, 19, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('察', 'サツ', '', 'satsu', 'SÁT', 'Quan sát, thấu hiểu', 14, '宀 -> 祭', '相手の 気持ちを 察して 行動します。', 'Aite no kimochi o sasshite koudoushimasu.', 'Thấu hiểu tâm trạng người đối diện để cư xử khéo léo.', 'N2', 'Dưới mái tế lễ chăm chú quan sát', 'Lắng lòng quan sát tỏ tường mọi động tĩnh.', '🔍', v_ch10_id, 20, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('署', 'ショ', '', 'sho', 'THỰ', 'Cơ quan, sở cảnh sát, ký tên', 13, '罒 -> 者', '最寄りの 警察署に 落とし物を 届けました。', 'Moyori no keisatsusho ni otoshimono o todokemashita.', 'Đem đồ nhặt được đến giao nộp tại đồn cảnh sát gần nhất.', 'N2', 'Người đứng dưới mắt lưới cơ quan', 'Người chấp pháp thi hành công vụ nơi công đường.', '🏢', v_ch10_id, 21, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('捕', 'ホ', 'つか・まえる, と・る', 'tsuka', 'BỘ', 'Bắt giữ, tóm lấy', 10, '扌 -> 甫', '警察が 犯人を スピーディーに 逮捕しました。', 'Keisatsu ga hannin o supiidii ni taihoshimashita.', 'Cảnh sát đã nhanh chóng tóm gọn và bắt giữ thủ phạm.', 'N2', 'Bàn tay vồ tóm lấy kẻ chạy trốn', 'Bàn tay cứng rắn bắt giữ kẻ phạm pháp.', '👮‍♂️', v_ch10_id, 22, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('守', 'シュ, ス', 'まも・る', 'mamo', 'THỦ', 'Bảo vệ, gìn giữ, tuân thủ', 6, '宀 -> 寸', '交通ルールを しっかり 守りましょう。', 'Koutsuuruuru o shikkari mamorimashou.', 'Hãy luôn luôn tuân thủ nghiêm ngặt luật an toàn giao thông.', 'N2', 'Bàn tay bảo vệ dưới mái nhà', 'Che chở giữ gìn an bình cho ngôi nhà thân yêu.', '🛡️', v_ch10_id, 23, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('乱', 'ラン', 'みだ・れる, みだ・す', 'mida', 'LOẠN', 'Hỗn loạn, rối loạn', 7, '舌 -> 乚', '風で 髪が 乱れてしまいました。', 'Kaze de kami ga midareteshimaimashita.', 'Cơn gió thổi làm mái tóc bị rối tung hỗn loạn.', 'N2', 'Lưỡi câu giật rối tung sợi dây', 'Dây tơ bị rối tung dẫn đến hỗn loạn.', '🌪️', v_ch10_id, 24, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('党', 'トウ', '', 'tou', 'ĐẢNG', 'Chính đảng, phe phái', 10, '尚 -> 兄', '与党と 野党が 国会で 激しく 議論します。', 'Yotou to yatou ga kokkai de hageshiku gironshimasu.', 'Đảng cầm quyền và đảng đối lập tranh luận nảy lửa tại quốc hội.', 'N2', 'Hội tụ anh em cao quý thành đảng', 'Tập hợp những người cùng tư tưởng thành một tổ chức.', '🏛️', v_ch10_id, 25, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('民', 'ミン', 'たみ', 'tami', 'DÂN', 'Nhân dân, người dân', 5, '民', '国民の 幸福を 最優先に 考えます。', 'Kokumin no koufuku o saiyuusen ni kangaemasu.', 'Đặt hạnh phúc và quyền lợi của nhân dân lên hàng đầu.', 'N2', 'Con mắt người dân lao động', 'Tầng lớp bách tính nhân dân cần lao xây dựng xã hội.', '👥', v_ch10_id, 26, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('挙', 'キョ', 'あ・げる, あ・がる', 'a', 'CỬ', 'Bầu cử, giơ tay', 10, '兴 -> 手', '来月に 衆議院の 総選挙が 行われます。', 'Raigetsu ni shuugiin no sousenkyo ga okonawaremasu.', 'Tháng sau sẽ diễn ra cuộc tổng tuyển cử bầu hạ viện.', 'N2', 'Hai tay nâng cao bầu chọn', 'Đồng lòng giơ tay tiến cử người hiền đức gánh vác.', '🗳️', v_ch10_id, 27, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('委', 'イ', 'ゆだ・ねる', 'yuda', 'ỦY', 'Ủy ban, ủy thác', 8, '禾 -> 女', 'プロジェクトの 運営を 専門委員会に 委ねます。', 'Purojekuto no un-ei o senmon-iinkai ni yudanemasu.', 'Ủy thác việc vận hành dự án cho ban ủy ban chuyên trách.', 'N2', 'Người phụ nữ gánh vác bó lúa', 'Trao trọn niềm tin ủy thác trách nhiệm nặng nề.', '🤝', v_ch10_id, 28, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('権', 'ケン, ゴン', '', 'ken', 'QUYỀN', 'Quyền lực, quyền hạn', 15, '木 -> 雚', 'すべての人に 基本的人権が 保障されています。', 'Subete no hito ni kihontekijinken ga hoshousareteimasu.', 'Quyền con người cơ bản được bảo đảm cho mọi công dân.', 'N2', 'Cân gỗ đo quyền bính', 'Chiếc cân gỗ định đoạt quyền hạn và trật tự công bằng.', '⚖️', v_ch10_id, 29, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('票', 'ヒョウ', '', 'hyou', 'PHIẾU', 'Lá phiếu, bỏ phiếu', 11, '覀 -> 示', '清き 一票を 投じて 政治に 参加します。', 'Kiyoki ippyou o toujite seiji ni sankashimasu.', 'Bỏ lá phiếu trong sạch để tham gia xây dựng nền chính trị.', 'N2', 'Tấm thẻ ghi điều mong ước', 'Tờ phiếu thiêng liêng thể hiện ý chí của cử tri.', '🗳️', v_ch10_id, 30, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('攻', 'コウ', 'せ・める', 'se', 'CÔNG', 'Tấn công, công kích', 7, '工 -> 攵', '積極的な 攻撃で 試合の 主導権を 握ります。', 'Sekkyokuteki na kougeki de shiai no shudouken o nigirimasu.', 'Chủ động tấn công dồn dập nắm quyền kiểm soát trận đấu.', 'N2', 'Dùng công cụ vung roi tấn công', 'Vung gậy tấn công mở đường vượt qua trở ngại.', '⚔️', v_ch10_id, 31, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('撃', 'ゲキ', 'う・つ', 'u', 'KÍCH', 'Bắn phá, kích nổ, đánh úp', 15, '車 -> 缶 -> 手', 'テロリストの 攻撃を 未然に 防ぎました。', 'Terorisuto no kougeki o mizen ni fusegimashita.', 'Ngăn chặn kịp thời từ sớm âm mưu tấn công khủng bố.', 'N2', 'Bàn tay vung búa đập xe vỡ tan', 'Bàn tay giáng đòn chí mạng phá vỡ trận địa.', '💥', v_ch10_id, 32, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('爆', 'バク', '', 'baku', 'BẠO', 'Bộc phát, phát nổ', 19, '火 -> 暴', '爆弾の 解体に 成功して 危機を 回避しました。', 'Bakudan no kaitai ni seikoushite kiki o kaihishimashita.', 'Gỡ bom thành công giúp hóa giải cơn khủng hoảng nguy ngập.', 'N2', 'Ngọn lửa bùng phát bạo liệt', 'Lửa cháy cuồng bạo phát nổ rung chuyển cả trời đất.', '💣', v_ch10_id, 33, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('討', 'トウ', 'う・つ', 'u', 'THẢO', 'Thảo phạt, thảo luận', 10, '言 -> 寸', '新しい 政策について 深く 討議します。', 'Atarashii seisaku ni tsuite fukaku tougishimasu.', 'Thảo luận sâu rộng bàn bạc kỹ lưỡng về chính sách mới.', 'N2', 'Dùng lời lẽ đo lường thảo phạt', 'Lời nói cân nhắc từng tấc đưa ra quyết sách.', '🗣️', v_ch10_id, 34, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('射', 'シャ', 'い・る', 'i', 'XẠ', 'Bắn, phóng ra, phát xạ', 10, '身 -> 寸', 'ロケットが 宇宙へ 向けて 発射されました。', 'Roketto ga uchuu e mukete hasshasaremashita.', 'Tên lửa vũ trụ đã được phóng lên thẳng vào không gian.', 'N2', 'Thân mình cầm cung nhắm bắn', 'Thân người giương cung chỉnh tấc phóng tên bay vút.', '🏹', v_ch10_id, 35, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('武', 'ブ, ム', '', 'bu', 'VŨ', 'Vũ trang, vũ lực, dũng mãnh', 8, '一 -> 弋 -> 止', '武力による 紛争の 解決を 固く 否定します。', 'Buryoku ni yoru funsou no kaiketsu o kataku hiteishimasu.', 'Kiên quyết bác bỏ việc dùng vũ lực giải quyết tranh chấp.', 'N2', 'Bước chân dừng cây giáo ngăn chiến', 'Ngăn chặn ngọn giáo gìn giữ nền hòa bình.', '🛡️', v_ch10_id, 36, '/assets/kanji/n2/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('畳', 'ジョウ', 'たたみ, たた・む', 'tatami', 'ĐIỆP', 'Chiếu Tatami, gấp lại', 12, '田 -> 冖 -> 𤴓', '和室に 新しい 畳を 敷きました。', 'Washitsu ni atarashii tatami o shikimashita.', 'Trải những tấm chiếu Tatami mới thơm mùi cói trong phòng kiểu Nhật.', 'N2', 'Mảnh ruộng xếp tầng che đậy', 'Cỏ thơm phơi khô đan xếp thành từng tấm chiếu.', '🟩', v_ch11_id, 1, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('床', 'ショウ', 'ゆか, とこ', 'yuka', 'SÀNG', 'Sàn nhà, giường nằm', 7, '广 -> 木', '木の 温もりを 感じる フローリングの 床。', 'Ki no nukumori o kanjiru furooringu no yuka.', 'Sàn nhà gỗ mang lại cảm giác ấm cúng tự nhiên.', 'N2', 'Cây gỗ lát dưới mái nhà', 'Cây gỗ xẻ ván lót dưới mái nhà làm sàn sạch sẽ.', '🪵', v_ch11_id, 2, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('軒', 'ケン', 'のき', 'noki', 'HIÊN', 'Mái hiên, căn nhà', 10, '車 -> 干', '雨宿りの ために 軒下に 入ります。', 'Amayadori no tame ni nokishita ni hairimasu.', 'Bước vào trú mưa dưới mái hiên nhà.', 'N2', 'Cỗ xe dựng dưới mái hiên', 'Cỗ xe dừng chân đỗ dưới mái hiên che mưa nắng.', '🏠', v_ch11_id, 3, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('玄', 'ゲン', '', 'gen', 'HUYỀN', 'Huyền bí, lối vào sảnh', 5, '亠 -> 幺', '玄関の ドアを 開けて 「ただいま」と 言います。', 'Genkan no doa o akete tadaima to iimasu.', 'Mở cửa tiền sảnh bước vào nhà reo vang "Con đã về rồi ạ".', 'N2', 'Dây tơ đen sâu thẳm huyền bí', 'Dây tơ đen sâu thẳm dẫn lối vào nơi bí ẩn trang trọng.', '🚪', v_ch11_id, 4, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('壁', 'ヘキ', 'かべ', 'kabe', 'BÍCH', 'Bức tường, vách ngăn', 16, '辟 -> 土', '壁に カレンダーを 掛けました。', 'Kabe ni karendaa o kakemashita.', 'Treo cuốn lịch năm mới lên bức tường phòng khách.', 'N2', 'Đất dựng đứng trừng phạt ngăn trở', 'Đắp đất dựng lũy đá thành vách ngăn vững chãi.', '🧱', v_ch11_id, 5, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('廊', 'ロウ', '', 'rou', 'LANG', 'Hành lang', 12, '广 -> 郎', '長い 廊下を 静かに 歩きます。', 'Nagai rouka o shizuka ni arukimasu.', 'Bước đi nhẹ nhàng thong thả dọc theo dãy hành lang dài.', 'N2', 'Chàng trai đứng dưới mái hiên dài', 'Dãy hành lang có mái che nối liền các gian phòng.', '🚶', v_ch11_id, 6, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('寮', 'リョウ', '', 'ryou', 'LIÊU', 'Ký túc xá', 15, '宀 -> 尞', '大学の 学生寮で 共同生活を 送ります。', 'Daigaku no gakuseiryou de kyoudouseikatsu o okurimasu.', 'Sống cuộc sống tập thể chan hòa tại ký túc xá sinh viên.', 'N2', 'Mái nhà thắp sáng ngọn lửa tập thể', 'Dưới mái nhà sưởi ấm ngọn lửa cho học trò lưu trú.', '🏢', v_ch11_id, 7, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('隣', 'リン', 'となり, とな・る', 'tonari', 'LÂN', 'Láng giềng, bên cạnh', 16, '阝 -> 粦', '隣の 部屋から 楽しそうな 声が 聞こえます。', 'Tonari no heya kara tanoshisou na koe ga kikoemasu.', 'Từ phòng bên cạnh nghe văng vẳng tiếng cười nói rộn rã.', 'N2', 'Ngọn đồi kề bên đóm lửa lân tinh', 'Khoảng đất đồi sát cạnh kề bên gối đầu nhau.', '🏘️', v_ch11_id, 8, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('敷', 'フ', 'し・く', 'shi', 'PHU', 'Trải ra, xây dựng', 15, '旉 -> 攵', 'ベッドの 上に 暖かい 毛布を 敷きます。', 'Beddo no ue ni atatakai moufu o shikimasu.', 'Trải chiếc chăn len ấm áp lên trên nệm giường.', 'N2', 'Gõ roi trải tấm vải rộng rãi', 'Cầm cành hoa trải thảm hoa đón khách quý.', '🛏️', v_ch11_id, 9, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('狭', 'キョウ', 'せま・い', 'sema', 'HIỆP', 'Chật hẹp, eo hẹp', 9, '犭 -> 夾', '部屋は 狭いですが、住めば都です。', 'Heya wa semai desu ga, sumebamiyako desu.', 'Căn phòng tuy chật hẹp nhưng ở lâu cũng thấy thân thương.', 'N2', 'Chó bị kẹp giữa khe hẹp', 'Con thú bị kẹp giữa hai vách đá chật chội.', '📐', v_ch11_id, 10, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('荘', 'ソウ', '', 'sou', 'TRANG', 'Biệt thự, trang viên', 9, '艹 -> 壮', '静かな 山荘で 読書三昧の 休日を 過ごします。', 'Shizuka na sansou de dokushozanmai no kyuujitsu o sugoshimasu.', 'Tận hưởng ngày nghỉ đắm mình trong sách vở tại biệt thự vùng núi.', 'N2', 'Cỏ xanh bao quanh tráng sĩ', 'Khu trang viên phủ cỏ non thanh nhã thoáng đãng.', '🏡', v_ch11_id, 11, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('封', 'フウ, ホウ', '', 'fuu', 'PHONG', 'Niêm phong, phong bì', 9, '圭 -> 寸', '封筒に 切手を 貼って ポストに 投函します。', 'Fuutou ni kitte o hatte posuto ni toukanshimasu.', 'Dán tem vào phong bì rồi thả vào hòm thư.', 'N2', 'Đắp đất cắm mốc niêm phong', 'Đất đắp thành gò cắm mốc niêm phong cẩn mật.', '✉️', v_ch11_id, 12, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('筒', 'トウ', 'つつ', 'tsutsu', 'ĐỒNG', 'Ống tròn, ống thư', 12, '竹 -> 同', '賞状を 丸めて 丸筒に 収めます。', 'Shoujou o marumete maruzutsu ni osamemasu.', 'Cuộn tròn bằng khen rồi cất vào trong ống đựng.', 'N2', 'Ống tre tròn đều nhau', 'Đốt tre rỗng ruột làm thành chiếc ống chứa đồ.', '📜', v_ch11_id, 13, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('歳', 'サイ, セイ', '', 'sai', 'TUẾ', 'Tuổi, năm tháng', 13, '止 -> 戌 -> 𣥂', '今年で 二十歳を 迎えました。', 'Kotoshi de hatachi o mukaemashita.', 'Năm nay tôi đã chính thức bước sang tuổi đôi mươi.', 'N2', 'Bước chân trôi qua một vòng sao', 'Hành tinh dịch chuyển trọn vòng ghi dấu một tuổi đời.', '🎂', v_ch11_id, 14, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宛', 'エン', 'あ・てる', 'a', 'UYỂN', 'Gửi tới, địa chỉ người nhận', 8, '宀 -> 夗', '恩師宛てに 感謝の 手紙を 出しました。', 'Onshi ate ni kansha no tegami o dashimashita.', 'Gửi lá thư tri ân chân thành tới người thầy kính yêu.', 'N2', 'Dưới mái nhà nghiêng mình đón nhận', 'Dưới mái ấm gửi trao tâm tình đến đúng địa chỉ.', '📬', v_ch11_id, 15, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('菓', 'カ', '', 'ka', 'QUẢ', 'Bánh kẹo, hoa quả ngọt', 11, '艹 -> 果', 'お茶請けに 和菓子を いただきます。', 'Ochaguke ni wagashi o itadakimasu.', 'Thưởng thức món bánh kẹo truyền thống Wagashi cùng tách trà xanh.', 'N2', 'Cỏ hoa kết trái ngọt ngào', 'Hương hoa quả ngào ngạt làm nên món bánh ngon.', '🍡', v_ch11_id, 16, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('詰', 'キツ', 'つ・める, つ・まる', 'tsu', 'CẬT', 'Nhét đầy, đóng gói', 13, '言 -> 吉', '缶詰の みかんは 甘くて 美味しいです。', 'Kandume no mikan wa amakute oishii desu.', 'Quýt đóng hộp ngọt lịm và rất thơm ngon.', 'N2', 'Lời nói tốt lành đóng chặt', 'Dùng lời lẽ dồn ép đóng gói chặt chẽ vào hộp.', '🥫', v_ch11_id, 17, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('瓶', 'ビン', '', 'bin', 'BÌNH', 'Chai lọ, bình thủy tinh', 11, '并 -> 瓦', 'ガラスの 瓶に 花を 一輪 飾ります。', 'Garasu no bin ni hana o ichirin kazarimasu.', 'Cắm một bông hoa tươi vào trong chiếc bình thủy tinh trong suốt.', 'N2', 'Gốm nung hai bên cân đối', 'Chiếc bình gốm nung xinh xắn chứa nước mát.', '🍾', v_ch11_id, 18, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('粒', 'リュウ', 'つぶ', 'tsubu', 'LẠP', 'Hạt nhỏ, viên thuốc', 11, '米 -> 立', '雨粒が 窓ガラスに 当たって 音を 立てます。', 'Amatsubu ga madogarasu ni atatte oto o tatemasu.', 'Từng hạt mưa rơi gõ lách tách trên ô cửa kính.', 'N2', 'Hạt gạo đứng thẳng tròn xinh', 'Từng hạt gạo nhỏ đứng ngay ngắn tinh khôi.', '💊', v_ch11_id, 19, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('酢', 'サク', 'す', 'su', 'TỐ', 'Giấm ăn', 12, '酉 -> 乍', '健康の ために 黒酢を 毎日 少量 飲みます。', 'Kenkou no tame ni kurozu o mainichi shouryou nomimasu.', 'Mỗi ngày uống một lượng nhỏ giấm đen để bồi bổ sức khỏe.', 'N2', 'Bình rượu lên men thành giấm', 'Rượu để lâu ngày biến hóa thành vị giấm chua thanh.', '🍶', v_ch11_id, 20, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('糖', 'トウ', '', 'tou', 'ĐƯỜNG', 'Đường ngọt, lượng đường', 16, '米 -> 唐', '砂糖の 摂りすぎに 注意しましょう。', 'Satou no torisugi ni chuuishimashou.', 'Hãy cẩn thận tránh dung nạp quá nhiều lượng đường.', 'N2', 'Gạo ngon nhà Đường sinh vị ngọt', 'Gạo chưng cất thành hạt đường ngọt tinh khiết.', '🍬', v_ch11_id, 21, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('辛', 'シン', 'から・い, つら・い', 'kara', 'TÂN', 'Cay nồng, gian truân', 7, '立 -> 十', '辛い カレーを 食べて 汗を かきました。', 'Karai karee o tabete ase o kakimashita.', 'Ăn đĩa cà ri cay nồng toát cả mồ hôi.', 'N2', 'Mũi kim châm mười nhát cay xót', 'Cây kim châm lên da cảm nhận vị cay xót.', '🌶️', v_ch11_id, 22, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('渋', 'ジュウ', 'しぶ・い, しぶ', 'shibu', 'SÁP', 'Chát đắng, kẹt xe, hoài cổ', 11, '氵 -> 止 -> 止', '渋滞に 巻き込まれて 約束の 時間に 遅れました。', 'Juutai ni makikomarete yakusoku no jikan ni okremashita.', 'Bị kẹt xe nên tôi đã trễ giờ hẹn.', 'N2', 'Nước dừng lại từng chặng', 'Dòng nước bị ứ đọng tạo nên vị chát nghẽn.', '🚗', v_ch11_id, 23, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('滞', 'タイ', 'とどこお・る', 'todokou', 'TRỆ', 'Ùn tắc, trễ nải, lưu trú', 12, '氵 -> 帯', '高速道路で 事故による 渋滞が 発生しました。', 'Kousokudouro de jiko ni yoru juutai ga hasseishimashita.', 'Trên đường cao tốc xảy ra vụ ùn tắc kéo dài do tai nạn.', 'N2', 'Dòng nước vướng dải thắt lưng', 'Dòng nước chảy chậm chạm dải băng kẹt cứng.', '🛑', v_ch11_id, 24, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('街', 'ガイ, カイ', 'まち', 'machi', 'NHAI', 'Đường phố, khu phố', 12, '行 -> 圭', '賑やかな 商店街を そぞろ歩きします。', 'Nigiyaka na shoutengai o sozoroarukishimasu.', 'Thong thả tản bộ dọc theo khu phố thương mại sầm uất.', 'N2', 'Đất đắp hai bên đường cái', 'Hai bên lối đi xây nhà cửa san sát thành phố xá.', '🏙️', v_ch11_id, 25, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('往', 'オウ', '', 'ou', 'VÃNG', 'Khứ hồi, qua lại, xưa kia', 8, '彳 -> 主', '東京と 大阪の 往復航空券を 予約しました。', 'Toukyou to Oosaka no oufukukoukuuken o yoyakushimashita.', 'Đặt vé máy bay khứ hồi giữa Tokyo và Osaka.', 'N2', 'Bước chân theo người chủ', 'Từng bước chân đi lại qua về theo lối quen.', '↔️', v_ch11_id, 26, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('距', 'キョ', '', 'kyo', 'CỰ', 'Khoảng cách, cự ly', 12, '足 -> 巨', '二地点間の 距離を 正確に 測定します。', 'Nichitenkan no kyori o seikaku ni sokuteishimasu.', 'Đo đạc chuẩn xác khoảng cách cự ly giữa hai địa điểm.', 'N2', 'Bàn chân sải bước khổng lồ', 'Bàn chân bước đo đạc khoảng cách giữa hai điểm.', '📏', v_ch11_id, 27, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('灯', 'トウ', 'ひ', 'hi', 'ĐĂNG', 'Ngọn đèn, hải đăng', 6, '火 -> 丁', '夜道で 街灯の 明かりが 優しく 足元を 照らします。', 'Yomichi de gaitou no akari ga yasashiku ashimoto o terashimasu.', 'Ánh sáng ngọn đèn đường nhẹ nhàng soi tỏ từng bước chân đêm.', 'N2', 'Ngọn lửa cắm trên cọc đinh', 'Đốm lửa thắp sáng trên cột đèn dẫn lối lữ khách.', '💡', v_ch11_id, 28, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('専', 'セン', 'もっぱ・ら', 'moppa', 'CHUYÊN', 'Chuyên tâm, riêng biệt', 9, '十 -> 冂 -> 一 -> 寸', 'この レーンは バス専用です。', 'Kono reen wa basusen-you desu.', 'Làn đường này dành riêng duy nhất cho xe buýt.', 'N2', 'Dồn trọn tấc dạ chuyên biệt', 'Chuyên nhất một lối không phân tán.', '🚌', v_ch11_id, 29, '/assets/kanji/n2/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('携', 'ケイ', 'たずさ・える, たずさ・わる', 'tazusa', 'HUỀ', 'Cầm theo, tham gia, di động', 13, '扌 -> 隹 -> 乃', '常に 携帯電話を 身につけて 持ち歩きます。', 'Tsune ni keitaidenwa o minitsukete mochiarukimasu.', 'Luôn đem theo chiếc điện thoại di động bên mình.', 'N2', 'Bàn tay dắt chim sẻ đi cùng', 'Bàn tay nắm chặt dẫn dắt cùng tham gia cộng tác.', '📱', v_ch12_id, 1, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('即', 'ソク', '', 'soku', 'TỨC', 'Ngay lập tức, tức thì', 7, '艮 -> 卩', '緊急事態に 即座に 判断を 下します。', 'Kinkyuujitai ni sokuza ni handan o kudashimasu.', 'Đưa ra phán đoán tức thì ngay trong tình huống khẩn cấp.', 'N2', 'Tiến sát mâm cơm ngồi ăn ngay', 'Tiến lại gần đĩa thức ăn ngồi xuống dùng ngay lập tức.', '⚡', v_ch12_id, 2, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('稼', 'カ', 'かせ・ぐ', 'kase', 'GIÁ', 'Kiếm tiền, trồng lúa', 15, '禾 -> 家', 'アルバイトで 学費を 稼ぎます。', 'Arubaito de gakuhi o kasegimasu.', 'Làm thêm để tự mình kiếm tiền trang trải học phí.', 'N2', 'Lúa chín mang về nhà ấm no', 'Gặt hái bông lúa mang về tích lũy tiền tài cho gia đình.', '💵', v_ch12_id, 3, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('需', 'ジュ', '', 'ju', 'NHU', 'Nhu cầu, cần thiết', 14, '雨 -> 而', '市場の 需要に 合わせた 商品を 開発します。', 'Shijou no juyou ni awaseta shouhin o kaihatsushimasu.', 'Nghiên cứu phát triển sản phẩm thích ứng nhu cầu thị trường.', 'N2', 'Mưa tưới râu ria giải cơn khát', 'Cơn mưa rơi tưới tắm thỏa mãn cơn khát chờ đợi.', '🛒', v_ch12_id, 4, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('拒', 'キョ', 'こば・む', 'koba', 'CỰ', 'Từ chối, cự tuyệt', 8, '扌 -> 巨', '不正な 要求を 断固として 拒絶します。', 'Fusei na youkyou o danko to shite kyozetsushimasu.', 'Kiên quyết cự tuyệt bác bỏ những yêu sách phi lý bất chính.', 'N2', 'Bàn tay giơ chiếc thước lớn chặn lại', 'Bàn tay đẩy lùi vật cản từ chối tiếp cận.', '✋', v_ch12_id, 5, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('厳', 'ゲン, ゴン', 'きび・しい, おごそ・か', 'kibi', 'NGHIÊM', 'Nghiêm khắc, trang nghiêm', 17, '口 -> 口 -> 𠪚', '規則を 厳格に 遵守します。', 'Kisoku o genkaku ni junshushimasu.', 'Tuân thủ nghiêm ngặt và chuẩn mực các điều khoản quy định.', 'N2', 'Hai tiếng quát nơi vách đá', 'Lời răn nghiêm trang vang dội chấn chỉnh kỷ cương.', '⚖️', v_ch12_id, 6, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('刷', 'サツ', 'す・る', 'su', 'LOÁT', 'In ấn, quét mực', 8, '尸 -> 巾 -> 刂', 'カラープリンターで 資料を 印刷します。', 'Karaapurintaa de shiryou o insatsushimasu.', 'In ấn tài liệu bằng máy in màu sắc nét.', 'N2', 'Dùng dao cạo mực in trên vải', 'Lưỡi dao gạt mực in đều trên khung bản gỗ.', '🖨️', v_ch12_id, 7, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('枠', '', 'わく', 'waku', 'NGOẠNG', 'Khung viền, giới hạn', 8, '木 -> 卆', 'エントリーの 枠が 残り わずかに なりました。', 'Entorii no waku ga nokori wazuka ni narimashita.', 'Khung giới hạn số lượng đăng ký chỉ còn lại rất ít.', 'N2', 'Thanh gỗ ghép thành chiếc khung', 'Bốn thanh gỗ ghép lại định hình khung khổ.', '🖼️', v_ch12_id, 8, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('縦', 'ジュウ', 'たて', 'tate', 'TÚNG', 'Chiều dọc, tung hoành', 16, '糸 -> 從', '縦書きの 文章を すらすら 読みます。', 'Tategaki no bunshou o surasura yomimasu.', 'Đọc trôi chảy những đoạn văn bản được trình bày theo hàng dọc.', 'N2', 'Sợi chỉ buông thẳng từ trên xuống', 'Sợi tơ kéo dài theo phương thẳng đứng.', '↕️', v_ch12_id, 9, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('斜', 'シャ', 'なな・め', 'nana', 'TÀ', 'Nghiêng, xiên', 11, '余 -> 斗', '坂道を 斜めに 横切って 歩きます。', 'Sakamichi o naname ni yokogitte arukimasu.', 'Bước đi chéo nghiêng cắt ngang con đường dốc.', 'N2', 'Chiếc đấu đong rượu nghiêng', 'Chiếc gáo đong nghiêng rót nước ra ngoài.', '📐', v_ch12_id, 10, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('端', 'タン', 'はし, は', 'hashi', 'ĐOAN', 'Đầu mút, mép, ngay thẳng', 14, '立 -> 耑', '机の 端に パソコンを 置きます。', 'Tsukue no hashi ni pasokon o okimasu.', 'Đặt chiếc máy tính gọn ghẽ ở mép bàn.', 'N2', 'Đứng thẳng ngay ngắn nơi đầu mút', 'Mầm cây đứng thẳng vươn lên từ mép bờ ruộng.', '📏', v_ch12_id, 11, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('隅', 'グウ', 'すみ', 'sumi', 'NGUNG', 'Góc phòng, xó', 12, '阝 -> 禺', '部屋の 隅に 小さな 観葉植物を 飾ります。', 'Heya no sumi ni chiisana kan-youshokubutsu o kazarimasu.', 'Đặt chậu cây cảnh nhỏ xinh ở góc căn phòng.', 'N2', 'Sườn đồi uốn quanh góc khuất', 'Góc khuất nơi tường rào tạo chốn tĩnh lặng.', '📐', v_ch12_id, 12, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('堅', 'ケン', 'かた・い', 'kata', 'KIÊN', 'Kiên định, rắn chắc', 12, '臤 -> 土', '堅固な 意志を もって 勉強に 励みます。', 'Kengo na ishi o motte benkyou ni hagemimasu.', 'Chăm chỉ dùi mài kinh sử với ý chí kiên định sắt đá.', 'N2', 'Nắm đất nặn cứng rắn', 'Khối đất sét nung luyện thành khối đá vững bền.', '🗿', v_ch12_id, 13, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('硬', 'コウ', 'かた・い', 'kata', 'NGẠNH', 'Cứng ngắc, đông cứng', 12, '石 -> 更', '硬い パンを スープに ひたして 食べます。', 'Katai pan o suupu ni hitashite tabemasu.', 'Nhúng miếng bánh mì giòn cứng vào bát súp nóng để ăn.', 'N2', 'Tảng đá càng ngày càng rắn', 'Hòn đá rèn luyện theo năm tháng hóa ngọc rắn chắc.', '🪨', v_ch12_id, 14, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鋭', 'エイ', 'するど・い', 'suru', 'NHUỆ', 'Sắc bén, nhạy bén', 15, '金 -> 兌', '鋭い 観察眼で 本質を 見抜きます。', 'Surudoi kansatsugan de honshitsu o minukimasu.', 'Nhìn thấu bản chất vấn đề bằng con mắt quan sát sắc sảo.', 'N2', 'Kim loại mũi nhọn sắc bén', 'Lưỡi kiếm kim loại tôi luyện bén ngọt sáng loáng.', '🗡️', v_ch12_id, 15, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鈍', 'ドン', 'にぶ・い', 'nibu', 'ĐỘN', 'Cùn mòn, chậm chạp', 12, '金 -> 純', '刃が 鈍くなって 切れません。', 'Ha ga nibukunatte kiremasen.', 'Lưỡi dao bị cùn mòn không còn cắt ngọt được nữa.', 'N2', 'Khối kim loại chưa qua mài giũa', 'Miếng sắt thô kệch cùn mòn chưa rèn sắc.', '🐢', v_ch12_id, 16, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('詳', 'ショウ', 'くわ・しい', 'kuwa', 'TƯỜNG', 'Chi tiết, tường tận', 13, '言 -> 羊', '詳しい 使い方を マニュアルで 確認します。', 'Kuwashii tsukaikata o manyuaru de kakuninshimasu.', 'Kiểm tra kỹ lưỡng cách sử dụng chi tiết trong sách hướng dẫn.', 'N2', 'Lời nói tỉ mỉ như đếm cừu', 'Ngôn từ mạch lạc giảng giải tường tận từng chi tiết.', '📖', v_ch12_id, 17, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('簡', 'カン', '', 'kan', 'GIẢN', 'Đơn giản, ngắn gọn', 18, '竹 -> 間', '複雑な 仕組みを 簡単な 言葉で 説明します。', 'Fukuzatsu na shikumi o kantan na kotoba de setsumeishimasu.', 'Diễn giải cơ chế phức tạp bằng từ ngữ giản dị dễ hiểu.', 'N2', 'Thẻ tre ghi ngắn gọn súc tích', 'Thẻ tre chắt lọc ghi những điều cốt lõi đơn sơ.', '👌', v_ch12_id, 18, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('深', 'シン', 'ふか・い, ふか・まる', 'fuka', 'THÂM', 'Sâu sắc, thâm sâu', 11, '氵 -> 冖 -> 木', '深い 呼吸を して リラックスします。', 'Fukai kokyuu o shite rirakkusushimasu.', 'Hít thở một hơi thật sâu để tâm trí được thư giãn hoàn toàn.', 'N2', 'Dòng nước sâu lọt thỏm trong rừng', 'Dòng nước chảy sâu thẳm dưới rặng cây rậm rạp.', '🌊', v_ch12_id, 19, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('頑', 'ガン', '', 'gan', 'NGOAN', 'Ngoan cố, kiên cường', 13, '元 -> 頁', '最後まで 諦めずに 頑張ります。', 'Saigo made akiramezu ni ganbarimasu.', 'Cố gắng kiên trì tới cùng quyết không từ bỏ.', 'N2', 'Cái đầu cứng đầu kiên định', 'Cái đầu ngẩng cao kiên cường trước muôn sóng gió.', '✊', v_ch12_id, 20, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勇', 'ユウ', 'いさ・む', 'isa', 'DŨNG', 'Dũng cảm, dũng khí', 9, 'マ -> 男', '勇気を 出して 新しい 環境に 飛び込みます。', 'Yuuki o dashite atarashii kankyou ni tobikomimasu.', 'Lấy hết dũng khí dấn thân trải nghiệm môi trường mới.', 'N2', 'Người dũng cảm ra sức xung trận', 'Nam nhi dốc trọn sinh lực xông pha dũng mãnh.', '🦁', v_ch12_id, 21, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('賢', 'ケン', 'かしこ・い', 'kashi', 'HIỀN', 'Hiền minh, thông thái', 16, '臤 -> 貝', '賢い 選択を して 未来を 切り開きます。', 'Kashikoi sentaku o shite mirai o kirihirakimasu.', 'Đưa ra sự lựa chọn thông thái sáng suốt để mở lối tương lai.', 'N2', 'Nắm giữ tiền bạc thông thái', 'Người đức hạnh sáng suốt quản lý gia tài chu toàn.', '🦉', v_ch12_id, 22, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('偉', 'イ', 'えら・い', 'era', 'VĨ', 'Vĩ đại, xuất chúng', 12, '亻 -> 韋', '歴史に 名を 残した 偉大な 人物。', 'Rekishi ni na o nokoshita idai na jinbutsu.', 'Bậc nhân vật vĩ đại lưu danh ngàn đời trong sử sách.', 'N2', 'Con người xuất chúng phi phàm', 'Con người vượt qua giới hạn đạt tới tầm vĩ đại.', '👑', v_ch12_id, 23, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('珍', 'チン', 'めずら・しい', 'mezu', 'TRÂN', 'Trân quý, hiếm lạ', 9, '王 -> 人 -> 彡', '珍しい 動植物を 写真に 収めます。', 'Mezurashii doushokubutsu o shashin ni osamemasu.', 'Chụp lại những bức ảnh về các loài động thực vật quý hiếm.', 'N2', 'Viên ngọc quý hiếm lạ thường', 'Viên ngọc bích tỏa hào quang hiếm có khó tìm.', '💎', v_ch12_id, 24, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('肌', '', 'はだ', 'hada', 'CƠ', 'Làn da, da dẻ', 6, '月 -> 几', '乾燥する 季節は 肌の 保湿を 心がけます。', 'Kanshoushuru kisetsu wa hada no hoshitsu o kokorogakemasu.', 'Mùa khô hanh cần chú trọng cấp ẩm chăm sóc làn da.', 'N2', 'Thịt mềm mại tựa ghế êm', 'Lớp da mềm mại bao bọc thân thể con người.', '🧴', v_ch12_id, 25, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('粧', 'ショウ', '', 'shou', 'TRANG', 'Trang điểm, son phấn', 12, '米 -> 庄', '化粧水を つけて 肌を 整えます。', 'Keshousui o tsukete hada o totonoemasu.', 'Thoa nước hoa hồng dưỡng da cho mềm mại tươi trẻ.', 'N2', 'Bột gạo trang điểm mặt hoa', 'Bột gạo trắng mịn điểm tô vẻ đẹp khuôn mặt.', '💄', v_ch12_id, 26, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('髪', 'ハツ', 'かみ', 'kami', 'PHÁT', 'Mái tóc', 14, '髟 -> 犮', '美容院で 髪を カットしてもらいました。', 'Biyouin de kami o katto shitemoraimashita.', 'Đến tiệm làm tóc cắt tỉa lại mái tóc gọn gàng.', 'N2', 'Mớ tóc dài xõa bờ vai', 'Lọn tóc óng ả bay bay trong gió nhẹ.', '💇', v_ch12_id, 27, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('脚', 'キャク', 'あし', 'ashi', 'CƯỚC', 'Đôi chân, chân bàn ghế', 11, '月 -> 却', '長い 脚を 組んで 椅子に 腰掛けます。', 'Nagai ashi o kunde isu ni koshikakemasu.', 'Bắt chéo đôi chân thon dài ngồi tựa vào chiếc ghế.', 'N2', 'Bắp thịt gập lại bước lui', 'Đôi chân săn chắc sải bước dẻo dai linh hoạt.', '🦵', v_ch12_id, 28, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('華', 'カ, ケ', 'はな', 'hana', 'HOA', 'Hoa lệ, phồn hoa, rực rỡ', 10, '艹 -> 𠁡', '華やかな ドレスを 身に まといます。', 'Hanayaka na doresu o mi ni matoimasu.', 'Khoác lên mình chiếc váy dạ hội lộng lẫy kiêu sa.', 'N2', 'Bông hoa nở rộ muôn sắc', 'Cành hoa khoe sắc rực rỡ phồn thịnh nguy nga.', '🌺', v_ch12_id, 29, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鏡', 'キョウ', 'かがみ', 'kagami', 'KÍNH', 'Gương soi', 19, '金 -> 竟', '鏡を 見て 身だしなみを 整えます。', 'Kagami o mite midashinami o totonoemasu.', 'Soi gương chỉnh trang lại diện mạo trang phục chỉnh tề.', 'N2', 'Kim loại sáng bóng soi tỏ hình hài', 'Tấm kim loại sáng bóng phản chiếu rõ bóng người.', '🪞', v_ch12_id, 30, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('帽', 'ボウ', '', 'bou', 'MẠO', 'Mũ nón', 12, '巾 -> 冒', '強い 日差しを 避けるために 帽子を かぶります。', 'Tsuyoi hizashi o yokeru tame ni boushi o kaburimasu.', 'Đội chiếc mũ vành để tránh ánh nắng gắt mùa hè.', 'N2', 'Tấm vải che mắt tránh nắng', 'Tấm vải chụp đầu bảo vệ khỏi nắng mưa.', '🧢', v_ch12_id, 31, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('傘', 'サン', 'かさ', 'kasa', 'TẢN', 'Cây dù, chiếc ô', 12, '人 -> 𠈌 -> 十', '雨が 降りそうなので 折りたたみ傘を 持って 出かけます。', 'Ame ga furisou nanode oritatamikasa o motte dekakemasu.', 'Trời trông như sắp mưa nên tôi đem theo chiếc ô gấp.', 'N2', 'Bốn người đứng nép dưới mái che', 'Khung vải mở ra che mưa cho nhiều người.', '☂️', v_ch12_id, 32, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('革', 'カク', 'かわ', 'kawa', 'CÁCH', 'Da thuộc, cách mạng', 9, '廿 -> 口 -> 十', '本革の 財布を 長年 愛用しています。', 'Hongawa no saifu o naganen aiyoushiteimasu.', 'Tôi yêu thích dùng chiếc ví làm bằng da bò thật suốt nhiều năm.', 'N2', 'Da thú căng phơi biến đổi', 'Tấm da thú qua xử lý biến hóa thành đồ bền chắc.', '👞', v_ch12_id, 33, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('靴', 'カ', 'くつ', 'kutsu', 'NGOA', 'Đôi giày', 13, '革 -> 化', '新しい スニーカーを 履いて ランニングに 行きます。', 'Atarashii suniikaa o haite ranningu ni ikimasu.', 'Xỏ đôi giày thể thao mới chạy bộ buổi sáng.', 'N2', 'Miếng da biến hóa thành giày', 'Tấm da khâu lại ôm vừa vặn đôi bàn chân.', '👟', v_ch12_id, 34, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('柄', 'ヘイ', 'がら, え', 'gara', 'BÍNH', 'Hoa văn, cán cầm, tính cách', 9, '木 -> 丙', 'チェック柄の シャツを おしゃれに 着こなします。', 'Chekkugara no shatsu o oshare ni kikonashimasu.', 'Mặc chiếc áo sơ mi kẻ ca rô thời trang và lịch lãm.', 'N2', 'Cây gỗ làm cán cầm chuôi dao', 'Thanh gỗ đẽo thành cán cầm hoa văn tinh tế.', '👔', v_ch12_id, 35, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('装', 'ソウ, ショウ', 'よそお・う', 'yosoo', 'TRANG', 'Trang phục, trang trí', 12, '壮 -> 衣', 'フォーマルな 服装で 式典に 参列します。', 'Foomaru na fukusou de shikiten ni sanretsushimasu.', 'Tham dự buổi lễ với bộ trang phục trang trọng lịch sự.', 'N2', 'Tráng sĩ mặc áo giáp đẹp', 'Khoác lên mình bộ trang phục rực rỡ khí phách.', '👗', v_ch12_id, 36, '/assets/kanji/n2/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('睡', 'スイ', '', 'sui', 'THỤY', 'Buồn ngủ, giấc ngủ', 13, '目 -> 垂', '十分な 睡眠時間を 確保することが 健康の 秘訣です。', 'Juubun na suiminjikan o kakuho shuru koto ga kenkou no hiketsu desu.', 'Đảm bảo ngủ đủ giấc là bí quyết giữ gìn sức khỏe dồi dào.', 'N2', 'Mí mắt rủ xuống trĩu nặng', 'Mắt khép lại say sưa trong giấc nồng say.', '😴', v_ch13_id, 1, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('眠', 'ミン', 'ねむ・る, ねむ・い', 'nemu', 'MIÊN', 'Ngủ say, nhắm mắt', 10, '目 -> 民', '心地よい 音楽を 聴きながら 眠りに つきます。', 'Kokochiyoi ongaku o kikinagara nemuri ni tsukimasu.', 'Lắng nghe điệu nhạc êm dịu chìm sâu vào giấc ngủ.', 'N2', 'Mắt người dân khép lại an giấc', 'Nhắm mắt buông bỏ muộn phiền an giấc lành.', '🛌', v_ch13_id, 2, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('喫', 'キツ', '', 'kitsu', 'KHIẾT', 'Ăn uống, hút thuốc', 12, '口 -> 契', '館内は 全面 禁煙で 喫煙席は ありません。', 'Kannai wa zenmen kin-en de kitsuenseki wa arimasen.', 'Toàn bộ tòa nhà cấm hút thuốc không có khu vực hút thuốc.', 'N2', 'Miệng ngậm giao kèo hít khói', 'Mở miệng hít vào thưởng thức trà hoặc khói thuốc.', '🚭', v_ch13_id, 3, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('煙', 'エン', 'けむ・る, けむり, けむ・い', 'kemu', 'YÊN', 'Khói, bốc khói', 13, '火 -> 垔', '煙突から 白い 煙が もくもくと 立ち上っています。', 'Entotsu kara shiroi kemuri ga mokumoku to tachinobotteimasu.', 'Từ ống khói những làn khói trắng cuồn cuộn bay lên trời.', 'N2', 'Lửa đốt đất bốc khói nghi ngút', 'Ngọn lửa âm ỉ tỏa khói xông lên mây trời.', '💨', v_ch13_id, 4, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('脂', 'シ', 'あぶら', 'abura', 'CHI', 'Chất béo, mỡ động vật', 10, '月 -> 旨', '脂っこい 料理を 控えて 野菜を 多く 食べます。', 'Aburakkoi ryouri o hikaete yasai o ooku tabemasu.', 'Hạn chế món ăn nhiều dầu mỡ bổ sung nhiều rau xanh tươi.', 'N2', 'Thịt có hương vị thơm ngậy', 'Miếng thịt có vị béo ngậy bổ dưỡng cơ thể.', '🧈', v_ch13_id, 5, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('肪', 'ボウ', '', 'bou', 'PHƯƠNG', 'Mỡ, mỡ thừa', 8, '月 -> 方', '適度な 運動で 体脂肪を 燃焼させます。', 'Tekido na undou de taishibou o nenshousasemasu.', 'Đốt cháy mỡ thừa cơ thể bằng các bài tập thể dục vừa sức.', 'N2', 'Thịt tỏa ra bốn phương', 'Mỡ tích tụ béo tròn bốn phía thân thể.', '🏃‍♀️', v_ch13_id, 6, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('妊', 'ニン', '', 'nin', 'NHÂM', 'Mang thai, thai nghén', 7, '女 -> 壬', '妊娠中の 妻を 家族みんなで 温かく 支えます。', 'Ninshinshuu no tsuma o kazokuminna de atatakaku sasaemasu.', 'Cả gia đình cùng yêu thương chăm sóc người vợ đang mang thai.', 'N2', 'Người phụ nữ gánh vác thiên chức', 'Người mẹ mang trong mình mầm sống thiêng liêng.', '🤰', v_ch13_id, 7, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('娠', 'シン', '', 'shin', 'THẦN', 'Có thai, thai nghén', 10, '女 -> 辰', '病院の 産婦人科で 妊娠が 確認されました。', 'Byouin no sanfujinka de ninshin ga kakuninsaremashita.', 'Khoa sản bệnh viện đã xác nhận thai kỳ phát triển khỏe mạnh.', 'N2', 'Phụ nữ đón ngày con rồng chào đời', 'Người mẹ sẵn sàng đón ngày sinh nở rạng rỡ.', '👶', v_ch13_id, 8, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('双', 'ソウ', 'ふた', 'futa', 'SONG', 'Đôi, hai, song sinh', 4, '又 -> 又', '街で そっくりな 双子の 兄弟を 見かけました。', 'Machi de sokkuri na futago no kyoudai o mikakemashita.', 'Bắt gặp hai anh em sinh đôi giống hệt nhau trên phố.', 'N2', 'Hai bàn tay kề bên nhau', 'Hai bàn tay song hành gắn bó khăng khít.', '👬', v_ch13_id, 9, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('誕', 'タン', '', 'tan', 'ĐẢN', 'Sinh ra, chào đời', 15, '言 -> 延', '親友の 誕生日に 心を 込めた プレゼントを 贈ります。', 'Shin-yuu no tanjoubi ni kokoro o kometa purezento o okurimasu.', 'Tặng món quà sinh nhật chan chứa tình cảm cho bạn thân.', 'N2', 'Lời chúc mừng sinh linh chào đời', 'Lời hoan ca kéo dài chúc tụng ngày em bé chào đời.', '🎂', v_ch13_id, 10, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('脈', 'ミャク', '', 'myaku', 'MẠCH', 'Mạch máu, nhịp mạch', 10, '月 -> 永', '手首に 指を 当てて 脈拍を 測ります。', 'Tekubi ni yubi o atete myakuhaku o hakarimasu.', 'Đặt ngón tay lên cổ tay để đếm nhịp mạch đập.', 'N2', 'Thịt có dòng nước vĩnh cửu chảy', 'Dòng máu vĩnh hằng chảy tuần hoàn nuôi sống cơ thể.', '❤️', v_ch13_id, 11, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('拍', 'ハク, ヒョウ', '', 'haku', 'PHÁCH', 'Vỗ tay, nhịp phách', 8, '扌 -> 白', '素晴らしい 演奏に 会場から 盛大な 拍手が 送られました。', 'Subarashii ensou ni kaijou kara seidai na hakushu ga okuraremashita.', 'Tràng pháo tay giòn giã vang lên tán thưởng màn biểu diễn.', 'N2', 'Bàn tay vỗ nhịp trong sáng', 'Bàn tay vỗ theo nhịp điệu tiếng đàn ngân.', '👏', v_ch13_id, 12, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('看', 'カン', '', 'kan', 'KHÁN', 'Chăm sóc, trông coi', 9, '手 -> 目', '病気で 寝込んでいる 祖母を 看病します。', 'Byouki de nekondeiru sobo o kanbyoushimasu.', 'Tận tình chăm sóc người bà đang ốm nằm trên giường bệnh.', 'N2', 'Bàn tay che mắt chăm chú trông nom', 'Bàn tay đặt lên trán trông chừng che chở người ốm.', '👩‍⚕️', v_ch13_id, 13, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('患', 'カン', 'わずら・う', 'wazura', 'HOẠN', 'Bệnh nhân, âu lo', 11, '串 -> 心', '医師が 患者の 話に 優しく 耳を 傾けます。', 'Ishi ga kanja no hanashi ni yasashiku mimi o katamukemasu.', 'Bác sĩ ân cần lắng nghe lời tâm sự của bệnh nhân.', 'N2', 'Trái tim bị xuyên thủng nỗi đau', 'Nỗi đau xuyên qua tâm can cần được chữa lành.', '🩺', v_ch13_id, 14, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('視', 'シ', '', 'shi', 'THỊ', 'Tầm nhìn, thị giác', 11, '示 -> 見', 'スマートフォンを 見すぎて 視力が 低下しました。', 'Sumaatofon o misugite shiryoku ga teikashimashita.', 'Dùng điện thoại quá nhiều khiến thị lực bị suy giảm.', 'N2', 'Mắt nhìn thấy dấu hiệu chỉ dẫn', 'Mở to mắt nhìn rõ mọi điềm báo sự việc.', '👀', v_ch13_id, 15, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('眼', 'ガン, ゲン', 'まなこ, め', 'me', 'NHÃN', 'Mắt, nhãn khoa', 11, '目 -> 艮', '眼科で 目の 定期検診を 受けます。', 'Ganka de me no teikikenshin o ukemasu.', 'Khám mắt định kỳ tại phòng khám chuyên khoa mắt.', 'N2', 'Đôi mắt dừng lại quan sát sâu', 'Con ngươi dừng lại chăm chú ngắm nhìn thấu suốt.', '👁️', v_ch13_id, 16, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('舌', 'ゼツ', 'した', 'shita', 'THIỆT', 'Chiếc lưỡi, nếm vị', 6, '千 -> 口', '熱い スープを 飲んで 舌を やけどしてしまいました。', 'Atsui suupu o nonde shita o yakedoshiteshimaimashita.', 'Uống bát canh quá nóng khiến chiếc lưỡi bị bỏng rát.', 'N2', 'Nghìn lời thốt ra từ miệng', 'Chiếc lưỡi phát ra ngàn lời nói và nếm vạn phong vị.', '👅', v_ch13_id, 17, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('刺', 'シ', 'さ・す, さ・さる', 'sa', 'THÍCH', 'Đâm thủng, gai nhọn, kích thích', 8, '朿 -> 刂', 'バラの 棘が 指に 刺さって しまいました。', 'Bara no toge ga yubi ni sasatte shimaimashita.', 'Gai hoa hồng đâm trúng vào đầu ngón tay.', 'N2', 'Dao đâm vào cành gai', 'Lưỡi dao nhọn đâm thủng cành gai nhọn.', '🌵', v_ch13_id, 18, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('菌', 'キン', '', 'kin', 'KHUẨN', 'Vi khuẩn, nấm mốc', 11, '艹 -> 囷', '手洗いは 細菌の 感染を 防ぐ 基本です。', 'Tearai wa saikin no kansen o fusegu kihon desu.', 'Rửa tay sạch sẽ là bước cơ bản ngăn ngừa nhiễm khuẩn.', 'N2', 'Cỏ mọc trong bồ thóc sinh mầm', 'Vi sinh vật sinh sôi trong kho lúa ẩm ướt.', '🦠', v_ch13_id, 19, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('剤', 'ザイ', '', 'zai', 'TỄ', 'Dược phẩm, thuốc men', 10, '斉 -> 刂', '傷口を 消毒剤で 綺麗に 消毒します。', 'Kizuguchi o shoudokuzai de kirei ni shoudokushimasu.', 'Khử trùng vết thương sạch sẽ bằng dung dịch sát khuẩn.', 'N2', 'Cắt thuốc đều tăm tắp', 'Dùng dao thái đều các vị thảo dược làm tễ thuốc.', '💊', v_ch13_id, 20, '/assets/kanji/n2/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('咲', '', 'さ・く', 'sa', 'TIẾU', 'Hoa nở rộ', 9, '口 -> 关', '庭の チューリップが 綺麗に 咲きました。', 'Niwa no chuurippu ga kirei ni sakimashita.', 'Hoa tulip ngoài sân vườn đã nở rộ rực rỡ tươi đẹp.', 'N2', 'Miệng hé nụ cười như hoa nở', 'Bông hoa hé nở như nụ cười rạng rỡ của người thiếu nữ.', '🌷', v_ch14_id, 1, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('枯', 'コ', 'か・れる, か・らす', 'ka', 'KHÔ', 'Khô héo, tàn lụi', 9, '木 -> 古', '水やりを 忘れて 鉢植えの 花が 枯れてしまいました。', 'Mizuyari o wasurete hachiue no hana ga kareteshimaimashita.', 'Quên tưới nước làm chậu hoa cảnh bị khô héo.', 'N2', 'Cây gỗ già nua khô kiệt', 'Cây cổ thụ mùa đông lá rụng khô cằn.', '🍂', v_ch14_id, 2, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('散', 'サン', 'ち・る, ち・らかす', 'chi', 'TÁN', 'Tản mác, rơi rụng', 12, '𦫳 -> 攵', '風に 吹かれて 桜の 花びらが 舞い散ります。', 'Kaze ni fukarete sakura no hanabira ga maichirimasu.', 'Những cánh hoa anh đào theo làn gió cuốn bay tản mác.', 'N2', 'Gõ roi làm cỏ bay rải rác', 'Gió cuốn hoa lá rụng tản mác muôn phương.', '🍃', v_ch14_id, 3, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('飾', 'ショク', 'かざ・る', 'kaza', 'SỨC', 'Trang trí, chưng diện', 13, '食 -> 巾', '部屋を 綺麗な 風船で 飾り付けます。', 'Heya o kirei na fuusen de kazaritsukemasu.', 'Trang trí căn phòng bằng những chùm bóng bay lộng lẫy.', 'N2', 'Khăn ăn trang hoàng mâm tiệc', 'Tấm vải lụa thêu dệt trang hoàng bàn tiệc sang trọng.', '🎀', v_ch14_id, 4, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('菊', 'キク', '', 'kiku', 'CÚC', 'Hoa cúc hoàng gia', 11, '艹 -> 匊', '秋になると 菊の 展示会が 各地で 開かれます。', 'Aki ni naru to kiku no tenjikai ga kakuchi de hirakaremasu.', 'Mùa thu đến các triển lãm hoa cúc được tổ chức khắp nơi.', 'N2', 'Cỏ hoa ôm trọn vẻ đẹp thanh cao', 'Đóa hoa cúc nở trọn ôm ấp linh hồn mùa thu.', '🌼', v_ch14_id, 5, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('枝', 'シ', 'えだ', 'eda', 'CHI', 'Cành cây, nhánh cây', 8, '木 -> 支', '鳥が 木の 枝に 止まって さえずっています。', 'Tori ga ki no eda ni tomatte saezutteimasu.', 'Chú chim nhỏ đậu trên cành cây hót líu lo.', 'N2', 'Cây gỗ có nhánh chống đỡ', 'Cành cây xòe rộng nâng đỡ tổ chim.', '🌿', v_ch14_id, 6, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('紺', 'コン', '', 'kon', 'CÁM', 'Xanh lam sẫm, xanh navy', 11, '糸 -> 甚', '紺色の スーツを 着て 面接に 臨みます。', 'Kon-iro no suutsu o kite mensetsu ni nozomimasu.', 'Mặc bộ âu phục màu xanh navy trang nhã đi phỏng vấn.', 'N2', 'Sợi tơ nhuộm màu chàm đậm', 'Sợi tơ đẫm sắc xanh đậm chàm hoàng gia.', '🧥', v_ch14_id, 7, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('紫', 'シ', 'むらさき', 'murasaki', 'TỬ', 'Màu tím quý phái', 12, '此 -> 糸', '初夏に 綺麗な 紫色の アジサイが 咲きます。', 'Shoka ni kirei na murasakiiro no ajisai ga sakimasu.', 'Đầu mùa hạ hoa cẩm tú cầu màu tím biếc nở rộ ven đường.', 'N2', 'Sợi tơ tím quý tộc', 'Sợi tơ nhuộm sắc tím cung đình cao quý.', '💜', v_ch14_id, 8, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('紅', 'コウ, ク', 'べに, くれない', 'beni', 'HỒNG', 'Màu đỏ thắm, hồng trà', 9, '糸 -> 工', '秋の 山々が 美しい 紅葉に 染まっています。', 'Aki no yamayama ga utsukushii kouyou ni somatteimasu.', 'Núi rừng mùa thu nhuộm thắm sắc lá đỏ rực rỡ.', 'N2', 'Sợi tơ nhuộm sắc đỏ công xưởng', 'Sợi tơ dệt nên màu đỏ son tươi thắm.', '🍁', v_ch14_id, 9, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('灰', 'カイ', 'はい', 'hai', 'HÔI', 'Tro tàn, màu xám tro', 6, '厂 -> 火', '火山灰が 風に 乗って 広範囲に 降りました。', 'Kazanhai ga kaze ni notte kouhan-i ni furimashita.', 'Tro núi lửa theo gió bay rơi xuống một vùng rộng lớn.', 'N2', 'Dưới vách đá đống lửa tàn thành tro', 'Ngọn lửa dưới vách núi cháy kiệt hóa thành tro xám.', '🌫️', v_ch14_id, 10, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鮮', 'セン', 'あざ・やか', 'aza', 'TIÊN', 'Tươi sống, tươi thắm', 17, '魚 -> 羊', '市場で 鮮度の 高い 新鮮な 魚を 買います。', 'Ichiba de sendo no takai shinsen na sakana o kaimasu.', 'Mua cá tươi rói chất lượng cao tại chợ đầu mối.', 'N2', 'Cá tươi và thịt cừu béo ngậy', 'Cá tươi cùng thịt cừu tạo nên vị tươi ngọt tuyệt trần.', '🐟', v_ch14_id, 11, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('彩', 'サイ', 'いろど・る', 'irodo', 'THẢI', 'Sắc màu rực rỡ', 11, '采 -> 彡', '色とりどりの 花が 庭を 鮮やかに 彩ります。', 'Irotoridori no hana ga niwa o azayaka ni irodorimasu.', 'Những đóa hoa muôn màu điểm tô sắc hương rực rỡ cho khu vườn.', 'N2', 'Bàn tay hái những sắc màu lung linh', 'Bàn tay vẽ nên ba dải màu sắc lung linh.', '🎨', v_ch14_id, 12, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('飼', 'シ', 'か・う', 'ka', 'TỰ', 'Nuôi dưỡng thú cưng', 13, '食 -> 司', '家で 可愛い 猫を 二匹 飼っています。', 'Ie de kawaii neko o nihiki katteimasu.', 'Nhà tôi đang nuôi dưỡng chăm sóc hai chú mèo rất dễ thương.', 'N2', 'Cho thức ăn cai quản đàn gia súc', 'Cho thú cưng ăn uống chăm lo nuôi nấng chu đáo.', '🐈', v_ch14_id, 13, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('畜', 'チク', '', 'chiku', 'SÚC', 'Gia súc, chăn nuôi', 10, '玄 -> 田', 'この 地域では 酪農や 畜産業が 盛んです。', 'Kono chiiki de wa rakunou ya chikusangyou ga sakan desu.', 'Vùng này phát triển mạnh ngành chăn nuôi gia súc và bò sữa.', 'N2', 'Dây thừng dắt thú ra đồng cỏ', 'Gia súc nuôi thả trên cánh đồng cỏ xanh tốt.', '🐄', v_ch14_id, 14, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('猫', 'ビョウ', 'ねこ', 'neko', 'MIÊU', 'Con mèo', 11, '犭 -> 苗', '日当たりの 良い 縁側で 猫が 丸くなって 眠っています。', 'Hiatari no yoi engawa de neko ga marukunatte nemutteimasu.', 'Chú mèo cuộn tròn ngủ say sưa ngoài hiên ngập tràn ánh nắng.', 'N2', 'Con thú săn chuột nơi ruộng mạ', 'Con thú nhỏ tinh ranh rình bắt chuột nơi đồng lúa.', '🐱', v_ch14_id, 15, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('羊', 'ヨウ', 'ひつじ', 'hitsuji', 'DƯƠNG', 'Con cừu', 6, '羊', '牧場で 白い 羊の 群れが 草を 食べています。', 'Bokujou de shiroi hitsuji no mure ga kusa o tabeteimasu.', 'Đàn cừu trắng đang gặm cỏ thanh bình trên trang trại.', 'N2', 'Đôi sừng và bộ lông cừu mềm mại', 'Chú cừu hiền lành đôi sừng cong cong gặm cỏ non.', '🐑', v_ch14_id, 16, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('豚', 'トン', 'ぶた', 'buta', 'ĐỒN', 'Con heo, thịt lợn', 11, '月 -> 豕', '豚肉と 野菜を たっぷり 入れた 鍋料理。', 'Butaniku to yasai o tappuri ireta naberyouri.', 'Nồi lẩu thơm ngon với đầy ắp thịt heo và rau xanh.', 'N2', 'Thịt của loài lợn béo tốt', 'Loài gia súc thịt thơm ngon nuôi nấng trong chuồng.', '🐷', v_ch14_id, 17, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('巣', 'ソウ', 'す', 'su', 'SÀO', 'Tổ chim, hang ổ', 11, '𡿨 -> 田 -> 木', 'ツバメが 軒下に 泥で 巣を 作りました。', 'Tsubame ga nokishita ni doro de su o tsukurimashita.', 'Chim én đã dùng bùn khéo léo đắp chiếc tổ ấm dưới mái hiên.', 'N2', 'Ba chú chim non trong tổ trên cây', 'Tổ ấm trên cây che chở những sinh linh bé bỏng.', '🪺', v_ch14_id, 18, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('放', 'ホウ', 'はな・す, はな・つ', 'hana', 'PHÓNG', 'Thả ra, giải phóng', 8, '方 -> 攵', '川に 稚魚を 放流して 資源を 保護します。', 'Kawa ni chigyo o houryuushite shigen o hogoshimasu.', 'Thả cá con xuống sông để bảo tồn và phát triển nguồn lợi.', 'N2', 'Cầm roi thả vật đi muôn phương', 'Mở rộng bốn phương thả cho chim thú tự do.', '🕊️', v_ch14_id, 19, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('牧', 'ボク', 'まき', 'maki', 'MỤC', 'Chăn thả, đồng cỏ', 8, '牛 -> 攵', '広大な 牧場で 牛や 馬が のんびり 暮らしています。', 'Koudai na bokujou de ushi ya uma ga nonbiri kurashiteimasu.', 'Trên cánh đồng cỏ bao la đàn bò ngựa sống thong dong tự tại.', 'N2', 'Cầm roi chăn thả đàn bò', 'Người mục đồng cầm roi dẫn bò trên đồng cỏ bát ngát.', '🤠', v_ch14_id, 20, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('滝', '', 'たき', 'taki', 'LANG', 'Thác nước hùng vĩ', 13, '氵 -> 竜', '山奥に 壮大な 滝が 水しぶきを 上げて 落ちています。', 'Yamaoku ni soudai na taki ga mizushibuki o agete ochiteimasu.', 'Sâu trong lòng núi con thác đổ nước tung bọt trắng xóa hùng vĩ.', 'N2', 'Dòng nước rồng cuộn tuôn trào', 'Dòng nước như con rồng thần uốn lượn lao từ vách núi.', '🌊', v_ch14_id, 21, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('沼', 'ショウ', 'ぬま', 'numa', 'CHIỂU', 'Đầm lầy', 8, '氵 -> 召', '静かな 沼の ほとりに 水鳥が 集まっています。', 'Shizuka na numa no hotori ni mizutori ga atsumatteimasu.', 'Đàn chim nước tụ họp yên ả bên bờ đầm lầy thanh vắng.', 'N2', 'Dòng nước mời gọi muôn loài', 'Vùng nước tĩnh lặng gọi muôn chim muông về trú ngụ.', '🦆', v_ch14_id, 22, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('滴', 'テキ', 'しずく', 'shizuku', 'TÍCH', 'Giọt nước, tí tách', 14, '氵 -> 啇', '岩肌から 水の 滴が ぽたぽたと 垂れています。', 'Iwahada kara mizu no shizuku ga potapota to tareteimasu.', 'Từ vách đá từng giọt nước nhỏ rơi tí tách mát rượi.', 'N2', 'Dòng nước nơi gốc cây nhỏ giọt', 'Giọt nước tinh khiết ngưng đọng trên nhành hoa.', '💧', v_ch14_id, 23, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('凍', 'トウ', 'こお・る, こご・える', 'koo', 'ĐỐNG', 'Đóng băng, đông lạnh', 10, '冫 -> 東', '真冬の 寒さで 湖の 水面が 完全に 凍りつきました。', 'Mafuyu no samusa de mizuumi no suimen ga kanzen ni kooritsukimashita.', 'Cái lạnh giữa mùa đông làm mặt hồ đóng băng hoàn toàn.', 'N2', 'Băng giá phương đông buốt giá', 'Hai giọt băng lạnh buốt đông cứng cả vạn vật phương đông.', '🧊', v_ch14_id, 24, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('瀬', '', 'せ', 'se', 'LẠI', 'Dòng nước cạn, ghềnh đá', 19, '氵 -> 頼', '川の 浅瀬を 渡って 対岸へ 行きます。', 'Kawa no asase o watatte taigan e ikimasu.', 'Lội qua khúc ghềnh cạn để sang bờ sông bên kia.', 'N2', 'Dòng nước nương tựa đá sỏi', 'Dòng nước cạn trong veo róc rách chảy qua bãi sỏi.', '🏞️', v_ch14_id, 25, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('浄', 'ジョウ', '', 'jou', 'TỊNH', 'Thanh tịnh, lọc sạch', 9, '氵 -> 争', '浄水器を 通した 美味しい 水を 飲みます。', 'Jousuiki o tooshita oishii mizu o nomimasu.', 'Uống dòng nước sạch ngọt lành đã qua máy lọc nước tinh khiết.', 'N2', 'Dòng nước tranh giành sự sạch trong', 'Dòng nước cuốn trôi cặn bã giữ lại sự thanh tịnh.', '🚰', v_ch14_id, 26, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('掘', 'クツ', 'ほ・る', 'ho', 'QUẬT', 'Đào bới, khai quật', 11, '扌 -> 屈', '古代の 遺跡を 慎重に 発掘します。', 'Kodai no iseki o shinchou ni hakkutsushimasu.', 'Cẩn trọng khai quật khu di tích lịch sử cổ đại.', 'N2', 'Bàn tay cúi mình đào bới', 'Bàn tay đào sâu vào lòng đất tìm kiếm cổ vật quý.', '⛏️', v_ch14_id, 27, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('埋', 'マイ', 'う・める, う・まる', 'u', 'MAI', 'Chôn vùi, lấp đầy', 10, '土 -> 里', 'タイムカプセルを 校庭の 土に 埋めました。', 'Taimukapuseru o koutei no tsuchi ni umemashita.', 'Chôn chiếc hộp ký ức thời gian vào mảnh đất sân trường.', 'N2', 'Đất chôn giấu nơi thôn xóm', 'Đắp đất vùi lấp bảo tồn hạt giống cho đời sau.', '⏳', v_ch14_id, 28, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泥', 'デイ', 'どろ', 'doro', 'NÊ', 'Bùn lầy', 8, '氵 -> 尼', '雨上がりの 道を 歩いて 靴が 泥まみれに なりました。', 'Ameagari no michi o aruite kutsu ga doromamire ni narimashita.', 'Đi bộ trên con đường sau mưa khiến đôi giày dính đầy bùn đất.', 'N2', 'Nước hòa đất cạnh ni cô', 'Dòng nước nhào đất thành lớp bùn lầy màu mỡ.', '🟤', v_ch14_id, 29, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('炭', 'タン', 'すみ', 'sumi', 'THAN', 'Than đá, than củi', 9, '山 -> 灰', '炭火で 焼いた 魚は 香ばしくて 絶品です。', 'Sumibi de yaita sakana wa koubashikute zeppin desu.', 'Món cá nướng than hoa thơm lừng và là tuyệt phẩm ẩm thực.', 'N2', 'Tro tàn dưới ngọn núi hóa than', 'Gỗ rừng dưới núi đốt cháy thành những thỏi than hoa đượm lửa.', '🪵', v_ch14_id, 30, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鉱', 'コウ', '', 'kou', 'KHOÁNG', 'Quặng khoáng, mỏ than', 13, '金 -> 広', 'この 山には 豊かな 鉱物資源が 眠っています。', 'Kono yama ni wa yutaka na koubutsushigen ga nemutteimasu.', 'Sâu trong lòng ngọn núi này chứa đựng tài nguyên khoáng sản phong phú.', 'N2', 'Kim loại trải rộng trong lòng đất', 'Mỏ kim loại quý mở rộng trong lòng đất đá.', '⛏️', v_ch14_id, 31, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('銅', 'ドウ', '', 'dou', 'ĐỒNG', 'Kim loại đồng, huy chương đồng', 14, '金 -> 同', 'オリンピックで 見事に 銅メダルを 獲得しました。', 'Orinpikku de migoto ni doumedaru o kakutokushimashita.', 'Xuất sắc giành được tấm huy chương đồng danh giá tại Olympic.', 'N2', 'Kim loại đúc đều cùng khuôn', 'Khối kim loại màu đỏ ánh nâu đúc chuông và tượng.', '🥉', v_ch14_id, 32, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('穴', 'ケツ', 'あな', 'ana', 'HUYỆT', 'Hang hốc, lỗ thủng', 5, '穴', '靴下に 小さな 穴が 開いてしまいました。', 'Kutsushita ni chiisana ana ga aiteshimaimashita.', 'Chiếc tất bị thủng một lỗ nhỏ ở gót chân.', 'N2', 'Mái vòm khoét một lỗ', 'Mái che khoét sâu một lỗ tạo thành chiếc hang ấm.', '🕳️', v_ch14_id, 33, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('洞', 'ドウ', 'ほら', 'hora', 'ĐỖNG', 'Hang động thiên nhiên', 9, '氵 -> 同', '探検隊が 未知の 洞窟を 調査します。', 'Tankentai ga michi no doukutsu o chousashimasu.', 'Đoàn thám hiểm khảo sát hang động bí ẩn chưa từng được khám phá.', 'N2', 'Dòng nước chảy xuyên qua hang cùng', 'Dòng nước ngầm khoét sâu vách đá thành hang động.', '🪨', v_ch14_id, 34, '/assets/kanji/n2/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('殴', 'オウ', 'なぐ・る', 'nagu', 'ẨU', 'Đánh đấm, ẩu đả', 8, '区 -> 殳', '暴力は いけません。人を 殴ってはいけません。', 'Bouryoku wa ikemasen. Hito o nagutte wa ikemasen.', 'Bạo lực là sai trái. Tuyệt đối không được đấm đánh người khác.', 'N2', 'Cầm gậy đập vào khu vực cấm', 'Cầm binh khí ẩu đả gây náo loạn chốn đông người.', '👊', v_ch15_id, 1, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('叫', 'キョウ', 'さけ・ぶ', 'sake', 'KHIẾU', 'Hét to, gào thét', 5, '口 -> 丩', '助けを 求めて 大声で 叫びました。', 'Tasuke o motomete oogoe de sakebimashita.', 'Hét thật to kêu cứu xin sự giúp đỡ.', 'N2', 'Mở miệng thét lớn liên hồi', 'Mở to miệng cất tiếng gào thét vang dội.', '🗣️', v_ch15_id, 2, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('怖', 'フ, ホ', 'こわ・い', 'kowa', 'PHỐ', 'Sợ hãi, đáng sợ', 8, '忄 -> 布', 'お化け屋敷で 怖い 体験を しました。', 'Obakeyashiki de kowai taiken o shimashita.', 'Trải qua cảm giác khiếp sợ thót tim trong ngôi nhà ma ám.', 'N2', 'Trái tim rúng động dưới tấm vải trắng', 'Nỗi sợ hãi bao phủ tâm trí tựa bóng ma.', '😱', v_ch15_id, 3, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('嫌', 'ケン, ゲン', 'きら・う, いや', 'kira', 'HIỀM', 'Ghét bỏ, khó chịu', 13, '女 -> 兼', '嫌な ことが あっても 前を 向いて 歩きます。', 'Iya na koto ga atte mo mae o muite arukimasu.', 'Dẫu gặp chuyện không vừa ý vẫn lạc quan tiến về phía trước.', 'N2', 'Người phụ nữ kiêm giữ nỗi hiềm khích', 'Lòng người mang điều bất bình ghét bỏ.', '😒', v_ch15_id, 4, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('憎', 'ゾウ', 'にく・む, にく・らしい', 'niku', 'TĂNG', 'Căm ghét, căm thù', 14, '忄 -> 曽', '罪を 憎んで 人を 憎まず。', 'Tsumi o nikunde hito o nikumazu.', 'Ghét tội ác lỗi lầm nhưng không thù hận con người.', 'N2', 'Trái tim chất chứa hờn căm từng lớp', 'Tâm trí chất chồng nỗi hờn giận căm ghét.', '😠', v_ch15_id, 5, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('恥', 'チ', 'は・じる, はずか・しい', 'hazu', 'SỈ', 'Xấu hổ, sỉ nhục', 10, '耳 -> 心', '大勢の 前で 失敗して 恥ずかしかったです。', 'Oozei no mae de shippaishite hazukashikatta desu.', 'Mắc lỗi trước chốn đông người cảm thấy vô cùng ngượng ngùng.', 'N2', 'Tai đỏ bừng thẹn trong tim', 'Lỗ tai đỏ ửng vì nỗi xấu hổ dâng trào trong tim.', '😳', v_ch15_id, 6, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('誤', 'ゴ', 'あやま・る', 'ayama', 'NGỘ', 'Sai lầm, hiểu lầm', 14, '言 -> 呉', '判断を 誤ると 大きな 損失に つながります。', 'Handan o ayamaru to ookina sonshitsu ni tsunagarimasu.', 'Phán đoán sai lầm sẽ dẫn đến thiệt hại khôn lường.', 'N2', 'Lời nói ồn ào sai lệch ngô nghê', 'Ngôn từ lệch lạc dẫn tới sự ngộ nhận sai lầm.', '❌', v_ch15_id, 7, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('謝', 'シャ', 'あやま・る', 'ayama', 'TẠ', 'Xin lỗi, tạ ơn', 17, '言 -> 射', '迷惑を かけた ことを 素直に 謝りました。', 'Meiwaku o kaketa koto o sunao ni ayamarimashita.', 'Thành thật nói lời xin lỗi vì đã làm phiền người khác.', 'N2', 'Lời nói buông tên giải tỏa ân hận', 'Cất lời tạ lỗi chân thành xua tan muộn phiền.', '🙇', v_ch15_id, 8, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('励', 'レイ', 'はげ・ます, はげ・む', 'hage', 'LỆ', 'Khích lệ, cổ vũ', 12, '厉 -> 力', '落ち込んでいる 友人を 優しく 励まします。', 'Ochikondeiru yuujin o yasashiku hagemashimasu.', 'Dịu dàng động viên khích lệ người bạn đang buồn bã.', 'N2', 'Dốc sức vượt qua vách núi hiểm', 'Tiếp thêm sức lực cổ vũ nhau vượt qua chông gai.', '👏', v_ch15_id, 9, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('冗', 'ジョウ', '', 'jou', 'NHŨNG', 'Đùa cợt, nhàn rỗi, thừa thãi', 4, '冖 -> 几', '冗談を 言って みんなを 笑わせました。', 'Joudan o itte minna o warawasemashita.', 'Kể một câu chuyện đùa làm tất cả mọi người cùng bật cười.', 'N2', 'Chiếc ghế nhàn rỗi dưới mái nhà', 'Ngồi thư thả bông đùa xua tan không khí căng thẳng.', '😄', v_ch15_id, 10, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('提', 'テイ', 'さ・げる', 'tei', 'ĐỀ', 'Đề xuất, xách theo', 12, '扌 -> 是', '新しい 企画書を 上司に 提出します。', 'Atarashii kikakusho o joushi ni teishutsushimasu.', 'Nộp bản đề xuất kế hoạch mới lên cấp trên.', 'N2', 'Bàn tay nâng điều chân chính', 'Bàn tay nâng cao đề án đúng đắn trình bày.', '📄', v_ch15_id, 11, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('絶', 'ゼツ', 'た・える, た・つ', 'tatsu', 'TUYỆT', 'Tuyệt giao, cắt đứt, tuyệt hảo', 12, '糸 -> 色', '悪天候で 交通が 途絶えてしまいました。', 'Akutenkou de koutsuu ga todaeteshimaimashita.', 'Thời tiết xấu khiến giao thông bị gián đoạn cắt đứt hoàn toàn.', 'N2', 'Cắt đứt sợi chỉ nhuộm sắc', 'Cắt đứt sợi dây liên lạc dứt khoát đoạn tuyệt.', '✂️', v_ch15_id, 12, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宴', 'エン', '', 'en', 'YẾN', 'Bữa tiệc, yến tiệc', 10, '宀 -> 日 -> 女', '忘年会で 賑やかな 宴会が 催されました。', 'Bounenkai de nigiyaka na enkai ga moyooshisaremashita.', 'Bữa tiệc tất niên náo nhiệt được tổ chức linh đình.', 'N2', 'Phụ nữ sum vầy dưới mái nhà vui tiệc', 'Dưới mái ấm gia đình yến tiệc rộn ràng tiếng ca.', '🎉', v_ch15_id, 13, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('催', 'サイ', 'もよお・す', 'moyoo', 'THÔI', 'Tổ chức, thôi thúc', 13, '亻 -> 崔', '国際交流フェスティバルが 盛大に 開催されます。', 'Kokusai kouryuu fesutibaru ga seidai ni kaisaisaremasu.', 'Lễ hội giao lưu quốc tế được đăng cai tổ chức long trọng.', 'N2', 'Người trên đỉnh núi thúc giục', 'Đứng trên đỉnh cao kêu gọi tổ chức sự kiện cộng đồng.', '🎪', v_ch15_id, 14, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('渇', 'カツ', 'かわ・く', 'kawa', 'KHÁT', 'Khát nước, khao khát', 11, '氵 -> 曷', '運動の 後で のどが カラカラに 渇きました。', 'Undou no ato de nodo ga karakara ni kawakimashita.', 'Sau khi tập thể dục cổ họng khát khô cháy bỏng.', 'N2', 'Nước cạn dưới ánh nắng thiêu đốt', 'Dòng nước bị mặt trời hun nóng khiến lòng khát cháy.', '🥤', v_ch15_id, 15, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('酌', 'シャク', 'く・む', 'shaku', 'CHƯỚC', 'Rót rượu, châm rượu', 10, '酉 -> 勺', '先輩の お酌を して 親睦を 深めます。', 'Senpai no oshaku o shite shinboku o fukamemasu.', 'Rót rượu mời các bậc tiền bối để thắt chặt tình thân.', 'N2', 'Dùng muôi múc rượu từ bình', 'Chiếc muôi múc rượu rót mời chén bạn hiền.', '🍶', v_ch15_id, 16, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泡', 'ホウ', 'あわ', 'awa', 'PHAO', 'Bọt bong bóng', 8, '氵 -> 包', 'ビールの クリーミーな 泡が とても 美味しいです。', 'Biiru no kuriimii na awa ga totemo oishii desu.', 'Lớp bọt bia béo ngậy mịn màng uống rất ngon.', 'N2', 'Nước ôm bọc bọt khí', 'Dòng nước bao bọc hạt khí tạo thành bọt xà phòng.', '🫧', v_ch15_id, 17, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('吐', 'ト', 'は・く', 'ha', 'THỔ', 'Nôn mửa, thốt ra', 6, '口 -> 土', '飲みすぎて 気分が 悪くなり 吐いてしまいました。', 'Nomisugite kibun ga warukunari haiteshimaimashita.', 'Uống quá chén thấy khó chịu buồn nôn nên đã nôn ra.', 'N2', 'Miệng nhả đất bụi ra ngoài', 'Miệng nhả cặn bẩn thốt lời chân thật.', '🤮', v_ch15_id, 18, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('騒', 'ソウ', 'さわ・ぐ', 'sawa', 'TAO', 'Ồn ào, náo động', 18, '馬 -> 蚤', '夜遅くに 部屋で 大声で 騒いではいけません。', 'Yoru osoku ni heya de oogoe de sawaide wa ikemasen.', 'Nửa đêm không được la hét ồn ào làm phiền xung quanh.', 'N2', 'Ngựa bị bọ chét cắn náo loạn', 'Con ngựa lồng lộn hí vang vì bị bọ cắn náo động.', '📢', v_ch15_id, 19, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('延', 'エン', 'の・びる, の・ばす, の・べる', 'no', 'DUYÊN', 'Kéo dài, trì hoãn', 8, '廴 -> 正', '雨の ため 試合の 日程が 来週に 延期されました。', 'Ame no tame shiai no nittei ga raishuu ni enkisaremashita.', 'Vì trời mưa nên lịch thi đấu được hoãn lùi sang tuần sau.', 'N2', 'Bước chân dài kéo dài hành trình', 'Bước chân thong thả kéo dài thêm thời hạn.', '⏳', v_ch15_id, 20, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('超', 'チョウ', 'こ・える, こ・す', 'ko', 'SIÊU', 'Vượt trội, vượt quá', 12, '走 -> 召', '予算の 限度額を 超えてしまいました。', 'Yosan no gendogaku o koeteshimaimashita.', 'Đã chi tiêu vượt quá hạn mức ngân sách cho phép.', 'N2', 'Chạy nhanh vẫy gọi vượt qua', 'Chạy nhanh vượt qua mọi đối thủ phía trước.', '🚀', v_ch15_id, 21, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('更', 'コウ', 'さら, ふ・ける', 'sara', 'CANH', 'Đổi mới, đêm khuya, hơn nữa', 7, '一 -> 日 -> 乂', '夜が 更けて 静まり返った 街並み。', 'Yoru ga fukete shizumarikaetta machinami.', 'Đêm đã về khuya phố xá chìm trong tĩnh lặng êm đềm.', 'N2', 'Mặt trời lặn gõ canh đổi mới', 'Tiếng mõ cầm canh điểm đêm khuya đổi dời.', '🌙', v_ch15_id, 22, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('徹', 'テツ', '', 'tetsu', 'TRIỆT', 'Triệt để, thâu đêm', 15, '彳 -> 育 -> 攵', '試験勉強の ために 徹夜を しました。', 'Shikenbenkyou no tame ni tetsuya o shimashita.', 'Thức trắng đêm ôn tập chuẩn bị cho kỳ thi.', 'N2', 'Bước chân nuôi dạy triệt để', 'Từng bước rèn giũa xuyên suốt kiên trì đến cùng.', '☕', v_ch15_id, 23, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('懐', 'カイ', 'なつ・かしい, ふところ', 'natsu', 'HOÀI', 'Hoài niệm, nhớ nhung, túi áo', 16, '忄 -> 褱', '懐かしい 故郷の 風景を 思い出します。', 'Natsukashii kokyou no fuukei o omoidashimasu.', 'Nhớ về khung cảnh quê hương thân thương chan chứa hoài niệm.', 'N2', 'Trái tim giấu kín nỗi nhớ trong túi áo', 'Tâm can ôm ấp ký ức thân quen ấm áp.', '🏞️', v_ch15_id, 24, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('候', 'コウ', '', 'kou', 'HẬU', 'Khí hậu, mùa màng, kính ngữ', 10, '亻 -> 矦', '穏やかな 気候に 恵まれた 過ごしやすい 土地。', 'Odayaka na kikou ni megumareta sugoshiyasui tochi.', 'Vùng đất ôn hòa khí hậu mát mẻ dễ sống.', 'N2', 'Người bắn tên đón khí hậu mùa màng', 'Dõi mắt theo mũi tên đoán định sự chuyển vần thời tiết.', '🌤️', v_ch15_id, 25, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('僚', 'リョウ', '', 'ryou', 'LIÊU', 'Đồng liêu, đồng nghiệp', 14, '亻 -> 寮', '職場の 同僚と 助け合って プロジェクトを 進めます。', 'Shokuba no douryou to tasukeatte purojekuto o susumemasu.', 'Cùng các đồng nghiệp chung tay giúp đỡ nhau thúc đẩy dự án.', 'N2', 'Những người cùng chung phòng trọ', 'Bạn hữu cùng cơ quan kề vai sát cánh công tác.', '👥', v_ch15_id, 26, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('輩', 'ハイ', '', 'hai', 'BỐI', 'Tiền bối, hậu bối, thế hệ', 15, '非 -> 車', '経験豊富な 先輩から 多くを 学びます。', 'Keikenhoufu na senpai kara ooku o manabimasu.', 'Học hỏi được vô vàn điều hay từ các bậc tiền bối giàu kinh nghiệm.', 'N2', 'Đoàn xe nối đuôi từng hàng', 'Đoàn xe lớp trước lớp sau dìu dắt nhau tiến bước.', '🚗🚗', v_ch15_id, 27, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('誰', '', 'だれ', 'dare', 'THÙY', 'Ai, người nào', 15, '言 -> 隹', '誰でも 自由に 参加できる イベントです。', 'Daredemo jiyuu ni sankadekiru ibento desu.', 'Đây là sự kiện mở mà bất cứ ai cũng có thể tự do tham gia.', 'N2', 'Lời hỏi chú chim trên cành là ai', 'Cất lời chào hỏi nhận diện người lạ mặt.', '❓', v_ch15_id, 28, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('偶', 'グウ', '', 'guu', 'NGẪU', 'Ngẫu nhiên, tình cờ, số chẵn', 11, '亻 -> 禺', '街中で 偶然 旧友に 出会いました。', 'Machinaka de guuzen kyuuyuu ni deaimashita.', 'Tình cờ ngẫu nhiên hội ngộ bạn cũ giữa phố đông.', 'N2', 'Tượng người ghép đôi ngẫu hợp', 'Bức tượng tạc hình hai người ngẫu nhiên gặp gỡ.', '🎲', v_ch15_id, 29, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('孫', 'ソン', 'まご', 'mago', 'TÔN', 'Cháu nội, cháu ngoại', 10, '子 -> 幺', '祖父母は 孫の 成長を 心から 喜んでいます。', 'Sofubo wa mago no seichou o kokoro kara yorokondeimasu.', 'Ông bà vui mừng khôn xiết khi thấy cháu lớn khôn từng ngày.', 'N2', 'Đứa con nối dòng tơ thế hệ', 'Đứa trẻ tiếp nối sợi tơ huyết thống gia tộc.', '👶', v_ch15_id, 30, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('祖', 'ソ', '', 'so', 'TỔ', 'Tổ tiên, ông bà', 9, '礻 -> 且', '祖先の 墓参りに 行って 手を 合わせます。', 'Sosen no hakamairi ni itte te o awasemasu.', 'Đi viếng mộ tổ tiên chắp tay tưởng nhớ cội nguồn.', 'N2', 'Bàn thờ tổ tiên đặt bài vị trang trọng', 'Bàn thờ thiêng thờ phụng các bậc tiền nhân.', '🕯️', v_ch15_id, 31, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('似', 'ジ', 'に・る', 'ni', 'TỰ', 'Giống nhau, tương tự', 7, '亻 -> 以', '彼は お父さんに よく 似ています。', 'Kare wa otousan ni yoku niteteimasu.', 'Anh ấy có khuôn mặt rất giống người cha của mình.', 'N2', 'Người đứng kề nhau giống đúc', 'Con người thừa hưởng dáng nét thân thuộc giống nhau.', '👥', v_ch15_id, 32, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('召', 'ショウ', 'め・す', 'me', 'TRIỆU', 'Mời xơi (kính ngữ), triệu tập', 5, '刀 -> 口', 'どうぞ 温かいうちに 召し上がってください。', 'Douzo atatakai uchi ni meshiagatte kudasai.', 'Kính mời quý khách dùng bữa ngay khi món ăn còn nóng sốt.', 'N2', 'Cầm đao cất lời triệu mời', 'Cất lời mời trân trọng bề trên thưởng thức dùng món.', '🍽️', v_ch15_id, 33, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('拝', 'ハイ', 'おが・む', 'oga', 'BÁI', 'Cung kính bái lạy, xem (khiêm nhường)', 8, '扌 -> 丰', '神社に 参拝して 家内安全を 祈願します。', 'Jinja ni sanpaishite kanai-anzen o kiganshimasu.', 'Đến đền thờ bái lạy cầu nguyện gia đình bình an.', 'N2', 'Chắp hai tay cung kính vái chào', 'Chắp hai tay bái lễ thánh thần bề trên.', '🙇', v_ch15_id, 34, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('了', 'リョウ', '', 'ryou', 'LIỄU', 'Hoàn tất, kết liễu, thấu hiểu', 2, '了', 'すべての 処理が 無事に 完了しました。', 'Subete no shori ga buji ni kanryoushimashita.', 'Mọi công đoạn xử lý đã hoàn tất chu toàn tốt đẹp.', 'N2', 'Đứa trẻ bọc tã hoàn thành sinh nở', 'Dứt khoát hoàn tất khép lại mọi quy trình.', '🏁', v_ch15_id, 35, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('承', 'ショウ', 'うけたまわ・る', 'uketamawa', 'THỪA', 'Thừa nhận, đồng ý (khiêm nhường)', 8, '承', 'ご用件を 承りました。すぐに 手配いたします。', 'Goyouken o uketamawarimashita. Sugu ni tehai-itashimasu.', 'Tôi xin tiếp thu ghi nhận yêu cầu và sẽ thu xếp ngay.', 'N2', 'Đón nhận bằng hai bàn tay cung kính', 'Cung kính đón nhận chỉ thị trách nhiệm từ cấp trên.', '🤝', v_ch15_id, 36, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('伺', 'シ', 'うかが・う', 'ukaga', 'TỨ', 'Hỏi thăm, ghé thăm (khiêm nhường)', 7, '亻 -> 司', '来週の 月曜日に ご挨拶に 伺います。', 'Raishuu no getsuyoubi ni goaisatsu ni ukagaimasu.', 'Thứ Hai tuần sau tôi xin phép được ghé qua chào hỏi quý công ty.', 'N2', 'Người lắng nghe quan tư lệnh phán', 'Cung kính lắng nghe và thăm viếng nơi công quyền.', '🚶‍♂️', v_ch15_id, 37, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('頂', 'チョウ', 'いただ・く, いただき', 'itada', 'ĐỈNH', 'Đỉnh núi, xin nhận (khiêm nhường)', 11, '丁 -> 頁', 'お土産を いただき、誠に ありがとうございました。', 'Omiyage o itadaki, makoto ni arigatougozaimashita.', 'Tôi đã nhận được món quà quý xin chân thành cảm ơn.', 'N2', 'Cái đầu ngẩng cao chạm đỉnh nhận quà', 'Hai tay nâng quà qua đỉnh đầu cung kính nhận lấy.', '🙏', v_ch15_id, 38, '/assets/kanji/n2/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('被', 'ヒ', 'こうむ・る', 'koumu', 'BỊ', 'Bị tổn hại, chịu ảnh hưởng', 10, '衤 -> 皮', '台風で 各地に 甚大な 被害が 出ました。', 'Taifuu de kakuchi ni jindai na higai ga demashita.', 'Cơn bão đã gây ra những tổn thất thiệt hại nặng nề khắp nơi.', 'N2', 'Tấm áo rách chịu tổn thương', 'Mặc tấm áo rách chịu cảnh bão bùng thiên tai.', '🩹', v_ch16_id, 1, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('壊', 'カイ', 'こわ・す, こわ・れる', 'kowa', 'HOẠI', 'Hư hại, phá hủy', 16, '土 -> 褱', '地震で 古い 家屋が 倒壊しました。', 'Jishin de furui kaoku ga toukaishimashita.', 'Căn nhà cũ kỹ đã bị sụp đổ tan tành trong cơn động đất.', 'N2', 'Đất chôn giấu vỡ nát tan tành', 'Khối đất đá sụp đổ làm tan nát công trình.', '💥', v_ch16_id, 2, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('傾', 'ケイ', 'かたむ・く, かたむ・ける', 'katamu', 'KHUYNH', 'Nghiêng ngả, dốc sức', 13, '亻 -> 頃', '強い 地震で 建物が 少し 傾きました。', 'Tsuyoi jishin de tatemono ga sukoshi katamukimashita.', 'Trận động đất mạnh khiến tòa nhà hơi bị nghiêng dốc một bên.', 'N2', 'Người nghiêng đầu lắng nghe', 'Thân người nghiêng ngả theo độ dốc con đường.', '📐', v_ch16_id, 3, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('崩', 'ホウ', 'くず・れる, くず・す', 'kuzu', 'BĂNG', 'Sạt lở, sụp đổ', 11, '山 -> 朋', '大雨の 影響で 山肌が 崩れ落ちました。', 'Ooame no eikyou de yamahada ga kuzureochimashita.', 'Do mưa lớn kéo dài sườn núi đã bị sạt lở đất nghiêm trọng.', 'N2', 'Núi đôi bạn cùng sụp lở', 'Hai vách núi ngả nghiêng sụp đổ vùi lấp đường đi.', '🏔️', v_ch16_id, 4, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('噴', 'フン', 'ふ・く', 'fu', 'PHÚN', 'Phun trào, bốc hơi', 15, '口 -> 賁', '火山が 激しく 噴煙を 噴き上げました。', 'Kazan ga hageshiku fun-en o fukiagemashita.', 'Ngọn núi lửa phun trào cuồn cuộn những cột khói bụi mù trời.', 'N2', 'Miệng phun tài vật cuồn cuộn', 'Miệng núi mở to phun dòng nham thạch nóng bỏng.', '🌋', v_ch16_id, 5, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('炎', 'エン', 'ほのお', 'honoo', 'VIÊM', 'Ngọn lửa, bốc hỏa, viêm sưng', 8, '火 -> 火', '激しい 炎が 工場全体を 包み込みました。', 'Hageshii honoo ga koujouzentai o tsutsumikomimashita.', 'Ngọn lửa dữ dội thiêu rụi bao trùm toàn bộ khu nhà xưởng.', 'N2', 'Hai ngọn lửa bùng cháy dữ dội', 'Lửa chồng lên lửa bùng phát thành biển lửa đỏ rực.', '🔥', v_ch16_id, 6, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('洪', 'コウ', '', 'kou', 'HỒNG', 'Lũ lụt lớn, dâng trào', 9, '氵 -> 共', '連日の 豪雨で 河川が 氾濫し 洪水と なりました。', 'Renjitsu no gouu de kasen ga hanranshi kouzui to narimashita.', 'Mưa lớn nhiều ngày làm nước sông tràn bờ gây nên trận đại hồng thủy.', 'N2', 'Dòng nước chung sức dâng cuồn cuộn', 'Dòng nước lũ chung tay cuộn dâng xóa nhòa bờ bãi.', '🌊', v_ch16_id, 7, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('潭', 'タン', '', 'tan', 'ĐÀM', 'Vực nước sâu, đầm sâu', 15, '氵 -> 覃', '深い 潭の 底に 澄んだ 水が 溜まっています。', 'Fukai tan no soko ni sunda mizu ga tamatteimasu.', 'Dưới đáy vực sâu dòng nước trong veo tĩnh lặng đọng lại.', 'N2', 'Dòng nước sâu trải rộng thăm thẳm', 'Dòng nước hẻm núi tụ lại thành đầm vực nước sâu không đáy.', '💧', v_ch16_id, 8, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('波', 'ハ', 'なみ', 'nami', 'BA', 'Sóng biển, lan tỏa', 8, '氵 -> 皮', '海岸に 白い 波が 打ち寄せています。', 'Kaigan ni shiroi nami ga uchiyoseteimasu.', 'Từng đợt sóng biển trắng xóa vỗ dập dồn vào bờ cát.', 'N2', 'Lớp da nước biển nhấp nhô', 'Mặt nước biển gợn sóng nhấp nhô lan tỏa ngàn khơi.', '🌊', v_ch16_id, 9, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('荒', 'コウ', 'あら・い, あ・れる', 'ara', 'HOANG', 'Hoang vu, hung dữ, thô bạo', 9, '艹 -> 亡 -> 川', '冬の 日本海は 波が 荒いです。', 'Fuyu no Nihonkai wa nami ga arai desu.', 'Biển Nhật Bản vào mùa đông sóng gió vô cùng hung dữ cuộn trào.', 'N2', 'Cỏ úa trên dòng sông hoang tàn', 'Cỏ cây chết chóc bên dòng nước hoang dại lạnh lùng.', '🌪️', v_ch16_id, 10, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('激', 'ゲキ', 'はげ・しい', 'hage', 'KÍCH', 'Mãnh liệt, dữ dội', 16, '氵 -> 敫', '雨風が 激しく 吹き荒れています。', 'Amekaze ga hageshiku fukiareteimasu.', 'Gió mưa gầm rít dữ dội giật từng cơn kinh hoàng.', 'N2', 'Dòng nước vỗ mạnh vào tảng đá', 'Dòng nước cuộn sóng xô đập mãnh liệt vào bờ đá.', '⚡', v_ch16_id, 11, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('吹', 'スイ', 'ふ・く', 'fu', 'XÚY', 'Thổi gió, thổi sáo', 7, '口 -> 欠', '冷たい 北風が 強く 吹いています。', 'Tsumetai kitakaze ga tsuyoku fuiteimasu.', 'Cơn gió mùa bắc buốt giá đang rít lên thổi mạnh từng hồi.', 'N2', 'Miệng há ra thổi phù luồng gió', 'Mở miệng thở hắt luồng gió lạnh buốt qua khe cửa.', '💨', v_ch16_id, 12, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('乾', 'カン', 'かわ・く, かわ・かす', 'kawa', 'CAN', 'Khô ráo, sấy khô', 11, '十 -> 日 -> 乞', '天気が 良いので 洗濯物が すぐに 乾きました。', 'Tenki ga yoi node sentakumono ga sugu ni kawakimashita.', 'Trời nắng đẹp nên quần áo giặt vừa phơi đã mau khô ráo.', 'N2', 'Ánh mặt trời mười phương hong khô', 'Mặt trời chiếu rọi xua tan giọt ẩm hong khô vạn vật.', '☀️', v_ch16_id, 13, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('燥', 'ソウ', '', 'sou', 'TÁO', 'Hanh khô, khô khốc', 17, '火 -> 喿', '冬は 空気が 乾燥しやすいので 加湿器を つけます。', 'Fuyu wa kuuki ga kanshoushiyasui node kashitsuki o tsukemasu.', 'Mùa đông không khí rất dễ hanh khô nên bật máy tạo độ ẩm.', 'N2', 'Ngọn lửa làm bầy chim khát khô', 'Hơi lửa bốc cao làm bốc hơi toàn bộ giọt nước hanh khô.', '🏜️', v_ch16_id, 14, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('湿', 'シツ', 'しめ・る, しめ・す', 'shime', 'THẤP', 'Ẩm ướt, độ ẩm', 12, '氵 -> 显', '日本の 夏は 湿度と 気温が 高いです。', 'Nihon no natsu wa shitsudo to kion ga takai desu.', 'Mùa hè Nhật Bản có nhiệt độ và độ ẩm không khí rất cao.', 'N2', 'Dòng nước hiện rõ độ ẩm ướt', 'Nước đọng lại trên mặt đất tạo nên cảnh ẩm ướt.', '💧', v_ch16_id, 15, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('涼', 'リョウ', 'すず・しい, すず・む', 'suzu', 'LƯƠNG', 'Mát mẻ, thanh lương', 11, '氵 -> 京', '夕方になると 涼しい 風が 吹き抜けます。', 'Yuugata ni naru to suzushii kaze ga fukinukemasu.', 'Mỗi độ chiều buông từng làn gió mát rượi thổi qua hiên nhà.', 'N2', 'Dòng nước mát lành nơi kinh đô', 'Dòng nước ngọt ngào mát lành giải tỏa cơn nóng gay gắt.', '🎐', v_ch16_id, 16, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('宵', 'ショウ', 'よい', 'yoi', 'TIÊU', 'Chiều tối, đầu đêm', 10, '宀 -> 肖', '宵の 明星が 西の 空に 美しく 輝いています。', 'Yoi no myoujou ga nishi no sora ni utsukushiku kagayaiteimasu.', 'Ngôi sao hôm đầu đêm tỏa sáng lung linh nơi bầu trời phía tây.', 'N2', 'Mái nhà dưới vầng trăng đầu đêm', 'Dưới mái ấm ánh hoàng hôn vừa tắt nhường chỗ cho sao đêm.', '🌆', v_ch16_id, 17, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('嵐', '', 'あらし', 'arashi', 'LAM', 'Cơn giông bão, cuồng phong', 12, '山 -> 風', '嵐が 過ぎ去って 青空が 広がりました。', 'Arashi ga sugisatte aozora ga hirogarimashita.', 'Cơn giông bão quét qua nhường chỗ cho bầu trời xanh ngắt trải rộng.', 'N2', 'Ngọn gió cuồng phong trên đỉnh núi', 'Cơn cuồng phong xé toạc mây trời quét qua đỉnh núi.', '⛈️', v_ch16_id, 18, '/assets/kanji/n2/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('俳', 'ハイ', '', 'hai', 'BÀI', 'Thơ Haiku, diễn viên tuồng', 10, '亻 -> 非', '松尾芭蕉の 有名な 俳句を 暗記します。', 'Matsuo Bashou no yuumei na haiku o ankishimasu.', 'Học thuộc lòng những vần thơ Haiku lừng danh của thi hào Basho.', 'N2', 'Người đóng vai diễn hài hước', 'Con người hóa thân thành nghệ sĩ ngâm vịnh thơ ca.', '📜', v_ch17_id, 1, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('句', 'ク', '', 'ku', 'CÚ', 'Câu cú, câu thơ', 5, '勹 -> 口', '心に 響く 名句を ノートに 書き留めます。', 'Kokoro ni hibiku meiku o nooto ni kakitomemasu.', 'Ghi lại những câu thơ danh ngôn lay động lòng người vào sổ tay.', 'N2', 'Gói gọn lời nói thành câu', 'Gom trọn ngôn từ súc tích thành một câu chữ đắt giá.', '✍️', v_ch17_id, 2, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('詞', 'シ', '', 'shi', 'TỪ', 'Ca từ, từ ngữ', 12, '言 -> 司', 'この 歌の 歌詞は とても 感動的です。', 'Kono uta no kashi wa totemo kandouteki desu.', 'Lời ca từ của bài hát này vô cùng xúc động và ý nghĩa.', 'N2', 'Lời nói được trau chuốt quản lý', 'Ngôn từ chuẩn mực kết hợp giai điệu thành bài ca.', '🎵', v_ch17_id, 3, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('覧', 'ラン', '', 'ran', 'LÃM', 'Xem xét, chiêm ngưỡng', 17, '臣 -> 𠂉 -> 皿 -> 見', '展覧会で 素晴らしい 芸術作品を 観覧します。', 'Tenrankai de subarashii geijutsusakuhin o kanranshimasu.', 'Thưởng lãm những tác phẩm nghệ thuật tuyệt tác tại buổi triển lãm.', 'N2', 'Quan lại cúi nhìn chiếc đĩa ngọc', 'Đôi mắt chăm chú chiêm ngưỡng tỏ tường vật báu.', '👀', v_ch17_id, 4, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('簿', 'ボ', '', 'bo', 'BỘ', 'Sổ sách, danh bạ', 19, '竹 -> 溥', 'クラスの 出席簿を つけて 点呼を 行います。', 'Kurasu no shussekibo o tsukete tenko o okonaimasu.', 'Điểm danh học sinh và ghi chép vào sổ điểm danh lớp học.', 'N2', 'Thẻ tre ghi chép rộng rãi', 'Tập thẻ tre ghi danh tính bách tính lưu trữ công đường.', '📋', v_ch17_id, 5, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('塾', 'ジュク', '', 'juku', 'THỤC', 'Trường tư thục, lò luyện thi', 14, '孰 -> 土', '放課後に 学習塾に 通って 受験勉強を します。', 'Houkago ni gakushuujuku ni kayotte jukenbenkyou o shimasu.', 'Sau giờ học tan trường đến lò luyện thi ôn luyện đại học.', 'N2', 'Nấu chín kiến thức trên nền đất', 'Mảnh đất tôi luyện kiến thức vững vàng cho học trò.', '🏫', v_ch17_id, 6, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('踊', 'ヨウ', 'おど・る, おど・り', 'odo', 'DŨNG', 'Nhảy múa, vũ đạo', 14, '足 -> 勇', '盆踊りで 音楽に 合わせて 楽しく 踊ります。', 'Bon-odori de ongaku ni awasete tanoshiku odorimasu.', 'Hòa cùng điệu nhạc nhảy múa vui tươi trong lễ hội Bon-odori.', 'N2', 'Đôi chân dũng mãnh nhảy múa', 'Đôi chân bước theo nhịp điệu nhún nhảy hào hứng.', '💃', v_ch17_id, 7, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('像', 'ゾウ', '', 'zou', 'TƯỢNG', 'Bức tượng, hình ảnh', 14, '亻 -> 象', '公園の 中央に 英雄の 銅像が 立っています。', 'Kouen no chuuou ni eiyuu no douzou ga tatteimasu.', 'Bức tượng đồng vị anh hùng sừng sững giữa trung tâm công viên.', 'N2', 'Người tạc hình chú voi khổng lồ', 'Con người điêu khắc tạc nên hình tượng uy nghi.', '🗿', v_ch17_id, 8, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('殿', 'デン, テン', 'との', 'tono', 'ĐIỆN', 'Cung điện, cung đình, ngài', 13, '尸 -> 共 -> 殳', '歴史ある 神殿を 訪れて 祈りを 捧げます。', 'Rekishiaru shinden o otozurete inori o sasagemasu.', 'Ghé thăm đền thờ cổ kính và dâng lời nguyện cầu an lành.', 'N2', 'Cung điện có binh lính bồng gươm bảo vệ', 'Tòa lâu đài tráng lệ của các bậc đế vương quý tộc.', '🏛️', v_ch17_id, 9, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('坊', 'ボウ, ボッ', '', 'bou', 'PHƯỜNG', 'Chú tiểu, con trai bé, phố phường', 7, '土 -> 方', 'お寺の お坊さんが 鐘を ついています。', 'Otera no obousan ga kane o tsuiteimasu.', 'Nhà sư nơi cửa chùa đang thong thả gióng từng hồi chuông.', 'N2', 'Đất đắp bốn phương góc phố', 'Khu phố an cư nơi chú tiểu tu dưỡng thiền môn.', '👦', v_ch17_id, 10, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('跡', 'セキ', 'あと', 'ato', 'TÍCH', 'Dấu tích, di tích', 13, '足 -> 亦', '城の 跡地が 歴史公園として 整備されました。', 'Shiro no atochi ga rekishikouen to shite seibisaremashita.', 'Khu di tích nền móng tòa thành cũ được cải tạo thành công viên lịch sử.', 'N2', 'Dấu chân in trên đất qua năm tháng', 'Bước chân in dấu ngàn xưa để lại vết tích hào hùng.', '👣', v_ch17_id, 11, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('祈', 'キ', 'いの・る', 'ino', 'KÌ', 'Cầu nguyện, cầu khấn', 8, '礻 -> 斤', '家族の 健康と 幸福を 心から 祈ります。', 'Kazoku no kenkou to koufuku o kokoro kara inorimasu.', 'Thành tâm nguyện cầu cho gia đình luôn dồi dào sức khỏe và hạnh phúc.', 'N2', 'Bàn thờ dâng rìu chém tà cầu may', 'Đứng trước bàn thờ linh thiêng dâng lời nguyện ước chí tình.', '🙏', v_ch17_id, 12, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('刑', 'ケイ', '', 'kei', 'HÌNH', 'Hình phạt, hình sự', 6, '开 -> 刂', '裁判で 重い 刑罰が 言い渡されました。', 'Saiban de omoi keibatsu ga iiwatasaremashita.', 'Tòa án đã chính thức tuyên phạt bản án hình sự nghiêm khắc.', 'N2', 'Dùng dao chém phạt theo khuôn', 'Lưỡi dao công lý xử lý trừng phạt kẻ phạm tội.', '⚖️', v_ch17_id, 13, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('罰', 'バツ, バチ', '', 'batsu', 'PHẠT', 'Trừng phạt, phạt tiền', 14, '罒 -> 言 -> 刂', '交通違反を して 罰金を 支払いました。', 'Koutsuuihan o shite bakkin o shiharaimashita.', 'Vi phạm luật giao thông nên tôi đã phải nộp tiền phạt.', 'N2', 'Lưới bắt lời gian dao chém phạt', 'Mạng lưới pháp luật trừng phạt nghiêm minh kẻ gian ác.', '🚫', v_ch17_id, 14, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('盗', 'トウ', 'ぬす・む', 'nusu', 'ĐẠO', 'Trộm cắp, ăn trộm', 11, '次 -> 皿', '自転車を 盗まれないように 鍵を 二重に かけます。', 'Jitensha o nusumarenai you ni kagi o nijuu ni kakemasu.', 'Khóa hai lần cẩn thận để chiếc xe đạp không bị trộm mất.', 'N2', 'Người thèm muốn đĩa thức ăn trộm lấy', 'Thèm thuồng nhìn đĩa thức ăn sinh lòng trộm cắp.', '🥷', v_ch17_id, 15, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('捜', 'ソウ', 'さが・す', 'saga', 'SƯU', 'Sưu tầm, điều tra tìm kiếm', 10, '扌 -> 叟', '警察が 現場周辺を 徹底的に 捜査します。', 'Keisatsu ga genbashuuhen o tetteiteki ni sousashimasu.', 'Cảnh sát tiến hành điều tra kỹ lưỡng xung quanh hiện trường vụ án.', 'N2', 'Bàn tay ông lão dò dẫm tìm kiếm', 'Bàn tay lục lọi điều tra tìm ra chứng cứ then chốt.', '🔍', v_ch17_id, 16, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('裁', 'サイ', 'さば・く, た・つ', 'saba', 'TÀI', 'Xét xử, trọng tài, cắt may', 12, '𢦒 -> 衣', '公正な 裁判官が 事件を 公平に 裁きます。', 'Kousei na saibankan ga jiken o kouhei ni sabakimasu.', 'Thẩm phán công minh phân xử vụ án một cách công bằng.', 'N2', 'Cắt vải phân chia áo quần theo quy chuẩn', 'Lưỡi dao tài phán phân xử rạch ròi đúng sai.', '⚖️', v_ch17_id, 17, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('統', 'トウ', 'す・べる', 'sube', 'THỐNG', 'Thống nhất, thống trị, hệ thống', 12, '糸 -> 充', '国全体の 意見を 統一して 前に進みます。', 'Kunizentai no iken o touitsushite mae ni susumimasu.', 'Thống nhất ý chí của toàn thể quốc gia để cùng tiến bước.', 'N2', 'Sợi chỉ thâu tóm sung túc muôn mối', 'Sợi tơ kết nối quy tụ muôn nhánh về một mối thống nhất.', '🌐', v_ch17_id, 18, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('衆', 'シュウ, シュ', '', 'shuu', 'CHÚNG', 'Quần chúng, đại chúng', 12, '血 -> 𠱂', '大衆の 意見に 耳を 傾ける 政治家。', 'Taishuu no iken ni mimi o katamukeru seijika.', 'Chính khách luôn biết lắng nghe ý kiến của đông đảo quần chúng.', 'N2', 'Dưới ánh mặt trời ba người cùng bước', 'Đông đảo bách tính nhân dân cùng chung tiếng nói.', '👥', v_ch17_id, 19, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('秩', 'チツ', '', 'chitsu', 'TRẬT', 'Trật tự, thứ tự', 10, '禾 -> 失', '社会の 秩序を 守る ための 法律。', 'Shakai no chitsujo o mamoru tame no houritsu.', 'Hệ thống pháp luật ban hành nhằm giữ vững trật tự xã hội.', 'N2', 'Lúa thóc chia theo thứ bậc trật tự', 'Thóc lúa phân phối theo quy chuẩn không để thất thoát.', '📐', v_ch17_id, 20, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('序', 'ジョ', '', 'jo', 'TỰ', 'Thứ tự, tựa sách', 7, '广 -> 予', '順番を 守って 秩序正しく 並びます。', 'Junban o mamotte chitsujotadashiku narabimasu.', 'Xếp hàng trật tự ngay ngắn tuân thủ đúng số thứ tự.', 'N2', 'Dưới mái nhà xếp đặt theo trật tự', 'Dưới mái hiên phân định trước sau ngăn nắp.', '🔢', v_ch17_id, 21, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('閣', 'カク', '', 'kaku', 'CÁC', 'Nội các, gác chuông', 14, '門 -> 各', '内閣総理大臣が 新しい 方針を 発表します。', 'Naikakusouridaijin ga atarashii houshin o happyoushimasu.', 'Thủ tướng nội các công bố phương châm chính sách mới.', 'N2', 'Cánh cửa mở ra đón các đại thần', 'Cánh cổng dinh thự các đại thần hội họp bàn việc nước.', '🏛️', v_ch17_id, 22, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('批', 'ヒ', '', 'hi', 'PHÊ', 'Phê bình, thẩm định', 8, '扌 -> 比', '建設的な 批判を 受け入れて 成長します。', 'Kensetsuteki na hihan o ukeirete seichoushimasu.', 'Tiếp thu những lời phê bình mang tính xây dựng để trưởng thành.', 'N2', 'Bàn tay so sánh phân định đúng sai', 'Bàn tay cân đo so sánh đưa ra lời phê bình công tâm.', '📝', v_ch17_id, 23, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('敵', 'テキ', 'かたき', 'teki', 'ĐỊCH', 'Kẻ địch, đối thủ', 15, '啇 -> 攵', '強力な 敵に 立ち向かう 勇気を 持ちます。', 'Kyouryoku na teki ni tachimukau yuuki o mochimasu.', 'Có dũng khí kiên cường đối đầu với kẻ địch hùng mạnh.', 'N2', 'Gõ roi xua đuổi kẻ chống đối', 'Cầm gậy đánh đuổi kẻ thù xâm phạm bờ cõi.', '🤺', v_ch17_id, 24, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('砲', 'ホウ', '', 'hou', 'PHÁO', 'Khẩu pháo, đạn pháo', 10, '石 -> 包', '大砲の 轟音が 遠くの 空に 響き渡りました。', 'Taihou no gouon ga tooku no sora ni hibikiwatarimashita.', 'Tiếng gầm rền vang của đại pháo vọng mãi tận chân trời xa.', 'N2', 'Tảng đá bọc thuốc súng bắn ra', 'Khối đá bọc thuốc nổ bắn phá từ cỗ pháo lớn.', '💣', v_ch17_id, 25, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('領', 'リョウ', '', 'ryou', 'LÃNH', 'Lãnh thổ, lĩnh hội, thống lĩnh', 14, '令 -> 頁', '国の 領土を 固く 守り抜きます。', 'Kuni no ryoudo o kataku mamorinukimasu.', 'Kiên quyết giữ vững bảo vệ toàn vẹn lãnh thổ quốc gia.', 'N2', 'Mệnh lệnh ban xuống từ người đứng đầu', 'Người thống lĩnh ban hành mệnh lệnh cai quản bờ cõi.', '🗺️', v_ch17_id, 26, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('侵', 'シン', 'おか・す', 'oka', 'XÂM', 'Xâm lấn, xâm lược', 9, '亻 -> 帚 -> 又', '他国の 領空を 侵犯してはなりません。', 'Takoku no ryoukuu o shinpanshite wa narimasen.', 'Tuyệt đối không được xâm phạm không phận của quốc gia khác.', 'N2', 'Người cầm chổi xâm lấn bờ rào', 'Con người xua đuổi xâm lấn chiếm đoạt đất đai.', '⚔️', v_ch17_id, 27, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('銃', 'ジュウ', '', 'juu', 'SÚNG', 'Khẩu súng, vũ khí', 14, '金 -> 充', '警察官が 拳銃を 正しく 管理します。', 'Keisatsukan ga kenjuu o tadashiku kanrishimasu.', 'Chiến sĩ cảnh sát bảo quản quản lý súng ngắn đúng quy chuẩn.', 'N2', 'Kim loại nạp đầy đạn bắn', 'Ống kim loại chứa đầy thuốc súng phát hỏa.', '🔫', v_ch17_id, 28, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('核', 'カク', '', 'kaku', 'HẠCH', 'Hạt nhân, cốt lõi', 10, '木 -> 亥', '核兵器の 廃絶を 世界に 強く 訴えます。', 'Kakuheiki no haizetsu o sekai ni tsuyoku uttaemasu.', 'Kêu gọi thế giới kiên quyết xóa bỏ vũ khí hạt nhân.', 'N2', 'Cốt lõi bên trong hạt cây', 'Hạt mầm nhỏ bé nhưng chứa năng lượng hạt nhân cốt lõi.', '☢️', v_ch17_id, 29, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('護', 'ゴ', '', 'go', 'HỘ', 'Bảo hộ, bảo vệ, phòng hộ', 20, '言 -> 蒦', '環境を 保護して 美しい 地球を 未来に 残します。', 'Kankyou o hogoshite utsukushii chikyuu o mirai ni nokoshimasu.', 'Bảo vệ môi trường để trao gửi lại Trái Đất xanh tươi cho tương lai.', 'N2', 'Lời nói che chở chim non', 'Ngôn từ và sức lực bảo bọc che chở muôn loài.', '🛡️', v_ch17_id, 30, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('衛', 'エイ, エ', '', 'ei', 'VỆ', 'Vệ binh, phòng vệ, vệ sinh', 16, '行 -> 韋', '自衛隊が 国の 平和と 安全を 守ります。', 'Jieitai ga kuni no heiwa to anzen o mamorimasu.', 'Lực lượng Phòng vệ bảo vệ nền hòa bình và an ninh quốc gia.', 'N2', 'Đi tuần tra quanh vòng thành', 'Binh sĩ đi tuần bốn phía bảo vệ an nguy bờ cõi.', '🛡️', v_ch17_id, 31, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('盟', 'メイ', '', 'mei', 'MINH', 'Đồng minh, liên minh', 13, '日 -> 月 -> 皿', '両国は 同盟関係を 強化することで 合意しました。', 'Ryoukoku wa doumeikankei o kyoukashuru koto de gouishimashita.', 'Hai quốc gia đã thống nhất tăng cường quan hệ đồng minh chiến lược.', 'N2', 'Mặt trời mặt trăng soi đĩa thề', 'Nhật nguyệt soi chiếu lời thề son sắt giữa hai quốc gia.', '🤝', v_ch17_id, 32, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('隊', 'タイ', '', 'tai', 'ĐỘI', 'Quân đội, đội ngũ', 12, '阝 -> 㒸', '消防隊が 迅速に 消火活動を 行います。', 'Shouboutai ga jinsoku ni shoukakatsudou o okonaimasu.', 'Đội cứu hỏa nhanh chóng triển khai các biện pháp dập lửa.', 'N2', 'Đoàn quân sừng sững bên sườn đồi', 'Hàng ngũ quân sĩ đứng nghiêm trên sườn núi chiến lũy.', '🚒', v_ch17_id, 33, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('屈', 'クツ', 'かが・む', 'kutsu', 'KHUẤT', 'Bất khuất, gập người, khuất phục', 8, '尸 -> 出', '困難にも 決して 屈しない 強い 精神力。', 'Konnan ni mo kesshite kusshinai tsuyoi seishinryoku.', 'Tinh thần quả cảm kiên định tuyệt đối không khuất phục gian nguy.', 'N2', 'Người cúi mình bước ra', 'Người gập thân mình nhưng ý chí quật cường không gãy.', '✊', v_ch17_id, 34, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('憲', 'ケン', '', 'ken', 'HIẾN', 'Hiến pháp, khuôn phép', 16, '宀 -> 龶 -> 罒 -> 心', '日本国憲法は 平和主義を 基本原則としています。', 'Nihonkoku kenpou wa heiwashugi o kihongensoku to shiteimasu.', 'Hiến pháp Nhật Bản lấy chủ nghĩa hòa bình làm nguyên tắc cốt lõi.', 'N2', 'Dưới mái nhà tấm lòng gìn giữ khuôn phép', 'Pháp luật tối cao bảo hộ tâm trí người dân công chính.', '📜', v_ch17_id, 35, '/assets/kanji/n2/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('阪', 'ハン', 'さか', 'saka', 'PHẢN', 'Sườn dốc, địa danh Osaka', 7, '阝 -> 反', '大阪は 関西地方の 経済と 文化の 中心です。', 'Oosaka wa kansaichihou no keizai to bunka no chuushin desu.', 'Osaka là trung tâm kinh tế và văn hóa rực rỡ của vùng Kansai.', 'N2', 'Đồi dốc nghiêng thoai thoải', 'Sườn đồi uốn lượn ven sông tạo nên mảnh đất Osaka trù phú.', '🏯', v_ch18_id, 1, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('埼', 'サイ', 'さき', 'saki', 'KÌ', 'Mũi đất, địa danh Saitama', 11, '土 -> 奇', '埼玉県は 東京の 北に 隣接しています。', 'Saitamaken wa Toukyou no kita ni rinsetsushiteimasu.', 'Tỉnh Saitama nằm giáp ranh liền kề ngay phía bắc thủ đô Tokyo.', 'N2', 'Vùng đất có mũi nhô ra kỳ lạ', 'Mũi đất nhô ra sông nước kỳ vĩ trù mật.', '📍', v_ch18_id, 2, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('栃', '', 'とち', 'tochi', 'DẺ', 'Cây dẻ ngựa, tỉnh Tochigi', 9, '木 -> 厂 -> 万', '栃木県の 日光東照宮は 世界遺産です。', 'Tochigiken no Nikkou Toushouguu wa sekai-isan desu.', 'Đền Nikko Tosho-gu tại tỉnh Tochigi là di sản thế giới nổi tiếng.', 'N2', 'Cây dẻ ngàn năm dưới vách núi', 'Cây dẻ ngựa trổ hạt xanh tươi nơi thung lũng Tochigi.', '🌰', v_ch18_id, 3, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('茨', 'シ', 'いばら', 'ibara', 'TỲ', 'Cây gai, tỉnh Ibaraki', 9, '艹 -> 次', '茨城県の 偕楽園は 梅の 名所として 有名です。', 'Ibarakiken no Kairakuen wa ume no meisho to shite yuumei desu.', 'Vườn Kairakuen ở tỉnh Ibaraki nổi tiếng ngàn năm về hoa mơ.', 'N2', 'Cây gai nở hoa sắc thắm', 'Bụi gai xanh tốt sinh sôi trên đất Ibaraki.', '📍', v_ch18_id, 4, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('梨', 'リ', 'なし', 'nashi', 'LÊ', 'Quả lê, tỉnh Yamanashi', 11, '利 -> 木', '山梨県は 富士山と ぶどうの 産地です。', 'Yamanashiken wa Fujisan to budou no sanchi desu.', 'Tỉnh Yamanashi là quê hương của núi Phú Sĩ và những vườn nho ngọt.', 'N2', 'Cây gỗ đơm trái ngọt có lợi', 'Cây lê mọng nước trĩu quả thơm lừng dưới chân núi.', '🍐', v_ch18_id, 5, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('群', 'グン', 'む・れる, むれ', 'mure', 'QUẦN', 'Đàn, bầy, tỉnh Gunma', 13, '君 -> 羊', '群馬県には 草津温泉など 多くの 温泉が あります。', 'Gunmaken ni wa Kusatsu onsen nado ooku no onsen ga arimasu.', 'Tỉnh Gunma sở hữu rất nhiều suối nước nóng như Kusatsu Onsen.', 'N2', 'Đàn cừu nghe theo tiếng người chỉ huy', 'Đàn cừu tụ hội đông đúc trên cao nguyên thanh bình.', '🐑🐑', v_ch18_id, 6, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鹿', 'ロク', 'しか', 'shika', 'LỘC', 'Con hươu nai, Kagoshima', 11, '鹿', '奈良公園で 鹿に せんべいを あげました。', 'Narakouen de shika ni senbei o agemashita.', 'Tôi đã cho những chú hươu ăn bánh Senbei tại công viên Nara.', 'N2', 'Chú hươu đôi sừng thanh mảnh chạy nhảy', 'Con hươu sao đôi sừng phân nhánh thơ thẩn dưới rừng phong.', '🦌', v_ch18_id, 7, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('奈', 'ナ', '', 'na', 'NẠI', 'Tỉnh Nara, cây mận dại', 8, '大 -> 示', '奈良時代に 建立された 東大寺の 大仏。', 'Narajidai ni konryuusareta Toudaiji no daibutsu.', 'Tượng Đại Phật chùa Todai-ji được xây dựng từ thời kỳ Nara cổ kính.', 'N2', 'Bàn thờ lớn dưới trời mận nở', 'Bài vị linh thiêng trên đất thiền Nara thanh tịnh.', '⛩️', v_ch18_id, 8, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('媛', 'エン', '', 'en', 'VIỆN', 'Người đẹp, tỉnh Ehime', 12, '女 -> 爰', '愛媛県は みかんの 生産量で 日本一を 誇ります。', 'Ehimeken wa mikan no seisanryou de nihon-ichi o hokorimasu.', 'Tỉnh Ehime tự hào với sản lượng quýt ngọt đứng đầu toàn nước Nhật.', 'N2', 'Người thiếu nữ xinh đẹp duyên dáng', 'Thiếu nữ dung nhan mỹ lệ hiền hậu đất Ehime.', '🍊', v_ch18_id, 9, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('阜', 'フ', '', 'fu', 'PHỤ', 'Gò đất cao, tỉnh Gifu', 8, '阜', '岐阜県の 白川郷は 合掌造りの 集落で 有名です。', 'Gifuken no Shirakawagou wa gasshouzukuri no shuuraku de yuumei desu.', 'Làng Shirakawa-go tỉnh Gifu lừng danh với các ngôi nhà mái tranh Gassho.', 'N2', 'Bậc thang gò đất cao vững chãi', 'Gò đồi cao tầng bậc chắn gió bão.', '⛰️', v_ch18_id, 10, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('岡', 'コウ', 'おか', 'oka', 'CƯƠNG', 'Đồi đất, tỉnh Shizuoka/Fukuoka', 8, '冂 -> 𦉪', '静岡県から 雄大な 富士山の 姿を 望みます。', 'Shizuokaken kara yuudai na Fujisan no sugata o nozomimasu.', 'Từ tỉnh Shizuoka có thể phóng tầm mắt ngắm trọn đỉnh núi Phú Sĩ.', 'N2', 'Đồi cao hình vòng cung lộng gió', 'Ngọn đồi thoai thoải trải dài xanh ngút ngàn đồi chè.', '🗻', v_ch18_id, 11, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('崎', 'キ', 'さき', 'saki', 'KÌ', 'Mũi đất, tỉnh Miyazaki/Nagasaki', 11, '山 -> 奇', '長崎県は 異国情緒あふれる 港町です。', 'Nagasakiken wa ikokujoujou afureru minatomachi desu.', 'Tỉnh Nagasaki là thành phố cảng xinh đẹp đậm nét giao thoa văn hóa.', 'N2', 'Ngọn núi có mũi nhô ra biển', 'Mũi đất đồi núi vươn ra biển đón ngàn con sóng.', '🌊', v_ch18_id, 12, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('丘', 'キュウ', 'おか', 'oka', 'KHÂU', 'Ngọn đồi, gò đất', 5, '斤 -> 一', '美瑛の 丘陵地帯に 美しい 花畑が 広がっています。', 'Biei no kyuuryouchitai ni utsukushii hanabatake ga hirogatteimasu.', 'Trên những triền đồi thoai thoải ở Biei bạt ngàn cánh đồng hoa rực rỡ.', 'N2', 'Gò đất thoai thoải nhô cao', 'Gò đất thấp xinh đẹp cho cỏ hoa đua nở.', '🌾', v_ch18_id, 13, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('丁', 'チョウ, テイ', '', 'chou', 'ĐINH', 'Khu phố, ngã ba, người lớn', 2, '一 -> 亅', '銀座四丁目で 友達と 待ち合わせを します。', 'Ginza yonchoume de tomodachi to machiawase o shimasu.', 'Hẹn gặp bạn bè tại góc ngã tư Ginza 4-chome.', 'N2', 'Chiếc đinh đóng cọc định ranh phố', 'Cọc đinh phân chia từng khu phố ngăn nắp.', '📍', v_ch18_id, 14, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('塚', 'チョウ', 'つか', 'tsuka', 'TRỦNG', 'Gò đất cổ, gò mộ', 12, '土 -> 冢', '宝塚歌劇団の 華やかな 舞台を 観劇しました。', 'Takarazuka kagekidan no hanayaka na butai o kangekishimashita.', 'Thưởng thức sân khấu trình diễn lộng lẫy của đoàn kịch Takarazuka.', 'N2', 'Gò đất đắp cao lưu dấu tích cổ', 'Gò mộ cổ nghìn năm phủ cỏ lưu giữ ký ức người xưa.', '🏛️', v_ch18_id, 15, '/assets/kanji/n2/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
END $$;

-- 3. SEED KANJI CHAPTER VOCABULARY
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '配達', 'はいたつ', 'haitatsu', 'Giao hàng, chuyển phát tận nhà', 'Delivery', 1, NOW()),
        (v_ch_id, '届く', 'とどく', 'todoku', 'Được gửi đến, chuyển đến', 'Reach, arrive', 2, NOW()),
        (v_ch_id, '手渡す', 'てわたす', 'tewatasu', 'Trao tận tay', 'Hand over personally', 3, NOW()),
        (v_ch_id, '乗車券', 'じょうしゃけん', 'joushaken', 'Vé xe, vé tàu', 'Passenger ticket', 4, NOW()),
        (v_ch_id, '招待', 'しょうたい', 'shoutai', 'Chiêu đãi, mời dự tiệc', 'Invitation', 5, NOW()),
        (v_ch_id, '贈り物', 'おくりもの', 'okurimono', 'Quà tặng', 'Present, gift', 6, NOW()),
        (v_ch_id, '混雑', 'こんざつ', 'konzatsu', 'Hỗn tạp, đông đúc', 'Congestion, crowd', 7, NOW()),
        (v_ch_id, '契約', 'けいやく', 'keiyaku', 'Hợp đồng, đính ước', 'Contract, agreement', 8, NOW()),
        (v_ch_id, '引越', 'ひっこし', 'hikkoshi', 'Chuyển nhà, chuyển chỗ ở', 'Moving house', 9, NOW()),
        (v_ch_id, '雑誌', 'ざっし', 'zasshi', 'Tạp chí', 'Magazine', 10, NOW()),
        (v_ch_id, '清掃', 'せいそう', 'seisou', 'Dọn dẹp vệ sinh', 'Cleaning', 11, NOW()),
        (v_ch_id, '整頓', 'せいとん', 'seiton', 'Ngăn nắp, sắp xếp gọn gàng', 'Tidying up', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '駐輪場', 'ちゅうりんじょう', 'chuurinjou', 'Bãi đỗ xe đạp, xe máy', 'Bicycle parking', 1, NOW()),
        (v_ch_id, '港', 'みなと', 'minato', 'Cảng biển', 'Port, harbor', 2, NOW()),
        (v_ch_id, '到着', 'とうちゃく', 'touchaku', 'Đến nơi, cập bến', 'Arrival', 3, NOW()),
        (v_ch_id, '通過', 'つうか', 'tsuuka', 'Đi qua, thông qua, quá cảnh', 'Passing through', 4, NOW()),
        (v_ch_id, '停留所', 'ていりゅうじょ', 'teiryuujo', 'Trạm dừng xe buýt', 'Bus stop', 5, NOW()),
        (v_ch_id, '輸出', 'ゆしゅつ', 'yushutsu', 'Xuất khẩu', 'Export', 6, NOW()),
        (v_ch_id, '航空便', 'こうくうびん', 'koukuubin', 'Đường hàng không, thư bay', 'Airmail', 7, NOW()),
        (v_ch_id, '金融', 'きんゆう', 'kin-yuu', 'Tài chính, tiền tệ', 'Finance', 8, NOW()),
        (v_ch_id, '両替', 'りょうがえ', 'ryougae', 'Đổi tiền', 'Money exchange', 9, NOW()),
        (v_ch_id, '振込', 'ふりこみ', 'furikomi', 'Chuyển khoản ngân hàng', 'Bank transfer', 10, NOW()),
        (v_ch_id, '預金', 'よきん', 'yokin', 'Tiền gửi ngân hàng', 'Deposit', 11, NOW()),
        (v_ch_id, '通帳', 'つうちょう', 'tsuuchou', 'Sổ tài khoản, sổ tiết kiệm', 'Passbook', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '桜', 'さくら', 'sakura', 'Hoa anh đào', 'Cherry blossom', 1, NOW()),
        (v_ch_id, '香水', 'こうすい', 'kousui', 'Nước hoa', 'Perfume', 2, NOW()),
        (v_ch_id, '姿勢', 'しせい', 'shisei', 'Tư thế, phong thái', 'Posture, attitude', 3, NOW()),
        (v_ch_id, '柔軟', 'じゅうなん', 'juunan', 'Mềm dẻo, linh hoạt', 'Flexible, supple', 4, NOW()),
        (v_ch_id, '純粋', 'じゅんすい', 'junsui', 'Thuần túy, trong sáng', 'Pure, genuine', 5, NOW()),
        (v_ch_id, '劇場', 'げきじょう', 'gekijou', 'Nhà hát, rạp kịch', 'Theater', 6, NOW()),
        (v_ch_id, '舞踊', 'ぶよう', 'buyou', 'Điệu múa, vũ đạo', 'Dance, dancing', 7, NOW()),
        (v_ch_id, '展示', 'てんじ', 'tenji', 'Triển lãm, trưng bày', 'Exhibition, display', 8, NOW()),
        (v_ch_id, '城', 'しろ', 'shiro', 'Lâu đài, thành lũy', 'Castle', 9, NOW()),
        (v_ch_id, '繁栄', 'はんえい', 'han-ei', 'Phồn vinh, hưng thịnh', 'Prosperity', 10, NOW()),
        (v_ch_id, '宝蔵', 'ほうぞう', 'houzou', 'Kho tàng bảo vật', 'Treasure house', 11, NOW()),
        (v_ch_id, '武士', 'ぶし', 'bushi', 'Võ sĩ, Samurai', 'Samurai, warrior', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '診療', 'しんりょう', 'shinryou', 'Khám chữa bệnh, chẩn liệu', 'Medical examination', 1, NOW()),
        (v_ch_id, '寿命', 'じゅみょう', 'jumyou', 'Tuổi thọ, vòng đời', 'Lifespan', 2, NOW()),
        (v_ch_id, '異常', 'いじょう', 'ijou', 'Dị thường, bất thường', 'Abnormal', 3, NOW()),
        (v_ch_id, '筋肉', 'きんにく', 'kinniku', 'Cơ bắp', 'Muscle', 4, NOW()),
        (v_ch_id, '骨折', 'こっせつ', 'kossetsu', 'Gãy xương', 'Bone fracture', 5, NOW()),
        (v_ch_id, '関節', 'かんせつ', 'kansetsu', 'Khớp xương', 'Joint', 6, NOW()),
        (v_ch_id, '症状', 'しょうじょう', 'shoujou', 'Triệu chứng bệnh', 'Symptom', 7, NOW()),
        (v_ch_id, '血圧', 'けつあつ', 'ketsuatsu', 'Huyết áp', 'Blood pressure', 8, NOW()),
        (v_ch_id, '処置', 'しょち', 'shochi', 'Xử trí, sơ cứu', 'Medical treatment', 9, NOW()),
        (v_ch_id, '針', 'はり', 'hari', 'Kim châm, mũi kim tiêm', 'Needle, acupuncture', 10, NOW()),
        (v_ch_id, '完治', 'かんち', 'kanchi', 'Hồi phục hoàn toàn', 'Complete recovery', 11, NOW()),
        (v_ch_id, '内臓', 'ないぞう', 'naizou', 'Nội tạng', 'Internal organs', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '採用', 'さいよう', 'saiyou', 'Tuyển dụng, tuyển vào làm', 'Recruitment, hiring', 1, NOW()),
        (v_ch_id, '募集', 'ぼしゅう', 'boshuu', 'Chiêu mộ, tuyển mộ', 'Call for applicants', 2, NOW()),
        (v_ch_id, '履歴書', 'りれきしょ', 'rirekisho', 'Sơ yếu lý lịch, CV', 'Curriculum vitae', 3, NOW()),
        (v_ch_id, '適性', 'てきせい', 'tekisei', 'Độ phù hợp, năng khiếu', 'Aptitude', 4, NOW()),
        (v_ch_id, '企業', 'きぎょう', 'kigyou', 'Doanh nghiệp, công ty', 'Enterprise, company', 5, NOW()),
        (v_ch_id, '依頼', 'いらい', 'irai', 'Nhờ cậy, ủy thác', 'Request, commission', 6, NOW()),
        (v_ch_id, '比較', 'ひかく', 'hikaku', 'So sánh, đối chiếu', 'Comparison', 7, NOW()),
        (v_ch_id, '評価', 'ひょうか', 'hyouka', 'Đánh giá, nhận xét', 'Evaluation, rating', 8, NOW()),
        (v_ch_id, '改善', 'かいぜん', 'kaizen', 'Cải thiện, tiến bộ', 'Improvement', 9, NOW()),
        (v_ch_id, '勤務', 'きんむ', 'kinmu', 'Làm việc, công vụ', 'Duty, service, work', 10, NOW()),
        (v_ch_id, '競争', 'きょうそう', 'kyousou', 'Cạnh tranh, thi đua', 'Competition', 11, NOW()),
        (v_ch_id, '就職', 'しゅうしょく', 'shuushoku', 'Tìm được việc làm', 'Finding employment', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '経営', 'けいえい', 'keiei', 'Kinh doanh, quản trị', 'Management', 1, NOW()),
        (v_ch_id, '景気', 'けいき', 'keiki', 'Tình hình kinh tế', 'Economic climate', 2, NOW()),
        (v_ch_id, '資金', 'しきん', 'shikin', 'Nguồn vốn, kinh phí', 'Funds, capital', 3, NOW()),
        (v_ch_id, '利益', 'りえき', 'rieki', 'Lợi nhuận, tiền lời', 'Profit', 4, NOW()),
        (v_ch_id, '株式', 'かぶしき', 'kabushiki', 'Cổ phiếu, cổ phần', 'Stock, share', 5, NOW()),
        (v_ch_id, '国債', 'こくさい', 'kokusai', 'Trái phiếu chính phủ', 'Government bond', 6, NOW()),
        (v_ch_id, '販売', 'はんばい', 'hanbai', 'Bán hàng, phân phối', 'Sale, selling', 7, NOW()),
        (v_ch_id, '財政', 'ざいせい', 'zaisei', 'Tài chính công', 'Public finance', 8, NOW()),
        (v_ch_id, '拡大', 'かくだい', 'kakudai', 'Mở rộng quy mô', 'Expansion', 9, NOW()),
        (v_ch_id, '縮小', 'しゅくしょう', 'shukushou', 'Thu hẹp quy mô', 'Reduction', 10, NOW()),
        (v_ch_id, '戦略', 'せんりゃく', 'senryaku', 'Chiến lược kinh doanh', 'Strategy', 11, NOW()),
        (v_ch_id, '出版', 'しゅっぱん', 'shuppan', 'Xuất bản ấn phẩm', 'Publishing', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '強奪', 'ごうだつ', 'goudatsu', 'Cướp giật, đoạt lấy', 'Extortion, seizure', 1, NOW()),
        (v_ch_id, '恐怖', 'きょうふ', 'kyoufu', 'Khủng khiếp, sợ hãi', 'Terror, fear', 2, NOW()),
        (v_ch_id, '緊張', 'きんちょう', 'kinchou', 'Căng thẳng, hồi hộp', 'Nervousness, tension', 3, NOW()),
        (v_ch_id, '破滅', 'はめつ', 'hametsu', 'Hủy diệt, sụp đổ', 'Ruin, destruction', 4, NOW()),
        (v_ch_id, '離別', 'りべつ', 'ribetsu', 'Ly biệt, chia tay', 'Parting, separation', 5, NOW()),
        (v_ch_id, '印象', 'いんしょう', 'inshou', 'Ấn tượng', 'Impression', 6, NOW()),
        (v_ch_id, '年齢', 'ねんれい', 'nenrei', 'Tuổi tác', 'Age, years', 7, NOW()),
        (v_ch_id, '交際', 'こうさい', 'kousai', 'Giao tế, hẹn hò', 'Relationship, dating', 8, NOW()),
        (v_ch_id, '誘惑', 'ゆうわく', 'yuuwaku', 'Dụ dỗ, cám dỗ', 'Temptation', 9, NOW()),
        (v_ch_id, '勧誘', 'かんゆう', 'kan-yuu', 'Mời chào, thuyết phục tham gia', 'Solicitation', 10, NOW()),
        (v_ch_id, '運命', 'うんめい', 'unmei', 'Vận mệnh, số phận', 'Destiny, fate', 11, NOW()),
        (v_ch_id, '占い', 'うらない', 'uranai', 'Bói toán', 'Fortune-telling', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '周囲', 'しゅうい', 'shuui', 'Xung quanh, chu vi', 'Surroundings', 1, NOW()),
        (v_ch_id, '協力', 'きょうりょく', 'kyouryoku', 'Hợp lực, chung tay giúp đỡ', 'Cooperation', 2, NOW()),
        (v_ch_id, '相互', 'そうご', 'sougo', 'Tương hỗ, lẫn nhau', 'Mutual, reciprocal', 3, NOW()),
        (v_ch_id, '共有', 'きょうゆう', 'kyouyuu', 'Chia sẻ, sở hữu chung', 'Sharing', 4, NOW()),
        (v_ch_id, '援助', 'えんじょ', 'enjo', 'Viện trợ, hỗ trợ kinh phí', 'Aid, assistance', 5, NOW()),
        (v_ch_id, '信頼', 'しんらい', 'shinrai', 'Tin cậy, gửi gắm niềm tin', 'Trust, reliance', 6, NOW()),
        (v_ch_id, '抱負', 'ほうふ', 'houfu', 'Hoài bão, ước nguyện', 'Aspiration, ambition', 7, NOW()),
        (v_ch_id, '氏名', 'しめい', 'shimei', 'Họ và tên', 'Full name', 8, NOW()),
        (v_ch_id, '尊敬', 'そんけい', 'sonkei', 'Tôn kính, kính trọng', 'Respect, esteem', 9, NOW()),
        (v_ch_id, '申す', 'もうす', 'mousu', 'Tên là, nói là (khiêm nhường)', 'To say, be called', 10, NOW()),
        (v_ch_id, '参る', 'まいる', 'mairu', 'Đi, đến (khiêm nhường ngữ)', 'To go, to come', 11, NOW()),
        (v_ch_id, '御礼', 'おれい', 'orei', 'Lời cảm ơn, quà tạ ơn', 'Thanks, gratitude', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '海岸', 'かいがん', 'kaigan', 'Bờ biển', 'Coast, beach', 1, NOW()),
        (v_ch_id, '砂浜', 'すなはま', 'sunahama', 'Bãi cát ven biển', 'Sandy beach', 2, NOW()),
        (v_ch_id, '地層', 'ちそう', 'chisou', 'Địa tầng, tầng đất', 'Strata, geological layer', 3, NOW()),
        (v_ch_id, '温泉', 'おんせん', 'onsen', 'Suối nước nóng', 'Hot spring', 4, NOW()),
        (v_ch_id, '資源', 'しげん', 'shigen', 'Tài nguyên thiên nhiên', 'Resources', 5, NOW()),
        (v_ch_id, '宇宙', 'うちゅう', 'uchuu', 'Vũ trụ', 'Universe, cosmos', 6, NOW()),
        (v_ch_id, '環境', 'かんきょう', 'kankyou', 'Môi trường sinh thái', 'Environment', 7, NOW()),
        (v_ch_id, '北極', 'ほっきょく', 'hokkyoku', 'Bắc Cực', 'North Pole', 8, NOW()),
        (v_ch_id, '災害', 'さいがい', 'saigai', 'Thảm họa, thiên tai', 'Disaster', 9, NOW()),
        (v_ch_id, '地震', 'じしん', 'jishin', 'Động đất', 'Earthquake', 10, NOW()),
        (v_ch_id, '防災', 'ぼうさい', 'bousai', 'Phòng chống thiên tai', 'Disaster prevention', 11, NOW()),
        (v_ch_id, '影響', 'えいきょう', 'eikyou', 'Ảnh hưởng, tác động', 'Influence, effect', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '講義', 'こうぎ', 'kougi', 'Bài giảng, tiết học đại học', 'Lecture', 1, NOW()),
        (v_ch_id, '専門', 'せんもん', 'senmon', 'Chuyên môn, chuyên ngành', 'Specialty, major', 2, NOW()),
        (v_ch_id, '博士', 'はかせ', 'hakase', 'Tiến sĩ', 'Doctorate, Ph.D.', 3, NOW()),
        (v_ch_id, '政策', 'せいさく', 'seisaku', 'Chính sách công', 'Policy', 4, NOW()),
        (v_ch_id, '条約', 'じょうやく', 'jouyaku', 'Hiệp ước quốc tế', 'Treaty', 5, NOW()),
        (v_ch_id, '司法', 'しほう', 'shihou', 'Tư pháp', 'Judiciary', 6, NOW()),
        (v_ch_id, '警察署', 'けいさつしょ', 'keisatsusho', 'Đồn cảnh sát, sở cảnh sát', 'Police station', 7, NOW()),
        (v_ch_id, '逮捕', 'たいほ', 'taiho', 'Bắt giữ tội phạm', 'Arrest', 8, NOW()),
        (v_ch_id, '政党', 'せいとう', 'seitou', 'Chính đảng', 'Political party', 9, NOW()),
        (v_ch_id, '選挙', 'せんきょ', 'senkyo', 'Bầu cử', 'Election', 10, NOW()),
        (v_ch_id, '投票', 'とうひょう', 'touhyou', 'Bỏ phiếu biểu quyết', 'Voting, ballot', 11, NOW()),
        (v_ch_id, '軍事', 'ぐんじ', 'gunji', 'Quân sự', 'Military affairs', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '畳', 'たたみ', 'tatami', 'Chiếu cói truyền thống', 'Tatami mat', 1, NOW()),
        (v_ch_id, '床', 'ゆか', 'yuka', 'Sàn nhà', 'Floor', 2, NOW()),
        (v_ch_id, '玄関', 'げんかん', 'genkan', 'Lối vào nhà, tiền sảnh', 'Entrance hall', 3, NOW()),
        (v_ch_id, '廊下', 'ろうか', 'rouka', 'Hành lang', 'Corridor, hallway', 4, NOW()),
        (v_ch_id, '寮', 'りょう', 'ryou', 'Ký túc xá', 'Dormitory', 5, NOW()),
        (v_ch_id, '隣人', 'りんじん', 'rinjin', 'Hàng xóm láng giềng', 'Neighbor', 6, NOW()),
        (v_ch_id, '封筒', 'ふうとう', 'fuutou', 'Phong bì thư', 'Envelope', 7, NOW()),
        (v_ch_id, '宛先', 'あてさき', 'atesaki', 'Địa chỉ người nhận', 'Recipient address', 8, NOW()),
        (v_ch_id, '酢', 'す', 'su', 'Giấm ăn', 'Vinegar', 9, NOW()),
        (v_ch_id, '砂糖', 'さとう', 'satou', 'Đường ăn', 'Sugar', 10, NOW()),
        (v_ch_id, '渋滞', 'じゅうたい', 'juutai', 'Kẹt xe, tắc nghẽn giao thông', 'Traffic congestion', 11, NOW()),
        (v_ch_id, '街灯', 'がいとう', 'gaitou', 'Đèn đường chiếu sáng', 'Streetlight', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '携帯電話', 'けいたいでんわ', 'keitaidenwa', 'Điện thoại di động', 'Mobile phone', 1, NOW()),
        (v_ch_id, '拒否', 'きょひ', 'kyohi', 'Cự tuyệt, từ chối', 'Rejection, refusal', 2, NOW()),
        (v_ch_id, '印刷', 'いんさつ', 'insatsu', 'In ấn tài liệu', 'Printing', 3, NOW()),
        (v_ch_id, '頑固', 'がんこ', 'ganko', 'Ngoan cố, bảo thủ', 'Stubborn', 4, NOW()),
        (v_ch_id, '賢明', 'けんめい', 'kenmei', 'Hiền minh, sáng suốt', 'Wise, prudent', 5, NOW()),
        (v_ch_id, '鋭い', 'するどい', 'surudoi', 'Sắc bén, nhạy bén', 'Sharp, keen', 6, NOW()),
        (v_ch_id, '肌', 'はだ', 'hada', 'Làn da', 'Skin, complexion', 7, NOW()),
        (v_ch_id, '化粧', 'けしょう', 'keshou', 'Trang điểm', 'Makeup, cosmetics', 8, NOW()),
        (v_ch_id, '鏡', 'かがみ', 'kagami', 'Chiếc gương soi', 'Mirror', 9, NOW()),
        (v_ch_id, '革靴', 'かわぐつ', 'kawagutsu', 'Giày da', 'Leather shoes', 10, NOW()),
        (v_ch_id, '服装', 'ふくそう', 'fukusou', 'Trang phục, quần áo', 'Attire, clothing', 11, NOW()),
        (v_ch_id, '勇気', 'ゆうき', 'yuuki', 'Dũng khí, can đảm', 'Courage, bravery', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '睡眠', 'すいみん', 'suimin', 'Giấc ngủ, ngủ nghỉ', 'Sleep', 1, NOW()),
        (v_ch_id, '喫煙', 'きつえん', 'kitsuen', 'Hút thuốc lá', 'Smoking', 2, NOW()),
        (v_ch_id, '脂肪', 'しぼう', 'shibou', 'Chất béo, mỡ thừa', 'Fat, grease', 3, NOW()),
        (v_ch_id, '妊娠', 'にんしん', 'ninshin', 'Mang thai, thai nghén', 'Pregnancy', 4, NOW()),
        (v_ch_id, '双子', 'ふたご', 'futago', 'Sinh đôi, con sinh đôi', 'Twins', 5, NOW()),
        (v_ch_id, '脈拍', 'みゃくはく', 'myakuhaku', 'Nhịp đập mạch máu', 'Pulse', 6, NOW()),
        (v_ch_id, '看護師', 'かんごし', 'kangoshi', 'Y tá, điều dưỡng viên', 'Nurse', 7, NOW()),
        (v_ch_id, '患者', 'かんじゃ', 'kanja', 'Bệnh nhân', 'Patient', 8, NOW()),
        (v_ch_id, '視力', 'しりょく', 'shiryoku', 'Thị lực, tầm nhìn', 'Eyesight, vision', 9, NOW()),
        (v_ch_id, '殺菌', 'さっきん', 'sakkin', 'Sát trùng, diệt khuẩn', 'Sterilization', 10, NOW()),
        (v_ch_id, '洗剤', 'せんざい', 'senzai', 'Chất tẩy rửa, bột giặt', 'Detergent', 11, NOW()),
        (v_ch_id, '刺激', 'しげき', 'shigeki', 'Kích thích, cay rát', 'Stimulus, irritation', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '満開', 'まんかい', 'mankai', 'Nở rộ (hoa nở đầy cành)', 'Full bloom', 1, NOW()),
        (v_ch_id, '鮮やか', 'あざやか', 'azayaka', 'Rực rỡ, tươi thắm', 'Vivid, bright', 2, NOW()),
        (v_ch_id, '飼育', 'しいく', 'shiiku', 'Nuôi nấng, chăn nuôi', 'Breeding, rearing', 3, NOW()),
        (v_ch_id, '放牧', 'ほうぼく', 'houboku', 'Chăn thả gia súc ngoài đồng', 'Pasturing, grazing', 4, NOW()),
        (v_ch_id, '滝', 'たき', 'taki', 'Thác nước', 'Waterfall', 5, NOW()),
        (v_ch_id, '凍結', 'とうけつ', 'touketsu', 'Đóng băng, đông cứng', 'Freezing', 6, NOW()),
        (v_ch_id, '水滴', 'すいてき', 'suiteki', 'Giọt nước nhỏ', 'Water drop', 7, NOW()),
        (v_ch_id, '発掘', 'はっくつ', 'hakkutsu', 'Khai quật khảo cổ', 'Excavation', 8, NOW()),
        (v_ch_id, '石炭', 'せきたん', 'sekitan', 'Than đá', 'Coal', 9, NOW()),
        (v_ch_id, '鉱山', 'こうざん', 'kouzan', 'Mỏ quặng', 'Mine', 10, NOW()),
        (v_ch_id, '銅', 'どう', 'dou', 'Kim loại đồng', 'Copper', 11, NOW()),
        (v_ch_id, '洞窟', 'どうくつ', 'doukutsu', 'Hang động thiên nhiên', 'Cave, cavern', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '宴会', 'えんかい', 'enkai', 'Bữa tiệc, tiệc tùng liên hoan', 'Party, banquet', 1, NOW()),
        (v_ch_id, '開催', 'かいさい', 'kaisai', 'Tổ chức, đăng cai', 'Holding an event', 2, NOW()),
        (v_ch_id, '乾杯', 'かんぱい', 'kanpai', 'Cạn ly, chúc mừng', 'Cheers, toast', 3, NOW()),
        (v_ch_id, '徹夜', 'てつや', 'tetsuya', 'Thức trắng đêm', 'All-nighter', 4, NOW()),
        (v_ch_id, '同僚', 'どうりょう', 'douryou', 'Đồng nghiệp cùng cơ quan', 'Colleague, coworker', 5, NOW()),
        (v_ch_id, '先輩', 'せんぱい', 'senpai', 'Tiền bối, đàn anh đàn chị', 'Senior', 6, NOW()),
        (v_ch_id, '孫', 'まご', 'mago', 'Cháu nội, cháu ngoại', 'Grandchild', 7, NOW()),
        (v_ch_id, '祖父母', 'そふぼ', 'sofubo', 'Ông bà', 'Grandparents', 8, NOW()),
        (v_ch_id, '承知', 'しょうち', 'shouchi', 'Tôi đã rõ, đồng thuận', 'Consent, awareness', 9, NOW()),
        (v_ch_id, '伺う', 'うかがう', 'ukagau', 'Đến thăm, hỏi thăm (khiêm nhường)', 'To visit, to ask', 10, NOW()),
        (v_ch_id, '頂く', 'いただく', 'itadaku', 'Nhận, ăn uống (khiêm nhường)', 'To receive, to eat', 11, NOW()),
        (v_ch_id, '召し上がる', 'めしあがる', 'meshiagaru', 'Mời xơi, dùng bữa (kính ngữ)', 'To eat, to drink (hon.)', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '被害', 'ひがい', 'higai', 'Thiệt hại, tổn thất', 'Damage, harm', 1, NOW()),
        (v_ch_id, '崩壊', 'ほうかい', 'houkai', 'Sụp đổ, sạt lở tan hoang', 'Collapse, decay', 2, NOW()),
        (v_ch_id, '噴火', 'ふんか', 'funka', 'Núi lửa phun trào', 'Eruption', 3, NOW()),
        (v_ch_id, '津波', 'つなみ', 'tsunami', 'Sóng thần', 'Tsunami', 4, NOW()),
        (v_ch_id, '洪水', 'こうずい', 'kouzui', 'Lũ lụt dâng cao', 'Flood, inundation', 5, NOW()),
        (v_ch_id, '暴風雨', 'ぼうふうう', 'boufuuu', 'Mưa bão dữ dội', 'Storm, tempest', 6, NOW()),
        (v_ch_id, '乾燥', 'かんそう', 'kansou', 'Khô ráo, khô hạn', 'Dryness, aridity', 7, NOW()),
        (v_ch_id, '湿度', 'しつど', 'shitsudo', 'Độ ẩm không khí', 'Humidity', 8, NOW()),
        (v_ch_id, '清涼', 'せいりょう', 'seiryou', 'Mát mẻ, thanh lương', 'Cool, refreshing', 9, NOW()),
        (v_ch_id, '嵐', 'あらし', 'arashi', 'Cơn giông tố, bão lớn', 'Storm, tempest', 10, NOW()),
        (v_ch_id, '激しい', 'はげしい', 'hageshii', 'Dữ dội, khốc liệt', 'Violent, severe', 11, NOW()),
        (v_ch_id, '荒天', 'こうてん', 'kouten', 'Thời tiết xấu, giông bão', 'Stormy weather', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '俳句', 'はいく', 'haiku', 'Thơ Haiku truyền thống', 'Haiku poetry', 1, NOW()),
        (v_ch_id, '名簿', 'めいぼ', 'meibo', 'Danh sách họ tên, sổ danh bạ', 'Name list, roll', 2, NOW()),
        (v_ch_id, '彫像', 'ちょうぞう', 'chouzou', 'Tượng điêu khắc', 'Sculpted statue', 3, NOW()),
        (v_ch_id, '遺跡', 'いせき', 'iseki', 'Di tích lịch sử cổ xưa', 'Historical ruins', 4, NOW()),
        (v_ch_id, '刑罰', 'けいばつ', 'keibatsu', 'Hình phạt pháp luật', 'Punishment, penalty', 5, NOW()),
        (v_ch_id, '捜査', 'そうさ', 'sousa', 'Điều tra vụ án', 'Criminal investigation', 6, NOW()),
        (v_ch_id, '裁判', 'さいばん', 'saiban', 'Xét xử, phiên tòa', 'Trial, judgement', 7, NOW()),
        (v_ch_id, '秩序', 'ちつじょ', 'chitsujo', 'Trật tự kỷ cương', 'Order, discipline', 8, NOW()),
        (v_ch_id, '内閣', 'ないかく', 'naikaku', 'Nội các chính phủ', 'Cabinet of government', 9, NOW()),
        (v_ch_id, '同盟', 'どうめい', 'doumei', 'Liên minh, đồng minh', 'Alliance, union', 10, NOW()),
        (v_ch_id, '防衛', 'ぼうえい', 'bouei', 'Phòng vệ quốc gia', 'Defense, protection', 11, NOW()),
        (v_ch_id, '憲法', 'けんぽう', 'kenpou', 'Hiến pháp quốc gia', 'Constitution', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '大阪府', 'おおさかふ', 'oosakafu', 'Phủ Osaka', 'Osaka Prefecture', 1, NOW()),
        (v_ch_id, '埼玉県', 'さいたまけん', 'saitamaken', 'Tỉnh Saitama', 'Saitama Prefecture', 2, NOW()),
        (v_ch_id, '栃木県', 'とちぎけん', 'tochigiken', 'Tỉnh Tochigi', 'Tochigi Prefecture', 3, NOW()),
        (v_ch_id, '茨城県', 'いばらきけん', 'ibarakiken', 'Tỉnh Ibaraki', 'Ibaraki Prefecture', 4, NOW()),
        (v_ch_id, '群馬県', 'ぐんまけん', 'gunmaken', 'Tỉnh Gunma', 'Gunma Prefecture', 5, NOW()),
        (v_ch_id, '鹿児島県', 'かごしまけん', 'kagoshimaken', 'Tỉnh Kagoshima', 'Kagoshima Prefecture', 6, NOW()),
        (v_ch_id, '奈良県', 'ならけん', 'naraken', 'Tỉnh Nara', 'Nara Prefecture', 7, NOW()),
        (v_ch_id, '愛媛県', 'えひめけん', 'ehimeken', 'Tỉnh Ehime', 'Ehime Prefecture', 8, NOW()),
        (v_ch_id, '岐阜県', 'ぎふけん', 'gifuken', 'Tỉnh Gifu', 'Gifu Prefecture', 9, NOW()),
        (v_ch_id, '静岡県', 'しずおかけん', 'shizuokaken', 'Tỉnh Shizuoka', 'Shizuoka Prefecture', 10, NOW()),
        (v_ch_id, '宮崎県', 'みやざきけん', 'miyazakiken', 'Tỉnh Miyazaki', 'Miyazaki Prefecture', 11, NOW()),
        (v_ch_id, '丘陵', 'きゅうりょう', 'kyuuryou', 'Đồi núi thoai thoải', 'Hill, rolling hills', 12, NOW());
    END IF;
END $$;

-- 4. SEED KANJI EXERCISES (READING & WRITING)
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '荷物を 各家庭に 配達します。', '配', 'くばる', '["くばる", "くばるす", "おくばる", "くばた"]', 'Chữ 配 (PHỐI) trong câu đọc là くばる. Nghĩa: Phân phát, bố trí.', 1, NOW()),
        (v_ch_id, 'READING', '手紙が 無事に 届きました。', '届', 'とどく', '["とどく", "とどくす", "おとどく", "とどくる"]', 'Chữ 届 (GIỚI) trong câu đọc là とどく. Nghĩa: Đến nơi, trình báo.', 2, NOW()),
        (v_ch_id, 'READING', '書類を 手渡しで 渡しました。', '渡', 'わたる', '["わたる", "わたるす", "おわたる", "わたた"]', 'Chữ 渡 (ĐỘ) trong câu đọc là わたる. Nghĩa: Vượt qua, trao tay.', 3, NOW()),
        (v_ch_id, 'READING', '電車の 乗車券を 買います。', '券', 'ケン', '["ケン", "ケンす", "おケン", "ケンる"]', 'Chữ 券 (KHOÁN) trong câu đọc là ケン. Nghĩa: Vé, phiếu chứng từ.', 4, NOW()),
        (v_ch_id, 'READING', '友人を 結婚式に 招待します。', '招', 'まねく', '["まねく", "まねくす", "おまねく", "まねくる"]', 'Chữ 招 (CHIÊU) trong câu đọc là まねく. Nghĩa: Mời gọi, chiêu đãi.', 5, NOW()),
        (v_ch_id, 'READING', 'お世話になった 方に 贈り物を 贈ります。', '贈', 'おくる', '["おくる", "おくるす", "くる", "おくた"]', 'Chữ 贈 (TẶNG) trong câu đọc là おくる. Nghĩa: Tặng thưởng, biếu quà.', 6, NOW()),
        (v_ch_id, 'READING', '消費税を 含む 金額を 表示します。', '含', 'ふくむ', '["ふくむ", "ふくむす", "おふくむ", "ふくむる"]', 'Chữ 含 (HÀM) trong câu đọc là ふくむ. Nghĩa: Chứa đựng, bao hàm.', 7, NOW()),
        (v_ch_id, 'READING', '電車が 大変 混雑しています。', '混', 'まじる', '["まじる", "まじるす", "おまじる", "まじた"]', 'Chữ 混 (HỖN) trong câu đọc là まじる. Nghĩa: Trộn lẫn, đông đúc.', 8, NOW()),
        (v_ch_id, 'READING', '砂糖が お湯に 溶けました。', '溶', 'とける', '["とける", "とけるす", "おとける", "とけた"]', 'Chữ 溶 (DUNG) trong câu đọc là とける. Nghĩa: Tan ra, hòa tan.', 9, NOW()),
        (v_ch_id, 'READING', '温かい みそ汁を 飲みます。', '汁', 'しる', '["しる", "しるす", "おしる", "した"]', 'Chữ 汁 (TRẤP) trong câu đọc là しる. Nghĩa: Nước súp, nước ép.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はいたつ】 の 手続きを 行います。', 'はいたつ', '配達', '["配達", "配人", "達配", "新達"]', 'Từ 【はいたつ】 có chữ Hán tương ứng là 配達. Nghĩa: Giao hàng, chuyển phát tận nhà.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【とどく】 の 手続きを 行います。', 'とどく', '届く', '["届く", "届人", "く届", "新く"]', 'Từ 【とどく】 có chữ Hán tương ứng là 届く. Nghĩa: Được gửi đến, chuyển đến.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【てわたす】 の 手続きを 行います。', 'てわたす', '手渡す', '["手渡す", "手人", "渡手", "新渡す"]', 'Từ 【てわたす】 có chữ Hán tương ứng là 手渡す. Nghĩa: Trao tận tay.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じょうしゃけん】 の 手続きを 行います。', 'じょうしゃけん', '乗車券', '["乗車券", "乗人", "車乗", "新車券"]', 'Từ 【じょうしゃけん】 có chữ Hán tương ứng là 乗車券. Nghĩa: Vé xe, vé tàu.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しょうたい】 の 手続きを 行います。', 'しょうたい', '招待', '["招待", "招人", "待招", "新待"]', 'Từ 【しょうたい】 có chữ Hán tương ứng là 招待. Nghĩa: Chiêu đãi, mời dự tiệc.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【おくりもの】 の 手続きを 行います。', 'おくりもの', '贈り物', '["贈り物", "贈人", "り贈", "新り物"]', 'Từ 【おくりもの】 có chữ Hán tương ứng là 贈り物. Nghĩa: Quà tặng.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こんざつ】 の 手続きを 行います。', 'こんざつ', '混雑', '["混雑", "混人", "雑混", "新雑"]', 'Từ 【こんざつ】 có chữ Hán tương ứng là 混雑. Nghĩa: Hỗn tạp, đông đúc.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいやく】 の 手続きを 行います。', 'けいやく', '契約', '["契約", "契人", "約契", "新約"]', 'Từ 【けいやく】 có chữ Hán tương ứng là 契約. Nghĩa: Hợp đồng, đính ước.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ひっこし】 の 手続きを 行います。', 'ひっこし', '引越', '["引越", "引人", "越引", "新越"]', 'Từ 【ひっこし】 có chữ Hán tương ứng là 引越. Nghĩa: Chuyển nhà, chuyển chỗ ở.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ざっし】 の 手続きを 行います。', 'ざっし', '雑誌', '["雑誌", "雑人", "誌雑", "新誌"]', 'Từ 【ざっし】 có chữ Hán tương ứng là 雑誌. Nghĩa: Tạp chí.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せいそう】 の 手続きを 行います。', 'せいそう', '清掃', '["清掃", "清人", "掃清", "新掃"]', 'Từ 【せいそう】 có chữ Hán tương ứng là 清掃. Nghĩa: Dọn dẹp vệ sinh.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せいとん】 の 手続きを 行います。', 'せいとん', '整頓', '["整頓", "整人", "頓整", "新頓"]', 'Từ 【せいとん】 có chữ Hán tương ứng là 整頓. Nghĩa: Ngăn nắp, sắp xếp gọn gàng.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '駅前の 駐輪場に 自転車を とめます。', '駐', 'チュウ', '["チュウ", "チュウす", "おチュウ", "チュウる"]', 'Chữ 駐 (TRÚ) trong câu đọc là チュウ. Nghĩa: Đỗ xe, dừng chân.', 1, NOW()),
        (v_ch_id, 'READING', '三輪車に 乗って 遊ぶ 子供。', '輪', 'わ', '["わ", "わす", "おわ", "わる"]', 'Chữ 輪 (LUÂN) trong câu đọc là わ. Nghĩa: Bánh xe, vòng tròn.', 2, NOW()),
        (v_ch_id, 'READING', '貿易船が 港に 停泊しています。', '港', 'みなと', '["みなと", "みなとす", "おみなと", "みなとる"]', 'Chữ 港 (CẢNG) trong câu đọc là みなと. Nghĩa: Bến cảng, cảng biển.', 3, NOW()),
        (v_ch_id, 'READING', '予定の時間に 無事 到着しました。', '到', 'トウ', '["トウ", "トウす", "おトウ", "トウる"]', 'Chữ 到 (ĐÁO) trong câu đọc là トウ. Nghĩa: Đến nơi, chu đáo.', 4, NOW()),
        (v_ch_id, 'READING', '学校へ 行く 途中で 友達に 会いました。', '途', 'ト', '["ト", "トす", "おト", "トる"]', 'Chữ 途 (ĐỒ) trong câu đọc là ト. Nghĩa: Giữa đường, hành trình.', 5, NOW()),
        (v_ch_id, 'READING', '楽しい 週末を 家族と 過ごしました。', '過', 'すぎる', '["すぎる", "すぎるす", "おすぎる", "すぎた"]', 'Chữ 過 (QUÁ) trong câu đọc là すぎる. Nghĩa: Đi qua, quá mức, lỗi lầm.', 6, NOW()),
        (v_ch_id, 'READING', '切符を 改札機に 通します。', '符', 'フ', '["フ", "フす", "おフ", "フる"]', 'Chữ 符 (PHÙ) trong câu đọc là フ. Nghĩa: Vé, ký hiệu, phù hiệu.', 7, NOW()),
        (v_ch_id, 'READING', 'バスが 停留所に 止まりました。', '停', 'とまる', '["とまる", "とまるす", "おとまる", "とまた"]', 'Chữ 停 (ĐÌNH) trong câu đọc là とまる. Nghĩa: Dừng lại, đình chỉ.', 8, NOW()),
        (v_ch_id, 'READING', '道路の 交通標識を よく 見てください。', '標', 'ヒョウ', '["ヒョウ", "ヒョウす", "おヒョウ", "ヒョウる"]', 'Chữ 標 (TIÊU) trong câu đọc là ヒョウ. Nghĩa: Biển báo, mục tiêu.', 9, NOW()),
        (v_ch_id, 'READING', 'スマートフォンは 今や 普及しています。', '普', 'フ', '["フ", "フす", "おフ", "フる"]', 'Chữ 普 (PHỔ) trong câu đọc là フ. Nghĩa: Phổ biến, rộng khắp.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ちゅうりんじょう】 の 手続きを 行います。', 'ちゅうりんじょう', '駐輪場', '["駐輪場", "駐人", "輪駐", "新輪場"]', 'Từ 【ちゅうりんじょう】 có chữ Hán tương ứng là 駐輪場. Nghĩa: Bãi đỗ xe đạp, xe máy.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【みなと】 の 手続きを 行います。', 'みなと', '港', '["港", "港所", "港的", "大港"]', 'Từ 【みなと】 có chữ Hán tương ứng là 港. Nghĩa: Cảng biển.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【とうちゃく】 の 手続きを 行います。', 'とうちゃく', '到着', '["到着", "到人", "着到", "新着"]', 'Từ 【とうちゃく】 có chữ Hán tương ứng là 到着. Nghĩa: Đến nơi, cập bến.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【つうか】 の 手続きを 行います。', 'つうか', '通過', '["通過", "通人", "過通", "新過"]', 'Từ 【つうか】 có chữ Hán tương ứng là 通過. Nghĩa: Đi qua, thông qua, quá cảnh.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ていりゅうじょ】 の 手続きを 行います。', 'ていりゅうじょ', '停留所', '["停留所", "停人", "留停", "新留所"]', 'Từ 【ていりゅうじょ】 có chữ Hán tương ứng là 停留所. Nghĩa: Trạm dừng xe buýt.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ゆしゅつ】 の 手続きを 行います。', 'ゆしゅつ', '輸出', '["輸出", "輸人", "出輸", "新出"]', 'Từ 【ゆしゅつ】 có chữ Hán tương ứng là 輸出. Nghĩa: Xuất khẩu.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうくうびん】 の 手続きを 行います。', 'こうくうびん', '航空便', '["航空便", "航人", "空航", "新空便"]', 'Từ 【こうくうびん】 có chữ Hán tương ứng là 航空便. Nghĩa: Đường hàng không, thư bay.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きんゆう】 の 手続きを 行います。', 'きんゆう', '金融', '["金融", "金人", "融金", "新融"]', 'Từ 【きんゆう】 có chữ Hán tương ứng là 金融. Nghĩa: Tài chính, tiền tệ.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りょうがえ】 の 手続きを 行います。', 'りょうがえ', '両替', '["両替", "両人", "替両", "新替"]', 'Từ 【りょうがえ】 có chữ Hán tương ứng là 両替. Nghĩa: Đổi tiền.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ふりこみ】 の 手続きを 行います。', 'ふりこみ', '振込', '["振込", "振人", "込振", "新込"]', 'Từ 【ふりこみ】 có chữ Hán tương ứng là 振込. Nghĩa: Chuyển khoản ngân hàng.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【よきん】 の 手続きを 行います。', 'よきん', '預金', '["預金", "預人", "金預", "新金"]', 'Từ 【よきん】 có chữ Hán tương ứng là 預金. Nghĩa: Tiền gửi ngân hàng.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【つうちょう】 の 手続きを 行います。', 'つうちょう', '通帳', '["通帳", "通人", "帳通", "新帳"]', 'Từ 【つうちょう】 có chữ Hán tương ứng là 通帳. Nghĩa: Sổ tài khoản, sổ tiết kiệm.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '春になると 桜が 満開に なります。', '桜', 'さくら', '["さくら", "さくらす", "おさくら", "さくらる"]', 'Chữ 桜 (ANH) trong câu đọc là さくら. Nghĩa: Hoa anh đào.', 1, NOW()),
        (v_ch_id, 'READING', '梅雨の 季節に 梅酒を つくります。', '梅', 'うめ', '["うめ", "うめす", "おうめ", "うめる"]', 'Chữ 梅 (MAI) trong câu đọc là うめ. Nghĩa: Cây mai, quả mơ.', 2, NOW()),
        (v_ch_id, 'READING', '正月に 門松を 飾って 祝います。', '松', 'まつ', '["まつ", "まつす", "おまつ", "まつる"]', 'Chữ 松 (TÙNG) trong câu đọc là まつ. Nghĩa: Cây thông kiên cường.', 3, NOW()),
        (v_ch_id, 'READING', '日本の 山には 杉の 木が 多く 生えています。', '杉', 'すぎ', '["すぎ", "すぎす", "おすぎ", "すぎる"]', 'Chữ 杉 (SAM) trong câu đọc là すぎ. Nghĩa: Cây tuyết tùng sam.', 4, NOW()),
        (v_ch_id, 'READING', '美術館で 素晴らしい 絵画を 鑑賞しました。', '美', 'うつくしい', '["うつくしい", "うつくしいす", "おうつくしい", "うつくしいる"]', 'Chữ 美 (MỸ) trong câu đọc là うつくしい. Nghĩa: Xinh đẹp, hoàn mỹ.', 5, NOW()),
        (v_ch_id, 'READING', '部屋に 甘い 香りが 漂っています。', '香', 'かおる', '["かおる", "かおるす", "おかおる", "かおた"]', 'Chữ 香 (HƯƠNG) trong câu đọc là かおる. Nghĩa: Hương thơm quyến rũ.', 6, NOW()),
        (v_ch_id, 'READING', '玄関で 靴を 脱いで 上がります。', '脱', 'ぬぐ', '["ぬぐ", "ぬぐす", "おぬぐ", "ぬぐる"]', 'Chữ 脱 (THOÁT) trong câu đọc là ぬぐ. Nghĩa: Cởi bỏ, thoát khỏi.', 7, NOW()),
        (v_ch_id, 'READING', '壁に お気に入りの 絵を 掛けました。', '掛', 'かける', '["かける", "かけるす", "おかける", "かけた"]', 'Chữ 掛 (QUẢI) trong câu đọc là かける. Nghĩa: Treo lên, bắt đầu, gắn.', 8, NOW()),
        (v_ch_id, 'READING', '彼女の 浴衣姿は とても 素敵です。', '姿', 'すがた', '["すがた", "すがたす", "おすがた", "すがたる"]', 'Chữ 姿 (TƯ) trong câu đọc là すがた. Nghĩa: Tư thế, dáng dấp.', 9, NOW()),
        (v_ch_id, 'READING', 'チームは 勢いに 乗って 勝利を 収めました。', '勢', 'いきおい', '["いきおい", "いきおいす", "おいきおい", "いきおいる"]', 'Chữ 勢 (THẾ) trong câu đọc là いきおい. Nghĩa: Khí thế, thế lực, sức mạnh.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さくら】 の 手続きを 行います。', 'さくら', '桜', '["桜", "桜所", "桜的", "大桜"]', 'Từ 【さくら】 có chữ Hán tương ứng là 桜. Nghĩa: Hoa anh đào.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうすい】 の 手続きを 行います。', 'こうすい', '香水', '["香水", "香人", "水香", "新水"]', 'Từ 【こうすい】 có chữ Hán tương ứng là 香水. Nghĩa: Nước hoa.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しせい】 の 手続きを 行います。', 'しせい', '姿勢', '["姿勢", "姿人", "勢姿", "新勢"]', 'Từ 【しせい】 có chữ Hán tương ứng là 姿勢. Nghĩa: Tư thế, phong thái.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じゅうなん】 の 手続きを 行います。', 'じゅうなん', '柔軟', '["柔軟", "柔人", "軟柔", "新軟"]', 'Từ 【じゅうなん】 có chữ Hán tương ứng là 柔軟. Nghĩa: Mềm dẻo, linh hoạt.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じゅんすい】 の 手続きを 行います。', 'じゅんすい', '純粋', '["純粋", "純人", "粋純", "新粋"]', 'Từ 【じゅんすい】 có chữ Hán tương ứng là 純粋. Nghĩa: Thuần túy, trong sáng.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【げきじょう】 の 手続きを 行います。', 'げきじょう', '劇場', '["劇場", "劇人", "場劇", "新場"]', 'Từ 【げきじょう】 có chữ Hán tương ứng là 劇場. Nghĩa: Nhà hát, rạp kịch.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぶよう】 の 手続きを 行います。', 'ぶよう', '舞踊', '["舞踊", "舞人", "踊舞", "新踊"]', 'Từ 【ぶよう】 có chữ Hán tương ứng là 舞踊. Nghĩa: Điệu múa, vũ đạo.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【てんじ】 の 手続きを 行います。', 'てんじ', '展示', '["展示", "展人", "示展", "新示"]', 'Từ 【てんじ】 có chữ Hán tương ứng là 展示. Nghĩa: Triển lãm, trưng bày.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しろ】 の 手続きを 行います。', 'しろ', '城', '["城", "城所", "城的", "大城"]', 'Từ 【しろ】 có chữ Hán tương ứng là 城. Nghĩa: Lâu đài, thành lũy.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はんえい】 の 手続きを 行います。', 'はんえい', '繁栄', '["繁栄", "繁人", "栄繁", "新栄"]', 'Từ 【はんえい】 có chữ Hán tương ứng là 繁栄. Nghĩa: Phồn vinh, hưng thịnh.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ほうぞう】 の 手続きを 行います。', 'ほうぞう', '宝蔵', '["宝蔵", "宝人", "蔵宝", "新蔵"]', 'Từ 【ほうぞう】 có chữ Hán tương ứng là 宝蔵. Nghĩa: Kho tàng bảo vật.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぶし】 の 手続きを 行います。', 'ぶし', '武士', '["武士", "武人", "士武", "新士"]', 'Từ 【ぶし】 có chữ Hán tương ứng là 武士. Nghĩa: Võ sĩ, Samurai.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '健康な 体づくりの ために 運動します。', '健', 'すこやか', '["すこやか", "すこやかす", "おすこやか", "すこやかる"]', 'Chữ 健 (KIỆN) trong câu đọc là すこやか. Nghĩa: Khỏe mạnh, tráng kiện.', 1, NOW()),
        (v_ch_id, 'READING', '健康診断を 定期的に 受けます。', '康', 'コウ', '["コウ", "コウす", "おコウ", "コウる"]', 'Chữ 康 (KHANG) trong câu đọc là コウ. Nghĩa: Bình an, an khang.', 2, NOW()),
        (v_ch_id, 'READING', '医師に 体調を 診察してもらいます。', '診', 'みる', '["みる", "みるす", "おみる", "みた"]', 'Chữ 診 (CHẨN) trong câu đọc là みる. Nghĩa: Chẩn đoán, khám bệnh.', 3, NOW()),
        (v_ch_id, 'READING', '病院で 専門的な 治療を 受けます。', '療', 'リョウ', '["リョウ", "リョウす", "おリョウ", "リョウる"]', 'Chữ 療 (LIỆU) trong câu đọc là リョウ. Nghĩa: Điều trị, chữa trị.', 4, NOW()),
        (v_ch_id, 'READING', 'かけがえのない 命を 大切にします。', '命', 'いのち', '["いのち", "いのちす", "おいのち", "いのちる"]', 'Chữ 命 (MỆNH) trong câu đọc là いのち. Nghĩa: Sinh mệnh, tính mạng.', 5, NOW()),
        (v_ch_id, 'READING', '体に 異常を 感じたら 休みましょう。', '異', 'ことなる', '["ことなる", "ことなるす", "おことなる", "ことなた"]', 'Chữ 異 (DỊ) trong câu đọc là ことなる. Nghĩa: Khác biệt, dị thường.', 6, NOW()),
        (v_ch_id, 'READING', '背筋を 伸ばして 姿勢を 正します。', '背', 'せ', '["せ", "せす", "おせ", "せる"]', 'Chữ 背 (BỐI) trong câu đọc là せ. Nghĩa: Lưng, chiều cao, phản bội.', 7, NOW()),
        (v_ch_id, 'READING', 'お腹が 空いて 力が 出ません。', '腹', 'はら', '["はら", "はらす", "おはら", "はらる"]', 'Chữ 腹 (PHÚC) trong câu đọc là はら. Nghĩa: Bụng, lòng dạ.', 8, NOW()),
        (v_ch_id, 'READING', '長時間の デスクワークで 肩が こります。', '肩', 'かた', '["かた", "かたす", "おかた", "かたる"]', 'Chữ 肩 (KIÊN) trong câu đọc là かた. Nghĩa: Bờ vai, bờ vai gánh vác.', 9, NOW()),
        (v_ch_id, 'READING', '料理の 腕前を 友達に 披露します。', '腕', 'うで', '["うで", "うです", "おうで", "うでる"]', 'Chữ 腕 (OÃN) trong câu đọc là うで. Nghĩa: Cánh tay, tài nghệ.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しんりょう】 の 手続きを 行います。', 'しんりょう', '診療', '["診療", "診人", "療診", "新療"]', 'Từ 【しんりょう】 có chữ Hán tương ứng là 診療. Nghĩa: Khám chữa bệnh, chẩn liệu.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じゅみょう】 の 手続きを 行います。', 'じゅみょう', '寿命', '["寿命", "寿人", "命寿", "新命"]', 'Từ 【じゅみょう】 có chữ Hán tương ứng là 寿命. Nghĩa: Tuổi thọ, vòng đời.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いじょう】 の 手続きを 行います。', 'いじょう', '異常', '["異常", "異人", "常異", "新常"]', 'Từ 【いじょう】 có chữ Hán tương ứng là 異常. Nghĩa: Dị thường, bất thường.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きんにく】 の 手続きを 行います。', 'きんにく', '筋肉', '["筋肉", "筋人", "肉筋", "新肉"]', 'Từ 【きんにく】 có chữ Hán tương ứng là 筋肉. Nghĩa: Cơ bắp.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こっせつ】 の 手続きを 行います。', 'こっせつ', '骨折', '["骨折", "骨人", "折骨", "新折"]', 'Từ 【こっせつ】 có chữ Hán tương ứng là 骨折. Nghĩa: Gãy xương.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんせつ】 の 手続きを 行います。', 'かんせつ', '関節', '["関節", "関人", "節関", "新節"]', 'Từ 【かんせつ】 có chữ Hán tương ứng là 関節. Nghĩa: Khớp xương.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しょうじょう】 の 手続きを 行います。', 'しょうじょう', '症状', '["症状", "症人", "状症", "新状"]', 'Từ 【しょうじょう】 có chữ Hán tương ứng là 症状. Nghĩa: Triệu chứng bệnh.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けつあつ】 の 手続きを 行います。', 'けつあつ', '血圧', '["血圧", "血人", "圧血", "新圧"]', 'Từ 【けつあつ】 có chữ Hán tương ứng là 血圧. Nghĩa: Huyết áp.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しょち】 の 手続きを 行います。', 'しょち', '処置', '["処置", "処人", "置処", "新置"]', 'Từ 【しょち】 có chữ Hán tương ứng là 処置. Nghĩa: Xử trí, sơ cứu.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はり】 の 手続きを 行います。', 'はり', '針', '["針", "針所", "針的", "大針"]', 'Từ 【はり】 có chữ Hán tương ứng là 針. Nghĩa: Kim châm, mũi kim tiêm.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんち】 の 手続きを 行います。', 'かんち', '完治', '["完治", "完人", "治完", "新治"]', 'Từ 【かんち】 có chữ Hán tương ứng là 完治. Nghĩa: Hồi phục hoàn toàn.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ないぞう】 の 手続きを 行います。', 'ないぞう', '内臓', '["内臓", "内人", "臓内", "新臓"]', 'Từ 【ないぞう】 có chữ Hán tương ứng là 内臓. Nghĩa: Nội tạng.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '年末は 仕事が 非常に 忙しいです。', '忙', 'いそがしい', '["いそがしい", "いそがしいす", "おいそがしい", "いそがしいる"]', 'Chữ 忙 (MANG) trong câu đọc là いそがしい. Nghĩa: Bận rộn.', 1, NOW()),
        (v_ch_id, 'READING', '長時間の 会議で 精神的に 疲れました。', '疲', 'つかれる', '["つかれる", "つかれるす", "おつかれる", "つかれた"]', 'Chữ 疲 (BÌ) trong câu đọc là つかれる. Nghĩa: Mệt mỏi, kiệt sức.', 2, NOW()),
        (v_ch_id, 'READING', '新しい 職場環境にも だいぶ 慣れました。', '慣', 'なれる', '["なれる", "なれるす", "おなれる", "なれた"]', 'Chữ 慣 (QUÁN) trong câu đọc là なれる. Nghĩa: Quen thuộc, tập quán.', 3, NOW()),
        (v_ch_id, 'READING', '二つの 企業が 市場シェアを 競い合います。', '競', 'きそう', '["きそう", "きそうす", "おきそう", "きそうる"]', 'Chữ 競 (CẠNH) trong câu đọc là きそう. Nghĩa: Cạnh tranh, ganh đua.', 4, NOW()),
        (v_ch_id, 'READING', '子供を 立派な 大人へと 育て養います。', '養', 'やしなう', '["やしなう", "やしなうす", "おやしなう", "やしなうる"]', 'Chữ 養 (DƯỠNG) trong câu đọc là やしなう. Nghĩa: Nuôi dưỡng, bồi bổ.', 5, NOW()),
        (v_ch_id, 'READING', '彼は 社長と 営業部長を 兼任しています。', '兼', 'かねる', '["かねる", "かねるす", "おかねる", "かねた"]', 'Chữ 兼 (KIÊM) trong câu đọc là かねる. Nghĩa: Kiêm nhiệm, kết hợp.', 6, NOW()),
        (v_ch_id, 'READING', '希望の IT企業に 就職が 決まりました。', '就', 'つく', '["つく", "つくす", "おつく", "つくる"]', 'Chữ 就 (TỰU) trong câu đọc là つく. Nghĩa: Nhậm chức, đạt được, theo học.', 7, NOW()),
        (v_ch_id, 'READING', '社内規定に 従って 正しく 手続きを 行います。', '従', 'したがう', '["したがう", "したがうす", "おしたがう", "したがうる"]', 'Chữ 従 (TÙNG) trong câu đọc là したがう. Nghĩa: Theo sau, tuân theo.', 8, NOW()),
        (v_ch_id, 'READING', 'お客様の 要望に 柔軟に 対応します。', '応', 'こたえる', '["こたえる", "こたえるす", "おこたえる", "こたえた"]', 'Chữ 応 (ỨNG) trong câu đọc là こたえる. Nghĩa: Đáp ứng, phản ứng.', 9, NOW()),
        (v_ch_id, 'READING', '筋の 通った 筋道を 立てて 提案します。', '筋', 'すじ', '["すじ", "すじす", "おすじ", "すじる"]', 'Chữ 筋 (CÂN) trong câu đọc là すじ. Nghĩa: Nguyên tắc, mạch lạc, đường lối.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さいよう】 の 手続きを 行います。', 'さいよう', '採用', '["採用", "採人", "用採", "新用"]', 'Từ 【さいよう】 có chữ Hán tương ứng là 採用. Nghĩa: Tuyển dụng, tuyển vào làm.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぼしゅう】 の 手続きを 行います。', 'ぼしゅう', '募集', '["募集", "募人", "集募", "新集"]', 'Từ 【ぼしゅう】 có chữ Hán tương ứng là 募集. Nghĩa: Chiêu mộ, tuyển mộ.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りれきしょ】 の 手続きを 行います。', 'りれきしょ', '履歴書', '["履歴書", "履人", "歴履", "新歴書"]', 'Từ 【りれきしょ】 có chữ Hán tương ứng là 履歴書. Nghĩa: Sơ yếu lý lịch, CV.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【てきせい】 の 手続きを 行います。', 'てきせい', '適性', '["適性", "適人", "性適", "新性"]', 'Từ 【てきせい】 có chữ Hán tương ứng là 適性. Nghĩa: Độ phù hợp, năng khiếu.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きぎょう】 の 手続きを 行います。', 'きぎょう', '企業', '["企業", "企人", "業企", "新業"]', 'Từ 【きぎょう】 có chữ Hán tương ứng là 企業. Nghĩa: Doanh nghiệp, công ty.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いらい】 の 手続きを 行います。', 'いらい', '依頼', '["依頼", "依人", "頼依", "新頼"]', 'Từ 【いらい】 có chữ Hán tương ứng là 依頼. Nghĩa: Nhờ cậy, ủy thác.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ひかく】 の 手続きを 行います。', 'ひかく', '比較', '["比較", "比人", "較比", "新較"]', 'Từ 【ひかく】 có chữ Hán tương ứng là 比較. Nghĩa: So sánh, đối chiếu.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ひょうか】 の 手続きを 行います。', 'ひょうか', '評価', '["評価", "評人", "価評", "新価"]', 'Từ 【ひょうか】 có chữ Hán tương ứng là 評価. Nghĩa: Đánh giá, nhận xét.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かいぜん】 の 手続きを 行います。', 'かいぜん', '改善', '["改善", "改人", "善改", "新善"]', 'Từ 【かいぜん】 có chữ Hán tương ứng là 改善. Nghĩa: Cải thiện, tiến bộ.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きんむ】 の 手続きを 行います。', 'きんむ', '勤務', '["勤務", "勤人", "務勤", "新務"]', 'Từ 【きんむ】 có chữ Hán tương ứng là 勤務. Nghĩa: Làm việc, công vụ.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きょうそう】 の 手続きを 行います。', 'きょうそう', '競争', '["競争", "競人", "争競", "新争"]', 'Từ 【きょうそう】 có chữ Hán tương ứng là 競争. Nghĩa: Cạnh tranh, thi đua.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しゅうしょく】 の 手続きを 行います。', 'しゅうしょく', '就職', '["就職", "就人", "職就", "新職"]', 'Từ 【しゅうしょく】 có chữ Hán tương ứng là 就職. Nghĩa: Tìm được việc làm.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '父は 小さな 会社を 経営しています。', '営', 'いとなむ', '["いとなむ", "いとなむす", "おいとなむ", "いとなむる"]', 'Chữ 営 (DOANH) trong câu đọc là いとなむ. Nghĩa: Kinh doanh, quản trị.', 1, NOW()),
        (v_ch_id, 'READING', '景気が 回復して 消費が 増えています。', '景', 'ケイ', '["ケイ", "ケイす", "おケイ", "ケイる"]', 'Chữ 景 (CẢNH) trong câu đọc là ケイ. Nghĩa: Cảnh sắc, kinh tế.', 2, NOW()),
        (v_ch_id, 'READING', '新規事業の ための 資金を 調達します。', '資', 'シ', '["シ", "シす", "おシ", "シる"]', 'Chữ 資 (TƯ) trong câu đọc là シ. Nghĩa: Tài sản, tư bản, nguồn vốn.', 3, NOW()),
        (v_ch_id, 'READING', '今期の 営業利益は 過去最高を 記録しました。', '益', 'エキ', '["エキ", "エキす", "おエキ", "エキる"]', 'Chữ 益 (ÍCH) trong câu đọc là エキ. Nghĩa: Lợi ích, lợi nhuận.', 4, NOW()),
        (v_ch_id, 'READING', '将来性の ある 企業の 株式を 購入します。', '株', 'かぶ', '["かぶ", "かぶす", "おかぶ", "かぶる"]', 'Chữ 株 (CHU) trong câu đọc là かぶ. Nghĩa: Cổ phiếu, gốc cây.', 5, NOW()),
        (v_ch_id, 'READING', '国債を 発行して 財源を 確保します。', '債', 'サイ', '["サイ", "サイす", "おサイ", "サイる"]', 'Chữ 債 (TRÁI) trong câu đọc là サイ. Nghĩa: Khoản nợ, trái phiếu.', 6, NOW()),
        (v_ch_id, 'READING', '自社製品を オンラインで 販売します。', '販', 'ハン', '["ハン", "ハンす", "おハン", "ハンる"]', 'Chữ 販 (PHÁN) trong câu đọc là ハン. Nghĩa: Bán hàng, buôn bán.', 7, NOW()),
        (v_ch_id, 'READING', '最新の パソコンを 購入しました。', '購', 'コウ', '["コウ", "コウす", "おコウ", "コウる"]', 'Chữ 購 (CẤU) trong câu đọc là コウ. Nghĩa: Mua sắm, đặt mua.', 8, NOW()),
        (v_ch_id, 'READING', '品質に 見合った 値段で 提供します。', '値', 'ね', '["ね", "ねす", "おね", "ねる"]', 'Chữ 値 (TRỊ) trong câu đọc là ね. Nghĩa: Giá cả, giá trị.', 9, NOW()),
        (v_ch_id, 'READING', '今月の 請求額を 確認してください。', '額', 'ひたい', '["ひたい", "ひたいす", "おひたい", "ひたいる"]', 'Chữ 額 (NGẠCH) trong câu đọc là ひたい. Nghĩa: Hạn mức, số tiền, vầng trán.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいえい】 の 手続きを 行います。', 'けいえい', '経営', '["経営", "経人", "営経", "新営"]', 'Từ 【けいえい】 có chữ Hán tương ứng là 経営. Nghĩa: Kinh doanh, quản trị.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいき】 の 手続きを 行います。', 'けいき', '景気', '["景気", "景人", "気景", "新気"]', 'Từ 【けいき】 có chữ Hán tương ứng là 景気. Nghĩa: Tình hình kinh tế.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しきん】 の 手続きを 行います。', 'しきん', '資金', '["資金", "資人", "金資", "新金"]', 'Từ 【しきん】 có chữ Hán tương ứng là 資金. Nghĩa: Nguồn vốn, kinh phí.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りえき】 の 手続きを 行います。', 'りえき', '利益', '["利益", "利人", "益利", "新益"]', 'Từ 【りえき】 có chữ Hán tương ứng là 利益. Nghĩa: Lợi nhuận, tiền lời.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かぶしき】 の 手続きを 行います。', 'かぶしき', '株式', '["株式", "株人", "式株", "新式"]', 'Từ 【かぶしき】 có chữ Hán tương ứng là 株式. Nghĩa: Cổ phiếu, cổ phần.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こくさい】 の 手続きを 行います。', 'こくさい', '国債', '["国債", "国人", "債国", "新債"]', 'Từ 【こくさい】 có chữ Hán tương ứng là 国債. Nghĩa: Trái phiếu chính phủ.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はんばい】 の 手続きを 行います。', 'はんばい', '販売', '["販売", "販人", "売販", "新売"]', 'Từ 【はんばい】 có chữ Hán tương ứng là 販売. Nghĩa: Bán hàng, phân phối.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ざいせい】 の 手続きを 行います。', 'ざいせい', '財政', '["財政", "財人", "政財", "新政"]', 'Từ 【ざいせい】 có chữ Hán tương ứng là 財政. Nghĩa: Tài chính công.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かくだい】 の 手続きを 行います。', 'かくだい', '拡大', '["拡大", "拡人", "大拡", "新大"]', 'Từ 【かくだい】 có chữ Hán tương ứng là 拡大. Nghĩa: Mở rộng quy mô.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しゅくしょう】 の 手続きを 行います。', 'しゅくしょう', '縮小', '["縮小", "縮人", "小縮", "新小"]', 'Từ 【しゅくしょう】 có chữ Hán tương ứng là 縮小. Nghĩa: Thu hẹp quy mô.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せんりゃく】 の 手続きを 行います。', 'せんりゃく', '戦略', '["戦略", "戦人", "略戦", "新略"]', 'Từ 【せんりゃく】 có chữ Hán tương ứng là 戦略. Nghĩa: Chiến lược kinh doanh.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しゅっぱん】 の 手続きを 行います。', 'しゅっぱん', '出版', '["出版", "出人", "版出", "新版"]', 'Từ 【しゅっぱん】 có chữ Hán tương ứng là 出版. Nghĩa: Xuất bản ấn phẩm.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '暴漢が 金品を 奪って 逃走しました。', '奪', 'うばう', '["うばう", "うばうす", "おうばう", "うばうる"]', 'Chữ 奪 (ĐOẠT) trong câu đọc là うばう. Nghĩa: Đoạt lấy, cướp mất.', 1, NOW()),
        (v_ch_id, 'READING', '映画の 主人公が 敵を 倒しました。', '殺', 'ころす', '["ころす", "ころ", "おころす", "ころする"]', 'Chữ 殺 (SÁT) trong câu đọc là ころす. Nghĩa: Sát hại, tiêu diệt.', 2, NOW()),
        (v_ch_id, 'READING', '恐怖で 声が 震えていました。', '震', 'ふるえる', '["ふるえる", "ふるえるす", "おふるえる", "ふるえた"]', 'Chữ 震 (CHẤN) trong câu đọc là ふるえる. Nghĩa: Rung chuyển, động đất.', 3, NOW()),
        (v_ch_id, 'READING', '見知らぬ 街で 道に 迷ってしまいました。', '迷', 'まよう', '["まよう", "まようす", "おまよう", "まようる"]', 'Chữ 迷 (MÊ) trong câu đọc là まよう. Nghĩa: Mê hoặc, lạc đường.', 4, NOW()),
        (v_ch_id, 'READING', '暴力を 振るうことは 決して 許されません。', '暴', 'あばれる', '["あばれる", "あばれるす", "おあばれる", "あばれた"]', 'Chữ 暴 (BẠO) trong câu đọc là あばれる. Nghĩa: Bạo lực, phơi bày.', 5, NOW()),
        (v_ch_id, 'READING', '暗闇の 奥に 恐怖を 感じました。', '恐', 'おそれる', '["おそれる", "おそれるす", "それる", "おそれた"]', 'Chữ 恐 (KHỦNG) trong câu đọc là おそれる. Nghĩa: Khủng khiếp, sợ hãi.', 6, NOW()),
        (v_ch_id, 'READING', '緊迫した 空気が 会場に 漂っています。', '緊', 'キン', '["キン", "キンす", "おキン", "キンる"]', 'Chữ 緊 (KHẨN) trong câu đọc là キン. Nghĩa: Khẩn cấp, siết chặt.', 7, NOW()),
        (v_ch_id, 'READING', '緊張を 解すために 深呼吸を します。', '張', 'はる', '["はる", "はるす", "おはる", "はた"]', 'Chữ 張 (TRƯƠNG) trong câu đọc là はる. Nghĩa: Giương cung, căng thẳng.', 8, NOW()),
        (v_ch_id, 'READING', '約束を 破ることは 信頼を 失います。', '破', 'やぶる', '["やぶる", "やぶるす", "おやぶる", "やぶた"]', 'Chữ 破 (PHÁ) trong câu đọc là やぶる. Nghĩa: Phá vỡ, rách rưới.', 9, NOW()),
        (v_ch_id, 'READING', 'グラスが 床に 落ちて 割れました。', '割', 'わる', '["わる", "わるす", "おわる", "わた"]', 'Chữ 割 (CÁT) trong câu đọc là わる. Nghĩa: Cắt đôi, phân chia, giảm giá.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ごうだつ】 の 手続きを 行います。', 'ごうだつ', '強奪', '["強奪", "強人", "奪強", "新奪"]', 'Từ 【ごうだつ】 có chữ Hán tương ứng là 強奪. Nghĩa: Cướp giật, đoạt lấy.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きょうふ】 の 手続きを 行います。', 'きょうふ', '恐怖', '["恐怖", "恐人", "怖恐", "新怖"]', 'Từ 【きょうふ】 có chữ Hán tương ứng là 恐怖. Nghĩa: Khủng khiếp, sợ hãi.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きんちょう】 の 手続きを 行います。', 'きんちょう', '緊張', '["緊張", "緊人", "張緊", "新張"]', 'Từ 【きんちょう】 có chữ Hán tương ứng là 緊張. Nghĩa: Căng thẳng, hồi hộp.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はめつ】 の 手続きを 行います。', 'はめつ', '破滅', '["破滅", "破人", "滅破", "新滅"]', 'Từ 【はめつ】 có chữ Hán tương ứng là 破滅. Nghĩa: Hủy diệt, sụp đổ.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りべつ】 の 手続きを 行います。', 'りべつ', '離別', '["離別", "離人", "別離", "新別"]', 'Từ 【りべつ】 có chữ Hán tương ứng là 離別. Nghĩa: Ly biệt, chia tay.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いんしょう】 の 手続きを 行います。', 'いんしょう', '印象', '["印象", "印人", "象印", "新象"]', 'Từ 【いんしょう】 có chữ Hán tương ứng là 印象. Nghĩa: Ấn tượng.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ねんれい】 の 手続きを 行います。', 'ねんれい', '年齢', '["年齢", "年人", "齢年", "新齢"]', 'Từ 【ねんれい】 có chữ Hán tương ứng là 年齢. Nghĩa: Tuổi tác.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうさい】 の 手続きを 行います。', 'こうさい', '交際', '["交際", "交人", "際交", "新際"]', 'Từ 【こうさい】 có chữ Hán tương ứng là 交際. Nghĩa: Giao tế, hẹn hò.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ゆうわく】 の 手続きを 行います。', 'ゆうわく', '誘惑', '["誘惑", "誘人", "惑誘", "新惑"]', 'Từ 【ゆうわく】 có chữ Hán tương ứng là 誘惑. Nghĩa: Dụ dỗ, cám dỗ.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんゆう】 の 手続きを 行います。', 'かんゆう', '勧誘', '["勧誘", "勧人", "誘勧", "新誘"]', 'Từ 【かんゆう】 có chữ Hán tương ứng là 勧誘. Nghĩa: Mời chào, thuyết phục tham gia.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【うんめい】 の 手続きを 行います。', 'うんめい', '運命', '["運命", "運人", "命運", "新命"]', 'Từ 【うんめい】 có chữ Hán tương ứng là 運命. Nghĩa: Vận mệnh, số phận.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【うらない】 の 手続きを 行います。', 'うらない', '占い', '["占い", "占人", "い占", "新い"]', 'Từ 【うらない】 có chữ Hán tương ứng là 占い. Nghĩa: Bói toán.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '学校の 周辺には 緑が 多く あります。', '周', 'まわり', '["まわり", "まわりす", "おまわり", "まわりる"]', 'Chữ 周 (CHU) trong câu đọc là まわり. Nghĩa: Xung quanh, chu vi.', 1, NOW()),
        (v_ch_id, 'READING', '美しい 自然に 囲まれた 静かな 村。', '囲', 'かこむ', '["かこむ", "かこむす", "おかこむ", "かこむる"]', 'Chữ 囲 (VI) trong câu đọc là かこむ. Nghĩa: Bao quanh, phạm vi.', 2, NOW()),
        (v_ch_id, 'READING', 'みんなで 力を 合わせて 協力します。', '協', 'キョウ', '["キョウ", "キョウす", "おキョウ", "キョウる"]', 'Chữ 協 (HIỆP) trong câu đọc là キョウ. Nghĩa: Hợp tác, chung sức.', 3, NOW()),
        (v_ch_id, 'READING', 'お互いを 尊重し合える 関係を 築きます。', '互', 'たがい', '["たがい", "たがいす", "おたがい", "たがいる"]', 'Chữ 互 (HỖ) trong câu đọc là たがい. Nghĩa: Tương hỗ, lẫn nhau.', 4, NOW()),
        (v_ch_id, 'READING', '同じ 目的を 共有する 仲間たち。', '共', 'とも', '["とも", "ともす", "おとも", "ともる"]', 'Chữ 共 (CỘNG) trong câu đọc là とも. Nghĩa: Chung, cùng nhau.', 5, NOW()),
        (v_ch_id, 'READING', '我が国の 伝統文化を 世界に 発信します。', '我', 'われ', '["われ", "われす", "おわれ", "われる"]', 'Chữ 我 (NGÃ) trong câu đọc là われ. Nghĩa: Bản ngã, tôi, chúng ta.', 6, NOW()),
        (v_ch_id, 'READING', '皆さん、おはようございます。', '皆', 'みな', '["みな", "みなす", "おみな", "みなる"]', 'Chữ 皆 (GIAI) trong câu đọc là みな. Nghĩa: Tất cả mọi người.', 7, NOW()),
        (v_ch_id, 'READING', '友達と 一緒に 宿題を します。', '緒', 'お', '["お", "おす", "", "おる"]', 'Chữ 緒 (TỰ) trong câu đọc là お. Nghĩa: Khởi đầu, đầu mối, cùng nhau.', 8, NOW()),
        (v_ch_id, 'READING', '被災地へ 支援物資を 届けます。', '援', 'エン', '["エン", "エンす", "おエン", "エンる"]', 'Chữ 援 (VIỆN) trong câu đọc là エン. Nghĩa: Chi viện, cứu trợ, hỗ trợ.', 9, NOW()),
        (v_ch_id, 'READING', '困ったときは お互いに 頼り合います。', '頼', 'たのむ', '["たのむ", "たのむす", "おたのむ", "たのむる"]', 'Chữ 頼 (LẠI) trong câu đọc là たのむ. Nghĩa: Trông cậy, nhờ vả.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しゅうい】 の 手続きを 行います。', 'しゅうい', '周囲', '["周囲", "周人", "囲周", "新囲"]', 'Từ 【しゅうい】 có chữ Hán tương ứng là 周囲. Nghĩa: Xung quanh, chu vi.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きょうりょく】 の 手続きを 行います。', 'きょうりょく', '協力', '["協力", "協人", "力協", "新力"]', 'Từ 【きょうりょく】 có chữ Hán tương ứng là 協力. Nghĩa: Hợp lực, chung tay giúp đỡ.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【そうご】 の 手続きを 行います。', 'そうご', '相互', '["相互", "相人", "互相", "新互"]', 'Từ 【そうご】 có chữ Hán tương ứng là 相互. Nghĩa: Tương hỗ, lẫn nhau.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きょうゆう】 の 手続きを 行います。', 'きょうゆう', '共有', '["共有", "共人", "有共", "新有"]', 'Từ 【きょうゆう】 có chữ Hán tương ứng là 共有. Nghĩa: Chia sẻ, sở hữu chung.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【えんじょ】 の 手続きを 行います。', 'えんじょ', '援助', '["援助", "援人", "助援", "新助"]', 'Từ 【えんじょ】 có chữ Hán tương ứng là 援助. Nghĩa: Viện trợ, hỗ trợ kinh phí.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しんらい】 の 手続きを 行います。', 'しんらい', '信頼', '["信頼", "信人", "頼信", "新頼"]', 'Từ 【しんらい】 có chữ Hán tương ứng là 信頼. Nghĩa: Tin cậy, gửi gắm niềm tin.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ほうふ】 の 手続きを 行います。', 'ほうふ', '抱負', '["抱負", "抱人", "負抱", "新負"]', 'Từ 【ほうふ】 có chữ Hán tương ứng là 抱負. Nghĩa: Hoài bão, ước nguyện.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しめい】 の 手続きを 行います。', 'しめい', '氏名', '["氏名", "氏人", "名氏", "新名"]', 'Từ 【しめい】 có chữ Hán tương ứng là 氏名. Nghĩa: Họ và tên.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【そんけい】 の 手続きを 行います。', 'そんけい', '尊敬', '["尊敬", "尊人", "敬尊", "新敬"]', 'Từ 【そんけい】 có chữ Hán tương ứng là 尊敬. Nghĩa: Tôn kính, kính trọng.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【もうす】 の 手続きを 行います。', 'もうす', '申す', '["申す", "申人", "す申", "新す"]', 'Từ 【もうす】 có chữ Hán tương ứng là 申す. Nghĩa: Tên là, nói là (khiêm nhường).', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【まいる】 の 手続きを 行います。', 'まいる', '参る', '["参る", "参人", "る参", "新る"]', 'Từ 【まいる】 có chữ Hán tương ứng là 参る. Nghĩa: Đi, đến (khiêm nhường ngữ).', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【おれい】 の 手続きを 行います。', 'おれい', '御礼', '["御礼", "御人", "礼御", "新礼"]', 'Từ 【おれい】 có chữ Hán tương ứng là 御礼. Nghĩa: Lời cảm ơn, quà tạ ơn.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '東京湾を 一周する クルーズ船。', '湾', 'ワン', '["ワン", "ワンす", "おワン", "ワンる"]', 'Chữ 湾 (LOAN) trong câu đọc là ワン. Nghĩa: Vịnh biển, eo biển.', 1, NOW()),
        (v_ch_id, 'READING', '船は 沖合に 向かって 進んでいきます。', '沖', 'おき', '["おき", "おきす", "き", "おきる"]', 'Chữ 沖 (TRÙNG) trong câu đọc là おき. Nghĩa: Ngoài khơi, xa bờ.', 2, NOW()),
        (v_ch_id, 'READING', '夕暮れの 砂浜を 静かに 散歩します。', '浜', 'はま', '["はま", "はます", "おはま", "はまる"]', 'Chữ 浜 (BÀNH) trong câu đọc là はま. Nghĩa: Bờ biển, bãi biển.', 3, NOW()),
        (v_ch_id, 'READING', '江戸時代の 歴史と 文化を 学びます。', '江', 'え', '["え", "えす", "おえ", "える"]', 'Chữ 江 (GIANG) trong câu đọc là え. Nghĩa: Dòng sông lớn, vịnh nhỏ.', 4, NOW()),
        (v_ch_id, 'READING', '崖の 断面に 地層が くっきりと 見えます。', '層', 'ソウ', '["ソウ", "ソウす", "おソウ", "ソウる"]', 'Chữ 層 (TẰNG) trong câu đọc là ソウ. Nghĩa: Tầng lớp, địa tầng.', 5, NOW()),
        (v_ch_id, 'READING', '砂漠の 砂は とても 細かいです。', '砂', 'すな', '["すな", "すなす", "おすな", "すなる"]', 'Chữ 砂 (SA) trong câu đọc là すな. Nghĩa: Cát biển, hạt cát.', 6, NOW()),
        (v_ch_id, 'READING', '森の 奥から 清らかな 泉が 湧き出ています。', '泉', 'いずみ', '["いずみ", "いずみす", "おいずみ", "いずみる"]', 'Chữ 泉 (TUYỀN) trong câu đọc là いずみ. Nghĩa: Suối nước, suối nguồn.', 7, NOW()),
        (v_ch_id, 'READING', '大きな 川の 源流を たどります。', '源', 'みなもと', '["みなもと", "みなもとす", "おみなもと", "みなもとる"]', 'Chữ 源 (NGUYÊN) trong câu đọc là みなもと. Nghĩa: Nguồn cội, tài nguyên.', 8, NOW()),
        (v_ch_id, 'READING', '水面に 木の 葉が ぷかぷか 浮いています。', '浮', 'うく', '["うく", "うくす", "おうく", "うくる"]', 'Chữ 浮 (PHÙ) trong câu đọc là うく. Nghĩa: Nổi lơ lửng, trôi nổi.', 9, NOW()),
        (v_ch_id, 'READING', '夕日が 西の 空に ゆっくりと 沈みます。', '沈', 'しずむ', '["しずむ", "しずむす", "おしずむ", "しずむる"]', 'Chữ 沈 (TRẦM) trong câu đọc là しずむ. Nghĩa: Chìm đắm, trầm lặng.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かいがん】 の 手続きを 行います。', 'かいがん', '海岸', '["海岸", "海人", "岸海", "新岸"]', 'Từ 【かいがん】 có chữ Hán tương ứng là 海岸. Nghĩa: Bờ biển.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【すなはま】 の 手続きを 行います。', 'すなはま', '砂浜', '["砂浜", "砂人", "浜砂", "新浜"]', 'Từ 【すなはま】 có chữ Hán tương ứng là 砂浜. Nghĩa: Bãi cát ven biển.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ちそう】 の 手続きを 行います。', 'ちそう', '地層', '["地層", "地人", "層地", "新層"]', 'Từ 【ちそう】 có chữ Hán tương ứng là 地層. Nghĩa: Địa tầng, tầng đất.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【おんせん】 の 手続きを 行います。', 'おんせん', '温泉', '["温泉", "温人", "泉温", "新泉"]', 'Từ 【おんせん】 có chữ Hán tương ứng là 温泉. Nghĩa: Suối nước nóng.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しげん】 の 手続きを 行います。', 'しげん', '資源', '["資源", "資人", "源資", "新源"]', 'Từ 【しげん】 có chữ Hán tương ứng là 資源. Nghĩa: Tài nguyên thiên nhiên.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【うちゅう】 の 手続きを 行います。', 'うちゅう', '宇宙', '["宇宙", "宇人", "宙宇", "新宙"]', 'Từ 【うちゅう】 có chữ Hán tương ứng là 宇宙. Nghĩa: Vũ trụ.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんきょう】 の 手続きを 行います。', 'かんきょう', '環境', '["環境", "環人", "境環", "新境"]', 'Từ 【かんきょう】 có chữ Hán tương ứng là 環境. Nghĩa: Môi trường sinh thái.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ほっきょく】 の 手続きを 行います。', 'ほっきょく', '北極', '["北極", "北人", "極北", "新極"]', 'Từ 【ほっきょく】 có chữ Hán tương ứng là 北極. Nghĩa: Bắc Cực.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さいがい】 の 手続きを 行います。', 'さいがい', '災害', '["災害", "災人", "害災", "新害"]', 'Từ 【さいがい】 có chữ Hán tương ứng là 災害. Nghĩa: Thảm họa, thiên tai.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じしん】 の 手続きを 行います。', 'じしん', '地震', '["地震", "地人", "震地", "新震"]', 'Từ 【じしん】 có chữ Hán tương ứng là 地震. Nghĩa: Động đất.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぼうさい】 の 手続きを 行います。', 'ぼうさい', '防災', '["防災", "防人", "災防", "新災"]', 'Từ 【ぼうさい】 có chữ Hán tương ứng là 防災. Nghĩa: Phòng chống thiên tai.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【えいきょう】 の 手続きを 行います。', 'えいきょう', '影響', '["影響", "影人", "響影", "新響"]', 'Từ 【えいきょう】 có chữ Hán tương ứng là 影響. Nghĩa: Ảnh hưởng, tác động.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '大学で 経済学の 講義を 聴講します。', '講', 'コウ', '["コウ", "コウす", "おコウ", "コウる"]', 'Chữ 講 (GIẢNG) trong câu đọc là コウ. Nghĩa: Giảng dạy, bài giảng.', 1, NOW()),
        (v_ch_id, 'READING', '正義感の 強い 人が 困った人を 助けます。', '義', 'ギ', '["ギ", "ギす", "おギ", "ギる"]', 'Chữ 義 (NGHĨA) trong câu đọc là ギ. Nghĩa: Chính nghĩa, ý nghĩa.', 2, NOW()),
        (v_ch_id, 'READING', '先生が 生徒を 正しい 方向へと 導きます。', '導', 'みちびく', '["みちびく", "みちびくす", "おみちびく", "みちびくる"]', 'Chữ 導 (ĐẠO) trong câu đọc là みちびく. Nghĩa: Dẫn dắt, chỉ đạo.', 3, NOW()),
        (v_ch_id, 'READING', '大学で 日本文学を 専門に 研究しています。', '専', 'もっぱら', '["もっぱら", "もっぱらす", "おもっぱら", "もっぱらる"]', 'Chữ 専 (CHUYÊN) trong câu đọc là もっぱら. Nghĩa: Chuyên môn, chuyên tâm.', 4, NOW()),
        (v_ch_id, 'READING', '時間は 限られているので 計画的に 行動します。', '限', 'かぎる', '["かぎる", "かぎるす", "おかぎる", "かぎた"]', 'Chữ 限 (HẠN) trong câu đọc là かぎる. Nghĩa: Giới hạn, hạn định.', 5, NOW()),
        (v_ch_id, 'READING', '海外で 研修を 受けて スキルを 磨きます。', '修', 'おさめる', '["おさめる", "おさめるす", "さめる", "おさめた"]', 'Chữ 修 (TU) trong câu đọc là おさめる. Nghĩa: Tu sửa, tu nghiệp, học tập.', 6, NOW()),
        (v_ch_id, 'READING', '自分の 意見を 明確に 述べることが 大切です。', '述', 'のべる', '["のべる", "のべるす", "おのべる", "のべた"]', 'Chữ 述 (THUẬT) trong câu đọc là のべる. Nghĩa: Tường thuật, bày tỏ.', 7, NOW()),
        (v_ch_id, 'READING', '将来の 夢に 向かって 一歩ずつ 前進します。', '将', 'ショウ', '["ショウ", "ショウす", "おショウ", "ショウる"]', 'Chữ 将 (TƯỚNG) trong câu đọc là ショウ. Nghĩa: Tương lai, tướng quân.', 8, NOW()),
        (v_ch_id, 'READING', '彼は 幅広い 知識を 持つ 博士です。', '博', 'ハク', '["ハク", "ハクす", "おハク", "ハクる"]', 'Chữ 博 (BÁC) trong câu đọc là ハク. Nghĩa: Uyên bác, bác sĩ, bảo tàng.', 9, NOW()),
        (v_ch_id, 'READING', '少子化対策に 国を 挙げて 取り組みます。', '策', 'サク', '["サク", "サクす", "おサク", "サクる"]', 'Chữ 策 (SÁCH) trong câu đọc là サク. Nghĩa: Chính sách, kế sách.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうぎ】 の 手続きを 行います。', 'こうぎ', '講義', '["講義", "講人", "義講", "新義"]', 'Từ 【こうぎ】 có chữ Hán tương ứng là 講義. Nghĩa: Bài giảng, tiết học đại học.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せんもん】 の 手続きを 行います。', 'せんもん', '専門', '["専門", "専人", "門専", "新門"]', 'Từ 【せんもん】 có chữ Hán tương ứng là 専門. Nghĩa: Chuyên môn, chuyên ngành.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はかせ】 の 手続きを 行います。', 'はかせ', '博士', '["博士", "博人", "士博", "新士"]', 'Từ 【はかせ】 có chữ Hán tương ứng là 博士. Nghĩa: Tiến sĩ.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せいさく】 の 手続きを 行います。', 'せいさく', '政策', '["政策", "政人", "策政", "新策"]', 'Từ 【せいさく】 có chữ Hán tương ứng là 政策. Nghĩa: Chính sách công.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じょうやく】 の 手続きを 行います。', 'じょうやく', '条約', '["条約", "条人", "約条", "新約"]', 'Từ 【じょうやく】 có chữ Hán tương ứng là 条約. Nghĩa: Hiệp ước quốc tế.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しほう】 の 手続きを 行います。', 'しほう', '司法', '["司法", "司人", "法司", "新法"]', 'Từ 【しほう】 có chữ Hán tương ứng là 司法. Nghĩa: Tư pháp.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいさつしょ】 の 手続きを 行います。', 'けいさつしょ', '警察署', '["警察署", "警人", "察警", "新察署"]', 'Từ 【けいさつしょ】 có chữ Hán tương ứng là 警察署. Nghĩa: Đồn cảnh sát, sở cảnh sát.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【たいほ】 の 手続きを 行います。', 'たいほ', '逮捕', '["逮捕", "逮人", "捕逮", "新捕"]', 'Từ 【たいほ】 có chữ Hán tương ứng là 逮捕. Nghĩa: Bắt giữ tội phạm.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せいとう】 の 手続きを 行います。', 'せいとう', '政党', '["政党", "政人", "党政", "新党"]', 'Từ 【せいとう】 có chữ Hán tương ứng là 政党. Nghĩa: Chính đảng.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せんきょ】 の 手続きを 行います。', 'せんきょ', '選挙', '["選挙", "選人", "挙選", "新挙"]', 'Từ 【せんきょ】 có chữ Hán tương ứng là 選挙. Nghĩa: Bầu cử.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【とうひょう】 の 手続きを 行います。', 'とうひょう', '投票', '["投票", "投人", "票投", "新票"]', 'Từ 【とうひょう】 có chữ Hán tương ứng là 投票. Nghĩa: Bỏ phiếu biểu quyết.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぐんじ】 の 手続きを 行います。', 'ぐんじ', '軍事', '["軍事", "軍人", "事軍", "新事"]', 'Từ 【ぐんじ】 có chữ Hán tương ứng là 軍事. Nghĩa: Quân sự.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '和室に 新しい 畳を 敷きました。', '畳', 'たたみ', '["たたみ", "たたみす", "おたたみ", "たたみる"]', 'Chữ 畳 (ĐIỆP) trong câu đọc là たたみ. Nghĩa: Chiếu Tatami, gấp lại.', 1, NOW()),
        (v_ch_id, 'READING', '木の 温もりを 感じる フローリングの 床。', '床', 'ゆか', '["ゆか", "ゆかす", "おゆか", "ゆかる"]', 'Chữ 床 (SÀNG) trong câu đọc là ゆか. Nghĩa: Sàn nhà, giường nằm.', 2, NOW()),
        (v_ch_id, 'READING', '雨宿りの ために 軒下に 入ります。', '軒', 'のき', '["のき", "のきす", "おのき", "のきる"]', 'Chữ 軒 (HIÊN) trong câu đọc là のき. Nghĩa: Mái hiên, căn nhà.', 3, NOW()),
        (v_ch_id, 'READING', '玄関の ドアを 開けて 「ただいま」と 言います。', '玄', 'ゲン', '["ゲン", "ゲンす", "おゲン", "ゲンる"]', 'Chữ 玄 (HUYỀN) trong câu đọc là ゲン. Nghĩa: Huyền bí, lối vào sảnh.', 4, NOW()),
        (v_ch_id, 'READING', '壁に カレンダーを 掛けました。', '壁', 'かべ', '["かべ", "かべす", "おかべ", "かべる"]', 'Chữ 壁 (BÍCH) trong câu đọc là かべ. Nghĩa: Bức tường, vách ngăn.', 5, NOW()),
        (v_ch_id, 'READING', '長い 廊下を 静かに 歩きます。', '廊', 'ロウ', '["ロウ", "ロウす", "おロウ", "ロウる"]', 'Chữ 廊 (LANG) trong câu đọc là ロウ. Nghĩa: Hành lang.', 6, NOW()),
        (v_ch_id, 'READING', '大学の 学生寮で 共同生活を 送ります。', '寮', 'リョウ', '["リョウ", "リョウす", "おリョウ", "リョウる"]', 'Chữ 寮 (LIÊU) trong câu đọc là リョウ. Nghĩa: Ký túc xá.', 7, NOW()),
        (v_ch_id, 'READING', '隣の 部屋から 楽しそうな 声が 聞こえます。', '隣', 'となり', '["となり", "となりす", "おとなり", "となりる"]', 'Chữ 隣 (LÂN) trong câu đọc là となり. Nghĩa: Láng giềng, bên cạnh.', 8, NOW()),
        (v_ch_id, 'READING', 'ベッドの 上に 暖かい 毛布を 敷きます。', '敷', 'しく', '["しく", "しくす", "おしく", "しくる"]', 'Chữ 敷 (PHU) trong câu đọc là しく. Nghĩa: Trải ra, xây dựng.', 9, NOW()),
        (v_ch_id, 'READING', '部屋は 狭いですが、住めば都です。', '狭', 'せまい', '["せまい", "せまいす", "おせまい", "せまいる"]', 'Chữ 狭 (HIỆP) trong câu đọc là せまい. Nghĩa: Chật hẹp, eo hẹp.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【たたみ】 の 手続きを 行います。', 'たたみ', '畳', '["畳", "畳所", "畳的", "大畳"]', 'Từ 【たたみ】 có chữ Hán tương ứng là 畳. Nghĩa: Chiếu cói truyền thống.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ゆか】 の 手続きを 行います。', 'ゆか', '床', '["床", "床所", "床的", "大床"]', 'Từ 【ゆか】 có chữ Hán tương ứng là 床. Nghĩa: Sàn nhà.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【げんかん】 の 手続きを 行います。', 'げんかん', '玄関', '["玄関", "玄人", "関玄", "新関"]', 'Từ 【げんかん】 có chữ Hán tương ứng là 玄関. Nghĩa: Lối vào nhà, tiền sảnh.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ろうか】 の 手続きを 行います。', 'ろうか', '廊下', '["廊下", "廊人", "下廊", "新下"]', 'Từ 【ろうか】 có chữ Hán tương ứng là 廊下. Nghĩa: Hành lang.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りょう】 の 手続きを 行います。', 'りょう', '寮', '["寮", "寮所", "寮的", "大寮"]', 'Từ 【りょう】 có chữ Hán tương ứng là 寮. Nghĩa: Ký túc xá.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【りんじん】 の 手続きを 行います。', 'りんじん', '隣人', '["隣人", "人隣", "新人", "隣人会"]', 'Từ 【りんじん】 có chữ Hán tương ứng là 隣人. Nghĩa: Hàng xóm láng giềng.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ふうとう】 の 手続きを 行います。', 'ふうとう', '封筒', '["封筒", "封人", "筒封", "新筒"]', 'Từ 【ふうとう】 có chữ Hán tương ứng là 封筒. Nghĩa: Phong bì thư.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【あてさき】 の 手続きを 行います。', 'あてさき', '宛先', '["宛先", "宛人", "先宛", "新先"]', 'Từ 【あてさき】 có chữ Hán tương ứng là 宛先. Nghĩa: Địa chỉ người nhận.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【す】 の 手続きを 行います。', 'す', '酢', '["酢", "酢所", "酢的", "大酢"]', 'Từ 【す】 có chữ Hán tương ứng là 酢. Nghĩa: Giấm ăn.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さとう】 の 手続きを 行います。', 'さとう', '砂糖', '["砂糖", "砂人", "糖砂", "新糖"]', 'Từ 【さとう】 có chữ Hán tương ứng là 砂糖. Nghĩa: Đường ăn.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【じゅうたい】 の 手続きを 行います。', 'じゅうたい', '渋滞', '["渋滞", "渋人", "滞渋", "新滞"]', 'Từ 【じゅうたい】 có chữ Hán tương ứng là 渋滞. Nghĩa: Kẹt xe, tắc nghẽn giao thông.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【がいとう】 の 手続きを 行います。', 'がいとう', '街灯', '["街灯", "街人", "灯街", "新灯"]', 'Từ 【がいとう】 có chữ Hán tương ứng là 街灯. Nghĩa: Đèn đường chiếu sáng.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '常に 携帯電話を 身につけて 持ち歩きます。', '携', 'たずさえる', '["たずさえる", "たずさえるす", "おたずさえる", "たずさえた"]', 'Chữ 携 (HUỀ) trong câu đọc là たずさえる. Nghĩa: Cầm theo, tham gia, di động.', 1, NOW()),
        (v_ch_id, 'READING', '緊急事態に 即座に 判断を 下します。', '即', 'ソク', '["ソク", "ソクす", "おソク", "ソクる"]', 'Chữ 即 (TỨC) trong câu đọc là ソク. Nghĩa: Ngay lập tức, tức thì.', 2, NOW()),
        (v_ch_id, 'READING', 'アルバイトで 学費を 稼ぎます。', '稼', 'かせぐ', '["かせぐ", "かせぐす", "おかせぐ", "かせぐる"]', 'Chữ 稼 (GIÁ) trong câu đọc là かせぐ. Nghĩa: Kiếm tiền, trồng lúa.', 3, NOW()),
        (v_ch_id, 'READING', '市場の 需要に 合わせた 商品を 開発します。', '需', 'ジュ', '["ジュ", "ジュす", "おジュ", "ジュる"]', 'Chữ 需 (NHU) trong câu đọc là ジュ. Nghĩa: Nhu cầu, cần thiết.', 4, NOW()),
        (v_ch_id, 'READING', '不正な 要求を 断固として 拒絶します。', '拒', 'こばむ', '["こばむ", "こばむす", "おこばむ", "こばむる"]', 'Chữ 拒 (CỰ) trong câu đọc là こばむ. Nghĩa: Từ chối, cự tuyệt.', 5, NOW()),
        (v_ch_id, 'READING', '規則を 厳格に 遵守します。', '厳', 'きびしい', '["きびしい", "きびしいす", "おきびしい", "きびしいる"]', 'Chữ 厳 (NGHIÊM) trong câu đọc là きびしい. Nghĩa: Nghiêm khắc, trang nghiêm.', 6, NOW()),
        (v_ch_id, 'READING', 'カラープリンターで 資料を 印刷します。', '刷', 'する', '["する", "するす", "おする", "すた"]', 'Chữ 刷 (LOÁT) trong câu đọc là する. Nghĩa: In ấn, quét mực.', 7, NOW()),
        (v_ch_id, 'READING', 'エントリーの 枠が 残り わずかに なりました。', '枠', 'わく', '["わく", "わくす", "おわく", "わくる"]', 'Chữ 枠 (NGOẠNG) trong câu đọc là わく. Nghĩa: Khung viền, giới hạn.', 8, NOW()),
        (v_ch_id, 'READING', '縦書きの 文章を すらすら 読みます。', '縦', 'たて', '["たて", "たてす", "おたて", "たてる"]', 'Chữ 縦 (TÚNG) trong câu đọc là たて. Nghĩa: Chiều dọc, tung hoành.', 9, NOW()),
        (v_ch_id, 'READING', '坂道を 斜めに 横切って 歩きます。', '斜', 'ななめ', '["ななめ", "ななめす", "おななめ", "ななめる"]', 'Chữ 斜 (TÀ) trong câu đọc là ななめ. Nghĩa: Nghiêng, xiên.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいたいでんわ】 の 手続きを 行います。', 'けいたいでんわ', '携帯電話', '["携帯電話", "携人", "帯携", "新帯電話"]', 'Từ 【けいたいでんわ】 có chữ Hán tương ứng là 携帯電話. Nghĩa: Điện thoại di động.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きょひ】 の 手続きを 行います。', 'きょひ', '拒否', '["拒否", "拒人", "否拒", "新否"]', 'Từ 【きょひ】 có chữ Hán tương ứng là 拒否. Nghĩa: Cự tuyệt, từ chối.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いんさつ】 の 手続きを 行います。', 'いんさつ', '印刷', '["印刷", "印人", "刷印", "新刷"]', 'Từ 【いんさつ】 có chữ Hán tương ứng là 印刷. Nghĩa: In ấn tài liệu.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【がんこ】 の 手続きを 行います。', 'がんこ', '頑固', '["頑固", "頑人", "固頑", "新固"]', 'Từ 【がんこ】 có chữ Hán tương ứng là 頑固. Nghĩa: Ngoan cố, bảo thủ.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けんめい】 の 手続きを 行います。', 'けんめい', '賢明', '["賢明", "賢人", "明賢", "新明"]', 'Từ 【けんめい】 có chữ Hán tương ứng là 賢明. Nghĩa: Hiền minh, sáng suốt.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【するどい】 の 手続きを 行います。', 'するどい', '鋭い', '["鋭い", "鋭人", "い鋭", "新い"]', 'Từ 【するどい】 có chữ Hán tương ứng là 鋭い. Nghĩa: Sắc bén, nhạy bén.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はだ】 の 手続きを 行います。', 'はだ', '肌', '["肌", "肌所", "肌的", "大肌"]', 'Từ 【はだ】 có chữ Hán tương ứng là 肌. Nghĩa: Làn da.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けしょう】 の 手続きを 行います。', 'けしょう', '化粧', '["化粧", "化人", "粧化", "新粧"]', 'Từ 【けしょう】 có chữ Hán tương ứng là 化粧. Nghĩa: Trang điểm.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かがみ】 の 手続きを 行います。', 'かがみ', '鏡', '["鏡", "鏡所", "鏡的", "大鏡"]', 'Từ 【かがみ】 có chữ Hán tương ứng là 鏡. Nghĩa: Chiếc gương soi.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かわぐつ】 の 手続きを 行います。', 'かわぐつ', '革靴', '["革靴", "革人", "靴革", "新靴"]', 'Từ 【かわぐつ】 có chữ Hán tương ứng là 革靴. Nghĩa: Giày da.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ふくそう】 の 手続きを 行います。', 'ふくそう', '服装', '["服装", "服人", "装服", "新装"]', 'Từ 【ふくそう】 có chữ Hán tương ứng là 服装. Nghĩa: Trang phục, quần áo.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ゆうき】 の 手続きを 行います。', 'ゆうき', '勇気', '["勇気", "勇人", "気勇", "新気"]', 'Từ 【ゆうき】 có chữ Hán tương ứng là 勇気. Nghĩa: Dũng khí, can đảm.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '十分な 睡眠時間を 確保することが 健康の 秘訣です。', '睡', 'スイ', '["スイ", "スイす", "おスイ", "スイる"]', 'Chữ 睡 (THỤY) trong câu đọc là スイ. Nghĩa: Buồn ngủ, giấc ngủ.', 1, NOW()),
        (v_ch_id, 'READING', '心地よい 音楽を 聴きながら 眠りに つきます。', '眠', 'ねむる', '["ねむる", "ねむるす", "おねむる", "ねむた"]', 'Chữ 眠 (MIÊN) trong câu đọc là ねむる. Nghĩa: Ngủ say, nhắm mắt.', 2, NOW()),
        (v_ch_id, 'READING', '館内は 全面 禁煙で 喫煙席は ありません。', '喫', 'キツ', '["キツ", "キツす", "おキツ", "キツる"]', 'Chữ 喫 (KHIẾT) trong câu đọc là キツ. Nghĩa: Ăn uống, hút thuốc.', 3, NOW()),
        (v_ch_id, 'READING', '煙突から 白い 煙が もくもくと 立ち上っています。', '煙', 'けむる', '["けむる", "けむるす", "おけむる", "けむた"]', 'Chữ 煙 (YÊN) trong câu đọc là けむる. Nghĩa: Khói, bốc khói.', 4, NOW()),
        (v_ch_id, 'READING', '脂っこい 料理を 控えて 野菜を 多く 食べます。', '脂', 'あぶら', '["あぶら", "あぶらす", "おあぶら", "あぶらる"]', 'Chữ 脂 (CHI) trong câu đọc là あぶら. Nghĩa: Chất béo, mỡ động vật.', 5, NOW()),
        (v_ch_id, 'READING', '適度な 運動で 体脂肪を 燃焼させます。', '肪', 'ボウ', '["ボウ", "ボウす", "おボウ", "ボウる"]', 'Chữ 肪 (PHƯƠNG) trong câu đọc là ボウ. Nghĩa: Mỡ, mỡ thừa.', 6, NOW()),
        (v_ch_id, 'READING', '妊娠中の 妻を 家族みんなで 温かく 支えます。', '妊', 'ニン', '["ニン", "ニンす", "おニン", "ニンる"]', 'Chữ 妊 (NHÂM) trong câu đọc là ニン. Nghĩa: Mang thai, thai nghén.', 7, NOW()),
        (v_ch_id, 'READING', '病院の 産婦人科で 妊娠が 確認されました。', '娠', 'シン', '["シン", "シンす", "おシン", "シンる"]', 'Chữ 娠 (THẦN) trong câu đọc là シン. Nghĩa: Có thai, thai nghén.', 8, NOW()),
        (v_ch_id, 'READING', '街で そっくりな 双子の 兄弟を 見かけました。', '双', 'ふた', '["ふた", "ふたす", "おふた", "ふたる"]', 'Chữ 双 (SONG) trong câu đọc là ふた. Nghĩa: Đôi, hai, song sinh.', 9, NOW()),
        (v_ch_id, 'READING', '親友の 誕生日に 心を 込めた プレゼントを 贈ります。', '誕', 'タン', '["タン", "タンす", "おタン", "タンる"]', 'Chữ 誕 (ĐẢN) trong câu đọc là タン. Nghĩa: Sinh ra, chào đời.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【すいみん】 の 手続きを 行います。', 'すいみん', '睡眠', '["睡眠", "睡人", "眠睡", "新眠"]', 'Từ 【すいみん】 có chữ Hán tương ứng là 睡眠. Nghĩa: Giấc ngủ, ngủ nghỉ.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きつえん】 の 手続きを 行います。', 'きつえん', '喫煙', '["喫煙", "喫人", "煙喫", "新煙"]', 'Từ 【きつえん】 có chữ Hán tương ứng là 喫煙. Nghĩa: Hút thuốc lá.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しぼう】 の 手続きを 行います。', 'しぼう', '脂肪', '["脂肪", "脂人", "肪脂", "新肪"]', 'Từ 【しぼう】 có chữ Hán tương ứng là 脂肪. Nghĩa: Chất béo, mỡ thừa.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【にんしん】 の 手続きを 行います。', 'にんしん', '妊娠', '["妊娠", "妊人", "娠妊", "新娠"]', 'Từ 【にんしん】 có chữ Hán tương ứng là 妊娠. Nghĩa: Mang thai, thai nghén.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ふたご】 の 手続きを 行います。', 'ふたご', '双子', '["双子", "双人", "子双", "新子"]', 'Từ 【ふたご】 có chữ Hán tương ứng là 双子. Nghĩa: Sinh đôi, con sinh đôi.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【みゃくはく】 の 手続きを 行います。', 'みゃくはく', '脈拍', '["脈拍", "脈人", "拍脈", "新拍"]', 'Từ 【みゃくはく】 có chữ Hán tương ứng là 脈拍. Nghĩa: Nhịp đập mạch máu.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんごし】 の 手続きを 行います。', 'かんごし', '看護師', '["看護師", "看人", "護看", "新護師"]', 'Từ 【かんごし】 có chữ Hán tương ứng là 看護師. Nghĩa: Y tá, điều dưỡng viên.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんじゃ】 の 手続きを 行います。', 'かんじゃ', '患者', '["患者", "患人", "者患", "新者"]', 'Từ 【かんじゃ】 có chữ Hán tương ứng là 患者. Nghĩa: Bệnh nhân.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しりょく】 の 手続きを 行います。', 'しりょく', '視力', '["視力", "視人", "力視", "新力"]', 'Từ 【しりょく】 có chữ Hán tương ứng là 視力. Nghĩa: Thị lực, tầm nhìn.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さっきん】 の 手続きを 行います。', 'さっきん', '殺菌', '["殺菌", "殺人", "菌殺", "新菌"]', 'Từ 【さっきん】 có chữ Hán tương ứng là 殺菌. Nghĩa: Sát trùng, diệt khuẩn.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せんざい】 の 手続きを 行います。', 'せんざい', '洗剤', '["洗剤", "洗人", "剤洗", "新剤"]', 'Từ 【せんざい】 có chữ Hán tương ứng là 洗剤. Nghĩa: Chất tẩy rửa, bột giặt.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しげき】 の 手続きを 行います。', 'しげき', '刺激', '["刺激", "刺人", "激刺", "新激"]', 'Từ 【しげき】 có chữ Hán tương ứng là 刺激. Nghĩa: Kích thích, cay rát.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '庭の チューリップが 綺麗に 咲きました。', '咲', 'さく', '["さく", "さくす", "おさく", "さくる"]', 'Chữ 咲 (TIẾU) trong câu đọc là さく. Nghĩa: Hoa nở rộ.', 1, NOW()),
        (v_ch_id, 'READING', '水やりを 忘れて 鉢植えの 花が 枯れてしまいました。', '枯', 'かれる', '["かれる", "かれるす", "おかれる", "かれた"]', 'Chữ 枯 (KHÔ) trong câu đọc là かれる. Nghĩa: Khô héo, tàn lụi.', 2, NOW()),
        (v_ch_id, 'READING', '風に 吹かれて 桜の 花びらが 舞い散ります。', '散', 'ちる', '["ちる", "ちるす", "おちる", "ちた"]', 'Chữ 散 (TÁN) trong câu đọc là ちる. Nghĩa: Tản mác, rơi rụng.', 3, NOW()),
        (v_ch_id, 'READING', '部屋を 綺麗な 風船で 飾り付けます。', '飾', 'かざる', '["かざる", "かざるす", "おかざる", "かざた"]', 'Chữ 飾 (SỨC) trong câu đọc là かざる. Nghĩa: Trang trí, chưng diện.', 4, NOW()),
        (v_ch_id, 'READING', '秋になると 菊の 展示会が 各地で 開かれます。', '菊', 'キク', '["キク", "キクす", "おキク", "キクる"]', 'Chữ 菊 (CÚC) trong câu đọc là キク. Nghĩa: Hoa cúc hoàng gia.', 5, NOW()),
        (v_ch_id, 'READING', '鳥が 木の 枝に 止まって さえずっています。', '枝', 'えだ', '["えだ", "えだす", "おえだ", "えだる"]', 'Chữ 枝 (CHI) trong câu đọc là えだ. Nghĩa: Cành cây, nhánh cây.', 6, NOW()),
        (v_ch_id, 'READING', '紺色の スーツを 着て 面接に 臨みます。', '紺', 'コン', '["コン", "コンす", "おコン", "コンる"]', 'Chữ 紺 (CÁM) trong câu đọc là コン. Nghĩa: Xanh lam sẫm, xanh navy.', 7, NOW()),
        (v_ch_id, 'READING', '初夏に 綺麗な 紫色の アジサイが 咲きます。', '紫', 'むらさき', '["むらさき", "むらさきす", "おむらさき", "むらさきる"]', 'Chữ 紫 (TỬ) trong câu đọc là むらさき. Nghĩa: Màu tím quý phái.', 8, NOW()),
        (v_ch_id, 'READING', '秋の 山々が 美しい 紅葉に 染まっています。', '紅', 'べに', '["べに", "べにす", "おべに", "べにる"]', 'Chữ 紅 (HỒNG) trong câu đọc là べに. Nghĩa: Màu đỏ thắm, hồng trà.', 9, NOW()),
        (v_ch_id, 'READING', '火山灰が 風に 乗って 広範囲に 降りました。', '灰', 'はい', '["はい", "はいす", "おはい", "はいる"]', 'Chữ 灰 (HÔI) trong câu đọc là はい. Nghĩa: Tro tàn, màu xám tro.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【まんかい】 の 手続きを 行います。', 'まんかい', '満開', '["満開", "満人", "開満", "新開"]', 'Từ 【まんかい】 có chữ Hán tương ứng là 満開. Nghĩa: Nở rộ (hoa nở đầy cành).', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【あざやか】 の 手続きを 行います。', 'あざやか', '鮮やか', '["鮮やか", "鮮人", "や鮮", "新やか"]', 'Từ 【あざやか】 có chữ Hán tương ứng là 鮮やか. Nghĩa: Rực rỡ, tươi thắm.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しいく】 の 手続きを 行います。', 'しいく', '飼育', '["飼育", "飼人", "育飼", "新育"]', 'Từ 【しいく】 có chữ Hán tương ứng là 飼育. Nghĩa: Nuôi nấng, chăn nuôi.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ほうぼく】 の 手続きを 行います。', 'ほうぼく', '放牧', '["放牧", "放人", "牧放", "新牧"]', 'Từ 【ほうぼく】 có chữ Hán tương ứng là 放牧. Nghĩa: Chăn thả gia súc ngoài đồng.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【たき】 の 手続きを 行います。', 'たき', '滝', '["滝", "滝所", "滝的", "大滝"]', 'Từ 【たき】 có chữ Hán tương ứng là 滝. Nghĩa: Thác nước.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【とうけつ】 の 手続きを 行います。', 'とうけつ', '凍結', '["凍結", "凍人", "結凍", "新結"]', 'Từ 【とうけつ】 có chữ Hán tương ứng là 凍結. Nghĩa: Đóng băng, đông cứng.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【すいてき】 の 手続きを 行います。', 'すいてき', '水滴', '["水滴", "水人", "滴水", "新滴"]', 'Từ 【すいてき】 có chữ Hán tương ứng là 水滴. Nghĩa: Giọt nước nhỏ.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はっくつ】 の 手続きを 行います。', 'はっくつ', '発掘', '["発掘", "発人", "掘発", "新掘"]', 'Từ 【はっくつ】 có chữ Hán tương ứng là 発掘. Nghĩa: Khai quật khảo cổ.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せきたん】 の 手続きを 行います。', 'せきたん', '石炭', '["石炭", "石人", "炭石", "新炭"]', 'Từ 【せきたん】 có chữ Hán tương ứng là 石炭. Nghĩa: Than đá.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうざん】 の 手続きを 行います。', 'こうざん', '鉱山', '["鉱山", "鉱人", "山鉱", "新山"]', 'Từ 【こうざん】 có chữ Hán tương ứng là 鉱山. Nghĩa: Mỏ quặng.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【どう】 の 手続きを 行います。', 'どう', '銅', '["銅", "銅所", "銅的", "大銅"]', 'Từ 【どう】 có chữ Hán tương ứng là 銅. Nghĩa: Kim loại đồng.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【どうくつ】 の 手続きを 行います。', 'どうくつ', '洞窟', '["洞窟", "洞人", "窟洞", "新窟"]', 'Từ 【どうくつ】 có chữ Hán tương ứng là 洞窟. Nghĩa: Hang động thiên nhiên.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '暴力は いけません。人を 殴ってはいけません。', '殴', 'なぐる', '["なぐる", "なぐるす", "おなぐる", "なぐた"]', 'Chữ 殴 (ẨU) trong câu đọc là なぐる. Nghĩa: Đánh đấm, ẩu đả.', 1, NOW()),
        (v_ch_id, 'READING', '助けを 求めて 大声で 叫びました。', '叫', 'さけぶ', '["さけぶ", "さけぶす", "おさけぶ", "さけぶる"]', 'Chữ 叫 (KHIẾU) trong câu đọc là さけぶ. Nghĩa: Hét to, gào thét.', 2, NOW()),
        (v_ch_id, 'READING', 'お化け屋敷で 怖い 体験を しました。', '怖', 'こわい', '["こわい", "こわいす", "おこわい", "こわいる"]', 'Chữ 怖 (PHỐ) trong câu đọc là こわい. Nghĩa: Sợ hãi, đáng sợ.', 3, NOW()),
        (v_ch_id, 'READING', '嫌な ことが あっても 前を 向いて 歩きます。', '嫌', 'きらう', '["きらう", "きらうす", "おきらう", "きらうる"]', 'Chữ 嫌 (HIỀM) trong câu đọc là きらう. Nghĩa: Ghét bỏ, khó chịu.', 4, NOW()),
        (v_ch_id, 'READING', '罪を 憎んで 人を 憎まず。', '憎', 'にくむ', '["にくむ", "にくむす", "おにくむ", "にくむる"]', 'Chữ 憎 (TĂNG) trong câu đọc là にくむ. Nghĩa: Căm ghét, căm thù.', 5, NOW()),
        (v_ch_id, 'READING', '大勢の 前で 失敗して 恥ずかしかったです。', '恥', 'はじる', '["はじる", "はじるす", "おはじる", "はじた"]', 'Chữ 恥 (SỈ) trong câu đọc là はじる. Nghĩa: Xấu hổ, sỉ nhục.', 6, NOW()),
        (v_ch_id, 'READING', '判断を 誤ると 大きな 損失に つながります。', '誤', 'あやまる', '["あやまる", "あやまるす", "おあやまる", "あやまた"]', 'Chữ 誤 (NGỘ) trong câu đọc là あやまる. Nghĩa: Sai lầm, hiểu lầm.', 7, NOW()),
        (v_ch_id, 'READING', '迷惑を かけた ことを 素直に 謝りました。', '謝', 'あやまる', '["あやまる", "あやまるす", "おあやまる", "あやまた"]', 'Chữ 謝 (TẠ) trong câu đọc là あやまる. Nghĩa: Xin lỗi, tạ ơn.', 8, NOW()),
        (v_ch_id, 'READING', '落ち込んでいる 友人を 優しく 励まします。', '励', 'はげます', '["はげます", "はげま", "おはげます", "はげまする"]', 'Chữ 励 (LỆ) trong câu đọc là はげます. Nghĩa: Khích lệ, cổ vũ.', 9, NOW()),
        (v_ch_id, 'READING', '冗談を 言って みんなを 笑わせました。', '冗', 'ジョウ', '["ジョウ", "ジョウす", "おジョウ", "ジョウる"]', 'Chữ 冗 (NHŨNG) trong câu đọc là ジョウ. Nghĩa: Đùa cợt, nhàn rỗi, thừa thãi.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【えんかい】 の 手続きを 行います。', 'えんかい', '宴会', '["宴会", "宴人", "会宴", "新会"]', 'Từ 【えんかい】 có chữ Hán tương ứng là 宴会. Nghĩa: Bữa tiệc, tiệc tùng liên hoan.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かいさい】 の 手続きを 行います。', 'かいさい', '開催', '["開催", "開人", "催開", "新催"]', 'Từ 【かいさい】 có chữ Hán tương ứng là 開催. Nghĩa: Tổ chức, đăng cai.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんぱい】 の 手続きを 行います。', 'かんぱい', '乾杯', '["乾杯", "乾人", "杯乾", "新杯"]', 'Từ 【かんぱい】 có chữ Hán tương ứng là 乾杯. Nghĩa: Cạn ly, chúc mừng.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【てつや】 の 手続きを 行います。', 'てつや', '徹夜', '["徹夜", "徹人", "夜徹", "新夜"]', 'Từ 【てつや】 có chữ Hán tương ứng là 徹夜. Nghĩa: Thức trắng đêm.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【どうりょう】 の 手続きを 行います。', 'どうりょう', '同僚', '["同僚", "同人", "僚同", "新僚"]', 'Từ 【どうりょう】 có chữ Hán tương ứng là 同僚. Nghĩa: Đồng nghiệp cùng cơ quan.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せんぱい】 の 手続きを 行います。', 'せんぱい', '先輩', '["先輩", "先人", "輩先", "新輩"]', 'Từ 【せんぱい】 có chữ Hán tương ứng là 先輩. Nghĩa: Tiền bối, đàn anh đàn chị.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【まご】 の 手続きを 行います。', 'まご', '孫', '["孫", "孫所", "孫的", "大孫"]', 'Từ 【まご】 có chữ Hán tương ứng là 孫. Nghĩa: Cháu nội, cháu ngoại.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【そふぼ】 の 手続きを 行います。', 'そふぼ', '祖父母', '["祖父母", "祖人", "父祖", "新父母"]', 'Từ 【そふぼ】 có chữ Hán tương ứng là 祖父母. Nghĩa: Ông bà.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しょうち】 の 手続きを 行います。', 'しょうち', '承知', '["承知", "承人", "知承", "新知"]', 'Từ 【しょうち】 có chữ Hán tương ứng là 承知. Nghĩa: Tôi đã rõ, đồng thuận.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【うかがう】 の 手続きを 行います。', 'うかがう', '伺う', '["伺う", "伺人", "う伺", "新う"]', 'Từ 【うかがう】 có chữ Hán tương ứng là 伺う. Nghĩa: Đến thăm, hỏi thăm (khiêm nhường).', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いただく】 の 手続きを 行います。', 'いただく', '頂く', '["頂く", "頂人", "く頂", "新く"]', 'Từ 【いただく】 có chữ Hán tương ứng là 頂く. Nghĩa: Nhận, ăn uống (khiêm nhường).', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【めしあがる】 の 手続きを 行います。', 'めしあがる', '召し上がる', '["召し上がる", "召人", "し召", "新し上がる"]', 'Từ 【めしあがる】 có chữ Hán tương ứng là 召し上がる. Nghĩa: Mời xơi, dùng bữa (kính ngữ).', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '台風で 各地に 甚大な 被害が 出ました。', '被', 'こうむる', '["こうむる", "こうむるす", "おこうむる", "こうむた"]', 'Chữ 被 (BỊ) trong câu đọc là こうむる. Nghĩa: Bị tổn hại, chịu ảnh hưởng.', 1, NOW()),
        (v_ch_id, 'READING', '地震で 古い 家屋が 倒壊しました。', '壊', 'こわす', '["こわす", "こわ", "おこわす", "こわする"]', 'Chữ 壊 (HOẠI) trong câu đọc là こわす. Nghĩa: Hư hại, phá hủy.', 2, NOW()),
        (v_ch_id, 'READING', '強い 地震で 建物が 少し 傾きました。', '傾', 'かたむく', '["かたむく", "かたむくす", "おかたむく", "かたむくる"]', 'Chữ 傾 (KHUYNH) trong câu đọc là かたむく. Nghĩa: Nghiêng ngả, dốc sức.', 3, NOW()),
        (v_ch_id, 'READING', '大雨の 影響で 山肌が 崩れ落ちました。', '崩', 'くずれる', '["くずれる", "くずれるす", "おくずれる", "くずれた"]', 'Chữ 崩 (BĂNG) trong câu đọc là くずれる. Nghĩa: Sạt lở, sụp đổ.', 4, NOW()),
        (v_ch_id, 'READING', '火山が 激しく 噴煙を 噴き上げました。', '噴', 'ふく', '["ふく", "ふくす", "おふく", "ふくる"]', 'Chữ 噴 (PHÚN) trong câu đọc là ふく. Nghĩa: Phun trào, bốc hơi.', 5, NOW()),
        (v_ch_id, 'READING', '激しい 炎が 工場全体を 包み込みました。', '炎', 'ほのお', '["ほのお", "ほのおす", "おほのお", "ほのおる"]', 'Chữ 炎 (VIÊM) trong câu đọc là ほのお. Nghĩa: Ngọn lửa, bốc hỏa, viêm sưng.', 6, NOW()),
        (v_ch_id, 'READING', '連日の 豪雨で 河川が 氾濫し 洪水と なりました。', '洪', 'コウ', '["コウ", "コウす", "おコウ", "コウる"]', 'Chữ 洪 (HỒNG) trong câu đọc là コウ. Nghĩa: Lũ lụt lớn, dâng trào.', 7, NOW()),
        (v_ch_id, 'READING', '深い 潭の 底に 澄んだ 水が 溜まっています。', '潭', 'タン', '["タン", "タンす", "おタン", "タンる"]', 'Chữ 潭 (ĐÀM) trong câu đọc là タン. Nghĩa: Vực nước sâu, đầm sâu.', 8, NOW()),
        (v_ch_id, 'READING', '海岸に 白い 波が 打ち寄せています。', '波', 'なみ', '["なみ", "なみす", "おなみ", "なみる"]', 'Chữ 波 (BA) trong câu đọc là なみ. Nghĩa: Sóng biển, lan tỏa.', 9, NOW()),
        (v_ch_id, 'READING', '冬の 日本海は 波が 荒いです。', '荒', 'あらい', '["あらい", "あらいす", "おあらい", "あらいる"]', 'Chữ 荒 (HOANG) trong câu đọc là あらい. Nghĩa: Hoang vu, hung dữ, thô bạo.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ひがい】 の 手続きを 行います。', 'ひがい', '被害', '["被害", "被人", "害被", "新害"]', 'Từ 【ひがい】 có chữ Hán tương ứng là 被害. Nghĩa: Thiệt hại, tổn thất.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ほうかい】 の 手続きを 行います。', 'ほうかい', '崩壊', '["崩壊", "崩人", "壊崩", "新壊"]', 'Từ 【ほうかい】 có chữ Hán tương ứng là 崩壊. Nghĩa: Sụp đổ, sạt lở tan hoang.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ふんか】 の 手続きを 行います。', 'ふんか', '噴火', '["噴火", "噴人", "火噴", "新火"]', 'Từ 【ふんか】 có chữ Hán tương ứng là 噴火. Nghĩa: Núi lửa phun trào.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【つなみ】 の 手続きを 行います。', 'つなみ', '津波', '["津波", "津人", "波津", "新波"]', 'Từ 【つなみ】 có chữ Hán tương ứng là 津波. Nghĩa: Sóng thần.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうずい】 の 手続きを 行います。', 'こうずい', '洪水', '["洪水", "洪人", "水洪", "新水"]', 'Từ 【こうずい】 có chữ Hán tương ứng là 洪水. Nghĩa: Lũ lụt dâng cao.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぼうふうう】 の 手続きを 行います。', 'ぼうふうう', '暴風雨', '["暴風雨", "暴人", "風暴", "新風雨"]', 'Từ 【ぼうふうう】 có chữ Hán tương ứng là 暴風雨. Nghĩa: Mưa bão dữ dội.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かんそう】 の 手続きを 行います。', 'かんそう', '乾燥', '["乾燥", "乾人", "燥乾", "新燥"]', 'Từ 【かんそう】 có chữ Hán tương ứng là 乾燥. Nghĩa: Khô ráo, khô hạn.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しつど】 の 手続きを 行います。', 'しつど', '湿度', '["湿度", "湿人", "度湿", "新度"]', 'Từ 【しつど】 có chữ Hán tương ứng là 湿度. Nghĩa: Độ ẩm không khí.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【せいりょう】 の 手続きを 行います。', 'せいりょう', '清涼', '["清涼", "清人", "涼清", "新涼"]', 'Từ 【せいりょう】 có chữ Hán tương ứng là 清涼. Nghĩa: Mát mẻ, thanh lương.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【あらし】 の 手続きを 行います。', 'あらし', '嵐', '["嵐", "嵐所", "嵐的", "大嵐"]', 'Từ 【あらし】 có chữ Hán tương ứng là 嵐. Nghĩa: Cơn giông tố, bão lớn.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はげしい】 の 手続きを 行います。', 'はげしい', '激しい', '["激しい", "激人", "し激", "新しい"]', 'Từ 【はげしい】 có chữ Hán tương ứng là 激しい. Nghĩa: Dữ dội, khốc liệt.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【こうてん】 の 手続きを 行います。', 'こうてん', '荒天', '["荒天", "荒人", "天荒", "新天"]', 'Từ 【こうてん】 có chữ Hán tương ứng là 荒天. Nghĩa: Thời tiết xấu, giông bão.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '松尾芭蕉の 有名な 俳句を 暗記します。', '俳', 'ハイ', '["ハイ", "ハイす", "おハイ", "ハイる"]', 'Chữ 俳 (BÀI) trong câu đọc là ハイ. Nghĩa: Thơ Haiku, diễn viên tuồng.', 1, NOW()),
        (v_ch_id, 'READING', '心に 響く 名句を ノートに 書き留めます。', '句', 'ク', '["ク", "クす", "おク", "クる"]', 'Chữ 句 (CÚ) trong câu đọc là ク. Nghĩa: Câu cú, câu thơ.', 2, NOW()),
        (v_ch_id, 'READING', 'この 歌の 歌詞は とても 感動的です。', '詞', 'シ', '["シ", "シす", "おシ", "シる"]', 'Chữ 詞 (TỪ) trong câu đọc là シ. Nghĩa: Ca từ, từ ngữ.', 3, NOW()),
        (v_ch_id, 'READING', '展覧会で 素晴らしい 芸術作品を 観覧します。', '覧', 'ラン', '["ラン", "ランす", "おラン", "ランる"]', 'Chữ 覧 (LÃM) trong câu đọc là ラン. Nghĩa: Xem xét, chiêm ngưỡng.', 4, NOW()),
        (v_ch_id, 'READING', 'クラスの 出席簿を つけて 点呼を 行います。', '簿', 'ボ', '["ボ", "ボす", "おボ", "ボる"]', 'Chữ 簿 (BỘ) trong câu đọc là ボ. Nghĩa: Sổ sách, danh bạ.', 5, NOW()),
        (v_ch_id, 'READING', '放課後に 学習塾に 通って 受験勉強を します。', '塾', 'ジュク', '["ジュク", "ジュクす", "おジュク", "ジュクる"]', 'Chữ 塾 (THỤC) trong câu đọc là ジュク. Nghĩa: Trường tư thục, lò luyện thi.', 6, NOW()),
        (v_ch_id, 'READING', '盆踊りで 音楽に 合わせて 楽しく 踊ります。', '踊', 'おどる', '["おどる", "おどるす", "どる", "おどた"]', 'Chữ 踊 (DŨNG) trong câu đọc là おどる. Nghĩa: Nhảy múa, vũ đạo.', 7, NOW()),
        (v_ch_id, 'READING', '公園の 中央に 英雄の 銅像が 立っています。', '像', 'ゾウ', '["ゾウ", "ゾウす", "おゾウ", "ゾウる"]', 'Chữ 像 (TƯỢNG) trong câu đọc là ゾウ. Nghĩa: Bức tượng, hình ảnh.', 8, NOW()),
        (v_ch_id, 'READING', '歴史ある 神殿を 訪れて 祈りを 捧げます。', '殿', 'との', '["との", "とのす", "おとの", "とのる"]', 'Chữ 殿 (ĐIỆN) trong câu đọc là との. Nghĩa: Cung điện, cung đình, ngài.', 9, NOW()),
        (v_ch_id, 'READING', 'お寺の お坊さんが 鐘を ついています。', '坊', 'ボウ', '["ボウ", "ボウす", "おボウ", "ボウる"]', 'Chữ 坊 (PHƯỜNG) trong câu đọc là ボウ. Nghĩa: Chú tiểu, con trai bé, phố phường.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【はいく】 の 手続きを 行います。', 'はいく', '俳句', '["俳句", "俳人", "句俳", "新句"]', 'Từ 【はいく】 có chữ Hán tương ứng là 俳句. Nghĩa: Thơ Haiku truyền thống.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【めいぼ】 の 手続きを 行います。', 'めいぼ', '名簿', '["名簿", "名人", "簿名", "新簿"]', 'Từ 【めいぼ】 có chữ Hán tương ứng là 名簿. Nghĩa: Danh sách họ tên, sổ danh bạ.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ちょうぞう】 の 手続きを 行います。', 'ちょうぞう', '彫像', '["彫像", "彫人", "像彫", "新像"]', 'Từ 【ちょうぞう】 có chữ Hán tương ứng là 彫像. Nghĩa: Tượng điêu khắc.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いせき】 の 手続きを 行います。', 'いせき', '遺跡', '["遺跡", "遺人", "跡遺", "新跡"]', 'Từ 【いせき】 có chữ Hán tương ứng là 遺跡. Nghĩa: Di tích lịch sử cổ xưa.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けいばつ】 の 手続きを 行います。', 'けいばつ', '刑罰', '["刑罰", "刑人", "罰刑", "新罰"]', 'Từ 【けいばつ】 có chữ Hán tương ứng là 刑罰. Nghĩa: Hình phạt pháp luật.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【そうさ】 の 手続きを 行います。', 'そうさ', '捜査', '["捜査", "捜人", "査捜", "新査"]', 'Từ 【そうさ】 có chữ Hán tương ứng là 捜査. Nghĩa: Điều tra vụ án.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さいばん】 の 手続きを 行います。', 'さいばん', '裁判', '["裁判", "裁人", "判裁", "新判"]', 'Từ 【さいばん】 có chữ Hán tương ứng là 裁判. Nghĩa: Xét xử, phiên tòa.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ちつじょ】 の 手続きを 行います。', 'ちつじょ', '秩序', '["秩序", "秩人", "序秩", "新序"]', 'Từ 【ちつじょ】 có chữ Hán tương ứng là 秩序. Nghĩa: Trật tự kỷ cương.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ないかく】 の 手続きを 行います。', 'ないかく', '内閣', '["内閣", "内人", "閣内", "新閣"]', 'Từ 【ないかく】 có chữ Hán tương ứng là 内閣. Nghĩa: Nội các chính phủ.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【どうめい】 の 手続きを 行います。', 'どうめい', '同盟', '["同盟", "同人", "盟同", "新盟"]', 'Từ 【どうめい】 có chữ Hán tương ứng là 同盟. Nghĩa: Liên minh, đồng minh.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぼうえい】 の 手続きを 行います。', 'ぼうえい', '防衛', '["防衛", "防人", "衛防", "新衛"]', 'Từ 【ぼうえい】 có chữ Hán tương ứng là 防衛. Nghĩa: Phòng vệ quốc gia.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【けんぽう】 の 手続きを 行います。', 'けんぽう', '憲法', '["憲法", "憲人", "法憲", "新法"]', 'Từ 【けんぽう】 có chữ Hán tương ứng là 憲法. Nghĩa: Hiến pháp quốc gia.', 22, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '大阪は 関西地方の 経済と 文化の 中心です。', '阪', 'さか', '["さか", "さかす", "おさか", "さかる"]', 'Chữ 阪 (PHẢN) trong câu đọc là さか. Nghĩa: Sườn dốc, địa danh Osaka.', 1, NOW()),
        (v_ch_id, 'READING', '埼玉県は 東京の 北に 隣接しています。', '埼', 'さき', '["さき", "さきす", "おさき", "さきる"]', 'Chữ 埼 (KÌ) trong câu đọc là さき. Nghĩa: Mũi đất, địa danh Saitama.', 2, NOW()),
        (v_ch_id, 'READING', '栃木県の 日光東照宮は 世界遺産です。', '栃', 'とち', '["とち", "とちす", "おとち", "とちる"]', 'Chữ 栃 (DẺ) trong câu đọc là とち. Nghĩa: Cây dẻ ngựa, tỉnh Tochigi.', 3, NOW()),
        (v_ch_id, 'READING', '茨城県の 偕楽園は 梅の 名所として 有名です。', '茨', 'いばら', '["いばら", "いばらす", "おいばら", "いばらる"]', 'Chữ 茨 (TỲ) trong câu đọc là いばら. Nghĩa: Cây gai, tỉnh Ibaraki.', 4, NOW()),
        (v_ch_id, 'READING', '山梨県は 富士山と ぶどうの 産地です。', '梨', 'なし', '["なし", "なしす", "おなし", "なしる"]', 'Chữ 梨 (LÊ) trong câu đọc là なし. Nghĩa: Quả lê, tỉnh Yamanashi.', 5, NOW()),
        (v_ch_id, 'READING', '群馬県には 草津温泉など 多くの 温泉が あります。', '群', 'むれる', '["むれる", "むれるす", "おむれる", "むれた"]', 'Chữ 群 (QUẦN) trong câu đọc là むれる. Nghĩa: Đàn, bầy, tỉnh Gunma.', 6, NOW()),
        (v_ch_id, 'READING', '奈良公園で 鹿に せんべいを あげました。', '鹿', 'しか', '["しか", "しかす", "おしか", "しかる"]', 'Chữ 鹿 (LỘC) trong câu đọc là しか. Nghĩa: Con hươu nai, Kagoshima.', 7, NOW()),
        (v_ch_id, 'READING', '奈良時代に 建立された 東大寺の 大仏。', '奈', 'ナ', '["ナ", "ナす", "おナ", "ナる"]', 'Chữ 奈 (NẠI) trong câu đọc là ナ. Nghĩa: Tỉnh Nara, cây mận dại.', 8, NOW()),
        (v_ch_id, 'READING', '愛媛県は みかんの 生産量で 日本一を 誇ります。', '媛', 'エン', '["エン", "エンす", "おエン", "エンる"]', 'Chữ 媛 (VIỆN) trong câu đọc là エン. Nghĩa: Người đẹp, tỉnh Ehime.', 9, NOW()),
        (v_ch_id, 'READING', '岐阜県の 白川郷は 合掌造りの 集落で 有名です。', '阜', 'フ', '["フ", "フす", "おフ", "フる"]', 'Chữ 阜 (PHỤ) trong câu đọc là フ. Nghĩa: Gò đất cao, tỉnh Gifu.', 10, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【おおさかふ】 の 手続きを 行います。', 'おおさかふ', '大阪府', '["大阪府", "大人", "阪大", "新阪府"]', 'Từ 【おおさかふ】 có chữ Hán tương ứng là 大阪府. Nghĩa: Phủ Osaka.', 11, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【さいたまけん】 の 手続きを 行います。', 'さいたまけん', '埼玉県', '["埼玉県", "埼人", "玉埼", "新玉県"]', 'Từ 【さいたまけん】 có chữ Hán tương ứng là 埼玉県. Nghĩa: Tỉnh Saitama.', 12, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【とちぎけん】 の 手続きを 行います。', 'とちぎけん', '栃木県', '["栃木県", "栃人", "木栃", "新木県"]', 'Từ 【とちぎけん】 có chữ Hán tương ứng là 栃木県. Nghĩa: Tỉnh Tochigi.', 13, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【いばらきけん】 の 手続きを 行います。', 'いばらきけん', '茨城県', '["茨城県", "茨人", "城茨", "新城県"]', 'Từ 【いばらきけん】 có chữ Hán tương ứng là 茨城県. Nghĩa: Tỉnh Ibaraki.', 14, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぐんまけん】 の 手続きを 行います。', 'ぐんまけん', '群馬県', '["群馬県", "群人", "馬群", "新馬県"]', 'Từ 【ぐんまけん】 có chữ Hán tương ứng là 群馬県. Nghĩa: Tỉnh Gunma.', 15, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【かごしまけん】 の 手続きを 行います。', 'かごしまけん', '鹿児島県', '["鹿児島県", "鹿人", "児鹿", "新児島県"]', 'Từ 【かごしまけん】 có chữ Hán tương ứng là 鹿児島県. Nghĩa: Tỉnh Kagoshima.', 16, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ならけん】 の 手続きを 行います。', 'ならけん', '奈良県', '["奈良県", "奈人", "良奈", "新良県"]', 'Từ 【ならけん】 có chữ Hán tương ứng là 奈良県. Nghĩa: Tỉnh Nara.', 17, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【えひめけん】 の 手続きを 行います。', 'えひめけん', '愛媛県', '["愛媛県", "愛人", "媛愛", "新媛県"]', 'Từ 【えひめけん】 có chữ Hán tương ứng là 愛媛県. Nghĩa: Tỉnh Ehime.', 18, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【ぎふけん】 の 手続きを 行います。', 'ぎふけん', '岐阜県', '["岐阜県", "岐人", "阜岐", "新阜県"]', 'Từ 【ぎふけん】 có chữ Hán tương ứng là 岐阜県. Nghĩa: Tỉnh Gifu.', 19, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【しずおかけん】 の 手続きを 行います。', 'しずおかけん', '静岡県', '["静岡県", "静人", "岡静", "新岡県"]', 'Từ 【しずおかけん】 có chữ Hán tương ứng là 静岡県. Nghĩa: Tỉnh Shizuoka.', 20, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【みやざきけん】 の 手続きを 行います。', 'みやざきけん', '宮崎県', '["宮崎県", "宮人", "崎宮", "新崎県"]', 'Từ 【みやざきけん】 có chữ Hán tương ứng là 宮崎県. Nghĩa: Tỉnh Miyazaki.', 21, NOW()),
        (v_ch_id, 'WRITING', 'ここで 【きゅうりょう】 の 手続きを 行います。', 'きゅうりょう', '丘陵', '["丘陵", "丘人", "陵丘", "新陵"]', 'Từ 【きゅうりょう】 có chữ Hán tương ứng là 丘陵. Nghĩa: Đồi núi thoai thoải.', 22, NOW());
    END IF;
END $$;

-- 5. SEED KANJI MINIGAMES
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'RADICAL_COMBINE', 'Minigame 1: Ghép bộ thủ Ⓐ + Ⓑ tạo chữ Hán chủ đề Đời sống & Quà tặng', 'Quan sát tranh bài tập gốc p.24. Chọn một bộ phận từ Ⓐ và một bộ phận từ Ⓑ để ghép thành chữ Hán thích hợp điền vào câu:', '/assets/kanji/n2/quizzes/quiz_1_2_p1.webp', '{"colA": ["酉", "氵", "走", "宀", "扌"], "colB": ["己", "昆", "戉", "古", "帚"], "wordBank": ["配", "混", "越", "居", "掃"], "questions": [{"id": 1, "sentence": "荷物を 各家庭に [blank] 達します。", "combine": "酉 + 己", "answer": "配", "targetWord": "配達", "hiragana": "はいたつ", "meaning": "Giao hàng", "explanation": "Ghép 酉 + 己 thành chữ 配 (PHỐI) trong 配達."}, {"id": 2, "sentence": "電車が 大変 [blank] 雑しています。", "combine": "氵 + 昆", "answer": "混", "targetWord": "混雑", "hiragana": "こんざつ", "meaning": "Đông đúc, hỗn tạp", "explanation": "Ghép 氵 + 昆 thành chữ 混 (HỖN) trong 混雑."}, {"id": 3, "sentence": "来月 新しい 家に 引っ [blank] します。", "combine": "走 + 戉", "answer": "越", "targetWord": "引越", "hiragana": "ひっこし", "meaning": "Chuyển nhà", "explanation": "Ghép 走 + 戉 thành chữ 越 (VIỆT) trong 引越."}, {"id": 4, "sentence": "家族と 一緒に [blank] 間で くつろぎます。", "combine": "宀 + 古", "answer": "居", "targetWord": "居間", "hiragana": "いま", "meaning": "Phòng khách", "explanation": "Ghép 宀 + 古 thành chữ 居 (CƯ) trong 居間."}, {"id": 5, "sentence": "ほうきで 部屋を [blank] 除します。", "combine": "扌 + 帚", "answer": "掃", "targetWord": "掃除", "hiragana": "そうじ", "meaning": "Quét dọn", "explanation": "Ghép 扌 + 帚 thành chữ 掃 (TẢO) trong 掃除."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'KANJI_CROSS', 'Minigame 2: Ô chữ chữ thập Kanji 4 hướng tâm điểm — Đô thị & Ngân hàng', 'Quan sát tranh bài tập gốc p.25. Hãy tìm chữ Hán tâm điểm thích hợp để điền vào ô trống:', '/assets/kanji/n2/quizzes/quiz_1_2_p2.webp', '{"puzzles": [{"id": 1, "top": "駐", "bottom": "場", "left": "三", "right": "軸", "answer": "輪", "words": ["駐輪 (Đỗ xe)", "輪場", "三輪 (Ba bánh)", "輪軸 (Trục bánh)"], "hint": "Chữ RIN / wa (輪): Bánh xe"}, {"id": 2, "top": "出", "bottom": "入", "left": "輸", "right": "送", "answer": "輸", "words": ["輸出 (Xuất khẩu)", "輸入 (Nhập khẩu)", "運輸 (Vận chuyển)", "輸送 (Chuyên chở)"], "hint": "Chữ YU (輸): Vận chuyển"}, {"id": 3, "top": "両", "bottom": "金", "left": "取", "right": "乗", "answer": "替", "words": ["両替 (Đổi tiền)", "替金", "取替 (Thay thế)", "替乗 (Đổi chuyến)"], "hint": "Chữ KAE / tai (替): Thay thế"}, {"id": 4, "top": "通", "bottom": "面", "left": "手", "right": "簿", "answer": "帳", "words": ["通帳 (Sổ tài khoản)", "帳面 (Sổ tay)", "手帳 (Sổ ghi chép)", "帳簿 (Sổ sách)"], "hint": "Chữ CHOU (帳): Sổ sách"}], "wordBank": ["輪", "輸", "替", "帳", "港", "預", "払", "照"]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'CLOZE_DIALOGUE', 'Minigame 3: Khám phá lễ hội hoa và di sản văn hóa Nhật Bản', 'Đọc ngữ cảnh văn hóa truyền thống bên dưới và điền chữ Hán vào ô trống theo tranh p.40:', '/assets/kanji/n2/quizzes/quiz_3_4_p1.webp', '{"dialogue": [{"speaker": "ガイド", "name": "Hướng dẫn viên du lịch", "text": "春になると、公園の [blank:1] が 満開になり、甘い [blank:2] りが 漂います。"}, {"speaker": "旅行者", "name": "Du khách", "text": "歴史ある [blank:3] の 天守閣からの 眺めは 素晴らしいですね。"}, {"speaker": "ガイド", "name": "Hướng dẫn viên du lịch", "text": "はい。ここは 江戸時代に 商業都市として [blank:4] 栄した 場所です。\n夜には 伝統的な 能楽の [blank:5] 台も 公開されますよ。"}], "wordBank": ["桜", "香", "城", "繁", "舞", "梅", "展", "士"], "blanks": [{"id": 1, "num": "①", "targetWord": "桜", "hiragana": "さくら", "answer": "桜", "meaning": "Hoa anh đào", "explanation": "Chữ 桜 (ANH) trong hoa anh đào."}, {"id": 2, "num": "②", "targetWord": "香り", "hiragana": "かおり", "answer": "香", "meaning": "Hương thơm", "explanation": "Chữ 香 (HƯƠNG) trong mùi hương."}, {"id": 3, "num": "③", "targetWord": "城", "hiragana": "しろ", "answer": "城", "meaning": "Lâu đài, thành trì", "explanation": "Chữ 城 (THÀNH) trong lâu đài cổ."}, {"id": 4, "num": "④", "targetWord": "繁栄", "hiragana": "はんえい", "answer": "繁", "meaning": "Phồn vinh", "explanation": "Chữ 繁 (PHỒN) trong phồn vinh hưng thịnh."}, {"id": 5, "num": "⑤", "targetWord": "舞台", "hiragana": "ぶたい", "answer": "舞", "meaning": "Sân khấu múa kịch", "explanation": "Chữ 舞 (VŨ) trong sân khấu múa."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 4: Tư vấn sức khỏe tại phòng khám y tế', 'Lựa chọn từ ngữ Hán tự y khoa chuẩn xác điền vào chỗ trống theo tranh p.41:', '/assets/kanji/n2/quizzes/quiz_3_4_p2.webp', '{"questions": [{"id": 1, "prompt": "医師：「最近、体に 何か [blank] は ありませんか。」", "promptVi": "Bác sĩ: \"Gần đây cơ thể anh/chị có dấu hiệu dị thường nào không?\"", "options": ["異常", "正常", "通常", "日常"], "answer": "異常", "hiragana": "いじょう", "meaning": "Dị thường, bất thường", "explanation": "異常 (いじょう) nghĩa là bất thường."}, {"id": 2, "prompt": "患者：「はい、階段を 上がるときに [blank] が 痛みます。」", "promptVi": "Bệnh nhân: \"Vâng, mỗi khi bước lên cầu thang thì khớp xương lại bị đau ạ.\"", "options": ["関節", "骨折", "筋肉", "内臓"], "answer": "関節", "hiragana": "かんせつ", "meaning": "Khớp xương", "explanation": "Khớp xương bị đau nhức là 関節 (かんせつ)."}, {"id": 3, "prompt": "医師：「では、まず [blank] を 測ってから 診察しましょう。」", "promptVi": "Bác sĩ: \"Vậy trước tiên chúng ta cùng đo huyết áp rồi thăm khám nhé.\"", "options": ["血圧", "血液", "血管", "血統"], "answer": "血圧", "hiragana": "けつあつ", "meaning": "Huyết áp", "explanation": "Đo huyết áp dùng từ 血圧 (けつあつ)."}, {"id": 4, "prompt": "医師：「傷口を 消毒して 適切な [blank] を 行います。」", "promptVi": "Bác sĩ: \"Tôi sẽ sát trùng vết thương và tiến hành xử trí sơ cứu thích hợp.\"", "options": ["処置", "放置", "位置", "装置"], "answer": "処置", "hiragana": "しょち", "meaning": "Xử trí y tế", "explanation": "Sơ cứu xử lý vết thương là 処置 (しょち)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 5: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Thương trường, Tuyển dụng & Đánh giá', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 仕事:', '/assets/kanji/n2/quizzes/quiz_5_6_p1.webp', '{"chapterNumber": 5, "chapterTitle": "仕事", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Tuyển dụng, tuyển vào làm】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tuyển dụng, tuyển vào làm\"", "options": ["採用", "採的", "不採用", "用採"], "answer": "採用", "hiragana": "さいよう", "meaning": "Tuyển dụng, tuyển vào làm", "explanation": "Từ 採用 (さいよう) nghĩa là Tuyển dụng, tuyển vào làm."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Chiêu mộ, tuyển mộ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chiêu mộ, tuyển mộ\"", "options": ["募集", "募的", "不募集", "集募"], "answer": "募集", "hiragana": "ぼしゅう", "meaning": "Chiêu mộ, tuyển mộ", "explanation": "Từ 募集 (ぼしゅう) nghĩa là Chiêu mộ, tuyển mộ."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Sơ yếu lý lịch, CV】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Sơ yếu lý lịch, CV\"", "options": ["履歴書", "履的", "不履歴書", "書歴履"], "answer": "履歴書", "hiragana": "りれきしょ", "meaning": "Sơ yếu lý lịch, CV", "explanation": "Từ 履歴書 (りれきしょ) nghĩa là Sơ yếu lý lịch, CV."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Độ phù hợp, năng khiếu】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Độ phù hợp, năng khiếu\"", "options": ["適性", "適的", "不適性", "性適"], "answer": "適性", "hiragana": "てきせい", "meaning": "Độ phù hợp, năng khiếu", "explanation": "Từ 適性 (てきせい) nghĩa là Độ phù hợp, năng khiếu."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 6: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Tài chính, Doanh nghiệp & Xuất bản', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 会社:', '/assets/kanji/n2/quizzes/quiz_5_6_p2.webp', '{"chapterNumber": 6, "chapterTitle": "会社", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Kinh doanh, quản trị】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Kinh doanh, quản trị\"", "options": ["経営", "経的", "不経営", "営経"], "answer": "経営", "hiragana": "けいえい", "meaning": "Kinh doanh, quản trị", "explanation": "Từ 経営 (けいえい) nghĩa là Kinh doanh, quản trị."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Tình hình kinh tế】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tình hình kinh tế\"", "options": ["景気", "景的", "不景気", "気景"], "answer": "景気", "hiragana": "けいき", "meaning": "Tình hình kinh tế", "explanation": "Từ 景気 (けいき) nghĩa là Tình hình kinh tế."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Nguồn vốn, kinh phí】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Nguồn vốn, kinh phí\"", "options": ["資金", "資的", "不資金", "金資"], "answer": "資金", "hiragana": "しきん", "meaning": "Nguồn vốn, kinh phí", "explanation": "Từ 資金 (しきん) nghĩa là Nguồn vốn, kinh phí."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Lợi nhuận, tiền lời】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Lợi nhuận, tiền lời\"", "options": ["利益", "利的", "不利益", "益利"], "answer": "利益", "hiragana": "りえき", "meaning": "Lợi nhuận, tiền lời", "explanation": "Từ 利益 (りえき) nghĩa là Lợi nhuận, tiền lời."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 7: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Kịch tính, Cảm xúc & Tâm lý tình huống', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề ドラマ:', '/assets/kanji/n2/quizzes/quiz_7_8_p1.webp', '{"chapterNumber": 7, "chapterTitle": "ドラマ", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Cướp giật, đoạt lấy】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Cướp giật, đoạt lấy\"", "options": ["強奪", "強的", "不強奪", "奪強"], "answer": "強奪", "hiragana": "ごうだつ", "meaning": "Cướp giật, đoạt lấy", "explanation": "Từ 強奪 (ごうだつ) nghĩa là Cướp giật, đoạt lấy."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Khủng khiếp, sợ hãi】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Khủng khiếp, sợ hãi\"", "options": ["恐怖", "恐的", "不恐怖", "怖恐"], "answer": "恐怖", "hiragana": "きょうふ", "meaning": "Khủng khiếp, sợ hãi", "explanation": "Từ 恐怖 (きょうふ) nghĩa là Khủng khiếp, sợ hãi."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Căng thẳng, hồi hộp】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Căng thẳng, hồi hộp\"", "options": ["緊張", "緊的", "不緊張", "張緊"], "answer": "緊張", "hiragana": "きんちょう", "meaning": "Căng thẳng, hồi hộp", "explanation": "Từ 緊張 (きんちょう) nghĩa là Căng thẳng, hồi hộp."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Hủy diệt, sụp đổ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Hủy diệt, sụp đổ\"", "options": ["破滅", "破的", "不破滅", "滅破"], "answer": "破滅", "hiragana": "はめつ", "meaning": "Hủy diệt, sụp đổ", "explanation": "Từ 破滅 (はめつ) nghĩa là Hủy diệt, sụp đổ."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 8: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Quan hệ xã hội, Hợp tác & Kính ngữ 1', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 人間関係-1:', '/assets/kanji/n2/quizzes/quiz_7_8_p2.webp', '{"chapterNumber": 8, "chapterTitle": "人間関係-1", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Xung quanh, chu vi】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Xung quanh, chu vi\"", "options": ["周囲", "周的", "不周囲", "囲周"], "answer": "周囲", "hiragana": "しゅうい", "meaning": "Xung quanh, chu vi", "explanation": "Từ 周囲 (しゅうい) nghĩa là Xung quanh, chu vi."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Hợp lực, chung tay giúp đỡ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Hợp lực, chung tay giúp đỡ\"", "options": ["協力", "協的", "不協力", "力協"], "answer": "協力", "hiragana": "きょうりょく", "meaning": "Hợp lực, chung tay giúp đỡ", "explanation": "Từ 協力 (きょうりょく) nghĩa là Hợp lực, chung tay giúp đỡ."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Tương hỗ, lẫn nhau】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tương hỗ, lẫn nhau\"", "options": ["相互", "相的", "不相互", "互相"], "answer": "相互", "hiragana": "そうご", "meaning": "Tương hỗ, lẫn nhau", "explanation": "Từ 相互 (そうご) nghĩa là Tương hỗ, lẫn nhau."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Chia sẻ, sở hữu chung】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chia sẻ, sở hữu chung\"", "options": ["共有", "共的", "不共有", "有共"], "answer": "共有", "hiragana": "きょうゆう", "meaning": "Chia sẻ, sở hữu chung", "explanation": "Từ 共有 (きょうゆう) nghĩa là Chia sẻ, sở hữu chung."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 9: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Địa hình ven biển, Vũ trụ & Môi trường', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 自然-1:', '/assets/kanji/n2/quizzes/quiz_9_10_p1.webp', '{"chapterNumber": 9, "chapterTitle": "自然-1", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Bờ biển】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Bờ biển\"", "options": ["海岸", "海的", "不海岸", "岸海"], "answer": "海岸", "hiragana": "かいがん", "meaning": "Bờ biển", "explanation": "Từ 海岸 (かいがん) nghĩa là Bờ biển."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Bãi cát ven biển】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Bãi cát ven biển\"", "options": ["砂浜", "砂的", "不砂浜", "浜砂"], "answer": "砂浜", "hiragana": "すなはま", "meaning": "Bãi cát ven biển", "explanation": "Từ 砂浜 (すなはま) nghĩa là Bãi cát ven biển."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Địa tầng, tầng đất】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Địa tầng, tầng đất\"", "options": ["地層", "地的", "不地層", "層地"], "answer": "地層", "hiragana": "ちそう", "meaning": "Địa tầng, tầng đất", "explanation": "Từ 地層 (ちそう) nghĩa là Địa tầng, tầng đất."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Suối nước nóng】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Suối nước nóng\"", "options": ["温泉", "温的", "不温泉", "泉温"], "answer": "温泉", "hiragana": "おんせん", "meaning": "Suối nước nóng", "explanation": "Từ 温泉 (おんせん) nghĩa là Suối nước nóng."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 10: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Giáo dục, Pháp luật, An ninh & Chính trị', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 社会-1:', '/assets/kanji/n2/quizzes/quiz_9_10_p2.webp', '{"chapterNumber": 10, "chapterTitle": "社会-1", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Bài giảng, tiết học đại học】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Bài giảng, tiết học đại học\"", "options": ["講義", "講的", "不講義", "義講"], "answer": "講義", "hiragana": "こうぎ", "meaning": "Bài giảng, tiết học đại học", "explanation": "Từ 講義 (こうぎ) nghĩa là Bài giảng, tiết học đại học."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Chuyên môn, chuyên ngành】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chuyên môn, chuyên ngành\"", "options": ["専門", "専的", "不専門", "門専"], "answer": "専門", "hiragana": "せんもん", "meaning": "Chuyên môn, chuyên ngành", "explanation": "Từ 専門 (せんもん) nghĩa là Chuyên môn, chuyên ngành."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Tiến sĩ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tiến sĩ\"", "options": ["博士", "博的", "不博士", "士博"], "answer": "博士", "hiragana": "はかせ", "meaning": "Tiến sĩ", "explanation": "Từ 博士 (はかせ) nghĩa là Tiến sĩ."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Chính sách công】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chính sách công\"", "options": ["政策", "政的", "不政策", "策政"], "answer": "政策", "hiragana": "せいさく", "meaning": "Chính sách công", "explanation": "Từ 政策 (せいさく) nghĩa là Chính sách công."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 11: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Nhà ở truyền thống, Bưu phẩm & Ẩm thực sâu', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 生活-2:', '/assets/kanji/n2/quizzes/quiz_11_12_p1.webp', '{"chapterNumber": 11, "chapterTitle": "生活-2", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Chiếu cói truyền thống】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chiếu cói truyền thống\"", "options": ["畳", "新畳", "畳所", "畳"], "answer": "畳", "hiragana": "たたみ", "meaning": "Chiếu cói truyền thống", "explanation": "Từ 畳 (たたみ) nghĩa là Chiếu cói truyền thống."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Sàn nhà】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Sàn nhà\"", "options": ["床", "新床", "床所", "床"], "answer": "床", "hiragana": "ゆか", "meaning": "Sàn nhà", "explanation": "Từ 床 (ゆか) nghĩa là Sàn nhà."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Lối vào nhà, tiền sảnh】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Lối vào nhà, tiền sảnh\"", "options": ["玄関", "玄的", "不玄関", "関玄"], "answer": "玄関", "hiragana": "げんかん", "meaning": "Lối vào nhà, tiền sảnh", "explanation": "Từ 玄関 (げんかん) nghĩa là Lối vào nhà, tiền sảnh."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Hành lang】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Hành lang\"", "options": ["廊下", "廊的", "不廊下", "下廊"], "answer": "廊下", "hiragana": "ろうか", "meaning": "Hành lang", "explanation": "Từ 廊下 (ろうか) nghĩa là Hành lang."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 12: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Công sở, Tính cách, Vẻ ngoài & Trang phục', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 働く:', '/assets/kanji/n2/quizzes/quiz_11_12_p2.webp', '{"chapterNumber": 12, "chapterTitle": "働く", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Điện thoại di động】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Điện thoại di động\"", "options": ["携帯電話", "携的", "不携帯電話", "話電帯携"], "answer": "携帯電話", "hiragana": "けいたいでんわ", "meaning": "Điện thoại di động", "explanation": "Từ 携帯電話 (けいたいでんわ) nghĩa là Điện thoại di động."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Cự tuyệt, từ chối】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Cự tuyệt, từ chối\"", "options": ["拒否", "拒的", "不拒否", "否拒"], "answer": "拒否", "hiragana": "きょひ", "meaning": "Cự tuyệt, từ chối", "explanation": "Từ 拒否 (きょひ) nghĩa là Cự tuyệt, từ chối."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【In ấn tài liệu】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"In ấn tài liệu\"", "options": ["印刷", "印的", "不印刷", "刷印"], "answer": "印刷", "hiragana": "いんさつ", "meaning": "In ấn tài liệu", "explanation": "Từ 印刷 (いんさつ) nghĩa là In ấn tài liệu."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Ngoan cố, bảo thủ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Ngoan cố, bảo thủ\"", "options": ["頑固", "頑的", "不頑固", "固頑"], "answer": "頑固", "hiragana": "がんこ", "meaning": "Ngoan cố, bảo thủ", "explanation": "Từ 頑固 (がんこ) nghĩa là Ngoan cố, bảo thủ."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 13: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Giấc ngủ, Sinh nở, Nhãn khoa & Dược phẩm', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 健康-2:', '/assets/kanji/n2/quizzes/quiz_13_14_p1.webp', '{"chapterNumber": 13, "chapterTitle": "健康-2", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Giấc ngủ, ngủ nghỉ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Giấc ngủ, ngủ nghỉ\"", "options": ["睡眠", "睡的", "不睡眠", "眠睡"], "answer": "睡眠", "hiragana": "すいみん", "meaning": "Giấc ngủ, ngủ nghỉ", "explanation": "Từ 睡眠 (すいみん) nghĩa là Giấc ngủ, ngủ nghỉ."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Hút thuốc lá】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Hút thuốc lá\"", "options": ["喫煙", "喫的", "不喫煙", "煙喫"], "answer": "喫煙", "hiragana": "きつえん", "meaning": "Hút thuốc lá", "explanation": "Từ 喫煙 (きつえん) nghĩa là Hút thuốc lá."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Chất béo, mỡ thừa】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chất béo, mỡ thừa\"", "options": ["脂肪", "脂的", "不脂肪", "肪脂"], "answer": "脂肪", "hiragana": "しぼう", "meaning": "Chất béo, mỡ thừa", "explanation": "Từ 脂肪 (しぼう) nghĩa là Chất béo, mỡ thừa."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Mang thai, thai nghén】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Mang thai, thai nghén\"", "options": ["妊娠", "妊的", "不妊娠", "娠妊"], "answer": "妊娠", "hiragana": "にんしん", "meaning": "Mang thai, thai nghén", "explanation": "Từ 妊娠 (にんしん) nghĩa là Mang thai, thai nghén."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 14: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Hoa màu sắc, Động vật, Dòng nước & Mỏ khoáng', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 自然-2:', '/assets/kanji/n2/quizzes/quiz_13_14_p2.webp', '{"chapterNumber": 14, "chapterTitle": "自然-2", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Nở rộ (hoa nở đầy cành)】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Nở rộ (hoa nở đầy cành)\"", "options": ["満開", "満的", "不満開", "開満"], "answer": "満開", "hiragana": "まんかい", "meaning": "Nở rộ (hoa nở đầy cành)", "explanation": "Từ 満開 (まんかい) nghĩa là Nở rộ (hoa nở đầy cành)."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Rực rỡ, tươi thắm】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Rực rỡ, tươi thắm\"", "options": ["鮮やか", "鮮的", "不鮮やか", "かや鮮"], "answer": "鮮やか", "hiragana": "あざやか", "meaning": "Rực rỡ, tươi thắm", "explanation": "Từ 鮮やか (あざやか) nghĩa là Rực rỡ, tươi thắm."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Nuôi nấng, chăn nuôi】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Nuôi nấng, chăn nuôi\"", "options": ["飼育", "飼的", "不飼育", "育飼"], "answer": "飼育", "hiragana": "しいく", "meaning": "Nuôi nấng, chăn nuôi", "explanation": "Từ 飼育 (しいく) nghĩa là Nuôi nấng, chăn nuôi."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Chăn thả gia súc ngoài đồng】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Chăn thả gia súc ngoài đồng\"", "options": ["放牧", "放的", "不放牧", "牧放"], "answer": "放牧", "hiragana": "ほうぼく", "meaning": "Chăn thả gia súc ngoài đồng", "explanation": "Từ 放牧 (ほうぼく) nghĩa là Chăn thả gia súc ngoài đồng."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 15: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Tiệc tùng, Bạn bè, Họ hàng & Kính ngữ sâu', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 人間関係-2:', '/assets/kanji/n2/quizzes/quiz_15_16_p1.webp', '{"chapterNumber": 15, "chapterTitle": "人間関係-2", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Bữa tiệc, tiệc tùng liên hoan】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Bữa tiệc, tiệc tùng liên hoan\"", "options": ["宴会", "宴的", "不宴会", "会宴"], "answer": "宴会", "hiragana": "えんかい", "meaning": "Bữa tiệc, tiệc tùng liên hoan", "explanation": "Từ 宴会 (えんかい) nghĩa là Bữa tiệc, tiệc tùng liên hoan."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Tổ chức, đăng cai】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tổ chức, đăng cai\"", "options": ["開催", "開的", "不開催", "催開"], "answer": "開催", "hiragana": "かいさい", "meaning": "Tổ chức, đăng cai", "explanation": "Từ 開催 (かいさい) nghĩa là Tổ chức, đăng cai."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Cạn ly, chúc mừng】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Cạn ly, chúc mừng\"", "options": ["乾杯", "乾的", "不乾杯", "杯乾"], "answer": "乾杯", "hiragana": "かんぱい", "meaning": "Cạn ly, chúc mừng", "explanation": "Từ 乾杯 (かんぱい) nghĩa là Cạn ly, chúc mừng."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Thức trắng đêm】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Thức trắng đêm\"", "options": ["徹夜", "徹的", "不徹夜", "夜徹"], "answer": "徹夜", "hiragana": "てつや", "meaning": "Thức trắng đêm", "explanation": "Từ 徹夜 (てつや) nghĩa là Thức trắng đêm."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 16: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Thiên tai, Sạt lở núi lửa & Thời tiết cực đoan', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 自然現象:', '/assets/kanji/n2/quizzes/quiz_15_16_p2.webp', '{"chapterNumber": 16, "chapterTitle": "自然現象", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Thiệt hại, tổn thất】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Thiệt hại, tổn thất\"", "options": ["被害", "被的", "不被害", "害被"], "answer": "被害", "hiragana": "ひがい", "meaning": "Thiệt hại, tổn thất", "explanation": "Từ 被害 (ひがい) nghĩa là Thiệt hại, tổn thất."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Sụp đổ, sạt lở tan hoang】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Sụp đổ, sạt lở tan hoang\"", "options": ["崩壊", "崩的", "不崩壊", "壊崩"], "answer": "崩壊", "hiragana": "ほうかい", "meaning": "Sụp đổ, sạt lở tan hoang", "explanation": "Từ 崩壊 (ほうかい) nghĩa là Sụp đổ, sạt lở tan hoang."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Núi lửa phun trào】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Núi lửa phun trào\"", "options": ["噴火", "噴的", "不噴火", "火噴"], "answer": "噴火", "hiragana": "ふんか", "meaning": "Núi lửa phun trào", "explanation": "Từ 噴火 (ふんか) nghĩa là Núi lửa phun trào."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Sóng thần】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Sóng thần\"", "options": ["津波", "津的", "不津波", "波津"], "answer": "津波", "hiragana": "つなみ", "meaning": "Sóng thần", "explanation": "Từ 津波 (つなみ) nghĩa là Sóng thần."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 17: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Nghệ thuật thơ ca, Tư pháp, Trật tự & Quân sự', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 社会-2:', '/assets/kanji/n2/quizzes/quiz_17_18_p1.webp', '{"chapterNumber": 17, "chapterTitle": "社会-2", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Thơ Haiku truyền thống】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Thơ Haiku truyền thống\"", "options": ["俳句", "俳的", "不俳句", "句俳"], "answer": "俳句", "hiragana": "はいく", "meaning": "Thơ Haiku truyền thống", "explanation": "Từ 俳句 (はいく) nghĩa là Thơ Haiku truyền thống."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Danh sách họ tên, sổ danh bạ】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Danh sách họ tên, sổ danh bạ\"", "options": ["名簿", "名的", "不名簿", "簿名"], "answer": "名簿", "hiragana": "めいぼ", "meaning": "Danh sách họ tên, sổ danh bạ", "explanation": "Từ 名簿 (めいぼ) nghĩa là Danh sách họ tên, sổ danh bạ."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Tượng điêu khắc】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tượng điêu khắc\"", "options": ["彫像", "彫的", "不彫像", "像彫"], "answer": "彫像", "hiragana": "ちょうぞう", "meaning": "Tượng điêu khắc", "explanation": "Từ 彫像 (ちょうぞう) nghĩa là Tượng điêu khắc."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Di tích lịch sử cổ xưa】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Di tích lịch sử cổ xưa\"", "options": ["遺跡", "遺的", "不遺跡", "跡遺"], "answer": "遺跡", "hiragana": "いせき", "meaning": "Di tích lịch sử cổ xưa", "explanation": "Từ 遺跡 (いせき) nghĩa là Di tích lịch sử cổ xưa."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'DIALOGUE_CHOICE', 'Minigame 18: Thử thách phản xạ & Ngữ cảnh chuyên sâu — Địa danh Nhật Bản & Cách đọc quy ước', 'Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề 地名:', '/assets/kanji/n2/quizzes/quiz_17_18_p2.webp', '{"chapterNumber": 18, "chapterTitle": "地名", "questions": [{"id": 1, "prompt": "文脈に合う言葉を選びなさい：【Phủ Osaka】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Phủ Osaka\"", "options": ["大阪府", "大的", "不大阪府", "府阪大"], "answer": "大阪府", "hiragana": "おおさかふ", "meaning": "Phủ Osaka", "explanation": "Từ 大阪府 (おおさかふ) nghĩa là Phủ Osaka."}, {"id": 2, "prompt": "文脈に合う言葉を選びなさい：【Tỉnh Saitama】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tỉnh Saitama\"", "options": ["埼玉県", "埼的", "不埼玉県", "県玉埼"], "answer": "埼玉県", "hiragana": "さいたまけん", "meaning": "Tỉnh Saitama", "explanation": "Từ 埼玉県 (さいたまけん) nghĩa là Tỉnh Saitama."}, {"id": 3, "prompt": "文脈に合う言葉を選びなさい：【Tỉnh Tochigi】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tỉnh Tochigi\"", "options": ["栃木県", "栃的", "不栃木県", "県木栃"], "answer": "栃木県", "hiragana": "とちぎけん", "meaning": "Tỉnh Tochigi", "explanation": "Từ 栃木県 (とちぎけん) nghĩa là Tỉnh Tochigi."}, {"id": 4, "prompt": "文脈に合う言葉を選びなさい：【Tỉnh Ibaraki】", "promptVi": "Chọn từ vựng Kanji thích hợp mang nghĩa: \"Tỉnh Ibaraki\"", "options": ["茨城県", "茨的", "不茨城県", "県城茨"], "answer": "茨城県", "hiragana": "いばらきけん", "meaning": "Tỉnh Ibaraki", "explanation": "Từ 茨城県 (いばらきけん) nghĩa là Tỉnh Ibaraki."}]}', 1, NOW());
    END IF;
END $$;

-- 6. SEED N2 ACHIEVEMENT TESTS (STAGES 11 TO 21)
DELETE FROM kanji_achievement_tests WHERE stage IN (11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21);
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(11, 'Achievement Test 1 (Chương 1・2) — Đời sống & Đô thị', 'Đề thi trắc nghiệm 100 điểm đánh giá 60 chữ Hán Chương 1 & Chương 2 (Chuyển phát, hợp đồng thuê nhà, ngân hàng, giao thông).', 85, '{"stage_level": "N2", "stage": 11, "coverage": "Chương 1 ~ 2", "scan_p1": "/assets/kanji/n2/achievement_tests/test_1_2_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_1_2_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 11, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(12, 'Achievement Test 2 (Chương 3・4) — Văn hóa, Thời trang & Sức khỏe', 'Đề thi trắc nghiệm 100 điểm kiểm tra 60 chữ Hán Chương 3 & Chương 4 (Hoa cỏ, di tích lịch sử, cơ thể, nội tạng, triệu chứng khám bệnh).', 85, '{"stage_level": "N2", "stage": 12, "coverage": "Chương 3 ~ 4", "scan_p1": "/assets/kanji/n2/achievement_tests/test_3_4_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_3_4_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 12, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(13, 'Achievement Test 3 (Chương 5・6) — Thương trường & Tài chính doanh nghiệp', 'Đề thi trắc nghiệm 100 điểm kiểm tra 58 chữ Hán Chương 5 & Chương 6 (Tuyển dụng CV, phỏng vấn, cổ phiếu, lợi nhuận, chiến lược kinh doanh).', 85, '{"stage_level": "N2", "stage": 13, "coverage": "Chương 5 ~ 6", "scan_p1": "/assets/kanji/n2/achievement_tests/test_5_6_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_5_6_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 13, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(14, 'Achievement Test 4 (Chương 7・8) — Kịch tính cảm xúc & Quan hệ xã hội', 'Đề thi trắc nghiệm 100 điểm kiểm tra 42 chữ Hán Chương 7 & Chương 8 (Hồi hộp sợ hãi, chia ly, tinh thần đồng đội và kính ngữ - khiêm nhường ngữ).', 85, '{"stage_level": "N2", "stage": 14, "coverage": "Chương 7 ~ 8", "scan_p1": "/assets/kanji/n2/achievement_tests/test_7_8_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_7_8_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 14, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(15, 'Achievement Test 5 (Chương 9・10) — Thiên nhiên địa hình & Chính trị pháp luật', 'Đề thi trắc nghiệm 100 điểm kiểm tra 60 chữ Hán Chương 9 & Chương 10 (Vũ trụ, biển cát thảm họa, sở cảnh sát, bầu cử, tư pháp).', 85, '{"stage_level": "N2", "stage": 15, "coverage": "Chương 9 ~ 10", "scan_p1": "/assets/kanji/n2/achievement_tests/test_9_10_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_9_10_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 15, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(16, '📝 BÀI THI TỔNG KẾT PHẦN CĂN BẢN (基本編 まとめテスト)', 'Kỳ thi sát hạch toàn diện 100 điểm tổng kết 10 Chương đầu Phần Căn Bản (280 chữ Hán Thượng Cấp N2).', 85, '{"stage_level": "N2", "stage": 16, "coverage": "Chương 1 ~ 10", "scan_p1": "/assets/kanji/n2/achievement_tests/midterm_kihon_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/midterm_kihon_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 16, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(17, 'Achievement Test 6 (Chương 11・12) — Nhà ở truyền thống & Công sở văn phòng', 'Đề thi trắc nghiệm 100 điểm kiểm tra 65 chữ Hán Chương 11 & Chương 12 (Chiếu Tatami, thư từ gia vị, thiết bị văn phòng và phẩm chất con người).', 85, '{"stage_level": "N2", "stage": 17, "coverage": "Chương 11 ~ 12", "scan_p1": "/assets/kanji/n2/achievement_tests/test_11_12_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_11_12_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 17, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(18, 'Achievement Test 7 (Chương 13・14) — Y học thai sản & Động thực vật mỏ quặng', 'Đề thi trắc nghiệm 100 điểm kiểm tra 54 chữ Hán Chương 13 & Chương 14 (Giấc ngủ, sinh đôi, mạch đập, thú cưng, thác nước và địa chất khoáng sản).', 85, '{"stage_level": "N2", "stage": 18, "coverage": "Chương 13 ~ 14", "scan_p1": "/assets/kanji/n2/achievement_tests/test_13_14_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_13_14_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 18, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(19, 'Achievement Test 8 (Chương 15・16) — Tiệc tùng nghi lễ & Thiên tai cuồng nộ', 'Đề thi trắc nghiệm 100 điểm kiểm tra 56 chữ Hán Chương 15 & Chương 16 (Tiệc rượu thâu đêm, họ hàng kính ngữ sâu, núi lửa sạt lở và giông bão).', 85, '{"stage_level": "N2", "stage": 19, "coverage": "Chương 15 ~ 16", "scan_p1": "/assets/kanji/n2/achievement_tests/test_15_16_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_15_16_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 19, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(20, 'Achievement Test 9 (Chương 17・18) — Nghệ thuật tư pháp & Địa danh Nhật Bản', 'Đề thi trắc nghiệm 100 điểm kiểm tra 50 chữ Hán Chương 17 & Chương 18 (Thơ Haiku, danh bạ tòa án, hiến pháp và các tỉnh thành Nhật Bản).', 85, '{"stage_level": "N2", "stage": 20, "coverage": "Chương 17 ~ 18", "scan_p1": "/assets/kanji/n2/achievement_tests/test_17_18_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/test_17_18_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 20, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(21, '🎓 KỲ THI TỐT NGHIỆP LEVEL N2 (挑戦編 まとめテスト & FINAL N2)', 'Kỳ thi tốt nghiệp đỉnh cao 100 điểm chuẩn format JLPT N2 文字・語彙 đánh giá trọn vẹn toàn bộ 500 chữ Hán Master N2.', 85, '{"stage_level": "N2", "stage": 21, "coverage": "Chương 1 ~ 18", "scan_p1": "/assets/kanji/n2/achievement_tests/final_chosen_p1.webp", "scan_p2": "/assets/kanji/n2/achievement_tests/final_chosen_p2.webp", "total_questions": 20, "questions": [{"id": 1, "q": "【問1】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句1", "answer": "正解1", "options": ["正解1", "誤答A1", "誤答B1", "誤答C1"]}, {"id": 2, "q": "【問2】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句2", "answer": "正解2", "options": ["正解2", "誤答A2", "誤答B2", "誤答C2"]}, {"id": 3, "q": "【問3】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句3", "answer": "正解3", "options": ["正解3", "誤答A3", "誤答B3", "誤答C3"]}, {"id": 4, "q": "【問4】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句4", "answer": "正解4", "options": ["正解4", "誤答A4", "誤答B4", "誤答C4"]}, {"id": 5, "q": "【問5】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句5", "answer": "正解5", "options": ["正解5", "誤答A5", "誤答B5", "誤答C5"]}, {"id": 6, "q": "【問6】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句6", "answer": "正解6", "options": ["正解6", "誤答A6", "誤答B6", "誤答C6"]}, {"id": 7, "q": "【問7】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句7", "answer": "正解7", "options": ["正解7", "誤答A7", "誤答B7", "誤答C7"]}, {"id": 8, "q": "【問8】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句8", "answer": "正解8", "options": ["正解8", "誤答A8", "誤答B8", "誤答C8"]}, {"id": 9, "q": "【問9】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句9", "answer": "正解9", "options": ["正解9", "誤答A9", "誤答B9", "誤答C9"]}, {"id": 10, "q": "【問10】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句10", "answer": "正解10", "options": ["正解10", "誤答A10", "誤答B10", "誤答C10"]}, {"id": 11, "q": "【問11】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句11", "answer": "正解11", "options": ["正解11", "誤答A11", "誤答B11", "誤答C11"]}, {"id": 12, "q": "【問12】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句12", "answer": "正解12", "options": ["正解12", "誤答A12", "誤答B12", "誤答C12"]}, {"id": 13, "q": "【問13】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句13", "answer": "正解13", "options": ["正解13", "誤答A13", "誤答B13", "誤答C13"]}, {"id": 14, "q": "【問14】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句14", "answer": "正解14", "options": ["正解14", "誤答A14", "誤答B14", "誤答C14"]}, {"id": 15, "q": "【問15】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句15", "answer": "正解15", "options": ["正解15", "誤答A15", "誤答B15", "誤答C15"]}, {"id": 16, "q": "【問16】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句16", "answer": "正解16", "options": ["正解16", "誤答A16", "誤答B16", "誤答C16"]}, {"id": 17, "q": "【問17】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句17", "answer": "正解17", "options": ["正解17", "誤答A17", "誤答B17", "誤答C17"]}, {"id": 18, "q": "【問18】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句18", "answer": "正解18", "options": ["正解18", "誤答A18", "誤答B18", "誤答C18"]}, {"id": 19, "q": "【問19】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句19", "answer": "正解19", "options": ["正解19", "誤答A19", "誤答B19", "誤答C19"]}, {"id": 20, "q": "【問20】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。", "target": "問題語句20", "answer": "正解20", "options": ["正解20", "誤答A20", "誤答B20", "誤答C20"]}]}', 21, NOW());