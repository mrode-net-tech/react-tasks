import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ToDoProvider } from '@/contexts/todos';
import ToDoPage from '../ToDoPage';

function renderPage() {
  return render(
    <ToDoProvider>
      <ToDoPage />
    </ToDoProvider>,
  );
}

function getTaskList() {
  return screen.getByRole('list', { name: 'Tasks' });
}

function getTaskItems() {
  return within(getTaskList()).getAllByRole('listitem');
}

async function addTask(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.type(
    screen.getByPlaceholderText('Enter a task'),
    `${text}{enter}`,
  );
}

describe('ToDoPage', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('shows the empty state by default', () => {
    renderPage();

    expect(
      screen.getByText('No tasks yet. Add one above.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('list', { name: 'Tasks' }),
    ).not.toBeInTheDocument();
  });

  it('hides the empty state and shows the task once one is added', async () => {
    const user = userEvent.setup();
    renderPage();

    await addTask(user, 'Buy milk');

    expect(
      screen.queryByText('No tasks yet. Add one above.'),
    ).not.toBeInTheDocument();
    const items = getTaskItems();
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Buy milk');
  });

  it('renders multiple tasks in insertion order', async () => {
    const user = userEvent.setup();
    renderPage();

    await addTask(user, 'first');
    await addTask(user, 'second');
    await addTask(user, 'third');

    expect(getTaskItems().map((li) => li.textContent)).toEqual([
      expect.stringContaining('first'),
      expect.stringContaining('second'),
      expect.stringContaining('third'),
    ]);
  });

  it('exposes an accessible remove button for each task', async () => {
    const user = userEvent.setup();
    renderPage();

    await addTask(user, 'Buy milk');

    expect(
      screen.getByRole('button', { name: 'Remove task Buy milk' }),
    ).toBeInTheDocument();
  });

  it('removes the correct task when several similar texts exist', async () => {
    const user = userEvent.setup();
    renderPage();

    await addTask(user, 'Buy milk');
    await addTask(user, 'Buy eggs');
    await addTask(user, 'Walk dog');

    await user.click(
      screen.getByRole('button', { name: 'Remove task Buy eggs' }),
    );

    const items = getTaskItems();
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Buy milk');
    expect(items[1]).toHaveTextContent('Walk dog');
    expect(screen.queryByText('Buy eggs')).not.toBeInTheDocument();
  });

  it('restores the empty state after removing the last task', async () => {
    const user = userEvent.setup();
    renderPage();

    await addTask(user, 'only one');
    await user.click(
      screen.getByRole('button', { name: 'Remove task only one' }),
    );

    expect(
      screen.getByText('No tasks yet. Add one above.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('list', { name: 'Tasks' }),
    ).not.toBeInTheDocument();
  });

  it('rehydrates tasks persisted in localStorage', () => {
    window.localStorage.setItem(
      'ToDo',
      JSON.stringify([
        { id: 'a', text: 'persisted one' },
        { id: 'b', text: 'persisted two' },
      ]),
    );

    renderPage();

    expect(getTaskItems().map((li) => li.textContent)).toEqual([
      expect.stringContaining('persisted one'),
      expect.stringContaining('persisted two'),
    ]);
  });
});
