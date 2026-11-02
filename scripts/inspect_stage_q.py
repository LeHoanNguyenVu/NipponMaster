import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
for t in data.get('achievement_tests', []):
    st = t.get('stage')
    if st in [32, 33]:
        questions = t.get('test_data', {}).get('questions', [])
        print(f"Stage {st} first question:", questions[0] if questions else "None")

