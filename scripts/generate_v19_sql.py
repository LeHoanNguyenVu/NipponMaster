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
cur = conn.cursor()

sql_lines = [
    "-- =============================================================================",
    "-- Flyway Migration: V19 - Seed All Remaining Chapters (Ch 5 to 15) for Kanji N5",
    "-- =============================================================================",
    "",
    "DO $$",
    "DECLARE",
    "    v_ch_id BIGINT;",
    "BEGIN"
]

for ch in range(5, 16):
    cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch,))
    ch_id = cur.fetchone()[0]

    sql_lines.append(f"    -- ==================== CHAPTER {ch} ====================")
    sql_lines.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = {ch};")
    sql_lines.append(f"    IF v_ch_id IS NOT NULL THEN")

    # 1. Image URLs
    cur.execute("SELECT character, image_url FROM kanjis WHERE chapter_id = %s ORDER BY chapter_order;", (ch_id,))
    kanjis = cur.fetchall()
    for char, img in kanjis:
        sql_lines.append(f"        UPDATE kanjis SET image_url = '{img}' WHERE chapter_id = v_ch_id AND character = '{char}';")

    # 2. Cleanup
    sql_lines.append(f"        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;")
    sql_lines.append(f"        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;")
    sql_lines.append(f"        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;")

    # 3. Vocabs
    cur.execute("SELECT word, reading, romaji, meaning_vi, meaning_en, display_order FROM kanji_chapter_vocab WHERE chapter_id = %s ORDER BY display_order;", (ch_id,))
    vocabs = cur.fetchall()
    if vocabs:
        v_rows = []
        for word, reading, romaji, m_vi, m_en, d_order in vocabs:
            w_esc = word.replace("'", "''")
            r_esc = reading.replace("'", "''")
            rom_esc = (romaji or "").replace("'", "''")
            mvi_esc = (m_vi or "").replace("'", "''")
            men_esc = (m_en or "").replace("'", "''")
            v_rows.append(f"(v_ch_id, '{w_esc}', '{r_esc}', '{rom_esc}', '{mvi_esc}', '{men_esc}', {d_order}, NOW())")
        sql_lines.append("        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES\n        " + ",\n        ".join(v_rows) + ";")

    # 4. Exercises
    cur.execute("SELECT exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order FROM kanji_exercises WHERE chapter_id = %s ORDER BY exercise_type, display_order;", (ch_id,))
    exercises = cur.fetchall()
    if exercises:
        ex_rows = []
        for etype, qtext, tword, canswer, opt_json, expl, d_order in exercises:
            q_esc = qtext.replace("'", "''")
            tw_esc = tword.replace("'", "''")
            ca_esc = canswer.replace("'", "''")
            opt_str = json.dumps(opt_json, ensure_ascii=False).replace("'", "''")
            ex_esc = (expl or "").replace("'", "''")
            ex_rows.append(f"(v_ch_id, '{etype}', '{q_esc}', '{tw_esc}', '{ca_esc}', '{opt_str}', '{ex_esc}', {d_order}, NOW())")
        sql_lines.append("        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES\n        " + ",\n        ".join(ex_rows) + ";")

    # 5. Minigames
    cur.execute("SELECT game_type, title, instruction, image_url, game_data_json, display_order FROM kanji_minigames WHERE chapter_id = %s;", (ch_id,))
    games = cur.fetchall()
    for gtype, gtitle, ginst, gimg, gdata, gorder in games:
        gt_esc = gtitle.replace("'", "''")
        gi_esc = (ginst or "").replace("'", "''")
        gm_esc = (gimg or "").replace("'", "''")
        gd_str = json.dumps(gdata, ensure_ascii=False).replace("'", "''")
        sql_lines.append(f"        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES (v_ch_id, '{gtype}', '{gt_esc}', '{gi_esc}', '{gm_esc}', '{gd_str}', {gorder}, NOW());")

    sql_lines.append("    END IF;")
    sql_lines.append("")

sql_lines.append("END $$;")

output_path = 'backend/src/main/resources/db/migration/V19__seed_all_remaining_n5_chapters.sql'
with open(output_path, 'w', encoding='utf-8') as out_f:
    out_f.write("\n".join(sql_lines) + "\n")

print(f"Generated {output_path} successfully!")
cur.close()
conn.close()
