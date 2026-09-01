-- =============================================================================
-- Flyway Migration: V11 - Seed Mnemonics & Images for ALL Dakuon, Handakuon,
-- Katakana, Numbers, and Core Starter Vocabularies
-- =============================================================================

-- ── 1. Hiragana Dakuon (Âm Đục - 20 chữ) ─────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trường Học (Gakkou)',
  mnemonic_hint = 'Chữ が là chữ か thêm 2 vạch ten-ten → từ がっこう (gakkou) = Ngôi trường học thân thương.',
  mnemonic_icon = '🏫'
WHERE word = 'が' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngân Hàng (Ginkou)',
  mnemonic_hint = 'Chữ ぎ là chữ き thêm 2 vạch ten-ten → từ ぎんこう (ginkou) = Ngân hàng cất giữ tài chính.',
  mnemonic_icon = '🏦'
WHERE word = 'ぎ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Sức Khỏe Tốt (Guai)',
  mnemonic_hint = 'Chữ ぐ là chữ く thêm 2 vạch ten-ten → từ ぐあい (guai) = Tình trạng thể chất tốt.',
  mnemonic_icon = '👍'
WHERE word = 'ぐ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Khỏe Mạnh (Genki)',
  mnemonic_hint = 'Chữ げ là chữ け thêm 2 vạch năng lượng ten-ten → từ げんき (genki) = Tràn đầy sức khỏe & năng lượng!',
  mnemonic_icon = '💪'
WHERE word = 'げ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bát Cơm Trắng (Gohan)',
  mnemonic_hint = 'Chữ ご là chữ こ thêm 2 vạch ten-ten → từ ごはん (gohan) = Bát cơm dẻo thơm ngon.',
  mnemonic_icon = '🍚'
WHERE word = 'ご' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tạp Chí (Zasshi)',
  mnemonic_hint = 'Chữ ざ là chữ さ thêm 2 vạch ten-ten → từ ざっし (zasshi) = Cuốn tạp chí nhiều hình ảnh.',
  mnemonic_icon = '📖'
WHERE word = 'ざ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Thời Gian (Jikan)',
  mnemonic_hint = 'Chữ じ là chữ し thêm 2 vạch ten-ten → từ じかん (jikan) = Thời gian quý báu.',
  mnemonic_icon = '⏰'
WHERE word = 'じ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bản Đồ (Chizu)',
  mnemonic_hint = 'Chữ ず là chữ す thêm 2 vạch ten-ten → từ ちず (chizu) = Tấm bản đồ thế giới.',
  mnemonic_icon = '🗺️'
WHERE word = 'ず' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Toàn Bộ (Zenbu)',
  mnemonic_hint = 'Chữ ぜ là chữ せ thêm 2 vạch ten-ten → từ ぜんぶ (zenbu) = Toàn bộ 100% hoàn hảo.',
  mnemonic_icon = '✨'
WHERE word = 'ぜ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chú Voi To (Zou)',
  mnemonic_hint = 'Chữ ぞ là chữ そ thêm 2 vạch ten-ten → từ ぞう (zou) = Chú voi to lớn hiền lành.',
  mnemonic_icon = '🐘'
WHERE word = 'ぞ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đại Học (Daigaku)',
  mnemonic_hint = 'Chữ だ là chữ た thêm 2 vạch ten-ten → từ だいがく (daigaku) = Trường đại học danh tiếng.',
  mnemonic_icon = '🎓'
WHERE word = 'だ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Âm Đục (Hanadi)',
  mnemonic_hint = 'Chữ ぢ là chữ ち thêm 2 vạch ten-ten → dùng trong từ ghép như はなぢ (hanadi).',
  mnemonic_icon = '🩸'
WHERE word = 'ぢ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tiếp Theo (Tsuduki)',
  mnemonic_hint = 'Chữ づ là chữ つ thêm 2 vạch ten-ten → từ つづき (tsuduki) = Phần tiếp theo hấp dẫn.',
  mnemonic_icon = '⏩'
WHERE word = 'づ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tàu Điện (Densha)',
  mnemonic_hint = 'Chữ で là chữ て thêm 2 vạch ten-ten → từ でんしゃ (densha) = Chuyến tàu điện hiện đại.',
  mnemonic_icon = '🚆'
WHERE word = 'で' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cánh Cửa (Doa)',
  mnemonic_hint = 'Chữ ど là chữ と thêm 2 vạch ten-ten → từ ドア (doa) = Cánh cửa mở ra tương lai.',
  mnemonic_icon = '🚪'
WHERE word = 'ど' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Xe Buýt (Basu)',
  mnemonic_hint = 'Chữ ば là chữ は thêm 2 vạch ten-ten → từ バス (basu) = Xe buýt công cộng tiện lợi.',
  mnemonic_icon = '🚌'
