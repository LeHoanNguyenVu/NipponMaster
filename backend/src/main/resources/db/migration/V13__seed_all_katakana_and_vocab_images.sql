-- =============================================================================
-- Flyway Migration: V13 - Seed 100% Comprehensive Mnemonics & Verified Images
-- Covers: All Katakana (46 Seion + 20 Dakuon + 5 Handakuon), Numbers, Kanji, and Vocabs
-- =============================================================================

-- ── 1. Katakana Seion (46 Chữ Cái Katakana Thuần) ───────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Kem Tươi (Aisu)',
  mnemonic_hint = 'Katakana ア nét gập sắc như que kem ốc quế mát lạnh → từ アイス (aisu) = Kem tươi.',
  mnemonic_icon = '🍦'
WHERE word = 'ア' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Chó (Inu)',
  mnemonic_hint = 'Katakana イ nét phẩy thẳng như chú chó đứng canh nhà → từ イヌ (inu) = Con chó.',
  mnemonic_icon = '🐕'
WHERE word = 'イ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trang Web (Website)',
  mnemonic_hint = 'Katakana ウ nét bao tròn như màn hình duyệt web → từ ウェブサイト (webusaito) = Trang web.',
  mnemonic_icon = '🌐'
WHERE word = 'ウ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thang Máy (Elevator)',
  mnemonic_hint = 'Katakana エ nét hình khung cửa thang máy mở ra → từ エレベーター (erebeetaa) = Thang máy.',
  mnemonic_icon = '🛗'
WHERE word = 'エ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quả Cam (Orange)',
  mnemonic_hint = 'Katakana オ nét mở rộng như múi cam tươi mọng nước → từ オレンジ (orenji) = Quả cam.',
  mnemonic_icon = '🍊'
WHERE word = 'オ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Máy Ảnh (Camera)',
  mnemonic_hint = 'Katakana カ nét gập mạnh mẽ như ống kính máy ảnh chụp hình → từ カメラ (kamera) = Máy ảnh.',
  mnemonic_icon = '📷'
WHERE word = 'カ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nhà Bếp (Kitchen)',
  mnemonic_hint = 'Katakana キ sắc sảo tựa kệ treo dao thớt trong bếp → từ キッチン (kicchin) = Nhà bếp nấu ăn.',
  mnemonic_icon = '🍳'
WHERE word = 'キ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Lớp Học (Class)',
  mnemonic_hint = 'Katakana ク nét góc nhọn như bàn học trong lớp → từ クラス (kurasu) = Lớp học bạn bè.',
  mnemonic_icon = '🏫'
WHERE word = 'ク' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Kem (Cake)',
  mnemonic_hint = 'Katakana ケ như chiếc dao cắt bánh sinh nhật → từ ケーキ (keeki) = Bánh kem ngọt ngào.',
  mnemonic_icon = '🍰'
WHERE word = 'ケ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cà Phê (Coffee)',
  mnemonic_hint = 'Katakana コ là chiếc cốc cà phê nhìn nghiêng → từ コーヒー (koohii) = Tách cà phê ấm áp.',
  mnemonic_icon = '☕'
WHERE word = 'コ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Món Salad (Salad)',
  mnemonic_hint = 'Katakana サ như chiếc dĩa trộn rau củ quả → từ サラダ (sarada) = Đĩa salad tươi ngon.',
  mnemonic_icon = '🥗'
WHERE word = 'サ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Áo Sơ Mi (Shirt)',
  mnemonic_hint = 'Katakana シ có các nét hất như cổ áo sơ mi cài khuy → từ シャツ (shatsu) = Áo sơ mi.',
  mnemonic_icon = '👔'
WHERE word = 'シ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thể Thao (Sports)',
  mnemonic_hint = 'Katakana ス nét xiên nhanh nhẹn như vận động viên chạy nước rút → từ スポーツ (supootsu) = Thể thao.',
  mnemonic_icon = '⚽'
WHERE word = 'ス' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Áo Len (Sweater)',
  mnemonic_hint = 'Katakana セ nét đan len ấm áp mùa đông → từ セーター (seetaa) = Áo len giữ ấm.',
  mnemonic_icon = '🧶'
WHERE word = 'セ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ghế Sofa (Sofa)',
  mnemonic_hint = 'Katakana ソ nét tựa lưng êm ái như ghế đệm sofa → từ ソファ (sofa) = Ghế sofa phòng khách.',
  mnemonic_icon = '🛋️'
