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
cur = conn.cursor()

print(f"{'Ch':<4} | {'ID':<4} | {'Title':<25} | {'Kanjis':<7} | {'Images':<7} | {'Vocabs':<7} | {'Reading':<8} | {'Writing':<8} | {'Minigames':<9}")
print("-" * 95)

total_kanjis = 0
total_images = 0
total_vocabs = 0
total_reading = 0
total_writing = 0
total_minigames = 0

for ch in range(1, 16):
    cur.execute("SELECT id, title_ja, title_vi FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch,))
    row = cur.fetchone()
    if not row:
        continue
    ch_id, title_ja, title_vi = row
    
    cur.execute("SELECT count(*), count(image_url) FROM kanjis WHERE chapter_id = %s;", (ch_id,))
    k_cnt, img_cnt = cur.fetchone()

    cur.execute("SELECT count(*) FROM kanji_chapter_vocab WHERE chapter_id = %s;", (ch_id,))
    v_cnt = cur.fetchone()[0]

    cur.execute("SELECT count(*) FROM kanji_exercises WHERE chapter_id = %s AND exercise_type = 'READING';", (ch_id,))
    r_cnt = cur.fetchone()[0]

    cur.execute("SELECT count(*) FROM kanji_exercises WHERE chapter_id = %s AND exercise_type = 'WRITING';", (ch_id,))
    w_cnt = cur.fetchone()[0]

    cur.execute("SELECT count(*) FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))
    m_cnt = cur.fetchone()[0]

    total_kanjis += k_cnt
    total_images += img_cnt
    total_vocabs += v_cnt
    total_reading += r_cnt
    total_writing += w_cnt
    total_minigames += m_cnt

    title = f"{title_ja} ({title_vi})"[:25]
    print(f"{ch:<4} | {ch_id:<4} | {title:<25} | {k_cnt:<7} | {img_cnt:<7} | {v_cnt:<7} | {r_cnt:<8} | {w_cnt:<8} | {m_cnt:<9}")

print("=" * 95)
print(f"{'TOTAL':<36} | {total_kanjis:<7} | {total_images:<7} | {total_vocabs:<7} | {total_reading:<8} | {total_writing:<8} | {total_minigames:<9}")

cur.close()
conn.close()
