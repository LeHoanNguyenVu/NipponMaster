// High-Performance Instant Japanese Audio Engine with True Volume Scaling (0ms latency, zero network dependency)

/**
 * Phát âm tiếng Nhật tức thì (0ms delay) với mức âm lượng tùy chỉnh (50% - 250%).
 * Không phụ thuộc vào proxy server hay mạng ngoài để đảm bảo phản hồi ngay lập tức khi click.
 */
export const playBoostedJapaneseAudio = (
  text: string,
  volumePercent: number = 200,
  e?: React.MouseEvent
): void => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (!text || text.trim() === '') return;

  // Lọc sạch dấu chấm giữa '・', dấu phẩy, khoảng trắng để SpeechSynthesis đọc chuẩn 100%
  const cleanText = text
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[・·•]/g, '')
    .split(/[,/、]/)[0]
    .trim();

  if (!('speechSynthesis' in window)) {
    console.warn('Trình duyệt không hỗ trợ Web Speech API');
    return;
  }

  // Dừng ngay lập tức âm thanh đang phát trước đó để không bị dồn hàng đợi (0ms latency)
  window.speechSynthesis.cancel();

  const speakNow = () => {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';

    // 1. Ánh xạ âm lượng thực tế (0.20 -> 1.0) theo phần trăm volumePercent (50% -> 250%)
    // 50%  -> 0.20 (nhỏ dịu)
    // 100% -> 0.45 (chuẩn vừa)
    // 150% -> 0.70 (to rõ)
    // 200% -> 0.88 (rất to)
    // 250% -> 1.00 (cực đại)
    const clampedPercent = Math.max(50, Math.min(250, volumePercent));
    const normalizedVol = 0.20 + ((clampedPercent - 50) / 200) * 0.80;
    utterance.volume = Number(normalizedVol.toFixed(2));

    // 2. Cân bằng âm sắc (Pitch & Rate) đồng đều cho mọi thẻ:
    // Với chữ cái đơn âm hoặc từ ngắn (<= 2 ký tự như す, キ, あ), tốc độ được hãm chậm hơn để âm vang tròn trịa
    const isSingleChar = cleanText.length <= 2;
    utterance.rate = isSingleChar ? 0.78 : 0.85;

    // Pitch tăng nhẹ theo âm lượng để tạo cảm giác vang và sáng tiếng
    utterance.pitch = 1.0 + ((clampedPercent - 50) / 200) * 0.25;

    // 3. Ưu tiên chọn giọng tiếng Nhật tự nhiên tốt nhất trên máy
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = 
      voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP') ||
      voices.find(v => v.lang.toLowerCase().includes('ja')) ||
      voices.find(v => v.name.toLowerCase().includes('japanese') || v.name.toLowerCase().includes('japan'));

    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    speakNow();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', speakNow, { once: true });
  }
};
