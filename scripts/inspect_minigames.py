import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append('scripts')
from n3_minigames_dataset import N3_AUTHENTIC_MINIGAMES

for ch, games in sorted(N3_AUTHENTIC_MINIGAMES.items()):
    for g in games:
        gtype = g[0]
        data = g[3] if isinstance(g[3], dict) else g[4]
        if 'questions' in data:
            q0 = data['questions'][0]
            prompt = q0.get('prompt', q0.get('sentence', ''))
            opts = q0.get('options', [])
            has_vi = any('(' in opt for opt in opts)
            print(f"Ch {ch:2d} | {gtype:16s} | Questions: {len(data['questions'])} | Has Opts: {len(opts)} | Options have paren: {has_vi} | Prompt: {prompt[:50]}")
