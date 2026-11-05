import json

with open("scripts/all_extracted_chapters.json", "r", encoding="utf-8") as f:
    data = json.load(f)

total_ch = sum(len(d["chapters"]) for d in data)

levels = {}
for d in data:
    lvl = d["levelCode"]
    levels[lvl] = levels.get(lvl, 0) + len(d["chapters"])

with open("scripts/summary_chapters_out.txt", "w", encoding="utf-8") as f:
    f.write(f"Total lessons: {len(data)}, Total chapters extracted: {total_ch}\n")
    f.write(f"Chapters per level: {json.dumps(levels, indent=2)}\n")
    f.write("Lesson 1 chapters sample:\n")
    for c in data[0]["chapters"]:
        f.write(f"  {c['timeStr']} -> {c['title']}\n")

print("Done summary writing")
