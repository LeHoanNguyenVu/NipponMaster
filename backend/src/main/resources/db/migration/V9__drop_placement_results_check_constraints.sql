-- =============================================================================
-- Flyway Database Migration: V9 Drop Placement Results Check Constraints
-- Allow 'STARTER' level for recommended_level and target_level
-- =============================================================================

ALTER TABLE placement_results DROP CONSTRAINT IF EXISTS placement_results_recommended_level_check;
ALTER TABLE placement_results DROP CONSTRAINT IF EXISTS placement_results_target_level_check;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_target_level_check;
ALTER TABLE classrooms DROP CONSTRAINT IF EXISTS classrooms_level_check;
