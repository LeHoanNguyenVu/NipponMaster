#!/usr/bin/env python3
"""
Extract Kanji Master N2 Assets and Upload directly to Supabase Cloud Storage
"""

import os
import sys
import io
import time
import urllib.request
import urllib.error
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(PROJECT_ROOT, '漢字マスター_pdf', 'Kanji-N2-masta-1.pdf')
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

doc = pymupdf.open(PDF_PATH)
print(f"Loaded N2 PDF: {len(doc)} pages")

def get_page_image(page_num, dpi=200):
    """Render page as clean high-res image."""
    page = doc[page_num - 1]
    pix = page.get_pixmap(dpi=dpi)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return img

def upload_webp_to_supabase(img, remote_path, quality=85):
    """Convert PIL image to WebP buffer and upload directly to Supabase Storage."""
    buf = io.BytesIO()
    img.save(buf, format="WEBP", quality=quality, method=4)
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
    print("   KANJI MASTER N2: ASSET EXTRACTION & CLOUD UPLOAD")
    print("=" * 65)

    # 1. Chapter Intros (18 chapters)
    chapter_intros = [
        (1, 10), (2, 16), (3, 26), (4, 32), (5, 42), (6, 48),
        (7, 58), (8, 64), (9, 72), (10, 78), (11, 94), (12, 100),
        (13, 112), (14, 118), (15, 130), (16, 138), (17, 146), (18, 154)
    ]
    print("\n--- 1. Processing 18 Chapter Intros ---")
    for ch, pnum in chapter_intros:
        img = get_page_image(pnum)
        upload_webp_to_supabase(img, f"n2/illustrations/chap{ch}_intro.webp")

    # 2. Reviews (18 chapters)
    chapter_reviews = [
        (1, 15), (2, 21), (3, 31), (4, 37), (5, 47), (6, 53),
        (7, 62), (8, 67), (9, 76), (10, 84), (11, 99), (12, 106),
        (13, 116), (14, 125), (15, 137), (16, 141), (17, 152), (18, 157)
    ]
    print("\n--- 2. Processing 18 Chapter Review Pages ---")
    for ch, pnum in chapter_reviews:
        img = get_page_image(pnum)
        upload_webp_to_supabase(img, f"n2/reviews/chap{ch}_review.webp")

    # 3. Quizzes (9 periodic quizzes)
    quizzes = [
        ("quiz_1_2_p1", 24), ("quiz_1_2_p2", 25),
        ("quiz_3_4_p1", 40), ("quiz_3_4_p2", 41),
        ("quiz_5_6_p1", 56), ("quiz_5_6_p2", 57),
        ("quiz_7_8_p1", 70), ("quiz_7_8_p2", 71),
        ("quiz_9_10_p1", 88), ("quiz_9_10_p2", 89),
        ("quiz_11_12_p1", 110), ("quiz_11_12_p2", 111),
        ("quiz_13_14_p1", 128), ("quiz_13_14_p2", 129),
        ("quiz_15_16_p1", 144), ("quiz_15_16_p2", 145),
        ("quiz_17_18_p1", 160), ("quiz_17_18_p2", 161),
    ]
    print("\n--- 3. Processing 9 Minigame / Quiz Pages ---")
    for name, pnum in quizzes:
        img = get_page_image(pnum)
        upload_webp_to_supabase(img, f"n2/quizzes/{name}.webp")

    # 4. Achievement Tests (9 tests + 2 comprehensive exams)
    tests = [
        ("test_1_2_p1", 22), ("test_1_2_p2", 23),
        ("test_3_4_p1", 38), ("test_3_4_p2", 39),
        ("test_5_6_p1", 54), ("test_5_6_p2", 55),
        ("test_7_8_p1", 68), ("test_7_8_p2", 69),
        ("test_9_10_p1", 86), ("test_9_10_p2", 87),
        ("midterm_kihon_p1", 90), ("midterm_kihon_p2", 91),
        ("test_11_12_p1", 108), ("test_11_12_p2", 109),
        ("test_13_14_p1", 126), ("test_13_14_p2", 127),
        ("test_15_16_p1", 142), ("test_15_16_p2", 143),
        ("test_17_18_p1", 158), ("test_17_18_p2", 159),
        ("final_chosen_p1", 164), ("final_chosen_p2", 165),
    ]
    print("\n--- 4. Processing Achievement Tests & Comprehensive Exams ---")
    for name, pnum in tests:
        img = get_page_image(pnum)
        upload_webp_to_supabase(img, f"n2/achievement_tests/{name}.webp")

    print("\n" + "=" * 65)
    print("   HOÀN TẤT TRÍCH XUẤT VÀ TẢI TOÀN BỘ ẢNH N2 LÊN SUPABASE CLOUD!")
    print("=" * 65)

if __name__ == '__main__':
    main()
