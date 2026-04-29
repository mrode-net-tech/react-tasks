import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CURSOR_DELAY_MS } from '@/config/tasksConfig';
import CursorFollowerPage from '../CursorFollowerPage';

describe('CursorFollowerPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the heading', () => {
    render(<CursorFollowerPage />);

    expect(
      screen.getByRole('heading', { name: /move your cursor/i }),
    ).toBeInTheDocument();
  });

  it('positions the circle at the cursor on mousemove', () => {
    render(<CursorFollowerPage />);
    const cursor = screen.getByLabelText('Cursor follower');

    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });

    expect(cursor.style.transform).toBe(
      'translate(calc(100px - 50%), calc(200px - 50%))',
    );
  });

  it('grows while moving and shrinks after the cursor stops', async () => {
    render(<CursorFollowerPage />);

    fireEvent.mouseMove(window, { clientX: 50, clientY: 50 });
    expect(screen.getByLabelText('Cursor follower').className).toMatch(
      /h-24 w-24/,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(CURSOR_DELAY_MS + 50);
    });
    expect(screen.getByLabelText('Cursor follower').className).toMatch(
      /h-16 w-16/,
    );
  });
});
