package com.nihongo.api.modules.reading.article.service;

import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.RssItem;
import com.nihongo.api.modules.reading.article.dto.ReadingArticleDtos.RssSourceConfig;
import org.junit.jupiter.api.Test;
import org.xml.sax.SAXParseException;

import java.nio.charset.Charset;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ReadingRssClientTest {

    private final ReadingRssClient client = new ReadingRssClient();

    @Test
    void parseXml_rss2Sample_parsesTitleLinkDescriptionAndDate() throws Exception {
        byte[] xml = getClass().getResourceAsStream("/reading/sample_rss2.xml").readAllBytes();
        RssSourceConfig src = ReadingRssClient.ALL_SOURCES.get("NHK_TOP");

        List<RssItem> items = client.parseXml(xml, src);

        assertEquals(1, items.size());
        RssItem it = items.get(0);
        assertEquals("NHK_TOP", it.sourceCode());
        assertEquals("FACTS_ONLY", it.sourceLicense());
        assertEquals("東京都内で新しい省エネ電車が運行開始", it.title());
        assertTrue(it.description().contains("20％削減"));
        assertEquals("https://www.nhk.or.jp/news/html/20261120/k10014999991000.html", it.link());
        assertNotNull(it.publishedAt());
    }

    @Test
    void parseXml_rdfGovOnline_parsesItemsWithPdlLicense() throws Exception {
        byte[] xml = getClass().getResourceAsStream("/reading/sample_rdf_gov.xml").readAllBytes();
        RssSourceConfig src = ReadingRssClient.ALL_SOURCES.get("GOV_ONLINE");

        List<RssItem> items = client.parseXml(xml, src);

        assertEquals(1, items.size());
        assertEquals("PDL_1_0", items.get(0).sourceLicense());
        assertEquals("冬の省エネ対策 家庭でできる工夫", items.get(0).title());
        assertNotNull(items.get(0).publishedAt());
    }

    @Test
    void parseXml_shiftJisFeed_decodesJapaneseCleanly() throws Exception {
        String sjisXml = """
                <?xml version="1.0" encoding="Shift_JIS"?>
                <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://purl.org/rss/1.0/">
                  <item>
                    <title>旅行・観光消費動向調査の速報</title>
                    <link>https://www.mlit.go.jp/kankocho/news01.html</link>
                    <description>訪日外国人旅行者の消費動向を公表しました。</description>
                  </item>
                </rdf:RDF>
                """;
        byte[] raw = sjisXml.getBytes(Charset.forName("MS932"));
        RssSourceConfig src = ReadingRssClient.ALL_SOURCES.get("KANKOCHO");

        List<RssItem> items = client.parseXml(raw, src);

        assertEquals(1, items.size());
        assertEquals("旅行・観光消費動向調査の速報", items.get(0).title());
    }

    @Test
    void parseXml_maliciousXxeDoctype_isBlocked() throws Exception {
        byte[] xxe = getClass().getResourceAsStream("/reading/malicious_xxe.xml").readAllBytes();
        RssSourceConfig src = ReadingRssClient.ALL_SOURCES.get("NHK_TOP");

        assertThrows(SAXParseException.class, () -> client.parseXml(xxe, src));
    }

    @Test
    void validateWhitelistedUri_blocksNonWhitelistedHostAndHttp() {
        assertDoesNotThrow(() -> client.validateWhitelistedUri("https://www.nhk.or.jp/rss/news/cat0.xml"));
        assertDoesNotThrow(() -> client.validateWhitelistedUri("https://www.gov-online.go.jp/rss/index.rdf"));

        assertThrows(SecurityException.class, () -> client.validateWhitelistedUri("https://news.yahoo.co.jp/rss/topics/top-picks.xml"));
        assertThrows(SecurityException.class, () -> client.validateWhitelistedUri("http://169.254.169.254/latest/meta-data/"));
        assertThrows(SecurityException.class, () -> client.validateWhitelistedUri("http://www.nhk.or.jp/rss/news/cat0.xml"));
    }
}
