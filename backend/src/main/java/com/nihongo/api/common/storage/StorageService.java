package com.nihongo.api.common.storage;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

/**
 * Interface cho dịch vụ lưu trữ media (Supabase Storage / Cloud Storage).
 * Phục vụ upload ảnh, audio, video cho Kanji, Listening, Reading, User Avatar,...
 */
public interface StorageService {

    /**
     * Upload một file nhị phân lên bucket lưu trữ công khai.
     *
     * @param bucket Tên bucket (ví dụ: kanji-assets, listening-audios, video-lessons)
     * @param path Đường dẫn file trong bucket (ví dụ: n5/illustrations/chap1_1.webp)
     * @param data Dữ liệu byte của file
     * @param contentType Loại MIME của file (ví dụ: image/webp, audio/mpeg, video/mp4)
     * @return URL công khai (Public CDN URL) của file
     */
    String uploadPublicFile(String bucket, String path, byte[] data, String contentType) throws IOException;

    /**
     * Upload một Spring MultipartFile lên bucket lưu trữ công khai.
     */
    String uploadPublicFile(String bucket, String path, MultipartFile file) throws IOException;

    /**
     * Xóa một file khỏi bucket lưu trữ.
     */
    void deleteFile(String bucket, String path) throws IOException;

    /**
     * Lấy URL công khai của một file trong bucket.
     */
    String getPublicUrl(String bucket, String path);
}
