import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CURSOR_DELAY_MS } from '@/config/tasksConfig';
import { useCursorFollower } from '../useCursorFollower';

describe('useCursorFollower', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts not moving and exposes a ref', () => {
    const { result } = renderHook(() => useCursorFollower());

    expect(result.current.isMoving).toBe(false);
    expect(result.current.cursorRef).toEqual({ current: null });
  });

  it('flips isMoving to true on mousemove and back to false after the delay', async () => {
    const { result } = renderHook(() => useCursorFollower());

    await act(async () => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 10, clientY: 20 }),
      );
    });
    expect(result.current.isMoving).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(CURSOR_DELAY_MS + 50);
    });
    expect(result.current.isMoving).toBe(false);
  });

  it('debounces the stop: a second move resets the timer', async () => {
    const { result } = renderHook(() => useCursorFollower());

    await act(async () => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: 0 }),
      );
    });

    // Halfway through the delay, move again — the previous timer should be cleared.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(CURSOR_DELAY_MS / 2);
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 1, clientY: 1 }),
      );
    });

    // Advance past the original deadline, but not past the new one.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(CURSOR_DELAY_MS / 2 + 10);
    });
    expect(result.current.isMoving).toBe(true);
  });

  it('writes the cursor position to the ref element', async () => {
    const { result } = renderHook(() => useCursorFollower());

    // Manually attach a node to the ref (the hook normally gets this from JSX).
    const el = document.createElement('div');
    result.current.cursorRef.current = el;

    await act(async () => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 100, clientY: 200 }),
      );
    });

    expect(el.style.transform).toBe(
      'translate(calc(100px - 50%), calc(200px - 50%))',
    );
  });

  it('removes the mousemove listener on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useCursorFollower());
    unmount();

    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    // Same handler reference on both sides:
    const handler = addSpy.mock.calls.find(
      ([type]) => type === 'mousemove',
    )?.[1];
    expect(removeSpy).toHaveBeenCalledWith('mousemove', handler);
  });
});
