#!/usr/bin/env python3
"""
Supabase Storage Migration Script
Uploads all 648 local kanji assets from frontend/public/assets/kanji/ to Supabase Storage,
and updates database image_url records to point directly to Supabase Public CDN.
"""

import os
import sys
import glob
import mimetypes
import urllib.request
import urllib.error
import urllib.parse
import json
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

def ensure_bucket_exists():
    """Ensure the target bucket exists in Supabase Storage with public access."""
    url = f"{SUPABASE_URL}/storage/v1/bucket"
    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    }
    
    # Check if bucket exists
    req = urllib.request.Request(f"{url}/{BUCKET_NAME}", headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                print(f"[OK] Bucket '{BUCKET_NAME}' already exists.")
                return True
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='ignore')
        if e.code == 404 or "Bucket not found" in err_body or "NoSuchBucket" in err_body:
            print(f"[INFO] Bucket '{BUCKET_NAME}' does not exist. Creating it as PUBLIC...")
            payload = json.dumps({
                "id": BUCKET_NAME,
                "name": BUCKET_NAME,
                "public": True,
                "file_size_limit": None,
                "allowed_mime_types": None
            }).encode('utf-8')
            create_req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
            try:
                with urllib.request.urlopen(create_req) as create_resp:
                    if create_resp.status in (200, 201):
                        print(f"[SUCCESS] Bucket '{BUCKET_NAME}' created successfully.")
                        return True
            except urllib.error.HTTPError as ce:
                c_err = ce.read().decode('utf-8', errors='ignore')
                print(f"[ERROR] Failed to create bucket ({ce.code}): {c_err}")
                return False
            except Exception as ce:
                print(f"[ERROR] Failed to create bucket: {ce}")
                return False
        else:
            print(f"[ERROR] Error checking bucket status ({e.code}): {err_body}")
            return False
    return True

def upload_file(local_path, remote_path):
    """Upload a single file to Supabase Storage with upsert enabled."""
    mime_type, _ = mimetypes.guess_type(local_path)
    if not mime_type:
        if local_path.endswith('.webp'):
            mime_type = 'image/webp'
        else:
            mime_type = 'application/octet-stream'

    encoded_path = urllib.parse.quote(remote_path, safe='/')
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{encoded_path}"
    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": mime_type,
        "x-upsert": "true"
    }

    with open(local_path, 'rb') as f:
        data = f.read()

    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status in (200, 201)
    except urllib.error.HTTPError as e:
        print(f"\n  [FAIL] {remote_path} -> HTTP {e.code}: {e.read().decode('utf-8', errors='ignore')}", flush=True)
        return False
    except Exception as e:
        print(f"\n  [ERROR] {remote_path} -> {e}", flush=True)
        return False

def update_database_urls():
    """Update all database image_url paths to point directly to Supabase Public CDN."""
    public_cdn_prefix = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/"
    print("\n--- Connecting to Supabase PostgreSQL Database ---")
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

    # 1. Update kanjis table
    cur.execute(f"""
        UPDATE kanjis 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{public_cdn_prefix}')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    kanji_updated = cur.rowcount
    print(f"Updated {kanji_updated} rows in 'kanjis' table.")

    # 2. Update kanji_chapters table
    cur.execute(f"""
        UPDATE kanji_chapters 
        SET cover_image_url = REPLACE(cover_image_url, '/assets/kanji/', '{public_cdn_prefix}')
        WHERE cover_image_url LIKE '/assets/kanji/%';
    """)
    chapters_updated = cur.rowcount
    print(f"Updated {chapters_updated} rows in 'kanji_chapters' table.")

    # 3. Update kanji_minigames table
    cur.execute(f"""
        UPDATE kanji_minigames 
        SET image_url = REPLACE(image_url, '/assets/kanji/', '{public_cdn_prefix}')
        WHERE image_url LIKE '/assets/kanji/%';
    """)
    mg_updated = cur.rowcount
    print(f"Updated {mg_updated} rows in 'kanji_minigames' table.")

    cur.close()
    conn.close()
    print("Database URLs successfully migrated to Supabase Storage CDN!")

def main():
    global SUPABASE_KEY
    print("=" * 65)
    print("       NIPPON MASTER: SUPABASE STORAGE ASSET MIGRATION")
    print("=" * 65)

    if not SUPABASE_KEY:
        print("\n[!] SUPABASE_KEY chưa được cấu hình trong .env!")
        print("Vui lòng lấy 'service_role' secret key (hoặc anon key) từ Supabase:")
        print("Supabase Dashboard -> Settings -> API -> Project API keys")
        if len(sys.argv) > 1:
            SUPABASE_KEY = sys.argv[1].strip()
        else:
            SUPABASE_KEY = input("\nNhập SUPABASE_KEY (hoặc service_role key): ").strip()
        if not SUPABASE_KEY:
            print("Không có API key, tiến trình dừng lại.")
            sys.exit(1)

    print(f"\nSupabase URL : {SUPABASE_URL}")
    print(f"Target Bucket: {BUCKET_NAME}")

    # Ensure bucket exists
    if not ensure_bucket_exists():
        print("[FAIL] Không thể kết nối hoặc khởi tạo bucket trên Supabase Storage.")
        sys.exit(1)

    # Scan all local assets
    local_assets_dir = os.path.join(PROJECT_ROOT, 'frontend', 'public', 'assets', 'kanji')
    if not os.path.exists(local_assets_dir):
        print(f"[!] Thư mục tài nguyên không tồn tại: {local_assets_dir}")
        sys.exit(1)

    all_files = []
    for root, dirs, files in os.walk(local_assets_dir):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, local_assets_dir).replace('\\', '/')
            all_files.append((full_path, rel_path))

    total = len(all_files)
    print(f"\nTìm thấy tổng cộng {total} file ảnh (.webp) cần đẩy lên Supabase Storage.")
    print("Bắt đầu quá trình upload...")

    success_count = 0
    fail_count = 0

    for idx, (local_path, rel_path) in enumerate(all_files, start=1):
        if upload_file(local_path, rel_path):
            success_count += 1
            print(f"\r[{idx}/{total}] Upload thành công: {rel_path}                ", end="", flush=True)
        else:
            fail_count += 1


    print(f"\n\nUpload hoàn tất: {success_count} thành công, {fail_count} thất bại.")

    if success_count > 0 and fail_count == 0:
        # Update database image_url
        update_database_urls()
        print("\n" + "=" * 65)
        print("   TẤT CẢ TÀI NGUYÊN ĐÃ ĐƯỢC CHUYỂN LÊN SUPABASE CLOUD THÀNH CÔNG!")
        print("=" * 65)
        sample_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/n5/illustrations/chap1_kanji_1.webp"
        print(f"Link mẫu CDN: {sample_url}")
    else:
        print("\n[!] Có lỗi trong quá trình upload, vui lòng kiểm tra lại trước khi cập nhật database.")

if __name__ == '__main__':
    main()
