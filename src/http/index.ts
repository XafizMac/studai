import axios from 'axios';

export const API_URL = 'http://api.studai.online/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized error. Token might be invalid or expired.');
      // Дополнительная логика обработки ошибки 401, например, редирект на страницу логина
    }
    return Promise.reject(error);
  }
);

export default $api;
