export const INITIAL_COUNTER: number = 0;

export const INITIAL_NUMBER: number = 0;

export type NumberType = 'even' | 'odd' | 'mod-3' | 'mod-5' | 'mod-15';

export const INITIAL_BOX_POSITION: BoxPosition = 'left';

export type BoxPosition = 'left' | 'right';

export const CURSOR_DELAY_MS: number = 500;

export type TypewriterSound = 'key' | 'enter' | 'backspace';

export const TYPEWRITER_SOUNDS: Record<
  TypewriterSound,
  { freq: number; duration: number }
> = {
  key: { freq: 600, duration: 0.05 },
  enter: { freq: 300, duration: 0.15 },
  backspace: { freq: 200, duration: 0.08 },
};
