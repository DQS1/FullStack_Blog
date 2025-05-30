import axios from 'axios';

const URL = 'http://localhost:5000';

export const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'x-pagination, Access-Token, Uid'
  },
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isLoginPage = window.location.pathname === '/login';
    const isLoginRequest = originalRequest.url.includes('/auth/login');
    const isRefreshRequest = originalRequest.url.includes(
      '/auth/refresh-token'
    );

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isLoginPage &&
      !isLoginRequest &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get('/auth/refresh-token');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
