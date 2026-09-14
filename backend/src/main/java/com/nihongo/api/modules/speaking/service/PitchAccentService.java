package com.nihongo.api.modules.speaking.service;

import com.nihongo.api.modules.speaking.dto.PitchAccentDTO;

public interface PitchAccentService {

    PitchAccentDTO.PitchAccentResponse analyzePitchAccent(String text);

    PitchAccentDTO.EvaluatePitchResponse evaluatePitchRecording(PitchAccentDTO.EvaluatePitchRequest request);
}
