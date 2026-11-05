-- ====================================================================
-- V30: Shuffle MCQ options across A, B, C, D to eliminate all-A bias
-- ====================================================================

UPDATE grammar_quizzes SET options_json = '["が", "は", "を", "に"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 1;
UPDATE grammar_quizzes SET options_json = '["ではありませんでした", "です", "じゃありません", "くない"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 2;
UPDATE grammar_quizzes SET options_json = '["ね", "よ", "わ", "か"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 3;
UPDATE grammar_quizzes SET options_json = '["は", "も", "が", "を"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 4;
UPDATE grammar_quizzes SET options_json = '["は", "が", "の", "と"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 5;
UPDATE grammar_quizzes SET options_json = '["なんさいですか", "だれですか", "どこですか", "おいくつですか"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 6;
UPDATE grammar_quizzes SET options_json = '["どなた", "だれ", "どこ", "なん"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 7;
UPDATE grammar_quizzes SET options_json = '["ちゃん", "さん", "くん", "どの"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 8;
UPDATE grammar_quizzes SET options_json = '["じゃありません", "でした", "です", "ではありません"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 9;
UPDATE grammar_quizzes SET options_json = '["です", "でした", "ます", "じゃありません"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 10;
UPDATE grammar_quizzes SET options_json = '["は", "の", "が", "を"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 11;
UPDATE grammar_quizzes SET options_json = '["ありがとうございます", "どうぞ よろしく お願いします", "さようなら", "すみません"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 12;
UPDATE grammar_quizzes SET options_json = '["ほん", "にん", "じ", "さい"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 13;
UPDATE grammar_quizzes SET options_json = '["で", "です", "に", "を"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 14;
UPDATE grammar_quizzes SET options_json = '["わたしは スミスです。", "サントスさんは 先生です。", "わたしは スミスさんです。", "ワンさんは 医者です。"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 15;
UPDATE grammar_quizzes SET options_json = '["で", "に", "を", "です"]'::jsonb WHERE quiz_type = 'MCQ' AND sort_order = 16;

