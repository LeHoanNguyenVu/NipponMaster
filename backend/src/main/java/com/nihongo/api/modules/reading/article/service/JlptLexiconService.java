package com.nihongo.api.modules.reading.article.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * Kho tra cứu cấp độ JLPT (N5=1 .. N1=5) hợp nhất từ:
 * 1. Resource tĩnh mở (MIT / CC BY 3.0): reading/jlpt-vocab.csv (~8.000+ từ), reading/jlpt-kanji.csv (2.134 chữ),
 *    reading/jlpt-grammar-patterns.csv (~115 mẫu ngữ pháp đặc trưng).
 * 2. Dữ liệu bảng kanjis / vocabularies / kanji_chapter_vocab trong PostgreSQL (nếu sẵn sàng).
 */
@Slf4j
@Component
public class JlptLexiconService {

    private final Map<String, Integer> vocabRanks = new HashMap<>(16384);
    private final Map<Character, Integer> kanjiRanks = new HashMap<>(4096);
    private final List<GrammarPatternEntry> grammarPatterns = new ArrayList<>(128);

    public JlptLexiconService() {
        loadStaticResources();
    }

    @Autowired
    public JlptLexiconService(ObjectProvider<JdbcTemplate> jdbcProvider) {
        loadStaticResources();
        JdbcTemplate jdbc = jdbcProvider.getIfAvailable();
        if (jdbc != null) {
            mergeFromDatabase(jdbc);
        }
    }

    private void loadStaticResources() {
        loadVocabCsv("reading/jlpt-vocab.csv");
        loadKanjiCsv("reading/jlpt-kanji.csv");
        loadGrammarCsv("reading/jlpt-grammar-patterns.csv");
        log.info("Đã nạp JLPT lexicon tĩnh: vocabKeys={}, kanjis={}, grammarPatterns={}",
                vocabRanks.size(), kanjiRanks.size(), grammarPatterns.size());
    }

    private void loadVocabCsv(String path) {
        ClassPathResource res = new ClassPathResource(path);
        if (!res.exists()) return;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#") || line.startsWith("expression,")) continue;
                String[] parts = line.split(",", -1);
                if (parts.length < 3) continue;
                String expr = stripQuotes(parts[0]).trim();
                String reading = stripQuotes(parts[1]).trim();
                int rank = levelToRank(stripQuotes(parts[2]));
                if (rank == 0) continue;
                if (!expr.isEmpty()) {
                    vocabRanks.merge(expr, rank, Math::min);
                }
                if (!reading.isEmpty()) {
                    vocabRanks.merge(reading, rank, Math::min);
                }
            }
        } catch (Exception e) {
            log.warn("Không thể đọc {}: {}", path, e.getMessage());
        }
    }

    private void loadKanjiCsv(String path) {
        ClassPathResource res = new ClassPathResource(path);
        if (!res.exists()) return;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#") || line.startsWith("character,")) continue;
                String[] parts = line.split(",", -1);
                if (parts.length < 2) continue;
                String ch = parts[0].trim();
                int rank = levelToRank(parts[1]);
                if (ch.length() == 1 && rank > 0) {
                    kanjiRanks.merge(ch.charAt(0), rank, Math::min);
                }
            }
        } catch (Exception e) {
            log.warn("Không thể đọc {}: {}", path, e.getMessage());
        }
    }

    private void loadGrammarCsv(String path) {
        ClassPathResource res = new ClassPathResource(path);
        if (!res.exists()) return;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#") || line.startsWith("pattern,")) continue;
                int comma = line.lastIndexOf(',');
                if (comma <= 0) continue;
                String pat = line.substring(0, comma).trim();
                int rank = levelToRank(line.substring(comma + 1));
                if (!pat.isEmpty() && rank > 0) {
                    grammarPatterns.add(new GrammarPatternEntry(pat, rank));
                }
            }
        } catch (Exception e) {
            log.warn("Không thể đọc {}: {}", path, e.getMessage());
        }
    }

    private void mergeFromDatabase(JdbcTemplate jdbc) {
        try {
            jdbc.query("SELECT character, jlpt_level FROM kanjis", rs -> {
                String ch = rs.getString(1);
                int rank = levelToRank(rs.getString(2));
                if (ch != null && ch.trim().length() == 1 && rank > 0) {
                    kanjiRanks.merge(ch.trim().charAt(0), rank, Math::min);
                }
            });
            jdbc.query("SELECT word, reading, jlpt_level FROM vocabularies", rs -> {
                int rank = levelToRank(rs.getString(3));
                if (rank == 0) return;
                String w = rs.getString(1);
                String r = rs.getString(2);
                if (w != null && !w.isBlank()) vocabRanks.merge(w.trim(), rank, Math::min);
                if (r != null && !r.isBlank()) vocabRanks.merge(r.trim(), rank, Math::min);
            });
            jdbc.query("""
                    SELECT kcv.word, kcv.reading, kc.jlpt_level
                    FROM kanji_chapter_vocab kcv
                    JOIN kanji_chapters kc ON kcv.chapter_id = kc.id
                    """, rs -> {
                int rank = levelToRank(rs.getString(3));
                if (rank == 0) return;
                String w = rs.getString(1);
                String r = rs.getString(2);
                if (w != null && !w.isBlank()) vocabRanks.merge(w.trim(), rank, Math::min);
                if (r != null && !r.isBlank()) vocabRanks.merge(r.trim(), rank, Math::min);
            });
            log.info("Đã hợp nhất dữ liệu DB vào JLPT lexicon: vocabKeys={}, kanjis={}",
                    vocabRanks.size(), kanjiRanks.size());
        } catch (Exception e) {
            log.debug("Bỏ qua merge JLPT lexicon từ DB (môi trường test/offline): {}", e.getMessage());
        }
    }

    public Integer lookupVocabRank(String lemma, String surface, String readingHiragana) {
        Integer r = null;
        if (lemma != null && !lemma.isBlank()) {
            r = vocabRanks.get(lemma);
        }
        if (r == null && surface != null && !surface.isBlank()) {
            r = vocabRanks.get(surface);
        }
        if (r == null && readingHiragana != null && !readingHiragana.isBlank()) {
            r = vocabRanks.get(readingHiragana);
        }
        return r;
    }

    public Integer lookupKanjiRank(char c) {
        return kanjiRanks.get(c);
    }

    public List<GrammarPatternEntry> matchGrammarPatterns(String fullText) {
        if (fullText == null || fullText.isEmpty()) return List.of();
        List<GrammarPatternEntry> matched = new ArrayList<>();
        for (GrammarPatternEntry entry : grammarPatterns) {
            if (fullText.contains(entry.pattern())) {
                matched.add(entry);
            }
        }
        return matched;
    }

    public static int levelToRank(String level) {
        if (level == null) return 0;
        return switch (level.trim().toUpperCase(Locale.ROOT)) {
            case "N5", "STARTER" -> 1;
            case "N4" -> 2;
            case "N3" -> 3;
            case "N2" -> 4;
            case "N1" -> 5;
            default -> 0;
        };
    }

    public static String rankToLevel(int rank) {
        return switch (Math.max(1, Math.min(5, rank))) {
            case 1 -> "N5";
            case 2 -> "N4";
            case 3 -> "N3";
            case 4 -> "N2";
            default -> "N1";
        };
    }

    private String stripQuotes(String s) {
        if (s == null) return "";
        if (s.length() >= 2 && s.startsWith("\"") && s.endsWith("\"")) {
            return s.substring(1, s.length() - 1);
        }
        return s;
    }

    public record GrammarPatternEntry(String pattern, int levelRank) {
    }
}
