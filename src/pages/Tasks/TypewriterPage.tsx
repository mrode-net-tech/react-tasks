import { useTypewriter } from '@/hooks/Tasks/useTypewriter.ts';

export default function TypewriterPage() {
  const { value, entries, onChange, onKeyDown } = useTypewriter();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Typewriter
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Start typing below — every keystroke clacks, pops, and prints in real
          time.
        </p>
      </header>

      <div
        className="scene relative min-h-[200px] rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-lg leading-relaxed whitespace-pre-wrap text-slate-900 shadow-inner dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        aria-live="polite"
      >
        <span className="output" id="output">
          {entries.map(({ id, char }) =>
            char === '\n' ? (
              <br key={id} />
            ) : (
              <span key={id} className="char-pop inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ),
          )}
        </span>
        <span
          className="cursor-blink ml-0.5 inline-block animate-pulse text-indigo-500 dark:text-indigo-400"
          id="blink"
          aria-hidden="true"
        >
          |
        </span>
      </div>

      <div className="controls">
        <label htmlFor="input" className="sr-only">
          Type here
        </label>
        <textarea
          className="input w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/40"
          id="input"
          rows={4}
          placeholder="Start typing..."
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
