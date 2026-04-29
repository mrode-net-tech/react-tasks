import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { TYPEWRITER_SOUNDS } from '@/config/tasksConfig';
import { playBeep } from '@/lib/audio';

export interface TypewriterEntry {
  id: string;
  char: string;
}

export interface UseTypewriterResult {
  value: string;
  entries: TypewriterEntry[];
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

let entryCounter = 0;
const nextId = (): string => `c${++entryCounter}`;

export function useTypewriter(): UseTypewriterResult {
  const [value, setValue] = useState<string>('');
  const [entries, setEntries] = useState<TypewriterEntry[]>([]);
  const prevValueRef = useRef<string>('');

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Skip shortcuts so Cmd+C / Ctrl+V don't beep or insert literal letters.
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === 'Enter') {
      playBeep(TYPEWRITER_SOUNDS.enter);
    } else if (event.key === 'Backspace') {
      playBeep(TYPEWRITER_SOUNDS.backspace);
    } else if (event.key.length === 1) {
      playBeep(TYPEWRITER_SOUNDS.key);
    }
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    const prev = prevValueRef.current;
    prevValueRef.current = next;
    setValue(next);

    setEntries((current) => {
      if (next.length > prev.length && next.startsWith(prev)) {
        const added = [...next.slice(prev.length)].map((char) => ({
          id: nextId(),
          char,
        }));
        return [...current, ...added];
      }
      if (next.length < prev.length && prev.startsWith(next)) {
        return current.slice(0, next.length);
      }
      return [...next].map((char) => ({ id: nextId(), char }));
    });
  }, []);

  return { value, entries, onChange, onKeyDown };
}
