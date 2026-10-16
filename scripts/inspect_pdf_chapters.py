import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import pymupdf
from PIL import Image

doc = pymupdf.open('漢字マスター_pdf/N5 - Kanji master Bản nét.pdf')
print("Total pages in PDF:", len(doc))

from extract_kanji_n5_assets import CHAPTERS

scratch_dir = "C:/Users/Admin/.gemini/antigravity-ide/brain/34f3145f-a358-4f70-b40d-335c6e48207f/scratch"
os.makedirs(scratch_dir, exist_ok=True)

# Render Chapter 13 pages (intro and following pages)
# In CHAPTERS: chapter 13: intro_page = 114, review_page = 119, minigames = [120, 121]
for p in range(114, 122):
    pix = doc[p - 1].get_pixmap(dpi=150)
    out_img = os.path.join(scratch_dir, f"page_{p}.png")
    pix.save(out_img)
    print(f"Saved page_{p}.png ({pix.width}x{pix.height})")

print("Done rendering sample pages.")
