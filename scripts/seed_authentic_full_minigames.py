import sys
import json
import random
import psycopg2

sys.stdout.reconfigure(encoding='utf-8')
random.seed(42)

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

def shuffle_choices(correct, distractors):
    dists = [d for d in distractors if d != correct][:3]
    opts = [correct] + dists
    random.shuffle(opts)
    return opts

ALL_MINIGAMES = {
    # -------------------------------------------------------------
    # CHƯƠNG 1 (ID 31): 家族・マンション・仕事
    # -------------------------------------------------------------
    31: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 1章 クイズ — Sơ đồ gia phả gia đình Tanaka (Trang 26)",
            "instruction": "Quan sát sơ đồ gia phả gia đình Tanaka ở bài 【1】 trang 26, chọn chữ Hán/cách đọc tương ứng cho từng ô từ ① đến ⑩.",
            "image_url": "/assets/kanji/n4/minigames/chap1_game1_family_tree.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ mẫu (れい): Vị trí trung tâm trong sơ đồ", "answer": "私 (わたし)"},
                "questions": [
                    {"id": 1, "prompt": "① Vị trí khung lớn trên cùng — Gia đình sum họp (2 ô vuông):", "options": shuffle_choices("家族 (かぞく)", ["家庭 (かてい)", "家 (いえ)", "親族 (しんぞく)"]), "answer": "家族 (かぞく)", "explanation": "Toàn thể các thành viên hợp lại là 家族 (かぞく)."},
                    {"id": 2, "prompt": "② Vị trí người cha sinh thành trong gia đình:", "options": shuffle_choices("父 (ちち)", ["兄 (あに)", "弟 (おとうと)", "祖父 (そふ)"]), "answer": "父 (ちち)", "explanation": "Người cha trong nhà là chữ 父 (ちち)."},
                    {"id": 3, "prompt": "③ Vị trí người mẹ dịu hiền trong gia đình:", "options": shuffle_choices("母 (はは)", ["姉 (あね)", "妹 (いもうと)", "祖母 (そぼ)"]), "answer": "母 (はは)", "explanation": "Người mẹ trong nhà là chữ 母 (はは)."},
                    {"id": 4, "prompt": "④ Vị trí người anh trai lớn tuổi hơn Tôi:", "options": shuffle_choices("兄 (あに)", ["弟 (おとうと)", "父 (ちち)", "私 (わたし)"]), "answer": "兄 (あに)", "explanation": "Anh trai là chữ 兄 (あに)."},
                    {"id": 5, "prompt": "⑤ Vị trí người chị gái lớn tuổi hơn Tôi:", "options": shuffle_choices("姉 (あね)", ["妹 (いもうと)", "母 (はは)", "兄 (あに)"]), "answer": "姉 (あね)", "explanation": "Chị gái là chữ 姉 (あね)."},
                    {"id": 6, "prompt": "⑥ Vị trí người em trai nhỏ tuổi hơn Tôi:", "options": shuffle_choices("弟 (おとうと)", ["兄 (あに)", "妹 (いもうと)", "姉 (あね)"]), "answer": "弟 (おとうと)", "explanation": "Em trai là chữ 弟 (おとうと)."},
                    {"id": 7, "prompt": "⑦ Vị trí người em gái nhỏ tuổi nhất trong nhà:", "options": shuffle_choices("妹 (いもうと)", ["姉 (あね)", "弟 (おとうと)", "母 (はは)"]), "answer": "妹 (いもうと)", "explanation": "Em gái út là chữ 妹 (いもうと)."},
                    {"id": 8, "prompt": "⑧ Cả 5 người con (anh em trai gái) hợp lại gọi chung là:", "options": shuffle_choices("兄弟 (きょうだい)", ["姉妹 (しまい)", "家族 (かぞく)", "親戚 (しんせき)"]), "answer": "兄弟 (きょうだい)", "explanation": "5 anh chị em ruột gọi chung là 兄弟 (きょうだい)."},
                    {"id": 9, "prompt": "⑨ Nhóm ba người con trai trong nhà (Anh trai, Tôi và Em trai):", "options": shuffle_choices("男兄弟 (おとこきょうだい)", ["兄弟 (きょうだい)", "男 (おとこ)", "長男 (ちょうなん)"]), "answer": "男兄弟 (おとこきょうだい)", "explanation": "Các anh em trai gọi là 男兄弟."},
                    {"id": 10, "prompt": "⑩ Nhóm hai người con gái trong nhà (Chị gái và Em gái):", "options": shuffle_choices("姉妹 (しまい)", ["女兄弟 (おんなきょうだい)", "少女 (しょうじょ)", "家族 (かぞく)"]), "answer": "姉妹 (しまい)", "explanation": "Hai chị em gái gọi là 姉妹 (TỶ MUỘI - しまい)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 2 (ID 32): コンビニ
    # -------------------------------------------------------------
    32: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 2章 【3】 ぶんを読んで — Nhịp sống Conbini 24 giờ (Trang 47)",
            "instruction": "Đọc bài văn miêu tả nhịp sống cửa hàng tiện lợi và điền đúng chữ Hán/cách đọc vào bảng 20 ô chữ tương ứng.",
            "image_url": "/assets/kanji/n4/minigames/chap2_conbini_24hours.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Conbini mở cửa 24h", "answer": "二十四時間営業 (にじゅうよじかん)"},
                "questions": [
                    {"id": 1, "prompt": "① 先しゅう 学校の [①まえ]に 新しい コンビニが できました。:", "options": shuffle_choices("前 (まえ)", ["後 (うしろ)", "外 (そと)", "中 (なか)"]), "answer": "前 (まえ)", "explanation": "まえ (phía trước) là chữ 前 (TIỀN)."},
                    {"id": 2, "prompt": "② [②よみち]に コンビニが あると 明るくて 安心します。:", "options": shuffle_choices("夜 (よる)", ["晩 (ばん)", "夕 (ゆう)", "暗 (くら)"]), "answer": "夜 (よる)", "explanation": "よみち (đường đêm) là chữ 夜 (DẠ)."},
                    {"id": 3, "prompt": "③ コンビニは [③あさ] 早くから あいています。:", "options": shuffle_choices("朝 (あさ)", ["昼 (ひる)", "晩 (ばん)", "早 (はや)"]), "answer": "朝 (あさ)", "explanation": "あさ (buổi sáng) là chữ 朝 (TRIÊU)."},
                    {"id": 4, "prompt": "④ 朝 [④はやく]から あいています。:", "options": shuffle_choices("早く (はやく)", ["遅く (おそく)", "遠く (とおく)", "近く (ちかく)"]), "answer": "早く (はやく)", "explanation": "はやく (sớm) là chữ 早 (TẢO)."},
                    {"id": 5, "prompt": "⑤ お客さんは 朝 [⑤しんぶん]を 買っていきます。:", "options": shuffle_choices("新聞 (しんぶん)", ["新書 (しんしょ)", "本 (ほん)", "雑誌 (ざっし)"]), "answer": "新聞 (しんぶん)", "explanation": "Báo chí là 新聞 (TÂN VĂN)."},
                    {"id": 6, "prompt": "⑥ 朝 新聞を [⑥かって]いきます。:", "options": shuffle_choices("買って (かって)", ["売って (うって)", "貸して (かして)", "待って (まって)"]), "answer": "買って (かって)", "explanation": "かって (mua) là chữ 買 (MÃI)."},
                    {"id": 7, "prompt": "⑦ 朝ごはんの パンや [⑦ぎゅうにゅう]を 買っていきます。:", "options": shuffle_choices("牛乳 (ぎゅうにゅう)", ["牛肉 (ぎゅうにく)", "牛 (うし)", "乳 (ちち)"]), "answer": "牛乳 (ぎゅうにゅう)", "explanation": "Sữa bò là 牛乳 (NGƯU NHŨ)."},
                    {"id": 8, "prompt": "⑧ [⑧ひる]には お弁当を 買いに 来ます。:", "options": shuffle_choices("昼 (ひる)", ["朝 (あさ)", "晩 (ばん)", "夜 (よる)"]), "answer": "昼 (ひる)", "explanation": "ひる (buổi trưa) là chữ 昼 (TRÚ)."},
                    {"id": 9, "prompt": "⑨ お昼には [⑨おべんとう]を 買いに 来ます。:", "options": shuffle_choices("弁当 (べんとう)", ["当 (とう)", "料理 (りょうり)", "ご飯 (ごはん)"]), "answer": "弁当 (べんとう)", "explanation": "Cơm hộp là 弁当 (BIỆN ĐƯƠNG)."},
                    {"id": 10, "prompt": "⑩ [⑩あたたかい] お茶も 売っています。:", "options": shuffle_choices("温かい (あたたかい)", ["熱い (あつい)", "冷たい (つめたい)", "暑い (あつい)"]), "answer": "温かい (あたたかい)", "explanation": "Ấm áp dễ chịu là 温かい (ÔN)."},
                    {"id": 11, "prompt": "⑪ 温かい [⑪おちゃ]も 売っています。:", "options": shuffle_choices("お茶 (おちゃ)", ["お酒 (おさけ)", "水 (みず)", "茶色 (ちゃいろ)"]), "answer": "お茶 (おちゃ)", "explanation": "Trà xanh là お茶 (TRÀ)."},
                    {"id": 12, "prompt": "⑫ 夕方は [⑫くだもの]や おかしが よく 売れます。:", "options": shuffle_choices("果物 (くだもの)", ["野菜 (やさい)", "菓子 (かし)", "果実 (かじつ)"]), "answer": "果物 (くだもの)", "explanation": "Hoa quả trái cây là 果物 (QUẢ VẬT)."},
                    {"id": 13, "prompt": "⑬ [⑬よる]は 仕事の 帰りに よる 人が 多いです。:", "options": shuffle_choices("夜 (よる)", ["朝 (あさ)", "昼 (ひる)", "晩 (ばん)"]), "answer": "夜 (よる)", "explanation": "よる (buổi đêm) là chữ 夜 (DẠ)."},
                    {"id": 14, "prompt": "⑭ [⑭おさけ]や ビールを 買う 人も います。:", "options": shuffle_choices("お酒 (おさけ)", ["お茶 (おちゃ)", "水 (みず)", "酒屋 (さかや)"]), "answer": "お酒 (おさけ)", "explanation": "Rượu bia là お酒 (TỬU)."},
                    {"id": 15, "prompt": "⑮ 冷たい [⑮のみもの]も たくさん あります。:", "options": shuffle_choices("飲み物 (のみもの)", ["食べ物 (たべもの)", "買い物 (かいもの)", "料理 (りょうり)"]), "answer": "飲み物 (のみもの)", "explanation": "Thức uống là 飲み物 (ẨM VẬT)."},
                    {"id": 16, "prompt": "⑯ おにぎりや [⑯にく]まんも 人気です。:", "options": shuffle_choices("肉 (にく)", ["魚 (さかな)", "鳥 (とり)", "牛 (うし)"]), "answer": "肉 (にく)", "explanation": "Thịt là chữ 肉 (NHỤC)."},
                    {"id": 17, "prompt": "⑰ [⑰とり]肉の からあげも 売っています。:", "options": shuffle_choices("鳥 (とり)", ["魚 (さかな)", "牛 (うし)", "豚 (ぶた)"]), "answer": "鳥 (とり)", "explanation": "とり (chim/gà) là chữ 鳥 (ĐIỂU)."},
                    {"id": 18, "prompt": "⑱ さまざまな [⑱あじ]の カップラーメンが あります。:", "options": shuffle_choices("味 (あじ)", ["声 (こえ)", "色 (いろ)", "音 (おと)"]), "answer": "味 (あじ)", "explanation": "Hương vị là chữ 味 (VỊ)."},
                    {"id": 19, "prompt": "⑲ コンビニは いつでも [⑲べんり]です。:", "options": shuffle_choices("便利 (べんり)", ["利用 (りよう)", "利口 (りこう)", "簡単 (かんたん)"]), "answer": "便利 (べんり)", "explanation": "Tiện lợi là 便利 (TIỆN LỢI)."},
                    {"id": 20, "prompt": "⑳ 店員も みんな [⑳しんせつ]です。:", "options": shuffle_choices("親切 (しんせつ)", ["大切 (たいせつ)", "親友 (しんゆう)", "親しい (したしい)"]), "answer": "親切 (しんせつ)", "explanation": "Tử tế chu đáo là 親切 (THÂN THIẾT)."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 2章 クイズ — Poster tuyển dụng cửa hàng tiện lợi Friend Mart (Trang 48)",
            "instruction": "Quan sát thông báo tuyển dụng nhân viên làm thêm ở trang 48, điền cách đọc và chữ Hán từ ① đến ⑯.",
            "image_url": "/assets/kanji/n4/minigames/chap2_conbini_register.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ: Tuyển nhân viên làm thêm", "answer": "アルバイトぼしゅう"},
                "questions": [
                    {"id": 1, "prompt": "① フレンドマート ①[しぶや店]:", "options": shuffle_choices("渋谷 (しぶや)", ["渋田 (しぶた)", "谷町 (たにまち)", "渋沢 (しぶさわ)"]), "answer": "渋谷 (しぶや)", "explanation": "Địa danh nổi tiếng Shibuya viết là 渋谷."},
                    {"id": 2, "prompt": "② えき②[前]だから:", "options": shuffle_choices("まえ", ["あと", "うしろ", "さき"]), "answer": "まえ", "explanation": "駅前 (trước nhà ga) chữ 前 đọc là まえ."},
                    {"id": 3, "prompt": "③ えき前から ③[近くて]:", "options": shuffle_choices("ちかくて", ["とおくて", "ひろくて", "はやくて"]), "answer": "ちかくて", "explanation": "近くて (gần) đọc là ちかくて."},
                    {"id": 4, "prompt": "④ えき前から 近くて ④[便利]:", "options": shuffle_choices("べんり", ["ゆうり", "びんり", "ふべん"]), "answer": "べんり", "explanation": "便利 (tiện lợi) đọc là べんり."},
                    {"id": 5, "prompt": "⑤ 先ぱい⑤[店いん]は みんな:", "options": shuffle_choices("てんいん", ["みせいん", "てんじん", "しょくいん"]), "answer": "てんいん", "explanation": "店員 (nhân viên bán hàng) đọc là てんいん."},
                    {"id": 6, "prompt": "⑥ 店いんは みんな ⑥[親切]:", "options": shuffle_choices("しんせつ", ["おやせつ", "しんぎり", "たいせつ"]), "answer": "しんせつ", "explanation": "親切 (tốt bụng, thân thiết) đọc là しんせつ."},
                    {"id": 7, "prompt": "⑦ ⑦[しょう品]ならべ (Xếp hàng hóa lên kệ):", "options": shuffle_choices("商品 (しょうひん)", ["品物 (しなもの)", "食料品 (しょくりょうひん)", "作品 (さくひん)"]), "answer": "商品 (しょうひん)", "explanation": "Hàng hóa buôn bán là 商品 (THƯƠNG PHẨM)."},
                    {"id": 8, "prompt": "⑧ ⑧[べん当]など:", "options": shuffle_choices("弁当 (べんとう)", ["当直 (とうちょく)", "当番 (とうばん)", "料理 (りょうり)"]), "answer": "弁当 (べんとう)", "explanation": "Cơm hộp là 弁当 (BIỆN ĐƯƠNG)."},
                    {"id": 9, "prompt": "⑨ Ca A: ⑨[午前] 6:00〜9:00:", "options": shuffle_choices("ごぜん", ["ごご", "まえ", "あさ"]), "answer": "ごぜん", "explanation": "午前 (buổi sáng trước 12h) đọc là ごぜん."},
                    {"id": 10, "prompt": "⑩ Ca B: ⑩[午後] 6:00〜9:00:", "options": shuffle_choices("ごご", ["ごぜん", "よる", "ゆうがた"]), "answer": "ごご", "explanation": "午後 (buổi chiều sau 12h) đọc là ごご."},
                    {"id": 11, "prompt": "⑪ ※ ⑪[朝] 早い時間:", "options": shuffle_choices("あさ", ["ひる", "よる", "ばん"]), "answer": "あさ", "explanation": "朝 (buổi sáng) đọc là あさ."},
                    {"id": 12, "prompt": "⑫ ※ 朝 ⑫[早い]時間:", "options": shuffle_choices("はやい", ["おそい", "とおい", "ちかい"]), "answer": "はやい", "explanation": "早い (sớm) đọc là はやい."},
                    {"id": 13, "prompt": "⑬ ⑬[夜]おそい時間にできる人 大かんげい:", "options": shuffle_choices("よる", ["あさ", "ひる", "ゆう"]), "answer": "よる", "explanation": "夜 (ban đêm) đọc là よる."},
                    {"id": 14, "prompt": "⑭ ⑭[お客さん]と たのしく話ができる人！:", "options": shuffle_choices("おきゃくさん", ["おきゃく", "きゃくさま", "てんいん"]), "answer": "おきゃくさん", "explanation": "お客さん (khách hàng) đọc là おきゃくさん."},
                    {"id": 15, "prompt": "⑮ いっしょにたのしく ⑮[働きましょう]:", "options": shuffle_choices("はたらきましょう", ["うごきましょう", "あるきましょう", "はしりましょう"]), "answer": "はたらきましょう", "explanation": "働く (làm việc) đọc là はたらく."},
                    {"id": 16, "prompt": "⑯ ⑯[店長]: すずき:", "options": shuffle_choices("てんちょう", ["みせちょう", "しゃちょう", "ぶちょう"]), "answer": "てんちょう", "explanation": "店長 (cửa hàng trưởng) đọc là てんちょう."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 3 (ID 33): おくり物
    # -------------------------------------------------------------
    33: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 3章 クイズ — Cách ghi địa chỉ phong bì gửi thư (Trang 70)",
            "instruction": "Đọc hướng dẫn viết bì thư ở trang 70 và chọn chữ Hán/cách đọc tương ứng cho từng vị trí từ ① đến ⑧.",
            "image_url": "/assets/kanji/n4/minigames/chap3_takkyubin_slip.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Người nhận bưu phẩm", "answer": "受取人 (うけとりにん)"},
                "questions": [
                    {"id": 1, "prompt": "① Ô 7 chữ số mã bưu điện người nhận (〒 100-1000):", "options": shuffle_choices("郵便番号 (ゆうびんばんごう)", ["電話番号 (でんわばんごう)", "部屋番号 (へやばんごう)", "住所 (じゅうしょ)"]), "answer": "郵便番号 (ゆうびんばんごう)", "explanation": "7 ô số trên đầu bì thư là 郵便番号 (mã bưu điện)."},
                    {"id": 2, "prompt": "② Đơn vị hành chính cấp thủ đô nơi người nhận sinh sống:", "options": shuffle_choices("東京都 (とうきょうと)", ["京都府 (きょうとふ)", "大阪府 (おおさかふ)", "北海道 (ほっかいどう)"]), "answer": "東京都 (とうきょうと)", "explanation": "Thủ đô Tokyo là 東京都 (ĐÔNG KINH ĐÔ)."},
                    {"id": 3, "prompt": "③ Đơn vị hành chính cấp quận trong lòng đô thị:", "options": shuffle_choices("文京区 (ぶんきょうく)", ["市 (し)", "町 (まち)", "村 (むら)"]), "answer": "文京区 (ぶんきょうく)", "explanation": "Quận nội thành là 区 (KHU - く)."},
                    {"id": 4, "prompt": "④ Khu phố và số nhà nơi cư trú:", "options": shuffle_choices("前田町 (まえだまち)", ["前田市 (まえだし)", "前田村 (まえだむら)", "本町 (ほんちょう)"]), "answer": "前田町 (まえだまち)", "explanation": "Phố xá là 町 (ĐINH - まち)."},
                    {"id": 5, "prompt": "⑤ Tên tòa chung cư hiện đại nơi người nhận thuê trọ:", "options": shuffle_choices("グリーンマンション", ["アパート", "一軒家", "ホテル"]), "answer": "グリーンマンション", "explanation": "Tòa chung cư trong địa chỉ là グリーンマンション."},
                    {"id": 6, "prompt": "⑥ Số hiệu phòng căn hộ chung cư của người nhận (704):", "options": shuffle_choices("704号 (ごう)", ["704番 (ばん)", "704室 (しつ)", "704階 (かい)"]), "answer": "704号 (ごう)", "explanation": "Số hiệu phòng chung cư dùng chữ 号 (HIỆU - ごう)."},
                    {"id": 7, "prompt": "⑦ Họ tên người bạn thân nhận thư (岩本 花子):", "options": shuffle_choices("名前 (なまえ)", ["住所 (じゅうしょ)", "会社 (かいしゃ)", "郵便 (ゆうびん)"]), "answer": "名前 (なまえ)", "explanation": "Dòng chữ lớn trang trọng ở giữa bì thư là 名前 (họ tên)."},
                    {"id": 8, "prompt": "⑧ Kính ngữ trang trọng bắt buộc viết sau tên người nhận:", "options": shuffle_choices("様 (さま)", ["君 (くん)", "殿 (どの)", "先生 (せんせい)"]), "answer": "様 (さま)", "explanation": "Gửi thư từ lịch sự tại Nhật bắt buộc gắn chữ 様 (さま) sau tên người nhận."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 4 (ID 34): デート
    # -------------------------------------------------------------
    34: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 4章 クイズ — Đố vui hẹn hò & Đặt bàn nhà hàng kỷ niệm (Trang 92)",
            "instruction": "Giải 6 câu đố hẹn hò 【1】 và chọn từ thích hợp điền vào hội thoại đặt bàn nhà hàng 【2】 ở trang 92.",
            "image_url": "/assets/kanji/n4/minigames/chap4_dating_cinema.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Đi xem phim ở rạp", "answer": "映画館 (えいがかん)"},
                "questions": [
                    {"id": 1, "prompt": "1. 知らない 所へ 行くとき これが あると 便利です。:", "options": shuffle_choices("地図 (ちず)", ["写真 (しゃしん)", "雑誌 (ざっし)", "手紙 (てがみ)"]), "answer": "地図 (ちず)", "explanation": "Vật giúp tìm đường khi đến nơi xa lạ là 地図 (bản đồ)."},
                    {"id": 2, "prompt": "2. ここで さんぽを したり スポーツを したりできます。:", "options": shuffle_choices("公園 (こうえん)", ["動物園 (どうぶつえん)", "映画館 (えいがかん)", "学校 (がっこう)"]), "answer": "公園 (こうえん)", "explanation": "Nơi dạo bộ và tập thể dục thể thao ngoài trời là 公園 (công viên)."},
                    {"id": 3, "prompt": "3. コンサートで ピアノや ギターの これを 聞きます。:", "options": shuffle_choices("音 (おと)", ["声 (こえ)", "歌 (うた)", "話 (はなし)"]), "answer": "音 (おと)", "explanation": "Âm thanh của nhạc cụ là 音 (ÂM - おと)."},
                    {"id": 4, "prompt": "4. のどが かわいたとき これを 飲みます。:", "options": shuffle_choices("お茶 (おちゃ)", ["ご飯 (ごはん)", "薬 (くすり)", "肉 (にく)"]), "answer": "お茶 (おちゃ)", "explanation": "Khát nước uống trà xanh là お茶 (TRÀ)."},
                    {"id": 5, "prompt": "5. 車を うんてんする 人です。:", "options": shuffle_choices("うんてん手 (うんてんしゅ)", ["店員 (てんいん)", "歌手 (かしゅ)", "医者 (いしゃ)"]), "answer": "うんてん手 (うんてんしゅ)", "explanation": "Người lái xe là 運転手 (VẬN CHUYỂN THỦ - うんてんしゅ)."},
                    {"id": 6, "prompt": "6. これを 見に 映画館へ 行きます。:", "options": shuffle_choices("映画 (えいが)", ["写真 (しゃしん)", "音楽 (おんがく)", "動物 (どうぶつ)"]), "answer": "映画 (えいが)", "explanation": "Đến rạp xem phim là 映画 (ÁNH HỌA - えいが)."},
                    {"id": 7, "prompt": "7. 客: もしもし、土曜日の 夜 7時に ①[ ]を したいんですが。:", "options": shuffle_choices("予約 (よやく)", ["約束 (やくそく)", "注文 (ちゅうもん)", "案内 (あんない)"]), "answer": "予約 (よやく)", "explanation": "Đặt chỗ trước là 予約 (DƯ ƯỚC - よやく)."},
                    {"id": 8, "prompt": "8. 店いん: ありがとうございます。②[ ]さまですか。:", "options": shuffle_choices("何名 (なんめい)", ["何人 (なんにん)", "何者 (なんもの)", "何台 (なんだい)"]), "answer": "何名 (なんめい)", "explanation": "Hỏi số lượng khách hàng trang trọng dùng 何名さま."},
                    {"id": 9, "prompt": "9. 客: ふたりです。それから ③[ ]の いい 席を お願いします。:", "options": shuffle_choices("けしき (景色)", ["味 (あじ)", "色 (いろ)", "音 (おと)"]), "answer": "けしき (景色)", "explanation": "Chỗ ngồi có khung cảnh/tầm nhìn đẹp là 景色 (CẢNH SẮC)."},
                    {"id": 10, "prompt": "10. 店いん: かしこまりました。④[ ]が 見える まど側の 席で よろしいですか。:", "options": shuffle_choices("海 (うみ)", ["山 (やま)", "川 (かわ)", "空 (そら)"]), "answer": "海 (うみ)", "explanation": "Nhà hàng nhìn ra biển là 海 (HẢI - うみ)."},
                    {"id": 11, "prompt": "11. 客: はい。⑤[ ]です。:", "options": shuffle_choices("けっこう (結構)", ["だめ", "むり", "いや"]), "answer": "けっこう (結構)", "explanation": "けっこうです mang nghĩa 'rất tốt / hoàn toàn đồng ý'."},
                    {"id": 12, "prompt": "12. 客: その日は 彼女の ⑥[ ]なので、ケーキも お願いできますか。:", "options": shuffle_choices("たんじょう日 (誕生日)", ["休日 (きゅうじつ)", "平日 (へいじつ)", "祭日 (さいじつ)"]), "answer": "たんじょう日 (誕生日)", "explanation": "Ngày sinh nhật có bánh kem là 誕生日."},
                    {"id": 13, "prompt": "13. 店いん: はい。週末の ⑦[ ]べつコースは いかがですか。:", "options": shuffle_choices("特 (とく)", ["別 (べつ)", "好 (すき)", "大 (だい)"]), "answer": "特 (とく)", "explanation": "Thực đơn set đặc biệt là 特別コース (ĐẶC BIỆT)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 5 (ID 35): 町
    # -------------------------------------------------------------
    35: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 5章 クイズ — Đố sắc màu & Hội thoại tiếp nhận tại bệnh viện (Trang 116)",
            "instruction": "Giải đố về màu sắc các đồ vật 【1】 và chọn cách đọc chữ Hán trong cuộc hội thoại tại phòng khám bệnh viện 【2】 ở trang 116.",
            "image_url": "/assets/kanji/n4/minigames/chap5_station_train.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ (れい): はれたそら／うみ →", "answer": "青 (あお)"},
                "questions": [
                    {"id": 1, "prompt": "1. りんご／ポスト／ワイン → 何色ですか:", "options": shuffle_choices("赤 (あか)", ["白 (しろ)", "黄 (きいろ)", "黒 (くろ)"]), "answer": "赤 (あか)", "explanation": "Quả táo, hòm thư bưu điện và rượu vang đều có màu Đỏ: 赤 (あか)."},
                    {"id": 2, "prompt": "2. バナナ／ひまわり／レモン → 何色ですか:", "options": shuffle_choices("黄 (きいろ)", ["赤 (あか)", "緑 (みどり)", "白 (しろ)"]), "answer": "黄 (きいろ)", "explanation": "Quả chuối, hoa hướng dương và quả chanh có màu Vàng: 黄 (きいろ)."},
                    {"id": 3, "prompt": "3. くも／ゆき／しお → 何色ですか:", "options": shuffle_choices("白 (しろ)", ["黒 (くろ)", "青 (あお)", "灰 (はい)"]), "answer": "白 (しろ)", "explanation": "Đám mây tuyết trắng và muối ăn có màu Trắng: 白 (しろ)."},
                    {"id": 4, "prompt": "4. コーヒー／土／チョコレート → 何色ですか:", "options": shuffle_choices("茶 (ちゃ)", ["黒 (くろ)", "赤 (あか)", "青 (あお)"]), "answer": "茶 (ちゃ)", "explanation": "Cà phê, đất cát và socola có màu Nâu/màu trà: 茶色 (ちゃいろ)."},
                    {"id": 5, "prompt": "5. 森／日本茶／竹 → 何色ですか:", "options": shuffle_choices("緑 (みどり)", ["青 (あお)", "黄 (きいろ)", "黒 (くろ)"]), "answer": "緑 (みどり)", "explanation": "Rừng cây xanh, trà xanh Nhật và cây tre có màu Xanh lá: 緑 (みどり)."},
                    {"id": 6, "prompt": "6. しまうま (Ngựa vằn) → Hai màu trên cơ thể là:", "options": shuffle_choices("白・黒 (しろ・くろ)", ["赤・白 (あか・しろ)", "黄・黒 (き・くろ)", "青・白 (あお・しろ)"]), "answer": "白・黒 (しろ・くろ)", "explanation": "Ngựa vằn có sọc Trắng và Đen: 白 (しろ) và 黒 (くろ)."},
                    {"id": 7, "prompt": "7. しんごう (Đèn giao thông) → Ba màu tín hiệu là:", "options": shuffle_choices("青・黄・赤 (あお・き・あか)", ["青・白・赤", "緑・黒・赤", "白・黄・黒"]), "answer": "青・黄・赤 (あお・き・あか)", "explanation": "Đèn giao thông Nhật Bản gồm 3 màu Xanh - Vàng - Đỏ: 青・黄・赤."},
                    {"id": 8, "prompt": "8. Bệnh nhân đau bụng: では、①[内科]へ どうぞ。Cách đọc là:", "options": shuffle_choices("ないか", ["うちか", "ないけ", "ないかん"]), "answer": "ないか", "explanation": "内科 (Khoa Nội) đọc là ないか."},
                    {"id": 9, "prompt": "9. すみません。はじめて こちらの ②[病院]に 来たんですが…:", "options": shuffle_choices("びょういん", ["びょうかん", "やくいん", "いいん"]), "answer": "びょういん", "explanation": "病院 (Bệnh viện) đọc là びょういん."},
                    {"id": 10, "prompt": "10. はじめて こちらの 病院に ③[来た]んですが…:", "options": shuffle_choices("きた", ["いった", "でた", "はいった"]), "answer": "きた", "explanation": "来ました (đã đến) đọc là きました / きた."},
                    {"id": 11, "prompt": "11. では、こちらの ④[待合しつ]で 少し お待ちください。:", "options": shuffle_choices("まちあいしつ", ["たいごうしつ", "まちあわせしつ", "たいあいいん"]), "answer": "まちあいしつ", "explanation": "待合室 (Phòng chờ) đọc là まちあいしつ."},
                    {"id": 12, "prompt": "12. 本日の しんさつの ⑤[お会計]は 1500円です。:", "options": shuffle_choices("おかいけい", ["おかいしゃ", "おけいさん", "おりょうきん"]), "answer": "おかいけい", "explanation": "お会計 (Thanh toán tiền khám) đọc là おかいけい."},
                    {"id": 13, "prompt": "13. ⑥[薬]の うけとりは あちらの 薬きょくです。:", "options": shuffle_choices("くすり", ["やく", "ちゃ", "そう"]), "answer": "くすり", "explanation": "薬 (Thuốc men) đọc âm Kun là くすり."},
                    {"id": 14, "prompt": "14. 薬の うけとりは あちらの ⑦[薬きょく]です。:", "options": shuffle_choices("やっきょく", ["くすりきょく", "やくきょく", "くすりや"]), "answer": "やっきょく", "explanation": "薬局 (Hiệu thuốc/Nhà thuốc) đọc là やっきょく."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 5章 1 駅 — Sân ga đón tàu điện ngầm & Bảng giờ tàu (Trang 96)",
            "instruction": "Nhận diện các biển báo đường sắt, loại chuyến tàu chạy và chỉ dẫn an toàn tại nhà ga ở trang 96.",
            "image_url": "/assets/kanji/n4/minigames/chap5_hospital_pharmacy.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ mẫu: Ga đón tàu xe điện ngầm", "answer": "地下鉄の駅 (えき)"},
                "questions": [
                    {"id": 1, "prompt": "① Loại chuyến tàu chạy nhanh xuất phát lúc 13:40 trên bảng điện tử:", "options": shuffle_choices("急行 (きゅうこう)", ["各駅 (かくえき)", "普通 (ふつう)", "特急 (とっきゅう)"]), "answer": "急行 (きゅうこう)", "explanation": "Chuyến tàu tốc hành chạy nhanh là 急行 (CẤP HÀNH - きゅうこう)."},
                    {"id": 2, "prompt": "② Loại chuyến tàu bán tốc hành vào ga lúc 13:31:", "options": shuffle_choices("準急 (じゅんきゅう)", ["快速 (かいそく)", "各停 (かくてい)", "急行 (きゅうこう)"]), "answer": "準急 (じゅんきゅう)", "explanation": "Tàu bán tốc hành là 準急 (CHUẨN CẤP - じゅんきゅう)."},
                    {"id": 3, "prompt": "③ Cửa để hành khách bước lên toa tàu điện:", "options": shuffle_choices("乗車口 (じょうしゃぐち)", ["降車口 (こうしゃぐち)", "非常口 (ひじょうぐち)", "改札口 (かいさつぐち)"]), "answer": "乗車口 (じょうしゃぐち)", "explanation": "Cửa lên tàu là 乗車口 (THỪA XA KHẨU - じょうしゃぐち)."},
                    {"id": 4, "prompt": "④ Cửa để hành khách bước xuống sân ga:", "options": shuffle_choices("降車口 (こうしゃぐち)", ["乗車口 (じょうしゃぐち)", "出口 (でぐち)", "入口 (いりぐち)"]), "answer": "降車口 (こうしゃぐち)", "explanation": "Cửa xuống tàu là 降車口 (GIÁNG XA KHẨU - こうしゃぐち)."},
                    {"id": 5, "prompt": "⑤ Chuyến tàu chuẩn bị khởi hành lăn bánh rời ga:", "options": shuffle_choices("発車 (はっしゃ)", ["到着 (とうちゃく)", "停車 (ていしゃ)", "回送 (かいそう)"]), "answer": "発車 (はっしゃ)", "explanation": "Tàu xuất bến lăn bánh là 発車 (PHÁT XA - はっしゃ)."},
                    {"id": 6, "prompt": "⑥ Chuyến tàu đến bến đúng giờ an toàn:", "options": shuffle_choices("着く・到着 (とうちゃく)", ["出発 (しゅっぱつ)", "通過 (つうか)", "発着 (はっちゃく)"]), "answer": "着く・到着 (とうちゃく)", "explanation": "Đến nơi vào ga là 着 (TRƯỚC / ĐÁO TRƯỚC - とうちゃく)."},
                    {"id": 7, "prompt": "⑦ Đường ray bằng thép cho tàu hỏa và tàu điện chạy:", "options": shuffle_choices("鉄道 (てつどう)", ["道路 (どうろ)", "歩道 (ほどう)", "車道 (しゃどう)"]), "answer": "鉄道 (てつどう)", "explanation": "Đường sắt kim loại là 鉄道 (THIẾT ĐẠO - てつどう)."},
                    {"id": 8, "prompt": "⑧ Đường hầm tàu điện ngầm hiện đại xuyên lòng đất:", "options": shuffle_choices("地下鉄 (ちかてつ)", ["私鉄 (してつ)", "新幹線 (しんかんせん)", "モノレール"]), "answer": "地下鉄 (ちかてつ)", "explanation": "Tàu điện ngầm chạy dưới lòng đất là 地下鉄 (ĐỊA HẠ THIẾT - ちかてつ)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 6 (ID 36): 学生
    # -------------------------------------------------------------
    36: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 6章 クイズ — Thời khóa biểu đại học & Tin nhắn rủ đi giao lưu (Trang 138)",
            "instruction": "Đọc thời khóa biểu của sinh viên 【1】 và tin nhắn rủ đi Goukon 【2】 ở trang 138, chọn chữ Hán/cách đọc chính xác.",
            "image_url": "/assets/kanji/n4/minigames/chap6_ramen_menu.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Lớp học tại trường đại học", "answer": "大学の授業 (じゅぎょう)"},
                "questions": [
                    {"id": 1, "prompt": "1. Môn học 11/10 (Thứ 2) 9:00: ①[しんりがく] chữ Hán là:", "options": shuffle_choices("心理学", ["真理学", "心裡学", "物理学"]), "answer": "心理学", "explanation": "Tâm lý học viết là 心理学."},
                    {"id": 2, "prompt": "2. Môn học 11/10 (Thứ 2) 15:00: ②[えいごI] chữ Hán là:", "options": shuffle_choices("英語", ["英字", "英学", "英話"]), "answer": "英語", "explanation": "Môn Tiếng Anh viết là 英語."},
                    {"id": 3, "prompt": "3. Môn học 11/11 (Thứ 3) 12:00: ③[にほんぶんかろん] chữ Hán là:", "options": shuffle_choices("日本文化論", ["日本文章論", "日本文芸論", "日本文学論"]), "answer": "日本文化論", "explanation": "Lý luận văn hóa Nhật Bản là 日本文化論."},
                    {"id": 4, "prompt": "4. Môn học 11/12 (Thứ 4) 9:00: ④[えいぶんがく] chữ Hán là:", "options": shuffle_choices("英文学", ["英文字", "英国学", "英文化"]), "answer": "英文学", "explanation": "Môn Văn học Anh viết là 英文学."},
                    {"id": 5, "prompt": "5. Môn học 11/12 (Thứ 4) 15:00: ⑤[にほんごII] chữ Hán là:", "options": shuffle_choices("日本語", ["日本字", "日本話", "日本文"]), "answer": "日本語", "explanation": "Môn Tiếng Nhật viết là 日本語."},
                    {"id": 6, "prompt": "6. Buổi hội thảo 11/13 (Thứ 5): ゼミ: 日本文化⑥[けんきゅう] là:", "options": shuffle_choices("研究", ["研究所", "研学", "修学"]), "answer": "研究", "explanation": "Nghiên cứu văn hóa là 研究 (けんきゅう)."},
                    {"id": 7, "prompt": "7. Tin nhắn: 来週の 土曜日 ①[合コン]が あるんだけど: Chữ 合 đọc là:", "options": shuffle_choices("ごう", ["あい", "かっ", "がっ"]), "answer": "ごう", "explanation": "合コン (buổi tiệc giao lưu nam nữ) chữ 合 đọc âm On là ごう."},
                    {"id": 8, "prompt": "8. あいては 私の ②[知り合い]だよ ^^: Chữ 知 đọc là:", "options": shuffle_choices("し", ["ち", "じ", "ちしき"]), "answer": "し", "explanation": "知り合い (người quen) chữ 知 đọc là し (しりあい)."},
                    {"id": 9, "prompt": "9. なんと！ イケメン③[歌手]も 来るんだよ。: Chữ 歌手 đọc là:", "options": shuffle_choices("かしゅ", ["うたて", "うたしゅ", "かのて"]), "answer": "かしゅ", "explanation": "歌手 (ca sĩ) đọc là かしゅ."},
                    {"id": 10, "prompt": "10. この人 ④[声]が すごくいいんだ。: Chữ 声 đọc là:", "options": shuffle_choices("こえ", ["おと", "せい", "しょう"]), "answer": "こえ", "explanation": "声 (giọng nói / tiếng hát) đọc là こえ."},
                    {"id": 11, "prompt": "11. 二次会は カラオケに 行くから ⑤[楽しみに] していてね: Chữ 楽 đọc là:", "options": shuffle_choices("たの", ["らく", "おん", "がく"]), "answer": "たの", "explanation": "楽しみに (mong đợi háo hức) chữ 楽 đọc là たの."},
                    {"id": 12, "prompt": "12. 土曜日は 7時に ⑥[名古屋駅]の 時計広場に: Cách đọc là:", "options": shuffle_choices("なごやえき", ["めいこえき", "なこえき", "なごやまち"]), "answer": "名古屋駅", "explanation": "Ga Nagoya viết chữ Hán là 名古屋駅 (なごやえき)."},
                    {"id": 13, "prompt": "13. 時計広場に ⑦[集合]だよ。: Chữ 集合 đọc là:", "options": shuffle_choices("しゅうごう", ["しゅうあい", "あつまり", "しゅうかつ"]), "answer": "しゅうごう", "explanation": "集合 (tập trung tại điểm hẹn) đọc là しゅうごう."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 6章 1 研究 — Giảng đường đại học & Đời sống sinh viên (Trang 118)",
            "instruction": "Nhận diện các hoạt động nghiên cứu khoa học, học tập văn hóa ngôn ngữ tại trường đại học ở trang 118.",
            "image_url": "/assets/kanji/n4/minigames/chap6_student_party.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ: Trường đại học", "answer": "大学 (だいがく)"},
                "questions": [
                    {"id": 1, "prompt": "① Phòng nghiên cứu đề tài khoa học của sinh viên và giáo sư:", "options": shuffle_choices("研究室 (けんきゅうしつ)", ["教室 (きょうしつ)", "事務室 (じむしつ)", "図書室 (としょしつ)"]), "answer": "研究室 (けんきゅうしつ)", "explanation": "Phòng nghiên cứu chuyên ngành là 研究室 (NGHIÊN CỨU THẤT)."},
                    {"id": 2, "prompt": "② Bài tập làm văn ngắn viết bằng tiếng Nhật để nộp cho thầy:", "options": shuffle_choices("作文 (さくぶん)", ["論文 (ろんぶん)", "文学 (ぶんがく)", "文書 (ぶんしょ)"]), "answer": "作文 (さくぶん)", "explanation": "Bài tập làm văn là 作文 (TÁC VĂN - さくぶん)."},
                    {"id": 3, "prompt": "③ Tiếng Anh - Ngôn ngữ quốc tế được học phổ biến tại đại học:", "options": shuffle_choices("英語 (えいご)", ["英国 (えいこく)", "英会話 (えいかいわ)", "英文 (えいぶん)"]), "answer": "英語 (えいご)", "explanation": "Tiếng Anh là chữ 英語 (ANH NGỮ - えいご)."},
                    {"id": 4, "prompt": "④ Môn Hóa học với các thí nghiệm ống nghiệm, bình thủy tinh:", "options": shuffle_choices("化学 (かがく)", ["科学 (かがく)", "物理 (ぶつり)", "数学 (すうがく)"]), "answer": "化学 (かがく)", "explanation": "Môn Hóa học là chữ 化学 (HÓA HỌC - かがく)."},
                    {"id": 5, "prompt": "⑤ Môn Toán học nghiên cứu về những con số và phép tính:", "options": shuffle_choices("数学 (すうがく)", ["数字 (すうじ)", "算数 (さんすう)", "理科 (りか)"]), "answer": "数学 (すうがく)", "explanation": "Toán học là chữ 数学 (SỐ HỌC - すうがく)."},
                    {"id": 6, "prompt": "⑥ Tiếng Nhật - Ngôn ngữ của đất nước hoa anh đào:", "options": shuffle_choices("日本語 (にほんご)", ["国語 (こくご)", "日本文化 (にほんぶんか)", "言葉 (ことば)"]), "answer": "日本語 (にほんご)", "explanation": "Tiếng Nhật là chữ 日本語 (NHẬT BẢN NGỮ - にほんご)."},
                    {"id": 7, "prompt": "⑦ Tòa nhà giảng đường chính của viện đại học:", "options": shuffle_choices("大学 (だいがく)", ["大学院 (だいがくいん)", "学校 (がっこう)", "学園 (がくえん)"]), "answer": "大学 (だいがく)", "explanation": "Trường đại học là chữ 大学 (ĐẠI HỌC - だいがく)."},
                    {"id": 8, "prompt": "⑧ Những người bạn mới quen biết sau buổi gặp gỡ giao lưu:", "options": shuffle_choices("知り合い (しりあい)", ["親友 (しんゆう)", "友達 (ともだち)", "仲間 (なかま)"]), "answer": "知り合い (しりあい)", "explanation": "Người quen biết là chữ 知り合い (TRI HỢP - しりあい)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 7 (ID 37): 春夏秋冬
    # -------------------------------------------------------------
    37: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 7章 クイズ — Biểu tượng bốn mùa Xuân Hạ Thu Đông (Trang 160)",
            "instruction": "Quan sát 8 bức tranh sinh hoạt lễ hội đặc trưng ở trang 160 và chọn chữ Hán mùa tương ứng (春, 夏, 秋, 冬).",
            "image_url": "/assets/kanji/n4/minigames/chap7_weather_forecast.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ mẫu (れい): Trượt tuyết mùa đông", "answer": "冬 (ふゆ)"},
                "questions": [
                    {"id": 1, "prompt": "1. Tranh 1: Nằm tắm nắng bên bờ biển dưới bóng ô che nắng:", "options": shuffle_choices("夏 (なつ)", ["春 (はる)", "秋 (あき)", "冬 (ふゆ)"]), "answer": "夏 (なつ)", "explanation": "Đi tắm biển nghỉ dưỡng là mùa Hè: 夏 (HẠ - なつ)."},
                    {"id": 2, "prompt": "2. Tranh 2: Ngồi tụ tập ngắm hoa anh đào nở rộ (Hanami):", "options": shuffle_choices("春 (はる)", ["夏 (なつ)", "秋 (あき)", "冬 (ふゆ)"]), "answer": "春 (はる)", "explanation": "Ngắm hoa anh đào nở là mùa Xuân: 春 (XUÂN - はる)."},
                    {"id": 3, "prompt": "3. Tranh 3: Trang trí cây nêu Kadomatsu đón Tết đầu năm và múa lân:", "options": shuffle_choices("冬 (ふゆ)", ["春 (はる)", "秋 (あき)", "夏 (なつ)"]), "answer": "冬 (ふゆ)", "explanation": "Lễ hội đón Tết Oshougatsu diễn ra vào mùa Đông: 冬 (ĐÔNG - ふゆ)."},
                    {"id": 4, "prompt": "4. Tranh 4: Bố mẹ dắt con đi dự lễ khai giảng năm học mới (入学式):", "options": shuffle_choices("春 (はる)", ["秋 (あき)", "夏 (なつ)", "冬 (ふゆ)"]), "answer": "春 (はる)", "explanation": "Năm học mới tại Nhật khai giảng vào tháng 4 mùa Xuân: 春 (はる)."},
                    {"id": 5, "prompt": "5. Tranh 5: Chú mèo cuộn tròn ngủ ấm cúng dưới bàn sưởi Kotatsu:", "options": shuffle_choices("冬 (ふゆ)", ["秋 (あき)", "春 (はる)", "夏 (なつ)"]), "answer": "冬 (ふゆ)", "explanation": "Ngồi sưởi bàn Kotatsu tránh giá rét là mùa Đông: 冬 (ふゆ)."},
                    {"id": 6, "prompt": "6. Tranh 6: Cậu bé mặc quần bơi bịt mắt chơi trò đập dưa hấu bên bờ biển:", "options": shuffle_choices("夏 (なつ)", ["春 (はる)", "秋 (あき)", "冬 (ふゆ)"]), "answer": "夏 (なつ)", "explanation": "Trò chơi đập dưa hấu (スイカ割り) là sinh hoạt mùa Hè: 夏 (なつ)."},
                    {"id": 7, "prompt": "7. Tranh 7: Cậu bé xách giỏ đi nhặt hạt dẻ giữa những chiếc lá phong đỏ:", "options": shuffle_choices("秋 (あき)", ["春 (はる)", "夏 (なつ)", "冬 (ふゆ)"]), "answer": "秋 (あき)", "explanation": "Nhặt hạt dẻ và ngắm lá đỏ là mùa Thu: 秋 (THU - あき)."},
                    {"id": 8, "prompt": "8. Tranh 8: Kệ trưng bày búp bê truyền thống ngày lễ bé gái Hina Matsuri:", "options": shuffle_choices("春 (はる)", ["冬 (ふゆ)", "秋 (あき)", "夏 (なつ)"]), "answer": "春 (はる)", "explanation": "Lễ hội búp bê Hina Matsuri diễn ra vào ngày 3/3 đầu mùa Xuân: 春 (はる)."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 7章 3 旅行 — Hành trình du lịch thế giới & Chụp ảnh kỷ niệm (Trang 152)",
            "instruction": "Khám phá các hoạt động du lịch vòng quanh địa cầu, chuẩn bị hành lý và lưu giữ bức ảnh đẹp ở trang 152.",
            "image_url": "/assets/kanji/n4/minigames/chap7_travel_journey.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ: Đi du lịch nước ngoài", "answer": "海外旅行 (かいがいりょこう)"},
                "questions": [
                    {"id": 1, "prompt": "① Chuyến đi du lịch nghỉ dưỡng cùng bạn bè và người thân:", "options": shuffle_choices("旅行 (りょこう)", ["散歩 (さんぽ)", "出張 (しゅっちょう)", "通勤 (つうきん)"]), "answer": "旅行 (りょこう)", "explanation": "Chuyến đi du lịch là chữ 旅行 (LỮ HÀNH - りょこう)."},
                    {"id": 2, "prompt": "② Chiếc vali kéo mang theo đồ đạc hành lý khi lên đường:", "options": shuffle_choices("荷物を持つ (もつ)", ["荷物を置く", "荷物を送る", "荷物を売る"]), "answer": "荷物を持つ (もつ)", "explanation": "Cầm xách hành lý là chữ 持つ (TRÌ - もつ)."},
                    {"id": 3, "prompt": "③ Quả địa cầu rộng lớn với nhiều quốc gia trên toàn cầu:", "options": shuffle_choices("世界 (せかい)", ["社会 (しゃかい)", "地域 (ちいき)", "都会 (とかい)"]), "answer": "世界 (せかい)", "explanation": "Thế giới bao la là chữ 世界 (THẾ GIỚI - せかい)."},
                    {"id": 4, "prompt": "④ Dùng máy ảnh ghi lại những khoảnh khắc đẹp đáng nhớ:", "options": shuffle_choices("写真を撮る (しゃしん)", ["映画を見る", "絵を描く", "手紙を書く"]), "answer": "写真を撮る (しゃしん)", "explanation": "Bức ảnh kỷ niệm là chữ 写真 (TẢ CHÂN - しゃしん)."},
                    {"id": 5, "prompt": "⑤ Con tàu viễn dương vượt sóng lớn đưa du khách ngắm cảnh biển:", "options": shuffle_choices("船 (ふね)", ["車 (くるま)", "電車 (でんしゃ)", "飛行機 (ひこうき)"]), "answer": "船 (ふね)", "explanation": "Tàu thủy thuyền buồm là chữ 船 (THUYỀN - ふね)."},
                    {"id": 6, "prompt": "⑥ Bầu trời cao trong xanh vời vợi ngày nắng đẹp:", "options": shuffle_choices("空 (そら)", ["雲 (くも)", "星 (ほし)", "雨 (あめ)"]), "answer": "空 (そら)", "explanation": "Bầu trời là chữ 空 (KHÔNG - そら)."},
                    {"id": 7, "prompt": "⑦ Chiếc máy bay cất cánh bay vút lên bầu trời cao:", "options": shuffle_choices("飛行機 (ひこうき)", ["新幹線 (しんかんせん)", "船 (ふね)", "車 (くるま)"]), "answer": "飛行機 (ひこうき)", "explanation": "Máy bay là chữ 飛行機 (PHI HÀNH CƠ - ひこうき)."},
                    {"id": 8, "prompt": "⑧ Ngắm bầu trời đêm lấp lánh muôn ngàn vì sao sáng:", "options": shuffle_choices("星 (ほし)", ["月 (つき)", "太陽 (たいよう)", "雲 (くも)"]), "answer": "星 (ほし)", "explanation": "Ngôi sao trên trời là chữ 星 (TINH - ほし)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 8 (ID 38): 学校
    # -------------------------------------------------------------
    38: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 8章 クイズ — Phòng thi & Phiếu trả lời trắc nghiệm 100 điểm (Trang 182)",
            "instruction": "Đọc hướng dẫn làm bài thi trắc nghiệm học kỳ ở trang 182, viết cách đọc tương ứng cho các từ từ ① đến ⑩.",
            "image_url": "/assets/kanji/n4/minigames/chap8_exam_answer_sheet.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Điểm số bài thi đạt điểm tối đa", "answer": "100点 (ひゃくてん)"},
                "questions": [
                    {"id": 1, "prompt": "① きまつ①[試験] (Kỳ thi cuối kỳ): Cách đọc là:", "options": shuffle_choices("しけん", ["じけん", "しけんいん", "じゅけん"]), "answer": "しけん", "explanation": "試験 (kỳ thi/bài kiểm tra) đọc là しけん."},
                    {"id": 2, "prompt": "② ②[解答用紙] (Phiếu trả lời trắc nghiệm): Cách đọc là:", "options": shuffle_choices("かいとうようし", ["かいとうかみ", "こたえようし", "かいとうしょ"]), "answer": "かいとうようし", "explanation": "解答用紙 (phiếu trả lời bài thi) đọc là かいとうようし."},
                    {"id": 3, "prompt": "③ ③[受験番号] (Số báo danh thí sinh): Cách đọc là:", "options": shuffle_choices("じゅけんばんごう", ["しけんばんごう", "じゅけんばん", "うけばんごう"]), "answer": "じゅけんばんごう", "explanation": "受験番号 (số báo danh dự thi) đọc là じゅけんばんごう."},
                    {"id": 4, "prompt": "④ ④[正しい] 答えに 一つ 丸をつけてください: Cách đọc là:", "options": shuffle_choices("ただしい", ["まさしい", "せいしい", "ただし"]), "answer": "ただしい", "explanation": "正しい (chính xác, đúng đắn) đọc là ただしい."},
                    {"id": 5, "prompt": "⑤ 正しい ⑤[答え]に 一つ 丸をつけてください: Cách đọc là:", "options": shuffle_choices("こたえ", ["とうえ", "こた", "あて"]), "answer": "こたえ", "explanation": "答え (câu trả lời / đáp án) đọc là こたえ."},
                    {"id": 6, "prompt": "⑥ 正しい 答えに 一つ ⑥[丸]を つけてください: Cách đọc là:", "options": shuffle_choices("まる", ["がん", "まるい", "えん"]), "answer": "まる", "explanation": "丸 (vòng tròn chấm điểm đúng) đọc là まる."},
                    {"id": 7, "prompt": "⑦ ⑦[質問]が ある人は 手を あげてください: Cách đọc là:", "options": shuffle_choices("しつもん", ["しつとい", "といもん", "もんしつ"]), "answer": "しつもん", "explanation": "質問 (câu hỏi thắc mắc) đọc là しつもん."},
                    {"id": 8, "prompt": "⑧ ⑧[問題] I) の読み方と 同じ 漢字を えらんでください: Cách đọc là:", "options": shuffle_choices("もんだい", ["といだい", "もんだん", "もんたい"]), "answer": "もんだい", "explanation": "問題 (câu hỏi / vấn đề bài tập) đọc là もんだい."},
                    {"id": 9, "prompt": "⑨ 問題 I) の読み方と ⑨[同じ] 漢字を えらんでください: Cách đọc là:", "options": shuffle_choices("おなじ", ["どうじ", "おな", "ひとしい"]), "answer": "おなじ", "explanation": "同じ (giống nhau / tương tự) đọc là おなじ."},
                    {"id": 10, "prompt": "⑩ 問題 I) の読み方と 同じ ⑩[漢字]を えらんでください: Cách đọc là:", "options": shuffle_choices("かんじ", ["からじ", "かんち", "かんし"]), "answer": "かんじ", "explanation": "漢字 (chữ Hán tự) đọc là かんじ."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 8章 3 社会科 — Môn Xã hội học: Chính trị, Kinh tế & Lịch sử (Trang 174)",
            "instruction": "Tìm hiểu các lĩnh vực nghiên cứu của môn Xã hội học về cấu trúc đất nước và đời sống công dân ở trang 174.",
            "image_url": "/assets/kanji/n4/minigames/chap8_politics_history.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ: Môn Xã hội học", "answer": "社会科 (しゃかいか)"},
                "questions": [
                    {"id": 1, "prompt": "① Nền chính trị và công việc điều hành đất nước của chính phủ:", "options": shuffle_choices("政治 (せいじ)", ["経済 (けいざい)", "法律 (ほうりつ)", "歴史 (れきし)"]), "answer": "政治 (せいじ)", "explanation": "Nền chính trị là chữ 政治 (CHÍNH TRỊ - せいじ)."},
                    {"id": 2, "prompt": "② Tình hình phát triển kinh tế thương mại của quốc gia:", "options": shuffle_choices("経済 (けいざい)", ["政治 (せいじ)", "社会 (しゃかい)", "産業 (さんぎょう)"]), "answer": "経済 (けいざい)", "explanation": "Nền kinh tế là chữ 経済 (KINH TẾ - けいざい)."},
                    {"id": 3, "prompt": "③ Lịch sử ngàn năm văn hiến và quá khứ của nhân loại:", "options": shuffle_choices("歴史 (れきし)", ["地理 (ちり)", "社会 (しゃかい)", "伝統 (でんとう)"]), "answer": "歴史 (れきし)", "explanation": "Môn Lịch sử là chữ 歴史 (LỊCH SỬ - れきし)."},
                    {"id": 4, "prompt": "④ Đời sống xã hội nơi các cộng đồng công dân cùng sinh sống:", "options": shuffle_choices("社会 (しゃかい)", ["会社 (かいしゃ)", "地域 (ちいき)", "世界 (せかい)"]), "answer": "社会 (しゃかい)", "explanation": "Xã hội là chữ 社会 (XÃ HỘI - しゃかい)."},
                    {"id": 5, "prompt": "⑤ Các bài học kiến thức bổ ích trong sách giáo khoa:", "options": shuffle_choices("勉強 (べんきょう)", ["運動 (うんどう)", "宿題 (しゅくだい)", "復習 (ふくしゅう)"]), "answer": "勉強 (べんきょう)", "explanation": "Học tập nghiên cứu là chữ 勉強 (MIỄN CƯỜNG - べんきょう)."},
                    {"id": 6, "prompt": "⑥ Thầy giáo giảng dạy truyền đạt kiến thức trên bục giảng:", "options": shuffle_choices("先生 (せんせい)", ["生徒 (せいと)", "学生 (がくせい)", "教授 (きょうじゅ)"]), "answer": "先生 (せんせい)", "explanation": "Thầy cô giáo là chữ 先生 (TIÊN SINH - せんせい)."},
                    {"id": 7, "prompt": "⑦ Đặt câu hỏi thắc mắc khi có vấn đề chưa hiểu:", "options": shuffle_choices("質問する (しつもん)", ["答える (こたえる)", "話す (はなす)", "聞く (きく)"]), "answer": "質問する (しつもん)", "explanation": "Chữ 質 trong 質問 (CHẤT VẤN - しつもん)."},
                    {"id": 8, "prompt": "⑧ Căn phòng học rộng rãi khang trang nơi diễn ra tiết học:", "options": shuffle_choices("教室 (きょうしつ)", ["図書室 (としょしつ)", "職員室 (しょくいんしつ)", "研究室 (けんきゅうしつ)"]), "answer": "教室 (きょうしつ)", "explanation": "Phòng học là chữ 教室 (GIÁO THẤT - きょうしつ)."}
                ]
            }
        }
    ],

    # -------------------------------------------------------------
    # CHƯƠNG 9 (ID 39): 休みのひ
    # -------------------------------------------------------------
    39: [
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 1: 9章 クイズ — Bức tranh dã ngoại sinh thái thiên nhiên (Trang 204)",
            "instruction": "Quan sát bức tranh sinh thái dã ngoại bờ hồ ở trang 204 và chọn chữ Hán chính xác cho các mục từ ① đến ⑧.",
            "image_url": "/assets/kanji/n4/minigames/chap9_nature_picnic.webp",
            "display_order": 1,
            "data": {
                "example": {"prompt": "Ví dụ: Ngày nghỉ dã ngoại ngoài trời", "answer": "休みの日のピクニック"},
                "questions": [
                    {"id": 1, "prompt": "① Chiếc hộp đựng côn trùng của cậu bé: [① ]かご:", "options": shuffle_choices("虫 (むし)", ["鳥 (とり)", "魚 (さかな)", "花 (はな)"]), "answer": "虫 (むし)", "explanation": "Chiếc lồng đựng côn trùng là 虫かご (TRÙNG)."},
                    {"id": 2, "prompt": "② Người đang cưỡi ngựa dạo bước trên đồi: [② ][ ]:", "options": shuffle_choices("乗馬 (じょうば)", ["走馬 (そうま)", "競馬 (けいば)", "牧場 (ぼくじょう)"]), "answer": "乗馬 (じょうば)", "explanation": "Cưỡi ngựa là chữ 乗馬 (THỪA MÃ - じょうば)."},
                    {"id": 3, "prompt": "③ Tiếng chim hót líu lo vang vọng khắp đồi: 鳥の[③ ]声:", "options": shuffle_choices("鳴き (なき)", ["叫び (さけび)", "笑い (わらい)", "歌 (うた)"]), "answer": "鳴き (なき)", "explanation": "Tiếng chim hót kêu là 鳴き (MINH - なき)."},
                    {"id": 4, "prompt": "④ Chiếc thuyền nhỏ trôi bồng bềnh trên mặt hồ: [④ ]:", "options": shuffle_choices("湖 (みずうみ)", ["海 (うみ)", "川 (かわ)", "池 (いけ)"]), "answer": "湖 (みずうみ)", "explanation": "Hồ nước mênh mông là chữ 湖 (HỒ - みずうみ / こ)."},
                    {"id": 5, "prompt": "⑤ Những chú chuồn chuồn chao lượn trên đồng: [⑤ ]虫:", "options": shuffle_choices("昆 (こん)", ["草 (くさ)", "虫 (むし)", "野 (の)"]), "answer": "昆 (こん)", "explanation": "Côn trùng là 昆虫 (CÔN TRÙNG - こんちゅう)."},
                    {"id": 6, "prompt": "⑥ Bụi hoa cỏ mọc tự nhiên trên thảm cỏ: [⑥ ]草:", "options": shuffle_choices("野 (の)", ["原 (はら)", "花 (はな)", "山 (やま)"]), "answer": "野 (の)", "explanation": "Cây cỏ hoa dại mọc ngoài đồng là 野草 (DÃ THẢO - やそう)."},
                    {"id": 7, "prompt": "⑦ Cậu bé đang tung tăng chạy đuổi bắt bướm: 子どもが[⑦ ]る:", "options": shuffle_choices("走 (はし)", ["歩 (ある)", "飛 (と)", "登 (のぼ)"]), "answer": "走 (はし)", "explanation": "Chạy bộ là chữ 走る (TẨU - はしる)."},
                    {"id": 8, "prompt": "⑧ Đám mây trắng bồng bềnh trôi trên đỉnh núi:", "options": shuffle_choices("雲 (くも)", ["雪 (ゆき)", "空 (そら)", "星 (ほし)"]), "answer": "雲 (くも)", "explanation": "Đám mây là chữ 雲 (VÂN - くも)."}
                ]
            }
        },
        {
            "game_type": "PICTURE_MATCH",
            "title": "Minigame 2: 9章 【3】 ぶんを読んで — Chuyến lái xe dã ngoại hồ Yamanaka (Trang 203)",
            "instruction": "Đọc bài văn kể về chuyến lái xe dã ngoại hồ Yamanaka ở trang 203 và chọn đúng chữ Hán/cách đọc vào bảng 20 ô chữ tương ứng.",
            "image_url": "/assets/kanji/n4/minigames/chap9_sports_festival.webp",
            "display_order": 2,
            "data": {
                "example": {"prompt": "Ví dụ: Lái xe ngắm cảnh cuối tuần", "answer": "ドライブ (Drive)"},
                "questions": [
                    {"id": 1, "prompt": "① 山梨県にある ①山中[こ]まで 友だちと ドライブしました。:", "options": shuffle_choices("湖 (こ)", ["海 (かい)", "川 (せん)", "山 (さん)"]), "answer": "湖 (こ)", "explanation": "Hồ Yamanaka là 山中湖 (HỒ - こ)."},
                    {"id": 2, "prompt": "② [②じたく]から 車で 3時間ぐらい かかりました。:", "options": shuffle_choices("自宅 (じたく)", ["実家 (じっか)", "自分 (じぶん)", "住宅 (じゅうたく)"]), "answer": "自宅 (じたく)", "explanation": "Nhà riêng của mình là 自宅 (TỰ TRẠCH - じたく)."},
                    {"id": 3, "prompt": "③ [③てんき]が よく、富士山が きれいに 見えました。:", "options": shuffle_choices("天気 (てんき)", ["気温 (きおん)", "季節 (きせつ)", "空 (そら)"]), "answer": "天気 (てんき)", "explanation": "Thời tiết đẹp là 天気 (THIÊN KHÍ)."},
                    {"id": 4, "prompt": "④ 天気が よく、富士山が [④きれいに] 見えました。:", "options": shuffle_choices("綺麗に (きれいに)", ["静かに (しずかに)", "明るく (あかるく)", "大きく (おおきく)"]), "answer": "綺麗に (きれいに)", "explanation": "Đẹp đẽ rõ ràng là 綺麗 (KỶ LỆ)."},
                    {"id": 5, "prompt": "⑤ 湖の まわりを [⑤ある]いたり サイクリングを したりしました。:", "options": shuffle_choices("歩いたり (あるいたり)", ["走ったり (はしったり)", "泳いだり (およいだり)", "乗ったり (のったり)"]), "answer": "歩いたり (あるいたり)", "explanation": "Đi bộ là 歩く (BỘ - あるく)."},
                    {"id": 6, "prompt": "⑥ 湖の まわりを 歩いたり [⑥くるま]で ドライブしたりしました。:", "options": shuffle_choices("車 (くるま)", ["電車 (でんしゃ)", "自転車 (じてんしゃ)", "船 (ふね)"]), "answer": "車 (くるま)", "explanation": "Xe ô tô là chữ 車 (XA - くるま)."},
                    {"id": 7, "prompt": "⑦ 友だちが [⑦しゃしん]を たくさん とってくれました。:", "options": shuffle_choices("写真 (しゃしん)", ["映画 (えいが)", "景色 (けしき)", "手紙 (てがみ)"]), "answer": "写真 (しゃしん)", "explanation": "Chụp ảnh lưu niệm là 写真 (TẢ CHÂN - しゃしん)."},
                    {"id": 8, "prompt": "⑧ 夜は 近くの [⑧ホテル]に とまりました。:", "options": shuffle_choices("ホテル (Hotel)", ["旅館 (りょかん)", "アパート", "自宅 (じたく)"]), "answer": "ホテル (Hotel)", "explanation": "Khách sạn nghỉ đêm là ホテル."},
                    {"id": 9, "prompt": "⑨ 露天風呂から [⑨ほし]が よく 見えて すばらしかったです。:", "options": shuffle_choices("星 (ほし)", ["月 (つき)", "雲 (くも)", "雪 (ゆき)"]), "answer": "星 (ほし)", "explanation": "Ngắm những vì sao ban đêm là chữ 星 (TINH - ほし)."},
                    {"id": 10, "prompt": "⑩ 空には [⑩くも]が ぜんぜん ありませんでした。:", "options": shuffle_choices("雲 (くも)", ["雪 (ゆき)", "雨 (あめ)", "霧 (きり)"]), "answer": "雲 (くも)", "explanation": "Trời không một gợn mây là chữ 雲 (VÂN - くも)."},
                    {"id": 11, "prompt": "⑪ 朝は [⑪もり]の 中を さんぽしました。:", "options": shuffle_choices("森 (もり)", ["林 (はやし)", "山 (やま)", "野 (の)"]), "answer": "森 (もり)", "explanation": "Rừng cây rậm rạp là chữ 森 (SÂM - もり)."},
                    {"id": 12, "prompt": "⑫ めずらしい [⑫くさばな]が たくさん さいていました。:", "options": shuffle_choices("草花 (くさばな)", ["野草 (やそう)", "花木 (かぼく)", "樹木 (じゅもく)"]), "answer": "草花 (くさばな)", "explanation": "Hoa cỏ là 草花 (THẢO HOA)."},
                    {"id": 13, "prompt": "⑬ [⑬むし]の 鳴き声が 聞こえました。:", "options": shuffle_choices("虫 (むし)", ["鳥 (とり)", "獣 (けもの)", "蝉 (せみ)"]), "answer": "虫 (むし)", "explanation": "Côn trùng là chữ 虫 (TRÙNG - むし)."},
                    {"id": 14, "prompt": "⑭ 虫の [⑭なき]声が 聞こえました。:", "options": shuffle_choices("鳴き (なき)", ["叫び (さけび)", "笑い (わらい)", "泣き (なき)"]), "answer": "鳴き (なき)", "explanation": "Tiếng kêu hót của côn trùng là 鳴き (MINH)."},
                    {"id": 15, "prompt": "⑮ 私は [⑮ふるさと]を 思い出して なつかしい 気持ちになりました。:", "options": shuffle_choices("里 (さと)", ["村 (むら)", "町 (まち)", "国 (くに)"]), "answer": "里 (さと)", "explanation": "Quê hương làng quê là chữ 里 (LÝ - さと)."},
                    {"id": 16, "prompt": "⑯ 私は [⑯はし]ったり うんどうしたり するのは にがてです。:", "options": shuffle_choices("走ったり (はしったり)", ["歩いたり (あるいたり)", "飛んだり (とんだり)", "登ったり (のぼったり)"]), "answer": "走ったり (はしったり)", "explanation": "Chạy bộ là 走る (TẨU - はしる)."},
                    {"id": 17, "prompt": "⑰ 私は 走ったり [⑰うんどう]したり するのは にがてです。:", "options": shuffle_choices("運動 (うんどう)", ["活動 (かつどう)", "練習 (れんしゅう)", "水泳 (すいえい)"]), "answer": "運動 (うんどう)", "explanation": "Vận động tập thể thao là 運動 (VẬN ĐỘNG)."},
                    {"id": 18, "prompt": "⑱ 小学生のとき [⑱すいえい]教室に 通っていたので 泳ぐのは とくいです。:", "options": shuffle_choices("水泳 (すいえい)", ["体操 (たいそう)", "野球 (やきゅう)", "柔道 (じゅうどう)"]), "answer": "水泳 (すいえい)", "explanation": "Bơi lội là 水泳 (THỦY VỊNH)."},
                    {"id": 19, "prompt": "⑲ 次の日 チェックアウトしてから [⑲こじょう]の レストランで ランチを しました。:", "options": shuffle_choices("湖 (こ)", ["海 (かい)", "山 (さん)", "川 (せん)"]), "answer": "湖 (こ)", "explanation": "Trên mặt hồ là 湖上 (HỒ THƯỢNG - こじょう)."},
                    {"id": 20, "prompt": "⑳ 帰り道に 近くにある ぼく場にも よりました。牛や [⑳うま]が たくさん いました。:", "options": shuffle_choices("馬 (うま)", ["羊 (ひつじ)", "豚 (ぶた)", "鳥 (とり)"]), "answer": "馬 (うま)", "explanation": "Con ngựa là chữ 馬 (MÃ - うま)."}
                ]
            }
        }
    ]
}

try:
    print("=" * 80)
    print("STEP 1: UPDATE CHAPTER INTRO IMAGES IN kanji_chapters TABLE")
    print("=" * 80)
    for ch_num in range(1, 10):
        ch_id = ch_num + 30
        intro_url = f"/assets/kanji/n4/illustrations/chap{ch_num}_intro.webp"
        cur.execute("UPDATE kanji_chapters SET illustration_url = %s, updated_at = NOW() WHERE id = %s;", (intro_url, ch_id))
        print(f"Updated Chapter {ch_num} (ID {ch_id}) -> illustration_url: {intro_url}")

    print("\n" + "=" * 80)
    print("STEP 2: CLEAR EXISTING N4 MINIGAMES (Ch 31 to 39)")
    print("=" * 80)
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id BETWEEN 31 AND 39;")
    print("Deleted old minigames.")

    print("\n" + "=" * 80)
    print("STEP 3: INSERT 100% AUTHENTIC 1-TO-1 MINIGAMES FOR ALL 9 CHAPTERS")
    print("=" * 80)

    total_inserted = 0
    total_questions = 0

    for ch_id, games in ALL_MINIGAMES.items():
        for g in games:
            qs = g["data"]["questions"]
            cur.execute("""
                INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
            """, (
                ch_id,
                g["game_type"],
                g["title"],
                g["instruction"],
                g["image_url"],
                json.dumps(g["data"], ensure_ascii=False),
                g["display_order"]
            ))
            total_inserted += 1
            total_questions += len(qs)
            print(f"Ch {ch_id} | Order {g['display_order']} | Qs: {len(qs):2d} | Img: {g['image_url']} | Title: {g['title']}")

    conn.commit()
    print(f"\nSUCCESS: Inserted {total_inserted} minigames with {total_questions} total questions into Supabase DB!")

except Exception as e:
    conn.rollback()
    print("ERROR:", e)
    raise
finally:
    cur.close()
    conn.close()
