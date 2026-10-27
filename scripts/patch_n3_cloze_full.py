# -*- coding: utf-8 -*-
"""
Rebuild the CLOZE_DIALOGUE minigames of N3 so that EVERY numbered box printed
in the textbook scan is present as a blank (1:1 with the original quiz image).

Usage:  python scripts/patch_n3_cloze_full.py            # dataset file only
        python scripts/patch_n3_cloze_full.py --db       # dataset + Supabase DB
"""
import sys, os, re, json, pprint
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from n3_minigames_dataset import N3_AUTHENTIC_MINIGAMES

CIRCLED = [chr(0x2460 + i) for i in range(20)]


def build(blanks, utts, distractors=()):
    """blanks: list of (answer, targetWord, hiragana, meaning); ids are 1..n in order.
    utts: list of (name, speaker, text) where text uses {n} for blank n."""
    bl = []
    for i, (ans, word, hira, mean) in enumerate(blanks, 1):
        bl.append({
            'id': i, 'num': CIRCLED[i - 1], 'answer': ans,
            'targetWord': word, 'hiragana': hira, 'meaning': mean,
            'explanation': f'{word} ({hira}): Chữ {ans}.',
        })
    ans_by_id = {b['id']: b['answer'] for b in bl}
    dialogue = []
    used = set()
    for name, speaker, text in utts:
        for n in map(int, re.findall(r'\{(\d+)\}', text)):
            used.add(n)
        audio = re.sub(r'\{(\d+)\}', lambda m: ans_by_id[int(m.group(1))], text).replace('\n', ' ')
        dialogue.append({
            'name': name, 'speaker': speaker,
            'text': re.sub(r'\{(\d+)\}', r'[blank:\1]', text),
            'audio': audio,
        })
    assert used == set(ans_by_id), f'blank ids mismatch: {sorted(set(ans_by_id) ^ used)}'
    bank = []
    for b in bl:
        if b['answer'] not in bank:
            bank.append(b['answer'])
    for d in distractors:
        if d not in bank:
            bank.append(d)
    return {'blanks': bl, 'dialogue': dialogue, 'wordBank': bank}


# ───────────────────────── 4章 (Chương 4): 診察 ─────────────────────────
DOCTOR = build(
    [('熱', '熱', 'ねつ', 'Sốt'), ('汗', '汗', 'あせ', 'Mồ hôi'),
     ('温', '体温', 'たいおん', 'Nhiệt độ cơ thể'), ('血', '血', 'ち', 'Máu'),
     ('鼻', '鼻', 'はな', 'Mũi'), ('呼', '呼吸', 'こきゅう', 'Hô hấp'),
     ('液', '血液', 'けつえき', 'Máu (huyết dịch)'), ('検', '検査', 'けんさ', 'Kiểm tra, xét nghiệm')],
    [('A (患者)', 'A', '夕べ急に{1}が出て、たくさん{2}をかいているんです。'),
     ('医者', '医者', 'インフルエンザかもしれません。まずは体{3}を測ってみましょう。'),
     ('B (患者)', 'B', '包丁で切って{4}が止まらないんです。'),
     ('医者', '医者', 'それは大変、すぐに包帯をしましょう。'),
     ('C (患者)', 'C', '{5}がつまって、{6}吸が苦しいんです。'),
     ('医者', '医者', 'そろそろ花粉のきせつですから、もしかすると…。'),
     ('D (患者)', 'D', '体の調子がよくないんです。食欲もないし、つかれがとれないんです。'),
     ('医者', '医者', 'では、血{7}の{8}査をしましょう。')],
    ['痛', '歯'])

