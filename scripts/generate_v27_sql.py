import json

with open("scripts/all_extracted_chapters.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

lines = []
lines.append("-- ====================================================================")
lines.append("-- V27: Cap nhat 837 Muc luc thoi gian YouTube Chapters thuc te cho 131 Video")
lines.append("-- Phuc vu phan doan chinh xac theo thoi luong video tren YouTube")
lines.append("-- ====================================================================")
lines.append("")
lines.append("DELETE FROM grammar_timestamps;")
lines.append("")
lines.append("INSERT INTO grammar_timestamps (lesson_id, time_sec, time_str, pattern, title, summary, sort_order)")
lines.append("SELECT l.id, v.time_sec, v.time_str, v.pattern, v.title, v.summary, v.sort_order")
lines.append("FROM (VALUES")

value_rows = []
for l in lessons:
    vid = l["videoId"]
    chapters = l["chapters"]
    for idx, c in enumerate(chapters):
        sec = c["timeSec"]
        tstr = c["timeStr"]
        title = c["title"].replace("'", "''")
        pattern = c.get("pattern", title).replace("'", "''")
        value_rows.append(f"  ('{vid}', {sec}, '{tstr}', '{pattern}', '{title}', '', {idx + 1})")

lines.append(",\n".join(value_rows))
lines.append(") AS v(video_id, time_sec, time_str, pattern, title, summary, sort_order)")
lines.append("JOIN grammar_lessons l ON l.video_id = v.video_id;")
lines.append("")

sql_content = "\n".join(lines)

with open("backend/src/main/resources/db/migration/V27__seed_real_youtube_chapters.sql", "w", encoding="utf-8") as f:
    f.write(sql_content)

print(f"Generated V27__seed_real_youtube_chapters.sql with {len(value_rows)} chapter rows!")

