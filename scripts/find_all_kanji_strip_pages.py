import sys
import pymupdf
import numpy as np
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

strip_pages = []

for p in range(1, len(doc) + 1):
    page = doc[p - 1]
    pix = page.get_pixmap(dpi=150)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    w, h = img.size
    
    # Strip region is typically around y: 80% to 94%
    strip = img.crop((int(w * 0.08), int(h * 0.80), int(w * 0.92), int(h * 0.94)))
    gray = np.array(strip.convert('L'))
    
    # Check if there are strong horizontal lines across width
    row_means = gray.mean(axis=1)
    dark_rows = np.where(row_means < 200)[0] # at least some darkness
    
    # Let's count vertical dividers: a grid has 7 to 9 vertical lines
    # Vertical projection in middle vertical section
    col_means = gray[10:-10, :].mean(axis=0) if gray.shape[0] > 20 else np.array([])
    if len(col_means) > 0:
        dark_cols = (col_means < 180).sum()
        # If there are sharp vertical peaks
        # Check standard deviation or gradient
        col_std = np.std(col_means)
        if col_std > 12: # varying columns indicates vertical dividers and characters
            # Also verify it's not a text paragraph
            # Save thumbnail for inspection
            strip.save(f'tmp_page_catalog/detected_strip_p{p:02d}.png')
            strip_pages.append(p)
            print(f"Page {p:02d}: col_std={col_std:.1f}")

print(f"Total detected strip pages: {len(strip_pages)}")
print("Pages:", strip_pages)
