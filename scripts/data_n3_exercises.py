# -*- coding: utf-8 -*-
"""
Kanji Master N3 - Exercises, Minigames & Achievement Tests Definition
Contains:
- CHAPTER_EXERCISES (20 chapters x 5 questions = 100 questions)
- CHAPTER_MINIGAMES (Rich interactive situation challenges linked to extracted scans)
- ACHIEVEMENT_TESTS_DATA (Stages 7, 8, 9, 10 + Midterm & Final Graduation)
"""

import json

# ==============================================================================
# 1. BÀI TẬP ÔN TẬP CHƯƠNG (ふくしゅう) — 20 CHƯƠNG KANJI MASTER N3
# ==============================================================================
CHAPTER_EXERCISES = {
    1: [
        ('READING', '天気がいいので、洗濯物をベランダに干しました。', '洗濯物', 'せんたくもの', ['せんたくもの', 'あらいたくもの', 'せんだくもの', 'そうじもの'], 'Chữ 洗 (TẨY) + 濯 (TRẠC) + 物 (VẬT) đọc là せんたくもの (quần áo giặt).', 1),
        ('READING', 'この地域では、火曜日に燃えるゴミを出します。', '燃えるゴミ', 'もえるゴミ', ['もえるゴミ', 'きえるゴミ', 'ねるゴミ', 'たけるゴミ'], 'Động từ 燃える đọc là もえる (cháy được).', 2),
        ('READING', '明日の午後、重要な予定が入っています。', '予定', 'よてい', ['よてい', 'よち', 'よじょう', 'みてい'], 'Chữ 予 (DỰ) + 定 (ĐỊNH) đọc là よてい (dự định, kế hoạch).', 3),
        ('WRITING', 'こうえんで さいふを ひろいました。', 'ひろいました', '拾いました', ['拾いました', '捨ました', '探しました', '落としました'], 'Nhặt lên là động từ 拾う (THẬP) -> 拾いました.', 4),
        ('WRITING', 'かいぎの ようじで おおさかへ 行きます。', 'ようじ', '用事', ['用事', '要事', '用時', '予事'], 'Công chuyện, việc bận là 用 (DỤNG) + 事 (SỰ) -> 用事.', 5),
    ],
    2: [
        ('READING', 'ドアの取っ手を押しても開きません。', '押して', 'おして', ['おして', 'ひいて', 'とって', 'けして'], 'Động từ 押す đọc là おす (ấn, đẩy).', 1),
        ('READING', '駅の階段を急いで駆け上がりました。', '階段', 'かいだん', ['かいだん', 'きざはし', 'だんかい', 'かいちょう'], 'Chữ 階 (GIAI) + 段 (ĐOẠN) đọc là かいだん (cầu thang).', 2),
        ('READING', '庭に新しい木を植えました。', '植えました', 'うえました', ['うえました', 'たてました', 'まきました', 'とりました'], 'Động từ 植える đọc là うえる (trồng cây).', 3),
        ('WRITING', 'へやの まどを あけて かんきします。', 'まど', '窓', ['窓', '戸', '門', '扉'], 'Cửa sổ là chữ 窓 (SONG).', 4),
        ('WRITING', '新しい ビルの けんせつが はじまりました。', 'けんせつ', '建設', ['建設', '建築', '設計', '建物'], 'Xây dựng, kiến thiết là 建 (KIẾN) + 設 (THIẾT) -> 建設.', 5),
    ],
    3: [
        ('READING', 'フライパンの温度が上がるまで待ちます。', '温度', 'おんど', ['おんど', 'おんたく', 'あつど', 'ねつど'], 'Chữ 温 (ÔN) + 度 (ĐỘ) đọc là おんど (nhiệt độ).', 1),
        ('READING', 'ケーキの材料として小麦粉と卵を買いました。', '材料', 'ざいりょう', ['ざいりょう', 'ざいりょ', 'もくりょう', 'さつりょう'], 'Chữ 材 (TÀI) + 料 (LIỆU) đọc là ざいりょう (nguyên liệu).', 2),
        ('READING', 'この料理には少量の塩を加えてください。', '少量', 'しょうりょう', ['しょうりょう', 'すくりょう', 'しょうりょ', 'こりょう'], 'Chữ 少 (THIỂU) + 量 (LƯỢNG) đọc là しょうりょう (lượng nhỏ).', 3),
        ('WRITING', 'スープが さめないうちに めしあがってください。', 'さめない', '冷めない', ['冷めない', '温めない', '熱めない', '凍めない'], 'Nguội đi là động từ 冷める (LÃNH) -> 冷めない.', 4),
        ('WRITING', 'ぎゅうにゅうを コップに いっぱいのんだ。', 'ぎゅうにゅう', '牛乳', ['牛乳', '豆乳', '粉乳', '母乳'], 'Sữa bò là 牛 (NGƯU) + 乳 (NHŨ) -> 牛乳.', 5),
    ],
    4: [
        ('READING', '風邪を引いて激しい頭痛がします。', '頭痛', 'ずつう', ['ずつう', 'とうつう', 'あたまいた', 'ずとう'], 'Chữ 頭 (ĐẦU) + 痛 (THỐNG) đọc là ずつう (đau đầu).', 1),
        ('READING', '深く息を吸って、ゆっくり吐いてください。', '吸って', 'すって', ['すって', 'ふいて', 'はいて', 'よんで'], 'Động từ 吸う đọc là すう (hít vào).', 2),
        ('READING', '健康診断で血液の検査を受けました。', '検査', 'けんさ', ['けんさ', 'けんざ', 'しんさ', 'けんちょう'], 'Chữ 検 (KIỂM) + 査 (TRA) đọc là けんさ (kiểm tra, xét nghiệm).', 3),
        ('WRITING', 'きゅうきゅうしゃを すぐに よんでください。', 'きゅうきゅうしゃ', '救急車', ['救急車', '急救車', '救援車', '救護車'], 'Xe cứu thương cấp cứu là 救 (CỨU) + 急 (CẤP) + 車 (XA) -> 救急車.', 4),
        ('WRITING', 'けがをした てに ほうたいを まきました。', 'ほうたい', '包帯', ['包帯', '包布', '布帯', '帯包'], 'Băng gạc vết thương là 包 (BAO) + 帯 (ĐỚI) -> 包帯.', 5),
    ],
    5: [
        ('READING', '決勝戦でライバルに勝ちました。', '勝負', 'しょうぶ', ['しょうぶ', 'かちまけ', 'しょうふ', 'せいふ'], 'Chữ 勝 (THẮNG) + 負 (PHỤ) đọc là しょうぶ (thắng bại, trận đấu).', 1),
        ('READING', '大会で素晴らしい新記録を達成しました。', '記録', 'きろく', ['きろく', 'きりょく', 'しるく', 'きほう'], 'Chữ 記 (KÝ) + 録 (LỤC) đọc là きろく (kỷ lục, ghi chép).', 2),
        ('READING', 'サッカー日本代表のメンバーが発表された。', '代表', 'だいひょう', ['だいひょう', 'たいひょう', 'だいおもて', 'だいわ'], 'Chữ 代 (ĐẠI) + 表 (BIỂU) đọc là だいひょう (đại diện).', 3),
        ('WRITING', 'ぜんこくたいかいで みごと ゆうしょうした。', 'ゆうしょう', '優勝', ['優勝', '優賞', '優勝者', '勝賞'], 'Vô địch, giải nhất là 優 (ƯU) + 勝 (THẮNG) -> 優勝.', 4),
        ('WRITING', 'ピッチャーが すばらしい たまを なげた。', 'なげた', '投げた', ['投げた', '打った', '蹴った', '取った'], 'Ném bóng là động từ 投げる (ĐẦU) -> 投げた.', 5),
    ],
    6: [
        ('READING', '相手の気持ちに深く同情しました。', '同情', 'どうじょう', ['どうじょう', 'どうせい', 'どうこころ', 'おなじじょう'], 'Chữ 同 (ĐỒNG) + 情 (TÌNH) đọc là どうじょう (đồng cảm, trắc ẩn).', 1),
        ('READING', '試合に負けて本当に残念です。', '残念', 'ざんねん', ['ざんねん', 'のこりねん', 'さんねん', 'ざんしん'], 'Chữ 残 (TÀN) + 念 (NIỆM) đọc là ざんねん (tiếc nuối).', 2),
        ('READING', '彼女の優しい言葉に涙が出ました。', '涙', 'なみだ', ['なみだ', 'あせ', 'ち', 'つゆ'], 'Chữ 涙 (LỆ) đọc Kun là なみだ (nước mắt).', 3),
        ('WRITING', 'かれの ことばを こころから しんじています。', 'しんじて', '信じて', ['信じて', '想じて', '願じて', '念じて'], 'Tin tưởng là động từ 信じる (TÍN) -> 信じて.', 4),
        ('WRITING', 'しんろのことで ふかく なやんでいます。', 'なやんで', '悩んで', ['悩んで', '苦んで', '困んで', '悲んで'], 'Trăn trở, phiền não là động từ 悩む (NÃO) -> 悩んで.', 5),
    ],
    7: [
        ('READING', '友人の結婚式に出席しました。', '結婚式', 'けっこんしき', ['けっこんしき', 'けつこんしき', 'むすびしき', 'けっこんほう'], 'Chữ 結 (KẾT) + 婚 (HÔN) + 式 (THỨC) đọc là けっこんしき.', 1),
        ('READING', '将来のために毎月貯金をしています。', '貯金', 'ちょきん', ['ちょきん', 'たくがね', 'ちょかね', 'たまりきん'], 'Chữ 貯 (TRỮ) + 金 (KIM) đọc là ちょきん (tiết kiệm tiền).', 2),
        ('READING', '友人と交わした約束を必ず守ります。', '約束', 'やくそく', ['やくそく', 'やくたば', 'やくそん', 'やくぞく'], 'Chữ 約 (ƯỚC) + 束 (THÚC) đọc là やくそく (lời hứa).', 3),
        ('WRITING', 'ともだちの しょうかいで かれに であいました。', 'しょうかい', '紹介', ['紹介', '招待', '案内', '介添'], 'Giới thiệu là 紹 (THIỆU) + 介 (GIỚI) -> 紹介.', 4),
        ('WRITING', 'ふたりの すえながい こうふくを いのります。', 'こうふく', '幸福', ['幸福', '幸運', '祝福', '祝福'], 'Hạnh phúc là 幸 (HẠNH) + 福 (PHÚC) -> 幸福.', 5),
    ],
    8: [
        ('READING', '事件に関係する書類を集めています。', '関係', 'かんけい', ['かんけい', 'かんかかり', 'せきけい', 'かんしょう'], 'Chữ 関 (QUAN) + 係 (HỆ) đọc là かんけい (quan hệ, liên quan).', 1),
        ('READING', '山田さんには高校生の娘さんがいます。', '娘', 'むすめ', ['むすめ', 'むすこ', 'おんなのこ', 'あね'], 'Chữ 娘 (NƯƠNG) đọc Kun là むすめ (con gái ruột).', 2),
        ('READING', '書類に姓名を記入してください。', '姓名', 'せいめい', ['せいめい', 'しょうめい', 'なまえ', 'かばねな'], 'Chữ 姓 (TÍNH) + 名 (DANH) đọc là せいめい (họ tên).', 3),
        ('WRITING', 'クラスの なかよし グループで りょこうした。', 'なかよし', '仲良し', ['仲良し', '友良し', '親良し', '人良し'], 'Thân thiết, chơi thân là 仲 (TRỌNG) + 良 (LƯƠNG) -> 仲良し.', 4),
        ('WRITING', 'ひさしぶりに ふるさとの ともだちに あった。', 'ひさしぶり', '久しぶり', ['久しぶり', '再しぶり', '初しぶり', '旧しぶり'], 'Lâu ngày không gặp là 久 (CỬU) -> 久しぶり.', 5),
    ],
    9: [
        ('READING', 'この問題は単純に見えて実は複雑です。', '単純', 'たんじゅん', ['たんじゅん', 'ひとじゅん', 'たんすい', 'だんじゅん'], 'Chữ 単 (ĐƠN) + 純 (THUẦN) đọc là たんじゅん (đơn thuần, đơn giản).', 1),
        ('READING', '18歳未満の入場は禁止されています。', '未満', 'みまん', ['みまん', 'いまん', 'ひまん', 'むまん'], 'Chữ 未 (VỊ) + 満 (MÃN) đọc là みまん (chưa đủ, dưới mốc).', 2),
        ('READING', '全体の意見をまとめて報告書を作ります。', '全体', 'ぜんたい', ['ぜんたい', 'まったいたい', 'すべたい', 'ぜんからだ'], 'Chữ 全 (TOÀN) + 体 (THỂ) đọc là ぜんたい (toàn thể).', 3),
        ('WRITING', 'そんな むりな けいかくは はんたいです。', 'むり', '無理', ['無理', '非理', '不理', '無用'], 'Vô lý, quá sức là 無 (VÔ) + 理 (LÝ) -> 無理.', 4),
        ('WRITING', '20さい いじょうの かたが さんかできます。', 'いじょう', '以上', ['以上', '以後', '已上', '以超'], 'Trở lên là 以 (DĨ) + 上 (THƯỢNG) -> 以上.', 5),
    ],
    10: [
        ('READING', '今年から小学校の担任になりました。', '担任', 'たんにん', ['たんにん', 'かつにん', 'たんとう', 'たんば'], 'Chữ 担 (ĐẢM) + 任 (NHIỆM) đọc là たんにん (chủ nhiệm).', 1),
        ('READING', '図書館で本を3冊借りました。', '3冊', 'さんさつ', ['さんさつ', 'さんほん', 'さんまい', 'さんぶ'], 'Chữ 冊 (SÁCH) đếm sách vở đọc là さつ -> さんさつ.', 2),
        ('READING', '黒板の文字をノートに書き写します。', '黒板', 'こくばん', ['こくばん', 'くろいた', 'くろばん', 'こくいた'], 'Chữ 黒 (HẮC) + 板 (BẢN) đọc là こくばん (bảng đen).', 3),
        ('WRITING', 'ぶんぼうぐやで えんぴつと ふでばこを かった。', 'ふでばこ', '筆箱', ['筆箱', '文箱', '箱筆', '筆具'], 'Hộp đựng bút là 筆 (BÚT) + 箱 (TƯƠNG) -> 筆箱.', 4),
        ('WRITING', 'かりた ほんは きげんまでに かえしてください。', 'かえして', '返して', ['返して', '貸して', '出して', '戻して'], 'Trả lại là động từ 返す (PHẢN) -> 返して.', 5),
    ],
    11: [
        ('READING', '希望の大学に進学することが夢です。', '希望', 'きぼう', ['きぼう', 'けぼう', 'きのぞみ', 'きほう'], 'Chữ 希 (HY) + 望 (VỌNG) đọc là きぼう (nguyện vọng, hy vọng).', 1),
        ('READING', '明日のアルバイトの面接に向けて準備します。', '面接', 'めんせつ', ['めんせつ', 'おもせつ', 'めんつぎ', 'めんしょう'], 'Chữ 面 (DIỆN) + 接 (TIẾP) đọc là めんせつ (phỏng vấn).', 2),
        ('READING', 'クラスのテストの平均点を計算しました。', '平均点', 'へいきんてん', ['へいきんてん', 'たいきんてん', 'へいいんてん', 'ひょうきんてん'], 'Chữ 平 (BÌNH) + 均 (QUÂN) + 点 (ĐIỂM) đọc là へいきんてん.', 3),
        ('WRITING', 'まいあさ のみものの おんどを ちょうさします。', 'ちょうさ', '調査', ['調査', '調査', '調選', '検調'], 'Điều tra, khảo sát là 調 (ĐIỀU) + 査 (TRA) -> 調査.', 4),
        ('WRITING', 'どりょくの けっか せいせきが あがりました。', 'せいせき', '成績', ['成績', '成積', '生績', '成試'], 'Thành tích là 成 (THÀNH) + 績 (TÍCH) -> 成績.', 5),
    ],
    12: [
        ('READING', '来年3月に大学を卒業する予定です。', '卒業', 'そつぎょう', ['そつぎょう', 'しゅうぎょう', 'そちぎょう', 'そっこう'], 'Chữ 卒 (TỐT) + 業 (NGHIỆP) đọc là そつぎょう (tốt nghiệp).', 1),
        ('READING', '先生が文法の使い方を詳しく解説した。', '解説', 'かいせつ', ['かいせつ', 'ときあかし', 'かいとく', 'げせつ'], 'Chữ 解 (GIẢI) + 説 (THUYẾT) đọc là かいせつ (giải thích).', 2),
        ('READING', '毎日の努力の積み重ねが成功につながる。', '努力', 'どりょく', ['どりょく', 'つとめりょく', 'どりき', 'とうりょく'], 'Chữ 努 (NỖ) + 力 (LỰC) đọc là どりょく (nỗ lực).', 3),
        ('WRITING', 'かぜを ひいて じゅぎょうを けっせきしました。', 'けっせき', '欠席', ['欠席', '欠席', '休席', '退席'], 'Vắng mặt, nghỉ học là 欠 (KHIẾM) + 席 (TỊCH) -> 欠席.', 4),
        ('WRITING', 'あたらしく ならった かんじを しっかり おぼえる。', 'おぼえる', '覚える', ['覚える', '忘れる', '知える', '記える'], 'Ghi nhớ là động từ 覚える (GIÁC).', 5),
    ],
    13: [
        ('READING', '地球上には多種多様な生物が存在します。', '存在', 'そんざい', ['そんざい', 'ぞんざい', 'そんあり', 'ありざい'], 'Chữ 存 (TỒN) + 在 (TẠI) đọc là そんざい (tồn tại).', 1),
        ('READING', '北極には巨大な氷河が広がっています。', '氷河', 'ひょうが', ['ひょうが', 'こおりがわ', 'こおりかわ', 'ひょうかわ'], 'Chữ 氷 (BĂNG) + 河 (HÀ) đọc là ひょうが (sông băng).', 2),
        ('READING', 'この海岸は遠浅で子どもでも泳げます。', '海岸', 'かいがん', ['かいがん', 'うみきし', 'うみがん', 'かいきし'], 'Chữ 海 (HẢI) + 岸 (NGẠN) đọc là かいがん (bờ biển).', 3),
        ('WRITING', 'にほんは たくさんの しまで できている くにです。', 'しま', '島', ['島', '陸', '岸', '坂'], 'Hòn đảo là chữ 島 (ĐẢO).', 4),
        ('WRITING', 'きゅうな さかみちを じてんしゃで のぼった。', 'さかみち', '坂道', ['坂道', '阪道', '阪路', '板道'], 'Con đường dốc là 坂 (PHẢN) + 道 (ĐẠO) -> 坂道.', 5),
    ],
    14: [
        ('READING', '海外旅行の準備をそろそろ始めましょう。', '準備', 'じゅんび', ['じゅんび', 'じゅんひ', 'そろえび', 'ちゅんび'], 'Chữ 準 (CHUẨN) + 備 (BỊ) đọc là じゅんび (chuẩn bị).', 1),
        ('READING', '京都の有名な寺院を観光して回りました。', '観光', 'かんこう', ['かんこう', 'みひかり', 'かんひかり', 'こうかん'], 'Chữ 観 (QUAN) + 光 (QUANG) đọc là かんこう (tham quan du lịch).', 2),
        ('READING', '温泉旅館に一泊してのんびり過ごしました。', '一泊', 'いっぱく', ['いっぱく', 'いちはく', 'ひととまり', 'いちどまり'], 'Chữ 泊 (BẠC) đếm đêm trọ: 1 đêm đọc là いっぱく.', 3),
        ('WRITING', 'くうこうで がいこくの おきゃくさまを でむかえる。', 'でむかえる', '出迎える', ['出迎える', '迎える', '訪ねる', '見送る'], 'Ra đón tiếp là 出 (XUẤT) + 迎 (NGHÊNH) -> 出迎える.', 4),
        ('WRITING', 'じんじゃで おまつりが おこなわれました。', 'おまつり', 'お祭り', ['お祭り', 'お神り', 'お祝り', 'お仏り'], 'Lễ hội truyền thống là 祭 (TẾ) -> お祭り.', 5),
    ],
    15: [
        ('READING', '交差点を右に曲がってまっすぐ進みます。', '曲がって', 'まがって', ['まがって', 'おって', 'ころんで', 'たおれて'], 'Động từ 曲がる đọc là まがる (rẽ, quẹo).', 1),
        ('READING', '雨の日は滑りやすいので足元に注意してください。', '注意', 'ちゅうい', ['ちゅうい', 'ちゅうこころ', 'ちゅうし', 'そそぎい'], 'Chữ 注 (CHÚ) + 意 (Ý) đọc là ちゅうい (chú ý, cẩn thận).', 2),
        ('READING', '高速道路でトラックの追突事故が起きた。', '追突', 'ついとつ', ['ついとつ', 'おいつき', 'ついづき', 'お突'], 'Chữ 追 (TRUY) + 突 (ĐỘT) đọc là ついとつ (tông xe từ phía sau).', 3),
        ('WRITING', 'つぎの かどを ひだりに まがってください。', 'かど', '角', ['角', '折', '曲', '路'], 'Góc đường là chữ 角 (GIÁC).', 4),
        ('WRITING', 'おおきな かわに かかる はしを わたる。', 'はし', '橋', ['橋', '端', '階', '路'], 'Cây cầu là chữ 橋 (KIỀU).', 5),
    ],
    16: [
        ('READING', '大学を卒業して就職活動を始めました。', '就職', 'しゅうしょく', ['しゅうしょく', 'じゅしょく', 'しゅうしょく', 'しゅうしょ'], 'Chữ 就 (TỰU) + 職 (CHỨC) đọc là しゅうしょく (tìm việc làm).', 1),
        ('READING', '社会人としてビジネスマナーや常識を身につける。', '常識', 'じょうしき', ['じょうしき', 'つねしき', 'じょうち', 'しょうしき'], 'Chữ 常 (THƯỜNG) + 識 (THỨC) đọc là じょうしき (thường thức).', 2),
        ('READING', '毎月の給料から税金が引かれます。', '給料', 'きゅうりょう', ['きゅうりょう', 'きゅうりょ', 'たまりょう', 'あずかりょう'], 'Chữ 給 (CẤP) + 料 (LIỆU) đọc là きゅうりょう (tiền lương).', 3),
        ('WRITING', 'やくそくの じかんに おくれて しつれいしました。', 'しつれい', '失礼', ['失礼', '失敗', '失儀', '失法'], 'Thất lễ, xin lỗi là 失 (THẤT) + 礼 (LỄ) -> 失礼.', 4),
        ('WRITING', 'いっしょうけんめい ろうどうして かぞくを ささえる。', 'ろうどう', '労働', ['労働', '労力', '職員', '仕事'], 'Lao động làm việc là 労 (LAO) + 働 (ĐỘNG) -> 労働.', 5),
    ],
    17: [
        ('READING', '提案された新しい計画に賛成します。', '賛成', 'さんせい', ['さんせい', 'さんじょう', 'はんせい', 'そうせい'], 'Chữ 賛 (TÁN) + 成 (THÀNH) đọc là さんせい (tán thành).', 1),
        ('READING', '仕事でトラブルがあったら上司に相談します。', '相談', 'そうだん', ['そうだん', 'しょうだん', 'あいたん', 'あいだん'], 'Chữ 相 (TƯƠNG) + 談 (ĐÀM) đọc là そうだん (bàn bạc, hỏi ý kiến).', 2),
        ('READING', '事実関係をしっかり確認してください。', '確認', 'かくにん', ['かくにん', 'たしかにん', 'こうにん', 'かっにん'], 'Chữ 確 (XÁC) + 認 (NHẬN) đọc là かくにん (xác nhận).', 3),
        ('WRITING', 'かいぎで じぶんの いけんを のべた。', 'かいぎ', '会議', ['会議', '会談', '協議', '議論'], 'Hội nghị, cuộc họp là 会 (HỘI) + 議 (NGHỊ) -> 会議.', 4),
        ('WRITING', 'しんちょくを じょうしに ほうこくする。', 'ほうこく', '報告', ['報告', '報道', '通知', '案内'], 'Báo cáo công việc là 報 (BÁO) + 告 (CÁO) -> 報告.', 5),
    ],
    18: [
        ('READING', '来年度の事業予算を計算しています。', '予算', 'よさん', ['よさん', 'よざん', 'よすう', 'みていさん'], 'Chữ 予 (DỰ) + 算 (TOÁN) đọc là よさん (ngân sách dự toán).', 1),
        ('READING', '工場の責任者として安全を管理しています。', '管理', 'かんり', ['かんり', 'くだり', 'かんじ', 'けんり'], 'Chữ 管 (QUẢN) + 理 (LÝ) đọc là かんり (quản lý).', 2),
        ('READING', '国の年間予算は何十兆円にも達します。', '兆円', 'ちょうえん', ['ちょうえん', 'おくえん', 'きざしえん', 'じょうえん'], 'Chữ 兆 (TRIỆU = 1.000 tỷ) + 円 đọc là ちょうえん.', 3),
        ('WRITING', 'しょうひしゃは しょうひぜいを はらいます。', 'しょうひぜい', '消費税', ['消費税', '消費費', '消税', '消費金'], 'Thuế tiêu thụ là 消 (TIÊU) + 費 (PHÍ) + 税 (THUẾ) -> 消費税.', 4),
        ('WRITING', 'げんざい とうきょうに すんでいます。', 'げんざい', '現在', ['現在', '現状', '現今', '昔在'], 'Hiện tại bây giờ là 現 (HIỆN) + 在 (TẠI) -> 現在.', 5),
    ],
    19: [
        ('READING', 'この地域では農業と商業が盛んです。', '農業', 'のうぎょう', ['のうぎょう', 'のうごう', 'のうぎょ', 'たぎょう'], 'Chữ 農 (NÔNG) + 業 (NGHIỆP) đọc là のうぎょう (nông nghiệp).', 1),
        ('READING', '最新の機械を導入して生産効率を高める。', '機械', 'きかい', ['きかい', 'きき', 'はたかい', 'きぎ'], 'Chữ 機 (CƠ) + 械 (GIỚI) đọc là きかい (máy móc).', 2),
        ('READING', '工事現場は危険ですから近づかないでください。', '危険', 'きけん', ['きけん', 'あぶけん', 'きげん', '危險'], 'Chữ 危 (NGUY) + 険 (HIỂM) đọc là きけん (nguy hiểm).', 3),
        ('WRITING', 'がいこくとの ぼうえきが かっぱつに おこなわれる。', 'ぼうえき', '貿易', ['貿易', '商易', '貿商', '商売'], 'Ngoại thương mậu dịch là 貿 (MẬU) + 易 (DỊCH) -> 貿易.', 4),
        ('WRITING', 'てんねんの わたで おられた ぬの。', 'ぬの', '布', ['布', '綿', '皮', '織'], 'Vải vóc là chữ 布 (BỐ).', 5),
    ],
    20: [
        ('READING', '国民は国の法律や規則を守る義務があります。', '法律', 'ほうりつ', ['ほうりつ', 'ほうりち', 'ほうき', 'ほうしょ'], 'Chữ 法 (PHÁP) + 律 (LUẬT) đọc là ほうりつ (pháp luật).', 1),
        ('READING', '警察が事件の容疑者を逮捕しました。', '容疑者', 'ようぎしゃ', ['ようぎしゃ', 'いぎしゃ', 'ようぎにん', 'ようさいしゃ'], 'Chữ 容 (DUNG) + 疑 (NGHI) + 者 (GIẢ) đọc là ようぎしゃ (nghi can).', 2),
        ('READING', '館内でのスマートフォンの使用は禁止です。', '禁止', 'きんし', ['きんし', 'きんとどめ', 'むし', 'きんじ'], 'Chữ 禁 (CẤM) + 止 (CHỈ) đọc là きんし (cấm chỉ).', 3),
        ('WRITING', 'しゃかいの あんぜんと ちづをおびやかす はんざい。', 'はんざい', '犯罪', ['犯罪', '犯則', '違反', '重罪'], 'Tội phạm là 犯 (PHẠM) + 罪 (TỘI) -> 犯罪.', 4),
        ('WRITING', 'せんそうに はいたいして へいしたちが ひきあげた。', 'せんそう', '戦争', ['戦争', '争戦', '戦役', '軍戦'], 'Chiến tranh là 戦 (CHIẾN) + 争 (TRANH) -> 戦争.', 5),
    ],
}

