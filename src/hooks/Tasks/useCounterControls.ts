import { useCallback, useState } from 'react';
import { INITIAL_COUNTER } from '../../config/tasksConfig';

export interface CounterControlResult {
  count: number;
  reset: () => void;
  increase: () => void;
  decrease: () => void;
}

export function useCounterControls(): CounterControlResult {
  const [count, setCount] = useState<number>(INITIAL_COUNTER);

  const reset = useCallback(() => setCount(INITIAL_COUNTER), []);

  const increase = useCallback(() => setCount((prev) => prev + 1), []);

  const decrease = useCallback(() => setCount((prev) => prev - 1), []);

  return {
    count,
    reset,
    increase,
    decrease,
  };
}
