-- Phase 8 (Post-MVP): Ảnh bìa hợp pháp cho bài đọc báo Nhật (Hybrid: Gemini AI -> Pexels -> Editorial Fallback / Manual)
ALTER TABLE reading_articles
    ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
    ADD COLUMN IF NOT EXISTS cover_image_credit VARCHAR(200),
    ADD COLUMN IF NOT EXISTS cover_image_source VARCHAR(30);
