import sys
import os
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\Japanese Project\漢字マスター_pdf\kanji-master-n4.pdf"
doc = pymupdf.open(pdf_path)

pub_base = r"d:\Japanese Project\frontend\public\assets\kanji\n4"
dist_base = r"d:\Japanese Project\frontend\dist\assets\kanji\n4"

os.makedirs(os.path.join(pub_base, "illustrations"), exist_ok=True)
os.makedirs(os.path.join(pub_base, "minigames"), exist_ok=True)
os.makedirs(os.path.join(pub_base, "reviews"), exist_ok=True)

os.makedirs(os.path.join(dist_base, "illustrations"), exist_ok=True)
os.makedirs(os.path.join(dist_base, "minigames"), exist_ok=True)
os.makedirs(os.path.join(dist_base, "reviews"), exist_ok=True)

def extract_and_save(pdf_page_num, rel_save_path, crop_bottom_pct=0.915, dpi=180):
    page = doc[pdf_page_num - 1]
    pix = page.get_pixmap(dpi=dpi)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    w, h = img.size
    
    # Crop to remove bottom watermark (studeersnel / QR code)
    clean_img = img.crop((0, 0, w, int(h * crop_bottom_pct)))
    
    pub_full = os.path.join(pub_base, rel_save_path)
    dist_full = os.path.join(dist_base, rel_save_path)
    
    clean_img.save(pub_full, format="WEBP", quality=92)
    clean_img.save(dist_full, format="WEBP", quality=92)
    print(f"Extracted PDF P{pdf_page_num:03d} -> {rel_save_path} ({clean_img.width}x{clean_img.height})")

print("=" * 80)
print("1. EXTRACTING CHAPTER INTRODUCTIONS (Chapters 1 to 9)")
print("=" * 80)

# Chapter Intro mappings: (Chapter Number, PDF Page, Book Page, Title)
CHAPTER_INTROS = [
    (1, 9, 6, "1章 1 家族 (Gia đình)"),
    (2, 31, 28, "2章 1 朝/レジ (Conbini)"),
    (3, 53, 50, "3章 1 日記 (Quà tặng)"),
    (4, 75, 72, "4章 1 映画 (Hẹn hò)"),
    (5, 99, 96, "5章 1 駅 (Nhà ga & Phố xá)"),
    (6, 121, 118, "6章 1 研究 (Đại học & Sinh viên)"),
    (7, 143, 140, "7章 1 きせつ (Bốn mùa & Khí hậu)"),
    (8, 165, 162, "8章 1 勉強 (Trường học & Thi cử)"),
    (9, 187, 184, "9章 1 運動 (Ngày nghỉ & Vận động)"),
]

for ch_num, pdf_p, book_p, title in CHAPTER_INTROS:
    # Save as chap{ch_num}_intro.webp
    extract_and_save(pdf_p, f"illustrations/chap{ch_num}_intro.webp")
    # Also save as chap{ch_num}_sub1_full.webp and chap1_mnemonics_full.webp to preserve existing fallbacks
    extract_and_save(pdf_p, f"illustrations/chap{ch_num}_sub1_full.webp")
    if ch_num == 1:
        extract_and_save(pdf_p, "illustrations/chap1_mnemonics_full.webp")

print("\n" + "=" * 80)
print("2. EXTRACTING MINIGAME EXERCISES")
print("=" * 80)

MINIGAMES = [
    # Ch 1
    (29, "minigames/chap1_game1_family_tree.webp"),    # Book p26: 1章 クイズ (Sơ đồ gia phả Tanaka)
    # Ch 2
    (50, "minigames/chap2_conbini_24hours.webp"),      # Book p47: 2章 【3】 Nhịp sống Conbini 24h
    (51, "minigames/chap2_conbini_register.webp"),     # Book p48: 2章 クイズ (Poster Friend Mart)
    # Ch 3
    (73, "minigames/chap3_takkyubin_slip.webp"),       # Book p70: 3章 クイズ (Bì thư bưu điện)
    # Ch 4
    (95, "minigames/chap4_dating_cinema.webp"),        # Book p92: 4章 クイズ (Đố vui hẹn hò & Menu)
    # Ch 5
    (119, "minigames/chap5_station_train.webp"),       # Book p116: 5章 クイズ (Đố màu sắc & Bệnh viện)
    (99, "minigames/chap5_hospital_pharmacy.webp"),    # Book p96: 5章 1 駅 (Sân ga đón tàu điện ngầm)
    # Ch 6
    (141, "minigames/chap6_ramen_menu.webp"),          # Book p138: 6章 クイズ (TKB & Tin nhắn Goukon)
    (121, "minigames/chap6_student_party.webp"),       # Book p118: 6章 1 研究 (Giảng đường & Phòng nghiên cứu)
    # Ch 7
    (163, "minigames/chap7_weather_forecast.webp"),    # Book p160: 7章 クイズ (Tranh 4 mùa)
    (155, "minigames/chap7_travel_journey.webp"),      # Book p152: 7章 3 旅行 (Hành trình du lịch)
    # Ch 8
    (185, "minigames/chap8_exam_answer_sheet.webp"),   # Book p182: 8章 クイズ (Phiếu trắc nghiệm & Đề thi 100 điểm)
    (177, "minigames/chap8_politics_history.webp"),    # Book p174: 8章 3 社会科 (Chính trị & Xã hội học)
    # Ch 9
    (207, "minigames/chap9_nature_picnic.webp"),       # Book p204: 9章 クイズ (Tranh dã ngoại sinh thái thiên nhiên)
    (206, "minigames/chap9_sports_festival.webp"),     # Book p203: 9章 【3】 (Dã ngoại hồ Yamanaka)
]

for pdf_p, rel_path in MINIGAMES:
    extract_and_save(pdf_p, rel_path)

print("\n" + "=" * 80)
print("3. EXTRACTING CHAPTER REVIEW PAGES (Chapters 1 to 9)")
print("=" * 80)

REVIEWS = [
    (1, 30),   # Book p27: 1章 ふくしゅう
    (2, 52),   # Book p49: 2章 ふくしゅう
    (3, 74),   # Book p71: 3章 ふくしゅう
    (4, 96),   # Book p93: 4章 ふくしゅう
    (5, 120),  # Book p117: 5章 ふくしゅう
    (6, 142),  # Book p139: 6章 ふくしゅう
    (7, 164),  # Book p161: 7章 ふくしゅう
    (8, 186),  # Book p183: 8章 ふくしゅう
    (9, 208),  # Book p205: 9章 ふくしゅう
]

for ch_num, pdf_p in REVIEWS:
    extract_and_save(pdf_p, f"reviews/chap{ch_num}_review.webp")
    # Also save as chap{ch_num}_review_p11.webp to support old links if any
    extract_and_save(pdf_p, f"reviews/chap{ch_num}_review_p11.webp")

print("\nExtraction finished successfully!")
