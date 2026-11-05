-- ====================================================================
-- V25: Hệ thống Quản lý Học Ngữ Pháp Qua Video Bài Giảng (Grammar Module)
-- Bảng cấp độ, danh sách bài giảng video, mốc tua thời gian, tóm tắt công thức,
-- ngân hàng câu hỏi sao trắc nghiệm, thảo luận hỏi đáp & tiến độ học viên
-- ====================================================================

-- 1. Bảng Cấp độ & Giáo trình Ngữ pháp
CREATE TABLE IF NOT EXISTS grammar_levels (
    level_code VARCHAR(10) PRIMARY KEY, -- 'N5', 'N4', 'N3', 'N2', 'N1'
    curriculum_name VARCHAR(100) NOT NULL,
    total_lessons INT NOT NULL DEFAULT 25,
    description TEXT
);

-- 2. Bảng Bài học Ngữ pháp qua Video
CREATE TABLE IF NOT EXISTS grammar_lessons (
    id BIGSERIAL PRIMARY KEY,
    level_code VARCHAR(10) NOT NULL REFERENCES grammar_levels(level_code) ON DELETE CASCADE,
    lesson_number INT NOT NULL,
    part_number INT NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    title_vi VARCHAR(255) NOT NULL,
    title_ja VARCHAR(255) NOT NULL,
    video_id VARCHAR(100) NOT NULL,
    duration_str VARCHAR(20) NOT NULL,
    duration_sec INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_grammar_level_sort UNIQUE (level_code, sort_order)
);

-- 3. Bảng Mốc thời gian giảng dạy (Timestamps tua video thông minh)
CREATE TABLE IF NOT EXISTS grammar_timestamps (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    time_sec INT NOT NULL,
    time_str VARCHAR(20) NOT NULL,
    pattern VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- 4. Bảng Tóm tắt Công thức & Sắc thái (Cheatsheet)
CREATE TABLE IF NOT EXISTS grammar_cheatsheets (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    pattern VARCHAR(150) NOT NULL,
    badge VARCHAR(50),
    meaning TEXT NOT NULL,
    structure TEXT NOT NULL,
    nuance TEXT,
    examples_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0
);

-- 5. Bảng Ngân hàng Câu hỏi Kiểm tra (MCQ & Xếp sao JLPT)
CREATE TABLE IF NOT EXISTS grammar_quizzes (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    quiz_type VARCHAR(20) NOT NULL, -- 'MCQ' hoặc 'STAR'
    prompt TEXT NOT NULL,
    left_sentence TEXT,
    right_sentence TEXT,
    star_index INT,
    fragments_json JSONB,
    options_json JSONB,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- 6. Bảng Thảo luận & Hỏi đáp Đa phương tiện
CREATE TABLE IF NOT EXISTS grammar_discussions (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    reply_to_id BIGINT REFERENCES grammar_discussions(id) ON DELETE CASCADE,
    is_sensei BOOLEAN NOT NULL DEFAULT FALSE,
    helpful_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng Tiến độ Học tập & Mở khóa Bài học của Học viên
CREATE TABLE IF NOT EXISTS user_grammar_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    is_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
    is_passed BOOLEAN NOT NULL DEFAULT FALSE,
    highest_score INT NOT NULL DEFAULT 0,
    stars_earned INT NOT NULL DEFAULT 0,
    last_studied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_grammar_lesson UNIQUE (user_id, lesson_id)
);

-- Các Index tối ưu truy vấn
CREATE INDEX IF NOT EXISTS idx_grammar_lessons_level ON grammar_lessons(level_code, sort_order);
CREATE INDEX IF NOT EXISTS idx_grammar_timestamps_lesson ON grammar_timestamps(lesson_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_grammar_cheatsheets_lesson ON grammar_cheatsheets(lesson_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_grammar_quizzes_lesson ON grammar_quizzes(lesson_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_grammar_discussions_lesson ON grammar_discussions(lesson_id, created_at);
CREATE INDEX IF NOT EXISTS idx_user_grammar_progress_user ON user_grammar_progress(user_id);

