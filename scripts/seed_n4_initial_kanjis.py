import sys
sys.stdout.reconfigure(encoding='utf-8')
import psycopg2

N4_SEED_KANJIS = [
    ('家', 'カ / ケ', 'いえ / や', 'ie', 'GIA', 'Nhà ở, gia đình', 10, '宀', 'Dưới mái nhà (宀) che chở ấm áp cho cả gia đình.', '🏠', 'Mái Nhà Ấm Cúng (GIA)', '私の家は東京にあります。', 'Watashi no ie wa Toukyou ni arimasu.', 'Nhà của tôi ở Tokyo.'),
    ('族', 'ゾク', '', 'zoku', 'TỘC', 'Gia tộc, bộ tộc, dòng họ', 11, '方', 'Dưới ngọn cờ (方) tập hợp những mũi tên (矢) của gia tộc.', '👨‍👩‍👧‍👦', 'Gia Đình Sum Vầy (TỘC)', '家族と一緒に住んでいます。', 'Kazoku to issho ni sunde imasu.', 'Tôi sống cùng với gia đình.'),
    ('兄', 'キョウ / ケイ', 'あに', 'ani', 'HUYNH', 'Anh trai, người anh', 5, '儿', 'Miệng (口) chỉ bảo các em, đôi chân (儿) vững chãi đi đầu.', '👦', 'Người Anh Trưởng (HUYNH)', '兄は大学生で東京にいます。', 'Ani wa daigakusei de Toukyou ni imasu.', 'Anh trai tôi là sinh viên ở Tokyo.'),
    ('弟', 'テイ / ダイ', 'おとうと', 'otouto', 'ĐỆ', 'Em trai', 7, '弓', 'Cây cung có sợi dây quấn quanh tay người em trai nhỏ.', '🧒', 'Cậu Em Trai Năng Động (ĐỆ)', '弟はサッカーがとても上手です。', 'Otouto wa sakkaa ga totemo jouzu desu.', 'Em trai tôi đá bóng rất giỏi.'),
    ('姉', 'シ', 'あね', 'ane', 'TỶ', 'Chị gái', 8, '女', 'Người phụ nữ (女) của đô thị (市) thanh lịch chính là chị gái.', '👩', 'Người Chị Gái Dịu Dàng (TỶ)', '姉は銀行で働いています。', 'Ane wa ginkou de hataraite imasu.', 'Chị gái tôi đang làm việc ở ngân hàng.'),
    ('妹', 'マイ', 'いもうと', 'imouto', 'MUỘI', 'Em gái', 8, '女', 'Người con gái (女) tương lai chưa tới (未) hãy còn nhỏ tuổi.', '👧', 'Bé Em Gái Đáng Yêu (MUỘI)', '妹は今年高校生になります。', 'Imouto wa kotoshi koukousei ni narimasu.', 'Em gái tôi năm nay lên cấp ba.'),
    ('私', 'シ', 'わたし / わたくし', 'watashi', 'TƯ', 'Tôi, bản thân, riêng tư', 7, '禾', 'Cây lúa (禾) tự tay tôi (厶) gieo trồng thu hoạch.', '🙋', 'Bản Thân Tôi (TƯ)', '私の趣味は旅行と写真です。', 'Watashi no shumi wa ryokou to shashin desu.', 'Sở thích của tôi là du lịch và nhiếp ảnh.'),
    ('朝', 'チョウ', 'あさ', 'asa', 'TRIỀU', 'Buổi sáng, ban mai', 12, '月', 'Mặt trời nhô lên giữa cỏ cây vào lúc mặt trăng (月) dần tàn.', '🌅', 'Ánh Bình Minh (TRIỀU)', '毎朝六時に起きて散歩します。', 'Maiasa rokuji ni okite sanpo shimasu.', 'Mỗi sáng tôi dậy lúc 6 giờ để đi dạo.'),
    ('昼', 'チュウ', 'ひる', 'hiru', 'TRÚ', 'Buổi trưa, ban ngày', 9, '日', 'Mặt trời (日) lên cao chiếu qua mái hiên giữa ngày.', '☀️', 'Ánh Nắng Ban Trưa (TRÚ)', '昼休みに同僚とランチを食べます。', 'Hiruyasumi ni douryou to ranchi o tabemasu.', 'Giờ nghỉ trưa tôi ăn trưa cùng đồng nghiệp.'),
    ('晩', 'バン', '', 'ban', 'VÃN', 'Buổi tối, đêm muộn', 12, '日', 'Mặt trời (日) đã khuất (免) nhường chỗ cho buổi tối yên bình.', '🌆', 'Màn Đêm Buông Xuống (VÃN)', '今晩友達と一緒に食事をします。', 'Konban tomodachi to issho ni shokuji o shimasu.', 'Tối nay tôi đi ăn cùng với bạn.'),
    ('夜', 'ヤ', 'よる / よ', 'yoru', 'DẠ', 'Đêm, đêm tối', 8, '夕', 'Người đứng ngắm trăng (夕) dưới bầu trời đêm tịch mịch.', '🌃', 'Đêm Trăng Sao (DẠ)', '夜の東京タワーはとても綺麗です。', 'Yoru no Toukyou tawaa wa totemo kirei desu.', 'Tháp Tokyo vào ban đêm rất đẹp.'),
    ('起', 'キ', 'お・きる / お・こす', 'okiru', 'KHỞI', 'Thức dậy, khởi hành, bắt đầu', 10, '走', 'Bản thân (己) cất bước chạy (走) thức dậy đầy năng lượng.', '⏰', 'Thức Giấc Đón Ngày Mới (KHỞI)', '毎朝七時に起きてジョギングします。', 'Maiasa shichiji ni okite jogingu shimasu.', 'Mỗi sáng tôi thức dậy lúc 7 giờ chạy bộ.'),
    ('寝', 'シン', 'ね・る / ね・かす', 'neru', 'TẨM', 'Ngủ, nằm nghỉ', 13, '宀', 'Dưới mái nhà (宀) nằm trên giường êm say giấc nồng.', '🛌', 'Giấc Ngủ Say (TẨM)', '疲れた時は早く寝るのが一番です。', 'Tsukareta toki wa hayaku neru no ga ichiban desu.', 'Khi mệt mỏi thì đi ngủ sớm là tốt nhất.'),
    ('始', 'シ', 'はじ・まる / はじ・める', 'hajimaru', 'THỦY', 'Bắt đầu, khởi đầu', 8, '女', 'Người phụ nữ (女) bước lên bục (台) mở màn buổi lễ bắt đầu.', '🏁', 'Khởi Đầu Mới (THỦY)', '九時からテストが始まります。', 'Kuji kara tesuto ga hajimarimasu.', 'Bài kiểm tra bắt đầu từ 9 giờ.'),
    ('終', 'シュウ', 'お・わる / お・える', 'owaru', 'CHUNG', 'Kết thúc, chấm dứt', 11, '糸', 'Sợi chỉ (糸) mùa đông (冬) dệt xong trọn vẹn kết thúc tấm vải.', '🎯', 'Về Đích Hoàn Thành (CHUNG)', '今日の仕事が全部終わりました。', 'Kyou no shigoto ga zenbu owarimashita.', 'Công việc hôm nay đã kết thúc toàn bộ.'),
    ('買', 'バイ', 'か・う', 'kau', 'MÃI', 'Mua, mua sắm', 12, '貝', 'Dùng lưới (罒) gom tiền vỏ sò (貝) đi mua sắm.', '🛍️', 'Mua Sắm Hàng Hóa (MÃI)', 'スーパーで野菜と果物を買いました。', 'Suupaa de yasai to kudamono o kaimashita.', 'Tôi đã mua rau và trái cây ở siêu thị.'),
    ('売', 'バイ', 'う・る / う・れる', 'uru', 'MẠI', 'Bán, bán hàng', 7, '士', 'Người bán đứng vững trao món hàng lấy đồng tiền.', '🏷️', 'Bán Buôn Đắt Hàng (MẠI)', 'あの店は美味しいパンを売っています。', 'Ano mise wa oishii pan o utte imasu.', 'Tiệm kia có bán bánh mì rất ngon.'),
    ('旅', 'リョ', 'たび', 'tabi', 'LỮ', 'Chuyến đi, du lịch', 10, '方', 'Đoàn người theo lá cờ (方) cất bước phiêu lưu.', '✈️', 'Hành Trình Du Lịch (LỮ)', '来月日本へ旅行に行きます。', 'Raigetsu Nihon e ryokou ni ikimasu.', 'Tháng sau tôi sẽ đi du lịch Nhật Bản.'),
    ('店', 'テン', 'みせ', 'mise', 'ĐIẾM', 'Cửa hàng, tiệm', 8, '广', 'Dưới mái hiên (广) chiếm vị trí đắc địa mở tiệm ăn.', '🏬', 'Cửa Hiệu Phố Phường (ĐIẾM)', 'この店のラーメンは本当に美味しいです。', 'Kono mise no raamen wa hontou ni oishii desu.', 'Mì Ramen của quán này thực sự rất ngon.'),
    ('道', 'ドウ / トウ', 'みち', 'michi', 'ĐẠO', 'Con đường, tuyến phố, đạo lý', 12, '辶', 'Người ngẩng đầu (首) vững bước (辶) trên con đường tươi sáng.', '🛣️', 'Con Đường Thênh Thang (ĐẠO)', 'この道をまっすぐ行くと駅があります。', 'Kono michi o massugu iku to eki ga arimasu.', 'Đi thẳng con đường này sẽ thấy nhà ga.'),
    ('駅', 'エキ', '', 'eki', 'DỊCH', 'Nhà ga tàu điện', 14, '馬', 'Ngựa (馬) dừng chân tại trạm (尺) trung chuyển hành khách.', '🚉', 'Nhà Ga Tàu Điện (DỊCH)', '駅の前で友達と待ち合わせをします。', 'Eki no mae de tomodachi to machiawase o shimasu.', 'Tôi hẹn gặp bạn ở trước nhà ga.'),
    ('痛', 'ツウ', 'いた・い / いた・む', 'itai', 'THỐNG', 'Đau, nhức nhối', 12, '疒', 'Người bị bệnh (疒) đi qua đường hầm u tối cảm thấy đau nhức.', '🩹', 'Cơn Đau Thể Xác (THỐNG)', '頭が痛いので薬を飲みました。', 'Atama ga itai node kusuri o nomimashita.', 'Vì đau đầu nên tôi đã uống thuốc.'),
    ('薬', 'ヤク', 'くすり', 'kusuri', 'DƯỢC', 'Thuốc men, thảo dược', 16, '艸', 'Cây cỏ thảo mộc (艸) mang lại niềm vui sướng (楽) lành bệnh.', '💊', 'Viên Thuốc Lành Bệnh (DƯỢC)', '食後にこの薬を飲んでください。', 'Shokugo ni kono kusuri o nonde kudasai.', 'Hãy uống thuốc này sau bữa ăn.'),
    ('病', 'ビョウ / ヘイ', 'や・む / やまい', 'byou', 'BỆNH', 'Bệnh tật, ốm đau', 10, '疒', 'Căn bệnh (疒) phát ra từ bên trong cơ thể.', '🤒', 'Ốm Đau Bệnh Tật (BỆNH)', '病院へ行って診察を受けました。', 'Byouin e itte shinsatsu o ukemashita.', 'Tôi đã đến bệnh viện khám bệnh.'),
    ('院', 'イン', '', 'in', 'VIỆN', 'Tòa viện, cơ sở công cộng', 10, '阝', 'Bức tường vững chắc (阝) bao quanh viện xá hoàn chỉnh (完).', '🏥', 'Viện Xá Cơ Sở (VIỆN)', '来週大学病院へ行きます。', 'Raishuu daigaku byouin e ikimasu.', 'Tuần sau tôi sẽ đến bệnh viện đại học.'),
]

