import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCounterControls } from '../useCounterControls';
import { INITIAL_COUNTER } from '@/config/tasksConfig';

describe('useCounterControls', () => {
  it('starts at INITIAL_COUNTER', () => {
    const { result } = renderHook(() => useCounterControls());
    expect(result.current.count).toBe(INITIAL_COUNTER);
  });

  it('increase() increments by 1', () => {
    const { result } = renderHook(() => useCounterControls());
    act(() => result.current.increase());
    expect(result.current.count).toBe(INITIAL_COUNTER + 1);
  });

  it('decrease() decrements by 1', () => {
    const { result } = renderHook(() => useCounterControls());
    act(() => result.current.decrease());
    expect(result.current.count).toBe(INITIAL_COUNTER - 1);
  });

  it('handles multiple sequential updates in one batch', () => {
    const { result } = renderHook(() => useCounterControls());
    act(() => {
      result.current.increase();
      result.current.increase();
      result.current.increase();
    });
    expect(result.current.count).toBe(INITIAL_COUNTER + 3);
  });

  it('reset() returns count to INITIAL_COUNTER', () => {
    const { result } = renderHook(() => useCounterControls());
    act(() => {
      result.current.increase();
      result.current.increase();
    });
    act(() => result.current.reset());
    expect(result.current.count).toBe(INITIAL_COUNTER);
  });

  it('keeps stable function references between renders', () => {
    const { result, rerender } = renderHook(() => useCounterControls());
    const first = {
      reset: result.current.reset,
      increase: result.current.increase,
      decrease: result.current.decrease,
    };
    rerender();
    expect(result.current.reset).toBe(first.reset);
    expect(result.current.increase).toBe(first.increase);
    expect(result.current.decrease).toBe(first.decrease);
  });
});
