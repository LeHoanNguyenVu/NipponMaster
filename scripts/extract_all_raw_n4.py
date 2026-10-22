import sys
import os
import io
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

def extract_raw_page(pdf_page_num):
    """Extracts the pure un-annotated full scan image from the PDF page."""
    page = doc[pdf_page_num - 1]
    for img_info in page.get_images():
        xref = img_info[0]
        base = doc.extract_image(xref)
        if base["width"] > 1500:
            raw_bytes = base["image"]
            return Image.open(io.BytesIO(raw_bytes))
    # Fallback to pixmap if no large image
    pix = page.get_pixmap(dpi=180)
    return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

def save_image(img, rel_path):
    pub_full = os.path.join(pub_base, rel_path)
    dist_full = os.path.join(dist_base, rel_path)
    
    # Save as full-page uncropped WebP with high quality
    img.save(pub_full, format="WEBP", quality=90, method=4)
    img.save(dist_full, format="WEBP", quality=90, method=4)
    print(f"Saved: {rel_path} -> {img.size} ({os.path.getsize(pub_full) // 1024} KB)")

print("=" * 80)
print("1. EXTRACTING 100% UN-CROPPED FULL-PAGE CHAPTER INTROS")
print("=" * 80)

CHAPTER_INTROS = [
    (1, 9),    # Book p6
    (2, 31),   # Book p28
    (3, 53),   # Book p50
    (4, 75),   # Book p72
    (5, 99),   # Book p96
    (6, 121),  # Book p118
    (7, 143),  # Book p140
    (8, 165),  # Book p162
    (9, 187),  # Book p184
]

for ch_num, pdf_p in CHAPTER_INTROS:
    img = extract_raw_page(pdf_p)
    save_image(img, f"illustrations/chap{ch_num}_intro.webp")
    save_image(img, f"illustrations/chap{ch_num}_sub1_full.webp")
    if ch_num == 1:
        save_image(img, "illustrations/chap1_mnemonics_full.webp")

print("\n" + "=" * 80)
print("2. EXTRACTING 100% UN-CROPPED FULL-PAGE MINIGAMES")
print("=" * 80)

MINIGAMES = [
    (29, "minigames/chap1_game1_family_tree.webp"),    # Book p26
    (50, "minigames/chap2_conbini_24hours.webp"),      # Book p47
    (51, "minigames/chap2_conbini_register.webp"),     # Book p48
    (73, "minigames/chap3_takkyubin_slip.webp"),       # Book p70
    (95, "minigames/chap4_dating_cinema.webp"),        # Book p92
    (119, "minigames/chap5_station_train.webp"),       # Book p116 (Quiz)
    (99, "minigames/chap5_hospital_pharmacy.webp"),    # Book p96 (Station)
    (141, "minigames/chap6_ramen_menu.webp"),          # Book p138 (Quiz)
    (121, "minigames/chap6_student_party.webp"),       # Book p118 (Research)
    (163, "minigames/chap7_weather_forecast.webp"),    # Book p160 (Quiz)
    (155, "minigames/chap7_travel_journey.webp"),      # Book p152 (Travel)
    (185, "minigames/chap8_exam_answer_sheet.webp"),   # Book p182 (Quiz)
    (177, "minigames/chap8_politics_history.webp"),    # Book p174 (Social)
    (207, "minigames/chap9_nature_picnic.webp"),       # Book p204 (Picnic Quiz)
    (206, "minigames/chap9_sports_festival.webp"),     # Book p203 (Drive reading)
]

for pdf_p, rel_path in MINIGAMES:
    img = extract_raw_page(pdf_p)
    save_image(img, rel_path)

print("\n" + "=" * 80)
print("3. EXTRACTING 100% UN-CROPPED FULL-PAGE CHAPTER REVIEWS")
print("=" * 80)

REVIEWS = [
    (1, 30),   # Book p27
    (2, 52),   # Book p49
    (3, 74),   # Book p71
    (4, 96),   # Book p93
    (5, 120),  # Book p117
    (6, 142),  # Book p139
    (7, 164),  # Book p161
    (8, 186),  # Book p183
    (9, 208),  # Book p205
]

for ch_num, pdf_p in REVIEWS:
    img = extract_raw_page(pdf_p)
    save_image(img, f"reviews/chap{ch_num}_review.webp")
    save_image(img, f"reviews/chap{ch_num}_review_p11.webp")

print("\nALL RAW UNWATERMARKED FULL-PAGE SCANS EXTRACTED SUCCESSFULLY!")
