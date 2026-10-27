# -*- coding: utf-8 -*-
"""
Script to update scripts/n3_minigames_dataset.py with:
1. Chapter 3: Full authentic exercises (Game 1: 居酒屋の会話 Cloze, Game 2: ショートケーキ Recipe Cloze).
2. Chapter 4: Full authentic exercises (Game 1: 病院での会話 Cloze, Game 2: Medical situations Picture Match).
3. Chapters 5-20: All Picture Match multiple choice questions standardized to:
   - prompt: Pure Japanese
   - promptVi: Vietnamese translation
   - options: Pure Japanese
   - answer: Pure Japanese
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import re
import os

# We will read existing n3_minigames_dataset.py and cleanly update N3_AUTHENTIC_MINIGAMES.
FILE_PATH = 'scripts/n3_minigames_dataset.py'

# Japanese prompt mapping dictionary for Chapters 4 ~ 20 questions:
JA_PROMPTS = {
    # Chapter 4
    (4, 1): "医師が肺の機能を調べるために、患者に指示する動作はどれですか。",
    (4, 2): "患者が訴えている激しい頭の痛みは、医学的に何と呼びますか。",
    (4, 3): "病気の原因を突き止めるため、採血して成分を調べる処置は何ですか。",
    (4, 4): "切り傷などの出血に対して、看護師が行う正しい応急手当はどれですか。",
    (4, 5): "患者が突然倒れて意識を失ったとき、すぐに呼ぶべき緊急車両は何ですか。",

    # Chapter 5
    (5, 1): "二つのチームの間で優勝を争う最後の試合は何と呼びますか。",
    (5, 2): "圧倒的な強さで最後まで勝ち進んだチームは、どのような栄誉を受けましたか。",
    (5, 3): "野球の試合でチームを代表してボールを投げる主力を何と呼びますか。",
    (5, 4): "大会でこれまで誰も成し遂げたことのない最高成績を収めることを何と言いますか。",
    (5, 5): "両チームの実力が拮抗し、わずかに点差が開いた状態を表す表現はどれですか。",

    # Chapter 6
    (6, 1): "期待していたことが思い通りの結果にならなかったとき、どのような気持ちになりますか。",
    (6, 2): "難しい問題に直面してどうすればよいか分からないとき、どのような状態になりますか。",
    (6, 3): "深い感動を覚えて目からしずくがこぼれる情景を表す表現はどれですか。",
    (6, 4): "友人との関係を末長く保つために最も不可欠なことは何ですか。",
    (6, 5): "家族が大学入試に見事合格した知らせを聞いたとき、家族全員はどうしましたか。",

    # Chapter 7
    (7, 1): "新郎と新婦が夫婦になる誓いを立てる正式な儀式を何と言いますか。",
    (7, 2): "参列者が新しい門出を迎える二人のために送る言葉として最も適切なものはどれですか。",
    (7, 3): "結婚した経験がなく、現在一人で生活している友人を何と呼びますか。",
    (7, 4): "将来の家庭を築く費用を準備するために、夫婦が毎月行ったことは何ですか。",
    (7, 5): "困難なことがあっても生涯共に助け合うことを固く誓い合うことを何と言いますか。",

    # Chapter 8
    (8, 1): "兄弟のように親しく、互いに深く信頼し合っている関係を何と表現しますか。",
    (8, 2): "公的な書類に記入する個人の正式な名前（名字と名前）を何と言いますか。",
    (8, 3): "集団の中でそれぞれが持つ独特の性質や特徴を何と呼びますか。",
    (8, 4): "子供のころの親友と長い年月を経て再び顔を合わせたとき、何と言いますか。",
    (8, 5): "生まれて初めて顔を合わせる相手を何と呼びますか。",

    # Chapter 9
    (9, 1): "多くの要素が入り組んでいて、一筋縄では解けない構造を何と表現しますか。",
    (9, 2): "法律でお酒を飲むことが許されている年齢基準を表す言葉はどれですか。",
    (9, 3): "法律上、まだ18歳に達していない人のことを何と呼びますか。",
    (9, 4): "人間の能力を超えていて、実現することが極めて困難な要求を何と言いますか。",
    (9, 5): "誰一人欠けることなく、全員が揃っている状態を表す表現はどれですか。",

    # Chapter 10
    (10, 1): "図書館の受付で、本を自宅に持ち帰る手続きを何と言いますか。",
    (10, 2): "借りた本を読み終わった後、利用者が決められた期日内に行うべきことは何ですか。",
    (10, 3): "鉛筆や消しゴム、定規などの文房具を入れておく入れ物を何と呼びますか。",
    (10, 4): "一年間、学級全体と生徒たちを指導・管理する先生を何と呼びますか。",
    (10, 5): "図書館から本を5冊借りるときの正しい数え方はどれですか。",

    # Chapter 11
    (11, 1): "企業の採用担当者と直接会って質問に答える選考試験を何と言いますか。",
    (11, 2): "応募者が将来に向けて抱いている目標や理想を何と呼びますか。",
    (11, 3): "試験で平均点を大きく上回る素晴らしい点数を取ることを何と言いますか。",
    (11, 4): "志願者数が多く、合格するのが非常に難しい状況を表す言葉はどれですか。",
    (11, 5): "大学の入学試験に無事パスして入学許可を得ることを何と言いますか。",

    # Chapter 12
    (12, 1): "学校で先生が生徒たちに知識や学問を教える時間を何と呼びますか。",
    (12, 2): "先生が生徒に分かりやすく理解させるために、具体的な例を挙げて説明することを何と言いますか。",
    (12, 3): "学んだ知識をしっかりと定着させるために、毎晩行うべき大切な学習は何ですか。",
    (12, 4): "4年間の学業を修め、所定の単位を取得して学校を終えることを何と言いますか。",
    (12, 5): "正しい勉強方法によって、成績が目に見えて向上した状態を何と表現しますか。",

    # Chapter 13
    (13, 1): "高山や極地で、長い年月をかけて固まった氷がゆっくりと滑り動く現象を何と呼びますか。",
    (13, 2): "四方を広い海に囲まれた陸地を何と言いますか。",
    (13, 3): "沿岸部を流れ、周辺の地域に温暖な気候をもたらす海の巨大な流れを何と呼びますか。",
    (13, 4): "太陽の光が全く届かない、海の最も深い部分を何と表現しますか。",
    (13, 5): "地球上には無数の動植物が生息していることを表す表現はどれですか。",

    # Chapter 14
    (14, 1): "ヨーロッパ各国の歴史的建造物や名所を巡る旅を何と言いますか。",
    (14, 2): "海外旅行に出発する前日までに済ませておくべき重要なことは何ですか。",
    (14, 3): "穏やかな川の上で船に揺られながら景色を楽しむ体験を何と言いますか。",
    (14, 4): "大劇場で役者が演じる伝統的な舞台芸術を何と呼びますか。",
    (14, 5): "空港のロビーで、旅行会社の係員が到着したツアー客に対して行うことは何ですか。",

    # Chapter 15
    (15, 1): "道を案内するときに「まっすぐ進んで、曲がり角を右折する」を意味する表現はどれですか。",
    (15, 2): "前の車との車間距離が近すぎたため、後ろからぶつかってしまった事故は何ですか。",
    (15, 3): "雨でぬれた道路で足をとられ、転んでしまった状態を表す言葉はどれですか。",
    (15, 4): "道路の真ん中に引かれ、対向車線とを区切る境界線を何と呼びますか。",
    (15, 5): "狭い道路や橋を渡る際、反対方向から来る車に対して取るべき安全行動は何ですか。",

    # Chapter 16
    (16, 1): "新しい働き口を見つけるために応募書類を準備して活動することを何と言いますか。",
    (16, 2): "雇用契約に基づいて、毎月労働の対価として支払われる報酬を何と呼びますか。",
    (16, 3): "職場で礼儀を欠き、社会人としての常識に反する不適切な振る舞いを何と言いますか。",
    (16, 4): "自己都合によって会社を辞めることを申し出る際、提出する書類は何ですか。",
    (16, 5): "市役所や官公庁などの行政機関で公共のために働く職員を何と呼びますか。",

    # Chapter 17
    (17, 1): "会議で同僚から出された提案に賛同し、同意の意を示すことを何と言いますか。",
    (17, 2): "提示された計画に対して納得がいかず、異なる意見を主張することを何と言いますか。",
    (17, 3): "日本のビジネス社会で最も重視されるコミュニケーションの基本3原則は何ですか。",
    (17, 4): "重要な経営方針を決定する前に、経営者が必ず行うべき慎重な行動は何ですか。",
    (17, 5): "上司が部下に対して、行うべき業務の内容を具体的に指示することを何と言いますか。",

    # Chapter 18
    (18, 1): "組織の中で最高位に位置し、全般の経営責任を負う人物を何と呼びますか。",
    (18, 2): "次年度の事業活動に必要な資金の収入と支出をあらかじめ計算した計画は何ですか。",
    (18, 3): "年間で数百億円にも達する巨大企業の販売実績を表す言葉はどれですか。",
    (18, 4): "企業が事業によって得た利益に対して、国に納める義務がある税金を何と言いますか。",
    (18, 5): "過去の実績データと現在の経営数値を照らし合わせて分析することを何と言いますか。",

    # Chapter 19
    (19, 1): "工場に最新鋭の設備を取り入れ、生産の自動化を進めることを何と言いますか。",
    (19, 2): "海外の国々と製品や原材料を盛んに売り買いする国際経済活動を何と呼びますか。",
    (19, 3): "高温の金属を扱う溶接現場などで、作業員が身の安全を確保するために行うことは何ですか。",
    (19, 4): "天然の綿花を原料として、機織り機で布を仕立てる伝統工芸の作業は何ですか。",
    (19, 5): "地下に豊富な鉱物や燃料などの天然資源を持っている国を何と表現しますか。",

    # Chapter 20
    (20, 1): "社会の秩序を保つために、すべての国民が守るべき国のきまりは何ですか。",
    (20, 2): "歴史的な文化財の敷地内で、火災を防ぐために掲示されている禁止事項は何ですか。",
    (20, 3): "警察などの捜査機関が、事件を起こした疑いのある人物の行方を追うことを何と言いますか。",
    (20, 4): "社会の安全を脅かし、法律によって厳しく処罰される極めて重大な不法行為は何ですか。",
    (20, 5): "国の安全と主権を守るために、国境の防衛や治安維持を担う組織・隊員は何ですか。"
}

# Chapter 3 Minigames:
CH3_GAMES = [
    ('CLOZE_DIALOGUE', 'Minigame 1: Quán nhậu sau giờ làm việc — Gọi món & Đụng ly (居酒屋の会話 - 乾杯しよう！)',
     'Quan sát bức tranh quán nhậu và đọc lời thoại của nhóm đồng nghiệp. Điền chữ Hán thích hợp vào các ô trống từ ① đến ⑧ (Gõ trực tiếp hoặc bấm chọn từ Ngân hàng chữ Hán):',
     '/assets/kanji/n3/quizzes/quiz_3_4_drinking_dialogue.webp', {
         'dialogue': [
             {'speaker': '山田', 'name': '山田 (Tổ trưởng Yamada)',
              'text': 'おつかれさま！ じゃ、まずはビールで 乾[blank:1] しよう。'},
             {'speaker': '田中', 'name': '田中 (Tanaka)',
              'text': 'すみません。[blank:2] たいビールをお願いします。'},
             {'speaker': '川本', 'name': '川本 (Kawamoto)',
              'text': 'とりあえず、えだ[blank:3] と生野[blank:4] と、[blank:5] き魚を頼もうか。'},
             {'speaker': '石井', 'name': '石井 (Ishii)',
              'text': '私はビールじゃなくて、[blank:6] チューハイがいいな。'},
             {'speaker': '松下', 'name': '松下 (Matsushita)',
              'text': 'この料理、ちょっと味がうすいから、[blank:7] をかけてもいい？'},
             {'speaker': '上田', 'name': '上田 (Ueda)',
              'text': 'あ、私はちょっと頭[blank:8] がするから、お茶にしておきます。'}
         ],
         'wordBank': ['菜', '痛', '焼', '熱', '塩', '杯', '粉', '缶', '豆', '冷'],
         'blanks': [
             {'id': 1, 'num': '①', 'targetWord': '乾杯', 'hiragana': 'かんぱい', 'answer': '杯',
              'meaning': 'Cạn ly, chúc rượu', 'explanation': 'Chữ 杯 (BÔI) trong 乾杯 (かんぱい - cạn ly).'},
             {'id': 2, 'num': '②', 'targetWord': '冷たい', 'hiragana': 'つめたい', 'answer': '冷',
              'meaning': 'Bia lạnh', 'explanation': 'Chữ 冷 (LÃNH) trong 冷たい (つめたい - lạnh buốt).'},
             {'id': 3, 'num': '③', 'targetWord': 'えだ豆', 'hiragana': 'えだまめ', 'answer': '豆',
              'meaning': 'Đậu nành luộc Edamame', 'explanation': 'Chữ 豆 (ĐẬU) trong えだ豆 (えだまめ - món đậu nành luộc).'},
             {'id': 4, 'num': '④', 'targetWord': '生野菜', 'hiragana': 'なまやさい', 'answer': '菜',
              'meaning': 'Rau sống', 'explanation': 'Chữ 菜 (THÁI) trong 生野菜 (なまやさい - rau tươi sống).'},
             {'id': 5, 'num': '⑤', 'targetWord': '焼き魚', 'hiragana': 'やきざかな', 'answer': '焼',
              'meaning': 'Cá nướng', 'explanation': 'Chữ 焼 (THIÊU) trong 焼き魚 (やきざかな - món cá nướng).'},
             {'id': 6, 'num': '⑥', 'targetWord': '缶チューハイ', 'hiragana': 'かんちゅーはい', 'answer': '缶',
              'meaning': 'Chuhai đóng lon', 'explanation': 'Chữ 缶 (PHỐI/QUÁN) trong 缶チューハイ (rượu chuhai đóng lon).'},
             {'id': 7, 'num': '⑦', 'targetWord': '塩', 'hiragana': 'しお', 'answer': '塩',
              'meaning': 'Rắc thêm muối', 'explanation': 'Chữ 塩 (DIÊM) nghĩa là muối ăn (しお).'},
             {'id': 8, 'num': '⑧', 'targetWord': '頭痛', 'hiragana': 'ずつう', 'answer': '痛',
              'meaning': 'Đau đầu', 'explanation': 'Chữ 痛 (THỐNG) trong 頭痛 (ずつう - cơn đau nhức đầu).'}
         ]
     }, 1),
    ('RECIPE_CLOZE', 'Minigame 2: Công thức làm bánh dâu tây (いちごのショートケーキ)',
     'Quan sát phiếu công thức mô phỏng bài tập gốc và chọn từ thích hợp từ danh sách bên phải để điền vào các chỗ trống (① ~ ⑩):',
     '/assets/kanji/n3/quizzes/quiz_3_4_shortcake_recipe.webp', {
         'wordBank': ['型', '卵', '度', '材料', '小麦粉', '牛乳', '果物', '焼く', '温める', '量る'],
         'blanks': [
             {'id': 1, 'num': '①', 'answer': '材料', 'meaning': 'Nguyên liệu làm bánh',
              'explanation': '■ 材料: (Các nguyên liệu làm bánh)'},
             {'id': 2, 'num': '②', 'answer': '卵', 'meaning': 'Trứng gà (2 quả)',
              'explanation': '卵 2こ (2 quả trứng)'},
             {'id': 3, 'num': '③', 'answer': '小麦粉', 'meaning': 'Bột mì (60 gram)',
              'explanation': '小麦粉 60グラム (60g bột mì)'},
             {'id': 4, 'num': '④', 'answer': '牛乳', 'meaning': 'Sữa bò (1 muỗng canh)',
              'explanation': '牛乳 大さじ1 (1 thìa to sữa)'},
             {'id': 5, 'num': '⑤', 'answer': '果物', 'meaning': 'Trái cây / hoa quả thay thế',
              'explanation': 'ほかの 果物 を使う (Dùng hoa quả khác)'},
             {'id': 6, 'num': '⑥', 'answer': '量る', 'meaning': 'Cân đong nguyên liệu',
              'explanation': '小麦粉、さとう、バターを 量る (Cân đong lượng nguyên liệu)'},
             {'id': 7, 'num': '⑦', 'answer': '型', 'meaning': 'Khuôn đổ bánh',
              'explanation': '生地を 型 に入れたら (Cho bột vào khuôn)'},
             {'id': 8, 'num': '⑧', 'answer': '焼く', 'meaning': 'Nướng bằng lò',
              'explanation': 'オーブンで約10分 焼く (Nướng lò khoảng 10 phút)'},
             {'id': 9, 'num': '⑨', 'answer': '度', 'meaning': 'Độ C (200 độ)',
              'explanation': '前もって200 度 (Làm nóng trước ở 200 độ C)'},
             {'id': 10, 'num': '⑩', 'answer': '温める', 'meaning': 'Làm nóng / bật trước lò nướng',
              'explanation': '200度に 温める (Làm nóng lò ở 200 độ)'}
         ]
     }, 2)
]

# Chapter 4 Minigames:
CH4_GAMES = [
    ('CLOZE_DIALOGUE', 'Minigame 1: Đối thoại khám bệnh tại phòng khám (病院での会話 - 医師と患者)',
     'Quan sát tranh bài tập gốc và đọc 4 đoạn hội thoại giữa Bác sĩ và Bệnh nhân. Điền chữ Hán thích hợp vào các ô trống từ ① đến ⑧ (Gõ trực tiếp hoặc bấm chọn từ Ngân hàng chữ Hán):',
     '/assets/kanji/n3/quizzes/quiz_3_4_doctor_patient.webp', {
         'dialogue': [
             {'speaker': '患者A', 'name': '患者A (Bệnh nhân A)',
              'text': '夕べ急に [blank:1] が出て、たくさん [blank:2] をかいているんです。'},
             {'speaker': '医者', 'name': '医師 (Bác sĩ)',
              'text': 'インフルエンザかもしれません。まずは体 [blank:3] を測ってみましょう。'},
             {'speaker': '患者B', 'name': '患者B (Bệnh nhân B)',
              'text': '包丁で切って [blank:4] が止まらないんです。'},
             {'speaker': '医者', 'name': '医師 (Bác sĩ)',
              'text': 'それは大変、すぐに包帯をしましょう。'},
             {'speaker': '患者C', 'name': '患者C (Bệnh nhân C)',
              'text': '[blank:5] がつまって、[blank:6] 吸が苦しいんです。'},
             {'speaker': '医者', 'name': '医師 (Bác sĩ)',
              'text': 'そろそろ花粉のきせつですから、もしかすると…。'},
             {'speaker': '患者D', 'name': '患者D (Bệnh nhân D)',
              'text': '体の調子がよくないんです。食欲もないし、つかれがとれないんです。'},
             {'speaker': '医者', 'name': '医師 (Bác sĩ)',
              'text': 'では、血 [blank:7] の [blank:8] 査をしましょう。'}
         ],
         'wordBank': ['熱', '汗', '温', '血', '鼻', '呼', '液', '検'],
         'blanks': [
             {'id': 1, 'num': '①', 'targetWord': '熱', 'hiragana': 'ねつ', 'answer': '熱',
              'meaning': 'Phát sốt', 'explanation': 'Chữ 熱 (NHIỆT) đọc là ねつ (phát sốt: 熱が出る).'},
             {'id': 2, 'num': '②', 'targetWord': '汗', 'hiragana': 'あせ', 'answer': '汗',
              'meaning': 'Đổ mồ hôi', 'explanation': 'Chữ 汗 (HÃN) đọc là あせ (đổ mồ hôi: 汗をかく).'},
             {'id': 3, 'num': '③', 'targetWord': '体温', 'hiragana': 'たいおん', 'answer': '温',
              'meaning': 'Đo thân nhiệt', 'explanation': 'Chữ 温 (ÔN) trong 体温 (たいおん - thân nhiệt).'},
             {'id': 4, 'num': '④', 'targetWord': '血', 'hiragana': 'ち', 'answer': '血',
              'meaning': 'Máu chảy', 'explanation': 'Chữ 血 (HUYẾT) đọc là ち (máu không cầm được: 血が止まらない).'},
             {'id': 5, 'num': '⑤', 'targetWord': '鼻', 'hiragana': 'はな', 'answer': '鼻',
              'meaning': 'Nghẹt mũi', 'explanation': 'Chữ 鼻 (TỴ) đọc là はな (nghẹt mũi: 鼻がつまる).'},
             {'id': 6, 'num': '⑥', 'targetWord': '呼吸', 'hiragana': 'こきゅう', 'answer': '呼',
              'meaning': 'Hô hấp khó khăn', 'explanation': 'Chữ 呼 (HÔ) trong 呼吸 (こきゅう - hô hấp, hít thở).'},
             {'id': 7, 'num': '⑦', 'targetWord': '血液', 'hiragana': 'けつえき', 'answer': '液',
              'meaning': 'Huyết dịch / Máu', 'explanation': 'Chữ 液 (DỊCH) trong 血液 (けつえき - máu / huyết dịch).'},
             {'id': 8, 'num': '⑧', 'targetWord': '検査', 'hiragana': 'けんさ', 'answer': '検',
              'meaning': 'Xét nghiệm, kiểm tra', 'explanation': 'Chữ 検 (KIỂM) trong 検査 (けんさ - kiểm tra, xét nghiệm).'}
         ]
     }, 1),
    ('PICTURE_MATCH', 'Minigame 2: Tình huống y tế & Sơ cứu thực tế (医療・救急の応用)',
     'Đọc các câu hỏi tình huống y tế bên dưới. Chọn đáp án tiếng Nhật chính xác nhất:',
     '/assets/kanji/n3/quizzes/quiz_3_4_doctor_patient.webp', {
         'questions': [
             {
                 'id': 1,
                 'prompt': '医師が肺の機能を調べるために、患者に指示する動作はどれですか。',
                 'promptVi': 'Bác sĩ hướng dẫn bệnh nhân kiểm tra chức năng phổi như thế nào?',
                 'options': ['深く息を吸って、ゆっくり吐いて', '頭を左右に振って', '走って汗をかいて', '歯をきれいに磨いて'],
                 'answer': '深く息を吸って、ゆっくり吐いて',
                 'explanation': 'Chữ 呼 (HÔ) + 吸 (HẤP) và 息 (TỨC) -> 息を吸う (hít vào), 息を吐く (thở ra).'
             },
             {
                 'id': 2,
                 'prompt': '患者が訴えている激しい頭の痛みは、医学的に何と呼びますか。',
                 'promptVi': 'Triệu chứng đau nhức vùng đầu dữ dội của bệnh nhân được gọi là gì?',
                 'options': ['激しい頭痛', '鼻水とくしゃみ', '軽い歯痛', '突発性の腹痛'],
                 'answer': '激しい頭痛',
                 'explanation': 'Chữ 頭 (ĐẦU) + 痛 (THỐNG) đọc là ずつう (đau đầu).'
             },
             {
                 'id': 3,
                 'prompt': '病気の原因を突き止めるため、採血して成分を調べる処置は何ですか。',
                 'promptVi': 'Quy trình lấy mẫu máu để làm xét nghiệm trong phòng khám là gì?',
                 'options': ['血液の検査', '脈拍の測定', '視力の回復', '体温の調整'],
                 'answer': '血液の検査',
                 'explanation': 'Chữ 血 (HUYẾT) + 液 (DỊCH) và 検 (KIỂM) + 査 (TRA) -> 血液の検査 (xét nghiệm máu).'
             },
             {
                 'id': 4,
                 'prompt': '切り傷などの出血に対して、看護師が行う正しい応急手当はどれですか。',
                 'promptVi': 'Đối với vết thương hở chảy máu ngoài da, điều dưỡng thực hiện thao tác gì?',
                 'options': ['消毒して包帯を巻く', '薬をそのまま捨てる', '冷たい水を大量にかける', '何もしないで放置する'],
                 'answer': '消毒して包帯を巻く',
                 'explanation': 'Chữ 包 (BAO) + 帯 (ĐỚI) là băng gạc vết thương (ほうたい).'
             },
             {
                 'id': 5,
                 'prompt': '患者が突然倒れて意識を失ったとき、すぐに呼ぶべき緊急車両は何ですか。',
                 'promptVi': 'Trong trường hợp khẩn cấp bệnh nhân ngất xỉu nguy kịch, cần gọi xe gì?',
                 'options': ['救急車を呼ぶ', '消防車を手配する', 'パトカーに乗る', 'タクシーを待つ'],
                 'answer': '救急車を呼ぶ',
                 'explanation': 'Chữ 救 (CỨU) + 急 (CẤP) + 車 (XA) đọc là きゅうきゅうしゃ (xe cấp cứu 119).'
             }
         ]
     }, 2)
]

# Clean options function
def clean_paren(text):
    return re.sub(r'\s*\(.*?\)\s*$', '', text).strip()

def run_update():
    sys.path.append('scripts')
    from n3_minigames_dataset import N3_AUTHENTIC_MINIGAMES
    
    # 0. Clean Chapter 2 options
    ch2_games = N3_AUTHENTIC_MINIGAMES.get(2, [])
    for g in ch2_games:
        data = g[3] if isinstance(g[3], dict) else g[4]
        if 'questions' in data:
            for q in data['questions']:
                if 'options' in q:
                    q['options'] = [clean_paren(opt) for opt in q['options']]
                if 'answer' in q:
                    q['answer'] = clean_paren(q['answer'])

    # 1. Update Chapter 3 and 4
    N3_AUTHENTIC_MINIGAMES[3] = CH3_GAMES
    N3_AUTHENTIC_MINIGAMES[4] = CH4_GAMES

    # 2. Update Chapters 5 to 20
    for ch in range(5, 21):
        games = N3_AUTHENTIC_MINIGAMES.get(ch, [])
        for g in games:
            data = g[3] if isinstance(g[3], dict) else g[4]
            if 'questions' in data:
                for q in data['questions']:
                    qid = q['id']
                    # Look up Japanese prompt
                    if (ch, qid) in JA_PROMPTS:
                        ja_p = JA_PROMPTS[(ch, qid)]
                        vi_p = q.get('prompt', '')
                        q['prompt'] = ja_p
                        q['promptVi'] = vi_p
                    
                    # Clean options
                    if 'options' in q:
                        q['options'] = [clean_paren(opt) for opt in q['options']]
                    if 'answer' in q:
                        q['answer'] = clean_paren(q['answer'])

    # Write formatted output to scripts/n3_minigames_dataset.py
    import pprint
    with open('scripts/n3_minigames_dataset.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-' + '\n')
        f.write('"""\nGenerate comprehensive, authentic minigames for ALL 20 CHAPTERS of Kanji Master N3.\nEvery chapter has realistic scenario questions with thoroughly randomized word banks and options.\n"""\n\n')
        f.write('import sys\nsys.stdout.reconfigure(encoding=\'utf-8\')\nimport os\n\n')
        f.write('N3_AUTHENTIC_MINIGAMES = ' + pprint.pformat(N3_AUTHENTIC_MINIGAMES, width=120, sort_dicts=False) + '\n')
    
    print("✓ Successfully updated scripts/n3_minigames_dataset.py with authentic content for all 20 chapters!")

if __name__ == '__main__':
    run_update()
