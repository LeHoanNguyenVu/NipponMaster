#!/usr/bin/env python3
"""
Kanji Master N4 - Asset Extraction Pipeline
Extracts high-resolution scenario illustrations, minigame graphics, review tests,
and achievement test pages from '漢字マスター_pdf/Kanji Master N4.pdf' into optimized
WebP assets for the frontend.
"""

import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pymupdf
    from PIL import Image
    import numpy as np
except ImportError as e:
    print(f"Error importing dependencies: {e}")
    sys.exit(1)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(BASE_DIR, '漢字マスター_pdf', 'Kanji Master N4.pdf')
OUTPUT_BASE = os.path.join(BASE_DIR, 'frontend', 'public', 'assets', 'kanji', 'n4')

ILLUSTRATIONS_DIR = os.path.join(OUTPUT_BASE, 'illustrations')
MINIGAMES_DIR = os.path.join(OUTPUT_BASE, 'minigames')
REVIEWS_DIR = os.path.join(OUTPUT_BASE, 'reviews')
TESTS_DIR = os.path.join(OUTPUT_BASE, 'achievement_tests')

# 25 Sub-Lessons across 9 Chapters in Kanji Master N4
SUB_LESSONS = [
    # Chapter 1: 家族の生かつ (Đời sống gia đình)
    {"chap": 1, "sub": 1, "title": "家族", "intro_page": 2, "review_page": 7, "minigame_key": "chap1_family_tree"},
    
    # Chapter 2: コンビニ (Cửa hàng tiện lợi)
    {"chap": 2, "sub": 1, "title": "レジ", "intro_page": 8, "review_page": 13, "minigame_key": "chap2_conbini_register"},
    {"chap": 2, "sub": 2, "title": "店内", "intro_page": 14, "review_page": 19, "minigame_key": "chap2_conbini_atm_copy"},
    {"chap": 2, "sub": 3, "title": "24時間", "intro_page": 20, "review_page": 26, "minigame_key": "chap2_conbini_24hours"},
    
    # Chapter 3: おくり物 (Gửi quà & Bưu phẩm)
    {"chap": 3, "sub": 1, "title": "荷物", "intro_page": 27, "review_page": 32, "minigame_key": "chap3_takkyubin_delivery"},
    {"chap": 3, "sub": 2, "title": "あて先", "intro_page": 33, "review_page": 38, "minigame_key": "chap3_mail_address"},
    {"chap": 3, "sub": 3, "title": "都道府県", "intro_page": 39, "review_page": 44, "minigame_key": "chap3_japan_prefectures"},
    
    # Chapter 4: デート (Hẹn hò & Dạo phố)
    {"chap": 4, "sub": 1, "title": "デート", "intro_page": 45, "review_page": 50, "minigame_key": "chap4_date_appointment"},
    {"chap": 4, "sub": 2, "title": "けっこんきねん日", "intro_page": 51, "review_page": 56, "minigame_key": "chap4_anniversary_gift"},
    {"chap": 4, "sub": 3, "title": "ファッション", "intro_page": 57, "review_page": 62, "minigame_key": "chap4_fashion_boutique"},
    
    # Chapter 5: 町 (Thành phố & Giao thông)
    {"chap": 5, "sub": 1, "title": "駅", "intro_page": 63, "review_page": 68, "minigame_key": "chap5_train_station"},
    {"chap": 5, "sub": 2, "title": "交さてん", "intro_page": 69, "review_page": 74, "minigame_key": "chap5_traffic_crossing"},
    {"chap": 5, "sub": 3, "title": "病院", "intro_page": 75, "review_page": 80, "minigame_key": "chap5_hospital_doctor"},
    
    # Chapter 6: 学生 (Đời sống sinh viên & Đại học)
    {"chap": 6, "sub": 1, "title": "研究", "intro_page": 81, "review_page": 86, "minigame_key": "chap6_research_lab"},
    {"chap": 6, "sub": 2, "title": "合コン", "intro_page": 87, "review_page": 92, "minigame_key": "chap6_student_party"},
    {"chap": 6, "sub": 3, "title": "ラーメン屋", "intro_page": 93, "review_page": 98, "minigame_key": "chap6_ramen_counter"},
    
    # Chapter 7: 春夏秋冬 (Bốn mùa & Thời tiết, Du lịch)
    {"chap": 7, "sub": 1, "title": "きせつ", "intro_page": 99, "review_page": 104, "minigame_key": "chap7_four_seasons"},
    {"chap": 7, "sub": 2, "title": "天気", "intro_page": 105, "review_page": 110, "minigame_key": "chap7_weather_forecast"},
    {"chap": 7, "sub": 3, "title": "旅行", "intro_page": 111, "review_page": 116, "minigame_key": "chap7_travel_sightseeing"},
    
    # Chapter 8: 学校 (Trường học & Thi cử)
    {"chap": 8, "sub": 1, "title": "勉強", "intro_page": 119, "review_page": 124, "minigame_key": "chap8_study_classroom"},
    {"chap": 8, "sub": 2, "title": "テスト", "intro_page": 125, "review_page": 130, "minigame_key": "chap8_exam_test"},
    {"chap": 8, "sub": 3, "title": "社会科", "intro_page": 131, "review_page": 136, "minigame_key": "chap8_social_studies"},
    
    # Chapter 9: 休みのひ (Ngày nghỉ & Hoạt động dã ngoại)
    {"chap": 9, "sub": 1, "title": "運動", "intro_page": 137, "review_page": 142, "minigame_key": "chap9_sports_stadium"},
    {"chap": 9, "sub": 2, "title": "リゾート", "intro_page": 143, "review_page": 148, "minigame_key": "chap9_resort_hotel"},
    {"chap": 9, "sub": 3, "title": "いなか", "intro_page": 149, "review_page": 154, "minigame_key": "chap9_countryside_village"},
]