WHERE word = 'ソ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Xe Taxi (Taxi)',
  mnemonic_hint = 'Katakana タ nét vươn ra như biển báo taxi đón khách → từ タクシー (takushii) = Xe taxi.',
  mnemonic_icon = '🚕'
WHERE word = 'タ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Phô Mai (Cheese)',
  mnemonic_hint = 'Katakana チ nét cắt chéo như miếng phô mai thơm ngậy → từ チーズ (chiizu) = Phô mai vàng béo.',
  mnemonic_icon = '🧀'
WHERE word = 'チ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chuyến Đi (Tour)',
  mnemonic_hint = 'Katakana ツ 3 nét rủ xuống như đoàn người hào hứng đi tour → từ ツアー (tsuaa) = Chuyến du lịch.',
  mnemonic_icon = '🧳'
WHERE word = 'ツ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bài Thi (Test)',
  mnemonic_hint = 'Katakana テ nét gạch chia ô như trang giấy thi trắc nghiệm → từ テスト (tesuto) = Bài kiểm tra.',
  mnemonic_icon = '📝'
WHERE word = 'テ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cà Chua (Tomato)',
  mnemonic_hint = 'Katakana ト nét nhánh cây nâng đỡ quả cà chua đỏ mọng → từ トマト (tomato) = Quả cà chua.',
  mnemonic_icon = '🍅'
WHERE word = 'ト' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Con Dao (Knife)',
  mnemonic_hint = 'Katakana ナ nét cắt ngang sắc bén như lưỡi dao gọt hoa quả → từ ナイフ (naifu) = Con dao.',
  mnemonic_icon = '🔪'
WHERE word = 'ナ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tin Tức (News)',
  mnemonic_hint = 'Katakana ニ hai nét ngang như dòng tiêu đề bản tin thời sự → từ ニュース (nyuusu) = Tin tức.',
  mnemonic_icon = '📺'
WHERE word = 'ニ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thuyền Ca-nô (Canoe)',
  mnemonic_hint = 'Katakana ヌ nét đan chéo như tay chèo thuyền ca-nô trên hồ → từ カヌー (kanuu) = Thuyền ca-nô.',
  mnemonic_icon = '🛶'
WHERE word = 'ヌ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cà Vạt (Necktie)',
  mnemonic_hint = 'Katakana ネ nút thắt vuông vắn như chiếc cà vạt lịch lãm → từ ネクタイ (nekutai) = Chiếc cà vạt.',
  mnemonic_icon = '👔'
WHERE word = 'ネ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sổ Ghi Chép (Notebook)',
  mnemonic_hint = 'Katakana ノ 1 nét vuốt thanh mảnh như trang sổ mở ra → từ ノート (nooto) = Quyển vở ghi bài.',
  mnemonic_icon = '📓'
WHERE word = 'ノ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hamburger',
  mnemonic_hint = 'Katakana ハ 2 nét mở ra như 2 nửa bánh hamburger kẹp thịt → từ ハンバーガー (hanbaagaa) = Bánh kẹp.',
  mnemonic_icon = '🍔'
WHERE word = 'ハ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Máy Sưởi (Heater)',
  mnemonic_hint = 'Katakana ヒ nét gập tỏa nhiệt như lò sưởi ấm áp → từ ヒーター (hiitaa) = Máy sưởi ấm mùa đông.',
  mnemonic_icon = '♨️'
WHERE word = 'ヒ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1584990347449-397397732a39?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cái Nĩa (Fork)',
  mnemonic_hint = 'Katakana フ nét cong nhọn như đầu chiếc nĩa ăn đồ Tây → từ フォーク (fooku) = Cái nĩa ăn uống.',
  mnemonic_icon = '🍴'
WHERE word = 'フ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Mũ Bảo Hiểm (Helmet)',
  mnemonic_hint = 'Katakana ヘ vòm cong cứng cáp che chắn như mũ bảo hiểm → từ ヘルメット (herumetto) = Mũ bảo hiểm.',
  mnemonic_icon = '🪖'
WHERE word = 'ヘ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Khách Sạn (Hotel)',
  mnemonic_hint = 'Katakana ホ cột trụ sảnh lớn như tòa nhà khách sạn sang trọng → từ ホテル (hoteru) = Khách sạn nghỉ dưỡng.',
  mnemonic_icon = '🏨'
WHERE word = 'ホ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Khẩu Trang (Mask)',
  mnemonic_hint = 'Katakana マ nét quai ôm gọn gàng như chiếc khẩu trang bảo vệ → từ マスク (masuku) = Khẩu trang.',
  mnemonic_icon = '😷'
