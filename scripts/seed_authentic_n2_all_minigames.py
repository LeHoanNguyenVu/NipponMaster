#!/usr/bin/env python3
"""
Seed Authentic Kanji Master N2 Minigames for ALL 18 Chapters
Strictly adhering to the textbook page structure:
- Front page (Page A) -> Chapter A (odd chapter)
- Back page (Page B) -> Chapter B (even chapter)
- Every exercise on that page is converted into a full authentic interactive minigame.
Total: 40 authentic minigames across 18 chapters.
"""

import os
import sys
import json
import psycopg2

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(PROJECT_ROOT, '.env')

def load_env():
    env_vars = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env_vars[k.strip()] = v.strip()
    return env_vars

env = load_env()
DB_HOST = "52.65.247.42"
DB_PORT = 6543
DB_NAME = "postgres"
DB_USER = "postgres.bxqwarbeocbsfjieqbsq"
DB_PASS = env.get('DB_PASSWORD', 'hnvuwww1234A')
PUBLIC_CDN_BASE = "https://bxqwarbeocbsfjieqbsq.supabase.co/storage/v1/object/public/kanji-assets"

def get_chapter_map(cur):
    cur.execute("SELECT chapter_number, id FROM kanji_chapters WHERE jlpt_level = 'N2' ORDER BY chapter_number;")
    return {r[0]: r[1] for r in cur.fetchall()}

