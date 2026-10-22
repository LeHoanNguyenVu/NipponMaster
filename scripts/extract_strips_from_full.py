import sys
import os
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

dir_path = 'frontend/public/assets/kanji/n4/illustrations'
os.makedirs('tmp_full_strips', exist_ok=True)

for ch in [2, 3, 4, 5, 6, 7, 8, 9]:
    for sub in [1, 2, 3]:
        name = f'chap{ch}_sub{sub}_full.webp'
        p = os.path.join(dir_path, name)
        if os.path.exists(p):
            im = Image.open(p)
            w, h = im.size
            # The bottom kanji strip is around y: 80% to 95%
            strip = im.crop((int(w * 0.05), int(h * 0.82), int(w * 0.95), int(h * 0.95)))
            strip.save(f'tmp_full_strips/chap{ch}_sub{sub}_strip.png')

print("All strips from existing full.webp saved to tmp_full_strips/")
