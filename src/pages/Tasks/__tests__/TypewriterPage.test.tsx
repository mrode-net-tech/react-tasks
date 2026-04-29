import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TypewriterPage from '../TypewriterPage';

vi.mock('@/lib/audio', () => ({
  playBeep: vi.fn(),
}));

describe('TypewriterPage', () => {
  it('renders the heading and an empty output', () => {
    render(<TypewriterPage />);

    expect(
      screen.getByRole('heading', { name: /typewriter/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start typing...')).toHaveValue('');
  });

  it('renders one .char-pop span per typed character', () => {
    const { container } = render(<TypewriterPage />);
    const textarea = screen.getByPlaceholderText('Start typing...');

    fireEvent.change(textarea, { target: { value: 'hi' } });

    expect(container.querySelectorAll('.char-pop')).toHaveLength(2);
    expect(container.querySelector('#output')?.textContent).toBe('hi');
  });

  it('renders a <br> for newline characters', () => {
    const { container } = render(<TypewriterPage />);
    const textarea = screen.getByPlaceholderText('Start typing...');

    fireEvent.change(textarea, { target: { value: 'a\nb' } });

    expect(container.querySelectorAll('#output br')).toHaveLength(1);
    expect(container.querySelectorAll('.char-pop')).toHaveLength(2);
  });

  it('shrinks the output when the user deletes characters', () => {
    const { container } = render(<TypewriterPage />);
    const textarea = screen.getByPlaceholderText('Start typing...');

    fireEvent.change(textarea, { target: { value: 'abc' } });
    fireEvent.change(textarea, { target: { value: 'ab' } });

    expect(container.querySelectorAll('.char-pop')).toHaveLength(2);
    expect(container.querySelector('#output')?.textContent).toBe('ab');
  });
});
