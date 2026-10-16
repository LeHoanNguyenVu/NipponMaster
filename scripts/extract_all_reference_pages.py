import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import pymupdf

doc = pymupdf.open('漢字マスター_pdf/N5 - Kanji master Bản nét.pdf')

scratch_dir = "C:/Users/Admin/.gemini/antigravity-ide/brain/34f3145f-a358-4f70-b40d-335c6e48207f/scratch"
os.makedirs(os.path.join(scratch_dir, "intros"), exist_ok=True)
os.makedirs(os.path.join(scratch_dir, "minigames"), exist_ok=True)

from extract_kanji_n5_assets import CHAPTERS

for ch in CHAPTERS:
    cnum = ch["chapter"]
    ipage = ch["intro_page"]
    # Save intro page
    pix = doc[ipage - 1].get_pixmap(dpi=150)
    pix.save(os.path.join(scratch_dir, "intros", f"chap{cnum}_intro_p{ipage}.png"))

    # Save minigame pages
    for mp in ch["minigames"]:
        mpix = doc[mp - 1].get_pixmap(dpi=150)
        mpix.save(os.path.join(scratch_dir, "minigames", f"chap{cnum}_mg_p{mp}.png"))

print("Extracted all 15 intro pages and 30 minigame pages to scratch!")
