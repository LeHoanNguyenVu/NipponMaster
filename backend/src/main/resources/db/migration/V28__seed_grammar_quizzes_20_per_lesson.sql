-- ====================================================================
-- V28: Seed 20 cau hoi Bai Test Kien Thuc (16 MCQ + 4 STAR)
-- Yeu cau vuot qua >= 85% (17/20 cau dung) tuong tu Kho Han Tu
-- ====================================================================

DELETE FROM grammar_quizzes;

INSERT INTO grammar_quizzes (lesson_id, quiz_type, prompt, left_sentence, right_sentence, star_index, fragments_json, options_json, correct_answer, explanation, sort_order)
SELECT l.id, q.quiz_type, q.prompt, q.left_sentence, q.right_sentence, q.star_index, q.fragments_json::jsonb, q.options_json::jsonb, q.correct_answer, q.explanation, q.sort_order
FROM (VALUES
  ('MCQ', 'Chọn trợ từ thích hợp điền vào chỗ trống: わたし _____ マイク・ミラーです。', '', '', NULL, '[]', '["は", "が", "を", "に"]', 'は', 'Trợ từ は (đọc là wa) dùng sau danh từ để xác định chủ đề của câu.', 1),
  ('MCQ', 'Dạng phủ định trang trọng của danh từ trong câu: サントスさんは 先生 _____。', '', '', NULL, '[]', '["じゃありません", "ではありませんでした", "です", "くない"]', 'じゃありません', 'Phủ định của N + です là N + じゃありません / ではありません.', 2),
  ('MCQ', 'Chọn trợ từ nghi vấn kết thúc câu hỏi: ミラーさんは アメリカ人 _____。', '', '', NULL, '[]', '["か", "ね", "よ", "わ"]', 'か', 'Trợ từ か đặt ở cuối câu để tạo câu hỏi nghi vấn.', 3),
  ('MCQ', 'Chọn trợ từ mang ý nghĩa ''cũng'': 山田さんは会社員です。ミラーさん _____ 会社員です。', '', '', NULL, '[]', '["も", "は", "が", "を"]', 'も', 'Trợ từ も mang nghĩa ''cũng'', trùng khớp thông tin với câu trước.', 4),
  ('MCQ', 'Chọn trợ từ nối 2 danh từ quan hệ sở hữu/trực thuộc: わたし _____ 本です。', '', '', NULL, '[]', '["の", "は", "が", "と"]', 'の', 'Trợ từ の dùng nối 2 danh từ quan hệ sở hữu [N1 の N2].', 5),
  ('MCQ', 'Cách hỏi tuổi lịch sự và trang trọng nhất trong tiếng Nhật là gì?', '', '', NULL, '[]', '["おいくつですか", "なんさいですか", "だれですか", "どこですか"]', 'おいくつですか', 'おいくつ là dạng kính ngữ của 何歳.', 6),
  ('MCQ', 'Từ để hỏi người nào lịch sự hơn だれ (ai)?: あの方は _____ ですか。', '', '', NULL, '[]', '["どなた", "だれ", "どこ", "なん"]', 'どなた', 'どなた là từ để hỏi người mang sắc thái lịch sự trang trọng.', 7),
  ('MCQ', 'Hậu tố xưng hô lịch sự dùng sau tên người khác (không dùng cho chính mình):', '', '', NULL, '[]', '["さん", "ちゃん", "くん", "どの"]', 'さん', 'Hậu tố さん bày tỏ sự tôn trọng đối với đối phương.', 8),
  ('MCQ', 'Trả lời khẳng định: 「ミラーさんは 学生ですか。」「はい、学生 _____。」', '', '', NULL, '[]', '["です", "じゃありません", "でした", "ではありません"]', 'です', 'Khẳng định danh từ dùng [N] です.', 9),
  ('MCQ', 'Trả lời phủ định: 「サントスさんは 医者ですか。」「いいえ、医者 _____。」', '', '', NULL, '[]', '["じゃありません", "です", "でした", "ます"]', 'じゃありません', 'Phủ định danh từ dùng [N] じゃありません.', 10),
  ('MCQ', 'Chọn trợ từ điền vào chỗ trống: IMC _____ 社員です。', '', '', NULL, '[]', '["の", "は", "が", "を"]', 'の', 'IMCの社員: Nhân viên công ty IMC.', 11),
  ('MCQ', 'Câu chào hỏi tiêu chuẩn khi lần đầu gặp mặt kết thúc bằng câu nào?:', '', '', NULL, '[]', '["どうぞ よろしく お願いします", "ありがとうございます", "さようなら", "すみません"]', 'どうぞ よろしく お願いします', 'Lần đầu làm quen dùng どうぞよろしくお願いします.', 12),
  ('MCQ', 'Hậu tố đếm tuổi trong câu: テレサちゃんは 9 _____ です。', '', '', NULL, '[]', '["さい", "ほん", "にん", "じ"]', 'さい', 'さい (歳/才) là hậu tố đếm tuổi.', 13),
  ('MCQ', 'Mẫu câu lịch sự dùng khi giới thiệu một người thứ ba: こちらは サントスさん _____。', '', '', NULL, '[]', '["です", "で", "に", "を"]', 'です', 'こちら は [Tên người] です.', 14),
  ('MCQ', 'Câu nào sau đây VI PHẠM quy tắc xưng hô trong tiếng Nhật?', '', '', NULL, '[]', '["わたしは スミスさんです。", "わたしは スミスです。", "サントスさんは 先生です。", "ワンさんは 医者です。"]', 'わたしは スミスさんです。', 'Không dùng さん cho chính bản thân mình.', 15),
  ('MCQ', 'Điền trợ từ thích hợp: グプタさんも インド人 _____。', '', '', NULL, '[]', '["です", "で", "に", "を"]', 'です', 'Cấu trúc N1 も N2 です.', 16),
  ('STAR', 'Sắp xếp các từ để hoàn thiện câu và chọn từ nằm ở vị trí ngôi sao [★]:', 'わたしは', '社員です。', 2, '[{"id":"f1","text":"IMC"},{"id":"f2","text":"の"},{"id":"f3","text":"会社の"},{"id":"f4","text":"コンピューター"}]', '[]', 'IMC', 'Câu hoàn chỉnh: わたしは [コンピューター] [の] [★ IMC] [会社の] 社員です。', 17),
  ('STAR', 'Sắp xếp các từ để hoàn thiện câu phủ định và chọn từ nằm ở vị trí ngôi sao [★]:', 'サントスさんは', 'ありません。', 1, '[{"id":"f1","text":"病院の"},{"id":"f2","text":"医者"},{"id":"f3","text":"では"},{"id":"f4","text":"さくら"}]', '[]', '病院の', 'Câu hoàn chỉnh: サントスさんは [さくら] [★ 病院の] [医者] [では] ありません。', 18),
  ('STAR', 'Sắp xếp các từ để hỏi người lịch sự và chọn từ nằm ở vị trí ngôi sao [★]:', 'あちらの', 'ですか。', 2, '[{"id":"f1","text":"方は"},{"id":"f2","text":"大学の"},{"id":"f3","text":"どなた"},{"id":"f4","text":"先生の"}]', '[]', 'どなた', 'Câu hoàn chỉnh: あちらの方は [大学の] [先生の] [★ どなた] ですか。', 19),
  ('STAR', 'Sắp xếp câu giới thiệu người thứ ba và chọn từ nằm ở vị trí ngôi sao [★]:', 'こちらは', 'さんです。', 1, '[{"id":"f1","text":"アメリカ"},{"id":"f2","text":"から"},{"id":"f3","text":"来た"},{"id":"f4","text":"ミラー"}]', '[]', 'から', 'Câu hoàn chỉnh: こちらは [アメリカ] [★ から] [来た] [ミラー] さんです。', 20)
) AS q(quiz_type, prompt, left_sentence, right_sentence, star_index, fragments_json, options_json, correct_answer, explanation, sort_order)
CROSS JOIN grammar_lessons l;