def main():
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

    try:
        inserted = 0
        updated = 0
        for item in N4_SEED_KANJIS:
            char, on_r, kun_r, romaji, han_viet, meaning, strokes, radical, m_hint, m_icon, m_title, ex_jp, ex_romaji, ex_vi = item
            
            cur.execute("""
                INSERT INTO kanjis (
                    character, on_reading, kun_reading, romaji, han_viet, meaning,
                    stroke_count, radical, mnemonic_hint, mnemonic_icon, mnemonic_title,
                    example_sentence, example_romaji, example_meaning,
                    jlpt_level, created_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s, %s,
                    'N4', NOW()
                )
                ON CONFLICT (character) DO UPDATE SET
                    on_reading = EXCLUDED.on_reading,
                    kun_reading = EXCLUDED.kun_reading,
                    romaji = EXCLUDED.romaji,
                    han_viet = EXCLUDED.han_viet,
                    meaning = EXCLUDED.meaning,
                    stroke_count = EXCLUDED.stroke_count,
                    radical = EXCLUDED.radical,
                    mnemonic_hint = EXCLUDED.mnemonic_hint,
                    mnemonic_icon = EXCLUDED.mnemonic_icon,
                    mnemonic_title = EXCLUDED.mnemonic_title,
                    example_sentence = EXCLUDED.example_sentence,
                    example_romaji = EXCLUDED.example_romaji,
                    example_meaning = EXCLUDED.example_meaning,
                    jlpt_level = 'N4',
                    updated_at = NOW();
            """, (
                char, on_r, kun_r, romaji, han_viet, meaning,
                strokes, radical, m_hint, m_icon, m_title,
                ex_jp, ex_romaji, ex_vi
            ))
            inserted += 1

        conn.commit()
        print(f"Successfully seeded/updated {inserted} N4 Kanjis into database!")

        cur.execute("SELECT count(*) FROM kanjis WHERE jlpt_level = 'N4';")
        print(f"Total N4 kanjis in database now: {cur.fetchone()[0]}")

    except Exception as e:
        conn.rollback()
        print("Error seeding N4 kanjis:", e)
        sys.exit(1)
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    main()
