package com.nihongo.api.common.exception;

import jakarta.persistence.EntityNotFoundException;

/**
 * Exception khi không tìm thấy tài nguyên.
 * Ví dụ: "Không tìm thấy từ vựng với id = 5", "Không tìm thấy người dùng"...
 */
public class ResourceNotFoundException extends EntityNotFoundException {

    public ResourceNotFoundException(String resourceName, Long id) {
        super(String.format("Không tìm thấy %s với id = %d", resourceName, id));
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
