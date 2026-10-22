import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect headers for candidate pages
# We want to identify the exact page for Chapter 1, 2, 3, 4, 5, 6, 7, 8, 9
# Let's save a summary contact image of top headers for pages 6, 19, 28, 30, 31, 32, 37, 44, 47, 50, 56, 62, 69, 74, 77
check_pages = [6, 19, 28, 30, 31, 32, 37, 44, 45, 47, 50, 56, 62, 69, 74, 77]
for p in check_pages:
    im = Image.open(f'tmp_scanned_map/page_{p:02d}.jpg')
    w, h = im.size
    top = im.crop((0, 0, w, int(h * 0.22)))
    top.save(f'tmp_scanned_map/top_check_p{p:02d}.png')

print("Saved candidate top checks.")