WHERE word = 'マ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sữa Tươi (Milk)',
  mnemonic_hint = 'Katakana ミ 3 nét song song như 3 dòng sữa tươi thanh khiết → từ ミルク (miruku) = Ly sữa tươi ngon.',
  mnemonic_icon = '🥛'
WHERE word = 'ミ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trò Chơi (Game)',
  mnemonic_hint = 'Katakana ム nét góc tam giác như tay cầm chơi game → từ ゲーム (geemu) = Trò chơi điện tử.',
  mnemonic_icon = '🎮'
WHERE word = 'ム' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Email (Mail)',
  mnemonic_hint = 'Katakana メ nét chéo niêm phong như phong bì thư điện tử → từ メール (meeru) = Thư điện tử.',
  mnemonic_icon = '✉️'
WHERE word = 'メ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Người Mẫu (Model)',
  mnemonic_hint = 'Katakana モ dáng đứng thẳng thanh thoát như người mẫu thời trang → từ モデル (moderu) = Người mẫu.',
  mnemonic_icon = '👗'
WHERE word = 'モ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Áo Phông (Shirt)',
  mnemonic_hint = 'Katakana ヤ nét vát nhẹ như tay áo phông trẻ trung năng động → từ シャツ (shatsu) = Áo thun.',
  mnemonic_icon = '👕'
WHERE word = 'ヤ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đồng Phục (Uniform)',
  mnemonic_hint = 'Katakana ユ nét vuông vắn như bộ đồng phục thể thao chuẩn mực → từ ユニフォーム (yunifoomu) = Đồng phục.',
  mnemonic_icon = '🥋'
WHERE word = 'ユ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Châu Âu (Europe)',
  mnemonic_hint = 'Katakana ヨ 3 thanh ngang như các tầng tháp Eiffel châu Âu → từ ヨーロッパ (yooroppa) = Châu Âu.',
  mnemonic_icon = '🗼'
WHERE word = 'ヨ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đài Radio (Radio)',
  mnemonic_hint = 'Katakana ラ nét ăng-ten phía trên bắt sóng đài phát thanh → từ ラジオ (rajio) = Đài radio cổ điển.',
  mnemonic_icon = '📻'
WHERE word = 'ラ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Điều Khiển (Remote)',
  mnemonic_hint = 'Katakana リ 2 nét đứng như các nút bấm trên điều khiển từ xa → từ リモコン (rimokon) = Điều khiển tivi.',
  mnemonic_icon = '📱'
WHERE word = 'リ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quy Tắc (Rule)',
  mnemonic_hint = 'Katakana ル 2 nét vạch ranh giới quy chuẩn cần tuân thủ → từ ルール (ruuru) = Quy tắc chung.',
  mnemonic_icon = '📜'
WHERE word = 'ル' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nhà Hàng (Restaurant)',
  mnemonic_hint = 'Katakana レ nét móc thanh thoát như bảng thực đơn ẩm thực → từ レストラン (resutoran) = Nhà hàng sang trọng.',
  mnemonic_icon = '🍽️'
WHERE word = 'レ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Người Máy (Robot)',
  mnemonic_hint = 'Katakana ロ hình khối vuông vắn như đầu người máy thông minh → từ ロボット (robotto) = Robot.',
  mnemonic_icon = '🤖'
WHERE word = 'ロ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Rượu Vang (Wine)',
  mnemonic_hint = 'Katakana ワ như chiếc ly đựng rượu vang đỏ sóng sánh → từ ワイン (wain) = Ly rượu vang đỏ.',
  mnemonic_icon = '🍷'
WHERE word = 'ワ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hoạt Hình (Anime)',
  mnemonic_hint = 'Katakana ヲ nét uốn lượn phong cách hoạt họa sinh động → từ アニメ (anime) = Phim anime Nhật Bản.',
  mnemonic_icon = '🎬'
WHERE word = 'ヲ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chung Cư (Mansion)',
  mnemonic_hint = 'Katakana ン nét hất vươn cao như tòa chung cư hiện đại → từ マンション (manshon) = Khu căn hộ cao cấp.',
  mnemonic_icon = '🏢'
WHERE word = 'ン' AND word_type = 'ALPHABET';

-- ── 2. Katakana Dakuon & Handakuon (10 Chữ Âm Đục & Bán Đục) ───────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Vườn Hoa (Garden)',
  mnemonic_hint = 'Katakana ガ thêm ten-ten như hoa lá đâm chồi nở rộ → từ ガーデン (gaaden) = Khu vườn ngát hương.',
  mnemonic_icon = '🌻'
