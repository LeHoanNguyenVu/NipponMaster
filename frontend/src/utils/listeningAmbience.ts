/**
 * listeningAmbience.ts — Web Audio Ambience & Japanese Speech Synthesis Engine
 * Synthesizes realistic 3D Japanese background ambience soundscapes without any external audio files.
 */

class ListeningAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentInterval: ReturnType<typeof setInterval> | null = null;
  private currentAmbienceType: string | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getCurrentAmbienceType(): string | null {
    return this.currentAmbienceType;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    this.isPlaying = false;
    this.currentAmbienceType = null;
  }

  public play(type: 'KONBINI' | 'RAMEN' | 'STATION' | 'CLINIC' | 'OFFICE' | 'CAFE' | 'STREET') {
    this.stop();
    this.currentAmbienceType = type;
    this.isPlaying = true;
    this.getContext();

    switch (type) {
      case 'KONBINI':
        this.playKonbiniChime();
        this.currentInterval = setInterval(() => {
          if (this.isPlaying && Math.random() > 0.4) {
            this.playKonbiniChime();
          }
        }, 12000);
        break;

      case 'STATION':
        this.playStationChime();
        this.currentInterval = setInterval(() => {
          if (this.isPlaying) {
            this.playStationChime();
          }
        }, 14000);
        break;

      case 'CLINIC':
        this.playHospitalChime();
        this.currentInterval = setInterval(() => {
          if (this.isPlaying) {
            this.playHospitalChime();
          }
        }, 15000);
        break;

      case 'RAMEN':
      case 'CAFE':
      case 'OFFICE':
      case 'STREET':
      default:
        this.playGentleMurmur();
        this.currentInterval = setInterval(() => {
          if (this.isPlaying) {
            this.playGentleMurmur();
          }
        }, 10000);
        break;
    }
  }

  /**
   * Iconic Japanese Konbini Door Chime (FamilyMart style melodic notes)
   * Notes: D5 -> B4 -> G4 -> A4 -> D5 ...
   */
  private playKonbiniChime() {
    try {
      const ctx = this.getContext();
      if (!this.masterGain) return;
      const now = ctx.currentTime;

      const notes = [
        { freq: 587.33, start: 0.0, dur: 0.25 },  // D5
        { freq: 493.88, start: 0.28, dur: 0.25 }, // B4
        { freq: 392.00, start: 0.56, dur: 0.35 }, // G4
        { freq: 440.00, start: 0.95, dur: 0.35 }, // A4
        { freq: 587.33, start: 1.35, dur: 0.45 }, // D5
        { freq: 440.00, start: 1.85, dur: 0.4 },  // A4
        { freq: 392.00, start: 2.30, dur: 0.6 },  // G4
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.start);

        g.gain.setValueAtTime(0, now + n.start);
        g.gain.linearRampToValueAtTime(0.18, now + n.start + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } catch (e) {
      // Audio fallback
    }
  }

  /**
   * Japanese Station Melodic Departure Chime
   */
  private playStationChime() {
    try {
      const ctx = this.getContext();
      if (!this.masterGain) return;
      const now = ctx.currentTime;

      const notes = [
        { freq: 523.25, start: 0.0, dur: 0.3 },  // C5
        { freq: 659.25, start: 0.35, dur: 0.3 }, // E5
        { freq: 783.99, start: 0.70, dur: 0.4 }, // G5
        { freq: 1046.50, start: 1.15, dur: 0.6 } // C6
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, now + n.start);

        g.gain.setValueAtTime(0, now + n.start);
        g.gain.linearRampToValueAtTime(0.14, now + n.start + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } catch (e) {
      // Audio fallback
    }
  }

  /**
   * Hospital / Clinic Gentle Call Ding
   */
  private playHospitalChime() {
    try {
      const ctx = this.getContext();
      if (!this.masterGain) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5

      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {
      // Audio fallback
    }
  }

  /**
   * Gentle Cafe / Ramen Shop Warm Atmosphere Murmur
   */
  private playGentleMurmur() {
    try {
      const ctx = this.getContext();
      if (!this.masterGain) return;
      const now = ctx.currentTime;

      // Filtered pink-like soft acoustic wave
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 0.11;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.8);
      gain.gain.linearRampToValueAtTime(0, now + 2.0);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 2.0);
    } catch (e) {
      // Audio fallback
    }
  }
}

export const ambienceEngine = new ListeningAmbienceEngine();

/**
 * Text-to-Speech Japanese Voice Player
 */
export function speakJapaneseVoice(
  text: string,
  rate: number = 1.0,
  pitch: number = 1.0,
  onEnd?: () => void
): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return null;
  }

  window.speechSynthesis.cancel();

  // Strip furigana bracket markings for pure speech if present: "何[なに]" -> "何"
  const cleanText = text.replace(/\[.*?\]/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = pitch;

  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find((v) => v.lang.includes('ja') || v.lang.includes('JP') || v.name.toLowerCase().includes('japanese'));
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}
