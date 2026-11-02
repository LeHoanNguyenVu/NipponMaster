import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

out_dir = 'scripts/phase5_crops'
os.makedirs(out_dir, exist_ok=True)

im_p200 = Image.open('scripts/phase5_renders/idx_193_bpage_200.png')
im_p201 = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')
im_p209 = Image.open('scripts/phase5_renders/idx_202_bpage_209.png')
im_p218 = Image.open('scripts/phase5_renders/idx_209.png')

# 1. Ch 23: Katakana association
crop23 = im_p200.crop((80, 840, 950, 1090))
crop23.save(os.path.join(out_dir, 'ch23_g1.webp'), 'WEBP', quality=95)

# 2. Ch 24: Shiritori reading chains
crop24 = im_p200.crop((80, 180, 950, 470))
crop24.save(os.path.join(out_dir, 'ch24_g1.webp'), 'WEBP', quality=95)

# 3. Ch 25: Common radicals
crop25 = im_p200.crop((80, 465, 950, 845))
crop25.save(os.path.join(out_dir, 'ch25_g1.webp'), 'WEBP', quality=95)

# 4. Ch 26: Medical symptoms
crop26 = im_p200.crop((80, 1065, 950, 1420))
crop26.save(os.path.join(out_dir, 'ch26_g1.webp'), 'WEBP', quality=95)

# 5. Ch 27: Novel Part 1 (① - ⑬)
crop27 = im_p201.crop((120, 120, 950, 860))
crop27.save(os.path.join(out_dir, 'ch27_g1.webp'), 'WEBP', quality=95)

# 6. Ch 28: Novel Part 2 (⑭ - ㉑ & answer grid)
crop28 = im_p201.crop((120, 780, 950, 1420))
crop28.save(os.path.join(out_dir, 'ch28_g1.webp'), 'WEBP', quality=95)

# 7. Ch 29: Quý tộc & Thân phận (p.209 【2】)
crop29 = im_p209.crop((70, 140, 960, 760))
crop29.save(os.path.join(out_dir, 'ch29_g1.webp'), 'WEBP', quality=95)

# 8. Ch 30: Đặc biệt Jukujikun (p.218)
crop30 = im_p218.crop((70, 60, 960, 1400))
crop30.save(os.path.join(out_dir, 'ch30_g1.webp'), 'WEBP', quality=95)

print("Generated all 8 crops for Phase 5:")
for f in os.listdir(out_dir):
    p = os.path.join(out_dir, f)
    print(f"  {f}: size={os.path.getsize(p):,} bytes, dimensions={Image.open(p).size}")

