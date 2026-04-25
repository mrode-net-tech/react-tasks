import { INITIAL_COUNTER } from '@/config/tasksConfig';

const COLOR_BY_SIGN = {
  '-1': 'text-red-500',
  '0': 'text-slate-500 dark:text-slate-400',
  '1': 'text-green-500',
} as const;

interface CounterStateInput {
  count?: number;
}

export function CounterState({ count = INITIAL_COUNTER }: CounterStateInput) {
  const colorClass: string =
    COLOR_BY_SIGN[String(Math.sign(count)) as keyof typeof COLOR_BY_SIGN];

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-50 px-12 py-6 text-6xl font-semibold tabular-nums shadow-sm dark:border-slate-800 dark:bg-slate-900 ${colorClass}`}
      aria-live="polite"
    >
      {count}
    </div>
  );
}
