import { useCarousel } from '@/hooks/Tasks/useCarousel';

export default function CarouselPage() {
  const { number, total, image, next, prev } = useCarousel();

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Carousel
      </h1>

      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        >
          ‹
        </button>

        <div className="aspect-video flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        >
          ›
        </button>
      </div>

      <p
        aria-live="polite"
        className="text-sm font-medium tabular-nums text-slate-600 dark:text-slate-300"
      >
        {number} / {total}
      </p>
    </section>
  );
}
