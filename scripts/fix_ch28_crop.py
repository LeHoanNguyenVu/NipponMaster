import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im_p201 = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')
crop28 = im_p201.crop((120, 830, 950, 1400))
crop28.save('scripts/phase5_crops/ch28_g1.webp', 'WEBP', quality=95)
print("Updated ch28_g1.webp")