# ───────────────────────── 5・6章: 新聞記事 ─────────────────────────
BASEBALL = build(
    [('代', '代表', 'だいひょう', 'Đại diện (đội tuyển)'), ('投', '投手', 'とうしゅ', 'Cầu thủ ném bóng'),
     ('球', '球', 'たま', 'Quả bóng'), ('信', '自信', 'じしん', 'Tự tin'),
     ('負', '勝負', 'しょうぶ', 'Quyết đấu, thắng thua'), ('野', '野球', 'やきゅう', 'Bóng chày'),
     ('笑', '笑顔', 'えがお', 'Gương mặt tươi cười'), ('十', '十七勝', 'じゅうななしょう', '17 trận thắng'),
     ('最', '最多勝', 'さいたしょう', 'Nhiều trận thắng nhất'), ('優', '優勝', 'ゆうしょう', 'Vô địch')],
    [('新聞記事 (Bài báo)', '記事',
      '【石川 メジャーへ】\n日本{1}表にも選ばれたARCの石川一男{2}手(30)が、米大リーグにチャレンジするため、7日、米国へ出発。'),
     ('記者の取材 (Phỏng vấn)', '取材',
      '現地に着いてすぐ記者の取材を受け、「{3}の速さには自{4}がある。まずはストレートで勝{5}したい。日本の{6}球が大リーグで通用することを{7}顔で語った。」'),
     ('戦績 (Thành tích)', '戦績',
      '石川は昨年、先発として{8}七勝を上げ、{9}多勝をかくとくするとともに、チームを{10}勝にみちびいた。')],
    ['手', '表'])

# ───────────────────────── 7〜9章: 結婚式の手紙 ─────────────────────────
WEDDING = build(
    [('結', '結婚', 'けっこん', 'Kết hôn'), ('夫', '夫婦', 'ふうふ', 'Vợ chồng'),
     ('再', '再会', 'さいかい', 'Gặp lại'), ('付', '付き合う', 'つきあう', 'Hẹn hò, qua lại'),
     ('個', '個性', 'こせい', 'Cá tính'), ('彼', '彼', 'かれ', 'Anh ấy'),
     ('幸', '幸せ', 'しあわせ', 'Hạnh phúc'), ('必', '必ず', 'かならず', 'Nhất định'),
     ('守', '守る', 'まもる', 'Bảo vệ, giữ'), ('約', '約束', 'やくそく', 'Lời hứa'),
     ('願', '願う', 'ねがう', 'Cầu mong')],
    [('友子へ (Gửi Tomoko)', '手紙',
      '友子へ\n{1}婚おめでとう。高校時代のクラスメイトだった山川くんと友子が{2}婦になるなんて本当にびっくりした。'),
     ('思い出 (Kỷ niệm)', '手紙',
      '二人が2年前の同窓会で{3}会してそれから{4}き合っていたとは。おとなしい性格の友子と{5}性の強い{6}という組み合わせ…。でも二人ならきっと'),
     ('結び (Lời kết)', '手紙',
      '{7}せなかていを作っていけるはず。彼も友子のことを{8}ず{9}ると親友のわたしに{10}束してくれたよ。二人の幸せを{11}っています。\nひとみより')])

# ───────────────────────── 10・11章 ─────────────────────────
PARTTIME = build(
    [('面', '面接', 'めんせつ', 'Phỏng vấn'), ('接', '面接', 'めんせつ', 'Phỏng vấn'),
     ('徒', '徒歩', 'とほ', 'Đi bộ'), ('歩', '徒歩', 'とほ', 'Đi bộ'),
     ('希', '希望', 'きぼう', 'Nguyện vọng'), ('望', '希望', 'きぼう', 'Nguyện vọng'),
     ('筆', '筆記', 'ひっき', 'Viết (bài thi viết)'), ('記', '筆記', 'ひっき', 'Viết (bài thi viết)')],
    [('店長 (Cửa hàng trưởng)', '店長', 'それでは{1}{2}を始めます。リンさんは今どこに住んでいますか。'),
     ('リン', 'リン', '渋谷です。ここまで{3}{4}で来ました。'),
     ('店長 (Cửa hàng trưởng)', '店長', '近いですね。では、{5}{6}の曜日はありますか。'),
     ('リン', 'リン', '水曜日以外ならできます。'),
     ('店長 (Cửa hàng trưởng)', '店長', 'そうですか、わかりました。それでは、これから日本語の{7}{8}試験をします。'),
     ('リン', 'リン', 'え？今から日本語の試験があるんですか。'),
     ('店長 (Cửa hàng trưởng)', '店長', 'かんたんな会話文を書くテストです。お客様とは日本語で話してもらいますから。'),
     ('リン', 'リン', 'わかりました。がんばります。'),
     ('店長 (Cửa hàng trưởng)', '店長', 'おつかれさまでした。結果は明日電話します。'),
     ('リン', 'リン', 'はい、よろしくお願いします。')])

