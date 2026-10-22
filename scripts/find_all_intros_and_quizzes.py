import sys
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

# Let's search all pages for each chapter's intro
# Ch 1: p6
# Ch 2: p19
# Let's inspect where Ch 3, 4, 5, 6, 7, 8, 9 intro pages are!
# We can search for the strip at the bottom of the page or the circular icon!

# In our earlier montage:
# p6: 1章 1 家族
# p19: 2章 1 レジ
# p37: 3章 2 あて先 (Wait, where is 3章 1 荷物? Let's check page 32!)
# Let's check page 32: does it have 3章 1 荷物?
# Let's check page 47: 4章 1 デート?
# Let's check page 56: 5章 1 駅?
# Let's check page 62: 6章 1 研究?
# Let's check page 69: 7章 1 きせつ? (Or p67/p68?)
# Let's check page 74: 8章 1 勉強? (Or p73?)
# Let's check page 77: 9章 1 運動?

for p in [6, 18, 19, 31, 32, 37, 45, 46, 47, 50, 55, 56, 61, 62, 67, 68, 69, 73, 74, 76, 77, 82, 85]:
    page = doc[p - 1]
    pix = page.get_pixmap(dpi=150)
    im = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    w, h = im.size
    print(f"Page {p}: size=({w}, {h})")
    # Save preview
    im.resize((400, int(400 * h / w))).save(f'tmp_scanned_map/full_preview_p{p:02d}.jpg')

print("Saved full previews.")
