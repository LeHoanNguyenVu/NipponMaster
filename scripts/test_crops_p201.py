import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im_p201 = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')
w, h = im_p201.size
print(f"p201 size: {w}x{h}")

# The novel box:
# Top header 【5】: y ~ 140
# Box rect: x roughly 130 to 950, y roughly 170 to 1350
# Column split: center is around x ~ 515
# Part 1 (Right): x from 510 to 950, y from 140 to 1380
# Part 2 (Left): x from 130 to 520, y from 140 to 1380

crop_ch27 = im_p201.crop((510, 130, 950, 1380))
crop_ch28 = im_p201.crop((130, 130, 530, 1380))

crop_ch27.save('scripts/phase5_renders/test_ch27.webp', 'WEBP', quality=95)
crop_ch28.save('scripts/phase5_renders/test_ch28.webp', 'WEBP', quality=95)
print("Saved crops for p201")

