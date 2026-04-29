import { useCursorFollower } from '@/hooks/Tasks/useCursorFollower';

export default function CursorFollowerPage() {
  const { cursorRef, isMoving } = useCursorFollower();
  const sizeClass = isMoving ? 'h-24 w-24' : 'h-16 w-16';

  return (
    <div className="relative min-h-[70vh]">
      <div
        ref={cursorRef}
        id="cursor"
        aria-label="Cursor follower"
        className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full bg-indigo-600/30 ring-2 ring-indigo-500 backdrop-blur-sm transition-[width,height] duration-200 ease-out dark:bg-indigo-400/20 dark:ring-indigo-300 ${sizeClass}`}
      >
        <span
          id="cursor-text"
          className="text-[10px] font-bold tracking-widest text-indigo-900 uppercase select-none dark:text-indigo-50"
        >
          X-RAY
        </span>
      </div>

      <section className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Move your cursor
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Watch the circle follow you
        </p>
      </section>
    </div>
  );
}
