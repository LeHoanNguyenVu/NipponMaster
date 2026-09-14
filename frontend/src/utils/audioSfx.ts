/**
 * audioSfx.ts — Web Audio API Sound Effects Engine
 * Pure browser-synthesized audio (zero mp3/ogg file dependencies).
 * Provides pleasant, lightweight sound feedback for quiz interactions.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume context if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a gentle dual-tone chime when the user answers correctly.
 * Two quick ascending notes: C5 (523Hz) → E5 (659Hz)
 */
export function playCorrectSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    // Note 1: C5
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.connect(gainNode);
    osc1.start(now);
    osc1.stop(now + 0.2);

    // Note 2: E5 (slightly delayed)
    const gainNode2 = ctx.createGain();
    gainNode2.connect(ctx.destination);
    gainNode2.gain.setValueAtTime(0.15, now + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.1);
    osc2.connect(gainNode2);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.45);
  } catch {
    // Silently fail if audio is not available
  }
}

/**
 * Play a soft low buzz when the user answers incorrectly.
 * Short descending tone: A3 (220Hz) → F3 (175Hz)
 */
export function playWrongSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(175, now + 0.25);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    // Silently fail
  }
}

/**
 * Play a ceremonial triumph fanfare for graduation / victory moments.
 * Ascending arpeggio chord: C5 → E5 → G5 → C6
 */
export function playFanfareSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const delays = [0, 0.12, 0.24, 0.36];

    notes.forEach((freq, i) => {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      const startTime = now + delays[i];
      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain);
      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });

    // Sustain chord on top
    const chordGain = ctx.createGain();
    chordGain.connect(ctx.destination);
    chordGain.gain.setValueAtTime(0.08, now + 0.48);
    chordGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    [523.25, 659.25, 783.99].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.48);
      osc.connect(chordGain);
      osc.start(now + 0.48);
      osc.stop(now + 1.15);
    });
  } catch {
    // Silently fail
  }
}

/**
 * Play a quick countdown tick sound for battle timer.
 */
export function playTickSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Silently fail
  }
}

/**
 * Play a battle victory triumph sound (longer than fanfare).
 */
export function playVictorySound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Heroic ascending phrase
    const phrase = [
      { freq: 392, delay: 0 },     // G4
      { freq: 523.25, delay: 0.15 }, // C5
      { freq: 659.25, delay: 0.3 },  // E5
      { freq: 783.99, delay: 0.45 }, // G5
      { freq: 1046.5, delay: 0.65 }, // C6 (hold)
    ];

    phrase.forEach(({ freq, delay }) => {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      const t = now + delay;
      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.45);
    });
  } catch {
    // Silently fail
  }
}

/**
 * Play a defeat / loss sound (descending sad tone).
 */
export function playDefeatSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(392, now);       // G4
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);  // A3
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.65);
  } catch {
    // Silently fail
  }
}
