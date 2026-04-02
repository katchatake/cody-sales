import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useNuxtApp, useCookie, useRouter } from "#imports";
import type { User, LoginResponse } from "../types/auth";
import type { AxiosError } from "axios";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computeds
  const isAuthenticated = computed(() => !!user.value);
  const token = useCookie<string | null>("jwt_token", {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Access the injected axios instance plugin
  const { $api } = useNuxtApp();
  const router = useRouter();

  // Actions
  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    try {
      // Usamos el hook $api proporcionado por nuxt
      const response = await $api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log(response);

      // Save token to cookies (Axios plugin will instantly use it on next requests)
      token.value = response.data.token;

      // Save User Data
      user.value = response.data.user;

      return true;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        // Boom formatted error handling
        error.value = err.response.data.message;
      } else {
        error.value = "Ha ocurrido un error al conectar con el servidor.";
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    // Clear State
    user.value = null;
    token.value = null;

    // Redirect to login
    router.push("/login");
  }

  // Restore session logic (For SSR or simple reload)
  // Usually this intercepts a /auth/me or similar, but the decoded token can also be parsed.
  function restoreSession() {
    if (token.value) {
      // In a real scenario, you decode the JWT or call an API to fetch the latest `user` data.
      // For now, we trust the token existence and mock user structure.
      // E.g.: user.value = jwt_decode(token.value);
      user.value = {
        id: "restored",
        email: "user@restored.com",
        role: "ADMIN", // Default role till fetched
      };
    }
  }

  return {
    // Properties
    user,
    isLoading,
    error,
    token,

    // Getters
    isAuthenticated,

    // Methods
    login,
    logout,
    restoreSession,
  };
});
