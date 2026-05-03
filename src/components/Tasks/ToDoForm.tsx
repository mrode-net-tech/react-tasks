import { useId, useState, type FormEvent } from 'react';
import { useToDo } from '@/contexts/todos';

export function ToDoForm() {
  const { add } = useToDo();
  const [text, setText] = useState('');
  const inputId = useId();
  const trimmed = text.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmed) return;
    add(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <label htmlFor={inputId} className="sr-only">
        Task
      </label>
      <input
        id={inputId}
        type="text"
        placeholder="Enter a task"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-offset-slate-950"
      />
      <button
        type="submit"
        disabled={!trimmed}
        className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600 dark:focus-visible:ring-offset-slate-950"
      >
        Add Task
      </button>
    </form>
  );
}
