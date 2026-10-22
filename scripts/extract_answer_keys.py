import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

# Let's inspect answer key pages 86 to 92
# Render them to tmp_pages/answer_key_p{p}.jpg
import os
os.makedirs('tmp_answer_keys', exist_ok=True)

for p in range(86, 93):
    page = doc[p - 1]
    pix = page.get_pixmap(dpi=150)
    pix.save(f'tmp_answer_keys/ans_p{p:02d}.jpg')

print("Saved answer keys for pages 86-92")
