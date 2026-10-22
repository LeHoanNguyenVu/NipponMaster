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

print("=== N4 CHAPTERS ===")
cur.execute("SELECT id, chapter_number, jlpt_level, title_ja, title_vi, kanji_count FROM kanji_chapters WHERE jlpt_level = 'N4' ORDER BY chapter_number;")
for r in cur.fetchall():
    print(r)

print("\n=== KANJIS COUNT PER CHAPTER IN DB ===")
cur.execute("""
    SELECT c.id, c.chapter_number, c.kanji_count as chapter_expected, count(k.id) as actual_kanjis, string_agg(k.character, '') as kanji_chars
    FROM kanji_chapters c
    LEFT JOIN kanjis k ON k.chapter_id = c.id
    WHERE c.jlpt_level = 'N4'
    GROUP BY c.id, c.chapter_number, c.kanji_count
    ORDER BY c.chapter_number;
""")
for r in cur.fetchall():
    print(f"Chap {r[1]} (id={r[0]}): expected={r[2]}, actual={r[3]}, chars={r[4]}")

print("\n=== EXERCISES COUNT PER CHAPTER ===")
cur.execute("""
    SELECT chapter_id, count(*), 
           count(CASE WHEN exercise_type = 'READING' THEN 1 END) as reading_cnt,
           count(CASE WHEN exercise_type = 'WRITING' THEN 1 END) as writing_cnt
    FROM kanji_exercises
    WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N4')
    GROUP BY chapter_id
    ORDER BY chapter_id;
""")
for r in cur.fetchall():
    print(f"Chap {r[0]}: total={r[1]}, reading={r[2]}, writing={r[3]}")

print("\n=== MINIGAMES PER CHAPTER ===")
cur.execute("""
    SELECT chapter_id, id, game_type, title, length(game_data_json)
    FROM kanji_minigames
    WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N4')
    ORDER BY chapter_id, id;
""")
for r in cur.fetchall():
    print(f"Chap {r[0]}: minigame_id={r[1]}, type={r[2]}, title={r[3]}, json_len={r[4]}")

cur.close()
conn.close()
