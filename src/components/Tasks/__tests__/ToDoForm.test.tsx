import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ToDoProvider } from '@/contexts/todos';
import { ToDoForm } from '../ToDoForm';

function renderForm() {
  return render(
    <ToDoProvider>
      <ToDoForm />
    </ToDoProvider>,
  );
}

describe('ToDoForm', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('clears the input after a successful submit', async () => {
    const user = userEvent.setup();
    renderForm();

    const input = screen.getByPlaceholderText('Enter a task');
    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: 'Add Task' }));

    expect(input).toHaveValue('');
  });

  it('submits on Enter and clears the input', async () => {
    const user = userEvent.setup();
    renderForm();

    const input = screen.getByPlaceholderText('Enter a task');
    await user.type(input, 'Walk dog{enter}');

    expect(input).toHaveValue('');
  });

  it('disables the submit button when input is empty / whitespace', async () => {
    const user = userEvent.setup();
    renderForm();

    const button = screen.getByRole('button', { name: 'Add Task' });
    expect(button).toBeDisabled();

    await user.type(screen.getByPlaceholderText('Enter a task'), '   ');
    expect(button).toBeDisabled();
  });

  it('enables the submit button once non-whitespace text is entered', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Enter a task'), 'task');
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeEnabled();
  });
});
