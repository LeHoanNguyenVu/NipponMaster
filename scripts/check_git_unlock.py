import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Run git log -p on lines 1120-1135 of Kanji.tsx
p = subprocess.Popen(['git', 'log', '-L', '1125,1130:frontend/src/screens/Kanji.tsx'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = p.communicate()
print(out.decode('utf-8', errors='ignore')[:3000])