WHERE word = 'ば' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bệnh Viện (Byouin)',
  mnemonic_hint = 'Chữ び là chữ ひ thêm 2 vạch ten-ten → từ びょういん (byouin) = Bệnh viện chăm sóc y tế.',
  mnemonic_icon = '🏥'
WHERE word = 'び' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ngữ Pháp (Bunpou)',
  mnemonic_hint = 'Chữ ぶ là chữ ふ thêm 2 vạch ten-ten → từ ぶんぽう (bunpou) = Cấu trúc ngữ pháp tiếng Nhật.',
  mnemonic_icon = '📚'
WHERE word = 'ぶ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Học Tập (Benkyou)',
  mnemonic_hint = 'Chữ べ là chữ へ thêm 2 vạch ten-ten → từ べんきょう (benkyou) = Chăm chỉ học tập mỗi ngày.',
  mnemonic_icon = '📝'
WHERE word = 'べ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Mũ Nón (Boushi)',
  mnemonic_hint = 'Chữ ぼ là chữ ほ thêm 2 vạch ten-ten → từ ぼうし (boushi) = Chiếc mũ che nắng thời trang.',
  mnemonic_icon = '🧢'
WHERE word = 'ぼ' AND word_type = 'ALPHABET';

-- ── 2. Hiragana Handakuon (Âm Bán Đục - 5 chữ) ───────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Mì (Pan)',
  mnemonic_hint = 'Chữ ぱ là chữ は thêm vòng tròn nhỏ maru → từ パン (pan) = Bánh mì thơm lừng giòn tan.',
  mnemonic_icon = '🍞'
WHERE word = 'ぱ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1520523839898-50712140d046?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đàn Piano (Piano)',
  mnemonic_hint = 'Chữ ぴ là chữ ひ thêm vòng tròn nhỏ maru → từ ピアノ (piano) = Đàn piano phím trắng đen.',
  mnemonic_icon = '🎹'
WHERE word = 'ぴ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Hồ Bơi (Puuru)',
  mnemonic_hint = 'Chữ ぷ là chữ ふ thêm vòng tròn nhỏ maru → từ プール (puuru) = Bể bơi xanh mát mùa hè.',
  mnemonic_icon = '🏊'
WHERE word = 'ぷ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bút Mực (Pen)',
  mnemonic_hint = 'Chữ ぺ là chữ へ thêm vòng tròn nhỏ maru → từ ペン (pen) = Cây bút mực ghi chép kiến thức.',
  mnemonic_icon = '🖊️'
WHERE word = 'ぺ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Túi Áo (Poketto)',
  mnemonic_hint = 'Chữ ぽ là chữ ほ thêm vòng tròn nhỏ maru → từ ポケット (poketto) = Chiếc túi áo tiện lợi.',
  mnemonic_icon = '🧥'
WHERE word = 'ぽ' AND word_type = 'ALPHABET';

-- ── 3. Katakana Seion & Dakuon & Handakuon ────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Kem Mát Lạnh (Aisu)',
  mnemonic_hint = 'Katakana ア nét sắc bén như que kem ốc quế → từ アイス (aisu) = Kem tươi thơm mát.',
  mnemonic_icon = '🍦'
WHERE word = 'ア' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Quả Cam (Orenji)',
  mnemonic_hint = 'Katakana オ nét mở rộng như múi cam → từ オレンジ (orenji) = Quả cam tươi mọng nước.',
  mnemonic_icon = '🍊'
WHERE word = 'オ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Máy Ảnh (Kamera)',
  mnemonic_hint = 'Katakana カ nét gập mạnh mẽ như ống kính máy ảnh → từ カメラ (kamera) = Máy chụp ảnh.',
  mnemonic_icon = '📷'
WHERE word = 'カ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Kem (Keeki)',
  mnemonic_hint = 'Katakana ケ như chiếc dao cắt bánh sinh nhật → từ ケーキ (keeki) = Bánh kem ngọt ngào.',
  mnemonic_icon = '🍰'
WHERE word = 'ケ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cà Phê (Koohii)',
  mnemonic_hint = 'Katakana コ là chiếc cốc cà phê nhìn từ bên cạnh → từ コーヒー (koohii) = Tách cà phê ấm áp.',
  mnemonic_icon = '☕'
WHERE word = 'コ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Món Salad (Sarada)',
  mnemonic_hint = 'Katakana サ như chiếc dĩa trộn rau củ quả → từ サラダ (sarada) = Đĩa salad tươi ngon.',
  mnemonic_icon = '🥗'
WHERE word = 'サ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Áo Sơ Mi (Shatsu)',
  mnemonic_hint = 'Katakana シ có 3 nét như cổ áo sơ mi cài nút → từ シャツ (shatsu) = Chiếc áo sơ mi trắng.',
  mnemonic_icon = '👔'
