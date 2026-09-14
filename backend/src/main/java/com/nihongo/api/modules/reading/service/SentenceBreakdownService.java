package com.nihongo.api.modules.reading.service;

import com.nihongo.api.modules.reading.dto.SentenceBreakdownDTO;

public interface SentenceBreakdownService {

    SentenceBreakdownDTO.BreakdownResponse analyzeSentenceBreakdown(SentenceBreakdownDTO.BreakdownRequest request);
}
