-- ====================================================================
-- V29: Bổ sung lưu tiến độ xem video (Watch Progress) lên Database
-- ====================================================================

ALTER TABLE user_grammar_progress 
ADD COLUMN IF NOT EXISTS last_watch_sec INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_watch_time_str VARCHAR(20) DEFAULT '0:00';

