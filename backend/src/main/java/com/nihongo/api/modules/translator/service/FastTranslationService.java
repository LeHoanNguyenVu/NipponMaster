package com.nihongo.api.modules.translator.service;

import com.nihongo.api.modules.ai.core.AiMetricsService;
import com.nihongo.api.modules.ai.core.AiRateLimitException;
import com.nihongo.api.modules.ai.core.AiRateLimiter;
import com.nihongo.api.modules.kanji.entity.KanjiChapterVocab;
import com.nihongo.api.modules.kanji.repository.KanjiChapterVocabRepository;
import com.nihongo.api.modules.translator.dto.FastTranslateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;

/**
 * Dịch nhanh 3 tầng:
 * 1. Cache LRU (≈ vài ms)
 * 2. Từ điển nội bộ (từ đơn có trong DB)
 * 3. Gemini Flash-Lite (stream / non-stream)
 */
@Slf4j
@Service
public class FastTranslationService {

    private static final int MAX_ENTRIES = 5000;
    private static final long TTL_MS = 7L * 24 * 60 * 60 * 1000;

    private final FastGeminiTranslator gemini;
    private final KanjiChapterVocabRepository vocabRepository;
    private final AiRateLimiter rateLimiter;
    private final AiMetricsService metricsService;

    public FastTranslationService(FastGeminiTranslator gemini, KanjiChapterVocabRepository vocabRepository) {
        this(gemini, vocabRepository, null, null);
    }

    @Autowired
    public FastTranslationService(
            FastGeminiTranslator gemini,
            KanjiChapterVocabRepository vocabRepository,
            AiRateLimiter rateLimiter,
            AiMetricsService metricsService) {
        this.gemini = gemini;
        this.vocabRepository = vocabRepository;
        this.rateLimiter = rateLimiter;
        this.metricsService = metricsService;
    }

    private record CacheItem(String value, long ts) {}

    /** LRU cache thread-safe. */
    private final Map<String, CacheItem> cache = Collections.synchronizedMap(
            new LinkedHashMap<>(256, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<String, CacheItem> eldest) {
                    return size() > MAX_ENTRIES;
                }
            });

    public record Resolved(String text, String src, String tgt) {}

    public Resolved resolve(String text, String src, String tgt) {
        String t = text == null ? "" : text.trim();
        String s = (src == null || src.isBlank() || "auto".equalsIgnoreCase(src))
                ? LanguageDetector.detect(t) : src.trim().toLowerCase();
        String g = (tgt == null || tgt.isBlank()) ? ("vi".equals(s) ? "ja" : "vi") : tgt.trim().toLowerCase();
        return new Resolved(t, s, g);
    }

    public FastTranslateResponse translate(String text, String src, String tgt) {
        return translate(text, src, tgt, "anonymous");
    }

    public FastTranslateResponse translate(String text, String src, String tgt, String clientKey) {
        long t0 = System.currentTimeMillis();
        Resolved r = resolve(text, src, tgt);
        if (r.text().isEmpty() || r.src().equals(r.tgt())) {
            return build(r, r.text(), "CACHE", t0);
        }

        String quick = quickLookup(r);
        if (quick != null) return build(r, quick, lastSource.get(), t0);

        checkTranslateQuota(clientKey);
        String ai = gemini.translate(r.text(), r.src(), r.tgt());
        if (ai != null && !ai.isBlank()) {
            put(r, ai);
            return build(r, ai, "AI", t0);
        }
        return build(r, null, "FALLBACK", t0);
    }

    /** Dịch dạng stream; trả về response cuối cùng. */
    public FastTranslateResponse translateStream(String text, String src, String tgt, Consumer<String> onChunk) {
        return translateStream(text, src, tgt, "anonymous", onChunk);
    }

    public FastTranslateResponse translateStream(String text, String src, String tgt, String clientKey, Consumer<String> onChunk) {
        long t0 = System.currentTimeMillis();
        Resolved r = resolve(text, src, tgt);
        if (r.text().isEmpty() || r.src().equals(r.tgt())) {
            onChunk.accept(r.text());
            return build(r, r.text(), "CACHE", t0);
        }

        String quick = quickLookup(r);
        if (quick != null) {
            onChunk.accept(quick);
            return build(r, quick, lastSource.get(), t0);
        }

        checkTranslateQuota(clientKey);
        String ai = gemini.translateStream(r.text(), r.src(), r.tgt(), onChunk);
        if (ai != null && !ai.isBlank()) {
            put(r, ai);
            return build(r, ai, "AI", t0);
        }
        return build(r, null, "FALLBACK", t0);
    }

    private void checkTranslateQuota(String clientKey) {
        if (rateLimiter == null) return;
        try {
            rateLimiter.consumeTranslateLlm(clientKey);
        } catch (AiRateLimitException ex) {
            if (metricsService != null) metricsService.recordTranslateRateLimited();
            throw ex;
        }
    }

    // ---------------------------------------------------------------------

    private final ThreadLocal<String> lastSource = new ThreadLocal<>();

    /** Tầng 1 + 2. */
    private String quickLookup(Resolved r) {
        CacheItem e = cache.get(key(r));
        if (e != null) {
            if (System.currentTimeMillis() - e.ts() < TTL_MS) {
                lastSource.set("CACHE");
                return e.value();
            }
            cache.remove(key(r));
        }
        String dict = dictionaryLookup(r);
        if (dict != null) {
            put(r, dict);
            lastSource.set("DICTIONARY");
            return dict;
        }
        return null;
    }

    private String dictionaryLookup(Resolved r) {
        if (!"ja".equals(r.src()) || r.text().length() > 12 || r.text().contains(" ")) return null;
        try {
            Optional<KanjiChapterVocab> v = vocabRepository.findFirstByWord(r.text());
            if (v.isEmpty()) v = vocabRepository.findFirstByReading(r.text());
            return v.map(x -> "en".equals(r.tgt()) ? x.getMeaningEn() : "vi".equals(r.tgt()) ? x.getMeaningVi() : null)
                    .filter(s -> s != null && !s.isBlank())
                    .orElse(null);
        } catch (Exception ex) {
            log.debug("Dictionary lookup failed: {}", ex.getMessage());
            return null;
        }
    }

    private void put(Resolved r, String value) {
        cache.put(key(r), new CacheItem(value, System.currentTimeMillis()));
    }

    private String key(Resolved r) {
        return r.src() + ">" + r.tgt() + ":" + r.text();
    }

    private FastTranslateResponse build(Resolved r, String out, String source, long t0) {
        long ms = System.currentTimeMillis() - t0;
        if (metricsService != null) {
            metricsService.recordTranslate(source, ms);
        }
        log.info("🌐 [{}] {}→{} {} ms", source, r.src(), r.tgt(), ms);
        return FastTranslateResponse.builder()
                .originalText(r.text())
                .translatedText(out)
                .sourceLang(r.src())
                .targetLang(r.tgt())
                .source(source)
                .latencyMs(ms)
                .build();
    }
}
