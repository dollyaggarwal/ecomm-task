// lib/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

// Attach access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        // Use your backend refresh endpoint to get a new access token
        const { data } = await axios.post('http://localhost:8000/auth/refresh', { token: refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error('Refresh token expired or invalid. Redirecting to login.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
