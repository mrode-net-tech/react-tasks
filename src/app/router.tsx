import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from '../pages/HomePage.tsx';
import CounterPage from '../pages/Tasks/CounterPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'tasks/counter', Component: CounterPage },
    ],
  },
]);
