import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EvenOddPage from '../EvenOddPage';
import { INITIAL_NUMBER } from '@/config/tasksConfig';

describe('EvenOddPage', () => {
  it('renders the heading and the initial number value', () => {
    render(<EvenOddPage />);
    expect(
      screen.getByRole('heading', { name: /Even \/ Odd/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(String(INITIAL_NUMBER))).toBeInTheDocument();
  });

  it('increments the number when the increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<EvenOddPage />);

    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(String(INITIAL_NUMBER + 2))).toBeInTheDocument();
  });

  it('shows all indicators as inactive at INITIAL_NUMBER', () => {
    render(<EvenOddPage />);
    for (const label of ['Odd', 'Even', '÷ 3', '÷ 5', '÷ 15']) {
      expect(screen.getByLabelText(`${label} indicator`)).toHaveAttribute(
        'data-active',
        'false',
      );
    }
  });

  async function advance(steps: number) {
    const user = userEvent.setup();
    render(<EvenOddPage />);
    const next = screen.getByRole('button', { name: /next/i });
    for (let i = 0; i < steps; i++) {
      await user.click(next);
    }
    return {
      odd: screen.getByLabelText('Odd indicator').dataset.active,
      even: screen.getByLabelText('Even indicator').dataset.active,
      mod3: screen.getByLabelText('÷ 3 indicator').dataset.active,
      mod5: screen.getByLabelText('÷ 5 indicator').dataset.active,
      mod15: screen.getByLabelText('÷ 15 indicator').dataset.active,
    };
  }

  it('after 1 click: only Odd is active', async () => {
    const s = await advance(1);
    expect(s).toEqual({
      odd: 'true',
      even: 'false',
      mod3: 'false',
      mod5: 'false',
      mod15: 'false',
    });
  });

  it('after 2 clicks: only Even is active', async () => {
    const s = await advance(2);
    expect(s).toEqual({
      odd: 'false',
      even: 'true',
      mod3: 'false',
      mod5: 'false',
      mod15: 'false',
    });
  });

  it('after 3 clicks: Odd and ÷3 are active', async () => {
    const s = await advance(3);
    expect(s).toEqual({
      odd: 'true',
      even: 'false',
      mod3: 'true',
      mod5: 'false',
      mod15: 'false',
    });
  });

  it('after 15 clicks: Odd, ÷3, ÷5 and ÷15 are all active', async () => {
    const s = await advance(15);
    expect(s).toEqual({
      odd: 'true',
      even: 'false',
      mod3: 'true',
      mod5: 'true',
      mod15: 'true',
    });
  });
});
