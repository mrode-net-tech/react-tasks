import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from '../pages/HomePage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);
