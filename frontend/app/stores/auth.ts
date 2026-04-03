import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useNuxtApp, useRouter } from "#imports";
import { toast } from "vue-sonner";
import type { User, LoginResponse } from "../types/auth";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);
  const { $api } = useNuxtApp();
  const router = useRouter();

  function persistSession(sessionToken: string, sessionUser: User) {
    token.value = sessionToken;
    user.value = sessionUser;

    if (!import.meta.client) {
      return;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, sessionToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sessionUser));
  }

  function clearSession() {
    token.value = null;
    user.value = null;

    if (!import.meta.client) {
      return;
    }

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      persistSession(response.data.token, response.data.user);
      return true;
    } catch (err: any) {
      const errorMessage = (err.response && err.response.data && err.response.data.message) 
        ? err.response.data.message 
        : "Ha ocurrido un error al conectar con el servidor.";
      
      toast.error(errorMessage);
      error.value = errorMessage;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    clearSession();
    router.push("/login");
  }

  function restoreSession() {
    if (!import.meta.client) {
      return;
    }

    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!storedToken || !storedUser) {
      clearSession();
      return;
    }

    try {
      token.value = storedToken;
      user.value = JSON.parse(storedUser) as User;
    } catch {
      clearSession();
    }
  }

  return {
    user,
    isLoading,
    error,
    token,
    isAuthenticated,
    login,
    logout,
    restoreSession,
  };
});
