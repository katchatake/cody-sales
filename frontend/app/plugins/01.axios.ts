import axios from "axios";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
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