ACHIEVEMENT_TESTS = [
    {"stage": 1, "title": "achievement_test_stage1", "pages": [117, 118]}
]


def render_page(doc, page_1based, dpi=200):
    """Render a 1-based page index to a PIL RGB Image."""
    idx = page_1based - 1
    if idx < 0 or idx >= len(doc):
        raise ValueError(f"Page {page_1based} out of range (1-{len(doc)})")
    page = doc[idx]
    pix = page.get_pixmap(dpi=dpi)
    return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)


def crop_illustration(img):
    """
    Crop the thematic scenario illustration from an intro page.
    Excludes the header badge and the kanji footer box.
    """
    w, h = img.size
    # Scenario illustration is located in middle y: 0.18 to 0.85, x: 0.05 to 0.95
    mid_crop = img.crop((int(w * 0.05), int(h * 0.18), int(w * 0.95), int(h * 0.85)))
    return mid_crop


def save_webp(img, path, quality=85):
    """Save PIL Image as optimized WebP."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "WEBP", quality=quality, method=6)
    size_kb = os.path.getsize(path) / 1024
    print(f"  -> Saved {os.path.basename(path)} ({img.width}x{img.height}, {size_kb:.1f} KB)")


def main():
    start_time = time.time()
    print("=" * 65)
    print("  KANJI MASTER N4 - ASSET EXTRACTION PIPELINE")
    print(f"  Source PDF : {PDF_PATH}")
    print(f"  Target Base: {OUTPUT_BASE}")
    print("=" * 65)

    if not os.path.exists(PDF_PATH):
        print(f"Error: Source PDF not found at {PDF_PATH}")
        sys.exit(1)

    doc = pymupdf.open(PDF_PATH)
    print(f"Opened PDF with {len(doc)} pages successfully.\n")

    # 1. Extract 25 Full Intro Pages & Scenario Illustrations
    print("[1/4] Extracting Chapter & Lesson Intro Illustrations...")
    for item in SUB_LESSONS:
        ch = item["chap"]
        sub = item["sub"]
        title = item["title"]
        page_num = item["intro_page"]

        full_img = render_page(doc, page_num, dpi=200)
        
        # Save full page
        full_path = os.path.join(ILLUSTRATIONS_DIR, f"chap{ch}_sub{sub}_full.webp")
        save_webp(full_img, full_path)

        # Save cropped scenario illustration
        illus_img = crop_illustration(full_img)
        illus_path = os.path.join(ILLUSTRATIONS_DIR, f"chap{ch}_sub{sub}_illus.webp")
        save_webp(illus_img, illus_path)

    # 2. Extract Minigame Graphics
    print("\n[2/4] Extracting Minigame Scenario Graphics...")
    for item in SUB_LESSONS:
        ch = item["chap"]
        sub = item["sub"]
        key = item["minigame_key"]
        page_num = item["intro_page"]

        full_img = render_page(doc, page_num, dpi=200)
        illus_img = crop_illustration(full_img)
        minigame_path = os.path.join(MINIGAMES_DIR, f"{key}.webp")
        save_webp(illus_img, minigame_path)

    # 3. Extract 25 Review Pages (ふくしゅう)
    print("\n[3/4] Extracting Review Test Pages (ふくしゅう)...")
    for item in SUB_LESSONS:
        ch = item["chap"]
        sub = item["sub"]
        page_num = item["review_page"]

        review_img = render_page(doc, page_num, dpi=200)
        review_path = os.path.join(REVIEWS_DIR, f"chap{ch}_sub{sub}_review_p{page_num}.webp")
        save_webp(review_img, review_path)

    # 4. Extract Achievement Test Pages
    print("\n[4/4] Extracting Achievement Test Pages...")
    for item in ACHIEVEMENT_TESTS:
        name = item["title"]
        for p in item["pages"]:
            test_img = render_page(doc, p, dpi=200)
            test_path = os.path.join(TESTS_DIR, f"{name}_p{p}.webp")
            save_webp(test_img, test_path)

    elapsed = time.time() - start_time
    print("\n" + "=" * 65)
    print(f"SUCCESS: All Kanji N4 assets extracted in {elapsed:.2f}s!")
    print(f"  - Illustrations:      {len(os.listdir(ILLUSTRATIONS_DIR))} files")
    print(f"  - Minigames:          {len(os.listdir(MINIGAMES_DIR))} files")
    print(f"  - Reviews:            {len(os.listdir(REVIEWS_DIR))} files")
    print(f"  - Achievement Tests:  {len(os.listdir(TESTS_DIR))} files")
    print("=" * 65)


if __name__ == '__main__':
    main()
