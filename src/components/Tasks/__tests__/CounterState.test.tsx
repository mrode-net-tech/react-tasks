import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CounterState } from '../CounterState';
import { INITIAL_COUNTER } from '@/config/tasksConfig';

describe('CounterState', () => {
  it('renders the provided count', () => {
    render(<CounterState count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('falls back to INITIAL_COUNTER when count prop is omitted', () => {
    render(<CounterState />);
    expect(screen.getByText(String(INITIAL_COUNTER))).toBeInTheDocument();
  });

  it('marks the value region as a polite live region for a11y', () => {
    render(<CounterState count={0} />);
    expect(screen.getByText('0')).toHaveAttribute('aria-live', 'polite');
  });

  it('uses the neutral color when count is zero', () => {
    render(<CounterState count={0} />);
    const node = screen.getByText('0');
    expect(node).toHaveClass('text-slate-500');
    expect(node).not.toHaveClass('text-red-500');
    expect(node).not.toHaveClass('text-green-500');
  });

  it('uses the positive color when count is greater than zero', () => {
    render(<CounterState count={5} />);
    const node = screen.getByText('5');
    expect(node).toHaveClass('text-green-500');
    expect(node).not.toHaveClass('text-red-500');
  });

  it('uses the negative color when count is less than zero', () => {
    render(<CounterState count={-3} />);
    const node = screen.getByText('-3');
    expect(node).toHaveClass('text-red-500');
    expect(node).not.toHaveClass('text-green-500');
  });
});
