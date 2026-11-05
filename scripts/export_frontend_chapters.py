import json

with open("scripts/all_extracted_chapters.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# Map by videoId -> chapters
mapping = {}
for l in lessons:
    vid = l["videoId"]
    mapping[vid] = [
        {
            "id": idx + 1,
            "timeSec": c["timeSec"],
            "timeStr": c["timeStr"],
            "title": c["title"],
            "pattern": c.get("pattern", c["title"]),
            "sortOrder": idx + 1
        }
        for idx, c in enumerate(l["chapters"])
    ]

with open("frontend/src/data/grammarChapters.json", "w", encoding="utf-8") as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

print(f"Saved frontend/src/data/grammarChapters.json with {len(mapping)} videos!")

