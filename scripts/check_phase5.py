import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
for mg in data.get('minigames', []):
    if mg['chapter_number'] >= 15:
        print(f"Ch {mg['chapter_number']}: {mg['image_url']}")
