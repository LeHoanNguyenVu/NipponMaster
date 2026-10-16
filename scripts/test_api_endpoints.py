import urllib.request
import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

print("Testing Backend API Endpoints on http://localhost:8080...")

# 1. Roadmap
try:
    req = urllib.request.Request('http://localhost:8080/api/v1/kanji/roadmap')
    with urllib.request.urlopen(req, timeout=5) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Roadmap API status:", resp.status)
        chapters = data.get('data', {}).get('chapters', [])
        print(f"Total chapters in roadmap: {len(chapters)}")
except Exception as e:
    print("Roadmap API call:", e)

# 2. Check chapters 5 and 15
for ch_id in [5, 10, 15]:
    try:
        url = f'http://localhost:8080/api/v1/kanji/chapters/{ch_id}'
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            cdata = data.get('data', {})
            print(f"\n--- Chapter {ch_id}: {cdata.get('titleJa')} ({cdata.get('titleVi')}) ---")
            kanjis = cdata.get('kanjis', [])
            vocabs = cdata.get('vocabularies', [])
            reading = cdata.get('readingExercises', [])
            writing = cdata.get('writingExercises', [])
            minigames = cdata.get('minigames', [])
            print(f"  Kanjis count: {len(kanjis)}")
            print(f"  Vocabularies count: {len(vocabs)}")
            print(f"  Reading exercises: {len(reading)}")
            print(f"  Writing exercises: {len(writing)}")
            print(f"  Minigames count: {len(minigames)}")
            if kanjis:
                sample_k = kanjis[0]
                print(f"  Sample Kanji: '{sample_k.get('character')}' -> imageUrl: '{sample_k.get('imageUrl')}'")
    except Exception as e:
        print(f"Chapter {ch_id} API call failed:", e)

print("\nAPI Testing Finished.")
