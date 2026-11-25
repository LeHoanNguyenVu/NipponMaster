-- Ảnh bìa riêng biệt cho từng phiên bản bài đọc (N5/N3/N1) để không bị trùng lặp hình giữa các bài trên trang báo
ALTER TABLE reading_article_versions
    ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
    ADD COLUMN IF NOT EXISTS cover_image_credit VARCHAR(200),
    ADD COLUMN IF NOT EXISTS cover_image_source VARCHAR(30);
