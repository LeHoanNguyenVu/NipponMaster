import sys
import pymupdf
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '漢字マスター_pdf/toaz.info-kanji-masuta-n4-pdf-pr_5f191254a51ccc0e3885ce84df88426b.pdf'
doc = pymupdf.open(pdf_path)

# Let's inspect pages that correspond to each chapter's intro
# Ch 1: page 6 (Book p7: 1章 1 家族)
# Ch 2: page 19 (Book p28: 2章 1 レジ)
# Let's check which pages have the intro drawings for Ch 3..9
# Let's check all pages that have an illustration between y: 20% and 80%

print("Extracting high-res intro pages...")
import os
os.makedirs('frontend/public/assets/kanji/n4/illustrations', exist_ok=True)
os.makedirs('frontend/public/assets/kanji/n4/minigames', exist_ok=True)

# 1. Chapter 1 intro (Page 6)
p1 = doc[5] # 0-indexed 5 = page 6
pix1 = p1.get_pixmap(dpi=200)
img1 = Image.frombytes('RGB', [pix1.width, pix1.height], pix1.samples)
img1.save('frontend/public/assets/kanji/n4/illustrations/chap1_mnemonics_full.webp', 'WEBP', quality=95)
img1.save('frontend/public/assets/kanji/n4/illustrations/chap1_sub1_full.webp', 'WEBP', quality=95)
print("Saved clean scanned Chapter 1 intro: chap1_mnemonics_full.webp")

# 2. Chapter 2 intro (Page 19)
p2 = doc[18] # 0-indexed 18 = page 19
pix2 = p2.get_pixmap(dpi=200)
img2 = Image.frombytes('RGB', [pix2.width, pix2.height], pix2.samples)
img2.save('frontend/public/assets/kanji/n4/illustrations/chap2_sub1_full.webp', 'WEBP', quality=95)
print("Saved clean scanned Chapter 2 intro: chap2_sub1_full.webp")

# Also crop the scenario illustrations for Chapter 2 minigames from Page 19!
# In img2:
w2, h2 = img2.size
# Scenario drawing is in the middle (y: 28% to 78%, x: 12% to 88%)
conbini_scenario = img2.crop((int(w2 * 0.12), int(h2 * 0.28), int(w2 * 0.88), int(h2 * 0.80)))
conbini_scenario.save('frontend/public/assets/kanji/n4/minigames/chap2_conbini_register.webp', 'WEBP', quality=95)
conbini_scenario.save('frontend/public/assets/kanji/n4/minigames/chap2_conbini_scenario.webp', 'WEBP', quality=95)

# Also crop the 24h store building (y: 52% to 80%) for Minigame 2
conbini_24h = img2.crop((int(w2 * 0.15), int(h2 * 0.52), int(w2 * 0.85), int(h2 * 0.80)))
conbini_24h.save('frontend/public/assets/kanji/n4/minigames/chap2_conbini_24hours.webp', 'WEBP', quality=95)
print("Saved authentic Chapter 2 minigame scenario illustrations!")
