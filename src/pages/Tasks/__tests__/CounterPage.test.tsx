import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CounterPage from '../CounterPage';
import { INITIAL_COUNTER } from '@/config/tasksConfig';

describe('CounterPage', () => {
  it('renders the heading and the initial counter value', () => {
    render(<CounterPage />);
    expect(
      screen.getByRole('heading', { name: /counter/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(String(INITIAL_COUNTER))).toBeInTheDocument();
  });

  it('increments the count when the increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<CounterPage />);

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText(String(INITIAL_COUNTER + 2))).toBeInTheDocument();
  });

  it('decrements the count when the decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<CounterPage />);

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(screen.getByText(String(INITIAL_COUNTER - 1))).toBeInTheDocument();
  });

  it('disables the reset button while count equals INITIAL_COUNTER (0)', () => {
    render(<CounterPage />);
    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });

  it('enables and uses the reset button to return to the initial value', async () => {
    const user = userEvent.setup();
    render(<CounterPage />);

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    expect(resetBtn).toBeEnabled();

    await user.click(resetBtn);

    expect(screen.getByText(String(INITIAL_COUNTER))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });

  it('supports going negative through the decrement button', async () => {
    const user = userEvent.setup();
    render(<CounterPage />);

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    await user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(screen.getByText(String(INITIAL_COUNTER - 2))).toBeInTheDocument();
    // Reset becomes available once we leave the initial value, even when negative.
    expect(screen.getByRole('button', { name: /reset/i })).toBeEnabled();
  });
});
