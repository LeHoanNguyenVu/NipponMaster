import sys
import os
import io
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = r"d:\Japanese Project\漢字マスター_pdf\Kanji master N3.pdf"
PUB_DIR = r"d:\Japanese Project\frontend\public\assets\kanji\n3"
DIST_DIR = r"d:\Japanese Project\frontend\dist\assets\kanji\n3"

# Target directories
DIRS = ["quizzes", "reviews", "achievement_tests", "illustrations"]
for d in DIRS:
    os.makedirs(os.path.join(PUB_DIR, d), exist_ok=True)
    os.makedirs(os.path.join(DIST_DIR, d), exist_ok=True)

doc = pymupdf.open(PDF_PATH)
print(f"Loaded N3 PDF: {len(doc)} pages")

def get_clean_page_image(page_num):
    """
    Extracts raw scanner image from PDF page (2104x3011),
    and rotates 180 degrees because the PDF scan orientation is 180.
    """
    page = doc[page_num - 1]
    img_list = page.get_images()
    if img_list:
        xref = img_list[0][0]
        base = doc.extract_image(xref)
        raw_bytes = base["image"]
        img = Image.open(io.BytesIO(raw_bytes))
        if page.rotation == 180:
            img = img.rotate(180, expand=True)
        return img
    else:
        pix = page.get_pixmap(dpi=300)
        return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

def save_webp(img, rel_path, quality=90):
    pub_path = os.path.join(PUB_DIR, rel_path)
    dist_path = os.path.join(DIST_DIR, rel_path)
    os.makedirs(os.path.dirname(pub_path), exist_ok=True)
    os.makedirs(os.path.dirname(dist_path), exist_ok=True)
    
    img.save(pub_path, format="WEBP", quality=quality, method=4)
    img.save(dist_path, format="WEBP", quality=quality, method=4)
    size_kb = os.path.getsize(pub_path) // 1024
    print(f"  [SAVED] {rel_path} -> {img.size} ({size_kb} KB)")

# ==============================================================================
# 1. CHAPTER INTROS (Full-page first page scans for all 20 chapters)
# ==============================================================================
print("\n" + "=" * 80)
print("1. EXTRACTING CHAPTER INTROS (Chapters 1 ~ 20)")
print("=" * 80)

CHAPTER_INTROS = [
    (1, 8),    # 1章 生活
    (2, 14),   # 2章 家
    (3, 24),   # 3章 料理
    (4, 30),   # 4章 病院
    (5, 40),   # 5章 スポーツ
    (6, 46),   # 6章 感情
    (7, 56),   # 7章 結婚
    (8, 62),   # 8章 関係
    (9, 68),   # 9章 単位
    (10, 74),  # 10章 学校
    (11, 80),  # 11章 受験
    (12, 92),  # 12章 授業
    (13, 98),  # 13章 地球
    (14, 108), # 14章 旅行
    (15, 114), # 15章 交通
    (16, 124), # 16章 仕事
    (17, 130), # 17章 会議
    (18, 140), # 18章 会社
    (19, 146), # 19章 産業
    (20, 152), # 20章 法律
]

for ch_num, page_num in CHAPTER_INTROS:
    img = get_clean_page_image(page_num)
    save_webp(img, f"illustrations/chap{ch_num}_intro.webp")

# ==============================================================================
# 2. CHAPTER REVIEWS (復習 - Full pages for all 19 chapter reviews)
# ==============================================================================
print("\n" + "=" * 80)
print("2. EXTRACTING CHAPTER REVIEWS (復習 1章 ~ 20章)")
print("=" * 80)

