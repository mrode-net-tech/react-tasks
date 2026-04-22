import { useCounterControls } from '../../hooks/Tasks/useCounterControls';
import { CounterState } from '../../components/Tasks/CounterState.tsx';

export default function CounterPage() {
  const { count, reset, increase, decrease } = useCounterControls();

  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Counter</h1>

      <CounterState count={count} />

      <div className="flex items-center gap-3">
        <button
          aria-label="Decrement"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-2xl font-bold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          onClick={() => decrease()}
        >
          −
        </button>
        <button
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950 dark:disabled:hover:bg-transparent"
          onClick={() => reset()}
          disabled={count === 0}
        >
          Reset
        </button>
        <button
          aria-label="Increment"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          onClick={() => increase()}
        >
          +
        </button>
      </div>
    </section>
  );
}
