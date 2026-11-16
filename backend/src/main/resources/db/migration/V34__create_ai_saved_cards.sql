-- =============================================================================
-- Flyway Migration: V34 - Create AI Saved Flashcards Table
-- Lưu nhanh từ vựng / mẫu câu từ câu trả lời của Sensei AI chỉ với 1 click.
-- =============================================================================

CREATE TABLE IF NOT EXISTS ai_saved_cards (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    word VARCHAR(150) NOT NULL,
    reading VARCHAR(150),
    meaning VARCHAR(500),
    jlpt_level VARCHAR(16),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_ai_saved_card_user_word UNIQUE (user_id, word)
);

CREATE INDEX IF NOT EXISTS idx_ai_saved_cards_user_created
    ON ai_saved_cards (user_id, created_at DESC);

ALTER TABLE IF EXISTS public.ai_saved_cards ENABLE ROW LEVEL SECURITY;

