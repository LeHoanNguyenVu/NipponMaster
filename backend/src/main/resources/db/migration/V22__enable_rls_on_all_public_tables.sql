-- =============================================================================
-- Flyway Migration: V22 - Enable Row Level Security (RLS) on All Public Tables
-- Secures database tables from unauthorized direct PostgREST access.
-- Table owner (Spring Boot / postgres role) retains full unrestricted access.
-- =============================================================================

ALTER TABLE IF EXISTS public.anti_cheat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.classroom_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enterprise_orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.flyway_schema_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kanji_achievement_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kanji_chapter_vocab ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kanji_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kanji_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.kanji_minigames ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.placement_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.placement_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.retention_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_kanji_progress ENABLE ROW LEVEL SECURITY;
