-- =============================================================================
-- Flyway Migration: V5 - Seed Kanjis into Supabase PostgreSQL
-- =============================================================================

ALTER TABLE kanjis DROP CONSTRAINT IF EXISTS kanjis_jlpt_level_check;
DELETE FROM kanjis;

INSERT INTO kanjis (
    character, on_reading, kun_reading, romaji, han_viet, meaning,
    stroke_count, stroke_guide, radical, related_words,
    example_sentence, example_romaji, example_meaning,
    jlpt_level, created_at
) VALUES
('一', 'イチ', 'ひと・つ', 'ichi', 'NHẤT', 'Số 1, một', 1, '一 nét ngang từ trái sang phải', '一', '一つ, 一人', '一つください。', 'Hitotsu kudasai.', 'Cho tôi 1 cái.', 'STARTER', NOW()),
('二', 'ニ', 'ふた・つ', 'ni', 'NHỊ', 'Số 2, hai', 2, 'Nét ngắn trên, nét dài dưới', '二', '二時, 二人', '二時にお会いしましょう。', 'Niji ni oaishimashou.', 'Gặp lúc 2 giờ nhé.', 'STARTER', NOW()),
('三', 'サン', 'みっ・つ', 'san', 'TAM', 'Số 3, ba', 3, '3 nét ngang cân đối', '一', '三月, 三人', '三人で食べます。', 'Sannin de tabemasu.', '3 người ăn cơm.', 'STARTER', NOW()),
('四', 'シ', 'よん / よっ・つ', 'yon', 'TỨ', 'Số 4, bốn', 5, 'Khung ngoài bao 2 nét trong', '囗', '四月, 四季', '四季が綺麗です。', 'Shiki ga kirei desu.', 'Bốn mùa tươi đẹp.', 'STARTER', NOW()),
('五', 'ゴ', 'いつ・つ', 'go', 'NGŨ', 'Số 5, năm', 4, 'Nét ngang, nét sổ gập, nét đáy', '二', '五月, 五人', '五月は天気がいいです。', 'Gogatsu wa tenki ga ii desu.', 'Tháng 5 thời tiết đẹp.', 'STARTER', NOW()),
('六', 'ロク', 'むっ・つ', 'roku', 'LỤC', 'Số 6, sáu', 4, 'Chấm trên, nét ngang, 2 nét dưới', '八', '六月, 六人', '六時に起きます。', 'Rokuji ni okimasu.', 'Dậy lúc 6 giờ.', 'STARTER', NOW()),
('七', 'シチ', 'なな・つ', 'nana', 'THẤT', 'Số 7, bảy', 2, 'Nét ngang cắt nét sổ cong', '一', '七月, 七人', '七時に食べます。', 'Nanaji ni tabemasu.', 'Ăn lúc 7 giờ.', 'STARTER', NOW()),
('八', 'ハチ', 'やっ・つ', 'hachi', 'BÁT', 'Số 8, tám', 2, 'Nét phẩy trái, nét mác phải', '八', '八月, 八人', '八月は夏休みです。', 'Hachigatsu wa natsuyasumi desu.', 'Tháng 8 là nghỉ hè.', 'STARTER', NOW()),
('九', 'キュウ / ク', 'ここの・つ', 'kyuu', 'CỬU', 'Số 9, chín', 2, 'Nét phẩy trái, nét ngang gập móc', '乙', '九月, 九人', '九月に始まります。', 'Kugatsu ni hajimarimasu.', 'Bắt đầu vào tháng 9.', 'STARTER', NOW()),
('十', 'ジュウ', 'とお', 'juu', 'THẬP', 'Số 10, mười', 2, 'Nét ngang + nét sổ dọc', '十', '十月, 十分', '十分待ちました。', 'Juppun machimashita.', 'Đợi 10 phút.', 'STARTER', NOW()),
('百', 'ヒャク', 'もも', 'hyaku', 'BÁCH', 'Số 100, một trăm', 6, 'Nét ngang trên + chữ Bạch', '白', '百円, 百貨店', '百円玉を使います。', 'Hyakuen dama o tsukaimasu.', 'Dùng đồng xu 100 Yên.', 'STARTER', NOW()),
('千', 'セン', 'ち', 'sen', 'THIÊN', 'Số 1.000, một nghìn', 3, 'Nét phẩy trên + chữ Thập', '十', '千円, 三千', '千円札を出します。', 'Sen-en satsu o dashimasu.', 'Đưa tờ 1.000 Yên.', 'STARTER', NOW()),
('万', 'マン / バン', 'よろず', 'man', 'VẠN', '10.000, một vạn', 3, 'Nét ngang + nét gập móc + nét phẩy', '一', '一万円, 万国', '一万円を両替します。', 'Ichiman-en o ryougae shimasu.', 'Đổi 10.000 Yên.', 'STARTER', NOW()),
('円', 'エン', 'まる・い', 'en', 'VIÊN', 'Đồng Yên, hình tròn', 4, 'Khung ngoài + 2 nét trong', '冂', '千円, 円高', 'これは千円です。', 'Kore wa sen-en desu.', 'Cái này 1000 Yên.', 'STARTER', NOW()),
('人', 'ジン / ニン', 'ひと', 'hito', 'NHÂN', 'Con người, người', 2, 'Nét phẩy trái + nét mác phải', '人', '日本人, 人生', 'あの人は優しい先生です。', 'Ano hito wa yasashii sensei desu.', 'Người đó là thầy giáo hiền lành.', 'STARTER', NOW()),
('水', 'スイ', 'みず', 'mizu', 'THỦY', 'Nước, nước uống', 4, 'Nét móc giữa + nét gập trái + 2 nét phải', '水', '水曜日, お水', '冷たい水を飲みます。', 'Tsumetai mizu o nomimasu.', 'Uống nước mát lạnh.', 'STARTER', NOW()),
('火', 'カ', 'ひ', 'hi', 'HỎA', 'Ngọn lửa, ngày thứ ba', 4, '2 chấm + nét phẩy giữa + nét mác', '火', '火曜日, 花火', '火曜日にテストがあります。', 'Kayoubi ni tesuto ga arimasu.', 'Thứ ba có kiểm tra.', 'STARTER', NOW()),
('木', 'モク / ボク', 'き', 'ki', 'MỘC', 'Cây cối, gỗ', 4, 'Nét ngang + sổ dọc + 2 nét xiên', '木', '木曜日, 大木', '大きな木の下で休みます。', 'Ookina ki no shita de yasumimasu.', 'Nghỉ dưới gốc cây to.', 'STARTER', NOW()),
('本', 'ホン', 'もと', 'hon', 'BẢN', 'Quyển sách, nguồn gốc', 5, 'Chữ Mộc thêm nét ngang chân', '木', '日本, 本屋', '毎日日本語の本を読みます。', 'Mainichi nihongo no hon o yomimasu.', 'Mỗi ngày đọc sách tiếng Nhật.', 'STARTER', NOW()),
('猫', 'ビョウ', 'ねこ', 'neko', 'MIÊU', 'Con mèo', 11, 'Bộ Khuyển trái + chữ Miêu phải', '犬', '愛猫, 子猫', '可愛い猫が寝ています。', 'Kawaii neko ga nete imasu.', 'Mèo con đang ngủ.', 'STARTER', NOW()),
('犬', 'ケン', 'いぬ', 'inu', 'KHUYỂN', 'Con chó', 4, 'Chữ Đại thêm dấu chấm trên phải', '犬', '子犬, 番犬', '白い犬と散歩します。', 'Shiroi inu to sanpo shimasu.', 'Đi dạo với cún trắng.', 'STARTER', NOW()),
('山', 'サン', 'やま', 'yama', 'SƠN', 'Ngọn núi', 3, 'Nét giữa cao + 2 nét hai bên', '山', '富士山, 火山', '富士山は日本一高い山です。', 'Fujisan wa Nihon ichi takai yama desu.', 'Núi Phú Sĩ là núi cao nhất.', 'STARTER', NOW()),
('川', 'セン', 'かわ', 'kawa', 'XUYÊN', 'Dòng sông', 3, '3 nét dọc uốn lượn', '川', '小川, 河川', '川の水がとても綺麗です。', 'Kawa no mizu ga totemo kirei desu.', 'Nước sông rất trong xanh.', 'STARTER', NOW()),
('花', 'カ', 'はな', 'hana', 'HOA', 'Bông hoa, hoa tươi', 7, 'Bộ Thảo trên + chữ Hóa dưới', '艸', '花火, 生花', '公園に花が咲いています。', 'Kouen ni hana ga saite imasu.', 'Hoa nở trong công viên.', 'STARTER', NOW()),
('車', 'シャ', 'くるま', 'kuruma', 'XA', 'Xe hơi, ô tô', 7, 'Nét ngang + thùng xe + trục dọc', '車', '電車, 車庫', '新しい車を買いました。', 'Atarashii kuruma o kaimashita.', 'Mua xe mới.', 'STARTER', NOW()),
('雨', 'ウ', 'あめ', 'ame', 'VŨ', 'Cơn mưa, trời mưa', 8, 'Mái che + khung chữ nhật + 4 giọt nước', '雨', '大雨, 雨季', '朝から雨が降っています。', 'Asa kara ame ga futte imasu.', 'Mưa từ sáng.', 'STARTER', NOW()),
('日', 'ニチ / ジツ', 'ひ / か', 'hi / nichi', 'NHẬT', 'Mặt trời, ngày', 4, 'Khung chữ nhật nét ngang giữa', '日', '日本, 毎日', '日曜日に友達と遊びます。', 'Nichiyoubi ni tomodachi to asobimasu.', 'Chủ nhật đi chơi với bạn.', 'N5', NOW()),
('月', 'ゲツ / ガツ', 'つき', 'tsuki / getsu', 'NGUYỆT', 'Mặt trăng, tháng', 4, 'Nét phẩy + nét sổ móc + 2 nét trong', '月', '今月, 月曜日', '今夜は月が綺麗です。', 'Kon-ya wa tsuki ga kirei desu.', 'Tối nay trăng tròn rất đẹp.', 'N5', NOW()),
('学', 'ガク', 'まな・ぶ', 'gaku / manabu', 'HỌC', 'Học tập, trường học', 8, '3 chấm + mái che + chữ Tử', '子', '学校, 学生', '大学で勉強しています。', 'Daigaku de benkyou shite imasu.', 'Học tập ở trường đại học.', 'N5', NOW()),
('食', 'ショク', 'た・べる', 'taberu / shoku', 'THỰC', 'Ăn, thực phẩm', 9, 'Nón trên + bộ Cấn dưới', '食', '食事, 食べる', '朝ごはんをしっかり食べます。', 'Asagohan o shikkari tabemasu.', 'Ăn sáng đầy đủ.', 'N5', NOW()),
('友', 'ユウ', 'とも', 'tomo / yuu', 'HỮU', 'Bạn bè, tình bạn', 4, 'Nét ngang + phẩy + chữ Hựu', '又', '友達, 友人', '友達と一緒に旅行へ行きます。', 'Tomodachi to issho ni ryokou e ikimasu.', 'Đi du lịch với bạn bè.', 'N5', NOW()),
('旅', 'リョ', 'たび', 'tabi / ryo', 'LỮ', 'Chuyến đi, du lịch', 10, 'Bộ Phương trái + bộ Nhân phụ phải', '方', '旅行, 旅人', '日本へ旅行に行きます。', 'Nihon e ryokou ni ikimasu.', 'Đi du lịch Nhật Bản.', 'N4', NOW()),
('店', 'テン', 'みせ', 'mise / ten', 'ĐIẾM', 'Cửa hàng, tiệm', 8, 'Bộ Quảng trên + chữ Chiếm trong', '广', '店員, 喫茶店', 'この店の料理は美味しいです。', 'Kono mise no ryouri wa oishii desu.', 'Món ăn tiệm này rất ngon.', 'N4', NOW());
