import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { INITIAL_BOX_POSITION } from '@/config/tasksConfig';
import { useMoveBox } from '../useMoveBox';

describe('useMoveBox', () => {
  it('starts at INITIAL_BOX_POSITION', () => {
    const { result } = renderHook(() => useMoveBox());

    expect(result.current.position).toBe(INITIAL_BOX_POSITION);
  });

  it('toggles between left and right', () => {
    const { result } = renderHook(() => useMoveBox());

    act(() => result.current.move());
    expect(result.current.position).toBe('right');

    act(() => result.current.move());
    expect(result.current.position).toBe('left');
  });
});
