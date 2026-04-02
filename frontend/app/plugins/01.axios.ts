import axios from 'axios';
import { defineNuxtPlugin, useCookie } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  });

  // Interceptor para inyectar token JWT
  api.interceptors.request.use((config) => {
    // Usamos el hook nativo de Nuxt para las cookies
    const token = useCookie('jwt_token').value;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      api
    }
  };
});
