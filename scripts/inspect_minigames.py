import sys
import psycopg2
import json

sys.stdout.reconfigure(encoding='utf-8')

conn = psycopg2.connect(
    host='52.65.247.42',
    port=6543,
    dbname='postgres',
    user='postgres.bxqwarbeocbsfjieqbsq',
    password='hnvuwww1234A',
    sslmode='require'
)
cur = conn.cursor()

print("=== kanji_chapters columns ===")
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'kanji_chapters';")
print([r[0] for r in cur.fetchall()])

print("\n=== N5 CHAPTERS & MINIGAMES ===")
cur.execute("""
    SELECT c.id, c.chapter_number, c.title_vi, count(m.id)
    FROM kanji_chapters c
    LEFT JOIN kanji_minigames m ON c.id = m.chapter_id
    WHERE c.jlpt_level = 'N5'
    GROUP BY c.id, c.chapter_number, c.title_vi
    ORDER BY c.chapter_number;
""")
for r in cur.fetchall():
    print(r)

print("\n=== N5 ALL MINIGAMES DETAILS ===")
cur.execute("""
    SELECT m.id, c.chapter_number, m.title, m.game_type, m.image_url, m.game_data_json
    FROM kanji_minigames m
    JOIN kanji_chapters c ON m.chapter_id = c.id
    WHERE c.jlpt_level = 'N5'
    ORDER BY c.chapter_number, m.id;
""")
for r in cur.fetchall():
    data = r[5]
    if isinstance(data, str):
        data = json.loads(data)
    qs = data.get('questions', []) if isinstance(data, dict) else []
    print(f"N5 Chap {r[1]} | Minigame ID: {r[0]} | Title: {r[2]} | Type: {r[3]} | Img: {r[4]} | Q count: {len(qs)}")
    if qs:
        print(f"   First Q: {qs[0].get('question', '')[:60]} -> Ans: {qs[0].get('correct_answer')}")

print("\n=== N4 ALL MINIGAMES DETAILS ===")
cur.execute("""
    SELECT m.id, c.chapter_number, m.title, m.game_type, m.image_url, m.game_data_json
    FROM kanji_minigames m
    JOIN kanji_chapters c ON m.chapter_id = c.id
    WHERE c.jlpt_level = 'N4'
    ORDER BY c.chapter_number, m.id;
""")
for r in cur.fetchall():
    data = r[5]
    if isinstance(data, str):
        data = json.loads(data)
    qs = data.get('questions', []) if isinstance(data, dict) else []
    print(f"N4 Chap {r[1]} | Minigame ID: {r[0]} | Title: {r[2]} | Type: {r[3]} | Img: {r[4]} | Q count: {len(qs)}")
    if qs:
        print(f"   First Q: {qs[0].get('question', '')[:60]} -> Ans: {qs[0].get('correct_answer')}")

conn.close()
