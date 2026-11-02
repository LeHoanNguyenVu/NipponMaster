import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')

# Top part of story:
# Header: 120
# Top story runs from y=120 down to y=830 (above "「死因は？」" and answer grid)
crop_top = im.crop((120, 120, 950, 830))
crop_top.save('scripts/phase5_renders/test_novel_part1.webp', 'WEBP', quality=95)

# Bottom part of story ("死因は？" through "つづく..."):
# x runs from ~480 to 950, y from 830 to 1400
crop_bottom = im.crop((480, 830, 950, 1400))
crop_bottom.save('scripts/phase5_renders/test_novel_part2.webp', 'WEBP', quality=95)

print("Saved test_novel_part1 and test_novel_part2")

