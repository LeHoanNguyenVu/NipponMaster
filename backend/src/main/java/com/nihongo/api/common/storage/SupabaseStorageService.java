package com.nihongo.api.common.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Service tích hợp Supabase Storage (S3-compatible Object Storage).
 * Hỗ trợ lưu trữ ảnh, video, audio trên Cloud chuẩn Production.
 */
@Service
public class SupabaseStorageService implements StorageService {

    private static final Logger log = LoggerFactory.getLogger(SupabaseStorageService.class);

    @Value("${supabase.url:https://bxqwarbeocbsfjieqbsq.supabase.co}")
    private String supabaseUrl;

    @Value("${supabase.key:}")
    private String supabaseKey;

    @Value("${supabase.storage.bucket:kanji-assets}")
    private String defaultBucket;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    @Override
    public String uploadPublicFile(String bucket, String path, byte[] data, String contentType) throws IOException {
        String targetBucket = (bucket != null && !bucket.isBlank()) ? bucket : defaultBucket;
        String normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        String encodedPath = encodePath(normalizedPath);
        
        // Supabase Storage Endpoint: POST /storage/v1/object/{bucket}/{wildcard}
        String uploadUrl = String.format("%s/storage/v1/object/%s/%s", 
                cleanUrl(supabaseUrl), targetBucket, encodedPath);


        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .header("Authorization", "Bearer " + supabaseKey)
                .header("apikey", supabaseKey)
                .header("Content-Type", (contentType != null && !contentType.isBlank()) ? contentType : "application/octet-stream")
                .header("x-upsert", "true")
                .timeout(Duration.ofSeconds(60))
                .POST(HttpRequest.BodyPublishers.ofByteArray(data))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Successfully uploaded to Supabase Storage: {}/{}", targetBucket, normalizedPath);
                return getPublicUrl(targetBucket, normalizedPath);
            } else {
                log.error("Failed to upload to Supabase Storage. Status: {}, Response: {}", response.statusCode(), response.body());
                throw new IOException("Supabase Storage upload failed with status " + response.statusCode() + ": " + response.body());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Upload request interrupted", e);
        }
    }

    @Override
    public String uploadPublicFile(String bucket, String path, MultipartFile file) throws IOException {
        return uploadPublicFile(bucket, path, file.getBytes(), file.getContentType());
    }

    @Override
    public void deleteFile(String bucket, String path) throws IOException {
        String targetBucket = (bucket != null && !bucket.isBlank()) ? bucket : defaultBucket;
        String normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        String encodedPath = encodePath(normalizedPath);

        String deleteUrl = String.format("%s/storage/v1/object/%s/%s",
                cleanUrl(supabaseUrl), targetBucket, encodedPath);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(deleteUrl))
                .header("Authorization", "Bearer " + supabaseKey)
                .header("apikey", supabaseKey)
                .timeout(Duration.ofSeconds(30))
                .DELETE()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Successfully deleted from Supabase Storage: {}/{}", targetBucket, normalizedPath);
            } else {
                log.warn("Supabase Storage delete returned status {}: {}", response.statusCode(), response.body());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Delete request interrupted", e);
        }
    }

    @Override
    public String getPublicUrl(String bucket, String path) {
        String targetBucket = (bucket != null && !bucket.isBlank()) ? bucket : defaultBucket;
        String normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        String encodedPath = encodePath(normalizedPath);
        return String.format("%s/storage/v1/object/public/%s/%s", 
                cleanUrl(supabaseUrl), targetBucket, encodedPath);
    }

    private String encodePath(String path) {
        if (path == null) return "";
        String[] parts = path.split("/");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            if (i > 0) sb.append("/");
            sb.append(URLEncoder.encode(parts[i], StandardCharsets.UTF_8).replace("+", "%20"));
        }
        return sb.toString();
    }

    private String cleanUrl(String url) {
        if (url == null) return "";
        return url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
    }
}

