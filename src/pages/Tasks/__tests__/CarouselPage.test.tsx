import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CarouselPage from '../CarouselPage';
import { CAROUSEL_IMAGES } from '@/config/tasksConfig';

describe('CarouselPage', () => {
  it('renders the first image and counter on mount', () => {
    render(<CarouselPage />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', CAROUSEL_IMAGES[0]!.src);
    expect(image).toHaveAttribute('alt', CAROUSEL_IMAGES[0]!.alt);
    expect(
      screen.getByText(`1 / ${CAROUSEL_IMAGES.length}`),
    ).toBeInTheDocument();
  });

  it('shows the next image and updates the counter when Next is clicked', async () => {
    const user = userEvent.setup();
    render(<CarouselPage />);

    await user.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      CAROUSEL_IMAGES[1]!.src,
    );
    expect(
      screen.getByText(`2 / ${CAROUSEL_IMAGES.length}`),
    ).toBeInTheDocument();
  });

  it('wraps from the last image back to the first', async () => {
    const user = userEvent.setup();
    render(<CarouselPage />);

    const next = screen.getByRole('button', { name: 'Next slide' });
    for (let i = 0; i < CAROUSEL_IMAGES.length; i++) {
      await user.click(next);
    }

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      CAROUSEL_IMAGES[0]!.src,
    );
    expect(
      screen.getByText(`1 / ${CAROUSEL_IMAGES.length}`),
    ).toBeInTheDocument();
  });

  it('wraps from the first image to the last on Prev', async () => {
    const user = userEvent.setup();
    render(<CarouselPage />);

    await user.click(screen.getByRole('button', { name: 'Previous slide' }));

    const last = CAROUSEL_IMAGES[CAROUSEL_IMAGES.length - 1]!;
    expect(screen.getByRole('img')).toHaveAttribute('src', last.src);
    expect(
      screen.getByText(`${CAROUSEL_IMAGES.length} / ${CAROUSEL_IMAGES.length}`),
    ).toBeInTheDocument();
  });

  it('exposes Previous and Next slide buttons', () => {
    render(<CarouselPage />);
    expect(
      screen.getByRole('button', { name: 'Previous slide' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' }),
    ).toBeInTheDocument();
  });
});
