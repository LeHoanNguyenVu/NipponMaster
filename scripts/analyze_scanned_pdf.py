import sys
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

# Let's inspect the page numbers and headers of all 92 pages
# Usually each page has a header at the top and footer at the bottom
print(f"Total pages: {len(doc)}")
