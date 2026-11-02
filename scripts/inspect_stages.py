import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))
for t in data.get('achievement_tests', []):
    st = t.get('stage')
    if st in [32, 33]:
        print(f"=== STAGE {st}: {t.get('title')} ===")
        print(f"Description: {t.get('description')}")
        questions = t.get('test_data', {}).get('questions', [])
        print(f"Question count: {len(questions)}")
        for i, q in enumerate(questions[:3]):
            print(f"  Q{i+1}: {q.get('question_text')} ans={q.get('correct_answer')}")

