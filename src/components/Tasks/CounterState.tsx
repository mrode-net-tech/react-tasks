import { INITIAL_COUNTER } from '../../config/tasksConfig';

const baseClass =
  'rounded-2xl border border-slate-200 bg-slate-50 px-12 py-6 text-6xl font-semibold tabular-nums shadow-sm dark:border-slate-800 dark:bg-slate-900';

interface CounterStateInput {
  count?: number;
}

export function CounterState({ count = INITIAL_COUNTER }: CounterStateInput) {
  const getClass = (): string => {
    if (count < 0) {
      return baseClass + ' text-red-500';
    }

    if (count > 0) {
      return baseClass + ' text-green-500';
    }

    return baseClass + ' text-slate-500 dark:text-slate-400';
  };

  return (
    <div className={getClass()} aria-live="polite">
      {count}
    </div>
  );
}
