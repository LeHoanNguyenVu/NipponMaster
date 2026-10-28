#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for Flyway Migration V23: Seed Kanji Master N2 Data
Creates V23__seed_kanji_n2_data.sql and seeds all 18 chapters, 505 kanjis,
vocabulary, exercises, minigames, and achievement tests into PostgreSQL (Supabase).
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import psycopg2

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_SQL = os.path.join(BASE_DIR, 'backend', 'src', 'main', 'resources', 'db', 'migration', 'V23__seed_kanji_n2_data.sql')

# Import data modules
from data_n2_chapters import CHAPTERS_DATA, CHAPTER_VOCABS
from data_n2_kanjis import KANJIS_DATA
from data_n2_exercises import CHAPTER_EXERCISES, CHAPTER_MINIGAMES, ACHIEVEMENT_TESTS_DATA


def generate_sql():
    sql = []
    sql.append("-- =============================================================================")
    sql.append("-- Flyway Migration: V23 - Seed 100% Authentic Kanji Master N2 Full Dataset")
    sql.append("-- 18 Chapters (基本編 & 挑戦編), 505 Kanjis, Chapter Vocab, Exercises, Minigames & Tests")
    sql.append("-- =============================================================================")
    sql.append("")

    # 1. Chapters
    sql.append("-- 1. SEED 18 CHƯƠNG KANJI MASTER N2")
    sql.append("INSERT INTO kanji_chapters (chapter_number, jlpt_level, title_ja, title_vi, title_en, kanji_count, display_order, illustration_url, description) VALUES")
    ch_rows = []
    for ch in CHAPTERS_DATA:
        tja = ch['title_ja'].replace("'", "''")
        tvi = ch['title_vi'].replace("'", "''")
        ten = ch['title_en'].replace("'", "''")
        desc = ch['description'].replace("'", "''")
        ch_rows.append(f"({ch['chapter_number']}, 'N2', '{tja}', '{tvi}', '{ten}', {ch['kanji_count']}, {ch['display_order']}, '{ch['illustration_url']}', '{desc}')")
    sql.append(",\n".join(ch_rows))
    sql.append("ON CONFLICT (jlpt_level, chapter_number) DO UPDATE SET")
    sql.append("    title_ja = EXCLUDED.title_ja,")
    sql.append("    title_vi = EXCLUDED.title_vi,")
    sql.append("    title_en = EXCLUDED.title_en,")
    sql.append("    kanji_count = EXCLUDED.kanji_count,")
    sql.append("    display_order = EXCLUDED.display_order,")
    sql.append("    illustration_url = EXCLUDED.illustration_url,")
    sql.append("    description = EXCLUDED.description;\n")

    # 2. Kanjis
    sql.append("-- 2. SEED 505 KANJIS LEVEL N2")
    sql.append("DO $$")
    sql.append("DECLARE")
    declarations = [f"v_ch{i}_id BIGINT;" for i in range(1, 19)]
    sql.append("    " + " ".join(declarations))
    sql.append("BEGIN")
    for i in range(1, 19):
        sql.append(f"    SELECT id INTO v_ch{i}_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = {i};")

    sql.append("")
    for k in KANJIS_DATA:
        ch_num, ch_order, char, on_r, kun_r, rom, hanv, mean, strokes, guide, ex_s, ex_r, ex_m, m_title, m_hint, m_icon, img = k
        char_esc = char.replace("'", "''")
        on_esc = on_r.replace("'", "''")
        kun_esc = kun_r.replace("'", "''")
        rom_esc = rom.replace("'", "''")
        hanv_esc = hanv.replace("'", "''")
        mean_esc = mean.replace("'", "''")
        guide_esc = guide.replace("'", "''")
        ex_s_esc = ex_s.replace("'", "''")
        ex_r_esc = ex_r.replace("'", "''")
        ex_m_esc = ex_m.replace("'", "''")
        mt_esc = m_title.replace("'", "''")
        mh_esc = m_hint.replace("'", "''")

        img_sql = f"'{img}'" if img else "NULL"
        sql.append(f"    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES")
        sql.append(f"    ('{char_esc}', '{on_esc}', '{kun_esc}', '{rom_esc}', '{hanv_esc}', '{mean_esc}', {strokes}, '{guide_esc}', '{ex_s_esc}', '{ex_r_esc}', '{ex_m_esc}', 'N2', '{mt_esc}', '{mh_esc}', '{m_icon}', v_ch{ch_num}_id, {ch_order}, {img_sql}, NOW())")
        sql.append("    ON CONFLICT (character) DO UPDATE SET")
        sql.append("        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,")
        sql.append("        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,")
        sql.append("        stroke_guide = EXCLUDED.stroke_guide, example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,")
        sql.append("        example_meaning = EXCLUDED.example_meaning, jlpt_level = 'N2', mnemonic_title = EXCLUDED.mnemonic_title,")
        sql.append("        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon, chapter_id = EXCLUDED.chapter_id,")
        sql.append("        chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;")

    sql.append("END $$;\n")

    # 3. Chapter Vocab
    sql.append("-- 3. SEED KANJI CHAPTER VOCABULARY")
    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num, vocabs in CHAPTER_VOCABS.items():
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;")
        v_rows = []
        for word, reading, romaji, m_vi, m_en, d_order in vocabs:
            w_esc = word.replace("'", "''")
            r_esc = reading.replace("'", "''")
            rom_esc = romaji.replace("'", "''")
            mvi_esc = m_vi.replace("'", "''")
            men_esc = m_en.replace("'", "''")
            v_rows.append(f"(v_ch_id, '{w_esc}', '{r_esc}', '{rom_esc}', '{mvi_esc}', '{men_esc}', {d_order}, NOW())")
        sql.append("        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES\n        " + ",\n        ".join(v_rows) + ";")
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 4. Exercises
    sql.append("-- 4. SEED KANJI EXERCISES (READING & WRITING)")
    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num, exercises in CHAPTER_EXERCISES.items():
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;")
        ex_rows = []
        for etype, qtext, tword, canswer, opt_list, expl, d_order in exercises:
            q_esc = qtext.replace("'", "''")
            tw_esc = tword.replace("'", "''")
            ca_esc = canswer.replace("'", "''")
            opt_json = json.dumps(opt_list, ensure_ascii=False).replace("'", "''")
            ex_esc = expl.replace("'", "''")
            ex_rows.append(f"(v_ch_id, '{etype}', '{q_esc}', '{tw_esc}', '{ca_esc}', '{opt_json}', '{ex_esc}', {d_order}, NOW())")
        sql.append("        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES\n        " + ",\n        ".join(ex_rows) + ";")
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 5. Minigames
    sql.append("-- 5. SEED KANJI MINIGAMES")
    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num, minigames in CHAPTER_MINIGAMES.items():
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N2' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;")
        for gtype, title, inst, img, data_dict, d_order in minigames:
            t_esc = title.replace("'", "''")
            i_esc = inst.replace("'", "''")
            img_esc = img.replace("'", "''")
            d_json = json.dumps(data_dict, ensure_ascii=False).replace("'", "''")
            sql.append("        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES")
            sql.append(f"        (v_ch_id, '{gtype}', '{t_esc}', '{i_esc}', '{img_esc}', '{d_json}', {d_order}, NOW());")
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 6. Achievement Tests
    sql.append("-- 6. SEED N2 ACHIEVEMENT TESTS (STAGES 11 TO 21)")
    sql.append("DELETE FROM kanji_achievement_tests WHERE stage IN (11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21);")
    for t in ACHIEVEMENT_TESTS_DATA:
        stage, title, desc, pass_pct, test_data, disp = t
        title_esc = title.replace("'", "''")
        desc_esc = desc.replace("'", "''")
        data_esc = json.dumps(test_data, ensure_ascii=False).replace("'", "''")
        sql.append("INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES")
        sql.append(f"({stage}, '{title_esc}', '{desc_esc}', {pass_pct}, '{data_esc}', {disp}, NOW());")

    return "\n".join(sql)


