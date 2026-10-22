import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== TESTING ROADMAP API ===")
try:
    req = urllib.request.urlopen('http://localhost:8080/api/v1/kanji/n4/roadmap')
    resp = json.loads(req.read().decode('utf-8'))
    data = resp.get('data', resp)
    print("Total chapters returned:", len(data.get('chapters', [])))
    for ch in data.get('chapters', []):
        print(f"Chap {ch.get('chapterNumber')}: ID={ch.get('id')}, kanjiCount={ch.get('kanjiCount')}, isUnlocked={ch.get('isUnlocked')}, titleJa={ch.get('titleJa')} ({ch.get('titleVi')})")
except Exception as e:
    print("Error calling roadmap API:", e)

print("\n=== TESTING CHAPTER 2 DETAIL API ===")
try:
    req = urllib.request.urlopen('http://localhost:8080/api/v1/kanji/chapters/32')
    resp = json.loads(req.read().decode('utf-8'))
    ch2 = resp.get('data', resp)
    print("Chapter 2 kanjis count:", len(ch2.get('kanjis', [])))
    for k in ch2.get('kanjis', [])[:5]:
        print(f"  Kanji: {k.get('character')} -> Image: {k.get('imageUrl')}")
    print("Chapter 2 minigames count:", len(ch2.get('minigames', [])))
    for mg in ch2.get('minigames', []):
        print(f"  Minigame: {mg.get('title')}, data_len: {len(str(mg.get('gameDataJson')))}")
    reading_ex = ch2.get('readingExercises', [])
    writing_ex = ch2.get('writingExercises', [])
    print(f"Exercises: reading={len(reading_ex)}, writing={len(writing_ex)}")
    if reading_ex:
        ex = reading_ex[0]
        print(f"Sample Reading Ex: Q={ex.get('questionText')}, Ans={ex.get('correctAnswer')}, Options={ex.get('optionsJson')}")
except Exception as e:
    print("Error calling chapter detail API:", e)
