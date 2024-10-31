// lib/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

// Attach access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
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
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        // Use your backend refresh endpoint to get a new access token
        const { data } = await axios.post('http://localhost:8000/auth/refresh', { token: refreshToken });
        localStorage.setItem('access_token', data.access_token);
        api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (error) {
        console.error('Refresh token expired or invalid. Redirecting to login.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
