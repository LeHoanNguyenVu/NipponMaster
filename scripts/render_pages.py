import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/40. Kanji Master N1 New ver.pdf'
doc = fitz.open(pdf_path)
out_dir = 'scripts/phase5_renders'
os.makedirs(out_dir, exist_ok=True)

# Indices to render:
# 191: bpage 198 (Achievement test 23-26 p1)
# 192: bpage 199 (Achievement test 23-26 p2)
# 193: bpage 200 (Quiz 23-26 p1: shiritori, odd radical, katakana, medical)
# 194: bpage 201 (Quiz 23-26 p2: novel 妻の逆襲)
# 201: bpage 208 (Review 27-29 p1)
# 202: bpage 209 (Review 27-29 p2)
# 203: bpage 210 (Matome test p1)
# 204: bpage 211 (Matome test p2)
# 210: bpage 217 (Review 30)
# 211: bpage 218 (Special readings p1)
# 212: bpage 219 (Special readings p2)
# 235, 236, 237: Answer pages

target_indices = [191, 192, 193, 194, 201, 202, 203, 204, 210, 211, 212, 235, 236, 237]

mat = fitz.Matrix(2.0, 2.0) # 2x zoom for crisp image cropping
for idx in target_indices:
    page = doc[idx]
    pix = page.get_pixmap(matrix=mat)
    out_path = os.path.join(out_dir, f"idx_{idx}_bpage_{idx+7}.png")
    pix.save(out_path)
    print(f"Rendered idx {idx} -> {out_path} ({pix.width}x{pix.height})")

