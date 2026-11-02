import fitz
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/40. Kanji Master N1 New ver.pdf'
doc = fitz.open(pdf_path)

# Let's inspect pages from idx 203 to 215
for idx in range(203, 216):
    page = doc[idx]
    # Check page rect
    print(f"Index {idx} corresponds to book page roughly {idx+7}")

