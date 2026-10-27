import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image

# Let's inspect quiz_3_4_p1 and quiz_3_4_p2, quiz_5_6_p1, etc.
# We can save small header crops to disk or check
quiz_dir = 'frontend/public/assets/kanji/n3/quizzes'

for name in ['quiz_1_2_p1.webp', 'quiz_1_2_p2.webp', 'quiz_3_4_p1.webp', 'quiz_3_4_p2.webp', 'quiz_5_6_p1.webp', 'quiz_5_6_p2.webp']:
    path = f"{quiz_dir}/{name}"
    im = Image.open(path)
    print(f"{name}: size={im.size}")
