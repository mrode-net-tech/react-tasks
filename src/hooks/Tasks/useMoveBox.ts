import { useCallback, useState } from 'react';
import { INITIAL_BOX_POSITION, type BoxPosition } from '@/config/tasksConfig';

export interface MoveBoxResult {
  position: BoxPosition;
  move: () => void;
}

export function useMoveBox(): MoveBoxResult {
  const [position, setPosition] = useState<BoxPosition>(INITIAL_BOX_POSITION);

  const move = useCallback(() => {
    setPosition((currentPosition) =>
      currentPosition === 'left' ? 'right' : 'left',
    );
  }, []);

  return {
    position,
    move,
  };
}
