import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')
w, h = im.size

# Let's crop from y=120 to y=1000
crop_novel = im.crop((50, 120, 970, 950))
crop_novel.save('scripts/phase5_renders/test_novel_full.webp', 'WEBP', quality=95)

# And let's check p209 【2】 (Ch 29):
im_p209 = Image.open('scripts/phase5_renders/idx_202_bpage_209.png')
# 【2】 is on p209:
# y roughly from 150 to 550
crop_p209 = im_p209.crop((70, 140, 960, 550))
crop_p209.save('scripts/phase5_renders/test_ch29.webp', 'WEBP', quality=95)

# And let's check p218 (Ch 30) - top half of Special Jukujikun table:
im_p218 = Image.open('scripts/phase5_renders/idx_209.png')
# Header & table: y from 70 to 1400
crop_p218 = im_p218.crop((70, 60, 960, 1400))
crop_p218.save('scripts/phase5_renders/test_ch30.webp', 'WEBP', quality=95)

print("Saved test_novel_full, test_ch29, test_ch30")

