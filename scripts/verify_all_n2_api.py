import urllib.request
import json

total_games = 0
print(f"{'Ch':<4} | {'Count':<5} | {'Image URL':<45} | {'Minigames':<40}")
print("-" * 110)

for ch in range(1, 19):
    url = f"http://localhost:8080/api/v1/kanji/n2/chapters/{ch}"
    req = urllib.request.urlopen(url)
    data = json.loads(req.read().decode('utf-8'))['data']
    games = data.get('minigames', [])
    total_games += len(games)
    img = games[0].get('imageUrl', 'NONE') if games else 'NONE'
    types = [g.get('gameType') for g in games]
    titles = [g.get('title') for g in games]
    img_short = img.split('/')[-1] if img != 'NONE' else 'NONE'
    print(f"Ch {ch:02d} | {len(games):<5} | {img_short:<45} | {', '.join(types)}")

print("-" * 110)
print(f"TOTAL MINIGAMES ACROSS 18 CHAPTERS: {total_games}")
