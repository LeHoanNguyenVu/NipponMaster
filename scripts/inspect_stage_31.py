import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
for t in data.get('achievement_tests', []):
    if t.get('stage') == 31:
        print(f"Stage 31 title: {t['title']}")
        for q in t['test_data']['questions'][:5]:
            print(q)

