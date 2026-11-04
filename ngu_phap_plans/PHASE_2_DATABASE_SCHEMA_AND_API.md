# KẾ HOẠCH PHASE 2: THIẾT KẾ DATABASE SCHEMA & XÂY DỰNG BACKEND RESTFUL APIS

> **Mục tiêu**: Xây dựng nền tảng cơ sở dữ liệu bền vững trên PostgreSQL (Flyway migration), các Entity JPA, Service nghiệp vụ chấm điểm & mở khóa bài học, cùng các REST Controllers phục vụ cho Frontend.

---

## 🗄️ THIẾT KẾ CƠ SỞ DỮ LIỆU (FLYWAY MIGRATION V25)

File migration dự kiến: `backend/src/main/resources/db/migration/V25__create_grammar_module_schema.sql`

```sql
-- 1. Bảng Cấp độ & Giáo trình Ngữ pháp
CREATE TABLE grammar_levels (
    level_code VARCHAR(10) PRIMARY KEY, -- 'N5', 'N4', 'N3', 'N2', 'N1'
    curriculum_name VARCHAR(100) NOT NULL, -- 'Minna no Nihongo I', 'Shinkanzen Master'...
    total_lessons INT NOT NULL DEFAULT 25,
    description TEXT
);

-- 2. Bảng Bài học Ngữ pháp qua Video
CREATE TABLE grammar_lessons (
    id BIGSERIAL PRIMARY KEY,
    level_code VARCHAR(10) NOT NULL REFERENCES grammar_levels(level_code) ON DELETE CASCADE,
    lesson_number INT NOT NULL,
    title_vi VARCHAR(255) NOT NULL,
    title_ja VARCHAR(255) NOT NULL,
    video_id VARCHAR(100) NOT NULL, -- YouTube Video ID hoặc URL video
    duration_str VARCHAR(20) NOT NULL, -- '18:35'
    duration_sec INT NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_grammar_lesson_num UNIQUE (level_code, lesson_number)
);

-- 3. Bảng Mốc thời gian giảng dạy (Timestamps tua video)
CREATE TABLE grammar_timestamps (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    time_sec INT NOT NULL, -- Giây bắt đầu (vd: 90)
    time_str VARCHAR(20) NOT NULL, -- '01:30'
    pattern VARCHAR(100) NOT NULL, -- 'N1 は N2 です'
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- 4. Bảng Tóm tắt Công thức & Sắc thái (Cheatsheet)
CREATE TABLE grammar_cheatsheets (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    pattern VARCHAR(150) NOT NULL,
    badge VARCHAR(50),
    meaning TEXT NOT NULL,
    structure TEXT NOT NULL,
    nuance TEXT,
    examples_json JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array các cặp câu {ja, furigana, vi}
    sort_order INT NOT NULL DEFAULT 0
);

-- 5. Bảng Ngân hàng Câu hỏi Kiểm tra (MCQ & Xếp sao ⭐)
CREATE TABLE grammar_quizzes (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    quiz_type VARCHAR(20) NOT NULL, -- 'MCQ' hoặc 'STAR'
    prompt TEXT NOT NULL,
    -- Dành riêng cho câu hỏi ngôi sao JLPT (STAR):
    left_sentence TEXT,
    right_sentence TEXT,
    star_index INT, -- Vị trí ngôi sao 0..3
    fragments_json JSONB, -- Mảng 4 từ/cụm từ xáo trộn [{id, text, correct_index}]
    -- Dành riêng cho trắc nghiệm (MCQ):
    options_json JSONB, -- Mảng các phương án lựa chọn
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- 6. Bảng Thảo luận & Hỏi đáp Đa phương tiện
CREATE TABLE grammar_discussions (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT, -- Ảnh đính kèm (nếu có)
    video_url TEXT, -- Video đính kèm (nếu có)
    reply_to_id BIGINT REFERENCES grammar_discussions(id) ON DELETE CASCADE,
    is_sensei BOOLEAN NOT NULL DEFAULT FALSE,
    helpful_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng Tiến độ Học tập & Mở khóa của Học viên
CREATE TABLE user_grammar_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id BIGINT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    is_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
    is_passed BOOLEAN NOT NULL DEFAULT FALSE,
    highest_score INT NOT NULL DEFAULT 0,
    last_watch_sec INT NOT NULL DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_grammar_lesson UNIQUE (user_id, lesson_id)
);

CREATE INDEX idx_grammar_lesson_level ON grammar_lessons(level_code);
CREATE INDEX idx_grammar_timestamps_lesson ON grammar_timestamps(lesson_id);
CREATE INDEX idx_grammar_discussions_lesson ON grammar_discussions(lesson_id);
CREATE INDEX idx_user_grammar_progress ON user_grammar_progress(user_id, lesson_id);
```

---

## ☕ BACKEND ARCHITECTURE & REST APIS (SPRING BOOT)

### Package: `com.nihongo.api.modules.grammar`

1. **Entities**:
   - `GrammarLesson.java`
   - `GrammarTimestamp.java`
   - `GrammarCheatsheet.java`
   - `GrammarQuiz.java`
   - `GrammarDiscussion.java`
   - `UserGrammarProgress.java`

2. **DTOs**:
   - `GrammarLessonDetailDto.java`: Chứa toàn bộ mốc thời gian, cheatsheet, quiz, tiến độ học viên.
   - `QuizSubmissionRequest.java`: Mảng câu trả lời trắc nghiệm & vị trí ghép câu ngôi sao.
   - `QuizSubmissionResponse.java`: Điểm số %, kết quả chi tiết từng câu, cờ `isPassed` ($\ge 85\%$) và cờ `nextLessonUnlocked`.
   - `CreateDiscussionRequest.java`: Nội dung, `imageUrl`, `videoUrl`, `replyToId`.

3. **Service Logic (`GrammarService.java`)**:
   - `getLessonsByLevel(levelCode, userId)`: Trả về danh sách bài học kèm trạng thái khóa / điểm số của người dùng. Bài 1 luôn luôn mở khóa. Bài kế tiếp mở khóa khi bài liền trước đạt điểm $\ge 85\%$.
   - `getLessonDetail(lessonId, userId)`: Lấy chi tiết bài giảng, mốc thời gian, bảng tóm tắt, đề kiểm tra.
   - `submitLessonQuiz(lessonId, userId, submission)`: Tự động chấm điểm khách quan trên server, ghi nhận điểm cao nhất vào `user_grammar_progress`. Nếu $\ge 85\%$, mở khóa bài học tiếp theo trong cùng level!
   - `getDiscussions(lessonId)` & `postDiscussion(...)`: Xử lý hỏi đáp giữa học viên và phản hồi chính thức của giáo viên.

4. **REST Controllers (`GrammarController.java`)**:
   - `GET /api/v1/grammar/levels/{level}/lessons`
   - `GET /api/v1/grammar/lessons/{lessonId}`
   - `POST /api/v1/grammar/lessons/{lessonId}/quiz/submit`
   - `GET /api/v1/grammar/lessons/{lessonId}/discussions`
   - `POST /api/v1/grammar/lessons/{lessonId}/discussions`
   - `POST /api/v1/grammar/upload`: Tiếp nhận upload ảnh/video đính kèm câu hỏi lên Cloud/Supabase Storage.