SCHOOL = build(
    [# 【3】
     ('不', '不良', 'ふりょう', 'Học sinh hư, du côn'), ('面', '真面目', 'まじめ', 'Nghiêm túc, chăm chỉ'),
     ('板', '板前', 'いたまえ', 'Đầu bếp (sushi)'), ('調', '調理師', 'ちょうりし', 'Đầu bếp có chứng chỉ'),
     ('机', '机', 'つくえ', 'Cái bàn'), ('書', '落書き', 'らくがき', 'Vẽ bậy'),
     ('鉄', '鉄棒', 'てつぼう', 'Xà đơn'),
     # 【4】
     ('組', '組', 'くみ', 'Lớp (nhóm)'), ('担', '担任', 'たんにん', 'Giáo viên chủ nhiệm'),
     ('績', '成績', 'せいせき', 'Thành tích học tập'), ('悪', '悪い', 'わるい', 'Xấu, tệ'),
     ('座', '座る', 'すわる', 'Ngồi'), ('落', '落ちこむ', 'おちこむ', 'Chán nản, sa sút'),
     ('夢', '夢', 'ゆめ', 'Giấc mơ'), ('可', '可能性', 'かのうせい', 'Khả năng'),
     ('医', '医師', 'いし', 'Bác sĩ'), ('伸', '伸び', 'のび', 'Duỗi người, vươn vai')],
    [('【3】 花子と和子 — ①〜⑦', '会話',
      '花子：あの、{1}良だった田中君、ずいぶん真{2}目になったね。\n和子：うん。今は{3}前らしいよ。5年前に{4}理師めんきょを取って、すし屋で働いているんだって。'),
     ('【3】 花子と和子 (tiếp)', '会話',
      '花子：あのころは、{5}に落{6}きしたり、{7}棒にガムをつけたり…\n和子：そうそう、いつも先生に怒られてたよね。'),
     ('【4】 頭の元気度チェック ①〜⑦', 'チェック',
      '□ 小学校の時、同じ{8}だった友達の名前を五人以上言えない。\n□ 中学校一年生の時の{9}任の先生の名前が言えない。\n□ 成{10}が急に{11}くなった。\n□ 気付くとぼーっと{12}っていることがある。\n□ 最近{13}ちこむことが多い。\n□ 今、{14}がない。'),
     ('【4】 頭の元気度チェック ⑧〜⑩ (kết quả)', 'チェック',
      '☑が5〜6個：頭の元気がなくなっている{15}能性があります。今すぐ{16}師に相談を！\n☑が3〜4個：最近つかれていませんか？たまには{17}びをして、頭を休めて！\n☑が1〜2個：今は元気ですが、油断しないで！\n☑が0個：あなたの頭はまだまだ元気！夢に向かってがんばろう！')],
    ['受', '験'])

# ───────────────────────── 12・13章: ARC科学館 ─────────────────────────
SCIENCE = build(
    [('由', '自由', 'じゆう', 'Tự do'), ('感', '感覚', 'かんかく', 'Cảm giác'),
     ('種', '種類', 'しゅるい', 'Chủng loại'), ('深', '深める', 'ふかめる', 'Đào sâu'),
     ('底', '海底', 'かいてい', 'Đáy biển'), ('氷', '氷河', 'ひょうが', 'Băng hà'),
     ('陽', '太陽', 'たいよう', 'Mặt trời'), ('季', '四季', 'しき', 'Bốn mùa'),
     ('列', '列島', 'れっとう', 'Quần đảo'), ('巨', '巨大', 'きょだい', 'Khổng lồ')],
    [('ARC科学館 (Bảo tàng khoa học ARC)', 'パンフレット',
      'ARC科学館では、館内を自{1}に見学することができます。全てのものをじっさいにさわることができますので、{2}覚を確かめてみてください。また、多くの{3}類のアトラクションを体験することができます！ARC科学館で、科学に関する知識を{4}めましょう！'),
     ('3Dムービーシアター上映中', 'パンフレット',
      '★11:00〜11:30 海の中の生活って？？〜海{5}への旅〜\n★12:00〜12:30 {6}河があぶない！？〜アラスカへの旅〜\n★13:00〜13:30 空から地球を見てみよう！〜地球・月・太{7}の関係〜\n★14:00〜14:30 {8}の移り変わりの中で見る日本〜日本{9}島の旅〜'),
     ('お知らせ', 'パンフレット',
      '※ただいま{10}大プラネタリウムを建設中です！ お楽しみに！！\n開館時間：10:00〜17:00　休館日：毎週水曜日\n入場料：大人800円　学生・子ども400円')],
    ['気', '流'])

