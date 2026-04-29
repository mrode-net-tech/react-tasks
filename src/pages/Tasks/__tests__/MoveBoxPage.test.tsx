import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MoveBoxPage from '../MoveBoxPage';

describe('MoveBoxPage', () => {
  it('renders the heading and move button', () => {
    render(<MoveBoxPage />);

    expect(
      screen.getByRole('heading', { name: /move box/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /move right/i })).toBeVisible();
  });

  it('moves the box right and left when clicked', async () => {
    const user = userEvent.setup();
    render(<MoveBoxPage />);

    const box = screen.getByLabelText('Movable box');
    expect(box).toHaveAttribute('data-position', 'left');

    await user.click(screen.getByRole('button', { name: /move right/i }));
    expect(box).toHaveAttribute('data-position', 'right');

    await user.click(screen.getByRole('button', { name: /move left/i }));
    expect(box).toHaveAttribute('data-position', 'left');
  });
});
