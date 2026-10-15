import sys
sys.stdout.reconfigure(encoding='utf-8')
import psycopg2

conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password="hnvuwww1234A",
    sslmode="require"
)
conn.autocommit = True
cur = conn.cursor()

# 1. Update Chapter 1 kanjis
ch1_kanjis = [
    (1, "一"),
    (2, "二"),
    (3, "三"),
    (4, "四"),
    (5, "五"),
    (6, "六"),
    (7, "七"),
    (8, "八"),
    (9, "九"),
    (10, "十"),
    (11, "百"),
    (12, "千"),
    (13, "万"),
    (14, "円"),
]

for order, char in ch1_kanjis:
    img_url = f"/assets/kanji/n5/illustrations/chap1_kanji_{order}.webp"
    cur.execute("UPDATE kanjis SET image_url = %s WHERE chapter_id = 1 AND character = %s;", (img_url, char))
    print(f"Chapter 1: Updated {char} -> {img_url}")

# 2. Update Chapter 2 kanjis
ch2_kanjis = [
    (1, "月"),
    (2, "火"),
    (3, "水"),
    (4, "木"),
    (5, "金"),
    (6, "土"),
    (7, "日"),
    (8, "年"),
]

for order, char in ch2_kanjis:
    img_url = f"/assets/kanji/n5/illustrations/chap2_kanji_{order}.webp"
    cur.execute("UPDATE kanjis SET image_url = %s WHERE chapter_id = 2 AND character = %s;", (img_url, char))
    print(f"Chapter 2: Updated {char} -> {img_url}")

# 3. For any other kanjis that still have unsplash URLs, clear them so they don't show random photos
cur.execute("UPDATE kanjis SET image_url = NULL WHERE image_url LIKE '%unsplash%';")
print(f"Cleared {cur.rowcount} legacy Unsplash image URLs from database.")

cur.close()
conn.close()
print("Kanji illustrations database updated successfully!")
