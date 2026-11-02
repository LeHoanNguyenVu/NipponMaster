with open('frontend/src/screens/Kanji.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_s = "? '30 Chương (必修編 · 熟達編 · 難読編) · 943 Chữ Hán · Sách chuẩn 漢字マスターN1 & Mẹo nhớ chiết tự.'"
new_s = "? '30 Chương (必修編 · 熟達編 · 難読編) · 943 Chữ Hán · Sách chuẩn 漢字マスターN1 & Mẹo nhớ chiết tự · Đạt ≥ 85% mở khóa chương.'"

if old_s in text:
    text = text.replace(old_s, new_s)
    with open('frontend/src/screens/Kanji.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully updated subtitle in Kanji.tsx")
else:
    print("old_s not found")

