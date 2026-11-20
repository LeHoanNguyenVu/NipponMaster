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

    @Value("${reading.ingest.enabled:false}")
    private boolean ingestEnabled;

    @Scheduled(cron = "${reading.ingest.cron:0 0 6 * * *}")
    public void runDailyIngest() {
        if (!ingestEnabled) {
            return;
        }
        log.info("Bắt đầu job ingest bài đọc định kỳ hằng ngày...");
        ingestService.runIngest(null, null);
    }
}
