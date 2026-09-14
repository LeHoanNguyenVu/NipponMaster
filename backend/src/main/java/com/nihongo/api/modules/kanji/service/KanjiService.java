package com.nihongo.api.modules.kanji.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class KanjiService {

    private final KanjiRepository kanjiRepository;

    @Transactional(readOnly = true)
    @Cacheable(value = "kanjis", key = "'all:' + #pageable.pageNumber + ':' + #pageable.pageSize")
    public PageResponse<Kanji> getAll(Pageable pageable) {
        return PageResponse.from(kanjiRepository.findAll(pageable));
    }

    @Transactional(readOnly = true)
    public Kanji getById(Long id) {
        return kanjiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kanji", id));
    }

    @Transactional(readOnly = true)
    public Kanji getByCharacter(String character) {
        return kanjiRepository.findByCharacter(character)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Kanji: " + character));
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "kanjis", key = "'level:' + #level + ':' + #pageable.pageNumber + ':' + #pageable.pageSize")
    public PageResponse<Kanji> getByLevel(User.JlptLevel level, Pageable pageable) {
        return PageResponse.from(kanjiRepository.findByJlptLevel(level, pageable));
    }

    @Transactional(readOnly = true)
    public PageResponse<Kanji> search(String keyword, Pageable pageable) {
        return PageResponse.from(kanjiRepository.searchByKeyword(keyword, pageable));
    }

    @Transactional(readOnly = true)
    public PageResponse<Kanji> searchWithFilters(String keyword, User.JlptLevel level, Pageable pageable) {
        return PageResponse.from(kanjiRepository.searchWithFilters(keyword, level, pageable));
    }

    @Transactional
    @CacheEvict(value = "kanjis", allEntries = true)
    public Kanji create(Kanji kanji) {
        kanji.setId(null);
        return kanjiRepository.save(kanji);
    }

    @Transactional
    @CacheEvict(value = "kanjis", allEntries = true)
    public void delete(Long id) {
        Kanji existing = getById(id);
        kanjiRepository.delete(existing);
    }
}
