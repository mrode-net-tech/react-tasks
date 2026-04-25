import { useEvenOdd } from '@/hooks/Tasks/useEvenOdd.ts';

const COLUMNS = [
  { id: 'odd', label: 'Odd' },
  { id: 'even', label: 'Even' },
  { id: 'mod-3', label: '÷ 3' },
  { id: 'mod-5', label: '÷ 5' },
  { id: 'mod-15', label: '÷ 15' },
] as const;

export default function EvenOddPage() {
  const { number, increase, isOfType } = useEvenOdd();

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Even / Odd
      </h1>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <span
          id="current"
          className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-4xl font-bold tabular-nums text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          {number}
        </span>
        <button
          id="btn-next"
          type="button"
          className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          onClick={increase}
        >
          Next Number
        </button>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {col.label}
            </div>
            <div className="flex min-h-40 items-center justify-center border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <span
                id={col.id}
                data-active={isOfType(col.id)}
                aria-label={`${col.label} indicator`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white transition-colors before:content-['✗'] data-[active=true]:bg-emerald-500 data-[active=true]:before:content-['✓']"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
