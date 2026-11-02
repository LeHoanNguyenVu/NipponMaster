import sys, json
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('scripts/data/kanji_n1_seed.json', encoding='utf-8'))

ch_kanji_counts = {23: 37, 24: 30, 25: 24, 26: 29, 27: 7, 28: 14, 29: 14, 30: 21}

for ch, exp_k in ch_kanji_counts.items():
    kanjis = [k for k in data['kanjis'] if k['chapter_number'] == ch]
    vocabs = [v for v in data['vocabularies'] if v['chapter_number'] == ch]
    exs = [e for e in data['exercises'] if e['chapter_number'] == ch]
    print(f"Ch {ch}: kanjis={len(kanjis)} (expected {exp_k}), vocabs={len(vocabs)}, exercises={len(exs)}")
    chars = "".join(k['character'] for k in kanjis)
    print(f"   Characters: {chars}")
    if exs:
        print(f"   Sample exercise: Q1={exs[0]['question_text']} ans={exs[0]['correct_answer']}")

