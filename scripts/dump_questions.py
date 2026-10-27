import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append('scripts')
from n3_minigames_dataset import N3_AUTHENTIC_MINIGAMES

for ch in range(5, 18):
    games = N3_AUTHENTIC_MINIGAMES.get(ch, [])
    for g in games:
        data = g[3] if isinstance(g[3], dict) else g[4]
        if 'questions' in data:
            print(f"\n=== CHAPTER {ch} ===")
            for q in data['questions']:
                qid = q['id']
                prompt = q.get('prompt', '')
                ans = q.get('answer', '')
                print(f"{qid}. {prompt} -> {ans}")
