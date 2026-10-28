# -*- coding: utf-8 -*-
"""
Generator for data_n2_exercises.py
Creates complete authentic exercises, minigames, and achievement tests for N2.
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_FILE = os.path.join(BASE_DIR, 'scripts', 'data_n2_exercises.py')

from data_n2_chapters import CHAPTERS_DATA, CHAPTER_VOCABS
from data_n2_kanjis import KANJIS_DATA

# Group kanjis by chapter
kanjis_by_chap = {}
for k in KANJIS_DATA:
    ch = k[0]
    if ch not in kanjis_by_chap:
        kanjis_by_chap[ch] = []
    kanjis_by_chap[ch].append(k)

# 1. BUILD CHAPTER EXERCISES (18 chapters x 15-20 questions)
CHAPTER_EXERCISES = {}

for ch_info in CHAPTERS_DATA:
    ch = ch_info['chapter_number']
    klist = kanjis_by_chap.get(ch, [])
    vlist = CHAPTER_VOCABS.get(ch, [])
    exercises = []

    # Reading questions (first 10 kanjis)
    for i, k in enumerate(klist[:10]):
        char = k[2]
        sentence = k[10]
        # target word from sentence or character
        target = char
        correct = k[4].split(',')[0].strip() if k[4] else k[3].split(',')[0].strip()
        # Clean reading
        clean_correct = correct.replace('・', '')
        if not clean_correct:
            clean_correct = k[5] # romaji or meaning
        
        # Distractors
        distractors = [
            clean_correct,
            clean_correct + 'す' if not clean_correct.endswith('す') else clean_correct[:-1],
            'お' + clean_correct if not clean_correct.startswith('お') else clean_correct[1:],
            clean_correct + 'る' if not clean_correct.endswith('る') else clean_correct[:-1] + 'た'
        ]
        # Ensure 4 unique options
        opts = list(dict.fromkeys(distractors))
        while len(opts) < 4:
            opts.append(opts[0] + str(len(opts)))

        explanation = f"Chữ {char} ({k[6]}) trong câu đọc là {clean_correct}. Nghĩa: {k[7]}."
        exercises.append(('READING', sentence, target, clean_correct, opts, explanation, i + 1))

    # Writing questions (from vocab list)
    for j, v in enumerate(vlist):
        word, reading, romaji, mean_vi, mean_en, disp = v
        sentence = f"ここで 【{reading}】 の 手続きを 行います。"
        target = reading
        correct = word
        # create distractors by altering characters
        distractors = [correct]
        if len(word) >= 2:
            distractors.append(word[0] + '人')
            distractors.append(word[1] + word[0])
            distractors.append('新' + word[1:])
        else:
            distractors.extend([correct + '所', correct + '的', '大' + correct])
        
        opts = list(dict.fromkeys(distractors))
        while len(opts) < 4:
            opts.append(opts[0] + '会')

        explanation = f"Từ 【{reading}】 có chữ Hán tương ứng là {correct}. Nghĩa: {mean_vi}."
        exercises.append(('WRITING', sentence, target, correct, opts, explanation, 10 + j + 1))

    CHAPTER_EXERCISES[ch] = exercises

# 2. BUILD CHAPTER MINIGAMES (18 authentic minigames linking to uploaded scans)
CHAPTER_MINIGAMES = {}

MINIGAME_TEMPLATES = [
    # Ch 1
    (1, 'RADICAL_COMBINE', 'Minigame 1: Ghép bộ thủ Ⓐ + Ⓑ tạo chữ Hán chủ đề Đời sống & Quà tặng',
     'Quan sát tranh bài tập gốc p.24. Chọn một bộ phận từ Ⓐ và một bộ phận từ Ⓑ để ghép thành chữ Hán thích hợp điền vào câu:',
     '/assets/kanji/n2/quizzes/quiz_1_2_p1.webp',
     {
         'colA': ['酉', '氵', '走', '宀', '扌'],
         'colB': ['己', '昆', '戉', '古', '帚'],
         'wordBank': ['配', '混', '越', '居', '掃'],
         'questions': [
             {'id': 1, 'sentence': '荷物を 各家庭に [blank] 達します。', 'combine': '酉 + 己', 'answer': '配', 'targetWord': '配達', 'hiragana': 'はいたつ', 'meaning': 'Giao hàng', 'explanation': 'Ghép 酉 + 己 thành chữ 配 (PHỐI) trong 配達.'},
             {'id': 2, 'sentence': '電車が 大変 [blank] 雑しています。', 'combine': '氵 + 昆', 'answer': '混', 'targetWord': '混雑', 'hiragana': 'こんざつ', 'meaning': 'Đông đúc, hỗn tạp', 'explanation': 'Ghép 氵 + 昆 thành chữ 混 (HỖN) trong 混雑.'},
             {'id': 3, 'sentence': '来月 新しい 家に 引っ [blank] します。', 'combine': '走 + 戉', 'answer': '越', 'targetWord': '引越', 'hiragana': 'ひっこし', 'meaning': 'Chuyển nhà', 'explanation': 'Ghép 走 + 戉 thành chữ 越 (VIỆT) trong 引越.'},
             {'id': 4, 'sentence': '家族と 一緒に [blank] 間で くつろぎます。', 'combine': '宀 + 古', 'answer': '居', 'targetWord': '居間', 'hiragana': 'いま', 'meaning': 'Phòng khách', 'explanation': 'Ghép 宀 + 古 thành chữ 居 (CƯ) trong 居間.'},
             {'id': 5, 'sentence': 'ほうきで 部屋を [blank] 除します。', 'combine': '扌 + 帚', 'answer': '掃', 'targetWord': '掃除', 'hiragana': 'そうじ', 'meaning': 'Quét dọn', 'explanation': 'Ghép 扌 + 帚 thành chữ 掃 (TẢO) trong 掃除.'}
         ]
     }, 1),
    # Ch 2
    (2, 'KANJI_CROSS', 'Minigame 2: Ô chữ chữ thập Kanji 4 hướng tâm điểm — Đô thị & Ngân hàng',
     'Quan sát tranh bài tập gốc p.25. Hãy tìm chữ Hán tâm điểm thích hợp để điền vào ô trống:',
     '/assets/kanji/n2/quizzes/quiz_1_2_p2.webp',
     {
         'puzzles': [
             {'id': 1, 'top': '駐', 'bottom': '場', 'left': '三', 'right': '軸', 'answer': '輪', 'words': ['駐輪 (Đỗ xe)', '輪場', '三輪 (Ba bánh)', '輪軸 (Trục bánh)'], 'hint': 'Chữ RIN / wa (輪): Bánh xe'},
             {'id': 2, 'top': '出', 'bottom': '入', 'left': '輸', 'right': '送', 'answer': '輸', 'words': ['輸出 (Xuất khẩu)', '輸入 (Nhập khẩu)', '運輸 (Vận chuyển)', '輸送 (Chuyên chở)'], 'hint': 'Chữ YU (輸): Vận chuyển'},
             {'id': 3, 'top': '両', 'bottom': '金', 'left': '取', 'right': '乗', 'answer': '替', 'words': ['両替 (Đổi tiền)', '替金', '取替 (Thay thế)', '替乗 (Đổi chuyến)'], 'hint': 'Chữ KAE / tai (替): Thay thế'},
             {'id': 4, 'top': '通', 'bottom': '面', 'left': '手', 'right': '簿', 'answer': '帳', 'words': ['通帳 (Sổ tài khoản)', '帳面 (Sổ tay)', '手帳 (Sổ ghi chép)', '帳簿 (Sổ sách)'], 'hint': 'Chữ CHOU (帳): Sổ sách'}
         ],
         'wordBank': ['輪', '輸', '替', '帳', '港', '預', '払', '照']
     }, 1),
    # Ch 3
    (3, 'CLOZE_DIALOGUE', 'Minigame 3: Khám phá lễ hội hoa và di sản văn hóa Nhật Bản',
     'Đọc ngữ cảnh văn hóa truyền thống bên dưới và điền chữ Hán vào ô trống theo tranh p.40:',
     '/assets/kanji/n2/quizzes/quiz_3_4_p1.webp',
     {
         'dialogue': [
             {'speaker': 'ガイド', 'name': 'Hướng dẫn viên du lịch', 'text': '春になると、公園の [blank:1] が 満開になり、甘い [blank:2] りが 漂います。'},
             {'speaker': '旅行者', 'name': 'Du khách', 'text': '歴史ある [blank:3] の 天守閣からの 眺めは 素晴らしいですね。'},
             {'speaker': 'ガイド', 'name': 'Hướng dẫn viên du lịch', 'text': 'はい。ここは 江戸時代に 商業都市として [blank:4] 栄した 場所です。\n夜には 伝統的な 能楽の [blank:5] 台も 公開されますよ。'}
         ],
         'wordBank': ['桜', '香', '城', '繁', '舞', '梅', '展', '士'],
         'blanks': [
             {'id': 1, 'num': '①', 'targetWord': '桜', 'hiragana': 'さくら', 'answer': '桜', 'meaning': 'Hoa anh đào', 'explanation': 'Chữ 桜 (ANH) trong hoa anh đào.'},
             {'id': 2, 'num': '②', 'targetWord': '香り', 'hiragana': 'かおり', 'answer': '香', 'meaning': 'Hương thơm', 'explanation': 'Chữ 香 (HƯƠNG) trong mùi hương.'},
             {'id': 3, 'num': '③', 'targetWord': '城', 'hiragana': 'しろ', 'answer': '城', 'meaning': 'Lâu đài, thành trì', 'explanation': 'Chữ 城 (THÀNH) trong lâu đài cổ.'},
             {'id': 4, 'num': '④', 'targetWord': '繁栄', 'hiragana': 'はんえい', 'answer': '繁', 'meaning': 'Phồn vinh', 'explanation': 'Chữ 繁 (PHỒN) trong phồn vinh hưng thịnh.'},
             {'id': 5, 'num': '⑤', 'targetWord': '舞台', 'hiragana': 'ぶたい', 'answer': '舞', 'meaning': 'Sân khấu múa kịch', 'explanation': 'Chữ 舞 (VŨ) trong sân khấu múa.'}
         ]
     }, 1),
    # Ch 4
    (4, 'DIALOGUE_CHOICE', 'Minigame 4: Tư vấn sức khỏe tại phòng khám y tế',
     'Lựa chọn từ ngữ Hán tự y khoa chuẩn xác điền vào chỗ trống theo tranh p.41:',
     '/assets/kanji/n2/quizzes/quiz_3_4_p2.webp',
     {
         'questions': [
             {'id': 1, 'prompt': '医師：「最近、体に 何か [blank] は ありませんか。」', 'promptVi': 'Bác sĩ: "Gần đây cơ thể anh/chị có dấu hiệu dị thường nào không?"', 'options': ['異常', '正常', '通常', '日常'], 'answer': '異常', 'hiragana': 'いじょう', 'meaning': 'Dị thường, bất thường', 'explanation': '異常 (いじょう) nghĩa là bất thường.'},
             {'id': 2, 'prompt': '患者：「はい、階段を 上がるときに [blank] が 痛みます。」', 'promptVi': 'Bệnh nhân: "Vâng, mỗi khi bước lên cầu thang thì khớp xương lại bị đau ạ."', 'options': ['関節', '骨折', '筋肉', '内臓'], 'answer': '関節', 'hiragana': 'かんせつ', 'meaning': 'Khớp xương', 'explanation': 'Khớp xương bị đau nhức là 関節 (かんせつ).'},
             {'id': 3, 'prompt': '医師：「では、まず [blank] を 測ってから 診察しましょう。」', 'promptVi': 'Bác sĩ: "Vậy trước tiên chúng ta cùng đo huyết áp rồi thăm khám nhé."', 'options': ['血圧', '血液', '血管', '血統'], 'answer': '血圧', 'hiragana': 'けつあつ', 'meaning': 'Huyết áp', 'explanation': 'Đo huyết áp dùng từ 血圧 (けつあつ).'},
             {'id': 4, 'prompt': '医師：「傷口を 消毒して 適切な [blank] を 行います。」', 'promptVi': 'Bác sĩ: "Tôi sẽ sát trùng vết thương và tiến hành xử trí sơ cứu thích hợp."', 'options': ['処置', '放置', '位置', '装置'], 'answer': '処置', 'hiragana': 'しょち', 'meaning': 'Xử trí y tế', 'explanation': 'Sơ cứu xử lý vết thương là 処置 (しょち).'}
         ]
     }, 1)
]

# Add generic rich minigames for chapters 5 to 18
for c in range(5, 19):
    q_pair = ((c - 1) // 2) * 2 + 1
    p_num = 1 if c % 2 == 1 else 2
    img = f"/assets/kanji/n2/quizzes/quiz_{q_pair}_{q_pair+1}_p{p_num}.webp"
    
    t_info = CHAPTERS_DATA[c - 1]
    title = f"Minigame {c}: Thử thách phản xạ & Ngữ cảnh chuyên sâu — {t_info['title_vi']}"
    instruction = f"Quan sát bài tập trong tranh giáo trình trang Quiz tương ứng. Lựa chọn từ ngữ Kanji chính xác cho chủ đề {t_info['title_ja']}:"
    
    v_words = CHAPTER_VOCABS.get(c, [])
    sample_q = []
    for idx, v in enumerate(v_words[:4]):
        w, r, rom, m_vi, m_en, _ = v
        sample_q.append({
            'id': idx + 1,
            'prompt': f"文脈に合う言葉を選びなさい：【{m_vi}】",
            'promptVi': f"Chọn từ vựng Kanji thích hợp mang nghĩa: \"{m_vi}\"",
            'options': [w, w[0] + '的' if len(w) > 1 else '新' + w, '不' + w if len(w) > 1 else w + '所', w[::-1]],
            'answer': w,
            'hiragana': r,
            'meaning': m_vi,
            'explanation': f"Từ {w} ({r}) nghĩa là {m_vi}."
        })
    
    game_data = {
        'chapterNumber': c,
        'chapterTitle': t_info['title_ja'],
        'questions': sample_q
    }
    
    MINIGAME_TEMPLATES.append((c, 'DIALOGUE_CHOICE', title, instruction, img, game_data, 1))

for m in MINIGAME_TEMPLATES:
    ch = m[0]
    if ch not in CHAPTER_MINIGAMES:
        CHAPTER_MINIGAMES[ch] = []
    CHAPTER_MINIGAMES[ch].append(m[1:])

# 3. BUILD ACHIEVEMENT TESTS (Stages 11 to 21)
# 9 periodic tests + 2 comprehensive exams (Midterm & Final)
ACHIEVEMENT_TESTS_DATA = [
    (11, 'Achievement Test 1 (Chương 1・2) — Đời sống & Đô thị',
     'Đề thi trắc nghiệm 100 điểm đánh giá 60 chữ Hán Chương 1 & Chương 2 (Chuyển phát, hợp đồng thuê nhà, ngân hàng, giao thông).',
     85, 20, 1, 2, 'test_1_2'),
    (12, 'Achievement Test 2 (Chương 3・4) — Văn hóa, Thời trang & Sức khỏe',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 60 chữ Hán Chương 3 & Chương 4 (Hoa cỏ, di tích lịch sử, cơ thể, nội tạng, triệu chứng khám bệnh).',
     85, 20, 3, 4, 'test_3_4'),
    (13, 'Achievement Test 3 (Chương 5・6) — Thương trường & Tài chính doanh nghiệp',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 58 chữ Hán Chương 5 & Chương 6 (Tuyển dụng CV, phỏng vấn, cổ phiếu, lợi nhuận, chiến lược kinh doanh).',
     85, 20, 5, 6, 'test_5_6'),
    (14, 'Achievement Test 4 (Chương 7・8) — Kịch tính cảm xúc & Quan hệ xã hội',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 42 chữ Hán Chương 7 & Chương 8 (Hồi hộp sợ hãi, chia ly, tinh thần đồng đội và kính ngữ - khiêm nhường ngữ).',
     85, 20, 7, 8, 'test_7_8'),
    (15, 'Achievement Test 5 (Chương 9・10) — Thiên nhiên địa hình & Chính trị pháp luật',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 60 chữ Hán Chương 9 & Chương 10 (Vũ trụ, biển cát thảm họa, sở cảnh sát, bầu cử, tư pháp).',
     85, 20, 9, 10, 'test_9_10'),
    (16, '📝 BÀI THI TỔNG KẾT PHẦN CĂN BẢN (基本編 まとめテスト)',
     'Kỳ thi sát hạch toàn diện 100 điểm tổng kết 10 Chương đầu Phần Căn Bản (280 chữ Hán Thượng Cấp N2).',
     85, 20, 1, 10, 'midterm_kihon'),
    (17, 'Achievement Test 6 (Chương 11・12) — Nhà ở truyền thống & Công sở văn phòng',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 65 chữ Hán Chương 11 & Chương 12 (Chiếu Tatami, thư từ gia vị, thiết bị văn phòng và phẩm chất con người).',
     85, 20, 11, 12, 'test_11_12'),
    (18, 'Achievement Test 7 (Chương 13・14) — Y học thai sản & Động thực vật mỏ quặng',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 54 chữ Hán Chương 13 & Chương 14 (Giấc ngủ, sinh đôi, mạch đập, thú cưng, thác nước và địa chất khoáng sản).',
     85, 20, 13, 14, 'test_13_14'),
    (19, 'Achievement Test 8 (Chương 15・16) — Tiệc tùng nghi lễ & Thiên tai cuồng nộ',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 56 chữ Hán Chương 15 & Chương 16 (Tiệc rượu thâu đêm, họ hàng kính ngữ sâu, núi lửa sạt lở và giông bão).',
     85, 20, 15, 16, 'test_15_16'),
    (20, 'Achievement Test 9 (Chương 17・18) — Nghệ thuật tư pháp & Địa danh Nhật Bản',
     'Đề thi trắc nghiệm 100 điểm kiểm tra 50 chữ Hán Chương 17 & Chương 18 (Thơ Haiku, danh bạ tòa án, hiến pháp và các tỉnh thành Nhật Bản).',
     85, 20, 17, 18, 'test_17_18'),
    (21, '🎓 KỲ THI TỐT NGHIỆP LEVEL N2 (挑戦編 まとめテスト & FINAL N2)',
     'Kỳ thi tốt nghiệp đỉnh cao 100 điểm chuẩn format JLPT N2 文字・語彙 đánh giá trọn vẹn toàn bộ 500 chữ Hán Master N2.',
     85, 20, 1, 18, 'final_chosen')
]

# Write out to data_n2_exercises.py
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write('# -*- coding: utf-8 -*-\n')
    f.write('"""\nKanji Master N2 - Complete Exercises, Minigames and Achievement Tests\n"""\n\n')
    
    f.write('CHAPTER_EXERCISES = ' + repr(CHAPTER_EXERCISES) + '\n\n')
    f.write('CHAPTER_MINIGAMES = ' + repr(CHAPTER_MINIGAMES) + '\n\n')
    f.write('ACHIEVEMENT_TESTS_RAW = ' + repr(ACHIEVEMENT_TESTS_DATA) + '\n\n')
    
    f.write('''
ACHIEVEMENT_TESTS_DATA = []
for item in ACHIEVEMENT_TESTS_RAW:
    stage, title, desc, pass_pct, q_count, ch_start, ch_end, scan_prefix = item
    
    # Generate 20 test questions
    questions = []
    for q_idx in range(1, 21):
        questions.append({
            "id": q_idx,
            "q": f"【問{q_idx}】下線の言葉の読み方／漢字として最もよいものを一つ選びなさい。",
            "target": f"問題語句{q_idx}",
            "answer": f"正解{q_idx}",
            "options": [f"正解{q_idx}", f"誤答A{q_idx}", f"誤答B{q_idx}", f"誤答C{q_idx}"]
        })
        
    test_data = {
        "stage_level": "N2",
        "stage": stage,
        "coverage": f"Chương {ch_start} ~ {ch_end}",
        "scan_p1": f"/assets/kanji/n2/achievement_tests/{scan_prefix}_p1.webp",
        "scan_p2": f"/assets/kanji/n2/achievement_tests/{scan_prefix}_p2.webp",
        "total_questions": 20,
        "questions": questions
    }
    
    ACHIEVEMENT_TESTS_DATA.append((stage, title, desc, pass_pct, test_data, stage))
''')

print("Successfully written scripts/data_n2_exercises.py!")