CHAPTER_REVIEWS = [
    (1, 13),   # 1章 復習
    (2, 19),   # 2章 復習
    (3, 29),   # 3章 復習
    (4, 35),   # 4章 復習
    (5, 45),   # 5章 復習
    (6, 51),   # 6章 復習
    (7, 61),   # 7章 復習
    (8, 67),   # 8章 復習
    (10, 79),  # 10章 復習
    (11, 85),  # 11章 復習
    (12, 97),  # 12章 復習
    (13, 103), # 13章 復習
    (14, 113), # 14章 復習
    (15, 119), # 15章 復習
    (16, 129), # 16章 復習
    (17, 135), # 17章 復習
    (18, 144), # 18章 復習
    (19, 151), # 19章 復習
    (20, 157), # 20章 復習
]

for ch_num, page_num in CHAPTER_REVIEWS:
    img = get_clean_page_image(page_num)
    save_webp(img, f"reviews/chap{ch_num}_review.webp")

# ==============================================================================
# 3. ACHIEVEMENT TESTS & SUMMARY TESTS (Full test pages)
# ==============================================================================
print("\n" + "=" * 80)
print("3. EXTRACTING ACHIEVEMENT TESTS & SUMMARY TESTS")
print("=" * 80)

ACHIEVEMENT_TESTS = [
    (20, "achievement_tests/test_1_2_p1.webp"),
    (21, "achievement_tests/test_1_2_p2.webp"),
    (36, "achievement_tests/test_3_4_p1.webp"),
    (37, "achievement_tests/test_3_4_p2.webp"),
    (52, "achievement_tests/test_5_6_p1.webp"),
    (53, "achievement_tests/test_5_6_p2.webp"),
    (70, "achievement_tests/test_7_9_p1.webp"),
    (71, "achievement_tests/test_7_9_p2.webp"),
    (86, "achievement_tests/test_10_11_p1.webp"),
    (87, "achievement_tests/test_10_11_p2.webp"),
    (90, "achievement_tests/midterm_1_11_p1.webp"),
    (91, "achievement_tests/midterm_1_11_p2.webp"),
    (104, "achievement_tests/test_12_13_p1.webp"),
    (105, "achievement_tests/test_12_13_p2.webp"),
    (120, "achievement_tests/test_14_15_p1.webp"),
    (121, "achievement_tests/test_14_15_p2.webp"),
    (136, "achievement_tests/test_16_17_p1.webp"),
    (137, "achievement_tests/test_16_17_p2.webp"),
    (158, "achievement_tests/test_18_20_p1.webp"),
    (159, "achievement_tests/test_18_20_p2.webp"),
    (162, "achievement_tests/final_12_20_p1.webp"),
    (163, "achievement_tests/final_12_20_p2.webp"),
]

for page_num, rel_path in ACHIEVEMENT_TESTS:
    img = get_clean_page_image(page_num)
    save_webp(img, rel_path)

# ==============================================================================
# 4. QUIZZES (Full-page quiz scans across all 9 Quiz chapters)
# ==============================================================================
print("\n" + "=" * 80)
print("4. EXTRACTING FULL-PAGE QUIZZES")
print("=" * 80)

FULL_QUIZZES = [
    (22, "quizzes/quiz_1_2_p1.webp"),
    (23, "quizzes/quiz_1_2_p2.webp"),
    (38, "quizzes/quiz_3_4_p1.webp"),
    (39, "quizzes/quiz_3_4_p2.webp"),
    (54, "quizzes/quiz_5_6_p1.webp"),
    (55, "quizzes/quiz_5_6_p2.webp"),
    (72, "quizzes/quiz_7_9_p1.webp"),
    (73, "quizzes/quiz_7_9_p2.webp"),
    (88, "quizzes/quiz_10_11_p1.webp"),
    (89, "quizzes/quiz_10_11_p2.webp"),
    (106, "quizzes/quiz_12_13_p1.webp"),
    (107, "quizzes/quiz_12_13_p2.webp"),
    (122, "quizzes/quiz_14_15_p1.webp"),
    (123, "quizzes/quiz_14_15_p2.webp"),
    (138, "quizzes/quiz_16_17_p1.webp"),
    (139, "quizzes/quiz_16_17_p2.webp"),
    (160, "quizzes/quiz_18_20_p1.webp"),
    (161, "quizzes/quiz_18_20_p2.webp"),
]

