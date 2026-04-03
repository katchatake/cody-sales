<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <AppCard>
          <div class="text-center mb-8">
            <v-avatar color="info-subtle" class="mb-4 shadow-base" size="80">
              <v-icon size="48" color="brand-primary">mdi-storefront</v-icon>
            </v-avatar>
            <h1 class="text-heading-xl mb-2">Bienvenido</h1>
            <p class="text-body-md text-muted">Ingresa a Cody Sales</p>
          </div>

          <v-form @submit.prevent="handleLogin" :disabled="authStore.isLoading">
            <AppInput v-model="email" label="Correo Electrónico" icon="mdi-email-outline" class="mb-2" />
            <AppInput v-model="password" label="Contraseña" type="password" icon="mdi-lock-outline" class="mb-6" />

            <AppButton type="submit" variant="primary" size="x-large" block :loading="authStore.isLoading">
              Iniciar Sesión
            </AppButton>
          </v-form>
        </AppCard>
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
