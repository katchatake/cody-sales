<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="shadow-lg rounded-xl pa-sm-10 pa-6 border-0 bg-surface-base" elevation="0">
          <div class="text-center mb-8">
            <v-avatar color="info-subtle" class="mb-4 shadow-base" size="80">
              <v-icon size="48" color="brand-primary">mdi-storefront</v-icon>
            </v-avatar>
            <h1 class="text-heading-xl mb-2">Bienvenido</h1>
            <p class="text-body-md text-muted">Ingresa a Cody Sales</p>
          </div>

          <v-alert v-if="authStore.error" type="error" variant="tonal" class="mb-6 rounded-lg text-body-sm" density="compact">
            {{ authStore.error }}
          </v-alert>

          <v-form @submit.prevent="handleLogin" :disabled="authStore.isLoading">
            <v-text-field v-model="email" label="Correo Electrónico"
              prepend-inner-icon="mdi-email-outline" class="mb-2"></v-text-field>

            <v-text-field v-model="password" label="Contraseña" type="password"
              prepend-inner-icon="mdi-lock-outline" class="mb-6" :disabled="authStore.isLoading"></v-text-field>

            <v-btn type="submit" block class="text-none font-weight-bold shadow-base"
              size="x-large" rounded="pill" elevation="4" :loading="authStore.isLoading">
              Iniciar Sesión
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from '#imports';
import { useAuthStore } from '../stores/auth';

definePageMeta({
  layout: 'auth'
});

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) return;
  
  const success = await authStore.login(email.value, password.value);
  
  if (success) {
    router.push('/');
  }
}
</script>
