package com.nihongo.api.modules.reading.article.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.common.exception.BusinessException;
import com.nihongo.api.common.storage.StorageService;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.AdminArticleSummaryDto;
import com.nihongo.api.modules.reading.article.service.ReadingArticleRepository.VersionCoverTarget;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;

/**
 * Dịch vụ tạo/chọn ảnh bìa báo chí hợp pháp theo chế độ Hybrid 3 tầng tự động — ĐẢM BẢO MỖI BÀI 1 ẢNH RIÊNG KHÔNG TRÙNG LẶP:
 * 1) Tầng 1 - Gemini AI Image (GEMINI_MEDIA_API_KEY, fallback nhẹ GEMINI_API_KEY 1 lượt không retry khi 429/403)
 *    -> upload lên Supabase Storage (reading-covers/article-{id}-v{versionId}.{ext}).
 * 2) Tầng 2 - Pexels API miễn phí (nếu đã cấu hình PEXELS_API_KEY) -> bỏ qua mọi URL đã dùng.
 * 3) Tầng 3 - Wikimedia Commons API (MIỄN PHÍ 100%, KHÔNG CẦN KEY, chỉ lấy ảnh chụp Nhật Bản thật theo giấy phép mở
 *    CC0 / Public domain / CC BY / CC BY-SA, tự động xoay vòng nhiều truy vấn & loại trừ toàn bộ URL đã dùng trong DB).
 * 4) Tầng 4 - Nếu mất mạng/không có kết quả -> trả null để UI hiển thị banner đồ họa NHK mặc định.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReadingCoverImageService {

    private static final String GEMINI_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";
    private static final String PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search?query=%s&orientation=landscape&per_page=15";
    private static final String WIKIMEDIA_SEARCH_URL =
            "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6"
                    + "&gsrsearch=%s+filetype:bitmap&gsrlimit=25&prop=imageinfo&iiprop=url%%7Csize%%7Cmime%%7Cextmetadata"
                    + "&iiurlwidth=1200&format=json";
    private static final String WIKIMEDIA_USER_AGENT = "NipponMaster/2.0 (Educational Japanese Reading App)";

    private static final Map<String, String> CATEGORY_PEXELS_QUERY = Map.of(
            "SOCIETY", "tokyo japan street city government building",
            "LIFE", "japan daily life family neighborhood",
            "ECONOMY", "tokyo financial district business office",
            "SCI_TECH", "japan modern technology science laboratory",
            "SPORTS", "japan stadium sports athletics",
            "CULTURE", "kyoto japan traditional temple culture",
            "WEATHER", "japan sky nature weather landscape"
    );

    private static final Map<String, String> CATEGORY_WIKIMEDIA_QUERY = Map.of(
            "SOCIETY", "Tokyo Kasumigaseki government building Japan",
            "LIFE", "Japan residential street neighborhood Tokyo",
            "ECONOMY", "Marunouchi Tokyo financial district skyscrapers",
            "SCI_TECH", "Japan Shinkansen modern technology station",
            "SPORTS", "Japan National Stadium Tokyo sports",
            "CULTURE", "Kyoto temple traditional Japan architecture",
            "WEATHER", "Mount Fuji Tokyo skyline sky Japan"
    );

    private static final List<String> JAPAN_DIVERSITY_QUERIES = List.of(
            "Tokyo cityscape skyline Japan",
            "Chiyoda Tokyo buildings street Japan",
            "Shinjuku Shibuya Tokyo modern city",
            "Yokohama Osaka modern buildings Japan",
            "Nagatacho National Diet Building Tokyo"
    );

    private final ReadingArticleRepository repository;
    private final StorageService storageService;
    private final ObjectMapper objectMapper;

    @Value("${reading.image.gemini-api-key:}")
    private String mediaApiKeyConfig;

    @Value("${gemini.api.key:}")
    private String mainApiKeyConfig;

    @Value("${reading.image.gemini-model:gemini-2.5-flash-image}")
    private String geminiImageModel = "gemini-2.5-flash-image";

    @Value("${reading.image.bucket:kanji-assets}")
    private String imageBucket = "kanji-assets";

    @Value("${reading.image.pexels-api-key:}")
    private String pexelsApiKey;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12))
            .build();

    public record CoverImageResult(String url, String credit, String source) {
    }

    /**
     * Gọi best-effort trong pipeline ingest: tự động gán ảnh bìa RIÊNG BIỆT (không trùng) cho từng phiên bản N5/N3/N1.
     */
    public void generateAndSaveSilently(Long articleId, String category, List<String> facts) {
        try {
            List<VersionCoverTarget> versions = repository.findVersionsForCoverByArticleId(articleId);
            Set<String> usedUrls = repository.findAllUsedCoverImageUrls(null);
            CoverImageResult firstCover = null;
            for (VersionCoverTarget v : versions) {
                CoverImageResult res = resolveHybridCoverImage(articleId, v.versionId(), v.jlptLevel(), category, facts, usedUrls);
                if (res != null) {
                    usedUrls.add(res.url());
                    repository.updateVersionCoverImage(v.versionId(), res.url(), res.credit(), res.source());
                    if (firstCover == null) firstCover = res;
                }
            }
            if (firstCover != null) {
                repository.updateArticleCoverImage(articleId, firstCover.url(), firstCover.credit(), firstCover.source());
                log.info("Đã gắn ảnh bìa riêng [{}] cho {} phiên bản bài đọc #{}", firstCover.source(), versions.size(), articleId);
            }
        } catch (Exception e) {
            log.warn("Không thể tạo ảnh bìa tự động cho bài đọc #{}: {}", articleId, e.getMessage());
        }
    }

    /**
     * Admin bấm "Tạo ảnh Hybrid" cho một sự kiện: gán ảnh RIÊNG BIỆT không trùng cho từng phiên bản N5/N3/N1 của bài đó.
     */
    public AdminArticleSummaryDto generateCoverImageForArticle(Long articleId) {
        AdminArticleSummaryDto art = repository.findAdminArticleById(articleId);
        List<VersionCoverTarget> versions = repository.findVersionsForCoverByArticleId(articleId);
        Set<String> usedUrls = repository.findAllUsedCoverImageUrls(articleId);

        CoverImageResult firstCover = null;
        int assigned = 0;
        for (VersionCoverTarget v : versions) {
            CoverImageResult res = resolveHybridCoverImage(articleId, v.versionId(), v.jlptLevel(), art.getCategory(), art.getFacts(), usedUrls);
            if (res != null) {
                usedUrls.add(res.url());
                repository.updateVersionCoverImage(v.versionId(), res.url(), res.credit(), res.source());
                if (firstCover == null) firstCover = res;
                assigned++;
            }
        }

        if (assigned == 0 || firstCover == null) {
            throw new BusinessException(
                    "Không tạo được ảnh tự động từ cả 3 nguồn (Gemini / Pexels / Wikimedia). Bạn có thể dán URL ảnh thủ công."
            );
        }
        repository.updateArticleCoverImage(articleId, firstCover.url(), firstCover.credit(), firstCover.source());
        return repository.findAdminArticleById(articleId);
    }

    /**
     * Bổ sung / khử trùng ảnh bìa Hybrid hàng loạt cho toàn bộ phiên bản chưa có ảnh riêng hoặc đang bị trùng ảnh.
     */
    public int backfillMissingCoverImages(int maxVersions) {
        List<VersionCoverTarget> targets = repository.findVersionsNeedingUniqueCover(Math.max(1, Math.min(maxVersions, 60)));
        if (targets.isEmpty()) {
            return 0;
        }
        Set<String> usedUrls = repository.findAllUsedCoverImageUrls(null);
        Set<Long> updatedArticles = new HashSet<>();
        int updated = 0;
        for (VersionCoverTarget t : targets) {
            try {
                CoverImageResult res = resolveHybridCoverImage(t.articleId(), t.versionId(), t.jlptLevel(), t.category(), t.facts(), usedUrls);
                if (res != null) {
                    usedUrls.add(res.url());
                    repository.updateVersionCoverImage(t.versionId(), res.url(), res.credit(), res.source());
                    if (updatedArticles.add(t.articleId())) {
                        repository.updateArticleCoverImage(t.articleId(), res.url(), res.credit(), res.source());
                    }
                    updated++;
                }
            } catch (Exception e) {
                log.warn("Backfill ảnh bìa lỗi cho version #{}: {}", t.versionId(), e.getMessage());
            }
        }
        return updated;
    }

    /**
     * Admin tự dán URL ảnh https:// (hoặc để trống để xóa ảnh và quay về banner đồ họa mặc định).
     */
    public AdminArticleSummaryDto setManualCoverImage(Long articleId, String coverImageUrl, String coverImageCredit) {
        repository.findAdminArticleById(articleId);
        String cleanUrl = coverImageUrl == null ? "" : coverImageUrl.trim();
        if (cleanUrl.isEmpty()) {
            repository.clearVersionCoverImagesForArticle(articleId);
            repository.updateArticleCoverImage(articleId, null, null, null);
            return repository.findAdminArticleById(articleId);
        }
        if (!isSafePublicHttpsImageUrl(cleanUrl)) {
            throw new BusinessException("URL ảnh không hợp lệ (chỉ chấp nhận https:// công khai, không chấp nhận localhost/IP nội bộ).");
        }
        String cleanCredit = coverImageCredit == null || coverImageCredit.isBlank()
                ? null
                : coverImageCredit.trim().substring(0, Math.min(coverImageCredit.trim().length(), 190));
        repository.clearVersionCoverImagesForArticle(articleId);
        repository.updateArticleCoverImage(articleId, cleanUrl, cleanCredit, "MANUAL");
        return repository.findAdminArticleById(articleId);
    }

    public CoverImageResult resolveHybridCoverImage(Long articleId, String category, List<String> facts) {
        return resolveHybridCoverImage(articleId, articleId, "N3", category, facts, new HashSet<>());
    }

    public CoverImageResult resolveHybridCoverImage(
            Long articleId,
            Long versionId,
            String jlptLevel,
            String category,
            List<String> facts,
            Set<String> usedUrls
    ) {
        Set<String> seen = usedUrls != null ? usedUrls : new HashSet<>();
        CoverImageResult gemini = tryGenerateWithGemini(articleId, versionId, jlptLevel, category, facts);
        if (gemini != null && !seen.contains(gemini.url())) {
            return gemini;
        }
        CoverImageResult pexels = tryFetchFromPexels(versionId != null ? versionId : articleId, category, facts, seen);
        if (pexels != null) {
            return pexels;
        }
        return tryFetchFromWikimedia(versionId != null ? versionId : articleId, category, facts, seen);
    }

    protected CoverImageResult tryGenerateWithGemini(Long articleId, Long versionId, String jlptLevel, String category, List<String> facts) {
        List<String> keys = resolveGeminiImageKeys();
        if (keys.isEmpty()) {
            return null;
        }
        String prompt = buildEditorialImagePrompt(category, facts);
        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of(
                        "responseModalities", List.of("IMAGE")
                )
        );
        String payloadJson;
        try {
            payloadJson = objectMapper.writeValueAsString(body);
        } catch (Exception e) {
            return null;
        }

        // Thử tối đa 1 lượt mỗi key (không retry khi 429/403 để không tiêu tốn quota hay gây chậm)
        for (String key : keys) {
            try {
                String url = String.format(GEMINI_URL_TEMPLATE, geminiImageModel);
                HttpRequest req = HttpRequest.newBuilder(URI.create(url))
                        .header("Content-Type", "application/json; charset=utf-8")
                        .header("x-goog-api-key", key)
                        .timeout(Duration.ofSeconds(30))
                        .POST(HttpRequest.BodyPublishers.ofString(payloadJson, StandardCharsets.UTF_8))
                        .build();

                HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                if (res.statusCode() == 200) {
                    ImagePayload img = extractInlineImage(res.body());
                    if (img != null) {
                        String ext = img.mimeType().contains("png") ? "png"
                                : img.mimeType().contains("webp") ? "webp" : "jpg";
                        String suffix = versionId != null ? ("-v" + versionId) : ("-" + (jlptLevel != null ? jlptLevel : "v"));
                        String path = "reading-covers/article-" + articleId + suffix + "." + ext;
                        String publicUrl = storageService.uploadPublicFile(imageBucket, path, img.bytes(), img.mimeType());
                        if (publicUrl != null && !publicUrl.isBlank()) {
                            String busted = publicUrl + (publicUrl.contains("?") ? "&" : "?") + "v=" + System.currentTimeMillis();
                            return new CoverImageResult(busted, "Minh họa biên tập AI · NipponMaster", "GEMINI");
                        }
                    }
                } else {
                    log.info("Gemini Image [{}] trả về HTTP {} -> chuyển fallback kế tiếp", geminiImageModel, res.statusCode());
                }
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                return null;
            } catch (Exception e) {
                log.warn("Gemini Image lỗi cho bài #{}: {}", articleId, e.getMessage());
            }
        }
        return null;
    }

    protected CoverImageResult tryFetchFromPexels(Long seedId, String category, List<String> facts, Set<String> usedUrls) {
        if (pexelsApiKey == null || pexelsApiKey.isBlank()) {
            return null;
        }
        String query = buildPexelsQuery(category, facts);
        try {
            String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
            HttpRequest req = HttpRequest.newBuilder(URI.create(String.format(PEXELS_SEARCH_URL, encoded)))
                    .header("Authorization", pexelsApiKey.trim())
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (res.statusCode() != 200) {
                log.warn("Pexels API trả về HTTP {}", res.statusCode());
                return null;
            }
            JsonNode photos = objectMapper.readTree(res.body()).path("photos");
            if (!photos.isArray() || photos.isEmpty()) {
                return null;
            }
            List<CoverImageResult> fresh = new ArrayList<>();
            for (JsonNode p : photos) {
                String imgUrl = p.path("src").path("large").asText("");
                if (isSafePublicHttpsImageUrl(imgUrl) && !usedUrls.contains(imgUrl)) {
                    String photographer = p.path("photographer").asText("Pexels").trim();
                    String credit = "Photo by " + (photographer.isEmpty() ? "Pexels" : photographer) + " / Pexels";
                    fresh.add(new CoverImageResult(imgUrl, credit, "PEXELS"));
                }
            }
            if (!fresh.isEmpty()) {
                int idx = (int) (Math.abs(seedId != null ? seedId : 0L) % fresh.size());
                return fresh.get(idx);
            }
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.warn("Pexels API lỗi: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Tầng 3 tự động (0 key, 0 chi phí): truy vấn ảnh chụp Nhật Bản thật từ Wikimedia Commons
     * với danh sách trắng giấy phép mở và loại trừ toàn bộ URL đã dùng để mỗi bài có 1 ảnh duy nhất.
     */
    protected CoverImageResult tryFetchFromWikimedia(Long seedId, String category, List<String> facts, Set<String> usedUrls) {
        List<String> queries = buildWikimediaQueryCascade(category, facts);
        for (String q : queries) {
            CoverImageResult hit = searchWikimediaOnce(seedId, q, usedUrls);
            if (hit != null) {
                return hit;
            }
        }
        return null;
    }

    public static URI buildWikimediaSearchUri(String query) {
        String encoded = URLEncoder.encode(query == null ? "Tokyo Japan" : query, StandardCharsets.UTF_8);
        return URI.create(String.format(WIKIMEDIA_SEARCH_URL, encoded));
    }

    private CoverImageResult searchWikimediaOnce(Long seedId, String query, Set<String> usedUrls) {
        try {
            HttpRequest req = HttpRequest.newBuilder(buildWikimediaSearchUri(query))
                    .header("User-Agent", WIKIMEDIA_USER_AGENT)
                    .timeout(Duration.ofSeconds(12))
                    .GET()
                    .build();

            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (res.statusCode() != 200) {
                log.warn("Wikimedia Commons API trả về HTTP {}", res.statusCode());
                return null;
            }
            JsonNode pages = objectMapper.readTree(res.body()).path("query").path("pages");
            if (!pages.isObject()) {
                return null;
            }

            List<CoverImageResult> candidates = new ArrayList<>();
            Iterator<Map.Entry<String, JsonNode>> fields = pages.fields();
            while (fields.hasNext()) {
                JsonNode page = fields.next().getValue();
                String title = page.path("title").asText("");
                if (isUndesirableWikimediaTitle(title)) continue;

                JsonNode ii = page.path("imageinfo").path(0);
                if (ii.isMissingNode()) continue;

                String mime = ii.path("mime").asText("").toLowerCase(Locale.ROOT);
                if (!mime.equals("image/jpeg") && !mime.equals("image/png") && !mime.equals("image/webp")) {
                    continue;
                }
                int width = ii.path("width").asInt(0);
                int height = ii.path("height").asInt(0);
                if (width < 800 || height < 450 || width <= height) {
                    continue; // chỉ lấy ảnh ngang (landscape) đủ nét
                }

                JsonNode meta = ii.path("extmetadata");
                String license = meta.path("LicenseShortName").path("value").asText("").trim();
                if (!isAllowedOpenLicense(license)) {
                    continue;
                }

                String rawUrl = ii.path("thumburl").asText("");
                if (rawUrl.isBlank()) {
                    rawUrl = ii.path("url").asText("");
                }
                String cleanUrl = stripQueryParams(rawUrl);
                if (!isSafePublicHttpsImageUrl(cleanUrl) || usedUrls.contains(cleanUrl)) {
                    continue;
                }

                String artistRaw = meta.path("Artist").path("value").asText("");
                String artist = cleanHtmlText(artistRaw);
                if (artist.length() > 60) {
                    artist = artist.substring(0, 57) + "...";
                }
                String credit = artist.isEmpty()
                        ? ("Wikimedia Commons (" + license + ")")
                        : ("Photo: " + artist + " (" + license + ") · Wikimedia");
                candidates.add(new CoverImageResult(cleanUrl, credit, "WIKIMEDIA"));
            }

            if (!candidates.isEmpty()) {
                candidates.sort(Comparator.comparing(CoverImageResult::url));
                int idx = (int) (Math.abs(seedId != null ? seedId : 0L) % candidates.size());
                return candidates.get(idx);
            }
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.warn("Wikimedia Commons API lỗi [{}]: {}", query, e.getMessage());
        }
        return null;
    }

    public static boolean isAllowedOpenLicense(String licenseShortName) {
        if (licenseShortName == null || licenseShortName.isBlank()) return false;
        String lower = licenseShortName.trim().toLowerCase(Locale.ROOT);
        return lower.equals("cc0")
                || lower.startsWith("public domain")
                || lower.startsWith("cc by ")
                || lower.startsWith("cc-by-")
                || lower.startsWith("cc by-sa")
                || lower.startsWith("cc-by-sa");
    }

    public static boolean isUndesirableWikimediaTitle(String title) {
        String lower = title == null ? "" : title.toLowerCase(Locale.ROOT);
        return lower.contains("placard")
                || lower.contains("sign")
                || lower.contains("map")
                || lower.contains("logo")
                || lower.contains("diagram")
                || lower.contains("chart")
                || lower.contains("poster")
                || lower.contains("stamp")
                || lower.contains("met_dp")
                || lower.contains("met ")
                || lower.contains("ukiyo")
                || lower.contains("woodblock")
                || lower.contains("painting")
                || lower.contains("kunisada")
                || lower.contains("hokusai")
                || lower.contains("hiroshige")
                || lower.contains("drawing")
                || lower.contains("manuscript")
                || lower.contains("document");
    }

    private static String stripQueryParams(String url) {
        if (url == null) return "";
        int q = url.indexOf('?');
        return q > 0 ? url.substring(0, q) : url;
    }

    private static String cleanHtmlText(String html) {
        if (html == null || html.isBlank()) return "";
        return html.replaceAll("<[^>]+>", " ")
                .replaceAll("&nbsp;", " ")
                .replaceAll("&amp;", "&")
                .replaceAll("\\s+", " ")
                .trim();
    }

    public static String buildEditorialImagePrompt(String category, List<String> facts) {
        String cat = category == null ? "SOCIETY" : category.trim().toUpperCase(Locale.ROOT);
        StringBuilder factSummary = new StringBuilder();
        if (facts != null) {
            int max = Math.min(3, facts.size());
            for (int i = 0; i < max; i++) {
                if (i > 0) factSummary.append(" ");
                factSummary.append(facts.get(i));
            }
        }
        return "Create a realistic 16:9 widescreen Japanese broadcast newsroom editorial photograph (NHK World photojournalism aesthetic) "
                + "illustrating the scene/setting of this Japanese news topic (category: " + cat + "): "
                + factSummary + ". "
                + "Rules: authentic contemporary Japan setting, natural documentary lighting, shallow depth of field. "
                + "STRICTLY NO readable text, NO Japanese/English letters, NO logos, NO TV chyrons, NO watermarks, "
                + "and NEVER depict the recognizable face of any real politician or real public figure (use buildings, environments, objects, or softly blurred generic silhouettes).";
    }

    public static String buildPexelsQuery(String category, List<String> facts) {
        String joined = facts == null ? "" : String.join(" ", facts).toLowerCase(Locale.ROOT);
        if (joined.contains("họp báo") || joined.contains("bộ trưởng") || joined.contains("chính phủ")) {
            return "japan tokyo government building conference";
        }
        if (joined.contains("y tế") || joined.contains("bệnh viện") || joined.contains("tủy xương") || joined.contains("bác sĩ")) {
            return "modern hospital medical clinic japan";
        }
        if (joined.contains("du lịch") || joined.contains("khách") || joined.contains("lễ hội")) {
            return "japan kyoto tokyo tourism temple";
        }
        if (joined.contains("nông nghiệp") || joined.contains("lúa") || joined.contains("thực phẩm")) {
            return "japan agriculture farm rice field";
        }
        if (joined.contains("bão") || joined.contains("mưa") || joined.contains("động đất") || joined.contains("tuyết")) {
            return "japan weather rain city street";
        }
        String normCat = category == null ? "SOCIETY" : category.trim().toUpperCase(Locale.ROOT);
        return CATEGORY_PEXELS_QUERY.getOrDefault(normCat, "tokyo japan city news");
    }

    public static String buildWikimediaQuery(String category, List<String> facts) {
        String joined = facts == null ? "" : String.join(" ", facts).toLowerCase(Locale.ROOT);
        if (joined.contains("họp báo") || joined.contains("bộ trưởng") || joined.contains("nội các") || joined.contains("chính phủ")) {
            return "Kasumigaseki Central Government Building Tokyo";
        }
        if (joined.contains("tủy xương") || joined.contains("hiến") || joined.contains("bệnh viện") || joined.contains("y tế") || joined.contains("bác sĩ")) {
            return "Japan hospital Tokyo medical center building";
        }
        if (joined.contains("kinh tế") || joined.contains("thương mại") || joined.contains("đầu tư") || joined.contains("tài chính")) {
            return "Marunouchi Tokyo financial district buildings";
        }
        if (joined.contains("chuyển đổi số") || joined.contains("kỹ thuật số") || joined.contains("ứng dụng") || joined.contains("ai ")) {
            return "Tokyo modern office technology Shibuya";
        }
        if (joined.contains("du lịch") || joined.contains("khách quốc tế") || joined.contains("sân bay")) {
            return "Kyoto Japan tourism street temple";
        }
        if (joined.contains("nông nghiệp") || joined.contains("gạo") || joined.contains("thực phẩm") || joined.contains("thủy sản")) {
            return "Japan rice field agriculture farm";
        }
        if (joined.contains("bão") || joined.contains("mưa") || joined.contains("động đất") || joined.contains("tuyết")) {
            return "Tokyo rain street skyline Japan";
        }
        String normCat = category == null ? "SOCIETY" : category.trim().toUpperCase(Locale.ROOT);
        return CATEGORY_WIKIMEDIA_QUERY.getOrDefault(normCat, "Tokyo Kasumigaseki Japan");
    }

    private static List<String> buildWikimediaQueryCascade(String category, List<String> facts) {
        LinkedHashSet<String> queries = new LinkedHashSet<>();
        queries.add(buildWikimediaQuery(category, facts));
        String normCat = category == null ? "SOCIETY" : category.trim().toUpperCase(Locale.ROOT);
        String catDefault = CATEGORY_WIKIMEDIA_QUERY.get(normCat);
        if (catDefault != null) queries.add(catDefault);
        queries.addAll(JAPAN_DIVERSITY_QUERIES);
        return new ArrayList<>(queries);
    }

    public static boolean isSafePublicHttpsImageUrl(String url) {
        if (url == null || url.isBlank() || url.length() > 1500) return false;
        try {
            URI uri = URI.create(url.trim());
            if (!"https".equalsIgnoreCase(uri.getScheme())) return false;
            String host = uri.getHost();
            if (host == null || host.isBlank()) return false;
            String lower = host.toLowerCase(Locale.ROOT);
            if (lower.equals("localhost") || lower.endsWith(".local") || lower.endsWith(".internal")) return false;
            if (lower.startsWith("127.") || lower.startsWith("10.") || lower.startsWith("192.168.")
                    || lower.startsWith("169.254.") || lower.equals("0.0.0.0") || lower.equals("[::1]")) {
                return false;
            }
            return lower.contains(".");
        } catch (Exception e) {
            return false;
        }
    }

    private List<String> resolveGeminiImageKeys() {
        String source = (mediaApiKeyConfig != null && !mediaApiKeyConfig.isBlank())
                ? mediaApiKeyConfig
                : mainApiKeyConfig;
        if (source == null || source.isBlank()) return List.of();
        return Arrays.stream(source.split("[,;\\s]+"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private ImagePayload extractInlineImage(String responseBody) {
        try {
            JsonNode parts = objectMapper.readTree(responseBody)
                    .path("candidates").path(0).path("content").path("parts");
            if (!parts.isArray()) return null;
            for (JsonNode part : parts) {
                JsonNode inline = part.path("inlineData");
                String b64 = inline.path("data").asText("");
                String mime = inline.path("mimeType").asText("image/jpeg");
                if (!b64.isBlank() && mime.startsWith("image/")) {
                    return new ImagePayload(Base64.getDecoder().decode(b64), mime);
                }
            }
        } catch (Exception e) {
            log.warn("Không đọc được inlineData ảnh từ Gemini: {}", e.getMessage());
        }
        return null;
    }

    private record ImagePayload(byte[] bytes, String mimeType) {
    }
}
