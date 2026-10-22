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

print("=== kanji_minigames columns ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'kanji_minigames';")
for r in cur.fetchall():
    print(r)

print("\n=== kanji_exercises columns ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'kanji_exercises';")
for r in cur.fetchall():
    print(r)

print("\n=== SAMPLE EXERCISES IN CHAP 1 (id=31) ===")
cur.execute("SELECT id, exercise_type, question_text, options_json, correct_answer FROM kanji_exercises WHERE chapter_id = 31 LIMIT 5;")
for r in cur.fetchall():
    print(r)

print("\n=== SAMPLE MINIGAMES IN ALL N4 CHAPTERS ===")
cur.execute("SELECT id, chapter_id, game_type, title, image_url, game_data_json FROM kanji_minigames WHERE chapter_id >= 31 ORDER BY chapter_id, id;")
rows = cur.fetchall()
for r in rows:
    data_preview = str(r[5])[:120] if r[5] else 'None'
    print(f"ID={r[0]}, ChapId={r[1]}, Type={r[2]}, Title={r[3]}, Image={r[4]}, DataLen={len(str(r[5]))}: {data_preview}...")

print("\n=== FIND 朝 晩 昼 夜 in kanjis table ===")
cur.execute("SELECT id, character, chapter_id, image_url FROM kanjis WHERE character IN ('朝', '晩', '昼', '夜');")
for r in cur.fetchall():
    print(r)

cur.close()
conn.close()
