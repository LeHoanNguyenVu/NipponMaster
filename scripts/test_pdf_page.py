import fitz
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/40. Kanji Master N1 New ver.pdf'
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
page = doc[193] # from summary: idx 193 is page 200 (book page 200)
print(f"Page 193 rect: {page.rect}")
print(f"Page 193 text length: {len(page.get_text())}")
print(f"Images in page 193: {len(page.get_images())}")

