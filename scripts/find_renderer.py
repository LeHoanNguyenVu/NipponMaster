import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('frontend/src/screens/Kanji.tsx', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'SENTENCE_CLOZE' in line or 'MULTIPLE_CHOICE' in line:
        print(f"Line {i+1}: {line.strip()[:100]}")
