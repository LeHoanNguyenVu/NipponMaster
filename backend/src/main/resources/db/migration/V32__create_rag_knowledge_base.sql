-- =============================================================================
-- Flyway Migration: V32 - Create RAG Knowledge Base with pgvector
-- Lưu trữ tri thức Nippon Master (Từ vựng, Kanji, Ngữ pháp, Đề thi, FAQ)
-- dưới dạng vector 768 chiều từ Gemini gemini-embedding-001 để truy vấn RAG.
-- =============================================================================

-- 1. Kích hoạt extension pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Bảng lưu trữ các mảnh kiến thức (chunks) kèm embedding vector
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id BIGSERIAL PRIMARY KEY,
    source_type VARCHAR(40) NOT NULL,   -- VOCAB, KANJI, KANJI_VOCAB, GRAMMAR, GRAMMAR_LESSON, EXAM_QUESTION, FAQ
    source_id BIGINT NOT NULL,          -- ID gốc từ bảng nguồn (hoặc ID quy ước với FAQ)
    jlpt_level VARCHAR(16) DEFAULT 'ALL', -- N5, N4, N3, N2, N1, STARTER, ALL
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    content_hash VARCHAR(64) NOT NULL,  -- SHA-256 giúp đồng bộ tăng dần (chỉ re-embed khi dữ liệu đổi)
    embedding vector(768),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_knowledge_source UNIQUE (source_type, source_id)
);

-- 3. Index HNSW cho tìm kiếm Cosine Similarity siêu nhanh (< 50ms)
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_embedding_hnsw
    ON knowledge_chunks USING hnsw (embedding vector_cosine_ops);

-- 4. Index hỗ trợ lọc theo cấp độ và loại nguồn
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_level
    ON knowledge_chunks (jlpt_level);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source
    ON knowledge_chunks (source_type, source_id);

-- 5. Full-Text Search index (kết hợp Hybrid Search cho từ khóa tiếng Nhật / Việt)
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_tsv
    ON knowledge_chunks USING gin (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, '')));

-- 6. Bảo mật RLS nhất quán với chuẩn Supabase (V22)
ALTER TABLE IF EXISTS public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

