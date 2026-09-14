-- =============================================================================
-- Flyway Database Migration: V8 Alter Level Columns to VARCHAR(20)
-- To support 'STARTER' level (7 characters) and future level identifiers
-- =============================================================================

ALTER TABLE placement_results ALTER COLUMN target_level TYPE VARCHAR(20);
ALTER TABLE placement_results ALTER COLUMN recommended_level TYPE VARCHAR(20);
ALTER TABLE placement_questions ALTER COLUMN level TYPE VARCHAR(20);
ALTER TABLE users ALTER COLUMN jlpt_level TYPE VARCHAR(20);
ALTER TABLE users ALTER COLUMN target_level TYPE VARCHAR(20);
ALTER TABLE subscription_plans ALTER COLUMN jlpt_level TYPE VARCHAR(20);
ALTER TABLE classrooms ALTER COLUMN level TYPE VARCHAR(20);
ALTER TABLE vocabularies ALTER COLUMN jlpt_level TYPE VARCHAR(20);
ALTER TABLE kanjis ALTER COLUMN jlpt_level TYPE VARCHAR(20);
ALTER TABLE grammars ALTER COLUMN jlpt_level TYPE VARCHAR(20);
