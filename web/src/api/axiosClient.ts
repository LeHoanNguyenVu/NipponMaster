import axios from 'axios';

// Create an Axios instance with base configuration
const axiosClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically inject the Bearer Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nippon_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle general API errors & token expiration
axiosClient.interceptors.response.use(
  (response) => response.data, // Return data directly (matches ApiResponse structure)
  (error) => {
    const originalRequest = error.config;

    // Handle token expired/unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('nippon_token');
      localStorage.removeItem('nippon_user');
      
      // Redirect to login page or reload to clean store state
      window.location.href = '/login';
    }

    // Extract error message from API response if present
    const message = error.response?.data?.message || 'Đã xảy ra lỗi kết nối. Vui lòng thử lại.';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
