import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { useToDo } from '../ToDoContext';
import { ToDoProvider } from '../ToDoProvider';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToDoProvider>{children}</ToDoProvider>
);

describe('ToDoContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('starts empty when nothing is persisted', () => {
    const { result } = renderHook(() => useToDo(), { wrapper });
    expect(result.current.list).toEqual([]);
  });

  it('add appends an item, remove drops it by id', () => {
    const { result } = renderHook(() => useToDo(), { wrapper });

    act(() => result.current.add('Buy milk'));
    act(() => result.current.add('Walk dog'));

    expect(result.current.list).toHaveLength(2);
    expect(result.current.list.map((i) => i.text)).toEqual([
      'Buy milk',
      'Walk dog',
    ]);

    const firstId = result.current.list[0]?.id;
    expect(firstId).toBeDefined();
    act(() => result.current.remove(firstId!));

    expect(result.current.list).toHaveLength(1);
    expect(result.current.list[0]?.text).toBe('Walk dog');
  });

  it('ignores empty / whitespace-only input', () => {
    const { result } = renderHook(() => useToDo(), { wrapper });
    act(() => result.current.add('   '));
    act(() => result.current.add(''));
    expect(result.current.list).toEqual([]);
  });

  it('trims input before storing', () => {
    const { result } = renderHook(() => useToDo(), { wrapper });
    act(() => result.current.add('  hello  '));
    expect(result.current.list[0]?.text).toBe('hello');
  });

  it('persists to localStorage and rehydrates on next mount', () => {
    const first = renderHook(() => useToDo(), { wrapper });
    act(() => first.result.current.add('solana'));

    const stored: unknown = JSON.parse(
      window.localStorage.getItem('ToDo') ?? '[]',
    );
    expect(Array.isArray(stored)).toBe(true);
    expect((stored as { text: string }[])[0]?.text).toBe('solana');

    first.unmount();
    const second = renderHook(() => useToDo(), { wrapper });
    expect(second.result.current.list).toHaveLength(1);
    expect(second.result.current.list[0]?.text).toBe('solana');
  });

  it('ignores legacy string-array shape on rehydrate', () => {
    window.localStorage.setItem('ToDo', JSON.stringify(['bitcoin']));
    const { result } = renderHook(() => useToDo(), { wrapper });
    expect(result.current.list).toEqual([]);
  });

  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useToDo())).toThrow(/must be used inside/i);
  });
});