# ───────────────────────── 14・15章 ─────────────────────────
HOUSE_MAP = build(
    [('泊', '泊まり', 'とまり', 'Ở lại qua đêm'), ('進', '進める', 'すすめる', 'Tiến lên'),
     ('角', '角', 'かど', 'Góc đường'), ('曲', '曲がる', 'まがる', 'Rẽ'),
     ('折', '右折', 'うせつ', 'Rẽ phải'), ('側', '左側', 'ひだりがわ', 'Phía bên trái')],
    [('田中 (Tanaka)', '田中', 'ねえ、今度の日曜日、うちに{1}まりに来る約束だったでしょう。地図を書いてきたから、ちょっと見てみて。'),
     ('金 (Kim)', '金', 'うん。ありがとう。えーっと、ここが駅だよね。まずは北口を出て、まっすぐ{2}めばいいんだね。それから…二つ目の{3}を右に{4}がるのかな。'),
     ('田中 (Tanaka)', '田中', 'そうそう。そこを右{5}して、50メートルぐらい行くと大きいスーパーが左{6}にあるから、その先の交差点を左ね。'),
     ('金 (Kim)', '金', 'うん。だいたい分かった。'),
     ('田中 (Tanaka)', '田中', 'もし分からなかったら電話してね。迎えに行くから。'),
     ('金 (Kim)', '金', 'オッケー。')],
    ['直', '横'])

EUROPE = build(
    [('欧', '欧州', 'おうしゅう', 'Châu Âu'), ('団', '団体', 'だんたい', 'Đoàn thể'),
     ('観', '観光客', 'かんこうきゃく', 'Khách du lịch'), ('迎', '送迎', 'そうげい', 'Đưa đón'),
     ('移', '移動', 'いどう', 'Di chuyển'), ('絵', '絵画展', 'かいがてん', 'Triển lãm tranh'),
     ('祭', '祭り', 'まつり', 'Lễ hội'), ('注', '注意', 'ちゅうい', 'Chú ý'),
     ('程', '日程', 'にってい', 'Lịch trình'), ('飛', '飛行機', 'ひこうき', 'Máy bay'),
     ('宿', '宿泊', 'しゅくはく', 'Lưu trú'), ('変', '変わる', 'かわる', 'Thay đổi')],
    [('広告 (Quảng cáo tour)', 'パンフ',
      '今だけ！！ {1}州 6日間 198,000円　2/1(月)〜2/28(日)\n〜卒業旅行や社員旅行としても人気〜'),
     ('特長 (Điểm nổi bật)', 'パンフ',
      '十名以上の場合、{2}体料金でさらに安くなります！\n{3}光客が少ないオフシーズンだからこそチャンス！\n人気のパリ・ローマ・ロンドンをめぐります！'),
     ('スペシャルサービス', 'パンフ',
      '1) くうこう―ホテル間はバスの送{4}あり\n2) {5}動はごうかなリムジンバス\n3) {6}画展のペアチケットをプレゼント\n4) 2月10日からは地元の{7}りもかいさい予定\n5) ウェルカムドリンクをサービス'),
     ('注意事項', 'パンフ',
      '＜{8}意＞\nこのツアーは日{9}や時間のへんこうはできません。\n{10}行機の便や{11}泊するホテルのランクによって、料金が{12}わる場合があります。\nくわしくはツアーデスクまでお問い合わせください。')],
    ['便', '泊'])