# ==============================================================================
# 2. CÂU ĐỐ TÌNH HUỐNG & MINIGAME — N3 AUTHENTIC MINIGAMES
# ==============================================================================
CHAPTER_MINIGAMES = {
    1: [
        ('ORDERING', 'Minigame 1: Lịch trình sinh hoạt & Phân loại rác gia đình', 'Sắp xếp thời gian biểu buổi sáng và quy tắc xử lý rác tái chế chuẩn đời sống Nhật Bản.', '/assets/kanji/n3/illustrations/chap1_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Sắp xếp trình tự công việc buổi sáng: [干す / 起きる / 洗濯する]',
                    'options': ['起きる → 洗濯する → 干す', '洗濯する → 起きる → 干す', '干す → 洗濯する → 起きる', '起きる → 干す → 洗濯する'],
                    'answer': '起きる → 洗濯する → 干す',
                    'explanation': 'Đúng thứ tự sinh hoạt: Thức dậy (起きる) -> Giặt quần áo (洗濯する) -> Đem phơi (干す).'
                },
                {
                    'id': 2,
                    'prompt': 'Phân loại rác: Chai nhựa và hộp giấy thuộc loại rác nào?',
                    'options': ['燃えるゴミ (Rác cháy được)', '燃えないゴミ (Rác không cháy)', '資源ゴミ (Rác tái chế)', '粗大ゴミ (Rác cồng kềnh)'],
                    'answer': '燃えるゴミ (Rác cháy được)',
                    'explanation': 'Rác giấy và vỏ sạch thường xếp vào nhóm 燃えるゴミ hoặc rác tái chế có quy định phân loại rõ ràng.'
                }
            ]
        }, 1)
    ],
    2: [
        ('PICTURE_MATCH', 'Minigame 1: Ô chữ Kanji đời sống & Thiết kế nội thất (クロスワード)', 'Giải đố ô chữ Kanji ghép các từ chỉ vật dụng kiến trúc và cây cảnh gia đình.', '/assets/kanji/n3/quizzes/quiz_1_2_crossword.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Từ nào ghép với 戸 (cửa) mang nghĩa cửa sổ kính nhìn ra sân vườn?',
                    'options': ['雨戸 (Cửa che mưa)', '窓戸 (Cửa sổ)', '戸棚 (Tủ chạn)', '門戸 (Cánh cổng)'],
                    'answer': '雨戸 (Cửa che mưa)',
                    'explanation': '雨戸 (あまど) là loại cửa trượt che mưa bão bảo vệ mặt kính cửa sổ truyền thống Nhật Bản.'
                },
                {
                    'id': 2,
                    'prompt': 'Phần nâng đỡ vững chãi toàn bộ kết cấu ngôi nhà được gọi là gì?',
                    'options': ['大黒柱 (Trụ cột chính)', '屋根 (Mái nhà)', '階段 (Cầu thang)', '倉庫 (Nhà kho)'],
                    'answer': '大黒柱 (Trụ cột chính)',
                    'explanation': '柱 (TRỤ) là cây cột, 大黒柱 là cột trụ chính gia đình gánh vác cả căn nhà.'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Phỏng vấn dọn phòng & Hẹn giờ thu gom rác', 'Đọc bài phỏng vấn lối sống và chọn đúng thao tác phân loại xử lý vật dụng.', '/assets/kanji/n3/quizzes/quiz_1_2_interview.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Khi nhặt được đồ thất lạc rơi trên sàn nhà, hành động đúng là gì?',
                    'options': ['拾う (Nhặt lên cất cẩn thận)', '捨てる (Vứt đi)', '押す (Đẩy sang bên)', '消す (Xóa sạch)'],
                    'answer': '拾う (Nhặt lên cất cẩn thận)',
                    'explanation': 'Động từ 拾う (ひろう) nghĩa là nhặt lên, đối lập với 捨てる (vứt bỏ).'
                }
            ]
        }, 2)
    ],
    3: [
        ('PICTURE_MATCH', 'Minigame 1: Bếp trưởng & Điều chỉnh nhiệt độ gia vị', 'Đọc công thức nấu ăn và chọn đúng mức nhiệt độ, tỷ lệ muối đường và số lượng nguyên liệu.', '/assets/kanji/n3/illustrations/chap3_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Đơn vị đếm 2 quả trứng gà trong tiếng Nhật là gì?',
                    'options': ['卵 2個 (2 quả trứng)', '卵 2枚 (2 tờ trứng)', '卵 2匹 (2 con trứng)', '卵 2杯 (2 cốc trứng)'],
                    'answer': '卵 2個 (2 quả trứng)',
                    'explanation': 'Trứng dùng hậu tố 個 (こ) để đếm số lượng vật thể nhỏ tròn.'
                },
                {
                    'id': 2,
                    'prompt': 'Khi hâm nóng canh miso, trạng thái nhiệt độ lý tưởng là gì?',
                    'options': ['温める (Hâm ấm vừa ăn)', '冷やす (Làm lạnh ngắt)', '凍らせる (Đông đá)', '焦がす (Làm cháy khét)'],
                    'answer': '温める (Hâm ấm vừa ăn)',
                    'explanation': '温める (あたためる) nghĩa là làm ấm, giữ trọn hương vị súp miso.'
                }
            ]
        }, 1)
    ],
    4: [
        ('PICTURE_MATCH', 'Minigame 1: Công thức bánh gato dâu tây (ショートケーキのレシピ)', 'Đọc công thức làm bánh gato và điền đúng chữ Hán chỉ định lượng nguyên liệu.', '/assets/kanji/n3/quizzes/quiz_3_4_shortcake_recipe.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Nguyên liệu chính làm cốt bánh gato Shortcake là bột gì?',
                    'options': ['小麦粉 (Bột mì trắng)', 'そば粉 (Bột kiều mạch)', '片栗粉 (Bột năng)', '米粉 (Bột gạo)'],
                    'answer': '小麦粉 (Bột mì trắng)',
                    'explanation': '小麦粉 (こむぎこ) gồm chữ 小 + 麦 + 粉 là bột mì chuyên làm bánh ngọt.'
                },
                {
                    'id': 2,
                    'prompt': 'Dụng cụ dùng để đánh kem tươi bông mềm là gì?',
                    'options': ['泡立て器 (Cây đánh trứng/kem)', '炊飯器 (Nồi cơm điện)', '食器 (Bát đĩa ăn)', '容器 (Hộp chứa)'],
                    'answer': '泡立て器 (Cây đánh trứng/kem)',
                    'explanation': '器 (KHÍ) chỉ công cụ đồ dùng, 泡立て器 là cây phới đánh bọt kem.'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Bệnh viện & Hội thoại Bác sĩ - Bệnh nhân', 'Xem đơn khám bệnh, giải mã triệu chứng sốt cao, đo huyết áp và hướng dẫn băng bó.', '/assets/kanji/n3/quizzes/quiz_3_4_doctor_patient.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Bệnh nhân than phiền: “深呼吸すると胸が痛いです”, nghĩa là bị đau ở đâu khi làm gì?',
                    'options': ['Đau ngực khi hít thở sâu', 'Đau đầu khi cúi xuống', 'Đau họng khi nuốt thức ăn', 'Đau bụng khi uống nước'],
                    'answer': 'Đau ngực khi hít thở sâu',
                    'explanation': '深呼吸 (hít thở sâu) gồm chữ 深 (thâm) + 呼 (hô) + 吸 (hấp), kết hợp với 胸が痛い (đau ngực).'
                }
            ]
        }, 2)
    ],
    5: [
        ('PICTURE_MATCH', 'Minigame 1: Bảng điểm thi đấu & Kỷ lục thể thao', 'Phân tích bảng kết quả trận chung kết thể thao và xác định đội vô địch, vận động viên xuất sắc.', '/assets/kanji/n3/illustrations/chap5_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Người ném bóng trong môn bóng chày tiếng Nhật gọi là gì?',
                    'options': ['投手 (ピッチャー - Cầu thủ ném bóng)', '打者 (バッター - Cầu thủ đánh bóng)', '捕手 (キャッチャー - Cầu thủ bắt bóng)', '審判 (Trọng tài)'],
                    'answer': '投手 (ピッチャー - Cầu thủ ném bóng)',
                    'explanation': '投 (ĐẦU) nghĩa là ném -> 投手 (とうしゅ) là vận động viên ném bóng.'
                }
            ]
        }, 1)
    ],
    6: [
        ('PICTURE_MATCH', 'Minigame 1: Bản tin thể thao Koshien & Cảm xúc thăng hoa', 'Đọc phóng sự bóng chày mùa hè Koshien, cảm nhận niềm xúc động chiến thắng và tiếc nuối.', '/assets/kanji/n3/quizzes/quiz_5_6_baseball_article.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Đội bóng lội ngược dòng giành cúp vô địch phút chót mang lại cảm xúc gì?',
                    'options': ['大歓喜 (Vô cùng mừng rỡ sung sướng)', '失望 (Thất vọng tràn trề)', '怒り (Giận dữ tột cùng)', '恐怖 (Sợ hãi run rẩy)'],
                    'answer': '大歓喜 (Vô cùng mừng rỡ sung sướng)',
                    'explanation': 'Chữ 喜 (HỈ) kết hợp 歓喜 (かんき) diễn tả niềm hân hoan vui sướng ngập tràn khi thắng trận.'
                },
                {
                    'id': 2,
                    'prompt': 'Thành ngữ “勝負の行方” mang ý nghĩa là gì?',
                    'options': ['Cục diện diễn biến của trận thắng bại', 'Thời gian bắt đầu trận đấu', 'Địa điểm sân vận động tổ chức', 'Số lượng khán giả mua vé'],
                    'answer': 'Cục diện diễn biến của trận thắng bại',
                    'explanation': '勝負 (thắng bại) + 行方 (tung tích, chiều hướng phát triển).'
                }
            ]
        }, 1)
    ],
    7: [
        ('PICTURE_MATCH', 'Minigame 1: Lễ thành hôn & Phong tục chúc mừng', 'Tìm hiểu quy tắc phong bì tiền mừng cưới Shugi-bukuro và thiệp đáp lễ hạnh phúc.', '/assets/kanji/n3/illustrations/chap7_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Trên phong bì mừng cưới tiếng Nhật thường in nổi chữ gì?',
                    'options': ['寿 (Thọ - Chúc phúc hôn nhân)', '祝 (Chúc - Chúc mừng)', '幸 (Hạnh - May mắn)', '福 (Phúc - Hạnh phúc)'],
                    'answer': '寿 (Thọ - Chúc phúc hôn nhân)',
                    'explanation': 'Chữ 寿 (ことぶき) là chữ chúc mừng cưới hỏi truyền thống sang trọng nhất.'
                }
            ]
        }, 1)
    ],
    8: [
        ('PICTURE_MATCH', 'Minigame 1: Cây phả hệ & Xưng hô giao tiếp xã hội', 'Nhận biết các mối quan hệ người thân trong gia đình họ tộc và đối tác công việc.', '/assets/kanji/n3/illustrations/chap8_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Chữ nào dùng để chỉ người bạn thân thiết hiểu ý nhau?',
                    'options': ['親友 (Bạn thân tri kỷ)', '他人 (Người ngoài xa lạ)', '知人 (Người quen sơ)', '同僚 (Đồng nghiệp)'],
                    'answer': '親友 (Bạn thân tri kỷ)',
                    'explanation': 'Chữ 親 (THÂN) + 友 (HỮU) đọc là しんゆう (bạn thân nhất).'
                }
            ]
        }, 1)
    ],
    9: [
        ('PICTURE_MATCH', 'Minigame 1: Thiệp mời đám cưới & Lời chúc phúc vĩnh cửu', 'Đọc thiệp cưới trang trọng phong cách Nhật Bản và chọn lời chúc hạnh phúc trăm năm.', '/assets/kanji/n3/quizzes/quiz_7_9_wedding_letter.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Thành ngữ nào chúc phúc hai bạn sống trọn đời hạnh phúc?',
                    'options': ['永遠の幸福を祈る (Chúc phúc hạnh phúc vĩnh cửu)', '関係を解消する (Chấm dứt quan hệ)', '単独で行動する (Hành động một mình)', '約束を破る (Phá vỡ lời hứa)'],
                    'answer': '永遠の幸福を祈る (Chúc phúc hạnh phúc vĩnh cửu)',
                    'explanation': '永 (VĨNH) + 幸 (HẠNH) + 福 (PHÚC) tạo nên lời chúc hôn lễ kinh điển nhất.'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Phỏng vấn đầu bếp & Quy tắc so sánh định lượng', 'Phân tích bảng định lượng gia vị: 以上 (trở lên), 未満 (chưa đầy), 全体 (toàn bộ).', '/assets/kanji/n3/quizzes/quiz_7_9_cooking_interview.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Quy định “20歳未満は飲酒禁止” có nghĩa là:',
                    'options': ['Người dưới 20 tuổi cấm uống rượu', 'Người từ 20 tuổi trở lên cấm uống rượu', 'Ai cũng được phép uống rượu', 'Chỉ cấm người trên 20 tuổi'],
                    'answer': 'Người dưới 20 tuổi cấm uống rượu',
                    'explanation': '未満 (VỊ MÃN) nghĩa là chưa đạt tới mốc đó (tức dưới 20 tuổi).'
                }
            ]
        }, 2)
    ],
    10: [
        ('ORDERING', 'Minigame 1: Bảng phân công nhiệm vụ lớp học & Mượn sách', 'Sắp xếp quy trình mượn tài liệu học tập và bảo quản dụng cụ học đường.', '/assets/kanji/n3/illustrations/chap10_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Quy trình mượn sách thư viện đúng: [借りる / 探す / 返す]',
                    'options': ['探す → 借りる → 返す', '借りる → 探す → 返す', '返す → 探す → 借りる', '探す → 返す → 借りる'],
                    'answer': '探す → 借りる → 返す',
                    'explanation': 'Tìm sách (探す) -> Đến quầy làm thủ tục mượn (借りる) -> Đọc xong đem trả đúng hạn (返す).'
                }
            ]
        }, 1)
    ],
    11: [
        ('PICTURE_MATCH', 'Minigame 1: Nội quy thư viện & Không gian học tập', 'Đọc bảng thông báo nội quy phòng tự học thư viện và chọn hành vi được phép.', '/assets/kanji/n3/quizzes/quiz_10_11_library_rules.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Biển báo “座席での飲食禁止” có nghĩa là gì?',
                    'options': ['Cấm ăn uống tại chỗ ngồi', 'Cho phép ăn bánh kẹo thoải mái', 'Chỉ được phép uống rượu', 'Cấm ngồi vào ghế'],
                    'answer': 'Cấm ăn uống tại chỗ ngồi',
                    'explanation': '座席 (chỗ ngồi) + 飲食禁止 (cấm ăn uống).'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Phỏng vấn xin việc làm thêm sinh viên (面接)', 'Xem kịch bản phỏng vấn Baitô sinh viên đại học và chọn câu trả lời lịch thiệp nhất.', '/assets/kanji/n3/quizzes/quiz_10_11_parttime_interview.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Khi người phỏng vấn hỏi lý do nộp đơn (志望動機), sinh viên nên trình bày gì?',
                    'options': ['Nguyện vọng và ước mơ học hỏi kinh nghiệm', 'Chỉ vì muốn có thật nhiều tiền chơi game', 'Vì ở nhà rảnh rỗi không có việc gì làm', 'Vì bạn bè ép buộc nộp hồ sơ'],
                    'answer': 'Nguyện vọng và ước mơ học hỏi kinh nghiệm',
                    'explanation': 'Chữ 希 (HY) + 望 (VỌNG) thể hiện động lực và chí hướng chân thành.'
                }
            ]
        }, 2)
    ],
    12: [
        ('PICTURE_MATCH', 'Minigame 1: Lịch thi học kỳ & Bí quyết giải thích bài tập', 'Đọc lịch thi các môn học và cách viết báo cáo tóm tắt nội dung bài học.', '/assets/kanji/n3/illustrations/chap12_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Từ nào mang nghĩa giải thích rõ ràng kèm ví dụ minh họa?',
                    'options': ['解説 (Giải thích chi tiết)', '欠席 (Vắng mặt)', '忘却 (Quên lãng)', '卒業 (Tốt nghiệp)'],
                    'answer': '解説 (Giải thích chi tiết)',
                    'explanation': '解 (GIẢI) + 説 (THUYẾT) đọc là かいせつ.'
                }
            ]
        }, 1)
    ],
    13: [
        ('PICTURE_MATCH', 'Minigame 1: Bảo tàng Khoa học Địa Cầu & Sông băng Bắc Cực', 'Khám phá sơ đồ địa tầng Trái Đất, dòng hải lưu ấm lạnh và sự đa dạng sinh học.', '/assets/kanji/n3/quizzes/quiz_12_13_science_museum.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Dòng hải lưu từ phương nam chảy lên mang nước ấm gọi là gì?',
                    'options': ['暖流 (Dòng hải lưu ấm)', '寒流 (Dòng hải lưu lạnh)', '氷河 (Sông băng trôi)', '河口 (Cửa sông)'],
                    'answer': '暖流 (Dòng hải lưu ấm)',
                    'explanation': '暖 (NOÃN - ấm) + 流 (LƯU - dòng chảy) -> 暖流 (だんりゅう).'
                },
                {
                    'id': 2,
                    'prompt': 'Đại dương nơi có độ sâu thẳm nhất dưới đáy biển gọi là gì?',
                    'options': ['深海 (Biển sâu thẳm)', '浅瀬 (Vùng nước nông)', '海岸 (Bờ biển)', '砂浜 (Bãi cát)'],
                    'answer': '深海 (Biển sâu thẳm)',
                    'explanation': '深 (THÂM - sâu) + 海 (HẢI - biển) -> 深海 (しんかい).'
                }
            ]
        }, 1)
    ],
    14: [
        ('ORDERING', 'Minigame 1: Chuẩn bị hành lý Tour du lịch nước ngoài', 'Sắp xếp danh mục đồ đạc trước chuyến bay và các thủ tục nhận phòng khách sạn Ryokan.', '/assets/kanji/n3/illustrations/chap14_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Trình tự du lịch nước ngoài: [搭乗する / 荷物を準備する / 観光する]',
                    'options': ['荷物を準備する → 搭乗する → 観光する', '観光する → 荷物を準備する → 搭乗する', '搭乗する → 観光する → 荷物を準備する', '荷物を準備する → 観光する → 搭乗する'],
                    'answer': '荷物を準備する → 搭乗する → 観光する',
                    'explanation': 'Chuẩn bị hành lý (準備) -> Lên máy bay (搭乗) -> Tham quan ngắm cảnh (観光).'
                }
            ]
        }, 1)
    ],
    15: [
        ('PICTURE_MATCH', 'Minigame 1: Tour du lịch Châu Âu & Di sản văn hóa (ヨーロッパ旅行)', 'Đọc lịch trình tour ngắm cảnh các thành phố châu Âu và công trình kiến trúc cổ kính.', '/assets/kanji/n3/quizzes/quiz_14_15_europe_tour.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Chữ Hán 欧州 trong lịch trình du lịch chỉ châu lục nào?',
                    'options': ['Châu Âu (Europe)', 'Châu Á (Asia)', 'Châu Mỹ (America)', 'Châu Phi (Africa)'],
                    'answer': 'Châu Âu (Europe)',
                    'explanation': '欧州 (おうしゅう) gồm 欧 (ÂU) + 州 (CHÂU) nghĩa là Châu Âu.'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Sơ đồ chỉ đường & Biển báo giao thông đường bộ', 'Nhìn bản đồ ngã tư đường ray, đọc hướng dẫn rẽ khúc cua và vị trí cây cầu vượt.', '/assets/kanji/n3/quizzes/quiz_14_15_house_map.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Biển chỉ dẫn “直進” yêu cầu người lái xe thực hiện thao tác nào?',
                    'options': ['Đi thẳng về phía trước', 'Rẽ phải ngay lập tức', 'Quay đầu ngược chiều', 'Dừng đỗ xe lại'],
                    'answer': 'Đi thẳng về phía trước',
                    'explanation': '直 (TRỰC - thẳng) + 進 (TIẾN - đi tới) -> 直進 (ちょくしん).'
                }
            ]
        }, 2)
    ],
    16: [
        ('PICTURE_MATCH', 'Minigame 1: Hướng nghiệp công sở & Đãi ngộ nhân sự', 'Đọc bảng quyền lợi nhân viên, mức lương cơ bản và chế độ trợ cấp nghỉ phép.', '/assets/kanji/n3/illustrations/chap16_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Khoản tiền công ty trả định kỳ hàng tháng cho người lao động gọi là gì?',
                    'options': ['給料 (Tiền lương)', '失礼 (Thất lễ)', '退職 (Nghỉ việc)', '求職 (Tìm việc)'],
                    'answer': '給料 (Tiền lương)',
                    'explanation': '給 (CẤP) + 料 (LIỆU) đọc là きゅうりょう.'
                }
            ]
        }, 1)
    ],
    17: [
        ('PICTURE_MATCH', 'Minigame 1: Bảng tuyển dụng việc làm & Chế độ đãi ngộ (求人票)', 'Đọc tờ thông tin tuyển dụng việc làm và trả lời các tiêu chí yêu cầu trình độ.', '/assets/kanji/n3/quizzes/quiz_16_17_job_ad.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Mục “交通費全額支給” trong tờ tuyển dụng có ý nghĩa là gì?',
                    'options': ['Công ty chi trả toàn bộ tiền vé xe đi lại', 'Người lao động phải tự trả tiền vé xe', 'Không hỗ trợ bất kỳ chi phí nào', 'Chỉ trả một nửa tiền xăng'],
                    'answer': 'Công ty chi trả toàn bộ tiền vé xe đi lại',
                    'explanation': '全額 (toàn bộ số tiền) + 支給 (chi trả, trợ cấp).'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Tư vấn hướng nghiệp & Quy tắc Hou-Ren-So (報連相)', 'Thực hành kỹ năng giao tiếp công sở: Báo cáo (報告) - Liên lạc (連絡) - Bàn bạc (相談).', '/assets/kanji/n3/quizzes/quiz_16_17_student_career_advice.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Khi gặp sự cố bất ngờ trong công việc, bước đầu tiên cần làm ngay là gì?',
                    'options': ['Báo cáo tình hình ngay cho cấp trên (報告)', 'Im lặng giấu kín không nói với ai', 'Tự ý quyết định bỏ về nhà', 'Đổ lỗi cho đồng nghiệp khác'],
                    'answer': 'Báo cáo tình hình ngay cho cấp trên (報告)',
                    'explanation': '報告 (ほうこく) là bước đầu tiên và cốt lõi nhất của văn hóa Hou-Ren-So Nhật Bản.'
                }
            ]
        }, 2)
    ],
    18: [
        ('PICTURE_MATCH', 'Minigame 1: Ngân sách tài khóa & Biểu đồ thuế tiêu thụ', 'Tính toán biểu đồ ngân sách hàng nghìn tỷ yên và mức thuế tiêu thụ của các mặt hàng.', '/assets/kanji/n3/illustrations/chap18_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': '1 兆 (Triệu) trong hệ đếm Nhật Bản tương đương với bao nhiêu?',
                    'options': ['1.000.000.000.000 (Một nghìn tỷ)', '1.000.000 (Một triệu)', '100.000.000 (Một trăm triệu)', '10.000 (Mười nghìn)'],
                    'answer': '1.000.000.000.000 (Một nghìn tỷ)',
                    'explanation': 'Chữ 兆 (ちょう) bằng 10.000 lần 億 (ức = trăm triệu), tức là 1.000 tỷ.'
                }
            ]
        }, 1)
    ],
    19: [
        ('PICTURE_MATCH', 'Minigame 1: Dây chuyền sản xuất cơ khí & Nhà máy dệt sợi', 'Khám phá quy trình công nghệ chế tạo máy móc tự động và vải dệt cao cấp.', '/assets/kanji/n3/illustrations/chap19_intro.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Loại chất liệu dệt từ sợi bông tự nhiên gọi là gì?',
                    'options': ['綿布 (Vải dệt từ sợi bông)', '鉄鋼 (Sắt thép xây dựng)', '木材 (Gỗ xẻ làm nhà)', '原油 (Dầu mỏ thô)'],
                    'answer': '綿布 (Vải dệt từ sợi bông)',
                    'explanation': '綿 (MIÊN - bông) + 布 (BỐ - vải) -> 綿布 (めんぷ).'
                }
            ]
        }, 1)
    ],
    20: [
        ('PICTURE_MATCH', 'Minigame 1: Bản tin thời sự Thủ tướng & Chính sách ngân sách nhà nước', 'Đọc bài phát biểu của Thủ tướng về phân bổ ngân sách và các điều luật kinh tế.', '/assets/kanji/n3/quizzes/quiz_18_20_pm_policy.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Mục tiêu chính sách tài khóa của chính phủ nhằm giảm bớt điều gì?',
                    'options': ['貧富の差 (Chênh lệch giàu nghèo)', '国民の幸福 (Hạnh phúc nhân dân)', '農業の発展 (Phát triển nông nghiệp)', '技術の進歩 (Tiến bộ công nghệ)'],
                    'answer': '貧富の差 (Chênh lệch giàu nghèo)',
                    'explanation': '貧 (BẦN - nghèo) + 富 (PHÚ - giàu) -> 貧富 (ひんぷ), giảm khoảng cách bất bình đẳng xã hội.'
                }
            ]
        }, 1),
        ('PICTURE_MATCH', 'Minigame 2: Nhật ký tham quan nhà máy công nghiệp & Trị an pháp luật', 'Đọc nhật ký tham quan dây chuyền sản xuất và quy định đảm bảo trật tự pháp luật.', '/assets/kanji/n3/quizzes/quiz_18_20_industry_diary.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Trong khu vực vận hành máy móc công nghiệp nặng, biển báo nào là quan trọng nhất?',
                    'options': ['危険・立ち入り禁止 (Nguy hiểm - Cấm vào)', '歓迎・ご自由にどうぞ (Chào mừng - Tự do vào)', '休憩室・飲食可能 (Phòng nghỉ - Được ăn uống)', '撮影スポット (Điểm chụp ảnh lưu niệm)'],
                    'answer': '危険・立ち入り禁止 (Nguy hiểm - Cấm vào)',
                    'explanation': '危険 (nguy hiểm) + 立ち入り禁止 (cấm bước chân vào).'
                }
            ]
        }, 2),
        ('PICTURE_MATCH', 'Minigame 3: Ước mơ nghề nghiệp & Công lý xã hội (夢の職業)', 'Khám phá các ngành nghề trong xã hội pháp quyền: Luật sư, Thẩm phán, Cảnh sát và Kỹ sư.', '/assets/kanji/n3/quizzes/quiz_18_20_dream_jobs.webp', {
            'questions': [
                {
                    'id': 1,
                    'prompt': 'Người bảo vệ công lý và áp dụng chuẩn xác các điều khoản pháp luật là ai?',
                    'options': ['裁判官・弁護士 (Thẩm phán / Luật sư)', '容疑者 (Nghi can vụ án)', '犯人 (Thủ phạm vi phạm)', '兵士 (Binh lính chiến đấu)'],
                    'answer': '裁判官・弁護士 (Thẩm phán / Luật sư)',
                    'explanation': 'Chữ 判 (PHÁN) và 法 (PHÁP) thể hiện vai trò cầm cân nảy mực công lý.'
                }
            ]
        }, 3)
    ]
}

