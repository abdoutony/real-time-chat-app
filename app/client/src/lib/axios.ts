// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
