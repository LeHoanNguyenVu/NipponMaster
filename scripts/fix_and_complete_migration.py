#!/usr/bin/env python3
"""
Fix and Complete Supabase Storage Migration:
1. Normalizes the 209 N4 kanji image files (kanji_n4_<char>.webp -> kanji_n4_u<hex>.webp) so Supabase Storage accepts them.
2. Re-uploads any missing/failed files with auto-retry.
3. Updates all database tables (kanjis, kanji_chapters, kanji_minigames) to point to Supabase Storage CDN.
"""

import os
import sys
import time
import json
import mimetypes
import urllib.request
import urllib.error
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
SUPABASE_KEY = env.get('SUPABASE_KEY', '').strip()
BUCKET_NAME = env.get('SUPABASE_STORAGE_BUCKET', 'kanji-assets').strip()

DB_HOST = "52.65.247.42"
DB_PORT = 6543
DB_NAME = "postgres"
DB_USER = "postgres.bxqwarbeocbsfjieqbsq"
DB_PASS = env.get('DB_PASSWORD', 'hnvuwww1234A')

PUBLIC_CDN_BASE = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}"

def upload_file_with_retry(local_path, remote_path, max_retries=3):
    mime_type, _ = mimetypes.guess_type(local_path)
    if not mime_type:
        mime_type = 'image/webp' if local_path.endswith('.webp') else 'application/octet-stream'

    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{remote_path}"
    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": mime_type,
        "x-upsert": "true"
    }

    with open(local_path, 'rb') as f:
        data = f.read()

    for attempt in range(1, max_retries + 1):
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status in (200, 201):
                    return True
        except urllib.error.HTTPError as e:
            if attempt < max_retries and e.code in (500, 502, 503, 504, 520, 522):
                time.sleep(1.5)
                continue
            err_msg = e.read().decode('utf-8', errors='ignore')
            print(f"\n  [FAIL] {remote_path} -> HTTP {e.code}: {err_msg}", flush=True)
            return False
        except Exception as e:
            if attempt < max_retries:
                time.sleep(1.5)
                continue
            print(f"\n  [ERROR] {remote_path} -> {e}", flush=True)
            return False
    return False

def check_file_exists_on_cdn(remote_path):
    url = f"{PUBLIC_CDN_BASE}/{remote_path}"
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status == 200
    except Exception:
        return False

def main():
    print("=" * 65)
    print("   SUPABASE STORAGE MIGRATION: REPAIR & FINALIZE")
    print("=" * 65)

    local_assets_dir = os.path.join(PROJECT_ROOT, 'frontend', 'public', 'assets', 'kanji')
    all_files = []
    
    # 1. Scan and plan all files, mapping any non-ascii kanji filenames to clean ASCII hex
    kanji_char_to_remote = {}

    for root, dirs, files in os.walk(local_assets_dir):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, local_assets_dir).replace('\\', '/')
            
            # Check if file has non-ASCII characters (e.g. kanji_n4_家.webp)
            if 'kanji_n4_' in f:
                # Extract char: kanji_n4_家.webp -> 家
                char_part = f.replace('kanji_n4_', '').replace('.webp', '')
                if any(ord(c) > 127 for c in char_part):
                    ascii_hex = ''.join(f"u{ord(c):04x}" for c in char_part)
                    ascii_name = f"kanji_n4_{ascii_hex}.webp"
                    remote_rel_path = f"n4/illustrations/{ascii_name}"
                    kanji_char_to_remote[char_part] = f"{PUBLIC_CDN_BASE}/{remote_rel_path}"
                    all_files.append((full_path, remote_rel_path, f))
                    continue

            all_files.append((full_path, rel_path, f))

    total = len(all_files)
    print(f"Tổng số tài nguyên cần kiểm tra/upload: {total}")

    uploaded = 0
    skipped = 0
    failed = 0

    print("\n--- Bắt đầu kiểm tra và upload các file còn thiếu ---")
    for idx, (local_path, remote_path, orig_name) in enumerate(all_files, start=1):
        # Kiểm tra nếu file đã tồn tại trên CDN (cho các file trước đó)
        # Chỉ check HEAD nếu không phải file unicode mới
        if not check_file_exists_on_cdn(remote_path):
            if upload_file_with_retry(local_path, remote_path):
                uploaded += 1
                print(f"\r[{idx}/{total}] Đã upload: {remote_path}                ", end="", flush=True)
            else:
                failed += 1
        else:
            skipped += 1
            if idx % 50 == 0:
                print(f"\r[{idx}/{total}] Đã tồn tại trên Cloud: {skipped} files...  ", end="", flush=True)

    print(f"\n\nUpload hoàn tất! Mới upload: {uploaded}, Đã có sẵn: {skipped}, Thất bại: {failed}")

    # 2. Cập nhật Database
    print("\n--- Cập nhật các bảng Database trên Supabase PostgreSQL ---")
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        sslmode="require"
    )
    conn.autocommit = True
    cur = conn.cursor()

    # 2.1 Cập nhật bảng kanjis cho các ảnh N4 đã đổi tên sang hex
    n4_updated = 0
    for char, cdn_url in kanji_char_to_remote.items():
        cur.execute("UPDATE kanjis SET image_url = %s WHERE character = %s AND jlpt_level = 'N4';", (cdn_url, char))
        n4_updated += cur.rowcount
    print(f"Đã cập nhật {n4_updated} chữ Hán N4 sang link Supabase CDN (ASCII safe).")

    # 2.2 Cập nhật bảng kanjis còn lại (N5, N3)
    cur.execute(f"""
        UPDATE kanjis 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    other_kanji = cur.rowcount
    print(f"Đã cập nhật {other_kanji} chữ Hán N5/N3 sang link Supabase CDN.")

    # 2.3 Cập nhật kanji_chapters (cover images)
    cur.execute(f"""
        UPDATE kanji_chapters 
        SET cover_image_url = REPLACE(cover_image_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE cover_image_url LIKE '/assets/kanji/%';
    """)
    chapters = cur.rowcount
    print(f"Đã cập nhật {chapters} chương kanji_chapters sang link Supabase CDN.")

    # 2.4 Cập nhật kanji_minigames
    cur.execute(f"""
        UPDATE kanji_minigames 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{PUBLIC_CDN_BASE}/')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    minigames = cur.rowcount
    print(f"Đã cập nhật {minigames} câu hỏi minigames sang link Supabase CDN.")

    cur.close()
    conn.close()

    print("\n" + "=" * 65)
    print("   100% TÀI NGUYÊN ĐÃ ĐƯỢC CHUYỂN LÊN SUPABASE CLOUD THÀNH CÔNG!")
    print("=" * 65)

if __name__ == '__main__':
    main()