for page_num, rel_path in FULL_QUIZZES:
    img = get_clean_page_image(page_num)
    save_webp(img, rel_path)

# ==============================================================================
# 5. CROPPED SITUATIONAL PUZZLE GRAPHICS (High-interest minigames & realia)
# ==============================================================================
print("\n" + "=" * 80)
print("5. EXTRACTING CROPPED SITUATIONAL PUZZLE GRAPHICS")
print("=" * 80)

# Coordinates format: (page_num, rel_path, (left_ratio, top_ratio, right_ratio, bottom_ratio))
CROPPED_PUZZLES = [
    # Quiz 1・2
    (22, "quizzes/quiz_1_2_interview.webp", (0.05, 0.40, 0.95, 0.95)),
    (23, "quizzes/quiz_1_2_crossword.webp", (0.05, 0.46, 0.95, 0.95)),

    # Quiz 3・4
    (38, "quizzes/quiz_3_4_drinking_dialogue.webp", (0.05, 0.12, 0.95, 0.95)),
    (39, "quizzes/quiz_3_4_doctor_patient.webp", (0.05, 0.12, 0.95, 0.44)),
    (39, "quizzes/quiz_3_4_shortcake_recipe.webp", (0.05, 0.42, 0.95, 0.95)),

    # Quiz 5・6
    (55, "quizzes/quiz_5_6_baseball_article.webp", (0.05, 0.12, 0.95, 0.95)),

    # Quiz 7~9
    (73, "quizzes/quiz_7_9_cooking_interview.webp", (0.05, 0.12, 0.95, 0.55)),
    (73, "quizzes/quiz_7_9_wedding_letter.webp", (0.05, 0.55, 0.95, 0.95)),

    # Quiz 10・11
    (88, "quizzes/quiz_10_11_library_rules.webp", (0.05, 0.12, 0.95, 0.43)),
    (88, "quizzes/quiz_10_11_parttime_interview.webp", (0.05, 0.43, 0.95, 0.95)),
    (89, "quizzes/quiz_10_11_brain_health_check.webp", (0.05, 0.46, 0.95, 0.95)),

    # Quiz 12・13
    (106, "quizzes/quiz_12_13_word_search1.webp", (0.05, 0.48, 0.95, 0.95)),
    (107, "quizzes/quiz_12_13_word_search2.webp", (0.05, 0.12, 0.95, 0.46)),
    (107, "quizzes/quiz_12_13_science_museum.webp", (0.05, 0.46, 0.95, 0.95)),

    # Quiz 14・15
    (122, "quizzes/quiz_14_15_house_map.webp", (0.05, 0.12, 0.95, 0.60)),
    (123, "quizzes/quiz_14_15_europe_tour.webp", (0.05, 0.12, 0.95, 0.95)),

    # Quiz 16・17
    (139, "quizzes/quiz_16_17_job_ad.webp", (0.05, 0.12, 0.95, 0.54)),
    (139, "quizzes/quiz_16_17_student_career_advice.webp", (0.05, 0.54, 0.95, 0.95)),

    # Quiz 18~20
    (160, "quizzes/quiz_18_20_dream_jobs.webp", (0.05, 0.45, 0.95, 0.95)),
    (161, "quizzes/quiz_18_20_industry_diary.webp", (0.05, 0.12, 0.95, 0.53)),
    (161, "quizzes/quiz_18_20_pm_policy.webp", (0.05, 0.53, 0.95, 0.95)),
]

for page_num, rel_path, (left, top, right, bottom) in CROPPED_PUZZLES:
    img = get_clean_page_image(page_num)
    w, h = img.size
    box = (int(w * left), int(h * top), int(w * right), int(h * bottom))
    cropped = img.crop(box)
    save_webp(cropped, rel_path)

print("\n" + "=" * 80)
print("EXTRACT N3 ASSETS COMPLETED SUCCESSFULLY!")
print("=" * 80)