# ───────────────────────── 16・17章 ─────────────────────────
JOB_AD = build(
    [('求', '求人', 'きゅうじん', 'Tuyển người'), ('広', '広告', 'こうこく', 'Quảng cáo'),
     ('店', '店員', 'てんいん', 'Nhân viên cửa hàng'), ('相', '相談', 'そうだん', 'Thương lượng'),
     ('給', '時給', 'じきゅう', 'Lương theo giờ'), ('支', '支給', 'しきゅう', 'Chi trả'),
     ('内', '仕事内容', 'しごとないよう', 'Nội dung công việc'), ('連', '連絡先', 'れんらくさき', 'Địa chỉ liên lạc')],
    [('広告 (Tiêu đề)', '求人広告', '≪{1}人{2}告≫\nすきやき銀座館　アルバイト{3}員ぼしゅう！'),
     ('勤務条件', '求人広告',
      '＜場所＞銀座三丁目\n＜時間・曜日＞18:00〜22:00　週3〜4日　※曜日は{4}談の上、決定します。\n＜時{5}＞1,000円〜　※交通費{6}給'),
     ('仕事内容・連絡先', '求人広告',
      '＜仕事{7}容＞\nお客様の注文をとったり、お料理を出したりする接客が中心です。接客が初めての方にもていねいに教えます！明るい方、人と話すのが好きな方、いっしょに働きませんか。おうぼされる方は、下記番号までお電話ください。\n＜{8}絡先＞03-53〇〇-△△××　担当：ヒグチ')],
    ['員', '職'])

# ───────────────────────── 18〜20章 ─────────────────────────
INDUSTRY = build(
    [('産', '産業', 'さんぎょう', 'Sản nghiệp'), ('農', '農業', 'のうぎょう', 'Nông nghiệp'),
     ('技', '技術', 'ぎじゅつ', 'Kỹ thuật'), ('機', '機械化', 'きかいか', 'Cơ giới hóa'),
     ('商', '商業', 'しょうぎょう', 'Thương nghiệp'), ('貿', '貿易', 'ぼうえき', 'Mậu dịch'),
     ('豊', '豊か', 'ゆたか', 'Giàu có, sung túc')],
    [('日記 (1)', '日記', '今日、学校でぼくの町の{1}業の歴史について調べた。町ができたころは{2}業、特に野菜作りがさかんで、その野菜は主に都市部に出荷されていたそうだ。'),
     ('日記 (2)', '日記', '車の工場ができた後は、町の約半分の人が車工場で働くようになり、この町の{3}術の高さが全国に知られるようになったそうだ。なんだかすごいなあ。'),
     ('日記 (3)', '日記', '工場の{4}械化が進んで人の手をあまり使わなくなると、今度は{5}業やサービス業がさかえてきたそうだ。今では外国との{6}易がこの町を支えているらしい。'),
     ('日記 (4)', '日記', 'だから、お父さんは英語ができないと、後で困るぞといつも言っているのかなあ。今回調べて、自分の町の産業がだんだん大きくなってきたことがわかった。今、{7}かな生活ができているのも、きっとそのおかげなんだろうな。')],
    ['工', '易'])

PM_POLICY = build(
    [('副', '副', 'ふく', 'Phó'), ('貧', '貧富', 'ひんぷ', 'Giàu nghèo'),
     ('平', '平等', 'びょうどう', 'Bình đẳng'), ('方', '方法', 'ほうほう', 'Phương pháp'),
     ('税', '税金', 'ぜいきん', 'Tiền thuế'), ('許', '許して', 'ゆるして', 'Tha thứ, chấp nhận'),
     ('戦', '戦争', 'せんそう', 'Chiến tranh'), ('兵', '兵器', 'へいき', 'Vũ khí'),
     ('禁', '禁止', 'きんし', 'Cấm chỉ'), ('役', '役目', 'やくめ', 'Vai trò, nhiệm vụ'),
     ('実', '実現', 'じつげん', 'Thực hiện'), ('険', '険しい', 'けわしい', 'Hiểm trở, gian nan')],
    [('ある国の首相の思い (1)', '首相',
      'この国は問題が山積みだ…。まずは私の強力な助けとなる、{1}首相を決めよう。そして、国内の{2}富の差をどうすれば小さくできるかを考えなければ。'),
     ('ある国の首相の思い (2)', '首相',
      'みなが{3}等な社会にするための、いい{4}法はないだろうか。経済を安定させるには{5}金を上げる必要もあるが、そんなことをして、今も生活が苦しいと感じている人々が{6}してくれるだろうか…。'),
     ('ある国の首相の思い (3)', '首相',
      'ああ、それにまわりの国では、{7}争が続いているところもある。不安のない国にするにはどうすればいいだろうか…。やはり{8}器の使用を{9}止するための各国への働きかけも必要だろう。'),
     ('ある国の首相の思い (4)', '首相',
      'とにかく、私には人々の生活を守るという大きな{10}目がある。理想を{11}現していくのは{12}しい道のりだが、なんとかがんばらなければ…。')],
    [])

