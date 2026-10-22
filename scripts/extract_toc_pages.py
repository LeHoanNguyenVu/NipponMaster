import sys
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

print(f"Total pages: {len(doc)}")

# TOC is at page 6 and 7 (0-indexed 5 and 6)
# Let's render page 6 and 7 to see the chapters and pages
for p in [5, 6]:
    pix = doc[p].get_pixmap(dpi=150)
    pix.save(f'tmp_toc_p{p+1}.png')
    print(f"Saved TOC page {p+1}")
