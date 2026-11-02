import os
import sys
import shutil
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(PROJECT_ROOT, '.env')

def load_env():
    env_vars = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env_vars[k.strip()] = v.strip()
    return env_vars

env = load_env()
SUPABASE_URL = env.get('SUPABASE_URL', 'https://bxqwarbeocbsfjieqbsq.supabase.co').rstrip('/')
SUPABASE_KEY = env.get('SUPABASE_KEY', '').strip()
BUCKET_NAME = env.get('SUPABASE_STORAGE_BUCKET', 'kanji-assets').strip()

CROPS_DIR = os.path.join(PROJECT_ROOT, 'scripts', 'phase5_crops')
LOCAL_TARGET_DIR = os.path.join(PROJECT_ROOT, 'frontend', 'public', 'assets', 'kanji', 'n1', 'quizzes', 'crops')
os.makedirs(LOCAL_TARGET_DIR, exist_ok=True)

files = [
    'ch23_g1.webp', 'ch24_g1.webp', 'ch25_g1.webp', 'ch26_g1.webp',
    'ch27_g1.webp', 'ch28_g1.webp', 'ch29_g1.webp', 'ch30_g1.webp'
]

# 1. Copy locally
for f in files:
    src = os.path.join(CROPS_DIR, f)
    dst = os.path.join(LOCAL_TARGET_DIR, f)
    shutil.copy2(src, dst)
    print(f"Copied {f} to local {dst}")

# 2. Upload to Supabase Storage
for f in files:
    src = os.path.join(CROPS_DIR, f)
    remote_path = f"n1/quizzes/crops/{f}"
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{remote_path}"
    with open(src, 'rb') as fp:
        file_bytes = fp.read()

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": "image/webp",
        "x-upsert": "true"
    }

    req = urllib.request.Request(url, data=file_bytes, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[UPLOAD OK] {f} -> status {resp.status}")
    except urllib.error.HTTPError as e:
        err = e.read().decode('utf-8', errors='ignore')
        print(f"[UPLOAD ERROR] {f} -> {e.code}: {err}")

# 3. Verify public URLs
print("\nVerifying Public CDN URLs:")
all_ok = True
for f in files:
    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/n1/quizzes/crops/{f}"
    try:
        chk_req = urllib.request.Request(public_url, method="HEAD")
        with urllib.request.urlopen(chk_req) as resp:
            if resp.status == 200:
                print(f"[PUBLIC 200 OK] {public_url}")
            else:
                print(f"[STATUS {resp.status}] {public_url}")
                all_ok = False
    except Exception as e:
        print(f"[CHECK FAILED] {public_url} -> {e}")
        all_ok = False

if all_ok:
    print("\nSUCCESS: All 8 Phase 5 minigame crops are live on Supabase Storage CDN!")

