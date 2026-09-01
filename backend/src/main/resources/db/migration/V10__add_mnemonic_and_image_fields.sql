-- =============================================================================
-- Flyway Migration: V10 - Add mnemonic & image columns to vocabularies & kanjis
-- Seed correct mnemonic data for Hiragana (46 chars) and core Kanji
-- =============================================================================

-- ─── DDL: Thêm cột mới vào vocabularies ───────────────────────────────────────
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS mnemonic_hint TEXT;
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS mnemonic_title VARCHAR(200);
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS mnemonic_icon VARCHAR(20);

-- ─── DDL: Thêm cột mới vào kanjis ─────────────────────────────────────────────
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS mnemonic_hint TEXT;
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS mnemonic_title VARCHAR(200);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS mnemonic_icon VARCHAR(20);


-- =============================================================================
-- SEED: Hiragana Mnemonics in vocabularies (word_type = 'ALPHABET')
-- Mỗi chữ cái → ảnh mnemonic liên tưởng nét chữ + câu gợi nhớ
-- =============================================================================

-- ── Hàng A (あ行) ──────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quả Táo (Apple)',
  mnemonic_hint = 'Chữ あ có nét xoắn tròn như thân quả táo đỏ, nét ngang trên đầu như cuống lá → nhớ chữ "A" trong Apple.',
  mnemonic_icon = '🍎'
WHERE word = 'あ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hai Chú Chó (Two dogs = I-nu)',
  mnemonic_hint = 'Hai nét sổ song song như hai con chó đang đứng cạnh nhau → từ いぬ (inu) = con chó.',
  mnemonic_icon = '🐕'
WHERE word = 'い' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Thỏ (Usagi)',
  mnemonic_hint = 'Nét chữ う cong cúp xuống như tai thỏ → từ うさぎ (usagi) = chú thỏ trắng dễ thương.',
  mnemonic_icon = '🐇'
WHERE word = 'う' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Con Tôm (Ebi)',
  mnemonic_hint = 'Nét chữ え trông như con tôm đang uốn mình → từ えび (ebi) = con tôm chiên giòn tempura.',
  mnemonic_icon = '🦐'
WHERE word = 'え' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cơm Nắm (Onigiri)',
  mnemonic_hint = 'Nét vòng tròn của chữ お gợi nhớ chiếc cơm nắm tam giác Onigiri Nhật → âm "O" trong Onigiri.',
  mnemonic_icon = '🍙'
WHERE word = 'お' AND word_type = 'ALPHABET';

