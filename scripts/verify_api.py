import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import json

for ch in [4, 5, 10, 15, 20]:
    res = json.loads(urllib.request.urlopen(f'http://localhost:8080/api/v1/kanji/n3/chapters/{ch}').read().decode('utf-8'))['data']
    print(f"\nCh {ch:2d}: {res['chapter']['titleJa']} - {len(res['minigames'])} minigames")
    for g in res['minigames']:
        img_name = g['illustrationUrl'].split('/')[-1] if g.get('illustrationUrl') else 'none'
        print(f"   * [{g['gameType']:14s}] {g['title'][:55]} | img: {img_name}")
