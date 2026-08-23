package com.nihongo.api.common.config;

import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * Explicit Flyway configuration to ensure all SQL migrations (V1 -> V6)
 * run automatically against Supabase PostgreSQL on startup.
 */
@Slf4j
@Configuration
public class FlywayConfig {

    @Bean
    public Flyway flyway(DataSource dataSource) {
        log.info("Initializing Flyway database migrations for Supabase PostgreSQL...");
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .baselineOnMigrate(true)
                .baselineVersion("0")
                .locations("classpath:db/migration")
                .outOfOrder(true)
                .load();

        try (var conn = dataSource.getConnection();
             var stmt = conn.createStatement()) {
            log.info("Dropping legacy Hibernate check constraints on language and user tables...");
            stmt.execute("ALTER TABLE vocabularies DROP CONSTRAINT IF EXISTS vocabularies_jlpt_level_check");
            stmt.execute("ALTER TABLE vocabularies DROP CONSTRAINT IF EXISTS vocabularies_word_type_check");
            stmt.execute("ALTER TABLE kanjis DROP CONSTRAINT IF EXISTS kanjis_jlpt_level_check");
            stmt.execute("ALTER TABLE grammars DROP CONSTRAINT IF EXISTS grammars_jlpt_level_check");
            stmt.execute("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_jlpt_level_check");
            stmt.execute("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check");
            stmt.execute("ALTER TABLE placement_questions DROP CONSTRAINT IF EXISTS placement_questions_level_check");
            stmt.execute("ALTER TABLE placement_questions DROP CONSTRAINT IF EXISTS placement_questions_section_check");
            stmt.execute("ALTER TABLE subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_jlpt_level_check");
            stmt.execute("ALTER TABLE subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_plan_type_check");
        } catch (Exception e) {
            log.warn("Could not drop legacy check constraints before migration: {}", e.getMessage());
        }

        try {
            log.info("Executing Flyway repair to clean any failed migration states...");
            flyway.repair();
            log.info("Executing Flyway migrate...");
            var result = flyway.migrate();
            log.info("Flyway migration completed! Migrations executed: {}, Target schema version: {}",
                    result.migrationsExecuted, result.targetSchemaVersion);
        } catch (Exception e) {
            log.error("Flyway migration execution error: {}", e.getMessage(), e);
            throw e;
        }

        return flyway;
    }
}
