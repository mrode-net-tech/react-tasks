import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCarousel } from '../useCarousel';
import { CAROUSEL_IMAGES } from '@/config/tasksConfig';

describe('useCarousel', () => {
  it('starts on the first image', () => {
    const { result } = renderHook(() => useCarousel());
    expect(result.current.index).toBe(0);
    expect(result.current.number).toBe(1);
    expect(result.current.image).toEqual(CAROUSEL_IMAGES[0]);
  });

  it('reports the total number of images', () => {
    const { result } = renderHook(() => useCarousel());
    expect(result.current.total).toBe(CAROUSEL_IMAGES.length);
  });

  it('advances by one on next', () => {
    const { result } = renderHook(() => useCarousel());
    act(() => result.current.next());
    expect(result.current.index).toBe(1);
    expect(result.current.image).toEqual(CAROUSEL_IMAGES[1]);
  });

  it('wraps from last to first on next', () => {
    const { result } = renderHook(() => useCarousel());
    for (let i = 0; i < CAROUSEL_IMAGES.length; i++) {
      act(() => result.current.next());
    }
    expect(result.current.index).toBe(0);
    expect(result.current.image).toEqual(CAROUSEL_IMAGES[0]);
  });

  it('wraps from first to last on prev', () => {
    const { result } = renderHook(() => useCarousel());
    act(() => result.current.prev());
    expect(result.current.index).toBe(CAROUSEL_IMAGES.length - 1);
    expect(result.current.image).toEqual(
      CAROUSEL_IMAGES[CAROUSEL_IMAGES.length - 1],
    );
  });

  it('decrements by one on prev when not at the start', () => {
    const { result } = renderHook(() => useCarousel());
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.prev());
    expect(result.current.index).toBe(1);
  });
});
