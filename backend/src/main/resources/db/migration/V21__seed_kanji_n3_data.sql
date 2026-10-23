-- =============================================================================
-- Flyway Migration: V21 - Seed 100% Authentic Kanji Master N3 Full Dataset
-- 20 Chapters, 376 Kanjis, Chapter Vocab, Exercises, Minigames & Tests
-- =============================================================================

-- 1. SEED 20 CHƯƠNG KANJI MASTER N3
INSERT INTO kanji_chapters (chapter_number, jlpt_level, title_ja, title_vi, title_en, kanji_count, display_order, illustration_url, description) VALUES
(1, 'N3', '生活', 'Đời sống hàng ngày', 'Daily Life & Routines', 20, 1, '/assets/kanji/n3/illustrations/chap1_intro.webp', '20 chữ Hán về sinh hoạt thường nhật, giặt giũ, phân loại rác và lịch trình: 起, 寝, 浴, 湯, 洗, 濯, 干, 活, 拾, 捨, 燃, 袋, 曜, 末, 昨, 翌, 予, 定, 用, 事.'),
(2, 'N3', '家', 'Nhà ở & Không gian sống', 'Home, Architecture & Garden', 20, 2, '/assets/kanji/n3/illustrations/chap2_intro.webp', '20 chữ Hán về không gian nội thất, thao tác đóng mở, cây cối sân vườn và kết cấu kiến trúc: 押, 引, 取, 消, 戸, 窓, 階, 段, 植, 葉, 実, 根, 建, 築, 構, 造, 設, 柱, 庫, 向.'),
(3, 'N3', '料理', 'Nấu ăn & Ẩm thực', 'Cooking & Ingredients', 20, 3, '/assets/kanji/n3/illustrations/chap3_intro.webp', '20 chữ Hán về nhiệt độ nấu, nguyên liệu thực phẩm, dụng cụ nhà bếp và đơn vị định lượng: 熱, 冷, 温, 度, 材, 型, 焼, 器, 卵, 乳, 粉, 塩, 菜, 果, 豆, 缶, 杯, 枚, 匹, 量.'),
(4, 'N3', '病院', 'Bệnh viện & Sức khỏe', 'Hospital & Healthcare', 20, 4, '/assets/kanji/n3/illustrations/chap4_intro.webp', '20 chữ Hán về các bộ phận cơ thể, triệu chứng ốm đau, khám bệnh và sơ cấp cứu: 頭, 顔, 首, 鼻, 呼, 吸, 息, 汗, 検, 査, 歯, 痛, 血, 液, 包, 帯, 救, 助, 死, 亡.'),
(5, 'N3', 'スポーツ', 'Thể thao & Thi đấu', 'Sports & Competitions', 20, 5, '/assets/kanji/n3/illustrations/chap5_intro.webp', '20 chữ Hán về thi đấu thể thao, thắng bại, thành tích kỷ lục, bóng chày và bảng điểm: 戦, 決, 勝, 負, 代, 表, 第, 回, 記, 録, 優, 賞, 秒, 差, 測, 順, 球, 打, 投, 点.'),
(6, 'N3', '感情', 'Cảm xúc & Tâm lý', 'Emotions & Psychological States', 20, 6, '/assets/kanji/n3/illustrations/chap6_intro.webp', '20 chữ Hán về tình cảm lứa đôi, suy nghĩ, phiền muộn, hỉ nộ ái ố và nước mắt: 感, 情, 恋, 愛, 信, 想, 伝, 欲, 苦, 悩, 困, 難, 怒, 悲, 笑, 喜, 残, 念, 泣, 涙.'),
(7, 'N3', '結婚', 'Hôn nhân & Lễ nghi', 'Marriage & Ceremonies', 20, 7, '/assets/kanji/n3/illustrations/chap7_intro.webp', '20 chữ Hán về kết hôn, đính ước, lời thề, đám cưới, tiết kiệm và hạnh phúc bền lâu: 結, 婚, 紹, 介, 独, 身, 貯, 期, 約, 束, 必, 守, 式, 列, 祝, 酔, 永, 願, 幸, 福.'),
(8, 'N3', '関係', 'Quan hệ con người & Xã hội', 'Interpersonal Relationships', 20, 8, '/assets/kanji/n3/illustrations/chap8_intro.webp', '20 chữ Hán về các mối quan hệ xã hội, gia quyến, bạn hữu bè bạn, xưng hô và cá tính: 関, 係, 和, 付, 娘, 老, 婦, 姓, 仲, 君, 彼, 他, 初, 再, 久, 達, 個, 性, 各, 格.'),
(9, 'N3', '単位', 'Đơn vị & Trạng thái so sánh', 'Units & Relative States', 8, 9, '/assets/kanji/n3/illustrations/chap9_intro.webp', '8 chữ Hán cốt lõi về tính chất đơn/phức, phạm vi trên/dưới, trạng thái chưa/đầy và phủ định: 単, 複, 全, 以, 未, 満, 無, 非.'),
(10, 'N3', '学校', 'Học đường & Giáo dục', 'School & Campus Life', 20, 10, '/assets/kanji/n3/illustrations/chap10_intro.webp', '20 chữ Hán về lứa tuổi học sinh, thầy cô giáo viên, bàn ghế phòng học, mượn sách thư viện và dụng cụ học tập: 幼, 児, 童, 徒, 担, 任, 師, 組, 机, 座, 板, 筆, 貸, 借, 返, 冊, 具, 箱, 棒, 伸.'),
(11, 'N3', '受験', 'Kỳ thi & Định hướng tương lai', 'Entrance Exams & Career Paths', 20, 11, '/assets/kanji/n3/illustrations/chap11_intro.webp', '20 chữ Hán về ước mơ nguyện vọng, chọn trường, phỏng vấn tuyển sinh, tỷ lệ chọi và bảng điểm: 希, 望, 夢, 的, 可, 能, 調, 選, 面, 接, 受, 落, 倍, 率, 平, 均, 成, 績, 良, 悪.'),
(12, 'N3', '授業', 'Tiết học & Kiến thức học thuật', 'Lessons & Academic Studies', 20, 12, '/assets/kanji/n3/illustrations/chap12_intro.webp', '20 chữ Hán về giờ giảng bài, điểm danh chuyên cần, giải thích ví dụ, ghi nhớ và nỗ lực rèn luyện: 授, 業, 級, 卒, 欠, 席, 由, 訳, 例, 易, 解, 説, 覚, 忘, 努, 続, 要, 復, 補, 効.'),
(13, 'N3', '地球', 'Địa cầu & Địa lý tự nhiên', 'Earth, Geography & Nature', 20, 13, '/assets/kanji/n3/illustrations/chap13_intro.webp', '20 chữ Hán về sinh vật, thiên thể mặt trời, sông băng, khí hậu dòng hải lưu và địa hình biển đảo đồi dốc: 種, 類, 存, 在, 陽, 巨, 氷, 河, 季, 候, 暖, 流, 形, 底, 深, 浅, 島, 陸, 岸, 坂.'),
(14, 'N3', '旅行', 'Du lịch & Văn hóa danh lam', 'Travel, Tours & Culture', 20, 14, '/assets/kanji/n3/illustrations/chap14_intro.webp', '20 chữ Hán về chuẩn bị hành trang, đón tiếp du khách, tour du lịch Châu Âu, nghệ thuật biểu diễn và đền chùa lễ hội: 準, 備, 迎, 変, 飛, 移, 登, 泊, 団, 程, 欧, 州, 観, 舟, 芸, 演, 仏, 神, 祭, 絵.'),
(15, 'N3', '交通', 'Giao thông & An toàn đường bộ', 'Traffic, Roads & Safety', 20, 15, '/assets/kanji/n3/illustrations/chap15_intro.webp', '20 chữ Hán về ngã tư rẽ hướng, va chạm tai nạn, vị trí phương hướng làn đường và biển báo chú ý: 角, 曲, 折, 路, 追, 突, 転, 倒, 位, 置, 横, 央, 直, 線, 逆, 側, 注, 意, 橋, 進.'),
(16, 'N3', '仕事', 'Nghề nghiệp & Tuyển dụng', 'Employment, Jobs & Manners', 19, 16, '/assets/kanji/n3/illustrations/chap16_intro.webp', '19 chữ Hán về tìm việc làm, quy tắc xã giao thường thức, lao động nhân viên, từ chức và tiền lương thu chi: 仕, 職, 求, 探, 常, 識, 失, 礼, 労, 員, 官, 局, 辞, 退, 積, 給, 収, 支, 厚.'),
(17, 'N3', '会議', 'Hội nghị & Thảo luận công sở', 'Meetings & Business Discussions', 20, 17, '/assets/kanji/n3/illustrations/chap17_intro.webp', '20 chữ Hán về thảo luận tán thành phản đối, bảo lưu phán đoán, báo cáo liên lạc bàn bạc (Hou-Ren-So) và chỉ thị: 議, 賛, 反, 対, 肯, 否, 保, 留, 判, 断, 確, 認, 報, 告, 連, 絡, 相, 談, 指, 示.'),
(18, 'N3', '会社', 'Công ty & Ngân sách tài chính', 'Company, Management & Finance', 14, 18, '/assets/kanji/n3/illustrations/chap18_intro.webp', '14 chữ Hán về ban lãnh đạo quản lý, thế hệ xưa nay, con số trăm triệu ngàn tỷ, dự toán ngân sách và thuế vụ: 最, 副, 管, 者, 現, 旧, 昔, 次, 億, 兆, 費, 算, 供, 税.'),
(19, 'N3', '産業', 'Công nghiệp & Nền kinh tế', 'Industry, Agriculture & Economy', 18, 19, '/assets/kanji/n3/illustrations/chap19_intro.webp', '18 chữ Hán về nông nghiệp thương mại, máy móc công xưởng, kỹ thuật dệt may tơ tằm và phân hóa giàu nghèo: 産, 農, 貿, 商, 機, 械, 危, 険, 技, 術, 編, 綿, 布, 皮, 貧, 富, 豊, 等.'),
(20, 'N3', '法律', 'Pháp luật & Trật tự an ninh', 'Law, Regulations & Order', 17, 20, '/assets/kanji/n3/illustrations/chap20_intro.webp', '17 chữ Hán về hệ thống pháp luật, điều khoản cấm đoán, vụ án tội phạm, tranh chấp chiến tranh và chính sự triều chính: 法, 律, 規, 則, 禁, 許, 件, 犯, 罪, 容, 疑, 争, 敗, 兵, 軍, 役, 臣.')
ON CONFLICT (jlpt_level, chapter_number) DO UPDATE SET
    title_ja = EXCLUDED.title_ja,
    title_vi = EXCLUDED.title_vi,
    title_en = EXCLUDED.title_en,
    kanji_count = EXCLUDED.kanji_count,
    display_order = EXCLUDED.display_order,
    illustration_url = EXCLUDED.illustration_url,
    description = EXCLUDED.description;

-- 2. SEED 376 KANJIS LEVEL N3
DO $$
DECLARE
    v_ch1_id BIGINT; v_ch2_id BIGINT; v_ch3_id BIGINT; v_ch4_id BIGINT; v_ch5_id BIGINT; v_ch6_id BIGINT; v_ch7_id BIGINT; v_ch8_id BIGINT; v_ch9_id BIGINT; v_ch10_id BIGINT; v_ch11_id BIGINT; v_ch12_id BIGINT; v_ch13_id BIGINT; v_ch14_id BIGINT; v_ch15_id BIGINT; v_ch16_id BIGINT; v_ch17_id BIGINT; v_ch18_id BIGINT; v_ch19_id BIGINT; v_ch20_id BIGINT;
