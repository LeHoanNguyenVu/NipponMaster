import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import psycopg2

ALL_118_KANJI = [
    # Chapter 1: すうじ (14)
    (1, 1, '一', 'イチ', 'ひと・つ', 'ichi', 'NHẤT', 'Số 1, một', 1, '一', 'Một nét ngang đơn giản', '1️⃣'),
    (1, 2, '二', 'ニ', 'ふた・つ', 'ni', 'NHỊ', 'Số 2, hai', 2, '二', 'Hai nét ngang song song', '2️⃣'),
    (1, 3, '三', 'サン', 'みっ・つ', 'san', 'TAM', 'Số 3, ba', 3, '一', 'Ba nét ngang đều nhau', '3️⃣'),
    (1, 4, '四', 'シ', 'よん / よっ・つ', 'yon', 'TỨ', 'Số 4, bốn', 5, '囗', 'Khung cửa sổ mở ra bốn hướng', '4️⃣'),
    (1, 5, '五', 'ゴ', 'いつ・つ', 'go', 'NGŨ', 'Số 5, năm', 4, '二', 'Năm ngón tay bắt chéo', '5️⃣'),
    (1, 6, '六', 'ロク', 'むっ・つ', 'roku', 'LỤC', 'Số 6, sáu', 4, '八', 'Người đội nón đứng 2 chân', '6️⃣'),
    (1, 7, '七', 'シチ', 'なな・つ', 'nana', 'THẤT', 'Số 7, bảy', 2, '一', 'Thanh kiếm lộn ngược số 7', '7️⃣'),
    (1, 8, '八', 'ハチ', 'やっ・つ', 'hachi', 'BÁT', 'Số 8, tám', 2, '八', 'Ngọn núi Phú Sĩ xòe ra', '8️⃣'),
    (1, 9, '九', 'キュウ / ク', 'ここの・つ', 'kyuu', 'CỬU', 'Số 9, chín', 2, '乙', 'Người đang gập lưng cúi chào', '9️⃣'),
    (1, 10, '十', 'ジュウ', 'とお', 'juu', 'THẬP', 'Số 10, mười', 2, '十', 'Dấu cộng trọn vẹn số 10', '🔟'),
    (1, 11, '百', 'ヒャク', 'もも', 'hyaku', 'BÁCH', 'Số 100, trăm', 6, '白', 'Một nét ngang trên chữ Bạch', '💯'),
    (1, 12, '千', 'セン', 'ち', 'sen', 'THIÊN', 'Số 1.000, nghìn', 3, '十', 'Chữ Thập có thêm nét phẩy', '💵'),
    (1, 13, '万', 'マン / バン', 'よろず', 'man', 'VẠN', '10.000, một vạn', 3, '一', 'Nét ngang cùng vạn điều may mắn', '💴'),
    (1, 14, '円', 'エン', 'まる・い', 'en', 'VIÊN', 'Đồng Yên, hình tròn', 4, '冂', 'Khung tiền xu đồng Yên Nhật', '🪙'),

    # Chapter 2: カレンダー (8)
    (2, 1, '月', 'ゲツ / ガツ', 'つき', 'tsuki', 'NGUYỆT', 'Mặt trăng, tháng, thứ hai', 4, '月', 'Mặt trăng lưỡi liềm ban đêm', '🌙'),
    (2, 2, '火', 'カ', 'ひ', 'hi', 'HỎA', 'Lửa, thứ ba', 4, '火', 'Ngọn lửa trại bốc cháy', '🔥'),
    (2, 3, '水', 'スイ', 'みず', 'mizu', 'THỦY', 'Nước, thứ tư', 4, '水', 'Dòng nước chảy róc rách', '💧'),
    (2, 4, '木', 'モク / ボク', 'き', 'ki', 'MỘC', 'Cây cối, gỗ, thứ năm', 4, '木', 'Cây xanh có cành và rễ', '🌳'),
    (2, 5, '金', 'キン / コン', 'かね', 'kane', 'KIM', 'Vàng, tiền bạc, thứ sáu', 8, '金', 'Kho báu vàng dưới mái nhà', '💰'),
    (2, 6, '土', 'ド / ト', 'つち', 'tsuchi', 'THỔ', 'Đất, thổ nhưỡng, thứ bảy', 3, '土', 'Mầm cây nhú lên từ lòng đất', '🌱'),
    (2, 7, '日', 'ニチ / ジツ', 'ひ / か', 'hi', 'NHẬT', 'Mặt trời, ngày, Chủ nhật', 4, '日', 'Vầng thái dương tròn tỏa sáng', '☀️'),
    (2, 8, '年', 'ネン', 'とし', 'toshi', 'NIÊN', 'Năm, tuổi tác', 6, '干', 'Lúa thu hoạch sau một năm', '📅'),

    # Chapter 3: 人 (7)
    (3, 1, '人', 'ジン / ニン', 'ひと', 'hito', 'NHÂN', 'Con người, người', 2, '人', 'Hai người tựa lưng nâng đỡ nhau', '👤'),
    (3, 2, '口', 'コウ / ク', 'くち', 'kuchi', 'KHẨU', 'Cái miệng, lối vào', 3, '口', 'Cái miệng vuông vức mở to', '👄'),
    (3, 3, '目', 'モク / ボク', 'め', 'me', 'MỤC', 'Mắt, ánh nhìn', 5, '目', 'Con mắt với hai đường đồng tử', '👁️'),
    (3, 4, '耳', 'ジ', 'みみ', 'mimi', 'NHĨ', 'Cái tai, thính giác', 6, '耳', 'Vành tai lắng nghe âm thanh', '👂'),
    (3, 5, '手', 'シュ', 'て', 'te', 'THỦ', 'Bàn tay, tay nghề', 4, '手', 'Năm ngón tay xòe ra làm việc', '✋'),
    (3, 6, '足', 'ソク', 'あし / た・りる', 'ashi', 'TÚC', 'Chân, bước đi, đầy đủ', 7, '足', 'Cái chân bước đi vững vàng', '🦶'),
    (3, 7, '力', 'リョク / リキ', 'ちから', 'chikara', 'LỰC', 'Sức lực, năng lực', 2, '力', 'Cánh tay gồng cơ bắp cuồn cuộn', '💪'),

    # Chapter 4: しぜん-1 (7)
    (4, 1, '山', 'サン', 'やま', 'yama', 'SƠN', 'Ngọn núi', 3, '山', 'Ba đỉnh núi hùng vĩ', '⛰️'),
    (4, 2, '川', 'セン', 'かわ', 'kawa', 'XUYÊN', 'Dòng sông', 3, '川', 'Ba dòng nước uốn lượn hiền hòa', '🏞️'),
    (4, 3, '田', 'デン', 'た', 'ta', 'ĐIỀN', 'Ruộng đồng', 5, '田', 'Mảnh ruộng chia ô màu mỡ', '🌾'),
    (4, 4, '石', 'セキ', 'いし', 'ishi', 'THẠCH', 'Hòn đá, viên đá', 5, '石', 'Tảng đá nằm dưới vách núi', '🪨'),
    (4, 5, '花', 'カ', 'はな', 'hana', 'HOA', 'Bông hoa tươi', 7, '艸', 'Bụi cỏ nở hoa thơm ngát', '🌸'),
    (4, 6, '竹', 'チク', 'たけ', 'take', 'TRÚC', 'Cây tre, cây trúc', 6, '竹', 'Những nhánh tre xanh vươn thẳng', '🎋'),
    (4, 7, '雨', 'ウ', 'あめ', 'ame', 'VŨ', 'Cơn mưa, trời mưa', 8, '雨', 'Bốn giọt mưa rơi dưới đám mây', '🌧️'),

    # Chapter 5: ばしょ (7)
    (5, 1, '上', 'ジョウ', 'うえ / あ・がる', 'ue', 'THƯỢNG', 'Phía trên, lên trên', 3, '一', 'Mũi tên chỉ hướng lên trên', '⬆️'),
    (5, 2, '下', 'カ / ゲ', 'した / さ・がる', 'shita', 'HẠ', 'Phía dưới, xuống dưới', 3, '一', 'Mũi tên trỏ hướng xuống dưới', '⬇️'),
    (5, 3, '左', 'サ', 'ひだり', 'hidari', 'TẢ', 'Bên trái', 5, '工', 'Bàn tay trái cầm thước đo', '⬅️'),
    (5, 4, '右', 'ウ / ユウ', 'みぎ', 'migi', 'HỮU', 'Bên phải', 5, '口', 'Bàn tay phải đưa cơm vào miệng', '➡️'),
    (5, 5, '外', 'ガイ / ゲ', 'そと / はず・す', 'soto', 'NGOẠI', 'Bên ngoài, ngoài trời', 5, '夕', 'Buổi tối bước chân ra ngoài', '🚪'),
    (5, 6, '内', 'ナイ', 'うち', 'uchi', 'NỘI', 'Bên trong, trong nhà', 4, '冂', 'Bước vào trong gian phòng ấm cúng', '🏠'),
    (5, 7, '中', 'チュウ', 'なか', 'naka', 'TRUNG', 'Ở giữa, bên trong', 4, '丨', 'Mũi tên xuyên qua tâm bia', '🎯'),

    # Chapter 6: 学校-1 (8)
    (6, 1, '学', 'ガク', 'まな・ぶ', 'gaku', 'HỌC', 'Học tập, trường học', 8, '子', 'Đứa trẻ ngồi dưới mái trường học tập', '🎓'),
    (6, 2, '校', 'コウ', 'こう', 'kou', 'HIỆU', 'Trường học', 10, '木', 'Cây gỗ dựng nên cổng trường học', '🏫'),
    (6, 3, '先', 'セン', 'さき', 'saki', 'TIÊN', 'Trước, đi trước, tiên tiến', 6, '儿', 'Người đi trước dẫn dắt học trò', '🚶'),
    (6, 4, '生', 'セイ / ショウ', 'う・まれる / い・きる', 'sei', 'SINH', 'Sống, sinh sôi, học sinh', 5, '生', 'Mầm non sinh sôi nảy nở', '🌱'),
    (6, 5, '名', 'メイ / ミョウ', 'な', 'na', 'DANH', 'Tên gọi, danh xưng', 6, '口', 'Trời tối dùng miệng xưng danh tính', '📛'),
    (6, 6, '字', 'ジ', 'あざ', 'ji', 'TỰ', 'Chữ viết, chữ cái', 6, '子', 'Đứa trẻ ngồi dưới mái nhà tập viết chữ', '🔤'),
    (6, 7, '本', 'ホン', 'もと', 'hon', 'BẢN', 'Quyển sách, nguồn gốc', 5, '木', 'Gốc rễ cái cây cho giấy làm sách', '📖'),
    (6, 8, '体', 'タイ', 'からだ', 'karada', 'THỂ', 'Cơ thể, thân thể', 7, '人', 'Con người dựa vào gốc cây giữ thể lực', '🧘'),

    # Chapter 7: 学校-2 (7)
    (7, 1, '大', 'ダイ / タイ', 'おお・きい', 'ookii', 'ĐẠI', 'To lớn, lớn', 3, '大', 'Người dang rộng hai tay thật to lớn', '🐘'),
    (7, 2, '小', 'ショウ', 'ちい・さい', 'chiisai', 'TIỂU', 'Nhỏ bé, bé xíu', 3, '小', 'Hạt mầm nhỏ bé chia đôi', '🐜'),
    (7, 3, '高', 'コウ', 'たか・い', 'takai', 'CAO', 'Cao, đắt tiền', 10, '高', 'Tòa tháp cao tầng vút lên bầu trời', '🗼'),
    (7, 4, '友', 'ユウ', 'とも', 'tomo', 'HỮU', 'Bạn bè, tình bạn', 4, '又', 'Hai bàn tay nắm chặt tình bạn bè', '🤝'),
    (7, 5, '入', 'ニュウ', 'はい・る / い・れる', 'hairu', 'NHẬP', 'Đi vào, cho vào', 2, '入', 'Bước chân bước vào cổng', '📥'),
    (7, 6, '出', 'シュツ', 'で・る / だ・す', 'deru', 'XUẤT', 'Đi ra, phát ra', 5, '凵', 'Mầm cây mọc vượt ra khỏi hai ngọn núi', '📤'),
    (7, 7, '門', 'モン', 'かど', 'mon', 'MÔN', 'Cổng lớn, cửa lớn', 8, '門', 'Hai cánh cổng lớn mở rộng chào đón', '⛩️'),

    # Chapter 8: かぞく (7)
    (8, 1, '父', 'フ', 'ちち / とう', 'chichi', 'PHỤ', 'Bố, người cha', 4, '父', 'Bàn tay người cha nghiêm nghị yêu thương', '👨'),
    (8, 2, '母', 'ボ', 'はは / かあ', 'haha', 'MẪU', 'Mẹ, người mẹ', 5, '毋', 'Người mẹ ôm con cho bú', '👩'),
    (8, 3, '子', 'シ / ス', 'こ', 'ko', 'TỬ', 'Đứa trẻ, con cái', 3, '子', 'Đứa trẻ sơ sinh quấn tã vẫy tay', '👶'),
    (8, 4, '男', 'ダン / ナン', 'おとこ', 'otoko', 'NAM', 'Đàn ông, nam giới', 7, '田', 'Người đàn ông dùng sức làm việc ngoài đồng', '👨‍🌾'),
    (8, 5, '女', 'ジョ', 'おんな', 'onna', 'NỮ', 'Phụ nữ, nữ giới', 3, '女', 'Người phụ nữ ngồi dịu dàng khoanh tay', '👩‍🦰'),
    (8, 6, '犬', 'ケン', 'いぬ', 'inu', 'KHUYỂN', 'Con chó cưng', 4, '犬', 'Chú chó vẫy đuôi mừng chủ', '🐕'),
    (8, 7, '鳥', 'チョウ', 'とり', 'tori', 'ĐIỂU', 'Con chim', 11, '鳥', 'Con chim có mỏ, cánh và móng vuốt', '🐦'),

    # Chapter 9: どうし-1 (7)
    (9, 1, '立', 'リツ', 'た・つ', 'tatsu', 'LẬP', 'Đứng, đứng dậy', 5, '立', 'Người đứng thẳng vững chãi trên mặt đất', '🧍'),
    (9, 2, '休', 'キュウ', 'やす・む', 'yasumu', 'HƯU', 'Nghỉ ngơi, giải lao', 6, '人', 'Người ngồi tựa gốc cây nghỉ ngơi', '🌴'),
    (9, 3, '見', 'ケン', 'み・る', 'miru', 'KIẾN', 'Nhìn, xem, trông thấy', 7, '見', 'Con mắt mở to trên đôi chân quan sát', '👀'),
    (9, 4, '聞', 'ブン / モン', 'き・く', 'kiku', 'VĂN', 'Nghe, hỏi, lắng nghe', 14, '耳', 'Ké tai vào cánh cửa lắng nghe âm vang', '👂'),
    (9, 5, '行', 'コウ / ギョウ', 'い・く', 'iku', 'HÀNH', 'Đi, tiến bước', 6, '行', 'Ngã tư đường rảo bước tiến tới', '🚶‍♂️'),
    (9, 6, '来', 'ライ', 'く・る', 'kuru', 'LAI', 'Đến, tới nơi', 7, '木', 'Chuyến tàu chở lúa từ xa đi đến', '🚆'),
    (9, 7, '帰', 'キ', 'かえ・る', 'kaeru', 'QUY', 'Trở về, về nhà', 10, '巾', 'Cầm chổi quét dọn khi trở về nhà', '🏠'),

    # Chapter 10: たべもの (8)
    (10, 1, '米', 'マイ / ベイ', 'こめ', 'kome', 'MỄ', 'Gạo, hạt lúa, nước Mỹ', 6, '米', 'Hạt gạo xòe đều tám hướng', '🍚'),
    (10, 2, '茶', 'チャ / サ', 'おちゃ', 'ocha', 'TRÀ', 'Trà, lá chè xanh', 9, '艸', 'Lá chè xanh hái trên đồi', '🍵'),
    (10, 3, '牛', 'ギュウ', 'うし', 'ushi', 'NGƯU', 'Con bò, thịt bò', 4, '牛', 'Cặp sừng bò nhô lên khỏe khoắn', '🐄'),
    (10, 4, '肉', 'ニク', 'にく', 'niku', 'NHỤC', 'Thịt các loại', 6, '肉', 'Miếng thịt tươi có thớ gân', '🥩'),
    (10, 5, '魚', 'ギョ', 'さかな', 'sakana', 'NGƯ', 'Con cá bơi lội', 11, '魚', 'Con cá có đầu, vây và đuôi bơi', '🐟'),
    (10, 6, '貝', 'バイ', 'かい', 'kai', 'BỐI', 'Con sò, vỏ ốc tiền cổ', 7, '貝', 'Con sò mở nắp khoe ngọc trai', '🐚'),
    (10, 7, '好', 'コウ', 'す・き / この・む', 'suki', 'HẢO', 'Thích, yêu thích, tốt', 6, '女', 'Mẹ yêu thương bồng bế đứa con nhỏ', '❤️'),
    (10, 8, '物', 'ブツ / モツ', 'もの', 'mono', 'VẬT', 'Đồ vật, con vật, sinh vật', 8, '牛', 'Mọi đồ vật phong phú trên thế gian', '📦'),

    # Chapter 11: しぜん-2 (7)
    (11, 1, '林', 'リン', 'はやし', 'hayashi', 'LÂM', 'Rừng thưa, rừng nhỏ', 8, '木', 'Hai cái cây đứng cạnh nhau thành rừng thưa', '🌲'),
    (11, 2, '森', 'シン', 'もり', 'mori', 'SÂM', 'Rừng rậm, rừng sâu', 12, '木', 'Ba cái cây bạt ngàn thành rừng rậm', '🌳'),
    (11, 3, '畑', 'はたけ', 'はた / はたけ', 'hatake', 'HOẢ ĐIỀN', 'Ruộng khô, hoa màu', 9, '田', 'Đốt cỏ làm nương rẫy màu mỡ', '🧑‍🌾'),
    (11, 4, '岩', 'ガン', 'いわ', 'iwa', 'NHAM', 'Tảng đá lớn, vách đá', 8, '山', 'Hòn đá to sừng sững trên đỉnh núi', '🧗'),
    (11, 5, '音', 'オン / イン', 'おと', 'oto', 'ÂM', 'Âm thanh, tiếng nhạc', 9, '音', 'Mặt trời chiếu rọi phát ra thanh âm vui tươi', '🎵'),
    (11, 6, '明', 'メイ', 'あか・るい', 'akarui', 'MINH', 'Sáng sủa, sáng sủa, thông minh', 8, '日', 'Mặt trời kết hợp mặt trăng sáng rực rỡ', '💡'),
    (11, 7, '暗', 'アン', 'くら・い', 'kurai', 'ÁM', 'Tối tăm, u ám', 13, '日', 'Âm thanh phát ra trong bóng đêm tối om', '🌑'),

    # Chapter 12: どうし-2 (7)
    (12, 1, '言', 'ゲン / ゴン', 'い・う / こと', 'iu', 'NGÔN', 'Nói, lời nói', 7, '言', 'Miệng thốt ra bốn lời chân thành', '💬'),
    (12, 2, '書', 'ショ', 'か・く', 'kaku', 'THƯ', 'Viết lách, sách vở', 10, '曰', 'Bàn tay cầm bút viết lên trang giấy', '✍️'),
    (12, 3, '読', 'ドク', 'よ・む', 'yomu', 'ĐỘC', 'Đọc sách, ngâm thơ', 14, '言', 'Lời nói đọc theo những trang sách', '📖'),
    (12, 4, '話', 'ワ', 'はな・す / はなし', 'hanasu', 'THOẠI', 'Trò chuyện, đối thoại', 13, '言', 'Lời nói thốt ra từ đầu lưỡi giao lưu', '🗣️'),
    (12, 5, '食', 'ショク', 'た・べる', 'taberu', 'THỰC', 'Ăn, ẩm thực', 9, '食', 'Mở nắp bát cơm thơm ngon thưởng thức', '🍽️'),
    (12, 6, '飲', 'イン', 'の・む', 'nomu', 'ẨM', 'Uống nước, đồ uống', 12, '食', 'Người há miệng uống ngụm nước mát', '🥤'),
    (12, 7, '買', 'バイ', 'か・う', 'kau', 'MÃI', 'Mua sắm, mua đồ', 12, '貝', 'Dùng vỏ sò tiền tệ đi mua sắm', '🛍️'),

    # Chapter 13: 町 (8)
    (13, 1, '町', 'チョウ', 'まち', 'machi', 'ĐINH', 'Thị trấn, khu phố', 7, '田', 'Góc phố bên cạnh những thửa ruộng', '🏙️'),
    (13, 2, '寺', 'ジ', 'てら', 'tera', 'TỰ', 'Chùa chiền cổ kính', 6, '寸', 'Ngôi chùa xây trên nền đất thanh tịnh', '🛕'),
    (13, 3, '電', 'デン', 'いなずま', 'den', 'ĐIỆN', 'Điện năng, tia chớp', 13, '雨', 'Cơn mưa giông lóe lên tia chớp điện', '⚡'),
    (13, 4, '車', 'シャ', 'くるま', 'kuruma', 'XA', 'Xe cộ, xe hơi', 7, '車', 'Chiếc xe ngựa kéo có hai bánh lăn', '🚗'),
    (13, 5, '東', 'トウ', 'ひがし', 'higashi', 'ĐÔNG', 'Hướng Đông', 8, '木', 'Mặt trời nhô lên từ sau hàng cây hướng Đông', '🌅'),
    (13, 6, '西', 'セイ / サイ', 'にし', 'nishi', 'TÂY', 'Hướng Tây', 6, '襾', 'Chim bay về tổ khi mặt trời lặn hướng Tây', '🌇'),
    (13, 7, '南', 'ナン', 'みなみ', 'minami', 'NAM', 'Hướng Nam', 9, '十', 'Khung cửa đón nắng ấm áp từ phương Nam', '🧭'),
    (13, 8, '北', 'ホク', 'きた', 'kita', 'BẮC', 'Hướng Bắc', 5, '匕', 'Hai người quay lưng tránh gió lạnh phương Bắc', '❄️'),

    # Chapter 14: 時間 (8)
    (14, 1, '時', 'ジ', 'とき', 'toki', 'THỜI', 'Thời gian, giờ giấc', 10, '日', 'Mặt trời chiếu bóng tháp đo thời gian', '⏰'),
    (14, 2, '間', 'カン', 'あいだ / ま', 'aida', 'GIAN', 'Khoảng thời gian, ở giữa', 12, '門', 'Ánh mặt trời lọt qua khe hai cánh cửa', '⏳'),
    (14, 3, '半', 'ハン', 'なか・ば', 'han', 'BÁN', 'Nửa, một nửa, rưỡi', 5, '十', 'Nhát cắt chia đôi sự vật thành hai nửa', '🌗'),
    (14, 4, '分', 'ブン / フン', 'わ・かる / わ・ける', 'fun', 'PHÂN', 'Phút, hiểu biết, phân chia', 4, '刀', 'Chiếc dao cắt chia đều từng phần', '⏱️'),
    (14, 5, '今', 'コン / キン', 'いま', 'ima', 'KIM', 'Bây giờ, hiện tại', 4, '人', 'Ngay lúc này dưới mái nhà hiện tại', '📍'),
    (14, 6, '何', 'カ', 'なに / なん', 'nani', 'HÀ', 'Cái gì, điều gì', 7, '人', 'Người gánh trên vai vật gì thế nhỉ', '❓'),
    (14, 7, '夕', 'セキ', 'ゆう', 'yuu', 'TỊCH', 'Chiều tối, hoàng hôn', 3, '夕', 'Vầng trăng khuyết lấp ló buổi hoàng hôn', '🌆'),
    (14, 8, '方', 'ホウ', 'かた', 'kata', 'PHƯƠNG', 'Phương hướng, cách làm, vị khách', 4, '方', 'Mũi tên chỉ phương hướng tiến bước', '🧭'),

    # Chapter 15: けいようし (8)
    (15, 1, '新', 'シン', 'あたら・しい', 'atarashii', 'TÂN', 'Mới mẻ, tươi mới', 13, '斤', 'Dùng rìu đẵn cây mới thơm mùi gỗ', '✨'),
    (15, 2, '古', 'コ', 'ふる・い', 'furui', 'CỔ', 'Cũ kỹ, cổ xưa', 5, '口', 'Câu chuyện truyền miệng qua mười thế hệ cổ xưa', '📜'),
    (15, 3, '長', 'チョウ', 'なが・い', 'nagai', 'TRƯỜNG', 'Dài, lâu dài, trưởng', 8, '長', 'Cụ già mái tóc dài bạc phơ', '📏'),
    (15, 4, '安', 'アン', 'やす・い', 'yasui', 'AN', 'Rẻ tiền, an tâm, yên bình', 6, '宀', 'Người phụ nữ ngồi an lành dưới mái ấm', '🏷️'),
    (15, 5, '多', 'タ', 'おお・い', 'ooi', 'ĐA', 'Nhiều, phong phú', 6, '夕', 'Nhiều buổi tối ngắm trăng kế tiếp nhau', '➕'),
    (15, 6, '少', 'ショウ', 'すく・ない / すこ・し', 'sukunai', 'THIỂU', 'Ít, một chút', 4, '小', 'Vật nhỏ bị cắt bớt một chút xíu', '🤏'),
    (15, 7, '元', 'ゲン / ガN', 'もと', 'moto', 'NGUYÊN', 'Gốc rễ, nguyên bản, khỏe khoắn', 4, '儿', 'Hai bàn chân đứng vững trãi nguyên bản', '🌱'),
    (15, 8, '気', 'キ', 'き', 'ki', 'KHÍ', 'Khí sắc, tinh thần, không khí', 6, '气', 'Hơi nước bốc lên từ nồi cơm tràn đầy năng lượng', '⚡'),
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
        # 1. Ensure UNIQUE constraint exists on kanjis(character)
        cur.execute("""
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'uq_kanjis_character'
                ) THEN
                    ALTER TABLE kanjis ADD CONSTRAINT uq_kanjis_character UNIQUE (character);
                END IF;
            END $$;
        """)
        conn.commit()
        print("Checked/Created uq_kanjis_character constraint successfully.")

        # 2. Insert or update all 118 Kanjis
        for item in ALL_118_KANJI:
            ch_num, order, char, on_r, kun_r, romaji, han_viet, meaning, strokes, radical, m_hint, m_icon = item
            
            cur.execute("SELECT id FROM kanji_chapters WHERE jlpt_level = 'N5' AND chapter_number = %s;", (ch_num,))
            row = cur.fetchone()
            ch_id = row[0] if row else None
            
            cur.execute("""
                INSERT INTO kanjis (
                    character, on_reading, kun_reading, romaji, han_viet, meaning,
                    stroke_count, radical, mnemonic_hint, mnemonic_icon, mnemonic_title,
                    jlpt_level, chapter_id, chapter_order, created_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    'N5', %s, %s, NOW()
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
                    jlpt_level = 'N5',
                    chapter_id = EXCLUDED.chapter_id,
                    chapter_order = EXCLUDED.chapter_order,
                    updated_at = NOW();
            """, (
                char, on_r, kun_r, romaji, han_viet, meaning,
                strokes, radical, m_hint, m_icon, f"{meaning} ({han_viet})",
                ch_id, order
            ))

        conn.commit()
        print("All 118 N5 Kanjis seeded/updated successfully!")
        
        # Verify count per chapter
        cur.execute("""
            SELECT c.chapter_number, c.title_ja, count(k.id) 
            FROM kanji_chapters c 
            JOIN kanjis k ON k.chapter_id = c.id 
            GROUP BY c.chapter_number, c.title_ja 
            ORDER BY c.chapter_number;
        """)
        rows = cur.fetchall()
        total_in_chaps = 0
        print("\nVerified Kanji Count per Chapter in Database:")
        for r in rows:
            print(f"  Chapter {r[0]} ({r[1]}): {r[2]} kanji")
            total_in_chaps += r[2]
        print(f"\nTOTAL KANJI LINKED TO N5 CHAPTERS: {total_in_chaps} / 118")

    except Exception as e:
        conn.rollback()
        print("Error seeding kanji:", e)
        sys.exit(1)
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    main()
