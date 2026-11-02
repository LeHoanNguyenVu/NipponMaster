import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))

for ch in range(23, 31):
    exs = [e for e in data['exercises'] if e['chapter_number'] == ch]
    print(f"=== Ch {ch} ({len(exs)} exercises) ===")
    for e in exs[:5]:
        print(f"  {e['display_order']}. [{e['exercise_type']}] {e['question_text']} -> {e['correct_answer']}")

