import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

SEED_PATH = 'scripts/data/kanji_n1_seed.json'
with open(SEED_PATH, 'r', encoding='utf-8') as f:
    seed = json.load(f)

# 1. NEW MINIGAMES FOR CH 23..30
CDN_BASE = "https://bxqwarbeocbsfjieqbsq.supabase.co/storage/v1/object/public/kanji-assets/n1/quizzes/crops"

new_minigames = {
    23: {
        "chapter_number": 23,
        "game_type": "MULTIPLE_CHOICE",
        "title": "Minigame 23章 (23章〜26章 クイズ): 【3】 Từ vay mượn Katakana & Hán tự tương ứng (p.200)",
        "instruction": "Quan sát bài tập 【3】 trang 200 (23章〜26章 クイズ). Chọn chữ Hán có mối liên hệ mật thiết nhất với mỗi từ Katakana bên dưới:",
        "image_url": f"{CDN_BASE}/ch23_g1.webp",
        "display_order": 1,
        "game_data": {
            "example": {
                "prompt": "例) ボール (Trái bóng) => 蹴 ・ 乞 ・ 酪",
                "answer": "蹴 (Đá bóng)"
            },
            "questions": [
                {
                    "id": 1,
                    "promptJa": "1. フェイスライン (Face line — Đường nét khuôn mặt)",
                    "promptVi": "Đường viền xương hàm / khuôn mặt",
                    "options": ["享", "詮", "顎"],
                    "answer": "顎",
                    "explanation": "フェイスライン tương ứng với「顎」(ngạc - cái cằm/xương hàm mặt)."
                },
                {
                    "id": 2,
                    "promptJa": "2. アドベンチャー (Adventure — Chuyến phiêu lưu)",
                    "promptVi": "Chuyến phiêu lưu mạo hiểm",
                    "options": ["痘", "脊", "冒"],
                    "answer": "冒",
                    "explanation": "アドベンチャー tương ứng với「冒」(mạo - 冒険 mạo hiểm)."
                },
                {
                    "id": 3,
                    "promptJa": "3. シャンプー (Shampoo — Dầu gội đầu)",
                    "promptVi": "Dầu gội đầu tỏa hương thơm",
                    "options": ["顕", "匂", "臨"],
                    "answer": "匂",
                    "explanation": "シャンプー tương ứng với「匂」(mùi hương / 匂い)."
                },
                {
                    "id": 4,
                    "promptJa": "4. ダイエット (Diet — Chế độ giảm cân)",
                    "promptVi": "Ăn kiêng để cơ thể thon thả",
                    "options": ["痩", "葛", "礁"],
                    "answer": "痩",
                    "explanation": "ダイエット tương ứng với「痩」(sấu - 痩せる gầy đi/thon thả)."
                },
                {
                    "id": 5,
                    "promptJa": "5. ペンキ (Paint — Nước sơn tường)",
                    "promptVi": "Nước sơn tường bị bong tróc",
                    "options": ["髄", "鎮", "剥"],
                    "answer": "剥",
                    "explanation": "ペンキ tương ứng với「剥」(bác - 剥がれる bong tróc nước sơn)."
                },
                {
                    "id": 6,
                    "promptJa": "6. シール (Sticker — Nhãn dán, đề can)",
                    "promptVi": "Nhãn dán, tem dính dán tường/vật dụng",
                    "options": ["捉", "貼", "斧"],
                    "answer": "貼",
                    "explanation": "シール tương ứng với「貼」(thiếp - 貼る dán nhãn/decal)."
                }
            ]
        }
    },
    24: {
        "chapter_number": 24,
        "game_type": "SENTENCE_CLOZE",
        "title": "Minigame 24章 (23章〜26章 クイズ): 【1】 Nối âm đọc Shiritori chuỗi từ vựng Hán tự (p.200)",
        "instruction": "Quan sát bài tập 【1】 trang 200 (23章〜26章 クイズ). Điền âm đọc Hiragana nối tiếp nhau theo quy tắc Shiritori (âm đuôi từ trước là âm đầu từ sau):",
        "image_url": f"{CDN_BASE}/ch24_g1.webp",
        "display_order": 1,
        "game_data": {
            "wordBank": [
                "けんびきょう", "きょうじゅ", "じゅもん",
                "せんかん", "かんき", "きぶんそうかい", "かいこん",
                "きとく", "とくちょう", "ちょうしょう", "しょうにんかんもん"
            ],
            "questions": [
                {
                    "id": 1,
                    "sentence": "Chuỗi 1: 冒険 (ぼうけん) → 顕微鏡 ( [blank] )",
                    "answer": "けんびきょう",
                    "targetWord": "顕微鏡",
                    "hiragana": "けんびきょう",
                    "meaning": "Kính hiển vi",
                    "explanation": "ぼうけん (đuôi けん) nối sang 顕微鏡（けんびきょう）."
                },
                {
                    "id": 2,
                    "sentence": "Chuỗi 1 (tiếp): 顕微鏡 (けんびきょう) → 享受 ( [blank] )",
                    "answer": "きょうじゅ",
                    "targetWord": "享受",
                    "hiragana": "きょうじゅ",
                    "meaning": "Hưởng thụ, đón nhận",
                    "explanation": "けんびきょう (đuôi きょう) nối sang 享受（きょうじゅ）."
                },
                {
                    "id": 3,
                    "sentence": "Chuỗi 1 (tiếp): 享受 (きょうじゅ) → 呪文 ( [blank] )",
                    "answer": "じゅもん",
                    "targetWord": "呪文",
                    "hiragana": "じゅもん",
                    "meaning": "Câu thần chú",
                    "explanation": "きょうじゅ (đuôi じゅ) nối sang 呪文（じゅもん）."
                },
                {
                    "id": 4,
                    "sentence": "Chuỗi 2: 【 戦艦 】 ( [blank] ) → 喚起",
                    "answer": "せんかん",
                    "targetWord": "戦艦",
                    "hiragana": "せんかん",
                    "meaning": "Chiến hạm trên biển",
                    "explanation": "戦艦 đọc là せんかん (kết thúc bằng かん)."
                },
                {
                    "id": 5,
                    "sentence": "Chuỗi 2 (tiếp): 戦艦 (せんかん) → 喚起 ( [blank] )",
                    "answer": "かんき",
                    "targetWord": "喚起",
                    "hiragana": "かんき",
                    "meaning": "Kêu gọi, thức tỉnh",
                    "explanation": "せんかん (đuôi かん) nối sang 喚起（かんき）."
                },
                {
                    "id": 6,
                    "sentence": "Chuỗi 2 (tiếp): 喚起 (かんき) → 気分爽快 ( [blank] )",
                    "answer": "きぶんそうかい",
                    "targetWord": "気分爽快",
                    "hiragana": "きぶんそうかい",
                    "meaning": "Tâm trạng sảng khoái dễ chịu",
                    "explanation": "かんき (đuôi き) nối sang 気分爽快（きぶんそうかい）."
                },
                {
                    "id": 7,
                    "sentence": "Chuỗi 2 (tiếp): 気分爽快 (きぶんそうかい) → 開墾 ( [blank] )",
                    "answer": "かいこん",
                    "targetWord": "開墾",
                    "hiragana": "かいこん",
                    "meaning": "Khai khẩn đất hoang",
                    "explanation": "きぶんそうかい (đuôi かい) nối sang 開墾（かいこん）."
                },
                {
                    "id": 8,
                    "sentence": "Chuỗi 3: 【 危篤 】 ( [blank] ) → 特徴",
                    "answer": "きとく",
                    "targetWord": "危篤",
                    "hiragana": "きとく",
                    "meaning": "Bệnh tình nguy kịch",
                    "explanation": "危篤 đọc là きとく (kết thúc bằng とく)."
                },
                {
                    "id": 9,
                    "sentence": "Chuỗi 3 (tiếp): 危篤 (きとく) → 特徴 ( [blank] )",
                    "answer": "とくちょう",
                    "targetWord": "特徴",
                    "hiragana": "とくちょう",
                    "meaning": "Đặc trưng nổi bật",
                    "explanation": "きとく (đuôi とく) nối sang 特徴（とくちょう）."
                },
                {
                    "id": 10,
                    "sentence": "Chuỗi 3 (tiếp): 特徴 (とくちょう) → 嘲笑 ( [blank] )",
                    "answer": "ちょうしょう",
                    "targetWord": "嘲笑",
                    "hiragana": "ちょうしょう",
                    "meaning": "Cười nhạo, châm biếm",
                    "explanation": "とくちょう (đuôi ちょう) nối sang 嘲笑（ちょうしょう）."
                },
                {
                    "id": 11,
                    "sentence": "Chuỗi 3 (tiếp): 嘲笑 (ちょうしょう) → 証人喚問 ( [blank] )",
                    "answer": "しょうにんかんもん",
                    "targetWord": "証人喚問",
                    "hiragana": "しょうにんかんもん",
                    "meaning": "Thẩm vấn nhân chứng",
                    "explanation": "ちょうしょう (đuôi しょう) nối sang 証人喚問（しょうにんかんもん）."
                }
            ]
        }
    },
    25: {
        "chapter_number": 25,
        "game_type": "MULTIPLE_CHOICE",
        "title": "Minigame 25章 (23章〜26章 クイズ): 【2】 Nhận diện Bộ thủ chung & Chữ Hán khác bộ (p.200)",
        "instruction": "Quan sát bảng 【2】 trang 200 (23章〜26章 クイズ). Chọn Chữ Hán có bộ thủ khác biệt hoặc nhận diện Bộ thủ chung trong mỗi hàng:",
        "image_url": f"{CDN_BASE}/ch25_g1.webp",
        "display_order": 1,
        "game_data": {
            "example": {
                "prompt": "例) 花・草・芽・菜・華・簡",
                "answer": "Bộ thủ chung: 艹 (Thảo) | Chữ khác: 簡 (Bộ Trúc ⺮)"
            },
            "questions": [
                {
                    "id": 1,
                    "promptJa": "1) 涙・渇・氾・潜・濫・凄 — Chữ Hán nào có bộ thủ KHÁC với các chữ còn lại?",
                    "promptVi": "Các chữ đều mang bộ Thủy 氵, riêng chữ này mang bộ Băng 冫",
                    "options": ["涙", "潜", "凄", "濫"],
                    "answer": "凄",
                    "explanation": "Chữ 凄 mang bộ Băng (冫), trong khi các chữ còn lại đều mang bộ Thủy (氵). Đáp án sách: 氵 - 凄."
                },
                {
                    "id": 2,
                    "promptJa": "2) 居・仆・散・杜・念・坐 — Bộ thủ chung xuất hiện trong các chữ (trừ 1 chữ) là gì?",
                    "promptVi": "Chữ 朴 mang bộ Mộc 木",
                    "options": ["Bộ Mộc (木)", "Bộ Thổ (土)", "Bộ Nhân (亻)", "Bộ Khẩu (口)"],
                    "answer": "Bộ Mộc (木)",
                    "explanation": "Bộ thủ chung trong bài tập là bộ Mộc (木) và chữ khác là 朴. Đáp án sách: 木 - 朴."
                },
                {
                    "id": 3,
                    "promptJa": "3) 肛・腹・椎・股・胆 — Chữ Hán nào có bộ thủ KHÁC với các chữ còn lại?",
                    "promptVi": "Chữ mang bộ Mộc 木 trong khi các chữ khác mang bộ Nguyệt 月 (Nhục)",
                    "options": ["肛", "椎", "股", "胆"],
                    "answer": "椎",
                    "explanation": "Chữ 椎 mang bộ Mộc (木), trong khi các chữ còn lại đều mang bộ Nguyệt/Nhục (月). Đáp án sách: 月 - 股."
                },
                {
                    "id": 4,
                    "promptJa": "4) 畔・畦・畑・畝・町 — Chữ Hán nào được chọn với bộ Khẩu 口 khác biệt?",
                    "promptVi": "Chữ 畔 (bờ ruộng) trong hệ thống bộ thủ",
                    "options": ["畔", "畦", "畑", "畝"],
                    "answer": "畔",
                    "explanation": "Đáp án giáo trình: 口 - 畔."
                },
                {
                    "id": 5,
                    "promptJa": "5) 傍・放・攻・敵・斬 — Chữ Hán nào mang bộ thủ Cân 斤 (rìu)?",
                    "promptVi": "Chữ Hán 斬 (trảm - chém) mang bộ Cân 斤",
                    "options": ["傍", "放", "敵", "斬"],
                    "answer": "斬",
                    "explanation": "Chữ 斬 mang bộ Cân (斤), khác với các chữ còn lại. Đáp án sách: 亻 - 斬."
                }
            ]
        }
    },
    26: {
        "chapter_number": 26,
        "game_type": "SENTENCE_CLOZE",
        "title": "Minigame 26章 (23章〜26章 クイズ): 【4】 Bệnh lý lâm sàng & Phân khoa khám chữa bệnh (p.200)",
        "instruction": "Quan sát bài tập 【4】 trang 200 (23章〜26章 クイズ). Điền âm đọc Hiragana của triệu chứng và chọn Phân khoa khám chữa bệnh phù hợp (b. 整形外科, c. 耳鼻咽喉科, d. 脳外科, e. 心療内科, f. 美容外科):",
        "image_url": f"{CDN_BASE}/ch26_g1.webp",
        "display_order": 1,
        "game_data": {
            "wordBank": [
                "ねんざ", "へんずつう", "はれ", "なえて", "しゅよう",
                "b. 整形外科", "c. 耳鼻咽喉科", "d. 脳外科", "e. 心療内科", "f. 美容外科"
            ],
            "questions": [
                {
                    "id": 1,
                    "sentence": "Aさん: バスケットボールで【 捻挫 】( [blank] ) をした。",
                    "answer": "ねんざ",
                    "targetWord": "捻挫",
                    "hiragana": "ねんざ",
                    "meaning": "Bong gân khi chơi bóng rổ",
                    "explanation": "捻挫 đọc là ねんざ."
                },
                {
                    "id": 2,
                    "sentence": "Aさん: Bị chấn thương bong gân thì cần đi khám tại: [blank]",
                    "answer": "b. 整形外科",
                    "targetWord": "整形外科",
                    "hiragana": "せいけいげか",
                    "meaning": "Khoa chấn thương chỉnh hình",
                    "explanation": "Bong gân khám ở b. 整形外科 (Khoa chấn thương chỉnh hình)."
                },
                {
                    "id": 3,
                    "sentence": "Bさん: 最近、【 偏頭痛 】( [blank] ) がする。",
                    "answer": "へんずつう",
                    "targetWord": "偏頭痛",
                    "hiragana": "へんずつう",
                    "meaning": "Đau nửa đầu",
                    "explanation": "偏頭痛 đọc là へんずつう."
                },
                {
                    "id": 4,
                    "sentence": "Bさん: Đau nửa đầu kéo dài thì cần đi khám tại: [blank]",
                    "answer": "d. 脳外科",
                    "targetWord": "脳外科",
                    "hiragana": "のうげか",
                    "meaning": "Khoa ngoại thần kinh / não bộ",
                    "explanation": "Đau nửa đầu khám ở d. 脳外科 (Khoa phẫu thuật não bộ / thần kinh)."
                },
                {
                    "id": 5,
                    "sentence": "Cさん: まぶたが【 腫れ 】( [blank] ) ぼったいので二重にしたい。",
                    "answer": "はれ",
                    "targetWord": "腫れ",
                    "hiragana": "はれ",
                    "meaning": "Mí mắt bị sưng bụp",
                    "explanation": "腫れ đọc là はれ."
                },
                {
                    "id": 6,
                    "sentence": "Cさん: Muốn phẫu thuật mí mắt đẹp thì cần đến: [blank]",
                    "answer": "f. 美容外科",
                    "targetWord": "美容外科",
                    "hiragana": "びようげか",
                    "meaning": "Khoa phẫu thuật thẩm mỹ",
                    "explanation": "Thẩm mỹ mí mắt đến f. 美容外科 (Khoa phẫu thuật thẩm mỹ)."
                },
                {
                    "id": 7,
                    "sentence": "Dさん: 気分が【 萎えて 】( [blank] ) 、やる気が出ない。",
                    "answer": "なえて",
                    "targetWord": "萎えて",
                    "hiragana": "なえて",
                    "meaning": "Tâm trạng chán nản, kiệt sức",
                    "explanation": "萎えて đọc là なえて."
                },
                {
                    "id": 8,
                    "sentence": "Dさん: Tinh thần uể oải mất động lực thì cần khám tại: [blank]",
                    "answer": "e. 心療内科",
                    "targetWord": "心療内科",
                    "hiragana": "しんりょうないか",
                    "meaning": "Khoa tâm thần / tâm lý y khoa",
                    "explanation": "Suy sụp tinh thần khám ở e. 心療内科 (Khoa tâm lý nội khoa)."
                },
                {
                    "id": 9,
                    "sentence": "Eさん: 喉に【 腫瘍 】( [blank] ) があることが検査で分かった。",
                    "answer": "しゅよう",
                    "targetWord": "腫瘍",
                    "hiragana": "しゅよう",
                    "meaning": "Khối u ở vùng cổ họng",
                    "explanation": "腫瘍 đọc là しゅよう."
                },
                {
                    "id": 10,
                    "sentence": "Eさん: Khám khối u vòm họng thì cần đến: [blank]",
                    "answer": "c. 耳鼻咽喉科",
                    "targetWord": "耳鼻咽喉科",
                    "hiragana": "じびいんこうか",
                    "meaning": "Khoa tai mũi họng",
                    "explanation": "U vòm họng khám ở c. 耳鼻咽喉科 (Khoa Tai - Mũi - Họng)."
                }
            ]
        }
    },
    27: {
        "chapter_number": 27,
        "game_type": "SENTENCE_CLOZE",
        "title": "Minigame 27章 (23章〜26章 クイズ): 【5-A】 Tiểu thuyết \"妻の逆襲\" (Phần 1: ①〜⑩) (p.201)",
        "instruction": "Quan sát trích đoạn tiểu thuyết 【5】 trang 201 (23章〜26章 クイズ). Đọc truyện và điền cách đọc Hiragana cho các chữ Hán được đánh số ①〜⑩:",
        "image_url": f"{CDN_BASE}/ch27_g1.webp",
        "display_order": 1,
        "game_data": {
            "wordBank": [
                "しんりんばっさい", "どじょう", "しんしに", "じゅんぼく", "かもく",
                "ちみつ", "におい", "ようえんな", "かんぺきな", "さわやかな"
            ],
            "questions": [
                {
                    "id": 1,
                    "sentence": "彼は ①【 森林伐採 】( [blank] ) に反対し...",
                    "answer": "しんりんばっさい",
                    "targetWord": "森林伐採",
                    "hiragana": "しんりんばっさい",
                    "meaning": "Chặt phá rừng bừa bãi",
                    "explanation": "森林伐採 đọc là しんりんばっさい."
                },
                {
                    "id": 2,
                    "sentence": "...地元の ②【 土壌 】( [blank] ) を守るために...",
                    "answer": "どじょう",
                    "targetWord": "土壌",
                    "hiragana": "どじょう",
                    "meaning": "Thổ nhưỡng / đất đai",
                    "explanation": "土壌 đọc là どじょう."
                },
                {
                    "id": 3,
                    "sentence": "...③【 真摯 】( [blank] ) に働いていた。",
                    "answer": "しんしに",
                    "targetWord": "真摯",
                    "hiragana": "しんしに",
                    "meaning": "Chân thành, nghiêm túc",
                    "explanation": "真摯に đọc là しんしに."
                },
                {
                    "id": 4,
                    "sentence": "④【 純朴 】( [blank] ) かつ 寡黙で...",
                    "answer": "じゅんぼく",
                    "targetWord": "純朴",
                    "hiragana": "じゅんぼく",
                    "meaning": "Chất phác, hồn hậu",
                    "explanation": "純朴 đọc là じゅんぼく."
                },
                {
                    "id": 5,
                    "sentence": "...純朴かつ ⑤【 寡黙 】( [blank] ) で...",
                    "answer": "かもく",
                    "targetWord": "寡黙",
                    "hiragana": "かもく",
                    "meaning": "Trầm lặng, kiệm lời",
                    "explanation": "寡黙 đọc là かもく."
                },
                {
                    "id": 6,
                    "sentence": "...仕事を ⑥【 緻密 】( [blank] ) にこなす態度は慕われていた。",
                    "answer": "ちみつ",
                    "targetWord": "緻密",
                    "hiragana": "ちみつ",
                    "meaning": "Tỉ mỉ, chu đáo",
                    "explanation": "緻密 đọc là ちみつ."
                },
                {
                    "id": 7,
                    "sentence": "彼女の横を通ると、まるでバラの中にいるような柔らかい ⑦【 匂い 】( [blank] ) がし...",
                    "answer": "におい",
                    "targetWord": "匂い",
                    "hiragana": "におい",
                    "meaning": "Mùi hương thoang thoảng",
                    "explanation": "匂い đọc là におい."
                },
                {
                    "id": 8,
                    "sentence": "...その ⑧【 妖艶 】( [blank] ) な姿を見て多くの男性が声をかけたくなる...",
                    "answer": "ようえんな",
                    "targetWord": "妖艶",
                    "hiragana": "ようえんな",
                    "meaning": "Quyến rũ ma mị",
                    "explanation": "妖艶な đọc là ようえんな."
                },
                {
                    "id": 9,
                    "sentence": "こんな ⑨【 完璧 】( [blank] ) な夫婦を見て誰もが羨ましく思っていた。",
                    "answer": "かんぺきな",
                    "targetWord": "完璧",
                    "hiragana": "かんぺきな",
                    "meaning": "Hoàn hảo, vẹn toàn",
                    "explanation": "完璧な đọc là かんぺきな."
                },
                {
                    "id": 10,
                    "sentence": "湧田が ⑩【 爽やか 】( [blank] ) な笑顔で挨拶をした。",
                    "answer": "さわやかな",
                    "targetWord": "爽やか",
                    "hiragana": "さわやかな",
                    "meaning": "Tươi tắn sảng khoái",
                    "explanation": "爽やかな đọc là さわやかな."
                }
            ]
        }
    },
    28: {
        "chapter_number": 28,
        "game_type": "SENTENCE_CLOZE",
        "title": "Minigame 28章 (23章〜26章 クイズ): 【5-B】 Tiểu thuyết \"妻の逆襲\" (Phần 2: ⑪〜㉑) (p.201)",
        "instruction": "Quan sát trích đoạn tiểu thuyết 【5】 trang 201 (23章〜26章 クイズ). Đọc phần tiếp theo và điền cách đọc Hiragana cho các chữ Hán được đánh số ⑪〜㉑:",
        "image_url": f"{CDN_BASE}/ch28_g1.webp",
        "display_order": 1,
        "game_data": {
            "wordBank": [
                "しっと", "かつしかく", "わずか", "かいぼう", "ついらく",
                "おぼれて", "はんらん", "おくびょう", "ねらわれた", "わきあがって", "うらみ"
            ],
            "questions": [
                {
                    "id": 1,
                    "sentence": "彼の心の中が明への ⑪【 嫉妬 】( [blank] ) でいっぱいであるとは...",
                    "answer": "しっと",
                    "targetWord": "嫉妬",
                    "hiragana": "しっと",
                    "meaning": "Ghen ghét, đố kỵ",
                    "explanation": "嫉妬 đọc là しっと."
                },
                {
                    "id": 2,
                    "sentence": "「もしもし、こちら ⑫【 葛飾区 】( [blank] ) 中央病院ですが」",
                    "answer": "かつしかく",
                    "targetWord": "葛飾区",
                    "hiragana": "かつしかく",
                    "meaning": "Quận Katsushika (Tokyo)",
                    "explanation": "葛飾区 đọc là かつしかく."
                },
                {
                    "id": 3,
                    "sentence": "⑬【 僅か 】( [blank] ) 三十八で人生の幕を閉じるのは早すぎないか。",
                    "answer": "わずか",
                    "targetWord": "僅か",
                    "hiragana": "わずか",
                    "meaning": "Vỏn vẹn chỉ mới",
                    "explanation": "僅か đọc là わずか."
                },
                {
                    "id": 4,
                    "sentence": "「⑭【 解剖 】( [blank] ) してみないとなんとも言えませんね」",
                    "answer": "かいぼう",
                    "targetWord": "解剖",
                    "hiragana": "かいぼう",
                    "meaning": "Giải phẫu tử thi",
                    "explanation": "解剖 đọc là かいぼう."
                },
                {
                    "id": 5,
                    "sentence": "飛行機の ⑮【 墜落 】( [blank] ) で死んだ、などだったら納得せざるを得ないが...",
                    "answer": "ついらく",
                    "targetWord": "墜落",
                    "hiragana": "ついらく",
                    "meaning": "Rơi máy bay",
                    "explanation": "墜落 đọc là ついらく."
                },
                {
                    "id": 6,
                    "sentence": "明は川で ⑯【 溺れて 】( [blank] ) いたらしい。",
                    "answer": "おぼれて",
                    "targetWord": "溺れて",
                    "hiragana": "おぼれて",
                    "meaning": "Bị đuối nước",
                    "explanation": "溺れて đọc là おぼれて."
                },
                {
                    "id": 7,
                    "sentence": "大雨で川が ⑰【 氾濫 】( [blank] ) し、足を滑らせて落ちた可能性...",
                    "answer": "はんらん",
                    "targetWord": "氾濫",
                    "hiragana": "はんらん",
                    "meaning": "Tràn bờ, ngập lụt",
                    "explanation": "氾濫 đọc là はんらん."
                },
                {
                    "id": 8,
                    "sentence": "水に対して ⑱【 臆病 】( [blank] ) であった明が大雨の日に川に行くはずがない。",
                    "answer": "おくびょう",
                    "targetWord": "臆病",
                    "hiragana": "おくびょう",
                    "meaning": "Nhút nhát, sợ nước",
                    "explanation": "臆病 đọc là おくびょう."
                },
                {
                    "id": 9,
                    "sentence": "「どうして？夫は誰かに ⑲【 狙われた 】( [blank] ) ？」",
                    "answer": "ねらわれた",
                    "targetWord": "狙われた",
                    "hiragana": "ねらわれた",
                    "meaning": "Bị ai đó nhắm đến ám hại",
                    "explanation": "狙われた đọc là ねらわれた."
                },
                {
                    "id": 10,
                    "sentence": "夫を殺した「誰か」に対して ⑳【 湧き上がって 】( [blank] ) くる怒り...",
                    "answer": "わきあがって",
                    "targetWord": "湧き上がって",
                    "hiragana": "わきあがって",
                    "meaning": "Cuộn trào, dâng trào lên",
                    "explanation": "湧き上がって đọc là わきあがって."
                },
                {
                    "id": 11,
                    "sentence": "...怒りと ㉑【 怨み 】( [blank] ) の気持ちが抑えきれなかった。",
                    "answer": "うらみ",
                    "targetWord": "怨み",
                    "hiragana": "うらみ",
                    "meaning": "Mối oán hận ngút ngàn",
                    "explanation": "怨み đọc là うらみ."
                }
            ]
        }
    },
    29: {
        "chapter_number": 29,
        "game_type": "MULTIPLE_CHOICE",
        "title": "Minigame 29章 (27章〜29章 復習): 【2】 Thân phận, Tước vị & Quân hàm cổ điển (p.209)",
        "instruction": "Quan sát bài tập 【2】 trang 209 (27章〜29章 復習). Chọn chữ Hán chính xác ứng với từ gạch chân Hiragana trong câu:",
        "image_url": f"{CDN_BASE}/ch29_g1.webp",
        "display_order": 1,
        "game_data": {
            "questions": [
                {
                    "id": 1,
                    "promptJa": "1. 国の【 そうすい 】となるからには統率力が必要だ。",
                    "promptVi": "Trở thành Tổng tư lệnh / Lãnh tụ tối cao của quốc gia",
                    "options": ["① 総帥", "② 総師", "③ 僧帥", "④ 僧師"],
                    "answer": "① 総帥",
                    "explanation": "そうすい viết là 総帥 (tổng soái - thống soái/tổng tư lệnh)."
                },
                {
                    "id": 2,
                    "promptJa": "2. 私の父は【 ほにゅうるい 】の生態と知能を研究している。",
                    "promptVi": "Động vật có vú (lớp thú sinh con bú sữa)",
                    "options": ["① 捕乳類", "② 補乳類", "③ 哺乳類", "④ 御曹司"],
                    "answer": "③ 哺乳類",
                    "explanation": "ほにゅうるい viết là 哺乳類 (bộ nhũ loại)."
                },
                {
                    "id": 3,
                    "promptJa": "3. 【 たいぼうしき 】でろうそくを灯し、心を新たにした。",
                    "promptVi": "Lễ đội mũ tốt nghiệp y tá (lễ tuyên thệ)",
                    "options": ["① 待望式", "② 戴冒式", "③ 戴帽式", "④ 舗乳類"],
                    "answer": "③ 戴帽式",
                    "explanation": "たいぼうしき viết là 戴帽式 (đái mạo thức - lễ đội mũ y tá)."
                },
                {
                    "id": 4,
                    "promptJa": "4. 日本語での表現を豊かにするには一万以上の【 ごい 】が必要だ。",
                    "promptVi": "Vốn từ vựng cần thiết",
                    "options": ["① 語意", "② 話彙", "③ 話意", "④ 語彙"],
                    "answer": "④ 語彙",
                    "explanation": "ごい viết là 語彙 (ngữ vựng - vốn từ vựng)."
                },
                {
                    "id": 5,
                    "promptJa": "5. 若者の【 しゅうちしん 】の希薄化が問題になっている。",
                    "promptVi": "Lòng xấu hổ / biết hổ thẹn",
                    "options": ["① 羞恥心", "② 差恥心", "③ 差痴心", "④ 差痴心"],
                    "answer": "① 羞恥心",
                    "explanation": "しゅうちしん viết là 羞恥心 (tu sỉ tâm - lòng xấu hổ/tự trọng)."
                }
            ]
        }
    },
    30: {
        "chapter_number": 30,
        "game_type": "SENTENCE_CLOZE",
        "title": "Minigame 30章: Đặc biệt Jukujikun — Chữ Hán khó đọc chuẩn bảng Sanshusha (p.218)",
        "instruction": "Quan sát bảng chữ Hán khó đọc trang 218 (特別な読み方をする漢字). Điền cách đọc đặc biệt (Jukujikun 熟字訓) chính xác cho các từ Hán tự kinh điển:",
        "image_url": f"{CDN_BASE}/ch30_g1.webp",
        "display_order": 1,
        "game_data": {
            "wordBank": [
                "あす", "あずき", "あま", "いおう", "いなか", "かわせ",
                "しにせ", "しゃみせん", "しわす", "すもう", "ぞうり", "たち"
            ],
            "questions": [
                {
                    "id": 1,
                    "sentence": "【 明日 】( [blank] ) は天気が回復する見込みだ。",
                    "answer": "あす",
                    "targetWord": "明日",
                    "hiragana": "あす",
                    "meaning": "Ngày mai (cách đọc trang trọng / văn viết)",
                    "explanation": "明日 đọc đặc biệt là あす (hoặc あした)."
                },
                {
                    "id": 2,
                    "sentence": "お正月のぜんざいに【 小豆 】( [blank] ) を煮て入れる。",
                    "answer": "あずき",
                    "targetWord": "小豆",
                    "hiragana": "あずき",
                    "meaning": "Đậu đỏ",
                    "explanation": "小豆 đọc là あずき."
                },
                {
                    "id": 3,
                    "sentence": "志摩半島で素潜り漁を行う【 海女 】( [blank] ) さん。",
                    "answer": "あま",
                    "targetWord": "海女",
                    "hiragana": "あま",
                    "meaning": "Thợ lặn biển nữ bắt hải sản",
                    "explanation": "海女 đọc là あま."
                },
                {
                    "id": 4,
                    "sentence": "火山口の周辺には黄色い【 硫黄 】( [blank] ) の結晶がある。",
                    "answer": "いおう",
                    "targetWord": "硫黄",
                    "hiragana": "いおう",
                    "meaning": "Lưu huỳnh khoáng chất",
                    "explanation": "硫黄 đọc là いおう."
                },
                {
                    "id": 5,
                    "sentence": "都会の喧騒を離れて【 田舎 】( [blank] ) で静かに暮らしたい。",
                    "answer": "いなか",
                    "targetWord": "田舎",
                    "hiragana": "いなか",
                    "meaning": "Quê nhà / vùng nông thôn",
                    "explanation": "田舎 đọc là いなか."
                },
                {
                    "id": 6,
                    "sentence": "円とドルの外国【 為替 】( [blank] ) 相場が変動した。",
                    "answer": "かわせ",
                    "targetWord": "為替",
                    "hiragana": "かわせ",
                    "meaning": "Hối đoái / chuyển tiền",
                    "explanation": "為替 đọc là かわせ."
                },
                {
                    "id": 7,
                    "sentence": "創業三百年を誇る和菓子の【 老舗 】( [blank] )。",
                    "answer": "しにせ",
                    "targetWord": "老舗",
                    "hiragana": "しにせ",
                    "meaning": "Cửa tiệm lâu đời truyền thống",
                    "explanation": "老舗 đọc là しにせ."
                },
                {
                    "id": 8,
                    "sentence": "和楽器の【 三味線 】( [blank] ) の音色に聴き入る。",
                    "answer": "しゃみせん",
                    "targetWord": "三味線",
                    "hiragana": "しゃみせん",
                    "meaning": "Đàn ba dây Shamisen",
                    "explanation": "三味線 đọc là しゃみせん."
                },
                {
                    "id": 9,
                    "sentence": "年の暮れ、十二月を陰暦で【 師走 】( [blank] ) と呼ぶ。",
                    "answer": "しわす",
                    "targetWord": "師走",
                    "hiragana": "しわす",
                    "meaning": "Tháng Chạp (tháng 12 âm lịch)",
                    "explanation": "師走 đọc là しわす."
                },
                {
                    "id": 10,
                    "sentence": "国技館で大相撲の【 相撲 】( [blank] ) を観戦する。",
                    "answer": "すもう",
                    "targetWord": "相撲",
                    "hiragana": "すもう",
                    "meaning": "Đấu vật Sumo truyền thống",
                    "explanation": "相撲 đọc là すもう."
                },
                {
                    "id": 11,
                    "sentence": "着物に竹皮で編んだ【 草履 】( [blank] ) を履く。",
                    "answer": "ぞうり",
                    "targetWord": "草履",
                    "hiragana": "ぞうり",
                    "meaning": "Dép Zori truyền thống Nhật",
                    "explanation": "草履 đọc là ぞうり."
                },
                {
                    "id": 12,
                    "sentence": "武士が腰に差していた名刀の【 太刀 】( [blank] )。",
                    "answer": "たち",
                    "targetWord": "太刀",
                    "hiragana": "たち",
                    "meaning": "Thanh kiếm Tachi bản lớn",
                    "explanation": "太刀 đọc là たち."
                }
            ]
        }
    }
}

