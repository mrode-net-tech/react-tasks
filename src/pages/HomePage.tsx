export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome!
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        A small playground of React tasks. Pick one from the navigation to get
        started.
      </p>
    </section>
  );
}
