import { useToDo } from '@/contexts/todos';
import { ToDoForm } from '@/components/Tasks/ToDoForm';

export default function ToDoPage() {
  const { list, remove } = useToDo();

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        To-Do List
      </h1>

      <ToDoForm />

      {list.length === 0 ? (
        <p className="w-full rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No tasks yet. Add one above.
        </p>
      ) : (
        <ul aria-label="Tasks" className="w-full space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="break-words text-sm text-slate-900 dark:text-slate-100">
                {item.text}
              </span>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove task ${item.text}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-rose-600 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 dark:text-rose-400 dark:hover:bg-rose-950/40 dark:focus-visible:ring-offset-slate-950 cursor-pointer"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
