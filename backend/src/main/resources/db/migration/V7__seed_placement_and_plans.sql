-- =============================================================================
-- Flyway Database Migration: V7 Seed Placement Questions & Subscription Plans
-- =============================================================================

-- 1. Seed Placement Questions (N5 Standard Placement Assessment)
INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', 'わたしは まいにち ごはんを ___。', '["A. たべます", "B. のみます", "C. かきます", "D. ききます"]', 0, 'たべます = ăn cơm.', 1
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'わたしは まいにち ごはんを ___。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', 'この かばんは ___です。', '["A. おおきい", "B. べんりな", "C. たかい", "D. あたらしい"]', 1, 'べんりな = tiện lợi.', 2
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'この かばんは ___です。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', '「山」の よみかたは なんですか。', '["A. かわ", "B. やま", "C. うみ", "D. そら"]', 1, '山 = やま (núi).', 3
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = '「山」の よみかたは なんですか。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', 'たんじょうびは ___です。(15/5)', '["A. ごがつ じゅうごにち", "B. ごがつ じゅうにち", "C. ろくがつ じゅうごにち", "D. ごがつ いつか"]', 0, '5月15日 = ごがつ じゅうごにち.', 4
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'たんじょうびは ___です。(15/5)');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', 'つくえの うえに ほんが ___。', '["A. います", "B. あります", "C. おきます", "D. みます"]', 1, 'あります dùng cho đồ vật.', 5
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'つくえの うえに ほんが ___。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'VOCAB', 'これは ___ですか。', '["A. なに", "B. だれ", "C. どこ", "D. いつ"]', 0, 'なに = cái gì.', 6
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'これは ___ですか。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'GRAMMAR', 'わたしは がっこう ___ いきます。', '["A. を", "B. に", "C. が", "D. は"]', 1, 'Trợ từ に chỉ đích đến.', 7
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'わたしは がっこう ___ いきます。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'GRAMMAR', 'たなかさんは にほんご___ はなします。', '["A. が", "B. に", "C. で", "D. を"]', 3, 'Trợ từ を đi với tân ngữ tha động từ.', 8
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'たなかさんは にほんご___ はなします。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'GRAMMAR', 'とても ___かったです。', '["A. たのし", "B. たのしい", "C. たのして", "D. たのしく"]', 0, 'たのしかった = đã rất vui.', 9
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'とても ___かったです。');

INSERT INTO placement_questions (created_at, updated_at, level, section, question_text, options_json, correct_option, explanation, display_order)
SELECT NOW(), NOW(), 'N5', 'GRAMMAR', 'はなして___。', '["A. みます", "B. ください", "C. います", "D. あります"]', 1, 'てください = xin hãy nói.', 10
WHERE NOT EXISTS (SELECT 1 FROM placement_questions WHERE question_text = 'はなして___。');

-- 2. Seed Subscription Plans
INSERT INTO subscription_plans (created_at, updated_at, name, description, price, currency, duration_days, plan_type, jlpt_level, features, badge, is_active)
SELECT NOW(), NOW(), 'Gói N5 Nền Tảng', 'Trải nghiệm học cơ bản trình độ N5', 99000, 'VND', 365, 'SINGLE_LEVEL', 'N5', 'Học từ vựng N5\nBảng chữ cái Hiragana/Katakana\nLuyện viết Kanji cơ bản\nĐề thi thử N5', 'Khởi Đầu', true
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Gói N5 Nền Tảng');

INSERT INTO subscription_plans (created_at, updated_at, name, description, price, currency, duration_days, plan_type, jlpt_level, features, badge, is_active)
SELECT NOW(), NOW(), 'Gói Trọn Bộ N5 - N1', 'Mở khóa toàn bộ tính năng cao cấp mọi cấp độ', 399000, 'VND', 365, 'FULL_BUNDLE', NULL, 'Toàn bộ kho N5 - N1\nLuyện nghe 200 tình huống\nĐấu trường 1v1 không giới hạn\nChấm nét viết AI Canvas', 'Phổ Biến Nhất', true
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Gói Trọn Bộ N5 - N1');
