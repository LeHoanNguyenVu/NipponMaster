import sys
import os
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

pub_dir = 'frontend/public/assets/kanji/n4/minigames'
dist_dir = 'frontend/dist/assets/kanji/n4/minigames'
os.makedirs(pub_dir, exist_ok=True)
os.makedirs(dist_dir, exist_ok=True)

def save_dual(im, name):
    p1 = os.path.join(pub_dir, name)
    p2 = os.path.join(dist_dir, name)
    im.save(p1, 'WEBP', quality=95)
    im.save(p2, 'WEBP', quality=95)
    print(f"Saved {name}: {im.size}")

def extract_pdf_page(page_1based, target_name):
    page = doc[page_1based - 1]
    pix = page.get_pixmap(dpi=200)
    im = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    save_dual(im, target_name)

print("=== 1. EXTRACT CLEAN SCANNED PAGES FOR CH 1, 2, 3, 4, 7, 8, 9 ===")
# Chapter 1: Book p26 (Family tree quiz)
extract_pdf_page(17, 'chap1_game1_family_tree.webp')

# Chapter 2: Book p47 (Conbini 24 hours passage & 20-box table)
extract_pdf_page(31, 'chap2_conbini_24hours.webp')

# Chapter 3: Book p70 (Envelope address quiz)
extract_pdf_page(47, 'chap3_takkyubin_slip.webp')

# Chapter 4: Book p92 (Dating riddles & restaurant conversation)
extract_pdf_page(52, 'chap4_dating_cinema.webp')

# Chapter 7:
# Game 1: Book p146 (Weather forecast symbols) -> PDF p56
extract_pdf_page(56, 'chap7_weather_forecast.webp')
# Game 2: Book p152 (World travel & photo journey) -> PDF p62
extract_pdf_page(62, 'chap7_travel_journey.webp')

# Chapter 8:
# Game 1: Book p168 (Exam room & test sheet) -> PDF p69
extract_pdf_page(69, 'chap8_exam_answer_sheet.webp')
# Game 2: Book p174 (Social studies & history/politics) -> PDF p74
extract_pdf_page(74, 'chap8_politics_history.webp')

# Chapter 9:
# Game 1: Book p204 (Nature picnic quiz painting) -> PDF p85
extract_pdf_page(85, 'chap9_nature_picnic.webp')
# Game 2: Book p203 (Autumn drive reading passage & 20-box table) -> PDF p84
extract_pdf_page(84, 'chap9_sports_festival.webp')


print("\n=== 2. CLEANLY CROPPING CHAPTER 5 & 6 SCENARIOS (0 FINGER) ===")
# Chapter 5 Game 1: Train station platform
im_c5_s1 = Image.open('frontend/public/assets/kanji/n4/illustrations/chap5_sub1_illus.webp')
w, h = im_c5_s1.size
# The finger is at the left edge between x=0 and x=w*0.06
crop_c5_s1 = im_c5_s1.crop((int(w * 0.05), int(h * 0.04), int(w * 0.96), int(h * 0.98)))
save_dual(crop_c5_s1, 'chap5_station_train.webp')

# Chapter 5 Game 2: Hospital & clinic
im_c5_s3 = Image.open('frontend/public/assets/kanji/n4/illustrations/chap5_sub3_illus.webp')
w, h = im_c5_s3.size
crop_c5_s3 = im_c5_s3.crop((int(w * 0.06), int(h * 0.04), int(w * 0.96), int(h * 0.98)))
save_dual(crop_c5_s3, 'chap5_hospital_pharmacy.webp')

# Chapter 6 Game 1: Ramen shop
im_c6_s3 = Image.open('frontend/public/assets/kanji/n4/illustrations/chap6_sub3_illus.webp')
w, h = im_c6_s3.size
crop_c6_s3 = im_c6_s3.crop((int(w * 0.07), int(h * 0.04), int(w * 0.96), int(h * 0.98)))
save_dual(crop_c6_s3, 'chap6_ramen_menu.webp')

# Chapter 6 Game 2: Student research & campus life
im_c6_s1 = Image.open('frontend/public/assets/kanji/n4/illustrations/chap6_sub1_illus.webp')
w, h = im_c6_s1.size
crop_c6_s1 = im_c6_s1.crop((int(w * 0.07), int(h * 0.04), int(w * 0.96), int(h * 0.98)))
save_dual(crop_c6_s1, 'chap6_student_party.webp')

print("\nAll minigame assets prepared cleanly and synced!")
