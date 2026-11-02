import fitz # pymupdf
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/40. Kanji Master N1 New ver.pdf'
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# Search for pages mentioning 23章 or 23章〜26章 or クイズ or まとめテスト
for i in range(len(doc)):
    text = doc[i].get_text()
    for kw in ["23章", "24章", "25章", "26章", "27章", "28章", "29章", "30章", "アチーブメントテスト", "クイズ", "まとめテスト", "特別な読み方"]:
        if kw in text:
            first_line = text.split("\n")[0] if text else ""
            # print page index and some text
            # only print relevant pages (from page 170 onwards)
            if i >= 170:
                print(f"Page idx {i} (p.{i+1}): matched '{kw}' -> {repr(first_line[:50])}")
            break

