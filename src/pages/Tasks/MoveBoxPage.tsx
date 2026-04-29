import { useMoveBox } from '@/hooks/Tasks/useMoveBox';

export default function MoveBoxPage() {
  const { position, move } = useMoveBox();
  const boxPositionClass = position === 'right' ? 'translate-x-48' : '';

  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Move Box
      </h1>

      <div className="h-32 w-72 rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900">
        <div
          id="box"
          aria-label="Movable box"
          data-position={position}
          className={`h-16 w-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30 transition-transform duration-300 ease-in-out dark:bg-indigo-400 dark:shadow-indigo-400/20 ${boxPositionClass}`}
        />
      </div>

      <button
        id="btn-move"
        type="button"
        className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        onClick={move}
      >
        Move {position === 'left' ? 'right' : 'left'}
      </button>
    </section>
  );
}
