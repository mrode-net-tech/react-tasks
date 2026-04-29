import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from '../pages/HomePage.tsx';
import CounterPage from '../pages/Tasks/CounterPage.tsx';
import EvenOddPage from '../pages/Tasks/EvenOddPage.tsx';
import MoveBoxPage from '@/pages/Tasks/MoveBoxPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'tasks/counter', Component: CounterPage },
      { path: 'tasks/even-odd', Component: EvenOddPage },
      { path: 'tasks/move-box', Component: MoveBoxPage },
    ],
  },
]);