def main():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        sslmode="require",
        connect_timeout=15
    )
    conn.autocommit = True
    cur = conn.cursor()

    chap_map = get_chapter_map(cur)
    print(f"Found {len(chap_map)} N2 chapters in DB.")

    cur.execute("""
        DELETE FROM kanji_minigames 
        WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N2');
    """)
    print("Deleted all previous N2 minigames.")

    minigames = []

    # ==========================================
    # PAIR 1: Ch 1 & 2 (p.24 & p.25)
    # ==========================================
    img_1 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_1_2_p1.webp"
    img_2 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_1_2_p2.webp"

    # Ch 1 - Game 1: 熟語消去パズル
    ch1_g1_data = {
        "grid": [
            ["駐", "指", "輪", "優", "発", "心"],
            ["車", "漁", "港", "越", "展", "配"],
            ["禁", "掃", "並", "感", "途", "乗"],
            ["止", "除", "列", "庭", "上", "車"],
            ["流", "著", "名", "人", "国", "券"],
            ["域", "週", "刊", "誌", "汚", "染"]
        ],
        "answer": "庭",
        "targetWord": "庭",
        "hiragana": "にわ",
        "hanViet": "Đình",
        "meaning": "Sân vườn",
        "suggestedChoices": ["庭", "指", "港", "越", "染", "著"],
        "explanation": "Toàn bộ 35 chữ Hán trong ô lưới đều ghép thành 15 từ vựng quen thuộc (駐車禁止, 指輪, 漁港, 掃除, 並列, 著名, 人名, 週刊誌, 汚染, 流域, 心配, 乗車券, 発展, 途上国, 優越感). Chữ Hán duy nhất còn lại không ghép với chữ nào là chữ「庭」(にわ - Sân vườn).",
        "wordsFound": [
            {"word": "駐車禁止", "hiragana": "ちゅうしゃきんし", "meaning": "Cấm đỗ xe"},
            {"word": "指輪", "hiragana": "ゆびわ", "meaning": "Nhẫn đeo tay"},
            {"word": "漁港", "hiragana": "ぎょこう", "meaning": "Cảng cá"},
            {"word": "掃除", "hiragana": "そうじ", "meaning": "Quét dọn vệ sinh"},
            {"word": "並列", "hiragana": "へいれつ", "meaning": "Song song, dàn hàng"},
            {"word": "著名", "hiragana": "ちょめい", "meaning": "Nổi tiếng, trứ danh"},
            {"word": "人名", "hiragana": "じんめい", "meaning": "Tên người"},
            {"word": "週刊誌", "hiragana": "しゅうかんし", "meaning": "Tạp chí tuần san"},
            {"word": "汚染", "hiragana": "おせん", "meaning": "Ô nhiễm môi trường"},
            {"word": "流域", "hiragana": "りゅういき", "meaning": "Lưu vực sông ngòi"},
            {"word": "心配", "hiragana": "しんぱい", "meaning": "Lo lắng, bận tâm"},
            {"word": "乗車券", "hiragana": "じょうしゃけん", "meaning": "Vé đi xe/tàu"},
            {"word": "発展", "hiragana": "はってん", "meaning": "Phát triển"},
            {"word": "途上国", "hiragana": "とじょうこく", "meaning": "Nước đang phát triển"},
            {"word": "優越感", "hiragana": "ゆうえつかん", "meaning": "Cảm giác ưu việt"}
        ]
    }
    minigames.append((chap_map[1], "KANJI_ELIMINATION", "Minigame 1: 【1】 熟語消去パズル — Ô lưới 6×6 tìm từ ghép & giải mã chữ Hán bí mật", "Quan sát tranh bài tập gốc p.24. Tìm và gạch bỏ các từ ghép đã học (2~4 chữ). Chữ Hán cuối cùng còn lại duy nhất trong bảng 6×6 là gì?", img_1, json.dumps(ch1_g1_data, ensure_ascii=False), 1))

    # Ch 1 - Game 2: 文脈穴埋め
    ch1_g2_data = {
        "wordBank": ["替", "戻", "込", "帳", "越", "居", "含", "照", "振", "預"],
        "questions": [
            {"id": 1, "sentence": "家族の反対を押し切って結婚したのだから、もう後 [blank] りはできない。", "answer": "戻", "targetWord": "後戻り", "hiragana": "あともどり", "blankReading": "もど", "meaning": "Quay đầu lại, thoái lui", "explanation": "Chữ 戻 (LỆ) trong 後戻り (quay lại đường cũ)."},
            {"id": 2, "sentence": "このパソコンは税 [blank] みで十万円だ。", "answer": "込", "targetWord": "税込み", "hiragana": "ぜいこみ", "blankReading": "こ", "meaning": "Đã bao gồm thuế", "explanation": "Chữ 込 (NHẬP) trong 税込み (đã tính thuế)."},
            {"id": 3, "sentence": "普通 [blank] 金の口座を開く。", "answer": "預", "targetWord": "普通預金", "hiragana": "ふつうよきん", "blankReading": "よ", "meaning": "Tiền gửi thông thường", "explanation": "Chữ 預 (DỰ) trong 預金 (tiền gửi tiết kiệm)."},
            {"id": 4, "sentence": "レポートを書くのに、この本を参 [blank] してください。", "answer": "照", "targetWord": "参照", "hiragana": "さんしょう", "blankReading": "しょう", "meaning": "Tham khảo, đối chiếu", "explanation": "Chữ 照 (CHIẾU) trong 参照 (tham khảo)."},
            {"id": 5, "sentence": "手 [blank] に今週の予定を書く。", "answer": "帳", "targetWord": "手帳", "hiragana": "てちょう", "blankReading": "ちょう", "meaning": "Sổ tay cá nhân", "explanation": "Chữ 帳 (TRƯỚNG) trong 手帳 (sổ tay)."},
            {"id": 6, "sentence": "経営不 [blank] でその会社は業績が悪化している。", "answer": "振", "targetWord": "不振", "hiragana": "ふしん", "blankReading": "しん", "meaning": "Trì trệ, không khởi sắc", "explanation": "Chữ 振 (CHẤN) trong 不振 (bết bát, trì trệ)."},
            {"id": 7, "sentence": "経営不振のため、その会社は社長が交 [blank] した。", "answer": "替", "targetWord": "交替", "hiragana": "こうたい", "blankReading": "たい", "meaning": "Thay thế, đổi nhân sự", "explanation": "Chữ 替 (THẾ) trong 交替 (thay đổi người)."},
            {"id": 8, "sentence": "二位の選手が一の選手を追い [blank] した。", "answer": "越", "targetWord": "追い越し", "hiragana": "おいこし", "blankReading": "こ", "meaning": "Chạy vượt qua", "explanation": "Chữ 越 (VIỆT) trong 追い越す (vượt mặt)."},
            {"id": 9, "sentence": "仕事のあとで飲む [blank] 酒屋のビールは最高だ。", "answer": "居", "targetWord": "居酒屋", "hiragana": "いざかや", "blankReading": "い", "meaning": "Quán nhậu Izakaya", "explanation": "Chữ 居 (CƯ) trong 居酒屋 (quán rượu)."}
        ]
    }
    minigames.append((chap_map[1], "SENTENCE_CLOZE", "Minigame 2: 【2】 Hoàn thành câu văn đời sống N2 & Kiểm tra cách đọc Hiragana (文脈穴埋め)", "Quan sát tranh bài tập gốc p.24. Chọn chữ Hán thích hợp từ ngân hàng 10 từ điền vào ô trống trong các câu văn ngữ cảnh:", img_1, json.dumps(ch1_g2_data, ensure_ascii=False), 2))

    # Ch 2 - Game 1: 【3】 同音異字
    ch2_g1_data = {
        "groups": [
            {
                "kana": "コウ",
                "questions": [
                    {"id": "1_1", "sentence": "① 時間どおり空 [blank] に着陸した。", "answer": "港", "targetWord": "空港", "hiragana": "くうこう", "meaning": "Sân bay"},
                    {"id": "1_2", "sentence": "② 台風で飛行機が欠 [blank] になった。", "answer": "航", "targetWord": "欠航", "hiragana": "けっこう", "meaning": "Hủy chuyến bay"}
                ]
            },
            {
                "kana": "カン",
                "questions": [
                    {"id": "2_1", "sentence": "① 夕 [blank] を駅の売店で買った。", "answer": "刊", "targetWord": "夕刊", "hiragana": "ゆうかん", "meaning": "Báo chiều"},
                    {"id": "2_2", "sentence": "② このマンガは全 [blank] で30冊もある。", "answer": "巻", "targetWord": "全巻", "hiragana": "ぜんかん", "meaning": "Trọn bộ 30 tập"},
                    {"id": "2_3", "sentence": "③ ひらがなを漢字に変 [blank] する。", "answer": "換", "targetWord": "変換", "hiragana": "へんかん", "meaning": "Chuyển đổi ký tự"}
                ]
            },
            {
                "kana": "ユウ",
                "questions": [
                    {"id": "3_1", "sentence": "① [blank] 便局で切手を買った。", "answer": "郵", "targetWord": "郵便局", "hiragana": "ゆうびんきょく", "meaning": "Bưu điện"},
                    {"id": "3_2", "sentence": "② 店を開店するため、銀行から [blank] 資を受けた。", "answer": "融", "targetWord": "融資", "hiragana": "ゆうし", "meaning": "Vốn vay ngân hàng"}
                ]
            },
            {
                "kana": "セイ",
                "questions": [
                    {"id": "4_1", "sentence": "① その会社のパーティーは有名人も多く、[blank] 大だった。", "answer": "盛", "targetWord": "盛大", "hiragana": "せいだい", "meaning": "Hoành tráng, quy mô lớn"},
                    {"id": "4_2", "sentence": "② 作文の [blank] 書をする。", "answer": "清", "targetWord": "清書", "hiragana": "せいしょ", "meaning": "Bản chép sạch đẹp"},
                    {"id": "4_3", "sentence": "③ この絵は本物に見えるが実は複 [blank] だ。", "answer": "製", "targetWord": "複製", "hiragana": "ふくせい", "meaning": "Bản sao chép, phục chế"},
                    {"id": "4_4", "sentence": "④ もう少し机の上を [blank] 理してください。", "answer": "整", "targetWord": "整理", "hiragana": "せいり", "meaning": "Thu dọn ngăn nắp"}
                ]
            },
            {
                "kana": "ト",
                "questions": [
                    {"id": "5_1", "sentence": "① [blank] 航の手続きのため、大使館へ行った。", "answer": "渡", "targetWord": "渡航", "hiragana": "とこう", "meaning": "Xuất cảnh ra nước ngoài"},
                    {"id": "5_2", "sentence": "② 学校へ行く [blank] 中で昔の恋人に会った。", "answer": "途", "targetWord": "途中", "hiragana": "とちゅう", "meaning": "Trên đường đi"}
                ]
            },
            {
                "kana": "ショウ",
                "questions": [
                    {"id": "6_1", "sentence": "① 議会を [blank] 集するため、関係者にメールを出した。", "answer": "招", "targetWord": "招集", "hiragana": "しょうしゅう", "meaning": "Triệu tập cuộc họp"},
                    {"id": "6_2", "sentence": "② 家を借りるために保 [blank] 人にサインしてもらった。", "answer": "証", "targetWord": "保証人", "hiragana": "ほしょうにん", "meaning": "Người bảo lãnh"}
                ]
            },
            {
                "kana": "カ",
                "questions": [
                    {"id": "7_1", "sentence": "① 地震の後に [blank] 設住宅が建てられた。", "answer": "仮", "targetWord": "仮設", "hiragana": "かせつ", "meaning": "Nhà tạm thời"},
                    {"id": "7_2", "sentence": "② 電車が駅を通 [blank] した。", "answer": "過", "targetWord": "通過", "hiragana": "つうか", "meaning": "Chạy qua nhà ga"}
                ]
            }
        ],
        "wordBank": ["港", "航", "刊", "巻", "換", "郵", "融", "盛", "清", "製", "整", "渡", "途", "招", "証", "仮", "過"]
    }
    minigames.append((chap_map[2], "KATAKANA_HOMOPHONE", "Minigame 1: 【3】 Phân biệt chữ Hán đồng âm Katakana (同音異字)", "Quan sát trang bài tập gốc p.25. Điền chữ Hán tương ứng với cách đọc Katakana ở đầu mỗi nhóm vào ô trống:", img_2, json.dumps(ch2_g1_data, ensure_ascii=False), 1))

    # Ch 2 - Game 2: 【4】 誤字訂正
    ch2_g2_data = {
        "questions": [
            {"id": 1, "sentence": "休みの日は帰除をします。", "wrongKanji": "帰", "correctKanji": "掃", "targetWord": "掃除", "hiragana": "そうじ", "meaning": "Dọn dẹp vệ sinh", "explanation": "Chữ sai là 帰 trong「帰除」, sửa thành chữ 掃 (TẢO) ->「掃除」(そうじ)."},
            {"id": 2, "sentence": "アイスクリームが容けないうちに早く召し上がってください。", "wrongKanji": "容", "correctKanji": "溶", "targetWord": "溶けない", "hiragana": "とけない", "meaning": "Tan chảy", "explanation": "Chữ sai là 容 trong「容けない」, sửa thành chữ 溶 (DUNG) ->「溶けない」(とけない)."},
            {"id": 3, "sentence": "朝の電車はいつも昆雑している。", "wrongKanji": "昆", "correctKanji": "混", "targetWord": "混雑", "hiragana": "こんざつ", "meaning": "Đông đúc, hỗn tạp", "explanation": "Chữ sai là 昆 trong「昆雑」, sửa thành chữ 混 (HỖN) ->「混雑」(こんざつ)."},
            {"id": 4, "sentence": "毎月ファッション雑志を三冊買う。", "wrongKanji": "志", "correctKanji": "誌", "targetWord": "雑誌", "hiragana": "ざっし", "meaning": "Tạp chí thời trang", "explanation": "Chữ sai là 志 trong「雑志」, sửa thành chữ 誌 (CHÍ) ->「雑誌」(ざっし)."},
            {"id": 5, "sentence": "運動会の最後に輸になって踊った。", "wrongKanji": "輸", "correctKanji": "輪", "targetWord": "輪", "hiragana": "わ", "meaning": "Vòng tròn", "explanation": "Chữ sai là 輸 trong「輸」, sửa thành chữ 輪 (LUÂN) ->「輪になって踊った」."},
            {"id": 6, "sentence": "目票を決めて勉強する。", "wrongKanji": "票", "correctKanji": "標", "targetWord": "目標", "hiragana": "もくひょう", "meaning": "Mục tiêu phấn đấu", "explanation": "Chữ sai là 票 trong「目票」, sửa thành chữ 標 (TIÊU) ->「目標」(もくひょう)."},
            {"id": 7, "sentence": "わたしの父は魚師だ。", "wrongKanji": "魚", "correctKanji": "漁", "targetWord": "漁師", "hiragana": "りょうし", "meaning": "Ngư dân đánh cá", "explanation": "Chữ sai là 魚 trong「魚師」, sửa thành chữ 漁 (NGƯ) ->「漁師」(りょうし)."}
        ],
        "wordBank": ["掃", "溶", "混", "誌", "輪", "標", "漁"]
    }
    minigames.append((chap_map[2], "KANJI_CORRECTION", "Minigame 2: 【4】 Sửa lỗi sai chính tả chữ Hán (誤字訂正)", "Quan sát trang bài tập gốc p.25. Phát hiện chữ Hán in sai chính tả trong từng câu và điền chữ Hán viết đúng:", img_2, json.dumps(ch2_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 2: Ch 3 & 4 (p.40 & p.41)
    # ==========================================
    img_3 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_3_4_p1.webp"
    img_4 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_3_4_p2.webp"

    # Ch 3 - Game 1: 【1】 体に関係する漢字
    ch3_g1_data = {
        "wordBank": ["腕", "腹", "腰", "骨", "脳"],
        "questions": [
            {"id": 1, "sentence": "毎晩夕食を作っているので、料理の [blank] が上がった。", "answer": "腕", "targetWord": "腕が上がる", "hiragana": "うでがあがる", "meaning": "Tay nghề nấu nướng tiến bộ", "explanation": "Chữ 腕 (OẢN - cánh tay) trong quán dụng ngữ 腕が上がる (nâng cao tay nghề)."},
            {"id": 2, "sentence": "彼は短気なのですぐ [blank] を立てる。", "answer": "腹", "targetWord": "腹を立てる", "hiragana": "はらをたてる", "meaning": "Nổi cáu, tức giận", "explanation": "Chữ 腹 (PHÚC - bụng) trong quán dụng ngữ 腹を立てる (nổi giận)."},
            {"id": 3, "sentence": "岸さんは [blank] が低く、感じがいいので、営業マンにはぴったりだ。", "answer": "腰", "targetWord": "腰が低い", "hiragana": "こしがひくい", "meaning": "Khiêm nhường, lễ độ", "explanation": "Chữ 腰 (YÊU - eo/lưng) trong 腰が低い (khiêm tốn)."},
            {"id": 4, "sentence": "サッカーの試合で、足の [blank] を折ってしまった。", "answer": "骨", "targetWord": "骨を折る", "hiragana": "ほねをおる", "meaning": "Gãy xương chân", "explanation": "Chữ 骨 (CỐT - xương) trong 骨を折る (gãy xương)."},
            {"id": 5, "sentence": "人間の手足は [blank] の命令によって動く。", "answer": "脳", "targetWord": "脳", "hiragana": "のう", "meaning": "Bộ não trung ương", "explanation": "Chữ 脳 (NÃO - bộ não) chỉ huy cơ thể."}
        ]
    }
    minigames.append((chap_map[3], "SENTENCE_CLOZE", "Minigame 1: 【1】 Quán dụng ngữ bộ phận cơ thể con người (体に関係する漢字)", "Quan sát trang bài tập gốc p.40. Điền chữ Hán liên quan đến bộ phận cơ thể vào ô trống trong các câu quán dụng ngữ:", img_3, json.dumps(ch3_g1_data, ensure_ascii=False), 1))

    # Ch 3 - Game 2: 【2】 体の部分の名前
    ch3_g2_data = {
        "wordBank": ["頭", "首", "肩", "胸", "胃", "腹", "背", "腰", "筋", "節"],
        "questions": [
            {"id": 1, "sentence": "① Vùng đầu: [blank]", "answer": "頭", "targetWord": "頭", "hiragana": "あたま", "meaning": "Phần đầu"},
            {"id": 2, "sentence": "② Cổ họng: [blank]", "answer": "首", "targetWord": "首", "hiragana": "くび", "meaning": "Cổ"},
            {"id": 3, "sentence": "③ Bờ vai: [blank]", "answer": "肩", "targetWord": "肩", "hiragana": "かた", "meaning": "Bờ vai"},
            {"id": 4, "sentence": "④ Vùng ngực: [blank]", "answer": "胸", "targetWord": "胸", "hiragana": "むね", "meaning": "Vùng ngực"},
            {"id": 5, "sentence": "⑤ Dạ dày: [blank]", "answer": "胃", "targetWord": "胃", "hiragana": "い", "meaning": "Dạ dày / Bao tử"},
            {"id": 6, "sentence": "⑥ Vùng bụng: [blank]", "answer": "腹", "targetWord": "腹", "hiragana": "はら", "meaning": "Vùng bụng"},
            {"id": 7, "sentence": "⑦ Phần lưng: [blank]", "answer": "背", "targetWord": "背", "hiragana": "せ", "meaning": "Phần lưng"},
            {"id": 8, "sentence": "⑧ Vùng eo hông: [blank]", "answer": "腰", "targetWord": "腰", "hiragana": "こし", "meaning": "Vùng thắt lưng"},
            {"id": 9, "sentence": "⑨ Cơ bắp: [blank] 肉", "answer": "筋", "targetWord": "筋肉", "hiragana": "きんにく", "meaning": "Cơ bắp"},
            {"id": 10, "sentence": "⑩ Khớp xương: 関 [blank]", "answer": "節", "targetWord": "関節", "hiragana": "かんせつ", "meaning": "Khớp xương đầu gối"}
        ]
    }
    minigames.append((chap_map[3], "SENTENCE_CLOZE", "Minigame 2: 【2】 Sơ đồ giải phẫu cơ thể người (体の部分の名前)", "Quan sát hình minh họa giải phẫu trên p.40. Điền tên Hán tự tương ứng với 10 vị trí chỉ định trên cơ thể:", img_3, json.dumps(ch3_g2_data, ensure_ascii=False), 2))

    # Ch 3 - Game 3: 【3】 反対の意味の言葉
    ch3_g3_data = {
        "wordBank": ["薄", "甘", "異", "美", "脱"],
        "questions": [
            {"id": 1, "sentence": "1. 濃い (đậm đặc) ⇔ [blank] い", "answer": "薄", "targetWord": "薄い", "hiragana": "うすい", "meaning": "Nhạt, loãng"},
            {"id": 2, "sentence": "2. 辛い (cay nồng) ⇔ [blank] い", "answer": "甘", "targetWord": "甘い", "hiragana": "あまい", "meaning": "Ngọt ngào"},
            {"id": 3, "sentence": "3. 同じ (giống nhau) ⇔ [blank] なる", "answer": "異", "targetWord": "異なる", "hiragana": "ことなる", "meaning": "Khác biệt"},
            {"id": 4, "sentence": "4. 汚い (bẩn thỉu) ⇔ [blank] しい", "answer": "美", "targetWord": "美しい", "hiragana": "うつくしい", "meaning": "Xinh đẹp, thanh khiết"},
            {"id": 5, "sentence": "5. 服を着る (mặc áo) ⇔ 服を [blank] ぐ", "answer": "脱", "targetWord": "脱ぐ", "hiragana": "ぬぐ", "meaning": "Cởi áo ra"}
        ]
    }
    minigames.append((chap_map[3], "SENTENCE_CLOZE", "Minigame 3: 【3】 Chữ Hán đối nghĩa / phản nghĩa (反対の意味の言葉)", "Quan sát phần cuối p.40. Điền chữ Hán mang ý nghĩa trái ngược với từ cho sẵn:", img_3, json.dumps(ch3_g3_data, ensure_ascii=False), 3))

    # Ch 4 - Game 1: 【4】 読み方の漢字
    ch4_g1_data = {
        "groups": [
            {
                "kana": "カン",
                "questions": [
                    {"id": "1_1", "sentence": "① 病気が [blank] 治するまで、3カ月かかるそうだ。", "answer": "完", "targetWord": "完治", "hiragana": "かんち", "meaning": "Khỏi bệnh hoàn toàn"},
                    {"id": "1_2", "sentence": "② このジュースには [blank] 味料が入っている。", "answer": "甘", "targetWord": "甘味料", "hiragana": "かんみりょう", "meaning": "Chất tạo ngọt"}
                ]
            },
            {
                "kana": "ショウ",
                "questions": [
                    {"id": "2_1", "sentence": "① 彼は [blank] 害事件を起こしてしまった。", "answer": "傷", "targetWord": "傷害", "hiragana": "しょうがい", "meaning": "Gây thương tích"},
                    {"id": "2_2", "sentence": "② 子供のかぜの [blank] 状が、思っていたよりも軽かったので安心した。", "answer": "症", "targetWord": "症状", "hiragana": "しょうじょう", "meaning": "Triệu chứng bệnh"}
                ]
            },
            {
                "kana": "シン",
                "questions": [
                    {"id": "3_1", "sentence": "① 近所の病院は、火曜日が休 [blank] 日だ。", "answer": "診", "targetWord": "休診日", "hiragana": "きゅうしんび", "meaning": "Ngày phòng khám nghỉ"},
                    {"id": "3_2", "sentence": "② 時計の長 [blank] が12を指している。", "answer": "針", "targetWord": "長針", "hiragana": "ちょうしん", "meaning": "Kim dài đồng hồ"}
                ]
            }
        ],
        "wordBank": ["完", "甘", "傷", "症", "診", "針"]
    }
    minigames.append((chap_map[4], "KATAKANA_HOMOPHONE", "Minigame 1: 【4】 Phân biệt chữ Hán y tế theo âm đọc Katakana (読み方の漢字)", "Quan sát nửa trên p.41. Điền chữ Hán có cách đọc Katakana (カン, ショウ, シン) vào ô vuông:", img_4, json.dumps(ch4_g1_data, ensure_ascii=False), 1))

    # Ch 4 - Game 2: 【5】 チケットの読み方
    ch4_g2_data = {
        "wordBank": ["てん", "ぶし", "どうどう", "えどじょう", "かほう", "かぶき", "さかえた", "しゅうきょう", "ちえ", "くら", "げきじょう"],
        "questions": [
            {"id": 1, "sentence": "① 江戸歴史 [blank] (Triển lãm):", "answer": "てん", "targetWord": "展", "hiragana": "てん", "meaning": "Triển lãm (江戸歴史展)"},
            {"id": 2, "sentence": "② [blank] の生活 (Võ sĩ Samurai):", "answer": "ぶし", "targetWord": "武士", "hiragana": "ぶし", "meaning": "Võ sĩ Samurai"},
            {"id": 3, "sentence": "③ [blank] たる江戸城 (Uy nghi, tráng lệ):", "answer": "どうどう", "targetWord": "堂々", "hiragana": "どうどう", "meaning": "Đường hoàng, uy nghi"},
            {"id": 4, "sentence": "④ 堂々たる [blank] (Thành Edo):", "answer": "えどじょう", "targetWord": "江戸城", "hiragana": "えどじょう", "meaning": "Lâu đài Edo"},
            {"id": 5, "sentence": "⑤ 徳川家の [blank] (Gia bảo dòng họ Tokugawa):", "answer": "かほう", "targetWord": "家宝", "hiragana": "かほう", "meaning": "Gia bảo, báu vật gia truyền"},
            {"id": 6, "sentence": "⑥ [blank] が栄えたわけ (Kịch Kabuki):", "answer": "かぶき", "targetWord": "歌舞伎", "hiragana": "かぶき", "meaning": "Kịch nghệ Kabuki truyền thống"},
            {"id": 7, "sentence": "⑦ 歌舞伎が [blank] わけ (Phồn vinh, nở rộ):", "answer": "さかえた", "targetWord": "栄えた", "hiragana": "さかえた", "meaning": "Hưng thịnh, phát đạt"},
            {"id": 8, "sentence": "⑧ 人々の生活を支えた [blank] (Tôn giáo):", "answer": "しゅうきょう", "targetWord": "宗教", "hiragana": "しゅうきょう", "meaning": "Tôn giáo tín ngưỡng"},
            {"id": 9, "sentence": "⑨ 江戸時代の人々の [blank] (Trí tuệ dân gian):", "answer": "ちえ", "targetWord": "知恵", "hiragana": "ちえ", "meaning": "Trí tuệ thông thái"},
            {"id": 10, "sentence": "⑩ [blank] のひみつ (Kho tàng bí mật):", "answer": "くら", "targetWord": "蔵", "hiragana": "くら", "meaning": "Nhà kho, kho trữ đồ"},
            {"id": 11, "sentence": "⑪ 国立 [blank] ロビー (Nhà hát quốc gia):", "answer": "げきじょう", "targetWord": "劇場", "hiragana": "げきじょう", "meaning": "Nhà hát lớn"}
        ]
    }
    minigames.append((chap_map[4], "SENTENCE_CLOZE", "Minigame 2: 【5】 Đọc thông tin vé tham quan triển lãm lịch sử Edo (チケットの読み方)", "Quan sát vé tham quan「江戸歴史展」trên p.41. Gõ cách đọc Hiragana của 11 từ Hán tự được đánh số ①〜⑪:", img_4, json.dumps(ch4_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 3: Ch 5 & 6 (p.56 & p.57)
    # ==========================================
    img_5 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_5_6_p1.webp"
    img_6 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_5_6_p2.webp"

    # Ch 5 - Game 1: 【1】 反対の意味
    ch5_g1_data = {
        "wordBank": ["拡大", "解雇", "購入", "増加", "損"],
        "questions": [
            {"id": 1, "sentence": "1. 会社の規模を [blank] する ⇔ 縮小する", "answer": "拡大", "targetWord": "拡大", "hiragana": "かくだい", "meaning": "Khuếch đại, mở rộng quy mô"},
            {"id": 2, "sentence": "2. 新人を採用する ⇔ 成績不振の社員を [blank] する", "answer": "解雇", "targetWord": "解雇", "hiragana": "かいこ", "meaning": "Sa thải, cho thôi việc"},
            {"id": 3, "sentence": "3. 3Dテレビを販売する ⇔ [blank] した", "answer": "購入", "targetWord": "購入", "hiragana": "こうにゅう", "meaning": "Mua sắm thiết bị"},
            {"id": 4, "sentence": "4. 結婚しない人が [blank] している ⇔ 減少", "answer": "増加", "targetWord": "増加", "hiragana": "ぞうか", "meaning": "Tăng thêm, gia tăng"},
            {"id": 5, "sentence": "5. 株価が暴落して大 [blank] をしてしまった ⇔ 得をした", "answer": "損", "targetWord": "損", "hiragana": "そん", "meaning": "Tổn thất, thua lỗ"}
        ]
    }
    minigames.append((chap_map[5], "SENTENCE_CLOZE", "Minigame 1: 【1】 Từ phản nghĩa thương trường & công sở (反対の意味)", "Quan sát phần trên p.56. Điền từ Hán tự mang ý nghĩa trái ngược với từ gạch chân:", img_5, json.dumps(ch5_g1_data, ensure_ascii=False), 1))

    # Ch 5 - Game 2: 【2】 特別な読み方
    ch5_g2_data = {
        "wordBank": ["けしき", "なっとく", "さいふ", "けいば"],
        "questions": [
            {"id": 1, "sentence": "1. 北海道へ旅行に行き、きれいな景色（ [blank] ）を写真に撮った。", "answer": "けしき", "targetWord": "景色", "hiragana": "けしき", "meaning": "Phong cảnh thiên nhiên"},
            {"id": 2, "sentence": "2. 準備は大変だったが、自分で納得（ [blank] ）できる結果が出せた。", "answer": "なっとく", "targetWord": "納得", "hiragana": "なっとく", "meaning": "Tâm đắc, thấu hiểu"},
            {"id": 3, "sentence": "3. 財布（ [blank] ）がない。どうやら家に忘れてきてしまったらしい。", "answer": "さいふ", "targetWord": "財布", "hiragana": "さいふ", "meaning": "Ví đựng tiền"},
            {"id": 4, "sentence": "4. 馬を見るのが好きで、休日になると、競馬（ [blank] ）を見に行っている。", "answer": "けいば", "targetWord": "競馬", "hiragana": "けいば", "meaning": "Đua ngựa"}
        ]
    }
    minigames.append((chap_map[5], "SENTENCE_CLOZE", "Minigame 2: 【2】 Cách đọc đặc biệt của các từ vựng N2 quen thuộc (特別な読み方)", "Quan sát phần giữa p.56. Điền cách đọc Hiragana của các từ vựng gạch chân đặc biệt:", img_5, json.dumps(ch5_g2_data, ensure_ascii=False), 2))

    # Ch 5 - Game 3: 【3】 「不」がついてできる言葉
    ch5_g3_data = {
        "wordBank": ["不景気", "不採用", "不利益", "不適切", "不評", "不得意"],
        "questions": [
            {"id": 1, "sentence": "（ [blank] ）でリストラされる", "answer": "不景気", "targetWord": "不景気", "hiragana": "ふけいき", "meaning": "Kinh tế suy thoái"},
            {"id": 2, "sentence": "（ [blank] ）通知が届く", "answer": "不採用", "targetWord": "不採用", "hiragana": "ふさいよう", "meaning": "Thông báo không trúng tuyển"},
            {"id": 3, "sentence": "（ [blank] ）を被る", "answer": "不利益", "targetWord": "不利益", "hiragana": "ふりえき", "meaning": "Chịu thiệt hại / bất lợi"},
            {"id": 4, "sentence": "（ [blank] ）な表現", "answer": "不適切", "targetWord": "不適切", "hiragana": "ふてきせつ", "meaning": "Phát ngôn không thích đáng"},
            {"id": 5, "sentence": "（ [blank] ）を買う", "answer": "不評", "targetWord": "不評", "hiragana": "ふひょう", "meaning": "Bị đánh giá kém / mang tiếng xấu"},
            {"id": 6, "sentence": "（ [blank] ）なことは計算です", "answer": "不得意", "targetWord": "不得意", "hiragana": "ふとくい", "meaning": "Không sở trường / điểm yếu"}
        ]
    }
    minigames.append((chap_map[5], "SENTENCE_CLOZE", "Minigame 3: 【3】 Ghép tiền tố phủ định「不」vào từ vựng công sở", "Quan sát sơ đồ mạng lưới chữ「不」ở cuối p.56. Chọn từ thích hợp ghép với tiền tố「不」:", img_5, json.dumps(ch5_g3_data, ensure_ascii=False), 3))

    # Ch 6 - Game 1: 【4】 会話の漢字穴埋め
    ch6_g1_data = {
        "wordBank": ["企画", "充電", "景気", "募集", "総合"],
        "questions": [
            {"id": 1, "sentence": "1. 新しい商品開発のアイデアを考えてみてくれない？ ―― はい、すぐに [blank] 書を作ります。", "answer": "企画", "targetWord": "企画書", "hiragana": "きかくしょ", "meaning": "Bản kế hoạch sản phẩm"},
            {"id": 2, "sentence": "2. 携帯電話のバッテリーがなくなりそう！ ―― 大変！早く [blank] したほうがいいよ。", "answer": "充電", "targetWord": "充電", "hiragana": "じゅうでん", "meaning": "Sạc pin điện thoại"},
            {"id": 3, "sentence": "3. 最近、経済状況が少しずつつよくなってきましたね。 ―― これで [blank] が回復するといいのですが。", "answer": "景気", "targetWord": "景気", "hiragana": "けいき", "meaning": "Tình hình kinh tế thị trường"},
            {"id": 4, "sentence": "4. 人が少ないのに仕事が多すぎて大変です！ ―― アルバイトの人を [blank] しよう。", "answer": "募集", "targetWord": "募集", "hiragana": "ぼしゅう", "meaning": "Tuyển dụng nhân sự"},
            {"id": 5, "sentence": "5. みなさん、いろいろな意見をありがとうございます。 ―― 意見を [blank] すると賛成ということですね。", "answer": "総合", "targetWord": "総合", "hiragana": "そうごう", "meaning": "Tổng hợp ý kiến"}
        ]
    }
    minigames.append((chap_map[6], "SENTENCE_CLOZE", "Minigame 1: 【4】 Hội thoại công sở & Điền từ ghép Hán tự (会話の漢字穴埋め)", "Quan sát phần trên p.57. Ghép các chữ Hán từ ngân hàng để hoàn thành các câu thoại đối đáp công sở:", img_6, json.dumps(ch6_g1_data, ensure_ascii=False), 1))

    # Ch 6 - Game 2: 【5】 送り仮名グループ分け
    ch6_g2_data = {
        "wordBank": ["増える", "損ねる", "兼ねる", "訪ねる", "務める", "改める", "縮める", "納める", "勤める", "企てる", "充てる", "比べる", "慣れる", "疲れる", "訪れる"],
        "questions": [
            {"id": 1, "sentence": "1. Đuôi ~える: 加える, [blank]", "answer": "増える", "targetWord": "増える", "hiragana": "ふえる", "meaning": "Tăng lên"},
            {"id": 2, "sentence": "2. Đuôi ~ねる: [blank] (bỏ lỡ/tổn hại)", "answer": "損ねる", "targetWord": "損ねる", "hiragana": "そこねる", "meaning": "Làm tổn hại, lỡ mất cơ hội"},
            {"id": 3, "sentence": "3. Đuôi ~ねる: [blank] (kiêm nhiệm hai chức vụ)", "answer": "兼ねる", "targetWord": "兼ねる", "hiragana": "かねる", "meaning": "Kiêm nhiệm"},
            {"id": 4, "sentence": "4. Đuôi ~ねる: [blank] (đến thăm hỏi)", "answer": "訪ねる", "targetWord": "訪ねる", "hiragana": "たずねる", "meaning": "Đến thăm"},
            {"id": 5, "sentence": "5. Đuôi ~める: [blank] (đảm nhận chức vụ)", "answer": "務める", "targetWord": "務める", "hiragana": "つとめる", "meaning": "Đảm nhận nhiệm vụ"},
            {"id": 6, "sentence": "6. Đuôi ~める: [blank] (cải thiện môi trường sống)", "answer": "改める", "targetWord": "改める", "hiragana": "あらためる", "meaning": "Cải thiện, sửa đổi"},
            {"id": 7, "sentence": "7. Đuôi ~める: [blank] (rút ngắn khoảng cách)", "answer": "縮める", "targetWord": "縮める", "hiragana": "ちぢめる", "meaning": "Thu hẹp, rút ngắn"},
            {"id": 8, "sentence": "8. Đuôi ~める: [blank] (nộp thuế nhà nước)", "answer": "納める", "targetWord": "納める", "hiragana": "おさめる", "meaning": "Đóng nộp thuế"},
            {"id": 9, "sentence": "9. Đuôi ~める: [blank] (làm việc tại công ty)", "answer": "勤める", "targetWord": "勤める", "hiragana": "つとめる", "meaning": "Làm việc, cống hiến"},
            {"id": 10, "sentence": "10. Đuôi ~てる: [blank] (lên kế hoạch mưu tính)", "answer": "企てる", "targetWord": "企てる", "hiragana": "くわだてる", "meaning": "Lên mưu đồ, dự tính"},
            {"id": 11, "sentence": "11. Đuôi ~てる: [blank] (dành dụm phân bổ chi phí)", "answer": "充てる", "targetWord": "充てる", "hiragana": "あてる", "meaning": "Dành cho, phân bổ"},
            {"id": 12, "sentence": "12. Đuôi ~べる: [blank] (so sánh hai lựa chọn A và B)", "answer": "比べる", "targetWord": "比べる", "hiragana": "くらべる", "meaning": "So sánh đối chiếu"},
            {"id": 13, "sentence": "13. Đuôi ~れる: [blank] (quen với cuộc sống nước ngoài)", "answer": "慣れる", "targetWord": "慣れる", "hiragana": "なれる", "meaning": "Quen thuộc"},
            {"id": 14, "sentence": "14. Đuôi ~れる: [blank] (cơ thể mệt mỏi)", "answer": "疲れる", "targetWord": "疲れる", "hiragana": "つかれる", "meaning": "Mệt mỏi kiệt sức"},
            {"id": 15, "sentence": "15. Đuôi ~れる: [blank] (mùa xuân ghé thăm)", "answer": "訪れる", "targetWord": "訪れる", "hiragana": "おとずれる", "meaning": "Ghé đến"}
        ]
    }
    minigames.append((chap_map[6], "SENTENCE_CLOZE", "Minigame 2: 【5】 Phân loại động từ N2 theo đuôi Okurigana (送り仮名グループ分け)", "Quan sát bảng phân nhóm ở nửa dưới p.57. Điền động từ Hán tự kèm Okurigana chính xác vào từng nhóm đuôi:", img_6, json.dumps(ch6_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 4: Ch 7 & 8 (p.70 & p.71)
    # ==========================================
    img_7 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_7_8_p1.webp"
    img_8 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_7_8_p2.webp"

    # Ch 7 - Game 1: 【1】 熟語作成＆読み方
    ch7_g1_data = {
        "wordBank": ["勧", "張", "象", "援", "致", "共"],
        "questions": [
            {"id": 1, "sentence": "1. 大学では新入生をサークルに [blank] 誘する。", "answer": "勧", "targetWord": "勧誘", "hiragana": "かんゆう", "blankReading": "かん", "meaning": "Mời gọi, rủ rê vào câu lạc bộ", "explanation": "Chữ 勧 (KHUYẾN) trong 勧誘 (かんゆう)."},
            {"id": 2, "sentence": "2. 面接では誰でも 緊 [blank] するものだ。", "answer": "張", "targetWord": "緊張", "hiragana": "きんちょう", "blankReading": "ちょう", "meaning": "Căng thẳng, hồi hộp", "explanation": "Chữ 張 (TRƯƠNG) trong 緊張 (きんちょう)."},
            {"id": 3, "sentence": "3. 台風が近づいています。気 [blank] 情報に注意してください。", "answer": "象", "targetWord": "気象", "hiragana": "きしょう", "blankReading": "しょう", "meaning": "Khí tượng thời tiết", "explanation": "Chữ 象 (TƯỢNG) trong 気象 (きしょう)."},
            {"id": 4, "sentence": "4. 好きな野球チームを 応 [blank] している。", "answer": "援", "targetWord": "応援", "hiragana": "おうえん", "blankReading": "えん", "meaning": "Cổ vũ nồng nhiệt", "explanation": "Chữ 援 (VIỆN) trong 応援 (おうえん)."},
            {"id": 5, "sentence": "5. オリンピックを東京に 誘 [blank] したい。", "answer": "致", "targetWord": "誘致", "hiragana": "ゆうち", "blankReading": "ち", "meaning": "Kêu gọi, đăng cai thế vận hội", "explanation": "Chữ 致 (TRÍ) trong 誘致 (ゆうち)."},
            {"id": 6, "sentence": "6. 私の高校は男女 [blank] 学だった。", "answer": "共", "targetWord": "共学", "hiragana": "きょうがく", "blankReading": "きょう", "meaning": "Trường nam nữ học chung", "explanation": "Chữ 共 (CỘNG) trong 共学 (きょうがく)."}
        ]
    }
    minigames.append((chap_map[7], "SENTENCE_CLOZE", "Minigame 1: 【1】 Ghép từ vựng xã hội & Kiểm tra cách đọc On-yomi (熟語作成＆読み方)", "Quan sát phần trên p.70. Chọn chữ Hán từ ngân hàng điền vào ô trống để tạo từ ghép hoàn chỉnh:", img_7, json.dumps(ch7_g1_data, ensure_ascii=False), 1))

    # Ch 7 - Game 2: 【2】 意味から熟語を作る
    ch7_g2_data = {
        "wordBank": ["殺", "暴", "離", "際", "破", "毒"],
        "questions": [
            {"id": 1, "sentence": "1. 人の命をうばうこと (Cướp đi sinh mạng người khác): [blank] 人", "answer": "殺", "targetWord": "殺人", "hiragana": "さつじん", "meaning": "Sát nhân, giết người"},
            {"id": 2, "sentence": "2. たたいたり、けったりすること (Đánh đập, ẩu đả): [blank] 力", "answer": "暴", "targetWord": "暴力", "hiragana": "ぼうりょく", "meaning": "Bạo lực"},
            {"id": 3, "sentence": "3. 結婚した夫婦が別れること (Vợ chồng ly biệt chia tay): [blank] 婚", "answer": "離", "targetWord": "離婚", "hiragana": "りこん", "meaning": "Ly hôn"},
            {"id": 4, "sentence": "4. 人とつきあうこと (Giao tiếp, kết giao với người khác): 交 [blank]", "answer": "際", "targetWord": "交際", "hiragana": "こうさい", "meaning": "Giao du, hẹn hò"},
            {"id": 5, "sentence": "5. お金が全部なくなること (Mất sạch tiền bạc của cải): [blank] 産", "answer": "破", "targetWord": "破産", "hiragana": "はさん", "meaning": "Phá sản"},
            {"id": 6, "sentence": "6. お酒を飲まないではいられない病気のこと (Nghiện rượu không bỏ được): アルコール中 [blank]", "answer": "毒", "targetWord": "中毒", "hiragana": "ちゅうどく", "meaning": "Nhiễm độc, nghiện ngập"}
        ]
    }
    minigames.append((chap_map[7], "SENTENCE_CLOZE", "Minigame 2: 【2】 Đoán từ vựng Hán tự từ định nghĩa tiếng Nhật (意味から熟語を作る)", "Quan sát phần dưới p.70. Đọc định nghĩa tiếng Nhật và điền chữ Hán tương ứng:", img_7, json.dumps(ch7_g2_data, ensure_ascii=False), 2))

    # Ch 8 - Game 1: 【3】 「御」がつく言葉と読み方
    ch8_g1_data = {
        "wordBank": ["社", "意見", "祝い", "礼", "案内"],
        "questions": [
            {"id": 1, "sentence": "1. 御 [blank] -> おんしゃ (Kính ngữ công ty của đối tác)", "answer": "社", "targetWord": "御社", "hiragana": "おんしゃ", "meaning": "Quý công ty"},
            {"id": 2, "sentence": "2. 御 [blank] -> ごいけん (Kính ngữ ý kiến quý báu)", "answer": "意見", "targetWord": "御意見", "hiragana": "ごいけん", "meaning": "Ý kiến của quý vị"},
            {"id": 3, "sentence": "3. 御 [blank] -> おいわい (Kính ngữ lời chúc mừng)", "answer": "祝い", "targetWord": "御祝い", "hiragana": "おいわい", "meaning": "Lời chúc mừng, quà mừng"},
            {"id": 4, "sentence": "4. 御 [blank] -> おれい (Kính ngữ lời cảm tạ)", "answer": "礼", "targetWord": "御礼", "hiragana": "おれい", "meaning": "Lời cảm ơn, quà đáp lễ"},
            {"id": 5, "sentence": "5. 御 [blank] -> ごあんない (Kính ngữ sự hướng dẫn)", "answer": "案内", "targetWord": "御案内", "hiragana": "ごあんない", "meaning": "Sự hướng dẫn, chỉ đường"}
        ]
    }
    minigames.append((chap_map[8], "SENTENCE_CLOZE", "Minigame 1: 【3】 Kính ngữ tiền tố「御」(おん・ご・お)", "Quan sát phần trên p.71. Ghép danh từ thích hợp với tiền tố kính ngữ「御」:", img_8, json.dumps(ch8_g1_data, ensure_ascii=False), 1))

    # Ch 8 - Game 2: 【4】 カタカナの読み方をする漢字
    ch8_g2_data = {
        "groups": [
            {
                "kana": "ユウ",
                "questions": [
                    {"id": "1_1", "sentence": "① 子どもを [blank] 園地に連れて行く。", "answer": "遊", "targetWord": "遊園地", "hiragana": "ゆうえんち", "meaning": "Khu vui chơi giải trí"},
                    {"id": "1_2", "sentence": "② 犯人はこどもを [blank] 拐し、身代金を要求してきた。", "answer": "誘", "targetWord": "誘拐", "hiragana": "ゆうかい", "meaning": "Bắt cóc tống tiền"}
                ]
            },
            {
                "kana": "キョウ",
                "questions": [
                    {"id": "2_1", "sentence": "① 駅や公園などの公 [blank] の場ではマナーを守ることが大切だ。", "answer": "共", "targetWord": "公共", "hiragana": "こうきょう", "meaning": "Nơi công cộng"},
                    {"id": "2_2", "sentence": "② クラス全員が [blank] 力して運動会の準備をしている。", "answer": "協", "targetWord": "協力", "hiragana": "きょうりょく", "meaning": "Chung sức hợp tác"}
                ]
            },
            {
                "kana": "ショウ",
                "questions": [
                    {"id": "3_1", "sentence": "① 卒業式に先生が涙を流したことがとても印 [blank] に残っている。", "answer": "象", "targetWord": "印象", "hiragana": "いんしょう", "meaning": "Ấn tượng sâu đậm"},
                    {"id": "3_2", "sentence": "② これからも努力を続けて [blank] 進します。", "answer": "精", "targetWord": "精進", "hiragana": "しょうじん", "meaning": "Chăm chỉ tiến bộ"}
                ]
            },
            {
                "kana": "セキ",
                "questions": [
                    {"id": "4_1", "sentence": "① 頼まれた仕事は最後まで [blank] 任を持ってやるべきだ。", "answer": "責", "targetWord": "責任", "hiragana": "せきにん", "meaning": "Có trách nhiệm"},
                    {"id": "4_2", "sentence": "② 日本人と結婚して日本国 [blank] を取得する人もいる。", "answer": "籍", "targetWord": "国籍", "hiragana": "こくせき", "meaning": "Nhập quốc tịch Nhật Bản"}
                ]
            }
        ],
        "wordBank": ["遊", "誘", "共", "協", "象", "精", "責", "籍"]
    }
    minigames.append((chap_map[8], "KATAKANA_HOMOPHONE", "Minigame 2: 【4】 Phân biệt chữ Hán đồng âm Katakana (カタカナの読み方をする漢字)", "Quan sát phần giữa p.71. Điền chữ Hán tương ứng với âm Katakana đầu nhóm:", img_8, json.dumps(ch8_g2_data, ensure_ascii=False), 2))

    # Ch 8 - Game 3: 【5】 送りがなの動詞
    ch8_g3_data = {
        "wordBank": ["殺", "割", "勧", "遊", "迷"],
        "questions": [
            {"id": 1, "sentence": "1. ころす: [blank] す", "answer": "殺", "targetWord": "殺す", "hiragana": "ころす", "meaning": "Giết hại"},
            {"id": 2, "sentence": "2. われる: [blank] れる", "answer": "割", "targetWord": "割れる", "hiragana": "われる", "meaning": "Bị vỡ, nứt rạn"},
            {"id": 3, "sentence": "3. わる: [blank] る", "answer": "割", "targetWord": "割る", "hiragana": "わる", "meaning": "Đập vỡ, chia nhỏ"},
            {"id": 4, "sentence": "4. すすめる: [blank] める", "answer": "勧", "targetWord": "勧める", "hiragana": "すすめる", "meaning": "Khuyên bảo, gợi ý"},
            {"id": 5, "sentence": "5. あそぶ: [blank] ぶ", "answer": "遊", "targetWord": "遊ぶ", "hiragana": "あそぶ", "meaning": "Vui chơi"},
            {"id": 6, "sentence": "6. まよう: [blank] う", "answer": "迷", "targetWord": "迷う", "hiragana": "まよう", "meaning": "Lạc đường, phân vân"}
        ]
    }
    minigames.append((chap_map[8], "SENTENCE_CLOZE", "Minigame 3: 【5】 Chữ Hán của các động từ quan hệ & tình huống xã hội (送りがなの動詞)", "Quan sát phần cuối p.71. Chọn chữ Hán thích hợp điền vào trước phần Okurigana:", img_8, json.dumps(ch8_g3_data, ensure_ascii=False), 3))

    # ==========================================
    # PAIR 5: Ch 9 & 10 (p.88 & p.89)
    # ==========================================
    img_9 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_9_10_p1.webp"
    img_10 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_9_10_p2.webp"

    # Ch 9 - Game 1: 【1】 熟語作成＆読み方
    ch9_g1_data = {
        "wordBank": ["泉", "浮", "防", "条", "詩", "爆"],
        "questions": [
            {"id": 1, "sentence": "1. 疲れたので、温 [blank] に入って体を休めたい。", "answer": "泉", "targetWord": "温泉", "hiragana": "おんせん", "meaning": "Suối nước nóng Onsen"},
            {"id": 2, "sentence": "2. 応援しているチームがついに首位に [blank] 上した。", "answer": "浮", "targetWord": "浮上", "hiragana": "ふじょう", "meaning": "Vươn lên dẫn đầu bảng"},
            {"id": 3, "sentence": "3. 学校で [blank] 災訓練を行った。", "answer": "防", "targetWord": "防災", "hiragana": "ぼうさい", "meaning": "Phòng chống thiên tai"},
            {"id": 4, "sentence": "4. 首相が欧米諸国との [blank] 約に署名をした。", "answer": "条", "targetWord": "条約", "hiragana": "じょうやく", "meaning": "Điều ước quốc tế"},
            {"id": 5, "sentence": "5. [blank] 集を買って毎日読んでいる。", "answer": "詩", "targetWord": "詩集", "hiragana": "ししゅう", "meaning": "Tập thơ ca"},
            {"id": 6, "sentence": "6. 工場で [blank] 発事故があり、住民が避難した。", "answer": "爆", "targetWord": "爆発", "hiragana": "ばくはつ", "meaning": "Vụ nổ lớn"}
        ]
    }
    minigames.append((chap_map[9], "SENTENCE_CLOZE", "Minigame 1: 【1】 Ghép từ vựng môi trường & Hiệp ước quốc tế (熟語作成＆読み方)", "Quan sát phần trên p.88. Điền chữ Hán từ ngân hàng chữ tạo thành từ ghép chính xác:", img_9, json.dumps(ch9_g1_data, ensure_ascii=False), 1))

    # Ch 9 - Game 2: 【2】 意味から熟語を作る
    ch9_g2_data = {
        "wordBank": ["源", "昇", "義", "策", "制", "省"],
        "questions": [
            {"id": 1, "sentence": "1. 単語のもとのかたちや意味のこと: 語 [blank]", "answer": "源", "targetWord": "語源", "hiragana": "ごげん", "meaning": "Nguồn gốc của từ ngữ"},
            {"id": 2, "sentence": "2. 職場での役職があがること: [blank] 進", "answer": "昇", "targetWord": "昇進", "hiragana": "しょうしん", "meaning": "Thăng chức lên vị trí cao hơn"},
            {"id": 3, "sentence": "3. 国民が必ずしなければならないこと: [blank] 務", "answer": "義", "targetWord": "義務", "hiragana": "ぎむ", "meaning": "Nghĩa vụ công dân"},
            {"id": 4, "sentence": "4. 政治上の方針を実行する方法: 政 [blank]", "answer": "策", "targetWord": "政策", "hiragana": "せいさく", "meaning": "Chính sách đối nội/đối ngoại"},
            {"id": 5, "sentence": "5. 学校や会社が定めた服のこと: [blank] 服", "answer": "制", "targetWord": "制服", "hiragana": "せいふく", "meaning": "Đồng phục quy định"},
            {"id": 6, "sentence": "6. 自分がしたことに悪いところがなかったか、ふり返ること: 反 [blank]", "answer": "省", "targetWord": "反省", "hiragana": "はんせい", "meaning": "Tự kiểm điểm bản thân"}
        ]
    }
    minigames.append((chap_map[9], "SENTENCE_CLOZE", "Minigame 2: 【2】 Đoán từ vựng chính trị & xã hội từ định nghĩa (意味から熟語を作る)", "Quan sát phần dưới p.88. Đọc giải nghĩa và điền chữ Hán còn khuyết:", img_9, json.dumps(ch9_g2_data, ensure_ascii=False), 2))

    # Ch 10 - Game 1: 【3】 漢字クロスワード
    ch10_g1_data = {
        "puzzles": [
            {"id": 1, "top": "上", "bottom": "宮", "left": "会", "right": "法", "answer": "司", "explanation": "上司 (じょうし), 子宮 (しきゅう), 司会 (しかい), 司法 (しほう)."},
            {"id": 2, "top": "強", "bottom": "服", "left": "規", "right": "定", "answer": "制", "explanation": "強制 (きょうせい), 制服 (せいふく), 規制 (きせい), 制定 (せいてい)."},
            {"id": 3, "top": "反", "bottom": "暴", "left": "混", "right": "用", "answer": "乱", "explanation": "反乱 (はんらん), 暴乱 (ぼうらん), 混乱 (こんらん), 乱用 (らんよう)."},
            {"id": 4, "top": "制", "bottom": "界", "left": "権", "right": "度", "answer": "限", "explanation": "制限 (せいげん), 限界 (げんかい), 権限 (けんげん), 限度 (げんど)."},
            {"id": 5, "top": "南", "bottom": "楽", "left": "究", "right": "端", "answer": "極", "explanation": "南極 (なんきょく), 極楽 (ごくらく), 究極 (きゅうきょく), 極端 (きょくたん)."},
            {"id": 6, "top": "防", "bottom": "難", "left": "被", "right": "害", "answer": "災", "explanation": "防災 (ぼうさい), 災難 (さいなん), 被災 (ひさい), 災害 (さいがい)."}
        ],
        "wordBank": ["司", "制", "乱", "限", "極", "災"]
    }
    minigames.append((chap_map[10], "KANJI_CROSS", "Minigame 1: 【3】 Ô chữ chữ thập Kanji 4 hướng tâm điểm — Pháp luật & An ninh", "Quan sát nửa trên p.89. Tìm chữ Hán tâm điểm có thể ghép với cả 4 chữ Hán xung quanh thành 4 từ vựng có nghĩa:", img_10, json.dumps(ch10_g1_data, ensure_ascii=False), 1))

    # Ch 10 - Game 2: 【4】 カタカナの読み方をする漢字
    ch10_g2_data = {
        "groups": [
            {
                "kana": "コウ",
                "questions": [
                    {"id": "1_1", "sentence": "① 父も母も大学で [blank] 師をしている。", "answer": "講", "targetWord": "講師", "hiragana": "こうし", "meaning": "Giảng viên đại học"},
                    {"id": "1_2", "sentence": "② 相手チームは [blank] 守の両面で優れていた。", "answer": "攻", "targetWord": "攻守", "hiragana": "こうしゅ", "meaning": "Tấn công và phòng thủ"}
                ]
            },
            {
                "kana": "ショウ",
                "questions": [
                    {"id": "2_1", "sentence": "① [blank] 来の目標について考えた。", "answer": "将", "targetWord": "将来", "hiragana": "しょうらい", "meaning": "Tương lai"},
                    {"id": "2_2", "sentence": "② この説明は [blank] 略させていただきます。", "answer": "省", "targetWord": "省略", "hiragana": "しょうりゃく", "meaning": "Lược bớt, bỏ qua"},
                    {"id": "2_3", "sentence": "③ 4月から部長に [blank] 格した。", "answer": "昇", "targetWord": "昇格", "hiragana": "しょうかく", "meaning": "Thăng hạng lên chức"}
                ]
            },
            {
                "kana": "トウ",
                "questions": [
                    {"id": "3_1", "sentence": "① 税金問題について意見が対立して離 [blank] した。", "answer": "党", "targetWord": "離党", "hiragana": "りとう", "meaning": "Rời khỏi đảng chính trị"},
                    {"id": "3_2", "sentence": "② 政治家の活発な [blank] 論が聞きたい。", "answer": "討", "targetWord": "討論", "hiragana": "とうろん", "meaning": "Tranh luận, thảo luận"}
                ]
            }
        ],
        "wordBank": ["講", "攻", "将", "省", "昇", "党", "討"]
    }
    minigames.append((chap_map[10], "KATAKANA_HOMOPHONE", "Minigame 2: 【4】 Phân biệt chữ Hán chính trị theo âm Katakana", "Quan sát nửa dưới p.89. Điền chữ Hán tương ứng với âm Katakana (コウ, ショウ, トウ):", img_10, json.dumps(ch10_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 6: Ch 11 & 12 (p.110 & p.111)
    # ==========================================
    img_11 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_11_12_p1.webp"
    img_12 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_11_12_p2.webp"

    # Ch 11 - Game 1: 【1】 和室の図を見て漢字を書く
    ch11_g1_data = {
        "wordBank": ["廊", "床", "壁", "畳"],
        "questions": [
            {"id": 1, "sentence": "1. Hành lang đi lại ngoài phòng: [blank] 下", "answer": "廊", "targetWord": "廊下", "hiragana": "ろうか", "meaning": "Hành lang"},
            {"id": 2, "sentence": "2. Hốc tường trang trí tranh chữ/hoa: [blank] の間", "answer": "床", "targetWord": "床の間", "hiragana": "とこのま", "meaning": "Góc trang trí truyền thống Tokonoma"},
            {"id": 3, "sentence": "3. Bức tường chắn phòng: [blank]", "answer": "壁", "targetWord": "壁", "hiragana": "かべ", "meaning": "Bức tường"},
            {"id": 4, "sentence": "4. Chiếu cói truyền thống lót sàn: [blank]", "answer": "畳", "targetWord": "畳", "hiragana": "たたみ", "meaning": "Chiếu Tatami"}
        ]
    }
    minigames.append((chap_map[11], "SENTENCE_CLOZE", "Minigame 1: 【1】 Cấu trúc phòng truyền thống Nhật Bản Washitsu (和室の図を見て漢字を書く)", "Quan sát tranh vẽ căn phòng Washitsu trên p.110. Điền tên Hán tự của 4 vị trí kiến trúc chỉ định:", img_11, json.dumps(ch11_g1_data, ensure_ascii=False), 1))

    # Ch 11 - Game 2: 【2】 反対の意味
    ch11_g2_data = {
        "wordBank": ["硬", "潔", "簡単", "需要", "縦", "鈍"],
        "questions": [
            {"id": 1, "sentence": "1. 柔らかい (mềm mại) ⇔ [blank] い", "answer": "硬", "targetWord": "硬い", "hiragana": "かたい", "meaning": "Cứng rắn"},
            {"id": 2, "sentence": "2. 清 [blank] (sạch sẽ) ⇔ 不 [blank] (bẩn thỉu)", "answer": "潔", "targetWord": "清潔 ⇔ 不潔", "hiragana": "せいけつ ⇔ ふけつ", "meaning": "Thanh khiết đối lập ô uế"},
            {"id": 3, "sentence": "3. 複雑 (phức tạp) ⇔ [blank]", "answer": "簡単", "targetWord": "簡単", "hiragana": "かんたん", "meaning": "Đơn giản"},
            {"id": 4, "sentence": "4. 供給 (cung cấp) ⇔ [blank]", "answer": "需要", "targetWord": "需要", "hiragana": "じゅよう", "meaning": "Nhu cầu tiêu dùng"},
            {"id": 5, "sentence": "5. 横 (hàng ngang) ⇔ [blank]", "answer": "縦", "targetWord": "縦", "hiragana": "たて", "meaning": "Hàng dọc"},
            {"id": 6, "sentence": "6. 鋭い (sắc bén, nhạy bén) ⇔ [blank] い", "answer": "鈍", "targetWord": "鈍い", "hiragana": "にぶい", "meaning": "Cùn, chậm chạp"}
        ]
    }
    minigames.append((chap_map[11], "SENTENCE_CLOZE", "Minigame 2: 【2】 Cặp từ đối nghĩa đời sống & vật chất (反対の意味)", "Quan sát phần dưới p.110. Điền chữ Hán thích hợp để hoàn thành cặp từ trái nghĩa:", img_11, json.dumps(ch11_g2_data, ensure_ascii=False), 2))

    # Ch 12 - Game 1: 【3】 言葉を完成させる
    ch12_g1_data = {
        "wordBank": ["硬", "頑", "勇", "携", "髪", "斜"],
        "questions": [
            {"id": 1, "sentence": "1. 社長の強 [blank] な意見で、そのプロジェクトは中止になった。", "answer": "硬", "targetWord": "強硬", "hiragana": "きょうこう", "meaning": "Cứng rắn, kiên quyết"},
            {"id": 2, "sentence": "2. 彼女は [blank] 固な性格で、一度言い出したら人の意見は聞かない。", "answer": "頑", "targetWord": "頑固", "hiragana": "がんこ", "meaning": "Ngoan cố, bảo thủ"},
            {"id": 3, "sentence": "3. 好きな人に [blank] 気を出して、告白することにした。", "answer": "勇", "targetWord": "勇気", "hiragana": "ゆうき", "meaning": "Dũng cảm, can đảm"},
            {"id": 4, "sentence": "4. [blank] 帯が壊れたので新しいのを買った。", "answer": "携", "targetWord": "携帯", "hiragana": "けいたい", "meaning": "Điện thoại di động"},
            {"id": 5, "sentence": "5. 気分を変えたくて、[blank] 型を変えた。", "answer": "髪", "targetWord": "髪型", "hiragana": "かみがた", "meaning": "Kiểu tóc"},
            {"id": 6, "sentence": "6. スキーで [blank] 面を滑るのは気持ちがいい。", "answer": "斜", "targetWord": "斜面", "hiragana": "しゃめん", "meaning": "Mặt dốc nghiêng"}
        ]
    }
    minigames.append((chap_map[12], "SENTENCE_CLOZE", "Minigame 1: 【3】 Điền Hán tự tính cách & Đời sống công sở (言葉を完成させる)", "Quan sát phần trên p.111. Chọn chữ Hán từ ngân hàng chữ hoàn thành các câu văn:", img_12, json.dumps(ch12_g1_data, ensure_ascii=False), 1))

    # Ch 12 - Game 2: 【4】 同じ漢字の部分・部首
    ch12_g2_data = {
        "wordBank": ["粒", "糖", "粧", "菓", "暮", "茶", "荘", "渋", "滞", "潔", "往", "街", "携", "拒", "隅", "隣"],
        "questions": [
            {"id": 1, "sentence": "1. 米 + [blank]: ① 突然、大 [blank] の雨が降ってきた。 (hạt mưa to)", "answer": "粒", "targetWord": "粒", "hiragana": "つぶ", "meaning": "Hạt mưa to"},
            {"id": 2, "sentence": "2. 米 + [blank]: ② ダイエット中なので [blank] 分を控えている。 (đường)", "answer": "糖", "targetWord": "糖分", "hiragana": "とうぶん", "meaning": "Lượng đường"},
            {"id": 3, "sentence": "3. 米 + [blank]: ③ 化 [blank] 品売り場で新しい口紅を試した。 (mỹ phẩm)", "answer": "粧", "targetWord": "化粧品", "hiragana": "けしょうひん", "meaning": "Mỹ phẩm trang điểm"},
            {"id": 4, "sentence": "4. 艹 + [blank]: ① 緑茶には和 [blank] 子がよくあう。 (bánh ngọt Nhật)", "answer": "菓", "targetWord": "和菓子", "hiragana": "わがし", "meaning": "Bánh kẹo Nhật"},
            {"id": 5, "sentence": "5. 艹 + [blank]: ② 大学に入学し、一人 [blank] らしを始めた。 (sống một mình)", "answer": "暮", "targetWord": "一人暮らし", "hiragana": "ひとりぐらし", "meaning": "Sống độc thân"},
            {"id": 6, "sentence": "6. 艹 + [blank]: ③ 私の趣味は [blank] 道だ。 (trà đạo)", "answer": "茶", "targetWord": "茶道", "hiragana": "さどう", "meaning": "Trà đạo"},
            {"id": 7, "sentence": "7. 艹 + [blank]: ④ 夏は別 [blank] で過ごすつもりだ。 (biệt thự nghỉ dưỡng)", "answer": "荘", "targetWord": "別荘", "hiragana": "べっそう", "meaning": "Biệt thự mùa hè"},
            {"id": 8, "sentence": "8. 氵 + [blank]: ① このお茶は [blank] すぎて子供には飲めないだろう。 (chát)", "answer": "渋", "targetWord": "渋い", "hiragana": "しぶい", "meaning": "Vị chát đắng"},
            {"id": 9, "sentence": "9. 氵 + [blank]: ② 体調が悪く休んだので、仕事が [blank] る。 (trì trệ, ứ đọng)", "answer": "滞", "targetWord": "滞る", "hiragana": "とどこおる", "meaning": "Trì trệ, chậm trễ"},
            {"id": 10, "sentence": "10. 氵 + [blank]: ③ 彼は [blank] 癖な人として社内で有名だ。 (ưa sạch sẽ thái quá)", "answer": "潔", "targetWord": "潔癖", "hiragana": "けっぺき", "meaning": "Bệnh ưa sạch sẽ"},
            {"id": 11, "sentence": "11. 彳 + [blank]: ① 忘れ物をしたので、家と駅とを [blank] 復した。 (khứ hồi)", "answer": "往", "targetWord": "往復", "hiragana": "おうふく", "meaning": "Đi khứ hồi qua lại"},
            {"id": 12, "sentence": "12. 彳 + [blank]: ② 選挙が近くなり、[blank] 頭演説をする人も増えてきた。 (đường phố)", "answer": "街", "targetWord": "街頭", "hiragana": "がいとう", "meaning": "Trên góc phố"},
            {"id": 13, "sentence": "13. 扌 + [blank]: ① アメリカの企業と業務提 [blank] を結ぶことになった。 (hợp tác)", "answer": "携", "targetWord": "提携", "hiragana": "ていけい", "meaning": "Hợp tác kinh doanh"},
            {"id": 14, "sentence": "14. 扌 + [blank]: ② 上司の命令は [blank] 否するわけにはいかない。 (từ chối)", "answer": "拒", "targetWord": "拒否", "hiragana": "きょひ", "meaning": "Từ chối, cự tuyệt"},
            {"id": 15, "sentence": "15. 阝 + [blank]: ① 部屋の片 [blank] からなくしたものがでてきた。 (góc phòng)", "answer": "隅", "targetWord": "片隅", "hiragana": "かたすみ", "meaning": "Góc phòng"},
            {"id": 16, "sentence": "16. 阝 + [blank]: ② このマンションは公園に [blank] 接している。 (tiếp giáp lân cận)", "answer": "隣", "targetWord": "隣接", "hiragana": "りんせつ", "meaning": "Tiếp giáp liền kề"}
        ]
    }
    minigames.append((chap_map[12], "SENTENCE_CLOZE", "Minigame 2: 【4】 Nhận diện chữ Hán cùng chung bộ thủ (同じ漢字の部分を使った漢字)", "Quan sát phần dưới p.111. Điền chữ Hán có cùng bộ thủ (米, 艹, 氵, 彳, 扌, 阝) vào các ngữ cảnh thích hợp:", img_12, json.dumps(ch12_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 7: Ch 13 & 14 (p.128 & p.129)
    # ==========================================
    img_13 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_13_14_p1.webp"
    img_14 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_13_14_p2.webp"

    # Ch 13 - Game 1: 【1】 反対の意味
    ch13_g1_data = {
        "wordBank": ["喫煙", "近視", "解散", "開放", "冷凍", "重視", "埋蔵"],
        "questions": [
            {"id": 1, "sentence": "1. 禁煙 (Cấm hút thuốc) ⇔ [blank]", "answer": "喫煙", "targetWord": "喫煙", "hiragana": "きつえん", "meaning": "Hút thuốc lá"},
            {"id": 2, "sentence": "2. 遠視 (Viễn thị) ⇔ [blank]", "answer": "近視", "targetWord": "近視", "hiragana": "きんし", "meaning": "Cận thị"},
            {"id": 3, "sentence": "3. 集合 (Tập hợp) ⇔ [blank]", "answer": "解散", "targetWord": "解散", "hiragana": "かいさん", "meaning": "Giải tán"},
            {"id": 4, "sentence": "4. 閉鎖 (Phong tỏa đóng kín) ⇔ [blank]", "answer": "開放", "targetWord": "開放", "hiragana": "かいほう", "meaning": "Mở cửa thông thoáng"},
            {"id": 5, "sentence": "5. 解凍 (Rã đông) ⇔ [blank]", "answer": "冷凍", "targetWord": "冷凍", "hiragana": "れいとう", "meaning": "Làm đông lạnh"},
            {"id": 6, "sentence": "6. 軽視 (Xem nhẹ) ⇔ [blank]", "answer": "重視", "targetWord": "重視", "hiragana": "じゅうし", "meaning": "Coi trọng"},
            {"id": 7, "sentence": "7. 採掘 (Khai thác đào lên) ⇔ [blank]", "answer": "埋蔵", "targetWord": "埋蔵", "hiragana": "まいぞう", "meaning": "Chôn giấu dưới lòng đất"}
        ]
    }
    minigames.append((chap_map[13], "SENTENCE_CLOZE", "Minigame 1: 【1】 Chuyển đổi từ đối nghĩa Hiragana thành chữ Hán (反対の意味)", "Quan sát phần trên p.128. Chọn từ Hiragana trong khung và gõ Hán tự tương ứng trái nghĩa:", img_13, json.dumps(ch13_g1_data, ensure_ascii=False), 1))

    # Ch 13 - Game 2: 【2】 さんずい (氵) の漢字
    ch13_g2_data = {
        "wordBank": ["泥沼", "滴", "瀬", "滝", "浄", "洞"],
        "questions": [
            {"id": 1, "sentence": "1. [blank] にはまる (Sa lầy vào vũng bùn lầy)", "answer": "泥沼", "targetWord": "泥沼", "hiragana": "どろぬま", "meaning": "Vũng bùn lầy lội"},
            {"id": 2, "sentence": "2. 水 [blank] が垂れる (Giọt nước nhỏ giọt xuống)", "answer": "滴", "targetWord": "水滴", "hiragana": "すいてき", "meaning": "Giọt nước nhỏ"},
            {"id": 3, "sentence": "3. 川の浅 [blank] で遊ぶ (Vui chơi ở bãi cạn ven sông)", "answer": "瀬", "targetWord": "浅瀬", "hiragana": "あさせ", "meaning": "Bãi sông nông cạn"},
            {"id": 4, "sentence": "4. [blank] に打たれる (Ngâm mình dưới dòng thác đổ)", "answer": "滝", "targetWord": "滝", "hiragana": "たき", "meaning": "Thác nước"},
            {"id": 5, "sentence": "5. 洗 [blank] 剤を入れる (Cho chất tẩy rửa làm sạch vào)", "answer": "浄", "targetWord": "洗浄剤", "hiragana": "せんじょうざい", "meaning": "Chất tẩy rửa làm sạch"},
            {"id": 6, "sentence": "6. [blank] 穴を探検する (Thám hiểm hang động bí ẩn)", "answer": "洞", "targetWord": "洞穴", "hiragana": "ほらあな", "meaning": "Hang động thiên nhiên"}
        ]
    }
    minigames.append((chap_map[13], "SENTENCE_CLOZE", "Minigame 2: 【2】 Chữ Hán mang bộ Chấm thủy 氵(さんずい)", "Quan sát phần dưới p.128. Ghép bộ Chấm thủy với các chữ trong khung để tạo chữ Hán hoàn chỉnh:", img_13, json.dumps(ch13_g2_data, ensure_ascii=False), 2))

    # Ch 14 - Game 1: 【3】 会話を完成させる
    ch14_g1_data = {
        "wordBank": ["脈拍", "視力検査", "脂肪", "錠剤", "妊娠"],
        "questions": [
            {"id": 1, "sentence": "1. 看護師：まず [blank] を測りますね。腕を出してください。", "answer": "脈拍", "targetWord": "脈拍", "hiragana": "みゃくはく", "meaning": "Đo mạch đập tim"},
            {"id": 2, "sentence": "2. 看護師：[blank] をしましょう。眼鏡を外してください。", "answer": "視力検査", "targetWord": "視力検査", "hiragana": "しりょくけんさ", "meaning": "Khám kiểm tra thị lực"},
            {"id": 3, "sentence": "3. 医者：体重が増えたのは、[blank] のとりすぎが原因なので、油の多い食事を控えてください。", "answer": "脂肪", "targetWord": "脂肪", "hiragana": "しぼう", "meaning": "Mỡ, chất béo dư thừa"},
            {"id": 4, "sentence": "4. 医者：痛み止めの [blank] を処方するので、薬局で受け取ってください。", "answer": "錠剤", "targetWord": "錠剤", "hiragana": "じょうざい", "meaning": "Thuốc viên nén"},
            {"id": 5, "sentence": "5. 医者：[blank] 3ヶ月ですよ。おめでとうございます。", "answer": "妊娠", "targetWord": "妊娠", "hiragana": "にんしん", "meaning": "Mang thai mang bầu"}
        ]
    }
    minigames.append((chap_map[14], "SENTENCE_CLOZE", "Minigame 1: 【3】 Hoàn thành hội thoại y tế phòng khám bệnh (会話を完成させる)", "Quan sát nửa trên p.129. Điền từ vựng y tế thích hợp vào các câu thoại giữa bác sĩ và bệnh nhân:", img_14, json.dumps(ch14_g1_data, ensure_ascii=False), 1))

    # Ch 14 - Game 2: 【4】 桜の1年
    ch14_g2_data = {
        "wordBank": ["咲きます", "枝", "飾ります", "散って", "枯れて"],
        "questions": [
            {"id": 1, "sentence": "春になると、桜の花が（ 1. [blank] ）。", "answer": "咲きます", "targetWord": "咲きます", "hiragana": "さきます", "meaning": "Hoa anh đào nở rộ"},
            {"id": 2, "sentence": "公園に落ちていた桜の（ 2. [blank] ）を持って帰って...", "answer": "枝", "targetWord": "枝", "hiragana": "えだ", "meaning": "Cành cây hoa anh đào"},
            {"id": 3, "sentence": "部屋に（ 3. [blank] ）。", "answer": "飾ります", "targetWord": "飾ります", "hiragana": "かざります", "meaning": "Trang trí trong phòng"},
            {"id": 4, "sentence": "一週間で花が（ 4. [blank] ）、新緑の葉がつきます。", "answer": "散って", "targetWord": "散って", "hiragana": "ちって", "meaning": "Cánh hoa rụng rơi"},
            {"id": 5, "sentence": "秋になると葉が（ 5. [blank] ）、冬を迎えます。", "answer": "枯れて", "targetWord": "枯れて", "hiragana": "かれて", "meaning": "Lá cây úa tàn khô héo"}
        ]
    }
    minigames.append((chap_map[14], "SENTENCE_CLOZE", "Minigame 2: 【4】 Vòng tuần hoàn bốn mùa của hoa anh đào Sakura (桜の1年)", "Quan sát nửa dưới p.129. Dùng các chữ Hán trong khung hoàn thành bài văn miêu tả vòng đời hoa anh đào:", img_14, json.dumps(ch14_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 8: Ch 15 & 16 (p.144 & p.145)
    # ==========================================
    img_15 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_15_16_p1.webp"
    img_16 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_15_16_p2.webp"

    # Ch 15 - Game 1: 【1】 熟語作成＆読み方
    ch15_g1_data = {
        "wordBank": ["誤", "謝", "延", "登", "催", "類"],
        "questions": [
            {"id": 1, "sentence": "1. 私の一言が相手に [blank] 解を与えてしまった。", "answer": "誤", "targetWord": "誤解", "hiragana": "ごかい", "meaning": "Hiểu lầm"},
            {"id": 2, "sentence": "2. 両親に 感 [blank] の気持ちを伝える。", "answer": "謝", "targetWord": "感謝", "hiragana": "かんしゃ", "meaning": "Cảm tạ tri ân"},
            {"id": 3, "sentence": "3. 試合が雨のため [blank] 期になった。", "answer": "延", "targetWord": "延期", "hiragana": "えんき", "meaning": "Hoãn lại ngày khác"},
            {"id": 4, "sentence": "4. 富士山の [blank] 頂に成功した。", "answer": "登", "targetWord": "登頂", "hiragana": "とうちょう", "meaning": "Leo lên tới đỉnh núi"},
            {"id": 5, "sentence": "5. ワールドカップは4年に一度 開 [blank] される。", "answer": "催", "targetWord": "開催", "hiragana": "かいさい", "meaning": "Tổ chức sự kiện"},
            {"id": 6, "sentence": "6. [blank] 似品にご注意ください。", "answer": "類", "targetWord": "類似", "hiragana": "るいじ", "meaning": "Hàng nhái tương tự"}
        ]
    }
    minigames.append((chap_map[15], "SENTENCE_CLOZE", "Minigame 1: 【1】 Ghép từ vựng quan hệ & Sự kiện thể thao (熟語作成＆読み方)", "Quan sát phần trên p.144. Chọn chữ Hán từ khung điền vào ô trống để tạo từ ghép có nghĩa:", img_15, json.dumps(ch15_g1_data, ensure_ascii=False), 1))

    # Ch 15 - Game 2: 【2】 意味から熟語を作る
    ch15_g2_data = {
        "wordBank": ["騒", "底", "偶", "了", "炎", "壊"],
        "questions": [
            {"id": 1, "sentence": "1. 不快でうるさい音のこと: [blank] 音", "answer": "騒", "targetWord": "騒音", "hiragana": "そうおん", "meaning": "Tiếng ồn đinh tai nhức óc"},
            {"id": 2, "sentence": "2. 中途半端でないこと: 徹 [blank]", "answer": "底", "targetWord": "徹底", "hiragana": "てってい", "meaning": "Triệt để đến cùng"},
            {"id": 3, "sentence": "3. 2で割り切ることができる数のこと: [blank] 数", "answer": "偶", "targetWord": "偶数", "hiragana": "ぐうすう", "meaning": "Số chẵn chia hết cho 2"},
            {"id": 4, "sentence": "4. 決められた課程が全て終わること: 修 [blank]", "answer": "了", "targetWord": "修了", "hiragana": "しゅうりょう", "meaning": "Hoàn tất khóa học"},
            {"id": 5, "sentence": "5. 火が燃え上がること: [blank] 上", "answer": "炎", "targetWord": "炎上", "hiragana": "えんじょう", "meaning": "Bốc cháy dữ dội"},
            {"id": 6, "sentence": "6. 建物、組織などがこわれること: 崩 [blank]", "answer": "壊", "targetWord": "崩壊", "hiragana": "ほうかい", "meaning": "Sụp đổ, tan rã"}
        ]
    }
    minigames.append((chap_map[15], "SENTENCE_CLOZE", "Minigame 2: 【2】 Đoán từ vựng hiện tượng & Toán học từ định nghĩa (意味から熟語を作る)", "Quan sát phần dưới p.144. Điền chữ Hán còn khuyết vào chỗ trống theo định nghĩa:", img_15, json.dumps(ch15_g2_data, ensure_ascii=False), 2))

    # Ch 16 - Game 1: 【3】 漢字クロスワード
    ch16_g1_data = {
        "puzzles": [
            {"id": 1, "top": "物", "bottom": "動", "left": "喧", "right": "音", "answer": "騒", "explanation": "物騒 (ぶっそう), 喧騒 (けんそう), 騒音 (そうおん), 騒動 (そうどう)."},
            {"id": 2, "top": "修", "bottom": "解", "left": "終", "right": "承", "answer": "了", "explanation": "修了 (しゅうりょう), 終了 (しゅうりょう), 了承 (りょうしょう), 了解 (りょうかい)."},
            {"id": 3, "top": "山", "bottom": "点", "left": "登", "right": "上", "answer": "頂", "explanation": "山頂 (さんちょう), 登頂 (とうちょう), 頂上 (ちょうじょう), 頂点 (ちょうてん)."},
            {"id": 4, "top": "加", "bottom": "気", "left": "除", "right": "度", "answer": "湿", "explanation": "加湿 (かしつ), 除湿 (じょしつ), 湿度 (しつど), 湿気 (しっき)."},
            {"id": 5, "top": "地", "bottom": "雨", "left": "落", "right": "鳴", "answer": "雷", "explanation": "地雷 (じらい), 落雷 (らくらい), 雷鳴 (らいめい), 雷雨 (らいう)."},
            {"id": 6, "top": "先", "bottom": "父", "left": "元", "right": "先", "answer": "祖", "explanation": "先祖 (せんぞ), 元祖 (がんそ), 祖先 (そせん), 祖父 (そふ)."}
        ],
        "wordBank": ["騒", "了", "頂", "湿", "雷", "祖"]
    }
    minigames.append((chap_map[16], "KANJI_CROSS", "Minigame 1: 【3】 Ô chữ chữ thập Kanji 4 hướng tâm điểm — Thiên nhiên & Hiện tượng", "Quan sát nửa trên p.145. Tìm chữ Hán tâm điểm ghép với cả 4 chữ xung quanh:", img_16, json.dumps(ch16_g1_data, ensure_ascii=False), 1))

    # Ch 16 - Game 2: 【4】 カタカナの読み方をする漢字
    ch16_g2_data = {
        "groups": [
            {
                "kana": "エン",
                "questions": [
                    {"id": "1_1", "sentence": "① [blank] 会の予約を入れるために居酒屋に電話をした。", "answer": "宴", "targetWord": "宴会", "hiragana": "えんかい", "meaning": "Bữa tiệc rượu"},
                    {"id": "1_2", "sentence": "② ビデオを返すのを忘れてしまい、[blank] 滞料を支払った。", "answer": "延", "targetWord": "延滞料", "hiragana": "えんたいりょう", "meaning": "Phí quá hạn trễ hẹn"}
                ]
            },
            {
                "kana": "コウ",
                "questions": [
                    {"id": "2_1", "sentence": "① [blank] 水警報が発令された。", "answer": "洪", "targetWord": "洪水", "hiragana": "こうずい", "meaning": "Lũ lụt ngập nước"},
                    {"id": "2_2", "sentence": "② 戦争で国土の大半が [blank] 廃してしまった。", "answer": "荒", "targetWord": "荒廃", "hiragana": "こうはい", "meaning": "Hoang tàn đổ nát"}
                ]
            },
            {
                "kana": "ハイ",
                "questions": [
                    {"id": "3_1", "sentence": "① この高校は野球で多くの名選手を [blank] 出している。", "answer": "輩", "targetWord": "輩出", "hiragana": "はいしゅつ", "meaning": "Sản sinh nhiều nhân tài"},
                    {"id": "3_2", "sentence": "② この神社の [blank] 観は5時までと決まっている。", "answer": "拝", "targetWord": "拝観", "hiragana": "はいかん", "meaning": "Chiêm bái viếng đền"}
                ]
            },
            {
                "kana": "リョウ",
                "questions": [
                    {"id": "4_1", "sentence": "① 清 [blank] 飲料水をケースで購入する。", "answer": "涼", "targetWord": "清涼飲料水", "hiragana": "せいりょういんりょうすい", "meaning": "Nước giải khát mát lạnh"},
                    {"id": "4_2", "sentence": "② 新しい内閣の閣 [blank] が決まった。", "answer": "僚", "targetWord": "閣僚", "hiragana": "かくりょう", "meaning": "Các quan chức bộ trưởng"},
                    {"id": "4_3", "sentence": "③ 入学式の準備が完 [blank] した。", "answer": "了", "targetWord": "完了", "hiragana": "かんりょう", "meaning": "Hoàn tất trọn vẹn"}
                ]
            }
        ],
        "wordBank": ["宴", "延", "洪", "荒", "輩", "拝", "涼", "僚", "了"]
    }
    minigames.append((chap_map[16], "KATAKANA_HOMOPHONE", "Minigame 2: 【4】 Phân biệt chữ Hán thời tiết & Đời sống theo âm Katakana", "Quan sát nửa dưới p.145. Điền chữ Hán tương ứng với âm Katakana (エン, コウ, ハイ, リョウ):", img_16, json.dumps(ch16_g2_data, ensure_ascii=False), 2))

    # ==========================================
    # PAIR 9: Ch 17 & 18 (p.160 & p.161)
    # ==========================================
    img_17 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_17_18_p1.webp"
    img_18 = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_17_18_p2.webp"

    # Ch 17 - Game 1: 【1】 関東地方の地図
    ch17_g1_data = {
        "wordBank": ["栃", "群", "茨", "埼", "奈"],
        "questions": [
            {"id": 1, "sentence": "1. [blank] 木県 (Tỉnh Tochigi - Phía Bắc Kanto):", "answer": "栃", "targetWord": "栃木県", "hiragana": "とちぎけん", "meaning": "Tỉnh Tochigi"},
            {"id": 2, "sentence": "2. [blank] 馬県 (Tỉnh Gunma - Phía Tây Bắc Kanto):", "answer": "群", "targetWord": "群馬県", "hiragana": "ぐんまけん", "meaning": "Tỉnh Gunma"},
            {"id": 3, "sentence": "3. [blank] 城県 (Tỉnh Ibaraki - Phía Đông Bắc Kanto):", "answer": "茨", "targetWord": "茨城県", "hiragana": "いばらきけん", "meaning": "Tỉnh Ibaraki"},
            {"id": 4, "sentence": "4. [blank] 玉県 (Tỉnh Saitama - Liền kề phía Bắc Tokyo):", "answer": "埼", "targetWord": "埼玉県", "hiragana": "さいたまけん", "meaning": "Tỉnh Saitama"},
            {"id": 5, "sentence": "5. 神 [blank] 川県 (Tỉnh Kanagawa - Phía Nam Tokyo, thủ phủ Yokohama):", "answer": "奈", "targetWord": "神奈川県", "hiragana": "かながわけん", "meaning": "Tỉnh Kanagawa"}
        ]
    }
    minigames.append((chap_map[17], "SENTENCE_CLOZE", "Minigame 1: 【1】 Bản đồ địa lý các tỉnh vùng Kanto Nhật Bản (関東地方の地図)", "Quan sát bản đồ vùng Kanto trên p.160. Điền chữ Hán chính xác vào tên của 5 tỉnh thành bao quanh Tokyo:", img_17, json.dumps(ch17_g1_data, ensure_ascii=False), 1))

    # Ch 17 - Game 2: 【2】 言葉を入れる
    ch17_g2_data = {
        "wordBank": ["俳句", "作詞", "盗難", "罰則", "家計簿", "閲覧", "保護", "衛星"],
        "questions": [
            {"id": 1, "sentence": "1.「古池や 蛙飛び込む 水の音」は松尾芭蕉の有名な（ [blank] ）だ。", "answer": "俳句", "targetWord": "俳句", "hiragana": "はいく", "meaning": "Thơ Haiku cổ điển Nhật Bản"},
            {"id": 2, "sentence": "2. 最近の歌手は、自分で作曲したり、（ [blank] ）をしたりする人も多い。", "answer": "作詞", "targetWord": "作詞", "hiragana": "さくし", "meaning": "Viết lời bài hát"},
            {"id": 3, "sentence": "3. 旅行中にお金を盗まれて、警察に（ [blank] ）届を出した。", "answer": "盗難", "targetWord": "盗難", "hiragana": "とうなん", "meaning": "Vụ trộm cắp tài sản"},
            {"id": 4, "sentence": "4. 日本では飲酒運転をした場合の（ [blank] ）がとても厳しい。", "answer": "罰則", "targetWord": "罰則", "hiragana": "ばっそく", "meaning": "Quy tắc xử phạt nghiêm minh"},
            {"id": 5, "sentence": "5. 節約するために今月から（ [blank] ）をつけることにした。", "answer": "家計簿", "targetWord": "家計簿", "hiragana": "かけいぼ", "meaning": "Sổ thu chi gia đình Kakeibo"},
            {"id": 6, "sentence": "6. この本は館外貸し出し禁止ですが、（ [blank] ）室で読むことはできます。", "answer": "閲覧", "targetWord": "閲覧", "hiragana": "えつらん", "meaning": "Phòng đọc sách tại chỗ"},
            {"id": 7, "sentence": "7. 昨日母が、迷子になった子犬を（ [blank] ）した。", "answer": "保護", "targetWord": "保護", "hiragana": "ほご", "meaning": "Cứu hộ, bảo bọc"},
            {"id": 8, "sentence": "8. 多くの人工（ [blank] ）が今も地球の周りを回っている。", "answer": "衛星", "targetWord": "衛星", "hiragana": "えいせい", "meaning": "Vệ tinh nhân tạo"}
        ]
    }
    minigames.append((chap_map[17], "SENTENCE_CLOZE", "Minigame 2: 【2】 Văn hóa nghệ thuật & Pháp luật đời sống N2 (言葉を入れる)", "Quan sát phần dưới p.160. Điền từ vựng Hán tự thích hợp vào các câu văn đời sống Nhật Bản:", img_17, json.dumps(ch17_g2_data, ensure_ascii=False), 2))

    # Ch 18 - Game 1: 【3】 漢字クロスワード
    ch18_g1_data = {
        "puzzles": [
            {"id": 1, "top": "大", "bottom": "発", "left": "大", "right": "大", "answer": "砲", "explanation": "Theo đáp án giáo trình p.179: (たて) 砲 [ほう] (よこ) 阪 [はん - 大阪]."},
            {"id": 2, "top": "映", "bottom": "防", "left": "衛", "right": "生", "answer": "衛", "explanation": "Theo đáp án giáo trình p.179: (たて) 画像 [がぞう] (よこ) 衛 [えい - 衛星/防衛]."}
        ],
        "wordBank": ["砲", "阪", "画像", "衛"]
    }
    minigames.append((chap_map[18], "KANJI_CROSS", "Minigame 1: 【3】 Ô chữ Kanji giao điểm tổng hợp (漢字クロスワード)", "Quan sát bài tập p.161 và đáp án giáo trình p.179. Điền chữ Hán giao điểm theo chiều dọc và ngang:", img_18, json.dumps(ch18_g1_data, ensure_ascii=False), 1))

    # Ch 18 - Game 2: 【4】 カタカナの読み方をする漢字
    ch18_g2_data = {
        "groups": [
            {
                "kana": "タイ・シン・カク",
                "questions": [
                    {"id": "1_1", "sentence": "① 自衛のために部 [blank] を編成した。(タイ)", "answer": "隊", "targetWord": "部隊", "hiragana": "ぶたい", "meaning": "Quân đội, binh đoàn"},
                    {"id": "1_2", "sentence": "② 他国の領土を [blank] 略する。(シン)", "answer": "侵", "targetWord": "侵略", "hiragana": "しんりゃく", "meaning": "Xâm lược lãnh thổ"},
                    {"id": "1_3", "sentence": "③ 内 [blank] 総理大臣。(カク)", "answer": "閣", "targetWord": "内閣", "hiragana": "ないかく", "meaning": "Nội các chính phủ"}
                ]
            },
            {
                "kana": "ヒ・サイ",
                "questions": [
                    {"id": "2_1", "sentence": "① 映画の出来栄えを [blank] 評する。(ヒ)", "answer": "批", "targetWord": "批評", "hiragana": "ひひょう", "meaning": "Phê bình nghệ thuật"},
                    {"id": "2_2", "sentence": "② 裁判所で公平に [blank] く。(サイ)", "answer": "裁", "targetWord": "裁く", "hiragana": "さばく", "meaning": "Phán xử, tài phán"}
                ]
            }
        ],
        "wordBank": ["隊", "侵", "閣", "批", "裁"]
    }
    minigames.append((chap_map[18], "KATAKANA_HOMOPHONE", "Minigame 2: 【4】 Phân biệt chữ Hán quân sự & Tư pháp theo âm Katakana", "Quan sát bài tập p.161 và đáp án p.179. Điền chữ Hán theo âm đọc Katakana (隊, 侵, 閣, 批, 裁):", img_18, json.dumps(ch18_g2_data, ensure_ascii=False), 2))

    # Ch 18 - Game 3: 【5】 四字熟語
    ch18_g3_data = {
        "wordBank": ["年功序列", "天下一統", "合格祈願", "集中砲火"],
        "questions": [
            {
                "id": 1,
                "sentence": "1. Chế độ đãi ngộ và thăng chức dựa trên thâm niên cống hiến: [blank]",
                "answer": "年功序列",
                "targetWord": "年功序列",
                "hiragana": "ねんこうじょれつ",
                "meaning": "Chế độ thâm niên công đức",
                "explanation": "Thành ngữ biểu tượng của văn hóa doanh nghiệp Nhật Bản truyền thống: 年功序列 (ねんこうじょれつ)."
            },
            {
                "id": 2,
                "sentence": "2. Thống nhất toàn bộ thiên hạ giang sơn về một mối: [blank]",
                "answer": "天下一統",
                "targetWord": "天下一統",
                "hiragana": "てんかいっとう",
                "meaning": "Thống nhất thiên hạ",
                "explanation": "Ý chí thống nhất thiên hạ của các tướng quân thời Chiến Quốc: 天下一統 (てんかいっとう)."
            },
            {
                "id": 3,
                "sentence": "3. Cầu chúc thi cử thuận lợi, đỗ đạt vinh hiển: [blank]",
                "answer": "合格祈願",
                "targetWord": "合格祈願",
                "hiragana": "ごうかくきがん",
                "meaning": "Cầu nguyện thi đỗ",
                "explanation": "Viết thẻ gỗ Ema tại các đền chùa xin đỗ kỳ thi: 合格祈願 (ごうかくきがん)."
            },
            {
                "id": 4,
                "sentence": "4. Tập trung toàn bộ hỏa lực / Trở thành tâm điểm chỉ trích dồn dập từ dư luận: [blank]",
                "answer": "集中砲火",
                "targetWord": "集中砲火",
                "hiragana": "しゅうちゅうほうか",
                "meaning": "Hứng chịu mũi dùi dư luận / Tập trung hỏa lực",
                "explanation": "Nghĩa đen là hỏa lực pháo kích dồn dập, nghĩa bóng là tâm điểm búa rìu dư luận: 集中砲火 (しゅうちゅうほうか)."
            }
        ]
    }
    minigames.append((chap_map[18], "SENTENCE_CLOZE", "Minigame 3: 【5】 Thành ngữ 4 chữ Hán kinh điển N2 (四字熟語)", "Quan sát bài tập cuối p.161 và đáp án p.179. Điền 4 thành ngữ 4 chữ Hán (四字熟語) tương ứng với định nghĩa:", img_18, json.dumps(ch18_g3_data, ensure_ascii=False), 3))

    print(f"Total minigames prepared: {len(minigames)}")

    # Insert into DB
    insert_sql = """
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
    """
    for g in minigames:
        cur.execute(insert_sql, g)
        print(f"  Inserted {g[1]} | Ch {g[0]} | Order {g[6]} | {g[2][:45]}...")

    print("\n✅ SUCCESS: Successfully seeded all 40 authentic minigames across all 18 chapters of N2!")
    cur.close()
    conn.close()

if __name__ == '__main__':
    main()
