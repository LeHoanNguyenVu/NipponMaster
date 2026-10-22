import sys
import os
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

for ch in range(31, 40):
    url = f"http://localhost:8080/api/v1/kanji/chapters/{ch}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            resp = json.loads(res.read())
            data = resp['data']
            ch_info = data['chapter']
            print(f"=== CHAPTER {ch_info.get('chapterNumber')}: {ch_info.get('titleJa')} ({ch_info.get('titleVi')}) [ID: {ch}] ===")
            mgs = data.get('minigames', [])
            print(f"Total Minigames: {len(mgs)}")
            for mg in mgs:
                parsed = json.loads(mg['gameDataJson'])
                img_rel = mg['imageUrl'].lstrip('/')
                pub_path = os.path.join(r"d:\Japanese Project\frontend\public", img_rel)
                dist_path = os.path.join(r"d:\Japanese Project\frontend\dist", img_rel)
                pub_exists = os.path.exists(pub_path)
                dist_exists = os.path.exists(dist_path)
                qs = parsed.get("questions", [])
                print(f"  * [Order {mg.get('displayOrder')}] {mg.get('title')}")
                print(f"    Image: {mg.get('imageUrl')}")
                print(f"    Disk Check: public={pub_exists}, dist={dist_exists}")
                print(f"    Questions ({len(qs)} questions):")
                for q in qs[:2]:
                    print(f"       - Q{q['id']}: {q['prompt'][:45]}... -> Ans: {q['answer']}")
                if len(qs) > 2:
                    last_q = qs[-1]
                    print(f"       ... [Q3 to Q{len(qs)-1}] ...")
                    print(f"       - Q{last_q['id']}: {last_q['prompt'][:45]}... -> Ans: {last_q['answer']}")
            print()
    except Exception as e:
        print(f"Error checking ch {ch}: {e}")
