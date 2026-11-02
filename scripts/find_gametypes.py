import re

with open('frontend/src/screens/Kanji.tsx', encoding='utf-8') as f:
    text = f.read()

types = set(re.findall(r'gameType === [\'"]([^\'"]+)[\'"]', text) + re.findall(r'case [\'"]([^\'"]+)[\'"]', text))
print("Game types handled in Kanji.tsx:", sorted(list(types)))