# Update minigames in seed
existing_mgs = [m for m in seed["minigames"] if m["chapter_number"] < 23]
for ch_num in range(23, 31):
    existing_mgs.append(new_minigames[ch_num])
seed["minigames"] = existing_mgs


# 2. AUTHENTIC STAGE 32: 23章〜26章 アチーブメントテスト (p.198-199)
stage_32_test = {
    "stage": 32,
    "title": "23章〜26章 アチーブメントテスト (p.198-199)",
    "description": "Đề kiểm tra chuẩn giáo trình Kanji Master N1 (23章〜26章 アチーブメントテスト p.198-199): Tổng hợp kiến thức các chương 23 (Hành vi/Cảm xúc), 24 (Biển/Núi), 25 (Con người/Diện mạo), 26 (Cơ thể/Giải phẫu). 100 điểm trọn vẹn.",
    "pass_percentage": 80,
    "display_order": 32,
    "test_data": {
        "title": "23章〜26章 アチーブメントテスト (p.198-199)",
        "totalPoints": 100,
        "questions": [
            # 【1】 Reading (4 pts each)
            {"id": 1, "section": "【1】", "question": "1. 獲物を【 狙って 】銃を放ったが、うまく命中しなかった。", "targetWord": "狙って", "answer": "③", "correctText": "ねらって", "options": ["① とって", "② きって", "③ ねらって", "④ さわって"], "points": 4},
            {"id": 2, "section": "【1】", "question": "2. 勉強の時は辞書を【 傍ら 】に置いて、わからない言葉があればすぐ調べるようにしている。", "targetWord": "傍ら", "answer": "④", "correctText": "かたわら", "options": ["① かたひら", "② たかひら", "③ かとわら", "④ かたわら"], "points": 4},
            {"id": 3, "section": "【1】", "question": "3. 浮気現場の写真が妻に見つかって、離婚を迫られるという【 窮地 】に追い込まれた。", "targetWord": "窮地", "answer": "①", "correctText": "きゅうち", "options": ["① きゅうち", "② きょうち", "③ しゅうち", "④ しょうち"], "points": 4},
            {"id": 4, "section": "【1】", "question": "4. 台風の勢力がさらに強まってくるので気をつけるよう、皆に注意を【 喚起 】した。", "targetWord": "喚起", "answer": "②", "correctText": "かんき", "options": ["① へんき", "② かんき", "③ しょうき", "④ そんき"], "points": 4},
            {"id": 5, "section": "【1】", "question": "5. この市民団体は長年、麻薬・覚醒剤【 撲滅 】運動に取り組んでいる。", "targetWord": "撲滅", "answer": "①", "correctText": "ぼくめつ", "options": ["① ぼくめつ", "② しょうめつ", "③ じょうめつ", "④ たんめつ"], "points": 4},
            # 【2】 Writing (4 pts each)
            {"id": 6, "section": "【2】", "question": "1. 試合に負け続けて【 がけ 】っぷちに立たされた。次は絶対に勝たなければならない。", "targetWord": "がけ", "answer": "①", "correctText": "崖", "options": ["① 崖", "② 壁", "③ 嵐", "④ 窟"], "points": 4},
            {"id": 7, "section": "【2】", "question": "2. 最近上司に怒られてばかりで、すっかり気が【 なえて 】しまった。", "targetWord": "なえて", "answer": "②", "correctText": "萎えて", "options": ["① 成えて", "② 萎えて", "③ 奈えて", "④ 委えて"], "points": 4},
            {"id": 8, "section": "【2】", "question": "3. 【 かいぼう 】の結果、体内から毒物と思われる成分が検出された。", "targetWord": "かいぼう", "answer": "④", "correctText": "解剖", "options": ["① 会剖", "② 解亡", "③ 会亡", "④ 解剖"], "points": 4},
            {"id": 9, "section": "【2】", "question": "4. 環境問題の一つとなっている森林【 ばっさい 】は、年々増加の傾向にある。", "targetWord": "ばっさい", "answer": "③", "correctText": "伐採", "options": ["① 罰採", "② 抜採", "③ 伐採", "④ 筏採"], "points": 4},
            {"id": 10, "section": "【2】", "question": "5. 監視中、プールで【 おぼれて 】いる子どもを見つけ、直ちに救助に向かった。", "targetWord": "おぼれて", "answer": "①", "correctText": "溺れて", "options": ["① 溺れて", "② 弱れて", "③ 泳れて", "④ 騒れて"], "points": 4},
            # 【3】 Hiragana Fill-in (5 pts each)
            {"id": 11, "section": "【3】", "question": "1. 検査の結果、脳に【 腫瘍 】があることがわかり、入院して手術することになった。", "targetWord": "腫瘍", "correctText": "しゅよう", "answer": "しゅよう", "points": 5},
            {"id": 12, "section": "【3】", "question": "2. 【 羅針盤 】に記されている方角に進むと、目的地である大陸が見えてきた。", "targetWord": "羅針盤", "correctText": "らしんばん", "answer": "らしんばん", "points": 5},
            {"id": 13, "section": "【3】", "question": "3. 日本の将来を【 危惧 】する若者が増えていて、非常に頼もしい。", "targetWord": "危惧", "correctText": "きぐ", "answer": "きぐ", "points": 5},
            {"id": 14, "section": "【3】", "question": "4. 父は日ごろのストレスを発散するため、休みの度に競馬や【 競艇 】に行っている。", "targetWord": "競艇", "correctText": "きょうてい", "answer": "きょうてい", "points": 5},
            {"id": 15, "section": "【3】", "question": "5. あの山の【 麓 】には、合掌造りの宿が軒を連ねており、情緒豊かな景色が広がっている。", "targetWord": "麓", "correctText": "ふもと", "answer": "ふもと", "points": 5},
            {"id": 16, "section": "【3】", "question": "6. 彼女は幼少時の家庭不和の影響により、今なお家族の愛情に【 飢えて 】いる。", "targetWord": "飢えて", "correctText": "うえて", "answer": "うえて", "points": 5},
            {"id": 17, "section": "【3】", "question": "7. 政界と財界の【 癒着 】を根絶して、クリーンな政治活動を目指したい。", "targetWord": "癒着", "correctText": "ゆちゃく", "answer": "ゆちゃく", "points": 5},
            {"id": 18, "section": "【3】", "question": "8. タンカーの【 座礁 】による石油の流出で、海洋生物がダメージを受けている。", "targetWord": "座礁", "correctText": "ざしょう", "answer": "ざしょう", "points": 5},
            {"id": 19, "section": "【3】", "question": "9. 日本語には【 曖昧 】な表現が多いので、外国人が誤解してしまうことがある。", "targetWord": "曖昧", "correctText": "あいまいな", "answer": "あいまいな", "points": 5},
            {"id": 20, "section": "【3】", "question": "10. 患者に対し【 傲慢 】な態度の医者に腹が立ち、病院を変えることにした。", "targetWord": "傲慢", "correctText": "ごうまんな", "answer": "ごうまんな", "points": 5},
            {"id": 21, "section": "【3】", "question": "11. 【 寡占 】企業は共謀して、製品の価格を引き下げるなどの協定を結ぶこともあるらしい。", "targetWord": "寡占", "correctText": "かせん", "answer": "かせん", "points": 5},
            {"id": 22, "section": "【3】", "question": "12. 次の対戦相手は去年の優勝チームだが、それに【 臆する 】ことなく精一杯戦ってほしい。", "targetWord": "臆する", "correctText": "おくする", "answer": "おくする", "points": 5}
        ]
    }
}


