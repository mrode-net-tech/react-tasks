export interface SoundPreset {
  freq: number;
  duration: number;
}

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') {
    return null;
  }
  sharedCtx ??= new AudioContext();
  return sharedCtx;
}

export function playBeep({ freq, duration }: SoundPreset): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Browsers start contexts suspended until a user gesture; resuming inside
  // a keydown handler is allowed and a no-op when already running.
  void ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}
