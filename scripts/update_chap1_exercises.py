import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import psycopg2

conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password="hnvuwww1234A",
    sslmode="require"
)
conn.autocommit = False
cur = conn.cursor()

try:
    reading_updates = [
        (1, ["ふたつ", "ひとつ", "みっつ", "よっつ"]),
        (2, ["いちにん", "ふたり", "ひとり", "さんにん"]),
        (3, ["ひとつ", "みっつ", "いつつ", "ふたつ"]),
        (4, ["ふたり", "ににん", "ひとり", "よにん"]),
        (5, ["むっつ", "みっつ", "やっつ", "いつつ"]),
        (6, ["しにん", "よんにん", "さんにん", "よにん"]),
        (7, ["せんえん", "ひゃくえん", "いちまんえん", "じゅうえん"]),
        (8, ["さんぜんえん", "さんせんえん", "さんびゃくえん", "さんまんえん"]),
        (9, ["せんえん", "ひゃくえん", "いちまんえん", "じゅうまんえん"]),
        (10, ["みっつ", "やっつ", "ななつ", "むっつ"]),
    ]

    for order, opts in reading_updates:
        cur.execute("""
            UPDATE kanji_exercises
            SET options_json = %s
            WHERE chapter_id = 1 AND exercise_type = 'READING' AND display_order = %s;
        """, (json.dumps(opts, ensure_ascii=False), order))

    writing_updates = [
        (1, ["二つ", "一つ", "三つ", "十"]),
        (2, ["一人", "三人", "二人", "四人"]),
        (3, ["三つ", "六つ", "八つ", "五つ"]),
        (4, ["三人", "五人", "六人", "四人"]),
        (5, ["六つ", "五つ", "七つ", "八つ"]),
        (6, ["千", "万", "百", "円"]),
        (7, ["三千", "三百", "三万", "三十"]),
        (8, ["千", "百", "十", "一万"]),
        (9, ["百", "円", "千", "万"]),
        (10, ["八人", "七人", "六人", "九人"]),
    ]

    for order, opts in writing_updates:
        cur.execute("""
            UPDATE kanji_exercises
            SET options_json = %s
            WHERE chapter_id = 1 AND exercise_type = 'WRITING' AND display_order = %s;
        """, (json.dumps(opts, ensure_ascii=False), order))

    conn.commit()
    print("Successfully updated kanji_exercises options_json for Chapter 1!")

    # Verify
    cur.execute("""
        SELECT display_order, exercise_type, correct_answer, options_json
        FROM kanji_exercises
        WHERE chapter_id = 1
        ORDER BY exercise_type, display_order;
    """)
    for row in cur.fetchall():
        opts = json.loads(row[3])
        ans_idx = opts.index(row[2]) if row[2] in opts else -1
        char_idx = chr(65 + ans_idx) if ans_idx >= 0 else '?'
        print(f"[{row[1]} #{row[0]}] Correct: '{row[2]}' -> Option {char_idx} ({opts})")

except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cur.close()
    conn.close()
