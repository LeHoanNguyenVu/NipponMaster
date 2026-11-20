-- =============================================================================
-- Flyway Migration: V35 - Create Reading Room Articles & Progress Tables
-- Module Luyện Đọc Báo Nhật (NipponMaster Original Graded Reading Articles)
-- =============================================================================

CREATE TABLE IF NOT EXISTS reading_articles (
    id                  BIGSERIAL PRIMARY KEY,
    source_name         VARCHAR(50)  NOT NULL,          -- 'GOV_ONLINE', 'DIGITAL_AGENCY', 'KANKOCHO', 'NHK_TOP', ...
    source_license      VARCHAR(30)  NOT NULL DEFAULT 'FACTS_ONLY', -- 'PDL_1_0' (Tier 1 CC BY 4.0) | 'FACTS_ONLY' (Tier 2 Art. 10(2))
    source_url          TEXT         NOT NULL UNIQUE,   -- link nguồn gốc (ghi nguồn + chống trùng)
    source_title        TEXT         NOT NULL,          -- CHỈ DÙNG NỘI BỘ ADMIN (tuyệt đối không trả qua API học viên)
    source_published_at TIMESTAMPTZ,
    category            VARCHAR(30)  NOT NULL,          -- SOCIETY, LIFE, ECONOMY, SCI_TECH, SPORTS, CULTURE, WEATHER
    facts               JSONB        NOT NULL,          -- ["sự kiện 1", ...] (facts tiếng Việt trung tính, không phải văn bản gốc)
    status              VARCHAR(20)  NOT NULL DEFAULT 'REVIEW', -- REVIEW | PUBLISHED | REJECTED
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    published_at        TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_reading_articles_status_created
    ON reading_articles (status, created_at DESC);

CREATE TABLE IF NOT EXISTS reading_article_versions (
    id              BIGSERIAL PRIMARY KEY,
    article_id      BIGINT       NOT NULL REFERENCES reading_articles(id) ON DELETE CASCADE,
    jlpt_level      VARCHAR(5)   NOT NULL,          -- N5..N1
    title_ja        TEXT         NOT NULL,          -- tiêu đề tiếng Nhật nguyên bản của NipponMaster
    title_vi        TEXT,
    sentences       JSONB        NOT NULL,          -- [{idx, text, translationVi, tokens:[{s,r,l,pos,lv}], audioUrl, durationMs}]
    key_vocab       JSONB        NOT NULL DEFAULT '[]', -- [{word, reading, meaningVi, jlptLevel}]
    char_count      INT          NOT NULL,
    computed_level  VARCHAR(5),                     -- kết quả classifier (Phase 2)
    level_metrics   JSONB,                          -- metrics phân loại & chỉ số chống sao chép (ngramOverlap8, lcs...)
    voice_name      VARCHAR(20)  NOT NULL DEFAULT 'Kore', -- Random 50/50 'Kore' (Nữ) hoặc 'Puck' (Nam)
    audio_status    VARCHAR(20)  NOT NULL DEFAULT 'PENDING', -- PENDING | READY | FAILED
    UNIQUE (article_id, jlpt_level)
);

CREATE INDEX IF NOT EXISTS idx_rav_level ON reading_article_versions (jlpt_level);
CREATE INDEX IF NOT EXISTS idx_rav_article_id ON reading_article_versions (article_id);

CREATE TABLE IF NOT EXISTS user_reading_progress (
    user_id         BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    version_id      BIGINT       NOT NULL REFERENCES reading_article_versions(id) ON DELETE CASCADE,
    completed_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    reading_seconds INT,
    PRIMARY KEY (user_id, version_id)
);

-- Bật Row Level Security trên Supabase Postgres để chặn truy cập trực tiếp qua PostgREST anon key
ALTER TABLE IF EXISTS public.reading_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reading_article_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_reading_progress ENABLE ROW LEVEL SECURITY;
