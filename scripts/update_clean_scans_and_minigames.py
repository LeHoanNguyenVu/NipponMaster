import sys
import os
import pymupdf
from PIL import Image
import psycopg2

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

illustrations_dir = 'frontend/public/assets/kanji/n4/illustrations'
minigames_dir = 'frontend/public/assets/kanji/n4/minigames'
os.makedirs(illustrations_dir, exist_ok=True)
os.makedirs(minigames_dir, exist_ok=True)

CHAPTER_PAGE_MAP = {
    1: 6,   # Book p7: 1章 家族
    2: 19,  # Book p28: 2章 コンビニ 1 レジ
    3: 37,  # 3章 おくり物 & あて先
    4: 47,  # 4章 デート & 映画・公園
    5: 56,  # 5章 町 & 駅・交通
    6: 62,  # 6章 学生 & 研究・ラーメン
    7: 69,  # 7章 春夏秋冬 & 天気・旅行
    8: 74,  # 8章 学校 & 勉強・試験
    9: 77   # 9章 休みのひ & 運動・自然
}

print("=== STEP 1: EXTRACTING HIGH-RES CLEAN SCANS FOR ALL 9 CHAPTER INTROS ===")
for ch, page_num in CHAPTER_PAGE_MAP.items():
    page = doc[page_num - 1]
    pix = page.get_pixmap(dpi=200)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    
    # Save full intro illustration
    target_path = os.path.join(illustrations_dir, f'chap{ch}_sub1_full.webp')
    img.save(target_path, 'WEBP', quality=95)
    if ch == 1:
        img.save(os.path.join(illustrations_dir, 'chap1_mnemonics_full.webp'), 'WEBP', quality=95)
    print(f"Saved Chapter {ch} clean scan (Page {page_num}): {target_path} ({img.width}x{img.height})")

print("\n=== STEP 2: EXTRACTING AUTHENTIC MINIGAME SCENARIOS ===")
# Chapter 2:
p2_img = Image.open(os.path.join(illustrations_dir, 'chap2_sub1_full.webp'))
w, h = p2_img.size
c2_game1 = p2_img.crop((int(w * 0.12), int(h * 0.28), int(w * 0.88), int(h * 0.80)))
c2_game1.save(os.path.join(minigames_dir, 'chap2_conbini_register.webp'), 'WEBP', quality=95)
c2_game2 = p2_img.crop((int(w * 0.15), int(h * 0.52), int(w * 0.85), int(h * 0.80)))
c2_game2.save(os.path.join(minigames_dir, 'chap2_conbini_24hours.webp'), 'WEBP', quality=95)

# Chapter 3:
p3_img = Image.open(os.path.join(illustrations_dir, 'chap3_sub1_full.webp'))
w, h = p3_img.size
c3_game1 = p3_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c3_game1.save(os.path.join(minigames_dir, 'chap3_takkyubin_slip.webp'), 'WEBP', quality=95)
c3_game2 = p3_img.crop((int(w * 0.10), int(h * 0.40), int(w * 0.90), int(h * 0.80)))
c3_game2.save(os.path.join(minigames_dir, 'chap3_address_map.webp'), 'WEBP', quality=95)

# Chapter 4:
p4_img = Image.open(os.path.join(illustrations_dir, 'chap4_sub1_full.webp'))
w, h = p4_img.size
c4_game1 = p4_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c4_game1.save(os.path.join(minigames_dir, 'chap4_dating_cinema.webp'), 'WEBP', quality=95)
c4_game2 = p4_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c4_game2.save(os.path.join(minigames_dir, 'chap4_fashion_wear.webp'), 'WEBP', quality=95)

# Chapter 5:
p5_img = Image.open(os.path.join(illustrations_dir, 'chap5_sub1_full.webp'))
w, h = p5_img.size
c5_game1 = p5_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c5_game1.save(os.path.join(minigames_dir, 'chap5_station_train.webp'), 'WEBP', quality=95)
c5_game2 = p5_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c5_game2.save(os.path.join(minigames_dir, 'chap5_hospital_pharmacy.webp'), 'WEBP', quality=95)

