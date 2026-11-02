import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Coordinates for:
# idx_193_bpage_200.png (size: 1032 x 1457)
# Let's inspect vertical divisions:
# Header: 0 - 200
# 【1】: ~200 - 450
# 【2】: ~450 - 850
# 【3】: ~850 - 1050
# 【4】: ~1050 - 1400

im_p200 = Image.open('scripts/phase5_renders/idx_193_bpage_200.png')
w, h = im_p200.size
print(f"p200 size: {w}x{h}")

# Let's crop p200 sections
# Margin left: ~100, right: ~930
crop_ch24 = im_p200.crop((80, 190, 950, 470)) # 【1】
crop_ch25 = im_p200.crop((80, 470, 950, 850)) # 【2】
crop_ch23 = im_p200.crop((80, 850, 950, 1070)) # 【3】
crop_ch26 = im_p200.crop((80, 1070, 950, 1400)) # 【4】

crop_ch24.save('scripts/phase5_renders/test_ch24.webp', 'WEBP', quality=95)
crop_ch25.save('scripts/phase5_renders/test_ch25.webp', 'WEBP', quality=95)
crop_ch23.save('scripts/phase5_renders/test_ch23.webp', 'WEBP', quality=95)
crop_ch26.save('scripts/phase5_renders/test_ch26.webp', 'WEBP', quality=95)
print("Saved crops for p200")