# ==============================================================================
# 3. ĐỀ THI TỔNG HỢP CHẶNG N3 (ACHIEVEMENT TESTS - STAGES 7, 8, 9, 10)
# ==============================================================================
ACHIEVEMENT_TESTS_DATA = [
    {
        "stage": 7,
        "title": "Achievement Test 1 (Chương 1 ~ 6) — Đời sống & Cá nhân",
        "description": "Đề thi tổng hợp kiểm tra 120 chữ Hán từ Chương 1 đến Chương 6 (Đời sống hàng ngày, Nhà ở nội thất, Ẩm thực nấu ăn, Bệnh viện sức khỏe, Thể thao và Cảm xúc tâm lý)",
        "pass_percentage": 85,
        "test_data_json": json.dumps({
            "stage_level": "N3",
            "coverage": "Chương 1 ~ 6",
            "total_questions": 20,
            "questions": [
                {"q": "天気がいいのでベランダに洗濯物を干しました。", "target": "干しました", "answer": "ほしました", "options": ["ほしました", "あらいました", "ふきました", "かけました"]},
                {"q": "ドアの取っ手を押しても開きません。", "target": "押して", "answer": "おして", "options": ["おして", "ひいて", "さして", "たいて"]},
                {"q": "フライパンの温度が上がるまで待ちます。", "target": "温度", "answer": "おんど", "options": ["おんど", "あつど", "ねつど", "おんたく"]},
                {"q": "健康診断で血液の検査を受けました。", "target": "血液", "answer": "けつえき", "options": ["けつえき", "ちえき", "けつしる", "ちすい"]},
                {"q": "決勝戦で素晴らしい新記録を達成しました。", "target": "記録", "answer": "きろく", "options": ["きろく", "きりょく", "しるく", "きほう"]},
                {"q": "試合に負けて本当に残念です。", "target": "残念", "answer": "ざんねん", "options": ["ざんねん", "のこりねん", "さんねん", "ざんしん"]},
                {"q": "毎朝6時に＿＿＿ジョギングをします。", "target": "おきて", "answer": "起きて", "options": ["起きて", "寝て", "立って", "走て"]},
                {"q": "駅の＿＿＿を急いで駆け上がりました。", "target": "かいだん", "answer": "階段", "options": ["階段", "階落", "段階", "階梯"]},
                {"q": "ケーキの＿＿＿として小麦粉と卵を買いました。", "target": "ざいりょう", "answer": "材料", "options": ["材料", "木料", "原料", "資材"]},
                {"q": "風邪を引いて激しい＿＿＿がします。", "target": "ずつう", "answer": "頭痛", "options": ["頭痛", "首痛", "歯痛", "腹痛"]},
            ]
        }, ensure_ascii=False),
        "display_order": 7
    },
    {
        "stage": 8,
        "title": "Achievement Test 2 (Chương 7 ~ 9) — Quan hệ, Xã hội & Đơn vị",
        "description": "Đề thi tổng hợp kiểm tra 43 chữ Hán từ Chương 7 đến Chương 9 (Hôn nhân lễ nghi, Quan hệ gia đình xã hội, Đơn vị định lượng và Trạng thái so sánh)",
        "pass_percentage": 85,
        "test_data_json": json.dumps({
            "stage_level": "N3",
            "coverage": "Chương 7 ~ 9",
            "total_questions": 20,
            "questions": [
                {"q": "友人の結婚式に出席して祝福しました。", "target": "結婚式", "answer": "けっこんしき", "options": ["けっこんしき", "けつこんしき", "むすびしき", "けっこんほう"]},
                {"q": "友人と交わした約束を必ず守ります。", "target": "約束", "answer": "やくそく", "options": ["やくそく", "やくたば", "やくそん", "やくぞく"]},
                {"q": "事件に関係する書類を集めています。", "target": "関係", "answer": "かんけい", "options": ["かんけい", "かんかかり", "せきけい", "かんしょう"]},
                {"q": "この問題は単純に見えて実は複雑です。", "target": "単純", "answer": "たんじゅん", "options": ["たんじゅん", "ひとじゅん", "たんすい", "だんじゅん"]},
                {"q": "18歳未満の入場は禁止されています。", "target": "未満", "answer": "みまん", "options": ["みまん", "いまん", "ひまん", "むまん"]},
                {"q": "将来のために毎月＿＿＿をしています。", "target": "ちょきん", "answer": "貯金", "options": ["貯金", "預金", "積金", "蓄金"]},
                {"q": "書類に＿＿＿を丁寧に記入してください。", "target": "せいめい", "answer": "姓名", "options": ["姓名", "性名", "生名", "姓字"]},
                {"q": "そんな＿＿＿な計画には反対です。", "target": "むり", "answer": "無理", "options": ["無理", "非理", "不理", "無用"]},
                {"q": "クラスの仲良しグループで＿＿＿した。", "target": "りょこう", "answer": "旅行", "options": ["旅行", "旅向", "遊行", "訪行"]},
                {"q": "二人の末長い＿＿＿を心から祈ります。", "target": "こうふく", "answer": "幸福", "options": ["幸福", "幸運", "祝福", "慶福"]},
            ]
        }, ensure_ascii=False),
        "display_order": 8
    },
    {
        "stage": 9,
        "title": "Achievement Test 3 (Chương 10 ~ 13) & Midterm Test (1 ~ 11)",
        "description": "Đề thi kiểm tra 78 chữ Hán Chặng 3 (Trường học, Thi cử, Tiết học, Địa cầu địa lý tự nhiên) kèm 50 câu Midterm Test nửa đầu N3",
        "pass_percentage": 85,
        "test_data_json": json.dumps({
            "stage_level": "N3",
            "coverage": "Chương 10 ~ 13 & Midterm Ch 1~11",
            "total_questions": 25,
            "questions": [
                {"q": "今年から小学校の担任になりました。", "target": "担任", "answer": "たんにん", "options": ["たんにん", "かつにん", "たんとう", "たんば"]},
                {"q": "希望の大学に進学することが夢です。", "target": "希望", "answer": "きぼう", "options": ["きぼう", "けぼう", "きのぞみ", "きほう"]},
                {"q": "先生が文法の使い方を詳しく解説した。", "target": "解説", "answer": "かいせつ", "options": ["かいせつ", "ときあかし", "かいとく", "げせつ"]},
                {"q": "北極には巨大な氷河が広がっています。", "target": "氷河", "answer": "ひょうが", "options": ["ひょうが", "こおりがわ", "こおりかわ", "ひょうかわ"]},
                {"q": "地球上には多種多様な生物が存在します。", "target": "存在", "answer": "そんざい", "options": ["そんざい", "ぞんざい", "そんあり", "ありざい"]},
                {"q": "図書館で本を3＿＿＿借りました。", "target": "さつ", "answer": "冊", "options": ["冊", "本", "枚", "部"]},
                {"q": "明日のアルバイトの＿＿＿に向けて準備します。", "target": "めんせつ", "answer": "面接", "options": ["面接", "接見", "面試", "試問"]},
                {"q": "来年3月に大学を＿＿＿する予定です。", "target": "そつぎょう", "answer": "卒業", "options": ["卒業", "修業", "学業", "卒校"]},
                {"q": "日本はたくさんの＿＿＿でできている国です。", "target": "しま", "answer": "島", "options": ["島", "陸", "岸", "坂"]},
                {"q": "急な＿＿＿を自転車で力いっぱい登った。", "target": "さかみち", "answer": "坂道", "options": ["坂道", "阪道", "阪路", "板道"]},
            ]
        }, ensure_ascii=False),
        "display_order": 9
    },
    {
        "stage": 10,
        "title": "Achievement Test 4 (Chương 14 ~ 20) & Kỳ thi Tốt Nghiệp Toàn Diện N3",
        "description": "Kỳ thi Tốt Nghiệp Toàn Diện N3 bao quát toàn bộ 376 chữ Hán, ngữ cảnh du lịch, giao thông, doanh nghiệp, hội nghị, ngân sách, công nghiệp và pháp luật",
        "pass_percentage": 85,
        "test_data_json": json.dumps({
            "stage_level": "N3",
            "coverage": "Chương 14 ~ 20 Toàn Diện N3",
            "total_questions": 35,
            "questions": [
                {"q": "海外旅行の準備をそろそろ始めましょう。", "target": "準備", "answer": "じゅんび", "options": ["じゅんび", "じゅんひ", "そろえび", "ちゅんび"]},
                {"q": "交差点を右に曲がってまっすぐ進みます。", "target": "曲がって", "answer": "まがって", "options": ["まがって", "おって", "ころんで", "たおれて"]},
                {"q": "大学を卒業して就職活動を始めました。", "target": "就職", "answer": "しゅうしょく", "options": ["しゅうしょく", "じゅしょく", "しゅうしょ", "しゅうしき"]},
                {"q": "仕事でトラブルがあったら上司に相談します。", "target": "相談", "answer": "そうだん", "options": ["そうだん", "しょうだん", "あいたん", "あいだん"]},
                {"q": "最新の機械を導入して生産効率を高める。", "target": "機械", "answer": "きかい", "options": ["きかい", "きき", "はたかい", "きぎ"]},
                {"q": "国民は国の法律や規則を守る義務があります。", "target": "法律", "answer": "ほうりつ", "options": ["ほうりつ", "ほうりち", "ほうき", "ほうしょ"]},
                {"q": "警察が事件の容疑者を逮捕しました。", "target": "容疑者", "answer": "ようぎしゃ", "options": ["ようぎしゃ", "いぎしゃ", "ようぎにん", "ようさいしゃ"]},
                {"q": "来年度の事業＿＿＿を計算しています。", "target": "よさん", "answer": "予算", "options": ["予算", "預算", "予定算", "計算法"]},
                {"q": "外国との＿＿＿が活発に行われています。", "target": "ぼうえき", "answer": "貿易", "options": ["貿易", "商易", "商売", "買易"]},
                {"q": "雨の日は滑りやすいので足元に＿＿＿してください。", "target": "ちゅうい", "answer": "注意", "options": ["注意", "注心", "注重", "警意"]},
            ]
        }, ensure_ascii=False),
        "display_order": 10
    }
]

if __name__ == '__main__':
    print(f"Exercises chapters: {len(CHAPTER_EXERCISES)}")
    total_ex = sum(len(ex) for ex in CHAPTER_EXERCISES.values())
    print(f"Total exercises questions: {total_ex}")
    print(f"Minigames chapters: {len(CHAPTER_MINIGAMES)}")
    total_mg = sum(len(mg) for mg in CHAPTER_MINIGAMES.values())
    print(f"Total minigames: {total_mg}")
    print(f"Achievement tests: {len(ACHIEVEMENT_TESTS_DATA)}")