BEGIN
    SELECT id INTO v_ch1_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 1;
    SELECT id INTO v_ch2_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 2;
    SELECT id INTO v_ch3_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 3;
    SELECT id INTO v_ch4_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 4;
    SELECT id INTO v_ch5_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 5;
    SELECT id INTO v_ch6_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 6;
    SELECT id INTO v_ch7_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 7;
    SELECT id INTO v_ch8_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 8;
    SELECT id INTO v_ch9_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 9;
    SELECT id INTO v_ch10_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 10;
    SELECT id INTO v_ch11_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 11;
    SELECT id INTO v_ch12_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 12;
    SELECT id INTO v_ch13_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 13;
    SELECT id INTO v_ch14_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 14;
    SELECT id INTO v_ch15_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 15;
    SELECT id INTO v_ch16_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 16;
    SELECT id INTO v_ch17_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 17;
    SELECT id INTO v_ch18_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 18;
    SELECT id INTO v_ch19_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 19;
    SELECT id INTO v_ch20_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 20;

    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('起', 'キ', 'お・きる, お・こる, お・こす', 'o', 'KHỞI', 'Thức dậy, khởi xướng, xảy ra', 10, '走 -> 己', '毎朝 6時に 起きます。', 'Maiasa rokuji ni okimasu.', 'Mỗi sáng tôi thức dậy lúc 6 giờ.', 'N3', 'Chạy khởi động', 'Tự mình đứng lên chạy khởi động ngày mới.', '⏰', v_ch1_id, 1, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('寝', 'シン', 'ね・る, ね・かす', 'ne', 'TẨM', 'Ngủ, phòng ngủ', 13, '宀 -> 爿 -> 彐', '昨夜は 早く 寝ました。', 'Sakuya wa hayaku nemashita.', 'Tối qua tôi đã đi ngủ sớm.', 'N3', 'Nằm trên giường', 'Dưới mái nhà có chiếc giường êm ái để ngủ.', '🛌', v_ch1_id, 2, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('浴', 'ヨク', 'あ・びる, あ・びせる', 'abi', 'DỤC', 'Tắm, ngâm mình', 10, '氵 -> 谷', 'シャワーを 浴びて すっきりしました。', 'Shawaa o abite sukkirishimashita.', 'Tắm vòi sen xong thấy thật sảng khoái.', 'N3', 'Tắm trong thung lũng', 'Dòng nước suối trong thung lũng mát lạnh.', '🚿', v_ch1_id, 3, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('湯', 'トウ', 'ゆ', 'yu', 'THANG', 'Nước nóng, nước sôi', 12, '氵 -> 昜', 'お湯を わかして お茶を いれます。', 'Oyu o wakashite ocha o iremasu.', 'Đun nước sôi pha trà.', 'N3', 'Nước bốc hơi nóng', 'Dưới ánh mặt trời nước nóng bốc hơi nghi ngút.', '♨️', v_ch1_id, 4, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('洗', 'セン', 'あら・う', 'ara', 'TẨY', 'Rửa, giặt giũ', 9, '氵 -> 先', '食事の まえに 手を 洗います。', 'Shokuji no mae ni te o araimasu.', 'Rửa tay trước khi ăn.', 'N3', 'Rửa sạch đi trước', 'Dùng nước tẩy rửa sạch sẽ trước khi làm việc.', '🧼', v_ch1_id, 5, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('濯', 'タク', '', 'taku', 'TRẠC', 'Giặt quần áo, tẩy rửa', 17, '氵 -> 翟', '洗濯機で 服を 洗濯します。', 'Sentakuki de fuku o sentaku shimasu.', 'Giặt quần áo bằng máy giặt.', 'N3', 'Đôi cánh chim trong nước', 'Đôi cánh chim vỗ nước tẩy sạch bụi bẩn.', '🧺', v_ch1_id, 6, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('干', 'カン', 'ほ・す, ひ・る', 'ho', 'CAN', 'Phơi khô, cạn ráo', 3, '一 -> 十', '天気が いいので 布団を 干します。', 'Tenki ga ii node futon o hoshimasu.', 'Trời đẹp nên tôi đem chăn đi phơi.', 'N3', 'Cọc phơi đồ', 'Cọc tre cắm vững chãi để phơi đồ dưới nắng.', '☀️', v_ch1_id, 7, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('活', 'カツ', '', 'katsu', 'HOẠT', 'Sống động, sinh hoạt', 9, '氵 -> 舌', '規則正しい 生活を 送ります。', 'Kisoku tadashii seikatsu o okurimasu.', 'Duy trì cuộc sống sinh hoạt điều độ.', 'N3', 'Nước tưới đầu lưỡi', 'Dòng nước làm cho đầu lưỡi nói cười linh hoạt.', '🏃', v_ch1_id, 8, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('拾', 'シュウ, ジュウ', 'ひろ・う', 'hiro', 'THẬP', 'Nhặt lên, thu gom', 9, '扌 -> 合', '道で さいふを 拾いました。', 'Michi de saifu o hiroimashita.', 'Tôi nhặt được chiếc ví trên đường.', 'N3', 'Tay nhặt hợp lại', 'Bàn tay nhặt đồ rơi gom hợp lại một chỗ.', '🤲', v_ch1_id, 9, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('捨', 'シャ', 'す・てる', 'sute', 'XẢ', 'Vứt bỏ, từ bỏ', 11, '扌 -> 舍', 'ゴミを ゴミ箱に 捨てます。', 'Gomi o gomibako ni sutemasu.', 'Vứt rác vào thùng rác.', 'N3', 'Tay bỏ nhà cũ', 'Bàn tay vứt bỏ những đồ đạc cũ trong nhà.', '🗑️', v_ch1_id, 10, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('燃', 'ネン', 'も・える, も・やす', 'mo', 'NHIÊN', 'Cháy, đốt cháy', 16, '火 -> 然', '燃えるゴミの 日は 月曜日です。', 'Moerugomi no hi wa getsuyoubi desu.', 'Ngày gom rác cháy được là thứ Hai.', 'N3', 'Lửa tự nhiên bốc cháy', 'Ngọn lửa bốc cháy tự nhiên tỏa nhiệt ấm.', '🔥', v_ch1_id, 11, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('袋', 'タイ', 'ふくろ', 'fukuro', 'ĐẠI', 'Túi, bao tải', 11, '代 -> 衣', 'レジ袋を 一枚 もらいました。', 'Rejibukuro o ichimai moraimashita.', 'Tôi xin một chiếc túi nilon ở quầy tính tiền.', 'N3', 'Tấm vải thay thế túi', 'Tấm vải bọc thay thế thành chiếc túi đựng.', '🛍️', v_ch1_id, 12, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('曜', 'ヨウ', '', 'you', 'DIỆU', 'Thứ trong tuần, ngày sáng', 18, '日 -> 翟', '今日は 何曜日ですか。', 'Kyou wa nan-youbi desu ka.', 'Hôm nay là thứ mấy?', 'N3', 'Ánh dương rạng ngời', 'Mặt trời chiếu sáng từng ngày trong tuần.', '📅', v_ch1_id, 13, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('末', 'マツ, バツ', 'すえ', 'sue', 'MẠT', 'Cuối cùng, phần ngọn', 5, '一 -> 木', '今月末に テストが あります。', 'Kongetsumatsu ni tesuto ga arimasu.', 'Cuối tháng này sẽ có bài kiểm tra.', 'N3', 'Ngọn cây cao nhất', 'Nét ngang trên dài hơn thân cây tượng trưng cho phần ngọn cuối.', '🔚', v_ch1_id, 14, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('昨', 'サク', '', 'saku', 'TÁC', 'Hôm qua, năm ngoái', 9, '日 -> 乍', '昨日は 一日中 雨でした。', 'Kinou wa ichinichijuu ame deshita.', 'Hôm qua trời mưa suốt cả ngày.', 'N3', 'Mặt trời ngày qua', 'Mặt trời của ngày hôm qua vừa khép lại.', '⏮️', v_ch1_id, 15, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('翌', 'ヨク', '', 'yoku', 'DỰC', 'Hôm sau, tiếp theo', 11, '羽 -> 立', '翌朝 早く 出発しました。', 'Yokuasa hayaku shuppatsushimashita.', 'Sáng hôm sau tôi xuất phát từ sớm.', 'N3', 'Đôi cánh vươn dậy', 'Đôi cánh chim vỗ cánh đón ngày tiếp theo.', '⏭️', v_ch1_id, 16, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('予', 'ヨ', 'あらかじ・め', 'yo', 'DỰ', 'Dự định, trước', 4, 'マ -> 亅', '来週の 予定を たてます。', 'Raishuu no yotei o tatemasu.', 'Tôi lập kế hoạch cho tuần tới.', 'N3', 'Mũi khoan định trước', 'Chuẩn bị từ trước mọi việc chu toàn.', '📝', v_ch1_id, 17, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('定', 'テイ, ジョウ', 'さだ・める', 'sada', 'ĐỊNH', 'Cố định, xác định', 8, '宀 -> 疋', '定休日なので 店は 休みです。', 'Teikyuubi nanode mise wa yasumi desu.', 'Vì là ngày nghỉ cố định nên tiệm đóng cửa.', 'N3', 'Mái nhà cố định', 'Dưới mái nhà bước chân an cư vững vàng.', '📌', v_ch1_id, 18, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('用', 'ヨウ', 'もち・いる', 'you', 'DỤNG', 'Sử dụng, việc cần', 5, '冂 -> 二 -> 丨', '用事が あるので 早く 帰ります。', 'Youji ga aru node hayaku kaerimasu.', 'Vì có việc bận nên tôi về sớm.', 'N3', 'Hộp dụng cụ', 'Chiếc hộp có các ngăn đựng dụng cụ cần dùng.', '📎', v_ch1_id, 19, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('事', 'ジ', 'こと', 'koto', 'SỰ', 'Sự việc, công việc', 8, '一 -> 彐 -> 亅', '大事な ことを 忘れていました。', 'Daiji na koto o wasureteimashita.', 'Tôi đã quên mất một việc quan trọng.', 'N3', 'Ghi chép công việc', 'Cầm bút ghi lại những sự việc xảy ra.', '📋', v_ch1_id, 20, '/assets/kanji/n3/illustrations/chap1_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('押', 'オウ', 'お・す, お・さえる', 'o', 'ÁP', 'Ấn, đẩy, đè xuống', 8, '扌 -> 甲', 'ボタンを 押して ドアを 開けます。', 'Botan o oshite doa o akemasu.', 'Bấm nút để mở cửa.', 'N3', 'Tay ấn nút giáp', 'Bàn tay ấn mạnh vào chiếc nút cứng.', '🔘', v_ch2_id, 1, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('引', 'イン', 'ひ・く, ひ・ける', 'hi', 'DẪN', 'Kéo, lôi cuốn, tra cứu', 4, '弓 -> 丨', '辞書を 引いて 言葉を 調べます。', 'Jisho o hiite kotoba o shirabemasu.', 'Tra từ điển tìm nghĩa từ vựng.', 'N3', 'Giương cung kéo dây', 'Cây cung kéo căng dây chuẩn bị bắn.', '🏹', v_ch2_id, 2, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('取', 'シュ', 'と・る', 'to', 'THỦ', 'Lấy, nắm giữ', 8, '耳 -> 又', '棚から 本を 取ってください。', 'Tana kara hon o totte kudasai.', 'Hãy lấy giùm tôi cuốn sách trên giá.', 'N3', 'Tay nắm lấy tai', 'Bàn tay nắm lấy tai lắng nghe cẩn thận.', '👌', v_ch2_id, 3, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('消', 'ショウ', 'き・える, け・す', 'ki', 'TIÊU', 'Tắt, xóa, dập tắt', 10, '氵 -> 肖', '部屋を 出るときは 電気を 消します。', 'Heya o deru toki wa denki o keshimasu.', 'Khi rời phòng hãy tắt đèn.', 'N3', 'Nước dập tắt than', 'Dội nước dập tắt ngọn than đang cháy.', '🧯', v_ch2_id, 4, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('戸', 'コ', 'と', 'to', 'HỘ', 'Cánh cửa, căn nhà', 4, '戸', '雨戸を 閉めて 台風に そなえます。', 'Amado o shimete taifuu ni sonaemasu.', 'Đóng cửa chớp phòng bão.', 'N3', 'Cánh cửa một cánh', 'Cánh cửa gỗ đơn mở ra đóng vào ngôi nhà.', '🚪', v_ch2_id, 5, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('窓', 'ソウ', 'まど', 'mado', 'SONG', 'Cửa sổ', 11, '穴 -> 厶 -> 心', '窓を 開けて 空気を 入れ替えます。', 'Mado o akete kuuki o irekaemasu.', 'Mở cửa sổ cho thoáng khí.', 'N3', 'Cửa sổ ngắm trăng', 'Khoét một lỗ trên vách nhà đón ánh sáng thanh lọc tâm hồn.', '🪟', v_ch2_id, 6, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('階', 'カイ', 'きざはし', 'kai', 'GIAI', 'Tầng lầu, bậc cấp', 12, '阝 -> 皆', '私の 部屋は 三階に あります。', 'Watashi no heya wa sangai ni arimasu.', 'Phòng tôi ở tầng 3.', 'N3', 'Đồi bậc thang cho mọi người', 'Mọi người cùng bước lên từng bậc thềm sườn đồi.', '🏢', v_ch2_id, 7, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('段', 'ダン', '', 'dan', 'ĐOẠN', 'Giai đoạn, bậc thang', 9, '𠂆 -> 殳', '階段を 急いで 上がります。', 'Kaidan o isoide agarimasu.', 'Vội vã bước lên từng bậc cầu thang.', 'N3', 'Cầm búa đục từng bậc', 'Bàn tay cầm búa đẽo từng đoạn bậc thang đá.', '🪜', v_ch2_id, 8, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('植', 'ショク', 'う・える, う・わる', 'u', 'THỰC', 'Trồng trọt, thực vật', 12, '木 -> 直', '庭に トマトの 苗を 植えました。', 'Niwa ni tomato no nae o uemashita.', 'Tôi trồng cây giống cà chua trong vườn.', 'N3', 'Cây đứng thẳng', 'Trồng cây con thẳng đứng ngay ngắn.', '🪴', v_ch2_id, 9, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('葉', 'ヨウ', 'は', 'ha', 'DIỆP', 'Lá cây, trang giấy', 12, '艹 -> 枼', '秋に なると 木の葉が 赤く なります。', 'Aki ni naru to konoha ga akaku narimasu.', 'Thu về lá cây chuyển sang màu đỏ.', 'N3', 'Cỏ mọc trên cành', 'Những chiếc lá xanh mọc thành từng thế trên cành cây.', '🍂', v_ch2_id, 10, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('実', 'ジツ', 'み, みの・る', 'mi', 'THỰC', 'Quả, sự thật, thực tế', 8, '宀 -> 貫', 'りんごの 木に たくさん 実が なりました。', 'Ringo no ki ni takusan mi ga narimashita.', 'Cây táo kết rất nhiều quả ngọt.', 'N3', 'Nhà chứa đầy hạt quả', 'Dưới mái nhà đầy ắp quả ngọt và sự sung túc.', '🍎', v_ch2_id, 11, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('根', 'コン', 'ね', 'ne', 'CĂN', 'Rễ cây, gốc rễ', 10, '木 -> 艮', '植物の 根が 深く のびています。', 'Shokubutsu no ne ga fukaku nobiteimasu.', 'Rễ cây mọc cắm sâu vào lòng đất.', 'N3', 'Gốc rễ cây bám chặt', 'Gốc rễ cây kiên cố bám chắc chắn vào lòng đất.', '🌱', v_ch2_id, 12, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('建', 'ケン', 'た・てる, た・つ', 'ta', 'KIẾN', 'Xây dựng, tòa nhà', 9, '廴 -> 聿', 'ここに 新しい ビルを 建てます。', 'Koko ni atarashii biru o tatemasu.', 'Người ta xây tòa nhà mới ở đây.', 'N3', 'Cầm bút vẽ bản vẽ bước đi', 'Cầm bút vẽ thiết kế và bước đi kiến thiết công trình.', '🏗️', v_ch2_id, 13, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('築', 'チク', 'きず・く', 'kizu', 'TRÚC', 'Kiến trúc, xây đắp', 16, '竹 -> 筑', '二人の 信頼関係を 築きます。', 'Futari no shinraikankei o kizukimasu.', 'Xây đắp mối quan hệ tin cậy giữa hai người.', 'N3', 'Tre và đất đắp lũy', 'Dùng tre và đất đá xây đắp nên công trình kiên cố.', '🏛️', v_ch2_id, 14, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('構', 'コウ', 'かま・える, かま・う', 'kama', 'CẤU', 'Cấu trúc, chuẩn bị tư thế', 14, '木 -> 冓', '駅前に 新しい 店を 構えました。', 'Ekimae ni atarashii mise o kamaemashita.', 'Mở và dựng cửa hàng mới ngay trước ga.', 'N3', 'Cây đan kết thành cấu trúc', 'Những thanh gỗ ghép đan kết tạo nên cấu trúc vững chắc.', '📐', v_ch2_id, 15, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('造', 'ゾウ', 'つく・る', 'tsuku', 'TẠO', 'Chế tạo, cấu tạo', 10, '告 -> 辶', 'この 車は 日本で 製造されました。', 'Kono kuruma wa Nihon de seizousaremashita.', 'Chiếc xe này được sản xuất tại Nhật Bản.', 'N3', 'Báo tin bước đi chế tạo', 'Tiến bước tạo dựng nên những sản phẩm chất lượng cao.', '🏭', v_ch2_id, 16, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('設', 'セツ', 'もう・ける', 'mou', 'THIẾT', 'Thiết lập, bố trí', 11, '言 -> 殳', '公園に ベンチを 設置しました。', 'Kouen ni benchi o setchishimashita.', 'Bố trí thêm ghế băng trong công viên.', 'N3', 'Lời nói thiết lập', 'Dùng lời chỉ đạo xây dựng thiết lập cơ sở.', '⚙️', v_ch2_id, 17, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('柱', 'チュウ', 'はしら', 'hashira', 'TRỤ', 'Cột nhà, trụ cột', 9, '木 -> 主', '家を ささえる 太い 柱です。', 'Ie o sasaeru futoi hashira desu.', 'Cây cột to chống đỡ cho cả ngôi nhà.', 'N3', 'Cây gỗ làm chủ', 'Cây gỗ vững chãi làm trụ cột chính của công trình.', '🏛️', v_ch2_id, 18, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('庫', 'コ, ク', '', 'ko', 'KHỐ', 'Nhà kho, kho chứa', 10, '广 -> 車', '車を 車庫に 入れます。', 'Kuruma o shako ni iremasu.', 'Cất ô tô vào gara.', 'N3', 'Xe trong nhà kho', 'Dưới mái nhà có chỗ đỗ và chứa xe cộ an toàn.', '📦', v_ch2_id, 19, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('向', 'コウ', 'む・く, む・かう', 'mu', 'HƯỚNG', 'Hướng về, hướng đi', 6, '口 -> 丿', '目標に 向かって 努力します。', 'Mokuhyou ni mukatte doryokushimasu.', 'Nỗ lực hướng tới mục tiêu đã định.', 'N3', 'Cửa sổ mở hướng ra ngoài', 'Khung cửa mở hướng ra đón ánh nắng và tương lai.', '🧭', v_ch2_id, 20, '/assets/kanji/n3/illustrations/chap2_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('熱', 'ネツ', 'あつ・い', 'atsu', 'NHIỆT', 'Nhiệt độ, nóng, sốt', 15, '執 -> 灬', 'スープが 熱いので 気をつけてください。', 'Suupu ga atsui node ki o tsukete kudasai.', 'Món súp đang nóng nên hãy cẩn thận.', 'N3', 'Lửa đốt nóng hừng hực', 'Bàn tay nắm lấy vật được đun trên ngọn lửa nóng bỏng.', '🍲', v_ch3_id, 1, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('冷', 'レイ', 'つめ・たい, ひ・える', 'tsume', 'LÃNH', 'Lạnh lùng, nguội mát', 7, '冫 -> 令', '冷蔵庫で ビールを 冷やします。', 'Reizouko de biiru o hiyashimasu.', 'Làm lạnh bia trong tủ lạnh.', 'N3', 'Lệnh đóng băng lạnh', 'Tảng băng ban phát khí lạnh mát mẻ.', '🧊', v_ch3_id, 2, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('温', 'オン', 'あたた・かい, あたた・める', 'atata', 'ÔN', 'Ấm áp, ôn hòa', 12, '氵 -> 昷', 'スープを 電子レンジで 温めます。', 'Suupu o denshirenji de atatamemasu.', 'Hâm nóng súp bằng lò vi sóng.', 'N3', 'Nước ấm trong chậu', 'Dòng nước được sưởi ấm trong chiếc chậu đầy.', '☕', v_ch3_id, 3, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('度', 'ド, ト', 'たび', 'do', 'ĐỘ', 'Nhiệt độ, mức độ, lần', 9, '广 -> 廿 -> 又', '今日の 気温は 25度です。', 'Kyou no kion wa nijuugodo desu.', 'Nhiệt độ hôm nay là 25 độ C.', 'N3', 'Đo lường mức độ', 'Dưới mái hiên dùng thước đo từng mức độ ấm lạnh.', '🌡️', v_ch3_id, 4, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('材', 'ザイ', '', 'zai', 'TÀI', 'Nguyên liệu, tài liệu', 7, '木 -> 才', 'スーパーで 料理の 材料を 買いました。', 'Suupaa de ryouri no zairyou o kaimashita.', 'Mua nguyên liệu nấu ăn ở siêu thị.', 'N3', 'Cây gỗ có tài', 'Cây gỗ hữu dụng trở thành nguyên liệu chế tác.', '🪵', v_ch3_id, 5, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('型', 'ケイ', 'かた', 'kata', 'HÌNH', 'Khuôn mẫu, kiểu mẫu', 9, '刑 -> 土', 'ケーキの 型に 生地を 流し込みます。', 'Keeki no kata ni kiji o nagashikomimasu.', 'Đổ bột bánh vào khuôn bánh.', 'N3', 'Khuôn đúc bằng đất', 'Dùng đất nung tạo nên chiếc khuôn mẫu định hình.', '🧁', v_ch3_id, 6, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('焼', 'ショウ', 'や・く, や・ける', 'ya', 'THIÊU', 'Nướng, thiêu đốt', 12, '火 -> 尭', 'フライパンで お肉を 焼きます。', 'Furaipan de oniku o yakimasu.', 'Nướng thịt trên chảo.', 'N3', 'Lửa nướng đồ ăn', 'Ngọn lửa hồng nướng chín đều món ăn.', '🥩', v_ch3_id, 7, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('器', 'キ', 'うつわ', 'utsuwa', 'KHÍ', 'Dụng cụ, đồ chứa, bát đĩa', 16, '口 x 4 -> 犬', 'きれいな 器に 料理を 盛り付けます。', 'Kirei na utsuwa ni ryouri o moritsukemasu.', 'Bày biện thức ăn vào chiếc đĩa đẹp.', 'N3', 'Bốn chiếc bát quanh chú chó', 'Bốn góc bát đĩa đồ dùng xếp quanh bảo vệ.', '🥣', v_ch3_id, 8, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('卵', 'ラン', 'たまご', 'tamago', 'NOÃN', 'Trứng', 7, '卯 -> 丶', '朝ごはんに 目玉焼きの 卵を 食べます。', 'Asagohan ni medamayaki no tamago o tabemasu.', 'Bữa sáng tôi ăn trứng ốp la.', 'N3', 'Hai quả trứng tròn', 'Hai quả trứng chim sinh đôi nằm trong tổ.', '🥚', v_ch3_id, 9, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('乳', 'ニュウ', 'ちち', 'nyuu', 'NHŨ', 'Sữa, nhũ hoa', 8, '爫 -> 子', '毎朝 牛乳を 一杯 飲みます。', 'Maiasa gyuunyuu o ippai nomimasu.', 'Mỗi sáng tôi uống một cốc sữa bò.', 'N3', 'Mẹ ôm con bú sữa', 'Bàn tay người mẹ ôm ấp đứa con nhỏ cho bú sữa.', '🥛', v_ch3_id, 10, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('粉', 'フン', 'こな, こ', 'kona', 'PHẤN', 'Bột, vụn nhỏ', 10, '米 -> 分', '小麦粉と 砂糖を まぜます。', 'Komugiko to satou o mazemasu.', 'Trộn bột mì với đường.', 'N3', 'Gạo xay thành bột', 'Hạt gạo được chia nhỏ tán mịn thành bột trắng.', '🌾', v_ch3_id, 11, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('塩', 'エン', 'しお', 'shio', 'DIÊM', 'Muối ăn', 13, '土 -> 人 -> 口 -> 皿', 'スープに 塩を 少し 入れます。', 'Suupu ni shio o sukoshi iremasu.', 'Cho thêm một chút muối vào súp.', 'N3', 'Muối trên đĩa đất', 'Vị quan giám sát người dân phơi muối trên đĩa đất.', '🧂', v_ch3_id, 12, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('菜', 'サイ', 'な', 'sai', 'THÁI', 'Rau củ, món ăn', 11, '艹 -> 采', '野菜を たくさん 食べましょう。', 'Yasai o takusan tabemashou.', 'Hãy ăn thật nhiều rau củ nhé.', 'N3', 'Hái rau ăn', 'Cỏ cây xanh tươi hái về làm thức ăn bổ dưỡng.', '🥗', v_ch3_id, 13, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('果', 'カ', 'くだ', 'kuda', 'QUẢ', 'Trái cây, thành quả', 8, '田 -> 木', 'くだもの売り場で りんごを 買いました。', 'Kudamonouriba de ringo o kaimashita.', 'Mua táo ở quầy bán trái cây.', 'N3', 'Quả chín trên cây', 'Trên cành cây trĩu nặng quả chín mọng nước.', '🍊', v_ch3_id, 14, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('豆', 'トウ, ズ', 'まめ', 'mame', 'ĐẬU', 'Hạt đậu, đĩa đựng thức ăn', 7, '豆', '朝食に 納豆を 食べます。', 'Choushoku ni nattou o tabemasu.', 'Bữa sáng tôi ăn món đậu tương lên men Natto.', 'N3', 'Hạt đậu trên đĩa', 'Hạt đậu tròn trịa nằm trên chiếc đĩa có chân cao.', '🫘', v_ch3_id, 15, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('缶', 'カン', '', 'kan', 'PHẪU', 'Đồ hộp, lon', 6, '缶', '缶ビールを 買って 帰ります。', 'Kanbiiru o katte kaerimasu.', 'Mua lon bia mang về nhà.', 'N3', 'Bình gốm nắp kín', 'Chiếc bình đậy nắp kín như lon đồ hộp tiện lợi.', '🥫', v_ch3_id, 16, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('杯', 'ハイ', 'さかずき', 'hai', 'BÔI', 'Cốc, chén, đếm chén', 8, '木 -> 不', 'コーヒーを もう 一杯 いかがですか。', 'Koohii o mou ippai ikaga desu ka.', 'Bạn uống thêm một tách cà phê nữa nhé?', 'N3', 'Chén gỗ uống rượu', 'Chiếc chén đẽo từ gỗ mộc dùng uống nước.', '☕', v_ch3_id, 17, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('枚', 'マイ', '', 'mai', 'MAI', 'Tờ, tấm (đơn vị đếm vật mỏng)', 8, '木 -> 攵', 'シャツを 二枚 買いました。', 'Shatsu o nimai kaimashita.', 'Tôi đã mua hai chiếc áo sơ mi.', 'N3', 'Gỗ mỏng dát phẳng', 'Gỗ mỏng phẳng lì đếm từng tấm từng tờ.', '📄', v_ch3_id, 18, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('匹', 'ヒツ', 'ひき', 'hiki', 'THẤT', 'Con (đơn vị đếm động vật)', 4, '匚 -> 儿', 'うちには 猫が 二匹 います。', 'Uchi ni wa neko ga nihiki imasu.', 'Nhà tôi có nuôi hai con mèo.', 'N3', 'Bao bọc thú cưng', 'Chiếc chuồng nhỏ bao bọc hai đôi chân động vật.', '🐈', v_ch3_id, 19, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('量', 'リョウ', 'はか・る', 'ryou', 'LƯỢNG', 'Khối lượng, đo lường', 12, '日 -> 一 -> 里', '砂糖の 分量を 正確に はかります。', 'Satou no bunryou o seikaku ni hakarimasu.', 'Đong đếm chính xác phân lượng đường.', 'N3', 'Đo lường ánh dương', 'Mặt trời chiếu sáng ngàn dặm đo lường độ lớn dung lượng.', '⚖️', v_ch3_id, 20, '/assets/kanji/n3/illustrations/chap3_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('頭', 'トウ, ズ', 'あたま, かしら', 'atama', 'ĐẦU', 'Cái đầu, dẫn đầu', 16, '豆 -> 頁', 'かぜを ひいて 頭が 痛いです。', 'Kaze o hiite atama ga itai desu.', 'Bị cảm nên tôi bị đau đầu.', 'N3', 'Cái đầu to lớn', 'Trang giấy vẽ chiếc đầu người thông minh.', '🧠', v_ch4_id, 1, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('顔', 'ガン', 'かお', 'kao', 'NHAN', 'Khuôn mặt, nét mặt', 18, '彦 -> 頁', '朝 起きたら 顔を 洗います。', 'Asa okitara kao o araimasu.', 'Buổi sáng thức dậy tôi rửa mặt.', 'N3', 'Gương mặt tuấn tú', 'Chàng trai tuấn tú có khuôn mặt rạng ngời.', '😊', v_ch4_id, 2, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('首', 'シュ', 'くび', 'kubi', 'THỦ', 'Cổ, người đứng đầu', 9, '首', '寒いので 首に マフラーを 巻きます。', 'Samui node kubi ni mafuraa o makimasu.', 'Vì trời lạnh nên tôi quàng khăn vào cổ.', 'N3', 'Chiếc cổ đội tóc', 'Đầu và cổ vững chãi chống đỡ phía trên thân thể.', '🧣', v_ch4_id, 3, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('鼻', 'ビ', 'はな', 'hana', 'TỊ', 'Mũi', 14, '自 -> 畀', '花粉症で 鼻水が 止まりません。', 'Kafunshou de hanamizu ga tomarimasen.', 'Dị ứng phấn hoa khiến nước mũi chảy không ngừng.', 'N3', 'Tự chỉ vào mũi mình', 'Tự bản thân ngón tay chỉ vào chóp mũi.', '👃', v_ch4_id, 4, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('呼', 'コ', 'よ・ぶ', 'yo', 'HÔ', 'Gọi tên, thở ra', 8, '口 -> 乎', '名前を 呼ばれたら 返事を してください。', 'Namae o yobaretara henji o shite kudasai.', 'Khi được gọi tên hãy trả lời nhé.', 'N3', 'Miệng hô to', 'Mở miệng hô to gọi người phía trước.', '📢', v_ch4_id, 5, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('吸', 'キュウ', 'す・う', 'su', 'HẤP', 'Hút, hít vào', 6, '口 -> 及', '深呼吸して 新鮮な 空気を 吸います。', 'Shinkokyuu shite shinsen na kuuki o suimasu.', 'Hít thở sâu hấp thụ luồng không khí trong lành.', 'N3', 'Miệng hút kịp', 'Đưa miệng tới kịp thời hít luồng dưỡng khí.', '🫁', v_ch4_id, 6, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('息', 'ソク', 'いき', 'iki', 'TỨC', 'Hơi thở, nghỉ ngơi, con cái', 10, '自 -> 心', '階段を 走って 息が 切れました。', 'Kaidan o hashitte iki ga kiremashita.', 'Chạy cầu thang làm tôi thở dốc đứt hơi.', 'N3', 'Tự tâm thở ra', 'Bản thân từ tận đáy lòng thở ra nhịp sống.', '💨', v_ch4_id, 7, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('汗', 'カン', 'あせ', 'ase', 'HÃN', 'Mồ hôi', 6, '氵 -> 干', '運動した あと たくさん 汗を かきました。', 'Undoushita ato takusan ase o kakimashita.', 'Sau khi vận động tôi toát rất nhiều mồ hôi.', 'N3', 'Nước khô trên da', 'Những giọt nước chảy ra rồi khô dần khi vận động.', '💦', v_ch4_id, 8, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('検', 'ケン', '', 'ken', 'KIỂM', 'Kiểm tra, kiểm định', 12, '木 -> 僉', '病院で 胃の 検査を うけました。', 'Byouin de i no kensa o ukemashita.', 'Tôi đã kiểm tra dạ dày ở bệnh viện.', 'N3', 'Gỗ kiểm định', 'Mọi người cùng kiểm tra kỹ lưỡng từng thanh gỗ.', '🔍', v_ch4_id, 9, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('査', 'サ', '', 'sa', 'TRA', 'Điều tra, kiểm tra', 9, '木 -> 且', '原因を くわしく 調査します。', 'Gen-in o kuwashiku chousashimasu.', 'Điều tra kỹ càng nguyên nhân sự việc.', 'N3', 'Xem xét từng lớp cây', 'Xem xét từng lớp thớ gỗ tìm manh mối.', '📋', v_ch4_id, 10, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('歯', 'シ', 'は', 'ha', 'XỈ', 'Răng', 12, '止 -> 凵 -> 米', '毎日 毎食後に 歯を みがきます。', 'Mainichi maishokugo ni ha o migakimasu.', 'Đánh răng mỗi ngày sau bữa ăn.', 'N3', 'Răng nhai hạt gạo', 'Hàng răng nhai nát hạt gạo trắng sạch.', '🦷', v_ch4_id, 11, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('痛', 'ツウ', 'いた・い, いた・む', 'ita', 'THỐNG', 'Đau đớn, nhức nhối', 12, '疒 -> 甬', 'おなかが 痛くて 動けません。', 'Onaka ga itakute ugokemasen.', 'Đau bụng quá không nhấc người nổi.', 'N3', 'Bệnh đau buốt', 'Cơn bệnh làm cho thân xác đau buốt nhức nhối.', '🩹', v_ch4_id, 12, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('血', 'ケツ', 'ち', 'chi', 'HUYẾT', 'Máu', 6, '丿 -> 皿', '指を 切って 血が 出ました。', 'Yubi o kitte chi ga demashita.', 'Bị đứt tay nên máu chảy ra.', 'N3', 'Giọt máu trong đĩa', 'Một giọt máu tươi rớt vào chiếc đĩa tế.', '🩸', v_ch4_id, 13, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('液', 'エキ', '', 'eki', 'DỊCH', 'Chất lỏng, dịch thể', 11, '氵 -> 夜', '血液型を 教えてください。', 'Ketsuekigata o oshiete kudasai.', 'Xin hãy cho biết nhóm máu của bạn.', 'N3', 'Nước ban đêm', 'Dòng nước chảy trong bóng đêm âm thầm.', '🧪', v_ch4_id, 14, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('包', 'ホウ', 'つつ・む', 'tsutsu', 'BAO', 'Gói ghém, bao bọc', 5, '勹 -> 巳', 'けがをした ところを 包帯で 包みます。', 'Kega o shita tokoro o houtai de tsutsumimasu.', 'Dùng băng gạc băng bọc chỗ vết thương.', 'N3', 'Bao bọc thai nhi', 'Bao bọc đứa trẻ sơ sinh an toàn ấm áp.', '📦', v_ch4_id, 15, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('帯', 'タイ', 'お・びる, おび', 'obi', 'ĐỚI', 'Đai, dải băng, thắt lưng', 10, '卅 -> 冖 -> 巾', '着物の 帯を しっかり 結びます。', 'Kimono no obi o shikkari musubimasu.', 'Thắt chặt dải đai lưng áo Kimono.', 'N3', 'Dải đai vắt ngang lưng', 'Dải đai vải dài quấn quanh bảo vệ cơ thể.', '🥋', v_ch4_id, 16, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('救', 'キュウ', 'すく・う', 'suku', 'CỨU', 'Cứu chữa, giúp đỡ', 11, '求 -> 攵', 'おぼれている 人を 救助しました。', 'Oboreteiru hito o kyuujoshimashita.', 'Đã cứu trợ người đang bị đuối nước.', 'N3', 'Cầu xin cứu giúp', 'Đáp ứng lời cầu cứu mà ra tay tương trợ.', '🛟', v_ch4_id, 17, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('助', 'ジョ', 'たす・かる, たす・ける', 'tasu', 'TRỢ', 'Trợ giúp, cứu trợ', 7, '且 -> 力', '友達が 手伝ってくれて 助かりました。', 'Tomodachi ga tetsudatte kurete tasukarimashita.', 'Bạn bè giúp đỡ một tay nên tôi đã đỡ vất vả.', 'N3', 'Góp sức trợ giúp', 'Cùng nhau dốc sức lực tương trợ lẫn nhau.', '🤝', v_ch4_id, 18, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('死', 'シ', 'し・ぬ', 'shi', 'TỬ', 'Chết, qua đời', 6, '歹 -> 匕', '命を 落とさずに すみました。', 'Inochi o otosazu ni sumimashita.', 'May mắn không bị mất mạng.', 'N3', 'Xương tàn bên người ngã', 'Hình hài bộ xương tàn khi sự sống qua đi.', '⚰️', v_ch4_id, 19, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('亡', 'ボウ', 'な・くなる', 'naku', 'VONG', 'Mất, qua đời, diệt vong', 3, '亠 -> 乚', '祖父は 去年 亡くなりました。', 'Sofu wa kyonen nakunarimashita.', 'Ông nội tôi đã qua đời vào năm ngoái.', 'N3', 'Mất dấu dưới mái nhà', 'Bóng người khuất dần biến mất vào hư không.', '🕊️', v_ch4_id, 20, '/assets/kanji/n3/illustrations/chap4_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('戦', 'セン', 'たたか・う', 'tataka', 'CHIẾN', 'Chiến đấu, thi đấu', 16, '単 -> 戈', '決勝戦で 強敵と 戦います。', 'Kesshousen de kyouteki to tatakaimasu.', 'Chiến đấu với đối thủ mạnh trong trận chung kết.', 'N3', 'Cầm giáo chiến đấu', 'Binh lính cầm ngọn giáo xông pha trận mạc.', '⚔️', v_ch5_id, 1, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('決', 'ケツ', 'き・まる, き・める', 'ki', 'QUYẾT', 'Quyết định, dứt khoát', 7, '氵 -> 夬', '進路を 自分で 決めました。', 'Shinro o jibun de kimemashita.', 'Tôi tự mình quyết định con đường tương lai.', 'N3', 'Khơi dòng quyết đoán', 'Mở đường khơi thông dòng nước dứt khoát.', '🎯', v_ch5_id, 2, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('勝', 'ショウ', 'か・つ', 'ka', 'THẮNG', 'Chiến thắng, vượt trội', 12, '月 -> 券', '試合に 勝って 涙を 流しました。', 'Shiai ni katte namida o nagashimashita.', 'Thắng trận đấu tôi trào nước mắt xúc động.', 'N3', 'Dốc sức giành thắng lợi', 'Dốc toàn bộ sức lực nâng cúp chiến thắng vẻ vang.', '🏆', v_ch5_id, 3, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('負', 'フ', 'ま・ける, お・う', 'ma', 'PHỤ', 'Thua cuộc, gánh vác', 9, '⺈ -> 貝', '試合に 負けて くやしかったです。', 'Shiai ni makete kuyashikatta desu.', 'Thua trận đấu tôi tiếc nuối vô cùng.', 'N3', 'Gánh vỏ sò thua cuộc', 'Người cúi gập gánh vác số sò nợ nần.', '😞', v_ch5_id, 4, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('代', 'ダイ', 'か・わる, か・える', 'ka', 'ĐẠI', 'Thay thế, thời đại, đại diện', 5, '亻 -> 弋', '父の 代わりに 出席しました。', 'Chichi no kawari ni shussekishimashita.', 'Tôi đi tham dự thay cho bố.', 'N3', 'Người thay thế cầm cọc', 'Người này thay người kia đảm đương nhiệm vụ.', '🔄', v_ch5_id, 5, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('表', 'ヒョウ', 'おもて, あらわ・す', 'omote', 'BIỂU', 'Biểu hiện, mặt ngoài, bảng', 8, '一 -> 𧘇', '気持ちを 言葉で 表します。', 'Kimochi o kotoba de arawashimasu.', 'Bày tỏ cảm xúc thành lời.', 'N3', 'Mặt ngoài chiếc áo', 'Mặt ngoài chiếc áo phô bày cho mọi người thấy.', '📊', v_ch5_id, 6, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('第', 'ダイ', '', 'dai', 'ĐỆ', 'Thứ tự, kỳ thứ', 11, '竹 -> 弟', '第一回目の 大会が 開かれました。', 'Daiikkai me no taikai ga hirakaremashita.', 'Đại hội lần thứ nhất đã được khai mạc.', 'N3', 'Thanh tre ghi thứ bậc', 'Thanh tre đánh dấu thứ bậc anh em trong nhà.', '🥇', v_ch5_id, 7, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('回', 'カイ', 'まわ・る, まわ・す', 'mawa', 'HỒI', 'Lần, quay vòng', 6, '囗 -> 口', '何回も れんしゅうを かさねました。', 'Nankai mo renshuu o kasanemashita.', 'Tôi đã luyện tập lặp đi lặp lại rất nhiều lần.', 'N3', 'Vòng tròn quay lại', 'Vòng tròn lớn bao bọc vòng tròn nhỏ quay đều.', '🔄', v_ch5_id, 8, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('記', 'キ', 'しる・す', 'shiru', 'KÝ', 'Ghi chép, ký ức', 10, '言 -> 己', '日記を 毎日 書いています。', 'Nikki o mainichi kaiteimasu.', 'Tôi viết nhật ký mỗi ngày.', 'N3', 'Lời tự mình ghi chép', 'Dùng lời lẽ ghi lại những điều của bản thân.', '✍️', v_ch5_id, 9, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('録', 'ロク', '', 'roku', 'LỤC', 'Ghi âm, ghi chép, kỷ lục', 16, '金 -> 彔', '世界新記録を たっせいしました。', 'Sekai shinkiroku o tasseishimashita.', 'Đã xác lập một kỷ lục thế giới mới.', 'N3', 'Khắc chữ lên kim loại', 'Khắc ghi mốc son chói lọi lên bảng vàng kim loại.', '📼', v_ch5_id, 10, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('優', 'ユウ', 'やさ・しい, すぐ・れる', 'yasa', 'ƯU', 'Ưu tú, hiền lành, giải nhất', 17, '亻 -> 憂', '兄は 成績が とても 優秀です。', 'Ani wa seiseki ga totemo yuushuu desu.', 'Anh trai tôi có thành tích học tập rất ưu tú.', 'N3', 'Người ưu tú ấm áp', 'Người tài năng xuất chúng luôn giữ tấm lòng nhân hậu.', '🌟', v_ch5_id, 11, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('賞', 'ショウ', '', 'shou', 'THƯỞNG', 'Phần thưởng, giải thưởng', 15, '⺌ -> 冂 -> 口 -> 貝', 'コンクールで 賞を もらいました。', 'Konkuuru de shou o moraimashita.', 'Tôi đã nhận được giải thưởng ở cuộc thi.', 'N3', 'Thưởng vỏ sò quý', 'Ban thưởng tiền tài ngọc ngà cho người có công.', '🎖️', v_ch5_id, 12, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('秒', 'ビョウ', '', 'byou', 'MIỄU', 'Giây (thời gian)', 9, '禾 -> 少', '一分は 六十秒です。', 'Ippun wa rokujuubyou desu.', 'Một phút có 60 giây.', 'N3', 'Cọng rơm nhỏ nhất', 'Một hạt thóc nhỏ bé như một giây tích tắc lướt qua.', '⏱️', v_ch5_id, 13, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('差', 'サ', 'さ・す', 'sa', 'SAI', 'Khoảng cách, chênh lệch, sai khác', 10, '羊 -> 工', '二人の 点数には 大きな 差が あります。', 'Futari no tensuu ni wa ookina sa ga arimasu.', 'Điểm số hai người có sự chênh lệch lớn.', 'N3', 'Con cừu đo khoảng cách', 'Con cừu so sánh tay nghề tạo nên sự khác biệt.', '↔️', v_ch5_id, 14, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('測', 'ソク', 'はか・る', 'haka', 'TRẮC', 'Đo đạc, suy đoán', 12, '氵 -> 則', '走った スピードを 測定します。', 'Hashitta supiido o sokuteishimashita.', 'Đo đạc vận tốc đã chạy.', 'N3', 'Dùng quy tắc đo nước', 'Thả thước đo độ sâu và mực nước chính xác.', '📏', v_ch5_id, 15, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('順', 'ジュン', '', 'jun', 'THUẬN', 'Thứ tự, thuận lợi', 12, '川 -> 頁', '順番を 守って ならんでください。', 'Junban o mamotte narande kudasai.', 'Hãy giữ đúng thứ tự và xếp hàng.', 'N3', 'Theo dòng chảy đầu', 'Dòng nước xuôi thuận dẫn đầu trôi chảy êm đềm.', '➡️', v_ch5_id, 16, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('球', 'キュウ', 'たま', 'tama', 'CẦU', 'Quả bóng, hình cầu', 11, '王 -> 求', '野球の ボールを 投げます。', 'Yakyuu no booru o nagemasu.', 'Ném quả bóng chày.', 'N3', 'Viên ngọc tròn', 'Viên ngọc tròn trịa được kiếm tìm mài giũa.', '⚾', v_ch5_id, 17, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('打', 'ダ', 'う・つ', 'u', 'ĐẢ', 'Đánh, đập', 5, '扌 -> 丁', 'ホームランを 打ちました。', 'Hoomuran o uchimashita.', 'Đã đánh một cú Home-run tuyệt đỉnh.', 'N3', 'Tay vung gậy đánh', 'Bàn tay vung chiếc đinh gậy đánh mạnh vào vật thể.', '🏏', v_ch5_id, 18, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('投', 'トウ', 'な・げる', 'nage', 'ĐẦU', 'Ném, quăng', 7, '扌 -> 殳', 'ピッチャーが ボールを 投げます。', 'Picchaa ga booru o nagemasu.', 'Cầu thủ ném bóng ném trái banh đi.', 'N3', 'Tay quăng ngọn lao', 'Bàn tay cầm ngọn lao ném thẳng về phía trước.', '🎯', v_ch5_id, 19, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('点', 'テン', '', 'ten', 'ĐIỂM', 'Điểm số, dấu chấm', 9, '占 -> 灬', 'テストで 百点を とりました。', 'Tesuto de hyakuten o torimashita.', 'Tôi đạt được 100 điểm tuyệt đối trong bài thi.', 'N3', 'Bói từng điểm chấm', 'Xem bói từng đốm lửa chấm nhỏ trên mai rùa.', '💯', v_ch5_id, 20, '/assets/kanji/n3/illustrations/chap5_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('感', 'カン', '', 'kan', 'CẢM', 'Cảm giác, cảm xúc', 13, '咸 -> 心', '映画を 見て ふかく 感動しました。', 'Eiga o mite fukaku kandoushimashita.', 'Xem phim xong tôi vô cùng cảm động.', 'N3', 'Trái tim rung cảm', 'Cả con tim rung lên cảm nhận tình người.', '💖', v_ch6_id, 1, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('情', 'ジョウ, セイ', 'なさ・け', 'jou', 'TÌNH', 'Tình cảm, tình hình', 11, '忄 -> 青', '日本の 事情を よく 知っています。', 'Nihon no jijou o yoku shitteimasu.', 'Tôi hiểu rất rõ tình hình thực tế ở Nhật Bản.', 'N3', 'Trái tim thanh xuân', 'Con tim xanh tươi chan chứa ân tình ấm áp.', '❤️', v_ch6_id, 2, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('恋', 'レン', 'こい, こい・しい', 'koi', 'LUYẾN', 'Tình yêu đôi lứa, tha thiết', 10, '亦 -> 心', '二人は 恋に おちました。', 'Futari wa koi ni ochimashita.', 'Hai người đã phải lòng yêu nhau.', 'N3', 'Tơ vương trong tim', 'Sợi tơ lòng vương vấn đong đầy trong tim.', '💘', v_ch6_id, 3, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('愛', 'アイ', '', 'ai', 'ÁI', 'Yêu thương, tình ái', 13, '爫 -> 冖 -> 心 -> 夂', '家族を ふかく 愛しています。', 'Kazoku o fukaku aishiteimasu.', 'Tôi yêu thương gia đình tha thiết.', 'N3', 'Chân bước ôm trọn con tim', 'Bước chân dịu dàng chở che nâng niu con tim người mình yêu.', '🥰', v_ch6_id, 4, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('信', 'シン', '', 'shin', 'TÍN', 'Tin tưởng, tín nhiệm, thư tín', 9, '亻 -> 言', '友達の 言葉を 信じます。', 'Tomodachi no kotoba o shinjimasu.', 'Tôi tin tưởng lời nói của bạn mình.', 'N3', 'Lời nói người quân tử', 'Lời nói của người quân tử luôn tạo dựng niềm tin.', '🤝', v_ch6_id, 5, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('想', 'ソウ', '', 'sou', 'TƯỞNG', 'Tưởng tượng, tư tưởng, nhớ nhung', 13, '相 -> 心', '将来の 夢を 想像します。', 'Shourai no yume o souzoushimasu.', 'Tưởng tượng về ước mơ trong tương lai.', 'N3', 'Tương hỗ con tim', 'Con tim nhìn ngắm và mường tượng về tương lai.', '💭', v_ch6_id, 6, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('伝', 'デン', 'つた・わる, つた・える', 'tsuta', 'TRUYỀN', 'Truyền đạt, lan truyền', 6, '亻 -> 云', '感謝の 気持ちを 伝えます。', 'Kansha no kimochi o tsutaemasu.', 'Truyền đạt lòng biết ơn sâu sắc.', 'N3', 'Người truyền lời mây', 'Người mang lời nói bay xa như mây truyền tin tức.', '🗣️', v_ch6_id, 7, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('欲', 'ヨク', 'ほ・しい', 'hoshi', 'DỤC', 'Khao khát, muốn có', 11, '谷 -> 欠', '新しい パソコンが 欲しいです。', 'Atarashii pasokon ga hoshii desu.', 'Tôi muốn có một chiếc máy tính xách tay mới.', 'N3', 'Thung lũng thiếu thốn', 'Đứng bên thung lũng thiếu thốn khao khát có được mọi điều.', '🎁', v_ch6_id, 8, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('苦', 'ク', 'くる・しい, にが・い', 'kuru', 'KHỔ', 'Đau khổ, cay đắng', 8, '艹 -> 古', 'この 薬は とても 苦いです。', 'Kono kusuri wa totemo nigai desu.', 'Thuốc này đắng nghét.', 'N3', 'Cỏ đắng ngàn xưa', 'Nếm vị cỏ đắng ngàn xưa cảm nhận nỗi khổ cực.', '😣', v_ch6_id, 9, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('悩', 'ノウ', 'なや・む', 'naya', 'NÃO', 'Phiền não, băn khoăn', 10, '忄 -> 𡿨 -> 凶', '将来の ことで 悩んでいます。', 'Shourai no koto de nayandeimasu.', 'Tôi đang đau đầu phiền não về chuyện tương lai.', 'N3', 'Trái tim phiền muộn', 'Con tim rối bời quẩn quanh những suy nghĩ lo âu.', '🤯', v_ch6_id, 10, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('困', 'コン', 'こま・る', 'koma', 'KHỐN', 'Khốn khó, bối rối', 7, '囗 -> 木', '道に まよって 困りました。', 'Michi ni mayotte komarimashita.', 'Bị lạc đường nên tôi rất bối rối.', 'N3', 'Cây trong lồng chật', 'Cây cối bị đóng kín trong tường bao khốn cùng tù túng.', '😓', v_ch6_id, 11, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('難', 'ナン', 'むずか・しい', 'muzuka', 'NAN', 'Gian nan, khó khăn', 18, '𦰩 -> 隹', '日本語の 敬語は 難しいです。', 'Nihongo no keigo wa muzukashii desu.', 'Kính ngữ tiếng Nhật thật là khó.', 'N3', 'Bắt chim trong lửa', 'Bắt chú chim giữa đống lửa quả là gian nan muôn trùng.', '🧗', v_ch6_id, 12, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('怒', 'ド', 'いか・る, おこ・る', 'oko', 'NỘ', 'Giận dữ, phẫn nộ', 9, '奴 -> 心', '約束を やぶって 怒られました。', 'Yakusoku o yabutte okoraremashita.', 'Thất hứa nên tôi bị mắng một trận giận dữ.', 'N3', 'Nô lệ ấm ức trong tim', 'Trái tim phẫn uất bùng lên cơn giận lôi đình.', '😡', v_ch6_id, 13, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('悲', 'ヒ', 'かな・しい', 'kana', 'BI', 'Bi thương, đau buồn', 12, '非 -> 心', '悲しい 知らせを 聞きました。', 'Kanashii shirase o kikimashita.', 'Tôi đã nghe một tin buồn xót xa.', 'N3', 'Trái tim chối từ niềm vui', 'Con tim tan nát từ chối mọi niềm vui thế gian.', '😢', v_ch6_id, 14, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('笑', 'ショウ', 'わら・う, え・む', 'wara', 'TIẾU', 'Cười, nụ cười', 10, '竹 -> 夭', 'みんなで 楽しく 笑い合いました。', 'Minna de tanoshiku warai aimashita.', 'Mọi người cùng nhau cười đùa vui vẻ.', 'N3', 'Tre uốn mình cười', 'Cành tre non đung đưa duyên dáng như nụ cười tươi.', '😄', v_ch6_id, 15, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('喜', 'キ', 'よろこ・ぶ', 'yoroko', 'HỈ', 'Vui mừng, hoan hỉ', 12, '壴 -> 口', '合格して 家族みんなで 喜びました。', 'Goukaku shite kazoku minna de yorokobimashita.', 'Thi đỗ nên cả nhà tôi ai nấy đều vui mừng khôn xiết.', 'N3', 'Trống đánh miệng cười', 'Đánh trống reo hò hân hoan đón tin mừng.', '🎉', v_ch6_id, 16, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('残', 'ザン', 'のこ・る, のこ・す', 'noko', 'TÀN', 'Còn lại, tàn dư, tiếc nuối', 10, '歹 -> 戈', '時間が 残っていません。', 'Jikan ga nokotteimasen.', 'Không còn nhiều thời gian nữa.', 'N3', 'Mảnh tàn giáo gãy', 'Chiếc giáo gãy trơ trọi còn sót lại trên chiến địa.', '⏳', v_ch6_id, 17, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('念', 'ネン', '', 'nen', 'NIỆM', 'Suy nghĩ, ý niệm, tưởng nhớ', 8, '今 -> 心', '試合に 負けて 残念でした。', 'Shiai ni makete zannen deshita.', 'Thua trận thật là đáng tiếc.', 'N3', 'Bây giờ trong tim', 'Những điều lắng đọng ngay lúc này trong đáy lòng.', '💭', v_ch6_id, 18, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泣', 'キュウ', 'な・く', 'na', 'KHỐC', 'Khóc', 8, '氵 -> 立', 'うれし涙を 泣きながら 流しました。', 'Ureshinamida o nakinagara nagashimashita.', 'Vừa khóc vừa trào nước mắt vì hạnh phúc.', 'N3', 'Nước mắt đứng tuôn', 'Đứng khóc nấc từng cơn nước mắt giàn giụa.', '😭', v_ch6_id, 19, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('涙', 'ルイ', 'なみだ', 'namida', 'LỆ', 'Nước mắt, giọt lệ', 10, '氵 -> 戻', '感動して 涙が 出ました。', 'Kandou shite namida ga demashita.', 'Cảm động quá nên nước mắt tôi cứ thế tuôn trào.', 'N3', 'Nước mắt quay về', 'Dòng lệ trào dâng nơi khóe mi rơi xuống.', '💧', v_ch6_id, 20, '/assets/kanji/n3/illustrations/chap6_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('結', 'ケツ', 'むす・ぶ', 'musu', 'KẾT', 'Buộc, kết nối, kết hôn', 12, '糸 -> 吉', '二人は けっこんして 固く 結ばれました。', 'Futari wa kekkon shite kataku musubaremashita.', 'Hai người kết hôn gắn bó keo sơn.', 'N3', 'Chỉ may điều lành', 'Sợi chỉ hồng se duyên lành kết nối đôi uyên ương.', '🎀', v_ch7_id, 1, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('婚', 'コン', '', 'kon', 'HÔN', 'Kết hôn, hôn lễ', 11, '女 -> 昏', '来月 友人の 結婚式に 出席します。', 'Raigetsu yuujin no kekkonshiki ni shussekishimashita.', 'Tháng sau tôi đi dự đám cưới bạn.', 'N3', 'Người con gái lúc hoàng hôn', 'Rước dâu đón nàng về dinh trong ánh hoàng hôn tuyệt đẹp.', '💍', v_ch7_id, 2, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('紹', 'ショウ', '', 'shou', 'THIỆU', 'Giới thiệu, tiếp nối', 11, '糸 -> 召', '友人に すてきな 人を 紹介してもらいました。', 'Yuujin ni suteki na hito o shoukai shitemoraimashita.', 'Được bạn giới thiệu cho một người rất tuyệt.', 'N3', 'Nối sợi dây lời mời', 'Dùng sợi tơ se mối bắc cầu giới thiệu đôi bên.', '🤝', v_ch7_id, 3, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('介', 'カイ', '', 'kai', 'GIỚI', 'Môi giới, can thiệp', 4, '人 -> 丿 -> 丨', '自己紹介を お願いします。', 'Jikoshoukai o onegaishimasu.', 'Xin mời bạn tự giới thiệu bản thân.', 'N3', 'Người đứng ở giữa', 'Người đứng ở giữa làm cầu nối giới thiệu trung gian.', '👥', v_ch7_id, 4, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('独', 'ドク', 'ひと・り', 'doku', 'ĐỘC', 'Đơn độc, độc thân, độc lập', 9, '犭 -> 虫', '彼は まだ 独身です。', 'Kare wa mada dokushin desu.', 'Anh ấy vẫn còn độc thân.', 'N3', 'Chó độc chiến', 'Chú chó một mình đứng canh gác kiêu hãnh đơn độc.', '🧍', v_ch7_id, 5, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('身', 'シン', 'み', 'mi', 'THÂN', 'Bản thân, cơ thể', 7, '身', '自分自身の 力を 信じます。', 'Jibunjishin no chikara o shinjimasu.', 'Tôi tin tưởng vào chính sức lực của bản thân mình.', 'N3', 'Hình dáng người mang bầu', 'Cơ thể người với bụng tròn tràn đầy sinh mệnh.', '👤', v_ch7_id, 6, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貯', 'チョ', 'た・める', 'ta', 'TRỮ', 'Tích trữ, tiết kiệm', 12, '貝 -> 宁', '毎月 銀行に 貯金しています。', 'Maitsuki ginkou ni chokin shiteimasu.', 'Mỗi tháng tôi đều gửi tiết kiệm vào ngân hàng.', 'N3', 'Vỏ sò cất trong nhà', 'Cất giữ tiền của vỏ sò quý vào hòm an toàn.', '💰', v_ch7_id, 7, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('期', 'キ', '', 'ki', 'KỲ', 'Kỳ hạn, thời kỳ', 12, '其 -> 月', '来週から テスト期間に 入ります。', 'Raishuu kara tesutokikan ni hairimasu.', 'Từ tuần sau sẽ bước vào kỳ thi.', 'N3', 'Mặt trăng định kỳ', 'Vầng trăng tròn khuyết theo đúng chu kỳ hạn định.', '🗓️', v_ch7_id, 8, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('約', 'ヤク', '', 'yaku', 'ƯỚC', 'Ước hẹn, khoảng chừng', 9, '糸 -> 勺', '友達と 会う 約束を しました。', 'Tomodachi to au yakusoku o shimashita.', 'Tôi đã hẹn gặp bạn mình.', 'N3', 'Buộc sợi dây giao ước', 'Cầm chiếc thìa buộc sợi tơ làm lời minh thề.', '🤙', v_ch7_id, 9, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('束', 'ソク', 'たば', 'taba', 'THÚC', 'Bó, buộc lại', 7, '木 -> 口', '彼女に バラの花束を プレゼントしました。', 'Kanojo ni baranohanataba o purezentoshimashita.', 'Tôi tặng cô ấy một bó hoa hồng.', 'N3', 'Buộc bó thanh gỗ', 'Dùng dây thừng buộc chặt các thanh gỗ lại thành bó.', '💐', v_ch7_id, 10, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('必', 'ヒツ', 'かなら・ず', 'kanara', 'TẤT', 'Tất yếu, nhất định', 5, '心 -> 丿', '約束は 必ず 守らなければなりません。', 'Yakusoku wa kanarazu mamoranakerebanarimasen.', 'Lời hứa thì nhất định phải giữ gìn.', 'N3', 'Nét gạch chia đôi tim', 'Quyết tâm khắc một vạch vào tim nhất định không lay chuyển.', '❗', v_ch7_id, 11, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('守', 'シュ, ス', 'まも・る', 'mamo', 'THỦ', 'Bảo vệ, gìn giữ, thủ hộ', 6, '宀 -> 寸', 'ルールを しっかり 守りましょう。', 'Ruuru o shikkari mamorimashou.', 'Hãy tuân thủ nghiêm túc các quy tắc nhé.', 'N3', 'Bảo vệ mái nhà', 'Bàn tay tấc đất che chở bảo vệ mái ấm gia đình.', '🛡️', v_ch7_id, 12, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('式', 'シキ', '', 'shiki', 'THỨC', 'Nghi thức, công thức, hình thức', 6, '弋 -> 工', '卒業式で 涙が こぼれました。', 'Sotsugyoushiki de namida ga koboremashita.', 'Nước mắt rơi trong buổi lễ tốt nghiệp.', 'N3', 'Quy chuẩn lễ nghi', 'Đặt thước và cọc căn chỉnh đúng chuẩn nghi thức.', '🎓', v_ch7_id, 13, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('列', 'レツ', '', 'retsu', 'LIỆT', 'Hàng ngũ, xếp hàng', 6, '歹 -> 刂', 'レジの 前に 行列が できています。', 'Reji no mae ni gyouretsu ga dekiteimasu.', 'Trước quầy thanh toán có một hàng dài người xếp hàng.', 'N3', 'Xếp hàng ngay ngắn', 'Dùng đao cắt chia hàng lối thẳng tắp.', '🚶‍♂️🚶‍♀️', v_ch7_id, 14, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('祝', 'シュク', 'いわ・う', 'iwa', 'CHÚC', 'Chúc mừng, cầu phúc', 9, '礻 -> 兄', '二人の 新しい 門出を 祝います。', 'Futari no atarashii kadode o iwaimasu.', 'Chúc mừng khởi đầu mới của hai người.', 'N3', 'Khấn thần chúc phúc', 'Trước bàn thờ thần linh người anh cầu chúc bình an.', '🥂', v_ch7_id, 15, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('酔', 'スイ', 'よ・う', 'yo', 'TÚY', 'Say rượu, say xe', 11, '酉 -> 卒', 'お酒を 飲みすぎて 酔ってしまいました。', 'Osake o nomisugite yotteshimaimashita.', 'Uống nhiều rượu quá nên tôi đã bị say bí tỉ.', 'N3', 'Bình rượu say ngất', 'Rượu trong bình ủ chín làm người ta say ngất ngây.', '🥴', v_ch7_id, 16, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('永', 'エイ', 'なが・い', 'ei', 'VĨNH', 'Vĩnh viễn, dài lâu', 5, '丶 -> 水', '二人の 永遠の 愛を ちかいます。', 'Futari no eien no ai o chikaimasu.', 'Thề hẹn tình yêu vĩnh cửu trọn đời bên nhau.', 'N3', 'Dòng nước chảy mãi', 'Dòng nước trường tồn chảy mãi không bao giờ cạn.', '♾️', v_ch7_id, 17, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('願', 'ガン', 'ねが・う', 'nega', 'NGUYỆN', 'Nguyện cầu, ước muốn', 19, '原 -> 頁', '神様に 合格を お願いしました。', 'Kamisama ni goukaku o onegaishimashita.', 'Tôi cầu xin thần linh phù hộ cho thi đỗ.', 'N3', 'Nguồn cội cúi đầu cầu', 'Cúi đầu trước ngọn nguồn tâm linh dâng lời nguyện ước.', '🙏', v_ch7_id, 18, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('幸', 'コウ', 'さいわ・い, しあわ・せ', 'shiawa', 'HẠNH', 'Hạnh phúc, may mắn', 8, '土 -> 𢆉', '毎日 幸せに くらしています。', 'Mainichi shiawase ni kurashiteimasu.', 'Mỗi ngày tôi đều sống trong niềm hạnh phúc ngập tràn.', 'N3', 'Thoát cùm gông may mắn', 'Mở được cùm khóa thoát nạn là niềm hạnh phúc lớn.', '🍀', v_ch7_id, 19, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('福', 'フク', '', 'fuku', 'PHÚC', 'Phúc đức, may mắn', 13, '礻 -> 畐', '家族の 幸福を 心から いのります。', 'Kazoku no koufuku o kokorokara inorimasu.', 'Tôi thành tâm cầu nguyện phúc lành cho gia đình.', 'N3', 'Thần ban đầy hũ lúa', 'Thần linh ban cho đầy ắp ruộng đồng hũ rượu ấm no phúc đức.', '🧧', v_ch7_id, 20, '/assets/kanji/n3/illustrations/chap7_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('関', 'カン', 'せき, かか・わる', 'kan', 'QUAN', 'Cửa ải, liên quan', 14, '門 -> 𢆶', '環境問題に 深く 関心が あります。', 'Kankyoumondai ni fukaku kanshin ga arimasu.', 'Tôi rất quan tâm đến các vấn đề môi trường.', 'N3', 'Then cài cổng thành', 'Then then then chốt đóng giữ cửa ải biên cương liên quan mật thiết.', '🚪', v_ch8_id, 1, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('係', 'ケイ', 'かかり, かか・わる', 'kakari', 'HỆ', 'Người phụ trách, liên hệ', 9, '亻 -> 系', '案内係の 人に 道を たずねます。', 'Annaigakari no hito ni michi o tazunemasu.', 'Hỏi đường người phụ trách quầy hướng dẫn.', 'N3', 'Người nắm giữ sợi dây', 'Người nắm giữ mối dây liên hệ phụ trách công việc.', '🏷️', v_ch8_id, 2, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('和', 'ワ', 'やわ・らぐ', 'wa', 'HÒA', 'Hòa bình, hài hòa, Nhật Bản', 8, '禾 -> 口', '平和な 世界を つくりましょう。', 'Heiwa na sekai o tsukurimashou.', 'Hãy cùng chung tay xây dựng một thế giới hòa bình.', 'N3', 'Cơm lúa no ấm hòa thuận', 'Cùng nhau ăn cơm lúa miệng cười hòa nhã êm thấm.', '🕊️', v_ch8_id, 3, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('付', 'フ', 'つ・く, つ・ける', 'tsu', 'PHÓ', 'Dán vào, kèm theo, giao phó', 5, '亻 -> 寸', '封筒に 切手を 付けます。', 'Fuutou ni kitte o tsukemasu.', 'Dán tem lên phong bì thư.', 'N3', 'Người trao gửi tận tay', 'Người đưa tận tấc tay giao phó gắn kết vào.', '📎', v_ch8_id, 4, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('娘', 'ジョウ', 'むすめ', 'musume', 'NƯƠNG', 'Con gái ruột, cô gái', 10, '女 -> 良', '娘は 今年 七五三を むかえました。', 'Musume wa kotoshi shichigosan o mukaemashita.', 'Năm nay con gái tôi đã tròn tuổi lễ Shichigosan.', 'N3', 'Người con gái nết na', 'Người con gái ngoan hiền đức hạnh tốt lành.', '👧', v_ch8_id, 5, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('老', 'ロウ', 'お・いる, ふ・ける', 'o', 'LÃO', 'Già cả, người già', 6, '耂 -> 匕', 'お年寄りを いたわりましょう。', 'Otoshiyori o itawarimashou.', 'Hãy quan tâm kính trọng người già nhé.', 'N3', 'Cụ già chống gậy', 'Cụ già tóc bạc râu dài tay chống gậy bước đi.', '👴', v_ch8_id, 6, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('婦', 'フ', '', 'fu', 'PHỤ', 'Phụ nữ, quý bà', 11, '女 -> 帚', '婦人服売り場で 母の 服を 選びます。', 'Fujinfukuuriba de haha no fuku o erabimasu.', 'Chọn quần áo cho mẹ ở quầy đồ nữ.', 'N3', 'Phụ nữ cầm chổi', 'Người phụ nữ đảm đang cầm chổi thu vén nhà cửa chu đáo.', '👩', v_ch8_id, 7, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('姓', 'セイ, ショウ', '', 'sei', 'TÍNH', 'Họ tên', 8, '女 -> 生', '結婚して 姓が かわりました。', 'Kekkon shite sei ga kawarimashita.', 'Kết hôn nên đã đổi sang họ của chồng.', 'N3', 'Người phụ nữ sinh con', 'Từ người mẹ sinh ra dòng dõi họ tộc truyền đời.', '📛', v_ch8_id, 8, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('仲', 'チュウ', 'なか', 'naka', 'TRỌNG', 'Mối quan hệ bạn bè, ở giữa', 6, '亻 -> 中', 'クラスメートと とても 仲が いいです。', 'Kurasumeeto to totemo naka ga ii desu.', 'Tôi chơi rất thân thiết với bạn cùng lớp.', 'N3', 'Người đứng ở giữa kết nối', 'Người hòa giải đứng giữa giữ gìn tình bạn keo sơn.', '👫', v_ch8_id, 9, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('君', 'クン', 'きみ', 'kimi', 'QUÂN', 'Bạn, em, quân vương', 7, '尹 -> 口', '君の 意見を 聞かせてください。', 'Kimi no iken o kikasete kudasai.', 'Hãy cho mình nghe ý kiến của cậu nhé.', 'N3', 'Bậc quân vương truyền lệnh', 'Người cầm quyền mở miệng truyền lệnh xưng hô thân mật.', '🤴', v_ch8_id, 10, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('彼', 'ヒ', 'かれ, かの', 'kare', 'BỈ', 'Anh ấy, bạn trai', 8, '彳 -> 皮', '彼は ギターが とても 上手です。', 'Kare wa gitaa ga totemo jouzu desu.', 'Anh ấy chơi đàn guitar cực kỳ cừ khôi.', 'N3', 'Bước chân người bên kia', 'Bước chân người ấy bên kia đường.', '👦', v_ch8_id, 11, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('他', 'タ', 'ほか', 'hoka', 'THA', 'Người khác, nơi khác', 5, '亻 -> 也', '他人の 意見も しっかり 聞きましょう。', 'Tanin no iken mo shikkari kikimashou.', 'Hãy lắng nghe cả ý kiến của những người khác nữa.', 'N3', 'Người khác bên cạnh', 'Người khác biệt bên cạnh cùng chung sống.', '👥', v_ch8_id, 12, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('初', 'ショ', 'はじ・め, はつ', 'hatsu', 'SƠ', 'Ban đầu, lần đầu tiên', 7, '衤 -> 刀', '初めて 日本へ 旅行に 行きました。', 'Hajimete Nihon e ryokou ni ikimashita.', 'Lần đầu tiên tôi đi du lịch sang Nhật Bản.', 'N3', 'Cắt nhát kéo đầu tiên', 'Dùng dao cắt nhát vải đầu tiên để may áo.', '🌱', v_ch8_id, 13, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('再', 'サイ, サ', 'ふたた・び', 'futata', 'TÁI', 'Lần nữa, tái diễn', 6, '一 -> 冉', '来週 また 再会しましょう。', 'Raishuu mata saikaishimashou.', 'Tuần sau tụi mình gặp lại nhau lần nữa nhé.', 'N3', 'Hai lần lặp lại', 'Khung cửa mở ra lần thứ hai tiếp tục đón chào.', '🔁', v_ch8_id, 14, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('久', 'キュウ', 'ひさ・しい', 'hisa', 'CỬU', 'Lâu dài, vĩnh cửu', 3, '𠂊 -> 乂', '久しぶりに 故郷へ 帰りました。', 'Hisashiburi ni furusato e kaerimashita.', 'Lâu lắm rồi tôi mới trở về thăm quê hương.', 'N3', 'Người chống gậy lâu năm', 'Dáng người bước đi chậm rãi qua năm tháng dài lâu.', '⏳', v_ch8_id, 15, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('達', 'タツ', 'たち', 'tachi', 'ĐẠT', 'Đạt tới, các bạn (số nhiều)', 12, '土 -> 羊 -> 辶', '友達と いっしょに 宿題を します。', 'Tomodachi to issho ni shukudai o shimasu.', 'Làm bài tập cùng với nhóm bạn.', 'N3', 'Đưa đàn cừu đạt tới đích', 'Dẫn đàn cừu tiến bước đạt tới đồng cỏ xanh tốt.', '🎯', v_ch8_id, 16, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('個', 'コ', '', 'ko', 'CÁ', 'Cá nhân, quả (đơn vị đếm)', 10, '亻 -> 固', '個人の プライバシーを 尊重します。', 'Kojin no puraibashii o sonchoushimasu.', 'Tôn trọng quyền riêng tư của mỗi cá nhân.', 'N3', 'Người kiên định riêng rẽ', 'Mỗi con người là một cá thể độc lập vững chãi.', '👤', v_ch8_id, 17, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('性', 'セイ, ショウ', '', 'sei', 'TÍNH', 'Tính cách, giới tính, bản tính', 8, '忄 -> 生', '彼の 性格は 明るくて 優しいです。', 'Kare no seikaku wa akarukute yasashii desu.', 'Tính cách của anh ấy rất vui vẻ và ấm áp.', 'N3', 'Bản tính sinh ra từ tim', 'Bản tính tự nhiên sinh ra từ sâu thẳm tâm hồn.', '🧬', v_ch8_id, 18, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('各', 'カク', 'おのおの', 'kaku', 'CÁC', 'Mỗi, các, từng', 6, '夂 -> 口', '各自 じぶんの 席に 着いてください。', 'Kakuji jibun no seki ni tsuite kudasai.', 'Mỗi người xin hãy ngồi vào đúng vị trí của mình.', 'N3', 'Mỗi bước chân cất tiếng', 'Mỗi người bước chân đến và phát biểu ý kiến riêng.', '🪑', v_ch8_id, 19, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('格', 'カク', '', 'kaku', 'CÁCH', 'Tư cách, phẩm cách, quy cách', 10, '木 -> 各', '努力して 日本語能力試験に 合格しました。', 'Doryoku shite nihongonouryokushiken ni goukakushimashita.', 'Nỗ lực hết mình và tôi đã thi đỗ kỳ thi JLPT.', 'N3', 'Khung gỗ chuẩn mực', 'Khung gỗ chuẩn quy cách đo đạc tư cách con người.', '🎖️', v_ch8_id, 20, '/assets/kanji/n3/illustrations/chap8_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('単', 'タン', '', 'tan', 'ĐƠN', 'Đơn giản, đơn độc', 9, '丷 -> 𠮤 -> 十', 'この 問題は とても 単純です。', 'Kono mondai wa totemo tanjun desu.', 'Bài toán này cực kỳ đơn giản.', 'N3', 'Chiếc ná săn đơn lẻ', 'Chiếc ná săn bắn chim đơn giản thời cổ.', '1️⃣', v_ch9_id, 1, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('複', 'フク', '', 'fuku', 'PHỨC', 'Phức tạp, lặp lại', 14, '衤 -> 𡰪', '仕組みが 複雑で よく わかりません。', 'Shikumi ga fukuzatsu de yoku wakarimasen.', 'Cơ chế hoạt động phức tạp quá tôi chưa hiểu rõ.', 'N3', 'Nhiều lớp áo xếp chồng', 'Chiếc áo kép may nhiều lớp vải phức tạp đan xen.', '🧩', v_ch9_id, 2, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('全', 'ゼン', 'まった・く, すべ・て', 'zen', 'TOÀN', 'Toàn bộ, hoàn toàn', 6, '入 -> 王', '全員 そろったら 出発しましょう。', 'Zen-in sorottara shuppatsushimashou.', 'Khi tất cả mọi người có mặt đông đủ thì xuất phát nhé.', 'N3', 'Vua che chở toàn dân', 'Mái che bao bọc viên ngọc vua bảo toàn vẹn toàn.', '🌐', v_ch9_id, 3, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('以', 'イ', '', 'i', 'DĨ', 'Lấy làm mốc, trở lên/trở xuống', 5, '人 -> 丶', '二十歳以上の 人が お酒を 飲めます。', 'Hataji ijou no hito ga osake o nomemasu.', 'Người từ 20 tuổi trở lên mới được uống rượu bia.', 'N3', 'Lấy người làm mốc', 'Dùng công cụ cày cấy lấy làm mốc quy chuẩn so sánh.', '📏', v_ch9_id, 4, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('未', 'ミ', 'いま・だ, ひつじ', 'mi', 'VỊ', 'Chưa đến, chưa hoàn thành', 5, '一 -> 木', '十八歳未満は 入場できません。', 'Juuhassai miman wa nyuujou dekimasen.', 'Người dưới 18 tuổi chưa được phép vào cửa.', 'N3', 'Cây chưa vươn tán', 'Cành cây non trên đỉnh còn ngắn chưa trưởng thành.', '⏳', v_ch9_id, 5, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('満', 'マン', 'み・ちる, み・たす', 'man', 'MÃN', 'Thỏa mãn, tràn đầy, đủ', 12, '氵 -> 艹 -> 两', 'コップに 水を 満たします。', 'Koppu ni mizu o mitashimasu.', 'Rót nước đầy tràn chiếc cốc.', 'N3', 'Nước đầy hai hũ', 'Dòng nước dâng lên làm đầy tràn trề hai chiếc vò.', '🈵', v_ch9_id, 6, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('無', 'ム, ブ', 'な・い', 'na', 'VÔ', 'Không có, vô lý', 12, '𠂉 -> 一 -> 林 -> 灬', 'そんな 無理な ことは できません。', 'Sonna muri na koto wa dekimasen.', 'Việc vô lý quá sức đó tôi không thể làm được.', 'N3', 'Cánh rừng bị thiêu rụi thành không', 'Ngọn lửa lớn thiêu rụi cả khu rừng biến thành hư vô.', '🚫', v_ch9_id, 7, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('非', 'ヒ', '', 'hi', 'PHI', 'Phi lý, sai trái, phủ định', 8, '非', '非常口の 場所を かくにんします。', 'Hijouguchi no basho o kakuninshimasu.', 'Xác nhận kiểm tra vị trí cửa thoát hiểm.', 'N3', 'Hai hàng cánh quay lưng', 'Hai dãy cánh chim quay lưng chống đối nhau tạo sự bất đồng sai trái.', '❌', v_ch9_id, 8, '/assets/kanji/n3/illustrations/chap9_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('幼', 'ヨウ', 'おさな・い', 'osana', 'ẤU', 'Thơ ấu, non nớt', 5, '幺 -> 力', '幼い ころの 記憶が よみがえります。', 'Osanai koro no kioku ga yomigaerimasu.', 'Những ký ức tuổi thơ ấu lại ùa về.', 'N3', 'Sợi tơ non yếu sức', 'Sợi tơ mảnh dẻ nhỏ bé sức lực còn non nớt.', '👶', v_ch10_id, 1, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('児', 'ジ, ニ', 'こ', 'ji', 'NHI', 'Trẻ em, con nít, hài nhi', 7, '旧 -> 儿', '小児科で 子どもの 診察を してもらいます。', 'Shounika de kodomo no shinsatsu o shitemoraimasu.', 'Đưa bé đi khám ở khoa nhi.', 'N3', 'Đứa trẻ đội nón tập đi', 'Đứa trẻ con chập chững những bước đi đầu đời.', '🧒', v_ch10_id, 2, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('童', 'ドウ', 'わらべ', 'dou', 'ĐỒNG', 'Nhi đồng, trẻ nhỏ', 12, '立 -> 里', '子どもの ころ 童話を たくさん 読みました。', 'Kodomo no koro douwa o takusan yomimashita.', 'Hồi nhỏ tôi đọc rất nhiều truyện cổ tích thiếu nhi.', 'N3', 'Đứa trẻ đứng giữa làng', 'Đứa trẻ đứng ngây thơ giữa cánh đồng làng quê.', '👦', v_ch10_id, 3, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('徒', 'ト', '', 'to', 'ĐỒ', 'Học trò, môn đồ, đi bộ', 10, '彳 -> 走', '生徒たちが 元気に 校庭を 走っています。', 'Seitotachi ga genki ni koutei o hashitteimasu.', 'Các em học sinh đang khỏe khoắn chạy nhảy trên sân trường.', 'N3', 'Học trò chạy bộ đến lớp', 'Bước chân chạy bộ đến trường của những cô cậu học trò.', '🎒', v_ch10_id, 4, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('担', 'タン', 'にな・う, かつ・ぐ', 'nina', 'ĐẢM', 'Đảm đương, gánh vác', 8, '扌 -> 旦', '新しい プロジェクトを 担当します。', 'Atarashii purojekuto o tantoushimasu.', 'Tôi đảm đương phụ trách dự án mới.', 'N3', 'Tay gánh vác buổi sớm', 'Bàn tay gánh vác trách nhiệm từ lúc bình minh sáng sớm.', '💼', v_ch10_id, 5, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('任', 'ニン', 'まか・せる, まか・す', 'maka', 'NHIỆM', 'Nhiệm vụ, giao phó', 6, '亻 -> 壬', 'この 仕事は あなたに お任せします。', 'Kono shigoto wa anata ni omakaseshimasu.', 'Công việc này tôi xin giao phó lại cho bạn nhé.', 'N3', 'Người gánh vác trọng trách', 'Người gánh vác trọng trách hoàn thành xuất sắc nhiệm vụ.', '📋', v_ch10_id, 6, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('師', 'シ', '', 'shi', 'SƯ', 'Thầy giáo, chuyên gia', 10, '𠂤 -> 帀', '恩師に 感謝の 手紙を 書きました。', 'Onshi ni kansha no tegami o kakimashita.', 'Tôi viết thư bày tỏ lòng biết ơn gửi người thầy kính yêu.', 'N3', 'Người thầy dẫn dắt đoàn quân', 'Bậc thầy dẫn dắt đội ngũ truyền trao kiến thức.', '👨‍🏫', v_ch10_id, 7, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('組', 'ソ', 'く・む, くみ', 'kumi', 'TỔ', 'Tổ chức, lớp, lắp ghép', 11, '糸 -> 且', '四人一組で グループワークを します。', 'Yonin hitokumi de guruupuwaaku o shimasu.', 'Hoạt động nhóm 4 bạn một tổ.', 'N3', 'Dệt sợi thành tổ', 'Từng sợi chỉ đan kết nhau thành một tổ chức đoàn kết.', '👥', v_ch10_id, 8, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('机', 'キ', 'つくえ', 'tsukue', 'KỶ', 'Bàn học, cái bàn', 6, '木 -> 几', '机の 上を きれいに かたづけます。', 'Tsukue no ue o kirei ni katazukemasu.', 'Dọn dẹp mặt bàn học thật ngăn nắp sạch sẽ.', 'N3', 'Cái bàn bằng gỗ', 'Chiếc bàn học vững chãi đóng từ gỗ cây.', '🪵', v_ch10_id, 9, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('座', 'ザ', 'すわ・る', 'suwa', 'TỌA', 'Chỗ ngồi, ngồi xuống', 10, '广 -> 坐', '席に 座って 先生の 話を 聞きます。', 'Seki ni suwatte sensei no hanashi o kikimasu.', 'Ngồi vào ghế lắng nghe thầy cô giảng bài.', 'N3', 'Hai người ngồi trong nhà', 'Dưới mái nhà hai người ngồi đàm đạo trên nền đất.', '🪑', v_ch10_id, 10, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('板', 'ハン, バン', 'いた', 'ita', 'BẢN', 'Tấm ván, bảng gỗ', 8, '木 -> 反', '先生が 黒板に 漢字を 書きます。', 'Sensei ga kokuban ni kanji o kakimasu.', 'Thầy giáo viết chữ Kanji lên bảng đen.', 'N3', 'Tấm gỗ xẻ phẳng', 'Thanh gỗ được xẻ lọng thành tấm ván bảng phẳng phiu.', '📋', v_ch10_id, 11, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('筆', 'ヒツ', 'ふで', 'fude', 'BÚT', 'Bút lông, viết lách', 12, '竹 -> 聿', '筆ペンで 年賀状を 書きました。', 'Fudepen de nengajou o kakimashita.', 'Tôi dùng bút lông viết thiệp chúc mừng năm mới.', 'N3', 'Cây tre gắn ngòi viết', 'Bàn tay cầm ống tre gắn ngòi cọ nắn nót viết từng nét chữ.', '🖌️', v_ch10_id, 12, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貸', 'タイ', 'か・す', 'ka', 'THẢI', 'Cho vay, cho mượn', 12, '代 -> 貝', '友人に ノートを 貸してあげました。', 'Yuujin ni nooto o kashite agemashita.', 'Tôi cho bạn mượn cuốn vở ghi bài.', 'N3', 'Đưa tiền cho mượn', 'Giao tiền vỏ sò cho người khác mượn tạm thời.', '🤲', v_ch10_id, 13, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('借', 'シャク', 'か・りる', 'kari', 'TÁ', 'Vay mượn', 10, '亻 -> 昔', '図書館から 本を 三冊 借りました。', 'Toshokan kara hon o sansatsu karimashita.', 'Tôi mượn 3 cuốn sách ở thư viện.', 'N3', 'Người mượn từ ngày xưa', 'Người tìm đến mượn những giá trị xưa cũ.', '📖', v_ch10_id, 14, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('返', 'ヘン', 'かえ・す, かえ・る', 'kae', 'PHẢN', 'Trả lại, quay về', 7, '反 -> 辶', '借りた 本を 期日までに 返します。', 'Karita hon o kijitsu made ni kaeshimasu.', 'Trả lại sách đã mượn trước ngày kỳ hạn.', 'N3', 'Bước đi trả lại', 'Bước chân quay trở lại mang đồ vật hoàn trả cho chủ.', '↩️', v_ch10_id, 15, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('冊', 'サツ', '', 'satsu', 'SÁCH', 'Cuốn sách (đơn vị đếm)', 5, '冊', '今月は 本を 五冊 読みました。', 'Kongetsu wa hon o gosatsu yomimashita.', 'Tháng này tôi đã đọc xong 5 cuốn sách.', 'N3', 'Các thẻ tre buộc lại thành sách', 'Các thanh thẻ tre buộc kết nối thành từng tập sách cổ.', '📚', v_ch10_id, 16, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('具', 'グ', 'そな・える', 'gu', 'CỤ', 'Dụng cụ, công cụ', 8, '目 -> 一 -> 八', '筆箱に 筆記用具を 入れます。', 'Fudebako ni hikkiyougu o iremasu.', 'Bỏ dụng cụ học tập bút thước vào hộp bút.', 'N3', 'Đôi mắt quan sát dụng cụ', 'Mở mắt kiểm tra đầy đủ các món đồ dùng trang thiết bị.', '🧰', v_ch10_id, 17, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('箱', 'ソウ', 'はこ', 'hako', 'TƯƠNG', 'Cái hộp, chiếc rương', 15, '竹 -> 相', 'プレゼントを きれいな 箱に 入れます。', 'Purezento o kirei na hako ni iremasu.', 'Bỏ món quà vào một chiếc hộp tuyệt đẹp.', 'N3', 'Chiếc hộp đan bằng tre', 'Ống tre đan lát thành chiếc hộp đựng đồ xinh xắn.', '📦', v_ch10_id, 18, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('棒', 'ボウ', '', 'bou', 'BỔNG', 'Cây gậy, que gậy', 12, '木 -> 奉', '棒グラフを 見て データを 分析します。', 'Bougurafu o mite deeta o bunsekishimasu.', 'Quan sát biểu đồ cột để phân tích dữ liệu.', 'N3', 'Cây gậy dâng kính', 'Thanh gỗ thẳng đứng dùng làm gậy chỉ dẫn.', '🥢', v_ch10_id, 19, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('伸', 'シン', 'の・びる, の・ばす', 'no', 'THÂN', 'Vươn dài, kéo dài, phát triển', 7, '亻 -> 申', '背筋を ぐっと 伸ばして リフレッシュします。', 'Sebone o gutto nobashite rifuresshushimasu.', 'Vươn thẳng lưng để thư giãn sảng khoái.', 'N3', 'Người vươn dài thân mình', 'Con người giang tay vươn dài kéo giãn cơ thể.', '🧘', v_ch10_id, 20, '/assets/kanji/n3/illustrations/chap10_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('希', 'キ', '', 'ki', 'HY', 'Hy vọng, hiếm có', 7, '爻 -> 巾', '第一志望の 大学に 合格したいです。', 'Daiichi shibou no daigaku ni goukakushitai desu.', 'Tôi muốn thi đỗ vào trường đại học nguyện vọng 1.', 'N3', 'Hy vọng vào tấm vải hiếm', 'Tấm vải dệt hoa văn tinh xảo chứa đựng bao niềm hy vọng.', '🌟', v_ch11_id, 1, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('望', 'ボウ, モウ', 'のぞ・む', 'nozo', 'VỌNG', 'Nguyện vọng, trông xa', 11, '亡 -> 月 -> 王', '明るい 未来を 望んでいます。', 'Akarui mirai o nozondeimasu.', 'Tôi mong đợi một tương lai tươi sáng.', 'N3', 'Vua đứng ngắm trăng trông xa', 'Vị vua đứng nhìn vầng trăng trông ngóng hy vọng muôn phương.', '🔭', v_ch11_id, 2, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('夢', 'ム', 'ゆめ', 'yume', 'MỘNG', 'Giấc mơ, ước mơ', 13, '艹 -> 罒 -> 冖 -> 夕', '幼い ころからの 夢を かなえます。', 'Osanai koro kara no yume o kanaemasu.', 'Tôi biến ước mơ từ thuở nhỏ thành hiện thực.', 'N3', 'Giấc mộng đêm trăng', 'Nằm mơ thấy cảnh sắc thần tiên dưới ánh trăng mờ ảo.', '💭', v_ch11_id, 3, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('的', 'テキ', 'まと', 'mato', 'ĐÍCH', 'Mục đích, đích đến, mang tính', 8, '白 -> 勺', '具体的な 計画を たてましょう。', 'Gutaiteki na keikaku o tatemashou.', 'Hãy lập ra kế hoạch cụ thể rõ ràng nhé.', 'N3', 'Bia ngắm màu trắng', 'Tâm bia bắn cung màu trắng làm đích nhắm đến.', '🎯', v_ch11_id, 4, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('可', 'カ', '', 'ka', 'KHẢ', 'Có thể, chấp thuận', 5, '一 -> 口 -> 亅', '何事も あきらめなければ 可能です。', 'Nanigoto mo akiramenakereba kanou desu.', 'Mọi việc nếu không bỏ cuộc đều có thể làm được.', 'N3', 'Cất tiếng hát chấp thuận', 'Mở miệng đồng ý cho phép điều có thể thực hiện.', '✅', v_ch11_id, 5, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('能', 'ノウ', '', 'nou', 'NĂNG', 'Khả năng, năng lực, tài nghệ', 10, '厶 -> 月 -> 匕 -> 匕', '自分の 可能性を 信じて がんばります。', 'Jibun no kanousei o shinjite ganbarimasu.', 'Tin tưởng vào tiềm năng của bản thân mà cố gắng.', 'N3', 'Gấu khoe năng lực', 'Chú gấu mạnh mẽ phô diễn sức mạnh năng lực của mình.', '⚡', v_ch11_id, 6, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('調', 'チョウ', 'しら・べる, ととの・う', 'shira', 'ĐIỀU', 'Điều tra, điều hòa, giai điệu', 15, '言 -> 周', 'インターネットで 情報を 調べます。', 'Intaanetto de jouhou o shirabemasu.', 'Tìm kiếm tra cứu thông tin trên Internet.', 'N3', 'Lời nói điều chỉnh', 'Dùng lời lẽ chu toàn để điều chỉnh kiểm tra thông tin.', '🔍', v_ch11_id, 7, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('選', 'セン', 'えら・ぶ', 'era', 'TUYỂN', 'Lựa chọn, tuyển chọn', 15, '己 -> 己 -> 廾 -> 辶', 'たくさんの 中から 好きな ものを 選びます。', 'Takusan no naka kara suki na mono o erabimasu.', 'Chọn món đồ mình thích trong số rất nhiều lựa chọn.', 'N3', 'Bước đi tuyển chọn', 'Hai người cùng bước đi tuyển lựa kỹ càng người tài.', '🗳️', v_ch11_id, 8, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('面', 'メン', 'おもて, つら', 'men', 'DIỆN', 'Mặt, bề mặt, diện mạo', 9, '一 -> 自 -> 囗', '明日 アルバイトの 面接が あります。', 'Ashita arubaito no mensetsu ga arimasu.', 'Ngày mai tôi có buổi phỏng vấn xin việc làm thêm.', 'N3', 'Khuôn mặt trong khung', 'Khuôn mặt rạng ngời diện kiến người đối diện.', '👤', v_ch11_id, 9, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('接', 'セツ', 'つ・ぐ', 'setsu', 'TIẾP', 'Tiếp xúc, phỏng vấn, gắn kết', 11, '女 -> 妾', '面接官に はきはきと 答えました。', 'Mensetsukan ni hakihaki to kotaemashita.', 'Tôi trả lời người phỏng vấn một cách rành rọt dứt khoát.', 'N3', 'Tay nối tiếp tay', 'Bàn tay nối tiếp gắn kết mối liên hệ thân tình.', '🤝', v_ch11_id, 10, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('受', 'ジュ', 'う・ける, う・かる', 'u', 'THỤ', 'Nhận lấy, dự thi', 8, '爫 -> 冖 -> 又', '大学の 入学試験を 受けます。', 'Daigaku no nyuugakushiken o ukemasu.', 'Tôi tham gia dự thi kỳ thi tuyển sinh đại học.', 'N3', 'Bàn tay nhận đồ', 'Bàn tay trên trao xuống, bàn tay dưới đón nhận đồ vật.', '📥', v_ch11_id, 11, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('落', 'ラク', 'お・ちる, お・とす', 'o', 'LẠC', 'Rơi, rớt, thi trượt', 12, '艹 -> 洛', '試験に 落ちないように 勉強します。', 'Shiken ni ochinai you ni benkyoushimasu.', 'Tôi ôn tập chăm chỉ để không bị thi rớt.', 'N3', 'Nước rớt trên cỏ', 'Giọt nước mưa rơi rụng trên bãi cỏ.', '🍂', v_ch11_id, 12, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('倍', 'バイ', '', 'bai', 'BỘI', 'Gấp bội, nhân đôi', 10, '亻 -> 咅', '今年の 志願者は 去年の 二倍です。', 'Kotoshi no shigansha wa kyonen no nibai desu.', 'Lượng thí sinh nộp đơn năm nay gấp đôi năm ngoái.', 'N3', 'Người tăng gấp bội', 'Người nhổ củ tăng gấp bội sản lượng thu hoạch.', '✖️', v_ch11_id, 13, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('率', 'リツ, ソツ', 'ひき・いる', 'ritsu', 'SUẤT', 'Tỷ lệ, dẫn dắt', 11, '玄 -> 冫 -> 十', '合格率が 高い コースを 選びました。', 'Goukakuritsu ga takai koosu o erabimashita.', 'Tôi chọn khóa học có tỷ lệ đỗ cao.', 'N3', 'Dẫn dắt đo lường', 'Dây cung đo lường tỷ lệ chuẩn xác.', '📈', v_ch11_id, 14, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('平', 'ヘイ, ビョウ', 'たい・ら, ひら', 'tai', 'BÌNH', 'Bình đẳng, hòa bình, bằng phẳng', 5, '干 -> 丷', 'テストの 平均点は 75点でした。', 'Tesuto no heikinten wa nanajuugoten deshita.', 'Điểm trung bình của bài thi là 75 điểm.', 'N3', 'Cân bằng phẳng lặng', 'Thước cân bằng phẳng không nghiêng lệch bên nào.', '⚖️', v_ch11_id, 15, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('均', 'キン', '', 'kin', 'QUÂN', 'Đồng đều, quân bình', 7, '土 -> 匀', 'みんなで 均等に 分け合います。', 'Minna de kintou ni wakeaimasu.', 'Mọi người chia đều phần cho nhau thật công bằng.', 'N3', 'San bằng mặt đất', 'San bằng phẳng đất đai tạo sự quân bình đồng đều.', '🟰', v_ch11_id, 16, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('成', 'セイ, ジョウ', 'な・る, な・す', 'na', 'THÀNH', 'Hoàn thành, trở thành', 6, '戈 -> 𠃌', '努力が 実を 結んで 成功しました。', 'Doryoku ga mi o musunde seikoushimashita.', 'Nỗ lực đã đơm hoa kết trái và gặt hái thành công.', 'N3', 'Mũi giáo làm nên đại nghiệp', 'Cầm cây giáo bảo vệ bờ cõi làm nên thành quả rực rỡ.', '🏆', v_ch11_id, 17, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('績', 'セキ', '', 'seki', 'TÍCH', 'Thành tích, dệt sợi', 17, '糸 -> 責', '毎日の 努力が よい 成績に つながります。', 'Mainichi no doryoku ga yoi seiseki ni tsunagarimasu.', 'Nỗ lực mỗi ngày dẫn đến thành tích học tập tốt.', 'N3', 'Dệt nên sợi chỉ công trạng', 'Từng sợi chỉ đan dệt nên tấm thảm thành tích vẻ vang.', '🎖️', v_ch11_id, 18, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('良', 'リョウ', 'よ・い', 'yo', 'LƯƠNG', 'Tốt lành, lương thiện', 7, '丶 -> 艮', '彼の 提案は とても 良いです。', 'Kare no teian wa totemo yoi desu.', 'Đề xuất của anh ấy rất tốt.', 'N3', 'Hạt thóc sạch', 'Cái sàng sàng lọc hạt thóc mẩy tốt lành.', '👍', v_ch11_id, 19, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('悪', 'アク', 'わる・い', 'waru', 'ÁC', 'Xấu xa, ác cảm', 11, '亜 -> 心', '体調が 悪いので 早く 休みます。', 'Taichou ga warui node hayaku yasumimasu.', 'Thể trạng không tốt nên tôi đi nghỉ sớm.', 'N3', 'Trái tim thứ cấp tồi tệ', 'Trái tim lệch chuẩn gây ra điều tồi tệ xấu xa.', '👎', v_ch11_id, 20, '/assets/kanji/n3/illustrations/chap11_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('授', 'ジュ', 'さず・ける', 'sazu', 'THỤ', 'Trao cho, truyền thụ', 11, '扌 -> 受', '教授から 直接 授業を 受けます。', 'Kyouju kara chokusetsu jugyou o ukemasu.', 'Nhận bài giảng trực tiếp từ giáo sư.', 'N3', 'Tay trao truyền kiến thức', 'Bàn tay truyền thụ tinh hoa kiến thức cho học trò.', '🎓', v_ch12_id, 1, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('業', 'ギョウ, ゴウ', 'わざ', 'gyou', 'NGHIỆP', 'Nghề nghiệp, công việc', 13, '业 -> 𦍌', '宿題を ぜんぶ 終わらせました。', 'Shukudai o zenbu owarasemashita.', 'Tôi đã hoàn thành toàn bộ bài tập về nhà.', 'N3', 'Khung giá treo chuông lớn', 'Khung giá treo chuông đồng biểu trưng cho sự nghiệp lớn.', '💼', v_ch12_id, 2, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('級', 'キュウ', '', 'kyuu', 'CẤP', 'Cấp bậc, lớp học', 9, '糸 -> 及', '日本語能力試験 N3級を 目指します。', 'Nihongonouryokushiken En-sankyuu o mezashimasu.', 'Tôi hướng tới đỗ cấp độ N3 kỳ thi JLPT.', 'N3', 'Nối sợi tơ theo cấp bậc', 'Sợi tơ lần lượt đạt tới từng nấc cấp bậc cao hơn.', '🥉', v_ch12_id, 3, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('卒', 'ソツ', '', 'sotsu', 'TỐT', 'Tốt nghiệp, đột ngột', 8, '亠 -> 𠈌 -> 十', '来年の 三月に 大学を 卒業します。', 'Rainen no sangatsu ni daigaku o sotsugyoushimasu.', 'Tháng 3 năm sau tôi sẽ tốt nghiệp đại học.', 'N3', 'Áo lính tốt nghiệp', 'Người lính hoàn thành nhiệm vụ được trao áo tốt nghiệp.', '🎓', v_ch12_id, 4, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('欠', 'ケツ', 'か・ける', 'ka', 'KHIẾM', 'Khiếm khuyết, vắng mặt', 4, '欠', '風邪で 授業を 欠席しました。', 'Kaze de jugyou o kessekishimashita.', 'Bị cảm nên tôi đã nghỉ vắng buổi học.', 'N3', 'Người há miệng ngáp thiếu dưỡng khí', 'Hình ảnh người há miệng thiếu thốn hụt hơi.', '❌', v_ch12_id, 5, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('席', 'セキ', '', 'seki', 'TỊCH', 'Chỗ ngồi, ghế ngồi', 10, '广 -> 廿 -> 巾', '指定席の チケットを 買いました。', 'Shiteiseki no chiketto o kaimashita.', 'Tôi mua vé ghế ngồi chỉ định trên tàu.', 'N3', 'Tấm chiếu trải dưới mái nhà', 'Dưới mái hiên trải tấm chiếu vải làm chỗ ngồi trang trọng.', '🪑', v_ch12_id, 6, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('由', 'ユ, ユウ', 'よし', 'yuu', 'DO', 'Nguyên do, tự do', 5, '由', '自由な 時間に 読書を 楽しみます。', 'Jiyuu na jikan ni dokusho o tanoshimimasu.', 'Tận hưởng việc đọc sách trong thời gian tự do.', 'N3', 'Hạt nảy mầm vươn lên', 'Mầm cây từ hạt nảy nở tự do vươn ra khỏi vỏ bọc.', '🗽', v_ch12_id, 7, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('訳', 'ヤク', 'わけ', 'wake', 'DỊCH', 'Dịch thuật, lý do giải thích', 11, '言 -> 尺', '遅刻した 訳を 先生に 説明しました。', 'Chikokushita wake o sensei ni setsumeishimashita.', 'Tôi đã giải thích lý do đi muộn cho thầy giáo.', 'N3', 'Dùng thước đo lời nói', 'Dùng chuẩn mực đo lường diễn giải lời nói dịch thuật.', '🗣️', v_ch12_id, 8, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('例', 'レイ', 'たと・える', 'tato', 'LỆ', 'Ví dụ, tiền lệ', 8, '亻 -> 列', 'わかりやすい 例を あげて 説明します。', 'Wakariyasui rei o agete setsumeishimasu.', 'Nêu ví dụ dễ hiểu để giải thích rõ ràng.', 'N3', 'Người xếp hàng làm mẫu', 'Người đứng trong hàng mẫu làm khuôn lệ cho mọi người.', '📌', v_ch12_id, 9, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('易', 'エキ, イ', 'やさ・しい', 'yasa', 'DỊ', 'Dễ dàng, biến dịch', 8, '日 -> 勿', '基礎から 易しく 教え直します。', 'Kiso kara yasashiku oshienaoshimasu.', 'Dạy lại dễ hiểu từ phần kiến thức nền tảng.', 'N3', 'Thằn lằn đổi màu dễ dàng', 'Con thằn lằn biến đổi màu sắc dưới nắng thật dễ dàng.', '👌', v_ch12_id, 10, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('解', 'カイ, ゲ', 'と・く, と・ける', 'to', 'GIẢI', 'Giải thích, tháo mở, hiểu', 13, '角 -> 刀 -> 牛', '難しい 数学の 問題を 解きました。', 'Muzukashii suugaku no mondai o tokimashita.', 'Tôi đã giải được bài toán khó.', 'N3', 'Dùng dao mổ trâu xẻ góc', 'Dùng dao mổ tách rời giải phẫu từng khúc rõ ràng.', '💡', v_ch12_id, 11, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('説', 'セツ', 'と・く', 'toku', 'THUYẾT', 'Thuyết phục, giải thích, tiểu thuyết', 14, '言 -> 兌', '先生が 文法を ていねいに 説明します。', 'Sensei ga bunpou o teinei ni setsumeishimasu.', 'Thầy giáo giải thích ngữ pháp rất ân cần.', 'N3', 'Lời nói giải tỏa lòng người', 'Dùng lời lẽ thuyết phục giải tỏa mọi băn khoăn.', '📖', v_ch12_id, 12, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('覚', 'カク', 'おぼ・える, さ・める', 'oboe', 'GIÁC', 'Ghi nhớ, tỉnh giấc, cảm giác', 12, '𦥯 -> 見', '新しい 漢字を 毎日 五つ 覚えます。', 'Atarashii kanji o mainichi itsutsu oboemasu.', 'Mỗi ngày tôi ghi nhớ 5 chữ Hán mới.', 'N3', 'Mở mắt thấy thấu tỏ', 'Mở mắt học trò nhìn thấu tri thức ghi nhớ sâu sắc.', '🧠', v_ch12_id, 13, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('忘', 'ボウ', 'わす・れる', 'wasu', 'VONG', 'Quên lãng', 7, '亡 -> 心', '傘を 電車に 忘れてきてしまいました。', 'Kasa o densha ni wasuretekiteshimaimashita.', 'Tôi lỡ bỏ quên chiếc ô trên tàu điện.', 'N3', 'Trái tim tiêu tan', 'Trí nhớ trong tim bị mai một trôi vào quên lãng.', '🧹', v_ch12_id, 14, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('努', 'ド', 'つと・める', 'tsuto', 'NỖ', 'Nỗ lực, cố gắng', 7, '奴 -> 力', '合格に 向けて 全力で 努力します。', 'Goukaku ni mukete zenryoku de doryokushimasu.', 'Dốc toàn lực nỗ lực hướng tới việc thi đỗ.', 'N3', 'Ra sức như nô bộc', 'Dồn hết sức lực bền bỉ nỗ lực vượt qua gian truân.', '💪', v_ch12_id, 15, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('続', 'ゾク', 'つづ・く, つづ・ける', 'tsuzu', 'TỤC', 'Tiếp tục, liên tục', 13, '糸 -> 売', '日本語の 勉強を まいにち 続けます。', 'Nihongo no benkyou o mainichi tsuzukemasu.', 'Mỗi ngày tôi đều duy trì tiếp tục học tiếng Nhật.', 'N3', 'Sợi chỉ nối dài', 'Sợi tơ được nối dài liên tục không đứt đoạn.', '🔁', v_ch12_id, 16, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('要', 'ヨウ', 'い・る, かなめ', 'you', 'YẾU', 'Quan trọng, cần thiết, tóm tắt', 9, '覀 -> 女', 'パスポートの コピーが 必要です。', 'Pasupooto no kopii ga hitsuyou desu.', 'Cần thiết phải nộp một bản sao hộ chiếu.', 'N3', 'Vòng eo người phụ nữ', 'Điểm thắt lưng cốt yếu quan trọng trên cơ thể.', '⚠️', v_ch12_id, 17, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('復', 'フク', '', 'fuku', 'PHỤC', 'Phục hồi, ôn tập, quay lại', 12, '彳 -> 复', '習った 文法を 復習します。', 'Naratta bunpou o fukushuushimasu.', 'Ôn tập lại phần ngữ pháp đã học.', 'N3', 'Bước chân quay lại đường xưa', 'Bước từng bước quay trở lại đường cũ phục hồi kiến thức.', '🔄', v_ch12_id, 18, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('補', 'ホ', 'おぎな・う', 'ogina', 'BỔ', 'Bổ sung, phụ thêm', 12, '衤 -> 甫', '足りない ところを 補習で 補います。', 'Tarinai tokoro o hoshuu de oginaimasu.', 'Bổ sung phần kiến thức còn thiếu bằng giờ học phụ đạo.', 'N3', 'Vá thêm miếng áo', 'Dùng vải may chắp thêm chỗ rách bổ trợ cho hoàn thiện.', '➕', v_ch12_id, 19, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('効', 'コウ', 'き・く', 'kou', 'HIỆU', 'Hiệu quả, công hiệu', 8, '交 -> 力', 'この 風邪薬は とても よく 効きます。', 'Kono kazegusuri wa totemo yoku kikimasu.', 'Thuốc cảm này công hiệu rất tốt.', 'N3', 'Giao hòa sức lực sinh hiệu quả', 'Sự phối hợp giao lưu sức lực mang lại kết quả tối ưu.', '✨', v_ch12_id, 20, '/assets/kanji/n3/illustrations/chap12_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('種', 'シュ', 'たね', 'tane', 'CHỦNG', 'Hạt giống, chủng loại', 14, '禾 -> 重', '庭に ひまわりの 種を まきました。', 'Niwa ni himawari no tane o makimashita.', 'Gieo hạt hoa hướng dương trong vườn.', 'N3', 'Hạt lúa nặng trĩu', 'Hạt thóc nặng trĩu hạt giống cho vụ mùa sau.', '🌱', v_ch13_id, 1, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('類', 'ルイ', '', 'rui', 'LOẠI', 'Phân loại, chủng loại', 18, '米 -> 犬 -> 頁', 'ゴミを 種類ごとに 分別します。', 'Gomi o shuruigoto ni bunbetsushimasu.', 'Phân loại rác theo từng chủng loại.', 'N3', 'Các loại hạt nuôi vật', 'Nhiều chủng loại ngũ cốc nuôi sống muôn loài.', '🏷️', v_ch13_id, 2, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('存', 'ソン, ゾン', '', 'son', 'TỒN', 'Tồn tại, bảo tồn, biết ơn', 6, '子 -> 𠂇', '恐竜は 昔 地球上に 存在していました。', 'Kyouryuu wa mukashi chikyuujou ni sonzaishiteimashita.', 'Khủng long thời xưa từng tồn tại trên Trái Đất.', 'N3', 'Bảo bọc đứa con', 'Bàn tay chở che bảo tồn sinh mệnh đứa con thơ.', '🦕', v_ch13_id, 3, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('在', 'ザイ', 'あ・る', 'zai', 'TẠI', 'Tồn tại, ở tại, hiện diện', 6, '土 -> 𠂇', '社長は ただいま 会議室に 在室中です。', 'Shachou wa tadaima kaigishitsu ni zaishitsuchuu desu.', 'Giám đốc hiện đang có mặt trong phòng họp.', 'N3', 'Cây đứng trên mặt đất', 'Mầm cây vững vàng hiện diện trên mảnh đất thân quen.', '📍', v_ch13_id, 4, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('陽', 'ヨウ', '', 'you', 'DƯƠNG', 'Mặt trời, ánh sáng mặt trời', 12, '阝 -> 昜', '太陽の 光を あびて 植物が 育ちます。', 'Taiyou no hikari o abite shokubutsu ga sodachimasu.', 'Cây cỏ lớn lên nhờ hấp thụ ánh nắng mặt trời.', 'N3', 'Mặt trời chiếu trên đồi', 'Vầng thái dương tỏa ngập tràn ánh sáng rực rỡ sườn đồi.', '☀️', v_ch13_id, 5, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('巨', 'キョ', '', 'kyo', 'CỰ', 'Khổng lồ, to lớn', 5, '匚 -> 𠀁', '海に 巨大な クジラが あらわれました。', 'Umi ni kyodai na kujira ga arawaremashita.', 'Chú cá voi khổng lồ xuất hiện trên đại dương.', 'N3', 'Thước đo của người khổng lồ', 'Cây thước đo to lớn của người khổng lồ.', '🐋', v_ch13_id, 6, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('氷', 'ヒョウ', 'こおり, ひ', 'koori', 'BĂNG', 'Băng đá, nước đá', 5, '水 -> 丶', 'ジュースに 氷を 入れて 冷やします。', 'Juusu ni koori o irete hiyashimasu.', 'Thả đá lạnh vào nước trái cây.', 'N3', 'Giọt nước đông đá', 'Giọt nước gặp giá rét đông cứng lại thành băng.', '🧊', v_ch13_id, 7, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('河', 'カ', 'かわ', 'kawa', 'HÀ', 'Dòng sông, sông lớn', 8, '氵 -> 可', '北極の 氷河が ゆっくり ながれます。', 'Hokkyoku no hyouga ga yukkuri nagaremasu.', 'Dòng sông băng Bắc Cực chậm rãi trôi.', 'N3', 'Dòng nước rộng lớn', 'Dòng sông lớn uốn khúc chở nặng phù sa.', '🌊', v_ch13_id, 8, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('季', 'キ', '', 'ki', 'QUÝ', 'Mùa, thời vụ', 8, '禾 -> 子', '日本には 四つの 季節が あります。', 'Nihon ni wa yottsu no kisetsu ga arimasu.', 'Nhật Bản có bốn mùa rõ rệt.', 'N3', 'Lúa đơm bông theo mùa', 'Cây lúa sinh sôi con cháu đơm hạt theo mùa.', '🌸', v_ch13_id, 9, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('候', 'コウ', '', 'kou', 'HẬU', 'Khí hậu, mùa tiết', 10, '亻 -> 丨 -> 矢', 'この 地域は 一年中 おだやかな 気候です。', 'Kono chiiki wa ichinenjuu odayaka na kikou desu.', 'Khu vực này quanh năm khí hậu ôn hòa êm ả.', 'N3', 'Người ngắm hướng gió', 'Người canh gác ngắm mũi tên định hướng thời tiết khí hậu.', '🌤️', v_ch13_id, 10, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('暖', 'ダン', 'あたた・かい, あたた・まる', 'atata', 'NOÃN', 'Ấm áp, ấm no', 13, '日 -> 爰', '春に なって 暖かく なってきました。', 'Haru ni natte atatakaku nattekimashita.', 'Mùa xuân về tiết trời dần trở nên ấm áp.', 'N3', 'Ánh nắng ấm áp', 'Ánh mặt trời chan hòa sưởi ấm vạn vật.', '♨️', v_ch13_id, 11, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('流', 'リュウ', 'なが・れる, なが・す', 'naga', 'LƯU', 'Chảy, dòng chảy, trôi dạt', 10, '氵 -> 𠫓 -> 川', '川の 水が さわやかに 流れています。', 'Kawa no mizu ga sawayaka ni nagareteimasu.', 'Nước sông êm đềm trong lành chảy xuôi dòng.', 'N3', 'Dòng sông trôi xuôi', 'Dòng nước uốn lượn mang đứa trẻ trôi xuôi theo sóng biển.', '🌊', v_ch13_id, 12, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('形', 'ケイ, ギョウ', 'かたち, かた', 'katachi', 'HÌNH', 'Hình dạng, hình thức', 7, '开 -> 彡', '星の 形を した クッキーを 焼きました。', 'Hoshi no katachi o shita kukkii o yakimashita.', 'Tôi nướng mẻ bánh quy hình ngôi sao.', 'N3', 'Hoa văn tạo hình', 'Khung đan cài thêm những nét vẽ hoa văn tạo hình.', '⭐', v_ch13_id, 13, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('底', 'テイ', 'そこ', 'soko', 'ĐỂ', 'Đáy, đáy biển, tận cùng', 8, '广 -> 氐', '海の 底には ふしぎな 生物が います。', 'Umi no soko ni wa fushigi na seibutsu ga imasu.', 'Dưới đáy biển sâu có rất nhiều sinh vật kỳ thú.', 'N3', 'Chạm đáy dưới mái nhà', 'Chạm tới tận cùng đáy sâu góc nhà.', '⚓', v_ch13_id, 14, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('深', 'シン', 'ふか・い, ふか・まる', 'fuka', 'THÂM', 'Sâu thẳm, sâu sắc', 11, '氵 -> 𥥎', 'この プールは 水深が 二メートル あります。', 'Kono puuru wa suishin ga nimeetoru arimasu.', 'Hồ bơi này có độ sâu 2 mét.', 'N3', 'Dò nước hang sâu', 'Thả tay cầm đuốc xuống hang nước sâu thẳm.', '🕳️', v_ch13_id, 15, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('浅', 'セン', 'あさ・い', 'asa', 'THIỂN', 'Nông cạn, cạn ráo', 9, '氵 -> 戋', '川の 浅い ところで 水遊びを します。', 'Kawa no asai tokoro de mizuasobi o shimasu.', 'Nghịch nước ở chỗ khúc sông cạn.', 'N3', 'Nước cạn chạm giáo', 'Mực nước nông cạn đến mức chạm ngọn giáo giáo đâm.', '🏖️', v_ch13_id, 16, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('島', 'トウ', 'しま', 'shima', 'ĐẢO', 'Hòn đảo', 10, '鳥 -> 山', '船で 小さな 島へ 渡りました。', 'Fune de chiisana shima e watarimashita.', 'Đi thuyền qua thăm hòn đảo nhỏ.', 'N3', 'Chim đậu trên núi giữa biển', 'Cánh chim hải âu nghỉ chân trên ngọn núi giữa biển khơi.', '🏝️', v_ch13_id, 17, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('陸', 'リク', '', 'riku', 'LỤC', 'Lục địa, đất liền', 11, '阝 -> 坴', '飛行機が 無事に 着陸しました。', 'Hikouki ga buji ni chakurikushimashita.', 'Máy bay đã hạ cánh an toàn xuống đất liền.', 'N3', 'Vùng đất đồi nhô lên', 'Mảnh đất cao ráo vững chắc nhô lên khỏi mặt nước.', '🌍', v_ch13_id, 18, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('岸', 'ガン', 'きし', 'kishi', 'NGẠN', 'Bờ sông, bờ biển', 8, '山 -> 厂 -> 干', '向こう岸まで ボートで こぎます。', 'Mukougishi made booto de kogimasu.', 'Chèo thuyền sang tận bờ bên kia.', 'N3', 'Vách núi bên bờ sông', 'Vách núi sừng sững che chở bên bờ sông nước.', '🏖️', v_ch13_id, 19, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('坂', 'ハン', 'さか', 'saka', 'PHẢN', 'Con dốc, sườn đồi', 7, '土 -> 反', '急な 坂道を 自転車で 上がります。', 'Kyuu na sakamichi o jitensha de agarimasu.', 'Đạp xe vượt con dốc đứng.', 'N3', 'Đất dốc ngược', 'Mặt đất thoai thoải dốc ngược uốn lượn.', '🚴', v_ch13_id, 20, '/assets/kanji/n3/illustrations/chap13_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('準', 'ジュン', '', 'jun', 'CHUẨN', 'Chuẩn bị, tiêu chuẩn', 13, '氵 -> 隼', '旅行の 準備を 前もって はじめます。', 'Ryokou no junbi o maemotte hajimemasu.', 'Bắt đầu chuẩn bị hành trang du lịch từ sớm.', 'N3', 'Mặt nước phẳng chuẩn mực', 'Mặt nước phẳng lặng như tấm gương chuẩn mực đo lường.', '🎒', v_ch14_id, 1, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('備', 'ビ', 'そな・える, そな・わる', 'sona', 'BỊ', 'Chuẩn bị, trang bị, phòng bị', 12, '亻 -> 𤰇', '地震に 備えて 水を 買っておきます。', 'Jishin ni sonaete mizu o katteokimasu.', 'Mua sẵn nước uống đề phòng động đất.', 'N3', 'Người trang bị đầy đủ tên nỏ', 'Người lính trang bị đầy đủ tên nỏ phòng bị chu đáo.', '🧰', v_ch14_id, 2, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('迎', 'ゲイ', 'むか・える', 'muka', 'NGHÊNH', 'Nghênh đón, chào đón', 7, '卬 -> 辶', '空港で 友達を 笑顔で 出迎えます。', 'Kuukou de tomodachi o egao de demukaemasu.', 'Nở nụ cười đón bạn ở sân bay.', 'N3', 'Bước đi nghênh đón', 'Tiến bước ra tận cửa ngõ nghênh đón khách quý.', '🤗', v_ch14_id, 3, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('変', 'ヘン', 'か・わる, か・える', 'ka', 'BIẾN', 'Thay đổi, kỳ lạ, biến hóa', 9, '亠 -> 𢆶 -> 攵', '季節が かわって 風景が 変化しました。', 'Kisetsu ga kawatte fuukei ga henkashimashita.', 'Mùa thay đổi khiến phong cảnh cũng biến đổi theo.', 'N3', 'Lời nói thay đổi', 'Lời nói và hành động biến hóa đổi mới linh hoạt.', '🔄', v_ch14_id, 4, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('飛', 'ヒ', 'と・ぶ, と・ばす', 'to', 'PHI', 'Bay lượn, phi cơ', 9, '飛', '青空を 鳥が 気持ちよさそうに 飛んでいます。', 'Aozora o tori ga kimochiyosasou ni tondeimasu.', 'Đàn chim bay lượn khoan khoái giữa bầu trời xanh.', 'N3', 'Cánh chim tung bay', 'Hình dáng chú chim dang rộng đôi cánh vút bay lên không trung.', '🕊️', v_ch14_id, 5, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('移', 'イ', 'うつ・る, うつ・す', 'utsu', 'DI', 'Di chuyển, dời đổi', 11, '禾 -> 多', '新しい 事務所へ 拠点を 移動しました。', 'Atarashii jimusho e kyoten o idoushimashita.', 'Đã di dời cơ sở sang văn phòng mới.', 'N3', 'Cây lúa chuyển nhiều nơi', 'Vận chuyển nhiều bó lúa dời sang kho chứa khác.', '🚚', v_ch14_id, 6, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('登', 'トウ, ト', 'のぼ・る', 'nobo', 'ĐĂNG', 'Leo núi, đăng ký', 12, '癶 -> 豆', '夏休みに 富士山に 登りました。', 'Natsuyasumi ni Fujisan ni noborimashita.', 'Tôi đã leo lên đỉnh núi Phú Sĩ vào kỳ nghỉ hè.', 'N3', 'Hai chân bước lên mâm cúng', 'Hai bàn chân vững chãi bước leo lên đỉnh cao.', '🧗', v_ch14_id, 7, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('泊', 'ハク', 'と・まる, と・める', 'to', 'BẠC', 'Trọ lại, nghỉ đêm', 8, '氵 -> 白', '温泉旅館に 一泊 二日で とまりました。', 'Onsenryokan ni ippaku futsuka de tomarimashita.', 'Tôi đã nghỉ lại lữ quán suối nước nóng 2 ngày 1 đêm.', 'N3', 'Thuyền ghé bờ trắng', 'Thuyền ghé bãi cát trắng trọ lại qua đêm.', '🏨', v_ch14_id, 8, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('団', 'ダン', '', 'dan', 'ĐOÀN', 'Đoàn thể, tập thể', 6, '囗 -> 寸', '団体旅行で ヨーロッパを めぐります。', 'Dantairyokou de Yooroppa o megurimasu.', 'Đi tham quan vòng quanh Châu Âu theo đoàn du lịch.', 'N3', 'Gói gọn trong một khung', 'Tất cả thành viên gắn kết trong một khối đoàn thể.', '👥', v_ch14_id, 9, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('程', 'テイ', 'ほど', 'hodo', 'TRÌNH', 'Lịch trình, trình độ, mức độ', 12, '禾 -> 呈', '旅行の 日程を 確認します。', 'Ryokou no nittei o kakuninshimasu.', 'Kiểm tra lại lịch trình chuyến đi.', 'N3', 'Đo lường bông lúa', 'Đo đạc từng bông lúa theo đúng quy trình kiểm định.', '🗓️', v_ch14_id, 10, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('欧', 'オウ', '', 'ou', 'ÂU', 'Châu Âu', 8, '区 -> 欠', '西欧の 文化に ついて 学びます。', 'Seiou no bunka ni tsuite manabimasu.', 'Tìm hiểu về nền văn hóa Tây Âu.', 'N3', 'Vùng đất mở đón nhận', 'Khu vực mở rộng đón chào nền văn minh Châu Âu.', '🏰', v_ch14_id, 11, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('州', 'シュウ', 'す', 'shuu', 'CHÂU', 'Châu lục, tiểu bang', 6, '川 -> 丶 x 3', 'アメリカの カリフォルニア州に 行きました。', 'Amerika no Kariforuniashuu ni ikimashita.', 'Tôi đã đến tiểu bang California của Mỹ.', 'N3', 'Bãi bồi trên sông', 'Những cồn cát bãi bồi nổi lên giữa ba dòng sông lớn.', '🗺️', v_ch14_id, 12, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('観', 'カン', 'み・る', 'kan', 'QUAN', 'Quan sát, ngắm cảnh', 18, '雚 -> 見', '京都の 寺院を 観光して まわります。', 'Kyouto no jiin o kankou shite mawarimasu.', 'Đi tham quan ngắm cảnh các ngôi chùa ở Kyoto.', 'N3', 'Cánh chim mở mắt nhìn', 'Mở to đôi mắt nhìn ngắm phong cảnh tuyệt đẹp.', '👀', v_ch14_id, 13, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('舟', 'シュウ', 'ふね, ふな', 'fune', 'CHU', 'Thuyền nan, thuyền nhỏ', 6, '舟', '小さな 舟に 乗って 川を くだります。', 'Chiisana fune ni notte kawa o kudarimasu.', 'Ngồi thuyền nan xuôi dòng trôi theo dòng sông.', 'N3', 'Chiếc thuyền nan đáy phẳng', 'Hình dáng chiếc thuyền con mộc mạc bơi trên sông.', '🛶', v_ch14_id, 14, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('芸', 'ゲイ', '', 'gei', 'NGHỆ', 'Nghệ thuật, tài năng', 7, '艹 -> 云', '日本の 伝統芸能を かんしょうします。', 'Nihon no dentougeinou o kanshoushimasu.', 'Thưởng thức các loại hình nghệ thuật truyền thống Nhật Bản.', 'N3', 'Bàn tay gieo mầm nghệ thuật', 'Bàn tay chăm bón mầm nghệ thuật nở hoa.', '🎭', v_ch14_id, 15, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('演', 'エン', '', 'en', 'DIỄN', 'Biểu diễn, diễn kịch', 14, '氵 -> 寅', '大劇場で 劇を 公演します。', 'Daigekijou de geki o kouenshimasu.', 'Công diễn vở kịch tại nhà hát lớn.', 'N3', 'Nước trôi theo cọp diễn xuất', 'Dòng nước tuôn trào theo bài diễn xuất tài ba.', '🎬', v_ch14_id, 16, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('仏', 'ブツ, フツ', 'ほとけ', 'butsu', 'PHẬT', 'Đức Phật, nước Pháp', 4, '亻 -> 厶', '奈良の 大仏を 見学しました。', 'Nara no Daibutsu o kengakushimashita.', 'Tôi đã đến chiêm bái tượng Đại Phật Nara.', 'N3', 'Người giác ngộ', 'Người từ bỏ tư lợi đạt tới cảnh giới giác ngộ từ bi.', '🪷', v_ch14_id, 17, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('神', 'シン, ジン', 'かみ', 'kami', 'THẦN', 'Thần linh, tâm thần', 9, '礻 -> 申', '神社で 手を 合わせて お祈りします。', 'Jinja de te o awasete oinorishimasu.', 'Chắp tay cầu nguyện trước đền thờ Thần đạo.', 'N3', 'Tia chớp báo thần giáng', 'Thần linh giáng trần báo hiệu sấm sét uy nghi.', '⛩️', v_ch14_id, 18, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('祭', 'サイ', 'まつ・り, まつ・る', 'matsu', 'TẾ', 'Lễ hội, cúng tế', 11, '月 -> 又 -> 示', '夏祭りで 花火が たくさん あがりました。', 'Natsumatsuri de hanabi ga takusan agarimashita.', 'Pháo hoa rực sáng trong đêm lễ hội mùa hè.', 'N3', 'Dâng thịt lên bàn thờ', 'Bàn tay dâng miếng thịt lên bàn tế thần linh mở hội.', '🎆', v_ch14_id, 19, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('絵', 'カイ, エ', '', 'e', 'HỘI', 'Tranh vẽ, hội họa', 12, '糸 -> 会', '美術館で 印象派の 絵画を 鑑賞します。', 'Bijutsukan de inshouha no kaiga o kanshoushimasu.', 'Thưởng lãm các tác phẩm tranh ấn tượng tại bảo tàng mỹ thuật.', 'N3', 'Sợi tơ hội tụ màu sắc', 'Những sợi tơ màu sắc hội tụ dệt nên bức tranh sống động.', '🎨', v_ch14_id, 20, '/assets/kanji/n3/illustrations/chap14_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('角', 'カク', 'かど, つの', 'kado', 'GIÁC', 'Góc phố, góc cạnh, sừng', 7, '⺈ -> 用', '次の 角を 右に まがってください。', 'Tsugi no kado o migi ni magatte kudasai.', 'Hãy rẽ phải ở góc phố tiếp theo.', 'N3', 'Chiếc sừng nhọn', 'Chiếc sừng cong nhọn trên đầu con thú tạo thành góc.', '📐', v_ch15_id, 1, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('曲', 'キョク', 'ま・がる, ま・げる', 'maga', 'KHÚC', 'Uốn cong, ca khúc', 6, '冂 -> 卄', '交差点を 左に 曲がります。', 'Kousaten o hidari ni magarimasu.', 'Rẽ trái ở ngã tư.', 'N3', 'Khuôn thước uốn cong', 'Cây thước tre uốn khúc tạo nên giai điệu cong mềm.', '↩️', v_ch15_id, 2, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('折', 'セツ', 'お・る, お・れる', 'o', 'CHIẾT', 'Bẻ gãy, gấp, gập', 7, '扌 -> 斤', '風で 庭の 木の枝が 折れました。', 'Kaze de niwa no kieda ga oremashita.', 'Gió to làm gãy cành cây trong vườn.', 'N3', 'Tay rìu chặt gãy', 'Bàn tay cầm rìu chặt đứt gập thanh củi.', '折', v_ch15_id, 3, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('路', 'ロ', 'じ, みち', 'michi', 'LỘ', 'Đường lộ, lối đi', 13, '足 -> 各', '迷路の ような 細い 路地を 歩きます。', 'Meiro no you na hosoi roji o arukimasu.', 'Đi bộ qua con ngõ hẹp như mê cung.', 'N3', 'Bước chân đến từng con đường', 'Bàn chân bước qua từng góc đường phố xá.', '🛣️', v_ch15_id, 4, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('追', 'ツイ', 'お・う', 'o', 'TRUY', 'Đuổi theo, truy đuổi', 9, '𠂤 -> 辶', '前の 車を 追いこします。', 'Mae no kuruma o oikoshimasu.', 'Vượt đuổi qua chiếc xe chạy phía trước.', 'N3', 'Bước chân đuổi theo quân đội', 'Bước chân thần tốc truy kích đuổi theo mục tiêu.', '🏃‍♂️', v_ch15_id, 5, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('突', 'トツ', 'つ・く', 'tsu', 'ĐỘT', 'Đột ngột, đâm vào', 8, '穴 -> 犬', '曲がり角で 車が 突然 とび出してきました。', 'Magarikado de kuruma ga totsuzen tobidashitekimashita.', 'Chiếc xe đột ngột lao ra từ góc cua.', 'N3', 'Chó lao khỏi hang', 'Chú chó bất ngờ lao vọt ra khỏi miệng hang.', '💥', v_ch15_id, 6, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('転', 'テン', 'ころ・がる, ころ・ぶ', 'koro', 'CHUYỂN', 'Lăn, ngã, chuyển động', 11, '車 -> 云', '自転車で 転んで ひざを すりむきました。', 'Jitensha de koronde hiza o surimukimashita.', 'Ngã xe đạp nên tôi bị trầy xước đầu gối.', 'N3', 'Bánh xe lăn tròn', 'Bánh xe cộ lăn tròn chuyển động trên đường.', '🚲', v_ch15_id, 7, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('倒', 'トウ', 'たお・れる, たお・す', 'tao', 'ĐẢO', 'Ngã nhào, lật đổ', 10, '亻 -> 到', '強い 風で 看板が 倒れました。', 'Tsuyoi kaze de看板 ga taoremashita.', 'Gió mạnh làm bảng hiệu đổ sập.', 'N3', 'Người đến nơi ngã nhào', 'Người kiệt sức khi vừa đến nơi ngã quỵ xuống đất.', '🤸‍♂️', v_ch15_id, 8, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('位', 'イ', 'くらい', 'i', 'VỊ', 'Vị trí, vị thế', 7, '亻 -> 立', 'マラソンで 第二位に 入賞しました。', 'Marason de daini-i ni nyuushoushimashita.', 'Tôi đạt giải nhì vị trí thứ hai môn chạy marathon.', 'N3', 'Người đứng vào vị trí', 'Người đứng hiên ngang xác định vị trí của mình.', '📍', v_ch15_id, 9, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('置', 'チ', 'お・く', 'o', 'TRÍ', 'Đặt để, bố trí', 13, '罒 -> 直', '机の 上に 辞書を 置きます。', 'Tsukue no ue ni jisho o okimasu.', 'Đặt cuốn từ điển ngay ngắn lên bàn.', 'N3', 'Lưới bắt thẳng đặt xuống', 'Giăng lưới thẳng thớm đặt để vào vị trí cố định.', '📥', v_ch15_id, 10, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('横', 'オウ', 'よこ', 'yoko', 'HOÀNH', 'Bề ngang, nằm ngang, bên cạnh', 15, '木 -> 黄', '信号の 横にある 横断歩道を わたります。', 'Shingou no yoko ni aru oudanhodou o watarimasu.', 'Sang đường bằng vạch kẻ bộ hành bên cạnh đèn giao thông.', 'N3', 'Cây gỗ màu vàng đặt ngang', 'Thanh gỗ vàng đặt nằm ngang làm rào chắn.', '↔️', v_ch15_id, 11, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('央', 'オウ', '', 'ou', 'ƯƠNG', 'Trung ương, chính giữa', 5, '大 -> 冂', '道路の 中央分離帯に 注意してください。', 'Douro no chuuoubunritai ni chuuishite kudasai.', 'Hãy chú ý dải phân cách ở giữa lòng đường.', 'N3', 'Người đứng chính giữa', 'Người dang tay đứng vững ngay trung tâm chính giữa.', '🎯', v_ch15_id, 12, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('直', 'チョク, ジキ', 'ただ・ちに, なお・す', 'nao', 'TRỰC', 'Ngay thẳng, trực tiếp, sửa chữa', 8, '十 -> 目 -> 乚', 'この 道を まっすぐ 直進してください。', 'Kono michi o massugu chokushinshite kudasai.', 'Xin hãy đi thẳng trực tiếp theo con đường này.', 'N3', 'Mắt nhìn thẳng mười hướng', 'Ánh mắt ngay thẳng không tì vết nhìn thẳng phía trước.', '📏', v_ch15_id, 13, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('線', 'セン', '', 'sen', 'TUYẾN', 'Đường thẳng, tuyến đường', 15, '糸 -> 泉', '白線の 内側に お下がりください。', 'Hakusen no uchigawa ni osagari kudasai.', 'Xin quý khách vui lòng lùi lại phía trong vạch trắng.', 'N3', 'Sợi chỉ từ suối nguồn', 'Sợi tơ kéo dài từ dòng suối tạo nên đường thẳng.', '🛤️', v_ch15_id, 14, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('逆', 'ゲキ', 'さか, さか・らう', 'saka', 'NGHỊCH', 'Ngược lại, phản nghịch', 9, '屰 -> 辶', '矢印と 逆の 方向に 進んでしまいました。', 'Yajirushi to gyaku no houkou ni susundeshimaimashita.', 'Tôi đã lỡ đi theo hướng ngược lại với mũi tên chỉ dẫn.', 'N3', 'Chân đi ngược hướng', 'Đôi chân bước ngược lại chiều chỉ dẫn thông thường.', '🔄', v_ch15_id, 15, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('側', 'ソク', 'がわ, そば', 'gawa', 'TRẮC', 'Bên cạnh, phía, mặt bên', 11, '亻 -> 則', '道路の 右側を 通行します。', 'Douro no migigawa o tsuukoushimasu.', 'Lưu thông xe cộ ở phần đường bên phải.', 'N3', 'Người đứng bên quy tắc', 'Người đứng ở phía mặt bên kiểm tra quy tắc.', '➡️', v_ch15_id, 16, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('注', 'チュウ', 'そそ・ぐ', 'chuu', 'CHÚ', 'Rót vào, chú ý', 8, '氵 -> 主', '運転中は 前方に 注意しましょう。', 'Untenjuu wa zenpou ni chuuishimashou.', 'Khi lái xe hãy chú ý quan sát phía trước.', 'N3', 'Rót nước làm chủ', 'Tập trung dòng nước chảy rót thẳng vào mục tiêu.', '⚠️', v_ch15_id, 17, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('意', 'イ', '', 'i', 'Ý', 'Ý chí, ý nghĩa, ý định', 13, '音 -> 心', '相手の 意見を よく 聞きます。', 'Aite no iken o yoku kikimasu.', 'Lắng nghe cẩn thận ý kiến của đối phương.', 'N3', 'Âm thanh trong tim', 'Âm thanh vang lên từ trái tim chính là ý nguyện.', '💡', v_ch15_id, 18, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('橋', 'キョウ', 'はし', 'hashi', 'KIỀU', 'Cây cầu', 16, '木 -> 喬', '大きな 橋を 渡って 対岸へ 行きます。', 'Ookina hashi o watatte taigan e ikimasu.', 'Qua cây cầu lớn để sang bờ đối diện.', 'N3', 'Cây gỗ uốn cao thành cầu', 'Thân gỗ cao bắc qua sông tạo thành cây cầu kiên cố.', '🌉', v_ch15_id, 19, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('進', 'シン', 'すす・む, すす・める', 'susu', 'TIẾN', 'Tiến bộ, tiến lên', 11, '隹 -> 辶', '青信号に なったら 前に 進んでください。', 'Aoshingou ni nattara mae ni susunde kudasai.', 'Khi đèn chuyển sang xanh hãy tiến về phía trước.', 'N3', 'Chim tiến bước', 'Cánh chim chỉ biết tiến bước về phía trước không lùi.', '⏩', v_ch15_id, 20, '/assets/kanji/n3/illustrations/chap15_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('仕', 'シ', 'つか・える', 'tsuka', 'SĨ', 'Phục vụ, làm việc', 5, '亻 -> 士', '毎日の 仕事を ていねいに こなします。', 'Mainichi no shigoto o teinei ni konashimasu.', 'Hoàn thành công việc mỗi ngày một cách chu đáo.', 'N3', 'Người làm quan', 'Kẻ sĩ phụng sự làm việc vì cộng đồng.', '💼', v_ch16_id, 1, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('職', 'ショク', '', 'shoku', 'CHỨC', 'Chức vụ, nghề nghiệp', 18, '耳 -> 音 -> 戈', '自分に 合った 職業を 探しています。', 'Jibun ni atta shokugyou o sagashiteimasu.', 'Tôi đang tìm kiếm nghề nghiệp phù hợp với bản thân.', 'N3', 'Lắng nghe tiếng lệnh chức vụ', 'Lắng nghe tiếng lệnh thực thi trọng trách chức vụ.', '👔', v_ch16_id, 2, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('求', 'キュウ', 'もと・める', 'moto', 'CẦU', 'Tìm kiếm, yêu cầu', 7, '求', '求人広告を 見て 応募しました。', 'Kyuujinkoukoku o mite ouboshimashita.', 'Tôi đã xem tin tuyển dụng và nộp hồ sơ ứng tuyển.', 'N3', 'Dang tay cầu xin', 'Đôi tay dang rộng khát khao kiếm tìm cơ hội.', '🔍', v_ch16_id, 3, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('探', 'タン', 'さが・す', 'saga', 'THÁM', 'Tìm tòi, thăm dò', 11, '扌 -> 穴 -> 木', '部屋の かぎを 一生懸命 探しました。', 'Heya no kagi o isshoukenmei sagashimashita.', 'Tôi đã cố hết sức tìm kiếm chiếc chìa khóa phòng.', 'N3', 'Tay thò vào hang tìm kiếm', 'Bàn tay lần mò vào hang sâu tìm kiếm đồ vật.', '🔎', v_ch16_id, 4, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('常', 'ジョウ', 'つね', 'tsune', 'THƯỜNG', 'Bình thường, thường xuyên', 11, '⺌ -> 冖 -> 口 -> 巾', '社会人としての 常識を 身につけます。', 'Shakaijin toshite no joushiki o minitsukemasu.', 'Rèn luyện những thường thức chuẩn mực của người đi làm.', 'N3', 'Tấm vải bền dùng thường xuyên', 'Tấm vải may bền chặt được dùng thường nhật hàng ngày.', '🔄', v_ch16_id, 5, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('識', 'シキ', '', 'shiki', 'THỨC', 'Kiến thức, nhận thức', 19, '言 -> 音 -> 戈', '幅広い 知識を みがきあげます。', 'Habahiroi chishiki o migakiagemasu.', 'Mài giũa trau dồi vốn tri thức sâu rộng.', 'N3', 'Lời nói hiểu biết', 'Lời nói am tường mọi vũ khí quy chuẩn tri thức.', '🧠', v_ch16_id, 6, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('失', 'シツ', 'うしな・う', 'ushina', 'THẤT', 'Mất mát, thất bại, thất lễ', 5, '丿 -> 夫', '失礼のないように マナーを 守ります。', 'Shitsurei no nai you ni manaa o mamorimasu.', 'Giữ đúng lễ nghi phép tắc để không bị khiếm nhã thất lễ.', 'N3', 'Tuột tay mất đồ', 'Bàn tay trượt tay làm rơi mất bảo vật quý.', '❌', v_ch16_id, 7, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('礼', 'レイ, ライ', '', 'rei', 'LỄ', 'Lễ nghi, cảm ơn', 5, '礻 -> 乚', 'お世話になった 方に お礼を 言います。', 'Osewa ni natta kata ni orei o iimasu.', 'Nói lời cảm ơn đến người đã giúp đỡ mình chu đáo.', 'N3', 'Thần linh tôn sùng lễ nghi', 'Cúi đầu kính cẩn trước thần linh giữ trọn lễ nghĩa.', '🙇', v_ch16_id, 8, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('労', 'ロウ', 'ねぎら・う', 'rou', 'LAO', 'Lao động, vất vả', 7, '𤇾 -> 力', '毎日の 労働に 感謝します。', 'Mainichi no roudou ni kanshashimasu.', 'Biết ơn những giọt mồ hôi công sức lao động mỗi ngày.', 'N3', 'Ngọn đuốc dốc sức lực', 'Thắp đuốc đêm dốc sức lực cống hiến lao động miệt mài.', '⚒️', v_ch16_id, 9, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('員', 'イン', '', 'in', 'VIÊN', 'Thành viên, nhân viên', 10, '口 -> 貝', '会社の 職員として まじめに 働きます。', 'Kaisha no shokuin toshite majime ni hatarakimasu.', 'Làm việc chăm chỉ với tư cách là nhân viên công ty.', 'N3', 'Người nhận tiền công', 'Thành viên cơ quan quản lý sổ sách tiền tài.', '🧑‍💼', v_ch16_id, 10, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('官', 'カン', '', 'kan', 'QUAN', 'Quan lại, quan chức', 8, '宀 -> 𠄤', '外交官に なって 世界で 活躍したいです。', 'Gaikoukan ni natte sekai de katsuyakushitai desu.', 'Tôi muốn trở thành nhà ngoại giao hoạt động trên trường quốc tế.', 'N3', 'Tòa nhà quan lại', 'Dưới mái nhà công vụ của bậc quan chức mẫn cán.', '🏛️', v_ch16_id, 11, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('局', 'キョク', '', 'kyoku', 'CỤC', 'Cơ quan, bưu cục, cục diện', 7, '尸 -> 句', '郵便局へ 手紙を 出しに 行きます。', 'Yuubinkyoku e tegami o dashi ni ikimasu.', 'Đến bưu điện gửi thư.', 'N3', 'Phòng ban ngăn nắp', 'Gian phòng vách ngăn phân định các cục chuyên môn.', '🏢', v_ch16_id, 12, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('辞', 'ジ', 'や・める', 'ji', 'TỪ', 'Từ chức, từ điển, từ biệt', 13, '舌 -> 辛', '長年 つとめた 会社を 辞職しました。', 'Naganen tsutometa kaisha o jishokushimashita.', 'Tôi đã từ chức rời khỏi công ty sau nhiều năm gắn bó.', 'N3', 'Lưỡi nói lời cay đắng từ bỏ', 'Đầu lưỡi thốt lời cay đắng xin cáo từ lui gót.', '👋', v_ch16_id, 13, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('退', 'タイ', 'しりぞ・く', 'tai', 'THOÁI', 'Thoái lui, nghỉ hưu', 9, '艮 -> 辶', '祖父は 去年 定年で 退職しました。', 'Sofu wa kyonen teinen de taishokushimashita.', 'Ông nội tôi năm ngoái đã nghỉ hưu đúng độ tuổi.', 'N3', 'Bước chân thoái lui', 'Bước chân lùi lại nhường chỗ cho thế hệ sau an nhàn nghỉ hưu.', '🚪', v_ch16_id, 14, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('積', 'セキ', 'つ・む, つ・もる', 'tseki', 'TÍCH', 'Tích lũy, chất đống', 16, '禾 -> 責', '仕事の 経験を たくさん 積み重ねます。', 'Shigoto no keiken o takusan tsumikasanemasu.', 'Tích lũy thêm thật nhiều vốn kinh nghiệm làm việc.', 'N3', 'Tích trữ bông lúa', 'Bông lúa vàng chất đống tạo nên tích lũy của cải dồi dào.', '📦', v_ch16_id, 15, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('給', 'キュウ', '', 'kyuu', 'CẤP', 'Cung cấp, tiền lương', 12, '糸 -> 合', '毎月の 給料が 振り込まれました。', 'Maitsuki no kyuuryou ga furikomaremashita.', 'Tiền lương hàng tháng đã được chuyển khoản vào tài khoản.', 'N3', 'Chỉ cấp phát hợp lý', 'Sợi tơ phân phát cung cấp đầy đủ cho mọi người.', '💵', v_ch16_id, 16, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('収', 'シュウ', 'おさ・める', 'osame', 'THU', 'Thu nhập, thu hoạch', 4, '丩 -> 攵', '今月の 収入と 支出を けいさんします。', 'Kongetsu no shuunyuu to shishutsu o keisanshimasu.', 'Tính toán thu nhập và chi tiêu của tháng này.', 'N3', 'Bàn tay thu gom', 'Bàn tay gặt hái thu gom hoa lợi về kho.', '📈', v_ch16_id, 17, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('支', 'シ', 'ささ・える', 'sasa', 'CHI', 'Chống đỡ, chi nhánh, chi tiêu', 4, '十 -> 又', 'お互いに 支え合って 生きていきます。', 'Otagai ni sasaeatte ikiteikimasu.', 'Cùng nâng đỡ hỗ trợ lẫn nhau trong cuộc sống.', 'N3', 'Bàn tay chống đỡ cành cây', 'Bàn tay nắm lấy cành cây chống đỡ vững chãi.', '🤝', v_ch16_id, 18, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('厚', 'コウ', 'あつ・い', 'atsu', 'HẬU', 'Dày dặn, nồng hậu', 9, '厂 -> 𢆶 -> 子', '厚い 辞書を めくって 調べます。', 'Atsui jisho o mekutte shirabemasu.', 'Lật mở cuốn từ điển dày cộp để tra cứu.', 'N3', 'Vách đá nồng hậu che chở', 'Vách đá dày dặn bao bọc tấm lòng nồng hậu ấm áp.', '📖', v_ch16_id, 19, '/assets/kanji/n3/illustrations/chap16_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('議', 'ギ', '', 'gi', 'NGHỊ', 'Hội nghị, nghị sự, bàn bạc', 20, '言 -> 義', '会議で 新しい 提案を 発表します。', 'Kaigi de atarashii teian o happyoushimasu.', 'Trình bày đề xuất mới trong cuộc họp.', 'N3', 'Lời nói chính nghĩa', 'Dùng lời lẽ chính trực bàn thảo việc công.', '🗣️', v_ch17_id, 1, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('賛', 'サン', '', 'san', 'TÁN', 'Tán thành, khen ngợi', 15, '夫 -> 夫 -> 貝', '全員一致で その 計画に 賛成しました。', 'Zen-in itchi de sono keikaku ni sanseishimashita.', 'Tất cả mọi người đồng lòng tán thành kế hoạch đó.', 'N3', 'Hai người cùng khen thưởng', 'Hai người cùng tán đồng dâng vỏ sò khen ngợi.', '👍', v_ch17_id, 2, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('反', 'ハン, ホン', 'そ・る, かえ・す', 'han', 'PHẢN', 'Phản đối, lật lại', 4, '厂 -> 又', 'その 意見には 反対です。', 'Sono iken ni wa hantai desu.', 'Tôi xin phép phản đối ý kiến đó.', 'N3', 'Bàn tay lật sườn núi', 'Bàn tay đẩy lật ngược thế cờ trên sườn núi.', '🙅', v_ch17_id, 3, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('対', 'タイ, ツイ', '', 'tai', 'ĐỐI', 'Đối diện, đối lập, đối chiếu', 7, '文 -> 寸', '相手の 目を 見て 話します。', 'Aite no me o mite hanashimasu.', 'Nhìn vào mắt đối phương khi trò chuyện.', 'N3', 'Đưa tấc tay đối ứng', 'Đưa bàn tay ra đối ứng chuẩn xác từng cử chỉ.', '↔️', v_ch17_id, 4, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('肯', 'コウ', '', 'kou', 'KHẲNG', 'Khẳng định, ưng thuận', 8, '止 -> 月', '彼の 意見を 肯定的に 受け止めます。', 'Kare no iken o kouteiteki ni uketomemasu.', 'Tiếp nhận ý kiến của anh ấy với thái độ khẳng định tích cực.', 'N3', 'Bàn chân chạm miếng thịt ưng ý', 'Bàn chân bước tới chấp thuận điều cốt lõi.', '✔️', v_ch17_id, 5, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('否', 'ヒ', 'いな', 'ina', 'PHỦ', 'Phủ định, chối bỏ', 7, '不 -> 口', '事実を 否定することは できません。', 'Jijitsu o hiteisuru koto wa dekimasen.', 'Không thể phủ nhận sự thật hiển nhiên đó được.', 'N3', 'Miệng nói lời chối từ', 'Mở miệng nói lời phản đối chối bỏ phủ định.', '❌', v_ch17_id, 6, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('保', 'ホ', 'たも・つ', 'tamo', 'BẢO', 'Bảo đảm, bảo lưu, gìn giữ', 9, '亻 -> 呆', '環境の 安全を 保ちます。', 'Kankyou no anzen o tamochimasu.', 'Gìn giữ an toàn cho môi trường.', 'N3', 'Người bảo bọc đứa trẻ', 'Người mẹ ôm đứa trẻ bảo vệ an toàn trên tay.', '🛡️', v_ch17_id, 7, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('留', 'リュウ, ル', 'と・まる, と・める', 'toma', 'LƯU', 'Bảo lưu, lưu lại, du học', 10, '卯 -> 田', '日本へ 留学して 経済を 学びます。', 'Nihon e ryuugakushite keizai o manabimasu.', 'Sang Nhật du học ngành kinh tế.', 'N3', 'Giữ chân lại trên cánh đồng', 'Cắt nhát cuốc lưu giữ phù sa ở lại ruộng đồng.', '📌', v_ch17_id, 8, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('判', 'ハン, バン', '', 'han', 'PHÁN', 'Phán đoán, con dấu, phân xử', 7, '半 -> 刂', '状況を 冷静に 判断します。', 'Joukyou o reisei ni handanshimasu.', 'Bình tĩnh phán đoán tình hình thực tế.', 'N3', 'Dao chia nửa phân xử', 'Dùng con dao chém đôi phân xử công minh.', '⚖️', v_ch17_id, 9, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('断', 'ダン', 'ことわ・る, た・つ', 'kotowa', 'ĐOẠN', 'Cắt đứt, quyết đoán, từ chối', 11, '𢇍 -> 斤', 'むりな 頼みは きっぱり 断ります。', 'Muri na tanomi wa kippari kotowarimasu.', 'Dứt khoát từ chối những lời thỉnh cầu quá sức.', 'N3', 'Rìu chặt đứt cuộn dây', 'Dùng rìu chém đứt sợi dây dứt khoát quyết đoán.', '✂️', v_ch17_id, 10, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('確', 'カク', 'たし・か, たし・かめる', 'tashi', 'XÁC', 'Chính xác, xác nhận', 15, '石 -> 隺', 'スケジュールを もう一度 確認します。', 'Sukejuuru o mou ichido kakuninshimasu.', 'Xác nhận kiểm tra lại lịch trình một lần nữa.', 'N3', 'Đá cứng như chim sếu', 'Hòn đá vững như chim sếu xác thực kiên định.', '🔍', v_ch17_id, 11, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('認', 'ニン', 'みと・める', 'mito', 'NHẬN', 'Công nhận, thừa nhận', 14, '言 -> 忍', '自分の ミスを 素直に 認めました。', 'Jibun no misu o sunao ni mitomemashita.', 'Thành thật thừa nhận sai sót của bản thân.', 'N3', 'Lời nói nhẫn nại ghi nhận', 'Dùng lời lẽ nhẫn nại công nhận sự thật.', '✅', v_ch17_id, 12, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('報', 'ホウ', '', 'hou', 'BÁO', 'Báo cáo, thông báo, báo thù', 12, '幸 -> 卩 -> 又', '調査の 結果を 上司に 報告します。', 'Chousa no kekka o joushi ni houkokushimasu.', 'Báo cáo kết quả khảo sát cho cấp trên.', 'N3', 'Cởi trói báo tin vui', 'Cởi trói thông báo tin mừng giải thoát.', '📢', v_ch17_id, 13, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('告', 'コク', 'つ・げる', 'tsu', 'CÁO', 'Thông cáo, báo tin', 7, '牛 -> 口', '新しい 企画の 開始を 告げます。', 'Atarashii kikaku no kaishi o tsugemasu.', 'Thông báo về việc triển khai kế hoạch mới.', 'N3', 'Cặp sừng bò mở miệng kêu', 'Con bò mở miệng kêu rống báo cáo sự việc.', '📣', v_ch17_id, 14, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('連', 'レン', 'つ・れる', 'tsu', 'LIÊN', 'Liên kết, liên lạc, dắt theo', 10, '車 -> 辶', '友人と メールで 連絡を とりあいます。', 'Yuujin to meeru de renraku o toriaimasu.', 'Thường xuyên liên lạc trao đổi qua email với bạn bè.', 'N3', 'Xe nối đuôi tiến bước', 'Những cỗ xe nối đuôi nhau liên hoàn tiến bước.', '🔗', v_ch17_id, 15, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('絡', 'ラク', 'から・む', 'kara', 'LẠC', 'Mạch lạc, vướng mắc, liên lạc', 12, '糸 -> 各', '困ったときは すぐに 連絡してください。', 'Komatta toki wa sugu ni renrakushite kudasai.', 'Khi gặp khó khăn hãy liên lạc ngay nhé.', 'N3', 'Sợi chỉ nối từng nơi', 'Sợi tơ kết nối mạng lưới thông suốt mọi ngả đường.', '📞', v_ch17_id, 16, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('相', 'ソウ, ショウ', 'あい', 'ai', 'TƯƠNG', 'Tương hỗ, đối phương, tướng mạo', 9, '木 -> 目', '先生に 進路の 相談を しました。', 'Sensei ni shinro no soudan o shimashita.', 'Tôi đã trao đổi thảo luận với thầy về định hướng tương lai.', 'N3', 'Mắt nhìn cây tương trợ', 'Mắt chăm chú nhìn cây hai bên cùng thấu hiểu tương tác.', '👥', v_ch17_id, 17, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('談', 'ダン', '', 'dan', 'ĐÀM', 'Đàm thoại, thảo luận', 15, '言 -> 炎', '会議室で 今後の 方針を 談合します。', 'Kaigishitsu de kongo no houshin o dangoushimasu.', 'Bàn thảo phương châm sắp tới trong phòng họp.', 'N3', 'Lời nói ấm như lửa hồng', 'Dùng lời lẽ nồng ấm đàm luận sôi nổi.', '💬', v_ch17_id, 18, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('指', 'シ', 'ゆび, さ・す', 'yubi', 'CHỈ', 'Ngón tay, chỉ dẫn, chỉ định', 9, '扌 -> 旨', '先生の 指示に したがって 行動します。', 'Sensei no shiji ni shitagatte koudoushimasu.', 'Hành động tuân theo chỉ thị của thầy cô.', 'N3', 'Tay chỉ ý hay', 'Bàn tay đưa ngón trỏ chỉ dẫn điều hay ý đẹp.', '👉', v_ch17_id, 19, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('示', 'ジ, シ', 'しめ・す', 'shime', 'THỊ', 'Biểu thị, chỉ cho thấy', 5, '一 -> 小', 'パスポートを 提示してください。', 'Pasupooto o teijishite kudasai.', 'Xin vui lòng xuất trình hộ chiếu để kiểm tra.', 'N3', 'Bàn thờ thần linh thị hiện', 'Bàn tế cúng thần linh hiển thị điềm lành.', '📜', v_ch17_id, 20, '/assets/kanji/n3/illustrations/chap17_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('最', 'サイ', 'もっと・も', 'motto', 'TỐI', 'Nhất, tối đa, tối ưu', 12, '日 -> 取', '最高気温が 三十度を こえました。', 'Saikou kion ga sanjuudo o koemashita.', 'Nhiệt độ cao nhất đã vượt quá 30 độ C.', 'N3', 'Nắm lấy ánh mặt trời chói nhất', 'Đưa tay chộp lấy đỉnh cao nhất nơi ánh dương rực rỡ.', '🔝', v_ch18_id, 1, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('副', 'フク', '', 'fuku', 'PHÓ', 'Phó giám đốc, phụ tá, kèm theo', 11, '畐 -> 刂', '副社長が 新しい 方針を 発表しました。', 'Fukushachou ga atarashii houshin o happyoushimashita.', 'Phó giám đốc đã công bố phương châm hoạt động mới.', 'N3', 'Dao chia hũ rượu phụ trợ', 'Dùng dao mở chia hũ rượu giúp sức phụ tá.', '🥈', v_ch18_id, 2, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('管', 'カン', 'くだ', 'kuda', 'QUẢN', 'Quản lý, ống dẫn', 14, '竹 -> 官', 'チーム全体の スケジュールを 管理します。', 'Chiimu zentai no sukejuuru o kanrishimasu.', 'Quản lý tiến độ công việc của toàn đội.', 'N3', 'Ống trúc quan phòng', 'Ống trúc làm công cụ đo lường quản lý của quan lại.', '📋', v_ch18_id, 3, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('者', 'シャ', 'もの', 'mono', 'GIẢ', 'Người, kẻ', 8, '耂 -> 日', '経験豊かな 専門者が 指導します。', 'Keiken yutaka na semmonsha ga shidoushimasu.', 'Chuyên gia dày dặn kinh nghiệm trực tiếp hướng dẫn.', 'N3', 'Người xưa ngồi dưới nắng', 'Bậc lão nhân thông thái ngồi dưới nắng giảng giải.', '🧑', v_ch18_id, 4, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('現', 'ゲン', 'あらわ・れる, あらわ・す', 'arawa', 'HIỆN', 'Hiện tại, xuất hiện, hiện hình', 11, '王 -> 見', '問題が 解決して 笑顔が 現れました。', 'Mondai ga kaiketsushite egao ga arawaremashita.', 'Vấn đề được giải quyết nụ cười lại hiện ra trên môi.', 'N3', 'Viên ngọc hiện ra trước mắt', 'Viên ngọc quý lộ diện tỏa sáng trước mắt mọi người.', '✨', v_ch18_id, 5, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('旧', 'キュウ', '', 'kyuu', 'CỰU', 'Cũ kỹ, ngày xưa', 5, '丨 -> 日', '旧式の パソコンを 新しい ものに 交換しました。', 'Kyuushiki no pasokon o atarashii mono ni koukanshimashita.', 'Đổi chiếc máy tính đời cũ lấy máy tính mới.', 'N3', 'Mặt trời xưa cũ', 'Ánh mặt trời của những ngày xa xưa trong quá khứ.', '🏛️', v_ch18_id, 6, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('昔', 'セキ, シャク', 'むかし', 'mukashi', 'TÍCH', 'Ngày xưa, cổ xưa', 8, '廿 -> 日', '昔の 懐かしい 写真を ながめます。', 'Mukashi no natsukashii shashin o nagamemasu.', 'Ngắm lại những bức ảnh kỷ niệm xưa cũ thân thương.', 'N3', 'Mặt trời qua hai mươi năm', 'Mặt trời chiếu qua bao thập kỷ hóa thành chuyện xưa.', '📜', v_ch18_id, 7, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('次', 'ジ, シ', 'つぎ, つ・ぐ', 'tsugi', 'THỨ', 'Kế tiếp, thứ tự, lần sau', 6, '冫 -> 欠', '次の 駅で 電車を 乗り換えます。', 'Tsugi no eki de densha o norikaemasu.', 'Chuyển tàu tại ga kế tiếp.', 'N3', 'Băng thiếu nhường lượt sau', 'Người đứng sau nhường lượt tiếp theo bước lên.', '⏭️', v_ch18_id, 8, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('億', 'オク', '', 'oku', 'ỨC', 'Trăm triệu (100.000.000)', 15, '亻 -> 意', 'その 映画の 興行収入は 百億円を こえました。', 'Sono eiga no kougyoushuunyuu wa hyakuokuen o koemashita.', 'Doanh thu phòng vé bộ phim đã vượt mốc 10 tỷ Yên.', 'N3', 'Người ôm ý niệm trăm triệu', 'Người ấp ủ ý chí gom góp bạc trăm triệu lớn lao.', '💰', v_ch18_id, 9, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('兆', 'チョウ', 'きざ・す', 'chou', 'TRIỆU', 'Nghìn tỷ, điềm báo', 6, '兆', '国の 予算は 百兆円に のぼります。', 'Kuni no yosan wa hyakuchouen ni noborimasu.', 'Ngân sách quốc gia lên tới 100 nghìn tỷ Yên.', 'N3', 'Vết nứt trên mai rùa', 'Vết rạn nứt báo điềm triệu trên mai rùa bói toán.', '💸', v_ch18_id, 10, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('費', 'ヒ', 'つい・やす', 'hi', 'PHÍ', 'Chi phí, tiêu xài', 12, '弗 -> 貝', '生活費を 節約するために 自炊します。', 'Seikatsuhi o setsuyakusuru tame ni jiswishimasu.', 'Tự nấu ăn để tiết kiệm chi phí sinh hoạt.', 'N3', 'Tiêu vỏ sò mua sắm', 'Chi tiêu tiền vỏ sò trang trải mọi sinh hoạt.', '💳', v_ch18_id, 11, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('算', 'サン', '', 'san', 'TOÁN', 'Tính toán, dự toán', 14, '竹 -> 目 -> 廾', '来年度の 予算案を 計算します。', 'Rainendo no yosan-an o keisanshimasu.', 'Tính toán đề án ngân sách cho năm tài khóa tới.', 'N3', 'Cầm thẻ tre bàn tính', 'Hai tay cầm những que tre bàn tính tính toán rành mạch.', '🧮', v_ch18_id, 12, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('供', 'キョウ, ク', 'そな・える, とも', 'tomo', 'CUNG', 'Cung cấp, đồ cúng, cùng đi', 8, '亻 -> 共', '子どもたちに 新しい 遊具を 提供します。', 'Kodomotachi ni atarashii yuugu o teikyoushimasu.', 'Cung cấp thiết bị vui chơi mới cho các em nhỏ.', 'N3', 'Người cùng chung tay cung phụng', 'Mọi người cùng chung tay dâng tặng cung cấp đồ đạc.', '🤲', v_ch18_id, 13, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('税', 'ゼイ', '', 'zei', 'THUẾ', 'Thuế, tiền thuế', 12, '禾 -> 兌', '消費税を ふくめた 金額を 支払います。', 'Shouhizei o fukumeta kingaku o shiharaimasu.', 'Thanh toán số tiền đã bao gồm thuế tiêu dùng.', 'N3', 'Nộp lúa làm thuế', 'Đem lúa thóc thu hoạch nộp thuế nhà nước hân hoan.', '🧾', v_ch18_id, 14, '/assets/kanji/n3/illustrations/chap18_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('産', 'サン', 'う・む, う・まれる', 'san', 'SẢN', 'Sản xuất, sinh sản, tài sản', 11, '立 -> 厂 -> 生', '地元で 生産された 新鮮な やさいです。', 'Jimoto de seisansareta shinsen na yasai desu.', 'Rau củ tươi ngon được sản xuất ngay tại địa phương.', 'N3', 'Sinh sôi tài sản', 'Đứng trên mảnh đất sinh sôi của cải tài sản dồi dào.', '🌾', v_ch19_id, 1, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('農', 'ノウ', '', 'nou', 'NÔNG', 'Nông nghiệp, làm ruộng', 13, '曲 -> 辰', '祖父母は 畑で 農業を いとなんでいます。', 'Sofubo wa hatake de nougyou o itonandeimasu.', 'Ông bà tôi làm nghề nông trên đồng ruộng.', 'N3', 'Làm ruộng theo sao thần nông', 'Cày bừa mùa vụ chuẩn xác theo nhịp sao thần nông.', '🚜', v_ch19_id, 2, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貿', 'ボウ', '', 'bou', 'MẬU', 'Mậu dịch, thương mại', 12, '卯 -> 貝', '日本と 諸外国の 貿易が さかんです。', 'Nihon to shogaikoku no boueki ga sakan desu.', 'Hoạt động ngoại thương mậu dịch giữa Nhật và các nước rất phát triển.', 'N3', 'Đổi vỏ sò buôn bán', 'Trao đổi tiền vỏ sò buôn bán hàng hóa qua lại.', '🚢', v_ch19_id, 3, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('商', 'ショウ', 'あきな・う', 'shou', 'THƯƠNG', 'Thương mại, buôn bán', 11, '亠 -> 丷 -> 冂 -> 口', '駅前の 商店街で 買い物を 楽しむ。', 'Ekimae no shoutengai de kaimono o tanoshimu.', 'Thỏa sức mua sắm tại con phố thương mại sầm uất trước ga.', 'N3', 'Mở hàng buôn bán', 'Dưới mái hiên mở cửa hiệu đon đả bán hàng.', '🏪', v_ch19_id, 4, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('機', 'キ', 'はた', 'ki', 'CƠ', 'Máy móc, cơ hội, phi cơ', 16, '木 -> 幾', '自動販売機で つめたい ジュースを 買う。', 'Jidouhanbaiki de tsumetai juusu o kau.', 'Mua nước trái cây mát lạnh ở máy bán hàng tự động.', 'N3', 'Cỗ máy dệt bằng gỗ', 'Khung gỗ tinh xảo cấu tạo nên cỗ máy dệt kỳ diệu.', '⚙️', v_ch19_id, 5, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('械', 'カイ', '', 'kai', 'GIỚI', 'Cơ khí, khí cụ', 11, '木 -> 戒', '工場の 精密な 機械を そうさします。', 'Koujou no seimitsu na kikai o sousashimasu.', 'Vận hành máy móc cơ khí chính xác trong nhà xưởng.', 'N3', 'Khung gỗ có rào phòng giới', 'Khung máy cơ khí được chế tạo rào chắn an toàn.', '🤖', v_ch19_id, 6, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('危', 'キ', 'あぶ・ない, あや・うい', 'abu', 'NGUY', 'Nguy hiểm, nguy cấp', 6, '⺈ -> 厄', '危険な 場所には 近づかないでください。', 'Kiken na basho ni wa chikazukanaide kudasai.', 'Xin đừng đến gần những khu vực nguy hiểm.', 'N3', 'Người đứng bờ vực nguy hiểm', 'Người đứng chênh vênh bên mép vách đá cheo leo.', '⚠️', v_ch19_id, 7, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('険', 'ケン', 'けわ・しい', 'kewa', 'HIỂM', 'Hiểm trở, thám hiểm, mạo hiểm', 11, '阝 -> 僉', '険しい 山道を 一歩一歩 登ります。', 'Kewashii yanamichi o ippoippo noborimasu.', 'Từng bước leo lên con đường núi hiểm trở.', 'N3', 'Vách đồi hiểm trở', 'Vách núi non trập trùng che chở hiểm địa vững chãi.', '🏔️', v_ch19_id, 8, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('技', 'ギ', 'わざ', 'waza', 'KỸ', 'Kỹ thuật, tài nghệ', 7, '扌 -> 支', '熟練の 職人が 技を ひろうします。', 'Jukuren no shokunin ga waza o hiroushimasu.', 'Người thợ lành nghề phô diễn kỹ nghệ điêu luyện.', 'N3', 'Bàn tay thể hiện kỹ năng', 'Bàn tay chống đỡ khéo léo phô diễn tuyệt kỹ.', '🛠️', v_ch19_id, 9, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('術', 'ジュツ', '', 'jutsu', 'THUẬT', 'Học thuật, nghệ thuật, kỹ thuật', 11, '行 -> 朮', '最新の 科学技術を 応用します。', 'Saishin no kagakugijutsu o ouyoushimasu.', 'Ứng dụng những công nghệ khoa học kỹ thuật tiên tiến nhất.', 'N3', 'Con đường học thuật', 'Bước đi trên đại lộ học thuật nghiên cứu công phu.', '🔬', v_ch19_id, 10, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('編', 'ヘン', 'あ・む', 'a', 'BIÊN', 'Đan xen, biên soạn', 15, '糸 -> 扁', '毛糸で あたたかい セーターを 編みました。', 'Keito de atatakai seetaa o amimashita.', 'Tôi đã dùng len đan một chiếc áo ấm.', 'N3', 'Sợi chỉ đan thành tấm', 'Dùng những sợi tơ đan cài ghép thành sách biên soạn.', '🧶', v_ch19_id, 11, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('綿', 'メン', 'わた', 'wata', 'MIÊN', 'Bông sợi, cotton', 14, '糸 -> 帛', '綿百パーセントの 肌着を 着ます。', 'Men hyakupaasento no hadagi o kimasu.', 'Mặc áo lót 100% sợi cotton mềm mại.', 'N3', 'Sợi tơ bông vải trắng', 'Sợi tơ tằm mềm xốp như bông gòn trắng muốt.', '☁️', v_ch19_id, 12, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('布', 'フ', 'ぬの', 'nuno', 'BỐ', 'Vải vóc, tuyên bố', 5, '𠂇 -> 巾', 'テーブルの上に きれいな 布を しきます。', 'Teeburu no ue ni kirei na nuno o shikimasu.', 'Trải tấm khăn vải tuyệt đẹp lên mặt bàn.', 'N3', 'Bàn tay giăng tấm vải', 'Bàn tay trải tấm vải vóc mềm mại phẳng phiu.', '🧣', v_ch19_id, 13, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('皮', 'ヒ', 'かわ', 'kawa', 'BÌ', 'Da thuộc, vỏ ngoài', 5, '皮', '本革の 丈夫な さいふを 愛用しています。', 'Hongawa no joubu na saifu o aiyoushiteimasu.', 'Tôi rất thích dùng chiếc ví da thật bền đẹp.', 'N3', 'Lột tấm da thú', 'Bàn tay khéo léo lột tấm da thú nguyên vẹn.', '👞', v_ch19_id, 14, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('貧', 'ヒン', 'まず・しい', 'mazu', 'BẦN', 'Nghèo khó, bần hàn', 11, '分 -> 貝', '貧しい 生活から 努力して 這い上がりました。', 'Mazushii seikatsu kara doryokushite haiagarimashita.', 'Nỗ lực vươn lên thoát khỏi cuộc sống nghèo khó.', 'N3', 'Chia nhỏ từng vỏ sò', 'Chia nhỏ từng đồng vỏ sò quý vì cảnh cơ hàn túng thiếu.', '🥣', v_ch19_id, 15, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('富', 'フ, フウ', 'と・む, とみ', 'to', 'PHÚ', 'Giàu có, phú quý', 12, '宀 -> 畐', '天然資源が 豊富に 埋蔵されています。', 'Tennen shigen ga houfu ni maizousareteimasu.', 'Tài nguyên thiên nhiên chôn giấu vô cùng phong phú.', 'N3', 'Nhà chứa đầy hũ bạc', 'Dưới mái nhà đầy ắp vò rượu lúa gạo sung túc phú quý.', '💎', v_ch19_id, 16, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('豊', 'ホウ', 'ゆた・か', 'yuta', 'PHONG', 'Phong phú, trù phú', 13, '曲 -> 豆', '緑 豊かな 自然に かこまれて くらす。', 'Midori yutaka na shizen ni kakomarete kurasu.', 'Sống chan hòa giữa thiên nhiên trù phú ngập tràn sắc xanh.', 'N3', 'Đĩa ngọc đầy ắp', 'Chiếc đĩa đầy ắp lễ vật cao quý biểu trưng sự trù phú.', '🌾', v_ch19_id, 17, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('等', 'トウ', 'ひと・しい', 'hito', 'ĐẲNG', 'Bình đẳng, vân vân', 12, '竹 -> 寺', '男女の 平等を 実現します。', 'Danjo no byoudou o jitsugyoushimasu.', 'Thực hiện sự bình đẳng giới giữa nam và nữ.', 'N3', 'Thẻ tre xếp đều ở chùa', 'Những thẻ tre quy định cắt đều tăm tắp bình đẳng.', '🟰', v_ch19_id, 18, '/assets/kanji/n3/illustrations/chap19_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('法', 'ホウ', '', 'hou', 'PHÁP', 'Pháp luật, phương pháp', 8, '氵 -> 去', '国の 法律を きちんと 守ります。', 'Kuni no houritsu o kichinto mamorimasu.', 'Nghiêm chỉnh tuân thủ hiến pháp và pháp luật đất nước.', 'N3', 'Nước chảy theo lẽ tự nhiên', 'Dòng nước trôi chảy theo quy luật tự nhiên bất biến.', '⚖️', v_ch20_id, 1, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('律', 'リツ', '', 'ritsu', 'LUẬT', 'Kỷ luật, quy luật, nhịp điệu', 9, '彳 -> 聿', '学校の 規律を 正しく たもちます。', 'Gakkou no kiritsu o tadashiku tamochimasu.', 'Giữ gìn nghiêm chỉnh nề nếp kỷ luật của nhà trường.', 'N3', 'Bước đi theo ngòi bút luật pháp', 'Bước chân tiến bước theo quy chuẩn ngòi bút điều lệ.', '📜', v_ch20_id, 2, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('規', 'キ', '', 'ki', 'QUY', 'Quy tắc, quy chuẩn, khuôn phép', 11, '夫 -> 見', '交通規則を 厳格に 守りましょう。', 'Koutsuukisoku o genkaku ni mamorimashou.', 'Hãy chấp hành nghiêm chỉnh luật lệ an toàn giao thông.', 'N3', 'Người nhìn bằng compa', 'Người cầm compa mở mắt quan sát đo đạc quy chuẩn.', '📐', v_ch20_id, 3, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('則', 'ソク', '', 'soku', 'TẮC', 'Nguyên tắc, quy tắc', 9, '貝 -> 刂', '基本原則に のっとって 処理します。', 'Kihongensoku ni nottotte shorishimasu.', 'Xử lý công việc căn cứ theo đúng nguyên tắc cơ bản.', 'N3', 'Dùng dao khắc luật lên vỏ sò', 'Dùng dao khắc quy tắc chuẩn mực lên đồng tiền vỏ sò.', '📏', v_ch20_id, 4, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('禁', 'キン', '', 'kin', 'CẤM', 'Cấm đoán, nghiêm cấm', 13, '林 -> 示', 'この 場所での 喫煙は 禁止されています。', 'Kono basho de no kitsuyen wa kinshisareteimasu.', 'Hút thuốc bị nghiêm cấm hoàn toàn tại khu vực này.', 'N3', 'Thần cấm xâm phạm khu rừng thiêng', 'Bàn thờ thần linh cấm đoán không ai được chặt phá rừng thiêng.', '🚫', v_ch20_id, 5, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('許', 'キョ', 'ゆる・す', 'yuru', 'HỨA', 'Cho phép, tha thứ', 11, '言 -> 午', '親から 一人暮らしの 許可を もらいました。', 'Oya kara hitorigurashi no kyoka o moraimashita.', 'Được bố mẹ cho phép dọn ra sống tự lập một mình.', 'N3', 'Lời hứa đúng giờ', 'Dùng lời lẽ ưng thuận cho phép đúng hẹn.', '🔓', v_ch20_id, 6, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('件', 'ケン', '', 'ken', 'KIỆN', 'Vụ việc, sự kiện, điều kiện', 6, '亻 -> 牛', '警察が 事件の そうさを 進めています。', 'Keisatsu ga jiken no sousa o susumeteimasu.', 'Cảnh sát đang tích cực điều tra vụ án.', 'N3', 'Người dắt con trâu làm việc', 'Mỗi con người gắn với một đầu việc cần giải quyết.', '📂', v_ch20_id, 7, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('犯', 'ハン', 'おか・す', 'oka', 'PHẠM', 'Phạm tội, phạm nhân, xâm phạm', 5, '犭 -> 㔾', '罪を 犯した 者は 法で さばかれます。', 'Tsumi o okashita mono wa hou de sabakaremasu.', 'Kẻ phạm tội sẽ bị luật pháp xét xử trừng trị.', 'N3', 'Chó quỳ phạm tội', 'Con thú hung hãn cúi đầu nhận tội khi bị bắt giữ.', '⛓️', v_ch20_id, 8, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('罪', 'ザイ', 'つみ', 'tsumi', 'TỘI', 'Tội ác, tội lỗi', 13, '罒 -> 非', '彼は 自分が おかした 罪を つぐないました。', 'Kare wa jibun ga okashita tsumi o tsugunaimashita.', 'Anh ấy đã chuộc lại lỗi lầm tội lỗi của mình.', 'N3', 'Lưới bắt kẻ làm điều sai trái', 'Chiếc lưới trời lồng lộng tóm gọn kẻ làm điều phi pháp sai trái.', '⚖️', v_ch20_id, 9, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('容', 'ヨウ', '', 'you', 'DUNG', 'Dung nạp, nội dung, dung mạo', 10, '宀 -> 谷', '手紙の 内容を しっかり 読みます。', 'Tegami no naiyou o shikkari yomimasu.', 'Đọc kỹ nội dung bức thư.', 'N3', 'Nhà chứa thung lũng dung nạp', 'Dưới mái nhà dung chứa cả thung lũng bao la rộng mở.', '📄', v_ch20_id, 10, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('疑', 'ギ', 'うたが・う', 'utaga', 'NGHI', 'Nghi ngờ, nghi vấn', 14, '匕 -> 矢 -> 疋', '彼の 言動に 疑問を 持ちました。', 'Kare no gendou ni gimon o mochimashita.', 'Tôi dấy lên nỗi băn khoăn nghi vấn trước hành động của anh ấy.', 'N3', 'Người dừng bước nghi ngờ nhìn mũi tên', 'Người chống gậy dừng bước băn khoăn nghi ngờ phương hướng.', '❓', v_ch20_id, 11, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('争', 'ソウ', 'あらそ・う', 'araso', 'TRANH', 'Tranh chấp, đấu tranh', 6, '𠂊 -> 尹', '遺産を めぐって 裁判で 争います。', 'Isan o megutte saiban de arasoimasu.', 'Tranh chấp phân xử tại tòa án về việc thừa kế tài sản.', 'N3', 'Hai tay giằng co chiếc cào', 'Hai bàn tay cùng giằng co chiếc cào tranh giành của cải.', '🥊', v_ch20_id, 12, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('敗', 'ハイ', 'やぶ・れる', 'yabu', 'BẠI', 'Thất bại, bại trận', 11, '貝 -> 攵', '選挙で 惜しくも 敗北しました。', 'Senkyo de oshikumo haibokushimashita.', 'Thật tiếc khi đã chiến bại trong cuộc bầu cử.', 'N3', 'Đập vỡ vỏ sò tiền bạc', 'Chiếc gậy đập vỡ vụn đồng tiền vỏ sò chuốc lấy bại trận.', '🏳️', v_ch20_id, 13, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('兵', 'ヘイ', '', 'hei', 'BINH', 'Binh lính, quân đội', 7, '丘 -> 八', '平和のために 兵器を はいぜつします。', 'Heiwa no tame ni heiki o haizetsushimasu.', 'Triệt tiêu vũ khí quân sự vì nền hòa bình thế giới.', 'N3', 'Binh sĩ cầm búa rìu', 'Binh lính hai tay nắm chắc búa rìu bảo vệ non sông.', '🪖', v_ch20_id, 14, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('軍', 'グン', '', 'gun', 'QUÂN', 'Quân đội, chiến dịch', 9, '冖 -> 車', '国境を 守る 国連軍の 部隊です。', 'Kokkyou o mamoru kokurengun no butai desu.', 'Lực lượng quân đội Liên Hợp Quốc gìn giữ biên cương.', 'N3', 'Xe chiến trong doanh trại', 'Những cỗ chiến xa tập kết trong doanh trại quân đội sẵn sàng xuất kích.', '🎖️', v_ch20_id, 15, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('役', 'ヤク, エキ', '', 'yaku', 'DỊCH', 'Chức vụ, vai trò, phục dịch', 7, '彳 -> 殳', '社会の 役に立つ 人間に なりたいです。', 'Shakai no yaku ni tatsu ningen ni naritai desu.', 'Tôi muốn trở thành người có ích đóng góp cho xã hội.', 'N3', 'Bước chân cầm gậy đi làm phận sự', 'Bước chân cầm gậy đi thi hành nhiệm vụ phục vụ cộng đồng.', '🎭', v_ch20_id, 16, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES
    ('臣', 'シン', '', 'shin', 'THẦN', 'Quan đại thần, bầy tôi', 7, '臣', '首相が 新しい 大臣を 任命しました。', 'Shushou ga atarashii daijin o ninmeishimashita.', 'Thủ tướng đã bổ nhiệm bộ trưởng quan đại thần mới.', 'N3', 'Mắt quan cúi chào vua', 'Đôi mắt mở to của vị đại thần trung kiên cúi chào bệ kiến thiên tử.', '👑', v_ch20_id, 17, '/assets/kanji/n3/illustrations/chap20_intro.webp', NOW())
    ON CONFLICT (character) DO UPDATE SET
        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,
        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,
        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,
        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N3', mnemonic_title = EXCLUDED.mnemonic_title,
        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,
        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;
END $$;

-- 3. SEED KANJI CHAPTER VOCABULARY
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '早起き', 'はやおき', 'hayaoki', 'Dậy sớm', 'Waking up early', 1, NOW()),
        (v_ch_id, '寝室', 'しんしつ', 'shinshitsu', 'Phòng ngủ', 'Bedroom', 2, NOW()),
        (v_ch_id, '浴室', 'よくしつ', 'yokushitsu', 'Phòng tắm', 'Bathroom', 3, NOW()),
        (v_ch_id, '熱湯', 'ねっとう', 'nettou', 'Nước sôi', 'Boiling water', 4, NOW()),
        (v_ch_id, '洗濯物', 'せんたくもの', 'sentakumono', 'Quần áo giặt', 'Laundry', 5, NOW()),
        (v_ch_id, '生活', 'せいかつ', 'seikatsu', 'Đời sống, sinh hoạt', 'Life, living', 6, NOW()),
        (v_ch_id, '燃えるゴミ', 'もえるごみ', 'moerugomi', 'Rác cháy được', 'Burnable trash', 7, NOW()),
        (v_ch_id, 'ゴミ袋', 'ごみぶくろ', 'gomibukuro', 'Túi rác', 'Trash bag', 8, NOW()),
        (v_ch_id, '週末', 'しゅうまつ', 'shuumatsu', 'Cuối tuần', 'Weekend', 9, NOW()),
        (v_ch_id, '翌日', 'よくじつ', 'yokujitsu', 'Ngày hôm sau', 'Next day', 10, NOW()),
        (v_ch_id, '予定', 'よてい', 'yotei', 'Kế hoạch, dự định', 'Schedule, plan', 11, NOW()),
        (v_ch_id, '用事', 'ようじ', 'youji', 'Công chuyện, việc bận', 'Business, errands', 12, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '押入れ', 'おしいれ', 'oshiire', 'Tủ âm tường', 'Closet', 1, NOW()),
        (v_ch_id, '引き出し', 'ひきだし', 'hikidashi', 'Ngăn kéo', 'Drawer', 2, NOW()),
        (v_ch_id, '消火器', 'しょうかき', 'shoukaki', 'Bình chữa cháy', 'Fire extinguisher', 3, NOW()),
        (v_ch_id, '階段', 'かいだん', 'kaidan', 'Cầu thang', 'Stairs', 4, NOW()),
        (v_ch_id, '植物', 'しょくぶつ', 'shokubutsu', 'Thực vật, cây cỏ', 'Plant', 5, NOW()),
        (v_ch_id, '木の実', 'きのみ', 'kinomi', 'Quả hạch, trái cây', 'Tree fruit, nut', 6, NOW()),
        (v_ch_id, '建築', 'けんちく', 'kenchiku', 'Kiến trúc, xây dựng', 'Architecture', 7, NOW()),
        (v_ch_id, '構造', 'こうぞう', 'kouzou', 'Kết cấu, cấu trúc', 'Structure', 8, NOW()),
        (v_ch_id, '設計', 'せっけい', 'sekkei', 'Thiết kế', 'Design, blueprint', 9, NOW()),
        (v_ch_id, '倉庫', 'そうこ', 'souko', 'Nhà kho', 'Warehouse', 10, NOW()),
        (v_ch_id, '南向き', 'みなみむき', 'minamimuki', 'Hướng về phía Nam', 'South-facing', 11, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '温度', 'おんど', 'ondo', 'Nhiệt độ', 'Temperature', 1, NOW()),
        (v_ch_id, '材料', 'ざいりょう', 'zairyou', 'Nguyên liệu', 'Ingredients, materials', 2, NOW()),
        (v_ch_id, '焼き魚', 'やきざかな', 'yakizakana', 'Cá nướng', 'Grilled fish', 3, NOW()),
        (v_ch_id, '食器', 'しょっき', 'shokki', 'Bát đĩa, đồ ăn', 'Tableware', 4, NOW()),
        (v_ch_id, '卵黄', 'らんおう', 'ran-ou', 'Lòng đỏ trứng', 'Egg yolk', 5, NOW()),
        (v_ch_id, '牛乳', 'ぎゅうにゅう', 'gyuunyuu', 'Sữa bò', 'Milk', 6, NOW()),
        (v_ch_id, '小麦粉', 'こむぎこ', 'komugiko', 'Bột mì', 'Wheat flour', 7, NOW()),
        (v_ch_id, '缶詰', 'かんづめ', 'kanzume', 'Đồ hộp', 'Canned food', 8, NOW()),
        (v_ch_id, '一杯', 'いっぱい', 'ippai', 'Một cốc, tràn đầy', 'One cup, full', 9, NOW()),
        (v_ch_id, '分量', 'ぶんりょう', 'bunryou', 'Định lượng, số lượng', 'Quantity, amount', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '頭痛', 'ずつう', 'zutsuu', 'Đau đầu', 'Headache', 1, NOW()),
        (v_ch_id, '手首', 'てくび', 'tekubi', 'Cổ tay', 'Wrist', 2, NOW()),
        (v_ch_id, '呼吸', 'こきゅう', 'kokyuu', 'Hô hấp, thở', 'Breathing', 3, NOW()),
        (v_ch_id, '健康診断', 'けんこうしんだん', 'kenkoushindan', 'Khám sức khỏe', 'Health checkup', 4, NOW()),
        (v_ch_id, '歯科', 'しか', 'shika', 'Nha khoa', 'Dentistry', 5, NOW()),
        (v_ch_id, '血液', 'けつえき', 'ketsueki', 'Máu, huyết dịch', 'Blood', 6, NOW()),
        (v_ch_id, '包帯', 'ほうたい', 'houtai', 'Băng gạc y tế', 'Bandage', 7, NOW()),
        (v_ch_id, '救急車', 'きゅうきゅうしゃ', 'kyuukyuusha', 'Xe cứu thương', 'Ambulance', 8, NOW()),
        (v_ch_id, '助ける', 'たすける', 'tasukeru', 'Giúp đỡ, cứu mạng', 'Rescue, help', 9, NOW()),
        (v_ch_id, '死亡', 'しぼう', 'shibou', 'Tử vong, qua đời', 'Death, decease', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '勝負', 'しょうぶ', 'shoubu', 'Cuộc đọ sức, thắng bại', 'Match, contest', 1, NOW()),
        (v_ch_id, '日本代表', 'にほんだいひょう', 'nihondaihyou', 'Đại diện Nhật Bản', 'Japan representative', 2, NOW()),
        (v_ch_id, '記録', 'きろく', 'kiroku', 'Kỷ lục, ghi chép', 'Record', 3, NOW()),
        (v_ch_id, '優勝', 'ゆうしょう', 'yuushou', 'Vô địch, giải nhất', 'Championship', 4, NOW()),
        (v_ch_id, '秒速', 'びょうそく', 'byousoku', 'Tốc độ trên giây', 'Speed per second', 5, NOW()),
        (v_ch_id, '順番', 'じゅんばん', 'junban', 'Thứ tự, lần lượt', 'Turn, order', 6, NOW()),
        (v_ch_id, '野球', 'やきゅう', 'yakyuu', 'Bóng chày', 'Baseball', 7, NOW()),
        (v_ch_id, '打者', 'だしゃ', 'dasha', 'Người đánh bóng', 'Batter', 8, NOW()),
        (v_ch_id, '投手', 'とうしゅ', 'toushu', 'Người ném bóng', 'Pitcher', 9, NOW()),
        (v_ch_id, '得点', 'とくてん', 'tokuten', 'Điểm số ghi được', 'Scored points', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '感情', 'かんじょう', 'kanjou', 'Tình cảm, cảm xúc', 'Emotion, feeling', 1, NOW()),
        (v_ch_id, '恋愛', 'れんあい', 'ren-ai', 'Tình yêu đôi lứa', 'Love, romance', 2, NOW()),
        (v_ch_id, '信用', 'しんよう', 'shin-you', 'Tín nhiệm, tin cậy', 'Confidence, trust', 3, NOW()),
        (v_ch_id, '苦悩', 'くのう', 'kunou', 'Nỗi đau khổ phiền muộn', 'Suffering, distress', 4, NOW()),
        (v_ch_id, '困難', 'こんなん', 'konnan', 'Khó khăn, gian khổ', 'Difficulty, hardship', 5, NOW()),
        (v_ch_id, '怒り', 'いかり', 'ikari', 'Cơn giận dữ', 'Anger, rage', 6, NOW()),
        (v_ch_id, '笑顔', 'えがお', 'egao', 'Nụ cười tươi', 'Smiling face', 7, NOW()),
        (v_ch_id, '残念', 'ざんねん', 'zannen', 'Đáng tiếc, tiếc nuối', 'Regrettable, pity', 8, NOW()),
        (v_ch_id, '涙', 'なみだ', 'namida', 'Nước mắt', 'Tears', 9, NOW()),
        (v_ch_id, '大喜び', 'おおよろこび', 'ooyorokobi', 'Vô cùng vui sướng', 'Great joy', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '結婚式', 'けっこんしき', 'kekkonshiki', 'Lễ cưới, hôn lễ', 'Wedding ceremony', 1, NOW()),
        (v_ch_id, '自己紹介', 'じこしょうかい', 'jikoshoukai', 'Tự giới thiệu bản thân', 'Self-introduction', 2, NOW()),
        (v_ch_id, '独身', 'どくしん', 'dokushin', 'Độc thân', 'Single, unmarried', 3, NOW()),
        (v_ch_id, '貯金', 'ちょきん', 'chokin', 'Tiết kiệm tiền', 'Savings', 4, NOW()),
        (v_ch_id, '約束', 'やくそく', 'yakusoku', 'Lời hứa, hẹn ước', 'Promise, appointment', 5, NOW()),
        (v_ch_id, '守る', 'まもる', 'mamoru', 'Bảo vệ, giữ lời', 'Protect, keep', 6, NOW()),
        (v_ch_id, '行列', 'ぎょうれつ', 'gyouretsu', 'Hàng người xếp nối tiếp', 'Queue, procession', 7, NOW()),
        (v_ch_id, 'お祝い', 'おいわい', 'oiwai', 'Chúc mừng, quà mừng', 'Celebration, congratulation', 8, NOW()),
        (v_ch_id, '永遠', 'えいえん', 'eien', 'Vĩnh cửu, mãi mãi', 'Eternity, forever', 9, NOW()),
        (v_ch_id, '幸福', 'こうふく', 'koufuku', 'Hạnh phúc', 'Happiness, bliss', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '人間関係', 'にんげんかんけい', 'ningenkankei', 'Quan hệ giữa con người', 'Human relations', 1, NOW()),
        (v_ch_id, '娘', 'むすめ', 'musume', 'Con gái ruột', 'Daughter', 2, NOW()),
        (v_ch_id, '老人', 'ろうじん', 'roujin', 'Người cao tuổi', 'Elderly person', 3, NOW()),
        (v_ch_id, '婦人', 'ふじん', 'fujin', 'Phụ nữ, quý bà', 'Woman, lady', 4, NOW()),
        (v_ch_id, '姓名', 'せいめい', 'seimei', 'Họ và tên', 'Full name', 5, NOW()),
        (v_ch_id, '仲良し', 'なかよし', 'nakayoshi', 'Bạn thân thiết', 'Close friend', 6, NOW()),
        (v_ch_id, '彼女', 'かのじょ', 'kanojo', 'Cô ấy, bạn gái', 'She, girlfriend', 7, NOW()),
        (v_ch_id, '久しぶり', 'ひさしぶり', 'hisashiburi', 'Lâu ngày không gặp', 'Long time no see', 8, NOW()),
        (v_ch_id, '友達', 'ともだち', 'tomodachi', 'Bạn bè', 'Friends', 9, NOW()),
        (v_ch_id, '個性', 'こせい', 'kosei', 'Cá tính, nét riêng', 'Individuality', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '単純', 'たんじゅん', 'tanjun', 'Đơn giản', 'Simple, uncomplicated', 1, NOW()),
        (v_ch_id, '複雑', 'ふくざつ', 'fukuzatsu', 'Phức tạp', 'Complex, complicated', 2, NOW()),
        (v_ch_id, '全体', 'ぜんたい', 'zentai', 'Toàn thể, toàn bộ', 'Entirety, whole', 3, NOW()),
        (v_ch_id, '以上', 'いじょう', 'ijou', 'Trở lên, vượt quá', 'More than, and above', 4, NOW()),
        (v_ch_id, '未満', 'みまん', 'miman', 'Chưa đầy, dưới mức', 'Less than, under', 5, NOW()),
        (v_ch_id, '満員', 'まんいん', 'man-in', 'Đầy chỗ, hết chỗ', 'Full house, crowded', 6, NOW()),
        (v_ch_id, '無理', 'むり', 'muri', 'Vô lý, quá sức', 'Impossible, unreasonable', 7, NOW()),
        (v_ch_id, '非常識', 'ひじょうしき', 'hijoushiki', 'Thiếu ý thức, phi lý', 'Lack of common sense', 8, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '幼児', 'ようじ', 'youji', 'Trẻ mầm non', 'Toddler, infant', 1, NOW()),
        (v_ch_id, '児童', 'じどう', 'jidou', 'Nhi đồng, trẻ em', 'Children, juvenile', 2, NOW()),
        (v_ch_id, '生徒', 'せいと', 'seito', 'Học sinh cấp 2-3', 'Student, pupil', 3, NOW()),
        (v_ch_id, '担任', 'たんにん', 'tannin', 'Chủ nhiệm lớp', 'Homeroom teacher', 4, NOW()),
        (v_ch_id, '教師', 'きょうし', 'kyoushi', 'Giáo viên, giảng viên', 'Teacher, instructor', 5, NOW()),
        (v_ch_id, '黒板', 'こくばん', 'kokuban', 'Bảng đen', 'Blackboard', 6, NOW()),
        (v_ch_id, '筆記試験', 'ひっきしけん', 'hikkishiken', 'Thi viết', 'Written examination', 7, NOW()),
        (v_ch_id, '貸し出し', 'かしだし', 'kashidashi', 'Cho mượn (sách)', 'Lending, checkout', 8, NOW()),
        (v_ch_id, '返却', 'へんきゃく', 'henkyaku', 'Trả lại đồ/sách', 'Return of something', 9, NOW()),
        (v_ch_id, '文房具', 'ぶんぼうぐ', 'bunbougu', 'Văn phòng phẩm', 'Stationery', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '希望', 'きぼう', 'kibou', 'Hy vọng, ước vọng', 'Hope, wish', 1, NOW()),
        (v_ch_id, '夢', 'ゆめ', 'yume', 'Giấc mơ, ước mơ', 'Dream', 2, NOW()),
        (v_ch_id, '可能性', 'かのうせい', 'kanousei', 'Khả năng, tiềm năng', 'Possibility', 3, NOW()),
        (v_ch_id, '調査', 'ちょうさ', 'chousa', 'Điều tra, khảo sát', 'Investigation, survey', 4, NOW()),
        (v_ch_id, '面接', 'めんせつ', 'mensetsu', 'Phỏng vấn', 'Interview', 5, NOW()),
        (v_ch_id, '合格', 'ごうかく', 'goukaku', 'Thi đỗ, đạt chuẩn', 'Passing an exam', 6, NOW()),
        (v_ch_id, '落第', 'らくだい', 'rakudai', 'Thi trượt, đúp lớp', 'Failing an exam', 7, NOW()),
        (v_ch_id, '倍率', 'ばいりつ', 'bairitsu', 'Tỷ lệ chọi', 'Competition ratio', 8, NOW()),
        (v_ch_id, '平均点', 'へいきんてん', 'heikinten', 'Điểm trung bình', 'Average mark', 9, NOW()),
        (v_ch_id, '成績', 'せいせき', 'seiseki', 'Thành tích, kết quả', 'Grades, performance', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '授業', 'じゅぎょう', 'jugyou', 'Tiết học, giờ học', 'Class, lesson', 1, NOW()),
        (v_ch_id, '卒業', 'そつぎょう', 'sotsugyou', 'Tốt nghiệp', 'Graduation', 2, NOW()),
        (v_ch_id, '欠席', 'けっせき', 'kesseki', 'Vắng mặt, nghỉ học', 'Absence', 3, NOW()),
        (v_ch_id, '理由', 'りゆう', 'riyuu', 'Lý do', 'Reason', 4, NOW()),
        (v_ch_id, '解説', 'かいせつ', 'kaisetsu', 'Giải thích, bình luận', 'Explanation, commentary', 5, NOW()),
        (v_ch_id, '暗記', 'あんき', 'anki', 'Học thuộc lòng', 'Memorization', 6, NOW()),
        (v_ch_id, '努力', 'どりょく', 'doryoku', 'Nỗ lực rèn luyện', 'Effort, endeavor', 7, NOW()),
        (v_ch_id, '継続', 'けいぞく', 'keizoku', 'Tiếp tục, duy trì', 'Continuation', 8, NOW()),
        (v_ch_id, '復習', 'ふくしゅう', 'fukushuu', 'Ôn tập bài cũ', 'Review', 9, NOW()),
        (v_ch_id, '効果', 'こうか', 'kouka', 'Hiệu quả', 'Effect, result', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '種類', 'しゅるい', 'shurui', 'Chủng loại, các loại', 'Kind, variety', 1, NOW()),
        (v_ch_id, '存在', 'そんざい', 'sonzai', 'Tồn tại', 'Existence', 2, NOW()),
        (v_ch_id, '太陽', 'たいよう', 'taiyou', 'Mặt trời', 'Sun', 3, NOW()),
        (v_ch_id, '巨大', 'きょだい', 'kyodai', 'Khổng lồ', 'Huge, gigantic', 4, NOW()),
        (v_ch_id, '氷河', 'ひょうが', 'hyouga', 'Sông băng', 'Glacier', 5, NOW()),
        (v_ch_id, '気候', 'きこう', 'kikou', 'Khí hậu', 'Climate', 6, NOW()),
        (v_ch_id, '暖流', 'だんりゅう', 'danryuu', 'Dòng hải lưu ấm', 'Warm ocean current', 7, NOW()),
        (v_ch_id, '海底', 'かいてい', 'kaitei', 'Đáy biển', 'Seabed', 8, NOW()),
        (v_ch_id, '陸地', 'りくち', 'rikuchi', 'Đất liền', 'Land', 9, NOW()),
        (v_ch_id, '海岸', 'かいがん', 'kaigan', 'Bờ biển', 'Coast, beach', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '準備', 'じゅんび', 'junbi', 'Chuẩn bị', 'Preparation', 1, NOW()),
        (v_ch_id, '歓迎', 'かんげい', 'kangei', 'Hoan nghênh, đón tiếp', 'Welcome', 2, NOW()),
        (v_ch_id, '飛行機', 'ひこうき', 'hikouki', 'Máy bay', 'Airplane', 3, NOW()),
        (v_ch_id, '移動', 'いどう', 'idou', 'Di chuyển', 'Movement, transit', 4, NOW()),
        (v_ch_id, '宿泊', 'しゅくはく', 'shukuhaku', 'Trọ lại, lưu trú', 'Lodging, staying', 5, NOW()),
        (v_ch_id, '日程', 'にってい', 'nittei', 'Lịch trình tour', 'Schedule, itinerary', 6, NOW()),
        (v_ch_id, '欧州', 'おうしゅう', 'oushuu', 'Châu Âu', 'Europe', 7, NOW()),
        (v_ch_id, '観光客', 'かんこうきゃく', 'kankoukyaku', 'Khách du lịch', 'Tourist', 8, NOW()),
        (v_ch_id, '神社', 'じんじゃ', 'jinja', 'Đền thờ Thần đạo', 'Shinto shrine', 9, NOW()),
        (v_ch_id, '祭り', 'まつり', 'matsuri', 'Lễ hội dân gian', 'Festival', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '交差点', 'こうさてん', 'kousaten', 'Ngã tư giao lộ', 'Intersection', 1, NOW()),
        (v_ch_id, '曲がる', 'まがる', 'magaru', 'Rẽ, uốn cong', 'Turn, bend', 2, NOW()),
        (v_ch_id, '追突', 'ついとつ', 'tsuitotsu', 'Tông xe từ phía sau', 'Rear-end collision', 3, NOW()),
        (v_ch_id, '転倒', 'てんとう', 'tentou', 'Té ngã, lật nhào', 'Fall down, overturn', 4, NOW()),
        (v_ch_id, '位置', 'いち', 'ichi', 'Vị trí', 'Position, location', 5, NOW()),
        (v_ch_id, '中央', 'ちゅうおう', 'chuuou', 'Trung tâm', 'Center, central', 6, NOW()),
        (v_ch_id, '直線', 'ちょくせん', 'chokusen', 'Đường thẳng', 'Straight line', 7, NOW()),
        (v_ch_id, '逆走', 'ぎゃくそう', 'gyakusou', 'Chạy ngược chiều', 'Driving the wrong way', 8, NOW()),
        (v_ch_id, '注意', 'ちゅうい', 'chuui', 'Chú ý, cẩn thận', 'Attention, caution', 9, NOW()),
        (v_ch_id, '歩道橋', 'ほどうきょう', 'hodoukyou', 'Cầu vượt cho người đi bộ', 'Pedestrian overpass', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '求職', 'きゅうしょく', 'kyuushoku', 'Tìm kiếm việc làm', 'Job hunting', 1, NOW()),
        (v_ch_id, '常識', 'じょうしき', 'joushiki', 'Thường thức, kiến thức thông thường', 'Common sense', 2, NOW()),
        (v_ch_id, '失礼', 'しつれい', 'shitsurei', 'Thất lễ, khiếm nhã', 'Impolite, rude', 3, NOW()),
        (v_ch_id, '労働', 'ろうどう', 'roudou', 'Lao động làm việc', 'Labor, work', 4, NOW()),
        (v_ch_id, '職員', 'しょくいん', 'shokuin', 'Nhân viên cơ quan', 'Staff member', 5, NOW()),
        (v_ch_id, '辞職', 'じしょく', 'jishoku', 'Từ chức', 'Resignation', 6, NOW()),
        (v_ch_id, '退職', 'たいしょく', 'taishoku', 'Nghỉ hưu, thôi việc', 'Retirement', 7, NOW()),
        (v_ch_id, '給与', 'きゅうよ', 'kyuuyo', 'Tiền lương', 'Salary, pay', 8, NOW()),
        (v_ch_id, '収入', 'しゅうにゅう', 'shuunyuu', 'Thu nhập', 'Income', 9, NOW()),
        (v_ch_id, '支出', 'ししゅつ', 'shishutsu', 'Chi phí, chi tiêu', 'Expenditure', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '会議', 'かいぎ', 'kaigi', 'Hội nghị, cuộc họp', 'Meeting, conference', 1, NOW()),
        (v_ch_id, '賛成', 'さんせい', 'sansei', 'Tán thành, đồng ý', 'Approval, agreement', 2, NOW()),
        (v_ch_id, '反対', 'はんたい', 'hantai', 'Phản đối', 'Opposition', 3, NOW()),
        (v_ch_id, '保留', 'ほりゅう', 'horyuu', 'Bảo lưu, hoãn lại', 'Reservation, suspension', 4, NOW()),
        (v_ch_id, '判断', 'はんだん', 'handan', 'Phán đoán, nhận định', 'Judgment, decision', 5, NOW()),
        (v_ch_id, '確認', 'かくにん', 'kakunin', 'Xác nhận, kiểm tra lại', 'Confirmation', 6, NOW()),
        (v_ch_id, '報告', 'ほうこく', 'houkoku', 'Báo cáo', 'Report', 7, NOW()),
        (v_ch_id, '連絡', 'れんらく', 'renraku', 'Liên lạc, thông báo', 'Contact, communication', 8, NOW()),
        (v_ch_id, '相談', 'そうだん', 'soudan', 'Bàn bạc, thảo luận', 'Consultation', 9, NOW()),
        (v_ch_id, '指示', 'しじ', 'shiji', 'Chỉ thị, hướng dẫn', 'Instruction, directive', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '最高', 'さいこう', 'saikou', 'Cao nhất, tuyệt nhất', 'Highest, best', 1, NOW()),
        (v_ch_id, '副社長', 'ふくしゃちょう', 'fukushachou', 'Phó giám đốc', 'Vice president', 2, NOW()),
        (v_ch_id, '管理職', 'かんりしょく', 'kanrishoku', 'Chức vị quản lý', 'Management position', 3, NOW()),
        (v_ch_id, '現在', 'げんざい', 'genzai', 'Hiện tại', 'Present time', 4, NOW()),
        (v_ch_id, '昔話', 'むかしばなし', 'mukashibanashi', 'Chuyện xưa, cổ tích', 'Folktale', 5, NOW()),
        (v_ch_id, '予算', 'よさん', 'yosan', 'Ngân sách, dự toán', 'Budget, estimate', 6, NOW()),
        (v_ch_id, '費用', 'ひよう', 'hiyou', 'Chi phí', 'Cost, expense', 7, NOW()),
        (v_ch_id, '税金', 'ぜいきん', 'zeikin', 'Thuế, tiền thuế', 'Tax', 8, NOW()),
        (v_ch_id, '一億円', 'いちおくえん', 'ichiokuen', 'Một trăm triệu yên', '100 million yen', 9, NOW()),
        (v_ch_id, '計算', 'けいさん', 'keisan', 'Tính toán', 'Calculation', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 19;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '産業', 'さんぎょう', 'sangyou', 'Ngành công nghiệp', 'Industry', 1, NOW()),
        (v_ch_id, '農業', 'のうぎょう', 'nougyou', 'Nông nghiệp', 'Agriculture', 2, NOW()),
        (v_ch_id, '貿易', 'ぼうえき', 'boueki', 'Thương mại ngoại thương', 'Foreign trade', 3, NOW()),
        (v_ch_id, '機械', 'きかい', 'kikai', 'Máy móc, cơ khí', 'Machine, machinery', 4, NOW()),
        (v_ch_id, '危険', 'きけん', 'kiken', 'Nguy hiểm', 'Danger, hazard', 5, NOW()),
        (v_ch_id, '技術', 'ぎじゅつ', 'gijutsu', 'Kỹ thuật, công nghệ', 'Technology, skill', 6, NOW()),
        (v_ch_id, '綿', 'めん', 'men', 'Bông, sợi cotton', 'Cotton', 7, NOW()),
        (v_ch_id, '布', 'ぬの', 'nuno', 'Vải vóc', 'Cloth, fabric', 8, NOW()),
        (v_ch_id, '貧富の差', 'ひんぷのさ', 'hinpunosa', 'Khoảng cách giàu nghèo', 'Gap between rich and poor', 9, NOW()),
        (v_ch_id, '豊富', 'ほうふ', 'houfu', 'Phong phú, dồi dào', 'Abundant, rich', 10, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 20;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES
        (v_ch_id, '法律', 'ほうりつ', 'houritsu', 'Pháp luật', 'Law, statute', 1, NOW()),
        (v_ch_id, '規則', 'きそく', 'kisoku', 'Quy tắc, nội quy', 'Rule, regulation', 2, NOW()),
        (v_ch_id, '禁止', 'きんし', 'kinshi', 'Cấm chỉ, nghiêm cấm', 'Prohibition, ban', 3, NOW()),
        (v_ch_id, '許可', 'きょか', 'kyoka', 'Cho phép, cấp phép', 'Permission, permit', 4, NOW()),
        (v_ch_id, '事件', 'じけん', 'jiken', 'Vụ án, sự kiện', 'Incident, case', 5, NOW()),
        (v_ch_id, '犯罪', 'はんざい', 'hanzai', 'Tội phạm, phạm tội', 'Crime, offense', 6, NOW()),
        (v_ch_id, '容疑者', 'ようぎしゃ', 'yougisha', 'Nghi phạm', 'Suspect', 7, NOW()),
        (v_ch_id, '戦争', 'せんそう', 'sensou', 'Chiến tranh', 'War', 8, NOW()),
        (v_ch_id, '兵士', 'へいし', 'heishi', 'Binh lính, quân nhân', 'Soldier', 9, NOW()),
        (v_ch_id, '大臣', 'だいじん', 'daijin', 'Bộ trưởng, quan đại thần', 'Cabinet minister', 10, NOW());
    END IF;
END $$;

-- 4. SEED KANJI EXERCISES (READING & WRITING)
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '天気がいいので、洗濯物をベランダに干しました。', '洗濯物', 'せんたくもの', '["せんたくもの", "あらいたくもの", "せんだくもの", "そうじもの"]', 'Chữ 洗 (TẨY) + 濯 (TRẠC) + 物 (VẬT) đọc là せんたくもの (quần áo giặt).', 1, NOW()),
        (v_ch_id, 'READING', 'この地域では、火曜日に燃えるゴミを出します。', '燃えるゴミ', 'もえるゴミ', '["もえるゴミ", "きえるゴミ", "ねるゴミ", "たけるゴミ"]', 'Động từ 燃える đọc là もえる (cháy được).', 2, NOW()),
        (v_ch_id, 'READING', '明日の午後、重要な予定が入っています。', '予定', 'よてい', '["よてい", "よち", "よじょう", "みてい"]', 'Chữ 予 (DỰ) + 定 (ĐỊNH) đọc là よてい (dự định, kế hoạch).', 3, NOW()),
        (v_ch_id, 'WRITING', 'こうえんで さいふを ひろいました。', 'ひろいました', '拾いました', '["拾いました", "捨ました", "探しました", "落としました"]', 'Nhặt lên là động từ 拾う (THẬP) -> 拾いました.', 4, NOW()),
        (v_ch_id, 'WRITING', 'かいぎの ようじで おおさかへ 行きます。', 'ようじ', '用事', '["用事", "要事", "用時", "予事"]', 'Công chuyện, việc bận là 用 (DỤNG) + 事 (SỰ) -> 用事.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', 'ドアの取っ手を押しても開きません。', '押して', 'おして', '["おして", "ひいて", "とって", "けして"]', 'Động từ 押す đọc là おす (ấn, đẩy).', 1, NOW()),
        (v_ch_id, 'READING', '駅の階段を急いで駆け上がりました。', '階段', 'かいだん', '["かいだん", "きざはし", "だんかい", "かいちょう"]', 'Chữ 階 (GIAI) + 段 (ĐOẠN) đọc là かいだん (cầu thang).', 2, NOW()),
        (v_ch_id, 'READING', '庭に新しい木を植えました。', '植えました', 'うえました', '["うえました", "たてました", "まきました", "とりました"]', 'Động từ 植える đọc là うえる (trồng cây).', 3, NOW()),
        (v_ch_id, 'WRITING', 'へやの まどを あけて かんきします。', 'まど', '窓', '["窓", "戸", "門", "扉"]', 'Cửa sổ là chữ 窓 (SONG).', 4, NOW()),
        (v_ch_id, 'WRITING', '新しい ビルの けんせつが はじまりました。', 'けんせつ', '建設', '["建設", "建築", "設計", "建物"]', 'Xây dựng, kiến thiết là 建 (KIẾN) + 設 (THIẾT) -> 建設.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', 'フライパンの温度が上がるまで待ちます。', '温度', 'おんど', '["おんど", "おんたく", "あつど", "ねつど"]', 'Chữ 温 (ÔN) + 度 (ĐỘ) đọc là おんど (nhiệt độ).', 1, NOW()),
        (v_ch_id, 'READING', 'ケーキの材料として小麦粉と卵を買いました。', '材料', 'ざいりょう', '["ざいりょう", "ざいりょ", "もくりょう", "さつりょう"]', 'Chữ 材 (TÀI) + 料 (LIỆU) đọc là ざいりょう (nguyên liệu).', 2, NOW()),
        (v_ch_id, 'READING', 'この料理には少量の塩を加えてください。', '少量', 'しょうりょう', '["しょうりょう", "すくりょう", "しょうりょ", "こりょう"]', 'Chữ 少 (THIỂU) + 量 (LƯỢNG) đọc là しょうりょう (lượng nhỏ).', 3, NOW()),
        (v_ch_id, 'WRITING', 'スープが さめないうちに めしあがってください。', 'さめない', '冷めない', '["冷めない", "温めない", "熱めない", "凍めない"]', 'Nguội đi là động từ 冷める (LÃNH) -> 冷めない.', 4, NOW()),
        (v_ch_id, 'WRITING', 'ぎゅうにゅうを コップに いっぱいのんだ。', 'ぎゅうにゅう', '牛乳', '["牛乳", "豆乳", "粉乳", "母乳"]', 'Sữa bò là 牛 (NGƯU) + 乳 (NHŨ) -> 牛乳.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '風邪を引いて激しい頭痛がします。', '頭痛', 'ずつう', '["ずつう", "とうつう", "あたまいた", "ずとう"]', 'Chữ 頭 (ĐẦU) + 痛 (THỐNG) đọc là ずつう (đau đầu).', 1, NOW()),
        (v_ch_id, 'READING', '深く息を吸って、ゆっくり吐いてください。', '吸って', 'すって', '["すって", "ふいて", "はいて", "よんで"]', 'Động từ 吸う đọc là すう (hít vào).', 2, NOW()),
        (v_ch_id, 'READING', '健康診断で血液の検査を受けました。', '検査', 'けんさ', '["けんさ", "けんざ", "しんさ", "けんちょう"]', 'Chữ 検 (KIỂM) + 査 (TRA) đọc là けんさ (kiểm tra, xét nghiệm).', 3, NOW()),
        (v_ch_id, 'WRITING', 'きゅうきゅうしゃを すぐに よんでください。', 'きゅうきゅうしゃ', '救急車', '["救急車", "急救車", "救援車", "救護車"]', 'Xe cứu thương cấp cứu là 救 (CỨU) + 急 (CẤP) + 車 (XA) -> 救急車.', 4, NOW()),
        (v_ch_id, 'WRITING', 'けがをした てに ほうたいを まきました。', 'ほうたい', '包帯', '["包帯", "包布", "布帯", "帯包"]', 'Băng gạc vết thương là 包 (BAO) + 帯 (ĐỚI) -> 包帯.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '決勝戦でライバルに勝ちました。', '勝負', 'しょうぶ', '["しょうぶ", "かちまけ", "しょうふ", "せいふ"]', 'Chữ 勝 (THẮNG) + 負 (PHỤ) đọc là しょうぶ (thắng bại, trận đấu).', 1, NOW()),
        (v_ch_id, 'READING', '大会で素晴らしい新記録を達成しました。', '記録', 'きろく', '["きろく", "きりょく", "しるく", "きほう"]', 'Chữ 記 (KÝ) + 録 (LỤC) đọc là きろく (kỷ lục, ghi chép).', 2, NOW()),
        (v_ch_id, 'READING', 'サッカー日本代表のメンバーが発表された。', '代表', 'だいひょう', '["だいひょう", "たいひょう", "だいおもて", "だいわ"]', 'Chữ 代 (ĐẠI) + 表 (BIỂU) đọc là だいひょう (đại diện).', 3, NOW()),
        (v_ch_id, 'WRITING', 'ぜんこくたいかいで みごと ゆうしょうした。', 'ゆうしょう', '優勝', '["優勝", "優賞", "優勝者", "勝賞"]', 'Vô địch, giải nhất là 優 (ƯU) + 勝 (THẮNG) -> 優勝.', 4, NOW()),
        (v_ch_id, 'WRITING', 'ピッチャーが すばらしい たまを なげた。', 'なげた', '投げた', '["投げた", "打った", "蹴った", "取った"]', 'Ném bóng là động từ 投げる (ĐẦU) -> 投げた.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '相手の気持ちに深く同情しました。', '同情', 'どうじょう', '["どうじょう", "どうせい", "どうこころ", "おなじじょう"]', 'Chữ 同 (ĐỒNG) + 情 (TÌNH) đọc là どうじょう (đồng cảm, trắc ẩn).', 1, NOW()),
        (v_ch_id, 'READING', '試合に負けて本当に残念です。', '残念', 'ざんねん', '["ざんねん", "のこりねん", "さんねん", "ざんしん"]', 'Chữ 残 (TÀN) + 念 (NIỆM) đọc là ざんねん (tiếc nuối).', 2, NOW()),
        (v_ch_id, 'READING', '彼女の優しい言葉に涙が出ました。', '涙', 'なみだ', '["なみだ", "あせ", "ち", "つゆ"]', 'Chữ 涙 (LỆ) đọc Kun là なみだ (nước mắt).', 3, NOW()),
        (v_ch_id, 'WRITING', 'かれの ことばを こころから しんじています。', 'しんじて', '信じて', '["信じて", "想じて", "願じて", "念じて"]', 'Tin tưởng là động từ 信じる (TÍN) -> 信じて.', 4, NOW()),
        (v_ch_id, 'WRITING', 'しんろのことで ふかく なやんでいます。', 'なやんで', '悩んで', '["悩んで", "苦んで", "困んで", "悲んで"]', 'Trăn trở, phiền não là động từ 悩む (NÃO) -> 悩んで.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '友人の結婚式に出席しました。', '結婚式', 'けっこんしき', '["けっこんしき", "けつこんしき", "むすびしき", "けっこんほう"]', 'Chữ 結 (KẾT) + 婚 (HÔN) + 式 (THỨC) đọc là けっこんしき.', 1, NOW()),
        (v_ch_id, 'READING', '将来のために毎月貯金をしています。', '貯金', 'ちょきん', '["ちょきん", "たくがね", "ちょかね", "たまりきん"]', 'Chữ 貯 (TRỮ) + 金 (KIM) đọc là ちょきん (tiết kiệm tiền).', 2, NOW()),
        (v_ch_id, 'READING', '友人と交わした約束を必ず守ります。', '約束', 'やくそく', '["やくそく", "やくたば", "やくそん", "やくぞく"]', 'Chữ 約 (ƯỚC) + 束 (THÚC) đọc là やくそく (lời hứa).', 3, NOW()),
        (v_ch_id, 'WRITING', 'ともだちの しょうかいで かれに であいました。', 'しょうかい', '紹介', '["紹介", "招待", "案内", "介添"]', 'Giới thiệu là 紹 (THIỆU) + 介 (GIỚI) -> 紹介.', 4, NOW()),
        (v_ch_id, 'WRITING', 'ふたりの すえながい こうふくを いのります。', 'こうふく', '幸福', '["幸福", "幸運", "祝福", "祝福"]', 'Hạnh phúc là 幸 (HẠNH) + 福 (PHÚC) -> 幸福.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '事件に関係する書類を集めています。', '関係', 'かんけい', '["かんけい", "かんかかり", "せきけい", "かんしょう"]', 'Chữ 関 (QUAN) + 係 (HỆ) đọc là かんけい (quan hệ, liên quan).', 1, NOW()),
        (v_ch_id, 'READING', '山田さんには高校生の娘さんがいます。', '娘', 'むすめ', '["むすめ", "むすこ", "おんなのこ", "あね"]', 'Chữ 娘 (NƯƠNG) đọc Kun là むすめ (con gái ruột).', 2, NOW()),
        (v_ch_id, 'READING', '書類に姓名を記入してください。', '姓名', 'せいめい', '["せいめい", "しょうめい", "なまえ", "かばねな"]', 'Chữ 姓 (TÍNH) + 名 (DANH) đọc là せいめい (họ tên).', 3, NOW()),
        (v_ch_id, 'WRITING', 'クラスの なかよし グループで りょこうした。', 'なかよし', '仲良し', '["仲良し", "友良し", "親良し", "人良し"]', 'Thân thiết, chơi thân là 仲 (TRỌNG) + 良 (LƯƠNG) -> 仲良し.', 4, NOW()),
        (v_ch_id, 'WRITING', 'ひさしぶりに ふるさとの ともだちに あった。', 'ひさしぶり', '久しぶり', '["久しぶり", "再しぶり", "初しぶり", "旧しぶり"]', 'Lâu ngày không gặp là 久 (CỬU) -> 久しぶり.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', 'この問題は単純に見えて実は複雑です。', '単純', 'たんじゅん', '["たんじゅん", "ひとじゅん", "たんすい", "だんじゅん"]', 'Chữ 単 (ĐƠN) + 純 (THUẦN) đọc là たんじゅん (đơn thuần, đơn giản).', 1, NOW()),
        (v_ch_id, 'READING', '18歳未満の入場は禁止されています。', '未満', 'みまん', '["みまん", "いまん", "ひまん", "むまん"]', 'Chữ 未 (VỊ) + 満 (MÃN) đọc là みまん (chưa đủ, dưới mốc).', 2, NOW()),
        (v_ch_id, 'READING', '全体の意見をまとめて報告書を作ります。', '全体', 'ぜんたい', '["ぜんたい", "まったいたい", "すべたい", "ぜんからだ"]', 'Chữ 全 (TOÀN) + 体 (THỂ) đọc là ぜんたい (toàn thể).', 3, NOW()),
        (v_ch_id, 'WRITING', 'そんな むりな けいかくは はんたいです。', 'むり', '無理', '["無理", "非理", "不理", "無用"]', 'Vô lý, quá sức là 無 (VÔ) + 理 (LÝ) -> 無理.', 4, NOW()),
        (v_ch_id, 'WRITING', '20さい いじょうの かたが さんかできます。', 'いじょう', '以上', '["以上", "以後", "已上", "以超"]', 'Trở lên là 以 (DĨ) + 上 (THƯỢNG) -> 以上.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '今年から小学校の担任になりました。', '担任', 'たんにん', '["たんにん", "かつにん", "たんとう", "たんば"]', 'Chữ 担 (ĐẢM) + 任 (NHIỆM) đọc là たんにん (chủ nhiệm).', 1, NOW()),
        (v_ch_id, 'READING', '図書館で本を3冊借りました。', '3冊', 'さんさつ', '["さんさつ", "さんほん", "さんまい", "さんぶ"]', 'Chữ 冊 (SÁCH) đếm sách vở đọc là さつ -> さんさつ.', 2, NOW()),
        (v_ch_id, 'READING', '黒板の文字をノートに書き写します。', '黒板', 'こくばん', '["こくばん", "くろいた", "くろばん", "こくいた"]', 'Chữ 黒 (HẮC) + 板 (BẢN) đọc là こくばん (bảng đen).', 3, NOW()),
        (v_ch_id, 'WRITING', 'ぶんぼうぐやで えんぴつと ふでばこを かった。', 'ふでばこ', '筆箱', '["筆箱", "文箱", "箱筆", "筆具"]', 'Hộp đựng bút là 筆 (BÚT) + 箱 (TƯƠNG) -> 筆箱.', 4, NOW()),
        (v_ch_id, 'WRITING', 'かりた ほんは きげんまでに かえしてください。', 'かえして', '返して', '["返して", "貸して", "出して", "戻して"]', 'Trả lại là động từ 返す (PHẢN) -> 返して.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '希望の大学に進学することが夢です。', '希望', 'きぼう', '["きぼう", "けぼう", "きのぞみ", "きほう"]', 'Chữ 希 (HY) + 望 (VỌNG) đọc là きぼう (nguyện vọng, hy vọng).', 1, NOW()),
        (v_ch_id, 'READING', '明日のアルバイトの面接に向けて準備します。', '面接', 'めんせつ', '["めんせつ", "おもせつ", "めんつぎ", "めんしょう"]', 'Chữ 面 (DIỆN) + 接 (TIẾP) đọc là めんせつ (phỏng vấn).', 2, NOW()),
        (v_ch_id, 'READING', 'クラスのテストの平均点を計算しました。', '平均点', 'へいきんてん', '["へいきんてん", "たいきんてん", "へいいんてん", "ひょうきんてん"]', 'Chữ 平 (BÌNH) + 均 (QUÂN) + 点 (ĐIỂM) đọc là へいきんてん.', 3, NOW()),
        (v_ch_id, 'WRITING', 'まいあさ のみものの おんどを ちょうさします。', 'ちょうさ', '調査', '["調査", "調査", "調選", "検調"]', 'Điều tra, khảo sát là 調 (ĐIỀU) + 査 (TRA) -> 調査.', 4, NOW()),
        (v_ch_id, 'WRITING', 'どりょくの けっか せいせきが あがりました。', 'せいせき', '成績', '["成績", "成積", "生績", "成試"]', 'Thành tích là 成 (THÀNH) + 績 (TÍCH) -> 成績.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '来年3月に大学を卒業する予定です。', '卒業', 'そつぎょう', '["そつぎょう", "しゅうぎょう", "そちぎょう", "そっこう"]', 'Chữ 卒 (TỐT) + 業 (NGHIỆP) đọc là そつぎょう (tốt nghiệp).', 1, NOW()),
        (v_ch_id, 'READING', '先生が文法の使い方を詳しく解説した。', '解説', 'かいせつ', '["かいせつ", "ときあかし", "かいとく", "げせつ"]', 'Chữ 解 (GIẢI) + 説 (THUYẾT) đọc là かいせつ (giải thích).', 2, NOW()),
        (v_ch_id, 'READING', '毎日の努力の積み重ねが成功につながる。', '努力', 'どりょく', '["どりょく", "つとめりょく", "どりき", "とうりょく"]', 'Chữ 努 (NỖ) + 力 (LỰC) đọc là どりょく (nỗ lực).', 3, NOW()),
        (v_ch_id, 'WRITING', 'かぜを ひいて じゅぎょうを けっせきしました。', 'けっせき', '欠席', '["欠席", "欠席", "休席", "退席"]', 'Vắng mặt, nghỉ học là 欠 (KHIẾM) + 席 (TỊCH) -> 欠席.', 4, NOW()),
        (v_ch_id, 'WRITING', 'あたらしく ならった かんじを しっかり おぼえる。', 'おぼえる', '覚える', '["覚える", "忘れる", "知える", "記える"]', 'Ghi nhớ là động từ 覚える (GIÁC).', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '地球上には多種多様な生物が存在します。', '存在', 'そんざい', '["そんざい", "ぞんざい", "そんあり", "ありざい"]', 'Chữ 存 (TỒN) + 在 (TẠI) đọc là そんざい (tồn tại).', 1, NOW()),
        (v_ch_id, 'READING', '北極には巨大な氷河が広がっています。', '氷河', 'ひょうが', '["ひょうが", "こおりがわ", "こおりかわ", "ひょうかわ"]', 'Chữ 氷 (BĂNG) + 河 (HÀ) đọc là ひょうが (sông băng).', 2, NOW()),
        (v_ch_id, 'READING', 'この海岸は遠浅で子どもでも泳げます。', '海岸', 'かいがん', '["かいがん", "うみきし", "うみがん", "かいきし"]', 'Chữ 海 (HẢI) + 岸 (NGẠN) đọc là かいがん (bờ biển).', 3, NOW()),
        (v_ch_id, 'WRITING', 'にほんは たくさんの しまで できている くにです。', 'しま', '島', '["島", "陸", "岸", "坂"]', 'Hòn đảo là chữ 島 (ĐẢO).', 4, NOW()),
        (v_ch_id, 'WRITING', 'きゅうな さかみちを じてんしゃで のぼった。', 'さかみち', '坂道', '["坂道", "阪道", "阪路", "板道"]', 'Con đường dốc là 坂 (PHẢN) + 道 (ĐẠO) -> 坂道.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '海外旅行の準備をそろそろ始めましょう。', '準備', 'じゅんび', '["じゅんび", "じゅんひ", "そろえび", "ちゅんび"]', 'Chữ 準 (CHUẨN) + 備 (BỊ) đọc là じゅんび (chuẩn bị).', 1, NOW()),
        (v_ch_id, 'READING', '京都の有名な寺院を観光して回りました。', '観光', 'かんこう', '["かんこう", "みひかり", "かんひかり", "こうかん"]', 'Chữ 観 (QUAN) + 光 (QUANG) đọc là かんこう (tham quan du lịch).', 2, NOW()),
        (v_ch_id, 'READING', '温泉旅館に一泊してのんびり過ごしました。', '一泊', 'いっぱく', '["いっぱく", "いちはく", "ひととまり", "いちどまり"]', 'Chữ 泊 (BẠC) đếm đêm trọ: 1 đêm đọc là いっぱく.', 3, NOW()),
        (v_ch_id, 'WRITING', 'くうこうで がいこくの おきゃくさまを でむかえる。', 'でむかえる', '出迎える', '["出迎える", "迎える", "訪ねる", "見送る"]', 'Ra đón tiếp là 出 (XUẤT) + 迎 (NGHÊNH) -> 出迎える.', 4, NOW()),
        (v_ch_id, 'WRITING', 'じんじゃで おまつりが おこなわれました。', 'おまつり', 'お祭り', '["お祭り", "お神り", "お祝り", "お仏り"]', 'Lễ hội truyền thống là 祭 (TẾ) -> お祭り.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '交差点を右に曲がってまっすぐ進みます。', '曲がって', 'まがって', '["まがって", "おって", "ころんで", "たおれて"]', 'Động từ 曲がる đọc là まがる (rẽ, quẹo).', 1, NOW()),
        (v_ch_id, 'READING', '雨の日は滑りやすいので足元に注意してください。', '注意', 'ちゅうい', '["ちゅうい", "ちゅうこころ", "ちゅうし", "そそぎい"]', 'Chữ 注 (CHÚ) + 意 (Ý) đọc là ちゅうい (chú ý, cẩn thận).', 2, NOW()),
        (v_ch_id, 'READING', '高速道路でトラックの追突事故が起きた。', '追突', 'ついとつ', '["ついとつ", "おいつき", "ついづき", "お突"]', 'Chữ 追 (TRUY) + 突 (ĐỘT) đọc là ついとつ (tông xe từ phía sau).', 3, NOW()),
        (v_ch_id, 'WRITING', 'つぎの かどを ひだりに まがってください。', 'かど', '角', '["角", "折", "曲", "路"]', 'Góc đường là chữ 角 (GIÁC).', 4, NOW()),
        (v_ch_id, 'WRITING', 'おおきな かわに かかる はしを わたる。', 'はし', '橋', '["橋", "端", "階", "路"]', 'Cây cầu là chữ 橋 (KIỀU).', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '大学を卒業して就職活動を始めました。', '就職', 'しゅうしょく', '["しゅうしょく", "じゅしょく", "しゅうしょく", "しゅうしょ"]', 'Chữ 就 (TỰU) + 職 (CHỨC) đọc là しゅうしょく (tìm việc làm).', 1, NOW()),
        (v_ch_id, 'READING', '社会人としてビジネスマナーや常識を身につける。', '常識', 'じょうしき', '["じょうしき", "つねしき", "じょうち", "しょうしき"]', 'Chữ 常 (THƯỜNG) + 識 (THỨC) đọc là じょうしき (thường thức).', 2, NOW()),
        (v_ch_id, 'READING', '毎月の給料から税金が引かれます。', '給料', 'きゅうりょう', '["きゅうりょう", "きゅうりょ", "たまりょう", "あずかりょう"]', 'Chữ 給 (CẤP) + 料 (LIỆU) đọc là きゅうりょう (tiền lương).', 3, NOW()),
        (v_ch_id, 'WRITING', 'やくそくの じかんに おくれて しつれいしました。', 'しつれい', '失礼', '["失礼", "失敗", "失儀", "失法"]', 'Thất lễ, xin lỗi là 失 (THẤT) + 礼 (LỄ) -> 失礼.', 4, NOW()),
        (v_ch_id, 'WRITING', 'いっしょうけんめい ろうどうして かぞくを ささえる。', 'ろうどう', '労働', '["労働", "労力", "職員", "仕事"]', 'Lao động làm việc là 労 (LAO) + 働 (ĐỘNG) -> 労働.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '提案された新しい計画に賛成します。', '賛成', 'さんせい', '["さんせい", "さんじょう", "はんせい", "そうせい"]', 'Chữ 賛 (TÁN) + 成 (THÀNH) đọc là さんせい (tán thành).', 1, NOW()),
        (v_ch_id, 'READING', '仕事でトラブルがあったら上司に相談します。', '相談', 'そうだん', '["そうだん", "しょうだん", "あいたん", "あいだん"]', 'Chữ 相 (TƯƠNG) + 談 (ĐÀM) đọc là そうだん (bàn bạc, hỏi ý kiến).', 2, NOW()),
        (v_ch_id, 'READING', '事実関係をしっかり確認してください。', '確認', 'かくにん', '["かくにん", "たしかにん", "こうにん", "かっにん"]', 'Chữ 確 (XÁC) + 認 (NHẬN) đọc là かくにん (xác nhận).', 3, NOW()),
        (v_ch_id, 'WRITING', 'かいぎで じぶんの いけんを のべた。', 'かいぎ', '会議', '["会議", "会談", "協議", "議論"]', 'Hội nghị, cuộc họp là 会 (HỘI) + 議 (NGHỊ) -> 会議.', 4, NOW()),
        (v_ch_id, 'WRITING', 'しんちょくを じょうしに ほうこくする。', 'ほうこく', '報告', '["報告", "報道", "通知", "案内"]', 'Báo cáo công việc là 報 (BÁO) + 告 (CÁO) -> 報告.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '来年度の事業予算を計算しています。', '予算', 'よさん', '["よさん", "よざん", "よすう", "みていさん"]', 'Chữ 予 (DỰ) + 算 (TOÁN) đọc là よさん (ngân sách dự toán).', 1, NOW()),
        (v_ch_id, 'READING', '工場の責任者として安全を管理しています。', '管理', 'かんり', '["かんり", "くだり", "かんじ", "けんり"]', 'Chữ 管 (QUẢN) + 理 (LÝ) đọc là かんり (quản lý).', 2, NOW()),
        (v_ch_id, 'READING', '国の年間予算は何十兆円にも達します。', '兆円', 'ちょうえん', '["ちょうえん", "おくえん", "きざしえん", "じょうえん"]', 'Chữ 兆 (TRIỆU = 1.000 tỷ) + 円 đọc là ちょうえん.', 3, NOW()),
        (v_ch_id, 'WRITING', 'しょうひしゃは しょうひぜいを はらいます。', 'しょうひぜい', '消費税', '["消費税", "消費費", "消税", "消費金"]', 'Thuế tiêu thụ là 消 (TIÊU) + 費 (PHÍ) + 税 (THUẾ) -> 消費税.', 4, NOW()),
        (v_ch_id, 'WRITING', 'げんざい とうきょうに すんでいます。', 'げんざい', '現在', '["現在", "現状", "現今", "昔在"]', 'Hiện tại bây giờ là 現 (HIỆN) + 在 (TẠI) -> 現在.', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 19;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', 'この地域では農業と商業が盛んです。', '農業', 'のうぎょう', '["のうぎょう", "のうごう", "のうぎょ", "たぎょう"]', 'Chữ 農 (NÔNG) + 業 (NGHIỆP) đọc là のうぎょう (nông nghiệp).', 1, NOW()),
        (v_ch_id, 'READING', '最新の機械を導入して生産効率を高める。', '機械', 'きかい', '["きかい", "きき", "はたかい", "きぎ"]', 'Chữ 機 (CƠ) + 械 (GIỚI) đọc là きかい (máy móc).', 2, NOW()),
        (v_ch_id, 'READING', '工事現場は危険ですから近づかないでください。', '危険', 'きけん', '["きけん", "あぶけん", "きげん", "危險"]', 'Chữ 危 (NGUY) + 険 (HIỂM) đọc là きけん (nguy hiểm).', 3, NOW()),
        (v_ch_id, 'WRITING', 'がいこくとの ぼうえきが かっぱつに おこなわれる。', 'ぼうえき', '貿易', '["貿易", "商易", "貿商", "商売"]', 'Ngoại thương mậu dịch là 貿 (MẬU) + 易 (DỊCH) -> 貿易.', 4, NOW()),
        (v_ch_id, 'WRITING', 'てんねんの わたで おられた ぬの。', 'ぬの', '布', '["布", "綿", "皮", "織"]', 'Vải vóc là chữ 布 (BỐ).', 5, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 20;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES
        (v_ch_id, 'READING', '国民は国の法律や規則を守る義務があります。', '法律', 'ほうりつ', '["ほうりつ", "ほうりち", "ほうき", "ほうしょ"]', 'Chữ 法 (PHÁP) + 律 (LUẬT) đọc là ほうりつ (pháp luật).', 1, NOW()),
        (v_ch_id, 'READING', '警察が事件の容疑者を逮捕しました。', '容疑者', 'ようぎしゃ', '["ようぎしゃ", "いぎしゃ", "ようぎにん", "ようさいしゃ"]', 'Chữ 容 (DUNG) + 疑 (NGHI) + 者 (GIẢ) đọc là ようぎしゃ (nghi can).', 2, NOW()),
        (v_ch_id, 'READING', '館内でのスマートフォンの使用は禁止です。', '禁止', 'きんし', '["きんし", "きんとどめ", "むし", "きんじ"]', 'Chữ 禁 (CẤM) + 止 (CHỈ) đọc là きんし (cấm chỉ).', 3, NOW()),
        (v_ch_id, 'WRITING', 'しゃかいの あんぜんと ちづをおびやかす はんざい。', 'はんざい', '犯罪', '["犯罪", "犯則", "違反", "重罪"]', 'Tội phạm là 犯 (PHẠM) + 罪 (TỘI) -> 犯罪.', 4, NOW()),
        (v_ch_id, 'WRITING', 'せんそうに はいたいして へいしたちが ひきあげた。', 'せんそう', '戦争', '["戦争", "争戦", "戦役", "軍戦"]', 'Chiến tranh là 戦 (CHIẾN) + 争 (TRANH) -> 戦争.', 5, NOW());
    END IF;
END $$;

-- 5. SEED KANJI MINIGAMES
DO $$
DECLARE v_ch_id BIGINT; BEGIN
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 1;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 1: Lịch trình sinh hoạt & Phân loại rác gia đình', 'Sắp xếp thời gian biểu buổi sáng và quy tắc xử lý rác tái chế chuẩn đời sống Nhật Bản.', '/assets/kanji/n3/illustrations/chap1_intro.webp', '{"questions": [{"id": 1, "prompt": "Sắp xếp trình tự công việc buổi sáng: [干す / 起きる / 洗濯する]", "options": ["起きる → 洗濯する → 干す", "洗濯する → 起きる → 干す", "干す → 洗濯する → 起きる", "起きる → 干す → 洗濯する"], "answer": "起きる → 洗濯する → 干す", "explanation": "Đúng thứ tự sinh hoạt: Thức dậy (起きる) -> Giặt quần áo (洗濯する) -> Đem phơi (干す)."}, {"id": 2, "prompt": "Phân loại rác: Chai nhựa và hộp giấy thuộc loại rác nào?", "options": ["燃えるゴミ (Rác cháy được)", "燃えないゴミ (Rác không cháy)", "資源ゴミ (Rác tái chế)", "粗大ゴミ (Rác cồng kềnh)"], "answer": "燃えるゴミ (Rác cháy được)", "explanation": "Rác giấy và vỏ sạch thường xếp vào nhóm 燃えるゴミ hoặc rác tái chế có quy định phân loại rõ ràng."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 2;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Ô chữ Kanji đời sống & Thiết kế nội thất (クロスワード)', 'Giải đố ô chữ Kanji ghép các từ chỉ vật dụng kiến trúc và cây cảnh gia đình.', '/assets/kanji/n3/quizzes/quiz_1_2_crossword.webp', '{"questions": [{"id": 1, "prompt": "Từ nào ghép với 戸 (cửa) mang nghĩa cửa sổ kính nhìn ra sân vườn?", "options": ["雨戸 (Cửa che mưa)", "窓戸 (Cửa sổ)", "戸棚 (Tủ chạn)", "門戸 (Cánh cổng)"], "answer": "雨戸 (Cửa che mưa)", "explanation": "雨戸 (あまど) là loại cửa trượt che mưa bão bảo vệ mặt kính cửa sổ truyền thống Nhật Bản."}, {"id": 2, "prompt": "Phần nâng đỡ vững chãi toàn bộ kết cấu ngôi nhà được gọi là gì?", "options": ["大黒柱 (Trụ cột chính)", "屋根 (Mái nhà)", "階段 (Cầu thang)", "倉庫 (Nhà kho)"], "answer": "大黒柱 (Trụ cột chính)", "explanation": "柱 (TRỤ) là cây cột, 大黒柱 là cột trụ chính gia đình gánh vác cả căn nhà."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Phỏng vấn dọn phòng & Hẹn giờ thu gom rác', 'Đọc bài phỏng vấn lối sống và chọn đúng thao tác phân loại xử lý vật dụng.', '/assets/kanji/n3/quizzes/quiz_1_2_interview.webp', '{"questions": [{"id": 1, "prompt": "Khi nhặt được đồ thất lạc rơi trên sàn nhà, hành động đúng là gì?", "options": ["拾う (Nhặt lên cất cẩn thận)", "捨てる (Vứt đi)", "押す (Đẩy sang bên)", "消す (Xóa sạch)"], "answer": "拾う (Nhặt lên cất cẩn thận)", "explanation": "Động từ 拾う (ひろう) nghĩa là nhặt lên, đối lập với 捨てる (vứt bỏ)."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 3;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bếp trưởng & Điều chỉnh nhiệt độ gia vị', 'Đọc công thức nấu ăn và chọn đúng mức nhiệt độ, tỷ lệ muối đường và số lượng nguyên liệu.', '/assets/kanji/n3/illustrations/chap3_intro.webp', '{"questions": [{"id": 1, "prompt": "Đơn vị đếm 2 quả trứng gà trong tiếng Nhật là gì?", "options": ["卵 2個 (2 quả trứng)", "卵 2枚 (2 tờ trứng)", "卵 2匹 (2 con trứng)", "卵 2杯 (2 cốc trứng)"], "answer": "卵 2個 (2 quả trứng)", "explanation": "Trứng dùng hậu tố 個 (こ) để đếm số lượng vật thể nhỏ tròn."}, {"id": 2, "prompt": "Khi hâm nóng canh miso, trạng thái nhiệt độ lý tưởng là gì?", "options": ["温める (Hâm ấm vừa ăn)", "冷やす (Làm lạnh ngắt)", "凍らせる (Đông đá)", "焦がす (Làm cháy khét)"], "answer": "温める (Hâm ấm vừa ăn)", "explanation": "温める (あたためる) nghĩa là làm ấm, giữ trọn hương vị súp miso."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 4;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Công thức bánh gato dâu tây (ショートケーキのレシピ)', 'Đọc công thức làm bánh gato và điền đúng chữ Hán chỉ định lượng nguyên liệu.', '/assets/kanji/n3/quizzes/quiz_3_4_shortcake_recipe.webp', '{"questions": [{"id": 1, "prompt": "Nguyên liệu chính làm cốt bánh gato Shortcake là bột gì?", "options": ["小麦粉 (Bột mì trắng)", "そば粉 (Bột kiều mạch)", "片栗粉 (Bột năng)", "米粉 (Bột gạo)"], "answer": "小麦粉 (Bột mì trắng)", "explanation": "小麦粉 (こむぎこ) gồm chữ 小 + 麦 + 粉 là bột mì chuyên làm bánh ngọt."}, {"id": 2, "prompt": "Dụng cụ dùng để đánh kem tươi bông mềm là gì?", "options": ["泡立て器 (Cây đánh trứng/kem)", "炊飯器 (Nồi cơm điện)", "食器 (Bát đĩa ăn)", "容器 (Hộp chứa)"], "answer": "泡立て器 (Cây đánh trứng/kem)", "explanation": "器 (KHÍ) chỉ công cụ đồ dùng, 泡立て器 là cây phới đánh bọt kem."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Bệnh viện & Hội thoại Bác sĩ - Bệnh nhân', 'Xem đơn khám bệnh, giải mã triệu chứng sốt cao, đo huyết áp và hướng dẫn băng bó.', '/assets/kanji/n3/quizzes/quiz_3_4_doctor_patient.webp', '{"questions": [{"id": 1, "prompt": "Bệnh nhân than phiền: “深呼吸すると胸が痛いです”, nghĩa là bị đau ở đâu khi làm gì?", "options": ["Đau ngực khi hít thở sâu", "Đau đầu khi cúi xuống", "Đau họng khi nuốt thức ăn", "Đau bụng khi uống nước"], "answer": "Đau ngực khi hít thở sâu", "explanation": "深呼吸 (hít thở sâu) gồm chữ 深 (thâm) + 呼 (hô) + 吸 (hấp), kết hợp với 胸が痛い (đau ngực)."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 5;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bảng điểm thi đấu & Kỷ lục thể thao', 'Phân tích bảng kết quả trận chung kết thể thao và xác định đội vô địch, vận động viên xuất sắc.', '/assets/kanji/n3/illustrations/chap5_intro.webp', '{"questions": [{"id": 1, "prompt": "Người ném bóng trong môn bóng chày tiếng Nhật gọi là gì?", "options": ["投手 (ピッチャー - Cầu thủ ném bóng)", "打者 (バッター - Cầu thủ đánh bóng)", "捕手 (キャッチャー - Cầu thủ bắt bóng)", "審判 (Trọng tài)"], "answer": "投手 (ピッチャー - Cầu thủ ném bóng)", "explanation": "投 (ĐẦU) nghĩa là ném -> 投手 (とうしゅ) là vận động viên ném bóng."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 6;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bản tin thể thao Koshien & Cảm xúc thăng hoa', 'Đọc phóng sự bóng chày mùa hè Koshien, cảm nhận niềm xúc động chiến thắng và tiếc nuối.', '/assets/kanji/n3/quizzes/quiz_5_6_baseball_article.webp', '{"questions": [{"id": 1, "prompt": "Đội bóng lội ngược dòng giành cúp vô địch phút chót mang lại cảm xúc gì?", "options": ["大歓喜 (Vô cùng mừng rỡ sung sướng)", "失望 (Thất vọng tràn trề)", "怒り (Giận dữ tột cùng)", "恐怖 (Sợ hãi run rẩy)"], "answer": "大歓喜 (Vô cùng mừng rỡ sung sướng)", "explanation": "Chữ 喜 (HỈ) kết hợp 歓喜 (かんき) diễn tả niềm hân hoan vui sướng ngập tràn khi thắng trận."}, {"id": 2, "prompt": "Thành ngữ “勝負の行方” mang ý nghĩa là gì?", "options": ["Cục diện diễn biến của trận thắng bại", "Thời gian bắt đầu trận đấu", "Địa điểm sân vận động tổ chức", "Số lượng khán giả mua vé"], "answer": "Cục diện diễn biến của trận thắng bại", "explanation": "勝負 (thắng bại) + 行方 (tung tích, chiều hướng phát triển)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 7;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Lễ thành hôn & Phong tục chúc mừng', 'Tìm hiểu quy tắc phong bì tiền mừng cưới Shugi-bukuro và thiệp đáp lễ hạnh phúc.', '/assets/kanji/n3/illustrations/chap7_intro.webp', '{"questions": [{"id": 1, "prompt": "Trên phong bì mừng cưới tiếng Nhật thường in nổi chữ gì?", "options": ["寿 (Thọ - Chúc phúc hôn nhân)", "祝 (Chúc - Chúc mừng)", "幸 (Hạnh - May mắn)", "福 (Phúc - Hạnh phúc)"], "answer": "寿 (Thọ - Chúc phúc hôn nhân)", "explanation": "Chữ 寿 (ことぶき) là chữ chúc mừng cưới hỏi truyền thống sang trọng nhất."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 8;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Cây phả hệ & Xưng hô giao tiếp xã hội', 'Nhận biết các mối quan hệ người thân trong gia đình họ tộc và đối tác công việc.', '/assets/kanji/n3/illustrations/chap8_intro.webp', '{"questions": [{"id": 1, "prompt": "Chữ nào dùng để chỉ người bạn thân thiết hiểu ý nhau?", "options": ["親友 (Bạn thân tri kỷ)", "他人 (Người ngoài xa lạ)", "知人 (Người quen sơ)", "同僚 (Đồng nghiệp)"], "answer": "親友 (Bạn thân tri kỷ)", "explanation": "Chữ 親 (THÂN) + 友 (HỮU) đọc là しんゆう (bạn thân nhất)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 9;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Thiệp mời đám cưới & Lời chúc phúc vĩnh cửu', 'Đọc thiệp cưới trang trọng phong cách Nhật Bản và chọn lời chúc hạnh phúc trăm năm.', '/assets/kanji/n3/quizzes/quiz_7_9_wedding_letter.webp', '{"questions": [{"id": 1, "prompt": "Thành ngữ nào chúc phúc hai bạn sống trọn đời hạnh phúc?", "options": ["永遠の幸福を祈る (Chúc phúc hạnh phúc vĩnh cửu)", "関係を解消する (Chấm dứt quan hệ)", "単独で行動する (Hành động một mình)", "約束を破る (Phá vỡ lời hứa)"], "answer": "永遠の幸福を祈る (Chúc phúc hạnh phúc vĩnh cửu)", "explanation": "永 (VĨNH) + 幸 (HẠNH) + 福 (PHÚC) tạo nên lời chúc hôn lễ kinh điển nhất."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Phỏng vấn đầu bếp & Quy tắc so sánh định lượng', 'Phân tích bảng định lượng gia vị: 以上 (trở lên), 未満 (chưa đầy), 全体 (toàn bộ).', '/assets/kanji/n3/quizzes/quiz_7_9_cooking_interview.webp', '{"questions": [{"id": 1, "prompt": "Quy định “20歳未満は飲酒禁止” có nghĩa là:", "options": ["Người dưới 20 tuổi cấm uống rượu", "Người từ 20 tuổi trở lên cấm uống rượu", "Ai cũng được phép uống rượu", "Chỉ cấm người trên 20 tuổi"], "answer": "Người dưới 20 tuổi cấm uống rượu", "explanation": "未満 (VỊ MÃN) nghĩa là chưa đạt tới mốc đó (tức dưới 20 tuổi)."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 10;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 1: Bảng phân công nhiệm vụ lớp học & Mượn sách', 'Sắp xếp quy trình mượn tài liệu học tập và bảo quản dụng cụ học đường.', '/assets/kanji/n3/illustrations/chap10_intro.webp', '{"questions": [{"id": 1, "prompt": "Quy trình mượn sách thư viện đúng: [借りる / 探す / 返す]", "options": ["探す → 借りる → 返す", "借りる → 探す → 返す", "返す → 探す → 借りる", "探す → 返す → 借りる"], "answer": "探す → 借りる → 返す", "explanation": "Tìm sách (探す) -> Đến quầy làm thủ tục mượn (借りる) -> Đọc xong đem trả đúng hạn (返す)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 11;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Nội quy thư viện & Không gian học tập', 'Đọc bảng thông báo nội quy phòng tự học thư viện và chọn hành vi được phép.', '/assets/kanji/n3/quizzes/quiz_10_11_library_rules.webp', '{"questions": [{"id": 1, "prompt": "Biển báo “座席での飲食禁止” có nghĩa là gì?", "options": ["Cấm ăn uống tại chỗ ngồi", "Cho phép ăn bánh kẹo thoải mái", "Chỉ được phép uống rượu", "Cấm ngồi vào ghế"], "answer": "Cấm ăn uống tại chỗ ngồi", "explanation": "座席 (chỗ ngồi) + 飲食禁止 (cấm ăn uống)."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Phỏng vấn xin việc làm thêm sinh viên (面接)', 'Xem kịch bản phỏng vấn Baitô sinh viên đại học và chọn câu trả lời lịch thiệp nhất.', '/assets/kanji/n3/quizzes/quiz_10_11_parttime_interview.webp', '{"questions": [{"id": 1, "prompt": "Khi người phỏng vấn hỏi lý do nộp đơn (志望動機), sinh viên nên trình bày gì?", "options": ["Nguyện vọng và ước mơ học hỏi kinh nghiệm", "Chỉ vì muốn có thật nhiều tiền chơi game", "Vì ở nhà rảnh rỗi không có việc gì làm", "Vì bạn bè ép buộc nộp hồ sơ"], "answer": "Nguyện vọng và ước mơ học hỏi kinh nghiệm", "explanation": "Chữ 希 (HY) + 望 (VỌNG) thể hiện động lực và chí hướng chân thành."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 12;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Lịch thi học kỳ & Bí quyết giải thích bài tập', 'Đọc lịch thi các môn học và cách viết báo cáo tóm tắt nội dung bài học.', '/assets/kanji/n3/illustrations/chap12_intro.webp', '{"questions": [{"id": 1, "prompt": "Từ nào mang nghĩa giải thích rõ ràng kèm ví dụ minh họa?", "options": ["解説 (Giải thích chi tiết)", "欠席 (Vắng mặt)", "忘却 (Quên lãng)", "卒業 (Tốt nghiệp)"], "answer": "解説 (Giải thích chi tiết)", "explanation": "解 (GIẢI) + 説 (THUYẾT) đọc là かいせつ."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 13;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bảo tàng Khoa học Địa Cầu & Sông băng Bắc Cực', 'Khám phá sơ đồ địa tầng Trái Đất, dòng hải lưu ấm lạnh và sự đa dạng sinh học.', '/assets/kanji/n3/quizzes/quiz_12_13_science_museum.webp', '{"questions": [{"id": 1, "prompt": "Dòng hải lưu từ phương nam chảy lên mang nước ấm gọi là gì?", "options": ["暖流 (Dòng hải lưu ấm)", "寒流 (Dòng hải lưu lạnh)", "氷河 (Sông băng trôi)", "河口 (Cửa sông)"], "answer": "暖流 (Dòng hải lưu ấm)", "explanation": "暖 (NOÃN - ấm) + 流 (LƯU - dòng chảy) -> 暖流 (だんりゅう)."}, {"id": 2, "prompt": "Đại dương nơi có độ sâu thẳm nhất dưới đáy biển gọi là gì?", "options": ["深海 (Biển sâu thẳm)", "浅瀬 (Vùng nước nông)", "海岸 (Bờ biển)", "砂浜 (Bãi cát)"], "answer": "深海 (Biển sâu thẳm)", "explanation": "深 (THÂM - sâu) + 海 (HẢI - biển) -> 深海 (しんかい)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 14;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'ORDERING', 'Minigame 1: Chuẩn bị hành lý Tour du lịch nước ngoài', 'Sắp xếp danh mục đồ đạc trước chuyến bay và các thủ tục nhận phòng khách sạn Ryokan.', '/assets/kanji/n3/illustrations/chap14_intro.webp', '{"questions": [{"id": 1, "prompt": "Trình tự du lịch nước ngoài: [搭乗する / 荷物を準備する / 観光する]", "options": ["荷物を準備する → 搭乗する → 観光する", "観光する → 荷物を準備する → 搭乗する", "搭乗する → 観光する → 荷物を準備する", "荷物を準備する → 観光する → 搭乗する"], "answer": "荷物を準備する → 搭乗する → 観光する", "explanation": "Chuẩn bị hành lý (準備) -> Lên máy bay (搭乗) -> Tham quan ngắm cảnh (観光)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 15;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Tour du lịch Châu Âu & Di sản văn hóa (ヨーロッパ旅行)', 'Đọc lịch trình tour ngắm cảnh các thành phố châu Âu và công trình kiến trúc cổ kính.', '/assets/kanji/n3/quizzes/quiz_14_15_europe_tour.webp', '{"questions": [{"id": 1, "prompt": "Chữ Hán 欧州 trong lịch trình du lịch chỉ châu lục nào?", "options": ["Châu Âu (Europe)", "Châu Á (Asia)", "Châu Mỹ (America)", "Châu Phi (Africa)"], "answer": "Châu Âu (Europe)", "explanation": "欧州 (おうしゅう) gồm 欧 (ÂU) + 州 (CHÂU) nghĩa là Châu Âu."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Sơ đồ chỉ đường & Biển báo giao thông đường bộ', 'Nhìn bản đồ ngã tư đường ray, đọc hướng dẫn rẽ khúc cua và vị trí cây cầu vượt.', '/assets/kanji/n3/quizzes/quiz_14_15_house_map.webp', '{"questions": [{"id": 1, "prompt": "Biển chỉ dẫn “直進” yêu cầu người lái xe thực hiện thao tác nào?", "options": ["Đi thẳng về phía trước", "Rẽ phải ngay lập tức", "Quay đầu ngược chiều", "Dừng đỗ xe lại"], "answer": "Đi thẳng về phía trước", "explanation": "直 (TRỰC - thẳng) + 進 (TIẾN - đi tới) -> 直進 (ちょくしん)."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 16;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Hướng nghiệp công sở & Đãi ngộ nhân sự', 'Đọc bảng quyền lợi nhân viên, mức lương cơ bản và chế độ trợ cấp nghỉ phép.', '/assets/kanji/n3/illustrations/chap16_intro.webp', '{"questions": [{"id": 1, "prompt": "Khoản tiền công ty trả định kỳ hàng tháng cho người lao động gọi là gì?", "options": ["給料 (Tiền lương)", "失礼 (Thất lễ)", "退職 (Nghỉ việc)", "求職 (Tìm việc)"], "answer": "給料 (Tiền lương)", "explanation": "給 (CẤP) + 料 (LIỆU) đọc là きゅうりょう."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 17;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bảng tuyển dụng việc làm & Chế độ đãi ngộ (求人票)', 'Đọc tờ thông tin tuyển dụng việc làm và trả lời các tiêu chí yêu cầu trình độ.', '/assets/kanji/n3/quizzes/quiz_16_17_job_ad.webp', '{"questions": [{"id": 1, "prompt": "Mục “交通費全額支給” trong tờ tuyển dụng có ý nghĩa là gì?", "options": ["Công ty chi trả toàn bộ tiền vé xe đi lại", "Người lao động phải tự trả tiền vé xe", "Không hỗ trợ bất kỳ chi phí nào", "Chỉ trả một nửa tiền xăng"], "answer": "Công ty chi trả toàn bộ tiền vé xe đi lại", "explanation": "全額 (toàn bộ số tiền) + 支給 (chi trả, trợ cấp)."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Tư vấn hướng nghiệp & Quy tắc Hou-Ren-So (報連相)', 'Thực hành kỹ năng giao tiếp công sở: Báo cáo (報告) - Liên lạc (連絡) - Bàn bạc (相談).', '/assets/kanji/n3/quizzes/quiz_16_17_student_career_advice.webp', '{"questions": [{"id": 1, "prompt": "Khi gặp sự cố bất ngờ trong công việc, bước đầu tiên cần làm ngay là gì?", "options": ["Báo cáo tình hình ngay cho cấp trên (報告)", "Im lặng giấu kín không nói với ai", "Tự ý quyết định bỏ về nhà", "Đổ lỗi cho đồng nghiệp khác"], "answer": "Báo cáo tình hình ngay cho cấp trên (報告)", "explanation": "報告 (ほうこく) là bước đầu tiên và cốt lõi nhất của văn hóa Hou-Ren-So Nhật Bản."}]}', 2, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 18;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Ngân sách tài khóa & Biểu đồ thuế tiêu thụ', 'Tính toán biểu đồ ngân sách hàng nghìn tỷ yên và mức thuế tiêu thụ của các mặt hàng.', '/assets/kanji/n3/illustrations/chap18_intro.webp', '{"questions": [{"id": 1, "prompt": "1 兆 (Triệu) trong hệ đếm Nhật Bản tương đương với bao nhiêu?", "options": ["1.000.000.000.000 (Một nghìn tỷ)", "1.000.000 (Một triệu)", "100.000.000 (Một trăm triệu)", "10.000 (Mười nghìn)"], "answer": "1.000.000.000.000 (Một nghìn tỷ)", "explanation": "Chữ 兆 (ちょう) bằng 10.000 lần 億 (ức = trăm triệu), tức là 1.000 tỷ."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 19;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Dây chuyền sản xuất cơ khí & Nhà máy dệt sợi', 'Khám phá quy trình công nghệ chế tạo máy móc tự động và vải dệt cao cấp.', '/assets/kanji/n3/illustrations/chap19_intro.webp', '{"questions": [{"id": 1, "prompt": "Loại chất liệu dệt từ sợi bông tự nhiên gọi là gì?", "options": ["綿布 (Vải dệt từ sợi bông)", "鉄鋼 (Sắt thép xây dựng)", "木材 (Gỗ xẻ làm nhà)", "原油 (Dầu mỏ thô)"], "answer": "綿布 (Vải dệt từ sợi bông)", "explanation": "綿 (MIÊN - bông) + 布 (BỐ - vải) -> 綿布 (めんぷ)."}]}', 1, NOW());
    END IF;
    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = 20;
    IF v_ch_id IS NOT NULL THEN
        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 1: Bản tin thời sự Thủ tướng & Chính sách ngân sách nhà nước', 'Đọc bài phát biểu của Thủ tướng về phân bổ ngân sách và các điều luật kinh tế.', '/assets/kanji/n3/quizzes/quiz_18_20_pm_policy.webp', '{"questions": [{"id": 1, "prompt": "Mục tiêu chính sách tài khóa của chính phủ nhằm giảm bớt điều gì?", "options": ["貧富の差 (Chênh lệch giàu nghèo)", "国民の幸福 (Hạnh phúc nhân dân)", "農業の発展 (Phát triển nông nghiệp)", "技術の進歩 (Tiến bộ công nghệ)"], "answer": "貧富の差 (Chênh lệch giàu nghèo)", "explanation": "貧 (BẦN - nghèo) + 富 (PHÚ - giàu) -> 貧富 (ひんぷ), giảm khoảng cách bất bình đẳng xã hội."}]}', 1, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 2: Nhật ký tham quan nhà máy công nghiệp & Trị an pháp luật', 'Đọc nhật ký tham quan dây chuyền sản xuất và quy định đảm bảo trật tự pháp luật.', '/assets/kanji/n3/quizzes/quiz_18_20_industry_diary.webp', '{"questions": [{"id": 1, "prompt": "Trong khu vực vận hành máy móc công nghiệp nặng, biển báo nào là quan trọng nhất?", "options": ["危険・立ち入り禁止 (Nguy hiểm - Cấm vào)", "歓迎・ご自由にどうぞ (Chào mừng - Tự do vào)", "休憩室・飲食可能 (Phòng nghỉ - Được ăn uống)", "撮影スポット (Điểm chụp ảnh lưu niệm)"], "answer": "危険・立ち入り禁止 (Nguy hiểm - Cấm vào)", "explanation": "危険 (nguy hiểm) + 立ち入り禁止 (cấm bước chân vào)."}]}', 2, NOW());
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES
        (v_ch_id, 'PICTURE_MATCH', 'Minigame 3: Ước mơ nghề nghiệp & Công lý xã hội (夢の職業)', 'Khám phá các ngành nghề trong xã hội pháp quyền: Luật sư, Thẩm phán, Cảnh sát và Kỹ sư.', '/assets/kanji/n3/quizzes/quiz_18_20_dream_jobs.webp', '{"questions": [{"id": 1, "prompt": "Người bảo vệ công lý và áp dụng chuẩn xác các điều khoản pháp luật là ai?", "options": ["裁判官・弁護士 (Thẩm phán / Luật sư)", "容疑者 (Nghi can vụ án)", "犯人 (Thủ phạm vi phạm)", "兵士 (Binh lính chiến đấu)"], "answer": "裁判官・弁護士 (Thẩm phán / Luật sư)", "explanation": "Chữ 判 (PHÁN) và 法 (PHÁP) thể hiện vai trò cầm cân nảy mực công lý."}]}', 3, NOW());
    END IF;
END $$;

-- 6. SEED N3 ACHIEVEMENT TESTS (STAGES 7, 8, 9, 10)
DELETE FROM kanji_achievement_tests WHERE stage IN (7, 8, 9, 10);
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(7, 'Achievement Test 1 (Chương 1 ~ 6) — Đời sống & Cá nhân', 'Đề thi tổng hợp kiểm tra 120 chữ Hán từ Chương 1 đến Chương 6 (Đời sống hàng ngày, Nhà ở nội thất, Ẩm thực nấu ăn, Bệnh viện sức khỏe, Thể thao và Cảm xúc tâm lý)', 85, '{"stage_level": "N3", "coverage": "Chương 1 ~ 6", "total_questions": 20, "questions": [{"q": "天気がいいのでベランダに洗濯物を干しました。", "target": "干しました", "answer": "ほしました", "options": ["ほしました", "あらいました", "ふきました", "かけました"]}, {"q": "ドアの取っ手を押しても開きません。", "target": "押して", "answer": "おして", "options": ["おして", "ひいて", "さして", "たいて"]}, {"q": "フライパンの温度が上がるまで待ちます。", "target": "温度", "answer": "おんど", "options": ["おんど", "あつど", "ねつど", "おんたく"]}, {"q": "健康診断で血液の検査を受けました。", "target": "血液", "answer": "けつえき", "options": ["けつえき", "ちえき", "けつしる", "ちすい"]}, {"q": "決勝戦で素晴らしい新記録を達成しました。", "target": "記録", "answer": "きろく", "options": ["きろく", "きりょく", "しるく", "きほう"]}, {"q": "試合に負けて本当に残念です。", "target": "残念", "answer": "ざんねん", "options": ["ざんねん", "のこりねん", "さんねん", "ざんしん"]}, {"q": "毎朝6時に＿＿＿ジョギングをします。", "target": "おきて", "answer": "起きて", "options": ["起きて", "寝て", "立って", "走て"]}, {"q": "駅の＿＿＿を急いで駆け上がりました。", "target": "かいだん", "answer": "階段", "options": ["階段", "階落", "段階", "階梯"]}, {"q": "ケーキの＿＿＿として小麦粉と卵を買いました。", "target": "ざいりょう", "answer": "材料", "options": ["材料", "木料", "原料", "資材"]}, {"q": "風邪を引いて激しい＿＿＿がします。", "target": "ずつう", "answer": "頭痛", "options": ["頭痛", "首痛", "歯痛", "腹痛"]}]}', 7, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(8, 'Achievement Test 2 (Chương 7 ~ 9) — Quan hệ, Xã hội & Đơn vị', 'Đề thi tổng hợp kiểm tra 43 chữ Hán từ Chương 7 đến Chương 9 (Hôn nhân lễ nghi, Quan hệ gia đình xã hội, Đơn vị định lượng và Trạng thái so sánh)', 85, '{"stage_level": "N3", "coverage": "Chương 7 ~ 9", "total_questions": 20, "questions": [{"q": "友人の結婚式に出席して祝福しました。", "target": "結婚式", "answer": "けっこんしき", "options": ["けっこんしき", "けつこんしき", "むすびしき", "けっこんほう"]}, {"q": "友人と交わした約束を必ず守ります。", "target": "約束", "answer": "やくそく", "options": ["やくそく", "やくたば", "やくそん", "やくぞく"]}, {"q": "事件に関係する書類を集めています。", "target": "関係", "answer": "かんけい", "options": ["かんけい", "かんかかり", "せきけい", "かんしょう"]}, {"q": "この問題は単純に見えて実は複雑です。", "target": "単純", "answer": "たんじゅん", "options": ["たんじゅん", "ひとじゅん", "たんすい", "だんじゅん"]}, {"q": "18歳未満の入場は禁止されています。", "target": "未満", "answer": "みまん", "options": ["みまん", "いまん", "ひまん", "むまん"]}, {"q": "将来のために毎月＿＿＿をしています。", "target": "ちょきん", "answer": "貯金", "options": ["貯金", "預金", "積金", "蓄金"]}, {"q": "書類に＿＿＿を丁寧に記入してください。", "target": "せいめい", "answer": "姓名", "options": ["姓名", "性名", "生名", "姓字"]}, {"q": "そんな＿＿＿な計画には反対です。", "target": "むり", "answer": "無理", "options": ["無理", "非理", "不理", "無用"]}, {"q": "クラスの仲良しグループで＿＿＿した。", "target": "りょこう", "answer": "旅行", "options": ["旅行", "旅向", "遊行", "訪行"]}, {"q": "二人の末長い＿＿＿を心から祈ります。", "target": "こうふく", "answer": "幸福", "options": ["幸福", "幸運", "祝福", "慶福"]}]}', 8, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(9, 'Achievement Test 3 (Chương 10 ~ 13) & Midterm Test (1 ~ 11)', 'Đề thi kiểm tra 78 chữ Hán Chặng 3 (Trường học, Thi cử, Tiết học, Địa cầu địa lý tự nhiên) kèm 50 câu Midterm Test nửa đầu N3', 85, '{"stage_level": "N3", "coverage": "Chương 10 ~ 13 & Midterm Ch 1~11", "total_questions": 25, "questions": [{"q": "今年から小学校の担任になりました。", "target": "担任", "answer": "たんにん", "options": ["たんにん", "かつにん", "たんとう", "たんば"]}, {"q": "希望の大学に進学することが夢です。", "target": "希望", "answer": "きぼう", "options": ["きぼう", "けぼう", "きのぞみ", "きほう"]}, {"q": "先生が文法の使い方を詳しく解説した。", "target": "解説", "answer": "かいせつ", "options": ["かいせつ", "ときあかし", "かいとく", "げせつ"]}, {"q": "北極には巨大な氷河が広がっています。", "target": "氷河", "answer": "ひょうが", "options": ["ひょうが", "こおりがわ", "こおりかわ", "ひょうかわ"]}, {"q": "地球上には多種多様な生物が存在します。", "target": "存在", "answer": "そんざい", "options": ["そんざい", "ぞんざい", "そんあり", "ありざい"]}, {"q": "図書館で本を3＿＿＿借りました。", "target": "さつ", "answer": "冊", "options": ["冊", "本", "枚", "部"]}, {"q": "明日のアルバイトの＿＿＿に向けて準備します。", "target": "めんせつ", "answer": "面接", "options": ["面接", "接見", "面試", "試問"]}, {"q": "来年3月に大学を＿＿＿する予定です。", "target": "そつぎょう", "answer": "卒業", "options": ["卒業", "修業", "学業", "卒校"]}, {"q": "日本はたくさんの＿＿＿でできている国です。", "target": "しま", "answer": "島", "options": ["島", "陸", "岸", "坂"]}, {"q": "急な＿＿＿を自転車で力いっぱい登った。", "target": "さかみち", "answer": "坂道", "options": ["坂道", "阪道", "阪路", "板道"]}]}', 9, NOW());
INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES
(10, 'Achievement Test 4 (Chương 14 ~ 20) & Kỳ thi Tốt Nghiệp Toàn Diện N3', 'Kỳ thi Tốt Nghiệp Toàn Diện N3 bao quát toàn bộ 376 chữ Hán, ngữ cảnh du lịch, giao thông, doanh nghiệp, hội nghị, ngân sách, công nghiệp và pháp luật', 85, '{"stage_level": "N3", "coverage": "Chương 14 ~ 20 Toàn Diện N3", "total_questions": 35, "questions": [{"q": "海外旅行の準備をそろそろ始めましょう。", "target": "準備", "answer": "じゅんび", "options": ["じゅんび", "じゅんひ", "そろえび", "ちゅんび"]}, {"q": "交差点を右に曲がってまっすぐ進みます。", "target": "曲がって", "answer": "まがって", "options": ["まがって", "おって", "ころんで", "たおれて"]}, {"q": "大学を卒業して就職活動を始めました。", "target": "就職", "answer": "しゅうしょく", "options": ["しゅうしょく", "じゅしょく", "しゅうしょ", "しゅうしき"]}, {"q": "仕事でトラブルがあったら上司に相談します。", "target": "相談", "answer": "そうだん", "options": ["そうだん", "しょうだん", "あいたん", "あいだん"]}, {"q": "最新の機械を導入して生産効率を高める。", "target": "機械", "answer": "きかい", "options": ["きかい", "きき", "はたかい", "きぎ"]}, {"q": "国民は国の法律や規則を守る義務があります。", "target": "法律", "answer": "ほうりつ", "options": ["ほうりつ", "ほうりち", "ほうき", "ほうしょ"]}, {"q": "警察が事件の容疑者を逮捕しました。", "target": "容疑者", "answer": "ようぎしゃ", "options": ["ようぎしゃ", "いぎしゃ", "ようぎにん", "ようさいしゃ"]}, {"q": "来年度の事業＿＿＿を計算しています。", "target": "よさん", "answer": "予算", "options": ["予算", "預算", "予定算", "計算法"]}, {"q": "外国との＿＿＿が活発に行われています。", "target": "ぼうえき", "answer": "貿易", "options": ["貿易", "商易", "商売", "買易"]}, {"q": "雨の日は滑りやすいので足元に＿＿＿してください。", "target": "ちゅうい", "answer": "注意", "options": ["注意", "注心", "注重", "警意"]}]}', 10, NOW());