import json, sys
sys.stdout.reconfigure(encoding='utf-8')

seed = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
from collections import Counter
c = Counter(m['chapter_number'] for m in seed['minigames'])
for ch in range(1, 31):
    mgs = [m for m in seed['minigames'] if m['chapter_number'] == ch]
    print(f"Ch {ch}: {len(mgs)} minigames -> {[m['title'] for m in mgs]}")

