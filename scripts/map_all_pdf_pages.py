import sys
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

print(f"Total pages in PDF: {len(doc)}")

# On each page, the book page number is printed in the bottom outer margin or top.
# Let's crop the bottom left and bottom right corners of each page, and also top
import os
os.makedirs('scratch/page_corners', exist_ok=True)

for i in range(len(doc)):
    page = doc[i]
    # Check text if any (some might have text)
    txt = page.get_text()
    
    # Save a small strip of bottom (y: 0.93 to 1.0)
    pix = page.get_pixmap(dpi=100)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    w, h = img.size
    
    # Bottom strip
    bottom_strip = img.crop((0, int(h * 0.93), w, h))
    bottom_strip.save(f'scratch/page_corners/p{i+1:02d}_bottom.png')

print("Saved all bottom strips.")
