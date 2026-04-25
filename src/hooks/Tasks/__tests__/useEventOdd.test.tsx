import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useEvenOdd } from '../useEvenOdd';
import { INITIAL_NUMBER, type NumberType } from '@/config/tasksConfig';

describe('useEvenOdd', () => {
  it('starts at INITIAL_NUMBER', () => {
    const { result } = renderHook(() => useEvenOdd());
    expect(result.current.number).toBe(INITIAL_NUMBER);
  });

  it('increase() increments by 1', () => {
    const { result } = renderHook(() => useEvenOdd());
    act(() => result.current.increase());
    expect(result.current.number).toBe(INITIAL_NUMBER + 1);
  });

  it('handles multiple sequential updates in one batch', () => {
    const { result } = renderHook(() => useEvenOdd());
    act(() => {
      result.current.increase();
      result.current.increase();
      result.current.increase();
    });
    expect(result.current.number).toBe(INITIAL_NUMBER + 3);
  });

  it('returns false for any type at INITIAL_NUMBER (initial state guard)', () => {
    const { result } = renderHook(() => useEvenOdd());
    const types: NumberType[] = ['even', 'odd', 'mod-3', 'mod-5', 'mod-15'];
    for (const t of types) {
      expect(result.current.isOfType(t)).toBe(false);
    }
  });

  it.each<[NumberType, number, boolean]>([
    ['odd', 1, true],
    ['even', 1, false],
    ['mod-3', 1, false],
    ['mod-5', 1, false],
    ['mod-15', 1, false],

    ['odd', 2, false],
    ['even', 2, true],

    ['mod-3', 3, true],
    ['mod-5', 3, false],

    ['mod-5', 5, true],
    ['mod-3', 5, false],

    ['mod-3', 15, true],
    ['mod-5', 15, true],
    ['mod-15', 15, true],
    ['odd', 15, true],
    ['even', 15, false],
  ])('returns %s correctly for %i (type=%s)', (type, steps, expected) => {
    const { result } = renderHook(() => useEvenOdd());
    act(() => {
      for (let i = 0; i < steps; i++) result.current.increase();
    });
    expect(result.current.isOfType(type)).toBe(expected);
  });
});
