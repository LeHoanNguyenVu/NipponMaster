-- =============================================================================
-- Flyway Database Migration: V3 Language Tables Enhancement
-- =============================================================================

-- Drop legacy Hibernate check constraints to allow 'STARTER' and newly added enum values
ALTER TABLE vocabularies DROP CONSTRAINT IF EXISTS vocabularies_jlpt_level_check;
ALTER TABLE vocabularies DROP CONSTRAINT IF EXISTS vocabularies_word_type_check;
ALTER TABLE kanjis DROP CONSTRAINT IF EXISTS kanjis_jlpt_level_check;
ALTER TABLE grammars DROP CONSTRAINT IF EXISTS grammars_jlpt_level_check;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_jlpt_level_check;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE placement_questions DROP CONSTRAINT IF EXISTS placement_questions_level_check;
ALTER TABLE placement_questions DROP CONSTRAINT IF EXISTS placement_questions_section_check;
ALTER TABLE subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_jlpt_level_check;
ALTER TABLE subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_plan_type_check;

-- Enhance vocabularies table
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS romaji VARCHAR(100);
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS han_viet VARCHAR(100);
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS stroke_count INTEGER;
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS stroke_guide VARCHAR(500);
ALTER TABLE vocabularies ADD COLUMN IF NOT EXISTS example_romaji VARCHAR(1000);

-- Enhance kanjis table
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS romaji VARCHAR(100);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS han_viet VARCHAR(100);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS stroke_guide VARCHAR(500);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS example_sentence VARCHAR(1000);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS example_romaji VARCHAR(1000);
ALTER TABLE kanjis ADD COLUMN IF NOT EXISTS example_meaning VARCHAR(1000);

