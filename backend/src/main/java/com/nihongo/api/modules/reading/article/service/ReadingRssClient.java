package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.RssItem;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.RssSourceConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Đọc metadata RSS/RDF/Atom từ danh sách nguồn đã kiểm chứng bản quyền (Phase 0).
 * Biện pháp bảo mật & pháp lý bắt buộc:
 * - Chỉ cho phép 7 host trong whitelist (chống SSRF) & chặn redirect ra ngoài whitelist.
 * - Giới hạn dung lượng phản hồi <= 2 MB, timeout 10 giây.
 * - Tắt hoàn toàn DTD / external entity khi parse XML (chống XXE).
 * - Chỉ đọc metadata (tiêu đề, mô tả ngắn, link, ngày đăng), tuyệt đối không tải HTML bài báo gốc.
 */
@Slf4j
@Component
public class ReadingRssClient {

    public static final int MAX_RESPONSE_BYTES = 2 * 1024 * 1024; // 2 MB
    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(10);
    private static final String USER_AGENT = "NipponMaster-ReadingIngest/1.0 (+https://nipponmaster.jp)";
    private static final Pattern XML_ENCODING_PATTERN = Pattern.compile("encoding=[\"']([^\"']+)[\"']", Pattern.CASE_INSENSITIVE);
    private static final Pattern XML_DECL_PATTERN = Pattern.compile("^\\s*<\\?xml[^>]*\\?>", Pattern.CASE_INSENSITIVE);

    public static final Set<String> ALLOWED_HOSTS = Set.of(
            "www.gov-online.go.jp",
            "www.digital.go.jp",
            "www.mlit.go.jp",
            "www.soumu.go.jp",
            "www.maff.go.jp",
            "www.data.jma.go.jp",
            "www.nhk.or.jp"
    );

    public static final Map<String, RssSourceConfig> ALL_SOURCES;

