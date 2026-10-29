#!/usr/bin/env python3
"""
Seed Authentic Kanji Master N2 Chapter 1 Minigames (Page 24):
Game 1: 【1】 熟語消去パズル (6x6 Grid Word Search & Elimination Puzzle)
Game 2: 【2】 文脈穴埋め (Sentence Cloze with 10-Kanji Word Bank & Reading Check)
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

    cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = 1;")
    row = cur.fetchone()
    if not row:
        print("Error: N2 Chapter 1 not found!")
        return
    ch1_id = row[0]
    print(f"N2 Chapter 1 ID: {ch1_id}")

    # Delete existing minigames for Chapter 1
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id = %s;", (ch1_id,))
    print(f"Deleted old minigames for Chapter 1")

    # Game 1: 熟語消去パズル
    game1_data = {
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
            {"word": "駐車禁止", "hiragana": "ちゅうしゃきんし", "meaning": "Cấm đỗ xe (4 chữ)"},
            {"word": "指輪", "hiragana": "ゆびわ", "meaning": "Nhẫn đeo tay (2 chữ)"},
            {"word": "漁港", "hiragana": "ぎょこう", "meaning": "Cảng cá (2 chữ)"},
            {"word": "掃除", "hiragana": "そうじ", "meaning": "Quét dọn vệ sinh (2 chữ)"},
            {"word": "並列", "hiragana": "へいれつ", "meaning": "Song song, dàn hàng (2 chữ)"},
            {"word": "著名", "hiragana": "ちょめい", "meaning": "Nổi tiếng, trứ danh (2 chữ)"},
            {"word": "人名", "hiragana": "じんめい", "meaning": "Tên người (2 chữ)"},
            {"word": "週刊誌", "hiragana": "しゅうかんし", "meaning": "Tạp chí tuần san (3 chữ)"},
            {"word": "汚染", "hiragana": "おせん", "meaning": "Ô nhiễm môi trường (2 chữ)"},
            {"word": "流域", "hiragana": "りゅういき", "meaning": "Lưu vực sông ngòi (2 chữ)"},
            {"word": "心配", "hiragana": "しんぱい", "meaning": "Lo lắng, bận tâm (2 chữ)"},
            {"word": "乗車券", "hiragana": "じょうしゃけん", "meaning": "Vé đi xe/tàu (3 chữ)"},
            {"word": "発展", "hiragana": "はってん", "meaning": "Phát triển (2 chữ)"},
            {"word": "途上国", "hiragana": "とじょうこく", "meaning": "Nước đang phát triển (3 chữ)"},
            {"word": "優越感", "hiragana": "ゆうえつかん", "meaning": "Cảm giác tự tôn, ưu việt (3 chữ)"}
        ]
    }

    # Game 2: 文脈穴埋め ＆ 読み方
    game2_data = {
        "wordBank": ["替", "戻", "込", "帳", "越", "居", "含", "照", "振", "預"],
        "questions": [
            {
                "id": 1,
                "sentence": "家族の反対を押し切って結婚したのだから、もう後 [blank] りはできない。",
                "answer": "戻",
                "targetWord": "後戻り",
                "hiragana": "あともどり",
                "blankReading": "もど",
                "meaning": "Quay đầu lại, thoái lui",
                "explanation": "Chữ 戻 (LỆ) trong 後戻り (あともどり - quay lại đường cũ)."
            },
            {
                "id": 2,
                "sentence": "このパソコンは税 [blank] みで十万円だ。",
                "answer": "込",
                "targetWord": "税込み",
                "hiragana": "ぜいこみ",
                "blankReading": "こ",
                "meaning": "Đã bao gồm thuế",
                "explanation": "Chữ 込 (NHẬP) trong 税込み (ぜいこみ - giá bao gồm thuế)."
            },
            {
                "id": 3,
                "sentence": "普通 [blank] 金の口座を開く。",
                "answer": "預",
                "targetWord": "普通預金",
                "hiragana": "ふつうよきん",
                "blankReading": "よ",
                "meaning": "Tiền gửi tiết kiệm thông thường",
                "explanation": "Chữ 預 (DỰ) trong 預金 (よきん - tiền gửi ngân hàng)."
            },
            {
                "id": 4,
                "sentence": "レポートを書くのに、この本を参 [blank] してください。",
                "answer": "照",
                "targetWord": "参照",
                "hiragana": "さんしょう",
                "blankReading": "しょう",
                "meaning": "Tham khảo, đối chiếu",
                "explanation": "Chữ 照 (CHIẾU) trong 参照 (さんしょう - tham chiếu/tham khảo tài liệu)."
            },
            {
                "id": 5,
                "sentence": "手 [blank] に今週の予定を書く。",
                "answer": "帳",
                "targetWord": "手帳",
                "hiragana": "てちょう",
                "blankReading": "ちょう",
                "meaning": "Sổ tay cá nhân ghi lịch trình",
                "explanation": "Chữ 帳 (TRƯỚNG) trong 手帳 (てちょう - sổ tay cá nhân)."
            },
            {
                "id": 6,
                "sentence": "経営不 [blank] でその会社は業績が悪化している。",
                "answer": "振",
                "targetWord": "不振",
                "hiragana": "ふしん",
                "blankReading": "しん",
                "meaning": "Trì trệ, không khởi sắc",
                "explanation": "Chữ 振 (CHẤN) trong 経営不振 (けいえいふしん - kinh doanh bết bát/trì trệ)."
            },
            {
                "id": 7,
                "sentence": "経営不振のため、その会社は社長が交 [blank] した。",
                "answer": "替",
                "targetWord": "交替",
                "hiragana": "こうたい",
                "blankReading": "たい",
                "meaning": "Thay thế, đổi người",
                "explanation": "Chữ 替 (THẾ) trong 交替 (こうたい - thay thế nhân sự/đổi người)."
            },
            {
                "id": 8,
                "sentence": "二位の選手が一の選手を追い [blank] した。",
                "answer": "越",
                "targetWord": "追い越し",
                "hiragana": "おいこし",
                "blankReading": "こ",
                "meaning": "Chạy vượt qua, vượt lên trước",
                "explanation": "Chữ 越 (VIỆT) trong 追い越す (おいこす - vượt mặt đối thủ)."
            },
            {
                "id": 9,
                "sentence": "仕事のあとで飲む [blank] 酒屋のビールは最高だ。",
                "answer": "居",
                "targetWord": "居酒屋",
                "hiragana": "いざかや",
                "blankReading": "い",
                "meaning": "Quán nhậu truyền thống Nhật Bản",
                "explanation": "Chữ 居 (CƯ) trong 居酒屋 (いざかや - quán rượu Izakaya)."
            }
        ]
    }

    img_url = f"{PUBLIC_CDN_BASE}/n2/quizzes/quiz_1_2_p1.webp"

    # Insert Game 1
    cur.execute("""
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
    """, (
        ch1_id,
        "KANJI_ELIMINATION",
        "Minigame 1: 【1】 熟語消去パズル — Ô lưới 6×6 tìm từ ghép & giải mã chữ Hán bí mật",
        "Quan sát tranh bài tập gốc p.24. Tìm và gạch bỏ các từ ghép đã học (2~4 chữ). Chữ Hán cuối cùng còn lại duy nhất trong bảng 6×6 là gì?",
        img_url,
        json.dumps(game1_data, ensure_ascii=False),
        1
    ))

    # Insert Game 2
    cur.execute("""
        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
    """, (
        ch1_id,
        "SENTENCE_CLOZE",
        "Minigame 2: 【2】 Hoàn thành câu văn đời sống N2 & Kiểm tra cách đọc Hiragana (文脈穴埋め)",
        "Quan sát tranh bài tập gốc p.24. Chọn chữ Hán thích hợp từ ngân hàng 10 từ điền vào ô trống trong các câu văn ngữ cảnh, đồng thời ghi nhớ cách đọc Hiragana:",
        img_url,
        json.dumps(game2_data, ensure_ascii=False),
        2
    ))

    print("Successfully seeded 2 authentic minigames for N2 Chapter 1!")
    cur.close()
    conn.close()

if __name__ == '__main__':
    main()
