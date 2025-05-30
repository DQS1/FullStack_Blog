import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '~/config/routePath.config.tsx';
import './index.css';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
