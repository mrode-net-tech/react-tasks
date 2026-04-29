import { useEffect, useRef, useState } from 'react';
import { CURSOR_DELAY_MS } from '@/config/tasksConfig.ts';

export interface CursorFollowerResult {
  cursorRef: React.RefObject<HTMLDivElement | null>;
  isMoving: boolean;
}

export function useCursorFollower(): CursorFollowerResult {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  useEffect(() => {
    let stopTimer: number | undefined;

    const handleMouseMove = (event: MouseEvent) => {
      const el = cursorRef.current;
      if (el) {
        // Offset by -50% so the circle stays centered on the cursor.
        el.style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`;
      }

      setIsMoving(true);
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setIsMoving(false), CURSOR_DELAY_MS);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(stopTimer);
    };
  }, []);

  return { cursorRef, isMoving };
}
