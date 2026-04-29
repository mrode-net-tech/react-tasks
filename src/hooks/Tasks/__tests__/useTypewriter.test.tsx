import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useTypewriter } from '../useTypewriter';
import * as audio from '@/lib/audio';
import { TYPEWRITER_SOUNDS } from '@/config/tasksConfig';

const change = (value: string): ChangeEvent<HTMLTextAreaElement> =>
  ({
    target: { value } as HTMLTextAreaElement,
  }) as ChangeEvent<HTMLTextAreaElement>;

const keyDown = (
  init: Partial<KeyboardEvent<HTMLTextAreaElement>>,
): KeyboardEvent<HTMLTextAreaElement> =>
  ({
    key: '',
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    ...init,
  }) as KeyboardEvent<HTMLTextAreaElement>;

describe('useTypewriter', () => {
  it('starts with empty value and no entries', () => {
    const { result } = renderHook(() => useTypewriter());

    expect(result.current.value).toBe('');
    expect(result.current.entries).toEqual([]);
  });

  it('appends entries when characters are typed', () => {
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onChange(change('h')));
    act(() => result.current.onChange(change('hi')));

    expect(result.current.value).toBe('hi');
    expect(result.current.entries.map((e) => e.char)).toEqual(['h', 'i']);
  });

  it('preserves entry ids for unchanged characters when appending', () => {
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onChange(change('a')));
    const firstId = result.current.entries[0]?.id;

    act(() => result.current.onChange(change('ab')));

    expect(result.current.entries[0]?.id).toBe(firstId);
    expect(result.current.entries).toHaveLength(2);
  });

  it('removes trailing entries on backspace-style edits', () => {
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onChange(change('abc')));
    const [a, b] = result.current.entries;

    act(() => result.current.onChange(change('ab')));

    expect(result.current.entries).toEqual([a, b]);
  });

  it('rebuilds entries on a middle edit (paste / replace)', () => {
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onChange(change('abc')));
    const originalIds = result.current.entries.map((e) => e.id);

    act(() => result.current.onChange(change('axc')));

    expect(result.current.value).toBe('axc');
    expect(result.current.entries.map((e) => e.char)).toEqual(['a', 'x', 'c']);
    expect(result.current.entries.map((e) => e.id)).not.toEqual(originalIds);
  });

  it('plays the key sound on a printable character', () => {
    const spy = vi.spyOn(audio, 'playBeep').mockImplementation(() => {});
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onKeyDown(keyDown({ key: 'a' })));

    expect(spy).toHaveBeenCalledWith(TYPEWRITER_SOUNDS.key);
    spy.mockRestore();
  });

  it('plays the enter sound on Enter', () => {
    const spy = vi.spyOn(audio, 'playBeep').mockImplementation(() => {});
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onKeyDown(keyDown({ key: 'Enter' })));

    expect(spy).toHaveBeenCalledWith(TYPEWRITER_SOUNDS.enter);
    spy.mockRestore();
  });

  it('plays the backspace sound on Backspace', () => {
    const spy = vi.spyOn(audio, 'playBeep').mockImplementation(() => {});
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onKeyDown(keyDown({ key: 'Backspace' })));

    expect(spy).toHaveBeenCalledWith(TYPEWRITER_SOUNDS.backspace);
    spy.mockRestore();
  });

  it('ignores modifier-key shortcuts (no beep on Ctrl+C / Cmd+V)', () => {
    const spy = vi.spyOn(audio, 'playBeep').mockImplementation(() => {});
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onKeyDown(keyDown({ key: 'c', ctrlKey: true })));
    act(() => result.current.onKeyDown(keyDown({ key: 'v', metaKey: true })));
    act(() => result.current.onKeyDown(keyDown({ key: 'a', altKey: true })));

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not beep on non-printable keys like Shift or ArrowLeft', () => {
    const spy = vi.spyOn(audio, 'playBeep').mockImplementation(() => {});
    const { result } = renderHook(() => useTypewriter());

    act(() => result.current.onKeyDown(keyDown({ key: 'Shift' })));
    act(() => result.current.onKeyDown(keyDown({ key: 'ArrowLeft' })));

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
