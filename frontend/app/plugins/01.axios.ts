import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: import.meta.server
      ? config.internalApiUrl
      : config.public.apiUrl,
  });

  api.interceptors.request.use((config) => {
    const token = import.meta.client ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      api,
    },
  };
});
