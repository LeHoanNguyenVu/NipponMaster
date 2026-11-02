import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
for mg in data.get('minigames', []):
    if mg['chapter_number'] in [15, 19, 21]:
        print(f"=== Ch {mg['chapter_number']} ===")
        print(f"Game type: {mg['game_type']}")
        print(f"Title: {mg['title']}")
        print(f"Instruction: {mg['instruction']}")
        print(f"Image: {mg['image_url']}")
        print(f"Game data: {json.dumps(mg['game_data'], ensure_ascii=False)[:300]}")