# Chapter 6:
p6_img = Image.open(os.path.join(illustrations_dir, 'chap6_sub1_full.webp'))
w, h = p6_img.size
c6_game1 = p6_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c6_game1.save(os.path.join(minigames_dir, 'chap6_ramen_menu.webp'), 'WEBP', quality=95)
c6_game2 = p6_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c6_game2.save(os.path.join(minigames_dir, 'chap6_student_party.webp'), 'WEBP', quality=95)

# Chapter 7:
p7_img = Image.open(os.path.join(illustrations_dir, 'chap7_sub1_full.webp'))
w, h = p7_img.size
c7_game1 = p7_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c7_game1.save(os.path.join(minigames_dir, 'chap7_weather_forecast.webp'), 'WEBP', quality=95)
c7_game2 = p7_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c7_game2.save(os.path.join(minigames_dir, 'chap7_travel_journey.webp'), 'WEBP', quality=95)

# Chapter 8:
p8_img = Image.open(os.path.join(illustrations_dir, 'chap8_sub1_full.webp'))
w, h = p8_img.size
c8_game1 = p8_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c8_game1.save(os.path.join(minigames_dir, 'chap8_exam_answer_sheet.webp'), 'WEBP', quality=95)
c8_game2 = p8_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c8_game2.save(os.path.join(minigames_dir, 'chap8_politics_history.webp'), 'WEBP', quality=95)

# Chapter 9:
p9_img = Image.open(os.path.join(illustrations_dir, 'chap9_sub1_full.webp'))
w, h = p9_img.size
c9_game1 = p9_img.crop((int(w * 0.10), int(h * 0.20), int(w * 0.90), int(h * 0.80)))
c9_game1.save(os.path.join(minigames_dir, 'chap9_nature_picnic.webp'), 'WEBP', quality=95)
c9_game2 = p9_img.crop((int(w * 0.10), int(h * 0.45), int(w * 0.90), int(h * 0.80)))
c9_game2.save(os.path.join(minigames_dir, 'chap9_sports_festival.webp'), 'WEBP', quality=95)

print("Saved all authentic minigame scenario illustrations!")

print("\n=== STEP 3: UPDATING MINIGAME IMAGE URLS IN SUPABASE DATABASE ===")
conn = psycopg2.connect(
    host='52.65.247.42',
    port=6543,
    dbname='postgres',
    user='postgres.bxqwarbeocbsfjieqbsq',
    password='hnvuwww1234A',
    sslmode='require'
)
cur = conn.cursor()

MINIGAME_UPDATES = [
    (161, '/assets/kanji/n4/minigames/chap2_conbini_register.webp'),
    (162, '/assets/kanji/n4/minigames/chap2_conbini_24hours.webp'),
    (163, '/assets/kanji/n4/minigames/chap3_takkyubin_slip.webp'),
    (164, '/assets/kanji/n4/minigames/chap3_address_map.webp'),
    (165, '/assets/kanji/n4/minigames/chap4_dating_cinema.webp'),
    (166, '/assets/kanji/n4/minigames/chap4_fashion_wear.webp'),
    (167, '/assets/kanji/n4/minigames/chap5_station_train.webp'),
    (168, '/assets/kanji/n4/minigames/chap5_hospital_pharmacy.webp'),
    (169, '/assets/kanji/n4/minigames/chap6_ramen_menu.webp'),
    (170, '/assets/kanji/n4/minigames/chap6_student_party.webp'),
    (171, '/assets/kanji/n4/minigames/chap7_weather_forecast.webp'),
    (172, '/assets/kanji/n4/minigames/chap7_travel_journey.webp'),
    (173, '/assets/kanji/n4/minigames/chap8_exam_answer_sheet.webp'),
    (174, '/assets/kanji/n4/minigames/chap8_politics_history.webp'),
    (175, '/assets/kanji/n4/minigames/chap9_nature_picnic.webp'),
    (176, '/assets/kanji/n4/minigames/chap9_sports_festival.webp')
]

for mg_id, img_url in MINIGAME_UPDATES:
    cur.execute("UPDATE kanji_minigames SET image_url = %s WHERE id = %s;", (img_url, mg_id))
    print(f"Updated Minigame {mg_id} -> {img_url}")

conn.commit()
conn.close()
print("All minigames updated in database successfully!")