-- ── Hàng KA (か行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1532007922703-0f8e1ab4d58e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chiếc Ô (Kasa)',
  mnemonic_hint = 'Nét bên trái chữ か như cán ô, nét bên phải như phần vải mở ra → từ かさ (kasa) = chiếc ô che mưa.',
  mnemonic_icon = '☂️'
WHERE word = 'か' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chiếc Chìa Khóa (Key)',
  mnemonic_hint = 'Các nét ngang và thân chữ き cắm thẳng y hệt răng cưa của chiếc chìa khóa → âm "Ki" nghe như "Key".',
  mnemonic_icon = '🗝️'
WHERE word = 'き' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đôi Giày (Kutsu)',
  mnemonic_hint = 'Nét chữ く gập nhọn như mũi giày → từ くつ (kutsu) = đôi giày đang đứng chờ bạn.',
  mnemonic_icon = '👟'
WHERE word = 'く' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1513520660-c8a6b56b4ef9?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cục Tẩy (Keshigomu)',
  mnemonic_hint = 'Nét cột trụ bên trái và thanh gỗ ngang của chữ け như chiếc thùng keg → từ けしゴム = cục tẩy.',
  mnemonic_icon = '🧹'
WHERE word = 'け' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trẻ Em (Kodomo)',
  mnemonic_hint = 'Hai nét uốn cong của chữ こ như hai đứa trẻ đang chơi đùa → từ こども (kodomo) = trẻ em.',
  mnemonic_icon = '👦'
WHERE word = 'こ' AND word_type = 'ALPHABET';

-- ── Hàng SA (さ行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hoa Anh Đào (Sakura)',
  mnemonic_hint = 'Nét uốn của chữ さ nhẹ nhàng như cành hoa sakura đang nghiêng mình trong gió xuân.',
  mnemonic_icon = '🌸'
WHERE word = 'さ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Lưỡi Câu Cá (Fish hook)',
  mnemonic_hint = 'Chữ し là một đường cong dứt khoát uốn ngược lên như chiếc lưỡi câu cá đang chờ mồi.',
  mnemonic_icon = '🎣'
WHERE word = 'し' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Món Sushi (Sushi)',
  mnemonic_hint = 'Nét thắt nút tròn của chữ す như cuộn sushi đang được cuộn tròn → từ すし (sushi) = sushi!',
  mnemonic_icon = '🍣'
WHERE word = 'す' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thầy Cô Giáo (Sensei)',
  mnemonic_hint = 'Cấu trúc chữ せ như bảng đen và bàn học → từ せんせい (sensei) = thầy cô giáo kính mến.',
  mnemonic_icon = '👩‍🏫'
WHERE word = 'せ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bầu Trời (Sora)',
  mnemonic_hint = 'Nét chữ そ uốn lượn như đường chim bay trên bầu trời xanh → từ そら (sora) = bầu trời.',
  mnemonic_icon = '🌤️'
WHERE word = 'そ' AND word_type = 'ALPHABET';

-- ── Hàng TA (た行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1582821536313-6ce5c6e00a8d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quả Trứng (Tamago)',
  mnemonic_hint = 'Chữ た gồm chữ "t" và "a" lồng ghép → từ たまご (tamago) = quả trứng gà tươi vừa hái.',
  mnemonic_icon = '🥚'
WHERE word = 'た' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bản Đồ (Chizu)',
  mnemonic_hint = 'Nét cong bụng tròn của chữ ち như đường viền của bản đồ → từ ちず (chizu) = bản đồ chỉ đường.',
  mnemonic_icon = '🗺️'
WHERE word = 'ち' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngọn Sóng (Tsunami)',
  mnemonic_hint = 'Chữ つ hình vòng cung đơn như đỉnh ngọn sóng biển → từ TSUNAMI chính là tên mượn từ tiếng Nhật!',
  mnemonic_icon = '🌊'
WHERE word = 'つ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bức Thư (Tegami)',
  mnemonic_hint = 'Nét uốn cong của chữ て như chiếc bút đang viết thư → từ てがみ (tegami) = bức thư viết tay.',
  mnemonic_icon = '✉️'
WHERE word = 'て' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đồng Hồ (Tokei)',
  mnemonic_hint = 'Nét cong ôm của chữ と như mặt đồng hồ tròn → từ とけい (tokei) = chiếc đồng hồ.',
  mnemonic_icon = '🕐'
WHERE word = 'と' AND word_type = 'ALPHABET';

-- ── Hàng NA (な行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Mùa Hè (Natsu)',
  mnemonic_hint = 'Chữ な có nhiều nét phức tạp như những hoạt động mùa hè đầy ắp → từ なつ (natsu) = mùa hè.',
  mnemonic_icon = '☀️'
WHERE word = 'な' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nhật Bản (Nihon)',
  mnemonic_hint = 'Chữ に gồm nét sổ dọc và hai nét ngang như torii cổng đền Shinto → từ にほん (Nihon) = Nhật Bản.',
  mnemonic_icon = '⛩️'
WHERE word = 'に' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sợi Mì (Noodles)',
  mnemonic_hint = 'Chữ ぬ có vòng xoắn đuôi như sợi mì ramen đang cuộn tròn → từ ぬの (nuno) = sợi vải.',
  mnemonic_icon = '🍜'
WHERE word = 'ぬ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Mèo (Neko)',
  mnemonic_hint = 'Chữ ね có nét cột thẳng và đuôi xoắn tròn giống hệt chú mèo đang ngồi cuộn đuôi → ねこ (neko) = mèo.',
  mnemonic_icon = '🐱'
WHERE word = 'ね' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Rong Biển (Nori)',
  mnemonic_hint = 'Chữ の xoắn tròn như cuộn rong biển khô Nori → từ のり (nori) = rong biển bọc sushi.',
  mnemonic_icon = '🌿'
WHERE word = 'の' AND word_type = 'ALPHABET';

-- ── Hàng HA (は行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bông Hoa (Hana)',
  mnemonic_hint = 'Chữ は có cột thẳng như cành cây và nét bên phải như cánh hoa → từ はな (hana) = bông hoa tươi.',
  mnemonic_icon = '🌷'
WHERE word = 'は' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Con Người (Hito)',
  mnemonic_hint = 'Chữ ひ có nét uốn đáy tròn như khuôn mặt cười → từ ひと (hito) = con người.',
  mnemonic_icon = '😊'
WHERE word = 'ひ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Núi Phú Sĩ (Fuji)',
  mnemonic_hint = 'Bốn nét của chữ ふ như đỉnh tuyết núi Phú Sĩ với những đám mây bao quanh → âm "Fu" trong Fuji.',
  mnemonic_icon = '🗻'
WHERE word = 'ふ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngọn Đồi (Hill)',
  mnemonic_hint = 'Chữ へ là một nét hình mái nhà đơn giản như sườn dốc đồi thoai thoải.',
  mnemonic_icon = '⛰️'
WHERE word = 'へ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngôi Sao (Hoshi)',
  mnemonic_hint = 'Chữ ほ có cột thẳng và nét cong bên phải như người đang ngước nhìn sao trời → từ ほし (hoshi) = ngôi sao.',
  mnemonic_icon = '⭐'
WHERE word = 'ほ' AND word_type = 'ALPHABET';

-- ── Hàng MA (ま行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cửa Sổ (Mado)',
  mnemonic_hint = 'Chữ ま có hai nét ngang như khung cửa sổ → từ まど (mado) = cửa sổ nhìn ra vườn.',
  mnemonic_icon = '🪟'
WHERE word = 'ま' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nước Trong (Mizu)',
  mnemonic_hint = 'Chữ み có nét uốn lượn như dòng nước chảy → từ みず (mizu) = nước uống tinh khiết.',
  mnemonic_icon = '💧'
WHERE word = 'み' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Côn Trùng (Mushi)',
  mnemonic_hint = 'Chữ む có nét cong và chấm như con bọ đang cúi mình → từ むし (mushi) = côn trùng.',
  mnemonic_icon = '🐛'
WHERE word = 'む' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đôi Mắt (Me/Eye)',
  mnemonic_hint = 'Chữ め xoắn tròn như nhãn cầu mắt → từ め (me) = đôi mắt. "Me" nghe như "Eye" trong tiếng Anh!',
  mnemonic_icon = '👁️'
WHERE word = 'め' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Khu Rừng (Mori)',
  mnemonic_hint = 'Chữ も có lưỡi câu và vài nét phụ như người đang câu cá trong rừng → từ もり (mori) = khu rừng.',
  mnemonic_icon = '🌳'
WHERE word = 'も' AND word_type = 'ALPHABET';

-- ── Hàng YA (や行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngọn Núi (Yama)',
  mnemonic_hint = 'Chữ や có sườn phẩy như hình ngọn núi nhọn → từ やま (yama) = ngọn núi hùng vĩ.',
  mnemonic_icon = '🏔️'
WHERE word = 'や' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tuyết Trắng (Yuki)',
  mnemonic_hint = 'Chữ ゆ có phần thân cong như chú thỏ nằm trên tuyết → từ ゆき (yuki) = tuyết trắng mùa đông.',
  mnemonic_icon = '❄️'
WHERE word = 'ゆ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ban Đêm (Yoru)',
  mnemonic_hint = 'Chữ よ có nét gập như cánh cửa đêm mở ra → từ よる (yoru) = ban đêm huyền bí.',
  mnemonic_icon = '🌙'
WHERE word = 'よ' AND word_type = 'ALPHABET';

-- ── Hàng RA (ら行) ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sư Tử (Raion)',
  mnemonic_hint = 'Chữ ら có cổ cong và nét đuôi như bờm sư tử → từ らいおん (raion) = sư tử chúa sơn lâm.',
  mnemonic_icon = '🦁'
WHERE word = 'ら' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quả Táo (Ringo)',
  mnemonic_hint = 'Chữ り là hai nét sổ mềm mại như hai quả táo ripe hanging → từ りんご (ringo) = quả táo đỏ.',
  mnemonic_icon = '🍎'
WHERE word = 'り' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Viên Đá Quý (Ruby loop)',
  mnemonic_hint = 'Chữ る có nét uốn cong như con đường dẫn đến viên ngọc quý xoắn ở cuối.',
  mnemonic_icon = '💎'
WHERE word = 'る' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thiền Định (Resting)',
  mnemonic_hint = 'Chữ れ trông như người đang ngồi thiền nghỉ ngơi thư giãn hoàn toàn.',
  mnemonic_icon = '🧘'
WHERE word = 'れ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Con Đường (Road)',
  mnemonic_hint = 'Chữ ろ như con đường uốn khúc không có điểm xoắn → tưởng tượng đường lộ (road) uốn cong.',
  mnemonic_icon = '🛣️'
WHERE word = 'ろ' AND word_type = 'ALPHABET';

-- ── Hàng WA, WO, N ─────────────────────────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cá Sấu (Wani)',
  mnemonic_hint = 'Chữ わ có nét tròn bên phải và phẩy bên trái như miệng cá sấu đang há ra → từ わに (wani) = cá sấu.',
  mnemonic_icon = '🐊'
WHERE word = 'わ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trợ Từ Đặc Biệt (WO)',
  mnemonic_hint = 'Chữ を chỉ dùng làm trợ từ tân ngữ, phát âm như "O" thông thường. Ghi nhớ: を rất hiếm gặp!',
  mnemonic_icon = '📌'
WHERE word = 'を' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Âm Cuối Đặc Biệt (N)',
  mnemonic_hint = 'Chữ ん là âm mũi đặc biệt, KHÔNG bao giờ đứng đầu từ. Nét uốn như chữ "n" trong bảng chữ Latin.',
  mnemonic_icon = '🔤'
WHERE word = 'ん' AND word_type = 'ALPHABET';


-- =============================================================================
-- SEED: Kanji Mnemonics in kanjis table
-- =============================================================================

-- ── Số đếm ─────────────────────────────────────────────────────────────────────
UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Một Nét (NHẤT)',
  mnemonic_hint = 'Kanji 一 là một nét ngang duy nhất — đơn giản nhất trong tất cả! Như ngọn chân trời phẳng lặng.',
  mnemonic_icon = '📏'
WHERE character = '一';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1474487548417-781cb6d646df?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hai Thanh Ray (NHỊ)',
  mnemonic_hint = 'Kanji 二 là hai nét ngang song song — như hai thanh ray đường tàu chạy song song cùng nhau.',
  mnemonic_icon = '🛤️'
WHERE character = '二';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ba Cánh Sakura (TAM)',
  mnemonic_hint = 'Kanji 三 là ba nét ngang — như 3 cánh hoa sakura xếp chồng, hay 3 tầng của pagoda Nhật Bản.',
  mnemonic_icon = '🌸'
WHERE character = '三';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bốn Mùa (TỨ)',
  mnemonic_hint = 'Kanji 四 có khung vuông và hai nét trong như hộp chia 4 mùa xuân-hạ-thu-đông Nhật Bản.',
  mnemonic_icon = '🍁'
WHERE character = '四';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Năm Ngón Tay (NGŨ)',
  mnemonic_hint = 'Kanji 五 có nét ngang, nét sổ và nét đáy cong — hình dạng như bàn tay xòe 5 ngón.',
  mnemonic_icon = '✋'
WHERE character = '五';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1551524350-fc1e8a8bb9ae?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sáu Giờ Sáng (LỤC)',
  mnemonic_hint = 'Kanji 六 có chấm trên như đầu, nét ngang như vai, 2 nét chân như người dậy lúc 6 giờ sáng!',
  mnemonic_icon = '⏰'
WHERE character = '六';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'May Mắn Số 7 (THẤT)',
  mnemonic_hint = 'Kanji 七 có nét ngang cắt nét sổ cong — số 7 là con số may mắn ở Nhật Bản!',
  mnemonic_icon = '🍀'
WHERE character = '七';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tám Đỉnh Núi (BÁT)',
  mnemonic_hint = 'Kanji 八 là hai nét xòe ra như đôi cánh hoặc hai sườn núi — nghĩ đến "Hachi" = ong bắp cày!',
  mnemonic_icon = '🏔️'
WHERE character = '八';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chín Khúc Ngoặt (CỬU)',
  mnemonic_hint = 'Kanji 九 có nét phẩy lớn và móc cong — như con đường chín khúc quanh co dẫn đến thiên đường.',
  mnemonic_icon = '🌀'
WHERE character = '九';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chữ Thập Cộng (THẬP)',
  mnemonic_hint = 'Kanji 十 là dấu cộng (+) = nét ngang cắt nét dọc → mười = số hoàn chỉnh nhất!',
  mnemonic_icon = '➕'
WHERE character = '十';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trăm Yên (BÁCH)',
  mnemonic_hint = 'Kanji 百 có nét ngang trên và chữ Bạch (白) dưới — đồng xu 100 Yên là đồng xu phổ biến nhất Nhật Bản.',
  mnemonic_icon = '🪙'
WHERE character = '百';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1554672723-d42a16e533db?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nghìn Yên (THIÊN)',
  mnemonic_hint = 'Kanji 千 có nét phẩy trên và chữ Thập dưới — tờ 1000 Yên có in hình nhà thơ Higashiyama.',
  mnemonic_icon = '💴'
WHERE character = '千';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Vạn Người (VẠN)',
  mnemonic_hint = 'Kanji 万 trông như người đứng dang tay rộng — 万 = 10.000 nghĩa là "vô số" trong văn hóa Nhật.',
  mnemonic_icon = '🙌'
WHERE character = '万';

-- ── Thiên nhiên & Cơ bản ───────────────────────────────────────────────────────
UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cây Cối, Gỗ (MỘC)',
  mnemonic_hint = 'Kanji 木 vẽ hình cây: thân sổ dọc, cành ngang, rễ phẩy mác dưới — nhìn là hình cây ngay!',
  mnemonic_icon = '🌲'
WHERE character = '木';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngọn Núi (SƠN)',
  mnemonic_hint = 'Kanji 山 là ba đỉnh núi nhô cao — đỉnh giữa cao nhất như núi Phú Sĩ hùng vĩ của Nhật Bản!',
  mnemonic_icon = '🏔️'
WHERE character = '山';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Dòng Sông (XUYÊN)',
  mnemonic_hint = 'Kanji 川 là ba nét sổ uốn lượn như ba dòng nước chảy song song ra biển lớn.',
  mnemonic_icon = '🏞️'
WHERE character = '川';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Mặt Trời & Ngày (NHẬT)',
  mnemonic_hint = 'Kanji 日 là hình vuông biểu thị mặt trời đang tỏa sáng — "Nhật Bản" (日本) = Nguồn gốc Mặt Trời!',
  mnemonic_icon = '☀️'
WHERE character = '日';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Mặt Trăng (NGUYỆT)',
  mnemonic_hint = 'Kanji 月 như mặt trăng khuyết huyền bí có nét ngang bên trong — 月 cũng có nghĩa là "tháng".',
  mnemonic_icon = '🌙'
WHERE character = '月';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngọn Lửa (HỎA)',
  mnemonic_hint = 'Kanji 火 vẽ ngọn lửa: thân chính ở giữa, hai tia lửa bắn sang hai bên — hiểu ngay là "lửa"!',
  mnemonic_icon = '🔥'
WHERE character = '火';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Nước Trong (THỦY)',
  mnemonic_hint = 'Kanji 水 có nét móc trung tâm và 4 nét nhỏ xung quanh như dòng suối tuôn chảy bốn hướng.',
  mnemonic_icon = '💧'
WHERE character = '水';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quyển Sách (BẢN)',
  mnemonic_hint = 'Kanji 本 = 木 (cây) + nét ngang ngắn ở gốc, chỉ vào "gốc rễ" — từ gốc cây làm ra sách!',
  mnemonic_icon = '📚'
WHERE character = '本';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Con Người (NHÂN)',
  mnemonic_hint = 'Kanji 人 là hai nét phẩy tựa vào nhau — hình ảnh hai người đang dắt tay nhau bước đi.',
  mnemonic_icon = '🚶'
WHERE character = '人';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Mèo (MIÊU)',
  mnemonic_hint = 'Kanji 猫 có bộ Khuyển (犭) bên trái vì mèo và chó cùng họ thú. Phần phải 苗 gợi nhớ "Neko".',
  mnemonic_icon = '🐱'
WHERE character = '猫';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Chó (KHUYỂN)',
  mnemonic_hint = 'Kanji 犬 = 大 (lớn) + chấm nhỏ trên phải = con chó Shiba Inu đang vẫy đuôi chào bạn!',
  mnemonic_icon = '🐕'
WHERE character = '犬';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bông Hoa (HOA)',
  mnemonic_hint = 'Kanji 花 = bộ thảo 艹 (cỏ/cây) trên đầu + hóa 化 (biến đổi) → mầm cây biến hóa nở thành hoa.',
  mnemonic_icon = '🌸'
WHERE character = '花';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Xe Hơi (XA)',
  mnemonic_hint = 'Kanji 車 là hình chiếc xe nhìn từ trên xuống: nóc xe, bánh xe, trục giữa — cực kỳ trực quan!',
  mnemonic_icon = '🚗'
WHERE character = '車';

UPDATE kanjis SET
  image_url = 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cơn Mưa (VŨ)',
  mnemonic_hint = 'Kanji 雨 là mái che + khung chữ nhật + 4 giọt nước bên trong — nhìn là hình cửa sổ mưa rơi!',
  mnemonic_icon = '🌧️'
WHERE character = '雨';
