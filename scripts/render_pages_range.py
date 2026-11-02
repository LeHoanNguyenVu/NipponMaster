import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/40. Kanji Master N1 New ver.pdf'
doc = fitz.open(pdf_path)
out_dir = 'scripts/phase5_renders'
os.makedirs(out_dir, exist_ok=True)

mat = fitz.Matrix(2.0, 2.0)
for idx in range(205, 215):
    pix = doc[idx].get_pixmap(matrix=mat)
    out_path = os.path.join(out_dir, f"idx_{idx}.png")
    pix.save(out_path)
    print(f"Rendered idx {idx}")

