#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for Flyway Migration V24: Seed Kanji Master N1 Full Dataset
(Chuẩn giáo trình gốc `40. Kanji Master N1 New ver.pdf`: 30 Chương, 943 Chữ Hán,
3.798 Từ vựng & Yojijukugo, 750 Bài tập, 30 Minigame クイズ & 12 Đề thi Stages 22~33).
Đọc dữ liệu chuẩn hóa từ `scripts/data/kanji_n1_seed.json`, sinh file
`backend/src/main/resources/db/migration/V24__seed_kanji_n1_data.sql`
và thực thi trực tiếp lên cơ sở dữ liệu PostgreSQL (Supabase).
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import psycopg2

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_JSON = os.path.join(BASE_DIR, 'scripts', 'data', 'kanji_n1_seed.json')
OUTPUT_SQL = os.path.join(BASE_DIR, 'backend', 'src', 'main', 'resources', 'db', 'migration', 'V24__seed_kanji_n1_data.sql')


def esc(val, max_len=None):
    if val is None:
        return ""
    s = str(val).strip()
    if max_len and len(s) > max_len:
        s = s[:max_len - 3] + "..."
    return s.replace("'", "''")


def generate_sql(seed):
    sql = []
    sql.append("-- =============================================================================")
    sql.append("-- Flyway Migration: V24 - Seed 100% Authentic Kanji Master N1 Full Dataset")
    sql.append("-- Chuẩn giáo trình `40. Kanji Master N1 New ver.pdf` (Sanshusha):")
    sql.append("-- 30 Chương (必修編 1~14, 熟達編 15~29, 難読編 30), 943 Chữ Hán N1,")
    sql.append("-- 3.798 Từ vựng & Yojijukugo, 750 Bài tập, 30 Minigame クイズ & 12 Đề thi (Stages 22~33)")
    sql.append("-- =============================================================================")
    sql.append("")

    # Đảm bảo constraint UNIQUE theo (jlpt_level, character) để không ghi đè Kanji các cấp dưới
    sql.append("-- 0. CẬP NHẬT RÀNG BUỘC DUY NHẤT THEO (jlpt_level, character) & LÀM SẠCH DỮ LIỆU N1 CŨ")
    sql.append("ALTER TABLE kanjis DROP CONSTRAINT IF EXISTS uq_kanjis_character;")
    sql.append("DO $$")
    sql.append("BEGIN")
    sql.append("    IF NOT EXISTS (")
    sql.append("        SELECT 1 FROM pg_constraint WHERE conname = 'uq_kanjis_level_character'")
    sql.append("    ) THEN")
    sql.append("        ALTER TABLE kanjis ADD CONSTRAINT uq_kanjis_level_character UNIQUE (jlpt_level, character);")
    sql.append("    END IF;")
    sql.append("END $$;")
    sql.append("ALTER TABLE kanji_chapter_vocab ALTER COLUMN meaning_vi TYPE TEXT;")
    sql.append("ALTER TABLE kanji_chapter_vocab ALTER COLUMN meaning_en TYPE TEXT;")
    sql.append("DELETE FROM kanjis WHERE jlpt_level = 'N1';")
    sql.append("")

    # 1. Seed 30 Chapters
    sql.append("-- 1. SEED 30 CHƯƠNG KANJI MASTER N1 (必修編 · 熟達編 · 難読編)")
    sql.append("INSERT INTO kanji_chapters (chapter_number, jlpt_level, title_ja, title_vi, title_en, kanji_count, display_order, illustration_url, description) VALUES")
    ch_rows = []
    for ch in seed["chapters"]:
        tja = esc(ch["title_ja"], 100)
        tvi = esc(ch["title_vi"], 200)
        ten = esc(ch["title_en"], 200)
        desc = esc(ch["description"])
        ill_sql = f"'{esc(ch['illustration_url'])}'" if ch.get("illustration_url") else "NULL"
        ch_rows.append(
            f"({ch['chapter_number']}, 'N1', '{tja}', '{tvi}', '{ten}', {ch['kanji_count']}, {ch['display_order']}, {ill_sql}, '{desc}')"
        )
    sql.append(",\n".join(ch_rows))
    sql.append("ON CONFLICT (jlpt_level, chapter_number) DO UPDATE SET")
    sql.append("    title_ja = EXCLUDED.title_ja,")
    sql.append("    title_vi = EXCLUDED.title_vi,")
    sql.append("    title_en = EXCLUDED.title_en,")
    sql.append("    kanji_count = EXCLUDED.kanji_count,")
    sql.append("    display_order = EXCLUDED.display_order,")
    sql.append("    illustration_url = EXCLUDED.illustration_url,")
    sql.append("    description = EXCLUDED.description;\n")

    # 2. Seed 943 Kanjis
    sql.append("-- 2. SEED 943 KANJIS LEVEL N1 (CHUẨN THỨ TỰ MỤC LỤC 30 CHƯƠNG & MẸO NHỚ CHIẾT TỰ)")
    sql.append("DO $$")
    sql.append("DECLARE")
    declarations = [f"v_ch{i}_id BIGINT;" for i in range(1, 31)]
    sql.append("    " + " ".join(declarations))
    sql.append("BEGIN")
    for i in range(1, 31):
        sql.append(f"    SELECT id INTO v_ch{i}_id FROM kanji_chapters WHERE jlpt_level = 'N1' AND chapter_number = {i};")
    sql.append("")

    for k in seed["kanjis"]:
        ch_num = k["chapter_number"]
        ch_order = k["chapter_order"]
        char_e = esc(k["character"], 10)
        on_e = esc(k["on_reading"], 200)
        kun_e = esc(k["kun_reading"], 200)
        rom_e = esc(k["romaji"], 100)
        hv_e = esc(k["han_viet"], 100)
        mean_e = esc(k["meaning"], 500)
        strokes = int(k["stroke_count"])
        guide_e = esc(k["stroke_guide"], 500)
        rad_e = esc(k["radical"], 50)
        exs_e = esc(k["example_sentence"], 1000)
        exr_e = esc(k["example_romaji"], 1000)
        exm_e = esc(k["example_meaning"], 1000)
        rel_e = esc(k.get("related_words", ""))
        mt_e = esc(k["mnemonic_title"], 200)
        mh_e = esc(k["mnemonic_hint"])
        mi_e = esc(k["mnemonic_icon"], 20)
        img_sql = f"'{esc(k['image_url'])}'" if k.get("image_url") else "NULL"

        sql.append(
            "    INSERT INTO kanjis (character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, stroke_guide, radical, related_words, example_sentence, example_romaji, example_meaning, jlpt_level, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_id, chapter_order, image_url, created_at) VALUES"
        )
        sql.append(
            f"    ('{char_e}', '{on_e}', '{kun_e}', '{rom_e}', '{hv_e}', '{mean_e}', {strokes}, '{guide_e}', '{rad_e}', '{rel_e}', '{exs_e}', '{exr_e}', '{exm_e}', 'N1', '{mt_e}', '{mh_e}', '{mi_e}', v_ch{ch_num}_id, {ch_order}, {img_sql}, NOW())"
        )
        sql.append("    ON CONFLICT (jlpt_level, character) DO UPDATE SET")
        sql.append("        on_reading = EXCLUDED.on_reading, kun_reading = EXCLUDED.kun_reading, romaji = EXCLUDED.romaji,")
        sql.append("        han_viet = EXCLUDED.han_viet, meaning = EXCLUDED.meaning, stroke_count = EXCLUDED.stroke_count,")
        sql.append("        stroke_guide = EXCLUDED.stroke_guide, radical = EXCLUDED.radical, related_words = EXCLUDED.related_words,")
        sql.append("        example_sentence = EXCLUDED.example_sentence, example_romaji = EXCLUDED.example_romaji,")
        sql.append("        example_meaning = EXCLUDED.example_meaning, mnemonic_title = EXCLUDED.mnemonic_title,")
        sql.append("        mnemonic_hint = EXCLUDED.mnemonic_hint, mnemonic_icon = EXCLUDED.mnemonic_icon,")
        sql.append("        chapter_id = EXCLUDED.chapter_id, chapter_order = EXCLUDED.chapter_order, image_url = EXCLUDED.image_url;")

    sql.append("END $$;\n")

    # 3. Seed Chapter Vocabularies (3,798 items)
    sql.append("-- 3. SEED 3.798 TỪ VỰNG HỌC THUẬT, BÁO CHÍ & THÀNH NGỮ 4 CHỮ (YOJIJUKUGO)")
    vocabs_by_ch = {i: [] for i in range(1, 31)}
    for v in seed["vocabularies"]:
        vocabs_by_ch[v["chapter_number"]].append(v)

    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num in range(1, 31):
        vocabs = vocabs_by_ch[ch_num]
        if not vocabs:
            continue
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N1' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_chapter_vocab WHERE chapter_id = v_ch_id;")
        v_rows = []
        for v in vocabs:
            w_e = esc(v["word"], 95)
            r_e = esc(v["reading"], 95)
            rom_e = esc(v["romaji"], 95)
            mvi_e = esc(v["meaning_vi"])
            men_e = esc(v["meaning_en"])
            d_ord = int(v["display_order"])
            v_rows.append(f"(v_ch_id, '{w_e}', '{r_e}', '{rom_e}', '{mvi_e}', '{men_e}', {d_ord}, NOW())")
        sql.append(
            "        INSERT INTO kanji_chapter_vocab (chapter_id, word, reading, romaji, meaning_vi, meaning_en, display_order, created_at) VALUES\n        "
            + ",\n        ".join(v_rows) + ";"
        )
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 4. Seed Exercises (750 items: 25 x 30 chapters)
    sql.append("-- 4. SEED 750 CÂU TRẮC NGHIỆM NGỮ CẢNH & ĐIỀN CHỮ (25 CÂU / CHƯƠNG)")
    ex_by_ch = {i: [] for i in range(1, 31)}
    for ex in seed["exercises"]:
        ex_by_ch[ex["chapter_number"]].append(ex)

    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num in range(1, 31):
        exs = ex_by_ch[ch_num]
        if not exs:
            continue
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N1' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_exercises WHERE chapter_id = v_ch_id;")
        ex_rows = []
        for ex in exs:
            etype = esc(ex["exercise_type"], 20)
            q_e = esc(ex["question_text"])
            tw_e = esc(ex["target_word"], 95)
            ca_e = esc(ex["correct_answer"], 95)
            opt_json = json.dumps(ex["options"], ensure_ascii=False).replace("'", "''")
            expl_e = esc(ex["explanation"])
            d_ord = int(ex["display_order"])
            ex_rows.append(f"(v_ch_id, '{etype}', '{q_e}', '{tw_e}', '{ca_e}', '{opt_json}', '{expl_e}', {d_ord}, NOW())")
        sql.append(
            "        INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at) VALUES\n        "
            + ",\n        ".join(ex_rows) + ";"
        )
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 5. Seed Minigames (30 items)
    sql.append("-- 5. SEED 30 MINIGAME クイズ GẮN ẢNH TRANG BÀI TẬP CHUẨN SÁCH GỐC")
    mg_by_ch = {i: [] for i in range(1, 31)}
    for mg in seed["minigames"]:
        mg_by_ch[mg["chapter_number"]].append(mg)

    sql.append("DO $$")
    sql.append("DECLARE v_ch_id BIGINT; BEGIN")
    for ch_num in range(1, 31):
        mgs = mg_by_ch[ch_num]
        if not mgs:
            continue
        sql.append(f"    SELECT id INTO v_ch_id FROM kanji_chapters WHERE jlpt_level = 'N1' AND chapter_number = {ch_num};")
        sql.append("    IF v_ch_id IS NOT NULL THEN")
        sql.append("        DELETE FROM kanji_minigames WHERE chapter_id = v_ch_id;")
        for mg in mgs:
            gt_e = esc(mg["game_type"], 50)
            t_e = esc(mg["title"], 200)
            inst_e = esc(mg["instruction"])
            img_e = esc(mg.get("image_url", ""), 500)
            gd_json = json.dumps(mg["game_data"], ensure_ascii=False).replace("'", "''")
            d_ord = int(mg["display_order"])
            sql.append("        INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at) VALUES")
            sql.append(f"        (v_ch_id, '{gt_e}', '{t_e}', '{inst_e}', '{img_e}', '{gd_json}', {d_ord}, NOW());")
        sql.append("    END IF;")
    sql.append("END $$;\n")

    # 6. Seed Achievement Tests (Stages 22..33)
    sql.append("-- 6. SEED 12 ĐỀ THI ACHIEVEMENT TEST & まとめテスト KANJI N1 (STAGES 22 TO 33)")
    sql.append("DELETE FROM kanji_achievement_tests WHERE stage BETWEEN 22 AND 33;")
    for t in seed["achievement_tests"]:
        st = int(t["stage"])
        title_e = esc(t["title"], 200)
        desc_e = esc(t["description"])
        pass_pct = int(t["pass_percentage"])
        td_json = json.dumps(t["test_data"], ensure_ascii=False).replace("'", "''")
        disp = int(t["display_order"])
        sql.append("INSERT INTO kanji_achievement_tests (stage, title, description, pass_percentage, test_data_json, display_order, created_at) VALUES")
        sql.append(f"({st}, '{title_e}', '{desc_e}', {pass_pct}, '{td_json}', {disp}, NOW());")

    return "\n".join(sql)