WHERE word = 'ガ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đàn Guitar (Guitar)',
  mnemonic_hint = 'Katakana ギ thêm ten-ten như dây đàn rung lên âm thanh sống động → từ ギター (gitaa) = Cây đàn ghi-ta.',
  mnemonic_icon = '🎸'
WHERE word = 'ギ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ly Thủy Tinh (Glass)',
  mnemonic_hint = 'Katakana グ thêm ten-ten như giọt nước đọng trên ly thủy tinh → từ グラス (gurasu) = Chiếc ly pha lê.',
  mnemonic_icon = '🥂'
WHERE word = 'グ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Điện Tử (Game)',
  mnemonic_hint = 'Katakana ゲ thêm ten-ten như phím bấm tay cầm điện tử → từ ゲーム (geemu) = Trò chơi game hấp dẫn.',
  mnemonic_icon = '🕹️'
WHERE word = 'ゲ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đánh Golf (Golf)',
  mnemonic_hint = 'Katakana ゴ thêm ten-ten như quả bóng lăn vào lỗ gôn trên cỏ xanh → từ ゴルフ (gorufu) = Môn đánh golf.',
  mnemonic_icon = '⛳'
WHERE word = 'ゴ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hộ Chiếu (Passport)',
  mnemonic_hint = 'Katakana パ thêm dấu tròn maru như con dấu thị thực xuất nhập cảnh → từ パスポート (pasupooto) = Hộ chiếu du lịch.',
  mnemonic_icon = '🛂'
WHERE word = 'パ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Pizza (Pizza)',
  mnemonic_hint = 'Katakana ピ thêm dấu tròn maru tròn trịa như chiếc bánh pizza phô mai → từ ピザ (piza) = Bánh pizza nóng hổi.',
  mnemonic_icon = '🍕'
WHERE word = 'ピ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hộp Quà (Present)',
  mnemonic_hint = 'Katakana プ thêm dấu tròn maru như chiếc nơ hoa xinh xắn trên hộp quà → từ プレゼント (purezento) = Hộp quà tặng.',
  mnemonic_icon = '🎁'
WHERE word = 'プ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thú Cưng (Pet)',
  mnemonic_hint = 'Katakana ペ thêm dấu tròn maru tròn xoe như đôi mắt chú cún cưng → từ ペット (petto) = Thú cưng đáng yêu.',
  mnemonic_icon = '🐶'
WHERE word = 'ペ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Áp Phích (Poster)',
  mnemonic_hint = 'Katakana ポ thêm dấu tròn maru như đinh ghim cố định tờ áp phích → từ ポスター (posutaa) = Tờ áp phích nghệ thuật.',
  mnemonic_icon = '🖼️'
WHERE word = 'ポ' AND word_type = 'ALPHABET';

-- ── 3. Cập nhật Số Đếm & Kanjis Cốt Lõi ──────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Số Một Trăm (BÁCH)',
  mnemonic_hint = 'Chữ Bách (百) đại diện cho con số 100 hoàn hảo hoặc đồng xu 100 Yên tiện lợi.',
  mnemonic_icon = '💯'
WHERE word = '百';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Số Một Nghìn (THIÊN)',
  mnemonic_hint = 'Chữ Thiên (千) là tờ tiền 1000 Yên quen thuộc trong chi tiêu hàng ngày tại Nhật.',
  mnemonic_icon = '💵'
WHERE word = '千';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Số Một Vạn (VẠN)',
  mnemonic_hint = 'Chữ Vạn (万) tượng trưng cho 10.000 Yên mang hình ảnh nhà tư tưởng Fukuzawa Yukichi.',
  mnemonic_icon = '💴'
WHERE word = '万';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đồng Yên Nhật (VIÊN)',
  mnemonic_hint = 'Chữ Viên (円) nghĩa là hình tròn và cũng là đơn vị tiền tệ chính thức của Nhật Bản.',
  mnemonic_icon = '🪙'
WHERE word = '円';

-- Đồng bộ ảnh cho Kanjis
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80', mnemonic_title = 'Số 100 (BÁCH)', mnemonic_icon = '💯' WHERE character = '百';
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&auto=format&fit=crop&q=80', mnemonic_title = 'Số 1000 (THIÊN)', mnemonic_icon = '💵' WHERE character = '千';
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop&q=80', mnemonic_title = 'Số 10.000 (VẠN)', mnemonic_icon = '💴' WHERE character = '万';
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&auto=format&fit=crop&q=80', mnemonic_title = 'Đồng Yên (VIÊN)', mnemonic_icon = '🪙' WHERE character = '円';
