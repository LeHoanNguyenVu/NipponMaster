import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im = Image.open('scripts/phase5_renders/idx_194_bpage_201.png')
# Header 【5】: y around 130
# Story box: y around 180 to 570
# Bottom table: y around 570 to 950
# Let's inspect the bounding box of the story:
# Top border of story box: y ~ 185
# Bottom border of story box: y ~ 575
# Left border: x ~ 150
# Right border: x ~ 935

# Let's crop the whole story box to inspect:
crop_story = im.crop((130, 130, 950, 580))
crop_story.save('scripts/phase5_renders/test_story_all.webp', 'WEBP', quality=95)

# Part 1 (Right half: Title to ⑩爽やか / ⑪嫉妬):
# x: from ~ 525 to 950, y from 130 to 580
crop_p1 = im.crop((525, 130, 950, 580))
crop_p1.save('scripts/phase5_renders/test_story_part1.webp', 'WEBP', quality=95)

# Part 2 (Left half: ⑫葛飾区 to ㉑怨み):
# x: from 130 to 535, y from 130 to 580
crop_p2 = im.crop((130, 130, 535, 580))
crop_p2.save('scripts/phase5_renders/test_story_part2.webp', 'WEBP', quality=95)

print("Saved test_story crops")

