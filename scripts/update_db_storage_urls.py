#!/usr/bin/env python3
"""
Update Database Records to use Supabase Storage CDN URLs
"""

import os
import sys
import psycopg2

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
SUPABASE_URL = env.get('SUPABASE_URL', 'https://bxqwarbeocbsfjieqbsq.supabase.co').rstrip('/')
BUCKET_NAME = env.get('SUPABASE_STORAGE_BUCKET', 'kanji-assets').strip()

DB_HOST = "52.65.247.42"
DB_PORT = 6543
DB_NAME = "postgres"
DB_USER = "postgres.bxqwarbeocbsfjieqbsq"
DB_PASS = env.get('DB_PASSWORD', 'hnvuwww1234A')

PUBLIC_CDN_BASE = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}"

def main():
    print("=" * 65)
    print("   UPDATING SUPABASE POSTGRESQL IMAGE URLS TO CLOUD CDN")
    print("=" * 65)

    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        sslmode="require",
        connect_timeout=15
    )
    conn.autocommit = True
    cur = conn.cursor()

    # 1. Update N4 kanji images to ASCII-safe unicode hex names:
    # Get all N4 kanji with images
    cur.execute("SELECT id, character, image_url FROM kanjis WHERE jlpt_level = 'N4' AND image_url IS NOT NULL;")
    n4_kanjis = cur.fetchall()
    n4_count = 0
    for kid, char, img_url in n4_kanjis:
        if 'kanji_n4_' in img_url:
            char_hex = ''.join(f"u{ord(c):04x}" for c in char)
            new_url = f"{PUBLIC_CDN_BASE}/n4/illustrations/kanji_n4_{char_hex}.webp"
            cur.execute("UPDATE kanjis SET image_url = %s WHERE id = %s;", (new_url, kid))
            n4_count += cur.rowcount
        elif img_url.startswith('/assets/kanji/'):
            new_url = img_url.replace('/assets/kanji/', f"{PUBLIC_CDN_BASE}/")
            cur.execute("UPDATE kanjis SET image_url = %s WHERE id = %s;", (new_url, kid))
            n4_count += cur.rowcount

    print(f"1. Đã cập nhật {n4_count} ảnh chữ Hán N4 sang link Supabase CDN.")

    # 2. Update remaining kanjis (N5, N3)
    cur.execute(f"""
        UPDATE kanjis 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    print(f"2. Đã cập nhật {cur.rowcount} chữ Hán N5/N3 sang link Supabase CDN.")

    # 3. Update kanji_chapters (illustration_url)
    cur.execute(f"""
        UPDATE kanji_chapters 
        SET illustration_url = REPLACE(illustration_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE illustration_url LIKE '/assets/kanji/%';
    """)
    print(f"3. Đã cập nhật {cur.rowcount} chương trong 'kanji_chapters' sang link Supabase CDN.")


    # 4. Update kanji_minigames
    cur.execute(f"""
        UPDATE kanji_minigames 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    print(f"4. Đã cập nhật {cur.rowcount} minigames trong 'kanji_minigames' sang link Supabase CDN.")

    # 5. Verification sample
    cur.execute("SELECT character, image_url FROM kanjis WHERE jlpt_level='N4' LIMIT 3;")
    print("\n--- Mẫu ảnh N4 sau khi cập nhật ---")
    for row in cur.fetchall():
        print(f"Kanji: {row[0]} -> {row[1]}")

    cur.execute("SELECT character, image_url FROM kanjis WHERE jlpt_level='N5' LIMIT 2;")
    print("\n--- Mẫu ảnh N5 sau khi cập nhật ---")
    for row in cur.fetchall():
        print(f"Kanji: {row[0]} -> {row[1]}")

    cur.execute("SELECT title, image_url FROM kanji_minigames LIMIT 2;")
    print("\n--- Mẫu ảnh Minigame sau khi cập nhật ---")
    for row in cur.fetchall():
        print(f"Game: {row[0]} -> {row[1]}")

    cur.close()
    conn.close()

    print("\n" + "=" * 65)
    print("   HOÀN TẤT 100% CẬP NHẬT DATABASE!")
    print("=" * 65)

if __name__ == '__main__':
    main()
