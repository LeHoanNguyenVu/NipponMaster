import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import random
import psycopg2

# Set seed for reproducible randomization across A, B, C, D
random.seed(42)

conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password="hnvuwww1234A",
    sslmode="require"
)
conn.autocommit = False
cur = conn.cursor()

def shuffle_choices(correct, distractors):
    opts = [correct] + distractors[:3]
    random.shuffle(opts)
    return opts

try:
    print("=" * 80)
    print("STEP 1: SYNC KANJI CHAPTERS TOC & KANJI COUNTS")
    print("=" * 80)
    chapters_meta = [
        (31, 1, '家族', 'Gia đình', 8, '8 chữ Hán về quan hệ gia đình: 家, 族, 兄, 弟, 姉, 妹, 私, 育.'),
        (32, 2, 'コンビニ', 'Cửa hàng tiện lợi Conbini', 22, '22 chữ Hán về dịch vụ, hàng hóa conbini và thời gian: 店, 客, 親, 切, 売, 当, 品, 便, 利, 使, 銀, 白, 黒, 紙, 朝, 晩, 昼, 夜, 前, 後, 午, 早.'),
        (33, 3, 'おくり物', 'Quà tặng & Bưu phẩm', 23, '23 chữ Hán về bưu phẩm chuyển phát và địa chỉ: 荷, 送, 宅, 急, 速, 遅, 重, 軽, 住, 所, 様, 主, 番, 地, 号, 京, 都, 道, 府, 県, 市, 区, 村.'),
        (34, 4, 'デート', 'Hẹn hò & Thời trang', 23, '23 chữ Hán về hẹn hò rạp phim và thời trang: 毎, 週, 映, 画, 図, 館, 公, 園, 夫, 妻, 特, 思, 料, 理, 有, 洋, 服, 衣, 短, 毛, 糸, 玉, 光.'),
        (35, 5, '町', 'Phố xá, Nhà ga & Y tế', 24, '24 chữ Hán về ga tàu, giao thông và bệnh viện: 駅, 鉄, 乗, 降, 開, 閉, 発, 着, 交, 通, 台, 止, 色, 赤, 黄, 青, 病, 院, 医, 科, 薬, 待, 合, 計.'),
        (36, 6, '学生', 'Đời sống sinh viên & Ẩm thực', 22, '22 chữ Hán về sinh viên, tiệc tùng và quán ramen: 研, 究, 語, 文, 英, 化, 数, 心, 若, 集, 知, 酒, 歌, 声, 楽, 味, 油, 太, 細, 皿, 飯, 麦.'),
        (37, 7, '春夏秋冬', 'Bốn mùa, Thời tiết & Du lịch', 23, '23 chữ Hán về các mùa, dự báo thời tiết và du lịch: 春, 夏, 秋, 冬, 空, 星, 雲, 去, 天, 晴, 雪, 風, 強, 弱, 暑, 寒, 旅, 持, 世, 界, 写, 真, 船.'),
        (38, 8, '学校', 'Trường học, Thi cử & Xã hội', 24, '24 chữ Hán về học tập, thi cử và chính trị lịch sử: 勉, 漢, 宿, 題, 質, 問, 教, 室, 試, 験, 答, 考, 正, 丸, 不, 同, 政, 治, 経, 済, 歴, 史, 国, 王.'),
        (39, 9, '休みのひ', 'Ngày nghỉ & Khám phá thiên nhiên', 24, '24 chữ Hán về thể thao ngoài trời và đồng quê dã ngoại: 運, 動, 練, 習, 走, 歩, 泳, 才, 自, 然, 草, 原, 湖, 谷, 海, 辺, 里, 野, 奥, 池, 虫, 羽, 鳴, 馬.')
    ]

    for cid, cnum, tja, tvi, kcnt, desc in chapters_meta:
        cur.execute("""
            UPDATE kanji_chapters
            SET chapter_number = %s, title_ja = %s, title_vi = %s, kanji_count = %s, description = %s
            WHERE id = %s;
        """, (cnum, tja, tvi, kcnt, desc, cid))
    print("Updated kanji_chapters metadata.")

    print("\n" + "=" * 80)
    print("STEP 2: ENSURE ALL 193 KANJIS EXIST & UPDATE IMAGE_URL")
    print("=" * 80)
    
    # Check missing kanjis in Chapter 2: 朝, 晩, 昼, 夜
    ch2_missing = [
        ('朝', 'チョウ', 'あさ', 'asa', 'TRIỀU', 'Buổi sáng', 12, '十 -> 日 -> 十 -> 月', '朝食は いつも パンと コーヒーです。', 'Choushoku wa itsumo pan to koohii desu.', 'Bữa sáng tôi luôn ăn bánh mì và cà phê.', 'Bình minh buổi sáng', 'Mười ánh dương le lói mọc lên khi mặt trăng vừa lặn.', '🌅', 15),
        ('晩', 'バン', '', 'ban', 'VÃN', 'Buổi tối, hoàng hôn', 12, '日 -> 免', '今晩 9時から ドラマを 見ます。', 'Konban kuji kara dorama o mimasu.', 'Tối nay từ 9 giờ tôi sẽ xem phim truyền hình.', 'Mặt trời lặn xế bóng', 'Mặt trời miễn nhiệm nhiệm vụ khi hoàng hôn buông xuống.', '🌃', 16),
        ('昼', 'チュウ', 'ひる', 'hiru', 'TRÚ', 'Buổi trưa, ban ngày', 9, '尺 -> 日', '昼食は ラーメンを 食べました。', 'Chuushoku wa raamen o tabemashita.', 'Bữa trưa tôi đã ăn mì ramen.', 'Mặt trời chính ngọ', 'Vầng thái dương đứng bóng giữa ban trưa rực rỡ.', '☀️', 17),
        ('夜', 'ヤ', 'よ, よる', 'yoru', 'DẠ', 'Đêm, tối trời', 8, '亠 -> 夕', 'いつも 夜 10時に ねます。', 'Itsumo yoru juuji ni nemasu.', 'Tôi thường đi ngủ lúc 10 giờ đêm.', 'Màn đêm che phủ', 'Dưới mái nhà khi trăng non hé lộ là đêm tối.', '🌙', 18)
    ]

    for char, onr, kunr, rom, hv, mn, sc, rad, ex_sent, ex_rom, ex_vi, mn_title, mn_hint, mn_icon, ch_ord in ch2_missing:
        cur.execute("SELECT id FROM kanjis WHERE character = %s AND chapter_id = 32;", (char,))
        if not cur.fetchone():
            cur.execute("""
                INSERT INTO kanjis (chapter_id, jlpt_level, character, on_reading, kun_reading, romaji, han_viet, meaning, stroke_count, radical, example_sentence, example_romaji, example_meaning, mnemonic_title, mnemonic_hint, mnemonic_icon, chapter_order, image_url, created_at)
                VALUES (32, 'N4', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW());
            """, (char, onr, kunr, rom, hv, mn, sc, rad, ex_sent, ex_rom, ex_vi, mn_title, mn_hint, mn_icon, ch_ord, f"/assets/kanji/n4/illustrations/kanji_n4_{char}.webp"))
            print(f"Inserted missing kanji: {char} in Chapter 2 (ID 32)")

    # Update image_url for ALL N4 kanjis to single character cropped icons
    cur.execute("""
        UPDATE kanjis
        SET image_url = '/assets/kanji/n4/illustrations/kanji_n4_' || character || '.webp'
        WHERE chapter_id IN (SELECT id FROM kanji_chapters WHERE jlpt_level = 'N4');
    """)
    print("Updated image_url for all N4 kanjis to /assets/kanji/n4/illustrations/kanji_n4_{char}.webp")

    print("\n" + "=" * 80)
    print("STEP 3: SEED COMPLETE 20 EXERCISES PER CHAPTER (RANDOMIZED A, B, C, D)")
    print("=" * 80)

    # Clean existing exercises for chapters 31..39
    cur.execute("DELETE FROM kanji_exercises WHERE chapter_id BETWEEN 31 AND 39;")
    print("Cleared existing exercises for chapters 31-39.")

    # 20 Exercises per chapter data: (type, question_text, target_word, correct_answer, distractors, explanation)
    ALL_CHAPTER_EXERCISES = {
        31: [
            # Reading 1-10
            ('READING', '子どものころ よく [兄弟]げんかを しました。', '兄弟', 'きょうだい', ['けいだい', 'おとうと', 'あに'], 'Chữ 兄 (HUYNH) + 弟 (ĐỆ) đọc là きょうだい (anh em).'),
            ('READING', '２年まえに [家]を 新しく たてました。', '家', 'いえ', ['うち', 'か', 'や'], 'Nhà cửa đọc Kun là いえ (家).'),
            ('READING', '[お兄さん]は 何時に 帰ってきますか。', 'お兄さん', 'おにいさん', ['おとうとさん', 'おねえさん', 'おじさん'], 'Gọi anh trai người khác lịch sự là お兄さん (おにいさん).'),
            ('READING', '[妹]は おなかが すくと すぐ なきます。', '妹', 'いもうと', ['おとうと', 'あね', 'あに'], 'Em gái đọc là いもうと (妹).'),
            ('READING', '小学校のころ 体[育]が いちばん 好きでした。', '育', 'いく', ['そだ', 'ゆく', 'きょう'], 'Thể dục là 体育 (たいいく), chữ 育 đọc âm On là いく.'),
            ('READING', '[家族]そろって 晩ご飯を 食べます。', '家族', 'かぞく', ['いえぞく', 'やぞく', 'かぞ'], 'Gia đình là 家族 (かぞく).'),
            ('READING', '[姉]は けっこんして 名字が かわりました。', '姉', 'あね', ['いもうと', 'はは', 'あに'], 'Chị gái của tôi đọc là あね (姉).'),
            ('READING', 'お[姉]さんは ピアノの 先生です。', '姉', 'ねえ', ['にい', 'ばあ', 'ねい'], 'Chị gái người khác là お姉さん (おねえさん).'),
            ('READING', '[私]は ベトナムから 来ました。', '私', 'わたし', ['わたくし', 'ぼく', 'おれ'], 'Tôi đọc là わたし (私).'),
            ('READING', '山川さんは いなかで [育ちました]。', '育ちました', 'そだちました', ['たちました', 'まちました', 'もちました'], 'Động từ 育つ đọc là そだつ (lớn lên, trưởng thành).'),
            # Writing 11-20
            ('WRITING', '[あに]は アメリカに りゅう学しています。', 'あに', '兄', ['弟', '父', '私'], 'Anh trai tôi là chữ 兄 (HUYNH).'),
            ('WRITING', '[おとうと]は 今年 小学生に なりました。', 'おとうと', '弟', ['兄', '子', '男'], 'Em trai tôi là chữ 弟 (ĐỆ).'),
            ('WRITING', 'わたしの [いえ]に あそびに きてください。', 'いえ', '家', ['族', '室', '店'], 'Ngôi nhà là chữ 家 (GIA).'),
            ('WRITING', 'かのじょは [いもうと]と よく にています。', 'いもうと', '妹', ['姉', '女', '母'], 'Em gái là chữ 妹 (MUỘI).'),
            ('WRITING', 'こどもを たいせつに [そだて]ます。', 'そだて', '育て', ['教え', '生て', '立て'], 'Nuôi nấng là động từ 育てる (育て).'),
            ('WRITING', 'らいしゅう [かぞく]りょこうに いきます。', 'かぞく', '家族', ['家内', '族家', '親族'], 'Gia đình là chữ 家族.'),
            ('WRITING', '[あね]は かいしゃいんです。', 'あね', '姉', ['妹', '母', '婦'], 'Chị gái tôi là chữ 姉 (TỶ).'),
            ('WRITING', '[わたし]の しゅみは どくしょです。', 'わたし', '私', ['家', '人', '自'], 'Tôi là chữ 私 (TƯ).'),
            ('WRITING', 'たなかさんの お[にい]さんは せが たかいです。', 'にい', '兄', ['弟', '父', '長'], 'Anh trai là chữ 兄.'),
            ('WRITING', 'たいいくかんで [たいいく]の じゅぎょうを します。', 'たいいく', '体育', ['体教', '体生', '体化'], 'Thể dục là chữ 体育.')
        ],
        32: [
            # Reading 1-10
            ('READING', 'えきの まえに 新しい [店]が できました。', '店', 'みせ', ['いえ', 'へや', 'えき'], 'Chữ 店 (TIẾM) đọc Kun là みせ (cửa hàng, tiệm).'),
            ('READING', 'あの レストランは いつも お[客]さんが たくさんいます。', '客', 'きゃく', ['かく', 'きゃ', 'きく'], 'Khách hàng là お客さん (おきゃくさん).'),
            ('READING', '店員さんが とても [親切]に してくれました。', '親切', 'しんせつ', ['しんきり', 'おやせつ', 'おやきり'], 'Chữ 親 (THÂN) + 切 (THIẾT) đọc là しんせつ (thân thiện, tốt bụng).'),
            ('READING', 'コンビニで [切手]と はがきを 買いました。', '切手', 'きって', ['きりて', 'せつて', 'せってい'], 'Tem thư đọc là 切手 (きって).'),
            ('READING', 'この店では おいしい お弁当を [売って]います。', '売って', 'うって', ['かって', 'はらって', 'もって'], 'Động từ 売る đọc Kun là うる (bán hàng) -> 売って (うって).'),
            ('READING', 'コンビニは 24時間 あいていて [便利]です。', '便利', 'べんり', ['びんり', 'てんり', 'ゆうり'], 'Thuận tiện, tiện lợi là 便利 (べんり).'),
            ('READING', '銀行の ATMを [使って] お金を おろします。', '使って', 'つかって', ['つくって', 'ならって', 'はらって'], 'Động từ 使う đọc là つかう (sử dụng).'),
            ('READING', '駅前に おおきな [銀行]が あります。', '銀行', 'ぎんこう', ['かねこう', 'しろこう', 'ぎんごう'], 'Ngân hàng là 銀 (NGÂN) + 行 (HÀNH) -> ぎんこう.'),
            ('READING', '毎朝 コンビニで [朝食]を 買います。', '朝食', 'ちょうしょく', ['あさしょく', 'ちゅうしょく', 'ゆうしょく'], 'Bữa sáng là 朝 (TRIÊU) + 食 (THỰC) -> ちょうしょく.'),
            ('READING', '[今晩] 9時から おもしろい ドラマを 見ます。', '今晩', 'こんばん', ['いまばん', 'きょうばん', 'こんや'], 'Tối nay đọc là 今晩 (こんばん).'),
            # Writing 11-20
            ('WRITING', 'レジの [まえ]に ならんで おまちください。', 'まえ', '前', ['後', '午', '早'], 'Phía trước là chữ 前 (TIỀN).'),
            ('WRITING', 'しょくじの [あと]で くすりを のみます。', 'あと', '後', ['前', '早', '晩'], 'Sau khi là chữ 後 (HẬU).'),
            ('WRITING', 'あしたの [ごぜん]ちゅうに にもつが とどきます。', 'ごぜん', '午前', ['午後', '早前', '朝前'], 'Buổi sáng là 午前 (ごぜん).'),
            ('WRITING', 'けさ 5じに [はやく] おきました。', 'はやく', '早く', ['遅く', '長く', '短く'], 'Sớm là tính từ 早い -> 早く (はやく).'),
            ('WRITING', 'しろい [かみ]に なまえを かいてください。', 'かみ', '紙', ['手', '切', '本'], 'Tờ giấy là chữ 紙 (CHỈ).'),
            ('WRITING', 'のーとに [くろい] ぺんで かきます。', 'くろい', '黒い', ['白い', '青い', '赤い'], 'Màu đen là tính từ 黒い (くろい).'),
            ('WRITING', 'なつに [しろい] しゃつを きます。', 'しろい', '白い', ['黒い', '黄色い', '青い'], 'Màu trắng là tính từ 白い (しろい).'),
            ('WRITING', 'この すーぱーは [しなもの]が ほうふです。', 'しなもの', '品物', ['店物', '買物', '売物'], 'Hàng hóa là 品物 (しなもの).'),
            ('WRITING', 'たからくじが [あたり]ました。', 'あたり', '当たり', ['入り', '売り', '切り'], 'Trúng thưởng là 当たる -> 当たり (あたり).'),
            ('WRITING', '[ひるま]は とても あたたかいです。', 'ひるま', '昼間', ['夜間', '朝間', '晩間'], 'Ban ngày là 昼間 (ひるま).')
        ],
        33: [
            # Reading 1-10
            ('READING', '重い [荷物]を もって 階段を あがります。', '荷物', 'にもつ', ['かもつ', 'かぶつ', 'にぶつ'], 'Hành lý, kiện hàng là 荷物 (にもつ).'),
            ('READING', '国の 家族に プレゼントを [送りました]。', '送りました', 'おくりました', ['とどけました', 'わたしました', 'だしました'], 'Động từ 送る đọc là おくる (gửi đi).'),
            ('READING', '[宅急便]で 荷物が ぶじに とどきました。', '宅急便', 'たっきゅうびん', ['たくきゅうべん', 'いえきゅうびん', 'やっきゅうびん'], 'Chuyển phát nhanh bưu phẩm là 宅急便 (たっきゅうびん).'),
            ('READING', '時間が ないので [急いで] 駅へ むかいます。', '急いで', 'いそいで', ['はしって', 'あるいて', 'すすんで'], 'Động từ 急ぐ đọc là いそぐ (vội vàng, khẩn trương).'),
            ('READING', '大切な 書類を [速達]で 郵送しました。', '速達', 'そくたつ', ['はやたつ', 'ちょうたつ', 'きゅうたつ'], 'Thư hỏa tốc chuyển phát nhanh là 速達 (そくたつ).'),
            ('READING', 'じこのため 電車が 15分 [遅れました]。', '遅れました', 'おくれました', ['とまりました', 'こわれました', 'すぎました'], 'Động từ 遅れる đọc là おくれる (bị muộn, trễ).'),
            ('READING', 'この スーツケースは とても [重い]です。', '重い', 'おもい', ['おおい', 'あつい', 'ふかい'], 'Nặng là tính từ 重い (おもい).'),
            ('READING', '申し込み用紙に [住所]と 氏名を 書きます。', '住所', 'じゅうしょ', ['すましょ', 'じゅうじょ', 'じゅしょ'], 'Địa chỉ nơi ở là 住所 (じゅうしょ).'),
            ('READING', '[田中様]、お荷物の 配達に まいりました。', '田中様', 'たなかさま', ['たなかさん', 'たなかどの', 'たなかくん'], 'Kính xưng tôn kính sau tên khách là 様 (さま).'),
            ('READING', '来月 [京都]へ 修学旅行に 行きます。', '京都', 'きょうと', ['とうきょう', 'みやこ', 'けいと'], 'Cố đô Kyoto đọc là 京都 (きょうと).'),
            # Writing 11-20
            ('WRITING', 'この かばんは [かるい]ので もちやすいです。', 'かるい', '軽い', ['重い', '早い', '薄い'], 'Nhẹ nhàng là tính từ 軽い (かるい).'),
            ('WRITING', 'とうきょうの まんしょんに [すんで]います。', 'すんで', '住んで', ['往んで', '止んで', '休んで'], 'Sinh sống cư trú là động từ 住む (住んで).'),
            ('WRITING', 'しずかで べんりな [ところ]に ひっこしたい。', 'ところ', '所', ['戸', '家', '室'], 'Nơi chốn, địa điểm là chữ 所 (SỞ).'),
            ('WRITING', 'あなたの でんわ[ばんごう]を おしえてください。', 'ばんごう', '番号', ['番目', '号数', '記号'], 'Số thứ tự, số điện thoại là 番号 (ばんごう).'),
            ('WRITING', 'この ひろい [とち]に いえを たてます。', 'とち', '土地', ['地所', '地名', '地方'], 'Đất đai là chữ 土地 (とち).'),
            ('WRITING', 'わたしの いえは [とうきょうと]に あります。', 'とうきょうと', '東京都', ['東京府', '東京県', '東京市'], 'Thủ đô Tokyo đọc là 東京都.'),
            ('WRITING', 'ほっかい[どう]の ふゆは ゆきが おおいです。', 'どう', '道', ['府', '県', '州'], 'Hokkaido là chữ 北海道 (ĐẠO).'),
            ('WRITING', 'きょうと[ふ]と おおさかふは かんさいです。', 'ふ', '府', ['都', '県', '市'], 'Phủ Kyoto/Osaka là chữ 府 (PHỦ).'),
            ('WRITING', '[しやくしょ]で じゅうみんひょうを もらいました。', 'しやくしょ', '市役所', ['町役所', '区役所', '村役所'], 'Tòa thị chính là 市役所 (しやくしょ).'),
            ('WRITING', 'やまおくの ちいさな [むら]で うまれました。', 'むら', '村', ['町', '市', '区'], 'Thôn làng quê là chữ 村 (THÔN).')
        ],
        34: [
            # Reading 1-10
            ('READING', '[毎週] 土曜日の 朝に 部屋を そうじします。', '毎週', 'まいしゅう', ['まいしゅ', 'まいげつ', 'まいしゅん'], 'Mỗi tuần đọc là 毎週 (まいしゅう).'),
            ('READING', '休日に [映画館]へ 行って アニメを 見ました。', '映画館', 'えいがかん', ['えがかん', 'ずしょかん', 'びじゅつかん'], 'Rạp chiếu phim là 映画館 (えいがかん).'),
            ('READING', '[図書館]で 日本語の 辞書を かりました。', '図書館', 'としょかん', ['ずしょかん', 'とじょかん', 'ずしょけん'], 'Thư viện đọc là 図書館 (としょかん).'),
            ('READING', '天気が いいので [公園]の ベンチで 休みます。', '公園', 'こうえん', ['どうえん', 'ごうえん', 'ていえん'], 'Công viên đọc là 公園 (こうえん).'),
            ('READING', '私の [夫]は 毎朝 コーヒーを いれてくれます。', '夫', 'おっと', ['つま', 'ちち', 'あに'], 'Chồng của mình đọc là 夫 (おっと).'),
            ('READING', '結婚記念日に [妻]と レストランで 食事しました。', '妻', 'つま', ['おっと', 'はは', 'あね'], 'Vợ của mình đọc là 妻 (つま).'),
            ('READING', '今日は 私たちにとって [特別]な 日です。', '特別', 'とくべつ', ['とくわけ', 'とくぶん', 'とくべん'], 'Đặc biệt là chữ 特別 (とくべつ).'),
            ('READING', '日本[料理]の 中で すきやきが 大好きです。', '料理', 'りょうり', ['りょうい', 'より', 'りょうち'], 'Món ăn, nấu nướng là 料理 (りょうり).'),
            ('READING', 'この 温泉は 外国人にも とても [有名]です。', '有名', 'ゆうめい', ['うめい', 'ありめい', 'ゆめい'], 'Nổi tiếng là 有名 (ゆうめい).'),
            ('READING', 'デパートの セールで [洋服]を まとめ買いしました。', '洋服', 'ようふく', ['うみふく', 'たいふく', 'せいふく'], 'Âu phục, quần áo phương Tây là 洋服 (ようふく).'),
            # Writing 11-20
            ('WRITING', '[らいしゅう]の にちようびに えいがを みます。', 'らいしゅう', '来週', ['先週', '今週', '毎週'], 'Tuần sau là chữ 来週 (らいしゅう).'),
            ('WRITING', 'かぞくの ことを いつも [おもって]います。', 'おもって', '思って', ['考って', '感じて', '願って'], 'Nghĩ về, tưởng nhớ là 思う -> 思って (おもって).'),
            ('WRITING', 'この しりょうは だれでも [むりょう]で よめます。', 'むりょう', '無料', ['有料', '給料', '材料'], 'Miễn phí là chữ 無料 (むりょう).'),
            ('WRITING', 'さむいので あたたかい [うわぎ]を きます。', 'うわぎ', '上着', ['下着', '洋着', '和着'], 'Áo khoác bên ngoài là 上着 (うわぎ).'),
            ('WRITING', 'なつの よるは ひるまより [みじかい]です。', 'みじかい', '短い', ['長い', '狭い', '低い'], 'Ngắn ngủi là tính từ 短い (みじかい).'),
            ('WRITING', 'あたたかい [けいと]の まふらーを あみました。', 'けいと', '毛糸', ['綿糸', '絹糸', '麻糸'], 'Sợi len là chữ 毛糸 (けいと).'),
            ('WRITING', 'さいほうばこから はりと [いと]を だします。', 'いと', '糸', ['布', '線', '網'], 'Sợi chỉ, sợi tơ là chữ 糸 (いと).'),
            ('WRITING', 'あめあがりに [みずたま]が ひかっています。', 'みずたま', '水玉', ['雨玉', '波玉', '雲玉'], 'Hạt nước tròn xoe là 水玉 (みずたま).'),
            ('WRITING', 'あさひの [ひかり]が へやに さしこみます。', 'ひかり', '光', ['火', '灯', '照'], 'Ánh sáng là chữ 光 (ひかり).'),
            ('WRITING', 'えきまえの [えいが]かんの まえで あいましょう。', 'えいが', '映画', ['計画', '漫画', '図画'], 'Phim ảnh là chữ 映画 (えいが).')
        ],
        35: [
            # Reading 1-10
            ('READING', '毎朝 [地下鉄]に 乗って 会社へ かよっています。', '地下鉄', 'ちかてつ', ['じかてつ', 'ちげてつ', 'ちかかね'], 'Tàu điện ngầm là 地下鉄 (ちかてつ).'),
            ('READING', '次の 駅で 急行電車に [乗り換えます]。', '乗り換えます', 'のりかえます', ['おりかえます', 'のりこえます', 'のりすぎます'], 'Chuyển tàu là 乗り換える (のりかえる).'),
            ('READING', '終点の 東京駅で 全員が [降ります]。', '降ります', 'おります', ['ふります', 'のります', 'あがります'], 'Xuống xe là động từ 降りる -> 降ります (おります).'),
            ('READING', '高速バスは 午前8時ちょうどに [出発]します。', '出発', 'しゅっぱつ', ['しゅつほつ', 'でぱつ', 'でっぱつ'], 'Xuất phát, khởi hành là 出発 (しゅっぱつ).'),
            ('READING', '飛行機は ていこく通りに [到着]しました。', '到着', 'とうちゃく', ['とうき', 'とうつく', 'いちゃく'], 'Đến nơi, hạ cánh là 到着 (とうちゃく).'),
            ('READING', '人通りの 多い [交差点]を 気をつけて わたります。', '交差点', 'こうさてん', ['まじさてん', 'こうさじょ', 'こうさてい'], 'Ngã tư đường phố là 交差点 (こうさてん).'),
            ('READING', '赤信号の 手前で 車が しっかり [止まりました]。', '止まりました', 'とまりました', ['やみました', 'とどまりました', 'きまりました'], 'Dừng lại là động từ 止まる -> 止まりました (とまりました).'),
            ('READING', 'かぜを ひいたので 近所の [医院]で 診てもらいました。', '医院', 'いいん', ['びょういん', 'いしゃ', 'やくきょく'], 'Phòng khám bệnh tư là 医院 (いいん).'),
            ('READING', '熱を 下げる [薬]を 処方してもらいました。', '薬', 'くすり', ['ちゃ', 'くさ', 'みず'], 'Thuốc men đọc là 薬 (くすり).'),
            ('READING', '看護師さんが [体温計]を 持ってきました。', '体温計', 'たいおんけい', ['たいおんき', 'からだけい', 'おんけい'], 'Nhiệt kế đo thân nhiệt là 体温計 (たいおんけい).'),
            # Writing 11-20
            ('WRITING', '[えき]の にしぐちで ともだちと まちあわせます。', 'えき', '駅', ['鉄', '道', '港'], 'Nhà ga là chữ 駅 (DỊCH).'),
            ('WRITING', 'でんしゃの どあが [ひらき]ます。', 'ひらき', '開き', ['閉き', '発き', '着き'], 'Mở cửa là động từ 開く -> 開き (ひらき).'),
            ('WRITING', 'どあが [しまり]ますので ごちゅういください。', 'しまり', '閉まり', ['開き', '止まり', '降り'], 'Đóng cửa là động từ 閉まる -> 閉まり (しまり).'),
            ('WRITING', 'まいあさ このみちを [とおって] つうきんします。', 'とおって', '通って', ['道って', '走って', '歩って'], 'Đi qua lại hàng ngày là 通る -> 通って (とおって).'),
            ('WRITING', 'ちゅうしゃじょうに くるまが さん[だい] あります。', 'だい', '台', ['台', '個', '枚'], 'Đơn vị đếm xe cộ máy móc là chữ 台 (ĐÀI).'),
            ('WRITING', '[あか]い しんごうの ときは わたってはいけません。', 'あか', '赤', ['青', '黄', '黒'], 'Màu đỏ là chữ 赤 (XÍCH).'),
            ('WRITING', '[あお]しんごうを かくにんして まっすぐ すすみます。', 'あお', '青', ['赤', '白', '緑'], 'Màu xanh đèn tín hiệu là chữ 青 (THANH).'),
            ('WRITING', 'ちちは [びょうき]が なおって たいいんしました。', 'びょうき', '病気', ['痛気', '医院', '元気'], 'Bệnh tật là chữ 病気 (びょうき).'),
            ('WRITING', 'やさしい [いしゃ]の せんせいに みてもらいました。', 'いしゃ', '医者', ['薬者', '科者', '院者'], 'Bác sĩ là chữ 医者 (いしゃ).'),
            ('WRITING', 'びょういんの [まちあいしつ]で じゅんばんを まちます。', 'まちあいしつ', '待合室', ['待室', '合室', '見合室'], 'Phòng chờ là chữ 待合室 (まちあいしつ).')
        ],
        36: [
            # Reading 1-10
            ('READING', '大学院で 日本の 近代文学を [研究]しています。', '研究', 'けんきゅう', ['とぎゅう', 'けんきゅ', 'とぎゅ'], 'Nghiên cứu là chữ 研究 (けんきゅう).'),
            ('READING', '留学生と [英語]で コミュニケーションを とります。', '英語', 'えいご', ['はなご', 'えご', 'えいごう'], 'Tiếng Anh là 英語 (えいご).'),
            ('READING', '日本の 伝統的な [文化]を 体験しました。', '文化', 'ぶんか', ['もんか', 'ふみか', 'ぶんけ'], 'Văn hóa là 文化 (ぶんか).'),
            ('READING', '出席した 学生の [数]を 正確に 数えます。', '数', 'かず', ['すう', 'かぞ', 'す'], 'Số lượng đọc Kun là 数 (かず).'),
            ('READING', '渋谷の 街に 多くの [若者]が 集まっています。', '若者', 'わかもの', ['じゃくしゃ', 'わかひと', 'じゃくもの'], 'Giới trẻ thanh niên là 若者 (わかもの).'),
            ('READING', 'テストの 後 みんなで 駅前に [集まりました]。', '集まりました', 'あつまりました', ['あつまりました', 'あつまりました', 'あつまりました'], 'Tụ họp là động từ 集まる -> 集まりました (あつまりました).'),
            ('READING', '成人式を 迎えて 初めて 日本の [お酒]を 飲みました。', 'お酒', 'おさけ', ['おみき', 'おさか', 'おしゅ'], 'Rượu Sake đọc là お酒 (おさけ).'),
            ('READING', 'リラックスするために クラシック[音楽]を 聞きます。', '音楽', 'おんがく', ['おんらく', 'こえがく', 'いんがく'], 'Âm nhạc là 音楽 (おんがく).'),
            ('READING', 'この 豚骨ラーメンは スープの [味]が 深いです。', '味', 'あじ', ['み', 'あじわい', 'かおり'], 'Hương vị đọc Kun là 味 (あじ).'),
            ('READING', 'うどんや パンは [小麦粉]から 作られます。', '小麦粉', 'こむぎこ', ['おおむぎこ', 'こむぎふん', 'ばくふん'], 'Bột mì là 小麦粉 (こむぎこ).'),
            # Writing 11-20
            ('WRITING', 'にほんごで みじかい [さくぶん]を かきました。', 'さくぶん', '作文', ['文章', '論文', '本文'], 'Bài tập làm văn là 作文 (さくぶん).'),
            ('WRITING', 'ぶじに とどきましたので どうぞ [ごあんしん]ください。', 'ごあんしん', 'ご安心', ['ご心配', 'ご心中', 'ご感心'], 'Yên tâm, an tâm là ご安心 (ごあんしん).'),
            ('WRITING', 'あの ゆうめいな かしゅの なまえを [しって]いますか。', 'しって', '知って', ['思って', '聞いて', '見て'], 'Biết tin tức là động từ 知る -> 知って (しって).'),
            ('WRITING', 'からおけぼっくすで すきな [うた]を ねっしょうしました。', 'うた', '歌', ['声', '楽', '曲'], 'Bài hát là chữ 歌 (CA).'),
            ('WRITING', 'せんせいに きこえるように おおきな [こえ]で はなします。', 'こえ', '声', ['音', '話', '言'], 'Tiếng nói là chữ 声 (THANH).'),
            ('WRITING', 'ともだちと すごす じかんは とても [たのしい]です。', 'たのしい', '楽しい', ['嬉しい', '優しい', '美しい'], 'Vui vẻ là tính từ 楽しい (たのしい).'),
            ('WRITING', 'ちゅうか りょうりには ごま[あぶら]を よく つかいます。', 'あぶら', '油', ['脂', '汁', '酒'], 'Dầu mè, dầu ăn là chữ 油 (DU).'),
            ('WRITING', 'この みせの らーめんは めんが [ふとい]のが とくちょうです。', 'ふとい', '太い', ['細い', '長い', '厚い'], 'To béo sợi to là tính từ 太い (ふとい).'),
            ('WRITING', 'そうめんのように [ほそい] めんが たべやすいです。', 'ほそい', '細い', ['太い', '短い', '薄い'], 'Sợi mảnh mai là tính từ 細い (ほそい).'),
            ('WRITING', 'まいばん かぞくそろって あたたかい [ごはん]を たべます。', 'ごはん', 'ご飯', ['御飯', '昼飯', '朝飯'], 'Cơm, bữa ăn là ご飯 (ごはん).')
        ],
        37: [
            # Reading 1-10
            ('READING', '[春休み]に 京都の 桜を 見に 行きました。', '春休み', 'はるやすみ', ['しゅんやすみ', 'はるきゅう', 'ふゆやすみ'], 'Kỳ nghỉ xuân đọc là 春休み (はるやすみ).'),
            ('READING', '[夏]の ビーチで 友だちと バーベキューを しました。', '夏', 'なつ', ['あき', 'ふゆ', 'はる'], 'Mùa hè đọc là 夏 (なつ).'),
            ('READING', '[秋]に なると 山の もみじが 赤く そまります。', '秋', 'あき', ['ふゆ', 'なつ', 'はる'], 'Mùa thu đọc là 秋 (あき).'),
            ('READING', '北海道の [冬]は マイナス10度に なります。', '冬', 'ふゆ', ['あき', 'なつ', 'はる'], 'Mùa đông đọc là 冬 (ふゆ).'),
            ('READING', '台風が 去って すがすがしい [青空]が 広がりました。', '青空', 'あおぞら', ['せいそう', 'あおそら', 'せいくう'], 'Bầu trời trong xanh là 青空 (あおぞら).'),
            ('READING', '明日の 天気予報は 一日中 [晴天]の 見込みです。', '晴天', 'せいてん', ['はれてん', 'あおてん', 'せいてい'], 'Thời tiết nắng đẹp quang đãng là 晴天 (せいてん).'),
            ('READING', '超大型の [台風]が 九州に 近づいています。', '台風', 'たいふう', ['だいふう', 'たいふ', 'おおふう'], 'Cơn bão lớn là 台風 (たいふう).'),
            ('READING', '週末に 友だちと 温泉[旅行]に 行く 計画です。', '旅行', 'りょこう', ['たびゆき', 'りょぎょう', 'たびこう'], 'Du lịch là 旅行 (りょこう).'),
            ('READING', 'いつか 豪華客船で [世界]一周の 旅を したい。', '世界', 'せかい', ['せがい', 'よかい', 'せいかい'], 'Thế giới là 世界 (せかい).'),
            ('READING', '満開の 桜の [写真]を たくさん 撮影しました。', '写真', 'しゃしん', ['しゃじん', 'うつしん', '真写'], 'Bức ảnh chụp là 写真 (しゃしん).'),
            # Writing 11-20
            ('WRITING', 'よるの そらに まんてんの [ほし]が かがやいています。', 'ほし', '星', ['月', '日', '光'], 'Ngôi sao đêm là chữ 星 (TINH).'),
            ('WRITING', 'あおぞらに しろい [くも]が ぷかぷか うかんでいます。', 'くも', '雲', ['雪', '雨', '風'], 'Đám mây là chữ 雲 (VÂN).'),
            ('WRITING', '[きょねん]の よんがつに はじめて にほんへ きました。', 'きょねん', '去年', ['来年', '今年', '先年'], 'Năm ngoái là chữ 去年 (きょねん).'),
            ('WRITING', 'あしたの [てんき]は いちにちじゅう はれるでしょう。', 'てんき', '天気', ['空気', '気候', '空晴'], 'Thời tiết là chữ 天気 (てんき).'),
            ('WRITING', 'まふゆの あさは いきが しろくなるほど [さむい]です。', 'さむい', '寒い', ['暑い', '冷たい', '涼しい'], 'Lạnh cóng thời tiết là tính từ 寒い (さむい).'),
            ('WRITING', 'たいようが てりつけて じょうとうに [あつい] ひです。', 'あつい', '暑い', ['寒い', '暖かい', '熱い'], 'Nóng bức thời tiết là tính từ 暑い (あつい).'),
            ('WRITING', 'うみの ちかくは かぜが とても [つよく] ふきます。', 'つよく', '強く', ['弱く', '早く', '重く'], 'Thổi mạnh là tính từ 強い -> 強く (つよく).'),
            ('WRITING', 'かいがいりょこうの ときは ぱすぽーとを [もって] あるきます。', 'もって', '持って', ['取って', '待って', '着て'], 'Cầm nắm mang theo là 持つ -> 持って (もって).'),
            ('WRITING', 'へいわな [よのなか]に なってほしいと ねがっています。', 'よのなか', '世の中', ['世界中', '社会中', '天下中'], 'Thế gian đời này là 世の中 (よのなか).'),
            ('WRITING', 'おおきな [ふね]に のって しまへ わたります。', 'ふね', '船', ['舟', '車', '機'], 'Con thuyền tàu thủy là chữ 船 (THUYỀN).')
        ],
        38: [
            # Reading 1-10
            ('READING', 'JLPT 合格の ために 毎日 3時間 [勉強]します。', '勉強', 'べんきょう', ['めんきょう', 'べんこう', 'つとめきょう'], 'Học tập chăm chỉ là 勉強 (べんきょう).'),
            ('READING', '毎日 新しい [漢字]を 5文字ずつ 暗記します。', '漢字', 'かんじ', ['かんち', 'からじ', 'かんし'], 'Chữ Hán là 漢字 (かんじ).'),
            ('READING', '放課後 図書館で 今日の [宿題]を すませました。', '宿題', 'しゅくだい', ['しゅくたい', 'やどだい', 'しゅくだ'], 'Bài tập về nhà là 宿題 (しゅくだい).'),
            ('READING', '授業で 分からない 点を 先生に [質問]しました。', '質問', 'しつもん', ['しちもん', 'しつとい', 'ちつもん'], 'Câu hỏi chất vấn là 質問 (しつもん).'),
            ('READING', '休み時間に [教室]の 窓を あけて 換気します。', '教室', 'きょうしつ', ['きょうじつ', 'きょうや', 'をしえしつ'], 'Phòng học lớp học là 教室 (きょうしつ).'),
            ('READING', '今学期の 期末[試験]で 満点を 取りました。', '試験', 'しけん', ['じけん', 'しげん', 'ためしけん'], 'Kỳ thi, bài kiểm tra là 試験 (しけん).'),
            ('READING', 'テスト用紙に 正しい [答え]を 記入してください。', '答え', 'こたえ', ['とうえ', 'とい', 'こたえい'], 'Câu trả lời đáp án là 答え (こたえ).'),
            ('READING', '自分の 将来の 進路を 深く [考えて] 決めます。', '考えて', 'かんがえて', ['おもって', 'かんがって', 'しらべて'], 'Suy nghĩ đắn đo là 考える -> 考えて (かんがえて).'),
            ('READING', '日本の 現代[経済]に ついて レポートを 書きます。', '経済', 'けいざい', ['けいさい', 'きょうざい', 'けいせい'], 'Kinh tế là chữ 経済 (けいざい).'),
            ('READING', '江戸時代の [歴史]を 調べるのが 大好きです。', '歴史', 'れきし', ['れきじ', 'へきし', 'りきし'], 'Lịch sử là chữ 歴史 (れきし).'),
            # Writing 11-20
            ('WRITING', 'せんせいが ていねいに ぶんぽうを [おしえて]くれました。', 'おしえて', '教えて', ['習えて', '伝えて', '告げて'], 'Dạy bảo là động từ 教える -> 教えて (おしえて).'),
            ('WRITING', 'もんだいぶんを よくよんで [ただしい]ものを えらびなさい。', 'ただしい', '正しい', ['直しい', '真しい', '正敷い'], 'Chính xác đúng đắn là tính từ 正しい (ただしい).'),
            ('WRITING', 'てすとの こたえがあっていたので あかい [まる]を もらいました。', 'まる', '丸', ['円', '玉', '環'], 'Dấu khoanh tròn đúng là chữ 丸 (maru).'),
            ('WRITING', 'ちかくに すーぱーが なくて とても [ふべん]です。', 'ふべん', '不便', ['不通', '不安', '不利'], 'Bất tiện là chữ 不便 (ふべん).'),
            ('WRITING', 'ともだちと [おなじ] だいがくに しんがくしたいです。', 'おなじ', '同じ', ['共じ', '合同', '同い'], 'Giống nhau cùng chung là tính từ 同じ (おなじ).'),
            ('WRITING', 'にほんの [せいじ]に ついて てれびで はなしています。', 'せいじ', '政治', ['政事', '政法', '治政'], 'Chính trị là chữ 政治 (せいじ).'),
            ('WRITING', 'おくすりを のんで かぜが すっかり [なおり]ました。', 'なおり', '治り', ['直り', '平り', '定り'], 'Khỏi bệnh chữa lành là động từ 治る -> 治り (なおり).'),
            ('WRITING', 'きょうの しゅくだいが ぜんぶ [すみ]ました。', 'すみ', '済み', ['終み', '完了', '過み'], 'Xong xuôi hoàn tất là 済む -> 済み (すみ).'),
            ('WRITING', 'じぶんの [くに]に かえって なつかしい ともだちに あいます。', 'くに', '国', ['邦', '郷', '界'], 'Đất nước tổ quốc là chữ 国 (QUỐC).'),
            ('WRITING', 'むかし このくにを つよい [おうさま]が おさめていました。', 'おうさま', '王様', ['主様', '帝様', '皇様'], 'Vị vua chúa là chữ 王様 (おうさま).')
        ],
        39: [
            # Reading 1-10
            ('READING', '休日は 朝早くから 河川敷で [運動]を します。', '運動', 'うんどう', ['はこどう', 'うんとう', 'ぐんどう'], 'Vận động thể dục là 運動 (うんどう).'),
            ('READING', '試合に 勝つために 毎日 シュートの [練習]を します。', '練習', 'れんしゅう', ['ねりしゅう', 'れんじゅう', 'ねりならい'], 'Luyện tập rèn luyện là 練習 (れんしゅう).'),
            ('READING', '遅刻しそうだったので 駅まで 全力で [走りました]。', '走りました', 'はしりました', ['あるきました', 'とびました', 'いきました'], 'Chạy nhanh là 走る -> 走りました (はしりました).'),
            ('READING', '健康のために 毎日 8000歩 [歩いて]います。', '歩いて', 'あるいて', ['はしって', 'すすんで', 'とまって'], 'Đi bộ là động từ 歩く -> 歩いて (あるいて).'),
            ('READING', '週末は 市民プールで [水泳]を して 汗を 流します。', '水泳', 'すいえい', ['みずおよぎ', 'すいおよぎ', 'すいえ'], 'Môn bơi lội là 水泳 (すいえい).'),
            ('READING', '豊かな [自然]に かこまれて のんびり 暮らしたい。', '自然', 'しぜん', ['じねん', 'しねん', 'じぜん'], 'Thiên nhiên là 自然 (しぜん).'),
            ('READING', '緑の [草原]で 馬たちが 気持ちよさそうに 走っています。', '草原', 'そうげん', ['くさはら', 'くさばら', 'そうはら'], 'Thảo nguyên là 草原 (そうげん).'),
            ('READING', '富士五湖の 一つである 山中[湖]で ボートに 乗りました。', '湖', 'こ', ['みずうみ', 'うみ', 'いけ'], 'Hồ nước trong danh từ riêng đọc là こ (湖).'),
            ('READING', '夕方に [海辺]を さんぽして 夕日を ながめました。', '海辺', 'うみべ', ['かいへん', 'うみあたり', 'かいべ'], 'Bờ biển, ven biển là 海辺 (うみべ).'),
            ('READING', '高原の 牧場で 初めて [乗馬]を 体験しました。', '乗馬', 'じょうば', ['のりうま', 'じょうま', 'のりば'], 'Cưỡi ngựa thể thao là 乗馬 (じょうば).'),
            # Writing 11-20
            ('WRITING', 'かのじょは ごがくの [さいのう]に めぐまれています。', 'さいのう', '才能', ['才力', '天才', '知能'], 'Tài năng thiên phú là 才能 (さいのう).'),
            ('WRITING', 'ひとの せいにしないで [じぶん]の あたまで かんがえなさい。', 'じぶん', '自分', ['自親', '自我', '自身'], 'Bản thân mình là 自分 (じぶん).'),
            ('WRITING', 'はるに なって にわの [くさ]が あおあおと はえてきました。', 'くさ', '草', ['花', '木', '苗'], 'Cây cỏ là chữ 草 (THẢO).'),
            ('WRITING', 'ふかい [たに]の そこを すきとおった かわが ながれています。', 'たに', '谷', ['山', '川', '丘'], 'Thung lũng hẻm núi là chữ 谷 (CỐC).'),
            ('WRITING', 'なつやすみに なつかしい [さと]がえりを しました。', 'さと', '里', ['村', '郷', '町'], 'Về thăm quê hương là 里帰り (里).'),
            ('WRITING', 'ちいさな こどもたちが [のはら]を げんきに かけまわっています。', 'のはら', '野原', ['草原', '高原', '広場'], 'Cánh đồng hoang dã là 野原 (のはら).'),
            ('WRITING', 'やまの [おく]に ひっそりと たつ おんせんやどに とまりました。', 'おく', '奥', ['深', '内', '裏'], 'Sâu bên trong là chữ 奥 (奥).'),
            ('WRITING', 'こうえんの ひろい [いけ]で かもが およいでいます。', 'いけ', '池', ['湖', '海', '沼'], 'Hồ ao nước là chữ 池 (TRÌ).'),
            ('WRITING', 'なつの よるに いろいろな [むし]の こえが きこえます。', 'むし', '虫', ['蝉', '蝶', '鳥'], 'Côn trùng sâu bọ là chữ 虫 (TRÙNG).'),
            ('WRITING', 'あおい とりの きれいな [はね]を ひろいました。', 'はね', '羽', ['翼', '毛', '尾'], 'Chiếc lông vũ, cánh chim là chữ 羽 (羽).')
        ]
    }

    total_ex_inserted = 0
    option_distribution = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
    letters = ['A', 'B', 'C', 'D']

    for cid, exercises in ALL_CHAPTER_EXERCISES.items():
        for idx, (etype, qtext, target, ans, dists, expl) in enumerate(exercises, 1):
            shuffled = shuffle_choices(ans, dists)
            pos = shuffled.index(ans)
            option_distribution[letters[pos]] += 1
            
            cur.execute("""
                INSERT INTO kanji_exercises (chapter_id, exercise_type, question_text, target_word, correct_answer, options_json, explanation, display_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
            """, (cid, etype, qtext, target, ans, json.dumps(shuffled, ensure_ascii=False), expl, idx))
            total_ex_inserted += 1

    print(f"Inserted {total_ex_inserted} total exercises across 9 chapters.")
    print(f"Correct answer distribution across choices: {option_distribution}")

    print("\n" + "=" * 80)
    print("STEP 4: SEED COMPLETE INTERACTIVE MINIGAMES FOR ALL 9 CHAPTERS")
    print("=" * 80)

    # Clean existing minigames for chapters 31..39
    cur.execute("DELETE FROM kanji_minigames WHERE chapter_id BETWEEN 31 AND 39;")
    print("Cleared existing minigames for chapters 31-39.")

    ALL_MINIGAMES = {
        31: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Sơ đồ gia phả gia đình Tanaka (Trang 26)",
                "instruction": "Quan sát tranh sơ đồ gia đình Tanaka ở trang 26 và chọn chữ Hán xưng hô chuẩn xác.",
                "image_url": "/assets/kanji/n4/minigames/chap1_game1_family_tree.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu (れい): Vị trí ở giữa — Tôi", "answer": "私 (わたし)"},
                    "questions": [
                        {"id": 1, "prompt": "① Vị trí bên trái của Tôi — Người anh trai trong nhà:", "options": shuffle_choices("兄 (あに)", ["弟 (おとうと)", "父 (ちち)", "私 (わたし)"]), "answer": "兄 (あに)", "explanation": "Vị trí người anh trai là 兄 (あに)."},
                        {"id": 2, "prompt": "② Vị trí phía dưới của Tôi — Người em trai nhỏ trong gia đình:", "options": shuffle_choices("弟 (おとうと)", ["兄 (あに)", "姉 (あね)", "妹 (いもうと)"]), "answer": "弟 (おとうと)", "explanation": "Vị trí người em trai là 弟 (おとうと)."},
                        {"id": 3, "prompt": "③ Vị trí bên phải của Tôi — Người chị gái đảm đang:", "options": shuffle_choices("姉 (あね)", ["妹 (いもうと)", "母 (はは)", "兄 (あに)"]), "answer": "姉 (あね)", "explanation": "Vị trí người chị gái là 姉 (あね)."},
                        {"id": 4, "prompt": "④ Vị trí bên cạnh em trai — Bé gái nhỏ nhất nhà:", "options": shuffle_choices("妹 (いもうと)", ["姉 (あね)", "弟 (おとうと)", "私 (わたし)"]), "answer": "妹 (いもうと)", "explanation": "Bé gái em út trong nhà là 妹 (いもうと)."},
                        {"id": 5, "prompt": "⑤ Toàn thể các thành viên hợp lại gọi chung là:", "options": shuffle_choices("家族 (かぞく)", ["家 (いえ)", "家庭 (かてい)", "親族 (しんぞく)"]), "answer": "家族 (かぞく)", "explanation": "Gia đình sum họp là 家族 (かぞく)."}
                    ]
                }
            }
        ],
        32: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Hóa đơn tính tiền & Quầy thanh toán Conbini",
                "instruction": "Đọc các thông tin trên hóa đơn quầy thu ngân Conbini và chọn chữ Hán tương ứng.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_店.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Người đứng quầy phục vụ thanh toán", "answer": "店員 (てんいん)"},
                    "questions": [
                        {"id": 1, "prompt": "① Món cơm hộp hâm nóng tại cửa hàng tiện lợi:", "options": shuffle_choices("お弁当 (おべんとう)", ["切手 (きって)", "品物 (しなもの)", "朝食 (ちょうしょく)"]), "answer": "お弁当 (おべんとう)", "explanation": "Cơm hộp là お弁当 (bento) có chữ 当."},
                        {"id": 2, "prompt": "② Người bước vào cửa hàng mua sắm được gọi tôn kính là:", "options": shuffle_choices("お客様 (おきゃくさま)", ["店員 (てんいん)", "家族 (かぞく)", "友達 (ともだち)"]), "answer": "お客様 (おきゃくさま)", "explanation": "Khách hàng là お客 (KHÁCH) + 様 (DẠNG)."},
                        {"id": 3, "prompt": "③ Hàng hóa đa dạng phong phú được gọi là:", "options": shuffle_choices("品物 (しなもの)", ["切手 (きって)", "紙 (かみ)", "店 (みせ)"]), "answer": "品物 (しなもの)", "explanation": "Hàng hóa sản phẩm là 品物 (PHẨM VẬT)."},
                        {"id": 4, "prompt": "④ Tính chất phục vụ 24 giờ nhanh chóng của Conbini:", "options": shuffle_choices("便利 (べんり)", ["不便 (ふべん)", "利用 (りよう)", "親切 (しんせつ)"]), "answer": "便利 (べんり)", "explanation": "Tiện lợi thuận tiện là 便利 (TIỆN LỢI)."},
                        {"id": 5, "prompt": "⑤ Thiết bị rút tiền tự động đặt tại cửa hàng tiện lợi là máy:", "options": shuffle_choices("銀行ATM (ぎんこう)", ["郵便局 (ゆうびんきょく)", "市役所 (しやくしょ)", "交番 (こうばん)"]), "answer": "銀行ATM (ぎんこう)", "explanation": "Cây ATM của ngân hàng là 銀行ATM (NGÂN HÀNH)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Nhịp sống 24 giờ & Giờ mở cửa Conbini",
                "instruction": "Nhận diện mốc thời gian ngày đêm và thời điểm hoạt động tại cửa hàng 24h.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_朝.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Thời gian từ 0h đến 12h trưa", "answer": "午前 (ごぜん)"},
                    "questions": [
                        {"id": 1, "prompt": "① Bữa ăn vào buổi sáng sớm trước khi đi học/đi làm:", "options": shuffle_choices("朝食 (ちょうしょく)", ["昼食 (ちゅうしょく)", "晩ご飯 (ばんごはん)", "夜食 (やしょく)"]), "answer": "朝食 (ちょうしょく)", "explanation": "Bữa sáng là 朝食 (TRIÊU THỰC)."},
                        {"id": 2, "prompt": "② Thời điểm nghỉ trưa ăn trưa lúc 12 giờ là:", "options": shuffle_choices("昼休み (ひるやすみ)", ["朝休み (あさやすみ)", "夜休み (よるやすみ)", "早退 (そうたい)"]), "answer": "昼休み (ひるやすみ)", "explanation": "Nghỉ trưa là 昼休み (TRÚ HƯU)."},
                        {"id": 3, "prompt": "③ Bữa cơm vào buổi tối muộn sau giờ tan ca:", "options": shuffle_choices("晩ご飯 (ばんごはん)", ["朝ご飯 (あさごはん)", "昼食 (ちゅうしょく)", "午食 (ごしょく)"]), "answer": "晩ご飯 (ばんごはん)", "explanation": "Cơm tối là 晩ご飯 (VÃN)."},
                        {"id": 4, "prompt": "④ Cửa hàng mở suốt đêm không đóng cửa phục vụ nhịp sống:", "options": shuffle_choices("夜間 (やかん)", ["昼間 (ひるま)", "午前 (ごぜん)", "早朝 (そうちょう)"]), "answer": "夜間 (やかん)", "explanation": "Ban đêm là 夜間 (DẠ GIAN)."},
                        {"id": 5, "prompt": "⑤ Thức dậy vào lúc sáng sớm gọi là:", "options": shuffle_choices("早起き (はやおき)", ["遅起き (おそおき)", "前起き (まえおき)", "後起き (あとおき)"]), "answer": "早起き (はやおき)", "explanation": "Dậy sớm là 早起き (TẢO KHỞI)."}
                    ]
                }
            }
        ],
        33: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Điền phiếu gửi hàng Takkyubin",
                "instruction": "Xem các mục cần điền trên phiếu chuyển phát bưu kiện và chọn chữ Hán chính xác.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_荷.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Bưu phẩm, hành lý cần gửi đi", "answer": "荷物 (にもつ)"},
                    "questions": [
                        {"id": 1, "prompt": "① Dịch vụ giao bưu kiện tận nhà phổ biến nhất Nhật Bản:", "options": shuffle_choices("宅急便 (たっきゅうびん)", ["速達 (そくたつ)", "便利用 (べんりよう)", "郵便 (ゆうびん)"]), "answer": "宅急便 (たっきゅうびん)", "explanation": "Chuyển phát bưu phẩm tận nhà là 宅急便 (TRẠCH CẤP TIỆN)."},
                        {"id": 2, "prompt": "② Người nhận kiện hàng được viết kính ngữ là:", "options": shuffle_choices("お名前 + 様 (さま)", ["お名前 + 主 (ぬし)", "お名前 + 君 (くん)", "お名前 + 方 (かた)"]), "answer": "お名前 + 様 (さま)", "explanation": "Kính xưng người nhận thư bưu phẩm là 様 (さま)."},
                        {"id": 3, "prompt": "③ Dãy số định danh để người giao hàng liên lạc:", "options": shuffle_choices("電話番号 (でんわばんごう)", ["郵便番号 (ゆうびんばんごう)", "番地 (ばんち)", "号室 (ごうしつ)"]), "answer": "電話番号 (でんわばんごう)", "explanation": "Số điện thoại là 電話番号 (PHIÊN HIỆU)."},
                        {"id": 4, "prompt": "④ Dịch vụ chuyển thư hỏa tốc với tốc độ cao:", "options": shuffle_choices("速達 (そくたつ)", ["遅達 (おそたつ)", "宅急 (たっきゅう)", "急便 (きゅうびん)"]), "answer": "速達 (そくたつ)", "explanation": "Chuyển phát nhanh hỏa tốc là 速達 (TỐC ĐẠT)."},
                        {"id": 5, "prompt": "⑤ Kiện hàng kích thước to và cồng kềnh có khối lượng:", "options": shuffle_choices("重い (おもい)", ["軽い (かるい)", "速い (はやい)", "遅い (おそい)"]), "answer": "重い (おもい)", "explanation": "Nặng là tính từ 重い (TRỌNG)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Bản đồ 47 Tỉnh thành Hành chính Nhật Bản",
                "instruction": "Nhận diện danh xưng các đơn vị hành chính Đô - Đạo - Phủ - Huyện trên bản đồ.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_都.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Thủ đô Nhật Bản (Tokyo)", "answer": "東京都 (とうきょうと)"},
                    "questions": [
                        {"id": 1, "prompt": "① Đơn vị hành chính duy nhất mang danh 'Đạo' ở cực bắc Nhật Bản:", "options": shuffle_choices("北海道 (ほっかいどう)", ["東京都 (とうきょうと)", "京都府 (きょうとふ)", "大阪府 (おおさかふ)"]), "answer": "北海道 (ほっかいどう)", "explanation": "Hokkaido là đơn vị hành chính mang chữ 道 (ĐẠO)."},
                        {"id": 2, "prompt": "② Hai địa phương mang danh 'Phủ' (府) ở vùng Kansai gồm Osaka và:", "options": shuffle_choices("京都府 (きょうとふ)", ["広島県 (ひろしまけん)", "福岡県 (ふくおかけん)", "愛知県 (あいちけん)"]), "answer": "京都府 (きょうとふ)", "explanation": "Hai Phủ của Nhật là 大阪府 và 京都府."},
                        {"id": 3, "prompt": "③ Đa số 43 đơn vị hành chính còn lại của Nhật Bản mang danh xưng:", "options": shuffle_choices("県 (けん)", ["市 (し)", "区 (く)", "村 (むら)"]), "answer": "県 (けん)", "explanation": "Các tỉnh của Nhật Bản dùng chữ 県 (HUYỆN/Tỉnh)."},
                        {"id": 4, "prompt": "④ Cơ quan hành chính quản lý việc đổi hộ khẩu, giấy tờ của thành phố:", "options": shuffle_choices("市役所 (しやくしょ)", ["警察署 (けいさつしょ)", "消防署 (しょうぼうしょ)", "税務署 (ぜいむしょ)"]), "answer": "市役所 (しやくしょ)", "explanation": "Tòa thị chính thành phố là 市役所 (THỊ DỊCH SỞ)."},
                        {"id": 5, "prompt": "⑤ Khu vực vùng sâu thanh bình có đồng ruộng và hàng cây xanh mát:", "options": shuffle_choices("村 (むら)", ["都会 (とかい)", "市街 (しがい)", "空港 (くうこう)"]), "answer": "村 (むら)", "explanation": "Làng quê thôn dã là chữ 村 (THÔN)."}
                    ]
                }
            }
        ],
        34: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Lịch hẹn hò, Xem phim & Dạo công viên",
                "instruction": "Sắp xếp lịch trình hẹn hò xem phim rạp và đi dạo cuối tuần.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_映.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Nơi chiếu phim màn ảnh lớn", "answer": "映画館 (えいがかん)"},
                    "questions": [
                        {"id": 1, "prompt": "① Nơi hẹn gặp nhau có nhiều cây xanh và ghế đá ngắm cảnh:", "options": shuffle_choices("公園 (こうえん)", ["図書館 (としょかん)", "映画館 (えいがかん)", "動物園 (どうぶつえん)"]), "answer": "公園 (こうえん)", "explanation": "Công viên là 公園 (CÔNG VIÊN)."},
                        {"id": 2, "prompt": "② Nơi yên tĩnh thích hợp để mượn sách và đọc truyện:", "options": shuffle_choices("図書館 (としょかん)", ["映画館 (えいがかん)", "洋服店 (ようふくてん)", "水族館 (すいぞくかん)"]), "answer": "図書館 (としょかん)", "explanation": "Thư viện là 図書館 (ĐỒ THƯ QUÁN)."},
                        {"id": 3, "prompt": "③ Tần suất gặp gỡ vào mỗi tuần được gọi là:", "options": shuffle_choices("毎週 (まいしゅう)", ["毎月 (まいつき)", "毎年 (まいとし)", "毎日 (まいにち)"]), "answer": "毎週 (まいしゅう)", "explanation": "Mỗi tuần là 毎週 (MỖI CHU)."},
                        {"id": 4, "prompt": "④ Ngày kỷ niệm ngày cưới của hai vợ chồng gọi là ngày:", "options": shuffle_choices("特別な日 (とくべつなひ)", ["平日の日 (へいじつのひ)", "普通の日 (ふつうのひ)", "休日の日 (きゅうじつのひ)"]), "answer": "特別な日 (とくべつなひ)", "explanation": "Ngày đặc biệt là 特別な日 (ĐẶC BIỆT)."},
                        {"id": 5, "prompt": "⑤ Cùng nhau thưởng thức bữa ăn ngon miệng tại nhà hàng:", "options": shuffle_choices("日本料理 (にほんりょうり)", ["洋服 (ようふく)", "毛糸 (けいと)", "衣服 (いふく)"]), "answer": "日本料理 (にほんりょうり)", "explanation": "Món ăn Nhật là 日本料理 (LIỆU LÝ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Chọn trang phục thời trang dạo phố",
                "instruction": "Nhận diện chất liệu và phong cách trang phục khi đi chơi mua sắm.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_服.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Quần áo phong cách phương Tây", "answer": "洋服 (ようふく)"},
                    "questions": [
                        {"id": 1, "prompt": "① Áo len giữ ấm đan bằng chất liệu sợi lông cừu mềm mại:", "options": shuffle_choices("毛糸 (けいと)", ["木綿 (もめん)", "麻糸 (あさいと)", "絹糸 (きぬいと)"]), "answer": "毛糸 (けいと)", "explanation": "Sợi len đan áo là 毛糸 (MAO MỊCH)."},
                        {"id": 2, "prompt": "② Loại váy hoặc quần có chiều dài ngắn trẻ trung trong mùa hè:", "options": shuffle_choices("短い (みじかい)", ["長い (ながい)", "太い (ふとい)", "細い (ほそい)"]), "answer": "短い (みじかい)", "explanation": "Ngắn là tính từ 短い (ĐOẢN)."},
                        {"id": 3, "prompt": "③ Chiếc áo khoác ngoài lịch sự che gió khi ra đường:", "options": shuffle_choices("上着 (うわぎ)", ["下着 (したぎ)", "水着 (みずぎ)", "肌着 (はだぎ)"]), "answer": "上着 (うわぎ)", "explanation": "Áo khoác ngoài là 上着 (THƯỢNG TRƯỚC)."},
                        {"id": 4, "prompt": "④ Họa tiết chấm bi tròn xoe lấp lánh trên vải áo:", "options": shuffle_choices("水玉 (みずたま)", ["光玉 (ひかりたま)", "糸玉 (いとたま)", "花玉 (はなたま)"]), "answer": "水玉 (みずたま)", "explanation": "Họa tiết chấm bi là 水玉 (THỦY NGỌC)."},
                        {"id": 5, "prompt": "⑤ Ánh nắng ấm áp rạng rỡ của buổi hẹn hò:", "options": shuffle_choices("太陽の光 (ひかり)", ["電灯 (でんとう)", "火花 (ひばな)", "月光 (げっこう)"]), "answer": "太陽の光 (ひかり)", "explanation": "Ánh sáng mặt trời là 光 (QUANG)."}
                    ]
                }
            }
        ],
        35: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Ga xe điện & Tín hiệu giao thông ngã tư",
                "instruction": "Quan sát bảng biển hướng dẫn tại ga xe điện và đèn tín hiệu đường phố.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_駅.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Ga đón tàu xe điện ngầm", "answer": "地下鉄の駅 (えき)"},
                    "questions": [
                        {"id": 1, "prompt": "① Cửa để hành khách bước lên toa tàu điện:", "options": shuffle_choices("乗車口 (じょうしゃぐち)", ["降車口 (こうしゃぐち)", "改札口 (かいさつぐち)", "非常口 (ひじょうぐち)"]), "answer": "乗車口 (じょうしゃぐち)", "explanation": "Cửa lên tàu là 乗車口 (THỪA XA KHẨU)."},
                        {"id": 2, "prompt": "② Cửa để hành khách bước xuống khi đến ga đích:", "options": shuffle_choices("降車口 (こうしゃぐち)", ["乗車口 (じょうしゃぐち)", "入口 (いりぐち)", "窓口 (まどぐち)"]), "answer": "降車口 (こうしゃぐち)", "explanation": "Cửa xuống tàu là 降車口 (GIÁNG XA KHẨU)."},
                        {"id": 3, "prompt": "③ Giờ đoàn tàu bắt đầu lăn bánh rời ga gọi là giờ:", "options": shuffle_choices("発車時刻 (はっしゃ)", ["到着時刻 (とうちゃく)", "停車時刻 (ていしゃ)", "開通時刻 (かいつう)"]), "answer": "発車時刻 (はっしゃ)", "explanation": "Giờ tàu chạy xuất phát là 発車 (PHÁT XA)."},
                        {"id": 4, "prompt": "④ Khi đèn tín hiệu ngã tư chuyển sang màu đỏ thì phải lập tức:", "options": shuffle_choices("止まる (とまる)", ["進む (すすむ)", "走る (はしる)", "曲がる (まがる)"]), "answer": "止まる (とまる)", "explanation": "Gặp đèn đỏ phải dừng lại: 止まる (CHỈ)."},
                        {"id": 5, "prompt": "⑤ Đèn tín hiệu giao thông an toàn cho người đi bộ qua đường có màu:", "options": shuffle_choices("青 (あお)", ["赤 (あか)", "黄 (き)", "黒 (くろ)"]), "answer": "青 (あお)", "explanation": "Đèn xanh qua đường trong tiếng Nhật gọi là 青 (THANH)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Đơn thuốc & Sổ khám bệnh bệnh viện",
                "instruction": "Đọc các thông tin quy trình khám chữa bệnh và uống thuốc tại phòng khám.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_薬.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Cơ sở y tế khám chữa bệnh", "answer": "病院 (びょういん)"},
                    "questions": [
                        {"id": 1, "prompt": "① Người trực tiếp thăm khám và chữa trị cho bệnh nhân:", "options": shuffle_choices("医者 (いしゃ)", ["店員 (てんいん)", "先生 (せんせい)", "会社員 (かいしゃいん)"]), "answer": "医者 (いしゃ)", "explanation": "Bác sĩ là 医者 (Y GIẢ)."},
                        {"id": 2, "prompt": "② Khoa chuyên khám các bệnh cảm cúm, sốt nội khoa:", "options": shuffle_choices("内科 (ないか)", ["外科 (げか)", "眼科 (がんか)", "歯科 (しか)"]), "answer": "内科 (ないか)", "explanation": "Khoa nội là 内科 (NỘI KHOA)."},
                        {"id": 3, "prompt": "③ Thuốc hạ sốt được kê đơn lấy tại quầy:", "options": shuffle_choices("薬局 (やっきょく)", ["売店 (ばいてん)", "本屋 (ほんや)", "花屋 (はなや)"]), "answer": "薬局 (やっきょく)", "explanation": "Hiệu thuốc là 薬局 (DƯỢC CỤC)."},
                        {"id": 4, "prompt": "④ Phòng ngồi chờ đọc số thứ tự trước khi vào gặp bác sĩ:", "options": shuffle_choices("待合室 (まちあいしつ)", ["研究室 (けんきゅうしつ)", "教室 (きょうしつ)", "事務室 (じむしつ)"]), "answer": "待合室 (まちあいしつ)", "explanation": "Phòng chờ là 待合室 (ĐÃI HỢP THẤT)."},
                        {"id": 5, "prompt": "⑤ Thiết bị dùng để đo độ sốt thân nhiệt:", "options": shuffle_choices("体温計 (たいおんけい)", ["時計 (とけい)", "計算機 (けいさんき)", "体重計 (たいじゅうけい)"]), "answer": "体温計 (たいおんけい)", "explanation": "Nhiệt kế đo thân nhiệt là 体温計 (THỂ ÔN KẾ)."}
                    ]
                }
            }
        ],
        36: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Thực đơn tiệm mì Ramen truyền thống (Trang 138)",
                "instruction": "Dựa vào thực đơn tiệm mì Ramen chuẩn trang 138 giáo trình để chọn yêu cầu món ăn.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_味.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Nguyên liệu làm sợi mì", "answer": "小麦粉 (こむぎこ)"},
                    "questions": [
                        {"id": 1, "prompt": "① Khách hàng muốn chọn sợi mì to dày đặc trưng của tiệm:", "options": shuffle_choices("太麺 (ふとめん)", ["細麺 (ほそめん)", "長麺 (ながめん)", "短麺 (みじかめん)"]), "answer": "太麺 (ふとめん)", "explanation": "Sợi mì to dày là 太麺 (THÁI MIẾN)."},
                        {"id": 2, "prompt": "② Khách hàng thích ăn sợi mì mảnh mai dai giòn:", "options": shuffle_choices("細麺 (ほそめん)", ["太麺 (ふとめん)", "重麺 (おもめん)", "厚麺 (あつめん)"]), "answer": "細麺 (ほそめん)", "explanation": "Sợi mì mảnh mai là 細麺 (TẾ MIẾN)."},
                        {"id": 3, "prompt": "③ Yêu cầu nêm thêm dầu mỡ hành thơm béo ngậy cho nước súp:", "options": shuffle_choices("油多め (あぶらおおめ)", ["油少なめ (あぶらすくなめ)", "味薄め (あじうすめ)", "麦茶 (むぎちゃ)"]), "answer": "油多め (あぶらおおめ)", "explanation": "Nhiều dầu mỡ là 油 (DU)."},
                        {"id": 4, "prompt": "④ Đĩa đựng thức ăn kèm chia đều cho mọi người:", "options": shuffle_choices("取り皿 (とりざら)", ["お椀 (おわん)", "コップ (こっぷ)", "箸 (はし)"]), "answer": "取り皿 (とりざら)", "explanation": "Chiếc đĩa chia đồ ăn là 皿 (MÃNH)."},
                        {"id": 5, "prompt": "⑤ Thức uống trà lúa mạch mát lạnh phục vụ miễn phí:", "options": shuffle_choices("麦茶 (むぎちゃ)", ["日本酒 (にほんしゅ)", "ビール (びーる)", "緑茶 (りょくちゃ)"]), "answer": "麦茶 (むぎちゃ)", "explanation": "Trà lúa mạch là 麦茶 (MẠCH TRÀ)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Đời sống học tập & Tiệc giao lưu sinh viên",
                "instruction": "Khám phá hoạt động ngoại khóa, nghiên cứu và giao lưu câu lạc bộ sinh viên.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_研.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Nơi giáo sư và sinh viên làm đề tài", "answer": "研究室 (けんきゅうしつ)"},
                    "questions": [
                        {"id": 1, "prompt": "① Đề tài khoa học tìm hiểu về tâm lý học đường:", "options": shuffle_choices("心理学の研究 (しんりがく)", ["英文学の研究 (えいぶんがく)", "歴史の研究 (れきし)", "経済の研究 (けいざい)"]), "answer": "心理学の研究 (しんりがく)", "explanation": "Tâm lý học là 心理学 (TÂM LÝ HỌC)."},
                        {"id": 2, "prompt": "② Buổi gặp gỡ giao lưu kết bạn cuối tuần của sinh viên:", "options": shuffle_choices("合コン (ごうコン)", ["合同 (ごうどう)", "合意 (ごうい)", "集合 (しゅうごう)"]), "answer": "合コン (ごうコン)", "explanation": "Buổi tiệc giao lưu sinh viên là 合コン."},
                        {"id": 3, "prompt": "③ Giọng hát ca vang những bài hát vui tươi giải tỏa căng thẳng:", "options": shuffle_choices("歌声 (うたごえ)", ["音楽 (おんがく)", "声楽 (せいがく)", "発声 (はっせい)"]), "answer": "歌声 (うたごえ)", "explanation": "Tiếng hát ca vang là 歌声 (CA THANH)."},
                        {"id": 4, "prompt": "④ Những người bạn quen biết mở rộng mối quan hệ xã hội:", "options": shuffle_choices("知り合い (しりあい)", ["親友 (しんゆう)", "同級生 (どうきゅうせい)", "家族 (かぞく)"]), "answer": "知り合い (しりあい)", "explanation": "Người quen biết là 知り合い (TRI HỢP)."},
                        {"id": 5, "prompt": "⑤ Địa điểm hẹn tụ tập gặp mặt trước ga Nagoya:", "options": shuffle_choices("集合場所 (しゅうごうばしょ)", ["研究室 (けんきゅうしつ)", "居酒屋 (いざかや)", "映画館 (えいがかん)"]), "answer": "集合場所 (しゅうごうばしょ)", "explanation": "Nơi tập trung gặp gỡ là 集合 (TẬP HỢP)."}
                    ]
                }
            }
        ],
        37: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Dự báo thời tiết bốn mùa (Trang 160)",
                "instruction": "Nhìn biểu tượng thời tiết và chọn đúng mùa, trạng thái khí tượng chuẩn trang 160.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_晴.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Bốn mùa xuân hạ thu đông", "answer": "春夏秋冬 (しゅんかしゅうとう)"},
                    "questions": [
                        {"id": 1, "prompt": "① Hoa anh đào nở rộ đón khí trời ấm áp là mùa:", "options": shuffle_choices("春 (はる)", ["夏 (なつ)", "秋 (あき)", "冬 (ふゆ)"]), "answer": "春 (はる)", "explanation": "Mùa xuân hoa nở là 春 (XUÂN)."},
                        {"id": 2, "prompt": "② Tiếng ve kêu râm ran dưới ánh nắng chói chang oi bức:", "options": shuffle_choices("暑い夏 (なつ)", ["寒い冬 (ふゆ)", "涼しい秋 (あき)", "暖かい春 (はる)"]), "answer": "暑い夏 (なつ)", "explanation": "Mùa hè oi bức là 夏 (HẠ)."},
                        {"id": 3, "prompt": "③ Lá cây phong chuyển sang màu đỏ rực rỡ khắp triền đồi:", "options": shuffle_choices("秋 (あき)", ["春 (はる)", "冬 (ふゆ)", "夏 (なつ)"]), "answer": "秋 (あき)", "explanation": "Mùa thu ngắm lá đỏ Momiji là 秋 (THU)."},
                        {"id": 4, "prompt": "④ Bông tuyết trắng xóa rơi đầy mặt đất và mái nhà:", "options": shuffle_choices("雪が降る冬 (ふゆ)", ["雨が降る春 (はる)", "風が吹く秋 (あき)", "暑い夏 (なつ)"]), "answer": "雪が降る冬 (ふゆ)", "explanation": "Mùa đông tuyết rơi là 冬 (ĐÔNG) và 雪 (TUYẾT)."},
                        {"id": 5, "prompt": "⑤ Cơn gió mạnh kèm mưa lớn di chuyển từ biển vào:", "options": shuffle_choices("強風・台風 (たいふう)", ["青空 (あおぞら)", "晴天 (せいてん)", "白い雲 (しろいくも)"]), "answer": "強風・台風 (たいふう)", "explanation": "Gió mạnh bão tố là 強風 (CƯỜNG PHONG) và 台風."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Hành trình du lịch thế giới bằng tàu thủy",
                "instruction": "Chuẩn bị hành trang và đồ dùng cho chuyến hải trình du ngoạn các nước.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_旅.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Đi du lịch vòng quanh địa cầu", "answer": "世界一周の船旅 (ふなたび)"},
                    "questions": [
                        {"id": 1, "prompt": "① Đồ vật quan trọng cần luôn mang theo bên mình:", "options": shuffle_choices("持ち物 (もちもの)", ["写真 (しゃしん)", "船 (ふね)", "雲 (くも)"]), "answer": "持ち物 (もちもの)", "explanation": "Hành lý đồ mang theo là 持ち物 (TRÌ VẬT)."},
                        {"id": 2, "prompt": "② Con tàu thủy chở khách lướt sóng ra khơi xa:", "options": shuffle_choices("客船 (きゃくせん)", ["電車 (でんしゃ)", "飛行機 (ひこうき)", "自転車 (じてんしゃ)"]), "answer": "客船 (きゃくせん)", "explanation": "Tàu thủy chở khách là 客船 (KHÁCH THUYỀN)."},
                        {"id": 3, "prompt": "③ Dùng máy ảnh ghi lại những cảnh đẹp trên đường đi:", "options": shuffle_choices("写真を写す (しゃしん)", ["絵を描く (え)", "手紙を書く (てがみ)", "本を読む (ほん)"]), "answer": "写真を写す (しゃしん)", "explanation": "Chụp ảnh lưu niệm là 写真 (TẢ CHÂN)."},
                        {"id": 4, "prompt": "④ Tâm trạng sảng khoái, phấn khởi khi ngắm bình minh trên biển:", "options": shuffle_choices("いい気持ち (きもち)", ["悪い天気 (てんき)", "重い荷物 (にもつ)", "強い風 (かぜ)"]), "answer": "いい気持ち (きもち)", "explanation": "Tâm trạng thoải mái dễ chịu là 気持ち (KHÍ TRÌ)."},
                        {"id": 5, "prompt": "⑤ Chuyến hành trình khám phá đơn độc một mình:", "options": shuffle_choices("一人旅 (ひとりたび)", ["家族旅行 (かぞく)", "修学旅行 (しゅうがく)", "出張 (しゅっちょう)"]), "answer": "一人旅 (ひとりたび)", "explanation": "Du lịch một mình là 一人旅 (NHẤT NHÂN LỮ)."}
                    ]
                }
            }
        ],
        38: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Kỳ thi & Phiếu trả lời trắc nghiệm (Trang 182)",
                "instruction": "Xem mẫu phiếu làm bài thi JLPT chuẩn trang 182 và chọn thao tác làm bài đúng quy cách.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_試.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Tờ giấy làm bài thi", "answer": "解答用紙 (かいとうようし)"},
                    "questions": [
                        {"id": 1, "prompt": "① Dãy số báo danh của thí sinh trên phiếu dự thi:", "options": shuffle_choices("受験番号 (じゅけんばんごう)", ["電話番号 (でんわばんごう)", "部屋番号 (へやばんごう)", "郵便番号 (ゆうびんばんごう)"]), "answer": "受験番号 (じゅけんばんごう)", "explanation": "Số báo danh thi là 受験番号 (THỤ NGHIỆM PHIÊN HIỆU)."},
                        {"id": 2, "prompt": "② Đọc kỹ câu hỏi trong đề thi để chọn phương án:", "options": shuffle_choices("正しい答え (ただしいこたえ)", ["同じ質問 (おなじしつもん)", "丸い答え (まるいこたえ)", "不便な答え (ふべんなこたえ)"]), "answer": "正しい答え (ただしいこたえ)", "explanation": "Đáp án đúng là 正しい答え (CHÍNH ĐÁP)."},
                        {"id": 3, "prompt": "③ Ký hiệu chấm điểm 100 điểm tuyệt đối khi tất cả đều đúng:", "options": shuffle_choices("全部丸 (ぜんぶまる)", ["全部不 (ぜんぶふ)", "全部同 (ぜんぶどう)", "全部正 (ぜんぶせい)"]), "answer": "全部丸 (ぜんぶまる)", "explanation": "Khoanh tròn đúng là 丸 (maru)."},
                        {"id": 4, "prompt": "④ Căn phòng nghiêm túc nơi các thí sinh ngồi làm bài:", "options": shuffle_choices("試験室 (しけんしつ)", ["待合室 (まちあいしつ)", "研究室 (けんきゅうしつ)", "事務室 (じむしつ)"]), "answer": "試験室 (しけんしつ)", "explanation": "Phòng thi là 試験室 (THÍ NGHIỆM THẤT)."},
                        {"id": 5, "prompt": "⑤ Thầy cô giám thị chỉ dẫn các quy chế và phát đề:", "options": shuffle_choices("教える (おしえる)", ["習う (ならう)", "答える (こたえる)", "問う (とう)"]), "answer": "教える (おしえる)", "explanation": "Dạy bảo hướng dẫn là 教える (GIÁO)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Bản tin thời sự & Xã hội lịch sử",
                "instruction": "Nhận diện các khái niệm chính trị, kinh tế và lịch sử đất nước.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_政.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Người đứng đầu đất nước thời phong kiến", "answer": "国王 (こくおう)"},
                    "questions": [
                        {"id": 1, "prompt": "① Cơ quan hành pháp cao nhất điều hành đất nước:", "options": shuffle_choices("政府 (せいふ)", ["国会 (こっかい)", "裁判所 (さいばんしょ)", "市役所 (しやくしょ)"]), "answer": "政府 (せいふ)", "explanation": "Chính phủ là 政府 (CHÍNH PHỦ)."},
                        {"id": 2, "prompt": "② Lĩnh vực sản xuất, tiêu dùng, tiền tệ và tài chính của quốc gia:", "options": shuffle_choices("経済 (けいざい)", ["政治 (せいじ)", "歴史 (れきし)", "学問 (がくもん)"]), "answer": "経済 (けいざい)", "explanation": "Kinh tế học là 経済 (KINH TẾ)."},
                        {"id": 3, "prompt": "③ Môn học tìm hiểu các sự kiện diễn ra trong quá khứ của nhân loại:", "options": shuffle_choices("歴史 (れきし)", ["地理 (ちり)", "科学 (かがく)", "数学 (すうがく)"]), "answer": "歴史 (れきし)", "explanation": "Lịch sử là 歴史 (LỊCH SỬ)."},
                        {"id": 4, "prompt": "④ Công dân trở về quê hương sau chuyến công tác nước ngoài:", "options": shuffle_choices("帰国 (きこく)", ["出国 (しゅっこく)", "外国 (がいこく)", "国内 (こくない)"]), "answer": "帰国 (きこく)", "explanation": "Về nước là 帰国 (QUY QUỐC)."},
                        {"id": 5, "prompt": "⑤ Tình hình trật tự xã hội an lành, thái bình thịnh vượng:", "options": shuffle_choices("治安が良い (ちあん)", ["政治 (せいじ)", "経済 (けいざい)", "試験 (しけん)"]), "answer": "治安が良い (ちあん)", "explanation": "Trị an tốt là 治安 (TRỊ AN)."}
                    ]
                }
            }
        ],
        39: [
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 1: Bức tranh dã ngoại thiên nhiên (Trang 204)",
                "instruction": "Quan sát bức tranh phong cảnh đồng quê trang 204 và chọn chữ Hán cho các chi tiết.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_原.webp",
                "display_order": 1,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Bầu trời trên cao có mây trắng", "answer": "白い雲 (しろいくも)"},
                    "questions": [
                        {"id": 1, "prompt": "① Chiếc hộp mà cậu bé đeo bên hông để bắt chuồn chuồn:", "options": shuffle_choices("虫かご (むしかご)", ["鳥かご (とりかご)", "魚かご (さかなかご)", "花かご (はなかご)"]), "answer": "虫かご (むしかご)", "explanation": "Lồng bắt côn trùng là 虫かご (TRÙNG)."},
                        {"id": 2, "prompt": "② Người đang ngồi trên lưng ngựa di chuyển ven bờ hồ:", "options": shuffle_choices("乗馬 (じょうば)", ["自転車 (じてんしゃ)", "歩行 (ほこう)", "水泳 (すいえい)"]), "answer": "乗馬 (じょうば)", "explanation": "Cưỡi ngựa là 乗馬 (THỪA MÃ)."},
                        {"id": 3, "prompt": "③ Đôi cánh chim chao liệng giữa bầu trời:", "options": shuffle_choices("鳥の羽 (はね)", ["虫の足 (あし)", "魚の尾 (お)", "馬の毛 (け)"]), "answer": "鳥の羽 (はね)", "explanation": "Cánh lông vũ là 羽 (VŨ)."},
                        {"id": 4, "prompt": "④ Vùng nước rộng lớn phẳng lặng có chiếc thuyền nhỏ trôi:", "options": shuffle_choices("湖 (みずうみ)", ["池 (いけ)", "海 (うみ)", "川 (かわ)"]), "answer": "湖 (みずうみ)", "explanation": "Hồ nước lớn là 湖 (HỒ)."},
                        {"id": 5, "prompt": "⑤ Cánh đồng cỏ xanh mát nơi cậu bé chạy đuổi bướm:", "options": shuffle_choices("野原 (のはら)", ["海岸 (かいがん)", "山奥 (やまおく)", "谷底 (たにそこ)"]), "answer": "野原 (のはら)", "explanation": "Đồng cỏ hoang sơ là 野原 (DÃ NGUYÊN)."}
                    ]
                }
            },
            {
                "game_type": "PICTURE_MATCH",
                "title": "Minigame 2: Đại hội thể thao ngoài trời & Rèn luyện sức khỏe",
                "instruction": "Chọn hoạt động thể dục thể thao rèn luyện thể lực phù hợp với ngày nghỉ.",
                "image_url": "/assets/kanji/n4/illustrations/kanji_n4_運.webp",
                "display_order": 2,
                "data": {
                    "example": {"prompt": "Ví dụ mẫu: Tập thể dục rèn luyện thân thể", "answer": "体を動かす運動 (うんどう)"},
                    "questions": [
                        {"id": 1, "prompt": "① Môn thể thao bơi lội dưới làn nước mát hồ bơi:", "options": shuffle_choices("水泳 (すいえい)", ["競走 (きょうそう)", "散歩 (さんぽ)", "乗馬 (じょうば)"]), "answer": "水泳 (すいえい)", "explanation": "Bơi lội là 水泳 (THỦY VỊNH)."},
                        {"id": 2, "prompt": "② Hoạt động chạy bộ bền bỉ quanh sân vận động vào sáng sớm:", "options": shuffle_choices("走る (はしる)", ["泳ぐ (およぐ)", "歩く (あるく)", "止まる (とまる)"]), "answer": "走る (はしる)", "explanation": "Chạy bộ là 走る (TẨU)."},
                        {"id": 3, "prompt": "③ Đi bộ dạo bước thư thả ngắm nhìn cây cối thiên nhiên:", "options": shuffle_choices("散歩する (さんぽ)", ["水泳する (すいえい)", "競走する (きょうそう)", "乗馬する (じょうば)"]), "answer": "散歩する (さんぽ)", "explanation": "Đi dạo bước là 散歩 (TẢN BỘ) có chữ 歩."},
                        {"id": 4, "prompt": "④ Rèn luyện kỹ năng lặp đi lặp lại để thành thục:", "options": shuffle_choices("練習 (れんしゅう)", ["予習 (よしゅう)", "復習 (ふくしゅう)", "学習 (がくしゅう)"]), "answer": "練習 (れんしゅう)", "explanation": "Luyện tập rèn luyện là 練習 (LUYỆN TẬP)."},
                        {"id": 5, "prompt": "⑤ Năng khiếu thể thao bẩm sinh xuất sắc:", "options": shuffle_choices("運動の才能 (さいのう)", ["自然 (しぜん)", "草花 (くさばな)", "草原 (そうげん)"]), "answer": "運動の才能 (さいのう)", "explanation": "Tài năng thiên phú là 才能 (TÀI NĂNG)."}
                    ]
                }
            }
        ]
    }

    total_mg_inserted = 0
    for cid, mg_list in ALL_MINIGAMES.items():
        for mg in mg_list:
            cur.execute("""
                INSERT INTO kanji_minigames (chapter_id, game_type, title, instruction, image_url, game_data_json, display_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW());
            """, (cid, mg["game_type"], mg["title"], mg["instruction"], mg["image_url"], json.dumps(mg["data"], ensure_ascii=False), mg["display_order"]))
            total_mg_inserted += 1

    print(f"Inserted {total_mg_inserted} total authentic minigames across 9 chapters.")

    conn.commit()
    print("\n" + "=" * 80)
    print("ALL MIGRATIONS COMMITTED SUCCESSFULLY TO DATABASE!")
    print("=" * 80)

except Exception as e:
    conn.rollback()
    print(f"ERROR: {e}")
    sys.exit(1)
finally:
    cur.close()
    conn.close()
