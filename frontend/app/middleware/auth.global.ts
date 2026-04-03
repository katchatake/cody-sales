import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '../stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const isAuthRoute = to.path === '/login';

  if (!import.meta.client) {
    return;
  }

  if (!authStore.isAuthenticated) {
    authStore.restoreSession();
  }

  const token = localStorage.getItem('auth_token');

  if (!token && !isAuthRoute) {
    return navigateTo('/login');
  }

  if (token && isAuthRoute) {
    return navigateTo('/');
  }
});
