import { useCallback, useState } from 'react';
import { INITIAL_NUMBER, type NumberType } from '@/config/tasksConfig';

export interface EvenOddResult {
  number: number;
  increase: () => void;
  isOfType: (numberType: NumberType) => boolean;
}

export function useEvenOdd(): EvenOddResult {
  const [number, setNumber] = useState<number>(INITIAL_NUMBER);

  const increase = useCallback(() => setNumber((prev) => prev + 1), []);

  const isOfType = (numberType: NumberType): boolean => {
    if (number === INITIAL_NUMBER) {
      return false;
    }

    const OUTPUT: Record<NumberType, (n: number) => boolean> = {
      even: (n) => n % 2 === 0,
      odd: (n) => n % 2 === 1,
      'mod-3': (n) => n % 3 === 0,
      'mod-5': (n) => n % 5 === 0,
      'mod-15': (n) => n % 15 === 0,
    };

    return OUTPUT[numberType](number);
  };

  return {
    number,
    increase,
    isOfType,
  };
}
