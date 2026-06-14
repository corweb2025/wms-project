// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',                    // proxy 사용
  withCredentials: true,
  timeout: 15000,
});

// 401 Unauthorized 발생 시 자동 로그아웃
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(error);
  }
);

export { api };