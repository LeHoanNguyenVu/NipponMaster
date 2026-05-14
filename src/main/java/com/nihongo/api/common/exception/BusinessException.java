package com.nihongo.api.common.exception;

/**
 * Exception tùy chỉnh cho các lỗi nghiệp vụ (business logic).
 * Ví dụ: "Email đã tồn tại", "Đề thi đã hết hạn", "Không đủ điểm để mở khóa"...
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