# (chapter, image file) -> (new data, optional new title, optional new instruction)
PATCHES = {}
def add(chs, img, data, title=None, instr=None):
    for c in chs:
        PATCHES[(c, img)] = (data, title, instr)

add([4], 'quiz_3_4_doctor_patient.webp', DOCTOR)
add([5, 6], 'quiz_5_6_baseball_article.webp', BASEBALL)
add([7, 8, 9], 'quiz_7_9_wedding_letter.webp', WEDDING)
add([10, 11], 'quiz_10_11_parttime_interview.webp', PARTTIME)
add([10, 11], 'quiz_10_11_p2.webp', SCHOOL,
    'Minigame 4: Hội thoại bạn học cũ & Kiểm tra sức khỏe trí não (10・11章 クイズ 【3】【4】)',
    'Điền 17 chữ Hán còn thiếu vào các ô trống (7 ô của bài 【3】 và 10 ô của bài 【4】). Bấm loa để nghe tiếng Nhật.')
add([12, 13], 'quiz_12_13_p2.webp', SCIENCE,
    'Minigame 4: Tờ rơi Bảo tàng khoa học ARC (12・13章 クイズ 【4】)',
    'Đọc tờ rơi ARC科学館 và điền chữ Hán vào đủ 10 ô trống. Bấm loa để nghe tiếng Nhật.')
add([14, 15], 'quiz_14_15_house_map.webp', HOUSE_MAP)
add([14, 15], 'quiz_14_15_europe_tour.webp', EUROPE)
add([16, 17], 'quiz_16_17_job_ad.webp', JOB_AD)
add([18, 19, 20], 'quiz_18_20_industry_diary.webp', INDUSTRY)
add([18, 19, 20], 'quiz_18_20_pm_policy.webp', PM_POLICY)


def patch_dataset():
    games_dict = {}
    hit = set()
    for ch, glist in N3_AUTHENTIC_MINIGAMES.items():
        new_list = []
        for g in glist:
            gtype, title, instr, img, data, order = g
            key = (ch, img.split('/')[-1])
            if gtype == 'CLOZE_DIALOGUE' and key in PATCHES:
                nd, nt, ni = PATCHES[key]
                g = (gtype, nt or title, ni or instr, img, nd, order)
                hit.add(key)
            new_list.append(g)
        games_dict[ch] = new_list
    missing = set(PATCHES) - hit
    assert not missing, f'patches not applied: {missing}'
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'n3_minigames_dataset.py')
    with open(path, 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\n"""\nAuthentic minigames dataset for ALL 20 CHAPTERS of Kanji Master N3.\n')
        f.write('Faithful 1:1 mapping with textbook Quiz sections.\n"""\n\n')
        f.write('N3_AUTHENTIC_MINIGAMES = ')
        f.write(pprint.pformat(games_dict, indent=2, width=120))
        f.write('\n')
    print(f'dataset updated: {len(hit)} games patched')
    return games_dict


def patch_db(games_dict):
    import psycopg2
    conn = psycopg2.connect(host='52.65.247.42', port=6543, dbname='postgres',
                            user='postgres.bxqwarbeocbsfjieqbsq',
                            password=os.environ.get('SUPABASE_DB_PASSWORD', 'hnvuwww1234A'),
                            sslmode='require')
    cur = conn.cursor()
    n = 0
    for (ch, img), (nd, nt, ni) in sorted(PATCHES.items()):
        cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level='N3' AND chapter_number=%s;", (ch,))
        row = cur.fetchone()
        if not row:
            print('chapter not found', ch); continue
        cur.execute("SELECT id, title, instruction FROM kanji_minigames WHERE chapter_id=%s AND game_type='CLOZE_DIALOGUE' AND image_url LIKE %s;",
                    (row[0], '%' + img))
        for mid, t, i in cur.fetchall():
            cur.execute("UPDATE kanji_minigames SET game_data_json=%s, title=%s, instruction=%s WHERE id=%s;",
                        (json.dumps(nd, ensure_ascii=False), nt or t, ni or i, mid))
            n += 1
            print(f'  ch{ch} {img}: {len(nd["blanks"])} blanks -> minigame id {mid}')
    conn.commit(); cur.close(); conn.close()
    print(f'DB updated: {n} rows')


if __name__ == '__main__':
    gd = patch_dataset()
    if '--db' in sys.argv:
        patch_db(gd)
