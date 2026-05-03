import { useCallback, useState } from 'react';
import { CAROUSEL_IMAGES, type CarouselImage } from '@/config/tasksConfig';

export interface CarouselResult {
  index: number;
  number: number;
  total: number;
  image: CarouselImage;
  next: () => void;
  prev: () => void;
}

const TOTAL = CAROUSEL_IMAGES.length;

export function useCarousel(): CarouselResult {
  const [index, setIndex] = useState<number>(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % TOTAL), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + TOTAL) % TOTAL), []);

  return {
    index,
    number: index + 1,
    total: TOTAL,
    image: CAROUSEL_IMAGES[index]!,
    next,
    prev,
  };
}
