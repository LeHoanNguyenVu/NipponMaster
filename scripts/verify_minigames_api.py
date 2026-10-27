# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import json

print("=== VERIFYING API MINIGAMES COUNT PER CHAPTER ===")
for ch in range(1, 21):
    url = f'http://localhost:8080/api/v1/kanji/n3/chapters/{ch}'
    res = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))['data']
    games = res.get('minigames', [])
    print(f"Chapter {ch:02d}: {len(games)} minigames")
    for idx, g in enumerate(games, 1):
        print(f"    [{idx}] {g.get('title')}")
