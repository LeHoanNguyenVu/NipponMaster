-- =============================================================================
-- Flyway Migration: V6 - Seed Grammars into Supabase PostgreSQL
-- =============================================================================

ALTER TABLE grammars DROP CONSTRAINT IF EXISTS grammars_jlpt_level_check;
DELETE FROM grammars;

INSERT INTO grammars (
    pattern, structure, meaning,
    example_sentence, example_meaning,
    notes, jlpt_level, created_at
) VALUES
('～は～です', 'N1 は N2 です', 'N1 là N2', '私は学生です。', 'Tôi là học sinh.', 'Cấu trúc khẳng định căn bản', 'STARTER', NOW()),
('～ではありません', 'N1 は N2 ではありません', 'N1 không phải là N2', '私は先生ではありません。', 'Tôi không phải là giáo viên.', 'Cấu trúc phủ định thì hiện tại', 'STARTER', NOW()),
('～か', 'Câu + か', 'Câu hỏi nghi vấn (Phải không?)', 'これは本ですか。', 'Đây có phải quyển sách không?', 'Thêm trợ từ か ở cuối câu', 'STARTER', NOW()),
('～の～', 'N1 の N2', 'N2 của N1 / N2 thuộc N1', '私の本です。', 'Đây là sách của tôi.', 'Trợ từ sở hữu の', 'STARTER', NOW()),
('～も', 'N も', 'Cũng là N', '私もベトナム人です。', 'Tôi cũng là người Việt Nam.', 'Trợ từ đồng nhất も', 'STARTER', NOW()),
('～を～ます', 'N を Vます', 'Làm hành động V đối với N', '水を飲みます。', 'Tôi uống nước.', 'Trợ từ chỉ tân ngữ trực tiếp を', 'N5', NOW()),
('～へ行きます', 'Địa điểm へ 行きます', 'Đi đến địa điểm nào đó', '学校へ行きます。', 'Tôi đi đến trường.', 'Trợ từ chỉ phương hướng へ', 'N5', NOW()),
('～てください', 'V-て + ください', 'Xin vui lòng làm gì đó', '日本語で話してください。', 'Xin hãy nói bằng tiếng Nhật.', 'Cấu trúc nhờ vả lịch sự', 'N5', NOW());