def main():
    print("=" * 65)
    print("   GENERATING V23 MIGRATION: KANJI MASTER N2 FULL DATASET")
    print("=" * 65)

    sql_content = generate_sql()
    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write(sql_content)

    print(f"Generated {OUTPUT_SQL} ({len(sql_content):,} bytes, {sql_content.count(chr(10))} lines)")

    # Execute against database
    print("\nConnecting to PostgreSQL (Supabase) to apply migration...")
    conn = psycopg2.connect(
        host='52.65.247.42',
        port=6543,
        dbname='postgres',
        user='postgres.bxqwarbeocbsfjieqbsq',
        password='hnvuwww1234A',
        sslmode='require',
        connect_timeout=20
    )
    conn.autocommit = False
    cur = conn.cursor()

    try:
        print("Executing V23 SQL migration statements...")
        cur.execute(sql_content)
        conn.commit()
        print("  [SUCCESS] V23 migration executed and committed successfully!")
    except Exception as e:
        conn.rollback()
        print(f"  [ERROR] Migration failed: {e}")
        sys.exit(1)

    # Verification queries
    print("\nVerifying Database Counts for N2:")
    cur.execute("SELECT count(*) FROM kanji_chapters WHERE jlpt_level = 'N2';")
    print(f"  - kanji_chapters (N2): {cur.fetchone()[0]} / 18 chapters")

    cur.execute("SELECT count(*) FROM kanjis WHERE jlpt_level = 'N2';")
    print(f"  - kanjis (N2): {cur.fetchone()[0]} kanjis")

    cur.execute("SELECT count(*) FROM kanji_chapter_vocab WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N2');")
    print(f"  - kanji_chapter_vocab (N2): {cur.fetchone()[0]} vocab entries")

    cur.execute("SELECT count(*) FROM kanji_exercises WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N2');")
    print(f"  - kanji_exercises (N2): {cur.fetchone()[0]} exercises")

    cur.execute("SELECT count(*) FROM kanji_minigames WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N2');")
    print(f"  - kanji_minigames (N2): {cur.fetchone()[0]} minigames")

    cur.execute("SELECT count(*) FROM kanji_achievement_tests WHERE stage BETWEEN 11 AND 21;")
    print(f"  - kanji_achievement_tests (N2 Stages 11-21): {cur.fetchone()[0]} tests")

    conn.close()
    print("\n" + "=" * 65)
    print("   ALL PHASE 1 DATABASE MIGRATION REQUIREMENTS COMPLETED!")
    print("=" * 65)


if __name__ == '__main__':
    main()