def main():
    print("=" * 72)
    print("   GENERATING V24 MIGRATION: KANJI MASTER N1 (30 CHƯƠNG SÁCH GỐC)")
    print("=" * 72)

    with open(INPUT_JSON, "r", encoding="utf-8") as f:
        seed = json.load(f)

    sql_content = generate_sql(seed)
    with open(OUTPUT_SQL, "w", encoding="utf-8") as f:
        f.write(sql_content)

    print(f"Generated {OUTPUT_SQL} ({len(sql_content):,} bytes, {sql_content.count(chr(10))} lines)")

    print("\nConnecting to PostgreSQL (Supabase) to apply V24 migration...")
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
        print("Executing V24 SQL migration statements...")
        cur.execute(sql_content)
        conn.commit()
        print("  [SUCCESS] V24 migration executed and committed successfully!")
    except Exception as e:
        conn.rollback()
        print(f"  [ERROR] Migration failed: {e}")
        sys.exit(1)

    print("\nVerifying Database Counts for N1:")
    cur.execute("SELECT count(*) FROM kanji_chapters WHERE jlpt_level = 'N1';")
    print(f"  - kanji_chapters (N1):           {cur.fetchone()[0]} / 30 chapters")

    cur.execute("SELECT count(*) FROM kanjis WHERE jlpt_level = 'N1';")
    print(f"  - kanjis (N1):                   {cur.fetchone()[0]} / 943 kanjis")

    cur.execute("SELECT count(*) FROM kanji_chapter_vocab WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N1');")
    print(f"  - kanji_chapter_vocab (N1):      {cur.fetchone()[0]} vocab entries (> 3,500)")

    cur.execute("SELECT count(*) FROM kanji_exercises WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N1');")
    print(f"  - kanji_exercises (N1):          {cur.fetchone()[0]} exercises (25 x 30)")

    cur.execute("SELECT count(*) FROM kanji_minigames WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N1');")
    print(f"  - kanji_minigames (N1):          {cur.fetchone()[0]} minigames")

    cur.execute("SELECT count(*) FROM kanji_achievement_tests WHERE stage BETWEEN 22 AND 33;")
    print(f"  - kanji_achievement_tests (N1):  {cur.fetchone()[0]} tests (Stages 22-33)")

    conn.close()
    print("\n" + "=" * 72)
    print("   ALL PHASE 1.2 DATABASE MIGRATION REQUIREMENTS COMPLETED!")
    print("=" * 72)


if __name__ == "__main__":
    main()
