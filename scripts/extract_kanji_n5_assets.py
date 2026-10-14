#!/usr/bin/env python3
"""
Asset Extraction Script for Kanji Master N5
Extracts high-resolution illustration, minigame, review, and achievement test pages
from '漢字マスター_pdf/N5 - Kanji master Bản nét.pdf' into WebP assets for the frontend.
"""

import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pymupdf
    from PIL import Image
except ImportError as e:
    print(f"Error importing dependencies: {e}")
    sys.exit(1)

PDF_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '漢字マスター_pdf', 'N5 - Kanji master Bản nét.pdf')
OUTPUT_BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'frontend', 'public', 'assets', 'kanji', 'n5')

ILLUSTRATIONS_DIR = os.path.join(OUTPUT_BASE, 'illustrations')
MINIGAMES_DIR = os.path.join(OUTPUT_BASE, 'minigames')
REVIEWS_DIR = os.path.join(OUTPUT_BASE, 'reviews')
TESTS_DIR = os.path.join(OUTPUT_BASE, 'achievement_tests')

# Chapter metadata configuration
CHAPTERS = [
    {"chapter": 1, "title": "すうじ", "intro_page": 10, "review_page": 18, "minigames": [20, 21]},
    {"chapter": 2, "title": "カレンダー", "intro_page": 22, "review_page": 27, "minigames": [28, 29]},
    {"chapter": 3, "title": "人", "intro_page": 30, "review_page": 35, "minigames": [36, 37]},
    {"chapter": 4, "title": "しぜん-1", "intro_page": 38, "review_page": 43, "minigames": [44, 45]},
    {"chapter": 5, "title": "ばしょ", "intro_page": 46, "review_page": 51, "minigames": [52, 53]},
    {"chapter": 6, "title": "学校-1", "intro_page": 56, "review_page": 61, "minigames": [62, 63]},
    {"chapter": 7, "title": "学校-2", "intro_page": 64, "review_page": 69, "minigames": [70, 71]},
    {"chapter": 8, "title": "かぞく", "intro_page": 72, "review_page": 77, "minigames": [78, 79]},
    {"chapter": 9, "title": "どうし-1", "intro_page": 80, "review_page": 85, "minigames": [86, 87]},
    {"chapter": 10, "title": "たべもの", "intro_page": 88, "review_page": 93, "minigames": [94, 95]},
    {"chapter": 11, "title": "しぜん-2", "intro_page": 98, "review_page": 103, "minigames": [104, 105]},
    {"chapter": 12, "title": "どうし-2", "intro_page": 106, "review_page": 111, "minigames": [112, 113]},
    {"chapter": 13, "title": "町", "intro_page": 114, "review_page": 119, "minigames": [120, 121]},
    {"chapter": 14, "title": "時間", "intro_page": 122, "review_page": 127, "minigames": [128, 129]},
    {"chapter": 15, "title": "けいようし", "intro_page": 130, "review_page": 135, "minigames": [136, 137]},
]

ACHIEVEMENT_TESTS = [
    {"stage": 1, "name": "achievement_test_1", "pages": [54, 55]},
    {"stage": 2, "name": "achievement_test_2", "pages": [96, 97]},
    {"stage": 3, "name": "achievement_test_3", "pages": [138, 139]},
]


def render_and_save_page(doc, book_page_num, output_path, dpi=200, quality=85):
    """Render a book page (1-based index) to a WebP image with optimization."""
    idx = book_page_num - 1
    if idx < 0 or idx >= len(doc):
        print(f"  [ERROR] Page {book_page_num} is out of bounds (0-{len(doc)-1})")
        return False
    
    page = doc[idx]
    pix = page.get_pixmap(dpi=dpi)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "WEBP", quality=quality, method=6)
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  -> Saved {os.path.basename(output_path)} ({img.width}x{img.height}, {size_kb:.1f} KB)")
    return True


def main():
    start_time = time.time()
    print("=" * 60)
    print("KANJI MASTER N5 - ASSET EXTRACTION PIPELINE")
    print(f"Source PDF: {PDF_PATH}")
    print(f"Target Base: {OUTPUT_BASE}")
    print("=" * 60)

    if not os.path.exists(PDF_PATH):
        print(f"Error: PDF file not found at {PDF_PATH}")
        sys.exit(1)

    doc = pymupdf.open(PDF_PATH)
    print(f"Opened PDF with {len(doc)} pages successfully.\n")

    # 1. Extract 15 Chapter Intro Illustrations
    print("[1/4] Extracting Chapter Intro Illustrations (Tranh tuong hinh)...")
    for item in CHAPTERS:
        ch = item["chapter"]
        page = item["intro_page"]
        filename = f"chap{ch}_mnemonics_full.webp"
        out_file = os.path.join(ILLUSTRATIONS_DIR, filename)
        render_and_save_page(doc, page, out_file)

    # 2. Extract Minigame Scenarios
    print("\n[2/4] Extracting Minigame Scenario Graphics...")
    for item in CHAPTERS:
        ch = item["chapter"]
        for page in item["minigames"]:
            filename = f"chap{ch}_minigame_p{page}.webp"
            out_file = os.path.join(MINIGAMES_DIR, filename)
            render_and_save_page(doc, page, out_file)

    # 3. Extract Review Test Pages (ふくしゅう)
    print("\n[3/4] Extracting Review Test Pages (ふくしゅう)...")
    for item in CHAPTERS:
        ch = item["chapter"]
        page = item["review_page"]
        filename = f"chap{ch}_review_p{page}.webp"
        out_file = os.path.join(REVIEWS_DIR, filename)
        render_and_save_page(doc, page, out_file)

    # 4. Extract Achievement Test Pages
    print("\n[4/4] Extracting Achievement Test Pages (Chặng 1, 2, 3)...")
    for item in ACHIEVEMENT_TESTS:
        name = item["name"]
        for page in item["pages"]:
            filename = f"{name}_p{page}.webp"
            out_file = os.path.join(TESTS_DIR, filename)
            render_and_save_page(doc, page, out_file)

    elapsed = time.time() - start_time
    print("\n" + "=" * 60)
    print(f"SUCCESS: All Kanji N5 assets extracted in {elapsed:.2f}s!")
    print(f"Total illustrations: {len(os.listdir(ILLUSTRATIONS_DIR))}")
    print(f"Total minigames: {len(os.listdir(MINIGAMES_DIR))}")
    print(f"Total reviews: {len(os.listdir(REVIEWS_DIR))}")
    print(f"Total achievement tests: {len(os.listdir(TESTS_DIR))}")
    print("=" * 60)


if __name__ == '__main__':
    main()
