import sys
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect the headers of all 92 pages in tmp_scanned_map
# Each intro page has a prominent circle or large text with "X章" in the top-left or top
# And a horizontal strip at the bottom with the kanji characters!
# Remember in find_all_kanji_strip_pages.py, we found:
# Strips detected on pages: ['p01', 'p02', 'p06', 'p09', 'p15', 'p19', 'p24', 'p37', 'p47', 'p56', 'p62', 'p69', 'p74', 'p77', 'p84']
# But let's check ALL 92 pages for:
# 1. Circle with "1章", "2章", "3章", "4章", "5章", "6章", "7章", "8章", "9章"
# 2. "クイズ" in the header!

# Let's save a contact sheet or crop top 25% of each page to inspect
import os
os.makedirs('tmp_page_headers', exist_ok=True)

for p in range(1, 93):
    img = Image.open(f'tmp_scanned_map/page_{p:02d}.jpg')
    w, h = img.size
    top = img.crop((0, 0, w, int(h * 0.28)))
    top.save(f'tmp_page_headers/top_p{p:02d}.jpg')

print("Saved top 28% of all 92 pages.")
