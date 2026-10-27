# -*- coding: utf-8 -*-
"""
Script to build 100% authentic Kanji Master N3 minigames matching textbook structure exactly.
No chapter is forced to 2 minigames.
Chapter 4 has 3 minigames. Chapter 5 has 4 minigames.
Every exercise maps directly to Quiz 【1】, 【2】, 【3】... in the textbook!
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import psycopg2

def get_authentic_minigames():
    games = {}

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 1 (生活): Quiz 1・2 【1】 & 【2】 (2 bài)
    # ─────────────────────────────────────────────────────────────────────────────
    games[1] = [
        ('RADICAL_COMBINE',
         'Minigame 1: Ghép bộ thủ Ⓐ + Ⓑ tạo chữ Hán hoàn chỉnh câu văn',
         'Quan sát cột Ⓐ và Ⓑ trong tranh bài tập gốc. Chọn một bộ phận từ Ⓐ và một bộ phận từ Ⓑ để ghép thành chữ Hán thích hợp điền vào câu:',
         '/assets/kanji/n3/quizzes/quiz_1_2_part1_combine.webp',
         {
             'colA': ['扌', '代', '羽', '扌', '木'],
             'colB': ['立', '合', '衣', '直', '甲'],
             'wordBank': ['袋', '植', '拾', '押', '翌'],
             'questions': [
                 {'id': 1, 'sentence': '大学を卒業した [blank] 年、カナダに留学した。', 'combine': '羽 + 立', 'answer': '翌', 'targetWord': '翌年', 'hiragana': 'よくとし', 'meaning': 'Năm sau / Năm kế tiếp', 'explanation': 'Ghép 羽 + 立 tạo thành chữ 翌 (DỰC) trong 翌年.'},
                 {'id': 2, 'sentence': 'ボタンを [blank] したのに、ジュースが出てこない。', 'combine': '扌 + 甲', 'answer': '押', 'targetWord': '押した', 'hiragana': 'おした', 'meaning': 'Ấn / Bấm nút', 'explanation': 'Ghép 扌 + 甲 tạo thành chữ 押 (ÁP) trong 押す.'},
                 {'id': 3, 'sentence': '落としたさいふを親切な人が [blank] ってくれた。', 'combine': '扌 + 合', 'answer': '拾', 'targetWord': '拾って', 'hiragana': 'ひろって', 'meaning': 'Nhặt lên', 'explanation': 'Ghép 扌 + 合 tạo thành chữ 拾 (THẬP) trong 拾う.'},
                 {'id': 4, 'sentence': 'スーパーに行くとき、買い物 [blank] をいつも持っていく。', 'combine': '代 + 衣', 'answer': '袋', 'targetWord': '買い物袋', 'hiragana': 'かいものぶくろ', 'meaning': 'Túi mua sắm', 'explanation': 'Ghép 代 + 衣 tạo thành chữ 袋 (ĐẠI) trong 買い物袋.'},
                 {'id': 5, 'sentence': '春に [blank] えたトマトの実がなった。', 'combine': '木 + 直', 'answer': '植', 'targetWord': '植えた', 'hiragana': 'うえた', 'meaning': 'Trồng cây', 'explanation': 'Ghép 木 + 直 tạo thành chữ 植 (THỰC) trong 植える.'}
             ]
         },
         1),
        ('CLOZE_DIALOGUE',
         'Minigame 2: Phỏng vấn du học sinh Jun — Sinh hoạt & Không gian sống (留学生インタビュー)',
         'Quan sát bài tập gốc và đọc đoạn hội thoại phỏng vấn bên dưới. Bấm icon loa để nghe phát âm và điền chữ Hán vào các ô trống từ ① đến ⑨:',
         '/assets/kanji/n3/quizzes/quiz_1_2_interview.webp',
         {
             'dialogue': [
                 {'speaker': 'I', 'name': 'インタビュアー (Người phỏng vấn)', 'text': '日本の 生[blank:1] は どうですか。毎日 いそがしいですか。'},
                 {'speaker': 'ジュン', 'name': 'ジュン (Du học sinh Jun)', 'text': 'そうですね。日本に 来るまで、家族とくらしていたので、朝早く [blank:2] きて、[blank:3] 濯 したりするのが 大変です。\nそれから 今は、なれましたが、来日したばかりの時は [blank:4] えるゴミと [blank:5] えないゴミを細かく分けなければならないことがストレスでした。'},
                 {'speaker': 'I', 'name': 'インタビュアー (Người phỏng vấn)', 'text': 'そうですよね。なれないうちは大変だと思います。\nところで、ジュンさんは大学の近くにお住まいですか。'},
                 {'speaker': 'ジュン', 'name': 'ジュン (Du học sinh Jun)', 'text': 'はい。[blank:6] 30年以上の古いアパートですが、部屋の [blank:7] から東京タワーも見えますし、気に入っています。'},
                 {'speaker': 'I', 'name': 'インタビュアー (Người phỏng vấn)', 'text': '授業が終わってから、アルバイトなどしているんですか。'},
                 {'speaker': 'ジュン', 'name': 'ジュン (Du học sinh Jun)', 'text': 'ええ。毎週 金[blank:8]日 に英語を教えるアルバイトをしています。近くのビルの [blank:9] にあるカフェで教えているんです。'},
                 {'speaker': 'I', 'name': 'インタビュアー (Người phỏng vấn)', 'text': 'そうですか。勉強もアルバイトもがんばってくださいね。\n本日はありがとうございました。'}
             ],
             'wordBank': ['戸', '窓', '拾', '洗', '築', '燃', '捨', '活', '起', '寝', '曜', '階'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '生活', 'hiragana': 'せいかつ', 'answer': '活', 'meaning': 'Đời sống, sinh hoạt', 'explanation': 'Từ ghép 生活 (せいかつ): Chữ 活 (HOẠT).'},
                 {'id': 2, 'num': '②', 'targetWord': '起きて', 'hiragana': 'おきて', 'answer': '起', 'meaning': 'Thức dậy', 'explanation': 'Động từ 起きる (KHỞI): Chữ 起.'},
                 {'id': 3, 'num': '③', 'targetWord': '洗濯', 'hiragana': 'せんたく', 'answer': '洗', 'meaning': 'Giặt giũ quần áo', 'explanation': 'Từ ghép 洗濯 (せんたく): Chữ 洗 (TẨY).'},
                 {'id': 4, 'num': '④', 'targetWord': '燃える', 'hiragana': 'もえる', 'answer': '燃', 'meaning': 'Cháy được (rác cháy được)', 'explanation': 'Động từ 燃える (NHIÊN): Chữ 燃.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '燃えない', 'hiragana': 'もえない', 'answer': '燃', 'meaning': 'Không cháy được (rác vô cơ)', 'explanation': 'Phủ định 燃えない: Chữ 燃.'},
                 {'id': 6, 'num': '⑥', 'targetWord': '築', 'hiragana': 'ちく', 'answer': '築', 'meaning': 'Năm xây dựng (築30年 = Xây dựng được 30 năm)', 'explanation': 'Chữ 築 (TRÚC) trong 築〜年.'},
                 {'id': 7, 'num': '⑦', 'targetWord': '窓', 'hiragana': 'まど', 'answer': '窓', 'meaning': 'Cửa sổ phòng', 'explanation': 'Danh từ 窓 (SONG): Chữ 窓.'},
                 {'id': 8, 'num': '⑧', 'targetWord': '金曜日', 'hiragana': 'きんようび', 'answer': '曜', 'meaning': 'Thứ Sáu hàng tuần', 'explanation': 'Chữ 曜 (DIỆU) trong 金曜日.'},
                 {'id': 9, 'num': '⑨', 'targetWord': '一階', 'hiragana': 'いっかい', 'answer': '階', 'meaning': 'Tầng 1 tòa nhà', 'explanation': 'Đơn vị đếm tầng 階 (GIAI): Chữ 階.'}
             ]
         },
         2)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 2 (家): Quiz 1・2 【3】 & 【4】 (2 bài)
    # ─────────────────────────────────────────────────────────────────────────────
    games[2] = [
        ('DIALOGUE_CHOICE',
         'Minigame 1: Lựa chọn từ ngữ chuẩn xác trong ngữ cảnh đàm thoại',
         'Đọc kỹ các câu đối thoại thực tế bên dưới. Lựa chọn từ vựng chữ Hán đúng nhất để hoàn chỉnh câu:',
         '/assets/kanji/n3/quizzes/quiz_1_2_dialogue_choice.webp',
         {
             'questions': [
                 {'id': 1, 'prompt': '（電話で）「[blank] は、ごちそうさまでした。」', 'promptVi': '(Qua điện thoại) "Tối qua cảm ơn anh/chị vì bữa ăn ngon."', 'options': ['昨晩', '翌晩', '今晩', '毎晩'], 'answer': '昨晩', 'hiragana': 'さくばん', 'meaning': 'Tối hôm qua', 'explanation': '昨晩 (さくばん) nghĩa là tối hôm qua, dùng trong chào hỏi cảm ơn lịch sự.'},
                 {'id': 2, 'prompt': '「いつか、自分の店を [blank] のが夢なんです。」', 'promptVi': '"Ước mơ của tôi là một ngày nào đó mở được cửa hàng cho riêng mình."', 'options': ['構える', '建てる', '引く', '向く'], 'answer': '構える', 'hiragana': 'かまえる', 'meaning': 'Mở cửa tiệm, lập cơ nghiệp', 'explanation': '店を構える (かまえる) là quán ngữ mang nghĩa mở cơ sở kinh doanh, mở tiệm.'},
                 {'id': 3, 'prompt': '「ベランダの植物の [blank] が黄色くなって、元気がありません。」', 'promptVi': '"Lá của cây ngoài ban công bị vàng úa, trông không được tươi tốt."', 'options': ['葉', '根', '実', '枝'], 'answer': '葉', 'hiragana': 'は', 'meaning': 'Lá cây', 'explanation': '葉 (は) là lá cây, chuyển màu vàng.'},
                 {'id': 4, 'prompt': '「すみません。今日はちょっと [blank] があるので、お先に失礼します。」', 'promptVi': '"Xin lỗi, hôm nay tôi có chút việc bận nên xin phép về trước."', 'options': ['用事', '予定', '予報', '用具'], 'answer': '用事', 'hiragana': 'ようじ', 'meaning': 'Việc bận cá nhân', 'explanation': '用事 (ようじ) dùng để chỉ việc riêng, việc bận cần giải quyết.'}
             ]
         },
         1),
        ('KANJI_CROSS',
         'Minigame 2: Ô chữ chữ thập Kanji 4 hướng tâm điểm (漢字クロスワード)',
         'Quan sát 4 từ vựng ghép theo chiều ngang và dọc. Hãy tìm chữ Hán tâm điểm thích hợp để điền vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_1_2_crossword.webp',
         {
             'puzzles': [
                 {'id': 1, 'top': '構', 'bottom': '船', 'left': '木', 'right': '成', 'answer': '造', 'words': ['構造 (Cấu tạo)', '木造 (Bằng gỗ)', '造成 (Tạo dựng)', '造船 (Đóng tàu)'], 'hint': 'Chữ ZOU (造): Chế tạo, cấu trúc'},
                 {'id': 2, 'top': '消', 'bottom': '止', 'left': '気', 'right': '化', 'answer': '防', 'words': ['消防 (Phòng cháy)', '防止 (Đề phòng)', '気防', '予防 (Dự phòng)'], 'hint': 'Chữ BOU (防): Phòng ngự, phòng vệ'},
                 {'id': 3, 'top': '引', 'bottom': '出', 'left': '強', 'right': '退', 'answer': '引', 'words': ['強引 (Cưỡng ép)', '引退 (Nghỉ hưu)', '引越 (Chuyển nhà)', '引出 (Ngăn kéo)'], 'hint': 'Chữ IN / HIKU (引): Kéo, rút'},
                 {'id': 4, 'top': '設', 'bottom': '備', 'left': '建', 'right': '計', 'answer': '設', 'words': ['建設 (Xây dựng)', '設備 (Thiết bị)', '設計 (Thiết kế)', '施設 (Cơ sở vật chất)'], 'hint': 'Chữ SETSU (設): Thiết lập, bố trí'}
             ],
             'wordBank': ['造', '消', '引', '設', '築', '向', '窓', '柱']
         },
         2)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 3 (料理): Quiz 3・4 【1】 & 【3】 (2 bài)
    # ─────────────────────────────────────────────────────────────────────────────
    games[3] = [
        ('CLOZE_DIALOGUE',
         'Minigame 1: Quán nhậu sau giờ làm việc — Gọi món & Đụng ly (居酒屋での会話)',
         'Quan sát tranh bài tập gốc trên bàn nhậu izakaya. Chọn chữ Hán thích hợp điền vào các ô thoại của từng người:',
         '/assets/kanji/n3/quizzes/quiz_3_4_drinking_dialogue.webp',
         {
             'dialogue': [
                 {'speaker': '山田', 'name': '1. 山田 (Yamada)', 'text': '今日も一日おつかれさま。まずは、みんなで乾 [blank:1] しよう！'},
                 {'speaker': '田中', 'name': '2. 田中 (Tanaka)', 'text': 'とりあえず、[blank:2] たい ビールを 4つ お願いします。'},
                 {'speaker': '佐藤', 'name': '3. 佐藤 (Sato)', 'text': 'おつまみは、枝 [blank:3] と 生 [blank:4]、それから [blank:5] き魚を頼みましょう。'},
                 {'speaker': '鈴木', 'name': '4. 鈴木 (Suzuki)', 'text': 'すみません、私はお酒が飲めないので、ウーロン茶の [blank:6] をもらえますか。'},
                 {'speaker': '中村', 'name': '5. 中村 (Nakamura)', 'text': 'この焼き鳥、タレじゃなくて [blank:7] 味 で注文してもいいですか。'},
                 {'speaker': '上田', 'name': '6. 上田 (Ueda)', 'text': '夕べ飲みすぎたせいか、頭 [blank:8] がする。二日酔いだ…'}
             ],
             'wordBank': ['杯', '冷', '豆', '菜', '焼', '缶', '塩', '痛', '熱', '粉'],
             'blanks': [
                 {'id': 1, 'num': '1', 'targetWord': '乾杯', 'hiragana': 'かんぱい', 'answer': '杯', 'meaning': 'Cạn ly, nâng ly chúc mừng', 'explanation': 'Từ ghép 乾杯 (かんぱい): Chữ 杯 (BÔI).'},
                 {'id': 2, 'num': '2', 'targetWord': '冷たい', 'hiragana': 'つめたい', 'answer': '冷', 'meaning': 'Lạnh (bia lạnh)', 'explanation': 'Tính từ 冷たい (つめたい): Chữ 冷 (LÃNH).'},
                 {'id': 3, 'num': '3', 'targetWord': '枝豆', 'hiragana': 'えだまめ', 'answer': '豆', 'meaning': 'Đậu nành luộc', 'explanation': 'Từ ghép 枝豆 (えだまめ): Chữ 豆 (ĐẬU).'},
                 {'id': 4, 'num': '4', 'targetWord': '生野菜', 'hiragana': 'なまやさい', 'answer': '菜', 'meaning': 'Rau sống', 'explanation': 'Từ ghép 生野菜 (なまやさい): Chữ 菜 (THÁI).'},
                 {'id': 5, 'num': '5', 'targetWord': '焼き魚', 'hiragana': 'やきざかな', 'answer': '焼', 'meaning': 'Cá nướng', 'explanation': 'Từ ghép 焼き魚 (やきざかな): Chữ 焼 (THIÊU).'},
                 {'id': 6, 'num': '6', 'targetWord': '缶', 'hiragana': 'かん', 'answer': '缶', 'meaning': 'Lon nước (lon trà ô long)', 'explanation': 'Danh từ 缶 (PHẪU / QUÁN): Chữ 缶.'},
                 {'id': 7, 'num': '7', 'targetWord': '塩味', 'hiragana': 'しおあじ', 'answer': '塩', 'meaning': 'Vị muối', 'explanation': 'Từ ghép 塩味 (しおあじ): Chữ 塩 (DIÊM).'},
                 {'id': 8, 'num': '8', 'targetWord': '頭痛', 'hiragana': 'ずつう', 'answer': '痛', 'meaning': 'Đau đầu', 'explanation': 'Từ ghép 頭痛 (ずつう): Chữ 痛 (THỐNG).'}
             ]
         },
         1),
        ('RECIPE_CLOZE',
         'Minigame 2: Công thức làm bánh dâu tây (いちごのショートケーキ作り方)',
         'Quan sát phiếu công thức làm bánh chuẩn trong giáo trình. Chọn từ vựng thích hợp từ cột bên phải để điền vào các ô trống từ ① đến ⑩:',
         '/assets/kanji/n3/quizzes/quiz_3_4_shortcake_recipe.webp',
         {
             'wordBank': ['材料', '卵', '小麦粉', '牛乳', '果物', '量る', '型', '焼く', '度', '温める'],
             'blanks': [
                 {'id': 1, 'num': '①', 'answer': '材料', 'targetWord': '材料', 'hiragana': 'ざいりょう', 'meaning': 'Nguyên liệu làm bánh', 'explanation': '材料 (ざいりょう): Nguyên liệu.'},
                 {'id': 2, 'num': '②', 'answer': '卵', 'targetWord': '卵', 'hiragana': 'たまご', 'meaning': 'Trứng gà (3 quả)', 'explanation': '卵 (たまご): Trứng.'},
                 {'id': 3, 'num': '③', 'answer': '小麦粉', 'targetWord': '小麦粉', 'hiragana': 'こむぎこ', 'meaning': 'Bột mì (100g)', 'explanation': '小麦粉 (こむぎこ): Bột mì.'},
                 {'id': 4, 'num': '④', 'answer': '牛乳', 'targetWord': '牛乳', 'hiragana': 'ぎゅうにゅう', 'meaning': 'Sữa tươi (2 muỗng lớn)', 'explanation': '牛乳 (ぎゅうにゅう): Sữa bò.'},
                 {'id': 5, 'num': '⑤', 'answer': '果物', 'targetWord': '果物', 'hiragana': 'くだもの', 'meaning': 'Trái cây (dâu tây 1 hộp)', 'explanation': '果物 (くだもの): Trái cây / Hoa quả.'},
                 {'id': 6, 'num': '⑥', 'answer': '量る', 'targetWord': '量る', 'hiragana': 'はかる', 'meaning': 'Cân đo đong đếm nguyên liệu', 'explanation': '量る (はかる): Đo lường khối lượng.'},
                 {'id': 7, 'num': '⑦', 'answer': '型', 'targetWord': '型', 'hiragana': 'かた', 'meaning': 'Khuôn nướng bánh', 'explanation': '型 (かた): Khuôn mẫu.'},
                 {'id': 8, 'num': '⑧', 'answer': '焼く', 'targetWord': '焼く', 'hiragana': 'やく', 'meaning': 'Nướng chín bánh', 'explanation': '焼く (やく): Nướng.'},
                 {'id': 9, 'num': '⑨', 'answer': '度', 'targetWord': '度', 'hiragana': 'ど', 'meaning': 'Độ (200 độ C)', 'explanation': '度 (ど): Đơn vị đo nhiệt độ.'},
                 {'id': 10, 'num': '⑩', 'answer': '温める', 'targetWord': '温める', 'hiragana': 'あたためる', 'meaning': 'Làm nóng lò trước (Preheat)', 'explanation': '温める (あたためる): Làm nóng / Giữ ấm.'}
             ]
         },
         2)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 4 (病院): Quiz 3・4 【1】, 【2】 & 【3】 (ĐỦ 3 BÀI CHUẨN GIÁO TRÌNH)
    # ─────────────────────────────────────────────────────────────────────────────
    games[4] = [
        ('CLOZE_DIALOGUE',
         'Minigame 1: Quán nhậu sau giờ làm việc — Gọi món & Đụng ly (3章・4章 クイズ 【1】)',
         'Quan sát tranh bài tập gốc trên bàn nhậu. Bấm icon loa để nghe phát âm và chọn chữ Hán thích hợp điền vào các ô thoại của từng người:',
         '/assets/kanji/n3/quizzes/quiz_3_4_drinking_dialogue.webp',
         {
             'dialogue': [
                 {'speaker': '山田', 'name': '1. 山田 (Yamada)', 'text': '今日も一日おつかれさま。まずは、みんなで乾 [blank:1] しよう！'},
                 {'speaker': '田中', 'name': '2. 田中 (Tanaka)', 'text': 'とりあえず、[blank:2] たい ビールを 4つ お願いします。'},
                 {'speaker': '佐藤', 'name': '3. 佐藤 (Sato)', 'text': 'おつまみは、枝 [blank:3] と 生 [blank:4]、それから [blank:5] き魚を頼みましょう。'},
                 {'speaker': '鈴木', 'name': '4. 鈴木 (Suzuki)', 'text': 'すみません、私はお酒が飲めないので、ウーロン茶の [blank:6] をもらえますか。'},
                 {'speaker': '中村', 'name': '5. 中村 (Nakamura)', 'text': 'この焼き鳥、タレじゃなくて [blank:7] 味 で注文してもいいですか。'},
                 {'speaker': '上田', 'name': '6. 上田 (Ueda)', 'text': '夕べ飲みすぎたせいか、頭 [blank:8] がする。二日酔いだ…'}
             ],
             'wordBank': ['杯', '冷', '豆', '菜', '焼', '缶', '塩', '痛', '熱', '粉'],
             'blanks': [
                 {'id': 1, 'num': '1', 'targetWord': '乾杯', 'hiragana': 'かんぱい', 'answer': '杯', 'meaning': 'Cạn ly, nâng ly chúc mừng', 'explanation': 'Từ ghép 乾杯 (かんぱい): Chữ 杯 (BÔI).'},
                 {'id': 2, 'num': '2', 'targetWord': '冷たい', 'hiragana': 'つめたい', 'answer': '冷', 'meaning': 'Lạnh (bia lạnh)', 'explanation': 'Tính từ 冷たい (つめたい): Chữ 冷 (LÃNH).'},
                 {'id': 3, 'num': '3', 'targetWord': '枝豆', 'hiragana': 'えだまめ', 'answer': '豆', 'meaning': 'Đậu nành luộc', 'explanation': 'Từ ghép 枝豆 (えだまめ): Chữ 豆 (ĐẬU).'},
                 {'id': 4, 'num': '4', 'targetWord': '生野菜', 'hiragana': 'なまやさい', 'answer': '菜', 'meaning': 'Rau sống', 'explanation': 'Từ ghép 生野菜 (なまやさい): Chữ 菜 (THÁI).'},
                 {'id': 5, 'num': '5', 'targetWord': '焼き魚', 'hiragana': 'やきざかな', 'answer': '焼', 'meaning': 'Cá nướng', 'explanation': 'Từ ghép 焼き魚 (やきざかな): Chữ 焼 (THIÊU).'},
                 {'id': 6, 'num': '6', 'targetWord': '缶', 'hiragana': 'かん', 'answer': '缶', 'meaning': 'Lon nước (lon trà ô long)', 'explanation': 'Danh từ 缶 (PHẪU / QUÁN): Chữ 缶.'},
                 {'id': 7, 'num': '7', 'targetWord': '塩味', 'hiragana': 'しおあじ', 'answer': '塩', 'meaning': 'Vị muối', 'explanation': 'Từ ghép 塩味 (しおあじ): Chữ 塩 (DIÊM).'},
                 {'id': 8, 'num': '8', 'targetWord': '頭痛', 'hiragana': 'ずつう', 'answer': '痛', 'meaning': 'Đau đầu', 'explanation': 'Từ ghép 頭痛 (ずつう): Chữ 痛 (THỐNG).'}
             ]
         },
         1),
        ('CLOZE_DIALOGUE',
         'Minigame 2: Đối thoại khám bệnh tại phòng khám (3章・4章 クイズ 【2】)',
         'Quan sát bài tập gốc giữa Bác sĩ & Bệnh nhân. Đọc kỹ 4 tình huống khám bệnh và điền chữ Hán thích hợp vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_3_4_doctor_patient.webp',
         {
             'dialogue': [
                 {'speaker': 'A', 'name': '患者 A (Bệnh nhân A)', 'text': '夕べ急に [blank:1] が出て、たくさん [blank:2] をかいているんです。'},
                 {'speaker': '医者', 'name': '医師 (Bác sĩ)', 'text': 'インフルエンザかもしれません。まずは 体[blank:3] を測ってみましょう。'},
                 {'speaker': 'B', 'name': '患者 B (Bệnh nhân B)', 'text': '包丁で指を切ってしまって、[blank:4] が止まらないんです…'},
                 {'speaker': '医者', 'name': '医師 (Bác sĩ)', 'text': 'それは大変、すぐに傷口を消毒して [blank:5] 帯 を巻いて圧迫止血しましょう。'},
                 {'speaker': 'C', 'name': '患者 C (Bệnh nhân C)', 'text': '花粉症の季節のせいか、[blank:6] 水が止まらなくて、苦しくて息ができません。'},
                 {'speaker': '医者', 'name': '医師 (Bác sĩ)', 'text': '口を開けて深 [blank:7] 吸 をしてください。気管支を診察します。'},
                 {'speaker': 'D', 'name': '患者 D (Bệnh nhân D)', 'text': '健康診断の結果、貧血気味と言われたので心配です。'},
                 {'speaker': '医者', 'name': '医師 (Bác sĩ)', 'text': '念のため [blank:8] 液 を採取して、詳しい [blank:9] 査 を行いましょう。'}
             ],
             'wordBank': ['熱', '汗', '温', '血', '包', '鼻', '呼', '液', '検', '痛', '歯'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '熱', 'hiragana': 'ねつ', 'answer': '熱', 'meaning': 'Sốt (nhiệt)', 'explanation': 'Chữ 熱 (NHIỆT): Sốt cao.'},
                 {'id': 2, 'num': '②', 'targetWord': '汗', 'hiragana': 'あせ', 'answer': '汗', 'meaning': 'Mồ hôi (đổ mồ hôi)', 'explanation': 'Chữ 汗 (HÃN): Mồ hôi.'},
                 {'id': 3, 'num': '③', 'targetWord': '体温', 'hiragana': 'たいおん', 'answer': '温', 'meaning': 'Thân nhiệt', 'explanation': 'Từ ghép 体温 (たいおん): Chữ 温 (ÔN).'},
                 {'id': 4, 'num': '④', 'targetWord': '血', 'hiragana': 'ち', 'answer': '血', 'meaning': 'Máu chảy', 'explanation': 'Chữ 血 (HUYẾT): Máu.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '包帯', 'hiragana': 'ほうたい', 'answer': '包', 'meaning': 'Băng gạc', 'explanation': 'Từ ghép 包帯 (ほうたい): Chữ 包 (BAO).'},
                 {'id': 6, 'num': '⑥', 'targetWord': '鼻水', 'hiragana': 'はなみず', 'answer': '鼻', 'meaning': 'Nước mũi', 'explanation': 'Chữ 鼻 (TỊ): Mũi.'},
                 {'id': 7, 'num': '⑦', 'targetWord': '深呼吸', 'hiragana': 'しんこきゅう', 'answer': '呼', 'meaning': 'Hít thở sâu', 'explanation': 'Chữ 呼 (HÔ) trong 呼吸 (こきゅう).'},
                 {'id': 8, 'num': '⑧', 'targetWord': '血液', 'hiragana': 'けつえき', 'answer': '液', 'meaning': 'Máu / Huyết dịch', 'explanation': 'Từ ghép 血液 (けつえき): Chữ 液 (DỊCH).'},
                 {'id': 9, 'num': '⑨', 'targetWord': '検査', 'hiragana': 'けんさ', 'answer': '検', 'meaning': 'Xét nghiệm kiểm tra', 'explanation': 'Từ ghép 検査 (けんさ): Chữ 検 (KIỂM).'}
             ]
         },
         2),
        ('RECIPE_CLOZE',
         'Minigame 3: Công thức làm bánh dâu tây (3章・4章 クイズ 【3】)',
         'Quan sát phiếu công thức làm bánh chuẩn trong giáo trình. Chọn từ vựng thích hợp từ cột bên phải để điền vào các ô trống từ ① đến ⑩:',
         '/assets/kanji/n3/quizzes/quiz_3_4_shortcake_recipe.webp',
         {
             'wordBank': ['材料', '卵', '小麦粉', '牛乳', '果物', '量る', '型', '焼く', '度', '温める'],
             'blanks': [
                 {'id': 1, 'num': '①', 'answer': '材料', 'targetWord': '材料', 'hiragana': 'ざいりょう', 'meaning': 'Nguyên liệu làm bánh', 'explanation': '材料 (ざいりょう): Nguyên liệu.'},
                 {'id': 2, 'num': '②', 'answer': '卵', 'targetWord': '卵', 'hiragana': 'たまご', 'meaning': 'Trứng gà (3 quả)', 'explanation': '卵 (たまご): Trứng.'},
                 {'id': 3, 'num': '③', 'answer': '小麦粉', 'targetWord': '小麦粉', 'hiragana': 'こむぎこ', 'meaning': 'Bột mì (100g)', 'explanation': '小麦粉 (こむぎこ): Bột mì.'},
                 {'id': 4, 'num': '④', 'answer': '牛乳', 'targetWord': '牛乳', 'hiragana': 'ぎゅうにゅう', 'meaning': 'Sữa tươi (2 muỗng lớn)', 'explanation': '牛乳 (ぎゅうにゅう): Sữa bò.'},
                 {'id': 5, 'num': '⑤', 'answer': '果物', 'targetWord': '果物', 'hiragana': 'くだもの', 'meaning': 'Trái cây (dâu tây 1 hộp)', 'explanation': '果物 (くだもの): Trái cây / Hoa quả.'},
                 {'id': 6, 'num': '⑥', 'answer': '量る', 'targetWord': '量る', 'hiragana': 'はかる', 'meaning': 'Cân đo đong đếm nguyên liệu', 'explanation': '量る (はかる): Đo lường khối lượng.'},
                 {'id': 7, 'num': '⑦', 'answer': '型', 'targetWord': '型', 'hiragana': 'かた', 'meaning': 'Khuôn nướng bánh', 'explanation': '型 (かた): Khuôn mẫu.'},
                 {'id': 8, 'num': '⑧', 'answer': '焼く', 'targetWord': '焼く', 'hiragana': 'やく', 'meaning': 'Nướng chín bánh', 'explanation': '焼く (やく): Nướng.'},
                 {'id': 9, 'num': '⑨', 'answer': '度', 'targetWord': '度', 'hiragana': 'ど', 'meaning': 'Độ (200 độ C)', 'explanation': '度 (ど): Đơn vị đo nhiệt độ.'},
                 {'id': 10, 'num': '⑩', 'answer': '温める', 'targetWord': '温める', 'hiragana': 'あたためる', 'meaning': 'Làm nóng lò trước (Preheat)', 'explanation': '温める (あたためる): Làm nóng / Giữ ấm.'}
             ]
         },
         3)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 5 (スポーツ): Quiz 5・6 【1】, 【2】, 【3a】, 【3b】 (ĐỦ 4 BÀI CHUẨN GIÁO TRÌNH)
    # ─────────────────────────────────────────────────────────────────────────────
    games[5] = [
        ('RADICAL_COMBINE',
         'Minigame 1: Ghép bộ phận A và B tạo chữ Hán hoàn chỉnh câu văn (5章・6章 クイズ 【1】)',
         'Quan sát hàng A (扌・言・禾・川・谷) và B (己・丁・少・欠・頁). Ghép 1 bộ phận từ A và 1 từ B để tạo chữ Hán điền vào câu:',
         '/assets/kanji/n3/quizzes/quiz_5_6_p1.webp',
         {
             'colA': ['扌', '禾', '言', '川', '谷'],
             'colB': ['丁', '少', '己', '頁', '欠'],
             'wordBank': ['打', '秒', '記', '順', '欲'],
             'questions': [
                 {'id': 1, 'sentence': 'ヒットを [blank] って点が入った。', 'combine': '扌 + 丁', 'answer': '打', 'targetWord': '打って', 'hiragana': 'うって', 'meaning': 'Đánh bóng', 'explanation': 'Ghép 扌 + 丁 tạo thành chữ 打 (ĐẢ) trong 打つ.'},
                 {'id': 2, 'sentence': '1 [blank] 差でおしくも二位になった。', 'combine': '禾 + 少', 'answer': '秒', 'targetWord': '秒差', 'hiragana': 'いちびょうさ', 'meaning': 'Cách nhau 1 giây', 'explanation': 'Ghép 禾 + 少 tạo thành chữ 秒 (MIỂU) trong 1秒差.'},
                 {'id': 3, 'sentence': '毎日、日本語で日 [blank] を書いている。', 'combine': '言 + 己', 'answer': '記', 'targetWord': '日記', 'hiragana': 'にっき', 'meaning': 'Viết nhật ký', 'explanation': 'Ghép 言 + 己 tạo thành chữ 記 (KÝ) trong 日記.'},
                 {'id': 4, 'sentence': '彼女はいつもテストの [blank] 位がクラスでトップだ。', 'combine': '川 + 頁', 'answer': '順', 'targetWord': '順位', 'hiragana': 'じゅんい', 'meaning': 'Thứ hạng, vị trí xếp hạng', 'explanation': 'Ghép 川 + 頁 tạo thành chữ 順 (THUẬN) trong 順位.'},
                 {'id': 5, 'sentence': 'もっと大きいテレビが [blank] しい。', 'combine': '谷 + 欠', 'answer': '欲', 'targetWord': '欲しい', 'hiragana': 'ほしい', 'meaning': 'Muốn có', 'explanation': 'Ghép 谷 + 欠 tạo thành chữ 欲 (DỤC) trong 欲しい.'}
             ]
         },
         1),
        ('MULTIPLE_CHOICE',
         'Minigame 2: Giải nghĩa ngữ cảnh từ vựng thể thao & cảm xúc (5章・6章 クイズ 【2】)',
         'Đọc kỹ lời giải nghĩa bên dưới, chọn chữ Hán chính xác trong khung (苦・決・涙・感・記) để điền vào từ ghép:',
         '/assets/kanji/n3/quizzes/quiz_5_6_p1.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '優勝を決める戦い・・・【　】勝戦', 'promptVi': 'Trận chiến quyết định chức vô địch・・・Trận chung kết', 'options': ['決', '記', '苦', '涙'], 'answer': '決', 'targetWord': '決勝戦', 'hiragana': 'けっしょうせん', 'meaning': 'Trận chung kết', 'explanation': '決勝戦 (けっしょうせん): Chữ 決 (QUYẾT).'},
                 {'id': 2, 'promptJa': 'スポーツなどの成績や結果・・・【　】録', 'promptVi': 'Thành tích và kết quả thi đấu thể thao・・・Kỷ lục', 'options': ['記', '決', '感', '苦'], 'answer': '記', 'targetWord': '記録', 'hiragana': 'きろく', 'meaning': 'Kỷ lục, ghi chép', 'explanation': '記録 (きろく): Chữ 記 (KÝ).'},
                 {'id': 3, 'promptJa': 'コーヒー、薬などのいやな味・・・【　】み', 'promptVi': 'Vị đắng khó chịu của cà phê, thuốc men・・・Vị đắng', 'options': ['苦', '涙', '決', '感'], 'answer': '苦', 'targetWord': '苦み', 'hiragana': 'にがみ', 'meaning': 'Vị đắng', 'explanation': '苦み (にがみ): Chữ 苦 (KHỔ).'},
                 {'id': 4, 'promptJa': '悲しい時や、くやしい時に目から出る水のような液体・・・【　】', 'promptVi': 'Chất lỏng chảy ra từ mắt khi buồn bã, tiếc nuối・・・Nước mắt', 'options': ['涙', '苦', '感', '記'], 'answer': '涙', 'targetWord': '涙', 'hiragana': 'なみだ', 'meaning': 'Nước mắt', 'explanation': '涙 (なみだ): Chữ 涙 (LỆ).'},
                 {'id': 5, 'promptJa': 'うれしい、苦しい、悲しいなどの気持ち・・・【　】情', 'promptVi': 'Tâm trạng vui mừng, đau khổ, đau buồn・・・Tình cảm, cảm xúc', 'options': ['感', '決', '記', '涙'], 'answer': '感', 'targetWord': '感情', 'hiragana': 'かんじょう', 'meaning': 'Tình cảm, cảm xúc', 'explanation': '感情 (かんじょう): Chữ 感 (CẢM).'}
             ]
         },
         2),
        ('CLOZE_DIALOGUE',
         'Minigame 3: Bài báo thể thao "Ishikawa sang Major League" — Điền chữ Hán (5章・6章 クイズ 【3a】)',
         'Quan sát bài báo "石川 メジャーへ" (Ishikawa sang Mỹ thi đấu). Bấm loa nghe phát âm và điền chữ Hán thích hợp vào các ô từ ① đến ⑤:',
         '/assets/kanji/n3/quizzes/quiz_5_6_baseball_article.webp',
         {
             'dialogue': [
                 {'speaker': '記事', 'name': '新聞見出し (Tiêu đề bài báo)', 'text': '【石川 メジャーへ】\n日本 [blank:1] にも選ばれた ARCの 石川一男 [blank:2] (30) が、米大リーグにチャレンジするため、7日、米国へ出発。'},
                 {'speaker': '石川', 'name': '石川一男選手 (Phỏng vấn trực tiếp)', 'text': '現地に着いてすぐ記者の取材を受け、「[blank:3] の速さには [blank:4] がある。ストレートで [blank:5] したい。」と語った。'}
             ],
             'wordBank': ['代', '表', '投', '手', '球', '自', '信', '勝', '負'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '代表', 'hiragana': 'だいひょう', 'answer': '代', 'meaning': 'Đại diện tuyển quốc gia', 'explanation': '日本代表 (にほんだいひょう): Chữ 代 (ĐẠI).'},
                 {'id': 2, 'num': '②', 'targetWord': '投手', 'hiragana': 'とうしゅ', 'answer': '投', 'meaning': 'Cầu thủ ném bóng (Pitcher)', 'explanation': '投手 (とうしゅ): Chữ 投 (ĐẦU).'},
                 {'id': 3, 'num': '③', 'targetWord': '球', 'hiragana': 'たま', 'answer': '球', 'meaning': 'Quả bóng ném', 'explanation': '球 (たま): Chữ 球 (CẦU).'},
                 {'id': 4, 'num': '④', 'targetWord': '自信', 'hiragana': 'じしん', 'answer': '信', 'meaning': 'Tự tin', 'explanation': '自信 (じしん): Chữ 信 (TÍN).'},
                 {'id': 5, 'num': '⑤', 'targetWord': '勝負', 'hiragana': 'しょうぶ', 'answer': '勝', 'meaning': 'So tài, quyết đấu thắng bại', 'explanation': '勝負 (しょうぶ): Chữ 勝 (THẮNG).'}
             ]
         },
         3),
        ('MULTIPLE_CHOICE',
         'Minigame 4: Đọc hiểu & Cách đọc Furigana 10 từ vựng bài báo thể thao (5章・6章 クイズ 【3b】)',
         'Quan sát bài báo thể thao, chọn cách đọc Hiragana đúng nhất cho các từ vựng gạch chân trong bài thi gốc:',
         '/assets/kanji/n3/quizzes/quiz_5_6_baseball_article.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '①「日本代表」の下線部の正しい読み方はどれですか。', 'promptVi': 'Cách đọc đúng của từ gạch chân "日本代表" là gì?', 'options': ['だいひょう', 'たいひょう', 'たいしょう', 'だいしょう'], 'answer': 'だいひょう', 'targetWord': '代表', 'meaning': 'Đại diện', 'explanation': '代表 (だいひょう): Đại diện quốc gia.'},
                 {'id': 2, 'promptJa': '②「投手」の下線部の正しい読み方はどれですか。', 'promptVi': 'Cách đọc đúng của từ gạch chân "投手" là gì?', 'options': ['とうしゅ', 'なげしゅ', 'とうて', 'どうしゅ'], 'answer': 'とうしゅ', 'targetWord': '投手', 'meaning': 'Cầu thủ ném bóng', 'explanation': '投手 (とうしゅ): Pitcher.'},
                 {'id': 3, 'promptJa': '⑦「笑顔で語った」の「笑顔」の正しい読み方はどれですか。', 'promptVi': 'Cách đọc đúng của từ gạch chân "笑顔" là gì?', 'options': ['えがお', 'わらいがお', 'しょうがん', 'にこがお'], 'answer': 'えがお', 'targetWord': '笑顔', 'meaning': 'Nụ cười rạng rỡ', 'explanation': '笑顔 (えがお): Khuôn mặt cười.'},
                 {'id': 4, 'promptJa': '⑧「十七勝」の下線部の正しい読み方はどれですか。', 'promptVi': 'Cách đọc đúng của từ gạch chân "十七勝" là gì?', 'options': ['じゅうななしょう', 'じゅうしちしょう', 'じゅうななかち', 'とおななしょう'], 'answer': 'じゅうななしょう', 'targetWord': '十七勝', 'meaning': '17 trận thắng', 'explanation': '十七勝 (じゅうななしょう): Đếm số trận thắng.'},
                 {'id': 5, 'promptJa': '⑩「チームを優勝にみちびいた」の「優勝」の正しい読み方はどれですか。', 'promptVi': 'Cách đọc đúng của từ gạch chân "優勝" là gì?', 'options': ['ゆうしょう', 'ゆうすう', 'ゆしょう', 'しょうゆう'], 'answer': 'ゆうしょう', 'targetWord': '優勝', 'meaning': 'Vô địch', 'explanation': '優勝 (ゆうしょう): Giành chức vô địch.'}
             ]
         },
         4)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # CHƯƠNG 6 (感情): Quiz 5・6 【1】, 【2】 & 【3】 (3 bài)
    # ─────────────────────────────────────────────────────────────────────────────
    games[6] = [
        ('RADICAL_COMBINE',
         'Minigame 1: Ghép bộ phận A và B tạo chữ Hán hoàn chỉnh câu văn (5章・6章 クイズ 【1】)',
         'Quan sát hàng A (扌・言・禾・川・谷) và B (己・丁・少・欠・頁). Ghép 1 bộ phận từ A và 1 từ B để tạo chữ Hán điền vào câu:',
         '/assets/kanji/n3/quizzes/quiz_5_6_p1.webp',
         {
             'colA': ['扌', '禾', '言', '川', '谷'],
             'colB': ['丁', '少', '己', '頁', '欠'],
             'wordBank': ['打', '秒', '記', '順', '欲'],
             'questions': [
                 {'id': 1, 'sentence': 'ヒットを [blank] って点が入った。', 'combine': '扌 + 丁', 'answer': '打', 'targetWord': '打って', 'hiragana': 'うって', 'meaning': 'Đánh bóng', 'explanation': 'Ghép 扌 + 丁 tạo thành chữ 打 (ĐẢ).'},
                 {'id': 2, 'sentence': '1 [blank] 差でおしくも二位になった。', 'combine': '禾 + 少', 'answer': '秒', 'targetWord': '秒差', 'hiragana': 'いちびょうさ', 'meaning': 'Cách nhau 1 giây', 'explanation': 'Ghép 禾 + 少 tạo thành chữ 秒 (MIỂU).'},
                 {'id': 3, 'sentence': '毎日、日本語で日 [blank] を書いている。', 'combine': '言 + 己', 'answer': '記', 'targetWord': '日記', 'hiragana': 'にっき', 'meaning': 'Viết nhật ký', 'explanation': 'Ghép 言 + 己 tạo thành chữ 記 (KÝ).'},
                 {'id': 4, 'sentence': '彼女はいつもテストの [blank] 位がクラスでトップだ。', 'combine': '川 + 頁', 'answer': '順', 'targetWord': '順位', 'hiragana': 'じゅんい', 'meaning': 'Thứ hạng xếp hạng', 'explanation': 'Ghép 川 + 頁 tạo thành chữ 順 (THUẬN).'},
                 {'id': 5, 'sentence': 'もっと大きいテレビが [blank] しい。', 'combine': '谷 + 欠', 'answer': '欲', 'targetWord': '欲しい', 'hiragana': 'ほしい', 'meaning': 'Muốn có', 'explanation': 'Ghép 谷 + 欠 tạo thành chữ 欲 (DỤC).'}
             ]
         },
         1),
        ('MULTIPLE_CHOICE',
         'Minigame 2: Giải nghĩa ngữ cảnh từ vựng thể thao & cảm xúc (5章・6章 クイズ 【2】)',
         'Đọc kỹ lời giải nghĩa bên dưới, chọn chữ Hán chính xác trong khung (苦・決・涙・感・記) để điền vào từ ghép:',
         '/assets/kanji/n3/quizzes/quiz_5_6_p1.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '優勝を決める戦い・・・【　】勝戦', 'promptVi': 'Trận chiến quyết định chức vô địch・・・Trận chung kết', 'options': ['決', '記', '苦', '涙'], 'answer': '決', 'targetWord': '決勝戦', 'hiragana': 'けっしょうせん', 'meaning': 'Trận chung kết', 'explanation': '決勝戦: Chữ 決.'},
                 {'id': 2, 'promptJa': 'スポーツなどの成績や結果・・・【　】録', 'promptVi': 'Thành tích và kết quả thi đấu・・・Kỷ lục', 'options': ['記', '決', '感', '苦'], 'answer': '記', 'targetWord': '記録', 'hiragana': 'きろく', 'meaning': 'Kỷ lục', 'explanation': '記録: Chữ 記.'},
                 {'id': 3, 'promptJa': 'コーヒー、薬などのいやな味・・・【　】み', 'promptVi': 'Vị đắng khó chịu của cà phê, thuốc men・・・Vị đắng', 'options': ['苦', '涙', '決', '感'], 'answer': '苦', 'targetWord': '苦み', 'hiragana': 'にがみ', 'meaning': 'Vị đắng', 'explanation': '苦み: Chữ 苦.'},
                 {'id': 4, 'promptJa': '悲しい時や、くやしい時に目から出る水のような液体・・・【　】', 'promptVi': 'Chất lỏng chảy ra từ mắt khi buồn bã・・・Nước mắt', 'options': ['涙', '苦', '感', '記'], 'answer': '涙', 'targetWord': '涙', 'hiragana': 'なみだ', 'meaning': 'Nước mắt', 'explanation': '涙: Chữ 涙.'},
                 {'id': 5, 'promptJa': 'うれしい、苦しい、悲しいなどの気持ち・・・【　】情', 'promptVi': 'Tâm trạng vui mừng, buồn bã・・・Tình cảm, cảm xúc', 'options': ['感', '決', '記', '涙'], 'answer': '感', 'targetWord': '感情', 'hiragana': 'かんじょう', 'meaning': 'Cảm xúc', 'explanation': '感情: Chữ 感.'}
             ]
         },
         2),
        ('CLOZE_DIALOGUE',
         'Minigame 3: Đọc hiểu toàn văn bài báo thể thao "Ishikawa sang Major League" (5章・6章 クイズ 【3】)',
         'Quan sát bài báo thể thao gốc. Bấm icon loa để nghe phát âm tiếng Nhật và điền các chữ Hán vào toàn bộ 10 chỗ trống:',
         '/assets/kanji/n3/quizzes/quiz_5_6_baseball_article.webp',
         {
             'dialogue': [
                 {'speaker': '見出し', 'name': '新聞見出し (Tiêu đề báo)', 'text': '【石川 メジャーへ】\n日本 [blank:1] にも選ばれた ARCの 石川一男 [blank:2] (30) が、米大リーグにチャレンジするため、7日、米国へ出発。'},
                 {'speaker': '記者会見', 'name': '記者会見 (Họp báo)', 'text': '現地に着いてすぐ記者の取材を受け、「[blank:3] の速さには [blank:4] がある。ストレートで [blank:5] したい。」と [blank:6] で語った。'},
                 {'speaker': '戦績', 'name': '戦績紹介 (Thành tích thi đấu)', 'text': '石川は昨年、先発として [blank:7] を上げ、最多 [blank:8] をかくとくするとともに、チームを [blank:9] にみちびいた。'}
             ],
             'wordBank': ['代表', '投手', '球', '自信', '勝負', '笑顔', '十七勝', '勝', '優勝'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '代表', 'hiragana': 'だいひょう', 'answer': '代表', 'meaning': 'Đại diện tuyển quốc gia', 'explanation': '代表 (だいひょう).'},
                 {'id': 2, 'num': '②', 'targetWord': '投手', 'hiragana': 'とうしゅ', 'answer': '投手', 'meaning': 'Cầu thủ ném bóng', 'explanation': '投手 (とうしゅ).'},
                 {'id': 3, 'num': '③', 'targetWord': '球', 'hiragana': 'たま', 'answer': '球', 'meaning': 'Bóng', 'explanation': '球 (たま).'},
                 {'id': 4, 'num': '④', 'targetWord': '自信', 'hiragana': 'じしん', 'answer': '自信', 'meaning': 'Tự tin', 'explanation': '自信 (じしん).'},
                 {'id': 5, 'num': '⑤', 'targetWord': '勝負', 'hiragana': 'しょうぶ', 'answer': '勝負', 'meaning': 'Quyết đấu', 'explanation': '勝負 (しょうぶ).'},
                 {'id': 6, 'num': '⑥', 'targetWord': '笑顔', 'hiragana': 'えがお', 'answer': '笑顔', 'meaning': 'Nụ cười rạng rỡ', 'explanation': '笑顔 (えがお).'},
                 {'id': 7, 'num': '⑦', 'targetWord': '十七勝', 'hiragana': 'じゅうななしょう', 'answer': '十七勝', 'meaning': '17 trận thắng', 'explanation': '十七勝 (じゅうななしょう).'},
                 {'id': 8, 'num': '⑧', 'targetWord': '最多勝', 'hiragana': 'さいたしょう', 'answer': '勝', 'meaning': 'Nhiều trận thắng nhất', 'explanation': '最多勝 (さいたしょう).'},
                 {'id': 9, 'num': '⑨', 'targetWord': '優勝', 'hiragana': 'ゆうしょう', 'answer': '優勝', 'meaning': 'Vô địch', 'explanation': '優勝 (ゆうしょう).'}
             ]
         },
         3)
    ]

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 4 exercises for Chapters 7, 8, 9 (Quiz 7〜9)
    # ─────────────────────────────────────────────────────────────────────────────
    q7_9_games = [
        ('RADICAL_COMBINE',
         'Minigame 1: Ghép chữ Hán tạo từ vựng hôn nhân & quan hệ (7〜9章 クイズ 【1】)',
         'Quan sát các bộ phận chữ Hán, ghép các nét thích hợp để tạo thành chữ Hán điền vào câu văn:',
         '/assets/kanji/n3/quizzes/quiz_7_9_p1.webp',
         {
             'colA': ['糸', '女', '女', '亻', '亻'],
             'colB': ['吉', '良', '生', '中', '係'],
             'wordBank': ['結', '娘', '姓', '仲', '係'],
             'questions': [
                 {'id': 1, 'sentence': '二人は教会で [blank] 婚式を挙げた。', 'combine': '糸 + 吉', 'answer': '結', 'targetWord': '結婚', 'hiragana': 'けっこん', 'meaning': 'Kết hôn', 'explanation': '糸 + 吉 = 結 (KẾT).'},
                 {'id': 2, 'sentence': '一人 [blank] の結婚を父親は心から祝った。', 'combine': '女 + 良', 'answer': '娘', 'targetWord': '娘', 'hiragana': 'むすめ', 'meaning': 'Con gái', 'explanation': '女 + 良 = 娘 (NƯƠNG).'},
                 {'id': 3, 'sentence': '書類に氏名と [blank] 氏を記入してください。', 'combine': '女 + 生', 'answer': '姓', 'targetWord': '姓名', 'hiragana': 'せいめい', 'meaning': 'Họ tên', 'explanation': '女 + 生 = 姓 (TÍNH).'},
                 {'id': 4, 'sentence': '二人は子供のころからの [blank] 良しだ。', 'combine': '亻 + 中', 'answer': '仲', 'targetWord': '仲良し', 'hiragana': 'なかよし', 'meaning': 'Bạn thân thiết', 'explanation': '亻 + 中 = 仲 (TRỌNG).'},
                 {'id': 5, 'sentence': '案内の [blank] 員が会場の入り口で待っている。', 'combine': '亻 + 係', 'answer': '係', 'targetWord': '係員', 'hiragana': 'かかりいん', 'meaning': 'Nhân viên phụ trách', 'explanation': '亻 + 係 = 係 (HỆ).'}
             ]
         },
         1),
        ('MULTIPLE_CHOICE',
         'Minigame 2: Tiền tố & Hậu tố tiếng Nhật (無・未・初・再・非) (7〜9章 クイズ 【2】)',
         'Chọn tiền tố thích hợp (無・未・初・再・非) để tạo từ ghép có nghĩa đúng:',
         '/assets/kanji/n3/quizzes/quiz_7_9_p1.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': 'おしゃべりをあまりしない性格・・・【　】口', 'promptVi': 'Tính cách ít nói trầm mặc・・・Ít nói', 'options': ['無', '未', '初', '非'], 'answer': '無', 'targetWord': '無口', 'hiragana': 'むくち', 'meaning': 'Kín tiếng, ít nói', 'explanation': '無口 (むくち): Chữ 無 (VÔ).'},
                 {'id': 2, 'promptJa': 'まだ定まっていないこと・・・【　】定', 'promptVi': 'Việc vẫn chưa được ấn định・・・Chưa định', 'options': ['未', '無', '再', '非'], 'answer': '未', 'targetWord': '未定', 'hiragana': 'みてい', 'meaning': 'Chưa quyết định', 'explanation': '未定 (みてい): Chữ 未 (VỊ).'},
                 {'id': 3, 'promptJa': 'その年の冬に初めて降る雪・・・【　】雪', 'promptVi': 'Tuyết rơi lần đầu tiên trong mùa đông・・・Tuyết đầu mùa', 'options': ['初', '再', '未', '無'], 'answer': '初', 'targetWord': '初雪', 'hiragana': 'はつゆき', 'meaning': 'Tuyết đầu mùa', 'explanation': '初雪 (はつゆき): Chữ 初 (SƠ).'},
                 {'id': 4, 'promptJa': '長い間会っていなかった人と再び会うこと・・・【　】会', 'promptVi': 'Gặp lại người sau nhiều năm xa cách・・・Tái ngộ', 'options': ['再', '初', '未', '非'], 'answer': '再', 'targetWord': '再会', 'hiragana': 'さいかい', 'meaning': 'Gặp lại, tái ngộ', 'explanation': '再会 (さいかい): Chữ 再 (TÁI).'},
                 {'id': 5, 'promptJa': '道徳やルールに反して非難されること・・・【　】難', 'promptVi': 'Bị chỉ trích phản đối vì vi phạm quy tắc・・・Chỉ trích', 'options': ['非', '無', '未', '再'], 'answer': '非', 'targetWord': '非難', 'hiragana': 'ひなん', 'meaning': 'Chỉ trích, phê phán', 'explanation': '非難 (ひなん): Chữ 非 (PHI).'}
             ]
         },
         2),
        ('MULTIPLE_CHOICE',
         'Minigame 3: Chọn từ vựng điền câu văn ngữ cảnh (7〜9章 クイズ 【3】)',
         'Chọn từ vựng đúng trong khung (幸せ, 独立, 各地, 個性, 娘, 以上, 貯金, 和食) điền vào câu:',
         '/assets/kanji/n3/quizzes/quiz_7_9_p2.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '二人がいつまでも【　】に暮らせますように。', 'promptVi': 'Cầu chúc hai bạn mãi mãi sống hạnh phúc bên nhau.', 'options': ['幸せ', '個性', '独立', '和食'], 'answer': '幸せ', 'targetWord': '幸せ', 'hiragana': 'しあわせ', 'meaning': 'Hạnh phúc', 'explanation': '幸せ (しあわせ): Hạnh phúc viên mãn.'},
                 {'id': 2, 'promptJa': '大学を卒業して、親から【　】して一人暮らしを始めた。', 'promptVi': 'Tốt nghiệp đại học xong, tự lập khỏi bố mẹ và bắt đầu sống một mình.', 'options': ['独立', '貯金', '各地', '個性'], 'answer': '独立', 'targetWord': '独立', 'hiragana': 'どくりつ', 'meaning': 'Độc lập, tự lập', 'explanation': '独立 (どくりつ): Tự lập sống riêng.'},
                 {'id': 3, 'promptJa': '日本全国の【　】からお祝いのメッセージが届いた。', 'promptVi': 'Tin nhắn chúc mừng từ khắp các nơi trên toàn nước Nhật gửi về.', 'options': ['各地', '以上', '和食', '娘'], 'answer': '各地', 'targetWord': '各地', 'hiragana': 'かくち', 'meaning': 'Các nơi, khắp nơi', 'explanation': '各地 (かくち): Khắp mọi miền.'},
                 {'id': 4, 'promptJa': '結婚式を挙げるために、毎月コツコツ【　】した。', 'promptVi': 'Để tổ chức lễ cưới, hàng tháng đều đặn tiết kiệm tiền.', 'options': ['貯金', '独立', '幸せ', '以上'], 'answer': '貯金', 'targetWord': '貯金', 'hiragana': 'ちょきん', 'meaning': 'Tiết kiệm tiền', 'explanation': '貯金 (ちょきん): Tiết kiệm ngân hàng.'}
             ]
         },
         3),
        ('CLOZE_DIALOGUE',
         'Minigame 4: Thư mừng đám cưới & Lời chúc phúc ngọt ngào (7〜9章 クイズ 【4】)',
         'Đọc bức thư chúc mừng đám cưới "結婚おめでとう". Bấm loa nghe tiếng Nhật và điền các chữ Hán vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_7_9_wedding_letter.webp',
         {
             'dialogue': [
                 {'speaker': '手紙', 'name': '友人からの手紙 (Thư từ người bạn thân)', 'text': 'ご [blank:1] 婚おめでとうございます。\n二人が [blank:2] 婦 として新しい人生を歩み始めることを心よりお祝い申し上げます。'},
                 {'speaker': '思い出', 'name': '思い出の振り返り (Kỷ niệm xưa)', 'text': '同窓会での [blank:3] 会 をきっかけに [blank:4] き合い始め、お互いの [blank:5] 性 を認め合ってきた二人。'},
                 {'speaker': '祝福', 'name': '祝福の結び (Lời chúc phúc)', 'text': '[blank:6] と共に築く家庭が [blank:7] せな 笑顔で満たされますよう、心から [blank:8] っています。'}
             ],
             'wordBank': ['結', '夫', '再', '付', '個', '彼', '幸', '願'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '結婚', 'hiragana': 'けっこん', 'answer': '結', 'meaning': 'Kết hôn', 'explanation': '結婚 (けっこん): Chữ 結.'},
                 {'id': 2, 'num': '②', 'targetWord': '夫婦', 'hiragana': 'ふうふ', 'answer': '夫', 'meaning': 'Vợ chồng', 'explanation': '夫婦 (ふうふ): Chữ 夫.'},
                 {'id': 3, 'num': '③', 'targetWord': '再会', 'hiragana': 'さいかい', 'answer': '再', 'meaning': 'Gặp lại', 'explanation': '再会 (さいかい): Chữ 再.'},
                 {'id': 4, 'num': '④', 'targetWord': '付き合い', 'hiragana': 'つきあい', 'answer': '付', 'meaning': 'Hẹn hò, gắn bó', 'explanation': '付き合い (つきあい): Chữ 付.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '個性', 'hiragana': 'こせい', 'answer': '個', 'meaning': 'Cá tính', 'explanation': '個性 (こせい): Chữ 個.'},
                 {'id': 6, 'num': '⑥', 'targetWord': '彼', 'hiragana': 'かれ', 'answer': '彼', 'meaning': 'Anh ấy', 'explanation': '彼 (かれ): Chữ 彼.'},
                 {'id': 7, 'num': '⑦', 'targetWord': '幸せ', 'hiragana': 'しあわせ', 'answer': '幸', 'meaning': 'Hạnh phúc', 'explanation': '幸せ (しあわせ): Chữ 幸.'},
                 {'id': 8, 'num': '⑧', 'targetWord': '願って', 'hiragana': 'ねがって', 'answer': '願', 'meaning': 'Cầu nguyện, cầu chúc', 'explanation': '願う (ねがう): Chữ 願.'}
             ]
         },
         4)
    ]

    for ch in [7, 8, 9]:
        games[ch] = q7_9_games

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 4 exercises for Chapters 10, 11 (Quiz 10・11)
    # ─────────────────────────────────────────────────────────────────────────────
    q10_11_games = [
        ('MULTIPLE_CHOICE',
         'Minigame 1: Sửa chữ Hán sai trong ngữ cảnh học đường (10・11章 クイズ 【1】)',
         'Quan sát các biển báo trường học, phát hiện chữ Hán viết sai và chọn chữ Hán chuẩn xác thay thế:',
         '/assets/kanji/n3/quizzes/quiz_10_11_library_rules.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '図書館の「×窓付」の正しい漢字はどれですか。', 'promptVi': 'Biển báo "×窓付" ở thư viện chữ đúng là gì?', 'options': ['受付', '貸出', '返却', '案内'], 'answer': '受付', 'targetWord': '受付', 'hiragana': 'うけつけ', 'meaning': 'Quầy tiếp tân / Quầy làm thủ tục', 'explanation': 'Chữ đúng là 受付 (うけつけ - Thụ phó), không phải 窓付.'},
                 {'id': 2, 'promptJa': '「本は一度に×五数まで」の正しい漢字はどれですか。', 'promptVi': 'Câu "Sách mượn tối đa ×五数 một lần" chữ đúng là gì?', 'options': ['五冊', '五枚', '五本', '五個'], 'answer': '五冊', 'targetWord': '五冊', 'hiragana': 'ごさつ', 'meaning': 'Năm cuốn sách', 'explanation': 'Đơn vị đếm sách là 冊 (SÁCH): 五冊 (ごさつ).'},
                 {'id': 3, 'promptJa': '「期日までに×帰してください」の正しい漢字はどれですか。', 'promptVi': 'Câu "Hãy trả lại trước hạn" chữ đúng là gì?', 'options': ['返して', '戻して', '出して', '直して'], 'answer': '返して', 'targetWord': '返して', 'hiragana': 'かえして', 'meaning': 'Trả lại sách', 'explanation': 'Động từ trả lại là 返す (かえす), không phải 帰す (về nhà).'},
                 {'id': 4, 'promptJa': '「本に×洛書きをしないこと」の正しい漢字はどれですか。', 'promptVi': 'Câu "Không vẽ bậy lên sách" chữ đúng là gì?', 'options': ['落書き', '乱書き', '手書き', '下書き'], 'answer': '落書き', 'targetWord': '落書き', 'hiragana': 'らくがき', 'meaning': 'Vẽ bậy, viết bậy', 'explanation': 'Chữ đúng là 落書き (らくがき - Lạc thư).'}
             ]
         },
         1),
        ('CLOZE_DIALOGUE',
         'Minigame 2: Phỏng vấn thi tuyển & Tuyển sinh (10・11章 クイズ 【2】)',
         'Quan sát bài tập phỏng vấn, bấm loa nghe phát âm và điền chữ Hán thích hợp vào chỗ trống:',
         '/assets/kanji/n3/quizzes/quiz_10_11_parttime_interview.webp',
         {
             'dialogue': [
                 {'speaker': '面接官', 'name': '面接担当者 (Cán bộ phỏng vấn)', 'text': '本日の [blank:1] 接 にようこそ。ここまで何で来られましたか。'},
                 {'speaker': '志願者', 'name': '志願者 (Thí sinh)', 'text': '駅から [blank:2] 歩 で10分ほどで参りました。'},
                 {'speaker': '面接官', 'name': '面接担当者 (Cán bộ phỏng vấn)', 'text': '当校を第一 [blank:3] 望 に選んだ理由を聞かせてください。'},
                 {'speaker': '志願者', 'name': '志願者 (Thí sinh)', 'text': '将来の夢を実現するため、[blank:4] 記 試験も全力で準備してきました。'}
             ],
             'wordBank': ['面', '徒', '希', '筆', '験', '選'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '面接', 'hiragana': 'めんせつ', 'answer': '面', 'meaning': 'Phỏng vấn', 'explanation': '面接 (めんせつ): Chữ 面.'},
                 {'id': 2, 'num': '②', 'targetWord': '徒歩', 'hiragana': 'とほ', 'answer': '徒', 'meaning': 'Đi bộ', 'explanation': '徒歩 (とほ): Chữ 徒.'},
                 {'id': 3, 'num': '③', 'targetWord': '希望', 'hiragana': 'きぼう', 'answer': '希', 'meaning': 'Nguyện vọng', 'explanation': '第一希望: Chữ 希.'},
                 {'id': 4, 'num': '④', 'targetWord': '筆記', 'hiragana': 'ひっき', 'answer': '筆', 'meaning': 'Bút ký / Thi viết', 'explanation': '筆記試験: Chữ 筆.'}
             ]
         },
         2),
        ('MULTIPLE_CHOICE',
         'Minigame 3: Phân nhóm từ vựng trường lớp & Tính cách (10・11章 クイズ 【3】)',
         'Phân loại từ vựng chữ Hán theo nhóm ý nghĩa thích hợp trong môi trường học đường:',
         '/assets/kanji/n3/quizzes/quiz_10_11_brain_health_check.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '生徒の態度・性格を表す言葉の組み合わせはどれですか。', 'promptVi': 'Nhóm từ miêu tả thái độ, tính cách học sinh là gì?', 'options': ['不良・まじめ', '板前・調理師', '机・鉄棒', '落書き・筆記'], 'answer': '不良・まじめ', 'targetWord': '不良・まじめ', 'hiragana': 'ふりょう・まじめ', 'meaning': 'Cá biệt / Chăm ngoan', 'explanation': '不良 (bất hảo, cá biệt) và まじめ (nghiêm túc, chăm ngoan).'},
                 {'id': 2, 'promptJa': '料理に関する職業を表す言葉はどれですか。', 'promptVi': 'Từ nào chỉ nghề nghiệp liên quan đến nấu ăn nhà bếp?', 'options': ['板前・調理師', '担任・教師', '生徒・児童', '役員・大臣'], 'answer': '板前・調理師', 'targetWord': '板前・調理師', 'hiragana': 'いたまえ・ちょうりし', 'meaning': 'Đầu bếp, phụ bếp', 'explanation': '板前 (đầu bếp sushi) và 調理師 (đầu bếp chuyên nghiệp).'},
                 {'id': 3, 'promptJa': '教室や校庭にある設備・道具はどれですか。', 'promptVi': 'Từ nào chỉ trang thiết bị trong lớp hoặc sân trường?', 'options': ['机・鉄棒', '希望・夢', '成績・平均', '面接・合格'], 'answer': '机・鉄棒', 'targetWord': '机・鉄棒', 'hiragana': 'つくえ・てつぼう', 'meaning': 'Bàn học / Xà đơn', 'explanation': '机 (bàn học) và 鉄棒 (xà đơn sân trường).'}
             ]
         },
         3),
        ('CLOZE_DIALOGUE',
         'Minigame 4: Ký ức lớp học & Ước mơ tương lai (10・11章 クイズ 【4】)',
         'Đọc đoạn văn kể về năm học đáng nhớ. Bấm loa nghe phát âm và điền chữ Hán vào các ô trống:',
         '/assets/kanji/n3/quizzes/quiz_10_11_p2.webp',
         {
             'dialogue': [
                 {'speaker': '作文', 'name': '学生の作文 (Bài văn học sinh)', 'text': '高校3年の時、3年2 [blank:1] になり、新しい [blank:2] 任 の先生に出会った。'},
                 {'speaker': '反省', 'name': '反省と努力 (Nỗ lực)', 'text': '最初の模試では成 [blank:3] が [blank:4] く て落ち込んだ。'},
                 {'speaker': '決意', 'name': '夢への決意 (Quyết tâm)', 'text': '机に [blank:5] って毎晩復習を重ね、第一志望の大学に合格するという [blank:6] を叶えた。'}
             ],
             'wordBank': ['組', '担', '績', '悪', '座', '夢', '受', '落'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '組', 'hiragana': 'くみ', 'answer': '組', 'meaning': 'Lớp (Lớp 2)', 'explanation': '2組 (にぐみ): Chữ 組.'},
                 {'id': 2, 'num': '②', 'targetWord': '担任', 'hiragana': 'たんにん', 'answer': '担', 'meaning': 'Chủ nhiệm', 'explanation': '担任 (たんにん): Chữ 担.'},
                 {'id': 3, 'num': '③', 'targetWord': '成績', 'hiragana': 'せいせき', 'answer': '績', 'meaning': 'Thành tích', 'explanation': '成績 (せいせき): Chữ 績.'},
                 {'id': 4, 'num': '④', 'targetWord': '悪く', 'hiragana': 'わるく', 'answer': '悪', 'meaning': 'Xấu, kém', 'explanation': '悪く (わるく): Chữ 悪.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '座って', 'hiragana': 'すわって', 'answer': '座', 'meaning': 'Ngồi vào bàn', 'explanation': '座る (すわる): Chữ 座.'},
                 {'id': 6, 'num': '⑥', 'targetWord': '夢', 'hiragana': 'ゆめ', 'answer': '夢', 'meaning': 'Ước mơ', 'explanation': '夢 (ゆめ): Chữ 夢.'}
             ]
         },
         4)
    ]

    for ch in [10, 11]:
        games[ch] = q10_11_games

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 4 exercises for Chapters 12, 13 (Quiz 12・13)
    # ─────────────────────────────────────────────────────────────────────────────
    q12_13_games = [
        ('MULTIPLE_CHOICE',
         'Minigame 1: Điền từ vựng tiết học & Kiến thức khoa học (12・13章 クイズ 【1】)',
         'Chọn từ ngữ thích hợp (説明, 補習, 有効, 種類, 理解) điền vào câu văn hoàn chỉnh:',
         '/assets/kanji/n3/quizzes/quiz_12_13_science_museum.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '先生が難しい公式を具体例を挙げて【　】してくれた。', 'promptVi': 'Thầy giáo đã giải thích công thức khó bằng các ví dụ cụ thể.', 'options': ['説明', '補習', '有効', '種類'], 'answer': '説明', 'targetWord': '説明', 'hiragana': 'せつめい', 'meaning': 'Giải thích', 'explanation': '説明 (せつめい): Giải thích rõ ràng.'},
                 {'id': 2, 'promptJa': '授業に遅れた生徒のために放課後【　】が行われた。', 'promptVi': 'Buổi học bổ túc sau giờ học dành cho học sinh bị chậm bài.', 'options': ['補習', '説明', '理解', '種類'], 'answer': '補習', 'targetWord': '補習', 'hiragana': 'ほしゅう', 'meaning': 'Bổ túc, phụ đạo', 'explanation': '補習 (ほしゅう): Học bổ túc.'},
                 {'id': 3, 'promptJa': 'この定期券は発行日から1か月間【　】です。', 'promptVi': 'Vé tháng này có hiệu lực trong 1 tháng kể từ ngày phát hành.', 'options': ['有効', '種類', '説明', '補習'], 'answer': '有効', 'targetWord': '有効', 'hiragana': 'ゆうこう', 'meaning': 'Có hiệu lực', 'explanation': '有効 (ゆうこう): Hiệu lực sử dụng.'},
                 {'id': 4, 'promptJa': '地球上には数え切れないほどの動植物の【　】が存在する。', 'promptVi': 'Trên trái đất tồn tại vô số các chủng loại động thực vật.', 'options': ['種類', '有効', '理解', '説明'], 'answer': '種類', 'targetWord': '種類', 'hiragana': 'しゅるい', 'meaning': 'Chủng loại', 'explanation': '種類 (しゅるい): Chủng loại sinh vật.'}
             ]
         },
         1),
        ('KANJI_CROSS',
         'Minigame 2: Ô chữ chữ Hán tâm điểm bí ẩn 1 (12・13章 クイズ 【2】)',
         'Tìm chữ Hán chung thích hợp điền vào tâm điểm để tạo thành 4 từ vựng có nghĩa:',
         '/assets/kanji/n3/quizzes/quiz_12_13_word_search1.webp',
         {
             'puzzles': [
                 {'id': 1, 'top': '素', 'bottom': '直', 'left': '気', 'right': '良', 'answer': 'な', 'words': ['素直な (Thành thật)', '気楽な (Thoải mái)', '素朴な (Mộc mạc)', '善良な (Lương thiện)'], 'hint': 'Đuôi tính từ đuôi na'}
             ],
             'wordBank': ['な', '的', '然', '大', '小']
         },
         2),
        ('KANJI_CROSS',
         'Minigame 3: Ô chữ chữ Hán tâm điểm bí ẩn 2 (12・13章 クイズ 【3】)',
         'Tìm chữ Hán địa lý thích hợp điền vào tâm điểm:',
         '/assets/kanji/n3/quizzes/quiz_12_13_word_search2.webp',
         {
             'puzzles': [
                 {'id': 1, 'top': '大', 'bottom': '地', 'left': '着', 'right': '上', 'answer': '陸', 'words': ['大陸 (Đại lục)', '着陸 (Hạ cánh)', '陸上 (Trên cạn)', '陸地 (Đất liền)'], 'hint': 'Chữ RIKU (陸): Đất liền, lục địa'}
             ],
             'wordBank': ['陸', '海', '島', '岸', '坂']
         },
         3),
        ('CLOZE_DIALOGUE',
         'Minigame 4: Bài đọc Địa cầu & Địa lý tự nhiên (12・13章 クイズ 【4】)',
         'Đọc đoạn văn khám phá địa cầu. Bấm icon loa để nghe phát âm và điền chữ Hán thích hợp vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_12_13_p2.webp',
         {
             'dialogue': [
                 {'speaker': '解説', 'name': '地球科学の解説 (Khoa học địa cầu)', 'text': '地球の表面には、広大な海と大陸が広がっている。\n海 [blank:1] には巨大な海溝があり、北極や南極には厚い [blank:2] 河 が存在する。'},
                 {'speaker': '自然', 'name': '自然のめぐみ (Tự nhiên)', 'text': '[blank:3] 陽 の光が降り注ぎ、日本のような島国では四季折々の [blank:4] 候 を楽しむことができる。'}
             ],
             'wordBank': ['底', '氷', '陽', '気', '深', '流'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '海底', 'hiragana': 'かいてい', 'answer': '底', 'meaning': 'Đáy biển', 'explanation': '海底 (かいてい): Chữ 底.'},
                 {'id': 2, 'num': '②', 'targetWord': '氷河', 'hiragana': 'ひょうが', 'answer': '氷', 'meaning': 'Sông băng', 'explanation': '氷河 (ひょうが): Chữ 氷.'},
                 {'id': 3, 'num': '③', 'targetWord': '太陽', 'hiragana': 'たいよう', 'answer': '陽', 'meaning': 'Mặt trời', 'explanation': '太陽 (たいよう): Chữ 陽.'},
                 {'id': 4, 'num': '④', 'targetWord': '気候', 'hiragana': 'きこう', 'answer': '気', 'meaning': 'Khí hậu', 'explanation': '気候 (きこう): Chữ 気.'}
             ]
         },
         4)
    ]

    for ch in [12, 13]:
        games[ch] = q12_13_games

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 3 exercises for Chapters 14, 15 (Quiz 14・15)
    # ─────────────────────────────────────────────────────────────────────────────
    q14_15_games = [
        ('CLOZE_DIALOGUE',
         'Minigame 1: Chỉ đường du lịch & Biển báo giao thông (14・15章 クイズ 【1】)',
         'Quan sát sơ đồ chỉ dẫn đường phố. Bấm icon loa và điền các chữ Hán hướng dẫn đường đi vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_14_15_house_map.webp',
         {
             'dialogue': [
                 {'speaker': '案内', 'name': '道案内 (Chỉ đường du khách)', 'text': 'ホテルで一 [blank:1] り した後、駅前通りをまっすぐ [blank:2] めば 交差点があります。'},
                 {'speaker': '道順', 'name': '道順の説明 (Giải thích hướng đi)', 'text': '二つ目の [blank:3] を右に [blank:4] がる と、郵便局が左 [blank:5] に見えてきます。'}
             ],
             'wordBank': ['泊', '進', '角', '曲', '側', '直', '横'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '一泊', 'hiragana': 'いっぱく', 'answer': '泊', 'meaning': 'Trọ lại 1 đêm', 'explanation': '一泊 (いっぱく): Chữ 泊.'},
                 {'id': 2, 'num': '②', 'targetWord': '進めば', 'hiragana': 'すすめば', 'answer': '進', 'meaning': 'Tiến thẳng', 'explanation': '進む (すすむ): Chữ 進.'},
                 {'id': 3, 'num': '③', 'targetWord': '角', 'hiragana': 'かど', 'answer': '角', 'meaning': 'Góc đường', 'explanation': '角 (かど): Chữ 角.'},
                 {'id': 4, 'num': '④', 'targetWord': '曲がる', 'hiragana': 'まがる', 'answer': '曲', 'meaning': 'Rẽ, quẹo', 'explanation': '曲がる (まがる): Chữ 曲.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '左側', 'hiragana': 'ひだりがわ', 'answer': '側', 'meaning': 'Phía bên trái', 'explanation': '左側 (ひだりがわ): Chữ 側.'}
             ]
         },
         1),
        ('MULTIPLE_CHOICE',
         'Minigame 2: Phân biệt chữ Hán tương cận hình dáng (14・15章 クイズ 【2】)',
         'Chọn chữ Hán chính xác trong nhóm chữ tương tự nhau để hoàn thành từ ghép đúng:',
         '/assets/kanji/n3/quizzes/quiz_14_15_p2.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '空港でお客様を歓迎する・・・送【　】', 'promptVi': 'Đón tiếp khách tại sân bay・・・Đưa đón (Sougei)', 'options': ['迎', '芸', '近', '返'], 'answer': '迎', 'targetWord': '送迎', 'hiragana': 'そうげい', 'meaning': 'Đưa đón khách', 'explanation': '送迎 (そうげい): Chữ 迎 (NGHÊNH).'},
                 {'id': 2, 'promptJa': 'ヨーロッパ諸国の総称・・・【　】州', 'promptVi': 'Tên gọi chung các nước châu Âu・・・Âu châu', 'options': ['欧', '央', '横', '曲'], 'answer': '欧', 'targetWord': '欧州', 'hiragana': 'おうしゅう', 'meaning': 'Châu Âu', 'explanation': '欧州 (おうしゅう): Chữ 欧 (ÂU).'},
                 {'id': 3, 'promptJa': '新しい土地へ住まいを移すこと・・・【　】動', 'promptVi': 'Chuyển chỗ ở sang vùng đất mới・・・Di chuyển (Idou)', 'options': ['移', '意', '位', '部'], 'answer': '移', 'targetWord': '移動', 'hiragana': 'いどう', 'meaning': 'Di chuyển', 'explanation': '移動 (いどう): Chữ 移 (DI).'}
             ]
         },
         2),
        ('CLOZE_DIALOGUE',
         'Minigame 3: Lịch trình tour du lịch châu Âu (14・15章 クイズ 【3】)',
         'Quan sát tờ lịch trình tour châu Âu "欧州ツアー日程". Bấm loa nghe tiếng Nhật và điền chữ Hán vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_14_15_europe_tour.webp',
         {
             'dialogue': [
                 {'speaker': 'ツアー', 'name': 'ツアー案内 (Lịch trình tour)', 'text': '[blank:1] 州 5カ国を巡る [blank:2] 体 旅行の参加者を募集しています。'},
                 {'speaker': '日程', 'name': '旅行日程 (Hành trình chuyến đi)', 'text': '成田空港から直行 [blank:3] でパリへ [blank:4] 動 し、有名美術館で名画を鑑賞します。'}
             ],
             'wordBank': ['欧', '団', '便', '移', '泊', '宿'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '欧州', 'hiragana': 'おうしゅう', 'answer': '欧', 'meaning': 'Châu Âu', 'explanation': '欧州 (おうしゅう): Chữ 欧.'},
                 {'id': 2, 'num': '②', 'targetWord': '団体', 'hiragana': 'だんたい', 'answer': '団', 'meaning': 'Đoàn thể / Tour đoàn', 'explanation': '団体旅行: Chữ 団.'},
                 {'id': 3, 'num': '③', 'targetWord': '直行便', 'hiragana': 'ちょっこうびん', 'answer': '便', 'meaning': 'Chuyến bay thẳng', 'explanation': '直行便: Chữ 便.'},
                 {'id': 4, 'num': '④', 'targetWord': '移動', 'hiragana': 'いどう', 'answer': '移', 'meaning': 'Di chuyển', 'explanation': '移動: Chữ 移.'}
             ]
         },
         3)
    ]

    for ch in [14, 15]:
        games[ch] = q14_15_games

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 4 exercises for Chapters 16, 17 (Quiz 16・17)
    # ─────────────────────────────────────────────────────────────────────────────
    q16_17_games = [
        ('MULTIPLE_CHOICE',
         'Minigame 1: Chọn chữ Hán nghề nghiệp & Thủ tục hành chính (16・17章 クイズ 【1】)',
         'Chọn chữ Hán thích hợp trong khung (官・判・退・厚・賛) hoàn thành câu:',
         '/assets/kanji/n3/quizzes/quiz_16_17_p2.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '公務員として市役所で働く職種・・・公務【　】', 'promptVi': 'Công chức làm việc tại ủy ban thành phố・・・Công chức', 'options': ['官', '判', '退', '厚'], 'answer': '官', 'targetWord': '公務員', 'hiragana': 'こうむいん', 'meaning': 'Viên chức, công chức', 'explanation': '公務員 (こうむいん) / 警官: Chữ 官 (QUAN).'},
                 {'id': 2, 'promptJa': '状況を客観的に見極めて決定を下すこと・・・【　】断', 'promptVi': 'Xem xét khách quan tình hình và đưa ra quyết định・・・Phán đoán', 'options': ['判', '賛', '退', '官'], 'answer': '判', 'targetWord': '判断', 'hiragana': 'はんだん', 'meaning': 'Phán đoán', 'explanation': '判断 (はんだん): Chữ 判 (PHÁN).'},
                 {'id': 3, 'promptJa': '長年勤めた会社を辞めること・・・【　】職', 'promptVi': 'Rời công ty đã gắn bó nhiều năm・・・Nghỉ việc, thôi việc', 'options': ['退', '厚', '判', '賛'], 'answer': '退', 'targetWord': '退職', 'hiragana': 'たいしょく', 'meaning': 'Thôi việc, nghỉ hưu', 'explanation': '退職 (たいしょく): Chữ 退 (THOÁI).'},
                 {'id': 4, 'promptJa': '会議で提案に対して同意を示すこと・・・【　】成', 'promptVi': 'Bày tỏ sự đồng ý đối với đề xuất trong cuộc họp・・・Tán thành', 'options': ['賛', '判', '退', '官'], 'answer': '賛', 'targetWord': '賛成', 'hiragana': 'さんせい', 'meaning': 'Tán thành', 'explanation': '賛成 (さんせい): Chữ 賛 (TÁN).'}
             ]
         },
         1),
        ('RADICAL_COMBINE',
         'Minigame 2: Quy tắc giao tiếp công sở Hou-Ren-So (16・17章 クイズ 【2】)',
         'Ghép các chữ Hán tạo thành các nguyên tắc làm việc chuyên nghiệp tại doanh nghiệp Nhật Bản:',
         '/assets/kanji/n3/quizzes/quiz_16_17_p2.webp',
         {
             'colA': ['報', '連', '相'],
             'colB': ['告', '絡', '談'],
             'wordBank': ['報告', '連絡', '相談'],
             'questions': [
                 {'id': 1, 'sentence': '仕事の進捗を上司に [blank] する。', 'combine': '報 + 告', 'answer': '報告', 'targetWord': '報告', 'hiragana': 'ほうこく', 'meaning': 'Báo cáo', 'explanation': '報 + 告 = 報告 (HOUKOKU).'},
                 {'id': 2, 'sentence': '急な欠勤の際は事前に電話で [blank] してください。', 'combine': '連 + 絡', 'answer': '連絡', 'targetWord': '連絡', 'hiragana': 'れんらく', 'meaning': 'Liên lạc', 'explanation': '連 + 絡 = 連絡 (RENRAKU).'},
                 {'id': 3, 'sentence': '判断に迷ったときは一人で抱え込まず先輩に [blank] しよう。', 'combine': '相 + 談', 'answer': '相談', 'targetWord': '相談', 'hiragana': 'そうだん', 'meaning': 'Thảo luận, xin ý kiến', 'explanation': '相 + 談 = 相談 (SOUDAN).'}
             ]
         },
         2),
        ('CLOZE_DIALOGUE',
         'Minigame 3: Tin tuyển dụng việc làm thêm quán ăn (16・17章 クイズ 【3】)',
         'Quan sát tờ rơi tuyển dụng "アルバイト募集". Bấm loa nghe phát âm và điền chữ Hán vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_16_17_job_ad.webp',
         {
             'dialogue': [
                 {'speaker': '求人', 'name': '求人広告 (Tin tuyển dụng)', 'text': 'ホールスタッフ [blank:1] 員 募集！未経験者大歓迎。\n時 [blank:2] 1200円以上、交通費全額 [blank:3] 給。'},
                 {'speaker': '連絡', 'name': '応募方法 (Cách thức ứng tuyển)', 'text': '勤務時間やシフトは面接時にご [blank:4] 談 ください。お気軽にお電話でご [blank:5] 絡 を！'}
             ],
             'wordBank': ['店', '給', '支', '相', '連', '員', '職'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '店員', 'hiragana': 'てんいん', 'answer': '店', 'meaning': 'Nhân viên quán', 'explanation': '店員 (てんいん): Chữ 店.'},
                 {'id': 2, 'num': '②', 'targetWord': '時給', 'hiragana': 'じきゅう', 'answer': '給', 'meaning': 'Lương theo giờ', 'explanation': '時給 (じきゅう): Chữ 給.'},
                 {'id': 3, 'num': '③', 'targetWord': '支給', 'hiragana': 'しきゅう', 'answer': '支', 'meaning': 'Chi trả phụ cấp', 'explanation': '支給 (しきゅう): Chữ 支.'},
                 {'id': 4, 'num': '④', 'targetWord': '相談', 'hiragana': 'そうだん', 'answer': '相', 'meaning': 'Thảo luận, trao đổi', 'explanation': '相談 (そうだん): Chữ 相.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '連絡', 'hiragana': 'れんらく', 'answer': '連', 'meaning': 'Liên lạc', 'explanation': '連絡 (れんらく): Chữ 連.'}
             ]
         },
         3),
        ('MULTIPLE_CHOICE',
         'Minigame 4: Phỏng vấn & Thảo luận kế hoạch công việc (16・17章 クイズ 【4】)',
         'Chọn từ ngữ thích hợp trong nhóm (活動, 常識, 情報, 知識, 相談, 反対, 賛成) điền vào câu đàm thoại:',
         '/assets/kanji/n3/quizzes/quiz_16_17_student_career_advice.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '社会人として守るべき基本的なマナーや知識・・・社会人の【　】', 'promptVi': 'Phép lịch sự và kiến thức cơ bản của người đi làm・・・Quy tắc thường thức', 'options': ['常識', '情報', '知識', '活動'], 'answer': '常識', 'targetWord': '常識', 'hiragana': 'じょうしき', 'meaning': 'Thường thức xã hội', 'explanation': '常識 (じょうしき): Phép tắc thường thức.'},
                 {'id': 2, 'promptJa': 'インターネットで就職に関する最新の【　】を集める。', 'promptVi': 'Thu thập thông tin mới nhất về tìm việc trên mạng internet.', 'options': ['情報', '知識', '常識', '活動'], 'answer': '情報', 'targetWord': '情報', 'hiragana': 'じょうほう', 'meaning': 'Thông tin', 'explanation': '情報 (じょうほう): Thu thập thông tin.'},
                 {'id': 3, 'promptJa': '大学生が4年生になる前から始める仕事探しの準備・・・就職【　】', 'promptVi': 'Hoạt động chuẩn bị tìm việc của sinh viên・・・Hoạt động xin việc', 'options': ['活動', '相談', '賛成', '反対'], 'answer': '活動', 'targetWord': '就職活動', 'hiragana': 'しゅうしょくかつどう', 'meaning': 'Hoạt động tìm việc', 'explanation': '就職活動 (Shuukatsu): Hoạt động tìm việc làm.'}
             ]
         },
         4)
    ]

    for ch in [16, 17]:
        games[ch] = q16_17_games

    # ─────────────────────────────────────────────────────────────────────────────
    # Helper to populate authentic 4 exercises for Chapters 18, 19, 20 (Quiz 18〜20)
    # ─────────────────────────────────────────────────────────────────────────────
    q18_20_games = [
        ('MULTIPLE_CHOICE',
         'Minigame 1: Lựa chọn chữ Hán quản lý công ty & Ngân sách (18〜20章 クイズ 【1】)',
         'Chọn chữ Hán thích hợp (犯・規・件・機・術) hoàn thành câu:',
         '/assets/kanji/n3/quizzes/quiz_18_20_p2.webp',
         {
             'questions': [
                 {'id': 1, 'promptJa': '社会の秩序を乱す法律違反の行為・・・【　】罪', 'promptVi': 'Hành vi vi phạm pháp luật làm rối loạn trật tự xã hội・・・Tội phạm', 'options': ['犯', '規', '件', '機'], 'answer': '犯', 'targetWord': '犯罪', 'hiragana': 'はんざい', 'meaning': 'Tội phạm', 'explanation': '犯罪 (はんざい): Chữ 犯 (PHẠM).'},
                 {'id': 2, 'promptJa': '全員が守らなければならない決まり・・・【　】則', 'promptVi': 'Quy tắc mà mọi thành viên bắt buộc phải tuân thủ・・・Quy tắc', 'options': ['規', '犯', '件', '術'], 'answer': '規', 'targetWord': '規則', 'hiragana': 'きそく', 'meaning': 'Quy tắc, kỷ luật', 'explanation': '規則 (きそく): Chữ 規 (QUY).'},
                 {'id': 3, 'promptJa': '警察が捜査している重大な出来事・・・事【　】', 'promptVi': 'Sự việc nghiêm trọng cảnh sát đang điều tra・・・Vụ việc, biến cố', 'options': ['件', '機', '術', '犯'], 'answer': '件', 'targetWord': '事件', 'hiragana': 'じけん', 'meaning': 'Vụ án, biến cố', 'explanation': '事件 (じけん): Chữ 件 (KIỆN).'},
                 {'id': 4, 'promptJa': '工場で製品を自動で作る装置・・・【　】械', 'promptVi': 'Thiết bị tự động sản xuất sản phẩm trong nhà máy・・・Máy móc', 'options': ['機', '術', '規', '件'], 'answer': '機', 'targetWord': '機械', 'hiragana': 'きかい', 'meaning': 'Máy móc cơ khí', 'explanation': '機械 (きかい): Chữ 機 (CƠ).'}
             ]
         },
         1),
        ('RADICAL_COMBINE',
         'Minigame 2: Ghép chữ Hán kinh tế, nông nghiệp & Pháp luật (18〜20章 クイズ 【2】)',
         'Ghép các bộ phận để tạo chữ Hán điền vào câu văn hoàn chỉnh:',
         '/assets/kanji/n3/quizzes/quiz_18_20_p2.webp',
         {
             'colA': ['糸', '阝', '言', '曲'],
             'colB': ['扁', '僉', '己', '辰'],
             'wordBank': ['編', '険', '記', '農'],
             'questions': [
                 {'id': 1, 'sentence': '羊毛の糸でセーターを [blank] む。', 'combine': '糸 + 扁', 'answer': '編', 'targetWord': '編む', 'hiragana': 'あむ', 'meaning': 'Đan áo len', 'explanation': '糸 + 扁 = 編 (BIÊN) trong 編む.'},
                 {'id': 2, 'sentence': '工事現場の足場はとても [blank] しい。', 'combine': '阝 + 僉', 'answer': '険', 'targetWord': '険しい', 'hiragana': 'けわしい', 'meaning': 'Nguy hiểm, dốc đứng', 'explanation': '阝 + 僉 = 険 (HIỂM).'},
                 {'id': 3, 'sentence': '米や野菜を栽培する [blank] 業に従事する。', 'combine': '曲 + 辰', 'answer': '農', 'targetWord': '農業', 'hiragana': 'のうぎょう', 'meaning': 'Nông nghiệp', 'explanation': '曲 + 辰 = 農 (NÔNG).'}
             ]
         },
         2),
        ('CLOZE_DIALOGUE',
         'Minigame 3: Báo cáo phát triển nông công nghiệp & Kinh tế (18〜20章 クイズ 【3】)',
         'Quan sát bài báo kinh tế "産業と貿易のあゆみ". Bấm loa nghe phát âm và điền chữ Hán vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_18_20_industry_diary.webp',
         {
             'dialogue': [
                 {'speaker': '経済', 'name': '経済白書 (Báo cáo kinh tế)', 'text': '近代以降、我が国の [blank:1] 業 は急速に発展し、農村では [blank:2] 業 の [blank:3] 械 化が進んだ。'},
                 {'speaker': '貿易', 'name': '国際貿易 (Thương mại quốc tế)', 'text': '優れた科学 [blank:4] 術 を生かした製品を輸出し、海外との [blank:5] 易 によって国を [blank:6] か にした。'}
             ],
             'wordBank': ['産', '農', '機', '技', '貿', '豊', '商'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '産業', 'hiragana': 'さんぎょう', 'answer': '産', 'meaning': 'Công nghiệp, sản nghiệp', 'explanation': '産業: Chữ 産.'},
                 {'id': 2, 'num': '②', 'targetWord': '農業', 'hiragana': 'のうぎょう', 'answer': '農', 'meaning': 'Nông nghiệp', 'explanation': '農業: Chữ 農.'},
                 {'id': 3, 'num': '③', 'targetWord': '機械', 'hiragana': 'きかい', 'answer': '機', 'meaning': 'Máy móc', 'explanation': '機械化: Chữ 機.'},
                 {'id': 4, 'num': '④', 'targetWord': '技術', 'hiragana': 'ぎじゅつ', 'answer': '技', 'meaning': 'Kỹ thuật', 'explanation': '科学技術: Chữ 技.'},
                 {'id': 5, 'num': '⑤', 'targetWord': '貿易', 'hiragana': 'ぼうえき', 'answer': '貿', 'meaning': 'Ngoại thương', 'explanation': '貿易: Chữ 貿.'},
                 {'id': 6, 'num': '⑥', 'targetWord': '豊か', 'hiragana': 'ゆたか', 'answer': '豊', 'meaning': 'Giàu có, phồn vinh', 'explanation': '豊か: Chữ 豊.'}
             ]
         },
         3),
        ('CLOZE_DIALOGUE',
         'Minigame 4: Bình luận xã hội, luật pháp & Hòa bình nhân loại (18〜20章 クイズ 【4】)',
         'Đọc đoạn văn nghị luận về trật tự pháp luật và hòa bình. Bấm loa nghe phát âm và điền chữ Hán vào ô trống:',
         '/assets/kanji/n3/quizzes/quiz_18_20_pm_policy.webp',
         {
             'dialogue': [
                 {'speaker': '宣言', 'name': '平和宣言 (Tuyên ngôn hòa bình)', 'text': 'すべての市民が [blank:1] 等 な権利を持ち、貧 [blank:2] の差のない社会を築くことが大切である。'},
                 {'speaker': '法治', 'name': '法と秩序 (Pháp quyền)', 'text': '残虐な [blank:3] 争 や危険な兵器の製造は法律によって厳しく [blank:4] 止 されなければならない。'}
             ],
             'wordBank': ['平', '富', '戦', '禁', '法', '律', '罪'],
             'blanks': [
                 {'id': 1, 'num': '①', 'targetWord': '平等', 'hiragana': 'びょうどう', 'answer': '平', 'meaning': 'Bình đẳng', 'explanation': '平等 (びょうどう): Chữ 平.'},
                 {'id': 2, 'num': '②', 'targetWord': '貧富', 'hiragana': 'ひんぷ', 'answer': '富', 'meaning': 'Giàu nghèo', 'explanation': '貧富 (ひんぷ): Chữ 富.'},
                 {'id': 3, 'num': '③', 'targetWord': '戦争', 'hiragana': 'せんそう', 'answer': '戦', 'meaning': 'Chiến tranh', 'explanation': '戦争 (せんそう): Chữ 戦.'},
                 {'id': 4, 'num': '④', 'targetWord': '禁止', 'hiragana': 'きんし', 'answer': '禁', 'meaning': 'Cấm chỉ, ngăn cấm', 'explanation': '禁止 (きんし): Chữ 禁.'}
             ]
         },
         4)
    ]

    for ch in [18, 19, 20]:
        games[ch] = q18_20_games

    return games


def main():
    print("=" * 65)
    print("  BUILDING AUTHENTIC KANJI N3 MINIGAMES PER CHAPTER")
    print("=" * 65)

    games_dict = get_authentic_minigames()

    # Normalize questions: Ensure prompt and promptJa are both populated everywhere
    for ch_id, g_list in games_dict.items():
        for item in g_list:
            data_dict = item[4]
            if 'questions' in data_dict and isinstance(data_dict['questions'], list):
                for q in data_dict['questions']:
                    if isinstance(q, dict):
                        if 'promptJa' in q and 'prompt' not in q:
                            q['prompt'] = q['promptJa']
                        elif 'prompt' in q and 'promptJa' not in q:
                            q['promptJa'] = q['prompt']

    print("\n[Audit of Minigame Counts per Chapter]:")
    for ch_id in range(1, 21):
        g_list = games_dict.get(ch_id, [])
        print(f"  - Chapter {ch_id:02d}: {len(g_list)} minigames")

    # Update scripts/n3_minigames_dataset.py
    import pprint
    with open('scripts/n3_minigames_dataset.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\n')
        f.write('"""\nAuthentic minigames dataset for ALL 20 CHAPTERS of Kanji Master N3.\n')
        f.write('Faithful 1:1 mapping with textbook Quiz sections.\n"""\n\n')
        f.write('N3_AUTHENTIC_MINIGAMES = ')
        f.write(pprint.pformat(games_dict, indent=2, width=120))
        f.write('\n')
    print("\n✓ Successfully updated scripts/n3_minigames_dataset.py")

    # Connect to PostgreSQL and update DB
    print("\nConnecting to Supabase PostgreSQL...")
    conn = psycopg2.connect(
        host="52.65.247.42",
        port=6543,
        dbname="postgres",
        user="postgres.bxqwarbeocbsfjieqbsq",
        password=os.environ.get("SUPABASE_DB_PASSWORD", "hnvuwww1234A"),
        sslmode="require"
    )
    cursor = conn.cursor()

    total_inserted = 0
    for ch_num, g_list in sorted(games_dict.items()):
        cursor.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N3' AND chapter_number = %s;", (ch_num,))
        row = cursor.fetchone()
        if not row:
            print(f"Warning: Chapter {ch_num} not found in DB!")
            continue
        ch_id = row[0]

        # Delete old minigames for this chapter
        cursor.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))

        # Insert authentic minigames
        for gtype, title, inst, img, data_dict, d_order in g_list:
            cursor.execute("""
                INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW());
            """, (ch_id, gtype, title, inst, img, json.dumps(data_dict, ensure_ascii=False), d_order))
            total_inserted += 1

    conn.commit()
    cursor.close()
    conn.close()

    print(f"\n✓ Seeded {total_inserted} authentic minigames directly into Supabase PostgreSQL!")

if __name__ == '__main__':
    import os
    main()
