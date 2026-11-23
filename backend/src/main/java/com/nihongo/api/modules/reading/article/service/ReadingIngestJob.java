package com.nihongo.api.modules.reading.article.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Job định kỳ hằng ngày (mặc định 06:00) lấy RSS và sinh bài đọc mới ở trạng thái REVIEW.
 * Bật/tắt an toàn qua property reading.ingest.enabled (mặc định false để tránh tốn quota ngoài ý muốn).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ReadingIngestJob {

    private final ReadingIngestService ingestService;
    private final ReadingArticleRepository repository;

    @Value("${reading.ingest.enabled:false}")
    private boolean ingestEnabled;

    @Value("${reading.retention.days:7}")
    private int retentionDays;

    @Value("${reading.retention.cleanup-enabled:true}")
    private boolean cleanupEnabled;

    @Scheduled(cron = "${reading.ingest.cron:0 0 6 * * *}")
    public void runDailyIngest() {
        if (!ingestEnabled) {
            return;
        }
        log.info("Bắt đầu job ingest bài đọc định kỳ hằng ngày...");
        ingestService.runIngest(null, null);
    }

    /**
     * Dọn các bài báo cũ quá 7 ngày vào 03:30 sáng hằng ngày để trang báo luôn giữ tin mới nhất.
     */
    @Scheduled(cron = "0 30 3 * * *", zone = "Asia/Ho_Chi_Minh")
    public void cleanupExpiredArticles() {
        if (!cleanupEnabled) {
            return;
        }
        int deleted = repository.deleteExpiredArticles(retentionDays);
        if (deleted > 0) {
            log.info("Đã tự động dọn {} bài báo cũ quá {} ngày.", deleted, retentionDays);
        }
    }
}