    static {
        Map<String, RssSourceConfig> m = new LinkedHashMap<>();
        // Tầng 1: Nguồn mở công quyền Nhật (Public Data License 1.0 / CC BY 4.0)
        m.put("GOV_ONLINE", new RssSourceConfig("GOV_ONLINE", "政府広報オンライン", "https://www.gov-online.go.jp/rss/index.rdf", "PDL_1_0", "LIFE", "UTF-8"));
        m.put("DIGITAL_AGENCY", new RssSourceConfig("DIGITAL_AGENCY", "デジタル庁", "https://www.digital.go.jp/rss/news.xml", "PDL_1_0", "SCI_TECH", "UTF-8"));
        m.put("KANKOCHO", new RssSourceConfig("KANKOCHO", "観光庁", "https://www.mlit.go.jp/kankocho/press.rdf", "PDL_1_0", "CULTURE", "MS932"));
        m.put("SOUMU", new RssSourceConfig("SOUMU", "総務省", "https://www.soumu.go.jp/news.rdf", "PDL_1_0", "SCI_TECH", "MS932"));
        m.put("MAFF", new RssSourceConfig("MAFF", "農林水産省", "https://www.maff.go.jp/j/press/rss.xml", "PDL_1_0", "LIFE", "UTF-8"));
        m.put("JMA_REGULAR", new RssSourceConfig("JMA_REGULAR", "気象庁", "https://www.data.jma.go.jp/developer/xml/feed/regular.xml", "PDL_1_0", "WEATHER", "UTF-8"));

        // Tầng 2: Tin nóng thời sự (chỉ trích sự kiện khách quan theo 著作権法 Điều 10 khoản 2)
        m.put("NHK_TOP", new RssSourceConfig("NHK_TOP", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat0.xml", "FACTS_ONLY", "SOCIETY", "UTF-8"));
        m.put("NHK_SOCIETY", new RssSourceConfig("NHK_SOCIETY", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat1.xml", "FACTS_ONLY", "SOCIETY", "UTF-8"));
        m.put("NHK_CULTURE", new RssSourceConfig("NHK_CULTURE", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat2.xml", "FACTS_ONLY", "CULTURE", "UTF-8"));
        m.put("NHK_SCITECH", new RssSourceConfig("NHK_SCITECH", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat3.xml", "FACTS_ONLY", "SCI_TECH", "UTF-8"));
        m.put("NHK_ECONOMY", new RssSourceConfig("NHK_ECONOMY", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat5.xml", "FACTS_ONLY", "ECONOMY", "UTF-8"));
        m.put("NHK_SPORTS", new RssSourceConfig("NHK_SPORTS", "NHK NEWS WEB", "https://www.nhk.or.jp/rss/news/cat7.xml", "FACTS_ONLY", "SPORTS", "UTF-8"));
        ALL_SOURCES = Collections.unmodifiableMap(m);
    }

    @Value("${reading.rss.enabled-sources:GOV_ONLINE,DIGITAL_AGENCY,KANKOCHO,MAFF,NHK_TOP,NHK_CULTURE,NHK_ECONOMY,NHK_SCITECH}")
    private String enabledSourcesConfig;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(REQUEST_TIMEOUT)
            .followRedirects(HttpClient.Redirect.NEVER) // Chống SSRF qua redirect sang host ngoài whitelist
            .build();

    public List<RssSourceConfig> getEnabledSources(String sourceFilter) {
        if (sourceFilter != null && !sourceFilter.isBlank()) {
            RssSourceConfig single = ALL_SOURCES.get(sourceFilter.trim().toUpperCase(Locale.ROOT));
            if (single == null) {
                throw new IllegalArgumentException("Nguồn RSS không hợp lệ hoặc không có trong whitelist: " + sourceFilter);
            }
            return List.of(single);
        }
        String cfg = (enabledSourcesConfig == null || enabledSourcesConfig.isBlank())
                ? "GOV_ONLINE,DIGITAL_AGENCY,NHK_TOP,NHK_CULTURE"
                : enabledSourcesConfig;
        List<RssSourceConfig> out = new ArrayList<>();
        for (String token : cfg.split(",")) {
            RssSourceConfig s = ALL_SOURCES.get(token.trim().toUpperCase(Locale.ROOT));
            if (s != null) {
                out.add(s);
            }
        }
        return out;
    }

    public List<RssItem> fetchEnabledFeeds(String sourceFilter, int maxPerSource) {
        List<RssItem> all = new ArrayList<>();
        for (RssSourceConfig source : getEnabledSources(sourceFilter)) {
            try {
                List<RssItem> items = fetchFeed(source);
                int limit = Math.min(maxPerSource, items.size());
                all.addAll(items.subList(0, limit));
            } catch (Exception e) {
                log.warn("Không thể đọc RSS [{}]: {}", source.code(), e.getMessage());
            }
        }
        return all;
    }

    public List<RssItem> fetchFeed(RssSourceConfig source) throws Exception {
        URI uri = validateWhitelistedUri(source.url());
        byte[] raw = downloadWithCap(uri);
        return parseXml(raw, source);
    }

    public URI validateWhitelistedUri(String url) {
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("URL RSS không được rỗng");
        }
        URI uri = URI.create(url.trim());
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase(Locale.ROOT);
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase(Locale.ROOT);
        if (!"https".equals(scheme) || !ALLOWED_HOSTS.contains(host)) {
            throw new SecurityException("Host không nằm trong whitelist RSS: " + host);
        }
        return uri;
    }

    private byte[] downloadWithCap(URI uri) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(uri)
                .header("User-Agent", USER_AGENT)
                .header("Accept", "application/rss+xml, application/rdf+xml, application/atom+xml, application/xml, text/xml")
                .timeout(REQUEST_TIMEOUT)
                .GET()
                .build();

        HttpResponse<InputStream> response = httpClient.send(request, HttpResponse.BodyHandlers.ofInputStream());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("HTTP " + response.statusCode() + " từ " + uri.getHost());
        }

        try (InputStream in = response.body(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192];
            int total = 0;
            int read;
            while ((read = in.read(buf)) != -1) {
                total += read;
                if (total > MAX_RESPONSE_BYTES) {
                    throw new IOException("Phản hồi RSS vượt quá giới hạn " + MAX_RESPONSE_BYTES + " bytes");
                }
                out.write(buf, 0, read);
            }
            return out.toByteArray();
        }
    }

    /**
     * Parse XML hỗ trợ RSS 2.0, RDF 1.0 và Atom; tắt tuyệt đối DTD/XXE.
     */
    public List<RssItem> parseXml(byte[] rawBytes, RssSourceConfig source) throws Exception {
        if (rawBytes == null || rawBytes.length == 0) {
            return List.of();
        }
        if (rawBytes.length > MAX_RESPONSE_BYTES) {
            throw new IOException("XML vượt quá giới hạn dung lượng cho phép");
        }

        String xmlText = decodeXmlBytes(rawBytes, source.expectedCharset());
        // Chuẩn hóa bỏ khai báo encoding cũ (như Shift_JIS) sau khi đã decode sang Java String
        xmlText = XML_DECL_PATTERN.matcher(xmlText).replaceFirst("");

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setNamespaceAware(true);
        dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
        dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        dbf.setXIncludeAware(false);
        dbf.setExpandEntityReferences(false);

        DocumentBuilder builder = dbf.newDocumentBuilder();
        Document doc = builder.parse(new InputSource(new StringReader(xmlText)));

        List<RssItem> items = new ArrayList<>();
        // RSS 2.0 & RDF 1.0 dùng <item>; Atom dùng <entry>
        NodeList nodes = doc.getElementsByTagNameNS("*", "item");
        boolean isAtom = false;
        if (nodes.getLength() == 0) {
            nodes = doc.getElementsByTagNameNS("*", "entry");
            isAtom = true;
        }

        for (int i = 0; i < nodes.getLength(); i++) {
            Node node = nodes.item(i);
            if (!(node instanceof Element el)) continue;

            String title = getChildText(el, "title");
            String link = isAtom ? getAtomLink(el) : getChildText(el, "link");
            String desc = isAtom
                    ? firstNonBlank(getChildText(el, "summary"), getChildText(el, "content"))
                    : firstNonBlank(getChildText(el, "description"), getChildText(el, "encoded"));
            String dateStr = isAtom
                    ? firstNonBlank(getChildText(el, "updated"), getChildText(el, "published"))
                    : firstNonBlank(getChildText(el, "pubDate"), getChildText(el, "date"));

            if (title.isBlank() || link.isBlank()) continue;

            items.add(new RssItem(
                    source.code(),
                    source.licenseType(),
                    source.defaultCategory(),
                    cleanWhitespace(title),
                    cleanWhitespace(stripHtmlTags(desc)),
                    link.trim(),
                    parseDate(dateStr)
            ));
        }
        return items;
    }

    private String decodeXmlBytes(byte[] rawBytes, String fallbackCharset) {
        int probeLen = Math.min(rawBytes.length, 256);
        String header = new String(rawBytes, 0, probeLen, StandardCharsets.US_ASCII);
        Matcher m = XML_ENCODING_PATTERN.matcher(header);
        String encoding = m.find() ? m.group(1) : (fallbackCharset != null ? fallbackCharset : "UTF-8");
        if (encoding.equalsIgnoreCase("shift_jis") || encoding.equalsIgnoreCase("shift-jis") || encoding.equalsIgnoreCase("sjis")) {
            encoding = "MS932";
        }
        Charset cs = Charset.isSupported(encoding) ? Charset.forName(encoding) : StandardCharsets.UTF_8;
        return new String(rawBytes, cs);
    }

    private String getChildText(Element parent, String localName) {
        NodeList children = parent.getChildNodes();
        for (int i = 0; i < children.getLength(); i++) {
            Node n = children.item(i);
            if (n instanceof Element child) {
                String name = child.getLocalName() != null ? child.getLocalName() : child.getNodeName();
                if (localName.equalsIgnoreCase(name)) {
                    String txt = child.getTextContent();
                    if (txt != null && !txt.isBlank()) return txt.trim();
                }
            }
        }
        return "";
    }

    private String getAtomLink(Element entry) {
        NodeList children = entry.getChildNodes();
        for (int i = 0; i < children.getLength(); i++) {
            Node n = children.item(i);
            if (n instanceof Element child) {
                String name = child.getLocalName() != null ? child.getLocalName() : child.getNodeName();
                if ("link".equalsIgnoreCase(name)) {
                    String href = child.getAttribute("href");
                    if (href != null && !href.isBlank()) return href.trim();
                }
            }
        }
        return getChildText(entry, "id");
    }

    private OffsetDateTime parseDate(String raw) {
        if (raw == null || raw.isBlank()) return null;
        String s = raw.trim();
        try {
            return OffsetDateTime.parse(s, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        } catch (Exception ignored) {
        }
        try {
            return ZonedDateTime.parse(s, DateTimeFormatter.RFC_1123_DATE_TIME).toOffsetDateTime();
        } catch (Exception ignored) {
        }
        return null;
    }

    private String stripHtmlTags(String text) {
        if (text == null) return "";
        return text.replaceAll("<[^>]*>", " ");
    }

    private String cleanWhitespace(String text) {
        if (text == null) return "";
        return text.replaceAll("\\s+", " ").trim();
    }

    private String firstNonBlank(String a, String b) {
        return (a != null && !a.isBlank()) ? a : (b != null ? b : "");
    }
}
