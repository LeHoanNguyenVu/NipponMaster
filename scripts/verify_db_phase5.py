import sys
import os
import psycopg2
import json

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
conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password=env.get('DB_PASSWORD', 'hnvuwww1234A')
)
cur = conn.cursor()

print("=== VERIFYING CHAPTERS 23 TO 30 IN POSTGRESQL ===")
for ch in range(23, 31):
    cur.execute("""
        SELECT c.id, c.chapter_number, c.title_ja, c.kanji_count,
               COUNT(DISTINCT k.id) as k_cnt,
               COUNT(DISTINCT v.id) as v_cnt,
               COUNT(DISTINCT e.id) as e_cnt,
               COUNT(DISTINCT m.id) as m_cnt
        FROM kanji_chapters c
        LEFT JOIN kanjis k ON k.chapter_id = c.id
        LEFT JOIN kanji_chapter_vocab v ON v.chapter_id = c.id
        LEFT JOIN kanji_exercises e ON e.chapter_id = c.id
        LEFT JOIN kanji_minigames m ON m.chapter_id = c.id
        WHERE c.jlpt_level = 'N1' AND c.chapter_number = %s
        GROUP BY c.id, c.chapter_number, c.title_ja, c.kanji_count;
    """, (ch,))
    row = cur.fetchone()
    print(f"Ch {row[1]} ({row[2]}): kanjis={row[4]}/{row[3]}, vocabs={row[5]}, exercises={row[6]}, minigames={row[7]}")
    
    cur.execute("""
        SELECT game_type, title, image_url, game_data_json FROM kanji_minigames
        WHERE chapter_id = %s;
    """, (row[0],))
    for m in cur.fetchall():
        print(f"   [Minigame] type={m[0]}, title={m[1]}")
        print(f"              img={m[2]}")

print("\n=== VERIFYING STAGE 32 AND STAGE 33 IN POSTGRESQL ===")
cur.execute("""
    SELECT stage, title, pass_percentage, test_data_json FROM kanji_achievement_tests
    WHERE stage IN (32, 33) ORDER BY stage;
""")
for t in cur.fetchall():
    st, title, pct, tdata_str = t
    tdata = json.loads(tdata_str) if isinstance(tdata_str, str) else tdata_str
    q_len = len(tdata.get('questions', []))
    print(f"Stage {st}: {title} (Pass: {pct}%) -> {q_len} questions")
    for q in tdata.get('questions', [])[:2]:
        print(f"   Q{q['id']}: {q.get('question')} | Ans: {q.get('answer')} / {q.get('correctText')}")

cur.close()
conn.close()

