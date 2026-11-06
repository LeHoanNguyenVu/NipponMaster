import { useState, useEffect, useCallback } from 'react';

interface UseKanjiSpeechProps {
  selectedChapterId: number;
  selectedLevel: string;
  activeTab: string;
  viewMode: string;
}

export function useKanjiSpeech({
  selectedChapterId,
  selectedLevel,
  activeTab,
  viewMode,
}: UseKanjiSpeechProps) {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [prevContext, setPrevContext] = useState(
    () => `${selectedChapterId}:${selectedLevel}:${activeTab}:${viewMode}`
  );

  // Tự động reset audio đang phát khi chuyển ngữ cảnh học
  const currentContext = `${selectedChapterId}:${selectedLevel}:${activeTab}:${viewMode}`;
  if (prevContext !== currentContext) {
    setPrevContext(currentContext);
    if (playingAudioId !== null) {
      setPlayingAudioId(null);
    }
  }

  // Dập tắt toàn bộ âm thanh TTS khi chuyển chương, chuyển cấp độ N5/N4/N3, đổi tab hoặc đổi chế độ xem
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [selectedChapterId, selectedLevel, activeTab, viewMode]);

  // Dập tắt toàn bộ âm thanh TTS khi rời khỏi màn hình Kanji sang module khác
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // TTS Pronunciation helper (Web Speech API)
  const speakJapanese = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      const clean = text.replace(/[[\]]/g, '').replace(/Kanji đúng là:.*$/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Phát âm thanh tiếng Nhật chuẩn cho lời thoại có ô đục lỗ
  const handlePlayDialogueAudio = useCallback(
    (
      audioId: string,
      utt: { audio?: string; text?: string },
      blanks?: Array<{ id: number; hiragana?: string; targetWord?: string; answer?: string }>
    ) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      if (playingAudioId === audioId) {
        window.speechSynthesis.cancel();
        setPlayingAudioId(null);
        return;
      }

      window.speechSynthesis.cancel();
      setPlayingAudioId(audioId);

      let speakText = utt.audio || utt.text || '';
      if (!utt.audio && blanks && blanks.length > 0) {
        speakText = speakText.replace(/\[blank:(\d+)\]/g, (_match: string, idStr: string) => {
          const bId = parseInt(idStr, 10);
          const b = blanks.find((item) => item.id === bId);
          if (!b) return '';
          return b.hiragana || b.targetWord || b.answer || '';
        });
      }
      speakText = speakText.replace(/[[\]]/g, '').replace(/[\n\r]+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;

      utterance.onend = () => {
        setPlayingAudioId(null);
      };
      utterance.onerror = () => {
        setPlayingAudioId(null);
      };

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang.startsWith('ja') || v.lang.includes('JP'));
      if (jaVoice) utterance.voice = jaVoice;
      window.speechSynthesis.speak(utterance);
    },
    [playingAudioId]
  );

  return {
    playingAudioId,
    speakJapanese,
    handlePlayDialogueAudio,
  };
}
