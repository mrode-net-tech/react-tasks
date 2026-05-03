import { createContext, useContext } from 'react';

export interface ToDoItem {
  id: string;
  text: string;
}

export interface ToDoContextValue {
  list: readonly ToDoItem[];
  add: (text: string) => void;
  remove: (id: string) => void;
}

export const ToDoContext = createContext<ToDoContextValue | null>(null);

export function useToDo(): ToDoContextValue {
  const ctx = useContext(ToDoContext);
  if (!ctx) {
    throw new Error('useToDo must be used inside <ToDoProvider>.');
  }
  return ctx;
}