WHERE word = 'シ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ghế Sofa (Sofa)',
  mnemonic_hint = 'Katakana ソ nét nghiêng tựa lưng như ghế sofa → từ ソファ (sofa) = Ghế sofa êm ái thư giãn.',
  mnemonic_icon = '🛋️'
WHERE word = 'ソ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Xe Taxi (Takushii)',
  mnemonic_hint = 'Katakana タ nét phẩy vươn ra như biển báo taxi → từ タクシー (takushii) = Xe taxi đón khách.',
  mnemonic_icon = '🚕'
WHERE word = 'タ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Phô Mai (Chiizu)',
  mnemonic_hint = 'Katakana チ nét cắt chéo như miếng phô mai tam giác → từ チーズ (chiizu) = Phô mai thơm béo.',
  mnemonic_icon = '🧀'
WHERE word = 'チ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Burger (Hanbaagaa)',
  mnemonic_hint = 'Katakana ハ là hai nửa chiếc bánh burger kẹp thịt → từ ハンバーガー (hanbaagaa) = Bánh hamburger.',
  mnemonic_icon = '🍔'
WHERE word = 'ハ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Khách Sạn (Hoteru)',
  mnemonic_hint = 'Katakana ホ như cổng tòa nhà khách sạn lớn → từ ホテル (hoteru) = Khách sạn nghỉ ngơi sang trọng.',
  mnemonic_icon = '🏨'
WHERE word = 'ホ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Ly Sữa Tươi (Miruku)',
  mnemonic_hint = 'Katakana ミ gồm 3 giọt sữa tươi nguyên chất rót xuống → từ ミルク (miruku) = Ly sữa tươi dinh dưỡng.',
  mnemonic_icon = '🥛'
WHERE word = 'ミ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Trò Chơi (Geemu)',
  mnemonic_hint = 'Katakana ム nét gập góc như tay cầm điều khiển trò chơi → từ ゲーム (geemu) = Trò chơi điện tử.',
  mnemonic_icon = '🎮'
WHERE word = 'ム' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1510519138171-c70d76b6408a?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Rượu Vang (Wain)',
  mnemonic_hint = 'Katakana ワ như chiếc ly đựng rượu vang đỏ → từ ワイン (wain) = Ly rượu vang thơm nồng.',
  mnemonic_icon = '🍷'
WHERE word = 'ワ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Đàn Guitar (Gitaa)',
  mnemonic_hint = 'Katakana ギ là chữ キ thêm ten-ten như dây đàn guitar → từ ギター (gitaa) = Đàn ghi-ta cổ điển.',
  mnemonic_icon = '🎸'
WHERE word = 'ギ' AND word_type = 'ALPHABET';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Bánh Pizza (Piza)',
  mnemonic_hint = 'Katakana ピ là chữ ヒ thêm maru tròn như chiếc bánh pizza → từ ピザ (piza) = Bánh pizza nóng giòn.',
  mnemonic_icon = '🍕'
WHERE word = 'ピ' AND word_type = 'ALPHABET';

-- ── 4. Core Starter & N5 Vocabularies ─────────────────────────────────────────
UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Cảm Ơn (Arigatou)',
  mnemonic_hint = 'Lời cảm ơn chân thành từ trái tim trong văn hóa chào hỏi Nhật Bản.',
  mnemonic_icon = '🙏'
WHERE word LIKE '%ありがとう%';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Xin Lỗi / Cho Hỏi (Sumimasen)',
  mnemonic_hint = 'Câu nói đa năng khi muốn nhờ vả, xin lỗi hoặc gọi nhân viên phục vụ tại Nhật.',
  mnemonic_icon = '🙇'
WHERE word LIKE '%すみません%';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chào Buổi Sáng (Ohayou)',
  mnemonic_hint = 'Chào đón ánh bình minh rạng rỡ bắt đầu ngày mới ngập tràn năng lượng.',
  mnemonic_icon = '🌅'
WHERE word LIKE '%おはよう%';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chào Buổi Chiều (Konnichiwa)',
  mnemonic_hint = 'Lời chào phổ biến nhất khi gặp bạn bè hoặc đồng nghiệp vào ban ngày.',
  mnemonic_icon = '☀️'
WHERE word LIKE '%こんにちは%';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Chào Buổi Tối (Konbanwa)',
  mnemonic_hint = 'Lời chào ấm áp khi trời chuyển tối và phố xá lên đèn lung linh.',
  mnemonic_icon = '🌙'
WHERE word LIKE '%こんばんは%';

UPDATE vocabularies SET
  image_url = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop&q=80',
  mnemonic_title = 'Tạm Biệt (Sayounara)',
  mnemonic_hint = 'Vẫy tay chào tạm biệt và hẹn gặp lại trong những buổi học tới.',
  mnemonic_icon = '👋'
WHERE word LIKE '%さようなら%';
