import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports';
import { useAuthStore } from '../stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // En SSR y Cliente, accedemos a la cookie del token directamente
  const token = useCookie('jwt_token');
  const authStore = useAuthStore();

  // Siempre intentamos restaurar sesion si hay token (útil al recargar)
  if (token.value && !authStore.isAuthenticated) {
    authStore.restoreSession();
  }

  // Las páginas públicas (o de login) 
  const isAuthRoute = to.path === '/login';

  // Si trata de entrar a rutas privadas sin token
  if (!token.value && !isAuthRoute) {
    return navigateTo('/login');
  }

  // Si trata de entrar a la pestaña login con un token activo
  if (token.value && isAuthRoute) {
    return navigateTo('/');
  }
});
