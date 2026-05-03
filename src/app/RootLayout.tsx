import { Suspense } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

interface TaskLink {
  to: string;
  label: string;
}

// Add new tasks here — they will appear automatically in the navbar.
const TASK_LINKS: readonly TaskLink[] = [
  { to: '/tasks/counter', label: 'Counter' },
  { to: '/tasks/even-odd', label: 'Even Odd' },
  { to: '/tasks/move-box', label: 'Move Box' },
  { to: '/tasks/cursor', label: 'Cursor Follower' },
  { to: '/tasks/typewriter', label: 'Typewriter' },
  { to: '/tasks/todo', label: 'To-Do' },
  { to: '/tasks/carousel', label: 'Carousel' },
];

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:bg-slate-100 dark:focus:text-slate-900"
      >
        Skip to main content
      </a>
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="rounded-sm text-lg font-semibold tracking-tight hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            React Tasks
          </Link>
          <nav aria-label="Tasks">
            <ul className="flex items-center gap-1 sm:gap-2">
              {TASK_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        'rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto max-w-6xl px-4 py-6 focus:outline-none"
      >
        <Suspense fallback={<Spinner label="Loading…" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
