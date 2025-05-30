import axios from 'axios';
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import App from '~/App';
import { AuthProvider } from '~/context/AuthProvider';
import { authApi } from '~/features/auth/authApi';
import Login from '~/pages/LoginPage';
import PrivateRoute from '~/routers/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get('email');
      const password = formData.get('password');
      const payload = {
        email,
        password
      };
      try {
        const response = await authApi.login(payload);
        if (response?.status === 200) {
          console.log('🔥 redirecting...');
          return redirect('/home');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (!err.response) {
            return {
              message: 'Server not available. Please try again later.'
            };
          }
          if (err.response?.status === 401) {
            return { message: 'Wrong email or password' };
          }
          return {
            message: err.response.data?.message || 'Unexpected error'
          };
        }
        return { message: 'Login failed. Please try again.' };
      }
    }
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <PrivateRoute />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Navigate to={'/home'} replace /> },
      { path: 'home', element: <App /> },
      { path: 'me', element: <App /> }
    ]
  }
]);