# 3. AUTHENTIC STAGE 33: 熟達編 まとめテスト (p.210-211) & TỐT NGHIỆP KANJI MASTER N1
stage_33_test = {
    "stage": 33,
    "title": "👑 熟達編 まとめテスト & 難読編 総括 — Tốt Nghiệp Kanji Master N1 (p.210-211)",
    "description": "Kỳ thi tốt nghiệp đỉnh cao Kanji Master N1 (熟達編 まとめテスト p.210-211): Tổng hợp toàn bộ 943 chữ Hán qua 30 chương học, từ vựng học thuật, thành ngữ Yojijukugo và chữ khó đọc Jukujikun. Đạt ≥ 85% để nhận chứng nhận Master of Kanji.",
    "pass_percentage": 85,
    "display_order": 33,
    "test_data": {
        "title": "熟達編 まとめテスト (p.210-211)",
        "totalPoints": 100,
        "questions": [
            # 【1】 Reading (4 pts each)
            {"id": 1, "section": "【1】", "question": "1. アメリカ合衆国に【 国賓 】として招かれた日本の首相が、大統領と会談した。", "targetWord": "国賓", "answer": "②", "correctText": "こくひん", "options": ["① ごくひん", "② こくひん", "③ こくびん", "④ くにひん"], "points": 4},
            {"id": 2, "section": "【1】", "question": "2. 【 焼酎 】を飲みながら鍋をつつくひとときに、幸せを感じる。", "targetWord": "焼酎", "answer": "①", "correctText": "しょうちゅう", "options": ["① しょうちゅう", "② しょちゅう", "③ しょんちゅう", "④ しょっちゅう"], "points": 4},
            {"id": 3, "section": "【1】", "question": "3. ある大物政治家は、建設業者と都内【 某所 】で密談しているといううわさだ。", "targetWord": "某所", "answer": "②", "correctText": "ぼうしょ", "options": ["① ほうしょ", "② ぼうしょ", "③ ぼうちょ", "④ ほうしょう"], "points": 4},
            {"id": 4, "section": "【1】", "question": "4. 私が当選した【 暁 】には、市民の皆様のお役に立てるよう力を尽くす所存です。", "targetWord": "暁", "answer": "④", "correctText": "あかつき", "options": ["① あけつき", "② あかとき", "③ あかつけ", "④ あかつき"], "points": 4},
            {"id": 5, "section": "【1】", "question": "5. 我が校は、東京都の代表としてこの大会に【 臨み 】、見事優勝した。", "targetWord": "臨み", "answer": "③", "correctText": "のぞみ", "options": ["① のそみ", "② かんがみ", "③ のぞみ", "④ いどみ"], "points": 4},
            # 【2】 Writing (4 pts each)
            {"id": 6, "section": "【2】", "question": "1. 社長の急逝により、副社長が【 ざんていてき 】に社長に就任した。", "targetWord": "ざんていてき", "answer": "③", "correctText": "暫定的に", "options": ["① 残定的に", "② 斬定的に", "③ 暫定的に", "④ 限定的に"], "points": 4},
            {"id": 7, "section": "【2】", "question": "2. このビルは【 ろうきゅうか 】を理由に、年内で取り壊されることが決まった。", "targetWord": "ろうきゅうか", "answer": "①", "correctText": "老朽化", "options": ["① 老朽化", "② 老巧化", "③ 老汚化", "④ 老弓化"], "points": 4},
            {"id": 8, "section": "【2】", "question": "3. 【 いかん 】なく実力が発揮できるよう、がんばってください。", "targetWord": "いかん", "answer": "①", "correctText": "遺憾", "options": ["① 遺憾", "② 遺感", "③ 違憾", "④ 潰感"], "points": 4},
            {"id": 9, "section": "【2】", "question": "4. 電子【 けんびきょう 】の発達により新種のウイルスが発見された。", "targetWord": "けんびきょう", "answer": "②", "correctText": "顕微鏡", "options": ["① 験微鏡", "② 顕微鏡", "③ 検微鏡", "④ 顕徴鏡"], "points": 4},
            {"id": 10, "section": "【2】", "question": "5. 彼のスピーチは長いばかりで、話の【 ようし 】がわからない。", "targetWord": "ようし", "answer": "④", "correctText": "要旨", "options": ["① 容紙", "② 要誌", "③ 容旨", "④ 要旨"], "points": 4},
            # 【3】 Hiragana Fill-in (5 pts each)
            {"id": 11, "section": "【3】", "question": "1. この着物は絹に見えるが、本当は合成【 繊維 】でできている。", "targetWord": "繊維", "correctText": "せんい", "answer": "せんい", "points": 5},
            {"id": 12, "section": "【3】", "question": "2. 私の妹はお気に入りのアイドルのポスターを部屋の壁に【 貼って 】いる。", "targetWord": "貼って", "correctText": "はって", "answer": "はって", "points": 5},
            {"id": 13, "section": "【3】", "question": "3. 仕事が忙しく食生活も乱れていたためか、【 胃潰瘍 】になってしまった。", "targetWord": "胃潰瘍", "correctText": "いかいよう", "answer": "いかいよう", "points": 5},
            {"id": 14, "section": "【3】", "question": "4. 単身【 赴任 】中の父は、家族団らんの時間をもとうと1週間に一度家に帰ってくる。", "targetWord": "赴任", "correctText": "ふにん", "answer": "ふにん", "points": 5},
            {"id": 15, "section": "【3】", "question": "5. 幼児【 虐待 】が問題視されているが、未だ解決につながる対策は出されていない。", "targetWord": "虐待", "correctText": "ぎゃくたい", "answer": "ぎゃくたい", "points": 5},
            {"id": 16, "section": "【3】", "question": "6. この子は、誰にでも元気な声で【 挨拶 】する。感心な子供だ。", "targetWord": "挨拶", "correctText": "あいさつ", "answer": "あいさつ", "points": 5},
            {"id": 17, "section": "【3】", "question": "7. 恋人が見知らぬ女性と食事をしているところを目撃した彼女は、激しく【 嫉妬 】した。", "targetWord": "嫉妬", "correctText": "しっと", "answer": "しっと", "points": 5},
            {"id": 18, "section": "【3】", "question": "8. ガスを使う時は、必ず【 換気扇 】を回してください。", "targetWord": "換気扇", "correctText": "かんきせん", "answer": "かんきせん", "points": 5},
            {"id": 19, "section": "【3】", "question": "9. お風呂で寛ぐために、ひのきの【 浴槽 】にリフォームしよう。", "targetWord": "浴槽", "correctText": "よくそう", "answer": "よくそう", "points": 5},
            {"id": 20, "section": "【3】", "question": "10. 頭痛が続いたので病院へ行ったら数種類の【 錠剤 】を処方された。", "targetWord": "錠剤", "correctText": "じょうざい", "answer": "じょうざい", "points": 5},
            {"id": 21, "section": "【3】", "question": "11. 私が行ったプレゼンテーションに対し、異論も出たが、部長は【 擁護 】してくれた。", "targetWord": "擁護", "correctText": "ようご", "answer": "ようご", "points": 5},
            {"id": 22, "section": "【3】", "question": "12. 夏は【 湖畔 】にある別荘で1ヵ月ほど過ごす予定だ。", "targetWord": "湖畔", "correctText": "こはん", "answer": "こはん", "points": 5}
        ]
    }
}

# Update achievement tests
existing_tests = [t for t in seed["achievement_tests"] if t["stage"] not in [32, 33]]
existing_tests.append(stage_32_test)
existing_tests.append(stage_33_test)
seed["achievement_tests"] = sorted(existing_tests, key=lambda x: x["stage"])

# Save seed json
with open(SEED_PATH, 'w', encoding='utf-8') as f:
    json.dump(seed, f, ensure_ascii=False, indent=2)

print(f"Successfully updated {SEED_PATH}:")
print(f"  Total minigames: {len(seed['minigames'])}")
print(f"  Total achievement tests: {len(seed['achievement_tests'])}")
print(f"  Stage 32 questions: {len(stage_32_test['test_data']['questions'])}")
print(f"  Stage 33 questions: {len(stage_33_test['test_data']['questions'])}")

