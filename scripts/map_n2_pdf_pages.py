import pymupdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc = pymupdf.open('漢字マスター_pdf/Kanji-N2-masta-1.pdf')
print(f"Total pages in N2 PDF: {len(doc)}")

# Check pages 4-10 (Table of Contents / Chapter 1)
# Render text or check structure
for pnum in range(1, 15):
    page = doc[pnum - 1]
    pix = page.get_pixmap(dpi=150)
    print(f"Page {pnum}: size {pix.width}x{pix.height}")

