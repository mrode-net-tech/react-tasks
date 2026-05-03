import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ToDoContext, type ToDoItem } from './ToDoContext';

const STORAGE_KEY = 'ToDo';

function isToDoItem(value: unknown): value is ToDoItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ToDoItem).id === 'string' &&
    typeof (value as ToDoItem).text === 'string'
  );
}

function readInitialList(): ToDoItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isToDoItem);
  } catch {
    return [];
  }
}

export function ToDoProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<ToDoItem[]>(readInitialList);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const add = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setList((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed }]);
  }, []);

  const remove = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({ list, add, remove }), [list, add, remove]);

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
}
