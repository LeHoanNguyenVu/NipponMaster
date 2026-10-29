#!/usr/bin/env python3
"""
Upload All 40 Cropped Authentic Minigame Images to Supabase Storage CDN
And Update kanji_minigames table with exact crop image URLs!
"""

import os
import sys
import io
import time
import urllib.request
import psycopg2
from PIL import Image

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
SUPABASE_KEY = env.get('SUPABASE_KEY', '').strip()
BUCKET_NAME = env.get('SUPABASE_STORAGE_BUCKET', 'kanji-assets').strip()
DB_HOST = "52.65.247.42"
DB_PORT = 6543
DB_NAME = "postgres"
DB_USER = "postgres.bxqwarbeocbsfjieqbsq"
DB_PASS = env.get('DB_PASSWORD', 'hnvuwww1234A')
PUBLIC_CDN_BASE = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}"

CROPS_DIR = os.path.join(PROJECT_ROOT, 'temp_all_crops')

def upload_webp(local_png_path, remote_path, quality=88):
    im = Image.open(local_png_path)
    buf = io.BytesIO()
    im.save(buf, format="WEBP", quality=quality, method=4)
    data = buf.getvalue()

    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{remote_path}"
    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": "image/webp",
        "x-upsert": "true"
    }

    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    for attempt in range(1, 4):
        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status in (200, 201):
                    size_kb = len(data) // 1024
                    print(f"  [UPLOADED] {remote_path} ({size_kb} KB)", flush=True)
                    return True
        except Exception as e:
            if attempt < 3:
                time.sleep(1)
                continue
            print(f"  [ERROR] {remote_path} -> {e}", flush=True)
            return False
    return False

def main():
    print("=" * 65)
    print("   UPLOADING 40 DEDICATED EXERCISE CROPS TO SUPABASE CDN")
    print("=" * 65)

    files = sorted([f for f in os.listdir(CROPS_DIR) if f.endswith('.png')])
    uploaded_urls = {}

    for f in files:
        base_name = f.replace('.png', '')
        local_path = os.path.join(CROPS_DIR, f)
        remote_path = f"n2/quizzes/crops/{base_name}.webp"
        ok = upload_webp(local_path, remote_path)
        if ok:
            uploaded_urls[base_name] = f"{PUBLIC_CDN_BASE}/{remote_path}"

    print(f"\nSuccessfully uploaded {len(uploaded_urls)}/40 crops.")

    print("\nConnecting to PostgreSQL to update kanji_minigames...")
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

    cur.execute("SELECT id, chapter_number FROM kanji_chapters WHERE jlpt_level = 'N2' ORDER BY chapter_number;")
    ch_rows = cur.fetchall()
    ch_map = {r[1]: r[0] for r in ch_rows}

    updated_count = 0
    for ch_num, ch_id in ch_map.items():
        cur.execute("SELECT id, display_order, title FROM kanji_minigames WHERE chapter_id = %s ORDER BY display_order;", (ch_id,))
        games = cur.fetchall()
        for g_id, order, title in games:
            crop_key = f"ch{ch_num:02d}_g{order}"
            crop_url = uploaded_urls.get(crop_key)
            if crop_url:
                cur.execute("UPDATE kanji_minigames SET image_url = %s WHERE id = %s;", (crop_url, g_id))
                updated_count += 1
                print(f"  Ch {ch_num:02d} Game {order}: {title[:35]}... -> {crop_key}.webp")

    print(f"\nUpdated {updated_count} minigames with exact dedicated crop URLs!")
    conn.close()

if __name__ == '__main__':
    main()
